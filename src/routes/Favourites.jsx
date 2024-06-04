import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFavouritesFromSource } from "../auth/firebase";
import { initializeCountries } from "../store/countriesSlice";
import {
  addFavouriteCountries,
  removeFavouriteCountries,
  clearFavouriteCountries,
} from "../store/favouritesSlice";
import { Link } from "react-router-dom";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

const Favourites = () => {
  const dispatch = useDispatch();

  const favourites = useSelector((state) => state.favourites.favourites);
  let countriesList = useSelector((state) => state.countries.countries);

  if (favourites.length > 0) {
    countriesList = countriesList.filter((country) =>
      favourites.includes(country.name.common)
    );
  } else {
    countriesList = [];
  }

  useEffect(() => {
    dispatch(initializeCountries());
    dispatch(getFavouritesFromSource());
  }, [dispatch]);

  return (
    <Container className="my-5">
      <Row xs={1} sm={2} md={3} lg={4} className="g-3">
        {countriesList.length === 0 ? (
          <Alert style={{ width: "100%", textAlign: "center" }} variant="info">
            Nothing here!
          </Alert>
        ) : (
          countriesList.map((country) => (
            <Col className="mt-5" key={country.name.common}>
              <Card className="h-100" border="info" bg="ligth" text="dark">
                <Card.Header
                  style={{ backgroundColor: "#0dcaf0", color: "white" }}
                >
                  {favourites.some(
                    (favourite) => favourite === country.name?.common
                  ) ? (
                    <FavoriteIcon
                      style={{
                        display: "block",
                        marginLeft: "auto",
                        color: "white",
                      }}
                      onClick={() =>
                        dispatch(removeFavouriteCountries(country.name.common))
                      }
                    />
                  ) : (
                    <FavoriteBorderIcon
                      style={{ display: "block", marginLeft: "auto" }}
                      onClick={() =>
                        dispatch(addFavouriteCountries(country.name.common))
                      }
                    />
                  )}
                </Card.Header>

                <Card.Img
                  variant="bottom"
                  src={country.flags.svg}
                  style={{
                    objectFit: "cover",
                    height: "200px",
                  }}
                />

                <Card.Body className="d-flex flex-column">
                  <Card.Title>{country.name.common}</Card.Title>
                  <Card.Subtitle className="mb-5 text-muted">
                    {country.name.official}
                  </Card.Subtitle>
                  <Link
                    style={{ textDecoration: "none", marginTop: "auto" }}
                    to={`/favourites/${country.name.common}`}
                    state={{ country: country }}
                  >
                    <Button className="d-block mx-auto" variant="info">
                      Read More
                    </Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
      <Row>
        <Col className="d-flex justify-content-center my-5">
          {countriesList.length > 0 && (
            <Button
              variant="danger"
              onClick={() => dispatch(clearFavouriteCountries())}
            >
              Clear All Favourites
            </Button>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Favourites;
