import { useEffect, useRef } from "react";
import Globe from "globe.gl";

const typeColors = {
  COM: "red",
  SCI: "blue",
  NAV: "green",
  SPY: "orange"
};

const antennas = [
  {
    name: "Goldstone DSN",
    lat: 35.2472,
    lng: -116.7933,
    color: "white"
  },
  {
    name: "Madrid DSN",
    lat: 40.4314,
    lng: -4.2486,
    color: "white"
  },
  {
    name: "Canberra DSN",
    lat: -35.3985,
    lng: 148.9819,
    color: "white"
  }
];

const GlobeView = ({ satellites }) => {
  const globeEl = useRef(null);
  const globeInstance = useRef(null);

  useEffect(() => {
    const globe = Globe()(globeEl.current)
      .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
      .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
      .pointAltitude(0.2)
      .pointColor('color')
      .pointsData([]);

    globe.pointOfView({ altitude: 2.5 }, 0);
    globeInstance.current = globe;

    return () => globe._destructor?.();
  }, []);

  useEffect(() => {
    if (!globeInstance.current) return;

    const satellitePoints = satellites.map((sat) => {
      const typeKey = sat.type?.toUpperCase?.(); // Manejo robusto
      return {
        lat: sat.position?.lat || 0,
        lng: sat.position?.long || 0,
        color: typeColors[typeKey] || "gray"
      };
    });

    const antennaPoints = antennas.map((ant) => ({
      lat: ant.lat,
      lng: ant.lng,
      color: ant.color
    }));

    const combinedPoints = [...satellitePoints, ...antennaPoints];
    globeInstance.current.pointsData(combinedPoints);
  }, [satellites]);

  return <div ref={globeEl} style={{ width: "100%", height: "100vh" }} />;
};

export default GlobeView;
