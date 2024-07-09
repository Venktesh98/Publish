"use client";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./Editor.css";
import { IEditorProps } from "@/interfaces/createPostInterface";

const RichTextEditor = ({
  newPost,
  setNewPost,
  setValue,
  value,
}: IEditorProps) => {
  const handleOnChange = (content: string) => {
    setValue(content);
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    const extractedText = doc.body.textContent || "";

    setNewPost({
      ...newPost,
      description: extractedText,
    });
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ size: [] }],
      [{ font: [] }],
      [{ align: ["right", "center", "justify"] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "color",
    "image",
    "background",
    "align",
    "size",
    "font",
  ];

  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={handleOnChange}
      modules={modules}
      formats={formats}
    />
  );
};

export default RichTextEditor;
