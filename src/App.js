import "./App.css";
import Header from "./components/layout/Header";
import Sorting from "./components/pages/Sorting";

function App() {
  return (
    <div className="App">
      <Header />
      {/*  container for the nav section with controls for this app will go here */}
      {/* <app-controls></app-controls> */}

      {/* <!-- container component containing all array bars --> */}
      <Sorting />
    </div>
  );
}

export default App;
