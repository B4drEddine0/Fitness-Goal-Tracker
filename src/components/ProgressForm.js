import React, { useState, useEffect } from 'react';

function ProgressForm({ goal, addProgress }) {
  const [value, setValue] = useState('');
  const [todayProgress, setTodayProgress] = useState(null);

  useEffect(() => {
    // Check if there's already progress for today
    if (goal && goal.progress) {
      const today = new Date().toISOString().split('T')[0];
      const progress = goal.progress.find(p => p.date === today);
      if (progress) {
        setTodayProgress(progress);
        setValue(progress.value);
      } else {
        setTodayProgress(null);
        setValue('');
      }
    }
  }, [goal]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!value) {
      alert('Veuillez entrer une valeur');
      return;
    }
    
    addProgress(goal.id, { value: Number(value) });
    alert('Progression enregistrée avec succès!');
  };

  if (!goal) return null;

  return (
    <div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{goal.title}</h3>
        <p className="text-sm text-gray-600">Objectif: {goal.target} {goal.unit} par jour</p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="progressValue" className="form-label">
            {todayProgress 
              ? `Mettre à jour votre progression d'aujourd'hui (${goal.unit})` 
              : `Enregistrer votre progression d'aujourd'hui (${goal.unit})`
            }
          </label>
          <input
            type="number"
            className="form-input"
            id="progressValue"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            min="0"
            max={goal.target * 2} // Allow exceeding the target
            required
          />
        </div>
        
        <button type="submit" className="btn btn-success w-full">
          {todayProgress ? 'Mettre à jour' : 'Enregistrer'}
        </button>
      </form>
      
      {goal.progress && goal.progress.length > 0 && (
        <div className="mt-6">
          <h4 className="text-md font-medium text-gray-700 mb-2">Historique récent</h4>
          <div className="space-y-2">
            {[...goal.progress]
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .slice(0, 5)
              .map((progress, index) => (
                <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-sm">{new Date(progress.date).toLocaleDateString()}</span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    progress.value >= goal.target 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {progress.value} {goal.unit}
                  </span>
                </div>
              ))
            }
          </div>
        </div>
      )}
    </div>
  );
}

export default ProgressForm;