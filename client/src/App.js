import * as React from 'react';
import { useState, useEffect} from 'react';
import ReactMapGL, { Marker   } from 'react-map-gl';
import { listLogEntries } from './API';


const App = () => {
  const [logEntries, setLogEntries] = useState([]);
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 37.6,
    longitude: -95.665,
    zoom: 3
  });
  
  useEffect(() => {
    (async () => {
      const logEntries = await listLogEntries();
      setLogEntries(logEntries);
    })();
    
  }, []);

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/brucewaynearkham/ckf5acu0g2ffp19o9umkqn3qp"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={nextViewport => setViewport(nextViewport)}
    >
      {
        logEntries.map(entry => (
          <Marker 
            key={entry._id}
            latitude={entry.latitude} 
            longitude={entry.longitude} 
            offsetLeft={-12} 
            offsetTop={-24}>
          <div>  
            <img classsName="marker" src="https://i.imgur.com/y0G5YTX.png" />
          </div>
        </Marker>
        ))
      }
    </ReactMapGL>  
  );
}

export default App