export interface DropdownItem {
  label: string;
  href: string;
  icon: string;
  desc: string;
}

export interface NavLink {
  label: string;
  href: string;
  hasDropdown: boolean;
  dropdownItems?: DropdownItem[];
}

export interface Location {
  name: string;
  code: string;
}
