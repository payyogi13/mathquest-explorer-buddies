
import React from 'react';
import { Button } from "@/components/ui/button";
import { useGame } from '@/contexts/GameContext';
import { useNavigate } from 'react-router-dom';

const GameNavbar: React.FC = () => {
  const { character, score, toggleLanguage, isEnglish } = useGame();
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <h1 
            className="text-2xl font-bold text-game-primary cursor-pointer"
            onClick={() => navigate('/')}
          >
            MathQuest <span className="text-game-secondary">Grade 5</span>
          </h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button 
            variant="outline" 
            size="sm"
            onClick={toggleLanguage}
          >
            {isEnglish ? "Local Language" : "English"}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/glossary')}
          >
            Glossary
          </Button>
          
          <div className="bg-gray-100 px-3 py-1 rounded-full flex items-center">
            <span className="text-yellow-500 mr-1">⭐</span>
            <span className="font-bold">{score}</span>
          </div>
          
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => navigate('/profile')}
          >
            <div className="text-2xl">{character?.avatar}</div>
            <span className="font-medium">{character?.name}</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default GameNavbar;
