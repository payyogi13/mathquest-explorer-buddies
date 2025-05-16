
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useGame } from '@/contexts/GameContext';
import { useNavigate } from 'react-router-dom';

const GameDashboard: React.FC = () => {
  const { character, chapters, score } = useGame();
  const navigate = useNavigate();

  // Calculate overall progress
  const overallProgress = chapters.reduce((total, chapter) => total + chapter.progress, 0) / chapters.length;
  
  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Player Profile */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Player Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <div className="text-7xl mb-4 animate-float">{character?.avatar}</div>
              <h3 className="text-2xl font-bold mb-2">{character?.name}</h3>
              <div className="bg-yellow-100 px-4 py-2 rounded-full mb-4">
                <span className="font-bold">⭐ {score} Points</span>
              </div>
              <Button 
                onClick={() => navigate('/character')}
                variant="outline"
                className="w-full"
              >
                Change Character
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Progress Summary */}
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Your Learning Journey</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span className="font-medium">Overall Progress</span>
                <span>{Math.round(overallProgress)}%</span>
              </div>
              <Progress value={overallProgress} className="h-2" />
            </div>
            
            <div className="space-y-4">
              {chapters.map((chapter) => (
                <div key={chapter.id}>
                  <div className="flex justify-between mb-1">
                    <span>{chapter.title}</span>
                    <span>{chapter.progress}%</span>
                  </div>
                  <Progress value={chapter.progress} className={`h-2 ${chapter.color.replace('bg-', 'bg-')}`} />
                </div>
              ))}
            </div>
            
            <div className="mt-6 flex justify-center">
              <Button 
                onClick={() => navigate('/chapters')}
                className="bg-game-primary hover:bg-game-primary/90"
              >
                Continue Learning
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Recent Activity and Achievements */}
        <Card className="col-span-1 lg:col-span-3">
          <CardHeader>
            <CardTitle>Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                <div className="text-5xl mb-2">🏅</div>
                <h4 className="font-bold">Math Explorer</h4>
                <p className="text-sm text-gray-500 text-center">Complete your first level</p>
              </div>
              <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg opacity-50">
                <div className="text-5xl mb-2">🔢</div>
                <h4 className="font-bold">Number Master</h4>
                <p className="text-sm text-gray-500 text-center">Complete Chapter 1</p>
              </div>
              <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg opacity-50">
                <div className="text-5xl mb-2">🧮</div>
                <h4 className="font-bold">Calculation Wizard</h4>
                <p className="text-sm text-gray-500 text-center">Complete Chapter 2</p>
              </div>
              <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg opacity-50">
                <div className="text-5xl mb-2">🍕</div>
                <h4 className="font-bold">Fraction Friend</h4>
                <p className="text-sm text-gray-500 text-center">Complete Chapter 3</p>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <Button 
                onClick={() => console.log("Print certificate")}
                variant="outline"
              >
                Print Achievement Certificate
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GameDashboard;
