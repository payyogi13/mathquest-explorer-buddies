
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import GameNavbar from '@/components/game/GameNavbar';
import RomanNumeralGame from '@/components/game/RomanNumeralGame';
import { Button } from "@/components/ui/button";
import { useGame } from '@/contexts/GameContext';

const LevelPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { setCurrentLevel, currentChapter } = useGame();
  const navigate = useNavigate();
  
  React.useEffect(() => {
    if (id) {
      setCurrentLevel(parseInt(id));
    }
  }, [id, setCurrentLevel]);

  return (
    <div className="min-h-screen bg-game-background flex flex-col">
      <GameNavbar />
      <div className="container mx-auto py-4 px-4">
        <Button 
          onClick={() => navigate(`/chapter/${currentChapter}`)}
          variant="outline"
          className="mb-4"
        >
          ← Back to Chapter
        </Button>
        
        <div className="flex-1 py-6">
          <RomanNumeralGame />
        </div>
      </div>
    </div>
  );
};

export default LevelPage;
