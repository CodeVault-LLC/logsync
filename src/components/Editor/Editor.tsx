import {
  Editor,
  EditorContent,
  Extension,
  RawCommands,
  useEditor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import "./editor.css";
import {
  IconBold,
  IconCode,
  IconHeading,
  IconItalic,
  IconList,
  IconStrikethrough,
  IconUnderline,
} from "@tabler/icons-react";
import { ActionIcon, Box, Paper, Tooltip } from "@mantine/core";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    CustomKeymap: {
      submitCommentCommand: () => ReturnType;
    };
  }
}

const MenuBar = ({ editor }: { editor: Editor }) => {
  if (!editor) {
    return null;
  }

  const actions = [
    {
      name: "bold",
      icon: <IconBold />,
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: () => editor.isActive("bold"),
      tooltip: "Bold (Ctrl+B)",
    },
    {
      name: "italic",
      icon: <IconItalic />,
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: () => editor.isActive("italic"),
      tooltip: "Italic (Ctrl+I)",
    },
    {
      name: "underline",
      icon: <IconUnderline />,
      action: () => editor.chain().focus().toggleStrike().run(),
      isActive: () => editor.isActive("underline"),
      tooltip: "Underline (Ctrl+U)",
    },
    {
      name: "strike",
      icon: <IconStrikethrough />,
      action: () => editor.chain().focus().toggleStrike().run(),
      isActive: () => editor.isActive("strike"),
      tooltip: "Strikethrough (Ctrl+Shift+X)",
    },
    {
      name: "bulletList",
      icon: <IconList />,
      action: () => editor.chain().focus().toggleBulletList().run(),
      isActive: () => editor.isActive("bulletList"),
      tooltip: "Bullet List",
    },
    {
      name: "orderedList",
      icon: <IconList />,
      action: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: () => editor.isActive("orderedList"),
      tooltip: "Ordered List",
    },
    {
      name: "code",
      icon: <IconCode />,
      action: () => editor.chain().focus().toggleCodeBlock().run(),
      isActive: () => editor.isActive("codeBlock"),
      tooltip: "Code Block",
    },
    {
      name: "heading",
      icon: <IconHeading />,
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: () => editor.isActive("heading", { level: 1 }),
      tooltip: "Heading 1",
    },
  ];

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "row",
        gap: 1,
        padding: 1,
        borderBottom: "1px solid #ccc",
      }}
    >
      {actions.map((action) => (
        <Tooltip label={action.tooltip} key={action.name}>
          <ActionIcon
            onClick={action.action}
            color={action.isActive() ? "primary" : "default"}
            size="small"
          >
            {action.icon}
          </ActionIcon>
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
  const CustomKeymap = Extension.create({
    addCommands() {
      return {
        submitCommentCommand: () => submitComment(),
      } as Partial<RawCommands>;
    },
    addKeyboardShortcuts() {
      return {
        "Mod-Enter": () => this.editor.commands.submitCommentCommand(),
      };
    },
  });

  const editor = useEditor({
    extensions: [StarterKit, CustomKeymap],
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
    <Paper style={{ height: "100%", width: "100%" }}>
      <MenuBar editor={editor as Editor} />
      <Box style={{ paddingX: 1, height: "100%", width: "100%" }}>
        <EditorContent editor={editor} />
      </Box>
    </Paper>
  );
};

export default RichTextEditor;
