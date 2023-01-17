import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/Header/Header';
import GameList from './views/GameList/GameList';
import Game from './views/Game/Game';

import './App.scss';

function App(): JSX.Element {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<GameList />} />
          <Route path="/app/:id/:name" element={<Game />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
