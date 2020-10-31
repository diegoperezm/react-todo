import React from 'react';

import Row                                      from 'react-bootstrap/Row';
import Col                                      from 'react-bootstrap/Col';
import Button                                   from 'react-bootstrap/Button';
import Navbar                                   from 'react-bootstrap/Navbar';

import { withFirebase } from '../Firebase';

const SignOutBar = ({ firebase }) => (
  <Row>
     <Col className="mb-5" >
        <Navbar
           bg="primary"
           >
        <Button
          variant="outline-light"
          onClick={firebase.doSignOut}
        >
        Sign Out
       </Button>
     </Navbar>
    </Col>
  </Row>
  );

export default withFirebase(SignOutBar);
