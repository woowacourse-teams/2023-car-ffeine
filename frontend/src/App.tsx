import { Status, Wrapper } from '@googlemaps/react-wrapper';

import CarFfeineMap from '@map/CarFfeineMap';

import Loading from '@common/Loading';

const render = (status: Status) => {
  switch (status) {
    case Status.LOADING:
      return <Loading />;
    case Status.FAILURE:
      return <>에러 발생</>;
    case Status.SUCCESS:
      return <CarFfeineMap />;
  }
};

const App = () => {
  return (
    <Wrapper
      apiKey={
        process.env.NODE_ENV === 'production'
          ? process.env.GOOGLE_MAPS_API_KEY_PROD
          : process.env.GOOGLE_MAPS_API_KEY_DEV
      }
      render={render}
      libraries={['marker']}
    />
  );
};

export default App;
