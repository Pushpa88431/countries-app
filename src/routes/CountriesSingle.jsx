import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";

import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const CountriesSingle = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const country = location.state.country;
  const [weather, setWeather] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const WEATHER_API_KEY = "33d77a99a8cb53401d126f94ab03a367";
  const GOOGLE_API_KEY = "AIzaSyBUYSnOlGmBvU3xkMHWt_Gw2K8ahqQD2d4";
  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${WEATHER_API_KEY}`
      )
      .catch((error) => {
        console.log(error);
        setError(true);
      })
      .then((res) => {
        setWeather(res.data);
        setLoading(false);
      });
  }, [country.capital]);

  if (loading) {
    return (
      <Col className="text-center m-5">
        <Spinner
          animation="border"
          as="output"
          className="center"
          variant="info"
        ></Spinner>
        <span className="visually-hidden">Loading...</span>
      </Col>
    );
  }

  return (
    <Container className="d-flex flex-column gap-5 my-5">
      <Row
        className="d-block mx-auto"
        style={{ width: "100%", maxWidth: "800px" }}
      >
        <LoadScript googleMapsApiKey={GOOGLE_API_KEY}>
          <GoogleMap
            mapContainerStyle={{ height: "400px", width: "100%" }}
            zoom={6}
            center={{ lat: country.latlng[0], lng: country.latlng[1] }}
          >
            <Marker
              position={{ lat: country.latlng[0], lng: country.latlng[1] }}
            />
          </GoogleMap>
        </LoadScript>
      </Row>

      <Row>
        <Col className="d-flex justify-content-center">
          <ButtonGroup>
            <Button variant="primary" onClick={() => navigate("/countries")}>
              <ArrowBackIcon></ArrowBackIcon> Countries
            </Button>
            <Button variant="primary" onClick={() => navigate("/favourites")}>
              <ArrowBackIcon></ArrowBackIcon> Favorites
            </Button>
          </ButtonGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default CountriesSingle;
