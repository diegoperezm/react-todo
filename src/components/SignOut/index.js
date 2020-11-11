import React from 'react';

import Row                                      from 'react-bootstrap/Row';
import Col                                      from 'react-bootstrap/Col';
import Button                                   from 'react-bootstrap/Button';
import Navbar                                   from 'react-bootstrap/Navbar';

const SignOutBar = (props) => (
  <Row>
     <Col className="mb-5" >
        <Navbar
           bg="primary"
           >
        <Button
          variant="outline-light"
          onClick={() => props.setUser(false) }
        >
        Sign Out
       </Button>
     </Navbar>
    </Col>
  </Row>
  );

export default  SignOutBar;
