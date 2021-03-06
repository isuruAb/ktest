/*global google*/
import React, { Component } from "react";
import {
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer
} from "react-google-maps";

class Map extends Component {
  state = {
    directions: null
  };

  componentDidMount() {
    const directionsService = new google.maps.DirectionsService();
    const origin = { lat: this.props.pickup.lat?this.props.pickup.lat:40.756795, lng: this.props.pickup.lng?this.props.pickup.lng:-73.954298 };
    const destination = { lat: this.props.dropoff.lat?this.props.dropoff.lat:41.756795, lng: this.props.dropoff.lng?this.props.dropoff.lng:-78.954298 };
    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result
          });
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  }

  render() {
    const GoogleMapExample = withGoogleMap(props => (
      <GoogleMap
        defaultCenter={{ lat: 40.756795, lng: -73.954298 }}
        defaultZoom={13}
      >
        <DirectionsRenderer
          directions={this.state.directions}
        />
      </GoogleMap>
    ));

    return (
      <div>
        <GoogleMapExample
          containerElement={<div style={{ height: `300px`, width: "100%" }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}

export default Map;
