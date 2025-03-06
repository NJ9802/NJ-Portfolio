import { Copy } from "lucide-react";
import React, { memo } from "react";
import ReactMarkdown from "react-markdown";

type MarkdownContentProps = {
  content: string;
};

const CodeBlock = ({
  language,
  value,
}: {
  language: string;
  value: string;
}) => {
  return (
    <div className="bg-[#1a2236] rounded-lg overflow-hidden my-4 border border-gray-800">
      <div className="flex items-center justify-between px-4 py-2 bg-[#0F1729]">
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-400">{language}</span>
        </div>
        <button
          className="text-gray-400 hover:text-white transition-colors"
          onClick={() => navigator.clipboard.writeText(value)}
        >
          <Copy className="w-4 h-4" />
        </button>
      </div>
      <div className="px-4 py-3">
        <pre className="text-sm overflow-x-auto text-gray-200">
          <code>{value}</code>
        </pre>
      </div>
    </div>
  );
};

const MarkdownContent = ({ content }: MarkdownContentProps) => {
  return (
    <ReactMarkdown
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <CodeBlock
              language={match[1]}
              value={String(children).replace(/\n$/, "")}
            />
          ) : (
            <code
              className="bg-[#1a2236] px-1.5 py-0.5 rounded text-gray-200"
              {...props}
            >
              {children}
            </code>
          );
        },
        ol({ children }) {
          return <ol className="list-decimal pl-6 space-y-2">{children}</ol>;
        },
        ul({ children }) {
          return <ul className="list-disc pl-6 space-y-2">{children}</ul>;
        },
        li({ children }) {
          return <li className="mb-1">{children}</li>;
        },
        p({ children }) {
          return <p className="mb-4 leading-relaxed">{children}</p>;
        },
        h1({ children }) {
          return <h1 className="text-2xl font-bold mb-4">{children}</h1>;
        },
        h2({ children }) {
          return <h2 className="text-xl font-bold mb-3">{children}</h2>;
        },
        h3({ children }) {
          return <h3 className="text-lg font-bold mb-2">{children}</h3>;
        },
        a({ href, children }) {
          return (
            <a
              href={href}
              className="text-blue-400 hover:text-blue-300 hover:underline transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default memo(MarkdownContent);
