import   React                                  from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import Container                                from 'react-bootstrap/Container';

import Todos                                    from './components/Todos';

function App() {
    return(
 <Container>
     <Router>
       <Switch>
            <Route exact path="/todo"  component={Todos} />
       </Switch>
     </Router>       
 </Container>  
    );

}

export default App;


