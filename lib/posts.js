import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDir = path.join(process.cwd(), 'content', 'articles');

export function getAllPosts() {
  if (!fs.existsSync(postsDir)) return [];
  const filenames = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));
  const posts = filenames.map(filename => {
    const fullPath = path.join(postsDir, filename);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    const slug = filename.replace(/\.md$/, '');
    const excerpt = (content.split('\n').find(l => l.trim().length>0) || '').slice(0, 200);
    return { slug, excerpt, ...data };
  });
  posts.sort((a,b)=> new Date(b.date) - new Date(a.date));
  return posts;
}

export function getPostBySlug(slug) {
  const fullPath = path.join(postsDir, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  const processed = remark().use(html).processSync(content || '');
  return { slug, contentHtml: processed.toString(), ...data };
}
