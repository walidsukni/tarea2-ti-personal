import { useEffect, useRef } from "react";
import Globe from "globe.gl";

const typeColors = {
  COM: "red",
  SCI: "blue",
  NAV: "green",
  SPY: "orange"
};

const GlobeView = ({ satellites }) => {
  const globeEl = useRef(null);
  const globeInstance = useRef(null);

  // Crear globo una sola vez
  useEffect(() => {
    const globe = Globe()(globeEl.current)
      .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
      .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
      .pointAltitude(0.2)
      .pointColor('color')
      .pointsData([]); // Inicial vacío

    globeInstance.current = globe;
    globe.pointOfView({ altitude: 2.5 });

    return () => globe._destructor?.();
  }, []);

  // Cuando llegan los satélites desde props
  useEffect(() => {
    if (!globeInstance.current || satellites.length === 0) return;

    const formattedPoints = satellites.map((sat) => ({
      lat: sat.position?.lat || 0,
      lng: sat.position?.long || 0,
      color: typeColors[sat.type] || "gray",
    }));

    globeInstance.current.pointsData(formattedPoints);
  }, [satellites]);

  return <div ref={globeEl} style={{ width: "100%", height: "100vh" }} />;
};

export default GlobeView;
