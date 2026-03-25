export type Post = {
  slug: string;
  title: string;
  date: string;
  category: string;
  tags: string[];
  description?: string;
  body: string;
};
