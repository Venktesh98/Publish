import { IModalWindowProps } from "@/interfaces/createPostInterface";
import { Modal } from "antd";
import React from "react";

const ModalWindow = ({
  title,
  isModalOpen,
  handleCancel,
  footerButtons,
  width,
  children,
}: IModalWindowProps) => {
  return (
    <div>
      <Modal
        title={title}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={footerButtons !== undefined && [footerButtons()]}
        width={width}
      >
        {children}
      </Modal>
    </div>
  );
};

export default ModalWindow;
