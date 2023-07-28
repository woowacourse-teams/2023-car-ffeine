import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import type { CSSProp } from 'styled-components';
import { styled } from 'styled-components';

import type { ChangeEvent, FormEvent, InputHTMLAttributes } from 'react';
import { useState } from 'react';

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
  const [inputValue, setInputValue] = useState('');

  const handleSubmitSearchWord = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    alert(inputValue);
  };

  const handleRequestSearchResult = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setInputValue(value);

    console.log(value);
  };

  return (
    <S.Form role="search" onSubmit={handleSubmitSearchWord}>
      <S.Search type="search" role="searchbox" onChange={handleRequestSearchResult} {...props} />
      <Button type="submit" aria-label="검색하기">
        <MagnifyingGlassIcon width="2.4rem" stroke={props.borderColor || '#333'} />
      </Button>
    </S.Form>
  );
};

const S = {
  Form: styled.form`
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
    font-size: 1.5rem;

    & + button {
      position: absolute;
      right: 2rem;
      top: 50%;
      transform: translateY(-50%);
    }

    &:focus {
      outline: 0;
    }

    ${({ css }) => css};
  `,
};

export default StationSearchBar;
