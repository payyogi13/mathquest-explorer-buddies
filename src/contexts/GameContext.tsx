
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the types for our game state
export type Character = {
  id: string;
  name: string;
  avatar: string;
  selected: boolean;
};

export type Chapter = {
  id: number;
  title: string;
  englishTitle: string;
  description: string;
  icon: string;
  color: string;
  progress: number;
  unlocked: boolean;
};

export type GameLevel = {
  id: number;
  chapterId: number;
  title: string;
  description: string;
  completed: boolean;
};

export type GlossaryTerm = {
  term: string;
  localTerm: string;
  definition: string;
  chapter: number;
};

type GameContextType = {
  character: Character | null;
  setCharacter: (character: Character) => void;
  chapters: Chapter[];
  levels: GameLevel[];
  glossary: GlossaryTerm[];
  currentChapter: number;
  setCurrentChapter: (chapter: number) => void;
  currentLevel: number;
  setCurrentLevel: (level: number) => void;
  score: number;
  setScore: (score: number) => void;
  toggleLanguage: () => void;
  isEnglish: boolean;
  completeLevel: (levelId: number) => void;
  unlockChapter: (chapterId: number) => void;
  updateProgress: (chapterId: number, progress: number) => void;
};

const defaultCharacters: Character[] = [
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
];

const defaultChapters: Chapter[] = [
  {
    id: 1,
    title: 'Number Systems',
    englishTitle: 'Number Systems',
    description: 'Learn about Roman numerals and place value',
    icon: '🔢',
    color: 'bg-game-primary',
    progress: 0,
    unlocked: true,
  },
  {
    id: 2,
    title: 'Operations',
    englishTitle: 'Operations',
    description: 'Addition, subtraction, multiplication, and division',
    icon: '➕',
    color: 'bg-game-secondary',
    progress: 0,
    unlocked: false,
  },
  {
    id: 3,
    title: 'Fractions',
    englishTitle: 'Fractions',
    description: 'Equivalence, comparison, and arithmetic with fractions',
    icon: '🍕',
    color: 'bg-game-accent',
    progress: 0,
    unlocked: false,
  },
  {
    id: 4,
    title: 'Geometry',
    englishTitle: 'Geometry',
    description: 'Angles, circles, and lines',
    icon: '📐',
    color: 'bg-green-500',
    progress: 0,
    unlocked: false,
  },
  {
    id: 5,
    title: 'Measurement & Data',
    englishTitle: 'Measurement & Data',
    description: 'Tables, graphs, and unit conversion',
    icon: '📊',
    color: 'bg-yellow-500',
    progress: 0,
    unlocked: false,
  },
];

const defaultLevels: GameLevel[] = [
  {
    id: 1,
    chapterId: 1,
    title: 'Roman Numeral Forest',
    description: 'Help decode Roman numerals to cross a river',
    completed: false,
  },
  {
    id: 2,
    chapterId: 1,
    title: 'Place Value Valley',
    description: 'Arrange digits in their correct positions',
    completed: false,
  },
  {
    id: 3,
    chapterId: 2,
    title: 'Addition Mountain',
    description: 'Climb the mountain by solving addition problems',
    completed: false,
  },
];

const defaultGlossary: GlossaryTerm[] = [
  {
    term: 'Roman Numerals',
    localTerm: 'रोमन अंक',
    definition: 'Symbols used in ancient Rome for counting: I, V, X, L, C, D, M',
    chapter: 1,
  },
  {
    term: 'Place Value',
    localTerm: 'स्थानीय मान',
    definition: 'The value given to a digit by its position in a number',
    chapter: 1,
  },
  {
    term: 'Fraction',
    localTerm: 'अंश',
    definition: 'A number representing a part of a whole',
    chapter: 3,
  },
];

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [character, setCharacterState] = useState<Character>(defaultCharacters[0]);
  const [chapters, setChapters] = useState<Chapter[]>(defaultChapters);
  const [levels, setLevels] = useState<GameLevel[]>(defaultLevels);
  const [glossary] = useState<GlossaryTerm[]>(defaultGlossary);
  const [currentChapter, setCurrentChapter] = useState<number>(1);
  const [currentLevel, setCurrentLevel] = useState<number>(1);
  const [score, setScore] = useState<number>(0);
  const [isEnglish, setIsEnglish] = useState<boolean>(true);

  const setCharacter = (character: Character) => {
    setCharacterState(character);
  };

  const toggleLanguage = () => {
    setIsEnglish(!isEnglish);
  };

  const completeLevel = (levelId: number) => {
    setLevels(
      levels.map((level) =>
        level.id === levelId
          ? { ...level, completed: true }
          : level
      )
    );

    // Find the chapter for this level
    const level = levels.find((l) => l.id === levelId);
    if (level) {
      updateProgress(level.chapterId, 20); // Increase progress by 20%
    }
  };

  const unlockChapter = (chapterId: number) => {
    setChapters(
      chapters.map((chapter) =>
        chapter.id === chapterId
          ? { ...chapter, unlocked: true }
          : chapter
      )
    );
  };

  const updateProgress = (chapterId: number, progress: number) => {
    setChapters(
      chapters.map((chapter) =>
        chapter.id === chapterId
          ? { 
              ...chapter, 
              progress: Math.min(100, chapter.progress + progress),
              unlocked: true
            }
          : chapter
      )
    );

    // If chapter is complete, unlock the next chapter
    const updatedChapter = chapters.find((c) => c.id === chapterId);
    if (updatedChapter && updatedChapter.progress + progress >= 100) {
      unlockChapter(chapterId + 1);
    }
  };

  return (
    <GameContext.Provider
      value={{
        character,
        setCharacter,
        chapters,
        levels,
        glossary,
        currentChapter,
        setCurrentChapter,
        currentLevel,
        setCurrentLevel,
        score,
        setScore,
        toggleLanguage,
        isEnglish,
        completeLevel,
        unlockChapter,
        updateProgress,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
