import './App.css';
import { Routes, Route } from 'react-router';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
