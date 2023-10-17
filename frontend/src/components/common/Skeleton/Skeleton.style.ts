import styled, { keyframes } from 'styled-components';

import type { SkeletonProps } from '@common/Skeleton/Skeleton';
import { spacing } from '@common/styles/spacing';

export const skeletonAnimation = keyframes`
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

export type StyledSkeletonType = Omit<SkeletonProps, 'borderRadius'> & {
  $borderRadius: string;
};

export const StyledSkeleton = styled.div<StyledSkeletonType>`
  ${spacing};

  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '1rem'};
  background: linear-gradient(-90deg, #c6cbd9, #fafafa, #c6cbd9, #fafafa);
  background-size: 400%;
  animation: ${skeletonAnimation} 5s infinite ease-out;
  border-radius: ${({ $borderRadius }) => $borderRadius || '6px'};

  ${({ css }) => css}
`;
