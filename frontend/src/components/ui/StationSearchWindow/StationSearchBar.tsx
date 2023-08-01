import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import type { CSSProp } from 'styled-components';
import { styled } from 'styled-components';

import { useState } from 'react';
import type { ChangeEvent, FormEvent, InputHTMLAttributes } from 'react';

import { useSetExternalState } from '@utils/external-state';

import { searchWordStore } from '@stores/searchWordStore';

import { useUpdateSearchResult } from '@hooks/useUpdateSearchResult';

import Button from '@common/Button';

import { pillStyle } from '@style';

import SearchResult from './SearchResult';

export interface StationSearchBarProps extends InputHTMLAttributes<HTMLInputElement> {
  outlined?: boolean;
  background?: string;
  borderColor?: string;
  css?: CSSProp;
}

const StationSearchBar = ({ ...props }: StationSearchBarProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const { updateSearchResult } = useUpdateSearchResult();
  const setSearchWord = useSetExternalState(searchWordStore);

  const handleSubmitSearchWord = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleRequestSearchResult = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    const searchWord = encodeURIComponent(value);
    setSearchWord(searchWord);
    updateSearchResult();
  };

  return (
    <>
      <S.Form role="search" onSubmit={handleSubmitSearchWord}>
        <S.Search
          type="search"
          role="searchbox"
          {...props}
          onChange={handleRequestSearchResult}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <Button type="submit" aria-label="검색하기">
          <MagnifyingGlassIcon width="2.4rem" stroke={props.borderColor || '#333'} />
        </Button>
      </S.Form>
      {isFocused && <SearchResult />}
    </>
  );
};

const S = {
  Form: styled.form`
    position: relative;
  `,

  Search: styled.input<StationSearchBarProps>`
    ${pillStyle}

    background: ${({ background }) => background || '#fff'};
    border: 1px solid #d0d2d8;

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
      box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.2);
      outline: 0;
    }

    ${({ css }) => css};
  `,
};

export default StationSearchBar;
