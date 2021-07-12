import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {CreateNewStylePage} from "../pages/CreateNewStylePage";
import {StyleDetailPage} from "../pages/StyleDetailPage";
import {StyleListPage} from "../pages/StyleListPage";
import {UploadNewSnapshotPage} from "../pages/UploadNewSnapshot";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/styles/:id/upload-snapshot">
          <UploadNewSnapshotPage/>
        </Route>
        <Route path="/styles/:id">
          <StyleDetailPage/>
        </Route>
        <Route path="/create-new-style">
          <CreateNewStylePage/>
        </Route>
        <Route path="/">
          <StyleListPage/>
        </Route>

      </Switch>
    </Router>
  );
}