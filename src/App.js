import "./App.css";
import Header from "./components/layout/Header";
import Sorting from "./components/pages/Sorting";

function App() {
  return (
      <div className="App">
        <Header />
  
        {/* <!-- controls bar + container component containing all array bars --> */}
        <Sorting />
      </div>
  );
}

export default App;
