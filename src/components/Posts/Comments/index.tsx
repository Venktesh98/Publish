import ModalWindow from "@/components/shared/Modal";
import { BlogCtx } from "@/context/blogContext";
import {
  ICommentProps,
  ICommentsPayload,
} from "@/interfaces/commentsInterface";
import { addNewComment, getAllPosts } from "@/services/services";
import { Button } from "antd";
import { useContext, useState } from "react";
import RichTextEditor from "../Editor";

const Comments = ({
  setIsCommentModalOpen,
  isCommentModalOpen,
  postId,
}: ICommentProps) => {
  const [comments, setComments] = useState<ICommentsPayload>({
    description: " ",
  });
  const [value, setValue] = useState<string>("");

  const { setAllPosts } = useContext(BlogCtx);

  const handleCancel = () => {
    setIsCommentModalOpen(false);
  };

  const handleAddNewComment = async () => {
    const payload = {
      description: comments.description,
      descriptionHtml: value,
    };

    const data = await addNewComment(postId, payload);
    if (data.status === 200) {
      const fetchedPosts = await getAllPosts(0);
      setAllPosts(fetchedPosts.data);
      handleCancel();
    }
  };

  const footerButtons = () => {
    return (
      <Button key="submit" type="primary" onClick={handleAddNewComment}>
        Add Comment
      </Button>
    );
  };

  return (
    <ModalWindow
      title="Add Comment"
      isModalOpen={isCommentModalOpen}
      handleCancel={handleCancel}
      footerButtons={footerButtons}
      width={650}
    >
      <div>
        <RichTextEditor
          setNewPost={setComments}
          newPost={comments}
          setValue={setValue}
          value={value}
        />
      </div>
    </ModalWindow>
  );
};

export default Comments;
