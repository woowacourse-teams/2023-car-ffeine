import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import type { CSSProp } from 'styled-components';
import { styled } from 'styled-components';

import type { InputHTMLAttributes } from 'react';

import Button from '@common/Button';

import { pillStyle } from '@style';

export interface StationSearchBarProps extends InputHTMLAttributes<HTMLInputElement> {
  shadow?: boolean;
  outlined?: boolean;
  background?: string;
  borderColor?: string;
  css?: CSSProp;
}

const StationSearchBar = ({ ...props }: StationSearchBarProps) => {
  return (
    <S.Label htmlFor="station-search">
      <S.Search aria-label="검색창" type="text" id="station-search" {...props} />
      <Button>
        <MagnifyingGlassIcon width="2.4rem" stroke={props.borderColor || '#333'} />
      </Button>
    </S.Label>
  );
};

const S = {
  Label: styled.label`
    position: relative;
  `,

  Search: styled.input<StationSearchBarProps>`
    ${pillStyle}

    background: ${({ background }) => background || '#fff'};
    border: ${({ outlined, borderColor }) =>
      outlined ? `0.15rem solid ${borderColor || '#333'}` : 'none'};
    box-shadow: ${({ shadow }) => `${shadow ? '0 0.3rem 0.8rem 0 gray' : 'none'}`};

    width: 100%;
    padding: 1.9rem 4.6rem 2rem 1.8rem;
    margin-bottom: 2rem;
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

export default StationSearchBar;
