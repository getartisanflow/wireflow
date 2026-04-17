const E = "__alpineflow_registry__";
function R() {
  return typeof globalThis < "u" ? (globalThis[E] || (globalThis[E] = /* @__PURE__ */ new Map()), globalThis[E]) : /* @__PURE__ */ new Map();
}
function S(e, t) {
  R().set(e, t);
}
function D(e, t) {
  return t.split(".").reduce((n, l) => n?.[l], e);
}
function M(e, t) {
  const n = D(t, e.field);
  switch (e.op) {
    case "equals":
      return n === e.value;
    case "notEquals":
      return n !== e.value;
    case "in":
      return Array.isArray(e.value) && e.value.includes(n);
    case "notIn":
      return Array.isArray(e.value) && !e.value.includes(n);
    case "greaterThan":
      return n > e.value;
    case "lessThan":
      return n < e.value;
    case "greaterThanOrEqual":
      return n >= e.value;
    case "lessThanOrEqual":
      return n <= e.value;
    case "exists":
      return n != null;
    case "matches":
      return new RegExp(e.value).test(String(n ?? ""));
    default:
      return !1;
  }
}
function y(e, t, n) {
  const l = e.getEdge?.(t) ?? e.edges?.find((r) => r.id === t);
  if (!l)
    return;
  const o = l.class ?? "";
  o.split(" ").includes(n) || (l.class = o ? `${o} ${n}` : n);
}
function A(e, t, n) {
  const l = e.getEdge?.(t) ?? e.edges?.find((r) => r.id === t);
  if (!l)
    return;
  const o = (l.class ?? "").split(" ").filter((r) => r !== n).join(" ");
  l.class = o || void 0;
}
function P(e, t) {
  y(e, t, "flow-edge-entering");
}
function m(e, t) {
  A(e, t, "flow-edge-entering"), y(e, t, "flow-edge-completed");
}
function _(e, t) {
  y(e, t, "flow-edge-taken");
}
function C(e, t) {
  y(e, t, "flow-edge-untaken");
}
function c(e, t, n) {
  const l = e.executionLog, o = { t: Date.now(), ...t };
  for (l.push(o); l.length > n; )
    l.shift();
}
function j(e) {
  return async function(n, l = {}, o = {}) {
    const r = {
      payload: { ...o.payload ?? {} },
      nodeResults: {},
      currentNodeId: null,
      startedAt: Date.now()
    };
    let g = !1, a = !1, i = null;
    const f = {
      get isPaused() {
        return g;
      },
      get isStopped() {
        return a;
      },
      pause() {
        !g && !a && (g = !0);
      },
      resume() {
        g && (g = !1, i?.(), i = null);
      },
      stop() {
        a = !0, g = !1, i?.(), i = null;
      },
      finished: null
    }, s = o.logLimit ?? 500, x = (async () => {
      await Promise.resolve(), o.lock && e.toggleInteractive?.(), c(e, { type: "run:started", payload: r.payload }, s);
      let u = n;
      try {
        for (; u; ) {
          if (a) {
            c(e, { type: "run:stopped", nodeId: r.currentNodeId ?? void 0 }, s);
            break;
          }
          if (g && (await new Promise((d) => {
            i = d;
          }), a)) {
            c(e, { type: "run:stopped", nodeId: r.currentNodeId ?? void 0 }, s);
            break;
          }
          const p = e.getNode(u);
          if (!p)
            break;
          r.currentNodeId = u;
          const h = (e.edges ?? []).filter((d) => d.target === u);
          for (const d of h)
            P(e, d.id);
          if (p.type === "flow-wait") {
            e.setNodeState(u, "running");
            const d = p.data?.durationMs ?? o.defaultDurationMs ?? 1e3;
            c(e, { type: "wait:start", nodeId: u }, s);
            const N = Date.now();
            await k(d), c(e, { type: "wait:end", nodeId: u, runtimeMs: Date.now() - N }, s), e.setNodeState(u, "completed");
            for (const T of h)
              m(e, T.id);
            u = await I(e, p, u, l, o, r, s);
            continue;
          }
          e.setNodeState(u, "running");
          const b = Date.now();
          c(e, { type: "node:enter", nodeId: u }, s);
          try {
            const d = await l.onEnter?.(p, r);
            d && typeof d == "object" && (r.nodeResults[u] = d, Object.assign(r.payload, d));
          } catch (d) {
            throw e.setNodeState(u, "failed"), c(e, { type: "run:error", nodeId: u, payload: { error: d.message } }, s), l.onError?.(d, p, r), d;
          }
          o.defaultDurationMs && await k(o.defaultDurationMs), e.setNodeState(u, "completed");
          for (const d of h)
            m(e, d.id);
          const w = await l.onExit?.(p, r);
          w && typeof w == "object" && (r.nodeResults[`${u}:exit`] = w, Object.assign(r.payload, w)), c(e, { type: "node:exit", nodeId: u, runtimeMs: Date.now() - b, outputs: r.nodeResults[u] }, s), u = await I(e, p, u, l, o, r, s);
        }
        r.currentNodeId = null, a || (c(e, { type: "run:complete", payload: r.payload }, s), l.onComplete?.(r));
      } finally {
        o.lock && e.toggleInteractive?.();
      }
      return r;
    })();
    return f.finished = x, f;
  };
}
async function I(e, t, n, l, o, r, g) {
  const a = (e.edges ?? []).filter((f) => f.source === n);
  if (a.length === 0)
    return null;
  let i = null;
  if (l.pickBranch) {
    const f = await l.pickBranch(t, a, r);
    i = f ? a.find((s) => s.id === f) : null;
  } else if (t.type === "flow-condition") {
    const f = B(t, a, r.payload);
    i = f ? a.find((s) => s.target === f) : null, i && c(e, { type: "branch:chosen", nodeId: n, edgeId: i.id }, g);
  } else
    i = a[0] ?? null;
  if (i && (_(e, i.id), c(e, { type: "edge:taken", edgeId: i.id }, g), o.muteUntakenBranches))
    for (const f of a)
      f.id !== i.id && (C(e, f.id), c(e, { type: "edge:untaken", edgeId: f.id }, g));
  return o.particleOnEdges && i && e.sendParticle?.(i.id, {}), i?.target ?? null;
}
function B(e, t, n) {
  let l;
  if (typeof e.data?.evaluate == "function")
    l = !!e.data.evaluate(n);
  else if (e.data?.condition)
    l = M(e.data.condition, n);
  else
    return t[0]?.target ?? null;
  const o = l ? "true" : "false";
  return t.find((g) => g.sourceHandle === o)?.target ?? null;
}
function k(e) {
  return new Promise((t) => setTimeout(t, e));
}
function L(e) {
  S("workflow", {
    setup(t) {
      t.run = j(t), t.executionLog = [], t.resetExecutionLog = function() {
        this.executionLog = [];
      };
    }
  });
}
export {
  L as default
};
//# sourceMappingURL=alpineflow-workflow.esm.js.map
