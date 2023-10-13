import { useContext, type PropsWithChildren } from 'react';

import type { FlexBasicLayout } from '@common/FlexBox/FlexBox';
import FlexItem from '@common/FlexItem';
import type { FlexItemProps } from '@common/FlexItem/FlexItem';

import { TabContext } from './Tab';

export interface ContentProps extends FlexItemProps {
  /** 탭 패널(내용)의 항목, 원하는 탭 항목과 일치시켜야 함 */
  index: number;
  /**
   * 탭 패널(내용)의 가로 위치 변경 가능
   * - 기본값이 center이므로, 내용은 Tab의 layout 속성에 영향 받지 않음
   * @default center
   * */
  alignSelf?: FlexBasicLayout | 'stretch';
}

const Content = ({
  children,
  index,
  alignSelf = 'center',
  ...attributes
}: PropsWithChildren<ContentProps>) => {
  const { id, activeTab } = useContext(TabContext);

  if (activeTab !== `menu-${index}`) return <></>;

  return (
    <FlexItem
      role="tabpanel"
      alignSelf={alignSelf}
      id={`${id}-panel-${index}`}
      tabIndex={0}
      {...attributes}
    >
      {children}
    </FlexItem>
  );
};

export default Content;
