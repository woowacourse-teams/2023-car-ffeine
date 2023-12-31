import type { Meta } from '@storybook/react';
import { styled } from 'styled-components';

import type { SearchResultProps } from './SearchResult';
import SearchResult from './SearchResult';

const meta = {
  title: 'UI/SearchResult',
  tags: ['autodocs'],
  component: SearchResult,
  args: {
    cities: [
      {
        cityName: '서울특별시 강동구 천호동',
        latitude: 1,
        longitude: 1,
      },
      {
        cityName: '서울특별시 강동구 명일동',
        latitude: 1,
        longitude: 1,
      },
      {
        cityName: '서울특별시 강동구 명일동 413-12번지 카페인 빌딩',
        latitude: 1,
        longitude: 1,
      },
    ],
    stations: [
      {
        stationId: '0',
        stationName: '충전소 이름이라네',
        speed: 'quick',
        address: '서울시 강남구 테헤란로 411',
        latitude: 1,
        longitude: 1,
      },
      {
        stationId: '1',
        stationName: '허허',
        speed: 'quick',
        address: '서울시 강남구 테헤란로 411',
        latitude: 1,
        longitude: 1,
      },
      {
        stationId: '2',
        stationName: '완전 엄청나게 이름이 긴 충전소를 테스트',
        speed: 'standard',
        address: '서울시 강남구 테헤란로 411 천호빌딩 지하 14층',
        latitude: 1,
        longitude: 1,
      },
    ],
    isLoading: false,
    isError: false,
    showStationDetails: () => {
      ('');
    },
  },
  argTypes: {
    stations: {
      description:
        '검색된 충전소들입니다.<br /> 검색된 충전소의 개수가 0일 때는 검색 결과가 없습니다.',
    },
    isLoading: {
      description: 'true: 검색 결과를 가져오고 있습니다.<br /> false: 검색 결과를 가져왔습니다.',
    },
    isError: {
      description: 'true: 에러가 발생했습니다.<br /> false: 에러가 발생하지 않았습니다.',
    },
    showStationDetails: {
      description: '검색된 충전소를 클릭하면 해당 충전소로 이동하고, 상세정보가 나타납니다.',
    },
  },
} satisfies Meta<typeof SearchResult>;

export default meta;

// TODO: 스토리북 빌드 실패로 임시로 조치해뒀으니 수정 바랍니다.

export const Default = ({ ...args }: SearchResultProps) => {
  return (
    <Container>
      <SearchResult {...args} />
    </Container>
  );
};

export const NoResult = () => {
  return (
    <SubContainer>
      <SearchResult
        cities={[]}
        stations={[]}
        closeResult={() => null}
        isError={false}
        isLoading={false}
        showStationDetails={() => null}
      />
    </SubContainer>
  );
};

export const Error = () => {
  return (
    <Container>
      <SearchResult
        cities={[]}
        stations={[]}
        closeResult={() => null}
        isError={true}
        isLoading={false}
        showStationDetails={() => null}
      />
    </Container>
  );
};

const Container = styled.div`
  width: 34rem;
  height: 16rem;
`;

const SubContainer = styled(Container)`
  height: 24rem;
`;
