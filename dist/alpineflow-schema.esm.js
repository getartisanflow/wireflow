const C = "__alpineflow_registry__";
function N() {
  return typeof globalThis < "u" ? (globalThis[C] || (globalThis[C] = /* @__PURE__ */ new Map()), globalThis[C]) : /* @__PURE__ */ new Map();
}
function A(e, t) {
  N().set(e, t);
}
function w(e, t, d, n) {
  const o = [];
  return { edges: e.map((r) => {
    let s = r;
    return r.source === t && r.sourceHandle === d && (s = { ...s, sourceHandle: n }), r.target === t && r.targetHandle === d && (s = { ...s, targetHandle: n }), s !== r && o.push(r.id), s;
  }), cascadedIds: o };
}
function H(e, t, d) {
  const n = [];
  return { edges: e.filter((i) => {
    const r = i.source === t && i.sourceHandle === d || i.target === t && i.targetHandle === d;
    return r && n.push(i.id), !r;
  }), droppedIds: n };
}
const L = /^[a-z][a-z0-9_]*$/, _ = 40;
function S(e) {
  return typeof e == "string" && e.length <= _ && L.test(e);
}
function b(e, t, d) {
  const n = e?.el ?? e?._container;
  if (!n || typeof n.dispatchEvent != "function")
    return;
  const o = [], i = typeof window < "u" ? window : void 0, r = (s) => {
    o.push(s.error ?? s.message), s.preventDefault();
  };
  i && typeof i.addEventListener == "function" && i.addEventListener("error", r, !0);
  try {
    n.dispatchEvent(new CustomEvent(t, { detail: d, bubbles: !0 }));
  } catch (s) {
    o.push(s);
  } finally {
    i && typeof i.removeEventListener == "function" && i.removeEventListener("error", r, !0);
  }
  for (const s of o)
    console.error("[alpineflow/schema] listener threw while handling", t, s);
}
function y(e, t) {
  return e?.nodes?.find((d) => d.id === t) ?? null;
}
function R(e, t, d) {
  const n = y(e, t);
  return n ? S(d?.name) ? (n.data || (n.data = { label: t, fields: [] }), (n.data.fields ?? []).some((i) => i.name === d.name) ? { applied: !1, reason: "duplicate" } : (Array.isArray(n.data.fields) || (n.data.fields = []), n.data.fields.push({ ...d }), b(e, "schema:field-added", { nodeId: t, field: { ...d } }), { applied: !0 })) : { applied: !1, reason: "invalid-name" } : { applied: !1, reason: "no-node" };
}
function k(e, t, d, n) {
  if (d === n)
    return { applied: !1, reason: "unchanged", cascadedEdgeIds: [] };
  if (!S(n))
    return { applied: !1, reason: "invalid-name", cascadedEdgeIds: [] };
  const o = y(e, t);
  if (!o)
    return { applied: !1, reason: "no-node", cascadedEdgeIds: [] };
  const i = o.data?.fields ?? [], r = i.find((f) => f.name === d);
  if (!r)
    return { applied: !1, reason: "no-field", cascadedEdgeIds: [] };
  if (i.some((f) => f.name === n))
    return { applied: !1, reason: "duplicate", cascadedEdgeIds: [] };
  r.name = n;
  const s = e.edges ?? [], { edges: c, cascadedIds: p } = w(s, t, d, n);
  return p.length > 0 && e.edges.splice(0, e.edges.length, ...c), b(e, "schema:field-renamed", {
    nodeId: t,
    oldName: d,
    newName: n,
    cascadedEdgeIds: p
  }), p.length > 0 && b(e, "schema:edges-cascaded", {
    nodeId: t,
    fieldName: n,
    edgeIds: p,
    operation: "rename"
  }), { applied: !0, cascadedEdgeIds: p };
}
function O(e, t, d) {
  const n = y(e, t);
  if (!n)
    return { applied: !1, reason: "no-node", droppedEdgeIds: [] };
  const i = (n.data?.fields ?? []).findIndex((p) => p.name === d);
  if (i === -1)
    return { applied: !1, reason: "no-field", droppedEdgeIds: [] };
  n.data.fields.splice(i, 1);
  const r = e.edges ?? [], { edges: s, droppedIds: c } = H(r, t, d);
  return c.length > 0 && e.edges.splice(0, e.edges.length, ...s), b(e, "schema:field-removed", {
    nodeId: t,
    fieldName: d,
    droppedEdgeIds: c
  }), c.length > 0 && b(e, "schema:edges-cascaded", {
    nodeId: t,
    fieldName: d,
    edgeIds: c,
    operation: "remove"
  }), { applied: !0, droppedEdgeIds: c };
}
function T(e, t, d) {
  if (!Array.isArray(d))
    return { applied: !1, reason: "mismatch" };
  if (new Set(d).size !== d.length)
    return { applied: !1, reason: "mismatch" };
  const n = y(e, t);
  if (!n)
    return { applied: !1, reason: "no-node" };
  const o = n.data?.fields ?? [];
  if (d.length !== o.length)
    return { applied: !1, reason: "mismatch" };
  const i = new Set(o.map((p) => p.name)), r = new Set(d);
  if (i.size !== r.size)
    return { applied: !1, reason: "mismatch" };
  for (const p of d)
    if (!i.has(p))
      return { applied: !1, reason: "mismatch" };
  const s = /* @__PURE__ */ Object.create(null);
  for (const p of o)
    s[p.name] = p;
  const c = d.map((p) => s[p]);
  return n.data.fields.splice(0, n.data.fields.length, ...c), { applied: !0 };
}
function D(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e)
    t.set(n.id, n);
  const d = [];
  for (const n of e) {
    const o = n.data?.fields ?? [];
    for (const i of o) {
      if (typeof i?.name != "string" || !i.name.endsWith("_id"))
        continue;
      const r = i.name.slice(0, -3);
      if (!r)
        continue;
      const s = t.get(r);
      if (!s || s.id === n.id)
        continue;
      const c = s.data?.fields ?? [], f = c.find((u) => u.key === "primary")?.name ?? c[0]?.name ?? "id";
      d.push({
        fromNodeId: n.id,
        fromFieldName: i.name,
        toNodeId: s.id,
        toFieldName: f,
        confidence: "exact"
      });
    }
  }
  return d;
}
function q(e) {
  const t = (e.nodes ?? []).map((n) => ({
    id: n.id,
    label: n.data?.label ?? "",
    fields: (n.data?.fields ?? []).map((o) => ({ ...o })),
    position: { x: n.position?.x ?? 0, y: n.position?.y ?? 0 }
  })), d = (e.edges ?? []).map((n) => {
    const o = { id: n.id, source: n.source, target: n.target };
    return n.sourceHandle !== void 0 && (o.sourceHandle = n.sourceHandle), n.targetHandle !== void 0 && (o.targetHandle = n.targetHandle), n.label !== void 0 && (o.label = n.label), o;
  });
  return { version: 1, nodes: t, edges: d };
}
function z(e, t) {
  if (!t || typeof t.version != "number")
    throw new Error("[alpineflow/schema] schemaFromJSON: missing or invalid version");
  if (t.version !== 1)
    throw new Error(`[alpineflow/schema] schemaFromJSON: unsupported version ${t.version}`);
  const d = (t.nodes ?? []).map((o) => ({
    id: o.id,
    position: { x: o.position?.x ?? 0, y: o.position?.y ?? 0 },
    data: {
      label: o.label,
      fields: (o.fields ?? []).map((i) => ({ ...i }))
    }
  })), n = (t.edges ?? []).map((o) => {
    const i = { id: o.id, source: o.source, target: o.target };
    return o.sourceHandle !== void 0 && (i.sourceHandle = o.sourceHandle), o.targetHandle !== void 0 && (i.targetHandle = o.targetHandle), o.label !== void 0 && (i.label = o.label), i;
  });
  e.nodes.splice(0, e.nodes.length, ...d), e.edges.splice(0, e.edges.length, ...n);
}
function h(e) {
  if (!e || e.size === 0)
    return null;
  let t = null;
  for (const d of e)
    t = d;
  return t;
}
function J(e) {
  if (!e)
    return null;
  const t = e.indexOf(".");
  return t < 1 || t === e.length - 1 ? null : { nodeId: e.slice(0, t), fieldName: e.slice(t + 1) };
}
function x(e, t) {
  const d = t.closest("[x-data]");
  if (!d)
    return null;
  try {
    return e.$data(d) ?? null;
  } catch {
    return null;
  }
}
function I(e) {
  return e.querySelector(
    ":scope > template[x-schema-default-ui]"
  );
}
function E(e) {
  const t = e.querySelector(":scope > [data-schema-default-ui-root]");
  t && t.remove();
}
function F(e) {
  const t = document.createElement("div");
  return t.setAttribute("data-schema-default-ui-root", ""), e.appendChild(t), t;
}
function M(e) {
  e.directive(
    "schema-node-inspector",
    (t, d, { effect: n, cleanup: o }) => {
      const i = t, r = x(e, i);
      if (!r)
        return;
      const s = I(i), c = {
        addField(f) {
          const u = h(r.selectedNodes);
          return u ? r.addField?.(u, f) ?? { applied: !1, reason: "no-helper" } : { applied: !1, reason: "no-selection" };
        },
        renameField(f, u) {
          const a = h(r.selectedNodes);
          return a ? r.renameField?.(a, f, u) ?? {
            applied: !1,
            reason: "no-helper",
            cascadedEdgeIds: []
          } : { applied: !1, reason: "no-selection", cascadedEdgeIds: [] };
        },
        removeField(f) {
          const u = h(r.selectedNodes);
          return u ? r.removeField?.(u, f) ?? {
            applied: !1,
            reason: "no-helper",
            droppedEdgeIds: []
          } : { applied: !1, reason: "no-selection", droppedEdgeIds: [] };
        },
        reorderFields(f) {
          const u = h(r.selectedNodes);
          return u ? r.reorderFields?.(u, f) ?? {
            applied: !1,
            reason: "no-helper"
          } : { applied: !1, reason: "no-selection" };
        }
      }, p = e.addScopeToNode(i, {
        inspector: c,
        get selectedNode() {
          const f = h(r.selectedNodes);
          return f ? r.nodes?.find((u) => u.id === f) ?? null : null;
        }
      });
      s && n(() => {
        B(i, r);
      }), o(() => {
        E(i), p?.();
      });
    }
  );
}
function B(e, t) {
  E(e);
  const d = F(e), n = h(t.selectedNodes), o = n ? t.nodes?.find((a) => a.id === n) : null;
  if (!o) {
    const a = document.createElement("div");
    a.setAttribute("data-schema-inspector-empty", ""), a.textContent = "No node selected.", d.appendChild(a);
    return;
  }
  const i = document.createElement("header");
  i.setAttribute("data-schema-inspector-label", ""), i.textContent = String(o.data?.label ?? o.id), d.appendChild(i);
  const r = document.createElement("ul");
  r.setAttribute("data-schema-inspector-fields", "");
  const s = Array.isArray(o.data?.fields) ? o.data.fields : [];
  for (const a of s) {
    const l = document.createElement("li");
    l.setAttribute("data-schema-inspector-field", ""), l.dataset.fieldName = String(a?.name ?? "");
    const g = document.createElement("span");
    if (g.textContent = String(a?.name ?? ""), l.appendChild(g), a?.type) {
      const v = document.createElement("span");
      v.setAttribute("data-field-type", ""), v.textContent = String(a.type), l.appendChild(v);
    }
    const m = document.createElement("button");
    m.type = "button", m.setAttribute("data-action", "remove"), m.textContent = "remove", m.addEventListener("click", () => {
      t.removeField?.(o.id, a.name);
    }), l.appendChild(m), r.appendChild(l);
  }
  d.appendChild(r);
  const c = document.createElement("form");
  c.setAttribute("data-schema-inspector-add-field", "");
  const p = document.createElement("input");
  p.setAttribute("data-field", "name"), p.placeholder = "field name", c.appendChild(p);
  const f = document.createElement("input");
  f.setAttribute("data-field", "type"), f.placeholder = "type", f.value = "text", c.appendChild(f);
  const u = document.createElement("button");
  u.type = "submit", u.textContent = "add", c.appendChild(u), c.addEventListener("submit", (a) => {
    a.preventDefault();
    const l = p.value.trim();
    if (!l)
      return;
    const g = f.value.trim() || "text";
    t.addField?.(o.id, { name: l, type: g })?.applied && (p.value = "");
  }), d.appendChild(c);
}
function U(e) {
  e.directive(
    "schema-row-inspector",
    (t, d, { effect: n, cleanup: o }) => {
      const i = t, r = x(e, i);
      if (!r)
        return;
      const s = I(i), c = () => J(h(r.selectedRows)), p = () => {
        const a = c();
        if (!a)
          return null;
        const l = r.nodes?.find((m) => m.id === a.nodeId);
        return l ? (l.data?.fields ?? []).find((m) => m?.name === a.fieldName) ?? null : null;
      }, f = {
        renameField(a) {
          const l = c();
          return l ? r.renameField?.(l.nodeId, l.fieldName, a) ?? {
            applied: !1,
            reason: "no-helper",
            cascadedEdgeIds: []
          } : { applied: !1, reason: "no-selection", cascadedEdgeIds: [] };
        },
        removeField() {
          const a = c();
          return a ? r.removeField?.(a.nodeId, a.fieldName) ?? {
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
        updateField(a) {
          const l = p();
          if (!l)
            return { applied: !1, reason: "no-selection" };
          for (const [g, m] of Object.entries(a))
            g !== "name" && (l[g] = m);
          return { applied: !0 };
        }
      }, u = e.addScopeToNode(i, {
        inspector: f,
        get selectedRow() {
          return c();
        }
      });
      s && n(() => {
        $(i, r, c());
      }), o(() => {
        E(i), u?.();
      });
    }
  );
}
function $(e, t, d) {
  E(e);
  const n = F(e);
  if (!d) {
    const l = document.createElement("div");
    l.setAttribute("data-schema-inspector-empty", ""), l.textContent = "No row selected.", n.appendChild(l);
    return;
  }
  const i = t.nodes?.find((l) => l.id === d.nodeId)?.data?.fields?.find((l) => l?.name === d.fieldName) ?? null;
  if (!i) {
    const l = document.createElement("div");
    l.setAttribute("data-schema-inspector-empty", ""), l.textContent = "Selected row no longer exists.", n.appendChild(l);
    return;
  }
  const r = document.createElement("label");
  r.textContent = "name ";
  const s = document.createElement("input");
  s.setAttribute("data-field", "name"), s.value = String(i.name ?? ""), s.addEventListener("change", () => {
    const l = s.value.trim();
    !l || l === i.name || t.renameField?.(d.nodeId, d.fieldName, l);
  }), r.appendChild(s), n.appendChild(r);
  const c = document.createElement("label");
  c.textContent = "type ";
  const p = document.createElement("input");
  p.setAttribute("data-field", "type"), p.value = String(i.type ?? ""), p.addEventListener("change", () => {
    i.type = p.value;
  }), c.appendChild(p), n.appendChild(c);
  const f = document.createElement("label");
  f.textContent = "required ";
  const u = document.createElement("input");
  u.type = "checkbox", u.setAttribute("data-field", "required"), u.checked = !!i.required, u.addEventListener("change", () => {
    i.required = u.checked;
  }), f.appendChild(u), n.appendChild(f);
  const a = document.createElement("button");
  a.type = "button", a.setAttribute("data-action", "remove"), a.textContent = "remove", a.addEventListener("click", () => {
    t.removeField?.(d.nodeId, d.fieldName);
  }), n.appendChild(a);
}
function G(e) {
  e.directive(
    "schema-edge-inspector",
    (t, d, { effect: n, cleanup: o }) => {
      const i = t, r = x(e, i);
      if (!r)
        return;
      const s = I(i), c = () => {
        const u = h(r.selectedEdges);
        return u ? r.edges?.find((a) => a.id === u) ?? null : null;
      }, p = {
        updateEdge(u) {
          const a = c();
          if (!a)
            return { applied: !1, reason: "no-selection" };
          for (const [l, g] of Object.entries(u))
            a[l] = g;
          return { applied: !0 };
        },
        setLabel(u) {
          return this.updateEdge({ label: u });
        },
        removeEdge() {
          const u = c();
          if (!u)
            return { applied: !1, reason: "no-selection" };
          if (typeof r.removeEdges == "function")
            return r.removeEdges([u.id]), { applied: !0 };
          const a = r.edges?.findIndex((l) => l.id === u.id) ?? -1;
          return a === -1 ? { applied: !1, reason: "no-helper" } : (r.edges.splice(a, 1), { applied: !0 });
        }
      }, f = e.addScopeToNode(i, {
        inspector: p,
        get selectedEdge() {
          return c();
        }
      });
      s && n(() => {
        W(i, r, c());
      }), o(() => {
        E(i), f?.();
      });
    }
  );
}
function W(e, t, d) {
  E(e);
  const n = F(e);
  if (!d) {
    const s = document.createElement("div");
    s.setAttribute("data-schema-inspector-empty", ""), s.textContent = "No edge selected.", n.appendChild(s);
    return;
  }
  const o = document.createElement("label");
  o.textContent = "label ";
  const i = document.createElement("input");
  i.setAttribute("data-field", "label"), i.value = String(d.label ?? ""), i.addEventListener("input", () => {
    d.label = i.value;
  }), o.appendChild(i), n.appendChild(o);
  const r = document.createElement("button");
  r.type = "button", r.setAttribute("data-action", "delete"), r.textContent = "delete", r.addEventListener("click", () => {
    if (typeof t.removeEdges == "function")
      t.removeEdges([d.id]);
    else {
      const s = t.edges?.findIndex((c) => c.id === d.id) ?? -1;
      s !== -1 && t.edges.splice(s, 1);
    }
  }), n.appendChild(r);
}
function Y(e) {
  e && typeof e.directive == "function" && (M(e), U(e), G(e)), A("schema", {
    setup(t) {
      !t.el && t._container && (t.el = t._container), t.addField = function(d, n) {
        return R(this, d, n);
      }, t.renameField = function(d, n, o) {
        return k(this, d, n, o);
      }, t.removeField = function(d, n) {
        return O(this, d, n);
      }, t.reorderFields = function(d, n) {
        return T(this, d, n);
      }, t.inferReferences = function() {
        return D(this.nodes ?? []);
      }, t.schemaToJSON = function() {
        return q(this);
      }, t.schemaFromJSON = function(d) {
        return z(this, d);
      };
    }
  });
}
export {
  R as addField,
  Y as default,
  D as inferReferences,
  G as registerEdgeInspectorDirective,
  M as registerNodeInspectorDirective,
  U as registerRowInspectorDirective,
  O as removeField,
  k as renameField,
  T as reorderFields,
  z as schemaFromJSON,
  q as schemaToJSON
};
//# sourceMappingURL=alpineflow-schema.esm.js.map
