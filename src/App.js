import Home from "./Pages/Home";
import SellerDashboard from "./Pages/SellerDashboard";
import ProductsGrid from "./Pages/ProductsGrid";
import ProductPage from "./Pages/ProductPage";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Home>
        <Switch>
          <Route path="/seller" exact>
            <SellerDashboard />
          </Route>
          <Route path="/" exact>
            <ProductsGrid />
          </Route>
          <Route path="/product" exact component={ProductPage} />
        </Switch>
      </Home>
    </BrowserRouter>
  );
}

export default App;
