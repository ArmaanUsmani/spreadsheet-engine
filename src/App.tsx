import Spreadsheet from "./components/Spreadsheet";

function App() {
  return (
    <div className="app-container">
      <h1 className="title">
        Spreadsheet Engine
      </h1>

      <div className="spreadsheet-wrapper">
        <Spreadsheet />
      </div>
    </div>
  );
}

export default App;