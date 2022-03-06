import {React} from 'react';
import {Container} from 'react-bootstrap';
import '../App.scss';


const PriceComponent = (props) => {
  const textToDisplay = typeof props.price === 'undefined' ? "Submit characteristics to get price prediction": `Predicted price is: ${props.price} EUR`;
  return (
    <Container style={{marginTop: '1%', maxWidth: 400}} className={`d-flex justify-content-center p-3 border border-primary`}>
      {textToDisplay}
    </Container>
  );
}

export default PriceComponent;