import matter from "gray-matter";
import type { Post } from "../types/post";

const rawModules = import.meta.glob<string>("../content/posts/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

function parsePosts(): Post[] {
  const posts: Post[] = [];
  for (const path of Object.keys(rawModules)) {
    const raw = rawModules[path];
    const { data, content } = matter(raw);
    const fileSlug = path.split("/").pop()?.replace(/\.md$/i, "") ?? "";
    const slug = (data.slug as string) || fileSlug;
    const title = data.title as string | undefined;
    const date = data.date as string | undefined;
    const category = (data.category as string) || "uncategorized";
    const tags = Array.isArray(data.tags) ? (data.tags as string[]) : [];
    const description = data.description as string | undefined;
    if (!title || !date) continue;
    posts.push({
      slug,
      title,
      date,
      category,
      tags,
      description,
      body: content.trim(),
    });
  }
  posts.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
  return posts;
}

let cached: Post[] | null = null;

export function getAllPosts(): Post[] {
  if (!cached) cached = parsePosts();
  return cached;
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}
