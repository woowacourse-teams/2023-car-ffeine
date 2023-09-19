import { lazy, Suspense } from 'react';

import CarFfeineMapListener from './CarFfeineListener';

const UserFilterListener = lazy(() => import('./UserFilterListener'));
const StationMarkersContainer = lazy(() => import('@marker/StationMarkersContainer'));
const ToastContainer = lazy(() => import('@common/Toast/ToastContainer'));
const ClientStationFilters = lazy(() => import('@ui/ClientStationFilters'));
const MapController = lazy(() => import('@ui/MapController'));
const ModalContainer = lazy(() => import('@ui/ModalContainer'));
const Navigator = lazy(() => import('@ui/Navigator'));
const WarningModalContainer = lazy(() => import('@ui/WarningModalContainer'));

const CarFfeineMap = () => {
  return (
    <>
      <CarFfeineMapListener />
      <Suspense>
        <UserFilterListener />

        <ToastContainer />
        <ModalContainer />

        <Navigator />
        <ClientStationFilters />
        <MapController />

        <WarningModalContainer />
        <StationMarkersContainer />
      </Suspense>
    </>
  );
};

export default CarFfeineMap;
