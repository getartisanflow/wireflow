const X = "__alpineflow_registry__";
function he() {
  return typeof globalThis < "u" ? (globalThis[X] || (globalThis[X] = /* @__PURE__ */ new Map()), globalThis[X]) : /* @__PURE__ */ new Map();
}
function ye(e, t) {
  he().set(e, t);
}
function Ee(e, t, r, n) {
  const i = [];
  return { edges: e.map((s) => {
    let c = s;
    return s.source === t && s.sourceHandle === r && (c = { ...c, sourceHandle: n }), s.target === t && s.targetHandle === r && (c = { ...c, targetHandle: n }), c !== s && i.push(s.id), c;
  }), cascadedIds: i };
}
function ve(e, t, r) {
  const n = [];
  return { edges: e.filter((d) => {
    const s = d.source === t && d.sourceHandle === r || d.target === t && d.targetHandle === r;
    return s && n.push(d.id), !s;
  }), droppedIds: n };
}
const we = /^[a-z][a-z0-9_]*$/, be = 40;
function pe(e) {
  return typeof e == "string" && e.length <= be && we.test(e);
}
function W(e, t, r) {
  const n = e?.el ?? e?._container;
  if (!n || typeof n.dispatchEvent != "function")
    return;
  const i = [], d = typeof window < "u" ? window : void 0, s = (c) => {
    i.push(c.error ?? c.message), c.preventDefault();
  };
  d && typeof d.addEventListener == "function" && d.addEventListener("error", s, !0);
  try {
    n.dispatchEvent(new CustomEvent(t, { detail: r, bubbles: !0 }));
  } catch (c) {
    i.push(c);
  } finally {
    d && typeof d.removeEventListener == "function" && d.removeEventListener("error", s, !0);
  }
  for (const c of i)
    console.error("[alpineflow/schema] listener threw while handling", t, c);
}
function V(e, t) {
  return e?.nodes?.find((r) => r.id === t) ?? null;
}
function Se(e, t, r) {
  const n = V(e, t);
  return n ? pe(r?.name) ? (n.data || (n.data = { label: t, fields: [] }), (n.data.fields ?? []).some((d) => d.name === r.name) ? { applied: !1, reason: "duplicate" } : (Array.isArray(n.data.fields) || (n.data.fields = []), n.data.fields.push({ ...r }), W(e, "schema:field-added", { nodeId: t, field: { ...r } }), { applied: !0 })) : { applied: !1, reason: "invalid-name" } : { applied: !1, reason: "no-node" };
}
function Ae(e, t, r, n) {
  if (r === n)
    return { applied: !1, reason: "unchanged", cascadedEdgeIds: [] };
  if (!pe(n))
    return { applied: !1, reason: "invalid-name", cascadedEdgeIds: [] };
  const i = V(e, t);
  if (!i)
    return { applied: !1, reason: "no-node", cascadedEdgeIds: [] };
  const d = i.data?.fields ?? [], s = d.find((u) => u.name === r);
  if (!s)
    return { applied: !1, reason: "no-field", cascadedEdgeIds: [] };
  if (d.some((u) => u.name === n))
    return { applied: !1, reason: "duplicate", cascadedEdgeIds: [] };
  s.name = n;
  const c = e.edges ?? [], { edges: o, cascadedIds: a } = Ee(c, t, r, n);
  if (a.length > 0) {
    const u = new Map(o.map((l) => [l.id, l]));
    for (const l of e.edges) {
      const m = u.get(l.id);
      !m || m === l || (l.sourceHandle !== m.sourceHandle && (l.sourceHandle = m.sourceHandle), l.targetHandle !== m.targetHandle && (l.targetHandle = m.targetHandle));
    }
  }
  return W(e, "schema:field-renamed", {
    nodeId: t,
    oldName: r,
    newName: n,
    cascadedEdgeIds: a
  }), a.length > 0 && W(e, "schema:edges-cascaded", {
    nodeId: t,
    fieldName: n,
    edgeIds: a,
    operation: "rename"
  }), { applied: !0, cascadedEdgeIds: a };
}
function Ie(e, t, r) {
  const n = V(e, t);
  if (!n)
    return { applied: !1, reason: "no-node", droppedEdgeIds: [] };
  const d = (n.data?.fields ?? []).findIndex((o) => o.name === r);
  if (d === -1)
    return { applied: !1, reason: "no-field", droppedEdgeIds: [] };
  n.data.fields.splice(d, 1);
  const s = e.edges ?? [], { droppedIds: c } = ve(s, t, r);
  if (c.length > 0) {
    const o = new Set(c);
    for (let a = e.edges.length - 1; a >= 0; a--)
      o.has(e.edges[a].id) && e.edges.splice(a, 1);
    e._rebuildEdgeMap?.();
  }
  return W(e, "schema:field-removed", {
    nodeId: t,
    fieldName: r,
    droppedEdgeIds: c
  }), c.length > 0 && W(e, "schema:edges-cascaded", {
    nodeId: t,
    fieldName: r,
    edgeIds: c,
    operation: "remove"
  }), { applied: !0, droppedEdgeIds: c };
}
function Ne(e, t, r) {
  if (!Array.isArray(r))
    return { applied: !1, reason: "mismatch" };
  if (new Set(r).size !== r.length)
    return { applied: !1, reason: "mismatch" };
  const n = V(e, t);
  if (!n)
    return { applied: !1, reason: "no-node" };
  const i = n.data?.fields ?? [];
  if (r.length !== i.length)
    return { applied: !1, reason: "mismatch" };
  const d = new Set(i.map((a) => a.name)), s = new Set(r);
  if (d.size !== s.size)
    return { applied: !1, reason: "mismatch" };
  for (const a of r)
    if (!d.has(a))
      return { applied: !1, reason: "mismatch" };
  const c = /* @__PURE__ */ Object.create(null);
  for (const a of i)
    c[a.name] = a;
  const o = r.map((a) => c[a]);
  return n.data.fields.splice(0, n.data.fields.length, ...o), { applied: !0 };
}
function me(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e)
    t.set(n.id, n);
  const r = [];
  for (const n of e) {
    const i = n.data?.fields ?? [];
    for (const d of i) {
      if (typeof d?.name != "string" || !d.name.endsWith("_id"))
        continue;
      const s = d.name.slice(0, -3);
      if (!s)
        continue;
      const c = t.get(s);
      if (!c || c.id === n.id)
        continue;
      const o = c.data?.fields ?? [], u = o.find((l) => l.key === "primary")?.name ?? o[0]?.name ?? "id";
      r.push({
        fromNodeId: n.id,
        fromFieldName: d.name,
        toNodeId: c.id,
        toFieldName: u,
        confidence: "exact"
      });
    }
  }
  return r;
}
function Ce(e, t) {
  return e === t ? !0 : e === void 0 || t === void 0 ? e === t : JSON.stringify(e) === JSON.stringify(t);
}
function se(e, t, r = {}) {
  const n = r.deleteMissing ?? !0, i = new Map(e.map((s) => [s.id, s])), d = [];
  for (const s of t) {
    const c = i.get(s.id);
    if (!c) {
      d.push(s);
      continue;
    }
    if (n)
      for (const o of Object.keys(c))
        o !== "id" && !(o in s) && delete c[o];
    for (const [o, a] of Object.entries(s))
      o === "id" || o === "__proto__" || o === "constructor" || o === "prototype" || Ce(c[o], a) || (c[o] = a);
    d.push(c);
  }
  return d;
}
function K(e) {
  const t = (e.nodes ?? []).map((n) => ({
    id: n.id,
    label: n.data?.label ?? "",
    fields: (n.data?.fields ?? []).map((i) => ({ ...i })),
    position: { x: n.position?.x ?? 0, y: n.position?.y ?? 0 }
  })), r = (e.edges ?? []).map((n) => {
    const i = { id: n.id, source: n.source, target: n.target };
    return n.sourceHandle !== void 0 && (i.sourceHandle = n.sourceHandle), n.targetHandle !== void 0 && (i.targetHandle = n.targetHandle), n.label !== void 0 && (i.label = n.label), i;
  });
  return { version: 1, nodes: t, edges: r };
}
function ge(e, t) {
  if (!t || typeof t.version != "number")
    throw new Error("[alpineflow/schema] schemaFromJSON: missing or invalid version");
  if (t.version !== 1)
    throw new Error(`[alpineflow/schema] schemaFromJSON: unsupported version ${t.version}`);
  const r = (t.nodes ?? []).map((s) => ({
    id: s.id,
    position: { x: s.position?.x ?? 0, y: s.position?.y ?? 0 },
    data: {
      label: s.label,
      fields: (s.fields ?? []).map((c) => ({ ...c }))
    }
  })), n = (t.edges ?? []).map((s) => {
    const c = { id: s.id, source: s.source, target: s.target };
    return s.sourceHandle !== void 0 && (c.sourceHandle = s.sourceHandle), s.targetHandle !== void 0 && (c.targetHandle = s.targetHandle), s.label !== void 0 && (c.label = s.label), c;
  }), i = se(e.nodes, r, { deleteMissing: !1 });
  e.nodes.splice(0, e.nodes.length, ...i);
  const d = se(e.edges, n, { deleteMissing: !1 });
  e.edges.splice(0, e.edges.length, ...d), e._rebuildNodeMap?.(), e._rebuildEdgeMap?.(), typeof requestAnimationFrame == "function" && requestAnimationFrame(() => {
    e._layoutAnimTick = (e._layoutAnimTick ?? 0) + 1;
  });
}
function Le(e, t) {
  for (const o of t)
    if (o && typeof o.source == "string" && o.source === o.target)
      return !0;
  const r = /* @__PURE__ */ new Map(), n = (o) => {
    let a = r.get(o);
    return a || (a = [], r.set(o, a)), a;
  };
  for (const o of e)
    o && typeof o.id == "string" && n(o.id);
  for (const o of t)
    !o || typeof o.source != "string" || typeof o.target != "string" || (n(o.source).push(o.target), n(o.target));
  const i = 0, d = 1, s = 2, c = /* @__PURE__ */ new Map();
  for (const o of r.keys())
    c.set(o, i);
  for (const o of r.keys()) {
    if (c.get(o) !== i) continue;
    const a = [{ node: o, idx: 0 }];
    for (c.set(o, d); a.length > 0; ) {
      const u = a[a.length - 1], l = r.get(u.node) ?? [];
      if (u.idx < l.length) {
        const m = l[u.idx++], g = c.get(m);
        if (g === d)
          return !0;
        g === i && (c.set(m, d), a.push({ node: m, idx: 0 }));
      } else
        c.set(u.node, s), a.pop();
    }
  }
  return !1;
}
function Re(e) {
  const t = [], r = Array.isArray(e?.nodes) ? e.nodes : [], n = Array.isArray(e?.edges) ? e.edges : [], i = /* @__PURE__ */ new Set(), d = /* @__PURE__ */ new Set();
  for (const o of r)
    !o || typeof o.id != "string" || (i.has(o.id) && d.add(o.id), i.add(o.id));
  for (const o of d)
    t.push({
      severity: "error",
      code: "duplicate-node-id",
      nodeId: o,
      message: `Duplicate node id "${o}".`
    });
  for (const o of r) {
    if (!o || typeof o.id != "string") continue;
    const a = Array.isArray(o.data?.fields) ? o.data.fields : [];
    if (a.length === 0) continue;
    const u = /* @__PURE__ */ new Set(), l = /* @__PURE__ */ new Set();
    for (const g of a)
      !g || typeof g.name != "string" || (u.has(g.name) && l.add(g.name), u.add(g.name));
    for (const g of l)
      t.push({
        severity: "error",
        code: "duplicate-field",
        nodeId: o.id,
        fieldName: g,
        message: `Duplicate field "${g}" on node "${o.id}".`
      });
    a.some((g) => g && g.key === "primary") || t.push({
      severity: "warning",
      code: "missing-primary-key",
      nodeId: o.id,
      message: `Node "${o.id}" has no primary-key field.`
    });
  }
  for (const o of n) {
    if (!o) continue;
    const a = typeof o.id == "string" ? o.id : void 0;
    (typeof o.source != "string" || !i.has(o.source)) && t.push({
      severity: "error",
      code: "dangling-edge",
      edgeId: a,
      nodeId: typeof o.source == "string" ? o.source : void 0,
      message: `Edge ${a ? `"${a}" ` : ""}references missing source node "${o.source}".`
    }), (typeof o.target != "string" || !i.has(o.target)) && t.push({
      severity: "error",
      code: "dangling-edge",
      edgeId: a,
      nodeId: typeof o.target == "string" ? o.target : void 0,
      message: `Edge ${a ? `"${a}" ` : ""}references missing target node "${o.target}".`
    });
  }
  const s = /* @__PURE__ */ new Set();
  for (const o of n)
    o && (typeof o.source == "string" && s.add(o.source), typeof o.target == "string" && s.add(o.target));
  for (const o of r)
    !o || typeof o.id != "string" || s.has(o.id) || t.push({
      severity: "warning",
      code: "disconnected-node",
      nodeId: o.id,
      message: `Node "${o.id}" has no connected edges.`
    });
  return Le(r, n) && t.push({
    severity: "warning",
    code: "cycle",
    message: "Directed cycle detected in edge graph."
  }), { valid: !t.some((o) => o.severity === "error"), issues: t };
}
function ie(e) {
  return !e || !Array.isArray(e.nodes) ? [] : e.nodes.filter((t) => !!t && typeof t.id == "string");
}
function de(e) {
  return !e || !Array.isArray(e.edges) ? [] : e.edges.filter((t) => !!t && typeof t.id == "string");
}
function ce(e) {
  const t = /* @__PURE__ */ new Map(), r = Array.isArray(e.fields) ? e.fields : [];
  for (const n of r)
    n && typeof n.name == "string" && t.set(n.name, n);
  return t;
}
function Fe(e, t, r = {}) {
  const n = ie(e), i = ie(t), d = de(e), s = de(t), c = /* @__PURE__ */ new Map();
  for (const f of n)
    c.set(f.id, f);
  const o = /* @__PURE__ */ new Map();
  for (const f of i)
    o.set(f.id, f);
  const a = [], u = [];
  for (const f of o.keys())
    c.has(f) || a.push(f);
  for (const f of c.keys())
    o.has(f) || u.push(f);
  const l = [], m = /* @__PURE__ */ new Set(), g = /* @__PURE__ */ new Set();
  if (r.detectRenames) {
    const f = (h) => (Array.isArray(h.fields) ? h.fields : []).filter((x) => x && typeof x.name == "string").map((x) => x.name).sort().join("\0");
    for (const h of u) {
      const I = c.get(h);
      if (!I) continue;
      const x = f(I), _ = [];
      for (const R of a) {
        if (m.has(R)) continue;
        const C = o.get(R);
        C && f(C) === x && _.push(R);
      }
      if (_.length === 1) {
        const R = _[0];
        l.push({ from: h, to: R }), m.add(R), g.add(h);
      }
    }
  }
  const v = a.filter((f) => !m.has(f)), b = u.filter((f) => !g.has(f)), p = [];
  for (const f of c.keys())
    o.has(f) && p.push({ beforeId: f, afterId: f });
  for (const f of l)
    p.push({ beforeId: f.from, afterId: f.to });
  const y = /* @__PURE__ */ new Map();
  for (const f of r.fieldRenames ?? []) {
    if (!f || typeof f.nodeId != "string" || typeof f.from != "string" || typeof f.to != "string") continue;
    let h = y.get(f.nodeId);
    h || (h = [], y.set(f.nodeId, h)), h.push({ from: f.from, to: f.to });
  }
  const w = /* @__PURE__ */ new Map();
  for (const f of l)
    w.set(f.from, f.to);
  for (const f of r.fieldRenames ?? []) {
    if (!f || typeof f.nodeId != "string") continue;
    const h = w.get(f.nodeId);
    if (h && !y.has(h)) {
      const I = y.get(f.nodeId) ?? [];
      y.set(h, I);
    }
  }
  const E = [], A = [], F = [], N = [];
  for (const { beforeId: f, afterId: h } of p) {
    const I = c.get(f), x = o.get(h);
    if (!I || !x) continue;
    const _ = ce(I), R = ce(x), C = y.get(h) ?? y.get(f) ?? [], P = /* @__PURE__ */ new Set(), Z = /* @__PURE__ */ new Set();
    for (const S of C) {
      const B = _.get(S.from), M = R.get(S.to);
      if (!B || !M || P.has(S.from) || Z.has(S.to)) continue;
      E.push({ nodeId: h, from: S.from, to: S.to }), P.add(S.from), Z.add(S.to);
      const j = typeof B.type == "string" ? B.type : "", z = typeof M.type == "string" ? M.type : "";
      j !== z && N.push({
        nodeId: h,
        fieldName: S.to,
        from: j,
        to: z
      });
    }
    for (const [S] of R)
      Z.has(S) || _.has(S) || A.push({ nodeId: h, fieldName: S });
    for (const [S] of _)
      P.has(S) || R.has(S) || F.push({ nodeId: h, fieldName: S });
    for (const [S, B] of _) {
      if (P.has(S)) continue;
      const M = R.get(S);
      if (!M) continue;
      const j = typeof B.type == "string" ? B.type : "", z = typeof M.type == "string" ? M.type : "";
      j !== z && N.push({
        nodeId: h,
        fieldName: S,
        from: j,
        to: z
      });
    }
  }
  const T = /* @__PURE__ */ new Set();
  for (const f of d) T.add(f.id);
  const $ = /* @__PURE__ */ new Set();
  for (const f of s) $.add(f.id);
  const D = [], q = [];
  for (const f of $)
    T.has(f) || D.push(f);
  for (const f of T)
    $.has(f) || q.push(f);
  v.sort(), b.sort(), l.sort((f, h) => f.from.localeCompare(h.from));
  const L = (f) => `${f.nodeId}\0${f.fieldName}`;
  return A.sort((f, h) => L(f).localeCompare(L(h))), F.sort((f, h) => L(f).localeCompare(L(h))), E.sort((f, h) => {
    const I = f.nodeId.localeCompare(h.nodeId);
    return I !== 0 ? I : f.from.localeCompare(h.from);
  }), N.sort((f, h) => L(f).localeCompare(L(h))), D.sort(), q.sort(), {
    addedNodes: v,
    removedNodes: b,
    renamedNodes: l,
    addedFields: A,
    removedFields: F,
    renamedFields: E,
    changedFieldTypes: N,
    addedEdges: D,
    removedEdges: q
  };
}
const xe = {
  rankdir: "LR",
  nodeShape: "plaintext",
  includeFieldTypes: !0,
  includeFieldKeys: !0,
  graphName: "schema"
};
function Y(e) {
  return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function H(e) {
  return e.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}
function Te(e, t) {
  const r = String(e?.id ?? ""), n = String(e?.data?.label ?? ""), i = Array.isArray(e?.data?.fields) ? e.data.fields : [], d = 1 + (t.includeFieldKeys ? 1 : 0) + (t.includeFieldTypes ? 1 : 0), s = [];
  s.push(
    `      <TR><TD BGCOLOR="#f0f0f0" COLSPAN="${d}"><B>${Y(n)}</B></TD></TR>`
  );
  for (const c of i) {
    const o = String(c?.name ?? ""), a = [];
    if (t.includeFieldKeys) {
      const u = c?.key === "primary" ? "PK" : c?.key === "foreign" ? "FK" : "";
      a.push(`<TD>${u}</TD>`);
    }
    a.push(`<TD PORT="${Y(o)}">${Y(o)}</TD>`), t.includeFieldTypes && a.push(`<TD>${Y(String(c?.type ?? ""))}</TD>`), s.push(`      <TR>${a.join("")}</TR>`);
  }
  return `  "${H(r)}" [label=<
    <TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0" CELLPADDING="4">
${s.join(`
`)}
    </TABLE>
  >];`;
}
function _e(e) {
  const t = `"${H(String(e?.source ?? ""))}"`, r = `"${H(String(e?.target ?? ""))}"`, n = e?.sourceHandle ? `:"${H(String(e.sourceHandle))}"` : "", i = e?.targetHandle ? `:"${H(String(e.targetHandle))}"` : "", d = e?.label ? ` [label="${H(String(e.label))}"]` : "";
  return `  ${t}${n} -> ${r}${i}${d};`;
}
function De(e, t = {}) {
  const r = { ...xe, ...t }, n = [];
  n.push(`digraph "${H(r.graphName)}" {`), n.push(`  rankdir=${r.rankdir};`), n.push(`  node [shape=${r.nodeShape}];`);
  for (const i of e?.nodes ?? [])
    n.push(Te(i, r));
  for (const i of e?.edges ?? [])
    n.push(_e(i));
  return n.push("}"), n.join(`
`);
}
const ke = ["dagre", "tree", "grid"];
async function $e(e, t = {}) {
  const r = t.direction ?? "LR", n = t.nodeSpacing ?? 80, i = t.rankSpacing ?? 160, d = Me(t.algorithm), s = t.deriveFromReferences ? He(e) : null;
  try {
    for (const c of d) {
      if (c === "dagre" && Oe(e, r, n, i) || c === "tree" && qe(e, r, n, i))
        return;
      if (c === "grid") {
        Pe(e.nodes ?? [], n, i, r);
        return;
      }
    }
    console.warn(
      '[alpineflow/schema] schemaLayout: no layout algorithm available. Register @getartisanflow/alpineflow/dagre (or hierarchy), or pass { algorithm: "grid" } for the always-available fallback.'
    );
  } finally {
    s && s.restore();
  }
}
function Me(e) {
  return e ? [e] : [...ke];
}
function He(e) {
  const t = e.edges;
  if (!Array.isArray(t))
    return null;
  const r = t.slice(), n = me(e.nodes ?? []).map((i, d) => ({
    id: `schema-layout-inferred-${d}`,
    source: i.fromNodeId,
    target: i.toNodeId,
    sourceHandle: i.fromFieldName,
    targetHandle: i.toFieldName
  }));
  return t.splice(0, t.length, ...n), {
    restore: () => {
      t.splice(0, t.length, ...r);
    }
  };
}
function Oe(e, t, r, n) {
  if (typeof e.layout != "function")
    return !1;
  try {
    return e.layout({
      direction: t,
      nodesep: r,
      ranksep: n
    }), !0;
  } catch {
    return !1;
  }
}
function qe(e, t, r, n) {
  if (typeof e.treeLayout != "function")
    return !1;
  try {
    return e.treeLayout({
      direction: t,
      nodeWidth: r + 200,
      nodeHeight: n + 80
    }), !0;
  } catch {
    return !1;
  }
}
function Pe(e, t, r, n) {
  const i = e.length;
  if (i === 0)
    return;
  const d = Math.max(1, Math.ceil(Math.sqrt(i))), s = Math.ceil(i / d), c = t + 300, o = r + 200;
  for (let a = 0; a < i; a++) {
    const u = a % d, l = Math.floor(a / d);
    let m = u * c, g = l * o;
    n === "BT" ? g = (s - 1 - l) * o : n === "RL" && (m = (d - 1 - u) * c), e[a].position = { x: m, y: g };
  }
}
const ae = [
  "schema:field-added",
  "schema:field-renamed",
  "schema:field-removed",
  "schema:edges-cascaded"
];
function ct(e, t = {}) {
  const r = Math.max(1, t.limit ?? 50), n = [], i = [];
  let d = 0, s = 0, c = null, o = !1;
  const a = e?.el ?? e?._container ?? null;
  if (!a || typeof a.addEventListener != "function")
    return Be();
  const u = () => {
    for (; n.length > r && n.length > 1; )
      n.shift();
  }, l = (p) => {
    const y = n[n.length - 1];
    y !== void 0 && JSON.stringify(y) === JSON.stringify(p) || (n.push(p), u(), i.length = 0);
  }, m = () => {
    o || d > 0 || s > 0 || l(K(e));
  };
  n.push(K(e));
  const g = () => {
    m();
  };
  for (const p of ae)
    a.addEventListener(p, g);
  const v = (p) => {
    d++;
    try {
      ge(e, p);
    } finally {
      d--;
    }
  };
  return {
    get canUndo() {
      return n.length > 1;
    },
    get canRedo() {
      return i.length > 0;
    },
    undo() {
      if (o || n.length <= 1)
        return !1;
      const p = n.pop();
      i.push(p);
      const y = n[n.length - 1];
      return v(y), !0;
    },
    redo() {
      if (o || i.length === 0)
        return !1;
      const p = i.pop();
      return n.push(p), v(p), !0;
    },
    clear() {
      n.length = 0, i.length = 0, o || n.push(K(e));
    },
    batch(p) {
      if (o)
        return p();
      s === 0 && (c = K(e)), s++;
      try {
        const y = p();
        return s--, s === 0 && (c = null, d === 0 && !o && l(K(e))), y;
      } catch (y) {
        if (s--, s === 0) {
          const w = c;
          c = null, w && !o && v(w);
        }
        throw y;
      }
    },
    dispose() {
      if (!o) {
        o = !0;
        for (const p of ae)
          a.removeEventListener(p, g);
        n.length = 0, i.length = 0, c = null;
      }
    }
  };
}
function Be() {
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
const Ke = {
  "controls.label": "Flow controls",
  "controls.zoomIn": "Zoom in",
  "controls.zoomOut": "Zoom out",
  "controls.fitView": "Fit view",
  "controls.toggleInteractive": "Toggle interactivity",
  "controls.lockInteractive": "Lock interactivity",
  "controls.unlockInteractive": "Unlock interactivity",
  "controls.resetPanels": "Reset panels",
  "controls.toggleFullscreen": "Toggle fullscreen",
  "controls.enterFullscreen": "Enter fullscreen",
  "controls.exitFullscreen": "Exit fullscreen",
  "canvas.label": "Flow diagram",
  "canvas.loading": "Loading…",
  "canvas.selectionMode": "Selection Mode — tap with two fingers to exit",
  "a11y.nodeLabel": "Node: :label",
  "a11y.nodeId": "Node :id",
  "a11y.edgeLabel": "Edge: :label",
  "a11y.edgeEndpoints": "Edge from :source to :target",
  "a11y.sourceHandle": "source handle :id",
  "a11y.targetHandle": "target handle :id",
  "a11y.addControlPoint": "Double-click to add control point",
  "announce.nodeAdded": "Added node: :label",
  "announce.nodesAdded_one": "Added :count node",
  "announce.nodesAdded_other": "Added :count nodes",
  "announce.nodeRemoved": "Removed node: :label",
  "announce.nodesRemoved_one": "Removed :count node",
  "announce.nodesRemoved_other": "Removed :count nodes",
  "announce.connected": "Connected :source to :target",
  "announce.connectionsAdded_one": "Added :count connection",
  "announce.connectionsAdded_other": "Added :count connections",
  "announce.disconnected": "Removed connection from :source to :target",
  "announce.connectionsRemoved_one": "Removed :count connection",
  "announce.connectionsRemoved_other": "Removed :count connections",
  "announce.selectionCleared": "Selection cleared",
  "announce.nodesSelected_one": ":count node",
  "announce.nodesSelected_other": ":count nodes",
  "announce.edgesSelected_one": ":count edge",
  "announce.edgesSelected_other": ":count edges",
  "announce.selectionJoin": ":nodes and :edges",
  "announce.selected": ":items selected",
  "announce.viewportZoom": "Viewport: zoom :percent%",
  "announce.viewFitted": "Fitted view to content",
  "announce.node": "node",
  "announce.reparented": "Moved :name into :parent",
  "announce.detached": "Detached :name from :parent",
  "workflow.condition": "Condition",
  "workflow.customEvaluator": "[custom evaluator]",
  "workflow.wait": "Wait",
  "schema.inspector.noNode": "No node selected.",
  "schema.inspector.noEdge": "No edge selected.",
  "schema.inspector.noRow": "No row selected.",
  "schema.inspector.missingRow": "Selected row no longer exists.",
  "schema.inspector.label": "label",
  "schema.inspector.name": "name",
  "schema.inspector.type": "type",
  "schema.inspector.required": "required",
  "schema.inspector.remove": "remove",
  "schema.inspector.delete": "delete",
  "schema.inspector.add": "add",
  "schema.inspector.fieldName": "field name"
}, Ue = Ke, G = "en", le = /* @__PURE__ */ new Map();
function Q(e) {
  const r = e.trim().replace(/_/g, "-") || G;
  let n = le.get(r);
  if (!n) {
    try {
      n = new Intl.PluralRules(r);
    } catch {
      n = Q(G);
    }
    le.set(r, n);
  }
  return n;
}
function U(e) {
  return typeof e == "string" && e !== "" ? e : void 0;
}
function fe(e, t, r, n) {
  return r === void 0 ? U(e[t]) ?? U(e[`${t}_other`]) : U(e[`${t}_${n.select(r)}`]) ?? U(e[`${t}_other`]) ?? U(e[t]);
}
const ue = /* @__PURE__ */ new Map();
function Je(e, t) {
  const r = Object.keys(t).sort((d, s) => s.length - d.length);
  if (r.length === 0) return e;
  const n = r.join("\0");
  let i = ue.get(n);
  return i || (i = new RegExp(`:(${r.map((d) => d.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "g"), ue.set(n, i)), e.replace(i, (d, s) => String(t[s]));
}
function je(e, t) {
  const r = {};
  for (const [d, s] of Object.entries({})) {
    const c = U(s);
    c !== void 0 && (r[d] = c);
  }
  const n = Q(t), i = Q(G);
  return (d, s = {}) => {
    const c = typeof s.count == "number" ? s.count : void 0, o = fe(r, d, c, n) ?? fe(Ue, d, c, i) ?? d;
    return Je(o, s);
  };
}
const ze = je(void 0, G);
function ee(e) {
  const t = e;
  return typeof t?.t != "function" ? ze : (r, n) => t.t(r, n);
}
function k(e) {
  if (!e || e.size === 0)
    return null;
  let t = null;
  for (const r of e)
    t = r;
  return t;
}
function We(e) {
  if (!e)
    return null;
  const t = e.indexOf(".");
  return t < 1 || t === e.length - 1 ? null : { nodeId: e.slice(0, t), fieldName: e.slice(t + 1) };
}
function te(e, t) {
  const r = t.closest(".flow-container");
  if (r)
    try {
      return e.$data(r) ?? null;
    } catch {
    }
  const n = document.querySelectorAll(".flow-container");
  if (n.length === 1)
    try {
      return e.$data(n[0]) ?? null;
    } catch {
    }
  return n.length > 1 && !window.__alpineflowSchemaMultiCanvasWarned && (window.__alpineflowSchemaMultiCanvasWarned = !0, console.warn(
    "[alpineflow/schema] inspector directive found multiple .flow-container elements on the page; place inspector inside the canvas OR scope the directive expression to a specific canvas (multi-canvas scope selector is on the v0.2.2 roadmap)."
  )), null;
}
function ne(e) {
  return e.querySelector(
    ":scope > template[x-schema-default-ui]"
  );
}
function J(e) {
  const t = e.querySelector(":scope > [data-schema-default-ui-root]");
  t && t.remove();
}
function oe(e) {
  const t = document.createElement("div");
  return t.setAttribute("data-schema-default-ui-root", ""), e.appendChild(t), t;
}
function re(e) {
  if (!e)
    return null;
  const t = document.activeElement;
  if (!t || !(t instanceof HTMLElement) || !e.contains(t))
    return null;
  const r = t.getAttribute("data-field");
  if (!r)
    return null;
  let n = null, i = null;
  if (t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement)
    try {
      n = t.selectionStart, i = t.selectionEnd;
    } catch {
    }
  return {
    field: r,
    tagName: t.tagName.toLowerCase(),
    selectionStart: n,
    selectionEnd: i
  };
}
function Ye(e) {
  return typeof globalThis.CSS < "u" && typeof globalThis.CSS.escape == "function" ? globalThis.CSS.escape(e) : e.replace(/["\\]/g, "\\$&");
}
function O(e, t) {
  if (!e || !t)
    return;
  const r = e.querySelector(
    `[data-field="${Ye(t.field)}"]`
  );
  if (r && r.tagName.toLowerCase() === t.tagName)
    try {
      r.focus({ preventScroll: !0 }), (r instanceof HTMLInputElement || r instanceof HTMLTextAreaElement) && t.selectionStart !== null && t.selectionEnd !== null && r.setSelectionRange(t.selectionStart, t.selectionEnd);
    } catch {
    }
}
function Ge(e) {
  e.directive(
    "schema-node-inspector",
    (t, r, { effect: n, cleanup: i }) => {
      const d = t, s = te(e, d);
      if (!s)
        return;
      const c = ne(d), o = {
        addField(u) {
          const l = k(s.selectedNodes);
          return l ? s.addField?.(l, u) ?? { applied: !1, reason: "no-helper" } : { applied: !1, reason: "no-selection" };
        },
        renameField(u, l) {
          const m = k(s.selectedNodes);
          return m ? s.renameField?.(m, u, l) ?? {
            applied: !1,
            reason: "no-helper",
            cascadedEdgeIds: []
          } : { applied: !1, reason: "no-selection", cascadedEdgeIds: [] };
        },
        removeField(u) {
          const l = k(s.selectedNodes);
          return l ? s.removeField?.(l, u) ?? {
            applied: !1,
            reason: "no-helper",
            droppedEdgeIds: []
          } : { applied: !1, reason: "no-selection", droppedEdgeIds: [] };
        },
        reorderFields(u) {
          const l = k(s.selectedNodes);
          return l ? s.reorderFields?.(l, u) ?? {
            applied: !1,
            reason: "no-helper"
          } : { applied: !1, reason: "no-selection" };
        }
      }, a = e.addScopeToNode(d, {
        inspector: o,
        get selectedNode() {
          const u = k(s.selectedNodes);
          return u ? s.nodes?.find((l) => l.id === u) ?? null : null;
        }
      });
      c && n(() => {
        Ve(d, s);
      }), i(() => {
        J(d), a?.();
      });
    }
  );
}
function Ve(e, t) {
  const r = ee(t), n = e.querySelector(
    ":scope > [data-schema-default-ui-root]"
  ), i = re(n);
  J(e);
  const d = oe(e), s = k(t.selectedNodes), c = s ? t.nodes?.find((p) => p.id === s) : null;
  if (!c) {
    const p = document.createElement("div");
    p.setAttribute("data-schema-inspector-empty", ""), p.textContent = r("schema.inspector.noNode"), d.appendChild(p), O(d, i);
    return;
  }
  const o = document.createElement("header");
  o.setAttribute("data-schema-inspector-label", ""), o.textContent = String(c.data?.label ?? c.id), d.appendChild(o);
  const a = document.createElement("ul");
  a.setAttribute("data-schema-inspector-fields", "");
  const u = Array.isArray(c.data?.fields) ? c.data.fields : [];
  for (const p of u) {
    const y = document.createElement("li");
    y.setAttribute("data-schema-inspector-field", ""), y.dataset.fieldName = String(p?.name ?? "");
    const w = document.createElement("span");
    if (w.textContent = String(p?.name ?? ""), y.appendChild(w), p?.type) {
      const A = document.createElement("span");
      A.setAttribute("data-field-type", ""), A.textContent = String(p.type), y.appendChild(A);
    }
    const E = document.createElement("button");
    E.type = "button", E.setAttribute("data-action", "remove"), E.textContent = r("schema.inspector.remove"), E.addEventListener("click", () => {
      t.removeField?.(c.id, p.name);
    }), y.appendChild(E), a.appendChild(y);
  }
  d.appendChild(a);
  const l = document.createElement("form");
  l.setAttribute("data-schema-inspector-add-field", "");
  const m = document.createElement("input");
  m.setAttribute("data-field", "name"), m.placeholder = r("schema.inspector.fieldName"), l.appendChild(m);
  const g = Array.isArray(t._config?.fieldTypeRegistry) ? t._config.fieldTypeRegistry : null;
  let v;
  if (g && g.length > 0) {
    const p = document.createElement("select");
    p.setAttribute("data-field", "type");
    for (const y of g) {
      const w = document.createElement("option");
      w.value = y, w.textContent = y, p.appendChild(w);
    }
    p.value = g[0], v = p;
  } else {
    const p = document.createElement("input");
    p.setAttribute("data-field", "type"), p.placeholder = r("schema.inspector.type"), p.value = "text", v = p;
  }
  l.appendChild(v);
  const b = document.createElement("button");
  b.type = "submit", b.textContent = r("schema.inspector.add"), l.appendChild(b), l.addEventListener("submit", (p) => {
    p.preventDefault();
    const y = m.value.trim();
    if (!y)
      return;
    const w = v.value, E = (typeof w == "string" ? w.trim() : "") || "text";
    t.addField?.(c.id, { name: y, type: E })?.applied && (m.value = "");
  }), d.appendChild(l), O(d, i);
}
function Ze(e) {
  e.directive(
    "schema-row-inspector",
    (t, r, { effect: n, cleanup: i }) => {
      const d = t, s = te(e, d);
      if (!s)
        return;
      const c = ne(d), o = () => We(k(s.selectedRows)), a = () => {
        const m = o();
        if (!m)
          return null;
        const g = s.nodes?.find((b) => b.id === m.nodeId);
        return g ? (g.data?.fields ?? []).find((b) => b?.name === m.fieldName) ?? null : null;
      }, u = {
        renameField(m) {
          const g = o();
          return g ? s.renameField?.(g.nodeId, g.fieldName, m) ?? {
            applied: !1,
            reason: "no-helper",
            cascadedEdgeIds: []
          } : { applied: !1, reason: "no-selection", cascadedEdgeIds: [] };
        },
        removeField() {
          const m = o();
          return m ? s.removeField?.(m.nodeId, m.fieldName) ?? {
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
        updateField(m) {
          const g = a();
          if (!g)
            return { applied: !1, reason: "no-selection" };
          for (const [v, b] of Object.entries(m))
            v !== "name" && (g[v] = b);
          return { applied: !0 };
        }
      }, l = e.addScopeToNode(d, {
        inspector: u,
        get selectedRow() {
          return o();
        }
      });
      c && n(() => {
        Xe(d, s, o());
      }), i(() => {
        J(d), l?.();
      });
    }
  );
}
function Xe(e, t, r) {
  const n = ee(t), i = e.querySelector(
    ":scope > [data-schema-default-ui-root]"
  ), d = re(i);
  J(e);
  const s = oe(e);
  if (!r) {
    const p = document.createElement("div");
    p.setAttribute("data-schema-inspector-empty", ""), p.textContent = n("schema.inspector.noRow"), s.appendChild(p), O(s, d);
    return;
  }
  const o = t.nodes?.find((p) => p.id === r.nodeId)?.data?.fields?.find((p) => p?.name === r.fieldName) ?? null;
  if (!o) {
    const p = document.createElement("div");
    p.setAttribute("data-schema-inspector-empty", ""), p.textContent = n("schema.inspector.missingRow"), s.appendChild(p), O(s, d);
    return;
  }
  const a = document.createElement("label");
  a.textContent = n("schema.inspector.name") + " ";
  const u = document.createElement("input");
  u.setAttribute("data-field", "name"), u.value = String(o.name ?? ""), u.addEventListener("change", () => {
    const p = u.value.trim();
    !p || p === o.name || t.renameField?.(r.nodeId, r.fieldName, p);
  }), a.appendChild(u), s.appendChild(a);
  const l = document.createElement("label");
  l.textContent = n("schema.inspector.type") + " ";
  const m = document.createElement("input");
  m.setAttribute("data-field", "type"), m.value = String(o.type ?? ""), m.addEventListener("change", () => {
    o.type = m.value;
  }), l.appendChild(m), s.appendChild(l);
  const g = document.createElement("label");
  g.textContent = n("schema.inspector.required") + " ";
  const v = document.createElement("input");
  v.type = "checkbox", v.setAttribute("data-field", "required"), v.checked = !!o.required, v.addEventListener("change", () => {
    o.required = v.checked;
  }), g.appendChild(v), s.appendChild(g);
  const b = document.createElement("button");
  b.type = "button", b.setAttribute("data-action", "remove"), b.textContent = n("schema.inspector.remove"), b.addEventListener("click", () => {
    t.removeField?.(r.nodeId, r.fieldName);
  }), s.appendChild(b), O(s, d);
}
function Qe(e) {
  e.directive(
    "schema-edge-inspector",
    (t, r, { effect: n, cleanup: i }) => {
      const d = t, s = te(e, d);
      if (!s)
        return;
      const c = ne(d), o = () => {
        const l = k(s.selectedEdges);
        return l ? s.edges?.find((m) => m.id === l) ?? null : null;
      }, a = {
        updateEdge(l) {
          const m = o();
          if (!m)
            return { applied: !1, reason: "no-selection" };
          for (const [g, v] of Object.entries(l))
            m[g] = v;
          return { applied: !0 };
        },
        setLabel(l) {
          return this.updateEdge({ label: l });
        },
        removeEdge() {
          const l = o();
          if (!l)
            return { applied: !1, reason: "no-selection" };
          if (typeof s.removeEdges == "function")
            return s.removeEdges([l.id]), { applied: !0 };
          const m = s.edges?.findIndex((g) => g.id === l.id) ?? -1;
          return m === -1 ? { applied: !1, reason: "no-helper" } : (s.edges.splice(m, 1), { applied: !0 });
        }
      }, u = e.addScopeToNode(d, {
        inspector: a,
        get selectedEdge() {
          return o();
        }
      });
      c && n(() => {
        et(d, s, o());
      }), i(() => {
        J(d), u?.();
      });
    }
  );
}
function et(e, t, r) {
  const n = ee(t), i = e.querySelector(
    ":scope > [data-schema-default-ui-root]"
  ), d = re(i);
  J(e);
  const s = oe(e);
  if (!r) {
    const u = document.createElement("div");
    u.setAttribute("data-schema-inspector-empty", ""), u.textContent = n("schema.inspector.noEdge"), s.appendChild(u), O(s, d);
    return;
  }
  const c = document.createElement("label");
  c.textContent = n("schema.inspector.label") + " ";
  const o = document.createElement("input");
  o.setAttribute("data-field", "label"), o.value = String(r.label ?? ""), o.addEventListener("input", () => {
    r.label = o.value;
  }), c.appendChild(o), s.appendChild(c);
  const a = document.createElement("button");
  a.type = "button", a.setAttribute("data-action", "delete"), a.textContent = n("schema.inspector.delete"), a.addEventListener("click", () => {
    if (typeof t.removeEdges == "function")
      t.removeEdges([r.id]);
    else {
      const u = t.edges?.findIndex((l) => l.id === r.id) ?? -1;
      u !== -1 && t.edges.splice(u, 1);
    }
  }), s.appendChild(a), O(s, d);
}
const tt = 4;
function nt(e) {
  e.directive(
    "schema-reorderable",
    (t, r, { cleanup: n }) => {
      const i = t;
      i.classList.add("flow-schema-reorderable"), i.style.touchAction = "none";
      let d = !1, s = !1, c = 0, o = 0, a = 0, u = null;
      const l = () => {
        const E = i.parentElement;
        return E ? Array.from(
          E.querySelectorAll(":scope > .flow-schema-row")
        ) : [];
      }, m = () => {
        for (const E of l())
          E.classList.remove("flow-schema-row-drop-target");
      }, g = (E) => {
        const A = i.parentElement;
        if (!A) return o;
        const F = Array.from(
          A.querySelectorAll(":scope > .flow-schema-row")
        ).filter((T) => T !== i);
        if (F.length === 0) return o;
        let N = 0;
        for (const T of F) {
          const $ = T.getBoundingClientRect();
          $.top + $.height / 2 < E && N++;
        }
        return N;
      }, v = (E) => {
        m();
        const A = l();
        let F = E;
        E >= o && (F = E + 1);
        const N = A[F] ?? A[E];
        N && N !== i && N.classList.add("flow-schema-row-drop-target");
      }, b = () => {
        i.style.transform = "", i.classList.remove("flow-schema-row-dragging"), m();
      }, p = (E) => {
        if (d || E.button !== void 0 && E.button !== 0) return;
        d = !0, s = !1, c = E.clientY, u = E.pointerId ?? null, o = l().indexOf(i), a = o, i.classList.add("flow-schema-row-dragging");
        try {
          u !== null && typeof i.setPointerCapture == "function" && i.setPointerCapture(u);
        } catch {
        }
        document.addEventListener("pointermove", y), document.addEventListener("pointerup", w), document.addEventListener("pointercancel", w);
      }, y = (E) => {
        if (!d) return;
        const A = E.clientY - c;
        !s && Math.abs(A) > tt && (s = !0), i.style.transform = `translateY(${A}px)`, s && (a = g(E.clientY), v(a));
      }, w = (E) => {
        if (!d) return;
        const A = s, F = a, N = o;
        try {
          u !== null && typeof i.releasePointerCapture == "function" && typeof i.hasPointerCapture == "function" && i.hasPointerCapture(u) && i.releasePointerCapture(u);
        } catch {
        }
        if (document.removeEventListener("pointermove", y), document.removeEventListener("pointerup", w), document.removeEventListener("pointercancel", w), d = !1, u = null, b(), !A)
          return;
        const T = (C) => {
          C.stopImmediatePropagation(), C.stopPropagation(), C.preventDefault();
        };
        i.addEventListener("click", T, { capture: !0, once: !0 }), setTimeout(() => {
          i.removeEventListener("click", T, { capture: !0 });
        }, 0);
        const D = i.closest("[data-flow-node-id]")?.getAttribute("data-flow-node-id") ?? null;
        if (!D) return;
        const q = i.closest(".flow-container");
        if (!q) return;
        let L;
        try {
          L = e.$data(q);
        } catch {
          return;
        }
        if (!L || typeof L.reorderFields != "function") return;
        const h = (L.nodes ?? []).find((C) => C?.id === D)?.data?.fields ?? [];
        if (!Array.isArray(h) || h.length < 2) return;
        const I = h.map((C) => C.name);
        if (N < 0 || N >= I.length) return;
        const [x] = I.splice(N, 1), _ = Math.max(0, Math.min(F, I.length));
        I.splice(_, 0, x), !I.every(
          (C, P) => h[P]?.name === C
        ) && L.reorderFields(D, I);
      };
      i.addEventListener("pointerdown", p), n(() => {
        try {
          i.removeEventListener("pointerdown", p), typeof document < "u" && (document.removeEventListener("pointermove", y), document.removeEventListener("pointerup", w), document.removeEventListener("pointercancel", w)), i.classList.remove("flow-schema-reorderable"), i.classList.remove("flow-schema-row-dragging"), m(), i.style.transform = "", i.style.touchAction = "";
        } catch {
        }
      });
    }
  );
}
function ot(e) {
  const t = e.parentElement;
  return t ? Array.from(
    t.querySelectorAll(":scope > .flow-schema-row")
  ) : [];
}
function rt(e, t) {
  const r = ot(e), n = r.indexOf(e);
  if (n === -1) return;
  const i = r[n + t];
  i && i.focus();
}
function st(e, t) {
  const r = e.closest("[data-flow-node-id]");
  if (!r) return !1;
  const n = e.closest(".flow-container");
  if (!n) return !1;
  const i = Array.from(
    n.querySelectorAll("[data-flow-node-id]")
  ), d = i.indexOf(r);
  if (d === -1) return !1;
  const s = i[d + t];
  if (!s) return !1;
  const c = t === 1 ? s.querySelector(".flow-schema-row") : (() => {
    const o = s.querySelectorAll(".flow-schema-row");
    return o.length > 0 ? o[o.length - 1] : null;
  })();
  return c ? (c.focus(), !0) : !1;
}
function it(e) {
  e.click();
}
function dt(e) {
  e.directive(
    "schema-keyboard-nav",
    (t, r, { effect: n, cleanup: i }) => {
      const d = t;
      d.setAttribute("tabindex", "0"), d.setAttribute("role", "row"), n(() => {
        const c = d.dataset.flowSchemaField ?? "", a = d.querySelector(".flow-schema-row-type")?.textContent ?? "";
        d.setAttribute(
          "aria-label",
          `${c}${a ? " (" + a + ")" : ""}`
        );
      });
      const s = (c) => {
        const o = c.key;
        if (o === "ArrowDown" || o === "ArrowUp") {
          c.preventDefault(), c.stopPropagation(), rt(d, o === "ArrowDown" ? 1 : -1);
          return;
        }
        if (o === "Tab") {
          st(d, c.shiftKey ? -1 : 1) && c.preventDefault();
          return;
        }
        if (o === "Enter" || o === " ") {
          c.preventDefault(), it(d);
          return;
        }
        if (o === "Escape") {
          d.blur();
          return;
        }
      };
      d.addEventListener("keydown", s), i(() => {
        try {
          d.removeEventListener("keydown", s), d.removeAttribute("tabindex"), d.removeAttribute("role"), d.removeAttribute("aria-label");
        } catch {
        }
      });
    }
  );
}
function at(e) {
  e && typeof e.directive == "function" && (Ge(e), Ze(e), Qe(e), nt(e), dt(e)), ye("schema", {
    setup(t) {
      !t.el && t._container && (t.el = t._container), t.addField = function(r, n) {
        return Se(this, r, n);
      }, t.renameField = function(r, n, i) {
        return Ae(this, r, n, i);
      }, t.removeField = function(r, n) {
        return Ie(this, r, n);
      }, t.reorderFields = function(r, n) {
        return Ne(this, r, n);
      }, t.inferReferences = function() {
        return me(this.nodes ?? []);
      }, t.schemaToJSON = function() {
        return K(this);
      }, t.schemaFromJSON = function(r) {
        return ge(this, r);
      }, t.validateSchema = function() {
        return Re(this);
      }, t.diffSchemas = function(r, n, i) {
        return Fe(r, n, i);
      }, t.toDot = function(r) {
        return De(this, r);
      }, t.schemaLayout = function(r) {
        return $e(this, r);
      };
    }
  });
}
export {
  Se as addField,
  ct as attachSchemaHistory,
  at as default,
  Fe as diffSchemas,
  me as inferReferences,
  Qe as registerEdgeInspectorDirective,
  Ge as registerNodeInspectorDirective,
  Ze as registerRowInspectorDirective,
  dt as registerSchemaKeyboardNavDirective,
  nt as registerSchemaReorderableDirective,
  Ie as removeField,
  Ae as renameField,
  Ne as reorderFields,
  ge as schemaFromJSON,
  $e as schemaLayout,
  K as schemaToJSON,
  De as toDot,
  Re as validateSchema
};
//# sourceMappingURL=alpineflow-schema.esm.js.map
