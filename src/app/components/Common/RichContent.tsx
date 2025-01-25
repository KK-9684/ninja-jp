import Image from "next/image";
import { BLOCKS, Document } from "@contentful/rich-text-types";
import {
  documentToReactComponents,
  Options,
} from "@contentful/rich-text-react-renderer";

export default function RichContent(richTextDocument: Document) {
  const options: Options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        return (
          <Image
            src={`https:${node.data.target.fields.file.url}`}
            height={node.data.target.fields.file.details.image.height}
            width={node.data.target.fields.file.details.image.width}
            alt={node.data.target.fields.title}
          />
        );
      },
      [BLOCKS.OL_LIST]: (_node, children) => {
        return <ol>{children}</ol>;
      },
    },
  };
  return documentToReactComponents(richTextDocument, options);
}
