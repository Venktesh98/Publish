import React from "react";
import { IImageProps } from "../../../interfaces/imagePropsInterface";
import Image from "next/image";

const ImageControl = (props: IImageProps) => {
  return (
    <div>
      <Image
        {...props}
        style={{
          ...(props.photo && !props.isCircle
            ? { border: "1px solid black" }
            : props.photo && props.isCircle
            ? { borderRadius: "50px" }
            : { display: "none" }),
        }}
      />
    </div>
  );
};

export default ImageControl;
