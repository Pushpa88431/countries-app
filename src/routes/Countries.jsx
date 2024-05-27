import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getFavouritesFromSource } from '../auth/firebase';
import { initializeCountries } from '../store/countriesSlice';
import { addFavouriteCountries, removeFavouriteCountries } from '../store/favouritesSlice';

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Spinner } from 'react-bootstrap';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

const Countries = () => {
  const dispatch = useDispatch();

  const countriesList = useSelector((state) => state.countries.countries);
  const favouriteCountryList = useSelector((state) => state.favourites.favourites);
  const loading = useSelector((state) => state.countries.isLoading);
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(initializeCountries());
    dispatch(getFavouritesFromSource());
  }, [dispatch]);

  if (loading) {
    return (
      <Col className="text-center m-5">
        <Spinner animation="border" as="output" className="center" variant="info">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Col>
    );
  }

  return (
    <Container className="my-5">
      
      <Row>
        <Form.Control className="mx-auto mb-5" style={{ width: '20rem' }} type="search" placeholder="type countries name..." aria-label="Search" onChange={(e) => setSearch(e.target.value)} />
      </Row>

      
      <Row xs={1} sm={2} md={3} lg={4} className="g-3">
        {countriesList
          .filter((country) => country.name.common.toLowerCase().includes(search.toLowerCase()))
          .map((country) => (
            <Col className="mt-5" key={country.name.common}>
              <Card className="h-100" border="info" bg="ligth" text="dark">
                <Card.Header style={{ backgroundColor: '#0dcaf0', color: 'white' }}>
                  {favouriteCountryList.some((favourite) => favourite === country.name?.common) ? (
                    <FavoriteIcon style={{ display: 'block', marginLeft: 'auto', color: 'white' }} onClick={() =>  dispatch(removeFavouriteCountries(country.name.common))} />
                  ) : (
                    <FavoriteBorderIcon style={{ display: 'block', marginLeft: 'auto' }} onClick={() => dispatch(addFavouriteCountries(country.name.common))} />
                  )}
                </Card.Header>

                <Card.Img
                  variant="bottom"
                  src={country.flags.svg}
                  style={{
                    objectFit: 'cover',
                    height: '200px',
                  }}
                />

                <Card.Body className="d-flex flex-column">
                  <Card.Title>{country.name.common}</Card.Title>
                  <Card.Subtitle className="mb-5 text-muted">{country.name.official}</Card.Subtitle>
                  <Link style={{ textDecoration: 'none', marginTop: 'auto' }} to={`/countries/${country.name.common}`} state={{ country: country }}>
                    <Button className="d-block mx-auto" variant="info">
                      Read More
                    </Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default Countries;
