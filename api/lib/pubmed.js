/**
 * Vericove AI Symptom Intelligence - PubMed Research Retrieval (Phase 2.2)
 *
 * Provides deterministic biomedical keyword extraction from symptom text
 * and retrieves genuine biomedical research citations from NCBI PubMed E-utilities.
 *
 * Rules:
 * - Deterministic allowlist matching (longest multi-word phrases first, up to 3 terms).
 * - No-search fallback when zero allowlist terms match (never sends raw symptom narratives).
 * - ESearch (JSON) followed by EFetch (XML) with 5-second timeouts and 512 KB size ceiling.
 * - XML validation before parsing with safe XMLParser configuration.
 * - Strict PMID membership validation against ESearch result set.
 * - Structured abstract formatting and missing abstract handling.
 * - Zero logging of sensitive health data or symptom descriptions.
 */

import { XMLParser, XMLValidator } from 'fast-xml-parser';

export const NCBI_DISCLAIMER =
  'PubMed citations and abstracts are provided courtesy of the National Library of Medicine (NLM) / National Center for Biotechnology Information (NCBI). Publication in PubMed does not imply endorsement by NCBI or NLM. Content is intended for educational research synthesis only. Vericove does not provide clinical diagnosis.';

const MAX_XML_BYTES = 524288; // 512 KB maximum XML response
const MAX_ABSTRACT_LENGTH = 4000;
const NCBI_ESEARCH_URL = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi';
const NCBI_EFETCH_URL = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi';

// Explicit multi-word biomedical terms (sorted by descending word count / length for greedy longest-first match)
const MULTI_WORD_TERMS = [
  'premenstrual dysphoric disorder',
  'abnormal uterine bleeding',
  'polycystic ovary syndrome',
  'urinary tract infection',
  'heavy menstrual bleeding',
  'lower abdominal cramping',
  'irregular menstruation',
  'premenstrual syndrome',
  'intermenstrual bleeding',
  'postcoital bleeding',
  'breast tenderness',
  'irregular periods',
  'urinary frequency',
  'uterine fibroids',
  'painful periods',
  'pelvic cramping',
  'vaginal bleeding',
  'vaginal discharge',
  'missed periods',
  'ovarian cyst',
  'pelvic pain',
  'night sweats',
  'hot flashes'
];

// Explicit single-word biomedical terms
const SINGLE_WORD_TERMS = new Set([
  'adenomyosis',
  'alopecia',
  'amenorrhea',
  'bloating',
  'cervicitis',
  'cramping',
  'cramps',
  'dysmenorrhea',
  'endometriosis',
  'endometritis',
  'fatigue',
  'galactorrhea',
  'headache',
  'hirsutism',
  'insomnia',
  'mastalgia',
  'menopause',
  'menorrhagia',
  'migraine',
  'myoma',
  'nausea',
  'oligomenorrhea',
  'perimenopause',
  'salpingitis',
  'spotting',
  'vaginismus',
  'vaginitis',
  'vulvodynia'
]);

/**
 * Deterministically extracts up to 3 recognized biomedical terms from input text.
 * Matches multi-word phrases first (greedy longest match), then single words.
 *
 * @param {string} text - Raw symptom input
 * @returns {string[]} Array of up to 3 matched vocabulary terms
 */
export function extractBiomedicalTerms(text) {
  if (typeof text !== 'string') return [];
  const normalized = text
    .toLowerCase()
    .replace(/[^a-z0-9\- ]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (!normalized) return [];

  const matched = [];
  let remaining = ` ${normalized} `;

  // 1. Longest multi-word phrases first
  for (const phrase of MULTI_WORD_TERMS) {
    const pattern = ` ${phrase} `;
    if (remaining.includes(pattern)) {
      matched.push(phrase);
      remaining = remaining.replaceAll(pattern, ' ');
      if (matched.length >= 3) break;
    }
  }

  // 2. Single-word terms if fewer than 3 terms matched
  if (matched.length < 3) {
    const tokens = remaining.trim().split(/\s+/).filter(Boolean);
    for (const token of tokens) {
      // Avoid adding single words that are already components of matched phrases
      const isSubterm = matched.some(phrase => phrase.split(/\s+/).includes(token));
      if (SINGLE_WORD_TERMS.has(token) && !matched.includes(token) && !isSubterm) {
        matched.push(token);
        if (matched.length >= 3) break;
      }
    }
  }

  return matched;
}

/**
 * Extracts plain text recursively from a fast-xml-parser node.
 */
function extractText(node) {
  if (node === null || node === undefined) return '';
  if (typeof node === 'string') return node.trim();
  if (typeof node === 'number' || typeof node === 'boolean') return String(node);
  if (typeof node === 'object') {
    if (node['#text'] !== undefined) return extractText(node['#text']);
    return Object.values(node)
      .map(extractText)
      .filter(Boolean)
      .join(' ')
      .trim();
  }
  return '';
}

/**
 * Formats structured or unstructured abstract elements into display text.
 */
function formatAbstract(abstractNode) {
  if (!abstractNode) return { hasAbstract: false, abstract: null };

  const rawTexts = abstractNode.AbstractText;
  if (!rawTexts || (Array.isArray(rawTexts) && rawTexts.length === 0)) {
    return { hasAbstract: false, abstract: null };
  }

  const list = Array.isArray(rawTexts) ? rawTexts : [rawTexts];
  const sections = [];

  for (const item of list) {
    if (typeof item === 'string') {
      const text = item.trim();
      if (text) sections.push(text);
    } else if (item && typeof item === 'object') {
      const label = item['@_Label'] ? `${String(item['@_Label']).trim().toUpperCase()}: ` : '';
      const content = extractText(item['#text'] !== undefined ? item['#text'] : item);
      if (content) {
        sections.push(`${label}${content}`);
      }
    }
  }

  if (sections.length === 0) {
    return { hasAbstract: false, abstract: null };
  }

  let formatted = sections.join('\n\n');
  if (formatted.length > MAX_ABSTRACT_LENGTH) {
    formatted =
      formatted.slice(0, MAX_ABSTRACT_LENGTH - 50).replace(/\s+\S*$/, '') +
      ' ... [Abstract truncated for display]';
  }

  return { hasAbstract: true, abstract: formatted };
}

/**
 * Formats author list into an array of author strings.
 */
function formatAuthors(authorListNode) {
  if (!authorListNode?.Author) return [];
  const authors = Array.isArray(authorListNode.Author)
    ? authorListNode.Author
    : [authorListNode.Author];

  const list = [];
  for (const a of authors) {
    if (!a) continue;
    const lastName = a.LastName ? extractText(a.LastName) : '';
    const foreName = a.ForeName ? extractText(a.ForeName) : (a.Initials ? extractText(a.Initials) : '');
    if (lastName && foreName) {
      list.push(`${lastName} ${foreName}`);
    } else if (lastName) {
      list.push(lastName);
    } else if (a.CollectiveName) {
      list.push(extractText(a.CollectiveName));
    }
  }
  return list;
}

/**
 * Extracts journal title and publication year.
 */
function formatJournalAndDate(journalNode) {
  const journalTitle = journalNode?.Title
    ? extractText(journalNode.Title)
    : (journalNode?.ISOAbbreviation ? extractText(journalNode.ISOAbbreviation) : '');

  const pubDate = journalNode?.JournalIssue?.PubDate;
  let year = '';
  if (pubDate?.Year) {
    year = extractText(pubDate.Year);
  } else if (pubDate?.MedlineDate) {
    year = extractText(pubDate.MedlineDate).slice(0, 4);
  }
  return { journal: journalTitle, pubDate: year };
}

/**
 * Extracts DOI from ArticleIdList if present.
 */
function extractDoi(articleIdListNode) {
  if (!articleIdListNode?.ArticleId) return null;
  const ids = Array.isArray(articleIdListNode.ArticleId)
    ? articleIdListNode.ArticleId
    : [articleIdListNode.ArticleId];

  for (const id of ids) {
    if (id?.['@_IdType'] === 'doi') {
      const doi = extractText(id);
      if (doi) return doi;
    }
  }
  return null;
}

/**
 * Parses and validates PubMed XML records, enforcing PMID membership and completeness.
 *
 * @param {string} xmlString - Raw XML from EFetch
 * @param {string[]} expectedPmids - Ordered PMIDs from ESearch
 * @returns {object} { records: Array, error?: object }
 */
export function parsePubMedXml(xmlString, expectedPmids) {
  if (typeof xmlString !== 'string' || !xmlString.trim()) {
    return {
      error: {
        code: 'NCBI_PARSE_ERROR',
        message: 'Empty or invalid XML response from NCBI.'
      }
    };
  }

  // 1. Mandatory XMLValidator validation
  const validationResult = XMLValidator.validate(xmlString, {
    allowBooleanAttributes: false
  });

  if (validationResult !== true) {
    return {
      error: {
        code: 'NCBI_PARSE_ERROR',
        message: 'Malformed XML response from NCBI.'
      }
    };
  }

  // 2. Safe XMLParser configuration
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '@_',
    textNodeName: '#text',
    trimValues: true,
    parseAttributeValue: false,
    parseTagValue: false,
    allowBooleanAttributes: false,
    isArray: (name) => [
      'PubmedArticle',
      'Author',
      'AbstractText',
      'ArticleId',
      'PublicationType'
    ].includes(name)
  });

  let parsed;
  try {
    parsed = parser.parse(xmlString);
  } catch {
    return {
      error: {
        code: 'NCBI_PARSE_ERROR',
        message: 'Failed to parse NCBI XML response.'
      }
    };
  }

  const rawArticles = parsed?.PubmedArticleSet?.PubmedArticle;
  if (!rawArticles || !Array.isArray(rawArticles)) {
    return { records: [] };
  }

  const expectedSet = new Set(expectedPmids.map(String));
  const seenPmids = new Set();
  const records = [];

  for (const article of rawArticles) {
    const medline = article?.MedlineCitation;
    if (!medline) continue;

    const pmid = String(extractText(medline.PMID)).trim();
    // Validate PMID belongs to the ESearch result set
    if (!pmid || !expectedSet.has(pmid)) {
      continue;
    }

    // Deduplicate PMIDs
    if (seenPmids.has(pmid)) {
      continue;
    }
    seenPmids.add(pmid);

    const title = extractText(medline.Article?.ArticleTitle);
    // Reject truncated or corrupted records missing essential title
    if (!title) {
      continue;
    }

    const { journal, pubDate } = formatJournalAndDate(medline.Article?.Journal);
    const authors = formatAuthors(medline.Article?.AuthorList);
    const pubTypes = Array.isArray(medline.Article?.PublicationTypeList?.PublicationType)
      ? medline.Article.PublicationTypeList.PublicationType.map(extractText).filter(Boolean)
      : [];

    const doi = extractDoi(article.PubmedData?.ArticleIdList);
    const { hasAbstract, abstract } = formatAbstract(medline.Article?.Abstract);

    records.push({
      pmid,
      title,
      authors,
      journal,
      pubDate,
      publicationTypes: pubTypes,
      url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`,
      doi,
      hasAbstract,
      abstract,
      evidenceType: hasAbstract ? 'Abstract' : 'Citation Only'
    });
  }

  return { records };
}

/**
 * Queries NCBI PubMed for genuine research citations based on matched biomedical terms.
 *
 * @param {string} symptomText - Raw user symptom input
 * @param {object} [options] - Optional overrides for testing/mocks
 * @returns {Promise<object>} Result containing records or error
 */
export async function queryPubMed(symptomText, options = {}) {
  // 1. Extract deterministic biomedical terms
  const terms = extractBiomedicalTerms(symptomText);

  // If no terms match allowlist, return clean no-search result without contacting NCBI
  if (terms.length === 0) {
    return {
      data: {
        totalFound: 0,
        records: [],
        matchedTerms: [],
        message: 'No recognized biomedical search terms could be identified from the description to query PubMed.',
        disclaimer: NCBI_DISCLAIMER
      }
    };
  }

  // 2. Validate NCBI configuration
  const tool = options.tool || process.env.NCBI_TOOL || 'vericove_symptom_intelligence';
  const email = options.email !== undefined ? options.email : process.env.NCBI_EMAIL;

  if (!email || !email.trim()) {
    return {
      error: {
        code: 'NCBI_CONFIG_MISSING',
        message: 'NCBI developer email configuration (NCBI_EMAIL) is not configured.'
      }
    };
  }

  const apiKey = options.apiKey !== undefined ? options.apiKey : process.env.NCBI_API_KEY;
  const customFetch = options.fetch || fetch;
  const retmax = options.retmax || 5;

  // Build query from matched terms only (never sends raw symptom narrative)
  const queryString = terms.map(t => `${t}[Title/Abstract]`).join(' AND ');

  const searchParams = new URLSearchParams({
    db: 'pubmed',
    term: queryString,
    retmode: 'json',
    retmax: String(retmax),
    sort: 'relevance',
    tool,
    email
  });

  if (apiKey) {
    searchParams.set('api_key', apiKey);
  }

  // 3. ESearch: Retrieve PMIDs
  let searchJson;
  try {
    const searchRes = await customFetch(`${NCBI_ESEARCH_URL}?${searchParams.toString()}`, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(5000)
    });

    if (searchRes.status === 429) {
      return {
        error: {
          code: 'NCBI_RATE_LIMITED',
          message: 'NCBI PubMed rate limit exceeded. Please wait a few moments before retrying.'
        }
      };
    }
    if (searchRes.status === 500 || searchRes.status === 503) {
      return {
        error: {
          code: 'NCBI_UNAVAILABLE',
          message: 'NCBI PubMed service is currently unavailable.'
        }
      };
    }
    if (!searchRes.ok) {
      return {
        error: {
          code: 'NCBI_ERROR',
          message: `NCBI ESearch returned unexpected HTTP status ${searchRes.status}.`
        }
      };
    }

    searchJson = await searchRes.json();
  } catch (err) {
    if (err.name === 'TimeoutError' || err.name === 'AbortError') {
      return {
        error: {
          code: 'NCBI_TIMEOUT',
          message: 'NCBI PubMed request timed out.'
        }
      };
    }
    return {
      error: {
        code: 'NCBI_NETWORK_ERROR',
        message: 'Failed to connect to NCBI PubMed.'
      }
    };
  }

  const idList = searchJson?.esearchresult?.idlist || [];
  if (!Array.isArray(idList) || idList.length === 0) {
    return {
      data: {
        totalFound: 0,
        records: [],
        matchedTerms: terms,
        message: 'No biomedical literature found matching the search criteria.',
        disclaimer: NCBI_DISCLAIMER
      }
    };
  }

  // 4. EFetch: Retrieve XML article records for the returned PMIDs
  const fetchParams = new URLSearchParams({
    db: 'pubmed',
    id: idList.join(','),
    retmode: 'xml',
    tool,
    email
  });

  if (apiKey) {
    fetchParams.set('api_key', apiKey);
  }

  let xmlString;
  try {
    const fetchRes = await customFetch(`${NCBI_EFETCH_URL}?${fetchParams.toString()}`, {
      method: 'GET',
      headers: { Accept: 'application/xml, text/xml' },
      signal: AbortSignal.timeout(5000)
    });

    if (fetchRes.status === 429) {
      return {
        error: {
          code: 'NCBI_RATE_LIMITED',
          message: 'NCBI PubMed rate limit exceeded. Please wait a few moments before retrying.'
        }
      };
    }
    if (fetchRes.status === 500 || fetchRes.status === 503) {
      return {
        error: {
          code: 'NCBI_UNAVAILABLE',
          message: 'NCBI PubMed service is currently unavailable.'
        }
      };
    }
    if (!fetchRes.ok) {
      return {
        error: {
          code: 'NCBI_ERROR',
          message: `NCBI EFetch returned unexpected HTTP status ${fetchRes.status}.`
        }
      };
    }

    // Check response size ceiling (512 KB)
    const contentLength = Number(fetchRes.headers?.get?.('content-length') || 0);
    if (contentLength > MAX_XML_BYTES) {
      return {
        error: {
          code: 'NCBI_PAYLOAD_TOO_LARGE',
          message: 'NCBI response exceeded maximum permitted size (512 KB).'
        }
      };
    }

    const arrayBuffer = await fetchRes.arrayBuffer();
    if (arrayBuffer.byteLength > MAX_XML_BYTES) {
      return {
        error: {
          code: 'NCBI_PAYLOAD_TOO_LARGE',
          message: 'NCBI response exceeded maximum permitted size (512 KB).'
        }
      };
    }

    xmlString = Buffer.from(arrayBuffer).toString('utf8');
  } catch (err) {
    if (err.name === 'TimeoutError' || err.name === 'AbortError') {
      return {
        error: {
          code: 'NCBI_TIMEOUT',
          message: 'NCBI PubMed request timed out.'
        }
      };
    }
    return {
      error: {
        code: 'NCBI_NETWORK_ERROR',
        message: 'Failed to retrieve records from NCBI PubMed.'
      }
    };
  }

  // 5. Parse, validate, and extract genuine records
  const parseResult = parsePubMedXml(xmlString, idList);
  if (parseResult.error) {
    return { error: parseResult.error };
  }

  return {
    data: {
      totalFound: parseResult.records.length,
      records: parseResult.records,
      matchedTerms: terms,
      disclaimer: NCBI_DISCLAIMER
    }
  };
}
