'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

type Props = {
  markdown: string
  className?: string
}

export default function MarkdownContent({ markdown, className = '' }: Props) {
  return (
    <article className={`markdown-content max-w-none text-[#cbd5e1] ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          pre: ({ children }) => (
            <pre className="overflow-x-auto rounded-lg border border-[#1f2937] bg-[var(--surface)] p-4 text-sm">
              {children}
            </pre>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-[#1f2937]">{children}</table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border border-[#1f2937] bg-[#111827] px-3 py-2 text-left text-xs uppercase tracking-wide text-[var(--muted)]">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-[#1f2937] px-3 py-2">{children}</td>
          ),
        }}
      >
        {markdown}
      </ReactMarkdown>
    </article>
  )
}
