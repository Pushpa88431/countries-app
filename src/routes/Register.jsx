import { useEffect, useState } from 'react';
import { auth, registerWithEmailAndPassword } from '../auth/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  // useAuthState hooks return the below elements
  // - user is the user object
  // - loading is a boolean that indicates if the user is being loaded
  // - error is the error object
  const [user, loading] = useAuthState(auth);

  // it allows  navigation to a different location
  const navigate = useNavigate();

  const register = () => {
    if (!name) alert('Please enter your name');
    registerWithEmailAndPassword(name, email, password);
  };

  
  useEffect(() => {
    if (loading) return;
    if (user) navigate('/countries');
  }, [user, loading]);

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: 'calc(100vh - 70px)' }}>
      <h2 className="display-4 text-center">Register</h2>

      <Container style={{ maxWidth: '500px' }}>
        <Form.Group className="mb-3" controlId="formFullName">
          <Form.Label>Full name</Form.Label>
          <Form.Control type="text" placeholder="Enter your full name" value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter your email address" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter a secure password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>

        <Button className="d-block mx-auto" onClick={register}>
          Register
        </Button>
      </Container>
    </Container>
  );
};

export default Register;
