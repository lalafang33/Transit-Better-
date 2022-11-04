import { React, useContext, useState } from "react";
import GoogleMapReact from 'google-map-react';
import Marker from "./Marker";
import DirectionForm from "./DirectionForm";
import { useRef } from "react";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function SimpleMap(props){


  const defaultProps = {
    center: {
      lat: 49.2712,
      lng: -123.1340
    },
    zoom: 11
  };

  const nearbyStations = props.nearbyStations.map((station, index) => {
    return(
    <Marker
      key={index}
      lat={station.place.location.lat}
      lng={station.place.location.lng}
      text={station.place.name}
    />)
  })

  let userData = [];

  if (props.userLat && props.userLong) {

  userData = [{lat: props.userLat, lng: props.userLong }]

 };

  const userLocation = userData.map((user, index) => {
    return(
    <Marker
      key={index}
      lat={user.lat}
      lng={user.lng}
      text="Current Location"
    />)
  })

  const inputEl = useRef(null);
  


  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        ref={inputEl}
        bootstrapURLKeys={{ key: "AIzaSyBJcuaSVdI86sL8eyTV1ZyIMHD10zG8nGo" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
      {userLocation}
      {nearbyStations}
      </GoogleMapReact>
      <DirectionForm
        map={inputEl}
      />
    </div>
  );
}