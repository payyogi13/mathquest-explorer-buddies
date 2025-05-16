
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useGame } from '@/contexts/GameContext';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const ROMAN_TILES = [
  { symbol: 'I', value: 1 },
  { symbol: 'V', value: 5 },
  { symbol: 'X', value: 10 },
  { symbol: 'L', value: 50 },
  { symbol: 'C', value: 100 },
  { symbol: 'D', value: 500 },
  { symbol: 'M', value: 1000 },
];

interface Challenge {
  target: number;
  hint: string;
}

const CHALLENGES: Challenge[] = [
  { target: 14, hint: "X is 10. Add smaller values to the right!" },
  { target: 9, hint: "I before X subtracts 1 from 10" },
  { target: 27, hint: "Try using X, X, V, I, I" },
  { target: 42, hint: "X after L means 40 + 2 = 42" },
];

const RomanNumeralGame: React.FC = () => {
  const { completeLevel, character } = useGame();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [currentChallenge, setCurrentChallenge] = useState<number>(0);
  const [selectedTiles, setSelectedTiles] = useState<string[]>([]);
  const [score, setScore] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [gameCompleted, setGameCompleted] = useState<boolean>(false);

  // Function to convert Roman numerals to decimal
  const romanToDecimal = (roman: string[]): number => {
    let result = 0;
    let prevValue = 0;
    
    for (let i = roman.length - 1; i >= 0; i--) {
      const currentSymbol = roman[i];
      const currentTile = ROMAN_TILES.find(tile => tile.symbol === currentSymbol);
      
      if (!currentTile) return 0;
      
      if (currentTile.value >= prevValue) {
        result += currentTile.value;
      } else {
        result -= currentTile.value;
      }
      
      prevValue = currentTile.value;
    }
    
    return result;
  };

  const addTile = (symbol: string) => {
    setSelectedTiles([...selectedTiles, symbol]);
  };

  const removeTile = (index: number) => {
    const newTiles = [...selectedTiles];
    newTiles.splice(index, 1);
    setSelectedTiles(newTiles);
  };

  const clearTiles = () => {
    setSelectedTiles([]);
  };

  const checkAnswer = () => {
    const userValue = romanToDecimal(selectedTiles);
    const targetValue = CHALLENGES[currentChallenge].target;
    
    if (userValue === targetValue) {
      toast({
        title: "Correct!",
        description: `${selectedTiles.join('')} = ${targetValue}`,
        variant: "default",
      });
      
      setScore(score + 10);
      
      // Move to next challenge or complete level
      if (currentChallenge < CHALLENGES.length - 1) {
        setCurrentChallenge(currentChallenge + 1);
        setSelectedTiles([]);
        setShowHint(false);
      } else {
        // Level completed
        completeLevel(1);
        setGameCompleted(true);
      }
    } else {
      toast({
        title: "Try Again",
        description: `${selectedTiles.join('')} = ${userValue}, but we need ${targetValue}`,
        variant: "destructive",
      });
      
      setScore(Math.max(0, score - 2));
    }
  };

  const handleShowHint = () => {
    setShowHint(true);
    setScore(Math.max(0, score - 1)); // Deduct 1 point for using a hint
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      {!gameCompleted ? (
        <>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-game-primary">Roman Numeral Forest</h2>
            <Badge className="bg-game-secondary px-4 py-2">Score: {score}</Badge>
          </div>
          
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-xl font-bold">Challenge {currentChallenge + 1}/{CHALLENGES.length}</h3>
                  <p className="text-gray-600">Convert to Roman Numerals: <span className="font-bold text-2xl">{CHALLENGES[currentChallenge].target}</span></p>
                </div>
                <div className="text-4xl animate-float">{character?.avatar}</div>
              </div>
              
              {showHint && (
                <div className="bg-yellow-50 p-4 rounded-md mb-4">
                  <p className="text-yellow-800">💡 {CHALLENGES[currentChallenge].hint}</p>
                </div>
              )}
              
              <div className="flex items-center justify-center h-24 bg-gray-50 rounded-lg mb-4">
                {selectedTiles.length > 0 ? (
                  <div className="flex space-x-2">
                    {selectedTiles.map((tile, index) => (
                      <button
                        key={index}
                        onClick={() => removeTile(index)}
                        className="h-16 w-16 bg-white border-2 border-game-primary rounded-lg flex items-center justify-center text-2xl font-bold hover:bg-red-50"
                      >
                        {tile}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400">Select tiles to build your Roman numeral</p>
                )}
              </div>
              
              <div className="flex justify-between">
                <div>
                  <p className="mb-2 text-sm text-gray-500">Current value: <span className="font-bold">{romanToDecimal(selectedTiles)}</span></p>
                </div>
                <div>
                  <Button 
                    variant="outline" 
                    onClick={clearTiles}
                    className="mr-2"
                  >
                    Clear
                  </Button>
                  {!showHint && (
                    <Button 
                      variant="outline" 
                      onClick={handleShowHint}
                      className="mr-2"
                    >
                      Hint
                    </Button>
                  )}
                  <Button 
                    onClick={checkAnswer}
                    disabled={selectedTiles.length === 0}
                    className="bg-game-primary hover:bg-game-primary/90"
                  >
                    Check
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="bg-white rounded-lg p-4 shadow-md">
            <h3 className="text-lg font-bold mb-4">Available Tiles</h3>
            <div className="grid grid-cols-7 gap-2">
              {ROMAN_TILES.map((tile) => (
                <button
                  key={tile.symbol}
                  onClick={() => addTile(tile.symbol)}
                  className="h-14 w-full bg-white border-2 border-gray-300 rounded-lg flex items-center justify-center text-xl font-bold hover:bg-gray-50 transition-colors"
                >
                  {tile.symbol}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2 mt-2 text-center text-xs text-gray-500">
              {ROMAN_TILES.map((tile) => (
                <div key={tile.value}>
                  = {tile.value}
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-10">
          <div className="text-7xl mb-6 animate-bounce">🏆</div>
          <h2 className="text-3xl font-bold text-game-primary mb-4">Level Completed!</h2>
          <p className="text-xl mb-6">You earned {score} points!</p>
          <div className="flex justify-center space-x-4">
            <Button 
              onClick={() => {
                setGameCompleted(false);
                setCurrentChallenge(0);
                setSelectedTiles([]);
                setScore(0);
              }}
              variant="outline"
            >
              Play Again
            </Button>
            <Button 
              onClick={() => navigate('/chapters')}
              className="bg-game-primary hover:bg-game-primary/90"
            >
              Continue Adventure
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RomanNumeralGame;
