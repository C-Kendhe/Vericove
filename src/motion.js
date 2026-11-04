import { animate } from 'motion';

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function enterPage(element) {
  if (!element || prefersReducedMotion()) return;
  animate(element, { opacity: [0.55, 1], y: [7, 0] }, { duration: 0.24, ease: [0.22, 0.61, 0.36, 1] });
}

export function animateSelection(element) {
  if (!element || prefersReducedMotion()) return;
  animate(element, { scale: [0.94, 1] }, { type: 'spring', stiffness: 520, damping: 32 });
}

export function openModal(root, variant = '') {
  if (!root || prefersReducedMotion()) return;
  animate(root, { opacity: [0, 1] }, { duration: 0.18, ease: 'easeOut' });
  const panel = root.querySelector('.modal');
  if (!panel) return;
  const keyframes = variant === 'comments-sheet'
    ? { opacity: [0, 1], x: [24, 0] }
    : variant === 'explore-detail-sheet'
      ? { opacity: [0, 1], scale: [.975, 1], y: [12, 0] }
      : { opacity: [0, 1], y: [22, 0] };
  animate(panel, keyframes, { type: 'spring', stiffness: 360, damping: 34 });
}

export function closeModal(root, done) {
  if (!root) return done?.();
  if (prefersReducedMotion()) return done?.();
  const panel = root.querySelector('.modal');
  if (!panel) return done?.();
  const isDrawer = panel.classList.contains('comments-sheet');
  const isExploreViewer = panel.classList.contains('explore-detail-sheet');
  const animation = animate(panel, isDrawer ? { opacity: 0, x: 24 } : isExploreViewer ? { opacity: 0, scale: .985, y: 10 } : { opacity: 0, y: 18 }, { duration: 0.16, ease: 'easeIn' });
  animate(root, { opacity: 0 }, { duration: 0.16, ease: 'easeIn' });
  animation.finished.then(() => done?.());
}

export function pressButton(element) {
  if (!element || prefersReducedMotion()) return;
  animate(element, { scale: 0.975 }, { duration: 0.09, ease: 'easeOut' });
}

export function releaseButton(element) {
  if (!element || prefersReducedMotion()) return;
  animate(element, { scale: 1 }, { type: 'spring', stiffness: 460, damping: 26 });
}
