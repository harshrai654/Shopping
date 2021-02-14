import Home from "./Pages/Home";
import SellerDashboard from "./Pages/SellerDashboard";
import ProductsGrid from "./Pages/ProductsGrid";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Home>
        <Switch>
          <Route path="/seller" exact>
            <SellerDashboard />
          </Route>
          <Route path="/">
            <ProductsGrid />
          </Route>
        </Switch>
      </Home>
    </BrowserRouter>
  );
}

export default App;
