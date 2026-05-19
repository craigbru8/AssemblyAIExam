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
            <pre className="overflow-x-auto rounded-xl border p-4 text-sm">
              {children}
            </pre>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">{children}</table>
            </div>
          ),
          th: ({ children }) => (
            <th className="px-3 py-2 text-left text-xs font-semibold uppercase text-[var(--muted)]">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-3 py-2">{children}</td>
          ),
        }}
      >
        {markdown}
      </ReactMarkdown>
    </article>
  )
}
