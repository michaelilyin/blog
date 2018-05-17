export interface SideMenuItem {
  title: string;
  commands: any[];
}

export interface SideMenuGroup {
  title: string;
  items: SideMenuItem[];
}
