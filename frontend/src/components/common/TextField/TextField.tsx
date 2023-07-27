import styled from 'styled-components';

import React from 'react';

const Group = styled.div`
  position: relative;
  margin: 45px 0;
`;

const Input = styled.input`
  background: none;
  color: #c6c6c6;
  font-size: 18px;
  padding: 10px 10px 10px 5px;
  display: block;
  width: 320px;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid #c6c6c6;

  &:focus {
    outline: none;
  }

  &:focus ~ label,
  &:valid ~ label {
    top: -14px;
    font-size: 12px;
    color: #2196f3;
  }
`;

const Label = styled.label`
  color: #c6c6c6;
  font-size: 16px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 10px;
  transition: 300ms ease all;
`;

const TextField = () => {
  return (
    <Group>
      <Input type="text" required />
      <Label>Name</Label>
    </Group>
  );
};

export default TextField;
