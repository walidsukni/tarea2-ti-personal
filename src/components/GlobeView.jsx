import { useEffect, useRef } from "react";
import Globe from "globe.gl";

const typeColors = {
  COM: "red",
  SCI: "blue",
  NAV: "green",
  SPY: "orange"
};

const GlobeView = ({ satellites }) => {
  const globeEl = useRef();

  useEffect(() => {
    const world = Globe()(globeEl.current)
      .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
      .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
      .pointAltitude("size")
      .pointColor("color")
      .pointsData([]); // inicial vacío

    globeEl.current.world = world;

    return () => world._destructor?.();
  }, []);

  // Cada vez que cambian los satélites, actualizamos puntos
  useEffect(() => {
    if (!globeEl.current?.world) return;

    const formatted = satellites.map((sat) => ({
      lat: sat.position.lat,
      lng: sat.position.long,
      size: 0.2, // tamaño visual
      color: typeColors[sat.type] || "gray",
      label: sat.name,
    }));

    globeEl.current.world.pointsData(formatted);
  }, [satellites]);

  return <div ref={globeEl} style={{ width: "100%", height: "100vh" }} />;
};

export default GlobeView;
