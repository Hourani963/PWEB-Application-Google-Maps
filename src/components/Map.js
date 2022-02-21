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
import toilettes from "../json/sanisettesparis.json"
import wifiFree from "../json/sites-disposant-du-service-paris-wi-fi.json"
import BornChergeurElectrique from "../json/belib-points-de-recharge-pour-vehicules-electriques-disponibilite-temps-reel.json"
import fontainBoir from "../json/fontaines-a-boire.json"
import EmptyRoads from "./styles/EmptyRoads"
import MainRoads from "./styles/MainRoads"
import GoogleClassic from "./styles/GoogleClassique"
import desert from "./styles/Desert"

const libraries = ["places"];
const mapContainerStyle = {
    width : '202vh',
    height : '98vh',
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
const styleD= {
    styles :EmptyRoads , 
    disableDefaultUI : true, 
                 
}
const styleE= {
    styles :MainRoads , 
    disableDefaultUI : true, 
                 
}
const styleF= {
    styles :desert , 
    disableDefaultUI : true, 
                 
}
const styleG= {
    styles :GoogleClassic , 
    disableDefaultUI : true, 
                 
}

export default function Map(){
    
    const [style, setStyle] = React.useState(styleG);
    const changeStyle = React.useCallback((newstyle) => {
        setStyle(current => newstyle);
      }, []);
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

    const [isShowToilette, setShowToilette] = React.useState(false);
    const toggleShowToilette = React.useCallback(() => {
        setShowToilette(current => !current);
      }, []);

    const [isShowWifi, setShowWifi] = React.useState(false);
    const toggleShowWifi = React.useCallback(() => {
        setShowWifi(current => !current);
      }, []);
    const [isShowBiblio, setShowBiblio] = React.useState(false);
    const toggleShowBiblio = React.useCallback(() => {
        setShowBiblio(current => !current);
    }, []);
    const [isShowFontainBoir, setShowFontainBoir] = React.useState(false);
    const toggleShowFontainBoir = React.useCallback(() => {
        setShowFontainBoir(current => !current);
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

    
    return(
        <div>
            <div className="Map">
            <GoogleMap
                mapContainerStyle={mapContainerStyle} 
                zoom={15} 
                center={center}
                options = {style}
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
                
                {/*SHOW VELIB*/}
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

                {isShowToilette?
                <>
                    {toilettes.map((toilette) => {
                    return(
                        <Marker
                        key={toilette.recordid}
                        position={{lat: toilette.geometry.coordinates[1], lng : toilette.geometry.coordinates[0]}}
                        icon={{
                            url: `/toilette.svg`,
                            origin: new window.google.maps.Point(0, 0),
                            anchor: new window.google.maps.Point(15, 15),
                            scaledSize: new window.google.maps.Size(30, 30),
                            }}
                        />
                    )
                })}
                </> 
                : null}
                
                {isShowWifi?
                <>
                    {wifiFree.map((wifi) => {
                    return(
                        <Marker
                        key={wifi.recordid}
                        position={{lat: wifi.geometry.coordinates[1], lng : wifi.geometry.coordinates[0]}}
                        icon={{
                            url: `/wifi.svg`,
                            origin: new window.google.maps.Point(0, 0),
                            anchor: new window.google.maps.Point(15, 15),
                            scaledSize: new window.google.maps.Size(30, 30),
                            }}
                        />
                    )
                })}
                </> 
                : null}
                {isShowBiblio?
                <>
                    {BornChergeurElectrique.map((chargeur) => {
                    return(
                        <Marker
                        key={chargeur.recordid}
                        position={{lat: chargeur.geometry.coordinates[1], lng : chargeur.geometry.coordinates[0]}}
                        icon={{
                            url: `/charger.svg`,
                            origin: new window.google.maps.Point(0, 0),
                            anchor: new window.google.maps.Point(15, 15),
                            scaledSize: new window.google.maps.Size(30, 30),
                            }}
                        />
                    )
                })}
                </> 
                : null}
                 
                {isShowFontainBoir?
                <>
                    {fontainBoir.map((fontain) => {
                    return(
                        <Marker
                        key={fontain.recordid}
                        position={{lat: fontain.geometry.coordinates[1], lng : fontain.geometry.coordinates[0]}}
                        icon={{
                            url: `/fontain.svg`,
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
                <Button className="button" style={{backgroundColor: "green"}}
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
                    onClick={toggleShowToilette}
                    >
                    <img src="./toilette.svg"/>
                </Button>
                <Button className="button" style={{backgroundColor: "white"}}
                    onClick={toggleShowWifi}
                    >
                    <img src="./wifi.svg"/>
                </Button>
                <Button className="button" style={{backgroundColor: "blue"}}
                    onClick={toggleShowBiblio}
                    >
                    <img src="./charger.svg"/>
                </Button>
                <Button className="button" style={{backgroundColor: "blue"}}
                    onClick={toggleShowFontainBoir}
                    >
                    <img src="./fontain.svg"/>
                </Button>
            </div>
            <div className="iconsR">
                <Button className="button" style={{backgroundColor: "white"}}
                    onClick={() => changeStyle(styleA)}
                    >
                    <img src="./A.svg"/>
                </Button>
                <Button className="button" style={{backgroundColor: "white"}}
                    onClick={() => changeStyle(styleB)}
                    >
                    <img src="./B.ico"/>
                </Button>
                <Button className="button" style={{backgroundColor: "white"}}
                    onClick={() => changeStyle(styleC)}
                    >
                    <img src="./C.ico"/>
                </Button>
                <Button className="button" style={{backgroundColor: "white"}}
                    onClick={() => changeStyle(styleD)}
                    >
                    <img src="./D.ico"/>
                </Button>
                <Button className="button" style={{backgroundColor: "white"}}
                    onClick={() => changeStyle(styleE)}
                    >
                    <img src="./E.ico"/>
                </Button>
                <Button className="button" style={{backgroundColor: "white"}}
                    onClick={() => changeStyle(styleF)}
                    >
                    <img src="./F.ico"/>
                </Button>
                <Button className="button" style={{backgroundColor: "white"}}
                    onClick={() => changeStyle(styleG)}
                    >
                    <img src="./G.ico"/>
                </Button>
            </div>
            
            
        </div>
    )
    
}

