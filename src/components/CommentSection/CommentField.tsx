import React, { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  Paper,
  Tooltip,
} from "@mui/material";
import { Edit, Delete, Reply } from "@mui/icons-material";
import { RichTextEditor } from "../Editor/Editor";
import { useCreateComment } from "../../hooks/useComment";
import { CommentResponse } from "../../types/comment";
import "./CommentSection.css";
import { formatDate } from "../../lib/data";

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
  const [, setEditingCommentId] = useState<string | null>(null);
  const [, setEditingCommentContent] = useState("");

  const { mutate } = useCreateComment({
    username: Username,
    comment,
    logId: LogID,
  });

  const onCommentSubmit = () => {
    mutate();
    setComment("");
  };

  const onEditComment = (commentId: string, content: string) => {
    setEditingCommentId(commentId);
    setEditingCommentContent(content);
  };

  const onDeleteComment = (commentId: string) => {
    console.log("Delete comment with id: ", commentId);
  };

  const onReplyComment = (commentId: string) => {
    console.log("Reply to comment with id: ", commentId);
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

      <Box
        sx={{
          overflowY: "auto",
          maxHeight: 380,
        }}
      >
        {Comments.map((comment) => (
          <Paper
            key={comment.id}
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
              alignItems: "flex-start",
              padding: 2,
              marginBottom: 2,
            }}
          >
            <Avatar>{comment.username[0]}</Avatar>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="caption" color="textSecondary">
                {formatDate(comment.createdAt)}
              </Typography>

              <Typography variant="body2" color="textSecondary">
                {comment.username}
              </Typography>
              <div
                className="comment-content"
                dangerouslySetInnerHTML={{ __html: comment.comment }}
              ></div>
              {comment.username === Username && (
                <Box sx={{ display: "flex", gap: 1, marginTop: 1 }}>
                  <Tooltip title="Edit">
                    <IconButton
                      size="small"
                      onClick={() =>
                        onEditComment(comment.id.toString(), comment.comment)
                      }
                    >
                      <Edit fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton
                      size="small"
                      onClick={() => onDeleteComment(comment.id.toString())}
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Reply">
                    <IconButton
                      size="small"
                      onClick={() => onReplyComment(comment.id)}
                    >
                      <Reply fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              )}
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};
