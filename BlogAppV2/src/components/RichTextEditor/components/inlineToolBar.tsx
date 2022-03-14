import * as React from "react";
import { BLockStyleToolBar } from "./BlockStyleToolbar";
import { TextStyleToolBar } from "./textStyleToolBar";
import createInlineToolbarPlugin from "draft-js-inline-toolbar-plugin";
const inlineToolbarPlugin = createInlineToolbarPlugin();
const { InlineToolbar } = inlineToolbarPlugin;

export const InLineToolBarX = (props: any) => {
  return (
    <InlineToolbar>
      {(ex) => (
        <>
          <BLockStyleToolBar
            editorState={props.editorState}
            onToggle={props.toggleBlockType}
            b={props.onBoldClick}
            ex={ex}
          />
          <TextStyleToolBar
            editorState={props.editorState}
            onChange={props.onChange}
          />
        </>
      )}
    </InlineToolbar>
  );
};

{
  /* {
           (props) => {
      <BLockStyleToolBar
        editorState={props.editorState}
        onToggle={props.toggleBlockType}
        b={props.onBoldClick}
      />
      <TextStyleToolBar
        editorState={props.editorState}
        onChange={props.onChange}
      />
       }
    } */
}
