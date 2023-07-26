import type { CSSProp } from 'styled-components';
import { styled } from 'styled-components';

import type { InputHTMLAttributes } from 'react';

import { pillStyle } from '@style';

import SearchIcon from '@assets/search.svg';

export interface StationSearchProps extends InputHTMLAttributes<HTMLInputElement> {
  shadow?: boolean;
  outlined?: boolean;
  background?: string;
  css?: CSSProp;
}

const StationSearch = ({ ...props }) => {
  return (
    <S.Label htmlFor="station-search">
      <S.Search type="text" id="station-search" {...props} />
      <SearchIcon />
    </S.Label>
  );
};

const S = {
  Label: styled.label`
    position: relative;
  `,

  Search: styled.input<StationSearchProps>`
    ${pillStyle}

    background: ${({ background }) => background || '#fff'};
    border: ${({ outlined }) => (outlined ? '0.15rem solid #000' : 'none')};
    box-shadow: ${({ shadow }) => `${shadow ? '0 0.3rem 0.8rem 0 gray' : 'none'}`};

    padding: 1.9rem 2.8rem 2rem;
    text-align: center;
    font-size: 1.5rem;

    & + svg {
      position: absolute;
      right: 2rem;
      bottom: -0.19rem;
    }

    &:focus {
      outline: 0;
    }

    ${({ css }) => css};
  `,
};

export default StationSearch;
