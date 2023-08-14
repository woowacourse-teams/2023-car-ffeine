import styled, { keyframes } from 'styled-components';

import type { SpacingProps } from '@common/systems';
import { spacing } from '@common/systems';

export interface SkeletonProps extends SpacingProps {
  width?: string;
  height?: string;
  borderRadius?: string;
}

const skeletonAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const SkeletonWrapper = styled.div<SkeletonProps>`
  ${spacing};

  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '1rem'};
  background: linear-gradient(-90deg, var(--lighter-color), #fafafa, var(--lighter-color), #fafafa);
  background-size: 400%;
  animation: ${skeletonAnimation} 5s infinite ease-out;
  border-radius: ${({ borderRadius }) => borderRadius || '6px'};
`;

const Skeleton = ({ ...props }: SkeletonProps) => {
  return <SkeletonWrapper {...props} />;
};

export default Skeleton;
