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

const App = ({ apiKey }: { apiKey: string }) => {
  return <Wrapper apiKey={apiKey} render={render} libraries={['marker']} />;
};

export default App;
