/**
 * Use this file for JavaScript code that you want to run in the front-end
 * on posts/pages that contain this block.
 *
 * When this file is defined as the value of the `viewScript` property
 * in `block.json` it will be enqueued on the front end of the site.
 *
 * Example:
 *
 * ```js
 * {
 *   "viewScript": "file:./view.js"
 * }
 * ```
 *
 * If you're not making any changes to this file because your project doesn't need any
 * JavaScript running in the front-end, then you should delete this file and remove
 * the `viewScript` property from `block.json`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */

// Select all elements with [data-animate-item] attribute
const elementsToAnimate = document.querySelectorAll(
  '[component-animation="true"]'
);

// Check if the user prefers reduced motion
const prefersReducedMotionNoPref = window.matchMedia(
  '(prefers-reduced-motion: no-preference)'
).matches;

// Create a new Intersection Observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const animatedElement = entry.target;

    if (entry.isIntersecting) {
      // If the element is in the viewport, add the 'animate' class
      animatedElement.setAttribute('component-is-animating', 'true');
    }
  });
});

// Only add observer if siteAnimationEnabled, there are elements to animate,
// and if user hasn't enabled reduced motion.
if (elementsToAnimate && prefersReducedMotionNoPref) {
  // Observe each .divider element
  elementsToAnimate.forEach((animatedElement) => {
    observer.observe(animatedElement);
  });
}

