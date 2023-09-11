import StationMarkersContainer from '@marker/StationMarkersContainer';

import ToastContainer from '@common/Toast/ToastContainer';

import ClientStationFilters from '@ui/ClientStationFilters';
import MapController from '@ui/MapController';
import ModalContainer from '@ui/ModalContainer';
import Navigator from '@ui/Navigator';
import WarningModalContainer from '@ui/WarningModalContainer';

import CarFfeineMapListener from './CarFfeineListener';
import UserFilterListener from './UserFilterListener';

const CarFfeineMap = () => {
  return (
    <>
      <CarFfeineMapListener />
      <UserFilterListener />

      <ToastContainer />
      <ModalContainer />

      <Navigator />
      <ClientStationFilters />
      <MapController />

      <WarningModalContainer />
      <StationMarkersContainer />
    </>
  );
};

export default CarFfeineMap;
