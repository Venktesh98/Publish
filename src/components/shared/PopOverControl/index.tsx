import { IPopOverProps } from "@/interfaces/popOverInterface";
import { Popover } from "antd";

const PopOverControl = ({ children, title, content }: IPopOverProps) => {
  return (
    <Popover placement="bottom" title={title} content={content}>
      {children}
    </Popover>
  );
};

export default PopOverControl;
