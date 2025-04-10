import React from 'react';

function PerformanceSummary({ goals }) {
  // Calculate total goals achieved today
  const calculateTodayAchievements = () => {
    const today = new Date().toISOString().split('T')[0];
    let achieved = 0;
    
    goals.forEach(goal => {
      if (goal.progress) {
        const todayProgress = goal.progress.find(p => p.date === today);
        if (todayProgress && todayProgress.value >= goal.target) {
          achieved++;
        }
      }
    });
    
    return achieved;
  };
  
  // Calculate weekly achievements
  const calculateWeeklyAchievements = () => {
    const today = new Date();
    const oneWeekAgo = new Date(today);
    oneWeekAgo.setDate(today.getDate() - 7);
    
    let totalAchievements = 0;
    let totalPossible = 0;
    
    goals.forEach(goal => {
      if (goal.progress) {
        goal.progress.forEach(progress => {
          const progressDate = new Date(progress.date);
          if (progressDate >= oneWeekAgo && progressDate <= today) {
            totalPossible++;
            if (progress.value >= goal.target) {
              totalAchievements++;
            }
          }
        });
      }
    });
    
    return { achieved: totalAchievements, possible: totalPossible };
  };
  
  // Calculate average progress by category
  const calculateCategoryProgress = () => {
    const categories = {};
    
    goals.forEach(goal => {
      if (!categories[goal.category]) {
        categories[goal.category] = { total: 0, count: 0 };
      }
      
      if (goal.progress && goal.progress.length > 0) {
        // Get the latest progress
        const latestProgress = [...goal.progress]
          .sort((a, b) => new Date(b.date) - new Date(a.date))[0];
        
        const progressPercentage = Math.min(100, (latestProgress.value / goal.target) * 100);
        categories[goal.category].total += progressPercentage;
        categories[goal.category].count++;
      }
    });
    
    // Calculate averages
    const result = {};
    for (const category in categories) {
      if (categories[category].count > 0) {
        result[category] = Math.round(categories[category].total / categories[category].count);
      } else {
        result[category] = 0;
      }
    }
    
    return result;
  };
  
  const todayAchievements = calculateTodayAchievements();
  const weeklyStats = calculateWeeklyAchievements();
  const categoryProgress = calculateCategoryProgress();
  
  // Get color based on progress percentage
  const getProgressColor = (percentage) => {
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 50) return 'bg-primary-500';
    if (percentage >= 25) return 'bg-yellow-500';
    return 'bg-red-500';
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
        <h3 className="text-lg font-medium text-gray-800 mb-3">Aujourd'hui</h3>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">{todayAchievements} objectif(s) atteint(s) sur {goals.length}</span>
          <span className="text-sm font-medium">
            {goals.length > 0 ? Math.round((todayAchievements / goals.length) * 100) : 0}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className={`${getProgressColor(goals.length > 0 ? (todayAchievements / goals.length) * 100 : 0)} h-2.5 rounded-full transition-all duration-300`}
            style={{ width: `${goals.length > 0 ? (todayAchievements / goals.length) * 100 : 0}%` }}
          ></div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
        <h3 className="text-lg font-medium text-gray-800 mb-3">Cette Semaine</h3>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">
            {weeklyStats.achieved} objectif(s) atteint(s) sur {weeklyStats.possible} possible(s)
          </span>
          <span className="text-sm font-medium">
            {weeklyStats.possible > 0 ? Math.round((weeklyStats.achieved / weeklyStats.possible) * 100) : 0}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className={`${getProgressColor(weeklyStats.possible > 0 ? (weeklyStats.achieved / weeklyStats.possible) * 100 : 0)} h-2.5 rounded-full transition-all duration-300`}
            style={{ width: `${weeklyStats.possible > 0 ? (weeklyStats.achieved / weeklyStats.possible) * 100 : 0}%` }}
          ></div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
        <h3 className="text-lg font-medium text-gray-800 mb-3">Par Catégorie</h3>
        {Object.keys(categoryProgress).length > 0 ? (
          <div className="space-y-4">
            {Object.entries(categoryProgress).map(([category, progress]) => (
              <div key={category}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm capitalize">{category}</span>
                  <span className="text-sm font-medium">{progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className={`${getProgressColor(progress)} h-2.5 rounded-full transition-all duration-300`}
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500 italic">Aucune donnée disponible</p>
        )}
      </div>
    </div>
  );
}

export default PerformanceSummary;