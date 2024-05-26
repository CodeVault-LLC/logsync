import { Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Box, IconButton, Tooltip, Paper } from "@mui/material";
import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  FormatListBulleted,
  FormatListNumbered,
  Code,
  Title,
  StrikethroughS,
} from "@mui/icons-material";
import "./editor.css";

const MenuBar = ({ editor }: { editor: Editor }) => {
  if (!editor) {
    return null;
  }

  const actions = [
    {
      name: "bold",
      icon: <FormatBold />,
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: () => editor.isActive("bold"),
      tooltip: "Bold (Ctrl+B)",
    },
    {
      name: "italic",
      icon: <FormatItalic />,
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: () => editor.isActive("italic"),
      tooltip: "Italic (Ctrl+I)",
    },
    {
      name: "underline",
      icon: <FormatUnderlined />,
      action: () => editor.chain().focus().toggleStrike().run(),
      isActive: () => editor.isActive("underline"),
      tooltip: "Underline (Ctrl+U)",
    },
    {
      name: "strike",
      icon: <StrikethroughS />,
      action: () => editor.chain().focus().toggleStrike().run(),
      isActive: () => editor.isActive("strike"),
      tooltip: "Strikethrough (Ctrl+Shift+X)",
    },
    {
      name: "bulletList",
      icon: <FormatListBulleted />,
      action: () => editor.chain().focus().toggleBulletList().run(),
      isActive: () => editor.isActive("bulletList"),
      tooltip: "Bullet List",
    },
    {
      name: "orderedList",
      icon: <FormatListNumbered />,
      action: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: () => editor.isActive("orderedList"),
      tooltip: "Ordered List",
    },
    {
      name: "code",
      icon: <Code />,
      action: () => editor.chain().focus().toggleCodeBlock().run(),
      isActive: () => editor.isActive("codeBlock"),
      tooltip: "Code Block",
    },
    {
      name: "heading",
      icon: <Title />,
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: () => editor.isActive("heading", { level: 1 }),
      tooltip: "Heading 1",
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: 1,
        padding: 1,
        borderBottom: "1px solid #ccc",
      }}
    >
      {actions.map((action) => (
        <Tooltip title={action.tooltip} key={action.name}>
          <IconButton
            onClick={action.action}
            color={action.isActive() ? "primary" : "default"}
            size="small"
          >
            {action.icon}
          </IconButton>
        </Tooltip>
      ))}
    </Box>
  );
};

export const RichTextEditor = ({
  content,
  setContent,
  submitComment,
}: {
  content: string;
  setContent: (content: string) => void;
  submitComment: () => void;
}) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    editorProps: {
      attributes: {
        class: "editor",
      },
    },

    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <Paper elevation={3} sx={{ borderRadius: "8px", overflow: "hidden" }}>
      <MenuBar editor={editor as Editor} />
      <Box sx={{ paddingX: 1, height: "100%", width: "100%" }}>
        <EditorContent
          editor={editor}
          onKeyDown={(event) => {
            if (event.key === "Enter" && event.ctrlKey) {
              event.preventDefault();
              submitComment();
            }
          }}
        />
      </Box>
    </Paper>
  );
};

export default RichTextEditor;
