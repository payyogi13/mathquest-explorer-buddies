
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useGame, Character } from '@/contexts/GameContext';

const characters: Character[] = [
  {
    id: '1',
    name: 'Math Explorer',
    avatar: '👦',
    selected: true,
  },
  {
    id: '2',
    name: 'Number Ninja',
    avatar: '👧',
    selected: false,
  },
  {
    id: '3',
    name: 'Fraction Friend',
    avatar: '🧙‍♂️',
    selected: false,
  },
  {
    id: '4',
    name: 'Geometry Genius',
    avatar: '👩‍🔬',
    selected: false,
  },
];

const CharacterSelector: React.FC = () => {
  const { setCharacter } = useGame();
  const [selectedCharacter, setSelectedCharacter] = React.useState<string>('1');

  const handleSelectCharacter = (character: Character) => {
    setSelectedCharacter(character.id);
    setCharacter({ ...character, selected: true });
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8 text-game-primary">Choose Your Character</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {characters.map((character) => (
          <Card
            key={character.id}
            className={`cursor-pointer transition-transform hover:scale-105 ${
              selectedCharacter === character.id 
                ? 'border-4 border-game-primary shadow-lg' 
                : 'border border-gray-200'
            }`}
            onClick={() => handleSelectCharacter(character)}
          >
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-xl">{character.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="text-7xl mb-4 animate-float">{character.avatar}</div>
              <CardDescription className="text-center">
                {character.id === '1' && "Good at exploring number systems"}
                {character.id === '2' && "Fast with calculations and operations"}
                {character.id === '3' && "Expert with fractions and division"}
                {character.id === '4' && "Master of shapes and angles"}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <Button 
          className="bg-game-primary hover:bg-game-primary/90 text-lg py-6 px-8 rounded-full"
          onClick={() => console.log("Character selected:", selectedCharacter)}
        >
          Continue to Adventure!
        </Button>
      </div>
    </div>
  );
};

export default CharacterSelector;
