import React from 'react';
import { connect } from 'react-redux';
import { Map as LLMap, TileLayer, Marker, Popup, LatLng } from 'react-leaflet';

const tag = '@Map:';


@connect(() => Object())
export default class Map extends React.Component {

  constructor() {
    super();
    this.state = {
      center: {lat: 42.867362, lng: 74.591031},
      zoom: 14,
    };
  }

  handleMapClick = (event) => {
    const { latlng } = event;
    print('MAP_CLICKED', latlng);
  }

  render() {
    const { center, zoom } = this.state;
    return <div class='ia-map-tab'>
      <LLMap class='ia-map' center={ center }
        zoom={ zoom } onClick={ this.handleMapClick } >
        <TileLayer
          url='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors' />
        <Marker position={center} />
      </LLMap>
    </div>;
  }
}
