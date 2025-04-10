import React, { useState, useEffect } from 'react';
import GoalForm from './components/GoalForm';
import GoalList from './components/GoalList';
import ProgressForm from './components/ProgressForm';
import PerformanceSummary from './components/PerformanceSummary';

function App() {
  const [goals, setGoals] = useState([]);
  const [selectedGoal, setSelectedGoal] = useState(null);

  // Load goals from localStorage when the app starts
  useEffect(() => {
    const savedGoals = localStorage.getItem('fitnessGoals');
    if (savedGoals) {
      setGoals(JSON.parse(savedGoals));
    }
  }, []);

  // Save goals to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('fitnessGoals', JSON.stringify(goals));
  }, [goals]);

  // Add a new goal
  const addGoal = (newGoal) => {
    setGoals([...goals, { ...newGoal, id: Date.now(), progress: [] }]);
  };

  // Update an existing goal
  const updateGoal = (updatedGoal) => {
    setGoals(goals.map(goal => 
      goal.id === updatedGoal.id ? updatedGoal : goal
    ));
  };

  // Delete a goal
  const deleteGoal = (goalId) => {
    setGoals(goals.filter(goal => goal.id !== goalId));
    if (selectedGoal && selectedGoal.id === goalId) {
      setSelectedGoal(null);
    }
  };

  // Add progress to a goal
  const addProgress = (goalId, progressData) => {
    setGoals(goals.map(goal => {
      if (goal.id === goalId) {
        return {
          ...goal,
          progress: [...goal.progress, { ...progressData, date: new Date().toISOString().split('T')[0] }]
        };
      }
      return goal;
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Column */}
          <div className="md:w-1/3">
            <div className="card mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Ajouter un Objectif</h2>
              <GoalForm addGoal={addGoal} />
            </div>
            
            <div className="card">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Suivi Quotidien</h2>
              {selectedGoal ? (
                <ProgressForm 
                  goal={selectedGoal} 
                  addProgress={addProgress} 
                />
              ) : (
                <p className="text-gray-500 italic">Sélectionnez un objectif pour enregistrer votre progression</p>
              )}
            </div>
          </div>
          
          {/* Right Column */}
          <div className="md:w-2/3">
            <div className="card mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Mes Objectifs</h2>
              <GoalList 
                goals={goals} 
                deleteGoal={deleteGoal} 
                updateGoal={updateGoal}
                selectGoal={setSelectedGoal}
                selectedGoalId={selectedGoal?.id}
              />
            </div>
            
            <div className="card">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Résumé des Performances</h2>
              <PerformanceSummary goals={goals} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
