import ReactMarkdown, {
  PluggableList,
  ReactMarkdownOptions,
} from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import React, { useMemo } from "react";
import { useComposedCssClasses } from "../hooks/useComposedCssClasses";

// The Remark and Rehype plugins to use in conjunction with ReactMarkdown.
const unifiedPlugins: { remark?: PluggableList; rehype: PluggableList } = {
  remark: [
    remarkGfm, //renders Github-Flavored Markdown
  ],
  rehype: [
    rehypeRaw, //to support HTML embedded in markdown
    rehypeSanitize, //to sanitize HTML content
  ],
};

/**
 * The CSS class interface for the Markdown component.
 *
 * @internal
 */
export interface MarkdownCssClasses {
  container?: string;
  link?: string;
}

const builtInCssClasses: MarkdownCssClasses = {
  link: "cursor-pointer",
};

interface MarkdownProps {
  /** Stringified markdown. */
  content: string;
  /** CSS classes for customizing the component styling. */
  customCssClasses?: MarkdownCssClasses;
  /** A callback which is called when a link is clicked. */
  onLinkClick?: (href?: string) => void;
}

/**
 * Renders Github-Flavored Markdown from the Knowledge Graph. This Markdown can include
 * arbitrary HTML. Any HTML will be sanitized according to Rehype's default Schema.
 *
 * @remarks
 * A link click will send a CHAT_LINK_CLICK analytics event
 *
 * @internal
 */
export function Markdown({
  content,
  customCssClasses,
  onLinkClick,
}: MarkdownProps) {
  const cssClasses = useComposedCssClasses(builtInCssClasses, customCssClasses);

  const components: ReactMarkdownOptions["components"] = useMemo(() => {
    const createClickHandlerFn = (href?: string) => () => {
      onLinkClick?.(href);
    };
    return {
      a: ({ node: _, children, ...props }) => {
        return (
          <a
            {...props}
            onClick={createClickHandlerFn(props.href)}
            rel="noopener noreferrer"
            className={cssClasses.link}
          >
            {children}
          </a>
        );
      },
    };
  }, [
    cssClasses,
    onLinkClick,
  ]);

  return (
    <ReactMarkdown
      className={cssClasses.container}
      children={content}
      remarkPlugins={unifiedPlugins.remark}
      rehypePlugins={unifiedPlugins.rehype}
      components={components}
    />
  );
}
