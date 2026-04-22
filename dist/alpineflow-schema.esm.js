const j = "__alpineflow_registry__";
function ie() {
  return typeof globalThis < "u" ? (globalThis[j] || (globalThis[j] = /* @__PURE__ */ new Map()), globalThis[j]) : /* @__PURE__ */ new Map();
}
function de(e, t) {
  ie().set(e, t);
}
function ae(e, t, s, n) {
  const r = [];
  return { edges: e.map((d) => {
    let a = d;
    return d.source === t && d.sourceHandle === s && (a = { ...a, sourceHandle: n }), d.target === t && d.targetHandle === s && (a = { ...a, targetHandle: n }), a !== d && r.push(d.id), a;
  }), cascadedIds: r };
}
function ce(e, t, s) {
  const n = [];
  return { edges: e.filter((i) => {
    const d = i.source === t && i.sourceHandle === s || i.target === t && i.targetHandle === s;
    return d && n.push(i.id), !d;
  }), droppedIds: n };
}
const le = /^[a-z][a-z0-9_]*$/, fe = 40;
function oe(e) {
  return typeof e == "string" && e.length <= fe && le.test(e);
}
function G(e, t, s) {
  const n = e?.el ?? e?._container;
  if (!n || typeof n.dispatchEvent != "function")
    return;
  const r = [], i = typeof window < "u" ? window : void 0, d = (a) => {
    r.push(a.error ?? a.message), a.preventDefault();
  };
  i && typeof i.addEventListener == "function" && i.addEventListener("error", d, !0);
  try {
    n.dispatchEvent(new CustomEvent(t, { detail: s, bubbles: !0 }));
  } catch (a) {
    r.push(a);
  } finally {
    i && typeof i.removeEventListener == "function" && i.removeEventListener("error", d, !0);
  }
  for (const a of r)
    console.error("[alpineflow/schema] listener threw while handling", t, a);
}
function z(e, t) {
  return e?.nodes?.find((s) => s.id === t) ?? null;
}
function ue(e, t, s) {
  const n = z(e, t);
  return n ? oe(s?.name) ? (n.data || (n.data = { label: t, fields: [] }), (n.data.fields ?? []).some((i) => i.name === s.name) ? { applied: !1, reason: "duplicate" } : (Array.isArray(n.data.fields) || (n.data.fields = []), n.data.fields.push({ ...s }), G(e, "schema:field-added", { nodeId: t, field: { ...s } }), { applied: !0 })) : { applied: !1, reason: "invalid-name" } : { applied: !1, reason: "no-node" };
}
function pe(e, t, s, n) {
  if (s === n)
    return { applied: !1, reason: "unchanged", cascadedEdgeIds: [] };
  if (!oe(n))
    return { applied: !1, reason: "invalid-name", cascadedEdgeIds: [] };
  const r = z(e, t);
  if (!r)
    return { applied: !1, reason: "no-node", cascadedEdgeIds: [] };
  const i = r.data?.fields ?? [], d = i.find((p) => p.name === s);
  if (!d)
    return { applied: !1, reason: "no-field", cascadedEdgeIds: [] };
  if (i.some((p) => p.name === n))
    return { applied: !1, reason: "duplicate", cascadedEdgeIds: [] };
  d.name = n;
  const a = e.edges ?? [], { edges: o, cascadedIds: c } = ae(a, t, s, n);
  return c.length > 0 && e.edges.splice(0, e.edges.length, ...o), G(e, "schema:field-renamed", {
    nodeId: t,
    oldName: s,
    newName: n,
    cascadedEdgeIds: c
  }), c.length > 0 && G(e, "schema:edges-cascaded", {
    nodeId: t,
    fieldName: n,
    edgeIds: c,
    operation: "rename"
  }), { applied: !0, cascadedEdgeIds: c };
}
function me(e, t, s) {
  const n = z(e, t);
  if (!n)
    return { applied: !1, reason: "no-node", droppedEdgeIds: [] };
  const i = (n.data?.fields ?? []).findIndex((c) => c.name === s);
  if (i === -1)
    return { applied: !1, reason: "no-field", droppedEdgeIds: [] };
  n.data.fields.splice(i, 1);
  const d = e.edges ?? [], { edges: a, droppedIds: o } = ce(d, t, s);
  return o.length > 0 && e.edges.splice(0, e.edges.length, ...a), G(e, "schema:field-removed", {
    nodeId: t,
    fieldName: s,
    droppedEdgeIds: o
  }), o.length > 0 && G(e, "schema:edges-cascaded", {
    nodeId: t,
    fieldName: s,
    edgeIds: o,
    operation: "remove"
  }), { applied: !0, droppedEdgeIds: o };
}
function ge(e, t, s) {
  if (!Array.isArray(s))
    return { applied: !1, reason: "mismatch" };
  if (new Set(s).size !== s.length)
    return { applied: !1, reason: "mismatch" };
  const n = z(e, t);
  if (!n)
    return { applied: !1, reason: "no-node" };
  const r = n.data?.fields ?? [];
  if (s.length !== r.length)
    return { applied: !1, reason: "mismatch" };
  const i = new Set(r.map((c) => c.name)), d = new Set(s);
  if (i.size !== d.size)
    return { applied: !1, reason: "mismatch" };
  for (const c of s)
    if (!i.has(c))
      return { applied: !1, reason: "mismatch" };
  const a = /* @__PURE__ */ Object.create(null);
  for (const c of r)
    a[c.name] = c;
  const o = s.map((c) => a[c]);
  return n.data.fields.splice(0, n.data.fields.length, ...o), { applied: !0 };
}
function re(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e)
    t.set(n.id, n);
  const s = [];
  for (const n of e) {
    const r = n.data?.fields ?? [];
    for (const i of r) {
      if (typeof i?.name != "string" || !i.name.endsWith("_id"))
        continue;
      const d = i.name.slice(0, -3);
      if (!d)
        continue;
      const a = t.get(d);
      if (!a || a.id === n.id)
        continue;
      const o = a.data?.fields ?? [], p = o.find((u) => u.key === "primary")?.name ?? o[0]?.name ?? "id";
      s.push({
        fromNodeId: n.id,
        fromFieldName: i.name,
        toNodeId: a.id,
        toFieldName: p,
        confidence: "exact"
      });
    }
  }
  return s;
}
function q(e) {
  const t = (e.nodes ?? []).map((n) => ({
    id: n.id,
    label: n.data?.label ?? "",
    fields: (n.data?.fields ?? []).map((r) => ({ ...r })),
    position: { x: n.position?.x ?? 0, y: n.position?.y ?? 0 }
  })), s = (e.edges ?? []).map((n) => {
    const r = { id: n.id, source: n.source, target: n.target };
    return n.sourceHandle !== void 0 && (r.sourceHandle = n.sourceHandle), n.targetHandle !== void 0 && (r.targetHandle = n.targetHandle), n.label !== void 0 && (r.label = n.label), r;
  });
  return { version: 1, nodes: t, edges: s };
}
function se(e, t) {
  if (!t || typeof t.version != "number")
    throw new Error("[alpineflow/schema] schemaFromJSON: missing or invalid version");
  if (t.version !== 1)
    throw new Error(`[alpineflow/schema] schemaFromJSON: unsupported version ${t.version}`);
  const s = (t.nodes ?? []).map((r) => ({
    id: r.id,
    position: { x: r.position?.x ?? 0, y: r.position?.y ?? 0 },
    data: {
      label: r.label,
      fields: (r.fields ?? []).map((i) => ({ ...i }))
    }
  })), n = (t.edges ?? []).map((r) => {
    const i = { id: r.id, source: r.source, target: r.target };
    return r.sourceHandle !== void 0 && (i.sourceHandle = r.sourceHandle), r.targetHandle !== void 0 && (i.targetHandle = r.targetHandle), r.label !== void 0 && (i.label = r.label), i;
  });
  e.nodes.splice(0, e.nodes.length, ...s), e.edges.splice(0, e.edges.length, ...n);
}
function he(e, t) {
  for (const o of t)
    if (o && typeof o.source == "string" && o.source === o.target)
      return !0;
  const s = /* @__PURE__ */ new Map(), n = (o) => {
    let c = s.get(o);
    return c || (c = [], s.set(o, c)), c;
  };
  for (const o of e)
    o && typeof o.id == "string" && n(o.id);
  for (const o of t)
    !o || typeof o.source != "string" || typeof o.target != "string" || (n(o.source).push(o.target), n(o.target));
  const r = 0, i = 1, d = 2, a = /* @__PURE__ */ new Map();
  for (const o of s.keys())
    a.set(o, r);
  for (const o of s.keys()) {
    if (a.get(o) !== r) continue;
    const c = [{ node: o, idx: 0 }];
    for (a.set(o, i); c.length > 0; ) {
      const p = c[c.length - 1], u = s.get(p.node) ?? [];
      if (p.idx < u.length) {
        const m = u[p.idx++], l = a.get(m);
        if (l === i)
          return !0;
        l === r && (a.set(m, i), c.push({ node: m, idx: 0 }));
      } else
        a.set(p.node, d), c.pop();
    }
  }
  return !1;
}
function ye(e) {
  const t = [], s = Array.isArray(e?.nodes) ? e.nodes : [], n = Array.isArray(e?.edges) ? e.edges : [], r = /* @__PURE__ */ new Set(), i = /* @__PURE__ */ new Set();
  for (const o of s)
    !o || typeof o.id != "string" || (r.has(o.id) && i.add(o.id), r.add(o.id));
  for (const o of i)
    t.push({
      severity: "error",
      code: "duplicate-node-id",
      nodeId: o,
      message: `Duplicate node id "${o}".`
    });
  for (const o of s) {
    if (!o || typeof o.id != "string") continue;
    const c = Array.isArray(o.data?.fields) ? o.data.fields : [];
    if (c.length === 0) continue;
    const p = /* @__PURE__ */ new Set(), u = /* @__PURE__ */ new Set();
    for (const l of c)
      !l || typeof l.name != "string" || (p.has(l.name) && u.add(l.name), p.add(l.name));
    for (const l of u)
      t.push({
        severity: "error",
        code: "duplicate-field",
        nodeId: o.id,
        fieldName: l,
        message: `Duplicate field "${l}" on node "${o.id}".`
      });
    c.some((l) => l && l.key === "primary") || t.push({
      severity: "warning",
      code: "missing-primary-key",
      nodeId: o.id,
      message: `Node "${o.id}" has no primary-key field.`
    });
  }
  for (const o of n) {
    if (!o) continue;
    const c = typeof o.id == "string" ? o.id : void 0;
    (typeof o.source != "string" || !r.has(o.source)) && t.push({
      severity: "error",
      code: "dangling-edge",
      edgeId: c,
      nodeId: typeof o.source == "string" ? o.source : void 0,
      message: `Edge ${c ? `"${c}" ` : ""}references missing source node "${o.source}".`
    }), (typeof o.target != "string" || !r.has(o.target)) && t.push({
      severity: "error",
      code: "dangling-edge",
      edgeId: c,
      nodeId: typeof o.target == "string" ? o.target : void 0,
      message: `Edge ${c ? `"${c}" ` : ""}references missing target node "${o.target}".`
    });
  }
  const d = /* @__PURE__ */ new Set();
  for (const o of n)
    o && (typeof o.source == "string" && d.add(o.source), typeof o.target == "string" && d.add(o.target));
  for (const o of s)
    !o || typeof o.id != "string" || d.has(o.id) || t.push({
      severity: "warning",
      code: "disconnected-node",
      nodeId: o.id,
      message: `Node "${o.id}" has no connected edges.`
    });
  return he(s, n) && t.push({
    severity: "warning",
    code: "cycle",
    message: "Directed cycle detected in edge graph."
  }), { valid: !t.some((o) => o.severity === "error"), issues: t };
}
function Z(e) {
  return !e || !Array.isArray(e.nodes) ? [] : e.nodes.filter((t) => !!t && typeof t.id == "string");
}
function ee(e) {
  return !e || !Array.isArray(e.edges) ? [] : e.edges.filter((t) => !!t && typeof t.id == "string");
}
function te(e) {
  const t = /* @__PURE__ */ new Map(), s = Array.isArray(e.fields) ? e.fields : [];
  for (const n of s)
    n && typeof n.name == "string" && t.set(n.name, n);
  return t;
}
function Ee(e, t, s = {}) {
  const n = Z(e), r = Z(t), i = ee(e), d = ee(t), a = /* @__PURE__ */ new Map();
  for (const f of n)
    a.set(f.id, f);
  const o = /* @__PURE__ */ new Map();
  for (const f of r)
    o.set(f.id, f);
  const c = [], p = [];
  for (const f of o.keys())
    a.has(f) || c.push(f);
  for (const f of a.keys())
    o.has(f) || p.push(f);
  const u = [], m = /* @__PURE__ */ new Set(), l = /* @__PURE__ */ new Set();
  if (s.detectRenames) {
    const f = (g) => (Array.isArray(g.fields) ? g.fields : []).filter((F) => F && typeof F.name == "string").map((F) => F.name).sort().join("\0");
    for (const g of p) {
      const S = a.get(g);
      if (!S) continue;
      const F = f(S), T = [];
      for (const L of c) {
        if (m.has(L)) continue;
        const N = o.get(L);
        N && f(N) === F && T.push(L);
      }
      if (T.length === 1) {
        const L = T[0];
        u.push({ from: g, to: L }), m.add(L), l.add(g);
      }
    }
  }
  const y = c.filter((f) => !m.has(f)), h = p.filter((f) => !l.has(f)), w = [];
  for (const f of a.keys())
    o.has(f) && w.push({ beforeId: f, afterId: f });
  for (const f of u)
    w.push({ beforeId: f.from, afterId: f.to });
  const b = /* @__PURE__ */ new Map();
  for (const f of s.fieldRenames ?? []) {
    if (!f || typeof f.nodeId != "string" || typeof f.from != "string" || typeof f.to != "string") continue;
    let g = b.get(f.nodeId);
    g || (g = [], b.set(f.nodeId, g)), g.push({ from: f.from, to: f.to });
  }
  const D = /* @__PURE__ */ new Map();
  for (const f of u)
    D.set(f.from, f.to);
  for (const f of s.fieldRenames ?? []) {
    if (!f || typeof f.nodeId != "string") continue;
    const g = D.get(f.nodeId);
    if (g && !b.has(g)) {
      const S = b.get(f.nodeId) ?? [];
      b.set(g, S);
    }
  }
  const E = [], I = [], x = [], A = [];
  for (const { beforeId: f, afterId: g } of w) {
    const S = a.get(f), F = o.get(g);
    if (!S || !F) continue;
    const T = te(S), L = te(F), N = b.get(g) ?? b.get(f) ?? [], P = /* @__PURE__ */ new Set(), J = /* @__PURE__ */ new Set();
    for (const v of N) {
      const B = T.get(v.from), _ = L.get(v.to);
      if (!B || !_ || P.has(v.from) || J.has(v.to)) continue;
      E.push({ nodeId: g, from: v.from, to: v.to }), P.add(v.from), J.add(v.to);
      const U = typeof B.type == "string" ? B.type : "", Y = typeof _.type == "string" ? _.type : "";
      U !== Y && A.push({
        nodeId: g,
        fieldName: v.to,
        from: U,
        to: Y
      });
    }
    for (const [v] of L)
      J.has(v) || T.has(v) || I.push({ nodeId: g, fieldName: v });
    for (const [v] of T)
      P.has(v) || L.has(v) || x.push({ nodeId: g, fieldName: v });
    for (const [v, B] of T) {
      if (P.has(v)) continue;
      const _ = L.get(v);
      if (!_) continue;
      const U = typeof B.type == "string" ? B.type : "", Y = typeof _.type == "string" ? _.type : "";
      U !== Y && A.push({
        nodeId: g,
        fieldName: v,
        from: U,
        to: Y
      });
    }
  }
  const R = /* @__PURE__ */ new Set();
  for (const f of i) R.add(f.id);
  const H = /* @__PURE__ */ new Set();
  for (const f of d) H.add(f.id);
  const k = [], O = [];
  for (const f of H)
    R.has(f) || k.push(f);
  for (const f of R)
    H.has(f) || O.push(f);
  y.sort(), h.sort(), u.sort((f, g) => f.from.localeCompare(g.from));
  const C = (f) => `${f.nodeId}\0${f.fieldName}`;
  return I.sort((f, g) => C(f).localeCompare(C(g))), x.sort((f, g) => C(f).localeCompare(C(g))), E.sort((f, g) => {
    const S = f.nodeId.localeCompare(g.nodeId);
    return S !== 0 ? S : f.from.localeCompare(g.from);
  }), A.sort((f, g) => C(f).localeCompare(C(g))), k.sort(), O.sort(), {
    addedNodes: y,
    removedNodes: h,
    renamedNodes: u,
    addedFields: I,
    removedFields: x,
    renamedFields: E,
    changedFieldTypes: A,
    addedEdges: k,
    removedEdges: O
  };
}
const ve = {
  rankdir: "LR",
  nodeShape: "plaintext",
  includeFieldTypes: !0,
  includeFieldKeys: !0,
  graphName: "schema"
};
function W(e) {
  return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function M(e) {
  return e.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}
function we(e, t) {
  const s = String(e?.id ?? ""), n = String(e?.data?.label ?? ""), r = Array.isArray(e?.data?.fields) ? e.data.fields : [], i = 1 + (t.includeFieldKeys ? 1 : 0) + (t.includeFieldTypes ? 1 : 0), d = [];
  d.push(
    `      <TR><TD BGCOLOR="#f0f0f0" COLSPAN="${i}"><B>${W(n)}</B></TD></TR>`
  );
  for (const a of r) {
    const o = String(a?.name ?? ""), c = [];
    if (t.includeFieldKeys) {
      const p = a?.key === "primary" ? "PK" : a?.key === "foreign" ? "FK" : "";
      c.push(`<TD>${p}</TD>`);
    }
    c.push(`<TD PORT="${W(o)}">${W(o)}</TD>`), t.includeFieldTypes && c.push(`<TD>${W(String(a?.type ?? ""))}</TD>`), d.push(`      <TR>${c.join("")}</TR>`);
  }
  return `  "${M(s)}" [label=<
    <TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0" CELLPADDING="4">
${d.join(`
`)}
    </TABLE>
  >];`;
}
function be(e) {
  const t = `"${M(String(e?.source ?? ""))}"`, s = `"${M(String(e?.target ?? ""))}"`, n = e?.sourceHandle ? `:"${M(String(e.sourceHandle))}"` : "", r = e?.targetHandle ? `:"${M(String(e.targetHandle))}"` : "", i = e?.label ? ` [label="${M(String(e.label))}"]` : "";
  return `  ${t}${n} -> ${s}${r}${i};`;
}
function Se(e, t = {}) {
  const s = { ...ve, ...t }, n = [];
  n.push(`digraph "${M(s.graphName)}" {`), n.push(`  rankdir=${s.rankdir};`), n.push(`  node [shape=${s.nodeShape}];`);
  for (const r of e?.nodes ?? [])
    n.push(we(r, s));
  for (const r of e?.edges ?? [])
    n.push(be(r));
  return n.push("}"), n.join(`
`);
}
const Ie = ["dagre", "tree", "grid"];
async function Ae(e, t = {}) {
  const s = t.direction ?? "LR", n = t.nodeSpacing ?? 80, r = t.rankSpacing ?? 160, i = Ne(t.algorithm), d = t.deriveFromReferences ? Ce(e) : null;
  try {
    for (const a of i) {
      if (a === "dagre" && Le(e, s, n, r) || a === "tree" && xe(e, s, n, r))
        return;
      if (a === "grid") {
        Fe(e.nodes ?? [], n, r, s);
        return;
      }
    }
    console.warn(
      '[alpineflow/schema] schemaLayout: no layout algorithm available. Register @getartisanflow/alpineflow/dagre (or hierarchy), or pass { algorithm: "grid" } for the always-available fallback.'
    );
  } finally {
    d && d.restore();
  }
}
function Ne(e) {
  return e ? [e] : [...Ie];
}
function Ce(e) {
  const t = e.edges;
  if (!Array.isArray(t))
    return null;
  const s = t.slice(), n = re(e.nodes ?? []).map((r, i) => ({
    id: `schema-layout-inferred-${i}`,
    source: r.fromNodeId,
    target: r.toNodeId,
    sourceHandle: r.fromFieldName,
    targetHandle: r.toFieldName
  }));
  return t.splice(0, t.length, ...n), {
    restore: () => {
      t.splice(0, t.length, ...s);
    }
  };
}
function Le(e, t, s, n) {
  if (typeof e.layout != "function")
    return !1;
  try {
    return e.layout({
      direction: t,
      nodesep: s,
      ranksep: n
    }), !0;
  } catch {
    return !1;
  }
}
function xe(e, t, s, n) {
  if (typeof e.treeLayout != "function")
    return !1;
  try {
    return e.treeLayout({
      direction: t,
      nodeWidth: s + 200,
      nodeHeight: n + 80
    }), !0;
  } catch {
    return !1;
  }
}
function Fe(e, t, s, n) {
  const r = e.length;
  if (r === 0)
    return;
  const i = Math.max(1, Math.ceil(Math.sqrt(r))), d = Math.ceil(r / i), a = t + 300, o = s + 200;
  for (let c = 0; c < r; c++) {
    const p = c % i, u = Math.floor(c / i);
    let m = p * a, l = u * o;
    n === "BT" ? l = (d - 1 - u) * o : n === "RL" && (m = (i - 1 - p) * a), e[c].position = { x: m, y: l };
  }
}
const ne = [
  "schema:field-added",
  "schema:field-renamed",
  "schema:field-removed",
  "schema:edges-cascaded"
];
function Ge(e, t = {}) {
  const s = Math.max(1, t.limit ?? 50), n = [], r = [];
  let i = 0, d = 0, a = null, o = !1;
  const c = e?.el ?? e?._container ?? null;
  if (!c || typeof c.addEventListener != "function")
    return Re();
  const p = () => {
    for (; n.length > s && n.length > 1; )
      n.shift();
  }, u = () => {
    o || i > 0 || d > 0 || (n.push(q(e)), p(), r.length = 0);
  };
  n.push(q(e));
  const m = () => {
    u();
  };
  for (const h of ne)
    c.addEventListener(h, m);
  const l = (h) => {
    i++;
    try {
      se(e, h);
    } finally {
      i--;
    }
  };
  return {
    get canUndo() {
      return n.length > 1;
    },
    get canRedo() {
      return r.length > 0;
    },
    undo() {
      if (o || n.length <= 1)
        return !1;
      const h = n.pop();
      r.push(h);
      const w = n[n.length - 1];
      return l(w), !0;
    },
    redo() {
      if (o || r.length === 0)
        return !1;
      const h = r.pop();
      return n.push(h), l(h), !0;
    },
    clear() {
      n.length = 0, r.length = 0, o || n.push(q(e));
    },
    batch(h) {
      if (o)
        return h();
      d === 0 && (a = q(e)), d++;
      try {
        const w = h();
        return d--, d === 0 && (a = null, i === 0 && !o && (n.push(q(e)), p(), r.length = 0)), w;
      } catch (w) {
        if (d--, d === 0) {
          const b = a;
          a = null, b && !o && l(b);
        }
        throw w;
      }
    },
    dispose() {
      if (!o) {
        o = !0;
        for (const h of ne)
          c.removeEventListener(h, m);
        n.length = 0, r.length = 0, a = null;
      }
    }
  };
}
function Re() {
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
function $(e) {
  if (!e || e.size === 0)
    return null;
  let t = null;
  for (const s of e)
    t = s;
  return t;
}
function Te(e) {
  if (!e)
    return null;
  const t = e.indexOf(".");
  return t < 1 || t === e.length - 1 ? null : { nodeId: e.slice(0, t), fieldName: e.slice(t + 1) };
}
function V(e, t) {
  const s = t.closest(".flow-container");
  if (s)
    try {
      return e.$data(s) ?? null;
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
function X(e) {
  return e.querySelector(
    ":scope > template[x-schema-default-ui]"
  );
}
function K(e) {
  const t = e.querySelector(":scope > [data-schema-default-ui-root]");
  t && t.remove();
}
function Q(e) {
  const t = document.createElement("div");
  return t.setAttribute("data-schema-default-ui-root", ""), e.appendChild(t), t;
}
function De(e) {
  e.directive(
    "schema-node-inspector",
    (t, s, { effect: n, cleanup: r }) => {
      const i = t, d = V(e, i);
      if (!d)
        return;
      const a = X(i), o = {
        addField(p) {
          const u = $(d.selectedNodes);
          return u ? d.addField?.(u, p) ?? { applied: !1, reason: "no-helper" } : { applied: !1, reason: "no-selection" };
        },
        renameField(p, u) {
          const m = $(d.selectedNodes);
          return m ? d.renameField?.(m, p, u) ?? {
            applied: !1,
            reason: "no-helper",
            cascadedEdgeIds: []
          } : { applied: !1, reason: "no-selection", cascadedEdgeIds: [] };
        },
        removeField(p) {
          const u = $(d.selectedNodes);
          return u ? d.removeField?.(u, p) ?? {
            applied: !1,
            reason: "no-helper",
            droppedEdgeIds: []
          } : { applied: !1, reason: "no-selection", droppedEdgeIds: [] };
        },
        reorderFields(p) {
          const u = $(d.selectedNodes);
          return u ? d.reorderFields?.(u, p) ?? {
            applied: !1,
            reason: "no-helper"
          } : { applied: !1, reason: "no-selection" };
        }
      }, c = e.addScopeToNode(i, {
        inspector: o,
        get selectedNode() {
          const p = $(d.selectedNodes);
          return p ? d.nodes?.find((u) => u.id === p) ?? null : null;
        }
      });
      a && n(() => {
        ke(i, d);
      }), r(() => {
        K(i), c?.();
      });
    }
  );
}
function ke(e, t) {
  K(e);
  const s = Q(e), n = $(t.selectedNodes), r = n ? t.nodes?.find((l) => l.id === n) : null;
  if (!r) {
    const l = document.createElement("div");
    l.setAttribute("data-schema-inspector-empty", ""), l.textContent = "No node selected.", s.appendChild(l);
    return;
  }
  const i = document.createElement("header");
  i.setAttribute("data-schema-inspector-label", ""), i.textContent = String(r.data?.label ?? r.id), s.appendChild(i);
  const d = document.createElement("ul");
  d.setAttribute("data-schema-inspector-fields", "");
  const a = Array.isArray(r.data?.fields) ? r.data.fields : [];
  for (const l of a) {
    const y = document.createElement("li");
    y.setAttribute("data-schema-inspector-field", ""), y.dataset.fieldName = String(l?.name ?? "");
    const h = document.createElement("span");
    if (h.textContent = String(l?.name ?? ""), y.appendChild(h), l?.type) {
      const b = document.createElement("span");
      b.setAttribute("data-field-type", ""), b.textContent = String(l.type), y.appendChild(b);
    }
    const w = document.createElement("button");
    w.type = "button", w.setAttribute("data-action", "remove"), w.textContent = "remove", w.addEventListener("click", () => {
      t.removeField?.(r.id, l.name);
    }), y.appendChild(w), d.appendChild(y);
  }
  s.appendChild(d);
  const o = document.createElement("form");
  o.setAttribute("data-schema-inspector-add-field", "");
  const c = document.createElement("input");
  c.setAttribute("data-field", "name"), c.placeholder = "field name", o.appendChild(c);
  const p = Array.isArray(t._config?.fieldTypeRegistry) ? t._config.fieldTypeRegistry : null;
  let u;
  if (p && p.length > 0) {
    const l = document.createElement("select");
    l.setAttribute("data-field", "type");
    for (const y of p) {
      const h = document.createElement("option");
      h.value = y, h.textContent = y, l.appendChild(h);
    }
    l.value = p[0], u = l;
  } else {
    const l = document.createElement("input");
    l.setAttribute("data-field", "type"), l.placeholder = "type", l.value = "text", u = l;
  }
  o.appendChild(u);
  const m = document.createElement("button");
  m.type = "submit", m.textContent = "add", o.appendChild(m), o.addEventListener("submit", (l) => {
    l.preventDefault();
    const y = c.value.trim();
    if (!y)
      return;
    const h = u.value, w = (typeof h == "string" ? h.trim() : "") || "text";
    t.addField?.(r.id, { name: y, type: w })?.applied && (c.value = "");
  }), s.appendChild(o);
}
function $e(e) {
  e.directive(
    "schema-row-inspector",
    (t, s, { effect: n, cleanup: r }) => {
      const i = t, d = V(e, i);
      if (!d)
        return;
      const a = X(i), o = () => Te($(d.selectedRows)), c = () => {
        const m = o();
        if (!m)
          return null;
        const l = d.nodes?.find((h) => h.id === m.nodeId);
        return l ? (l.data?.fields ?? []).find((h) => h?.name === m.fieldName) ?? null : null;
      }, p = {
        renameField(m) {
          const l = o();
          return l ? d.renameField?.(l.nodeId, l.fieldName, m) ?? {
            applied: !1,
            reason: "no-helper",
            cascadedEdgeIds: []
          } : { applied: !1, reason: "no-selection", cascadedEdgeIds: [] };
        },
        removeField() {
          const m = o();
          return m ? d.removeField?.(m.nodeId, m.fieldName) ?? {
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
          const l = c();
          if (!l)
            return { applied: !1, reason: "no-selection" };
          for (const [y, h] of Object.entries(m))
            y !== "name" && (l[y] = h);
          return { applied: !0 };
        }
      }, u = e.addScopeToNode(i, {
        inspector: p,
        get selectedRow() {
          return o();
        }
      });
      a && n(() => {
        He(i, d, o());
      }), r(() => {
        K(i), u?.();
      });
    }
  );
}
function He(e, t, s) {
  K(e);
  const n = Q(e);
  if (!s) {
    const l = document.createElement("div");
    l.setAttribute("data-schema-inspector-empty", ""), l.textContent = "No row selected.", n.appendChild(l);
    return;
  }
  const i = t.nodes?.find((l) => l.id === s.nodeId)?.data?.fields?.find((l) => l?.name === s.fieldName) ?? null;
  if (!i) {
    const l = document.createElement("div");
    l.setAttribute("data-schema-inspector-empty", ""), l.textContent = "Selected row no longer exists.", n.appendChild(l);
    return;
  }
  const d = document.createElement("label");
  d.textContent = "name ";
  const a = document.createElement("input");
  a.setAttribute("data-field", "name"), a.value = String(i.name ?? ""), a.addEventListener("change", () => {
    const l = a.value.trim();
    !l || l === i.name || t.renameField?.(s.nodeId, s.fieldName, l);
  }), d.appendChild(a), n.appendChild(d);
  const o = document.createElement("label");
  o.textContent = "type ";
  const c = document.createElement("input");
  c.setAttribute("data-field", "type"), c.value = String(i.type ?? ""), c.addEventListener("change", () => {
    i.type = c.value;
  }), o.appendChild(c), n.appendChild(o);
  const p = document.createElement("label");
  p.textContent = "required ";
  const u = document.createElement("input");
  u.type = "checkbox", u.setAttribute("data-field", "required"), u.checked = !!i.required, u.addEventListener("change", () => {
    i.required = u.checked;
  }), p.appendChild(u), n.appendChild(p);
  const m = document.createElement("button");
  m.type = "button", m.setAttribute("data-action", "remove"), m.textContent = "remove", m.addEventListener("click", () => {
    t.removeField?.(s.nodeId, s.fieldName);
  }), n.appendChild(m);
}
function _e(e) {
  e.directive(
    "schema-edge-inspector",
    (t, s, { effect: n, cleanup: r }) => {
      const i = t, d = V(e, i);
      if (!d)
        return;
      const a = X(i), o = () => {
        const u = $(d.selectedEdges);
        return u ? d.edges?.find((m) => m.id === u) ?? null : null;
      }, c = {
        updateEdge(u) {
          const m = o();
          if (!m)
            return { applied: !1, reason: "no-selection" };
          for (const [l, y] of Object.entries(u))
            m[l] = y;
          return { applied: !0 };
        },
        setLabel(u) {
          return this.updateEdge({ label: u });
        },
        removeEdge() {
          const u = o();
          if (!u)
            return { applied: !1, reason: "no-selection" };
          if (typeof d.removeEdges == "function")
            return d.removeEdges([u.id]), { applied: !0 };
          const m = d.edges?.findIndex((l) => l.id === u.id) ?? -1;
          return m === -1 ? { applied: !1, reason: "no-helper" } : (d.edges.splice(m, 1), { applied: !0 });
        }
      }, p = e.addScopeToNode(i, {
        inspector: c,
        get selectedEdge() {
          return o();
        }
      });
      a && n(() => {
        Me(i, d, o());
      }), r(() => {
        K(i), p?.();
      });
    }
  );
}
function Me(e, t, s) {
  K(e);
  const n = Q(e);
  if (!s) {
    const a = document.createElement("div");
    a.setAttribute("data-schema-inspector-empty", ""), a.textContent = "No edge selected.", n.appendChild(a);
    return;
  }
  const r = document.createElement("label");
  r.textContent = "label ";
  const i = document.createElement("input");
  i.setAttribute("data-field", "label"), i.value = String(s.label ?? ""), i.addEventListener("input", () => {
    s.label = i.value;
  }), r.appendChild(i), n.appendChild(r);
  const d = document.createElement("button");
  d.type = "button", d.setAttribute("data-action", "delete"), d.textContent = "delete", d.addEventListener("click", () => {
    if (typeof t.removeEdges == "function")
      t.removeEdges([s.id]);
    else {
      const a = t.edges?.findIndex((o) => o.id === s.id) ?? -1;
      a !== -1 && t.edges.splice(a, 1);
    }
  }), n.appendChild(d);
}
const Oe = 4;
function Pe(e) {
  e.directive(
    "schema-reorderable",
    (t, s, { cleanup: n }) => {
      const r = t;
      r.classList.add("flow-schema-reorderable"), r.style.touchAction = "none";
      let i = !1, d = !1, a = 0, o = 0, c = 0, p = null;
      const u = () => {
        const E = r.parentElement;
        return E ? Array.from(
          E.querySelectorAll(":scope > .flow-schema-row")
        ) : [];
      }, m = () => {
        for (const E of u())
          E.classList.remove("flow-schema-row-drop-target");
      }, l = (E) => {
        const I = r.parentElement;
        if (!I) return o;
        const x = Array.from(
          I.querySelectorAll(":scope > .flow-schema-row")
        ).filter((R) => R !== r);
        if (x.length === 0) return o;
        let A = 0;
        for (const R of x) {
          const H = R.getBoundingClientRect();
          H.top + H.height / 2 < E && A++;
        }
        return A;
      }, y = (E) => {
        m();
        const I = u();
        let x = E;
        E >= o && (x = E + 1);
        const A = I[x] ?? I[E];
        A && A !== r && A.classList.add("flow-schema-row-drop-target");
      }, h = () => {
        r.style.transform = "", r.classList.remove("flow-schema-row-dragging"), m();
      }, w = (E) => {
        if (i || E.button !== void 0 && E.button !== 0) return;
        i = !0, d = !1, a = E.clientY, p = E.pointerId ?? null, o = u().indexOf(r), c = o, r.classList.add("flow-schema-row-dragging");
        try {
          p !== null && typeof r.setPointerCapture == "function" && r.setPointerCapture(p);
        } catch {
        }
        document.addEventListener("pointermove", b), document.addEventListener("pointerup", D), document.addEventListener("pointercancel", D);
      }, b = (E) => {
        if (!i) return;
        const I = E.clientY - a;
        !d && Math.abs(I) > Oe && (d = !0), r.style.transform = `translateY(${I}px)`, d && (c = l(E.clientY), y(c));
      }, D = (E) => {
        if (!i) return;
        const I = d, x = c, A = o;
        try {
          p !== null && typeof r.releasePointerCapture == "function" && typeof r.hasPointerCapture == "function" && r.hasPointerCapture(p) && r.releasePointerCapture(p);
        } catch {
        }
        if (document.removeEventListener("pointermove", b), document.removeEventListener("pointerup", D), document.removeEventListener("pointercancel", D), i = !1, p = null, h(), !I)
          return;
        const R = (N) => {
          N.stopImmediatePropagation(), N.stopPropagation(), N.preventDefault();
        };
        r.addEventListener("click", R, { capture: !0, once: !0 }), setTimeout(() => {
          r.removeEventListener("click", R, { capture: !0 });
        }, 0);
        const k = r.closest("[data-flow-node-id]")?.getAttribute("data-flow-node-id") ?? null;
        if (!k) return;
        const O = r.closest(".flow-container");
        if (!O) return;
        let C;
        try {
          C = e.$data(O);
        } catch {
          return;
        }
        if (!C || typeof C.reorderFields != "function") return;
        const g = (C.nodes ?? []).find((N) => N?.id === k)?.data?.fields ?? [];
        if (!Array.isArray(g) || g.length < 2) return;
        const S = g.map((N) => N.name);
        if (A < 0 || A >= S.length) return;
        const [F] = S.splice(A, 1), T = Math.max(0, Math.min(x, S.length));
        S.splice(T, 0, F), !S.every(
          (N, P) => g[P]?.name === N
        ) && C.reorderFields(k, S);
      };
      r.addEventListener("pointerdown", w), n(() => {
        try {
          r.removeEventListener("pointerdown", w), typeof document < "u" && (document.removeEventListener("pointermove", b), document.removeEventListener("pointerup", D), document.removeEventListener("pointercancel", D)), r.classList.remove("flow-schema-reorderable"), r.classList.remove("flow-schema-row-dragging"), m(), r.style.transform = "", r.style.touchAction = "";
        } catch {
        }
      });
    }
  );
}
function Be(e) {
  const t = e.parentElement;
  return t ? Array.from(
    t.querySelectorAll(":scope > .flow-schema-row")
  ) : [];
}
function qe(e, t) {
  const s = Be(e), n = s.indexOf(e);
  if (n === -1) return;
  const r = s[n + t];
  r && r.focus();
}
function Ke(e, t) {
  const s = e.closest("[data-flow-node-id]");
  if (!s) return !1;
  const n = e.closest(".flow-container");
  if (!n) return !1;
  const r = Array.from(
    n.querySelectorAll("[data-flow-node-id]")
  ), i = r.indexOf(s);
  if (i === -1) return !1;
  const d = r[i + t];
  if (!d) return !1;
  const a = t === 1 ? d.querySelector(".flow-schema-row") : (() => {
    const o = d.querySelectorAll(".flow-schema-row");
    return o.length > 0 ? o[o.length - 1] : null;
  })();
  return a ? (a.focus(), !0) : !1;
}
function Ue(e) {
  e.click();
}
function Ye(e) {
  e.directive(
    "schema-keyboard-nav",
    (t, s, { effect: n, cleanup: r }) => {
      const i = t;
      i.setAttribute("tabindex", "0"), i.setAttribute("role", "row"), n(() => {
        const a = i.dataset.flowSchemaField ?? "", c = i.querySelector(".flow-schema-row-type")?.textContent ?? "";
        i.setAttribute(
          "aria-label",
          `${a}${c ? " (" + c + ")" : ""}`
        );
      });
      const d = (a) => {
        const o = a.key;
        if (o === "ArrowDown" || o === "ArrowUp") {
          a.preventDefault(), a.stopPropagation(), qe(i, o === "ArrowDown" ? 1 : -1);
          return;
        }
        if (o === "Tab") {
          Ke(i, a.shiftKey ? -1 : 1) && a.preventDefault();
          return;
        }
        if (o === "Enter" || o === " ") {
          a.preventDefault(), Ue(i);
          return;
        }
        if (o === "Escape") {
          i.blur();
          return;
        }
      };
      i.addEventListener("keydown", d), r(() => {
        try {
          i.removeEventListener("keydown", d), i.removeAttribute("tabindex"), i.removeAttribute("role"), i.removeAttribute("aria-label");
        } catch {
        }
      });
    }
  );
}
function We(e) {
  e && typeof e.directive == "function" && (De(e), $e(e), _e(e), Pe(e), Ye(e)), de("schema", {
    setup(t) {
      !t.el && t._container && (t.el = t._container), t.addField = function(s, n) {
        return ue(this, s, n);
      }, t.renameField = function(s, n, r) {
        return pe(this, s, n, r);
      }, t.removeField = function(s, n) {
        return me(this, s, n);
      }, t.reorderFields = function(s, n) {
        return ge(this, s, n);
      }, t.inferReferences = function() {
        return re(this.nodes ?? []);
      }, t.schemaToJSON = function() {
        return q(this);
      }, t.schemaFromJSON = function(s) {
        return se(this, s);
      }, t.validateSchema = function() {
        return ye(this);
      }, t.diffSchemas = function(s, n, r) {
        return Ee(s, n, r);
      }, t.toDot = function(s) {
        return Se(this, s);
      }, t.schemaLayout = function(s) {
        return Ae(this, s);
      };
    }
  });
}
export {
  ue as addField,
  Ge as attachSchemaHistory,
  We as default,
  Ee as diffSchemas,
  re as inferReferences,
  _e as registerEdgeInspectorDirective,
  De as registerNodeInspectorDirective,
  $e as registerRowInspectorDirective,
  Ye as registerSchemaKeyboardNavDirective,
  Pe as registerSchemaReorderableDirective,
  me as removeField,
  pe as renameField,
  ge as reorderFields,
  se as schemaFromJSON,
  Ae as schemaLayout,
  q as schemaToJSON,
  Se as toDot,
  ye as validateSchema
};
//# sourceMappingURL=alpineflow-schema.esm.js.map
