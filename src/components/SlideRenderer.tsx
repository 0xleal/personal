import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface SlideRendererProps {
  content: string;
}

function SlideRenderer({ content }: SlideRendererProps) {
  return (
    <div className="slide-markdown">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Custom component renderers for better styling
          a: ({ node, ...props }) => (
            <a
              {...props}
              target={props.href?.startsWith("http") ? "_blank" : undefined}
              rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined}
            />
          ),
          // Ensure code blocks have proper styling
          code: ({ node, className, children, ...props }) => {
            const isInline = !className;
            return isInline ? (
              <code className="inline-code" {...props}>
                {children}
              </code>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

export default SlideRenderer;
