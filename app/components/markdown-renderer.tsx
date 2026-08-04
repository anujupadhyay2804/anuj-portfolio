/**
 * MarkdownRenderer - REQUIRED for rendering AI responses
 *
 * AI models return markdown-formatted text. This component renders:
 * - Fenced code blocks with syntax highlighting and copy buttons
 * - Tables, lists (bullet and numbered), blockquotes
 * - Headings (h1-h4), bold, italic, strikethrough
 * - Links and images
 *
 * Usage:
 *   <MarkdownRenderer content={aiResponse} isStreaming={true} />
 *
 * IMPORTANT: Never use plain <p> tags for AI output - use this component!
 */
import { memo, useMemo, useState, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";
import { cn } from "~/lib/utils";

interface MarkdownRendererProps {
  content: string;
  className?: string;
  isStreaming?: boolean;
}

// Inline code component
function InlineCode({ children }: { children?: React.ReactNode }) {
  return (
    <code className="px-1.5 py-0.5 rounded-md bg-gray-100 font-mono text-[0.875em]">
      {children}
    </code>
  );
}

// Code block component with copy button
function CodeBlockPre({ children }: { children?: React.ReactNode }) {
  const [copied, setCopied] = useState(false);

  // Extract code content and language from the child code element
  let codeString = "";
  let language = "";

  if (
    children &&
    typeof children === "object" &&
    "props" in (children as React.ReactElement)
  ) {
    const codeElement = children as React.ReactElement<{
      children?: React.ReactNode;
      className?: string;
    }>;
    codeString = String(codeElement.props.children || "").replace(/\n$/, "");
    const match = /language-(\w+)/.exec(codeElement.props.className || "");
    language = match ? match[1] : "";
  }

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [codeString]);

  return (
    <div className="group/code relative my-4">
      {language && (
        <div className="absolute top-0 left-0 px-3 py-1 text-xs text-gray-500 font-mono bg-gray-100 rounded-tl-lg rounded-br-lg z-10">
          {language}
        </div>
      )}
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-1.5 rounded-md bg-gray-100 hover:bg-gray-200 opacity-0 group-hover/code:opacity-100 transition-opacity z-10"
        aria-label="Copy code"
      >
        {copied ? (
          <svg className="size-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="size-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        )}
      </button>
      <pre className="overflow-x-auto rounded-lg bg-gray-50 p-4 pt-8 text-sm font-mono border border-gray-200">
        <code>{codeString}</code>
      </pre>
    </div>
  );
}

// Custom components for react-markdown
const components: Components = {
  // Paragraphs
  p: ({ children }) => (
    <p className="mb-4 last:mb-0 leading-relaxed">{children}</p>
  ),

  // Headings
  h1: ({ children }) => (
    <h1 className="text-2xl font-bold mt-6 mb-4 first:mt-0">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-xl font-bold mt-6 mb-3 first:mt-0">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-lg font-semibold mt-5 mb-2 first:mt-0">{children}</h3>
  ),
  h4: ({ children }) => (
    <h4 className="text-base font-semibold mt-4 mb-2 first:mt-0">{children}</h4>
  ),

  // Inline code
  code: InlineCode as Components["code"],

  // Code blocks
  pre: CodeBlockPre as Components["pre"],

  // Links
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 underline underline-offset-2 hover:no-underline"
    >
      {children}
    </a>
  ),

  // Lists
  ul: ({ children }) => (
    <ul className="list-disc list-outside ml-6 mb-4 space-y-1">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-outside ml-6 mb-4 space-y-1">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,

  // Blockquotes
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-gray-300 pl-4 my-4 italic text-gray-600">
      {children}
    </blockquote>
  ),

  // Tables

[83 more lines in file. Use offset=151 to continue.]