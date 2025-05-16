
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GameProvider } from "./contexts/GameContext";

// Pages
import HomePage from "./pages/HomePage";
import CharacterPage from "./pages/CharacterPage";
import ChaptersPage from "./pages/ChaptersPage";
import ChapterDetail from "./pages/ChapterDetail";
import LevelPage from "./pages/LevelPage";
import DashboardPage from "./pages/DashboardPage";
import GlossaryPage from "./pages/GlossaryPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <GameProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/character" element={<CharacterPage />} />
            <Route path="/chapters" element={<ChaptersPage />} />
            <Route path="/chapter/:id" element={<ChapterDetail />} />
            <Route path="/level/:id" element={<LevelPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/glossary" element={<GlossaryPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </GameProvider>
  </QueryClientProvider>
);

export default App;
