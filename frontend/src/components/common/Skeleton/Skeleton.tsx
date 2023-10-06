import type { CSSProp } from 'styled-components';

import type { SpacingProps } from '@common/styles/spacing';

import { StyledSkeleton } from './Skeleton.style';

export interface SkeletonProps extends SpacingProps {
  width?: string;
  height?: string;
  borderRadius?: string;
  css?: CSSProp;
}

const Skeleton = ({ borderRadius, ...props }: SkeletonProps) => {
  return <StyledSkeleton $borderRadius={borderRadius} {...props} />;
};

export default Skeleton;
