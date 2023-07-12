import { useEffect } from 'react';

interface Props {
  map: google.maps.Map;
  position: google.maps.LatLngLiteral;
}

const UserMarker = ({ map, position }: Props) => {
  const { lat, lng } = position;

  useEffect(() => {
    const newMarker = new google.maps.Marker({
      position: { lat, lng },
      map: map,
    });

    newMarker.addListener('click', () => console.log(`현재 위치: ${lat} ${lng}`));

    return () => {
      newMarker.setMap(null);
    };
  }, []);

  return <></>;
};

export default UserMarker;
