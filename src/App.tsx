import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { BlogPage } from "./pages/BlogPage";
import { PostPage } from "./pages/PostPage";
import { ArchivePage } from "./pages/ArchivePage";
import { CategoryPage } from "./pages/CategoryPage";
import { TagPage } from "./pages/TagPage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { BadmintonPage } from "./pages/BadmintonPage";
import { NotFoundPage } from "./pages/NotFoundPage";

export function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/archive" element={<ArchivePage />} />
        <Route path="/blog/category/:categorySlug" element={<CategoryPage />} />
        <Route path="/blog/tag/:tagSlug" element={<TagPage />} />
        <Route path="/blog/:slug" element={<PostPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/badminton" element={<BadmintonPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}
