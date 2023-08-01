import type { BasePanelType } from '@ui/Accordion';
import Accordion from '@ui/Accordion';
import DetailedStationInfo from '@ui/DetailedStationInfo';
import ServerStationFilters from '@ui/ServerStationFilters';
import StationList from '@ui/StationList/StationList';
import StationSearchWindow from '@ui/StationSearchWindow';

const Navigator = () => {
  const renderBasePanel = (basePanelType: BasePanelType) => {
    switch (basePanelType) {
      case 'searchWindow':
        return <StationSearchWindow />;
      case 'serverStationFilters':
        return <ServerStationFilters />;
      case 'stationList':
        return <StationList />;
    }
  };

  return (
    <Accordion>
      <Accordion.Navigator />
      <Accordion.BasePanel render={renderBasePanel} />
      <Accordion.LastPanel render={() => <DetailedStationInfo />} />
    </Accordion>
  );
};

export default Navigator;
