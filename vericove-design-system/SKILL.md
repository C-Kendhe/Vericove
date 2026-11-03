# VERICOVE — MASTER UI/UX DESIGN SYSTEM & DEVELOPMENT INSTRUCTIONS

## 1. Your role

Act as a senior product designer, Apple-inspired UI/UX specialist, and experienced frontend engineer.

You are working on **Vericove**, a women's healthcare and wellness platform.

Your responsibility is to create a polished, production-quality web application that feels and behaves like a thoughtfully designed iOS application.

Do not approach this as a conventional healthcare website.

The experience should feel like:
- The simplicity and visual refinement of Apple applications.
- The familiar interactions and information structure of iOS.
- The community engagement and discussion model of Reddit.
- The warmth, trust and sensitivity required by a women's healthcare platform.

The interface must remain minimal, intuitive, accessible and aesthetically pleasing.

**Core design philosophy: Show less, communicate more.**

---

## 2. Brand identity

Product name: VERICOVE

Tagline: Understand • Care • Thrive

Product category: Women's healthcare, wellness, medical information, research and community.

Brand personality:
- Calm
- Trustworthy
- Feminine without being stereotypically feminine
- Intelligent
- Reassuring
- Modern
- Professional
- Approachable

The product should communicate that women have a reliable place to understand their health, discover verified medical professionals, access research and connect with others.

Avoid:
- Overly pink interfaces.
- Excessive gradients.
- Cartoonish illustrations.
- Generic medical website aesthetics.
- Excessive decorative elements.
- Futuristic dashboards.
- Dense information layouts.
- Unnecessary animations.

---

## 3. Overall visual direction

Use an Apple-inspired design language.

The website should look like an application rather than a traditional website.

### Layout philosophy

- Prefer compact, carefully structured layouts.
- Use generous whitespace.
- Maintain consistent alignment and spacing.
- Avoid filling every available space with information.
- Keep important information immediately visible.
- Use progressive disclosure: show essential information first and reveal additional details when needed.
- Use floating trays, contextual panels, sheets and popovers instead of excessive permanent sidebars.
- Make navigation predictable and consistent.

### Shapes and geometry

Use a refined squircle-inspired design language.

Preferred:
- Rounded-square application icons.
- Softly rounded cards.
- Smooth pill-shaped controls.
- Rounded search fields.
- Subtle floating navigation trays.
- Rounded modal sheets.
- Consistent corner radii.

Avoid:
- Excessively circular cards.
- Sharp, harsh rectangular components.
- Randomly mixing different border radii.

Suggested radius system:
- Small controls: 10–12px.
- Inputs and buttons: 12–16px.
- Cards: 18–22px.
- Large panels and sheets: 24–28px.
- Floating trays: 20–24px.

---

## 4. Colour system

Build a cohesive design system around Vericove's identity.

Suggested palette:

Primary:
- Deep Plum: #694F70
- Muted Mauve: #98758F
- Dusty Rose: #C98CA6
- Soft Blush: #F5E8ED

Backgrounds:
- Warm Ivory: #FCFAF8
- Pure White: #FFFFFF
- Soft Grey: #F5F5F7
- Secondary Surface: #F0EEF1

Text:
- Primary: #252329
- Secondary: #77727B
- Muted: #A19BA4

Borders:
- #EAE6E9

Use the palette carefully.

The majority of the interface should remain white, warm ivory or very light neutral grey.

Use plum and mauve for primary actions, selected navigation items and important highlights.

Use blush as a subtle accent, not as the background of every section.

Maintain sufficient contrast and accessible text colours.

Create reusable colour tokens rather than hardcoding colours throughout components.

---

## 5. Typography

Use an elegant, modern sans-serif typography system.

Preferred font direction:
- SF Pro Display / SF Pro Text where available.
- Inter as a practical web alternative.
- Use a refined serif font sparingly for editorial headings or research content if appropriate.

Typography should feel similar to Apple applications.

Hierarchy:
- Large page headings: 30–36px.
- Section headings: 20–24px.
- Card headings: 15–18px.
- Body text: 14–16px.
- Secondary information: 12–13px.

Use font weight, spacing and hierarchy instead of excessive colours or decorative elements.

Keep paragraphs readable and avoid unnecessarily long text blocks.

---

## 6. Navigation and application structure

The navigation must feel like an application interface.

Use a clean navigation system with a consistent layout across all primary pages.

Desktop:
- A compact sidebar or floating navigation rail.
- Main content centred within a comfortable maximum width.
- Contextual right-side panels only where useful.
- Avoid unnecessarily wide content areas.

Mobile:
- A fixed bottom navigation tray inspired by native iOS tab bars.
- Compact icons with clear labels.
- Proper safe-area spacing.
- Touch-friendly controls.
- Avoid desktop-style sidebars.

Suggested primary sections:

1. Home
2. My Health
3. Community
4. Discover
5. Profile

The Discover section can contain:
- Doctors
- Research
- Health resources

Do not create too many primary navigation destinations.

Use contextual navigation for secondary features.

Navigation should preserve the user's context when switching between sections.

---

## 7. iOS-inspired interface components

Build a reusable component system inspired by native iOS applications.

Components should include:

### Navigation
- Floating tab bars.
- Sidebar navigation.
- Icon trays.
- Active navigation indicators.
- Contextual navigation menus.

### Controls
- Squircle icon buttons.
- Pill buttons.
- Segmented controls.
- Toggle switches.
- Search fields.
- Filter chips.
- Dropdown menus.

### Content
- Minimal cards.
- List rows.
- Profile cards.
- Compact information panels.
- Activity indicators.
- Empty states.

### Overlays
- Bottom sheets.
- Modal sheets.
- Popovers.
- Context menus.
- Confirmation dialogs.
- Toast notifications.

### Interaction behaviour

Use subtle and purposeful motion:
- Smooth transitions.
- Gentle hover states.
- Small scale feedback on clickable controls.
- Soft sheet transitions.
- Animated selection indicators.
- Loading skeletons.

Animations should generally be short, around 150–250ms.

Respect reduced-motion preferences.

Do not animate everything.

---

## 8. Community — Reddit-inspired experience

The Community section is a major feature of Vericove.

It should borrow Reddit's interaction model and discussion structure, but use Vericove's calmer, cleaner visual language.

Do not simply copy Reddit's appearance.

### Community feed

Create a clean discussion feed with:
- Post title.
- Short content preview.
- Community/category name.
- Timestamp.
- Anonymous or chosen display identity.
- Upvote and downvote controls.
- Comment count.
- Save/bookmark action.
- Share action.
- Optional image attachments.
- Relevant tags.

Posts should be presented as clean feed items or subtle cards.

Avoid excessive borders and unnecessary metadata.

### Community categories

Support topic-based communities such as:
- General Women's Health.
- Menstrual Health.
- PCOS and Hormonal Health.
- Pregnancy and Fertility.
- Mental Wellbeing.
- Nutrition and Lifestyle.
- Menopause.
- Ask a Question.

Categories should be easy to discover without occupying excessive screen space.

### Community interactions

Implement the familiar Reddit-like interaction model:
- Upvotes and downvotes.
- Comment threads.
- Nested replies.
- Sorting by Latest, Popular and Trending.
- Save posts.
- Report posts.
- Share posts.
- Follow communities.
- Create posts.
- Search discussions.

### Post creation

The post composer should feel like a clean native-app sheet.

Include:
- Title.
- Body.
- Community selection.
- Topic tags.
- Anonymous posting option.
- Image attachment where supported.

Keep the publishing flow simple.

### Community safety

Women's healthcare discussions require careful moderation.

Include:
- Report functionality.
- Moderation status.
- Content warnings where appropriate.
- Community guidelines.
- Privacy-aware anonymous identities.
- Clear distinction between personal experiences and verified medical information.

Do not present community comments as medical advice.

---

## 9. My Health — personal health space

This section should feel private, organised and reassuring.

It may include:

- Health journal.
- Symptom tracking.
- Personal health records.
- Medical history.
- Consultation summaries.
- Saved health information.
- Personal health timeline.

Present information progressively.

For example, the health overview should show a small number of useful summary cards rather than a giant dashboard full of charts.

Use charts only when they genuinely help communicate health trends.

### AI-assisted health intelligence

Provide a clean interface for AI-assisted symptom organisation and health journaling.

The AI should help users:
- Organise symptoms.
- Identify patterns in their recorded information.
- Maintain a health journal.
- Prepare questions for medical consultations.
- Summarise consultation notes.
- Understand general health information.

It must not present itself as a doctor or provide definitive diagnoses.

Clearly distinguish AI-generated information from clinician-verified information.

Use appropriate medical disclaimers and encourage professional medical care when needed.

---

## 10. Doctors — minimal Apple-like discovery experience

The doctor discovery section should feel like browsing a carefully curated application directory.

Avoid traditional hospital-directory layouts.

### Doctor cards

Each doctor card should present only the most relevant information:

- Doctor photograph.
- Name.
- Medical speciality.
- Qualifications or verification status.
- Experience.
- Location.
- Consultation type.
- Rating and review count.
- Availability, when verified.
- View profile action.

Use subtle cards with generous spacing.

### Doctor profile

Create a clean profile page with:

- Profile image.
- Name and speciality.
- Verification details.
- Qualifications.
- Experience.
- Areas of expertise.
- Consultation information.
- Patient reviews.
- Appointment or contact action.

Use tabs or segmented controls for secondary information.

Never invent doctor credentials, verification badges, ratings or availability.

Clearly distinguish verified credentials from user-submitted reviews.

---

## 11. Research — editorial Apple-like experience

The Research section should feel like a premium knowledge and publication platform.

It should not look like an academic database or a cluttered article directory.

### Research discovery

Use a clean editorial layout featuring:

- Featured research.
- Recently published studies.
- Research categories.
- Topics in women's healthcare.
- Search and filters.
- Saved research.

### Research cards

Display:
- Research title.
- Short summary.
- Research category.
- Publication source.
- Publication date.
- Author or institution when available.
- Read more action.

Use clear typography and generous whitespace.

### Research details

Create an elegant reading experience:
- Readable article width.
- Clear title hierarchy.
- Source attribution.
- Publication details.
- Summary.
- Key findings.
- Limitations.
- References.
- Save and share actions.

Do not fabricate studies, citations, authors or scientific findings.

Clearly separate published evidence from AI-generated summaries.

---

## 12. Search and discovery

Search should be globally accessible and visually minimal.

Use a clean search interface inspired by iOS Spotlight.

Allow discovery across:
- Doctors.
- Community discussions.
- Research articles.
- Health resources.

Use contextual filters and suggestions.

Do not overwhelm the search interface with too many controls.

---

## 13. Icons and visual assets

Use a consistent icon family.

Preferred:
- SF Symbols-inspired iconography.
- Lucide icons as a practical web implementation.

Icons should:
- Be simple.
- Have consistent stroke weight.
- Use restrained colours.
- Remain visually aligned.
- Be understandable without unnecessary decoration.

Use custom illustrations only where they add meaningful value.

Avoid generic stock healthcare illustrations.

---

## 14. Responsive design

The website must feel like an application on both desktop and mobile.

Desktop:
- Application-style layout.
- Compact navigation.
- Comfortable reading widths.
- Well-spaced content.
- Minimal contextual panels.

Tablet:
- Adaptive navigation.
- Flexible card grids.
- Touch-friendly interactions.

Mobile:
- iOS-inspired bottom navigation.
- Full-width content.
- Native-feeling sheets.
- Safe-area-aware spacing.
- Comfortable touch targets.
- No horizontal overflow.

Do not simply shrink the desktop interface.

Design mobile experiences intentionally.

---

## 15. Accessibility, privacy and trust

Vericove deals with sensitive personal health information.

Design for:
- Clear privacy controls.
- Consent before sharing sensitive information.
- Accessible contrast.
- Keyboard navigation.
- Screen-reader-friendly labels.
- Appropriate loading and error states.
- Secure-looking but honest privacy communication.

Do not claim that data is encrypted, verified, anonymous or secure unless the underlying implementation supports that claim.

Anonymous community participation must not expose a user's personal identity in public interfaces.

---

## 16. Development instructions

Before making changes:

1. Inspect the existing project structure.
2. Understand the existing framework, routing and component architecture.
3. Identify existing features and preserve working functionality.
4. Inspect the existing colour system, typography and reusable components.
5. Identify inconsistencies with this design direction.

Then:

1. Establish a central design-token system.
2. Create reusable UI components.
3. Apply consistent layouts and spacing.
4. Refactor existing screens progressively.
5. Implement responsive behaviour.
6. Add meaningful interaction states.
7. Test all major navigation flows.
8. Check for visual inconsistencies across pages.

Do not unnecessarily replace the existing tech stack.

Do not delete functional features simply to simplify the design.

Do not create fake functionality or non-working buttons.

Use realistic mock data only when backend data is unavailable, and clearly separate mock data from actual records.

Avoid giant monolithic components.

Keep the code modular, maintainable and reusable.

---

## 17. Visual quality checklist

Before considering any page complete, ask:

- Does this look like an application rather than a generic website?
- Does it follow the Vericove design language?
- Is the page visually calm?
- Is there too much information on screen?
- Can unnecessary elements be removed?
- Is the primary action immediately understandable?
- Are icons and controls consistent?
- Does the layout work on mobile?
- Are spacing and typography consistent?
- Does the experience feel trustworthy and appropriate for women's healthcare?

If a screen feels crowded, simplify it.

If a component feels visually inconsistent, redesign it.

If an interaction requires too many steps, improve the flow.

**Final principle: Every screen should feel like it belongs to the same carefully designed application.**

Vericove should feel less like a healthcare portal and more like a beautifully crafted personal health companion.