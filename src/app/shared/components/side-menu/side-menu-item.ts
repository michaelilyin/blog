export interface SideMenuItem {
  title: string;
  icon?: string;
  commands: any[];
}

export interface SideMenuGroup {
  title: string;
  icon?: string;
  items: SideMenuItem[];
}
