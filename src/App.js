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
      try {
        const parsedGoals = JSON.parse(savedGoals);
        setGoals(parsedGoals);
        
        // If there was a selected goal, try to restore it
        const savedSelectedGoalId = localStorage.getItem('selectedGoalId');
        if (savedSelectedGoalId) {
          const selectedGoal = parsedGoals.find(goal => goal.id.toString() === savedSelectedGoalId);
          if (selectedGoal) {
            setSelectedGoal(selectedGoal);
          }
        }
      } catch (error) {
        console.error('Error parsing saved goals:', error);
        localStorage.removeItem('fitnessGoals');
      }
    }
  }, []);

  // Save goals to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('fitnessGoals', JSON.stringify(goals));
    
    // Also save the selected goal ID if there is one
    if (selectedGoal) {
      localStorage.setItem('selectedGoalId', selectedGoal.id);
    } else {
      localStorage.removeItem('selectedGoalId');
    }
  }, [goals, selectedGoal]);

  // Add a new goal
  const addGoal = (newGoal) => {
    const goalWithId = { 
      ...newGoal, 
      id: Date.now(), 
      progress: [],
      createdAt: new Date().toISOString()
    };
    setGoals([...goals, goalWithId]);
  };

  // Update an existing goal
  const updateGoal = (updatedGoal) => {
    const updatedGoals = goals.map(goal => 
      goal.id === updatedGoal.id ? updatedGoal : goal
    );
    setGoals(updatedGoals);
    
    // If the updated goal is the selected one, update the selected goal state too
    if (selectedGoal && selectedGoal.id === updatedGoal.id) {
      setSelectedGoal(updatedGoal);
    }
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
    const updatedGoals = goals.map(goal => {
      if (goal.id === goalId) {
        const newProgress = { 
          ...progressData, 
          date: new Date().toISOString().split('T')[0],
          id: Date.now() // Add unique ID for each progress entry
        };
        
        const updatedGoal = {
          ...goal,
          progress: [...goal.progress, newProgress]
        };
        
        // If this is the selected goal, update the selected goal state too
        if (selectedGoal && selectedGoal.id === goalId) {
          setSelectedGoal(updatedGoal);
        }
        
        return updatedGoal;
      }
      return goal;
    });
    
    setGoals(updatedGoals);
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
              <h2 className="text-xl font-bold text-gray-800 mb-4">Statistiques</h2>
              <PerformanceSummary goals={goals} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
