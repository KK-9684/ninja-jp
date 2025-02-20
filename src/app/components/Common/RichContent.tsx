import React, { ReactNode } from "react";
import Image from "next/image";
import {
  BLOCKS,
  MARKS,
  Document,
  Block,
  Inline,
  Text,
} from "@contentful/rich-text-types";
import {
  documentToReactComponents,
  Options,
} from "@contentful/rich-text-react-renderer";
import { NodeRenderer } from "@contentful/rich-text-react-renderer";
import convertEmbedUrl from "./convertEmbedUrl";
interface RichContentProps {
  document: Document;
}

interface TableCell {
  content: (Block | Inline | Text)[];
  nodeType: BLOCKS.TABLE_CELL;
  data: Record<string, unknown>;
}

interface TableRow {
  content: TableCell[];
  nodeType: BLOCKS.TABLE_ROW;
  data: Record<string, unknown>;
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
      [BLOCKS.EMBEDDED_ENTRY]: (node): ReactNode => {
        if (node.data.target.sys.contentType.sys.id === "iframe") {
          const { url, name } = node.data.target.fields;

          // セキュリティのために許可されたドメインかチェック
          const isAllowedDomain = (urlString: string) => {
            const allowedDomains = [
              "www.youtube.com",
              "youtube.com",
              "youtu.be",
              "player.vimeo.com",
              "www.google.com",
              "google.com",
              "maps.google.com",
            ];
            try {
              const domain = new URL(urlString).hostname;
              return allowedDomains.some((allowed) => domain.includes(allowed));
            } catch {
              return false;
            }
          };

          if (!isAllowedDomain(url)) {
            console.warn(`Blocked iframe from unauthorized domain: ${url}`);
            return null;
          }

          const embedUrl = convertEmbedUrl(url);

          return (
            <div className="my-4 aspect-video">
              <iframe
                src={embedUrl}
                title={name}
                className="w-full h-full rounded-lg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
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
      [BLOCKS.TABLE]: ((node: Block | Inline) => {
        // 型ガードを追加
        if (node.nodeType !== BLOCKS.TABLE) return null;

        const rows = node.content as TableRow[];

        const hasHeader =
          rows.length > 0 &&
          rows[0].content.some((cell: TableCell) =>
            cell.content.some(
              (item) =>
                "nodeType" in item &&
                (item.nodeType === "heading-1" ||
                  item.nodeType === "heading-2" ||
                  item.nodeType === "heading-3" ||
                  item.nodeType === "heading-4" ||
                  item.nodeType === "heading-5" ||
                  item.nodeType === "heading-6")
            )
          );

        return (
          <table className="w-full my-4 border-collapse">
            {hasHeader && (
              <thead>
                <tr>
                  {rows[0].content.map((cell, j) => (
                    <th
                      key={j}
                      className="border border-gray-300 p-2 bg-gray-50"
                    >
                      {documentToReactComponents({
                        nodeType: BLOCKS.DOCUMENT,
                        data: {},
                        content: cell.content,
                      } as Document)}
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {(hasHeader ? rows.slice(1) : rows).map((row, i) => (
                <tr key={i}>
                  {row.content.map((cell, j) => {
                    const cellContent = cell.content.map((node) =>
                      documentToReactComponents(
                        {
                          nodeType: BLOCKS.DOCUMENT,
                          data: {},
                          content: [node],
                        } as Document,
                        {
                          ...options,
                          renderNode: {
                            ...options.renderNode,
                            [BLOCKS.PARAGRAPH]: (_node, children) => children,
                            [BLOCKS.TABLE_CELL]: (_node, children) => children,
                          },
                        }
                      )
                    );

                    return (
                      <td key={j} className="border border-gray-300 p-2">
                        {cellContent}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        );
      }) as NodeRenderer,
    },
  };

  return (
    <div className="rich-text-content">
      {documentToReactComponents(document, options)}
    </div>
  );
}
