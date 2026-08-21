"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/** 用 react-markdown 渲染正文，样式对齐工业风排版 */
export function Markdown({ children }: { children: string }) {
  return (
    <div className="prose-fz text-sm leading-relaxed text-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2: (props) => (
            <h2 className="mt-8 mb-3 flex items-center gap-2 text-md font-semibold text-content">
              <span className="h-4 w-0.5 bg-accent" />
              {props.children}
            </h2>
          ),
          h3: (props) => (
            <h3 className="mt-6 mb-2 text-base font-semibold text-content">
              {props.children}
            </h3>
          ),
          p: (props) => <p className="my-3 text-content-secondary">{props.children}</p>,
          ul: (props) => (
            <ul className="my-3 list-none space-y-1 pl-1">{props.children}</ul>
          ),
          ol: (props) => (
            <ol className="my-3 list-decimal space-y-1 pl-5">{props.children}</ol>
          ),
          li: (props) => (
            <li className="relative pl-4 text-content-secondary">{props.children}</li>
          ),
          a: (props) => (
            <a
              className="text-link underline decoration-link/40 underline-offset-2 hover:decoration-accent"
              {...props}
            />
          ),
          strong: (props) => (
            <strong className="font-semibold text-content">{props.children}</strong>
          ),
          code: (props) => (
            <code className="bg-muted px-1.5 py-0.5 font-mono text-xs text-content">
              {props.children}
            </code>
          ),
          pre: (props) => (
            <pre className="my-4 overflow-x-auto border border-line bg-base p-4 font-mono text-xs text-content-secondary">
              {props.children}
            </pre>
          ),
          blockquote: (props) => (
            <blockquote className="my-4 border-l-2 border-accent bg-muted px-4 py-2 text-content-secondary">
              {props.children}
            </blockquote>
          ),
          table: (props) => (
            <div className="my-4 overflow-x-auto border border-line">
              <table className="w-full border-collapse text-sm">{props.children}</table>
            </div>
          ),
          th: (props) => (
            <th className="border-b border-line bg-muted px-4 py-2 text-left text-xs font-semibold tracking-wide text-content-secondary">
              {props.children}
            </th>
          ),
          td: (props) => (
            <td className="border-b border-line px-4 py-2 text-content-secondary">
              {props.children}
            </td>
          ),
          hr: () => <hr className="my-6 border-line" />,
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}