import React from "react";
// import { BrowserRouter, IndexRoute } from "react-router-dom";
// import { useState, useEffect, useRef } from "react";
import { useAsync } from "react-async-hook";
import { MapContainer, Marker, Popup, TileLayer, Rectangle, LayersControl } from "react-leaflet";
import { Icon } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
// import L from "leaflet";
// import Supercluster from "supercluster";
// import useSupercluster from "use-supercluster";
import "./Map.css"


export const icon = new Icon({
  iconUrl: "/anchor.svg",
  iconSize: [26, 32],
});

/* https://hr.wikipedia.org/wiki/Predlo%C5%BEak:Lokacijska_karta_Hrvatska - preširoko!*/
const croBounds = [
  [46.55, 13.23],
  [42.3, 19.45],
];

export default function Map() {
  // const [data, setData] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  const getData = async () => {
    return (await fetch(`https://plovput.li-st.net/getObjekti/`)).json();
    // try {
    //   const response = await fetch(`https://plovput.li-st.net/getObjekti/`);
    //   if (!response.ok) {
    //     throw new Error(`This is an HTTP error: The status is ${response.status}`);
    //   }
    //   let actualData = await response.json();
    //   console.log(actualData);
    //   setData(actualData.features)
    //   setError(null);
    // } catch (err) {
    //   setError(err.message);
    //   setData(null);
    // } finally {
    //   setLoading(false);
    // }
  };
  // }, []);

  const Ports = () => {
    const asyncPorts = useAsync(getData);
    return (
      <div className="App">
        {asyncPorts.loading && <div className="loader">Dohvat podataka...</div>}
        {asyncPorts.error && (
          <div className="error">
            {`Došlo je do pogreške prilikom dohvata podataka - (${asyncPorts.error.message})`}
             <p>Molimo pokušajte kasnije.</p>
          </div>
        )}

        {asyncPorts.result && (
          <MapContainer
            className="markercluster-map"
            center={[43.66809, 16.49985]}
            zoom={5}
            maxBounds={croBounds}
            minZoom={7.49}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <LayersControl>
              <LayersControl.Overlay name="Objekti" checked>
                <MarkerClusterGroup chunkedLoading={true} chunkInterval={3000}>
                  {asyncPorts.result.features.map((port) => (
                    <Marker
                      key={port.properties.pk}
                      position={[port.geometry.coordinates[1], port.geometry.coordinates[0]]}
                      icon={icon}
                    >
                      <Popup
                        position={[port.geometry.coordinates[1], port.geometry.coordinates[0]]}
                      >
                        <div>
                          <p>
                            Naziv objekta:<h4> {port.properties.naziv_objekta}</h4>
                          </p>
                          <p>PS broj: <b>{port.properties.ps_br}</b></p>
                          <p>E broj: <b>{port.properties.e_br}</b></p>
                          <p>Tip objekta: <b>{port.properties.tip_objekta}</b></p>
                          <p>Lučka kapetanija: <b>{port.properties.lucka_kapetanija}</b></p>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MarkerClusterGroup>
              </LayersControl.Overlay>
            </LayersControl>
            <Rectangle bounds={croBounds} />
          </MapContainer>
        )}
      </div>
    );
  };
  return Ports();
}


// return (
// <div className="App">
//   <h1>API Posts</h1>
//   {loading && <div>Dohvat podataka...</div>}
//   {error && (
//     <div>
//       {`Došlo je do pogreške prilikom dohvata podata - ${error}`}
//       <br> Molimo pokušajte kasnije.</br>
//     </div>
//   )}

//   <MapContainer center={[44.66809, 16.449985]} zoom={5} maxBounds={croBounds} minZoom={7.5}>
//     <TileLayer
//       url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//     />

//     {/* <MarkerClusterGroup chunkedLoading> */}
//     {/* <LayersControl position="toprignt">  */}
//        {/* <LayersControl.Overlay name="Marker with popup"> */}
//         {data && data.map((d) => (
//             <Marker
//               key={d.properties.pk}
//               position={[d.geometry.coordinates[1], d.geometry.coordinates[0]]}
//               icon={icon}
//             >
//               <Popup position={[d.geometry.coordinates[1], d.geometry.coordinates[0]]}>
//                 <div>
//                   <h2>Naziv objekta: {d.properties.naziv_objekta}</h2>
//                   <p>PS broj: {d.properties.ps_br}</p>
//                   <p>E broj: {d.properties.e_br}</p>
//                   <p>Tip objekta: {d.properties.tip_objekta}</p>
//                   <p>Lučka kapetanija: {d.properties.lucka_kapetanija}</p>
//                 </div>
//               </Popup>
//             </Marker>
//       ))}
//       {/* </LayersControl.Overlay> */}
//     {/* </LayersControl> */}
//     {/* </MarkerClusterGroup> */}
//     <Rectangle bounds={croBounds} />
//   </MapContainer>
// </div>
// );
// }

/*  
 
 const [map, setMap] = useState(null);
  
  const [bounds, setBounds] = useState(<cro>);
  const [zoom, setZoom] = useState(13);
  const mapRef = useRef();
 
  const icons = {};
const fetchIcon = (count, size) => {
  if (!icons[count]) {
    icons[count] = L.divIcon({
      html: `<div class="cluster-marker" style="width: ${size}px; height: ${size}px;">
        ${count}
      </div>`,
    });
  }
  return icons[count];
};
  
 const geoJSONPlaces = data.features.map((d) => {
    var geoJSONPlace = {};
    geoJSONPlace.type = "Feature";
    geoJSONPlace.properties = {
      cluster: false,
      id: d.properties.pk,
      name: d.properties.naziv_objekta,
      address: d.properties.lucka_kapetanija,
    };
    geoJSONPlace.geometry = {
      type: "Point",
      coordinates: [d.geometry.coordinates[1], d.geometry.coordinates[0]],
    };
    console.log(geoJSONPlace);
    return geoJSONPlace;
  });
  console.log(geoJSONPlaces);

  const { clusters, supercluster } = useSupercluster({
    points: geoJSONPlaces,
    bounds: bounds,
    zoom: zoom,
    options: { radius: 150, maxZoom: 14 },
  }); 

  {<MapContainer
    center={[44.66809, 16.449985]}
    zoom={5}
    maxBounds={croBounds}
    minZoom={7.5}
    ref={setMap}
  >
    {clusters.map((cluster) => {
      // every cluster point has coordinates
      const [longitude, latitude] = cluster.geometry.coordinates;
      // the point may be either a cluster or a crime point
      const { cluster: isCluster, point_count: pointCount } = cluster.properties;

      // we have a cluster to render
      if (isCluster) {
        return (
          <Marker
            key={`cluster-${cluster.id}`}
            position={[latitude, longitude]}
            icon={fetchIcon(pointCount, 10 + (pointCount / geoJSONPlaces.length) * 40)}
            onClick={() => {
              const expansionZoom = Math.min(
                supercluster.getClusterExpansionZoom(cluster.id),
                14
              );
              //  const leaflet = mapRef.current.leafletElement;
              //  leaflet.setView([latitude, longitude], expansionZoom, {
              //    animate: true,
              //  });
            }}
          />
        );
      }

      // we have a single point to render
      return <Marker key={cluster.properties.id} position={[latitude, longitude]} />;
    })}
  </MapContainer>; */

/* drugi pokušaj /////////////////////////////////////////////////////////////////////////
  
  const { clusters, supercluster } = useSupercluster({
     points: data,
     //  bounds,
     // zoom,
     options: { radius: 75, maxZoom: 20 },
   });
  
  useEffect(() => {
    console.log(clusters);
    console.log(supercluster);
  }, [clusters, supercluster]);
  
  
  {data &&
            data.features.map((cluster) => {
              const [longitude, latitude] = cluster.geometry.coordinates;
              const {
                cluster: isCluster,
                point_count: pointCount
              } = cluster.properties;

              if (isCluster) {
                let size = (pointCount * 20) / data.length;

              return (
                <Marker
                  lat={latitude}
                  lng={longitude}
                  key={`cluster-${cluster.properties.pk}`}
                  className="cluster-marker"
                >
                  <div
                    className="cluster-marker"
                    style={{ width: size + "px", height: size + "px" }}
                    onClick={() => {
                      const expansionZoom = Math.min(
                        supercluster.getClusterExpansionZoom(cluster.properties.pk),
                        20
                      );
                      mapRef.current.setZoom(expansionZoom);
                      mapRef.current.panTo({ lat: latitude, lng: longitude });
                    }}
                  >
                    {pointCount}
                  </div>
                </Marker>
              );
            } 
              /*else {
  */
