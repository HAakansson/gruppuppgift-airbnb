import React, { useState, useEffect, useContext } from "react";
import {
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  CardBody,
  CardHeader,
} from "reactstrap";
import CheckIn from "../components/filterComponents/CheckIn";
import CheckOut from "../components/filterComponents/CheckOut";
import CheckBoxes from "../components/filterComponents/CheckBoxes";
import { UserContext } from "../contexts/UserContextProvider";

import "react-calendar/dist/Calendar.css";
import { headStyle, semiHeadStyle } from "../css/addResidenceFormStyle.js";
import {
  getNewAddressId,
  getNewAmenityId,
  getResidenceToCreate,
} from "../components/createEntities";

const LeaseResidence = () => {
  const { user } = useContext(UserContext);

  const [amenity, setAmenity] = useState({
    badkar: false,
    balkong: false,
    diskmaskin: false,
    frys: false,
    kyl: false,
    tv: false,
    tvättmaskin: false,
    wifi: false,
  });

  const [residence, setResidence] = useState({
    images: "imageslägenhet1.jpg",
    rooms: 0,
    size: 0,
    addressId: 0,
    beds: 0,
    amenityId: 0,
    userId: 0,
    price: 0,
  });

  const [addressToCreate, setAddressToCreate] = useState({
    city: "",
    country: "",
    streetName: "",
    streetNumber: "",
    zipCode: "",
  });

  const updateAddress = (update) => {
    setAddressToCreate({
      ...addressToCreate,
      ...update,
    });
  };
  const updateAmenity = (update) => {
    setAmenity({
      ...amenity,
      ...update,
    });
  };
  const updateResidence = (update) => {
    setResidence({
      ...residence,
      ...update,
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    let addressId = await getNewAddressId(addressToCreate);
    residence.addressId = addressId;
    residence.userId = user.userId;

    console.log("Efter addressId", residence);

    let amenityId = await getNewAmenityId(amenity);
    residence.amenityId = amenityId;

    console.log("efter amenityId", residence);

    let residenceFromDb = await getResidenceToCreate(residence);
    console.log(residenceFromDb);

    console.log("Residence efter allt", residence);
  };

  return (
    <div className="row">
      <div className="col ">
        <Form onSubmit={onSubmitHandler}>
          <Card className="Card bg-white mt-3 mb-3">
            <CardBody>
              <p style={headStyle} className="text-center">
                Hyr ut bostad
              </p>

              <CardHeader style={semiHeadStyle} className="mb-4">
                Adress
              </CardHeader>

              <Row form className="">
                <Col xs={12} md={4} l={3} className="mb-3">
                  <Label for="street">Gata</Label>
                  <Input
                    type="text"
                    value={addressToCreate.streetName}
                    onChange={(e) =>
                      updateAddress({ streetName: e.target.value })
                    }
                    id="street"
                    required
                  />
                </Col>
                <Col xs={6} md={4}>
                  <FormGroup className="">
                    <Label for="street-number">Gatunummer</Label>
                    <Input
                      value={addressToCreate.streetNumber}
                      type="text"
                      onChange={(e) =>
                        updateAddress({ streetNumber: e.target.value })
                      }
                      id="street-number"
                      required
                    />
                  </FormGroup>
                </Col>
                <Col xs={6} md={4} className="">
                  <FormGroup>
                    <Label for="zip-code">Postnummer</Label>
                    <Input
                      value={addressToCreate.zipCode}
                      type="text"
                      onChange={(e) =>
                        updateAddress({ zipCode: e.target.value })
                      }
                      id="zip-code"
                      required
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row form className="">
                <Col xs={6} md={6}>
                  <FormGroup className="">
                    <Label for="street">Stad</Label>
                    <Input
                      value={addressToCreate.city}
                      type="text"
                      onChange={(e) => updateAddress({ city: e.target.value })}
                      id="city"
                      required
                    />
                  </FormGroup>
                </Col>
                <Col xs={6} md={6}>
                  <FormGroup>
                    <Label for="country">Land</Label>
                    <Input
                      value={addressToCreate.country}
                      type="text"
                      onChange={(e) =>
                        updateAddress({ country: e.target.value })
                      }
                      id="country"
                      required
                    />
                  </FormGroup>
                </Col>
              </Row>

              <CardHeader style={semiHeadStyle} className="mb-4">
                Tillgänglighet
              </CardHeader>

              <Row form className="">
                <Label className="col-6 text-left mb-2">Startdatum</Label>
                <Label className="col-6 text-left mb-2">Slutdatum</Label>
                <CheckIn></CheckIn>
                <CheckOut></CheckOut>
              </Row>

              <CardHeader style={semiHeadStyle} className="mb-4 mt-4">
                Utrymme
              </CardHeader>

              <Row form>
                <Col xs={6} md={4} className="mb-3">
                  <Label for="beds">Antal sängar</Label>
                  <Input
                    value={residence.beds}
                    type="number"
                    onChange={(e) => updateResidence({ beds: +e.target.value })}
                    id="beds"
                    required
                  />
                </Col>
                <Col xs={6} md={4}>
                  <Label for="rooms">Antal rum</Label>
                  <Input
                    value={residence.rooms}
                    type="number"
                    onChange={(e) =>
                      updateResidence({ rooms: +e.target.value })
                    }
                    id="rooms"
                    required
                  />
                </Col>
                <Col xs={6} md={4}>
                  <Label for="rooms">Kvadratmeter</Label>
                  <Input
                    value={residence.size}
                    type="number"
                    onChange={(e) => updateResidence({ size: +e.target.value })}
                    id="rooms"
                    required
                  />
                </Col>
              </Row>

              <CardHeader style={semiHeadStyle} className="mb-4 mt-4">
                Pris
              </CardHeader>
              <Col>
                <Label for="price">Pris per natt</Label>
                <Input
                  value={residence.price}
                  type="number"
                  onChange={(e) => updateResidence({ price: +e.target.value })}
                  id="price"
                  required
                />
              </Col>

              <CardHeader style={semiHeadStyle} className="mb-4 mt-4">
                Bekvämligheter
              </CardHeader>

              <CheckBoxes onAmenityUpdate={updateAmenity}></CheckBoxes>

              <Button className="col-12" color="warning">
                Lista bostad!
              </Button>
            </CardBody>
          </Card>
        </Form>
      </div>
    </div>
  );
};

export default LeaseResidence;