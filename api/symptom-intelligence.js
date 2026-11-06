/**
 * Vericove AI Symptom Intelligence - Backend Foundation (Phase 2.1)
 *
 * Vercel-compatible serverless function.
 * Validates request method, payload structure, size, and user consent.
 * External integrations (PubMed E-utilities, Gemini API) are deferred to subsequent phases.
 */

import { queryPubMed } from './lib/pubmed.js';

const MAX_PAYLOAD_BYTES = 10240; // 10 KB limit
const MAX_SYMPTOM_LENGTH = 1000;
const MAX_DURATION_LENGTH = 100;
const VALID_SEVERITIES = ['Mild', 'Moderate', 'Severe'];

// Safely parses request body whether pre-parsed by Vercel or received as raw string/stream
async function parseRequestBody(req) {
  if (req.body !== undefined && req.body !== null) {
    if (typeof req.body === 'object') {
      try {
        const serializedLength = Buffer.byteLength(JSON.stringify(req.body), 'utf8');
        if (serializedLength > MAX_PAYLOAD_BYTES) {
          return { __payloadTooLarge: true };
        }
      } catch {
        return null;
      }
      return req.body;
    }
    if (typeof req.body === 'string') {
      if (Buffer.byteLength(req.body, 'utf8') > MAX_PAYLOAD_BYTES) {
        return { __payloadTooLarge: true };
      }
      try {
        return JSON.parse(req.body);
      } catch {
        return null;
      }
    }
  }

  if (typeof req.on === 'function') {
    return new Promise((resolve) => {
      let resolved = false;
      const done = (val) => {
        if (!resolved) {
          resolved = true;
          // Clean up specific listeners we attached
          if (typeof req.removeListener === 'function') {
            req.removeListener('data', onData);
            req.removeListener('end', onEnd);
            req.removeListener('error', onError);
          } else if (typeof req.off === 'function') {
            req.off('data', onData);
            req.off('end', onEnd);
            req.off('error', onError);
          }
          resolve(val);
        }
      };

      let byteCount = 0;
      const chunks = [];

      const onData = (chunk) => {
        const chunkSize = Buffer.isBuffer(chunk) ? chunk.length : Buffer.byteLength(chunk, 'utf8');
        byteCount += chunkSize;
        if (byteCount > MAX_PAYLOAD_BYTES) {
          chunks.length = 0;
          if (typeof req.removeListener === 'function') {
            req.removeListener('data', onData);
          } else if (typeof req.off === 'function') {
            req.off('data', onData);
          }
          if (typeof req.resume === 'function') {
            req.resume();
          }
          done({ __payloadTooLarge: true });
          return;
        }
        chunks.push(chunk);
      };

      const onEnd = () => {
        if (resolved) return;
        try {
          const raw = Buffer.isBuffer(chunks[0])
            ? Buffer.concat(chunks).toString('utf8')
            : chunks.join('');
          done(JSON.parse(raw));
        } catch {
          done(null);
        }
      };

      const onError = () => done(null);

      req.on('data', onData);
      req.on('end', onEnd);
      req.on('error', onError);
    });
  }

  return null;
}

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');

  // Enforce POST method only
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({
      error: {
        code: 'METHOD_NOT_ALLOWED',
        message: 'Method not allowed. Use POST.'
      }
    });
  }

  try {
    // Check Content-Length header if present
    const contentLength = Number(req.headers?.['content-length'] || 0);
    if (contentLength > MAX_PAYLOAD_BYTES) {
      return res.status(413).json({
        error: {
          code: 'PAYLOAD_TOO_LARGE',
          message: 'Request payload exceeds size limit (10 KB).'
        }
      });
    }

    const body = await parseRequestBody(req);

    if (body?.__payloadTooLarge) {
      return res.status(413).json({
        error: {
          code: 'PAYLOAD_TOO_LARGE',
          message: 'Request payload exceeds size limit (10 KB).'
        }
      });
    }

    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return res.status(400).json({
        error: {
          code: 'INVALID_PAYLOAD',
          message: 'Request body must be a valid JSON object.'
        }
      });
    }

    // Validate symptom
    if (typeof body.symptom !== 'string' || body.symptom.trim().length === 0) {
      return res.status(400).json({
        error: {
          code: 'VALIDATION_ERROR',
          field: 'symptom',
          message: 'The "symptom" field is required and must be a non-empty string.'
        }
      });
    }
    if (body.symptom.trim().length > MAX_SYMPTOM_LENGTH) {
      return res.status(400).json({
        error: {
          code: 'VALIDATION_ERROR',
          field: 'symptom',
          message: `The "symptom" field must not exceed ${MAX_SYMPTOM_LENGTH} characters.`
        }
      });
    }

    // Validate duration
    if (typeof body.duration !== 'string' || body.duration.trim().length === 0) {
      return res.status(400).json({
        error: {
          code: 'VALIDATION_ERROR',
          field: 'duration',
          message: 'The "duration" field is required and must be a non-empty string.'
        }
      });
    }
    if (body.duration.trim().length > MAX_DURATION_LENGTH) {
      return res.status(400).json({
        error: {
          code: 'VALIDATION_ERROR',
          field: 'duration',
          message: `The "duration" field must not exceed ${MAX_DURATION_LENGTH} characters.`
        }
      });
    }

    // Validate severity
    if (!VALID_SEVERITIES.includes(body.severity)) {
      return res.status(400).json({
        error: {
          code: 'VALIDATION_ERROR',
          field: 'severity',
          message: 'The "severity" field must be one of: Mild, Moderate, Severe.'
        }
      });
    }

    // Validate explicit consent
    if (body.consentAccepted !== true) {
      return res.status(400).json({
        error: {
          code: 'CONSENT_REQUIRED',
          field: 'consentAccepted',
          message: 'Consent must be explicitly accepted (consentAccepted: true) before analysis.'
        }
      });
    }

    // Phase 2.2: Retrieve genuine biomedical research citations from PubMed
    const pubMedResult = await queryPubMed(body.symptom);

    if (pubMedResult?.error) {
      const errorMap = {
        NCBI_RATE_LIMITED: 429,
        NCBI_TIMEOUT: 504,
        NCBI_CONFIG_MISSING: 503,
        NCBI_UNAVAILABLE: 503,
        NCBI_PAYLOAD_TOO_LARGE: 502,
        NCBI_PARSE_ERROR: 502,
        NCBI_NETWORK_ERROR: 502,
        NCBI_ERROR: 502
      };
      const statusCode = errorMap[pubMedResult.error.code] || 500;
      return res.status(statusCode).json({
        error: pubMedResult.error
      });
    }

    return res.status(200).json({
      status: 'ready',
      stage: 'Phase 2.2 - PubMed Retrieval',
      data: pubMedResult.data
    });
  } catch {
    return res.status(500).json({
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'An unexpected error occurred while processing the request.'
      }
    });
  }
}

