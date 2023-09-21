import type { CSSProp } from 'styled-components';
import styled, { keyframes } from 'styled-components';

import type { SpacingProps } from '@common/systems';
import { spacing } from '@common/systems';

export interface SkeletonProps extends SpacingProps {
  width?: string;
  height?: string;
  borderRadius?: string;
  css?: CSSProp;
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

const SkeletonWrapper = styled.div<{ $style: SkeletonProps }>`
  ${spacing};

  width: ${({ $style }) => $style.width || '100%'};
  height: ${({ $style }) => $style.height || '1rem'};
  background: linear-gradient(-90deg, var(--lighter-color), #fafafa, var(--lighter-color), #fafafa);
  background-size: 400%;
  animation: ${skeletonAnimation} 5s infinite ease-out;
  border-radius: ${({ $style }) => $style.borderRadius || '6px'};

  ${({ $style }) => $style.css}
`;

const Skeleton = ({ ...props }: SkeletonProps) => {
  return <SkeletonWrapper $style={{ ...props }} />;
};

export default Skeleton;
