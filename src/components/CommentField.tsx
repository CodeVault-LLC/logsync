import React, { useState } from "react";
import { Box, Typography, Avatar } from "@mui/material";
import { RichTextEditor } from "./Editor/Editor";
import { useCreateComment } from "../hooks/useComment";
import { CommentResponse } from "../types/comment";
import { EditorView } from "@tiptap/pm/view";
import { Editor } from "@tiptap/react";

interface CommentFieldProps {
  Username: string;
  LogID: string;
  Comments: CommentResponse[];
}

export const CommentField: React.FC<CommentFieldProps> = ({
  Username,
  LogID,
  Comments,
}) => {
  const [comment, setComment] = useState("");
  console.log(comment);

  const { mutate } = useCreateComment({
    Username,
    Comment: comment,
    LogId: LogID,
  });

  const onCommentSubmit = () => {
    mutate();
  };

  return (
    <Box sx={{ marginTop: 4 }}>
      <Typography variant="h6">{Comments?.length} Comments</Typography>
      <Box
        sx={{ display: "flex", flexDirection: "row", gap: 2, marginBottom: 2 }}
      >
        <Avatar>{Username[0]}</Avatar>
        <Box sx={{ width: "100%", height: "100%" }}>
          <RichTextEditor
            content={comment}
            setContent={setComment}
            submitComment={onCommentSubmit}
          />
        </Box>
      </Box>

      {Comments.map((comment, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 2,
            alignItems: "center",
          }}
        >
          <Avatar>{Username[0]}</Avatar>
          <div dangerouslySetInnerHTML={{ __html: comment.Comment }}></div>
        </Box>
      ))}
    </Box>
  );
};
