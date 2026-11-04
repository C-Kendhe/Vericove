# Community motion rationale

The Community is a reading and participation surface. The primary motion language is short CSS transitions for navigation selection, hover, and press feedback, with the existing Motion One helper available for route and sheet transitions. No scroll choreography, continuous loops, WebGL, or decorative parallax is needed.

Stories and video use native media controls. Videos must not autoplay with sound; story viewing and any future reel playback should pause when inactive. The UI must honor `prefers-reduced-motion` and keep keyboard navigation usable without gestures.

The current app is a local browser preview. Reels and uploads remain session-local; no persistent media service is configured.
