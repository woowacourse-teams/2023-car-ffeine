import type { CSSProp } from 'styled-components';

import { StyledSkeleton } from '@common/Skeleton/Skeleton.style';
import type { SpacingProps } from '@common/systems';

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
