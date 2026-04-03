import * as c from "yjs";
import { encodeStateAsUpdate as N, applyUpdate as H, encodeStateVector as C, Doc as T } from "yjs";
import { applyAwarenessUpdate as m, encodeAwarenessUpdate as b, Awareness as j } from "y-protocols/awareness";
import { WebsocketProvider as D } from "y-websocket";
const w = "__alpineflow_registry__";
function O() {
  return typeof globalThis < "u" ? (globalThis[w] || (globalThis[w] = /* @__PURE__ */ new Map()), globalThis[w]) : /* @__PURE__ */ new Map();
}
function x(i, e) {
  O().set(i, e);
}
const d = "collab-bridge-local";
function y(i) {
  const e = new c.Map(), t = JSON.parse(JSON.stringify(i));
  for (const [n, r] of Object.entries(t))
    e.set(n, r);
  return e;
}
class k {
  constructor(e, t, n) {
    if (this.destroyed = !1, this._initialSyncDone = !1, this._draggingNodeIds = /* @__PURE__ */ new Set(), this.doc = e, this.state = t, this.yNodes = e.getMap("nodes"), this.yEdges = e.getMap("edges"), n) {
      const r = (s) => {
        !s || this._initialSyncDone || this.destroyed || (this._initialSyncDone = !0, n.off("sync", r), this._resolveInitialState());
      };
      n.on("sync", r);
    } else
      this._resolveInitialState();
    this.nodeObserver = (r, s) => {
      if (this.destroyed || s.origin === d)
        return;
      this.pullNodesFromYjs();
      const a = () => {
        this.destroyed || this.pullEdgesFromYjs();
      };
      typeof requestAnimationFrame == "function" ? requestAnimationFrame(a) : a();
    }, this.yNodes.observeDeep(this.nodeObserver), this.edgeObserver = (r, s) => {
      this.destroyed || s.origin === d || this.pullEdgesFromYjs();
    }, this.yEdges.observeDeep(this.edgeObserver);
  }
  _resolveInitialState() {
    this.yNodes.size > 0 ? this.pullAllFromYjs() : this._pushInitialState();
  }
  _pushInitialState() {
    this.doc.transact(() => {
      for (const e of this.state.nodes)
        this.yNodes.has(e.id) || this.yNodes.set(e.id, y(e));
      for (const e of this.state.edges)
        this.yEdges.has(e.id) || this.yEdges.set(e.id, y(e));
    }, d);
  }
  // -- Push local to Yjs --
  pushLocalNodeUpdate(e, t) {
    this.doc.transact(() => {
      const n = this.yNodes.get(e);
      if (!n)
        return;
      const r = JSON.parse(JSON.stringify(t));
      for (const [s, a] of Object.entries(r))
        n.set(s, a);
    }, d);
  }
  pushLocalNodeAdd(e) {
    this.doc.transact(() => {
      this.yNodes.set(e.id, y(e));
    }, d);
  }
  pushLocalNodeRemove(e) {
    this.doc.transact(() => {
      this.yNodes.delete(e);
    }, d);
  }
  pushLocalEdgeAdd(e) {
    this.doc.transact(() => {
      this.yEdges.set(e.id, y(e));
    }, d);
  }
  pushLocalEdgeRemove(e) {
    this.doc.transact(() => {
      this.yEdges.delete(e);
    }, d);
  }
  // -- Pull Yjs to Alpine --
  /** Mark a node as being dragged locally — its position won't be overwritten by remote pulls. */
  setDragging(e, t) {
    t ? this._draggingNodeIds.add(e) : this._draggingNodeIds.delete(e);
  }
  pullAllFromYjs() {
    this.pullNodesFromYjs(), this.pullEdgesFromYjs();
  }
  pullNodesFromYjs() {
    const e = /* @__PURE__ */ new Map();
    this.yNodes.forEach((n, r) => {
      const s = n.toJSON();
      (!s.position || typeof s.position != "object") && (s.position = { x: 0, y: 0 }), e.set(r, s);
    });
    const t = /* @__PURE__ */ new Set();
    for (let n = 0; n < this.state.nodes.length; n++) {
      const r = this.state.nodes[n];
      t.add(r.id);
      const s = e.get(r.id);
      s && (s.position && !this._draggingNodeIds.has(r.id) && (r.position.x = s.position.x, r.position.y = s.position.y), s.data && (r.data = s.data));
    }
    e.forEach((n, r) => {
      t.has(r) || this.state.nodes.push(n);
    });
    for (let n = this.state.nodes.length - 1; n >= 0; n--)
      e.has(this.state.nodes[n].id) || this.state.nodes.splice(n, 1);
    this.state._rebuildNodeMap?.();
  }
  pullEdgesFromYjs() {
    const e = [];
    this.yEdges.forEach((t) => {
      e.push(t.toJSON());
    }), this.state.edges.splice(0, this.state.edges.length, ...e), this.state._rebuildEdgeMap?.();
  }
  // -- Lifecycle --
  destroy() {
    this.destroyed = !0, this.yNodes.unobserveDeep(this.nodeObserver), this.yEdges.unobserveDeep(this.edgeObserver);
  }
}
class R {
  constructor(e, t) {
    this.destroyed = !1, this._users = [], this._remoteStates = /* @__PURE__ */ new Map(), this._onChangeCallbacks = [], this.status = "connected", this.awareness = e, this.localUser = t, e.setLocalState({
      user: t,
      cursor: null,
      selectedNodes: [],
      viewport: { x: 0, y: 0, zoom: 1 }
    }), this.changeHandler = () => {
      this.destroyed || this.rebuildUsers();
    }, e.on("change", this.changeHandler);
  }
  // -- Public API --
  get me() {
    return this.localUser;
  }
  get users() {
    return this._users;
  }
  get userCount() {
    return this._users.length + 1;
  }
  get connected() {
    return !this.destroyed;
  }
  /** Get all remote awareness states (for cursor rendering). */
  getRemoteStates() {
    return this._remoteStates;
  }
  /** Subscribe to awareness changes. Returns unsubscribe function. */
  onChange(e) {
    return this._onChangeCallbacks.push(e), () => {
      this._onChangeCallbacks = this._onChangeCallbacks.filter((t) => t !== e);
    };
  }
  // -- Local state updates --
  updateCursor(e) {
    if (this.destroyed) return;
    const t = this.awareness.getLocalState() ?? {};
    this.awareness.setLocalState({ ...t, cursor: e });
  }
  updateSelection(e) {
    if (this.destroyed) return;
    const t = this.awareness.getLocalState() ?? {};
    this.awareness.setLocalState({ ...t, selectedNodes: e });
  }
  updateViewport(e) {
    if (this.destroyed) return;
    const t = this.awareness.getLocalState() ?? {};
    this.awareness.setLocalState({ ...t, viewport: e });
  }
  // -- Internal --
  rebuildUsers() {
    const e = this.awareness.getStates(), t = this.awareness.clientID, n = [];
    this._remoteStates.clear(), e.forEach((r, s) => {
      s !== t && r?.user && (n.push(r.user), this._remoteStates.set(s, r));
    }), this._users = n;
    for (const r of this._onChangeCallbacks) r();
  }
  // -- Lifecycle --
  destroy() {
    this.destroyed = !0, this.awareness.off("change", this.changeHandler), this.awareness.setLocalState(null), this._users = [], this._remoteStates.clear();
  }
}
const g = "__alpineflow_collab_store__";
function F() {
  return typeof globalThis < "u" ? (globalThis[g] || (globalThis[g] = /* @__PURE__ */ new WeakMap()), globalThis[g]) : /* @__PURE__ */ new WeakMap();
}
const P = F(), v = "flow-collab-cursor", A = "http://www.w3.org/2000/svg", M = "M0.5 0.5L15.5 11.5L8 12.5L5 21.5L0.5 0.5Z";
function Y(i, e) {
  const t = document.createElement("div");
  t.className = v, t.dataset.clientId = i, t.style.position = "absolute", t.style.left = "0", t.style.top = "0", t.style.pointerEvents = "none", t.style.zIndex = "10000", t.style.transition = "transform 0.1s ease-out", t.style.willChange = "transform";
  const n = document.createElementNS(A, "svg");
  n.setAttribute("width", "16"), n.setAttribute("height", "22"), n.setAttribute("viewBox", "0 0 16 22"), n.setAttribute("fill", "none"), n.style.display = "block", n.style.filter = "drop-shadow(0 1px 2px rgba(0,0,0,0.3))";
  const r = document.createElementNS(A, "path");
  r.setAttribute("d", M), r.setAttribute("fill", e.color), r.setAttribute("stroke", "white"), r.setAttribute("stroke-width", "1.5"), r.setAttribute("stroke-linejoin", "round"), r.classList.add("flow-collab-cursor-arrow"), n.appendChild(r), t.appendChild(n);
  const s = document.createElement("span");
  return s.className = "flow-collab-cursor-label", s.textContent = e.name, s.style.position = "absolute", s.style.left = "14px", s.style.top = "16px", s.style.background = e.color, s.style.color = "white", s.style.padding = "2px 8px", s.style.borderRadius = "4px", s.style.fontSize = "11px", s.style.fontWeight = "500", s.style.whiteSpace = "nowrap", s.style.lineHeight = "1.4", s.style.boxShadow = "0 1px 3px rgba(0,0,0,0.2)", t.appendChild(s), t;
}
function q(i, e) {
  const t = i.querySelector(".flow-collab-cursor-arrow");
  t && t.setAttribute("fill", e);
  const n = i.querySelector(".flow-collab-cursor-label");
  n && (n.style.background = e);
}
function W(i, e, t) {
  const n = /* @__PURE__ */ new Map();
  i.querySelectorAll(`.${v}`).forEach((s) => {
    n.set(s.dataset.clientId, s);
  });
  const r = /* @__PURE__ */ new Set();
  e.forEach((s, a) => {
    if (!s.cursor)
      return;
    const o = String(a);
    r.add(o);
    let l = n.get(o);
    l ? q(l, s.user.color) : (l = Y(o, s.user), i.appendChild(l)), l.style.transform = `translate(${s.cursor.x}px, ${s.cursor.y}px)`;
  }), n.forEach((s, a) => {
    r.has(a) || s.remove();
  });
}
function J(i) {
  i.directive("flow-cursors", (e, {}, { cleanup: t }) => {
    const n = e.closest("[data-flow-canvas]");
    if (!n) return;
    const r = i.$data(n);
    let s = null, a = null, o = !1;
    function l() {
      const f = P.get(n);
      if (!f?.awareness) return !1;
      const U = f.awareness;
      function E() {
        const L = U.getRemoteStates();
        r.viewport?.zoom, W(e, L);
      }
      return E(), s = U.onChange(E), !0;
    }
    l() || (a = setInterval(() => {
      (o || l()) && (clearInterval(a), a = null);
    }, 50)), t(() => {
      o = !0, a && clearInterval(a), s && s(), e.querySelectorAll(`.${v}`).forEach((f) => f.remove());
    });
  });
}
let _ = H, S = N, I = C;
function V(i) {
  _ = i.applyUpdate, S = i.encodeStateAsUpdate, I = i.encodeStateVector;
}
function h(i) {
  let e = "";
  for (let t = 0; t < i.length; t++)
    e += String.fromCharCode(i[t]);
  return btoa(e);
}
function u(i) {
  const e = atob(i), t = new Uint8Array(e.length);
  for (let n = 0; n < e.length; n++)
    t[n] = e.charCodeAt(n);
  return t;
}
const p = "reverb-provider";
class G {
  constructor(e) {
    this.channel = null, this.doc = null, this.awareness = null, this.listeners = {}, this._connected = !1, this.updateHandler = null, this.awarenessHandler = null, this._saveTimer = null, this._saveDirty = !1, this.roomId = e.roomId, this.channelPattern = e.channel, this.user = e.user, this.stateUrl = e.stateUrl;
  }
  get connected() {
    return this._connected;
  }
  connect(e, t) {
    this.doc = e, this.awareness = t;
    const n = this.channelPattern.replace("{roomId}", this.roomId), r = globalThis.Echo;
    if (!r) {
      console.warn("[alpineflow-collab] Laravel Echo not found. ReverbProvider requires Echo.");
      return;
    }
    if (this.channel = r.private(n), this.channel.listenForWhisper("yjs-update", (s) => {
      if (!this.doc) return;
      const a = u(s.data);
      _(this.doc, a, p);
    }), this.channel.listenForWhisper("yjs-sync-request", (s) => {
      if (!this.doc) return;
      const a = u(s.sv), o = S(this.doc, a);
      o.length > 2 && this.channel?.whisper("yjs-sync-response", { data: h(o) });
    }), this.channel.listenForWhisper("yjs-sync-response", (s) => {
      if (!this.doc) return;
      const a = u(s.data);
      _(this.doc, a, p);
    }), this.channel.listenForWhisper("yjs-awareness", (s) => {
      if (!this.awareness) return;
      const a = u(s.data);
      m(this.awareness, a, p);
    }), this.updateHandler = (s, a) => {
      a !== p && (this.channel?.whisper("yjs-update", { data: h(s) }), this._markDirty());
    }, e.on("update", this.updateHandler), this.awarenessHandler = ({ added: s, updated: a }) => {
      const o = [...s, ...a];
      if (o.length === 0) return;
      const l = b(t, o);
      this.channel?.whisper("yjs-awareness", { data: h(l) });
    }, t.on("update", this.awarenessHandler), this._connected = !0, this.emit("status", "connected"), this.stateUrl)
      this.fetchInitialState();
    else {
      const s = I(e);
      this.channel.whisper("yjs-sync-request", { sv: h(s) }), setTimeout(() => {
        this.emit("sync", !0);
      }, 1500);
    }
  }
  disconnect() {
    this.cleanupListeners(), this._connected = !1, this.emit("status", "disconnected");
  }
  destroy() {
    this.cleanupListeners(), this.channel = null, this.doc = null, this.awareness = null, this._connected = !1, this.listeners = {};
  }
  on(e, t) {
    (this.listeners[e] ??= /* @__PURE__ */ new Set()).add(t);
  }
  off(e, t) {
    this.listeners[e]?.delete(t);
  }
  emit(e, t) {
    this.listeners[e]?.forEach((n) => n(t));
  }
  cleanupListeners() {
    this.doc && this.updateHandler && (this.doc.off("update", this.updateHandler), this.updateHandler = null), this.awareness && this.awarenessHandler && (this.awareness.off("update", this.awarenessHandler), this.awarenessHandler = null), this._saveTimer && (clearTimeout(this._saveTimer), this._saveTimer = null), this._saveDirty && this._saveStateNow();
  }
  /** Mark doc as dirty — will save to stateUrl within 5 seconds. */
  _markDirty() {
    this.stateUrl && (this._saveDirty = !0, this._saveTimer || (this._saveTimer = setTimeout(() => {
      this._saveTimer = null, this._saveStateNow();
    }, 5e3)));
  }
  /** Save current doc state to stateUrl. */
  _saveStateNow() {
    if (!(!this.stateUrl || !this.doc || !this._saveDirty)) {
      this._saveDirty = !1;
      try {
        const e = S(this.doc), t = this.stateUrl.replace("{roomId}", this.roomId), n = typeof document < "u" ? document.querySelector('meta[name="csrf-token"]') : null, r = { "Content-Type": "application/json" };
        n && (r["X-CSRF-TOKEN"] = n.getAttribute("content") || ""), fetch(t, {
          method: "POST",
          headers: r,
          body: JSON.stringify({ state: h(e) })
        }).catch(() => {
        });
      } catch {
      }
    }
  }
  async fetchInitialState() {
    if (!(!this.stateUrl || !this.doc))
      try {
        const e = this.stateUrl.replace("{roomId}", this.roomId), t = await fetch(e);
        if (!t.ok) return;
        const n = await t.json();
        if (n.state && this.doc) {
          const r = u(n.state);
          _(this.doc, r, p);
        }
        this.emit("sync", !0);
      } catch {
      }
  }
}
class K {
  constructor(e) {
    this.wsProvider = null, this.listeners = {}, this._connected = !1, this.roomId = e.roomId, this.url = e.url, this.user = e.user;
  }
  get connected() {
    return this._connected;
  }
  connect(e, t) {
    this.wsProvider = new D(this.url, this.roomId, e, {
      awareness: t
    }), this.wsProvider.on("status", (n) => {
      const r = n.status;
      this._connected = r === "connected", this.emit("status", r);
    }), this.wsProvider.on("sync", (n) => {
      this.emit("sync", n);
    });
  }
  disconnect() {
    this.wsProvider?.disconnect(), this._connected = !1;
  }
  destroy() {
    this.wsProvider?.destroy(), this.wsProvider = null, this._connected = !1, this.listeners = {};
  }
  on(e, t) {
    (this.listeners[e] ??= /* @__PURE__ */ new Set()).add(t);
  }
  off(e, t) {
    this.listeners[e]?.delete(t);
  }
  emit(e, t) {
    this.listeners[e]?.forEach((n) => n(t));
  }
}
class Z {
  constructor(e) {
    this.connected = !1, this.doc = null, this.awareness = null, this.peer = null, this._listeners = {}, this._synced = !1, this._docUpdateHandler = null, this._peerDocUpdateHandler = null, this._awarenessUpdateHandler = null, this._peerAwarenessUpdateHandler = null, this.roomId = e.roomId;
  }
  connect(e, t) {
    this.doc = e, this.awareness = t, this.connected = !0, this._emit("status", "connected"), this.peer?.doc && this._setupSync();
  }
  disconnect() {
    this.connected = !1, this._emit("status", "disconnected");
  }
  destroy() {
    this.doc && this._docUpdateHandler && (this.doc.off("update", this._docUpdateHandler), this._docUpdateHandler = null), this.peer?.doc && this._peerDocUpdateHandler && (this.peer.doc.off("update", this._peerDocUpdateHandler), this._peerDocUpdateHandler = null), this.awareness && this._awarenessUpdateHandler && (this.awareness.off("update", this._awarenessUpdateHandler), this._awarenessUpdateHandler = null), this.peer?.awareness && this._peerAwarenessUpdateHandler && (this.peer.awareness.off("update", this._peerAwarenessUpdateHandler), this._peerAwarenessUpdateHandler = null), this.connected = !1, this._listeners = {};
  }
  on(e, t) {
    (this._listeners[e] = this._listeners[e] || []).push(t);
  }
  off(e, t) {
    this._listeners[e] = (this._listeners[e] || []).filter((n) => n !== t);
  }
  _emit(e, t) {
    (this._listeners[e] || []).forEach((n) => n(t));
  }
  _setupSync() {
    const e = this.peer;
    if (!this.doc || !e?.doc || this._synced) return;
    this._synced = !0, e._synced = !0;
    const t = c.encodeStateAsUpdate(this.doc), n = c.encodeStateAsUpdate(e.doc);
    if (c.applyUpdate(e.doc, t, "remote"), c.applyUpdate(this.doc, n, "remote"), this._docUpdateHandler = (r, s) => {
      s !== "remote" && c.applyUpdate(e.doc, r, "remote");
    }, this.doc.on("update", this._docUpdateHandler), this._peerDocUpdateHandler = (r, s) => {
      s !== "remote" && c.applyUpdate(this.doc, r, "remote");
    }, e.doc.on("update", this._peerDocUpdateHandler), this.awareness && e.awareness) {
      const r = this.awareness, s = e.awareness;
      this._awarenessUpdateHandler = (a) => {
        const o = [...a.added, ...a.updated];
        if (o.length === 0) return;
        const l = b(r, o);
        m(s, l, "remote");
      }, r.on("update", this._awarenessUpdateHandler), this._peerAwarenessUpdateHandler = (a) => {
        const o = [...a.added, ...a.updated];
        if (o.length === 0) return;
        const l = b(s, o);
        m(r, l, "remote");
      }, s.on("update", this._peerAwarenessUpdateHandler);
    }
    this._emit("sync", !0), e._emit("sync", !0);
  }
}
function X(i, e) {
  i.peer = e, e.peer = i;
}
function Q(i) {
  J(i), V({ applyUpdate: H, encodeStateAsUpdate: N, encodeStateVector: C }), x("collab", {
    Doc: T,
    Awareness: j,
    CollabBridge: k,
    CollabAwareness: R
  });
}
export {
  R as CollabAwareness,
  k as CollabBridge,
  Z as InMemoryProvider,
  G as ReverbProvider,
  K as WebSocketProvider,
  Q as default,
  X as linkProviders,
  J as registerFlowCursorsDirective
};
//# sourceMappingURL=alpineflow-collab.esm.js.map
