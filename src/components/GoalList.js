import React, { useState } from 'react';

function GoalList({ goals, deleteGoal, updateGoal, selectGoal, selectedGoalId }) {
  const [editingGoalId, setEditingGoalId] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  const handleEdit = (goal) => {
    setEditingGoalId(goal.id);
    setEditFormData({ ...goal });
  };

  const handleCancelEdit = () => {
    setEditingGoalId(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: name === 'target' ? Number(value) : value
    });
  };

  const handleSaveEdit = () => {
    updateGoal(editFormData);
    setEditingGoalId(null);
  };

  const calculateProgress = (goal) => {
    if (!goal.progress || goal.progress.length === 0) return 0;
    
    
    const today = new Date().toISOString().split('T')[0];
    const todayProgress = goal.progress.find(p => p.date === today);
    
    if (todayProgress) {
      return Math.min(100, (todayProgress.value / goal.target) * 100);
    }
    return 0;
  };

  const getLatestProgressValue = (goal) => {
    if (!goal.progress || goal.progress.length === 0) return 0;
    
    
    const sortedProgress = [...goal.progress].sort((a, b) => 
      new Date(b.date) - new Date(a.date)
    );
    
    return sortedProgress[0].value;
  };

  if (goals.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Aucun objectif pour le moment. Ajoutez-en un pour commencer!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {goals.map(goal => (
        <div 
          key={goal.id} 
          className={`card border-l-4 transition-all duration-200 ${
            selectedGoalId === goal.id 
              ? 'border-l-primary-500 bg-primary-50' 
              : 'border-l-gray-300 hover:border-l-primary-300'
          }`}
          onClick={() => editingGoalId !== goal.id && selectGoal(goal)}
          style={{ cursor: 'pointer' }}
        >
          {editingGoalId === goal.id ? (
            <div className="p-2">
              <div className="mb-3">
                <input
                  type="text"
                  className="form-input"
                  name="title"
                  value={editFormData.title}
                  onChange={handleEditChange}
                />
              </div>
              <div className="mb-3">
                <textarea
                  className="form-input"
                  name="description"
                  value={editFormData.description}
                  onChange={handleEditChange}
                  rows="2"
                />
              </div>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <input
                    type="number"
                    className="form-input"
                    name="target"
                    value={editFormData.target}
                    onChange={handleEditChange}
                    min="1"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    className="form-input"
                    name="unit"
                    value={editFormData.unit}
                    onChange={handleEditChange}
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <button 
                  className="btn btn-secondary"
                  onClick={handleCancelEdit}
                >
                  Annuler
                </button>
                <button 
                  className="btn btn-primary"
                  onClick={handleSaveEdit}
                >
                  Enregistrer
                </button>
              </div>
            </div>
          ) : (
         
            <div>
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold text-gray-800">{goal.title}</h3>
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                  {goal.category}
                </span>
              </div>
              
              {goal.description && (
                <p className="mt-1 text-gray-600 text-sm">{goal.description}</p>
              )}
              
              <p className="mt-2 text-sm text-gray-500">
                Objectif: {goal.target} {goal.unit} par jour
              </p>
              
              <div className="mt-3">
                <div className="flex justify-between text-xs mb-1">
                  <span>Progression</span>
                  <span>{Math.round(calculateProgress(goal))}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-primary-600 h-2.5 rounded-full" 
                    style={{ width: `${calculateProgress(goal)}%` }}
                  ></div>
                </div>
              </div>
              
              <p className="mt-2 text-sm">
                <span className="font-medium">Aujourd'hui:</span> {getLatestProgressValue(goal)} {goal.unit}
              </p>
              
              <div className="mt-3 flex justify-end space-x-2">
                <button 
                  className="px-3 py-1 text-xs font-medium rounded bg-gray-100 text-gray-700 hover:bg-gray-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit(goal);
                  }}
                >
                  Modifier
                </button>
                <button 
                  className="px-3 py-1 text-xs font-medium rounded bg-red-100 text-red-700 hover:bg-red-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet objectif?')) {
                      deleteGoal(goal.id);
                    }
                  }}
                >
                  Supprimer
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default GoalList;