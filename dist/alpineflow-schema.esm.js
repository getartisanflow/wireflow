const V = "__alpineflow_registry__";
function ce() {
  return typeof globalThis < "u" ? (globalThis[V] || (globalThis[V] = /* @__PURE__ */ new Map()), globalThis[V]) : /* @__PURE__ */ new Map();
}
function le(e, t) {
  ce().set(e, t);
}
function fe(e, t, r, o) {
  const s = [];
  return { edges: e.map((i) => {
    let a = i;
    return i.source === t && i.sourceHandle === r && (a = { ...a, sourceHandle: o }), i.target === t && i.targetHandle === r && (a = { ...a, targetHandle: o }), a !== i && s.push(i.id), a;
  }), cascadedIds: s };
}
function ue(e, t, r) {
  const o = [];
  return { edges: e.filter((d) => {
    const i = d.source === t && d.sourceHandle === r || d.target === t && d.targetHandle === r;
    return i && o.push(d.id), !i;
  }), droppedIds: o };
}
const pe = /^[a-z][a-z0-9_]*$/, me = 40;
function ie(e) {
  return typeof e == "string" && e.length <= me && pe.test(e);
}
function G(e, t, r) {
  const o = e?.el ?? e?._container;
  if (!o || typeof o.dispatchEvent != "function")
    return;
  const s = [], d = typeof window < "u" ? window : void 0, i = (a) => {
    s.push(a.error ?? a.message), a.preventDefault();
  };
  d && typeof d.addEventListener == "function" && d.addEventListener("error", i, !0);
  try {
    o.dispatchEvent(new CustomEvent(t, { detail: r, bubbles: !0 }));
  } catch (a) {
    s.push(a);
  } finally {
    d && typeof d.removeEventListener == "function" && d.removeEventListener("error", i, !0);
  }
  for (const a of s)
    console.error("[alpineflow/schema] listener threw while handling", t, a);
}
function j(e, t) {
  return e?.nodes?.find((r) => r.id === t) ?? null;
}
function ge(e, t, r) {
  const o = j(e, t);
  return o ? ie(r?.name) ? (o.data || (o.data = { label: t, fields: [] }), (o.data.fields ?? []).some((d) => d.name === r.name) ? { applied: !1, reason: "duplicate" } : (Array.isArray(o.data.fields) || (o.data.fields = []), o.data.fields.push({ ...r }), G(e, "schema:field-added", { nodeId: t, field: { ...r } }), { applied: !0 })) : { applied: !1, reason: "invalid-name" } : { applied: !1, reason: "no-node" };
}
function he(e, t, r, o) {
  if (r === o)
    return { applied: !1, reason: "unchanged", cascadedEdgeIds: [] };
  if (!ie(o))
    return { applied: !1, reason: "invalid-name", cascadedEdgeIds: [] };
  const s = j(e, t);
  if (!s)
    return { applied: !1, reason: "no-node", cascadedEdgeIds: [] };
  const d = s.data?.fields ?? [], i = d.find((u) => u.name === r);
  if (!i)
    return { applied: !1, reason: "no-field", cascadedEdgeIds: [] };
  if (d.some((u) => u.name === o))
    return { applied: !1, reason: "duplicate", cascadedEdgeIds: [] };
  i.name = o;
  const a = e.edges ?? [], { edges: n, cascadedIds: c } = fe(a, t, r, o);
  if (c.length > 0) {
    const u = new Map(n.map((l) => [l.id, l]));
    for (const l of e.edges) {
      const p = u.get(l.id);
      !p || p === l || (l.sourceHandle !== p.sourceHandle && (l.sourceHandle = p.sourceHandle), l.targetHandle !== p.targetHandle && (l.targetHandle = p.targetHandle));
    }
  }
  return G(e, "schema:field-renamed", {
    nodeId: t,
    oldName: r,
    newName: o,
    cascadedEdgeIds: c
  }), c.length > 0 && G(e, "schema:edges-cascaded", {
    nodeId: t,
    fieldName: o,
    edgeIds: c,
    operation: "rename"
  }), { applied: !0, cascadedEdgeIds: c };
}
function ye(e, t, r) {
  const o = j(e, t);
  if (!o)
    return { applied: !1, reason: "no-node", droppedEdgeIds: [] };
  const d = (o.data?.fields ?? []).findIndex((n) => n.name === r);
  if (d === -1)
    return { applied: !1, reason: "no-field", droppedEdgeIds: [] };
  o.data.fields.splice(d, 1);
  const i = e.edges ?? [], { droppedIds: a } = ue(i, t, r);
  if (a.length > 0) {
    const n = new Set(a);
    for (let c = e.edges.length - 1; c >= 0; c--)
      n.has(e.edges[c].id) && e.edges.splice(c, 1);
    e._rebuildEdgeMap?.();
  }
  return G(e, "schema:field-removed", {
    nodeId: t,
    fieldName: r,
    droppedEdgeIds: a
  }), a.length > 0 && G(e, "schema:edges-cascaded", {
    nodeId: t,
    fieldName: r,
    edgeIds: a,
    operation: "remove"
  }), { applied: !0, droppedEdgeIds: a };
}
function Ee(e, t, r) {
  if (!Array.isArray(r))
    return { applied: !1, reason: "mismatch" };
  if (new Set(r).size !== r.length)
    return { applied: !1, reason: "mismatch" };
  const o = j(e, t);
  if (!o)
    return { applied: !1, reason: "no-node" };
  const s = o.data?.fields ?? [];
  if (r.length !== s.length)
    return { applied: !1, reason: "mismatch" };
  const d = new Set(s.map((c) => c.name)), i = new Set(r);
  if (d.size !== i.size)
    return { applied: !1, reason: "mismatch" };
  for (const c of r)
    if (!d.has(c))
      return { applied: !1, reason: "mismatch" };
  const a = /* @__PURE__ */ Object.create(null);
  for (const c of s)
    a[c.name] = c;
  const n = r.map((c) => a[c]);
  return o.data.fields.splice(0, o.data.fields.length, ...n), { applied: !0 };
}
function de(e) {
  const t = /* @__PURE__ */ new Map();
  for (const o of e)
    t.set(o.id, o);
  const r = [];
  for (const o of e) {
    const s = o.data?.fields ?? [];
    for (const d of s) {
      if (typeof d?.name != "string" || !d.name.endsWith("_id"))
        continue;
      const i = d.name.slice(0, -3);
      if (!i)
        continue;
      const a = t.get(i);
      if (!a || a.id === o.id)
        continue;
      const n = a.data?.fields ?? [], u = n.find((l) => l.key === "primary")?.name ?? n[0]?.name ?? "id";
      r.push({
        fromNodeId: o.id,
        fromFieldName: d.name,
        toNodeId: a.id,
        toFieldName: u,
        confidence: "exact"
      });
    }
  }
  return r;
}
function ve(e, t) {
  return e === t ? !0 : e === void 0 || t === void 0 ? e === t : JSON.stringify(e) === JSON.stringify(t);
}
function te(e, t, r = {}) {
  const o = r.deleteMissing ?? !0, s = new Map(e.map((i) => [i.id, i])), d = [];
  for (const i of t) {
    const a = s.get(i.id);
    if (!a) {
      d.push(i);
      continue;
    }
    if (o)
      for (const n of Object.keys(a))
        n !== "id" && !(n in i) && delete a[n];
    for (const [n, c] of Object.entries(i))
      n === "id" || n === "__proto__" || n === "constructor" || n === "prototype" || ve(a[n], c) || (a[n] = c);
    d.push(a);
  }
  return d;
}
function K(e) {
  const t = (e.nodes ?? []).map((o) => ({
    id: o.id,
    label: o.data?.label ?? "",
    fields: (o.data?.fields ?? []).map((s) => ({ ...s })),
    position: { x: o.position?.x ?? 0, y: o.position?.y ?? 0 }
  })), r = (e.edges ?? []).map((o) => {
    const s = { id: o.id, source: o.source, target: o.target };
    return o.sourceHandle !== void 0 && (s.sourceHandle = o.sourceHandle), o.targetHandle !== void 0 && (s.targetHandle = o.targetHandle), o.label !== void 0 && (s.label = o.label), s;
  });
  return { version: 1, nodes: t, edges: r };
}
function ae(e, t) {
  if (!t || typeof t.version != "number")
    throw new Error("[alpineflow/schema] schemaFromJSON: missing or invalid version");
  if (t.version !== 1)
    throw new Error(`[alpineflow/schema] schemaFromJSON: unsupported version ${t.version}`);
  const r = (t.nodes ?? []).map((i) => ({
    id: i.id,
    position: { x: i.position?.x ?? 0, y: i.position?.y ?? 0 },
    data: {
      label: i.label,
      fields: (i.fields ?? []).map((a) => ({ ...a }))
    }
  })), o = (t.edges ?? []).map((i) => {
    const a = { id: i.id, source: i.source, target: i.target };
    return i.sourceHandle !== void 0 && (a.sourceHandle = i.sourceHandle), i.targetHandle !== void 0 && (a.targetHandle = i.targetHandle), i.label !== void 0 && (a.label = i.label), a;
  }), s = te(e.nodes, r, { deleteMissing: !1 });
  e.nodes.splice(0, e.nodes.length, ...s);
  const d = te(e.edges, o, { deleteMissing: !1 });
  e.edges.splice(0, e.edges.length, ...d), e._rebuildNodeMap?.(), e._rebuildEdgeMap?.(), typeof requestAnimationFrame == "function" && requestAnimationFrame(() => {
    e._layoutAnimTick = (e._layoutAnimTick ?? 0) + 1;
  });
}
function be(e, t) {
  for (const n of t)
    if (n && typeof n.source == "string" && n.source === n.target)
      return !0;
  const r = /* @__PURE__ */ new Map(), o = (n) => {
    let c = r.get(n);
    return c || (c = [], r.set(n, c)), c;
  };
  for (const n of e)
    n && typeof n.id == "string" && o(n.id);
  for (const n of t)
    !n || typeof n.source != "string" || typeof n.target != "string" || (o(n.source).push(n.target), o(n.target));
  const s = 0, d = 1, i = 2, a = /* @__PURE__ */ new Map();
  for (const n of r.keys())
    a.set(n, s);
  for (const n of r.keys()) {
    if (a.get(n) !== s) continue;
    const c = [{ node: n, idx: 0 }];
    for (a.set(n, d); c.length > 0; ) {
      const u = c[c.length - 1], l = r.get(u.node) ?? [];
      if (u.idx < l.length) {
        const p = l[u.idx++], m = a.get(p);
        if (m === d)
          return !0;
        m === s && (a.set(p, d), c.push({ node: p, idx: 0 }));
      } else
        a.set(u.node, i), c.pop();
    }
  }
  return !1;
}
function we(e) {
  const t = [], r = Array.isArray(e?.nodes) ? e.nodes : [], o = Array.isArray(e?.edges) ? e.edges : [], s = /* @__PURE__ */ new Set(), d = /* @__PURE__ */ new Set();
  for (const n of r)
    !n || typeof n.id != "string" || (s.has(n.id) && d.add(n.id), s.add(n.id));
  for (const n of d)
    t.push({
      severity: "error",
      code: "duplicate-node-id",
      nodeId: n,
      message: `Duplicate node id "${n}".`
    });
  for (const n of r) {
    if (!n || typeof n.id != "string") continue;
    const c = Array.isArray(n.data?.fields) ? n.data.fields : [];
    if (c.length === 0) continue;
    const u = /* @__PURE__ */ new Set(), l = /* @__PURE__ */ new Set();
    for (const m of c)
      !m || typeof m.name != "string" || (u.has(m.name) && l.add(m.name), u.add(m.name));
    for (const m of l)
      t.push({
        severity: "error",
        code: "duplicate-field",
        nodeId: n.id,
        fieldName: m,
        message: `Duplicate field "${m}" on node "${n.id}".`
      });
    c.some((m) => m && m.key === "primary") || t.push({
      severity: "warning",
      code: "missing-primary-key",
      nodeId: n.id,
      message: `Node "${n.id}" has no primary-key field.`
    });
  }
  for (const n of o) {
    if (!n) continue;
    const c = typeof n.id == "string" ? n.id : void 0;
    (typeof n.source != "string" || !s.has(n.source)) && t.push({
      severity: "error",
      code: "dangling-edge",
      edgeId: c,
      nodeId: typeof n.source == "string" ? n.source : void 0,
      message: `Edge ${c ? `"${c}" ` : ""}references missing source node "${n.source}".`
    }), (typeof n.target != "string" || !s.has(n.target)) && t.push({
      severity: "error",
      code: "dangling-edge",
      edgeId: c,
      nodeId: typeof n.target == "string" ? n.target : void 0,
      message: `Edge ${c ? `"${c}" ` : ""}references missing target node "${n.target}".`
    });
  }
  const i = /* @__PURE__ */ new Set();
  for (const n of o)
    n && (typeof n.source == "string" && i.add(n.source), typeof n.target == "string" && i.add(n.target));
  for (const n of r)
    !n || typeof n.id != "string" || i.has(n.id) || t.push({
      severity: "warning",
      code: "disconnected-node",
      nodeId: n.id,
      message: `Node "${n.id}" has no connected edges.`
    });
  return be(r, o) && t.push({
    severity: "warning",
    code: "cycle",
    message: "Directed cycle detected in edge graph."
  }), { valid: !t.some((n) => n.severity === "error"), issues: t };
}
function ne(e) {
  return !e || !Array.isArray(e.nodes) ? [] : e.nodes.filter((t) => !!t && typeof t.id == "string");
}
function oe(e) {
  return !e || !Array.isArray(e.edges) ? [] : e.edges.filter((t) => !!t && typeof t.id == "string");
}
function re(e) {
  const t = /* @__PURE__ */ new Map(), r = Array.isArray(e.fields) ? e.fields : [];
  for (const o of r)
    o && typeof o.name == "string" && t.set(o.name, o);
  return t;
}
function Se(e, t, r = {}) {
  const o = ne(e), s = ne(t), d = oe(e), i = oe(t), a = /* @__PURE__ */ new Map();
  for (const f of o)
    a.set(f.id, f);
  const n = /* @__PURE__ */ new Map();
  for (const f of s)
    n.set(f.id, f);
  const c = [], u = [];
  for (const f of n.keys())
    a.has(f) || c.push(f);
  for (const f of a.keys())
    n.has(f) || u.push(f);
  const l = [], p = /* @__PURE__ */ new Set(), m = /* @__PURE__ */ new Set();
  if (r.detectRenames) {
    const f = (h) => (Array.isArray(h.fields) ? h.fields : []).filter((T) => T && typeof T.name == "string").map((T) => T.name).sort().join("\0");
    for (const h of u) {
      const I = a.get(h);
      if (!I) continue;
      const T = f(I), D = [];
      for (const F of c) {
        if (p.has(F)) continue;
        const C = n.get(F);
        C && f(C) === T && D.push(F);
      }
      if (D.length === 1) {
        const F = D[0];
        l.push({ from: h, to: F }), p.add(F), m.add(h);
      }
    }
  }
  const b = c.filter((f) => !p.has(f)), g = u.filter((f) => !m.has(f)), y = [];
  for (const f of a.keys())
    n.has(f) && y.push({ beforeId: f, afterId: f });
  for (const f of l)
    y.push({ beforeId: f.from, afterId: f.to });
  const E = /* @__PURE__ */ new Map();
  for (const f of r.fieldRenames ?? []) {
    if (!f || typeof f.nodeId != "string" || typeof f.from != "string" || typeof f.to != "string") continue;
    let h = E.get(f.nodeId);
    h || (h = [], E.set(f.nodeId, h)), h.push({ from: f.from, to: f.to });
  }
  const S = /* @__PURE__ */ new Map();
  for (const f of l)
    S.set(f.from, f.to);
  for (const f of r.fieldRenames ?? []) {
    if (!f || typeof f.nodeId != "string") continue;
    const h = S.get(f.nodeId);
    if (h && !E.has(h)) {
      const I = E.get(f.nodeId) ?? [];
      E.set(h, I);
    }
  }
  const v = [], A = [], x = [], N = [];
  for (const { beforeId: f, afterId: h } of y) {
    const I = a.get(f), T = n.get(h);
    if (!I || !T) continue;
    const D = re(I), F = re(T), C = E.get(h) ?? E.get(f) ?? [], P = /* @__PURE__ */ new Set(), z = /* @__PURE__ */ new Set();
    for (const w of C) {
      const B = D.get(w.from), M = F.get(w.to);
      if (!B || !M || P.has(w.from) || z.has(w.to)) continue;
      v.push({ nodeId: h, from: w.from, to: w.to }), P.add(w.from), z.add(w.to);
      const J = typeof B.type == "string" ? B.type : "", Y = typeof M.type == "string" ? M.type : "";
      J !== Y && N.push({
        nodeId: h,
        fieldName: w.to,
        from: J,
        to: Y
      });
    }
    for (const [w] of F)
      z.has(w) || D.has(w) || A.push({ nodeId: h, fieldName: w });
    for (const [w] of D)
      P.has(w) || F.has(w) || x.push({ nodeId: h, fieldName: w });
    for (const [w, B] of D) {
      if (P.has(w)) continue;
      const M = F.get(w);
      if (!M) continue;
      const J = typeof B.type == "string" ? B.type : "", Y = typeof M.type == "string" ? M.type : "";
      J !== Y && N.push({
        nodeId: h,
        fieldName: w,
        from: J,
        to: Y
      });
    }
  }
  const R = /* @__PURE__ */ new Set();
  for (const f of d) R.add(f.id);
  const $ = /* @__PURE__ */ new Set();
  for (const f of i) $.add(f.id);
  const k = [], q = [];
  for (const f of $)
    R.has(f) || k.push(f);
  for (const f of R)
    $.has(f) || q.push(f);
  b.sort(), g.sort(), l.sort((f, h) => f.from.localeCompare(h.from));
  const L = (f) => `${f.nodeId}\0${f.fieldName}`;
  return A.sort((f, h) => L(f).localeCompare(L(h))), x.sort((f, h) => L(f).localeCompare(L(h))), v.sort((f, h) => {
    const I = f.nodeId.localeCompare(h.nodeId);
    return I !== 0 ? I : f.from.localeCompare(h.from);
  }), N.sort((f, h) => L(f).localeCompare(L(h))), k.sort(), q.sort(), {
    addedNodes: b,
    removedNodes: g,
    renamedNodes: l,
    addedFields: A,
    removedFields: x,
    renamedFields: v,
    changedFieldTypes: N,
    addedEdges: k,
    removedEdges: q
  };
}
const Ie = {
  rankdir: "LR",
  nodeShape: "plaintext",
  includeFieldTypes: !0,
  includeFieldKeys: !0,
  graphName: "schema"
};
function W(e) {
  return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function _(e) {
  return e.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}
function Ae(e, t) {
  const r = String(e?.id ?? ""), o = String(e?.data?.label ?? ""), s = Array.isArray(e?.data?.fields) ? e.data.fields : [], d = 1 + (t.includeFieldKeys ? 1 : 0) + (t.includeFieldTypes ? 1 : 0), i = [];
  i.push(
    `      <TR><TD BGCOLOR="#f0f0f0" COLSPAN="${d}"><B>${W(o)}</B></TD></TR>`
  );
  for (const a of s) {
    const n = String(a?.name ?? ""), c = [];
    if (t.includeFieldKeys) {
      const u = a?.key === "primary" ? "PK" : a?.key === "foreign" ? "FK" : "";
      c.push(`<TD>${u}</TD>`);
    }
    c.push(`<TD PORT="${W(n)}">${W(n)}</TD>`), t.includeFieldTypes && c.push(`<TD>${W(String(a?.type ?? ""))}</TD>`), i.push(`      <TR>${c.join("")}</TR>`);
  }
  return `  "${_(r)}" [label=<
    <TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0" CELLPADDING="4">
${i.join(`
`)}
    </TABLE>
  >];`;
}
function Ne(e) {
  const t = `"${_(String(e?.source ?? ""))}"`, r = `"${_(String(e?.target ?? ""))}"`, o = e?.sourceHandle ? `:"${_(String(e.sourceHandle))}"` : "", s = e?.targetHandle ? `:"${_(String(e.targetHandle))}"` : "", d = e?.label ? ` [label="${_(String(e.label))}"]` : "";
  return `  ${t}${o} -> ${r}${s}${d};`;
}
function Ce(e, t = {}) {
  const r = { ...Ie, ...t }, o = [];
  o.push(`digraph "${_(r.graphName)}" {`), o.push(`  rankdir=${r.rankdir};`), o.push(`  node [shape=${r.nodeShape}];`);
  for (const s of e?.nodes ?? [])
    o.push(Ae(s, r));
  for (const s of e?.edges ?? [])
    o.push(Ne(s));
  return o.push("}"), o.join(`
`);
}
const Le = ["dagre", "tree", "grid"];
async function Fe(e, t = {}) {
  const r = t.direction ?? "LR", o = t.nodeSpacing ?? 80, s = t.rankSpacing ?? 160, d = xe(t.algorithm), i = t.deriveFromReferences ? Te(e) : null;
  try {
    for (const a of d) {
      if (a === "dagre" && Re(e, r, o, s) || a === "tree" && De(e, r, o, s))
        return;
      if (a === "grid") {
        ke(e.nodes ?? [], o, s, r);
        return;
      }
    }
    console.warn(
      '[alpineflow/schema] schemaLayout: no layout algorithm available. Register @getartisanflow/alpineflow/dagre (or hierarchy), or pass { algorithm: "grid" } for the always-available fallback.'
    );
  } finally {
    i && i.restore();
  }
}
function xe(e) {
  return e ? [e] : [...Le];
}
function Te(e) {
  const t = e.edges;
  if (!Array.isArray(t))
    return null;
  const r = t.slice(), o = de(e.nodes ?? []).map((s, d) => ({
    id: `schema-layout-inferred-${d}`,
    source: s.fromNodeId,
    target: s.toNodeId,
    sourceHandle: s.fromFieldName,
    targetHandle: s.toFieldName
  }));
  return t.splice(0, t.length, ...o), {
    restore: () => {
      t.splice(0, t.length, ...r);
    }
  };
}
function Re(e, t, r, o) {
  if (typeof e.layout != "function")
    return !1;
  try {
    return e.layout({
      direction: t,
      nodesep: r,
      ranksep: o
    }), !0;
  } catch {
    return !1;
  }
}
function De(e, t, r, o) {
  if (typeof e.treeLayout != "function")
    return !1;
  try {
    return e.treeLayout({
      direction: t,
      nodeWidth: r + 200,
      nodeHeight: o + 80
    }), !0;
  } catch {
    return !1;
  }
}
function ke(e, t, r, o) {
  const s = e.length;
  if (s === 0)
    return;
  const d = Math.max(1, Math.ceil(Math.sqrt(s))), i = Math.ceil(s / d), a = t + 300, n = r + 200;
  for (let c = 0; c < s; c++) {
    const u = c % d, l = Math.floor(c / d);
    let p = u * a, m = l * n;
    o === "BT" ? m = (i - 1 - l) * n : o === "RL" && (p = (d - 1 - u) * a), e[c].position = { x: p, y: m };
  }
}
const se = [
  "schema:field-added",
  "schema:field-renamed",
  "schema:field-removed",
  "schema:edges-cascaded"
];
function Ve(e, t = {}) {
  const r = Math.max(1, t.limit ?? 50), o = [], s = [];
  let d = 0, i = 0, a = null, n = !1;
  const c = e?.el ?? e?._container ?? null;
  if (!c || typeof c.addEventListener != "function")
    return He();
  const u = () => {
    for (; o.length > r && o.length > 1; )
      o.shift();
  }, l = (y) => {
    const E = o[o.length - 1];
    E !== void 0 && JSON.stringify(E) === JSON.stringify(y) || (o.push(y), u(), s.length = 0);
  }, p = () => {
    n || d > 0 || i > 0 || l(K(e));
  };
  o.push(K(e));
  const m = () => {
    p();
  };
  for (const y of se)
    c.addEventListener(y, m);
  const b = (y) => {
    d++;
    try {
      ae(e, y);
    } finally {
      d--;
    }
  };
  return {
    get canUndo() {
      return o.length > 1;
    },
    get canRedo() {
      return s.length > 0;
    },
    undo() {
      if (n || o.length <= 1)
        return !1;
      const y = o.pop();
      s.push(y);
      const E = o[o.length - 1];
      return b(E), !0;
    },
    redo() {
      if (n || s.length === 0)
        return !1;
      const y = s.pop();
      return o.push(y), b(y), !0;
    },
    clear() {
      o.length = 0, s.length = 0, n || o.push(K(e));
    },
    batch(y) {
      if (n)
        return y();
      i === 0 && (a = K(e)), i++;
      try {
        const E = y();
        return i--, i === 0 && (a = null, d === 0 && !n && l(K(e))), E;
      } catch (E) {
        if (i--, i === 0) {
          const S = a;
          a = null, S && !n && b(S);
        }
        throw E;
      }
    },
    dispose() {
      if (!n) {
        n = !0;
        for (const y of se)
          c.removeEventListener(y, m);
        o.length = 0, s.length = 0, a = null;
      }
    }
  };
}
function He() {
  return {
    get canUndo() {
      return !1;
    },
    get canRedo() {
      return !1;
    },
    undo: () => !1,
    redo: () => !1,
    clear: () => {
    },
    batch(e) {
      return e();
    },
    dispose: () => {
    }
  };
}
function H(e) {
  if (!e || e.size === 0)
    return null;
  let t = null;
  for (const r of e)
    t = r;
  return t;
}
function $e(e) {
  if (!e)
    return null;
  const t = e.indexOf(".");
  return t < 1 || t === e.length - 1 ? null : { nodeId: e.slice(0, t), fieldName: e.slice(t + 1) };
}
function X(e, t) {
  const r = t.closest(".flow-container");
  if (r)
    try {
      return e.$data(r) ?? null;
    } catch {
    }
  const o = document.querySelectorAll(".flow-container");
  if (o.length === 1)
    try {
      return e.$data(o[0]) ?? null;
    } catch {
    }
  return o.length > 1 && !window.__alpineflowSchemaMultiCanvasWarned && (window.__alpineflowSchemaMultiCanvasWarned = !0, console.warn(
    "[alpineflow/schema] inspector directive found multiple .flow-container elements on the page; place inspector inside the canvas OR scope the directive expression to a specific canvas (multi-canvas scope selector is on the v0.2.2 roadmap)."
  )), null;
}
function Q(e) {
  return e.querySelector(
    ":scope > template[x-schema-default-ui]"
  );
}
function U(e) {
  const t = e.querySelector(":scope > [data-schema-default-ui-root]");
  t && t.remove();
}
function Z(e) {
  const t = document.createElement("div");
  return t.setAttribute("data-schema-default-ui-root", ""), e.appendChild(t), t;
}
function ee(e) {
  if (!e)
    return null;
  const t = document.activeElement;
  if (!t || !(t instanceof HTMLElement) || !e.contains(t))
    return null;
  const r = t.getAttribute("data-field");
  if (!r)
    return null;
  let o = null, s = null;
  if (t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement)
    try {
      o = t.selectionStart, s = t.selectionEnd;
    } catch {
    }
  return {
    field: r,
    tagName: t.tagName.toLowerCase(),
    selectionStart: o,
    selectionEnd: s
  };
}
function Me(e) {
  return typeof globalThis.CSS < "u" && typeof globalThis.CSS.escape == "function" ? globalThis.CSS.escape(e) : e.replace(/["\\]/g, "\\$&");
}
function O(e, t) {
  if (!e || !t)
    return;
  const r = e.querySelector(
    `[data-field="${Me(t.field)}"]`
  );
  if (r && r.tagName.toLowerCase() === t.tagName)
    try {
      r.focus({ preventScroll: !0 }), (r instanceof HTMLInputElement || r instanceof HTMLTextAreaElement) && t.selectionStart !== null && t.selectionEnd !== null && r.setSelectionRange(t.selectionStart, t.selectionEnd);
    } catch {
    }
}
function _e(e) {
  e.directive(
    "schema-node-inspector",
    (t, r, { effect: o, cleanup: s }) => {
      const d = t, i = X(e, d);
      if (!i)
        return;
      const a = Q(d), n = {
        addField(u) {
          const l = H(i.selectedNodes);
          return l ? i.addField?.(l, u) ?? { applied: !1, reason: "no-helper" } : { applied: !1, reason: "no-selection" };
        },
        renameField(u, l) {
          const p = H(i.selectedNodes);
          return p ? i.renameField?.(p, u, l) ?? {
            applied: !1,
            reason: "no-helper",
            cascadedEdgeIds: []
          } : { applied: !1, reason: "no-selection", cascadedEdgeIds: [] };
        },
        removeField(u) {
          const l = H(i.selectedNodes);
          return l ? i.removeField?.(l, u) ?? {
            applied: !1,
            reason: "no-helper",
            droppedEdgeIds: []
          } : { applied: !1, reason: "no-selection", droppedEdgeIds: [] };
        },
        reorderFields(u) {
          const l = H(i.selectedNodes);
          return l ? i.reorderFields?.(l, u) ?? {
            applied: !1,
            reason: "no-helper"
          } : { applied: !1, reason: "no-selection" };
        }
      }, c = e.addScopeToNode(d, {
        inspector: n,
        get selectedNode() {
          const u = H(i.selectedNodes);
          return u ? i.nodes?.find((l) => l.id === u) ?? null : null;
        }
      });
      a && o(() => {
        Oe(d, i);
      }), s(() => {
        U(d), c?.();
      });
    }
  );
}
function Oe(e, t) {
  const r = e.querySelector(
    ":scope > [data-schema-default-ui-root]"
  ), o = ee(r);
  U(e);
  const s = Z(e), d = H(t.selectedNodes), i = d ? t.nodes?.find((g) => g.id === d) : null;
  if (!i) {
    const g = document.createElement("div");
    g.setAttribute("data-schema-inspector-empty", ""), g.textContent = "No node selected.", s.appendChild(g), O(s, o);
    return;
  }
  const a = document.createElement("header");
  a.setAttribute("data-schema-inspector-label", ""), a.textContent = String(i.data?.label ?? i.id), s.appendChild(a);
  const n = document.createElement("ul");
  n.setAttribute("data-schema-inspector-fields", "");
  const c = Array.isArray(i.data?.fields) ? i.data.fields : [];
  for (const g of c) {
    const y = document.createElement("li");
    y.setAttribute("data-schema-inspector-field", ""), y.dataset.fieldName = String(g?.name ?? "");
    const E = document.createElement("span");
    if (E.textContent = String(g?.name ?? ""), y.appendChild(E), g?.type) {
      const v = document.createElement("span");
      v.setAttribute("data-field-type", ""), v.textContent = String(g.type), y.appendChild(v);
    }
    const S = document.createElement("button");
    S.type = "button", S.setAttribute("data-action", "remove"), S.textContent = "remove", S.addEventListener("click", () => {
      t.removeField?.(i.id, g.name);
    }), y.appendChild(S), n.appendChild(y);
  }
  s.appendChild(n);
  const u = document.createElement("form");
  u.setAttribute("data-schema-inspector-add-field", "");
  const l = document.createElement("input");
  l.setAttribute("data-field", "name"), l.placeholder = "field name", u.appendChild(l);
  const p = Array.isArray(t._config?.fieldTypeRegistry) ? t._config.fieldTypeRegistry : null;
  let m;
  if (p && p.length > 0) {
    const g = document.createElement("select");
    g.setAttribute("data-field", "type");
    for (const y of p) {
      const E = document.createElement("option");
      E.value = y, E.textContent = y, g.appendChild(E);
    }
    g.value = p[0], m = g;
  } else {
    const g = document.createElement("input");
    g.setAttribute("data-field", "type"), g.placeholder = "type", g.value = "text", m = g;
  }
  u.appendChild(m);
  const b = document.createElement("button");
  b.type = "submit", b.textContent = "add", u.appendChild(b), u.addEventListener("submit", (g) => {
    g.preventDefault();
    const y = l.value.trim();
    if (!y)
      return;
    const E = m.value, S = (typeof E == "string" ? E.trim() : "") || "text";
    t.addField?.(i.id, { name: y, type: S })?.applied && (l.value = "");
  }), s.appendChild(u), O(s, o);
}
function qe(e) {
  e.directive(
    "schema-row-inspector",
    (t, r, { effect: o, cleanup: s }) => {
      const d = t, i = X(e, d);
      if (!i)
        return;
      const a = Q(d), n = () => $e(H(i.selectedRows)), c = () => {
        const p = n();
        if (!p)
          return null;
        const m = i.nodes?.find((g) => g.id === p.nodeId);
        return m ? (m.data?.fields ?? []).find((g) => g?.name === p.fieldName) ?? null : null;
      }, u = {
        renameField(p) {
          const m = n();
          return m ? i.renameField?.(m.nodeId, m.fieldName, p) ?? {
            applied: !1,
            reason: "no-helper",
            cascadedEdgeIds: []
          } : { applied: !1, reason: "no-selection", cascadedEdgeIds: [] };
        },
        removeField() {
          const p = n();
          return p ? i.removeField?.(p.nodeId, p.fieldName) ?? {
            applied: !1,
            reason: "no-helper",
            droppedEdgeIds: []
          } : { applied: !1, reason: "no-selection", droppedEdgeIds: [] };
        },
        /**
         * Patch non-name properties (type, required, …) of the selected
         * field in place. For name changes, use `renameField` so edges
         * cascade correctly.
         */
        updateField(p) {
          const m = c();
          if (!m)
            return { applied: !1, reason: "no-selection" };
          for (const [b, g] of Object.entries(p))
            b !== "name" && (m[b] = g);
          return { applied: !0 };
        }
      }, l = e.addScopeToNode(d, {
        inspector: u,
        get selectedRow() {
          return n();
        }
      });
      a && o(() => {
        Pe(d, i, n());
      }), s(() => {
        U(d), l?.();
      });
    }
  );
}
function Pe(e, t, r) {
  const o = e.querySelector(
    ":scope > [data-schema-default-ui-root]"
  ), s = ee(o);
  U(e);
  const d = Z(e);
  if (!r) {
    const g = document.createElement("div");
    g.setAttribute("data-schema-inspector-empty", ""), g.textContent = "No row selected.", d.appendChild(g), O(d, s);
    return;
  }
  const a = t.nodes?.find((g) => g.id === r.nodeId)?.data?.fields?.find((g) => g?.name === r.fieldName) ?? null;
  if (!a) {
    const g = document.createElement("div");
    g.setAttribute("data-schema-inspector-empty", ""), g.textContent = "Selected row no longer exists.", d.appendChild(g), O(d, s);
    return;
  }
  const n = document.createElement("label");
  n.textContent = "name ";
  const c = document.createElement("input");
  c.setAttribute("data-field", "name"), c.value = String(a.name ?? ""), c.addEventListener("change", () => {
    const g = c.value.trim();
    !g || g === a.name || t.renameField?.(r.nodeId, r.fieldName, g);
  }), n.appendChild(c), d.appendChild(n);
  const u = document.createElement("label");
  u.textContent = "type ";
  const l = document.createElement("input");
  l.setAttribute("data-field", "type"), l.value = String(a.type ?? ""), l.addEventListener("change", () => {
    a.type = l.value;
  }), u.appendChild(l), d.appendChild(u);
  const p = document.createElement("label");
  p.textContent = "required ";
  const m = document.createElement("input");
  m.type = "checkbox", m.setAttribute("data-field", "required"), m.checked = !!a.required, m.addEventListener("change", () => {
    a.required = m.checked;
  }), p.appendChild(m), d.appendChild(p);
  const b = document.createElement("button");
  b.type = "button", b.setAttribute("data-action", "remove"), b.textContent = "remove", b.addEventListener("click", () => {
    t.removeField?.(r.nodeId, r.fieldName);
  }), d.appendChild(b), O(d, s);
}
function Be(e) {
  e.directive(
    "schema-edge-inspector",
    (t, r, { effect: o, cleanup: s }) => {
      const d = t, i = X(e, d);
      if (!i)
        return;
      const a = Q(d), n = () => {
        const l = H(i.selectedEdges);
        return l ? i.edges?.find((p) => p.id === l) ?? null : null;
      }, c = {
        updateEdge(l) {
          const p = n();
          if (!p)
            return { applied: !1, reason: "no-selection" };
          for (const [m, b] of Object.entries(l))
            p[m] = b;
          return { applied: !0 };
        },
        setLabel(l) {
          return this.updateEdge({ label: l });
        },
        removeEdge() {
          const l = n();
          if (!l)
            return { applied: !1, reason: "no-selection" };
          if (typeof i.removeEdges == "function")
            return i.removeEdges([l.id]), { applied: !0 };
          const p = i.edges?.findIndex((m) => m.id === l.id) ?? -1;
          return p === -1 ? { applied: !1, reason: "no-helper" } : (i.edges.splice(p, 1), { applied: !0 });
        }
      }, u = e.addScopeToNode(d, {
        inspector: c,
        get selectedEdge() {
          return n();
        }
      });
      a && o(() => {
        Ke(d, i, n());
      }), s(() => {
        U(d), u?.();
      });
    }
  );
}
function Ke(e, t, r) {
  const o = e.querySelector(
    ":scope > [data-schema-default-ui-root]"
  ), s = ee(o);
  U(e);
  const d = Z(e);
  if (!r) {
    const c = document.createElement("div");
    c.setAttribute("data-schema-inspector-empty", ""), c.textContent = "No edge selected.", d.appendChild(c), O(d, s);
    return;
  }
  const i = document.createElement("label");
  i.textContent = "label ";
  const a = document.createElement("input");
  a.setAttribute("data-field", "label"), a.value = String(r.label ?? ""), a.addEventListener("input", () => {
    r.label = a.value;
  }), i.appendChild(a), d.appendChild(i);
  const n = document.createElement("button");
  n.type = "button", n.setAttribute("data-action", "delete"), n.textContent = "delete", n.addEventListener("click", () => {
    if (typeof t.removeEdges == "function")
      t.removeEdges([r.id]);
    else {
      const c = t.edges?.findIndex((u) => u.id === r.id) ?? -1;
      c !== -1 && t.edges.splice(c, 1);
    }
  }), d.appendChild(n), O(d, s);
}
const Ue = 4;
function Je(e) {
  e.directive(
    "schema-reorderable",
    (t, r, { cleanup: o }) => {
      const s = t;
      s.classList.add("flow-schema-reorderable"), s.style.touchAction = "none";
      let d = !1, i = !1, a = 0, n = 0, c = 0, u = null;
      const l = () => {
        const v = s.parentElement;
        return v ? Array.from(
          v.querySelectorAll(":scope > .flow-schema-row")
        ) : [];
      }, p = () => {
        for (const v of l())
          v.classList.remove("flow-schema-row-drop-target");
      }, m = (v) => {
        const A = s.parentElement;
        if (!A) return n;
        const x = Array.from(
          A.querySelectorAll(":scope > .flow-schema-row")
        ).filter((R) => R !== s);
        if (x.length === 0) return n;
        let N = 0;
        for (const R of x) {
          const $ = R.getBoundingClientRect();
          $.top + $.height / 2 < v && N++;
        }
        return N;
      }, b = (v) => {
        p();
        const A = l();
        let x = v;
        v >= n && (x = v + 1);
        const N = A[x] ?? A[v];
        N && N !== s && N.classList.add("flow-schema-row-drop-target");
      }, g = () => {
        s.style.transform = "", s.classList.remove("flow-schema-row-dragging"), p();
      }, y = (v) => {
        if (d || v.button !== void 0 && v.button !== 0) return;
        d = !0, i = !1, a = v.clientY, u = v.pointerId ?? null, n = l().indexOf(s), c = n, s.classList.add("flow-schema-row-dragging");
        try {
          u !== null && typeof s.setPointerCapture == "function" && s.setPointerCapture(u);
        } catch {
        }
        document.addEventListener("pointermove", E), document.addEventListener("pointerup", S), document.addEventListener("pointercancel", S);
      }, E = (v) => {
        if (!d) return;
        const A = v.clientY - a;
        !i && Math.abs(A) > Ue && (i = !0), s.style.transform = `translateY(${A}px)`, i && (c = m(v.clientY), b(c));
      }, S = (v) => {
        if (!d) return;
        const A = i, x = c, N = n;
        try {
          u !== null && typeof s.releasePointerCapture == "function" && typeof s.hasPointerCapture == "function" && s.hasPointerCapture(u) && s.releasePointerCapture(u);
        } catch {
        }
        if (document.removeEventListener("pointermove", E), document.removeEventListener("pointerup", S), document.removeEventListener("pointercancel", S), d = !1, u = null, g(), !A)
          return;
        const R = (C) => {
          C.stopImmediatePropagation(), C.stopPropagation(), C.preventDefault();
        };
        s.addEventListener("click", R, { capture: !0, once: !0 }), setTimeout(() => {
          s.removeEventListener("click", R, { capture: !0 });
        }, 0);
        const k = s.closest("[data-flow-node-id]")?.getAttribute("data-flow-node-id") ?? null;
        if (!k) return;
        const q = s.closest(".flow-container");
        if (!q) return;
        let L;
        try {
          L = e.$data(q);
        } catch {
          return;
        }
        if (!L || typeof L.reorderFields != "function") return;
        const h = (L.nodes ?? []).find((C) => C?.id === k)?.data?.fields ?? [];
        if (!Array.isArray(h) || h.length < 2) return;
        const I = h.map((C) => C.name);
        if (N < 0 || N >= I.length) return;
        const [T] = I.splice(N, 1), D = Math.max(0, Math.min(x, I.length));
        I.splice(D, 0, T), !I.every(
          (C, P) => h[P]?.name === C
        ) && L.reorderFields(k, I);
      };
      s.addEventListener("pointerdown", y), o(() => {
        try {
          s.removeEventListener("pointerdown", y), typeof document < "u" && (document.removeEventListener("pointermove", E), document.removeEventListener("pointerup", S), document.removeEventListener("pointercancel", S)), s.classList.remove("flow-schema-reorderable"), s.classList.remove("flow-schema-row-dragging"), p(), s.style.transform = "", s.style.touchAction = "";
        } catch {
        }
      });
    }
  );
}
function Ye(e) {
  const t = e.parentElement;
  return t ? Array.from(
    t.querySelectorAll(":scope > .flow-schema-row")
  ) : [];
}
function Ge(e, t) {
  const r = Ye(e), o = r.indexOf(e);
  if (o === -1) return;
  const s = r[o + t];
  s && s.focus();
}
function We(e, t) {
  const r = e.closest("[data-flow-node-id]");
  if (!r) return !1;
  const o = e.closest(".flow-container");
  if (!o) return !1;
  const s = Array.from(
    o.querySelectorAll("[data-flow-node-id]")
  ), d = s.indexOf(r);
  if (d === -1) return !1;
  const i = s[d + t];
  if (!i) return !1;
  const a = t === 1 ? i.querySelector(".flow-schema-row") : (() => {
    const n = i.querySelectorAll(".flow-schema-row");
    return n.length > 0 ? n[n.length - 1] : null;
  })();
  return a ? (a.focus(), !0) : !1;
}
function je(e) {
  e.click();
}
function ze(e) {
  e.directive(
    "schema-keyboard-nav",
    (t, r, { effect: o, cleanup: s }) => {
      const d = t;
      d.setAttribute("tabindex", "0"), d.setAttribute("role", "row"), o(() => {
        const a = d.dataset.flowSchemaField ?? "", c = d.querySelector(".flow-schema-row-type")?.textContent ?? "";
        d.setAttribute(
          "aria-label",
          `${a}${c ? " (" + c + ")" : ""}`
        );
      });
      const i = (a) => {
        const n = a.key;
        if (n === "ArrowDown" || n === "ArrowUp") {
          a.preventDefault(), a.stopPropagation(), Ge(d, n === "ArrowDown" ? 1 : -1);
          return;
        }
        if (n === "Tab") {
          We(d, a.shiftKey ? -1 : 1) && a.preventDefault();
          return;
        }
        if (n === "Enter" || n === " ") {
          a.preventDefault(), je(d);
          return;
        }
        if (n === "Escape") {
          d.blur();
          return;
        }
      };
      d.addEventListener("keydown", i), s(() => {
        try {
          d.removeEventListener("keydown", i), d.removeAttribute("tabindex"), d.removeAttribute("role"), d.removeAttribute("aria-label");
        } catch {
        }
      });
    }
  );
}
function Xe(e) {
  e && typeof e.directive == "function" && (_e(e), qe(e), Be(e), Je(e), ze(e)), le("schema", {
    setup(t) {
      !t.el && t._container && (t.el = t._container), t.addField = function(r, o) {
        return ge(this, r, o);
      }, t.renameField = function(r, o, s) {
        return he(this, r, o, s);
      }, t.removeField = function(r, o) {
        return ye(this, r, o);
      }, t.reorderFields = function(r, o) {
        return Ee(this, r, o);
      }, t.inferReferences = function() {
        return de(this.nodes ?? []);
      }, t.schemaToJSON = function() {
        return K(this);
      }, t.schemaFromJSON = function(r) {
        return ae(this, r);
      }, t.validateSchema = function() {
        return we(this);
      }, t.diffSchemas = function(r, o, s) {
        return Se(r, o, s);
      }, t.toDot = function(r) {
        return Ce(this, r);
      }, t.schemaLayout = function(r) {
        return Fe(this, r);
      };
    }
  });
}
export {
  ge as addField,
  Ve as attachSchemaHistory,
  Xe as default,
  Se as diffSchemas,
  de as inferReferences,
  Be as registerEdgeInspectorDirective,
  _e as registerNodeInspectorDirective,
  qe as registerRowInspectorDirective,
  ze as registerSchemaKeyboardNavDirective,
  Je as registerSchemaReorderableDirective,
  ye as removeField,
  he as renameField,
  Ee as reorderFields,
  ae as schemaFromJSON,
  Fe as schemaLayout,
  K as schemaToJSON,
  Ce as toDot,
  we as validateSchema
};
//# sourceMappingURL=alpineflow-schema.esm.js.map
