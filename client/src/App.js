import Home from "./views/Home/Home";
import Landing from "./views/Landing/Landing";
import Form from "./views/Form/Form";
import Detail from "./views/Detail/Detail";
import { Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Landing} />
      <Route exact path="/detail" component={Detail} />
      <Route exact path="/" component={Form} />
      <Route exact path="/home" component={Home} />
    </div>
  );
}

export default App;
