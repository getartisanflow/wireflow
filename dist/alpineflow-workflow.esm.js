const S = "__alpineflow_registry__";
function D() {
  return typeof globalThis < "u" ? (globalThis[S] || (globalThis[S] = /* @__PURE__ */ new Map()), globalThis[S]) : /* @__PURE__ */ new Map();
}
function M(e, d) {
  D().set(e, d);
}
function B(e, d) {
  return d.split(".").reduce((t, i) => t?.[i], e);
}
function $(e, d) {
  const t = B(d, e.field);
  switch (e.op) {
    case "equals":
      return t === e.value;
    case "notEquals":
      return t !== e.value;
    case "in":
      return Array.isArray(e.value) && e.value.includes(t);
    case "notIn":
      return Array.isArray(e.value) && !e.value.includes(t);
    case "greaterThan":
      return t > e.value;
    case "lessThan":
      return t < e.value;
    case "greaterThanOrEqual":
      return t >= e.value;
    case "lessThanOrEqual":
      return t <= e.value;
    case "exists":
      return t != null;
    case "matches":
      return new RegExp(e.value).test(String(t ?? ""));
    default:
      return !1;
  }
}
function h(e, d, t) {
  const i = e.getEdge?.(d) ?? e.edges?.find((s) => s.id === d);
  if (!i)
    return;
  const o = i.class ?? "";
  o.split(" ").includes(t) || (i.class = o ? `${o} ${t}` : t);
}
function T(e, d, t) {
  const i = e.getEdge?.(d) ?? e.edges?.find((s) => s.id === d);
  if (!i)
    return;
  const o = (i.class ?? "").split(" ").filter((s) => s !== t).join(" ");
  i.class = o || void 0;
}
function A(e, d) {
  h(e, d, "flow-edge-entering");
}
function b(e, d) {
  T(e, d, "flow-edge-entering"), h(e, d, "flow-edge-completed");
}
function k(e, d) {
  h(e, d, "flow-edge-taken");
}
function P(e, d) {
  h(e, d, "flow-edge-untaken");
}
function O(e, d) {
  T(e, d, "flow-edge-entering"), h(e, d, "flow-edge-failed");
}
function g(e, d, t) {
  const i = e.executionLog, o = { t: Date.now(), ...d };
  for (i.push(o); i.length > t; )
    i.shift();
}
function q(e) {
  return async function(t, i = {}, o = {}) {
    const s = {
      payload: { ...o.payload ?? {} },
      nodeResults: {},
      currentNodeId: null,
      startedAt: Date.now()
    }, n = {
      isPaused: !1,
      isStopped: !1,
      pausePromise: null,
      pauseResolve: null
    }, u = {
      get isPaused() {
        return n.isPaused;
      },
      get isStopped() {
        return n.isStopped;
      },
      pause() {
        !n.isPaused && !n.isStopped && (n.isPaused = !0, n.pausePromise = new Promise((l) => {
          n.pauseResolve = l;
        }));
      },
      resume() {
        n.isPaused && (n.isPaused = !1, n.pauseResolve?.(), n.pausePromise = null, n.pauseResolve = null);
      },
      stop() {
        n.isStopped = !0, n.isPaused = !1, n.pauseResolve?.(), n.pausePromise = null, n.pauseResolve = null;
      },
      finished: null
    }, r = o.logLimit ?? 500, a = /* @__PURE__ */ new Set(), p = (async () => {
      if (await Promise.resolve(), typeof e.resetStates == "function" && e.resetStates(), Array.isArray(e.edges))
        for (const l of e.edges) l.class = void 0;
      typeof e.resetExecutionLog == "function" && e.resetExecutionLog(), o.lock && e.toggleInteractive?.(), g(e, { type: "run:started", payload: s.payload }, r);
      try {
        if (await m(e, t, s, i, o, n, a, r), s.currentNodeId = null, !n.isStopped) {
          if (Array.isArray(e.nodes))
            for (const l of e.nodes)
              !a.has(l.id) && !l.runState && e.setNodeState(l.id, "skipped");
          g(e, { type: "run:complete", payload: s.payload }, r), i.onComplete?.(s);
        }
      } catch (l) {
        throw n.isStopped = !0, n.pauseResolve?.(), l;
      } finally {
        o.lock && e.toggleInteractive?.();
      }
      return s;
    })();
    return u.finished = p, u;
  };
}
async function m(e, d, t, i, o, s, n, u) {
  let r = d;
  for (; r; ) {
    if (s.isStopped) {
      g(e, { type: "run:stopped", nodeId: t.currentNodeId ?? void 0 }, u);
      break;
    }
    if (n.has(r))
      break;
    if (n.add(r), s.isPaused && s.pausePromise && (await s.pausePromise, s.isStopped)) {
      g(e, { type: "run:stopped", nodeId: t.currentNodeId ?? void 0 }, u);
      break;
    }
    const a = e.getNode(r);
    if (!a)
      break;
    t.currentNodeId = r;
    const p = (e.edges ?? []).filter((f) => f.target === r);
    for (const f of p)
      A(e, f.id);
    if (a.type === "flow-wait") {
      e.setNodeState(r, "running");
      const f = a.data?.durationMs ?? o.defaultDurationMs ?? 1e3;
      g(e, { type: "wait:start", nodeId: r }, u);
      const I = Date.now();
      await N(f), g(e, { type: "wait:end", nodeId: r, runtimeMs: Date.now() - I }, u), e.setNodeState(r, "completed");
      for (const E of p)
        b(e, E.id);
      const y = await R(e, a, r, i, o, t, u);
      if (y.length === 0)
        break;
      if (y.length === 1)
        r = y[0];
      else {
        g(e, { type: "parallel:fork", nodeId: r, payload: { branches: y } }, u), await Promise.all(y.map(
          (E) => m(e, E, { ...t, payload: { ...t.payload } }, i, o, s, n, u)
        ));
        break;
      }
      continue;
    }
    e.setNodeState(r, "running");
    const l = Date.now();
    g(e, { type: "node:enter", nodeId: r }, u);
    try {
      const f = await i.onEnter?.(a, t);
      f && typeof f == "object" && (t.nodeResults[r] = f, Object.assign(t.payload, f));
    } catch (f) {
      e.setNodeState(r, "failed");
      for (const I of p)
        O(e, I.id);
      throw g(e, { type: "run:error", nodeId: r, payload: { error: f.message } }, u), i.onError?.(f, a, t), f;
    }
    o.defaultDurationMs && await N(o.defaultDurationMs), e.setNodeState(r, "completed");
    for (const f of p)
      b(e, f.id);
    const w = await i.onExit?.(a, t);
    w && typeof w == "object" && (t.nodeResults[`${r}:exit`] = w, Object.assign(t.payload, w)), g(e, { type: "node:exit", nodeId: r, runtimeMs: Date.now() - l, outputs: t.nodeResults[r] }, u);
    const c = await R(e, a, r, i, o, t, u);
    if (c.length === 0)
      break;
    if (c.length === 1)
      r = c[0];
    else {
      g(e, { type: "parallel:fork", nodeId: r, payload: { branches: c } }, u), await Promise.all(c.map(
        (f) => m(e, f, { ...t, payload: { ...t.payload } }, i, o, s, n, u)
      ));
      break;
    }
  }
}
async function R(e, d, t, i, o, s, n) {
  const u = (e.edges ?? []).filter((r) => r.source === t);
  if (u.length === 0)
    return [];
  if (i.pickBranch) {
    const r = await i.pickBranch(d, u, s);
    if (r) {
      const a = u.find((p) => p.id === r) ?? null;
      if (a) {
        if (k(e, a.id), g(e, { type: "edge:taken", edgeId: a.id }, n), o.muteUntakenBranches)
          for (const p of u)
            p.id !== a.id && (P(e, p.id), g(e, { type: "edge:untaken", edgeId: p.id }, n));
        return o.particleOnEdges && e.sendParticle?.(a.id, o.particleOptions ?? {}), [a.target];
      }
      return [];
    }
  }
  if (d.type === "flow-condition") {
    const r = C(d, u, s.payload), a = r ? u.find((p) => p.target === r) : null;
    if (a) {
      if (g(e, { type: "branch:chosen", nodeId: t, edgeId: a.id }, n), k(e, a.id), g(e, { type: "edge:taken", edgeId: a.id }, n), o.muteUntakenBranches)
        for (const p of u)
          p.id !== a.id && (P(e, p.id), g(e, { type: "edge:untaken", edgeId: p.id }, n));
      return o.particleOnEdges && e.sendParticle?.(a.id, o.particleOptions ?? {}), [a.target];
    }
    return [];
  }
  if (u.length === 1) {
    const r = u[0];
    return k(e, r.id), g(e, { type: "edge:taken", edgeId: r.id }, n), o.particleOnEdges && e.sendParticle?.(r.id, o.particleOptions ?? {}), [r.target];
  }
  for (const r of u)
    k(e, r.id), g(e, { type: "edge:taken", edgeId: r.id }, n), o.particleOnEdges && e.sendParticle?.(r.id, o.particleOptions ?? {});
  return u.map((r) => r.target);
}
function C(e, d, t) {
  let i;
  if (typeof e.data?.evaluate == "function")
    i = !!e.data.evaluate(t);
  else if (e.data?.condition)
    i = $(e.data.condition, t);
  else
    return d[0]?.target ?? null;
  const o = i ? "true" : "false";
  return d.find((n) => n.sourceHandle === o)?.target ?? null;
}
function N(e) {
  return new Promise((d) => setTimeout(d, e));
}
function _(e) {
  return async function(t, i = {}) {
    const o = i.speed ?? 1;
    let s = !1, n = !1, u = null;
    const r = {
      get isPaused() {
        return s;
      },
      get isStopped() {
        return n;
      },
      pause() {
        !s && !n && (s = !0);
      },
      resume() {
        s && (s = !1, u?.(), u = null);
      },
      stop() {
        n = !0, s = !1, u?.(), u = null;
      },
      finished: null
    }, a = (async () => {
      if (await Promise.resolve(), typeof e.resetStates == "function" && e.resetStates(), Array.isArray(e.edges))
        for (const l of e.edges) l.class = void 0;
      let p = t[0]?.t ?? Date.now();
      for (const l of t) {
        if (n || s && (await new Promise((c) => {
          u = c;
        }), n))
          break;
        const w = (l.t - p) / o;
        switch (w > 10 && await j(w), p = l.t, l.type) {
          case "node:enter":
            if (l.nodeId) {
              e.setNodeState(l.nodeId, "running");
              const c = (e.edges ?? []).filter((f) => f.target === l.nodeId);
              for (const f of c)
                A(e, f.id);
            }
            break;
          case "node:exit":
            if (l.nodeId) {
              e.setNodeState(l.nodeId, "completed");
              const c = (e.edges ?? []).filter((f) => f.target === l.nodeId);
              for (const f of c)
                b(e, f.id);
            }
            break;
          case "run:error":
            if (l.nodeId) {
              e.setNodeState(l.nodeId, "failed");
              const c = (e.edges ?? []).filter((f) => f.target === l.nodeId);
              for (const f of c)
                O(e, f.id);
            }
            break;
          case "edge:taken":
            l.edgeId && k(e, l.edgeId);
            break;
          case "edge:untaken":
            l.edgeId && P(e, l.edgeId);
            break;
          case "wait:start":
            l.nodeId && e.setNodeState(l.nodeId, "running");
            break;
          case "wait:end":
            l.nodeId && e.setNodeState(l.nodeId, "completed");
            break;
        }
      }
    })();
    return r.finished = a, r;
  };
}
function j(e) {
  return new Promise((d) => setTimeout(d, e));
}
function x(e) {
  M("workflow", {
    setup(d) {
      d.run = q(d), d.replay = _(d), d.executionLog = [], d.resetExecutionLog = function() {
        this.executionLog = [];
      };
    }
  }), e.magic("workflowRun", (d) => async (t, i, o) => {
    const s = d.closest(".flow-container") ?? d.querySelector(".flow-container") ?? document.querySelector(".flow-container");
    if (!s)
      return console.warn("[workflow] $workflowRun: no .flow-container found"), null;
    const n = e.$data(s);
    return typeof n?.run != "function" ? (console.warn("[workflow] $workflowRun: canvas.run not available — is the workflow addon registered?"), null) : n.run(t, i, o);
  });
}
export {
  x as default
};
//# sourceMappingURL=alpineflow-workflow.esm.js.map
