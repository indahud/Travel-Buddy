import * as React from 'react';
import { useState, useEffect, Fragment} from 'react';
import ReactMapGL, { Marker, Popup   } from 'react-map-gl';
import { listLogEntries } from './API';
import LogEntryForm from './LogEntryForm';  


const App = () => {
  const [logEntries, setLogEntries] = useState([]);
  const [showPopup, setShowPopup] = useState({});
  const [addEntryLocation, setaddEntryLocation ] = useState(null);
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 37.6,
    longitude: -95.665,
    zoom: 3
  });
  
  const getEntries = async () => {
    const logEntries = await listLogEntries();
    setLogEntries(logEntries);
  }

  useEffect(() => {
    getEntries();
  }, []);

  const showAddMarkerPopup = (event) => {
    const [longitude, latitude] = event.lngLat;
    setaddEntryLocation({
      latitude,
      longitude
    });
  };

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/brucewaynearkham/ckf5acu0g2ffp19o9umkqn3qp"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={nextViewport => setViewport(nextViewport)}
      onDblClick={showAddMarkerPopup}
    >
      {
        logEntries.map(entry => (
          <React.Fragment key={entry._id}>
          <Marker 
            latitude={entry.latitude} 
            longitude={entry.longitude} 
          >
          <div
            onClick={() => setShowPopup({
              // ...showPopup,
              [entry._id]: true
            })}
          >  
           <svg 
              className="marker yellow"
              style={{
                height: `${6 * viewport.zoom}px`,
                width: `${6 * viewport.zoom}px`
              }} 
              id="Layer_1" 
              enableBackground="new 0 0 512 512" 
              viewBox="0 0 512 512"  
            >
                <g><path d="m407.579 87.677c-31.073-53.624-86.265-86.385-147.64-87.637-2.62-.054-5.257-.054-7.878 0-61.374 1.252-116.566 34.013-147.64 87.637-31.762 54.812-32.631 120.652-2.325 176.123l126.963 232.387c.057.103.114.206.173.308 5.586 9.709 15.593 15.505 26.77 15.505 11.176 0 21.183-5.797 26.768-15.505.059-.102.116-.205.173-.308l126.963-232.387c30.304-55.471 29.435-121.311-2.327-176.123zm-151.579 144.323c-39.701 0-72-32.299-72-72s32.299-72 72-72 72 32.299 72 72-32.298 72-72 72z"/></g>
            </svg>
          </div>
        </Marker>
        {
          showPopup[entry._id] ? (
            <Popup
              latitude={entry.latitude} 
              longitude={entry.longitude} 
              closeButton={true}
              closeOnClick={false}
              dynamicPosition=  {true}
              onClose={() =>setShowPopup({})}
              anchor="top" >
              <div className="popup">
                <h3>{entry.title}</h3>
                <p>{entry.comment}</p>
                <small>Visted on:{new Date(entry.visitDate).toLocaleDateString()}</small>
                {entry.img &&  <img src={entry.img} alt={entry.title}/>}
              </div>
            </Popup>
          ) : null
        } 
        </React.Fragment>
        )) 
      }
      {
        addEntryLocation ? (
          <React.Fragment >
          <Marker 
            latitude={addEntryLocation.latitude} 
            longitude={addEntryLocation.longitude} 
          >
          <div>  
            <svg 
              className="marker red"
              style={{
                height: `${6 * viewport.zoom}px`,
                width: `${6 * viewport.zoom}px`
              }} 
              id="Layer_1" 
              enableBackground="new 0 0 512 512" 
              viewBox="0 0 512 512"  
            >
                <g><path d="m407.579 87.677c-31.073-53.624-86.265-86.385-147.64-87.637-2.62-.054-5.257-.054-7.878 0-61.374 1.252-116.566 34.013-147.64 87.637-31.762 54.812-32.631 120.652-2.325 176.123l126.963 232.387c.057.103.114.206.173.308 5.586 9.709 15.593 15.505 26.77 15.505 11.176 0 21.183-5.797 26.768-15.505.059-.102.116-.205.173-.308l126.963-232.387c30.304-55.471 29.435-121.311-2.327-176.123zm-151.579 144.323c-39.701 0-72-32.299-72-72s32.299-72 72-72 72 32.299 72 72-32.298 72-72 72z"/></g>
            </svg>
          </div>
        </Marker>
            <Popup
              latitude={addEntryLocation.latitude} 
              longitude={addEntryLocation.longitude} 
              closeButton={true}
              closeOnClick={false}
              dynamicPosition=  {true}
              onClose={() => setaddEntryLocation(null)}
              anchor="top" >
              <div className="popup">
                <LogEntryForm 
                  onClose={() => {
                    setaddEntryLocation(null)
                    getEntries();
                  }} 
                  location={addEntryLocation}
                />
              </div>
            </Popup>
          </React.Fragment>
        ) : null
      }
      
    </ReactMapGL>  
  );
}

export default App