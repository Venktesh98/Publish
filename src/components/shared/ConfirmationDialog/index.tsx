import { IPopConfirmProps } from "@/interfaces/postsInterface";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Popconfirm } from "antd";
import React from "react";

const ConfirmBox = ({
  title,
  description,
  handleConfirm,
  handleConfirmCancel,
  children,
}: IPopConfirmProps) => {
  return (
    <Popconfirm
      title={title}
      description={description}
      onConfirm={handleConfirm}
      onCancel={handleConfirmCancel}
      icon={<QuestionCircleOutlined style={{ color: "red" }} />}
      okText="Delete"
      cancelText="Cancel"
    >
      {children}
    </Popconfirm>
  );
};

export default ConfirmBox;
