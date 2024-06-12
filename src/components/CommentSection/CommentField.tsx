import React, { useState } from "react";
import { RichTextEditor } from "../Editor/Editor";
import { useCreateComment } from "../../hooks/useComment";
import { CommentResponse } from "../../types/comment";
import "./CommentSection.css";
import { formatDate } from "../../lib/data";
import { ActionIcon, Avatar, Box, Group, Text, Tooltip } from "@mantine/core";
import {
  IconEdit,
  IconHttpDelete,
  IconMessageReply,
} from "@tabler/icons-react";

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
    <Box style={{ marginTop: 4 }}>
      <Text variant="h6">{Comments?.length} Comments</Text>
      <Box
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 2,
          marginBottom: 2,
        }}
      >
        <Avatar>{Username[0]}</Avatar>
        <Box style={{ width: "100%", height: "100%" }}>
          <RichTextEditor
            content={comment}
            setContent={setComment}
            submitComment={onCommentSubmit}
          />
        </Box>
      </Box>

      <Box
        style={{
          overflowY: "auto",
          maxHeight: 380,
        }}
      >
        {Comments.map((comment) => (
          <div>
            <Group>
              <Avatar alt={comment.username} radius="xl" />
              <div>
                <Text size="sm">{comment.username}</Text>
                <Text size="xs" c="dimmed">
                  {formatDate(comment.createdAt)}
                </Text>
              </div>
            </Group>
            <div
              className="comment-content"
              dangerouslySetInnerHTML={{ __html: comment.comment }}
            />
            {comment.username === Username && (
              <Box style={{ display: "flex", gap: 1, marginTop: 1 }}>
                <Tooltip label="Edit">
                  <ActionIcon
                    size="small"
                    onClick={() =>
                      onEditComment(comment.id.toString(), comment.comment)
                    }
                  >
                    <IconEdit fontSize="small" />
                  </ActionIcon>
                </Tooltip>
                <Tooltip label="Delete">
                  <ActionIcon
                    size="small"
                    onClick={() => onDeleteComment(comment.id.toString())}
                  >
                    <IconHttpDelete fontSize="small" />
                  </ActionIcon>
                </Tooltip>
                <Tooltip label="Reply">
                  <ActionIcon
                    size="small"
                    onClick={() => onReplyComment(comment.id)}
                  >
                    <IconMessageReply fontSize="small" />
                  </ActionIcon>
                </Tooltip>
              </Box>
            )}
          </div>
        ))}
      </Box>
    </Box>
  );
};
