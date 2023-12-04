import { Home, Landing, Detail, Form } from "./views";
import NavBar from "./components/NavBar/NavBar";
import { Route } from "react-router-dom";


function App() {
  return (
      <div className="App">

        <NavBar/>
        <Route exact path="/" component={Landing} />
        <Route  path="/home" render={() => <Home/>} />
        <Route  path="/detail" component={Detail} />
        <Route  path="/create" component={Form} />
    
      </div>
  );
}

export default App;
