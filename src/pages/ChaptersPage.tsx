
import React from 'react';
import GameNavbar from '@/components/game/GameNavbar';
import ChapterSelector from '@/components/game/ChapterSelector';

const ChaptersPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-game-background flex flex-col">
      <GameNavbar />
      <div className="flex-1 py-10 px-4">
        <ChapterSelector />
      </div>
    </div>
  );
};

export default ChaptersPage;
