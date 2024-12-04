"use client";

import * as React from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { cn } from "../lib/utils";
import Heading from "@tiptap/extension-heading";
import ToolBar from "./toolbar";

const RichTextEditor = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input"> & { onChange?: (value: string) => void }
>(({ className, ...props }, ref) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({}),
      Heading.configure({
        HTMLAttributes: {
          class: "text-xl font-bold",
          levels: [2],
        },
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "rounded-md bg-white min-h-[150px] border-input ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:cursor-not-allows disabled:opacity-50 p-2",
      },
    },
    onUpdate({ editor }) {
      if (props.onChange) {
        props.onChange(editor.getHTML());
      }
    },
  });

  return (
    <div
      className={cn(
        "border-dashed border-2 border-gray-300 rounded-md p-4",
        className
      )}
      ref={ref}
    >
      <ToolBar editor={editor} />
      <EditorContent
        placeholder={props.placeholder}
        editor={editor}
        className="prose min-h-[150px]"
      />
    </div>
  );
});
RichTextEditor.displayName = "RichTextEditor";

export { RichTextEditor };
