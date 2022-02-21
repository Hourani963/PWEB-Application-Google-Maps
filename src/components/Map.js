import React from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import ParisMapStyle from "./styles/ParisMapStyle";
import GreenMapStyle from "./styles/GreenMapStyle";
import { formatRelative } from "date-fns";
import metros from '../json/metroParis.json'
import Button from 'react-bootstrap/Button'
import './Map.css'
import velibs from '../json/velib.json'
import cinemas from "../json/cinema.json"
import SonderCityStyle from "./styles/SonderCityStyle"
import ButtonComponent from "./ButtonComponent";

const libraries = ["places"];
const mapContainerStyle = {
    width : '180vh',
    height : '90vh',
};


const center = {
    lat :48.826235 ,
    lng :2.340965 ,
}

const styleA= {
    styles : ParisMapStyle, // using the style
    disableDefaultUI : true, //delete the default google maps icons
    zoomControl : true, // add the default goole map zoom control                       
}
const styleB= {
    styles : GreenMapStyle, // using the style
    disableDefaultUI : true, 
                  
}
const styleC= {
    styles :SonderCityStyle , 
    disableDefaultUI : true, 
                 
}


export default function Map(){
    const [markers, setMarkers] = React.useState([]);
    const [selected, setSelected] = React.useState(null);

    const onMapClick = React.useCallback((e) => {
        setMarkers((current) => [
          ...current,
          {
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
            time: new Date(),
          },
        ]);
      }, []);
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: "AIzaSyCZy7LWLiZvKynl2lo_dks1re9tbi0CdoQ",
        libraries,
      });

    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, []);


    if (loadError) return "Error loadin map";
    if (!isLoaded) return "Loading map";

    return(
        <div>
            <div className="Map">
            <GoogleMap
                mapContainerStyle={mapContainerStyle} 
                zoom={15} 
                center={center}
                options = {styleC}
                onClick={onMapClick}
                onLoad={onMapLoad}
            >
                {markers.map((marker) => (
                    <Marker
                        key={marker.time.toISOString()}
                        position={{lat: marker.lat, lng : marker.lng}}
                        icon={{
                            url: `/alien.svg`,
                            origin: new window.google.maps.Point(0, 0),
                            anchor: new window.google.maps.Point(15, 15),
                            scaledSize: new window.google.maps.Size(30, 30),
                          }}
                          onClick={() => {
                            setSelected(marker);
                          }}
                    />
                ))}
                {selected ? (
                <InfoWindow
                    position={{ lat: selected.lat, lng: selected.lng }}
                    onCloseClick={() => {
                    setSelected(null);
                    }}
                >
                    <div>
                        <h2>
                            Alert   
                        </h2>
                        <p>Spotted {formatRelative(selected.time, new Date())}</p>
                    </div>
                </InfoWindow>
                ) : null}

                {/* SHOW METRO STATIONS */}
                {metros.nodes.map((metro) => (
                <Marker
                    key={metro.id}
                    position={{lat: metro.latitude, lng : metro.longitude}}
                    icon={{
                        url: `/metro.svg`,
                        origin: new window.google.maps.Point(0, 0),
                        anchor: new window.google.maps.Point(15, 15),
                        scaledSize: new window.google.maps.Size(30, 30),
                        }}
                    />
                ))}

                {/* SHOW VELIB STATIONS */}
                {velibs.map((velib) => (
                <Marker
                    key={velib.fields.stationcode}
                    position={{lat: velib.geometry.coordinates[1], lng : velib.geometry.coordinates[0]}}
                    icon={{
                        url: `/velib.svg`,
                        origin: new window.google.maps.Point(0, 0),
                        anchor: new window.google.maps.Point(15, 15),
                        scaledSize: new window.google.maps.Size(30, 30),
                        }}
                    />
                ))}
                {/* SHOW CINEMA STATIONS */}
                {cinemas.map((cinema) => (
                <Marker
                    key={cinema.recordid}
                    position={{lat: cinema.geometry.coordinates[1] , lng :cinema.geometry.coordinates[0] }}
                    icon={{
                        url: `/cinema.svg`,
                        origin: new window.google.maps.Point(0, 0),
                        anchor: new window.google.maps.Point(15, 15),
                        scaledSize: new window.google.maps.Size(30, 30),
                        }}
                    />
                ))}

            </GoogleMap>
            </div>
            <div className="iconsL">
                <ButtonComponent
                    color = "red"
                    icon = "./metro.svg"
                />
                <ButtonComponent
                    color = "green"
                    icon = "./velib.svg"
                />
                <ButtonComponent
                    color = "blue"
                    icon = "./cinema.svg"
                />
                <ButtonComponent
                    color = "yellow"
                    icon = "./velib.svg"
                />
                <ButtonComponent
                    color = "green"
                    icon = "./velib.svg"
                />
                <ButtonComponent
                    color = "green"
                    icon = "./velib.svg"
                />
                <ButtonComponent
                    color = "green"
                    icon = "./velib.svg"
                />
            </div>
            <div className="iconsR">
                <ButtonComponent
                    color = "red"
                    icon = "./velib.svg"
                />
                <ButtonComponent
                    color = "green"
                    icon = "./velib.svg"
                />
                <ButtonComponent
                    color = "green"
                    icon = "./velib.svg"
                />
                <ButtonComponent
                    color = "green"
                    icon = "./velib.svg"
                />
                <ButtonComponent
                    color = "green"
                    icon = "./velib.svg"
                />
                <ButtonComponent
                    color = "green"
                    icon = "./velib.svg"
                />
                <ButtonComponent
                    color = "green"
                    icon = "./velib.svg"
                />
            </div>
            
        </div>
    )
    
}