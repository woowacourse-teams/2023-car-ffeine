import { styled } from 'styled-components';

const ZoomController = () => {
  return (
    <Container>
      <div>
        <Button>+</Button>
      </div>
      <div>
        <Button>-</Button>
      </div>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  bottom: 10px;
  right: 10px;
  z-index: 999;
  padding: 10px;
  background-color: white;
  box-shadow: 1px 1px 2px gray;
`;

const Button = styled.button`
  padding: 10px;
`;

export default ZoomController;
