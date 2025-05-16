
import React from 'react';
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useGame } from '@/contexts/GameContext';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';

const ChapterSelector: React.FC = () => {
  const { chapters, setCurrentChapter, isEnglish } = useGame();
  const navigate = useNavigate();

  const handleSelectChapter = (chapterId: number, unlocked: boolean) => {
    if (unlocked) {
      setCurrentChapter(chapterId);
      navigate(`/chapter/${chapterId}`);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-8 text-game-primary">Select a Chapter</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {chapters.map((chapter) => (
          <Card
            key={chapter.id}
            className={`chapter-card cursor-pointer ${!chapter.unlocked && 'opacity-70'}`}
            onClick={() => handleSelectChapter(chapter.id, chapter.unlocked)}
          >
            <div className={`absolute top-0 left-0 w-full h-1.5 ${chapter.color}`} />
            
            <div className="flex items-center mb-4">
              <div className={`text-4xl mr-4 ${chapter.unlocked ? 'animate-float' : ''}`}>
                {chapter.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold">
                  {isEnglish ? chapter.englishTitle : chapter.title}
                </h3>
                <p className="text-sm text-gray-600">{chapter.description}</p>
              </div>
            </div>
            
            {chapter.unlocked ? (
              <>
                <Progress value={chapter.progress} className="h-2 mb-2" />
                <p className="text-sm text-gray-500 text-right">{chapter.progress}% Complete</p>
              </>
            ) : (
              <div className="flex justify-center items-center mt-6">
                <Lock className="text-gray-400 mr-2" />
                <p className="text-gray-400">Complete previous chapter to unlock</p>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ChapterSelector;
