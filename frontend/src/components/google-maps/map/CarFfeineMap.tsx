import { lazy, Suspense } from 'react';

import CarFfeineMapListener from './CarFfeineListener';

const UserFilterListener = lazy(() => import('./UserFilterListener'));
const MarkersContainers = lazy(() => import('@marker/MarkersContainers'));
const ToastContainer = lazy(() => import('@ui/ToastContainer'));
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
        <WarningModalContainer />

        <Navigator />
        <ClientStationFilters />
        <MapController />

        <MarkersContainers />
      </Suspense>
    </>
  );
};

export default CarFfeineMap;
