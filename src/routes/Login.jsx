import { useEffect, useState } from 'react';
import { auth, loginWithEmailAndPassword } from '../auth/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const login = () => {
  
    loginWithEmailAndPassword(email, password);
  };

  // This hook is used to redirect the user to the countries page if they are already logged in
  useEffect(() => {
    if (loading) return;
    if (user) navigate('/countries');
  }, [user, loading]);

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: 'calc(100vh - 70px)' }}>
      <h2 className="display-4 text-center">Login</h2>

      <Container style={{ maxWidth: '500px' }}>
        <Form.Group className="mb-3" controlId="loginEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter your email address" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="loginPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>

        <Button className="d-block mx-auto" onClick={login}>
          Login
        </Button>
      </Container>
    </Container>
  );
};

export default Login;
