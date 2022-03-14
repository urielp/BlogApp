import * as React from "react";
import Button from "../../CustomButtons/Button";
import { HeaderPicker } from "./HeaderPicker";
export const HeaderButton = (props: any) => {
  const onMouseDown = (event: any) => {
    event.preventDefault();
  };
  const onClick = () => {
    props.ex.onOverrideContent(HeaderPicker);
  };

  return (
    <div onMouseDown={onMouseDown}>
      <Button
        onClick={onClick}
        color="primary"
        aria-label="edit"
        justIcon={true}
        round={true}
      >
        H
      </Button>
    </div>
  );
};
