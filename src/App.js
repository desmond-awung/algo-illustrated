import "./App.css";
import Header from "./components/layout/Header";
import Sorting from "./components/pages/Sorting";

function App() {
  return (
    // <Provider store={store}>
      <div className="App">
        <Header />
        {/*  container for the nav section with controls for this app will go here */}
        {/* <app-controls></app-controls> */}
  
        {/* <!-- container component containing all array bars --> */}
        <Sorting />
      </div>
    // </Provider>
  );
}

export default App;
