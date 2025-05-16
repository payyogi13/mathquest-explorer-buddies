
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useGame } from '@/contexts/GameContext';
import { Badge } from "@/components/ui/badge";

const GlossaryTerms: React.FC = () => {
  const { glossary, isEnglish } = useGame();
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);

  const toggleTerm = (term: string) => {
    setSelectedTerm(selectedTerm === term ? null : term);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <h2 className="text-2xl font-bold text-center mb-6 text-game-primary">Math Glossary</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {glossary.map((term, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <Badge className={`bg-game-primary hover:bg-game-primary/90`}>
                  Chapter {term.chapter}
                </Badge>
                <button 
                  className="text-xs text-blue-500 hover:underline"
                  onClick={() => toggleTerm(term.term)}
                >
                  {selectedTerm === term.term ? "Hide" : "Show"} Definition
                </button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <CardTitle className="text-lg">
                  {isEnglish ? term.term : term.localTerm}
                </CardTitle>
                <button
                  className="text-xs px-2 py-1 rounded bg-gray-100 hover:bg-gray-200"
                  onClick={() => toggleTerm(term.term)}
                >
                  {isEnglish ? "Local" : "English"}
                </button>
              </div>
              
              {selectedTerm === term.term && (
                <CardDescription className="mt-2 p-2 bg-gray-50 rounded">
                  {term.definition}
                </CardDescription>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GlossaryTerms;
