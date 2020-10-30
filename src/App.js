import   React                                  from 'react';
import { useState, useEffect }                  from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import Container                                 from 'react-bootstrap/Container';

import   Todos                                   from './components/Todos';
import   SignInPage                              from './components/SignIn';
import   app                                     from 'firebase/app';



function  App() {

   const [ user, setUser ] = useState('loading'); 
    useEffect(() => {
      app.auth().onAuthStateChanged(function(userData) {
          if(userData) {
              setUser(true);
          } else {
              setUser(false);
          }
      });
    }, [user]);
    
/* https://dev.to/mychal/protected-routes-with-react-function-components-dh */

   const ProtectedTodos = ({ component: Component, ...rest }) => {
     return (
        <Route
                {...rest}
                render={
                    props => {
                        if( user === 'loading' ){
                            return null;
                        } else if(user === true) {
                           return <Component {...rest} {...props} />;
                        } else {
                          return  <Redirect  to="/signin" />;
                        }
                    }
                }
         />
     );
   };

   const ProtectedSignin = ({ component: Component, ...rest }) => {
     return (
       <Route
                {...rest}
                render={
                    props => {
                        if( user === 'loading' ){
                            return null;
                        } else if( user === false ){
                           return <Component {...rest} {...props} />;
                        } else {
                          return  <Redirect  to="/" />;
                        }
                    }
                }
         />
     );
   };
 
   
    return(
 <Container>
     <Router>
       <Switch>
          <ProtectedSignin exact path='/signin' user={user} component={SignInPage} />
          <ProtectedTodos  exact path='/'       user={user} component={Todos} />
      </Switch>
     </Router>       
 </Container>  
    );
}

export default App;

