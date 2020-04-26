import * as Immutable from "immutable";
import QuoteBlock from "../components/blockOfQoutes";
export function myBlockRenderer(contentBlock: any) {
  const type = contentBlock.getType();
  console.log(type);
  switch (type) {
    case "blockquote": {
      return {
        component: QuoteBlock,
        editable: true,
        props: {
          text: contentBlock.text,
        },
      };
    }
  }
  //   if (type === "blockquote") {
  //     return {
  //       component: QuoteBlock,
  //       editable: true,
  //       props: {
  //         text: contentBlock.text,
  //       },
  //     };
  //   }
}
