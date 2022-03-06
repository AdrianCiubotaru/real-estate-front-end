import {React, useState } from 'react';
import { Form, Button, Container, InputGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';
import '../App.scss';


const FormComponent = (props) => {
  const defaultComfort = "comfort_1";
  const defaultFloorType = "first_floor";
  const defaultBuildingAge = "before_1941";
  const defaultBuildingStructure = "concrete_building_structure";
  const defaultNeighborhood = "1_mai_area";
  const [surfaceArea, setSurfaceArea] = useState(0);
  const [rooms, setRooms] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const [maxFloor, setMaxFloor] = useState(0);
  const [comfort, setComfort] = useState(defaultComfort);
  const [floorType, setFloorType] = useState(defaultFloorType);
  const [buildingAge, setBuildingAge] = useState(defaultBuildingAge);
  const [buildingStructure, setBuildingStructure] = useState(defaultBuildingStructure);
  const [neighborhood, setNeighborhood] = useState(defaultNeighborhood);
  const [decomandat, setDecomandat] = useState(false);
  const [hasBalconies, setHasBalconies] = useState(false);
  const [parking, setParking] = useState(false);
  const [floorHeating, setFloorHeating] = useState(false);
  const [onlyDistrictHeating, setOnlyDistrictHeating] = useState(false);
  const [videoSurveillance, setVideoSurveillance] = useState(false);
  const [ errors, setErrors ] = useState({})

  const toggleProperty = (property, setProperty) => {
    setProperty(!property);
  };

  const findFormErrors = () => {
    const newErrors = {}
    // name errors
    if ((isNaN(Number(surfaceArea))) || (surfaceArea < 10)) newErrors.surfaceArea = 'please enter a valid surface area!';
    if ((isNaN(Number(rooms))) || (Number(rooms) === 0)) newErrors.rooms = 'an apartment must have at least one room!';
    if ((isNaN(Number(bathrooms))) || (Number(bathrooms) === 0)) newErrors.bathrooms = 'an apartment must have at least one bathroom!';
    setErrors(newErrors);
    return newErrors
  }

  const onFormSubmit = e => {
    e.preventDefault();
    const newErrors = findFormErrors();
    if (Object.keys(newErrors).length > 0 ) {
      setErrors(newErrors);
    } else {
      const postData = {
        "surface_area": surfaceArea,
        "rooms": rooms,
        "bathrooms": bathrooms,
        "max_floor": maxFloor,
        "comfort": comfort,
        "floor_type": floorType,
        "building_age": buildingAge,
        "building_structure": buildingStructure,
        "neighborhood": neighborhood,
        "decomandat": decomandat,
        "has_balconies": hasBalconies,
        "has_parking_spots_or_garages": parking,
        "has_floor_heating": floorHeating,
        "only_district_heating": onlyDistrictHeating,
        "building_with_video_surveillance": videoSurveillance
    }
    axios
    .post(
        `https://jjkxravpf5.execute-api.us-east-1.amazonaws.com/prod/`,
        postData,
    )
    .then((response) => {
        props.priceSetter(response.data);
    });
  }
    
  }
  return (
    <Container style={{marginTop: '5%', maxWidth: 400}} className={`d-flex justify-content-center p-3 border border-primary`}>
      <Form onSubmit={onFormSubmit}>
        <InputGroup size="sm" className="mb-1">
          <InputGroup.Text id="inputGroup-sizing-sm">Surface Area (sqm)</InputGroup.Text>
          <FormControl 
            aria-label="Small" 
            aria-describedby="inputGroup-sizing-sm" 
            value={surfaceArea} 
            onChange={e => setSurfaceArea(e.target.value)} 
            isInvalid={ !!errors.surfaceArea }
          />
          <Form.Control.Feedback type="invalid">
            { errors.surfaceArea }
          </Form.Control.Feedback>
        </InputGroup>
        <InputGroup size="sm" className="mb-1">
          <InputGroup.Text id="inputGroup-sizing-sm">Rooms</InputGroup.Text>
          <FormControl 
            aria-label="Small" 
            aria-describedby="inputGroup-sizing-sm" 
            type="number" 
            value={rooms} 
            onChange={e => setRooms(e.target.value)}
            isInvalid={ !!errors.rooms }
          />
          <Form.Control.Feedback type="invalid">
            { errors.rooms }
          </Form.Control.Feedback>
        </InputGroup>
        <InputGroup size="sm" className="mb-1">
          <InputGroup.Text id="inputGroup-sizing-sm">Bathrooms</InputGroup.Text>
          <FormControl 
            aria-label="Small" 
            aria-describedby="inputGroup-sizing-sm" 
            value={bathrooms} 
            onChange={e => setBathrooms(e.target.value)}
            isInvalid={ !!errors.bathrooms }
          />
          <Form.Control.Feedback type="invalid">
            { errors.bathrooms }
          </Form.Control.Feedback>
        </InputGroup>
        <InputGroup size="sm" className="mb-1">
          <InputGroup.Text id="inputGroup-sizing-sm">Max floor</InputGroup.Text>
          <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" value={maxFloor} onChange={e => setMaxFloor(e.target.value)}/>
        </InputGroup>
        <Form.Select className="mb-1" aria-label="comfort type" size="sm" onChange={e => setComfort(e.target.value)}>
          <option value={defaultComfort}>Comfort 1</option>
          <option value="comfort_lux">Comfort Lux</option>
          <option value="comfort_other">Other</option>
        </Form.Select>
        <Form.Select className="mb-1" aria-label="floor type" size="sm" onChange={e => setFloorType(e.target.value)}>
          <option value={defaultFloorType}>First floor</option>
          <option value="last_floor">Last floor</option>
          <option value="middle_floor">Middle floor</option>
        </Form.Select>
        <Form.Select className="mb-1" aria-label="building age" size="sm" onChange={e => setBuildingAge(e.target.value)}>
          <option value={defaultBuildingAge}>Before 1941</option>
          <option value="between_1941_1977">Between 1941 and 1977</option>
          <option value="between_1977_1990">Between 1977 and 1990</option>
          <option value="between_1990_2000">Between 1990 and 2000</option>
          <option value="between_2000_2010">Between 2000 and 2010</option>
          <option value="after_2010">After 2010</option>
          <option value="not_finished">Not finished</option>
          <option value="not_started">Not started</option>
        </Form.Select>
        <Form.Select className="mb-1" aria-label="building structure" size="sm" onChange={e => setBuildingStructure(e.target.value)}>
          <option value={defaultBuildingStructure}>Concrete building structure</option>
          <option value="other_building_structure">Other building structure</option>
          <option value="unknown_building_structure">Unknown building structure</option>
        </Form.Select>
        <Form.Select className="mb-1" aria-label="Neighborhood" size="sm" onChange={e => setNeighborhood(e.target.value)}>
          <option value={defaultNeighborhood}>1 Mai</option>
          <option value="agronomie_area">Agronomie</option>
          <option value="aviatiei_area">Aviatiei</option>
          <option value="aviatorilor_area">Aviatorilor</option>
          <option value="banu_manta_area">Banu Manta</option>
          <option value="chibrit_area">Chibrit</option>
          <option value="domenii_area">Domenii</option>
          <option value="dristor_area">Dristor</option>
          <option value="stefan_cel_mare_area">Stefan cel Mare</option>
          <option value="titulescu_area">Titulescu</option>
          <option value="turda_area">Turda</option>
        </Form.Select>
        <Form.Check 
          type="switch"
          id="custom-switch"
          label="Partitioned decomandat"
          onChange={() => toggleProperty(decomandat, setDecomandat)}
        />
        <Form.Check 
          type="switch"
          id="custom-switch"
          label="Has balconies"
          onChange={() => toggleProperty(hasBalconies, setHasBalconies)}
        />
        <Form.Check 
          type="switch"
          id="custom-switch"
          label="Parking included"
          onChange={() => toggleProperty(parking, setParking)}
        />
        <Form.Check 
          type="switch"
          id="custom-switch"
          label="Floor heating"
          onChange={() => toggleProperty(floorHeating, setFloorHeating)}
        />
        <Form.Check 
          type="switch"
          id="custom-switch"
          label="District heating exclusively"
          onChange={() => toggleProperty(onlyDistrictHeating, setOnlyDistrictHeating)}
        />
        <Form.Check 
          type="switch"
          id="custom-switch"
          label="Building with video surveillance"
          onChange={() => toggleProperty(videoSurveillance, setVideoSurveillance)}
        />
        <Container className={`d-flex justify-content-center`}>
          <Button variant="primary" type="submit">
              Get price prediction
          </Button>
        </Container>
      </Form>
    </Container>
  );
}

export default FormComponent;