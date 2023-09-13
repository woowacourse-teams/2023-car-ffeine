type RowType = 'left' | 'right';
type ColumnType = 'top' | 'bottom';

export interface ToastPosition {
  row: RowType | 'center';
  column: ColumnType;
}

export type BorderRadiusDirectionType = 'all' | ColumnType | 'left';
export type AxisType = 'row' | 'column';

export type Color =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'warning'
  | 'error'
  | 'light'
  | 'disable'
  | 'dark';

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
