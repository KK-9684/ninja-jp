import React, { ReactNode } from "react";
import Image from "next/image";
import { BLOCKS, MARKS, Document } from "@contentful/rich-text-types";
import {
  documentToReactComponents,
  Options,
} from "@contentful/rich-text-react-renderer";

interface RichContentProps {
  document: Document;
}

export default function RichContent({ document }: RichContentProps) {
  if (!document) return null;

  const options: Options = {
    renderMark: {
      [MARKS.BOLD]: (text): ReactNode => <strong>{text}</strong>,
      [MARKS.ITALIC]: (text): ReactNode => <em>{text}</em>,
      [MARKS.UNDERLINE]: (text): ReactNode => <u>{text}</u>,
      [MARKS.CODE]: (text): ReactNode => <code>{text}</code>,
    },
    renderNode: {
      // iframeのレンダリング設定を追加
      [BLOCKS.EMBEDDED_ENTRY]: (node): ReactNode => {
        // iframeコンテンツタイプの場合の処理
        if (node.data.target.sys.contentType.sys.id === "iframe") {
          const { url, name } = node.data.target.fields;
          console.log(url);
          // セキュリティのために許可されたドメインかチェック
          const isAllowedDomain = (urlString: string) => {
            const allowedDomains = [
              "www.youtube.com",
              "youtube.com",
              "youtu.be",
              "player.vimeo.com",
            ];
            try {
              const domain = new URL(urlString).hostname;
              return allowedDomains.includes(domain);
            } catch {
              return false;
            }
          };
          console.log(isAllowedDomain(url));
          if (!isAllowedDomain(url)) {
            console.warn(`Blocked iframe from unauthorized domain: ${url}`);
            return null;
          }

          return (
            <div className="my-4 aspect-video">
              <iframe
                src={url}
                title={name}
                className="w-full h-full rounded-lg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          );
        }
        return null;
      },
      [BLOCKS.PARAGRAPH]: (node, children): ReactNode => (
        <p className="mb-4">{children}</p>
      ),
      [BLOCKS.HEADING_1]: (node, children): ReactNode => (
        <h1 className="text-2xl font-bold mb-4">{children}</h1>
      ),
      [BLOCKS.HEADING_2]: (node, children): ReactNode => (
        <h2 className="text-xl font-bold mb-3">{children}</h2>
      ),
      [BLOCKS.HEADING_3]: (node, children): ReactNode => (
        <h3 className="text-lg font-bold mb-2">{children}</h3>
      ),
      [BLOCKS.HEADING_4]: (node, children): ReactNode => (
        <h4 className="text-base font-bold mb-2">{children}</h4>
      ),
      [BLOCKS.HEADING_5]: (node, children): ReactNode => (
        <h5 className="text-sm font-bold mb-2">{children}</h5>
      ),
      [BLOCKS.HEADING_6]: (node, children): ReactNode => (
        <h6 className="text-xs font-bold mb-2">{children}</h6>
      ),
      [BLOCKS.EMBEDDED_ASSET]: (node): ReactNode => {
        return (
          <div className="my-4">
            <Image
              src={`https:${node.data.target.fields.file.url}`}
              height={node.data.target.fields.file.details.image.height}
              width={node.data.target.fields.file.details.image.width}
              alt={node.data.target.fields.title || ""}
              className="rounded-lg"
            />
          </div>
        );
      },
      [BLOCKS.UL_LIST]: (node, children): ReactNode => (
        <ul className="list-disc pl-6 mb-4">{children}</ul>
      ),
      [BLOCKS.OL_LIST]: (node, children): ReactNode => (
        <ol className="list-decimal pl-6 mb-4">{children}</ol>
      ),
      [BLOCKS.LIST_ITEM]: (node, children): ReactNode => (
        <li className="mb-2">{children}</li>
      ),
      [BLOCKS.QUOTE]: (node, children): ReactNode => (
        <blockquote className="border-l-4 border-gray-300 pl-4 my-4 italic">
          {children}
        </blockquote>
      ),
      [BLOCKS.HR]: (): ReactNode => <hr className="my-8 border-gray-300" />,
      [BLOCKS.TABLE]: (node, children): ReactNode => (
        <table className="w-full my-4 border-collapse">{children}</table>
      ),
      [BLOCKS.TABLE_ROW]: (node, children): ReactNode => <tr>{children}</tr>,
      [BLOCKS.TABLE_CELL]: (node, children): ReactNode => (
        <td className="border border-gray-300 p-2">{children}</td>
      ),
    },
  };

  return (
    <div className="rich-text-content">
      {documentToReactComponents(document, options)}
    </div>
  );
}
