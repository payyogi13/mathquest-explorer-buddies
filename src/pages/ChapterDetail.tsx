
import React from 'react';
import { useParams } from 'react-router-dom';
import GameNavbar from '@/components/game/GameNavbar';
import LevelSelector from '@/components/game/LevelSelector';
import { useGame } from '@/contexts/GameContext';

const ChapterDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { setCurrentChapter } = useGame();
  
  // Set the current chapter based on the URL parameter
  React.useEffect(() => {
    if (id) {
      setCurrentChapter(parseInt(id));
    }
  }, [id, setCurrentChapter]);

  return (
    <div className="min-h-screen bg-game-background flex flex-col">
      <GameNavbar />
      <div className="flex-1 py-10 px-4">
        <LevelSelector />
      </div>
    </div>
  );
};

export default ChapterDetail;
