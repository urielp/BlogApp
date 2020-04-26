import * as React from "react";
import {
  EditorState,
  RichUtils,
  SelectionState,
  DefaultDraftBlockRenderMap,
  convertToRaw,
  convertFromRaw,
} from "draft-js";
import createHighLightPlugin from "./plugins/highLights";
import Editor from "draft-js-plugins-editor";
import addLinkPluginPlugin from "./plugins/addLinkPlugin";
import { Editor as ViewEditor } from "draft-js";
import {
  BLockStyleToolBar,
  getBlockStyle,
} from "./components/BlockStyleToolbar";
import * as Immutable from "immutable";
import QuoteBlock from "./components/blockOfQoutes";
import { myBlockRenderer } from "./plugins/customeBlock";

import Button from "../../components/CustomButtons/Button";
export const Ed = () => {
  const [editorState, setEditiorState] = React.useState(
    EditorState.createEmpty()
  );

  const [viewEditorState, setViewEditorState] = React.useState(
    EditorState.createEmpty()
  );
  const blockRenderMap = Immutable.Map({
    MyCustomBlock: {
      // element is used during paste or html conversion to auto match your component;
      // it is also retained as part of this.props.children and not stripped out
      element: "blockquote",
      wrapper: <QuoteBlock />,
    },
  });
  // keep support for other draft default block types and add our myCustomBlock type
  const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(
    blockRenderMap
  );

  //plugins
  const highlightPlugin = createHighLightPlugin();
  ///const [plugins, setPlugins] = React.useState([highlightPlugin]);
  let plugins: any[] = [];
  plugins.push(highlightPlugin);
  plugins.push(addLinkPluginPlugin);

  const onChange = (editorState: any) => {
    setEditiorState(editorState);
  };

  const handleKeyCommand = (command: any) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      onChange(newState);
      return "handled";
    }
    return "not-handled";
  };

  //italic style
  const onItalicClick = () => {
    onChange(RichUtils.toggleInlineStyle(editorState, "ITALIC"));
  };
  //under line
  const onUnderlineClick = () => {
    onChange(RichUtils.toggleInlineStyle(editorState, "UNDERLINE"));
  };
  //bold dtyke
  const onBoldClick = () => {
    onChange(RichUtils.toggleInlineStyle(editorState, "BOLD"));
  };
  //Quote dtyke
  const onQuteClick = () => {
    onChange(RichUtils.toggleInlineStyle(editorState, "QUOTE"));
  };
  //highloght
  const onHighlight = () => {
    onChange(RichUtils.toggleInlineStyle(editorState, "HIGHLIGHT"));
  };

  //blockStyle
  const toggleBlockType = (blockType: any) => {
    console.log(blockType);
    onChange(RichUtils.toggleBlockType(editorState, blockType));
  };

  //addlink
  const onAddLink = () => {
    const edState = editorState;
    const selection = edState.getSelection();
    const link = window.prompt("Paste the link -");
    if (!link) {
      onChange(RichUtils.toggleLink(edState, selection, null));
      return "handled";
    }
    const content = edState.getCurrentContent();
    const contentWithEntity = content.createEntity("LINK", "MUTABLE", {
      url: link,
    });
    const newEditorState = EditorState.push(
      edState,
      contentWithEntity,
      "apply-entity"
    );
    const entityKey = contentWithEntity.getLastCreatedEntityKey();
    onChange(RichUtils.toggleLink(newEditorState, selection, entityKey));
    return "handled";
  };

  //   function myBlockRenderer(contentBlock: any) {
  //     const type = contentBlock.getType();
  //     console.log(contentBlock);
  //     if (type === "blockquote") {
  //       return {
  //         component: QuoteBlock,
  //         editable: true,
  //         props: {
  //           text: contentBlock.text,
  //         },
  //       };
  //     }
  //   }
  React.useEffect(() => {
    console.log("viewEditor was saved");
  }, [viewEditorState]);
  const submitEditor = () => {
    let contentState = editorState.getCurrentContent();
    console.log(contentState);
    let note = { content: convertToRaw(contentState) };
    console.log(note);
    let content = EditorState.createWithContent(convertFromRaw(note.content));
    setViewEditorState(content);
  };

  // if (displayedNote == "new") {
  //   let note = { content: convertToRaw(contentState) };
  //   note["content"] = JSON.stringify(note.content);
  //   props.createNote(note.content);
  // } else {
  //   let note = { content: convertToRaw(contentState) };
  //   note["content"] = JSON.stringify(note.content);
  //   props.updateNote(displayedNote, note.content);
  // }

  return (
    <div className="editorContainer">
      <BLockStyleToolBar editorState={editorState} onToggle={toggleBlockType} />
      <button onClick={onAddLink}>Link</button>
      <button onClick={onUnderlineClick}>U</button>
      <button onClick={onHighlight}>H</button>
      <button onClick={onBoldClick}>
        <b>B</b>
      </button>
      <button onClick={onItalicClick}>
        <em>I</em>
      </button>
      <div className="editors">
        <Editor
          blockStyleFn={getBlockStyle}
          editorState={editorState}
          onChange={onChange}
          handleKeyCommand={handleKeyCommand}
          plugins={plugins}
          blockRenderMap={extendedBlockRenderMap}
          blockRendererFn={myBlockRenderer}
        />
      </div>
      <div>
        <Editor
          editorState={viewEditorState}
          onChange={() => {
            console.log("load", viewEditorState);
          }}
          readOnly={true}
        />
      </div>
      <Button onClick={submitEditor}> save</Button>
    </div>
  );
};
