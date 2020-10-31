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

import   Todos                                   from '../Todos';
import   SignInPage                              from '../SignIn';
import   SignOutBar                              from '../SignOut';
import { withFirebase }                          from '../Firebase'; 


function  App(props) {

   const [ user, setUser ] = useState('loading'); 

   useEffect(() => {
      const unsubscribe = props.firebase.checkAuthStateChanged( userData =>  {
              setUser(true);
       },
       () => setUser(false));
  

       return () =>  unsubscribe();
    });
    
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
       <SignOutBar /> 
       <Switch>
          <ProtectedSignin exact path='/signin' user={user} component={SignInPage} />
          <ProtectedTodos  exact path='/'       user={user} component={Todos} />
      </Switch>
     </Router>       
 </Container>  
    );
}

export default withFirebase(App);

