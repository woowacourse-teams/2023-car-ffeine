import { XMarkIcon } from '@heroicons/react/24/outline';
import styled, { css } from 'styled-components';

import { modalActions } from '@stores/layout/modalStore';

import Box from '@common/Box';
import Button from '@common/Button';
import FlexBox from '@common/FlexBox';
import List from '@common/List';
import ListItem from '@common/ListItem';
import Text from '@common/Text';

import Bar from '@ui/StatisticsGraph/Graph/Bar';

import { MOBILE_BREAKPOINT } from '@constants';
import { NO_RATIO } from '@constants/congestion';

const Help = () => {
  return (
    <Box width="fit-content" px={7} pt={7} pb={13} css={modalContainer}>
      <Button aria-label="닫기" css={closeButton} onClick={() => modalActions.closeModal()}>
        <XMarkIcon width={24} />
      </Button>
      <Text variant="subtitle" mb={4}>
        좌측 숫자는&nbsp;
        <Text tag="span" weight="bold">
          시간
        </Text>
        , 막대 그래프는&nbsp;
        <Text tag="span" weight="bold">
          혼잡도
        </Text>
        (%)를 나타냅니다.
      </Text>
      <Text mb={2}>
        해당 시간대에 사용중인 충전기가
        <br /> 몇 퍼센트인지 예측하여 혼잡도를 표시합니다.
      </Text>
      <Text variant="caption" fontSize={1.3} mb={5}>
        예시) 2시에 보유 충전기의 20%(총 10대 중 2대)가 사용중일 확률이 높습니다.
      </Text>
      <FlexBox width={34} px={2} direction="column" gap={2} css={statisticsContainer}>
        <table>
          <TableRow>
            <td>
              <Bar ratio={0} hour="01" align="column" />
            </td>
            <TableData>0%</TableData>
          </TableRow>
          <TableRow>
            <td>
              <Bar ratio={0.2} hour="02" align="column" />
            </td>
            <TableData>20%</TableData>
          </TableRow>
          <TableRow>
            <td>
              <Bar ratio={0.4} hour="03" align="column" />
            </td>
            <TableData>40%</TableData>
          </TableRow>
          <TableRow>
            <td>
              <Bar ratio={0.6} hour="04" align="column" />
            </td>
            <TableData>60%</TableData>
          </TableRow>
          <TableRow>
            <td>
              <Bar ratio={0.8} hour="05" align="column" />
            </td>
            <TableData>80%</TableData>
          </TableRow>
          <TableRow>
            <td>
              <Bar ratio={1} hour="06" align="column" />
            </td>
            <TableData>100%</TableData>
          </TableRow>
          <TableRow>
            <td>
              <Bar ratio={NO_RATIO} hour="07" align="column" />
            </td>
            <TableData>정보 없음</TableData>
          </TableRow>
        </table>
      </FlexBox>
      <List fontSize={1.4} p={0} pt={6}>
        <ListItem px={0} py={0} pb={2}>
          0~19%
          <Text tag="span" variant="label" weight="bold" ml={2}>
            아주 여유
          </Text>
        </ListItem>
        <ListItem px={0} py={0} pb={2}>
          20~39%
          <Text tag="span" variant="label" weight="bold" ml={2}>
            여유
          </Text>
        </ListItem>
        <ListItem px={0} py={0} pb={2}>
          40~59%
          <Text tag="span" variant="label" weight="bold" ml={2}>
            보통
          </Text>
        </ListItem>
        <ListItem px={0} py={0} pb={2}>
          60~79%
          <Text tag="span" variant="label" weight="bold" ml={2}>
            혼잡
          </Text>
        </ListItem>
        <ListItem px={0} py={0}>
          80~100%
          <Text tag="span" variant="label" weight="bold" ml={2}>
            매우 혼잡
          </Text>
        </ListItem>
      </List>
    </Box>
  );
};

const modalContainer = css`
  line-height: 1.4;

  @media screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    width: 100%;
    margin: 0 auto;
  }
`;

const closeButton = css`
  display: block;
  margin: -1rem -1rem 1rem auto;
`;

const statisticsContainer = css`
  @media screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    width: 100%;
  }
`;

const TableRow = styled.tr``;

const TableData = styled.td`
  width: 7rem;
  padding-left: 0.8rem;
`;

export default Help;
