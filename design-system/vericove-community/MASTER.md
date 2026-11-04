# Vericove Community visual contract

## Product and audience

An adult, women’s health community for people sharing lived experience, looking for peer support, and discovering topic-based conversations. The screen’s primary job is to help people find a safe, relevant conversation and participate at their own pace.

## Direction

Premium, calm, and native-feeling. Use Vericove’s existing plum, mauve, dusty rose, blush, warm ivory, and white palette. Keep most surfaces light and let the content lead. Use Manrope for headings and the existing DM Sans/system stack for interface text. Use restrained translucent blur for the floating navigation only.

## Layout

- Desktop: sticky compact header, readable feed column, contextual discovery rail, and a floating bottom dock.
- Community pages: use the readable `w/<slug>` namespace and share the main app shell.
- Small screens: single-column content, horizontally scrollable stories and topic controls, a safe-area-aware bottom dock, and touch targets at least 44px tall.
- Prefer open lists and media-led posts over wrapping every element in a card.

## Interactions and states

- Keep navigation, search, feed selection, voting, comments, saves, follows, post creation, and notification read state keyboard accessible and visibly selected.
- Respect reduced motion. Use opacity and transform for short route and pressed-state transitions.
- Show honest empty, loading, unavailable, and error states. Do not invent member counts or imply a server connection.
- Community posts and account actions currently use the app’s browser-local preview model. Private messaging stays unavailable until authenticated server storage and authorization exist.

## Safety and accessibility

- Preserve pseudonymous community posting and do not expose private health records.
- Label icon controls, keep focus visible, and do not use color alone to convey state.
- Community content is peer support and is not medical advice.
