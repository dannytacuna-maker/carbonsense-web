// Mammoth migration placeholders → hosted Plotly pages
const EMBED_SRC: Record<string, { src: string; minHeight: number; title: string }> = {
  "es_dashboard_tabs.html": {
    src: "/assets/es_dashboard_tabs.html",
    minHeight: 720,
    title: "Spanish economy dashboard",
  },
  "scope1_center_2d_with_year_slider.html": {
    src: "/assets/scope1_center_2d_with_year_slider.html",
    minHeight: 720,
    title: "Scope 1 emissions by industry",
  },
  ES_SCC_DAMAGE_INTERACTIVE_GVA_XCAP: {
    src: "/assets/es_scc_damage_interactive_gva_xcap.html",
    minHeight: 780,
    title: "Social cost of carbon by industry",
  },
  "es_scc_damage_interactive_gva_xcap.html": {
    src: "/assets/es_scc_damage_interactive_gva_xcap.html",
    minHeight: 780,
    title: "Social cost of carbon by industry",
  },
};

function createEmbedFrame(key: string) {
  const embed = EMBED_SRC[key];
  if (!embed) return null;

  const wrap = document.createElement("div");
  wrap.className = "article-embed";
  wrap.dataset.embedKey = key;

  const iframe = document.createElement("iframe");
  iframe.src = embed.src;
  iframe.title = embed.title;
  iframe.loading = "lazy";
  iframe.setAttribute("scrolling", "no");
  iframe.style.width = "100%";
  iframe.style.height = `${embed.minHeight}px`;
  iframe.style.border = "0";
  iframe.style.borderRadius = "0.75rem";
  iframe.style.background = "#fff";
  wrap.appendChild(iframe);
  return wrap;
}

export function hydrateEmbedPlaceholders(root: HTMLElement) {
  root.querySelectorAll("p, div").forEach((el) => {
    if (el.querySelector("iframe, .article-embed")) return;
    const text = (el.textContent ?? "").trim();
    const match = text.match(/^\[([^\]]+)\]$/);
    if (!match) return;
    const frame = createEmbedFrame(match[1]);
    if (!frame) return;
    el.replaceWith(frame);
  });
}

export function bindEmbedResize(root: HTMLElement) {
  const onMessage = (event: MessageEvent) => {
    const data = event.data as { type?: string; height?: number } | null;
    if (!data || data.type !== "plot-size") return;
    const height = Number(data.height);
    if (!Number.isFinite(height) || height < 200) return;

    root.querySelectorAll<HTMLIFrameElement>(".article-embed iframe").forEach((iframe) => {
      if (iframe.contentWindow !== event.source) return;
      const next = Math.max(480, Math.min(1200, Math.round(height)));
      iframe.style.height = `${next}px`;
    });
  };

  window.addEventListener("message", onMessage);
  return () => window.removeEventListener("message", onMessage);
}
