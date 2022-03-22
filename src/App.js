import './App.css';
import {Provider as AppProvider} from './context/AppContext';
import HelloComponent from './components/HelloComponent';

function App() {
  return (
    <AppProvider>
      <div className="containerStyle">
          <h1 className="headerStyle">CODE SOLVER GAME</h1>
          <HelloComponent/>
      </div>
    </AppProvider>
  );
}

export default App;

