import type { Station } from '../types';

interface Props {
  station: Station;
}

const BriefStationInfo = ({ station }: Props) => {
  return (
    <>
      <div>{station.stationName}</div>
      <button onClick={() => alert(station.stationName)}>나의 이름은?</button>
    </>
  );
};

export default BriefStationInfo;
