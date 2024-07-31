import { BlogCtx } from "@/context/blogContext";
import { IFileDetails } from "@/interfaces/formInterface";
import { imageUpload } from "@/services/services";
import { message } from "antd";
import { UploadChangeParam } from "antd/es/upload";
import { useContext, useState } from "react";

export const useImageUpload = (name: string, route: string) => {
  const [fileList, setFileList] = useState<any>([]);
  const { setUploadProgress } = useContext(BlogCtx);

  const handleImageUpload = async (info: UploadChangeParam) => {
    let newFileList = [...info.fileList];
    setFileList(newFileList);

    if (info.file.status === "removed") {
      setUploadProgress(0);
      return;
    }

    if (info.file.status !== "uploading") {
      const formData = new FormData();
      newFileList.forEach((file: any) => {
        formData.append(`${name}`, file.originFileObj);
      });

      try {
        const response = await imageUpload(
          `${route}`,
          formData as unknown as IFileDetails,
          (percentCompleted: number) => {
            setUploadProgress(percentCompleted);
          }
        );
        message.success(response.message);
        setUploadProgress(0);
      } catch (error) {
        message.error("Upload failed");
      }
    }
  };

  return { handleImageUpload, fileList };
};
