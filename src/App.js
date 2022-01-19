import './App.css';
import ClipLiveStream from "./ClipLiveStream";
import ClipSegment from "./ClipSegment"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ClipLiveStream />
        <ClipSegment />
      </header>
    </div>
  );
}

export default App;
