import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDir = path.join(process.cwd(), 'content', 'articles');

export function getAllPosts() {
  if (!fs.existsSync(postsDir)) return [];

  const filenames = fs.readdirSync(postsDir).filter((f) => f.endsWith(".md"));

  const posts = filenames.map((file) => {
    const fullPath = path.join(postsDir, file);
    const md = fs.readFileSync(fullPath, "utf8");

    const { data, content } = matter(md);

    const slug = file.replace(/\.md$/, "");

    return {
      slug: String(slug),
      title: String(data.title || ""),
      date: String(data.date || ""),
      category: String(data.category || ""),
      excerpt: String(
        content.split("\n").find((l) => l.trim().length > 0)?.slice(0, 200) || ""
      ),
    };
  });

  return posts;
}

export async function getPostBySlug(slug) {
  const fullPath = path.join(postsDir, `${slug}.md`);

  if (!fs.existsSync(fullPath)) return null;

  const md = fs.readFileSync(fullPath, "utf8");

  const { data, content } = matter(md);

  const processed = await remark().use(html).process(content);
  const contentHtml = processed.toString();

  return {
    slug: String(slug),
    title: String(data.title || ""),
    date: String(data.date || ""),
    category: String(data.category || ""),
    contentHtml: String(contentHtml),
  };
}
