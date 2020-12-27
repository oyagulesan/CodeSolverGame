import './App.css';
import {Provider as AppProvider} from './context/AppContext';
import HelloComponent from './components/HelloComponent';

function App() {
  return (
    <AppProvider>
      <div className="App">
        <header className="App-header">
          <h1>OYA's GAME</h1>
          <HelloComponent/>
        </header>
      </div>
    </AppProvider>
  );
}

export default App;

