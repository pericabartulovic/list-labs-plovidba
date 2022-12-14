import { useEffect } from "react";
import PropTypes from "prop-types";
import L from "leaflet";
import "leaflet.markercluster/dist/leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import { useLeafletMap } from "use-leaflet";
import { Icon } from "leaflet";

const mcg = L.markerClusterGroup();

const MarkerCluster = ({ markers }) => {
  const { map } = useLeafletMap();

  useEffect(() => {
    mcg.clearLayers();
    markers.forEach(({ position, text }) =>
      L.marker(new L.LatLng(position.lat, position.lng))
        .addTo(mcg)
        .bindPopup(text)
    );

    // optionally center the map around the markers
    // map.fitBounds(mcg.getBounds());

    // add the marker cluster group to the map
    map.addLayer(mcg);
  }, [markers, map]);

  return null;
};

MarkerCluster.propTypes = {
  markers: PropTypes.arrayOf(
    PropTypes.shape({
      position: PropTypes.objectOf(PropTypes.number).isRequired,
      text: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

export default MarkerCluster;
