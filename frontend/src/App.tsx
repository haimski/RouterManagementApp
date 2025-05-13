import React from 'react';
import { RouterDataProvider } from './context/RoutersDataContext';
import { RouterFilterProvider } from './context/RoutersFilterContext';
import RouterList from './components/RouterList'; 
import RouterFilterControls from './components/RouterFilterControls';
import './App.css';

function App() {

  return (
    <RouterDataProvider>
      <RouterFilterProvider>
      <div className="App-main">
        <h2 className="placeholder-title">DriveNet Routers</h2>
        <RouterFilterControls />
        <RouterList />
      </div>
      </RouterFilterProvider>
    </RouterDataProvider>
  );
}

export default App;
