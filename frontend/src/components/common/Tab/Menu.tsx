import styled from 'styled-components';

import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { useContext } from 'react';

import type { BaseProps } from '@common/types/base';

import { TabContext } from './Tab';
import { tabMenuStyle, tabMenuWithIconStyle } from './styles/menu.style';

export type IconPosition = 'top' | 'right' | 'bottom' | 'left';
export interface MenuProps extends ComponentPropsWithoutRef<'button'>, BaseProps {
  /** 탭 메뉴 이름 */
  label?: string;
  /** 탭 메뉴 아이콘 */
  icon?: ReactNode;
  /** 탭 메뉴 아이콘 위치, 아이콘이 있을 때만 동작
   * @default 'left'
   */
  iconPosition?: IconPosition;
  /** 탭 메뉴의 항목, 원하는 내용의 항목과 일치시켜야 함 */
  index: number;
  /** 탭 메뉴를 눌렀을 때 발생시킬 이벤트 */
  onClick?: () => void;
}

const Menu = ({ label, icon, index, iconPosition = 'left', onClick, ...attributes }: MenuProps) => {
  const { id, activeTab, setActiveTab } = useContext(TabContext);

  const handleSelectMenu = () => {
    setActiveTab(`menu-${index}`);
    onClick();
  };

  return (
    <MenuTab
      role="tab"
      id={`${id}-tab-${index}`}
      aria-controls={`${id}-panel-${index}`}
      aria-selected={activeTab === `menu-${index}` ? true : false}
      className={activeTab === `menu-${index}` ? 'active' : ''}
      title={label}
      icon={icon}
      iconPosition={iconPosition}
      {...attributes}
      onClick={handleSelectMenu}
    >
      {icon}
      {label}
    </MenuTab>
  );
};

const MenuTab = styled.button<Omit<MenuProps, 'index'>>`
  ${tabMenuStyle}

  ${({ icon, iconPosition }) => icon && tabMenuWithIconStyle(iconPosition)}
`;

export default Menu;
