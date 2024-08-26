import { IPopOverProps } from "@/interfaces/popOverInterface";
import { Popover } from "antd";

const PopOverControl = ({
  children,
  title,
  content,
  placement = "bottom",
}: IPopOverProps) => {
  return (
    <Popover placement={placement} title={title} content={content}>
      {children}
    </Popover>
  );
};

export default PopOverControl;
