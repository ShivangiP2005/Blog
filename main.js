import { router } from './js/router.js';
import { BlogList } from './js/views/BlogList.js';
import { BlogPost } from './js/views/BlogPost.js';

// Initialize router
router.addRoute('/', BlogList);
router.addRoute('/post/:id', BlogPost);

// Handle navigation
document.addEventListener('click', e => {
  const link = e.target.closest('[data-link]');
  if (link) {
    e.preventDefault();
    history.pushState(null, null, link.href);
    router.navigate(window.location.pathname);
  }
});

// Handle browser back/forward
window.addEventListener('popstate', () => {
  router.navigate(window.location.pathname);
});

// Initial route
router.navigate(window.location.pathname);