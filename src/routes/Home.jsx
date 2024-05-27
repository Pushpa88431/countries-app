import Link from "@mui/material/Link";
import Container from "react-bootstrap/Container";

const Home = () => {
  return (
    <div className="test">
      <Container className="d-flex flex-column align-items-center justify-content-center gap-5">
        <h1 className="display-1 text-center">
          Welcome to Countries of the World
        </h1>
        <h3>
          Please <Link href="/register">Register</Link> if you haven't registred
          yet.
        </h3>
        <h3>
          Please <Link href="/login">Login</Link> if you already registred.
        </h3>
      </Container>
    </div>
  );
};

export default Home;
