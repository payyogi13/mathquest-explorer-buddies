
import React from 'react';
import GameNavbar from '@/components/game/GameNavbar';
import GameDashboard from '@/components/game/GameDashboard';

const DashboardPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-game-background flex flex-col">
      <GameNavbar />
      <div className="flex-1 py-10 px-4">
        <GameDashboard />
      </div>
    </div>
  );
};

export default DashboardPage;
