let Xo = null;
function Ja(t) {
  Xo = t;
}
function Ce() {
  if (!Xo)
    throw new Error("[AlpineFlow] Alpine not initialized. Ensure Alpine.plugin(AlpineFlow) was called.");
  return Xo;
}
var Qa = { value: () => {
} };
function wo() {
  for (var t = 0, e = arguments.length, n = {}, o; t < e; ++t) {
    if (!(o = arguments[t] + "") || o in n || /[\s.]/.test(o)) throw new Error("illegal type: " + o);
    n[o] = [];
  }
  return new Yn(n);
}
function Yn(t) {
  this._ = t;
}
function el(t, e) {
  return t.trim().split(/^|\s+/).map(function(n) {
    var o = "", i = n.indexOf(".");
    if (i >= 0 && (o = n.slice(i + 1), n = n.slice(0, i)), n && !e.hasOwnProperty(n)) throw new Error("unknown type: " + n);
    return { type: n, name: o };
  });
}
Yn.prototype = wo.prototype = {
  constructor: Yn,
  on: function(t, e) {
    var n = this._, o = el(t + "", n), i, r = -1, s = o.length;
    if (arguments.length < 2) {
      for (; ++r < s; ) if ((i = (t = o[r]).type) && (i = tl(n[i], t.name))) return i;
      return;
    }
    if (e != null && typeof e != "function") throw new Error("invalid callback: " + e);
    for (; ++r < s; )
      if (i = (t = o[r]).type) n[i] = zi(n[i], t.name, e);
      else if (e == null) for (i in n) n[i] = zi(n[i], t.name, null);
    return this;
  },
  copy: function() {
    var t = {}, e = this._;
    for (var n in e) t[n] = e[n].slice();
    return new Yn(t);
  },
  call: function(t, e) {
    if ((i = arguments.length - 2) > 0) for (var n = new Array(i), o = 0, i, r; o < i; ++o) n[o] = arguments[o + 2];
    if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    for (r = this._[t], o = 0, i = r.length; o < i; ++o) r[o].value.apply(e, n);
  },
  apply: function(t, e, n) {
    if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    for (var o = this._[t], i = 0, r = o.length; i < r; ++i) o[i].value.apply(e, n);
  }
};
function tl(t, e) {
  for (var n = 0, o = t.length, i; n < o; ++n)
    if ((i = t[n]).name === e)
      return i.value;
}
function zi(t, e, n) {
  for (var o = 0, i = t.length; o < i; ++o)
    if (t[o].name === e) {
      t[o] = Qa, t = t.slice(0, o).concat(t.slice(o + 1));
      break;
    }
  return n != null && t.push({ name: e, value: n }), t;
}
var Wo = "http://www.w3.org/1999/xhtml";
const Vi = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Wo,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function vo(t) {
  var e = t += "", n = e.indexOf(":");
  return n >= 0 && (e = t.slice(0, n)) !== "xmlns" && (t = t.slice(n + 1)), Vi.hasOwnProperty(e) ? { space: Vi[e], local: t } : t;
}
function nl(t) {
  return function() {
    var e = this.ownerDocument, n = this.namespaceURI;
    return n === Wo && e.documentElement.namespaceURI === Wo ? e.createElement(t) : e.createElementNS(n, t);
  };
}
function ol(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function vr(t) {
  var e = vo(t);
  return (e.local ? ol : nl)(e);
}
function il() {
}
function gi(t) {
  return t == null ? il : function() {
    return this.querySelector(t);
  };
}
function sl(t) {
  typeof t != "function" && (t = gi(t));
  for (var e = this._groups, n = e.length, o = new Array(n), i = 0; i < n; ++i)
    for (var r = e[i], s = r.length, a = o[i] = new Array(s), l, c, d = 0; d < s; ++d)
      (l = r[d]) && (c = t.call(l, l.__data__, d, r)) && ("__data__" in l && (c.__data__ = l.__data__), a[d] = c);
  return new Oe(o, this._parents);
}
function rl(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function al() {
  return [];
}
function _r(t) {
  return t == null ? al : function() {
    return this.querySelectorAll(t);
  };
}
function ll(t) {
  return function() {
    return rl(t.apply(this, arguments));
  };
}
function cl(t) {
  typeof t == "function" ? t = ll(t) : t = _r(t);
  for (var e = this._groups, n = e.length, o = [], i = [], r = 0; r < n; ++r)
    for (var s = e[r], a = s.length, l, c = 0; c < a; ++c)
      (l = s[c]) && (o.push(t.call(l, l.__data__, c, s)), i.push(l));
  return new Oe(o, i);
}
function br(t) {
  return function() {
    return this.matches(t);
  };
}
function xr(t) {
  return function(e) {
    return e.matches(t);
  };
}
var dl = Array.prototype.find;
function ul(t) {
  return function() {
    return dl.call(this.children, t);
  };
}
function fl() {
  return this.firstElementChild;
}
function hl(t) {
  return this.select(t == null ? fl : ul(typeof t == "function" ? t : xr(t)));
}
var gl = Array.prototype.filter;
function pl() {
  return Array.from(this.children);
}
function ml(t) {
  return function() {
    return gl.call(this.children, t);
  };
}
function yl(t) {
  return this.selectAll(t == null ? pl : ml(typeof t == "function" ? t : xr(t)));
}
function wl(t) {
  typeof t != "function" && (t = br(t));
  for (var e = this._groups, n = e.length, o = new Array(n), i = 0; i < n; ++i)
    for (var r = e[i], s = r.length, a = o[i] = [], l, c = 0; c < s; ++c)
      (l = r[c]) && t.call(l, l.__data__, c, r) && a.push(l);
  return new Oe(o, this._parents);
}
function Er(t) {
  return new Array(t.length);
}
function vl() {
  return new Oe(this._enter || this._groups.map(Er), this._parents);
}
function Gn(t, e) {
  this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = e;
}
Gn.prototype = {
  constructor: Gn,
  appendChild: function(t) {
    return this._parent.insertBefore(t, this._next);
  },
  insertBefore: function(t, e) {
    return this._parent.insertBefore(t, e);
  },
  querySelector: function(t) {
    return this._parent.querySelector(t);
  },
  querySelectorAll: function(t) {
    return this._parent.querySelectorAll(t);
  }
};
function _l(t) {
  return function() {
    return t;
  };
}
function bl(t, e, n, o, i, r) {
  for (var s = 0, a, l = e.length, c = r.length; s < c; ++s)
    (a = e[s]) ? (a.__data__ = r[s], o[s] = a) : n[s] = new Gn(t, r[s]);
  for (; s < l; ++s)
    (a = e[s]) && (i[s] = a);
}
function xl(t, e, n, o, i, r, s) {
  var a, l, c = /* @__PURE__ */ new Map(), d = e.length, f = r.length, u = new Array(d), h;
  for (a = 0; a < d; ++a)
    (l = e[a]) && (u[a] = h = s.call(l, l.__data__, a, e) + "", c.has(h) ? i[a] = l : c.set(h, l));
  for (a = 0; a < f; ++a)
    h = s.call(t, r[a], a, r) + "", (l = c.get(h)) ? (o[a] = l, l.__data__ = r[a], c.delete(h)) : n[a] = new Gn(t, r[a]);
  for (a = 0; a < d; ++a)
    (l = e[a]) && c.get(u[a]) === l && (i[a] = l);
}
function El(t) {
  return t.__data__;
}
function Cl(t, e) {
  if (!arguments.length) return Array.from(this, El);
  var n = e ? xl : bl, o = this._parents, i = this._groups;
  typeof t != "function" && (t = _l(t));
  for (var r = i.length, s = new Array(r), a = new Array(r), l = new Array(r), c = 0; c < r; ++c) {
    var d = o[c], f = i[c], u = f.length, h = Sl(t.call(d, d && d.__data__, c, o)), p = h.length, g = a[c] = new Array(p), m = s[c] = new Array(p), y = l[c] = new Array(u);
    n(d, f, g, m, y, h, e);
    for (var x = 0, C = 0, b, E; x < p; ++x)
      if (b = g[x]) {
        for (x >= C && (C = x + 1); !(E = m[C]) && ++C < p; ) ;
        b._next = E || null;
      }
  }
  return s = new Oe(s, o), s._enter = a, s._exit = l, s;
}
function Sl(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function kl() {
  return new Oe(this._exit || this._groups.map(Er), this._parents);
}
function Ll(t, e, n) {
  var o = this.enter(), i = this, r = this.exit();
  return typeof t == "function" ? (o = t(o), o && (o = o.selection())) : o = o.append(t + ""), e != null && (i = e(i), i && (i = i.selection())), n == null ? r.remove() : n(r), o && i ? o.merge(i).order() : i;
}
function Ml(t) {
  for (var e = t.selection ? t.selection() : t, n = this._groups, o = e._groups, i = n.length, r = o.length, s = Math.min(i, r), a = new Array(i), l = 0; l < s; ++l)
    for (var c = n[l], d = o[l], f = c.length, u = a[l] = new Array(f), h, p = 0; p < f; ++p)
      (h = c[p] || d[p]) && (u[p] = h);
  for (; l < i; ++l)
    a[l] = n[l];
  return new Oe(a, this._parents);
}
function Pl() {
  for (var t = this._groups, e = -1, n = t.length; ++e < n; )
    for (var o = t[e], i = o.length - 1, r = o[i], s; --i >= 0; )
      (s = o[i]) && (r && s.compareDocumentPosition(r) ^ 4 && r.parentNode.insertBefore(s, r), r = s);
  return this;
}
function Nl(t) {
  t || (t = Tl);
  function e(f, u) {
    return f && u ? t(f.__data__, u.__data__) : !f - !u;
  }
  for (var n = this._groups, o = n.length, i = new Array(o), r = 0; r < o; ++r) {
    for (var s = n[r], a = s.length, l = i[r] = new Array(a), c, d = 0; d < a; ++d)
      (c = s[d]) && (l[d] = c);
    l.sort(e);
  }
  return new Oe(i, this._parents).order();
}
function Tl(t, e) {
  return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function Al() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function $l() {
  return Array.from(this);
}
function Il() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var o = t[e], i = 0, r = o.length; i < r; ++i) {
      var s = o[i];
      if (s) return s;
    }
  return null;
}
function Dl() {
  let t = 0;
  for (const e of this) ++t;
  return t;
}
function Rl() {
  return !this.node();
}
function Hl(t) {
  for (var e = this._groups, n = 0, o = e.length; n < o; ++n)
    for (var i = e[n], r = 0, s = i.length, a; r < s; ++r)
      (a = i[r]) && t.call(a, a.__data__, r, i);
  return this;
}
function Fl(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function Ol(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function zl(t, e) {
  return function() {
    this.setAttribute(t, e);
  };
}
function Vl(t, e) {
  return function() {
    this.setAttributeNS(t.space, t.local, e);
  };
}
function Bl(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttribute(t) : this.setAttribute(t, n);
  };
}
function ql(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, n);
  };
}
function Yl(t, e) {
  var n = vo(t);
  if (arguments.length < 2) {
    var o = this.node();
    return n.local ? o.getAttributeNS(n.space, n.local) : o.getAttribute(n);
  }
  return this.each((e == null ? n.local ? Ol : Fl : typeof e == "function" ? n.local ? ql : Bl : n.local ? Vl : zl)(n, e));
}
function Cr(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function Xl(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function Wl(t, e, n) {
  return function() {
    this.style.setProperty(t, e, n);
  };
}
function jl(t, e, n) {
  return function() {
    var o = e.apply(this, arguments);
    o == null ? this.style.removeProperty(t) : this.style.setProperty(t, o, n);
  };
}
function Ul(t, e, n) {
  return arguments.length > 1 ? this.each((e == null ? Xl : typeof e == "function" ? jl : Wl)(t, e, n ?? "")) : Wt(this.node(), t);
}
function Wt(t, e) {
  return t.style.getPropertyValue(e) || Cr(t).getComputedStyle(t, null).getPropertyValue(e);
}
function Gl(t) {
  return function() {
    delete this[t];
  };
}
function Zl(t, e) {
  return function() {
    this[t] = e;
  };
}
function Kl(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? delete this[t] : this[t] = n;
  };
}
function Jl(t, e) {
  return arguments.length > 1 ? this.each((e == null ? Gl : typeof e == "function" ? Kl : Zl)(t, e)) : this.node()[t];
}
function Sr(t) {
  return t.trim().split(/^|\s+/);
}
function pi(t) {
  return t.classList || new kr(t);
}
function kr(t) {
  this._node = t, this._names = Sr(t.getAttribute("class") || "");
}
kr.prototype = {
  add: function(t) {
    var e = this._names.indexOf(t);
    e < 0 && (this._names.push(t), this._node.setAttribute("class", this._names.join(" ")));
  },
  remove: function(t) {
    var e = this._names.indexOf(t);
    e >= 0 && (this._names.splice(e, 1), this._node.setAttribute("class", this._names.join(" ")));
  },
  contains: function(t) {
    return this._names.indexOf(t) >= 0;
  }
};
function Lr(t, e) {
  for (var n = pi(t), o = -1, i = e.length; ++o < i; ) n.add(e[o]);
}
function Mr(t, e) {
  for (var n = pi(t), o = -1, i = e.length; ++o < i; ) n.remove(e[o]);
}
function Ql(t) {
  return function() {
    Lr(this, t);
  };
}
function ec(t) {
  return function() {
    Mr(this, t);
  };
}
function tc(t, e) {
  return function() {
    (e.apply(this, arguments) ? Lr : Mr)(this, t);
  };
}
function nc(t, e) {
  var n = Sr(t + "");
  if (arguments.length < 2) {
    for (var o = pi(this.node()), i = -1, r = n.length; ++i < r; ) if (!o.contains(n[i])) return !1;
    return !0;
  }
  return this.each((typeof e == "function" ? tc : e ? Ql : ec)(n, e));
}
function oc() {
  this.textContent = "";
}
function ic(t) {
  return function() {
    this.textContent = t;
  };
}
function sc(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.textContent = e ?? "";
  };
}
function rc(t) {
  return arguments.length ? this.each(t == null ? oc : (typeof t == "function" ? sc : ic)(t)) : this.node().textContent;
}
function ac() {
  this.innerHTML = "";
}
function lc(t) {
  return function() {
    this.innerHTML = t;
  };
}
function cc(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.innerHTML = e ?? "";
  };
}
function dc(t) {
  return arguments.length ? this.each(t == null ? ac : (typeof t == "function" ? cc : lc)(t)) : this.node().innerHTML;
}
function uc() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function fc() {
  return this.each(uc);
}
function hc() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function gc() {
  return this.each(hc);
}
function pc(t) {
  var e = typeof t == "function" ? t : vr(t);
  return this.select(function() {
    return this.appendChild(e.apply(this, arguments));
  });
}
function mc() {
  return null;
}
function yc(t, e) {
  var n = typeof t == "function" ? t : vr(t), o = e == null ? mc : typeof e == "function" ? e : gi(e);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), o.apply(this, arguments) || null);
  });
}
function wc() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function vc() {
  return this.each(wc);
}
function _c() {
  var t = this.cloneNode(!1), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function bc() {
  var t = this.cloneNode(!0), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function xc(t) {
  return this.select(t ? bc : _c);
}
function Ec(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function Cc(t) {
  return function(e) {
    t.call(this, e, this.__data__);
  };
}
function Sc(t) {
  return t.trim().split(/^|\s+/).map(function(e) {
    var n = "", o = e.indexOf(".");
    return o >= 0 && (n = e.slice(o + 1), e = e.slice(0, o)), { type: e, name: n };
  });
}
function kc(t) {
  return function() {
    var e = this.__on;
    if (e) {
      for (var n = 0, o = -1, i = e.length, r; n < i; ++n)
        r = e[n], (!t.type || r.type === t.type) && r.name === t.name ? this.removeEventListener(r.type, r.listener, r.options) : e[++o] = r;
      ++o ? e.length = o : delete this.__on;
    }
  };
}
function Lc(t, e, n) {
  return function() {
    var o = this.__on, i, r = Cc(e);
    if (o) {
      for (var s = 0, a = o.length; s < a; ++s)
        if ((i = o[s]).type === t.type && i.name === t.name) {
          this.removeEventListener(i.type, i.listener, i.options), this.addEventListener(i.type, i.listener = r, i.options = n), i.value = e;
          return;
        }
    }
    this.addEventListener(t.type, r, n), i = { type: t.type, name: t.name, value: e, listener: r, options: n }, o ? o.push(i) : this.__on = [i];
  };
}
function Mc(t, e, n) {
  var o = Sc(t + ""), i, r = o.length, s;
  if (arguments.length < 2) {
    var a = this.node().__on;
    if (a) {
      for (var l = 0, c = a.length, d; l < c; ++l)
        for (i = 0, d = a[l]; i < r; ++i)
          if ((s = o[i]).type === d.type && s.name === d.name)
            return d.value;
    }
    return;
  }
  for (a = e ? Lc : kc, i = 0; i < r; ++i) this.each(a(o[i], e, n));
  return this;
}
function Pr(t, e, n) {
  var o = Cr(t), i = o.CustomEvent;
  typeof i == "function" ? i = new i(e, n) : (i = o.document.createEvent("Event"), n ? (i.initEvent(e, n.bubbles, n.cancelable), i.detail = n.detail) : i.initEvent(e, !1, !1)), t.dispatchEvent(i);
}
function Pc(t, e) {
  return function() {
    return Pr(this, t, e);
  };
}
function Nc(t, e) {
  return function() {
    return Pr(this, t, e.apply(this, arguments));
  };
}
function Tc(t, e) {
  return this.each((typeof e == "function" ? Nc : Pc)(t, e));
}
function* Ac() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var o = t[e], i = 0, r = o.length, s; i < r; ++i)
      (s = o[i]) && (yield s);
}
var Nr = [null];
function Oe(t, e) {
  this._groups = t, this._parents = e;
}
function Ln() {
  return new Oe([[document.documentElement]], Nr);
}
function $c() {
  return this;
}
Oe.prototype = Ln.prototype = {
  constructor: Oe,
  select: sl,
  selectAll: cl,
  selectChild: hl,
  selectChildren: yl,
  filter: wl,
  data: Cl,
  enter: vl,
  exit: kl,
  join: Ll,
  merge: Ml,
  selection: $c,
  order: Pl,
  sort: Nl,
  call: Al,
  nodes: $l,
  node: Il,
  size: Dl,
  empty: Rl,
  each: Hl,
  attr: Yl,
  style: Ul,
  property: Jl,
  classed: nc,
  text: rc,
  html: dc,
  raise: fc,
  lower: gc,
  append: pc,
  insert: yc,
  remove: vc,
  clone: xc,
  datum: Ec,
  on: Mc,
  dispatch: Tc,
  [Symbol.iterator]: Ac
};
function We(t) {
  return typeof t == "string" ? new Oe([[document.querySelector(t)]], [document.documentElement]) : new Oe([[t]], Nr);
}
function Ic(t) {
  let e;
  for (; e = t.sourceEvent; ) t = e;
  return t;
}
function nt(t, e) {
  if (t = Ic(t), e === void 0 && (e = t.currentTarget), e) {
    var n = e.ownerSVGElement || e;
    if (n.createSVGPoint) {
      var o = n.createSVGPoint();
      return o.x = t.clientX, o.y = t.clientY, o = o.matrixTransform(e.getScreenCTM().inverse()), [o.x, o.y];
    }
    if (e.getBoundingClientRect) {
      var i = e.getBoundingClientRect();
      return [t.clientX - i.left - e.clientLeft, t.clientY - i.top - e.clientTop];
    }
  }
  return [t.pageX, t.pageY];
}
const Dc = { passive: !1 }, yn = { capture: !0, passive: !1 };
function Mo(t) {
  t.stopImmediatePropagation();
}
function Bt(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function Tr(t) {
  var e = t.document.documentElement, n = We(t).on("dragstart.drag", Bt, yn);
  "onselectstart" in e ? n.on("selectstart.drag", Bt, yn) : (e.__noselect = e.style.MozUserSelect, e.style.MozUserSelect = "none");
}
function Ar(t, e) {
  var n = t.document.documentElement, o = We(t).on("dragstart.drag", null);
  e && (o.on("click.drag", Bt, yn), setTimeout(function() {
    o.on("click.drag", null);
  }, 0)), "onselectstart" in n ? o.on("selectstart.drag", null) : (n.style.MozUserSelect = n.__noselect, delete n.__noselect);
}
const $n = (t) => () => t;
function jo(t, {
  sourceEvent: e,
  subject: n,
  target: o,
  identifier: i,
  active: r,
  x: s,
  y: a,
  dx: l,
  dy: c,
  dispatch: d
}) {
  Object.defineProperties(this, {
    type: { value: t, enumerable: !0, configurable: !0 },
    sourceEvent: { value: e, enumerable: !0, configurable: !0 },
    subject: { value: n, enumerable: !0, configurable: !0 },
    target: { value: o, enumerable: !0, configurable: !0 },
    identifier: { value: i, enumerable: !0, configurable: !0 },
    active: { value: r, enumerable: !0, configurable: !0 },
    x: { value: s, enumerable: !0, configurable: !0 },
    y: { value: a, enumerable: !0, configurable: !0 },
    dx: { value: l, enumerable: !0, configurable: !0 },
    dy: { value: c, enumerable: !0, configurable: !0 },
    _: { value: d }
  });
}
jo.prototype.on = function() {
  var t = this._.on.apply(this._, arguments);
  return t === this._ ? this : t;
};
function Rc(t) {
  return !t.ctrlKey && !t.button;
}
function Hc() {
  return this.parentNode;
}
function Fc(t, e) {
  return e ?? { x: t.x, y: t.y };
}
function Oc() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function zc() {
  var t = Rc, e = Hc, n = Fc, o = Oc, i = {}, r = wo("start", "drag", "end"), s = 0, a, l, c, d, f = 0;
  function u(b) {
    b.on("mousedown.drag", h).filter(o).on("touchstart.drag", m).on("touchmove.drag", y, Dc).on("touchend.drag touchcancel.drag", x).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function h(b, E) {
    if (!(d || !t.call(this, b, E))) {
      var _ = C(this, e.call(this, b, E), b, E, "mouse");
      _ && (We(b.view).on("mousemove.drag", p, yn).on("mouseup.drag", g, yn), Tr(b.view), Mo(b), c = !1, a = b.clientX, l = b.clientY, _("start", b));
    }
  }
  function p(b) {
    if (Bt(b), !c) {
      var E = b.clientX - a, _ = b.clientY - l;
      c = E * E + _ * _ > f;
    }
    i.mouse("drag", b);
  }
  function g(b) {
    We(b.view).on("mousemove.drag mouseup.drag", null), Ar(b.view, c), Bt(b), i.mouse("end", b);
  }
  function m(b, E) {
    if (t.call(this, b, E)) {
      var _ = b.changedTouches, S = e.call(this, b, E), N = _.length, R, M;
      for (R = 0; R < N; ++R)
        (M = C(this, S, b, E, _[R].identifier, _[R])) && (Mo(b), M("start", b, _[R]));
    }
  }
  function y(b) {
    var E = b.changedTouches, _ = E.length, S, N;
    for (S = 0; S < _; ++S)
      (N = i[E[S].identifier]) && (Bt(b), N("drag", b, E[S]));
  }
  function x(b) {
    var E = b.changedTouches, _ = E.length, S, N;
    for (d && clearTimeout(d), d = setTimeout(function() {
      d = null;
    }, 500), S = 0; S < _; ++S)
      (N = i[E[S].identifier]) && (Mo(b), N("end", b, E[S]));
  }
  function C(b, E, _, S, N, R) {
    var M = r.copy(), T = nt(R || _, E), P, w, v;
    if ((v = n.call(b, new jo("beforestart", {
      sourceEvent: _,
      target: u,
      identifier: N,
      active: s,
      x: T[0],
      y: T[1],
      dx: 0,
      dy: 0,
      dispatch: M
    }), S)) != null)
      return P = v.x - T[0] || 0, w = v.y - T[1] || 0, function $(L, D, z) {
        var V = T, I;
        switch (L) {
          case "start":
            i[N] = $, I = s++;
            break;
          case "end":
            delete i[N], --s;
          // falls through
          case "drag":
            T = nt(z || D, E), I = s;
            break;
        }
        M.call(
          L,
          b,
          new jo(L, {
            sourceEvent: D,
            subject: v,
            target: u,
            identifier: N,
            active: I,
            x: T[0] + P,
            y: T[1] + w,
            dx: T[0] - V[0],
            dy: T[1] - V[1],
            dispatch: M
          }),
          S
        );
      };
  }
  return u.filter = function(b) {
    return arguments.length ? (t = typeof b == "function" ? b : $n(!!b), u) : t;
  }, u.container = function(b) {
    return arguments.length ? (e = typeof b == "function" ? b : $n(b), u) : e;
  }, u.subject = function(b) {
    return arguments.length ? (n = typeof b == "function" ? b : $n(b), u) : n;
  }, u.touchable = function(b) {
    return arguments.length ? (o = typeof b == "function" ? b : $n(!!b), u) : o;
  }, u.on = function() {
    var b = r.on.apply(r, arguments);
    return b === r ? u : b;
  }, u.clickDistance = function(b) {
    return arguments.length ? (f = (b = +b) * b, u) : Math.sqrt(f);
  }, u;
}
function mi(t, e, n) {
  t.prototype = e.prototype = n, n.constructor = t;
}
function $r(t, e) {
  var n = Object.create(t.prototype);
  for (var o in e) n[o] = e[o];
  return n;
}
function Mn() {
}
var wn = 0.7, Zn = 1 / wn, qt = "\\s*([+-]?\\d+)\\s*", vn = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Qe = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", Vc = /^#([0-9a-f]{3,8})$/, Bc = new RegExp(`^rgb\\(${qt},${qt},${qt}\\)$`), qc = new RegExp(`^rgb\\(${Qe},${Qe},${Qe}\\)$`), Yc = new RegExp(`^rgba\\(${qt},${qt},${qt},${vn}\\)$`), Xc = new RegExp(`^rgba\\(${Qe},${Qe},${Qe},${vn}\\)$`), Wc = new RegExp(`^hsl\\(${vn},${Qe},${Qe}\\)$`), jc = new RegExp(`^hsla\\(${vn},${Qe},${Qe},${vn}\\)$`), Bi = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
mi(Mn, _n, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: qi,
  // Deprecated! Use color.formatHex.
  formatHex: qi,
  formatHex8: Uc,
  formatHsl: Gc,
  formatRgb: Yi,
  toString: Yi
});
function qi() {
  return this.rgb().formatHex();
}
function Uc() {
  return this.rgb().formatHex8();
}
function Gc() {
  return Ir(this).formatHsl();
}
function Yi() {
  return this.rgb().formatRgb();
}
function _n(t) {
  var e, n;
  return t = (t + "").trim().toLowerCase(), (e = Vc.exec(t)) ? (n = e[1].length, e = parseInt(e[1], 16), n === 6 ? Xi(e) : n === 3 ? new Ae(e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, (e & 15) << 4 | e & 15, 1) : n === 8 ? In(e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, (e & 255) / 255) : n === 4 ? In(e >> 12 & 15 | e >> 8 & 240, e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, ((e & 15) << 4 | e & 15) / 255) : null) : (e = Bc.exec(t)) ? new Ae(e[1], e[2], e[3], 1) : (e = qc.exec(t)) ? new Ae(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, 1) : (e = Yc.exec(t)) ? In(e[1], e[2], e[3], e[4]) : (e = Xc.exec(t)) ? In(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, e[4]) : (e = Wc.exec(t)) ? Ui(e[1], e[2] / 100, e[3] / 100, 1) : (e = jc.exec(t)) ? Ui(e[1], e[2] / 100, e[3] / 100, e[4]) : Bi.hasOwnProperty(t) ? Xi(Bi[t]) : t === "transparent" ? new Ae(NaN, NaN, NaN, 0) : null;
}
function Xi(t) {
  return new Ae(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function In(t, e, n, o) {
  return o <= 0 && (t = e = n = NaN), new Ae(t, e, n, o);
}
function Zc(t) {
  return t instanceof Mn || (t = _n(t)), t ? (t = t.rgb(), new Ae(t.r, t.g, t.b, t.opacity)) : new Ae();
}
function Uo(t, e, n, o) {
  return arguments.length === 1 ? Zc(t) : new Ae(t, e, n, o ?? 1);
}
function Ae(t, e, n, o) {
  this.r = +t, this.g = +e, this.b = +n, this.opacity = +o;
}
mi(Ae, Uo, $r(Mn, {
  brighter(t) {
    return t = t == null ? Zn : Math.pow(Zn, t), new Ae(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? wn : Math.pow(wn, t), new Ae(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Ae(Pt(this.r), Pt(this.g), Pt(this.b), Kn(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Wi,
  // Deprecated! Use color.formatHex.
  formatHex: Wi,
  formatHex8: Kc,
  formatRgb: ji,
  toString: ji
}));
function Wi() {
  return `#${Mt(this.r)}${Mt(this.g)}${Mt(this.b)}`;
}
function Kc() {
  return `#${Mt(this.r)}${Mt(this.g)}${Mt(this.b)}${Mt((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function ji() {
  const t = Kn(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${Pt(this.r)}, ${Pt(this.g)}, ${Pt(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function Kn(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function Pt(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function Mt(t) {
  return t = Pt(t), (t < 16 ? "0" : "") + t.toString(16);
}
function Ui(t, e, n, o) {
  return o <= 0 ? t = e = n = NaN : n <= 0 || n >= 1 ? t = e = NaN : e <= 0 && (t = NaN), new je(t, e, n, o);
}
function Ir(t) {
  if (t instanceof je) return new je(t.h, t.s, t.l, t.opacity);
  if (t instanceof Mn || (t = _n(t)), !t) return new je();
  if (t instanceof je) return t;
  t = t.rgb();
  var e = t.r / 255, n = t.g / 255, o = t.b / 255, i = Math.min(e, n, o), r = Math.max(e, n, o), s = NaN, a = r - i, l = (r + i) / 2;
  return a ? (e === r ? s = (n - o) / a + (n < o) * 6 : n === r ? s = (o - e) / a + 2 : s = (e - n) / a + 4, a /= l < 0.5 ? r + i : 2 - r - i, s *= 60) : a = l > 0 && l < 1 ? 0 : s, new je(s, a, l, t.opacity);
}
function Jc(t, e, n, o) {
  return arguments.length === 1 ? Ir(t) : new je(t, e, n, o ?? 1);
}
function je(t, e, n, o) {
  this.h = +t, this.s = +e, this.l = +n, this.opacity = +o;
}
mi(je, Jc, $r(Mn, {
  brighter(t) {
    return t = t == null ? Zn : Math.pow(Zn, t), new je(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? wn : Math.pow(wn, t), new je(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, e = isNaN(t) || isNaN(this.s) ? 0 : this.s, n = this.l, o = n + (n < 0.5 ? n : 1 - n) * e, i = 2 * n - o;
    return new Ae(
      Po(t >= 240 ? t - 240 : t + 120, i, o),
      Po(t, i, o),
      Po(t < 120 ? t + 240 : t - 120, i, o),
      this.opacity
    );
  },
  clamp() {
    return new je(Gi(this.h), Dn(this.s), Dn(this.l), Kn(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = Kn(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${Gi(this.h)}, ${Dn(this.s) * 100}%, ${Dn(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function Gi(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function Dn(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function Po(t, e, n) {
  return (t < 60 ? e + (n - e) * t / 60 : t < 180 ? n : t < 240 ? e + (n - e) * (240 - t) / 60 : e) * 255;
}
const Dr = (t) => () => t;
function Qc(t, e) {
  return function(n) {
    return t + n * e;
  };
}
function ed(t, e, n) {
  return t = Math.pow(t, n), e = Math.pow(e, n) - t, n = 1 / n, function(o) {
    return Math.pow(t + o * e, n);
  };
}
function td(t) {
  return (t = +t) == 1 ? Rr : function(e, n) {
    return n - e ? ed(e, n, t) : Dr(isNaN(e) ? n : e);
  };
}
function Rr(t, e) {
  var n = e - t;
  return n ? Qc(t, n) : Dr(isNaN(t) ? e : t);
}
const Go = (function t(e) {
  var n = td(e);
  function o(i, r) {
    var s = n((i = Uo(i)).r, (r = Uo(r)).r), a = n(i.g, r.g), l = n(i.b, r.b), c = Rr(i.opacity, r.opacity);
    return function(d) {
      return i.r = s(d), i.g = a(d), i.b = l(d), i.opacity = c(d), i + "";
    };
  }
  return o.gamma = t, o;
})(1);
function gt(t, e) {
  return t = +t, e = +e, function(n) {
    return t * (1 - n) + e * n;
  };
}
var Zo = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, No = new RegExp(Zo.source, "g");
function nd(t) {
  return function() {
    return t;
  };
}
function od(t) {
  return function(e) {
    return t(e) + "";
  };
}
function id(t, e) {
  var n = Zo.lastIndex = No.lastIndex = 0, o, i, r, s = -1, a = [], l = [];
  for (t = t + "", e = e + ""; (o = Zo.exec(t)) && (i = No.exec(e)); )
    (r = i.index) > n && (r = e.slice(n, r), a[s] ? a[s] += r : a[++s] = r), (o = o[0]) === (i = i[0]) ? a[s] ? a[s] += i : a[++s] = i : (a[++s] = null, l.push({ i: s, x: gt(o, i) })), n = No.lastIndex;
  return n < e.length && (r = e.slice(n), a[s] ? a[s] += r : a[++s] = r), a.length < 2 ? l[0] ? od(l[0].x) : nd(e) : (e = l.length, function(c) {
    for (var d = 0, f; d < e; ++d) a[(f = l[d]).i] = f.x(c);
    return a.join("");
  });
}
var Zi = 180 / Math.PI, Ko = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function Hr(t, e, n, o, i, r) {
  var s, a, l;
  return (s = Math.sqrt(t * t + e * e)) && (t /= s, e /= s), (l = t * n + e * o) && (n -= t * l, o -= e * l), (a = Math.sqrt(n * n + o * o)) && (n /= a, o /= a, l /= a), t * o < e * n && (t = -t, e = -e, l = -l, s = -s), {
    translateX: i,
    translateY: r,
    rotate: Math.atan2(e, t) * Zi,
    skewX: Math.atan(l) * Zi,
    scaleX: s,
    scaleY: a
  };
}
var Rn;
function sd(t) {
  const e = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return e.isIdentity ? Ko : Hr(e.a, e.b, e.c, e.d, e.e, e.f);
}
function rd(t) {
  return t == null || (Rn || (Rn = document.createElementNS("http://www.w3.org/2000/svg", "g")), Rn.setAttribute("transform", t), !(t = Rn.transform.baseVal.consolidate())) ? Ko : (t = t.matrix, Hr(t.a, t.b, t.c, t.d, t.e, t.f));
}
function Fr(t, e, n, o) {
  function i(c) {
    return c.length ? c.pop() + " " : "";
  }
  function r(c, d, f, u, h, p) {
    if (c !== f || d !== u) {
      var g = h.push("translate(", null, e, null, n);
      p.push({ i: g - 4, x: gt(c, f) }, { i: g - 2, x: gt(d, u) });
    } else (f || u) && h.push("translate(" + f + e + u + n);
  }
  function s(c, d, f, u) {
    c !== d ? (c - d > 180 ? d += 360 : d - c > 180 && (c += 360), u.push({ i: f.push(i(f) + "rotate(", null, o) - 2, x: gt(c, d) })) : d && f.push(i(f) + "rotate(" + d + o);
  }
  function a(c, d, f, u) {
    c !== d ? u.push({ i: f.push(i(f) + "skewX(", null, o) - 2, x: gt(c, d) }) : d && f.push(i(f) + "skewX(" + d + o);
  }
  function l(c, d, f, u, h, p) {
    if (c !== f || d !== u) {
      var g = h.push(i(h) + "scale(", null, ",", null, ")");
      p.push({ i: g - 4, x: gt(c, f) }, { i: g - 2, x: gt(d, u) });
    } else (f !== 1 || u !== 1) && h.push(i(h) + "scale(" + f + "," + u + ")");
  }
  return function(c, d) {
    var f = [], u = [];
    return c = t(c), d = t(d), r(c.translateX, c.translateY, d.translateX, d.translateY, f, u), s(c.rotate, d.rotate, f, u), a(c.skewX, d.skewX, f, u), l(c.scaleX, c.scaleY, d.scaleX, d.scaleY, f, u), c = d = null, function(h) {
      for (var p = -1, g = u.length, m; ++p < g; ) f[(m = u[p]).i] = m.x(h);
      return f.join("");
    };
  };
}
var ad = Fr(sd, "px, ", "px)", "deg)"), ld = Fr(rd, ", ", ")", ")"), cd = 1e-12;
function Ki(t) {
  return ((t = Math.exp(t)) + 1 / t) / 2;
}
function dd(t) {
  return ((t = Math.exp(t)) - 1 / t) / 2;
}
function ud(t) {
  return ((t = Math.exp(2 * t)) - 1) / (t + 1);
}
const fd = (function t(e, n, o) {
  function i(r, s) {
    var a = r[0], l = r[1], c = r[2], d = s[0], f = s[1], u = s[2], h = d - a, p = f - l, g = h * h + p * p, m, y;
    if (g < cd)
      y = Math.log(u / c) / e, m = function(S) {
        return [
          a + S * h,
          l + S * p,
          c * Math.exp(e * S * y)
        ];
      };
    else {
      var x = Math.sqrt(g), C = (u * u - c * c + o * g) / (2 * c * n * x), b = (u * u - c * c - o * g) / (2 * u * n * x), E = Math.log(Math.sqrt(C * C + 1) - C), _ = Math.log(Math.sqrt(b * b + 1) - b);
      y = (_ - E) / e, m = function(S) {
        var N = S * y, R = Ki(E), M = c / (n * x) * (R * ud(e * N + E) - dd(E));
        return [
          a + M * h,
          l + M * p,
          c * R / Ki(e * N + E)
        ];
      };
    }
    return m.duration = y * 1e3 * e / Math.SQRT2, m;
  }
  return i.rho = function(r) {
    var s = Math.max(1e-3, +r), a = s * s, l = a * a;
    return t(s, a, l);
  }, i;
})(Math.SQRT2, 2, 4);
var jt = 0, un = 0, sn = 0, Or = 1e3, Jn, fn, Qn = 0, Tt = 0, _o = 0, bn = typeof performance == "object" && performance.now ? performance : Date, zr = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function yi() {
  return Tt || (zr(hd), Tt = bn.now() + _o);
}
function hd() {
  Tt = 0;
}
function eo() {
  this._call = this._time = this._next = null;
}
eo.prototype = Vr.prototype = {
  constructor: eo,
  restart: function(t, e, n) {
    if (typeof t != "function") throw new TypeError("callback is not a function");
    n = (n == null ? yi() : +n) + (e == null ? 0 : +e), !this._next && fn !== this && (fn ? fn._next = this : Jn = this, fn = this), this._call = t, this._time = n, Jo();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Jo());
  }
};
function Vr(t, e, n) {
  var o = new eo();
  return o.restart(t, e, n), o;
}
function gd() {
  yi(), ++jt;
  for (var t = Jn, e; t; )
    (e = Tt - t._time) >= 0 && t._call.call(void 0, e), t = t._next;
  --jt;
}
function Ji() {
  Tt = (Qn = bn.now()) + _o, jt = un = 0;
  try {
    gd();
  } finally {
    jt = 0, md(), Tt = 0;
  }
}
function pd() {
  var t = bn.now(), e = t - Qn;
  e > Or && (_o -= e, Qn = t);
}
function md() {
  for (var t, e = Jn, n, o = 1 / 0; e; )
    e._call ? (o > e._time && (o = e._time), t = e, e = e._next) : (n = e._next, e._next = null, e = t ? t._next = n : Jn = n);
  fn = t, Jo(o);
}
function Jo(t) {
  if (!jt) {
    un && (un = clearTimeout(un));
    var e = t - Tt;
    e > 24 ? (t < 1 / 0 && (un = setTimeout(Ji, t - bn.now() - _o)), sn && (sn = clearInterval(sn))) : (sn || (Qn = bn.now(), sn = setInterval(pd, Or)), jt = 1, zr(Ji));
  }
}
function Qi(t, e, n) {
  var o = new eo();
  return e = e == null ? 0 : +e, o.restart((i) => {
    o.stop(), t(i + e);
  }, e, n), o;
}
var yd = wo("start", "end", "cancel", "interrupt"), wd = [], Br = 0, es = 1, Qo = 2, Xn = 3, ts = 4, ei = 5, Wn = 6;
function bo(t, e, n, o, i, r) {
  var s = t.__transition;
  if (!s) t.__transition = {};
  else if (n in s) return;
  vd(t, n, {
    name: e,
    index: o,
    // For context during callback.
    group: i,
    // For context during callback.
    on: yd,
    tween: wd,
    time: r.time,
    delay: r.delay,
    duration: r.duration,
    ease: r.ease,
    timer: null,
    state: Br
  });
}
function wi(t, e) {
  var n = Ze(t, e);
  if (n.state > Br) throw new Error("too late; already scheduled");
  return n;
}
function et(t, e) {
  var n = Ze(t, e);
  if (n.state > Xn) throw new Error("too late; already running");
  return n;
}
function Ze(t, e) {
  var n = t.__transition;
  if (!n || !(n = n[e])) throw new Error("transition not found");
  return n;
}
function vd(t, e, n) {
  var o = t.__transition, i;
  o[e] = n, n.timer = Vr(r, 0, n.time);
  function r(c) {
    n.state = es, n.timer.restart(s, n.delay, n.time), n.delay <= c && s(c - n.delay);
  }
  function s(c) {
    var d, f, u, h;
    if (n.state !== es) return l();
    for (d in o)
      if (h = o[d], h.name === n.name) {
        if (h.state === Xn) return Qi(s);
        h.state === ts ? (h.state = Wn, h.timer.stop(), h.on.call("interrupt", t, t.__data__, h.index, h.group), delete o[d]) : +d < e && (h.state = Wn, h.timer.stop(), h.on.call("cancel", t, t.__data__, h.index, h.group), delete o[d]);
      }
    if (Qi(function() {
      n.state === Xn && (n.state = ts, n.timer.restart(a, n.delay, n.time), a(c));
    }), n.state = Qo, n.on.call("start", t, t.__data__, n.index, n.group), n.state === Qo) {
      for (n.state = Xn, i = new Array(u = n.tween.length), d = 0, f = -1; d < u; ++d)
        (h = n.tween[d].value.call(t, t.__data__, n.index, n.group)) && (i[++f] = h);
      i.length = f + 1;
    }
  }
  function a(c) {
    for (var d = c < n.duration ? n.ease.call(null, c / n.duration) : (n.timer.restart(l), n.state = ei, 1), f = -1, u = i.length; ++f < u; )
      i[f].call(t, d);
    n.state === ei && (n.on.call("end", t, t.__data__, n.index, n.group), l());
  }
  function l() {
    n.state = Wn, n.timer.stop(), delete o[e];
    for (var c in o) return;
    delete t.__transition;
  }
}
function jn(t, e) {
  var n = t.__transition, o, i, r = !0, s;
  if (n) {
    e = e == null ? null : e + "";
    for (s in n) {
      if ((o = n[s]).name !== e) {
        r = !1;
        continue;
      }
      i = o.state > Qo && o.state < ei, o.state = Wn, o.timer.stop(), o.on.call(i ? "interrupt" : "cancel", t, t.__data__, o.index, o.group), delete n[s];
    }
    r && delete t.__transition;
  }
}
function _d(t) {
  return this.each(function() {
    jn(this, t);
  });
}
function bd(t, e) {
  var n, o;
  return function() {
    var i = et(this, t), r = i.tween;
    if (r !== n) {
      o = n = r;
      for (var s = 0, a = o.length; s < a; ++s)
        if (o[s].name === e) {
          o = o.slice(), o.splice(s, 1);
          break;
        }
    }
    i.tween = o;
  };
}
function xd(t, e, n) {
  var o, i;
  if (typeof n != "function") throw new Error();
  return function() {
    var r = et(this, t), s = r.tween;
    if (s !== o) {
      i = (o = s).slice();
      for (var a = { name: e, value: n }, l = 0, c = i.length; l < c; ++l)
        if (i[l].name === e) {
          i[l] = a;
          break;
        }
      l === c && i.push(a);
    }
    r.tween = i;
  };
}
function Ed(t, e) {
  var n = this._id;
  if (t += "", arguments.length < 2) {
    for (var o = Ze(this.node(), n).tween, i = 0, r = o.length, s; i < r; ++i)
      if ((s = o[i]).name === t)
        return s.value;
    return null;
  }
  return this.each((e == null ? bd : xd)(n, t, e));
}
function vi(t, e, n) {
  var o = t._id;
  return t.each(function() {
    var i = et(this, o);
    (i.value || (i.value = {}))[e] = n.apply(this, arguments);
  }), function(i) {
    return Ze(i, o).value[e];
  };
}
function qr(t, e) {
  var n;
  return (typeof e == "number" ? gt : e instanceof _n ? Go : (n = _n(e)) ? (e = n, Go) : id)(t, e);
}
function Cd(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function Sd(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function kd(t, e, n) {
  var o, i = n + "", r;
  return function() {
    var s = this.getAttribute(t);
    return s === i ? null : s === o ? r : r = e(o = s, n);
  };
}
function Ld(t, e, n) {
  var o, i = n + "", r;
  return function() {
    var s = this.getAttributeNS(t.space, t.local);
    return s === i ? null : s === o ? r : r = e(o = s, n);
  };
}
function Md(t, e, n) {
  var o, i, r;
  return function() {
    var s, a = n(this), l;
    return a == null ? void this.removeAttribute(t) : (s = this.getAttribute(t), l = a + "", s === l ? null : s === o && l === i ? r : (i = l, r = e(o = s, a)));
  };
}
function Pd(t, e, n) {
  var o, i, r;
  return function() {
    var s, a = n(this), l;
    return a == null ? void this.removeAttributeNS(t.space, t.local) : (s = this.getAttributeNS(t.space, t.local), l = a + "", s === l ? null : s === o && l === i ? r : (i = l, r = e(o = s, a)));
  };
}
function Nd(t, e) {
  var n = vo(t), o = n === "transform" ? ld : qr;
  return this.attrTween(t, typeof e == "function" ? (n.local ? Pd : Md)(n, o, vi(this, "attr." + t, e)) : e == null ? (n.local ? Sd : Cd)(n) : (n.local ? Ld : kd)(n, o, e));
}
function Td(t, e) {
  return function(n) {
    this.setAttribute(t, e.call(this, n));
  };
}
function Ad(t, e) {
  return function(n) {
    this.setAttributeNS(t.space, t.local, e.call(this, n));
  };
}
function $d(t, e) {
  var n, o;
  function i() {
    var r = e.apply(this, arguments);
    return r !== o && (n = (o = r) && Ad(t, r)), n;
  }
  return i._value = e, i;
}
function Id(t, e) {
  var n, o;
  function i() {
    var r = e.apply(this, arguments);
    return r !== o && (n = (o = r) && Td(t, r)), n;
  }
  return i._value = e, i;
}
function Dd(t, e) {
  var n = "attr." + t;
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (e == null) return this.tween(n, null);
  if (typeof e != "function") throw new Error();
  var o = vo(t);
  return this.tween(n, (o.local ? $d : Id)(o, e));
}
function Rd(t, e) {
  return function() {
    wi(this, t).delay = +e.apply(this, arguments);
  };
}
function Hd(t, e) {
  return e = +e, function() {
    wi(this, t).delay = e;
  };
}
function Fd(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? Rd : Hd)(e, t)) : Ze(this.node(), e).delay;
}
function Od(t, e) {
  return function() {
    et(this, t).duration = +e.apply(this, arguments);
  };
}
function zd(t, e) {
  return e = +e, function() {
    et(this, t).duration = e;
  };
}
function Vd(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? Od : zd)(e, t)) : Ze(this.node(), e).duration;
}
function Bd(t, e) {
  if (typeof e != "function") throw new Error();
  return function() {
    et(this, t).ease = e;
  };
}
function qd(t) {
  var e = this._id;
  return arguments.length ? this.each(Bd(e, t)) : Ze(this.node(), e).ease;
}
function Yd(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    if (typeof n != "function") throw new Error();
    et(this, t).ease = n;
  };
}
function Xd(t) {
  if (typeof t != "function") throw new Error();
  return this.each(Yd(this._id, t));
}
function Wd(t) {
  typeof t != "function" && (t = br(t));
  for (var e = this._groups, n = e.length, o = new Array(n), i = 0; i < n; ++i)
    for (var r = e[i], s = r.length, a = o[i] = [], l, c = 0; c < s; ++c)
      (l = r[c]) && t.call(l, l.__data__, c, r) && a.push(l);
  return new dt(o, this._parents, this._name, this._id);
}
function jd(t) {
  if (t._id !== this._id) throw new Error();
  for (var e = this._groups, n = t._groups, o = e.length, i = n.length, r = Math.min(o, i), s = new Array(o), a = 0; a < r; ++a)
    for (var l = e[a], c = n[a], d = l.length, f = s[a] = new Array(d), u, h = 0; h < d; ++h)
      (u = l[h] || c[h]) && (f[h] = u);
  for (; a < o; ++a)
    s[a] = e[a];
  return new dt(s, this._parents, this._name, this._id);
}
function Ud(t) {
  return (t + "").trim().split(/^|\s+/).every(function(e) {
    var n = e.indexOf(".");
    return n >= 0 && (e = e.slice(0, n)), !e || e === "start";
  });
}
function Gd(t, e, n) {
  var o, i, r = Ud(e) ? wi : et;
  return function() {
    var s = r(this, t), a = s.on;
    a !== o && (i = (o = a).copy()).on(e, n), s.on = i;
  };
}
function Zd(t, e) {
  var n = this._id;
  return arguments.length < 2 ? Ze(this.node(), n).on.on(t) : this.each(Gd(n, t, e));
}
function Kd(t) {
  return function() {
    var e = this.parentNode;
    for (var n in this.__transition) if (+n !== t) return;
    e && e.removeChild(this);
  };
}
function Jd() {
  return this.on("end.remove", Kd(this._id));
}
function Qd(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = gi(t));
  for (var o = this._groups, i = o.length, r = new Array(i), s = 0; s < i; ++s)
    for (var a = o[s], l = a.length, c = r[s] = new Array(l), d, f, u = 0; u < l; ++u)
      (d = a[u]) && (f = t.call(d, d.__data__, u, a)) && ("__data__" in d && (f.__data__ = d.__data__), c[u] = f, bo(c[u], e, n, u, c, Ze(d, n)));
  return new dt(r, this._parents, e, n);
}
function eu(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = _r(t));
  for (var o = this._groups, i = o.length, r = [], s = [], a = 0; a < i; ++a)
    for (var l = o[a], c = l.length, d, f = 0; f < c; ++f)
      if (d = l[f]) {
        for (var u = t.call(d, d.__data__, f, l), h, p = Ze(d, n), g = 0, m = u.length; g < m; ++g)
          (h = u[g]) && bo(h, e, n, g, u, p);
        r.push(u), s.push(d);
      }
  return new dt(r, s, e, n);
}
var tu = Ln.prototype.constructor;
function nu() {
  return new tu(this._groups, this._parents);
}
function ou(t, e) {
  var n, o, i;
  return function() {
    var r = Wt(this, t), s = (this.style.removeProperty(t), Wt(this, t));
    return r === s ? null : r === n && s === o ? i : i = e(n = r, o = s);
  };
}
function Yr(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function iu(t, e, n) {
  var o, i = n + "", r;
  return function() {
    var s = Wt(this, t);
    return s === i ? null : s === o ? r : r = e(o = s, n);
  };
}
function su(t, e, n) {
  var o, i, r;
  return function() {
    var s = Wt(this, t), a = n(this), l = a + "";
    return a == null && (l = a = (this.style.removeProperty(t), Wt(this, t))), s === l ? null : s === o && l === i ? r : (i = l, r = e(o = s, a));
  };
}
function ru(t, e) {
  var n, o, i, r = "style." + e, s = "end." + r, a;
  return function() {
    var l = et(this, t), c = l.on, d = l.value[r] == null ? a || (a = Yr(e)) : void 0;
    (c !== n || i !== d) && (o = (n = c).copy()).on(s, i = d), l.on = o;
  };
}
function au(t, e, n) {
  var o = (t += "") == "transform" ? ad : qr;
  return e == null ? this.styleTween(t, ou(t, o)).on("end.style." + t, Yr(t)) : typeof e == "function" ? this.styleTween(t, su(t, o, vi(this, "style." + t, e))).each(ru(this._id, t)) : this.styleTween(t, iu(t, o, e), n).on("end.style." + t, null);
}
function lu(t, e, n) {
  return function(o) {
    this.style.setProperty(t, e.call(this, o), n);
  };
}
function cu(t, e, n) {
  var o, i;
  function r() {
    var s = e.apply(this, arguments);
    return s !== i && (o = (i = s) && lu(t, s, n)), o;
  }
  return r._value = e, r;
}
function du(t, e, n) {
  var o = "style." + (t += "");
  if (arguments.length < 2) return (o = this.tween(o)) && o._value;
  if (e == null) return this.tween(o, null);
  if (typeof e != "function") throw new Error();
  return this.tween(o, cu(t, e, n ?? ""));
}
function uu(t) {
  return function() {
    this.textContent = t;
  };
}
function fu(t) {
  return function() {
    var e = t(this);
    this.textContent = e ?? "";
  };
}
function hu(t) {
  return this.tween("text", typeof t == "function" ? fu(vi(this, "text", t)) : uu(t == null ? "" : t + ""));
}
function gu(t) {
  return function(e) {
    this.textContent = t.call(this, e);
  };
}
function pu(t) {
  var e, n;
  function o() {
    var i = t.apply(this, arguments);
    return i !== n && (e = (n = i) && gu(i)), e;
  }
  return o._value = t, o;
}
function mu(t) {
  var e = "text";
  if (arguments.length < 1) return (e = this.tween(e)) && e._value;
  if (t == null) return this.tween(e, null);
  if (typeof t != "function") throw new Error();
  return this.tween(e, pu(t));
}
function yu() {
  for (var t = this._name, e = this._id, n = Xr(), o = this._groups, i = o.length, r = 0; r < i; ++r)
    for (var s = o[r], a = s.length, l, c = 0; c < a; ++c)
      if (l = s[c]) {
        var d = Ze(l, e);
        bo(l, t, n, c, s, {
          time: d.time + d.delay + d.duration,
          delay: 0,
          duration: d.duration,
          ease: d.ease
        });
      }
  return new dt(o, this._parents, t, n);
}
function wu() {
  var t, e, n = this, o = n._id, i = n.size();
  return new Promise(function(r, s) {
    var a = { value: s }, l = { value: function() {
      --i === 0 && r();
    } };
    n.each(function() {
      var c = et(this, o), d = c.on;
      d !== t && (e = (t = d).copy(), e._.cancel.push(a), e._.interrupt.push(a), e._.end.push(l)), c.on = e;
    }), i === 0 && r();
  });
}
var vu = 0;
function dt(t, e, n, o) {
  this._groups = t, this._parents = e, this._name = n, this._id = o;
}
function Xr() {
  return ++vu;
}
var tt = Ln.prototype;
dt.prototype = {
  constructor: dt,
  select: Qd,
  selectAll: eu,
  selectChild: tt.selectChild,
  selectChildren: tt.selectChildren,
  filter: Wd,
  merge: jd,
  selection: nu,
  transition: yu,
  call: tt.call,
  nodes: tt.nodes,
  node: tt.node,
  size: tt.size,
  empty: tt.empty,
  each: tt.each,
  on: Zd,
  attr: Nd,
  attrTween: Dd,
  style: au,
  styleTween: du,
  text: hu,
  textTween: mu,
  remove: Jd,
  tween: Ed,
  delay: Fd,
  duration: Vd,
  ease: qd,
  easeVarying: Xd,
  end: wu,
  [Symbol.iterator]: tt[Symbol.iterator]
};
const _u = (t) => +t;
function bu(t) {
  return t * t;
}
function xu(t) {
  return t * (2 - t);
}
function Eu(t) {
  return ((t *= 2) <= 1 ? t * t : --t * (2 - t) + 1) / 2;
}
function Cu(t) {
  return t * t * t;
}
function Su(t) {
  return --t * t * t + 1;
}
function Wr(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var jr = Math.PI, Ur = jr / 2;
function ku(t) {
  return +t == 1 ? 1 : 1 - Math.cos(t * Ur);
}
function Lu(t) {
  return Math.sin(t * Ur);
}
function Mu(t) {
  return (1 - Math.cos(jr * t)) / 2;
}
function Ct(t) {
  return (Math.pow(2, -10 * t) - 9765625e-10) * 1.0009775171065494;
}
function Pu(t) {
  return Ct(1 - +t);
}
function Nu(t) {
  return 1 - Ct(t);
}
function Tu(t) {
  return ((t *= 2) <= 1 ? Ct(1 - t) : 2 - Ct(t - 1)) / 2;
}
function Au(t) {
  return 1 - Math.sqrt(1 - t * t);
}
function $u(t) {
  return Math.sqrt(1 - --t * t);
}
function Iu(t) {
  return ((t *= 2) <= 1 ? 1 - Math.sqrt(1 - t * t) : Math.sqrt(1 - (t -= 2) * t) + 1) / 2;
}
var ti = 4 / 11, Du = 6 / 11, Ru = 8 / 11, Hu = 3 / 4, Fu = 9 / 11, Ou = 10 / 11, zu = 15 / 16, Vu = 21 / 22, Bu = 63 / 64, Hn = 1 / ti / ti;
function qu(t) {
  return 1 - to(1 - t);
}
function to(t) {
  return (t = +t) < ti ? Hn * t * t : t < Ru ? Hn * (t -= Du) * t + Hu : t < Ou ? Hn * (t -= Fu) * t + zu : Hn * (t -= Vu) * t + Bu;
}
function Yu(t) {
  return ((t *= 2) <= 1 ? 1 - to(1 - t) : to(t - 1) + 1) / 2;
}
var _i = 1.70158, Xu = (function t(e) {
  e = +e;
  function n(o) {
    return (o = +o) * o * (e * (o - 1) + o);
  }
  return n.overshoot = t, n;
})(_i), Wu = (function t(e) {
  e = +e;
  function n(o) {
    return --o * o * ((o + 1) * e + o) + 1;
  }
  return n.overshoot = t, n;
})(_i), ju = (function t(e) {
  e = +e;
  function n(o) {
    return ((o *= 2) < 1 ? o * o * ((e + 1) * o - e) : (o -= 2) * o * ((e + 1) * o + e) + 2) / 2;
  }
  return n.overshoot = t, n;
})(_i), Ut = 2 * Math.PI, bi = 1, xi = 0.3, Uu = (function t(e, n) {
  var o = Math.asin(1 / (e = Math.max(1, e))) * (n /= Ut);
  function i(r) {
    return e * Ct(- --r) * Math.sin((o - r) / n);
  }
  return i.amplitude = function(r) {
    return t(r, n * Ut);
  }, i.period = function(r) {
    return t(e, r);
  }, i;
})(bi, xi), Gu = (function t(e, n) {
  var o = Math.asin(1 / (e = Math.max(1, e))) * (n /= Ut);
  function i(r) {
    return 1 - e * Ct(r = +r) * Math.sin((r + o) / n);
  }
  return i.amplitude = function(r) {
    return t(r, n * Ut);
  }, i.period = function(r) {
    return t(e, r);
  }, i;
})(bi, xi), Zu = (function t(e, n) {
  var o = Math.asin(1 / (e = Math.max(1, e))) * (n /= Ut);
  function i(r) {
    return ((r = r * 2 - 1) < 0 ? e * Ct(-r) * Math.sin((o - r) / n) : 2 - e * Ct(r) * Math.sin((o + r) / n)) / 2;
  }
  return i.amplitude = function(r) {
    return t(r, n * Ut);
  }, i.period = function(r) {
    return t(e, r);
  }, i;
})(bi, xi), Ku = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: Wr
};
function Ju(t, e) {
  for (var n; !(n = t.__transition) || !(n = n[e]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${e} not found`);
  return n;
}
function Qu(t) {
  var e, n;
  t instanceof dt ? (e = t._id, t = t._name) : (e = Xr(), (n = Ku).time = yi(), t = t == null ? null : t + "");
  for (var o = this._groups, i = o.length, r = 0; r < i; ++r)
    for (var s = o[r], a = s.length, l, c = 0; c < a; ++c)
      (l = s[c]) && bo(l, t, e, c, s, n || Ju(l, e));
  return new dt(o, this._parents, t, e);
}
Ln.prototype.interrupt = _d;
Ln.prototype.transition = Qu;
const Fn = (t) => () => t;
function ef(t, {
  sourceEvent: e,
  target: n,
  transform: o,
  dispatch: i
}) {
  Object.defineProperties(this, {
    type: { value: t, enumerable: !0, configurable: !0 },
    sourceEvent: { value: e, enumerable: !0, configurable: !0 },
    target: { value: n, enumerable: !0, configurable: !0 },
    transform: { value: o, enumerable: !0, configurable: !0 },
    _: { value: i }
  });
}
function ot(t, e, n) {
  this.k = t, this.x = e, this.y = n;
}
ot.prototype = {
  constructor: ot,
  scale: function(t) {
    return t === 1 ? this : new ot(this.k * t, this.x, this.y);
  },
  translate: function(t, e) {
    return t === 0 & e === 0 ? this : new ot(this.k, this.x + this.k * t, this.y + this.k * e);
  },
  apply: function(t) {
    return [t[0] * this.k + this.x, t[1] * this.k + this.y];
  },
  applyX: function(t) {
    return t * this.k + this.x;
  },
  applyY: function(t) {
    return t * this.k + this.y;
  },
  invert: function(t) {
    return [(t[0] - this.x) / this.k, (t[1] - this.y) / this.k];
  },
  invertX: function(t) {
    return (t - this.x) / this.k;
  },
  invertY: function(t) {
    return (t - this.y) / this.k;
  },
  rescaleX: function(t) {
    return t.copy().domain(t.range().map(this.invertX, this).map(t.invert, t));
  },
  rescaleY: function(t) {
    return t.copy().domain(t.range().map(this.invertY, this).map(t.invert, t));
  },
  toString: function() {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  }
};
var Ot = new ot(1, 0, 0);
ot.prototype;
function To(t) {
  t.stopImmediatePropagation();
}
function rn(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function tf(t) {
  return (!t.ctrlKey || t.type === "wheel") && !t.button;
}
function nf() {
  var t = this;
  return t instanceof SVGElement ? (t = t.ownerSVGElement || t, t.hasAttribute("viewBox") ? (t = t.viewBox.baseVal, [[t.x, t.y], [t.x + t.width, t.y + t.height]]) : [[0, 0], [t.width.baseVal.value, t.height.baseVal.value]]) : [[0, 0], [t.clientWidth, t.clientHeight]];
}
function ns() {
  return this.__zoom || Ot;
}
function of(t) {
  return -t.deltaY * (t.deltaMode === 1 ? 0.05 : t.deltaMode ? 1 : 2e-3) * (t.ctrlKey ? 10 : 1);
}
function sf() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function rf(t, e, n) {
  var o = t.invertX(e[0][0]) - n[0][0], i = t.invertX(e[1][0]) - n[1][0], r = t.invertY(e[0][1]) - n[0][1], s = t.invertY(e[1][1]) - n[1][1];
  return t.translate(
    i > o ? (o + i) / 2 : Math.min(0, o) || Math.max(0, i),
    s > r ? (r + s) / 2 : Math.min(0, r) || Math.max(0, s)
  );
}
function af() {
  var t = tf, e = nf, n = rf, o = of, i = sf, r = [0, 1 / 0], s = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], a = 250, l = fd, c = wo("start", "zoom", "end"), d, f, u, h = 500, p = 150, g = 0, m = 10;
  function y(v) {
    v.property("__zoom", ns).on("wheel.zoom", N, { passive: !1 }).on("mousedown.zoom", R).on("dblclick.zoom", M).filter(i).on("touchstart.zoom", T).on("touchmove.zoom", P).on("touchend.zoom touchcancel.zoom", w).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  y.transform = function(v, $, L, D) {
    var z = v.selection ? v.selection() : v;
    z.property("__zoom", ns), v !== z ? E(v, $, L, D) : z.interrupt().each(function() {
      _(this, arguments).event(D).start().zoom(null, typeof $ == "function" ? $.apply(this, arguments) : $).end();
    });
  }, y.scaleBy = function(v, $, L, D) {
    y.scaleTo(v, function() {
      var z = this.__zoom.k, V = typeof $ == "function" ? $.apply(this, arguments) : $;
      return z * V;
    }, L, D);
  }, y.scaleTo = function(v, $, L, D) {
    y.transform(v, function() {
      var z = e.apply(this, arguments), V = this.__zoom, I = L == null ? b(z) : typeof L == "function" ? L.apply(this, arguments) : L, k = V.invert(I), A = typeof $ == "function" ? $.apply(this, arguments) : $;
      return n(C(x(V, A), I, k), z, s);
    }, L, D);
  }, y.translateBy = function(v, $, L, D) {
    y.transform(v, function() {
      return n(this.__zoom.translate(
        typeof $ == "function" ? $.apply(this, arguments) : $,
        typeof L == "function" ? L.apply(this, arguments) : L
      ), e.apply(this, arguments), s);
    }, null, D);
  }, y.translateTo = function(v, $, L, D, z) {
    y.transform(v, function() {
      var V = e.apply(this, arguments), I = this.__zoom, k = D == null ? b(V) : typeof D == "function" ? D.apply(this, arguments) : D;
      return n(Ot.translate(k[0], k[1]).scale(I.k).translate(
        typeof $ == "function" ? -$.apply(this, arguments) : -$,
        typeof L == "function" ? -L.apply(this, arguments) : -L
      ), V, s);
    }, D, z);
  };
  function x(v, $) {
    return $ = Math.max(r[0], Math.min(r[1], $)), $ === v.k ? v : new ot($, v.x, v.y);
  }
  function C(v, $, L) {
    var D = $[0] - L[0] * v.k, z = $[1] - L[1] * v.k;
    return D === v.x && z === v.y ? v : new ot(v.k, D, z);
  }
  function b(v) {
    return [(+v[0][0] + +v[1][0]) / 2, (+v[0][1] + +v[1][1]) / 2];
  }
  function E(v, $, L, D) {
    v.on("start.zoom", function() {
      _(this, arguments).event(D).start();
    }).on("interrupt.zoom end.zoom", function() {
      _(this, arguments).event(D).end();
    }).tween("zoom", function() {
      var z = this, V = arguments, I = _(z, V).event(D), k = e.apply(z, V), A = L == null ? b(k) : typeof L == "function" ? L.apply(z, V) : L, O = Math.max(k[1][0] - k[0][0], k[1][1] - k[0][1]), j = z.__zoom, Q = typeof $ == "function" ? $.apply(z, V) : $, G = l(j.invert(A).concat(O / j.k), Q.invert(A).concat(O / Q.k));
      return function(U) {
        if (U === 1) U = Q;
        else {
          var Z = G(U), H = O / Z[2];
          U = new ot(H, A[0] - Z[0] * H, A[1] - Z[1] * H);
        }
        I.zoom(null, U);
      };
    });
  }
  function _(v, $, L) {
    return !L && v.__zooming || new S(v, $);
  }
  function S(v, $) {
    this.that = v, this.args = $, this.active = 0, this.sourceEvent = null, this.extent = e.apply(v, $), this.taps = 0;
  }
  S.prototype = {
    event: function(v) {
      return v && (this.sourceEvent = v), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(v, $) {
      return this.mouse && v !== "mouse" && (this.mouse[1] = $.invert(this.mouse[0])), this.touch0 && v !== "touch" && (this.touch0[1] = $.invert(this.touch0[0])), this.touch1 && v !== "touch" && (this.touch1[1] = $.invert(this.touch1[0])), this.that.__zoom = $, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(v) {
      var $ = We(this.that).datum();
      c.call(
        v,
        this.that,
        new ef(v, {
          sourceEvent: this.sourceEvent,
          target: y,
          transform: this.that.__zoom,
          dispatch: c
        }),
        $
      );
    }
  };
  function N(v, ...$) {
    if (!t.apply(this, arguments)) return;
    var L = _(this, $).event(v), D = this.__zoom, z = Math.max(r[0], Math.min(r[1], D.k * Math.pow(2, o.apply(this, arguments)))), V = nt(v);
    if (L.wheel)
      (L.mouse[0][0] !== V[0] || L.mouse[0][1] !== V[1]) && (L.mouse[1] = D.invert(L.mouse[0] = V)), clearTimeout(L.wheel);
    else {
      if (D.k === z) return;
      L.mouse = [V, D.invert(V)], jn(this), L.start();
    }
    rn(v), L.wheel = setTimeout(I, p), L.zoom("mouse", n(C(x(D, z), L.mouse[0], L.mouse[1]), L.extent, s));
    function I() {
      L.wheel = null, L.end();
    }
  }
  function R(v, ...$) {
    if (u || !t.apply(this, arguments)) return;
    var L = v.currentTarget, D = _(this, $, !0).event(v), z = We(v.view).on("mousemove.zoom", A, !0).on("mouseup.zoom", O, !0), V = nt(v, L), I = v.clientX, k = v.clientY;
    Tr(v.view), To(v), D.mouse = [V, this.__zoom.invert(V)], jn(this), D.start();
    function A(j) {
      if (rn(j), !D.moved) {
        var Q = j.clientX - I, G = j.clientY - k;
        D.moved = Q * Q + G * G > g;
      }
      D.event(j).zoom("mouse", n(C(D.that.__zoom, D.mouse[0] = nt(j, L), D.mouse[1]), D.extent, s));
    }
    function O(j) {
      z.on("mousemove.zoom mouseup.zoom", null), Ar(j.view, D.moved), rn(j), D.event(j).end();
    }
  }
  function M(v, ...$) {
    if (t.apply(this, arguments)) {
      var L = this.__zoom, D = nt(v.changedTouches ? v.changedTouches[0] : v, this), z = L.invert(D), V = L.k * (v.shiftKey ? 0.5 : 2), I = n(C(x(L, V), D, z), e.apply(this, $), s);
      rn(v), a > 0 ? We(this).transition().duration(a).call(E, I, D, v) : We(this).call(y.transform, I, D, v);
    }
  }
  function T(v, ...$) {
    if (t.apply(this, arguments)) {
      var L = v.touches, D = L.length, z = _(this, $, v.changedTouches.length === D).event(v), V, I, k, A;
      for (To(v), I = 0; I < D; ++I)
        k = L[I], A = nt(k, this), A = [A, this.__zoom.invert(A), k.identifier], z.touch0 ? !z.touch1 && z.touch0[2] !== A[2] && (z.touch1 = A, z.taps = 0) : (z.touch0 = A, V = !0, z.taps = 1 + !!d);
      d && (d = clearTimeout(d)), V && (z.taps < 2 && (f = A[0], d = setTimeout(function() {
        d = null;
      }, h)), jn(this), z.start());
    }
  }
  function P(v, ...$) {
    if (this.__zooming) {
      var L = _(this, $).event(v), D = v.changedTouches, z = D.length, V, I, k, A;
      for (rn(v), V = 0; V < z; ++V)
        I = D[V], k = nt(I, this), L.touch0 && L.touch0[2] === I.identifier ? L.touch0[0] = k : L.touch1 && L.touch1[2] === I.identifier && (L.touch1[0] = k);
      if (I = L.that.__zoom, L.touch1) {
        var O = L.touch0[0], j = L.touch0[1], Q = L.touch1[0], G = L.touch1[1], U = (U = Q[0] - O[0]) * U + (U = Q[1] - O[1]) * U, Z = (Z = G[0] - j[0]) * Z + (Z = G[1] - j[1]) * Z;
        I = x(I, Math.sqrt(U / Z)), k = [(O[0] + Q[0]) / 2, (O[1] + Q[1]) / 2], A = [(j[0] + G[0]) / 2, (j[1] + G[1]) / 2];
      } else if (L.touch0) k = L.touch0[0], A = L.touch0[1];
      else return;
      L.zoom("touch", n(C(I, k, A), L.extent, s));
    }
  }
  function w(v, ...$) {
    if (this.__zooming) {
      var L = _(this, $).event(v), D = v.changedTouches, z = D.length, V, I;
      for (To(v), u && clearTimeout(u), u = setTimeout(function() {
        u = null;
      }, h), V = 0; V < z; ++V)
        I = D[V], L.touch0 && L.touch0[2] === I.identifier ? delete L.touch0 : L.touch1 && L.touch1[2] === I.identifier && delete L.touch1;
      if (L.touch1 && !L.touch0 && (L.touch0 = L.touch1, delete L.touch1), L.touch0) L.touch0[1] = this.__zoom.invert(L.touch0[0]);
      else if (L.end(), L.taps === 2 && (I = nt(I, this), Math.hypot(f[0] - I[0], f[1] - I[1]) < m)) {
        var k = We(this).on("dblclick.zoom");
        k && k.apply(this, arguments);
      }
    }
  }
  return y.wheelDelta = function(v) {
    return arguments.length ? (o = typeof v == "function" ? v : Fn(+v), y) : o;
  }, y.filter = function(v) {
    return arguments.length ? (t = typeof v == "function" ? v : Fn(!!v), y) : t;
  }, y.touchable = function(v) {
    return arguments.length ? (i = typeof v == "function" ? v : Fn(!!v), y) : i;
  }, y.extent = function(v) {
    return arguments.length ? (e = typeof v == "function" ? v : Fn([[+v[0][0], +v[0][1]], [+v[1][0], +v[1][1]]]), y) : e;
  }, y.scaleExtent = function(v) {
    return arguments.length ? (r[0] = +v[0], r[1] = +v[1], y) : [r[0], r[1]];
  }, y.translateExtent = function(v) {
    return arguments.length ? (s[0][0] = +v[0][0], s[1][0] = +v[1][0], s[0][1] = +v[0][1], s[1][1] = +v[1][1], y) : [[s[0][0], s[0][1]], [s[1][0], s[1][1]]];
  }, y.constrain = function(v) {
    return arguments.length ? (n = v, y) : n;
  }, y.duration = function(v) {
    return arguments.length ? (a = +v, y) : a;
  }, y.interpolate = function(v) {
    return arguments.length ? (l = v, y) : l;
  }, y.on = function() {
    var v = c.on.apply(c, arguments);
    return v === c ? y : v;
  }, y.clickDistance = function(v) {
    return arguments.length ? (g = (v = +v) * v, y) : Math.sqrt(g);
  }, y.tapDistance = function(v) {
    return arguments.length ? (m = +v, y) : m;
  }, y;
}
function os(t) {
  const { pannable: e, zoomable: n, isLocked: o, noPanClassName: i, noWheelClassName: r, isTouchSelectionMode: s, isPanKeyHeld: a, panOnDrag: l } = t;
  return (c) => {
    if (o?.() || c.type !== "wheel" && i && c.target?.closest?.("." + i) || c.type === "wheel" && r && c.target?.closest?.("." + r) || !n && c.type === "wheel") return !1;
    if (c.type === "touchstart") {
      const d = !c.touches || c.touches.length < 2;
      if (s?.() && d || !e && !a?.() && d || !n && !d) return !1;
    }
    if (c.type === "mousedown") {
      if (a?.()) return !0;
      if (!e) return !1;
      if (Array.isArray(l))
        return l.includes(c.button);
      if (l === !1) return !1;
    }
    return !0;
  };
}
const lf = 300, cf = 1.5;
function is(t, e, n, o) {
  return {
    x: e - (e - t.x) / t.zoom * o,
    y: n - (n - t.y) / t.zoom * o,
    zoom: o
  };
}
function df(t, e, n) {
  return t.zoom >= n.level - 1e-3 ? n.remembered ? { next: n.remembered, remember: null } : t.zoom <= n.minZoom + 1e-3 ? { next: t, remember: null } : { next: is(t, e.x, e.y, n.minZoom), remember: null } : { next: is(t, e.x, e.y, n.level), remember: t };
}
function uf(t, e) {
  const {
    onTransformChange: n,
    minZoom: o = 0.5,
    maxZoom: i = 2,
    pannable: r = !0,
    zoomable: s = !0
  } = e, a = We(t);
  let l = !1;
  const c = e.panActivationKeyCode !== void 0 ? e.panActivationKeyCode : "Space", d = (w) => {
    c && w.code === c && (l = !0, t.style.cursor = "grab");
  }, f = (w) => {
    c && w.code === c && (l = !1, t.style.cursor = "");
  }, u = () => {
    l = !1, t.style.cursor = "";
  };
  c && (window.addEventListener("keydown", d), window.addEventListener("keyup", f), window.addEventListener("blur", u));
  let h = null, p = s;
  const g = af().scaleExtent([o, i]).on("start", (w) => {
    if (!w.sourceEvent) return;
    h = null, l && (t.style.cursor = "grabbing");
    const { x: v, y: $, k: L } = w.transform;
    e.onMoveStart?.({ x: v, y: $, zoom: L });
  }).on("zoom", (w) => {
    const { x: v, y: $, k: L } = w.transform;
    n({ x: v, y: $, zoom: L }), w.sourceEvent && e.onMove?.({ x: v, y: $, zoom: L });
  }).on("end", (w) => {
    if (!w.sourceEvent) return;
    l && (t.style.cursor = "grab");
    const { x: v, y: $, k: L } = w.transform;
    e.onMoveEnd?.({ x: v, y: $, zoom: L });
  });
  e.translateExtent && g.translateExtent(e.translateExtent), g.filter(os({
    pannable: r,
    zoomable: s,
    isLocked: e.isLocked,
    noPanClassName: e.noPanClassName,
    noWheelClassName: e.noWheelClassName,
    isTouchSelectionMode: e.isTouchSelectionMode,
    isPanKeyHeld: () => l,
    panOnDrag: e.panOnDrag
  })), a.call(g);
  const m = e.zoomOnDoubleClick === "toggle" ? "toggle" : e.zoomOnDoubleClick === !1 ? "off" : "step", y = Math.max(
    o,
    Math.min(i, e.dblClickZoomLevel ?? cf)
  ), x = (w) => {
    if (e.isLocked?.()) return;
    const v = w.target;
    if (e.noPanClassName && v?.closest?.("." + e.noPanClassName)) return;
    w.preventDefault();
    const $ = t.__zoom ?? Ot, L = t.getBoundingClientRect(), { next: D, remember: z } = df(
      { x: $.x, y: $.y, zoom: $.k },
      { x: w.clientX - L.left, y: w.clientY - L.top },
      { level: y, minZoom: o, remembered: h }
    );
    h = z, a.transition().duration(lf).call(g.transform, Ot.translate(D.x, D.y).scale(D.zoom));
  }, C = m === "toggle" && y > o + 1e-3;
  C ? (a.on("dblclick.zoom", null), t.addEventListener("dblclick", x)) : m === "off" && a.on("dblclick.zoom", null);
  let b = e.panOnScroll ?? !1, E = e.panOnScrollDirection ?? "both", _ = e.panOnScrollSpeed ?? 1, S = !1;
  const N = e.zoomActivationKeyCode !== void 0 ? e.zoomActivationKeyCode : null, R = (w) => {
    N && w.code === N && (S = !0);
  }, M = (w) => {
    N && w.code === N && (S = !1);
  }, T = () => {
    S = !1;
  };
  N && (window.addEventListener("keydown", R), window.addEventListener("keyup", M), window.addEventListener("blur", T));
  const P = (w) => {
    if (e.isLocked?.()) return;
    const v = w.ctrlKey || w.metaKey || S;
    if (!(b ? !v : w.shiftKey)) return;
    w.preventDefault(), w.stopPropagation();
    const L = _;
    let D = 0, z = 0;
    E !== "horizontal" && (z = -w.deltaY * L), E !== "vertical" && (D = -w.deltaX * L, w.shiftKey && w.deltaX === 0 && E === "both" && (D = -w.deltaY * L, z = 0)), e.onScrollPan?.(D, z);
  };
  return t.addEventListener("wheel", P, { passive: !1, capture: !0 }), {
    setViewport(w, v) {
      h = null;
      const $ = v?.duration ?? 0, L = Ot.translate(w.x ?? 0, w.y ?? 0).scale(w.zoom ?? 1);
      $ > 0 ? a.transition().duration($).call(g.transform, L) : a.call(g.transform, L);
    },
    getTransform() {
      return t.__zoom ?? Ot;
    },
    update(w) {
      if ((w.minZoom !== void 0 || w.maxZoom !== void 0) && g.scaleExtent([
        w.minZoom ?? o,
        w.maxZoom ?? i
      ]), w.pannable !== void 0 || w.zoomable !== void 0) {
        const v = w.pannable ?? r, $ = w.zoomable ?? p;
        p = $, g.filter(os({
          pannable: v,
          zoomable: $,
          isLocked: e.isLocked,
          noPanClassName: e.noPanClassName,
          noWheelClassName: e.noWheelClassName,
          isTouchSelectionMode: e.isTouchSelectionMode,
          isPanKeyHeld: () => l,
          panOnDrag: e.panOnDrag
        }));
      }
      w.panOnScroll !== void 0 && (b = w.panOnScroll), w.panOnScrollDirection !== void 0 && (E = w.panOnScrollDirection), w.panOnScrollSpeed !== void 0 && (_ = w.panOnScrollSpeed);
    },
    destroy() {
      t.removeEventListener("wheel", P, { capture: !0 }), C && t.removeEventListener("dblclick", x), c && (window.removeEventListener("keydown", d), window.removeEventListener("keyup", f), window.removeEventListener("blur", u)), N && (window.removeEventListener("keydown", R), window.removeEventListener("keyup", M), window.removeEventListener("blur", T)), a.on(".zoom", null);
    }
  };
}
function Gr(t, e, n, o) {
  return {
    x: (t - o.left - n.x) / n.zoom,
    y: (e - o.top - n.y) / n.zoom
  };
}
function ff(t, e, n, o) {
  return {
    x: t * n.zoom + n.x + o.left,
    y: e * n.zoom + n.y + o.top
  };
}
const we = 150, _e = 50;
function xo(t, e, n, o, i) {
  if (i % 360 === 0) return { x: t, y: e, width: n, height: o };
  const r = i * Math.PI / 180, s = Math.abs(Math.cos(r)), a = Math.abs(Math.sin(r)), l = n * s + o * a, c = n * a + o * s, d = t + n / 2, f = e + o / 2;
  return { x: d - l / 2, y: f - c / 2, width: l, height: c };
}
function Gt(t, e) {
  if (t.length === 0)
    return { x: 0, y: 0, width: 0, height: 0 };
  let n = 1 / 0, o = 1 / 0, i = -1 / 0, r = -1 / 0;
  for (const s of t) {
    const a = s.dimensions?.width ?? we, l = s.dimensions?.height ?? _e, c = en(s, e), d = s.rotation ? xo(c.x, c.y, a, l, s.rotation) : { x: c.x, y: c.y, width: a, height: l };
    n = Math.min(n, d.x), o = Math.min(o, d.y), i = Math.max(i, d.x + d.width), r = Math.max(r, d.y + d.height);
  }
  return {
    x: n,
    y: o,
    width: i - n,
    height: r - o
  };
}
function hf(t, e, n) {
  const o = e.x + e.width, i = e.y + e.height;
  return t.filter((r) => {
    const s = r.dimensions?.width ?? we, a = r.dimensions?.height ?? _e, l = en(r, n), c = r.rotation ? xo(l.x, l.y, s, a, r.rotation) : { x: l.x, y: l.y, width: s, height: a }, d = c.x + c.width, f = c.y + c.height;
    return !(d < e.x || c.x > o || f < e.y || c.y > i);
  });
}
function gf(t, e, n) {
  const o = e.x + e.width, i = e.y + e.height;
  return t.filter((r) => {
    const s = r.dimensions?.width ?? we, a = r.dimensions?.height ?? _e, l = en(r, n), c = r.rotation ? xo(l.x, l.y, s, a, r.rotation) : { x: l.x, y: l.y, width: s, height: a };
    return c.x >= e.x && c.y >= e.y && c.x + c.width <= o && c.y + c.height <= i;
  });
}
function no(t, e, n, o, i, r = 0.1) {
  const s = Math.max(t.width, 1), a = Math.max(t.height, 1), l = s * (1 + r), c = a * (1 + r), d = e / l, f = n / c, u = Math.min(Math.max(Math.min(d, f), o), i), h = { x: t.x + s / 2, y: t.y + a / 2 }, p = e / 2 - h.x * u, g = n / 2 - h.y * u;
  return { x: p, y: g, zoom: u };
}
function pf(t, e, n, o) {
  const i = 1 / t.zoom;
  return {
    minX: (0 - t.x) * i - o,
    minY: (0 - t.y) * i - o,
    maxX: (e - t.x) * i + o,
    maxY: (n - t.y) * i + o
  };
}
class mf {
  constructor(e = 300) {
    this._cells = /* @__PURE__ */ new Map(), this._nodeCells = /* @__PURE__ */ new Map(), this._cellSize = e;
  }
  _cellKey(e, n) {
    return `${e},${n}`;
  }
  _getCellRange(e, n, o, i) {
    return {
      minCX: Math.floor(e / this._cellSize),
      minCY: Math.floor(n / this._cellSize),
      maxCX: Math.floor((e + o) / this._cellSize),
      maxCY: Math.floor((n + i) / this._cellSize)
    };
  }
  insert(e, n, o, i, r) {
    this.remove(e);
    const { minCX: s, minCY: a, maxCX: l, maxCY: c } = this._getCellRange(n, o, i, r), d = [];
    for (let f = s; f <= l; f++)
      for (let u = a; u <= c; u++) {
        const h = this._cellKey(f, u);
        d.push(h);
        let p = this._cells.get(h);
        p || (p = /* @__PURE__ */ new Set(), this._cells.set(h, p)), p.add(e);
      }
    this._nodeCells.set(e, d);
  }
  remove(e) {
    const n = this._nodeCells.get(e);
    if (n) {
      for (const o of n) {
        const i = this._cells.get(o);
        i && (i.delete(e), i.size === 0 && this._cells.delete(o));
      }
      this._nodeCells.delete(e);
    }
  }
  update(e, n, o, i, r) {
    this.insert(e, n, o, i, r);
  }
  query(e) {
    const { minCX: n, minCY: o, maxCX: i, maxCY: r } = this._getCellRange(
      e.minX,
      e.minY,
      e.maxX - e.minX,
      e.maxY - e.minY
    ), s = /* @__PURE__ */ new Set();
    for (let a = n; a <= i; a++)
      for (let l = o; l <= r; l++) {
        const c = this._cells.get(this._cellKey(a, l));
        if (c)
          for (const d of c)
            s.add(d);
      }
    return s;
  }
  clear() {
    this._cells.clear(), this._nodeCells.clear();
  }
  get size() {
    return this._nodeCells.size;
  }
}
function en(t, e) {
  if (!t.position) return { x: 0, y: 0 };
  const n = t.nodeOrigin ?? e ?? [0, 0], o = t.dimensions?.width ?? we, i = t.dimensions?.height ?? _e;
  return {
    x: t.position.x - o * n[0],
    y: t.position.y - i * n[1]
  };
}
let Zr = !1;
function Kr(t) {
  Zr = t;
}
function B(t, e, n) {
  if (!Zr) return;
  const o = `%c[AlpineFlow:${t}]`, i = yf(t);
  n !== void 0 ? console.log(o, i, e, n) : console.log(o, i, e);
}
function yf(t) {
  return `color: ${{
    init: "#4ade80",
    destroy: "#f87171",
    drag: "#60a5fa",
    viewport: "#a78bfa",
    edge: "#fb923c",
    connection: "#f472b6",
    selection: "#facc15",
    event: "#38bdf8",
    store: "#2dd4bf",
    resize: "#c084fc",
    collapse: "#c084fc",
    animate: "#34d399",
    layout: "#818cf8",
    particle: "#f472b6",
    history: "#fbbf24",
    clipboard: "#94a3b8"
  }[t] ?? "#94a3b8"}; font-weight: bold`;
}
const xn = "#64748b", Ei = "#d4d4d8", Jr = "#ef4444", wf = "2", vf = "6 3", ss = 1.2, ni = 0.2, oo = 5, rs = 25;
class _f {
  constructor(e = 50) {
    this.past = [], this.future = [], this._suspendDepth = 0, this.maxSize = e;
  }
  suspend() {
    this._suspendDepth++;
  }
  resume() {
    this._suspendDepth > 0 && this._suspendDepth--;
  }
  capture(e) {
    this._suspendDepth > 0 || this.commit(JSON.stringify(e));
  }
  /** Serialize without pushing — pair with commit() for deferred capture. */
  snapshot(e) {
    return JSON.stringify(e);
  }
  /** Push a snapshot taken earlier via snapshot(). Dedups against the top of the stack. */
  commit(e) {
    this._suspendDepth > 0 || this.past.length > 0 && this.past[this.past.length - 1] === e || (this.past.push(e), this.future = [], this.past.length > this.maxSize && this.past.shift());
  }
  undo(e) {
    return this.past.length === 0 ? null : (this.future.push(JSON.stringify(e)), JSON.parse(this.past.pop()));
  }
  redo(e) {
    return this.future.length === 0 ? null : (this.past.push(JSON.stringify(e)), JSON.parse(this.future.pop()));
  }
  get canUndo() {
    return this.past.length > 0;
  }
  get canRedo() {
    return this.future.length > 0;
  }
}
const bf = 16;
function xf() {
  return typeof requestAnimationFrame == "function" ? {
    request: (t) => requestAnimationFrame(t),
    cancel: (t) => cancelAnimationFrame(t)
  } : {
    request: (t) => setTimeout(() => t(performance.now()), bf),
    cancel: (t) => clearTimeout(t)
  };
}
class Qr {
  constructor() {
    this._scheduler = xf(), this._entries = [], this._postTickCallbacks = [], this._frameId = null, this._running = !1;
  }
  /** True when the rAF loop is running. */
  get active() {
    return this._running;
  }
  /** Replace the frame scheduler (useful for tests with fake timers). */
  setScheduler(e) {
    this._scheduler = e;
  }
  /**
   * Register a tick callback.
   * @param callback - Called each frame with elapsed ms since activation.
   * @param delay - Optional delay (ms) before first invocation, measured from rAF frames.
   * @returns Handle with a `stop()` method to unregister.
   */
  register(e, n = 0) {
    const o = {
      callback: e,
      startTime: 0,
      delay: n,
      registeredAt: performance.now(),
      activated: n <= 0,
      removed: !1
    };
    return o.activated && (o.startTime = performance.now()), this._entries.push(o), this._running || this._start(), {
      stop: () => {
        o.removed = !0;
      }
    };
  }
  /**
   * Register a post-tick callback, fired after all regular tick callbacks each frame.
   * @param callback - Called with the frame timestamp (same `now` value passed to `_tick`).
   * @param options - Optional settings. `keepAlive: true` keeps the engine loop running
   *   even when no regular callbacks are registered (useful for recorders that need every frame).
   * @returns Handle with a `stop()` method to unregister.
   */
  onPostTick(e, n) {
    const o = { callback: e, removed: !1, keepAlive: n?.keepAlive ?? !1 };
    return this._postTickCallbacks.push(o), o.keepAlive && !this._running && this._start(), {
      stop: () => {
        o.removed = !0;
      }
    };
  }
  // ── Internal: loop management ──────────────────────────────────────
  _start() {
    this._running || (this._running = !0, this._scheduleFrame());
  }
  _stop() {
    this._running && (this._running = !1, this._frameId !== null && (this._scheduler.cancel(this._frameId), this._frameId = null));
  }
  _scheduleFrame() {
    this._frameId = this._scheduler.request((e) => {
      this._tick(e);
    });
  }
  _tick(e) {
    const n = this._entries.slice();
    for (const i of n) {
      if (i.removed) continue;
      if (!i.activated) {
        if (e - i.registeredAt < i.delay) continue;
        i.activated = !0, i.startTime = e;
      }
      const r = e - i.startTime;
      i.callback(r) === !0 && (i.removed = !0);
    }
    this._entries = this._entries.filter((i) => !i.removed);
    for (const i of this._postTickCallbacks)
      i.removed || i.callback(e);
    this._postTickCallbacks = this._postTickCallbacks.filter((i) => !i.removed);
    const o = this._postTickCallbacks.some((i) => !i.removed && i.keepAlive);
    if (this._entries.length === 0 && !o) {
      this._stop();
      return;
    }
    this._scheduleFrame();
  }
}
const io = new Qr(), Ef = {
  linear: _u,
  easeIn: bu,
  easeOut: xu,
  easeInOut: Eu,
  easeCubicIn: Cu,
  easeCubicOut: Su,
  easeCubicInOut: Wr,
  easeCircIn: Au,
  easeCircOut: $u,
  easeCircInOut: Iu,
  easeSinIn: ku,
  easeSinOut: Lu,
  easeSinInOut: Mu,
  easeExpoIn: Pu,
  easeExpoOut: Nu,
  easeExpoInOut: Tu,
  easeBounce: to,
  easeBounceIn: qu,
  easeBounceInOut: Yu,
  easeElastic: Gu,
  easeElasticIn: Uu,
  easeElasticInOut: Zu,
  easeBack: ju,
  easeBackIn: Xu,
  easeBackOut: Wu
};
function ea(t) {
  const e = t ?? "auto";
  return e === !1 ? !1 : e === !0 ? !0 : typeof globalThis < "u" && globalThis.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches === !0;
}
function so(t) {
  return typeof t == "function" ? t : Ef[t ?? "easeInOut"];
}
function at(t, e, n) {
  return t + (e - t) * n;
}
function Ci(t, e, n) {
  return Go(t, e)(n);
}
function En(t) {
  if (typeof t != "string")
    return t;
  if (!t.trim())
    return {};
  const e = {};
  for (const n of t.split(";")) {
    const o = n.trim();
    if (!o) continue;
    const i = o.indexOf(":");
    if (i === -1) continue;
    const r = o.slice(0, i).trim(), s = o.slice(i + 1).trim();
    e[r] = s;
  }
  return e;
}
const as = /^(-?\d+\.?\d*)(px|em|rem|%|vh|vw|pt|cm|mm|in|ex|ch)?$/, ls = /^(#|rgb|hsl)/;
function ta(t, e, n) {
  const o = {}, i = /* @__PURE__ */ new Set([...Object.keys(t), ...Object.keys(e)]);
  for (const r of i) {
    const s = t[r], a = e[r];
    if (s === void 0) {
      o[r] = a;
      continue;
    }
    if (a === void 0) {
      o[r] = s;
      continue;
    }
    const l = as.exec(s), c = as.exec(a);
    if (l && c) {
      const d = parseFloat(l[1]), f = parseFloat(c[1]), u = c[2] ?? "", h = at(d, f, n);
      o[r] = u ? `${h}${u}` : String(h);
      continue;
    }
    if (ls.test(s) && ls.test(a)) {
      o[r] = Ci(s, a, n);
      continue;
    }
    o[r] = n < 0.5 ? s : a;
  }
  return o;
}
function Cf(t, e, n, o) {
  let i = at(t.zoom, e.zoom, n);
  return o?.minZoom !== void 0 && (i = Math.max(i, o.minZoom)), o?.maxZoom !== void 0 && (i = Math.min(i, o.maxZoom)), {
    x: at(t.x, e.x, n),
    y: at(t.y, e.y, n),
    zoom: i
  };
}
class Sf {
  constructor() {
    this._handles = /* @__PURE__ */ new Set();
  }
  register(e) {
    this._handles.add(e);
  }
  unregister(e) {
    this._handles.delete(e);
  }
  getHandles(e) {
    const n = [...this._handles];
    if (!e?.tag && !e?.tags?.length)
      return n;
    const o = /* @__PURE__ */ new Set();
    return e.tag && o.add(e.tag), e.tags && e.tags.forEach((i) => o.add(i)), n.filter((i) => i._tags?.some((r) => o.has(r)) ?? !1);
  }
  cancelAll(e, n) {
    for (const o of this.getHandles(e))
      o.isFinished || o.stop(n);
  }
  pauseAll(e) {
    for (const n of this.getHandles(e))
      n.isFinished || n.pause();
  }
  resumeAll(e) {
    for (const n of this.getHandles(e))
      n.resume();
  }
  clear() {
    this._handles.clear();
  }
  get size() {
    return this._handles.size;
  }
}
class kf {
  constructor() {
    this._handles = [], this._state = "active", this._propertySnapshots = /* @__PURE__ */ new Map(), this._onAfterRollback = null, this.finished = new Promise((e) => {
      this._resolveFinished = e;
    });
  }
  /**
   * @internal
   * Register a callback fired after `rollback()` has reverted all captured
   * properties. Receives the list of keys that were reverted. Used by the
   * canvas layer to flush DOM for the affected nodes — without it, raw-state
   * writes done outside the animation rAF loop never reach the DOM.
   *
   * Not part of the public API — do not call from application code. Canvas
   * wiring is managed internally in `$flow.transaction()`.
   */
  onAfterRollback(e) {
    this._onAfterRollback = e;
  }
  get state() {
    return this._state;
  }
  get handles() {
    return this._handles;
  }
  /** Called by the Animator when a new handle is created inside this transaction. */
  trackHandle(e) {
    this._state === "active" && this._handles.push(e);
  }
  /**
   * Called by the Animator the FIRST time a property key is touched inside this transaction.
   * Captures the pre-transaction value for rollback (lazy snapshot — only first touch per key).
   */
  captureProperty(e, n, o) {
    this._state === "active" && (this._propertySnapshots.has(e) || this._propertySnapshots.set(e, { value: n, apply: o }));
  }
  commit() {
    this._state === "active" && (this._state = "committed", this._resolveFinished());
  }
  rollback() {
    if (this._state !== "active")
      return;
    for (const n of this._handles)
      n.stop({ mode: "freeze" });
    const e = [];
    for (const [n, o] of this._propertySnapshots)
      o.apply(o.value), e.push(n);
    this._state = "rolled-back", this._onAfterRollback?.(e), this._resolveFinished();
  }
}
const an = {
  stiffness: 180,
  damping: 12,
  mass: 1,
  restVelocity: 0.01,
  restDisplacement: 0.01
};
function na(t, e, n) {
  if (n <= 0)
    return;
  const o = e.stiffness ?? an.stiffness, i = e.damping ?? an.damping, r = e.mass ?? an.mass, s = t.value - t.target, a = (-o * s - i * t.velocity) / r;
  t.velocity += a * n, t.value += t.velocity * n, Math.abs(t.velocity) < (e.restVelocity ?? an.restVelocity) && Math.abs(t.value - t.target) < (e.restDisplacement ?? an.restDisplacement) && (t.value = t.target, t.velocity = 0, t.settled = !0);
}
const cs = {
  timeConstant: 350,
  restVelocity: 0.5
};
function Si(t, e, n) {
  if (n <= 0)
    return;
  const o = e.timeConstant ?? cs.timeConstant, i = Math.exp(-n * 1e3 / o);
  t.velocity *= i, t.value += t.velocity * n, Math.abs(t.velocity) < cs.restVelocity && (t.velocity = 0, t.settled = !0, t.target = t.value);
}
function ki(t) {
  const e = t.lastIndexOf("."), n = t.lastIndexOf(":"), o = Math.max(e, n);
  if (o < 0) return null;
  const i = t.slice(o + 1);
  return i.length === 0 || i.length > 6 ? null : i;
}
function oa(t, e, n, o) {
  if (n <= 0)
    return;
  Si(t, {
    velocity: t.velocity,
    power: e.power,
    timeConstant: e.timeConstant
  }, n);
  const i = o ? ki(o) : null;
  if (e.bounds && o) {
    const r = e.bounds[o] ?? (i ? e.bounds[i] : void 0);
    if (r) {
      const [s, a] = r, l = (e.bounceStiffness ?? 200) / 500, c = (e.bounceDamping ?? 40) / 100, d = l * (1 - c);
      t.value < s ? (t.value = s, t.velocity = Math.abs(t.velocity) * d, t.settled = !1) : t.value > a && (t.value = a, t.velocity = -Math.abs(t.velocity) * d, t.settled = !1);
    }
  }
  if (t.settled && e.snapTo?.length && o) {
    let r = t.value, s = 1 / 0;
    for (const a of e.snapTo) {
      const l = a[o] ?? (i ? a[i] : void 0);
      if (l !== void 0) {
        const c = Math.abs(t.value - l);
        c < s && (s = c, r = l);
      }
    }
    t.value = r;
  }
}
function ia(t, e, n, o) {
  const i = ki(o), r = e.values.map(
    (p) => p[o] ?? (i ? p[i] : void 0) ?? t.value
  );
  if (r.length < 2) {
    t.value = r[0] ?? t.value, t.settled = !0;
    return;
  }
  const s = e.offsets ?? r.map((p, g) => g / (r.length - 1)), a = Math.max(0, Math.min(1, n));
  let l = 0;
  for (let p = 0; p < s.length - 1; p++)
    a >= s[p] && (l = p);
  const c = s[l], d = s[l + 1] ?? 1, f = d > c ? (a - c) / (d - c) : 1, u = r[l], h = r[l + 1] ?? r[l];
  t.value = u + (h - u) * Math.max(0, Math.min(1, f)), a >= 1 && (t.value = r[r.length - 1], t.settled = !0);
}
const ds = {
  gentle: { type: "spring", stiffness: 120, damping: 14 },
  wobbly: { type: "spring", stiffness: 180, damping: 12 },
  stiff: { type: "spring", stiffness: 300, damping: 30 },
  slow: { type: "spring", stiffness: 60, damping: 15 },
  molasses: { type: "spring", stiffness: 40, damping: 30 }
}, us = {
  smooth: { type: "decay", velocity: 0, power: 0.6, timeConstant: 400 },
  snappy: { type: "decay", velocity: 0, power: 1.2, timeConstant: 200 }
}, fs = {
  momentum: { type: "inertia", velocity: 0, power: 0.8, timeConstant: 700 },
  rails: { type: "inertia", velocity: 0, bounceStiffness: 500, bounceDamping: 40 }
};
function sa(t) {
  if (typeof t != "string")
    return t;
  const [e, n] = t.split(".");
  if (!n)
    return null;
  switch (e) {
    case "spring":
      return ds[n] ? { ...ds[n] } : null;
    case "decay":
      return us[n] ? { ...us[n] } : null;
    case "inertia":
      return fs[n] ? { ...fs[n] } : null;
    default:
      return null;
  }
}
function hs(t) {
  return typeof t != "string" ? !1 : /^(#|rgb|hsl)/.test(t);
}
function Lf(t, e, n) {
  return typeof t == "number" && typeof e == "number" ? at(t, e, n) : hs(t) && hs(e) ? Ci(t, e, n) : n < 0.5 ? t : e;
}
class Mf {
  constructor(e) {
    this._ownership = /* @__PURE__ */ new Map(), this._groups = /* @__PURE__ */ new Set(), this._nextGroupId = 0, this._registry = new Sf(), this._activeTransaction = null, this._engine = e;
  }
  /** Whether any animations are currently running. */
  get active() {
    return this._groups.size > 0;
  }
  /** The handle registry for tag-based animation control. */
  get registry() {
    return this._registry;
  }
  /** Begin a new transaction — all subsequent `animate()` calls will be tracked until `endTransaction()`. */
  beginTransaction() {
    const e = new kf();
    return this._activeTransaction = e, e;
  }
  /** End the current transaction context (does NOT commit or rollback — the caller decides). */
  endTransaction() {
    this._activeTransaction = null;
  }
  /**
   * Animate a set of property entries over the given duration.
   *
   * If any entry targets a key already being animated, the current in-flight
   * value is captured as the new "from" and the property is removed from the
   * old group (blend/compose).
   */
  animate(e, n) {
    const {
      duration: o,
      easing: i,
      delay: r = 0,
      loop: s = !1,
      startAt: a,
      onStart: l,
      onProgress: c,
      onComplete: d,
      tag: f,
      tags: u,
      while: h,
      whileStopMode: p = "jump-end",
      motion: g,
      maxDuration: m = 5e3
    } = n, y = so(i), x = g ? sa(g) : void 0;
    for (const v of e) {
      const $ = this._ownership.get(v.key);
      if ($ && !$.stopped) {
        const L = $.currentValues.get(v.key);
        L !== void 0 && (v.from = L), $.entries = $.entries.filter((D) => D.key !== v.key), $.entries.length === 0 && this._stop($, "superseded");
      }
    }
    if (this._activeTransaction && this._activeTransaction.state === "active")
      for (const v of e)
        this._activeTransaction.captureProperty(v.key, v.from, v.apply);
    if (o <= 0) {
      const v = /* @__PURE__ */ new Map(), $ = /* @__PURE__ */ new Map();
      for (const z of e)
        v.set(z.key, z.from), $.set(z.key, z.to);
      l?.();
      for (const z of e)
        z.apply(z.to);
      const L = [...f ? [f] : [], ...u ?? []], D = {
        _tags: L.length > 0 ? L : void 0,
        pause: () => {
        },
        resume: () => {
        },
        stop: () => {
        },
        reverse: () => {
        },
        play: () => {
        },
        playForward: () => {
        },
        playBackward: () => {
        },
        restart: () => {
        },
        get direction() {
          return "forward";
        },
        get isFinished() {
          return !0;
        },
        get currentValue() {
          return $;
        },
        finished: Promise.resolve(),
        get _snapshot() {
          return v;
        },
        get _target() {
          return $;
        }
      };
      return this._registry.register(D), queueMicrotask(() => this._registry.unregister(D)), this._activeTransaction && this._activeTransaction.state === "active" && this._activeTransaction.trackHandle(D), d?.(), D;
    }
    const C = /* @__PURE__ */ new Map(), b = /* @__PURE__ */ new Map();
    for (const v of e)
      C.set(v.key, v.from), b.set(v.key, v.to);
    let E;
    if (x) {
      E = /* @__PURE__ */ new Map();
      for (const v of e) {
        if (typeof v.from != "number" || typeof v.to != "number") {
          console.warn(
            `[AlpineFlow] motion: requires numeric properties. "${v.key}" is non-numeric; snapping to target.`
          ), v.apply(v.to);
          continue;
        }
        let $ = 0;
        if (x.type === "decay" || x.type === "inertia") {
          const L = x.velocity;
          if (typeof L == "number")
            $ = L;
          else if (L && typeof L == "object") {
            const z = L, V = ki(v.key);
            $ = z[v.key] ?? (V ? z[V] ?? 0 : 0);
          }
          const D = x.power ?? 0.8;
          $ *= D;
        }
        E.set(v.key, {
          value: v.from,
          velocity: $,
          target: v.to,
          settled: !1
        });
      }
      E.size === 0 && (E = void 0);
    }
    const _ = s === "ping-pong" ? "reverse" : s, S = a === "end" ? "backward" : "forward";
    let N;
    const R = new Promise((v) => {
      N = v;
    }), M = {
      _id: this._nextGroupId++,
      entries: [...e],
      engineHandle: null,
      startTime: 0,
      pausedElapsed: null,
      _resumeNeeded: !1,
      direction: S,
      duration: o,
      easingFn: y,
      loop: _,
      onStart: l,
      startFired: !1,
      onProgress: c,
      onComplete: d,
      resolve: N,
      stopped: !1,
      isFinished: !1,
      currentValues: /* @__PURE__ */ new Map(),
      _lastElapsed: 0,
      _lastTickWallTime: 0,
      snapshot: C,
      target: b,
      _currentFinished: R,
      whilePredicate: h,
      whileStopMode: p,
      motionConfig: E ? x : void 0,
      physicsStates: E,
      maxDuration: m,
      isPhysics: !!E,
      _prevElapsed: 0
    };
    if (a === "end")
      for (const v of M.entries)
        v.apply(v.to), M.currentValues.set(v.key, v.to);
    else
      for (const v of M.entries)
        M.currentValues.set(v.key, v.from);
    for (const v of e)
      this._ownership.set(v.key, M);
    this._groups.add(M);
    const T = this._engine.register((v) => this._tick(M, v), r);
    M.engineHandle = T;
    const P = [...f ? [f] : [], ...u ?? []], w = {
      _tags: P.length > 0 ? P : void 0,
      pause: () => this._pause(M),
      resume: () => this._resume(M),
      stop: (v) => this._stop(M, v?.mode ?? "jump-end"),
      reverse: () => this._reverse(M),
      play: () => this._play(M),
      playForward: () => this._playDirection(M, "forward"),
      playBackward: () => this._playDirection(M, "backward"),
      restart: (v) => this._restart(M, v),
      get direction() {
        return M.direction;
      },
      get isFinished() {
        return M.isFinished;
      },
      get currentValue() {
        return M.currentValues;
      },
      get finished() {
        return M._currentFinished;
      },
      get _snapshot() {
        return M.snapshot;
      },
      get _target() {
        return M.target;
      }
    };
    return this._registry.register(w), M._handle = w, this._activeTransaction && this._activeTransaction.state === "active" && this._activeTransaction.trackHandle(w), w;
  }
  /** Stop all active animations. */
  stopAll(e) {
    const n = e?.mode ?? "jump-end";
    for (const o of this._groups)
      o.stopped || this._stop(o, n);
    this._groups.clear(), this._ownership.clear();
  }
  // ── Internal: tick ───────────────────────────────────────────────────
  /**
   * Per-frame tick for an animation group.
   * @returns `true` when the animation is complete (to unregister from engine).
   */
  _tick(e, n) {
    if (e.stopped)
      return !0;
    if (e.pausedElapsed !== null)
      return;
    if (e.isPhysics)
      return this._tickPhysics(e, n);
    if (e.whilePredicate && !e.whilePredicate())
      return this._stop(e, e.whileStopMode), !0;
    e._resumeNeeded && (e.startTime += n - e._lastElapsed, e._resumeNeeded = !1), e.startTime === 0 && (e.startTime = n), e.startFired || (e.startFired = !0, e.onStart?.()), e._lastElapsed = n, e._lastTickWallTime = typeof performance < "u" ? performance.now() : Date.now();
    const o = n - e.startTime;
    let i = Math.min(o / e.duration, 1);
    if (e.loop && i >= 1)
      if (e.loop === "reverse") {
        const a = o / e.duration, l = Math.floor(a), c = a - l;
        i = l % 2 === 0 ? c : 1 - c;
      } else
        i = o % e.duration / e.duration;
    const r = e.direction === "backward" ? 1 - i : i, s = e.easingFn(r);
    for (const a of e.entries) {
      const l = Lf(a.from, a.to, s);
      e.currentValues.set(a.key, l), a.apply(l);
    }
    if (e.onProgress?.(r), !e.loop && i >= 1) {
      for (const a of e.entries) {
        const l = e.direction === "backward" ? a.from : a.to;
        a.apply(l), e.currentValues.set(a.key, l);
      }
      return this._completeGroup(e), !0;
    }
  }
  /**
   * Mark a group as complete: set flags, clean up, fire callbacks, resolve promise,
   * and schedule auto-deregistration. Shared by both the eased and physics paths.
   */
  _completeGroup(e) {
    if (e.stopped = !0, e.isFinished = !0, this._cleanup(e), e.onComplete?.(), e.resolve?.(), e._handle) {
      const n = e._handle;
      queueMicrotask(() => {
        e.isFinished && this._registry.unregister(n);
      });
    }
  }
  /**
   * Per-frame tick for a physics-based animation group.
   * Runs the physics integrator (spring, etc.) each frame instead of eased interpolation.
   * @returns `true` when the animation is complete (to unregister from engine).
   */
  _tickPhysics(e, n) {
    if (e.whilePredicate && !e.whilePredicate())
      return this._stop(e, e.whileStopMode), !0;
    e._resumeNeeded && (e._resumeNeeded = !1, e._prevElapsed = n, e.startTime = n - (e._lastElapsed - e.startTime)), e.startTime === 0 && (e.startTime = n), e.startFired || (e.startFired = !0, e.onStart?.());
    const o = e._prevElapsed || n, i = Math.min((n - o) / 1e3, 0.064);
    if (e._prevElapsed = n, e._lastElapsed = n, e._lastTickWallTime = typeof performance < "u" ? performance.now() : Date.now(), i <= 0)
      return;
    const r = e.physicsStates;
    let s = !0;
    for (const c of e.entries) {
      const d = r.get(c.key);
      if (d) {
        if (!d.settled) {
          switch (e.direction === "backward" ? d.target = e.snapshot.get(c.key) : d.target = e.target.get(c.key), e.motionConfig.type) {
            case "spring":
              na(d, e.motionConfig, i);
              break;
            case "decay":
              Si(d, e.motionConfig, i);
              break;
            case "inertia":
              oa(d, e.motionConfig, i, c.key);
              break;
            case "keyframes": {
              const f = n - e.startTime, u = e.motionConfig.duration ?? e.maxDuration, h = Math.min(f / u, 1);
              ia(d, e.motionConfig, h, c.key);
              break;
            }
          }
          e.currentValues.set(c.key, d.value), c.apply(d.value);
        }
        d.settled || (s = !1);
      }
    }
    const a = n - e.startTime, l = Math.min(a / e.maxDuration, 1);
    if (e.onProgress?.(l), a >= e.maxDuration) {
      for (const [c, d] of r)
        if (!d.settled) {
          d.value = d.target, d.velocity = 0, d.settled = !0;
          const f = e.entries.find((u) => u.key === c);
          f && (f.apply(d.value), e.currentValues.set(f.key, d.value));
        }
      s = !0;
    }
    if (s)
      return this._completeGroup(e), !0;
  }
  // ── Internal: handle actions ─────────────────────────────────────────
  _pause(e) {
    e.stopped || e.pausedElapsed !== null || e.startTime === 0 || (e.pausedElapsed = e._lastElapsed);
  }
  _resume(e) {
    e.stopped || e.pausedElapsed === null || (e._resumeNeeded = !0, e.pausedElapsed = null);
  }
  _stop(e, n = "jump-end") {
    if (!e.stopped) {
      if (e.stopped = !0, e.engineHandle.stop(), n === "jump-end") {
        for (const o of e.entries) {
          const i = e.direction === "backward" ? o.from : o.to;
          o.apply(i);
        }
        if (e.isPhysics && e.physicsStates)
          for (const [, o] of e.physicsStates)
            o.value = o.target, o.velocity = 0, o.settled = !0;
      } else if (n === "rollback")
        for (const o of e.entries) {
          const i = e.snapshot.get(o.key);
          i !== void 0 && o.apply(i);
        }
      if (this._cleanup(e), n !== "superseded" && e.onComplete?.(), e.resolve?.(), e._handle) {
        const o = e._handle;
        queueMicrotask(() => {
          (e.isFinished || e.stopped) && this._registry.unregister(o);
        });
      }
    }
  }
  _reverse(e) {
    if (e.isFinished) {
      if (e.direction = e.direction === "forward" ? "backward" : "forward", e.isPhysics && e.physicsStates)
        for (const [n, o] of e.physicsStates)
          e.direction === "backward" ? o.target = e.snapshot.get(n) : o.target = e.target.get(n), o.velocity = 0, o.settled = !1;
      this._revive(e);
      return;
    }
    if (!e.stopped) {
      if (e.direction = e.direction === "forward" ? "backward" : "forward", e.isPhysics && e.physicsStates) {
        for (const [n, o] of e.physicsStates)
          e.direction === "backward" ? o.target = e.snapshot.get(n) : o.target = e.target.get(n), o.velocity = 0, o.settled = !1;
        return;
      }
      if (e._lastElapsed === 0 && e.startTime === 0) {
        e.startTime = -e.duration;
        return;
      }
      if (e._lastElapsed > 0) {
        const n = this._estimatedCurrentElapsed(e), o = Math.min((n - e.startTime) / e.duration, 1);
        e.startTime = n - (1 - o) * e.duration;
      }
    }
  }
  /**
   * Best estimate of the current elapsed time for a group, accounting for
   * wall-clock time that has passed since the last engine tick. Used by
   * reverse/restart/play-direction paths that run synchronously from user
   * input between ticks — without this correction, _lastElapsed can be up
   * to 16ms stale and causes a visible direction-flip jump.
   */
  _estimatedCurrentElapsed(e) {
    if (e._lastTickWallTime <= 0) return e._lastElapsed;
    const n = typeof performance < "u" ? performance.now() : Date.now(), o = Math.max(0, n - e._lastTickWallTime);
    return e._lastElapsed + Math.min(o, 32);
  }
  _play(e) {
    if (e.isFinished) {
      this._revive(e);
      return;
    }
    e.stopped || e.pausedElapsed !== null && this._resume(e);
  }
  _playDirection(e, n) {
    const o = e.direction !== n;
    if (e.direction = n, e.isFinished) {
      this._revive(e);
      return;
    }
    if (!e.stopped) {
      if (o && e.isPhysics && e.physicsStates)
        for (const [i, r] of e.physicsStates)
          n === "backward" ? r.target = e.snapshot.get(i) : r.target = e.target.get(i), r.velocity = 0, r.settled = !1;
      else if (o && e._lastElapsed > 0) {
        const i = this._estimatedCurrentElapsed(e), r = Math.min((i - e.startTime) / e.duration, 1);
        e.startTime = i - (1 - r) * e.duration;
      }
      e.pausedElapsed !== null && this._resume(e);
    }
  }
  _restart(e, n) {
    const o = n?.direction ?? "forward";
    if (e.direction = o, o === "forward")
      for (const i of e.entries) {
        const r = e.snapshot.get(i.key);
        r !== void 0 && (i.apply(r), e.currentValues.set(i.key, r));
      }
    else
      for (const i of e.entries) {
        const r = e.target.get(i.key);
        r !== void 0 && (i.apply(r), e.currentValues.set(i.key, r));
      }
    if (e.isPhysics && e.physicsStates)
      for (const [i, r] of e.physicsStates)
        o === "forward" ? (r.value = e.snapshot.get(i), r.target = e.target.get(i)) : (r.value = e.target.get(i), r.target = e.snapshot.get(i)), r.velocity = 0, r.settled = !1;
    this._revive(e);
  }
  /** Revive a finished/stopped group: reset timing, re-register on engine, renew promise. */
  _revive(e) {
    if (e.isFinished = !1, e.stopped = !1, e.startTime = 0, e.startFired = !1, e.pausedElapsed = null, e._resumeNeeded = !1, e._lastElapsed = 0, e._prevElapsed = 0, e.isPhysics && e.physicsStates)
      for (const [o, i] of e.physicsStates)
        i.settled && (e.direction === "forward" ? (i.value = e.snapshot.get(o), i.target = e.target.get(o)) : (i.value = e.target.get(o), i.target = e.snapshot.get(o)), i.velocity = 0, i.settled = !1);
    this._renewFinished(e);
    for (const o of e.entries)
      this._ownership.set(o.key, e);
    this._groups.add(e), e._handle && this._registry.register(e._handle);
    const n = this._engine.register((o) => this._tick(e, o));
    e.engineHandle = n;
  }
  /** Create a new finished promise for the group (old one stays resolved). */
  _renewFinished(e) {
    e.resolve = null;
    const n = new Promise((o) => {
      e.resolve = o;
    });
    e._currentFinished = n;
  }
  // ── Internal: cleanup ────────────────────────────────────────────────
  _cleanup(e) {
    for (const n of e.entries) {
      const o = this._ownership.get(n.key);
      o && o._id === e._id && this._ownership.delete(n.key);
    }
    this._groups.delete(e);
  }
}
const ra = /* @__PURE__ */ new Map();
function Pf(t, e) {
  ra.set(t, e);
}
function Ao(t) {
  return t.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function Yt(t) {
  return typeof t == "string" ? { type: t } : t;
}
function Xt(t, e) {
  return `${e}__${t.type}__${(t.color ?? Ei).replace(/[^a-zA-Z0-9]/g, "_")}`;
}
function ro(t, e) {
  const n = Ao(t.color ?? Ei), o = Number(t.width ?? 12.5), i = Number(t.height ?? 12.5), r = Number.isFinite(o) && o > 0 ? o : 12.5, s = Number.isFinite(i) && i > 0 ? i : 12.5, a = Ao(t.orient ?? "auto-start-reverse"), l = Ao(e);
  if (t.type === "arrow")
    return `<marker
      id="${l}"
      viewBox="-10 -10 20 20"
      markerWidth="${r}"
      markerHeight="${s}"
      orient="${a}"
      markerUnits="strokeWidth"
      refX="0"
      refY="0"
    >
      <polyline
        stroke="${n}"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1"
        fill="none"
        points="-5,-4 0,0 -5,4"
      />
    </marker>`;
  if (t.type === "arrowclosed")
    return `<marker
      id="${l}"
      viewBox="-10 -10 20 20"
      markerWidth="${r}"
      markerHeight="${s}"
      orient="${a}"
      markerUnits="strokeWidth"
      refX="0"
      refY="0"
    >
      <polyline
        stroke="${n}"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1"
        fill="${n}"
        points="-5,-4 0,0 -5,4 -5,-4"
      />
    </marker>`;
  const c = ra.get(t.type);
  return c ? c({ id: l, color: n, width: r, height: s, orient: a }) : ro({ ...t, type: "arrowclosed" }, e);
}
const St = 200, kt = 150, Nf = 1.2, ln = "http://www.w3.org/2000/svg";
function Tf(t, e) {
  const { getState: n, setViewport: o, config: i } = e, r = i.minimapPosition ?? "bottom-right", s = i.minimapMaskColor, a = i.minimapNodeColor, l = document.createElement("div");
  l.className = `flow-minimap flow-minimap-${r}`;
  const c = document.createElementNS(ln, "svg");
  c.setAttribute("width", String(St)), c.setAttribute("height", String(kt));
  const d = document.createElementNS(ln, "rect");
  d.classList.add("flow-minimap-bg"), d.setAttribute("width", String(St)), d.setAttribute("height", String(kt));
  const f = document.createElementNS(ln, "g");
  f.classList.add("flow-minimap-nodes");
  const u = document.createElementNS(ln, "path");
  u.classList.add("flow-minimap-mask"), s && u.setAttribute("fill", s), u.setAttribute("fill-rule", "evenodd"), c.appendChild(d), c.appendChild(f), c.appendChild(u), l.appendChild(c), t.appendChild(l);
  let h = { x: 0, y: 0, width: 0, height: 0 }, p = 1;
  function g() {
    const T = n();
    if (h = Gt(T.nodes.filter((P) => !P.hidden), i.nodeOrigin), h.width === 0 && h.height === 0) {
      p = 1;
      return;
    }
    p = Math.max(
      h.width / St,
      h.height / kt
    ) * Nf;
  }
  function m(T) {
    return typeof a == "function" ? a(T) : a;
  }
  function y() {
    const T = n();
    g(), f.innerHTML = "";
    const P = (St - h.width / p) / 2, w = (kt - h.height / p) / 2;
    for (const v of T.nodes) {
      if (v.hidden) continue;
      const $ = document.createElementNS(ln, "rect"), L = (v.dimensions?.width ?? we) / p, D = (v.dimensions?.height ?? _e) / p, z = (v.position.x - h.x) / p + P, V = (v.position.y - h.y) / p + w;
      $.setAttribute("x", String(z)), $.setAttribute("y", String(V)), $.setAttribute("width", String(L)), $.setAttribute("height", String(D)), $.setAttribute("rx", "2");
      const I = m(v);
      I && ($.style.fill = I), f.appendChild($);
    }
    x();
  }
  function x() {
    const T = e.getViewportState ? e.getViewportState() : n();
    if (h.width === 0 && h.height === 0) {
      u.setAttribute("d", "");
      return;
    }
    const P = (St - h.width / p) / 2, w = (kt - h.height / p) / 2, v = (-T.viewport.x / T.viewport.zoom - h.x) / p + P, $ = (-T.viewport.y / T.viewport.zoom - h.y) / p + w, L = T.containerWidth / T.viewport.zoom / p, D = T.containerHeight / T.viewport.zoom / p, z = `M0,0 H${St} V${kt} H0 Z`, V = `M${v},${$} h${L} v${D} h${-L} Z`;
    u.setAttribute("d", `${z} ${V}`);
  }
  let C = !1;
  function b(T, P) {
    const w = (St - h.width / p) / 2, v = (kt - h.height / p) / 2, $ = (T - w) * p + h.x, L = (P - v) * p + h.y;
    return { x: $, y: L };
  }
  function E(T) {
    const P = c.getBoundingClientRect(), w = T.clientX - P.left, v = T.clientY - P.top, $ = n(), L = b(w, v), D = -L.x * $.viewport.zoom + $.containerWidth / 2, z = -L.y * $.viewport.zoom + $.containerHeight / 2;
    o({ x: D, y: z, zoom: $.viewport.zoom });
  }
  function _(T) {
    i.minimapPannable && (C = !0, c.setPointerCapture(T.pointerId), E(T));
  }
  function S(T) {
    C && E(T);
  }
  function N(T) {
    C && (C = !1, c.releasePointerCapture(T.pointerId));
  }
  c.addEventListener("pointerdown", _), c.addEventListener("pointermove", S), c.addEventListener("pointerup", N);
  function R(T) {
    if (!i.minimapZoomable)
      return;
    T.preventDefault();
    const P = n(), w = i.minZoom ?? 0.5, v = i.maxZoom ?? 2, $ = T.deltaY > 0 ? 0.9 : 1.1, L = Math.min(Math.max(P.viewport.zoom * $, w), v);
    o({ zoom: L });
  }
  c.addEventListener("wheel", R, { passive: !1 });
  function M() {
    c.removeEventListener("pointerdown", _), c.removeEventListener("pointermove", S), c.removeEventListener("pointerup", N), c.removeEventListener("wheel", R), l.remove();
  }
  return { render: y, updateViewport: x, destroy: M };
}
const Af = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>', $f = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>', If = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>', gs = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></svg>', Df = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>', Rf = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>', ps = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9V3h6"/><path d="M21 9V3h-6"/><path d="M3 15v6h6"/><path d="M21 15v6h-6"/></svg>', Hf = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3v6H3"/><path d="M15 3v6h6"/><path d="M9 21v-6H3"/><path d="M15 21v-6h6"/></svg>';
function Ff(t, e) {
  const {
    position: n,
    orientation: o,
    showZoom: i,
    showFitView: r,
    showInteractive: s,
    showResetPanels: a,
    external: l,
    onZoomIn: c,
    onZoomOut: d,
    onFitView: f,
    onToggleInteractive: u,
    onResetPanels: h,
    onToggleFullscreen: p
  } = e, g = document.createElement("div"), m = [
    "flow-controls",
    `flow-controls-${o}`
  ];
  l ? m.push("flow-controls-external") : m.push(`flow-controls-${n}`), g.className = m.join(" "), g.setAttribute("role", "toolbar"), g.setAttribute("aria-label", "Flow controls");
  let y = null, x = null;
  if (i) {
    const E = It(Af, "Zoom in", c), _ = It($f, "Zoom out", d);
    g.appendChild(E), g.appendChild(_);
  }
  if (r) {
    const E = It(If, "Fit view", f);
    g.appendChild(E);
  }
  if (s && (y = It(gs, "Toggle interactivity", u), g.appendChild(y)), a) {
    const E = It(Rf, "Reset panels", h);
    g.appendChild(E);
  }
  p && (x = It(ps, "Toggle fullscreen", p), x.classList.add("flow-controls-button-fullscreen"), g.appendChild(x)), g.addEventListener("mousedown", (E) => E.stopPropagation()), g.addEventListener("pointerdown", (E) => E.stopPropagation()), g.addEventListener("wheel", (E) => E.stopPropagation(), { passive: !1 }), t.appendChild(g);
  function C(E) {
    if (y && typeof E.isInteractive == "boolean") {
      oi(y, E.isInteractive ? gs : Df);
      const _ = E.isInteractive ? "Lock interactivity" : "Unlock interactivity";
      y.title = _, y.setAttribute("aria-label", _);
    }
    if (x && typeof E.isFullscreen == "boolean") {
      oi(x, E.isFullscreen ? Hf : ps);
      const _ = E.isFullscreen ? "Exit fullscreen" : "Enter fullscreen";
      x.title = _, x.setAttribute("aria-label", _), x.classList.toggle("flow-controls-button-fullscreen--active", E.isFullscreen);
    }
  }
  function b() {
    g.remove();
  }
  return { update: C, destroy: b };
}
function It(t, e, n) {
  const o = document.createElement("button");
  return o.type = "button", oi(o, t), o.title = e, o.setAttribute("aria-label", e), o.addEventListener("click", n), o;
}
function oi(t, e) {
  const o = new DOMParser().parseFromString(e, "image/svg+xml").documentElement;
  t.replaceChildren(o);
}
const ms = 5;
function Of(t) {
  const e = document.createElement("div");
  e.className = "flow-selection-box", t.appendChild(e);
  let n = !1, o = 0, i = 0, r = 0, s = 0;
  function a(u, h, p = "partial") {
    o = u, i = h, r = u, s = h, n = !0, e.style.left = `${u}px`, e.style.top = `${h}px`, e.style.width = "0px", e.style.height = "0px", e.classList.remove("flow-selection-partial", "flow-selection-full"), e.classList.add("flow-selection-box-active", `flow-selection-${p}`);
  }
  function l(u, h) {
    if (!n)
      return;
    r = u, s = h;
    const p = Math.min(o, r), g = Math.min(i, s), m = Math.abs(r - o), y = Math.abs(s - i);
    e.style.left = `${p}px`, e.style.top = `${g}px`, e.style.width = `${m}px`, e.style.height = `${y}px`;
  }
  function c(u) {
    if (!n)
      return null;
    n = !1, e.classList.remove("flow-selection-box-active"), e.classList.remove("flow-selection-partial", "flow-selection-full");
    const h = Math.abs(r - o), p = Math.abs(s - i);
    if (h < ms && p < ms)
      return null;
    const g = Math.min(o, r), m = Math.min(i, s), y = (g - u.x) / u.zoom, x = (m - u.y) / u.zoom, C = h / u.zoom, b = p / u.zoom;
    return { x: y, y: x, width: C, height: b };
  }
  function d() {
    return n;
  }
  function f() {
    e.remove();
  }
  return { start: a, update: l, end: c, isActive: d, destroy: f };
}
const ys = 3;
function zf(t) {
  const e = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  e.classList.add("flow-lasso-svg"), e.setAttribute("width", "100%"), e.setAttribute("height", "100%"), t.appendChild(e);
  const n = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
  n.classList.add("flow-lasso-path"), e.appendChild(n);
  let o = !1, i = [];
  function r(d, f, u = "partial") {
    o = !0, i = [{ x: d, y: f }], e.classList.remove("flow-lasso-partial", "flow-lasso-full"), e.classList.add("flow-lasso-active", `flow-lasso-${u}`), n.setAttribute("points", `${d},${f}`);
  }
  function s(d, f) {
    if (!o)
      return;
    const u = i[i.length - 1], h = d - u.x, p = f - u.y;
    h * h + p * p < ys * ys || (i.push({ x: d, y: f }), n.setAttribute("points", i.map((g) => `${g.x},${g.y}`).join(" ")));
  }
  function a(d) {
    if (!o || (o = !1, e.classList.remove("flow-lasso-active", "flow-lasso-partial", "flow-lasso-full"), n.setAttribute("points", ""), i.length < 3))
      return null;
    const f = i.map((u) => ({
      x: (u.x - d.x) / d.zoom,
      y: (u.y - d.y) / d.zoom
    }));
    return i = [], f;
  }
  function l() {
    return o;
  }
  function c() {
    e.remove();
  }
  return { start: r, update: s, end: a, isActive: l, destroy: c };
}
function Li(t, e, n) {
  if (n.length < 3) return !1;
  let o = !1;
  for (let i = 0, r = n.length - 1; i < n.length; r = i++) {
    const s = n[i].x, a = n[i].y, l = n[r].x, c = n[r].y;
    a > e != c > e && t < (l - s) * (e - a) / (c - a) + s && (o = !o);
  }
  return o;
}
function Vf(t, e, n, o, i, r, s, a) {
  const l = n - t, c = o - e, d = s - i, f = a - r, u = l * f - c * d;
  if (Math.abs(u) < 1e-10) return !1;
  const h = i - t, p = r - e, g = (h * f - p * d) / u, m = (h * c - p * l) / u;
  return g >= 0 && g <= 1 && m >= 0 && m <= 1;
}
function Bf(t, e) {
  const n = e.x, o = e.y, i = e.x + e.width, r = e.y + e.height, s = n + e.width / 2, a = o + e.height / 2;
  if (Li(s, a, t)) return !0;
  for (const c of t)
    if (c.x >= n && c.x <= i && c.y >= o && c.y <= r) return !0;
  const l = [
    [n, o, i, o],
    // top
    [i, o, i, r],
    // right
    [i, r, n, r],
    // bottom
    [n, r, n, o]
    // left
  ];
  for (let c = 0, d = t.length - 1; c < t.length; d = c++)
    for (const [f, u, h, p] of l)
      if (Vf(t[d].x, t[d].y, t[c].x, t[c].y, f, u, h, p))
        return !0;
  return !1;
}
function aa(t) {
  const e = t.dimensions?.width ?? we, n = t.dimensions?.height ?? _e;
  return t.rotation ? xo(t.position.x, t.position.y, e, n, t.rotation) : { x: t.position.x, y: t.position.y, width: e, height: n };
}
function qf(t, e) {
  return e.length < 3 ? [] : t.filter((n) => {
    if (n.hidden || n.selectable === !1) return !1;
    const o = aa(n);
    return Bf(e, o);
  });
}
function Yf(t, e) {
  return e.length < 3 ? [] : t.filter((n) => {
    if (n.hidden || n.selectable === !1) return !1;
    const o = aa(n);
    return [
      { x: o.x, y: o.y },
      { x: o.x + o.width, y: o.y },
      { x: o.x + o.width, y: o.y + o.height },
      { x: o.x, y: o.y + o.height }
    ].every((r) => Li(r.x, r.y, e));
  });
}
function Xf(t, e) {
  return e.filter((n) => n.source === t || n.target === t);
}
function ii(t, e, n) {
  const o = new Set(
    n.filter((i) => i.source === t).map((i) => i.target)
  );
  return e.filter((i) => o.has(i.id));
}
function Wf(t, e, n) {
  const o = new Set(
    n.filter((i) => i.target === t).map((i) => i.source)
  );
  return e.filter((i) => o.has(i.id));
}
function jf(t, e, n) {
  if (t === e) return !0;
  const o = /* @__PURE__ */ new Map();
  for (const s of n) {
    let a = o.get(s.source);
    a || (a = [], o.set(s.source, a)), a.push(s.target);
  }
  const i = [e], r = /* @__PURE__ */ new Set();
  for (; i.length > 0; ) {
    const s = i.pop();
    if (s === t) return !0;
    if (r.has(s)) continue;
    r.add(s);
    const a = o.get(s);
    if (a)
      for (const l of a)
        r.has(l) || i.push(l);
  }
  return !1;
}
function Uf(t, e, n, o = !1) {
  return n.some((i) => o ? i.source === t && i.target === e : i.source === t && i.target === e || i.source === e && i.target === t);
}
function Gf(t, e, n) {
  const o = new Map(e.map((l) => [l.id, l])), i = new Set(
    n.map((l) => `${l.source}|${l.target}|${l.sourceHandle ?? ""}|${l.targetHandle ?? ""}`)
  ), r = [], s = /* @__PURE__ */ new Set();
  let a = 0;
  for (const l of t) {
    if (o.get(l)?.reconnectOnDelete === !1) continue;
    const d = n.filter(
      (u) => u.target === l && !t.has(u.source)
    ), f = n.filter(
      (u) => u.source === l && !t.has(u.target)
    );
    if (!(d.length === 0 || f.length === 0))
      for (const u of d)
        for (const h of f) {
          if (u.source === h.target) continue;
          const p = `${u.source}|${h.target}|${u.sourceHandle ?? ""}|${h.targetHandle ?? ""}`;
          if (i.has(p) || s.has(p)) continue;
          const g = {
            id: `reconnect-${u.source}-${h.target}-${a++}`,
            source: u.source,
            target: h.target,
            sourceHandle: u.sourceHandle,
            targetHandle: h.targetHandle
          };
          u.type && (g.type = u.type), u.animated !== void 0 && (g.animated = u.animated), u.style && (g.style = u.style), u.class && (g.class = u.class), u.markerEnd && (g.markerEnd = u.markerEnd), u.markerStart && (g.markerStart = u.markerStart), u.label && (g.label = u.label), s.add(p), r.push(g);
        }
  }
  return r;
}
function vt(t, e, n) {
  if (!e) return !0;
  const o = n.get(t.source), i = n.get(t.target);
  if (!o || !i) return !0;
  const { byType: r } = e;
  if (r) {
    const s = o.type ?? "";
    if (Object.prototype.hasOwnProperty.call(r, s) && !r[s].includes(i.type ?? ""))
      return !1;
  }
  return !(typeof e.validate == "function" && !e.validate(t, o, i));
}
function _t(t, e, n) {
  return !(t.source === t.target || e.some(
    (i) => i.source === t.source && i.target === t.target && i.sourceHandle === t.sourceHandle && i.targetHandle === t.targetHandle
  ) || n?.preventCycles && jf(t.source, t.target, e));
}
const Ue = "_flowHandleValidate";
function Zf(t) {
  t.directive(
    "flow-handle-validate",
    (e, { expression: n }, { evaluate: o, effect: i, cleanup: r }) => {
      function s() {
        let a;
        try {
          a = o(n);
        } catch {
          const l = t.$data(e);
          l && typeof l[n] == "function" && (a = l[n]);
        }
        typeof a == "function" ? e[Ue] = a : (delete e[Ue], requestAnimationFrame(() => {
          const l = t.$data(e);
          l && typeof l[n] == "function" && (e[Ue] = l[n]);
        }));
      }
      i(() => {
        s();
      }), r(() => {
        delete e[Ue];
      });
    }
  );
}
const mt = "_flowHandleLimit";
function Kf(t) {
  t.directive(
    "flow-handle-limit",
    (e, { expression: n }, { evaluate: o, effect: i, cleanup: r }) => {
      i(() => {
        const s = Number(o(n));
        s > 0 ? e[mt] = s : delete e[mt];
      }), r(() => {
        delete e[mt];
      });
    }
  );
}
const At = "_flowHandleConnectableStart", lt = "_flowHandleConnectableEnd";
function Jf(t) {
  t.directive(
    "flow-handle-connectable",
    (e, { expression: n, modifiers: o }, { evaluate: i, effect: r, cleanup: s }) => {
      const a = o.includes("start"), l = o.includes("end"), c = a || !a && !l, d = l || !a && !l;
      r(() => {
        const f = n ? !!i(n) : !0;
        c && (e[At] = f), d && (e[lt] = f);
      }), s(() => {
        delete e[At], delete e[lt];
      });
    }
  );
}
function Pn(t, e, n = !0) {
  return e !== void 0 ? e : t.locked ? !1 : n;
}
function la(t) {
  return Pn(t, t.draggable);
}
function Qf(t) {
  return Pn(t, t.deletable);
}
function Ye(t) {
  return Pn(t, t.connectable);
}
function si(t) {
  return Pn(t, t.selectable);
}
function ws(t) {
  return Pn(t, t.resizable);
}
function Zt(t, e, n, o, i, r, s) {
  const a = n - t, l = o - e, c = i - n, d = r - o;
  if (a === 0 && c === 0 || l === 0 && d === 0)
    return `L${n},${o}`;
  const f = Math.sqrt(a * a + l * l), u = Math.sqrt(c * c + d * d), h = Math.min(s, f / 2, u / 2), p = n - a / f * h, g = o - l / f * h, m = n + c / u * h, y = o + d / u * h;
  return `L${p},${g} Q${n},${o} ${m},${y}`;
}
function Nn({
  sourceX: t,
  sourceY: e,
  targetX: n,
  targetY: o
}) {
  const i = Math.abs(n - t) / 2, r = Math.abs(o - e) / 2;
  return {
    x: (t + n) / 2,
    y: (e + o) / 2,
    offsetX: i,
    offsetY: r
  };
}
function On(t, e) {
  return t >= 0 ? 0.5 * t : e * 25 * Math.sqrt(-t);
}
function eh({
  sourceX: t,
  sourceY: e,
  sourcePosition: n = "bottom",
  targetX: o,
  targetY: i,
  targetPosition: r = "top",
  curvature: s = 0.25
}) {
  const a = n === "left" || n === "right", l = r === "left" || r === "right", c = a ? t + (n === "right" ? 1 : -1) * On(
    n === "right" ? o - t : t - o,
    s
  ) : t, d = a ? e : e + (n === "bottom" ? 1 : -1) * On(
    n === "bottom" ? i - e : e - i,
    s
  ), f = l ? o + (r === "right" ? 1 : -1) * On(
    r === "right" ? t - o : o - t,
    s
  ) : o, u = l ? i : i + (r === "bottom" ? 1 : -1) * On(
    r === "bottom" ? e - i : i - e,
    s
  );
  return [c, d, f, u];
}
function ao(t) {
  const { sourceX: e, sourceY: n, targetX: o, targetY: i } = t, [r, s, a, l] = eh(t), c = `M${e},${n} C${r},${s} ${a},${l} ${o},${i}`, { x: d, y: f, offsetX: u, offsetY: h } = Nn({ sourceX: e, sourceY: n, targetX: o, targetY: i });
  return {
    path: c,
    labelPosition: { x: d, y: f },
    labelOffsetX: u,
    labelOffsetY: h
  };
}
function ww({
  sourceX: t,
  sourceY: e,
  targetX: n,
  targetY: o
}) {
  const i = (t + n) / 2, r = `M${t},${e} C${i},${e} ${i},${o} ${n},${o}`, { x: s, y: a, offsetX: l, offsetY: c } = Nn({ sourceX: t, sourceY: e, targetX: n, targetY: o });
  return {
    path: r,
    labelPosition: { x: s, y: a },
    labelOffsetX: l,
    labelOffsetY: c
  };
}
function vs(t) {
  switch (t) {
    case "top":
    case "top-left":
    case "top-right":
      return { x: 0, y: -1 };
    case "bottom":
    case "bottom-left":
    case "bottom-right":
      return { x: 0, y: 1 };
    case "left":
      return { x: -1, y: 0 };
    case "right":
      return { x: 1, y: 0 };
  }
}
function th(t, e, n, o, i, r, s) {
  const a = vs(n), l = vs(r), c = t + a.x * s, d = e + a.y * s, f = o + l.x * s, u = i + l.y * s, h = n === "left" || n === "right";
  if (h === (r === "left" || r === "right")) {
    const g = (c + f) / 2, m = (d + u) / 2;
    return h ? [
      [c, e],
      [g, e],
      [g, i],
      [f, i]
    ] : [
      [t, d],
      [t, m],
      [o, m],
      [o, u]
    ];
  }
  return h ? [
    [c, e],
    [o, e],
    [o, u]
  ] : [
    [t, d],
    [t, i],
    [f, i]
  ];
}
function Cn({
  sourceX: t,
  sourceY: e,
  sourcePosition: n = "bottom",
  targetX: o,
  targetY: i,
  targetPosition: r = "top",
  borderRadius: s = 5,
  offset: a = 10
}) {
  const l = th(
    t,
    e,
    n,
    o,
    i,
    r,
    a
  );
  let c = `M${t},${e}`;
  for (let p = 0; p < l.length; p++) {
    const [g, m] = l[p];
    if (s > 0 && p > 0 && p < l.length - 1) {
      const [y, x] = p === 1 ? [t, e] : l[p - 1], [C, b] = l[p + 1];
      c += ` ${Zt(y, x, g, m, C, b, s)}`;
    } else
      c += ` L${g},${m}`;
  }
  c += ` L${o},${i}`;
  const { x: d, y: f, offsetX: u, offsetY: h } = Nn({ sourceX: t, sourceY: e, targetX: o, targetY: i });
  return {
    path: c,
    labelPosition: { x: d, y: f },
    labelOffsetX: u,
    labelOffsetY: h
  };
}
function nh(t) {
  return Cn({ ...t, borderRadius: 0 });
}
function ca({
  sourceX: t,
  sourceY: e,
  targetX: n,
  targetY: o
}) {
  const i = `M${t},${e} L${n},${o}`, { x: r, y: s, offsetX: a, offsetY: l } = Nn({ sourceX: t, sourceY: e, targetX: n, targetY: o });
  return {
    path: i,
    labelPosition: { x: r, y: s },
    labelOffsetX: a,
    labelOffsetY: l
  };
}
const ut = 40;
function oh(t, e, n, o) {
  let i = 0, r = 0;
  const s = t - n.left, a = n.right - t, l = e - n.top, c = n.bottom - e;
  return s < ut && s >= 0 ? i = -o * (1 - s / ut) : a < ut && a >= 0 && (i = o * (1 - a / ut)), l < ut && l >= 0 ? r = -o * (1 - l / ut) : c < ut && c >= 0 && (r = o * (1 - c / ut)), { dx: i, dy: r };
}
function da(t) {
  const { container: e, speed: n, onPan: o } = t;
  let i = null, r = 0, s = 0, a = !1;
  function l() {
    if (!a)
      return;
    const c = e.getBoundingClientRect(), { dx: d, dy: f } = oh(r, s, c, n);
    if ((d !== 0 || f !== 0) && o(d, f) === !0) {
      a = !1, i = null;
      return;
    }
    i = requestAnimationFrame(l);
  }
  return {
    start() {
      a || t.isLocked?.() || (a = !0, i = requestAnimationFrame(l));
    },
    stop() {
      a = !1, i !== null && (cancelAnimationFrame(i), i = null);
    },
    updatePointer(c, d) {
      r = c, s = d;
    },
    destroy() {
      this.stop();
    }
  };
}
function Kt(t) {
  const e = t.connectionLineType ?? "straight", o = {
    stroke: (t.invalid ? (t.containerEl ? getComputedStyle(t.containerEl).getPropertyValue("--flow-connection-line-invalid").trim() : "") || Jr : null) ?? t.connectionLineStyle?.stroke ?? ((t.containerEl ? getComputedStyle(t.containerEl).getPropertyValue("--flow-edge-stroke-selected").trim() : "") || xn),
    strokeWidth: t.connectionLineStyle?.strokeWidth ?? Number(wf),
    strokeDasharray: t.connectionLineStyle?.strokeDasharray ?? vf
  }, i = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  i.setAttribute("class", "flow-connect-line"), i.style.cssText = "position:absolute;top:0;left:0;width:1px;height:1px;overflow:visible;pointer-events:none;z-index:1000;";
  let r = null;
  function s(l) {
    const c = {
      ...l,
      connectionLineType: e,
      connectionLineStyle: o
    };
    if (t.connectionLine) {
      r && r.remove(), r = t.connectionLine(c), i.appendChild(r);
      return;
    }
    r || (r = document.createElementNS("http://www.w3.org/2000/svg", "path"), r.setAttribute("fill", "none"), i.appendChild(r)), r.setAttribute("stroke", o.stroke), r.setAttribute("stroke-width", String(o.strokeWidth)), r.setAttribute("stroke-dasharray", o.strokeDasharray);
    const { fromX: d, fromY: f, toX: u, toY: h } = l;
    let p;
    switch (e) {
      case "bezier": {
        p = ao({ sourceX: d, sourceY: f, targetX: u, targetY: h }).path;
        break;
      }
      case "smoothstep": {
        p = Cn({ sourceX: d, sourceY: f, targetX: u, targetY: h }).path;
        break;
      }
      case "step": {
        p = nh({ sourceX: d, sourceY: f, targetX: u, targetY: h }).path;
        break;
      }
      default: {
        p = ca({ sourceX: d, sourceY: f, targetX: u, targetY: h }).path;
        break;
      }
    }
    r.setAttribute("d", p);
  }
  function a() {
    i.remove();
  }
  return { svg: i, update: s, destroy: a };
}
function Sn(t) {
  if (t.connectionSnapRadius <= 0)
    return { element: null, position: t.cursorFlowPos };
  if (t.index) {
    const s = t.connectionMode === "loose" ? t.index.all : t.index.byType(t.handleType);
    let a = null, l = t.cursorFlowPos, c = t.connectionSnapRadius;
    for (const d of s) {
      if (d.nodeId === t.excludeNodeId || t.targetNodeId && d.nodeId !== t.targetNodeId) continue;
      const f = t.getNode(d.nodeId);
      if (f && !Ye(f) || (t.handleType === "target" ? !d.connectableEnd : !d.connectableStart)) continue;
      const u = t.cursorFlowPos.x - d.flowX, h = t.cursorFlowPos.y - d.flowY, p = Math.sqrt(u * u + h * h);
      p < c && (c = p, a = d.el, l = { x: d.flowX, y: d.flowY });
    }
    return { element: a, position: l };
  }
  const e = t.connectionMode === "loose" ? "[data-flow-handle-type]" : `[data-flow-handle-type="${t.handleType}"]`, n = t.containerEl.querySelectorAll(e);
  let o = null, i = t.cursorFlowPos, r = t.connectionSnapRadius;
  return n.forEach((s) => {
    const a = s, l = a.closest("[x-flow-node]");
    if (!l || l.dataset.flowNodeId === t.excludeNodeId || t.targetNodeId && l.dataset.flowNodeId !== t.targetNodeId) return;
    const c = l.dataset.flowNodeId;
    if (c) {
      const p = t.getNode(c);
      if (p && !Ye(p)) return;
    }
    const d = t.handleType === "target" ? lt : At;
    if (a[d] === !1) return;
    const f = a.getBoundingClientRect();
    if (f.width === 0 && f.height === 0) return;
    const u = t.toFlowPosition(
      f.left + f.width / 2,
      f.top + f.height / 2
    ), h = Math.sqrt(
      (t.cursorFlowPos.x - u.x) ** 2 + (t.cursorFlowPos.y - u.y) ** 2
    );
    h < r && (r = h, o = a, i = u);
  }), { element: o, position: i };
}
function Eo(t, e, n, o) {
  if (e._config?.autoPanOnConnect === !1) return null;
  const i = da({
    container: t,
    speed: e._config?.autoPanSpeed ?? 15,
    onPan(r, s) {
      const a = () => e._viewportLive ?? e.viewport, l = { x: a().x, y: a().y };
      e._panZoom?.setViewport({
        x: a().x - r,
        y: a().y - s,
        zoom: a().zoom
      });
      const c = l.x - a().x, d = l.y - a().y;
      return c === 0 && d === 0;
    }
  });
  return i.updatePointer(n, o), i.start(), i;
}
function ih(t, e, n, o) {
  const i = o ? t.edges.filter((c) => c.id !== o) : t.edges, r = /* @__PURE__ */ new Set(), s = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map();
  for (const c of i) {
    const d = `${c.source}|${c.sourceHandle ?? "source"}`, f = `${c.target}|${c.targetHandle ?? "target"}`;
    s.set(d, (s.get(d) ?? 0) + 1), a.set(f, (a.get(f) ?? 0) + 1), c.source === e && c.sourceHandle === n && r.add(`${c.target}|${c.targetHandle}`);
  }
  const l = /* @__PURE__ */ new Set();
  if (t._config?.preventCycles) {
    const c = /* @__PURE__ */ new Map();
    for (const f of i) {
      let u = c.get(f.target);
      u || (u = [], c.set(f.target, u)), u.push(f.source);
    }
    const d = [e];
    for (; d.length > 0; ) {
      const f = d.pop();
      if (!l.has(f)) {
        l.add(f);
        for (const u of c.get(f) ?? [])
          d.push(u);
      }
    }
  }
  return { existingTargets: r, cycleForbidden: l, sourceCounts: s, targetCounts: a };
}
function ua(t, e) {
  const n = [], o = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), r = t.querySelectorAll("[data-flow-handle-type]");
  for (const l of r) {
    const c = l.closest("[data-flow-node-id]");
    if (!c) continue;
    let d = i.get(c);
    if (d === void 0 && (d = c.dataset.flowNodeId ?? null, i.set(c, d)), !d) continue;
    const f = l.getBoundingClientRect();
    if (f.width === 0 && f.height === 0) continue;
    const u = l.dataset.flowHandleType, h = e(f.left + f.width / 2, f.top + f.height / 2), p = {
      el: l,
      nodeId: d,
      handleId: l.dataset.flowHandleId ?? u,
      type: u,
      isMirror: l.classList.contains("flow-schema-handle--mirror"),
      flowX: h.x,
      flowY: h.y,
      connectableStart: l[At] !== !1,
      connectableEnd: l[lt] !== !1,
      hasValidator: l[Ue] != null,
      limit: l[mt] ?? null
    };
    n.push(p);
    const g = `${d}|${p.handleId}|${u}`, m = o.get(g);
    (!m || m.isMirror && !p.isMirror) && o.set(g, p);
  }
  const s = n.filter((l) => l.type === "source"), a = n.filter((l) => l.type === "target");
  return {
    all: n,
    byType: (l) => l === "source" ? s : a,
    get: (l, c, d) => o.get(`${l}|${c}|${d}`)
  };
}
let pn = 0;
const zn = /* @__PURE__ */ new WeakMap();
function it(t, e) {
  const n = t.querySelector(
    `[data-flow-node-id="${CSS.escape(e.source)}"]`
  );
  if (n) {
    const i = e.sourceHandle ?? "source", r = n.querySelector(
      `[data-flow-handle-id="${CSS.escape(i)}"][data-flow-handle-type="source"]`
    ) ?? n.querySelector(`[data-flow-handle-id="${CSS.escape(i)}"]`);
    if (r?.[Ue] && !r[Ue](e))
      return !1;
  }
  const o = t.querySelector(
    `[data-flow-node-id="${CSS.escape(e.target)}"]`
  );
  if (o) {
    const i = e.targetHandle ?? "target", r = o.querySelector(
      `[data-flow-handle-id="${CSS.escape(i)}"][data-flow-handle-type="target"]`
    ) ?? o.querySelector(`[data-flow-handle-id="${CSS.escape(i)}"]`);
    if (r?.[Ue] && !r[Ue](e))
      return !1;
  }
  return !0;
}
function st(t, e, n) {
  const o = t.querySelector(
    `[data-flow-node-id="${CSS.escape(e.source)}"]`
  );
  if (o) {
    const r = e.sourceHandle ?? "source", s = o.querySelector(
      `[data-flow-handle-id="${CSS.escape(r)}"][data-flow-handle-type="source"]`
    ) ?? o.querySelector(`[data-flow-handle-id="${CSS.escape(r)}"]`);
    if (s?.[mt] && n.filter(
      (l) => l.source === e.source && (l.sourceHandle ?? "source") === (e.sourceHandle ?? "source")
    ).length >= s[mt])
      return !1;
  }
  const i = t.querySelector(
    `[data-flow-node-id="${CSS.escape(e.target)}"]`
  );
  if (i) {
    const r = e.targetHandle ?? "target", s = i.querySelector(
      `[data-flow-handle-id="${CSS.escape(r)}"][data-flow-handle-type="target"]`
    ) ?? i.querySelector(`[data-flow-handle-id="${CSS.escape(r)}"]`);
    if (s?.[mt] && n.filter(
      (l) => l.target === e.target && (l.targetHandle ?? "target") === (e.targetHandle ?? "target")
    ).length >= s[mt])
      return !1;
  }
  return !0;
}
function kn(t, e, n, o, i, r) {
  if (!r) {
    sh(t, e, n, o, i);
    return;
  }
  const s = ih(o, e, n, i), a = r.get(e, n, "source"), l = a?.limit != null && (s.sourceCounts.get(`${e}|${n}`) ?? 0) >= a.limit, c = [];
  for (const d of r.byType("target")) {
    if (!d.connectableEnd) {
      c.push({ el: d.el, valid: !1, limitHit: !1 });
      continue;
    }
    const f = {
      source: e,
      sourceHandle: n,
      target: d.nodeId,
      targetHandle: d.handleId
    }, h = o.getNode(d.nodeId)?.connectable !== !1 && d.nodeId !== e && !s.existingTargets.has(`${d.nodeId}|${d.handleId}`) && !s.cycleForbidden.has(d.nodeId), p = r.get(d.nodeId, d.handleId, "target") ?? d;
    let g = h && !l;
    g && p.limit != null && (g = (s.targetCounts.get(`${d.nodeId}|${d.handleId}`) ?? 0) < p.limit);
    let m = g;
    m && a?.hasValidator && (m = !!a.el[Ue](f)), m && p.hasValidator && (m = !!p.el[Ue](f));
    const y = m && (!o._config?.isValidConnection || o._config.isValidConnection(f));
    c.push({ el: d.el, valid: y, limitHit: h && !g });
  }
  for (const d of c)
    d.el.classList.toggle("flow-handle-valid", d.valid), d.el.classList.toggle("flow-handle-invalid", !d.valid), d.el.classList.toggle("flow-handle-limit-reached", d.limitHit);
}
function sh(t, e, n, o, i) {
  const r = i ? o.edges.filter((a) => a.id !== i) : o.edges, s = t.querySelectorAll('[data-flow-handle-type="target"]');
  for (const a of s) {
    const c = a.closest("[x-flow-node]")?.dataset.flowNodeId;
    if (!c) continue;
    const d = a.dataset.flowHandleId ?? "target";
    if (a[lt] === !1) {
      a.classList.add("flow-handle-invalid"), a.classList.remove("flow-handle-valid", "flow-handle-limit-reached");
      continue;
    }
    const f = {
      source: e,
      sourceHandle: n,
      target: c,
      targetHandle: d
    }, h = o.getNode(c)?.connectable !== !1 && _t(f, r, { preventCycles: o._config?.preventCycles }), p = h && st(t, f, r);
    p && it(t, f) && (!o._config?.isValidConnection || o._config.isValidConnection(f)) ? (a.classList.add("flow-handle-valid"), a.classList.remove("flow-handle-invalid", "flow-handle-limit-reached")) : (a.classList.add("flow-handle-invalid"), a.classList.remove("flow-handle-valid"), h && !p ? a.classList.add("flow-handle-limit-reached") : a.classList.remove("flow-handle-limit-reached"));
  }
}
function Le(t) {
  const e = t.querySelectorAll('[data-flow-handle-type="target"]');
  for (const n of e)
    n.classList.remove("flow-handle-valid", "flow-handle-invalid", "flow-handle-limit-reached");
}
function Nt(t, e) {
  t && (e ? t.classList.add("flow-connect-line--validating") : t.classList.remove("flow-connect-line--validating"));
}
function Te(t, e) {
  const n = {
    source: e.source,
    target: e.target,
    sourceHandle: e.sourceHandle,
    targetHandle: e.targetHandle,
    reason: e.reason
  };
  t && (e.reason !== void 0 ? console.warn("[alpineflow] connection rejected:", e.reason) : console.warn("[alpineflow] connection rejected"), t.dispatchEvent(new CustomEvent("flow-connect-rejected", {
    detail: n,
    bubbles: !0
  })));
}
async function Co(t, e, n, o, i, r) {
  if (!t) return { allowed: !0 };
  n?.classList.add(r), o?.classList.add(r), i.dispatchEvent(new CustomEvent("flow-connect-validating", {
    detail: { connection: e },
    bubbles: !0
  }));
  let s;
  try {
    s = await t(e);
  } catch (c) {
    B("connection", "connectValidator threw", c), s = !1;
  } finally {
    n?.classList.remove(r), o?.classList.remove(r);
  }
  const a = typeof s == "boolean" ? s : !!s?.allowed, l = typeof s == "object" && s && "reason" in s ? s.reason : void 0;
  return i.dispatchEvent(new CustomEvent("flow-connect-validated", {
    detail: { connection: e, allowed: a, reason: l },
    bubbles: !0
  })), { allowed: a, reason: l };
}
async function fa(t) {
  const { edge: e, newConnection: n, canvas: o, containerEl: i } = t, r = t.endpoint ?? "target", s = o.edges.filter(
    (c) => c.id !== e.id
  ), a = (c) => (Te(i, {
    source: n.source,
    target: n.target,
    sourceHandle: n.sourceHandle,
    targetHandle: n.targetHandle,
    reason: c
  }), { applied: !1, reason: c });
  if (!_t(n, s, { preventCycles: o._config?.preventCycles }) || !vt(n, o._config?.connectionRules, o._nodeMap) || !st(i, n, s) || !it(i, n) || o._config?.isValidConnection && !o._config.isValidConnection(n))
    return a();
  const l = o._config?.connectValidator;
  if (l) {
    const c = o._config?.validatingHandleClass ?? "flow-handle-validating", { sourceEl: d, targetEl: f } = So(i, n);
    o._connectValidating = !0;
    let u;
    try {
      u = await Co(
        l,
        n,
        d,
        f,
        i,
        c
      );
    } finally {
      o._connectValidating = !1;
    }
    if (!u.allowed)
      return a(u.reason);
  }
  return o._captureHistory?.(), r === "source" ? (e.source = n.source, e.sourceHandle = n.sourceHandle) : (e.target = n.target, e.targetHandle = n.targetHandle), { applied: !0 };
}
async function ha(t) {
  const { connection: e, canvas: n, containerEl: o } = t, i = n.edges, r = (d) => (Te(o, {
    source: e.source,
    target: e.target,
    sourceHandle: e.sourceHandle,
    targetHandle: e.targetHandle,
    reason: d
  }), { applied: !1, reason: d }), s = n.getNode?.(e.target);
  if (s && !Ye(s) || !_t(e, i, { preventCycles: n._config?.preventCycles }) || !vt(e, n._config?.connectionRules, n._nodeMap) || !st(o, e, i) || !it(o, e) || n._config?.isValidConnection && !n._config.isValidConnection(e))
    return r();
  const a = n._config?.connectValidator;
  if (a) {
    const d = n._config?.validatingHandleClass ?? "flow-handle-validating", { sourceEl: f, targetEl: u } = So(o, e);
    n._connectValidating = !0;
    let h;
    try {
      h = await Co(
        a,
        e,
        f,
        u,
        o,
        d
      );
    } finally {
      n._connectValidating = !1;
    }
    if (!h.allowed)
      return r(h.reason);
  }
  const c = { id: `e-${e.source}-${e.target}-${Date.now()}-${pn++}`, ...e };
  return n.addEdges(c), n._emit?.("connect", { connection: e }), { applied: !0, edge: c };
}
function So(t, e) {
  const n = t.querySelector(
    `[data-flow-node-id="${CSS.escape(e.source)}"]`
  ), o = e.sourceHandle ?? "source", i = n?.querySelector(
    `[data-flow-handle-id="${CSS.escape(o)}"][data-flow-handle-type="source"]`
  ) ?? n?.querySelector(`[data-flow-handle-id="${CSS.escape(o)}"]`) ?? null, r = t.querySelector(
    `[data-flow-node-id="${CSS.escape(e.target)}"]`
  ), s = e.targetHandle ?? "target", a = r?.querySelector(
    `[data-flow-handle-id="${CSS.escape(s)}"][data-flow-handle-type="target"]`
  ) ?? r?.querySelector(`[data-flow-handle-id="${CSS.escape(s)}"]`) ?? null;
  return { sourceEl: i, targetEl: a };
}
const yt = /* @__PURE__ */ new WeakMap();
function ga(t, e, n) {
  n.preventDefault(), n.stopPropagation();
  const o = t.dataset.flowHandleId ?? "source", i = t.closest("[x-flow-node]");
  if (!e || !i || e._animationLocked) return;
  const r = i.dataset.flowNodeId;
  if (!r) return;
  const s = e.getNode(r);
  if (s && !Ye(s) || t[At] === !1) return;
  const a = n.clientX, l = n.clientY;
  let c = !1;
  if (e.pendingConnection && e._config?.connectOnClick !== !1) {
    e._emit("connect-end", {
      connection: null,
      source: e.pendingConnection.source,
      sourceHandle: e.pendingConnection.sourceHandle,
      position: { x: 0, y: 0 }
    }), e.pendingConnection = null, e._container?.classList.remove("flow-connecting");
    const T = t.closest(".flow-container");
    T && Le(T);
  }
  let d = null, f = null, u = null, h = null, p = null;
  const g = e._config?.connectionSnapRadius ?? 20, m = t.closest(".flow-container");
  let y = null, x = 0, C = 0, b = !1, E = /* @__PURE__ */ new Map();
  const _ = () => {
    if (c = !0, B("connection", `Connection drag started from node "${r}" handle "${o}"`), e._emit("connect-start", { source: r, sourceHandle: o }), !m) return;
    f = Kt({
      connectionLineType: e._config?.connectionLineType,
      connectionLineStyle: e._config?.connectionLineStyle,
      connectionLine: e._config?.connectionLine,
      containerEl: m
    }), d = f.svg;
    const T = t.getBoundingClientRect(), P = m.getBoundingClientRect(), w = e._viewportLive ?? e.viewport, v = w?.zoom || 1, $ = w?.x || 0, L = w?.y || 0;
    x = (T.left + T.width / 2 - P.left - $) / v, C = (T.top + T.height / 2 - P.top - L) / v, f.update({ fromX: x, fromY: C, toX: x, toY: C, source: r, sourceHandle: o });
    const D = m.querySelector(".flow-viewport");
    if (D && D.appendChild(d), e.pendingConnection = {
      source: r,
      sourceHandle: o,
      position: { x, y: C }
    }, h = Eo(m, e, a, l), y = ua(
      m,
      (z, V) => e.screenToFlowPosition(z, V)
    ), kn(m, r, o, e, void 0, y), e._config?.onEdgeDrop) {
      const z = e._config.edgeDropPreview, I = z ? z({ source: r, sourceHandle: o }) : "New Node";
      if (I !== null) {
        p = document.createElement("div"), p.className = "flow-ghost-node";
        const k = document.createElement("div");
        if (k.className = "flow-ghost-handle", p.appendChild(k), typeof I == "string") {
          const O = document.createElement("span");
          O.textContent = I, p.appendChild(O);
        } else
          p.appendChild(I);
        p.style.left = `${x}px`, p.style.top = `${C}px`;
        const A = m.querySelector(".flow-viewport");
        A && A.appendChild(p);
      }
    }
  }, S = () => {
    const T = [...e.selectedNodes], P = [], w = m.getBoundingClientRect(), v = e._viewportLive ?? e.viewport, $ = v?.zoom || 1, L = v?.x || 0, D = v?.y || 0;
    for (const z of T) {
      if (z === r) continue;
      const I = m?.querySelector(`[data-flow-node-id="${CSS.escape(z)}"]`)?.querySelector('[data-flow-handle-type="source"]');
      if (!I) continue;
      const k = I.getBoundingClientRect();
      P.push({
        nodeId: z,
        handleId: I.dataset.flowHandleId ?? "source",
        pos: {
          x: (k.left + k.width / 2 - w.left - L) / $,
          y: (k.top + k.height / 2 - w.top - D) / $
        }
      });
    }
    return P;
  }, N = (T) => {
    b = !0, f && (E.set(r, {
      line: f,
      sourceNodeId: r,
      sourceHandleId: o,
      sourcePos: { x, y: C },
      valid: !0
    }), f = null);
    const P = S(), w = m.querySelector(".flow-viewport");
    for (const v of P) {
      const $ = Kt({
        connectionLineType: e._config?.connectionLineType,
        connectionLineStyle: e._config?.connectionLineStyle,
        connectionLine: e._config?.connectionLine,
        containerEl: m
      });
      $.update({
        fromX: v.pos.x,
        fromY: v.pos.y,
        toX: T.x,
        toY: T.y,
        source: v.nodeId,
        sourceHandle: v.handleId
      }), w && w.appendChild($.svg), E.set(v.nodeId, {
        line: $,
        sourceNodeId: v.nodeId,
        sourceHandleId: v.handleId,
        sourcePos: v.pos,
        valid: !0
      });
    }
  }, R = (T) => {
    if (!c) {
      const v = T.clientX - a, $ = T.clientY - l;
      if (Math.abs(v) >= oo || Math.abs($) >= oo) {
        if (_(), e._config?.multiConnect && e.selectedNodes.size > 1 && e.selectedNodes.has(r)) {
          const L = e.screenToFlowPosition(T.clientX, T.clientY);
          N(L);
        }
      } else
        return;
    }
    const P = e.screenToFlowPosition(T.clientX, T.clientY);
    if (b) {
      const v = Sn({
        containerEl: m,
        handleType: "target",
        excludeNodeId: r,
        cursorFlowPos: P,
        connectionSnapRadius: g,
        getNode: (V) => e.getNode(V),
        toFlowPosition: (V, I) => e.screenToFlowPosition(V, I),
        connectionMode: e._config?.connectionMode,
        index: y ?? void 0
      });
      v.element !== u && (u?.classList.remove("flow-handle-active"), v.element?.classList.add("flow-handle-active"), u = v.element);
      const L = v.element?.closest("[x-flow-node]")?.dataset.flowNodeId ?? null, D = v.element?.dataset.flowHandleId ?? "target", z = e._config?.connectionLineStyle?.stroke ?? (getComputedStyle(m).getPropertyValue("--flow-edge-stroke-selected").trim() || xn);
      for (const V of E.values())
        if (V.line.update({
          fromX: V.sourcePos.x,
          fromY: V.sourcePos.y,
          toX: v.position.x,
          toY: v.position.y,
          source: V.sourceNodeId,
          sourceHandle: V.sourceHandleId
        }), v.element && L) {
          const I = {
            source: V.sourceNodeId,
            sourceHandle: V.sourceHandleId,
            target: L,
            targetHandle: D
          }, G = e.getNode(L)?.connectable !== !1 && V.sourceNodeId !== L && _t(I, e.edges, { preventCycles: e._config?.preventCycles }) && vt(I, e._config?.connectionRules, e._nodeMap) && st(m, I, e.edges) && it(m, I) && (!e._config?.isValidConnection || e._config.isValidConnection(I));
          V.valid = G;
          const U = V.line.svg.querySelector("path");
          if (U)
            if (G)
              U.setAttribute("stroke", z);
            else {
              const Z = getComputedStyle(m).getPropertyValue("--flow-connection-line-invalid").trim() || Jr;
              U.setAttribute("stroke", Z);
            }
        } else {
          V.valid = !0;
          const I = V.line.svg.querySelector("path");
          I && I.setAttribute("stroke", z);
        }
      e.pendingConnection = { ...e.pendingConnection, position: v.position }, h?.updatePointer(T.clientX, T.clientY);
      return;
    }
    const w = Sn({
      containerEl: m,
      handleType: "target",
      excludeNodeId: r,
      cursorFlowPos: P,
      connectionSnapRadius: g,
      getNode: (v) => e.getNode(v),
      toFlowPosition: (v, $) => e.screenToFlowPosition(v, $),
      index: y ?? void 0
    });
    w.element !== u && (u?.classList.remove("flow-handle-active"), w.element?.classList.add("flow-handle-active"), u = w.element), p ? w.element ? (p.style.display = "none", f?.update({ fromX: x, fromY: C, toX: w.position.x, toY: w.position.y, source: r, sourceHandle: o })) : (p.style.display = "", p.style.left = `${P.x}px`, p.style.top = `${P.y}px`, f?.update({ fromX: x, fromY: C, toX: P.x, toY: P.y, source: r, sourceHandle: o })) : f?.update({ fromX: x, fromY: C, toX: w.position.x, toY: w.position.y, source: r, sourceHandle: o }), e.pendingConnection = { ...e.pendingConnection, position: w.position }, h?.updatePointer(T.clientX, T.clientY);
  }, M = async (T) => {
    if (h?.stop(), h = null, document.removeEventListener("pointermove", R), document.removeEventListener("pointerup", M), document.removeEventListener("pointercancel", M), yt.delete(t), y = null, e._connectValidating) return;
    if (b) {
      const $ = e.screenToFlowPosition(T.clientX, T.clientY);
      let L = u;
      L || (L = document.elementFromPoint(T.clientX, T.clientY)?.closest('[data-flow-handle-type="target"]'));
      const z = L?.closest("[x-flow-node]")?.dataset.flowNodeId ?? null, V = L?.dataset.flowHandleId ?? "target", I = [], k = [], A = [], O = [];
      if (L && z) {
        const j = e.getNode(z);
        for (const Q of E.values()) {
          const G = {
            source: Q.sourceNodeId,
            sourceHandle: Q.sourceHandleId,
            target: z,
            targetHandle: V
          };
          if (j?.connectable !== !1 && Q.sourceNodeId !== z && _t(G, e.edges, { preventCycles: e._config?.preventCycles }) && vt(G, e._config?.connectionRules, e._nodeMap) && st(m, G, e.edges) && it(m, G) && (!e._config?.isValidConnection || e._config.isValidConnection(G))) {
            const K = `e-${Q.sourceNodeId}-${z}-${Date.now()}-${pn++}`;
            I.push({ id: K, ...G }), k.push(G), O.push(Q);
          } else
            A.push(Q);
        }
      } else
        A.push(...E.values());
      for (const j of O)
        j.line.destroy();
      if (I.length > 0) {
        e.addEdges(I);
        for (const j of k)
          e._emit("connect", { connection: j });
        e._emit("multi-connect", { connections: k });
      }
      A.length > 0 && setTimeout(() => {
        for (const j of A)
          j.line.destroy();
      }, 100), u?.classList.remove("flow-handle-active"), e._emit("connect-end", {
        connection: k.length > 0 ? k[0] : null,
        source: r,
        sourceHandle: o,
        position: $
      }), E.clear(), b = !1, Le(m), e.pendingConnection = null, e._container?.classList.remove("flow-connecting");
      return;
    }
    if (!c) {
      e._config?.connectOnClick !== !1 && (B("connection", `Click-to-connect started from node "${r}" handle "${o}"`), e._emit("connect-start", { source: r, sourceHandle: o }), e.pendingConnection = {
        source: r,
        sourceHandle: o,
        position: { x: 0, y: 0 }
      }, e._container?.classList.add("flow-connecting"), kn(m, r, o, e, void 0, y ?? void 0));
      return;
    }
    const P = f?.svg ?? null;
    p?.remove(), p = null, u?.classList.remove("flow-handle-active"), Le(m);
    const w = e.screenToFlowPosition(T.clientX, T.clientY), v = { source: r, sourceHandle: o, position: w };
    try {
      let $ = u;
      if ($ || ($ = document.elementFromPoint(T.clientX, T.clientY)?.closest('[data-flow-handle-type="target"]')), $) {
        const D = $.closest("[x-flow-node]")?.dataset.flowNodeId, z = $.dataset.flowHandleId ?? "target";
        if (D) {
          if ($[lt] === !1) {
            B("connection", "Connection rejected (handle not connectable end)"), e._emit("connect-end", { connection: null, ...v }), e.pendingConnection = null;
            return;
          }
          const V = e.getNode(D);
          if (V && !Ye(V)) {
            B("connection", `Connection rejected (target "${D}" not connectable)`), e._emit("connect-end", { connection: null, ...v }), e.pendingConnection = null;
            return;
          }
          const I = {
            source: r,
            sourceHandle: o,
            target: D,
            targetHandle: z
          };
          if (_t(I, e.edges, { preventCycles: e._config?.preventCycles })) {
            if (!vt(I, e._config?.connectionRules, e._nodeMap)) {
              B("connection", "Connection rejected (connection rules)", I), Te(m, I), e._emit("connect-end", { connection: null, ...v }), e.pendingConnection = null;
              return;
            }
            if (!st(m, I, e.edges)) {
              B("connection", "Connection rejected (handle limit)", I), Te(m, I), e._emit("connect-end", { connection: null, ...v }), e.pendingConnection = null;
              return;
            }
            if (!it(m, I)) {
              B("connection", "Connection rejected (per-handle validator)", I), Te(m, I), e._emit("connect-end", { connection: null, ...v }), e.pendingConnection = null;
              return;
            }
            if (e._config?.isValidConnection && !e._config.isValidConnection(I)) {
              B("connection", "Connection rejected (custom validator)", I), Te(m, I), e._emit("connect-end", { connection: null, ...v }), e.pendingConnection = null;
              return;
            }
            const k = e._config?.connectValidator;
            if (k) {
              const O = e._config?.validatingHandleClass ?? "flow-handle-validating", { sourceEl: j, targetEl: Q } = So(m, I);
              e._connectValidating = !0, Nt(P, !0);
              let G;
              try {
                G = await Co(
                  k,
                  I,
                  j,
                  Q,
                  m,
                  O
                );
              } finally {
                e._connectValidating = !1, Nt(P, !1);
              }
              if (!G.allowed) {
                B("connection", "Connection rejected (async connectValidator)", { connection: I, reason: G.reason }), Te(m, { ...I, reason: G.reason }), e._emit("connect-end", { connection: null, ...v }), e.pendingConnection = null;
                return;
              }
            }
            const A = `e-${r}-${D}-${Date.now()}-${pn++}`;
            e.addEdges({ id: A, ...I }), B("connection", `Connection created: ${r} → ${D}`, I), e._emit("connect", { connection: I }), e._emit("connect-end", { connection: I, ...v });
          } else
            B("connection", "Connection rejected (invalid)", I), Te(m, I), e._emit("connect-end", { connection: null, ...v });
        } else
          e._emit("connect-end", { connection: null, ...v });
      } else if (e._config?.onEdgeDrop) {
        const L = {
          x: w.x - we / 2,
          y: w.y - _e / 2
        }, D = e._config.onEdgeDrop({
          source: r,
          sourceHandle: o,
          position: L
        });
        if (D) {
          const z = {
            source: r,
            sourceHandle: o,
            target: D.id,
            targetHandle: "target"
          };
          if (!st(m, z, e.edges))
            B("connection", "Edge drop: connection rejected (handle limit)"), e._emit("connect-end", { connection: null, ...v });
          else if (!it(m, z))
            B("connection", "Edge drop: connection rejected (per-handle validator)"), e._emit("connect-end", { connection: null, ...v });
          else if (!e._config.isValidConnection || e._config.isValidConnection(z)) {
            e.addNodes(D);
            const V = `e-${r}-${D.id}-${Date.now()}-${pn++}`;
            e.addEdges({ id: V, ...z }), B("connection", `Edge drop: created node "${D.id}" and edge`, z), e._emit("connect", { connection: z }), e._emit("connect-end", { connection: z, ...v });
          } else
            B("connection", "Edge drop: connection rejected by validator"), e._emit("connect-end", { connection: null, ...v });
        } else
          B("connection", "Edge drop: callback returned null"), e._emit("connect-end", { connection: null, ...v });
      } else
        B("connection", "Connection cancelled (no target)"), e._emit("connect-end", { connection: null, ...v });
    } finally {
      Nt(P, !1), f?.destroy(), f = null;
    }
    e.pendingConnection = null;
  };
  document.addEventListener("pointermove", R), document.addEventListener("pointerup", M), document.addEventListener("pointercancel", M), yt.set(t, () => {
    document.removeEventListener("pointermove", R), document.removeEventListener("pointerup", M), document.removeEventListener("pointercancel", M), h?.stop(), f?.destroy(), f = null, p?.remove(), p = null;
    for (const T of E.values())
      T.line.destroy();
    E.clear(), b = !1, u?.classList.remove("flow-handle-active"), Le(m), y = null, e.pendingConnection = null, e._container?.classList.remove("flow-connecting");
  });
}
function pa(t, e, n) {
  if (n.button !== 0) return;
  const o = t.dataset.flowHandleId ?? "target", r = t.closest("[x-flow-node]")?.getAttribute("data-flow-node-id") ?? null;
  if (!e || !r || e._animationLocked || e._config?.edgesReconnectable === !1 || e._pendingReconnection) return;
  const s = e.edges.filter(
    (I) => I.target === r && (I.targetHandle ?? "target") === o
  );
  if (s.length === 0) return;
  const a = s.find((I) => I.selected) ?? (s.length === 1 ? s[0] : null);
  if (!a) return;
  const l = a.reconnectable ?? !0;
  if (l === !1 || l === "source") return;
  n.preventDefault(), n.stopPropagation();
  const c = n.clientX, d = n.clientY;
  let f = !1, u = !1, h = null;
  const p = e._config?.connectionSnapRadius ?? 20, g = t.closest(".flow-container");
  if (!g) return;
  const m = g.querySelector(
    `[data-flow-node-id="${CSS.escape(a.source)}"]`
  ), y = a.sourceHandle ? `[data-flow-handle-id="${CSS.escape(a.sourceHandle)}"]` : '[data-flow-handle-type="source"]', x = m?.querySelector(y), C = g.getBoundingClientRect(), b = e._viewportLive ?? e.viewport, E = b?.zoom || 1, _ = b?.x || 0, S = b?.y || 0;
  let N, R;
  if (x) {
    const I = x.getBoundingClientRect();
    N = (I.left + I.width / 2 - C.left - _) / E, R = (I.top + I.height / 2 - C.top - S) / E;
  } else {
    const I = e.getNode(a.source);
    if (!I) return;
    const k = I.dimensions?.width ?? we, A = I.dimensions?.height ?? _e;
    N = I.position.x + k / 2, R = I.position.y + A;
  }
  let M = null, T = null, P = null, w = c, v = d, $ = null;
  const L = () => {
    f = !0;
    const I = g.querySelector(
      `[data-flow-edge-id="${a.id}"]`
    );
    I && I.classList.add("flow-edge-reconnecting"), e._emit("reconnect-start", { edge: a, handleType: "target" }), B("reconnect", `Reconnection drag started from target handle on edge "${a.id}"`), T = Kt({
      connectionLineType: e._config?.connectionLineType,
      connectionLineStyle: e._config?.connectionLineStyle,
      connectionLine: e._config?.connectionLine,
      containerEl: g
    }), M = T.svg;
    const k = e.screenToFlowPosition(c, d);
    T.update({
      fromX: N,
      fromY: R,
      toX: k.x,
      toY: k.y,
      source: a.source,
      sourceHandle: a.sourceHandle
    });
    const A = g.querySelector(".flow-viewport");
    A && A.appendChild(M), e.pendingConnection = {
      source: a.source,
      sourceHandle: a.sourceHandle,
      position: k
    }, e._pendingReconnection = {
      edge: a,
      draggedEnd: "target",
      anchorPosition: { x: N, y: R },
      position: k
    }, P = Eo(g, e, w, v), $ = ua(
      g,
      (O, j) => e.screenToFlowPosition(O, j)
    ), kn(g, a.source, a.sourceHandle ?? "source", e, a.id, $);
  }, D = (I) => {
    if (w = I.clientX, v = I.clientY, !f) {
      Math.sqrt(
        (I.clientX - c) ** 2 + (I.clientY - d) ** 2
      ) >= oo && L();
      return;
    }
    const k = e.screenToFlowPosition(I.clientX, I.clientY), A = Sn({
      containerEl: g,
      handleType: "target",
      excludeNodeId: a.source,
      cursorFlowPos: k,
      connectionSnapRadius: p,
      getNode: (O) => e.getNode(O),
      toFlowPosition: (O, j) => e.screenToFlowPosition(O, j),
      index: $ ?? void 0
    });
    A.element !== h && (h?.classList.remove("flow-handle-active"), A.element?.classList.add("flow-handle-active"), h = A.element), T?.update({
      fromX: N,
      fromY: R,
      toX: A.position.x,
      toY: A.position.y,
      source: a.source,
      sourceHandle: a.sourceHandle
    }), e.pendingConnection && (e.pendingConnection = {
      ...e.pendingConnection,
      position: A.position
    }), e._pendingReconnection && (e._pendingReconnection = {
      ...e._pendingReconnection,
      position: A.position
    }), P?.updatePointer(I.clientX, I.clientY);
  }, z = () => {
    if (u) return;
    u = !0, document.removeEventListener("pointermove", D), document.removeEventListener("pointerup", V), document.removeEventListener("pointercancel", V), P?.stop(), P = null, T?.destroy(), T = null, M = null, $ = null, h?.classList.remove("flow-handle-active"), yt.delete(t);
    const I = g.querySelector(
      `[data-flow-edge-id="${a.id}"]`
    );
    I && I.classList.remove("flow-edge-reconnecting"), Le(g), e.pendingConnection = null, e._pendingReconnection = null;
  }, V = async (I) => {
    if (!f) {
      z();
      return;
    }
    if (e._connectValidating) return;
    let k = h;
    k || (k = document.elementFromPoint(I.clientX, I.clientY)?.closest('[data-flow-handle-type="target"]'));
    let A = !1;
    if (k) {
      const j = k.closest("[x-flow-node]")?.dataset.flowNodeId, Q = k.dataset.flowHandleId;
      if (j && e.getNode(j)?.connectable !== !1) {
        const U = {
          source: a.source,
          sourceHandle: a.sourceHandle,
          target: j,
          targetHandle: Q
        }, Z = { ...a }, H = T?.svg ?? null;
        Nt(H, !0);
        let q;
        try {
          q = await fa({
            edge: a,
            newConnection: U,
            canvas: e,
            containerEl: g,
            endpoint: "target"
          });
        } finally {
          Nt(H, !1);
        }
        q.applied ? (A = !0, B("reconnect", `Edge "${a.id}" reconnected (target)`, U), e._emit("reconnect", { oldEdge: Z, newConnection: U })) : B("reconnect", "Reconnection rejected", { connection: U, reason: q.reason });
      }
    }
    A || B("reconnect", `Edge "${a.id}" reconnection cancelled — snapping back`), e._emit("reconnect-end", { edge: a, successful: A }), z();
  };
  document.addEventListener("pointermove", D), document.addEventListener("pointerup", V), document.addEventListener("pointercancel", V), yt.set(t, z);
}
function rh(t, e, n) {
  t.dataset.flowHandleType === "source" ? ga(t, e, n) : pa(t, e, n);
}
function _s(t) {
  return t?._config?.delegatedHandleEvents === !1;
}
function ah(t) {
  t.directive(
    "flow-handle",
    (e, { value: n, modifiers: o, expression: i }, { evaluate: r, effect: s, cleanup: a }) => {
      const l = n === "source" ? "source" : "target", c = o.includes("top"), d = o.includes("bottom"), f = o.includes("left"), u = o.includes("right"), h = c || d || f || u;
      let p;
      c && f ? p = "top-left" : c && u ? p = "top-right" : d && f ? p = "bottom-left" : d && u ? p = "bottom-right" : c ? p = "top" : u ? p = "right" : d ? p = "bottom" : f ? p = "left" : p = e.getAttribute("data-flow-handle-position") ?? (l === "source" ? "bottom" : "top");
      let g, m = !1;
      if (i) {
        const E = r(i);
        E && typeof E == "object" && !Array.isArray(E) ? (g = E.id || e.getAttribute("data-flow-handle-id") || l, E.position && (p = E.position, m = !0)) : g = E || e.getAttribute("data-flow-handle-id") || l;
      } else
        g = e.getAttribute("data-flow-handle-id") || l;
      if (o.includes("hidden") && (e.style.display = "none"), e.dataset.flowHandleType = l, e.dataset.flowHandlePosition = p, e.dataset.flowHandleId = g, h && (e.dataset.flowHandleExplicit = "true"), m && i && (e.dataset.flowHandleExplicit = "true", s(() => {
        const E = r(i);
        E && typeof E == "object" && !Array.isArray(E) && E.position && (e.dataset.flowHandlePosition = E.position);
      })), !h && !m) {
        const E = () => {
          const S = e.closest("[x-flow-node]")?.dataset.flowNodeId;
          if (!S) return;
          const N = e.closest("[x-data]");
          return N ? t.$data(N)?.getNode?.(S) : void 0;
        };
        s(() => {
          const _ = E();
          if (!_) return;
          const S = l === "source" ? _.sourcePosition : _.targetPosition;
          S && (e.dataset.flowHandlePosition = S);
        });
      }
      e.classList.add("flow-handle", `flow-handle-${l}`);
      const y = () => {
        const E = e.closest("[x-flow-node]");
        return E ? E.getAttribute("data-flow-node-id") ?? null : null;
      }, x = () => {
        const E = e.closest("[x-data]");
        return E ? t.$data(E) : null;
      }, C = x();
      let b = null;
      if (C?._config?.keyboardConnect) {
        e.setAttribute("tabindex", "0"), e.setAttribute("role", "button"), e.setAttribute("aria-label", `${l} handle ${g}`);
        const E = (N) => {
          const R = N?._pendingKeyboardConnect;
          if (!R) return;
          const M = e.closest(".flow-container");
          M && M.querySelector(
            `[data-flow-node-id="${CSS.escape(R.sourceNodeId)}"] [data-flow-handle-id="${CSS.escape(R.sourceHandleId)}"][data-flow-handle-type="source"]`
          )?.classList.remove("flow-handle-connect-pending"), N && (N._pendingKeyboardConnect = null);
        }, _ = (N) => {
          if (!(N.key === "Enter" || N.key === " " || N.key === "Spacebar")) return;
          const M = x();
          if (!M || M._animationLocked) return;
          const T = y();
          if (T)
            if (l === "source") {
              const P = M.getNode?.(T);
              if (P && !Ye(P) || e[At] === !1) return;
              N.preventDefault(), N.stopPropagation(), E(M), M._pendingKeyboardConnect = {
                sourceNodeId: T,
                sourceHandleId: g
              }, e.classList.add("flow-handle-connect-pending"), M._announcer?.announce?.(`Connecting from ${l} handle ${g}. Focus a target handle and press Enter to connect.`);
            } else {
              if (!M._pendingKeyboardConnect) return;
              const P = M.getNode?.(T);
              if (P && !Ye(P) || e[lt] === !1) return;
              N.preventDefault(), N.stopPropagation();
              const { sourceNodeId: w, sourceHandleId: v } = M._pendingKeyboardConnect, $ = {
                source: w,
                sourceHandle: v,
                target: T,
                targetHandle: g
              }, L = e.closest(".flow-container");
              if (E(M), !L) return;
              ha({ connection: $, canvas: M, containerEl: L }).then((D) => {
                D.applied && M._announcer?.announce?.(`Connected ${w} to ${T}.`);
              });
            }
        };
        e.addEventListener("keydown", _);
        const S = e.closest(".flow-container");
        if (S) {
          const N = zn.get(S);
          if (N)
            N.count += 1;
          else {
            const R = (M) => {
              if (M.key !== "Escape") return;
              const T = S.matches("[x-data]") ? S : S.closest("[x-data]") ?? S.querySelector("[x-data]");
              if (!T) return;
              const P = t.$data(T);
              P?._pendingKeyboardConnect && E(P);
            };
            S.addEventListener("keydown", R), zn.set(S, { count: 1, handler: R });
          }
        }
        b = () => {
          if (e.removeEventListener("keydown", _), S) {
            const N = zn.get(S);
            N && (N.count -= 1, N.count <= 0 && (S.removeEventListener("keydown", N.handler), zn.delete(S)));
          }
          e.removeAttribute("tabindex"), e.removeAttribute("role"), e.removeAttribute("aria-label"), e.classList.remove("flow-handle-connect-pending");
        };
      }
      if (l === "source") {
        const E = (N) => {
          ga(e, x(), N);
        };
        _s(C) && e.addEventListener("pointerdown", E);
        const _ = () => {
          const N = x();
          if (!N?._pendingReconnection || N._pendingReconnection.draggedEnd !== "source") return;
          const R = y();
          if (R) {
            const M = N.getNode(R);
            if (M && !Ye(M)) return;
          }
          e[At] !== !1 && e.classList.add("flow-handle-active");
        }, S = () => {
          e.classList.remove("flow-handle-active");
        };
        e.addEventListener("pointerenter", _), e.addEventListener("pointerleave", S), a(() => {
          yt.get(e)?.(), yt.delete(e), b?.(), e.removeEventListener("pointerdown", E), e.removeEventListener("pointerenter", _), e.removeEventListener("pointerleave", S), e.classList.remove("flow-handle", `flow-handle-${l}`);
        });
      } else {
        const E = () => {
          const R = x();
          if (!R?.pendingConnection) return;
          const M = y();
          if (M) {
            const T = R.getNode(M);
            if (T && !Ye(T)) return;
          }
          e[lt] !== !1 && e.classList.add("flow-handle-active");
        }, _ = () => {
          e.classList.remove("flow-handle-active");
        };
        e.addEventListener("pointerenter", E), e.addEventListener("pointerleave", _);
        const S = async (R) => {
          const M = x();
          if (!M?.pendingConnection || M._config?.connectOnClick === !1 || M._connectValidating) return;
          R.preventDefault(), R.stopPropagation();
          const T = y();
          if (!T) return;
          if (e[lt] === !1) {
            B("connection", "Click-to-connect rejected (handle not connectable end)"), M._emit("connect-end", { connection: null, source: M.pendingConnection.source, sourceHandle: M.pendingConnection.sourceHandle, position: { x: 0, y: 0 } }), M.pendingConnection = null, M._container?.classList.remove("flow-connecting");
            const L = e.closest(".flow-container");
            L && Le(L);
            return;
          }
          const P = M.getNode(T);
          if (P && !Ye(P)) {
            B("connection", `Click-to-connect rejected (target "${T}" not connectable)`), M._emit("connect-end", { connection: null, source: M.pendingConnection.source, sourceHandle: M.pendingConnection.sourceHandle, position: { x: 0, y: 0 } }), M.pendingConnection = null, M._container?.classList.remove("flow-connecting");
            const L = e.closest(".flow-container");
            L && Le(L);
            return;
          }
          const w = {
            source: M.pendingConnection.source,
            sourceHandle: M.pendingConnection.sourceHandle,
            target: T,
            targetHandle: g
          }, v = { source: M.pendingConnection.source, sourceHandle: M.pendingConnection.sourceHandle, position: { x: 0, y: 0 } };
          if (_t(w, M.edges, { preventCycles: M._config?.preventCycles })) {
            const L = e.closest(".flow-container");
            if (!vt(w, M._config?.connectionRules, M._nodeMap)) {
              B("connection", "Click-to-connect rejected (connection rules)", w), Te(L, w), M._emit("connect-end", { connection: null, ...v }), M.pendingConnection = null, M._container?.classList.remove("flow-connecting"), L && Le(L);
              return;
            }
            if (L && !st(L, w, M.edges)) {
              B("connection", "Click-to-connect rejected (handle limit)", w), Te(L, w), M._emit("connect-end", { connection: null, ...v }), M.pendingConnection = null, M._container?.classList.remove("flow-connecting"), Le(L);
              return;
            }
            if (L && !it(L, w)) {
              B("connection", "Click-to-connect rejected (per-handle validator)", w), Te(L, w), M._emit("connect-end", { connection: null, ...v }), M.pendingConnection = null, M._container?.classList.remove("flow-connecting"), L && Le(L);
              return;
            }
            if (M._config?.isValidConnection && !M._config.isValidConnection(w)) {
              B("connection", "Click-to-connect rejected (custom validator)", w), Te(L, w), M._emit("connect-end", { connection: null, ...v }), M.pendingConnection = null, M._container?.classList.remove("flow-connecting"), L && Le(L);
              return;
            }
            const D = M._config?.connectValidator;
            if (D && L) {
              const V = M._config?.validatingHandleClass ?? "flow-handle-validating", { sourceEl: I, targetEl: k } = So(L, w);
              M._connectValidating = !0;
              let A;
              try {
                A = await Co(
                  D,
                  w,
                  I,
                  k,
                  L,
                  V
                );
              } finally {
                M._connectValidating = !1;
              }
              if (!A.allowed) {
                B("connection", "Click-to-connect rejected (async connectValidator)", { connection: w, reason: A.reason }), Te(L, { ...w, reason: A.reason }), M._emit("connect-end", { connection: null, ...v }), M.pendingConnection = null, M._container?.classList.remove("flow-connecting"), Le(L);
                return;
              }
            }
            const z = `e-${w.source}-${w.target}-${Date.now()}-${pn++}`;
            M.addEdges({ id: z, ...w }), B("connection", `Click-to-connect: ${w.source} → ${w.target}`, w), M._emit("connect", { connection: w }), M._emit("connect-end", { connection: w, ...v });
          } else {
            B("connection", "Click-to-connect rejected (invalid)", w);
            const L = e.closest(".flow-container");
            Te(L, w), M._emit("connect-end", { connection: null, ...v });
          }
          M.pendingConnection = null, M._container?.classList.remove("flow-connecting");
          const $ = e.closest(".flow-container");
          $ && Le($);
        };
        e.addEventListener("click", S);
        const N = (R) => {
          pa(e, x(), R);
        };
        _s(C) && e.addEventListener("pointerdown", N), a(() => {
          yt.get(e)?.(), yt.delete(e), b?.(), e.removeEventListener("pointerdown", N), e.removeEventListener("pointerenter", E), e.removeEventListener("pointerleave", _), e.removeEventListener("click", S), e.classList.remove("flow-handle", `flow-handle-${l}`, "flow-handle-active");
        });
      }
    }
  );
}
function bs(t, e) {
  const n = (o) => {
    const r = o.target?.closest?.("[data-flow-handle-type]");
    r && t.contains(r) && (e?._container && r.closest(".flow-container") !== e._container || rh(r, e, o));
  };
  return t.addEventListener("pointerdown", n, !0), () => t.removeEventListener("pointerdown", n, !0);
}
const xs = {
  delete: ["Delete", "Backspace"],
  selectionBox: "Shift",
  multiSelect: "Shift",
  moveNodes: ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"],
  moveStep: 5,
  moveStepModifier: "Shift",
  moveStepMultiplier: 4,
  copy: "c",
  paste: "v",
  cut: "x",
  undo: "z",
  redo: "z",
  escape: "Escape",
  selectionModeToggle: "Alt",
  selectionToolToggle: "l"
};
function lh(t) {
  if (!t) return { ...xs };
  const e = { ...xs };
  for (const n of Object.keys(t))
    n in t && (e[n] = t[n]);
  return e;
}
function Je(t, e) {
  if (e == null) return !1;
  const n = t.length === 1 ? t.toLowerCase() : t;
  return Array.isArray(e) ? e.some((o) => (o.length === 1 ? o.toLowerCase() : o) === n) : (e.length === 1 ? e.toLowerCase() : e) === n;
}
function ch(t, e, n, o) {
  return !t && e > 0 && (n !== 0 || o !== 0);
}
function dh(t) {
  const e = t;
  if (!e) return !1;
  if (e.isContentEditable) return !0;
  const n = e.tagName;
  return n === "INPUT" || n === "TEXTAREA" || n === "SELECT";
}
function bt(t, e) {
  if (e == null) return !1;
  switch (e) {
    case "Shift":
      return t.shiftKey;
    case "Control":
      return t.ctrlKey;
    case "Meta":
      return t.metaKey;
    case "Alt":
      return t.altKey;
    default:
      return !1;
  }
}
function uh(t, e, n = {}) {
  const o = n.duration ?? 500, i = n.moveThreshold ?? 10;
  let r = null, s = 0, a = 0, l = null;
  function c() {
    r !== null && (clearTimeout(r), r = null), l = null, document.removeEventListener("pointermove", d), document.removeEventListener("pointerup", c), document.removeEventListener("pointercancel", c);
  }
  function d(u) {
    const h = u.clientX - s, p = u.clientY - a;
    h * h + p * p > i * i && c();
  }
  function f(u) {
    c(), s = u.clientX, a = u.clientY, l = u, document.addEventListener("pointermove", d), document.addEventListener("pointerup", c), document.addEventListener("pointercancel", c), r = setTimeout(() => {
      const h = l;
      c(), h && e(h);
    }, o);
  }
  return t.addEventListener("pointerdown", f), () => {
    c(), t.removeEventListener("pointerdown", f);
  };
}
const Es = 12;
function fh(t) {
  return t ? t === !0 ? Es : t.channelGap ?? Es : null;
}
function ma(t) {
  let e = null, n = 0;
  for (let o = 1; o < t.length - 2; o++) {
    const i = t[o], r = t[o + 1], s = i.y === r.y, a = i.x === r.x;
    if (!s && !a) continue;
    const l = Math.abs(s ? r.x - i.x : r.y - i.y);
    l <= n || (n = l, e = s ? { axis: "h", at: i.y, from: Math.min(i.x, r.x), to: Math.max(i.x, r.x), i: o, j: o + 1 } : { axis: "v", at: i.x, from: Math.min(i.y, r.y), to: Math.max(i.y, r.y), i: o, j: o + 1 });
  }
  return e;
}
function hh(t, e, n) {
  return t.axis !== e.axis || Math.abs(t.at - e.at) > n ? !1 : t.from <= e.to && e.from <= t.to;
}
function gh(t, e) {
  const n = [], o = /* @__PURE__ */ new Set();
  for (let i = 0; i < t.length; i++) {
    if (o.has(i)) continue;
    const r = [t[i]];
    o.add(i);
    let s = !0;
    for (; s; ) {
      s = !1;
      for (let a = 0; a < t.length; a++)
        o.has(a) || r.some((l) => hh(l.run, t[a].run, e)) && (r.push(t[a]), o.add(a), s = !0);
    }
    n.push(r);
  }
  return n;
}
function ph(t, e) {
  const n = /* @__PURE__ */ new Map(), o = [...t].sort((r, s) => r.bary - s.bary || (r.edgeId < s.edgeId ? -1 : 1)), i = o.length;
  return o.forEach((r, s) => n.set(r.edgeId, (s - (i - 1) / 2) * e)), n;
}
function mh(t, e, n) {
  if (n === 0) return t.map((i) => ({ ...i }));
  const o = t.map((i) => ({ ...i }));
  return e.axis === "h" ? (o[e.i].y += n, o[e.j].y += n) : (o[e.i].x += n, o[e.j].x += n), o;
}
function ya(t, e, n) {
  if (!e) return t;
  const o = ma(t);
  if (!o) return t;
  const i = mh(t, o, e);
  return n && yh(i, n, pt) ? t : i;
}
function yh(t, e, n) {
  for (let o = 0; o < t.length - 1; o++) {
    const i = t[o], r = t[o + 1], s = Math.min(i.x, r.x), a = Math.max(i.x, r.x), l = Math.min(i.y, r.y), c = Math.max(i.y, r.y);
    for (const d of e) {
      const f = d.x - n, u = d.y - n, h = d.x + d.width + n, p = d.y + d.height + n;
      if (s < h && a > f && l < p && c > u) return !0;
    }
  }
  return !1;
}
const pt = 20, Vn = pt + 1, wa = 1, va = 0.5, wh = `b${wa}d${va}`;
function Cs(t) {
  switch (t) {
    case "top":
      return { x: 0, y: -1 };
    case "bottom":
      return { x: 0, y: 1 };
    case "left":
      return { x: -1, y: 0 };
    case "right":
      return { x: 1, y: 0 };
    default:
      return { x: 0, y: 1 };
  }
}
function Ss(t, e) {
  return {
    x: t.x - e,
    y: t.y - e,
    width: t.width + e * 2,
    height: t.height + e * 2
  };
}
function vh(t, e, n) {
  return t > n.x && t < n.x + n.width && e > n.y && e < n.y + n.height;
}
function _a(t, e, n, o) {
  const i = Math.min(t, e), r = Math.max(t, e);
  for (const s of o) {
    const a = s.x, l = s.x + s.width, c = s.y, d = s.y + s.height;
    if (n > c && n < d && r > a && i < l)
      return !0;
  }
  return !1;
}
function ba(t, e, n, o) {
  const i = Math.min(e, n), r = Math.max(e, n);
  for (const s of o) {
    const a = s.x, l = s.x + s.width, c = s.y, d = s.y + s.height;
    if (t > a && t < l && r > c && i < d)
      return !0;
  }
  return !1;
}
function _h(t, e, n, o, i) {
  const r = /* @__PURE__ */ new Set([t, n]), s = /* @__PURE__ */ new Set([e, o]);
  for (const f of i)
    r.add(f.x), r.add(f.x + f.width), s.add(f.y), s.add(f.y + f.height);
  const a = Array.from(r).sort((f, u) => f - u), l = Array.from(s).sort((f, u) => f - u), c = [];
  let d = 0;
  for (const f of a)
    for (const u of l) {
      let h = !1;
      for (const p of i)
        if (vh(f, u, p)) {
          h = !0;
          break;
        }
      h || c.push({ x: f, y: u, index: d++ });
    }
  return c;
}
class bh {
  constructor(e) {
    this.less = e, this.items = [];
  }
  get size() {
    return this.items.length;
  }
  push(e) {
    this.items.push(e);
    let n = this.items.length - 1;
    for (; n > 0; ) {
      const o = n - 1 >> 1;
      if (!this.less(this.items[n], this.items[o])) break;
      [this.items[o], this.items[n]] = [this.items[n], this.items[o]], n = o;
    }
  }
  pop() {
    const e = this.items.length;
    if (e === 0) return;
    const n = this.items[0], o = this.items.pop();
    if (e > 1) {
      this.items[0] = o;
      let i = 0;
      for (; ; ) {
        const r = 2 * i + 1, s = r + 1;
        let a = i;
        if (r < this.items.length && this.less(this.items[r], this.items[a]) && (a = r), s < this.items.length && this.less(this.items[s], this.items[a]) && (a = s), a === i) break;
        [this.items[i], this.items[a]] = [this.items[a], this.items[i]], i = a;
      }
    }
    return n;
  }
}
function xh(t, e) {
  const n = t.map(() => []), o = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
  for (const r of t) {
    let s = o.get(r.x);
    s || (s = [], o.set(r.x, s)), s.push(r);
    let a = i.get(r.y);
    a || (a = [], i.set(r.y, a)), a.push(r);
  }
  for (const r of o.values()) {
    r.sort((s, a) => s.y - a.y);
    for (let s = 1; s < r.length; s++) {
      const a = r[s - 1], l = r[s];
      ba(a.x, a.y, l.y, e) || (n[a.index].push(l.index), n[l.index].push(a.index));
    }
  }
  for (const r of i.values()) {
    r.sort((s, a) => s.x - a.x);
    for (let s = 1; s < r.length; s++) {
      const a = r[s - 1], l = r[s];
      _a(a.x, l.x, a.y, e) || (n[a.index].push(l.index), n[l.index].push(a.index));
    }
  }
  return n;
}
function Eh(t, e, n, o) {
  const i = n.length, r = 2 * i, s = new Float64Array(r).fill(1 / 0), a = new Float64Array(r).fill(1 / 0), l = new Int32Array(r).fill(-1), c = new Uint8Array(r), d = xh(n, o), f = Math.min(t.x, e.x), u = Math.max(t.x, e.x), h = Math.min(t.y, e.y), p = Math.max(t.y, e.y), g = (S) => Math.max(0, f - S.x) + Math.max(0, S.x - u) + Math.max(0, h - S.y) + Math.max(0, S.y - p), m = (S, N) => s[S] < s[N] || s[S] === s[N] && a[S] < a[N], y = new bh(m);
  for (let S = 0; S < 2; S++) {
    const N = S * i + t.index;
    s[N] = 0, a[N] = 0, y.push(N);
  }
  const x = (S) => S % i, C = (S) => S < i ? 0 : 1;
  let b = -1;
  for (; y.size > 0; ) {
    const S = y.pop();
    if (c[S]) continue;
    c[S] = 1;
    const N = x(S);
    if (N === e.index) {
      b = S;
      break;
    }
    const R = C(S), M = n[N];
    for (const T of d[N]) {
      const P = n[T], w = M.x === P.x ? 1 : 0, v = w * i + T;
      if (c[v]) continue;
      const $ = Math.abs(P.x - M.x) + Math.abs(P.y - M.y), D = wa * (R === w ? 0 : 1) + va * g(P), z = s[S] + $, V = a[S] + D;
      (z < s[v] || z === s[v] && V < a[v]) && (s[v] = z, a[v] = V, l[v] = S, y.push(v));
    }
  }
  if (b === -1) {
    const S = e.index, N = i + e.index;
    if (s[S] === 1 / 0 && s[N] === 1 / 0) return null;
    b = m(S, N) ? S : N;
  }
  const E = [];
  let _ = b;
  for (; _ !== -1; )
    E.unshift(n[x(_)]), _ = l[_];
  return E;
}
function Ch(t) {
  if (t.length <= 2) return t;
  const e = [t[0]];
  for (let n = 1; n < t.length - 1; n++) {
    const o = e[e.length - 1], i = t[n + 1], r = t[n], s = o.x === r.x && r.x === i.x, a = o.y === r.y && r.y === i.y;
    !s && !a && e.push(r);
  }
  return e.push(t[t.length - 1]), e;
}
function Sh(t, e) {
  if (t.length < 2) return "";
  let n = `M${t[0].x},${t[0].y}`;
  for (let i = 1; i < t.length - 1; i++) {
    const r = t[i - 1], s = t[i], a = t[i + 1];
    e > 0 ? n += ` ${Zt(r.x, r.y, s.x, s.y, a.x, a.y, e)}` : n += ` L${s.x},${s.y}`;
  }
  const o = t[t.length - 1];
  return n += ` L${o.x},${o.y}`, n;
}
function kh(t) {
  if (t.length < 2)
    return { x: t[0]?.x ?? 0, y: t[0]?.y ?? 0, offsetX: 0, offsetY: 0 };
  let e = 0;
  const n = [];
  for (let r = 1; r < t.length; r++) {
    const s = t[r].x - t[r - 1].x, a = t[r].y - t[r - 1].y, l = Math.abs(s) + Math.abs(a);
    n.push(l), e += l;
  }
  let o = e / 2;
  for (let r = 0; r < n.length; r++) {
    if (o <= n[r]) {
      const s = n[r] > 0 ? o / n[r] : 0, a = t[r].x + (t[r + 1].x - t[r].x) * s, l = t[r].y + (t[r + 1].y - t[r].y) * s;
      return {
        x: a,
        y: l,
        offsetX: Math.abs(t[t.length - 1].x - t[0].x) / 2,
        offsetY: Math.abs(t[t.length - 1].y - t[0].y) / 2
      };
    }
    o -= n[r];
  }
  const i = t[t.length - 1];
  return { x: i.x, y: i.y, offsetX: 0, offsetY: 0 };
}
const wt = 200;
function Lh(t, e, n, o, i) {
  const r = Math.min(t, n) - wt, s = Math.max(t, n) + wt, a = Math.min(e, o) - wt, l = Math.max(e, o) + wt;
  return i.filter(
    (c) => c.x < s && c.x + c.width > r && c.y < l && c.y + c.height > a
  );
}
function Mh(t, e) {
  for (let n = 1; n < t.length; n++) {
    const o = t[n - 1], i = t[n];
    if (o.x === i.x) {
      if (ba(o.x, o.y, i.y, e)) return !0;
    } else if (o.y === i.y && _a(o.x, i.x, o.y, e))
      return !0;
  }
  return !1;
}
function Ph(t, e, n, o, i, r, s) {
  const a = Cs(n), l = Cs(r), c = t + a.x * Vn, d = e + a.y * Vn, f = o + l.x * Vn, u = i + l.y * Vn, h = (b) => {
    const E = (_, S) => _ > b.x - pt && _ < b.x + b.width + pt && S > b.y - pt && S < b.y + b.height + pt;
    return E(t, e) || E(c, d) || E(o, i) || E(f, u);
  }, p = s.filter((b) => !h(b)), g = (b) => {
    const E = b.map((T) => Ss(T, pt)), _ = _h(c, d, f, u, E);
    _.length;
    const S = _.find((T) => T.x === c && T.y === d), N = _.find((T) => T.x === f && T.y === u);
    S || _.push({ x: c, y: d, index: _.length }), N || _.push({ x: f, y: u, index: _.length });
    const R = S ?? _[_.length - (N ? 1 : 2)], M = N ?? _[_.length - 1];
    return Eh(R, M, _, E);
  }, m = Lh(t, e, o, i, p), y = m.length < p.length;
  let x = g(m);
  if (y) {
    const b = p.map((_) => Ss(_, pt));
    (!(x !== null && x.length >= 2) || Mh(x, b)) && (x = g(p));
  }
  if (!x || x.length < 2) return null;
  const C = [
    { x: t, y: e, index: -1 },
    ...x,
    { x: o, y: i, index: -2 }
  ];
  return Ch(C);
}
const Nh = 512, ft = /* @__PURE__ */ new Map();
function Th(t, e, n, o, i, r, s) {
  let a = `${wh}|${Math.round(t)},${Math.round(e)},${n}|${Math.round(o)},${Math.round(i)},${r}`;
  for (const l of s)
    a += `|${Math.round(l.x)},${Math.round(l.y)},${Math.round(l.width)},${Math.round(l.height)}`;
  return a;
}
function Mi(t, e, n, o, i, r, s) {
  const a = Th(t, e, n, o, i, r, s);
  if (ft.has(a)) {
    const c = ft.get(a);
    return ft.delete(a), ft.set(a, c), c;
  }
  const l = Ph(t, e, n, o, i, r, s);
  return ft.set(a, l), ft.size > Nh && ft.delete(ft.keys().next().value), l;
}
function Ah({
  sourceX: t,
  sourceY: e,
  sourcePosition: n = "bottom",
  targetX: o,
  targetY: i,
  targetPosition: r = "top",
  obstacles: s,
  borderRadius: a = 5,
  channelOffset: l
}) {
  if (!s || s.length === 0)
    return Cn({
      sourceX: t,
      sourceY: e,
      sourcePosition: n,
      targetX: o,
      targetY: i,
      targetPosition: r,
      borderRadius: a
    });
  const c = Mi(t, e, n, o, i, r, s);
  if (!c)
    return Cn({
      sourceX: t,
      sourceY: e,
      sourcePosition: n,
      targetX: o,
      targetY: i,
      targetPosition: r,
      borderRadius: a
    });
  const d = ya(c, l, s), f = Sh(d, a), { x: u, y: h, offsetX: p, offsetY: g } = kh(d);
  return {
    path: f,
    labelPosition: { x: u, y: h },
    labelOffsetX: p,
    labelOffsetY: g
  };
}
const ks = 5;
function lo(t) {
  return t ? t === !0 ? ks : t.spacing ?? ks : null;
}
function Ls(t, e, n, o) {
  if (e <= 1) return 0;
  const r = Math.min((e - 1) * o, Math.max(0, n)) / (e - 1);
  return (t - (e - 1) / 2) * r;
}
function Ms(t, e, n) {
  return e === "left" || e === "right" ? { x: t.x, y: t.y + n } : { x: t.x + n, y: t.y };
}
const Ps = 20;
function xa(t) {
  return new Map(t.map((e) => [e.id, e]));
}
function $h(t, e) {
  const n = /* @__PURE__ */ new Map();
  for (const o of e)
    if (o.parentId) {
      const i = n.get(o.parentId);
      i ? i.push(o.id) : n.set(o.parentId, [o.id]);
    }
  for (const o of t.keys())
    n.has(o) || t.delete(o);
  for (const [o, i] of n) {
    const r = t.get(o);
    (!r || r.length !== i.length || r.some((s, a) => s !== i[a])) && t.set(o, i);
  }
}
function ri(t, e, n) {
  if (!t.position) return { x: 0, y: 0 };
  let o = t.position.x, i = t.position.y;
  const r = /* @__PURE__ */ new Set();
  r.add(t.id);
  let s = t.parentId ? e.get(t.parentId) : void 0;
  for (; s && !r.has(s.id); ) {
    r.add(s.id);
    const a = s.nodeOrigin ?? n ?? [0, 0], l = s.dimensions?.width ?? we, c = s.dimensions?.height ?? _e;
    o += s.position.x - l * a[0], i += s.position.y - c * a[1], s = s.parentId ? e.get(s.parentId) : void 0;
  }
  return { x: o, y: i };
}
function ct(t, e, n) {
  if (!t.parentId)
    return t;
  const o = ri(t, e, n);
  return { ...t, position: o };
}
function co(t, e, n) {
  return t.map((o) => ct(o, e, n));
}
function xt(t, e) {
  const n = /* @__PURE__ */ new Set(), o = [t], i = /* @__PURE__ */ new Map();
  for (const r of e)
    if (r.parentId) {
      const s = i.get(r.parentId);
      s ? s.push(r.id) : i.set(r.parentId, [r.id]);
    }
  for (; o.length > 0; ) {
    const r = o.shift(), s = i.get(r);
    if (s)
      for (const a of s)
        n.has(a) || (n.add(a), o.push(a));
  }
  return n;
}
function $t(t) {
  const e = xa(t), n = [], o = /* @__PURE__ */ new Set();
  function i(r) {
    if (!o.has(r.id)) {
      if (r.parentId) {
        const s = e.get(r.parentId);
        s && i(s);
      }
      o.add(r.id), n.push(r);
    }
  }
  for (const r of t)
    i(r);
  return n;
}
function Ea(t, e, n = /* @__PURE__ */ new Set()) {
  if (n.has(t.id))
    return t.zIndex ?? 2;
  if (n.add(t.id), !t.parentId)
    return t.zIndex !== void 0 ? t.zIndex : t.type === "group" ? 0 : 2;
  const o = e.get(t.parentId);
  return o ? Ea(o, e, n) + 2 + (t.zIndex ?? 0) : (t.zIndex ?? 0) + 2;
}
function Ca(t, e, n) {
  return {
    x: Math.max(e[0][0], Math.min(t.x, e[1][0] - (n?.width ?? 0))),
    y: Math.max(e[0][1], Math.min(t.y, e[1][1] - (n?.height ?? 0)))
  };
}
function $o(t, e, n) {
  return {
    x: Math.max(0, Math.min(t.x, n.width - e.width)),
    y: Math.max(0, Math.min(t.y, n.height - e.height))
  };
}
function Bn(t, e, n) {
  const o = e.extent ?? n;
  if (!o || o === "parent" || e.parentId) return t;
  const i = e.dimensions ?? { width: we, height: _e };
  return Ca(t, o, i);
}
function Ih(t, e, n) {
  const o = t.x + e.width + Ps, i = t.y + e.height + Ps, r = Math.max(n.width, o), s = Math.max(n.height, i);
  return r === n.width && s === n.height ? null : { width: r, height: s };
}
function Ns(t, e, n) {
  switch (n) {
    case "top":
      return { x: t / 2, y: 0 };
    case "right":
      return { x: t, y: e / 2 };
    case "bottom":
      return { x: t / 2, y: e };
    case "left":
      return { x: 0, y: e / 2 };
    case "top-left":
      return { x: 0, y: 0 };
    case "top-right":
      return { x: t, y: 0 };
    case "bottom-left":
      return { x: 0, y: e };
    case "bottom-right":
      return { x: t, y: e };
  }
}
function Dh(t, e, n) {
  const o = t / 2, i = e / 2, r = t / 2, s = e / 2;
  switch (n) {
    case "top":
      return { x: o, y: 0 };
    case "right":
      return { x: t, y: i };
    case "bottom":
      return { x: o, y: e };
    case "left":
      return { x: 0, y: i };
    case "top-right": {
      const a = -Math.PI / 4;
      return { x: o + r * Math.cos(a), y: i + s * Math.sin(a) };
    }
    case "top-left": {
      const a = -3 * Math.PI / 4;
      return { x: o + r * Math.cos(a), y: i + s * Math.sin(a) };
    }
    case "bottom-right": {
      const a = Math.PI / 4;
      return { x: o + r * Math.cos(a), y: i + s * Math.sin(a) };
    }
    case "bottom-left": {
      const a = 3 * Math.PI / 4;
      return { x: o + r * Math.cos(a), y: i + s * Math.sin(a) };
    }
  }
}
function Rh(t, e, n) {
  switch (n) {
    case "top":
      return { x: t / 2, y: 0 };
    case "right":
      return { x: t, y: e / 2 };
    case "bottom":
      return { x: t / 2, y: e };
    case "left":
      return { x: 0, y: e / 2 };
    case "top-right":
      return { x: t * 0.75, y: e * 0.25 };
    case "top-left":
      return { x: t * 0.25, y: e * 0.25 };
    case "bottom-right":
      return { x: t * 0.75, y: e * 0.75 };
    case "bottom-left":
      return { x: t * 0.25, y: e * 0.75 };
  }
}
function Hh(t, e, n) {
  switch (n) {
    case "top":
      return { x: t / 2, y: 0 };
    case "right":
      return { x: t, y: e / 2 };
    case "bottom":
      return { x: t / 2, y: e };
    case "left":
      return { x: 0, y: e / 2 };
    case "top-right":
      return { x: t * 0.75, y: 0 };
    case "top-left":
      return { x: t * 0.25, y: 0 };
    case "bottom-right":
      return { x: t * 0.75, y: e };
    case "bottom-left":
      return { x: t * 0.25, y: e };
  }
}
function Fh(t, e, n) {
  const o = t * 0.15;
  switch (n) {
    case "top":
      return { x: t * 0.575, y: 0 };
    case "right":
      return { x: t * 0.925, y: e / 2 };
    case "bottom":
      return { x: t * 0.425, y: e };
    case "left":
      return { x: t * 0.075, y: e / 2 };
    case "top-right":
      return { x: t, y: 0 };
    case "top-left":
      return { x: o, y: 0 };
    case "bottom-right":
      return { x: t - o, y: e };
    case "bottom-left":
      return { x: 0, y: e };
  }
}
function Oh(t, e, n) {
  switch (n) {
    case "top":
      return { x: t / 2, y: 0 };
    case "right":
      return { x: t * 0.75, y: e / 2 };
    case "bottom":
      return { x: t / 2, y: e };
    case "left":
      return { x: t * 0.25, y: e / 2 };
    case "top-right":
      return { x: t * 0.625, y: e * 0.25 };
    case "top-left":
      return { x: t * 0.375, y: e * 0.25 };
    case "bottom-right":
      return { x: t, y: e };
    case "bottom-left":
      return { x: 0, y: e };
  }
}
function zh(t, e, n) {
  const o = e * 0.12;
  switch (n) {
    case "top":
      return { x: t / 2, y: o };
    case "right":
      return { x: t, y: e / 2 };
    case "bottom":
      return { x: t / 2, y: e - o };
    case "left":
      return { x: 0, y: e / 2 };
    case "top-right":
      return { x: t, y: o };
    case "top-left":
      return { x: 0, y: o };
    case "bottom-right":
      return { x: t, y: e - o };
    case "bottom-left":
      return { x: 0, y: e - o };
  }
}
function Vh(t, e, n) {
  const o = Math.min(t, e) / 2, i = t / 2, r = e / 2;
  switch (n) {
    case "top":
      return { x: i, y: 0 };
    case "right":
      return { x: t, y: r };
    case "bottom":
      return { x: i, y: e };
    case "left":
      return { x: 0, y: r };
    case "top-right": {
      const s = t - o, a = -Math.PI / 4;
      return { x: s + o * Math.cos(a), y: r + o * Math.sin(a) };
    }
    case "top-left": {
      const s = o, a = -3 * Math.PI / 4;
      return { x: s + o * Math.cos(a), y: r + o * Math.sin(a) };
    }
    case "bottom-right": {
      const s = t - o, a = Math.PI / 4;
      return { x: s + o * Math.cos(a), y: r + o * Math.sin(a) };
    }
    case "bottom-left": {
      const s = o, a = 3 * Math.PI / 4;
      return { x: s + o * Math.cos(a), y: r + o * Math.sin(a) };
    }
  }
}
const Sa = {
  circle: { perimeterPoint: Dh },
  diamond: { perimeterPoint: Rh },
  hexagon: { perimeterPoint: Hh },
  parallelogram: { perimeterPoint: Fh },
  triangle: { perimeterPoint: Oh },
  cylinder: { perimeterPoint: zh },
  stadium: { perimeterPoint: Vh }
};
function ka(t, e = "light") {
  let n = e === "dark" ? "dark" : "light", o = null, i = null;
  function r(a) {
    n = a ? "dark" : "light", t.classList.toggle("dark", a);
  }
  function s(a) {
    o && i && (o.removeEventListener("change", i), o = null, i = null), a === "system" ? (o = window.matchMedia("(prefers-color-scheme: dark)"), r(o.matches), i = (l) => r(l.matches), o.addEventListener("change", i)) : r(a === "dark");
  }
  return s(e), {
    get resolved() {
      return n;
    },
    update: s,
    destroy() {
      o && i && o.removeEventListener("change", i), t.classList.remove("dark");
    }
  };
}
const Io = "__alpineflow_collab_store__";
function Bh() {
  return typeof globalThis < "u" ? (globalThis[Io] || (globalThis[Io] = /* @__PURE__ */ new WeakMap()), globalThis[Io]) : /* @__PURE__ */ new WeakMap();
}
const He = Bh(), Do = "__alpineflow_registry__";
function La() {
  return typeof globalThis < "u" ? (globalThis[Do] || (globalThis[Do] = /* @__PURE__ */ new Map()), globalThis[Do]) : /* @__PURE__ */ new Map();
}
function zt(t) {
  return La().get(t);
}
function qh(t, e) {
  switch (t) {
    case "nodes-change": {
      const n = e.nodes ?? [], o = n.length === 1 ? n[0].data?.label || n[0].id : null;
      return e.type === "add" ? o ? `Added node: ${o}` : `Added ${n.length} nodes` : e.type === "remove" ? o ? `Removed node: ${o}` : `Removed ${n.length} nodes` : null;
    }
    case "edges-change": {
      const n = e.edges ?? [];
      return e.type === "add" ? n.length === 1 ? `Connected ${n[0].source} to ${n[0].target}` : `Added ${n.length} connections` : e.type === "remove" ? n.length === 1 && n[0].source && n[0].target ? `Removed connection from ${n[0].source} to ${n[0].target}` : `Removed ${n.length} connections` : null;
    }
    case "selection-change": {
      const n = e.nodes?.length ?? 0, o = e.edges?.length ?? 0;
      if (n === 0 && o === 0)
        return "Selection cleared";
      const i = [];
      return n > 0 && i.push(`${n} node${n === 1 ? "" : "s"}`), o > 0 && i.push(`${o} edge${o === 1 ? "" : "s"}`), `${i.join(" and ")} selected`;
    }
    case "viewport-move-end": {
      const n = e.viewport?.zoom ?? 1;
      return `Viewport: zoom ${Math.round(n * 100)}%`;
    }
    case "fit-view":
      return "Fitted view to content";
    case "node-reparent": {
      const n = e.node?.data?.label || e.node?.id || "node";
      return e.newParentId ? `Moved ${n} into ${e.newParentId}` : `Detached ${n} from ${e.oldParentId}`;
    }
    default:
      return null;
  }
}
const Yh = 1e3;
class Xh {
  constructor(e, n) {
    this._clearTimer = null, this._formatMessage = n ?? qh, this._el = document.createElement("div"), this._el.setAttribute("aria-live", "polite"), this._el.setAttribute("aria-atomic", "true"), this._el.setAttribute("role", "status");
    const o = this._el.style;
    o.position = "absolute", o.width = "1px", o.height = "1px", o.padding = "0", o.margin = "-1px", o.overflow = "hidden", o.clip = "rect(0,0,0,0)", o.whiteSpace = "nowrap", o.border = "0", e.appendChild(this._el);
  }
  announce(e) {
    this._clearTimer && clearTimeout(this._clearTimer), this._el.textContent = e, this._clearTimer = setTimeout(() => {
      this._el.textContent = "", this._clearTimer = null;
    }, Yh);
  }
  handleEvent(e, n) {
    const o = this._formatMessage(e, n);
    o && this.announce(o);
  }
  destroy() {
    this._clearTimer && clearTimeout(this._clearTimer), this._el.remove();
  }
}
class Wh {
  constructor() {
    this._registry = /* @__PURE__ */ new Map();
  }
  registerCompute(e, n) {
    this._registry.set(e, n);
  }
  hasCompute(e) {
    return this._registry.has(e);
  }
  /**
   * Kahn's algorithm topological sort. Skips back-edges in cycles
   * by appending remaining nodes at the end.
   */
  topologicalSort(e, n) {
    const o = new Map(e.map((l) => [l.id, l])), i = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
    for (const l of e)
      i.set(l.id, 0), r.set(l.id, []);
    for (const l of n)
      !o.has(l.source) || !o.has(l.target) || (i.set(l.target, (i.get(l.target) ?? 0) + 1), r.get(l.source).push(l.target));
    const s = [];
    for (const [l, c] of i)
      c === 0 && s.push(l);
    const a = [];
    for (; s.length > 0; ) {
      const l = s.shift();
      a.push(o.get(l));
      for (const c of r.get(l) ?? []) {
        const d = (i.get(c) ?? 0) - 1;
        i.set(c, d), d === 0 && s.push(c);
      }
    }
    if (a.length < e.length) {
      const l = new Set(a.map((c) => c.id));
      for (const c of e)
        l.has(c.id) || a.push(c);
    }
    return a;
  }
  /**
   * Run compute propagation.
   *
   * @param nodes All nodes in the graph
   * @param edges All edges in the graph
   * @param startNodeId If provided, only compute this node and its downstream descendants
   * @returns Map of nodeId → output data for nodes that had a registered compute function
   */
  compute(e, n, o) {
    const i = this.topologicalSort(e, n), r = /* @__PURE__ */ new Map();
    if (o)
      for (const l of e)
        l.data.$outputs && r.set(l.id, l.data.$outputs);
    let s = null;
    o && (s = this._getDownstream(o, n), s.add(o));
    const a = /* @__PURE__ */ new Map();
    for (const l of i) {
      if (s && !s.has(l.id)) continue;
      const c = this._registry.get(l.type ?? "default");
      if (!c) continue;
      const d = {}, f = n.filter((h) => h.target === l.id);
      for (const h of f) {
        const p = r.get(h.source);
        if (!p) continue;
        const g = h.sourceHandle ?? "default", m = h.targetHandle ?? "default";
        g in p && (d[m] = p[g]);
      }
      const u = c.compute(d, l.data);
      r.set(l.id, u), a.set(l.id, u), l.data.$inputs = d, l.data.$outputs = u;
    }
    return a;
  }
  /** Get all downstream node IDs reachable from a start node. */
  _getDownstream(e, n) {
    const o = /* @__PURE__ */ new Map();
    for (const s of n) {
      let a = o.get(s.source);
      a || (a = [], o.set(s.source, a)), a.push(s.target);
    }
    const i = /* @__PURE__ */ new Set(), r = [e];
    for (; r.length > 0; ) {
      const s = r.pop();
      if (!i.has(s)) {
        i.add(s);
        for (const a of o.get(s) ?? [])
          i.has(a) || r.push(a);
      }
    }
    return i.delete(e), i;
  }
}
const jh = {
  connect: (t) => [t.connection?.source ?? t.source, t.connection?.target ?? t.target, t.connection?.sourceHandle ?? t.sourceHandle, t.connection?.targetHandle ?? t.targetHandle],
  "connect-start": (t) => [t.source, t.sourceHandle],
  "connect-end": (t) => [t.connection, t.source, t.sourceHandle, t.position],
  "node-click": (t) => [t.node.id, t.node],
  "node-drag-start": (t) => [t.node.id],
  "node-drag-end": (t) => [t.node.id, t.position],
  "node-resize-start": (t) => [t.node.id, t.dimensions],
  "node-resize-end": (t) => [t.node.id, t.dimensions],
  "node-collapse": (t) => [t.node.id, t.descendants],
  "node-expand": (t) => [t.node.id, t.descendants],
  "node-reparent": (t) => [t.node.id, t.oldParentId, t.newParentId],
  "node-context-menu": (t) => [t.node.id, { x: t.event.clientX, y: t.event.clientY }],
  "nodes-change": (t) => [t],
  "edge-click": (t) => [t.edge.id],
  "edge-context-menu": (t) => [t.edge.id, { x: t.event.clientX, y: t.event.clientY }],
  "edges-change": (t) => [t],
  "reconnect-start": (t) => [t.edge.id, t.handleType],
  reconnect: (t) => [t.oldEdge.id, t.newConnection],
  "reconnect-end": (t) => [t.edge.id, t.successful],
  "pane-click": (t) => [t.position],
  "pane-context-menu": (t) => [t.position],
  "viewport-change": (t) => [t.viewport],
  "selection-change": (t) => [t.nodes, t.edges],
  "selection-context-menu": (t) => [t.nodes, t.edges, { x: t.event.clientX, y: t.event.clientY }],
  drop: (t) => [t.data, t.position],
  init: () => [],
  "row-select": (t) => [t.rowId, t.nodeId, t.attrId],
  "row-deselect": (t) => [t.rowId, t.nodeId, t.attrId],
  "row-selection-change": (t) => [t.selectedRows]
}, Uh = {
  "flow:addNodes": "addNodes",
  "flow:removeNodes": "removeNodes",
  "flow:addEdges": "addEdges",
  "flow:removeEdges": "removeEdges",
  "flow:update": "update",
  "flow:animate": "animate",
  // Particle emission — all five firing methods
  "flow:sendParticle": "sendParticle",
  "flow:sendParticleAlongPath": "sendParticleAlongPath",
  "flow:sendParticleBetween": "sendParticleBetween",
  "flow:sendParticleBurst": "sendParticleBurst",
  "flow:sendConverging": "sendConverging",
  // Tag-filtered bulk animation control (v0.2.0-alpha)
  "flow:cancelAll": "cancelAll",
  "flow:pauseAll": "pauseAll",
  "flow:resumeAll": "resumeAll",
  // Viewport
  "flow:fitView": "fitView",
  "flow:zoomIn": "zoomIn",
  "flow:zoomOut": "zoomOut",
  "flow:setCenter": "setCenter",
  "flow:setViewport": "setViewport",
  "flow:follow": "follow",
  "flow:unfollow": "unfollow",
  "flow:undo": "undo",
  "flow:redo": "redo",
  "flow:layout": "layout",
  "flow:fromObject": "fromObject",
  "flow:replaceNodes": "replaceNodes",
  "flow:setNodes": "setNodes",
  "flow:setLoading": "setLoading",
  "flow:clear": "$clear",
  "flow:toggleInteractive": "toggleInteractive",
  "flow:panBy": "panBy",
  "flow:fitBounds": "fitBounds",
  "flow:patchConfig": "patchConfig",
  "flow:setCrossingReduction": "setCrossingReduction",
  "flow:deselectAll": "deselectAll",
  "flow:collapseNode": "collapseNode",
  "flow:expandNode": "expandNode",
  "flow:toggleNode": "toggleNode",
  // RunState (D2)
  "flow:setNodeState": "setNodeState",
  "flow:resetStates": "resetStates"
}, Gh = {
  "flow:addNodes": (t) => [t.nodes],
  "flow:removeNodes": (t) => [t.ids],
  "flow:addEdges": (t) => [t.edges],
  "flow:removeEdges": (t) => [t.ids],
  "flow:update": (t) => [t.targets, t.options ?? {}],
  "flow:animate": (t) => [t.targets, t.options ?? {}],
  // Particle emission — all five firing methods
  "flow:sendParticle": (t) => [t.edgeId, t.options ?? {}],
  "flow:sendParticleAlongPath": (t) => [t.path, t.options ?? {}],
  "flow:sendParticleBetween": (t) => [t.source, t.target, t.options ?? {}],
  "flow:sendParticleBurst": (t) => [t.edgeId, t.options ?? {}],
  "flow:sendConverging": (t) => [t.sources, t.options ?? {}],
  // Tag-filtered bulk animation control
  "flow:cancelAll": (t) => [t.filter ?? {}, t.options ?? {}],
  "flow:pauseAll": (t) => [t.filter ?? {}],
  "flow:resumeAll": (t) => [t.filter ?? {}],
  // Viewport
  "flow:fitView": () => [],
  "flow:zoomIn": () => [],
  "flow:zoomOut": () => [],
  "flow:setCenter": (t) => [t.x, t.y, t.zoom],
  "flow:setViewport": (t) => [t.viewport],
  "flow:follow": (t) => [t.nodeId, t.options ?? {}],
  "flow:unfollow": () => [],
  "flow:undo": () => [],
  "flow:redo": () => [],
  "flow:layout": (t) => [t.options ?? {}],
  "flow:fromObject": (t) => [t.data],
  "flow:replaceNodes": (t) => [t.nodes, t.edges],
  "flow:setNodes": (t) => [t.nodes],
  "flow:setLoading": (t) => [t.loading],
  "flow:clear": () => [],
  "flow:toggleInteractive": () => [],
  "flow:panBy": (t) => [t.dx, t.dy],
  "flow:fitBounds": (t) => [t.rect, t.options],
  "flow:patchConfig": (t) => [t.changes],
  "flow:setCrossingReduction": (t) => [t.value],
  "flow:deselectAll": () => [],
  "flow:collapseNode": (t) => [t.id],
  "flow:expandNode": (t) => [t.id],
  "flow:toggleNode": (t) => [t.id],
  // RunState (D2)
  "flow:setNodeState": (t) => [t.ids, t.state],
  "flow:resetStates": () => []
}, Ts = {
  success: { borderColor: "#22c55e", shadow: "0 0 0 2px rgba(34,197,94,0.3)" },
  error: { borderColor: "#ef4444", shadow: "0 0 0 2px rgba(239,68,68,0.3)" },
  warning: { borderColor: "#f59e0b", shadow: "0 0 0 2px rgba(245,158,11,0.3)" },
  info: { borderColor: "#3b82f6", shadow: "0 0 0 2px rgba(59,130,246,0.3)" }
};
function Zh(t, e) {
  const n = [];
  return n.push(e.on("flow:moveNode", (o) => {
    const i = o.duration ?? 0;
    t.update(
      { nodes: { [o.id]: { position: { x: o.x, y: o.y } } } },
      { duration: i }
    );
  })), n.push(e.on("flow:updateNode", (o) => {
    const i = o.duration ?? 0;
    t.update(
      { nodes: { [o.id]: o.changes } },
      { duration: i }
    );
  })), n.push(e.on("flow:focusNode", (o) => {
    const i = t.getNode(o.id);
    if (!i) return;
    const r = i.dimensions?.width ?? 150, s = i.dimensions?.height ?? 40, a = i.parentId ? t.getAbsolutePosition(o.id) : i.position;
    t.fitBounds(
      { x: a.x, y: a.y, width: r, height: s },
      { padding: o.padding ?? 0.5, duration: o.duration ?? 300 }
    );
  })), n.push(e.on("flow:connect", (o) => {
    const r = { id: o.edgeId ?? `e-${o.source}-${o.target}`, source: o.source, target: o.target, ...o.options ?? {} };
    o.duration && o.duration > 0 ? t.timeline().step({ addEdges: [r], edgeTransition: "draw", duration: o.duration }).play() : t.addEdges(r);
  })), n.push(e.on("flow:disconnect", (o) => {
    const i = t.edges.filter((r) => r.source === o.source && r.target === o.target).map((r) => r.id);
    i.length !== 0 && (o.duration && o.duration > 0 ? t.timeline().step({ removeEdges: i, edgeTransition: "fade", duration: o.duration }).play() : t.removeEdges(i));
  })), n.push(e.on("flow:highlightNode", (o) => {
    const i = t.getNode(o.id);
    if (!i) return;
    const r = Ts[o.style] ?? Ts.info, s = o.duration ?? 1500, a = Math.floor(s * 0.6), l = Math.floor(s * 0.4), c = i.style?.borderColor ?? null, d = i.style?.boxShadow ?? null;
    t.update({
      nodes: { [o.id]: { style: `border-color: ${r.borderColor}; box-shadow: ${r.shadow}` } }
    }, { duration: 100 }), setTimeout(() => {
      const f = c ? `border-color: ${c}; box-shadow: ${d ?? "none"}` : "";
      t.update({
        nodes: { [o.id]: { style: f } }
      }, { duration: l });
    }, 100 + a);
  })), n.push(e.on("flow:highlightPath", (o) => {
    const i = o.nodeIds, r = o.options ?? {}, { delay: s, ...a } = r, l = s ?? 200, c = {
      color: "#3b82f6",
      size: 5,
      duration: "800ms",
      ...a
    };
    for (let d = 0; d < i.length - 1; d++) {
      const f = i[d], u = i[d + 1], h = t.edges.find((p) => p.source === f && p.target === u);
      h && setTimeout(() => {
        t.sendParticle(h.id, c);
      }, d * l);
    }
  })), n.push(e.on("flow:lockNode", (o) => {
    const i = t.getNode(o.id);
    i && (i.locked = !0);
  })), n.push(e.on("flow:unlockNode", (o) => {
    const i = t.getNode(o.id);
    i && (i.locked = !1);
  })), n.push(e.on("flow:hideNode", (o) => {
    const i = t.getNode(o.id);
    i && (i.hidden = !0);
  })), n.push(e.on("flow:showNode", (o) => {
    const i = t.getNode(o.id);
    i && (i.hidden = !1);
  })), n.push(e.on("flow:selectNodes", (o) => {
    t.deselectAll();
    for (const i of o.ids) {
      t.selectedNodes.add(i);
      const r = t.getNode(i);
      r && (r.selected = !0);
    }
  })), n.push(e.on("flow:run", (o) => {
    if (typeof t.run != "function") {
      console.warn("[wire-bridge] flow:run: canvas.run not available — is the workflow addon registered?");
      return;
    }
    const i = t._workflowHandlers ?? {};
    t.run(o.startId, i, o.options ?? {});
  })), n.push(e.on("flow:selectEdges", (o) => {
    t.deselectAll();
    for (const i of o.ids) {
      t.selectedEdges.add(i);
      const r = t.getEdge(i);
      r && (r.selected = !0);
    }
  })), () => {
    for (const o of n)
      typeof o == "function" && o();
  };
}
function Kh(t) {
  return "on" + t.split("-").map(
    (e) => e.charAt(0).toUpperCase() + e.slice(1)
  ).join("");
}
const Jh = /* @__PURE__ */ new Set(["viewport-change", "viewport-move"]), Qh = 150;
function eg(t, e) {
  let n = null, o = null;
  return ((...i) => {
    o = i, n === null && (n = setTimeout(() => {
      n = null;
      const r = o;
      o = null, t(...r);
    }, e));
  });
}
function tg(t, e, n) {
  for (const [o, i] of Object.entries(n)) {
    const r = Kh(o), s = t[r], a = (l) => {
      let c;
      typeof s == "function" && (c = s(l));
      const d = jh[o], f = d ? d(l) : [l], u = e[i];
      return typeof u == "function" && u.call(e, ...f), c;
    };
    t[r] = Jh.has(o) ? eg(a, Qh) : a;
  }
}
function ng(t, e) {
  const n = [];
  for (const [o, i] of Object.entries(Uh)) {
    const r = e.on(o, (s) => {
      const a = t[i];
      if (typeof a != "function") return;
      const l = Gh[o], c = l ? l(s) : Object.values(s);
      a.call(t, ...c);
    });
    n.push(r);
  }
  return () => {
    for (const o of n)
      typeof o == "function" && o();
  };
}
const og = 5;
function ig(t) {
  const e = /* @__PURE__ */ new Set(), n = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Set();
  let i = null, r = /* @__PURE__ */ new Set(), s = 0;
  const a = /* @__PURE__ */ new Set();
  function l() {
    i === null && (i = requestAnimationFrame(() => {
      i = null;
      for (const c of e) {
        const f = (r.has(c) ? n.get(c) ?? 0 : 0) + 1;
        n.set(c, f), f > og && !o.has(c) && (o.add(c), console.warn(
          `[alpineflow] Auto-layout for parent "${c}" has run for ${f} consecutive frames. Suppressing to avoid an infinite loop. This usually indicates a layout that keeps changing child dimensions by more than the 1px threshold. Next user mutation will clear the suppression.`
        ));
      }
      for (const c of n.keys())
        e.has(c) || n.set(c, 0);
      r = new Set(e), e.clear();
    }));
  }
  return {
    safeLayoutChildren(c) {
      if (!o.has(c)) {
        if (s > 0) {
          a.add(c);
          return;
        }
        e.has(c) || (e.add(c), l(), t(c));
      }
    },
    resetLoopCounter(c) {
      n.delete(c), o.delete(c);
    },
    dispose() {
      i !== null && (cancelAnimationFrame(i), i = null);
    },
    suspend() {
      s++;
    },
    resume() {
      if (s !== 0 && (s--, s === 0)) {
        for (const c of a)
          o.has(c) || e.has(c) || (e.add(c), l(), t(c));
        a.clear();
      }
    }
  };
}
function sg(t) {
  return function(n) {
    t.suspend();
    try {
      return n();
    } finally {
      t.resume();
    }
  };
}
function rg(t, e, n) {
  let { width: o, height: i } = t;
  return e?.width !== void 0 && (o = Math.max(o, e.width)), e?.height !== void 0 && (i = Math.max(i, e.height)), n?.width !== void 0 && (o = Math.min(o, n.width)), n?.height !== void 0 && (i = Math.min(i, n.height)), { width: o, height: i };
}
function mn(t, e) {
  const n = t.type ?? "default", o = e[n], i = t.data?.childValidation;
  if (!(!o && !i))
    return o ? i ? { ...o, ...i } : o : i;
}
function Ma(t, e, n, o) {
  if (!o) return { valid: !0 };
  if (o.maxChildren !== void 0 && n.length >= o.maxChildren)
    return {
      valid: !1,
      rule: "maxChildren",
      message: `Maximum ${o.maxChildren} child node(s) allowed`
    };
  if (o.allowedChildTypes) {
    const i = e.type ?? "default";
    if (!o.allowedChildTypes.includes(i))
      return {
        valid: !1,
        rule: "allowedChildTypes",
        message: `Node type "${i}" is not allowed in this group`
      };
  }
  if (o.childTypeConstraints) {
    const i = e.type ?? "default", r = o.childTypeConstraints[i];
    if (r?.max !== void 0 && n.filter(
      (a) => (a.type ?? "default") === i
    ).length >= r.max)
      return {
        valid: !1,
        rule: "childTypeConstraints",
        message: `Maximum ${r.max} "${i}" node(s) allowed`
      };
  }
  if (o.validateChild) {
    const i = o.validateChild(e, n);
    if (i !== !0)
      return {
        valid: !1,
        rule: "validateChild",
        message: typeof i == "string" ? i : "Custom validation rejected"
      };
  }
  return { valid: !0 };
}
function uo(t, e, n, o) {
  if (!o) return { valid: !0 };
  if (o.preventChildEscape)
    return {
      valid: !1,
      rule: "preventChildEscape",
      message: "Children cannot be moved out of this group"
    };
  const i = n.length - 1, r = Math.max(
    o.minChildren ?? 0,
    o.requiredChildren ? 1 : 0
  );
  if (r > 0 && i < r)
    return {
      valid: !1,
      rule: "minChildren",
      message: `Requires at least ${r} child node(s)`
    };
  if (o.childTypeConstraints) {
    const s = e.type ?? "default", a = o.childTypeConstraints[s];
    if (a?.min !== void 0 && n.filter(
      (c) => (c.type ?? "default") === s
    ).length - 1 < a.min)
      return {
        valid: !1,
        rule: "childTypeConstraints",
        message: `Requires at least ${a.min} "${s}" node(s)`
      };
  }
  return { valid: !0 };
}
function As(t, e, n) {
  if (!n) return [];
  const o = [], i = Math.max(
    n.minChildren ?? 0,
    n.requiredChildren ? 1 : 0
  );
  if (i > 0 && e.length < i && o.push(`Requires at least ${i} child node(s)`), n.maxChildren !== void 0 && e.length > n.maxChildren && o.push(`Maximum ${n.maxChildren} child node(s) allowed`), n.childTypeConstraints)
    for (const [r, s] of Object.entries(n.childTypeConstraints)) {
      const a = e.filter(
        (l) => (l.type ?? "default") === r
      ).length;
      s.min !== void 0 && a < s.min && o.push(`Requires at least ${s.min} "${r}" node(s)`), s.max !== void 0 && a > s.max && o.push(`Maximum ${s.max} "${r}" node(s) allowed`);
    }
  return o;
}
function Jt(t, e) {
  const n = en(t, e);
  return {
    x: n.x,
    y: n.y,
    width: t.dimensions?.width ?? we,
    height: t.dimensions?.height ?? _e
  };
}
function Pa(t, e) {
  return t.x < e.x + e.width && t.x + t.width > e.x && t.y < e.y + e.height && t.y + t.height > e.y;
}
function ag(t, e, n = !0) {
  const o = Jt(t);
  return e.filter((i) => {
    if (i.id === t.id) return !1;
    const r = Jt(i);
    return n ? Pa(o, r) : o.x <= r.x && o.y <= r.y && o.x + o.width >= r.x + r.width && o.y + o.height >= r.y + r.height;
  });
}
function lg(t, e, n = !0) {
  if (t.id === e.id) return !1;
  const o = Jt(t), i = Jt(e);
  return n ? Pa(o, i) : o.x <= i.x && o.y <= i.y && o.x + o.width >= i.x + i.width && o.y + o.height >= i.y + i.height;
}
function cg(t, e, n, o, i = 5) {
  let { x: r, y: s } = t;
  for (const a of o) {
    const l = r + e, c = s + n, d = a.x + a.width, f = a.y + a.height;
    if (r < d + i && l > a.x - i && s < f + i && c > a.y - i) {
      const u = l - (a.x - i), h = d + i - r, p = c - (a.y - i), g = f + i - s, m = Math.min(u, h, p, g);
      m === u ? r -= u : m === h ? r += h : m === p ? s -= p : s += g;
    }
  }
  return { x: r, y: s };
}
function dg(t) {
  return {
    /**
     * Add one or more nodes to the canvas.
     *
     * - Normalizes single node or array input.
     * - When `options.center` is set, stashes intended positions off-screen
     *   so the directive can measure dimensions without a visible flash,
     *   then repositions after measurement via double-rAF.
     * - Validates child constraints before accepting each node.
     * - Captures history, sorts topologically, rebuilds node map.
     * - Pushes collab updates when a collaboration bridge is active.
     * - Runs child layout for any layout parents that received new children.
     * - Schedules auto-layout after the mutation.
     */
    addNodes(e, n) {
      t._captureHistory();
      let o = Array.isArray(e) ? e : [e];
      B("init", `Adding ${o.length} node(s)`, o.map((d) => d.id));
      const i = /* @__PURE__ */ new Map();
      if (n?.center) {
        for (const d of o)
          i.set(d.id, { ...d.position });
        o = o.map((d) => ({ ...d, position: { x: -9999, y: -9999 } }));
      }
      const r = [];
      for (const d of o) {
        if (d.parentId) {
          const f = t._getChildValidation(d.parentId);
          if (f) {
            const u = t._nodeMap.get(d.parentId);
            if (u) {
              const h = [
                ...t.nodes.filter(
                  (g) => g.parentId === d.parentId
                ),
                ...r.filter(
                  (g) => g.parentId === d.parentId
                )
              ], p = Ma(u, d, h, f);
              if (!p.valid) {
                t._config.onChildValidationFail && t._config.onChildValidationFail({
                  parent: u,
                  child: d,
                  operation: "add",
                  rule: p.rule,
                  message: p.message
                });
                continue;
              }
            }
          }
        }
        r.push(d);
      }
      o = r, t.nodes.push(...o);
      for (const d of o)
        d.dimensions && t._initialDimensions.set(d.id, { ...d.dimensions });
      let s = o.some((d) => d.parentId);
      if (!s) {
        const d = new Set(o.map((f) => f.id));
        s = t.nodes.some(
          (f) => f.parentId && d.has(f.parentId)
        );
      }
      if (s) {
        const d = $t(t.nodes);
        t.nodes.splice(0, t.nodes.length, ...d);
      }
      t._rebuildNodeMap();
      for (const d of o)
        if (d.childLayout) {
          const f = t._nodeMap.get(d.id);
          f && t._installChildLayoutWatchers(f);
        }
      t._emit("nodes-change", { type: "add", nodes: o, origin: n?.source ?? "api" });
      const a = t._container ? He.get(t._container) : void 0;
      if (a?.bridge)
        for (const d of o)
          a.bridge.pushLocalNodeAdd(d);
      n?.center && requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          for (const [d, f] of i) {
            const u = t.nodes.find((g) => g.id === d);
            if (!u) continue;
            const h = u.dimensions?.width ?? 0, p = u.dimensions?.height ?? 0;
            u.position.x = f.x - h / 2, u.position.y = f.y - p / 2;
          }
        });
      }), t._recomputeChildValidation();
      const l = /* @__PURE__ */ new Set();
      for (const d of o)
        if (d.parentId && t._nodeMap.get(d.parentId)?.childLayout) {
          if (d.order == null) {
            const u = t.nodes.filter(
              (h) => h.parentId === d.parentId && h.id !== d.id
            );
            d.order = u.length > 0 ? Math.max(...u.map((h) => h.order ?? 0)) + 1 : 0;
          }
          l.add(d.parentId);
        }
      const c = /* @__PURE__ */ new Set();
      for (const d of l) {
        let f = d, u = t._nodeMap.get(d)?.parentId;
        for (; u; ) {
          const h = t._nodeMap.get(u);
          h?.childLayout && (f = u), u = h?.parentId;
        }
        c.add(f);
      }
      for (const d of c)
        t._layoutDedup ? t._layoutDedup.safeLayoutChildren(d) : t.layoutChildren?.(d);
      t._scheduleAutoLayout(), t._commitNodeGeometry?.(o.map((d) => d.id));
    },
    /**
     * Remove one or more nodes by ID.
     *
     * - Normalizes single ID or array input.
     * - Validates child constraints before allowing removal.
     * - Cascades removal to all descendants.
     * - Removes connected edges and optionally creates reconnection bridges.
     * - Cleans up selection state and initial dimensions.
     * - Pushes collab updates when a collaboration bridge is active.
     * - Re-layouts any layout parents that lost children.
     * - Schedules auto-layout after the mutation.
     */
    removeNodes(e, n) {
      t._captureHistory();
      const o = new Set(Array.isArray(e) ? e : [e]), i = /* @__PURE__ */ new Set();
      for (const u of [...o]) {
        const h = t._nodeMap.get(u);
        if (!h?.parentId || o.has(h.parentId)) continue;
        const p = t._getChildValidation(h.parentId);
        if (!p) continue;
        const g = t._nodeMap.get(h.parentId);
        if (!g) continue;
        const m = t.nodes.filter(
          (x) => x.parentId === h.parentId
        ), y = uo(g, h, m, p);
        y.valid || (i.add(u), t._config.onChildValidationFail && t._config.onChildValidationFail({
          parent: g,
          child: h,
          operation: "remove",
          rule: y.rule,
          message: y.message
        }));
      }
      for (const u of i)
        o.delete(u);
      if (o.size === 0) return;
      const r = /* @__PURE__ */ new Map();
      for (const u of o) {
        const h = t._nodeMap.get(u);
        h?.parentId && r.set(u, h.parentId);
      }
      for (const u of [...o])
        for (const h of xt(u, t.nodes))
          o.add(h);
      B("destroy", `Removing ${o.size} node(s)`, [...o]);
      const s = t.nodes.filter((u) => o.has(u.id));
      let a = [];
      t._config.reconnectOnDelete && (a = Gf(o, t.nodes, t.edges));
      const l = [];
      t.edges = t.edges.filter((u) => o.has(u.source) || o.has(u.target) ? (l.push(u.id), !1) : !0), a.length && (t.edges.push(...a), B("destroy", `Created ${a.length} reconnection edge(s)`)), t._rebuildEdgeMap(), t.nodes = t.nodes.filter((u) => !o.has(u.id)), t._rebuildNodeMap();
      for (const u of o)
        t.selectedNodes.delete(u), t._initialDimensions.delete(u), t._uninstallChildLayoutWatchers(u), t._draggingNodeIds?.delete(u);
      for (const u of l)
        t._edgeDirtyTicks?.delete(u), t._edgeCorridors?.delete(u);
      s.length && t._emit("nodes-change", { type: "remove", nodes: s, origin: n?.source ?? "api" }), a.length && t._emit("edges-change", { type: "add", edges: a, origin: n?.source ?? "api" });
      const c = t._container ? He.get(t._container) : void 0;
      if (c?.bridge) {
        for (const u of o)
          c.bridge.pushLocalNodeRemove(u);
        for (const u of l)
          c.bridge.pushLocalEdgeRemove(u);
        for (const u of a)
          c.bridge.pushLocalEdgeAdd(u);
      }
      t._recomputeChildValidation();
      const d = /* @__PURE__ */ new Set();
      for (const u of o) {
        const h = r.get(u);
        h && t._nodeMap.get(h)?.childLayout && d.add(h);
      }
      const f = /* @__PURE__ */ new Set();
      for (const u of d) {
        let h = u, p = t._nodeMap.get(u)?.parentId;
        for (; p; ) {
          const g = t._nodeMap.get(p);
          g?.childLayout && (h = p), p = g?.parentId;
        }
        f.add(h);
      }
      for (const u of f) t.layoutChildren?.(u);
      t._scheduleAutoLayout(), t._commitNodeGeometry?.([...o]);
    },
    /**
     * Look up a node by ID.
     */
    getNode(e) {
      return t._nodeMap.get(e);
    },
    /**
     * Get all nodes connected via outgoing edges from the given node.
     */
    getOutgoers(e) {
      return ii(e, t.nodes, t.edges);
    },
    /**
     * Get all nodes connected via incoming edges to the given node.
     */
    getIncomers(e) {
      return Wf(e, t.nodes, t.edges);
    },
    /**
     * Get all edges connected to a node (both incoming and outgoing).
     */
    getConnectedEdges(e) {
      return Xf(e, t.edges);
    },
    /**
     * Check if two nodes are connected by an edge.
     * When `directed` is true, only checks source→target direction.
     */
    areNodesConnected(e, n, o = !1) {
      return Uf(e, n, t.edges, o);
    },
    /**
     * Apply a node-level filter predicate.
     * Nodes that fail the predicate get `filtered = true`.
     */
    setNodeFilter(e) {
      const n = [], o = [];
      for (const i of t.nodes) {
        const r = !e(i);
        i.filtered = r, r ? n.push(i) : o.push(i);
      }
      B("filter", `Node filter applied: ${o.length} visible, ${n.length} filtered`), t._emit("node-filter-change", { filtered: n, visible: o });
    },
    /**
     * Clear node filter — restore all nodes to visible.
     */
    clearNodeFilter() {
      let e = !1;
      for (const n of t.nodes)
        n.filtered && (n.filtered = !1, e = !0);
      e && (B("filter", "Node filter cleared"), t._emit("node-filter-change", { filtered: [], visible: [...t.nodes] }));
    },
    /**
     * Get nodes whose bounding rect overlaps the given node.
     * Accepts either a FlowNode object or a node ID string.
     */
    getIntersectingNodes(e, n) {
      const o = typeof e == "string" ? t.nodes.find((i) => i.id === e) : e;
      return o ? ag(o, t.nodes, n) : [];
    },
    /**
     * Check if two nodes' bounding rects overlap.
     * Accepts either FlowNode objects or node ID strings.
     */
    isNodeIntersecting(e, n, o) {
      const i = typeof e == "string" ? t.nodes.find((s) => s.id === e) : e, r = typeof n == "string" ? t.nodes.find((s) => s.id === n) : n;
      return !i || !r ? !1 : lg(i, r, o);
    },
    /**
     * Set runState on one or more nodes by ID.
     * The x-flow-node directive reactively applies .flow-node-{state} CSS classes.
     */
    setNodeState(e, n) {
      const o = Array.isArray(e) ? e : [e];
      for (const i of o) {
        const r = t._nodeMap.get(i);
        r && (r.runState = n);
      }
    },
    /**
     * Clear all runState values, removing state CSS classes from all nodes.
     */
    resetStates() {
      for (const e of t.nodes)
        delete e.runState;
    }
  };
}
function ug(t) {
  return {
    /**
     * Add one or more edges to the canvas.
     *
     * - Normalizes single edge or array input.
     * - Merges `defaultEdgeOptions` from config (edge-specific props override defaults).
     * - Captures history before mutation.
     * - Pushes collab updates when a collaboration bridge is active.
     * - Schedules auto-layout after the mutation.
     */
    addEdges(e, n) {
      const o = t._config.defaultEdgeOptions, i = t._config.connectionRules, r = (Array.isArray(e) ? e : [e]).map((l) => o ? { ...o, ...l } : l).filter((l) => {
        if (!i) return !0;
        const c = { source: l.source, sourceHandle: l.sourceHandle, target: l.target, targetHandle: l.targetHandle };
        return vt(c, i, t._nodeMap);
      });
      if (r.length === 0) return;
      t._captureHistory(), B("edge", `Adding ${r.length} edge(s)`, r.map((l) => l.id)), t.edges.push(...r), t._rebuildEdgeMap();
      const s = t._computeEndpointGrouping();
      s.size > 0 && t._markEdgesDirtyById(s), t._emit("edges-change", { type: "add", edges: r, origin: n?.source ?? "api" });
      const a = t._container ? He.get(t._container) : void 0;
      if (a?.bridge)
        for (const l of r)
          a.bridge.pushLocalEdgeAdd(l);
      t._scheduleAutoLayout();
    },
    /**
     * Remove one or more edges by ID.
     *
     * - Normalizes single ID or array input.
     * - Filters edges, rebuilds edge map, deselects removed edges.
     * - Captures history before mutation.
     * - Pushes collab updates when a collaboration bridge is active.
     * - Schedules auto-layout after the mutation.
     */
    removeEdges(e, n) {
      t._captureHistory();
      const o = new Set(Array.isArray(e) ? e : [e]);
      B("edge", `Removing ${o.size} edge(s)`, [...o]);
      const i = t.edges.filter((a) => o.has(a.id));
      t.edges = t.edges.filter((a) => !o.has(a.id)), t._rebuildEdgeMap();
      for (const a of o)
        t.selectedEdges.delete(a), t._edgeDirtyTicks?.delete(a), t._edgeCorridors?.delete(a);
      const r = t._computeEndpointGrouping();
      r.size > 0 && t._markEdgesDirtyById(r), i.length && t._emit("edges-change", { type: "remove", edges: i, origin: n?.source ?? "api" });
      const s = t._container ? He.get(t._container) : void 0;
      if (s?.bridge)
        for (const a of o)
          s.bridge.pushLocalEdgeRemove(a);
      t._scheduleAutoLayout();
    },
    /**
     * Look up an edge by ID.
     */
    getEdge(e) {
      return t._edgeMap.get(e);
    },
    /**
     * Get the visible SVG `<path>` element for an edge.
     * The visible path is the second `<path>` child (the first is the interaction hit area).
     */
    getEdgePathElement(e) {
      return t._container?.querySelector(`[data-flow-edge-id="${CSS.escape(e)}"]`)?.querySelector("path:nth-child(2)");
    },
    /**
     * Get the container element (SVG group) for an edge.
     */
    getEdgeElement(e) {
      return t._container?.querySelector(`[data-flow-edge-id="${CSS.escape(e)}"]`);
    },
    /**
     * Get the SVG element that hosts edge paths.
     * Returns the first `.flow-edge-svg` element inside the viewport if any edges
     * exist. When the canvas has zero edges (e.g., a particle-only canvas using
     * sendParticleAlongPath or sendParticleBetween), lazily creates and caches a
     * dedicated `.flow-particle-svg` element inside the edges container so
     * particle emission methods have a place to inject temporary paths.
     */
    getEdgeSvgElement() {
      if (!t._viewportEl) return null;
      const e = t._viewportEl.querySelector(".flow-edge-svg");
      if (e) return e;
      const n = t._viewportEl.querySelector(".flow-edges");
      if (!n) return null;
      let o = n.querySelector(".flow-particle-svg");
      return o || (o = document.createElementNS("http://www.w3.org/2000/svg", "svg"), o.setAttribute("class", "flow-particle-svg"), o.style.position = "absolute", o.style.top = "0", o.style.left = "0", o.style.width = "1px", o.style.height = "1px", o.style.overflow = "visible", o.style.pointerEvents = "none", n.appendChild(o)), o;
    }
  };
}
function fg(t) {
  return {
    // ── Coordinate Transforms ─────────────────────────────────────────────
    /**
     * Convert screen coordinates (e.g. from a pointer event) to flow
     * coordinates, accounting for the current viewport pan and zoom.
     */
    screenToFlowPosition(e, n) {
      if (!t._container) return { x: e, y: n };
      const o = t._container.getBoundingClientRect();
      return Gr(e, n, t._viewportLive ?? t.viewport, o);
    },
    /**
     * Convert flow coordinates to screen coordinates, accounting for the
     * current viewport pan and zoom.
     */
    flowToScreenPosition(e, n) {
      if (!t._container) return { x: e, y: n };
      const o = t._container.getBoundingClientRect();
      return ff(e, n, t._viewportLive ?? t.viewport, o);
    },
    // ── Fit & Bounds ──────────────────────────────────────────────────────
    /**
     * Resolve once every node has measured `dimensions`, deferring via
     * `requestAnimationFrame` (up to 10 retries) to give the DOM time to render.
     * Resolves `true` when all nodes are measured, or `false` when the retry
     * budget is exhausted with nodes still unmeasured.
     *
     * Shared by `fitView` and the whole-graph replace APIs so they await the
     * same measurement signal. `_retries` is an internal recursion counter.
     */
    _whenMeasured(e = 0) {
      return t.nodes.some((n) => !n.dimensions) ? e < 10 ? new Promise((n) => {
        requestAnimationFrame(() => n(this._whenMeasured(e + 1)));
      }) : Promise.resolve(!1) : Promise.resolve(!0);
    },
    /**
     * Fit all visible nodes into the viewport.
     *
     * Defers via `requestAnimationFrame` if any node lacks measured
     * dimensions (up to 10 retries) to give the DOM time to render.
     *
     * Returns a promise that resolves `true` once the fit runs, or `false`
     * if the retry budget is exhausted with nodes still unmeasured — so
     * callers can observe whether the fit actually happened. Callers that
     * ignore the return value are unaffected (the internal `fitViewOnInit`
     * path does exactly that).
     */
    fitView(e, n = 0) {
      const o = () => {
        const i = t.nodes.filter((s) => !s.hidden), r = Gt(co(i, t._nodeMap, t._config.nodeOrigin), t._config.nodeOrigin);
        return this.fitBounds(r, e), t._announcer?.handleEvent("fit-view", {}), !0;
      };
      return t.nodes.some((i) => !i.dimensions) ? this._whenMeasured(n).then((i) => i ? o() : !1) : Promise.resolve(o());
    },
    /**
     * Fit a specific rectangle into the viewport.
     *
     * If `duration` is specified, the transition is animated via
     * `ctx.animate()` (cross-mixin dependency). Otherwise the viewport
     * is set directly via `ctx._panZoom`.
     */
    fitBounds(e, n) {
      const o = t._container ? { width: t._container.clientWidth, height: t._container.clientHeight } : { width: 800, height: 600 }, i = no(
        e,
        o.width,
        o.height,
        t._config.minZoom ?? 0.5,
        t._config.maxZoom ?? 2,
        n?.padding ?? ni
      );
      B("viewport", "fitBounds", { rect: e, viewport: i });
      const r = n?.duration ?? 0;
      r > 0 ? t.animate?.(
        { viewport: { pan: { x: i.x, y: i.y }, zoom: i.zoom } },
        { duration: r }
      ) : t._panZoom?.setViewport(i);
    },
    /**
     * Get the bounding rectangle of the specified nodes (or all visible
     * nodes if no IDs are provided).
     */
    getNodesBounds(e) {
      let n;
      return e ? n = e.map((o) => t.getNode(o)).filter((o) => !!o) : n = t.nodes.filter((o) => !o.hidden), Gt(co(n, t._nodeMap, t._config.nodeOrigin), t._config.nodeOrigin);
    },
    /**
     * Compute the viewport (pan + zoom) that frames the given bounds
     * within the container, respecting min/max zoom and padding.
     */
    getViewportForBounds(e, n) {
      const o = t._container;
      return o ? no(
        e,
        o.clientWidth,
        o.clientHeight,
        t._config.minZoom ?? 0.5,
        t._config.maxZoom ?? 2,
        n ?? ni
      ) : { x: 0, y: 0, zoom: 1 };
    },
    // ── Viewport Mutation ─────────────────────────────────────────────────
    /**
     * Set the viewport programmatically (pan and/or zoom).
     */
    setViewport(e, n) {
      B("viewport", "setViewport", e), t._panZoom?.setViewport(e, n);
    },
    /**
     * Zoom in by `ZOOM_STEP_FACTOR`, clamped to `maxZoom`.
     */
    zoomIn(e) {
      const n = t._viewportLive ?? t.viewport, o = t._config.maxZoom ?? 2, i = Math.min(n.zoom * ss, o);
      B("viewport", "zoomIn", { from: n.zoom, to: i }), t._panZoom?.setViewport({ ...n, zoom: i }, e);
    },
    /**
     * Zoom out by `ZOOM_STEP_FACTOR`, clamped to `minZoom`.
     */
    zoomOut(e) {
      const n = t._viewportLive ?? t.viewport, o = t._config.minZoom ?? 0.5, i = Math.max(n.zoom / ss, o);
      B("viewport", "zoomOut", { from: n.zoom, to: i }), t._panZoom?.setViewport({ ...n, zoom: i }, e);
    },
    /**
     * Center the viewport on flow coordinate `(x, y)` at the given zoom
     * level (defaults to the current zoom).
     */
    setCenter(e, n, o, i) {
      const r = t._container;
      if (!r) return;
      const s = o ?? (t._viewportLive ?? t.viewport).zoom, a = r.clientWidth / 2 - e * s, l = r.clientHeight / 2 - n * s;
      B("viewport", "setCenter", { x: e, y: n, zoom: s }), t._panZoom?.setViewport({ x: a, y: l, zoom: s }, i);
    },
    /**
     * Pan the viewport by a delta `(dx, dy)`.
     */
    panBy(e, n, o) {
      const i = t._viewportLive ?? t.viewport;
      B("viewport", "panBy", { dx: e, dy: n }), t._panZoom?.setViewport(
        { x: i.x + e, y: i.y + n, zoom: i.zoom },
        o
      );
    },
    // ── Interactivity Toggle ──────────────────────────────────────────────
    /**
     * Toggle pan/zoom interactivity on and off.
     */
    toggleInteractive() {
      t.isInteractive = !t.isInteractive, B("interactive", "toggleInteractive", { isInteractive: t.isInteractive }), t._panZoom?.update({
        pannable: t.isInteractive && t._config?.pannable !== !1,
        zoomable: t.isInteractive && t._config?.zoomable !== !1
      });
    },
    // ── Color Mode ────────────────────────────────────────────────────────
    /**
     * The current resolved color mode ('light' | 'dark' | undefined).
     */
    get colorMode() {
      return t._colorModeHandle?.resolved;
    },
    // ── Container Dimensions ──────────────────────────────────────────────
    /**
     * Get the current width and height of the container element.
     */
    getContainerDimensions() {
      return {
        width: t._container?.clientWidth ?? 0,
        height: t._container?.clientHeight ?? 0
      };
    },
    // ── Panel Operations ──────────────────────────────────────────────────
    /**
     * Reset all panels by dispatching a `flow-panel-reset` CustomEvent
     * on the container and emitting a `panel-reset` event.
     */
    resetPanels() {
      B("panel", "resetPanels"), t._container?.dispatchEvent(new CustomEvent("flow-panel-reset")), t._emit("panel-reset");
    }
  };
}
let Lt = null;
const hg = 20;
function ai(t) {
  return JSON.parse(JSON.stringify(t));
}
function $s(t) {
  return `${t}-copy-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
}
function Na(t, e) {
  const n = t.filter((r) => r.selected), o = new Set(n.map((r) => r.id)), i = e.filter(
    (r) => r.selected || o.has(r.source) && o.has(r.target)
  );
  return Lt = {
    nodes: ai(n),
    edges: ai(i),
    pasteCount: 0
  }, { nodeCount: n.length, edgeCount: i.length };
}
function gg() {
  if (!Lt || Lt.nodes.length === 0) return null;
  Lt.pasteCount++;
  const t = Lt.pasteCount * hg, e = /* @__PURE__ */ new Map(), n = Lt.nodes.map((i) => {
    const r = $s(i.id);
    return e.set(i.id, r), {
      ...i,
      id: r,
      data: ai(i.data),
      position: { x: i.position.x + t, y: i.position.y + t },
      selected: !0
    };
  }), o = Lt.edges.map((i) => ({
    ...i,
    id: $s(i.id),
    source: e.get(i.source),
    target: e.get(i.target),
    selected: !0
  }));
  return { nodes: n, edges: o };
}
function pg(t, e) {
  const n = Na(t, e);
  return { nodeIds: t.filter((i) => i.selected).map((i) => i.id), ...n };
}
function mg(t) {
  return {
    // ── Deselect ─────────────────────────────────────────────────────────
    /**
     * Clear all node, edge, and row selections.
     *
     * - Sets `selected = false` on each selected node/edge data object.
     * - Clears `selectedNodes`, `selectedEdges`, and `selectedRows` Sets.
     * - Removes `.flow-node-selected`, `.flow-edge-selected`, and
     *   `.flow-row-selected` CSS classes from the DOM.
     * - Emits a `selection-change` event.
     */
    deselectAll() {
      if (!(t.selectedNodes.size === 0 && t.selectedEdges.size === 0 && t.selectedRows.size === 0)) {
        B("selection", "Deselecting all");
        for (const e of t.selectedNodes) {
          const n = t.getNode(e);
          n && (n.selected = !1);
        }
        for (const e of t.selectedEdges) {
          const n = t.getEdge(e);
          n && (n.selected = !1);
        }
        t.selectedNodes.clear(), t.selectedEdges.clear(), t.selectedRows.clear(), t._container?.querySelectorAll(".flow-node-selected, .flow-edge-selected, .flow-row-selected").forEach((e) => {
          e.classList.remove("flow-node-selected", "flow-edge-selected", "flow-row-selected");
        }), t._emitSelectionChange();
      }
    },
    // ── Deletion ─────────────────────────────────────────────────────────
    /**
     * Delete currently selected nodes and edges.
     *
     * - Filters out non-deletable nodes/edges (where `deletable === false`).
     * - Cascades edge deletion for edges connected to deleted nodes.
     * - Validates child removal constraints before deleting child nodes.
     * - Supports an async `onBeforeDelete` callback that can cancel or
     *   modify the set of items to delete.
     * - Wraps the entire operation in a single history step.
     */
    async _deleteSelected() {
      const e = [...t.selectedNodes].filter((l) => {
        const c = t.getNode(l);
        return c ? Qf(c) : !1;
      }), n = [...t.selectedEdges].filter((l) => t.getEdge(l)?.deletable !== !1);
      let o = e.map((l) => t.getNode(l)).filter(Boolean);
      const i = new Set(e), r = t.edges.filter(
        (l) => i.has(l.source) || i.has(l.target)
      ), s = /* @__PURE__ */ new Map();
      for (const l of r) s.set(l.id, l);
      for (const l of n) {
        const c = t.getEdge(l);
        c && s.set(c.id, c);
      }
      const a = [...s.values()];
      if (o = o.filter((l) => {
        if (!l.parentId || o.some((h) => h.id === l.parentId)) return !0;
        const c = t._getChildValidation(l.parentId);
        if (!c) return !0;
        const d = t.getNode(l.parentId);
        if (!d) return !0;
        const f = t.nodes.filter(
          (h) => h.parentId === l.parentId
        ), u = uo(d, l, f, c);
        return !u.valid && t._config.onChildValidationFail && t._config.onChildValidationFail({
          parent: d,
          child: l,
          operation: "remove",
          rule: u.rule,
          message: u.message
        }), u.valid;
      }), !(o.length === 0 && a.length === 0)) {
        if (t._config?.onBeforeDelete) {
          const l = await t._config.onBeforeDelete({
            nodes: o,
            edges: a
          });
          if (l === !1) {
            B("delete", "onBeforeDelete cancelled deletion");
            return;
          }
          t._captureHistory(), t._suspendHistory();
          try {
            if (l.nodes.length > 0 && (B("delete", `onBeforeDelete approved ${l.nodes.length} node(s)`), t.removeNodes(l.nodes.map((c) => c.id))), l.edges.length > 0) {
              const c = l.edges.map((d) => d.id).filter((d) => t.edges.some((f) => f.id === d));
              c.length > 0 && (B("delete", `onBeforeDelete approved ${c.length} edge(s)`), t.removeEdges(c));
            }
            t._recomputeChildValidation();
            for (const c of t.selectedNodes)
              t.nodes.some((d) => d.id === c) || t.selectedNodes.delete(c);
            for (const c of t.selectedEdges)
              t.edges.some((d) => d.id === c) || t.selectedEdges.delete(c);
          } finally {
            t._resumeHistory();
          }
          return;
        }
        t._captureHistory(), t._suspendHistory();
        try {
          if (o.length > 0 && (B("delete", `Deleting ${o.length} selected node(s)`), t.removeNodes(o.map((l) => l.id))), n.length > 0) {
            const l = n.filter(
              (c) => t.edges.some((d) => d.id === c)
            );
            l.length > 0 && (B("delete", `Deleting ${l.length} selected edge(s)`), t.removeEdges(l));
          }
          t._recomputeChildValidation();
          for (const l of t.selectedNodes)
            t.nodes.some((c) => c.id === l) || t.selectedNodes.delete(l);
          for (const l of t.selectedEdges)
            t.edges.some((c) => c.id === l) || t.selectedEdges.delete(l);
        } finally {
          t._resumeHistory();
        }
      }
    },
    // ── Clipboard Operations ─────────────────────────────────────────────
    /**
     * Copy currently selected nodes and their internal edges to the
     * module-level clipboard. Emits a `copy` event.
     */
    copy() {
      const e = Na(t.nodes, t.edges);
      e.nodeCount > 0 && (B("clipboard", `Copied ${e.nodeCount} node(s) and ${e.edgeCount} edge(s)`), t._emit("copy", e));
    },
    /**
     * Paste nodes/edges from the clipboard with new IDs and an
     * accumulating 20 px offset.
     *
     * - Deselects all current selection first.
     * - Pushes new nodes (topologically sorted) and edges directly.
     * - Selects all pasted items.
     * - Applies `.flow-node-selected` / `.flow-edge-selected` CSS classes
     *   after Alpine renders the new DOM elements.
     */
    paste() {
      const e = gg();
      if (e) {
        t._captureHistory(), t.deselectAll(), t.nodes.push(...e.nodes), t.nodes = $t(t.nodes), t._rebuildNodeMap(), t.edges.push(...e.edges), t._rebuildEdgeMap();
        for (const n of e.nodes)
          t.selectedNodes.add(n.id);
        for (const n of e.edges)
          t.selectedEdges.add(n.id);
        t._emitSelectionChange(), t._emit("nodes-change", { type: "add", nodes: e.nodes, origin: "paste" }), t._emit("edges-change", { type: "add", edges: e.edges, origin: "paste" }), t._emit("paste", { nodes: e.nodes, edges: e.edges }), B("clipboard", `Pasted ${e.nodes.length} node(s) and ${e.edges.length} edge(s)`), t.$nextTick(() => {
          for (const n of e.nodes)
            t._container?.querySelector(`[data-flow-node-id="${CSS.escape(n.id)}"]`)?.classList.add("flow-node-selected");
          for (const n of e.edges)
            t._container?.querySelector(`[data-flow-edge-id="${CSS.escape(n.id)}"]`)?.classList.add("flow-edge-selected");
        });
      }
    },
    /**
     * Copy selected nodes to the clipboard, then delete them.
     * Emits a `cut` event.
     */
    async cut() {
      if (t.selectedNodes.size === 0) return;
      const e = pg(t.nodes, t.edges);
      e.nodeCount !== 0 && (await t._deleteSelected(), t._emit("cut", { nodeCount: e.nodeCount, edgeCount: e.edgeCount }), B("clipboard", `Cut ${e.nodeCount} node(s)`));
    }
  };
}
function yg(t, e) {
  return t === e ? !0 : t === void 0 || e === void 0 ? t === e : JSON.stringify(t) === JSON.stringify(e);
}
function fo(t, e, n = {}) {
  const o = n.deleteMissing ?? !0, i = new Map(t.map((s) => [s.id, s])), r = [];
  for (const s of e) {
    const a = i.get(s.id);
    if (!a) {
      r.push(s);
      continue;
    }
    if (o)
      for (const l of Object.keys(a))
        l !== "id" && !(l in s) && delete a[l];
    for (const [l, c] of Object.entries(s))
      l === "id" || l === "__proto__" || l === "constructor" || l === "prototype" || yg(a[l], c) || (a[l] = c);
    r.push(a);
  }
  return r;
}
function Is(t, e, n) {
  const o = fo(t.nodes, $t(e.nodes));
  t.nodes.splice(0, t.nodes.length, ...o);
  const i = fo(t.edges, e.edges);
  t.edges.splice(0, t.edges.length, ...i), t._rebuildNodeMap(), t._rebuildEdgeMap(), t.deselectAll();
  for (const r of t.nodes)
    r.selected && (r.selected = !1);
  for (const r of t.edges)
    r.selected && (r.selected = !1);
  t._emit("restore", { nodes: t.nodes, edges: t.edges, origin: n }), requestAnimationFrame(() => {
    t._layoutAnimTick++, t._commitNodeGeometry?.();
  }), B("history", `${n} applied`, { nodes: e.nodes.length, edges: e.edges.length });
}
function wg(t) {
  return {
    // ── Save / Restore ────────────────────────────────────────────
    /**
     * Serialize the current canvas state (nodes, edges, viewport) as a
     * deep-cloned plain object. Emits a `save` event with the snapshot.
     */
    toObject() {
      const e = {
        nodes: JSON.parse(JSON.stringify(t.nodes)),
        edges: JSON.parse(JSON.stringify(t.edges)),
        viewport: { ...t.viewport }
      };
      return t._emit("save", e), e;
    },
    /**
     * Restore canvas state from a saved object.
     *
     * - Deep-clones incoming nodes/edges to avoid shared references.
     * - Sorts nodes topologically for correct parent-before-child ordering.
     * - Rebuilds node and edge lookup maps.
     * - Applies viewport if provided.
     * - Deselects all, emits `restore`, and schedules auto-layout.
     */
    fromObject(e) {
      if (B("store", "fromObject: restoring state", {
        nodes: e.nodes?.length ?? 0,
        edges: e.edges?.length ?? 0,
        viewport: !!e.viewport
      }), e.nodes) {
        const n = $t(
          JSON.parse(JSON.stringify(e.nodes))
        ), o = fo(t.nodes, n);
        t.nodes.splice(0, t.nodes.length, ...o);
      }
      if (e.edges) {
        const n = JSON.parse(JSON.stringify(e.edges)), o = fo(t.edges, n);
        t.edges.splice(0, t.edges.length, ...o);
      }
      if (t._rebuildNodeMap(), t._rebuildEdgeMap(), e.viewport) {
        const n = { ...t.viewport, ...e.viewport };
        t._panZoom?.setViewport(n);
      }
      t.deselectAll(), t._emit("restore", { ...e, origin: "load" }), t._scheduleAutoLayout(), requestAnimationFrame(() => {
        t._layoutAnimTick++, t._commitNodeGeometry?.();
      });
    },
    /**
     * Reset the canvas to its initial configuration state.
     */
    $reset() {
      B("store", "$reset: restoring initial config"), this.fromObject({
        nodes: t._config.nodes ?? [],
        edges: t._config.edges ?? [],
        viewport: t._config.viewport ?? { x: 0, y: 0, zoom: 1 }
      });
    },
    /**
     * Clear all nodes and edges, resetting the viewport to origin.
     */
    $clear() {
      B("store", "$clear: emptying canvas"), this.fromObject({
        nodes: [],
        edges: [],
        viewport: { x: 0, y: 0, zoom: 1 }
      });
    },
    /**
     * Replace the whole graph atomically — the first-class alternative to the
     * `$clear()` + `addNodes()` workaround. Built on the identity-preserving
     * `fromObject` path: surviving ids keep their live objects, new ids mount
     * fresh and measure, so an immediate `fitView()` actually fits (no manual
     * `await nextFrame()`). `edges` defaults to empty, so `replaceNodes(nodes)`
     * is a genuine whole-graph replace. Emits `restore` with `origin: 'load'`.
     * The returned promise resolves once the new nodes have measured dimensions.
     */
    replaceNodes(e, n) {
      return this.fromObject({ nodes: e, edges: n ?? [] }), t._whenMeasured().then(() => {
      });
    },
    /**
     * Replace just the nodes, leaving the current edges in place (the
     * react-flow-style `setNodes`). For a whole-graph swap use `replaceNodes`.
     * Resolves once the new nodes have measured dimensions.
     */
    setNodes(e) {
      return this.fromObject({ nodes: e }), t._whenMeasured().then(() => {
      });
    },
    // ── Undo / Redo ────────────────────────────────────────────
    /**
     * Undo the last structural change by popping a snapshot from the
     * history past stack. Rebuilds maps and deselects all after applying.
     */
    undo() {
      if (!t._history) return;
      const e = t._history.undo({ nodes: t.nodes, edges: t.edges });
      e && Is(t, e, "undo");
    },
    /**
     * Redo the last undone change by popping a snapshot from the
     * history future stack. Merges into existing objects and rebuilds maps.
     */
    redo() {
      if (!t._history) return;
      const e = t._history.redo({ nodes: t.nodes, edges: t.edges });
      e && Is(t, e, "redo");
    },
    /**
     * Whether an undo operation is available.
     */
    get canUndo() {
      return t._history?.canUndo ?? !1;
    },
    /**
     * Whether a redo operation is available.
     */
    get canRedo() {
      return t._history?.canRedo ?? !1;
    }
  };
}
function vg(t, e) {
  return t * (1 - e);
}
function _g(t, e) {
  return t * e;
}
function bg(t, e) {
  return e === "in" ? t : 1 - t;
}
function xg(t, e, n) {
  const o = t.getTotalLength();
  t.style.strokeDasharray = String(o);
  const i = n === "in" ? vg(o, e) : _g(o, e);
  t.style.strokeDashoffset = String(i), (n === "in" && e < 1 || n === "out") && (t.style.setProperty("marker-start", "none"), t.style.setProperty("marker-end", "none"));
}
function Eg(t) {
  t.style.removeProperty("stroke-dasharray"), t.style.removeProperty("stroke-dashoffset"), t.style.removeProperty("marker-start"), t.style.removeProperty("marker-end");
}
function Cg(t, e, n) {
  t.style.opacity = String(bg(e, n));
}
function Sg(t) {
  t.style.removeProperty("opacity");
}
const rt = Math.PI * 2, cn = /* @__PURE__ */ new Map(), kg = 64;
function Pi(t) {
  if (typeof document > "u" || typeof document.createElementNS != "function")
    return null;
  const e = cn.get(t);
  if (e) return e;
  const n = document.createElementNS("http://www.w3.org/2000/svg", "path");
  n.setAttribute("d", t);
  const o = n.getTotalLength(), i = (r) => {
    const s = n.getPointAtLength(r * o);
    return { x: s.x, y: s.y };
  };
  if (cn.size >= kg) {
    const r = cn.keys().next().value;
    r !== void 0 && cn.delete(r);
  }
  return cn.set(t, i), i;
}
function vw(t) {
  const { cx: e, cy: n, offset: o = 0, clockwise: i = !0 } = t, r = t.rx ?? t.radius ?? 100, s = t.ry ?? t.radius ?? 100, a = i ? 1 : -1;
  return (l) => ({
    x: e + r * Math.cos(rt * l * a + o * rt),
    y: n + s * Math.sin(rt * l * a + o * rt)
  });
}
function _w(t) {
  const { startX: e, startY: n, endX: o, endY: i, amplitude: r = 30, frequency: s = 1, offset: a = 0 } = t, l = o - e, c = i - n, d = Math.sqrt(l * l + c * c), f = d > 0 ? l / d : 1, h = -(d > 0 ? c / d : 0), p = f;
  return (g) => {
    const m = e + l * g, y = n + c * g, x = r * Math.sin(rt * s * g + a * rt);
    return { x: m + h * x, y: y + p * x };
  };
}
function bw(t, e) {
  const n = Pi(t);
  if (!n) return null;
  const { reverse: o = !1, startAt: i = 0, endAt: r = 1 } = e ?? {}, s = r - i;
  return (a) => {
    let l = i + a * s;
    return o && (l = r - a * s), n(l);
  };
}
function xw(t) {
  const { cx: e, cy: n, radius: o, angle: i = 60, offset: r = 0 } = t, s = i * Math.PI / 180;
  return (a) => {
    const l = s * Math.sin(rt * a + r * rt);
    return {
      x: e + o * Math.sin(l),
      y: n + o * Math.cos(l)
    };
  };
}
function Ew(t) {
  const { originX: e, originY: n, range: o = 20, speed: i = 1, seed: r = 0 } = t, s = 1 + r % 7 * 0.3, a = 1.3 + r % 11 * 0.2, l = 0.7 + r % 13 * 0.25, c = 1.1 + r % 17 * 0.15;
  return (d) => {
    const f = d * i * rt, u = (Math.sin(s * f) + Math.sin(a * f * 1.3)) / 2, h = (Math.sin(l * f * 0.9) + Math.sin(c * f * 1.1)) / 2;
    return { x: e + u * o, y: n + h * o };
  };
}
function Cw(t, e) {
  const n = e?.from ?? 0;
  return (o, i) => n + o * t;
}
let Ds = !1;
function ve(t) {
  try {
    return structuredClone(t);
  } catch {
    return Ds || (Ds = !0, typeof console < "u" && console.warn(
      "[AlpineFlow] Cloning fell back to JSON roundtrip because structuredClone could not clone the input (likely a reactive proxy or an object with functions). Non-JSON values (functions, Symbols, Dates) will be stripped. This warning fires once per session."
    )), JSON.parse(JSON.stringify(t));
  }
}
function Lg(t) {
  return {
    position: { ...t.position },
    class: t.class,
    style: typeof t.style == "string" ? t.style : t.style ? { ...t.style } : void 0,
    data: ve(t.data),
    dimensions: t.dimensions ? { ...t.dimensions } : void 0,
    selected: t.selected,
    zIndex: t.zIndex
  };
}
function Mg(t) {
  return {
    animated: t.animated,
    color: t.color,
    class: t.class,
    label: t.label,
    strokeWidth: t.strokeWidth
  };
}
function Pg(t, e) {
  t.position.x = e.position.x, t.position.y = e.position.y, t.class = e.class, t.style = e.style, t.data = ve(e.data), t.dimensions = e.dimensions ? { ...e.dimensions } : t.dimensions, t.selected = e.selected, t.zIndex = e.zIndex;
}
class Ni {
  constructor(e, n) {
    this._entries = [], this._state = "idle", this._reversed = !1, this._loopCount = -1, this._lockEnabled = !1, this._locked = !1, this._respectReducedMotion = void 0, this._listeners = /* @__PURE__ */ new Map(), this._context = {}, this._activeHandles = [], this._subTimelines = [], this._initialSnapshot = /* @__PURE__ */ new Map(), this._initialEdgeSnapshot = /* @__PURE__ */ new Map(), this._playResolve = null, this._pauseWaiters = /* @__PURE__ */ new Set(), this._canvas = e, this._engine = n ?? new Qr();
  }
  // ── Public API ───────────────────────────────────────────────────────
  get state() {
    return this._state;
  }
  get locked() {
    return this._locked;
  }
  get subTimelines() {
    return this._subTimelines;
  }
  get tag() {
    return this._tag;
  }
  setTag(e) {
    return this._tag = e, this;
  }
  step(e) {
    return this._entries.push({ type: "step", config: e }), this;
  }
  parallel(e) {
    return this._entries.push({ type: "parallel", configs: e }), this;
  }
  /**
   * Create and insert a sub-timeline via a builder callback.
   * Returns the sub-timeline for individual targeting.
   */
  timeline(e, n) {
    const o = new Ni(this._canvas, this._engine);
    return this._tag && !n?.independent && o.setTag(this._tag), e(o), this._entries.push({
      type: "step",
      config: { timeline: o, independent: n?.independent }
    }), o;
  }
  pause(e) {
    return this._entries.push({ type: "pause", callback: e }), this;
  }
  play() {
    return new Promise((e) => {
      this._playResolve = e, this._state = "playing", this._lockEnabled && (this._locked = !0), this._captureInitialSnapshot(), this._emit("play"), this._context = {}, this._runEntries(e);
    });
  }
  stop() {
    this._stopAll();
    for (const e of this._subTimelines)
      e.stop();
    this._subTimelines.length = 0, this._state = "stopped", this._locked = !1, this._emit("stop"), this._playResolve?.(), this._playResolve = null;
  }
  reset(e) {
    if (e)
      return console.warn("[AlpineFlow] timeline.reset(true) is deprecated. Use timeline.restart() instead."), this.restart();
    this._stopAll();
    for (const n of this._subTimelines)
      n.stop();
    this._subTimelines.length = 0, this._restoreInitialSnapshot(), this._state = "idle", this._locked = !1, this._emit("reset");
  }
  async restart(e) {
    this._stopAll();
    for (const n of this._subTimelines)
      n.stop();
    return this._subTimelines.length = 0, this._restoreInitialSnapshot(), this._state = "idle", this._locked = !1, e?.direction === "backward" ? this._reversed = !0 : e?.direction === "forward" && (this._reversed = !1), this._emit("restart"), this.play();
  }
  reverse() {
    return this._reversed = !this._reversed, this._emit("reverse"), this;
  }
  loop(e) {
    return this._loopCount = e ?? 0, this;
  }
  lock(e) {
    return this._lockEnabled = e ?? !0, this;
  }
  respectReducedMotion(e) {
    return this._respectReducedMotion = e ?? !0, this;
  }
  on(e, n) {
    return this._listeners.has(e) || this._listeners.set(e, /* @__PURE__ */ new Set()), this._listeners.get(e).add(n), this;
  }
  /** Externally pause a playing timeline. Non-independent sub-timelines are also paused. */
  pausePlayback() {
    if (this._state === "playing") {
      this._state = "paused", this._lockEnabled && (this._locked = !1);
      for (const e of this._subTimelines)
        e.state === "playing" && e.pausePlayback();
      this._emit("pause");
    }
  }
  /** Resume a paused timeline. Non-independent sub-timelines are also resumed. */
  resumePlayback() {
    if (this._state === "paused") {
      this._state = "playing", this._lockEnabled && (this._locked = !0);
      for (const e of this._subTimelines)
        e.state === "paused" && e.resumePlayback();
      this._emit("resume");
      for (const e of this._pauseWaiters) e();
      this._pauseWaiters.clear();
    }
  }
  /** Check if reduced motion is active (OS preference + not opted out). */
  _isReducedMotion() {
    return ea(this._respectReducedMotion);
  }
  // ── Internal: event emission ────────────────────────────────────────
  _emit(e, n) {
    const o = this._listeners.get(e);
    if (o)
      for (const i of o)
        i(n);
  }
  // ── Internal: snapshot management ───────────────────────────────────
  _captureInitialSnapshot() {
    if (!(this._initialSnapshot.size > 0))
      for (const e of this._entries)
        this._captureEntryTargets(e);
  }
  _captureEntryTargets(e) {
    if (e.type === "pause") return;
    const n = e.type === "parallel" ? e.configs : [e.config];
    for (const o of n) {
      const i = typeof o == "function" ? null : o;
      if (i)
        if (i.parallel)
          for (const r of i.parallel)
            this._captureStepTargets(r);
        else
          this._captureStepTargets(i);
    }
  }
  _captureStepTargets(e) {
    if (e.nodes) {
      for (const n of e.nodes)
        if (!this._initialSnapshot.has(n)) {
          const o = this._canvas.getNode(n);
          o && this._initialSnapshot.set(n, Lg(o));
        }
    }
    if (e.edges) {
      for (const n of e.edges)
        if (!this._initialEdgeSnapshot.has(n)) {
          const o = this._canvas.getEdge(n);
          o && this._initialEdgeSnapshot.set(n, Mg(o));
        }
    }
  }
  _restoreInitialSnapshot() {
    for (const [e, n] of this._initialSnapshot) {
      const o = this._canvas.getNode(e);
      o && Pg(o, n);
    }
  }
  // ── Internal: handle management ─────────────────────────────────────
  _stopAll() {
    for (const e of this._activeHandles)
      e.stop();
    this._activeHandles = [];
  }
  // ── Internal: entry execution ───────────────────────────────────────
  async _runEntries(e) {
    const n = this._reversed ? [...this._entries].reverse() : this._entries;
    let o = this._loopCount;
    const i = async () => {
      for (let r = 0; r < n.length; r++) {
        if (this._state === "stopped" || this._state === "paused" && (await this._waitForResume(), this._state === "stopped"))
          return;
        const s = n[r];
        if (s.type === "pause") {
          await this._executePause(s);
          continue;
        }
        if (s.type === "parallel") {
          await this._executeParallel(s.configs, r);
          continue;
        }
        const a = s.config, l = typeof a == "function" ? a(this._makeContext(r)) : a;
        l.parallel ? await this._executeParallelSteps(l.parallel, r) : await this._executeStep(l, r);
      }
    };
    if (await i(), this._state !== "stopped" && o !== -1) {
      let r = 0;
      for (; this._state !== "stopped"; )
        if (o === 0) {
          this._restoreInitialSnapshot(), this._emit("loop", { iteration: r++ });
          try {
            await i();
          } catch {
            e();
            return;
          }
        } else if (o > 0) {
          if (o--, this._restoreInitialSnapshot(), this._emit("loop", { iteration: this._loopCount - o }), await i(), o <= 0) break;
        } else
          break;
    }
    this._state !== "stopped" && (this._state = "idle", this._locked = !1, this._emit("complete")), e();
  }
  _makeContext(e, n) {
    return {
      ...this._context,
      stepIndex: e,
      stepId: n
    };
  }
  // ── Internal: pause-playback wait ────────────────────────────────────
  /** Block until resumePlayback() is called. Used by _runEntries when externally paused. */
  _waitForResume() {
    return new Promise((e) => {
      this._pauseWaiters.add(e);
    });
  }
  // ── Internal: pause execution ───────────────────────────────────────
  _executePause(e) {
    return new Promise((n) => {
      this._state = "paused", this._lockEnabled && (this._locked = !1), this._emit("pause");
      const o = (i) => {
        i && Object.assign(this._context, i), this._state = "playing", this._lockEnabled && (this._locked = !0), this._emit("resume"), n();
      };
      e.callback?.(o);
    });
  }
  // ── Internal: parallel execution ────────────────────────────────────
  async _executeParallel(e, n) {
    const o = e.map(
      (i) => typeof i == "function" ? i(this._makeContext(n)) : i
    );
    await this._executeParallelSteps(o, n);
  }
  async _executeParallelSteps(e, n) {
    const o = e.map((i) => this._executeStep(i, n));
    await Promise.all(o);
  }
  // ── Internal: single step execution ─────────────────────────────────
  async _executeStep(e, n) {
    const o = this._isReducedMotion(), i = o ? 0 : e.duration ?? 300, r = o ? 0 : e.delay ?? 0, s = so(e.easing), a = this._makeContext(n, e.id);
    if (e.when && !e.when(a)) {
      if (e.else)
        return this._executeStep(e.else, n);
      this._emit("step-skipped", { index: n, id: e.id });
      return;
    }
    if (e.timeline) {
      const N = e.timeline;
      if (this._tag && !e.independent && N.setTag(this._tag), e.independent || this._subTimelines.push(N), this._emit("step", { index: n, id: e.id, timeline: N }), e.onStart?.(a), await N.play(), this._state === "stopped") return;
      if (e.onComplete?.(a), this._emit("step-complete", { timeline: N }), !e.independent) {
        const R = this._subTimelines.indexOf(N);
        R >= 0 && this._subTimelines.splice(R, 1);
      }
      return;
    }
    if (this._emit("step", { index: n, id: e.id }), e.onStart?.(a), e.await && (await this._resolveAwait(e, n), this._state === "stopped"))
      return;
    if (e.await && this._isAwaitOnlyStep(e))
      return e.onProgress?.(1, a), e.onComplete?.(a), this._emit("step-complete"), Promise.resolve();
    const { validNodeIds: l, validEdgeIds: c } = this._validateStepTargets(e, n);
    if (this._isEmptyStep(e, l, c))
      return e.onProgress?.(1, a), e.onComplete?.(a), this._emit("step-complete"), Promise.resolve();
    const d = /* @__PURE__ */ new Map(), f = /* @__PURE__ */ new Map();
    this._captureNodeFromValues(e, l, d, f);
    const u = /* @__PURE__ */ new Map(), h = /* @__PURE__ */ new Map();
    this._captureEdgeFromValues(e, c, u, h);
    const p = this._resolveFollowPath(e), g = this._createGuidePath(e), m = !!(e.viewport || e.fitView || e.panTo);
    let y = null, x = null;
    m && this._canvas.viewport && (y = { ...this._canvas.viewport }, x = this._resolveTargetViewport(e));
    const C = e.edgeTransition ?? "none", b = e.addEdges?.map((N) => N.id) ?? [], E = e.removeEdges?.filter((N) => this._canvas.getEdge(N)).slice() ?? [], _ = {
      step: e,
      ctx: a,
      duration: i,
      delay: r,
      easing: s,
      validNodeIds: l,
      validEdgeIds: c,
      resolvedPathFn: p,
      guidePathEl: g,
      nodeFromDimensions: d,
      nodeFromStyles: f,
      edgeFromStrokeWidth: u,
      edgeFromColor: h,
      viewportFrom: y,
      viewportTarget: x,
      transition: C,
      addEdgeIds: b,
      removeEdgeIds: E
    };
    if (i === 0)
      return this._executeInstantStep(_);
    const S = this._prepareAnimatedEdges(e, C, b);
    return S && await S, p ? this._executeFollowPathStep(_) : this._executeAnimatedStep(_);
  }
  // ── Step decomposition: target validation ──────────────────────────
  /** Filter node/edge IDs to only those present on the canvas; warn in debug mode. */
  _validateStepTargets(e, n) {
    let o, i;
    if (e.nodes) {
      o = [];
      for (const r of e.nodes)
        this._canvas.getNode(r) ? o.push(r) : this._canvas.debug && console.warn(`[AlpineFlow] Animation step "${e.id ?? n}": node "${r}" not found, skipping`);
    }
    if (e.edges) {
      i = [];
      for (const r of e.edges)
        this._canvas.getEdge(r) ? i.push(r) : this._canvas.debug && console.warn(`[AlpineFlow] Animation step "${e.id ?? n}": edge "${r}" not found, skipping`);
    }
    return { validNodeIds: o, validEdgeIds: i };
  }
  // ── Step decomposition: empty-step check ───────────────────────────
  /** Return true when the step targets nodes/edges but has zero valid targets and nothing else to do. */
  _isEmptyStep(e, n, o) {
    const i = e.nodes && e.nodes.length > 0, r = e.edges && e.edges.length > 0, s = !!(e.viewport || e.fitView || e.panTo), a = !!(e.addEdges?.length || e.removeEdges?.length), l = i && (!n || n.length === 0), c = r && (!o || o.length === 0);
    return !!(l && c && !s && !a || l && !r && !s && !a || c && !i && !s && !a);
  }
  /** Check whether a step has only an await and no animation targets. */
  _isAwaitOnlyStep(e) {
    const n = e.nodes && e.nodes.length > 0, o = e.edges && e.edges.length > 0, i = !!(e.viewport || e.fitView || e.panTo), r = !!(e.addEdges?.length || e.removeEdges?.length);
    return !n && !o && !i && !r;
  }
  // ── Step decomposition: resolve awaitable ─────────────────────────
  /** Normalize and await the step's `await` field (Promise, handle, or thunk). */
  async _resolveAwait(e, n) {
    let o = e.await;
    if (o && (typeof o == "function" && (o = o()), o && typeof o == "object" && "finished" in o && !(o instanceof Promise) && (o = o.finished), o instanceof Promise))
      if (e.timeout && e.timeout > 0) {
        let i;
        const r = new Promise((a) => {
          i = setTimeout(() => a("timeout"), e.timeout);
        }), s = await Promise.race([o.then(() => "resolved"), r]);
        i !== void 0 && clearTimeout(i), s === "timeout" && this._emit("step-timeout", { index: n, id: e.id });
      } else
        await o;
  }
  // ── Step decomposition: capture from-values ────────────────────────
  /** Capture initial node dimensions and styles for interpolation. */
  _captureNodeFromValues(e, n, o, i) {
    if (n)
      for (const r of n) {
        const s = this._canvas.getNode(r);
        s && (s.dimensions && e.dimensions && o.set(r, { ...s.dimensions }), e.style && s.style && i.set(r, En(s.style)));
      }
  }
  /** Capture initial edge strokeWidth and color for interpolation. */
  _captureEdgeFromValues(e, n, o, i) {
    if (n)
      for (const r of n) {
        const s = this._canvas.getEdge(r);
        s && (e.edgeStrokeWidth !== void 0 && s.strokeWidth !== void 0 && o.set(r, s.strokeWidth), e.edgeColor !== void 0 && s.color !== void 0 && i.set(r, s.color));
      }
  }
  // ── Step decomposition: followPath & guide path ────────────────────
  /** Resolve a followPath config to a callable PathFunction. */
  _resolveFollowPath(e) {
    if (!e.followPath) return null;
    if (typeof e.followPath == "function")
      return e.followPath;
    const n = Pi(e.followPath);
    return !n && this._canvas.debug && console.warn("[AlpineFlow] SVG path resolution unavailable (no DOM), followPath string ignored"), n;
  }
  /** Create a visible SVG guide path overlay for string-based followPath. */
  _createGuidePath(e) {
    if (!e.guidePath?.visible || typeof e.followPath != "string" || typeof document > "u")
      return null;
    const n = this._canvas.getEdgeSvgElement?.();
    if (!n) return null;
    const o = document.createElementNS("http://www.w3.org/2000/svg", "path");
    return o.setAttribute("d", e.followPath), o.classList.add("flow-guide-path"), e.guidePath.class && o.classList.add(e.guidePath.class), n.appendChild(o), o;
  }
  // ── Step decomposition: instant execution (duration: 0) ────────────
  /** Handle an instant step (duration === 0), optionally with a delay. */
  _executeInstantStep(e) {
    const { step: n, ctx: o, delay: i, resolvedPathFn: r, validNodeIds: s, guidePathEl: a } = e;
    if (i > 0)
      return new Promise((l) => {
        const c = setTimeout(() => {
          this._applyStepFinal(n), n.onProgress?.(1, o), n.onComplete?.(o), this._emit("step-complete"), l();
        }, i), d = {
          stop() {
            clearTimeout(c);
          }
        };
        this._activeHandles.push(d);
      });
    if (r && s) {
      const l = r(1);
      for (const c of s) {
        const d = this._canvas.getNode(c);
        d && (d.position.x = l.x, d.position.y = l.y);
      }
    }
    return this._applyStepFinal(n), a && n.guidePath?.autoRemove !== !1 && a.remove(), n.onProgress?.(1, o), n.onComplete?.(o), this._emit("step-complete"), Promise.resolve();
  }
  // ── Step decomposition: pre-animation edge setup ───────────────────
  /** Add edges to the DOM and pre-hide them for transition animations. Returns a promise only when async work is needed. */
  _prepareAnimatedEdges(e, n, o) {
    if (e.addEdges && this._addEdges(e.addEdges), n !== "none" && o.length && e.addEdges)
      return new Promise((i) => {
        queueMicrotask(() => queueMicrotask(() => {
          n === "draw" ? this._applyEdgeDrawTransition(o, 0, "in") : n === "fade" && this._applyEdgeFadeTransition(o, 0, "in"), i();
        }));
      });
  }
  // ── Step decomposition: followPath animation ───────────────────────
  /** Execute an animated step using engine-based interpolation for followPath. */
  _executeFollowPathStep(e) {
    const {
      step: n,
      ctx: o,
      duration: i,
      delay: r,
      easing: s,
      validNodeIds: a,
      validEdgeIds: l,
      nodeFromDimensions: c,
      nodeFromStyles: d,
      edgeFromStrokeWidth: f,
      edgeFromColor: u,
      viewportFrom: h,
      viewportTarget: p,
      transition: g,
      addEdgeIds: m,
      removeEdgeIds: y,
      guidePathEl: x
    } = e, C = e.resolvedPathFn;
    return new Promise((b) => {
      const E = this._engine.register((_) => {
        if (this._state === "stopped")
          return b(), !0;
        const S = Math.min(_ / i, 1), N = s(S);
        if (a) {
          const R = C(N);
          for (const M of a) {
            const T = this._canvas.getNode(M);
            T && (T.position.x = R.x, T.position.y = R.y);
          }
        }
        return this._interpolateFollowPathTick(
          n,
          N,
          a,
          l,
          c,
          d,
          f,
          u,
          h,
          p
        ), this._tickEdgeTransitions(g, m, y, N), n.onProgress?.(S, o), S >= 1 ? (this._cleanupEdgeTransitions(g, m, y), y.length && this._removeEdges(y), this._applyStepInstant(n), x && n.guidePath?.autoRemove !== !1 && x.remove(), n.onProgress?.(1, o), n.onComplete?.(o), this._emit("step-complete"), b(), !0) : !1;
      }, r);
      this._activeHandles.push(E);
    });
  }
  /** Per-tick interpolation for properties during followPath animation. */
  _interpolateFollowPathTick(e, n, o, i, r, s, a, l, c, d) {
    if (o && e.dimensions)
      for (const f of o) {
        const u = this._canvas.getNode(f), h = r.get(f);
        !u || !h || !u.dimensions || (e.dimensions.width !== void 0 && (u.dimensions.width = at(h.width, e.dimensions.width, n)), e.dimensions.height !== void 0 && (u.fixedDimensions = !0, u.dimensions.height = at(h.height, e.dimensions.height, n)));
      }
    if (o && e.style) {
      const f = En(e.style);
      for (const u of o) {
        const h = this._canvas.getNode(u), p = s.get(u);
        h && p && (h.style = ta(p, f, n));
      }
    }
    if (i && e.edgeStrokeWidth !== void 0)
      for (const f of i) {
        const u = this._canvas.getEdge(f), h = a.get(f);
        u && (h !== void 0 ? u.strokeWidth = at(h, e.edgeStrokeWidth, n) : u.strokeWidth = e.edgeStrokeWidth);
      }
    if (i && e.edgeColor !== void 0)
      for (const f of i) {
        const u = this._canvas.getEdge(f), h = l.get(f);
        u && (h !== void 0 && typeof h == "string" ? u.color = Ci(h, e.edgeColor, n) : u.color = e.edgeColor);
      }
    if (c && d && this._canvas.viewport) {
      const f = Cf(c, d, n, {
        minZoom: this._canvas.minZoom,
        maxZoom: this._canvas.maxZoom
      });
      this._canvas.viewport.x = f.x, this._canvas.viewport.y = f.y, this._canvas.viewport.zoom = f.zoom;
    }
  }
  // ── Step decomposition: edge transition helpers ────────────────────
  /** Apply edge transitions (draw/fade) for a single animation tick. */
  _tickEdgeTransitions(e, n, o, i) {
    e === "draw" ? (n.length && this._applyEdgeDrawTransition(n, i, "in"), o.length && this._applyEdgeDrawTransition(o, i, "out")) : e === "fade" && (n.length && this._applyEdgeFadeTransition(n, i, "in"), o.length && this._applyEdgeFadeTransition(o, i, "out"));
  }
  /** Clean up edge transition styles at the end of animation. */
  _cleanupEdgeTransitions(e, n, o) {
    e === "draw" ? (this._cleanupEdgeDrawTransition(n), this._cleanupEdgeDrawTransition(o)) : e === "fade" && (this._cleanupEdgeFadeTransition(n), this._cleanupEdgeFadeTransition(o));
  }
  // ── Step decomposition: canvas.animate() execution ─────────────────
  /** Execute an animated step using canvas.animate() for standard interpolation. */
  _executeAnimatedStep(e) {
    const {
      step: n,
      ctx: o,
      duration: i,
      delay: r,
      validNodeIds: s,
      validEdgeIds: a,
      viewportFrom: l,
      viewportTarget: c,
      transition: d,
      addEdgeIds: f,
      removeEdgeIds: u,
      guidePathEl: h
    } = e;
    return new Promise((p) => {
      const g = this._buildAnimateTargets(
        n,
        s,
        a,
        l,
        c
      ), m = Object.keys(g.nodes || {}).length > 0 || Object.keys(g.edges || {}).length > 0 || g.viewport;
      if (!m && !f.length && !u.length) {
        n.onProgress?.(1, o), n.onComplete?.(o), this._emit("step-complete"), p();
        return;
      }
      if (m) {
        const y = this._canvas.animate(g, {
          duration: i,
          easing: n.easing,
          delay: r,
          onProgress: (x) => {
            if (this._state === "stopped") {
              y.stop(), p();
              return;
            }
            this._tickEdgeTransitions(d, f, u, x), n.onProgress?.(x, o);
          },
          onComplete: () => {
            this._cleanupEdgeTransitions(d, f, u), u.length && this._removeEdges(u), this._applyStepInstant(n), h && n.guidePath?.autoRemove !== !1 && h.remove(), n.onProgress?.(1, o), n.onComplete?.(o), this._emit("step-complete"), p();
          }
        });
        this._activeHandles.push({ stop: () => y.stop() });
      } else
        this._executeEdgeLifecycleOnly(e, p);
    });
  }
  /** Build AnimateTargets from step config for canvas.animate(). */
  _buildAnimateTargets(e, n, o, i, r) {
    const s = {};
    if (n) {
      s.nodes = {};
      for (const a of n) {
        const l = {};
        e.position && (l.position = { ...e.position }), e.dimensions && (l.dimensions = { ...e.dimensions }), e.style !== void 0 && (l.style = e.style), e.class !== void 0 && (l.class = e.class), e.data !== void 0 && (l.data = e.data), e.selected !== void 0 && (l.selected = e.selected), e.zIndex !== void 0 && (l.zIndex = e.zIndex), s.nodes[a] = l;
      }
    }
    if (o) {
      s.edges = {};
      for (const a of o) {
        const l = {};
        e.edgeColor !== void 0 && (l.color = e.edgeColor), e.edgeStrokeWidth !== void 0 && (l.strokeWidth = e.edgeStrokeWidth), e.edgeLabel !== void 0 && (l.label = e.edgeLabel), e.edgeAnimated !== void 0 && (l.animated = e.edgeAnimated), e.edgeClass !== void 0 && (l.class = e.edgeClass), s.edges[a] = l;
      }
    }
    return r && i && (s.viewport = {
      pan: { x: r.x, y: r.y },
      zoom: r.zoom
    }), s;
  }
  /** Run edge lifecycle transitions (draw/fade) via the engine when there are no other animatable targets. */
  _executeEdgeLifecycleOnly(e, n) {
    const { step: o, ctx: i, duration: r, delay: s, transition: a, addEdgeIds: l, removeEdgeIds: c, guidePathEl: d } = e, f = this._engine.register((u) => {
      if (this._state === "stopped")
        return n(), !0;
      const h = Math.min(u / r, 1);
      return this._tickEdgeTransitions(a, l, c, h), o.onProgress?.(h, i), h >= 1 ? (this._cleanupEdgeTransitions(a, l, c), c.length && this._removeEdges(c), d && o.guidePath?.autoRemove !== !1 && d.remove(), o.onProgress?.(1, i), o.onComplete?.(i), this._emit("step-complete"), n(), !0) : !1;
    }, s);
    this._activeHandles.push(f);
  }
  // ── Internal: apply step properties ─────────────────────────────────
  /** Apply all properties of a step at their final values (for instant steps). */
  _applyStepFinal(e) {
    if (e.addEdges && this._addEdges(e.addEdges), e.removeEdges && this._removeEdges(e.removeEdges), e.nodes)
      for (const n of e.nodes) {
        const o = this._canvas.getNode(n);
        o && (e.position && (e.position.x !== void 0 && (o.position.x = e.position.x), e.position.y !== void 0 && (o.position.y = e.position.y)), e.class !== void 0 && (o.class = e.class), e.data !== void 0 && Object.assign(o.data, e.data), e.selected !== void 0 && (o.selected = e.selected), e.zIndex !== void 0 && (o.zIndex = e.zIndex), e.dimensions && o.dimensions && (e.dimensions.width !== void 0 && (o.dimensions.width = e.dimensions.width), e.dimensions.height !== void 0 && (o.fixedDimensions = !0, o.dimensions.height = e.dimensions.height)), e.style !== void 0 && (o.style = e.style));
      }
    this._applyViewportFinal(e), this._applyStepInstant(e);
  }
  /** Apply instant-swap edge properties (not interpolated). */
  _applyStepInstant(e) {
    if (e.edges)
      for (const n of e.edges) {
        const o = this._canvas.getEdge(n);
        o && (e.edgeAnimated !== void 0 && (o.animated = e.edgeAnimated), e.edgeClass !== void 0 && (o.class = e.edgeClass), e.edgeLabel !== void 0 && (o.label = e.edgeLabel));
      }
  }
  // ── Internal: edge lifecycle ───────────────────────────────────────
  /** Add edges to the canvas edges array. */
  _addEdges(e) {
    this._canvas.edges.push(...e), this._canvas._rebuildEdgeMap?.();
  }
  /** Remove edges from the canvas edges array by ID. */
  _removeEdges(e) {
    for (const n of e) {
      const o = this._canvas.edges.findIndex((i) => i.id === n);
      o !== -1 && this._canvas.edges.splice(o, 1);
    }
    this._canvas._rebuildEdgeMap?.();
  }
  /** Apply draw transition on each tick for added/removed edges. */
  _applyEdgeDrawTransition(e, n, o) {
    for (const i of e) {
      const r = this._canvas.getEdgePathElement?.(i);
      r && xg(r, n, o);
    }
  }
  /** Clean up draw transition styles. */
  _cleanupEdgeDrawTransition(e) {
    for (const n of e) {
      const o = this._canvas.getEdgePathElement?.(n);
      o && Eg(o);
    }
  }
  /** Apply fade transition on each tick for added/removed edges. */
  _applyEdgeFadeTransition(e, n, o) {
    for (const i of e) {
      const r = this._canvas.getEdgeElement?.(i);
      r && Cg(r, n, o);
    }
  }
  /** Clean up fade transition styles. */
  _cleanupEdgeFadeTransition(e) {
    for (const n of e) {
      const o = this._canvas.getEdgeElement?.(n);
      o && Sg(o);
    }
  }
  // ── Internal: viewport helpers ──────────────────────────────────
  /** Compute the target viewport for a step (viewport, fitView, or panTo). */
  _resolveTargetViewport(e) {
    const n = this._canvas.viewport;
    return n ? e.fitView ? this._computeFitViewViewport(e) : e.panTo ? this._computePanToViewport(e.panTo) : e.viewport ? {
      x: e.viewport.x ?? n.x,
      y: e.viewport.y ?? n.y,
      zoom: e.viewport.zoom ?? n.zoom
    } : null : null;
  }
  /** Compute the viewport that fits all (or specified) nodes with padding. */
  _computeFitViewViewport(e) {
    const n = this._canvas.getContainerDimensions?.();
    if (!n) return null;
    const o = e.nodes ? e.nodes.map((s) => this._canvas.getNode(s)).filter((s) => !!s) : this._canvas.nodes;
    if (o.length === 0) return null;
    const i = Gt(o), r = e.fitViewPadding ?? 0.1;
    return no(
      i,
      n.width,
      n.height,
      this._canvas.minZoom ?? 0.5,
      this._canvas.maxZoom ?? 2,
      r
    );
  }
  /** Compute the viewport that centers on a given node. */
  _computePanToViewport(e) {
    const n = this._canvas.getNode(e);
    if (!n) return null;
    const o = this._canvas.viewport;
    if (!o) return null;
    const i = this._canvas.getContainerDimensions?.();
    if (!i) return null;
    const r = n.dimensions?.width ?? we, s = n.dimensions?.height ?? _e, a = n.position.x + r / 2, l = n.position.y + s / 2;
    return {
      x: i.width / 2 - a * o.zoom,
      y: i.height / 2 - l * o.zoom,
      zoom: o.zoom
    };
  }
  /** Apply viewport at final values (for instant steps). */
  _applyViewportFinal(e) {
    const n = this._resolveTargetViewport(e);
    !n || !this._canvas.viewport || (this._canvas.viewport.x = n.x, this._canvas.viewport.y = n.y, this._canvas.viewport.zoom = n.zoom);
  }
}
const Ta = /* @__PURE__ */ new Map();
function tn(t, e) {
  Ta.set(t, e);
}
function Ng(t) {
  return Ta.get(t);
}
const Fe = "http://www.w3.org/2000/svg", Tg = {
  create(t, e) {
    const n = document.createElementNS(Fe, "circle");
    if (n.setAttribute("r", String(e.size ?? 4)), n.setAttribute("fill", e.color ?? "#8B5CF6"), n.classList.add("flow-edge-particle"), e.class)
      for (const o of e.class.split(" "))
        o && n.classList.add(o);
    return t.appendChild(n), n;
  },
  update(t, { x: e, y: n }) {
    t.setAttribute("cx", String(e)), t.setAttribute("cy", String(n));
  },
  destroy(t) {
    t.remove();
  }
}, Ag = {
  create(t, e) {
    const n = document.createElementNS(Fe, "g"), o = e.size ?? 6, i = e.color ?? "#8B5CF6", r = document.createElementNS(Fe, "circle");
    r.setAttribute("r", String(o * 1.5)), r.setAttribute("fill", i), r.setAttribute("opacity", "0.3"), n.appendChild(r);
    const s = document.createElementNS(Fe, "circle");
    if (s.setAttribute("r", String(o)), s.setAttribute("fill", i), n.appendChild(s), e.class)
      for (const a of e.class.split(" "))
        a && n.classList.add(a);
    return t.appendChild(n), n;
  },
  update(t, { x: e, y: n, elapsed: o }) {
    const r = 1 + 0.2 * Math.sin(o * 1e-3 * 2 * Math.PI * 2);
    t.setAttribute("transform", `translate(${e},${n}) scale(${r})`);
  },
  destroy(t) {
    t.remove();
  }
};
let $g = 0;
const Ig = {
  create(t, e) {
    const n = document.createElementNS(Fe, "g");
    if (n.__beamLength = e.length ?? 30, n.__beamWidth = e.width ?? 4, n.__beamColor = e.color ?? "#8B5CF6", n.__beamGradient = e.gradient, n.__beamFollowThrough = e.followThrough ?? !0, n.__beamUid = `afbeam-${++$g}`, e.class)
      for (const o of e.class.split(" "))
        o && n.classList.add(o);
    return t.appendChild(n), n;
  },
  update(t, e) {
    const n = t, o = n.__beamLength, i = n.__beamWidth, r = n.__beamColor, s = n.__beamGradient, a = n.__beamUid;
    if (e.pathEl) {
      let d = n.__pathClone, f = n.__gradient;
      if (!d) {
        let g = r;
        if (s && s.length > 0) {
          const m = document.createElementNS(Fe, "defs");
          f = document.createElementNS(Fe, "linearGradient"), f.setAttribute("id", a), f.setAttribute("gradientUnits", "userSpaceOnUse");
          for (const y of s) {
            const x = document.createElementNS(Fe, "stop");
            x.setAttribute("offset", String(y.offset)), x.setAttribute("stop-color", y.color), y.opacity !== void 0 && x.setAttribute("stop-opacity", String(y.opacity)), f.appendChild(x);
          }
          m.appendChild(f), n.appendChild(m), g = `url(#${a})`, n.__gradient = f;
        }
        d = document.createElementNS(Fe, "path"), d.setAttribute("d", e.pathEl.getAttribute("d") ?? ""), d.setAttribute("fill", "none"), d.style.stroke = g, d.style.strokeWidth = String(i), d.style.strokeLinecap = "round", d.style.fill = "none", s || (d.style.opacity = "0.85"), d.setAttribute("stroke-dasharray", `${o} ${e.pathLength}`), n.appendChild(d), n.__pathClone = d;
      }
      const h = n.__beamFollowThrough ? e.progress * (e.pathLength + o) : e.progress * e.pathLength, p = o - h;
      if (d.setAttribute("stroke-dashoffset", String(p)), f) {
        const g = Math.max(0, Math.min(e.pathLength, h)), m = Math.max(0, Math.min(e.pathLength, h - o)), y = e.pathEl.getPointAtLength(g), x = e.pathEl.getPointAtLength(m);
        f.setAttribute("x1", String(x.x)), f.setAttribute("y1", String(x.y)), f.setAttribute("x2", String(y.x)), f.setAttribute("y2", String(y.y));
      }
      return;
    }
    let l = n.__fallbackRect;
    l || (l = document.createElementNS(Fe, "rect"), l.setAttribute("width", String(o)), l.setAttribute("height", String(i)), l.setAttribute("rx", String(i / 2)), l.setAttribute("fill", r), l.setAttribute("opacity", "0.8"), n.appendChild(l), n.__fallbackRect = l);
    const c = Math.atan2(e.velocity.y, e.velocity.x) * (180 / Math.PI);
    l.setAttribute(
      "transform",
      `translate(${e.x - o / 2},${e.y - i / 2}) rotate(${c},${o / 2},${i / 2})`
    );
  },
  destroy(t) {
    t.remove();
  }
}, Dg = {
  create(t, e) {
    const n = document.createElementNS(Fe, "circle");
    if (n.setAttribute("r", String(e.size ?? 6)), n.setAttribute("fill", "none"), n.setAttribute("stroke", e.color ?? "#8B5CF6"), n.setAttribute("stroke-width", "2"), e.class)
      for (const o of e.class.split(" "))
        o && n.classList.add(o);
    return t.appendChild(n), n;
  },
  update(t, { x: e, y: n, progress: o }) {
    const r = 1 + o * 2, s = Math.max(0, 1 - o);
    t.setAttribute("cx", "0"), t.setAttribute("cy", "0"), t.setAttribute("transform", `translate(${e},${n}) scale(${r})`), t.setAttribute("opacity", String(s));
  },
  destroy(t) {
    t.remove();
  }
}, Rg = {
  create(t, e) {
    const n = e.size ?? 16, o = e.href ?? "";
    let i;
    if (o.startsWith("#") ? (i = document.createElementNS(Fe, "use"), i.setAttribute("href", o), i.setAttribute("width", String(n)), i.setAttribute("height", String(n))) : (i = document.createElementNS(Fe, "image"), i.setAttribute("href", o), i.setAttribute("width", String(n)), i.setAttribute("height", String(n))), e.class)
      for (const r of e.class.split(" "))
        r && i.classList.add(r);
    return t.appendChild(i), i;
  },
  update(t, { x: e, y: n }) {
    const o = parseFloat(t.getAttribute("width") ?? "16");
    t.setAttribute("x", String(e - o / 2)), t.setAttribute("y", String(n - o / 2));
  },
  destroy(t) {
    t.remove();
  }
};
tn("circle", Tg);
tn("orb", Ag);
tn("beam", Ig);
tn("pulse", Dg);
tn("image", Rg);
let Rs = !1;
function Hg(t) {
  const e = t.match(/^([\d.]+)(ms|s)?$/);
  if (!e) return 2e3;
  const n = parseFloat(e[1]);
  return e[2] === "ms" ? n : n * 1e3;
}
function Hs(t, e, n) {
  if (t.speed !== void 0 && t.speed > 0)
    return t.duration !== void 0 && console.warn("[AlpineFlow] Both speed and duration provided for particle; speed takes precedence."), e / t.speed * 1e3;
  const o = t.duration ?? n;
  return typeof o == "number" ? o : Hg(o);
}
function Fg(t) {
  function e(o, i, r = {}, s = {}) {
    const a = r.renderer ?? "circle", l = Ng(a);
    if (!l) {
      B("particle", `_fireParticleOnPath: unknown renderer "${a}"`);
      return;
    }
    a === "beam" && typeof r.onComplete == "function" && r.followThrough === void 0 && !Rs && (Rs = !0, console.warn(
      "[AlpineFlow] beam `onComplete` fires after the tail exits the path (follow-through is on by default). Pass `followThrough: false` if you want `onComplete` to fire when the head reaches the target."
    ));
    const c = t._containerStyles, d = r.size ?? s.size ?? (parseFloat(c?.getPropertyValue("--flow-edge-dot-size").trim() ?? "4") || 4), f = r.color ?? s.color ?? c?.getPropertyValue("--flow-edge-dot-fill").trim() ?? xn, u = s.durationFallback ?? c?.getPropertyValue("--flow-edge-dot-duration").trim() ?? "2s", h = o.getTotalLength(), p = Hs(r, h, u), g = { ...r, size: d, color: f }, m = l.create(i, g), y = o.getPointAtLength(0), x = {
      x: y.x,
      y: y.y,
      progress: 0,
      velocity: { x: 0, y: 0 },
      pathLength: h,
      elapsed: 0,
      pathEl: o
    };
    l.update(m, x);
    let C;
    const b = new Promise((R) => {
      C = R;
    }), E = () => {
      typeof r.onComplete == "function" && r.onComplete(), C();
    }, _ = s.wrapOnComplete ? s.wrapOnComplete(E) : E, S = {
      element: m,
      renderer: l,
      pathEl: o,
      startElapsed: -1,
      // set on first engine tick
      ms: p,
      onComplete: _,
      currentPosition: { x: y.x, y: y.y }
    };
    return t._activeParticles.add(S), t._particleEngineHandle || (t._particleEngineHandle = io.register((R) => t._tickParticles(R))), {
      getCurrentPosition() {
        return t._activeParticles.has(S) ? { ...S.currentPosition } : null;
      },
      stop() {
        t._activeParticles.has(S) && (S.renderer.destroy(S.element), t._activeParticles.delete(S), _());
      },
      get finished() {
        return b;
      }
    };
  }
  function n(o, i = {}) {
    const r = t.getEdgeSvgElement?.();
    if (!r) {
      B("particle", "sendParticleAlongPath: SVG layer unavailable");
      return;
    }
    const s = document.createElementNS("http://www.w3.org/2000/svg", "path");
    s.setAttribute("d", o), s.style.display = "none", r.appendChild(s);
    const a = e(s, r, i, {
      wrapOnComplete: (l) => () => {
        l(), s.remove();
      }
    });
    if (!a) {
      s.remove();
      return;
    }
    return B("particle", "sendParticleAlongPath", { path: o.slice(0, 40) }), a;
  }
  return {
    // ── Particle tick loop ────────────────────────────────────────────────
    /**
     * Engine tick callback — processes all active particles in one pass.
     * Receives `elapsed` (ms since engine registration) from the engine.
     * Returns true to unregister from engine when all particles are done.
     */
    _tickParticles(o) {
      const i = /* @__PURE__ */ new Map();
      for (const r of t._activeParticles) {
        r.startElapsed < 0 && (r.startElapsed = o);
        const s = (o - r.startElapsed) / r.ms;
        if (s >= 1 || !r.element.parentNode) {
          r.renderer.destroy(r.element), typeof r.onComplete == "function" && r.onComplete(), t._activeParticles.delete(r);
          continue;
        }
        let a = i.get(r.pathEl);
        a === void 0 && (a = r.pathEl.getTotalLength(), i.set(r.pathEl, a));
        const l = r.pathEl.getPointAtLength(s * a), c = {
          x: l.x,
          y: l.y,
          progress: s,
          velocity: {
            x: l.x - r.currentPosition.x,
            y: l.y - r.currentPosition.y
          },
          pathLength: a,
          elapsed: o - r.startElapsed,
          pathEl: r.pathEl
        };
        r.renderer.update(r.element, c), r.currentPosition = { x: l.x, y: l.y };
      }
      return t._activeParticles.size === 0 ? (t._particleEngineHandle = null, !0) : !1;
    },
    // ── Send particle along edge ──────────────────────────────────────────
    /**
     * Fire a particle along an edge path. The particle is an SVG element
     * that follows the edge's `<path>` element using `getPointAtLength`.
     */
    sendParticle(o, i = {}) {
      const r = t._edgeSvgElements.get(o);
      if (r && r.style.display === "none") return;
      const s = t.getEdge(o);
      if (!s) {
        B("particle", `sendParticle: edge "${o}" not found`);
        return;
      }
      const a = t.getEdgePathElement(o);
      if (!a) {
        B("particle", `sendParticle: no path element for edge "${o}"`);
        return;
      }
      if (!a.getAttribute("d")) {
        B("particle", `sendParticle: edge "${o}" path has no d attribute`);
        return;
      }
      const c = t.getEdgeElement(o);
      if (!c) return;
      const d = t._containerStyles, f = i.size ?? s.particleSize ?? (parseFloat(d?.getPropertyValue("--flow-edge-dot-size").trim() ?? "4") || 4), u = i.color ?? s.particleColor ?? d?.getPropertyValue("--flow-edge-dot-fill").trim() ?? xn, h = s.animationDuration ?? d?.getPropertyValue("--flow-edge-dot-duration").trim() ?? "2s", p = e(a, c, i, {
        size: f,
        color: u,
        durationFallback: h
      });
      return p && B("particle", `sendParticle on edge "${o}"`, { size: f, color: u, duration: i.duration }), p;
    },
    // ── Send particle along arbitrary SVG path ───────────────────────────
    /**
     * Fire a particle along an arbitrary SVG path string, not tied to an
     * existing edge. A temporary invisible `<path>` element is injected
     * into the edge SVG layer and removed when the particle finishes.
     */
    sendParticleAlongPath(o, i = {}) {
      return n(o, i);
    },
    // ── Send particle between two nodes ──────────────────────────────────
    /**
     * Fire a particle along a straight line between two node centers.
     * Delegates to sendParticleAlongPath after computing the SVG path.
     */
    sendParticleBetween(o, i, r = {}) {
      const s = t.getNode(o);
      if (!s) {
        B("particle", `sendParticleBetween: source node "${o}" not found`);
        return;
      }
      const a = t.getNode(i);
      if (!a) {
        B("particle", `sendParticleBetween: target node "${i}" not found`);
        return;
      }
      const l = s.position.x + (s.dimensions?.width ?? 150) / 2, c = s.position.y + (s.dimensions?.height ?? 40) / 2, d = a.position.x + (a.dimensions?.width ?? 150) / 2, f = a.position.y + (a.dimensions?.height ?? 40) / 2, u = `M ${l} ${c} L ${d} ${f}`;
      return B("particle", `sendParticleBetween "${o}" -> "${i}"`, { path: u }), n(u, r);
    },
    // ── Burst: sequenced multi-particle emission ─────────────────────────
    /**
     * Fire multiple particles along a single edge with staggered timing.
     * An optional `variant` function customizes each particle individually.
     */
    sendParticleBurst(o, i) {
      const { count: r, stagger: s = 100, variant: a, ...l } = i, c = [], d = [];
      for (let u = 0; u < r; u++) {
        const h = a ? { ...l, ...a(u, r) } : { ...l };
        if (u === 0)
          c.push(this.sendParticle(o, h));
        else {
          const p = setTimeout(() => {
            c.push(this.sendParticle(o, h));
          }, u * s);
          d.push(p);
        }
      }
      const f = () => c.filter((u) => u != null);
      return {
        get handles() {
          return f();
        },
        get finished() {
          return new Promise((u) => {
            setTimeout(() => {
              Promise.all(f().map((h) => h.finished)).then(() => u());
            }, r * s + 50);
          });
        },
        stopAll() {
          for (const u of d)
            clearTimeout(u);
          for (const u of f())
            u.stop();
        }
      };
    },
    // ── Converging: fan-in particle visualization ───────────────────────
    /**
     * Fire particles from multiple edges that all arrive at (or depart from)
     * a target node simultaneously. For 'arrival' synchronization, shorter
     * paths get shorter durations and delayed starts so all particles reach
     * the target at the same time.
     */
    sendConverging(o, i) {
      const { targetNodeId: r, synchronize: s = "arrival", onAllArrived: a, ...l } = i, c = [], d = [];
      if (s === "arrival") {
        const u = o.map((g) => {
          const y = t.getEdgePathElement(g)?.getTotalLength() ?? 0;
          return { id: g, length: y };
        }).filter((g) => g.length > 0);
        if (u.length === 0) {
          const g = Promise.resolve();
          return { get handles() {
            return [];
          }, finished: g, stopAll() {
          } };
        }
        const h = Math.max(...u.map((g) => g.length)), p = Hs(l, h, "2s");
        for (const { id: g, length: m } of u) {
          const y = m / h, x = p * y, C = p - x;
          if (C <= 0) {
            const b = this.sendParticle(g, { ...l, duration: x });
            b && c.push(b);
          } else {
            const b = setTimeout(() => {
              const E = this.sendParticle(g, { ...l, duration: x });
              E && c.push(E);
            }, C);
            d.push(b);
          }
        }
      } else
        for (const u of o) {
          const h = this.sendParticle(u, l);
          h && c.push(h);
        }
      const f = new Promise((u) => {
        setTimeout(() => {
          Promise.all(c.map((p) => p.finished)).then(() => {
            a?.(), u();
          });
        }, s === "arrival" ? 100 : 0);
      });
      return {
        get handles() {
          return c;
        },
        finished: f,
        stopAll() {
          for (const u of d)
            clearTimeout(u);
          for (const u of c)
            u.stop();
        }
      };
    },
    // ── Cleanup ───────────────────────────────────────────────────────────
    /**
     * Stop the particle engine and remove all active particles from the DOM.
     * Called during canvas destroy().
     */
    destroyParticles() {
      t._particleEngineHandle?.stop(), t._particleEngineHandle = null;
      for (const o of t._activeParticles)
        o.renderer.destroy(o.element);
      t._activeParticles.clear();
    }
  };
}
class Og {
  constructor(e, n) {
    this.name = e, this._host = n;
  }
  animate(e, n) {
    const o = [...n?.tags ?? []];
    return n?.tag && o.push(n.tag), this._host.animate(e, { ...n, tag: this.name, tags: o });
  }
  update(e, n) {
    const o = [...n?.tags ?? []];
    return n?.tag && o.push(n.tag), this._host.update(e, { ...n, tag: this.name, tags: o });
  }
  sendParticle(e, n) {
    return this._host.sendParticle?.(e, { ...n, tag: this.name });
  }
  sendParticleAlongPath(e, n) {
    return this._host.sendParticleAlongPath?.(e, { ...n, tag: this.name });
  }
  sendParticleBetween(e, n, o) {
    return this._host.sendParticleBetween?.(e, n, { ...o, tag: this.name });
  }
  sendParticleBurst(e, n) {
    return this._host.sendParticleBurst(e, { ...n, tag: this.name });
  }
  sendConverging(e, n) {
    return this._host.sendConverging(e, { ...n, tag: this.name });
  }
  timeline() {
    const e = this._host.timeline?.();
    return e && typeof e.setTag == "function" && e.setTag(this.name), e;
  }
  cancelAll(e) {
    this._host.cancelAll({ tag: this.name }, e);
  }
  pauseAll() {
    this._host.pauseAll({ tag: this.name });
  }
  resumeAll() {
    this._host.resumeAll({ tag: this.name });
  }
  get handles() {
    return this._host.getHandles({ tag: this.name });
  }
}
const li = 1, ci = 1 / 60;
class hn {
  constructor(e) {
    this._virtualTime = 0, this._inFlight = /* @__PURE__ */ new Map(), this._state = ve(e);
  }
  /** Current virtual time in milliseconds. */
  get virtualTime() {
    return this._virtualTime;
  }
  /** Number of currently in-flight animations. */
  get inFlightCount() {
    return this._inFlight.size;
  }
  /** Return a deep-cloned copy of the current virtual canvas state. */
  getState() {
    return ve(this._state);
  }
  /** Advance virtual clock by `dt` seconds and step all in-flight animations. */
  advance(e) {
    if (!(e <= 0)) {
      this._virtualTime += e * 1e3;
      for (const [n, o] of this._inFlight)
        this._stepAnimation(o, e), this._isSettled(o) && this._inFlight.delete(n);
    }
  }
  /** Apply a recorded event to the virtual state. */
  applyEvent(e) {
    switch (e.type) {
      case "animate":
      case "update":
        this._applyAnimate(e);
        break;
      case "node-add": {
        const n = e.args.nodes;
        if (Array.isArray(n))
          for (const o of n)
            o?.id && (this._state.nodes[o.id] = ve(o));
        else n?.id ? this._state.nodes[n.id] = ve(n) : e.args.id && e.args.node && (this._state.nodes[e.args.id] = ve(e.args.node));
        break;
      }
      case "node-remove": {
        const n = e.args.ids;
        if (Array.isArray(n))
          for (const o of n)
            delete this._state.nodes[o];
        else typeof n == "string" ? delete this._state.nodes[n] : e.args.id && delete this._state.nodes[e.args.id];
        break;
      }
      case "edge-add": {
        const n = e.args.edges;
        if (Array.isArray(n))
          for (const o of n)
            o?.id && (this._state.edges[o.id] = ve(o));
        else n?.id ? this._state.edges[n.id] = ve(n) : e.args.id && e.args.edge && (this._state.edges[e.args.id] = ve(e.args.edge));
        break;
      }
      case "edge-remove": {
        const n = e.args.ids;
        if (Array.isArray(n))
          for (const o of n)
            delete this._state.edges[o];
        else typeof n == "string" ? delete this._state.edges[n] : e.args.id && delete this._state.edges[e.args.id];
        break;
      }
      case "viewport-change":
        Object.assign(this._state.viewport, e.args);
        break;
    }
  }
  /** Restore the engine from a Checkpoint. */
  restoreCheckpoint(e) {
    this._state = ve(e.canvas), this._virtualTime = e.t, this._inFlight.clear();
    for (const n of e.inFlight) {
      const o = ve(n);
      this._rehydrateAnim(o), this._inFlight.set(o.handleId, o);
    }
  }
  /** Capture the current engine state as a serializable Checkpoint payload. */
  captureCheckpointData() {
    return {
      canvas: ve(this._state),
      inFlight: [...this._inFlight.values()].map((e) => this._serializeAnim(e)),
      tagRegistry: {}
    };
  }
  // ── Private helpers ───────────────────────────────────────────────────────
  _applyAnimate(e) {
    const n = e.args.handleId ?? `virt-${this._virtualTime.toFixed(3)}-${this._inFlight.size}`;
    e.args.handleId || console.warn("[AlpineFlow VirtualEngine] animate event missing handleId — determinism not guaranteed for this event");
    const o = e.args.targets ?? {}, i = e.args.options ?? {}, r = i.motion, s = r ? sa(r) ?? void 0 : void 0, a = {
      handleId: n,
      type: s ? s.type : "eased",
      targets: ve(o),
      startTime: this._virtualTime,
      duration: i.duration,
      easing: i.easing,
      motion: s,
      direction: "forward",
      currentValues: {},
      _motion: s
    };
    this._initAnim(a), this._inFlight.set(n, a);
  }
  _initAnim(e) {
    const n = {}, o = {};
    if (this._collectNumericProperties(e.targets, n, o, this._state), e._from = n, e.type === "eased")
      e._easingFn = so(e.easing);
    else {
      e._physicsStates = /* @__PURE__ */ new Map();
      for (const i of Object.keys(n))
        e._physicsStates.set(i, {
          value: n[i],
          velocity: 0,
          target: o[i] ?? n[i],
          settled: !1
        });
    }
  }
  _collectNumericProperties(e, n, o, i) {
    for (const [s, a] of Object.entries(e.nodes ?? {})) {
      const l = i.nodes[s];
      if (!l)
        continue;
      const c = a.position;
      c?.x !== void 0 && (n[`nodes.${s}.position.x`] = l.position?.x ?? 0, o[`nodes.${s}.position.x`] = c.x), c?.y !== void 0 && (n[`nodes.${s}.position.y`] = l.position?.y ?? 0, o[`nodes.${s}.position.y`] = c.y);
    }
    const r = e.viewport;
    r?.pan?.x !== void 0 && (n["viewport.x"] = i.viewport.x, o["viewport.x"] = r.pan.x), r?.pan?.y !== void 0 && (n["viewport.y"] = i.viewport.y, o["viewport.y"] = r.pan.y), r?.zoom !== void 0 && (n["viewport.zoom"] = i.viewport.zoom, o["viewport.zoom"] = r.zoom);
  }
  _rehydrateAnim(e) {
    if (e._motion = e.motion, e.type === "eased") {
      e._easingFn = so(e.easing), e._from = e.fromValues ? { ...e.fromValues } : { ...e.currentValues ?? {} };
      return;
    }
    if (e.integratorState) {
      e._physicsStates = /* @__PURE__ */ new Map();
      for (const [n, o] of Object.entries(e.integratorState))
        e._physicsStates.set(n, {
          value: o.value ?? 0,
          velocity: o.velocity ?? 0,
          target: o.target ?? 0,
          settled: o.settled ?? !1
        });
    }
  }
  _serializeAnim(e) {
    const n = {};
    if (e._physicsStates)
      for (const [o, i] of e._physicsStates)
        n[o] = {
          velocity: i.velocity,
          value: i.value,
          target: i.target,
          settled: i.settled
        };
    return ve({
      handleId: e.handleId,
      type: e.type,
      targets: e.targets,
      startTime: e.startTime,
      duration: e.duration,
      easing: e.easing,
      motion: e.motion,
      direction: e.direction,
      integratorState: e._physicsStates ? n : e.integratorState,
      currentValues: e.currentValues,
      fromValues: e.fromValues
    });
  }
  _stepAnimation(e, n) {
    e.type === "eased" ? this._stepEased(e, n) : e._physicsStates && this._stepPhysics(e, n);
  }
  _stepEased(e, n) {
    if (!e.duration || !e._easingFn || !e._from)
      return;
    const o = this._virtualTime - e.startTime, i = e.duration > 0 ? Math.min(o / e.duration, 1) : 1, r = e._easingFn(i);
    for (const s of Object.keys(e._from)) {
      const a = e._from[s], l = this._getTargetValue(s, e.targets) ?? a, c = at(a, l, r);
      e.currentValues[s] = c, this._applyValueToState(s, c);
    }
  }
  _stepPhysics(e, n) {
    if (!e._physicsStates || !e._motion)
      return;
    const o = e._motion;
    for (const [i, r] of e._physicsStates)
      if (!r.settled) {
        switch (o.type) {
          case "spring":
            na(r, o, n);
            break;
          case "decay":
            Si(r, o, n);
            break;
          case "inertia":
            oa(r, o, n, i);
            break;
          case "keyframes": {
            const s = o, a = s.duration ?? 5e3, l = a > 0 ? Math.min((this._virtualTime - e.startTime) / a, 1) : 1;
            ia(r, s, l, i), l >= 1 && (r.settled = !0);
            break;
          }
        }
        e.currentValues[i] = r.value, this._applyValueToState(i, r.value);
      }
  }
  _getTargetValue(e, n) {
    const o = e.split(".");
    if (o[0] === "nodes" && o.length >= 4) {
      const i = o[1], r = n.nodes?.[i];
      if (!r)
        return;
      if (o[2] === "position" && o[3] === "x")
        return r.position?.x;
      if (o[2] === "position" && o[3] === "y")
        return r.position?.y;
    }
    if (o[0] === "viewport") {
      const i = n.viewport;
      if (o[1] === "x") return i?.pan?.x;
      if (o[1] === "y") return i?.pan?.y;
      if (o[1] === "zoom") return i?.zoom;
    }
  }
  _applyValueToState(e, n) {
    const o = e.split(".");
    if (o[0] === "nodes" && o.length >= 4) {
      const i = o[1], r = this._state.nodes[i];
      if (!r)
        return;
      r.position || (r.position = { x: 0, y: 0 }), o[2] === "position" && (o[3] === "x" && (r.position.x = n), o[3] === "y" && (r.position.y = n));
      return;
    }
    o[0] === "viewport" && (o[1] === "x" && (this._state.viewport.x = n), o[1] === "y" && (this._state.viewport.y = n), o[1] === "zoom" && (this._state.viewport.zoom = n));
  }
  _isSettled(e) {
    if (e.type === "eased")
      return this._virtualTime - e.startTime >= (e.duration ?? 0);
    if (e._physicsStates) {
      for (const n of e._physicsStates.values())
        if (!n.settled)
          return !1;
      return !0;
    }
    return !0;
  }
}
const Aa = /* @__PURE__ */ new Map();
function Ti(t, e) {
  Aa.set(t, e);
}
function zg(t) {
  return Aa.get(t);
}
function Ai(t, e = 20) {
  const n = Object.values(t);
  if (n.length === 0)
    return null;
  let o = 1 / 0, i = 1 / 0, r = -1 / 0, s = -1 / 0;
  for (const a of n) {
    const l = a.position?.x ?? 0, c = a.position?.y ?? 0, d = a.dimensions?.width ?? 150, f = a.dimensions?.height ?? 40;
    o = Math.min(o, l), i = Math.min(i, c), r = Math.max(r, l + d), s = Math.max(s, c + f);
  }
  return o -= e, i -= e, r += e, s += e, { minX: o, minY: i, vbWidth: r - o, vbHeight: s - i };
}
function $a(t) {
  let e = "";
  for (const n of Object.values(t.edges)) {
    const o = t.nodes[n.source], i = t.nodes[n.target];
    if (!o || !i)
      continue;
    const r = (o.position?.x ?? 0) + (o.dimensions?.width ?? 150) / 2, s = (o.position?.y ?? 0) + (o.dimensions?.height ?? 40) / 2, a = (i.position?.x ?? 0) + (i.dimensions?.width ?? 150) / 2, l = (i.position?.y ?? 0) + (i.dimensions?.height ?? 40) / 2;
    e += `<line x1="${r}" y1="${s}" x2="${a}" y2="${l}" stroke="currentColor" stroke-width="1" opacity="0.5"/>`;
  }
  return e;
}
const Vg = {
  render(t, { width: e, height: n }) {
    const o = Object.values(t.nodes);
    if (o.length === 0)
      return `<svg width="${e}" height="${n}" xmlns="http://www.w3.org/2000/svg"></svg>`;
    const i = Ai(t.nodes);
    if (!i)
      return `<svg width="${e}" height="${n}" xmlns="http://www.w3.org/2000/svg"></svg>`;
    const { minX: r, minY: s, vbWidth: a, vbHeight: l } = i;
    let c = `<svg width="${e}" height="${n}" viewBox="${r} ${s} ${a} ${l}" xmlns="http://www.w3.org/2000/svg">`;
    c += $a(t);
    for (const d of o) {
      const f = d.position?.x ?? 0, u = d.position?.y ?? 0, h = d.dimensions?.width ?? 150, p = d.dimensions?.height ?? 40;
      c += `<rect x="${f}" y="${u}" width="${h}" height="${p}" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1" rx="4"/>`;
    }
    return c += "</svg>", c;
  }
}, Bg = {
  render(t, { width: e, height: n }) {
    const o = Object.values(t.nodes);
    if (o.length === 0)
      return `<svg width="${e}" height="${n}" xmlns="http://www.w3.org/2000/svg"></svg>`;
    const i = Ai(t.nodes);
    if (!i)
      return `<svg width="${e}" height="${n}" xmlns="http://www.w3.org/2000/svg"></svg>`;
    const { minX: r, minY: s, vbWidth: a, vbHeight: l } = i;
    let c = `<svg width="${e}" height="${n}" viewBox="${r} ${s} ${a} ${l}" xmlns="http://www.w3.org/2000/svg">`;
    for (const d of Object.values(t.edges)) {
      const f = t.nodes[d.source], u = t.nodes[d.target];
      if (!f || !u)
        continue;
      const h = (f.position?.x ?? 0) + (f.dimensions?.width ?? 150) / 2, p = (f.position?.y ?? 0) + (f.dimensions?.height ?? 40) / 2, g = (u.position?.x ?? 0) + (u.dimensions?.width ?? 150) / 2, m = (u.position?.y ?? 0) + (u.dimensions?.height ?? 40) / 2;
      c += `<line x1="${h}" y1="${p}" x2="${g}" y2="${m}" stroke="currentColor" stroke-width="1.5" opacity="0.7"/>`;
    }
    for (const d of o) {
      const f = d.position?.x ?? 0, u = d.position?.y ?? 0, h = d.dimensions?.width ?? 150, p = d.dimensions?.height ?? 40;
      c += `<rect x="${f}" y="${u}" width="${h}" height="${p}" fill="none" stroke="currentColor" stroke-width="1.5" rx="4"/>`;
    }
    return c += "</svg>", c;
  }
}, qg = {
  render(t, { width: e, height: n, inFlight: o }) {
    const i = Object.values(t.nodes);
    if (i.length === 0)
      return `<svg width="${e}" height="${n}" xmlns="http://www.w3.org/2000/svg"></svg>`;
    const r = Ai(t.nodes);
    if (!r)
      return `<svg width="${e}" height="${n}" xmlns="http://www.w3.org/2000/svg"></svg>`;
    const s = /* @__PURE__ */ new Set();
    if (o) {
      for (const u of o)
        if (u.targets?.nodes)
          for (const h of Object.keys(u.targets.nodes))
            s.add(h);
    }
    const { minX: a, minY: l, vbWidth: c, vbHeight: d } = r;
    let f = `<svg width="${e}" height="${n}" viewBox="${a} ${l} ${c} ${d}" xmlns="http://www.w3.org/2000/svg">`;
    f += $a(t);
    for (const u of i) {
      const h = u.position?.x ?? 0, p = u.position?.y ?? 0, g = u.dimensions?.width ?? 150, m = u.dimensions?.height ?? 40;
      s.has(u.id ?? "") ? f += `<rect x="${h}" y="${p}" width="${g}" height="${m}" fill="currentColor" fill-opacity="0.8" stroke="currentColor" stroke-width="2" rx="4"/>` : f += `<rect x="${h}" y="${p}" width="${g}" height="${m}" fill="currentColor" fill-opacity="0.1" stroke="currentColor" stroke-width="1" rx="4" opacity="0.3"/>`;
    }
    return f += "</svg>", f;
  }
};
Ti("faithful", Vg);
Ti("outline", Bg);
Ti("activity", qg);
function di(t, e) {
  let n = 0, o = t.length;
  for (; n < o; ) {
    const i = n + o >>> 1;
    t[i].t > e ? o = i : n = i + 1;
  }
  return n;
}
function ui(t, e) {
  let n = 0, o = t.length;
  for (; n < o; ) {
    const i = n + o >>> 1;
    t[i].t >= e ? o = i : n = i + 1;
  }
  return n;
}
function Yg(t, e) {
  return e.split(".").reduce((n, o) => n?.[o], t);
}
function Ia(t) {
  if (t !== null && typeof t == "object") {
    Object.freeze(t);
    for (const e of Object.keys(t))
      Ia(t[e]);
  }
  return t;
}
class $i {
  constructor(e) {
    this.version = e.version, this.duration = e.duration, this.initialState = Ia(ve(e.initialState)), this.events = Object.freeze(ve(e.events)), this.checkpoints = Object.freeze(ve(e.checkpoints)), this.metadata = Object.freeze({ ...e.metadata ?? {} }), Object.freeze(this);
  }
  toJSON() {
    return {
      version: this.version,
      duration: this.duration,
      initialState: ve(this.initialState),
      events: ve(this.events),
      checkpoints: ve(this.checkpoints),
      metadata: { ...this.metadata }
    };
  }
  static fromJSON(e) {
    if (e.version > li)
      throw new Error(
        `[AlpineFlow] Recording version ${e.version} is newer than supported (${li}). Please update AlpineFlow to replay this recording.`
      );
    return new $i(e);
  }
  /**
   * Returns unique subjects (nodes, edges, timelines, particles) that appeared
   * during the recording, with their first-seen and last-seen timestamps.
   */
  getSubjects() {
    const e = /* @__PURE__ */ new Map(), n = (o, i, r) => {
      const s = `${o}:${i}`, a = e.get(s);
      a ? (r < a.firstSeenT && (a.firstSeenT = r), r > a.lastSeenT && (a.lastSeenT = r)) : e.set(s, { kind: o, id: i, firstSeenT: r, lastSeenT: r });
    };
    for (const o of Object.keys(this.initialState.nodes))
      n("node", o, 0);
    for (const o of Object.keys(this.initialState.edges))
      n("edge", o, 0);
    for (const o of this.events) {
      const { t: i, type: r, args: s } = o;
      switch (r) {
        case "animate":
        case "update":
          for (const a of Object.keys(s.targets?.nodes ?? {}))
            n("node", a, i);
          for (const a of Object.keys(s.targets?.edges ?? {}))
            n("edge", a, i);
          break;
        case "particle":
        case "particle-burst":
          s.edgeId && n("edge", s.edgeId, i);
          break;
        case "particle-between":
          s.source && n("node", s.source, i), s.target && n("node", s.target, i);
          break;
        case "converging":
          if (Array.isArray(s.sources))
            for (const a of s.sources)
              n("edge", a, i);
          s.options?.targetNodeId && n("node", s.options.targetNodeId, i);
          break;
        case "node-add":
        case "node-remove":
          if (s.id && n("node", s.id, i), Array.isArray(s.nodes))
            for (const a of s.nodes)
              a.id && n("node", a.id, i);
          break;
        case "edge-add":
        case "edge-remove":
          if (s.id && n("edge", s.id, i), Array.isArray(s.edges))
            for (const a of s.edges)
              a.id && n("edge", a.id, i);
          break;
      }
    }
    return Array.from(e.values());
  }
  /**
   * Returns activity spans for a specific subject identified by `id`.
   */
  getActivityFor(e) {
    const n = [];
    for (const o of this.events) {
      const { t: i, type: r, args: s } = o;
      if ((() => {
        switch (r) {
          case "animate":
          case "update":
            return e in (s.targets?.nodes ?? {}) || e in (s.targets?.edges ?? {});
          case "particle":
          case "particle-burst":
            return s.edgeId === e;
          case "particle-between":
            return s.source === e || s.target === e;
          case "converging":
            return Array.isArray(s.sources) && s.sources.includes(e) || s.options?.targetNodeId === e;
          case "node-add":
          case "node-remove":
            return !!(s.id === e || Array.isArray(s.nodes) && s.nodes.some((l) => l.id === e));
          case "edge-add":
          case "edge-remove":
            return !!(s.id === e || Array.isArray(s.edges) && s.edges.some((l) => l.id === e));
          default:
            return !1;
        }
      })())
        switch (r) {
          case "animate": {
            const l = s.options?.duration ?? 0;
            n.push({ startT: i, endT: i + l, reason: "animate" });
            break;
          }
          case "particle":
          case "particle-burst":
          case "particle-between": {
            const l = s.options?.duration ?? s.duration ?? 1;
            n.push({ startT: i, endT: i + l, reason: r });
            break;
          }
          case "converging": {
            const l = s.options?.duration ?? 1;
            n.push({ startT: i, endT: i + l, reason: "converging" });
            break;
          }
          default:
            n.push({ startT: i, endT: i + 1, reason: r });
            break;
        }
    }
    return n;
  }
  /**
   * Returns sample points for a property's value over time, sampled from checkpoints.
   * `path` uses dot notation, e.g. `'nodes.trigger.position.x'`.
   */
  getValueTrack(e) {
    const n = [];
    for (const o of this.checkpoints) {
      const i = Yg(o.canvas, e);
      i !== void 0 && n.push({ t: o.t, v: i });
    }
    return n;
  }
  /**
   * Returns the canvas state at virtual time `t` by running the VirtualEngine
   * up to that point from the nearest prior checkpoint.
   */
  getStateAt(e) {
    const n = new hn(this.initialState);
    let o = null;
    for (const c of this.checkpoints)
      c.t <= e && (!o || c.t > o.t) && (o = c);
    o && n.restoreCheckpoint(o);
    const i = o?.t ?? 0, r = this.events;
    let s = i;
    const a = ci * 1e3;
    let l = o ? di(r, i) : ui(r, i);
    for (; s < e; ) {
      const c = Math.min(s + a, e);
      for (; l < r.length && r[l].t <= c; )
        n.applyEvent(r[l]), l++;
      const d = (c - s) / 1e3;
      n.advance(d), s = c;
    }
    return n.getState();
  }
  /**
   * Renders a thumbnail SVG snapshot of the canvas state at virtual time `t`.
   */
  renderThumbnailAt(e, n) {
    const o = this.getStateAt(e), i = n.renderer ?? "faithful", r = zg(i);
    if (!r)
      throw new Error(`[AlpineFlow] Unknown thumbnail renderer "${i}"`);
    return r.render(o, { width: n.width, height: n.height });
  }
}
class Xg {
  constructor(e, n = {}) {
    this._events = [], this._checkpoints = [], this._startTime = 0, this._originalMethods = {}, this._checkpointTimer = null, this._eventCounter = 0, this._activeAnims = /* @__PURE__ */ new Map(), this._canvas = e, this._checkpointInterval = n.checkpointInterval ?? 500, this._maxDuration = n.maxDuration ?? 6e4;
  }
  async record(e, n) {
    this._startTime = performance.now();
    const o = this._captureSnapshot();
    this._installHooks(), this._scheduleCheckpoints();
    try {
      const r = e();
      if (r instanceof Promise && await r, this._virtualNow() > this._maxDuration)
        throw new Error(`[AlpineFlow] Recording exceeded maxDuration (${this._maxDuration}ms)`);
    } finally {
      this._uninstallHooks(), this._checkpointTimer !== null && (clearInterval(this._checkpointTimer), this._checkpointTimer = null);
    }
    this._captureCheckpoint(), this._activeAnims.clear();
    const i = {
      version: li,
      duration: this._virtualNow(),
      initialState: o,
      events: this._events,
      checkpoints: this._checkpoints,
      metadata: n
    };
    return new $i(i);
  }
  _virtualNow() {
    return performance.now() - this._startTime;
  }
  _recordEvent(e, n) {
    this._events.push({
      t: this._virtualNow(),
      type: e,
      args: this._sanitizeArgs(n)
    });
  }
  /** Strip non-serializable values (functions, etc.) and log warnings. */
  _sanitizeArgs(e) {
    const n = {};
    for (const [o, i] of Object.entries(e)) {
      if (typeof i == "function") {
        console.warn(`[AlpineFlow recorder] Stripped non-serializable option "${o}" (function)`);
        continue;
      }
      i && typeof i == "object" ? n[o] = this._sanitizeNested(i) : n[o] = i;
    }
    return n;
  }
  _sanitizeNested(e) {
    if (e === null || typeof e != "object")
      return e;
    if (Array.isArray(e))
      return e.map((o) => this._sanitizeNested(o));
    const n = {};
    for (const [o, i] of Object.entries(e)) {
      if (typeof i == "function") {
        console.warn(`[AlpineFlow recorder] Stripped nested function at key "${o}"`);
        continue;
      }
      n[o] = this._sanitizeNested(i);
    }
    return n;
  }
  /**
   * Capture the live canvas values that an animate()/update() call is about
   * to transition FROM. Keys are the same flat form VirtualEngine uses
   * (e.g. `nodes.n.position.x`) so rehydration can lerp correctly.
   */
  _snapshotFromValues(e) {
    const n = {}, o = e?.nodes ?? {}, i = /* @__PURE__ */ new Map();
    for (const s of this._canvas.nodes ?? [])
      s && typeof s == "object" && "id" in s && i.set(s.id, s);
    for (const [s, a] of Object.entries(o)) {
      const l = i.get(s);
      if (!l) continue;
      const c = a.position;
      c?.x !== void 0 && (n[`nodes.${s}.position.x`] = l.position?.x ?? 0), c?.y !== void 0 && (n[`nodes.${s}.position.y`] = l.position?.y ?? 0);
    }
    const r = e?.viewport;
    return r?.pan?.x !== void 0 && (n["viewport.x"] = this._canvas.viewport.x), r?.pan?.y !== void 0 && (n["viewport.y"] = this._canvas.viewport.y), r?.zoom !== void 0 && (n["viewport.zoom"] = this._canvas.viewport.zoom), n;
  }
  _captureSnapshot() {
    const e = {};
    for (const o of this._canvas.nodes ?? [])
      o && typeof o == "object" && "id" in o && (e[o.id] = ve(o));
    const n = {};
    for (const o of this._canvas.edges ?? [])
      o && typeof o == "object" && "id" in o && (n[o.id] = ve(o));
    return {
      nodes: e,
      edges: n,
      viewport: { ...this._canvas.viewport }
    };
  }
  _captureCheckpoint() {
    this._checkpoints.push({
      t: this._virtualNow(),
      canvas: this._captureSnapshot(),
      inFlight: this._captureInFlight(),
      tagRegistry: {}
    });
  }
  /**
   * Serialize the current in-flight animations tracked by this recorder into
   * the InFlightAnimation shape the VirtualEngine can restore from.
   * Draws data from each ActiveAnim entry's original event args + the handle's
   * live state. Finished handles are skipped (the finished promise cleanup
   * typically runs before this, but we defend anyway).
   */
  _captureInFlight() {
    const e = [];
    for (const n of this._activeAnims.values()) {
      if (n.handle?.isFinished) continue;
      const o = n.options ?? {}, i = !!o.motion;
      let r = "eased";
      if (i) {
        const l = o.motion;
        typeof l == "string" ? r = l.split(".")[0] : l && typeof l == "object" && l.type && (r = l.type);
      }
      let s = {};
      const a = n.handle?.currentValue;
      a && typeof a.forEach == "function" && a.forEach((l, c) => {
        s[c] = l;
      }), e.push({
        handleId: n.handleId,
        type: r,
        targets: ve(n.targets),
        startTime: n.eventT,
        duration: i ? void 0 : o.duration ?? 300,
        easing: i ? void 0 : o.easing,
        motion: i ? ve(o.motion) : void 0,
        direction: n.handle?.direction ?? "forward",
        currentValues: s,
        fromValues: { ...n.fromValues },
        // integratorState populated if/when handles expose physics state.
        // For now, scrubbing into mid-physics relies on rehydration via
        // walk-forward from the nearest event; direct physics state
        // capture is a planned follow-up for perfect fidelity.
        integratorState: void 0
      });
    }
    return e;
  }
  _scheduleCheckpoints() {
    this._checkpointTimer = setInterval(() => {
      this._captureCheckpoint();
    }, this._checkpointInterval);
  }
  _installHooks() {
    const e = (o, i, r) => {
      const s = this._canvas[o];
      typeof s == "function" && (this._originalMethods[o] = s, this._canvas[o] = (...a) => {
        const l = r ? r(...a) : { args: a };
        return this._recordEvent(i, l), s.apply(this._canvas, a);
      });
    }, n = (o, i) => {
      const r = this._canvas[o];
      typeof r == "function" && (this._originalMethods[o] = r, this._canvas[o] = (s, a) => {
        const l = `rec-${++this._eventCounter}`, c = this._virtualNow(), d = this._snapshotFromValues(s);
        this._recordEvent(i, { targets: s, options: a, handleId: l });
        const f = r.apply(this._canvas, [s, a]);
        if (f && typeof f == "object" && f.finished && !f.isFinished) {
          const u = { handleId: l, eventT: c, targets: s, options: a, handle: f, fromValues: d };
          this._activeAnims.set(l, u), f.finished.then(() => {
            this._activeAnims.delete(l);
          }).catch(() => {
            this._activeAnims.delete(l);
          });
        }
        return f;
      });
    };
    n("animate", "animate"), n("update", "update"), e("sendParticle", "particle", (o, i) => ({ edgeId: o, options: i })), e("sendParticleAlongPath", "particle-along-path", (o, i) => ({ path: o, options: i })), e("sendParticleBetween", "particle-between", (o, i, r) => ({ source: o, target: i, options: r })), e("sendParticleBurst", "particle-burst", (o, i) => ({ edgeId: o, options: i })), e("sendConverging", "converging", (o, i) => ({ sources: o, options: i })), e("addNodes", "node-add", (o) => ({ nodes: o })), e("removeNodes", "node-remove", (o) => ({ ids: o })), e("addEdges", "edge-add", (o) => ({ edges: o })), e("removeEdges", "edge-remove", (o) => ({ ids: o }));
  }
  _uninstallHooks() {
    for (const [e, n] of Object.entries(this._originalMethods))
      this._canvas[e] = n;
    this._originalMethods = {};
  }
}
class Wg {
  constructor(e, n, o = {}) {
    this._currentTime = 0, this._state = "idle", this._direction = "forward", this._speed = 1, this._rafHandle = null, this._lastWallTime = 0, this._resolveFinished = () => {
    }, this.recording = n, this._canvas = e, this._virtualEngine = new hn(n.initialState), this._speed = o.speed ?? 1, this._direction = this._speed < 0 ? "backward" : "forward", this._from = o.from ?? 0, this._to = o.to ?? n.duration, this._loop = o.loop ?? !1, this._currentTime = this._from, this._from > 0 && this._seekEngineTo(this._from), o.skipInitialState || this._applyStateToCanvas(this._virtualEngine.getState()), this.finished = new Promise((i) => {
      this._resolveFinished = i;
    }), o.paused ? this._state = "paused" : this._speed !== 0 && this.play();
  }
  get duration() {
    return this.recording.duration;
  }
  get currentTime() {
    return this._currentTime;
  }
  get state() {
    return this._state;
  }
  get direction() {
    return this._direction;
  }
  get speed() {
    return this._speed;
  }
  set speed(e) {
    this._speed = e, this._direction = e < 0 ? "backward" : "forward";
  }
  play() {
    this._state !== "playing" && (this._state === "ended" && (this._currentTime = this._from, this._seekEngineTo(this._from), this._applyStateToCanvas(this._virtualEngine.getState())), this._state = "playing", this._lastWallTime = Ro(), this._scheduleTick());
  }
  pause() {
    this._state === "playing" && (this._state = "paused", this._cancelTick());
  }
  stop() {
    this._cancelTick(), this._currentTime = this._from, this._virtualEngine = new hn(this.recording.initialState), this._applyStateToCanvas(this._virtualEngine.getState()), this._state = "idle";
  }
  scrubTo(e) {
    const n = this._resolveTarget(e);
    this._currentTime = n, this._seekEngineTo(n), this._applyStateToCanvas(this._virtualEngine.getState());
  }
  seek(e) {
    this.scrubTo(e);
  }
  eventsUpTo(e) {
    return this.recording.events.filter((n) => n.t <= e);
  }
  getStateAt(e) {
    const n = this._findNearestCheckpoint(e), o = new hn(this.recording.initialState);
    n && o.restoreCheckpoint(n);
    const i = n?.t ?? 0, r = this.recording.events;
    let s = i;
    const a = ci * 1e3;
    let l = n ? di(r, i) : ui(r, i);
    for (; s < e; ) {
      const c = Math.min(s + a, e);
      for (; l < r.length && r[l].t <= c; )
        o.applyEvent(r[l]), l++;
      const d = (c - s) / 1e3;
      d > 0 && o.advance(d), s = c;
    }
    return o.getState();
  }
  // ── Private ─────────────────────────────────────────────────────────────
  _tick() {
    if (this._state !== "playing")
      return;
    const e = Ro(), n = (e - this._lastWallTime) / 1e3;
    this._lastWallTime = e;
    const o = n * this._speed * 1e3, i = this._currentTime + o;
    if (this._direction === "forward" ? i >= this._to : i <= this._from) {
      const s = this._direction === "forward" ? this._to : this._from;
      this._direction === "forward" ? this._walkTo(this._currentTime, s, !0) : this._seekEngineTo(s), this._currentTime = s, this._applyStateToCanvas(this._virtualEngine.getState()), this._handleEnd();
      return;
    }
    o > 0 ? this._walkTo(this._currentTime, i, !0) : o < 0 && this._seekEngineTo(i), this._currentTime = i, this._applyStateToCanvas(this._virtualEngine.getState()), this._scheduleTick();
  }
  _scheduleTick() {
    typeof requestAnimationFrame == "function" ? this._rafHandle = requestAnimationFrame(() => this._tick()) : this._rafHandle = setTimeout(() => this._tick(), 16);
  }
  _cancelTick() {
    this._rafHandle !== null && (typeof cancelAnimationFrame == "function" ? cancelAnimationFrame(this._rafHandle) : clearTimeout(this._rafHandle), this._rafHandle = null);
  }
  /**
   * Reset the virtual engine to reflect the canvas state at virtual time `t`
   * — either by restoring the nearest checkpoint and walking forward, or by
   * walking from the recording's initial state. Used when seeking discretely
   * (play-after-ended, loop restart, constructor with non-zero `from`);
   * scrubTo has its own inlined copy because it also updates `_currentTime`.
   */
  _seekEngineTo(e) {
    const n = this._findNearestCheckpoint(e);
    n ? this._virtualEngine.restoreCheckpoint(n) : this._virtualEngine = new hn(this.recording.initialState), this._walkTo(n?.t ?? 0, e);
  }
  _walkTo(e, n, o = !1) {
    if (n <= e)
      return;
    const i = this.recording.events;
    let r = e;
    const s = ci * 1e3;
    let a = e === 0 ? ui(i, 0) : di(i, e);
    for (; r < n; ) {
      const l = Math.min(r + s, n);
      for (; a < i.length && i[a].t <= l; ) {
        const d = i[a];
        this._virtualEngine.applyEvent(d), o && this._dispatchLiveParticle(d), a++;
      }
      const c = (l - r) / 1e3;
      c > 0 && this._virtualEngine.advance(c), r = l;
    }
  }
  /**
   * Forward a captured particle event to the live canvas so its visual
   * effect replays. Non-particle events (animate, update, structural) are
   * already driven by `_applyStateToCanvas` via the virtual engine's state
   * — particles are the one event class that only exists as a visual and
   * therefore must be re-emitted on the real canvas.
   */
  _dispatchLiveParticle(e) {
    const n = this._canvas;
    switch (e.type) {
      case "particle":
        n.sendParticle?.(e.args.edgeId, e.args.options);
        break;
      case "particle-along-path":
        n.sendParticleAlongPath?.(e.args.path, e.args.options);
        break;
      case "particle-between":
        n.sendParticleBetween?.(e.args.source, e.args.target, e.args.options);
        break;
      case "particle-burst":
        n.sendParticleBurst?.(e.args.edgeId, e.args.options);
        break;
      case "converging":
        n.sendConverging?.(e.args.sources, e.args.options);
        break;
    }
  }
  _findNearestCheckpoint(e) {
    let n = null;
    for (const o of this.recording.checkpoints)
      o.t <= e && (!n || o.t > n.t) && (n = o);
    return n;
  }
  _resolveTarget(e) {
    const n = Math.min(this._from, this._to), o = Math.max(this._from, this._to);
    if (typeof e == "number")
      return Math.max(n, Math.min(o, e));
    if (e === "start")
      return this._from;
    if (e === "end")
      return this._to;
    if (e.endsWith("%")) {
      const r = parseFloat(e) / 100;
      return this._from + r * (this._to - this._from);
    }
    const i = parseFloat(e);
    return Number.isNaN(i) ? this._from : Math.max(n, Math.min(o, i));
  }
  _handleEnd() {
    if (this._loop) {
      const e = typeof this._loop == "number" ? this._loop - 1 : 1 / 0;
      if (e > 0) {
        this._loop = typeof this._loop == "number" ? e : !0, this._currentTime = this._from, this._seekEngineTo(this._from), this._applyStateToCanvas(this._virtualEngine.getState()), this._state = "playing", this._lastWallTime = Ro(), this._scheduleTick();
        return;
      }
    }
    this._state = "ended", this._rafHandle = null, this._resolveFinished();
  }
  _applyStateToCanvas(e) {
    this._reconcileNodes(e), this._reconcileEdges(e);
    for (const [n, o] of Object.entries(e.nodes)) {
      const i = this._canvas.nodes.find((r) => r.id === n);
      i && o.position && (i.position || (i.position = { x: 0, y: 0 }), o.position.x !== void 0 && (i.position.x = o.position.x), o.position.y !== void 0 && (i.position.y = o.position.y));
    }
    e.viewport && (this._canvas.viewport.x = e.viewport.x, this._canvas.viewport.y = e.viewport.y, this._canvas.viewport.zoom = e.viewport.zoom);
  }
  /**
   * Diff virtual vs. real node sets and apply structural changes. Prefers
   * the canvas's own addNodes/removeNodes when available so reactivity and
   * measurement hooks fire; falls back to direct array mutation otherwise.
   */
  _reconcileNodes(e) {
    const n = new Set(Object.keys(e.nodes)), o = new Set(this._canvas.nodes.map((s) => s?.id).filter(Boolean)), i = [];
    for (const s of n)
      o.has(s) || i.push(e.nodes[s]);
    const r = [];
    for (const s of o)
      n.has(s) || r.push(s);
    if (i.length > 0 && (typeof this._canvas.addNodes == "function" ? this._canvas.addNodes(i) : this._canvas.nodes.push(...i)), r.length > 0)
      if (typeof this._canvas.removeNodes == "function")
        this._canvas.removeNodes(r);
      else
        for (const s of r) {
          const a = this._canvas.nodes.findIndex((l) => l?.id === s);
          a !== -1 && this._canvas.nodes.splice(a, 1);
        }
  }
  _reconcileEdges(e) {
    const n = new Set(Object.keys(e.edges)), o = new Set(this._canvas.edges.map((s) => s?.id).filter(Boolean)), i = [];
    for (const s of n)
      o.has(s) || i.push(e.edges[s]);
    const r = [];
    for (const s of o)
      n.has(s) || r.push(s);
    if (i.length > 0 && (typeof this._canvas.addEdges == "function" ? this._canvas.addEdges(i) : this._canvas.edges.push(...i)), r.length > 0)
      if (typeof this._canvas.removeEdges == "function")
        this._canvas.removeEdges(r);
      else
        for (const s of r) {
          const a = this._canvas.edges.findIndex((l) => l?.id === s);
          a !== -1 && this._canvas.edges.splice(a, 1);
        }
  }
}
function Ro() {
  return typeof performance < "u" && typeof performance.now == "function" ? performance.now() : Date.now();
}
function jg(t) {
  const e = Fg(t);
  return {
    // ── Internal: Sync animation lock state ───────────────────────────────
    /**
     * Synchronize the `_animationLocked` flag from active timelines and
     * manage history suspension while any timeline is playing.
     */
    _syncAnimationState() {
      const n = [...t._activeTimelines].some((o) => o.locked);
      t._animationLocked = n, t._activeTimelines.size === 0 ? t._resumeHistory() : t._suspendHistory();
    },
    // ── Timeline factory ──────────────────────────────────────────────────
    /**
     * Create a new FlowTimeline wired to this canvas. Lock flag and
     * history suspension are automatically managed via timeline events.
     */
    timeline() {
      const n = new Ni(t, io);
      n.on("play", () => {
        t._activeTimelines.add(n), t._syncAnimationState();
      }), n.on("resume", () => {
        t._activeTimelines.add(n), t._syncAnimationState();
      });
      for (const o of ["pause", "stop", "complete"])
        n.on(o, () => {
          t._activeTimelines.delete(n), t._syncAnimationState();
        });
      return n;
    },
    // ── Named animation registry ──────────────────────────────────────────
    /**
     * Register a named animation (used by x-flow-animate directive).
     */
    registerAnimation(n, o) {
      t._animationRegistry.set(n, o);
    },
    /**
     * Unregister a named animation.
     */
    unregisterAnimation(n) {
      t._animationRegistry.delete(n);
    },
    /**
     * Play a named animation registered via x-flow-animate directive.
     */
    async playAnimation(n) {
      const o = t._animationRegistry.get(n);
      if (!o) {
        B("animation", `Named animation "${n}" not found`);
        return;
      }
      const i = t.timeline();
      for (const r of o)
        r.parallel ? i.parallel(r.parallel) : i.step(r);
      await i.play();
    },
    // ── Core update/animate API ─────────────────────────────────────────
    /**
     * Update nodes, edges, and/or the viewport.
     *
     * The core method for applying property changes. When duration is 0
     * (the default), changes are applied instantly via DOM flushing.
     * When duration > 0, transitions are delegated to the Animator for
     * frame-by-frame interpolation.
     *
     * Use `animate()` for a convenience wrapper that defaults to smooth
     * transitions (duration: 300ms).
     */
    update(n, o = {}) {
      if (o?.boundTo) {
        const p = o.boundTo;
        "node" in p ? o = {
          ...o,
          while: () => t.getNode(p.node)?.[p.property] === p.equals
        } : "edge" in p && (o = {
          ...o,
          while: () => t.getEdge(p.edge)?.[p.property] === p.equals
        });
      }
      const i = o.duration ?? 0, r = [], s = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Set(), l = /* @__PURE__ */ new Set(), c = (p) => {
        if (p.size === 0)
          return;
        const g = Array.from(p);
        requestAnimationFrame(() => {
          t._layoutAnimTick++, t._commitNodeGeometry?.(g);
        });
      }, d = n.nodes ? Object.keys(n.nodes).length : 0, f = n.edges ? Object.keys(n.edges).length : 0;
      if (B("animate", "update() called", {
        nodes: d,
        edges: f,
        viewport: !!n.viewport,
        duration: i,
        easing: o.easing ?? "default",
        instant: i === 0
      }), n.nodes)
        for (const [p, g] of Object.entries(n.nodes)) {
          const m = t._nodeMap.get(p);
          if (!m) continue;
          const x = (g._duration ?? i) === 0;
          if (g.followPath && !x) {
            let C = null;
            typeof g.followPath == "function" ? C = g.followPath : C = Pi(g.followPath);
            let b = null;
            if (g.guidePath?.visible && typeof g.followPath == "string" && typeof document < "u") {
              const E = t.getEdgeSvgElement?.();
              E && (b = document.createElementNS("http://www.w3.org/2000/svg", "path"), b.setAttribute("d", g.followPath), b.classList.add("flow-guide-path"), g.guidePath.class && b.classList.add(g.guidePath.class), E.appendChild(b));
            }
            if (C) {
              const E = C, _ = b, S = g.guidePath?.autoRemove !== !1;
              r.push({
                key: `node:${p}:followPath`,
                from: 0,
                to: 1,
                apply: (N) => {
                  const R = t._nodeMap.get(p);
                  if (!R) return;
                  const M = E(N);
                  Ce().raw(R).position.x = M.x, Ce().raw(R).position.y = M.y, s.add(p), N >= 1 && _ && S && _.remove();
                }
              });
            }
          } else if (g.position) {
            const b = Ce().raw(m).position;
            if (g.position.x !== void 0) {
              const E = g.position.x;
              if (x)
                b.x = E;
              else {
                const _ = b.x;
                r.push({
                  key: `node:${p}:position.x`,
                  from: _,
                  to: E,
                  apply: (S) => {
                    const N = t._nodeMap.get(p);
                    N && (Ce().raw(N).position.x = S, s.add(p));
                  }
                });
              }
            }
            if (g.position.y !== void 0) {
              const E = g.position.y;
              if (x)
                b.y = E;
              else {
                const _ = b.y;
                r.push({
                  key: `node:${p}:position.y`,
                  from: _,
                  to: E,
                  apply: (S) => {
                    const N = t._nodeMap.get(p);
                    N && (Ce().raw(N).position.y = S), s.add(p);
                  }
                });
              }
            }
            x && s.add(p);
          }
          if (g.data !== void 0 && Object.assign(m.data, g.data), g.class !== void 0 && (m.class = g.class), g.selected !== void 0 && (m.selected = g.selected), g.zIndex !== void 0 && (m.zIndex = g.zIndex), g.style !== void 0)
            if (x)
              m.style = g.style, a.add(p);
            else {
              const C = En(m.style || {}), b = En(g.style), E = t._nodeElements.get(p);
              if (E) {
                const _ = getComputedStyle(E);
                for (const S of Object.keys(b))
                  C[S] === void 0 && (C[S] = _.getPropertyValue(S));
              }
              r.push({
                key: `node:${p}:style`,
                from: 0,
                to: 1,
                apply: (_) => {
                  const S = t._nodeMap.get(p);
                  S && (Ce().raw(S).style = ta(C, b, _), a.add(p));
                }
              });
            }
          g.dimensions && m.dimensions && (g.dimensions.width !== void 0 && (x ? m.dimensions.width = g.dimensions.width : r.push({
            key: `node:${p}:dimensions.width`,
            from: m.dimensions.width,
            to: g.dimensions.width,
            apply: (C) => {
              m.dimensions.width = C;
            }
          })), g.dimensions.height !== void 0 && (m.fixedDimensions = !0, x ? m.dimensions.height = g.dimensions.height : r.push({
            key: `node:${p}:dimensions.height`,
            from: m.dimensions.height,
            to: g.dimensions.height,
            apply: (C) => {
              m.dimensions.height = C;
            }
          })));
        }
      if (n.edges)
        for (const [p, g] of Object.entries(n.edges)) {
          const m = t._edgeMap.get(p);
          if (!m) continue;
          const x = (g._duration ?? i) === 0;
          if (g.color !== void 0)
            if (typeof g.color == "object")
              m.color = g.color;
            else if (x)
              m.color = g.color, l.add(p);
            else {
              const C = typeof m.color == "string" && m.color || getComputedStyle(t._container).getPropertyValue("--flow-edge-stroke").trim() || Ei;
              r.push({
                key: `edge:${p}:color`,
                from: C,
                to: g.color,
                apply: (b) => {
                  const E = t._edgeMap.get(p);
                  E && (Ce().raw(E).color = b, l.add(p));
                }
              });
            }
          if (g.strokeWidth !== void 0)
            if (x)
              m.strokeWidth = g.strokeWidth, l.add(p);
            else {
              const C = m.strokeWidth ?? (parseFloat(getComputedStyle(t._container).getPropertyValue("--flow-edge-stroke-width").trim() || "1") || 1);
              r.push({
                key: `edge:${p}:strokeWidth`,
                from: C,
                to: g.strokeWidth,
                apply: (b) => {
                  const E = t._edgeMap.get(p);
                  E && (Ce().raw(E).strokeWidth = b, l.add(p));
                }
              });
            }
          g.label !== void 0 && (m.label = g.label), g.animated !== void 0 && (m.animated = g.animated), g.class !== void 0 && (m.class = g.class);
        }
      if (n.viewport) {
        const p = n.viewport, m = (p._duration ?? i) === 0, y = t.viewport;
        p.pan?.x !== void 0 && (m ? y.x = p.pan.x : r.push({
          key: "viewport:pan.x",
          from: y.x,
          to: p.pan.x,
          apply: (x) => {
            y.x = x;
          }
        })), p.pan?.y !== void 0 && (m ? y.y = p.pan.y : r.push({
          key: "viewport:pan.y",
          from: y.y,
          to: p.pan.y,
          apply: (x) => {
            y.y = x;
          }
        })), p.zoom !== void 0 && (m ? y.zoom = p.zoom : r.push({
          key: "viewport:zoom",
          from: y.zoom,
          to: p.zoom,
          apply: (x) => {
            y.zoom = x;
          }
        }));
      }
      if (r.length === 0) {
        s.size > 0 && (t._flushNodePositions(s), t._refreshEdgePaths(s), c(s)), a.size > 0 && t._flushNodeStyles(a), l.size > 0 && t._flushEdgeStyles(l);
        const p = {
          pause: () => {
          },
          resume: () => {
          },
          stop: () => {
          },
          reverse: () => {
          },
          play: () => {
          },
          playForward: () => {
          },
          playBackward: () => {
          },
          restart: () => {
          },
          get direction() {
            return "forward";
          },
          get isFinished() {
            return !0;
          },
          get currentValue() {
            return /* @__PURE__ */ new Map();
          },
          finished: Promise.resolve(),
          _targetNodeIds: n.nodes ? Object.keys(n.nodes) : void 0
        };
        return o.onComplete?.(), p;
      }
      const h = Ce().raw(t._animator).animate(r, {
        duration: i,
        easing: o.easing,
        delay: o.delay,
        loop: o.loop,
        startAt: o.startAt,
        while: o.while,
        whileStopMode: o.whileStopMode,
        tag: o.tag,
        tags: o.tags,
        motion: o.motion,
        maxDuration: o.maxDuration,
        onProgress(p) {
          s.size > 0 && (t._flushNodePositions(s), t._refreshEdgePaths(s), s.clear()), a.size > 0 && (t._flushNodeStyles(a), a.clear()), l.size > 0 && (t._flushEdgeStyles(l), l.clear()), n.viewport && t._flushViewport(), o.onProgress?.(p);
        },
        onComplete() {
          if (n.nodes)
            for (const [p, g] of Object.entries(n.nodes)) {
              const m = t._nodeMap.get(p);
              if (!m) continue;
              const y = Ce().raw(m);
              (g.followPath || g.position?.x !== void 0) && (m.position.x = y.position.x), (g.followPath || g.position?.y !== void 0) && (m.position.y = y.position.y), g.style !== void 0 && (m.style = y.style);
            }
          if (n.edges)
            for (const [p, g] of Object.entries(n.edges)) {
              const m = t._edgeMap.get(p);
              if (!m) continue;
              const y = Ce().raw(m);
              g.color !== void 0 && typeof g.color == "string" && (m.color = y.color), g.strokeWidth !== void 0 && (m.strokeWidth = y.strokeWidth);
            }
          s.size > 0 && (t._flushNodePositions(s), t._refreshEdgePaths(s), c(s), s.clear()), a.size > 0 && (t._flushNodeStyles(a), a.clear()), l.size > 0 && (t._flushEdgeStyles(l), l.clear()), o.onComplete?.();
        }
      });
      return n.nodes && (h._targetNodeIds = Object.keys(n.nodes)), h;
    },
    /**
     * Animate nodes, edges, and/or the viewport with smooth transitions.
     *
     * Convenience wrapper around `update()` that defaults to 300ms duration.
     * Pass `duration: 0` for instant changes, or use `update()` directly.
     *
     * When `respectReducedMotion` is active (via config or OS media query),
     * the effective duration is collapsed to 0 for an instant snap.
     */
    animate(n, o = {}) {
      const i = ea(t._config?.respectReducedMotion) ? 0 : o.duration ?? 300;
      return this.update(n, { ...o, duration: i });
    },
    // ── Follow (viewport tracking) ────────────────────────────────────────
    /**
     * Track a target with the viewport camera. The target can be a node ID,
     * a ParticleHandle, an animation handle, or a static XYPosition.
     * The viewport smoothly follows via engine tick with linear interpolation.
     */
    follow(n, o = {}) {
      t._followHandle && t._followHandle.stop();
      let i;
      const r = new Promise((d) => {
        i = d;
      });
      let s = !1;
      const a = o.zoom, l = io.register(() => {
        if (s) return !0;
        let d = null;
        if (typeof n == "string") {
          const m = t._nodeMap.get(n);
          if (m) {
            d = m.parentId ? t.getAbsolutePosition(n) : { ...m.position };
            const y = m.nodeOrigin ?? t._config.nodeOrigin ?? [0, 0];
            m.dimensions && (d.x += m.dimensions.width * (0.5 - y[0]), d.y += m.dimensions.height * (0.5 - y[1]));
          }
        } else if ("_targetNodeIds" in n && n._targetNodeIds?.length) {
          const m = n._targetNodeIds[0], y = t._nodeMap.get(m);
          if (y) {
            d = y.parentId ? t.getAbsolutePosition(m) : { ...y.position };
            const x = y.nodeOrigin ?? t._config.nodeOrigin ?? [0, 0];
            y.dimensions && (d.x += y.dimensions.width * (0.5 - x[0]), d.y += y.dimensions.height * (0.5 - x[1]));
          }
        } else if ("getCurrentPosition" in n && typeof n.getCurrentPosition == "function") {
          const m = n.getCurrentPosition();
          if (m)
            d = m;
          else
            return s = !0, l.stop(), t._followHandle = null, i(), !0;
        } else "x" in n && "y" in n && (d = n);
        if (!d) return !1;
        const f = t._container ? { width: t._container.clientWidth, height: t._container.clientHeight } : { width: 800, height: 600 }, u = a ?? t.viewport.zoom, h = f.width / 2 - d.x * u, p = f.height / 2 - d.y * u, g = 0.08;
        return t.viewport.x += (h - t.viewport.x) * g, t.viewport.y += (p - t.viewport.y) * g, a && (t.viewport.zoom += (a - t.viewport.zoom) * g), t._flushViewport(), !1;
      });
      return t._followHandle = l, typeof n == "object" && "_targetNodeIds" in n && n.finished && n.finished.then(() => {
        s || (s = !0, l.stop(), t._followHandle = null, i());
      }), {
        pause: () => {
        },
        resume: () => {
        },
        stop: () => {
          s = !0, l.stop(), t._followHandle = null, i();
        },
        reverse: () => {
        },
        play: () => {
        },
        playForward: () => {
        },
        playBackward: () => {
        },
        restart: () => {
        },
        get direction() {
          return "forward";
        },
        get isFinished() {
          return s;
        },
        get currentValue() {
          return /* @__PURE__ */ new Map();
        },
        get finished() {
          return r;
        }
      };
    },
    // ── Registry & group helpers ─────────────────────────────────────────
    /**
     * Get all tracked animation handles, optionally filtered by tag.
     */
    getHandles(n) {
      return Ce().raw(t._animator).registry.getHandles(n);
    },
    /**
     * Cancel all animations matching a tag filter.
     */
    cancelAll(n, o) {
      Ce().raw(t._animator).registry.cancelAll(n, o);
    },
    /**
     * Pause all animations matching a tag filter.
     */
    pauseAll(n) {
      Ce().raw(t._animator).registry.pauseAll(n);
    },
    /**
     * Resume all animations matching a tag filter.
     */
    resumeAll(n) {
      Ce().raw(t._animator).registry.resumeAll(n);
    },
    /**
     * Create a named group that auto-tags all animations made through it.
     */
    group(n) {
      const o = this;
      return new Og(n, {
        animate: (i, r) => o.animate(i, r),
        update: (i, r) => o.update(i, r),
        sendParticle: (i, r) => o.sendParticle(i, r),
        sendParticleAlongPath: (i, r) => o.sendParticleAlongPath(i, r),
        sendParticleBetween: (i, r, s) => o.sendParticleBetween(i, r, s),
        sendParticleBurst: (i, r) => o.sendParticleBurst(i, r),
        sendConverging: (i, r) => o.sendConverging(i, r),
        timeline: () => o.timeline(),
        getHandles: (i) => o.getHandles(i),
        cancelAll: (i, r) => o.cancelAll(i, r),
        pauseAll: (i) => o.pauseAll(i),
        resumeAll: (i) => o.resumeAll(i)
      });
    },
    /**
     * Create a transaction for grouped rollback of multiple animations.
     */
    transaction(n) {
      const o = Ce().raw(t._animator), i = o.beginTransaction();
      i.onAfterRollback?.((r) => {
        const s = /* @__PURE__ */ new Set();
        for (const a of r)
          if (a.startsWith("node:")) {
            const l = a.split(":")[1];
            l && s.add(l);
          }
        s.size > 0 && (t._flushNodePositions(s), t._flushNodeStyles(s), t._refreshEdgePaths(s));
      });
      try {
        const r = n();
        r && typeof r.then == "function" ? r.then(() => o.endTransaction()).catch(() => {
          i.rollback(), o.endTransaction();
        }) : o.endTransaction();
      } catch (r) {
        throw i.rollback(), o.endTransaction(), r;
      }
      return i;
    },
    /**
     * Capture current canvas state. Call restore() to revert.
     */
    snapshot() {
      const n = structuredClone(Ce().raw(t.nodes)), o = structuredClone(Ce().raw(t.edges)), i = { ...t.viewport };
      return {
        restore: () => {
          t.nodes.splice(0, t.nodes.length, ...structuredClone(n)), t.edges.splice(0, t.edges.length, ...structuredClone(o)), Object.assign(t.viewport, i);
        }
      };
    },
    // ── Record & Replay ───────────────────────────────────────────────────
    /**
     * Record canvas animation events during `fn()` execution.
     * Returns a `Recording` that can be passed to `replay()`.
     */
    record(n, o) {
      const i = this, r = i.animate, s = i.update, a = i.sendParticle, l = i.sendParticleAlongPath, c = i.sendParticleBetween, d = i.sendParticleBurst, f = i.sendConverging, u = {
        get nodes() {
          return t.nodes;
        },
        get edges() {
          return t.edges;
        },
        get viewport() {
          return t.viewport;
        },
        animate: (g, m) => {
          const y = i.update;
          i.update = s;
          try {
            return r.call(i, g, m);
          } finally {
            i.update = y;
          }
        },
        update: (g, m) => s.call(i, g, m),
        sendParticle: (g, m) => a.call(i, g, m),
        sendParticleAlongPath: (g, m) => l.call(i, g, m),
        sendParticleBetween: (g, m, y) => c.call(i, g, m, y),
        sendParticleBurst: (g, m) => d.call(i, g, m),
        sendConverging: (g, m) => f.call(i, g, m),
        addNodes: (g) => t.addNodes(g),
        removeNodes: (g) => t.removeNodes(g),
        addEdges: (g) => t.addEdges(g),
        removeEdges: (g) => t.removeEdges(g)
      }, h = new Xg(u, o), p = async () => {
        i.animate = (...g) => u.animate(...g), i.update = (...g) => u.update(...g), i.sendParticle = (...g) => u.sendParticle(...g), i.sendParticleAlongPath = (...g) => u.sendParticleAlongPath(...g), i.sendParticleBetween = (...g) => u.sendParticleBetween(...g), i.sendParticleBurst = (...g) => u.sendParticleBurst(...g), i.sendConverging = (...g) => u.sendConverging(...g);
        try {
          const g = n();
          g instanceof Promise && await g;
        } finally {
          i.animate = r, i.update = s, i.sendParticle = a, i.sendParticleAlongPath = l, i.sendParticleBetween = c, i.sendParticleBurst = d, i.sendConverging = f;
        }
      };
      return h.record(p, o?.captureMetadata);
    },
    /**
     * Replay a previously recorded `Recording` on this canvas.
     * Returns a `ReplayHandle` with play/pause/stop/scrub controls.
     */
    replay(n, o) {
      const i = this, r = {
        get nodes() {
          return t.nodes;
        },
        get edges() {
          return t.edges;
        },
        get viewport() {
          return t.viewport;
        },
        addNodes: (s) => i.addNodes(s),
        removeNodes: (s) => i.removeNodes(s),
        addEdges: (s) => i.addEdges(s),
        removeEdges: (s) => i.removeEdges(s),
        sendParticle: (s, a) => i.sendParticle(s, a),
        sendParticleAlongPath: (s, a) => i.sendParticleAlongPath(s, a),
        sendParticleBetween: (s, a, l) => i.sendParticleBetween(s, a, l),
        sendParticleBurst: (s, a) => i.sendParticleBurst(s, a),
        sendConverging: (s, a) => i.sendConverging(s, a)
      };
      return new Wg(r, n, o);
    },
    // ── Cleanup lifecycle ─────────────────────────────────────────────────
    /**
     * Stop all in-flight animations, particles, and timelines.
     *
     * Called BY the canvas `destroy()` lifecycle hook when the element is removed
     * from the DOM — it must not be named `destroy()`. Mixins are applied onto the
     * canvas with `Object.defineProperties`, so a `destroy` here would OVERWRITE
     * `flowCanvas`'s own `destroy()` and silently take the entire canvas teardown
     * (listener removal, panZoom/minimap disposal, store unregistration) out of the
     * lifecycle. It did exactly that until this rename.
     */
    _destroyAnimations() {
      t._animator && t._animator.stopAll(), e.destroyParticles();
      for (const n of t._activeTimelines)
        n.stop();
      t._activeTimelines.clear();
    },
    // ── Particle renderer registry ────────────────────────────────────────
    /**
     * Register a custom particle renderer by name. Once registered, pass
     * `renderer: 'your-name'` in any `sendParticle*` options to use it.
     */
    registerParticleRenderer(n, o) {
      tn(n, o);
    },
    // ── Particle system (delegated to canvas-particles sub-mixin) ────────
    _tickParticles: e._tickParticles,
    sendParticle: e.sendParticle,
    sendParticleAlongPath: e.sendParticleAlongPath,
    sendParticleBetween: e.sendParticleBetween,
    sendParticleBurst: e.sendParticleBurst,
    sendConverging: e.sendConverging,
    destroyParticles: e.destroyParticles
  };
}
function Fs(t, e, n, o) {
  const i = e.find((a) => a.id === t);
  if (!i) return /* @__PURE__ */ new Set();
  if (i.type === "group")
    return xt(t, e);
  const r = /* @__PURE__ */ new Set(), s = ii(t, e, n);
  for (const a of s)
    r.add(a.id);
  if (o?.recursive) {
    const a = s.map((l) => l.id);
    for (; a.length > 0; ) {
      const l = a.shift(), c = ii(l, e, n);
      for (const d of c)
        !r.has(d.id) && d.id !== t && (r.add(d.id), a.push(d.id));
    }
  }
  return r;
}
function Ug(t, e, n) {
  const o = /* @__PURE__ */ new Map();
  for (const i of e)
    n.has(i.id) && o.set(i.id, { ...i.position });
  return {
    targetPositions: o,
    originalDimensions: t.type === "group" ? { ...t.dimensions ?? { width: 400, height: 300 } } : void 0,
    reroutedEdges: /* @__PURE__ */ new Map()
  };
}
function Ho(t, e, n, o) {
  t.collapsed = !0, o && (t.dimensions = { ...o });
  for (const i of e)
    n.targetPositions.has(i.id) && (i.hidden = !0);
}
function Os(t, e, n, o = !0) {
  t.collapsed = !1, o && n.originalDimensions && (t.dimensions = { ...n.originalDimensions });
  const i = /* @__PURE__ */ new Set();
  if (t.type === "group") {
    for (const r of e)
      if (r.collapsed && r.id !== t.id && n.targetPositions.has(r.id)) {
        const s = xt(r.id, e);
        for (const a of s)
          i.add(a);
      }
  }
  for (const r of e)
    if (n.targetPositions.has(r.id)) {
      const s = n.targetPositions.get(r.id);
      r.position = { ...s }, i.has(r.id) || (r.hidden = !1);
    }
}
function Fo(t, e, n) {
  const o = /* @__PURE__ */ new Map();
  for (const i of e) {
    const r = n.has(i.source), s = n.has(i.target), a = i.source === t, l = i.target === t;
    !r && !s || (o.set(i.id, { source: i.source, target: i.target, hidden: i.hidden }), r && s || a && s || r && l ? i.hidden = !0 : r ? i.source = t : i.target = t);
  }
  return o;
}
function Gg(t, e) {
  for (const n of t) {
    const o = e.get(n.id);
    o && (n.source = o.source, n.target = o.target, o.hidden !== void 0 ? n.hidden = o.hidden : delete n.hidden);
  }
}
const qn = { width: 150, height: 50 };
function Zg(t) {
  return {
    /**
     * Collapse a node — hide its descendants/outgoers and optionally animate.
     */
    collapseNode(e, n) {
      const o = t._nodeMap.get(e);
      if (!o || o.collapsed) return;
      const i = Fs(e, t.nodes, t.edges, { recursive: n?.recursive });
      if (i.size === 0) return;
      B("collapse", `Collapsing node "${e}"`, {
        type: o.type ?? "default",
        descendants: [...i],
        animate: n?.animate !== !1,
        recursive: n?.recursive ?? !1
      }), t._captureHistory();
      const r = o.type === "group", s = r ? o.collapsedDimensions ?? { width: 150, height: 60 } : void 0, a = n?.animate !== !1, l = Ug(o, t.nodes, i);
      if (a) {
        t._suspendHistory();
        const c = o.dimensions ?? qn, d = r && s ? s : c, f = {};
        for (const [h] of l.targetPositions) {
          const p = t._nodeMap.get(h);
          if (!p) continue;
          const g = p.dimensions ?? qn;
          let m, y;
          p.parentId === e ? (m = (d.width - g.width) / 2, y = (d.height - g.height) / 2) : (m = o.position.x + (d.width - g.width) / 2, y = o.position.y + (d.height - g.height) / 2), f[h] = {
            position: { x: m, y },
            style: { opacity: "0" }
          };
        }
        r && s && (f[e] = { dimensions: s });
        const u = [];
        for (const h of t.edges)
          if (i.has(h.source) || i.has(h.target)) {
            const p = t.getEdgeElement?.(h.id)?.closest("svg");
            p && u.push(p);
          }
        t.animate ? t.animate({ nodes: f }, {
          duration: 300,
          easing: "easeInOut",
          onProgress: (h) => {
            const p = String(1 - h);
            for (const g of u) g.style.opacity = p;
          },
          onComplete: () => {
            for (const h of u) h.style.opacity = "";
            Ho(o, t.nodes, l, s), l.reroutedEdges = Fo(e, t.edges, i), t._collapseState.set(e, l), t._resumeHistory(), t._emit("node-collapse", { node: o, descendants: [...i] });
          }
        }) : (Ho(o, t.nodes, l, s), l.reroutedEdges = Fo(e, t.edges, i), t._collapseState.set(e, l), t._resumeHistory(), t._emit("node-collapse", { node: o, descendants: [...i] }));
      } else
        Ho(o, t.nodes, l, s), l.reroutedEdges = Fo(e, t.edges, i), t._collapseState.set(e, l), t._emit("node-collapse", { node: o, descendants: [...i] });
    },
    /**
     * Expand a previously collapsed node — restore descendants/outgoers.
     */
    expandNode(e, n) {
      const o = t._nodeMap.get(e);
      if (!o || !o.collapsed) return;
      const i = t._collapseState.get(e);
      if (!i) return;
      B("collapse", `Expanding node "${e}"`, {
        type: o.type ?? "default",
        descendants: [...i.targetPositions.keys()],
        animate: n?.animate !== !1,
        reroutedEdges: i.reroutedEdges.size
      }), t._captureHistory();
      const r = o.type === "group", s = n?.animate !== !1;
      if (i.reroutedEdges.size > 0 && Gg(t.edges, i.reroutedEdges), s) {
        t._suspendHistory(), r && i.originalDimensions && (o.dimensions = { ...i.originalDimensions });
        const a = o.dimensions ?? qn;
        Os(o, t.nodes, i, r);
        const l = {};
        for (const [f, u] of i.targetPositions) {
          const h = t._nodeMap.get(f);
          if (h && !h.hidden) {
            const p = h.dimensions ?? qn;
            let g, m;
            h.parentId === e ? (g = (a.width - p.width) / 2, m = (a.height - p.height) / 2) : (g = o.position.x + (a.width - p.width) / 2, m = o.position.y + (a.height - p.height) / 2), h.position = { x: g, y: m }, h.style = { ...h.style || {}, opacity: "0" }, l[f] = {
              position: u,
              style: { opacity: "1" }
            };
          }
        }
        const c = new Set(i.targetPositions.keys());
        t._flushNodeStyles(c);
        const d = [];
        for (const f of t.edges)
          if (c.has(f.source) || c.has(f.target)) {
            const u = t.getEdgeElement?.(f.id)?.closest("svg");
            u && (u.style.opacity = "0", d.push(u));
          }
        t.animate ? t.animate({ nodes: l }, {
          duration: 300,
          easing: "easeOut",
          onProgress: (f) => {
            const u = String(f);
            for (const h of d) h.style.opacity = u;
          },
          onComplete: () => {
            for (const f of d) f.style.opacity = "";
            for (const f of c) {
              const u = t._nodeMap.get(f);
              u && typeof u.style == "object" && delete u.style.opacity;
            }
            t._resumeHistory();
          }
        }) : t._resumeHistory(), t._collapseState.delete(e), t._emit("node-expand", { node: o, descendants: [...i.targetPositions.keys()] });
      } else
        Os(o, t.nodes, i, r), t._collapseState.delete(e), t._emit("node-expand", { node: o, descendants: [...i.targetPositions.keys()] });
    },
    /**
     * Toggle collapse/expand state of a node.
     */
    toggleNode(e, n) {
      const o = t._nodeMap.get(e);
      o && (B("collapse", `Toggle node "${e}" → ${o.collapsed ? "expand" : "collapse"}`), o.collapsed ? this.expandNode(e, n) : this.collapseNode(e, n));
    },
    /**
     * Check if a node is collapsed.
     */
    isCollapsed(e) {
      return t._nodeMap.get(e)?.collapsed === !0;
    },
    /**
     * Get the number of nodes that would be hidden when collapsing this node.
     */
    getCollapseTargetCount(e) {
      return Fs(e, t.nodes, t.edges).size;
    },
    /**
     * Get the number of descendants (via parentId hierarchy) of a node.
     */
    getDescendantCount(e) {
      return xt(e, t.nodes).size;
    }
  };
}
function Kg(t) {
  return {
    /**
     * Condense a node — switch to summary view hiding internal rows.
     */
    condenseNode(e) {
      const n = t._nodeMap.get(e);
      !n || n.condensed || (t._captureHistory(), n.condensed = !0, B("condense", `Node "${e}" condensed`), t._emit("node-condense", { node: n }));
    },
    /**
     * Uncondense a node — restore full row view.
     */
    uncondenseNode(e) {
      const n = t._nodeMap.get(e);
      !n || !n.condensed || (t._captureHistory(), n.condensed = !1, B("condense", `Node "${e}" uncondensed`), t._emit("node-uncondense", { node: n }));
    },
    /**
     * Toggle condensed state of a node.
     */
    toggleCondense(e) {
      const n = t._nodeMap.get(e);
      n && (n.condensed ? this.uncondenseNode(e) : this.condenseNode(e));
    },
    /**
     * Check if a node is condensed.
     */
    isCondensed(e) {
      return t._nodeMap.get(e)?.condensed === !0;
    }
  };
}
function Jg(t) {
  return {
    // ── Row Selection ────────────────────────────────────────────────────
    selectRow(e) {
      if (t.selectedRows.has(e)) return;
      t.selectedRows.add(e);
      const n = e.indexOf("."), o = n === -1 ? e : e.slice(0, n), i = n === -1 ? "" : e.slice(n + 1);
      B("selection", `Row "${e}" selected`), t._emit("row-select", { rowId: e, nodeId: o, attrId: i }), t._emit("row-selection-change", { selectedRows: [...t.selectedRows] });
    },
    deselectRow(e) {
      if (!t.selectedRows.has(e)) return;
      t.selectedRows.delete(e);
      const n = e.indexOf("."), o = n === -1 ? e : e.slice(0, n), i = n === -1 ? "" : e.slice(n + 1);
      B("selection", `Row "${e}" deselected`), t._emit("row-deselect", { rowId: e, nodeId: o, attrId: i }), t._emit("row-selection-change", { selectedRows: [...t.selectedRows] });
    },
    toggleRowSelect(e) {
      t.selectedRows.has(e) ? this.deselectRow(e) : this.selectRow(e);
    },
    getSelectedRows() {
      return [...t.selectedRows];
    },
    isRowSelected(e) {
      return t.selectedRows.has(e);
    },
    deselectAllRows() {
      t.selectedRows.size !== 0 && (B("selection", "Deselecting all rows"), t.selectedRows.clear(), t._container?.querySelectorAll(".flow-row-selected").forEach((e) => {
        e.classList.remove("flow-row-selected");
      }), t._emit("row-selection-change", { selectedRows: [] }));
    },
    // ── Row Filtering ────────────────────────────────────────────────────
    setRowFilter(e, n) {
      const o = t._nodeMap.get(e);
      o && (o.rowFilter = n, B("filter", `Node "${e}" row filter set to "${typeof n == "function" ? "predicate" : n}"`));
    },
    getRowFilter(e) {
      return t._nodeMap.get(e)?.rowFilter ?? "all";
    },
    getVisibleRows(e, n) {
      const o = t._nodeMap.get(e);
      if (!o) return n;
      const i = o.rowFilter ?? "all";
      if (i === "all") return n;
      if (typeof i == "function")
        return n.filter(i);
      const r = /* @__PURE__ */ new Set();
      for (const s of t.edges) {
        if (s.sourceHandle?.startsWith(e + ".")) {
          const a = s.sourceHandle.slice(e.length + 1).replace(/-[lr]$/, "");
          a && r.add(a);
        }
        if (s.targetHandle?.startsWith(e + ".")) {
          const a = s.targetHandle.slice(e.length + 1).replace(/-[lr]$/, "");
          a && r.add(a);
        }
      }
      return i === "connected" ? n.filter((s) => r.has(s.id)) : n.filter((s) => !r.has(s.id));
    }
  };
}
const Qg = 8, ep = 12, tp = 2;
function Ii(t) {
  return {
    width: t.dimensions?.width ?? we,
    height: t.dimensions?.height ?? _e
  };
}
function np(t) {
  if (t.stretch) return t.stretch;
  switch (t.direction) {
    case "vertical":
      return "width";
    case "horizontal":
      return "height";
    case "grid":
      return "both";
  }
}
function op(t) {
  return [...t].sort((e, n) => {
    const o = e.order ?? 1 / 0, i = n.order ?? 1 / 0;
    return o !== i ? o - i : 0;
  });
}
function zs(t, e, n) {
  const o = e.gap ?? Qg, i = e.padding ?? ep, r = e.headerHeight ?? 0, s = np(e), a = op(t), l = /* @__PURE__ */ new Map(), c = /* @__PURE__ */ new Map();
  if (a.length === 0)
    return {
      positions: l,
      dimensions: c,
      parentDimensions: n ? { width: n.width, height: n.height } : { width: i * 2, height: i * 2 + r }
    };
  const d = n ? n.width - i * 2 : 0, f = n ? n.height - i * 2 - r : 0;
  return e.direction === "vertical" ? ip(a, o, i, r, s, d, l, c) : e.direction === "horizontal" ? sp(a, o, i, r, s, f, l, c) : rp(a, o, i, r, s, e.columns ?? tp, d, f, l, c);
}
function ip(t, e, n, o, i, r, s, a) {
  let l = 0;
  const c = t.map((u) => Ii(u));
  for (const u of c) l = Math.max(l, u.width);
  const d = r > 0 ? r : l;
  let f = n + o;
  for (let u = 0; u < t.length; u++) {
    const h = t[u], p = c[u];
    s.set(h.id, { x: n, y: f }), (i === "width" || i === "both") && a.set(h.id, { width: d, height: p.height }), f += p.height + e;
  }
  return f -= e, f += n, {
    positions: s,
    dimensions: a,
    parentDimensions: { width: d + n * 2, height: f }
  };
}
function sp(t, e, n, o, i, r, s, a) {
  let l = 0;
  const c = t.map((u) => Ii(u));
  for (const u of c) l = Math.max(l, u.height);
  const d = r > 0 ? r : l;
  let f = n;
  for (let u = 0; u < t.length; u++) {
    const h = t[u], p = c[u];
    s.set(h.id, { x: f, y: n + o }), (i === "height" || i === "both") && a.set(h.id, { width: p.width, height: d }), f += p.width + e;
  }
  return f -= e, f += n, {
    positions: s,
    dimensions: a,
    parentDimensions: { width: f, height: d + n * 2 + o }
  };
}
function rp(t, e, n, o, i, r, s, a, l, c) {
  const d = Math.min(r, t.length), f = t.map((y) => Ii(y));
  let u = 0, h = 0;
  for (const y of f)
    u = Math.max(u, y.width), h = Math.max(h, y.height);
  const p = s > 0 ? (s - (d - 1) * e) / d : 0;
  p > 0 && (u = p);
  const g = Math.ceil(t.length / d), m = a > 0 ? (a - (g - 1) * e) / g : 0;
  m > 0 && (h = m);
  for (let y = 0; y < t.length; y++) {
    const x = y % d, C = Math.floor(y / d), b = n + x * (u + e), E = n + o + C * (h + e);
    l.set(t[y].id, { x: b, y: E }), i === "both" ? c.set(t[y].id, { width: u, height: h }) : i === "width" ? c.set(t[y].id, { width: u, height: f[y].height }) : i === "height" && c.set(t[y].id, { width: f[y].width, height: h });
  }
  return {
    positions: l,
    dimensions: c,
    parentDimensions: {
      width: d * u + (d - 1) * e + n * 2,
      height: g * h + (g - 1) * e + n * 2 + o
    }
  };
}
function ap(t) {
  return {
    // ── Auto-layout scheduling ─────────────────────────────────────────────
    /**
     * Debounced trigger for automatic layout.
     *
     * Skips when no autoLayout config is set, dependencies haven't loaded,
     * or the auto-layout has permanently failed.
     */
    _scheduleAutoLayout() {
      const e = t._config.autoLayout;
      !e || !t._autoLayoutReady || t._autoLayoutFailed || (t._autoLayoutTimer && clearTimeout(t._autoLayoutTimer), t._autoLayoutTimer = setTimeout(() => {
        t._autoLayoutTimer = null, this._runAutoLayout();
      }, e.debounce ?? 50));
    },
    /**
     * Execute the configured auto-layout algorithm.
     *
     * Delegates to the appropriate layout engine method based on
     * `config.autoLayout.algorithm`. Catches errors and sets
     * `_autoLayoutFailed` to prevent repeated attempts.
     */
    async _runAutoLayout() {
      const e = t._config.autoLayout;
      if (!e) return;
      const n = {
        fitView: e.fitView !== !1,
        duration: e.duration ?? 300
      };
      try {
        switch (e.algorithm) {
          case "dagre":
            this.layout({
              direction: e.direction,
              nodesep: e.nodesep,
              ranksep: e.ranksep,
              adjustHandles: e.adjustHandles,
              ...n
            });
            break;
          case "force":
            this.forceLayout({
              strength: e.strength,
              distance: e.distance,
              charge: e.charge,
              iterations: e.iterations,
              ...n
            });
            break;
          case "hierarchy":
            this.treeLayout({
              layoutType: e.layoutType,
              nodeWidth: e.nodeWidth,
              nodeHeight: e.nodeHeight,
              adjustHandles: e.adjustHandles,
              ...n
            });
            break;
          case "elk":
            await this.elkLayout({
              algorithm: e.elkAlgorithm,
              nodeSpacing: e.nodeSpacing,
              layerSpacing: e.layerSpacing,
              adjustHandles: e.adjustHandles,
              ...n
            });
            break;
        }
      } catch (o) {
        t._autoLayoutFailed || (t._warn("AUTO_LAYOUT_FAILED", `autoLayout failed: ${o.message}`), t._autoLayoutFailed = !0);
      }
    },
    // ── Shared layout application ──────────────────────────────────────────
    /**
     * Apply computed layout positions to nodes with optional animation.
     *
     * When duration > 0, delegates to ctx.animate() for smooth transitions.
     * When duration === 0, applies positions directly (instant).
     * Calls `_adjustHandlePositions` when requested, and triggers fitView.
     */
    _applyLayout(e, n) {
      const o = n?.duration ?? 300;
      if (B("layout", `_applyLayout: repositioning ${e.size} node(s)`, {
        duration: o,
        adjustHandles: n?.adjustHandles ?? !1,
        fitView: n?.fitView !== !1
      }), n?.adjustHandles && n.handleDirection && this._adjustHandlePositions(n.handleDirection), o > 0) {
        const i = {};
        for (const [r, s] of e)
          i[r] = { position: s };
        t.animate?.({ nodes: i }, {
          duration: o,
          easing: "easeInOut",
          onComplete: () => {
            n?.fitView !== !1 && t.fitView?.({ padding: 0.2, duration: o });
          }
        });
      } else {
        for (const i of t.nodes) {
          const r = e.get(i.id);
          r && (i.position || (i.position = { x: 0, y: 0 }), i.position.x = r.x, i.position.y = r.y);
        }
        n?.fitView !== !1 && t.fitView?.({ padding: 0.2, duration: 0 });
      }
    },
    /**
     * Update handle positions on nodes and DOM elements to match a layout
     * direction (TB, LR, BT, RL, DOWN, RIGHT, UP, LEFT).
     *
     * Skips handles that have an explicit position set via
     * `data-flow-handle-explicit`.
     */
    _adjustHandlePositions(e) {
      const n = {
        TB: { source: "bottom", target: "top" },
        DOWN: { source: "bottom", target: "top" },
        LR: { source: "right", target: "left" },
        RIGHT: { source: "right", target: "left" },
        BT: { source: "top", target: "bottom" },
        UP: { source: "top", target: "bottom" },
        RL: { source: "left", target: "right" },
        LEFT: { source: "left", target: "right" }
      }, o = n[e] ?? n.TB;
      for (const i of t.nodes)
        i.sourcePosition = o.source, i.targetPosition = o.target;
      t._container?.querySelectorAll('[data-flow-handle-type="source"]').forEach((i) => {
        i.dataset.flowHandleExplicit || (i.dataset.flowHandlePosition = o.source);
      }), t._container?.querySelectorAll('[data-flow-handle-type="target"]').forEach((i) => {
        i.dataset.flowHandleExplicit || (i.dataset.flowHandlePosition = o.target);
      });
    },
    // ── Child layout ───────────────────────────────────────────────────────
    /**
     * Compute and apply child layout for a parent node.
     *
     * Recursively lays out nested layout parents bottom-up (unless `shallow`
     * is true). Applies computed positions, dimension overrides with
     * min/max constraint clamping, and auto-sizes the parent.
     */
    /**
     * Compute and apply child layout for a parent node.
     *
     * Supports both the legacy positional signature and a new options object:
     *
     *   layoutChildren(parentId)                          // full layout
     *   layoutChildren(parentId, excludeId, shallow)      // legacy (backward compat)
     *   layoutChildren(parentId, { ... })                 // options object
     *
     * Options:
     *   - excludeId: skip applying position/dimensions but still count in computation
     *   - omitFromComputation: fully remove node from child list (old parent shrinks)
     *   - includeNode: add a virtual child to computation (new parent grows)
     *   - shallow: don't recurse into nested layout children
     *   - stretchedSize: externally-provided size for stretch propagation
     */
    layoutChildren(e, n, o, i) {
      let r;
      typeof n == "string" ? r = { excludeId: n, shallow: o, stretchedSize: i } : r = n ?? {};
      const { excludeId: s, omitFromComputation: a, includeNode: l, shallow: c } = r;
      let { stretchedSize: d } = r;
      const f = t.nodes.find((b) => b.id === e);
      if (!f?.childLayout) return;
      let u = t.nodes.filter((b) => b.parentId === e);
      a && (u = u.filter((b) => b.id !== a)), l && !u.some((b) => b.id === l.id) && (u = [...u, l]);
      const h = new Map(u.map((b) => [b.id, b]));
      if (f.dimensions = void 0, !d && f.maxDimensions && f.maxDimensions.width !== void 0 && f.maxDimensions.height !== void 0 && (d = { width: f.maxDimensions.width, height: f.maxDimensions.height }), !c)
        for (const b of u)
          b.childLayout && this.layoutChildren(b.id, { excludeId: s, omitFromComputation: a, shallow: !1 });
      const p = f.childLayout, g = p.headerHeight !== void 0 ? p : f.data?.label ? { ...p, headerHeight: 30 } : p, m = zs(u, g, d);
      for (const [b, E] of m.positions) {
        if (b === s || l && b === l.id && !t._nodeMap.has(b)) continue;
        const _ = h.get(b);
        _ && (_.position ? (_.position.x = E.x, _.position.y = E.y) : _.position = { x: E.x, y: E.y });
      }
      for (const [b, E] of m.dimensions) {
        if (b === s || l && b === l.id && !t._nodeMap.has(b)) continue;
        const _ = h.get(b);
        if (_) {
          let S = E.width, N = E.height;
          _.minDimensions && (_.minDimensions.width != null && (S = Math.max(S, _.minDimensions.width)), _.minDimensions.height != null && (N = Math.max(N, _.minDimensions.height))), _.maxDimensions && (_.maxDimensions.width != null && (S = Math.min(S, _.maxDimensions.width)), _.maxDimensions.height != null && (N = Math.min(N, _.maxDimensions.height))), _.dimensions ? (_.dimensions.width = S, _.dimensions.height = N) : _.dimensions = { width: S, height: N }, _.childLayout && !c && this.layoutChildren(b, { excludeId: s, omitFromComputation: a, shallow: !1, stretchedSize: _.dimensions });
        }
      }
      let y = m.parentDimensions.width, x = m.parentDimensions.height;
      if (f.minDimensions && (f.minDimensions.width != null && (y = Math.max(y, f.minDimensions.width)), f.minDimensions.height != null && (x = Math.max(x, f.minDimensions.height))), f.maxDimensions && (f.maxDimensions.width != null && (y = Math.min(y, f.maxDimensions.width)), f.maxDimensions.height != null && (x = Math.min(x, f.maxDimensions.height))), f.dimensions || (f.dimensions = { width: 0, height: 0 }), f.dimensions.width = y, f.dimensions.height = x, y !== m.parentDimensions.width || x !== m.parentDimensions.height) {
        const E = zs(u, g, { width: y, height: x });
        for (const [_, S] of E.positions) {
          if (_ === s || l && _ === l.id && !t._nodeMap.has(_)) continue;
          const N = h.get(_);
          N && (N.position ? (N.position.x = S.x, N.position.y = S.y) : N.position = { x: S.x, y: S.y });
        }
        for (const [_, S] of E.dimensions) {
          if (_ === s || l && _ === l.id && !t._nodeMap.has(_)) continue;
          const N = h.get(_);
          if (N) {
            let R = S.width, M = S.height;
            N.minDimensions && (N.minDimensions.width != null && (R = Math.max(R, N.minDimensions.width)), N.minDimensions.height != null && (M = Math.max(M, N.minDimensions.height))), N.maxDimensions && (N.maxDimensions.width != null && (R = Math.min(R, N.maxDimensions.width)), N.maxDimensions.height != null && (M = Math.min(M, N.maxDimensions.height))), N.dimensions ? (N.dimensions.width = R, N.dimensions.height = M) : N.dimensions = { width: R, height: M }, N.childLayout && !c && this.layoutChildren(_, { excludeId: s, omitFromComputation: a, shallow: !1, stretchedSize: N.dimensions });
          }
        }
      }
    },
    /**
     * Walk up from a parent through ancestor layout parents, calling
     * layoutChildren(shallow) at each level so parent resizes propagate
     * through the hierarchy (e.g. Column grows -> Row adjusts -> Step adjusts).
     */
    propagateLayoutUp(e, n) {
      const o = n?.omitFromComputation ? { omitFromComputation: n.omitFromComputation } : void 0;
      let i = t.nodes.find(
        (r) => r.id === e
      )?.parentId;
      for (; i; ) {
        const r = t._nodeMap.get(i);
        if (!r?.childLayout) break;
        this.layoutChildren(i, { ...o, shallow: !0 }), i = r.parentId;
      }
    },
    /**
     * Reorder a child within its layout parent.
     *
     * Reassigns order values for all siblings, then runs layoutChildren
     * and emits a `child-reorder` event.
     */
    reorderChild(e, n) {
      const o = t._nodeMap.get(e);
      if (!o?.parentId || !t._nodeMap.get(o.parentId)?.childLayout) return;
      t._captureHistory();
      const s = t.nodes.filter((l) => l.parentId === o.parentId).sort((l, c) => (l.order ?? 1 / 0) - (c.order ?? 1 / 0)).filter((l) => l.id !== e), a = Math.max(0, Math.min(n, s.length));
      s.splice(a, 0, o);
      for (let l = 0; l < s.length; l++)
        s[l].order = l;
      this.layoutChildren(o.parentId), t._emit("child-reorder", { nodeId: e, parentId: o.parentId, order: a });
    },
    // ── Layout engines ─────────────────────────────────────────────────────
    /**
     * Apply Dagre (directed acyclic graph) layout.
     *
     * Requires the dagre addon to be registered via `Alpine.plugin(AlpineFlowDagre)`.
     *
     * Nodes with `parentId` are excluded by default — their positions are managed
     * by `childLayout`, not top-level auto-layout. Pass `{ includeChildren: true }`
     * to include them.
     */
    layout(e) {
      const n = zt("layout:dagre");
      if (!n)
        throw new Error("layout() requires the dagre plugin. Register it with: Alpine.plugin(AlpineFlowDagre)");
      const o = e?.direction ?? "TB", i = e?.includeChildren ? t.nodes : t.nodes.filter((s) => !s.parentId), r = n(i, t.edges, {
        direction: o,
        nodesep: e?.nodesep,
        ranksep: e?.ranksep
      });
      this._applyLayout(r, {
        adjustHandles: e?.adjustHandles,
        handleDirection: o,
        fitView: e?.fitView,
        duration: e?.duration
      }), B("layout", "Applied dagre layout", { direction: o }), t._emit("layout", { type: "dagre", direction: o });
    },
    /**
     * Apply force-directed layout.
     *
     * Requires the force addon to be registered via `Alpine.plugin(AlpineFlowForce)`.
     *
     * Nodes with `parentId` are excluded by default — their positions are managed
     * by `childLayout`, not top-level auto-layout. Pass `{ includeChildren: true }`
     * to include them.
     */
    forceLayout(e) {
      const n = zt("layout:force");
      if (!n)
        throw new Error("forceLayout() requires the force plugin. Register it with: Alpine.plugin(AlpineFlowForce)");
      const o = e?.includeChildren ? t.nodes : t.nodes.filter((r) => !r.parentId), i = n(o, t.edges, {
        strength: e?.strength,
        distance: e?.distance,
        charge: e?.charge,
        iterations: e?.iterations,
        center: e?.center
      });
      this._applyLayout(i, {
        fitView: e?.fitView,
        duration: e?.duration
      }), B("layout", "Applied force layout", { charge: e?.charge ?? -300, distance: e?.distance ?? 150 }), t._emit("layout", { type: "force", charge: e?.charge ?? -300, distance: e?.distance ?? 150 });
    },
    /**
     * Apply hierarchy/tree layout.
     *
     * Requires the hierarchy addon to be registered via `Alpine.plugin(AlpineFlowHierarchy)`.
     *
     * Nodes with `parentId` are excluded by default — their positions are managed
     * by `childLayout`, not top-level auto-layout. Pass `{ includeChildren: true }`
     * to include them.
     */
    treeLayout(e) {
      const n = zt("layout:hierarchy");
      if (!n)
        throw new Error("treeLayout() requires the hierarchy plugin. Register it with: Alpine.plugin(AlpineFlowHierarchy)");
      const o = e?.direction ?? "TB", i = e?.includeChildren ? t.nodes : t.nodes.filter((s) => !s.parentId), r = n(i, t.edges, {
        layoutType: e?.layoutType,
        direction: o,
        nodeWidth: e?.nodeWidth,
        nodeHeight: e?.nodeHeight
      });
      this._applyLayout(r, {
        adjustHandles: e?.adjustHandles,
        handleDirection: o,
        fitView: e?.fitView,
        duration: e?.duration
      }), B("layout", "Applied tree layout", { layoutType: e?.layoutType ?? "tree", direction: o }), t._emit("layout", { type: "tree", layoutType: e?.layoutType ?? "tree", direction: o });
    },
    /**
     * Apply ELK (Eclipse Layout Kernel) layout.
     *
     * Requires the elk addon to be registered via `Alpine.plugin(AlpineFlowElk)`.
     * Note: elkLayout is async because ELK's layout() returns a Promise.
     *
     * Nodes with `parentId` are excluded by default — their positions are managed
     * by `childLayout`, not top-level auto-layout. Pass `{ includeChildren: true }`
     * to include them.
     */
    async elkLayout(e) {
      const n = zt("layout:elk");
      if (!n)
        throw new Error("elkLayout() requires the elk plugin. Register it with: Alpine.plugin(AlpineFlowElk)");
      const o = e?.direction ?? "DOWN", i = e?.includeChildren ? t.nodes : t.nodes.filter((s) => !s.parentId), r = await n(i, t.edges, {
        algorithm: e?.algorithm,
        direction: o,
        nodeSpacing: e?.nodeSpacing,
        layerSpacing: e?.layerSpacing,
        aspectRatio: e?.aspectRatio,
        layoutOptions: e?.layoutOptions
      });
      if (r.size === 0) {
        B("layout", "ELK layout returned no positions — skipping apply");
        return;
      }
      this._applyLayout(r, {
        adjustHandles: e?.adjustHandles,
        handleDirection: o,
        fitView: e?.fitView,
        duration: e?.duration
      }), B("layout", "Applied ELK layout", { algorithm: e?.algorithm ?? "layered", direction: o }), t._emit("layout", { type: "elk", algorithm: e?.algorithm ?? "layered", direction: o });
    }
  };
}
function lp(t) {
  return {
    // ── Internal helpers ──────────────────────────────────────────────────
    _getChildValidation(e) {
      const n = t.getNode(e);
      if (n)
        return mn(n, t._config.childValidationRules ?? {});
    },
    _recomputeChildValidation() {
      const e = /* @__PURE__ */ new Set(), n = t._config.childValidationRules ?? {};
      for (const o of t.nodes)
        o.parentId && e.add(o.parentId), (o.data?.childValidation || n[o.type ?? "default"]) && e.add(o.id);
      for (const [o] of t._validationErrorCache)
        e.add(o);
      for (const o of e) {
        const i = t.getNode(o);
        if (!i) {
          t._validationErrorCache.delete(o);
          continue;
        }
        const r = mn(i, t._config.childValidationRules ?? {});
        if (!r) {
          t._validationErrorCache.delete(o);
          continue;
        }
        const s = t.nodes.filter((l) => l.parentId === o), a = As(i, s, r);
        a.length > 0 ? t._validationErrorCache.set(o, a) : t._validationErrorCache.delete(o), i._validationErrors = a;
      }
    },
    // ── Child Validation API ─────────────────────────────────────────────
    validateParent(e) {
      const n = t.getNode(e);
      if (!n) return { valid: !0, errors: [] };
      const o = mn(n, t._config.childValidationRules ?? {});
      if (!o) return { valid: !0, errors: [] };
      const i = t.nodes.filter((s) => s.parentId === e), r = As(n, i, o);
      return { valid: r.length === 0, errors: r };
    },
    validateAll() {
      const e = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Set();
      for (const o of t.nodes)
        o.parentId && n.add(o.parentId);
      for (const o of n)
        e.set(o, this.validateParent(o));
      return e;
    },
    getValidationErrors(e) {
      return t._validationErrorCache.get(e) ?? [];
    },
    // ── Reparent ─────────────────────────────────────────────────────────
    /**
     * Reparent a node into a new parent (or detach from current parent).
     * Handles position conversion and child validation.
     * Returns true on success, false if validation rejects the operation.
     */
    reparentNode(e, n) {
      const o = t.getNode(e);
      if (!o) return !1;
      const i = o.parentId ?? null;
      if (i === n) return !0;
      if (n === null) {
        if (i) {
          const f = this._getChildValidation(i);
          if (f) {
            const u = t.getNode(i);
            if (u) {
              const h = t.nodes.filter(
                (g) => g.parentId === i
              ), p = uo(u, o, h, f);
              if (!p.valid)
                return t._config.onChildValidationFail && t._config.onChildValidationFail({
                  parent: u,
                  child: o,
                  operation: "remove",
                  rule: p.rule,
                  message: p.message
                }), !1;
            }
          }
        }
        t._captureHistory();
        const d = t.getAbsolutePosition(e);
        if (o.position.x = d.x, o.position.y = d.y, o.parentId = void 0, o.extent = void 0, t.nodes = $t(t.nodes), t._rebuildNodeMap(), this._recomputeChildValidation(), i) {
          let f, u = i;
          for (; u; ) {
            const h = t._nodeMap.get(u);
            if (!h) break;
            h.childLayout && (f = u), u = h.parentId;
          }
          f && t.layoutChildren?.(f);
        }
        return t._emit("node-reparent", { node: o, oldParentId: i, newParentId: null }), !0;
      }
      const r = t.getNode(n);
      if (!r || xt(e, t.nodes).has(n)) return !1;
      const s = this._getChildValidation(n);
      if (s) {
        const d = t.nodes.filter(
          (u) => u.parentId === n && u.id !== e
        ), f = Ma(r, o, d, s);
        if (!f.valid)
          return t._config.onChildValidationFail && t._config.onChildValidationFail({
            parent: r,
            child: o,
            operation: "add",
            rule: f.rule,
            message: f.message
          }), !1;
      }
      if (i) {
        const d = this._getChildValidation(i);
        if (d) {
          const f = t.getNode(i);
          if (f) {
            const u = t.nodes.filter(
              (p) => p.parentId === i
            ), h = uo(f, o, u, d);
            if (!h.valid)
              return t._config.onChildValidationFail && t._config.onChildValidationFail({
                parent: f,
                child: o,
                operation: "remove",
                rule: h.rule,
                message: h.message
              }), !1;
          }
        }
      }
      t._captureHistory();
      const a = i ? t.getAbsolutePosition(e) : { x: o.position.x, y: o.position.y }, l = t.getAbsolutePosition(n);
      if (o.position.x = a.x - l.x, o.position.y = a.y - l.y, o.parentId = n, t.nodes = $t(t.nodes), t._rebuildNodeMap(), this._recomputeChildValidation(), n && t._nodeMap.get(n)?.childLayout) {
        if (!o.childLayout) {
          const f = t._initialDimensions.get(e);
          o.dimensions = f ? { ...f } : void 0;
        }
        if (o.order == null) {
          const f = t.nodes.filter(
            (u) => u.parentId === n && u.id !== o.id
          );
          o.order = f.length > 0 ? Math.max(...f.map((u) => u.order ?? 0)) + 1 : 0;
        }
      }
      const c = /* @__PURE__ */ new Set();
      for (const d of [n, i]) {
        if (!d) continue;
        let f, u = d;
        for (; u; ) {
          const h = t._nodeMap.get(u);
          if (!h) break;
          h.childLayout && (f = u), u = h.parentId;
        }
        f && c.add(f);
      }
      for (const d of c)
        t.layoutChildren?.(d);
      return t._emit("node-reparent", { node: o, oldParentId: i, newParentId: n }), !0;
    }
  };
}
function cp(t) {
  return {
    registerCompute(e, n) {
      t._computeEngine.registerCompute(e, n);
    },
    compute(e) {
      const n = t._computeEngine.compute(t.nodes, t.edges, e);
      return t._emit("compute-complete", { results: n }), t.$nextTick(() => {
        requestAnimationFrame(() => {
          const o = /* @__PURE__ */ new Set();
          for (const [i] of n) {
            const r = t._nodeElements.get(i), s = t._nodeMap.get(i);
            if (r && s) {
              r.style.width = "", r.style.height = "";
              const a = r.offsetWidth, l = r.offsetHeight;
              (!s.dimensions || a !== s.dimensions.width || l !== s.dimensions.height) && (s.dimensions = { width: a, height: l }, o.add(i)), s.fixedDimensions = !0, r.style.width = a + "px", r.style.height = l + "px";
            }
          }
          o.size > 0 && t._refreshEdgePaths(o);
        });
      }), n;
    }
  };
}
function Un(t, e, n, o, i) {
  const r = i * Math.PI / 180, s = Math.cos(r), a = Math.sin(r), l = t - n, c = e - o;
  return {
    x: n + l * s - c * a,
    y: o + l * a + c * s
  };
}
function dp(t) {
  if (t.length < 2) return "";
  if (t.length === 2)
    return `M${t[0].x},${t[0].y} L${t[1].x},${t[1].y}`;
  let e = `M${t[0].x},${t[0].y}`;
  for (let n = 0; n < t.length - 1; n++) {
    const o = t[Math.max(0, n - 1)], i = t[n], r = t[n + 1], s = t[Math.min(t.length - 1, n + 2)], a = i.x + (r.x - o.x) / 6, l = i.y + (r.y - o.y) / 6, c = r.x - (s.x - i.x) / 6, d = r.y - (s.y - i.y) / 6;
    e += ` C${a},${l} ${c},${d} ${r.x},${r.y}`;
  }
  return e;
}
const up = 40;
function fp(t, e = up) {
  if (t.length < 2) return "";
  if (t.length === 2)
    return `M${t[0].x},${t[0].y} L${t[1].x},${t[1].y}`;
  let n = `M${t[0].x},${t[0].y}`;
  for (let i = 1; i < t.length - 1; i++) {
    const r = t[i - 1], s = t[i], a = t[i + 1], l = Math.hypot(s.x - r.x, s.y - r.y) || 1, c = Math.hypot(a.x - s.x, a.y - s.y) || 1, d = Math.min(e, l / 2, c / 2), f = s.x - d * (s.x - r.x) / l, u = s.y - d * (s.y - r.y) / l, h = s.x + d * (a.x - s.x) / c, p = s.y + d * (a.y - s.y) / c, g = 0.5;
    n += ` L${f},${u} C${f + g * (s.x - f)},${u + g * (s.y - u)} ${h + g * (s.x - h)},${p + g * (s.y - p)} ${h},${p}`;
  }
  const o = t[t.length - 1];
  return n += ` L${o.x},${o.y}`, n;
}
function hp(t) {
  if (t.length < 2)
    return { x: t[0]?.x ?? 0, y: t[0]?.y ?? 0, offsetX: 0, offsetY: 0 };
  let e = 0;
  const n = [];
  for (let r = 1; r < t.length; r++) {
    const s = t[r].x - t[r - 1].x, a = t[r].y - t[r - 1].y, l = Math.sqrt(s * s + a * a);
    n.push(l), e += l;
  }
  let o = e / 2;
  for (let r = 0; r < n.length; r++) {
    if (o <= n[r]) {
      const s = n[r] > 0 ? o / n[r] : 0, a = t[r].x + (t[r + 1].x - t[r].x) * s, l = t[r].y + (t[r + 1].y - t[r].y) * s;
      return {
        x: a,
        y: l,
        offsetX: Math.abs(t[t.length - 1].x - t[0].x) / 2,
        offsetY: Math.abs(t[t.length - 1].y - t[0].y) / 2
      };
    }
    o -= n[r];
  }
  const i = t[t.length - 1];
  return { x: i.x, y: i.y, offsetX: 0, offsetY: 0 };
}
function gp({
  sourceX: t,
  sourceY: e,
  sourcePosition: n = "bottom",
  targetX: o,
  targetY: i,
  targetPosition: r = "top",
  obstacles: s,
  channelOffset: a
}) {
  if (!s || s.length === 0)
    return ao({
      sourceX: t,
      sourceY: e,
      sourcePosition: n,
      targetX: o,
      targetY: i,
      targetPosition: r
    });
  const l = Mi(t, e, n, o, i, r, s);
  if (!l)
    return ao({
      sourceX: t,
      sourceY: e,
      sourcePosition: n,
      targetX: o,
      targetY: i,
      targetPosition: r
    });
  const c = ya(l, a, s), d = fp(c), { x: f, y: u, offsetX: h, offsetY: p } = hp(c);
  return {
    path: d,
    labelPosition: { x: f, y: u },
    labelOffsetX: h,
    labelOffsetY: p
  };
}
function pp(t) {
  const {
    sourceX: e,
    sourceY: n,
    targetX: o,
    targetY: i,
    controlPoints: r = [],
    pathStyle: s = "bezier",
    borderRadius: a = 5
  } = t, l = [
    { x: e, y: n },
    ...r,
    { x: o, y: i }
  ];
  let c;
  switch (s) {
    case "linear":
      c = Vs(l);
      break;
    case "step":
      c = mp(l, 0);
      break;
    case "smoothstep":
      c = yp(l, a);
      break;
    case "catmull-rom":
    case "bezier":
      c = dp(l.map((u, h) => ({ ...u, index: h })));
      break;
    default:
      c = Vs(l);
  }
  const d = wp(l), f = Nn({ sourceX: e, sourceY: n, targetX: o, targetY: i });
  return {
    path: c,
    labelPosition: d,
    labelOffsetX: f.offsetX,
    labelOffsetY: f.offsetY
  };
}
function Vs(t) {
  if (t.length < 2) return "";
  let e = `M${t[0].x},${t[0].y}`;
  for (let n = 1; n < t.length; n++)
    e += ` L${t[n].x},${t[n].y}`;
  return e;
}
function mp(t, e) {
  if (t.length < 2) return "";
  if (t.length === 2)
    return Da(t[0], t[1], e);
  let n = `M${t[0].x},${t[0].y}`;
  for (let i = 1; i < t.length - 1; i++) {
    const r = t[i - 1], s = t[i], a = t[i + 1];
    n += Zt(r.x, r.y, s.x, s.y, a.x, a.y, e);
  }
  const o = t[t.length - 1];
  return n += ` L${o.x},${o.y}`, n;
}
function Da(t, e, n) {
  const o = (t.x + e.x) / 2, i = Zt(t.x, t.y, o, t.y, o, e.y, n), r = Zt(o, t.y, o, e.y, e.x, e.y, n);
  return `M${t.x},${t.y}${i}${r} L${e.x},${e.y}`;
}
function yp(t, e) {
  if (t.length < 2) return "";
  if (t.length === 2)
    return Da(t[0], t[1], e);
  const n = [t[0]];
  for (let r = 0; r < t.length - 1; r++) {
    const s = t[r], a = t[r + 1], l = Math.abs(a.x - s.x), c = Math.abs(a.y - s.y);
    if (l < 1 || c < 1)
      n.push(a);
    else {
      const d = (s.x + a.x) / 2;
      n.push({ x: d, y: s.y }), n.push({ x: d, y: a.y }), n.push(a);
    }
  }
  let o = `M${n[0].x},${n[0].y}`;
  for (let r = 1; r < n.length - 1; r++) {
    const s = n[r - 1], a = n[r], l = n[r + 1];
    o += Zt(s.x, s.y, a.x, a.y, l.x, l.y, e);
  }
  const i = n[n.length - 1];
  return o += ` L${i.x},${i.y}`, o;
}
function wp(t) {
  if (t.length < 2) return t[0] ?? { x: 0, y: 0 };
  let e = 0;
  const n = [];
  for (let i = 0; i < t.length - 1; i++) {
    const r = t[i + 1].x - t[i].x, s = t[i + 1].y - t[i].y, a = Math.sqrt(r * r + s * s);
    n.push(a), e += a;
  }
  if (e === 0) return t[0];
  let o = e / 2;
  for (let i = 0; i < n.length; i++) {
    if (o <= n[i]) {
      const r = o / n[i];
      return {
        x: t[i].x + (t[i + 1].x - t[i].x) * r,
        y: t[i].y + (t[i + 1].y - t[i].y) * r
      };
    }
    o -= n[i];
  }
  return t[t.length - 1];
}
function Qt(t, e, n, o) {
  const i = t.dimensions?.width ?? we, r = t.dimensions?.height ?? _e, s = en(t, o);
  let a;
  if (t.shape) {
    const l = n?.[t.shape] ?? Sa[t.shape];
    if (l) {
      const c = l.perimeterPoint(i, r, e);
      a = { x: s.x + c.x, y: s.y + c.y };
    } else {
      const c = Ns(i, r, e);
      a = { x: s.x + c.x, y: s.y + c.y };
    }
  } else {
    const l = Ns(i, r, e);
    a = { x: s.x + l.x, y: s.y + l.y };
  }
  if (t.rotation) {
    const l = s.x + i / 2, c = s.y + r / 2;
    a = Un(a.x, a.y, l, c, t.rotation);
  }
  return a;
}
function Bs(t) {
  switch (t) {
    case "top-left":
    case "top-right":
      return "top";
    case "bottom-left":
    case "bottom-right":
      return "bottom";
    default:
      return t;
  }
}
function fi(t) {
  const e = Math.SQRT1_2;
  switch (t) {
    case "top":
      return { x: 0, y: -1 };
    case "bottom":
      return { x: 0, y: 1 };
    case "left":
      return { x: -1, y: 0 };
    case "right":
      return { x: 1, y: 0 };
    case "top-left":
      return { x: -e, y: -e };
    case "top-right":
      return { x: e, y: -e };
    case "bottom-left":
      return { x: -e, y: e };
    case "bottom-right":
      return { x: e, y: e };
  }
}
const vp = 1.5, _p = 5 / 20;
function Vt(t, e, n, o) {
  if (!o) return t;
  const i = typeof o == "string" ? {} : o, r = n ? Math.min(n.handleWidth, n.handleHeight) / 2 : 5;
  if (i.offset !== void 0) {
    const f = fi(e);
    return { x: t.x + f.x * i.offset, y: t.y + f.y * i.offset };
  }
  const l = (i.width ?? 12.5) * vp * _p * 0.4, c = r + l, d = fi(e);
  return { x: t.x + d.x * c, y: t.y + d.y * c };
}
function ho(t, e, n, o = "bottom", i = "top", r, s, a, l, c, d, f, u) {
  const h = r ?? Qt(e, o, c, d), p = s ?? Qt(n, i, c, d), g = {
    sourceX: h.x,
    sourceY: h.y,
    sourcePosition: Bs(o),
    targetX: p.x,
    targetY: p.y,
    targetPosition: Bs(i)
  }, m = t.type ?? f ?? "bezier";
  if (a?.[m])
    return a[m](g, t);
  switch (m === "floating" ? t.pathType ?? "bezier" : m) {
    case "editable":
      return pp({
        ...g,
        controlPoints: t.controlPoints,
        pathStyle: t.pathStyle
      });
    case "avoidant":
      return gp({ ...g, obstacles: l, channelOffset: u });
    case "orthogonal":
      return Ah({ ...g, obstacles: l, channelOffset: u });
    case "smoothstep":
      return Cn(g);
    case "straight":
      return ca({ sourceX: h.x, sourceY: h.y, targetX: p.x, targetY: p.y });
    default:
      return ao(g);
  }
}
function qs(t, e) {
  const n = t.dimensions?.width ?? we, o = t.dimensions?.height ?? _e, i = {
    x: t.position.x + n / 2,
    y: t.position.y + o / 2
  }, r = t.rotation ? Un(e.x, e.y, i.x, i.y, -t.rotation) : e, s = r.x - i.x, a = r.y - i.y;
  if (s === 0 && a === 0) {
    const p = { x: i.x, y: i.y - o / 2 };
    return t.rotation ? Un(p.x, p.y, i.x, i.y, t.rotation) : p;
  }
  const l = n / 2, c = o / 2, d = Math.abs(s), f = Math.abs(a);
  let u;
  d / l > f / c ? u = l / d : u = c / f;
  const h = {
    x: i.x + s * u,
    y: i.y + a * u
  };
  return t.rotation ? Un(h.x, h.y, i.x, i.y, t.rotation) : h;
}
function Ys(t, e) {
  const n = t.dimensions?.width ?? we, o = t.dimensions?.height ?? _e, i = t.position.x + n / 2, r = t.position.y + o / 2;
  if (t.rotation) {
    const h = e.x - i, p = e.y - r;
    return Math.abs(h) > Math.abs(p) ? h > 0 ? "right" : "left" : p > 0 ? "bottom" : "top";
  }
  const s = 1, a = t.position.x, l = t.position.x + n, c = t.position.y, d = t.position.y + o;
  if (Math.abs(e.x - a) <= s) return "left";
  if (Math.abs(e.x - l) <= s) return "right";
  if (Math.abs(e.y - c) <= s) return "top";
  if (Math.abs(e.y - d) <= s) return "bottom";
  const f = e.x - i, u = e.y - r;
  return Math.abs(f) > Math.abs(u) ? f > 0 ? "right" : "left" : u > 0 ? "bottom" : "top";
}
function Ra(t, e) {
  const n = t.dimensions?.width ?? we, o = t.dimensions?.height ?? _e, i = e.dimensions?.width ?? we, r = e.dimensions?.height ?? _e, s = {
    x: t.position.x + n / 2,
    y: t.position.y + o / 2
  }, a = {
    x: e.position.x + i / 2,
    y: e.position.y + r / 2
  }, l = qs(t, a), c = qs(e, s), d = Ys(t, l), f = Ys(e, c);
  return {
    sx: l.x,
    sy: l.y,
    tx: c.x,
    ty: c.y,
    sourcePos: d,
    targetPos: f
  };
}
function Sw(t, e) {
  const n = e.x - t.x, o = e.y - t.y;
  let i, r;
  return Math.abs(n) > Math.abs(o) ? (i = n > 0 ? "right" : "left", r = n > 0 ? "left" : "right") : (i = o > 0 ? "bottom" : "top", r = o > 0 ? "top" : "bottom"), { sourcePos: i, targetPos: r };
}
function Ha(t) {
  return typeof t == "object" && t !== null && "from" in t && "to" in t;
}
function Fa(t, e) {
  return `${t}__grad__${e}`;
}
function Oa(t, e, n, o, i, r, s) {
  let a = t.querySelector(`#${CSS.escape(e)}`);
  if (!a) {
    a = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient"), a.id = e, a.setAttribute("gradientUnits", "userSpaceOnUse"), a.classList.add("flow-edge-gradient");
    const c = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    c.setAttribute("offset", "0%"), a.appendChild(c);
    const d = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    d.setAttribute("offset", "100%"), a.appendChild(d), t.appendChild(a);
  }
  a.setAttribute("x1", String(o)), a.setAttribute("y1", String(i)), a.setAttribute("x2", String(r)), a.setAttribute("y2", String(s));
  const l = a.querySelectorAll("stop");
  return l[0]?.setAttribute("stop-color", n.from), l[1]?.setAttribute("stop-color", n.to), a;
}
function Oo(t, e) {
  t.querySelector(`#${CSS.escape(e)}`)?.remove();
}
function ko(t) {
  return t.endsWith("-l") ? { field: t.slice(0, -2), side: "left" } : t.endsWith("-r") ? { field: t.slice(0, -2), side: "right" } : { field: t, side: null };
}
function bp(t, e) {
  if (!Array.isArray(t)) return -1;
  const n = t.findIndex((r) => r?.name === e);
  if (n >= 0) return n;
  const { field: o, side: i } = ko(e);
  return i === null ? -1 : t.findIndex((r) => r?.name === o);
}
function Xs(t, e) {
  if (!Array.isArray(t) || !e || t.some((i) => i?.name === e)) return null;
  const { field: n, side: o } = ko(e);
  return o === null ? null : t.some((i) => i?.name === n) ? o : null;
}
function Ws(t, e, n, o, i) {
  const r = t.data?.fields;
  if (!Array.isArray(r) || !Number.isInteger(n) || n < 0 || n >= r.length) return null;
  const { width: s, height: a } = t.dimensions ?? {};
  if (typeof s != "number" || !Number.isFinite(s) || typeof a != "number" || !Number.isFinite(a)) return null;
  const { headerHeight: l, rowHeight: c, handleOffsetY: d, handleOffsetYLast: f, insetLeft: u, insetRight: h, insetTop: p } = i;
  if (!Number.isFinite(l) || !Number.isFinite(c) || !Number.isFinite(d) || !Number.isFinite(f) || !Number.isFinite(u) || !Number.isFinite(h) || !Number.isFinite(p))
    return null;
  const g = n === r.length - 1 ? f : d, m = e.y + p + l + n * c + g;
  return { x: o === "left" ? e.x + u : e.x + s - h, y: m, position: o };
}
const xp = /* @__PURE__ */ new Set(["x-data", "x-init", "x-bind", "href", "src", "action", "formaction", "srcdoc"]);
async function Ep(t) {
  const { dropNodeId: e, dropHandleId: n, draggedEnd: o, edge: i, canvas: r, containerEl: s } = t;
  if (!e)
    return { applied: !1 };
  const a = r.getNode(e);
  if (a && !Ye(a))
    return { applied: !1 };
  const l = o === "target" ? { source: i.source, sourceHandle: i.sourceHandle, target: e, targetHandle: n } : { source: e, sourceHandle: n, target: i.target, targetHandle: i.targetHandle }, c = { ...i }, d = await fa({
    edge: i,
    newConnection: l,
    canvas: r,
    containerEl: s,
    endpoint: o
  });
  return d.applied ? (r._emit?.("reconnect", { oldEdge: c, newConnection: l }), { applied: !0, newConnection: l }) : { applied: !1, reason: d.reason, newConnection: l };
}
function Cp(t) {
  return t === !0 || t === "dash" ? "dash" : t === "pulse" ? "pulse" : t === "dot" ? "dot" : "none";
}
function js(t, e) {
  if (!e) return t;
  const n = fi(t), o = e * Math.PI / 180, i = Math.cos(o), r = Math.sin(o), s = n.x * i - n.y * r, a = n.x * r + n.y * i;
  return Math.abs(s) > Math.abs(a) ? s > 0 ? "right" : "left" : a > 0 ? "bottom" : "top";
}
function Us(t) {
  return { x: (t.left + t.right) / 2, y: (t.top + t.bottom) / 2 };
}
function go(t, e) {
  const n = Array.from(t);
  if (n.length === 0) return null;
  if (n.length === 1 || !e) return n[0];
  let o = null, i = 1 / 0;
  for (const r of n) {
    const s = r.getBoundingClientRect(), a = (s.left + s.right) / 2, l = (s.top + s.bottom) / 2, c = a - e.x, d = l - e.y, f = c * c + d * d;
    f < i && (i = f, o = r);
  }
  return o;
}
function po(t, e, n, o, i, r, s) {
  const a = s ?? t.querySelector(`[data-flow-node-id="${CSS.escape(e)}"]`);
  if (a) {
    if (n) {
      const c = a.querySelectorAll(
        `[data-flow-handle-id="${CSS.escape(n)}"][data-flow-handle-type="${o}"]`
      );
      let d = go(c, r);
      if (!d) {
        const f = a.querySelectorAll(
          `[data-flow-handle-id="${CSS.escape(n)}"]`
        );
        d = go(f, r);
      }
      if (d)
        return d.getAttribute("data-flow-handle-position") ?? (o === "source" ? "bottom" : "top");
    }
    if (n) {
      const { field: c, side: d } = ko(n);
      if (d && (a.querySelector(
        `[data-flow-handle-id="${CSS.escape(c)}"][data-flow-handle-type="${o}"][data-flow-handle-position="${d}"]`
      ) || a.querySelector(`[data-flow-handle-position="${d}"]`)))
        return d;
    }
    const l = a.querySelector(`[data-flow-handle-type="${o}"]`);
    if (l)
      return l.getAttribute("data-flow-handle-position") ?? (o === "source" ? "bottom" : "top");
  }
  if (i) {
    const l = o === "source" ? i.sourcePosition : i.targetPosition;
    if (l) return l;
  }
  return o === "source" ? "bottom" : "top";
}
function Gs(t, e, n, o) {
  if (!t || !e || t.hidden || t.collapsed || t.condensed || t.rotation) return -1;
  const i = t.nodeOrigin;
  if (i && (i[0] !== 0 || i[1] !== 0) || !n?.hasAttribute("data-flow-schema-node") || n.style.display === "none") return -1;
  const r = t.dimensions?.width, s = t.dimensions?.height;
  if (typeof r != "number" || !Number.isFinite(r) || typeof s != "number" || !Number.isFinite(s)) return -1;
  const a = t.data?.fields;
  if (!Array.isArray(a) || a.length === 0) return -1;
  const l = o.insetTop + o.headerHeight + (a.length - 1) * o.rowHeight + o.rowHeightLast + o.insetBottom;
  return Math.abs(l - s) > 0.5 ? -1 : bp(a, e);
}
function Zs(t, e, n, o, i) {
  const r = t.dimensions?.width ?? we, s = e.x + (i.insetLeft + (r - i.insetRight)) / 2;
  return n === "source" ? o >= s ? "right" : "left" : o > s ? "right" : "left";
}
function Ks(t) {
  return t.position.x + (t.dimensions?.width ?? we) / 2;
}
function Sp(t, e, n, o, i, r, s, a) {
  const l = Gs(t, i, s?.get(t.id), a);
  if (l < 0) return null;
  const c = Gs(e, r, s?.get(e.id), a);
  if (c < 0) return null;
  const d = t.data?.fields, f = e.data?.fields, u = Xs(d, i) ?? Zs(t, n.position, "source", Ks(o), a), h = Xs(f, r) ?? Zs(e, o.position, "target", Ks(n), a), p = Ws(t, n.position, l, u, a), g = Ws(e, o.position, c, h, a);
  if (!p || !g) return null;
  const m = { handleWidth: a.handleWidth, handleHeight: a.handleHeight };
  return {
    sourcePos: p.position,
    targetPos: g.position,
    srcMeasurement: { x: p.x, y: p.y, ...m },
    tgtMeasurement: { x: g.x, y: g.y, ...m }
  };
}
function Js(t, e, n, o, i, r, s, a, l) {
  const c = l ?? t.querySelector(`[data-flow-node-id="${CSS.escape(e)}"]`);
  if (!c) return null;
  let d = null;
  if (o) {
    const g = c.querySelectorAll(
      `[data-flow-handle-id="${CSS.escape(o)}"][data-flow-handle-type="${i}"]`
    );
    if (d = go(g, a), !d) {
      const m = c.querySelectorAll(
        `[data-flow-handle-id="${CSS.escape(o)}"]`
      );
      d = go(m, a);
    }
    if (!d) {
      const { field: m, side: y } = ko(o);
      y && (d = c.querySelector(
        `[data-flow-handle-id="${CSS.escape(m)}"][data-flow-handle-type="${i}"][data-flow-handle-position="${y}"]`
      ) ?? c.querySelector(`[data-flow-handle-position="${y}"]`));
    }
  } else
    d = c.querySelector(`[data-flow-handle-type="${i}"]`);
  if (!d) return null;
  const f = d.getBoundingClientRect();
  if (f.width === 0 && f.height === 0) return null;
  const u = t.getBoundingClientRect(), h = f.left + f.width / 2, p = f.top + f.height / 2;
  return {
    x: (h - u.left - s.x) / r,
    y: (p - u.top - s.y) / r,
    handleWidth: f.width / r,
    handleHeight: f.height / r
  };
}
function kp(t, e, n) {
  const o = n ?? t.getTotalLength(), i = t.getPointAtLength(o * Math.max(0, Math.min(1, e)));
  return { x: i.x, y: i.y };
}
function ht(t, e, n, o, i) {
  const r = t - n, s = e - o;
  return Math.sqrt(r * r + s * s) <= i;
}
function Lp(t, e, n) {
  const o = n.x - e.x, i = n.y - e.y, r = o * o + i * i;
  if (r === 0) return Math.sqrt((t.x - e.x) ** 2 + (t.y - e.y) ** 2);
  let s = ((t.x - e.x) * o + (t.y - e.y) * i) / r;
  s = Math.max(0, Math.min(1, s));
  const a = e.x + s * o, l = e.y + s * i;
  return Math.sqrt((t.x - a) ** 2 + (t.y - l) ** 2);
}
function Mp(t) {
  t.directive(
    "flow-edge",
    (e, { expression: n }, { evaluate: o, effect: i, cleanup: r }) => {
      const s = e;
      s.style.pointerEvents = "auto";
      const a = document.createElementNS("http://www.w3.org/2000/svg", "path");
      a.setAttribute("fill", "none"), a.style.stroke = "transparent", a.style.strokeWidth = "20", a.style.pointerEvents = "stroke", a.style.cursor = "pointer", s.appendChild(a);
      let l = e.querySelector("path:not(:first-child)");
      l || (l = document.createElementNS("http://www.w3.org/2000/svg", "path"), l.setAttribute("fill", "none"), l.setAttribute("stroke-width", "1.5"), l.style.pointerEvents = "none", s.appendChild(l));
      let c = null, d = null, f = null, u = null, h = 0, p = null, g = "none", m = null, y = null;
      function x(k, A, O, j, Q) {
        p || (p = document.createElementNS("http://www.w3.org/2000/svg", "circle"), p.classList.add("flow-edge-dot"), p.style.pointerEvents = "none", k.appendChild(p));
        const G = O.closest(".flow-container"), U = G ? getComputedStyle(G) : null, Z = j.particleSize ?? (parseFloat(U?.getPropertyValue("--flow-edge-dot-size").trim() ?? "4") || 4), H = Q || U?.getPropertyValue("--flow-edge-dot-duration").trim() || "2s";
        p.setAttribute("r", String(Z)), j.particleColor ? p.style.fill = j.particleColor : p.style.removeProperty("fill");
        const q = p.querySelector("animateMotion");
        q && q.remove();
        const X = document.createElementNS("http://www.w3.org/2000/svg", "animateMotion");
        X.setAttribute("dur", H), X.setAttribute("repeatCount", "indefinite"), X.setAttribute("path", A), p.appendChild(X);
      }
      function C() {
        p?.remove(), p = null;
      }
      let b = null, E = null, _ = null, S = null;
      const N = (k) => {
        k.stopPropagation();
        const A = o(n);
        if (!A) return;
        const O = t.$data(e.closest("[x-data]"));
        O && (O._emit("edge-click", { edge: A, event: k }), bt(k, O._shortcuts?.multiSelect) ? O.selectedEdges.has(A.id) ? (O.selectedEdges.delete(A.id), A.selected = !1, B("selection", `Edge "${A.id}" deselected (shift)`)) : (O.selectedEdges.add(A.id), A.selected = !0, B("selection", `Edge "${A.id}" selected (shift)`)) : (O.deselectAll(), O.selectedEdges.add(A.id), A.selected = !0, B("selection", `Edge "${A.id}" selected`)), O._emitSelectionChange());
      }, R = (k) => {
        k.preventDefault(), k.stopPropagation();
        const A = o(n);
        if (!A) return;
        const O = t.$data(e.closest("[x-data]"));
        if (!O) return;
        const j = k.target;
        if (j.classList.contains("flow-edge-control-point")) {
          const Q = parseInt(j.dataset.pointIndex ?? "", 10);
          if (!isNaN(Q)) {
            O._emit("edge-control-point-context-menu", {
              edge: A,
              pointIndex: Q,
              position: { x: k.clientX, y: k.clientY },
              event: k
            });
            return;
          }
        }
        O._emit("edge-context-menu", { edge: A, event: k });
      }, M = (k) => {
        k.stopPropagation(), k.preventDefault();
        const A = o(n), O = t.$data(e.closest("[x-data]"));
        if (!A || !O || (A.type ?? O._config?.defaultEdgeType ?? "bezier") !== "editable") return;
        const Q = k.target;
        if (Q.classList.contains("flow-edge-control-point")) {
          const G = parseInt(Q.dataset.pointIndex ?? "", 10);
          !isNaN(G) && A.controlPoints && (O._captureHistory?.(), A.controlPoints.splice(G, 1), O._emit("edge-control-point-change", { edge: A, action: "remove", index: G }));
          return;
        }
        if (Q.classList.contains("flow-edge-midpoint")) {
          const G = parseInt(Q.dataset.segmentIndex ?? "", 10);
          if (!isNaN(G)) {
            const U = O.screenToFlowPosition(k.clientX, k.clientY);
            A.controlPoints || (A.controlPoints = []), O._captureHistory?.(), A.controlPoints.splice(G, 0, { x: U.x, y: U.y }), O._emit("edge-control-point-change", { edge: A, action: "add", index: G });
          }
          return;
        }
        if (Q.closest("path")) {
          const G = O.screenToFlowPosition(k.clientX, k.clientY);
          A.controlPoints || (A.controlPoints = []);
          const U = [
            b ?? { x: 0, y: 0 },
            ...A.controlPoints,
            E ?? { x: 0, y: 0 }
          ];
          let Z = 0, H = 1 / 0;
          for (let q = 0; q < U.length - 1; q++) {
            const X = Lp(G, U[q], U[q + 1]);
            X < H && (H = X, Z = q);
          }
          O._captureHistory?.(), A.controlPoints.splice(Z, 0, { x: G.x, y: G.y }), O._emit("edge-control-point-change", { edge: A, action: "add", index: Z });
        }
      }, T = (k) => {
        const A = k.target;
        if (!A.classList.contains("flow-edge-control-point") || k.button !== 0) return;
        k.stopPropagation(), k.preventDefault();
        const O = o(n);
        if (!O?.controlPoints) return;
        const j = t.$data(e.closest("[x-data]"));
        if (!j) return;
        const Q = parseInt(A.dataset.pointIndex ?? "", 10);
        if (isNaN(Q)) return;
        A.classList.add("dragging");
        let G = !1;
        const U = (H) => {
          G || (j._captureHistory?.(), G = !0);
          let q = j.screenToFlowPosition(H.clientX, H.clientY);
          const X = j._config?.snapToGrid;
          X && (q = {
            x: Math.round(q.x / X[0]) * X[0],
            y: Math.round(q.y / X[1]) * X[1]
          }), O.controlPoints[Q] = q;
        }, Z = () => {
          document.removeEventListener("pointermove", U), document.removeEventListener("pointerup", Z), A.classList.remove("dragging"), G && j._emit("edge-control-point-change", { edge: O, action: "move", index: Q });
        };
        document.addEventListener("pointermove", U), document.addEventListener("pointerup", Z);
      };
      s.addEventListener("contextmenu", R), s.addEventListener("dblclick", M), s.addEventListener("pointerdown", T, !0);
      let P = null;
      const w = (k) => {
        if (k.button !== 0) return;
        k.stopPropagation();
        const A = o(n);
        if (!A) return;
        const O = t.$data(e.closest("[x-data]"));
        if (!O) return;
        const j = O._config?.reconnectSnapRadius ?? rs, Q = O._config?.edgesReconnectable !== !1, G = A.reconnectable ?? !0;
        let U = null;
        if (Q && G !== !1 && b && E) {
          const oe = O.screenToFlowPosition(k.clientX, k.clientY), pe = ht(oe.x, oe.y, b.x, b.y, j) || _ && ht(oe.x, oe.y, _.x, _.y, j);
          (ht(oe.x, oe.y, E.x, E.y, j) || S && ht(oe.x, oe.y, S.x, S.y, j)) && (G === !0 || G === "target") ? U = "target" : pe && (G === !0 || G === "source") && (U = "source");
        }
        if (!U) {
          const oe = (pe) => {
            document.removeEventListener("pointerup", oe), N(pe);
          };
          document.addEventListener("pointerup", oe, { once: !0 });
          return;
        }
        const Z = k.clientX, H = k.clientY;
        let q = !1, X = !1, K = null;
        const F = O._config?.connectionSnapRadius ?? 20;
        let J = null, ee = null, W = null, re = Z, se = H;
        const ie = e.closest(".flow-container");
        if (!ie) return;
        const te = U === "target" ? b : E, ne = () => {
          q = !0, s.classList.add("flow-edge-reconnecting"), O._emit("reconnect-start", { edge: A, handleType: U }), B("reconnect", `Reconnection drag started on edge "${A.id}" (${U} end)`), ee = Kt({
            connectionLineType: O._config?.connectionLineType,
            connectionLineStyle: O._config?.connectionLineStyle,
            connectionLine: O._config?.connectionLine,
            containerEl: s.closest(".flow-container") ?? void 0
          }), J = ee.svg;
          const oe = O.screenToFlowPosition(Z, H);
          ee.update({
            fromX: te.x,
            fromY: te.y,
            toX: oe.x,
            toY: oe.y,
            source: A.source,
            sourceHandle: A.sourceHandle
          });
          const pe = ie.querySelector(".flow-viewport");
          pe && pe.appendChild(J), U === "target" && (O.pendingConnection = {
            source: A.source,
            sourceHandle: A.sourceHandle,
            position: oe
          }), O._pendingReconnection = {
            edge: A,
            draggedEnd: U,
            anchorPosition: { ...te },
            position: oe
          }, W = Eo(ie, O, re, se), U === "target" && kn(ie, A.source, A.sourceHandle ?? "source", O, A.id);
        }, me = (oe) => {
          if (re = oe.clientX, se = oe.clientY, !q) {
            Math.sqrt(
              (oe.clientX - Z) ** 2 + (oe.clientY - H) ** 2
            ) >= oo && ne();
            return;
          }
          const pe = O.screenToFlowPosition(oe.clientX, oe.clientY), ye = Sn({
            containerEl: ie,
            handleType: U === "target" ? "target" : "source",
            excludeNodeId: U === "target" ? A.source : A.target,
            cursorFlowPos: pe,
            connectionSnapRadius: F,
            getNode: (Pe) => O.getNode(Pe),
            toFlowPosition: (Pe, ze) => O.screenToFlowPosition(Pe, ze)
          });
          ye.element !== K && (K?.classList.remove("flow-handle-active"), ye.element?.classList.add("flow-handle-active"), K = ye.element), ee?.update({
            fromX: te.x,
            fromY: te.y,
            toX: ye.position.x,
            toY: ye.position.y,
            source: A.source,
            sourceHandle: A.sourceHandle
          });
          const be = ye.position;
          U === "target" && O.pendingConnection && (O.pendingConnection = {
            ...O.pendingConnection,
            position: be
          }), O._pendingReconnection && (O._pendingReconnection = {
            ...O._pendingReconnection,
            position: be
          }), W?.updatePointer(oe.clientX, oe.clientY);
        }, fe = () => {
          X || (X = !0, document.removeEventListener("pointermove", me), document.removeEventListener("pointerup", ae), W?.stop(), W = null, ee?.destroy(), ee = null, J = null, K?.classList.remove("flow-handle-active"), P = null, s.classList.remove("flow-edge-reconnecting"), Le(ie), O.pendingConnection = null, O._pendingReconnection = null);
        }, ae = async (oe) => {
          if (!q) {
            fe(), N(oe);
            return;
          }
          if (O._connectValidating) return;
          let pe = K, ye = null;
          if (!pe) {
            ye = document.elementFromPoint(oe.clientX, oe.clientY);
            const Ee = U === "target" ? '[data-flow-handle-type="target"]' : '[data-flow-handle-type="source"]';
            pe = ye?.closest(Ee);
          }
          const Pe = (pe ? pe.closest("[data-flow-node-id]") : ye?.closest("[data-flow-node-id]"))?.dataset.flowNodeId, ze = pe?.dataset.flowHandleId, Se = ee?.svg ?? null;
          Nt(Se, !0);
          let he;
          try {
            he = await Ep({
              dropNodeId: Pe,
              dropHandleId: ze,
              draggedEnd: U,
              edge: A,
              canvas: O,
              containerEl: ie
            });
          } finally {
            Nt(Se, !1);
          }
          he.applied ? B("reconnect", `Edge "${A.id}" reconnected (${U})`, he.newConnection) : B("reconnect", `Edge "${A.id}" reconnection cancelled — snapping back`, { reason: he.reason }), O._emit("reconnect-end", { edge: A, successful: he.applied }), fe();
        };
        document.addEventListener("pointermove", me), document.addEventListener("pointerup", ae), P = fe;
      };
      s.addEventListener("pointerdown", w);
      const v = (k) => {
        const A = o(n);
        if (!A) return;
        const O = t.$data(e.closest("[x-data]"));
        if (!O) return;
        const j = O._config?.edgesReconnectable !== !1, Q = A.reconnectable ?? !0;
        if (!j || Q === !1 || !b || !E) {
          s.style.removeProperty("cursor"), a.style.cursor = "pointer";
          return;
        }
        const G = O._config?.reconnectSnapRadius ?? rs, U = O.screenToFlowPosition(k.clientX, k.clientY), Z = (ht(U.x, U.y, b.x, b.y, G) || _ && ht(U.x, U.y, _.x, _.y, G)) && (Q === !0 || Q === "source"), H = (ht(U.x, U.y, E.x, E.y, G) || S && ht(U.x, U.y, S.x, S.y, G)) && (Q === !0 || Q === "target");
        Z || H ? (s.style.cursor = "grab", a.style.cursor = "grab") : (s.style.removeProperty("cursor"), a.style.cursor = "pointer");
      };
      s.addEventListener("pointermove", v);
      const $ = (k) => {
        if (k.key !== "Enter" && k.key !== " ") return;
        k.preventDefault(), k.stopPropagation();
        const A = o(n);
        if (!A) return;
        const O = t.$data(e.closest("[x-data]"));
        O && (O._emit("edge-click", { edge: A, event: k }), bt(k, O._shortcuts?.multiSelect) ? O.selectedEdges.has(A.id) ? (O.selectedEdges.delete(A.id), A.selected = !1) : (O.selectedEdges.add(A.id), A.selected = !0) : (O.deselectAll(), O.selectedEdges.add(A.id), A.selected = !0), O._emitSelectionChange());
      };
      s.addEventListener("keydown", $);
      const L = () => {
        s.matches(":focus-visible") && s.classList.add("flow-edge-focused");
      }, D = () => s.classList.remove("flow-edge-focused");
      s.addEventListener("focus", L), s.addEventListener("blur", D);
      const z = (k) => {
        k.stopPropagation();
      };
      s.addEventListener("mousedown", z);
      const V = () => {
        for (const k of [c, d, f])
          k && k.classList.add("flow-edge-hovered");
      }, I = () => {
        for (const k of [c, d, f])
          k && k.classList.remove("flow-edge-hovered");
      };
      s.addEventListener("mouseenter", V), s.addEventListener("mouseleave", I), i(() => {
        const k = o(n);
        if (!k || !l) return;
        s.setAttribute("data-flow-edge-id", k.id);
        const A = t.$data(e.closest("[x-data]"));
        if (!A?.nodes) return;
        const O = k.type ?? A._config?.defaultEdgeType ?? "bezier", j = A._config?.edgeLod;
        let Q = O;
        if (j) {
          const Y = A._zoomLevel;
          (j.simplifyAt === "medium" && Y === "medium" || Y === "far") && (Q = "straight");
        }
        A._layoutAnimTick, A._edgeDirtyTicks?.get(k.id);
        const G = A.getNode(k.source), U = A.getNode(k.target);
        if (!G || !U) return;
        G.sourcePosition, U.targetPosition;
        const Z = ct(G, A._nodeMap, A._config?.nodeOrigin), H = ct(U, A._nodeMap, A._config?.nodeOrigin), q = e.closest("[x-data]");
        let X, K, F, J;
        const ee = A._schemaMetrics, W = A._config?.nodeOrigin, re = O !== "floating" && A._config?.schemaHandleGeometry !== "dom" && ee && (!W || W[0] === 0 && W[1] === 0) ? Sp(
          G,
          U,
          Z,
          H,
          k.sourceHandle,
          k.targetHandle,
          A._nodeElements,
          ee
        ) : null;
        if (O === "floating") {
          const Y = Ra(Z, H);
          X = Y.sourcePos, K = Y.targetPos, F = { x: Y.sx, y: Y.sy, handleWidth: 0, handleHeight: 0 }, J = { x: Y.tx, y: Y.ty, handleWidth: 0, handleHeight: 0 }, b = { x: Y.sx, y: Y.sy }, E = { x: Y.tx, y: Y.ty };
        } else if (re)
          X = re.sourcePos, K = re.targetPos, F = re.srcMeasurement, J = re.tgtMeasurement, b = { x: F.x, y: F.y }, E = { x: J.x, y: J.y };
        else {
          const Y = A._nodeElements?.get(k.source) ?? q.querySelector(`[data-flow-node-id="${CSS.escape(k.source)}"]`), le = A._nodeElements?.get(k.target) ?? q.querySelector(`[data-flow-node-id="${CSS.escape(k.target)}"]`), ge = Y ? Us(Y.getBoundingClientRect()) : void 0, de = le ? Us(le.getBoundingClientRect()) : void 0;
          X = po(q, k.source, k.sourceHandle, "source", G, de, Y), K = po(q, k.target, k.targetHandle, "target", U, ge, le);
          const ce = t.raw(A).viewport ?? { x: 0, y: 0, zoom: 1 }, ue = ce.zoom || 1, xe = G.rotation, ke = U.rotation;
          X = js(X, xe), K = js(K, ke), F = Js(q, k.source, Z, k.sourceHandle, "source", ue, ce, de, Y), J = Js(q, k.target, H, k.targetHandle, "target", ue, ce, ge, le);
          const Ne = Qt(Z, X, A._shapeRegistry, A._config?.nodeOrigin), Me = Qt(H, K, A._shapeRegistry, A._config?.nodeOrigin);
          b = F ?? Ne, E = J ?? Me;
        }
        let se = Vt(F ?? b, X, F, k.markerStart), ie = Vt(J ?? E, K, J, k.markerEnd);
        if (O === "orthogonal" || O === "avoidant") {
          const Y = t.raw(A._endpointSpreadGrouping);
          if (Y) {
            const le = lo(G.endpointSpread ?? A._config?.avoidantEndpointSpread);
            if (le !== null) {
              const de = Y.get(`${k.source}|${k.sourceHandle ?? ""}`), ce = de?.lanes.get(k.id);
              if (de && ce !== void 0 && de.count > 1) {
                const ue = A._schemaMetrics?.rowHeight ?? F?.handleHeight ?? 0;
                se = Ms(se, X, Ls(ce, de.count, ue, le));
              }
            }
            const ge = lo(U.endpointSpread ?? A._config?.avoidantEndpointSpread);
            if (ge !== null) {
              const de = Y.get(`${k.target}|${k.targetHandle ?? ""}`), ce = de?.lanes.get(k.id);
              if (de && ce !== void 0 && de.count > 1) {
                const ue = A._schemaMetrics?.rowHeight ?? J?.handleHeight ?? 0;
                ie = Ms(ie, K, Ls(ce, de.count, ue, ge));
              }
            }
          }
        }
        _ = se, S = ie;
        let te;
        if (O === "orthogonal" || O === "avoidant")
          if (A._config?.avoidantSimplifyOnDrag !== !1 && (A._draggingNodeIds?.has(k.source) || A._draggingNodeIds?.has(k.target)))
            te = void 0;
          else {
            const le = t.raw(A._obstacleSnapshot);
            if (le)
              te = le.filter((ge) => ge.id !== k.source && ge.id !== k.target);
            else {
              const ge = t.raw(A.nodes), de = new Map(ge.map((ue) => [ue.id, ue])), ce = A._config?.nodeOrigin;
              te = ge.filter((ue) => ue.id !== k.source && ue.id !== k.target).map((ue) => {
                const xe = ct(ue, de, ce);
                return {
                  x: xe.position.x,
                  y: xe.position.y,
                  width: xe.dimensions?.width ?? we,
                  height: xe.dimensions?.height ?? _e
                };
              });
            }
          }
        let ne = 0;
        (O === "orthogonal" || O === "avoidant") && (ne = t.raw(A._crossingPlan)?.get(k.id) ?? 0);
        const me = Q === O ? k : { ...k, type: Q }, { path: fe, labelPosition: ae } = ho(me, Z, H, X, K, se, ie, A._config?.edgeTypes, te, A._shapeRegistry, A._config?.nodeOrigin, A._config?.defaultEdgeType, ne);
        l.setAttribute("d", fe), a.setAttribute("d", fe), (O === "orthogonal" || O === "avoidant") && t.raw(A._edgeCorridors)?.set(k.id, {
          minX: Math.min(se.x, ie.x),
          minY: Math.min(se.y, ie.y),
          maxX: Math.max(se.x, ie.x),
          maxY: Math.max(se.y, ie.y)
        });
        const oe = O === "editable", pe = oe && (k.showControlPoints || k.selected);
        if (s.querySelectorAll(".flow-edge-control-point, .flow-edge-midpoint").forEach((Y) => Y.remove()), pe) {
          const Y = k.controlPoints ?? [], le = A.viewport?.zoom ?? 1, ge = 6 / le, de = 5 / le, ce = b ?? { x: 0, y: 0 }, ue = E ?? { x: 0, y: 0 }, xe = [ce, ...Y, ue], ke = xe.length - 1, Ne = l.getTotalLength?.() ?? 0;
          if (Ne > 0) {
            const Me = [0], Ve = 200;
            let De = 1;
            for (let Xe = 1; Xe <= Ve && De < xe.length; Xe++) {
              const An = Xe / Ve * Ne, nn = l.getPointAtLength(An), Ke = xe[De], on = nn.x - Ke.x, Oi = nn.y - Ke.y;
              on * on + Oi * Oi < 25 && (Me.push(An), De++);
            }
            for (; Me.length <= ke; )
              Me.push(Ne);
            for (let Xe = 0; Xe < ke; Xe++) {
              const An = (Me[Xe] + Me[Xe + 1]) / 2, nn = l.getPointAtLength(An), Ke = document.createElementNS("http://www.w3.org/2000/svg", "circle");
              Ke.classList.add("flow-edge-midpoint"), Ke.setAttribute("cx", String(nn.x)), Ke.setAttribute("cy", String(nn.y)), Ke.setAttribute("r", String(de)), Ke.dataset.segmentIndex = String(Xe);
              const on = document.createElementNS("http://www.w3.org/2000/svg", "title");
              on.textContent = "Double-click to add control point", Ke.appendChild(on), s.appendChild(Ke);
            }
          }
          for (let Me = 0; Me < Y.length; Me++) {
            const Ve = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            Ve.classList.add("flow-edge-control-point"), Ve.setAttribute("cx", String(Y[Me].x)), Ve.setAttribute("cy", String(Y[Me].y)), Ve.setAttribute("r", String(ge)), Ve.dataset.pointIndex = String(Me), s.appendChild(Ve);
          }
        }
        if (a.style.cursor = oe ? "crosshair" : "pointer", a.style.strokeWidth = String(
          k.interactionWidth ?? A._config?.defaultInteractionWidth ?? 20
        ), k.markerStart != null) {
          const Y = Yt(k.markerStart), le = Xt(Y, A._id);
          l.setAttribute("marker-start", `url(#${le})`);
        } else if (k._renderDualMarker && k.markerEnd) {
          const Y = Yt(k.markerEnd), le = Xt(Y, A._id);
          l.setAttribute("marker-start", `url(#${le})`);
        } else
          l.removeAttribute("marker-start");
        if (k.markerEnd) {
          const Y = Yt(k.markerEnd), le = Xt(Y, A._id);
          l.setAttribute("marker-end", `url(#${le})`);
        } else
          l.removeAttribute("marker-end");
        const ye = k.strokeWidth ?? 1.5, be = Cp(k.animated);
        switch (be !== g && (l.classList.remove("flow-edge-animated", "flow-edge-pulse"), g === "dot" && C(), g = be), be) {
          case "dash":
            l.classList.add("flow-edge-animated");
            break;
          case "pulse":
            l.classList.add("flow-edge-pulse");
            break;
          case "dot":
            x(s, fe, q, k, k.animationDuration);
            break;
        }
        if (k.animationDuration && be !== "none" ? (be === "dash" || be === "pulse") && (l.style.animationDuration = k.animationDuration) : (be === "dash" || be === "pulse") && l.style.removeProperty("animation-duration"), y && y !== k.class && s.classList.remove(...y.split(" ").filter(Boolean)), k.class) {
          const Y = be === "dash" ? " flow-edge-animated" : be === "pulse" ? " flow-edge-pulse" : "";
          l.setAttribute("class", k.class + Y), s.classList.add(...k.class.split(" ").filter(Boolean)), y = k.class;
        } else
          y && (s.classList.remove(...y.split(" ").filter(Boolean)), y = null);
        if (s.setAttribute("aria-selected", String(!!k.selected)), k.selected)
          s.classList.add("flow-edge-selected"), l.style.strokeWidth = String(Math.max(ye + 1, 2.5)), l.style.stroke = "var(--flow-edge-stroke-selected, " + xn + ")";
        else {
          s.classList.remove("flow-edge-selected"), l.style.strokeWidth = String(ye);
          const Y = A._markerDefsEl?.querySelector("defs") ?? null;
          if (Ha(k.color)) {
            if (Y) {
              const le = Fa(A._id, k.id), ge = k.gradientDirection === "target-source", de = b.x, ce = b.y, ue = E.x, xe = E.y;
              Oa(
                Y,
                le,
                ge ? { from: k.color.to, to: k.color.from } : k.color,
                de,
                ce,
                ue,
                xe
              ), l.style.stroke = `url(#${le})`, m = le;
            }
          } else if (k.color) {
            if (m) {
              const le = Y;
              le && Oo(le, m), m = null;
            }
            l.style.stroke = k.color;
          } else {
            if (m) {
              const le = Y;
              le && Oo(le, m), m = null;
            }
            l.style.removeProperty("stroke");
          }
        }
        if (!k.selected && ((k.sourceHandle ? A.selectedRows?.has(k.sourceHandle.replace(/-[lr]$/, "")) : !1) || (k.targetHandle ? A.selectedRows?.has(k.targetHandle.replace(/-[lr]$/, "")) : !1)) ? (s.classList.add("flow-edge-row-highlighted"), k.selected || (l.style.strokeWidth = String(Math.max(ye + 0.5, 2)), l.style.stroke = getComputedStyle(s.closest(".flow-container")).getPropertyValue("--flow-edge-row-highlight-color").trim() || "#3b82f6")) : s.classList.remove("flow-edge-row-highlighted"), k.focusable ?? A._config?.edgesFocusable !== !1 ? (s.setAttribute("tabindex", "0"), s.setAttribute("role", k.ariaRole ?? "group"), s.setAttribute("aria-label", k.ariaLabel ?? (k.label ? `Edge: ${k.label}` : `Edge from ${k.source} to ${k.target}`))) : (s.removeAttribute("tabindex"), s.removeAttribute("role"), s.removeAttribute("aria-label")), k.domAttributes)
          for (const [Y, le] of Object.entries(k.domAttributes))
            Y.startsWith("on") || xp.has(Y.toLowerCase()) || s.setAttribute(Y, le);
        const Se = (Y, le, ge, de, ce) => {
          if (le) {
            if (!Y && de) {
              const ue = ge.includes("flow-edge-label-start"), xe = ge.includes("flow-edge-label-end");
              let ke = `[data-flow-edge-id="${ce}"].flow-edge-label`;
              ue ? ke += ".flow-edge-label-start" : xe ? ke += ".flow-edge-label-end" : ke += ":not(.flow-edge-label-start):not(.flow-edge-label-end)", Y = de.querySelector(ke);
            }
            return Y || (Y = document.createElement("div"), Y.className = ge, Y.dataset.flowEdgeId = ce, de && de.appendChild(Y)), Y.textContent = le, Y;
          }
          return Y && Y.remove(), null;
        }, he = e.closest(".flow-viewport"), Ee = k.labelVisibility ?? "always", Ie = () => {
          const Y = l.getAttribute("d") ?? "";
          return Y !== u && (u = Y, h = typeof l.getTotalLength == "function" && l.getTotalLength() || 0), h;
        };
        if (c = Se(c, k.label, "flow-edge-label", he, k.id), c) {
          const Y = Ie();
          if (Y > 0) {
            const le = k.labelPosition ?? 0.5, ge = kp(l, le, Y);
            c.style.left = `${ge.x}px`, c.style.top = `${ge.y}px`;
          } else
            c.style.left = `${ae.x}px`, c.style.top = `${ae.y}px`;
        }
        if (d = Se(d, k.labelStart, "flow-edge-label flow-edge-label-start", he, k.id), d) {
          const Y = Ie();
          if (Y > 0) {
            const le = k.labelStartOffset ?? 30, ge = l.getPointAtLength(Math.min(le, Y / 2));
            d.style.left = `${ge.x}px`, d.style.top = `${ge.y}px`;
          }
        }
        if (f = Se(f, k.labelEnd, "flow-edge-label flow-edge-label-end", he, k.id), f) {
          const Y = Ie();
          if (Y > 0) {
            const le = k.labelEndOffset ?? 30, ge = l.getPointAtLength(Math.max(Y - le, Y / 2));
            f.style.left = `${ge.x}px`, f.style.top = `${ge.y}px`;
          }
        }
        for (const Y of [c, d, f])
          Y && (Y.classList.toggle("flow-edge-label-hover", Ee === "hover"), Y.classList.toggle("flow-edge-label-on-select", Ee === "selected"), Y.classList.toggle("flow-edge-label-selected", !!k.selected), k.class ? Y.classList.add(...k.class.split(" ").filter(Boolean)) : y && Y.classList.remove(...y.split(" ").filter(Boolean)));
      }), r(() => {
        if (m) {
          const A = t.$data(e.closest("[x-data]"))?._markerDefsEl?.querySelector("defs");
          A && Oo(A, m);
        }
        P?.(), C(), s.removeEventListener("contextmenu", R), s.removeEventListener("dblclick", M), s.removeEventListener("pointerdown", T, !0), s.removeEventListener("pointerdown", w), s.removeEventListener("pointermove", v), s.removeEventListener("keydown", $), s.removeEventListener("focus", L), s.removeEventListener("blur", D), s.removeEventListener("mousedown", z), s.removeEventListener("mouseenter", V), s.removeEventListener("mouseleave", I), c?.remove(), d?.remove(), f?.remove();
      });
    }
  );
}
function Pp(t, e) {
  return {
    /** Write node positions directly to DOM elements (bypassing Alpine effects). */
    _flushNodePositions(n) {
      for (const o of n) {
        const i = t.getNode(o);
        if (!i) continue;
        const r = t._nodeElements.get(o);
        if (!r) continue;
        const s = e.raw(i), a = s.parentId ? t.getAbsolutePosition(o) : s.position, l = s.nodeOrigin ?? t._config.nodeOrigin ?? [0, 0], c = s.dimensions?.width ?? 150, d = s.dimensions?.height ?? 40;
        r.style.left = a.x - c * l[0] + "px", r.style.top = a.y - d * l[1] + "px";
      }
    },
    /** Write node styles directly to DOM elements (bypassing Alpine effects). */
    _flushNodeStyles(n) {
      for (const o of n) {
        const i = t.getNode(o);
        if (!i) continue;
        const r = t._nodeElements.get(o);
        if (!r) continue;
        const a = e.raw(i).style;
        if (!a) continue;
        const l = typeof a == "string" ? En(a) : a;
        for (const [c, d] of Object.entries(l))
          r.style.setProperty(c, d);
      }
    },
    /** Write edge color/strokeWidth directly to SVG elements (bypassing Alpine effects). */
    _flushEdgeStyles(n) {
      for (const o of n) {
        const i = t.getEdge(o);
        if (!i) continue;
        const r = e.raw(i), s = t.getEdgePathElement(o);
        s && (typeof r.color == "string" && (s.style.stroke = r.color), r.strokeWidth !== void 0 && (s.style.strokeWidth = String(r.strokeWidth)));
      }
    },
    /** Push current viewport state to the DOM (transform, background, culling). */
    _flushViewport() {
      if (t._viewportEl) {
        const n = t.viewport;
        t._viewportEl.style.transform = `translate(${n.x}px, ${n.y}px) scale(${n.zoom})`;
      }
      t._applyBackground(), t._applyCulling();
    },
    /** Recompute SVG paths, label positions, and gradients for edges connected to the given node IDs. */
    _refreshEdgePaths(n) {
      for (const o of t.edges) {
        if (!n.has(o.source) && !n.has(o.target)) continue;
        const i = e.raw(t.getNode(o.source)), r = e.raw(t.getNode(o.target));
        if (!i || !r) continue;
        const s = ct(i, t._nodeMap, t._config.nodeOrigin), a = ct(r, t._nodeMap, t._config.nodeOrigin);
        let l, c, d, f;
        if (o.type === "floating") {
          const h = Ra(s, a);
          d = { x: h.sx, y: h.sy }, f = { x: h.tx, y: h.ty };
          const p = Vt(d, h.sourcePos, null, o.markerStart), g = Vt(f, h.targetPos, null, o.markerEnd), m = ho(o, s, a, h.sourcePos, h.targetPos, p, g, void 0, void 0, t._shapeRegistry, t._config.nodeOrigin);
          l = m.path, c = m.labelPosition;
        } else {
          const h = t._container;
          let p, g;
          if (h) {
            const E = h.querySelector(
              `[data-flow-node-id="${CSS.escape(o.source)}"]`
            ), _ = h.querySelector(
              `[data-flow-node-id="${CSS.escape(o.target)}"]`
            );
            if (E) {
              const S = E.getBoundingClientRect();
              p = { x: (S.left + S.right) / 2, y: (S.top + S.bottom) / 2 };
            }
            if (_) {
              const S = _.getBoundingClientRect();
              g = { x: (S.left + S.right) / 2, y: (S.top + S.bottom) / 2 };
            }
          }
          const m = h ? po(h, o.source, o.sourceHandle, "source", i, g) : i?.sourcePosition ?? "bottom", y = h ? po(h, o.target, o.targetHandle, "target", r, p) : r?.targetPosition ?? "top";
          d = Qt(s, m, t._shapeRegistry, t._config.nodeOrigin), f = Qt(a, y, t._shapeRegistry, t._config.nodeOrigin);
          const x = Vt(d, m, null, o.markerStart), C = Vt(f, y, null, o.markerEnd), b = ho(o, s, a, m, y, x, C, void 0, void 0, t._shapeRegistry, t._config.nodeOrigin);
          l = b.path, c = b.labelPosition;
        }
        const u = t.getEdgePathElement(o.id);
        if (u) {
          u.setAttribute("d", l);
          const p = u.parentElement?.querySelector("path:first-child");
          p && p !== u && p.setAttribute("d", l);
        }
        if (Ha(o.color)) {
          const h = t._markerDefsEl?.querySelector("defs");
          if (h) {
            const p = Fa(t._id, o.id), g = o.gradientDirection === "target-source";
            Oa(
              h,
              p,
              g ? { from: o.color.to, to: o.color.from } : o.color,
              d.x,
              d.y,
              f.x,
              f.y
            );
          }
        }
        if ((o.label || o.labelStart || o.labelEnd) && t._viewportEl) {
          if (o.label) {
            const h = t._viewportEl.querySelector(
              `[data-flow-edge-id="${o.id}"].flow-edge-label:not(.flow-edge-label-start):not(.flow-edge-label-end)`
            );
            h && (h.style.left = `${c.x}px`, h.style.top = `${c.y}px`);
          }
          if (o.labelStart && u) {
            const h = t._viewportEl.querySelector(
              `[data-flow-edge-id="${o.id}"].flow-edge-label-start`
            );
            if (h) {
              const p = u.getTotalLength(), g = o.labelStartOffset ?? 30, m = u.getPointAtLength(Math.min(g, p / 2));
              h.style.left = `${m.x}px`, h.style.top = `${m.y}px`;
            }
          }
          if (o.labelEnd && u) {
            const h = t._viewportEl.querySelector(
              `[data-flow-edge-id="${o.id}"].flow-edge-label-end`
            );
            if (h) {
              const p = u.getTotalLength(), g = o.labelEndOffset ?? 30, m = u.getPointAtLength(Math.max(p - g, p / 2));
              h.style.left = `${m.x}px`, h.style.top = `${m.y}px`;
            }
          }
        }
      }
    },
    /** Return the registered DOM element for a node by ID, or undefined if not mounted. */
    getNodeElement(n) {
      return t._nodeElements.get(n);
    },
    /** Walk up from any element to find the enclosing node's ID via the data-flow-node-id attribute.
     *  Returns null if no ancestor (or the element itself) carries the attribute. */
    getNodeIdFromElement(n) {
      const o = n.closest("[data-flow-node-id]");
      return o ? o.getAttribute("data-flow-node-id") : null;
    }
  };
}
function Np(t) {
  return {
    _applyConfigPatch(e) {
      const n = t._config;
      for (const [o, i] of Object.entries(e))
        if (i !== void 0)
          switch (n[o] = i, o) {
            case "pannable":
            case "zoomable":
            case "minZoom":
            case "maxZoom":
            case "panOnScroll":
            case "panOnScrollDirection":
            case "panOnScrollSpeed":
              t._panZoom?.update({ [o]: i });
              break;
            case "background":
              t._background = i, t._applyBackground();
              break;
            case "backgroundGap":
              t._backgroundGap = i, t._container && t._container.style.setProperty("--flow-bg-pattern-gap", String(i));
              break;
            case "patternColor":
              t._patternColorOverride = i, t._container && t._container.style.setProperty("--flow-bg-pattern-color", i);
              break;
            case "debug":
              Kr(!!i);
              break;
            case "preventOverlap":
              t._config.preventOverlap = i;
              break;
            case "reconnectOnDelete":
              t._config.reconnectOnDelete = i;
              break;
            case "nodeOrigin":
              t._config.nodeOrigin = i;
              break;
            case "preventCycles":
              t._config.preventCycles = i;
              break;
            case "loading":
              t._userLoading = !!i;
              break;
            case "loadingText":
              t._loadingText = i;
              break;
            case "colorMode":
              t._config.colorMode = i, i && t._container ? t._colorModeHandle ? t._colorModeHandle.update(i) : t._colorModeHandle = ka(t._container, i) : !i && t._colorModeHandle && (t._colorModeHandle.destroy(), t._colorModeHandle = null);
              break;
            case "autoLayout":
              n.autoLayout = i || void 0, t._autoLayoutFailed = !1, i ? (t._autoLayoutReady = !0, t._scheduleAutoLayout()) : (t._autoLayoutReady = !1, t._autoLayoutTimer && (clearTimeout(t._autoLayoutTimer), t._autoLayoutTimer = null));
              break;
          }
    }
  };
}
let Tp = 0;
function Ap(t, e) {
  switch (t) {
    case "lines":
    case "cross":
      return `linear-gradient(0deg, ${e} 1px, transparent 1px), linear-gradient(90deg, ${e} 1px, transparent 1px)`;
    default:
      return `radial-gradient(circle, ${e} 1px, transparent 1px)`;
  }
}
function $p(t, e) {
  return t ? !(t.maxX < e.minX || t.minX > e.maxX || t.maxY < e.minY || t.minY > e.maxY) : !0;
}
const Ip = ".flow-panel, .flow-controls, .flow-minimap, .canvas-overlay";
function Qs(t) {
  return t != null && t.closest(Ip) != null;
}
function Dp(t) {
  t.data("flowCanvas", (e = {}) => {
    const n = {
      // ── Reactive State ────────────────────────────────────────────────
      /** Unique instance ID for SVG marker dedup, etc. */
      _id: `flow-${++Tp}`,
      nodes: e.nodes ?? [],
      edges: e.edges ?? [],
      viewport: {
        x: e.viewport?.x ?? 0,
        y: e.viewport?.y ?? 0,
        zoom: e.viewport?.zoom ?? 1
      },
      /** Whether the canvas has completed initialization and first node measurement */
      ready: !1,
      /** User-controlled loading flag, initialized from config.loading */
      _userLoading: e.loading ?? !1,
      /** Custom text for the default loading indicator */
      _loadingText: e.loadingText ?? "Loading…",
      /** Auto-injected loading overlay element (when config.loading: true and no directive) */
      _autoLoadingOverlay: null,
      /** True when the canvas is still initializing OR the user has set loading */
      get isLoading() {
        return !this.ready || this._userLoading;
      },
      /** Whether interactivity (pan/zoom/drag) is enabled. Seeded from
       *  `config.interactive` (default true) so a canvas can start locked. */
      isInteractive: e.interactive !== !1,
      /** Whether the canvas container is currently in fullscreen mode */
      isFullscreen: !1,
      /** Fullscreen change handler (bound to document for cleanup) */
      _onFullscreenChange: null,
      /** Resolved target element while a fullscreen session is active. */
      _fullscreenTarget: null,
      /** Currently active connection drag, or null */
      pendingConnection: null,
      /** Currently active edge reconnection drag, or null */
      _pendingReconnection: null,
      /** Keyboard-armed pending connection (source handle activated via Enter/Space), or null */
      _pendingKeyboardConnect: null,
      /** Set of selected node IDs */
      selectedNodes: /* @__PURE__ */ new Set(),
      /** Set of selected edge IDs */
      selectedEdges: /* @__PURE__ */ new Set(),
      /** Set of selected row IDs (format: nodeId.attrId) */
      selectedRows: /* @__PURE__ */ new Set(),
      /** Context menu state — populated automatically by context menu events */
      contextMenu: {
        show: !1,
        type: null,
        x: 0,
        y: 0,
        node: null,
        edge: null,
        position: null,
        nodes: null,
        event: null
      },
      // ── Shape Registry ─────────────────────────────────────────────────
      _shapeRegistry: { ...Sa, ...e.shapeTypes },
      // ── Background ────────────────────────────────────────────────────
      _background: e.background ?? "dots",
      _backgroundGap: e.backgroundGap ?? null,
      _patternColorOverride: e.patternColor ?? null,
      /**
       * Cached resolution of the `--flow-bg-pattern-gap` CSS variable. Reading it
       * requires `getComputedStyle`, a forced style recalc that is prohibitively
       * expensive to run on every viewport frame at schema scale. Populated on the
       * first successful read; invalidate (set `null`) on any theme/colorMode
       * change, since the active theme can redefine the variable.
       */
      _bgGapCache: null,
      /** Last backgroundImage string written to the container — lets `_applyBackground`
       * skip the (per-frame identical) gradient write. */
      _lastBgImage: null,
      /**
       * Cached header/row/handle geometry for `x-flow-schema` nodes, measured
       * once by the first schema node's `render()` (see flow-schema.ts). Plain
       * (non-reactive) field. `Alpine.raw(canvas)` does NOT unwrap Alpine's
       * merge-scope proxy, so a GET/SET through it still tracks/triggers the
       * underlying reactive object inside an active effect — this field is
       * safe only because flow-schema.ts reads and writes it OUTSIDE the
       * directive's `effect()` (deferred via `Alpine.nextTick`), not because of
       * `Alpine.raw()` itself. Invalidate (set `null`) on any theme/colorMode
       * change, same contract as `_bgGapCache` above.
       */
      _schemaMetrics: null,
      _getBackgroundGap() {
        if (this._backgroundGap !== null)
          return this._backgroundGap;
        if (this._bgGapCache !== null)
          return this._bgGapCache;
        if (this._container) {
          const s = getComputedStyle(this._container).getPropertyValue("--flow-bg-pattern-gap").trim(), a = parseFloat(s);
          if (!isNaN(a))
            return this._bgGapCache = a, a;
        }
        return 20;
      },
      _resolveBackgroundLayers() {
        const s = this._background;
        if (!s || s === "none") return [];
        const a = this._getBackgroundGap(), l = this._patternColorOverride ?? "var(--flow-bg-pattern-color)";
        return Array.isArray(s) ? s.map((c) => ({
          variant: c.variant ?? "dots",
          gap: c.gap ?? a,
          color: c.color ?? l
        })) : [{ variant: s, gap: a, color: l }];
      },
      backgroundStyle() {
        const s = this._resolveBackgroundLayers();
        if (s.length === 0) return { backgroundImage: "", backgroundSize: "", backgroundPosition: "" };
        const a = this.viewport.zoom, l = this.viewport.x, c = this.viewport.y, d = [], f = [], u = [];
        for (const h of s) {
          const p = h.gap * a, g = h.variant === "cross" ? p / 2 : p;
          d.push(Ap(h.variant, h.color)), h.variant === "lines" || h.variant === "cross" ? (f.push(`${g}px ${g}px, ${g}px ${g}px`), u.push(`${l}px ${c}px, ${l}px ${c}px`)) : (f.push(`${p}px ${p}px`), u.push(`${l}px ${c}px`));
        }
        return {
          backgroundImage: d.join(", "),
          backgroundSize: f.join(", "),
          backgroundPosition: u.join(", ")
        };
      },
      // ── Internal ──────────────────────────────────────────────────────
      // Strip collab from stored config — provider objects may contain
      // circular references (e.g. InMemoryProvider.peer) that crash
      // Alpine's deep-reactive proxy walker.
      _config: (() => {
        const { collab: s, ...a } = e;
        return a;
      })(),
      _shortcuts: lh(e.keyboardShortcuts),
      _container: null,
      _panZoom: null,
      _onKeyDown: null,
      _active: !1,
      _zoomLevel: "close",
      _onContainerPointerDown: null,
      _onCanvasClick: null,
      _onCanvasContextMenu: null,
      _contextMenuBackdrop: null,
      _markerDefsEl: null,
      _minimap: null,
      _controls: null,
      _selectionBox: null,
      _lasso: null,
      _selectionTool: "box",
      _onSelectionPointerDown: null,
      _onSelectionPointerMove: null,
      _onSelectionPointerUp: null,
      _selectionShiftHeld: !1,
      _selectionEffectiveMode: "partial",
      _suppressNextCanvasClick: !1,
      /** Cleanup function for long-press listener */
      _longPressCleanup: null,
      /** Whether touch selection mode is currently active */
      _touchSelectionMode: !1,
      /** Cleanup function for touch selection mode listeners */
      _touchSelectionCleanup: null,
      _nodeMap: /* @__PURE__ */ new Map(),
      /**
       * Reactive parent-id → child-ids index, reconciled in `_rebuildNodeMap`.
       * Lets each node effect ask "do I have children?" via an O(1) keyed lookup
       * instead of scanning the whole nodes array (which subscribed every node
       * effect to the entire array — O(N²) on any array change).
       */
      _childrenIds: /* @__PURE__ */ new Map(),
      /** Stores each node's originally configured dimensions (before layout stretch). */
      _initialDimensions: /* @__PURE__ */ new Map(),
      _edgeMap: /* @__PURE__ */ new Map(),
      _viewportEl: null,
      _handleDelegationCleanup: null,
      /**
       * The element the delegated handle listener is CURRENTLY installed on, or null
       * when nothing is installed. Tracked separately from `_viewportEl` because the
       * two can diverge: `_viewportEl` is re-pointed the instant a replacement viewport
       * registers, while the listener stays on whatever node it was attached to until
       * `_registerViewportEl()` moves it. Comparing the two is what detects the move.
       */
      _handleDelegationEl: null,
      /** Set in destroy(); read by the deferred install so a dead canvas never installs. */
      _handleDelegationTornDown: !1,
      // ── Viewport frame coalescing ─────────────────────────────────────────
      /**
       * The most recent viewport from d3-zoom, written synchronously on every
       * transform (event rate). Reactive `viewport` and all viewport side-effects
       * are flushed from here once per animation frame; synchronous pointer-path
       * math (drag, auto-pan, coordinate transforms) must read this, not the
       * frame-lagged reactive `viewport`.
       */
      _viewportLive: null,
      /** Pending requestAnimationFrame handle for the coalesced flush, or null. */
      _vpFrame: null,
      /** True when a user-driven move happened since the last flush (gates `viewport-move`). */
      _vpMoved: !1,
      _history: null,
      _announcer: null,
      _computeEngine: new Wh(),
      _computeDebounceTimer: null,
      _animationLocked: !1,
      _activeTimelines: /* @__PURE__ */ new Set(),
      _animationRegistry: /* @__PURE__ */ new Map(),
      _followHandle: null,
      _animator: null,
      /** Saved pre-collapse state per group node ID */
      _collapseState: /* @__PURE__ */ new Map(),
      /** Whether this canvas was hydrated from a pre-rendered static diagram */
      _hydratedFromStatic: !1,
      // ── Layout Dedup ─────────────────────────────────────────────────────
      _layoutDedup: null,
      // ── Shared ResizeObserver (A1) ────────────────────────────────────────
      _resizeObserver: null,
      // ── childLayout watcher cleanup fns (keyed by node id) ───────────────
      _childLayoutCleanups: /* @__PURE__ */ new Map(),
      // ── Shared Particle Loop ────────────────────────────────────────────
      _activeParticles: /* @__PURE__ */ new Set(),
      _particleEngineHandle: null,
      /** Live CSSStyleDeclaration for the container — cached to avoid per-particle getComputedStyle calls. */
      _containerStyles: null,
      // ── Color Mode ────────────────────────────────────────────────────
      _colorModeHandle: null,
      // ── Child Validation ─────────────────────────────────────────────
      _validationErrorCache: /* @__PURE__ */ new Map(),
      // ── Layout animation edge refresh ─────────────────────────────────
      /** Reactive tick bumped each frame during layout animation so edges re-measure DOM. */
      _layoutAnimTick: 0,
      _layoutAnimFrame: 0,
      // ── Shared obstacle cache (Workstream C) ─────────────────────────────
      /** Spatial index of node id → flow-space rect cells (committed geometry). Non-reactive: operate on it via `Alpine.raw(canvas._spatialGrid)` (raw the NESTED property — `Alpine.raw(canvas)` does NOT unwrap Alpine's merge-scope proxy; see flow-edge.ts). Also maintained for the viewport-culling overhaul (WS E), which will consume it — do not delete as dead code even though only WS C currently reads it. */
      _spatialGrid: new mf(),
      /** Obstacle rects rebuilt once per commit. In the edge effect read it via `Alpine.raw(canvas._obstacleSnapshot)` (nested-raw) so the edge does NOT subscribe to every node's reactive state. */
      _obstacleSnapshot: null,
      /** WS-2 endpoint-spread lanes; null until first computed. Mutated in place (see _obstacleSnapshot). */
      _endpointSpreadGrouping: null,
      /** WS-3 crossing-reduction lane offsets, edgeId → signed px; null until first computed. Mutated in place. */
      _crossingPlan: null,
      /** Reactive epoch bumped by _commitNodeGeometry (internal signal; edges must NOT subscribe to it). Reserved for the interaction-degradation/LOD workstream (WS D), which will consume it — do not delete as dead code even though only WS C currently reads it. */
      _obstacleEpoch: 0,
      /** REACTIVE Map edge id → tick. Edge effects read key-scoped `.get(edge.id)`; bumped by _markDirtyEdges. */
      _edgeDirtyTicks: /* @__PURE__ */ new Map(),
      /** PLAIN Map edge id → endpoint-bbox corridor {minX,minY,maxX,maxY}. Written by edges post-route; read via Alpine.raw. */
      _edgeCorridors: /* @__PURE__ */ new Map(),
      // ── Interaction degradation (Workstream D) ───────────────────────────
      /** REACTIVE Set of node ids currently being dragged. Edge effects read
       * key-scoped `.has(edge.source)` / `.has(edge.target)`, so ONLY edges
       * touching a dragged node re-run when the set changes. Populated in
       * flow-node `onDragStart` (incl. group-drag members), cleared on drag end.
       * Drives `avoidantSimplifyOnDrag` bezier degradation. */
      _draggingNodeIds: /* @__PURE__ */ new Set(),
      // ── Auto-Layout ──────────────────────────────────────────────────
      _autoLayoutTimer: null,
      _autoLayoutReady: !1,
      _autoLayoutFailed: !1,
      // ── Viewport Culling (CSS-only, outside Alpine reactive system) ────
      _nodeElements: /* @__PURE__ */ new Map(),
      _edgeSvgElements: /* @__PURE__ */ new Map(),
      _visibleNodeIds: /* @__PURE__ */ new Set(),
      /** PLAIN Set of edge ids currently culled (display:none). Used to gate display writes to visibility transitions only. */
      _culledEdgeIds: /* @__PURE__ */ new Set(),
      /** Whether `_applyCulling` was active on the previous call — used to detect threshold-crossing-down / config-off so `_uncullEverything` can restore display exactly once. */
      _cullingWasActive: !1,
      // ── Context Menu Auto-Populate ─────────────────────────────────────
      _contextMenuListeners: [],
      // ── Drop Zone ───────────────────────────────────────────────────────
      _onDropZoneDragOver: null,
      _onDropZoneDragleave: null,
      _onDropZoneDrop: null,
      // ── Event Dispatch ────────────────────────────────────────────────
      /**
       * Emit an event: debug log it, invoke the config callback, and
       * dispatch a DOM CustomEvent (flow-xxx) for Alpine @flow-xxx listeners.
       */
      _emit(s, a) {
        s !== "viewport-change" && s !== "viewport-move" && B("event", s, a);
        const l = "on" + s.split("-").map(
          (d) => d.charAt(0).toUpperCase() + d.slice(1)
        ).join(""), c = e[l];
        typeof c == "function" && c(a, this), this._container?.dispatchEvent(new CustomEvent(`flow-${s}`, {
          bubbles: !0,
          detail: a
        })), this._announcer?.handleEvent(s, a ?? {}), e.computeMode === "auto" && (s === "nodes-change" || s === "edges-change") && (this._computeDebounceTimer && clearTimeout(this._computeDebounceTimer), this._computeDebounceTimer = setTimeout(() => {
          this._computeDebounceTimer = null, this.compute();
        }, 16));
      },
      /** Route a warning through the onError callback (if set) and console.warn. */
      _warn(s, a) {
        typeof e.onError == "function" && e.onError(s, a), console.warn(`[AlpineFlow] ${a}`);
      },
      _emitSelectionChange() {
        this._emit("selection-change", {
          nodes: [...this.selectedNodes],
          edges: [...this.selectedEdges],
          rows: [...this.selectedRows]
        });
      },
      _rebuildNodeMap() {
        this._nodeMap = xa(this.nodes), $h(this._childrenIds, this.nodes);
      },
      _rebuildEdgeMap() {
        this._edgeMap = new Map(this.edges.map((s) => [s.id, s]));
      },
      /**
       * Rebuild the shared obstacle snapshot + SpatialGrid from committed node
       * geometry. Called imperatively at discrete geometry commit points (drag
       * end, resize, add/remove nodes, undo/redo, restore) — never inside a
       * reactive effect.
       *
       * `Alpine.raw(this)` does NOT unwrap Alpine's merge-scope proxy (it returns
       * the same proxy back), so reads go through the NESTED reactive property
       * instead — `Alpine.raw(this.nodes)` and `Alpine.raw(this._spatialGrid)` —
       * mirroring the precedent in flow-edge.ts's obstacle-rect computation.
       * The parent-lookup map is rebuilt from those raw nodes rather than reusing
       * `_nodeMap`, whose stored node values would still be reactive proxies even
       * once the Map container is raw. Rebuilds the grid from scratch each commit
       * (O(nodes); commit points are discrete user actions, not frames), which
       * also prunes entries for removed/hidden nodes.
       */
      _commitNodeGeometry(s) {
        const a = t.raw(this._obstacleSnapshot), l = a ? a.slice() : null, c = t.raw(this.nodes), d = new Map(c.map((m) => [m.id, m])), f = this._config?.nodeOrigin, u = t.raw(this._spatialGrid);
        u.clear();
        const h = [];
        for (const m of c) {
          const y = ct(m, d, f), x = {
            id: m.id,
            x: y.position.x,
            y: y.position.y,
            width: y.dimensions?.width ?? we,
            height: y.dimensions?.height ?? _e
          };
          u.insert(m.id, x.x, x.y, x.width, x.height), !m.hidden && h.push(x);
        }
        a ? (a.length = 0, a.push(...h)) : this._obstacleSnapshot = h, this._obstacleEpoch++, this._markDirtyEdges(s, l);
        const p = this._computeEndpointGrouping();
        p.size > 0 && this._markEdgesDirtyById(p);
        const g = this._computeCrossingPlan();
        g.size > 0 && this._markEdgesDirtyById(g);
      },
      /**
       * WS-2: assign each avoidant/orthogonal edge a lane index per shared
       * `(node, handleId)`, ordered by the opposite endpoint's position so the
       * fan-in doesn't self-cross. No-op (empty grouping) when spread is disabled
       * everywhere. Returns the set of edge ids whose lane/group membership
       * changed since the last run, so the caller can dirty exactly those. The
       * grouping Map is mutated in place (same reference) so reading it in the
       * edge effect doesn't re-run every edge — mirrors `_obstacleSnapshot`.
       */
      _computeEndpointGrouping() {
        const s = /* @__PURE__ */ new Set(), a = lo(this._config?.avoidantEndpointSpread), l = t.raw(this.nodes), c = new Map(l.map((x) => [x.id, x])), d = this._config?.nodeOrigin, f = (x) => {
          const C = c.get(x);
          if (!C) return 0;
          const b = ct(C, c, d);
          return b.position.y + (b.dimensions?.height ?? 0) / 2;
        }, u = (x) => {
          const C = c.get(x)?.endpointSpread;
          return C !== void 0 ? lo(C) !== null : a !== null;
        }, h = /* @__PURE__ */ new Map(), p = (x, C, b, E) => {
          if (!u(x)) return;
          const _ = `${x}|${C ?? ""}`;
          let S = h.get(_);
          S || (S = [], h.set(_, S)), S.push({ edgeId: b, sortKey: f(E) });
        }, g = t.raw(this.edges);
        for (const x of g) {
          const C = x.type ?? this._config?.defaultEdgeType;
          C !== "avoidant" && C !== "orthogonal" || (p(x.source, x.sourceHandle, x.id, x.target), p(x.target, x.targetHandle, x.id, x.source));
        }
        const m = t.raw(this._endpointSpreadGrouping), y = /* @__PURE__ */ new Map();
        for (const [x, C] of h) {
          C.sort((_, S) => _.sortKey - S.sortKey || (_.edgeId < S.edgeId ? -1 : 1));
          const b = /* @__PURE__ */ new Map();
          C.forEach((_, S) => b.set(_.edgeId, S)), y.set(x, { count: C.length, lanes: b });
          const E = m?.get(x);
          for (const [_, S] of b)
            (!E || E.count !== C.length || E.lanes.get(_) !== S) && s.add(_);
        }
        if (m) {
          for (const [x, C] of m)
            if (!y.has(x))
              for (const b of C.lanes.keys()) s.add(b);
        }
        if (m) {
          m.clear();
          for (const [x, C] of y) m.set(x, C);
        } else
          this._endpointSpreadGrouping = y;
        return s;
      },
      /**
       * WS-3: assign each avoidant/orthogonal edge a signed lane offset so edges
       * sharing a routing corridor separate into ordered lanes. Base-routes each
       * opted-in edge (cached findRoute) against the shared obstacle snapshot,
       * extracts its dominant interior run, groups runs into channels, orders each
       * group by endpoint barycenter, and centres signed offsets by channelGap.
       * No-op (empty plan) when the flag is off. Returns the edge ids whose offset
       * changed since the last run. Mutated in place (see _endpointSpreadGrouping).
       */
      _computeCrossingPlan() {
        const s = /* @__PURE__ */ new Set(), a = fh(this._config?.avoidantCrossingReduction), l = t.raw(this._crossingPlan), c = (C) => {
          const b = /* @__PURE__ */ new Set([...l?.keys() ?? [], ...C.keys()]);
          for (const E of b)
            (l?.get(E) ?? 0) !== (C.get(E) ?? 0) && s.add(E);
          if (l) {
            l.clear();
            for (const [E, _] of C) l.set(E, _);
          } else
            this._crossingPlan = C;
          return s;
        };
        if (a === null) return c(/* @__PURE__ */ new Map());
        const d = t.raw(this.nodes), f = new Map(d.map((C) => [C.id, C])), u = this._config?.nodeOrigin, h = t.raw(this._obstacleSnapshot) ?? [], p = (C) => {
          const b = f.get(C);
          if (!b) return { x: 0, y: 0 };
          const E = ct(b, f, u);
          return {
            x: E.position.x + (E.dimensions?.width ?? 0) / 2,
            y: E.position.y + (E.dimensions?.height ?? 0) / 2
          };
        }, g = t.raw(this.edges), m = [];
        for (const C of g) {
          const b = C.type ?? this._config?.defaultEdgeType;
          if (b !== "avoidant" && b !== "orthogonal") continue;
          const E = p(C.source), _ = p(C.target), S = Math.abs(_.x - E.x) >= Math.abs(_.y - E.y) ? _.x >= E.x ? "right" : "left" : _.y >= E.y ? "bottom" : "top", N = Math.abs(_.x - E.x) >= Math.abs(_.y - E.y) ? _.x >= E.x ? "left" : "right" : _.y >= E.y ? "top" : "bottom", R = h.filter((w) => w.id !== C.source && w.id !== C.target), M = Mi(E.x, E.y, S, _.x, _.y, N, R);
          if (!M) continue;
          const T = ma(M);
          if (!T) continue;
          const P = T.axis === "h" ? (E.y + _.y) / 2 : (E.x + _.x) / 2;
          m.push({ edgeId: C.id, run: T, bary: P });
        }
        m.sort((C, b) => C.edgeId < b.edgeId ? -1 : C.edgeId > b.edgeId ? 1 : 0);
        const y = Math.max(8, a * 2), x = /* @__PURE__ */ new Map();
        for (const C of gh(m, y))
          if (!(C.length < 2))
            for (const [b, E] of ph(C, a))
              E !== 0 && x.set(b, E);
        return c(x);
      },
      /**
       * Dirty exactly the edges whose ROUTE could have changed as a result of
       * `changedNodeIds` moving/resizing — instead of every avoidant/orthogonal
       * edge re-routing on every geometry commit.
       *
       * An edge is dirtied when either:
       *  - it directly touches a changed node (source or target), or
       *  - a changed node's rect (new OR old — see prevSnapshot) intersects
       *    that edge's last-recorded corridor, expanded by `CORRIDOR_MARGIN`.
       *    This mirrors `corridorObstacles()` in orthogonal.ts exactly: an
       *    obstacle outside endpoint-bbox±CORRIDOR_MARGIN is pruned by the
       *    router itself, so it provably cannot change that edge's route.
       *
       * Edges with no recorded corridor yet (never routed, or non-obstacle
       * edge types that never write one) are dirtied conservatively so routes
       * never go stale.
       *
       * `_edgeDirtyTicks` is bumped via `.set()` on the REACTIVE map (`this`,
       * not raw) so edge effects reading `_edgeDirtyTicks.get(edge.id)` are
       * notified; all other reads here go through nested-`Alpine.raw()` so
       * this method does not itself subscribe to node/edge state.
       */
      _markDirtyEdges(s, a) {
        const l = this._edgeDirtyTicks, c = t.raw(l), d = t.raw(this.edges), f = t.raw(this._edgeCorridors), u = t.raw(this._obstacleSnapshot), h = (m) => {
          l.set(m, (c.get(m) ?? 0) + 1);
        };
        if (!s || s.length === 0) {
          const m = /* @__PURE__ */ new Set();
          for (const y of d)
            m.add(y.id), h(y.id);
          for (const y of [...c.keys()])
            m.has(y) || c.delete(y);
          for (const y of [...f.keys()])
            m.has(y) || f.delete(y);
          return;
        }
        const p = new Set(s), g = [];
        for (const m of p) {
          const y = u?.find((C) => C.id === m);
          y && g.push(y);
          const x = a?.find((C) => C.id === m);
          x && g.push(x);
        }
        for (const m of d) {
          let y = p.has(m.source) || p.has(m.target);
          if (!y) {
            const x = f.get(m.id);
            if (x) {
              for (const C of g)
                if (C.x < x.maxX + wt && C.x + C.width > x.minX - wt && C.y < x.maxY + wt && C.y + C.height > x.minY - wt) {
                  y = !0;
                  break;
                }
            } else
              y = !0;
          }
          y && h(m.id);
        }
      },
      /**
       * Bump the routing dirty tick for a specific set of edge ids (WS-2 re-lane).
       * Reuses the SAME tick-bump `_markDirtyEdges` uses: `.set()` on the REACTIVE
       * Map so edge effects reading `_edgeDirtyTicks.get(edge.id)` are notified.
       */
      _markEdgesDirtyById(s) {
        const a = this._edgeDirtyTicks, l = t.raw(a);
        for (const c of s)
          a.set(c, (l.get(c) ?? 0) + 1);
      },
      /**
       * Hydrate from a pre-rendered static diagram.
       * Reads the render plan from data-flow-plan, populates node dimensions and
       * viewport from it, then strips the static markers so normal reactivity takes over.
       */
      _hydrateFromStatic() {
        const s = this._container.getAttribute("data-flow-plan");
        if (!s) return;
        let a;
        try {
          a = JSON.parse(s);
        } catch {
          return;
        }
        const l = /* @__PURE__ */ new Map();
        for (const c of a.nodes ?? [])
          l.set(c.id, { width: c.width, height: c.height });
        for (const c of this.nodes) {
          const d = l.get(c.id);
          d && !c.dimensions && (c.dimensions = { width: d.width, height: d.height }, this._initialDimensions.set(c.id, { ...d }));
        }
        a.viewport && (this.viewport.x = a.viewport.x, this.viewport.y = a.viewport.y, this.viewport.zoom = a.viewport.zoom), this._hydratedFromStatic = !0, this._container.removeAttribute("data-flow-static"), this._container.removeAttribute("data-flow-plan"), this._container.classList.remove("flow-static");
      },
      _captureHistory() {
        this._history?.capture({ nodes: this.nodes, edges: this.edges });
      },
      _snapshotHistory() {
        return this._history ? this._history.snapshot({ nodes: this.nodes, edges: this.edges }) : null;
      },
      _commitHistory(s) {
        s !== null && this._history?.commit(s);
      },
      _suspendHistory() {
        this._history?.suspend();
      },
      _resumeHistory() {
        this._history?.resume();
      },
      _applyBackground() {
        const s = this._container;
        if (!s) return;
        const a = this.backgroundStyle();
        a.backgroundImage !== this._lastBgImage && (s.style.backgroundImage = a.backgroundImage, this._lastBgImage = a.backgroundImage), s.style.backgroundSize = a.backgroundSize, s.style.backgroundPosition = a.backgroundPosition;
      },
      /**
       * d3-zoom transform handler. Runs on every wheel/pan event (120Hz+ on
       * trackpads). Only the transform write needs event-rate latency; the reactive
       * viewport write plus every side-effect (background, culling, zoom-level,
       * context-menu, events) is coalesced to a single flush per animation frame.
       */
      _onViewportTransform(s) {
        this._viewportLive = s, this._viewportEl && (this._viewportEl.style.transform = `translate(${s.x}px, ${s.y}px) scale(${s.zoom})`), this._vpFrame === null && (this._vpFrame = requestAnimationFrame(() => {
          this._vpFrame = null, this._flushViewportFrame();
        }));
      },
      /**
       * Apply the coalesced viewport state and its side-effects once per frame.
       * Reactive `viewport` is written here (not per event), so consumers watching
       * `viewport` re-run at frame rate rather than per wheel event.
       */
      _flushViewportFrame() {
        const s = this._viewportLive;
        s && (this.viewport.x = s.x, this.viewport.y = s.y, this.viewport.zoom = s.zoom, this._applyBackground(), this._applyCulling(), this._applyZoomLevel(s.zoom), this.contextMenu.show && this.closeContextMenu(), this._emit("viewport-change", { viewport: { ...s } }), this._vpMoved && (this._vpMoved = !1, this._emit("viewport-move", { viewport: { ...s } })));
      },
      /**
       * Gesture end (user released the wheel/pointer). Commit the end-state
       * synchronously so it is never a frame late, cancelling any pending frame.
       */
      _onViewportMoveEnd(s) {
        this._vpFrame !== null && (cancelAnimationFrame(this._vpFrame), this._vpFrame = null), this._flushViewportFrame(), this._emit("viewport-move-end", { viewport: { ...s } });
      },
      /**
       * Toggle CSS display on off-screen nodes and edges.
       * Called from _flushViewportFrame — entirely outside Alpine's reactive system.
       * Writes are gated to visibility TRANSITIONS only (comparing against the
       * previous frame's `_visibleNodeIds`/`_culledEdgeIds`) to avoid unconditional
       * per-frame style writes, which devtools amplifies into mutation-record churn.
       */
      _applyCulling() {
        const s = e.viewportCulling ?? "auto";
        if (!(s === !0 || s === "auto" && this.nodes.length >= (e.cullingAutoThreshold ?? 150))) {
          this._cullingWasActive && this._uncullEverything();
          return;
        }
        if (this._cullingWasActive = !0, !this._container) return;
        const l = this._container.clientWidth, c = this._container.clientHeight;
        if (l === 0 || c === 0) return;
        const d = e.cullingBuffer ?? 100, f = pf(this.viewport, l, c, d), h = t.raw(this._spatialGrid).query(f), p = this._draggingNodeIds, g = /* @__PURE__ */ new Set(), m = (C) => {
          const b = this._nodeMap.get(C);
          if (!b || b.hidden) return;
          const E = b.dimensions?.width ?? 150, _ = b.dimensions?.height ?? 50, S = b.parentId ? ri(b, this._nodeMap, this._config.nodeOrigin) : b.position;
          !(S.x + E < f.minX || S.x > f.maxX || S.y + _ < f.minY || S.y > f.maxY) && g.add(C);
        };
        for (const C of h) m(C);
        if (p)
          for (const C of p)
            h.has(C) || m(C);
        for (const [C, b] of this._nodeElements) {
          const E = g.has(C) ? "" : "none";
          b.style.display !== E && (b.style.display = E);
        }
        const y = this._culledEdgeIds, x = /* @__PURE__ */ new Set();
        for (const [C, b] of this._edgeSvgElements) {
          const E = this._edgeMap.get(C);
          if (!E) continue;
          const _ = this._nodeMap.get(E.source)?.hidden, S = this._nodeMap.get(E.target)?.hidden;
          if (E.hidden || E._hiddenByCollapse || _ || S)
            continue;
          const N = g.has(E.source) || g.has(E.target) || $p(this._edgeCorridors.get(C), f), R = !y.has(C);
          N !== R && (b.style.display = N ? "" : "none"), N || x.add(C);
        }
        this._visibleNodeIds = g, this._culledEdgeIds = x;
      },
      /**
       * Restore CSS display on every element culling could have hidden and
       * reset the tracking sets, so a future re-activation of `_applyCulling`
       * starts clean. Called when the `viewportCulling: 'auto'` gate
       * deactivates (node count drops back below `cullingAutoThreshold`) after
       * having been active, or when culling is otherwise turned off.
       */
      _uncullEverything() {
        for (const s of this._nodeElements.values()) s.style.display = "";
        for (const s of this._culledEdgeIds) {
          const a = this._edgeSvgElements.get(s);
          a && (a.style.display = "");
        }
        this._visibleNodeIds = /* @__PURE__ */ new Set(), this._culledEdgeIds = /* @__PURE__ */ new Set(), this._cullingWasActive = !1;
      },
      _getVisibleNodeIds() {
        return this._visibleNodeIds;
      },
      _applyZoomLevel(s) {
        if (e.zoomLevels === !1) return;
        const a = e.zoomLevels?.far ?? 0.4, l = e.zoomLevels?.medium ?? 0.75, c = s < a ? "far" : s < l ? "medium" : "close";
        c !== this._zoomLevel && (this._zoomLevel = c, this._container?.setAttribute("data-zoom-level", c));
      },
      getAbsolutePosition(s) {
        const a = this._nodeMap.get(s);
        return a ? ri(a, this._nodeMap, this._config.nodeOrigin) : { x: 0, y: 0 };
      },
      // ── Init Helpers ─────────────────────────────────────────────────
      /** Enable debug logging if configured. */
      _initDebug() {
        e.debug && Kr(!0);
      },
      /** Set up container element, attributes, CSS custom properties, animator. */
      _initContainer() {
        this._container = this.$el, this._container.setAttribute("data-flow-canvas", ""), e.fitViewOnInit && this._container.setAttribute("data-fit-view", ""), this._container.setAttribute("role", "application"), this._container.setAttribute("aria-label", e.ariaLabel ?? "Flow diagram"), this._containerStyles = getComputedStyle(this._container), this._animator = new Mf(io), e.patternColor && this._container.style.setProperty("--flow-bg-pattern-color", e.patternColor), e.backgroundGap && this._container.style.setProperty("--flow-bg-pattern-gap", String(e.backgroundGap));
        const s = e.containerHeight;
        if (s !== void 0 && s !== "auto") {
          let a = null;
          s === "fill" ? a = "100%" : typeof s == "number" && Number.isFinite(s) ? a = `${s}px` : typeof s == "string" && s.trim() && (a = s.trim()), a !== null && this._container.style.setProperty("--flow-container-height", a);
        }
        this._applyZoomLevel(this.viewport.zoom);
      },
      /** Create color mode handle if configured. */
      _initColorMode() {
        e.colorMode && (this._colorModeHandle = ka(this._container, e.colorMode));
      },
      /** Hydrate from static HTML, sort nodes, rebuild maps, capture initial dimensions. */
      _initHydration() {
        this._container.hasAttribute("data-flow-static") && this._hydrateFromStatic(), this.nodes = $t(this.nodes), this._rebuildNodeMap(), this._rebuildEdgeMap();
        for (const s of this.nodes)
          s.dimensions && this._initialDimensions.set(s.id, { ...s.dimensions });
      },
      /** Create FlowHistory if configured. */
      _initHistory() {
        e.history && (this._history = new _f(e.historyMaxSize ?? 50));
      },
      /** Create screen reader announcer. */
      _initAnnouncer() {
        if (e.announcements !== !1 && this._container) {
          const s = typeof e.announcements == "object" ? e.announcements.formatMessage : void 0;
          this._announcer = new Xh(this._container, s);
        }
      },
      /** Set up collaboration bridge via collab addon plugin. */
      _initCollab() {
        if (e.collab && this._container) {
          const s = zt("collab");
          if (!s) {
            console.error("[AlpineFlow] Collaboration requires the collab plugin. Register it with: Alpine.plugin(AlpineFlowCollab)");
            return;
          }
          const a = this._container, { Doc: l, Awareness: c, CollabBridge: d, CollabAwareness: f } = s, u = e.collab, h = new l(), p = new c(h), g = new d(h, this, u.provider), m = new f(p, u.user);
          if (He.set(a, { bridge: g, awareness: m, doc: h }), u.provider.connect(h, p), u.cursors !== !1) {
            let y = !1;
            const x = u.throttle ?? 20, C = (_) => {
              if (y) return;
              y = !0;
              const S = a.getBoundingClientRect(), N = this._viewportLive ?? this.viewport, R = (_.clientX - S.left - N.x) / N.zoom, M = (_.clientY - S.top - N.y) / N.zoom;
              m.updateCursor({ x: R, y: M }), setTimeout(() => {
                y = !1;
              }, x);
            }, b = () => {
              m.updateCursor(null);
            };
            a.addEventListener("mousemove", C), a.addEventListener("mouseleave", b);
            const E = He.get(a);
            E.cursorCleanup = () => {
              a.removeEventListener("mousemove", C), a.removeEventListener("mouseleave", b);
            };
          }
        }
      },
      /** Create panZoom instance, viewport element fallback, apply background, register with store, setup marker defs. */
      _initPanZoom() {
        if (B("init", `flowCanvas "${this._id}" initializing`, {
          nodes: this.nodes.map((s) => ({ id: s.id, type: s.type ?? "default", position: s.position, parentId: s.parentId })),
          edges: this.edges.map((s) => ({ id: s.id, source: s.source, target: s.target, type: s.type ?? "default" })),
          config: { minZoom: e.minZoom, maxZoom: e.maxZoom, pannable: e.pannable, zoomable: e.zoomable, debug: e.debug }
        }), this._panZoom = uf(this._container, {
          onTransformChange: (s) => {
            this._onViewportTransform(s);
          },
          onMoveStart: (s) => {
            this._emit("viewport-move-start", { viewport: { ...s } });
          },
          onMove: () => {
            this._vpMoved = !0;
          },
          onMoveEnd: (s) => {
            this._onViewportMoveEnd(s);
          },
          minZoom: e.minZoom,
          maxZoom: e.maxZoom,
          // `interactive: false` is the master overlay — it forces both axes off
          // at init regardless of the per-axis pannable/zoomable intent, which
          // toggleInteractive() restores later.
          pannable: e.interactive === !1 ? !1 : e.pannable,
          zoomable: e.interactive === !1 ? !1 : e.zoomable,
          translateExtent: e.translateExtent,
          isLocked: () => this._animationLocked,
          noPanClassName: e.noPanClassName ?? "nopan",
          noWheelClassName: e.noWheelClassName ?? "nowheel",
          zoomOnDoubleClick: e.zoomOnDoubleClick,
          dblClickZoomLevel: e.dblClickZoomLevel,
          panOnDrag: e.panOnDrag,
          panActivationKeyCode: e.panActivationKeyCode,
          zoomActivationKeyCode: e.zoomActivationKeyCode,
          isTouchSelectionMode: () => this._touchSelectionMode,
          panOnScroll: e.panOnScroll,
          panOnScrollDirection: e.panOnScrollDirection,
          panOnScrollSpeed: e.panOnScrollSpeed,
          onScrollPan: (s, a) => {
            this.panBy(s, a);
          }
        }), e.viewport) {
          const s = {
            x: e.viewport.x ?? 0,
            y: e.viewport.y ?? 0,
            zoom: e.viewport.zoom ?? 1
          };
          this.viewport.x = s.x, this.viewport.y = s.y, this.viewport.zoom = s.zoom, this._panZoom.setViewport(s);
        }
        this.$nextTick(() => {
          if (this._viewportEl || (this._viewportEl = this._container?.querySelector(".flow-viewport")), this._viewportEl) {
            const s = this.viewport;
            this._viewportEl.style.transform = `translate(${s.x}px, ${s.y}px) scale(${s.zoom})`;
          }
        }), this._bgGapCache = null, this._schemaMetrics = null, this._applyBackground(), this.$store.flow.register(this._id, this), this._onContainerPointerDown = () => {
          this.$store.flow.activate(this._id);
        }, this._container.addEventListener("pointerdown", this._onContainerPointerDown), Object.keys(this.$store.flow.instances).length === 1 && this.$store.flow.activate(this._id), this._setupMarkerDefs();
      },
      /**
       * Install the ONE delegated `pointerdown` listener that starts the connect /
       * reconnect gesture for every handle on this canvas — instead of one listener
       * per handle, of which a large schema graph has thousands.
       *
       * Attached on `.flow-viewport` in the CAPTURE phase. That placement is
       * load-bearing (it is what keeps a handle press from also dragging the node
       * or reordering a schema row, while still yielding to an active whiteboard
       * tool) — the reasoning is in `../handle-delegation.ts`.
       */
      _initHandleDelegation() {
        this._config?.delegatedHandleEvents !== !1 && this.$nextTick(() => {
          if (this._handleDelegationTornDown) return;
          const s = this._viewportEl ?? this._container?.querySelector(".flow-viewport");
          !s && this._container && B("init", `flowCanvas "${this._id}" has no .flow-viewport — delegating handle pointerdown on the container instead; an active whiteboard tool may not suppress handle presses`);
          const a = s ?? this._container;
          a && (this._handleDelegationCleanup = bs(a, this), this._handleDelegationEl = a);
        });
      },
      /**
       * Register the `.flow-viewport` element with the canvas. Called by the
       * `x-flow-viewport` directive every time it initialises — which includes a RE-init
       * on a DIFFERENT element, if the viewport node is ever replaced wholesale rather
       * than patched in place after the canvas mounted.
       *
       * INVARIANT (load-bearing): while the delegated handle listener is installed, it
       * is bound to exactly one element, and that element MUST be the current viewport.
       * Break it and the listener is left on a detached node while handles render inside
       * the new one — so every handle in the canvas goes permanently inert. That failure
       * is silent and total, and delegation removed the safety net that used to cover it:
       * pre-delegation each handle re-attached its own listener on every re-stamp, so a
       * swapped viewport repaired itself. Hence: if delegation is already installed on a
       * different element, move it to the new one.
       *
       * A canvas that never installed (delegation off via `delegatedHandleEvents: false`,
       * or the deferred install has not run yet) has a null `_handleDelegationEl` and
       * falls out at the first guard — this only ever MOVES an existing listener, it
       * never creates one that `_initHandleDelegation` decided against.
       */
      _registerViewportEl(s) {
        this._viewportEl = s;
        const a = this._handleDelegationEl;
        !a || a === s || (this._handleDelegationCleanup?.(), this._handleDelegationCleanup = null, this._handleDelegationEl = null, !this._handleDelegationTornDown && (this._handleDelegationCleanup = bs(s, this), this._handleDelegationEl = s, B("init", `flowCanvas "${this._id}" re-bound its delegated handle pointerdown listener to a replaced .flow-viewport`)));
      },
      /** Canvas click handler, context menu handler, long press, touch selection mode, context menu event listeners. */
      _initClickHandlers() {
        this._onCanvasClick = (l) => {
          if (this._suppressNextCanvasClick) {
            this._suppressNextCanvasClick = !1;
            return;
          }
          this.pendingConnection && (this._emit("connect-end", {
            connection: null,
            source: this.pendingConnection.source,
            sourceHandle: this.pendingConnection.sourceHandle,
            position: this.screenToFlowPosition(l.clientX, l.clientY)
          }), this.pendingConnection = null, this._container?.classList.remove("flow-connecting"), this._container && Le(this._container));
          const c = l.target;
          if (c === this._container || c.classList.contains("flow-viewport")) {
            const d = this.screenToFlowPosition(l.clientX, l.clientY);
            this._emit("pane-click", { event: l, position: d }), this.deselectAll();
          }
        }, this._container.addEventListener("click", this._onCanvasClick), this._onCanvasContextMenu = (l) => {
          const c = l.target;
          if (c === this._container || c.classList.contains("flow-viewport"))
            if (l.preventDefault(), this.selectedNodes.size > 1) {
              const d = this.nodes.filter((f) => this.selectedNodes.has(f.id));
              this._emit("selection-context-menu", { nodes: d, event: l });
            } else {
              const d = this.screenToFlowPosition(l.clientX, l.clientY);
              this._emit("pane-context-menu", { event: l, position: d });
            }
        }, this._container.addEventListener("contextmenu", this._onCanvasContextMenu);
        const s = e.longPressAction ?? "context-menu";
        if (s && (this._longPressCleanup = uh(
          this._container,
          (l) => {
            const c = l.target;
            if (s === "context-menu") {
              const d = c.closest("[data-flow-node-id]");
              if (d) {
                const u = d.getAttribute("data-flow-node-id"), h = this._nodeMap.get(u);
                if (h) {
                  this._emit("node-context-menu", { node: h, event: l });
                  return;
                }
              }
              const f = c.closest(".flow-edge-svg");
              if (f) {
                const u = f.getAttribute("data-edge-id"), h = u ? this._edgeMap.get(u) : void 0;
                if (h) {
                  this._emit("edge-context-menu", { edge: h, event: l });
                  return;
                }
              }
              if (this.selectedNodes.size > 1) {
                const u = this.nodes.filter((h) => this.selectedNodes.has(h.id));
                this._emit("selection-context-menu", { nodes: u, event: l });
              } else {
                const u = this.screenToFlowPosition(l.clientX, l.clientY);
                this._emit("pane-context-menu", { event: l, position: u });
              }
            } else if (s === "select") {
              const d = c.closest("[data-flow-node-id]");
              if (d) {
                const f = d.getAttribute("data-flow-node-id");
                this.selectedNodes.has(f) ? this.selectedNodes.delete(f) : this.selectedNodes.add(f);
              }
            }
          },
          { duration: e.longPressDuration ?? 500 }
        )), e.touchSelectionMode !== !1) {
          let l = 0, c = 0;
          const d = (g) => {
            g.pointerType === "touch" && (c++, c === 2 && Date.now() - l < 300 && (this._touchSelectionMode = !this._touchSelectionMode, this._container?.classList.toggle("flow-touch-selection-mode", this._touchSelectionMode)), l = Date.now());
          }, f = (g) => {
            g.pointerType === "touch" && (c = Math.max(0, c - 1), c === 0 && (l = 0));
          }, u = this._container;
          if (!u) return;
          u.addEventListener("pointerdown", d), u.addEventListener("pointerup", f), u.addEventListener("pointercancel", f);
          const h = () => {
            document.hidden && (c = 0);
          };
          document.addEventListener("visibilitychange", h);
          const p = document.createElement("div");
          p.className = "flow-touch-selection-mode-indicator", p.textContent = "Selection Mode — tap with two fingers to exit", u.appendChild(p), this._touchSelectionCleanup = () => {
            u.removeEventListener("pointerdown", d), u.removeEventListener("pointerup", f), u.removeEventListener("pointercancel", f), document.removeEventListener("visibilitychange", h), p.remove();
          };
        }
        const a = [
          { event: "flow-node-context-menu", handler: ((l) => {
            Object.assign(this.contextMenu, { show: !0, type: "node", x: l.detail.event.clientX, y: l.detail.event.clientY, node: l.detail.node, edge: null, position: null, nodes: null, event: l.detail.event });
          }) },
          { event: "flow-edge-context-menu", handler: ((l) => {
            Object.assign(this.contextMenu, { show: !0, type: "edge", x: l.detail.event.clientX, y: l.detail.event.clientY, node: null, edge: l.detail.edge, position: null, nodes: null, event: l.detail.event });
          }) },
          { event: "flow-pane-context-menu", handler: ((l) => {
            Object.assign(this.contextMenu, { show: !0, type: "pane", x: l.detail.event.clientX, y: l.detail.event.clientY, node: null, edge: null, position: l.detail.position, nodes: null, event: l.detail.event });
          }) },
          { event: "flow-selection-context-menu", handler: ((l) => {
            Object.assign(this.contextMenu, { show: !0, type: "selection", x: l.detail.event.clientX, y: l.detail.event.clientY, node: null, edge: null, position: null, nodes: l.detail.nodes, event: l.detail.event });
          }) }
        ];
        for (const l of a)
          this._container.addEventListener(l.event, l.handler);
        this._contextMenuListeners = a;
      },
      /** Keyboard shortcut handler (delete, arrows, undo/redo, copy/paste/cut, selection tool toggle, escape). */
      _initKeyboard() {
        this._onKeyDown = (s) => {
          if (!this._active || this._animationLocked) return;
          const a = dh(s.target), l = this._shortcuts;
          if (Je(s.key, l.escape) && this.contextMenu.show) {
            this.closeContextMenu();
            return;
          }
          if (Je(s.key, l.escape) && this.pendingConnection) {
            this._emit("connect-end", {
              connection: null,
              source: this.pendingConnection.source,
              sourceHandle: this.pendingConnection.sourceHandle,
              position: { x: 0, y: 0 }
            }), this.pendingConnection = null, this._container?.classList.remove("flow-connecting"), this._container && Le(this._container);
            return;
          }
          if (Je(s.key, l.delete)) {
            if (a) return;
            this._deleteSelected();
          }
          if (Je(s.key, this._shortcuts.selectionToolToggle) && !s.ctrlKey && !s.metaKey) {
            if (a) return;
            this._selectionTool = this._selectionTool === "box" ? "lasso" : "box";
            return;
          }
          if (Je(s.key, l.moveNodes)) {
            if (a || this._config?.disableKeyboardA11y || this.selectedNodes.size === 0) return;
            s.preventDefault();
            const c = bt(s, l.moveStepModifier) ? l.moveStep * l.moveStepMultiplier : l.moveStep;
            let d = 0, f = 0;
            switch (s.key) {
              case "ArrowUp":
                f = -c;
                break;
              case "ArrowDown":
                f = c;
                break;
              case "ArrowLeft":
                d = -c;
                break;
              case "ArrowRight":
                d = c;
                break;
              default: {
                const u = Array.isArray(l.moveNodes) ? l.moveNodes : [l.moveNodes], h = s.key.length === 1 ? s.key.toLowerCase() : s.key, p = u.findIndex((g) => (g.length === 1 ? g.toLowerCase() : g) === h);
                p === 0 ? f = -c : p === 1 ? f = c : p === 2 ? d = -c : p === 3 && (d = c);
              }
            }
            ch(s.repeat, this.selectedNodes.size, d, f) && this._captureHistory();
            for (const u of this.selectedNodes) {
              const h = this.getNode(u);
              if (h && la(h)) {
                h.position.x += d, h.position.y += f;
                const p = this._container ? He.get(this._container) : void 0;
                p?.bridge && p.bridge.pushLocalNodeUpdate(h.id, { position: h.position });
              }
            }
          }
          if ((s.ctrlKey || s.metaKey) && !s.shiftKey && Je(s.key, l.undo)) {
            if (a) return;
            s.preventDefault(), this.undo();
          }
          if ((s.ctrlKey || s.metaKey) && s.shiftKey && Je(s.key, l.redo)) {
            if (a) return;
            s.preventDefault(), this.redo();
          }
          if ((s.ctrlKey || s.metaKey) && !s.shiftKey) {
            if (a) return;
            Je(s.key, l.copy) ? (s.preventDefault(), this.copy()) : Je(s.key, l.paste) ? (s.preventDefault(), this.paste()) : Je(s.key, l.cut) && (s.preventDefault(), this.cut());
          }
        }, document.addEventListener("keydown", this._onKeyDown);
      },
      /** Create minimap if configured. */
      _initMinimap() {
        e.minimap && (this._minimap = Tf(this._container, {
          getState: () => ({
            nodes: co(this.nodes, this._nodeMap, this._config.nodeOrigin),
            viewport: this.viewport,
            containerWidth: this._container?.clientWidth ?? 0,
            containerHeight: this._container?.clientHeight ?? 0
          }),
          getViewportState: () => ({
            viewport: this.viewport,
            containerWidth: this._container?.clientWidth ?? 0,
            containerHeight: this._container?.clientHeight ?? 0
          }),
          setViewport: (s) => this._panZoom?.setViewport(s),
          config: e
        }), this._minimap.render(), this.$watch("nodes", () => this._minimap?.render()), this.$watch("viewport", () => this._minimap?.updateViewport()));
      },
      /** Create controls panel if configured. */
      _initControls() {
        if (e.controls) {
          const s = e.controlsContainer ? document.querySelector(e.controlsContainer) ?? this._container : this._container, a = s !== this._container;
          this._controls = Ff(s, {
            position: e.controlsPosition ?? "bottom-left",
            orientation: e.controlsOrientation ?? "vertical",
            external: a,
            showZoom: e.controlsShowZoom ?? !0,
            showFitView: e.controlsShowFitView ?? !0,
            showInteractive: e.controlsShowInteractive ?? !0,
            showResetPanels: e.controlsShowResetPanels ?? !1,
            onZoomIn: () => this.zoomIn(),
            onZoomOut: () => this.zoomOut(),
            onFitView: () => this.fitView({ padding: ni }),
            onToggleInteractive: () => this.toggleInteractive(),
            onResetPanels: () => this.resetPanels(),
            onToggleFullscreen: () => this.toggleFullscreen()
          }), this.$watch("isInteractive", (l) => {
            this._controls?.update({ isInteractive: l });
          }), this.$watch("isFullscreen", (l) => {
            this._controls?.update({ isFullscreen: l });
          });
        }
      },
      /**
       * Wire a document-level `fullscreenchange` listener so the reactive
       * `isFullscreen` flag stays accurate when the user exits via Escape
       * or any out-of-band means. Safe no-op when the Fullscreen API is
       * unavailable (e.g., restricted iframes).
       */
      _initFullscreen() {
        typeof document > "u" || !("fullscreenEnabled" in document) || (this._onFullscreenChange = () => {
          const s = this._fullscreenTarget ?? this._container, a = document.fullscreenElement === s;
          a !== this.isFullscreen && (this.isFullscreen = a, this._container?.dispatchEvent(new CustomEvent("flow-fullscreen-change", {
            bubbles: !0,
            detail: { isFullscreen: a }
          }))), a || (this._fullscreenTarget = null);
        }, document.addEventListener("fullscreenchange", this._onFullscreenChange));
      },
      /**
       * Resolve which element should enter fullscreen. Honors the optional
       * `fullscreenTarget` config (string selector / HTMLElement / function)
       * and falls back to the canvas container.
       */
      _resolveFullscreenTarget() {
        if (!this._container) return null;
        const s = this._config?.fullscreenTarget;
        if (!s) return this._container;
        if (typeof s == "string") {
          const a = this._container.closest(s);
          if (a) return a;
          const l = document.querySelector(s);
          return l || (console.warn(`[AlpineFlow] fullscreenTarget selector "${s}" did not match; falling back to canvas container.`), this._container);
        }
        if (s instanceof HTMLElement) return s;
        if (typeof s == "function")
          try {
            const a = s(this._container);
            if (a instanceof HTMLElement) return a;
          } catch (a) {
            console.warn("[AlpineFlow] fullscreenTarget resolver threw:", a);
          }
        return this._container;
      },
      /**
       * Toggle fullscreen on the canvas container (or the configured
       * `fullscreenTarget`). Requests fullscreen when not active, exits when
       * active. Warns and no-ops if the browser doesn't expose
       * `requestFullscreen` (e.g., restricted iframes).
       */
      toggleFullscreen() {
        if (!this._container || typeof document > "u") return;
        const s = this._resolveFullscreenTarget();
        if (!s) return;
        if (document.fullscreenElement) {
          document.exitFullscreen?.();
          return;
        }
        const a = s.requestFullscreen;
        if (typeof a != "function") {
          console.warn("[AlpineFlow] requestFullscreen is not available in this context");
          return;
        }
        this._fullscreenTarget = s, Promise.resolve(a.call(s)).catch((l) => {
          console.warn("[AlpineFlow] fullscreen request rejected:", l), this._fullscreenTarget = null;
        });
      },
      /** Selection box/lasso setup (pointerdown/pointermove/pointerup handlers). */
      _initSelection() {
        this._selectionBox = Of(this._container), this._lasso = zf(this._container), this._selectionTool = e.selectionTool ?? "box", this._onSelectionPointerDown = (s) => {
          if (!this._config.selectionOnDrag && !this._touchSelectionMode && !bt(s, this._shortcuts.selectionBox))
            return;
          const a = s.target;
          if (a !== this._container && !a.classList.contains("flow-viewport"))
            return;
          s.stopPropagation(), s.preventDefault(), this._selectionShiftHeld = !0;
          const l = this._config.selectionMode ?? "partial", c = bt(s, this._shortcuts.selectionModeToggle);
          if (this._selectionEffectiveMode = c ? l === "partial" ? "full" : "partial" : l, !this._container) return;
          const d = this._container.getBoundingClientRect(), f = s.clientX - d.left, u = s.clientY - d.top;
          this._selectionTool === "lasso" ? this._lasso.start(f, u, this._selectionEffectiveMode) : this._selectionBox.start(f, u, this._selectionEffectiveMode), s.target.setPointerCapture(s.pointerId);
        }, this._onSelectionPointerMove = (s) => {
          if (!(this._selectionTool === "lasso" ? this._lasso?.isActive() : this._selectionBox?.isActive()) || !this._container) return;
          const l = this._container.getBoundingClientRect(), c = s.clientX - l.left, d = s.clientY - l.top;
          this._selectionTool === "lasso" ? this._lasso.update(c, d) : this._selectionBox.update(c, d);
        }, this._onSelectionPointerUp = (s) => {
          if (!(this._selectionTool === "lasso" ? this._lasso?.isActive() : this._selectionBox?.isActive())) return;
          s.target.releasePointerCapture(s.pointerId), this._suppressNextCanvasClick = !0;
          const l = co(this.nodes, this._nodeMap, this._config.nodeOrigin);
          let c, d = [];
          if (this._selectionTool === "lasso") {
            const f = this._lasso.end(this.viewport);
            if (!f) return;
            const u = this._selectionEffectiveMode === "full" ? Yf(l, f) : qf(l, f), h = new Set(u.map((p) => p.id));
            if (c = this.nodes.filter((p) => h.has(p.id)), this._config.lassoSelectsEdges)
              for (const p of this.edges) {
                if (p.hidden) continue;
                const g = this._container?.querySelector(
                  `[data-flow-edge-id="${CSS.escape(p.id)}"] path`
                );
                if (!g) continue;
                const m = g.getTotalLength(), y = Math.max(10, Math.ceil(m / 20));
                let x = 0;
                for (let b = 0; b <= y; b++) {
                  const E = g.getPointAtLength(b / y * m);
                  Li(E.x, E.y, f) && x++;
                }
                (this._selectionEffectiveMode === "full" ? x === y + 1 : x > 0) && d.push(p.id);
              }
          } else {
            const f = this._selectionBox.end(this.viewport);
            if (!f) return;
            const u = this._selectionEffectiveMode === "full" ? gf(l, f, this._config.nodeOrigin) : hf(l, f, this._config.nodeOrigin), h = new Set(u.map((p) => p.id));
            c = this.nodes.filter((p) => h.has(p.id));
          }
          this._selectionShiftHeld || this.deselectAll();
          for (const f of c) {
            if (!si(f) || f.hidden) continue;
            f.selected = !0, this.selectedNodes.add(f.id);
            const u = this._container?.querySelector(`[data-flow-node-id="${CSS.escape(f.id)}"]`);
            u && u.classList.add("flow-node-selected");
          }
          for (const f of d) {
            const u = this.getEdge(f);
            u && (u.selected = !0, this.selectedEdges.add(u.id));
          }
          (c.length > 0 || d.length > 0) && this._emitSelectionChange(), this._selectionShiftHeld = !1;
        }, this._container.addEventListener("pointerdown", this._onSelectionPointerDown), this._container.addEventListener("pointermove", this._onSelectionPointerMove), this._container.addEventListener("pointerup", this._onSelectionPointerUp);
      },
      /** Drop zone drag/drop handlers if onDrop configured. */
      _initDropZone() {
        if (e.onDrop) {
          const s = e.dropMimeTypes ?? ["application/alpineflow"], a = (l, c) => {
            const d = document.elementsFromPoint(l, c);
            for (const f of d) {
              const u = f.closest?.("[data-flow-node-id]");
              if (!u)
                continue;
              const h = u.getAttribute("data-flow-node-id");
              if (!h)
                continue;
              const p = this._nodeMap.get(h);
              if (p)
                return p;
            }
            return null;
          };
          this._onDropZoneDragOver = (l) => {
            !l.dataTransfer || Qs(l.target) || !s.some((d) => l.dataTransfer.types.includes(d)) || (l.preventDefault(), l.dataTransfer.dropEffect = "move", this._container?.classList.add("flow-canvas-drag-over"));
          }, this._onDropZoneDragleave = (l) => {
            if (!this._container)
              return;
            const c = l.relatedTarget;
            c && this._container.contains(c) || this._container.classList.remove("flow-canvas-drag-over");
          }, this._onDropZoneDrop = (l) => {
            if (l.preventDefault(), this._container?.classList.remove("flow-canvas-drag-over"), Qs(l.target) || !l.dataTransfer || !e.onDrop)
              return;
            let c = null, d = null;
            for (const g of s) {
              const m = l.dataTransfer.getData(g);
              if (m) {
                c = g, d = m;
                break;
              }
            }
            if (!c || !d)
              return;
            let f;
            try {
              f = JSON.parse(d);
            } catch {
              f = d;
            }
            if (!this._container)
              return;
            const u = Gr(
              l.clientX,
              l.clientY,
              this.viewport,
              this._container.getBoundingClientRect()
            ), h = a(l.clientX, l.clientY), p = e.onDrop({ data: f, position: u, targetNode: h, mimeType: c }, this);
            p && this.addNodes(p, { center: !0, source: "drop" });
          }, this._container.addEventListener("dragover", this._onDropZoneDragOver), this._container.addEventListener("dragleave", this._onDropZoneDragleave), this._container.addEventListener("drop", this._onDropZoneDrop);
        }
      },
      /**
       * Return the deepest FlowNode under the given client coordinates.
       * Uses document.elementsFromPoint and walks inward to find the first
       * element carrying a data-flow-node-id attribute.
       *
       * Useful for context menus, tooltips, and custom pointer interactions
       * beyond the built-in drop zone.
       */
      getNodeAtPoint(s, a) {
        const l = document.elementsFromPoint(s, a);
        for (const c of l) {
          const d = c.closest?.("[data-flow-node-id]");
          if (!d)
            continue;
          const f = d.getAttribute("data-flow-node-id");
          if (!f)
            continue;
          const u = this._nodeMap.get(f);
          if (u)
            return u;
        }
        return null;
      },
      /**
       * Install per-property Alpine watchers on a container node's childLayout.
       *
       * Watches the six layout-affecting properties explicitly so that any
       * mutation — direct assignment or via wire-bridge — triggers a re-layout
       * through the existing safeLayoutChildren dedup (at most one call per
       * parent per frame). Unwatched props (e.g. custom user data on childLayout)
       * never cause spurious layouts.
       *
       * Uses Alpine.watch(getter, callback) — the same low-level primitive that
       * $watch delegates to — because $watch only accepts string expressions
       * evaluated in component scope, which can't address per-node sub-objects.
       */
      _installChildLayoutWatchers(s) {
        if (!s.childLayout) return;
        this._uninstallChildLayoutWatchers(s.id);
        const a = [
          "columns",
          "gap",
          "padding",
          "headerHeight",
          "direction",
          "stretch"
        ], l = s.id, c = [];
        for (const d of a) {
          const f = t.watch(
            () => s.childLayout?.[d],
            () => {
              this._layoutDedup?.safeLayoutChildren(l);
            }
          );
          c.push(f);
        }
        this._childLayoutCleanups.set(l, c);
      },
      _uninstallChildLayoutWatchers(s) {
        const a = this._childLayoutCleanups.get(s);
        if (a) {
          for (const l of a) l();
          this._childLayoutCleanups.delete(s);
        }
      },
      /** Create the shared ResizeObserver instance (A1). Called from _initChildLayout. */
      _resizeObserverInit() {
        typeof ResizeObserver > "u" || (this._resizeObserver = new ResizeObserver((s) => {
          const a = /* @__PURE__ */ new Set();
          for (const l of s) {
            const c = l.target, d = c.getAttribute("data-flow-node-id");
            if (!d) continue;
            const f = this._nodeMap.get(d);
            if (!f) continue;
            const u = l.borderBoxSize?.[0], h = u ? u.inlineSize : c.offsetWidth, p = u ? u.blockSize : c.offsetHeight;
            if (h === 0 && p === 0 || c.offsetParent === null && c.tagName !== "BODY" || f.fixedDimensions === !0) continue;
            const g = Math.round(h), m = Math.round(p), y = f.dimensions;
            if (y && Math.abs((y.width ?? 0) - g) < 1 && Math.abs((y.height ?? 0) - m) < 1)
              continue;
            const x = rg(
              { width: g, height: m },
              f.minDimensions,
              f.maxDimensions
            );
            f.dimensions = x, a.add(d), f.parentId && this._layoutDedup?.safeLayoutChildren(f.parentId);
          }
          a.size > 0 && this._commitNodeGeometry([...a]);
        }));
      },
      /** Run initial child layouts for all layout parents. */
      _initChildLayout() {
        if (this._layoutDedup = ig((s) => {
          this.layoutChildren(s);
        }), this._resizeObserverInit(), this.$wire) {
          const s = this.$wire;
          e.wireEvents && tg(e, s, e.wireEvents);
          const a = ng(this, s), l = Zh(this, s);
          this._wireCleanup = () => {
            a(), l();
          }, B("init", `wire bridge activated for "${this._id}"`);
        }
        B("init", `flowCanvas "${this._id}" ready`), this._emit("init"), this._recomputeChildValidation();
        for (const s of this.nodes)
          s.childLayout && this._installChildLayoutWatchers(s);
        for (const s of this.nodes)
          s.childLayout && !s.parentId && this.layoutChildren(s.id);
        for (const s of this.nodes)
          s.childLayout && s.parentId && (this._nodeMap.get(s.parentId)?.childLayout || this.layoutChildren(s.id));
        e.fitViewOnInit && requestAnimationFrame(() => {
          this.fitView();
        }), this._commitNodeGeometry();
      },
      /** Call setup(canvas) on any addon that provides it. */
      _initAddons() {
        for (const [, s] of La().entries())
          s && typeof s == "object" && typeof s.setup == "function" && s.setup(this);
      },
      /** Validate auto-layout dependency and start initial layout. */
      _initAutoLayout() {
        if (e.autoLayout) {
          const s = e.autoLayout.algorithm, a = {
            dagre: "layout:dagre",
            force: "layout:force",
            hierarchy: "layout:hierarchy",
            elk: "layout:elk"
          }, l = {
            dagre: "AlpineFlowDagre",
            force: "AlpineFlowForce",
            hierarchy: "AlpineFlowHierarchy",
            elk: "AlpineFlowElk"
          }, c = a[s];
          c && zt(c) ? (this._autoLayoutReady = !0, this.$nextTick(() => this._runAutoLayout())) : c && this._warn("AUTO_LAYOUT_MISSING_DEP", `autoLayout requires the ${s} plugin. Register it with: Alpine.plugin(${l[s]})`);
        }
      },
      /** requestAnimationFrame ready flip, loading watch, loading overlay injection. */
      _initReady() {
        const s = e.fitViewOnInit ? 2 : 1;
        let a = 0;
        const l = () => {
          if (a++, a < s) {
            requestAnimationFrame(l);
            return;
          }
          this.$nextTick(() => {
            this.ready = !0;
          });
        };
        if (requestAnimationFrame(l), this.$watch("isLoading", (c) => {
          this._container && (this._container.classList.toggle("flow-loading", c), this._container.classList.toggle("flow-ready", !c), !c && this._autoLoadingOverlay && (this._autoLoadingOverlay.remove(), this._autoLoadingOverlay = null));
        }), this._container && this._container.classList.add("flow-loading"), e.loading && this._container && !this._container.querySelector("[data-flow-loading-directive]")) {
          const c = document.createElement("div");
          c.className = "flow-loading-overlay";
          const d = document.createElement("div");
          d.className = "flow-loading-indicator";
          const f = document.createElement("div");
          f.className = "flow-loading-indicator-node";
          const u = document.createElement("div");
          u.className = "flow-loading-indicator-text", u.textContent = this._loadingText, d.appendChild(f), d.appendChild(u), c.appendChild(d), this._container.appendChild(c), this._autoLoadingOverlay = c;
        }
      },
      // ── Lifecycle ─────────────────────────────────────────────────────
      init() {
        o = this, this._initDebug(), this._initContainer(), this._initColorMode(), this._initHydration(), this._initHistory(), this._initAnnouncer(), this._initCollab(), this._initPanZoom(), this._initHandleDelegation(), this._initClickHandlers(), this._initKeyboard(), this._initMinimap(), this._initFullscreen(), this._initControls(), this._initSelection(), this._initChildLayout(), this._initAddons(), this._initDropZone(), this._initAutoLayout(), this._initReady();
      },
      _setupMarkerDefs() {
        const s = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        s.style.cssText = "position:absolute;width:0;height:0;overflow:hidden;";
        const a = document.createElementNS("http://www.w3.org/2000/svg", "defs");
        s.appendChild(a), this._container?.appendChild(s), this._markerDefsEl = s, this._updateMarkerDefs(), this.$watch("edges", () => {
          this._updateMarkerDefs();
        });
      },
      _updateMarkerDefs() {
        if (!this._markerDefsEl) return;
        const s = this._markerDefsEl.querySelector("defs"), a = /* @__PURE__ */ new Map();
        for (const d of this.edges)
          for (const f of [d.markerStart, d.markerEnd]) {
            if (!f) continue;
            const u = Yt(f), h = Xt(u, this._id);
            a.has(h) || a.set(h, ro(u, h));
          }
        const l = s.querySelectorAll("marker"), c = /* @__PURE__ */ new Set();
        l.forEach((d) => {
          a.has(d.id) ? c.add(d.id) : d.remove();
        });
        for (const [d, f] of a)
          if (!c.has(d)) {
            const h = new DOMParser().parseFromString(
              `<svg xmlns="http://www.w3.org/2000/svg">${f}</svg>`,
              "image/svg+xml"
            ).querySelector("marker");
            h && s.appendChild(document.importNode(h, !0));
          }
      },
      destroy() {
        this._destroyAnimations?.(), this._wireCleanup?.(), this._wireCleanup = null, this._handleDelegationTornDown = !0, this._handleDelegationCleanup?.(), this._handleDelegationCleanup = null, this._handleDelegationEl = null, this._longPressCleanup?.(), this._longPressCleanup = null, this._touchSelectionCleanup?.(), this._touchSelectionCleanup = null;
        try {
          this._emit("destroy");
        } catch (s) {
          console.error(
            `[AlpineFlow] a destroy callback threw while destroying flowCanvas "${this._id}"; teardown continued`,
            s
          );
        }
        if (B("destroy", `flowCanvas "${this._id}" destroying`), this._onCanvasClick && this._container && this._container.removeEventListener("click", this._onCanvasClick), this._onCanvasContextMenu && this._container && this._container.removeEventListener("contextmenu", this._onCanvasContextMenu), this._container)
          for (const s of this._contextMenuListeners)
            this._container.removeEventListener(s.event, s.handler);
        if (this._contextMenuListeners = [], this._onKeyDown && document.removeEventListener("keydown", this._onKeyDown), this._onContainerPointerDown && this._container && this._container.removeEventListener("pointerdown", this._onContainerPointerDown), this._markerDefsEl?.remove(), this._markerDefsEl = null, this._minimap?.destroy(), this._minimap = null, this._controls?.destroy(), this._controls = null, this._onFullscreenChange && typeof document < "u" && document.removeEventListener("fullscreenchange", this._onFullscreenChange), this._onFullscreenChange = null, typeof document < "u") {
          const s = document.fullscreenElement;
          s && (s === this._container || s === this._fullscreenTarget) && document.exitFullscreen?.().catch(() => {
          });
        }
        if (this._fullscreenTarget = null, this._onSelectionPointerDown && this._container && this._container.removeEventListener("pointerdown", this._onSelectionPointerDown), this._onSelectionPointerMove && this._container && this._container.removeEventListener("pointermove", this._onSelectionPointerMove), this._onSelectionPointerUp && this._container && this._container.removeEventListener("pointerup", this._onSelectionPointerUp), this._selectionBox?.destroy(), this._selectionBox = null, this._lasso?.destroy(), this._lasso = null, this._viewportEl = null, this._container && (this._container.removeEventListener("dragover", this._onDropZoneDragOver), this._container.removeEventListener("dragleave", this._onDropZoneDragleave), this._container.removeEventListener("drop", this._onDropZoneDrop)), this._followHandle?.stop(), this._followHandle = null, this._animator = null, this._layoutAnimFrame && (cancelAnimationFrame(this._layoutAnimFrame), this._layoutAnimFrame = 0), this._autoLayoutTimer && (clearTimeout(this._autoLayoutTimer), this._autoLayoutTimer = null), this._colorModeHandle && (this._colorModeHandle.destroy(), this._colorModeHandle = null), this._container) {
          const s = He.get(this._container);
          s && (s.bridge.destroy(), s.awareness.destroy(), s.cursorCleanup && s.cursorCleanup(), He.delete(this._container));
        }
        this._container && this._container.removeAttribute("data-flow-canvas"), this.$store.flow.unregister(this._id), this._vpFrame !== null && (cancelAnimationFrame(this._vpFrame), this._vpFrame = null), this._panZoom?.destroy(), this._panZoom = null, this._announcer?.destroy(), this._announcer = null, this._computeDebounceTimer && (clearTimeout(this._computeDebounceTimer), this._computeDebounceTimer = null);
        for (const s of [...this._childLayoutCleanups.keys()])
          this._uninstallChildLayoutWatchers(s);
        this._resizeObserver?.disconnect(), this._resizeObserver = null, this._layoutDedup?.dispose(), this._layoutDedup = null;
      },
      // ── Remaining Flat Methods ────────────────────────────────────────
      /**
       * Set a node's rotation angle in degrees.
       */
      rotateNode(s, a) {
        const l = this.nodes.find((c) => c.id === s);
        l && (this._captureHistory(), l.rotation = a);
      },
      /** Set the user-controlled loading state. */
      setLoading(s) {
        this._userLoading = s;
      },
      /** Update runtime config options. */
      patchConfig(s) {
        this._applyConfigPatch(s);
      },
      /**
       * WS-3: toggle/tune crossing reduction at runtime and re-route immediately.
       * Mutates the live config then forces a geometry recommit so the crossing
       * plan is recomputed and affected edges re-route without waiting for a node
       * move. `value`: `boolean | { channelGap?: number }`.
       */
      setCrossingReduction(s) {
        this._config && (this._config.avoidantCrossingReduction = s, this._commitNodeGeometry());
      },
      // ── Context Menu ──────────────────────────────────────────────────
      closeContextMenu() {
        this.contextMenu.show = !1, this.contextMenu.type = null, this.contextMenu.node = null, this.contextMenu.edge = null, this.contextMenu.position = null, this.contextMenu.nodes = null, this.contextMenu.event = null;
      },
      /**
       * Batch multiple canvas mutations so that layout reconciliation runs once
       * after the whole block rather than once per mutation. Nested calls join
       * the outermost batch. fn's return value is forwarded; layout still runs
       * even if fn throws.
       */
      batch(s) {
        return this._layoutDedup ? sg(this._layoutDedup)(s) : s();
      },
      get collab() {
        return this._container ? He.get(this._container)?.awareness : void 0;
      },
      async toImage(s) {
        let a;
        try {
          ({ captureFlowImage: a } = await Promise.resolve().then(() => by));
        } catch {
          throw new Error("toImage() requires html-to-image. Install it with: npm install html-to-image");
        }
        return a(
          this._container,
          this._viewportEl,
          this.nodes,
          this.viewport,
          s
        );
      }
    };
    let o = n;
    const i = new Proxy(/* @__PURE__ */ Object.create(null), {
      get(s, a) {
        return o[a];
      },
      set(s, a, l) {
        return o[a] = l, !0;
      }
    }), r = [
      dg(i),
      ug(i),
      fg(i),
      mg(i),
      wg(i),
      jg(i),
      Zg(i),
      Kg(i),
      Jg(i),
      ap(i),
      lp(i),
      cp(i),
      Pp(i, t),
      Np(i)
    ];
    for (const s of r)
      Object.defineProperties(n, Object.getOwnPropertyDescriptors(s));
    return n.registerMarker = (s, a) => {
      Pf(s, a);
    }, n;
  });
}
function er(t, e) {
  return {
    x: e[0] * Math.round(t.x / e[0]),
    y: e[1] * Math.round(t.y / e[1])
  };
}
function Rp(t, e, n) {
  const { onDragStart: o, onDrag: i, onDragEnd: r, getViewport: s, getNodePosition: a, snapToGrid: l = !1, filterSelector: c, container: d, isLocked: f, noDragClassName: u, dragThreshold: h = 0 } = n;
  let p = { x: 0, y: 0 };
  function g(x) {
    const C = s();
    return {
      x: (x.x - C.x) / C.zoom,
      y: (x.y - C.y) / C.zoom
    };
  }
  const m = We(t), y = zc().subject(() => {
    const x = s(), C = a();
    return {
      x: C.x * x.zoom + x.x,
      y: C.y * x.zoom + x.y
    };
  }).on("start", (x) => {
    p = g(x), o?.({ nodeId: e, position: p, sourceEvent: x.sourceEvent });
  }).on("drag", (x) => {
    let C = g(x);
    l && (C = er(C, l));
    const b = {
      x: C.x - p.x,
      y: C.y - p.y
    };
    i?.({ nodeId: e, position: C, delta: b, sourceEvent: x.sourceEvent });
  }).on("end", (x) => {
    let C = g(x);
    l && (C = er(C, l)), r?.({ nodeId: e, position: C, sourceEvent: x.sourceEvent });
  });
  return d && y.container(() => d), h > 0 && y.clickDistance(h), y.filter((x) => {
    if (f?.() || u && x.target?.closest?.("." + u)) return !1;
    if (c) {
      const C = t.querySelector(c);
      return C ? C.contains(x.target) : !0;
    }
    return !0;
  }), m.call(y), {
    destroy() {
      m.on(".drag", null);
    }
  };
}
function Hp(t, e) {
  const n = en(t, e);
  return {
    id: t.id,
    x: n.x,
    y: n.y,
    width: t.dimensions?.width ?? we,
    height: t.dimensions?.height ?? _e
  };
}
function Fp(t, e, n) {
  const o = /* @__PURE__ */ new Set(), i = /* @__PURE__ */ new Set();
  let r = 0, s = 0, a = 1 / 0, l = 1 / 0;
  const c = t.x + t.width / 2, d = t.y + t.height / 2, f = t.x + t.width, u = t.y + t.height;
  for (const h of e) {
    const p = h.x + h.width / 2, g = h.y + h.height / 2, m = h.x + h.width, y = h.y + h.height, x = [
      [t.x, h.x],
      // left-left
      [f, m],
      // right-right
      [c, p],
      // center-center
      [t.x, m],
      // left-right
      [f, h.x]
      // right-left
    ];
    for (const [b, E] of x) {
      const _ = E - b;
      Math.abs(_) <= n && (i.add(E), Math.abs(_) < Math.abs(a) && (a = _, r = _));
    }
    const C = [
      [t.y, h.y],
      // top-top
      [u, y],
      // bottom-bottom
      [d, g],
      // center-center
      [t.y, y],
      // top-bottom
      [u, h.y]
      // bottom-top
    ];
    for (const [b, E] of C) {
      const _ = E - b;
      Math.abs(_) <= n && (o.add(E), Math.abs(_) < Math.abs(l) && (l = _, s = _));
    }
  }
  return {
    horizontal: [...o],
    vertical: [...i],
    snapOffset: { x: r, y: s }
  };
}
function Op(t, e, n, o) {
  return Math.abs(t.x - e.x) > 30 ? t.x < e.x ? { source: n, target: o } : { source: o, target: n } : t.y < e.y ? { source: n, target: o } : { source: o, target: n };
}
function zp(t, e, n, o) {
  let i = null, r = o;
  for (const s of n) {
    if (s.id === t) continue;
    const a = Math.sqrt(
      (e.x - s.center.x) ** 2 + (e.y - s.center.y) ** 2
    );
    if (a < r) {
      r = a;
      const { source: l, target: c } = Op(e, s.center, t, s.id);
      i = { source: l, target: c, targetId: s.id, distance: a, targetCenter: s.center };
    }
  }
  return i;
}
const Vp = /* @__PURE__ */ new Set(["x-data", "x-init", "x-bind", "href", "src", "action", "formaction", "srcdoc"]);
let Bp = 0;
function tr(t, e, n) {
  e && n !== null && t._commitHistory?.(n);
}
function zo(t, e, n) {
  t._suspendHistory?.();
  try {
    t.reparentNode?.(e, n);
  } finally {
    t._resumeHistory?.();
  }
}
function qp(t, e) {
  return t.key !== "Enter" && t.key !== " " ? !1 : t.target === e;
}
function Yp(t, e) {
  switch (e) {
    case "alt":
      return t.altKey;
    case "meta":
      return t.metaKey;
    case "shift":
      return t.shiftKey;
  }
}
function Xp(t, e, n) {
  const o = t.querySelectorAll('[data-flow-handle-type="source"]');
  if (o.length === 0) return null;
  let i = null, r = 1 / 0;
  return o.forEach((s) => {
    const a = s, l = a.getBoundingClientRect();
    if (l.width === 0 && l.height === 0) return;
    const c = l.left + l.width / 2, d = l.top + l.height / 2, f = Math.sqrt((e - c) ** 2 + (n - d) ** 2);
    f < r && (r = f, i = a);
  }), i;
}
function Wp(t, e, n) {
  let o = 1 / 0, i = -1 / 0, r = 1 / 0, s = -1 / 0;
  for (const c of n)
    o = Math.min(o, c.x), i = Math.max(i, c.x + c.width), r = Math.min(r, c.y), s = Math.max(s, c.y + c.height);
  const a = 50, l = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  l.style.cssText = "position:absolute;top:0;left:0;width:1px;height:1px;overflow:visible;pointer-events:none;z-index:500;";
  for (const c of t) {
    const d = document.createElementNS("http://www.w3.org/2000/svg", "line");
    d.setAttribute("x1", String(o - a)), d.setAttribute("y1", String(c)), d.setAttribute("x2", String(i + a)), d.setAttribute("y2", String(c)), d.classList.add("flow-guide-path"), l.appendChild(d);
  }
  for (const c of e) {
    const d = document.createElementNS("http://www.w3.org/2000/svg", "line");
    d.setAttribute("x1", String(c)), d.setAttribute("y1", String(r - a)), d.setAttribute("x2", String(c)), d.setAttribute("y2", String(s + a)), d.classList.add("flow-guide-path"), l.appendChild(d);
  }
  return l;
}
function jp(t) {
  t.directive(
    "flow-node",
    (e, { expression: n }, { evaluate: o, effect: i, cleanup: r }) => {
      let s = null, a = !1, l = null, c = !1, d = null, f = null, u = null, h = null, p = null, g = null, m = !1, y = -1, x = null, C = !1, b = [], E = "", _ = [], S = null;
      i(() => {
        if (!e.isConnected) return;
        const P = o(n);
        if (!P || P.hidden) return;
        const w = t.$data(e.closest("[x-data]"));
        if (!w?.viewport) return;
        const v = P.parentId ? w.getAbsolutePosition(P.id) : P.position ?? { x: 0, y: 0 }, $ = P.nodeOrigin ?? w._config?.nodeOrigin ?? [0, 0], L = P.dimensions?.width ?? 150, D = P.dimensions?.height ?? 40;
        e.style.left = v.x - L * $[0] + "px", e.style.top = v.y - D * $[1] + "px";
      }), i(() => {
        if (!e.isConnected) return;
        const P = o(n);
        if (!P) return;
        if (e.dataset.flowNodeId = P.id, P.type && (e.dataset.flowNodeType = P.type), !C) {
          const H = e.closest("[x-data]"), q = H ? t.$data(H) : null;
          let X = !1;
          if (q?._config?.nodeTypes) {
            const K = P.type ?? "default", F = q._config.nodeTypes[K] ?? q._config.nodeTypes.default;
            if (typeof F == "string") {
              const J = document.querySelector(F);
              J?.content && (e.appendChild(J.content.cloneNode(!0)), X = !0);
            } else typeof F == "function" && (F(P, e), X = !0);
          }
          if (!X && e.children.length === 0) {
            const K = document.createElement("div");
            K.setAttribute("x-flow-handle:target", "");
            const F = document.createElement("span");
            F.setAttribute("x-text", "node.data.label");
            const J = document.createElement("div");
            J.setAttribute("x-flow-handle:source", ""), e.appendChild(K), e.appendChild(F), e.appendChild(J), X = !0;
          }
          if (X)
            for (const K of Array.from(e.children))
              t.addScopeToNode(K, { node: P }), t.initTree(K);
          C = !0;
        }
        if (P.hidden) {
          e.classList.add("flow-node-hidden"), e.removeAttribute("tabindex"), e.removeAttribute("role"), e.removeAttribute("aria-label"), s?.destroy(), s = null;
          return;
        }
        e.classList.remove("flow-node-hidden"), S !== P.id && (s?.destroy(), s = null, S = P.id);
        const w = t.$data(e.closest("[x-data]"));
        if (!w?.viewport) return;
        if (e.classList.add("flow-node", "nopan"), P.type === "group" ? e.classList.add("flow-node-group") : e.classList.remove("flow-node-group"), P.dimensions) {
          const H = P.childLayout, q = P.fixedDimensions, X = (w._childrenIds?.get(P.id)?.length ?? 0) > 0;
          e.style.width = P.dimensions.width + "px", H || q || X ? e.style.height = P.dimensions.height + "px" : e.style.height = "";
        }
        w.selectedNodes.has(P.id) ? e.classList.add("flow-node-selected") : e.classList.remove("flow-node-selected"), e.setAttribute("aria-selected", String(!!P.selected)), P._validationErrors && P._validationErrors.length > 0 ? e.classList.add("flow-node-invalid") : e.classList.remove("flow-node-invalid");
        const v = ["flow-node-running", "flow-node-completed", "flow-node-failed", "flow-node-skipped"], $ = P.runState;
        for (const H of v)
          e.classList.remove(H);
        $ && $ !== "pending" && e.classList.add(`flow-node-${$}`);
        for (const H of b)
          e.classList.remove(H);
        const L = P.class ? P.class.split(/\s+/).filter(Boolean) : [];
        for (const H of L)
          e.classList.add(H);
        b = L;
        const D = P.shape ? `flow-node-${P.shape}` : "";
        E !== D && (E && e.classList.remove(E), D && e.classList.add(D), E = D);
        const z = e.closest("[data-flow-canvas]"), V = z ? t.$data(z) : null, I = P.shape && V?._shapeRegistry?.[P.shape];
        if (I?.clipPath ? e.style.clipPath = I.clipPath : e.style.clipPath = "", P.style) {
          const H = typeof P.style == "string" ? Object.fromEntries(P.style.split(";").filter(Boolean).map((X) => X.split(":").map((K) => K.trim()))) : P.style, q = [];
          for (const [X, K] of Object.entries(H))
            X && K && (e.style.setProperty(X, K), q.push(X));
          for (const X of _)
            q.includes(X) || e.style.removeProperty(X);
          _ = q;
        } else if (_.length > 0) {
          for (const H of _)
            e.style.removeProperty(H);
          _ = [];
        }
        if (P.rotation ? (e.style.transform = `rotate(${P.rotation}deg)`, e.style.transformOrigin = "center") : e.style.transform = "", P.focusable ?? w._config?.nodesFocusable !== !1 ? (e.setAttribute("tabindex", "0"), e.setAttribute("role", P.ariaRole ?? "group"), e.setAttribute("aria-label", P.ariaLabel ?? (P.data?.label ? `Node: ${P.data.label}` : `Node ${P.id}`))) : (e.removeAttribute("tabindex"), e.removeAttribute("role"), e.removeAttribute("aria-label")), P.domAttributes)
          for (const [H, q] of Object.entries(P.domAttributes))
            H.startsWith("on") || Vp.has(H.toLowerCase()) || e.setAttribute(H, q);
        Ye(P) ? e.classList.remove("flow-node-no-connect") : e.classList.add("flow-node-no-connect"), P.collapsed ? e.classList.add("flow-node-collapsed") : e.classList.remove("flow-node-collapsed");
        const A = e.classList.contains("flow-node-condensed");
        P.condensed ? e.classList.add("flow-node-condensed") : e.classList.remove("flow-node-condensed"), !!P.condensed !== A && requestAnimationFrame(() => {
          P.dimensions = {
            width: e.offsetWidth,
            height: e.offsetHeight
          }, B("condense", `Node "${P.id}" re-measured after condense toggle`, P.dimensions);
        }), P.filtered ? e.classList.add("flow-node-filtered") : e.classList.remove("flow-node-filtered");
        const O = P.handles ?? "visible";
        e.classList.remove("flow-handles-hidden", "flow-handles-hover", "flow-handles-select"), O !== "visible" && e.classList.add(`flow-handles-${O}`);
        let j = Ea(P, w._nodeMap);
        w._config?.elevateNodesOnSelect !== !1 && w.selectedNodes.has(P.id) && (j += P.type === "group" ? Math.max(1 - j, 0) : 1e3), m && (j += 1e3);
        const G = P.type === "group" ? 0 : 2;
        if (j !== G ? e.style.zIndex = String(j) : e.style.removeProperty("z-index"), !la(P)) {
          e.classList.add("flow-node-locked"), s?.destroy(), s = null;
          return;
        }
        e.classList.remove("flow-node-locked"), e.querySelector("[data-flow-drag-handle]") ? e.classList.add("flow-node-has-handle") : e.classList.remove("flow-node-has-handle");
        const Z = e.closest(".flow-container");
        s || (s = Rp(e, P.id, {
          container: Z ?? void 0,
          filterSelector: "[data-flow-drag-handle]",
          isLocked: () => w._animationLocked,
          noDragClassName: w._config?.noDragClassName ?? "nodrag",
          dragThreshold: w._config?.nodeDragThreshold ?? 0,
          getViewport: () => w.viewport,
          getNodePosition: () => {
            const H = w.getNode(P.id);
            return H ? H.parentId ? w.getAbsolutePosition(H.id) : { x: H.position.x, y: H.position.y } : { x: 0, y: 0 };
          },
          snapToGrid: w._config?.snapToGrid ?? !1,
          onDragStart({ nodeId: H, position: q, sourceEvent: X }) {
            e.classList.add("flow-node-dragging"), a = !1, c = !1, d = null;
            const K = w._container ? He.get(w._container) : void 0;
            K?.bridge && K.bridge.setDragging(H, !0), h?.destroy(), h = null, p = null, g && Z && Z.querySelector(`[data-flow-node-id="${CSS.escape(g)}"]`)?.classList.remove("flow-node-drop-target"), g = null, l = w._snapshotHistory?.() ?? null, B("drag", `Node "${H}" drag start`, q);
            const F = w.getNode(H);
            if (F) {
              if (w._config?.selectNodesOnDrag !== !1 && F.selectable !== !1 && !w.selectedNodes.has(H) && (bt(X, w._shortcuts?.multiSelect) || w.deselectAll(), w.selectedNodes.add(H), F.selected = !0, w._emitSelectionChange(), c = !0), w._emit("node-drag-start", { node: F }), w.selectedNodes.has(H) && w.selectedNodes.size > 1) {
                const J = xt(H, w.nodes);
                d = /* @__PURE__ */ new Map();
                for (const ee of w.selectedNodes) {
                  if (ee === H || J.has(ee))
                    continue;
                  const W = w.getNode(ee);
                  W && W.draggable !== !1 && d.set(ee, { x: W.position.x, y: W.position.y });
                }
              }
              if (w._draggingNodeIds.add(H), d)
                for (const J of d.keys())
                  w._draggingNodeIds.add(J);
            }
            w._config?.autoPanOnNodeDrag !== !1 && Z && (f = da({
              container: Z,
              speed: w._config?.autoPanSpeed ?? 15,
              onPan(J, ee) {
                const W = () => w._viewportLive ?? w.viewport, re = W().zoom || 1, se = { x: W().x, y: W().y };
                w._panZoom?.setViewport({
                  x: W().x - J,
                  y: W().y - ee,
                  zoom: re
                });
                const ie = se.x - W().x, te = se.y - W().y, ne = ie === 0 && te === 0, me = w.getNode(H);
                let fe = !1;
                if (me) {
                  const ae = me.position.x, oe = me.position.y;
                  me.position.x += ie / re, me.position.y += te / re;
                  const pe = Bn(me.position, me, w._config?.nodeExtent);
                  me.position.x = pe.x, me.position.y = pe.y, fe = me.position.x === ae && me.position.y === oe;
                }
                if (d)
                  for (const [ae] of d) {
                    const oe = w.getNode(ae);
                    if (oe) {
                      oe.position.x += ie / re, oe.position.y += te / re;
                      const pe = Bn(oe.position, oe, w._config?.nodeExtent);
                      oe.position.x = pe.x, oe.position.y = pe.y;
                    }
                  }
                return ne && fe;
              }
            }), X instanceof MouseEvent && f.updatePointer(X.clientX, X.clientY), f.start());
          },
          onDrag({ nodeId: H, position: q, delta: X, sourceEvent: K }) {
            a = !0;
            const F = w.getNode(H);
            if (F) {
              if (F.parentId) {
                const W = w.getAbsolutePosition(F.parentId);
                let re = q.x - W.x, se = q.y - W.y;
                const ie = F.dimensions ?? { width: 150, height: 50 }, te = w.getNode(F.parentId);
                if (te?.childLayout) {
                  m || (e.classList.add("flow-reorder-dragging"), x = F.parentId), m = !0;
                  const ne = F.extent !== "parent";
                  if (F.position.x = q.x - W.x, F.position.y = q.y - W.y, !ne && te.dimensions) {
                    const ae = $o({ x: F.position.x, y: F.position.y }, ie, te.dimensions);
                    F.position.x = ae.x, F.position.y = ae.y;
                  }
                  const me = F.dimensions?.width ?? 150, fe = F.dimensions?.height ?? 50;
                  if (ne) {
                    const ae = te.dimensions?.width ?? 150, oe = te.dimensions?.height ?? 50, pe = F.position.x + me / 2, ye = F.position.y + fe / 2, be = 12, Pe = x === F.parentId ? 0 : be, ze = pe >= Pe && pe <= ae - Pe && ye >= Pe && ye <= oe - Pe, Se = /* @__PURE__ */ new Set();
                    let he = F.parentId;
                    for (; he; )
                      Se.add(he), he = w.getNode(he)?.parentId;
                    const Ee = q.x + me / 2, Ie = q.y + fe / 2, Y = xt(F.id, w.nodes);
                    let le = null;
                    const ge = w.nodes.filter(
                      (ce) => ce.id !== F.id && (ce.droppable || ce.childLayout) && !ce.hidden && !Y.has(ce.id) && (ze ? !Se.has(ce.id) : ce.id !== F.parentId) && (!ce.acceptsDrop || ce.acceptsDrop(F))
                    );
                    for (const ce of ge) {
                      const ue = ce.parentId ? w.getAbsolutePosition(ce.id) : ce.position, xe = ce.dimensions?.width ?? 150, ke = ce.dimensions?.height ?? 50, Ne = ce.id === g ? 0 : be;
                      Ee >= ue.x + Ne && Ee <= ue.x + xe - Ne && Ie >= ue.y + Ne && Ie <= ue.y + ke - Ne && (le = ce);
                    }
                    const de = le?.id ?? null;
                    if (de !== g) {
                      g && Z && Z.querySelector(`[data-flow-node-id="${CSS.escape(g)}"]`)?.classList.remove("flow-node-drop-target"), de && Z && Z.querySelector(`[data-flow-node-id="${CSS.escape(de)}"]`)?.classList.add("flow-node-drop-target"), g = de;
                      const ce = de ? w.getNode(de) : null, ue = x;
                      if (ce?.childLayout && de !== x) {
                        ue && (w.layoutChildren(ue, { omitFromComputation: H, shallow: !0 }), w.propagateLayoutUp(ue, { omitFromComputation: H })), x = de;
                        const xe = w.nodes.filter((De) => De.parentId === de && De.id !== H).sort((De, Xe) => (De.order ?? 1 / 0) - (Xe.order ?? 1 / 0)), ke = xe.length, Ne = [...xe];
                        Ne.splice(ke, 0, F);
                        for (let De = 0; De < Ne.length; De++)
                          Ne[De].order = De;
                        y = ke;
                        const Me = w._initialDimensions?.get(H), Ve = { ...F, dimensions: Me ? { ...Me } : void 0 };
                        w.layoutChildren(de, { excludeId: H, includeNode: Ve, shallow: !0 }), w.propagateLayoutUp(de, { includeNode: Ve });
                      } else ze && x !== F.parentId ? (ue && ue !== F.parentId && (w.layoutChildren(ue, { omitFromComputation: H, shallow: !0 }), w.propagateLayoutUp(ue, { omitFromComputation: H })), x = F.parentId, y = -1) : !de && !ze && (ue && (w.layoutChildren(ue, { omitFromComputation: H, shallow: !0 }), w.propagateLayoutUp(ue, { omitFromComputation: H })), x = null, y = -1);
                    }
                  }
                  if (x) {
                    const ae = w.getNode(x), oe = ae?.childLayout ?? te.childLayout, pe = w.nodes.filter((he) => he.parentId === x && he.id !== H).sort((he, Ee) => (he.order ?? 1 / 0) - (Ee.order ?? 1 / 0));
                    let ye, be;
                    if (x !== F.parentId) {
                      const he = ae?.parentId ? w.getAbsolutePosition(x) : ae?.position ?? { x: 0, y: 0 };
                      ye = q.x - he.x, be = q.y - he.y;
                    } else
                      ye = F.position.x, be = F.position.y;
                    const Pe = oe.swapThreshold ?? 0.5;
                    if (y === -1)
                      if (x === F.parentId) {
                        const he = F.order ?? 0;
                        y = pe.filter((Ee) => (Ee.order ?? 0) < he).length;
                      } else
                        y = pe.length;
                    const ze = y;
                    let Se = pe.length;
                    for (let he = 0; he < pe.length; he++) {
                      const Ee = pe[he], Ie = Ee.dimensions?.width ?? 150, Y = Ee.dimensions?.height ?? 50, le = he < ze ? 1 - Pe : Pe, ge = Ee.position.y + Y * le, de = Ee.position.x + Ie * le;
                      if (oe.direction === "grid") {
                        const ce = {
                          x: ye + me / 2,
                          y: be + fe / 2
                        }, ue = Ee.position.y + Y / 2;
                        if (ce.y < Ee.position.y) {
                          Se = he;
                          break;
                        }
                        if (Math.abs(ce.y - ue) < Y / 2 && ce.x < de) {
                          Se = he;
                          break;
                        }
                      } else if (oe.direction === "vertical") {
                        if ((he < ze ? be : be + fe) < ge) {
                          Se = he;
                          break;
                        }
                      } else if ((he < ze ? ye : ye + me) < de) {
                        Se = he;
                        break;
                      }
                    }
                    if (Se !== y) {
                      y = Se;
                      const he = [...pe];
                      he.splice(Se, 0, F);
                      for (let ge = 0; ge < he.length; ge++)
                        he[ge].order = ge;
                      e.closest(".flow-container")?.classList.add("flow-layout-animating"), w._layoutAnimFrame && cancelAnimationFrame(w._layoutAnimFrame);
                      const Ie = F.id, Y = x, le = Y !== F.parentId;
                      w._layoutAnimFrame = requestAnimationFrame(() => {
                        if (le && Y) {
                          const ue = w.getNode(Ie);
                          let xe;
                          if (ue) {
                            const ke = w._initialDimensions?.get(Ie);
                            xe = { ...ue, dimensions: ke ? { ...ke } : void 0 };
                          }
                          w.layoutChildren(Y, {
                            excludeId: Ie,
                            includeNode: xe,
                            shallow: !0
                          }), w.propagateLayoutUp(Y, {
                            includeNode: xe
                          });
                        } else
                          w.layoutChildren(Y, Ie, !0);
                        const ge = performance.now(), de = 300, ce = () => {
                          w._layoutAnimTick++, performance.now() - ge < de ? w._layoutAnimFrame = requestAnimationFrame(ce) : w._layoutAnimFrame = 0;
                        };
                        w._layoutAnimFrame = requestAnimationFrame(ce);
                      });
                    }
                  }
                  f && K instanceof MouseEvent && f.updatePointer(K.clientX, K.clientY);
                  return;
                }
                if (F.extent === "parent" && te?.dimensions) {
                  const ne = $o(
                    { x: re, y: se },
                    ie,
                    te.dimensions
                  );
                  re = ne.x, se = ne.y;
                } else if (Array.isArray(F.extent)) {
                  const ne = Ca({ x: re, y: se }, F.extent, ie);
                  re = ne.x, se = ne.y;
                }
                if ((!F.extent || F.extent !== "parent") && (mn(
                  te,
                  w._config?.childValidationRules ?? {}
                )?.preventChildEscape || !!te?.childLayout) && te?.dimensions) {
                  const fe = $o(
                    { x: re, y: se },
                    ie,
                    te.dimensions
                  );
                  re = fe.x, se = fe.y;
                }
                if (F.expandParent && te?.dimensions) {
                  const ne = Ih(
                    { x: re, y: se },
                    ie,
                    te.dimensions
                  );
                  ne && (te.dimensions.width = ne.width, te.dimensions.height = ne.height);
                }
                F.position.x = re, F.position.y = se;
              } else {
                const W = Bn(q, F, w._config?.nodeExtent);
                F.position.x = W.x, F.position.y = W.y;
              }
              if (w._config?.snapToGrid) {
                const W = F.nodeOrigin ?? w._config?.nodeOrigin ?? [0, 0], re = F.dimensions?.width ?? 150, se = F.dimensions?.height ?? 40, ie = F.parentId ? w.getAbsolutePosition(F.id) : F.position;
                e.style.left = ie.x - re * W[0] + "px", e.style.top = ie.y - se * W[1] + "px", w._layoutAnimTick++;
              }
              if (w._emit("node-drag", { node: F, position: q }), d)
                for (const [W, re] of d) {
                  const se = w.getNode(W);
                  if (se) {
                    let ie = re.x + X.x, te = re.y + X.y;
                    const ne = Bn({ x: ie, y: te }, se, w._config?.nodeExtent);
                    se.position.x = ne.x, se.position.y = ne.y;
                  }
                }
              const ee = w._config?.helperLines;
              if (ee) {
                const W = typeof ee == "object" ? ee.snap ?? !0 : !0, re = typeof ee == "object" ? ee.threshold ?? 5 : 5, se = (ae) => {
                  const oe = ae.parentId ? w.getAbsolutePosition(ae.id) : ae.position;
                  return Hp({ ...ae, position: oe }, w._config?.nodeOrigin);
                }, te = (w.selectedNodes.size > 1 && w.selectedNodes.has(H) ? w.nodes.filter((ae) => w.selectedNodes.has(ae.id)) : [F]).map(se), ne = {
                  x: Math.min(...te.map((ae) => ae.x)),
                  y: Math.min(...te.map((ae) => ae.y)),
                  width: Math.max(...te.map((ae) => ae.x + ae.width)) - Math.min(...te.map((ae) => ae.x)),
                  height: Math.max(...te.map((ae) => ae.y + ae.height)) - Math.min(...te.map((ae) => ae.y))
                }, me = w.nodes.filter(
                  (ae) => !w.selectedNodes.has(ae.id) && ae.id !== H && ae.hidden !== !0 && ae.filtered !== !0
                ).map(se), fe = Fp(ne, me, re);
                if (W && (fe.snapOffset.x !== 0 || fe.snapOffset.y !== 0) && (F.position.x += fe.snapOffset.x, F.position.y += fe.snapOffset.y, d))
                  for (const [ae] of d) {
                    const oe = w.getNode(ae);
                    oe && (oe.position.x += fe.snapOffset.x, oe.position.y += fe.snapOffset.y);
                  }
                if (u?.remove(), fe.horizontal.length > 0 || fe.vertical.length > 0) {
                  const ae = Z?.querySelector(".flow-viewport");
                  if (ae) {
                    const oe = w.nodes.map(se);
                    u = Wp(fe.horizontal, fe.vertical, oe), ae.appendChild(u);
                  }
                } else
                  u = null;
                w._emit("helper-lines-change", {
                  horizontal: fe.horizontal,
                  vertical: fe.vertical
                });
              }
            }
            if (w._config?.preventOverlap) {
              const ee = typeof w._config.preventOverlap == "number" ? w._config.preventOverlap : 5, W = F.dimensions?.width ?? we, re = F.dimensions?.height ?? _e, se = w.selectedNodes, ie = w.nodes.filter((ne) => ne.id !== F.id && !ne.hidden && !se.has(ne.id)).map((ne) => Jt(ne, w._config?.nodeOrigin)), te = cg(F.position, W, re, ie, ee);
              F.position.x = te.x, F.position.y = te.y;
            }
            if (!F.parentId) {
              const ee = xt(F.id, w.nodes), W = w.nodes.filter(
                (ne) => ne.id !== F.id && ne.droppable && !ne.hidden && !ee.has(ne.id) && (!ne.acceptsDrop || ne.acceptsDrop(F))
              ), re = Jt(F, w._config?.nodeOrigin);
              let se = null;
              const ie = 12;
              for (const ne of W) {
                const me = ne.parentId ? w.getAbsolutePosition(ne.id) : ne.position, fe = ne.dimensions?.width ?? we, ae = ne.dimensions?.height ?? _e, oe = re.x + re.width / 2, pe = re.y + re.height / 2, ye = ne.id === g ? 0 : ie;
                oe >= me.x + ye && oe <= me.x + fe - ye && pe >= me.y + ye && pe <= me.y + ae - ye && (se = ne);
              }
              const te = se?.id ?? null;
              te !== g && (g && Z && Z.querySelector(`[data-flow-node-id="${CSS.escape(g)}"]`)?.classList.remove("flow-node-drop-target"), te && Z && Z.querySelector(`[data-flow-node-id="${CSS.escape(te)}"]`)?.classList.add("flow-node-drop-target"), g = te);
            }
            if (w._config?.proximityConnect) {
              const ee = w._config.proximityConnectDistance ?? 150, W = F.dimensions ?? { width: 150, height: 50 }, re = {
                x: F.position.x + W.width / 2,
                y: F.position.y + W.height / 2
              }, se = w.nodes.filter((te) => te.id !== F.id && !te.hidden).map((te) => ({
                id: te.id,
                center: {
                  x: te.position.x + (te.dimensions?.width ?? 150) / 2,
                  y: te.position.y + (te.dimensions?.height ?? 50) / 2
                }
              })), ie = zp(F.id, re, se, ee);
              if (ie)
                if (w.edges.some(
                  (ne) => ne.source === ie.source && ne.target === ie.target || ne.source === ie.target && ne.target === ie.source
                ))
                  h?.destroy(), h = null, p = null;
                else {
                  if (p = ie, !h) {
                    h = Kt({
                      connectionLineType: w._config?.connectionLineType,
                      connectionLineStyle: w._config?.connectionLineStyle,
                      connectionLine: w._config?.connectionLine
                    });
                    const ne = Z?.querySelector(".flow-viewport");
                    ne && ne.appendChild(h.svg);
                  }
                  h.update({
                    fromX: re.x,
                    fromY: re.y,
                    toX: ie.targetCenter.x,
                    toY: ie.targetCenter.y,
                    source: ie.source
                  });
                }
              else
                h?.destroy(), h = null, p = null;
            }
            const J = w._container ? He.get(w._container) : void 0;
            if (J?.bridge) {
              if (J.bridge.pushLocalNodeUpdate(H, { position: F.position }), d)
                for (const [ee] of d) {
                  const W = w.getNode(ee);
                  W && J.bridge.pushLocalNodeUpdate(ee, { position: W.position });
                }
              if (J.awareness && K instanceof MouseEvent && w._container) {
                const ee = w._container.getBoundingClientRect(), W = w._viewportLive ?? w.viewport, re = (K.clientX - ee.left - W.x) / W.zoom, se = (K.clientY - ee.top - W.y) / W.zoom;
                J.awareness.updateCursor({ x: re, y: se });
              }
            }
            f && K instanceof MouseEvent && f.updatePointer(K.clientX, K.clientY);
          },
          onDragEnd({ nodeId: H, position: q }) {
            const X = d ? [H, ...d.keys()] : [H];
            w._draggingNodeIds.clear(), e.classList.remove("flow-node-dragging"), B("drag", `Node "${H}" drag end`, q);
            const K = w._container ? He.get(w._container) : void 0;
            K?.bridge && K.bridge.setDragging(H, !1), f?.stop(), f = null, u?.remove(), u = null, w._config?.helperLines && w._emit("helper-lines-change", { horizontal: [], vertical: [] });
            const F = w.getNode(H);
            if (F && w._emit("node-drag-end", { node: F, position: q }), m && F?.parentId) {
              e.classList.remove("flow-reorder-dragging");
              const J = x;
              m = !1, y = -1, x = null, w._layoutAnimFrame && (cancelAnimationFrame(w._layoutAnimFrame), w._layoutAnimFrame = 0), e.closest(".flow-container")?.classList.remove("flow-layout-animating"), g ? (Z && Z.querySelector(`[data-flow-node-id="${CSS.escape(g)}"]`)?.classList.remove("flow-node-drop-target"), zo(w, H, g), g = null) : J && J !== F.parentId ? (w.layoutChildren(J, { omitFromComputation: H, shallow: !0 }), w.propagateLayoutUp(J, { omitFromComputation: H }), w.layoutChildren(F.parentId), w._emit("child-reorder", {
                nodeId: H,
                parentId: F.parentId,
                order: F.order
              })) : (w.layoutChildren(F.parentId), w._emit("child-reorder", {
                nodeId: H,
                parentId: F.parentId,
                order: F.order
              })), d = null, w._layoutAnimTick++, w._commitNodeGeometry(X), tr(w, a, l), l = null, a = !1;
              return;
            }
            if (F && g)
              Z && Z.querySelector(`[data-flow-node-id="${CSS.escape(g)}"]`)?.classList.remove("flow-node-drop-target"), zo(w, H, g), g = null;
            else if (F && F.parentId && !g) {
              const J = mn(
                w.getNode(F.parentId),
                w._config?.childValidationRules ?? {}
              ), ee = w.getNode(F.parentId);
              if (!J?.preventChildEscape && !ee?.childLayout && ee?.dimensions) {
                const W = F.position.x, re = F.position.y, se = F.dimensions?.width ?? 150, ie = F.dimensions?.height ?? 50;
                (W + se < 0 || re + ie < 0 || W > ee.dimensions.width || re > ee.dimensions.height) && zo(w, H, null);
              }
              g = null;
            } else
              g && Z && Z.querySelector(`[data-flow-node-id="${CSS.escape(g)}"]`)?.classList.remove("flow-node-drop-target"), g = null;
            if (w._config?.proximityConnect && p) {
              const J = p;
              h?.destroy(), h = null, p = null;
              let ee = !0;
              if (w._config.onProximityConnect && w._config.onProximityConnect({
                source: J.source,
                target: J.target,
                distance: J.distance
              }) === !1 && (ee = !1), ee) {
                const W = {
                  source: J.source,
                  sourceHandle: "source",
                  target: J.target,
                  targetHandle: "target"
                };
                if (_t(W, w.edges, { preventCycles: w._config?.preventCycles }) && vt(W, w._config?.connectionRules, w._nodeMap) && (Z ? st(Z, W, w.edges) : !0) && (Z ? it(Z, W) : !0) && (!w._config.isValidConnection || w._config.isValidConnection(W))) {
                  if (w._config.proximityConnectConfirm) {
                    const me = Z?.querySelector(`[data-flow-node-id="${CSS.escape(J.source)}"]`), fe = Z?.querySelector(`[data-flow-node-id="${CSS.escape(J.target)}"]`);
                    me?.classList.add("flow-proximity-confirm"), fe?.classList.add("flow-proximity-confirm"), setTimeout(() => {
                      me?.classList.remove("flow-proximity-confirm"), fe?.classList.remove("flow-proximity-confirm");
                    }, 400);
                  }
                  const ne = `e-${J.source}-${J.target}-${Date.now()}-${Bp++}`;
                  w.addEdges({ id: ne, ...W }), w._emit("connect", { connection: W });
                }
              }
            } else
              h?.destroy(), h = null, p = null;
            d = null, a && (w._layoutAnimTick++, w._commitNodeGeometry(X)), tr(w, a, l), l = null, a = !1;
          }
        }));
      });
      {
        const P = t.$data(e.closest("[x-data]"));
        if (P?._config?.easyConnect) {
          const w = P._config.easyConnectKey ?? "alt", v = ($) => {
            if (!Yp($, w) || $.target.closest("[data-flow-handle-type]")) return;
            const L = t.$data(e.closest("[x-data]"));
            if (!L || L._animationLocked || L._connectValidating) return;
            const D = o(n);
            if (!D) return;
            const z = L.getNode(D.id);
            if (!z || z.connectable === !1) return;
            $.preventDefault(), $.stopPropagation(), $.stopImmediatePropagation();
            const V = Xp(e, $.clientX, $.clientY), I = V?.dataset.flowHandleId ?? "source";
            e.classList.add("flow-easy-connecting");
            const k = e.closest(".flow-container");
            if (!k) return;
            const A = L._viewportLive ?? L.viewport, O = A?.zoom || 1, j = A?.x || 0, Q = A?.y || 0, G = k.getBoundingClientRect();
            let U, Z;
            if (V) {
              const W = V.getBoundingClientRect();
              U = (W.left + W.width / 2 - G.left - j) / O, Z = (W.top + W.height / 2 - G.top - Q) / O;
            } else {
              const W = e.getBoundingClientRect();
              U = (W.left + W.width / 2 - G.left - j) / O, Z = (W.top + W.height / 2 - G.top - Q) / O;
            }
            L._emit("connect-start", { source: D.id, sourceHandle: I });
            const H = Kt({
              connectionLineType: L._config?.connectionLineType,
              connectionLineStyle: L._config?.connectionLineStyle,
              connectionLine: L._config?.connectionLine
            }), q = k.querySelector(".flow-viewport");
            q && q.appendChild(H.svg), H.update({ fromX: U, fromY: Z, toX: U, toY: Z, source: D.id, sourceHandle: I }), L.pendingConnection = { source: D.id, sourceHandle: I, position: { x: U, y: Z } }, kn(k, D.id, I, L);
            let X = Eo(k, L, $.clientX, $.clientY), K = null;
            const F = L._config?.connectionSnapRadius ?? 20, J = (W) => {
              const re = L.screenToFlowPosition(W.clientX, W.clientY), se = Sn({
                containerEl: k,
                handleType: "target",
                excludeNodeId: D.id,
                cursorFlowPos: re,
                connectionSnapRadius: F,
                getNode: (ie) => L.getNode(ie),
                toFlowPosition: (ie, te) => L.screenToFlowPosition(ie, te)
              });
              se.element !== K && (K?.classList.remove("flow-handle-active"), se.element?.classList.add("flow-handle-active"), K = se.element), H.update({ fromX: U, fromY: Z, toX: se.position.x, toY: se.position.y, source: D.id, sourceHandle: I }), L.pendingConnection = { ...L.pendingConnection, position: se.position }, X?.updatePointer(W.clientX, W.clientY);
            }, ee = async (W) => {
              X?.stop(), X = null, document.removeEventListener("pointermove", J), document.removeEventListener("pointerup", ee), H.destroy(), K?.classList.remove("flow-handle-active"), Le(k), e.classList.remove("flow-easy-connecting");
              const re = L.screenToFlowPosition(W.clientX, W.clientY), se = { source: D.id, sourceHandle: I, position: re };
              L.pendingConnection = null;
              let ie = K;
              if (ie || (ie = document.elementFromPoint(W.clientX, W.clientY)?.closest('[data-flow-handle-type="target"]')), !ie) {
                L._emit("connect-end", { connection: null, ...se });
                return;
              }
              const ne = ie.closest("[x-flow-node]")?.dataset.flowNodeId, me = ie.dataset.flowHandleId ?? "target";
              if (!ne) {
                L._emit("connect-end", { connection: null, ...se });
                return;
              }
              const fe = { source: D.id, sourceHandle: I, target: ne, targetHandle: me }, ae = await ha({ connection: fe, canvas: L, containerEl: k });
              L._emit("connect-end", {
                connection: ae.applied ? fe : null,
                ...se
              });
            };
            document.addEventListener("pointermove", J), document.addEventListener("pointerup", ee);
          };
          e.addEventListener("pointerdown", v, { capture: !0 }), r(() => {
            e.removeEventListener("pointerdown", v, { capture: !0 });
          });
        }
      }
      const N = (P) => {
        if (!qp(P, e)) return;
        P.preventDefault();
        const w = o(n);
        if (!w) return;
        const v = t.$data(e.closest("[x-data]"));
        v && (v._animationLocked || si(w) && (v._emit("node-click", { node: w, event: P }), P.stopPropagation(), bt(P, v._shortcuts?.multiSelect) ? v.selectedNodes.has(w.id) ? (v.selectedNodes.delete(w.id), w.selected = !1) : (v.selectedNodes.add(w.id), w.selected = !0) : (v.deselectAll(), v.selectedNodes.add(w.id), w.selected = !0), v._emitSelectionChange()));
      };
      e.addEventListener("keydown", N);
      const R = () => {
        const P = t.$data(e.closest("[x-data]"));
        if (!P?._config?.autoPanOnNodeFocus) return;
        const w = o(n);
        if (!w) return;
        const v = w.parentId ? P.getAbsolutePosition(w.id) : w.position;
        P.setCenter(
          v.x + (w.dimensions?.width ?? 150) / 2,
          v.y + (w.dimensions?.height ?? 40) / 2
        );
      };
      e.addEventListener("focus", R);
      const M = (P) => {
        if (a) return;
        const w = o(n);
        if (!w) return;
        const v = t.$data(e.closest("[x-data]"));
        if (v && !v._animationLocked && (v._emit("node-click", { node: w, event: P }), !!si(w))) {
          if (P.stopPropagation(), c) {
            c = !1;
            return;
          }
          bt(P, v._shortcuts?.multiSelect) ? v.selectedNodes.has(w.id) ? (v.selectedNodes.delete(w.id), w.selected = !1, e.classList.remove("flow-node-selected"), B("selection", `Node "${w.id}" deselected (shift)`)) : (v.selectedNodes.add(w.id), w.selected = !0, e.classList.add("flow-node-selected"), B("selection", `Node "${w.id}" selected (shift)`)) : (v.deselectAll(), v.selectedNodes.add(w.id), w.selected = !0, e.classList.add("flow-node-selected"), B("selection", `Node "${w.id}" selected`)), v._emitSelectionChange();
        }
      };
      e.addEventListener("click", M);
      const T = (P) => {
        P.preventDefault(), P.stopPropagation();
        const w = o(n);
        if (!w) return;
        const v = t.$data(e.closest("[x-data]"));
        if (v)
          if (v.selectedNodes.size > 1 && v.selectedNodes.has(w.id)) {
            const $ = v.nodes.filter((L) => v.selectedNodes.has(L.id));
            v._emit("selection-context-menu", { nodes: $, event: P });
          } else
            v._emit("node-context-menu", { node: w, event: P });
      };
      e.addEventListener("contextmenu", T), requestAnimationFrame(() => {
        if (!e.isConnected) return;
        const P = o(n);
        if (!P) return;
        const w = t.$data(e.closest("[x-data]"));
        P.dimensions = {
          width: e.offsetWidth,
          height: e.offsetHeight
        }, B("init", `Node "${P.id}" measured`, P.dimensions), w?._nodeElements?.set(P.id, e), P.resizeObserver !== !1 && w?._resizeObserver && w._resizeObserver.observe(e);
      }), r(() => {
        s?.destroy(), u?.remove(), u = null, h?.destroy(), h = null, e.removeEventListener("keydown", N), e.removeEventListener("focus", R), e.removeEventListener("click", M), e.removeEventListener("contextmenu", T);
        const P = e.dataset.flowNodeId;
        if (P) {
          const w = t.$data(e.closest("[x-data]"));
          w?._nodeElements?.delete(P), w?._resizeObserver?.unobserve(e), w?._draggingNodeIds?.delete(P);
        }
      });
    }
  );
}
const Dt = {
  minWidth: 30,
  minHeight: 30,
  maxWidth: 1 / 0,
  maxHeight: 1 / 0
};
function Up(t, e, n, o, i, r) {
  const { minWidth: s, minHeight: a, maxWidth: l, maxHeight: c } = i, d = t.includes("left"), f = t.includes("right"), u = t.includes("top"), h = t.includes("bottom");
  let p = o.width;
  f ? p = o.width + e.x : d && (p = o.width - e.x);
  let g = o.height;
  h ? g = o.height + e.y : u && (g = o.height - e.y), p = Math.max(s, Math.min(l, p)), g = Math.max(a, Math.min(c, g)), r && (p = r[0] * Math.round(p / r[0]), g = r[1] * Math.round(g / r[1]), p = Math.max(s, Math.min(l, p)), g = Math.max(a, Math.min(c, g)));
  const m = p - o.width, y = g - o.height, x = d ? n.x - m : n.x, C = u ? n.y - y : n.y;
  return {
    position: { x, y: C },
    dimensions: { width: p, height: g }
  };
}
const za = ["top-left", "top-right", "bottom-left", "bottom-right"], Va = ["top", "right", "bottom", "left"], Gp = [...za, ...Va], Zp = {
  "top-left": "nwse-resize",
  "top-right": "nesw-resize",
  "bottom-left": "nesw-resize",
  "bottom-right": "nwse-resize",
  top: "ns-resize",
  bottom: "ns-resize",
  left: "ew-resize",
  right: "ew-resize"
};
function Kp(t) {
  t.directive(
    "flow-resizer",
    (e, { expression: n, modifiers: o }, { evaluate: i, effect: r, cleanup: s }) => {
      const a = Jp(o);
      let l = { ...Dt };
      if (n)
        try {
          const d = i(n);
          l = { ...Dt, ...d };
        } catch {
        }
      const c = [];
      for (const d of a) {
        const f = document.createElement("div");
        f.className = `flow-resizer-handle flow-resizer-handle-${d}`, f.style.cursor = Zp[d], f.dataset.flowResizeDirection = d, e.appendChild(f), c.push(f), f.addEventListener("pointerdown", (u) => {
          u.preventDefault(), u.stopPropagation();
          const h = e.closest("[x-flow-node]");
          if (!h) return;
          const p = e.closest("[x-data]");
          if (!p) return;
          const g = t.$data(p), m = h.dataset.flowNodeId;
          if (!m || !g) return;
          const y = g.getNode(m);
          if (!y || !ws(y)) return;
          y.fixedDimensions = !0;
          const x = { ...l };
          if (y.minDimensions?.width != null && l.minWidth === Dt.minWidth && (x.minWidth = y.minDimensions.width), y.minDimensions?.height != null && l.minHeight === Dt.minHeight && (x.minHeight = y.minDimensions.height), y.maxDimensions?.width != null && l.maxWidth === Dt.maxWidth && (x.maxWidth = y.maxDimensions.width), y.maxDimensions?.height != null && l.maxHeight === Dt.maxHeight && (x.maxHeight = y.maxDimensions.height), !y.dimensions) {
            const M = g.viewport?.zoom || 1, T = h.getBoundingClientRect();
            y.dimensions = { width: T.width / M, height: T.height / M };
          }
          const C = { x: y.position.x, y: y.position.y }, b = { width: y.dimensions.width, height: y.dimensions.height }, E = g.viewport?.zoom || 1, _ = u.clientX, S = u.clientY;
          g._captureHistory?.(), B("resize", `Resize start on "${m}" (${d})`, b), g._emit("node-resize-start", { node: y, dimensions: { ...b } });
          const N = (M) => {
            const T = {
              x: (M.clientX - _) / E,
              y: (M.clientY - S) / E
            }, P = Up(
              d,
              T,
              C,
              b,
              x,
              g._config?.snapToGrid ?? !1
            );
            if (y.position.x = P.position.x, y.position.y = P.position.y, y.dimensions.width = P.dimensions.width, y.dimensions.height = P.dimensions.height, y.parentId) {
              const w = g.getAbsolutePosition(y.id);
              h.style.left = `${w.x}px`, h.style.top = `${w.y}px`;
            } else
              h.style.left = `${P.position.x}px`, h.style.top = `${P.position.y}px`;
            h.style.width = `${P.dimensions.width}px`, h.style.height = `${P.dimensions.height}px`, g._layoutAnimTick++, g._emit("node-resize", { node: y, dimensions: { ...P.dimensions } });
          }, R = () => {
            document.removeEventListener("pointermove", N), document.removeEventListener("pointerup", R), document.removeEventListener("pointercancel", R), B("resize", `Resize end on "${m}"`, y.dimensions), g._emit("node-resize-end", { node: y, dimensions: { ...y.dimensions } });
          };
          document.addEventListener("pointermove", N), document.addEventListener("pointerup", R), document.addEventListener("pointercancel", R);
        });
      }
      r(() => {
        const d = e.closest("[x-flow-node]");
        if (!d) return;
        const f = e.closest("[x-data]");
        if (!f) return;
        const u = t.$data(f), h = d.dataset.flowNodeId;
        if (!h || !u) return;
        const p = u.getNode(h);
        if (!p) return;
        const g = !ws(p);
        for (const m of c)
          m.style.display = g ? "none" : "";
      }), s(() => {
        for (const d of c)
          d.remove();
      });
    }
  );
}
function Jp(t) {
  if (t.includes("corners"))
    return za;
  if (t.includes("edges"))
    return Va;
  const e = t.includes("top"), n = t.includes("bottom"), o = t.includes("left"), i = t.includes("right");
  if (e || n || o || i) {
    if (e && o) return ["top-left"];
    if (e && i) return ["top-right"];
    if (n && o) return ["bottom-left"];
    if (n && i) return ["bottom-right"];
    if (e) return ["top"];
    if (n) return ["bottom"];
    if (o) return ["left"];
    if (i) return ["right"];
  }
  return Gp;
}
let nr = !1;
function Ge(t) {
  const e = t.closest("[data-flow-target]");
  if (e) {
    const i = e.getAttribute("data-flow-target");
    if (i) {
      const r = document.querySelector(i);
      if (r)
        return r;
    }
  }
  const n = t.closest("[data-flow-canvas]");
  if (n)
    return n;
  const o = document.querySelectorAll("[data-flow-canvas]");
  return o.length === 1 ? o[0] : (nr || (nr = !0, console.warn(
    '[alpineflow] Could not resolve a canvas for a flow directive placed outside the canvas element. Add `data-flow-target="<selector>"` pointing at the canvas, or ensure exactly one canvas is present in the document.'
  )), null);
}
function Qp(t, e, n, o) {
  return (Math.atan2(t - n, -(e - o)) * 180 / Math.PI % 360 + 360) % 360;
}
function em(t, e) {
  return (Math.round(t / e) * e % 360 + 360) % 360;
}
function tm(t) {
  t.directive(
    "flow-rotate",
    (e, { expression: n, modifiers: o }, { evaluate: i, effect: r, cleanup: s }) => {
      const a = o.includes("snap"), l = a && n && Number(i(n)) || 15;
      e.classList.add("flow-rotate-handle"), e.style.cursor = "grab";
      const c = (d) => {
        d.preventDefault(), d.stopPropagation();
        const f = e.closest("[x-flow-node]");
        if (!f) return;
        const u = Ge(e);
        if (!u) return;
        const h = t.$data(u), p = f.dataset.flowNodeId;
        if (!p || !h) return;
        const g = h.getNode(p);
        if (!g) return;
        const m = f.getBoundingClientRect(), y = m.left + m.width / 2, x = m.top + m.height / 2;
        h._captureHistory(), e.style.cursor = "grabbing";
        const C = (E) => {
          let _ = Qp(
            E.clientX,
            E.clientY,
            y,
            x
          );
          a && (_ = em(_, l)), g.rotation = _;
        }, b = () => {
          document.removeEventListener("pointermove", C), document.removeEventListener("pointerup", b), e.style.cursor = "grab", h._emit("node-rotate-end", { node: g, rotation: g.rotation });
        };
        document.addEventListener("pointermove", C), document.addEventListener("pointerup", b);
      };
      e.addEventListener("pointerdown", c), s(() => {
        e.removeEventListener("pointerdown", c), e.classList.remove("flow-rotate-handle");
      });
    }
  );
}
function nm(t) {
  t.directive(
    "flow-drag-handle",
    (e) => {
      e.setAttribute("data-flow-drag-handle", ""), e.classList.add("flow-drag-handle");
      const n = e.closest("[x-flow-node]");
      n && n.classList.add("flow-node-has-handle");
    }
  );
}
const om = "application/alpineflow";
function im(t) {
  t.directive(
    "flow-draggable",
    (e, { expression: n }, { evaluate: o }) => {
      e.setAttribute("draggable", "true"), e.style.cursor = "grab", e.addEventListener("dragstart", (i) => {
        if (!i.dataTransfer) return;
        const r = o(n), s = typeof r == "string" ? r : JSON.stringify(r);
        i.dataTransfer.setData(om, s), i.dataTransfer.effectAllowed = "move";
      });
    }
  );
}
function sm(t) {
  const e = [], n = /* @__PURE__ */ new Set();
  for (const o of t) {
    if (n.has(o.id) || o.source === o.target)
      continue;
    const i = t.find(
      (r) => r.id !== o.id && r.source === o.target && r.target === o.source && !n.has(r.id)
    );
    i && (e.push({ primaryId: o.id, mirrorId: i.id }), n.add(o.id), n.add(i.id));
  }
  return e;
}
function rm(t) {
  t.directive(
    "flow-viewport",
    (e, {}, { effect: n, cleanup: o }) => {
      e.classList.add("flow-viewport");
      const i = t.$data(e.closest("[x-data]"));
      if (!i?.edges) return;
      typeof i._registerViewportEl == "function" ? i._registerViewportEl(e) : i._viewportEl = e;
      const r = i.viewport;
      r && (e.style.transform = `translate(${r.x}px, ${r.y}px) scale(${r.zoom})`);
      const s = document.createElement("div");
      s.classList.add("flow-edges"), e.insertBefore(s, e.firstChild);
      const a = /* @__PURE__ */ new Map();
      n(() => {
        const l = i.edges, c = new Set(l.map((g) => g.id));
        for (const [g, m] of a)
          c.has(g) || (t.destroyTree(m), m.remove(), a.delete(g), i._edgeSvgElements?.delete(g));
        for (const g of l) {
          if (a.has(g.id)) continue;
          const m = document.createElementNS("http://www.w3.org/2000/svg", "svg");
          m.setAttribute("class", "flow-edge-svg");
          const y = document.createElementNS("http://www.w3.org/2000/svg", "g");
          m.appendChild(y), t.addScopeToNode(y, { edge: g }), y.setAttribute("x-flow-edge", "edge"), t.mutateDom(() => {
            s.appendChild(m);
          }), a.set(g.id, m), i._edgeSvgElements?.set(g.id, m), t.initTree(y);
        }
        const f = (e.closest("[data-flow-canvas]") ?? e).querySelector(".flow-edges-static");
        f && f.remove();
        const u = !!i._config?.collapseBidirectionalEdges, h = /* @__PURE__ */ new Set(), p = /* @__PURE__ */ new Set();
        if (u) {
          const g = sm(
            l
          );
          for (const m of g)
            h.add(m.primaryId), p.add(m.mirrorId);
        }
        for (const g of l) {
          const m = h.has(g.id), y = p.has(g.id);
          !!g._renderDualMarker !== m && (g._renderDualMarker = m ? !0 : void 0), !!g._hiddenByCollapse !== y && (g._hiddenByCollapse = y ? !0 : void 0);
        }
        for (const g of l) {
          const m = a.get(g.id);
          if (!m) continue;
          const y = i.getNode?.(g.source), x = i.getNode?.(g.target), C = g.hidden || g._hiddenByCollapse || y?.hidden || x?.hidden;
          m.style.display = C ? "none" : "";
        }
        for (const g of l) {
          const m = a.get(g.id);
          if (!m) continue;
          const y = i.getNode?.(g.source), x = i.getNode?.(g.target);
          y?.filtered || x?.filtered ? m.classList.add("flow-edge-filtered") : m.classList.remove("flow-edge-filtered");
        }
      }), o(() => {
        for (const [l, c] of a)
          t.destroyTree(c), c.remove(), i._edgeSvgElements?.delete(l);
        a.clear(), s.remove();
      });
    }
  );
}
const am = [
  "top",
  "bottom",
  "left",
  "right",
  "top-left",
  "top-right",
  "bottom-left",
  "bottom-right"
], lm = "a, button, input, textarea, select, [contenteditable]", cm = 100, dm = 60, um = /* @__PURE__ */ new Set(["top", "top-left", "top-right"]), fm = /* @__PURE__ */ new Set(["bottom", "bottom-left", "bottom-right"]), hm = /* @__PURE__ */ new Set(["left", "top-left", "bottom-left"]), gm = /* @__PURE__ */ new Set(["right", "top-right", "bottom-right"]);
function pm(t, e) {
  const n = new Set(e), o = n.has("static"), i = n.has("no-resize") || n.has("noresize"), r = n.has("locked"), s = n.has("constrained");
  let a = n.has("fill-width") || n.has("fill"), l = n.has("fill-height") || n.has("fill");
  return { position: t && am.includes(t) ? t : "top-right", isStatic: o, isFixed: r, noResize: i, constrained: s, fillWidth: a, fillHeight: l };
}
function Rt(t, e, n) {
  t.dispatchEvent(new CustomEvent(`flow-${e}`, {
    bubbles: !0,
    detail: n
  }));
}
function mm(t, e, n, o, i, r) {
  return {
    left: Math.max(0, Math.min(t, i - n)),
    top: Math.max(0, Math.min(e, r - o))
  };
}
function ym(t, e, n, o) {
  t.style.transform = "none", t.style.borderRadius = "0", n && (t.style.left = "0", t.style.right = "0", t.style.width = "auto"), o && (t.style.top = "0", t.style.bottom = "0", t.style.height = "auto"), n && !o && (um.has(e) && (t.style.top = "0"), fm.has(e) && (t.style.bottom = "0")), o && !n && (hm.has(e) && (t.style.left = "0"), gm.has(e) && (t.style.right = "0"));
}
function wm(t) {
  t.directive(
    "flow-panel",
    (e, { value: n, modifiers: o }, { cleanup: i }) => {
      const {
        position: r,
        isStatic: s,
        isFixed: a,
        noResize: l,
        constrained: c,
        fillWidth: d,
        fillHeight: f
      } = pm(n, o), u = d || f, h = !s && !a && !u, p = !s && !l && !u;
      e.classList.add("flow-panel", `flow-panel-${r}`), s && e.classList.add("flow-panel-static"), (a || u) && e.classList.add("flow-panel-locked"), (l || u) && e.classList.add("flow-panel-no-resize"), d && e.classList.add("flow-panel-fill-width"), f && e.classList.add("flow-panel-fill-height"), u && ym(e, r, d, f);
      const g = (E) => E.stopPropagation();
      e.addEventListener("mousedown", g), e.addEventListener("pointerdown", g), e.addEventListener("wheel", g);
      const m = e.parentElement, y = {
        left: e.style.left,
        top: e.style.top,
        right: e.style.right,
        bottom: e.style.bottom,
        transform: e.style.transform,
        width: e.style.width,
        height: e.style.height,
        borderRadius: e.style.borderRadius
      }, x = `flow-panel-${r}`, C = () => {
        e.style.left = y.left, e.style.top = y.top, e.style.right = y.right, e.style.bottom = y.bottom, e.style.transform = y.transform, e.style.width = y.width, e.style.height = y.height, e.style.borderRadius = y.borderRadius, e.classList.contains(x) || e.classList.add(x);
      };
      m.addEventListener("flow-panel-reset", C), m.__flowPanels || (m.__flowPanels = /* @__PURE__ */ new Set()), m.__flowPanels.add(e);
      let b = null;
      if (h) {
        let E = !1, _ = 0, S = 0, N = 0, R = 0;
        const M = () => {
          const v = e.getBoundingClientRect(), $ = m.getBoundingClientRect();
          return {
            x: v.left - $.left,
            y: v.top - $.top
          };
        }, T = (v) => {
          if (!E) return;
          let $ = N + (v.clientX - _), L = R + (v.clientY - S);
          if (c) {
            const D = mm(
              $,
              L,
              e.offsetWidth,
              e.offsetHeight,
              m.clientWidth,
              m.clientHeight
            );
            $ = D.left, L = D.top;
          }
          e.style.left = `${$}px`, e.style.top = `${L}px`, Rt(m, "panel-drag", {
            panel: e,
            position: { x: $, y: L }
          });
        }, P = () => {
          if (!E) return;
          E = !1, document.removeEventListener("pointermove", T), document.removeEventListener("pointerup", P), document.removeEventListener("pointercancel", P);
          const v = M();
          Rt(m, "panel-drag-end", {
            panel: e,
            position: v
          });
        }, w = (v) => {
          const $ = v.target;
          if ($.closest(lm) || $.closest(".flow-panel-resize-handle"))
            return;
          E = !0, _ = v.clientX, S = v.clientY;
          const L = e.getBoundingClientRect(), D = m.getBoundingClientRect();
          N = L.left - D.left, R = L.top - D.top, e.style.bottom = "auto", e.style.right = "auto", e.style.transform = "none", e.style.left = `${N}px`, e.style.top = `${R}px`, document.addEventListener("pointermove", T), document.addEventListener("pointerup", P), document.addEventListener("pointercancel", P), Rt(m, "panel-drag-start", {
            panel: e,
            position: { x: N, y: R }
          });
        };
        if (e.addEventListener("pointerdown", w), p) {
          b = document.createElement("div"), b.classList.add("flow-panel-resize-handle"), e.appendChild(b);
          let v = !1, $ = 0, L = 0, D = 0, z = 0;
          const V = (A) => {
            if (!v) return;
            const O = Math.max(cm, D + (A.clientX - $)), j = Math.max(dm, z + (A.clientY - L));
            e.style.width = `${O}px`, e.style.height = `${j}px`, Rt(m, "panel-resize", {
              panel: e,
              dimensions: { width: O, height: j }
            });
          }, I = () => {
            v && (v = !1, document.removeEventListener("pointermove", V), document.removeEventListener("pointerup", I), document.removeEventListener("pointercancel", I), Rt(m, "panel-resize-end", {
              panel: e,
              dimensions: { width: e.offsetWidth, height: e.offsetHeight }
            }));
          }, k = (A) => {
            A.stopPropagation(), v = !0, $ = A.clientX, L = A.clientY, D = e.offsetWidth, z = e.offsetHeight, document.addEventListener("pointermove", V), document.addEventListener("pointerup", I), document.addEventListener("pointercancel", I), Rt(m, "panel-resize-start", {
              panel: e,
              dimensions: { width: D, height: z }
            });
          };
          b.addEventListener("pointerdown", k), i(() => {
            e.removeEventListener("pointerdown", w), b?.removeEventListener("pointerdown", k), document.removeEventListener("pointermove", T), document.removeEventListener("pointerup", P), document.removeEventListener("pointercancel", P), document.removeEventListener("pointermove", V), document.removeEventListener("pointerup", I), document.removeEventListener("pointercancel", I), b?.remove(), e.removeEventListener("mousedown", g), e.removeEventListener("pointerdown", g), e.removeEventListener("wheel", g), m.removeEventListener("flow-panel-reset", C), m.__flowPanels?.delete(e);
          });
        } else
          i(() => {
            e.removeEventListener("pointerdown", w), document.removeEventListener("pointermove", T), document.removeEventListener("pointerup", P), document.removeEventListener("pointercancel", P), e.removeEventListener("mousedown", g), e.removeEventListener("pointerdown", g), e.removeEventListener("wheel", g), m.removeEventListener("flow-panel-reset", C), m.__flowPanels?.delete(e);
          });
      } else
        i(() => {
          e.removeEventListener("mousedown", g), e.removeEventListener("pointerdown", g), e.removeEventListener("wheel", g), m.removeEventListener("flow-panel-reset", C), m.__flowPanels?.delete(e);
        });
    }
  );
}
function vm(t) {
  t.directive(
    "flow-node-toolbar",
    (e, { value: n, modifiers: o }, { effect: i, cleanup: r }) => {
      const s = _m(n), a = bm(o);
      e.classList.add("flow-node-toolbar"), e.style.position = "absolute";
      const l = (d) => {
        d.stopPropagation();
      }, c = (d) => {
        d.stopPropagation();
      };
      e.addEventListener("pointerdown", l), e.addEventListener("click", c), i(() => {
        const d = e.closest("[x-flow-node]");
        if (!d) return;
        const f = e.closest("[x-data]");
        if (!f) return;
        const u = t.$data(f);
        if (!u?.viewport) return;
        const h = u.viewport.zoom || 1, p = parseInt(e.getAttribute("data-flow-offset") ?? "10", 10), g = d.dataset.flowNodeId, m = g ? u.getNode(g) : null, y = m?.dimensions?.width ?? d.offsetWidth, x = m?.dimensions?.height ?? d.offsetHeight, C = p / h;
        let b, E, _, S;
        s === "top" || s === "bottom" ? (E = s === "top" ? -C : x + C, S = s === "top" ? "-100%" : "0%", a === "start" ? (b = 0, _ = "0%") : a === "end" ? (b = y, _ = "-100%") : (b = y / 2, _ = "-50%")) : (b = s === "left" ? -C : y + C, _ = s === "left" ? "-100%" : "0%", a === "start" ? (E = 0, S = "0%") : a === "end" ? (E = x, S = "-100%") : (E = x / 2, S = "-50%")), e.style.left = `${b}px`, e.style.top = `${E}px`, e.style.transformOrigin = "0 0", e.style.transform = `scale(${1 / h}) translate(${_}, ${S})`;
      }), r(() => {
        e.removeEventListener("pointerdown", l), e.removeEventListener("click", c), e.classList.remove("flow-node-toolbar");
      });
    }
  );
}
function _m(t) {
  return t === "bottom" ? "bottom" : t === "left" ? "left" : t === "right" ? "right" : "top";
}
function bm(t) {
  return t.includes("start") ? "start" : t.includes("end") ? "end" : "center";
}
function xm(t) {
  t.directive(
    "flow-context-menu",
    (e, { modifiers: n, expression: o }, { effect: i, evaluate: r, cleanup: s }) => {
      const a = n[0];
      if (!a) {
        console.warn("[AlpineFlow] x-flow-context-menu requires a type modifier: .node, .edge, .pane, or .selection");
        return;
      }
      const l = e, c = l.closest("[x-data]");
      if (!c) return;
      const d = t.$data(c);
      let f = 0, u = 0;
      if (o) {
        const _ = r(o);
        f = _?.offsetX ?? 0, u = _?.offsetY ?? 0;
      }
      l.setAttribute("role", "menu"), l.setAttribute("tabindex", "-1"), l.style.display = "none";
      const h = document.createElement("div");
      h.style.cssText = "position:fixed;inset:0;z-index:4999;display:none;", c.appendChild(h);
      let p = null;
      const g = 4, m = () => {
        p = document.activeElement;
        const _ = d.contextMenu.x + f, S = d.contextMenu.y + u;
        l.style.display = "", l.style.position = "fixed", l.style.left = _ + "px", l.style.top = S + "px", l.style.zIndex = "5000", l.querySelectorAll(':scope > button, :scope > [role="menuitem"]').forEach((w) => {
          w.setAttribute("role", "menuitem"), w.hasAttribute("tabindex") || w.setAttribute("tabindex", "-1");
        });
        const N = l.getBoundingClientRect(), R = window.innerWidth, M = window.innerHeight;
        let T = _, P = S;
        N.right > R - g && (T = R - N.width - g), N.bottom > M - g && (P = M - N.height - g), T < g && (T = g), P < g && (P = g), l.style.left = T + "px", l.style.top = P + "px", h.style.display = "", l.focus({ preventScroll: !0 });
      }, y = () => {
        l.style.display = "none", h.style.display = "none", p && document.contains(p) && (p.focus({ preventScroll: !0 }), p = null);
      };
      i(() => {
        const _ = d.contextMenu;
        _.show && _.type === a ? m() : y();
      }), h.addEventListener("click", () => d.closeContextMenu()), h.addEventListener("contextmenu", (_) => {
        _.preventDefault(), d.closeContextMenu();
      });
      const x = () => {
        d.contextMenu.show && d.contextMenu.type === a && d.closeContextMenu();
      };
      window.addEventListener("scroll", x, !0);
      const C = () => Array.from(l.querySelectorAll(
        ':scope > button:not([disabled]), :scope > [role="menuitem"]:not([disabled])'
      )), b = (_) => Array.from(_.querySelectorAll(
        "button:not([disabled])"
      )), E = (_) => {
        if (!d.contextMenu.show || d.contextMenu.type !== a || l.style.display === "none") return;
        const S = document.activeElement, N = S?.closest(".flow-context-submenu"), R = N ? b(N) : C();
        if (R.length === 0) return;
        const M = R.indexOf(S);
        switch (_.key) {
          case "ArrowDown": {
            _.preventDefault();
            const T = M < R.length - 1 ? M + 1 : 0;
            R[T].focus({ preventScroll: !0 });
            break;
          }
          case "ArrowUp": {
            _.preventDefault();
            const T = M > 0 ? M - 1 : R.length - 1;
            R[T].focus({ preventScroll: !0 });
            break;
          }
          case "Tab": {
            if (_.preventDefault(), _.shiftKey) {
              const T = M > 0 ? M - 1 : R.length - 1;
              R[T].focus({ preventScroll: !0 });
            } else {
              const T = M < R.length - 1 ? M + 1 : 0;
              R[T].focus({ preventScroll: !0 });
            }
            break;
          }
          case "Enter":
          case " ": {
            _.preventDefault(), S?.click();
            break;
          }
          case "ArrowRight": {
            if (!N) {
              const T = S?.querySelector(".flow-context-submenu");
              T && (_.preventDefault(), T.querySelector("button:not([disabled])")?.focus({ preventScroll: !0 }));
            }
            break;
          }
          case "ArrowLeft": {
            N && (_.preventDefault(), N.closest(".flow-context-submenu-trigger")?.focus({ preventScroll: !0 }));
            break;
          }
        }
      };
      l.addEventListener("keydown", E), s(() => {
        h.remove(), window.removeEventListener("scroll", x, !0), l.removeEventListener("keydown", E);
      });
    }
  );
}
const Em = {
  mouseenter: "mouseleave",
  click: "click"
  // toggle behavior
};
function Cm(t) {
  t.directive(
    "flow-animate",
    (e, { value: n, modifiers: o, expression: i }, { evaluate: r, effect: s, cleanup: a }) => {
      const l = new Set(o), c = l.has("once"), d = l.has("reverse"), f = l.has("queue"), u = n || "";
      let h = "click";
      l.has("mouseenter") ? h = "mouseenter" : l.has("click") && (h = "click");
      let p = null, g = [], m = !1, y = !1, x = !1;
      function C() {
        const T = r(i);
        return Array.isArray(T) ? T : T && typeof T == "object" ? [T] : [];
      }
      function b() {
        const T = e.closest("[x-data]");
        return T ? t.$data(T) : null;
      }
      function E(T, P = !1) {
        const w = b();
        if (!w?.timeline) return Promise.resolve();
        const v = w.timeline();
        if (P) {
          for (let $ = T.length - 1; $ >= 0; $--)
            v.step(T[$]);
          v.reverse();
        } else
          for (const $ of T)
            $.parallel ? v.parallel($.parallel) : v.step($);
        return p = v, v.play().then(() => {
          p === v && (p = null);
        });
      }
      function _(T = !1) {
        if (c && y) return;
        y = !0;
        const P = C();
        if (P.length === 0) return;
        const w = () => E(P, T);
        f ? (g.push(w), S()) : (p?.stop(), p = null, g = [], m = !1, w());
      }
      async function S() {
        if (!m) {
          for (m = !0; g.length > 0; )
            await g.shift()();
          m = !1;
        }
      }
      if (u) {
        s(() => {
          const T = C(), P = b();
          P?.registerAnimation && P.registerAnimation(u, T);
        }), a(() => {
          const T = b();
          T?.unregisterAnimation && T.unregisterAnimation(u);
        });
        return;
      }
      const N = () => {
        d && h === "click" ? (_(x), x = !x) : _(!1);
      };
      e.addEventListener(h, N);
      let R = null, M = null;
      d && h !== "click" && (M = Em[h] ?? null, M && (R = () => _(!0), e.addEventListener(M, R))), a(() => {
        p?.stop(), e.removeEventListener(h, N), M && R && e.removeEventListener(M, R);
      });
    }
  );
}
function Sm(t, e, n, o, i) {
  const r = e.position?.x ?? t.position.x, s = e.position?.y ?? t.position.y, a = t.dimensions?.width ?? we, l = t.dimensions?.height ?? _e, c = r * n.zoom + n.x, d = s * n.zoom + n.y, f = (r + a) * n.zoom + n.x, u = (s + l) * n.zoom + n.y;
  return f > 0 && c < o && u > 0 && d < i;
}
function km(t, e, n, o, i) {
  const r = t.nodes;
  if (!r || r.length === 0) return !1;
  for (const s of r) {
    const a = e.getNode?.(s) ?? e.nodes?.find((l) => l.id === s);
    if (a && !Sm(a, t, n, o, i))
      return !0;
  }
  return !1;
}
function Lm(t) {
  t.directive(
    "flow-timeline",
    (e, { expression: n }, { evaluate: o, effect: i, cleanup: r }) => {
      let s = 0, a = null, l = [], c = !1, d = "idle", f = 0;
      function u() {
        const m = e.closest("[x-data]");
        return m ? t.$data(m) : null;
      }
      function h(m, y) {
        const x = u();
        if (!x?.timeline) return Promise.resolve();
        const C = x.timeline(), b = y.speed ?? 1, E = y.autoFitView === !0, _ = y.fitViewPadding ?? 0.1, S = x.viewport, N = x.getContainerDimensions?.();
        for (const R of m) {
          const M = b !== 1 ? {
            ...R,
            duration: R.duration !== void 0 ? R.duration / b : void 0,
            delay: R.delay !== void 0 ? R.delay / b : void 0
          } : R;
          if (M.parallel) {
            const T = M.parallel.map(
              (P) => b !== 1 ? {
                ...P,
                duration: P.duration !== void 0 ? P.duration / b : void 0,
                delay: P.delay !== void 0 ? P.delay / b : void 0
              } : P
            );
            C.parallel(T);
          } else if (E && S && N && km(M, x, S, N.width, N.height)) {
            const T = {
              fitView: !0,
              fitViewPadding: _,
              duration: M.duration,
              easing: M.easing
            };
            C.parallel([M, T]);
          } else
            C.step(M);
        }
        if (y.lock && C.lock(!0), y.loop !== void 0 && y.loop !== !1) {
          const R = y.loop === !0 ? 0 : y.loop;
          C.loop(R);
        }
        return y.respectReducedMotion !== void 0 && C.respectReducedMotion(y.respectReducedMotion), a = C, d = "playing", c = !0, C.play().then(() => {
          a === C && (a = null, d = "idle", c = !1);
        });
      }
      async function p(m) {
        if (l.length === 0) return;
        if ((m.overflow ?? "queue") === "latest" && c) {
          a?.stop(), a = null, c = !1, d = "idle";
          const x = [l[l.length - 1]];
          s += l.length, l = [], await h(x, m);
        } else {
          const x = [...l];
          s += x.length, l = [], c && await new Promise((b) => {
            a ? (a.on("complete", () => b()), a.on("stop", () => b())) : b();
          }), await h(x, m);
        }
      }
      const g = {
        async play() {
          const m = o(n), y = m.steps ?? [];
          s < y.length && (l = y.slice(s), await p(m));
        },
        stop() {
          a?.stop(), a = null, c = !1, d = "stopped", l = [];
        },
        reset(m) {
          if (a?.stop(), a = null, c = !1, d = "idle", s = 0, l = [], f = 0, m) {
            const y = o(n), x = y.steps ?? [];
            if (x.length > 0)
              return l = [...x], p(y);
          }
        },
        get state() {
          return d;
        }
      };
      e.__timeline = g, i(() => {
        const m = o(n);
        if (!m || !m.steps) return;
        const y = m.steps, x = m.autoplay !== !1;
        if (y.length > f) {
          const C = y.slice(Math.max(s, f));
          f = y.length, C.length > 0 && x && (l.push(...C), p(m));
        } else
          f = y.length;
      }), r(() => {
        a?.stop(), delete e.__timeline;
      });
    }
  );
}
function Mm(t) {
  t.directive(
    "flow-collapse",
    (e, { expression: n, modifiers: o }, { evaluate: i, effect: r, cleanup: s }) => {
      const a = o.includes("all"), l = o.includes("expand"), c = o.includes("children"), d = o.includes("instant"), f = () => {
        const u = Ge(e);
        if (!u) return;
        const h = t.$data(u);
        if (!h) return;
        if (a) {
          for (const g of h.nodes)
            l ? h.expandNode?.(g.id, { animate: !d }) : h.collapseNode?.(g.id, { animate: !d });
          e.setAttribute("aria-expanded", String(l));
          return;
        }
        if (c && n) {
          const g = i(n);
          if (!g) return;
          for (const m of h.nodes)
            m.parentId === g && (l ? h.expandNode?.(m.id, { animate: !d }) : h.collapseNode?.(m.id, { animate: !d }));
          e.setAttribute("aria-expanded", String(l));
          return;
        }
        const p = i(n);
        !p || !h?.toggleNode || h.toggleNode(p, { animate: !d });
      };
      e.addEventListener("click", f), e.setAttribute("data-flow-collapse", ""), e.style.cursor = "pointer", !a && !c && r(() => {
        const u = i(n);
        if (!u) return;
        const h = Ge(e);
        if (!h) return;
        const p = t.$data(h);
        if (!p?.isCollapsed) return;
        const g = p.isCollapsed(u);
        e.setAttribute("aria-expanded", String(!g));
        const m = e.closest("[x-flow-node]");
        m && e.setAttribute("aria-controls", m.id || u);
      }), s(() => {
        e.removeEventListener("click", f);
      });
    }
  );
}
function Pm(t) {
  t.directive(
    "flow-condense",
    (e, { expression: n, modifiers: o }, { evaluate: i, effect: r, cleanup: s }) => {
      const a = () => {
        const l = i(n);
        if (!l) return;
        const c = e.closest("[x-data]");
        if (!c) return;
        const d = t.$data(c);
        d?.toggleCondense && d.toggleCondense(l);
      };
      e.addEventListener("click", a), e.setAttribute("data-flow-condense", ""), e.style.cursor = "pointer", r(() => {
        const l = i(n);
        if (!l) return;
        const c = e.closest("[x-data]");
        if (!c) return;
        const d = t.$data(c);
        if (!d?.isCondensed) return;
        const f = d.isCondensed(l);
        e.setAttribute("aria-expanded", String(!f));
      }), s(() => {
        e.removeEventListener("click", a);
      });
    }
  );
}
function Vo(t) {
  for (; t.firstChild; ) t.removeChild(t.firstChild);
}
function Be(t, e, n) {
  const o = (Array.isArray(n) ? n : n ? [n] : []).flatMap((s) => s.split(/\s+/)).filter(Boolean), i = new Set(o), r = t.dataset[e] ? t.dataset[e].split(" ") : [];
  for (const s of r) i.has(s) || t.classList.remove(s);
  for (const s of i) t.classList.add(s);
  i.size ? t.dataset[e] = [...i].join(" ") : delete t.dataset[e];
}
function or(t) {
  return typeof t == "object" && t !== null && !Array.isArray(t);
}
const ir = [
  ["icon", ".flow-schema-row-icon"],
  ["name", ".flow-schema-row-name"],
  ["type", ".flow-schema-row-type"],
  ["target", ".flow-schema-handle--target:not(.flow-schema-handle--mirror)"],
  ["source", ".flow-schema-handle--source:not(.flow-schema-handle--mirror)"],
  ["mirrorTarget", ".flow-schema-handle--target.flow-schema-handle--mirror"],
  ["mirrorSource", ".flow-schema-handle--source.flow-schema-handle--mirror"]
];
function Nm(t) {
  t.directive("flow-schema", (e, n, { evaluate: o, effect: i, cleanup: r }) => {
    const s = e, a = () => {
      try {
        return o("typeof node !== 'undefined' ? node : null") ?? null;
      } catch {
        return null;
      }
    }, l = () => {
      try {
        const _ = s.closest(".flow-container");
        return _ ? !!t.$data?.(_)?._config?.rowsReorderable : !1;
      } catch {
        return !1;
      }
    }, c = () => {
      try {
        const _ = s.closest(".flow-container");
        return _ ? !!t.$data?.(_)?._config?.keyboardConnect : !1;
      } catch {
        return !1;
      }
    }, d = () => {
      try {
        const _ = s.closest(".flow-container");
        return _ ? t.$data?.(_) ?? null : null;
      } catch {
        return null;
      }
    }, f = () => {
      const _ = d()?._config;
      return {
        nodeDecorator: typeof _?.schemaNodeDecorator == "function" ? _.schemaNodeDecorator : null,
        rowDecorator: typeof _?.schemaRowDecorator == "function" ? _.schemaRowDecorator : null,
        nodeClass: typeof _?.schemaNodeClass == "function" ? _.schemaNodeClass : null,
        rowClass: typeof _?.schemaRowClass == "function" ? _.schemaRowClass : null
      };
    }, u = () => {
      t.nextTick(() => {
        const _ = d();
        if (!_) return;
        const S = t.raw(_);
        if (S._schemaMetrics != null) return;
        const N = s.querySelector(":scope > .flow-schema-header"), R = s.querySelector(":scope > .flow-schema-body"), M = s.querySelectorAll(".flow-schema-row");
        if (M.length < 2) return;
        const T = M[0], P = M[1], w = M[M.length - 1], v = T.querySelector(".flow-schema-handle"), $ = w.querySelector(".flow-schema-handle");
        if (!N || !R || !v || !$) return;
        const L = s.closest("[data-flow-node-id]") ?? s, D = S.viewport?.zoom || 1, z = L.getBoundingClientRect(), V = N.getBoundingClientRect(), I = R.getBoundingClientRect(), k = T.getBoundingClientRect(), A = P.getBoundingClientRect(), O = w.getBoundingClientRect(), j = v.getBoundingClientRect(), Q = $.getBoundingClientRect(), G = (A.top - k.top) / D, U = O.height / D;
        if (G <= 0 || U <= 0) return;
        const Z = {
          headerHeight: V.height / D,
          rowHeight: G,
          // NOT the same as `rowHeight` under the shipped theme — the last row loses
          // its border-bottom. See SchemaMetrics.rowHeightLast.
          rowHeightLast: U,
          // Where the handle actually sits inside its row. MEASURED, not `rowHeight / 2`:
          // `top: 50%` resolves against the row's PADDING box, which the theme's
          // border-bottom shrinks. See SchemaMetrics.handleOffsetY.
          handleOffsetY: (j.top + j.height / 2 - k.top) / D,
          handleOffsetYLast: (Q.top + Q.height / 2 - O.top) / D,
          insetLeft: (k.left - z.left) / D,
          insetRight: (z.right - k.right) / D,
          insetTop: (V.top - z.top) / D,
          // Closes the row model: with insetBottom, a consumer can reconstruct the
          // node's expected border-box height and so DETECT non-uniform rows (a
          // wrapped field name — nothing in the CSS forces `white-space: nowrap`)
          // instead of assuming uniformity. See `flow-edge.ts`'s eligibility check.
          insetBottom: (z.bottom - I.bottom) / D,
          handleWidth: j.width / D,
          handleHeight: j.height / D
        };
        S._schemaMetrics = Z;
      });
    };
    s.classList.add("flow-schema-node");
    let h = s.closest("[data-flow-node-id]"), p = !1;
    h ? h.setAttribute("data-flow-schema-node", "") : t.nextTick(() => {
      p || !s.isConnected || (h = s.closest("[data-flow-node-id]"), h?.setAttribute("data-flow-schema-node", ""));
    });
    let g = null, m = null;
    const y = /* @__PURE__ */ new Map(), x = () => g && m ? !1 : (Vo(s), y.clear(), g = document.createElement("div"), g.className = "flow-schema-header", s.appendChild(g), m = document.createElement("div"), m.className = "flow-schema-body", s.appendChild(m), !0), C = () => {
      const _ = a(), S = _?.data;
      if (!S) {
        for (const I of y.values())
          t.destroyTree(I);
        y.clear(), Vo(s), Be(s, "flowSchemaNodeClass", null), delete s.dataset.flowSchemaNodeSub, g = null, m = null;
        return;
      }
      const N = x(), R = f(), M = typeof S.label == "string" ? S.label : "", T = Array.isArray(S.fields) ? S.fields : [], P = typeof _?.id == "string" ? _.id : "", w = (I, k, A) => {
        const O = I.dataset.flowSchemaRowSub === "1";
        if (!R.rowClass && !I.dataset.flowSchemaRowClass && !O) return;
        let j = null;
        if (R.rowClass)
          try {
            j = R.rowClass({
              field: k,
              node: _,
              nodeId: P,
              isNew: A
            });
          } catch (Q) {
            console.error("[alpineflow] schemaRowClass threw:", Q);
            return;
          }
        if (or(j)) {
          const Q = j;
          Be(I, "flowSchemaRowClass", Q.row);
          for (const [G, U] of ir) {
            const Z = I.querySelector(U);
            Z && Be(Z, "flowSchemaRowClass", Q[G]);
          }
          I.dataset.flowSchemaRowSub = "1";
        } else if (Be(I, "flowSchemaRowClass", j), O) {
          for (const [, Q] of ir) {
            const G = I.querySelector(Q);
            G && Be(G, "flowSchemaRowClass", null);
          }
          delete I.dataset.flowSchemaRowSub;
        }
      }, v = (I, k, A) => {
        if (!R.rowDecorator) return;
        const O = {
          icon: I.querySelector(".flow-schema-row-icon"),
          name: I.querySelector(".flow-schema-row-name"),
          type: I.querySelector(".flow-schema-row-type"),
          target: I.querySelector(
            ".flow-schema-handle--target:not(.flow-schema-handle--mirror)"
          ),
          source: I.querySelector(
            ".flow-schema-handle--source:not(.flow-schema-handle--mirror)"
          ),
          mirrorTarget: I.querySelector(
            ".flow-schema-handle--target.flow-schema-handle--mirror"
          ),
          mirrorSource: I.querySelector(
            ".flow-schema-handle--source.flow-schema-handle--mirror"
          )
        };
        try {
          R.rowDecorator({ row: I, field: k, nodeId: P, slots: O, isNew: A });
        } catch (j) {
          console.error("[alpineflow] schemaRowDecorator threw:", j);
        }
      };
      typeof S.kind == "string" && S.kind ? s.setAttribute("data-flow-schema-kind", S.kind) : s.removeAttribute("data-flow-schema-kind"), g.textContent !== M && (g.textContent = M);
      const $ = l(), L = c(), D = /* @__PURE__ */ new Set();
      for (const I of T) {
        D.add(I.name);
        const k = y.get(I.name);
        if (k)
          b(k, I), w(k, I, !1), v(k, I, !1);
        else {
          const A = E(I, P, $, L);
          y.set(I.name, A), m.appendChild(A), t.initTree(A), w(A, I, !0), v(A, I, !0);
        }
      }
      for (const [I, k] of y)
        D.has(I) || (t.destroyTree(k), k.remove(), y.delete(I));
      let z = m.firstChild;
      for (const I of T) {
        const k = y.get(I.name);
        k && (z === k ? z = z.nextSibling : m.insertBefore(k, z));
      }
      const V = s.dataset.flowSchemaNodeSub === "1";
      if (R.nodeClass || s.dataset.flowSchemaNodeClass || V) {
        let I = null, k = !1;
        if (R.nodeClass)
          try {
            I = R.nodeClass({
              node: _,
              isNew: N
            });
          } catch (A) {
            console.error("[alpineflow] schemaNodeClass threw:", A), k = !0;
          }
        if (!k)
          if (or(I)) {
            const A = I;
            Be(s, "flowSchemaNodeClass", A.node), Be(g, "flowSchemaNodeClass", A.header), Be(m, "flowSchemaNodeClass", A.body), s.dataset.flowSchemaNodeSub = "1";
          } else
            Be(s, "flowSchemaNodeClass", I), V && (Be(g, "flowSchemaNodeClass", null), Be(m, "flowSchemaNodeClass", null), delete s.dataset.flowSchemaNodeSub);
      }
      if (R.nodeDecorator)
        try {
          R.nodeDecorator({
            host: s,
            header: g,
            body: m,
            node: _,
            isNew: N
          });
        } catch (I) {
          console.error("[alpineflow] schemaNodeDecorator threw:", I);
        }
      u();
    }, b = (_, S) => {
      _.dataset.flowSchemaField !== S.name && (_.dataset.flowSchemaField = S.name), _.classList.toggle("flow-schema-row--pk", S.key === "primary"), _.classList.toggle("flow-schema-row--fk", S.key === "foreign"), _.classList.toggle("flow-schema-row--required", !!S.required);
      let N = _.querySelector(".flow-schema-row-icon");
      const R = _.querySelector(".flow-schema-row-name");
      S.icon ? (N || (N = document.createElement("span"), N.className = "flow-schema-row-icon", _.insertBefore(N, R)), N.textContent !== S.icon && (N.textContent = S.icon)) : N && N.remove(), R && R.textContent !== S.name && (R.textContent = S.name);
      const M = _.querySelector(".flow-schema-row-type");
      M && M.textContent !== S.type && (M.textContent = S.type);
    }, E = (_, S, N, R) => {
      const M = document.createElement("div");
      M.className = "flow-schema-row", M.dataset.flowSchemaField = _.name, _.key === "primary" && M.classList.add("flow-schema-row--pk"), _.key === "foreign" && M.classList.add("flow-schema-row--fk"), _.required && M.classList.add("flow-schema-row--required"), S && M.setAttribute(
        "x-flow-row-select",
        JSON.stringify(`${S}.${_.name}`)
      ), N && M.setAttribute("x-schema-reorderable", ""), R && S && M.setAttribute(
        "x-schema-keyboard-nav",
        JSON.stringify(`${S}.${_.name}`)
      );
      const T = document.createElement("div");
      if (T.className = "flow-schema-handle flow-schema-handle--target", T.setAttribute("x-flow-handle:target.left", JSON.stringify(_.name)), M.appendChild(T), _.icon) {
        const D = document.createElement("span");
        D.className = "flow-schema-row-icon", D.textContent = _.icon, M.appendChild(D);
      }
      const P = document.createElement("span");
      P.className = "flow-schema-row-name", P.textContent = _.name, M.appendChild(P);
      const w = document.createElement("span");
      w.className = "flow-schema-row-type", w.textContent = _.type, M.appendChild(w);
      const v = document.createElement("div");
      v.className = "flow-schema-handle flow-schema-handle--source", v.setAttribute("x-flow-handle:source.right", JSON.stringify(_.name)), M.appendChild(v);
      const $ = document.createElement("div");
      $.className = "flow-schema-handle flow-schema-handle--target flow-schema-handle--mirror", $.setAttribute("x-flow-handle:target.right", JSON.stringify(_.name)), M.appendChild($);
      const L = document.createElement("div");
      return L.className = "flow-schema-handle flow-schema-handle--source flow-schema-handle--mirror", L.setAttribute("x-flow-handle:source.left", JSON.stringify(_.name)), M.appendChild(L), M;
    };
    i(() => {
      if (!s.isConnected) return;
      const _ = a()?.data;
      _?.label, _?.kind;
      const S = _?.fields;
      if (Array.isArray(S))
        for (const N of S)
          N.name, N.type, N.key, N.required, N.icon, N.description, N.deprecated, N.tags, N.defaultValue;
      C();
    }), r(() => {
      p = !0;
      for (const _ of y.values())
        t.destroyTree(_);
      y.clear(), Vo(s), g = null, m = null, s.classList.remove("flow-schema-node"), Be(s, "flowSchemaNodeClass", null), delete s.dataset.flowSchemaNodeSub, h?.removeAttribute("data-flow-schema-node");
    });
  });
}
function Tm(t) {
  if (!Number.isFinite(t) || t < 0) return "";
  if (t < 1e3) return `${t}ms`;
  if (t < 6e4) {
    const o = t / 1e3;
    return t % 1e3 === 0 ? `${o}s` : `${o.toFixed(1)}s`;
  }
  const e = Math.floor(t / 6e4), n = Math.floor(t % 6e4 / 1e3);
  return n === 0 ? `${e}m` : `${e}m ${n}s`;
}
function sr(t) {
  for (; t.firstChild; ) t.removeChild(t.firstChild);
}
function Am(t) {
  t.directive("flow-wait", (e, n, { evaluate: o, effect: i, cleanup: r }) => {
    const s = e, a = () => {
      try {
        return o("typeof node !== 'undefined' ? node : null") ?? null;
      } catch {
        return null;
      }
    };
    s.classList.add("flow-wait-node"), s.setAttribute("data-flow-wait", "true");
    const l = () => {
      sr(s);
      const d = a()?.data;
      if (!d) return;
      const f = typeof d.label == "string" && d.label ? d.label : "Wait", u = typeof d.icon == "string" && d.icon ? d.icon : "", h = typeof d.durationMs == "number" ? d.durationMs : NaN, p = document.createElement("div");
      if (p.className = "flow-wait-header", u) {
        const C = document.createElement("span");
        C.className = "flow-wait-icon", C.textContent = u, p.appendChild(C);
      }
      const g = document.createElement("span");
      g.className = "flow-wait-label", g.textContent = f, p.appendChild(g);
      const m = document.createElement("span");
      m.className = "flow-wait-duration", m.textContent = Tm(h), p.appendChild(m), s.appendChild(p);
      const y = document.createElement("div");
      y.className = "flow-wait-handle flow-wait-handle--target", y.setAttribute("x-flow-handle:target.top", JSON.stringify("in")), s.appendChild(y);
      const x = document.createElement("div");
      x.className = "flow-wait-handle flow-wait-handle--source", x.setAttribute("x-flow-handle:source.bottom", JSON.stringify("out")), s.appendChild(x), t.initTree(s);
    };
    i(() => {
      if (!s.isConnected) return;
      const c = a()?.data;
      c?.durationMs, c?.label, c?.icon, l();
    }), r(() => {
      sr(s), s.classList.remove("flow-wait-node"), s.removeAttribute("data-flow-wait");
    });
  });
}
const rr = {
  equals: "==",
  notEquals: "!=",
  greaterThan: ">",
  lessThan: "<",
  greaterThanOrEqual: ">=",
  lessThanOrEqual: "<="
};
function gn(t) {
  return t === null || t === void 0 ? "null" : typeof t == "string" ? `'${t}'` : Array.isArray(t) ? `[${t.map(gn).join(", ")}]` : String(t);
}
function $m(t) {
  const { field: e, op: n, value: o } = t;
  return n in rr ? `${e} ${rr[n]} ${gn(o)}` : n === "in" ? `${e} in ${gn(o)}` : n === "notIn" ? `${e} not in ${gn(o)}` : n === "exists" ? `${e} exists` : n === "matches" ? `${e} ~ /${String(o)}/` : `${e} ${n} ${gn(o)}`;
}
function ar(t) {
  for (; t.firstChild; ) t.removeChild(t.firstChild);
}
function Im(t, e) {
  return t === "vertical" || t === "horizontal" ? t : e === "vertical" || e === "horizontal" ? e : "horizontal";
}
function Dm(t) {
  t.directive("flow-condition", (e, { expression: n }, { evaluate: o, effect: i, cleanup: r }) => {
    const s = e, a = () => {
      try {
        return o("typeof node !== 'undefined' ? node : null") ?? null;
      } catch {
        return null;
      }
    }, l = () => {
      if (n)
        try {
          return o(n);
        } catch {
          return n;
        }
    };
    s.classList.add("flow-condition-node");
    const c = () => {
      const f = a()?.data ?? {}, u = Im(l(), f.direction);
      s.setAttribute("data-flow-condition-direction", u);
      const h = f._branchTaken;
      h === "true" || h === "false" ? s.setAttribute("data-flow-condition-branch-taken", h) : s.removeAttribute("data-flow-condition-branch-taken"), ar(s);
      const p = typeof f.label == "string" && f.label ? f.label : "Condition", g = document.createElement("div");
      g.className = "flow-condition-header", g.textContent = p, s.appendChild(g);
      const m = document.createElement("div");
      m.className = "flow-condition-body", f.condition && typeof f.condition == "object" ? m.textContent = $m(f.condition) : typeof f.evaluate == "function" ? m.textContent = typeof f.evaluateLabel == "string" && f.evaluateLabel ? f.evaluateLabel : "[custom evaluator]" : m.textContent = "", s.appendChild(m);
      const y = document.createElement("div");
      y.className = "flow-condition-handle-target", y.setAttribute("data-flow-handle-direction", "target"), y.setAttribute("x-flow-handle:target", JSON.stringify("in")), s.appendChild(y);
      const x = document.createElement("div");
      x.className = "flow-condition-handle-source flow-condition-handle--true", x.setAttribute("data-flow-handle-direction", "source"), x.setAttribute("data-source-handle", "true"), x.setAttribute("x-flow-handle:source", JSON.stringify("true")), s.appendChild(x);
      const C = document.createElement("div");
      C.className = "flow-condition-handle-source flow-condition-handle--false", C.setAttribute("data-flow-handle-direction", "source"), C.setAttribute("data-source-handle", "false"), C.setAttribute("x-flow-handle:source", JSON.stringify("false")), s.appendChild(C), t.initTree(s);
    };
    i(() => {
      if (!s.isConnected) return;
      const d = a()?.data;
      d?.label, d?.condition, d?.condition?.field, d?.condition?.op, d?.condition?.value, d?.evaluate, d?.evaluateLabel, d?.direction, d?._branchTaken, c();
    }), r(() => {
      ar(s), s.classList.remove("flow-condition-node"), s.removeAttribute("data-flow-condition-direction"), s.removeAttribute("data-flow-condition-branch-taken");
    });
  });
}
function Rm(t) {
  t.directive(
    "flow-row-select",
    (e, { expression: n }, { evaluate: o, effect: i, cleanup: r }) => {
      e.classList.add("nodrag"), e.style.cursor = "pointer", e.setAttribute("data-flow-row-select", "");
      const s = (a) => {
        a.stopPropagation();
        const l = o(n);
        if (!l) return;
        const c = e.closest("[x-data]");
        if (!c) return;
        const d = t.$data(c);
        d?.toggleRowSelect && (a.shiftKey ? d.toggleRowSelect(l) : (d.deselectAllRows(), d.selectRow(l)));
      };
      e.addEventListener("click", s), i(() => {
        const a = o(n);
        if (!a) return;
        const l = e.closest("[x-data]");
        if (!l) return;
        const c = t.$data(l);
        if (!c?.isRowSelected) return;
        const d = c.isRowSelected(a);
        e.classList.toggle("flow-row-selected", d), e.setAttribute("aria-selected", String(d));
      }), r(() => {
        e.removeEventListener("click", s);
      });
    }
  );
}
function Hm(t) {
  t.directive(
    "flow-detail",
    (e, { expression: n, modifiers: o }, { evaluate: i, effect: r, cleanup: s }) => {
      if (n) {
        const f = Ge(e);
        if (!f) return;
        const u = t.$data(f);
        if (!u?.viewport) return;
        const h = e.style.display;
        r(() => {
          const p = i(n), g = u.viewport.zoom, m = p.min === void 0 || g >= p.min, y = p.max === void 0 || g <= p.max;
          e.style.display = m && y ? h : "none";
        }), s(() => {
          e.style.display = h;
        });
        return;
      }
      const a = new Set(o.filter((f) => f === "far" || f === "medium" || f === "close"));
      if (a.size === 0) return;
      const l = Ge(e);
      if (!l) return;
      const c = t.$data(l);
      if (!c?._zoomLevel) return;
      const d = e.style.display;
      r(() => {
        const f = c._zoomLevel;
        a.has(f) ? e.style.display = d : e.style.display = "none";
      }), s(() => {
        e.style.display = d;
      });
    }
  );
}
const lr = [
  "flow-init",
  "flow-connect",
  "flow-connect-start",
  "flow-connect-end",
  "flow-reconnect",
  "flow-nodes-change",
  "flow-edges-change",
  "flow-restore",
  "flow-selection-change",
  "flow-viewport-change",
  "flow-viewport-move-start",
  "flow-viewport-move",
  "flow-viewport-move-end",
  "flow-node-drag-start",
  "flow-node-drag",
  "flow-node-drag-end",
  "flow-node-click",
  "flow-edge-click",
  "flow-node-condense",
  "flow-node-uncondense",
  "flow-undo",
  "flow-redo"
], Fm = /* @__PURE__ */ new Set(["flow-viewport-move", "flow-viewport-change", "flow-node-drag"]);
function Om(t, e) {
  return e || !Fm.has(t);
}
const zm = ["perf", "events", "viewport", "state", "activity"], cr = ["fps", "memory", "counts", "visible"], dr = 30;
function Vm(t, e) {
  if (t && typeof t == "object" && Object.keys(t).length > 0)
    return t;
  const n = e.filter((i) => zm.includes(i));
  if (n.length === 0)
    return { perf: !0, events: !0, viewport: !0, state: !0, activity: !0 };
  const o = {};
  for (const i of n)
    o[i] = !0;
  return o;
}
function Bm(t) {
  return t.perf ? t.perf === !0 ? [...cr] : t.perf.filter((e) => cr.includes(e)) : [];
}
function qm(t) {
  return t.events ? t.events === !0 ? dr : t.events.max ?? dr : 0;
}
function dn(t, e) {
  const n = document.createElement("div");
  n.className = `flow-devtools-section ${e}`;
  const o = document.createElement("div");
  o.className = "flow-devtools-section-title", o.textContent = t, n.appendChild(o);
  const i = document.createElement("div");
  return i.className = "flow-devtools-section-content", n.appendChild(i), { wrapper: n, content: i };
}
function qe(t, e) {
  const n = document.createElement("div");
  n.className = `flow-devtools-row ${e}`;
  const o = document.createElement("span");
  o.className = "flow-devtools-label", o.textContent = t;
  const i = document.createElement("span");
  return i.className = "flow-devtools-value", i.textContent = "—", n.appendChild(o), n.appendChild(i), { row: n, valueEl: i };
}
function Ym(t) {
  t.directive(
    "flow-devtools",
    (e, { expression: n, modifiers: o }, { evaluate: i, effect: r, cleanup: s }) => {
      let a = null;
      if (n)
        try {
          a = i(n);
        } catch {
        }
      const l = Vm(a, o), c = e.closest("[x-data]");
      if (!c) return;
      const d = e.closest(".flow-container");
      if (!d) return;
      e.classList.add("flow-devtools", "canvas-overlay"), e.setAttribute("data-flow-devtools", "");
      const f = (H) => H.stopPropagation();
      e.addEventListener("wheel", f);
      const u = document.createElement("button");
      u.className = "flow-devtools-toggle nopan", u.title = "Devtools";
      const h = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      h.setAttribute("width", "14"), h.setAttribute("height", "14"), h.setAttribute("viewBox", "0 0 24 24"), h.setAttribute("fill", "none"), h.setAttribute("stroke", "currentColor"), h.setAttribute("stroke-width", "2"), h.setAttribute("stroke-linecap", "round"), h.setAttribute("stroke-linejoin", "round");
      const p = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
      p.setAttribute("points", "22 12 18 12 15 21 9 3 6 12 2 12"), h.appendChild(p), u.appendChild(h), e.appendChild(u);
      const g = document.createElement("div");
      g.className = "flow-devtools-panel", g.style.display = "none", g.style.userSelect = "none", e.appendChild(g);
      let m = !1, y = null;
      const x = () => {
        m = !m, g.style.display = m ? "" : "none", u.title = m ? "Collapse" : "Devtools", m && y?.(), m ? Q() : G();
      };
      u.addEventListener("click", x);
      const C = Bm(l);
      let b = null, E = null, _ = null, S = null, N = null;
      if (C.length > 0) {
        const { wrapper: H, content: q } = dn("Performance", "flow-devtools-perf");
        if (C.includes("fps")) {
          const { row: X, valueEl: K } = qe("FPS", "flow-devtools-fps");
          b = K, q.appendChild(X);
        }
        if (C.includes("memory")) {
          const { row: X, valueEl: K } = qe("Memory", "flow-devtools-memory");
          E = K, q.appendChild(X);
        }
        if (C.includes("counts")) {
          const X = qe("Nodes", "flow-devtools-counts");
          _ = X.valueEl, q.appendChild(X.row);
          const K = qe("Edges", "flow-devtools-counts");
          S = K.valueEl, q.appendChild(K.row);
        }
        if (C.includes("visible")) {
          const { row: X, valueEl: K } = qe("Visible", "flow-devtools-visible");
          N = K, q.appendChild(X);
        }
        g.appendChild(H);
      }
      const R = qm(l);
      let M = null;
      if (R > 0) {
        const { wrapper: H, content: q } = dn("Events", "flow-devtools-events"), X = document.createElement("button");
        X.className = "flow-devtools-clear-btn nopan", X.textContent = "Clear", X.addEventListener("click", () => {
          M && (M.textContent = ""), U.length = 0;
        }), H.querySelector(".flow-devtools-section-title").appendChild(X), M = document.createElement("div"), M.className = "flow-devtools-event-list", q.appendChild(M), g.appendChild(H);
      }
      let T = null, P = null, w = null;
      if (l.viewport) {
        const { wrapper: H, content: q } = dn("Viewport", "flow-devtools-viewport"), X = qe("X", "flow-devtools-vp-x");
        T = X.valueEl, q.appendChild(X.row);
        const K = qe("Y", "flow-devtools-vp-y");
        P = K.valueEl, q.appendChild(K.row);
        const F = qe("Zoom", "flow-devtools-vp-zoom");
        w = F.valueEl, q.appendChild(F.row), g.appendChild(H);
      }
      let v = null;
      if (l.state) {
        const { wrapper: H, content: q } = dn("Selection", "flow-devtools-state");
        v = document.createElement("div"), v.className = "flow-devtools-state-content", v.textContent = "No selection", q.appendChild(v), g.appendChild(H);
      }
      let $ = null, L = null, D = null, z = null;
      if (l.activity) {
        const { wrapper: H, content: q } = dn("Activity", "flow-devtools-activity"), X = qe("Animations", "flow-devtools-anim");
        $ = X.valueEl, q.appendChild(X.row);
        const K = qe("Particles", "flow-devtools-particles");
        L = K.valueEl, q.appendChild(K.row);
        const F = qe("Follow", "flow-devtools-follow");
        D = F.valueEl, q.appendChild(F.row);
        const J = qe("Timelines", "flow-devtools-timelines");
        z = J.valueEl, q.appendChild(J.row), g.appendChild(H);
      }
      let V = null, I = !1, k = 0, A = performance.now();
      const O = !!(b || E), j = () => {
        if (!I) return;
        k++;
        const H = performance.now();
        H - A >= 1e3 && (b && (b.textContent = String(Math.round(k * 1e3 / (H - A)))), k = 0, A = H, E && performance.memory && (E.textContent = Math.round(performance.memory.usedJSHeapSize / 1048576) + " MB")), V = requestAnimationFrame(j);
      }, Q = () => {
        !O || I || (I = !0, k = 0, A = performance.now(), V = requestAnimationFrame(j));
      }, G = () => {
        I = !1, V !== null && (cancelAnimationFrame(V), V = null);
      }, U = [];
      let Z = null;
      if (R > 0 && M) {
        Z = (H) => {
          if (!Om(H.type, m)) return;
          const q = H, X = q.type.replace("flow-", "");
          let K = "";
          try {
            K = q.detail ? JSON.stringify(q.detail).slice(0, 80) : "";
          } catch {
            K = "[circular]";
          }
          if (U.unshift({ name: X, time: Date.now(), detail: K }), U.length > R && U.pop(), !m) return;
          const F = M, J = document.createElement("div");
          J.className = "flow-devtools-event-entry";
          const ee = document.createElement("span");
          ee.className = "flow-devtools-event-name", ee.textContent = X;
          const W = document.createElement("span");
          W.className = "flow-devtools-event-age", W.textContent = "now";
          const re = document.createElement("span");
          for (re.className = "flow-devtools-event-detail", re.textContent = K, J.appendChild(ee), J.appendChild(W), J.appendChild(re), F.prepend(J); F.children.length > R; )
            F.removeChild(F.lastChild);
        };
        for (const H of lr)
          d.addEventListener(H, Z);
        y = () => {
          const H = M;
          H.textContent = "";
          for (const q of U) {
            const X = document.createElement("div");
            X.className = "flow-devtools-event-entry";
            const K = document.createElement("span");
            K.className = "flow-devtools-event-name", K.textContent = q.name;
            const F = document.createElement("span");
            F.className = "flow-devtools-event-age";
            const J = Math.round((Date.now() - q.time) / 1e3);
            F.textContent = J < 2 ? "now" : J + "s";
            const ee = document.createElement("span");
            ee.className = "flow-devtools-event-detail", ee.textContent = q.detail, X.appendChild(K), X.appendChild(F), X.appendChild(ee), H.appendChild(X);
          }
        };
      }
      r(() => {
        const H = t.$data(c);
        !H || !H.viewport || (T && (T.textContent = Math.round(H.viewport.x).toString()), P && (P.textContent = Math.round(H.viewport.y).toString()), w && (w.textContent = H.viewport.zoom.toFixed(2)));
      }), r(() => {
        const H = t.$data(c);
        if (H) {
          if (_ && (_.textContent = String(H.nodes?.length ?? 0)), S && (S.textContent = String(H.edges?.length ?? 0)), N && H._getVisibleNodeIds && (N.textContent = String(H._getVisibleNodeIds().size)), v) {
            const q = H.selectedNodes, X = H.selectedEdges;
            if (!((q?.size ?? 0) > 0 || (X?.size ?? 0) > 0))
              v.textContent = "No selection";
            else {
              if (v.textContent = "", q && q.size > 0)
                for (const F of q) {
                  const J = H.getNode?.(F);
                  if (!J) continue;
                  const ee = document.createElement("pre");
                  ee.className = "flow-devtools-json", ee.textContent = JSON.stringify({ id: J.id, position: J.position, data: J.data }, null, 2), v.appendChild(ee);
                }
              if (X && X.size > 0)
                for (const F of X) {
                  const J = H.edges?.find((W) => W.id === F);
                  if (!J) continue;
                  const ee = document.createElement("pre");
                  ee.className = "flow-devtools-json", ee.textContent = JSON.stringify({ id: J.id, source: J.source, target: J.target, type: J.type }, null, 2), v.appendChild(ee);
                }
            }
          }
          if ($) {
            const q = H._animator?._groups?.size ?? 0;
            $.textContent = String(q);
          }
          L && (L.textContent = String(H._activeParticles?.size ?? 0)), D && (D.textContent = H._followHandle ? "Active" : "Idle"), z && (z.textContent = String(H._activeTimelines?.size ?? 0));
        }
      }), s(() => {
        if (G(), u.removeEventListener("click", x), Z)
          for (const H of lr)
            d.removeEventListener(H, Z);
        e.removeEventListener("wheel", f), e.textContent = "", b = null, E = null, _ = null, S = null, N = null, M = null, T = null, P = null, w = null, v = null, $ = null, L = null, D = null, z = null;
      });
    }
  );
}
const Xm = {
  undo: { method: "undo", disabledWhen: (t) => !t.canUndo, aria: "disabled" },
  redo: { method: "redo", disabledWhen: (t) => !t.canRedo, aria: "disabled" },
  "fit-view": { method: "fitView", passExpression: !0 },
  "zoom-in": {
    method: "zoomIn",
    disabledWhen: (t) => t.viewport.zoom >= (t._config?.maxZoom ?? 2),
    aria: "disabled"
  },
  "zoom-out": {
    method: "zoomOut",
    disabledWhen: (t) => t.viewport.zoom <= (t._config?.minZoom ?? 0.5),
    aria: "disabled"
  },
  "toggle-interactive": { method: "toggleInteractive", aria: "pressed" },
  clear: { method: "$clear", disabledWhen: (t) => t.nodes.length === 0, aria: "disabled" },
  reset: { method: "$reset" },
  export: { method: "toImage", passExpression: !0 }
};
function Wm(t) {
  return Xm[t] ?? null;
}
function jm(t) {
  t.directive(
    "flow-action",
    (e, { value: n, expression: o }, { evaluate: i, effect: r, cleanup: s }) => {
      const l = Wm(n);
      if (!l)
        return;
      const c = Ge(e);
      if (!c)
        return;
      const d = t.$data(c);
      if (!d)
        return;
      const f = () => {
        const u = d[l.method];
        typeof u == "function" && (l.passExpression && o ? u.call(d, i(o)) : u.call(d));
      };
      e.addEventListener("click", f), (l.disabledWhen || l.aria) && r(() => {
        if (l.disabledWhen) {
          const u = l.disabledWhen(d);
          e.disabled = u, l.aria === "disabled" && e.setAttribute("aria-disabled", String(u));
        }
        l.aria === "pressed" && e.setAttribute("aria-pressed", String(!d.isInteractive));
      }), s(() => {
        e.removeEventListener("click", f);
      });
    }
  );
}
function Um(t, e) {
  if (t !== "node" && t !== "row") return null;
  const n = e.includes("clear");
  return { type: t, isClear: n };
}
const Bo = /* @__PURE__ */ new WeakMap();
function Gm(t) {
  t.directive(
    "flow-filter",
    (e, { value: n, expression: o, modifiers: i }, { evaluate: r, effect: s, cleanup: a }) => {
      const l = Um(n, i);
      if (!l) return;
      const c = Ge(e);
      if (!c) return;
      const d = t.$data(c);
      if (!d) return;
      let f = null;
      const u = () => {
        if (l.isClear) {
          if (l.type === "node")
            d.clearNodeFilter(), Bo.set(c, null);
          else
            for (const h of d.nodes)
              h.rowFilter && h.rowFilter !== "all" && d.setRowFilter(h.id, "all");
          return;
        }
        if (l.type === "node" && o)
          f = r(`[${o}]`)[0], d.setNodeFilter(f), Bo.set(c, f);
        else if (l.type === "row" && o) {
          const h = r(o);
          d.setRowFilter(h.node, h.predicate);
        }
      };
      e.addEventListener("click", u), e.style.cursor = "pointer", l.type === "node" && !l.isClear && s(() => {
        d.nodes.length;
        const h = Bo.get(c) === f && f !== null;
        e.classList.toggle("flow-filter-active", h), e.setAttribute("aria-pressed", String(h));
      }), a(() => {
        e.removeEventListener("click", u);
      });
    }
  );
}
function Zm(t) {
  if (typeof t == "string")
    return { target: t };
  if (t && typeof t == "object" && "target" in t) {
    const e = t;
    return {
      target: e.target,
      zoom: typeof e.zoom == "number" ? e.zoom : void 0,
      speed: typeof e.speed == "number" ? e.speed : void 0
    };
  }
  return null;
}
function Km(t) {
  t.directive(
    "flow-follow",
    (e, { expression: n, modifiers: o }, { evaluate: i, effect: r, cleanup: s }) => {
      const a = o.includes("toggle"), l = Ge(e);
      if (!l) return;
      const c = t.$data(l);
      if (!c?.follow) return;
      let d = null;
      const f = (h) => {
        e.classList.toggle("flow-following", h), e.setAttribute("aria-pressed", String(h));
      }, u = () => {
        if (!n) return;
        const h = i(n), p = Zm(h);
        if (!p) return;
        if (a && d) {
          d.stop(), d = null, f(!1);
          return;
        }
        d && d.stop();
        const g = {};
        p.zoom !== void 0 && (g.zoom = p.zoom), p.speed !== void 0 && (g.speed = p.speed), d = c.follow(p.target, g), f(!0), d?.finished && d.finished.then(() => {
          d = null, f(!1);
        });
      };
      e.addEventListener("click", u), s(() => {
        e.removeEventListener("click", u), d && (d.stop(), d = null);
      });
    }
  );
}
function Jm(t, e) {
  return t !== "save" && t !== "restore" ? null : { action: t, persist: e.includes("persist") };
}
const Di = /* @__PURE__ */ new Map();
function Qm(t, e) {
  Di.set(t, e);
}
function ey(t) {
  return Di.get(t) ?? null;
}
function ty(t) {
  return Di.has(t);
}
function qo(t) {
  return `alpineflow-snapshot-${t}`;
}
function ny(t) {
  t.directive(
    "flow-snapshot",
    (e, { value: n, expression: o, modifiers: i }, { evaluate: r, effect: s, cleanup: a }) => {
      const l = Jm(n, i);
      if (!l) return;
      const c = Ge(e);
      if (!c) return;
      const d = t.$data(c);
      if (!d) return;
      const f = () => {
        if (!o) return;
        const u = r(o);
        if (u)
          if (l.action === "save") {
            const h = d.toObject();
            l.persist ? localStorage.setItem(qo(u), JSON.stringify(h)) : Qm(u, h);
          } else {
            let h = null;
            if (l.persist) {
              const p = localStorage.getItem(qo(u));
              if (p)
                try {
                  h = JSON.parse(p);
                } catch {
                }
            } else
              h = ey(u);
            h && d.fromObject(h);
          }
      };
      e.addEventListener("click", f), l.action === "restore" && s(() => {
        if (!o) return;
        const u = r(o);
        if (!u) return;
        let h;
        l.persist ? h = localStorage.getItem(qo(u)) !== null : (d.nodes.length, h = ty(u)), e.disabled = !h, e.setAttribute("aria-disabled", String(!h));
      }), a(() => {
        e.removeEventListener("click", f);
      });
    }
  );
}
function oy(t) {
  const e = document.createElement("div");
  e.className = "flow-loading-indicator";
  const n = document.createElement("div");
  n.className = "flow-loading-indicator-node";
  const o = document.createElement("div");
  return o.className = "flow-loading-indicator-text", o.textContent = t ?? "Loading…", e.appendChild(n), e.appendChild(o), e;
}
function iy(t) {
  t.directive(
    "flow-loading",
    (e, { modifiers: n }, { effect: o, cleanup: i }) => {
      const r = Ge(e);
      if (!r) return;
      const s = t.$data(r);
      if (!s) return;
      e.classList.add("flow-loading-overlay"), e.childElementCount > 0 || e.textContent.trim().length > 0 || e.appendChild(oy(s._loadingText));
      const l = n.includes("fade");
      l && e.classList.add("flow-loading-fade"), r.setAttribute("data-flow-loading-directive", "");
      let c = null;
      o(() => {
        if (s.isLoading)
          e.style.display = "flex", l && (e.classList.remove("flow-loading-fade-out"), c && (e.removeEventListener("transitionend", c), c = null));
        else if (l) {
          c && e.removeEventListener("transitionend", c), e.classList.add("flow-loading-fade-out");
          const f = () => {
            e.style.display = "none", e.removeEventListener("transitionend", f), c = null;
          };
          c = f, e.addEventListener("transitionend", f);
        } else
          e.style.display = "none";
      }), i(() => {
        c && (e.removeEventListener("transitionend", c), c = null), r.removeAttribute("data-flow-loading-directive"), e.style.display = "", e.classList.remove("flow-loading-overlay", "flow-loading-fade", "flow-loading-fade-out");
      });
    }
  );
}
function sy(t) {
  t.directive(
    "flow-edge-toolbar",
    (e, { expression: n, modifiers: o }, { evaluate: i, effect: r, cleanup: s }) => {
      const a = e.closest("[data-flow-edge-id]");
      if (!a) return;
      const l = a.dataset.flowEdgeId, c = Ge(e);
      if (!c) return;
      const d = t.$data(c);
      if (!d) return;
      const f = c.querySelector(".flow-viewport");
      if (!f) return;
      try {
        const m = i("edge");
        m && t.addScopeToNode(e, { edge: m });
      } catch {
      }
      f.appendChild(e), e.classList.add("flow-edge-toolbar"), e.style.position = "absolute";
      const u = (m) => {
        m.stopPropagation();
      }, h = (m) => {
        m.stopPropagation();
      };
      e.addEventListener("pointerdown", u), e.addEventListener("click", h);
      const p = o.includes("below"), g = 20;
      r(() => {
        if (!d.edges.some((R) => R.id === l)) {
          e.removeEventListener("pointerdown", u), e.removeEventListener("click", h), e.classList.remove("flow-edge-toolbar"), e.remove();
          return;
        }
        const m = d.viewport?.zoom || 1, y = parseInt(e.getAttribute("data-flow-offset") ?? String(g), 10);
        let x = 0.5;
        if (n) {
          const R = i(n);
          typeof R == "number" && (x = R);
        }
        const C = a.querySelectorAll("path"), b = C.length > 1 ? C[1] : C[0];
        if (!b) return;
        const E = b.getTotalLength?.();
        if (!E) return;
        const _ = b.getPointAtLength(E * Math.max(0, Math.min(1, x))), S = y / m, N = p ? S : -S;
        e.style.left = `${_.x}px`, e.style.top = `${_.y + N}px`, e.style.transformOrigin = "0 0", e.style.transform = `scale(${1 / m}) translate(-50%, ${p ? "0%" : "-100%"})`;
      }), s(() => {
        e.removeEventListener("pointerdown", u), e.removeEventListener("click", h), e.classList.remove("flow-edge-toolbar"), e.remove();
      });
    }
  );
}
function ry(t) {
  t.magic("flow", (e) => {
    const n = e.closest("[data-flow-canvas]");
    return n ? t.$data(n) : (console.warn("[alpinejs-flow] $flow used outside of a flowCanvas context"), {});
  });
}
function ay(t) {
  t.store("flow", {
    instances: {},
    activeId: null,
    register(e, n) {
      this.instances[e] = n;
    },
    unregister(e) {
      this.activeId === e && (this.activeId = null), delete this.instances[e];
    },
    get(e) {
      return this.instances[e] ?? null;
    },
    activate(e) {
      if (this.activeId === e) return;
      if (this.activeId) {
        const o = this.instances[this.activeId];
        o && (o._active = !1, o._container?.classList.remove("flow-canvas-active"));
      }
      this.activeId = e;
      const n = this.instances[e];
      n && (n._active = !0, n._container?.classList.add("flow-canvas-active"));
    }
  });
}
function kw(t, e, n) {
  const o = n?.defaultDimensions?.width ?? we, i = n?.defaultDimensions?.height ?? _e, r = n?.padding ?? 20, s = n?.flowId ?? "ssr", l = t.filter((y) => !y.hidden).map((y) => ({
    ...y,
    dimensions: {
      width: y.dimensions?.width ?? o,
      height: y.dimensions?.height ?? i
    }
  })), c = /* @__PURE__ */ new Map();
  for (const y of l)
    c.set(y.id, y);
  const d = l.map((y) => ({
    id: y.id,
    x: y.position.x,
    y: y.position.y,
    width: y.dimensions.width,
    height: y.dimensions.height,
    ...y.class ? { class: y.class } : {},
    ...y.style ? {
      style: typeof y.style == "string" ? y.style : Object.entries(y.style).map(([x, C]) => `${x}:${C}`).join(";")
    } : {},
    data: y.data ?? {}
  })), f = e.filter((y) => !y.hidden), u = [], h = /* @__PURE__ */ new Map();
  for (const y of f) {
    const x = c.get(y.source), C = c.get(y.target);
    if (!x || !C)
      continue;
    let b, E;
    try {
      const M = ho(
        y,
        x,
        C,
        x.sourcePosition ?? "bottom",
        C.targetPosition ?? "top"
      );
      b = M.path, E = M.labelPosition;
    } catch {
      continue;
    }
    let _, S;
    if (y.markerStart) {
      const M = Yt(y.markerStart), T = Xt(M, s);
      h.has(T) || h.set(T, ro(M, T)), _ = `url(#${T})`;
    }
    if (y.markerEnd) {
      const M = Yt(y.markerEnd), T = Xt(M, s);
      h.has(T) || h.set(T, ro(M, T)), S = `url(#${T})`;
    }
    let N, R;
    if (y.label)
      if (E)
        N = E.x, R = E.y;
      else {
        const M = x.position.x + x.dimensions.width / 2, T = x.position.y + x.dimensions.height / 2, P = C.position.x + C.dimensions.width / 2, w = C.position.y + C.dimensions.height / 2;
        N = (M + P) / 2, R = (T + w) / 2;
      }
    u.push({
      id: y.id,
      source: y.source,
      target: y.target,
      pathD: b,
      ..._ ? { markerStart: _ } : {},
      ...S ? { markerEnd: S } : {},
      ...y.class ? { class: y.class } : {},
      ...y.label ? { label: y.label } : {},
      ...N !== void 0 ? { labelX: N } : {},
      ...R !== void 0 ? { labelY: R } : {}
    });
  }
  const p = Array.from(h.values()).join(`
`);
  let g, m;
  if (l.length === 0)
    g = { x: 0, y: 0, width: 0, height: 0 }, m = { x: 0, y: 0, zoom: 1 };
  else {
    const y = Gt(l);
    g = {
      x: y.x - r,
      y: y.y - r,
      width: y.width + r * 2,
      height: y.height + r * 2
    }, m = {
      x: -g.x,
      y: -g.y,
      zoom: 1
    };
  }
  return {
    nodes: d,
    edges: u,
    markers: p,
    viewBox: g,
    viewport: m
  };
}
const ur = /* @__PURE__ */ new WeakSet();
function Lw(t) {
  ur.has(t) || (ur.add(t), Ja(t), ay(t), Dp(t), jp(t), ah(t), Zf(t), Kf(t), Jf(t), Mp(t), Kp(t), tm(t), nm(t), im(t), rm(t), wm(t), vm(t), xm(t), Cm(t), Lm(t), Mm(t), Pm(t), Rm(t), Hm(t), Ym(t), jm(t), Gm(t), Km(t), ny(t), iy(t), sy(t), Nm(t), Am(t), Dm(t), ry(t));
}
function ly(t) {
  return t.replace(/\s+(?:@|:|x-)[\w.:-]*="[^"]*"/g, "").replace(/\s+externalResourcesRequired="[^"]*"/g, "");
}
const cy = [
  "stroke",
  "stroke-width",
  "stroke-opacity",
  "stroke-dasharray",
  "stroke-dashoffset",
  "stroke-linecap",
  "stroke-linejoin",
  "fill",
  "fill-opacity",
  "fill-rule",
  "opacity",
  "marker-start",
  "marker-mid",
  "marker-end"
];
function dy(t) {
  const e = t.querySelectorAll(
    "svg path, svg line, svg polyline, svg polygon, svg circle, svg ellipse, svg rect, svg text"
  ), n = [];
  for (const o of e) {
    const i = getComputedStyle(o), r = [];
    for (const s of cy) {
      const a = i.getPropertyValue(s);
      a && (r.push([s, o.getAttribute(s)]), o.setAttribute(s, a));
    }
    r.length > 0 && n.push(() => {
      for (const [s, a] of r)
        a === null ? o.removeAttribute(s) : o.setAttribute(s, a);
    });
  }
  return () => {
    for (const o of n) o();
  };
}
const uy = 16384, fy = 4e7, hy = 8;
function gy(t, e, n) {
  if (typeof t != "number" || !Number.isFinite(t) || t <= 0) return 1;
  const o = uy / Math.max(e, n), i = Math.sqrt(fy / Math.max(1, e * n)), r = Math.max(1, Math.min(hy, o, i));
  return Math.min(t, r);
}
const py = 0.92;
function my(t) {
  return typeof t != "number" || !Number.isFinite(t) ? py : Math.min(1, Math.max(0, t));
}
function yy(t) {
  return t.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}
function wy(t, e) {
  const n = t.indexOf(">");
  if (n === -1) return t;
  const o = `<rect width="100%" height="100%" fill="${yy(e)}"/>`;
  return t.slice(0, n + 1) + o + t.slice(n + 1);
}
function vy(t, e, n, o, i = 1, r = "png", s) {
  return new Promise((a, l) => {
    const c = new Image();
    c.onload = () => {
      const d = document.createElement("canvas");
      d.width = Math.round(e * i), d.height = Math.round(n * i);
      const f = d.getContext("2d");
      f.scale(i, i), f.fillStyle = o, f.fillRect(0, 0, e, n), f.drawImage(c, 0, 0, e, n), a(
        r === "jpeg" ? d.toDataURL("image/jpeg", my(s)) : d.toDataURL("image/png")
      );
    }, c.onerror = () => {
      l(new Error("Failed to render SVG to image"));
    }, c.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(t);
  });
}
async function _y(t, e, n, o, i = {}) {
  let r;
  try {
    ({ toSvg: r } = await Promise.resolve().then(() => yw));
  } catch {
    throw new Error("toImage() requires html-to-image. Install it with: npm install html-to-image");
  }
  const s = i.scope ?? "all", a = t.getBoundingClientRect(), l = s === "viewport" ? a.width : i.width ?? 1920, c = s === "viewport" ? a.height : i.height ?? 1080, d = i.background ?? (getComputedStyle(t).getPropertyValue("--flow-bg-color").trim() || "#ffffff"), f = e.style.transform, u = e.style.width, h = e.style.height, p = t.style.width, g = t.style.height, m = t.style.overflow, y = [];
  let x = null;
  try {
    if (s === "all") {
      const P = t.querySelectorAll("[data-flow-culled]");
      for (const D of P)
        D.style.display = "", y.push(D);
      const w = n.filter((D) => !D.hidden), v = Gt(w), $ = i.padding ?? 0.1, L = no(
        v,
        l,
        c,
        0.1,
        // minZoom
        2,
        // maxZoom
        $
      );
      e.style.transform = `translate(${L.x}px, ${L.y}px) scale(${L.zoom})`, e.style.width = `${l}px`, e.style.height = `${c}px`;
    }
    t.style.width = `${l}px`, t.style.height = `${c}px`, t.style.overflow = "hidden", await new Promise((P) => requestAnimationFrame(P)), x = dy(t);
    const C = i.includeOverlays, b = C === !0, E = typeof C == "object" ? C : {}, _ = [
      ["canvas-overlay", b || (E.toolbar ?? !1)],
      ["flow-minimap", b || (E.minimap ?? !1)],
      ["flow-controls", b || (E.controls ?? !1)],
      ["flow-panel", b || (E.panels ?? !1)],
      ["flow-selection-box", !1]
    ], S = await r(t, {
      width: l,
      height: c,
      skipFonts: !0,
      filter: (P) => {
        if (P.classList) {
          for (const [w, v] of _)
            if (P.classList.contains(w) && !v) return !1;
        }
        return !0;
      }
    }), N = "data:image/svg+xml;charset=utf-8,", R = ly(decodeURIComponent(S.substring(N.length))), M = i.format ?? "png";
    let T;
    if (M === "svg")
      T = N + encodeURIComponent(wy(R, d));
    else {
      const P = gy(i.scale, l, c);
      T = await vy(
        R,
        l,
        c,
        d,
        P,
        M,
        i.quality
      );
    }
    if (i.filename) {
      const P = document.createElement("a");
      P.download = i.filename, P.href = T, P.click();
    }
    return T;
  } finally {
    x?.(), e.style.transform = f, e.style.width = u, e.style.height = h, t.style.width = p, t.style.height = g, t.style.overflow = m;
    for (const C of y)
      C.style.display = "none";
  }
}
const by = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  captureFlowImage: _y
}, Symbol.toStringTag, { value: "Module" }));
function xy(t, e) {
  if (t.match(/^[a-z]+:\/\//i))
    return t;
  if (t.match(/^\/\//))
    return window.location.protocol + t;
  if (t.match(/^[a-z]+:/i))
    return t;
  const n = document.implementation.createHTMLDocument(), o = n.createElement("base"), i = n.createElement("a");
  return n.head.appendChild(o), n.body.appendChild(i), e && (o.href = e), i.href = t, i.href;
}
const Ey = /* @__PURE__ */ (() => {
  let t = 0;
  const e = () => (
    // eslint-disable-next-line no-bitwise
    `0000${(Math.random() * 36 ** 4 << 0).toString(36)}`.slice(-4)
  );
  return () => (t += 1, `u${e()}${t}`);
})();
function Et(t) {
  const e = [];
  for (let n = 0, o = t.length; n < o; n++)
    e.push(t[n]);
  return e;
}
let Ht = null;
function Ba(t = {}) {
  return Ht || (t.includeStyleProperties ? (Ht = t.includeStyleProperties, Ht) : (Ht = Et(window.getComputedStyle(document.documentElement)), Ht));
}
function mo(t, e) {
  const o = (t.ownerDocument.defaultView || window).getComputedStyle(t).getPropertyValue(e);
  return o ? parseFloat(o.replace("px", "")) : 0;
}
function Cy(t) {
  const e = mo(t, "border-left-width"), n = mo(t, "border-right-width");
  return t.clientWidth + e + n;
}
function Sy(t) {
  const e = mo(t, "border-top-width"), n = mo(t, "border-bottom-width");
  return t.clientHeight + e + n;
}
function Ri(t, e = {}) {
  const n = e.width || Cy(t), o = e.height || Sy(t);
  return { width: n, height: o };
}
function ky() {
  let t, e;
  try {
    e = process;
  } catch {
  }
  const n = e && e.env ? e.env.devicePixelRatio : null;
  return n && (t = parseInt(n, 10), Number.isNaN(t) && (t = 1)), t || window.devicePixelRatio || 1;
}
const Re = 16384;
function Ly(t) {
  (t.width > Re || t.height > Re) && (t.width > Re && t.height > Re ? t.width > t.height ? (t.height *= Re / t.width, t.width = Re) : (t.width *= Re / t.height, t.height = Re) : t.width > Re ? (t.height *= Re / t.width, t.width = Re) : (t.width *= Re / t.height, t.height = Re));
}
function My(t, e = {}) {
  return t.toBlob ? new Promise((n) => {
    t.toBlob(n, e.type ? e.type : "image/png", e.quality ? e.quality : 1);
  }) : new Promise((n) => {
    const o = window.atob(t.toDataURL(e.type ? e.type : void 0, e.quality ? e.quality : void 0).split(",")[1]), i = o.length, r = new Uint8Array(i);
    for (let s = 0; s < i; s += 1)
      r[s] = o.charCodeAt(s);
    n(new Blob([r], {
      type: e.type ? e.type : "image/png"
    }));
  });
}
function yo(t) {
  return new Promise((e, n) => {
    const o = new Image();
    o.onload = () => {
      o.decode().then(() => {
        requestAnimationFrame(() => e(o));
      });
    }, o.onerror = n, o.crossOrigin = "anonymous", o.decoding = "async", o.src = t;
  });
}
async function Py(t) {
  return Promise.resolve().then(() => new XMLSerializer().serializeToString(t)).then(encodeURIComponent).then((e) => `data:image/svg+xml;charset=utf-8,${e}`);
}
async function Ny(t, e, n) {
  const o = "http://www.w3.org/2000/svg", i = document.createElementNS(o, "svg"), r = document.createElementNS(o, "foreignObject");
  return i.setAttribute("width", `${e}`), i.setAttribute("height", `${n}`), i.setAttribute("viewBox", `0 0 ${e} ${n}`), r.setAttribute("width", "100%"), r.setAttribute("height", "100%"), r.setAttribute("x", "0"), r.setAttribute("y", "0"), r.setAttribute("externalResourcesRequired", "true"), i.appendChild(r), r.appendChild(t), Py(i);
}
const $e = (t, e) => {
  if (t instanceof e)
    return !0;
  const n = Object.getPrototypeOf(t);
  return n === null ? !1 : n.constructor.name === e.name || $e(n, e);
};
function Ty(t) {
  const e = t.getPropertyValue("content");
  return `${t.cssText} content: '${e.replace(/'|"/g, "")}';`;
}
function Ay(t, e) {
  return Ba(e).map((n) => {
    const o = t.getPropertyValue(n), i = t.getPropertyPriority(n);
    return `${n}: ${o}${i ? " !important" : ""};`;
  }).join(" ");
}
function $y(t, e, n, o) {
  const i = `.${t}:${e}`, r = n.cssText ? Ty(n) : Ay(n, o);
  return document.createTextNode(`${i}{${r}}`);
}
function fr(t, e, n, o) {
  const i = window.getComputedStyle(t, n), r = i.getPropertyValue("content");
  if (r === "" || r === "none")
    return;
  const s = Ey();
  try {
    e.className = `${e.className} ${s}`;
  } catch {
    return;
  }
  const a = document.createElement("style");
  a.appendChild($y(s, n, i, o)), e.appendChild(a);
}
function Iy(t, e, n) {
  fr(t, e, ":before", n), fr(t, e, ":after", n);
}
const hr = "application/font-woff", gr = "image/jpeg", Dy = {
  woff: hr,
  woff2: hr,
  ttf: "application/font-truetype",
  eot: "application/vnd.ms-fontobject",
  png: "image/png",
  jpg: gr,
  jpeg: gr,
  gif: "image/gif",
  tiff: "image/tiff",
  svg: "image/svg+xml",
  webp: "image/webp"
};
function Ry(t) {
  const e = /\.([^./]*?)$/g.exec(t);
  return e ? e[1] : "";
}
function Hi(t) {
  const e = Ry(t).toLowerCase();
  return Dy[e] || "";
}
function Hy(t) {
  return t.split(/,/)[1];
}
function hi(t) {
  return t.search(/^(data:)/) !== -1;
}
function Fy(t, e) {
  return `data:${e};base64,${t}`;
}
async function qa(t, e, n) {
  const o = await fetch(t, e);
  if (o.status === 404)
    throw new Error(`Resource "${o.url}" not found`);
  const i = await o.blob();
  return new Promise((r, s) => {
    const a = new FileReader();
    a.onerror = s, a.onloadend = () => {
      try {
        r(n({ res: o, result: a.result }));
      } catch (l) {
        s(l);
      }
    }, a.readAsDataURL(i);
  });
}
const Yo = {};
function Oy(t, e, n) {
  let o = t.replace(/\?.*/, "");
  return n && (o = t), /ttf|otf|eot|woff2?/i.test(o) && (o = o.replace(/.*\//, "")), e ? `[${e}]${o}` : o;
}
async function Fi(t, e, n) {
  const o = Oy(t, e, n.includeQueryParams);
  if (Yo[o] != null)
    return Yo[o];
  n.cacheBust && (t += (/\?/.test(t) ? "&" : "?") + (/* @__PURE__ */ new Date()).getTime());
  let i;
  try {
    const r = await qa(t, n.fetchRequestInit, ({ res: s, result: a }) => (e || (e = s.headers.get("Content-Type") || ""), Hy(a)));
    i = Fy(r, e);
  } catch (r) {
    i = n.imagePlaceholder || "";
    let s = `Failed to fetch resource: ${t}`;
    r && (s = typeof r == "string" ? r : r.message), s && console.warn(s);
  }
  return Yo[o] = i, i;
}
async function zy(t) {
  const e = t.toDataURL();
  return e === "data:," ? t.cloneNode(!1) : yo(e);
}
async function Vy(t, e) {
  if (t.currentSrc) {
    const r = document.createElement("canvas"), s = r.getContext("2d");
    r.width = t.clientWidth, r.height = t.clientHeight, s?.drawImage(t, 0, 0, r.width, r.height);
    const a = r.toDataURL();
    return yo(a);
  }
  const n = t.poster, o = Hi(n), i = await Fi(n, o, e);
  return yo(i);
}
async function By(t, e) {
  var n;
  try {
    if (!((n = t?.contentDocument) === null || n === void 0) && n.body)
      return await Lo(t.contentDocument.body, e, !0);
  } catch {
  }
  return t.cloneNode(!1);
}
async function qy(t, e) {
  return $e(t, HTMLCanvasElement) ? zy(t) : $e(t, HTMLVideoElement) ? Vy(t, e) : $e(t, HTMLIFrameElement) ? By(t, e) : t.cloneNode(Ya(t));
}
const Yy = (t) => t.tagName != null && t.tagName.toUpperCase() === "SLOT", Ya = (t) => t.tagName != null && t.tagName.toUpperCase() === "SVG";
async function Xy(t, e, n) {
  var o, i;
  if (Ya(e))
    return e;
  let r = [];
  return Yy(t) && t.assignedNodes ? r = Et(t.assignedNodes()) : $e(t, HTMLIFrameElement) && (!((o = t.contentDocument) === null || o === void 0) && o.body) ? r = Et(t.contentDocument.body.childNodes) : r = Et(((i = t.shadowRoot) !== null && i !== void 0 ? i : t).childNodes), r.length === 0 || $e(t, HTMLVideoElement) || await r.reduce((s, a) => s.then(() => Lo(a, n)).then((l) => {
    l && e.appendChild(l);
  }), Promise.resolve()), e;
}
function Wy(t, e, n) {
  const o = e.style;
  if (!o)
    return;
  const i = window.getComputedStyle(t);
  i.cssText ? (o.cssText = i.cssText, o.transformOrigin = i.transformOrigin) : Ba(n).forEach((r) => {
    let s = i.getPropertyValue(r);
    r === "font-size" && s.endsWith("px") && (s = `${Math.floor(parseFloat(s.substring(0, s.length - 2))) - 0.1}px`), $e(t, HTMLIFrameElement) && r === "display" && s === "inline" && (s = "block"), r === "d" && e.getAttribute("d") && (s = `path(${e.getAttribute("d")})`), o.setProperty(r, s, i.getPropertyPriority(r));
  });
}
function jy(t, e) {
  $e(t, HTMLTextAreaElement) && (e.innerHTML = t.value), $e(t, HTMLInputElement) && e.setAttribute("value", t.value);
}
function Uy(t, e) {
  if ($e(t, HTMLSelectElement)) {
    const o = Array.from(e.children).find((i) => t.value === i.getAttribute("value"));
    o && o.setAttribute("selected", "");
  }
}
function Gy(t, e, n) {
  return $e(e, Element) && (Wy(t, e, n), Iy(t, e, n), jy(t, e), Uy(t, e)), e;
}
async function Zy(t, e) {
  const n = t.querySelectorAll ? t.querySelectorAll("use") : [];
  if (n.length === 0)
    return t;
  const o = {};
  for (let r = 0; r < n.length; r++) {
    const a = n[r].getAttribute("xlink:href");
    if (a) {
      const l = t.querySelector(a), c = document.querySelector(a);
      !l && c && !o[a] && (o[a] = await Lo(c, e, !0));
    }
  }
  const i = Object.values(o);
  if (i.length) {
    const r = "http://www.w3.org/1999/xhtml", s = document.createElementNS(r, "svg");
    s.setAttribute("xmlns", r), s.style.position = "absolute", s.style.width = "0", s.style.height = "0", s.style.overflow = "hidden", s.style.display = "none";
    const a = document.createElementNS(r, "defs");
    s.appendChild(a);
    for (let l = 0; l < i.length; l++)
      a.appendChild(i[l]);
    t.appendChild(s);
  }
  return t;
}
async function Lo(t, e, n) {
  return !n && e.filter && !e.filter(t) ? null : Promise.resolve(t).then((o) => qy(o, e)).then((o) => Xy(t, o, e)).then((o) => Gy(t, o, e)).then((o) => Zy(o, e));
}
const Xa = /url\((['"]?)([^'"]+?)\1\)/g, Ky = /url\([^)]+\)\s*format\((["']?)([^"']+)\1\)/g, Jy = /src:\s*(?:url\([^)]+\)\s*format\([^)]+\)[,;]\s*)+/g;
function Qy(t) {
  const e = t.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1");
  return new RegExp(`(url\\(['"]?)(${e})(['"]?\\))`, "g");
}
function ew(t) {
  const e = [];
  return t.replace(Xa, (n, o, i) => (e.push(i), n)), e.filter((n) => !hi(n));
}
async function tw(t, e, n, o, i) {
  try {
    const r = n ? xy(e, n) : e, s = Hi(e);
    let a;
    return i || (a = await Fi(r, s, o)), t.replace(Qy(e), `$1${a}$3`);
  } catch {
  }
  return t;
}
function nw(t, { preferredFontFormat: e }) {
  return e ? t.replace(Jy, (n) => {
    for (; ; ) {
      const [o, , i] = Ky.exec(n) || [];
      if (!i)
        return "";
      if (i === e)
        return `src: ${o};`;
    }
  }) : t;
}
function Wa(t) {
  return t.search(Xa) !== -1;
}
async function ja(t, e, n) {
  if (!Wa(t))
    return t;
  const o = nw(t, n);
  return ew(o).reduce((r, s) => r.then((a) => tw(a, s, e, n)), Promise.resolve(o));
}
async function Ft(t, e, n) {
  var o;
  const i = (o = e.style) === null || o === void 0 ? void 0 : o.getPropertyValue(t);
  if (i) {
    const r = await ja(i, null, n);
    return e.style.setProperty(t, r, e.style.getPropertyPriority(t)), !0;
  }
  return !1;
}
async function ow(t, e) {
  await Ft("background", t, e) || await Ft("background-image", t, e), await Ft("mask", t, e) || await Ft("-webkit-mask", t, e) || await Ft("mask-image", t, e) || await Ft("-webkit-mask-image", t, e);
}
async function iw(t, e) {
  const n = $e(t, HTMLImageElement);
  if (!(n && !hi(t.src)) && !($e(t, SVGImageElement) && !hi(t.href.baseVal)))
    return;
  const o = n ? t.src : t.href.baseVal, i = await Fi(o, Hi(o), e);
  await new Promise((r, s) => {
    t.onload = r, t.onerror = e.onImageErrorHandler ? (...l) => {
      try {
        r(e.onImageErrorHandler(...l));
      } catch (c) {
        s(c);
      }
    } : s;
    const a = t;
    a.decode && (a.decode = r), a.loading === "lazy" && (a.loading = "eager"), n ? (t.srcset = "", t.src = i) : t.href.baseVal = i;
  });
}
async function sw(t, e) {
  const o = Et(t.childNodes).map((i) => Ua(i, e));
  await Promise.all(o).then(() => t);
}
async function Ua(t, e) {
  $e(t, Element) && (await ow(t, e), await iw(t, e), await sw(t, e));
}
function rw(t, e) {
  const { style: n } = t;
  e.backgroundColor && (n.backgroundColor = e.backgroundColor), e.width && (n.width = `${e.width}px`), e.height && (n.height = `${e.height}px`);
  const o = e.style;
  return o != null && Object.keys(o).forEach((i) => {
    n[i] = o[i];
  }), t;
}
const pr = {};
async function mr(t) {
  let e = pr[t];
  if (e != null)
    return e;
  const o = await (await fetch(t)).text();
  return e = { url: t, cssText: o }, pr[t] = e, e;
}
async function yr(t, e) {
  let n = t.cssText;
  const o = /url\(["']?([^"')]+)["']?\)/g, r = (n.match(/url\([^)]+\)/g) || []).map(async (s) => {
    let a = s.replace(o, "$1");
    return a.startsWith("https://") || (a = new URL(a, t.url).href), qa(a, e.fetchRequestInit, ({ result: l }) => (n = n.replace(s, `url(${l})`), [s, l]));
  });
  return Promise.all(r).then(() => n);
}
function wr(t) {
  if (t == null)
    return [];
  const e = [], n = /(\/\*[\s\S]*?\*\/)/gi;
  let o = t.replace(n, "");
  const i = new RegExp("((@.*?keyframes [\\s\\S]*?){([\\s\\S]*?}\\s*?)})", "gi");
  for (; ; ) {
    const l = i.exec(o);
    if (l === null)
      break;
    e.push(l[0]);
  }
  o = o.replace(i, "");
  const r = /@import[\s\S]*?url\([^)]*\)[\s\S]*?;/gi, s = "((\\s*?(?:\\/\\*[\\s\\S]*?\\*\\/)?\\s*?@media[\\s\\S]*?){([\\s\\S]*?)}\\s*?})|(([\\s\\S]*?){([\\s\\S]*?)})", a = new RegExp(s, "gi");
  for (; ; ) {
    let l = r.exec(o);
    if (l === null) {
      if (l = a.exec(o), l === null)
        break;
      r.lastIndex = a.lastIndex;
    } else
      a.lastIndex = r.lastIndex;
    e.push(l[0]);
  }
  return e;
}
async function aw(t, e) {
  const n = [], o = [];
  return t.forEach((i) => {
    if ("cssRules" in i)
      try {
        Et(i.cssRules || []).forEach((r, s) => {
          if (r.type === CSSRule.IMPORT_RULE) {
            let a = s + 1;
            const l = r.href, c = mr(l).then((d) => yr(d, e)).then((d) => wr(d).forEach((f) => {
              try {
                i.insertRule(f, f.startsWith("@import") ? a += 1 : i.cssRules.length);
              } catch (u) {
                console.error("Error inserting rule from remote css", {
                  rule: f,
                  error: u
                });
              }
            })).catch((d) => {
              console.error("Error loading remote css", d.toString());
            });
            o.push(c);
          }
        });
      } catch (r) {
        const s = t.find((a) => a.href == null) || document.styleSheets[0];
        i.href != null && o.push(mr(i.href).then((a) => yr(a, e)).then((a) => wr(a).forEach((l) => {
          s.insertRule(l, s.cssRules.length);
        })).catch((a) => {
          console.error("Error loading remote stylesheet", a);
        })), console.error("Error inlining remote css file", r);
      }
  }), Promise.all(o).then(() => (t.forEach((i) => {
    if ("cssRules" in i)
      try {
        Et(i.cssRules || []).forEach((r) => {
          n.push(r);
        });
      } catch (r) {
        console.error(`Error while reading CSS rules from ${i.href}`, r);
      }
  }), n));
}
function lw(t) {
  return t.filter((e) => e.type === CSSRule.FONT_FACE_RULE).filter((e) => Wa(e.style.getPropertyValue("src")));
}
async function cw(t, e) {
  if (t.ownerDocument == null)
    throw new Error("Provided element is not within a Document");
  const n = Et(t.ownerDocument.styleSheets), o = await aw(n, e);
  return lw(o);
}
function Ga(t) {
  return t.trim().replace(/["']/g, "");
}
function dw(t) {
  const e = /* @__PURE__ */ new Set();
  function n(o) {
    (o.style.fontFamily || getComputedStyle(o).fontFamily).split(",").forEach((r) => {
      e.add(Ga(r));
    }), Array.from(o.children).forEach((r) => {
      r instanceof HTMLElement && n(r);
    });
  }
  return n(t), e;
}
async function Za(t, e) {
  const n = await cw(t, e), o = dw(t);
  return (await Promise.all(n.filter((r) => o.has(Ga(r.style.fontFamily))).map((r) => {
    const s = r.parentStyleSheet ? r.parentStyleSheet.href : null;
    return ja(r.cssText, s, e);
  }))).join(`
`);
}
async function uw(t, e) {
  const n = e.fontEmbedCSS != null ? e.fontEmbedCSS : e.skipFonts ? null : await Za(t, e);
  if (n) {
    const o = document.createElement("style"), i = document.createTextNode(n);
    o.appendChild(i), t.firstChild ? t.insertBefore(o, t.firstChild) : t.appendChild(o);
  }
}
async function Ka(t, e = {}) {
  const { width: n, height: o } = Ri(t, e), i = await Lo(t, e, !0);
  return await uw(i, e), await Ua(i, e), rw(i, e), await Ny(i, n, o);
}
async function Tn(t, e = {}) {
  const { width: n, height: o } = Ri(t, e), i = await Ka(t, e), r = await yo(i), s = document.createElement("canvas"), a = s.getContext("2d"), l = e.pixelRatio || ky(), c = e.canvasWidth || n, d = e.canvasHeight || o;
  return s.width = c * l, s.height = d * l, e.skipAutoScale || Ly(s), s.style.width = `${c}`, s.style.height = `${d}`, e.backgroundColor && (a.fillStyle = e.backgroundColor, a.fillRect(0, 0, s.width, s.height)), a.drawImage(r, 0, 0, s.width, s.height), s;
}
async function fw(t, e = {}) {
  const { width: n, height: o } = Ri(t, e);
  return (await Tn(t, e)).getContext("2d").getImageData(0, 0, n, o).data;
}
async function hw(t, e = {}) {
  return (await Tn(t, e)).toDataURL();
}
async function gw(t, e = {}) {
  return (await Tn(t, e)).toDataURL("image/jpeg", e.quality || 1);
}
async function pw(t, e = {}) {
  const n = await Tn(t, e);
  return await My(n);
}
async function mw(t, e = {}) {
  return Za(t, e);
}
const yw = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getFontEmbedCSS: mw,
  toBlob: pw,
  toCanvas: Tn,
  toJpeg: gw,
  toPixelData: fw,
  toPng: hw,
  toSvg: Ka
}, Symbol.toStringTag, { value: "Module" }));
export {
  Wh as ComputeEngine,
  _f as FlowHistory,
  xs as SHORTCUT_DEFAULTS,
  bw as along,
  Uf as areNodesConnected,
  xa as buildNodeMap,
  Ca as clampToExtent,
  $o as clampToParent,
  kw as computeRenderPlan,
  As as computeValidationErrors,
  Ea as computeZIndex,
  Lw as default,
  Ew as drift,
  Ih as expandParentToFitChild,
  ri as getAbsolutePosition,
  oh as getAutoPanDelta,
  ao as getBezierPath,
  Xf as getConnectedEdges,
  xt as getDescendantIds,
  Ys as getEdgePosition,
  Ra as getFloatingEdgeParams,
  Wf as getIncomers,
  qs as getNodeIntersection,
  Gt as getNodesBounds,
  Yf as getNodesFullyInPolygon,
  gf as getNodesFullyInRect,
  qf as getNodesInPolygon,
  hf as getNodesInRect,
  ii as getOutgoers,
  ww as getSimpleBezierPath,
  Sw as getSimpleFloatingPosition,
  Cn as getSmoothStepPath,
  nh as getStepPath,
  ca as getStraightPath,
  no as getViewportForBounds,
  Ye as isConnectable,
  Qf as isDeletable,
  la as isDraggable,
  ws as isResizable,
  si as isSelectable,
  Je as matchesKey,
  bt as matchesModifier,
  vw as orbit,
  xw as pendulum,
  Li as pointInPolygon,
  Bf as polygonIntersectsAABB,
  Pf as registerMarker,
  mn as resolveChildValidation,
  lh as resolveShortcuts,
  $t as sortNodesTopological,
  Cw as stagger,
  ct as toAbsoluteNode,
  co as toAbsoluteNodes,
  Ma as validateChildAdd,
  uo as validateChildRemove,
  _w as wave
};
//# sourceMappingURL=alpineflow.bundle.esm.js.map
