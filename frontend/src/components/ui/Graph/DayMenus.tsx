import FlexBox from '@common/FlexBox';

import type { GraphProps } from '.';

export interface DayMenusProps extends Omit<GraphProps, 'align'> {
  menus: string[];
  renderMenuSelectButton: (menu: string) => JSX.Element;
}

const DayMenus = ({ menus, renderMenuSelectButton }: DayMenusProps) => {
  return <FlexBox>{menus.map((menu) => renderMenuSelectButton(menu))}</FlexBox>;
};

export default DayMenus;
