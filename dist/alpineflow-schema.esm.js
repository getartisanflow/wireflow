const C = "__alpineflow_registry__";
function w() {
  return typeof globalThis < "u" ? (globalThis[C] || (globalThis[C] = /* @__PURE__ */ new Map()), globalThis[C]) : /* @__PURE__ */ new Map();
}
function N(t, n) {
  w().set(t, n);
}
function _(t, n, d, e) {
  const o = [];
  return { edges: t.map((r) => {
    let s = r;
    return r.source === n && r.sourceHandle === d && (s = { ...s, sourceHandle: e }), r.target === n && r.targetHandle === d && (s = { ...s, targetHandle: e }), s !== r && o.push(r.id), s;
  }), cascadedIds: o };
}
function A(t, n, d) {
  const e = [];
  return { edges: t.filter((i) => {
    const r = i.source === n && i.sourceHandle === d || i.target === n && i.targetHandle === d;
    return r && e.push(i.id), !r;
  }), droppedIds: e };
}
const H = /^[a-z][a-z0-9_]*$/, L = 40;
function F(t) {
  return typeof t == "string" && t.length <= L && H.test(t);
}
function b(t, n, d) {
  const e = t?.el ?? t?._container;
  if (!e || typeof e.dispatchEvent != "function")
    return;
  const o = [], i = typeof window < "u" ? window : void 0, r = (s) => {
    o.push(s.error ?? s.message), s.preventDefault();
  };
  i && typeof i.addEventListener == "function" && i.addEventListener("error", r, !0);
  try {
    e.dispatchEvent(new CustomEvent(n, { detail: d, bubbles: !0 }));
  } catch (s) {
    o.push(s);
  } finally {
    i && typeof i.removeEventListener == "function" && i.removeEventListener("error", r, !0);
  }
  for (const s of o)
    console.error("[alpineflow/schema] listener threw while handling", n, s);
}
function v(t, n) {
  return t?.nodes?.find((d) => d.id === n) ?? null;
}
function R(t, n, d) {
  const e = v(t, n);
  return e ? F(d?.name) ? (e.data || (e.data = { label: n, fields: [] }), (e.data.fields ?? []).some((i) => i.name === d.name) ? { applied: !1, reason: "duplicate" } : (Array.isArray(e.data.fields) || (e.data.fields = []), e.data.fields.push({ ...d }), b(t, "schema:field-added", { nodeId: n, field: { ...d } }), { applied: !0 })) : { applied: !1, reason: "invalid-name" } : { applied: !1, reason: "no-node" };
}
function O(t, n, d, e) {
  if (d === e)
    return { applied: !1, reason: "unchanged", cascadedEdgeIds: [] };
  if (!F(e))
    return { applied: !1, reason: "invalid-name", cascadedEdgeIds: [] };
  const o = v(t, n);
  if (!o)
    return { applied: !1, reason: "no-node", cascadedEdgeIds: [] };
  const i = o.data?.fields ?? [], r = i.find((f) => f.name === d);
  if (!r)
    return { applied: !1, reason: "no-field", cascadedEdgeIds: [] };
  if (i.some((f) => f.name === e))
    return { applied: !1, reason: "duplicate", cascadedEdgeIds: [] };
  r.name = e;
  const s = t.edges ?? [], { edges: c, cascadedIds: u } = _(s, n, d, e);
  return u.length > 0 && t.edges.splice(0, t.edges.length, ...c), b(t, "schema:field-renamed", {
    nodeId: n,
    oldName: d,
    newName: e,
    cascadedEdgeIds: u
  }), u.length > 0 && b(t, "schema:edges-cascaded", {
    nodeId: n,
    fieldName: e,
    edgeIds: u,
    operation: "rename"
  }), { applied: !0, cascadedEdgeIds: u };
}
function k(t, n, d) {
  const e = v(t, n);
  if (!e)
    return { applied: !1, reason: "no-node", droppedEdgeIds: [] };
  const i = (e.data?.fields ?? []).findIndex((u) => u.name === d);
  if (i === -1)
    return { applied: !1, reason: "no-field", droppedEdgeIds: [] };
  e.data.fields.splice(i, 1);
  const r = t.edges ?? [], { edges: s, droppedIds: c } = A(r, n, d);
  return c.length > 0 && t.edges.splice(0, t.edges.length, ...s), b(t, "schema:field-removed", {
    nodeId: n,
    fieldName: d,
    droppedEdgeIds: c
  }), c.length > 0 && b(t, "schema:edges-cascaded", {
    nodeId: n,
    fieldName: d,
    edgeIds: c,
    operation: "remove"
  }), { applied: !0, droppedEdgeIds: c };
}
function T(t, n, d) {
  if (!Array.isArray(d))
    return { applied: !1, reason: "mismatch" };
  if (new Set(d).size !== d.length)
    return { applied: !1, reason: "mismatch" };
  const e = v(t, n);
  if (!e)
    return { applied: !1, reason: "no-node" };
  const o = e.data?.fields ?? [];
  if (d.length !== o.length)
    return { applied: !1, reason: "mismatch" };
  const i = new Set(o.map((u) => u.name)), r = new Set(d);
  if (i.size !== r.size)
    return { applied: !1, reason: "mismatch" };
  for (const u of d)
    if (!i.has(u))
      return { applied: !1, reason: "mismatch" };
  const s = /* @__PURE__ */ Object.create(null);
  for (const u of o)
    s[u.name] = u;
  const c = d.map((u) => s[u]);
  return e.data.fields.splice(0, e.data.fields.length, ...c), { applied: !0 };
}
function D(t) {
  const n = /* @__PURE__ */ new Map();
  for (const e of t)
    n.set(e.id, e);
  const d = [];
  for (const e of t) {
    const o = e.data?.fields ?? [];
    for (const i of o) {
      if (typeof i?.name != "string" || !i.name.endsWith("_id"))
        continue;
      const r = i.name.slice(0, -3);
      if (!r)
        continue;
      const s = n.get(r);
      if (!s || s.id === e.id)
        continue;
      const c = s.data?.fields ?? [], f = c.find((p) => p.key === "primary")?.name ?? c[0]?.name ?? "id";
      d.push({
        fromNodeId: e.id,
        fromFieldName: i.name,
        toNodeId: s.id,
        toFieldName: f,
        confidence: "exact"
      });
    }
  }
  return d;
}
function q(t) {
  const n = (t.nodes ?? []).map((e) => ({
    id: e.id,
    label: e.data?.label ?? "",
    fields: (e.data?.fields ?? []).map((o) => ({ ...o })),
    position: { x: e.position?.x ?? 0, y: e.position?.y ?? 0 }
  })), d = (t.edges ?? []).map((e) => {
    const o = { id: e.id, source: e.source, target: e.target };
    return e.sourceHandle !== void 0 && (o.sourceHandle = e.sourceHandle), e.targetHandle !== void 0 && (o.targetHandle = e.targetHandle), e.label !== void 0 && (o.label = e.label), o;
  });
  return { version: 1, nodes: n, edges: d };
}
function M(t, n) {
  if (!n || typeof n.version != "number")
    throw new Error("[alpineflow/schema] schemaFromJSON: missing or invalid version");
  if (n.version !== 1)
    throw new Error(`[alpineflow/schema] schemaFromJSON: unsupported version ${n.version}`);
  const d = (n.nodes ?? []).map((o) => ({
    id: o.id,
    position: { x: o.position?.x ?? 0, y: o.position?.y ?? 0 },
    data: {
      label: o.label,
      fields: (o.fields ?? []).map((i) => ({ ...i }))
    }
  })), e = (n.edges ?? []).map((o) => {
    const i = { id: o.id, source: o.source, target: o.target };
    return o.sourceHandle !== void 0 && (i.sourceHandle = o.sourceHandle), o.targetHandle !== void 0 && (i.targetHandle = o.targetHandle), o.label !== void 0 && (i.label = o.label), i;
  });
  t.nodes.splice(0, t.nodes.length, ...d), t.edges.splice(0, t.edges.length, ...e);
}
function h(t) {
  if (!t || t.size === 0)
    return null;
  let n = null;
  for (const d of t)
    n = d;
  return n;
}
function z(t) {
  if (!t)
    return null;
  const n = t.indexOf(".");
  return n < 1 || n === t.length - 1 ? null : { nodeId: t.slice(0, n), fieldName: t.slice(n + 1) };
}
function x(t, n) {
  const d = n.closest(".flow-container");
  if (d)
    try {
      return t.$data(d) ?? null;
    } catch {
    }
  const e = document.querySelectorAll(".flow-container");
  if (e.length === 1)
    try {
      return t.$data(e[0]) ?? null;
    } catch {
    }
  return e.length > 1 && !window.__alpineflowSchemaMultiCanvasWarned && (window.__alpineflowSchemaMultiCanvasWarned = !0, console.warn(
    "[alpineflow/schema] inspector directive found multiple .flow-container elements on the page; place inspector inside the canvas OR scope the directive expression to a specific canvas (multi-canvas scope selector is on the v0.2.2 roadmap)."
  )), null;
}
function I(t) {
  return t.querySelector(
    ":scope > template[x-schema-default-ui]"
  );
}
function E(t) {
  const n = t.querySelector(":scope > [data-schema-default-ui-root]");
  n && n.remove();
}
function S(t) {
  const n = document.createElement("div");
  return n.setAttribute("data-schema-default-ui-root", ""), t.appendChild(n), n;
}
function J(t) {
  t.directive(
    "schema-node-inspector",
    (n, d, { effect: e, cleanup: o }) => {
      const i = n, r = x(t, i);
      if (!r)
        return;
      const s = I(i), c = {
        addField(f) {
          const p = h(r.selectedNodes);
          return p ? r.addField?.(p, f) ?? { applied: !1, reason: "no-helper" } : { applied: !1, reason: "no-selection" };
        },
        renameField(f, p) {
          const a = h(r.selectedNodes);
          return a ? r.renameField?.(a, f, p) ?? {
            applied: !1,
            reason: "no-helper",
            cascadedEdgeIds: []
          } : { applied: !1, reason: "no-selection", cascadedEdgeIds: [] };
        },
        removeField(f) {
          const p = h(r.selectedNodes);
          return p ? r.removeField?.(p, f) ?? {
            applied: !1,
            reason: "no-helper",
            droppedEdgeIds: []
          } : { applied: !1, reason: "no-selection", droppedEdgeIds: [] };
        },
        reorderFields(f) {
          const p = h(r.selectedNodes);
          return p ? r.reorderFields?.(p, f) ?? {
            applied: !1,
            reason: "no-helper"
          } : { applied: !1, reason: "no-selection" };
        }
      }, u = t.addScopeToNode(i, {
        inspector: c,
        get selectedNode() {
          const f = h(r.selectedNodes);
          return f ? r.nodes?.find((p) => p.id === f) ?? null : null;
        }
      });
      s && e(() => {
        B(i, r);
      }), o(() => {
        E(i), u?.();
      });
    }
  );
}
function B(t, n) {
  E(t);
  const d = S(t), e = h(n.selectedNodes), o = e ? n.nodes?.find((a) => a.id === e) : null;
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
      const y = document.createElement("span");
      y.setAttribute("data-field-type", ""), y.textContent = String(a.type), l.appendChild(y);
    }
    const m = document.createElement("button");
    m.type = "button", m.setAttribute("data-action", "remove"), m.textContent = "remove", m.addEventListener("click", () => {
      n.removeField?.(o.id, a.name);
    }), l.appendChild(m), r.appendChild(l);
  }
  d.appendChild(r);
  const c = document.createElement("form");
  c.setAttribute("data-schema-inspector-add-field", "");
  const u = document.createElement("input");
  u.setAttribute("data-field", "name"), u.placeholder = "field name", c.appendChild(u);
  const f = document.createElement("input");
  f.setAttribute("data-field", "type"), f.placeholder = "type", f.value = "text", c.appendChild(f);
  const p = document.createElement("button");
  p.type = "submit", p.textContent = "add", c.appendChild(p), c.addEventListener("submit", (a) => {
    a.preventDefault();
    const l = u.value.trim();
    if (!l)
      return;
    const g = f.value.trim() || "text";
    n.addField?.(o.id, { name: l, type: g })?.applied && (u.value = "");
  }), d.appendChild(c);
}
function U(t) {
  t.directive(
    "schema-row-inspector",
    (n, d, { effect: e, cleanup: o }) => {
      const i = n, r = x(t, i);
      if (!r)
        return;
      const s = I(i), c = () => z(h(r.selectedRows)), u = () => {
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
          const l = u();
          if (!l)
            return { applied: !1, reason: "no-selection" };
          for (const [g, m] of Object.entries(a))
            g !== "name" && (l[g] = m);
          return { applied: !0 };
        }
      }, p = t.addScopeToNode(i, {
        inspector: f,
        get selectedRow() {
          return c();
        }
      });
      s && e(() => {
        W(i, r, c());
      }), o(() => {
        E(i), p?.();
      });
    }
  );
}
function W(t, n, d) {
  E(t);
  const e = S(t);
  if (!d) {
    const l = document.createElement("div");
    l.setAttribute("data-schema-inspector-empty", ""), l.textContent = "No row selected.", e.appendChild(l);
    return;
  }
  const i = n.nodes?.find((l) => l.id === d.nodeId)?.data?.fields?.find((l) => l?.name === d.fieldName) ?? null;
  if (!i) {
    const l = document.createElement("div");
    l.setAttribute("data-schema-inspector-empty", ""), l.textContent = "Selected row no longer exists.", e.appendChild(l);
    return;
  }
  const r = document.createElement("label");
  r.textContent = "name ";
  const s = document.createElement("input");
  s.setAttribute("data-field", "name"), s.value = String(i.name ?? ""), s.addEventListener("change", () => {
    const l = s.value.trim();
    !l || l === i.name || n.renameField?.(d.nodeId, d.fieldName, l);
  }), r.appendChild(s), e.appendChild(r);
  const c = document.createElement("label");
  c.textContent = "type ";
  const u = document.createElement("input");
  u.setAttribute("data-field", "type"), u.value = String(i.type ?? ""), u.addEventListener("change", () => {
    i.type = u.value;
  }), c.appendChild(u), e.appendChild(c);
  const f = document.createElement("label");
  f.textContent = "required ";
  const p = document.createElement("input");
  p.type = "checkbox", p.setAttribute("data-field", "required"), p.checked = !!i.required, p.addEventListener("change", () => {
    i.required = p.checked;
  }), f.appendChild(p), e.appendChild(f);
  const a = document.createElement("button");
  a.type = "button", a.setAttribute("data-action", "remove"), a.textContent = "remove", a.addEventListener("click", () => {
    n.removeField?.(d.nodeId, d.fieldName);
  }), e.appendChild(a);
}
function $(t) {
  t.directive(
    "schema-edge-inspector",
    (n, d, { effect: e, cleanup: o }) => {
      const i = n, r = x(t, i);
      if (!r)
        return;
      const s = I(i), c = () => {
        const p = h(r.selectedEdges);
        return p ? r.edges?.find((a) => a.id === p) ?? null : null;
      }, u = {
        updateEdge(p) {
          const a = c();
          if (!a)
            return { applied: !1, reason: "no-selection" };
          for (const [l, g] of Object.entries(p))
            a[l] = g;
          return { applied: !0 };
        },
        setLabel(p) {
          return this.updateEdge({ label: p });
        },
        removeEdge() {
          const p = c();
          if (!p)
            return { applied: !1, reason: "no-selection" };
          if (typeof r.removeEdges == "function")
            return r.removeEdges([p.id]), { applied: !0 };
          const a = r.edges?.findIndex((l) => l.id === p.id) ?? -1;
          return a === -1 ? { applied: !1, reason: "no-helper" } : (r.edges.splice(a, 1), { applied: !0 });
        }
      }, f = t.addScopeToNode(i, {
        inspector: u,
        get selectedEdge() {
          return c();
        }
      });
      s && e(() => {
        G(i, r, c());
      }), o(() => {
        E(i), f?.();
      });
    }
  );
}
function G(t, n, d) {
  E(t);
  const e = S(t);
  if (!d) {
    const s = document.createElement("div");
    s.setAttribute("data-schema-inspector-empty", ""), s.textContent = "No edge selected.", e.appendChild(s);
    return;
  }
  const o = document.createElement("label");
  o.textContent = "label ";
  const i = document.createElement("input");
  i.setAttribute("data-field", "label"), i.value = String(d.label ?? ""), i.addEventListener("input", () => {
    d.label = i.value;
  }), o.appendChild(i), e.appendChild(o);
  const r = document.createElement("button");
  r.type = "button", r.setAttribute("data-action", "delete"), r.textContent = "delete", r.addEventListener("click", () => {
    if (typeof n.removeEdges == "function")
      n.removeEdges([d.id]);
    else {
      const s = n.edges?.findIndex((c) => c.id === d.id) ?? -1;
      s !== -1 && n.edges.splice(s, 1);
    }
  }), e.appendChild(r);
}
function Y(t) {
  t && typeof t.directive == "function" && (J(t), U(t), $(t)), N("schema", {
    setup(n) {
      !n.el && n._container && (n.el = n._container), n.addField = function(d, e) {
        return R(this, d, e);
      }, n.renameField = function(d, e, o) {
        return O(this, d, e, o);
      }, n.removeField = function(d, e) {
        return k(this, d, e);
      }, n.reorderFields = function(d, e) {
        return T(this, d, e);
      }, n.inferReferences = function() {
        return D(this.nodes ?? []);
      }, n.schemaToJSON = function() {
        return q(this);
      }, n.schemaFromJSON = function(d) {
        return M(this, d);
      };
    }
  });
}
export {
  R as addField,
  Y as default,
  D as inferReferences,
  $ as registerEdgeInspectorDirective,
  J as registerNodeInspectorDirective,
  U as registerRowInspectorDirective,
  k as removeField,
  O as renameField,
  T as reorderFields,
  M as schemaFromJSON,
  q as schemaToJSON
};
//# sourceMappingURL=alpineflow-schema.esm.js.map
