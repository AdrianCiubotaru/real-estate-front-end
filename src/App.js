import {React, useState} from 'react';
import FormComponent from './components/FormComponent';
import PriceComponent from './components/PriceComponent';
import './App.scss';

const App = () => {
  const [propertyPrice, setPropertyPrice] = useState();
  return (
    <div>
      <FormComponent priceSetter={setPropertyPrice}/>
      <PriceComponent price={propertyPrice}/>
    </div>

  );
}

export default App;
