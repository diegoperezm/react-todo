import   React                  from 'react';
import { useState            }  from 'react';
import { withRouter          }  from 'react-router-dom';
import { withFirebase        }  from '../Firebase';

import Row                      from 'react-bootstrap/Row';
import Col                      from 'react-bootstrap/Col';
import Form                     from 'react-bootstrap/Form';
import Button                   from 'react-bootstrap/Button';

const INITIALSTATE = {
  email: '',
  password: '',
};

const SignInFormBase = (props) => {
  const [userInfo, setUserInfo] = useState(INITIALSTATE);
  const [error, setError] = useState(null);

  const onSubmit = event => {
    event.preventDefault();
    const { email, password } = userInfo;
      props
          .firebase
          .doSignInWithEmailAndPassword(email, password)
          .then(() => {
            setUserInfo(INITIALSTATE);
            props.history.push('/');
          })
          .catch(error => {
           setError(error);
          });
  };

  const onChange = event => {
    const {name, value} = event.target;
      setUserInfo((userInfo) => ({...userInfo, [name]: value}));
  };

  const isInvalid = userInfo.password === '' || userInfo.email === '';
  return (
      <Form
        onSubmit={onSubmit}>
      <Form.Control
        className="mb-2"
        name="email"
        autoComplete="off"
        value={userInfo.email}
        onChange={onChange}
        type="text"
        placeholder="Email Address"
      />
      <Form.Control
        name="password"
        autoComplete="off"
        value={userInfo.password}
        onChange={onChange}
        type="password"
        placeholder="Password"
      />
        <Button
          className="mt-2 float-right"
          disabled={isInvalid}
          type="submit"
        >
        Sign In
      </Button>
      {error && <p>{error.message}</p>}
    </Form>
  );
}


const SignInForm = withRouter(withFirebase(SignInFormBase)); 

const SignInPage = () => (
 <Row>
   <Col >
     <div>
       <h1 className="text-center mb-5">Sign In</h1>
       <SignInForm />
     </div>
  </Col>
  </Row>
);


export default SignInPage;

