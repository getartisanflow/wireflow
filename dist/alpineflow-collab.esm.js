import * as c from "yjs";
import { applyUpdate as N, encodeStateAsUpdate as A, encodeStateVector as H, Doc as j } from "yjs";
import { applyAwarenessUpdate as m, encodeAwarenessUpdate as b, Awareness as R } from "y-protocols/awareness";
import { WebsocketProvider as x } from "y-websocket";
const w = "__alpineflow_registry__";
function O() {
  return typeof globalThis < "u" ? (globalThis[w] || (globalThis[w] = /* @__PURE__ */ new Map()), globalThis[w]) : /* @__PURE__ */ new Map();
}
function k(i, e) {
  O().set(i, e);
}
const d = "collab-bridge-local";
function f(i) {
  const e = new c.Map(), t = JSON.parse(JSON.stringify(i));
  for (const [n, o] of Object.entries(t))
    e.set(n, o);
  return e;
}
class M {
  constructor(e, t, n) {
    if (this.destroyed = !1, this._initialSyncDone = !1, this._draggingNodeIds = /* @__PURE__ */ new Set(), this.doc = e, this.state = t, this.yNodes = e.getMap("nodes"), this.yEdges = e.getMap("edges"), n) {
      const o = (s) => {
        !s || this._initialSyncDone || this.destroyed || (this._initialSyncDone = !0, n.off("sync", o), this._resolveInitialState());
      };
      n.on("sync", o);
    } else
      this._resolveInitialState();
    this.nodeObserver = (o, s) => {
      if (this.destroyed || s.origin === d)
        return;
      this.pullNodesFromYjs();
      const r = () => {
        this.destroyed || this.pullEdgesFromYjs();
      };
      typeof requestAnimationFrame == "function" ? requestAnimationFrame(r) : r();
    }, this.yNodes.observeDeep(this.nodeObserver), this.edgeObserver = (o, s) => {
      this.destroyed || s.origin === d || this.pullEdgesFromYjs();
    }, this.yEdges.observeDeep(this.edgeObserver);
  }
  _resolveInitialState() {
    console.log("[CollabBridge] _resolveInitialState, yNodes.size:", this.yNodes.size, "local nodes:", this.state.nodes.length), this.yNodes.size === 0 ? (console.log("[CollabBridge] pushing local state to Yjs"), this.doc.transact(() => {
      for (const e of this.state.nodes)
        this.yNodes.set(e.id, f(e));
      for (const e of this.state.edges)
        this.yEdges.set(e.id, f(e));
    }, d)) : (console.log("[CollabBridge] pulling from Yjs, yNodes content:", this.yNodes.toJSON()), this.pullAllFromYjs());
  }
  // -- Push local to Yjs --
  pushLocalNodeUpdate(e, t) {
    this.doc.transact(() => {
      const n = this.yNodes.get(e);
      if (!n)
        return;
      const o = JSON.parse(JSON.stringify(t));
      for (const [s, r] of Object.entries(o))
        n.set(s, r);
    }, d);
  }
  pushLocalNodeAdd(e) {
    this.doc.transact(() => {
      this.yNodes.set(e.id, f(e));
    }, d);
  }
  pushLocalNodeRemove(e) {
    this.doc.transact(() => {
      this.yNodes.delete(e);
    }, d);
  }
  pushLocalEdgeAdd(e) {
    this.doc.transact(() => {
      this.yEdges.set(e.id, f(e));
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
    this.yNodes.forEach((n, o) => {
      const s = n.toJSON();
      s.position || (s.position = { x: 0, y: 0 }), e.set(o, s);
    });
    const t = /* @__PURE__ */ new Set();
    for (let n = 0; n < this.state.nodes.length; n++) {
      const o = this.state.nodes[n];
      t.add(o.id);
      const s = e.get(o.id);
      s && (s.position && !this._draggingNodeIds.has(o.id) && (o.position.x = s.position.x, o.position.y = s.position.y), s.data && (o.data = s.data));
    }
    e.forEach((n, o) => {
      t.has(o) || this.state.nodes.push(n);
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
class D {
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
    this._remoteStates.clear(), e.forEach((o, s) => {
      s !== t && o?.user && (n.push(o.user), this._remoteStates.set(s, o));
    }), this._users = n;
    for (const o of this._onChangeCallbacks) o();
  }
  // -- Lifecycle --
  destroy() {
    this.destroyed = !0, this.awareness.off("change", this.changeHandler), this.awareness.setLocalState(null), this._users = [], this._remoteStates.clear();
  }
}
const _ = "__alpineflow_collab_store__";
function F() {
  return typeof globalThis < "u" ? (globalThis[_] || (globalThis[_] = /* @__PURE__ */ new WeakMap()), globalThis[_]) : /* @__PURE__ */ new WeakMap();
}
const P = F(), S = "flow-collab-cursor", E = "http://www.w3.org/2000/svg", Y = "M0.5 0.5L15.5 11.5L8 12.5L5 21.5L0.5 0.5Z";
function z(i, e) {
  const t = document.createElement("div");
  t.className = S, t.dataset.clientId = i, t.style.position = "absolute", t.style.left = "0", t.style.top = "0", t.style.pointerEvents = "none", t.style.zIndex = "10000", t.style.transition = "transform 0.1s ease-out", t.style.willChange = "transform";
  const n = document.createElementNS(E, "svg");
  n.setAttribute("width", "16"), n.setAttribute("height", "22"), n.setAttribute("viewBox", "0 0 16 22"), n.setAttribute("fill", "none"), n.style.display = "block", n.style.filter = "drop-shadow(0 1px 2px rgba(0,0,0,0.3))";
  const o = document.createElementNS(E, "path");
  o.setAttribute("d", Y), o.setAttribute("fill", e.color), o.setAttribute("stroke", "white"), o.setAttribute("stroke-width", "1.5"), o.setAttribute("stroke-linejoin", "round"), o.classList.add("flow-collab-cursor-arrow"), n.appendChild(o), t.appendChild(n);
  const s = document.createElement("span");
  return s.className = "flow-collab-cursor-label", s.textContent = e.name, s.style.position = "absolute", s.style.left = "14px", s.style.top = "16px", s.style.background = e.color, s.style.color = "white", s.style.padding = "2px 8px", s.style.borderRadius = "4px", s.style.fontSize = "11px", s.style.fontWeight = "500", s.style.whiteSpace = "nowrap", s.style.lineHeight = "1.4", s.style.boxShadow = "0 1px 3px rgba(0,0,0,0.2)", t.appendChild(s), t;
}
function T(i, e) {
  const t = i.querySelector(".flow-collab-cursor-arrow");
  t && t.setAttribute("fill", e);
  const n = i.querySelector(".flow-collab-cursor-label");
  n && (n.style.background = e);
}
function q(i, e, t) {
  const n = /* @__PURE__ */ new Map();
  i.querySelectorAll(`.${S}`).forEach((s) => {
    n.set(s.dataset.clientId, s);
  });
  const o = /* @__PURE__ */ new Set();
  e.forEach((s, r) => {
    if (!s.cursor)
      return;
    const a = String(r);
    o.add(a);
    let l = n.get(a);
    l ? T(l, s.user.color) : (l = z(a, s.user), i.appendChild(l)), l.style.transform = `translate(${s.cursor.x}px, ${s.cursor.y}px)`;
  }), n.forEach((s, r) => {
    o.has(r) || s.remove();
  });
}
function W(i) {
  i.directive("flow-cursors", (e, {}, { cleanup: t }) => {
    const n = e.closest("[data-flow-canvas]");
    if (!n) return;
    const o = i.$data(n);
    let s = null, r = null, a = !1;
    function l() {
      const p = P.get(n);
      if (!p?.awareness) return !1;
      const v = p.awareness;
      function U() {
        const L = v.getRemoteStates();
        o.viewport?.zoom, q(e, L);
      }
      return U(), s = v.onChange(U), !0;
    }
    l() || (r = setInterval(() => {
      (a || l()) && (clearInterval(r), r = null);
    }, 50)), t(() => {
      a = !0, r && clearInterval(r), s && s(), e.querySelectorAll(`.${S}`).forEach((p) => p.remove());
    });
  });
}
let g = N, C = A, I = H;
function B(i) {
  g = i.applyUpdate, C = i.encodeStateAsUpdate, I = i.encodeStateVector;
}
function y(i) {
  let e = "";
  for (let t = 0; t < i.length; t++)
    e += String.fromCharCode(i[t]);
  return btoa(e);
}
function h(i) {
  const e = atob(i), t = new Uint8Array(e.length);
  for (let n = 0; n < e.length; n++)
    t[n] = e.charCodeAt(n);
  return t;
}
const u = "reverb-provider";
class G {
  constructor(e) {
    this.channel = null, this.doc = null, this.awareness = null, this.listeners = {}, this._connected = !1, this.updateHandler = null, this.awarenessHandler = null, this.roomId = e.roomId, this.channelPattern = e.channel, this.user = e.user, this.stateUrl = e.stateUrl;
  }
  get connected() {
    return this._connected;
  }
  connect(e, t) {
    this.doc = e, this.awareness = t;
    const n = this.channelPattern.replace("{roomId}", this.roomId), o = globalThis.Echo;
    if (!o) {
      console.warn("[alpineflow-collab] Laravel Echo not found. ReverbProvider requires Echo.");
      return;
    }
    if (this.channel = o.private(n), this.channel.listenForWhisper("yjs-update", (s) => {
      if (!this.doc) return;
      const r = h(s.data);
      console.log("[Reverb] yjs-update received, size:", r.length), g(this.doc, r, u);
    }), this.channel.listenForWhisper("yjs-sync-request", (s) => {
      if (!this.doc) return;
      const r = h(s.sv), a = C(this.doc, r);
      console.log("[Reverb] sync-request received, responding with update size:", a.length), a.length > 2 && this.channel?.whisper("yjs-sync-response", { data: y(a) });
    }), this.channel.listenForWhisper("yjs-sync-response", (s) => {
      if (!this.doc) return;
      const r = h(s.data);
      console.log("[Reverb] sync-response received, size:", r.length, "yNodes before:", this.doc.getMap("nodes").size), g(this.doc, r, u), console.log("[Reverb] sync-response applied, yNodes after:", this.doc.getMap("nodes").size);
    }), this.channel.listenForWhisper("yjs-awareness", (s) => {
      if (!this.awareness) return;
      const r = h(s.data);
      m(this.awareness, r, u);
    }), this.updateHandler = (s, r) => {
      r !== u && this.channel?.whisper("yjs-update", { data: y(s) });
    }, e.on("update", this.updateHandler), this.awarenessHandler = ({ added: s, updated: r }) => {
      const a = [...s, ...r];
      if (a.length === 0) return;
      const l = b(t, a);
      this.channel?.whisper("yjs-awareness", { data: y(l) });
    }, t.on("update", this.awarenessHandler), this._connected = !0, this.emit("status", "connected"), this.stateUrl)
      this.fetchInitialState();
    else {
      const s = I(e);
      console.log("[Reverb] sending sync-request, sv size:", s.length), this.channel.whisper("yjs-sync-request", { sv: y(s) }), setTimeout(() => {
        console.log("[Reverb] sync timeout fired, yNodes size:", this.doc?.getMap("nodes").size), this.emit("sync", !0);
      }, 500);
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
    this.doc && this.updateHandler && (this.doc.off("update", this.updateHandler), this.updateHandler = null), this.awareness && this.awarenessHandler && (this.awareness.off("update", this.awarenessHandler), this.awarenessHandler = null);
  }
  async fetchInitialState() {
    if (!(!this.stateUrl || !this.doc))
      try {
        const e = this.stateUrl.replace("{roomId}", this.roomId), t = await fetch(e);
        if (!t.ok) return;
        const n = await t.json();
        if (n.state && this.doc) {
          const o = h(n.state);
          g(this.doc, o, u);
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
    this.wsProvider = new x(this.url, this.roomId, e, {
      awareness: t
    }), this.wsProvider.on("status", (n) => {
      const o = n.status;
      this._connected = o === "connected", this.emit("status", o);
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
    if (c.applyUpdate(e.doc, t, "remote"), c.applyUpdate(this.doc, n, "remote"), this._docUpdateHandler = (o, s) => {
      s !== "remote" && c.applyUpdate(e.doc, o, "remote");
    }, this.doc.on("update", this._docUpdateHandler), this._peerDocUpdateHandler = (o, s) => {
      s !== "remote" && c.applyUpdate(this.doc, o, "remote");
    }, e.doc.on("update", this._peerDocUpdateHandler), this.awareness && e.awareness) {
      const o = this.awareness, s = e.awareness;
      this._awarenessUpdateHandler = (r) => {
        const a = [...r.added, ...r.updated];
        if (a.length === 0) return;
        const l = b(o, a);
        m(s, l, "remote");
      }, o.on("update", this._awarenessUpdateHandler), this._peerAwarenessUpdateHandler = (r) => {
        const a = [...r.added, ...r.updated];
        if (a.length === 0) return;
        const l = b(s, a);
        m(o, l, "remote");
      }, s.on("update", this._peerAwarenessUpdateHandler);
    }
    this._emit("sync", !0), e._emit("sync", !0);
  }
}
function Q(i, e) {
  i.peer = e, e.peer = i;
}
function X(i) {
  W(i), B({ applyUpdate: N, encodeStateAsUpdate: A, encodeStateVector: H }), k("collab", {
    Doc: j,
    Awareness: R,
    CollabBridge: M,
    CollabAwareness: D
  });
}
export {
  D as CollabAwareness,
  M as CollabBridge,
  Z as InMemoryProvider,
  G as ReverbProvider,
  K as WebSocketProvider,
  X as default,
  Q as linkProviders,
  W as registerFlowCursorsDirective
};
//# sourceMappingURL=alpineflow-collab.esm.js.map
