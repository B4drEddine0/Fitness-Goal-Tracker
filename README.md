# Fitness Goal Tracker

A modern React application for tracking your fitness goals and daily progress.

## Overview

Fitness Goal Tracker helps you set, track, and achieve your fitness goals. Whether you're tracking steps, workouts, or water intake, this application provides an intuitive interface to monitor your progress and stay motivated.

## Features

- **Goal Management**: Create, edit, and delete fitness goals
- **Daily Progress Tracking**: Record your daily achievements for each goal
- **Visual Progress Indicators**: See your progress with intuitive progress bars
- **Performance Summary**: View statistics about your achievements by day, week, and category
- **Persistent Storage**: All your data is saved locally in your browser

## Technologies Used

- React.js
- Tailwind CSS
- Local Storage API

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/fitness-goal-tracker.git
cd fitness-goal-tracker
```
2. Install dependencies:
```bash
npm install
 ```

3. Start the development server:
```bash
npm start
 ```

4. Open http://localhost:3000 to view the app in your browser.

Project Structure

fitness-goal-tracker/
├── public/                 # Public assets
├── src/                    # Source files
│   ├── components/         # React components
│   │   ├── GoalForm.js     # Form for creating/editing goals
│   │   ├── GoalList.js     # List of all goals
│   │   ├── ProgressForm.js # Form for tracking daily progress
│   │   └── PerformanceSummary.js # Summary of achievements
│   ├── App.js              # Main application component
│   ├── index.js            # Application entry point
│   └── index.css           # Global styles and Tailwind configuration
├── tailwind.config.js      # Tailwind CSS configuration
└── package.json            # Project dependencies and scripts


License
This project is licensed under the MIT License - see the LICENSE file for details.
Acknowledgments
Tailwind CSS for providing a utility-first CSS framework.
React.js for building the user interface.
