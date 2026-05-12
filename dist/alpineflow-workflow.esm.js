const S = "__alpineflow_registry__";
function H() {
  return typeof globalThis < "u" ? (globalThis[S] || (globalThis[S] = /* @__PURE__ */ new Map()), globalThis[S]) : /* @__PURE__ */ new Map();
}
function v(e, d) {
  H().set(e, d);
}
function N(e, d) {
  return d.split(".").reduce((a, n) => a?.[n], e);
}
function M(e, d) {
  const a = N(d, e.field);
  switch (e.op) {
    case "equals":
      return a === e.value;
    case "notEquals":
      return a !== e.value;
    case "in":
      return Array.isArray(e.value) && e.value.includes(a);
    case "notIn":
      return Array.isArray(e.value) && !e.value.includes(a);
    case "greaterThan":
      return a > e.value;
    case "lessThan":
      return a < e.value;
    case "greaterThanOrEqual":
      return a >= e.value;
    case "lessThanOrEqual":
      return a <= e.value;
    case "exists":
      return a != null;
    case "matches":
      return new RegExp(e.value).test(String(a ?? ""));
    default:
      return !1;
  }
}
function m(e, d, a) {
  const n = e.getEdge?.(d) ?? e.edges?.find((s) => s.id === d);
  if (!n)
    return;
  const t = n.class ?? "";
  t.split(" ").includes(a) || (n.class = t ? `${t} ${a}` : a);
}
function T(e, d, a) {
  const n = e.getEdge?.(d) ?? e.edges?.find((s) => s.id === d);
  if (!n)
    return;
  const t = (n.class ?? "").split(" ").filter((s) => s !== a).join(" ");
  n.class = t || void 0;
}
function $(e, d) {
  m(e, d, "flow-edge-entering");
}
function k(e, d) {
  T(e, d, "flow-edge-entering"), m(e, d, "flow-edge-completed");
}
function w(e, d) {
  m(e, d, "flow-edge-taken");
}
function E(e, d) {
  m(e, d, "flow-edge-untaken");
}
function x(e, d) {
  T(e, d, "flow-edge-entering"), m(e, d, "flow-edge-failed");
}
function p(e, d, a) {
  const n = e.executionLog, t = { t: Date.now(), ...d };
  for (n.push(t); n.length > a; )
    n.shift();
}
function C(e) {
  return async function(a, n = {}, t = {}) {
    const s = {
      payload: { ...t.payload ?? {} },
      nodeResults: {},
      currentNodeId: null,
      startedAt: Date.now()
    }, o = {
      isPaused: !1,
      isStopped: !1,
      pausePromise: null,
      pauseResolve: null
    }, l = {
      get isPaused() {
        return o.isPaused;
      },
      get isStopped() {
        return o.isStopped;
      },
      pause() {
        !o.isPaused && !o.isStopped && (o.isPaused = !0, o.pausePromise = new Promise((u) => {
          o.pauseResolve = u;
        }));
      },
      resume() {
        o.isPaused && (o.isPaused = !1, o.pauseResolve?.(), o.pausePromise = null, o.pauseResolve = null);
      },
      stop() {
        o.isStopped = !0, o.isPaused = !1, o.pauseResolve?.(), o.pausePromise = null, o.pauseResolve = null;
      },
      finished: null
    }, i = t.logLimit ?? 500, c = /* @__PURE__ */ new Set(), r = (async () => {
      if (await Promise.resolve(), typeof e.resetStates == "function" && e.resetStates(), Array.isArray(e.edges))
        for (const u of e.edges) u.class = void 0;
      typeof e.resetExecutionLog == "function" && e.resetExecutionLog(), t.lock && e.toggleInteractive?.(), p(e, { type: "run:started", payload: s.payload }, i);
      try {
        if (await I(e, a, s, n, t, o, c, i), s.currentNodeId = null, !o.isStopped) {
          if (Array.isArray(e.nodes))
            for (const u of e.nodes)
              !c.has(u.id) && !u.runState && e.setNodeState(u.id, "skipped");
          p(e, { type: "run:complete", payload: s.payload }, i), n.onComplete?.(s);
        }
      } catch (u) {
        throw o.isStopped = !0, o.pauseResolve?.(), u;
      } finally {
        t.lock && e.toggleInteractive?.(), e._currentRunHandle === l && (e._currentRunHandle = null);
      }
      return s;
    })();
    return l.finished = r, e._currentRunHandle = l, l;
  };
}
async function I(e, d, a, n, t, s, o, l) {
  let i = d;
  for (; i; ) {
    if (s.isStopped) {
      p(e, { type: "run:stopped", nodeId: a.currentNodeId ?? void 0 }, l);
      break;
    }
    if (o.has(i))
      break;
    if (o.add(i), s.isPaused && s.pausePromise && (await s.pausePromise, s.isStopped)) {
      p(e, { type: "run:stopped", nodeId: a.currentNodeId ?? void 0 }, l);
      break;
    }
    const c = e.getNode(i);
    if (!c)
      break;
    a.currentNodeId = i;
    const r = (e.edges ?? []).filter((f) => f.target === i);
    for (const f of r)
      $(e, f.id);
    if (c.type === "flow-wait") {
      e.setNodeState(i, "running");
      const f = c.data?.durationMs ?? t.defaultDurationMs ?? 1e3;
      p(e, { type: "wait:start", nodeId: i }, l);
      const y = Date.now();
      await R(f), p(e, { type: "wait:end", nodeId: i, runtimeMs: Date.now() - y }, l), e.setNodeState(i, "completed");
      for (const b of r)
        k(e, b.id);
      const _ = await P(e, c, i, n, t, a, l);
      if (_.length === 0)
        break;
      if (_.length === 1)
        i = _[0];
      else {
        p(e, { type: "parallel:fork", nodeId: i, payload: { branches: _ } }, l), await Promise.all(_.map(
          (b) => I(e, b, { ...a, payload: { ...a.payload } }, n, t, s, o, l)
        ));
        break;
      }
      continue;
    }
    e.setNodeState(i, "running");
    const u = Date.now();
    p(e, { type: "node:enter", nodeId: i }, l);
    try {
      const f = await n.onEnter?.(c, a);
      f && typeof f == "object" && (a.nodeResults[i] = f, Object.assign(a.payload, f));
    } catch (f) {
      e.setNodeState(i, "failed");
      for (const y of r)
        x(e, y.id);
      throw p(e, { type: "run:error", nodeId: i, payload: { error: f.message } }, l), n.onError?.(f, c, a), f;
    }
    t.defaultDurationMs && await R(t.defaultDurationMs), e.setNodeState(i, "completed");
    for (const f of r)
      k(e, f.id);
    const g = await n.onExit?.(c, a);
    g && typeof g == "object" && (a.nodeResults[`${i}:exit`] = g, Object.assign(a.payload, g)), p(e, { type: "node:exit", nodeId: i, runtimeMs: Date.now() - u, outputs: a.nodeResults[i] }, l);
    const h = await P(e, c, i, n, t, a, l);
    if (h.length === 0)
      break;
    if (h.length === 1)
      i = h[0];
    else {
      p(e, { type: "parallel:fork", nodeId: i, payload: { branches: h } }, l), await Promise.all(h.map(
        (f) => I(e, f, { ...a, payload: { ...a.payload } }, n, t, s, o, l)
      ));
      break;
    }
  }
}
async function P(e, d, a, n, t, s, o) {
  const l = (e.edges ?? []).filter((i) => i.source === a);
  if (l.length === 0)
    return [];
  if (n.pickBranch) {
    const i = await n.pickBranch(d, l, s);
    if (i) {
      const c = l.find((r) => r.id === i) ?? null;
      if (c) {
        if (d.type === "flow-condition" && typeof c.sourceHandle == "string" && (d.data = d.data ?? {}, d.data._branchTaken = c.sourceHandle), w(e, c.id), p(e, { type: "edge:taken", edgeId: c.id }, o), t.muteUntakenBranches)
          for (const r of l)
            r.id !== c.id && (E(e, r.id), p(e, { type: "edge:untaken", edgeId: r.id }, o));
        return t.particleOnEdges && e.sendParticle?.(c.id, t.particleOptions ?? {}), [c.target];
      }
      return [];
    }
  }
  if (d.type === "flow-condition") {
    const i = A(d, l, s.payload), c = i ? l.find((r) => r.target === i) : null;
    if (c) {
      if (typeof c.sourceHandle == "string" && (d.data = d.data ?? {}, d.data._branchTaken = c.sourceHandle), p(e, { type: "branch:chosen", nodeId: a, edgeId: c.id }, o), w(e, c.id), p(e, { type: "edge:taken", edgeId: c.id }, o), t.muteUntakenBranches)
        for (const r of l)
          r.id !== c.id && (E(e, r.id), p(e, { type: "edge:untaken", edgeId: r.id }, o));
      return t.particleOnEdges && e.sendParticle?.(c.id, t.particleOptions ?? {}), [c.target];
    }
    return [];
  }
  if (l.length === 1) {
    const i = l[0];
    return w(e, i.id), p(e, { type: "edge:taken", edgeId: i.id }, o), t.particleOnEdges && e.sendParticle?.(i.id, t.particleOptions ?? {}), [i.target];
  }
  for (const i of l)
    w(e, i.id), p(e, { type: "edge:taken", edgeId: i.id }, o), t.particleOnEdges && e.sendParticle?.(i.id, t.particleOptions ?? {});
  return l.map((i) => i.target);
}
function A(e, d, a) {
  let n;
  if (typeof e.data?.evaluate == "function")
    n = !!e.data.evaluate(a);
  else if (e.data?.condition)
    n = M(e.data.condition, a);
  else
    return d[0]?.target ?? null;
  const t = n ? "true" : "false";
  return d.find((o) => o.sourceHandle === t)?.target ?? null;
}
function R(e) {
  return new Promise((d) => setTimeout(d, e));
}
function B(e) {
  return async function(a, n = {}) {
    const t = n.speed ?? 1;
    let s = !1, o = !1, l = null;
    const i = {
      get isPaused() {
        return s;
      },
      get isStopped() {
        return o;
      },
      pause() {
        !s && !o && (s = !0);
      },
      resume() {
        s && (s = !1, l?.(), l = null);
      },
      stop() {
        o = !0, s = !1, l?.(), l = null;
      },
      finished: null
    }, c = (async () => {
      if (await Promise.resolve(), typeof e.resetStates == "function" && e.resetStates(), Array.isArray(e.edges))
        for (const u of e.edges) u.class = void 0;
      let r = a[0]?.t ?? Date.now();
      for (const u of a) {
        if (o || s && (await new Promise((h) => {
          l = h;
        }), o))
          break;
        const g = (u.t - r) / t;
        switch (g > 10 && await O(g), r = u.t, u.type) {
          case "node:enter":
            if (u.nodeId) {
              e.setNodeState(u.nodeId, "running");
              const h = (e.edges ?? []).filter((f) => f.target === u.nodeId);
              for (const f of h)
                $(e, f.id);
            }
            break;
          case "node:exit":
            if (u.nodeId) {
              e.setNodeState(u.nodeId, "completed");
              const h = (e.edges ?? []).filter((f) => f.target === u.nodeId);
              for (const f of h)
                k(e, f.id);
            }
            break;
          case "run:error":
            if (u.nodeId) {
              e.setNodeState(u.nodeId, "failed");
              const h = (e.edges ?? []).filter((f) => f.target === u.nodeId);
              for (const f of h)
                x(e, f.id);
            }
            break;
          case "edge:taken":
            if (u.edgeId) {
              w(e, u.edgeId);
              const h = (e.edges ?? []).find((f) => f.id === u.edgeId);
              if (h && typeof h.sourceHandle == "string") {
                const f = (e.nodes ?? []).find((y) => y.id === h.source) ?? e.getNode?.(h.source);
                f && f.type === "flow-condition" && (f.data = f.data ?? {}, f.data._branchTaken = h.sourceHandle);
              }
            }
            break;
          case "edge:untaken":
            u.edgeId && E(e, u.edgeId);
            break;
          case "wait:start":
            u.nodeId && e.setNodeState(u.nodeId, "running");
            break;
          case "wait:end":
            u.nodeId && e.setNodeState(u.nodeId, "completed");
            break;
        }
      }
    })();
    return i.finished = c, i;
  };
}
function O(e) {
  return new Promise((d) => setTimeout(d, e));
}
function D(e, d) {
  for (const i of d)
    if (i && typeof i.source == "string" && i.source === i.target)
      return !0;
  const a = /* @__PURE__ */ new Map(), n = (i) => {
    let c = a.get(i);
    return c || (c = [], a.set(i, c)), c;
  };
  for (const i of e)
    i && typeof i.id == "string" && n(i.id);
  for (const i of d)
    !i || typeof i.source != "string" || typeof i.target != "string" || (n(i.source).push(i.target), n(i.target));
  const t = 0, s = 1, o = 2, l = /* @__PURE__ */ new Map();
  for (const i of a.keys()) l.set(i, t);
  for (const i of a.keys()) {
    if (l.get(i) !== t) continue;
    const c = [{ node: i, idx: 0 }];
    for (l.set(i, s); c.length > 0; ) {
      const r = c[c.length - 1], u = a.get(r.node) ?? [];
      if (r.idx < u.length) {
        const g = u[r.idx++], h = l.get(g);
        if (h === s) return !0;
        h === t && (l.set(g, s), c.push({ node: g, idx: 0 }));
      } else
        l.set(r.node, o), c.pop();
    }
  }
  return !1;
}
function F(e) {
  const d = [], a = Array.isArray(e?.nodes) ? e.nodes : [], n = Array.isArray(e?.edges) ? e.edges : [], t = /* @__PURE__ */ new Set(), s = /* @__PURE__ */ new Set();
  for (const r of a)
    !r || typeof r.id != "string" || (t.has(r.id) && s.add(r.id), t.add(r.id));
  for (const r of s)
    d.push({
      severity: "error",
      code: "duplicate-node-id",
      nodeId: r,
      message: `Duplicate node id "${r}".`
    });
  for (const r of a) {
    if (!r || typeof r.id != "string") continue;
    const u = r.data ?? {};
    if (r.type === "flow-condition") {
      const g = u.condition !== void 0 && u.condition !== null, h = typeof u.evaluate == "function";
      !g && !h && d.push({
        severity: "error",
        code: "missing-condition",
        nodeId: r.id,
        message: `Condition node "${r.id}" has neither a "condition" object nor an "evaluate" function.`
      });
    }
    if (r.type === "flow-wait") {
      const g = u.durationMs;
      (typeof g != "number" || !Number.isFinite(g)) && d.push({
        severity: "error",
        code: "wait-missing-duration",
        nodeId: r.id,
        message: `Wait node "${r.id}" is missing numeric data.durationMs.`
      });
    }
  }
  for (const r of n) {
    if (!r) continue;
    const u = typeof r.id == "string" ? r.id : void 0;
    (typeof r.source != "string" || !t.has(r.source)) && d.push({
      severity: "error",
      code: "dangling-edge",
      edgeId: u,
      nodeId: typeof r.source == "string" ? r.source : void 0,
      message: `Edge ${u ? `"${u}" ` : ""}references missing source node "${r.source}".`
    }), (typeof r.target != "string" || !t.has(r.target)) && d.push({
      severity: "error",
      code: "dangling-edge",
      edgeId: u,
      nodeId: typeof r.target == "string" ? r.target : void 0,
      message: `Edge ${u ? `"${u}" ` : ""}references missing target node "${r.target}".`
    });
  }
  const o = a.filter((r) => r && r.type === "flow-condition" && typeof r.id == "string");
  for (const r of o) {
    const u = n.filter((h) => h && h.source === r.id), g = /* @__PURE__ */ new Set();
    for (const h of u)
      typeof h.sourceHandle == "string" && (g.add(h.sourceHandle), h.sourceHandle !== "true" && h.sourceHandle !== "false" && d.push({
        severity: "error",
        code: "unhandled-source-handle",
        edgeId: typeof h.id == "string" ? h.id : void 0,
        nodeId: r.id,
        message: `Condition node "${r.id}" has an outgoing edge with sourceHandle "${h.sourceHandle}" — only "true" / "false" are recognised.`
      }));
    g.has("true") || d.push({
      severity: "error",
      code: "condition-missing-branch",
      nodeId: r.id,
      message: `Condition node "${r.id}" is missing the "true" branch.`
    }), g.has("false") || d.push({
      severity: "error",
      code: "condition-missing-branch",
      nodeId: r.id,
      message: `Condition node "${r.id}" is missing the "false" branch.`
    });
  }
  const l = /* @__PURE__ */ new Set(), i = /* @__PURE__ */ new Set();
  for (const r of n)
    r && (typeof r.target == "string" && l.add(r.target), typeof r.source == "string" && i.add(r.source));
  for (const r of a)
    !r || typeof r.id != "string" || !l.has(r.id) && !i.has(r.id) && d.push({
      severity: "warning",
      code: "unreachable-node",
      nodeId: r.id,
      message: `Node "${r.id}" has no connected edges.`
    });
  return D(a, n) && d.push({
    severity: "warning",
    code: "cycle",
    message: "Directed cycle detected in workflow graph."
  }), { valid: !d.some((r) => r.severity === "error"), issues: d };
}
function j(e) {
  v("workflow", {
    setup(n) {
      n.run = C(n), n.replayExecution = B(n), n.executionLog = [], n.resetExecutionLog = function() {
        this.executionLog = [];
      }, n.validateWorkflow = function() {
        return F(this);
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
          for (const o of this.nodes)
            o && o.type === "flow-condition" && o.data && delete o.data._branchTaken;
      };
    }
  }), e.magic("workflowRun", (n) => async (t, s, o) => {
    const l = n.closest(".flow-container") ?? n.querySelector(".flow-container") ?? document.querySelector(".flow-container");
    if (!l)
      return console.warn("[workflow] $workflowRun: no .flow-container found"), null;
    const i = e.$data(l);
    return typeof i?.run != "function" ? (console.warn("[workflow] $workflowRun: canvas.run not available — is the workflow addon registered?"), null) : i.run(t, s, o);
  });
  const d = (n, t) => {
    const s = t ? document.querySelector(t) : n.closest(".flow-container") ?? document.querySelector(".flow-container");
    return {
      canvas: s ? e.$data(s) : null,
      el: s
    };
  }, a = (n, t) => {
    if (t !== "__any__" && typeof n._canvas?.[t] == "function")
      return !0;
    const s = n.$el, o = n._canvasEl ?? s?.closest?.(".flow-container") ?? document.querySelector(".flow-container");
    return o ? (n._canvas = e.$data(o) ?? null, n._canvasEl = o, t === "__any__" ? !!n._canvas : typeof n._canvas?.[t] == "function") : !1;
  };
  e.data("flowReplayControls", (n) => ({
    _handle: null,
    _canvas: null,
    _canvasEl: null,
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
      return a(this, "__any__"), this._handle ? !0 : Array.isArray(this._canvas?.executionLog) && this._canvas.executionLog.length > 0;
    },
    get progressPercent() {
      return this.durationMs <= 0 ? 0 : Math.min(100, this.currentTimeMs / this.durationMs * 100);
    },
    init() {
      const { canvas: t, el: s } = d(this.$el, n.target);
      this._canvas = t, this._canvasEl = s, n.handleExpr && this._canvas && (this._handle = this._canvas[n.handleExpr] ?? null), !this._handle && this._canvas?.lastReplayHandle && (this._handle = this._canvas.lastReplayHandle), this._detectCapabilities();
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
      a(this, "replayExecution");
      const t = this._canvas?.executionLog;
      return Array.isArray(t) && t.length > 0 && typeof this._canvas?.replayExecution == "function" ? (this._handle = this._canvas.replayExecution(t, { speed: this.speed }), this._detectCapabilities(), Array.isArray(t) && t.length > 0 && (this.durationMs = (t[t.length - 1]?.t ?? 0) - (t[0]?.t ?? 0)), !0) : !1;
    },
    formatTime(t) {
      if ((!Number.isFinite(t) || t < 0) && (t = 0), t < 1e3) return `0:${String(Math.floor(t / 100)).padStart(2, "0")}`;
      const s = Math.floor(t / 1e3), o = Math.floor(s / 60), l = s % 60;
      return `${o}:${String(l).padStart(2, "0")}`;
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
      const o = s.getBoundingClientRect(), l = Math.max(0, Math.min(1, (t.clientX - o.left) / o.width));
      this._handle.scrubTo(l * this.durationMs), this.currentTimeMs = l * this.durationMs;
    }
  })), e.data("flowExecutionLog", (n) => ({
    _canvas: null,
    _canvasEl: null,
    _autoScroll: !0,
    filter: n.initialFilter || "all",
    baseTime: 0,
    init() {
      const t = this, { canvas: s, el: o } = d(t.$el, n.target);
      this._canvas = s, this._canvasEl = o, t.$watch("filteredEvents", () => {
        this._autoScroll && t.$nextTick(() => this._scrollToBottom());
      });
    },
    get filteredEvents() {
      a(this, "__any__");
      const t = n.sourceExpr ? this._canvas?.[n.sourceExpr] ?? [] : this._canvas?.executionLog ?? [], s = Array.isArray(t) ? t : [];
      if (s.length === 0) return [];
      this.baseTime = s[0]?.t ?? 0;
      let o = s;
      if (this.filter === "errors")
        o = s.filter((l) => l.type === "run:error" || l.type === "edge:failed");
      else if (this.filter === "lifecycle") {
        const l = /* @__PURE__ */ new Set(["run:started", "run:complete", "run:stopped", "node:enter", "node:exit"]);
        o = s.filter((i) => l.has(i.type));
      }
      return o.slice(-n.maxEvents);
    },
    formatTime(t) {
      if ((!Number.isFinite(t) || t < 0) && (t = 0), t < 1e3) return `+${Math.round(t)}ms`;
      if (t < 6e4) return `+${(t / 1e3).toFixed(1)}s`;
      const s = Math.floor(t / 6e4), o = Math.floor(t % 6e4 / 1e3);
      return `+${s}m${o ? ` ${o}s` : ""}`;
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
      const { canvas: t, el: s } = d(this.$el, n.target);
      this._canvas = t, this._canvasEl = s;
    },
    get isRunning() {
      const t = this._canvas?.runState;
      return t === "running" || t === "paused";
    },
    async onClick() {
      if (this.isRunning) return;
      if (!a(this, "run")) {
        console.warn("[wireflow] <x-flow-run-button>: canvas not ready (no .flow-container or workflow addon not registered)");
        return;
      }
      const t = this._canvasEl?.[n.handlersKey] ?? {};
      await this._canvas.run(n.startId, t, n.options ?? {});
    }
  })), e.data("flowStopButton", (n) => ({
    _canvas: null,
    _canvasEl: null,
    alwaysVisible: !!n.alwaysVisible,
    init() {
      const { canvas: t, el: s } = d(this.$el, n.target);
      this._canvas = t, this._canvasEl = s;
    },
    get isRunning() {
      a(this, "__any__");
      const t = this._canvas?.runState;
      return t === "running" || t === "paused";
    },
    onClick() {
      a(this, "stopRun") && this._canvas.stopRun();
    }
  })), e.data("flowResetButton", (n) => ({
    _canvas: null,
    _canvasEl: null,
    init() {
      const { canvas: t, el: s } = d(this.$el, n.target);
      this._canvas = t, this._canvasEl = s;
    },
    onClick() {
      a(this, "resetStates") && (this._canvas.resetStates(), this._canvas.resetExecutionLog?.());
    }
  }));
}
export {
  j as default,
  F as validateWorkflow
};
//# sourceMappingURL=alpineflow-workflow.esm.js.map
