import { blogData } from '../data/blogs.js';

export async function BlogList() {
  const blogs = await blogData.getBlogs();
  
  return `
    <div class="blog-list">
      ${blogs.map(blog => `
        <div class="blog-card" onclick="window.location.href='/post/${blog.id}'">
          <h2>${blog.title}</h2>
          <p>${blog.excerpt}</p>
        </div>
      `).join('')}
    </div>
  `;
}