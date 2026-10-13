/**
 * One-off: convert CarbonSense DOCX essays to HTML fragments.
 * Run: node "CURSOR FILES/scripts/convert-docx.mjs"
 */
import fs from "node:fs/promises";
import path from "node:path";
import mammoth from "mammoth";

const BASE =
  "https://raw.githubusercontent.com/juandacu/CarbonSense/main/assets";

const MAP = [
  ["Hydrogen Essential Tool or Expensive Detour.docx", "hydrogen-essential-tool-or-expensive-detour"],
  ["How Much Carbon Am I Allowed to Emit.docx", "how-much-carbon-am-i-allowed-to-emit"],
  ["Developing Countries Will Feel the Heat of Climate Mortality.docx", "developing-countries-will-feel-the-heat-of-climate-mortality"],
  ["Skiing, EVs, and the Kaya Identity.docx", "skiing-evs-and-the-kaya-identity"],
  ["How the European Union Built the World’s Largest Carbon Market.docx", "how-the-european-union-built-the-worlds-largest-carbon-market"],
  ["Optimisation vs Stabilisation - Why Climate Policy Looks Different Across Regions.docx", "optimisation-vs-stabilisation"],
  ["Emissions by Scope_ An Input-Output Analysis_v2.docx", "the-spanish-economy-and-climate-change"],
  ["Carbon Budgets From Concept to Implementation.docx", "carbon-budgets-from-concept-to-implementation"],
  ["The Orinoco Belt Tightens.docx", "the-orinoco-belt-tightens"],
  ["Escaping Dirty Growth.docx", "escaping-dirty-growth"],
  ["A Short History of the Voluntary Carbon Market.docx", "a-short-history-of-the-voluntary-carbon-market"],
  ["Counting Megawatts, Missing People.docx", "counting-megawatts-missing-people"],
  ["Carbon Taxes A Libertarians Secret Love.docx", "carbon-taxes-a-libertarians-secret-love"],
  ["The Social Cost of Carbon, and Why it is No Longer Counted.docx", "the-social-cost-of-carbon-and-why-it-is-no-longer-counted"],
];

const outDir = path.resolve("src/content/articles");
await fs.mkdir(outDir, { recursive: true });

for (const [file, slug] of MAP) {
  const url = `${BASE}/${encodeURIComponent(file)}`;
  process.stdout.write(`Converting ${slug}… `);
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    const buf = Buffer.from(await res.arrayBuffer());
    const { value } = await mammoth.convertToHtml({ buffer: buf });
    await fs.writeFile(path.join(outDir, `${slug}.html`), value, "utf8");
    console.log("ok");
  } catch (err) {
    console.log("FAIL", err.message);
  }
}
