import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import { StyleListPage } from "../pages/StyleListPage";

export default function App() {
    return (
      <Router>
        <Switch>
          <Route path="/styles">
            <StyleListPage />
          </Route>
        </Switch>
      </Router>
    );
  }