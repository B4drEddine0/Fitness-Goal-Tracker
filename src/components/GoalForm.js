import React, { useState } from 'react';

function GoalForm({ addGoal }) {
  const [goalData, setGoalData] = useState({
    title: '',
    description: '',
    target: '',
    unit: '',
    category: 'fitness'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGoalData({
      ...goalData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!goalData.title || !goalData.target || !goalData.unit) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }
    
    addGoal({
      ...goalData,
      target: Number(goalData.target),
      createdAt: new Date().toISOString()
    });
    
    // Reset form
    setGoalData({
      title: '',
      description: '',
      target: '',
      unit: '',
      category: 'fitness'
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="title" className="form-label">Titre *</label>
        <input
          type="text"
          className="form-input"
          id="title"
          name="title"
          value={goalData.title}
          onChange={handleChange}
          placeholder="Ex: Marcher 10 000 pas par jour"
          required
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="description" className="form-label">Description</label>
        <textarea
          className="form-input"
          id="description"
          name="description"
          value={goalData.description}
          onChange={handleChange}
          placeholder="Détails supplémentaires sur votre objectif"
          rows="2"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="target" className="form-label">Objectif Quotidien *</label>
          <input
            type="number"
            className="form-input"
            id="target"
            name="target"
            value={goalData.target}
            onChange={handleChange}
            min="1"
            required
          />
        </div>
        
        <div>
          <label htmlFor="unit" className="form-label">Unité *</label>
          <input
            type="text"
            className="form-input"
            id="unit"
            name="unit"
            value={goalData.unit}
            onChange={handleChange}
            placeholder="Ex: pas, verres, minutes"
            required
          />
        </div>
      </div>
      
      <div className="mb-4">
        <label htmlFor="category" className="form-label">Catégorie</label>
        <select
          className="form-input"
          id="category"
          name="category"
          value={goalData.category}
          onChange={handleChange}
        >
          <option value="fitness">Fitness</option>
          <option value="nutrition">Nutrition</option>
          <option value="hydration">Hydration</option>
          <option value="autre">Autre</option>
        </select>
      </div>
      
      <button type="submit" className="btn btn-primary w-full">Ajouter l'objectif</button>
    </form>
  );
}

export default GoalForm;