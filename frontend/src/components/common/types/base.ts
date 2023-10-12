import type { ComponentPropsWithoutRef, ElementType, PropsWithChildren } from 'react';

export interface BaseProps extends ComponentPropsWithoutRef<ElementType>, PropsWithChildren {
  /** 태그 변경 가능
   * @default div
   */
  tag?: ElementType;
}
