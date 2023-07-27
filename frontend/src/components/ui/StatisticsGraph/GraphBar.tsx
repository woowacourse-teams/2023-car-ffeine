import { styled } from 'styled-components';

interface GraphBarProps {
  congestionPercentage: number;
}

const GraphBar = ({ congestionPercentage }: GraphBarProps) => {
  return <Bar congestionPercentage={congestionPercentage} />;
};

const Bar = styled.li<GraphBarProps>`
  width: ${(props) => `calc(26rem * ${props.congestionPercentage} / 100)`};
  height: 1rem;

  border-radius: 1rem;
  background-color: #0064ff;
`;

export default GraphBar;
