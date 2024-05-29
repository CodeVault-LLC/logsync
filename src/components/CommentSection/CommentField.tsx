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
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editingCommentContent, setEditingCommentContent] = useState("");

  const { mutate } = useCreateComment({
    Username,
    Comment: comment,
    LogId: LogID,
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
    // Implement delete comment logic here
  };

  const onReplyComment = (commentId: string) => {
    // Implement reply comment logic here
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
            key={comment.ID}
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
              alignItems: "flex-start",
              padding: 2,
              marginBottom: 2,
            }}
          >
            <Avatar>{comment.Username[0]}</Avatar>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="caption" color="textSecondary">
                {formatDate(comment.CreatedAt)}
              </Typography>

              <Typography variant="body2" color="textSecondary">
                {comment.Username}
              </Typography>
              <div
                className="comment-content"
                dangerouslySetInnerHTML={{ __html: comment.Comment }}
              ></div>
              {comment.Username === Username && (
                <Box sx={{ display: "flex", gap: 1, marginTop: 1 }}>
                  <Tooltip title="Edit">
                    <IconButton
                      size="small"
                      onClick={() =>
                        onEditComment(comment.ID.toString(), comment.Comment)
                      }
                    >
                      <Edit fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton
                      size="small"
                      onClick={() => onDeleteComment(comment.ID.toString())}
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Reply">
                    <IconButton
                      size="small"
                      onClick={() => onReplyComment(comment.ID)}
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
