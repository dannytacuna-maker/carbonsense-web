import katex from "katex";

const MATH_PATTERN =
  /\\\[([\s\S]+?)\\\]|\\\(([\s\S]+?)\\\)|\$\$([\s\S]+?)\$\$|\$([^\$\n]+?)\$/g;

function collectMathTextNodes(root: HTMLElement) {
  const texts: Text[] = [];
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let node: Node | null;
  while ((node = walker.nextNode())) {
    const parent = node.parentElement;
    if (!parent) continue;
    if (parent.closest(".katex, script, style, noscript, .article-embed")) continue;
    const value = node.textContent ?? "";
    if (value.includes("\\(") || value.includes("\\[") || value.includes("$$") || value.includes("$")) {
      texts.push(node as Text);
    }
  }
  return texts;
}

function renderTexMatch(match: RegExpExecArray) {
  const display = Boolean(match[1] || match[3]);
  const tex = (match[1] ?? match[2] ?? match[3] ?? match[4] ?? "").trim();
  const span = document.createElement(display ? "div" : "span");
  if (display) span.className = "katex-block";
  try {
    katex.render(tex, span, {
      displayMode: display,
      throwOnError: false,
      strict: "ignore",
      trust: false,
    });
  } catch {
    span.textContent = match[0];
  }
  return span;
}

export function renderMathInElement(root: HTMLElement) {
  for (const textNode of collectMathTextNodes(root)) {
    const text = textNode.textContent ?? "";
    const frag = document.createDocumentFragment();
    let last = 0;
    let match: RegExpExecArray | null;
    MATH_PATTERN.lastIndex = 0;
    while ((match = MATH_PATTERN.exec(text)) !== null) {
      if (match.index > last) {
        frag.appendChild(document.createTextNode(text.slice(last, match.index)));
      }
      frag.appendChild(renderTexMatch(match));
      last = match.index + match[0].length;
    }
    if (last === 0) continue;
    if (last < text.length) {
      frag.appendChild(document.createTextNode(text.slice(last)));
    }
    textNode.parentNode?.replaceChild(frag, textNode);
  }
}
