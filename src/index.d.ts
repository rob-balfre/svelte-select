import type { SvelteComponent } from "svelte";

export interface SelectProps {
  id?: string;
  container?: HTMLElement;
  input?: HTMLInputElement;
  Item?: any;
  Selection?: any;
  MultiSelection?: any;
  isMulti?: boolean;
  isDisabled?: boolean;
  isCreatable?: boolean;
  isFocused?: boolean;
  value?: any;
  filterText?: string;
  placeholder?: string;
  items?: any[];
  itemFilter?: (label: string, filterText: string, option: any) => boolean;
  groupBy?: (item: any) => any;
  groupFilter?: (groups: any) => any;
  isGroupHeaderSelectable?: boolean;
  getGroupHeaderLabel?: (option: any) => string;
  getOptionLabel?: (option: any, filterText: string) => string;
  optionIdentifier?: string;
  labelIdentifier?: string;
  loadOptions?: (filterText: string) => Promise<any[]>;
  hasError?: boolean;
  containerStyles?: string;
  getSelectionLabel?: (option: any) => string;
  createGroupHeaderItem?: (groupValue: any) => any;
  createItem?: (filterText: string) => any;
  isSearchable?: boolean;
  inputStyles?: string;
  isClearable?: boolean;
  isWaiting?: boolean;
  listPlacement?: "auto" | "top" | "bottom";
  listOpen?: boolean;
  list?: any;
  isVirtualList?: boolean;
  loadOptionsInterval?: number;
  noOptionsMessage?: string;
  hideEmptyState?: boolean;
  filteredItems?: any[];
  inputAttributes?: object;
  listAutoWidth?: boolean;
  itemHeight?: number;
  Icon?: any;
  iconProps?: object;
  showChevron?: boolean;
  showIndicator?: boolean;
  containerClasses?: string;
  indicatorSvg?: string;
  handleClear?: () => void;
  ariaValues?: (values: string) => string;
  ariaListOpen?: (label: string, count:number) => string;
  ariaFocused?: () => string;
}

declare class Select extends SvelteComponent {
  $$prop_def: SelectProps;
}

export default Select;
