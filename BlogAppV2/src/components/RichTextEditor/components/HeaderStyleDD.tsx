import * as React from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

export const HeaderStyleDropdown = (props: any) => {
  const onToggle = (event: any) => {
    let value = event.target.value;
    props.onToggle(value);
  };
  const { classes } = props;
  return (
    <>
      <InputLabel id="demo-simple-select-label">Header styles</InputLabel>
      <Select value={props.active} onChange={onToggle}>
        <MenuItem value="Header Levels" />
        {props.headerOptions.map((heading: any, key: any) => {
          return (
            <MenuItem value={heading.style} key={key}>
              {heading.label}
            </MenuItem>
          );
        })}
      </Select>
    </>
  );
};
