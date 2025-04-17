import { blogData } from '../data/blogs.js';

export async function BlogPost(params) {
  const blog = await blogData.getBlogById(params.id);
  
  if (!blog) {
    return '<h1>Blog post not found</h1>';
  }

  setTimeout(() => {
    document.querySelectorAll('.chapter-header').forEach(header => {
      header.addEventListener('click', () => {
        const chapter = header.parentElement;
        chapter.classList.toggle('active');
      });
    });
  }, 0);

  return `
    <article class="blog-post">
      <h1>${blog.title}</h1>
      ${blog.chapters.map((chapter, index) => `
        <section class="chapter ${index === 0 ? 'active' : ''}">
          <div class="chapter-header">
            <h2>${chapter.title}</h2>
            <span class="chapter-toggle">▼</span>
          </div>
          <div class="chapter-content">
            ${chapter.content}
          </div>
        </section>
      `).join('')}
    </article>
  `;
}