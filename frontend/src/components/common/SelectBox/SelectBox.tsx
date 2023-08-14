import styled from 'styled-components';

import { useState } from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  onChange: (value: string) => void;
  value: string;
}

const SelectBox = ({ options, onChange, value }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (selectedValue: string) => {
    onChange(selectedValue);
    setIsOpen(false);
  };

  return (
    <StyledSelect>
      <SelectButton onClick={() => setIsOpen(!isOpen)}>
        {options.find((option) => option.value === value)?.label || '항목을 선택하세요'}
      </SelectButton>
      {isOpen && (
        <OptionsContainer>
          {options.map((option) => (
            <OptionItem key={option.value} onClick={() => handleSelect(option.value)}>
              {option.label}
            </OptionItem>
          ))}
        </OptionsContainer>
      )}
    </StyledSelect>
  );
};

const StyledSelect = styled.div`
  position: relative;
  width: 100%;
`;

const SelectButton = styled.button`
  padding: 0.8rem;
  font-size: 1.6rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  width: 100%;
  background-color: #ffffff;
  cursor: pointer;
`;

const OptionsContainer = styled.div`
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

const OptionItem = styled.div`
  padding: 0.8rem;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

export default SelectBox;
