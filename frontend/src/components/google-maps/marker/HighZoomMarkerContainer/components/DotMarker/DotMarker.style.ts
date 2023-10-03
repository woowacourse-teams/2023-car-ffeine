import styled from 'styled-components';

export const Marker = styled.div<{ isAvailable: boolean }>`
  width: 1.5rem;
  height: 1.5rem;

  background-color: ${({ isAvailable }) => (isAvailable ? '#3373DC' : '#EA4335')};
  border: 1.5px solid ${({ isAvailable }) => (isAvailable ? '#324F8E' : '#960A0A')};
  border-radius: 50%;

  position: relative;
`;
