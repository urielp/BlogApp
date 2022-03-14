import * as React from "react";

const Image = (props: any) => {
  if (!!props.src) {
    return <img src={props.src} />;
  }
  return null;
};

export const Media = (props: any) => {
  const entity = props.contentState.getEntity(props.block.getEntityAt(0));
  const { src } = entity.getData();
  const type = entity.getType();
  let media;

  if (type === "image") {
    media = <Image src={src} />;
  }
  return media;
};
