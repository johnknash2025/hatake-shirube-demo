// Demo UI: hash routes, rendered from window.DEMO. No fetch, no storage, no network.
(() => {
  const D = window.DEMO;
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const tone = { ok: ["ok", "良好"], warn: ["warn", "要確認"], bad: ["bad", "要対応"] };
  const pill = h => `<span class="pill ${tone[h][0]}">${tone[h][1]}</span>`;
  const yen = n => "¥" + n.toLocaleString("ja-JP");

  // Simple drawn plants instead of camera photos (the real app uses field cameras).
  const plant = (kind, sick) => {
    const leaf = sick ? "#9fb46a" : "#4f9a5e", dot = sick ? `<g fill="#f3f0dc">${[[62,70],[84,58],[96,80],[70,92]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="2.2"/>`).join("")}</g>` : "";
    const fruit = { tomato: `<circle cx="66" cy="104" r="9" fill="#d9472b"/><circle cx="92" cy="110" r="8" fill="#e0652f"/>`,
      eggplant: `<ellipse cx="78" cy="112" rx="7" ry="14" fill="#5b2a6e"/>`,
      radish: `<rect x="70" y="112" width="18" height="30" rx="9" fill="#f4f1ea" stroke="#d6d0c4"/>` }[kind];
    return `<svg viewBox="0 0 160 160" width="160" role="img" aria-label="${kind}"><rect width="160" height="160" rx="12" fill="#cfe3c4"/><rect y="118" width="160" height="42" fill="#8a6a48"/>
      <path d="M80 140 V60" stroke="#3f6b3a" stroke-width="4"/>
      <g fill="${leaf}"><ellipse cx="62" cy="74" rx="22" ry="11" transform="rotate(-25 62 74)"/><ellipse cx="98" cy="66" rx="22" ry="11" transform="rotate(25 98 66)"/>
      <ellipse cx="66" cy="96" rx="20" ry="10" transform="rotate(-15 66 96)"/><ellipse cx="96" cy="90" rx="20" ry="10" transform="rotate(20 96 90)"/><ellipse cx="80" cy="52" rx="10" ry="16"/></g>${dot}${fruit}</svg>`;
  };

  // Schematic field map: abstract blocks, not a real layout.
  const map = () => {
    const blocks = [["A 区画（南）", 20, 150, 300, 110, "ok"], ["B 区画（東）", 340, 20, 200, 240, "warn"], ["C 区画（北）", 20, 20, 300, 110, "ok"], ["果樹エリア", 560, 20, 120, 240, "ok"]];
    const fill = { ok: "#cfe3c4", warn: "#f3e2a6" };
    return `<svg class="map" viewBox="0 0 700 280" role="img" aria-label="区画の模式図"><rect width="700" height="280" rx="12" fill="#e9e2d0"/>
      ${blocks.map(([n, x, y, w, h, s]) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="${fill[s]}" stroke="#7a8f6c"/>` +
        Array.from({ length: Math.floor(w / 50) }, (_, i) => `<line x1="${x + 25 + i * 50}" y1="${y + 30}" x2="${x + 25 + i * 50}" y2="${y + h - 10}" stroke="#8a6a48" stroke-dasharray="4 5"/>`).join("") +
        `<text x="${x + 10}" y="${y + 20}">${n}</text>`).join("")}</svg>`;
  };

  const chart = () => {
    const m = D.market, all = [...m.actual, ...m.forecast], lo = 380, hi = 640, W = 640, H = 240, px = i => 40 + i * (W - 60) / (all.length - 1), py = v => H - 30 - (v - lo) / (hi - lo) * (H - 50);
    const line = (vals, off) => vals.map((v, i) => `${i ? "L" : "M"}${px(i + off).toFixed(1)} ${py(v).toFixed(1)}`).join(" ");
    const n = m.actual.length;
    return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="価格の見通し">
      ${[400, 500, 600].map(v => `<line x1="40" x2="${W - 20}" y1="${py(v)}" y2="${py(v)}" stroke="var(--line)"/><text x="4" y="${py(v) + 4}" font-size="11" fill="var(--muted)">${v}</text>`).join("")}
      <path d="${line(m.actual, 0)}" fill="none" stroke="var(--green)" stroke-width="3"/>
      <path d="${line([m.actual[n - 1], ...m.forecast], n - 1)}" fill="none" stroke="var(--accent)" stroke-width="3" stroke-dasharray="6 5"/>
      ${m.weeks.map((w, i) => i % 2 ? "" : `<text x="${px(i) - 12}" y="${H - 8}" font-size="11" fill="var(--muted)">${w}</text>`).join("")}</svg>
      <p class="muted">実線：実績（架空）　破線：見通し</p>`;
  };

  const pages = {
    home: ["🏠", "ホーム", () => `<h1>おはようございます</h1><p class="lead">${esc(D.farm.name)}の今日のようす</p>
      <div class="grid">
        <div class="card"><div class="muted">区画</div><div class="stat">${D.fields.length}</div></div>
        <div class="card"><div class="muted">今朝のカメラ診断</div><div class="stat">${D.diagnosis.length} 枚</div><div class="muted">要確認 ${D.diagnosis.filter(d => d.verdict !== "ok").length}</div></div>
        <div class="card"><div class="muted">今週の予定</div><div class="stat">${D.calendar.slice(0, 2).length}</div></div>
        <div class="card"><div class="muted">トマト相場（来週見通し）</div><div class="stat">${D.market.forecast[0]}<small style="font-size:14px"> 円/kg</small></div></div>
      </div>
      <h2>気になるところ</h2>${D.diagnosis.filter(d => d.verdict !== "ok").map(d => `<div class="card">${pill(d.verdict)} <b>${esc(d.field)}</b> — ${esc(d.label)}<div class="muted">${esc(d.detail)}</div></div>`).join("")}
      <h2>次の作業</h2><ul class="list">${D.calendar.slice(0, 3).map(c => `<li><span class="date">${c.date}</span>${esc(c.text)}</li>`).join("")}</ul>`],
    fields: ["🗺️", "畑と区画", () => `<h1>畑と区画</h1><p class="lead">模式図です（実在の場所・配置ではありません）</p>${map()}
      <div class="grid" style="margin-top:14px">${D.fields.map(f => `<div class="card"><b>${esc(f.name)}</b> ${pill(f.health)}<div>${esc(f.crop)}・${esc(f.stage)}${f.beds ? `・畝 ${f.beds}` : ""}</div><div class="muted">${esc(f.note)}</div></div>`).join("")}</div>`],
    diagnosis: ["📷", "カメラ診断", () => `<h1>カメラ診断</h1><p class="lead">毎朝の写真をローカル AI が読み、気になる株を知らせます（デモはイラスト表示）</p>
      ${D.diagnosis.map(d => `<div class="card diag" style="margin-bottom:12px">${plant(d.plant, d.verdict !== "ok")}<div><b>${esc(d.field)}</b> <span class="muted">今朝 ${d.time}</span><div>${pill(d.verdict)} ${esc(d.label)}</div><p class="muted">${esc(d.detail)}</p></div></div>`).join("")}`],
    records: ["📒", "栽培記録", () => `<h1>栽培記録</h1><p class="lead">作業・観察・収穫の記録</p><table><thead><tr><th>日付</th><th>区画</th><th>種類</th><th>内容</th></tr></thead><tbody>
      ${D.records.map(r => `<tr><td class="date">${r.date}</td><td>${esc(r.field)}</td><td>${esc(r.kind)}</td><td>${esc(r.text)}</td></tr>`).join("")}</tbody></table>`],
    calendar: ["📅", "カレンダー", () => `<h1>作業カレンダー</h1><p class="lead">記録と作付けから組んだ予定</p><ul class="list card">${D.calendar.map(c => `<li><span class="date">${c.date}</span>${esc(c.text)}</li>`).join("")}</ul>`],
    market: ["📈", "相場の見通し", () => `<h1>相場の見通し：${esc(D.market.crop)}</h1><p class="lead">出荷の時期を決める目安（数値は架空）</p><div class="card">${chart()}</div>`],
    expenses: ["🧾", "経費", () => `<h1>経費</h1><p class="lead">レシートを読み取って記帳（デモは入力済みの架空データ）</p><table><thead><tr><th>日付</th><th>品目</th><th>金額</th></tr></thead><tbody>
      ${D.expenses.map(e => `<tr><td class="date">${e.date}</td><td>${esc(e.item)}</td><td>${yen(e.yen)}</td></tr>`).join("")}
      <tr><th colspan="2">合計</th><th>${yen(D.expenses.reduce((s, e) => s + e.yen, 0))}</th></tr></tbody></table>`],
    about: ["ℹ️", "このデモについて", () => `<h1>このデモについて</h1><div class="card"><p>畑しるべは、家庭菜園・小さな畑の観察を家族で共有するためのアプリです。本物は自宅のサーバーで動き、写真の読み取りは家の中のローカル AI で行います。</p>
      <p>このデモ版は見た目と流れを紹介するためのもので、<b>データはすべて架空</b>、<b>ネットへの送信・テレメトリは一切ありません</b>。サーバーやカメラにもつながりません。</p><p class="muted">Built with Claude (Anthropic).</p></div>`]
  };

  const nav = document.getElementById("nav"), main = document.getElementById("main");
  document.getElementById("who").textContent = `${D.user.name}（${D.user.role}）`;
  nav.innerHTML = Object.entries(pages).map(([k, [icon, label]]) => `<a href="#${k}" data-k="${k}"><span aria-hidden="true">${icon}</span>${label}</a>`).join("");
  const render = () => {
    const k = pages[location.hash.slice(1)] ? location.hash.slice(1) : "home";
    main.innerHTML = pages[k][2]();
    nav.querySelectorAll("a").forEach(a => a.dataset.k === k ? a.setAttribute("aria-current", "page") : a.removeAttribute("aria-current"));
    document.title = `${pages[k][1]} — 畑しるべ デモ`;
  };
  addEventListener("hashchange", render);
  render();
})();
