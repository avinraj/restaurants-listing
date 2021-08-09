import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Homepage from "./components/home/homepage";
import Header from "./components/header/header";
import SearchResult from "./components/search/searchResult";
import RestaurantView from "./components/view/restaurantView";
function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/searchResult" component={SearchResult} />
        <Route path="/restaurantView/:ID" component={RestaurantView} />
      </Switch>
    </Router>
  );
}
export default App;
