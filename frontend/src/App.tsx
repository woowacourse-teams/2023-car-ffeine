import { Status, Wrapper } from '@googlemaps/react-wrapper';

import CarFfeineMap from '@map/CarFfeineMap';

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

const App = ({ apiKey }: { apiKey: string }) => {
  return <Wrapper apiKey={apiKey} render={render} />;
};

export default App;
