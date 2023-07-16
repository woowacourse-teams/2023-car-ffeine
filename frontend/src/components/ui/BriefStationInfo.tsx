import type { Station } from 'types';

interface Props {
  station: Station;
}

const BriefStationInfo = ({ station }: Props) => {
  return (
    <>
      <div>{station.stationName}</div>
      <button onClick={() => alert(JSON.stringify(station))}>나의 정보는?</button>
    </>
  );
};

export default BriefStationInfo;
