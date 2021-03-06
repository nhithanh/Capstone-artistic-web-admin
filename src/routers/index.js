import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { CreateNewStylePage } from "../pages/CreateNewStylePage";
import { StyleDetailPage } from "../pages/StyleDetailPage";
import { StyleListPage } from "../pages/StyleListPage";
import { UploadNewSnapshotPage } from "../pages/UploadNewSnapshot";
import { UploadNewShowCasePage } from '../pages/UploadNewShowcasePage'
import { LoginPage } from '../pages/LoginPage'
import { PrivateRoute } from '../components/PrivateComponent'
import { useEffect } from 'react'
import { getUserProfile } from '../apis/auth'
import { TrainingHistoryPage } from "../pages/TrainingHistoryPage";
import { TrainingDetailPage } from "../pages/TrainingDetailPage";
import { CreateTrainingRequestPage } from "../pages/CreateTrainingRequestPage";
import {setUpListen, useSocket} from '../hooks/useSocket'
import { useDispatch } from "react-redux";

export default function App() {

  const dispatch = useDispatch()

  const checkLogin = async () => {
    const {data, statusCode, message} = await getUserProfile()
    if(statusCode && message) {
      localStorage.setItem("isLoggedIn", false)
    } else {
      if(data) {
        const {role} = data
        if(role === "admin") {
          localStorage.setItem("isLoggedIn", true)
        }
      }
    }
  }

  useSocket()

  useEffect(() => {
    checkLogin()
    setUpListen({dispatch})
    return () => { }
  }, [dispatch])

  return (
    <Router>
      <Switch>
      <Route exact path="/">
          <LoginPage/>
      </Route>

      <PrivateRoute path="/styles/:id/upload-snapshot" component={UploadNewSnapshotPage} />

      <PrivateRoute path="/styles/:id/upload-showcase" component={UploadNewShowCasePage} />

      <PrivateRoute path="/create-training-request" component={CreateTrainingRequestPage} exact={true}/>

      <PrivateRoute path="/training-requests" component={TrainingHistoryPage} exact={true}/>

      <PrivateRoute path="/training-requests/:id" component={TrainingDetailPage} />

      <PrivateRoute path="/styles/:id" component={StyleDetailPage} />

      <PrivateRoute path="/create-new-style" component={CreateNewStylePage} />

      <PrivateRoute path="/styles" component={StyleListPage}/>
      </Switch>
    </Router>
  );
}