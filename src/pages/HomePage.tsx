
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-game-background to-white flex flex-col">
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center px-4">
          <div className="flex flex-wrap justify-center mb-6 gap-3">
            <div className="text-7xl animate-bounce delay-100">🔢</div>
            <div className="text-7xl animate-float delay-200">📐</div>
            <div className="text-7xl animate-bounce delay-300">🧮</div>
            <div className="text-7xl animate-float delay-400">🍕</div>
            <div className="text-7xl animate-bounce delay-500">📊</div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="text-game-primary">Math</span>
            <span className="text-game-secondary">Quest</span>
            <span className="text-game-accent"> Grade 5</span>
          </h1>
          
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join an epic adventure through the world of mathematics! 
            Learn about numbers, operations, fractions, geometry, and more with fun challenges and puzzles.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              onClick={() => navigate('/character')}
              className="bg-game-primary hover:bg-game-primary/90 text-lg py-6 px-8 rounded-full"
            >
              Start New Adventure
            </Button>
            <Button 
              onClick={() => navigate('/dashboard')}
              variant="outline"
              className="text-lg py-6 px-8 rounded-full"
            >
              Continue Adventure
            </Button>
          </div>
        </div>
      </div>
      
      <footer className="bg-white p-4 text-center">
        <p className="text-gray-600">© 2025 MathQuest - Educational Math Game for 5th Grade</p>
      </footer>
    </div>
  );
};

export default HomePage;
