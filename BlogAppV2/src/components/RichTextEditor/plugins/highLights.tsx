import { RichUtils } from "draft-js";

export default () => {
  return {
    customStyleMap: {
      HIGHLIGHT: {
        background: "#ef5350",
      },
    },
    keyBindFn: (e: any) => {
      if (e.metakey && e.key === "h") return "highlight";
    },
    handelKeyCommand: (command: any, editorstate: any, setEditorState: any) => {
      if (command === "highlight") {
        setEditorState(RichUtils.toggleInlineStyle(editorstate, "HIGHLIGHT"));
      }
      return true;
    },
  };
};
