import React from 'react';
import './App.css';

import ChartComplejo from './ChartComplejo';
import ChartComplejoRW from './ChartComplejoRW';
import ChartNormal from './ChartNormal';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* Puedes eliminar o modificar el contenido predeterminado */}
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <main>
         {/* Aquí se renderiza tu componente de gráfico */}
         <ChartNormal />
        <ChartComplejo />
        <ChartComplejoRW />

      </main>
    </div>
  );
}

export default App;

