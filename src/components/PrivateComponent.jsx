import {useHistory, Route} from 'react-router-dom'
import {toast} from 'react-toastify'
export const  PrivateRoute = ({component: Component, ...rest}) => {
    const history = useHistory()
    const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"))

    if(isLoggedIn === true) {
      return <Route
        {...rest}
        render={(props) => {return <Component {...props}/>}}/>
    } else {
      console.log("in else")
        toast.error('Unauthorized to access this page', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        });
      history.push("/")
      return null
    }
  }