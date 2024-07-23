import { IDrawerProps } from "@/interfaces/drawerInterface";
import { Drawer } from "antd";

const DrawerWindow = ({
  drawerPlacement,
  openDrawer,
  title,
  onClose,
  children,
}: IDrawerProps) => {
  return (
    <Drawer
      title={title}
      placement={drawerPlacement}
      onClose={onClose}
      open={openDrawer}
      key={drawerPlacement}
      width={550}
    >
      {children}
    </Drawer>
  );
};

export default DrawerWindow;
