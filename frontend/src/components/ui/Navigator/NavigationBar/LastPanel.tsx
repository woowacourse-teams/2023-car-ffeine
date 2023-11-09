import { Box } from 'car-ffeine-design-system';

import type { ReactElement } from 'react';

interface Props {
  component: ReactElement | null;
}

const LastPanel = ({ component }: Props) => {
  return (
    <Box position="relative" css={{ zIndex: 99 }}>
      {component !== null && <>{component}</>}
    </Box>
  );
};

export default LastPanel;
