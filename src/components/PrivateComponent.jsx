import {useHistory, Route} from 'react-router-dom'
import {toast} from 'react-toastify'
export const  PrivateRoute = ({component: Component, isLoggedIn, ...rest}) => {
    const history = useHistory()
    return (
      <Route
        {...rest}
        render={(props) => {
            if(isLoggedIn === true) {
                return <Component {...props} />
            } else {
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
            }
        }}
      />
    )
  }