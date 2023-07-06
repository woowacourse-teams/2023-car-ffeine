import { useEffect, useRef } from 'react';

const GoogleMap = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initialCenter = {
      lat: 37.5056102333107,
      lng: 127.05081496722168,
    };

    const initialZoomSize = 14;

    const initialMap = new window.google.maps.Map(ref.current, {
      center: initialCenter,
      zoom: initialZoomSize,
      disableDefaultUI: true,
    });
  }, []);

  return <div ref={ref} id="map" style={{ minHeight: '100vh' }} />;
};

export default GoogleMap;
