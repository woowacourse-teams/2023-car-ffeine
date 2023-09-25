import { useState } from 'react';

import { OptionItem, OptionsContainer, SelectButton, StyledSelect } from './SelectBox.style';

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

export default SelectBox;
