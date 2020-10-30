import   React                  from 'react';
import { useState            }  from 'react';
import { withRouter          }  from 'react-router-dom';
import { withFirebase        }  from '../Firebase';

import Row                      from 'react-bootstrap/Row';
import Col                      from 'react-bootstrap/Col';
import Button                   from 'react-bootstrap/Button';

const SignInAnonBase = props => {
  const [ error,  setError  ]   = useState(null);
  const handleClick = async (event) => {
      try {
        await props.firebase.doSignInAnonymously();
      } catch(err) {
         setError(err);
      }
  };

    return (
         <>
         <Button onClick={handleClick}>Sign In</Button>
         {error && <p>{error.message}</p>}
         </>
  );

};

const SignInAnon = withRouter(withFirebase(SignInAnonBase)); 


const SignInPage = props  => (
 <Row>
   <Col xs={{offset: 5}} className="mt-5">
     <div>
       <SignInAnon user={props.user} />
     </div>
  </Col>
  </Row>
);


export default SignInPage;

