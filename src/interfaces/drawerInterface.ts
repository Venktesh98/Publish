import { DrawerProps } from "antd";

export interface IDrawerProps {
  drawerPlacement: DrawerProps["placement"];
  openDrawer: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}
