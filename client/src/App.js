import { Route, Switch } from "react-router-dom";
import { Home, Detail, Create, Landing } from "./views/index";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route exact path="/home" render={() => <Home />} />
      <Route path="/home/:id" component={Detail} />
      <Route path="/create" component={Create} />
    </Switch>
  );
}

export default App;
