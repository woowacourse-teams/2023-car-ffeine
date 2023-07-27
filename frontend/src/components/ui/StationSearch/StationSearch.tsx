import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import type { CSSProp } from 'styled-components';
import { css, styled } from 'styled-components';

import type { InputHTMLAttributes } from 'react';

import Button from '@common/Button';
import List from '@common/List';
import ListItem from '@common/ListItem';
import Text from '@common/Text';

import { pillStyle } from '@style';

export interface StationSearchProps extends InputHTMLAttributes<HTMLInputElement> {
  shadow?: boolean;
  outlined?: boolean;
  background?: string;
  css?: CSSProp;
}

const StationSearch = ({ ...props }) => {
  return (
    <S.Container>
      <Button css={closeButton}>
        <XMarkIcon width="3.2rem" fill="#333" />
      </Button>
      <S.Label htmlFor="station-search">
        <S.Search aria-label="검색창" type="text" id="station-search" {...props} />
        <Button>
          <MagnifyingGlassIcon width="2.4rem" stroke="#333" />
        </Button>
      </S.Label>
      <List
        css={css`
          padding: 2.2rem 1rem 0.8rem;
          border-radius: 0.8rem;
          margin-top: 3rem;
          outline: 0.15rem solid #333;
        `}
      >
        {Array.from({ length: 6 }).map((_, index) => (
          <ListItem key={index} divider css={foundStationList} NoLastDivider>
            <Button width="100%">
              <Text
                variant="h5"
                mb={2}
                title={'충전소'}
                css={css`
                  display: -webkit-box;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 1;
                `}
              >{`잠실제1주차장충전소`}</Text>
              <Text variant="body" align="left">
                {`서울특별시 강남구 번릉로 113`}
              </Text>
            </Button>
          </ListItem>
        ))}
      </List>
    </S.Container>
  );
};

const S = {
  Container: styled.div`
    width: 34rem;
    height: 100vh;
    background: white;
    outline: 0.15rem solid #444;
    padding: 2rem 2.4rem;
  `,

  Label: styled.label`
    position: relative;
  `,

  Search: styled.input<StationSearchProps>`
    ${pillStyle}

    background: ${({ background }) => background || '#fff'};
    border: ${({ outlined }) => (outlined ? '0.15rem solid #333' : 'none')};
    box-shadow: ${({ shadow }) => `${shadow ? '0 0.3rem 0.8rem 0 gray' : 'none'}`};

    width: 100%;
    padding: 1.9rem 4.6rem 2rem 1.8rem;
    font-size: 1.5rem;

    & + button {
      position: absolute;
      right: 2rem;
      top: -50%;
    }

    &:focus {
      outline: 0;
    }

    ${({ css }) => css};
  `,
};

const closeButton = css`
  display: block;
  margin: -0.4rem -0.8rem 2.4rem auto;
`;

const foundStationList = css`
  padding: 0 1rem 2rem;
  margin-bottom: 2rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

export default StationSearch;
