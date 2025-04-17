import { useEffect, useRef } from "react";
import Globe from "globe.gl";


const typeColors = {
    com: "red",
    sci: "blue",
    nav: "green",
    spy: "orange",
  };
  

const GlobeView = ({ satellites }) => {
  const globeEl = useRef(null);
  const globeInstance = useRef(null);

  // Inicializa el globo solo una vez
  useEffect(() => {
    const globe = Globe()(globeEl.current)
      .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
      .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
      .pointAltitude(0.2)
      .pointColor('color')
      .pointsData([]); // iniciar vacío

    globe.pointOfView({ altitude: 2.5 }, 0);
    globeInstance.current = globe;

    return () => globe._destructor?.();
  }, []);

  // Cada vez que se actualizan los satélites, actualiza puntos en globo
  useEffect(() => {
    if (!globeInstance.current || satellites.length === 0) return;

    const formattedPoints = satellites.map((sat) => ({
        lat: sat.position?.lat || 0,
        lng: sat.position?.long || 0,
        color: typeColors[sat.type?.toLowerCase()] || "gray",
      }));
      

    globeInstance.current.pointsData(formattedPoints);
  }, [satellites]);

  return <div ref={globeEl} style={{ width: "100%", height: "100vh" }} />;
};

export default GlobeView;
