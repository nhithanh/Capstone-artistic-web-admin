import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { CreateNewStylePage } from "../pages/CreateNewStylePage";
import { StyleDetailPage } from "../pages/StyleDetailPage";
import { StyleListPage } from "../pages/StyleListPage";
import { UploadNewSnapshotPage } from "../pages/UploadNewSnapshot";
import { UploadNewShowCasePage } from '../pages/UploadNewShowcasePage'
import { LoginPage } from '../pages/LoginPage'
import { PrivateRoute } from '../components/PrivateComponent'
import { useEffect, useState } from 'react'
import { getUserProfile } from '../apis/auth'

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const checkLogin = async () => {
    const {data, statusCode, message} = await getUserProfile()
    if(statusCode && message) {
      setIsLoggedIn(false)
    } else {
      const {role} = data
      if(role === "admin") {
        setIsLoggedIn(true)
      }
    }
  }
  useEffect(() => {
    checkLogin()
    return () => { }
  }, [])
  return (
    <Router>
      <Switch>
      <Route exact path="/">
          <LoginPage setIsLoggedIn={setIsLoggedIn}/>
      </Route>

      <PrivateRoute isLoggedIn={isLoggedIn} path="/styles/:id/upload-snapshot" component={UploadNewSnapshotPage} />

      <PrivateRoute isLoggedIn={isLoggedIn} path="/styles/:id/upload-showcase" component={UploadNewShowCasePage} />

      <PrivateRoute isLoggedIn={isLoggedIn} path="/styles/:id" component={StyleDetailPage} />

      <PrivateRoute isLoggedIn={isLoggedIn} path="/create-new-style" component={CreateNewStylePage} />

      <PrivateRoute isLoggedIn={isLoggedIn} path="/styles" component={StyleListPage}/>
      </Switch>
    </Router>
  );
}