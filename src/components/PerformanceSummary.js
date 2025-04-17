import React from 'react';

function PerformanceSummary({ goals }) {

  const calculateStats = () => {
    const today = new Date().toISOString().split('T')[0];
    
    const totalGoals = goals.length;
    
    let goalsTrackedToday = 0;
    let goalsAchievedToday = 0;
    
    goals.forEach(goal => {
      if (goal.progress) {
        const todayProgress = goal.progress.find(p => p.date === today);
        if (todayProgress) {
          goalsTrackedToday++;
          if (todayProgress.value >= goal.target) {
            goalsAchievedToday++;
          }
        }
      }
    });
    
    return {
      totalGoals,
      goalsTrackedToday,
      goalsAchievedToday
    };
  };
  
  const stats = calculateStats();
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h3 className="text-lg font-medium text-gray-800 mb-4">Statistiques</h3>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <p className="text-2xl font-bold text-primary-500">{stats.totalGoals}</p>
          <p className="text-sm text-gray-600">Objectifs totaux</p>
        </div>
        
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <p className="text-2xl font-bold text-primary-500">{stats.goalsTrackedToday}</p>
          <p className="text-sm text-gray-600">Suivis aujourd'hui</p>
        </div>
        
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <p className="text-2xl font-bold text-green-500">{stats.goalsAchievedToday}</p>
          <p className="text-sm text-gray-600">Atteints aujourd'hui</p>
        </div>
      </div>
    </div>
  );
}

export default PerformanceSummary;