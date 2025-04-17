import { useEffect, useRef } from "react";
import Globe from "globe.gl";

const GlobeView = () => {
  const globeEl = useRef(null);

  useEffect(() => {
    const globe = Globe()(globeEl.current)
      .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
      .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png');
    
    globe.pointOfView({ altitude: 3 }, 1000);

    return () => globe._destructor?.();
  }, []);

  return <div ref={globeEl} style={{ width: "100%", height: "100vh" }} />;
};

export default GlobeView;
