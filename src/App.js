import   React                                  from 'react';
import   Todos                                  from './components/Todos';

import 'bootstrap/dist/css/bootstrap.min.css';
import Container                                from 'react-bootstrap/Container';
import Row                                      from 'react-bootstrap/Row';

function App() {
    return(
  <Container>
    <Row >
        <Todos/>
   </Row>
 </Container>  

    );

}

export default App;


