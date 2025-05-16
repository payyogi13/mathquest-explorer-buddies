
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useGame } from '@/contexts/GameContext';
import { useNavigate } from 'react-router-dom';
import { CircleCheck } from 'lucide-react';

const LevelSelector: React.FC = () => {
  const { levels, currentChapter, setCurrentLevel } = useGame();
  const navigate = useNavigate();
  
  const chapterLevels = levels.filter(level => level.chapterId === currentChapter);
  
  const handleSelectLevel = (levelId: number) => {
    setCurrentLevel(levelId);
    navigate(`/level/${levelId}`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="flex items-center justify-between mb-8">
        <Button 
          onClick={() => navigate('/chapters')}
          variant="outline"
          className="bg-white hover:bg-gray-100"
        >
          ← Back to Chapters
        </Button>
        <h2 className="text-2xl font-bold text-game-primary">Chapter {currentChapter} Levels</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {chapterLevels.map((level) => (
          <Card
            key={level.id}
            className="cursor-pointer transition-transform hover:scale-105"
            onClick={() => handleSelectLevel(level.id)}
          >
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>{level.title}</CardTitle>
                {level.completed && (
                  <Badge className="bg-green-500">
                    <CircleCheck className="mr-1 h-4 w-4" />
                    Completed
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>{level.description}</CardDescription>
              <Button className="mt-4 bg-game-secondary hover:bg-game-secondary/90 w-full">
                {level.completed ? "Play Again" : "Start Level"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LevelSelector;
