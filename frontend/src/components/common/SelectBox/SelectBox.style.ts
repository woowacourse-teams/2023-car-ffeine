import styled from 'styled-components';

export const StyledSelect = styled.div`
  position: relative;
  width: 100%;
`;
export const SelectButton = styled.button`
  padding: 0.8rem;
  font-size: 1.6rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  width: 100%;
  background-color: #ffffff;
  cursor: pointer;
`;
export const OptionsContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  font-size: 1.6rem;
  border: 1px solid #ccc;
  border-top: none;
  border-radius: 0 0 4px 4px;
  background-color: #ffffff;
  z-index: 1;
`;
export const OptionItem = styled.div`
  padding: 0.8rem;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;
