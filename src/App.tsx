import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { BlogPage } from "./pages/BlogPage";
import { PostPage } from "./pages/PostPage";
import { ArchivePage } from "./pages/ArchivePage";
import { CategoryPage } from "./pages/CategoryPage";
import { TagPage } from "./pages/TagPage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { FunPage } from "./pages/FunPage";
import { GamesPage } from "./pages/GamesPage";
import { GomokuPage } from "./pages/GomokuPage";
import { ToolsPage } from "./pages/ToolsPage";
import { SportsPage } from "./pages/SportsPage";
import { LocalFileTransferPage } from "./pages/LocalFileTransferPage";
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
        <Route path="/fun" element={<FunPage />} />
        <Route path="/fun/games" element={<GamesPage />} />
        <Route path="/fun/games/gomoku" element={<GomokuPage />} />
        <Route path="/fun/tools" element={<ToolsPage />} />
        <Route path="/fun/tools/local-file-transfer" element={<LocalFileTransferPage />} />
        <Route path="/fun/sports" element={<SportsPage />} />
        <Route path="/badminton" element={<Navigate to="/fun" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}
