import type { RegionName } from '../types';
import {
  StyledRegionCount,
  StyledRegionCountMarker,
  StyledRegionName,
} from './RegionCountMarker.style';

export interface RegionCountMarkerProps {
  count: number;
  regionName: RegionName;
}

const RegionCountMarker = ({ count, regionName }: RegionCountMarkerProps) => {
  return (
    <StyledRegionCountMarker>
      <StyledRegionCount>{count}</StyledRegionCount>
      <StyledRegionName>{regionName}</StyledRegionName>
    </StyledRegionCountMarker>
  );
};

export default RegionCountMarker;
