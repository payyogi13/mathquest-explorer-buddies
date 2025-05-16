
import React from 'react';
import GameNavbar from '@/components/game/GameNavbar';
import CharacterSelector from '@/components/game/CharacterSelector';

const CharacterPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-game-background flex flex-col">
      <GameNavbar />
      <div className="flex-1 py-10 px-4">
        <CharacterSelector />
      </div>
    </div>
  );
};

export default CharacterPage;
