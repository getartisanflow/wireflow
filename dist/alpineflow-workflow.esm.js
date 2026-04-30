const S = "__alpineflow_registry__";
function H() {
  return typeof globalThis < "u" ? (globalThis[S] || (globalThis[S] = /* @__PURE__ */ new Map()), globalThis[S]) : /* @__PURE__ */ new Map();
}
function M(e, o) {
  H().set(e, o);
}
function N(e, o) {
  return o.split(".").reduce((n, t) => n?.[t], e);
}
function C(e, o) {
  const n = N(o, e.field);
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
function m(e, o, n) {
  const t = e.getEdge?.(o) ?? e.edges?.find((d) => d.id === o);
  if (!t)
    return;
  const s = t.class ?? "";
  s.split(" ").includes(n) || (t.class = s ? `${s} ${n}` : n);
}
function R(e, o, n) {
  const t = e.getEdge?.(o) ?? e.edges?.find((d) => d.id === o);
  if (!t)
    return;
  const s = (t.class ?? "").split(" ").filter((d) => d !== n).join(" ");
  t.class = s || void 0;
}
function x(e, o) {
  m(e, o, "flow-edge-entering");
}
function k(e, o) {
  R(e, o, "flow-edge-entering"), m(e, o, "flow-edge-completed");
}
function _(e, o) {
  m(e, o, "flow-edge-taken");
}
function I(e, o) {
  m(e, o, "flow-edge-untaken");
}
function $(e, o) {
  R(e, o, "flow-edge-entering"), m(e, o, "flow-edge-failed");
}
function p(e, o, n) {
  const t = e.executionLog, s = { t: Date.now(), ...o };
  for (t.push(s); t.length > n; )
    t.shift();
}
function A(e) {
  return async function(n, t = {}, s = {}) {
    const d = {
      payload: { ...s.payload ?? {} },
      nodeResults: {},
      currentNodeId: null,
      startedAt: Date.now()
    }, a = {
      isPaused: !1,
      isStopped: !1,
      pausePromise: null,
      pauseResolve: null
    }, u = {
      get isPaused() {
        return a.isPaused;
      },
      get isStopped() {
        return a.isStopped;
      },
      pause() {
        !a.isPaused && !a.isStopped && (a.isPaused = !0, a.pausePromise = new Promise((l) => {
          a.pauseResolve = l;
        }));
      },
      resume() {
        a.isPaused && (a.isPaused = !1, a.pauseResolve?.(), a.pausePromise = null, a.pauseResolve = null);
      },
      stop() {
        a.isStopped = !0, a.isPaused = !1, a.pauseResolve?.(), a.pausePromise = null, a.pauseResolve = null;
      },
      finished: null
    }, i = s.logLimit ?? 500, c = /* @__PURE__ */ new Set(), r = (async () => {
      if (await Promise.resolve(), typeof e.resetStates == "function" && e.resetStates(), Array.isArray(e.edges))
        for (const l of e.edges) l.class = void 0;
      typeof e.resetExecutionLog == "function" && e.resetExecutionLog(), s.lock && e.toggleInteractive?.(), p(e, { type: "run:started", payload: d.payload }, i);
      try {
        if (await E(e, n, d, t, s, a, c, i), d.currentNodeId = null, !a.isStopped) {
          if (Array.isArray(e.nodes))
            for (const l of e.nodes)
              !c.has(l.id) && !l.runState && e.setNodeState(l.id, "skipped");
          p(e, { type: "run:complete", payload: d.payload }, i), t.onComplete?.(d);
        }
      } catch (l) {
        throw a.isStopped = !0, a.pauseResolve?.(), l;
      } finally {
        s.lock && e.toggleInteractive?.(), e._currentRunHandle === u && (e._currentRunHandle = null);
      }
      return d;
    })();
    return u.finished = r, e._currentRunHandle = u, u;
  };
}
async function E(e, o, n, t, s, d, a, u) {
  let i = o;
  for (; i; ) {
    if (d.isStopped) {
      p(e, { type: "run:stopped", nodeId: n.currentNodeId ?? void 0 }, u);
      break;
    }
    if (a.has(i))
      break;
    if (a.add(i), d.isPaused && d.pausePromise && (await d.pausePromise, d.isStopped)) {
      p(e, { type: "run:stopped", nodeId: n.currentNodeId ?? void 0 }, u);
      break;
    }
    const c = e.getNode(i);
    if (!c)
      break;
    n.currentNodeId = i;
    const r = (e.edges ?? []).filter((f) => f.target === i);
    for (const f of r)
      x(e, f.id);
    if (c.type === "flow-wait") {
      e.setNodeState(i, "running");
      const f = c.data?.durationMs ?? s.defaultDurationMs ?? 1e3;
      p(e, { type: "wait:start", nodeId: i }, u);
      const y = Date.now();
      await T(f), p(e, { type: "wait:end", nodeId: i, runtimeMs: Date.now() - y }, u), e.setNodeState(i, "completed");
      for (const b of r)
        k(e, b.id);
      const w = await P(e, c, i, t, s, n, u);
      if (w.length === 0)
        break;
      if (w.length === 1)
        i = w[0];
      else {
        p(e, { type: "parallel:fork", nodeId: i, payload: { branches: w } }, u), await Promise.all(w.map(
          (b) => E(e, b, { ...n, payload: { ...n.payload } }, t, s, d, a, u)
        ));
        break;
      }
      continue;
    }
    e.setNodeState(i, "running");
    const l = Date.now();
    p(e, { type: "node:enter", nodeId: i }, u);
    try {
      const f = await t.onEnter?.(c, n);
      f && typeof f == "object" && (n.nodeResults[i] = f, Object.assign(n.payload, f));
    } catch (f) {
      e.setNodeState(i, "failed");
      for (const y of r)
        $(e, y.id);
      throw p(e, { type: "run:error", nodeId: i, payload: { error: f.message } }, u), t.onError?.(f, c, n), f;
    }
    s.defaultDurationMs && await T(s.defaultDurationMs), e.setNodeState(i, "completed");
    for (const f of r)
      k(e, f.id);
    const g = await t.onExit?.(c, n);
    g && typeof g == "object" && (n.nodeResults[`${i}:exit`] = g, Object.assign(n.payload, g)), p(e, { type: "node:exit", nodeId: i, runtimeMs: Date.now() - l, outputs: n.nodeResults[i] }, u);
    const h = await P(e, c, i, t, s, n, u);
    if (h.length === 0)
      break;
    if (h.length === 1)
      i = h[0];
    else {
      p(e, { type: "parallel:fork", nodeId: i, payload: { branches: h } }, u), await Promise.all(h.map(
        (f) => E(e, f, { ...n, payload: { ...n.payload } }, t, s, d, a, u)
      ));
      break;
    }
  }
}
async function P(e, o, n, t, s, d, a) {
  const u = (e.edges ?? []).filter((i) => i.source === n);
  if (u.length === 0)
    return [];
  if (t.pickBranch) {
    const i = await t.pickBranch(o, u, d);
    if (i) {
      const c = u.find((r) => r.id === i) ?? null;
      if (c) {
        if (o.type === "flow-condition" && typeof c.sourceHandle == "string" && (o.data = o.data ?? {}, o.data._branchTaken = c.sourceHandle), _(e, c.id), p(e, { type: "edge:taken", edgeId: c.id }, a), s.muteUntakenBranches)
          for (const r of u)
            r.id !== c.id && (I(e, r.id), p(e, { type: "edge:untaken", edgeId: r.id }, a));
        return s.particleOnEdges && e.sendParticle?.(c.id, s.particleOptions ?? {}), [c.target];
      }
      return [];
    }
  }
  if (o.type === "flow-condition") {
    const i = v(o, u, d.payload), c = i ? u.find((r) => r.target === i) : null;
    if (c) {
      if (typeof c.sourceHandle == "string" && (o.data = o.data ?? {}, o.data._branchTaken = c.sourceHandle), p(e, { type: "branch:chosen", nodeId: n, edgeId: c.id }, a), _(e, c.id), p(e, { type: "edge:taken", edgeId: c.id }, a), s.muteUntakenBranches)
        for (const r of u)
          r.id !== c.id && (I(e, r.id), p(e, { type: "edge:untaken", edgeId: r.id }, a));
      return s.particleOnEdges && e.sendParticle?.(c.id, s.particleOptions ?? {}), [c.target];
    }
    return [];
  }
  if (u.length === 1) {
    const i = u[0];
    return _(e, i.id), p(e, { type: "edge:taken", edgeId: i.id }, a), s.particleOnEdges && e.sendParticle?.(i.id, s.particleOptions ?? {}), [i.target];
  }
  for (const i of u)
    _(e, i.id), p(e, { type: "edge:taken", edgeId: i.id }, a), s.particleOnEdges && e.sendParticle?.(i.id, s.particleOptions ?? {});
  return u.map((i) => i.target);
}
function v(e, o, n) {
  let t;
  if (typeof e.data?.evaluate == "function")
    t = !!e.data.evaluate(n);
  else if (e.data?.condition)
    t = C(e.data.condition, n);
  else
    return o[0]?.target ?? null;
  const s = t ? "true" : "false";
  return o.find((a) => a.sourceHandle === s)?.target ?? null;
}
function T(e) {
  return new Promise((o) => setTimeout(o, e));
}
function B(e) {
  return async function(n, t = {}) {
    const s = t.speed ?? 1;
    let d = !1, a = !1, u = null;
    const i = {
      get isPaused() {
        return d;
      },
      get isStopped() {
        return a;
      },
      pause() {
        !d && !a && (d = !0);
      },
      resume() {
        d && (d = !1, u?.(), u = null);
      },
      stop() {
        a = !0, d = !1, u?.(), u = null;
      },
      finished: null
    }, c = (async () => {
      if (await Promise.resolve(), typeof e.resetStates == "function" && e.resetStates(), Array.isArray(e.edges))
        for (const l of e.edges) l.class = void 0;
      let r = n[0]?.t ?? Date.now();
      for (const l of n) {
        if (a || d && (await new Promise((h) => {
          u = h;
        }), a))
          break;
        const g = (l.t - r) / s;
        switch (g > 10 && await O(g), r = l.t, l.type) {
          case "node:enter":
            if (l.nodeId) {
              e.setNodeState(l.nodeId, "running");
              const h = (e.edges ?? []).filter((f) => f.target === l.nodeId);
              for (const f of h)
                x(e, f.id);
            }
            break;
          case "node:exit":
            if (l.nodeId) {
              e.setNodeState(l.nodeId, "completed");
              const h = (e.edges ?? []).filter((f) => f.target === l.nodeId);
              for (const f of h)
                k(e, f.id);
            }
            break;
          case "run:error":
            if (l.nodeId) {
              e.setNodeState(l.nodeId, "failed");
              const h = (e.edges ?? []).filter((f) => f.target === l.nodeId);
              for (const f of h)
                $(e, f.id);
            }
            break;
          case "edge:taken":
            if (l.edgeId) {
              _(e, l.edgeId);
              const h = (e.edges ?? []).find((f) => f.id === l.edgeId);
              if (h && typeof h.sourceHandle == "string") {
                const f = (e.nodes ?? []).find((y) => y.id === h.source) ?? e.getNode?.(h.source);
                f && f.type === "flow-condition" && (f.data = f.data ?? {}, f.data._branchTaken = h.sourceHandle);
              }
            }
            break;
          case "edge:untaken":
            l.edgeId && I(e, l.edgeId);
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
    return i.finished = c, i;
  };
}
function O(e) {
  return new Promise((o) => setTimeout(o, e));
}
function D(e, o) {
  for (const i of o)
    if (i && typeof i.source == "string" && i.source === i.target)
      return !0;
  const n = /* @__PURE__ */ new Map(), t = (i) => {
    let c = n.get(i);
    return c || (c = [], n.set(i, c)), c;
  };
  for (const i of e)
    i && typeof i.id == "string" && t(i.id);
  for (const i of o)
    !i || typeof i.source != "string" || typeof i.target != "string" || (t(i.source).push(i.target), t(i.target));
  const s = 0, d = 1, a = 2, u = /* @__PURE__ */ new Map();
  for (const i of n.keys()) u.set(i, s);
  for (const i of n.keys()) {
    if (u.get(i) !== s) continue;
    const c = [{ node: i, idx: 0 }];
    for (u.set(i, d); c.length > 0; ) {
      const r = c[c.length - 1], l = n.get(r.node) ?? [];
      if (r.idx < l.length) {
        const g = l[r.idx++], h = u.get(g);
        if (h === d) return !0;
        h === s && (u.set(g, d), c.push({ node: g, idx: 0 }));
      } else
        u.set(r.node, a), c.pop();
    }
  }
  return !1;
}
function q(e) {
  const o = [], n = Array.isArray(e?.nodes) ? e.nodes : [], t = Array.isArray(e?.edges) ? e.edges : [], s = /* @__PURE__ */ new Set(), d = /* @__PURE__ */ new Set();
  for (const r of n)
    !r || typeof r.id != "string" || (s.has(r.id) && d.add(r.id), s.add(r.id));
  for (const r of d)
    o.push({
      severity: "error",
      code: "duplicate-node-id",
      nodeId: r,
      message: `Duplicate node id "${r}".`
    });
  for (const r of n) {
    if (!r || typeof r.id != "string") continue;
    const l = r.data ?? {};
    if (r.type === "flow-condition") {
      const g = l.condition !== void 0 && l.condition !== null, h = typeof l.evaluate == "function";
      !g && !h && o.push({
        severity: "error",
        code: "missing-condition",
        nodeId: r.id,
        message: `Condition node "${r.id}" has neither a "condition" object nor an "evaluate" function.`
      });
    }
    if (r.type === "flow-wait") {
      const g = l.durationMs;
      (typeof g != "number" || !Number.isFinite(g)) && o.push({
        severity: "error",
        code: "wait-missing-duration",
        nodeId: r.id,
        message: `Wait node "${r.id}" is missing numeric data.durationMs.`
      });
    }
  }
  for (const r of t) {
    if (!r) continue;
    const l = typeof r.id == "string" ? r.id : void 0;
    (typeof r.source != "string" || !s.has(r.source)) && o.push({
      severity: "error",
      code: "dangling-edge",
      edgeId: l,
      nodeId: typeof r.source == "string" ? r.source : void 0,
      message: `Edge ${l ? `"${l}" ` : ""}references missing source node "${r.source}".`
    }), (typeof r.target != "string" || !s.has(r.target)) && o.push({
      severity: "error",
      code: "dangling-edge",
      edgeId: l,
      nodeId: typeof r.target == "string" ? r.target : void 0,
      message: `Edge ${l ? `"${l}" ` : ""}references missing target node "${r.target}".`
    });
  }
  const a = n.filter((r) => r && r.type === "flow-condition" && typeof r.id == "string");
  for (const r of a) {
    const l = t.filter((h) => h && h.source === r.id), g = /* @__PURE__ */ new Set();
    for (const h of l)
      typeof h.sourceHandle == "string" && (g.add(h.sourceHandle), h.sourceHandle !== "true" && h.sourceHandle !== "false" && o.push({
        severity: "error",
        code: "unhandled-source-handle",
        edgeId: typeof h.id == "string" ? h.id : void 0,
        nodeId: r.id,
        message: `Condition node "${r.id}" has an outgoing edge with sourceHandle "${h.sourceHandle}" — only "true" / "false" are recognised.`
      }));
    g.has("true") || o.push({
      severity: "error",
      code: "condition-missing-branch",
      nodeId: r.id,
      message: `Condition node "${r.id}" is missing the "true" branch.`
    }), g.has("false") || o.push({
      severity: "error",
      code: "condition-missing-branch",
      nodeId: r.id,
      message: `Condition node "${r.id}" is missing the "false" branch.`
    });
  }
  const u = /* @__PURE__ */ new Set(), i = /* @__PURE__ */ new Set();
  for (const r of t)
    r && (typeof r.target == "string" && u.add(r.target), typeof r.source == "string" && i.add(r.source));
  for (const r of n)
    !r || typeof r.id != "string" || !u.has(r.id) && !i.has(r.id) && o.push({
      severity: "warning",
      code: "unreachable-node",
      nodeId: r.id,
      message: `Node "${r.id}" has no connected edges.`
    });
  return D(n, t) && o.push({
    severity: "warning",
    code: "cycle",
    message: "Directed cycle detected in workflow graph."
  }), { valid: !o.some((r) => r.severity === "error"), issues: o };
}
function F(e) {
  M("workflow", {
    setup(n) {
      n.run = A(n), n.replayExecution = B(n), n.executionLog = [], n.resetExecutionLog = function() {
        this.executionLog = [];
      }, n.validateWorkflow = function() {
        return q(this);
      }, n._currentRunHandle = null, Object.defineProperty(n, "runState", {
        get() {
          const s = this._currentRunHandle;
          return s ? s.isStopped ? "stopped" : s.isPaused ? "paused" : "running" : "idle";
        },
        configurable: !0
      }), n.stopRun = function() {
        this._currentRunHandle?.stop?.();
      };
      const t = typeof n.resetStates == "function" ? n.resetStates.bind(n) : null;
      n.resetStates = function(...s) {
        if (t && t(...s), Array.isArray(this.nodes))
          for (const d of this.nodes)
            d && d.type === "flow-condition" && d.data && delete d.data._branchTaken;
      };
    }
  }), e.magic("workflowRun", (n) => async (t, s, d) => {
    const a = n.closest(".flow-container") ?? n.querySelector(".flow-container") ?? document.querySelector(".flow-container");
    if (!a)
      return console.warn("[workflow] $workflowRun: no .flow-container found"), null;
    const u = e.$data(a);
    return typeof u?.run != "function" ? (console.warn("[workflow] $workflowRun: canvas.run not available — is the workflow addon registered?"), null) : u.run(t, s, d);
  });
  const o = (n, t) => {
    const s = t ? document.querySelector(t) : n.closest(".flow-container") ?? document.querySelector(".flow-container");
    return {
      canvas: s ? e.$data(s) : null,
      el: s
    };
  };
  e.data("flowReplayControls", (n) => ({
    _handle: null,
    _canvas: null,
    _pollHandle: 0,
    _runStart: 0,
    _scrubbing: !1,
    isPlaying: !1,
    speed: 1,
    canScrub: !1,
    hasNativeTime: !1,
    currentTimeMs: 0,
    durationMs: 0,
    get hasPlayableSource() {
      return this._handle ? !0 : Array.isArray(this._canvas?.executionLog) && this._canvas.executionLog.length > 0;
    },
    get progressPercent() {
      return this.durationMs <= 0 ? 0 : Math.min(100, this.currentTimeMs / this.durationMs * 100);
    },
    init() {
      const { canvas: t } = o(this.$el, n.target);
      this._canvas = t, n.handleExpr && this._canvas && (this._handle = this._canvas[n.handleExpr] ?? null), !this._handle && this._canvas?.lastReplayHandle && (this._handle = this._canvas.lastReplayHandle), this._detectCapabilities();
    },
    _detectCapabilities() {
      if (!this._handle) {
        this.canScrub = !1, this.hasNativeTime = !1;
        return;
      }
      this.canScrub = typeof this._handle.scrubTo == "function", this.hasNativeTime = typeof this._handle.currentTime < "u" && typeof this._handle.duration < "u";
    },
    _ensureHandle() {
      if (this._handle) return !0;
      const t = this._canvas?.executionLog;
      return Array.isArray(t) && t.length > 0 && typeof this._canvas.replayExecution == "function" ? (this._handle = this._canvas.replayExecution(t, { speed: this.speed }), this._detectCapabilities(), Array.isArray(t) && t.length > 0 && (this.durationMs = (t[t.length - 1]?.t ?? 0) - (t[0]?.t ?? 0)), !0) : !1;
    },
    formatTime(t) {
      if ((!Number.isFinite(t) || t < 0) && (t = 0), t < 1e3) return `0:${String(Math.floor(t / 100)).padStart(2, "0")}`;
      const s = Math.floor(t / 1e3), d = Math.floor(s / 60), a = s % 60;
      return `${d}:${String(a).padStart(2, "0")}`;
    },
    _startPolling() {
      this._pollHandle || (this._runStart = performance.now(), this._pollHandle = setInterval(() => {
        this._handle && (this.hasNativeTime ? (this.currentTimeMs = this._handle.currentTime, this.durationMs = this._handle.duration) : (this.currentTimeMs = (performance.now() - this._runStart) * this.speed, this.durationMs > 0 && this.currentTimeMs >= this.durationMs && (this.isPlaying = !1, this._stopPolling())));
      }, 100));
    },
    _stopPolling() {
      this._pollHandle && (clearInterval(this._pollHandle), this._pollHandle = 0);
    },
    onPlayPause() {
      this._ensureHandle() && (this.isPlaying ? (this._handle.pause?.(), this.isPlaying = !1, this._stopPolling()) : ((this._handle.play ?? this._handle.resume)?.call(this._handle), this.isPlaying = !0, this._startPolling()));
    },
    onRestart() {
      this._ensureHandle() && (this._handle.stop?.(), this._handle = null, this._stopPolling(), this.currentTimeMs = 0, this._ensureHandle() && ((this._handle.play ?? this._handle.resume)?.call(this._handle), this.isPlaying = !0, this._startPolling()));
    },
    onSpeedChange() {
      this._handle && typeof this._handle.speed < "u" && (this._handle.speed = this.speed);
    },
    onScrubStart(t) {
      this.canScrub && (this._scrubbing = !0, this._applyScrub(t));
    },
    onScrubMove(t) {
      this._scrubbing && this._applyScrub(t);
    },
    onScrubEnd(t) {
      this._scrubbing && (this._scrubbing = !1, this._applyScrub(t));
    },
    _applyScrub(t) {
      const s = this.$el.querySelector(".flow-replay-scrubber");
      if (!s || !this._handle?.scrubTo) return;
      const d = s.getBoundingClientRect(), a = Math.max(0, Math.min(1, (t.clientX - d.left) / d.width));
      this._handle.scrubTo(a * this.durationMs), this.currentTimeMs = a * this.durationMs;
    }
  })), e.data("flowExecutionLog", (n) => ({
    _canvas: null,
    _source: [],
    _autoScroll: !0,
    filter: n.initialFilter || "all",
    baseTime: 0,
    init() {
      const t = this, { canvas: s } = o(t.$el, n.target);
      this._canvas = s, n.sourceExpr && this._canvas ? this._source = this._canvas[n.sourceExpr] ?? [] : this._source = this._canvas?.executionLog ?? [], t.$watch("filteredEvents", () => {
        this._autoScroll && t.$nextTick(() => this._scrollToBottom());
      });
    },
    get filteredEvents() {
      const t = this._source ?? [];
      if (t.length === 0) return [];
      this.baseTime = t[0]?.t ?? 0;
      let s = t;
      if (this.filter === "errors")
        s = t.filter((d) => d.type === "run:error" || d.type === "edge:failed");
      else if (this.filter === "lifecycle") {
        const d = /* @__PURE__ */ new Set(["run:started", "run:complete", "run:stopped", "node:enter", "node:exit"]);
        s = t.filter((a) => d.has(a.type));
      }
      return s.slice(-n.maxEvents);
    },
    formatTime(t) {
      if ((!Number.isFinite(t) || t < 0) && (t = 0), t < 1e3) return `+${Math.round(t)}ms`;
      if (t < 6e4) return `+${(t / 1e3).toFixed(1)}s`;
      const s = Math.floor(t / 6e4), d = Math.floor(t % 6e4 / 1e3);
      return `+${s}m${d ? ` ${d}s` : ""}`;
    },
    iconFor(t) {
      return {
        "run:started": "▶",
        "run:complete": "✓",
        "run:stopped": "◼",
        "run:error": "!",
        "node:enter": "→",
        "node:exit": "←",
        "edge:taken": "─",
        "edge:failed": "×",
        "edge:untaken": "·",
        "parallel:fork": "⊥",
        "wait:start": "⏱",
        "wait:end": "⏱",
        "branch:chosen": "?"
      }[t] ?? "·";
    },
    iconClassFor(t) {
      return {
        "run:started": "flow-execution-log-icon--start",
        "run:complete": "flow-execution-log-icon--complete",
        "run:stopped": "flow-execution-log-icon--start",
        "run:error": "flow-execution-log-icon--error",
        "edge:failed": "flow-execution-log-icon--error",
        "node:enter": "flow-execution-log-icon--enter",
        "node:exit": "flow-execution-log-icon--exit",
        "edge:taken": "flow-execution-log-icon--edge-taken",
        "parallel:fork": "flow-execution-log-icon--fork"
      }[t] ?? "";
    },
    onRowClick(t) {
      t?.nodeId && this.$el.dispatchEvent(new CustomEvent("flow:highlight-node", {
        detail: { nodeId: t.nodeId },
        bubbles: !0
      }));
    },
    onUserScroll() {
      const t = this.$refs?.body;
      if (!t) return;
      const s = t.scrollTop + t.clientHeight >= t.scrollHeight - 5;
      this._autoScroll = s;
    },
    _scrollToBottom() {
      const t = this.$refs?.body;
      t && (t.scrollTop = t.scrollHeight);
    }
  })), e.data("flowRunButton", (n) => ({
    _canvas: null,
    _canvasEl: null,
    init() {
      const { canvas: t, el: s } = o(this.$el, n.target);
      this._canvas = t, this._canvasEl = s;
    },
    get isRunning() {
      const t = this._canvas?.runState;
      return t === "running" || t === "paused";
    },
    async onClick() {
      if (this.isRunning) return;
      if (!this._canvas) {
        console.warn("[wireflow] <x-flow-run-button>: no canvas found");
        return;
      }
      const t = this._canvasEl?.[n.handlersKey] ?? {};
      await this._canvas.run(n.startId, t, n.options ?? {});
    }
  })), e.data("flowStopButton", (n) => ({
    _canvas: null,
    alwaysVisible: !!n.alwaysVisible,
    init() {
      const { canvas: t } = o(this.$el, n.target);
      this._canvas = t;
    },
    get isRunning() {
      const t = this._canvas?.runState;
      return t === "running" || t === "paused";
    },
    onClick() {
      this._canvas?.stopRun?.();
    }
  })), e.data("flowResetButton", (n) => ({
    _canvas: null,
    init() {
      const { canvas: t } = o(this.$el, n.target);
      this._canvas = t;
    },
    onClick() {
      this._canvas?.resetStates?.(), this._canvas?.resetExecutionLog?.();
    }
  }));
}
export {
  F as default,
  q as validateWorkflow
};
//# sourceMappingURL=alpineflow-workflow.esm.js.map
