import * as React from "react";
import Button from "../../CustomButtons/Button";
export const HeaderPicker = (props: any) => {
  React.useEffect(() => {
    setTimeout(() => {
      window.addEventListener("click", onWindowClick);
    });
    return () => {
      window.removeEventListener("click", onWindowClick);
    };
  });

  const onWindowClick = () => props.onOverrideContent(undefined);

  const buttons = ["H1", "H2", "H3"];

  return (
    <div>
      {buttons.map((b, k) => {
        <Button key={k} />;
      })}
    </div>
  );
};
