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

    // Show Icons on map****************/
    const [isShowVelib, setShowVelib] = React.useState(false);
    const toggleShowVelib = React.useCallback(() => {
        setShowVelib(current => !current);
      }, []);

    const [isShowCinema, setShowCinema] = React.useState(false);
    const toggleShowCinema = React.useCallback(() => {
        setShowCinema(current => !current);
      }, []);

    const [isShowMetro, setShowMetro] = React.useState(false);
    const toggleShowMetro = React.useCallback(() => {
        setShowMetro(current => !current);
      }, []);
    //******************** */
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

    
    console.log(isShowVelib)
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
                
                {isShowMetro ?
                <>
                    {metros.nodes.map((metro) => {
                    return(
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
                    )
                })}
                </> 
                : null}
                
                {/* SHOW CINEMA STATIONS */}
                {isShowCinema ?
                <>
                    {cinemas.map((cinema) => {
                    return(
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
                    )
                })}
                </> 
                : null}

                {isShowVelib ?
                <>
                    {velibs.map((velib) => {
                    return(
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
                    )
                })}
                </> 
                : null}
                
            </GoogleMap>
            </div>
            
            <div className="iconsL">
                <Button className="button" style={{backgroundColor: "blue"}}
                    onClick={toggleShowVelib}
                    >
                    <img src="./velib.svg"/>
                </Button>
                <Button className="button" style={{backgroundColor: "blue"}}
                    onClick={toggleShowCinema}
                    >
                    <img src="./cinema.svg"/>
                </Button>
                <Button className="button" style={{backgroundColor: "blue"}}
                    onClick={toggleShowMetro}
                    >
                    <img src="./metro.svg"/>
                </Button>
                <Button className="button" style={{backgroundColor: "blue"}}
                    onClick={toggleShowVelib}
                    >
                    <img src="./cinema.svg"/>
                </Button>
                <Button className="button" style={{backgroundColor: "blue"}}
                    onClick={toggleShowVelib}
                    >
                    <img src="./cinema.svg"/>
                </Button>
                <Button className="button" style={{backgroundColor: "blue"}}
                    onClick={toggleShowVelib}
                    >
                    <img src="./cinema.svg"/>
                </Button>
                <Button className="button" style={{backgroundColor: "blue"}}
                    onClick={toggleShowVelib}
                    >
                    <img src="./cinema.svg"/>
                </Button>
            </div>
            <div className="iconsR">
                <Button className="button" style={{backgroundColor: "blue"}}
                    onClick={toggleShowVelib}
                    >
                    <img src="./cinema.svg"/>
                </Button>
                <Button className="button" style={{backgroundColor: "blue"}}
                    onClick={toggleShowVelib}
                    >
                    <img src="./cinema.svg"/>
                </Button>
                <Button className="button" style={{backgroundColor: "blue"}}
                    onClick={toggleShowVelib}
                    >
                    <img src="./cinema.svg"/>
                </Button>
                <Button className="button" style={{backgroundColor: "blue"}}
                    onClick={toggleShowVelib}
                    >
                    <img src="./cinema.svg"/>
                </Button>
                <Button className="button" style={{backgroundColor: "blue"}}
                    onClick={toggleShowVelib}
                    >
                    <img src="./cinema.svg"/>
                </Button>
                <Button className="button" style={{backgroundColor: "blue"}}
                    onClick={toggleShowVelib}
                    >
                    <img src="./cinema.svg"/>
                </Button>
                <Button className="button" style={{backgroundColor: "blue"}}
                    onClick={toggleShowVelib}
                    >
                    <img src="./cinema.svg"/>
                </Button>
            </div>
            
            
        </div>
    )
    
}

