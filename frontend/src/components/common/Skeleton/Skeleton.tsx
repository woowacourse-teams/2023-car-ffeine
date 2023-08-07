import styled, { keyframes } from 'styled-components';

export interface SkeletonProps {
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
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '1rem'};
  background: linear-gradient(-90deg, #aaa, #f0f0f0, #aaa, #f0f0f0);
  background-size: 400%;
  animation: ${skeletonAnimation} 5s infinite ease-out;
  border-radius: ${({ borderRadius }) => borderRadius || '6px'};
`;

const Skeleton = ({ ...props }: SkeletonProps) => {
  return <SkeletonWrapper {...props} />;
};

export default Skeleton;
