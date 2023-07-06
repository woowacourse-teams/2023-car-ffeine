import { Status, Wrapper } from '@googlemaps/react-wrapper';

import CarFfeineMap from './components/map/CarFfeineMap';

const render = (status: Status) => {
  switch (status) {
    case Status.LOADING:
      return <>로딩중...</>;
    case Status.FAILURE:
      return <>에러 발생</>;
    case Status.SUCCESS:
      return <CarFfeineMap />;
  }
};

const App = () => {
  return <Wrapper apiKey={`${process.env.GOOGLE_MAPS_API_KEY}`} render={render} />;
};

export default App;
