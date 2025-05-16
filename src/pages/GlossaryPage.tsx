
import React from 'react';
import GameNavbar from '@/components/game/GameNavbar';
import GlossaryTerms from '@/components/game/GlossaryTerms';

const GlossaryPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-game-background flex flex-col">
      <GameNavbar />
      <div className="flex-1 py-10 px-4">
        <GlossaryTerms />
      </div>
    </div>
  );
};

export default GlossaryPage;
