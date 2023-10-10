import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../../App';

const PrivateRoute = ({ children, ...rest }) => { // Corrected function signature
  const [logInUser, setLogInUser] = useContext(UserContext);

  return (
    <Navigate
      {...rest}
      render={({ location }) =>
        logInUser.email ? (
          children
        ) : (
          <Outlet
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
