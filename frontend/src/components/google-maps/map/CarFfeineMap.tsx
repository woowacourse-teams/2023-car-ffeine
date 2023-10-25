import { lazy, Suspense, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import DataDownloader from '@ui/DataDownloader';

import CarFfeineMapListener from './CarFfeineListener';

const UserFilterListener = lazy(() => import('./UserFilterListener'));
const MarkersContainers = lazy(() => import('@marker/MarkerContainers'));
const ToastContainer = lazy(() => import('@ui/ToastContainer'));
const ClientStationFilters = lazy(() => import('@ui/ClientStationFilters'));
const MapController = lazy(() => import('@ui/MapController'));
const ModalContainer = lazy(() => import('@ui/ModalContainer'));
const Navigator = lazy(() => import('@ui/Navigator'));
const WarningModalContainer = lazy(() => import('@ui/WarningModalContainer'));

const CarFfeineMap = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!window.google && location.pathname === '/maps') {
      navigate('/');
    }
  }, []);

  if (window.google) {
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

          <DataDownloader />
        </Suspense>
      </>
    );
  }
  return <></>;
};

export default CarFfeineMap;
