import mammoth from "mammoth";

const files = [
  ["andrew-wells", "Andrew Wells"],
  ["charles-nicholson", "Charles Nicholson"],
  ["euan-gilchrist", "Euan Gilchrist"],
  ["juan-acuna", "Juan"],
  ["lucien-vargas", "Lucien Vargas"],
  ["pau-orive", "Pau Orive"],
  ["vaibhav-jain", "Vaibhav Jain"],
];

const BASE = "https://raw.githubusercontent.com/juandacu/CarbonSense/main/authors";

for (const [file, label] of files) {
  const url = `${BASE}/${file}-bio.docx`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(String(res.status));
    const buf = Buffer.from(await res.arrayBuffer());
    const { value } = await mammoth.extractRawText({ buffer: buf });
    const text = value.replace(/\s+/g, " ").trim().slice(0, 500);
    console.log("\n===", label, "===");
    console.log(text);
  } catch (e) {
    console.log(label, "FAIL", e.message);
  }

  try {
    const htmlName = file === "juan-acuna" ? "Juan-Acuna.html" : `${file}.html`;
    const html = await (await fetch(`${BASE}/${htmlName}`)).text();
    const li = html.match(/https?:\/\/(?:www\.)?linkedin\.com\/in\/[A-Za-z0-9\-_%]+/i);
    const role = html.match(/<p class="[^"]*author[^"]*"[^>]*>([^<]+)/i)
      || html.match(/markets[^\n<]{0,80}|Climate[^\n<]{0,80}|Electricity[^\n<]{0,80}/);
    console.log("LI:", li?.[0] || "none");
  } catch {}
}
