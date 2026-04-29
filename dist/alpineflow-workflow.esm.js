const b = "__alpineflow_registry__";
function C() {
  return typeof globalThis < "u" ? (globalThis[b] || (globalThis[b] = /* @__PURE__ */ new Map()), globalThis[b]) : /* @__PURE__ */ new Map();
}
function M(e, n) {
  C().set(e, n);
}
function D(e, n) {
  return n.split(".").reduce((r, u) => r?.[u], e);
}
function O(e, n) {
  const r = D(n, e.field);
  switch (e.op) {
    case "equals":
      return r === e.value;
    case "notEquals":
      return r !== e.value;
    case "in":
      return Array.isArray(e.value) && e.value.includes(r);
    case "notIn":
      return Array.isArray(e.value) && !e.value.includes(r);
    case "greaterThan":
      return r > e.value;
    case "lessThan":
      return r < e.value;
    case "greaterThanOrEqual":
      return r >= e.value;
    case "lessThanOrEqual":
      return r <= e.value;
    case "exists":
      return r != null;
    case "matches":
      return new RegExp(e.value).test(String(r ?? ""));
    default:
      return !1;
  }
}
function I(e, n, r) {
  const u = e.getEdge?.(n) ?? e.edges?.find((a) => a.id === n);
  if (!u)
    return;
  const s = u.class ?? "";
  s.split(" ").includes(r) || (u.class = s ? `${s} ${r}` : r);
}
function $(e, n, r) {
  const u = e.getEdge?.(n) ?? e.edges?.find((a) => a.id === n);
  if (!u)
    return;
  const s = (u.class ?? "").split(" ").filter((a) => a !== r).join(" ");
  u.class = s || void 0;
}
function A(e, n) {
  I(e, n, "flow-edge-entering");
}
function E(e, n) {
  $(e, n, "flow-edge-entering"), I(e, n, "flow-edge-completed");
}
function h(e, n) {
  I(e, n, "flow-edge-taken");
}
function S(e, n) {
  I(e, n, "flow-edge-untaken");
}
function T(e, n) {
  $(e, n, "flow-edge-entering"), I(e, n, "flow-edge-failed");
}
function y(e, n, r) {
  const u = e.executionLog, s = { t: Date.now(), ...n };
  for (u.push(s); u.length > r; )
    u.shift();
}
function x(e) {
  return async function(r, u = {}, s = {}) {
    const a = {
      payload: { ...s.payload ?? {} },
      nodeResults: {},
      currentNodeId: null,
      startedAt: Date.now()
    }, d = {
      isPaused: !1,
      isStopped: !1,
      pausePromise: null,
      pauseResolve: null
    }, f = {
      get isPaused() {
        return d.isPaused;
      },
      get isStopped() {
        return d.isStopped;
      },
      pause() {
        !d.isPaused && !d.isStopped && (d.isPaused = !0, d.pausePromise = new Promise((i) => {
          d.pauseResolve = i;
        }));
      },
      resume() {
        d.isPaused && (d.isPaused = !1, d.pauseResolve?.(), d.pausePromise = null, d.pauseResolve = null);
      },
      stop() {
        d.isStopped = !0, d.isPaused = !1, d.pauseResolve?.(), d.pausePromise = null, d.pauseResolve = null;
      },
      finished: null
    }, o = s.logLimit ?? 500, l = /* @__PURE__ */ new Set(), t = (async () => {
      if (await Promise.resolve(), typeof e.resetStates == "function" && e.resetStates(), Array.isArray(e.edges))
        for (const i of e.edges) i.class = void 0;
      typeof e.resetExecutionLog == "function" && e.resetExecutionLog(), s.lock && e.toggleInteractive?.(), y(e, { type: "run:started", payload: a.payload }, o);
      try {
        if (await P(e, r, a, u, s, d, l, o), a.currentNodeId = null, !d.isStopped) {
          if (Array.isArray(e.nodes))
            for (const i of e.nodes)
              !l.has(i.id) && !i.runState && e.setNodeState(i.id, "skipped");
          y(e, { type: "run:complete", payload: a.payload }, o), u.onComplete?.(a);
        }
      } catch (i) {
        throw d.isStopped = !0, d.pauseResolve?.(), i;
      } finally {
        s.lock && e.toggleInteractive?.();
      }
      return a;
    })();
    return f.finished = t, f;
  };
}
async function P(e, n, r, u, s, a, d, f) {
  let o = n;
  for (; o; ) {
    if (a.isStopped) {
      y(e, { type: "run:stopped", nodeId: r.currentNodeId ?? void 0 }, f);
      break;
    }
    if (d.has(o))
      break;
    if (d.add(o), a.isPaused && a.pausePromise && (await a.pausePromise, a.isStopped)) {
      y(e, { type: "run:stopped", nodeId: r.currentNodeId ?? void 0 }, f);
      break;
    }
    const l = e.getNode(o);
    if (!l)
      break;
    r.currentNodeId = o;
    const t = (e.edges ?? []).filter((c) => c.target === o);
    for (const c of t)
      A(e, c.id);
    if (l.type === "flow-wait") {
      e.setNodeState(o, "running");
      const c = l.data?.durationMs ?? s.defaultDurationMs ?? 1e3;
      y(e, { type: "wait:start", nodeId: o }, f);
      const k = Date.now();
      await R(c), y(e, { type: "wait:end", nodeId: o, runtimeMs: Date.now() - k }, f), e.setNodeState(o, "completed");
      for (const m of t)
        E(e, m.id);
      const w = await N(e, l, o, u, s, r, f);
      if (w.length === 0)
        break;
      if (w.length === 1)
        o = w[0];
      else {
        y(e, { type: "parallel:fork", nodeId: o, payload: { branches: w } }, f), await Promise.all(w.map(
          (m) => P(e, m, { ...r, payload: { ...r.payload } }, u, s, a, d, f)
        ));
        break;
      }
      continue;
    }
    e.setNodeState(o, "running");
    const i = Date.now();
    y(e, { type: "node:enter", nodeId: o }, f);
    try {
      const c = await u.onEnter?.(l, r);
      c && typeof c == "object" && (r.nodeResults[o] = c, Object.assign(r.payload, c));
    } catch (c) {
      e.setNodeState(o, "failed");
      for (const k of t)
        T(e, k.id);
      throw y(e, { type: "run:error", nodeId: o, payload: { error: c.message } }, f), u.onError?.(c, l, r), c;
    }
    s.defaultDurationMs && await R(s.defaultDurationMs), e.setNodeState(o, "completed");
    for (const c of t)
      E(e, c.id);
    const p = await u.onExit?.(l, r);
    p && typeof p == "object" && (r.nodeResults[`${o}:exit`] = p, Object.assign(r.payload, p)), y(e, { type: "node:exit", nodeId: o, runtimeMs: Date.now() - i, outputs: r.nodeResults[o] }, f);
    const g = await N(e, l, o, u, s, r, f);
    if (g.length === 0)
      break;
    if (g.length === 1)
      o = g[0];
    else {
      y(e, { type: "parallel:fork", nodeId: o, payload: { branches: g } }, f), await Promise.all(g.map(
        (c) => P(e, c, { ...r, payload: { ...r.payload } }, u, s, a, d, f)
      ));
      break;
    }
  }
}
async function N(e, n, r, u, s, a, d) {
  const f = (e.edges ?? []).filter((o) => o.source === r);
  if (f.length === 0)
    return [];
  if (u.pickBranch) {
    const o = await u.pickBranch(n, f, a);
    if (o) {
      const l = f.find((t) => t.id === o) ?? null;
      if (l) {
        if (h(e, l.id), y(e, { type: "edge:taken", edgeId: l.id }, d), s.muteUntakenBranches)
          for (const t of f)
            t.id !== l.id && (S(e, t.id), y(e, { type: "edge:untaken", edgeId: t.id }, d));
        return s.particleOnEdges && e.sendParticle?.(l.id, s.particleOptions ?? {}), [l.target];
      }
      return [];
    }
  }
  if (n.type === "flow-condition") {
    const o = B(n, f, a.payload), l = o ? f.find((t) => t.target === o) : null;
    if (l) {
      if (y(e, { type: "branch:chosen", nodeId: r, edgeId: l.id }, d), h(e, l.id), y(e, { type: "edge:taken", edgeId: l.id }, d), s.muteUntakenBranches)
        for (const t of f)
          t.id !== l.id && (S(e, t.id), y(e, { type: "edge:untaken", edgeId: t.id }, d));
      return s.particleOnEdges && e.sendParticle?.(l.id, s.particleOptions ?? {}), [l.target];
    }
    return [];
  }
  if (f.length === 1) {
    const o = f[0];
    return h(e, o.id), y(e, { type: "edge:taken", edgeId: o.id }, d), s.particleOnEdges && e.sendParticle?.(o.id, s.particleOptions ?? {}), [o.target];
  }
  for (const o of f)
    h(e, o.id), y(e, { type: "edge:taken", edgeId: o.id }, d), s.particleOnEdges && e.sendParticle?.(o.id, s.particleOptions ?? {});
  return f.map((o) => o.target);
}
function B(e, n, r) {
  let u;
  if (typeof e.data?.evaluate == "function")
    u = !!e.data.evaluate(r);
  else if (e.data?.condition)
    u = O(e.data.condition, r);
  else
    return n[0]?.target ?? null;
  const s = u ? "true" : "false";
  return n.find((d) => d.sourceHandle === s)?.target ?? null;
}
function R(e) {
  return new Promise((n) => setTimeout(n, e));
}
function H(e) {
  return async function(r, u = {}) {
    const s = u.speed ?? 1;
    let a = !1, d = !1, f = null;
    const o = {
      get isPaused() {
        return a;
      },
      get isStopped() {
        return d;
      },
      pause() {
        !a && !d && (a = !0);
      },
      resume() {
        a && (a = !1, f?.(), f = null);
      },
      stop() {
        d = !0, a = !1, f?.(), f = null;
      },
      finished: null
    }, l = (async () => {
      if (await Promise.resolve(), typeof e.resetStates == "function" && e.resetStates(), Array.isArray(e.edges))
        for (const i of e.edges) i.class = void 0;
      let t = r[0]?.t ?? Date.now();
      for (const i of r) {
        if (d || a && (await new Promise((g) => {
          f = g;
        }), d))
          break;
        const p = (i.t - t) / s;
        switch (p > 10 && await j(p), t = i.t, i.type) {
          case "node:enter":
            if (i.nodeId) {
              e.setNodeState(i.nodeId, "running");
              const g = (e.edges ?? []).filter((c) => c.target === i.nodeId);
              for (const c of g)
                A(e, c.id);
            }
            break;
          case "node:exit":
            if (i.nodeId) {
              e.setNodeState(i.nodeId, "completed");
              const g = (e.edges ?? []).filter((c) => c.target === i.nodeId);
              for (const c of g)
                E(e, c.id);
            }
            break;
          case "run:error":
            if (i.nodeId) {
              e.setNodeState(i.nodeId, "failed");
              const g = (e.edges ?? []).filter((c) => c.target === i.nodeId);
              for (const c of g)
                T(e, c.id);
            }
            break;
          case "edge:taken":
            i.edgeId && h(e, i.edgeId);
            break;
          case "edge:untaken":
            i.edgeId && S(e, i.edgeId);
            break;
          case "wait:start":
            i.nodeId && e.setNodeState(i.nodeId, "running");
            break;
          case "wait:end":
            i.nodeId && e.setNodeState(i.nodeId, "completed");
            break;
        }
      }
    })();
    return o.finished = l, o;
  };
}
function j(e) {
  return new Promise((n) => setTimeout(n, e));
}
function q(e, n) {
  for (const o of n)
    if (o && typeof o.source == "string" && o.source === o.target)
      return !0;
  const r = /* @__PURE__ */ new Map(), u = (o) => {
    let l = r.get(o);
    return l || (l = [], r.set(o, l)), l;
  };
  for (const o of e)
    o && typeof o.id == "string" && u(o.id);
  for (const o of n)
    !o || typeof o.source != "string" || typeof o.target != "string" || (u(o.source).push(o.target), u(o.target));
  const s = 0, a = 1, d = 2, f = /* @__PURE__ */ new Map();
  for (const o of r.keys()) f.set(o, s);
  for (const o of r.keys()) {
    if (f.get(o) !== s) continue;
    const l = [{ node: o, idx: 0 }];
    for (f.set(o, a); l.length > 0; ) {
      const t = l[l.length - 1], i = r.get(t.node) ?? [];
      if (t.idx < i.length) {
        const p = i[t.idx++], g = f.get(p);
        if (g === a) return !0;
        g === s && (f.set(p, a), l.push({ node: p, idx: 0 }));
      } else
        f.set(t.node, d), l.pop();
    }
  }
  return !1;
}
function _(e) {
  const n = [], r = Array.isArray(e?.nodes) ? e.nodes : [], u = Array.isArray(e?.edges) ? e.edges : [], s = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Set();
  for (const t of r)
    !t || typeof t.id != "string" || (s.has(t.id) && a.add(t.id), s.add(t.id));
  for (const t of a)
    n.push({
      severity: "error",
      code: "duplicate-node-id",
      nodeId: t,
      message: `Duplicate node id "${t}".`
    });
  for (const t of r) {
    if (!t || typeof t.id != "string") continue;
    const i = t.data ?? {};
    if (t.type === "flow-condition") {
      const p = i.condition !== void 0 && i.condition !== null, g = typeof i.evaluate == "function";
      !p && !g && n.push({
        severity: "error",
        code: "missing-condition",
        nodeId: t.id,
        message: `Condition node "${t.id}" has neither a "condition" object nor an "evaluate" function.`
      });
    }
    if (t.type === "flow-wait") {
      const p = i.durationMs;
      (typeof p != "number" || !Number.isFinite(p)) && n.push({
        severity: "error",
        code: "wait-missing-duration",
        nodeId: t.id,
        message: `Wait node "${t.id}" is missing numeric data.durationMs.`
      });
    }
  }
  for (const t of u) {
    if (!t) continue;
    const i = typeof t.id == "string" ? t.id : void 0;
    (typeof t.source != "string" || !s.has(t.source)) && n.push({
      severity: "error",
      code: "dangling-edge",
      edgeId: i,
      nodeId: typeof t.source == "string" ? t.source : void 0,
      message: `Edge ${i ? `"${i}" ` : ""}references missing source node "${t.source}".`
    }), (typeof t.target != "string" || !s.has(t.target)) && n.push({
      severity: "error",
      code: "dangling-edge",
      edgeId: i,
      nodeId: typeof t.target == "string" ? t.target : void 0,
      message: `Edge ${i ? `"${i}" ` : ""}references missing target node "${t.target}".`
    });
  }
  const d = r.filter((t) => t && t.type === "flow-condition" && typeof t.id == "string");
  for (const t of d) {
    const i = u.filter((g) => g && g.source === t.id), p = /* @__PURE__ */ new Set();
    for (const g of i)
      typeof g.sourceHandle == "string" && (p.add(g.sourceHandle), g.sourceHandle !== "true" && g.sourceHandle !== "false" && n.push({
        severity: "error",
        code: "unhandled-source-handle",
        edgeId: typeof g.id == "string" ? g.id : void 0,
        nodeId: t.id,
        message: `Condition node "${t.id}" has an outgoing edge with sourceHandle "${g.sourceHandle}" — only "true" / "false" are recognised.`
      }));
    p.has("true") || n.push({
      severity: "error",
      code: "condition-missing-branch",
      nodeId: t.id,
      message: `Condition node "${t.id}" is missing the "true" branch.`
    }), p.has("false") || n.push({
      severity: "error",
      code: "condition-missing-branch",
      nodeId: t.id,
      message: `Condition node "${t.id}" is missing the "false" branch.`
    });
  }
  const f = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Set();
  for (const t of u)
    t && (typeof t.target == "string" && f.add(t.target), typeof t.source == "string" && o.add(t.source));
  for (const t of r)
    !t || typeof t.id != "string" || !f.has(t.id) && !o.has(t.id) && n.push({
      severity: "warning",
      code: "unreachable-node",
      nodeId: t.id,
      message: `Node "${t.id}" has no connected edges.`
    });
  return q(r, u) && n.push({
    severity: "warning",
    code: "cycle",
    message: "Directed cycle detected in workflow graph."
  }), { valid: !n.some((t) => t.severity === "error"), issues: n };
}
function W(e) {
  M("workflow", {
    setup(n) {
      n.run = x(n), n.replayExecution = H(n), n.executionLog = [], n.resetExecutionLog = function() {
        this.executionLog = [];
      }, n.validateWorkflow = function() {
        return _(this);
      };
    }
  }), e.magic("workflowRun", (n) => async (r, u, s) => {
    const a = n.closest(".flow-container") ?? n.querySelector(".flow-container") ?? document.querySelector(".flow-container");
    if (!a)
      return console.warn("[workflow] $workflowRun: no .flow-container found"), null;
    const d = e.$data(a);
    return typeof d?.run != "function" ? (console.warn("[workflow] $workflowRun: canvas.run not available — is the workflow addon registered?"), null) : d.run(r, u, s);
  });
}
export {
  W as default,
  _ as validateWorkflow
};
//# sourceMappingURL=alpineflow-workflow.esm.js.map
