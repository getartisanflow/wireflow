let ei = null;
function fl(t) {
  ei = t;
}
function ke() {
  if (!ei)
    throw new Error("[AlpineFlow] Alpine not initialized. Ensure Alpine.plugin(AlpineFlow) was called.");
  return ei;
}
var hl = { value: () => {
} };
function ko() {
  for (var t = 0, e = arguments.length, n = {}, o; t < e; ++t) {
    if (!(o = arguments[t] + "") || o in n || /[\s.]/.test(o)) throw new Error("illegal type: " + o);
    n[o] = [];
  }
  return new Gn(n);
}
function Gn(t) {
  this._ = t;
}
function gl(t, e) {
  return t.trim().split(/^|\s+/).map(function(n) {
    var o = "", i = n.indexOf(".");
    if (i >= 0 && (o = n.slice(i + 1), n = n.slice(0, i)), n && !e.hasOwnProperty(n)) throw new Error("unknown type: " + n);
    return { type: n, name: o };
  });
}
Gn.prototype = ko.prototype = {
  constructor: Gn,
  on: function(t, e) {
    var n = this._, o = gl(t + "", n), i, s = -1, a = o.length;
    if (arguments.length < 2) {
      for (; ++s < a; ) if ((i = (t = o[s]).type) && (i = pl(n[i], t.name))) return i;
      return;
    }
    if (e != null && typeof e != "function") throw new Error("invalid callback: " + e);
    for (; ++s < a; )
      if (i = (t = o[s]).type) n[i] = Zi(n[i], t.name, e);
      else if (e == null) for (i in n) n[i] = Zi(n[i], t.name, null);
    return this;
  },
  copy: function() {
    var t = {}, e = this._;
    for (var n in e) t[n] = e[n].slice();
    return new Gn(t);
  },
  call: function(t, e) {
    if ((i = arguments.length - 2) > 0) for (var n = new Array(i), o = 0, i, s; o < i; ++o) n[o] = arguments[o + 2];
    if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    for (s = this._[t], o = 0, i = s.length; o < i; ++o) s[o].value.apply(e, n);
  },
  apply: function(t, e, n) {
    if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    for (var o = this._[t], i = 0, s = o.length; i < s; ++i) o[i].value.apply(e, n);
  }
};
function pl(t, e) {
  for (var n = 0, o = t.length, i; n < o; ++n)
    if ((i = t[n]).name === e)
      return i.value;
}
function Zi(t, e, n) {
  for (var o = 0, i = t.length; o < i; ++o)
    if (t[o].name === e) {
      t[o] = hl, t = t.slice(0, o).concat(t.slice(o + 1));
      break;
    }
  return n != null && t.push({ name: e, value: n }), t;
}
var ti = "http://www.w3.org/1999/xhtml";
const Ki = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: ti,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function Lo(t) {
  var e = t += "", n = e.indexOf(":");
  return n >= 0 && (e = t.slice(0, n)) !== "xmlns" && (t = t.slice(n + 1)), Ki.hasOwnProperty(e) ? { space: Ki[e], local: t } : t;
}
function ml(t) {
  return function() {
    var e = this.ownerDocument, n = this.namespaceURI;
    return n === ti && e.documentElement.namespaceURI === ti ? e.createElement(t) : e.createElementNS(n, t);
  };
}
function yl(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function Tr(t) {
  var e = Lo(t);
  return (e.local ? yl : ml)(e);
}
function wl() {
}
function Ci(t) {
  return t == null ? wl : function() {
    return this.querySelector(t);
  };
}
function _l(t) {
  typeof t != "function" && (t = Ci(t));
  for (var e = this._groups, n = e.length, o = new Array(n), i = 0; i < n; ++i)
    for (var s = e[i], a = s.length, r = o[i] = new Array(a), l, c, d = 0; d < a; ++d)
      (l = s[d]) && (c = t.call(l, l.__data__, d, s)) && ("__data__" in l && (c.__data__ = l.__data__), r[d] = c);
  return new ze(o, this._parents);
}
function vl(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function bl() {
  return [];
}
function Ir(t) {
  return t == null ? bl : function() {
    return this.querySelectorAll(t);
  };
}
function xl(t) {
  return function() {
    return vl(t.apply(this, arguments));
  };
}
function El(t) {
  typeof t == "function" ? t = xl(t) : t = Ir(t);
  for (var e = this._groups, n = e.length, o = [], i = [], s = 0; s < n; ++s)
    for (var a = e[s], r = a.length, l, c = 0; c < r; ++c)
      (l = a[c]) && (o.push(t.call(l, l.__data__, c, a)), i.push(l));
  return new ze(o, i);
}
function $r(t) {
  return function() {
    return this.matches(t);
  };
}
function Dr(t) {
  return function(e) {
    return e.matches(t);
  };
}
var Cl = Array.prototype.find;
function Sl(t) {
  return function() {
    return Cl.call(this.children, t);
  };
}
function kl() {
  return this.firstElementChild;
}
function Ll(t) {
  return this.select(t == null ? kl : Sl(typeof t == "function" ? t : Dr(t)));
}
var Ml = Array.prototype.filter;
function Pl() {
  return Array.from(this.children);
}
function Nl(t) {
  return function() {
    return Ml.call(this.children, t);
  };
}
function Al(t) {
  return this.selectAll(t == null ? Pl : Nl(typeof t == "function" ? t : Dr(t)));
}
function Tl(t) {
  typeof t != "function" && (t = $r(t));
  for (var e = this._groups, n = e.length, o = new Array(n), i = 0; i < n; ++i)
    for (var s = e[i], a = s.length, r = o[i] = [], l, c = 0; c < a; ++c)
      (l = s[c]) && t.call(l, l.__data__, c, s) && r.push(l);
  return new ze(o, this._parents);
}
function Rr(t) {
  return new Array(t.length);
}
function Il() {
  return new ze(this._enter || this._groups.map(Rr), this._parents);
}
function no(t, e) {
  this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = e;
}
no.prototype = {
  constructor: no,
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
function $l(t) {
  return function() {
    return t;
  };
}
function Dl(t, e, n, o, i, s) {
  for (var a = 0, r, l = e.length, c = s.length; a < c; ++a)
    (r = e[a]) ? (r.__data__ = s[a], o[a] = r) : n[a] = new no(t, s[a]);
  for (; a < l; ++a)
    (r = e[a]) && (i[a] = r);
}
function Rl(t, e, n, o, i, s, a) {
  var r, l, c = /* @__PURE__ */ new Map(), d = e.length, f = s.length, u = new Array(d), h;
  for (r = 0; r < d; ++r)
    (l = e[r]) && (u[r] = h = a.call(l, l.__data__, r, e) + "", c.has(h) ? i[r] = l : c.set(h, l));
  for (r = 0; r < f; ++r)
    h = a.call(t, s[r], r, s) + "", (l = c.get(h)) ? (o[r] = l, l.__data__ = s[r], c.delete(h)) : n[r] = new no(t, s[r]);
  for (r = 0; r < d; ++r)
    (l = e[r]) && c.get(u[r]) === l && (i[r] = l);
}
function Hl(t) {
  return t.__data__;
}
function Fl(t, e) {
  if (!arguments.length) return Array.from(this, Hl);
  var n = e ? Rl : Dl, o = this._parents, i = this._groups;
  typeof t != "function" && (t = $l(t));
  for (var s = i.length, a = new Array(s), r = new Array(s), l = new Array(s), c = 0; c < s; ++c) {
    var d = o[c], f = i[c], u = f.length, h = Ol(t.call(d, d && d.__data__, c, o)), p = h.length, g = r[c] = new Array(p), m = a[c] = new Array(p), y = l[c] = new Array(u);
    n(d, f, g, m, y, h, e);
    for (var x = 0, k = 0, _, S; x < p; ++x)
      if (_ = g[x]) {
        for (x >= k && (k = x + 1); !(S = m[k]) && ++k < p; ) ;
        _._next = S || null;
      }
  }
  return a = new ze(a, o), a._enter = r, a._exit = l, a;
}
function Ol(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function zl() {
  return new ze(this._exit || this._groups.map(Rr), this._parents);
}
function Vl(t, e, n) {
  var o = this.enter(), i = this, s = this.exit();
  return typeof t == "function" ? (o = t(o), o && (o = o.selection())) : o = o.append(t + ""), e != null && (i = e(i), i && (i = i.selection())), n == null ? s.remove() : n(s), o && i ? o.merge(i).order() : i;
}
function Bl(t) {
  for (var e = t.selection ? t.selection() : t, n = this._groups, o = e._groups, i = n.length, s = o.length, a = Math.min(i, s), r = new Array(i), l = 0; l < a; ++l)
    for (var c = n[l], d = o[l], f = c.length, u = r[l] = new Array(f), h, p = 0; p < f; ++p)
      (h = c[p] || d[p]) && (u[p] = h);
  for (; l < i; ++l)
    r[l] = n[l];
  return new ze(r, this._parents);
}
function ql() {
  for (var t = this._groups, e = -1, n = t.length; ++e < n; )
    for (var o = t[e], i = o.length - 1, s = o[i], a; --i >= 0; )
      (a = o[i]) && (s && a.compareDocumentPosition(s) ^ 4 && s.parentNode.insertBefore(a, s), s = a);
  return this;
}
function Yl(t) {
  t || (t = Xl);
  function e(f, u) {
    return f && u ? t(f.__data__, u.__data__) : !f - !u;
  }
  for (var n = this._groups, o = n.length, i = new Array(o), s = 0; s < o; ++s) {
    for (var a = n[s], r = a.length, l = i[s] = new Array(r), c, d = 0; d < r; ++d)
      (c = a[d]) && (l[d] = c);
    l.sort(e);
  }
  return new ze(i, this._parents).order();
}
function Xl(t, e) {
  return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function Wl() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function jl() {
  return Array.from(this);
}
function Ul() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var o = t[e], i = 0, s = o.length; i < s; ++i) {
      var a = o[i];
      if (a) return a;
    }
  return null;
}
function Gl() {
  let t = 0;
  for (const e of this) ++t;
  return t;
}
function Zl() {
  return !this.node();
}
function Kl(t) {
  for (var e = this._groups, n = 0, o = e.length; n < o; ++n)
    for (var i = e[n], s = 0, a = i.length, r; s < a; ++s)
      (r = i[s]) && t.call(r, r.__data__, s, i);
  return this;
}
function Jl(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function Ql(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function ec(t, e) {
  return function() {
    this.setAttribute(t, e);
  };
}
function tc(t, e) {
  return function() {
    this.setAttributeNS(t.space, t.local, e);
  };
}
function nc(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttribute(t) : this.setAttribute(t, n);
  };
}
function oc(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, n);
  };
}
function ic(t, e) {
  var n = Lo(t);
  if (arguments.length < 2) {
    var o = this.node();
    return n.local ? o.getAttributeNS(n.space, n.local) : o.getAttribute(n);
  }
  return this.each((e == null ? n.local ? Ql : Jl : typeof e == "function" ? n.local ? oc : nc : n.local ? tc : ec)(n, e));
}
function Hr(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function sc(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function rc(t, e, n) {
  return function() {
    this.style.setProperty(t, e, n);
  };
}
function ac(t, e, n) {
  return function() {
    var o = e.apply(this, arguments);
    o == null ? this.style.removeProperty(t) : this.style.setProperty(t, o, n);
  };
}
function lc(t, e, n) {
  return arguments.length > 1 ? this.each((e == null ? sc : typeof e == "function" ? ac : rc)(t, e, n ?? "")) : Wt(this.node(), t);
}
function Wt(t, e) {
  return t.style.getPropertyValue(e) || Hr(t).getComputedStyle(t, null).getPropertyValue(e);
}
function cc(t) {
  return function() {
    delete this[t];
  };
}
function dc(t, e) {
  return function() {
    this[t] = e;
  };
}
function uc(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? delete this[t] : this[t] = n;
  };
}
function fc(t, e) {
  return arguments.length > 1 ? this.each((e == null ? cc : typeof e == "function" ? uc : dc)(t, e)) : this.node()[t];
}
function Fr(t) {
  return t.trim().split(/^|\s+/);
}
function Si(t) {
  return t.classList || new Or(t);
}
function Or(t) {
  this._node = t, this._names = Fr(t.getAttribute("class") || "");
}
Or.prototype = {
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
function zr(t, e) {
  for (var n = Si(t), o = -1, i = e.length; ++o < i; ) n.add(e[o]);
}
function Vr(t, e) {
  for (var n = Si(t), o = -1, i = e.length; ++o < i; ) n.remove(e[o]);
}
function hc(t) {
  return function() {
    zr(this, t);
  };
}
function gc(t) {
  return function() {
    Vr(this, t);
  };
}
function pc(t, e) {
  return function() {
    (e.apply(this, arguments) ? zr : Vr)(this, t);
  };
}
function mc(t, e) {
  var n = Fr(t + "");
  if (arguments.length < 2) {
    for (var o = Si(this.node()), i = -1, s = n.length; ++i < s; ) if (!o.contains(n[i])) return !1;
    return !0;
  }
  return this.each((typeof e == "function" ? pc : e ? hc : gc)(n, e));
}
function yc() {
  this.textContent = "";
}
function wc(t) {
  return function() {
    this.textContent = t;
  };
}
function _c(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.textContent = e ?? "";
  };
}
function vc(t) {
  return arguments.length ? this.each(t == null ? yc : (typeof t == "function" ? _c : wc)(t)) : this.node().textContent;
}
function bc() {
  this.innerHTML = "";
}
function xc(t) {
  return function() {
    this.innerHTML = t;
  };
}
function Ec(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.innerHTML = e ?? "";
  };
}
function Cc(t) {
  return arguments.length ? this.each(t == null ? bc : (typeof t == "function" ? Ec : xc)(t)) : this.node().innerHTML;
}
function Sc() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function kc() {
  return this.each(Sc);
}
function Lc() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Mc() {
  return this.each(Lc);
}
function Pc(t) {
  var e = typeof t == "function" ? t : Tr(t);
  return this.select(function() {
    return this.appendChild(e.apply(this, arguments));
  });
}
function Nc() {
  return null;
}
function Ac(t, e) {
  var n = typeof t == "function" ? t : Tr(t), o = e == null ? Nc : typeof e == "function" ? e : Ci(e);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), o.apply(this, arguments) || null);
  });
}
function Tc() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function Ic() {
  return this.each(Tc);
}
function $c() {
  var t = this.cloneNode(!1), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function Dc() {
  var t = this.cloneNode(!0), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function Rc(t) {
  return this.select(t ? Dc : $c);
}
function Hc(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function Fc(t) {
  return function(e) {
    t.call(this, e, this.__data__);
  };
}
function Oc(t) {
  return t.trim().split(/^|\s+/).map(function(e) {
    var n = "", o = e.indexOf(".");
    return o >= 0 && (n = e.slice(o + 1), e = e.slice(0, o)), { type: e, name: n };
  });
}
function zc(t) {
  return function() {
    var e = this.__on;
    if (e) {
      for (var n = 0, o = -1, i = e.length, s; n < i; ++n)
        s = e[n], (!t.type || s.type === t.type) && s.name === t.name ? this.removeEventListener(s.type, s.listener, s.options) : e[++o] = s;
      ++o ? e.length = o : delete this.__on;
    }
  };
}
function Vc(t, e, n) {
  return function() {
    var o = this.__on, i, s = Fc(e);
    if (o) {
      for (var a = 0, r = o.length; a < r; ++a)
        if ((i = o[a]).type === t.type && i.name === t.name) {
          this.removeEventListener(i.type, i.listener, i.options), this.addEventListener(i.type, i.listener = s, i.options = n), i.value = e;
          return;
        }
    }
    this.addEventListener(t.type, s, n), i = { type: t.type, name: t.name, value: e, listener: s, options: n }, o ? o.push(i) : this.__on = [i];
  };
}
function Bc(t, e, n) {
  var o = Oc(t + ""), i, s = o.length, a;
  if (arguments.length < 2) {
    var r = this.node().__on;
    if (r) {
      for (var l = 0, c = r.length, d; l < c; ++l)
        for (i = 0, d = r[l]; i < s; ++i)
          if ((a = o[i]).type === d.type && a.name === d.name)
            return d.value;
    }
    return;
  }
  for (r = e ? Vc : zc, i = 0; i < s; ++i) this.each(r(o[i], e, n));
  return this;
}
function Br(t, e, n) {
  var o = Hr(t), i = o.CustomEvent;
  typeof i == "function" ? i = new i(e, n) : (i = o.document.createEvent("Event"), n ? (i.initEvent(e, n.bubbles, n.cancelable), i.detail = n.detail) : i.initEvent(e, !1, !1)), t.dispatchEvent(i);
}
function qc(t, e) {
  return function() {
    return Br(this, t, e);
  };
}
function Yc(t, e) {
  return function() {
    return Br(this, t, e.apply(this, arguments));
  };
}
function Xc(t, e) {
  return this.each((typeof e == "function" ? Yc : qc)(t, e));
}
function* Wc() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var o = t[e], i = 0, s = o.length, a; i < s; ++i)
      (a = o[i]) && (yield a);
}
var qr = [null];
function ze(t, e) {
  this._groups = t, this._parents = e;
}
function Nn() {
  return new ze([[document.documentElement]], qr);
}
function jc() {
  return this;
}
ze.prototype = Nn.prototype = {
  constructor: ze,
  select: _l,
  selectAll: El,
  selectChild: Ll,
  selectChildren: Al,
  filter: Tl,
  data: Fl,
  enter: Il,
  exit: zl,
  join: Vl,
  merge: Bl,
  selection: jc,
  order: ql,
  sort: Yl,
  call: Wl,
  nodes: jl,
  node: Ul,
  size: Gl,
  empty: Zl,
  each: Kl,
  attr: ic,
  style: lc,
  property: fc,
  classed: mc,
  text: vc,
  html: Cc,
  raise: kc,
  lower: Mc,
  append: Pc,
  insert: Ac,
  remove: Ic,
  clone: Rc,
  datum: Hc,
  on: Bc,
  dispatch: Xc,
  [Symbol.iterator]: Wc
};
function We(t) {
  return typeof t == "string" ? new ze([[document.querySelector(t)]], [document.documentElement]) : new ze([[t]], qr);
}
function Uc(t) {
  let e;
  for (; e = t.sourceEvent; ) t = e;
  return t;
}
function ot(t, e) {
  if (t = Uc(t), e === void 0 && (e = t.currentTarget), e) {
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
const Gc = { passive: !1 }, vn = { capture: !0, passive: !1 };
function Ho(t) {
  t.stopImmediatePropagation();
}
function Bt(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function Yr(t) {
  var e = t.document.documentElement, n = We(t).on("dragstart.drag", Bt, vn);
  "onselectstart" in e ? n.on("selectstart.drag", Bt, vn) : (e.__noselect = e.style.MozUserSelect, e.style.MozUserSelect = "none");
}
function Xr(t, e) {
  var n = t.document.documentElement, o = We(t).on("dragstart.drag", null);
  e && (o.on("click.drag", Bt, vn), setTimeout(function() {
    o.on("click.drag", null);
  }, 0)), "onselectstart" in n ? o.on("selectstart.drag", null) : (n.style.MozUserSelect = n.__noselect, delete n.__noselect);
}
const Hn = (t) => () => t;
function ni(t, {
  sourceEvent: e,
  subject: n,
  target: o,
  identifier: i,
  active: s,
  x: a,
  y: r,
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
    active: { value: s, enumerable: !0, configurable: !0 },
    x: { value: a, enumerable: !0, configurable: !0 },
    y: { value: r, enumerable: !0, configurable: !0 },
    dx: { value: l, enumerable: !0, configurable: !0 },
    dy: { value: c, enumerable: !0, configurable: !0 },
    _: { value: d }
  });
}
ni.prototype.on = function() {
  var t = this._.on.apply(this._, arguments);
  return t === this._ ? this : t;
};
function Zc(t) {
  return !t.ctrlKey && !t.button;
}
function Kc() {
  return this.parentNode;
}
function Jc(t, e) {
  return e ?? { x: t.x, y: t.y };
}
function Qc() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function ed() {
  var t = Zc, e = Kc, n = Jc, o = Qc, i = {}, s = ko("start", "drag", "end"), a = 0, r, l, c, d, f = 0;
  function u(_) {
    _.on("mousedown.drag", h).filter(o).on("touchstart.drag", m).on("touchmove.drag", y, Gc).on("touchend.drag touchcancel.drag", x).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function h(_, S) {
    if (!(d || !t.call(this, _, S))) {
      var b = k(this, e.call(this, _, S), _, S, "mouse");
      b && (We(_.view).on("mousemove.drag", p, vn).on("mouseup.drag", g, vn), Yr(_.view), Ho(_), c = !1, r = _.clientX, l = _.clientY, b("start", _));
    }
  }
  function p(_) {
    if (Bt(_), !c) {
      var S = _.clientX - r, b = _.clientY - l;
      c = S * S + b * b > f;
    }
    i.mouse("drag", _);
  }
  function g(_) {
    We(_.view).on("mousemove.drag mouseup.drag", null), Xr(_.view, c), Bt(_), i.mouse("end", _);
  }
  function m(_, S) {
    if (t.call(this, _, S)) {
      var b = _.changedTouches, E = e.call(this, _, S), M = b.length, R, L;
      for (R = 0; R < M; ++R)
        (L = k(this, E, _, S, b[R].identifier, b[R])) && (Ho(_), L("start", _, b[R]));
    }
  }
  function y(_) {
    var S = _.changedTouches, b = S.length, E, M;
    for (E = 0; E < b; ++E)
      (M = i[S[E].identifier]) && (Bt(_), M("drag", _, S[E]));
  }
  function x(_) {
    var S = _.changedTouches, b = S.length, E, M;
    for (d && clearTimeout(d), d = setTimeout(function() {
      d = null;
    }, 500), E = 0; E < b; ++E)
      (M = i[S[E].identifier]) && (Ho(_), M("end", _, S[E]));
  }
  function k(_, S, b, E, M, R) {
    var L = s.copy(), D = ot(R || b, S), A, v, w;
    if ((w = n.call(_, new ni("beforestart", {
      sourceEvent: b,
      target: u,
      identifier: M,
      active: a,
      x: D[0],
      y: D[1],
      dx: 0,
      dy: 0,
      dispatch: L
    }), E)) != null)
      return A = w.x - D[0] || 0, v = w.y - D[1] || 0, function T(P, $, H) {
        var z = D, I;
        switch (P) {
          case "start":
            i[M] = T, I = a++;
            break;
          case "end":
            delete i[M], --a;
          // falls through
          case "drag":
            D = ot(H || $, S), I = a;
            break;
        }
        L.call(
          P,
          _,
          new ni(P, {
            sourceEvent: $,
            subject: w,
            target: u,
            identifier: M,
            active: I,
            x: D[0] + A,
            y: D[1] + v,
            dx: D[0] - z[0],
            dy: D[1] - z[1],
            dispatch: L
          }),
          E
        );
      };
  }
  return u.filter = function(_) {
    return arguments.length ? (t = typeof _ == "function" ? _ : Hn(!!_), u) : t;
  }, u.container = function(_) {
    return arguments.length ? (e = typeof _ == "function" ? _ : Hn(_), u) : e;
  }, u.subject = function(_) {
    return arguments.length ? (n = typeof _ == "function" ? _ : Hn(_), u) : n;
  }, u.touchable = function(_) {
    return arguments.length ? (o = typeof _ == "function" ? _ : Hn(!!_), u) : o;
  }, u.on = function() {
    var _ = s.on.apply(s, arguments);
    return _ === s ? u : _;
  }, u.clickDistance = function(_) {
    return arguments.length ? (f = (_ = +_) * _, u) : Math.sqrt(f);
  }, u;
}
function ki(t, e, n) {
  t.prototype = e.prototype = n, n.constructor = t;
}
function Wr(t, e) {
  var n = Object.create(t.prototype);
  for (var o in e) n[o] = e[o];
  return n;
}
function An() {
}
var bn = 0.7, oo = 1 / bn, qt = "\\s*([+-]?\\d+)\\s*", xn = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Qe = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", td = /^#([0-9a-f]{3,8})$/, nd = new RegExp(`^rgb\\(${qt},${qt},${qt}\\)$`), od = new RegExp(`^rgb\\(${Qe},${Qe},${Qe}\\)$`), id = new RegExp(`^rgba\\(${qt},${qt},${qt},${xn}\\)$`), sd = new RegExp(`^rgba\\(${Qe},${Qe},${Qe},${xn}\\)$`), rd = new RegExp(`^hsl\\(${xn},${Qe},${Qe}\\)$`), ad = new RegExp(`^hsla\\(${xn},${Qe},${Qe},${xn}\\)$`), Ji = {
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
ki(An, En, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Qi,
  // Deprecated! Use color.formatHex.
  formatHex: Qi,
  formatHex8: ld,
  formatHsl: cd,
  formatRgb: es,
  toString: es
});
function Qi() {
  return this.rgb().formatHex();
}
function ld() {
  return this.rgb().formatHex8();
}
function cd() {
  return jr(this).formatHsl();
}
function es() {
  return this.rgb().formatRgb();
}
function En(t) {
  var e, n;
  return t = (t + "").trim().toLowerCase(), (e = td.exec(t)) ? (n = e[1].length, e = parseInt(e[1], 16), n === 6 ? ts(e) : n === 3 ? new Ie(e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, (e & 15) << 4 | e & 15, 1) : n === 8 ? Fn(e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, (e & 255) / 255) : n === 4 ? Fn(e >> 12 & 15 | e >> 8 & 240, e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, ((e & 15) << 4 | e & 15) / 255) : null) : (e = nd.exec(t)) ? new Ie(e[1], e[2], e[3], 1) : (e = od.exec(t)) ? new Ie(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, 1) : (e = id.exec(t)) ? Fn(e[1], e[2], e[3], e[4]) : (e = sd.exec(t)) ? Fn(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, e[4]) : (e = rd.exec(t)) ? is(e[1], e[2] / 100, e[3] / 100, 1) : (e = ad.exec(t)) ? is(e[1], e[2] / 100, e[3] / 100, e[4]) : Ji.hasOwnProperty(t) ? ts(Ji[t]) : t === "transparent" ? new Ie(NaN, NaN, NaN, 0) : null;
}
function ts(t) {
  return new Ie(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function Fn(t, e, n, o) {
  return o <= 0 && (t = e = n = NaN), new Ie(t, e, n, o);
}
function dd(t) {
  return t instanceof An || (t = En(t)), t ? (t = t.rgb(), new Ie(t.r, t.g, t.b, t.opacity)) : new Ie();
}
function oi(t, e, n, o) {
  return arguments.length === 1 ? dd(t) : new Ie(t, e, n, o ?? 1);
}
function Ie(t, e, n, o) {
  this.r = +t, this.g = +e, this.b = +n, this.opacity = +o;
}
ki(Ie, oi, Wr(An, {
  brighter(t) {
    return t = t == null ? oo : Math.pow(oo, t), new Ie(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? bn : Math.pow(bn, t), new Ie(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Ie(Mt(this.r), Mt(this.g), Mt(this.b), io(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: ns,
  // Deprecated! Use color.formatHex.
  formatHex: ns,
  formatHex8: ud,
  formatRgb: os,
  toString: os
}));
function ns() {
  return `#${Lt(this.r)}${Lt(this.g)}${Lt(this.b)}`;
}
function ud() {
  return `#${Lt(this.r)}${Lt(this.g)}${Lt(this.b)}${Lt((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function os() {
  const t = io(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${Mt(this.r)}, ${Mt(this.g)}, ${Mt(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function io(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function Mt(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function Lt(t) {
  return t = Mt(t), (t < 16 ? "0" : "") + t.toString(16);
}
function is(t, e, n, o) {
  return o <= 0 ? t = e = n = NaN : n <= 0 || n >= 1 ? t = e = NaN : e <= 0 && (t = NaN), new je(t, e, n, o);
}
function jr(t) {
  if (t instanceof je) return new je(t.h, t.s, t.l, t.opacity);
  if (t instanceof An || (t = En(t)), !t) return new je();
  if (t instanceof je) return t;
  t = t.rgb();
  var e = t.r / 255, n = t.g / 255, o = t.b / 255, i = Math.min(e, n, o), s = Math.max(e, n, o), a = NaN, r = s - i, l = (s + i) / 2;
  return r ? (e === s ? a = (n - o) / r + (n < o) * 6 : n === s ? a = (o - e) / r + 2 : a = (e - n) / r + 4, r /= l < 0.5 ? s + i : 2 - s - i, a *= 60) : r = l > 0 && l < 1 ? 0 : a, new je(a, r, l, t.opacity);
}
function fd(t, e, n, o) {
  return arguments.length === 1 ? jr(t) : new je(t, e, n, o ?? 1);
}
function je(t, e, n, o) {
  this.h = +t, this.s = +e, this.l = +n, this.opacity = +o;
}
ki(je, fd, Wr(An, {
  brighter(t) {
    return t = t == null ? oo : Math.pow(oo, t), new je(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? bn : Math.pow(bn, t), new je(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, e = isNaN(t) || isNaN(this.s) ? 0 : this.s, n = this.l, o = n + (n < 0.5 ? n : 1 - n) * e, i = 2 * n - o;
    return new Ie(
      Fo(t >= 240 ? t - 240 : t + 120, i, o),
      Fo(t, i, o),
      Fo(t < 120 ? t + 240 : t - 120, i, o),
      this.opacity
    );
  },
  clamp() {
    return new je(ss(this.h), On(this.s), On(this.l), io(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = io(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${ss(this.h)}, ${On(this.s) * 100}%, ${On(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function ss(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function On(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function Fo(t, e, n) {
  return (t < 60 ? e + (n - e) * t / 60 : t < 180 ? n : t < 240 ? e + (n - e) * (240 - t) / 60 : e) * 255;
}
const Ur = (t) => () => t;
function hd(t, e) {
  return function(n) {
    return t + n * e;
  };
}
function gd(t, e, n) {
  return t = Math.pow(t, n), e = Math.pow(e, n) - t, n = 1 / n, function(o) {
    return Math.pow(t + o * e, n);
  };
}
function pd(t) {
  return (t = +t) == 1 ? Gr : function(e, n) {
    return n - e ? gd(e, n, t) : Ur(isNaN(e) ? n : e);
  };
}
function Gr(t, e) {
  var n = e - t;
  return n ? hd(t, n) : Ur(isNaN(t) ? e : t);
}
const ii = (function t(e) {
  var n = pd(e);
  function o(i, s) {
    var a = n((i = oi(i)).r, (s = oi(s)).r), r = n(i.g, s.g), l = n(i.b, s.b), c = Gr(i.opacity, s.opacity);
    return function(d) {
      return i.r = a(d), i.g = r(d), i.b = l(d), i.opacity = c(d), i + "";
    };
  }
  return o.gamma = t, o;
})(1);
function pt(t, e) {
  return t = +t, e = +e, function(n) {
    return t * (1 - n) + e * n;
  };
}
var si = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Oo = new RegExp(si.source, "g");
function md(t) {
  return function() {
    return t;
  };
}
function yd(t) {
  return function(e) {
    return t(e) + "";
  };
}
function wd(t, e) {
  var n = si.lastIndex = Oo.lastIndex = 0, o, i, s, a = -1, r = [], l = [];
  for (t = t + "", e = e + ""; (o = si.exec(t)) && (i = Oo.exec(e)); )
    (s = i.index) > n && (s = e.slice(n, s), r[a] ? r[a] += s : r[++a] = s), (o = o[0]) === (i = i[0]) ? r[a] ? r[a] += i : r[++a] = i : (r[++a] = null, l.push({ i: a, x: pt(o, i) })), n = Oo.lastIndex;
  return n < e.length && (s = e.slice(n), r[a] ? r[a] += s : r[++a] = s), r.length < 2 ? l[0] ? yd(l[0].x) : md(e) : (e = l.length, function(c) {
    for (var d = 0, f; d < e; ++d) r[(f = l[d]).i] = f.x(c);
    return r.join("");
  });
}
var rs = 180 / Math.PI, ri = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function Zr(t, e, n, o, i, s) {
  var a, r, l;
  return (a = Math.sqrt(t * t + e * e)) && (t /= a, e /= a), (l = t * n + e * o) && (n -= t * l, o -= e * l), (r = Math.sqrt(n * n + o * o)) && (n /= r, o /= r, l /= r), t * o < e * n && (t = -t, e = -e, l = -l, a = -a), {
    translateX: i,
    translateY: s,
    rotate: Math.atan2(e, t) * rs,
    skewX: Math.atan(l) * rs,
    scaleX: a,
    scaleY: r
  };
}
var zn;
function _d(t) {
  const e = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return e.isIdentity ? ri : Zr(e.a, e.b, e.c, e.d, e.e, e.f);
}
function vd(t) {
  return t == null || (zn || (zn = document.createElementNS("http://www.w3.org/2000/svg", "g")), zn.setAttribute("transform", t), !(t = zn.transform.baseVal.consolidate())) ? ri : (t = t.matrix, Zr(t.a, t.b, t.c, t.d, t.e, t.f));
}
function Kr(t, e, n, o) {
  function i(c) {
    return c.length ? c.pop() + " " : "";
  }
  function s(c, d, f, u, h, p) {
    if (c !== f || d !== u) {
      var g = h.push("translate(", null, e, null, n);
      p.push({ i: g - 4, x: pt(c, f) }, { i: g - 2, x: pt(d, u) });
    } else (f || u) && h.push("translate(" + f + e + u + n);
  }
  function a(c, d, f, u) {
    c !== d ? (c - d > 180 ? d += 360 : d - c > 180 && (c += 360), u.push({ i: f.push(i(f) + "rotate(", null, o) - 2, x: pt(c, d) })) : d && f.push(i(f) + "rotate(" + d + o);
  }
  function r(c, d, f, u) {
    c !== d ? u.push({ i: f.push(i(f) + "skewX(", null, o) - 2, x: pt(c, d) }) : d && f.push(i(f) + "skewX(" + d + o);
  }
  function l(c, d, f, u, h, p) {
    if (c !== f || d !== u) {
      var g = h.push(i(h) + "scale(", null, ",", null, ")");
      p.push({ i: g - 4, x: pt(c, f) }, { i: g - 2, x: pt(d, u) });
    } else (f !== 1 || u !== 1) && h.push(i(h) + "scale(" + f + "," + u + ")");
  }
  return function(c, d) {
    var f = [], u = [];
    return c = t(c), d = t(d), s(c.translateX, c.translateY, d.translateX, d.translateY, f, u), a(c.rotate, d.rotate, f, u), r(c.skewX, d.skewX, f, u), l(c.scaleX, c.scaleY, d.scaleX, d.scaleY, f, u), c = d = null, function(h) {
      for (var p = -1, g = u.length, m; ++p < g; ) f[(m = u[p]).i] = m.x(h);
      return f.join("");
    };
  };
}
var bd = Kr(_d, "px, ", "px)", "deg)"), xd = Kr(vd, ", ", ")", ")"), Ed = 1e-12;
function as(t) {
  return ((t = Math.exp(t)) + 1 / t) / 2;
}
function Cd(t) {
  return ((t = Math.exp(t)) - 1 / t) / 2;
}
function Sd(t) {
  return ((t = Math.exp(2 * t)) - 1) / (t + 1);
}
const kd = (function t(e, n, o) {
  function i(s, a) {
    var r = s[0], l = s[1], c = s[2], d = a[0], f = a[1], u = a[2], h = d - r, p = f - l, g = h * h + p * p, m, y;
    if (g < Ed)
      y = Math.log(u / c) / e, m = function(E) {
        return [
          r + E * h,
          l + E * p,
          c * Math.exp(e * E * y)
        ];
      };
    else {
      var x = Math.sqrt(g), k = (u * u - c * c + o * g) / (2 * c * n * x), _ = (u * u - c * c - o * g) / (2 * u * n * x), S = Math.log(Math.sqrt(k * k + 1) - k), b = Math.log(Math.sqrt(_ * _ + 1) - _);
      y = (b - S) / e, m = function(E) {
        var M = E * y, R = as(S), L = c / (n * x) * (R * Sd(e * M + S) - Cd(S));
        return [
          r + L * h,
          l + L * p,
          c * R / as(e * M + S)
        ];
      };
    }
    return m.duration = y * 1e3 * e / Math.SQRT2, m;
  }
  return i.rho = function(s) {
    var a = Math.max(1e-3, +s), r = a * a, l = r * r;
    return t(a, r, l);
  }, i;
})(Math.SQRT2, 2, 4);
var jt = 0, hn = 0, an = 0, Jr = 1e3, so, gn, ro = 0, Nt = 0, Mo = 0, Cn = typeof performance == "object" && performance.now ? performance : Date, Qr = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function Li() {
  return Nt || (Qr(Ld), Nt = Cn.now() + Mo);
}
function Ld() {
  Nt = 0;
}
function ao() {
  this._call = this._time = this._next = null;
}
ao.prototype = ea.prototype = {
  constructor: ao,
  restart: function(t, e, n) {
    if (typeof t != "function") throw new TypeError("callback is not a function");
    n = (n == null ? Li() : +n) + (e == null ? 0 : +e), !this._next && gn !== this && (gn ? gn._next = this : so = this, gn = this), this._call = t, this._time = n, ai();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, ai());
  }
};
function ea(t, e, n) {
  var o = new ao();
  return o.restart(t, e, n), o;
}
function Md() {
  Li(), ++jt;
  for (var t = so, e; t; )
    (e = Nt - t._time) >= 0 && t._call.call(void 0, e), t = t._next;
  --jt;
}
function ls() {
  Nt = (ro = Cn.now()) + Mo, jt = hn = 0;
  try {
    Md();
  } finally {
    jt = 0, Nd(), Nt = 0;
  }
}
function Pd() {
  var t = Cn.now(), e = t - ro;
  e > Jr && (Mo -= e, ro = t);
}
function Nd() {
  for (var t, e = so, n, o = 1 / 0; e; )
    e._call ? (o > e._time && (o = e._time), t = e, e = e._next) : (n = e._next, e._next = null, e = t ? t._next = n : so = n);
  gn = t, ai(o);
}
function ai(t) {
  if (!jt) {
    hn && (hn = clearTimeout(hn));
    var e = t - Nt;
    e > 24 ? (t < 1 / 0 && (hn = setTimeout(ls, t - Cn.now() - Mo)), an && (an = clearInterval(an))) : (an || (ro = Cn.now(), an = setInterval(Pd, Jr)), jt = 1, Qr(ls));
  }
}
function cs(t, e, n) {
  var o = new ao();
  return e = e == null ? 0 : +e, o.restart((i) => {
    o.stop(), t(i + e);
  }, e, n), o;
}
var Ad = ko("start", "end", "cancel", "interrupt"), Td = [], ta = 0, ds = 1, li = 2, Zn = 3, us = 4, ci = 5, Kn = 6;
function Po(t, e, n, o, i, s) {
  var a = t.__transition;
  if (!a) t.__transition = {};
  else if (n in a) return;
  Id(t, n, {
    name: e,
    index: o,
    // For context during callback.
    group: i,
    // For context during callback.
    on: Ad,
    tween: Td,
    time: s.time,
    delay: s.delay,
    duration: s.duration,
    ease: s.ease,
    timer: null,
    state: ta
  });
}
function Mi(t, e) {
  var n = Ze(t, e);
  if (n.state > ta) throw new Error("too late; already scheduled");
  return n;
}
function et(t, e) {
  var n = Ze(t, e);
  if (n.state > Zn) throw new Error("too late; already running");
  return n;
}
function Ze(t, e) {
  var n = t.__transition;
  if (!n || !(n = n[e])) throw new Error("transition not found");
  return n;
}
function Id(t, e, n) {
  var o = t.__transition, i;
  o[e] = n, n.timer = ea(s, 0, n.time);
  function s(c) {
    n.state = ds, n.timer.restart(a, n.delay, n.time), n.delay <= c && a(c - n.delay);
  }
  function a(c) {
    var d, f, u, h;
    if (n.state !== ds) return l();
    for (d in o)
      if (h = o[d], h.name === n.name) {
        if (h.state === Zn) return cs(a);
        h.state === us ? (h.state = Kn, h.timer.stop(), h.on.call("interrupt", t, t.__data__, h.index, h.group), delete o[d]) : +d < e && (h.state = Kn, h.timer.stop(), h.on.call("cancel", t, t.__data__, h.index, h.group), delete o[d]);
      }
    if (cs(function() {
      n.state === Zn && (n.state = us, n.timer.restart(r, n.delay, n.time), r(c));
    }), n.state = li, n.on.call("start", t, t.__data__, n.index, n.group), n.state === li) {
      for (n.state = Zn, i = new Array(u = n.tween.length), d = 0, f = -1; d < u; ++d)
        (h = n.tween[d].value.call(t, t.__data__, n.index, n.group)) && (i[++f] = h);
      i.length = f + 1;
    }
  }
  function r(c) {
    for (var d = c < n.duration ? n.ease.call(null, c / n.duration) : (n.timer.restart(l), n.state = ci, 1), f = -1, u = i.length; ++f < u; )
      i[f].call(t, d);
    n.state === ci && (n.on.call("end", t, t.__data__, n.index, n.group), l());
  }
  function l() {
    n.state = Kn, n.timer.stop(), delete o[e];
    for (var c in o) return;
    delete t.__transition;
  }
}
function Jn(t, e) {
  var n = t.__transition, o, i, s = !0, a;
  if (n) {
    e = e == null ? null : e + "";
    for (a in n) {
      if ((o = n[a]).name !== e) {
        s = !1;
        continue;
      }
      i = o.state > li && o.state < ci, o.state = Kn, o.timer.stop(), o.on.call(i ? "interrupt" : "cancel", t, t.__data__, o.index, o.group), delete n[a];
    }
    s && delete t.__transition;
  }
}
function $d(t) {
  return this.each(function() {
    Jn(this, t);
  });
}
function Dd(t, e) {
  var n, o;
  return function() {
    var i = et(this, t), s = i.tween;
    if (s !== n) {
      o = n = s;
      for (var a = 0, r = o.length; a < r; ++a)
        if (o[a].name === e) {
          o = o.slice(), o.splice(a, 1);
          break;
        }
    }
    i.tween = o;
  };
}
function Rd(t, e, n) {
  var o, i;
  if (typeof n != "function") throw new Error();
  return function() {
    var s = et(this, t), a = s.tween;
    if (a !== o) {
      i = (o = a).slice();
      for (var r = { name: e, value: n }, l = 0, c = i.length; l < c; ++l)
        if (i[l].name === e) {
          i[l] = r;
          break;
        }
      l === c && i.push(r);
    }
    s.tween = i;
  };
}
function Hd(t, e) {
  var n = this._id;
  if (t += "", arguments.length < 2) {
    for (var o = Ze(this.node(), n).tween, i = 0, s = o.length, a; i < s; ++i)
      if ((a = o[i]).name === t)
        return a.value;
    return null;
  }
  return this.each((e == null ? Dd : Rd)(n, t, e));
}
function Pi(t, e, n) {
  var o = t._id;
  return t.each(function() {
    var i = et(this, o);
    (i.value || (i.value = {}))[e] = n.apply(this, arguments);
  }), function(i) {
    return Ze(i, o).value[e];
  };
}
function na(t, e) {
  var n;
  return (typeof e == "number" ? pt : e instanceof En ? ii : (n = En(e)) ? (e = n, ii) : wd)(t, e);
}
function Fd(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function Od(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function zd(t, e, n) {
  var o, i = n + "", s;
  return function() {
    var a = this.getAttribute(t);
    return a === i ? null : a === o ? s : s = e(o = a, n);
  };
}
function Vd(t, e, n) {
  var o, i = n + "", s;
  return function() {
    var a = this.getAttributeNS(t.space, t.local);
    return a === i ? null : a === o ? s : s = e(o = a, n);
  };
}
function Bd(t, e, n) {
  var o, i, s;
  return function() {
    var a, r = n(this), l;
    return r == null ? void this.removeAttribute(t) : (a = this.getAttribute(t), l = r + "", a === l ? null : a === o && l === i ? s : (i = l, s = e(o = a, r)));
  };
}
function qd(t, e, n) {
  var o, i, s;
  return function() {
    var a, r = n(this), l;
    return r == null ? void this.removeAttributeNS(t.space, t.local) : (a = this.getAttributeNS(t.space, t.local), l = r + "", a === l ? null : a === o && l === i ? s : (i = l, s = e(o = a, r)));
  };
}
function Yd(t, e) {
  var n = Lo(t), o = n === "transform" ? xd : na;
  return this.attrTween(t, typeof e == "function" ? (n.local ? qd : Bd)(n, o, Pi(this, "attr." + t, e)) : e == null ? (n.local ? Od : Fd)(n) : (n.local ? Vd : zd)(n, o, e));
}
function Xd(t, e) {
  return function(n) {
    this.setAttribute(t, e.call(this, n));
  };
}
function Wd(t, e) {
  return function(n) {
    this.setAttributeNS(t.space, t.local, e.call(this, n));
  };
}
function jd(t, e) {
  var n, o;
  function i() {
    var s = e.apply(this, arguments);
    return s !== o && (n = (o = s) && Wd(t, s)), n;
  }
  return i._value = e, i;
}
function Ud(t, e) {
  var n, o;
  function i() {
    var s = e.apply(this, arguments);
    return s !== o && (n = (o = s) && Xd(t, s)), n;
  }
  return i._value = e, i;
}
function Gd(t, e) {
  var n = "attr." + t;
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (e == null) return this.tween(n, null);
  if (typeof e != "function") throw new Error();
  var o = Lo(t);
  return this.tween(n, (o.local ? jd : Ud)(o, e));
}
function Zd(t, e) {
  return function() {
    Mi(this, t).delay = +e.apply(this, arguments);
  };
}
function Kd(t, e) {
  return e = +e, function() {
    Mi(this, t).delay = e;
  };
}
function Jd(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? Zd : Kd)(e, t)) : Ze(this.node(), e).delay;
}
function Qd(t, e) {
  return function() {
    et(this, t).duration = +e.apply(this, arguments);
  };
}
function eu(t, e) {
  return e = +e, function() {
    et(this, t).duration = e;
  };
}
function tu(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? Qd : eu)(e, t)) : Ze(this.node(), e).duration;
}
function nu(t, e) {
  if (typeof e != "function") throw new Error();
  return function() {
    et(this, t).ease = e;
  };
}
function ou(t) {
  var e = this._id;
  return arguments.length ? this.each(nu(e, t)) : Ze(this.node(), e).ease;
}
function iu(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    if (typeof n != "function") throw new Error();
    et(this, t).ease = n;
  };
}
function su(t) {
  if (typeof t != "function") throw new Error();
  return this.each(iu(this._id, t));
}
function ru(t) {
  typeof t != "function" && (t = $r(t));
  for (var e = this._groups, n = e.length, o = new Array(n), i = 0; i < n; ++i)
    for (var s = e[i], a = s.length, r = o[i] = [], l, c = 0; c < a; ++c)
      (l = s[c]) && t.call(l, l.__data__, c, s) && r.push(l);
  return new ut(o, this._parents, this._name, this._id);
}
function au(t) {
  if (t._id !== this._id) throw new Error();
  for (var e = this._groups, n = t._groups, o = e.length, i = n.length, s = Math.min(o, i), a = new Array(o), r = 0; r < s; ++r)
    for (var l = e[r], c = n[r], d = l.length, f = a[r] = new Array(d), u, h = 0; h < d; ++h)
      (u = l[h] || c[h]) && (f[h] = u);
  for (; r < o; ++r)
    a[r] = e[r];
  return new ut(a, this._parents, this._name, this._id);
}
function lu(t) {
  return (t + "").trim().split(/^|\s+/).every(function(e) {
    var n = e.indexOf(".");
    return n >= 0 && (e = e.slice(0, n)), !e || e === "start";
  });
}
function cu(t, e, n) {
  var o, i, s = lu(e) ? Mi : et;
  return function() {
    var a = s(this, t), r = a.on;
    r !== o && (i = (o = r).copy()).on(e, n), a.on = i;
  };
}
function du(t, e) {
  var n = this._id;
  return arguments.length < 2 ? Ze(this.node(), n).on.on(t) : this.each(cu(n, t, e));
}
function uu(t) {
  return function() {
    var e = this.parentNode;
    for (var n in this.__transition) if (+n !== t) return;
    e && e.removeChild(this);
  };
}
function fu() {
  return this.on("end.remove", uu(this._id));
}
function hu(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = Ci(t));
  for (var o = this._groups, i = o.length, s = new Array(i), a = 0; a < i; ++a)
    for (var r = o[a], l = r.length, c = s[a] = new Array(l), d, f, u = 0; u < l; ++u)
      (d = r[u]) && (f = t.call(d, d.__data__, u, r)) && ("__data__" in d && (f.__data__ = d.__data__), c[u] = f, Po(c[u], e, n, u, c, Ze(d, n)));
  return new ut(s, this._parents, e, n);
}
function gu(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = Ir(t));
  for (var o = this._groups, i = o.length, s = [], a = [], r = 0; r < i; ++r)
    for (var l = o[r], c = l.length, d, f = 0; f < c; ++f)
      if (d = l[f]) {
        for (var u = t.call(d, d.__data__, f, l), h, p = Ze(d, n), g = 0, m = u.length; g < m; ++g)
          (h = u[g]) && Po(h, e, n, g, u, p);
        s.push(u), a.push(d);
      }
  return new ut(s, a, e, n);
}
var pu = Nn.prototype.constructor;
function mu() {
  return new pu(this._groups, this._parents);
}
function yu(t, e) {
  var n, o, i;
  return function() {
    var s = Wt(this, t), a = (this.style.removeProperty(t), Wt(this, t));
    return s === a ? null : s === n && a === o ? i : i = e(n = s, o = a);
  };
}
function oa(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function wu(t, e, n) {
  var o, i = n + "", s;
  return function() {
    var a = Wt(this, t);
    return a === i ? null : a === o ? s : s = e(o = a, n);
  };
}
function _u(t, e, n) {
  var o, i, s;
  return function() {
    var a = Wt(this, t), r = n(this), l = r + "";
    return r == null && (l = r = (this.style.removeProperty(t), Wt(this, t))), a === l ? null : a === o && l === i ? s : (i = l, s = e(o = a, r));
  };
}
function vu(t, e) {
  var n, o, i, s = "style." + e, a = "end." + s, r;
  return function() {
    var l = et(this, t), c = l.on, d = l.value[s] == null ? r || (r = oa(e)) : void 0;
    (c !== n || i !== d) && (o = (n = c).copy()).on(a, i = d), l.on = o;
  };
}
function bu(t, e, n) {
  var o = (t += "") == "transform" ? bd : na;
  return e == null ? this.styleTween(t, yu(t, o)).on("end.style." + t, oa(t)) : typeof e == "function" ? this.styleTween(t, _u(t, o, Pi(this, "style." + t, e))).each(vu(this._id, t)) : this.styleTween(t, wu(t, o, e), n).on("end.style." + t, null);
}
function xu(t, e, n) {
  return function(o) {
    this.style.setProperty(t, e.call(this, o), n);
  };
}
function Eu(t, e, n) {
  var o, i;
  function s() {
    var a = e.apply(this, arguments);
    return a !== i && (o = (i = a) && xu(t, a, n)), o;
  }
  return s._value = e, s;
}
function Cu(t, e, n) {
  var o = "style." + (t += "");
  if (arguments.length < 2) return (o = this.tween(o)) && o._value;
  if (e == null) return this.tween(o, null);
  if (typeof e != "function") throw new Error();
  return this.tween(o, Eu(t, e, n ?? ""));
}
function Su(t) {
  return function() {
    this.textContent = t;
  };
}
function ku(t) {
  return function() {
    var e = t(this);
    this.textContent = e ?? "";
  };
}
function Lu(t) {
  return this.tween("text", typeof t == "function" ? ku(Pi(this, "text", t)) : Su(t == null ? "" : t + ""));
}
function Mu(t) {
  return function(e) {
    this.textContent = t.call(this, e);
  };
}
function Pu(t) {
  var e, n;
  function o() {
    var i = t.apply(this, arguments);
    return i !== n && (e = (n = i) && Mu(i)), e;
  }
  return o._value = t, o;
}
function Nu(t) {
  var e = "text";
  if (arguments.length < 1) return (e = this.tween(e)) && e._value;
  if (t == null) return this.tween(e, null);
  if (typeof t != "function") throw new Error();
  return this.tween(e, Pu(t));
}
function Au() {
  for (var t = this._name, e = this._id, n = ia(), o = this._groups, i = o.length, s = 0; s < i; ++s)
    for (var a = o[s], r = a.length, l, c = 0; c < r; ++c)
      if (l = a[c]) {
        var d = Ze(l, e);
        Po(l, t, n, c, a, {
          time: d.time + d.delay + d.duration,
          delay: 0,
          duration: d.duration,
          ease: d.ease
        });
      }
  return new ut(o, this._parents, t, n);
}
function Tu() {
  var t, e, n = this, o = n._id, i = n.size();
  return new Promise(function(s, a) {
    var r = { value: a }, l = { value: function() {
      --i === 0 && s();
    } };
    n.each(function() {
      var c = et(this, o), d = c.on;
      d !== t && (e = (t = d).copy(), e._.cancel.push(r), e._.interrupt.push(r), e._.end.push(l)), c.on = e;
    }), i === 0 && s();
  });
}
var Iu = 0;
function ut(t, e, n, o) {
  this._groups = t, this._parents = e, this._name = n, this._id = o;
}
function ia() {
  return ++Iu;
}
var nt = Nn.prototype;
ut.prototype = {
  constructor: ut,
  select: hu,
  selectAll: gu,
  selectChild: nt.selectChild,
  selectChildren: nt.selectChildren,
  filter: ru,
  merge: au,
  selection: mu,
  transition: Au,
  call: nt.call,
  nodes: nt.nodes,
  node: nt.node,
  size: nt.size,
  empty: nt.empty,
  each: nt.each,
  on: du,
  attr: Yd,
  attrTween: Gd,
  style: bu,
  styleTween: Cu,
  text: Lu,
  textTween: Nu,
  remove: fu,
  tween: Hd,
  delay: Jd,
  duration: tu,
  ease: ou,
  easeVarying: su,
  end: Tu,
  [Symbol.iterator]: nt[Symbol.iterator]
};
const $u = (t) => +t;
function Du(t) {
  return t * t;
}
function Ru(t) {
  return t * (2 - t);
}
function Hu(t) {
  return ((t *= 2) <= 1 ? t * t : --t * (2 - t) + 1) / 2;
}
function Fu(t) {
  return t * t * t;
}
function Ou(t) {
  return --t * t * t + 1;
}
function sa(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var ra = Math.PI, aa = ra / 2;
function zu(t) {
  return +t == 1 ? 1 : 1 - Math.cos(t * aa);
}
function Vu(t) {
  return Math.sin(t * aa);
}
function Bu(t) {
  return (1 - Math.cos(ra * t)) / 2;
}
function St(t) {
  return (Math.pow(2, -10 * t) - 9765625e-10) * 1.0009775171065494;
}
function qu(t) {
  return St(1 - +t);
}
function Yu(t) {
  return 1 - St(t);
}
function Xu(t) {
  return ((t *= 2) <= 1 ? St(1 - t) : 2 - St(t - 1)) / 2;
}
function Wu(t) {
  return 1 - Math.sqrt(1 - t * t);
}
function ju(t) {
  return Math.sqrt(1 - --t * t);
}
function Uu(t) {
  return ((t *= 2) <= 1 ? 1 - Math.sqrt(1 - t * t) : Math.sqrt(1 - (t -= 2) * t) + 1) / 2;
}
var di = 4 / 11, Gu = 6 / 11, Zu = 8 / 11, Ku = 3 / 4, Ju = 9 / 11, Qu = 10 / 11, ef = 15 / 16, tf = 21 / 22, nf = 63 / 64, Vn = 1 / di / di;
function of(t) {
  return 1 - lo(1 - t);
}
function lo(t) {
  return (t = +t) < di ? Vn * t * t : t < Zu ? Vn * (t -= Gu) * t + Ku : t < Qu ? Vn * (t -= Ju) * t + ef : Vn * (t -= tf) * t + nf;
}
function sf(t) {
  return ((t *= 2) <= 1 ? 1 - lo(1 - t) : lo(t - 1) + 1) / 2;
}
var Ni = 1.70158, rf = (function t(e) {
  e = +e;
  function n(o) {
    return (o = +o) * o * (e * (o - 1) + o);
  }
  return n.overshoot = t, n;
})(Ni), af = (function t(e) {
  e = +e;
  function n(o) {
    return --o * o * ((o + 1) * e + o) + 1;
  }
  return n.overshoot = t, n;
})(Ni), lf = (function t(e) {
  e = +e;
  function n(o) {
    return ((o *= 2) < 1 ? o * o * ((e + 1) * o - e) : (o -= 2) * o * ((e + 1) * o + e) + 2) / 2;
  }
  return n.overshoot = t, n;
})(Ni), Ut = 2 * Math.PI, Ai = 1, Ti = 0.3, cf = (function t(e, n) {
  var o = Math.asin(1 / (e = Math.max(1, e))) * (n /= Ut);
  function i(s) {
    return e * St(- --s) * Math.sin((o - s) / n);
  }
  return i.amplitude = function(s) {
    return t(s, n * Ut);
  }, i.period = function(s) {
    return t(e, s);
  }, i;
})(Ai, Ti), df = (function t(e, n) {
  var o = Math.asin(1 / (e = Math.max(1, e))) * (n /= Ut);
  function i(s) {
    return 1 - e * St(s = +s) * Math.sin((s + o) / n);
  }
  return i.amplitude = function(s) {
    return t(s, n * Ut);
  }, i.period = function(s) {
    return t(e, s);
  }, i;
})(Ai, Ti), uf = (function t(e, n) {
  var o = Math.asin(1 / (e = Math.max(1, e))) * (n /= Ut);
  function i(s) {
    return ((s = s * 2 - 1) < 0 ? e * St(-s) * Math.sin((o - s) / n) : 2 - e * St(s) * Math.sin((o + s) / n)) / 2;
  }
  return i.amplitude = function(s) {
    return t(s, n * Ut);
  }, i.period = function(s) {
    return t(e, s);
  }, i;
})(Ai, Ti), ff = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: sa
};
function hf(t, e) {
  for (var n; !(n = t.__transition) || !(n = n[e]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${e} not found`);
  return n;
}
function gf(t) {
  var e, n;
  t instanceof ut ? (e = t._id, t = t._name) : (e = ia(), (n = ff).time = Li(), t = t == null ? null : t + "");
  for (var o = this._groups, i = o.length, s = 0; s < i; ++s)
    for (var a = o[s], r = a.length, l, c = 0; c < r; ++c)
      (l = a[c]) && Po(l, t, e, c, a, n || hf(l, e));
  return new ut(o, this._parents, t, e);
}
Nn.prototype.interrupt = $d;
Nn.prototype.transition = gf;
const Bn = (t) => () => t;
function pf(t, {
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
function it(t, e, n) {
  this.k = t, this.x = e, this.y = n;
}
it.prototype = {
  constructor: it,
  scale: function(t) {
    return t === 1 ? this : new it(this.k * t, this.x, this.y);
  },
  translate: function(t, e) {
    return t === 0 & e === 0 ? this : new it(this.k, this.x + this.k * t, this.y + this.k * e);
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
var Ot = new it(1, 0, 0);
it.prototype;
function zo(t) {
  t.stopImmediatePropagation();
}
function ln(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function mf(t) {
  return (!t.ctrlKey || t.type === "wheel") && !t.button;
}
function yf() {
  var t = this;
  return t instanceof SVGElement ? (t = t.ownerSVGElement || t, t.hasAttribute("viewBox") ? (t = t.viewBox.baseVal, [[t.x, t.y], [t.x + t.width, t.y + t.height]]) : [[0, 0], [t.width.baseVal.value, t.height.baseVal.value]]) : [[0, 0], [t.clientWidth, t.clientHeight]];
}
function fs() {
  return this.__zoom || Ot;
}
function wf(t) {
  return -t.deltaY * (t.deltaMode === 1 ? 0.05 : t.deltaMode ? 1 : 2e-3) * (t.ctrlKey ? 10 : 1);
}
function _f() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function vf(t, e, n) {
  var o = t.invertX(e[0][0]) - n[0][0], i = t.invertX(e[1][0]) - n[1][0], s = t.invertY(e[0][1]) - n[0][1], a = t.invertY(e[1][1]) - n[1][1];
  return t.translate(
    i > o ? (o + i) / 2 : Math.min(0, o) || Math.max(0, i),
    a > s ? (s + a) / 2 : Math.min(0, s) || Math.max(0, a)
  );
}
function bf() {
  var t = mf, e = yf, n = vf, o = wf, i = _f, s = [0, 1 / 0], a = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], r = 250, l = kd, c = ko("start", "zoom", "end"), d, f, u, h = 500, p = 150, g = 0, m = 10;
  function y(w) {
    w.property("__zoom", fs).on("wheel.zoom", M, { passive: !1 }).on("mousedown.zoom", R).on("dblclick.zoom", L).filter(i).on("touchstart.zoom", D).on("touchmove.zoom", A).on("touchend.zoom touchcancel.zoom", v).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  y.transform = function(w, T, P, $) {
    var H = w.selection ? w.selection() : w;
    H.property("__zoom", fs), w !== H ? S(w, T, P, $) : H.interrupt().each(function() {
      b(this, arguments).event($).start().zoom(null, typeof T == "function" ? T.apply(this, arguments) : T).end();
    });
  }, y.scaleBy = function(w, T, P, $) {
    y.scaleTo(w, function() {
      var H = this.__zoom.k, z = typeof T == "function" ? T.apply(this, arguments) : T;
      return H * z;
    }, P, $);
  }, y.scaleTo = function(w, T, P, $) {
    y.transform(w, function() {
      var H = e.apply(this, arguments), z = this.__zoom, I = P == null ? _(H) : typeof P == "function" ? P.apply(this, arguments) : P, C = z.invert(I), N = typeof T == "function" ? T.apply(this, arguments) : T;
      return n(k(x(z, N), I, C), H, a);
    }, P, $);
  }, y.translateBy = function(w, T, P, $) {
    y.transform(w, function() {
      return n(this.__zoom.translate(
        typeof T == "function" ? T.apply(this, arguments) : T,
        typeof P == "function" ? P.apply(this, arguments) : P
      ), e.apply(this, arguments), a);
    }, null, $);
  }, y.translateTo = function(w, T, P, $, H) {
    y.transform(w, function() {
      var z = e.apply(this, arguments), I = this.__zoom, C = $ == null ? _(z) : typeof $ == "function" ? $.apply(this, arguments) : $;
      return n(Ot.translate(C[0], C[1]).scale(I.k).translate(
        typeof T == "function" ? -T.apply(this, arguments) : -T,
        typeof P == "function" ? -P.apply(this, arguments) : -P
      ), z, a);
    }, $, H);
  };
  function x(w, T) {
    return T = Math.max(s[0], Math.min(s[1], T)), T === w.k ? w : new it(T, w.x, w.y);
  }
  function k(w, T, P) {
    var $ = T[0] - P[0] * w.k, H = T[1] - P[1] * w.k;
    return $ === w.x && H === w.y ? w : new it(w.k, $, H);
  }
  function _(w) {
    return [(+w[0][0] + +w[1][0]) / 2, (+w[0][1] + +w[1][1]) / 2];
  }
  function S(w, T, P, $) {
    w.on("start.zoom", function() {
      b(this, arguments).event($).start();
    }).on("interrupt.zoom end.zoom", function() {
      b(this, arguments).event($).end();
    }).tween("zoom", function() {
      var H = this, z = arguments, I = b(H, z).event($), C = e.apply(H, z), N = P == null ? _(C) : typeof P == "function" ? P.apply(H, z) : P, O = Math.max(C[1][0] - C[0][0], C[1][1] - C[0][1]), Y = H.__zoom, K = typeof T == "function" ? T.apply(H, z) : T, U = l(Y.invert(N).concat(O / Y.k), K.invert(N).concat(O / K.k));
      return function(W) {
        if (W === 1) W = K;
        else {
          var re = U(W), q = O / re[2];
          W = new it(q, N[0] - re[0] * q, N[1] - re[1] * q);
        }
        I.zoom(null, W);
      };
    });
  }
  function b(w, T, P) {
    return !P && w.__zooming || new E(w, T);
  }
  function E(w, T) {
    this.that = w, this.args = T, this.active = 0, this.sourceEvent = null, this.extent = e.apply(w, T), this.taps = 0;
  }
  E.prototype = {
    event: function(w) {
      return w && (this.sourceEvent = w), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(w, T) {
      return this.mouse && w !== "mouse" && (this.mouse[1] = T.invert(this.mouse[0])), this.touch0 && w !== "touch" && (this.touch0[1] = T.invert(this.touch0[0])), this.touch1 && w !== "touch" && (this.touch1[1] = T.invert(this.touch1[0])), this.that.__zoom = T, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(w) {
      var T = We(this.that).datum();
      c.call(
        w,
        this.that,
        new pf(w, {
          sourceEvent: this.sourceEvent,
          target: y,
          transform: this.that.__zoom,
          dispatch: c
        }),
        T
      );
    }
  };
  function M(w, ...T) {
    if (!t.apply(this, arguments)) return;
    var P = b(this, T).event(w), $ = this.__zoom, H = Math.max(s[0], Math.min(s[1], $.k * Math.pow(2, o.apply(this, arguments)))), z = ot(w);
    if (P.wheel)
      (P.mouse[0][0] !== z[0] || P.mouse[0][1] !== z[1]) && (P.mouse[1] = $.invert(P.mouse[0] = z)), clearTimeout(P.wheel);
    else {
      if ($.k === H) return;
      P.mouse = [z, $.invert(z)], Jn(this), P.start();
    }
    ln(w), P.wheel = setTimeout(I, p), P.zoom("mouse", n(k(x($, H), P.mouse[0], P.mouse[1]), P.extent, a));
    function I() {
      P.wheel = null, P.end();
    }
  }
  function R(w, ...T) {
    if (u || !t.apply(this, arguments)) return;
    var P = w.currentTarget, $ = b(this, T, !0).event(w), H = We(w.view).on("mousemove.zoom", N, !0).on("mouseup.zoom", O, !0), z = ot(w, P), I = w.clientX, C = w.clientY;
    Yr(w.view), zo(w), $.mouse = [z, this.__zoom.invert(z)], Jn(this), $.start();
    function N(Y) {
      if (ln(Y), !$.moved) {
        var K = Y.clientX - I, U = Y.clientY - C;
        $.moved = K * K + U * U > g;
      }
      $.event(Y).zoom("mouse", n(k($.that.__zoom, $.mouse[0] = ot(Y, P), $.mouse[1]), $.extent, a));
    }
    function O(Y) {
      H.on("mousemove.zoom mouseup.zoom", null), Xr(Y.view, $.moved), ln(Y), $.event(Y).end();
    }
  }
  function L(w, ...T) {
    if (t.apply(this, arguments)) {
      var P = this.__zoom, $ = ot(w.changedTouches ? w.changedTouches[0] : w, this), H = P.invert($), z = P.k * (w.shiftKey ? 0.5 : 2), I = n(k(x(P, z), $, H), e.apply(this, T), a);
      ln(w), r > 0 ? We(this).transition().duration(r).call(S, I, $, w) : We(this).call(y.transform, I, $, w);
    }
  }
  function D(w, ...T) {
    if (t.apply(this, arguments)) {
      var P = w.touches, $ = P.length, H = b(this, T, w.changedTouches.length === $).event(w), z, I, C, N;
      for (zo(w), I = 0; I < $; ++I)
        C = P[I], N = ot(C, this), N = [N, this.__zoom.invert(N), C.identifier], H.touch0 ? !H.touch1 && H.touch0[2] !== N[2] && (H.touch1 = N, H.taps = 0) : (H.touch0 = N, z = !0, H.taps = 1 + !!d);
      d && (d = clearTimeout(d)), z && (H.taps < 2 && (f = N[0], d = setTimeout(function() {
        d = null;
      }, h)), Jn(this), H.start());
    }
  }
  function A(w, ...T) {
    if (this.__zooming) {
      var P = b(this, T).event(w), $ = w.changedTouches, H = $.length, z, I, C, N;
      for (ln(w), z = 0; z < H; ++z)
        I = $[z], C = ot(I, this), P.touch0 && P.touch0[2] === I.identifier ? P.touch0[0] = C : P.touch1 && P.touch1[2] === I.identifier && (P.touch1[0] = C);
      if (I = P.that.__zoom, P.touch1) {
        var O = P.touch0[0], Y = P.touch0[1], K = P.touch1[0], U = P.touch1[1], W = (W = K[0] - O[0]) * W + (W = K[1] - O[1]) * W, re = (re = U[0] - Y[0]) * re + (re = U[1] - Y[1]) * re;
        I = x(I, Math.sqrt(W / re)), C = [(O[0] + K[0]) / 2, (O[1] + K[1]) / 2], N = [(Y[0] + U[0]) / 2, (Y[1] + U[1]) / 2];
      } else if (P.touch0) C = P.touch0[0], N = P.touch0[1];
      else return;
      P.zoom("touch", n(k(I, C, N), P.extent, a));
    }
  }
  function v(w, ...T) {
    if (this.__zooming) {
      var P = b(this, T).event(w), $ = w.changedTouches, H = $.length, z, I;
      for (zo(w), u && clearTimeout(u), u = setTimeout(function() {
        u = null;
      }, h), z = 0; z < H; ++z)
        I = $[z], P.touch0 && P.touch0[2] === I.identifier ? delete P.touch0 : P.touch1 && P.touch1[2] === I.identifier && delete P.touch1;
      if (P.touch1 && !P.touch0 && (P.touch0 = P.touch1, delete P.touch1), P.touch0) P.touch0[1] = this.__zoom.invert(P.touch0[0]);
      else if (P.end(), P.taps === 2 && (I = ot(I, this), Math.hypot(f[0] - I[0], f[1] - I[1]) < m)) {
        var C = We(this).on("dblclick.zoom");
        C && C.apply(this, arguments);
      }
    }
  }
  return y.wheelDelta = function(w) {
    return arguments.length ? (o = typeof w == "function" ? w : Bn(+w), y) : o;
  }, y.filter = function(w) {
    return arguments.length ? (t = typeof w == "function" ? w : Bn(!!w), y) : t;
  }, y.touchable = function(w) {
    return arguments.length ? (i = typeof w == "function" ? w : Bn(!!w), y) : i;
  }, y.extent = function(w) {
    return arguments.length ? (e = typeof w == "function" ? w : Bn([[+w[0][0], +w[0][1]], [+w[1][0], +w[1][1]]]), y) : e;
  }, y.scaleExtent = function(w) {
    return arguments.length ? (s[0] = +w[0], s[1] = +w[1], y) : [s[0], s[1]];
  }, y.translateExtent = function(w) {
    return arguments.length ? (a[0][0] = +w[0][0], a[1][0] = +w[1][0], a[0][1] = +w[0][1], a[1][1] = +w[1][1], y) : [[a[0][0], a[0][1]], [a[1][0], a[1][1]]];
  }, y.constrain = function(w) {
    return arguments.length ? (n = w, y) : n;
  }, y.duration = function(w) {
    return arguments.length ? (r = +w, y) : r;
  }, y.interpolate = function(w) {
    return arguments.length ? (l = w, y) : l;
  }, y.on = function() {
    var w = c.on.apply(c, arguments);
    return w === c ? y : w;
  }, y.clickDistance = function(w) {
    return arguments.length ? (g = (w = +w) * w, y) : Math.sqrt(g);
  }, y.tapDistance = function(w) {
    return arguments.length ? (m = +w, y) : m;
  }, y;
}
function hs(t) {
  const { pannable: e, zoomable: n, isLocked: o, noPanClassName: i, noWheelClassName: s, isTouchSelectionMode: a, isPanKeyHeld: r, panOnDrag: l } = t;
  return (c) => {
    if (o?.() || c.type !== "wheel" && i && c.target?.closest?.("." + i) || c.type === "wheel" && s && c.target?.closest?.("." + s) || !n && c.type === "wheel") return !1;
    if (c.type === "touchstart") {
      const d = !c.touches || c.touches.length < 2;
      if (a?.() && d || !e && !r?.() && d || !n && !d) return !1;
    }
    return c.type === "mousedown" ? r?.() ? !0 : e ? Array.isArray(l) ? l.includes(c.button) : l === !1 ? !1 : !c.button : !1 : !0;
  };
}
const xf = 300, Ef = 1.5;
function gs(t, e, n, o) {
  return {
    x: e - (e - t.x) / t.zoom * o,
    y: n - (n - t.y) / t.zoom * o,
    zoom: o
  };
}
function Cf(t, e, n) {
  if (!(t.zoom >= n.level - 1e-3))
    return { next: gs(t, e.x, e.y, n.level), remember: t };
  if (n.remembered)
    return { next: n.remembered, remember: null };
  const i = n.zoomOut ?? "min", s = i === "fit" || typeof i == "number" && Number.isFinite(i) ? i : "min";
  if (s === "fit") {
    const r = n.fit?.();
    if (r && r.zoom < t.zoom - 1e-3)
      return { next: r, remember: null };
  }
  const a = Math.max(n.minZoom, s === "fit" || s === "min" ? n.minZoom : s);
  return t.zoom <= a + 1e-3 ? { next: t, remember: null } : { next: gs(t, e.x, e.y, a), remember: null };
}
function Sf(t, e) {
  const {
    onTransformChange: n,
    minZoom: o = 0.5,
    maxZoom: i = 2,
    pannable: s = !0,
    zoomable: a = !0
  } = e, r = We(t);
  let l = !1;
  const c = e.panActivationKeyCode !== void 0 ? e.panActivationKeyCode : "Space", d = (T) => {
    c && T.code === c && (l = !0, t.style.cursor = "grab");
  }, f = (T) => {
    c && T.code === c && (l = !1, t.style.cursor = "");
  }, u = () => {
    l = !1, t.style.cursor = "";
  };
  c && (window.addEventListener("keydown", d), window.addEventListener("keyup", f), window.addEventListener("blur", u));
  let h = null, p = a;
  const g = bf().scaleExtent([o, i]).on("start", (T) => {
    if (!T.sourceEvent) return;
    h = null, l && (t.style.cursor = "grabbing");
    const { x: P, y: $, k: H } = T.transform;
    e.onMoveStart?.({ x: P, y: $, zoom: H });
  }).on("zoom", (T) => {
    const { x: P, y: $, k: H } = T.transform;
    n({ x: P, y: $, zoom: H }), T.sourceEvent && e.onMove?.({ x: P, y: $, zoom: H });
  }).on("end", (T) => {
    if (!T.sourceEvent) return;
    l && (t.style.cursor = "grab");
    const { x: P, y: $, k: H } = T.transform;
    e.onMoveEnd?.({ x: P, y: $, zoom: H });
  });
  e.translateExtent && g.translateExtent(e.translateExtent), g.filter(hs({
    pannable: s,
    zoomable: a,
    isLocked: e.isLocked,
    noPanClassName: e.noPanClassName,
    noWheelClassName: e.noWheelClassName,
    isTouchSelectionMode: e.isTouchSelectionMode,
    isPanKeyHeld: () => l,
    panOnDrag: e.panOnDrag
  })), r.call(g);
  const m = e.zoomOnDoubleClick === "toggle" ? "toggle" : e.zoomOnDoubleClick === !1 ? "off" : "step", y = Math.max(
    o,
    Math.min(i, e.dblClickZoomLevel ?? Ef)
  ), x = typeof e.dblClickZoomOutLevel == "number" && Number.isFinite(e.dblClickZoomOutLevel) ? Math.max(o, Math.min(i, e.dblClickZoomOutLevel)) : e.dblClickZoomOutLevel === "fit" ? "fit" : "min", k = (T) => {
    if (e.isLocked?.()) return;
    const P = T.target;
    if (e.noPanClassName && P?.closest?.("." + e.noPanClassName)) return;
    T.preventDefault();
    const $ = t.__zoom ?? Ot, H = t.getBoundingClientRect(), { next: z, remember: I } = Cf(
      { x: $.x, y: $.y, zoom: $.k },
      { x: T.clientX - H.left, y: T.clientY - H.top },
      {
        level: y,
        minZoom: o,
        remembered: h,
        zoomOut: x,
        fit: e.getFitViewport ?? null
      }
    );
    h = I, r.transition().duration(xf).call(g.transform, Ot.translate(z.x, z.y).scale(z.zoom));
  }, S = m === "toggle" && y > (typeof x == "number" ? x : o) + 1e-3;
  S ? (r.on("dblclick.zoom", null), t.addEventListener("dblclick", k)) : m === "off" && r.on("dblclick.zoom", null);
  let b = e.panOnScroll ?? !1, E = e.panOnScrollDirection ?? "both", M = e.panOnScrollSpeed ?? 1, R = !1;
  const L = e.zoomActivationKeyCode !== void 0 ? e.zoomActivationKeyCode : null, D = (T) => {
    L && T.code === L && (R = !0);
  }, A = (T) => {
    L && T.code === L && (R = !1);
  }, v = () => {
    R = !1;
  };
  L && (window.addEventListener("keydown", D), window.addEventListener("keyup", A), window.addEventListener("blur", v));
  const w = (T) => {
    if (e.isLocked?.()) return;
    const P = T.ctrlKey || T.metaKey || R;
    if (!(b ? !P : T.shiftKey)) return;
    T.preventDefault(), T.stopPropagation();
    const H = M;
    let z = 0, I = 0;
    E !== "horizontal" && (I = -T.deltaY * H), E !== "vertical" && (z = -T.deltaX * H, T.shiftKey && T.deltaX === 0 && E === "both" && (z = -T.deltaY * H, I = 0)), e.onScrollPan?.(z, I);
  };
  return t.addEventListener("wheel", w, { passive: !1, capture: !0 }), {
    setViewport(T, P) {
      h = null;
      const $ = P?.duration ?? 0, H = Ot.translate(T.x ?? 0, T.y ?? 0).scale(T.zoom ?? 1);
      $ > 0 ? r.transition().duration($).call(g.transform, H) : r.call(g.transform, H);
    },
    getTransform() {
      return t.__zoom ?? Ot;
    },
    update(T) {
      if ((T.minZoom !== void 0 || T.maxZoom !== void 0) && g.scaleExtent([
        T.minZoom ?? o,
        T.maxZoom ?? i
      ]), T.pannable !== void 0 || T.zoomable !== void 0) {
        const P = T.pannable ?? s, $ = T.zoomable ?? p;
        p = $, g.filter(hs({
          pannable: P,
          zoomable: $,
          isLocked: e.isLocked,
          noPanClassName: e.noPanClassName,
          noWheelClassName: e.noWheelClassName,
          isTouchSelectionMode: e.isTouchSelectionMode,
          isPanKeyHeld: () => l,
          panOnDrag: e.panOnDrag
        }));
      }
      T.panOnScroll !== void 0 && (b = T.panOnScroll), T.panOnScrollDirection !== void 0 && (E = T.panOnScrollDirection), T.panOnScrollSpeed !== void 0 && (M = T.panOnScrollSpeed);
    },
    destroy() {
      t.removeEventListener("wheel", w, { capture: !0 }), S && t.removeEventListener("dblclick", k), c && (window.removeEventListener("keydown", d), window.removeEventListener("keyup", f), window.removeEventListener("blur", u)), L && (window.removeEventListener("keydown", D), window.removeEventListener("keyup", A), window.removeEventListener("blur", v)), r.on(".zoom", null);
    }
  };
}
function la(t, e, n, o) {
  return {
    x: (t - o.left - n.x) / n.zoom,
    y: (e - o.top - n.y) / n.zoom
  };
}
function kf(t, e, n, o) {
  return {
    x: t * n.zoom + n.x + o.left,
    y: e * n.zoom + n.y + o.top
  };
}
const we = 150, be = 50;
function No(t, e, n, o, i) {
  if (i % 360 === 0) return { x: t, y: e, width: n, height: o };
  const s = i * Math.PI / 180, a = Math.abs(Math.cos(s)), r = Math.abs(Math.sin(s)), l = n * a + o * r, c = n * r + o * a, d = t + n / 2, f = e + o / 2;
  return { x: d - l / 2, y: f - c / 2, width: l, height: c };
}
function Gt(t, e) {
  if (t.length === 0)
    return { x: 0, y: 0, width: 0, height: 0 };
  let n = 1 / 0, o = 1 / 0, i = -1 / 0, s = -1 / 0;
  for (const a of t) {
    const r = a.dimensions?.width ?? we, l = a.dimensions?.height ?? be, c = en(a, e), d = a.rotation ? No(c.x, c.y, r, l, a.rotation) : { x: c.x, y: c.y, width: r, height: l };
    n = Math.min(n, d.x), o = Math.min(o, d.y), i = Math.max(i, d.x + d.width), s = Math.max(s, d.y + d.height);
  }
  return {
    x: n,
    y: o,
    width: i - n,
    height: s - o
  };
}
function Lf(t, e, n) {
  const o = e.x + e.width, i = e.y + e.height;
  return t.filter((s) => {
    const a = s.dimensions?.width ?? we, r = s.dimensions?.height ?? be, l = en(s, n), c = s.rotation ? No(l.x, l.y, a, r, s.rotation) : { x: l.x, y: l.y, width: a, height: r }, d = c.x + c.width, f = c.y + c.height;
    return !(d < e.x || c.x > o || f < e.y || c.y > i);
  });
}
function Mf(t, e, n) {
  const o = e.x + e.width, i = e.y + e.height;
  return t.filter((s) => {
    const a = s.dimensions?.width ?? we, r = s.dimensions?.height ?? be, l = en(s, n), c = s.rotation ? No(l.x, l.y, a, r, s.rotation) : { x: l.x, y: l.y, width: a, height: r };
    return c.x >= e.x && c.y >= e.y && c.x + c.width <= o && c.y + c.height <= i;
  });
}
function co(t, e, n, o, i, s = 0.1) {
  const a = Math.max(t.width, 1), r = Math.max(t.height, 1), l = a * (1 + s), c = r * (1 + s), d = e / l, f = n / c, u = Math.min(Math.max(Math.min(d, f), o), i), h = { x: t.x + a / 2, y: t.y + r / 2 }, p = e / 2 - h.x * u, g = n / 2 - h.y * u;
  return { x: p, y: g, zoom: u };
}
function Pf(t, e, n, o) {
  const i = 1 / t.zoom;
  return {
    minX: (0 - t.x) * i - o,
    minY: (0 - t.y) * i - o,
    maxX: (e - t.x) * i + o,
    maxY: (n - t.y) * i + o
  };
}
class Nf {
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
  insert(e, n, o, i, s) {
    this.remove(e);
    const { minCX: a, minCY: r, maxCX: l, maxCY: c } = this._getCellRange(n, o, i, s), d = [];
    for (let f = a; f <= l; f++)
      for (let u = r; u <= c; u++) {
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
  update(e, n, o, i, s) {
    this.insert(e, n, o, i, s);
  }
  query(e) {
    const { minCX: n, minCY: o, maxCX: i, maxCY: s } = this._getCellRange(
      e.minX,
      e.minY,
      e.maxX - e.minX,
      e.maxY - e.minY
    ), a = /* @__PURE__ */ new Set();
    for (let r = n; r <= i; r++)
      for (let l = o; l <= s; l++) {
        const c = this._cells.get(this._cellKey(r, l));
        if (c)
          for (const d of c)
            a.add(d);
      }
    return a;
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
  const n = t.nodeOrigin ?? e ?? [0, 0], o = t.dimensions?.width ?? we, i = t.dimensions?.height ?? be;
  return {
    x: t.position.x - o * n[0],
    y: t.position.y - i * n[1]
  };
}
let ca = !1;
function da(t) {
  ca = t;
}
function B(t, e, n) {
  if (!ca) return;
  const o = `%c[AlpineFlow:${t}]`, i = Af(t);
  n !== void 0 ? console.log(o, i, e, n) : console.log(o, i, e);
}
function Af(t) {
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
const Sn = "#64748b", Ii = "#d4d4d8", ua = "#ef4444", Tf = "2", If = "6 3", ps = 1.2, Qn = 0.2, uo = 5, ms = 25;
class $f {
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
const Df = 16;
function Rf() {
  return typeof requestAnimationFrame == "function" ? {
    request: (t) => requestAnimationFrame(t),
    cancel: (t) => cancelAnimationFrame(t)
  } : {
    request: (t) => setTimeout(() => t(performance.now()), Df),
    cancel: (t) => clearTimeout(t)
  };
}
class fa {
  constructor() {
    this._scheduler = Rf(), this._entries = [], this._postTickCallbacks = [], this._frameId = null, this._running = !1;
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
      const s = e - i.startTime;
      i.callback(s) === !0 && (i.removed = !0);
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
const fo = new fa(), Hf = {
  linear: $u,
  easeIn: Du,
  easeOut: Ru,
  easeInOut: Hu,
  easeCubicIn: Fu,
  easeCubicOut: Ou,
  easeCubicInOut: sa,
  easeCircIn: Wu,
  easeCircOut: ju,
  easeCircInOut: Uu,
  easeSinIn: zu,
  easeSinOut: Vu,
  easeSinInOut: Bu,
  easeExpoIn: qu,
  easeExpoOut: Yu,
  easeExpoInOut: Xu,
  easeBounce: lo,
  easeBounceIn: of,
  easeBounceInOut: sf,
  easeElastic: df,
  easeElasticIn: cf,
  easeElasticInOut: uf,
  easeBack: lf,
  easeBackIn: rf,
  easeBackOut: af
};
function ha(t) {
  const e = t ?? "auto";
  return e === !1 ? !1 : e === !0 ? !0 : typeof globalThis < "u" && globalThis.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches === !0;
}
function ho(t) {
  return typeof t == "function" ? t : Hf[t ?? "easeInOut"];
}
function lt(t, e, n) {
  return t + (e - t) * n;
}
function $i(t, e, n) {
  return ii(t, e)(n);
}
function kn(t) {
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
    const s = o.slice(0, i).trim(), a = o.slice(i + 1).trim();
    e[s] = a;
  }
  return e;
}
const ys = /^(-?\d+\.?\d*)(px|em|rem|%|vh|vw|pt|cm|mm|in|ex|ch)?$/, ws = /^(#|rgb|hsl)/;
function ga(t, e, n) {
  const o = {}, i = /* @__PURE__ */ new Set([...Object.keys(t), ...Object.keys(e)]);
  for (const s of i) {
    const a = t[s], r = e[s];
    if (a === void 0) {
      o[s] = r;
      continue;
    }
    if (r === void 0) {
      o[s] = a;
      continue;
    }
    const l = ys.exec(a), c = ys.exec(r);
    if (l && c) {
      const d = parseFloat(l[1]), f = parseFloat(c[1]), u = c[2] ?? "", h = lt(d, f, n);
      o[s] = u ? `${h}${u}` : String(h);
      continue;
    }
    if (ws.test(a) && ws.test(r)) {
      o[s] = $i(a, r, n);
      continue;
    }
    o[s] = n < 0.5 ? a : r;
  }
  return o;
}
function Ff(t, e, n, o) {
  let i = lt(t.zoom, e.zoom, n);
  return o?.minZoom !== void 0 && (i = Math.max(i, o.minZoom)), o?.maxZoom !== void 0 && (i = Math.min(i, o.maxZoom)), {
    x: lt(t.x, e.x, n),
    y: lt(t.y, e.y, n),
    zoom: i
  };
}
class Of {
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
    return e.tag && o.add(e.tag), e.tags && e.tags.forEach((i) => o.add(i)), n.filter((i) => i._tags?.some((s) => o.has(s)) ?? !1);
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
class zf {
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
const cn = {
  stiffness: 180,
  damping: 12,
  mass: 1,
  restVelocity: 0.01,
  restDisplacement: 0.01
};
function pa(t, e, n) {
  if (n <= 0)
    return;
  const o = e.stiffness ?? cn.stiffness, i = e.damping ?? cn.damping, s = e.mass ?? cn.mass, a = t.value - t.target, r = (-o * a - i * t.velocity) / s;
  t.velocity += r * n, t.value += t.velocity * n, Math.abs(t.velocity) < (e.restVelocity ?? cn.restVelocity) && Math.abs(t.value - t.target) < (e.restDisplacement ?? cn.restDisplacement) && (t.value = t.target, t.velocity = 0, t.settled = !0);
}
const _s = {
  timeConstant: 350,
  restVelocity: 0.5
};
function Di(t, e, n) {
  if (n <= 0)
    return;
  const o = e.timeConstant ?? _s.timeConstant, i = Math.exp(-n * 1e3 / o);
  t.velocity *= i, t.value += t.velocity * n, Math.abs(t.velocity) < _s.restVelocity && (t.velocity = 0, t.settled = !0, t.target = t.value);
}
function Ri(t) {
  const e = t.lastIndexOf("."), n = t.lastIndexOf(":"), o = Math.max(e, n);
  if (o < 0) return null;
  const i = t.slice(o + 1);
  return i.length === 0 || i.length > 6 ? null : i;
}
function ma(t, e, n, o) {
  if (n <= 0)
    return;
  Di(t, {
    velocity: t.velocity,
    power: e.power,
    timeConstant: e.timeConstant
  }, n);
  const i = o ? Ri(o) : null;
  if (e.bounds && o) {
    const s = e.bounds[o] ?? (i ? e.bounds[i] : void 0);
    if (s) {
      const [a, r] = s, l = (e.bounceStiffness ?? 200) / 500, c = (e.bounceDamping ?? 40) / 100, d = l * (1 - c);
      t.value < a ? (t.value = a, t.velocity = Math.abs(t.velocity) * d, t.settled = !1) : t.value > r && (t.value = r, t.velocity = -Math.abs(t.velocity) * d, t.settled = !1);
    }
  }
  if (t.settled && e.snapTo?.length && o) {
    let s = t.value, a = 1 / 0;
    for (const r of e.snapTo) {
      const l = r[o] ?? (i ? r[i] : void 0);
      if (l !== void 0) {
        const c = Math.abs(t.value - l);
        c < a && (a = c, s = l);
      }
    }
    t.value = s;
  }
}
function ya(t, e, n, o) {
  const i = Ri(o), s = e.values.map(
    (p) => p[o] ?? (i ? p[i] : void 0) ?? t.value
  );
  if (s.length < 2) {
    t.value = s[0] ?? t.value, t.settled = !0;
    return;
  }
  const a = e.offsets ?? s.map((p, g) => g / (s.length - 1)), r = Math.max(0, Math.min(1, n));
  let l = 0;
  for (let p = 0; p < a.length - 1; p++)
    r >= a[p] && (l = p);
  const c = a[l], d = a[l + 1] ?? 1, f = d > c ? (r - c) / (d - c) : 1, u = s[l], h = s[l + 1] ?? s[l];
  t.value = u + (h - u) * Math.max(0, Math.min(1, f)), r >= 1 && (t.value = s[s.length - 1], t.settled = !0);
}
const vs = {
  gentle: { type: "spring", stiffness: 120, damping: 14 },
  wobbly: { type: "spring", stiffness: 180, damping: 12 },
  stiff: { type: "spring", stiffness: 300, damping: 30 },
  slow: { type: "spring", stiffness: 60, damping: 15 },
  molasses: { type: "spring", stiffness: 40, damping: 30 }
}, bs = {
  smooth: { type: "decay", velocity: 0, power: 0.6, timeConstant: 400 },
  snappy: { type: "decay", velocity: 0, power: 1.2, timeConstant: 200 }
}, xs = {
  momentum: { type: "inertia", velocity: 0, power: 0.8, timeConstant: 700 },
  rails: { type: "inertia", velocity: 0, bounceStiffness: 500, bounceDamping: 40 }
};
function wa(t) {
  if (typeof t != "string")
    return t;
  const [e, n] = t.split(".");
  if (!n)
    return null;
  switch (e) {
    case "spring":
      return vs[n] ? { ...vs[n] } : null;
    case "decay":
      return bs[n] ? { ...bs[n] } : null;
    case "inertia":
      return xs[n] ? { ...xs[n] } : null;
    default:
      return null;
  }
}
function Es(t) {
  return typeof t != "string" ? !1 : /^(#|rgb|hsl)/.test(t);
}
function Vf(t, e, n) {
  return typeof t == "number" && typeof e == "number" ? lt(t, e, n) : Es(t) && Es(e) ? $i(t, e, n) : n < 0.5 ? t : e;
}
class Bf {
  constructor(e) {
    this._ownership = /* @__PURE__ */ new Map(), this._groups = /* @__PURE__ */ new Set(), this._nextGroupId = 0, this._registry = new Of(), this._activeTransaction = null, this._engine = e;
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
    const e = new zf();
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
      delay: s = 0,
      loop: a = !1,
      startAt: r,
      onStart: l,
      onProgress: c,
      onComplete: d,
      tag: f,
      tags: u,
      while: h,
      whileStopMode: p = "jump-end",
      motion: g,
      maxDuration: m = 5e3
    } = n, y = ho(i), x = g ? wa(g) : void 0;
    for (const w of e) {
      const T = this._ownership.get(w.key);
      if (T && !T.stopped) {
        const P = T.currentValues.get(w.key);
        P !== void 0 && (w.from = P), T.entries = T.entries.filter(($) => $.key !== w.key), T.entries.length === 0 && this._stop(T, "superseded");
      }
    }
    if (this._activeTransaction && this._activeTransaction.state === "active")
      for (const w of e)
        this._activeTransaction.captureProperty(w.key, w.from, w.apply);
    if (o <= 0) {
      const w = /* @__PURE__ */ new Map(), T = /* @__PURE__ */ new Map();
      for (const H of e)
        w.set(H.key, H.from), T.set(H.key, H.to);
      l?.();
      for (const H of e)
        H.apply(H.to);
      const P = [...f ? [f] : [], ...u ?? []], $ = {
        _tags: P.length > 0 ? P : void 0,
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
          return T;
        },
        finished: Promise.resolve(),
        get _snapshot() {
          return w;
        },
        get _target() {
          return T;
        }
      };
      return this._registry.register($), queueMicrotask(() => this._registry.unregister($)), this._activeTransaction && this._activeTransaction.state === "active" && this._activeTransaction.trackHandle($), d?.(), $;
    }
    const k = /* @__PURE__ */ new Map(), _ = /* @__PURE__ */ new Map();
    for (const w of e)
      k.set(w.key, w.from), _.set(w.key, w.to);
    let S;
    if (x) {
      S = /* @__PURE__ */ new Map();
      for (const w of e) {
        if (typeof w.from != "number" || typeof w.to != "number") {
          console.warn(
            `[AlpineFlow] motion: requires numeric properties. "${w.key}" is non-numeric; snapping to target.`
          ), w.apply(w.to);
          continue;
        }
        let T = 0;
        if (x.type === "decay" || x.type === "inertia") {
          const P = x.velocity;
          if (typeof P == "number")
            T = P;
          else if (P && typeof P == "object") {
            const H = P, z = Ri(w.key);
            T = H[w.key] ?? (z ? H[z] ?? 0 : 0);
          }
          const $ = x.power ?? 0.8;
          T *= $;
        }
        S.set(w.key, {
          value: w.from,
          velocity: T,
          target: w.to,
          settled: !1
        });
      }
      S.size === 0 && (S = void 0);
    }
    const b = a === "ping-pong" ? "reverse" : a, E = r === "end" ? "backward" : "forward";
    let M;
    const R = new Promise((w) => {
      M = w;
    }), L = {
      _id: this._nextGroupId++,
      entries: [...e],
      engineHandle: null,
      startTime: 0,
      pausedElapsed: null,
      _resumeNeeded: !1,
      direction: E,
      duration: o,
      easingFn: y,
      loop: b,
      onStart: l,
      startFired: !1,
      onProgress: c,
      onComplete: d,
      resolve: M,
      stopped: !1,
      isFinished: !1,
      currentValues: /* @__PURE__ */ new Map(),
      _lastElapsed: 0,
      _lastTickWallTime: 0,
      snapshot: k,
      target: _,
      _currentFinished: R,
      whilePredicate: h,
      whileStopMode: p,
      motionConfig: S ? x : void 0,
      physicsStates: S,
      maxDuration: m,
      isPhysics: !!S,
      _prevElapsed: 0
    };
    if (r === "end")
      for (const w of L.entries)
        w.apply(w.to), L.currentValues.set(w.key, w.to);
    else
      for (const w of L.entries)
        L.currentValues.set(w.key, w.from);
    for (const w of e)
      this._ownership.set(w.key, L);
    this._groups.add(L);
    const D = this._engine.register((w) => this._tick(L, w), s);
    L.engineHandle = D;
    const A = [...f ? [f] : [], ...u ?? []], v = {
      _tags: A.length > 0 ? A : void 0,
      pause: () => this._pause(L),
      resume: () => this._resume(L),
      stop: (w) => this._stop(L, w?.mode ?? "jump-end"),
      reverse: () => this._reverse(L),
      play: () => this._play(L),
      playForward: () => this._playDirection(L, "forward"),
      playBackward: () => this._playDirection(L, "backward"),
      restart: (w) => this._restart(L, w),
      get direction() {
        return L.direction;
      },
      get isFinished() {
        return L.isFinished;
      },
      get currentValue() {
        return L.currentValues;
      },
      get finished() {
        return L._currentFinished;
      },
      get _snapshot() {
        return L.snapshot;
      },
      get _target() {
        return L.target;
      }
    };
    return this._registry.register(v), L._handle = v, this._activeTransaction && this._activeTransaction.state === "active" && this._activeTransaction.trackHandle(v), v;
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
        const r = o / e.duration, l = Math.floor(r), c = r - l;
        i = l % 2 === 0 ? c : 1 - c;
      } else
        i = o % e.duration / e.duration;
    const s = e.direction === "backward" ? 1 - i : i, a = e.easingFn(s);
    for (const r of e.entries) {
      const l = Vf(r.from, r.to, a);
      e.currentValues.set(r.key, l), r.apply(l);
    }
    if (e.onProgress?.(s), !e.loop && i >= 1) {
      for (const r of e.entries) {
        const l = e.direction === "backward" ? r.from : r.to;
        r.apply(l), e.currentValues.set(r.key, l);
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
    const s = e.physicsStates;
    let a = !0;
    for (const c of e.entries) {
      const d = s.get(c.key);
      if (d) {
        if (!d.settled) {
          switch (e.direction === "backward" ? d.target = e.snapshot.get(c.key) : d.target = e.target.get(c.key), e.motionConfig.type) {
            case "spring":
              pa(d, e.motionConfig, i);
              break;
            case "decay":
              Di(d, e.motionConfig, i);
              break;
            case "inertia":
              ma(d, e.motionConfig, i, c.key);
              break;
            case "keyframes": {
              const f = n - e.startTime, u = e.motionConfig.duration ?? e.maxDuration, h = Math.min(f / u, 1);
              ya(d, e.motionConfig, h, c.key);
              break;
            }
          }
          e.currentValues.set(c.key, d.value), c.apply(d.value);
        }
        d.settled || (a = !1);
      }
    }
    const r = n - e.startTime, l = Math.min(r / e.maxDuration, 1);
    if (e.onProgress?.(l), r >= e.maxDuration) {
      for (const [c, d] of s)
        if (!d.settled) {
          d.value = d.target, d.velocity = 0, d.settled = !0;
          const f = e.entries.find((u) => u.key === c);
          f && (f.apply(d.value), e.currentValues.set(f.key, d.value));
        }
      a = !0;
    }
    if (a)
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
        for (const [i, s] of e.physicsStates)
          n === "backward" ? s.target = e.snapshot.get(i) : s.target = e.target.get(i), s.velocity = 0, s.settled = !1;
      else if (o && e._lastElapsed > 0) {
        const i = this._estimatedCurrentElapsed(e), s = Math.min((i - e.startTime) / e.duration, 1);
        e.startTime = i - (1 - s) * e.duration;
      }
      e.pausedElapsed !== null && this._resume(e);
    }
  }
  _restart(e, n) {
    const o = n?.direction ?? "forward";
    if (e.direction = o, o === "forward")
      for (const i of e.entries) {
        const s = e.snapshot.get(i.key);
        s !== void 0 && (i.apply(s), e.currentValues.set(i.key, s));
      }
    else
      for (const i of e.entries) {
        const s = e.target.get(i.key);
        s !== void 0 && (i.apply(s), e.currentValues.set(i.key, s));
      }
    if (e.isPhysics && e.physicsStates)
      for (const [i, s] of e.physicsStates)
        o === "forward" ? (s.value = e.snapshot.get(i), s.target = e.target.get(i)) : (s.value = e.target.get(i), s.target = e.snapshot.get(i)), s.velocity = 0, s.settled = !1;
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
const _a = /* @__PURE__ */ new Map();
function qf(t, e) {
  _a.set(t, e);
}
function Vo(t) {
  return t.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function Yt(t) {
  return typeof t == "string" ? { type: t } : t;
}
function Xt(t, e) {
  return `${e}__${t.type}__${(t.color ?? Ii).replace(/[^a-zA-Z0-9]/g, "_")}`;
}
function go(t, e) {
  const n = Vo(t.color ?? Ii), o = Number(t.width ?? 12.5), i = Number(t.height ?? 12.5), s = Number.isFinite(o) && o > 0 ? o : 12.5, a = Number.isFinite(i) && i > 0 ? i : 12.5, r = Vo(t.orient ?? "auto-start-reverse"), l = Vo(e);
  if (t.type === "arrow")
    return `<marker
      id="${l}"
      viewBox="-10 -10 20 20"
      markerWidth="${s}"
      markerHeight="${a}"
      orient="${r}"
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
      markerWidth="${s}"
      markerHeight="${a}"
      orient="${r}"
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
  const c = _a.get(t.type);
  return c ? c({ id: l, color: n, width: s, height: a, orient: r }) : go({ ...t, type: "arrowclosed" }, e);
}
const Yf = ["mousedown", "pointerdown", "touchstart", "wheel", "dblclick"];
function tn(t, e = Yf) {
  const n = (i) => i.stopPropagation(), o = { passive: !1 };
  for (const i of e)
    t.addEventListener(i, n, o);
  return () => {
    for (const i of e)
      t.removeEventListener(i, n, o);
  };
}
const va = 200, ba = 150, Xf = 1.2, dn = "http://www.w3.org/2000/svg";
function Wf(t, e) {
  const { getState: n, setViewport: o, config: i } = e, s = i.minimapPosition ?? "bottom-right", a = i.minimapMaskColor, r = i.minimapNodeColor;
  let l = i.minimapWidth ?? va, c = i.minimapHeight ?? ba;
  const d = document.createElement("div");
  d.className = `flow-minimap flow-minimap-${s}`;
  const f = document.createElementNS(dn, "svg");
  f.setAttribute("width", String(l)), f.setAttribute("height", String(c));
  const u = document.createElementNS(dn, "rect");
  u.classList.add("flow-minimap-bg"), u.setAttribute("width", String(l)), u.setAttribute("height", String(c));
  const h = document.createElementNS(dn, "g");
  h.classList.add("flow-minimap-nodes");
  const p = document.createElementNS(dn, "path");
  p.classList.add("flow-minimap-mask"), a && p.setAttribute("fill", a), p.setAttribute("fill-rule", "evenodd"), f.appendChild(u), f.appendChild(h), f.appendChild(p), d.appendChild(f), t.appendChild(d);
  let g = { x: 0, y: 0, width: 0, height: 0 }, m = 1;
  function y() {
    const $ = n();
    if (g = Gt($.nodes.filter((H) => !H.hidden), i.nodeOrigin), g.width === 0 && g.height === 0) {
      m = 1;
      return;
    }
    m = Math.max(
      g.width / l,
      g.height / c
    ) * Xf;
  }
  function x($) {
    return typeof r == "function" ? r($) : r;
  }
  const k = [];
  function _($, H, z) {
    $.getAttribute(H) !== z && $.setAttribute(H, z);
  }
  function S() {
    const $ = n();
    y();
    const H = (l - g.width / m) / 2, z = (c - g.height / m) / 2;
    let I = 0;
    for (const C of $.nodes) {
      if (C.hidden) continue;
      let N = k[I];
      N || (N = document.createElementNS(dn, "rect"), N.setAttribute("rx", "2"), k[I] = N), N.parentNode !== h && h.appendChild(N);
      const O = (C.dimensions?.width ?? we) / m, Y = (C.dimensions?.height ?? be) / m, K = (C.position.x - g.x) / m + H, U = (C.position.y - g.y) / m + z;
      _(N, "x", String(K)), _(N, "y", String(U)), _(N, "width", String(O)), _(N, "height", String(Y));
      const W = x(C);
      W ? N.style.fill !== W && (N.style.fill = W) : N.style.fill && N.style.removeProperty("fill"), I++;
    }
    for (let C = k.length - 1; C >= I; C--)
      k[C].remove();
    k.length = I, b();
  }
  function b() {
    const $ = e.getViewportState ? e.getViewportState() : n();
    if (g.width === 0 && g.height === 0) {
      p.setAttribute("d", "");
      return;
    }
    const H = (l - g.width / m) / 2, z = (c - g.height / m) / 2, I = (-$.viewport.x / $.viewport.zoom - g.x) / m + H, C = (-$.viewport.y / $.viewport.zoom - g.y) / m + z, N = $.containerWidth / $.viewport.zoom / m, O = $.containerHeight / $.viewport.zoom / m, Y = `M0,0 H${l} V${c} H0 Z`, K = `M${I},${C} h${N} v${O} h${-N} Z`;
    p.setAttribute("d", `${Y} ${K}`);
  }
  let E = !1;
  function M($, H) {
    const z = (l - g.width / m) / 2, I = (c - g.height / m) / 2, C = ($ - z) * m + g.x, N = (H - I) * m + g.y;
    return { x: C, y: N };
  }
  function R($) {
    const H = f.getBoundingClientRect(), z = $.clientX - H.left, I = $.clientY - H.top, C = n(), N = M(z, I), O = -N.x * C.viewport.zoom + C.containerWidth / 2, Y = -N.y * C.viewport.zoom + C.containerHeight / 2;
    o({ x: O, y: Y, zoom: C.viewport.zoom });
  }
  function L($) {
    i.minimapPannable && (E = !0, f.setPointerCapture($.pointerId), R($));
  }
  function D($) {
    E && R($);
  }
  function A($) {
    E && (E = !1, f.releasePointerCapture($.pointerId));
  }
  f.addEventListener("pointerdown", L), f.addEventListener("pointermove", D), f.addEventListener("pointerup", A);
  const v = tn(d, ["dblclick"]);
  function w($) {
    if (!i.minimapZoomable)
      return;
    $.preventDefault();
    const H = n(), z = i.minZoom ?? 0.5, I = i.maxZoom ?? 2, C = $.deltaY > 0 ? 0.9 : 1.1, N = Math.min(Math.max(H.viewport.zoom * C, z), I);
    o({ zoom: N });
  }
  f.addEventListener("wheel", w, { passive: !1 });
  function T() {
    f.removeEventListener("pointerdown", L), f.removeEventListener("pointermove", D), f.removeEventListener("pointerup", A), f.removeEventListener("wheel", w), v(), k.length = 0, d.remove();
  }
  function P($, H) {
    return !($ > 0) || !(H > 0) || $ === l && H === c ? !1 : (l = $, c = H, f.setAttribute("width", String(l)), f.setAttribute("height", String(c)), u.setAttribute("width", String(l)), u.setAttribute("height", String(c)), S(), !0);
  }
  return { render: S, updateViewport: b, resize: P, destroy: T };
}
const jf = {
  "controls.label": "Flow controls",
  "controls.zoomIn": "Zoom in",
  "controls.zoomOut": "Zoom out",
  "controls.fitView": "Fit view",
  "controls.toggleInteractive": "Toggle interactivity",
  "controls.lockInteractive": "Lock interactivity",
  "controls.unlockInteractive": "Unlock interactivity",
  "controls.resetPanels": "Reset panels",
  "controls.toggleFullscreen": "Toggle fullscreen",
  "controls.enterFullscreen": "Enter fullscreen",
  "controls.exitFullscreen": "Exit fullscreen",
  "canvas.label": "Flow diagram",
  "canvas.loading": "Loading…",
  "canvas.selectionMode": "Selection Mode — tap with two fingers to exit",
  "a11y.nodeLabel": "Node: :label",
  "a11y.nodeId": "Node :id",
  "a11y.edgeLabel": "Edge: :label",
  "a11y.edgeEndpoints": "Edge from :source to :target",
  "a11y.sourceHandle": "source handle :id",
  "a11y.targetHandle": "target handle :id",
  "a11y.addControlPoint": "Double-click to add control point",
  "announce.nodeAdded": "Added node: :label",
  "announce.nodesAdded_one": "Added :count node",
  "announce.nodesAdded_other": "Added :count nodes",
  "announce.nodeRemoved": "Removed node: :label",
  "announce.nodesRemoved_one": "Removed :count node",
  "announce.nodesRemoved_other": "Removed :count nodes",
  "announce.connected": "Connected :source to :target",
  "announce.connectionsAdded_one": "Added :count connection",
  "announce.connectionsAdded_other": "Added :count connections",
  "announce.disconnected": "Removed connection from :source to :target",
  "announce.connectionsRemoved_one": "Removed :count connection",
  "announce.connectionsRemoved_other": "Removed :count connections",
  "announce.selectionCleared": "Selection cleared",
  "announce.nodesSelected_one": ":count node",
  "announce.nodesSelected_other": ":count nodes",
  "announce.edgesSelected_one": ":count edge",
  "announce.edgesSelected_other": ":count edges",
  "announce.selectionJoin": ":nodes and :edges",
  "announce.selected": ":items selected",
  "announce.viewportZoom": "Viewport: zoom :percent%",
  "announce.viewFitted": "Fitted view to content",
  "announce.node": "node",
  "announce.reparented": "Moved :name into :parent",
  "announce.detached": "Detached :name from :parent",
  "workflow.condition": "Condition",
  "workflow.customEvaluator": "[custom evaluator]",
  "workflow.wait": "Wait",
  "schema.inspector.noNode": "No node selected.",
  "schema.inspector.noEdge": "No edge selected.",
  "schema.inspector.noRow": "No row selected.",
  "schema.inspector.missingRow": "Selected row no longer exists.",
  "schema.inspector.label": "label",
  "schema.inspector.name": "name",
  "schema.inspector.type": "type",
  "schema.inspector.required": "required",
  "schema.inspector.remove": "remove",
  "schema.inspector.delete": "delete",
  "schema.inspector.add": "add",
  "schema.inspector.fieldName": "field name"
}, Uf = jf, po = "en", Cs = /* @__PURE__ */ new Map();
function ui(t) {
  const n = (t ?? (typeof document < "u" ? document.documentElement.lang : "")).trim().replace(/_/g, "-") || po;
  let o = Cs.get(n);
  if (!o) {
    try {
      o = new Intl.PluralRules(n);
    } catch {
      o = ui(po);
    }
    Cs.set(n, o);
  }
  return o;
}
function Ft(t) {
  return typeof t == "string" && t !== "" ? t : void 0;
}
function Ss(t, e, n, o) {
  return n === void 0 ? Ft(t[e]) ?? Ft(t[`${e}_other`]) : Ft(t[`${e}_${o.select(n)}`]) ?? Ft(t[`${e}_other`]) ?? Ft(t[e]);
}
const ks = /* @__PURE__ */ new Map();
function Gf(t, e) {
  const n = Object.keys(e).sort((s, a) => a.length - s.length);
  if (n.length === 0) return t;
  const o = n.join("\0");
  let i = ks.get(o);
  return i || (i = new RegExp(`:(${n.map((s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "g"), ks.set(o, i)), t.replace(i, (s, a) => String(e[a]));
}
function xa(t, e) {
  const n = {};
  for (const [s, a] of Object.entries(t ?? {})) {
    const r = Ft(a);
    r !== void 0 && (n[s] = r);
  }
  const o = ui(e), i = ui(po);
  return (s, a = {}) => {
    const r = typeof a.count == "number" ? a.count : void 0, l = Ss(n, s, r, o) ?? Ss(Uf, s, r, i) ?? s;
    return Gf(l, a);
  };
}
const Ao = xa(void 0, po);
function Tn(t) {
  const e = t;
  return typeof e?.t != "function" ? Ao : (n, o) => e.t(n, o);
}
const Zf = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>', Kf = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>', Jf = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>', Ls = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></svg>', Qf = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>', eh = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>', Ms = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9V3h6"/><path d="M21 9V3h-6"/><path d="M3 15v6h6"/><path d="M21 15v6h-6"/></svg>', th = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3v6H3"/><path d="M15 3v6h6"/><path d="M9 21v-6H3"/><path d="M15 21v-6h6"/></svg>';
function nh(t, e) {
  const n = e.t ?? Ao, {
    position: o,
    orientation: i,
    showZoom: s,
    showFitView: a,
    showInteractive: r,
    showResetPanels: l,
    external: c,
    onZoomIn: d,
    onZoomOut: f,
    onFitView: u,
    onToggleInteractive: h,
    onResetPanels: p,
    onToggleFullscreen: g
  } = e, m = document.createElement("div"), y = [
    "flow-controls",
    `flow-controls-${i}`
  ];
  c ? y.push("flow-controls-external") : y.push(`flow-controls-${o}`), m.className = y.join(" "), m.setAttribute("role", "toolbar"), m.setAttribute("aria-label", n("controls.label"));
  let x = null, k = null;
  if (s) {
    const E = It(Zf, n("controls.zoomIn"), d), M = It(Kf, n("controls.zoomOut"), f);
    m.appendChild(E), m.appendChild(M);
  }
  if (a) {
    const E = It(Jf, n("controls.fitView"), u);
    m.appendChild(E);
  }
  if (r && (x = It(Ls, n("controls.toggleInteractive"), h), m.appendChild(x)), l) {
    const E = It(eh, n("controls.resetPanels"), p);
    m.appendChild(E);
  }
  g && (k = It(Ms, n("controls.toggleFullscreen"), g), k.classList.add("flow-controls-button-fullscreen"), m.appendChild(k));
  const _ = tn(m);
  t.appendChild(m);
  function S(E) {
    if (x && typeof E.isInteractive == "boolean") {
      fi(x, E.isInteractive ? Ls : Qf);
      const M = E.isInteractive ? n("controls.lockInteractive") : n("controls.unlockInteractive");
      x.title = M, x.setAttribute("aria-label", M);
    }
    if (k && typeof E.isFullscreen == "boolean") {
      fi(k, E.isFullscreen ? th : Ms);
      const M = E.isFullscreen ? n("controls.exitFullscreen") : n("controls.enterFullscreen");
      k.title = M, k.setAttribute("aria-label", M), k.classList.toggle("flow-controls-button-fullscreen--active", E.isFullscreen);
    }
  }
  function b() {
    _(), m.remove();
  }
  return { update: S, destroy: b };
}
function It(t, e, n) {
  const o = document.createElement("button");
  return o.type = "button", fi(o, t), o.title = e, o.setAttribute("aria-label", e), o.addEventListener("click", n), o;
}
function fi(t, e) {
  const o = new DOMParser().parseFromString(e, "image/svg+xml").documentElement;
  t.replaceChildren(o);
}
const Ps = 5;
function oh(t) {
  const e = document.createElement("div");
  e.className = "flow-selection-box", t.appendChild(e);
  let n = !1, o = 0, i = 0, s = 0, a = 0;
  function r(u, h, p = "partial") {
    o = u, i = h, s = u, a = h, n = !0, e.style.left = `${u}px`, e.style.top = `${h}px`, e.style.width = "0px", e.style.height = "0px", e.classList.remove("flow-selection-partial", "flow-selection-full"), e.classList.add("flow-selection-box-active", `flow-selection-${p}`);
  }
  function l(u, h) {
    if (!n)
      return;
    s = u, a = h;
    const p = Math.min(o, s), g = Math.min(i, a), m = Math.abs(s - o), y = Math.abs(a - i);
    e.style.left = `${p}px`, e.style.top = `${g}px`, e.style.width = `${m}px`, e.style.height = `${y}px`;
  }
  function c(u) {
    if (!n)
      return null;
    n = !1, e.classList.remove("flow-selection-box-active"), e.classList.remove("flow-selection-partial", "flow-selection-full");
    const h = Math.abs(s - o), p = Math.abs(a - i);
    if (h < Ps && p < Ps)
      return null;
    const g = Math.min(o, s), m = Math.min(i, a), y = (g - u.x) / u.zoom, x = (m - u.y) / u.zoom, k = h / u.zoom, _ = p / u.zoom;
    return { x: y, y: x, width: k, height: _ };
  }
  function d() {
    return n;
  }
  function f() {
    e.remove();
  }
  return { start: r, update: l, end: c, isActive: d, destroy: f };
}
const Ns = 3;
function ih(t) {
  const e = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  e.classList.add("flow-lasso-svg"), e.setAttribute("width", "100%"), e.setAttribute("height", "100%"), t.appendChild(e);
  const n = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
  n.classList.add("flow-lasso-path"), e.appendChild(n);
  let o = !1, i = [];
  function s(d, f, u = "partial") {
    o = !0, i = [{ x: d, y: f }], e.classList.remove("flow-lasso-partial", "flow-lasso-full"), e.classList.add("flow-lasso-active", `flow-lasso-${u}`), n.setAttribute("points", `${d},${f}`);
  }
  function a(d, f) {
    if (!o)
      return;
    const u = i[i.length - 1], h = d - u.x, p = f - u.y;
    h * h + p * p < Ns * Ns || (i.push({ x: d, y: f }), n.setAttribute("points", i.map((g) => `${g.x},${g.y}`).join(" ")));
  }
  function r(d) {
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
  return { start: s, update: a, end: r, isActive: l, destroy: c };
}
function Hi(t, e, n) {
  if (n.length < 3) return !1;
  let o = !1;
  for (let i = 0, s = n.length - 1; i < n.length; s = i++) {
    const a = n[i].x, r = n[i].y, l = n[s].x, c = n[s].y;
    r > e != c > e && t < (l - a) * (e - r) / (c - r) + a && (o = !o);
  }
  return o;
}
function sh(t, e, n, o, i, s, a, r) {
  const l = n - t, c = o - e, d = a - i, f = r - s, u = l * f - c * d;
  if (Math.abs(u) < 1e-10) return !1;
  const h = i - t, p = s - e, g = (h * f - p * d) / u, m = (h * c - p * l) / u;
  return g >= 0 && g <= 1 && m >= 0 && m <= 1;
}
function rh(t, e) {
  const n = e.x, o = e.y, i = e.x + e.width, s = e.y + e.height, a = n + e.width / 2, r = o + e.height / 2;
  if (Hi(a, r, t)) return !0;
  for (const c of t)
    if (c.x >= n && c.x <= i && c.y >= o && c.y <= s) return !0;
  const l = [
    [n, o, i, o],
    // top
    [i, o, i, s],
    // right
    [i, s, n, s],
    // bottom
    [n, s, n, o]
    // left
  ];
  for (let c = 0, d = t.length - 1; c < t.length; d = c++)
    for (const [f, u, h, p] of l)
      if (sh(t[d].x, t[d].y, t[c].x, t[c].y, f, u, h, p))
        return !0;
  return !1;
}
function Ea(t) {
  const e = t.dimensions?.width ?? we, n = t.dimensions?.height ?? be;
  return t.rotation ? No(t.position.x, t.position.y, e, n, t.rotation) : { x: t.position.x, y: t.position.y, width: e, height: n };
}
function ah(t, e) {
  return e.length < 3 ? [] : t.filter((n) => {
    if (n.hidden || n.selectable === !1) return !1;
    const o = Ea(n);
    return rh(e, o);
  });
}
function lh(t, e) {
  return e.length < 3 ? [] : t.filter((n) => {
    if (n.hidden || n.selectable === !1) return !1;
    const o = Ea(n);
    return [
      { x: o.x, y: o.y },
      { x: o.x + o.width, y: o.y },
      { x: o.x + o.width, y: o.y + o.height },
      { x: o.x, y: o.y + o.height }
    ].every((s) => Hi(s.x, s.y, e));
  });
}
function ch(t, e) {
  return e.filter((n) => n.source === t || n.target === t);
}
function hi(t, e, n) {
  const o = new Set(
    n.filter((i) => i.source === t).map((i) => i.target)
  );
  return e.filter((i) => o.has(i.id));
}
function dh(t, e, n) {
  const o = new Set(
    n.filter((i) => i.target === t).map((i) => i.source)
  );
  return e.filter((i) => o.has(i.id));
}
function uh(t, e, n) {
  if (t === e) return !0;
  const o = /* @__PURE__ */ new Map();
  for (const a of n) {
    let r = o.get(a.source);
    r || (r = [], o.set(a.source, r)), r.push(a.target);
  }
  const i = [e], s = /* @__PURE__ */ new Set();
  for (; i.length > 0; ) {
    const a = i.pop();
    if (a === t) return !0;
    if (s.has(a)) continue;
    s.add(a);
    const r = o.get(a);
    if (r)
      for (const l of r)
        s.has(l) || i.push(l);
  }
  return !1;
}
function fh(t, e, n, o = !1) {
  return n.some((i) => o ? i.source === t && i.target === e : i.source === t && i.target === e || i.source === e && i.target === t);
}
function hh(t, e, n) {
  const o = new Map(e.map((l) => [l.id, l])), i = new Set(
    n.map((l) => `${l.source}|${l.target}|${l.sourceHandle ?? ""}|${l.targetHandle ?? ""}`)
  ), s = [], a = /* @__PURE__ */ new Set();
  let r = 0;
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
          if (i.has(p) || a.has(p)) continue;
          const g = {
            id: `reconnect-${u.source}-${h.target}-${r++}`,
            source: u.source,
            target: h.target,
            sourceHandle: u.sourceHandle,
            targetHandle: h.targetHandle
          };
          u.type && (g.type = u.type), u.animated !== void 0 && (g.animated = u.animated), u.style && (g.style = u.style), u.class && (g.class = u.class), u.markerEnd && (g.markerEnd = u.markerEnd), u.markerStart && (g.markerStart = u.markerStart), u.label && (g.label = u.label), a.add(p), s.push(g);
        }
  }
  return s;
}
function vt(t, e, n) {
  if (!e) return !0;
  const o = n.get(t.source), i = n.get(t.target);
  if (!o || !i) return !0;
  const { byType: s } = e;
  if (s) {
    const a = o.type ?? "";
    if (Object.prototype.hasOwnProperty.call(s, a) && !s[a].includes(i.type ?? ""))
      return !1;
  }
  return !(typeof e.validate == "function" && !e.validate(t, o, i));
}
function bt(t, e, n) {
  return !(t.source === t.target || e.some(
    (i) => i.source === t.source && i.target === t.target && i.sourceHandle === t.sourceHandle && i.targetHandle === t.targetHandle
  ) || n?.preventCycles && uh(t.source, t.target, e));
}
const Ue = "_flowHandleValidate";
function gh(t) {
  t.directive(
    "flow-handle-validate",
    (e, { expression: n }, { evaluate: o, effect: i, cleanup: s }) => {
      function a() {
        let r;
        try {
          r = o(n);
        } catch {
          const l = t.$data(e);
          l && typeof l[n] == "function" && (r = l[n]);
        }
        typeof r == "function" ? e[Ue] = r : (delete e[Ue], requestAnimationFrame(() => {
          const l = t.$data(e);
          l && typeof l[n] == "function" && (e[Ue] = l[n]);
        }));
      }
      i(() => {
        a();
      }), s(() => {
        delete e[Ue];
      });
    }
  );
}
const yt = "_flowHandleLimit";
function ph(t) {
  t.directive(
    "flow-handle-limit",
    (e, { expression: n }, { evaluate: o, effect: i, cleanup: s }) => {
      i(() => {
        const a = Number(o(n));
        a > 0 ? e[yt] = a : delete e[yt];
      }), s(() => {
        delete e[yt];
      });
    }
  );
}
const At = "_flowHandleConnectableStart", ct = "_flowHandleConnectableEnd";
function mh(t) {
  t.directive(
    "flow-handle-connectable",
    (e, { expression: n, modifiers: o }, { evaluate: i, effect: s, cleanup: a }) => {
      const r = o.includes("start"), l = o.includes("end"), c = r || !r && !l, d = l || !r && !l;
      s(() => {
        const f = n ? !!i(n) : !0;
        c && (e[At] = f), d && (e[ct] = f);
      }), a(() => {
        delete e[At], delete e[ct];
      });
    }
  );
}
function In(t, e, n = !0) {
  return e !== void 0 ? e : t.locked ? !1 : n;
}
function Ca(t) {
  return In(t, t.draggable);
}
function yh(t) {
  return In(t, t.deletable);
}
function Ye(t) {
  return In(t, t.connectable);
}
function yn(t, e = !0) {
  return In(t, t.selectable, e);
}
function As(t) {
  return In(t, t.resizable);
}
function Zt(t, e, n, o, i, s, a) {
  const r = n - t, l = o - e, c = i - n, d = s - o;
  if (r === 0 && c === 0 || l === 0 && d === 0)
    return `L${n},${o}`;
  const f = Math.sqrt(r * r + l * l), u = Math.sqrt(c * c + d * d), h = Math.min(a, f / 2, u / 2), p = n - r / f * h, g = o - l / f * h, m = n + c / u * h, y = o + d / u * h;
  return `L${p},${g} Q${n},${o} ${m},${y}`;
}
function $n({
  sourceX: t,
  sourceY: e,
  targetX: n,
  targetY: o
}) {
  const i = Math.abs(n - t) / 2, s = Math.abs(o - e) / 2;
  return {
    x: (t + n) / 2,
    y: (e + o) / 2,
    offsetX: i,
    offsetY: s
  };
}
function qn(t, e) {
  return t >= 0 ? 0.5 * t : e * 25 * Math.sqrt(-t);
}
function wh({
  sourceX: t,
  sourceY: e,
  sourcePosition: n = "bottom",
  targetX: o,
  targetY: i,
  targetPosition: s = "top",
  curvature: a = 0.25
}) {
  const r = n === "left" || n === "right", l = s === "left" || s === "right", c = r ? t + (n === "right" ? 1 : -1) * qn(
    n === "right" ? o - t : t - o,
    a
  ) : t, d = r ? e : e + (n === "bottom" ? 1 : -1) * qn(
    n === "bottom" ? i - e : e - i,
    a
  ), f = l ? o + (s === "right" ? 1 : -1) * qn(
    s === "right" ? t - o : o - t,
    a
  ) : o, u = l ? i : i + (s === "bottom" ? 1 : -1) * qn(
    s === "bottom" ? e - i : i - e,
    a
  );
  return [c, d, f, u];
}
function mo(t) {
  const { sourceX: e, sourceY: n, targetX: o, targetY: i } = t, [s, a, r, l] = wh(t), c = `M${e},${n} C${s},${a} ${r},${l} ${o},${i}`, { x: d, y: f, offsetX: u, offsetY: h } = $n({ sourceX: e, sourceY: n, targetX: o, targetY: i });
  return {
    path: c,
    labelPosition: { x: d, y: f },
    labelOffsetX: u,
    labelOffsetY: h
  };
}
function Hw({
  sourceX: t,
  sourceY: e,
  targetX: n,
  targetY: o
}) {
  const i = (t + n) / 2, s = `M${t},${e} C${i},${e} ${i},${o} ${n},${o}`, { x: a, y: r, offsetX: l, offsetY: c } = $n({ sourceX: t, sourceY: e, targetX: n, targetY: o });
  return {
    path: s,
    labelPosition: { x: a, y: r },
    labelOffsetX: l,
    labelOffsetY: c
  };
}
function Ts(t) {
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
function _h(t, e, n, o, i, s, a) {
  const r = Ts(n), l = Ts(s), c = t + r.x * a, d = e + r.y * a, f = o + l.x * a, u = i + l.y * a, h = n === "left" || n === "right";
  if (h === (s === "left" || s === "right")) {
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
function Ln({
  sourceX: t,
  sourceY: e,
  sourcePosition: n = "bottom",
  targetX: o,
  targetY: i,
  targetPosition: s = "top",
  borderRadius: a = 5,
  offset: r = 10
}) {
  const l = _h(
    t,
    e,
    n,
    o,
    i,
    s,
    r
  );
  let c = `M${t},${e}`;
  for (let p = 0; p < l.length; p++) {
    const [g, m] = l[p];
    if (a > 0 && p > 0 && p < l.length - 1) {
      const [y, x] = p === 1 ? [t, e] : l[p - 1], [k, _] = l[p + 1];
      c += ` ${Zt(y, x, g, m, k, _, a)}`;
    } else
      c += ` L${g},${m}`;
  }
  c += ` L${o},${i}`;
  const { x: d, y: f, offsetX: u, offsetY: h } = $n({ sourceX: t, sourceY: e, targetX: o, targetY: i });
  return {
    path: c,
    labelPosition: { x: d, y: f },
    labelOffsetX: u,
    labelOffsetY: h
  };
}
function vh(t) {
  return Ln({ ...t, borderRadius: 0 });
}
function Sa({
  sourceX: t,
  sourceY: e,
  targetX: n,
  targetY: o
}) {
  const i = `M${t},${e} L${n},${o}`, { x: s, y: a, offsetX: r, offsetY: l } = $n({ sourceX: t, sourceY: e, targetX: n, targetY: o });
  return {
    path: i,
    labelPosition: { x: s, y: a },
    labelOffsetX: r,
    labelOffsetY: l
  };
}
const ft = 40;
function bh(t, e, n, o) {
  let i = 0, s = 0;
  const a = t - n.left, r = n.right - t, l = e - n.top, c = n.bottom - e;
  return a < ft && a >= 0 ? i = -o * (1 - a / ft) : r < ft && r >= 0 && (i = o * (1 - r / ft)), l < ft && l >= 0 ? s = -o * (1 - l / ft) : c < ft && c >= 0 && (s = o * (1 - c / ft)), { dx: i, dy: s };
}
function ka(t) {
  const { container: e, speed: n, onPan: o } = t;
  let i = null, s = 0, a = 0, r = !1;
  function l() {
    if (!r)
      return;
    const c = e.getBoundingClientRect(), { dx: d, dy: f } = bh(s, a, c, n);
    if ((d !== 0 || f !== 0) && o(d, f) === !0) {
      r = !1, i = null;
      return;
    }
    i = requestAnimationFrame(l);
  }
  return {
    start() {
      r || t.isLocked?.() || (r = !0, i = requestAnimationFrame(l));
    },
    stop() {
      r = !1, i !== null && (cancelAnimationFrame(i), i = null);
    },
    updatePointer(c, d) {
      s = c, a = d;
    },
    destroy() {
      this.stop();
    }
  };
}
function Kt(t) {
  const e = t.connectionLineType ?? "straight", o = {
    stroke: (t.invalid ? (t.containerEl ? getComputedStyle(t.containerEl).getPropertyValue("--flow-connection-line-invalid").trim() : "") || ua : null) ?? t.connectionLineStyle?.stroke ?? ((t.containerEl ? getComputedStyle(t.containerEl).getPropertyValue("--flow-edge-stroke-selected").trim() : "") || Sn),
    strokeWidth: t.connectionLineStyle?.strokeWidth ?? Number(Tf),
    strokeDasharray: t.connectionLineStyle?.strokeDasharray ?? If
  }, i = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  i.setAttribute("class", "flow-connect-line"), i.style.cssText = "position:absolute;top:0;left:0;width:1px;height:1px;overflow:visible;pointer-events:none;z-index:1000;";
  let s = null;
  function a(l) {
    const c = {
      ...l,
      connectionLineType: e,
      connectionLineStyle: o
    };
    if (t.connectionLine) {
      s && s.remove(), s = t.connectionLine(c), i.appendChild(s);
      return;
    }
    s || (s = document.createElementNS("http://www.w3.org/2000/svg", "path"), s.setAttribute("fill", "none"), i.appendChild(s)), s.setAttribute("stroke", o.stroke), s.setAttribute("stroke-width", String(o.strokeWidth)), s.setAttribute("stroke-dasharray", o.strokeDasharray);
    const { fromX: d, fromY: f, toX: u, toY: h } = l;
    let p;
    switch (e) {
      case "bezier": {
        p = mo({ sourceX: d, sourceY: f, targetX: u, targetY: h }).path;
        break;
      }
      case "smoothstep": {
        p = Ln({ sourceX: d, sourceY: f, targetX: u, targetY: h }).path;
        break;
      }
      case "step": {
        p = vh({ sourceX: d, sourceY: f, targetX: u, targetY: h }).path;
        break;
      }
      default: {
        p = Sa({ sourceX: d, sourceY: f, targetX: u, targetY: h }).path;
        break;
      }
    }
    s.setAttribute("d", p);
  }
  function r() {
    i.remove();
  }
  return { svg: i, update: a, destroy: r };
}
function Mn(t) {
  if (t.connectionSnapRadius <= 0)
    return { element: null, position: t.cursorFlowPos };
  if (t.index) {
    const a = t.connectionMode === "loose" ? t.index.all : t.index.byType(t.handleType);
    let r = null, l = t.cursorFlowPos, c = t.connectionSnapRadius;
    for (const d of a) {
      if (d.nodeId === t.excludeNodeId || t.targetNodeId && d.nodeId !== t.targetNodeId) continue;
      const f = t.getNode(d.nodeId);
      if (f && !Ye(f) || (t.handleType === "target" ? !d.connectableEnd : !d.connectableStart)) continue;
      const u = t.cursorFlowPos.x - d.flowX, h = t.cursorFlowPos.y - d.flowY, p = Math.sqrt(u * u + h * h);
      p < c && (c = p, r = d.el, l = { x: d.flowX, y: d.flowY });
    }
    return { element: r, position: l };
  }
  const e = t.connectionMode === "loose" ? "[data-flow-handle-type]" : `[data-flow-handle-type="${t.handleType}"]`, n = t.containerEl.querySelectorAll(e);
  let o = null, i = t.cursorFlowPos, s = t.connectionSnapRadius;
  return n.forEach((a) => {
    const r = a, l = r.closest("[x-flow-node]");
    if (!l || l.dataset.flowNodeId === t.excludeNodeId || t.targetNodeId && l.dataset.flowNodeId !== t.targetNodeId) return;
    const c = l.dataset.flowNodeId;
    if (c) {
      const p = t.getNode(c);
      if (p && !Ye(p)) return;
    }
    const d = t.handleType === "target" ? ct : At;
    if (r[d] === !1) return;
    const f = r.getBoundingClientRect();
    if (f.width === 0 && f.height === 0) return;
    const u = t.toFlowPosition(
      f.left + f.width / 2,
      f.top + f.height / 2
    ), h = Math.sqrt(
      (t.cursorFlowPos.x - u.x) ** 2 + (t.cursorFlowPos.y - u.y) ** 2
    );
    h < s && (s = h, o = r, i = u);
  }), { element: o, position: i };
}
function To(t, e, n, o) {
  if (e._config?.autoPanOnConnect === !1) return null;
  const i = ka({
    container: t,
    speed: e._config?.autoPanSpeed ?? 15,
    onPan(s, a) {
      const r = () => e._viewportLive ?? e.viewport, l = { x: r().x, y: r().y };
      e._panZoom?.setViewport({
        x: r().x - s,
        y: r().y - a,
        zoom: r().zoom
      });
      const c = l.x - r().x, d = l.y - r().y;
      return c === 0 && d === 0;
    }
  });
  return i.updatePointer(n, o), i.start(), i;
}
function xh(t, e, n, o) {
  const i = o ? t.edges.filter((c) => c.id !== o) : t.edges, s = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
  for (const c of i) {
    const d = `${c.source}|${c.sourceHandle ?? "source"}`, f = `${c.target}|${c.targetHandle ?? "target"}`;
    a.set(d, (a.get(d) ?? 0) + 1), r.set(f, (r.get(f) ?? 0) + 1), c.source === e && c.sourceHandle === n && s.add(`${c.target}|${c.targetHandle}`);
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
  return { existingTargets: s, cycleForbidden: l, sourceCounts: a, targetCounts: r };
}
function La(t, e) {
  const n = [], o = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), s = t.querySelectorAll("[data-flow-handle-type]");
  for (const l of s) {
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
      connectableEnd: l[ct] !== !1,
      hasValidator: l[Ue] != null,
      limit: l[yt] ?? null
    };
    n.push(p);
    const g = `${d}|${p.handleId}|${u}`, m = o.get(g);
    (!m || m.isMirror && !p.isMirror) && o.set(g, p);
  }
  const a = n.filter((l) => l.type === "source"), r = n.filter((l) => l.type === "target");
  return {
    all: n,
    byType: (l) => l === "source" ? a : r,
    get: (l, c, d) => o.get(`${l}|${c}|${d}`)
  };
}
let wn = 0;
const Yn = /* @__PURE__ */ new WeakMap();
function st(t, e) {
  const n = t.querySelector(
    `[data-flow-node-id="${CSS.escape(e.source)}"]`
  );
  if (n) {
    const i = e.sourceHandle ?? "source", s = n.querySelector(
      `[data-flow-handle-id="${CSS.escape(i)}"][data-flow-handle-type="source"]`
    ) ?? n.querySelector(`[data-flow-handle-id="${CSS.escape(i)}"]`);
    if (s?.[Ue] && !s[Ue](e))
      return !1;
  }
  const o = t.querySelector(
    `[data-flow-node-id="${CSS.escape(e.target)}"]`
  );
  if (o) {
    const i = e.targetHandle ?? "target", s = o.querySelector(
      `[data-flow-handle-id="${CSS.escape(i)}"][data-flow-handle-type="target"]`
    ) ?? o.querySelector(`[data-flow-handle-id="${CSS.escape(i)}"]`);
    if (s?.[Ue] && !s[Ue](e))
      return !1;
  }
  return !0;
}
function rt(t, e, n) {
  const o = t.querySelector(
    `[data-flow-node-id="${CSS.escape(e.source)}"]`
  );
  if (o) {
    const s = e.sourceHandle ?? "source", a = o.querySelector(
      `[data-flow-handle-id="${CSS.escape(s)}"][data-flow-handle-type="source"]`
    ) ?? o.querySelector(`[data-flow-handle-id="${CSS.escape(s)}"]`);
    if (a?.[yt] && n.filter(
      (l) => l.source === e.source && (l.sourceHandle ?? "source") === (e.sourceHandle ?? "source")
    ).length >= a[yt])
      return !1;
  }
  const i = t.querySelector(
    `[data-flow-node-id="${CSS.escape(e.target)}"]`
  );
  if (i) {
    const s = e.targetHandle ?? "target", a = i.querySelector(
      `[data-flow-handle-id="${CSS.escape(s)}"][data-flow-handle-type="target"]`
    ) ?? i.querySelector(`[data-flow-handle-id="${CSS.escape(s)}"]`);
    if (a?.[yt] && n.filter(
      (l) => l.target === e.target && (l.targetHandle ?? "target") === (e.targetHandle ?? "target")
    ).length >= a[yt])
      return !1;
  }
  return !0;
}
function Pn(t, e, n, o, i, s) {
  if (t.classList.add("flow-connecting"), !s) {
    Eh(t, e, n, o, i);
    return;
  }
  const a = xh(o, e, n, i), r = s.get(e, n, "source"), l = r?.limit != null && (a.sourceCounts.get(`${e}|${n}`) ?? 0) >= r.limit, c = [];
  for (const d of s.byType("target")) {
    if (!d.connectableEnd) {
      c.push({ el: d.el, valid: !1, limitHit: !1 });
      continue;
    }
    const f = {
      source: e,
      sourceHandle: n,
      target: d.nodeId,
      targetHandle: d.handleId
    }, h = o.getNode(d.nodeId)?.connectable !== !1 && d.nodeId !== e && !a.existingTargets.has(`${d.nodeId}|${d.handleId}`) && !a.cycleForbidden.has(d.nodeId), p = s.get(d.nodeId, d.handleId, "target") ?? d;
    let g = h && !l;
    g && p.limit != null && (g = (a.targetCounts.get(`${d.nodeId}|${d.handleId}`) ?? 0) < p.limit);
    let m = g;
    m && r?.hasValidator && (m = !!r.el[Ue](f)), m && p.hasValidator && (m = !!p.el[Ue](f));
    const y = m && (!o._config?.isValidConnection || o._config.isValidConnection(f));
    c.push({ el: d.el, valid: y, limitHit: h && !g });
  }
  for (const d of c)
    d.el.classList.toggle("flow-handle-valid", d.valid), d.el.classList.toggle("flow-handle-invalid", !d.valid), d.el.classList.toggle("flow-handle-limit-reached", d.limitHit);
}
function Eh(t, e, n, o, i) {
  const s = i ? o.edges.filter((r) => r.id !== i) : o.edges, a = t.querySelectorAll('[data-flow-handle-type="target"]');
  for (const r of a) {
    const c = r.closest("[x-flow-node]")?.dataset.flowNodeId;
    if (!c) continue;
    const d = r.dataset.flowHandleId ?? "target";
    if (r[ct] === !1) {
      r.classList.add("flow-handle-invalid"), r.classList.remove("flow-handle-valid", "flow-handle-limit-reached");
      continue;
    }
    const f = {
      source: e,
      sourceHandle: n,
      target: c,
      targetHandle: d
    }, h = o.getNode(c)?.connectable !== !1 && bt(f, s, { preventCycles: o._config?.preventCycles }), p = h && rt(t, f, s);
    p && st(t, f) && (!o._config?.isValidConnection || o._config.isValidConnection(f)) ? (r.classList.add("flow-handle-valid"), r.classList.remove("flow-handle-invalid", "flow-handle-limit-reached")) : (r.classList.add("flow-handle-invalid"), r.classList.remove("flow-handle-valid"), h && !p ? r.classList.add("flow-handle-limit-reached") : r.classList.remove("flow-handle-limit-reached"));
  }
}
function Me(t) {
  t.classList.remove("flow-connecting");
  const e = t.querySelectorAll('[data-flow-handle-type="target"]');
  for (const n of e)
    n.classList.remove("flow-handle-valid", "flow-handle-invalid", "flow-handle-limit-reached");
}
function Pt(t, e) {
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
async function Io(t, e, n, o, i, s) {
  if (!t) return { allowed: !0 };
  n?.classList.add(s), o?.classList.add(s), i.dispatchEvent(new CustomEvent("flow-connect-validating", {
    detail: { connection: e },
    bubbles: !0
  }));
  let a;
  try {
    a = await t(e);
  } catch (c) {
    B("connection", "connectValidator threw", c), a = !1;
  } finally {
    n?.classList.remove(s), o?.classList.remove(s);
  }
  const r = typeof a == "boolean" ? a : !!a?.allowed, l = typeof a == "object" && a && "reason" in a ? a.reason : void 0;
  return i.dispatchEvent(new CustomEvent("flow-connect-validated", {
    detail: { connection: e, allowed: r, reason: l },
    bubbles: !0
  })), { allowed: r, reason: l };
}
async function Ma(t) {
  const { edge: e, newConnection: n, canvas: o, containerEl: i } = t, s = t.endpoint ?? "target", a = o.edges.filter(
    (c) => c.id !== e.id
  ), r = (c) => (Te(i, {
    source: n.source,
    target: n.target,
    sourceHandle: n.sourceHandle,
    targetHandle: n.targetHandle,
    reason: c
  }), { applied: !1, reason: c });
  if (!bt(n, a, { preventCycles: o._config?.preventCycles }) || !vt(n, o._config?.connectionRules, o._nodeMap) || !rt(i, n, a) || !st(i, n) || o._config?.isValidConnection && !o._config.isValidConnection(n))
    return r();
  const l = o._config?.connectValidator;
  if (l) {
    const c = o._config?.validatingHandleClass ?? "flow-handle-validating", { sourceEl: d, targetEl: f } = $o(i, n);
    o._connectValidating = !0;
    let u;
    try {
      u = await Io(
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
      return r(u.reason);
  }
  return o._captureHistory?.(), s === "source" ? (e.source = n.source, e.sourceHandle = n.sourceHandle) : (e.target = n.target, e.targetHandle = n.targetHandle), { applied: !0 };
}
async function Pa(t) {
  const { connection: e, canvas: n, containerEl: o } = t, i = n.edges, s = (d) => (Te(o, {
    source: e.source,
    target: e.target,
    sourceHandle: e.sourceHandle,
    targetHandle: e.targetHandle,
    reason: d
  }), { applied: !1, reason: d }), a = n.getNode?.(e.target);
  if (a && !Ye(a) || !bt(e, i, { preventCycles: n._config?.preventCycles }) || !vt(e, n._config?.connectionRules, n._nodeMap) || !rt(o, e, i) || !st(o, e) || n._config?.isValidConnection && !n._config.isValidConnection(e))
    return s();
  const r = n._config?.connectValidator;
  if (r) {
    const d = n._config?.validatingHandleClass ?? "flow-handle-validating", { sourceEl: f, targetEl: u } = $o(o, e);
    n._connectValidating = !0;
    let h;
    try {
      h = await Io(
        r,
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
      return s(h.reason);
  }
  const c = { id: `e-${e.source}-${e.target}-${Date.now()}-${wn++}`, ...e };
  return n.addEdges(c), n._emit?.("connect", { connection: e }), { applied: !0, edge: c };
}
function $o(t, e) {
  const n = t.querySelector(
    `[data-flow-node-id="${CSS.escape(e.source)}"]`
  ), o = e.sourceHandle ?? "source", i = n?.querySelector(
    `[data-flow-handle-id="${CSS.escape(o)}"][data-flow-handle-type="source"]`
  ) ?? n?.querySelector(`[data-flow-handle-id="${CSS.escape(o)}"]`) ?? null, s = t.querySelector(
    `[data-flow-node-id="${CSS.escape(e.target)}"]`
  ), a = e.targetHandle ?? "target", r = s?.querySelector(
    `[data-flow-handle-id="${CSS.escape(a)}"][data-flow-handle-type="target"]`
  ) ?? s?.querySelector(`[data-flow-handle-id="${CSS.escape(a)}"]`) ?? null;
  return { sourceEl: i, targetEl: r };
}
const wt = /* @__PURE__ */ new WeakMap();
function Na(t, e, n) {
  n.preventDefault(), n.stopPropagation();
  const o = t.dataset.flowHandleId ?? "source", i = t.closest("[x-flow-node]");
  if (!e || !i || e._animationLocked) return;
  const s = i.dataset.flowNodeId;
  if (!s) return;
  const a = e.getNode(s);
  if (a && !Ye(a) || t[At] === !1) return;
  const r = n.clientX, l = n.clientY;
  let c = !1;
  if (e.pendingConnection && e._config?.connectOnClick !== !1) {
    e._emit("connect-end", {
      connection: null,
      source: e.pendingConnection.source,
      sourceHandle: e.pendingConnection.sourceHandle,
      position: { x: 0, y: 0 }
    }), e.pendingConnection = null, e._container?.classList.remove("flow-connecting");
    const D = t.closest(".flow-container");
    D && Me(D);
  }
  let d = null, f = null, u = null, h = null, p = null;
  const g = e._config?.connectionSnapRadius ?? 20, m = t.closest(".flow-container");
  let y = null, x = 0, k = 0, _ = !1, S = /* @__PURE__ */ new Map();
  const b = () => {
    if (c = !0, B("connection", `Connection drag started from node "${s}" handle "${o}"`), e._emit("connect-start", { source: s, sourceHandle: o }), !m) return;
    f = Kt({
      connectionLineType: e._config?.connectionLineType,
      connectionLineStyle: e._config?.connectionLineStyle,
      connectionLine: e._config?.connectionLine,
      containerEl: m
    }), d = f.svg;
    const D = t.getBoundingClientRect(), A = m.getBoundingClientRect(), v = e._viewportLive ?? e.viewport, w = v?.zoom || 1, T = v?.x || 0, P = v?.y || 0;
    x = (D.left + D.width / 2 - A.left - T) / w, k = (D.top + D.height / 2 - A.top - P) / w, f.update({ fromX: x, fromY: k, toX: x, toY: k, source: s, sourceHandle: o });
    const $ = m.querySelector(".flow-viewport");
    if ($ && $.appendChild(d), e.pendingConnection = {
      source: s,
      sourceHandle: o,
      position: { x, y: k }
    }, h = To(m, e, r, l), y = La(
      m,
      (H, z) => e.screenToFlowPosition(H, z)
    ), Pn(m, s, o, e, void 0, y), e._config?.onEdgeDrop) {
      const H = e._config.edgeDropPreview, I = H ? H({ source: s, sourceHandle: o }) : "New Node";
      if (I !== null) {
        p = document.createElement("div"), p.className = "flow-ghost-node";
        const C = document.createElement("div");
        if (C.className = "flow-ghost-handle", p.appendChild(C), typeof I == "string") {
          const O = document.createElement("span");
          O.textContent = I, p.appendChild(O);
        } else
          p.appendChild(I);
        p.style.left = `${x}px`, p.style.top = `${k}px`;
        const N = m.querySelector(".flow-viewport");
        N && N.appendChild(p);
      }
    }
  }, E = () => {
    const D = [...e.selectedNodes], A = [], v = m.getBoundingClientRect(), w = e._viewportLive ?? e.viewport, T = w?.zoom || 1, P = w?.x || 0, $ = w?.y || 0;
    for (const H of D) {
      if (H === s) continue;
      const I = m?.querySelector(`[data-flow-node-id="${CSS.escape(H)}"]`)?.querySelector('[data-flow-handle-type="source"]');
      if (!I) continue;
      const C = I.getBoundingClientRect();
      A.push({
        nodeId: H,
        handleId: I.dataset.flowHandleId ?? "source",
        pos: {
          x: (C.left + C.width / 2 - v.left - P) / T,
          y: (C.top + C.height / 2 - v.top - $) / T
        }
      });
    }
    return A;
  }, M = (D) => {
    _ = !0, f && (S.set(s, {
      line: f,
      sourceNodeId: s,
      sourceHandleId: o,
      sourcePos: { x, y: k },
      valid: !0
    }), f = null);
    const A = E(), v = m.querySelector(".flow-viewport");
    for (const w of A) {
      const T = Kt({
        connectionLineType: e._config?.connectionLineType,
        connectionLineStyle: e._config?.connectionLineStyle,
        connectionLine: e._config?.connectionLine,
        containerEl: m
      });
      T.update({
        fromX: w.pos.x,
        fromY: w.pos.y,
        toX: D.x,
        toY: D.y,
        source: w.nodeId,
        sourceHandle: w.handleId
      }), v && v.appendChild(T.svg), S.set(w.nodeId, {
        line: T,
        sourceNodeId: w.nodeId,
        sourceHandleId: w.handleId,
        sourcePos: w.pos,
        valid: !0
      });
    }
  }, R = (D) => {
    if (!c) {
      const w = D.clientX - r, T = D.clientY - l;
      if (Math.abs(w) >= uo || Math.abs(T) >= uo) {
        if (b(), e._config?.multiConnect && e.selectedNodes.size > 1 && e.selectedNodes.has(s)) {
          const P = e.screenToFlowPosition(D.clientX, D.clientY);
          M(P);
        }
      } else
        return;
    }
    const A = e.screenToFlowPosition(D.clientX, D.clientY);
    if (_) {
      const w = Mn({
        containerEl: m,
        handleType: "target",
        excludeNodeId: s,
        cursorFlowPos: A,
        connectionSnapRadius: g,
        getNode: (z) => e.getNode(z),
        toFlowPosition: (z, I) => e.screenToFlowPosition(z, I),
        connectionMode: e._config?.connectionMode,
        index: y ?? void 0
      });
      w.element !== u && (u?.classList.remove("flow-handle-active"), w.element?.classList.add("flow-handle-active"), u = w.element);
      const P = w.element?.closest("[x-flow-node]")?.dataset.flowNodeId ?? null, $ = w.element?.dataset.flowHandleId ?? "target", H = e._config?.connectionLineStyle?.stroke ?? (getComputedStyle(m).getPropertyValue("--flow-edge-stroke-selected").trim() || Sn);
      for (const z of S.values())
        if (z.line.update({
          fromX: z.sourcePos.x,
          fromY: z.sourcePos.y,
          toX: w.position.x,
          toY: w.position.y,
          source: z.sourceNodeId,
          sourceHandle: z.sourceHandleId
        }), w.element && P) {
          const I = {
            source: z.sourceNodeId,
            sourceHandle: z.sourceHandleId,
            target: P,
            targetHandle: $
          }, U = e.getNode(P)?.connectable !== !1 && z.sourceNodeId !== P && bt(I, e.edges, { preventCycles: e._config?.preventCycles }) && vt(I, e._config?.connectionRules, e._nodeMap) && rt(m, I, e.edges) && st(m, I) && (!e._config?.isValidConnection || e._config.isValidConnection(I));
          z.valid = U;
          const W = z.line.svg.querySelector("path");
          if (W)
            if (U)
              W.setAttribute("stroke", H);
            else {
              const re = getComputedStyle(m).getPropertyValue("--flow-connection-line-invalid").trim() || ua;
              W.setAttribute("stroke", re);
            }
        } else {
          z.valid = !0;
          const I = z.line.svg.querySelector("path");
          I && I.setAttribute("stroke", H);
        }
      e.pendingConnection = { ...e.pendingConnection, position: w.position }, h?.updatePointer(D.clientX, D.clientY);
      return;
    }
    const v = Mn({
      containerEl: m,
      handleType: "target",
      excludeNodeId: s,
      cursorFlowPos: A,
      connectionSnapRadius: g,
      getNode: (w) => e.getNode(w),
      toFlowPosition: (w, T) => e.screenToFlowPosition(w, T),
      index: y ?? void 0
    });
    v.element !== u && (u?.classList.remove("flow-handle-active"), v.element?.classList.add("flow-handle-active"), u = v.element), p ? v.element ? (p.style.display = "none", f?.update({ fromX: x, fromY: k, toX: v.position.x, toY: v.position.y, source: s, sourceHandle: o })) : (p.style.display = "", p.style.left = `${A.x}px`, p.style.top = `${A.y}px`, f?.update({ fromX: x, fromY: k, toX: A.x, toY: A.y, source: s, sourceHandle: o })) : f?.update({ fromX: x, fromY: k, toX: v.position.x, toY: v.position.y, source: s, sourceHandle: o }), e.pendingConnection = { ...e.pendingConnection, position: v.position }, h?.updatePointer(D.clientX, D.clientY);
  }, L = async (D) => {
    if (h?.stop(), h = null, document.removeEventListener("pointermove", R), document.removeEventListener("pointerup", L), document.removeEventListener("pointercancel", L), wt.delete(t), y = null, e._connectValidating) return;
    if (_) {
      const T = e.screenToFlowPosition(D.clientX, D.clientY);
      let P = u;
      P || (P = document.elementFromPoint(D.clientX, D.clientY)?.closest('[data-flow-handle-type="target"]'));
      const H = P?.closest("[x-flow-node]")?.dataset.flowNodeId ?? null, z = P?.dataset.flowHandleId ?? "target", I = [], C = [], N = [], O = [];
      if (P && H) {
        const Y = e.getNode(H);
        for (const K of S.values()) {
          const U = {
            source: K.sourceNodeId,
            sourceHandle: K.sourceHandleId,
            target: H,
            targetHandle: z
          };
          if (Y?.connectable !== !1 && K.sourceNodeId !== H && bt(U, e.edges, { preventCycles: e._config?.preventCycles }) && vt(U, e._config?.connectionRules, e._nodeMap) && rt(m, U, e.edges) && st(m, U) && (!e._config?.isValidConnection || e._config.isValidConnection(U))) {
            const Z = `e-${K.sourceNodeId}-${H}-${Date.now()}-${wn++}`;
            I.push({ id: Z, ...U }), C.push(U), O.push(K);
          } else
            N.push(K);
        }
      } else
        N.push(...S.values());
      for (const Y of O)
        Y.line.destroy();
      if (I.length > 0) {
        e.addEdges(I);
        for (const Y of C)
          e._emit("connect", { connection: Y });
        e._emit("multi-connect", { connections: C });
      }
      N.length > 0 && setTimeout(() => {
        for (const Y of N)
          Y.line.destroy();
      }, 100), u?.classList.remove("flow-handle-active"), e._emit("connect-end", {
        connection: C.length > 0 ? C[0] : null,
        source: s,
        sourceHandle: o,
        position: T
      }), S.clear(), _ = !1, Me(m), e.pendingConnection = null, e._container?.classList.remove("flow-connecting");
      return;
    }
    if (!c) {
      e._config?.connectOnClick !== !1 && (B("connection", `Click-to-connect started from node "${s}" handle "${o}"`), e._emit("connect-start", { source: s, sourceHandle: o }), e.pendingConnection = {
        source: s,
        sourceHandle: o,
        position: { x: 0, y: 0 }
      }, Pn(m, s, o, e, void 0, y ?? void 0));
      return;
    }
    const A = f?.svg ?? null;
    p?.remove(), p = null, u?.classList.remove("flow-handle-active"), Me(m);
    const v = e.screenToFlowPosition(D.clientX, D.clientY), w = { source: s, sourceHandle: o, position: v };
    try {
      let T = u;
      if (T || (T = document.elementFromPoint(D.clientX, D.clientY)?.closest('[data-flow-handle-type="target"]')), T) {
        const $ = T.closest("[x-flow-node]")?.dataset.flowNodeId, H = T.dataset.flowHandleId ?? "target";
        if ($) {
          if (T[ct] === !1) {
            B("connection", "Connection rejected (handle not connectable end)"), e._emit("connect-end", { connection: null, ...w }), e.pendingConnection = null;
            return;
          }
          const z = e.getNode($);
          if (z && !Ye(z)) {
            B("connection", `Connection rejected (target "${$}" not connectable)`), e._emit("connect-end", { connection: null, ...w }), e.pendingConnection = null;
            return;
          }
          const I = {
            source: s,
            sourceHandle: o,
            target: $,
            targetHandle: H
          };
          if (bt(I, e.edges, { preventCycles: e._config?.preventCycles })) {
            if (!vt(I, e._config?.connectionRules, e._nodeMap)) {
              B("connection", "Connection rejected (connection rules)", I), Te(m, I), e._emit("connect-end", { connection: null, ...w }), e.pendingConnection = null;
              return;
            }
            if (!rt(m, I, e.edges)) {
              B("connection", "Connection rejected (handle limit)", I), Te(m, I), e._emit("connect-end", { connection: null, ...w }), e.pendingConnection = null;
              return;
            }
            if (!st(m, I)) {
              B("connection", "Connection rejected (per-handle validator)", I), Te(m, I), e._emit("connect-end", { connection: null, ...w }), e.pendingConnection = null;
              return;
            }
            if (e._config?.isValidConnection && !e._config.isValidConnection(I)) {
              B("connection", "Connection rejected (custom validator)", I), Te(m, I), e._emit("connect-end", { connection: null, ...w }), e.pendingConnection = null;
              return;
            }
            const C = e._config?.connectValidator;
            if (C) {
              const O = e._config?.validatingHandleClass ?? "flow-handle-validating", { sourceEl: Y, targetEl: K } = $o(m, I);
              e._connectValidating = !0, Pt(A, !0);
              let U;
              try {
                U = await Io(
                  C,
                  I,
                  Y,
                  K,
                  m,
                  O
                );
              } finally {
                e._connectValidating = !1, Pt(A, !1);
              }
              if (!U.allowed) {
                B("connection", "Connection rejected (async connectValidator)", { connection: I, reason: U.reason }), Te(m, { ...I, reason: U.reason }), e._emit("connect-end", { connection: null, ...w }), e.pendingConnection = null;
                return;
              }
            }
            const N = `e-${s}-${$}-${Date.now()}-${wn++}`;
            e.addEdges({ id: N, ...I }), B("connection", `Connection created: ${s} → ${$}`, I), e._emit("connect", { connection: I }), e._emit("connect-end", { connection: I, ...w });
          } else
            B("connection", "Connection rejected (invalid)", I), Te(m, I), e._emit("connect-end", { connection: null, ...w });
        } else
          e._emit("connect-end", { connection: null, ...w });
      } else if (e._config?.onEdgeDrop) {
        const P = {
          x: v.x - we / 2,
          y: v.y - be / 2
        }, $ = e._config.onEdgeDrop({
          source: s,
          sourceHandle: o,
          position: P
        });
        if ($) {
          const H = {
            source: s,
            sourceHandle: o,
            target: $.id,
            targetHandle: "target"
          };
          if (!rt(m, H, e.edges))
            B("connection", "Edge drop: connection rejected (handle limit)"), e._emit("connect-end", { connection: null, ...w });
          else if (!st(m, H))
            B("connection", "Edge drop: connection rejected (per-handle validator)"), e._emit("connect-end", { connection: null, ...w });
          else if (!e._config.isValidConnection || e._config.isValidConnection(H)) {
            e.addNodes($);
            const z = `e-${s}-${$.id}-${Date.now()}-${wn++}`;
            e.addEdges({ id: z, ...H }), B("connection", `Edge drop: created node "${$.id}" and edge`, H), e._emit("connect", { connection: H }), e._emit("connect-end", { connection: H, ...w });
          } else
            B("connection", "Edge drop: connection rejected by validator"), e._emit("connect-end", { connection: null, ...w });
        } else
          B("connection", "Edge drop: callback returned null"), e._emit("connect-end", { connection: null, ...w });
      } else
        B("connection", "Connection cancelled (no target)"), e._emit("connect-end", { connection: null, ...w });
    } finally {
      Pt(A, !1), f?.destroy(), f = null;
    }
    e.pendingConnection = null;
  };
  document.addEventListener("pointermove", R), document.addEventListener("pointerup", L), document.addEventListener("pointercancel", L), wt.set(t, () => {
    document.removeEventListener("pointermove", R), document.removeEventListener("pointerup", L), document.removeEventListener("pointercancel", L), h?.stop(), f?.destroy(), f = null, p?.remove(), p = null;
    for (const D of S.values())
      D.line.destroy();
    S.clear(), _ = !1, u?.classList.remove("flow-handle-active"), Me(m), y = null, e.pendingConnection = null, e._container?.classList.remove("flow-connecting");
  });
}
function Aa(t, e, n) {
  if (n.button !== 0) return;
  const o = t.dataset.flowHandleId ?? "target", s = t.closest("[x-flow-node]")?.getAttribute("data-flow-node-id") ?? null;
  if (!e || !s || e._animationLocked || e._config?.edgesReconnectable === !1 || e._pendingReconnection) return;
  const a = e.edges.filter(
    (I) => I.target === s && (I.targetHandle ?? "target") === o
  );
  if (a.length === 0) return;
  const r = a.find((I) => I.selected) ?? (a.length === 1 ? a[0] : null);
  if (!r) return;
  const l = r.reconnectable ?? !0;
  if (l === !1 || l === "source") return;
  n.preventDefault(), n.stopPropagation();
  const c = n.clientX, d = n.clientY;
  let f = !1, u = !1, h = null;
  const p = e._config?.connectionSnapRadius ?? 20, g = t.closest(".flow-container");
  if (!g) return;
  const m = g.querySelector(
    `[data-flow-node-id="${CSS.escape(r.source)}"]`
  ), y = r.sourceHandle ? `[data-flow-handle-id="${CSS.escape(r.sourceHandle)}"]` : '[data-flow-handle-type="source"]', x = m?.querySelector(y), k = g.getBoundingClientRect(), _ = e._viewportLive ?? e.viewport, S = _?.zoom || 1, b = _?.x || 0, E = _?.y || 0;
  let M, R;
  if (x) {
    const I = x.getBoundingClientRect();
    M = (I.left + I.width / 2 - k.left - b) / S, R = (I.top + I.height / 2 - k.top - E) / S;
  } else {
    const I = e.getNode(r.source);
    if (!I) return;
    const C = I.dimensions?.width ?? we, N = I.dimensions?.height ?? be;
    M = I.position.x + C / 2, R = I.position.y + N;
  }
  let L = null, D = null, A = null, v = c, w = d, T = null;
  const P = () => {
    f = !0;
    const I = g.querySelector(
      `[data-flow-edge-id="${r.id}"]`
    );
    I && I.classList.add("flow-edge-reconnecting"), e._emit("reconnect-start", { edge: r, handleType: "target" }), B("reconnect", `Reconnection drag started from target handle on edge "${r.id}"`), D = Kt({
      connectionLineType: e._config?.connectionLineType,
      connectionLineStyle: e._config?.connectionLineStyle,
      connectionLine: e._config?.connectionLine,
      containerEl: g
    }), L = D.svg;
    const C = e.screenToFlowPosition(c, d);
    D.update({
      fromX: M,
      fromY: R,
      toX: C.x,
      toY: C.y,
      source: r.source,
      sourceHandle: r.sourceHandle
    });
    const N = g.querySelector(".flow-viewport");
    N && N.appendChild(L), e.pendingConnection = {
      source: r.source,
      sourceHandle: r.sourceHandle,
      position: C
    }, e._pendingReconnection = {
      edge: r,
      draggedEnd: "target",
      anchorPosition: { x: M, y: R },
      position: C
    }, A = To(g, e, v, w), T = La(
      g,
      (O, Y) => e.screenToFlowPosition(O, Y)
    ), Pn(g, r.source, r.sourceHandle ?? "source", e, r.id, T);
  }, $ = (I) => {
    if (v = I.clientX, w = I.clientY, !f) {
      Math.sqrt(
        (I.clientX - c) ** 2 + (I.clientY - d) ** 2
      ) >= uo && P();
      return;
    }
    const C = e.screenToFlowPosition(I.clientX, I.clientY), N = Mn({
      containerEl: g,
      handleType: "target",
      excludeNodeId: r.source,
      cursorFlowPos: C,
      connectionSnapRadius: p,
      getNode: (O) => e.getNode(O),
      toFlowPosition: (O, Y) => e.screenToFlowPosition(O, Y),
      index: T ?? void 0
    });
    N.element !== h && (h?.classList.remove("flow-handle-active"), N.element?.classList.add("flow-handle-active"), h = N.element), D?.update({
      fromX: M,
      fromY: R,
      toX: N.position.x,
      toY: N.position.y,
      source: r.source,
      sourceHandle: r.sourceHandle
    }), e.pendingConnection && (e.pendingConnection = {
      ...e.pendingConnection,
      position: N.position
    }), e._pendingReconnection && (e._pendingReconnection = {
      ...e._pendingReconnection,
      position: N.position
    }), A?.updatePointer(I.clientX, I.clientY);
  }, H = () => {
    if (u) return;
    u = !0, document.removeEventListener("pointermove", $), document.removeEventListener("pointerup", z), document.removeEventListener("pointercancel", z), A?.stop(), A = null, D?.destroy(), D = null, L = null, T = null, h?.classList.remove("flow-handle-active"), wt.delete(t);
    const I = g.querySelector(
      `[data-flow-edge-id="${r.id}"]`
    );
    I && I.classList.remove("flow-edge-reconnecting"), Me(g), e.pendingConnection = null, e._pendingReconnection = null;
  }, z = async (I) => {
    if (!f) {
      H();
      return;
    }
    if (e._connectValidating) return;
    let C = h;
    C || (C = document.elementFromPoint(I.clientX, I.clientY)?.closest('[data-flow-handle-type="target"]'));
    let N = !1;
    if (C) {
      const Y = C.closest("[x-flow-node]")?.dataset.flowNodeId, K = C.dataset.flowHandleId;
      if (Y && e.getNode(Y)?.connectable !== !1) {
        const W = {
          source: r.source,
          sourceHandle: r.sourceHandle,
          target: Y,
          targetHandle: K
        }, re = { ...r }, q = D?.svg ?? null;
        Pt(q, !0);
        let V;
        try {
          V = await Ma({
            edge: r,
            newConnection: W,
            canvas: e,
            containerEl: g,
            endpoint: "target"
          });
        } finally {
          Pt(q, !1);
        }
        V.applied ? (N = !0, B("reconnect", `Edge "${r.id}" reconnected (target)`, W), e._emit("reconnect", { oldEdge: re, newConnection: W })) : B("reconnect", "Reconnection rejected", { connection: W, reason: V.reason });
      }
    }
    N || B("reconnect", `Edge "${r.id}" reconnection cancelled — snapping back`), e._emit("reconnect-end", { edge: r, successful: N }), H();
  };
  document.addEventListener("pointermove", $), document.addEventListener("pointerup", z), document.addEventListener("pointercancel", z), wt.set(t, H);
}
function Ch(t, e, n) {
  t.dataset.flowHandleType === "source" ? Na(t, e, n) : Aa(t, e, n);
}
function Is(t) {
  return t?._config?.delegatedHandleEvents === !1;
}
function Sh(t) {
  t.directive(
    "flow-handle",
    (e, { value: n, modifiers: o, expression: i }, { evaluate: s, effect: a, cleanup: r }) => {
      const l = n === "source" ? "source" : "target", c = o.includes("top"), d = o.includes("bottom"), f = o.includes("left"), u = o.includes("right"), h = c || d || f || u;
      let p;
      c && f ? p = "top-left" : c && u ? p = "top-right" : d && f ? p = "bottom-left" : d && u ? p = "bottom-right" : c ? p = "top" : u ? p = "right" : d ? p = "bottom" : f ? p = "left" : p = e.getAttribute("data-flow-handle-position") ?? (l === "source" ? "bottom" : "top");
      let g, m = !1;
      if (i) {
        const S = s(i);
        S && typeof S == "object" && !Array.isArray(S) ? (g = S.id || e.getAttribute("data-flow-handle-id") || l, S.position && (p = S.position, m = !0)) : g = S || e.getAttribute("data-flow-handle-id") || l;
      } else
        g = e.getAttribute("data-flow-handle-id") || l;
      if (o.includes("hidden") && (e.style.display = "none"), e.dataset.flowHandleType = l, e.dataset.flowHandlePosition = p, e.dataset.flowHandleId = g, h && (e.dataset.flowHandleExplicit = "true"), m && i && (e.dataset.flowHandleExplicit = "true", a(() => {
        const S = s(i);
        S && typeof S == "object" && !Array.isArray(S) && S.position && (e.dataset.flowHandlePosition = S.position);
      })), !h && !m) {
        const S = () => {
          const E = e.closest("[x-flow-node]")?.dataset.flowNodeId;
          if (!E) return;
          const M = e.closest("[x-data]");
          return M ? t.$data(M)?.getNode?.(E) : void 0;
        };
        a(() => {
          const b = S();
          if (!b) return;
          const E = l === "source" ? b.sourcePosition : b.targetPosition;
          E && (e.dataset.flowHandlePosition = E);
        });
      }
      e.classList.add("flow-handle", `flow-handle-${l}`);
      const y = () => {
        const S = e.closest("[x-flow-node]");
        return S ? S.getAttribute("data-flow-node-id") ?? null : null;
      }, x = () => {
        const S = e.closest("[x-data]");
        return S ? t.$data(S) : null;
      }, k = x();
      let _ = null;
      if (k?._config?.keyboardConnect) {
        e.setAttribute("tabindex", "0"), e.setAttribute("role", "button"), e.setAttribute("aria-label", Tn(k)(l === "source" ? "a11y.sourceHandle" : "a11y.targetHandle", { id: g }));
        const S = (M) => {
          const R = M?._pendingKeyboardConnect;
          if (!R) return;
          const L = e.closest(".flow-container");
          L && L.querySelector(
            `[data-flow-node-id="${CSS.escape(R.sourceNodeId)}"] [data-flow-handle-id="${CSS.escape(R.sourceHandleId)}"][data-flow-handle-type="source"]`
          )?.classList.remove("flow-handle-connect-pending"), M && (M._pendingKeyboardConnect = null);
        }, b = (M) => {
          if (!(M.key === "Enter" || M.key === " " || M.key === "Spacebar")) return;
          const L = x();
          if (!L || L._animationLocked) return;
          const D = y();
          if (D)
            if (l === "source") {
              const A = L.getNode?.(D);
              if (A && !Ye(A) || e[At] === !1) return;
              M.preventDefault(), M.stopPropagation(), S(L), L._pendingKeyboardConnect = {
                sourceNodeId: D,
                sourceHandleId: g
              }, e.classList.add("flow-handle-connect-pending"), L._announcer?.announce?.(`Connecting from ${l} handle ${g}. Focus a target handle and press Enter to connect.`);
            } else {
              if (!L._pendingKeyboardConnect) return;
              const A = L.getNode?.(D);
              if (A && !Ye(A) || e[ct] === !1) return;
              M.preventDefault(), M.stopPropagation();
              const { sourceNodeId: v, sourceHandleId: w } = L._pendingKeyboardConnect, T = {
                source: v,
                sourceHandle: w,
                target: D,
                targetHandle: g
              }, P = e.closest(".flow-container");
              if (S(L), !P) return;
              Pa({ connection: T, canvas: L, containerEl: P }).then(($) => {
                $.applied && L._announcer?.announce?.(`Connected ${v} to ${D}.`);
              });
            }
        };
        e.addEventListener("keydown", b);
        const E = e.closest(".flow-container");
        if (E) {
          const M = Yn.get(E);
          if (M)
            M.count += 1;
          else {
            const R = (L) => {
              if (L.key !== "Escape") return;
              const D = E.matches("[x-data]") ? E : E.closest("[x-data]") ?? E.querySelector("[x-data]");
              if (!D) return;
              const A = t.$data(D);
              A?._pendingKeyboardConnect && S(A);
            };
            E.addEventListener("keydown", R), Yn.set(E, { count: 1, handler: R });
          }
        }
        _ = () => {
          if (e.removeEventListener("keydown", b), E) {
            const M = Yn.get(E);
            M && (M.count -= 1, M.count <= 0 && (E.removeEventListener("keydown", M.handler), Yn.delete(E)));
          }
          e.removeAttribute("tabindex"), e.removeAttribute("role"), e.removeAttribute("aria-label"), e.classList.remove("flow-handle-connect-pending");
        };
      }
      if (l === "source") {
        const S = (M) => {
          Na(e, x(), M);
        };
        Is(k) && e.addEventListener("pointerdown", S);
        const b = () => {
          const M = x();
          if (!M?._pendingReconnection || M._pendingReconnection.draggedEnd !== "source") return;
          const R = y();
          if (R) {
            const L = M.getNode(R);
            if (L && !Ye(L)) return;
          }
          e[At] !== !1 && e.classList.add("flow-handle-active");
        }, E = () => {
          e.classList.remove("flow-handle-active");
        };
        e.addEventListener("pointerenter", b), e.addEventListener("pointerleave", E), r(() => {
          wt.get(e)?.(), wt.delete(e), _?.(), e.removeEventListener("pointerdown", S), e.removeEventListener("pointerenter", b), e.removeEventListener("pointerleave", E), e.classList.remove("flow-handle", `flow-handle-${l}`);
        });
      } else {
        const S = () => {
          const R = x();
          if (!R?.pendingConnection) return;
          const L = y();
          if (L) {
            const D = R.getNode(L);
            if (D && !Ye(D)) return;
          }
          e[ct] !== !1 && e.classList.add("flow-handle-active");
        }, b = () => {
          e.classList.remove("flow-handle-active");
        };
        e.addEventListener("pointerenter", S), e.addEventListener("pointerleave", b);
        const E = async (R) => {
          const L = x();
          if (!L?.pendingConnection || L._config?.connectOnClick === !1 || L._connectValidating) return;
          R.preventDefault(), R.stopPropagation();
          const D = y();
          if (!D) return;
          if (e[ct] === !1) {
            B("connection", "Click-to-connect rejected (handle not connectable end)"), L._emit("connect-end", { connection: null, source: L.pendingConnection.source, sourceHandle: L.pendingConnection.sourceHandle, position: { x: 0, y: 0 } }), L.pendingConnection = null, L._container?.classList.remove("flow-connecting");
            const P = e.closest(".flow-container");
            P && Me(P);
            return;
          }
          const A = L.getNode(D);
          if (A && !Ye(A)) {
            B("connection", `Click-to-connect rejected (target "${D}" not connectable)`), L._emit("connect-end", { connection: null, source: L.pendingConnection.source, sourceHandle: L.pendingConnection.sourceHandle, position: { x: 0, y: 0 } }), L.pendingConnection = null, L._container?.classList.remove("flow-connecting");
            const P = e.closest(".flow-container");
            P && Me(P);
            return;
          }
          const v = {
            source: L.pendingConnection.source,
            sourceHandle: L.pendingConnection.sourceHandle,
            target: D,
            targetHandle: g
          }, w = { source: L.pendingConnection.source, sourceHandle: L.pendingConnection.sourceHandle, position: { x: 0, y: 0 } };
          if (bt(v, L.edges, { preventCycles: L._config?.preventCycles })) {
            const P = e.closest(".flow-container");
            if (!vt(v, L._config?.connectionRules, L._nodeMap)) {
              B("connection", "Click-to-connect rejected (connection rules)", v), Te(P, v), L._emit("connect-end", { connection: null, ...w }), L.pendingConnection = null, L._container?.classList.remove("flow-connecting"), P && Me(P);
              return;
            }
            if (P && !rt(P, v, L.edges)) {
              B("connection", "Click-to-connect rejected (handle limit)", v), Te(P, v), L._emit("connect-end", { connection: null, ...w }), L.pendingConnection = null, L._container?.classList.remove("flow-connecting"), Me(P);
              return;
            }
            if (P && !st(P, v)) {
              B("connection", "Click-to-connect rejected (per-handle validator)", v), Te(P, v), L._emit("connect-end", { connection: null, ...w }), L.pendingConnection = null, L._container?.classList.remove("flow-connecting"), P && Me(P);
              return;
            }
            if (L._config?.isValidConnection && !L._config.isValidConnection(v)) {
              B("connection", "Click-to-connect rejected (custom validator)", v), Te(P, v), L._emit("connect-end", { connection: null, ...w }), L.pendingConnection = null, L._container?.classList.remove("flow-connecting"), P && Me(P);
              return;
            }
            const $ = L._config?.connectValidator;
            if ($ && P) {
              const z = L._config?.validatingHandleClass ?? "flow-handle-validating", { sourceEl: I, targetEl: C } = $o(P, v);
              L._connectValidating = !0;
              let N;
              try {
                N = await Io(
                  $,
                  v,
                  I,
                  C,
                  P,
                  z
                );
              } finally {
                L._connectValidating = !1;
              }
              if (!N.allowed) {
                B("connection", "Click-to-connect rejected (async connectValidator)", { connection: v, reason: N.reason }), Te(P, { ...v, reason: N.reason }), L._emit("connect-end", { connection: null, ...w }), L.pendingConnection = null, L._container?.classList.remove("flow-connecting"), Me(P);
                return;
              }
            }
            const H = `e-${v.source}-${v.target}-${Date.now()}-${wn++}`;
            L.addEdges({ id: H, ...v }), B("connection", `Click-to-connect: ${v.source} → ${v.target}`, v), L._emit("connect", { connection: v }), L._emit("connect-end", { connection: v, ...w });
          } else {
            B("connection", "Click-to-connect rejected (invalid)", v);
            const P = e.closest(".flow-container");
            Te(P, v), L._emit("connect-end", { connection: null, ...w });
          }
          L.pendingConnection = null, L._container?.classList.remove("flow-connecting");
          const T = e.closest(".flow-container");
          T && Me(T);
        };
        e.addEventListener("click", E);
        const M = (R) => {
          Aa(e, x(), R);
        };
        Is(k) && e.addEventListener("pointerdown", M), r(() => {
          wt.get(e)?.(), wt.delete(e), _?.(), e.removeEventListener("pointerdown", M), e.removeEventListener("pointerenter", S), e.removeEventListener("pointerleave", b), e.removeEventListener("click", E), e.classList.remove("flow-handle", `flow-handle-${l}`, "flow-handle-active");
        });
      }
    }
  );
}
function $s(t, e) {
  const n = (o) => {
    const s = o.target?.closest?.("[data-flow-handle-type]");
    s && t.contains(s) && (e?._container && s.closest(".flow-container") !== e._container || Ch(s, e, o));
  };
  return t.addEventListener("pointerdown", n, !0), () => t.removeEventListener("pointerdown", n, !0);
}
const Ds = {
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
function kh(t) {
  if (!t) return { ...Ds };
  const e = { ...Ds };
  for (const n of Object.keys(t))
    n in t && (e[n] = t[n]);
  return e;
}
function Je(t, e) {
  if (e == null) return !1;
  const n = t.length === 1 ? t.toLowerCase() : t;
  return Array.isArray(e) ? e.some((o) => (o.length === 1 ? o.toLowerCase() : o) === n) : (e.length === 1 ? e.toLowerCase() : e) === n;
}
function Lh(t, e, n, o) {
  return !t && e > 0 && (n !== 0 || o !== 0);
}
function Mh(t) {
  const e = t;
  if (!e) return !1;
  if (e.isContentEditable) return !0;
  const n = e.tagName;
  return n === "INPUT" || n === "TEXTAREA" || n === "SELECT";
}
function xt(t, e) {
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
function gi(t, e = !0) {
  return t.selectable ?? e;
}
function Ph(t, e, n = {}) {
  const o = n.duration ?? 500, i = n.moveThreshold ?? 10;
  let s = null, a = 0, r = 0, l = null;
  function c() {
    s !== null && (clearTimeout(s), s = null), l = null, document.removeEventListener("pointermove", d), document.removeEventListener("pointerup", c), document.removeEventListener("pointercancel", c);
  }
  function d(u) {
    const h = u.clientX - a, p = u.clientY - r;
    h * h + p * p > i * i && c();
  }
  function f(u) {
    c(), a = u.clientX, r = u.clientY, l = u, document.addEventListener("pointermove", d), document.addEventListener("pointerup", c), document.addEventListener("pointercancel", c), s = setTimeout(() => {
      const h = l;
      c(), h && e(h);
    }, o);
  }
  return t.addEventListener("pointerdown", f), () => {
    c(), t.removeEventListener("pointerdown", f);
  };
}
const Rs = 12;
function Nh(t) {
  return t ? t === !0 ? Rs : t.channelGap ?? Rs : null;
}
function Ta(t) {
  let e = null, n = 0;
  for (let o = 1; o < t.length - 2; o++) {
    const i = t[o], s = t[o + 1], a = i.y === s.y, r = i.x === s.x;
    if (!a && !r) continue;
    const l = Math.abs(a ? s.x - i.x : s.y - i.y);
    l <= n || (n = l, e = a ? { axis: "h", at: i.y, from: Math.min(i.x, s.x), to: Math.max(i.x, s.x), i: o, j: o + 1 } : { axis: "v", at: i.x, from: Math.min(i.y, s.y), to: Math.max(i.y, s.y), i: o, j: o + 1 });
  }
  return e;
}
function Ah(t, e, n) {
  return t.axis !== e.axis || Math.abs(t.at - e.at) > n ? !1 : t.from <= e.to && e.from <= t.to;
}
function Th(t, e) {
  const n = [], o = /* @__PURE__ */ new Set();
  for (let i = 0; i < t.length; i++) {
    if (o.has(i)) continue;
    const s = [t[i]];
    o.add(i);
    let a = !0;
    for (; a; ) {
      a = !1;
      for (let r = 0; r < t.length; r++)
        o.has(r) || s.some((l) => Ah(l.run, t[r].run, e)) && (s.push(t[r]), o.add(r), a = !0);
    }
    n.push(s);
  }
  return n;
}
function Ih(t, e) {
  const n = /* @__PURE__ */ new Map(), o = [...t].sort((s, a) => s.bary - a.bary || (s.edgeId < a.edgeId ? -1 : 1)), i = o.length;
  return o.forEach((s, a) => n.set(s.edgeId, (a - (i - 1) / 2) * e)), n;
}
function $h(t, e, n) {
  if (n === 0) return t.map((i) => ({ ...i }));
  const o = t.map((i) => ({ ...i }));
  return e.axis === "h" ? (o[e.i].y += n, o[e.j].y += n) : (o[e.i].x += n, o[e.j].x += n), o;
}
function Ia(t, e, n) {
  if (!e) return t;
  const o = Ta(t);
  if (!o) return t;
  const i = $h(t, o, e);
  return n && Dh(i, n, mt) ? t : i;
}
function Dh(t, e, n) {
  for (let o = 0; o < t.length - 1; o++) {
    const i = t[o], s = t[o + 1], a = Math.min(i.x, s.x), r = Math.max(i.x, s.x), l = Math.min(i.y, s.y), c = Math.max(i.y, s.y);
    for (const d of e) {
      const f = d.x - n, u = d.y - n, h = d.x + d.width + n, p = d.y + d.height + n;
      if (a < h && r > f && l < p && c > u) return !0;
    }
  }
  return !1;
}
const mt = 20, Xn = mt + 1, $a = 1, Da = 0.5, Rh = `b${$a}d${Da}`;
function Hs(t) {
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
function Fs(t, e) {
  return {
    x: t.x - e,
    y: t.y - e,
    width: t.width + e * 2,
    height: t.height + e * 2
  };
}
function Hh(t, e, n) {
  return t > n.x && t < n.x + n.width && e > n.y && e < n.y + n.height;
}
function Ra(t, e, n, o) {
  const i = Math.min(t, e), s = Math.max(t, e);
  for (const a of o) {
    const r = a.x, l = a.x + a.width, c = a.y, d = a.y + a.height;
    if (n > c && n < d && s > r && i < l)
      return !0;
  }
  return !1;
}
function Ha(t, e, n, o) {
  const i = Math.min(e, n), s = Math.max(e, n);
  for (const a of o) {
    const r = a.x, l = a.x + a.width, c = a.y, d = a.y + a.height;
    if (t > r && t < l && s > c && i < d)
      return !0;
  }
  return !1;
}
function Fh(t, e, n, o, i) {
  const s = /* @__PURE__ */ new Set([t, n]), a = /* @__PURE__ */ new Set([e, o]);
  for (const f of i)
    s.add(f.x), s.add(f.x + f.width), a.add(f.y), a.add(f.y + f.height);
  const r = Array.from(s).sort((f, u) => f - u), l = Array.from(a).sort((f, u) => f - u), c = [];
  let d = 0;
  for (const f of r)
    for (const u of l) {
      let h = !1;
      for (const p of i)
        if (Hh(f, u, p)) {
          h = !0;
          break;
        }
      h || c.push({ x: f, y: u, index: d++ });
    }
  return c;
}
class Oh {
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
        const s = 2 * i + 1, a = s + 1;
        let r = i;
        if (s < this.items.length && this.less(this.items[s], this.items[r]) && (r = s), a < this.items.length && this.less(this.items[a], this.items[r]) && (r = a), r === i) break;
        [this.items[i], this.items[r]] = [this.items[r], this.items[i]], i = r;
      }
    }
    return n;
  }
}
function zh(t, e) {
  const n = t.map(() => []), o = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
  for (const s of t) {
    let a = o.get(s.x);
    a || (a = [], o.set(s.x, a)), a.push(s);
    let r = i.get(s.y);
    r || (r = [], i.set(s.y, r)), r.push(s);
  }
  for (const s of o.values()) {
    s.sort((a, r) => a.y - r.y);
    for (let a = 1; a < s.length; a++) {
      const r = s[a - 1], l = s[a];
      Ha(r.x, r.y, l.y, e) || (n[r.index].push(l.index), n[l.index].push(r.index));
    }
  }
  for (const s of i.values()) {
    s.sort((a, r) => a.x - r.x);
    for (let a = 1; a < s.length; a++) {
      const r = s[a - 1], l = s[a];
      Ra(r.x, l.x, r.y, e) || (n[r.index].push(l.index), n[l.index].push(r.index));
    }
  }
  return n;
}
function Vh(t, e, n, o) {
  const i = n.length, s = 2 * i, a = new Float64Array(s).fill(1 / 0), r = new Float64Array(s).fill(1 / 0), l = new Int32Array(s).fill(-1), c = new Uint8Array(s), d = zh(n, o), f = Math.min(t.x, e.x), u = Math.max(t.x, e.x), h = Math.min(t.y, e.y), p = Math.max(t.y, e.y), g = (E) => Math.max(0, f - E.x) + Math.max(0, E.x - u) + Math.max(0, h - E.y) + Math.max(0, E.y - p), m = (E, M) => a[E] < a[M] || a[E] === a[M] && r[E] < r[M], y = new Oh(m);
  for (let E = 0; E < 2; E++) {
    const M = E * i + t.index;
    a[M] = 0, r[M] = 0, y.push(M);
  }
  const x = (E) => E % i, k = (E) => E < i ? 0 : 1;
  let _ = -1;
  for (; y.size > 0; ) {
    const E = y.pop();
    if (c[E]) continue;
    c[E] = 1;
    const M = x(E);
    if (M === e.index) {
      _ = E;
      break;
    }
    const R = k(E), L = n[M];
    for (const D of d[M]) {
      const A = n[D], v = L.x === A.x ? 1 : 0, w = v * i + D;
      if (c[w]) continue;
      const T = Math.abs(A.x - L.x) + Math.abs(A.y - L.y), $ = $a * (R === v ? 0 : 1) + Da * g(A), H = a[E] + T, z = r[E] + $;
      (H < a[w] || H === a[w] && z < r[w]) && (a[w] = H, r[w] = z, l[w] = E, y.push(w));
    }
  }
  if (_ === -1) {
    const E = e.index, M = i + e.index;
    if (a[E] === 1 / 0 && a[M] === 1 / 0) return null;
    _ = m(E, M) ? E : M;
  }
  const S = [];
  let b = _;
  for (; b !== -1; )
    S.unshift(n[x(b)]), b = l[b];
  return S;
}
function Bh(t) {
  if (t.length <= 2) return t;
  const e = [t[0]];
  for (let n = 1; n < t.length - 1; n++) {
    const o = e[e.length - 1], i = t[n + 1], s = t[n], a = o.x === s.x && s.x === i.x, r = o.y === s.y && s.y === i.y;
    !a && !r && e.push(s);
  }
  return e.push(t[t.length - 1]), e;
}
function qh(t, e) {
  if (t.length < 2) return "";
  let n = `M${t[0].x},${t[0].y}`;
  for (let i = 1; i < t.length - 1; i++) {
    const s = t[i - 1], a = t[i], r = t[i + 1];
    e > 0 ? n += ` ${Zt(s.x, s.y, a.x, a.y, r.x, r.y, e)}` : n += ` L${a.x},${a.y}`;
  }
  const o = t[t.length - 1];
  return n += ` L${o.x},${o.y}`, n;
}
function Yh(t) {
  if (t.length < 2)
    return { x: t[0]?.x ?? 0, y: t[0]?.y ?? 0, offsetX: 0, offsetY: 0 };
  let e = 0;
  const n = [];
  for (let s = 1; s < t.length; s++) {
    const a = t[s].x - t[s - 1].x, r = t[s].y - t[s - 1].y, l = Math.abs(a) + Math.abs(r);
    n.push(l), e += l;
  }
  let o = e / 2;
  for (let s = 0; s < n.length; s++) {
    if (o <= n[s]) {
      const a = n[s] > 0 ? o / n[s] : 0, r = t[s].x + (t[s + 1].x - t[s].x) * a, l = t[s].y + (t[s + 1].y - t[s].y) * a;
      return {
        x: r,
        y: l,
        offsetX: Math.abs(t[t.length - 1].x - t[0].x) / 2,
        offsetY: Math.abs(t[t.length - 1].y - t[0].y) / 2
      };
    }
    o -= n[s];
  }
  const i = t[t.length - 1];
  return { x: i.x, y: i.y, offsetX: 0, offsetY: 0 };
}
const _t = 200;
function Xh(t, e, n, o, i) {
  const s = Math.min(t, n) - _t, a = Math.max(t, n) + _t, r = Math.min(e, o) - _t, l = Math.max(e, o) + _t;
  return i.filter(
    (c) => c.x < a && c.x + c.width > s && c.y < l && c.y + c.height > r
  );
}
function Wh(t, e) {
  for (let n = 1; n < t.length; n++) {
    const o = t[n - 1], i = t[n];
    if (o.x === i.x) {
      if (Ha(o.x, o.y, i.y, e)) return !0;
    } else if (o.y === i.y && Ra(o.x, i.x, o.y, e))
      return !0;
  }
  return !1;
}
function jh(t, e, n, o, i, s, a) {
  const r = Hs(n), l = Hs(s), c = t + r.x * Xn, d = e + r.y * Xn, f = o + l.x * Xn, u = i + l.y * Xn, h = (_) => {
    const S = (b, E) => b > _.x - mt && b < _.x + _.width + mt && E > _.y - mt && E < _.y + _.height + mt;
    return S(t, e) || S(c, d) || S(o, i) || S(f, u);
  }, p = a.filter((_) => !h(_)), g = (_) => {
    const S = _.map((D) => Fs(D, mt)), b = Fh(c, d, f, u, S);
    b.length;
    const E = b.find((D) => D.x === c && D.y === d), M = b.find((D) => D.x === f && D.y === u);
    E || b.push({ x: c, y: d, index: b.length }), M || b.push({ x: f, y: u, index: b.length });
    const R = E ?? b[b.length - (M ? 1 : 2)], L = M ?? b[b.length - 1];
    return Vh(R, L, b, S);
  }, m = Xh(t, e, o, i, p), y = m.length < p.length;
  let x = g(m);
  if (y) {
    const _ = p.map((b) => Fs(b, mt));
    (!(x !== null && x.length >= 2) || Wh(x, _)) && (x = g(p));
  }
  if (!x || x.length < 2) return null;
  const k = [
    { x: t, y: e, index: -1 },
    ...x,
    { x: o, y: i, index: -2 }
  ];
  return Bh(k);
}
const Uh = 512, ht = /* @__PURE__ */ new Map();
function Gh(t, e, n, o, i, s, a) {
  let r = `${Rh}|${Math.round(t)},${Math.round(e)},${n}|${Math.round(o)},${Math.round(i)},${s}`;
  for (const l of a)
    r += `|${Math.round(l.x)},${Math.round(l.y)},${Math.round(l.width)},${Math.round(l.height)}`;
  return r;
}
function Fi(t, e, n, o, i, s, a) {
  const r = Gh(t, e, n, o, i, s, a);
  if (ht.has(r)) {
    const c = ht.get(r);
    return ht.delete(r), ht.set(r, c), c;
  }
  const l = jh(t, e, n, o, i, s, a);
  return ht.set(r, l), ht.size > Uh && ht.delete(ht.keys().next().value), l;
}
function Zh({
  sourceX: t,
  sourceY: e,
  sourcePosition: n = "bottom",
  targetX: o,
  targetY: i,
  targetPosition: s = "top",
  obstacles: a,
  borderRadius: r = 5,
  channelOffset: l
}) {
  if (!a || a.length === 0)
    return Ln({
      sourceX: t,
      sourceY: e,
      sourcePosition: n,
      targetX: o,
      targetY: i,
      targetPosition: s,
      borderRadius: r
    });
  const c = Fi(t, e, n, o, i, s, a);
  if (!c)
    return Ln({
      sourceX: t,
      sourceY: e,
      sourcePosition: n,
      targetX: o,
      targetY: i,
      targetPosition: s,
      borderRadius: r
    });
  const d = Ia(c, l, a), f = qh(d, r), { x: u, y: h, offsetX: p, offsetY: g } = Yh(d);
  return {
    path: f,
    labelPosition: { x: u, y: h },
    labelOffsetX: p,
    labelOffsetY: g
  };
}
const Os = 5;
function yo(t) {
  return t ? t === !0 ? Os : t.spacing ?? Os : null;
}
function zs(t, e, n, o) {
  if (e <= 1) return 0;
  const s = Math.min((e - 1) * o, Math.max(0, n)) / (e - 1);
  return (t - (e - 1) / 2) * s;
}
function Vs(t, e, n) {
  return e === "left" || e === "right" ? { x: t.x, y: t.y + n } : { x: t.x + n, y: t.y };
}
const Bs = 20;
function Fa(t) {
  return new Map(t.map((e) => [e.id, e]));
}
function Kh(t, e) {
  const n = /* @__PURE__ */ new Map();
  for (const o of e)
    if (o.parentId) {
      const i = n.get(o.parentId);
      i ? i.push(o.id) : n.set(o.parentId, [o.id]);
    }
  for (const o of t.keys())
    n.has(o) || t.delete(o);
  for (const [o, i] of n) {
    const s = t.get(o);
    (!s || s.length !== i.length || s.some((a, r) => a !== i[r])) && t.set(o, i);
  }
}
function pi(t, e, n) {
  if (!t.position) return { x: 0, y: 0 };
  let o = t.position.x, i = t.position.y;
  const s = /* @__PURE__ */ new Set();
  s.add(t.id);
  let a = t.parentId ? e.get(t.parentId) : void 0;
  for (; a && !s.has(a.id); ) {
    s.add(a.id);
    const r = a.nodeOrigin ?? n ?? [0, 0], l = a.dimensions?.width ?? we, c = a.dimensions?.height ?? be;
    o += a.position.x - l * r[0], i += a.position.y - c * r[1], a = a.parentId ? e.get(a.parentId) : void 0;
  }
  return { x: o, y: i };
}
function dt(t, e, n) {
  if (!t.parentId)
    return t;
  const o = pi(t, e, n);
  return { ...t, position: o };
}
function wo(t, e, n) {
  return t.map((o) => dt(o, e, n));
}
function Et(t, e) {
  const n = /* @__PURE__ */ new Set(), o = [t], i = /* @__PURE__ */ new Map();
  for (const s of e)
    if (s.parentId) {
      const a = i.get(s.parentId);
      a ? a.push(s.id) : i.set(s.parentId, [s.id]);
    }
  for (; o.length > 0; ) {
    const s = o.shift(), a = i.get(s);
    if (a)
      for (const r of a)
        n.has(r) || (n.add(r), o.push(r));
  }
  return n;
}
function Tt(t) {
  const e = Fa(t), n = [], o = /* @__PURE__ */ new Set();
  function i(s) {
    if (!o.has(s.id)) {
      if (s.parentId) {
        const a = e.get(s.parentId);
        a && i(a);
      }
      o.add(s.id), n.push(s);
    }
  }
  for (const s of t)
    i(s);
  return n;
}
function Oa(t, e, n = /* @__PURE__ */ new Set()) {
  if (n.has(t.id))
    return t.zIndex ?? 2;
  if (n.add(t.id), !t.parentId)
    return t.zIndex !== void 0 ? t.zIndex : t.type === "group" ? 0 : 2;
  const o = e.get(t.parentId);
  return o ? Oa(o, e, n) + 2 + (t.zIndex ?? 0) : (t.zIndex ?? 0) + 2;
}
function za(t, e, n) {
  return {
    x: Math.max(e[0][0], Math.min(t.x, e[1][0] - (n?.width ?? 0))),
    y: Math.max(e[0][1], Math.min(t.y, e[1][1] - (n?.height ?? 0)))
  };
}
function Bo(t, e, n) {
  return {
    x: Math.max(0, Math.min(t.x, n.width - e.width)),
    y: Math.max(0, Math.min(t.y, n.height - e.height))
  };
}
function Wn(t, e, n) {
  const o = e.extent ?? n;
  if (!o || o === "parent" || e.parentId) return t;
  const i = e.dimensions ?? { width: we, height: be };
  return za(t, o, i);
}
function Jh(t, e, n) {
  const o = t.x + e.width + Bs, i = t.y + e.height + Bs, s = Math.max(n.width, o), a = Math.max(n.height, i);
  return s === n.width && a === n.height ? null : { width: s, height: a };
}
function qs(t, e, n) {
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
function Qh(t, e, n) {
  const o = t / 2, i = e / 2, s = t / 2, a = e / 2;
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
      const r = -Math.PI / 4;
      return { x: o + s * Math.cos(r), y: i + a * Math.sin(r) };
    }
    case "top-left": {
      const r = -3 * Math.PI / 4;
      return { x: o + s * Math.cos(r), y: i + a * Math.sin(r) };
    }
    case "bottom-right": {
      const r = Math.PI / 4;
      return { x: o + s * Math.cos(r), y: i + a * Math.sin(r) };
    }
    case "bottom-left": {
      const r = 3 * Math.PI / 4;
      return { x: o + s * Math.cos(r), y: i + a * Math.sin(r) };
    }
  }
}
function eg(t, e, n) {
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
function tg(t, e, n) {
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
function ng(t, e, n) {
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
function og(t, e, n) {
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
function ig(t, e, n) {
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
function sg(t, e, n) {
  const o = Math.min(t, e) / 2, i = t / 2, s = e / 2;
  switch (n) {
    case "top":
      return { x: i, y: 0 };
    case "right":
      return { x: t, y: s };
    case "bottom":
      return { x: i, y: e };
    case "left":
      return { x: 0, y: s };
    case "top-right": {
      const a = t - o, r = -Math.PI / 4;
      return { x: a + o * Math.cos(r), y: s + o * Math.sin(r) };
    }
    case "top-left": {
      const a = o, r = -3 * Math.PI / 4;
      return { x: a + o * Math.cos(r), y: s + o * Math.sin(r) };
    }
    case "bottom-right": {
      const a = t - o, r = Math.PI / 4;
      return { x: a + o * Math.cos(r), y: s + o * Math.sin(r) };
    }
    case "bottom-left": {
      const a = o, r = 3 * Math.PI / 4;
      return { x: a + o * Math.cos(r), y: s + o * Math.sin(r) };
    }
  }
}
const Va = {
  circle: { perimeterPoint: Qh },
  diamond: { perimeterPoint: eg },
  hexagon: { perimeterPoint: tg },
  parallelogram: { perimeterPoint: ng },
  triangle: { perimeterPoint: og },
  cylinder: { perimeterPoint: ig },
  stadium: { perimeterPoint: sg }
};
function Ba(t, e = "light") {
  let n = e === "dark" ? "dark" : "light", o = null, i = null;
  function s(r) {
    n = r ? "dark" : "light", t.classList.toggle("dark", r);
  }
  function a(r) {
    o && i && (o.removeEventListener("change", i), o = null, i = null), r === "system" ? (o = window.matchMedia("(prefers-color-scheme: dark)"), s(o.matches), i = (l) => s(l.matches), o.addEventListener("change", i)) : s(r === "dark");
  }
  return a(e), {
    get resolved() {
      return n;
    },
    update: a,
    destroy() {
      o && i && o.removeEventListener("change", i), t.classList.remove("dark");
    }
  };
}
const qo = "__alpineflow_collab_store__";
function rg() {
  return typeof globalThis < "u" ? (globalThis[qo] || (globalThis[qo] = /* @__PURE__ */ new WeakMap()), globalThis[qo]) : /* @__PURE__ */ new WeakMap();
}
const Fe = rg(), Yo = "__alpineflow_registry__";
function qa() {
  return typeof globalThis < "u" ? (globalThis[Yo] || (globalThis[Yo] = /* @__PURE__ */ new Map()), globalThis[Yo]) : /* @__PURE__ */ new Map();
}
function zt(t) {
  return qa().get(t);
}
function ag(t, e, n = Ao) {
  switch (t) {
    case "nodes-change": {
      const o = e.nodes ?? [], i = o.length === 1 ? o[0].data?.label || o[0].id : null;
      return e.type === "add" ? i ? n("announce.nodeAdded", { label: i }) : n("announce.nodesAdded", { count: o.length }) : e.type === "remove" ? i ? n("announce.nodeRemoved", { label: i }) : n("announce.nodesRemoved", { count: o.length }) : null;
    }
    case "edges-change": {
      const o = e.edges ?? [];
      return e.type === "add" ? o.length === 1 ? n("announce.connected", { source: o[0].source, target: o[0].target }) : n("announce.connectionsAdded", { count: o.length }) : e.type === "remove" ? o.length === 1 && o[0].source && o[0].target ? n("announce.disconnected", { source: o[0].source, target: o[0].target }) : n("announce.connectionsRemoved", { count: o.length }) : null;
    }
    case "selection-change": {
      const o = e.nodes?.length ?? 0, i = e.edges?.length ?? 0;
      if (o === 0 && i === 0)
        return n("announce.selectionCleared");
      const s = [];
      return o > 0 && s.push(n("announce.nodesSelected", { count: o })), i > 0 && s.push(n("announce.edgesSelected", { count: i })), n("announce.selected", { items: s.length === 2 ? n("announce.selectionJoin", { nodes: s[0], edges: s[1] }) : s[0] });
    }
    case "viewport-move-end": {
      const o = e.viewport?.zoom ?? 1;
      return n("announce.viewportZoom", { percent: Math.round(o * 100) });
    }
    case "fit-view":
      return n("announce.viewFitted");
    case "node-reparent": {
      const o = e.node?.data?.label || e.node?.id || n("announce.node");
      return e.newParentId ? n("announce.reparented", { name: o, parent: e.newParentId }) : n("announce.detached", { name: o, parent: e.oldParentId });
    }
    default:
      return null;
  }
}
const lg = 1e3;
class cg {
  constructor(e, n, o = Ao) {
    this._clearTimer = null, this._t = o, this._formatMessage = n ?? ag, this._el = document.createElement("div"), this._el.setAttribute("aria-live", "polite"), this._el.setAttribute("aria-atomic", "true"), this._el.setAttribute("role", "status");
    const i = this._el.style;
    i.position = "absolute", i.width = "1px", i.height = "1px", i.padding = "0", i.margin = "-1px", i.overflow = "hidden", i.clip = "rect(0,0,0,0)", i.whiteSpace = "nowrap", i.border = "0", e.appendChild(this._el);
  }
  announce(e) {
    this._clearTimer && clearTimeout(this._clearTimer), this._el.textContent = e, this._clearTimer = setTimeout(() => {
      this._el.textContent = "", this._clearTimer = null;
    }, lg);
  }
  handleEvent(e, n) {
    const o = this._formatMessage(e, n, this._t);
    o && this.announce(o);
  }
  destroy() {
    this._clearTimer && clearTimeout(this._clearTimer), this._el.remove();
  }
}
class dg {
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
    const o = new Map(e.map((l) => [l.id, l])), i = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map();
    for (const l of e)
      i.set(l.id, 0), s.set(l.id, []);
    for (const l of n)
      !o.has(l.source) || !o.has(l.target) || (i.set(l.target, (i.get(l.target) ?? 0) + 1), s.get(l.source).push(l.target));
    const a = [];
    for (const [l, c] of i)
      c === 0 && a.push(l);
    const r = [];
    for (; a.length > 0; ) {
      const l = a.shift();
      r.push(o.get(l));
      for (const c of s.get(l) ?? []) {
        const d = (i.get(c) ?? 0) - 1;
        i.set(c, d), d === 0 && a.push(c);
      }
    }
    if (r.length < e.length) {
      const l = new Set(r.map((c) => c.id));
      for (const c of e)
        l.has(c.id) || r.push(c);
    }
    return r;
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
    const i = this.topologicalSort(e, n), s = /* @__PURE__ */ new Map();
    if (o)
      for (const l of e)
        l.data.$outputs && s.set(l.id, l.data.$outputs);
    let a = null;
    o && (a = this._getDownstream(o, n), a.add(o));
    const r = /* @__PURE__ */ new Map();
    for (const l of i) {
      if (a && !a.has(l.id)) continue;
      const c = this._registry.get(l.type ?? "default");
      if (!c) continue;
      const d = {}, f = n.filter((h) => h.target === l.id);
      for (const h of f) {
        const p = s.get(h.source);
        if (!p) continue;
        const g = h.sourceHandle ?? "default", m = h.targetHandle ?? "default";
        g in p && (d[m] = p[g]);
      }
      const u = c.compute(d, l.data);
      s.set(l.id, u), r.set(l.id, u), l.data.$inputs = d, l.data.$outputs = u;
    }
    return r;
  }
  /** Get all downstream node IDs reachable from a start node. */
  _getDownstream(e, n) {
    const o = /* @__PURE__ */ new Map();
    for (const a of n) {
      let r = o.get(a.source);
      r || (r = [], o.set(a.source, r)), r.push(a.target);
    }
    const i = /* @__PURE__ */ new Set(), s = [e];
    for (; s.length > 0; ) {
      const a = s.pop();
      if (!i.has(a)) {
        i.add(a);
        for (const r of o.get(a) ?? [])
          i.has(r) || s.push(r);
      }
    }
    return i.delete(e), i;
  }
}
const ug = {
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
  "minimap-resize": (t) => [t.width, t.height],
  "selection-change": (t) => [t.nodes, t.edges],
  "selection-context-menu": (t) => [t.nodes, t.edges, { x: t.event.clientX, y: t.event.clientY }],
  drop: (t) => [t.data, t.position],
  init: () => [],
  "row-select": (t) => [t.rowId, t.nodeId, t.attrId],
  "row-deselect": (t) => [t.rowId, t.nodeId, t.attrId],
  "row-selection-change": (t) => [t.selectedRows]
}, fg = {
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
}, hg = {
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
}, Ys = {
  success: { borderColor: "#22c55e", shadow: "0 0 0 2px rgba(34,197,94,0.3)" },
  error: { borderColor: "#ef4444", shadow: "0 0 0 2px rgba(239,68,68,0.3)" },
  warning: { borderColor: "#f59e0b", shadow: "0 0 0 2px rgba(245,158,11,0.3)" },
  info: { borderColor: "#3b82f6", shadow: "0 0 0 2px rgba(59,130,246,0.3)" }
};
function gg(t, e) {
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
    const s = i.dimensions?.width ?? 150, a = i.dimensions?.height ?? 40, r = i.parentId ? t.getAbsolutePosition(o.id) : i.position;
    t.fitBounds(
      { x: r.x, y: r.y, width: s, height: a },
      { padding: o.padding ?? 0.5, duration: o.duration ?? 300 }
    );
  })), n.push(e.on("flow:connect", (o) => {
    const s = { id: o.edgeId ?? `e-${o.source}-${o.target}`, source: o.source, target: o.target, ...o.options ?? {} };
    o.duration && o.duration > 0 ? t.timeline().step({ addEdges: [s], edgeTransition: "draw", duration: o.duration }).play() : t.addEdges(s);
  })), n.push(e.on("flow:disconnect", (o) => {
    const i = t.edges.filter((s) => s.source === o.source && s.target === o.target).map((s) => s.id);
    i.length !== 0 && (o.duration && o.duration > 0 ? t.timeline().step({ removeEdges: i, edgeTransition: "fade", duration: o.duration }).play() : t.removeEdges(i));
  })), n.push(e.on("flow:highlightNode", (o) => {
    const i = t.getNode(o.id);
    if (!i) return;
    const s = Ys[o.style] ?? Ys.info, a = o.duration ?? 1500, r = Math.floor(a * 0.6), l = Math.floor(a * 0.4), c = i.style?.borderColor ?? null, d = i.style?.boxShadow ?? null;
    t.update({
      nodes: { [o.id]: { style: `border-color: ${s.borderColor}; box-shadow: ${s.shadow}` } }
    }, { duration: 100 }), setTimeout(() => {
      const f = c ? `border-color: ${c}; box-shadow: ${d ?? "none"}` : "";
      t.update({
        nodes: { [o.id]: { style: f } }
      }, { duration: l });
    }, 100 + r);
  })), n.push(e.on("flow:highlightPath", (o) => {
    const i = o.nodeIds, s = o.options ?? {}, { delay: a, ...r } = s, l = a ?? 200, c = {
      color: "#3b82f6",
      size: 5,
      duration: "800ms",
      ...r
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
      const s = t.getNode(i);
      s && (s.selected = !0);
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
      const s = t.getEdge(i);
      s && (s.selected = !0);
    }
  })), () => {
    for (const o of n)
      typeof o == "function" && o();
  };
}
function pg(t) {
  return "on" + t.split("-").map(
    (e) => e.charAt(0).toUpperCase() + e.slice(1)
  ).join("");
}
const mg = /* @__PURE__ */ new Set(["viewport-change", "viewport-move"]), yg = 150;
function wg(t, e) {
  let n = null, o = null;
  return ((...i) => {
    o = i, n === null && (n = setTimeout(() => {
      n = null;
      const s = o;
      o = null, t(...s);
    }, e));
  });
}
function _g(t, e, n) {
  for (const [o, i] of Object.entries(n)) {
    const s = pg(o), a = t[s], r = (l) => {
      let c;
      typeof a == "function" && (c = a(l));
      const d = ug[o], f = d ? d(l) : [l], u = e[i];
      return typeof u == "function" && u.call(e, ...f), c;
    };
    t[s] = mg.has(o) ? wg(r, yg) : r;
  }
}
function vg(t, e) {
  const n = [];
  for (const [o, i] of Object.entries(fg)) {
    const s = e.on(o, (a) => {
      const r = t[i];
      if (typeof r != "function") return;
      const l = hg[o], c = l ? l(a) : Object.values(a);
      r.call(t, ...c);
    });
    n.push(s);
  }
  return () => {
    for (const o of n)
      typeof o == "function" && o();
  };
}
const bg = 5;
function xg(t) {
  const e = /* @__PURE__ */ new Set(), n = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Set();
  let i = null, s = /* @__PURE__ */ new Set(), a = 0;
  const r = /* @__PURE__ */ new Set();
  function l() {
    i === null && (i = requestAnimationFrame(() => {
      i = null;
      for (const c of e) {
        const f = (s.has(c) ? n.get(c) ?? 0 : 0) + 1;
        n.set(c, f), f > bg && !o.has(c) && (o.add(c), console.warn(
          `[alpineflow] Auto-layout for parent "${c}" has run for ${f} consecutive frames. Suppressing to avoid an infinite loop. This usually indicates a layout that keeps changing child dimensions by more than the 1px threshold. Next user mutation will clear the suppression.`
        ));
      }
      for (const c of n.keys())
        e.has(c) || n.set(c, 0);
      s = new Set(e), e.clear();
    }));
  }
  return {
    safeLayoutChildren(c) {
      if (!o.has(c)) {
        if (a > 0) {
          r.add(c);
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
      a++;
    },
    resume() {
      if (a !== 0 && (a--, a === 0)) {
        for (const c of r)
          o.has(c) || e.has(c) || (e.add(c), l(), t(c));
        r.clear();
      }
    }
  };
}
function Eg(t) {
  return function(n) {
    t.suspend();
    try {
      return n();
    } finally {
      t.resume();
    }
  };
}
function Cg(t, e, n) {
  let { width: o, height: i } = t;
  return e?.width !== void 0 && (o = Math.max(o, e.width)), e?.height !== void 0 && (i = Math.max(i, e.height)), n?.width !== void 0 && (o = Math.min(o, n.width)), n?.height !== void 0 && (i = Math.min(i, n.height)), { width: o, height: i };
}
function _n(t, e) {
  const n = t.type ?? "default", o = e[n], i = t.data?.childValidation;
  if (!(!o && !i))
    return o ? i ? { ...o, ...i } : o : i;
}
function Ya(t, e, n, o) {
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
    const i = e.type ?? "default", s = o.childTypeConstraints[i];
    if (s?.max !== void 0 && n.filter(
      (r) => (r.type ?? "default") === i
    ).length >= s.max)
      return {
        valid: !1,
        rule: "childTypeConstraints",
        message: `Maximum ${s.max} "${i}" node(s) allowed`
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
function _o(t, e, n, o) {
  if (!o) return { valid: !0 };
  if (o.preventChildEscape)
    return {
      valid: !1,
      rule: "preventChildEscape",
      message: "Children cannot be moved out of this group"
    };
  const i = n.length - 1, s = Math.max(
    o.minChildren ?? 0,
    o.requiredChildren ? 1 : 0
  );
  if (s > 0 && i < s)
    return {
      valid: !1,
      rule: "minChildren",
      message: `Requires at least ${s} child node(s)`
    };
  if (o.childTypeConstraints) {
    const a = e.type ?? "default", r = o.childTypeConstraints[a];
    if (r?.min !== void 0 && n.filter(
      (c) => (c.type ?? "default") === a
    ).length - 1 < r.min)
      return {
        valid: !1,
        rule: "childTypeConstraints",
        message: `Requires at least ${r.min} "${a}" node(s)`
      };
  }
  return { valid: !0 };
}
function Xs(t, e, n) {
  if (!n) return [];
  const o = [], i = Math.max(
    n.minChildren ?? 0,
    n.requiredChildren ? 1 : 0
  );
  if (i > 0 && e.length < i && o.push(`Requires at least ${i} child node(s)`), n.maxChildren !== void 0 && e.length > n.maxChildren && o.push(`Maximum ${n.maxChildren} child node(s) allowed`), n.childTypeConstraints)
    for (const [s, a] of Object.entries(n.childTypeConstraints)) {
      const r = e.filter(
        (l) => (l.type ?? "default") === s
      ).length;
      a.min !== void 0 && r < a.min && o.push(`Requires at least ${a.min} "${s}" node(s)`), a.max !== void 0 && r > a.max && o.push(`Maximum ${a.max} "${s}" node(s) allowed`);
    }
  return o;
}
function Jt(t, e) {
  const n = en(t, e);
  return {
    x: n.x,
    y: n.y,
    width: t.dimensions?.width ?? we,
    height: t.dimensions?.height ?? be
  };
}
function Xa(t, e) {
  return t.x < e.x + e.width && t.x + t.width > e.x && t.y < e.y + e.height && t.y + t.height > e.y;
}
function Sg(t, e, n = !0) {
  const o = Jt(t);
  return e.filter((i) => {
    if (i.id === t.id) return !1;
    const s = Jt(i);
    return n ? Xa(o, s) : o.x <= s.x && o.y <= s.y && o.x + o.width >= s.x + s.width && o.y + o.height >= s.y + s.height;
  });
}
function kg(t, e, n = !0) {
  if (t.id === e.id) return !1;
  const o = Jt(t), i = Jt(e);
  return n ? Xa(o, i) : o.x <= i.x && o.y <= i.y && o.x + o.width >= i.x + i.width && o.y + o.height >= i.y + i.height;
}
function Lg(t, e, n, o, i = 5) {
  let { x: s, y: a } = t;
  for (const r of o) {
    const l = s + e, c = a + n, d = r.x + r.width, f = r.y + r.height;
    if (s < d + i && l > r.x - i && a < f + i && c > r.y - i) {
      const u = l - (r.x - i), h = d + i - s, p = c - (r.y - i), g = f + i - a, m = Math.min(u, h, p, g);
      m === u ? s -= u : m === h ? s += h : m === p ? a -= p : a += g;
    }
  }
  return { x: s, y: a };
}
function Mg(t) {
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
      const s = [];
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
                ...s.filter(
                  (g) => g.parentId === d.parentId
                )
              ], p = Ya(u, d, h, f);
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
        s.push(d);
      }
      o = s, t.nodes.push(...o);
      for (const d of o)
        d.dimensions && t._initialDimensions.set(d.id, { ...d.dimensions });
      let a = o.some((d) => d.parentId);
      if (!a) {
        const d = new Set(o.map((f) => f.id));
        a = t.nodes.some(
          (f) => f.parentId && d.has(f.parentId)
        );
      }
      if (a) {
        const d = Tt(t.nodes);
        t.nodes.splice(0, t.nodes.length, ...d);
      }
      t._rebuildNodeMap();
      for (const d of o)
        if (d.childLayout) {
          const f = t._nodeMap.get(d.id);
          f && t._installChildLayoutWatchers(f);
        }
      t._emit("nodes-change", { type: "add", nodes: o, origin: n?.source ?? "api" });
      const r = t._container ? Fe.get(t._container) : void 0;
      if (r?.bridge)
        for (const d of o)
          r.bridge.pushLocalNodeAdd(d);
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
        ), y = _o(g, h, m, p);
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
      const s = /* @__PURE__ */ new Map();
      for (const u of o) {
        const h = t._nodeMap.get(u);
        h?.parentId && s.set(u, h.parentId);
      }
      for (const u of [...o])
        for (const h of Et(u, t.nodes))
          o.add(h);
      B("destroy", `Removing ${o.size} node(s)`, [...o]);
      const a = t.nodes.filter((u) => o.has(u.id));
      let r = [];
      t._config.reconnectOnDelete && (r = hh(o, t.nodes, t.edges));
      const l = [];
      t.edges = t.edges.filter((u) => o.has(u.source) || o.has(u.target) ? (l.push(u.id), !1) : !0), r.length && (t.edges.push(...r), B("destroy", `Created ${r.length} reconnection edge(s)`)), t._rebuildEdgeMap(), t.nodes = t.nodes.filter((u) => !o.has(u.id)), t._rebuildNodeMap();
      for (const u of o)
        t.selectedNodes.delete(u), t._initialDimensions.delete(u), t._uninstallChildLayoutWatchers(u), t._draggingNodeIds?.delete(u);
      for (const u of l)
        t._edgeDirtyTicks?.delete(u), t._edgeCorridors?.delete(u);
      a.length && t._emit("nodes-change", { type: "remove", nodes: a, origin: n?.source ?? "api" }), r.length && t._emit("edges-change", { type: "add", edges: r, origin: n?.source ?? "api" });
      const c = t._container ? Fe.get(t._container) : void 0;
      if (c?.bridge) {
        for (const u of o)
          c.bridge.pushLocalNodeRemove(u);
        for (const u of l)
          c.bridge.pushLocalEdgeRemove(u);
        for (const u of r)
          c.bridge.pushLocalEdgeAdd(u);
      }
      t._recomputeChildValidation();
      const d = /* @__PURE__ */ new Set();
      for (const u of o) {
        const h = s.get(u);
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
      return hi(e, t.nodes, t.edges);
    },
    /**
     * Get all nodes connected via incoming edges to the given node.
     */
    getIncomers(e) {
      return dh(e, t.nodes, t.edges);
    },
    /**
     * Get all edges connected to a node (both incoming and outgoing).
     */
    getConnectedEdges(e) {
      return ch(e, t.edges);
    },
    /**
     * Check if two nodes are connected by an edge.
     * When `directed` is true, only checks source→target direction.
     */
    areNodesConnected(e, n, o = !1) {
      return fh(e, n, t.edges, o);
    },
    /**
     * Apply a node-level filter predicate.
     * Nodes that fail the predicate get `filtered = true`.
     */
    setNodeFilter(e) {
      const n = [], o = [];
      for (const i of t.nodes) {
        const s = !e(i);
        i.filtered = s, s ? n.push(i) : o.push(i);
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
      return o ? Sg(o, t.nodes, n) : [];
    },
    /**
     * Check if two nodes' bounding rects overlap.
     * Accepts either FlowNode objects or node ID strings.
     */
    isNodeIntersecting(e, n, o) {
      const i = typeof e == "string" ? t.nodes.find((a) => a.id === e) : e, s = typeof n == "string" ? t.nodes.find((a) => a.id === n) : n;
      return !i || !s ? !1 : kg(i, s, o);
    },
    /**
     * Set runState on one or more nodes by ID.
     * The x-flow-node directive reactively applies .flow-node-{state} CSS classes.
     */
    setNodeState(e, n) {
      const o = Array.isArray(e) ? e : [e];
      for (const i of o) {
        const s = t._nodeMap.get(i);
        s && (s.runState = n);
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
function Pg(t) {
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
      const o = t._config.defaultEdgeOptions, i = t._config.connectionRules, s = (Array.isArray(e) ? e : [e]).map((l) => o ? { ...o, ...l } : l).filter((l) => {
        if (!i) return !0;
        const c = { source: l.source, sourceHandle: l.sourceHandle, target: l.target, targetHandle: l.targetHandle };
        return vt(c, i, t._nodeMap);
      });
      if (s.length === 0) return;
      t._captureHistory(), B("edge", `Adding ${s.length} edge(s)`, s.map((l) => l.id)), t.edges.push(...s), t._rebuildEdgeMap();
      const a = t._computeEndpointGrouping();
      a.size > 0 && t._markEdgesDirtyById(a), t._emit("edges-change", { type: "add", edges: s, origin: n?.source ?? "api" });
      const r = t._container ? Fe.get(t._container) : void 0;
      if (r?.bridge)
        for (const l of s)
          r.bridge.pushLocalEdgeAdd(l);
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
      const i = t.edges.filter((r) => o.has(r.id));
      t.edges = t.edges.filter((r) => !o.has(r.id)), t._rebuildEdgeMap();
      for (const r of o)
        t.selectedEdges.delete(r), t._edgeDirtyTicks?.delete(r), t._edgeCorridors?.delete(r);
      const s = t._computeEndpointGrouping();
      s.size > 0 && t._markEdgesDirtyById(s), i.length && t._emit("edges-change", { type: "remove", edges: i, origin: n?.source ?? "api" });
      const a = t._container ? Fe.get(t._container) : void 0;
      if (a?.bridge)
        for (const r of o)
          a.bridge.pushLocalEdgeRemove(r);
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
function Ng(t) {
  return {
    // ── Coordinate Transforms ─────────────────────────────────────────────
    /**
     * Convert screen coordinates (e.g. from a pointer event) to flow
     * coordinates, accounting for the current viewport pan and zoom.
     */
    screenToFlowPosition(e, n) {
      if (!t._container) return { x: e, y: n };
      const o = t._container.getBoundingClientRect();
      return la(e, n, t._viewportLive ?? t.viewport, o);
    },
    /**
     * Convert flow coordinates to screen coordinates, accounting for the
     * current viewport pan and zoom.
     */
    flowToScreenPosition(e, n) {
      if (!t._container) return { x: e, y: n };
      const o = t._container.getBoundingClientRect();
      return kf(e, n, t._viewportLive ?? t.viewport, o);
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
        const i = t.nodes.filter((a) => !a.hidden), s = Gt(wo(i, t._nodeMap, t._config.nodeOrigin), t._config.nodeOrigin);
        return this.fitBounds(s, e), t._announcer?.handleEvent("fit-view", {}), !0;
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
      const o = t._container ? { width: t._container.clientWidth, height: t._container.clientHeight } : { width: 800, height: 600 }, i = co(
        e,
        o.width,
        o.height,
        t._config.minZoom ?? 0.5,
        t._config.maxZoom ?? 2,
        n?.padding ?? Qn
      );
      B("viewport", "fitBounds", { rect: e, viewport: i });
      const s = n?.duration ?? 0;
      s > 0 ? t.animate?.(
        { viewport: { pan: { x: i.x, y: i.y }, zoom: i.zoom } },
        { duration: s }
      ) : t._panZoom?.setViewport(i);
    },
    /**
     * Get the bounding rectangle of the specified nodes (or all visible
     * nodes if no IDs are provided).
     */
    getNodesBounds(e) {
      let n;
      return e ? n = e.map((o) => t.getNode(o)).filter((o) => !!o) : n = t.nodes.filter((o) => !o.hidden), Gt(wo(n, t._nodeMap, t._config.nodeOrigin), t._config.nodeOrigin);
    },
    /**
     * The viewport that frames the whole graph right now, or null when there is no
     * honest answer.
     *
     * For callers that cannot wait: `fitView()` defers through `_whenMeasured()` until
     * every node has been laid out, and a double-click has to answer within the
     * gesture. So this asks the same question and, where `fitView()` would wait, says
     * null instead and leaves the fallback to the caller.
     *
     * Null on two counts. Nothing visible to frame — and nothing MEASURED to frame it
     * by: an unmeasured node still has bounds, because `getNodesBounds` fills in the
     * 150×50 default, so framing it would frame a row of placeholder boxes at the
     * positions they were declared with rather than the graph anybody can see.
     */
    _fitViewport() {
      const e = t.nodes.filter((o) => !o.hidden);
      if (e.length === 0 || e.some((o) => !o.dimensions))
        return null;
      const n = this.getNodesBounds();
      return n.width <= 0 && n.height <= 0 ? null : this.getViewportForBounds(n, Qn);
    },
    /**
     * Compute the viewport (pan + zoom) that frames the given bounds
     * within the container, respecting min/max zoom and padding.
     */
    getViewportForBounds(e, n) {
      const o = t._container;
      return o ? co(
        e,
        o.clientWidth,
        o.clientHeight,
        t._config.minZoom ?? 0.5,
        t._config.maxZoom ?? 2,
        n ?? Qn
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
      const n = t._viewportLive ?? t.viewport, o = t._config.maxZoom ?? 2, i = Math.min(n.zoom * ps, o);
      B("viewport", "zoomIn", { from: n.zoom, to: i }), t._panZoom?.setViewport({ ...n, zoom: i }, e);
    },
    /**
     * Zoom out by `ZOOM_STEP_FACTOR`, clamped to `minZoom`.
     */
    zoomOut(e) {
      const n = t._viewportLive ?? t.viewport, o = t._config.minZoom ?? 0.5, i = Math.max(n.zoom / ps, o);
      B("viewport", "zoomOut", { from: n.zoom, to: i }), t._panZoom?.setViewport({ ...n, zoom: i }, e);
    },
    /**
     * Center the viewport on flow coordinate `(x, y)` at the given zoom
     * level (defaults to the current zoom).
     */
    setCenter(e, n, o, i) {
      const s = t._container;
      if (!s) return;
      const a = o ?? (t._viewportLive ?? t.viewport).zoom, r = s.clientWidth / 2 - e * a, l = s.clientHeight / 2 - n * a;
      B("viewport", "setCenter", { x: e, y: n, zoom: a }), t._panZoom?.setViewport({ x: r, y: l, zoom: a }, i);
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
let kt = null;
const Ag = 20;
function mi(t) {
  return JSON.parse(JSON.stringify(t));
}
function Ws(t) {
  return `${t}-copy-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
}
function Wa(t, e) {
  const n = t.filter((s) => s.selected), o = new Set(n.map((s) => s.id)), i = e.filter(
    (s) => s.selected || o.has(s.source) && o.has(s.target)
  );
  return kt = {
    nodes: mi(n),
    edges: mi(i),
    pasteCount: 0
  }, { nodeCount: n.length, edgeCount: i.length };
}
function Tg() {
  if (!kt || kt.nodes.length === 0) return null;
  kt.pasteCount++;
  const t = kt.pasteCount * Ag, e = /* @__PURE__ */ new Map(), n = kt.nodes.map((i) => {
    const s = Ws(i.id);
    return e.set(i.id, s), {
      ...i,
      id: s,
      data: mi(i.data),
      position: { x: i.position.x + t, y: i.position.y + t },
      selected: !0
    };
  }), o = kt.edges.map((i) => ({
    ...i,
    id: Ws(i.id),
    source: e.get(i.source),
    target: e.get(i.target),
    selected: !0
  }));
  return { nodes: n, edges: o };
}
function Ig(t, e) {
  const n = Wa(t, e);
  return { nodeIds: t.filter((i) => i.selected).map((i) => i.id), ...n };
}
function $g(t) {
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
        return c ? yh(c) : !1;
      }), n = [...t.selectedEdges].filter((l) => t.getEdge(l)?.deletable !== !1);
      let o = e.map((l) => t.getNode(l)).filter(Boolean);
      const i = new Set(e), s = t.edges.filter(
        (l) => i.has(l.source) || i.has(l.target)
      ), a = /* @__PURE__ */ new Map();
      for (const l of s) a.set(l.id, l);
      for (const l of n) {
        const c = t.getEdge(l);
        c && a.set(c.id, c);
      }
      const r = [...a.values()];
      if (o = o.filter((l) => {
        if (!l.parentId || o.some((h) => h.id === l.parentId)) return !0;
        const c = t._getChildValidation(l.parentId);
        if (!c) return !0;
        const d = t.getNode(l.parentId);
        if (!d) return !0;
        const f = t.nodes.filter(
          (h) => h.parentId === l.parentId
        ), u = _o(d, l, f, c);
        return !u.valid && t._config.onChildValidationFail && t._config.onChildValidationFail({
          parent: d,
          child: l,
          operation: "remove",
          rule: u.rule,
          message: u.message
        }), u.valid;
      }), !(o.length === 0 && r.length === 0)) {
        if (t._config?.onBeforeDelete) {
          const l = await t._config.onBeforeDelete({
            nodes: o,
            edges: r
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
      const e = Wa(t.nodes, t.edges);
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
      const e = Tg();
      if (e) {
        t._captureHistory(), t.deselectAll(), t.nodes.push(...e.nodes), t.nodes = Tt(t.nodes), t._rebuildNodeMap(), t.edges.push(...e.edges), t._rebuildEdgeMap();
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
      const e = Ig(t.nodes, t.edges);
      e.nodeCount !== 0 && (await t._deleteSelected(), t._emit("cut", { nodeCount: e.nodeCount, edgeCount: e.edgeCount }), B("clipboard", `Cut ${e.nodeCount} node(s)`));
    }
  };
}
function Dg(t, e) {
  return t === e ? !0 : t === void 0 || e === void 0 ? t === e : JSON.stringify(t) === JSON.stringify(e);
}
function vo(t, e, n = {}) {
  const o = n.deleteMissing ?? !0, i = new Map(t.map((a) => [a.id, a])), s = [];
  for (const a of e) {
    const r = i.get(a.id);
    if (!r) {
      s.push(a);
      continue;
    }
    if (o)
      for (const l of Object.keys(r))
        l !== "id" && !(l in a) && delete r[l];
    for (const [l, c] of Object.entries(a))
      l === "id" || l === "__proto__" || l === "constructor" || l === "prototype" || Dg(r[l], c) || (r[l] = c);
    s.push(r);
  }
  return s;
}
function js(t, e, n) {
  const o = vo(t.nodes, Tt(e.nodes));
  t.nodes.splice(0, t.nodes.length, ...o);
  const i = vo(t.edges, e.edges);
  t.edges.splice(0, t.edges.length, ...i), t._rebuildNodeMap(), t._rebuildEdgeMap(), t.deselectAll();
  for (const s of t.nodes)
    s.selected && (s.selected = !1);
  for (const s of t.edges)
    s.selected && (s.selected = !1);
  t._emit("restore", { nodes: t.nodes, edges: t.edges, origin: n }), requestAnimationFrame(() => {
    t._layoutAnimTick++, t._commitNodeGeometry?.();
  }), B("history", `${n} applied`, { nodes: e.nodes.length, edges: e.edges.length });
}
function Rg(t) {
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
        const n = Tt(
          JSON.parse(JSON.stringify(e.nodes))
        ), o = vo(t.nodes, n);
        t.nodes.splice(0, t.nodes.length, ...o);
      }
      if (e.edges) {
        const n = JSON.parse(JSON.stringify(e.edges)), o = vo(t.edges, n);
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
      e && js(t, e, "undo");
    },
    /**
     * Redo the last undone change by popping a snapshot from the
     * history future stack. Merges into existing objects and rebuilds maps.
     */
    redo() {
      if (!t._history) return;
      const e = t._history.redo({ nodes: t.nodes, edges: t.edges });
      e && js(t, e, "redo");
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
function Hg(t, e) {
  return t * (1 - e);
}
function Fg(t, e) {
  return t * e;
}
function Og(t, e) {
  return e === "in" ? t : 1 - t;
}
function zg(t, e, n) {
  const o = t.getTotalLength();
  t.style.strokeDasharray = String(o);
  const i = n === "in" ? Hg(o, e) : Fg(o, e);
  t.style.strokeDashoffset = String(i), (n === "in" && e < 1 || n === "out") && (t.style.setProperty("marker-start", "none"), t.style.setProperty("marker-end", "none"));
}
function Vg(t) {
  t.style.removeProperty("stroke-dasharray"), t.style.removeProperty("stroke-dashoffset"), t.style.removeProperty("marker-start"), t.style.removeProperty("marker-end");
}
function Bg(t, e, n) {
  t.style.opacity = String(Og(e, n));
}
function qg(t) {
  t.style.removeProperty("opacity");
}
const at = Math.PI * 2, un = /* @__PURE__ */ new Map(), Yg = 64;
function Oi(t) {
  if (typeof document > "u" || typeof document.createElementNS != "function")
    return null;
  const e = un.get(t);
  if (e) return e;
  const n = document.createElementNS("http://www.w3.org/2000/svg", "path");
  n.setAttribute("d", t);
  const o = n.getTotalLength(), i = (s) => {
    const a = n.getPointAtLength(s * o);
    return { x: a.x, y: a.y };
  };
  if (un.size >= Yg) {
    const s = un.keys().next().value;
    s !== void 0 && un.delete(s);
  }
  return un.set(t, i), i;
}
function Fw(t) {
  const { cx: e, cy: n, offset: o = 0, clockwise: i = !0 } = t, s = t.rx ?? t.radius ?? 100, a = t.ry ?? t.radius ?? 100, r = i ? 1 : -1;
  return (l) => ({
    x: e + s * Math.cos(at * l * r + o * at),
    y: n + a * Math.sin(at * l * r + o * at)
  });
}
function Ow(t) {
  const { startX: e, startY: n, endX: o, endY: i, amplitude: s = 30, frequency: a = 1, offset: r = 0 } = t, l = o - e, c = i - n, d = Math.sqrt(l * l + c * c), f = d > 0 ? l / d : 1, h = -(d > 0 ? c / d : 0), p = f;
  return (g) => {
    const m = e + l * g, y = n + c * g, x = s * Math.sin(at * a * g + r * at);
    return { x: m + h * x, y: y + p * x };
  };
}
function zw(t, e) {
  const n = Oi(t);
  if (!n) return null;
  const { reverse: o = !1, startAt: i = 0, endAt: s = 1 } = e ?? {}, a = s - i;
  return (r) => {
    let l = i + r * a;
    return o && (l = s - r * a), n(l);
  };
}
function Vw(t) {
  const { cx: e, cy: n, radius: o, angle: i = 60, offset: s = 0 } = t, a = i * Math.PI / 180;
  return (r) => {
    const l = a * Math.sin(at * r + s * at);
    return {
      x: e + o * Math.sin(l),
      y: n + o * Math.cos(l)
    };
  };
}
function Bw(t) {
  const { originX: e, originY: n, range: o = 20, speed: i = 1, seed: s = 0 } = t, a = 1 + s % 7 * 0.3, r = 1.3 + s % 11 * 0.2, l = 0.7 + s % 13 * 0.25, c = 1.1 + s % 17 * 0.15;
  return (d) => {
    const f = d * i * at, u = (Math.sin(a * f) + Math.sin(r * f * 1.3)) / 2, h = (Math.sin(l * f * 0.9) + Math.sin(c * f * 1.1)) / 2;
    return { x: e + u * o, y: n + h * o };
  };
}
function qw(t, e) {
  const n = e?.from ?? 0;
  return (o, i) => n + o * t;
}
let Us = !1;
function ve(t) {
  try {
    return structuredClone(t);
  } catch {
    return Us || (Us = !0, typeof console < "u" && console.warn(
      "[AlpineFlow] Cloning fell back to JSON roundtrip because structuredClone could not clone the input (likely a reactive proxy or an object with functions). Non-JSON values (functions, Symbols, Dates) will be stripped. This warning fires once per session."
    )), JSON.parse(JSON.stringify(t));
  }
}
function Xg(t) {
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
function Wg(t) {
  return {
    animated: t.animated,
    color: t.color,
    class: t.class,
    label: t.label,
    strokeWidth: t.strokeWidth
  };
}
function jg(t, e) {
  t.position.x = e.position.x, t.position.y = e.position.y, t.class = e.class, t.style = e.style, t.data = ve(e.data), t.dimensions = e.dimensions ? { ...e.dimensions } : t.dimensions, t.selected = e.selected, t.zIndex = e.zIndex;
}
class zi {
  constructor(e, n) {
    this._entries = [], this._state = "idle", this._reversed = !1, this._loopCount = -1, this._lockEnabled = !1, this._locked = !1, this._respectReducedMotion = void 0, this._listeners = /* @__PURE__ */ new Map(), this._context = {}, this._activeHandles = [], this._subTimelines = [], this._initialSnapshot = /* @__PURE__ */ new Map(), this._initialEdgeSnapshot = /* @__PURE__ */ new Map(), this._playResolve = null, this._pauseWaiters = /* @__PURE__ */ new Set(), this._canvas = e, this._engine = n ?? new fa();
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
    const o = new zi(this._canvas, this._engine);
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
    return ha(this._respectReducedMotion);
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
          for (const s of i.parallel)
            this._captureStepTargets(s);
        else
          this._captureStepTargets(i);
    }
  }
  _captureStepTargets(e) {
    if (e.nodes) {
      for (const n of e.nodes)
        if (!this._initialSnapshot.has(n)) {
          const o = this._canvas.getNode(n);
          o && this._initialSnapshot.set(n, Xg(o));
        }
    }
    if (e.edges) {
      for (const n of e.edges)
        if (!this._initialEdgeSnapshot.has(n)) {
          const o = this._canvas.getEdge(n);
          o && this._initialEdgeSnapshot.set(n, Wg(o));
        }
    }
  }
  _restoreInitialSnapshot() {
    for (const [e, n] of this._initialSnapshot) {
      const o = this._canvas.getNode(e);
      o && jg(o, n);
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
      for (let s = 0; s < n.length; s++) {
        if (this._state === "stopped" || this._state === "paused" && (await this._waitForResume(), this._state === "stopped"))
          return;
        const a = n[s];
        if (a.type === "pause") {
          await this._executePause(a);
          continue;
        }
        if (a.type === "parallel") {
          await this._executeParallel(a.configs, s);
          continue;
        }
        const r = a.config, l = typeof r == "function" ? r(this._makeContext(s)) : r;
        l.parallel ? await this._executeParallelSteps(l.parallel, s) : await this._executeStep(l, s);
      }
    };
    if (await i(), this._state !== "stopped" && o !== -1) {
      let s = 0;
      for (; this._state !== "stopped"; )
        if (o === 0) {
          this._restoreInitialSnapshot(), this._emit("loop", { iteration: s++ });
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
    const o = this._isReducedMotion(), i = o ? 0 : e.duration ?? 300, s = o ? 0 : e.delay ?? 0, a = ho(e.easing), r = this._makeContext(n, e.id);
    if (e.when && !e.when(r)) {
      if (e.else)
        return this._executeStep(e.else, n);
      this._emit("step-skipped", { index: n, id: e.id });
      return;
    }
    if (e.timeline) {
      const M = e.timeline;
      if (this._tag && !e.independent && M.setTag(this._tag), e.independent || this._subTimelines.push(M), this._emit("step", { index: n, id: e.id, timeline: M }), e.onStart?.(r), await M.play(), this._state === "stopped") return;
      if (e.onComplete?.(r), this._emit("step-complete", { timeline: M }), !e.independent) {
        const R = this._subTimelines.indexOf(M);
        R >= 0 && this._subTimelines.splice(R, 1);
      }
      return;
    }
    if (this._emit("step", { index: n, id: e.id }), e.onStart?.(r), e.await && (await this._resolveAwait(e, n), this._state === "stopped"))
      return;
    if (e.await && this._isAwaitOnlyStep(e))
      return e.onProgress?.(1, r), e.onComplete?.(r), this._emit("step-complete"), Promise.resolve();
    const { validNodeIds: l, validEdgeIds: c } = this._validateStepTargets(e, n);
    if (this._isEmptyStep(e, l, c))
      return e.onProgress?.(1, r), e.onComplete?.(r), this._emit("step-complete"), Promise.resolve();
    const d = /* @__PURE__ */ new Map(), f = /* @__PURE__ */ new Map();
    this._captureNodeFromValues(e, l, d, f);
    const u = /* @__PURE__ */ new Map(), h = /* @__PURE__ */ new Map();
    this._captureEdgeFromValues(e, c, u, h);
    const p = this._resolveFollowPath(e), g = this._createGuidePath(e), m = !!(e.viewport || e.fitView || e.panTo);
    let y = null, x = null;
    m && this._canvas.viewport && (y = { ...this._canvas.viewport }, x = this._resolveTargetViewport(e));
    const k = e.edgeTransition ?? "none", _ = e.addEdges?.map((M) => M.id) ?? [], S = e.removeEdges?.filter((M) => this._canvas.getEdge(M)).slice() ?? [], b = {
      step: e,
      ctx: r,
      duration: i,
      delay: s,
      easing: a,
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
      transition: k,
      addEdgeIds: _,
      removeEdgeIds: S
    };
    if (i === 0)
      return this._executeInstantStep(b);
    const E = this._prepareAnimatedEdges(e, k, _);
    return E && await E, p ? this._executeFollowPathStep(b) : this._executeAnimatedStep(b);
  }
  // ── Step decomposition: target validation ──────────────────────────
  /** Filter node/edge IDs to only those present on the canvas; warn in debug mode. */
  _validateStepTargets(e, n) {
    let o, i;
    if (e.nodes) {
      o = [];
      for (const s of e.nodes)
        this._canvas.getNode(s) ? o.push(s) : this._canvas.debug && console.warn(`[AlpineFlow] Animation step "${e.id ?? n}": node "${s}" not found, skipping`);
    }
    if (e.edges) {
      i = [];
      for (const s of e.edges)
        this._canvas.getEdge(s) ? i.push(s) : this._canvas.debug && console.warn(`[AlpineFlow] Animation step "${e.id ?? n}": edge "${s}" not found, skipping`);
    }
    return { validNodeIds: o, validEdgeIds: i };
  }
  // ── Step decomposition: empty-step check ───────────────────────────
  /** Return true when the step targets nodes/edges but has zero valid targets and nothing else to do. */
  _isEmptyStep(e, n, o) {
    const i = e.nodes && e.nodes.length > 0, s = e.edges && e.edges.length > 0, a = !!(e.viewport || e.fitView || e.panTo), r = !!(e.addEdges?.length || e.removeEdges?.length), l = i && (!n || n.length === 0), c = s && (!o || o.length === 0);
    return !!(l && c && !a && !r || l && !s && !a && !r || c && !i && !a && !r);
  }
  /** Check whether a step has only an await and no animation targets. */
  _isAwaitOnlyStep(e) {
    const n = e.nodes && e.nodes.length > 0, o = e.edges && e.edges.length > 0, i = !!(e.viewport || e.fitView || e.panTo), s = !!(e.addEdges?.length || e.removeEdges?.length);
    return !n && !o && !i && !s;
  }
  // ── Step decomposition: resolve awaitable ─────────────────────────
  /** Normalize and await the step's `await` field (Promise, handle, or thunk). */
  async _resolveAwait(e, n) {
    let o = e.await;
    if (o && (typeof o == "function" && (o = o()), o && typeof o == "object" && "finished" in o && !(o instanceof Promise) && (o = o.finished), o instanceof Promise))
      if (e.timeout && e.timeout > 0) {
        let i;
        const s = new Promise((r) => {
          i = setTimeout(() => r("timeout"), e.timeout);
        }), a = await Promise.race([o.then(() => "resolved"), s]);
        i !== void 0 && clearTimeout(i), a === "timeout" && this._emit("step-timeout", { index: n, id: e.id });
      } else
        await o;
  }
  // ── Step decomposition: capture from-values ────────────────────────
  /** Capture initial node dimensions and styles for interpolation. */
  _captureNodeFromValues(e, n, o, i) {
    if (n)
      for (const s of n) {
        const a = this._canvas.getNode(s);
        a && (a.dimensions && e.dimensions && o.set(s, { ...a.dimensions }), e.style && a.style && i.set(s, kn(a.style)));
      }
  }
  /** Capture initial edge strokeWidth and color for interpolation. */
  _captureEdgeFromValues(e, n, o, i) {
    if (n)
      for (const s of n) {
        const a = this._canvas.getEdge(s);
        a && (e.edgeStrokeWidth !== void 0 && a.strokeWidth !== void 0 && o.set(s, a.strokeWidth), e.edgeColor !== void 0 && a.color !== void 0 && i.set(s, a.color));
      }
  }
  // ── Step decomposition: followPath & guide path ────────────────────
  /** Resolve a followPath config to a callable PathFunction. */
  _resolveFollowPath(e) {
    if (!e.followPath) return null;
    if (typeof e.followPath == "function")
      return e.followPath;
    const n = Oi(e.followPath);
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
    const { step: n, ctx: o, delay: i, resolvedPathFn: s, validNodeIds: a, guidePathEl: r } = e;
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
    if (s && a) {
      const l = s(1);
      for (const c of a) {
        const d = this._canvas.getNode(c);
        d && (d.position.x = l.x, d.position.y = l.y);
      }
    }
    return this._applyStepFinal(n), r && n.guidePath?.autoRemove !== !1 && r.remove(), n.onProgress?.(1, o), n.onComplete?.(o), this._emit("step-complete"), Promise.resolve();
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
      delay: s,
      easing: a,
      validNodeIds: r,
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
    } = e, k = e.resolvedPathFn;
    return new Promise((_) => {
      const S = this._engine.register((b) => {
        if (this._state === "stopped")
          return _(), !0;
        const E = Math.min(b / i, 1), M = a(E);
        if (r) {
          const R = k(M);
          for (const L of r) {
            const D = this._canvas.getNode(L);
            D && (D.position.x = R.x, D.position.y = R.y);
          }
        }
        return this._interpolateFollowPathTick(
          n,
          M,
          r,
          l,
          c,
          d,
          f,
          u,
          h,
          p
        ), this._tickEdgeTransitions(g, m, y, M), n.onProgress?.(E, o), E >= 1 ? (this._cleanupEdgeTransitions(g, m, y), y.length && this._removeEdges(y), this._applyStepInstant(n), x && n.guidePath?.autoRemove !== !1 && x.remove(), n.onProgress?.(1, o), n.onComplete?.(o), this._emit("step-complete"), _(), !0) : !1;
      }, s);
      this._activeHandles.push(S);
    });
  }
  /** Per-tick interpolation for properties during followPath animation. */
  _interpolateFollowPathTick(e, n, o, i, s, a, r, l, c, d) {
    if (o && e.dimensions)
      for (const f of o) {
        const u = this._canvas.getNode(f), h = s.get(f);
        !u || !h || !u.dimensions || (e.dimensions.width !== void 0 && (u.dimensions.width = lt(h.width, e.dimensions.width, n)), e.dimensions.height !== void 0 && (u.fixedDimensions = !0, u.dimensions.height = lt(h.height, e.dimensions.height, n)));
      }
    if (o && e.style) {
      const f = kn(e.style);
      for (const u of o) {
        const h = this._canvas.getNode(u), p = a.get(u);
        h && p && (h.style = ga(p, f, n));
      }
    }
    if (i && e.edgeStrokeWidth !== void 0)
      for (const f of i) {
        const u = this._canvas.getEdge(f), h = r.get(f);
        u && (h !== void 0 ? u.strokeWidth = lt(h, e.edgeStrokeWidth, n) : u.strokeWidth = e.edgeStrokeWidth);
      }
    if (i && e.edgeColor !== void 0)
      for (const f of i) {
        const u = this._canvas.getEdge(f), h = l.get(f);
        u && (h !== void 0 && typeof h == "string" ? u.color = $i(h, e.edgeColor, n) : u.color = e.edgeColor);
      }
    if (c && d && this._canvas.viewport) {
      const f = Ff(c, d, n, {
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
      delay: s,
      validNodeIds: a,
      validEdgeIds: r,
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
        a,
        r,
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
          delay: s,
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
  _buildAnimateTargets(e, n, o, i, s) {
    const a = {};
    if (n) {
      a.nodes = {};
      for (const r of n) {
        const l = {};
        e.position && (l.position = { ...e.position }), e.dimensions && (l.dimensions = { ...e.dimensions }), e.style !== void 0 && (l.style = e.style), e.class !== void 0 && (l.class = e.class), e.data !== void 0 && (l.data = e.data), e.selected !== void 0 && (l.selected = e.selected), e.zIndex !== void 0 && (l.zIndex = e.zIndex), a.nodes[r] = l;
      }
    }
    if (o) {
      a.edges = {};
      for (const r of o) {
        const l = {};
        e.edgeColor !== void 0 && (l.color = e.edgeColor), e.edgeStrokeWidth !== void 0 && (l.strokeWidth = e.edgeStrokeWidth), e.edgeLabel !== void 0 && (l.label = e.edgeLabel), e.edgeAnimated !== void 0 && (l.animated = e.edgeAnimated), e.edgeClass !== void 0 && (l.class = e.edgeClass), a.edges[r] = l;
      }
    }
    return s && i && (a.viewport = {
      pan: { x: s.x, y: s.y },
      zoom: s.zoom
    }), a;
  }
  /** Run edge lifecycle transitions (draw/fade) via the engine when there are no other animatable targets. */
  _executeEdgeLifecycleOnly(e, n) {
    const { step: o, ctx: i, duration: s, delay: a, transition: r, addEdgeIds: l, removeEdgeIds: c, guidePathEl: d } = e, f = this._engine.register((u) => {
      if (this._state === "stopped")
        return n(), !0;
      const h = Math.min(u / s, 1);
      return this._tickEdgeTransitions(r, l, c, h), o.onProgress?.(h, i), h >= 1 ? (this._cleanupEdgeTransitions(r, l, c), c.length && this._removeEdges(c), d && o.guidePath?.autoRemove !== !1 && d.remove(), o.onProgress?.(1, i), o.onComplete?.(i), this._emit("step-complete"), n(), !0) : !1;
    }, a);
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
      const s = this._canvas.getEdgePathElement?.(i);
      s && zg(s, n, o);
    }
  }
  /** Clean up draw transition styles. */
  _cleanupEdgeDrawTransition(e) {
    for (const n of e) {
      const o = this._canvas.getEdgePathElement?.(n);
      o && Vg(o);
    }
  }
  /** Apply fade transition on each tick for added/removed edges. */
  _applyEdgeFadeTransition(e, n, o) {
    for (const i of e) {
      const s = this._canvas.getEdgeElement?.(i);
      s && Bg(s, n, o);
    }
  }
  /** Clean up fade transition styles. */
  _cleanupEdgeFadeTransition(e) {
    for (const n of e) {
      const o = this._canvas.getEdgeElement?.(n);
      o && qg(o);
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
    const o = e.nodes ? e.nodes.map((a) => this._canvas.getNode(a)).filter((a) => !!a) : this._canvas.nodes;
    if (o.length === 0) return null;
    const i = Gt(o), s = e.fitViewPadding ?? 0.1;
    return co(
      i,
      n.width,
      n.height,
      this._canvas.minZoom ?? 0.5,
      this._canvas.maxZoom ?? 2,
      s
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
    const s = n.dimensions?.width ?? we, a = n.dimensions?.height ?? be, r = n.position.x + s / 2, l = n.position.y + a / 2;
    return {
      x: i.width / 2 - r * o.zoom,
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
const ja = /* @__PURE__ */ new Map();
function nn(t, e) {
  ja.set(t, e);
}
function Ug(t) {
  return ja.get(t);
}
const Oe = "http://www.w3.org/2000/svg", Gg = {
  create(t, e) {
    const n = document.createElementNS(Oe, "circle");
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
}, Zg = {
  create(t, e) {
    const n = document.createElementNS(Oe, "g"), o = e.size ?? 6, i = e.color ?? "#8B5CF6", s = document.createElementNS(Oe, "circle");
    s.setAttribute("r", String(o * 1.5)), s.setAttribute("fill", i), s.setAttribute("opacity", "0.3"), n.appendChild(s);
    const a = document.createElementNS(Oe, "circle");
    if (a.setAttribute("r", String(o)), a.setAttribute("fill", i), n.appendChild(a), e.class)
      for (const r of e.class.split(" "))
        r && n.classList.add(r);
    return t.appendChild(n), n;
  },
  update(t, { x: e, y: n, elapsed: o }) {
    const s = 1 + 0.2 * Math.sin(o * 1e-3 * 2 * Math.PI * 2);
    t.setAttribute("transform", `translate(${e},${n}) scale(${s})`);
  },
  destroy(t) {
    t.remove();
  }
};
let Kg = 0;
const Jg = {
  create(t, e) {
    const n = document.createElementNS(Oe, "g");
    if (n.__beamLength = e.length ?? 30, n.__beamWidth = e.width ?? 4, n.__beamColor = e.color ?? "#8B5CF6", n.__beamGradient = e.gradient, n.__beamFollowThrough = e.followThrough ?? !0, n.__beamUid = `afbeam-${++Kg}`, e.class)
      for (const o of e.class.split(" "))
        o && n.classList.add(o);
    return t.appendChild(n), n;
  },
  update(t, e) {
    const n = t, o = n.__beamLength, i = n.__beamWidth, s = n.__beamColor, a = n.__beamGradient, r = n.__beamUid;
    if (e.pathEl) {
      let d = n.__pathClone, f = n.__gradient;
      if (!d) {
        let g = s;
        if (a && a.length > 0) {
          const m = document.createElementNS(Oe, "defs");
          f = document.createElementNS(Oe, "linearGradient"), f.setAttribute("id", r), f.setAttribute("gradientUnits", "userSpaceOnUse");
          for (const y of a) {
            const x = document.createElementNS(Oe, "stop");
            x.setAttribute("offset", String(y.offset)), x.setAttribute("stop-color", y.color), y.opacity !== void 0 && x.setAttribute("stop-opacity", String(y.opacity)), f.appendChild(x);
          }
          m.appendChild(f), n.appendChild(m), g = `url(#${r})`, n.__gradient = f;
        }
        d = document.createElementNS(Oe, "path"), d.setAttribute("d", e.pathEl.getAttribute("d") ?? ""), d.setAttribute("fill", "none"), d.style.stroke = g, d.style.strokeWidth = String(i), d.style.strokeLinecap = "round", d.style.fill = "none", a || (d.style.opacity = "0.85"), d.setAttribute("stroke-dasharray", `${o} ${e.pathLength}`), n.appendChild(d), n.__pathClone = d;
      }
      const h = n.__beamFollowThrough ? e.progress * (e.pathLength + o) : e.progress * e.pathLength, p = o - h;
      if (d.setAttribute("stroke-dashoffset", String(p)), f) {
        const g = Math.max(0, Math.min(e.pathLength, h)), m = Math.max(0, Math.min(e.pathLength, h - o)), y = e.pathEl.getPointAtLength(g), x = e.pathEl.getPointAtLength(m);
        f.setAttribute("x1", String(x.x)), f.setAttribute("y1", String(x.y)), f.setAttribute("x2", String(y.x)), f.setAttribute("y2", String(y.y));
      }
      return;
    }
    let l = n.__fallbackRect;
    l || (l = document.createElementNS(Oe, "rect"), l.setAttribute("width", String(o)), l.setAttribute("height", String(i)), l.setAttribute("rx", String(i / 2)), l.setAttribute("fill", s), l.setAttribute("opacity", "0.8"), n.appendChild(l), n.__fallbackRect = l);
    const c = Math.atan2(e.velocity.y, e.velocity.x) * (180 / Math.PI);
    l.setAttribute(
      "transform",
      `translate(${e.x - o / 2},${e.y - i / 2}) rotate(${c},${o / 2},${i / 2})`
    );
  },
  destroy(t) {
    t.remove();
  }
}, Qg = {
  create(t, e) {
    const n = document.createElementNS(Oe, "circle");
    if (n.setAttribute("r", String(e.size ?? 6)), n.setAttribute("fill", "none"), n.setAttribute("stroke", e.color ?? "#8B5CF6"), n.setAttribute("stroke-width", "2"), e.class)
      for (const o of e.class.split(" "))
        o && n.classList.add(o);
    return t.appendChild(n), n;
  },
  update(t, { x: e, y: n, progress: o }) {
    const s = 1 + o * 2, a = Math.max(0, 1 - o);
    t.setAttribute("cx", "0"), t.setAttribute("cy", "0"), t.setAttribute("transform", `translate(${e},${n}) scale(${s})`), t.setAttribute("opacity", String(a));
  },
  destroy(t) {
    t.remove();
  }
}, ep = {
  create(t, e) {
    const n = e.size ?? 16, o = e.href ?? "";
    let i;
    if (o.startsWith("#") ? (i = document.createElementNS(Oe, "use"), i.setAttribute("href", o), i.setAttribute("width", String(n)), i.setAttribute("height", String(n))) : (i = document.createElementNS(Oe, "image"), i.setAttribute("href", o), i.setAttribute("width", String(n)), i.setAttribute("height", String(n))), e.class)
      for (const s of e.class.split(" "))
        s && i.classList.add(s);
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
nn("circle", Gg);
nn("orb", Zg);
nn("beam", Jg);
nn("pulse", Qg);
nn("image", ep);
let Gs = !1;
function tp(t) {
  const e = t.match(/^([\d.]+)(ms|s)?$/);
  if (!e) return 2e3;
  const n = parseFloat(e[1]);
  return e[2] === "ms" ? n : n * 1e3;
}
function Zs(t, e, n) {
  if (t.speed !== void 0 && t.speed > 0)
    return t.duration !== void 0 && console.warn("[AlpineFlow] Both speed and duration provided for particle; speed takes precedence."), e / t.speed * 1e3;
  const o = t.duration ?? n;
  return typeof o == "number" ? o : tp(o);
}
function np(t) {
  function e(o, i, s = {}, a = {}) {
    const r = s.renderer ?? "circle", l = Ug(r);
    if (!l) {
      B("particle", `_fireParticleOnPath: unknown renderer "${r}"`);
      return;
    }
    r === "beam" && typeof s.onComplete == "function" && s.followThrough === void 0 && !Gs && (Gs = !0, console.warn(
      "[AlpineFlow] beam `onComplete` fires after the tail exits the path (follow-through is on by default). Pass `followThrough: false` if you want `onComplete` to fire when the head reaches the target."
    ));
    const c = t._containerStyles, d = s.size ?? a.size ?? (parseFloat(c?.getPropertyValue("--flow-edge-dot-size").trim() ?? "4") || 4), f = s.color ?? a.color ?? c?.getPropertyValue("--flow-edge-dot-fill").trim() ?? Sn, u = a.durationFallback ?? c?.getPropertyValue("--flow-edge-dot-duration").trim() ?? "2s", h = o.getTotalLength(), p = Zs(s, h, u), g = { ...s, size: d, color: f }, m = l.create(i, g), y = o.getPointAtLength(0), x = {
      x: y.x,
      y: y.y,
      progress: 0,
      velocity: { x: 0, y: 0 },
      pathLength: h,
      elapsed: 0,
      pathEl: o
    };
    l.update(m, x);
    let k;
    const _ = new Promise((R) => {
      k = R;
    }), S = () => {
      typeof s.onComplete == "function" && s.onComplete(), k();
    }, b = a.wrapOnComplete ? a.wrapOnComplete(S) : S, E = {
      element: m,
      renderer: l,
      pathEl: o,
      startElapsed: -1,
      // set on first engine tick
      ms: p,
      onComplete: b,
      currentPosition: { x: y.x, y: y.y }
    };
    return t._activeParticles.add(E), t._particleEngineHandle || (t._particleEngineHandle = fo.register((R) => t._tickParticles(R))), {
      getCurrentPosition() {
        return t._activeParticles.has(E) ? { ...E.currentPosition } : null;
      },
      stop() {
        t._activeParticles.has(E) && (E.renderer.destroy(E.element), t._activeParticles.delete(E), b());
      },
      get finished() {
        return _;
      }
    };
  }
  function n(o, i = {}) {
    const s = t.getEdgeSvgElement?.();
    if (!s) {
      B("particle", "sendParticleAlongPath: SVG layer unavailable");
      return;
    }
    const a = document.createElementNS("http://www.w3.org/2000/svg", "path");
    a.setAttribute("d", o), a.style.display = "none", s.appendChild(a);
    const r = e(a, s, i, {
      wrapOnComplete: (l) => () => {
        l(), a.remove();
      }
    });
    if (!r) {
      a.remove();
      return;
    }
    return B("particle", "sendParticleAlongPath", { path: o.slice(0, 40) }), r;
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
      for (const s of t._activeParticles) {
        s.startElapsed < 0 && (s.startElapsed = o);
        const a = (o - s.startElapsed) / s.ms;
        if (a >= 1 || !s.element.parentNode) {
          s.renderer.destroy(s.element), typeof s.onComplete == "function" && s.onComplete(), t._activeParticles.delete(s);
          continue;
        }
        let r = i.get(s.pathEl);
        r === void 0 && (r = s.pathEl.getTotalLength(), i.set(s.pathEl, r));
        const l = s.pathEl.getPointAtLength(a * r), c = {
          x: l.x,
          y: l.y,
          progress: a,
          velocity: {
            x: l.x - s.currentPosition.x,
            y: l.y - s.currentPosition.y
          },
          pathLength: r,
          elapsed: o - s.startElapsed,
          pathEl: s.pathEl
        };
        s.renderer.update(s.element, c), s.currentPosition = { x: l.x, y: l.y };
      }
      return t._activeParticles.size === 0 ? (t._particleEngineHandle = null, !0) : !1;
    },
    // ── Send particle along edge ──────────────────────────────────────────
    /**
     * Fire a particle along an edge path. The particle is an SVG element
     * that follows the edge's `<path>` element using `getPointAtLength`.
     */
    sendParticle(o, i = {}) {
      const s = t._edgeSvgElements.get(o);
      if (s && s.style.display === "none") return;
      const a = t.getEdge(o);
      if (!a) {
        B("particle", `sendParticle: edge "${o}" not found`);
        return;
      }
      const r = t.getEdgePathElement(o);
      if (!r) {
        B("particle", `sendParticle: no path element for edge "${o}"`);
        return;
      }
      if (!r.getAttribute("d")) {
        B("particle", `sendParticle: edge "${o}" path has no d attribute`);
        return;
      }
      const c = t.getEdgeElement(o);
      if (!c) return;
      const d = t._containerStyles, f = i.size ?? a.particleSize ?? (parseFloat(d?.getPropertyValue("--flow-edge-dot-size").trim() ?? "4") || 4), u = i.color ?? a.particleColor ?? d?.getPropertyValue("--flow-edge-dot-fill").trim() ?? Sn, h = a.animationDuration ?? d?.getPropertyValue("--flow-edge-dot-duration").trim() ?? "2s", p = e(r, c, i, {
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
    sendParticleBetween(o, i, s = {}) {
      const a = t.getNode(o);
      if (!a) {
        B("particle", `sendParticleBetween: source node "${o}" not found`);
        return;
      }
      const r = t.getNode(i);
      if (!r) {
        B("particle", `sendParticleBetween: target node "${i}" not found`);
        return;
      }
      const l = a.position.x + (a.dimensions?.width ?? 150) / 2, c = a.position.y + (a.dimensions?.height ?? 40) / 2, d = r.position.x + (r.dimensions?.width ?? 150) / 2, f = r.position.y + (r.dimensions?.height ?? 40) / 2, u = `M ${l} ${c} L ${d} ${f}`;
      return B("particle", `sendParticleBetween "${o}" -> "${i}"`, { path: u }), n(u, s);
    },
    // ── Burst: sequenced multi-particle emission ─────────────────────────
    /**
     * Fire multiple particles along a single edge with staggered timing.
     * An optional `variant` function customizes each particle individually.
     */
    sendParticleBurst(o, i) {
      const { count: s, stagger: a = 100, variant: r, ...l } = i, c = [], d = [];
      for (let u = 0; u < s; u++) {
        const h = r ? { ...l, ...r(u, s) } : { ...l };
        if (u === 0)
          c.push(this.sendParticle(o, h));
        else {
          const p = setTimeout(() => {
            c.push(this.sendParticle(o, h));
          }, u * a);
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
            }, s * a + 50);
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
      const { targetNodeId: s, synchronize: a = "arrival", onAllArrived: r, ...l } = i, c = [], d = [];
      if (a === "arrival") {
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
        const h = Math.max(...u.map((g) => g.length)), p = Zs(l, h, "2s");
        for (const { id: g, length: m } of u) {
          const y = m / h, x = p * y, k = p - x;
          if (k <= 0) {
            const _ = this.sendParticle(g, { ...l, duration: x });
            _ && c.push(_);
          } else {
            const _ = setTimeout(() => {
              const S = this.sendParticle(g, { ...l, duration: x });
              S && c.push(S);
            }, k);
            d.push(_);
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
            r?.(), u();
          });
        }, a === "arrival" ? 100 : 0);
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
class op {
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
const yi = 1, wi = 1 / 60;
class pn {
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
    const o = e.args.targets ?? {}, i = e.args.options ?? {}, s = i.motion, a = s ? wa(s) ?? void 0 : void 0, r = {
      handleId: n,
      type: a ? a.type : "eased",
      targets: ve(o),
      startTime: this._virtualTime,
      duration: i.duration,
      easing: i.easing,
      motion: a,
      direction: "forward",
      currentValues: {},
      _motion: a
    };
    this._initAnim(r), this._inFlight.set(n, r);
  }
  _initAnim(e) {
    const n = {}, o = {};
    if (this._collectNumericProperties(e.targets, n, o, this._state), e._from = n, e.type === "eased")
      e._easingFn = ho(e.easing);
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
    for (const [a, r] of Object.entries(e.nodes ?? {})) {
      const l = i.nodes[a];
      if (!l)
        continue;
      const c = r.position;
      c?.x !== void 0 && (n[`nodes.${a}.position.x`] = l.position?.x ?? 0, o[`nodes.${a}.position.x`] = c.x), c?.y !== void 0 && (n[`nodes.${a}.position.y`] = l.position?.y ?? 0, o[`nodes.${a}.position.y`] = c.y);
    }
    const s = e.viewport;
    s?.pan?.x !== void 0 && (n["viewport.x"] = i.viewport.x, o["viewport.x"] = s.pan.x), s?.pan?.y !== void 0 && (n["viewport.y"] = i.viewport.y, o["viewport.y"] = s.pan.y), s?.zoom !== void 0 && (n["viewport.zoom"] = i.viewport.zoom, o["viewport.zoom"] = s.zoom);
  }
  _rehydrateAnim(e) {
    if (e._motion = e.motion, e.type === "eased") {
      e._easingFn = ho(e.easing), e._from = e.fromValues ? { ...e.fromValues } : { ...e.currentValues ?? {} };
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
    const o = this._virtualTime - e.startTime, i = e.duration > 0 ? Math.min(o / e.duration, 1) : 1, s = e._easingFn(i);
    for (const a of Object.keys(e._from)) {
      const r = e._from[a], l = this._getTargetValue(a, e.targets) ?? r, c = lt(r, l, s);
      e.currentValues[a] = c, this._applyValueToState(a, c);
    }
  }
  _stepPhysics(e, n) {
    if (!e._physicsStates || !e._motion)
      return;
    const o = e._motion;
    for (const [i, s] of e._physicsStates)
      if (!s.settled) {
        switch (o.type) {
          case "spring":
            pa(s, o, n);
            break;
          case "decay":
            Di(s, o, n);
            break;
          case "inertia":
            ma(s, o, n, i);
            break;
          case "keyframes": {
            const a = o, r = a.duration ?? 5e3, l = r > 0 ? Math.min((this._virtualTime - e.startTime) / r, 1) : 1;
            ya(s, a, l, i), l >= 1 && (s.settled = !0);
            break;
          }
        }
        e.currentValues[i] = s.value, this._applyValueToState(i, s.value);
      }
  }
  _getTargetValue(e, n) {
    const o = e.split(".");
    if (o[0] === "nodes" && o.length >= 4) {
      const i = o[1], s = n.nodes?.[i];
      if (!s)
        return;
      if (o[2] === "position" && o[3] === "x")
        return s.position?.x;
      if (o[2] === "position" && o[3] === "y")
        return s.position?.y;
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
      const i = o[1], s = this._state.nodes[i];
      if (!s)
        return;
      s.position || (s.position = { x: 0, y: 0 }), o[2] === "position" && (o[3] === "x" && (s.position.x = n), o[3] === "y" && (s.position.y = n));
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
const Ua = /* @__PURE__ */ new Map();
function Vi(t, e) {
  Ua.set(t, e);
}
function ip(t) {
  return Ua.get(t);
}
function Bi(t, e = 20) {
  const n = Object.values(t);
  if (n.length === 0)
    return null;
  let o = 1 / 0, i = 1 / 0, s = -1 / 0, a = -1 / 0;
  for (const r of n) {
    const l = r.position?.x ?? 0, c = r.position?.y ?? 0, d = r.dimensions?.width ?? 150, f = r.dimensions?.height ?? 40;
    o = Math.min(o, l), i = Math.min(i, c), s = Math.max(s, l + d), a = Math.max(a, c + f);
  }
  return o -= e, i -= e, s += e, a += e, { minX: o, minY: i, vbWidth: s - o, vbHeight: a - i };
}
function Ga(t) {
  let e = "";
  for (const n of Object.values(t.edges)) {
    const o = t.nodes[n.source], i = t.nodes[n.target];
    if (!o || !i)
      continue;
    const s = (o.position?.x ?? 0) + (o.dimensions?.width ?? 150) / 2, a = (o.position?.y ?? 0) + (o.dimensions?.height ?? 40) / 2, r = (i.position?.x ?? 0) + (i.dimensions?.width ?? 150) / 2, l = (i.position?.y ?? 0) + (i.dimensions?.height ?? 40) / 2;
    e += `<line x1="${s}" y1="${a}" x2="${r}" y2="${l}" stroke="currentColor" stroke-width="1" opacity="0.5"/>`;
  }
  return e;
}
const sp = {
  render(t, { width: e, height: n }) {
    const o = Object.values(t.nodes);
    if (o.length === 0)
      return `<svg width="${e}" height="${n}" xmlns="http://www.w3.org/2000/svg"></svg>`;
    const i = Bi(t.nodes);
    if (!i)
      return `<svg width="${e}" height="${n}" xmlns="http://www.w3.org/2000/svg"></svg>`;
    const { minX: s, minY: a, vbWidth: r, vbHeight: l } = i;
    let c = `<svg width="${e}" height="${n}" viewBox="${s} ${a} ${r} ${l}" xmlns="http://www.w3.org/2000/svg">`;
    c += Ga(t);
    for (const d of o) {
      const f = d.position?.x ?? 0, u = d.position?.y ?? 0, h = d.dimensions?.width ?? 150, p = d.dimensions?.height ?? 40;
      c += `<rect x="${f}" y="${u}" width="${h}" height="${p}" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1" rx="4"/>`;
    }
    return c += "</svg>", c;
  }
}, rp = {
  render(t, { width: e, height: n }) {
    const o = Object.values(t.nodes);
    if (o.length === 0)
      return `<svg width="${e}" height="${n}" xmlns="http://www.w3.org/2000/svg"></svg>`;
    const i = Bi(t.nodes);
    if (!i)
      return `<svg width="${e}" height="${n}" xmlns="http://www.w3.org/2000/svg"></svg>`;
    const { minX: s, minY: a, vbWidth: r, vbHeight: l } = i;
    let c = `<svg width="${e}" height="${n}" viewBox="${s} ${a} ${r} ${l}" xmlns="http://www.w3.org/2000/svg">`;
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
}, ap = {
  render(t, { width: e, height: n, inFlight: o }) {
    const i = Object.values(t.nodes);
    if (i.length === 0)
      return `<svg width="${e}" height="${n}" xmlns="http://www.w3.org/2000/svg"></svg>`;
    const s = Bi(t.nodes);
    if (!s)
      return `<svg width="${e}" height="${n}" xmlns="http://www.w3.org/2000/svg"></svg>`;
    const a = /* @__PURE__ */ new Set();
    if (o) {
      for (const u of o)
        if (u.targets?.nodes)
          for (const h of Object.keys(u.targets.nodes))
            a.add(h);
    }
    const { minX: r, minY: l, vbWidth: c, vbHeight: d } = s;
    let f = `<svg width="${e}" height="${n}" viewBox="${r} ${l} ${c} ${d}" xmlns="http://www.w3.org/2000/svg">`;
    f += Ga(t);
    for (const u of i) {
      const h = u.position?.x ?? 0, p = u.position?.y ?? 0, g = u.dimensions?.width ?? 150, m = u.dimensions?.height ?? 40;
      a.has(u.id ?? "") ? f += `<rect x="${h}" y="${p}" width="${g}" height="${m}" fill="currentColor" fill-opacity="0.8" stroke="currentColor" stroke-width="2" rx="4"/>` : f += `<rect x="${h}" y="${p}" width="${g}" height="${m}" fill="currentColor" fill-opacity="0.1" stroke="currentColor" stroke-width="1" rx="4" opacity="0.3"/>`;
    }
    return f += "</svg>", f;
  }
};
Vi("faithful", sp);
Vi("outline", rp);
Vi("activity", ap);
function _i(t, e) {
  let n = 0, o = t.length;
  for (; n < o; ) {
    const i = n + o >>> 1;
    t[i].t > e ? o = i : n = i + 1;
  }
  return n;
}
function vi(t, e) {
  let n = 0, o = t.length;
  for (; n < o; ) {
    const i = n + o >>> 1;
    t[i].t >= e ? o = i : n = i + 1;
  }
  return n;
}
function lp(t, e) {
  return e.split(".").reduce((n, o) => n?.[o], t);
}
function Za(t) {
  if (t !== null && typeof t == "object") {
    Object.freeze(t);
    for (const e of Object.keys(t))
      Za(t[e]);
  }
  return t;
}
class qi {
  constructor(e) {
    this.version = e.version, this.duration = e.duration, this.initialState = Za(ve(e.initialState)), this.events = Object.freeze(ve(e.events)), this.checkpoints = Object.freeze(ve(e.checkpoints)), this.metadata = Object.freeze({ ...e.metadata ?? {} }), Object.freeze(this);
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
    if (e.version > yi)
      throw new Error(
        `[AlpineFlow] Recording version ${e.version} is newer than supported (${yi}). Please update AlpineFlow to replay this recording.`
      );
    return new qi(e);
  }
  /**
   * Returns unique subjects (nodes, edges, timelines, particles) that appeared
   * during the recording, with their first-seen and last-seen timestamps.
   */
  getSubjects() {
    const e = /* @__PURE__ */ new Map(), n = (o, i, s) => {
      const a = `${o}:${i}`, r = e.get(a);
      r ? (s < r.firstSeenT && (r.firstSeenT = s), s > r.lastSeenT && (r.lastSeenT = s)) : e.set(a, { kind: o, id: i, firstSeenT: s, lastSeenT: s });
    };
    for (const o of Object.keys(this.initialState.nodes))
      n("node", o, 0);
    for (const o of Object.keys(this.initialState.edges))
      n("edge", o, 0);
    for (const o of this.events) {
      const { t: i, type: s, args: a } = o;
      switch (s) {
        case "animate":
        case "update":
          for (const r of Object.keys(a.targets?.nodes ?? {}))
            n("node", r, i);
          for (const r of Object.keys(a.targets?.edges ?? {}))
            n("edge", r, i);
          break;
        case "particle":
        case "particle-burst":
          a.edgeId && n("edge", a.edgeId, i);
          break;
        case "particle-between":
          a.source && n("node", a.source, i), a.target && n("node", a.target, i);
          break;
        case "converging":
          if (Array.isArray(a.sources))
            for (const r of a.sources)
              n("edge", r, i);
          a.options?.targetNodeId && n("node", a.options.targetNodeId, i);
          break;
        case "node-add":
        case "node-remove":
          if (a.id && n("node", a.id, i), Array.isArray(a.nodes))
            for (const r of a.nodes)
              r.id && n("node", r.id, i);
          break;
        case "edge-add":
        case "edge-remove":
          if (a.id && n("edge", a.id, i), Array.isArray(a.edges))
            for (const r of a.edges)
              r.id && n("edge", r.id, i);
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
      const { t: i, type: s, args: a } = o;
      if ((() => {
        switch (s) {
          case "animate":
          case "update":
            return e in (a.targets?.nodes ?? {}) || e in (a.targets?.edges ?? {});
          case "particle":
          case "particle-burst":
            return a.edgeId === e;
          case "particle-between":
            return a.source === e || a.target === e;
          case "converging":
            return Array.isArray(a.sources) && a.sources.includes(e) || a.options?.targetNodeId === e;
          case "node-add":
          case "node-remove":
            return !!(a.id === e || Array.isArray(a.nodes) && a.nodes.some((l) => l.id === e));
          case "edge-add":
          case "edge-remove":
            return !!(a.id === e || Array.isArray(a.edges) && a.edges.some((l) => l.id === e));
          default:
            return !1;
        }
      })())
        switch (s) {
          case "animate": {
            const l = a.options?.duration ?? 0;
            n.push({ startT: i, endT: i + l, reason: "animate" });
            break;
          }
          case "particle":
          case "particle-burst":
          case "particle-between": {
            const l = a.options?.duration ?? a.duration ?? 1;
            n.push({ startT: i, endT: i + l, reason: s });
            break;
          }
          case "converging": {
            const l = a.options?.duration ?? 1;
            n.push({ startT: i, endT: i + l, reason: "converging" });
            break;
          }
          default:
            n.push({ startT: i, endT: i + 1, reason: s });
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
      const i = lp(o.canvas, e);
      i !== void 0 && n.push({ t: o.t, v: i });
    }
    return n;
  }
  /**
   * Returns the canvas state at virtual time `t` by running the VirtualEngine
   * up to that point from the nearest prior checkpoint.
   */
  getStateAt(e) {
    const n = new pn(this.initialState);
    let o = null;
    for (const c of this.checkpoints)
      c.t <= e && (!o || c.t > o.t) && (o = c);
    o && n.restoreCheckpoint(o);
    const i = o?.t ?? 0, s = this.events;
    let a = i;
    const r = wi * 1e3;
    let l = o ? _i(s, i) : vi(s, i);
    for (; a < e; ) {
      const c = Math.min(a + r, e);
      for (; l < s.length && s[l].t <= c; )
        n.applyEvent(s[l]), l++;
      const d = (c - a) / 1e3;
      n.advance(d), a = c;
    }
    return n.getState();
  }
  /**
   * Renders a thumbnail SVG snapshot of the canvas state at virtual time `t`.
   */
  renderThumbnailAt(e, n) {
    const o = this.getStateAt(e), i = n.renderer ?? "faithful", s = ip(i);
    if (!s)
      throw new Error(`[AlpineFlow] Unknown thumbnail renderer "${i}"`);
    return s.render(o, { width: n.width, height: n.height });
  }
}
class cp {
  constructor(e, n = {}) {
    this._events = [], this._checkpoints = [], this._startTime = 0, this._originalMethods = {}, this._checkpointTimer = null, this._eventCounter = 0, this._activeAnims = /* @__PURE__ */ new Map(), this._canvas = e, this._checkpointInterval = n.checkpointInterval ?? 500, this._maxDuration = n.maxDuration ?? 6e4;
  }
  async record(e, n) {
    this._startTime = performance.now();
    const o = this._captureSnapshot();
    this._installHooks(), this._scheduleCheckpoints();
    try {
      const s = e();
      if (s instanceof Promise && await s, this._virtualNow() > this._maxDuration)
        throw new Error(`[AlpineFlow] Recording exceeded maxDuration (${this._maxDuration}ms)`);
    } finally {
      this._uninstallHooks(), this._checkpointTimer !== null && (clearInterval(this._checkpointTimer), this._checkpointTimer = null);
    }
    this._captureCheckpoint(), this._activeAnims.clear();
    const i = {
      version: yi,
      duration: this._virtualNow(),
      initialState: o,
      events: this._events,
      checkpoints: this._checkpoints,
      metadata: n
    };
    return new qi(i);
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
    for (const a of this._canvas.nodes ?? [])
      a && typeof a == "object" && "id" in a && i.set(a.id, a);
    for (const [a, r] of Object.entries(o)) {
      const l = i.get(a);
      if (!l) continue;
      const c = r.position;
      c?.x !== void 0 && (n[`nodes.${a}.position.x`] = l.position?.x ?? 0), c?.y !== void 0 && (n[`nodes.${a}.position.y`] = l.position?.y ?? 0);
    }
    const s = e?.viewport;
    return s?.pan?.x !== void 0 && (n["viewport.x"] = this._canvas.viewport.x), s?.pan?.y !== void 0 && (n["viewport.y"] = this._canvas.viewport.y), s?.zoom !== void 0 && (n["viewport.zoom"] = this._canvas.viewport.zoom), n;
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
      let s = "eased";
      if (i) {
        const l = o.motion;
        typeof l == "string" ? s = l.split(".")[0] : l && typeof l == "object" && l.type && (s = l.type);
      }
      let a = {};
      const r = n.handle?.currentValue;
      r && typeof r.forEach == "function" && r.forEach((l, c) => {
        a[c] = l;
      }), e.push({
        handleId: n.handleId,
        type: s,
        targets: ve(n.targets),
        startTime: n.eventT,
        duration: i ? void 0 : o.duration ?? 300,
        easing: i ? void 0 : o.easing,
        motion: i ? ve(o.motion) : void 0,
        direction: n.handle?.direction ?? "forward",
        currentValues: a,
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
    const e = (o, i, s) => {
      const a = this._canvas[o];
      typeof a == "function" && (this._originalMethods[o] = a, this._canvas[o] = (...r) => {
        const l = s ? s(...r) : { args: r };
        return this._recordEvent(i, l), a.apply(this._canvas, r);
      });
    }, n = (o, i) => {
      const s = this._canvas[o];
      typeof s == "function" && (this._originalMethods[o] = s, this._canvas[o] = (a, r) => {
        const l = `rec-${++this._eventCounter}`, c = this._virtualNow(), d = this._snapshotFromValues(a);
        this._recordEvent(i, { targets: a, options: r, handleId: l });
        const f = s.apply(this._canvas, [a, r]);
        if (f && typeof f == "object" && f.finished && !f.isFinished) {
          const u = { handleId: l, eventT: c, targets: a, options: r, handle: f, fromValues: d };
          this._activeAnims.set(l, u), f.finished.then(() => {
            this._activeAnims.delete(l);
          }).catch(() => {
            this._activeAnims.delete(l);
          });
        }
        return f;
      });
    };
    n("animate", "animate"), n("update", "update"), e("sendParticle", "particle", (o, i) => ({ edgeId: o, options: i })), e("sendParticleAlongPath", "particle-along-path", (o, i) => ({ path: o, options: i })), e("sendParticleBetween", "particle-between", (o, i, s) => ({ source: o, target: i, options: s })), e("sendParticleBurst", "particle-burst", (o, i) => ({ edgeId: o, options: i })), e("sendConverging", "converging", (o, i) => ({ sources: o, options: i })), e("addNodes", "node-add", (o) => ({ nodes: o })), e("removeNodes", "node-remove", (o) => ({ ids: o })), e("addEdges", "edge-add", (o) => ({ edges: o })), e("removeEdges", "edge-remove", (o) => ({ ids: o }));
  }
  _uninstallHooks() {
    for (const [e, n] of Object.entries(this._originalMethods))
      this._canvas[e] = n;
    this._originalMethods = {};
  }
}
class dp {
  constructor(e, n, o = {}) {
    this._currentTime = 0, this._state = "idle", this._direction = "forward", this._speed = 1, this._rafHandle = null, this._lastWallTime = 0, this._resolveFinished = () => {
    }, this.recording = n, this._canvas = e, this._virtualEngine = new pn(n.initialState), this._speed = o.speed ?? 1, this._direction = this._speed < 0 ? "backward" : "forward", this._from = o.from ?? 0, this._to = o.to ?? n.duration, this._loop = o.loop ?? !1, this._currentTime = this._from, this._from > 0 && this._seekEngineTo(this._from), o.skipInitialState || this._applyStateToCanvas(this._virtualEngine.getState()), this.finished = new Promise((i) => {
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
    this._state !== "playing" && (this._state === "ended" && (this._currentTime = this._from, this._seekEngineTo(this._from), this._applyStateToCanvas(this._virtualEngine.getState())), this._state = "playing", this._lastWallTime = Xo(), this._scheduleTick());
  }
  pause() {
    this._state === "playing" && (this._state = "paused", this._cancelTick());
  }
  stop() {
    this._cancelTick(), this._currentTime = this._from, this._virtualEngine = new pn(this.recording.initialState), this._applyStateToCanvas(this._virtualEngine.getState()), this._state = "idle";
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
    const n = this._findNearestCheckpoint(e), o = new pn(this.recording.initialState);
    n && o.restoreCheckpoint(n);
    const i = n?.t ?? 0, s = this.recording.events;
    let a = i;
    const r = wi * 1e3;
    let l = n ? _i(s, i) : vi(s, i);
    for (; a < e; ) {
      const c = Math.min(a + r, e);
      for (; l < s.length && s[l].t <= c; )
        o.applyEvent(s[l]), l++;
      const d = (c - a) / 1e3;
      d > 0 && o.advance(d), a = c;
    }
    return o.getState();
  }
  // ── Private ─────────────────────────────────────────────────────────────
  _tick() {
    if (this._state !== "playing")
      return;
    const e = Xo(), n = (e - this._lastWallTime) / 1e3;
    this._lastWallTime = e;
    const o = n * this._speed * 1e3, i = this._currentTime + o;
    if (this._direction === "forward" ? i >= this._to : i <= this._from) {
      const a = this._direction === "forward" ? this._to : this._from;
      this._direction === "forward" ? this._walkTo(this._currentTime, a, !0) : this._seekEngineTo(a), this._currentTime = a, this._applyStateToCanvas(this._virtualEngine.getState()), this._handleEnd();
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
    n ? this._virtualEngine.restoreCheckpoint(n) : this._virtualEngine = new pn(this.recording.initialState), this._walkTo(n?.t ?? 0, e);
  }
  _walkTo(e, n, o = !1) {
    if (n <= e)
      return;
    const i = this.recording.events;
    let s = e;
    const a = wi * 1e3;
    let r = e === 0 ? vi(i, 0) : _i(i, e);
    for (; s < n; ) {
      const l = Math.min(s + a, n);
      for (; r < i.length && i[r].t <= l; ) {
        const d = i[r];
        this._virtualEngine.applyEvent(d), o && this._dispatchLiveParticle(d), r++;
      }
      const c = (l - s) / 1e3;
      c > 0 && this._virtualEngine.advance(c), s = l;
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
      const s = parseFloat(e) / 100;
      return this._from + s * (this._to - this._from);
    }
    const i = parseFloat(e);
    return Number.isNaN(i) ? this._from : Math.max(n, Math.min(o, i));
  }
  _handleEnd() {
    if (this._loop) {
      const e = typeof this._loop == "number" ? this._loop - 1 : 1 / 0;
      if (e > 0) {
        this._loop = typeof this._loop == "number" ? e : !0, this._currentTime = this._from, this._seekEngineTo(this._from), this._applyStateToCanvas(this._virtualEngine.getState()), this._state = "playing", this._lastWallTime = Xo(), this._scheduleTick();
        return;
      }
    }
    this._state = "ended", this._rafHandle = null, this._resolveFinished();
  }
  _applyStateToCanvas(e) {
    this._reconcileNodes(e), this._reconcileEdges(e);
    for (const [n, o] of Object.entries(e.nodes)) {
      const i = this._canvas.nodes.find((s) => s.id === n);
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
    const n = new Set(Object.keys(e.nodes)), o = new Set(this._canvas.nodes.map((a) => a?.id).filter(Boolean)), i = [];
    for (const a of n)
      o.has(a) || i.push(e.nodes[a]);
    const s = [];
    for (const a of o)
      n.has(a) || s.push(a);
    if (i.length > 0 && (typeof this._canvas.addNodes == "function" ? this._canvas.addNodes(i) : this._canvas.nodes.push(...i)), s.length > 0)
      if (typeof this._canvas.removeNodes == "function")
        this._canvas.removeNodes(s);
      else
        for (const a of s) {
          const r = this._canvas.nodes.findIndex((l) => l?.id === a);
          r !== -1 && this._canvas.nodes.splice(r, 1);
        }
  }
  _reconcileEdges(e) {
    const n = new Set(Object.keys(e.edges)), o = new Set(this._canvas.edges.map((a) => a?.id).filter(Boolean)), i = [];
    for (const a of n)
      o.has(a) || i.push(e.edges[a]);
    const s = [];
    for (const a of o)
      n.has(a) || s.push(a);
    if (i.length > 0 && (typeof this._canvas.addEdges == "function" ? this._canvas.addEdges(i) : this._canvas.edges.push(...i)), s.length > 0)
      if (typeof this._canvas.removeEdges == "function")
        this._canvas.removeEdges(s);
      else
        for (const a of s) {
          const r = this._canvas.edges.findIndex((l) => l?.id === a);
          r !== -1 && this._canvas.edges.splice(r, 1);
        }
  }
}
function Xo() {
  return typeof performance < "u" && typeof performance.now == "function" ? performance.now() : Date.now();
}
function jn(t, e, n) {
  const o = e[n];
  e[n] = void 0, t[n] = o;
}
function up(t) {
  const e = np(t);
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
      const n = new zi(t, fo);
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
      for (const s of o)
        s.parallel ? i.parallel(s.parallel) : i.step(s);
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
      const i = o.duration ?? 0, s = [], a = /* @__PURE__ */ new Set(), r = /* @__PURE__ */ new Set(), l = /* @__PURE__ */ new Set(), c = (p) => {
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
            let k = null;
            typeof g.followPath == "function" ? k = g.followPath : k = Oi(g.followPath);
            let _ = null;
            if (g.guidePath?.visible && typeof g.followPath == "string" && typeof document < "u") {
              const S = t.getEdgeSvgElement?.();
              S && (_ = document.createElementNS("http://www.w3.org/2000/svg", "path"), _.setAttribute("d", g.followPath), _.classList.add("flow-guide-path"), g.guidePath.class && _.classList.add(g.guidePath.class), S.appendChild(_));
            }
            if (k) {
              const S = k, b = _, E = g.guidePath?.autoRemove !== !1;
              s.push({
                key: `node:${p}:followPath`,
                from: 0,
                to: 1,
                apply: (M) => {
                  const R = t._nodeMap.get(p);
                  if (!R) return;
                  const L = S(M);
                  ke().raw(R).position.x = L.x, ke().raw(R).position.y = L.y, a.add(p), M >= 1 && b && E && b.remove();
                }
              });
            }
          } else if (g.position) {
            const _ = ke().raw(m).position;
            if (g.position.x !== void 0) {
              const S = g.position.x;
              if (x)
                _.x = S;
              else {
                const b = _.x;
                s.push({
                  key: `node:${p}:position.x`,
                  from: b,
                  to: S,
                  apply: (E) => {
                    const M = t._nodeMap.get(p);
                    M && (ke().raw(M).position.x = E, a.add(p));
                  }
                });
              }
            }
            if (g.position.y !== void 0) {
              const S = g.position.y;
              if (x)
                _.y = S;
              else {
                const b = _.y;
                s.push({
                  key: `node:${p}:position.y`,
                  from: b,
                  to: S,
                  apply: (E) => {
                    const M = t._nodeMap.get(p);
                    M && (ke().raw(M).position.y = E), a.add(p);
                  }
                });
              }
            }
            x && a.add(p);
          }
          if (g.data !== void 0 && Object.assign(m.data, g.data), g.class !== void 0 && (m.class = g.class), g.selected !== void 0 && (m.selected = g.selected), g.zIndex !== void 0 && (m.zIndex = g.zIndex), g.style !== void 0)
            if (x)
              m.style = g.style, r.add(p);
            else {
              const k = kn(m.style || {}), _ = kn(g.style), S = t._nodeElements.get(p);
              if (S) {
                const b = getComputedStyle(S);
                for (const E of Object.keys(_))
                  k[E] === void 0 && (k[E] = b.getPropertyValue(E));
              }
              s.push({
                key: `node:${p}:style`,
                from: 0,
                to: 1,
                apply: (b) => {
                  const E = t._nodeMap.get(p);
                  E && (ke().raw(E).style = ga(k, _, b), r.add(p));
                }
              });
            }
          g.dimensions && m.dimensions && (g.dimensions.width !== void 0 && (x ? m.dimensions.width = g.dimensions.width : s.push({
            key: `node:${p}:dimensions.width`,
            from: m.dimensions.width,
            to: g.dimensions.width,
            apply: (k) => {
              m.dimensions.width = k;
            }
          })), g.dimensions.height !== void 0 && (m.fixedDimensions = !0, x ? m.dimensions.height = g.dimensions.height : s.push({
            key: `node:${p}:dimensions.height`,
            from: m.dimensions.height,
            to: g.dimensions.height,
            apply: (k) => {
              m.dimensions.height = k;
            }
          })));
        }
      if (n.edges)
        for (const [p, g] of Object.entries(n.edges)) {
          const m = t._edgeMap.get(p);
          if (!m) continue;
          const x = (g._duration ?? i) === 0;
          if (g.color !== void 0 && g.color !== null)
            if (typeof g.color == "object")
              m.color = g.color, l.add(p), t._restyleEdgeGradient(p, g.color) || (a.add(m.source), a.add(m.target));
            else if (x)
              m.color = g.color, l.add(p);
            else {
              const k = typeof m.color == "string" && m.color || getComputedStyle(t._container).getPropertyValue("--flow-edge-stroke").trim() || Ii;
              s.push({
                key: `edge:${p}:color`,
                from: k,
                to: g.color,
                apply: (_) => {
                  const S = t._edgeMap.get(p);
                  S && (ke().raw(S).color = _, l.add(p));
                }
              });
            }
          if (g.strokeWidth !== void 0)
            if (x)
              m.strokeWidth = g.strokeWidth, l.add(p);
            else {
              const k = m.strokeWidth ?? (parseFloat(getComputedStyle(t._container).getPropertyValue("--flow-edge-stroke-width").trim() || "1") || 1);
              s.push({
                key: `edge:${p}:strokeWidth`,
                from: k,
                to: g.strokeWidth,
                apply: (_) => {
                  const S = t._edgeMap.get(p);
                  S && (ke().raw(S).strokeWidth = _, l.add(p));
                }
              });
            }
          g.label !== void 0 && (m.label = g.label), g.animated !== void 0 && (m.animated = g.animated), g.class !== void 0 && (m.class = g.class), g.type !== void 0 && (m.type = g.type);
        }
      if (n.viewport) {
        const p = n.viewport, m = (p._duration ?? i) === 0, y = t.viewport;
        p.pan?.x !== void 0 && (m ? y.x = p.pan.x : s.push({
          key: "viewport:pan.x",
          from: y.x,
          to: p.pan.x,
          apply: (x) => {
            y.x = x;
          }
        })), p.pan?.y !== void 0 && (m ? y.y = p.pan.y : s.push({
          key: "viewport:pan.y",
          from: y.y,
          to: p.pan.y,
          apply: (x) => {
            y.y = x;
          }
        })), p.zoom !== void 0 && (m ? y.zoom = p.zoom : s.push({
          key: "viewport:zoom",
          from: y.zoom,
          to: p.zoom,
          apply: (x) => {
            y.zoom = x;
          }
        }));
      }
      if (s.length === 0) {
        a.size > 0 && (t._flushNodePositions(a), t._refreshEdgePaths(a), c(a)), r.size > 0 && t._flushNodeStyles(r), l.size > 0 && t._flushEdgeStyles(l);
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
      const h = ke().raw(t._animator).animate(s, {
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
          a.size > 0 && (t._flushNodePositions(a), t._refreshEdgePaths(a), a.clear()), r.size > 0 && (t._flushNodeStyles(r), r.clear()), l.size > 0 && (t._flushEdgeStyles(l), l.clear()), n.viewport && t._flushViewport(), o.onProgress?.(p);
        },
        onComplete() {
          if (n.nodes)
            for (const [p, g] of Object.entries(n.nodes)) {
              const m = t._nodeMap.get(p);
              if (!m) continue;
              const y = ke().raw(m);
              (g.followPath || g.position?.x !== void 0 || g.position?.y !== void 0) && jn(m, y, "position"), g.style !== void 0 && jn(m, y, "style");
            }
          if (n.edges)
            for (const [p, g] of Object.entries(n.edges)) {
              const m = t._edgeMap.get(p);
              if (!m) continue;
              const y = ke().raw(m);
              g.color !== void 0 && typeof g.color == "string" && jn(m, y, "color"), g.strokeWidth !== void 0 && jn(m, y, "strokeWidth");
            }
          a.size > 0 && (t._flushNodePositions(a), t._refreshEdgePaths(a), c(a), a.clear()), r.size > 0 && (t._flushNodeStyles(r), r.clear()), l.size > 0 && (t._flushEdgeStyles(l), l.clear()), n.viewport && t._panZoom?.setViewport({ ...t.viewport }), o.onComplete?.();
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
      const i = ha(t._config?.respectReducedMotion) ? 0 : o.duration ?? 300;
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
      const s = new Promise((d) => {
        i = d;
      });
      let a = !1;
      const r = o.zoom, l = fo.register(() => {
        if (a) return !0;
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
            return a = !0, l.stop(), t._followHandle = null, i(), !0;
        } else "x" in n && "y" in n && (d = n);
        if (!d) return !1;
        const f = t._container ? { width: t._container.clientWidth, height: t._container.clientHeight } : { width: 800, height: 600 }, u = r ?? t.viewport.zoom, h = f.width / 2 - d.x * u, p = f.height / 2 - d.y * u, g = 0.08;
        return t.viewport.x += (h - t.viewport.x) * g, t.viewport.y += (p - t.viewport.y) * g, r && (t.viewport.zoom += (r - t.viewport.zoom) * g), t._flushViewport(), !1;
      });
      return t._followHandle = l, typeof n == "object" && "_targetNodeIds" in n && n.finished && n.finished.then(() => {
        a || (a = !0, l.stop(), t._followHandle = null, i());
      }), {
        pause: () => {
        },
        resume: () => {
        },
        stop: () => {
          a = !0, l.stop(), t._followHandle = null, i();
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
          return a;
        },
        get currentValue() {
          return /* @__PURE__ */ new Map();
        },
        get finished() {
          return s;
        }
      };
    },
    // ── Registry & group helpers ─────────────────────────────────────────
    /**
     * Get all tracked animation handles, optionally filtered by tag.
     */
    getHandles(n) {
      return ke().raw(t._animator).registry.getHandles(n);
    },
    /**
     * Cancel all animations matching a tag filter.
     */
    cancelAll(n, o) {
      ke().raw(t._animator).registry.cancelAll(n, o);
    },
    /**
     * Pause all animations matching a tag filter.
     */
    pauseAll(n) {
      ke().raw(t._animator).registry.pauseAll(n);
    },
    /**
     * Resume all animations matching a tag filter.
     */
    resumeAll(n) {
      ke().raw(t._animator).registry.resumeAll(n);
    },
    /**
     * Create a named group that auto-tags all animations made through it.
     */
    group(n) {
      const o = this;
      return new op(n, {
        animate: (i, s) => o.animate(i, s),
        update: (i, s) => o.update(i, s),
        sendParticle: (i, s) => o.sendParticle(i, s),
        sendParticleAlongPath: (i, s) => o.sendParticleAlongPath(i, s),
        sendParticleBetween: (i, s, a) => o.sendParticleBetween(i, s, a),
        sendParticleBurst: (i, s) => o.sendParticleBurst(i, s),
        sendConverging: (i, s) => o.sendConverging(i, s),
        timeline: () => o.timeline(),
        getHandles: (i) => o.getHandles(i),
        cancelAll: (i, s) => o.cancelAll(i, s),
        pauseAll: (i) => o.pauseAll(i),
        resumeAll: (i) => o.resumeAll(i)
      });
    },
    /**
     * Create a transaction for grouped rollback of multiple animations.
     */
    transaction(n) {
      const o = ke().raw(t._animator), i = o.beginTransaction();
      i.onAfterRollback?.((s) => {
        const a = /* @__PURE__ */ new Set();
        for (const r of s)
          if (r.startsWith("node:")) {
            const l = r.split(":")[1];
            l && a.add(l);
          }
        a.size > 0 && (t._flushNodePositions(a), t._flushNodeStyles(a), t._refreshEdgePaths(a));
      });
      try {
        const s = n();
        s && typeof s.then == "function" ? s.then(() => o.endTransaction()).catch(() => {
          i.rollback(), o.endTransaction();
        }) : o.endTransaction();
      } catch (s) {
        throw i.rollback(), o.endTransaction(), s;
      }
      return i;
    },
    /**
     * Capture current canvas state. Call restore() to revert.
     */
    snapshot() {
      const n = structuredClone(ke().raw(t.nodes)), o = structuredClone(ke().raw(t.edges)), i = { ...t.viewport };
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
      const i = this, s = i.animate, a = i.update, r = i.sendParticle, l = i.sendParticleAlongPath, c = i.sendParticleBetween, d = i.sendParticleBurst, f = i.sendConverging, u = {
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
          i.update = a;
          try {
            return s.call(i, g, m);
          } finally {
            i.update = y;
          }
        },
        update: (g, m) => a.call(i, g, m),
        sendParticle: (g, m) => r.call(i, g, m),
        sendParticleAlongPath: (g, m) => l.call(i, g, m),
        sendParticleBetween: (g, m, y) => c.call(i, g, m, y),
        sendParticleBurst: (g, m) => d.call(i, g, m),
        sendConverging: (g, m) => f.call(i, g, m),
        addNodes: (g) => t.addNodes(g),
        removeNodes: (g) => t.removeNodes(g),
        addEdges: (g) => t.addEdges(g),
        removeEdges: (g) => t.removeEdges(g)
      }, h = new cp(u, o), p = async () => {
        i.animate = (...g) => u.animate(...g), i.update = (...g) => u.update(...g), i.sendParticle = (...g) => u.sendParticle(...g), i.sendParticleAlongPath = (...g) => u.sendParticleAlongPath(...g), i.sendParticleBetween = (...g) => u.sendParticleBetween(...g), i.sendParticleBurst = (...g) => u.sendParticleBurst(...g), i.sendConverging = (...g) => u.sendConverging(...g);
        try {
          const g = n();
          g instanceof Promise && await g;
        } finally {
          i.animate = s, i.update = a, i.sendParticle = r, i.sendParticleAlongPath = l, i.sendParticleBetween = c, i.sendParticleBurst = d, i.sendConverging = f;
        }
      };
      return h.record(p, o?.captureMetadata);
    },
    /**
     * Replay a previously recorded `Recording` on this canvas.
     * Returns a `ReplayHandle` with play/pause/stop/scrub controls.
     */
    replay(n, o) {
      const i = this, s = {
        get nodes() {
          return t.nodes;
        },
        get edges() {
          return t.edges;
        },
        get viewport() {
          return t.viewport;
        },
        addNodes: (a) => i.addNodes(a),
        removeNodes: (a) => i.removeNodes(a),
        addEdges: (a) => i.addEdges(a),
        removeEdges: (a) => i.removeEdges(a),
        sendParticle: (a, r) => i.sendParticle(a, r),
        sendParticleAlongPath: (a, r) => i.sendParticleAlongPath(a, r),
        sendParticleBetween: (a, r, l) => i.sendParticleBetween(a, r, l),
        sendParticleBurst: (a, r) => i.sendParticleBurst(a, r),
        sendConverging: (a, r) => i.sendConverging(a, r)
      };
      return new dp(s, n, o);
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
      nn(n, o);
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
function Ks(t, e, n, o) {
  const i = e.find((r) => r.id === t);
  if (!i) return /* @__PURE__ */ new Set();
  if (i.type === "group")
    return Et(t, e);
  const s = /* @__PURE__ */ new Set(), a = hi(t, e, n);
  for (const r of a)
    s.add(r.id);
  if (o?.recursive) {
    const r = a.map((l) => l.id);
    for (; r.length > 0; ) {
      const l = r.shift(), c = hi(l, e, n);
      for (const d of c)
        !s.has(d.id) && d.id !== t && (s.add(d.id), r.push(d.id));
    }
  }
  return s;
}
function fp(t, e, n) {
  const o = /* @__PURE__ */ new Map();
  for (const i of e)
    n.has(i.id) && o.set(i.id, { ...i.position });
  return {
    targetPositions: o,
    originalDimensions: t.type === "group" ? { ...t.dimensions ?? { width: 400, height: 300 } } : void 0,
    reroutedEdges: /* @__PURE__ */ new Map()
  };
}
function Wo(t, e, n, o) {
  t.collapsed = !0, o && (t.dimensions = { ...o });
  for (const i of e)
    n.targetPositions.has(i.id) && (i.hidden = !0);
}
function Js(t, e, n, o = !0) {
  t.collapsed = !1, o && n.originalDimensions && (t.dimensions = { ...n.originalDimensions });
  const i = /* @__PURE__ */ new Set();
  if (t.type === "group") {
    for (const s of e)
      if (s.collapsed && s.id !== t.id && n.targetPositions.has(s.id)) {
        const a = Et(s.id, e);
        for (const r of a)
          i.add(r);
      }
  }
  for (const s of e)
    if (n.targetPositions.has(s.id)) {
      const a = n.targetPositions.get(s.id);
      s.position = { ...a }, i.has(s.id) || (s.hidden = !1);
    }
}
function jo(t, e, n) {
  const o = /* @__PURE__ */ new Map();
  for (const i of e) {
    const s = n.has(i.source), a = n.has(i.target), r = i.source === t, l = i.target === t;
    !s && !a || (o.set(i.id, { source: i.source, target: i.target, hidden: i.hidden }), s && a || r && a || s && l ? i.hidden = !0 : s ? i.source = t : i.target = t);
  }
  return o;
}
function hp(t, e) {
  for (const n of t) {
    const o = e.get(n.id);
    o && (n.source = o.source, n.target = o.target, o.hidden !== void 0 ? n.hidden = o.hidden : delete n.hidden);
  }
}
const Un = { width: 150, height: 50 };
function gp(t) {
  return {
    /**
     * Collapse a node — hide its descendants/outgoers and optionally animate.
     */
    collapseNode(e, n) {
      const o = t._nodeMap.get(e);
      if (!o || o.collapsed) return;
      const i = Ks(e, t.nodes, t.edges, { recursive: n?.recursive });
      if (i.size === 0) return;
      B("collapse", `Collapsing node "${e}"`, {
        type: o.type ?? "default",
        descendants: [...i],
        animate: n?.animate !== !1,
        recursive: n?.recursive ?? !1
      }), t._captureHistory();
      const s = o.type === "group", a = s ? o.collapsedDimensions ?? { width: 150, height: 60 } : void 0, r = n?.animate !== !1, l = fp(o, t.nodes, i);
      if (r) {
        t._suspendHistory();
        const c = o.dimensions ?? Un, d = s && a ? a : c, f = {};
        for (const [h] of l.targetPositions) {
          const p = t._nodeMap.get(h);
          if (!p) continue;
          const g = p.dimensions ?? Un;
          let m, y;
          p.parentId === e ? (m = (d.width - g.width) / 2, y = (d.height - g.height) / 2) : (m = o.position.x + (d.width - g.width) / 2, y = o.position.y + (d.height - g.height) / 2), f[h] = {
            position: { x: m, y },
            style: { opacity: "0" }
          };
        }
        s && a && (f[e] = { dimensions: a });
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
            Wo(o, t.nodes, l, a), l.reroutedEdges = jo(e, t.edges, i), t._collapseState.set(e, l), t._resumeHistory(), t._emit("node-collapse", { node: o, descendants: [...i] });
          }
        }) : (Wo(o, t.nodes, l, a), l.reroutedEdges = jo(e, t.edges, i), t._collapseState.set(e, l), t._resumeHistory(), t._emit("node-collapse", { node: o, descendants: [...i] }));
      } else
        Wo(o, t.nodes, l, a), l.reroutedEdges = jo(e, t.edges, i), t._collapseState.set(e, l), t._emit("node-collapse", { node: o, descendants: [...i] });
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
      const s = o.type === "group", a = n?.animate !== !1;
      if (i.reroutedEdges.size > 0 && hp(t.edges, i.reroutedEdges), a) {
        t._suspendHistory(), s && i.originalDimensions && (o.dimensions = { ...i.originalDimensions });
        const r = o.dimensions ?? Un;
        Js(o, t.nodes, i, s);
        const l = {};
        for (const [f, u] of i.targetPositions) {
          const h = t._nodeMap.get(f);
          if (h && !h.hidden) {
            const p = h.dimensions ?? Un;
            let g, m;
            h.parentId === e ? (g = (r.width - p.width) / 2, m = (r.height - p.height) / 2) : (g = o.position.x + (r.width - p.width) / 2, m = o.position.y + (r.height - p.height) / 2), h.position = { x: g, y: m }, h.style = { ...h.style || {}, opacity: "0" }, l[f] = {
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
        Js(o, t.nodes, i, s), t._collapseState.delete(e), t._emit("node-expand", { node: o, descendants: [...i.targetPositions.keys()] });
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
      return Ks(e, t.nodes, t.edges).size;
    },
    /**
     * Get the number of descendants (via parentId hierarchy) of a node.
     */
    getDescendantCount(e) {
      return Et(e, t.nodes).size;
    }
  };
}
function pp(t) {
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
function mp(t) {
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
      const s = /* @__PURE__ */ new Set();
      for (const a of t.edges) {
        if (a.sourceHandle?.startsWith(e + ".")) {
          const r = a.sourceHandle.slice(e.length + 1).replace(/-[lr]$/, "");
          r && s.add(r);
        }
        if (a.targetHandle?.startsWith(e + ".")) {
          const r = a.targetHandle.slice(e.length + 1).replace(/-[lr]$/, "");
          r && s.add(r);
        }
      }
      return i === "connected" ? n.filter((a) => s.has(a.id)) : n.filter((a) => !s.has(a.id));
    }
  };
}
const yp = 8, wp = 12, _p = 2;
function Yi(t) {
  return {
    width: t.dimensions?.width ?? we,
    height: t.dimensions?.height ?? be
  };
}
function vp(t) {
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
function bp(t) {
  return [...t].sort((e, n) => {
    const o = e.order ?? 1 / 0, i = n.order ?? 1 / 0;
    return o !== i ? o - i : 0;
  });
}
function Qs(t, e, n) {
  const o = e.gap ?? yp, i = e.padding ?? wp, s = e.headerHeight ?? 0, a = vp(e), r = bp(t), l = /* @__PURE__ */ new Map(), c = /* @__PURE__ */ new Map();
  if (r.length === 0)
    return {
      positions: l,
      dimensions: c,
      parentDimensions: n ? { width: n.width, height: n.height } : { width: i * 2, height: i * 2 + s }
    };
  const d = n ? n.width - i * 2 : 0, f = n ? n.height - i * 2 - s : 0;
  return e.direction === "vertical" ? xp(r, o, i, s, a, d, l, c) : e.direction === "horizontal" ? Ep(r, o, i, s, a, f, l, c) : Cp(r, o, i, s, a, e.columns ?? _p, d, f, l, c);
}
function xp(t, e, n, o, i, s, a, r) {
  let l = 0;
  const c = t.map((u) => Yi(u));
  for (const u of c) l = Math.max(l, u.width);
  const d = s > 0 ? s : l;
  let f = n + o;
  for (let u = 0; u < t.length; u++) {
    const h = t[u], p = c[u];
    a.set(h.id, { x: n, y: f }), (i === "width" || i === "both") && r.set(h.id, { width: d, height: p.height }), f += p.height + e;
  }
  return f -= e, f += n, {
    positions: a,
    dimensions: r,
    parentDimensions: { width: d + n * 2, height: f }
  };
}
function Ep(t, e, n, o, i, s, a, r) {
  let l = 0;
  const c = t.map((u) => Yi(u));
  for (const u of c) l = Math.max(l, u.height);
  const d = s > 0 ? s : l;
  let f = n;
  for (let u = 0; u < t.length; u++) {
    const h = t[u], p = c[u];
    a.set(h.id, { x: f, y: n + o }), (i === "height" || i === "both") && r.set(h.id, { width: p.width, height: d }), f += p.width + e;
  }
  return f -= e, f += n, {
    positions: a,
    dimensions: r,
    parentDimensions: { width: f, height: d + n * 2 + o }
  };
}
function Cp(t, e, n, o, i, s, a, r, l, c) {
  const d = Math.min(s, t.length), f = t.map((y) => Yi(y));
  let u = 0, h = 0;
  for (const y of f)
    u = Math.max(u, y.width), h = Math.max(h, y.height);
  const p = a > 0 ? (a - (d - 1) * e) / d : 0;
  p > 0 && (u = p);
  const g = Math.ceil(t.length / d), m = r > 0 ? (r - (g - 1) * e) / g : 0;
  m > 0 && (h = m);
  for (let y = 0; y < t.length; y++) {
    const x = y % d, k = Math.floor(y / d), _ = n + x * (u + e), S = n + o + k * (h + e);
    l.set(t[y].id, { x: _, y: S }), i === "both" ? c.set(t[y].id, { width: u, height: h }) : i === "width" ? c.set(t[y].id, { width: u, height: f[y].height }) : i === "height" && c.set(t[y].id, { width: f[y].width, height: h });
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
function Sp(t) {
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
        for (const [s, a] of e)
          i[s] = { position: a };
        t.animate?.({ nodes: i }, {
          duration: o,
          easing: "easeInOut",
          onComplete: () => {
            n?.fitView !== !1 && t.fitView?.({ padding: 0.2, duration: o }), n?.onApplied?.();
          }
        });
      } else {
        for (const i of t.nodes) {
          const s = e.get(i.id);
          s && (i.position || (i.position = { x: 0, y: 0 }), i.position.x = s.x, i.position.y = s.y);
        }
        n?.fitView !== !1 && t.fitView?.({ padding: 0.2, duration: 0 }), n?.onApplied && queueMicrotask(n.onApplied);
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
      let s;
      typeof n == "string" ? s = { excludeId: n, shallow: o, stretchedSize: i } : s = n ?? {};
      const { excludeId: a, omitFromComputation: r, includeNode: l, shallow: c } = s;
      let { stretchedSize: d } = s;
      const f = t.nodes.find((_) => _.id === e);
      if (!f?.childLayout) return;
      let u = t.nodes.filter((_) => _.parentId === e);
      r && (u = u.filter((_) => _.id !== r)), l && !u.some((_) => _.id === l.id) && (u = [...u, l]);
      const h = new Map(u.map((_) => [_.id, _]));
      if (f.dimensions = void 0, !d && f.maxDimensions && f.maxDimensions.width !== void 0 && f.maxDimensions.height !== void 0 && (d = { width: f.maxDimensions.width, height: f.maxDimensions.height }), !c)
        for (const _ of u)
          _.childLayout && this.layoutChildren(_.id, { excludeId: a, omitFromComputation: r, shallow: !1 });
      const p = f.childLayout, g = p.headerHeight !== void 0 ? p : f.data?.label ? { ...p, headerHeight: 30 } : p, m = Qs(u, g, d);
      for (const [_, S] of m.positions) {
        if (_ === a || l && _ === l.id && !t._nodeMap.has(_)) continue;
        const b = h.get(_);
        b && (b.position ? (b.position.x = S.x, b.position.y = S.y) : b.position = { x: S.x, y: S.y });
      }
      for (const [_, S] of m.dimensions) {
        if (_ === a || l && _ === l.id && !t._nodeMap.has(_)) continue;
        const b = h.get(_);
        if (b) {
          let E = S.width, M = S.height;
          b.minDimensions && (b.minDimensions.width != null && (E = Math.max(E, b.minDimensions.width)), b.minDimensions.height != null && (M = Math.max(M, b.minDimensions.height))), b.maxDimensions && (b.maxDimensions.width != null && (E = Math.min(E, b.maxDimensions.width)), b.maxDimensions.height != null && (M = Math.min(M, b.maxDimensions.height))), b.dimensions ? (b.dimensions.width = E, b.dimensions.height = M) : b.dimensions = { width: E, height: M }, b.childLayout && !c && this.layoutChildren(_, { excludeId: a, omitFromComputation: r, shallow: !1, stretchedSize: b.dimensions });
        }
      }
      let y = m.parentDimensions.width, x = m.parentDimensions.height;
      if (f.minDimensions && (f.minDimensions.width != null && (y = Math.max(y, f.minDimensions.width)), f.minDimensions.height != null && (x = Math.max(x, f.minDimensions.height))), f.maxDimensions && (f.maxDimensions.width != null && (y = Math.min(y, f.maxDimensions.width)), f.maxDimensions.height != null && (x = Math.min(x, f.maxDimensions.height))), f.dimensions || (f.dimensions = { width: 0, height: 0 }), f.dimensions.width = y, f.dimensions.height = x, y !== m.parentDimensions.width || x !== m.parentDimensions.height) {
        const S = Qs(u, g, { width: y, height: x });
        for (const [b, E] of S.positions) {
          if (b === a || l && b === l.id && !t._nodeMap.has(b)) continue;
          const M = h.get(b);
          M && (M.position ? (M.position.x = E.x, M.position.y = E.y) : M.position = { x: E.x, y: E.y });
        }
        for (const [b, E] of S.dimensions) {
          if (b === a || l && b === l.id && !t._nodeMap.has(b)) continue;
          const M = h.get(b);
          if (M) {
            let R = E.width, L = E.height;
            M.minDimensions && (M.minDimensions.width != null && (R = Math.max(R, M.minDimensions.width)), M.minDimensions.height != null && (L = Math.max(L, M.minDimensions.height))), M.maxDimensions && (M.maxDimensions.width != null && (R = Math.min(R, M.maxDimensions.width)), M.maxDimensions.height != null && (L = Math.min(L, M.maxDimensions.height))), M.dimensions ? (M.dimensions.width = R, M.dimensions.height = L) : M.dimensions = { width: R, height: L }, M.childLayout && !c && this.layoutChildren(b, { excludeId: a, omitFromComputation: r, shallow: !1, stretchedSize: M.dimensions });
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
        (s) => s.id === e
      )?.parentId;
      for (; i; ) {
        const s = t._nodeMap.get(i);
        if (!s?.childLayout) break;
        this.layoutChildren(i, { ...o, shallow: !0 }), i = s.parentId;
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
      const a = t.nodes.filter((l) => l.parentId === o.parentId).sort((l, c) => (l.order ?? 1 / 0) - (c.order ?? 1 / 0)).filter((l) => l.id !== e), r = Math.max(0, Math.min(n, a.length));
      a.splice(r, 0, o);
      for (let l = 0; l < a.length; l++)
        a[l].order = l;
      this.layoutChildren(o.parentId), t._emit("child-reorder", { nodeId: e, parentId: o.parentId, order: r });
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
      const o = e?.direction ?? "TB", i = e?.includeChildren ? t.nodes : t.nodes.filter((r) => !r.parentId), s = n(i, t.edges, {
        direction: o,
        nodesep: e?.nodesep,
        ranksep: e?.ranksep
      }), a = Object.fromEntries(s);
      this._applyLayout(s, {
        adjustHandles: e?.adjustHandles,
        handleDirection: o,
        fitView: e?.fitView,
        duration: e?.duration,
        onApplied: () => t._emit("layout-end", { type: "dagre", direction: o, positions: a })
      }), B("layout", "Applied dagre layout", { direction: o }), t._emit("layout", { type: "dagre", direction: o, positions: Object.fromEntries(s) });
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
      const o = e?.includeChildren ? t.nodes : t.nodes.filter((a) => !a.parentId), i = n(o, t.edges, {
        strength: e?.strength,
        distance: e?.distance,
        charge: e?.charge,
        iterations: e?.iterations,
        center: e?.center
      }), s = Object.fromEntries(i);
      this._applyLayout(i, {
        fitView: e?.fitView,
        duration: e?.duration,
        onApplied: () => t._emit("layout-end", {
          type: "force",
          charge: e?.charge ?? -300,
          distance: e?.distance ?? 150,
          positions: s
        })
      }), B("layout", "Applied force layout", { charge: e?.charge ?? -300, distance: e?.distance ?? 150 }), t._emit("layout", {
        type: "force",
        charge: e?.charge ?? -300,
        distance: e?.distance ?? 150,
        positions: Object.fromEntries(i)
      });
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
      const o = e?.direction ?? "TB", i = e?.includeChildren ? t.nodes : t.nodes.filter((r) => !r.parentId), s = n(i, t.edges, {
        layoutType: e?.layoutType,
        direction: o,
        nodeWidth: e?.nodeWidth,
        nodeHeight: e?.nodeHeight
      }), a = Object.fromEntries(s);
      this._applyLayout(s, {
        adjustHandles: e?.adjustHandles,
        handleDirection: o,
        fitView: e?.fitView,
        duration: e?.duration,
        onApplied: () => t._emit("layout-end", {
          type: "tree",
          layoutType: e?.layoutType ?? "tree",
          direction: o,
          positions: a
        })
      }), B("layout", "Applied tree layout", { layoutType: e?.layoutType ?? "tree", direction: o }), t._emit("layout", {
        type: "tree",
        layoutType: e?.layoutType ?? "tree",
        direction: o,
        positions: Object.fromEntries(s)
      });
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
      const o = e?.direction ?? "DOWN", i = e?.includeChildren ? t.nodes : t.nodes.filter((r) => !r.parentId), s = await n(i, t.edges, {
        algorithm: e?.algorithm,
        direction: o,
        nodeSpacing: e?.nodeSpacing,
        layerSpacing: e?.layerSpacing,
        aspectRatio: e?.aspectRatio,
        layoutOptions: e?.layoutOptions
      });
      if (s.size === 0) {
        B("layout", "ELK layout returned no positions — skipping apply");
        return;
      }
      const a = Object.fromEntries(s);
      this._applyLayout(s, {
        adjustHandles: e?.adjustHandles,
        handleDirection: o,
        fitView: e?.fitView,
        duration: e?.duration,
        onApplied: () => t._emit("layout-end", {
          type: "elk",
          algorithm: e?.algorithm ?? "layered",
          direction: o,
          positions: a
        })
      }), B("layout", "Applied ELK layout", { algorithm: e?.algorithm ?? "layered", direction: o }), t._emit("layout", {
        type: "elk",
        algorithm: e?.algorithm ?? "layered",
        direction: o,
        positions: Object.fromEntries(s)
      });
    }
  };
}
function kp(t) {
  return {
    // ── Internal helpers ──────────────────────────────────────────────────
    _getChildValidation(e) {
      const n = t.getNode(e);
      if (n)
        return _n(n, t._config.childValidationRules ?? {});
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
        const s = _n(i, t._config.childValidationRules ?? {});
        if (!s) {
          t._validationErrorCache.delete(o);
          continue;
        }
        const a = t.nodes.filter((l) => l.parentId === o), r = Xs(i, a, s);
        r.length > 0 ? t._validationErrorCache.set(o, r) : t._validationErrorCache.delete(o), i._validationErrors = r;
      }
    },
    // ── Child Validation API ─────────────────────────────────────────────
    validateParent(e) {
      const n = t.getNode(e);
      if (!n) return { valid: !0, errors: [] };
      const o = _n(n, t._config.childValidationRules ?? {});
      if (!o) return { valid: !0, errors: [] };
      const i = t.nodes.filter((a) => a.parentId === e), s = Xs(n, i, o);
      return { valid: s.length === 0, errors: s };
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
              ), p = _o(u, o, h, f);
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
        if (o.position.x = d.x, o.position.y = d.y, o.parentId = void 0, o.extent = void 0, t.nodes = Tt(t.nodes), t._rebuildNodeMap(), this._recomputeChildValidation(), i) {
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
      const s = t.getNode(n);
      if (!s || Et(e, t.nodes).has(n)) return !1;
      const a = this._getChildValidation(n);
      if (a) {
        const d = t.nodes.filter(
          (u) => u.parentId === n && u.id !== e
        ), f = Ya(s, o, d, a);
        if (!f.valid)
          return t._config.onChildValidationFail && t._config.onChildValidationFail({
            parent: s,
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
            ), h = _o(f, o, u, d);
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
      const r = i ? t.getAbsolutePosition(e) : { x: o.position.x, y: o.position.y }, l = t.getAbsolutePosition(n);
      if (o.position.x = r.x - l.x, o.position.y = r.y - l.y, o.parentId = n, t.nodes = Tt(t.nodes), t._rebuildNodeMap(), this._recomputeChildValidation(), n && t._nodeMap.get(n)?.childLayout) {
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
function Lp(t) {
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
            const s = t._nodeElements.get(i), a = t._nodeMap.get(i);
            if (s && a) {
              s.style.width = "", s.style.height = "";
              const r = s.offsetWidth, l = s.offsetHeight;
              (!a.dimensions || r !== a.dimensions.width || l !== a.dimensions.height) && (a.dimensions = { width: r, height: l }, o.add(i)), a.fixedDimensions = !0, s.style.width = r + "px", s.style.height = l + "px";
            }
          }
          o.size > 0 && t._refreshEdgePaths(o);
        });
      }), n;
    }
  };
}
function eo(t, e, n, o, i) {
  const s = i * Math.PI / 180, a = Math.cos(s), r = Math.sin(s), l = t - n, c = e - o;
  return {
    x: n + l * a - c * r,
    y: o + l * r + c * a
  };
}
function Mp(t) {
  if (t.length < 2) return "";
  if (t.length === 2)
    return `M${t[0].x},${t[0].y} L${t[1].x},${t[1].y}`;
  let e = `M${t[0].x},${t[0].y}`;
  for (let n = 0; n < t.length - 1; n++) {
    const o = t[Math.max(0, n - 1)], i = t[n], s = t[n + 1], a = t[Math.min(t.length - 1, n + 2)], r = i.x + (s.x - o.x) / 6, l = i.y + (s.y - o.y) / 6, c = s.x - (a.x - i.x) / 6, d = s.y - (a.y - i.y) / 6;
    e += ` C${r},${l} ${c},${d} ${s.x},${s.y}`;
  }
  return e;
}
const Pp = 40;
function Np(t, e = Pp) {
  if (t.length < 2) return "";
  if (t.length === 2)
    return `M${t[0].x},${t[0].y} L${t[1].x},${t[1].y}`;
  let n = `M${t[0].x},${t[0].y}`;
  for (let i = 1; i < t.length - 1; i++) {
    const s = t[i - 1], a = t[i], r = t[i + 1], l = Math.hypot(a.x - s.x, a.y - s.y) || 1, c = Math.hypot(r.x - a.x, r.y - a.y) || 1, d = Math.min(e, l / 2, c / 2), f = a.x - d * (a.x - s.x) / l, u = a.y - d * (a.y - s.y) / l, h = a.x + d * (r.x - a.x) / c, p = a.y + d * (r.y - a.y) / c, g = 0.5;
    n += ` L${f},${u} C${f + g * (a.x - f)},${u + g * (a.y - u)} ${h + g * (a.x - h)},${p + g * (a.y - p)} ${h},${p}`;
  }
  const o = t[t.length - 1];
  return n += ` L${o.x},${o.y}`, n;
}
function Ap(t) {
  if (t.length < 2)
    return { x: t[0]?.x ?? 0, y: t[0]?.y ?? 0, offsetX: 0, offsetY: 0 };
  let e = 0;
  const n = [];
  for (let s = 1; s < t.length; s++) {
    const a = t[s].x - t[s - 1].x, r = t[s].y - t[s - 1].y, l = Math.sqrt(a * a + r * r);
    n.push(l), e += l;
  }
  let o = e / 2;
  for (let s = 0; s < n.length; s++) {
    if (o <= n[s]) {
      const a = n[s] > 0 ? o / n[s] : 0, r = t[s].x + (t[s + 1].x - t[s].x) * a, l = t[s].y + (t[s + 1].y - t[s].y) * a;
      return {
        x: r,
        y: l,
        offsetX: Math.abs(t[t.length - 1].x - t[0].x) / 2,
        offsetY: Math.abs(t[t.length - 1].y - t[0].y) / 2
      };
    }
    o -= n[s];
  }
  const i = t[t.length - 1];
  return { x: i.x, y: i.y, offsetX: 0, offsetY: 0 };
}
function Tp({
  sourceX: t,
  sourceY: e,
  sourcePosition: n = "bottom",
  targetX: o,
  targetY: i,
  targetPosition: s = "top",
  obstacles: a,
  channelOffset: r
}) {
  if (!a || a.length === 0)
    return mo({
      sourceX: t,
      sourceY: e,
      sourcePosition: n,
      targetX: o,
      targetY: i,
      targetPosition: s
    });
  const l = Fi(t, e, n, o, i, s, a);
  if (!l)
    return mo({
      sourceX: t,
      sourceY: e,
      sourcePosition: n,
      targetX: o,
      targetY: i,
      targetPosition: s
    });
  const c = Ia(l, r, a), d = Np(c), { x: f, y: u, offsetX: h, offsetY: p } = Ap(c);
  return {
    path: d,
    labelPosition: { x: f, y: u },
    labelOffsetX: h,
    labelOffsetY: p
  };
}
function Ip(t) {
  const {
    sourceX: e,
    sourceY: n,
    targetX: o,
    targetY: i,
    controlPoints: s = [],
    pathStyle: a = "bezier",
    borderRadius: r = 5
  } = t, l = [
    { x: e, y: n },
    ...s,
    { x: o, y: i }
  ];
  let c;
  switch (a) {
    case "linear":
      c = er(l);
      break;
    case "step":
      c = $p(l, 0);
      break;
    case "smoothstep":
      c = Dp(l, r);
      break;
    case "catmull-rom":
    case "bezier":
      c = Mp(l.map((u, h) => ({ ...u, index: h })));
      break;
    default:
      c = er(l);
  }
  const d = Rp(l), f = $n({ sourceX: e, sourceY: n, targetX: o, targetY: i });
  return {
    path: c,
    labelPosition: d,
    labelOffsetX: f.offsetX,
    labelOffsetY: f.offsetY
  };
}
function er(t) {
  if (t.length < 2) return "";
  let e = `M${t[0].x},${t[0].y}`;
  for (let n = 1; n < t.length; n++)
    e += ` L${t[n].x},${t[n].y}`;
  return e;
}
function $p(t, e) {
  if (t.length < 2) return "";
  if (t.length === 2)
    return Ka(t[0], t[1], e);
  let n = `M${t[0].x},${t[0].y}`;
  for (let i = 1; i < t.length - 1; i++) {
    const s = t[i - 1], a = t[i], r = t[i + 1];
    n += Zt(s.x, s.y, a.x, a.y, r.x, r.y, e);
  }
  const o = t[t.length - 1];
  return n += ` L${o.x},${o.y}`, n;
}
function Ka(t, e, n) {
  const o = (t.x + e.x) / 2, i = Zt(t.x, t.y, o, t.y, o, e.y, n), s = Zt(o, t.y, o, e.y, e.x, e.y, n);
  return `M${t.x},${t.y}${i}${s} L${e.x},${e.y}`;
}
function Dp(t, e) {
  if (t.length < 2) return "";
  if (t.length === 2)
    return Ka(t[0], t[1], e);
  const n = [t[0]];
  for (let s = 0; s < t.length - 1; s++) {
    const a = t[s], r = t[s + 1], l = Math.abs(r.x - a.x), c = Math.abs(r.y - a.y);
    if (l < 1 || c < 1)
      n.push(r);
    else {
      const d = (a.x + r.x) / 2;
      n.push({ x: d, y: a.y }), n.push({ x: d, y: r.y }), n.push(r);
    }
  }
  let o = `M${n[0].x},${n[0].y}`;
  for (let s = 1; s < n.length - 1; s++) {
    const a = n[s - 1], r = n[s], l = n[s + 1];
    o += Zt(a.x, a.y, r.x, r.y, l.x, l.y, e);
  }
  const i = n[n.length - 1];
  return o += ` L${i.x},${i.y}`, o;
}
function Rp(t) {
  if (t.length < 2) return t[0] ?? { x: 0, y: 0 };
  let e = 0;
  const n = [];
  for (let i = 0; i < t.length - 1; i++) {
    const s = t[i + 1].x - t[i].x, a = t[i + 1].y - t[i].y, r = Math.sqrt(s * s + a * a);
    n.push(r), e += r;
  }
  if (e === 0) return t[0];
  let o = e / 2;
  for (let i = 0; i < n.length; i++) {
    if (o <= n[i]) {
      const s = o / n[i];
      return {
        x: t[i].x + (t[i + 1].x - t[i].x) * s,
        y: t[i].y + (t[i + 1].y - t[i].y) * s
      };
    }
    o -= n[i];
  }
  return t[t.length - 1];
}
function Qt(t, e, n, o) {
  const i = t.dimensions?.width ?? we, s = t.dimensions?.height ?? be, a = en(t, o);
  let r;
  if (t.shape) {
    const l = n?.[t.shape] ?? Va[t.shape];
    if (l) {
      const c = l.perimeterPoint(i, s, e);
      r = { x: a.x + c.x, y: a.y + c.y };
    } else {
      const c = qs(i, s, e);
      r = { x: a.x + c.x, y: a.y + c.y };
    }
  } else {
    const l = qs(i, s, e);
    r = { x: a.x + l.x, y: a.y + l.y };
  }
  if (t.rotation) {
    const l = a.x + i / 2, c = a.y + s / 2;
    r = eo(r.x, r.y, l, c, t.rotation);
  }
  return r;
}
function tr(t) {
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
function bi(t) {
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
const Hp = 1.5, Fp = 5 / 20;
function Vt(t, e, n, o) {
  if (!o) return t;
  const i = typeof o == "string" ? {} : o, s = n ? Math.min(n.handleWidth, n.handleHeight) / 2 : 5;
  if (i.offset !== void 0) {
    const f = bi(e);
    return { x: t.x + f.x * i.offset, y: t.y + f.y * i.offset };
  }
  const l = (i.width ?? 12.5) * Hp * Fp * 0.4, c = s + l, d = bi(e);
  return { x: t.x + d.x * c, y: t.y + d.y * c };
}
function bo(t, e, n, o = "bottom", i = "top", s, a, r, l, c, d, f, u) {
  const h = s ?? Qt(e, o, c, d), p = a ?? Qt(n, i, c, d), g = {
    sourceX: h.x,
    sourceY: h.y,
    sourcePosition: tr(o),
    targetX: p.x,
    targetY: p.y,
    targetPosition: tr(i)
  }, m = t.type ?? f ?? "bezier";
  if (r?.[m])
    return r[m](g, t);
  switch (m === "floating" ? t.pathType ?? "bezier" : m) {
    case "editable":
      return Ip({
        ...g,
        controlPoints: t.controlPoints,
        pathStyle: t.pathStyle
      });
    case "avoidant":
      return Tp({ ...g, obstacles: l, channelOffset: u });
    case "orthogonal":
      return Zh({ ...g, obstacles: l, channelOffset: u });
    case "smoothstep":
      return Ln(g);
    case "straight":
      return Sa({ sourceX: h.x, sourceY: h.y, targetX: p.x, targetY: p.y });
    default:
      return mo(g);
  }
}
function nr(t, e) {
  const n = t.dimensions?.width ?? we, o = t.dimensions?.height ?? be, i = {
    x: t.position.x + n / 2,
    y: t.position.y + o / 2
  }, s = t.rotation ? eo(e.x, e.y, i.x, i.y, -t.rotation) : e, a = s.x - i.x, r = s.y - i.y;
  if (a === 0 && r === 0) {
    const p = { x: i.x, y: i.y - o / 2 };
    return t.rotation ? eo(p.x, p.y, i.x, i.y, t.rotation) : p;
  }
  const l = n / 2, c = o / 2, d = Math.abs(a), f = Math.abs(r);
  let u;
  d / l > f / c ? u = l / d : u = c / f;
  const h = {
    x: i.x + a * u,
    y: i.y + r * u
  };
  return t.rotation ? eo(h.x, h.y, i.x, i.y, t.rotation) : h;
}
function or(t, e) {
  const n = t.dimensions?.width ?? we, o = t.dimensions?.height ?? be, i = t.position.x + n / 2, s = t.position.y + o / 2;
  if (t.rotation) {
    const h = e.x - i, p = e.y - s;
    return Math.abs(h) > Math.abs(p) ? h > 0 ? "right" : "left" : p > 0 ? "bottom" : "top";
  }
  const a = 1, r = t.position.x, l = t.position.x + n, c = t.position.y, d = t.position.y + o;
  if (Math.abs(e.x - r) <= a) return "left";
  if (Math.abs(e.x - l) <= a) return "right";
  if (Math.abs(e.y - c) <= a) return "top";
  if (Math.abs(e.y - d) <= a) return "bottom";
  const f = e.x - i, u = e.y - s;
  return Math.abs(f) > Math.abs(u) ? f > 0 ? "right" : "left" : u > 0 ? "bottom" : "top";
}
function Ja(t, e) {
  const n = t.dimensions?.width ?? we, o = t.dimensions?.height ?? be, i = e.dimensions?.width ?? we, s = e.dimensions?.height ?? be, a = {
    x: t.position.x + n / 2,
    y: t.position.y + o / 2
  }, r = {
    x: e.position.x + i / 2,
    y: e.position.y + s / 2
  }, l = nr(t, r), c = nr(e, a), d = or(t, l), f = or(e, c);
  return {
    sx: l.x,
    sy: l.y,
    tx: c.x,
    ty: c.y,
    sourcePos: d,
    targetPos: f
  };
}
function Yw(t, e) {
  const n = e.x - t.x, o = e.y - t.y;
  let i, s;
  return Math.abs(n) > Math.abs(o) ? (i = n > 0 ? "right" : "left", s = n > 0 ? "left" : "right") : (i = o > 0 ? "bottom" : "top", s = o > 0 ? "top" : "bottom"), { sourcePos: i, targetPos: s };
}
function xi(t) {
  return typeof t == "object" && t !== null && "from" in t && "to" in t;
}
function to(t, e) {
  return `${t}__grad__${e}`;
}
function Op(t, e, n) {
  const o = t.querySelector(`#${CSS.escape(e)}`);
  if (!o)
    return !1;
  const i = o.querySelectorAll("stop");
  return i.length < 2 ? !1 : (i[0]?.setAttribute("stop-color", n.from), i[1]?.setAttribute("stop-color", n.to), !0);
}
function Qa(t, e, n, o, i, s, a) {
  let r = t.querySelector(`#${CSS.escape(e)}`);
  if (!r) {
    r = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient"), r.id = e, r.setAttribute("gradientUnits", "userSpaceOnUse"), r.classList.add("flow-edge-gradient");
    const c = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    c.setAttribute("offset", "0%"), r.appendChild(c);
    const d = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    d.setAttribute("offset", "100%"), r.appendChild(d), t.appendChild(r);
  }
  r.setAttribute("x1", String(o)), r.setAttribute("y1", String(i)), r.setAttribute("x2", String(s)), r.setAttribute("y2", String(a));
  const l = r.querySelectorAll("stop");
  return l[0]?.setAttribute("stop-color", n.from), l[1]?.setAttribute("stop-color", n.to), r;
}
function Uo(t, e) {
  t.querySelector(`#${CSS.escape(e)}`)?.remove();
}
function Do(t) {
  return t.endsWith("-l") ? { field: t.slice(0, -2), side: "left" } : t.endsWith("-r") ? { field: t.slice(0, -2), side: "right" } : { field: t, side: null };
}
function zp(t, e) {
  if (!Array.isArray(t)) return -1;
  const n = t.findIndex((s) => s?.name === e);
  if (n >= 0) return n;
  const { field: o, side: i } = Do(e);
  return i === null ? -1 : t.findIndex((s) => s?.name === o);
}
function ir(t, e) {
  if (!Array.isArray(t) || !e || t.some((i) => i?.name === e)) return null;
  const { field: n, side: o } = Do(e);
  return o === null ? null : t.some((i) => i?.name === n) ? o : null;
}
function sr(t, e, n, o, i) {
  const s = t.data?.fields;
  if (!Array.isArray(s) || !Number.isInteger(n) || n < 0 || n >= s.length) return null;
  const { width: a, height: r } = t.dimensions ?? {};
  if (typeof a != "number" || !Number.isFinite(a) || typeof r != "number" || !Number.isFinite(r)) return null;
  const { headerHeight: l, rowHeight: c, handleOffsetY: d, handleOffsetYLast: f, insetLeft: u, insetRight: h, insetTop: p } = i;
  if (!Number.isFinite(l) || !Number.isFinite(c) || !Number.isFinite(d) || !Number.isFinite(f) || !Number.isFinite(u) || !Number.isFinite(h) || !Number.isFinite(p))
    return null;
  const g = n === s.length - 1 ? f : d, m = e.y + p + l + n * c + g;
  return { x: o === "left" ? e.x + u : e.x + a - h, y: m, position: o };
}
const Vp = /* @__PURE__ */ new Set(["x-data", "x-init", "x-bind", "href", "src", "action", "formaction", "srcdoc"]);
async function Bp(t) {
  const { dropNodeId: e, dropHandleId: n, draggedEnd: o, edge: i, canvas: s, containerEl: a } = t;
  if (!e)
    return { applied: !1 };
  const r = s.getNode(e);
  if (r && !Ye(r))
    return { applied: !1 };
  const l = o === "target" ? { source: i.source, sourceHandle: i.sourceHandle, target: e, targetHandle: n } : { source: e, sourceHandle: n, target: i.target, targetHandle: i.targetHandle }, c = { ...i }, d = await Ma({
    edge: i,
    newConnection: l,
    canvas: s,
    containerEl: a,
    endpoint: o
  });
  return d.applied ? (s._emit?.("reconnect", { oldEdge: c, newConnection: l }), { applied: !0, newConnection: l }) : { applied: !1, reason: d.reason, newConnection: l };
}
function qp(t) {
  return t === !0 || t === "dash" ? "dash" : t === "pulse" ? "pulse" : t === "dot" ? "dot" : "none";
}
function rr(t, e) {
  if (!e) return t;
  const n = bi(t), o = e * Math.PI / 180, i = Math.cos(o), s = Math.sin(o), a = n.x * i - n.y * s, r = n.x * s + n.y * i;
  return Math.abs(a) > Math.abs(r) ? a > 0 ? "right" : "left" : r > 0 ? "bottom" : "top";
}
function ar(t) {
  return { x: (t.left + t.right) / 2, y: (t.top + t.bottom) / 2 };
}
function xo(t, e) {
  const n = Array.from(t);
  if (n.length === 0) return null;
  if (n.length === 1 || !e) return n[0];
  let o = null, i = 1 / 0;
  for (const s of n) {
    const a = s.getBoundingClientRect(), r = (a.left + a.right) / 2, l = (a.top + a.bottom) / 2, c = r - e.x, d = l - e.y, f = c * c + d * d;
    f < i && (i = f, o = s);
  }
  return o;
}
function Eo(t, e, n, o, i, s, a) {
  const r = a ?? t.querySelector(`[data-flow-node-id="${CSS.escape(e)}"]`);
  if (r) {
    if (n) {
      const c = r.querySelectorAll(
        `[data-flow-handle-id="${CSS.escape(n)}"][data-flow-handle-type="${o}"]`
      );
      let d = xo(c, s);
      if (!d) {
        const f = r.querySelectorAll(
          `[data-flow-handle-id="${CSS.escape(n)}"]`
        );
        d = xo(f, s);
      }
      if (d)
        return d.getAttribute("data-flow-handle-position") ?? (o === "source" ? "bottom" : "top");
    }
    if (n) {
      const { field: c, side: d } = Do(n);
      if (d && (r.querySelector(
        `[data-flow-handle-id="${CSS.escape(c)}"][data-flow-handle-type="${o}"][data-flow-handle-position="${d}"]`
      ) || r.querySelector(`[data-flow-handle-position="${d}"]`)))
        return d;
    }
    const l = r.querySelector(`[data-flow-handle-type="${o}"]`);
    if (l)
      return l.getAttribute("data-flow-handle-position") ?? (o === "source" ? "bottom" : "top");
  }
  if (i) {
    const l = o === "source" ? i.sourcePosition : i.targetPosition;
    if (l) return l;
  }
  return o === "source" ? "bottom" : "top";
}
function lr(t, e, n, o) {
  if (!t || !e || t.hidden || t.collapsed || t.condensed || t.rotation) return -1;
  const i = t.nodeOrigin;
  if (i && (i[0] !== 0 || i[1] !== 0) || !n?.hasAttribute("data-flow-schema-node") || n.style.display === "none") return -1;
  const s = t.dimensions?.width, a = t.dimensions?.height;
  if (typeof s != "number" || !Number.isFinite(s) || typeof a != "number" || !Number.isFinite(a)) return -1;
  const r = t.data?.fields;
  if (!Array.isArray(r) || r.length === 0) return -1;
  const l = o.insetTop + o.headerHeight + (r.length - 1) * o.rowHeight + o.rowHeightLast + o.insetBottom;
  return Math.abs(l - a) > 0.5 ? -1 : zp(r, e);
}
function cr(t, e, n, o, i) {
  const s = t.dimensions?.width ?? we, a = e.x + (i.insetLeft + (s - i.insetRight)) / 2;
  return n === "source" ? o >= a ? "right" : "left" : o > a ? "right" : "left";
}
function dr(t) {
  return t.position.x + (t.dimensions?.width ?? we) / 2;
}
function Yp(t, e, n, o, i, s, a, r) {
  const l = lr(t, i, a?.get(t.id), r);
  if (l < 0) return null;
  const c = lr(e, s, a?.get(e.id), r);
  if (c < 0) return null;
  const d = t.data?.fields, f = e.data?.fields, u = ir(d, i) ?? cr(t, n.position, "source", dr(o), r), h = ir(f, s) ?? cr(e, o.position, "target", dr(n), r), p = sr(t, n.position, l, u, r), g = sr(e, o.position, c, h, r);
  if (!p || !g) return null;
  const m = { handleWidth: r.handleWidth, handleHeight: r.handleHeight };
  return {
    sourcePos: p.position,
    targetPos: g.position,
    srcMeasurement: { x: p.x, y: p.y, ...m },
    tgtMeasurement: { x: g.x, y: g.y, ...m }
  };
}
function ur(t, e, n, o, i, s, a, r, l) {
  const c = l ?? t.querySelector(`[data-flow-node-id="${CSS.escape(e)}"]`);
  if (!c) return null;
  let d = null;
  if (o) {
    const g = c.querySelectorAll(
      `[data-flow-handle-id="${CSS.escape(o)}"][data-flow-handle-type="${i}"]`
    );
    if (d = xo(g, r), !d) {
      const m = c.querySelectorAll(
        `[data-flow-handle-id="${CSS.escape(o)}"]`
      );
      d = xo(m, r);
    }
    if (!d) {
      const { field: m, side: y } = Do(o);
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
    x: (h - u.left - a.x) / s,
    y: (p - u.top - a.y) / s,
    handleWidth: f.width / s,
    handleHeight: f.height / s
  };
}
function Xp(t, e, n) {
  const o = n ?? t.getTotalLength(), i = t.getPointAtLength(o * Math.max(0, Math.min(1, e)));
  return { x: i.x, y: i.y };
}
function gt(t, e, n, o, i) {
  const s = t - n, a = e - o;
  return Math.sqrt(s * s + a * a) <= i;
}
function Wp(t, e, n) {
  const o = n.x - e.x, i = n.y - e.y, s = o * o + i * i;
  if (s === 0) return Math.sqrt((t.x - e.x) ** 2 + (t.y - e.y) ** 2);
  let a = ((t.x - e.x) * o + (t.y - e.y) * i) / s;
  a = Math.max(0, Math.min(1, a));
  const r = e.x + a * o, l = e.y + a * i;
  return Math.sqrt((t.x - r) ** 2 + (t.y - l) ** 2);
}
function jp(t) {
  t.directive(
    "flow-edge",
    (e, { expression: n }, { evaluate: o, effect: i, cleanup: s }) => {
      const a = e;
      a.style.pointerEvents = "auto";
      const r = document.createElementNS("http://www.w3.org/2000/svg", "path");
      r.setAttribute("fill", "none"), r.style.stroke = "transparent", r.style.strokeWidth = "20", r.style.pointerEvents = "stroke", r.style.cursor = "pointer", a.appendChild(r);
      let l = e.querySelector("path:not(:first-child)");
      l || (l = document.createElementNS("http://www.w3.org/2000/svg", "path"), l.setAttribute("fill", "none"), l.setAttribute("stroke-width", "1.5"), l.style.pointerEvents = "none", a.appendChild(l));
      let c = null, d = null, f = null, u = null, h = 0, p = null, g = "none", m = null, y = null;
      function x(C, N, O, Y, K) {
        p || (p = document.createElementNS("http://www.w3.org/2000/svg", "circle"), p.classList.add("flow-edge-dot"), p.style.pointerEvents = "none", C.appendChild(p));
        const U = O.closest(".flow-container"), W = U ? getComputedStyle(U) : null, re = Y.particleSize ?? (parseFloat(W?.getPropertyValue("--flow-edge-dot-size").trim() ?? "4") || 4), q = K || W?.getPropertyValue("--flow-edge-dot-duration").trim() || "2s";
        p.setAttribute("r", String(re)), Y.particleColor ? p.style.fill = Y.particleColor : p.style.removeProperty("fill");
        const V = p.querySelector("animateMotion");
        V && V.remove();
        const j = document.createElementNS("http://www.w3.org/2000/svg", "animateMotion");
        j.setAttribute("dur", q), j.setAttribute("repeatCount", "indefinite"), j.setAttribute("path", N), p.appendChild(j);
      }
      function k() {
        p?.remove(), p = null;
      }
      let _ = null, S = null, b = null, E = null;
      const M = (C) => {
        C.stopPropagation();
        const N = o(n);
        if (!N) return;
        const O = t.$data(e.closest("[x-data]"));
        O && (O._emit("edge-click", { edge: N, event: C }), gi(N, O._config?.edgesSelectable !== !1) && (xt(C, O._shortcuts?.multiSelect) ? O.selectedEdges.has(N.id) ? (O.selectedEdges.delete(N.id), N.selected = !1, B("selection", `Edge "${N.id}" deselected (shift)`)) : (O.selectedEdges.add(N.id), N.selected = !0, B("selection", `Edge "${N.id}" selected (shift)`)) : (O.deselectAll(), O.selectedEdges.add(N.id), N.selected = !0, B("selection", `Edge "${N.id}" selected`)), O._emitSelectionChange()));
      }, R = (C) => {
        C.preventDefault(), C.stopPropagation();
        const N = o(n);
        if (!N) return;
        const O = t.$data(e.closest("[x-data]"));
        if (!O) return;
        const Y = C.target;
        if (Y.classList.contains("flow-edge-control-point")) {
          const K = parseInt(Y.dataset.pointIndex ?? "", 10);
          if (!isNaN(K)) {
            O._emit("edge-control-point-context-menu", {
              edge: N,
              pointIndex: K,
              position: { x: C.clientX, y: C.clientY },
              event: C
            });
            return;
          }
        }
        O._emit("edge-context-menu", { edge: N, event: C });
      }, L = (C) => {
        C.stopPropagation(), C.preventDefault();
        const N = o(n), O = t.$data(e.closest("[x-data]"));
        if (!N || !O || (N.type ?? O._config?.defaultEdgeType ?? "bezier") !== "editable") return;
        const K = C.target;
        if (K.classList.contains("flow-edge-control-point")) {
          const U = parseInt(K.dataset.pointIndex ?? "", 10);
          !isNaN(U) && N.controlPoints && (O._captureHistory?.(), N.controlPoints.splice(U, 1), O._emit("edge-control-point-change", { edge: N, action: "remove", index: U }));
          return;
        }
        if (K.classList.contains("flow-edge-midpoint")) {
          const U = parseInt(K.dataset.segmentIndex ?? "", 10);
          if (!isNaN(U)) {
            const W = O.screenToFlowPosition(C.clientX, C.clientY);
            N.controlPoints || (N.controlPoints = []), O._captureHistory?.(), N.controlPoints.splice(U, 0, { x: W.x, y: W.y }), O._emit("edge-control-point-change", { edge: N, action: "add", index: U });
          }
          return;
        }
        if (K.closest("path")) {
          const U = O.screenToFlowPosition(C.clientX, C.clientY);
          N.controlPoints || (N.controlPoints = []);
          const W = [
            _ ?? { x: 0, y: 0 },
            ...N.controlPoints,
            S ?? { x: 0, y: 0 }
          ];
          let re = 0, q = 1 / 0;
          for (let V = 0; V < W.length - 1; V++) {
            const j = Wp(U, W[V], W[V + 1]);
            j < q && (q = j, re = V);
          }
          O._captureHistory?.(), N.controlPoints.splice(re, 0, { x: U.x, y: U.y }), O._emit("edge-control-point-change", { edge: N, action: "add", index: re });
        }
      }, D = (C) => {
        const N = C.target;
        if (!N.classList.contains("flow-edge-control-point") || C.button !== 0) return;
        C.stopPropagation(), C.preventDefault();
        const O = o(n);
        if (!O?.controlPoints) return;
        const Y = t.$data(e.closest("[x-data]"));
        if (!Y) return;
        const K = parseInt(N.dataset.pointIndex ?? "", 10);
        if (isNaN(K)) return;
        N.classList.add("dragging");
        let U = !1;
        const W = (q) => {
          U || (Y._captureHistory?.(), U = !0);
          let V = Y.screenToFlowPosition(q.clientX, q.clientY);
          const j = Y._config?.snapToGrid;
          j && (V = {
            x: Math.round(V.x / j[0]) * j[0],
            y: Math.round(V.y / j[1]) * j[1]
          }), O.controlPoints[K] = V;
        }, re = () => {
          document.removeEventListener("pointermove", W), document.removeEventListener("pointerup", re), N.classList.remove("dragging"), U && Y._emit("edge-control-point-change", { edge: O, action: "move", index: K });
        };
        document.addEventListener("pointermove", W), document.addEventListener("pointerup", re);
      };
      a.addEventListener("contextmenu", R), a.addEventListener("dblclick", L), a.addEventListener("pointerdown", D, !0);
      let A = null;
      const v = (C) => {
        if (C.button !== 0) return;
        C.stopPropagation();
        const N = o(n);
        if (!N) return;
        const O = t.$data(e.closest("[x-data]"));
        if (!O) return;
        const Y = O._config?.reconnectSnapRadius ?? ms, K = O._config?.edgesReconnectable !== !1, U = N.reconnectable ?? !0;
        let W = null;
        if (K && U !== !1 && _ && S) {
          const G = O.screenToFlowPosition(C.clientX, C.clientY), ue = gt(G.x, G.y, _.x, _.y, Y) || b && gt(G.x, G.y, b.x, b.y, Y);
          (gt(G.x, G.y, S.x, S.y, Y) || E && gt(G.x, G.y, E.x, E.y, Y)) && (U === !0 || U === "target") ? W = "target" : ue && (U === !0 || U === "source") && (W = "source");
        }
        if (!W) {
          const G = (ue) => {
            document.removeEventListener("pointerup", G), M(ue);
          };
          document.addEventListener("pointerup", G, { once: !0 });
          return;
        }
        const re = C.clientX, q = C.clientY;
        let V = !1, j = !1, Z = null;
        const te = O._config?.connectionSnapRadius ?? 20;
        let F = null, J = null, ee = null, Q = re, se = q;
        const ne = e.closest(".flow-container");
        if (!ne) return;
        const ce = W === "target" ? _ : S, ie = () => {
          V = !0, a.classList.add("flow-edge-reconnecting"), O._emit("reconnect-start", { edge: N, handleType: W }), B("reconnect", `Reconnection drag started on edge "${N.id}" (${W} end)`), J = Kt({
            connectionLineType: O._config?.connectionLineType,
            connectionLineStyle: O._config?.connectionLineStyle,
            connectionLine: O._config?.connectionLine,
            containerEl: a.closest(".flow-container") ?? void 0
          }), F = J.svg;
          const G = O.screenToFlowPosition(re, q);
          J.update({
            fromX: ce.x,
            fromY: ce.y,
            toX: G.x,
            toY: G.y,
            source: N.source,
            sourceHandle: N.sourceHandle
          });
          const ue = ne.querySelector(".flow-viewport");
          ue && ue.appendChild(F), W === "target" && (O.pendingConnection = {
            source: N.source,
            sourceHandle: N.sourceHandle,
            position: G
          }), O._pendingReconnection = {
            edge: N,
            draggedEnd: W,
            anchorPosition: { ...ce },
            position: G
          }, ee = To(ne, O, Q, se), W === "target" && Pn(ne, N.source, N.sourceHandle ?? "source", O, N.id);
        }, oe = (G) => {
          if (Q = G.clientX, se = G.clientY, !V) {
            Math.sqrt(
              (G.clientX - re) ** 2 + (G.clientY - q) ** 2
            ) >= uo && ie();
            return;
          }
          const ue = O.screenToFlowPosition(G.clientX, G.clientY), me = Mn({
            containerEl: ne,
            handleType: W === "target" ? "target" : "source",
            excludeNodeId: W === "target" ? N.source : N.target,
            cursorFlowPos: ue,
            connectionSnapRadius: te,
            getNode: (_e) => O.getNode(_e),
            toFlowPosition: (_e, Ve) => O.screenToFlowPosition(_e, Ve)
          });
          me.element !== Z && (Z?.classList.remove("flow-handle-active"), me.element?.classList.add("flow-handle-active"), Z = me.element), J?.update({
            fromX: ce.x,
            fromY: ce.y,
            toX: me.position.x,
            toY: me.position.y,
            source: N.source,
            sourceHandle: N.sourceHandle
          });
          const Ee = me.position;
          W === "target" && O.pendingConnection && (O.pendingConnection = {
            ...O.pendingConnection,
            position: Ee
          }), O._pendingReconnection && (O._pendingReconnection = {
            ...O._pendingReconnection,
            position: Ee
          }), ee?.updatePointer(G.clientX, G.clientY);
        }, ge = () => {
          j || (j = !0, document.removeEventListener("pointermove", oe), document.removeEventListener("pointerup", he), ee?.stop(), ee = null, J?.destroy(), J = null, F = null, Z?.classList.remove("flow-handle-active"), A = null, a.classList.remove("flow-edge-reconnecting"), Me(ne), O.pendingConnection = null, O._pendingReconnection = null);
        }, he = async (G) => {
          if (!V) {
            ge(), M(G);
            return;
          }
          if (O._connectValidating) return;
          let ue = Z, me = null;
          if (!ue) {
            me = document.elementFromPoint(G.clientX, G.clientY);
            const pe = W === "target" ? '[data-flow-handle-type="target"]' : '[data-flow-handle-type="source"]';
            ue = me?.closest(pe);
          }
          const _e = (ue ? ue.closest("[data-flow-node-id]") : me?.closest("[data-flow-node-id]"))?.dataset.flowNodeId, Ve = ue?.dataset.flowHandleId, Xe = J?.svg ?? null;
          Pt(Xe, !0);
          let Ce;
          try {
            Ce = await Bp({
              dropNodeId: _e,
              dropHandleId: Ve,
              draggedEnd: W,
              edge: N,
              canvas: O,
              containerEl: ne
            });
          } finally {
            Pt(Xe, !1);
          }
          Ce.applied ? B("reconnect", `Edge "${N.id}" reconnected (${W})`, Ce.newConnection) : B("reconnect", `Edge "${N.id}" reconnection cancelled — snapping back`, { reason: Ce.reason }), O._emit("reconnect-end", { edge: N, successful: Ce.applied }), ge();
        };
        document.addEventListener("pointermove", oe), document.addEventListener("pointerup", he), A = ge;
      };
      a.addEventListener("pointerdown", v);
      const w = (C) => {
        const N = o(n);
        if (!N) return;
        const O = t.$data(e.closest("[x-data]"));
        if (!O) return;
        const Y = O._config?.edgesReconnectable !== !1, K = N.reconnectable ?? !0;
        if (!Y || K === !1 || !_ || !S) {
          a.style.removeProperty("cursor"), r.style.cursor = "pointer";
          return;
        }
        const U = O._config?.reconnectSnapRadius ?? ms, W = O.screenToFlowPosition(C.clientX, C.clientY), re = (gt(W.x, W.y, _.x, _.y, U) || b && gt(W.x, W.y, b.x, b.y, U)) && (K === !0 || K === "source"), q = (gt(W.x, W.y, S.x, S.y, U) || E && gt(W.x, W.y, E.x, E.y, U)) && (K === !0 || K === "target");
        re || q ? (a.style.cursor = "grab", r.style.cursor = "grab") : (a.style.removeProperty("cursor"), r.style.cursor = "pointer");
      };
      a.addEventListener("pointermove", w);
      const T = (C) => {
        if (C.key !== "Enter" && C.key !== " ") return;
        C.preventDefault(), C.stopPropagation();
        const N = o(n);
        if (!N) return;
        const O = t.$data(e.closest("[x-data]"));
        O && (O._emit("edge-click", { edge: N, event: C }), gi(N, O._config?.edgesSelectable !== !1) && (xt(C, O._shortcuts?.multiSelect) ? O.selectedEdges.has(N.id) ? (O.selectedEdges.delete(N.id), N.selected = !1) : (O.selectedEdges.add(N.id), N.selected = !0) : (O.deselectAll(), O.selectedEdges.add(N.id), N.selected = !0), O._emitSelectionChange()));
      };
      a.addEventListener("keydown", T);
      const P = () => {
        a.matches(":focus-visible") && a.classList.add("flow-edge-focused");
      }, $ = () => a.classList.remove("flow-edge-focused");
      a.addEventListener("focus", P), a.addEventListener("blur", $);
      const H = (C) => {
        C.stopPropagation();
      };
      a.addEventListener("mousedown", H);
      const z = () => {
        for (const C of [c, d, f])
          C && C.classList.add("flow-edge-hovered");
      }, I = () => {
        for (const C of [c, d, f])
          C && C.classList.remove("flow-edge-hovered");
      };
      a.addEventListener("mouseenter", z), a.addEventListener("mouseleave", I), i(() => {
        const C = o(n);
        if (!C || !l) return;
        a.setAttribute("data-flow-edge-id", C.id);
        const N = t.$data(e.closest("[x-data]"));
        if (!N?.nodes) return;
        const O = Tn(N), Y = C.type ?? N._config?.defaultEdgeType ?? "bezier", K = N._config?.edgeLod;
        let U = Y;
        if (K) {
          const X = N._zoomLevel;
          (K.simplifyAt === "medium" && X === "medium" || X === "far") && (U = "straight");
        }
        N._layoutAnimTick, N._edgeDirtyTicks?.get(C.id);
        const W = N.getNode(C.source), re = N.getNode(C.target);
        if (!W || !re) return;
        W.sourcePosition, re.targetPosition;
        const q = dt(W, N._nodeMap, N._config?.nodeOrigin), V = dt(re, N._nodeMap, N._config?.nodeOrigin), j = e.closest("[x-data]");
        let Z, te, F, J;
        const ee = N._schemaMetrics, Q = N._config?.nodeOrigin, se = Y !== "floating" && N._config?.schemaHandleGeometry !== "dom" && ee && (!Q || Q[0] === 0 && Q[1] === 0) ? Yp(
          W,
          re,
          q,
          V,
          C.sourceHandle,
          C.targetHandle,
          N._nodeElements,
          ee
        ) : null;
        if (Y === "floating") {
          const X = Ja(q, V);
          Z = X.sourcePos, te = X.targetPos, F = { x: X.sx, y: X.sy, handleWidth: 0, handleHeight: 0 }, J = { x: X.tx, y: X.ty, handleWidth: 0, handleHeight: 0 }, _ = { x: X.sx, y: X.sy }, S = { x: X.tx, y: X.ty };
        } else if (se)
          Z = se.sourcePos, te = se.targetPos, F = se.srcMeasurement, J = se.tgtMeasurement, _ = { x: F.x, y: F.y }, S = { x: J.x, y: J.y };
        else {
          const X = N._nodeElements?.get(C.source) ?? j.querySelector(`[data-flow-node-id="${CSS.escape(C.source)}"]`), ae = N._nodeElements?.get(C.target) ?? j.querySelector(`[data-flow-node-id="${CSS.escape(C.target)}"]`), de = X ? ar(X.getBoundingClientRect()) : void 0, le = ae ? ar(ae.getBoundingClientRect()) : void 0;
          Z = Eo(j, C.source, C.sourceHandle, "source", W, le, X), te = Eo(j, C.target, C.targetHandle, "target", re, de, ae);
          const fe = t.raw(N).viewport ?? { x: 0, y: 0, zoom: 1 }, ye = fe.zoom || 1, xe = W.rotation, Ae = re.rotation;
          Z = rr(Z, xe), te = rr(te, Ae), F = ur(j, C.source, q, C.sourceHandle, "source", ye, fe, le, X), J = ur(j, C.target, V, C.targetHandle, "target", ye, fe, de, ae);
          const Re = Qt(q, Z, N._shapeRegistry, N._config?.nodeOrigin), Pe = Qt(V, te, N._shapeRegistry, N._config?.nodeOrigin);
          _ = F ?? Re, S = J ?? Pe;
        }
        let ne = Vt(F ?? _, Z, F, C.markerStart), ce = Vt(J ?? S, te, J, C.markerEnd);
        if (Y === "orthogonal" || Y === "avoidant") {
          const X = t.raw(N._endpointSpreadGrouping);
          if (X) {
            const ae = yo(W.endpointSpread ?? N._config?.avoidantEndpointSpread);
            if (ae !== null) {
              const le = X.get(`${C.source}|${C.sourceHandle ?? ""}`), fe = le?.lanes.get(C.id);
              if (le && fe !== void 0 && le.count > 1) {
                const ye = N._schemaMetrics?.rowHeight ?? F?.handleHeight ?? 0;
                ne = Vs(ne, Z, zs(fe, le.count, ye, ae));
              }
            }
            const de = yo(re.endpointSpread ?? N._config?.avoidantEndpointSpread);
            if (de !== null) {
              const le = X.get(`${C.target}|${C.targetHandle ?? ""}`), fe = le?.lanes.get(C.id);
              if (le && fe !== void 0 && le.count > 1) {
                const ye = N._schemaMetrics?.rowHeight ?? J?.handleHeight ?? 0;
                ce = Vs(ce, te, zs(fe, le.count, ye, de));
              }
            }
          }
        }
        b = ne, E = ce;
        let ie;
        if (Y === "orthogonal" || Y === "avoidant")
          if (N._config?.avoidantSimplifyOnDrag !== !1 && (N._draggingNodeIds?.has(C.source) || N._draggingNodeIds?.has(C.target)))
            ie = void 0;
          else {
            const ae = t.raw(N._obstacleSnapshot);
            if (ae)
              ie = ae.filter((de) => de.id !== C.source && de.id !== C.target);
            else {
              const de = t.raw(N.nodes), le = new Map(de.map((ye) => [ye.id, ye])), fe = N._config?.nodeOrigin;
              ie = de.filter((ye) => ye.id !== C.source && ye.id !== C.target).map((ye) => {
                const xe = dt(ye, le, fe);
                return {
                  x: xe.position.x,
                  y: xe.position.y,
                  width: xe.dimensions?.width ?? we,
                  height: xe.dimensions?.height ?? be
                };
              });
            }
          }
        let oe = 0;
        (Y === "orthogonal" || Y === "avoidant") && (oe = t.raw(N._crossingPlan)?.get(C.id) ?? 0);
        const ge = U === Y ? C : { ...C, type: U }, { path: he, labelPosition: G } = bo(ge, q, V, Z, te, ne, ce, N._config?.edgeTypes, ie, N._shapeRegistry, N._config?.nodeOrigin, N._config?.defaultEdgeType, oe);
        l.setAttribute("d", he), r.setAttribute("d", he), (Y === "orthogonal" || Y === "avoidant") && t.raw(N._edgeCorridors)?.set(C.id, {
          minX: Math.min(ne.x, ce.x),
          minY: Math.min(ne.y, ce.y),
          maxX: Math.max(ne.x, ce.x),
          maxY: Math.max(ne.y, ce.y)
        });
        const ue = Y === "editable", me = ue && (C.showControlPoints || C.selected);
        if (a.querySelectorAll(".flow-edge-control-point, .flow-edge-midpoint").forEach((X) => X.remove()), me) {
          const X = C.controlPoints ?? [], ae = N.viewport?.zoom ?? 1, de = 6 / ae, le = 5 / ae, fe = _ ?? { x: 0, y: 0 }, ye = S ?? { x: 0, y: 0 }, xe = [fe, ...X, ye], Ae = xe.length - 1, Re = l.getTotalLength?.() ?? 0;
          if (Re > 0) {
            const Pe = [0], Se = 200;
            let on = 1;
            for (let tt = 1; tt <= Se && on < xe.length; tt++) {
              const Rn = tt / Se * Re, sn = l.getPointAtLength(Rn), Ke = xe[on], rn = sn.x - Ke.x, Gi = sn.y - Ke.y;
              rn * rn + Gi * Gi < 25 && (Pe.push(Rn), on++);
            }
            for (; Pe.length <= Ae; )
              Pe.push(Re);
            for (let tt = 0; tt < Ae; tt++) {
              const Rn = (Pe[tt] + Pe[tt + 1]) / 2, sn = l.getPointAtLength(Rn), Ke = document.createElementNS("http://www.w3.org/2000/svg", "circle");
              Ke.classList.add("flow-edge-midpoint"), Ke.setAttribute("cx", String(sn.x)), Ke.setAttribute("cy", String(sn.y)), Ke.setAttribute("r", String(le)), Ke.dataset.segmentIndex = String(tt);
              const rn = document.createElementNS("http://www.w3.org/2000/svg", "title");
              rn.textContent = O("a11y.addControlPoint"), Ke.appendChild(rn), a.appendChild(Ke);
            }
          }
          for (let Pe = 0; Pe < X.length; Pe++) {
            const Se = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            Se.classList.add("flow-edge-control-point"), Se.setAttribute("cx", String(X[Pe].x)), Se.setAttribute("cy", String(X[Pe].y)), Se.setAttribute("r", String(de)), Se.dataset.pointIndex = String(Pe), a.appendChild(Se);
          }
        }
        if (r.style.cursor = ue ? "crosshair" : "pointer", r.style.strokeWidth = String(
          C.interactionWidth ?? N._config?.defaultInteractionWidth ?? 20
        ), C.markerStart != null) {
          const X = Yt(C.markerStart), ae = Xt(X, N._id);
          l.setAttribute("marker-start", `url(#${ae})`);
        } else if (C._renderDualMarker && C.markerEnd) {
          const X = Yt(C.markerEnd), ae = Xt(X, N._id);
          l.setAttribute("marker-start", `url(#${ae})`);
        } else
          l.removeAttribute("marker-start");
        if (C.markerEnd) {
          const X = Yt(C.markerEnd), ae = Xt(X, N._id);
          l.setAttribute("marker-end", `url(#${ae})`);
        } else
          l.removeAttribute("marker-end");
        const Ee = C.strokeWidth ?? 1.5, _e = qp(C.animated);
        switch (_e !== g && (l.classList.remove("flow-edge-animated", "flow-edge-pulse"), g === "dot" && k(), g = _e), _e) {
          case "dash":
            l.classList.add("flow-edge-animated");
            break;
          case "pulse":
            l.classList.add("flow-edge-pulse");
            break;
          case "dot":
            x(a, he, j, C, C.animationDuration);
            break;
        }
        if (C.animationDuration && _e !== "none" ? (_e === "dash" || _e === "pulse") && (l.style.animationDuration = C.animationDuration) : (_e === "dash" || _e === "pulse") && l.style.removeProperty("animation-duration"), y && y !== C.class && a.classList.remove(...y.split(" ").filter(Boolean)), C.class) {
          const X = _e === "dash" ? " flow-edge-animated" : _e === "pulse" ? " flow-edge-pulse" : "";
          l.setAttribute("class", C.class + X), a.classList.add(...C.class.split(" ").filter(Boolean)), y = C.class;
        } else
          y && (a.classList.remove(...y.split(" ").filter(Boolean)), y = null);
        if (a.setAttribute("aria-selected", String(!!C.selected)), C.selected)
          a.classList.add("flow-edge-selected"), l.style.strokeWidth = String(Math.max(Ee + 1, 2.5)), l.style.stroke = "var(--flow-edge-stroke-selected, " + Sn + ")";
        else {
          a.classList.remove("flow-edge-selected"), l.style.strokeWidth = String(Ee);
          const X = N._markerDefsEl?.querySelector("defs") ?? null;
          if (xi(C.color)) {
            if (X) {
              const ae = to(N._id, C.id), de = C.gradientDirection === "target-source", le = _.x, fe = _.y, ye = S.x, xe = S.y;
              Qa(
                X,
                ae,
                de ? { from: C.color.to, to: C.color.from } : C.color,
                le,
                fe,
                ye,
                xe
              ), l.style.stroke = `url(#${ae})`, m = ae;
            }
          } else if (C.color) {
            if (m) {
              const ae = X;
              ae && Uo(ae, m), m = null;
            }
            l.style.stroke = C.color;
          } else {
            if (m) {
              const ae = X;
              ae && Uo(ae, m), m = null;
            }
            l.style.removeProperty("stroke");
          }
        }
        if (!C.selected && ((C.sourceHandle ? N.selectedRows?.has(C.sourceHandle.replace(/-[lr]$/, "")) : !1) || (C.targetHandle ? N.selectedRows?.has(C.targetHandle.replace(/-[lr]$/, "")) : !1)) ? (a.classList.add("flow-edge-row-highlighted"), C.selected || (l.style.strokeWidth = String(Math.max(Ee + 0.5, 2)), l.style.stroke = getComputedStyle(a.closest(".flow-container")).getPropertyValue("--flow-edge-row-highlight-color").trim() || "#3b82f6")) : a.classList.remove("flow-edge-row-highlighted"), C.focusable ?? N._config?.edgesFocusable !== !1 ? (a.setAttribute("tabindex", "0"), a.setAttribute("role", C.ariaRole ?? "group"), a.setAttribute("aria-label", C.ariaLabel ?? (C.label ? O("a11y.edgeLabel", { label: C.label }) : O("a11y.edgeEndpoints", { source: C.source, target: C.target })))) : (a.removeAttribute("tabindex"), a.removeAttribute("role"), a.removeAttribute("aria-label")), C.domAttributes)
          for (const [X, ae] of Object.entries(C.domAttributes))
            X.startsWith("on") || Vp.has(X.toLowerCase()) || a.setAttribute(X, ae);
        const Ce = (X, ae, de, le, fe, ye) => {
          if (ae) {
            if (!X && le) {
              const xe = de.includes("flow-edge-label-start"), Ae = de.includes("flow-edge-label-end");
              let Re = `[data-flow-edge-id="${fe}"].flow-edge-label`;
              xe ? Re += ".flow-edge-label-start" : Ae ? Re += ".flow-edge-label-end" : Re += ":not(.flow-edge-label-start):not(.flow-edge-label-end)", X = le.querySelector(Re);
            }
            return X || (X = document.createElement("div"), X.className = de, X.dataset.flowEdgeId = fe, le && le.appendChild(X)), ye ? X.innerHTML !== ae && (X.innerHTML = ae) : X.textContent !== ae && (X.textContent = ae), X;
          }
          return X && X.remove(), null;
        }, pe = e.closest(".flow-viewport"), Le = C.labelVisibility ?? "always", De = C.labelHtml === !0, Ne = () => {
          const X = l.getAttribute("d") ?? "";
          return X !== u && (u = X, h = typeof l.getTotalLength == "function" && l.getTotalLength() || 0), h;
        };
        if (c = Ce(c, C.label, "flow-edge-label", pe, C.id, De), c) {
          const X = Ne();
          if (X > 0) {
            const ae = C.labelPosition ?? 0.5, de = Xp(l, ae, X);
            c.style.left = `${de.x}px`, c.style.top = `${de.y}px`;
          } else
            c.style.left = `${G.x}px`, c.style.top = `${G.y}px`;
        }
        if (d = Ce(d, C.labelStart, "flow-edge-label flow-edge-label-start", pe, C.id, De), d) {
          const X = Ne();
          if (X > 0) {
            const ae = C.labelStartOffset ?? 30, de = l.getPointAtLength(Math.min(ae, X / 2));
            d.style.left = `${de.x}px`, d.style.top = `${de.y}px`;
          }
        }
        if (f = Ce(f, C.labelEnd, "flow-edge-label flow-edge-label-end", pe, C.id, De), f) {
          const X = Ne();
          if (X > 0) {
            const ae = C.labelEndOffset ?? 30, de = l.getPointAtLength(Math.max(X - ae, X / 2));
            f.style.left = `${de.x}px`, f.style.top = `${de.y}px`;
          }
        }
        for (const X of [c, d, f])
          X && (X.classList.toggle("flow-edge-label-hover", Le === "hover"), X.classList.toggle("flow-edge-label-on-select", Le === "selected"), X.classList.toggle("flow-edge-label-selected", !!C.selected), C.class ? X.classList.add(...C.class.split(" ").filter(Boolean)) : y && X.classList.remove(...y.split(" ").filter(Boolean)));
      }), s(() => {
        if (m) {
          const N = t.$data(e.closest("[x-data]"))?._markerDefsEl?.querySelector("defs");
          N && Uo(N, m);
        }
        A?.(), k(), a.removeEventListener("contextmenu", R), a.removeEventListener("dblclick", L), a.removeEventListener("pointerdown", D, !0), a.removeEventListener("pointerdown", v), a.removeEventListener("pointermove", w), a.removeEventListener("keydown", T), a.removeEventListener("focus", P), a.removeEventListener("blur", $), a.removeEventListener("mousedown", H), a.removeEventListener("mouseenter", z), a.removeEventListener("mouseleave", I), c?.remove(), d?.remove(), f?.remove();
      });
    }
  );
}
function Up(t, e) {
  return {
    /** Write node positions directly to DOM elements (bypassing Alpine effects). */
    _flushNodePositions(n) {
      for (const o of n) {
        const i = t.getNode(o);
        if (!i) continue;
        const s = t._nodeElements.get(o);
        if (!s) continue;
        const a = e.raw(i), r = a.parentId ? t.getAbsolutePosition(o) : a.position, l = a.nodeOrigin ?? t._config.nodeOrigin ?? [0, 0], c = a.dimensions?.width ?? 150, d = a.dimensions?.height ?? 40;
        s.style.left = r.x - c * l[0] + "px", s.style.top = r.y - d * l[1] + "px";
      }
    },
    /** Write node styles directly to DOM elements (bypassing Alpine effects). */
    _flushNodeStyles(n) {
      for (const o of n) {
        const i = t.getNode(o);
        if (!i) continue;
        const s = t._nodeElements.get(o);
        if (!s) continue;
        const r = e.raw(i).style;
        if (!r) continue;
        const l = typeof r == "string" ? kn(r) : r;
        for (const [c, d] of Object.entries(l))
          s.style.setProperty(c, d);
      }
    },
    /** Write edge color/strokeWidth directly to SVG elements (bypassing Alpine effects). */
    _flushEdgeStyles(n) {
      for (const o of n) {
        const i = t.getEdge(o);
        if (!i) continue;
        const s = e.raw(i), a = t.getEdgePathElement(o);
        a && (xi(s.color) ? a.style.stroke = `url(#${to(t._id, o)})` : typeof s.color == "string" && (a.style.stroke = s.color), s.strokeWidth !== void 0 && (a.style.strokeWidth = String(s.strokeWidth)));
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
    /**
     * Repaint one edge's gradient, for a colour change that moved nothing.
     *
     * Answers false where the edge has no def yet — an edge given a gradient for the first time —
     * and the caller falls back to the path refresh, which is what works the coordinates out.
     *
     * Its own entry point because the refresh is driven by which NODES moved: routing a colour
     * change through it re-paths every sibling edge on both endpoints, and re-paths them the way a
     * drag does, without obstacle avoidance, until the layout settles. On a plain graph that is
     * invisible; on an obstacle-routed one it straightens neighbours through the nodes they were
     * drawn around.
     */
    _restyleEdgeGradient(n, o) {
      const i = t._markerDefsEl?.querySelector("defs");
      if (!i)
        return !1;
      const a = t._edgeMap.get(n)?.gradientDirection === "target-source";
      return Op(
        i,
        to(t._id, n),
        a ? { from: o.to, to: o.from } : o
      );
    },
    /** Recompute SVG paths, label positions, and gradients for edges connected to the given node IDs. */
    _refreshEdgePaths(n) {
      for (const o of t.edges) {
        if (!n.has(o.source) && !n.has(o.target)) continue;
        const i = e.raw(t.getNode(o.source)), s = e.raw(t.getNode(o.target));
        if (!i || !s) continue;
        const a = dt(i, t._nodeMap, t._config.nodeOrigin), r = dt(s, t._nodeMap, t._config.nodeOrigin);
        let l, c, d, f;
        if (o.type === "floating") {
          const h = Ja(a, r);
          d = { x: h.sx, y: h.sy }, f = { x: h.tx, y: h.ty };
          const p = Vt(d, h.sourcePos, null, o.markerStart), g = Vt(f, h.targetPos, null, o.markerEnd), m = bo(o, a, r, h.sourcePos, h.targetPos, p, g, void 0, void 0, t._shapeRegistry, t._config.nodeOrigin);
          l = m.path, c = m.labelPosition;
        } else {
          const h = t._container;
          let p, g;
          if (h) {
            const S = h.querySelector(
              `[data-flow-node-id="${CSS.escape(o.source)}"]`
            ), b = h.querySelector(
              `[data-flow-node-id="${CSS.escape(o.target)}"]`
            );
            if (S) {
              const E = S.getBoundingClientRect();
              p = { x: (E.left + E.right) / 2, y: (E.top + E.bottom) / 2 };
            }
            if (b) {
              const E = b.getBoundingClientRect();
              g = { x: (E.left + E.right) / 2, y: (E.top + E.bottom) / 2 };
            }
          }
          const m = h ? Eo(h, o.source, o.sourceHandle, "source", i, g) : i?.sourcePosition ?? "bottom", y = h ? Eo(h, o.target, o.targetHandle, "target", s, p) : s?.targetPosition ?? "top";
          d = Qt(a, m, t._shapeRegistry, t._config.nodeOrigin), f = Qt(r, y, t._shapeRegistry, t._config.nodeOrigin);
          const x = Vt(d, m, null, o.markerStart), k = Vt(f, y, null, o.markerEnd), _ = bo(o, a, r, m, y, x, k, void 0, void 0, t._shapeRegistry, t._config.nodeOrigin);
          l = _.path, c = _.labelPosition;
        }
        const u = t.getEdgePathElement(o.id);
        if (u) {
          u.setAttribute("d", l);
          const p = u.parentElement?.querySelector("path:first-child");
          p && p !== u && p.setAttribute("d", l);
        }
        if (xi(o.color)) {
          const h = t._markerDefsEl?.querySelector("defs");
          if (h) {
            const p = to(t._id, o.id), g = o.gradientDirection === "target-source";
            Qa(
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
function Gp(t) {
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
              da(!!i);
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
              t._config.colorMode = i, i && t._container ? t._colorModeHandle ? t._colorModeHandle.update(i) : t._colorModeHandle = Ba(t._container, i) : !i && t._colorModeHandle && (t._colorModeHandle.destroy(), t._colorModeHandle = null);
              break;
            case "autoLayout":
              n.autoLayout = i || void 0, t._autoLayoutFailed = !1, i ? (t._autoLayoutReady = !0, t._scheduleAutoLayout()) : (t._autoLayoutReady = !1, t._autoLayoutTimer && (clearTimeout(t._autoLayoutTimer), t._autoLayoutTimer = null));
              break;
          }
      ("minimapWidth" in e || "minimapHeight" in e) && t.resizeMinimap(
        n.minimapWidth ?? va,
        n.minimapHeight ?? ba
      );
    }
  };
}
let Zp = 0;
function Kp(t, e) {
  switch (t) {
    case "lines":
    case "cross":
      return `linear-gradient(0deg, ${e} 1px, transparent 1px), linear-gradient(90deg, ${e} 1px, transparent 1px)`;
    default:
      return `radial-gradient(circle, ${e} 1px, transparent 1px)`;
  }
}
function Jp(t, e) {
  return t ? !(t.maxX < e.minX || t.minX > e.maxX || t.maxY < e.minY || t.minY > e.maxY) : !0;
}
const Qp = ".flow-panel, .flow-controls, .flow-minimap, .canvas-overlay";
function fr(t) {
  return t != null && t.closest(Qp) != null;
}
function em(t) {
  t.data("flowCanvas", (e = {}) => {
    const n = xa(e.translations, e.locale), o = {
      // ── Reactive State ────────────────────────────────────────────────
      /** Unique instance ID for SVG marker dedup, etc. */
      _id: `flow-${++Zp}`,
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
      _loadingText: e.loadingText ?? n("canvas.loading"),
      /**
       * Translate a UI message for this canvas (`$flow.t('controls.zoomIn')` in templates).
       * Messages are resolved once at creation from `config.translations` + `config.locale`.
       */
      t(r, l) {
        return n(r, l);
      },
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
        /** The other half of a selection, so a menu bound to this can act on the whole of it. */
        edges: null,
        event: null
      },
      // ── Shape Registry ─────────────────────────────────────────────────
      _shapeRegistry: { ...Va, ...e.shapeTypes },
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
          const r = getComputedStyle(this._container).getPropertyValue("--flow-bg-pattern-gap").trim(), l = parseFloat(r);
          if (!isNaN(l))
            return this._bgGapCache = l, l;
        }
        return 20;
      },
      _resolveBackgroundLayers() {
        const r = this._background;
        if (!r || r === "none") return [];
        const l = this._getBackgroundGap(), c = this._patternColorOverride ?? "var(--flow-bg-pattern-color)";
        return Array.isArray(r) ? r.map((d) => ({
          variant: d.variant ?? "dots",
          gap: d.gap ?? l,
          color: d.color ?? c
        })) : [{ variant: r, gap: l, color: c }];
      },
      backgroundStyle() {
        const r = this._resolveBackgroundLayers();
        if (r.length === 0) return { backgroundImage: "", backgroundSize: "", backgroundPosition: "" };
        const l = this.viewport.zoom, c = this.viewport.x, d = this.viewport.y, f = [], u = [], h = [];
        for (const p of r) {
          const g = p.gap * l, m = p.variant === "cross" ? g / 2 : g;
          f.push(Kp(p.variant, p.color)), p.variant === "lines" || p.variant === "cross" ? (u.push(`${m}px ${m}px, ${m}px ${m}px`), h.push(`${c}px ${d}px, ${c}px ${d}px`)) : (u.push(`${g}px ${g}px`), h.push(`${c}px ${d}px`));
        }
        return {
          backgroundImage: f.join(", "),
          backgroundSize: u.join(", "),
          backgroundPosition: h.join(", ")
        };
      },
      // ── Internal ──────────────────────────────────────────────────────
      // Strip collab from stored config — provider objects may contain
      // circular references (e.g. InMemoryProvider.peer) that crash
      // Alpine's deep-reactive proxy walker.
      _config: (() => {
        const { collab: r, ...l } = e;
        return l;
      })(),
      _shortcuts: kh(e.keyboardShortcuts),
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
      _computeEngine: new dg(),
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
      _spatialGrid: new Nf(),
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
      _emit(r, l) {
        r !== "viewport-change" && r !== "viewport-move" && B("event", r, l);
        const c = "on" + r.split("-").map(
          (f) => f.charAt(0).toUpperCase() + f.slice(1)
        ).join(""), d = e[c];
        typeof d == "function" && d(l, this), this._container?.dispatchEvent(new CustomEvent(`flow-${r}`, {
          bubbles: !0,
          detail: l
        })), this._announcer?.handleEvent(r, l ?? {}), e.computeMode === "auto" && (r === "nodes-change" || r === "edges-change") && (this._computeDebounceTimer && clearTimeout(this._computeDebounceTimer), this._computeDebounceTimer = setTimeout(() => {
          this._computeDebounceTimer = null, this.compute();
        }, 16));
      },
      /** Route a warning through the onError callback (if set) and console.warn. */
      _warn(r, l) {
        typeof e.onError == "function" && e.onError(r, l), console.warn(`[AlpineFlow] ${l}`);
      },
      _emitSelectionChange() {
        this._emit("selection-change", {
          nodes: [...this.selectedNodes],
          edges: [...this.selectedEdges],
          rows: [...this.selectedRows]
        });
      },
      /**
       * The whole selection, as the objects rather than the ids.
       *
       * One place, because there is more than one way to open a menu on a selection — a right-click
       * on the pane, a right-click on one of the selected nodes, a long-press on a touch device —
       * and each of them used to gather this by hand. Three copies of two filters is how the touch
       * path came to send the nodes and forget the edges: a selection menu that can delete what the
       * author gathered, minus the half nobody told it about.
       */
      getSelectedNodesAndEdges() {
        return {
          nodes: this.nodes.filter((r) => this.selectedNodes.has(r.id)),
          edges: this.edges.filter((r) => this.selectedEdges.has(r.id))
        };
      },
      _rebuildNodeMap() {
        this._nodeMap = Fa(this.nodes), Kh(this._childrenIds, this.nodes);
      },
      _rebuildEdgeMap() {
        this._edgeMap = new Map(this.edges.map((r) => [r.id, r]));
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
      _commitNodeGeometry(r) {
        const l = t.raw(this._obstacleSnapshot), c = l ? l.slice() : null, d = t.raw(this.nodes), f = new Map(d.map((y) => [y.id, y])), u = this._config?.nodeOrigin, h = t.raw(this._spatialGrid);
        h.clear();
        const p = [];
        for (const y of d) {
          const x = dt(y, f, u), k = {
            id: y.id,
            x: x.position.x,
            y: x.position.y,
            width: x.dimensions?.width ?? we,
            height: x.dimensions?.height ?? be
          };
          h.insert(y.id, k.x, k.y, k.width, k.height), !y.hidden && p.push(k);
        }
        l ? (l.length = 0, l.push(...p)) : this._obstacleSnapshot = p, this._obstacleEpoch++, this._markDirtyEdges(r, c);
        const g = this._computeEndpointGrouping();
        g.size > 0 && this._markEdgesDirtyById(g);
        const m = this._computeCrossingPlan();
        m.size > 0 && this._markEdgesDirtyById(m);
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
        const r = /* @__PURE__ */ new Set(), l = yo(this._config?.avoidantEndpointSpread), c = t.raw(this.nodes), d = new Map(c.map((k) => [k.id, k])), f = this._config?.nodeOrigin, u = (k) => {
          const _ = d.get(k);
          if (!_) return 0;
          const S = dt(_, d, f);
          return S.position.y + (S.dimensions?.height ?? 0) / 2;
        }, h = (k) => {
          const _ = d.get(k)?.endpointSpread;
          return _ !== void 0 ? yo(_) !== null : l !== null;
        }, p = /* @__PURE__ */ new Map(), g = (k, _, S, b) => {
          if (!h(k)) return;
          const E = `${k}|${_ ?? ""}`;
          let M = p.get(E);
          M || (M = [], p.set(E, M)), M.push({ edgeId: S, sortKey: u(b) });
        }, m = t.raw(this.edges);
        for (const k of m) {
          const _ = k.type ?? this._config?.defaultEdgeType;
          _ !== "avoidant" && _ !== "orthogonal" || (g(k.source, k.sourceHandle, k.id, k.target), g(k.target, k.targetHandle, k.id, k.source));
        }
        const y = t.raw(this._endpointSpreadGrouping), x = /* @__PURE__ */ new Map();
        for (const [k, _] of p) {
          _.sort((E, M) => E.sortKey - M.sortKey || (E.edgeId < M.edgeId ? -1 : 1));
          const S = /* @__PURE__ */ new Map();
          _.forEach((E, M) => S.set(E.edgeId, M)), x.set(k, { count: _.length, lanes: S });
          const b = y?.get(k);
          for (const [E, M] of S)
            (!b || b.count !== _.length || b.lanes.get(E) !== M) && r.add(E);
        }
        if (y) {
          for (const [k, _] of y)
            if (!x.has(k))
              for (const S of _.lanes.keys()) r.add(S);
        }
        if (y) {
          y.clear();
          for (const [k, _] of x) y.set(k, _);
        } else
          this._endpointSpreadGrouping = x;
        return r;
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
        const r = /* @__PURE__ */ new Set(), l = Nh(this._config?.avoidantCrossingReduction), c = t.raw(this._crossingPlan), d = (_) => {
          const S = /* @__PURE__ */ new Set([...c?.keys() ?? [], ..._.keys()]);
          for (const b of S)
            (c?.get(b) ?? 0) !== (_.get(b) ?? 0) && r.add(b);
          if (c) {
            c.clear();
            for (const [b, E] of _) c.set(b, E);
          } else
            this._crossingPlan = _;
          return r;
        };
        if (l === null) return d(/* @__PURE__ */ new Map());
        const f = t.raw(this.nodes), u = new Map(f.map((_) => [_.id, _])), h = this._config?.nodeOrigin, p = t.raw(this._obstacleSnapshot) ?? [], g = (_) => {
          const S = u.get(_);
          if (!S) return { x: 0, y: 0 };
          const b = dt(S, u, h);
          return {
            x: b.position.x + (b.dimensions?.width ?? 0) / 2,
            y: b.position.y + (b.dimensions?.height ?? 0) / 2
          };
        }, m = t.raw(this.edges), y = [];
        for (const _ of m) {
          const S = _.type ?? this._config?.defaultEdgeType;
          if (S !== "avoidant" && S !== "orthogonal") continue;
          const b = g(_.source), E = g(_.target), M = Math.abs(E.x - b.x) >= Math.abs(E.y - b.y) ? E.x >= b.x ? "right" : "left" : E.y >= b.y ? "bottom" : "top", R = Math.abs(E.x - b.x) >= Math.abs(E.y - b.y) ? E.x >= b.x ? "left" : "right" : E.y >= b.y ? "top" : "bottom", L = p.filter((w) => w.id !== _.source && w.id !== _.target), D = Fi(b.x, b.y, M, E.x, E.y, R, L);
          if (!D) continue;
          const A = Ta(D);
          if (!A) continue;
          const v = A.axis === "h" ? (b.y + E.y) / 2 : (b.x + E.x) / 2;
          y.push({ edgeId: _.id, run: A, bary: v });
        }
        y.sort((_, S) => _.edgeId < S.edgeId ? -1 : _.edgeId > S.edgeId ? 1 : 0);
        const x = Math.max(8, l * 2), k = /* @__PURE__ */ new Map();
        for (const _ of Th(y, x))
          if (!(_.length < 2))
            for (const [S, b] of Ih(_, l))
              b !== 0 && k.set(S, b);
        return d(k);
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
      _markDirtyEdges(r, l) {
        const c = this._edgeDirtyTicks, d = t.raw(c), f = t.raw(this.edges), u = t.raw(this._edgeCorridors), h = t.raw(this._obstacleSnapshot), p = (y) => {
          c.set(y, (d.get(y) ?? 0) + 1);
        };
        if (!r || r.length === 0) {
          const y = /* @__PURE__ */ new Set();
          for (const x of f)
            y.add(x.id), p(x.id);
          for (const x of [...d.keys()])
            y.has(x) || d.delete(x);
          for (const x of [...u.keys()])
            y.has(x) || u.delete(x);
          return;
        }
        const g = new Set(r), m = [];
        for (const y of g) {
          const x = h?.find((_) => _.id === y);
          x && m.push(x);
          const k = l?.find((_) => _.id === y);
          k && m.push(k);
        }
        for (const y of f) {
          let x = g.has(y.source) || g.has(y.target);
          if (!x) {
            const k = u.get(y.id);
            if (k) {
              for (const _ of m)
                if (_.x < k.maxX + _t && _.x + _.width > k.minX - _t && _.y < k.maxY + _t && _.y + _.height > k.minY - _t) {
                  x = !0;
                  break;
                }
            } else
              x = !0;
          }
          x && p(y.id);
        }
      },
      /**
       * Bump the routing dirty tick for a specific set of edge ids (WS-2 re-lane).
       * Reuses the SAME tick-bump `_markDirtyEdges` uses: `.set()` on the REACTIVE
       * Map so edge effects reading `_edgeDirtyTicks.get(edge.id)` are notified.
       */
      _markEdgesDirtyById(r) {
        const l = this._edgeDirtyTicks, c = t.raw(l);
        for (const d of r)
          l.set(d, (c.get(d) ?? 0) + 1);
      },
      /**
       * Hydrate from a pre-rendered static diagram.
       * Reads the render plan from data-flow-plan, populates node dimensions and
       * viewport from it, then strips the static markers so normal reactivity takes over.
       */
      _hydrateFromStatic() {
        const r = this._container.getAttribute("data-flow-plan");
        if (!r) return;
        let l;
        try {
          l = JSON.parse(r);
        } catch {
          return;
        }
        const c = /* @__PURE__ */ new Map();
        for (const d of l.nodes ?? [])
          c.set(d.id, { width: d.width, height: d.height });
        for (const d of this.nodes) {
          const f = c.get(d.id);
          f && !d.dimensions && (d.dimensions = { width: f.width, height: f.height }, this._initialDimensions.set(d.id, { ...f }));
        }
        l.viewport && (this.viewport.x = l.viewport.x, this.viewport.y = l.viewport.y, this.viewport.zoom = l.viewport.zoom), this._hydratedFromStatic = !0, this._container.removeAttribute("data-flow-static"), this._container.removeAttribute("data-flow-plan"), this._container.classList.remove("flow-static");
      },
      _captureHistory() {
        this._history?.capture({ nodes: this.nodes, edges: this.edges });
      },
      _snapshotHistory() {
        return this._history ? this._history.snapshot({ nodes: this.nodes, edges: this.edges }) : null;
      },
      _commitHistory(r) {
        r !== null && this._history?.commit(r);
      },
      _suspendHistory() {
        this._history?.suspend();
      },
      _resumeHistory() {
        this._history?.resume();
      },
      _applyBackground() {
        const r = this._container;
        if (!r) return;
        const l = this.backgroundStyle();
        l.backgroundImage !== this._lastBgImage && (r.style.backgroundImage = l.backgroundImage, this._lastBgImage = l.backgroundImage), r.style.backgroundSize = l.backgroundSize, r.style.backgroundPosition = l.backgroundPosition;
      },
      /**
       * d3-zoom transform handler. Runs on every wheel/pan event (120Hz+ on
       * trackpads). Only the transform write needs event-rate latency; the reactive
       * viewport write plus every side-effect (background, culling, zoom-level,
       * context-menu, events) is coalesced to a single flush per animation frame.
       */
      _onViewportTransform(r) {
        this._viewportLive = r, this._viewportEl && (this._viewportEl.style.transform = `translate(${r.x}px, ${r.y}px) scale(${r.zoom})`), this._vpFrame === null && (this._vpFrame = requestAnimationFrame(() => {
          this._vpFrame = null, this._flushViewportFrame();
        }));
      },
      /**
       * Apply the coalesced viewport state and its side-effects once per frame.
       * Reactive `viewport` is written here (not per event), so consumers watching
       * `viewport` re-run at frame rate rather than per wheel event.
       */
      _flushViewportFrame() {
        const r = this._viewportLive;
        r && (this.viewport.x = r.x, this.viewport.y = r.y, this.viewport.zoom = r.zoom, this._applyBackground(), this._applyCulling(), this._applyZoomLevel(r.zoom), this.contextMenu.show && this.closeContextMenu(), this._emit("viewport-change", { viewport: { ...r } }), this._vpMoved && (this._vpMoved = !1, this._emit("viewport-move", { viewport: { ...r } })));
      },
      /**
       * Gesture end (user released the wheel/pointer). Commit the end-state
       * synchronously so it is never a frame late, cancelling any pending frame.
       */
      _onViewportMoveEnd(r) {
        this._vpFrame !== null && (cancelAnimationFrame(this._vpFrame), this._vpFrame = null), this._flushViewportFrame(), this._emit("viewport-move-end", { viewport: { ...r } });
      },
      /**
       * Toggle CSS display on off-screen nodes and edges.
       * Called from _flushViewportFrame — entirely outside Alpine's reactive system.
       * Writes are gated to visibility TRANSITIONS only (comparing against the
       * previous frame's `_visibleNodeIds`/`_culledEdgeIds`) to avoid unconditional
       * per-frame style writes, which devtools amplifies into mutation-record churn.
       */
      _applyCulling() {
        const r = e.viewportCulling ?? "auto";
        if (!(r === !0 || r === "auto" && this.nodes.length >= (e.cullingAutoThreshold ?? 150))) {
          this._cullingWasActive && this._uncullEverything();
          return;
        }
        if (this._cullingWasActive = !0, !this._container) return;
        const c = this._container.clientWidth, d = this._container.clientHeight;
        if (c === 0 || d === 0) return;
        const f = e.cullingBuffer ?? 100, u = Pf(this.viewport, c, d, f), p = t.raw(this._spatialGrid).query(u), g = this._draggingNodeIds, m = /* @__PURE__ */ new Set(), y = (_) => {
          const S = this._nodeMap.get(_);
          if (!S || S.hidden) return;
          const b = S.dimensions?.width ?? 150, E = S.dimensions?.height ?? 50, M = S.parentId ? pi(S, this._nodeMap, this._config.nodeOrigin) : S.position;
          !(M.x + b < u.minX || M.x > u.maxX || M.y + E < u.minY || M.y > u.maxY) && m.add(_);
        };
        for (const _ of p) y(_);
        if (g)
          for (const _ of g)
            p.has(_) || y(_);
        for (const [_, S] of this._nodeElements) {
          const b = m.has(_) ? "" : "none";
          S.style.display !== b && (S.style.display = b);
        }
        const x = this._culledEdgeIds, k = /* @__PURE__ */ new Set();
        for (const [_, S] of this._edgeSvgElements) {
          const b = this._edgeMap.get(_);
          if (!b) continue;
          const E = this._nodeMap.get(b.source)?.hidden, M = this._nodeMap.get(b.target)?.hidden;
          if (b.hidden || b._hiddenByCollapse || E || M)
            continue;
          const R = m.has(b.source) || m.has(b.target) || Jp(this._edgeCorridors.get(_), u), L = !x.has(_);
          R !== L && (S.style.display = R ? "" : "none"), R || k.add(_);
        }
        this._visibleNodeIds = m, this._culledEdgeIds = k;
      },
      /**
       * Restore CSS display on every element culling could have hidden and
       * reset the tracking sets, so a future re-activation of `_applyCulling`
       * starts clean. Called when the `viewportCulling: 'auto'` gate
       * deactivates (node count drops back below `cullingAutoThreshold`) after
       * having been active, or when culling is otherwise turned off.
       */
      _uncullEverything() {
        for (const r of this._nodeElements.values()) r.style.display = "";
        for (const r of this._culledEdgeIds) {
          const l = this._edgeSvgElements.get(r);
          l && (l.style.display = "");
        }
        this._visibleNodeIds = /* @__PURE__ */ new Set(), this._culledEdgeIds = /* @__PURE__ */ new Set(), this._cullingWasActive = !1;
      },
      _getVisibleNodeIds() {
        return this._visibleNodeIds;
      },
      _applyZoomLevel(r) {
        if (e.zoomLevels === !1) return;
        const l = e.zoomLevels?.far ?? 0.4, c = e.zoomLevels?.medium ?? 0.75, d = r < l ? "far" : r < c ? "medium" : "close";
        d !== this._zoomLevel && (this._zoomLevel = d, this._container?.setAttribute("data-zoom-level", d));
      },
      getAbsolutePosition(r) {
        const l = this._nodeMap.get(r);
        return l ? pi(l, this._nodeMap, this._config.nodeOrigin) : { x: 0, y: 0 };
      },
      // ── Init Helpers ─────────────────────────────────────────────────
      /** Enable debug logging if configured. */
      _initDebug() {
        e.debug && da(!0);
      },
      /** Set up container element, attributes, CSS custom properties, animator. */
      _initContainer() {
        this._container = this.$el, this._container.setAttribute("data-flow-canvas", ""), e.fitViewOnInit && this._container.setAttribute("data-fit-view", ""), this._container.setAttribute("role", "application"), this._container.setAttribute("aria-label", e.ariaLabel ?? this.t("canvas.label")), this._containerStyles = getComputedStyle(this._container), this._animator = new Bf(fo), e.patternColor && this._container.style.setProperty("--flow-bg-pattern-color", e.patternColor), e.backgroundGap && this._container.style.setProperty("--flow-bg-pattern-gap", String(e.backgroundGap));
        const r = e.containerHeight;
        if (r !== void 0 && r !== "auto") {
          let l = null;
          r === "fill" ? l = "100%" : typeof r == "number" && Number.isFinite(r) ? l = `${r}px` : typeof r == "string" && r.trim() && (l = r.trim()), l !== null && this._container.style.setProperty("--flow-container-height", l);
        }
        this._applyZoomLevel(this.viewport.zoom);
      },
      /** Create color mode handle if configured. */
      _initColorMode() {
        e.colorMode && (this._colorModeHandle = Ba(this._container, e.colorMode));
      },
      /** Hydrate from static HTML, sort nodes, rebuild maps, capture initial dimensions. */
      _initHydration() {
        this._container.hasAttribute("data-flow-static") && this._hydrateFromStatic(), this.nodes = Tt(this.nodes), this._rebuildNodeMap(), this._rebuildEdgeMap();
        for (const r of this.nodes)
          r.dimensions && this._initialDimensions.set(r.id, { ...r.dimensions });
      },
      /** Create FlowHistory if configured. */
      _initHistory() {
        e.history && (this._history = new $f(e.historyMaxSize ?? 50));
      },
      /** Create screen reader announcer. */
      _initAnnouncer() {
        if (e.announcements !== !1 && this._container) {
          const r = typeof e.announcements == "object" ? e.announcements.formatMessage : void 0;
          this._announcer = new cg(this._container, r, n);
        }
      },
      /** Set up collaboration bridge via collab addon plugin. */
      _initCollab() {
        if (e.collab && this._container) {
          const r = zt("collab");
          if (!r) {
            console.error("[AlpineFlow] Collaboration requires the collab plugin. Register it with: Alpine.plugin(AlpineFlowCollab)");
            return;
          }
          const l = this._container, { Doc: c, Awareness: d, CollabBridge: f, CollabAwareness: u } = r, h = e.collab, p = new c(), g = new d(p), m = new f(p, this, h.provider), y = new u(g, h.user);
          if (Fe.set(l, { bridge: m, awareness: y, doc: p }), h.provider.connect(p, g), h.cursors !== !1) {
            let x = !1;
            const k = h.throttle ?? 20, _ = (E) => {
              if (x) return;
              x = !0;
              const M = l.getBoundingClientRect(), R = this._viewportLive ?? this.viewport, L = (E.clientX - M.left - R.x) / R.zoom, D = (E.clientY - M.top - R.y) / R.zoom;
              y.updateCursor({ x: L, y: D }), setTimeout(() => {
                x = !1;
              }, k);
            }, S = () => {
              y.updateCursor(null);
            };
            l.addEventListener("mousemove", _), l.addEventListener("mouseleave", S);
            const b = Fe.get(l);
            b.cursorCleanup = () => {
              l.removeEventListener("mousemove", _), l.removeEventListener("mouseleave", S);
            };
          }
        }
      },
      /** Create panZoom instance, viewport element fallback, apply background, register with store, setup marker defs. */
      _initPanZoom() {
        if (B("init", `flowCanvas "${this._id}" initializing`, {
          nodes: this.nodes.map((r) => ({ id: r.id, type: r.type ?? "default", position: r.position, parentId: r.parentId })),
          edges: this.edges.map((r) => ({ id: r.id, source: r.source, target: r.target, type: r.type ?? "default" })),
          config: { minZoom: e.minZoom, maxZoom: e.maxZoom, pannable: e.pannable, zoomable: e.zoomable, debug: e.debug }
        }), this._panZoom = Sf(this._container, {
          onTransformChange: (r) => {
            this._onViewportTransform(r);
          },
          onMoveStart: (r) => {
            this._emit("viewport-move-start", { viewport: { ...r } });
          },
          onMove: () => {
            this._vpMoved = !0;
          },
          onMoveEnd: (r) => {
            this._onViewportMoveEnd(r);
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
          dblClickZoomOutLevel: e.dblClickZoomOutLevel,
          // Only called when a toggle double-click zooms out under
          // `dblClickZoomOutLevel: 'fit'`, so the bounds pass costs nothing otherwise.
          getFitViewport: () => this._fitViewport(),
          panOnDrag: e.panOnDrag,
          panActivationKeyCode: e.panActivationKeyCode,
          zoomActivationKeyCode: e.zoomActivationKeyCode,
          isTouchSelectionMode: () => this._touchSelectionMode,
          panOnScroll: e.panOnScroll,
          panOnScrollDirection: e.panOnScrollDirection,
          panOnScrollSpeed: e.panOnScrollSpeed,
          onScrollPan: (r, l) => {
            this.panBy(r, l);
          }
        }), e.viewport) {
          const r = {
            x: e.viewport.x ?? 0,
            y: e.viewport.y ?? 0,
            zoom: e.viewport.zoom ?? 1
          };
          this.viewport.x = r.x, this.viewport.y = r.y, this.viewport.zoom = r.zoom, this._panZoom.setViewport(r);
        }
        this.$nextTick(() => {
          if (this._viewportEl || (this._viewportEl = this._container?.querySelector(".flow-viewport")), this._viewportEl) {
            const r = this.viewport;
            this._viewportEl.style.transform = `translate(${r.x}px, ${r.y}px) scale(${r.zoom})`;
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
          const r = this._viewportEl ?? this._container?.querySelector(".flow-viewport");
          !r && this._container && B("init", `flowCanvas "${this._id}" has no .flow-viewport — delegating handle pointerdown on the container instead; an active whiteboard tool may not suppress handle presses`);
          const l = r ?? this._container;
          l && (this._handleDelegationCleanup = $s(l, this), this._handleDelegationEl = l);
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
      _registerViewportEl(r) {
        this._viewportEl = r;
        const l = this._handleDelegationEl;
        !l || l === r || (this._handleDelegationCleanup?.(), this._handleDelegationCleanup = null, this._handleDelegationEl = null, !this._handleDelegationTornDown && (this._handleDelegationCleanup = $s(r, this), this._handleDelegationEl = r, B("init", `flowCanvas "${this._id}" re-bound its delegated handle pointerdown listener to a replaced .flow-viewport`)));
      },
      /** Canvas click handler, context menu handler, long press, touch selection mode, context menu event listeners. */
      _initClickHandlers() {
        this._onCanvasClick = (c) => {
          if (this._suppressNextCanvasClick) {
            this._suppressNextCanvasClick = !1;
            return;
          }
          this.pendingConnection && (this._emit("connect-end", {
            connection: null,
            source: this.pendingConnection.source,
            sourceHandle: this.pendingConnection.sourceHandle,
            position: this.screenToFlowPosition(c.clientX, c.clientY)
          }), this.pendingConnection = null, this._container?.classList.remove("flow-connecting"), this._container && Me(this._container));
          const d = c.target;
          if (d === this._container || d.classList.contains("flow-viewport")) {
            const f = this.screenToFlowPosition(c.clientX, c.clientY);
            this._emit("pane-click", { event: c, position: f }), this.deselectAll();
          }
        }, this._container.addEventListener("click", this._onCanvasClick), this._onCanvasContextMenu = (c) => {
          const d = c.target;
          if (d === this._container || d.classList.contains("flow-viewport"))
            if (c.preventDefault(), this.selectedNodes.size > 1) {
              const { nodes: f, edges: u } = this.getSelectedNodesAndEdges();
              this._emit("selection-context-menu", { nodes: f, edges: u, event: c });
            } else {
              const f = this.screenToFlowPosition(c.clientX, c.clientY);
              this._emit("pane-context-menu", { event: c, position: f });
            }
        }, this._container.addEventListener("contextmenu", this._onCanvasContextMenu);
        const r = e.longPressAction ?? "context-menu";
        if (r && (this._longPressCleanup = Ph(
          this._container,
          (c) => {
            const d = c.target;
            if (r === "context-menu") {
              const f = d.closest("[data-flow-node-id]");
              if (f) {
                const h = f.getAttribute("data-flow-node-id"), p = this._nodeMap.get(h);
                if (p) {
                  this._emit("node-context-menu", { node: p, event: c });
                  return;
                }
              }
              const u = d.closest(".flow-edge-svg");
              if (u) {
                const h = u.getAttribute("data-edge-id"), p = h ? this._edgeMap.get(h) : void 0;
                if (p) {
                  this._emit("edge-context-menu", { edge: p, event: c });
                  return;
                }
              }
              if (this.selectedNodes.size > 1) {
                const { nodes: h, edges: p } = this.getSelectedNodesAndEdges();
                this._emit("selection-context-menu", { nodes: h, edges: p, event: c });
              } else {
                const h = this.screenToFlowPosition(c.clientX, c.clientY);
                this._emit("pane-context-menu", { event: c, position: h });
              }
            } else if (r === "select") {
              const f = d.closest("[data-flow-node-id]");
              if (f) {
                const u = f.getAttribute("data-flow-node-id"), h = this.getNode(u);
                this.selectedNodes.has(u) ? this.selectedNodes.delete(u) : (!h || yn(h, this._config?.nodesSelectable !== !1)) && this.selectedNodes.add(u);
              }
            }
          },
          { duration: e.longPressDuration ?? 500 }
        )), e.touchSelectionMode !== !1) {
          let c = 0, d = 0;
          const f = (m) => {
            m.pointerType === "touch" && (d++, d === 2 && Date.now() - c < 300 && (this._touchSelectionMode = !this._touchSelectionMode, this._container?.classList.toggle("flow-touch-selection-mode", this._touchSelectionMode)), c = Date.now());
          }, u = (m) => {
            m.pointerType === "touch" && (d = Math.max(0, d - 1), d === 0 && (c = 0));
          }, h = this._container;
          if (!h) return;
          h.addEventListener("pointerdown", f), h.addEventListener("pointerup", u), h.addEventListener("pointercancel", u);
          const p = () => {
            document.hidden && (d = 0);
          };
          document.addEventListener("visibilitychange", p);
          const g = document.createElement("div");
          g.className = "flow-touch-selection-mode-indicator", g.textContent = this.t("canvas.selectionMode"), h.appendChild(g), this._touchSelectionCleanup = () => {
            h.removeEventListener("pointerdown", f), h.removeEventListener("pointerup", u), h.removeEventListener("pointercancel", u), document.removeEventListener("visibilitychange", p), g.remove();
          };
        }
        const l = [
          { event: "flow-node-context-menu", handler: ((c) => {
            Object.assign(this.contextMenu, { show: !0, type: "node", x: c.detail.event.clientX, y: c.detail.event.clientY, node: c.detail.node, edge: null, position: null, nodes: null, edges: null, event: c.detail.event });
          }) },
          { event: "flow-edge-context-menu", handler: ((c) => {
            Object.assign(this.contextMenu, { show: !0, type: "edge", x: c.detail.event.clientX, y: c.detail.event.clientY, node: null, edge: c.detail.edge, position: null, nodes: null, edges: null, event: c.detail.event });
          }) },
          { event: "flow-pane-context-menu", handler: ((c) => {
            Object.assign(this.contextMenu, { show: !0, type: "pane", x: c.detail.event.clientX, y: c.detail.event.clientY, node: null, edge: null, position: c.detail.position, nodes: null, edges: null, event: c.detail.event });
          }) },
          { event: "flow-selection-context-menu", handler: ((c) => {
            Object.assign(this.contextMenu, { show: !0, type: "selection", x: c.detail.event.clientX, y: c.detail.event.clientY, node: null, edge: null, position: null, nodes: c.detail.nodes, edges: c.detail.edges, event: c.detail.event });
          }) }
        ];
        for (const c of l)
          this._container.addEventListener(c.event, c.handler);
        this._contextMenuListeners = l;
      },
      /** Keyboard shortcut handler (delete, arrows, undo/redo, copy/paste/cut, selection tool toggle, escape). */
      _initKeyboard() {
        this._onKeyDown = (r) => {
          if (!this._active || this._animationLocked) return;
          const l = Mh(r.target), c = this._shortcuts;
          if (Je(r.key, c.escape) && this.contextMenu.show) {
            this.closeContextMenu();
            return;
          }
          if (Je(r.key, c.escape) && this.pendingConnection) {
            this._emit("connect-end", {
              connection: null,
              source: this.pendingConnection.source,
              sourceHandle: this.pendingConnection.sourceHandle,
              position: { x: 0, y: 0 }
            }), this.pendingConnection = null, this._container?.classList.remove("flow-connecting"), this._container && Me(this._container);
            return;
          }
          if (Je(r.key, c.delete)) {
            if (l) return;
            this._deleteSelected();
          }
          if (Je(r.key, this._shortcuts.selectionToolToggle) && !r.ctrlKey && !r.metaKey) {
            if (l) return;
            this._selectionTool = this._selectionTool === "box" ? "lasso" : "box";
            return;
          }
          if (Je(r.key, c.moveNodes)) {
            if (l || this._config?.disableKeyboardA11y || this.selectedNodes.size === 0) return;
            r.preventDefault();
            const d = xt(r, c.moveStepModifier) ? c.moveStep * c.moveStepMultiplier : c.moveStep;
            let f = 0, u = 0;
            switch (r.key) {
              case "ArrowUp":
                u = -d;
                break;
              case "ArrowDown":
                u = d;
                break;
              case "ArrowLeft":
                f = -d;
                break;
              case "ArrowRight":
                f = d;
                break;
              default: {
                const h = Array.isArray(c.moveNodes) ? c.moveNodes : [c.moveNodes], p = r.key.length === 1 ? r.key.toLowerCase() : r.key, g = h.findIndex((m) => (m.length === 1 ? m.toLowerCase() : m) === p);
                g === 0 ? u = -d : g === 1 ? u = d : g === 2 ? f = -d : g === 3 && (f = d);
              }
            }
            Lh(r.repeat, this.selectedNodes.size, f, u) && this._captureHistory();
            for (const h of this.selectedNodes) {
              const p = this.getNode(h);
              if (p && Ca(p)) {
                p.position.x += f, p.position.y += u;
                const g = this._container ? Fe.get(this._container) : void 0;
                g?.bridge && g.bridge.pushLocalNodeUpdate(p.id, { position: p.position });
              }
            }
          }
          if ((r.ctrlKey || r.metaKey) && !r.shiftKey && Je(r.key, c.undo)) {
            if (l) return;
            r.preventDefault(), this.undo();
          }
          if ((r.ctrlKey || r.metaKey) && r.shiftKey && Je(r.key, c.redo)) {
            if (l) return;
            r.preventDefault(), this.redo();
          }
          if ((r.ctrlKey || r.metaKey) && !r.shiftKey) {
            if (l) return;
            Je(r.key, c.copy) ? (r.preventDefault(), this.copy()) : Je(r.key, c.paste) ? (r.preventDefault(), this.paste()) : Je(r.key, c.cut) && (r.preventDefault(), this.cut());
          }
        }, document.addEventListener("keydown", this._onKeyDown);
      },
      /** Create minimap if configured. */
      _initMinimap() {
        e.minimap && (this._minimap = Wf(this._container, {
          getState: () => ({
            nodes: wo(this.nodes, this._nodeMap, this._config.nodeOrigin),
            viewport: this.viewport,
            containerWidth: this._container?.clientWidth ?? 0,
            containerHeight: this._container?.clientHeight ?? 0
          }),
          getViewportState: () => ({
            viewport: this.viewport,
            containerWidth: this._container?.clientWidth ?? 0,
            containerHeight: this._container?.clientHeight ?? 0
          }),
          setViewport: (r) => this._panZoom?.setViewport(r),
          config: e
        }), this._minimap.render(), this.$watch("nodes", () => this._minimap?.render()), this.$watch("viewport", () => this._minimap?.updateViewport()));
      },
      /**
       * Give the minimap another box.
       *
       * Public because the reason to want it is outside the library: a canvas that changes shape with
       * the window wants a minimap that changes shape with it, and the scale that fits the graph in —
       * along with the rectangle marking the viewport — is computed against the box. A consumer
       * watching its container calls this; nothing here watches, because what counts as "too big" is
       * the page's business rather than the canvas's.
       *
       * The new box is written back into the config, so `_config.minimapWidth/Height` keeps saying
       * what is on screen rather than what was passed at construction — the same numbers a
       * `patchConfig` from the server would set. `minimap-resize` fires only when something actually
       * changed, so a host that persists the size is not asked to save the size it already has.
       */
      resizeMinimap(r, l) {
        this._minimap?.resize(r, l) && (this._config.minimapWidth = r, this._config.minimapHeight = l, this._emit("minimap-resize", { width: r, height: l }));
      },
      /** Create controls panel if configured. */
      _initControls() {
        if (e.controls) {
          const r = e.controlsContainer ? document.querySelector(e.controlsContainer) ?? this._container : this._container, l = r !== this._container;
          this._controls = nh(r, {
            t: n,
            position: e.controlsPosition ?? "bottom-left",
            orientation: e.controlsOrientation ?? "vertical",
            external: l,
            showZoom: e.controlsShowZoom ?? !0,
            showFitView: e.controlsShowFitView ?? !0,
            showInteractive: e.controlsShowInteractive ?? !0,
            showResetPanels: e.controlsShowResetPanels ?? !1,
            // Read per press, and from `_config` — the copy the rest of the canvas answers to, so a
            // duration changed at runtime reaches the buttons like every other live setting does.
            // Zero by default, which is exactly the call these three made before.
            onZoomIn: () => this.zoomIn({ duration: this._config.controlsDuration ?? 0 }),
            onZoomOut: () => this.zoomOut({ duration: this._config.controlsDuration ?? 0 }),
            onFitView: () => this.fitView({ padding: Qn, duration: this._config.controlsDuration ?? 0 }),
            onToggleInteractive: () => this.toggleInteractive(),
            onResetPanels: () => this.resetPanels(),
            onToggleFullscreen: () => this.toggleFullscreen()
          }), this.$watch("isInteractive", (c) => {
            this._controls?.update({ isInteractive: c });
          }), this.$watch("isFullscreen", (c) => {
            this._controls?.update({ isFullscreen: c });
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
          const r = this._fullscreenTarget ?? this._container, l = document.fullscreenElement === r;
          l !== this.isFullscreen && (this.isFullscreen = l, this._container?.dispatchEvent(new CustomEvent("flow-fullscreen-change", {
            bubbles: !0,
            detail: { isFullscreen: l }
          }))), l || (this._fullscreenTarget = null);
        }, document.addEventListener("fullscreenchange", this._onFullscreenChange));
      },
      /**
       * Resolve which element should enter fullscreen. Honors the optional
       * `fullscreenTarget` config (string selector / HTMLElement / function)
       * and falls back to the canvas container.
       */
      _resolveFullscreenTarget() {
        if (!this._container) return null;
        const r = this._config?.fullscreenTarget;
        if (!r) return this._container;
        if (typeof r == "string") {
          const l = this._container.closest(r);
          if (l) return l;
          const c = document.querySelector(r);
          return c || (console.warn(`[AlpineFlow] fullscreenTarget selector "${r}" did not match; falling back to canvas container.`), this._container);
        }
        if (r instanceof HTMLElement) return r;
        if (typeof r == "function")
          try {
            const l = r(this._container);
            if (l instanceof HTMLElement) return l;
          } catch (l) {
            console.warn("[AlpineFlow] fullscreenTarget resolver threw:", l);
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
        const r = this._resolveFullscreenTarget();
        if (!r) return;
        if (document.fullscreenElement) {
          document.exitFullscreen?.();
          return;
        }
        const l = r.requestFullscreen;
        if (typeof l != "function") {
          console.warn("[AlpineFlow] requestFullscreen is not available in this context");
          return;
        }
        this._fullscreenTarget = r, Promise.resolve(l.call(r)).catch((c) => {
          console.warn("[AlpineFlow] fullscreen request rejected:", c), this._fullscreenTarget = null;
        });
      },
      /** Selection box/lasso setup (pointerdown/pointermove/pointerup handlers). */
      _initSelection() {
        this._selectionBox = oh(this._container), this._lasso = ih(this._container), this._selectionTool = e.selectionTool ?? "box", this._onSelectionPointerDown = (r) => {
          if (!this._config.selectionOnDrag && !this._touchSelectionMode && !xt(r, this._shortcuts.selectionBox))
            return;
          const l = r.target;
          if (l !== this._container && !l.classList.contains("flow-viewport"))
            return;
          r.stopPropagation(), r.preventDefault(), this._selectionShiftHeld = !0;
          const c = this._config.selectionMode ?? "partial", d = xt(r, this._shortcuts.selectionModeToggle);
          if (this._selectionEffectiveMode = d ? c === "partial" ? "full" : "partial" : c, !this._container) return;
          const f = this._container.getBoundingClientRect(), u = r.clientX - f.left, h = r.clientY - f.top;
          this._selectionTool === "lasso" ? this._lasso.start(u, h, this._selectionEffectiveMode) : this._selectionBox.start(u, h, this._selectionEffectiveMode), r.target.setPointerCapture(r.pointerId);
        }, this._onSelectionPointerMove = (r) => {
          if (!(this._selectionTool === "lasso" ? this._lasso?.isActive() : this._selectionBox?.isActive()) || !this._container) return;
          const c = this._container.getBoundingClientRect(), d = r.clientX - c.left, f = r.clientY - c.top;
          this._selectionTool === "lasso" ? this._lasso.update(d, f) : this._selectionBox.update(d, f);
        }, this._onSelectionPointerUp = (r) => {
          if (!(this._selectionTool === "lasso" ? this._lasso?.isActive() : this._selectionBox?.isActive())) return;
          r.target.releasePointerCapture(r.pointerId), this._suppressNextCanvasClick = !0;
          const c = wo(this.nodes, this._nodeMap, this._config.nodeOrigin);
          let d, f = [];
          if (this._selectionTool === "lasso") {
            const u = this._lasso.end(this.viewport);
            if (!u) return;
            const h = this._selectionEffectiveMode === "full" ? lh(c, u) : ah(c, u), p = new Set(h.map((g) => g.id));
            if (d = this.nodes.filter((g) => p.has(g.id)), this._config.lassoSelectsEdges)
              for (const g of this.edges) {
                if (g.hidden) continue;
                const m = this._container?.querySelector(
                  `[data-flow-edge-id="${CSS.escape(g.id)}"] path`
                );
                if (!m) continue;
                const y = m.getTotalLength(), x = Math.max(10, Math.ceil(y / 20));
                let k = 0;
                for (let S = 0; S <= x; S++) {
                  const b = m.getPointAtLength(S / x * y);
                  Hi(b.x, b.y, u) && k++;
                }
                (this._selectionEffectiveMode === "full" ? k === x + 1 : k > 0) && f.push(g.id);
              }
          } else {
            const u = this._selectionBox.end(this.viewport);
            if (!u) return;
            const h = this._selectionEffectiveMode === "full" ? Mf(c, u, this._config.nodeOrigin) : Lf(c, u, this._config.nodeOrigin), p = new Set(h.map((g) => g.id));
            d = this.nodes.filter((g) => p.has(g.id));
          }
          this._selectionShiftHeld || this.deselectAll();
          for (const u of d) {
            if (!yn(u, this._config?.nodesSelectable !== !1) || u.hidden) continue;
            u.selected = !0, this.selectedNodes.add(u.id);
            const h = this._container?.querySelector(`[data-flow-node-id="${CSS.escape(u.id)}"]`);
            h && h.classList.add("flow-node-selected");
          }
          for (const u of f) {
            const h = this.getEdge(u);
            h && gi(h, this._config?.edgesSelectable !== !1) && (h.selected = !0, this.selectedEdges.add(h.id));
          }
          (d.length > 0 || f.length > 0) && this._emitSelectionChange(), this._selectionShiftHeld = !1;
        }, this._container.addEventListener("pointerdown", this._onSelectionPointerDown), this._container.addEventListener("pointermove", this._onSelectionPointerMove), this._container.addEventListener("pointerup", this._onSelectionPointerUp);
      },
      /** Drop zone drag/drop handlers if onDrop configured. */
      _initDropZone() {
        if (e.onDrop) {
          const r = e.dropMimeTypes ?? ["application/alpineflow"], l = (c, d) => {
            const f = document.elementsFromPoint(c, d);
            for (const u of f) {
              const h = u.closest?.("[data-flow-node-id]");
              if (!h)
                continue;
              const p = h.getAttribute("data-flow-node-id");
              if (!p)
                continue;
              const g = this._nodeMap.get(p);
              if (g)
                return g;
            }
            return null;
          };
          this._onDropZoneDragOver = (c) => {
            !c.dataTransfer || fr(c.target) || !r.some((f) => c.dataTransfer.types.includes(f)) || (c.preventDefault(), c.dataTransfer.dropEffect = "move", this._container?.classList.add("flow-canvas-drag-over"));
          }, this._onDropZoneDragleave = (c) => {
            if (!this._container)
              return;
            const d = c.relatedTarget;
            d && this._container.contains(d) || this._container.classList.remove("flow-canvas-drag-over");
          }, this._onDropZoneDrop = (c) => {
            if (c.preventDefault(), this._container?.classList.remove("flow-canvas-drag-over"), fr(c.target) || !c.dataTransfer || !e.onDrop)
              return;
            let d = null, f = null;
            for (const m of r) {
              const y = c.dataTransfer.getData(m);
              if (y) {
                d = m, f = y;
                break;
              }
            }
            if (!d || !f)
              return;
            let u;
            try {
              u = JSON.parse(f);
            } catch {
              u = f;
            }
            if (!this._container)
              return;
            const h = la(
              c.clientX,
              c.clientY,
              this.viewport,
              this._container.getBoundingClientRect()
            ), p = l(c.clientX, c.clientY), g = e.onDrop({ data: u, position: h, targetNode: p, mimeType: d }, this);
            g && this.addNodes(g, { center: !0, source: "drop" });
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
      getNodeAtPoint(r, l) {
        const c = document.elementsFromPoint(r, l);
        for (const d of c) {
          const f = d.closest?.("[data-flow-node-id]");
          if (!f)
            continue;
          const u = f.getAttribute("data-flow-node-id");
          if (!u)
            continue;
          const h = this._nodeMap.get(u);
          if (h)
            return h;
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
      _installChildLayoutWatchers(r) {
        if (!r.childLayout) return;
        this._uninstallChildLayoutWatchers(r.id);
        const l = [
          "columns",
          "gap",
          "padding",
          "headerHeight",
          "direction",
          "stretch"
        ], c = r.id, d = [];
        for (const f of l) {
          const u = t.watch(
            () => r.childLayout?.[f],
            () => {
              this._layoutDedup?.safeLayoutChildren(c);
            }
          );
          d.push(u);
        }
        this._childLayoutCleanups.set(c, d);
      },
      _uninstallChildLayoutWatchers(r) {
        const l = this._childLayoutCleanups.get(r);
        if (l) {
          for (const c of l) c();
          this._childLayoutCleanups.delete(r);
        }
      },
      /** Create the shared ResizeObserver instance (A1). Called from _initChildLayout. */
      _resizeObserverInit() {
        typeof ResizeObserver > "u" || (this._resizeObserver = new ResizeObserver((r) => {
          const l = /* @__PURE__ */ new Set();
          for (const c of r) {
            const d = c.target, f = d.getAttribute("data-flow-node-id");
            if (!f) continue;
            const u = this._nodeMap.get(f);
            if (!u) continue;
            const h = c.borderBoxSize?.[0], p = h ? h.inlineSize : d.offsetWidth, g = h ? h.blockSize : d.offsetHeight;
            if (p === 0 && g === 0 || d.offsetParent === null && d.tagName !== "BODY" || u.fixedDimensions === !0) continue;
            const m = Math.round(p), y = Math.round(g), x = u.dimensions;
            if (x && Math.abs((x.width ?? 0) - m) < 1 && Math.abs((x.height ?? 0) - y) < 1)
              continue;
            const k = Cg(
              { width: m, height: y },
              u.minDimensions,
              u.maxDimensions
            );
            u.dimensions = k, l.add(f), u.parentId && this._layoutDedup?.safeLayoutChildren(u.parentId);
          }
          l.size > 0 && this._commitNodeGeometry([...l]);
        }));
      },
      /** Run initial child layouts for all layout parents. */
      _initChildLayout() {
        if (this._layoutDedup = xg((r) => {
          this.layoutChildren(r);
        }), this._resizeObserverInit(), this.$wire) {
          const r = this.$wire;
          e.wireEvents && _g(e, r, e.wireEvents);
          const l = vg(this, r), c = gg(this, r);
          this._wireCleanup = () => {
            l(), c();
          }, B("init", `wire bridge activated for "${this._id}"`);
        }
        B("init", `flowCanvas "${this._id}" ready`), this._emit("init"), this._recomputeChildValidation();
        for (const r of this.nodes)
          r.childLayout && this._installChildLayoutWatchers(r);
        for (const r of this.nodes)
          r.childLayout && !r.parentId && this.layoutChildren(r.id);
        for (const r of this.nodes)
          r.childLayout && r.parentId && (this._nodeMap.get(r.parentId)?.childLayout || this.layoutChildren(r.id));
        e.fitViewOnInit && requestAnimationFrame(() => {
          this.fitView();
        }), this._commitNodeGeometry();
      },
      /** Call setup(canvas) on any addon that provides it. */
      _initAddons() {
        for (const [, r] of qa().entries())
          r && typeof r == "object" && typeof r.setup == "function" && r.setup(this);
      },
      /** Validate auto-layout dependency and start initial layout. */
      _initAutoLayout() {
        if (e.autoLayout) {
          const r = e.autoLayout.algorithm, l = {
            dagre: "layout:dagre",
            force: "layout:force",
            hierarchy: "layout:hierarchy",
            elk: "layout:elk"
          }, c = {
            dagre: "AlpineFlowDagre",
            force: "AlpineFlowForce",
            hierarchy: "AlpineFlowHierarchy",
            elk: "AlpineFlowElk"
          }, d = l[r];
          d && zt(d) ? (this._autoLayoutReady = !0, this.$nextTick(() => this._runAutoLayout())) : d && this._warn("AUTO_LAYOUT_MISSING_DEP", `autoLayout requires the ${r} plugin. Register it with: Alpine.plugin(${c[r]})`);
        }
      },
      /** requestAnimationFrame ready flip, loading watch, loading overlay injection. */
      _initReady() {
        const r = e.fitViewOnInit ? 2 : 1;
        let l = 0;
        const c = () => {
          if (l++, l < r) {
            requestAnimationFrame(c);
            return;
          }
          this.$nextTick(() => {
            this.ready = !0;
          });
        };
        if (requestAnimationFrame(c), this.$watch("isLoading", (d) => {
          this._container && (this._container.classList.toggle("flow-loading", d), this._container.classList.toggle("flow-ready", !d), !d && this._autoLoadingOverlay && (this._autoLoadingOverlay.remove(), this._autoLoadingOverlay = null));
        }), this._container && this._container.classList.add("flow-loading"), e.loading && this._container && !this._container.querySelector("[data-flow-loading-directive]")) {
          const d = document.createElement("div");
          d.className = "flow-loading-overlay";
          const f = document.createElement("div");
          f.className = "flow-loading-indicator";
          const u = document.createElement("div");
          u.className = "flow-loading-indicator-node";
          const h = document.createElement("div");
          h.className = "flow-loading-indicator-text", h.textContent = this._loadingText, f.appendChild(u), f.appendChild(h), d.appendChild(f), this._container.appendChild(d), this._autoLoadingOverlay = d;
        }
      },
      // ── Lifecycle ─────────────────────────────────────────────────────
      init() {
        i = this, this._initDebug(), this._initContainer(), this._initColorMode(), this._initHydration(), this._initHistory(), this._initAnnouncer(), this._initCollab(), this._initPanZoom(), this._initHandleDelegation(), this._initClickHandlers(), this._initKeyboard(), this._initMinimap(), this._initFullscreen(), this._initControls(), this._initSelection(), this._initChildLayout(), this._initAddons(), this._initDropZone(), this._initAutoLayout(), this._initReady();
      },
      _setupMarkerDefs() {
        const r = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        r.style.cssText = "position:absolute;width:0;height:0;overflow:hidden;";
        const l = document.createElementNS("http://www.w3.org/2000/svg", "defs");
        r.appendChild(l), this._container?.appendChild(r), this._markerDefsEl = r, this._updateMarkerDefs(), this.$watch("edges", () => {
          this._updateMarkerDefs();
        });
      },
      _updateMarkerDefs() {
        if (!this._markerDefsEl) return;
        const r = this._markerDefsEl.querySelector("defs"), l = /* @__PURE__ */ new Map();
        for (const f of this.edges)
          for (const u of [f.markerStart, f.markerEnd]) {
            if (!u) continue;
            const h = Yt(u), p = Xt(h, this._id);
            l.has(p) || l.set(p, go(h, p));
          }
        const c = r.querySelectorAll("marker"), d = /* @__PURE__ */ new Set();
        c.forEach((f) => {
          l.has(f.id) ? d.add(f.id) : f.remove();
        });
        for (const [f, u] of l)
          if (!d.has(f)) {
            const p = new DOMParser().parseFromString(
              `<svg xmlns="http://www.w3.org/2000/svg">${u}</svg>`,
              "image/svg+xml"
            ).querySelector("marker");
            p && r.appendChild(document.importNode(p, !0));
          }
      },
      destroy() {
        this._destroyAnimations?.(), this._wireCleanup?.(), this._wireCleanup = null, this._handleDelegationTornDown = !0, this._handleDelegationCleanup?.(), this._handleDelegationCleanup = null, this._handleDelegationEl = null, this._longPressCleanup?.(), this._longPressCleanup = null, this._touchSelectionCleanup?.(), this._touchSelectionCleanup = null;
        try {
          this._emit("destroy");
        } catch (r) {
          console.error(
            `[AlpineFlow] a destroy callback threw while destroying flowCanvas "${this._id}"; teardown continued`,
            r
          );
        }
        if (B("destroy", `flowCanvas "${this._id}" destroying`), this._onCanvasClick && this._container && this._container.removeEventListener("click", this._onCanvasClick), this._onCanvasContextMenu && this._container && this._container.removeEventListener("contextmenu", this._onCanvasContextMenu), this._container)
          for (const r of this._contextMenuListeners)
            this._container.removeEventListener(r.event, r.handler);
        if (this._contextMenuListeners = [], this._onKeyDown && document.removeEventListener("keydown", this._onKeyDown), this._onContainerPointerDown && this._container && this._container.removeEventListener("pointerdown", this._onContainerPointerDown), this._markerDefsEl?.remove(), this._markerDefsEl = null, this._minimap?.destroy(), this._minimap = null, this._controls?.destroy(), this._controls = null, this._onFullscreenChange && typeof document < "u" && document.removeEventListener("fullscreenchange", this._onFullscreenChange), this._onFullscreenChange = null, typeof document < "u") {
          const r = document.fullscreenElement;
          r && (r === this._container || r === this._fullscreenTarget) && document.exitFullscreen?.().catch(() => {
          });
        }
        if (this._fullscreenTarget = null, this._onSelectionPointerDown && this._container && this._container.removeEventListener("pointerdown", this._onSelectionPointerDown), this._onSelectionPointerMove && this._container && this._container.removeEventListener("pointermove", this._onSelectionPointerMove), this._onSelectionPointerUp && this._container && this._container.removeEventListener("pointerup", this._onSelectionPointerUp), this._selectionBox?.destroy(), this._selectionBox = null, this._lasso?.destroy(), this._lasso = null, this._viewportEl = null, this._container && (this._container.removeEventListener("dragover", this._onDropZoneDragOver), this._container.removeEventListener("dragleave", this._onDropZoneDragleave), this._container.removeEventListener("drop", this._onDropZoneDrop)), this._followHandle?.stop(), this._followHandle = null, this._animator = null, this._layoutAnimFrame && (cancelAnimationFrame(this._layoutAnimFrame), this._layoutAnimFrame = 0), this._autoLayoutTimer && (clearTimeout(this._autoLayoutTimer), this._autoLayoutTimer = null), this._colorModeHandle && (this._colorModeHandle.destroy(), this._colorModeHandle = null), this._container) {
          const r = Fe.get(this._container);
          r && (r.bridge.destroy(), r.awareness.destroy(), r.cursorCleanup && r.cursorCleanup(), Fe.delete(this._container));
        }
        this._container && this._container.removeAttribute("data-flow-canvas"), this.$store.flow.unregister(this._id), this._vpFrame !== null && (cancelAnimationFrame(this._vpFrame), this._vpFrame = null), this._panZoom?.destroy(), this._panZoom = null, this._announcer?.destroy(), this._announcer = null, this._computeDebounceTimer && (clearTimeout(this._computeDebounceTimer), this._computeDebounceTimer = null);
        for (const r of [...this._childLayoutCleanups.keys()])
          this._uninstallChildLayoutWatchers(r);
        this._resizeObserver?.disconnect(), this._resizeObserver = null, this._layoutDedup?.dispose(), this._layoutDedup = null;
      },
      // ── Remaining Flat Methods ────────────────────────────────────────
      /**
       * Set a node's rotation angle in degrees.
       */
      rotateNode(r, l) {
        const c = this.nodes.find((d) => d.id === r);
        c && (this._captureHistory(), c.rotation = l);
      },
      /** Set the user-controlled loading state. */
      setLoading(r) {
        this._userLoading = r;
      },
      /** Update runtime config options. */
      patchConfig(r) {
        this._applyConfigPatch(r);
      },
      /**
       * WS-3: toggle/tune crossing reduction at runtime and re-route immediately.
       * Mutates the live config then forces a geometry recommit so the crossing
       * plan is recomputed and affected edges re-route without waiting for a node
       * move. `value`: `boolean | { channelGap?: number }`.
       */
      setCrossingReduction(r) {
        this._config && (this._config.avoidantCrossingReduction = r, this._commitNodeGeometry());
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
      batch(r) {
        return this._layoutDedup ? Eg(this._layoutDedup)(r) : r();
      },
      get collab() {
        return this._container ? Fe.get(this._container)?.awareness : void 0;
      },
      async toImage(r) {
        let l;
        try {
          ({ captureFlowImage: l } = await Promise.resolve().then(() => zy));
        } catch {
          throw new Error("toImage() requires html-to-image. Install it with: npm install html-to-image");
        }
        return l(
          this._container,
          this._viewportEl,
          this.nodes,
          this.viewport,
          r
        );
      }
    };
    let i = o;
    const s = new Proxy(/* @__PURE__ */ Object.create(null), {
      get(r, l) {
        return i[l];
      },
      set(r, l, c) {
        return i[l] = c, !0;
      }
    }), a = [
      Mg(s),
      Pg(s),
      Ng(s),
      $g(s),
      Rg(s),
      up(s),
      gp(s),
      pp(s),
      mp(s),
      Sp(s),
      kp(s),
      Lp(s),
      Up(s, t),
      Gp(s)
    ];
    for (const r of a)
      Object.defineProperties(o, Object.getOwnPropertyDescriptors(r));
    return o.registerMarker = (r, l) => {
      qf(r, l);
    }, o;
  });
}
function hr(t, e) {
  return {
    x: e[0] * Math.round(t.x / e[0]),
    y: e[1] * Math.round(t.y / e[1])
  };
}
function tm(t, e, n) {
  const { onDragStart: o, onDrag: i, onDragEnd: s, getViewport: a, getNodePosition: r, snapToGrid: l = !1, filterSelector: c, container: d, isLocked: f, noDragClassName: u, dragThreshold: h = 0 } = n;
  let p = { x: 0, y: 0 };
  function g(x) {
    const k = a();
    return {
      x: (x.x - k.x) / k.zoom,
      y: (x.y - k.y) / k.zoom
    };
  }
  const m = We(t), y = ed().subject(() => {
    const x = a(), k = r();
    return {
      x: k.x * x.zoom + x.x,
      y: k.y * x.zoom + x.y
    };
  }).on("start", (x) => {
    p = g(x), o?.({ nodeId: e, position: p, sourceEvent: x.sourceEvent });
  }).on("drag", (x) => {
    let k = g(x);
    l && (k = hr(k, l));
    const _ = {
      x: k.x - p.x,
      y: k.y - p.y
    };
    i?.({ nodeId: e, position: k, delta: _, sourceEvent: x.sourceEvent });
  }).on("end", (x) => {
    let k = g(x);
    l && (k = hr(k, l)), s?.({ nodeId: e, position: k, sourceEvent: x.sourceEvent });
  });
  return d && y.container(() => d), h > 0 && y.clickDistance(h), y.filter((x) => {
    if (f?.() || u && x.target?.closest?.("." + u)) return !1;
    if (c) {
      const k = t.querySelector(c);
      return k ? k.contains(x.target) : !0;
    }
    return !0;
  }), m.call(y), {
    destroy() {
      m.on(".drag", null);
    }
  };
}
function nm(t, e) {
  const n = en(t, e);
  return {
    id: t.id,
    x: n.x,
    y: n.y,
    width: t.dimensions?.width ?? we,
    height: t.dimensions?.height ?? be
  };
}
function om(t, e, n) {
  const o = /* @__PURE__ */ new Set(), i = /* @__PURE__ */ new Set();
  let s = 0, a = 0, r = 1 / 0, l = 1 / 0;
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
    for (const [_, S] of x) {
      const b = S - _;
      Math.abs(b) <= n && (i.add(S), Math.abs(b) < Math.abs(r) && (r = b, s = b));
    }
    const k = [
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
    for (const [_, S] of k) {
      const b = S - _;
      Math.abs(b) <= n && (o.add(S), Math.abs(b) < Math.abs(l) && (l = b, a = b));
    }
  }
  return {
    horizontal: [...o],
    vertical: [...i],
    snapOffset: { x: s, y: a }
  };
}
function im(t, e, n, o) {
  return Math.abs(t.x - e.x) > 30 ? t.x < e.x ? { source: n, target: o } : { source: o, target: n } : t.y < e.y ? { source: n, target: o } : { source: o, target: n };
}
function sm(t, e, n, o) {
  let i = null, s = o;
  for (const a of n) {
    if (a.id === t) continue;
    const r = Math.sqrt(
      (e.x - a.center.x) ** 2 + (e.y - a.center.y) ** 2
    );
    if (r < s) {
      s = r;
      const { source: l, target: c } = im(e, a.center, t, a.id);
      i = { source: l, target: c, targetId: a.id, distance: r, targetCenter: a.center };
    }
  }
  return i;
}
const rm = /* @__PURE__ */ new Set(["x-data", "x-init", "x-bind", "href", "src", "action", "formaction", "srcdoc"]);
let am = 0;
function gr(t, e, n) {
  e && n !== null && t._commitHistory?.(n);
}
function Go(t, e, n) {
  t._suspendHistory?.();
  try {
    t.reparentNode?.(e, n);
  } finally {
    t._resumeHistory?.();
  }
}
function lm(t, e) {
  return t.key !== "Enter" && t.key !== " " ? !1 : t.target === e;
}
function cm(t, e) {
  switch (e) {
    case "alt":
      return t.altKey;
    case "meta":
      return t.metaKey;
    case "shift":
      return t.shiftKey;
  }
}
function dm(t, e, n) {
  const o = t.querySelectorAll('[data-flow-handle-type="source"]');
  if (o.length === 0) return null;
  let i = null, s = 1 / 0;
  return o.forEach((a) => {
    const r = a, l = r.getBoundingClientRect();
    if (l.width === 0 && l.height === 0) return;
    const c = l.left + l.width / 2, d = l.top + l.height / 2, f = Math.sqrt((e - c) ** 2 + (n - d) ** 2);
    f < s && (s = f, i = r);
  }), i;
}
function um(t, e, n) {
  let o = 1 / 0, i = -1 / 0, s = 1 / 0, a = -1 / 0;
  for (const c of n)
    o = Math.min(o, c.x), i = Math.max(i, c.x + c.width), s = Math.min(s, c.y), a = Math.max(a, c.y + c.height);
  const r = 50, l = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  l.style.cssText = "position:absolute;top:0;left:0;width:1px;height:1px;overflow:visible;pointer-events:none;z-index:500;";
  for (const c of t) {
    const d = document.createElementNS("http://www.w3.org/2000/svg", "line");
    d.setAttribute("x1", String(o - r)), d.setAttribute("y1", String(c)), d.setAttribute("x2", String(i + r)), d.setAttribute("y2", String(c)), d.classList.add("flow-guide-path"), l.appendChild(d);
  }
  for (const c of e) {
    const d = document.createElementNS("http://www.w3.org/2000/svg", "line");
    d.setAttribute("x1", String(c)), d.setAttribute("y1", String(s - r)), d.setAttribute("x2", String(c)), d.setAttribute("y2", String(a + r)), d.classList.add("flow-guide-path"), l.appendChild(d);
  }
  return l;
}
function fm(t) {
  t.directive(
    "flow-node",
    (e, { expression: n }, { evaluate: o, effect: i, cleanup: s }) => {
      let a = null, r = !1, l = null, c = !1, d = null, f = null, u = null, h = null, p = null, g = null, m = !1, y = -1, x = null, k = !1, _ = [], S = "", b = [], E = null;
      i(() => {
        if (!e.isConnected) return;
        const A = o(n);
        if (!A || A.hidden) return;
        const v = t.$data(e.closest("[x-data]"));
        if (!v?.viewport) return;
        const w = A.parentId ? v.getAbsolutePosition(A.id) : A.position ?? { x: 0, y: 0 }, T = A.nodeOrigin ?? v._config?.nodeOrigin ?? [0, 0], P = A.dimensions?.width ?? 150, $ = A.dimensions?.height ?? 40;
        e.style.left = w.x - P * T[0] + "px", e.style.top = w.y - $ * T[1] + "px";
      }), i(() => {
        if (!e.isConnected) return;
        const A = o(n);
        if (!A) return;
        if (e.dataset.flowNodeId = A.id, A.type && (e.dataset.flowNodeType = A.type), !k) {
          const V = e.closest("[x-data]"), j = V ? t.$data(V) : null;
          let Z = !1;
          if (j?._config?.nodeTypes) {
            const te = A.type ?? "default", F = j._config.nodeTypes[te] ?? j._config.nodeTypes.default;
            if (typeof F == "string") {
              const J = document.querySelector(F);
              J?.content && (e.appendChild(J.content.cloneNode(!0)), Z = !0);
            } else typeof F == "function" && (F(A, e), Z = !0);
          }
          if (!Z && e.children.length === 0) {
            const te = document.createElement("div");
            te.setAttribute("x-flow-handle:target", "");
            const F = document.createElement("span");
            F.setAttribute("x-text", "node.data.label");
            const J = document.createElement("div");
            J.setAttribute("x-flow-handle:source", ""), e.appendChild(te), e.appendChild(F), e.appendChild(J), Z = !0;
          }
          if (Z)
            for (const te of Array.from(e.children))
              t.addScopeToNode(te, { node: A }), t.initTree(te);
          k = !0;
        }
        if (A.hidden) {
          e.classList.add("flow-node-hidden"), e.removeAttribute("tabindex"), e.removeAttribute("role"), e.removeAttribute("aria-label"), a?.destroy(), a = null;
          return;
        }
        e.classList.remove("flow-node-hidden"), E !== A.id && (a?.destroy(), a = null, E = A.id);
        const v = t.$data(e.closest("[x-data]"));
        if (!v?.viewport) return;
        const w = Tn(v);
        if (e.classList.add("flow-node", "nopan"), A.type === "group" ? e.classList.add("flow-node-group") : e.classList.remove("flow-node-group"), A.dimensions) {
          const V = A.childLayout, j = A.fixedDimensions, Z = (v._childrenIds?.get(A.id)?.length ?? 0) > 0;
          e.style.width = A.dimensions.width + "px", V || j || Z ? e.style.height = A.dimensions.height + "px" : e.style.height = "";
        }
        v.selectedNodes.has(A.id) ? e.classList.add("flow-node-selected") : e.classList.remove("flow-node-selected"), e.setAttribute("aria-selected", String(!!A.selected)), A._validationErrors && A._validationErrors.length > 0 ? e.classList.add("flow-node-invalid") : e.classList.remove("flow-node-invalid");
        const T = ["flow-node-running", "flow-node-completed", "flow-node-failed", "flow-node-skipped"], P = A.runState;
        for (const V of T)
          e.classList.remove(V);
        P && P !== "pending" && e.classList.add(`flow-node-${P}`);
        for (const V of _)
          e.classList.remove(V);
        const $ = A.class ? A.class.split(/\s+/).filter(Boolean) : [];
        for (const V of $)
          e.classList.add(V);
        _ = $;
        const H = A.shape ? `flow-node-${A.shape}` : "";
        S !== H && (S && e.classList.remove(S), H && e.classList.add(H), S = H);
        const z = e.closest("[data-flow-canvas]"), I = z ? t.$data(z) : null, C = A.shape && I?._shapeRegistry?.[A.shape];
        if (C?.clipPath ? e.style.clipPath = C.clipPath : e.style.clipPath = "", A.style) {
          const V = typeof A.style == "string" ? Object.fromEntries(A.style.split(";").filter(Boolean).map((Z) => Z.split(":").map((te) => te.trim()))) : A.style, j = [];
          for (const [Z, te] of Object.entries(V))
            Z && te && (e.style.setProperty(Z, te), j.push(Z));
          for (const Z of b)
            j.includes(Z) || e.style.removeProperty(Z);
          b = j;
        } else if (b.length > 0) {
          for (const V of b)
            e.style.removeProperty(V);
          b = [];
        }
        if (A.rotation ? (e.style.transform = `rotate(${A.rotation}deg)`, e.style.transformOrigin = "center") : e.style.transform = "", A.focusable ?? v._config?.nodesFocusable !== !1 ? (e.setAttribute("tabindex", "0"), e.setAttribute("role", A.ariaRole ?? "group"), e.setAttribute("aria-label", A.ariaLabel ?? (A.data?.label ? w("a11y.nodeLabel", { label: A.data.label }) : w("a11y.nodeId", { id: A.id })))) : (e.removeAttribute("tabindex"), e.removeAttribute("role"), e.removeAttribute("aria-label")), A.domAttributes)
          for (const [V, j] of Object.entries(A.domAttributes))
            V.startsWith("on") || rm.has(V.toLowerCase()) || e.setAttribute(V, j);
        Ye(A) ? e.classList.remove("flow-node-no-connect") : e.classList.add("flow-node-no-connect"), A.collapsed ? e.classList.add("flow-node-collapsed") : e.classList.remove("flow-node-collapsed");
        const O = e.classList.contains("flow-node-condensed");
        A.condensed ? e.classList.add("flow-node-condensed") : e.classList.remove("flow-node-condensed"), !!A.condensed !== O && requestAnimationFrame(() => {
          A.dimensions = {
            width: e.offsetWidth,
            height: e.offsetHeight
          }, B("condense", `Node "${A.id}" re-measured after condense toggle`, A.dimensions);
        }), A.filtered ? e.classList.add("flow-node-filtered") : e.classList.remove("flow-node-filtered");
        const Y = A.handles ?? "visible";
        e.classList.remove("flow-handles-hidden", "flow-handles-hover", "flow-handles-select"), Y !== "visible" && e.classList.add(`flow-handles-${Y}`);
        let K = Oa(A, v._nodeMap);
        v._config?.elevateNodesOnSelect !== !1 && v.selectedNodes.has(A.id) && (K += A.type === "group" ? Math.max(1 - K, 0) : 1e3), m && (K += 1e3);
        const W = A.type === "group" ? 0 : 2;
        if (K !== W ? e.style.zIndex = String(K) : e.style.removeProperty("z-index"), !Ca(A)) {
          e.classList.add("flow-node-locked"), a?.destroy(), a = null;
          return;
        }
        e.classList.remove("flow-node-locked"), e.querySelector("[data-flow-drag-handle]") ? e.classList.add("flow-node-has-handle") : e.classList.remove("flow-node-has-handle");
        const q = e.closest(".flow-container");
        a || (a = tm(e, A.id, {
          container: q ?? void 0,
          filterSelector: "[data-flow-drag-handle]",
          isLocked: () => v._animationLocked,
          noDragClassName: v._config?.noDragClassName ?? "nodrag",
          dragThreshold: v._config?.nodeDragThreshold ?? 0,
          getViewport: () => v.viewport,
          getNodePosition: () => {
            const V = v.getNode(A.id);
            return V ? V.parentId ? v.getAbsolutePosition(V.id) : { x: V.position.x, y: V.position.y } : { x: 0, y: 0 };
          },
          snapToGrid: v._config?.snapToGrid ?? !1,
          onDragStart({ nodeId: V, position: j, sourceEvent: Z }) {
            e.classList.add("flow-node-dragging"), r = !1, c = !1, d = null;
            const te = v._container ? Fe.get(v._container) : void 0;
            te?.bridge && te.bridge.setDragging(V, !0), h?.destroy(), h = null, p = null, g && q && q.querySelector(`[data-flow-node-id="${CSS.escape(g)}"]`)?.classList.remove("flow-node-drop-target"), g = null, l = v._snapshotHistory?.() ?? null, B("drag", `Node "${V}" drag start`, j);
            const F = v.getNode(V);
            if (F) {
              if (v._config?.selectNodesOnDrag !== !1 && yn(F, v._config?.nodesSelectable !== !1) && !v.selectedNodes.has(V) && (xt(Z, v._shortcuts?.multiSelect) || v.deselectAll(), v.selectedNodes.add(V), F.selected = !0, v._emitSelectionChange(), c = !0), v._emit("node-drag-start", { node: F }), v.selectedNodes.has(V) && v.selectedNodes.size > 1) {
                const J = Et(V, v.nodes);
                d = /* @__PURE__ */ new Map();
                for (const ee of v.selectedNodes) {
                  if (ee === V || J.has(ee))
                    continue;
                  const Q = v.getNode(ee);
                  Q && Q.draggable !== !1 && d.set(ee, { x: Q.position.x, y: Q.position.y });
                }
              }
              if (v._draggingNodeIds.add(V), d)
                for (const J of d.keys())
                  v._draggingNodeIds.add(J);
            }
            v._config?.autoPanOnNodeDrag !== !1 && q && (f = ka({
              container: q,
              speed: v._config?.autoPanSpeed ?? 15,
              onPan(J, ee) {
                const Q = () => v._viewportLive ?? v.viewport, se = Q().zoom || 1, ne = { x: Q().x, y: Q().y };
                v._panZoom?.setViewport({
                  x: Q().x - J,
                  y: Q().y - ee,
                  zoom: se
                });
                const ce = ne.x - Q().x, ie = ne.y - Q().y, oe = ce === 0 && ie === 0, ge = v.getNode(V);
                let he = !1;
                if (ge) {
                  const G = ge.position.x, ue = ge.position.y;
                  ge.position.x += ce / se, ge.position.y += ie / se;
                  const me = Wn(ge.position, ge, v._config?.nodeExtent);
                  ge.position.x = me.x, ge.position.y = me.y, he = ge.position.x === G && ge.position.y === ue;
                }
                if (d)
                  for (const [G] of d) {
                    const ue = v.getNode(G);
                    if (ue) {
                      ue.position.x += ce / se, ue.position.y += ie / se;
                      const me = Wn(ue.position, ue, v._config?.nodeExtent);
                      ue.position.x = me.x, ue.position.y = me.y;
                    }
                  }
                return oe && he;
              }
            }), Z instanceof MouseEvent && f.updatePointer(Z.clientX, Z.clientY), f.start());
          },
          onDrag({ nodeId: V, position: j, delta: Z, sourceEvent: te }) {
            r = !0;
            const F = v.getNode(V);
            if (F) {
              if (F.parentId) {
                const Q = v.getAbsolutePosition(F.parentId);
                let se = j.x - Q.x, ne = j.y - Q.y;
                const ce = F.dimensions ?? { width: 150, height: 50 }, ie = v.getNode(F.parentId);
                if (ie?.childLayout) {
                  m || (e.classList.add("flow-reorder-dragging"), x = F.parentId), m = !0;
                  const oe = F.extent !== "parent";
                  if (F.position.x = j.x - Q.x, F.position.y = j.y - Q.y, !oe && ie.dimensions) {
                    const G = Bo({ x: F.position.x, y: F.position.y }, ce, ie.dimensions);
                    F.position.x = G.x, F.position.y = G.y;
                  }
                  const ge = F.dimensions?.width ?? 150, he = F.dimensions?.height ?? 50;
                  if (oe) {
                    const G = ie.dimensions?.width ?? 150, ue = ie.dimensions?.height ?? 50, me = F.position.x + ge / 2, Ee = F.position.y + he / 2, _e = 12, Ve = x === F.parentId ? 0 : _e, Xe = me >= Ve && me <= G - Ve && Ee >= Ve && Ee <= ue - Ve, Ce = /* @__PURE__ */ new Set();
                    let pe = F.parentId;
                    for (; pe; )
                      Ce.add(pe), pe = v.getNode(pe)?.parentId;
                    const Le = j.x + ge / 2, De = j.y + he / 2, Ne = Et(F.id, v.nodes);
                    let X = null;
                    const ae = v.nodes.filter(
                      (le) => le.id !== F.id && (le.droppable || le.childLayout) && !le.hidden && !Ne.has(le.id) && (Xe ? !Ce.has(le.id) : le.id !== F.parentId) && (!le.acceptsDrop || le.acceptsDrop(F))
                    );
                    for (const le of ae) {
                      const fe = le.parentId ? v.getAbsolutePosition(le.id) : le.position, ye = le.dimensions?.width ?? 150, xe = le.dimensions?.height ?? 50, Ae = le.id === g ? 0 : _e;
                      Le >= fe.x + Ae && Le <= fe.x + ye - Ae && De >= fe.y + Ae && De <= fe.y + xe - Ae && (X = le);
                    }
                    const de = X?.id ?? null;
                    if (de !== g) {
                      g && q && q.querySelector(`[data-flow-node-id="${CSS.escape(g)}"]`)?.classList.remove("flow-node-drop-target"), de && q && q.querySelector(`[data-flow-node-id="${CSS.escape(de)}"]`)?.classList.add("flow-node-drop-target"), g = de;
                      const le = de ? v.getNode(de) : null, fe = x;
                      if (le?.childLayout && de !== x) {
                        fe && (v.layoutChildren(fe, { omitFromComputation: V, shallow: !0 }), v.propagateLayoutUp(fe, { omitFromComputation: V })), x = de;
                        const ye = v.nodes.filter((Se) => Se.parentId === de && Se.id !== V).sort((Se, on) => (Se.order ?? 1 / 0) - (on.order ?? 1 / 0)), xe = ye.length, Ae = [...ye];
                        Ae.splice(xe, 0, F);
                        for (let Se = 0; Se < Ae.length; Se++)
                          Ae[Se].order = Se;
                        y = xe;
                        const Re = v._initialDimensions?.get(V), Pe = { ...F, dimensions: Re ? { ...Re } : void 0 };
                        v.layoutChildren(de, { excludeId: V, includeNode: Pe, shallow: !0 }), v.propagateLayoutUp(de, { includeNode: Pe });
                      } else Xe && x !== F.parentId ? (fe && fe !== F.parentId && (v.layoutChildren(fe, { omitFromComputation: V, shallow: !0 }), v.propagateLayoutUp(fe, { omitFromComputation: V })), x = F.parentId, y = -1) : !de && !Xe && (fe && (v.layoutChildren(fe, { omitFromComputation: V, shallow: !0 }), v.propagateLayoutUp(fe, { omitFromComputation: V })), x = null, y = -1);
                    }
                  }
                  if (x) {
                    const G = v.getNode(x), ue = G?.childLayout ?? ie.childLayout, me = v.nodes.filter((pe) => pe.parentId === x && pe.id !== V).sort((pe, Le) => (pe.order ?? 1 / 0) - (Le.order ?? 1 / 0));
                    let Ee, _e;
                    if (x !== F.parentId) {
                      const pe = G?.parentId ? v.getAbsolutePosition(x) : G?.position ?? { x: 0, y: 0 };
                      Ee = j.x - pe.x, _e = j.y - pe.y;
                    } else
                      Ee = F.position.x, _e = F.position.y;
                    const Ve = ue.swapThreshold ?? 0.5;
                    if (y === -1)
                      if (x === F.parentId) {
                        const pe = F.order ?? 0;
                        y = me.filter((Le) => (Le.order ?? 0) < pe).length;
                      } else
                        y = me.length;
                    const Xe = y;
                    let Ce = me.length;
                    for (let pe = 0; pe < me.length; pe++) {
                      const Le = me[pe], De = Le.dimensions?.width ?? 150, Ne = Le.dimensions?.height ?? 50, X = pe < Xe ? 1 - Ve : Ve, ae = Le.position.y + Ne * X, de = Le.position.x + De * X;
                      if (ue.direction === "grid") {
                        const le = {
                          x: Ee + ge / 2,
                          y: _e + he / 2
                        }, fe = Le.position.y + Ne / 2;
                        if (le.y < Le.position.y) {
                          Ce = pe;
                          break;
                        }
                        if (Math.abs(le.y - fe) < Ne / 2 && le.x < de) {
                          Ce = pe;
                          break;
                        }
                      } else if (ue.direction === "vertical") {
                        if ((pe < Xe ? _e : _e + he) < ae) {
                          Ce = pe;
                          break;
                        }
                      } else if ((pe < Xe ? Ee : Ee + ge) < de) {
                        Ce = pe;
                        break;
                      }
                    }
                    if (Ce !== y) {
                      y = Ce;
                      const pe = [...me];
                      pe.splice(Ce, 0, F);
                      for (let ae = 0; ae < pe.length; ae++)
                        pe[ae].order = ae;
                      e.closest(".flow-container")?.classList.add("flow-layout-animating"), v._layoutAnimFrame && cancelAnimationFrame(v._layoutAnimFrame);
                      const De = F.id, Ne = x, X = Ne !== F.parentId;
                      v._layoutAnimFrame = requestAnimationFrame(() => {
                        if (X && Ne) {
                          const fe = v.getNode(De);
                          let ye;
                          if (fe) {
                            const xe = v._initialDimensions?.get(De);
                            ye = { ...fe, dimensions: xe ? { ...xe } : void 0 };
                          }
                          v.layoutChildren(Ne, {
                            excludeId: De,
                            includeNode: ye,
                            shallow: !0
                          }), v.propagateLayoutUp(Ne, {
                            includeNode: ye
                          });
                        } else
                          v.layoutChildren(Ne, De, !0);
                        const ae = performance.now(), de = 300, le = () => {
                          v._layoutAnimTick++, performance.now() - ae < de ? v._layoutAnimFrame = requestAnimationFrame(le) : v._layoutAnimFrame = 0;
                        };
                        v._layoutAnimFrame = requestAnimationFrame(le);
                      });
                    }
                  }
                  f && te instanceof MouseEvent && f.updatePointer(te.clientX, te.clientY);
                  return;
                }
                if (F.extent === "parent" && ie?.dimensions) {
                  const oe = Bo(
                    { x: se, y: ne },
                    ce,
                    ie.dimensions
                  );
                  se = oe.x, ne = oe.y;
                } else if (Array.isArray(F.extent)) {
                  const oe = za({ x: se, y: ne }, F.extent, ce);
                  se = oe.x, ne = oe.y;
                }
                if ((!F.extent || F.extent !== "parent") && (_n(
                  ie,
                  v._config?.childValidationRules ?? {}
                )?.preventChildEscape || !!ie?.childLayout) && ie?.dimensions) {
                  const he = Bo(
                    { x: se, y: ne },
                    ce,
                    ie.dimensions
                  );
                  se = he.x, ne = he.y;
                }
                if (F.expandParent && ie?.dimensions) {
                  const oe = Jh(
                    { x: se, y: ne },
                    ce,
                    ie.dimensions
                  );
                  oe && (ie.dimensions.width = oe.width, ie.dimensions.height = oe.height);
                }
                F.position.x = se, F.position.y = ne;
              } else {
                const Q = Wn(j, F, v._config?.nodeExtent);
                F.position.x = Q.x, F.position.y = Q.y;
              }
              if (v._config?.snapToGrid) {
                const Q = F.nodeOrigin ?? v._config?.nodeOrigin ?? [0, 0], se = F.dimensions?.width ?? 150, ne = F.dimensions?.height ?? 40, ce = F.parentId ? v.getAbsolutePosition(F.id) : F.position;
                e.style.left = ce.x - se * Q[0] + "px", e.style.top = ce.y - ne * Q[1] + "px", v._layoutAnimTick++;
              }
              if (v._emit("node-drag", { node: F, position: j }), d)
                for (const [Q, se] of d) {
                  const ne = v.getNode(Q);
                  if (ne) {
                    let ce = se.x + Z.x, ie = se.y + Z.y;
                    const oe = Wn({ x: ce, y: ie }, ne, v._config?.nodeExtent);
                    ne.position.x = oe.x, ne.position.y = oe.y;
                  }
                }
              const ee = v._config?.helperLines;
              if (ee) {
                const Q = typeof ee == "object" ? ee.snap ?? !0 : !0, se = typeof ee == "object" ? ee.threshold ?? 5 : 5, ne = (G) => {
                  const ue = G.parentId ? v.getAbsolutePosition(G.id) : G.position;
                  return nm({ ...G, position: ue }, v._config?.nodeOrigin);
                }, ie = (v.selectedNodes.size > 1 && v.selectedNodes.has(V) ? v.nodes.filter((G) => v.selectedNodes.has(G.id)) : [F]).map(ne), oe = {
                  x: Math.min(...ie.map((G) => G.x)),
                  y: Math.min(...ie.map((G) => G.y)),
                  width: Math.max(...ie.map((G) => G.x + G.width)) - Math.min(...ie.map((G) => G.x)),
                  height: Math.max(...ie.map((G) => G.y + G.height)) - Math.min(...ie.map((G) => G.y))
                }, ge = v.nodes.filter(
                  (G) => !v.selectedNodes.has(G.id) && G.id !== V && G.hidden !== !0 && G.filtered !== !0
                ).map(ne), he = om(oe, ge, se);
                if (Q && (he.snapOffset.x !== 0 || he.snapOffset.y !== 0) && (F.position.x += he.snapOffset.x, F.position.y += he.snapOffset.y, d))
                  for (const [G] of d) {
                    const ue = v.getNode(G);
                    ue && (ue.position.x += he.snapOffset.x, ue.position.y += he.snapOffset.y);
                  }
                if (u?.remove(), he.horizontal.length > 0 || he.vertical.length > 0) {
                  const G = q?.querySelector(".flow-viewport");
                  if (G) {
                    const ue = v.nodes.map(ne);
                    u = um(he.horizontal, he.vertical, ue), G.appendChild(u);
                  }
                } else
                  u = null;
                v._emit("helper-lines-change", {
                  horizontal: he.horizontal,
                  vertical: he.vertical
                });
              }
            }
            if (v._config?.preventOverlap) {
              const ee = typeof v._config.preventOverlap == "number" ? v._config.preventOverlap : 5, Q = F.dimensions?.width ?? we, se = F.dimensions?.height ?? be, ne = v.selectedNodes, ce = v.nodes.filter((oe) => oe.id !== F.id && !oe.hidden && !ne.has(oe.id)).map((oe) => Jt(oe, v._config?.nodeOrigin)), ie = Lg(F.position, Q, se, ce, ee);
              F.position.x = ie.x, F.position.y = ie.y;
            }
            if (!F.parentId) {
              const ee = Et(F.id, v.nodes), Q = v.nodes.filter(
                (oe) => oe.id !== F.id && oe.droppable && !oe.hidden && !ee.has(oe.id) && (!oe.acceptsDrop || oe.acceptsDrop(F))
              ), se = Jt(F, v._config?.nodeOrigin);
              let ne = null;
              const ce = 12;
              for (const oe of Q) {
                const ge = oe.parentId ? v.getAbsolutePosition(oe.id) : oe.position, he = oe.dimensions?.width ?? we, G = oe.dimensions?.height ?? be, ue = se.x + se.width / 2, me = se.y + se.height / 2, Ee = oe.id === g ? 0 : ce;
                ue >= ge.x + Ee && ue <= ge.x + he - Ee && me >= ge.y + Ee && me <= ge.y + G - Ee && (ne = oe);
              }
              const ie = ne?.id ?? null;
              ie !== g && (g && q && q.querySelector(`[data-flow-node-id="${CSS.escape(g)}"]`)?.classList.remove("flow-node-drop-target"), ie && q && q.querySelector(`[data-flow-node-id="${CSS.escape(ie)}"]`)?.classList.add("flow-node-drop-target"), g = ie);
            }
            if (v._config?.proximityConnect) {
              const ee = v._config.proximityConnectDistance ?? 150, Q = F.dimensions ?? { width: 150, height: 50 }, se = {
                x: F.position.x + Q.width / 2,
                y: F.position.y + Q.height / 2
              }, ne = v.nodes.filter((ie) => ie.id !== F.id && !ie.hidden).map((ie) => ({
                id: ie.id,
                center: {
                  x: ie.position.x + (ie.dimensions?.width ?? 150) / 2,
                  y: ie.position.y + (ie.dimensions?.height ?? 50) / 2
                }
              })), ce = sm(F.id, se, ne, ee);
              if (ce)
                if (v.edges.some(
                  (oe) => oe.source === ce.source && oe.target === ce.target || oe.source === ce.target && oe.target === ce.source
                ))
                  h?.destroy(), h = null, p = null;
                else {
                  if (p = ce, !h) {
                    h = Kt({
                      connectionLineType: v._config?.connectionLineType,
                      connectionLineStyle: v._config?.connectionLineStyle,
                      connectionLine: v._config?.connectionLine
                    });
                    const oe = q?.querySelector(".flow-viewport");
                    oe && oe.appendChild(h.svg);
                  }
                  h.update({
                    fromX: se.x,
                    fromY: se.y,
                    toX: ce.targetCenter.x,
                    toY: ce.targetCenter.y,
                    source: ce.source
                  });
                }
              else
                h?.destroy(), h = null, p = null;
            }
            const J = v._container ? Fe.get(v._container) : void 0;
            if (J?.bridge) {
              if (J.bridge.pushLocalNodeUpdate(V, { position: F.position }), d)
                for (const [ee] of d) {
                  const Q = v.getNode(ee);
                  Q && J.bridge.pushLocalNodeUpdate(ee, { position: Q.position });
                }
              if (J.awareness && te instanceof MouseEvent && v._container) {
                const ee = v._container.getBoundingClientRect(), Q = v._viewportLive ?? v.viewport, se = (te.clientX - ee.left - Q.x) / Q.zoom, ne = (te.clientY - ee.top - Q.y) / Q.zoom;
                J.awareness.updateCursor({ x: se, y: ne });
              }
            }
            f && te instanceof MouseEvent && f.updatePointer(te.clientX, te.clientY);
          },
          onDragEnd({ nodeId: V, position: j }) {
            const Z = d ? [V, ...d.keys()] : [V];
            v._draggingNodeIds.clear(), e.classList.remove("flow-node-dragging"), B("drag", `Node "${V}" drag end`, j);
            const te = v._container ? Fe.get(v._container) : void 0;
            te?.bridge && te.bridge.setDragging(V, !1), f?.stop(), f = null, u?.remove(), u = null, v._config?.helperLines && v._emit("helper-lines-change", { horizontal: [], vertical: [] });
            const F = v.getNode(V);
            if (F && v._emit("node-drag-end", { node: F, position: j }), m && F?.parentId) {
              e.classList.remove("flow-reorder-dragging");
              const J = x;
              m = !1, y = -1, x = null, v._layoutAnimFrame && (cancelAnimationFrame(v._layoutAnimFrame), v._layoutAnimFrame = 0), e.closest(".flow-container")?.classList.remove("flow-layout-animating"), g ? (q && q.querySelector(`[data-flow-node-id="${CSS.escape(g)}"]`)?.classList.remove("flow-node-drop-target"), Go(v, V, g), g = null) : J && J !== F.parentId ? (v.layoutChildren(J, { omitFromComputation: V, shallow: !0 }), v.propagateLayoutUp(J, { omitFromComputation: V }), v.layoutChildren(F.parentId), v._emit("child-reorder", {
                nodeId: V,
                parentId: F.parentId,
                order: F.order
              })) : (v.layoutChildren(F.parentId), v._emit("child-reorder", {
                nodeId: V,
                parentId: F.parentId,
                order: F.order
              })), d = null, v._layoutAnimTick++, v._commitNodeGeometry(Z), gr(v, r, l), l = null, r = !1;
              return;
            }
            if (F && g)
              q && q.querySelector(`[data-flow-node-id="${CSS.escape(g)}"]`)?.classList.remove("flow-node-drop-target"), Go(v, V, g), g = null;
            else if (F && F.parentId && !g) {
              const J = _n(
                v.getNode(F.parentId),
                v._config?.childValidationRules ?? {}
              ), ee = v.getNode(F.parentId);
              if (!J?.preventChildEscape && !ee?.childLayout && ee?.dimensions) {
                const Q = F.position.x, se = F.position.y, ne = F.dimensions?.width ?? 150, ce = F.dimensions?.height ?? 50;
                (Q + ne < 0 || se + ce < 0 || Q > ee.dimensions.width || se > ee.dimensions.height) && Go(v, V, null);
              }
              g = null;
            } else
              g && q && q.querySelector(`[data-flow-node-id="${CSS.escape(g)}"]`)?.classList.remove("flow-node-drop-target"), g = null;
            if (v._config?.proximityConnect && p) {
              const J = p;
              h?.destroy(), h = null, p = null;
              let ee = !0;
              if (v._config.onProximityConnect && v._config.onProximityConnect({
                source: J.source,
                target: J.target,
                distance: J.distance
              }) === !1 && (ee = !1), ee) {
                const Q = {
                  source: J.source,
                  sourceHandle: "source",
                  target: J.target,
                  targetHandle: "target"
                };
                if (bt(Q, v.edges, { preventCycles: v._config?.preventCycles }) && vt(Q, v._config?.connectionRules, v._nodeMap) && (q ? rt(q, Q, v.edges) : !0) && (q ? st(q, Q) : !0) && (!v._config.isValidConnection || v._config.isValidConnection(Q))) {
                  if (v._config.proximityConnectConfirm) {
                    const ge = q?.querySelector(`[data-flow-node-id="${CSS.escape(J.source)}"]`), he = q?.querySelector(`[data-flow-node-id="${CSS.escape(J.target)}"]`);
                    ge?.classList.add("flow-proximity-confirm"), he?.classList.add("flow-proximity-confirm"), setTimeout(() => {
                      ge?.classList.remove("flow-proximity-confirm"), he?.classList.remove("flow-proximity-confirm");
                    }, 400);
                  }
                  const oe = `e-${J.source}-${J.target}-${Date.now()}-${am++}`;
                  v.addEdges({ id: oe, ...Q }), v._emit("connect", { connection: Q });
                }
              }
            } else
              h?.destroy(), h = null, p = null;
            d = null, r && (v._layoutAnimTick++, v._commitNodeGeometry(Z)), gr(v, r, l), l = null, r = !1;
          }
        }));
      });
      {
        const A = t.$data(e.closest("[x-data]"));
        if (A?._config?.easyConnect) {
          const v = A._config.easyConnectKey ?? "alt", w = (T) => {
            if (!cm(T, v) || T.target.closest("[data-flow-handle-type]")) return;
            const P = t.$data(e.closest("[x-data]"));
            if (!P || P._animationLocked || P._connectValidating) return;
            const $ = o(n);
            if (!$) return;
            const H = P.getNode($.id);
            if (!H || H.connectable === !1) return;
            T.preventDefault(), T.stopPropagation(), T.stopImmediatePropagation();
            const z = dm(e, T.clientX, T.clientY), I = z?.dataset.flowHandleId ?? "source";
            e.classList.add("flow-easy-connecting");
            const C = e.closest(".flow-container");
            if (!C) return;
            const N = P._viewportLive ?? P.viewport, O = N?.zoom || 1, Y = N?.x || 0, K = N?.y || 0, U = C.getBoundingClientRect();
            let W, re;
            if (z) {
              const ee = z.getBoundingClientRect();
              W = (ee.left + ee.width / 2 - U.left - Y) / O, re = (ee.top + ee.height / 2 - U.top - K) / O;
            } else {
              const ee = e.getBoundingClientRect();
              W = (ee.left + ee.width / 2 - U.left - Y) / O, re = (ee.top + ee.height / 2 - U.top - K) / O;
            }
            P._emit("connect-start", { source: $.id, sourceHandle: I });
            const q = Kt({
              connectionLineType: P._config?.connectionLineType,
              connectionLineStyle: P._config?.connectionLineStyle,
              connectionLine: P._config?.connectionLine
            }), V = C.querySelector(".flow-viewport");
            V && V.appendChild(q.svg), q.update({ fromX: W, fromY: re, toX: W, toY: re, source: $.id, sourceHandle: I }), P.pendingConnection = { source: $.id, sourceHandle: I, position: { x: W, y: re } }, Pn(C, $.id, I, P);
            let j = To(C, P, T.clientX, T.clientY), Z = null;
            const te = P._config?.connectionSnapRadius ?? 20, F = (ee) => {
              const Q = P.screenToFlowPosition(ee.clientX, ee.clientY), se = Mn({
                containerEl: C,
                handleType: "target",
                excludeNodeId: $.id,
                cursorFlowPos: Q,
                connectionSnapRadius: te,
                getNode: (ne) => P.getNode(ne),
                toFlowPosition: (ne, ce) => P.screenToFlowPosition(ne, ce)
              });
              se.element !== Z && (Z?.classList.remove("flow-handle-active"), se.element?.classList.add("flow-handle-active"), Z = se.element), q.update({ fromX: W, fromY: re, toX: se.position.x, toY: se.position.y, source: $.id, sourceHandle: I }), P.pendingConnection = { ...P.pendingConnection, position: se.position }, j?.updatePointer(ee.clientX, ee.clientY);
            }, J = async (ee) => {
              j?.stop(), j = null, document.removeEventListener("pointermove", F), document.removeEventListener("pointerup", J), q.destroy(), Z?.classList.remove("flow-handle-active"), Me(C), e.classList.remove("flow-easy-connecting");
              const Q = P.screenToFlowPosition(ee.clientX, ee.clientY), se = { source: $.id, sourceHandle: I, position: Q };
              P.pendingConnection = null;
              let ne = Z;
              if (ne || (ne = document.elementFromPoint(ee.clientX, ee.clientY)?.closest('[data-flow-handle-type="target"]')), !ne) {
                P._emit("connect-end", { connection: null, ...se });
                return;
              }
              const ie = ne.closest("[x-flow-node]")?.dataset.flowNodeId, oe = ne.dataset.flowHandleId ?? "target";
              if (!ie) {
                P._emit("connect-end", { connection: null, ...se });
                return;
              }
              const ge = { source: $.id, sourceHandle: I, target: ie, targetHandle: oe }, he = await Pa({ connection: ge, canvas: P, containerEl: C });
              P._emit("connect-end", {
                connection: he.applied ? ge : null,
                ...se
              });
            };
            document.addEventListener("pointermove", F), document.addEventListener("pointerup", J);
          };
          e.addEventListener("pointerdown", w, { capture: !0 }), s(() => {
            e.removeEventListener("pointerdown", w, { capture: !0 });
          });
        }
      }
      const M = (A) => {
        if (!lm(A, e)) return;
        A.preventDefault();
        const v = o(n);
        if (!v) return;
        const w = t.$data(e.closest("[x-data]"));
        w && (w._animationLocked || (w._emit("node-click", { node: v, event: A }), yn(v, w._config?.nodesSelectable !== !1) && (A.stopPropagation(), xt(A, w._shortcuts?.multiSelect) ? w.selectedNodes.has(v.id) ? (w.selectedNodes.delete(v.id), v.selected = !1) : (w.selectedNodes.add(v.id), v.selected = !0) : (w.deselectAll(), w.selectedNodes.add(v.id), v.selected = !0), w._emitSelectionChange())));
      };
      e.addEventListener("keydown", M);
      const R = () => {
        const A = t.$data(e.closest("[x-data]"));
        if (!A?._config?.autoPanOnNodeFocus) return;
        const v = o(n);
        if (!v) return;
        const w = v.parentId ? A.getAbsolutePosition(v.id) : v.position;
        A.setCenter(
          w.x + (v.dimensions?.width ?? 150) / 2,
          w.y + (v.dimensions?.height ?? 40) / 2
        );
      };
      e.addEventListener("focus", R);
      const L = (A) => {
        if (r) return;
        const v = o(n);
        if (!v) return;
        const w = t.$data(e.closest("[x-data]"));
        if (w && !w._animationLocked && (w._emit("node-click", { node: v, event: A }), !!yn(v, w._config?.nodesSelectable !== !1))) {
          if (A.stopPropagation(), c) {
            c = !1;
            return;
          }
          xt(A, w._shortcuts?.multiSelect) ? w.selectedNodes.has(v.id) ? (w.selectedNodes.delete(v.id), v.selected = !1, e.classList.remove("flow-node-selected"), B("selection", `Node "${v.id}" deselected (shift)`)) : (w.selectedNodes.add(v.id), v.selected = !0, e.classList.add("flow-node-selected"), B("selection", `Node "${v.id}" selected (shift)`)) : (w.deselectAll(), w.selectedNodes.add(v.id), v.selected = !0, e.classList.add("flow-node-selected"), B("selection", `Node "${v.id}" selected`)), w._emitSelectionChange();
        }
      };
      e.addEventListener("click", L);
      const D = (A) => {
        A.preventDefault(), A.stopPropagation();
        const v = o(n);
        if (!v) return;
        const w = t.$data(e.closest("[x-data]"));
        if (w)
          if (w.selectedNodes.size > 1 && w.selectedNodes.has(v.id)) {
            const { nodes: T, edges: P } = w.getSelectedNodesAndEdges();
            w._emit("selection-context-menu", { nodes: T, edges: P, event: A });
          } else
            w._emit("node-context-menu", { node: v, event: A });
      };
      e.addEventListener("contextmenu", D), requestAnimationFrame(() => {
        if (!e.isConnected) return;
        const A = o(n);
        if (!A) return;
        const v = t.$data(e.closest("[x-data]"));
        A.dimensions = {
          width: e.offsetWidth,
          height: e.offsetHeight
        }, B("init", `Node "${A.id}" measured`, A.dimensions), v?._nodeElements?.set(A.id, e), A.resizeObserver !== !1 && v?._resizeObserver && v._resizeObserver.observe(e);
      }), s(() => {
        a?.destroy(), u?.remove(), u = null, h?.destroy(), h = null, e.removeEventListener("keydown", M), e.removeEventListener("focus", R), e.removeEventListener("click", L), e.removeEventListener("contextmenu", D);
        const A = e.dataset.flowNodeId;
        if (A) {
          const v = t.$data(e.closest("[x-data]"));
          v?._nodeElements?.delete(A), v?._resizeObserver?.unobserve(e), v?._draggingNodeIds?.delete(A);
        }
      });
    }
  );
}
const $t = {
  minWidth: 30,
  minHeight: 30,
  maxWidth: 1 / 0,
  maxHeight: 1 / 0
};
function hm(t, e, n, o, i, s) {
  const { minWidth: a, minHeight: r, maxWidth: l, maxHeight: c } = i, d = t.includes("left"), f = t.includes("right"), u = t.includes("top"), h = t.includes("bottom");
  let p = o.width;
  f ? p = o.width + e.x : d && (p = o.width - e.x);
  let g = o.height;
  h ? g = o.height + e.y : u && (g = o.height - e.y), p = Math.max(a, Math.min(l, p)), g = Math.max(r, Math.min(c, g)), s && (p = s[0] * Math.round(p / s[0]), g = s[1] * Math.round(g / s[1]), p = Math.max(a, Math.min(l, p)), g = Math.max(r, Math.min(c, g)));
  const m = p - o.width, y = g - o.height, x = d ? n.x - m : n.x, k = u ? n.y - y : n.y;
  return {
    position: { x, y: k },
    dimensions: { width: p, height: g }
  };
}
const el = ["top-left", "top-right", "bottom-left", "bottom-right"], tl = ["top", "right", "bottom", "left"], gm = [...el, ...tl], pm = {
  "top-left": "nwse-resize",
  "top-right": "nesw-resize",
  "bottom-left": "nesw-resize",
  "bottom-right": "nwse-resize",
  top: "ns-resize",
  bottom: "ns-resize",
  left: "ew-resize",
  right: "ew-resize"
};
function mm(t) {
  t.directive(
    "flow-resizer",
    (e, { expression: n, modifiers: o }, { evaluate: i, effect: s, cleanup: a }) => {
      const r = ym(o);
      let l = { ...$t };
      if (n)
        try {
          const d = i(n);
          l = { ...$t, ...d };
        } catch {
        }
      const c = [];
      for (const d of r) {
        const f = document.createElement("div");
        f.className = `flow-resizer-handle flow-resizer-handle-${d}`, f.style.cursor = pm[d], f.dataset.flowResizeDirection = d, e.appendChild(f), c.push(f), f.addEventListener("pointerdown", (u) => {
          u.preventDefault(), u.stopPropagation();
          const h = e.closest("[x-flow-node]");
          if (!h) return;
          const p = e.closest("[x-data]");
          if (!p) return;
          const g = t.$data(p), m = h.dataset.flowNodeId;
          if (!m || !g) return;
          const y = g.getNode(m);
          if (!y || !As(y)) return;
          y.fixedDimensions = !0;
          const x = { ...l };
          if (y.minDimensions?.width != null && l.minWidth === $t.minWidth && (x.minWidth = y.minDimensions.width), y.minDimensions?.height != null && l.minHeight === $t.minHeight && (x.minHeight = y.minDimensions.height), y.maxDimensions?.width != null && l.maxWidth === $t.maxWidth && (x.maxWidth = y.maxDimensions.width), y.maxDimensions?.height != null && l.maxHeight === $t.maxHeight && (x.maxHeight = y.maxDimensions.height), !y.dimensions) {
            const L = g.viewport?.zoom || 1, D = h.getBoundingClientRect();
            y.dimensions = { width: D.width / L, height: D.height / L };
          }
          const k = { x: y.position.x, y: y.position.y }, _ = { width: y.dimensions.width, height: y.dimensions.height }, S = g.viewport?.zoom || 1, b = u.clientX, E = u.clientY;
          g._captureHistory?.(), B("resize", `Resize start on "${m}" (${d})`, _), g._emit("node-resize-start", { node: y, dimensions: { ..._ } });
          const M = (L) => {
            const D = {
              x: (L.clientX - b) / S,
              y: (L.clientY - E) / S
            }, A = hm(
              d,
              D,
              k,
              _,
              x,
              g._config?.snapToGrid ?? !1
            );
            if (y.position.x = A.position.x, y.position.y = A.position.y, y.dimensions.width = A.dimensions.width, y.dimensions.height = A.dimensions.height, y.parentId) {
              const v = g.getAbsolutePosition(y.id);
              h.style.left = `${v.x}px`, h.style.top = `${v.y}px`;
            } else
              h.style.left = `${A.position.x}px`, h.style.top = `${A.position.y}px`;
            h.style.width = `${A.dimensions.width}px`, h.style.height = `${A.dimensions.height}px`, g._layoutAnimTick++, g._emit("node-resize", { node: y, dimensions: { ...A.dimensions } });
          }, R = () => {
            document.removeEventListener("pointermove", M), document.removeEventListener("pointerup", R), document.removeEventListener("pointercancel", R), B("resize", `Resize end on "${m}"`, y.dimensions), g._emit("node-resize-end", { node: y, dimensions: { ...y.dimensions } });
          };
          document.addEventListener("pointermove", M), document.addEventListener("pointerup", R), document.addEventListener("pointercancel", R);
        });
      }
      s(() => {
        const d = e.closest("[x-flow-node]");
        if (!d) return;
        const f = e.closest("[x-data]");
        if (!f) return;
        const u = t.$data(f), h = d.dataset.flowNodeId;
        if (!h || !u) return;
        const p = u.getNode(h);
        if (!p) return;
        const g = !As(p);
        for (const m of c)
          m.style.display = g ? "none" : "";
      }), a(() => {
        for (const d of c)
          d.remove();
      });
    }
  );
}
function ym(t) {
  if (t.includes("corners"))
    return el;
  if (t.includes("edges"))
    return tl;
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
  return gm;
}
let pr = !1;
function Ge(t) {
  const e = t.closest("[data-flow-target]");
  if (e) {
    const i = e.getAttribute("data-flow-target");
    if (i) {
      const s = document.querySelector(i);
      if (s)
        return s;
    }
  }
  const n = t.closest("[data-flow-canvas]");
  if (n)
    return n;
  const o = document.querySelectorAll("[data-flow-canvas]");
  return o.length === 1 ? o[0] : (pr || (pr = !0, console.warn(
    '[alpineflow] Could not resolve a canvas for a flow directive placed outside the canvas element. Add `data-flow-target="<selector>"` pointing at the canvas, or ensure exactly one canvas is present in the document.'
  )), null);
}
function wm(t, e, n, o) {
  return (Math.atan2(t - n, -(e - o)) * 180 / Math.PI % 360 + 360) % 360;
}
function _m(t, e) {
  return (Math.round(t / e) * e % 360 + 360) % 360;
}
function vm(t) {
  t.directive(
    "flow-rotate",
    (e, { expression: n, modifiers: o }, { evaluate: i, effect: s, cleanup: a }) => {
      const r = o.includes("snap"), l = r && n && Number(i(n)) || 15;
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
        const k = (S) => {
          let b = wm(
            S.clientX,
            S.clientY,
            y,
            x
          );
          r && (b = _m(b, l)), g.rotation = b;
        }, _ = () => {
          document.removeEventListener("pointermove", k), document.removeEventListener("pointerup", _), e.style.cursor = "grab", h._emit("node-rotate-end", { node: g, rotation: g.rotation });
        };
        document.addEventListener("pointermove", k), document.addEventListener("pointerup", _);
      };
      e.addEventListener("pointerdown", c), a(() => {
        e.removeEventListener("pointerdown", c), e.classList.remove("flow-rotate-handle");
      });
    }
  );
}
function bm(t) {
  t.directive(
    "flow-drag-handle",
    (e) => {
      e.setAttribute("data-flow-drag-handle", ""), e.classList.add("flow-drag-handle");
      const n = e.closest("[x-flow-node]");
      n && n.classList.add("flow-node-has-handle");
    }
  );
}
const xm = "application/alpineflow";
function Em(t) {
  t.directive(
    "flow-draggable",
    (e, { expression: n }, { evaluate: o }) => {
      e.setAttribute("draggable", "true"), e.style.cursor = "grab", e.addEventListener("dragstart", (i) => {
        if (!i.dataTransfer) return;
        const s = o(n), a = typeof s == "string" ? s : JSON.stringify(s);
        i.dataTransfer.setData(xm, a), i.dataTransfer.effectAllowed = "move";
      });
    }
  );
}
function Cm(t) {
  const e = [], n = /* @__PURE__ */ new Set();
  for (const o of t) {
    if (n.has(o.id) || o.source === o.target)
      continue;
    const i = t.find(
      (s) => s.id !== o.id && s.source === o.target && s.target === o.source && !n.has(s.id)
    );
    i && (e.push({ primaryId: o.id, mirrorId: i.id }), n.add(o.id), n.add(i.id));
  }
  return e;
}
function Sm(t) {
  t.directive(
    "flow-viewport",
    (e, {}, { effect: n, cleanup: o }) => {
      e.classList.add("flow-viewport");
      const i = t.$data(e.closest("[x-data]"));
      if (!i?.edges) return;
      typeof i._registerViewportEl == "function" ? i._registerViewportEl(e) : i._viewportEl = e;
      const s = i.viewport;
      s && (e.style.transform = `translate(${s.x}px, ${s.y}px) scale(${s.zoom})`);
      const a = document.createElement("div");
      a.classList.add("flow-edges"), e.insertBefore(a, e.firstChild);
      const r = /* @__PURE__ */ new Map();
      n(() => {
        const l = i.edges, c = new Set(l.map((g) => g.id));
        for (const [g, m] of r)
          c.has(g) || (t.destroyTree(m), m.remove(), r.delete(g), i._edgeSvgElements?.delete(g));
        for (const g of l) {
          if (r.has(g.id)) continue;
          const m = document.createElementNS("http://www.w3.org/2000/svg", "svg");
          m.setAttribute("class", "flow-edge-svg");
          const y = document.createElementNS("http://www.w3.org/2000/svg", "g");
          m.appendChild(y), t.addScopeToNode(y, { edge: g }), y.setAttribute("x-flow-edge", "edge"), t.mutateDom(() => {
            a.appendChild(m);
          }), r.set(g.id, m), i._edgeSvgElements?.set(g.id, m), t.initTree(y);
        }
        const f = (e.closest("[data-flow-canvas]") ?? e).querySelector(".flow-edges-static");
        f && f.remove();
        const u = !!i._config?.collapseBidirectionalEdges, h = /* @__PURE__ */ new Set(), p = /* @__PURE__ */ new Set();
        if (u) {
          const g = Cm(
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
          const m = r.get(g.id);
          if (!m) continue;
          const y = i.getNode?.(g.source), x = i.getNode?.(g.target), k = g.hidden || g._hiddenByCollapse || y?.hidden || x?.hidden;
          m.style.display = k ? "none" : "";
        }
        for (const g of l) {
          const m = r.get(g.id);
          if (!m) continue;
          const y = i.getNode?.(g.source), x = i.getNode?.(g.target);
          y?.filtered || x?.filtered ? m.classList.add("flow-edge-filtered") : m.classList.remove("flow-edge-filtered");
        }
      }), o(() => {
        for (const [l, c] of r)
          t.destroyTree(c), c.remove(), i._edgeSvgElements?.delete(l);
        r.clear(), a.remove();
      });
    }
  );
}
const km = [
  "top",
  "bottom",
  "left",
  "right",
  "top-left",
  "top-right",
  "bottom-left",
  "bottom-right"
], Lm = "a, button, input, textarea, select, [contenteditable]", Mm = 100, Pm = 60, Nm = /* @__PURE__ */ new Set(["top", "top-left", "top-right"]), Am = /* @__PURE__ */ new Set(["bottom", "bottom-left", "bottom-right"]), Tm = /* @__PURE__ */ new Set(["left", "top-left", "bottom-left"]), Im = /* @__PURE__ */ new Set(["right", "top-right", "bottom-right"]);
function $m(t, e) {
  const n = new Set(e), o = n.has("static"), i = n.has("no-resize") || n.has("noresize"), s = n.has("locked"), a = n.has("constrained");
  let r = n.has("fill-width") || n.has("fill"), l = n.has("fill-height") || n.has("fill");
  return { position: t && km.includes(t) ? t : "top-right", isStatic: o, isFixed: s, noResize: i, constrained: a, fillWidth: r, fillHeight: l };
}
function Dt(t, e, n) {
  t.dispatchEvent(new CustomEvent(`flow-${e}`, {
    bubbles: !0,
    detail: n
  }));
}
function Dm(t, e, n, o, i, s) {
  return {
    left: Math.max(0, Math.min(t, i - n)),
    top: Math.max(0, Math.min(e, s - o))
  };
}
function Rm(t, e, n, o) {
  t.style.transform = "none", t.style.borderRadius = "0", n && (t.style.left = "0", t.style.right = "0", t.style.width = "auto"), o && (t.style.top = "0", t.style.bottom = "0", t.style.height = "auto"), n && !o && (Nm.has(e) && (t.style.top = "0"), Am.has(e) && (t.style.bottom = "0")), o && !n && (Tm.has(e) && (t.style.left = "0"), Im.has(e) && (t.style.right = "0"));
}
function Hm(t) {
  t.directive(
    "flow-panel",
    (e, { value: n, modifiers: o }, { cleanup: i }) => {
      const {
        position: s,
        isStatic: a,
        isFixed: r,
        noResize: l,
        constrained: c,
        fillWidth: d,
        fillHeight: f
      } = $m(n, o), u = d || f, h = !a && !r && !u, p = !a && !l && !u;
      e.classList.add("flow-panel", `flow-panel-${s}`), a && e.classList.add("flow-panel-static"), (r || u) && e.classList.add("flow-panel-locked"), (l || u) && e.classList.add("flow-panel-no-resize"), d && e.classList.add("flow-panel-fill-width"), f && e.classList.add("flow-panel-fill-height"), u && Rm(e, s, d, f), i(tn(e));
      const g = e.parentElement, m = {
        left: e.style.left,
        top: e.style.top,
        right: e.style.right,
        bottom: e.style.bottom,
        transform: e.style.transform,
        width: e.style.width,
        height: e.style.height,
        borderRadius: e.style.borderRadius
      }, y = `flow-panel-${s}`, x = () => {
        e.style.left = m.left, e.style.top = m.top, e.style.right = m.right, e.style.bottom = m.bottom, e.style.transform = m.transform, e.style.width = m.width, e.style.height = m.height, e.style.borderRadius = m.borderRadius, e.classList.contains(y) || e.classList.add(y);
      };
      g.addEventListener("flow-panel-reset", x), g.__flowPanels || (g.__flowPanels = /* @__PURE__ */ new Set()), g.__flowPanels.add(e);
      let k = null;
      if (h) {
        let _ = !1, S = 0, b = 0, E = 0, M = 0;
        const R = () => {
          const v = e.getBoundingClientRect(), w = g.getBoundingClientRect();
          return {
            x: v.left - w.left,
            y: v.top - w.top
          };
        }, L = (v) => {
          if (!_) return;
          let w = E + (v.clientX - S), T = M + (v.clientY - b);
          if (c) {
            const P = Dm(
              w,
              T,
              e.offsetWidth,
              e.offsetHeight,
              g.clientWidth,
              g.clientHeight
            );
            w = P.left, T = P.top;
          }
          e.style.left = `${w}px`, e.style.top = `${T}px`, Dt(g, "panel-drag", {
            panel: e,
            position: { x: w, y: T }
          });
        }, D = () => {
          if (!_) return;
          _ = !1, document.removeEventListener("pointermove", L), document.removeEventListener("pointerup", D), document.removeEventListener("pointercancel", D);
          const v = R();
          Dt(g, "panel-drag-end", {
            panel: e,
            position: v
          });
        }, A = (v) => {
          const w = v.target;
          if (w.closest(Lm) || w.closest(".flow-panel-resize-handle"))
            return;
          _ = !0, S = v.clientX, b = v.clientY;
          const T = e.getBoundingClientRect(), P = g.getBoundingClientRect();
          E = T.left - P.left, M = T.top - P.top, e.style.bottom = "auto", e.style.right = "auto", e.style.transform = "none", e.style.left = `${E}px`, e.style.top = `${M}px`, document.addEventListener("pointermove", L), document.addEventListener("pointerup", D), document.addEventListener("pointercancel", D), Dt(g, "panel-drag-start", {
            panel: e,
            position: { x: E, y: M }
          });
        };
        if (e.addEventListener("pointerdown", A), p) {
          k = document.createElement("div"), k.classList.add("flow-panel-resize-handle"), e.appendChild(k);
          let v = !1, w = 0, T = 0, P = 0, $ = 0;
          const H = (C) => {
            if (!v) return;
            const N = Math.max(Mm, P + (C.clientX - w)), O = Math.max(Pm, $ + (C.clientY - T));
            e.style.width = `${N}px`, e.style.height = `${O}px`, Dt(g, "panel-resize", {
              panel: e,
              dimensions: { width: N, height: O }
            });
          }, z = () => {
            v && (v = !1, document.removeEventListener("pointermove", H), document.removeEventListener("pointerup", z), document.removeEventListener("pointercancel", z), Dt(g, "panel-resize-end", {
              panel: e,
              dimensions: { width: e.offsetWidth, height: e.offsetHeight }
            }));
          }, I = (C) => {
            C.stopPropagation(), v = !0, w = C.clientX, T = C.clientY, P = e.offsetWidth, $ = e.offsetHeight, document.addEventListener("pointermove", H), document.addEventListener("pointerup", z), document.addEventListener("pointercancel", z), Dt(g, "panel-resize-start", {
              panel: e,
              dimensions: { width: P, height: $ }
            });
          };
          k.addEventListener("pointerdown", I), i(() => {
            e.removeEventListener("pointerdown", A), k?.removeEventListener("pointerdown", I), document.removeEventListener("pointermove", L), document.removeEventListener("pointerup", D), document.removeEventListener("pointercancel", D), document.removeEventListener("pointermove", H), document.removeEventListener("pointerup", z), document.removeEventListener("pointercancel", z), k?.remove(), g.removeEventListener("flow-panel-reset", x), g.__flowPanels?.delete(e);
          });
        } else
          i(() => {
            e.removeEventListener("pointerdown", A), document.removeEventListener("pointermove", L), document.removeEventListener("pointerup", D), document.removeEventListener("pointercancel", D), g.removeEventListener("flow-panel-reset", x), g.__flowPanels?.delete(e);
          });
      } else
        i(() => {
          g.removeEventListener("flow-panel-reset", x), g.__flowPanels?.delete(e);
        });
    }
  );
}
function Fm(t) {
  t.directive(
    "flow-node-toolbar",
    (e, { value: n, modifiers: o }, { effect: i, cleanup: s }) => {
      const a = Om(n), r = zm(o);
      e.classList.add("flow-node-toolbar"), e.style.position = "absolute";
      const l = tn(e), c = (d) => {
        d.stopPropagation();
      };
      e.addEventListener("click", c), i(() => {
        const d = e.closest("[x-flow-node]");
        if (!d) return;
        const f = e.closest("[x-data]");
        if (!f) return;
        const u = t.$data(f);
        if (!u?.viewport) return;
        const h = u.viewport.zoom || 1, p = parseInt(e.getAttribute("data-flow-offset") ?? "10", 10), g = d.dataset.flowNodeId, m = g ? u.getNode(g) : null, y = m?.dimensions?.width ?? d.offsetWidth, x = m?.dimensions?.height ?? d.offsetHeight, k = p / h;
        let _, S, b, E;
        a === "top" || a === "bottom" ? (S = a === "top" ? -k : x + k, E = a === "top" ? "-100%" : "0%", r === "start" ? (_ = 0, b = "0%") : r === "end" ? (_ = y, b = "-100%") : (_ = y / 2, b = "-50%")) : (_ = a === "left" ? -k : y + k, b = a === "left" ? "-100%" : "0%", r === "start" ? (S = 0, E = "0%") : r === "end" ? (S = x, E = "-100%") : (S = x / 2, E = "-50%")), e.style.left = `${_}px`, e.style.top = `${S}px`, e.style.transformOrigin = "0 0", e.style.transform = `scale(${1 / h}) translate(${b}, ${E})`;
      }), s(() => {
        l(), e.removeEventListener("click", c), e.classList.remove("flow-node-toolbar");
      });
    }
  );
}
function Om(t) {
  return t === "bottom" ? "bottom" : t === "left" ? "left" : t === "right" ? "right" : "top";
}
function zm(t) {
  return t.includes("start") ? "start" : t.includes("end") ? "end" : "center";
}
function Vm(t) {
  t.directive(
    "flow-context-menu",
    (e, { modifiers: n, expression: o }, { effect: i, evaluate: s, cleanup: a }) => {
      const r = n[0];
      if (!r) {
        console.warn("[AlpineFlow] x-flow-context-menu requires a type modifier: .node, .edge, .pane, or .selection");
        return;
      }
      const l = e, c = l.closest("[x-data]");
      if (!c) return;
      const d = t.$data(c);
      let f = 0, u = 0;
      if (o) {
        const b = s(o);
        f = b?.offsetX ?? 0, u = b?.offsetY ?? 0;
      }
      l.setAttribute("role", "menu"), l.setAttribute("tabindex", "-1"), l.style.display = "none";
      const h = document.createElement("div");
      h.style.cssText = "position:fixed;inset:0;z-index:4999;display:none;", c.appendChild(h);
      let p = null;
      const g = 4, m = () => {
        p = document.activeElement;
        const b = d.contextMenu.x + f, E = d.contextMenu.y + u;
        l.style.display = "", l.style.position = "fixed", l.style.left = b + "px", l.style.top = E + "px", l.style.zIndex = "5000", l.querySelectorAll(':scope > button, :scope > [role="menuitem"]').forEach((v) => {
          v.setAttribute("role", "menuitem"), v.hasAttribute("tabindex") || v.setAttribute("tabindex", "-1");
        });
        const M = l.getBoundingClientRect(), R = window.innerWidth, L = window.innerHeight;
        let D = b, A = E;
        M.right > R - g && (D = R - M.width - g), M.bottom > L - g && (A = L - M.height - g), D < g && (D = g), A < g && (A = g), l.style.left = D + "px", l.style.top = A + "px", h.style.display = "", l.focus({ preventScroll: !0 });
      }, y = () => {
        l.style.display = "none", h.style.display = "none", p && document.contains(p) && (p.focus({ preventScroll: !0 }), p = null);
      };
      i(() => {
        const b = d.contextMenu;
        b.show && b.type === r ? m() : y();
      }), h.addEventListener("click", () => d.closeContextMenu()), h.addEventListener("contextmenu", (b) => {
        b.preventDefault(), d.closeContextMenu();
      });
      const x = () => {
        d.contextMenu.show && d.contextMenu.type === r && d.closeContextMenu();
      };
      window.addEventListener("scroll", x, !0);
      const k = () => Array.from(l.querySelectorAll(
        ':scope > button:not([disabled]), :scope > [role="menuitem"]:not([disabled])'
      )), _ = (b) => Array.from(b.querySelectorAll(
        "button:not([disabled])"
      )), S = (b) => {
        if (!d.contextMenu.show || d.contextMenu.type !== r || l.style.display === "none") return;
        const E = document.activeElement, M = E?.closest(".flow-context-submenu"), R = M ? _(M) : k();
        if (R.length === 0) return;
        const L = R.indexOf(E);
        switch (b.key) {
          case "ArrowDown": {
            b.preventDefault();
            const D = L < R.length - 1 ? L + 1 : 0;
            R[D].focus({ preventScroll: !0 });
            break;
          }
          case "ArrowUp": {
            b.preventDefault();
            const D = L > 0 ? L - 1 : R.length - 1;
            R[D].focus({ preventScroll: !0 });
            break;
          }
          case "Tab": {
            if (b.preventDefault(), b.shiftKey) {
              const D = L > 0 ? L - 1 : R.length - 1;
              R[D].focus({ preventScroll: !0 });
            } else {
              const D = L < R.length - 1 ? L + 1 : 0;
              R[D].focus({ preventScroll: !0 });
            }
            break;
          }
          case "Enter":
          case " ": {
            b.preventDefault(), E?.click();
            break;
          }
          case "ArrowRight": {
            if (!M) {
              const D = E?.querySelector(".flow-context-submenu");
              D && (b.preventDefault(), D.querySelector("button:not([disabled])")?.focus({ preventScroll: !0 }));
            }
            break;
          }
          case "ArrowLeft": {
            M && (b.preventDefault(), M.closest(".flow-context-submenu-trigger")?.focus({ preventScroll: !0 }));
            break;
          }
        }
      };
      l.addEventListener("keydown", S), a(() => {
        h.remove(), window.removeEventListener("scroll", x, !0), l.removeEventListener("keydown", S);
      });
    }
  );
}
const Bm = {
  mouseenter: "mouseleave",
  click: "click"
  // toggle behavior
};
function qm(t) {
  t.directive(
    "flow-animate",
    (e, { value: n, modifiers: o, expression: i }, { evaluate: s, effect: a, cleanup: r }) => {
      const l = new Set(o), c = l.has("once"), d = l.has("reverse"), f = l.has("queue"), u = n || "";
      let h = "click";
      l.has("mouseenter") ? h = "mouseenter" : l.has("click") && (h = "click");
      let p = null, g = [], m = !1, y = !1, x = !1;
      function k() {
        const D = s(i);
        return Array.isArray(D) ? D : D && typeof D == "object" ? [D] : [];
      }
      function _() {
        const D = e.closest("[x-data]");
        return D ? t.$data(D) : null;
      }
      function S(D, A = !1) {
        const v = _();
        if (!v?.timeline) return Promise.resolve();
        const w = v.timeline();
        if (A) {
          for (let T = D.length - 1; T >= 0; T--)
            w.step(D[T]);
          w.reverse();
        } else
          for (const T of D)
            T.parallel ? w.parallel(T.parallel) : w.step(T);
        return p = w, w.play().then(() => {
          p === w && (p = null);
        });
      }
      function b(D = !1) {
        if (c && y) return;
        y = !0;
        const A = k();
        if (A.length === 0) return;
        const v = () => S(A, D);
        f ? (g.push(v), E()) : (p?.stop(), p = null, g = [], m = !1, v());
      }
      async function E() {
        if (!m) {
          for (m = !0; g.length > 0; )
            await g.shift()();
          m = !1;
        }
      }
      if (u) {
        a(() => {
          const D = k(), A = _();
          A?.registerAnimation && A.registerAnimation(u, D);
        }), r(() => {
          const D = _();
          D?.unregisterAnimation && D.unregisterAnimation(u);
        });
        return;
      }
      const M = () => {
        d && h === "click" ? (b(x), x = !x) : b(!1);
      };
      e.addEventListener(h, M);
      let R = null, L = null;
      d && h !== "click" && (L = Bm[h] ?? null, L && (R = () => b(!0), e.addEventListener(L, R))), r(() => {
        p?.stop(), e.removeEventListener(h, M), L && R && e.removeEventListener(L, R);
      });
    }
  );
}
function Ym(t, e, n, o, i) {
  const s = e.position?.x ?? t.position.x, a = e.position?.y ?? t.position.y, r = t.dimensions?.width ?? we, l = t.dimensions?.height ?? be, c = s * n.zoom + n.x, d = a * n.zoom + n.y, f = (s + r) * n.zoom + n.x, u = (a + l) * n.zoom + n.y;
  return f > 0 && c < o && u > 0 && d < i;
}
function Xm(t, e, n, o, i) {
  const s = t.nodes;
  if (!s || s.length === 0) return !1;
  for (const a of s) {
    const r = e.getNode?.(a) ?? e.nodes?.find((l) => l.id === a);
    if (r && !Ym(r, t, n, o, i))
      return !0;
  }
  return !1;
}
function Wm(t) {
  t.directive(
    "flow-timeline",
    (e, { expression: n }, { evaluate: o, effect: i, cleanup: s }) => {
      let a = 0, r = null, l = [], c = !1, d = "idle", f = 0;
      function u() {
        const m = e.closest("[x-data]");
        return m ? t.$data(m) : null;
      }
      function h(m, y) {
        const x = u();
        if (!x?.timeline) return Promise.resolve();
        const k = x.timeline(), _ = y.speed ?? 1, S = y.autoFitView === !0, b = y.fitViewPadding ?? 0.1, E = x.viewport, M = x.getContainerDimensions?.();
        for (const R of m) {
          const L = _ !== 1 ? {
            ...R,
            duration: R.duration !== void 0 ? R.duration / _ : void 0,
            delay: R.delay !== void 0 ? R.delay / _ : void 0
          } : R;
          if (L.parallel) {
            const D = L.parallel.map(
              (A) => _ !== 1 ? {
                ...A,
                duration: A.duration !== void 0 ? A.duration / _ : void 0,
                delay: A.delay !== void 0 ? A.delay / _ : void 0
              } : A
            );
            k.parallel(D);
          } else if (S && E && M && Xm(L, x, E, M.width, M.height)) {
            const D = {
              fitView: !0,
              fitViewPadding: b,
              duration: L.duration,
              easing: L.easing
            };
            k.parallel([L, D]);
          } else
            k.step(L);
        }
        if (y.lock && k.lock(!0), y.loop !== void 0 && y.loop !== !1) {
          const R = y.loop === !0 ? 0 : y.loop;
          k.loop(R);
        }
        return y.respectReducedMotion !== void 0 && k.respectReducedMotion(y.respectReducedMotion), r = k, d = "playing", c = !0, k.play().then(() => {
          r === k && (r = null, d = "idle", c = !1);
        });
      }
      async function p(m) {
        if (l.length === 0) return;
        if ((m.overflow ?? "queue") === "latest" && c) {
          r?.stop(), r = null, c = !1, d = "idle";
          const x = [l[l.length - 1]];
          a += l.length, l = [], await h(x, m);
        } else {
          const x = [...l];
          a += x.length, l = [], c && await new Promise((_) => {
            r ? (r.on("complete", () => _()), r.on("stop", () => _())) : _();
          }), await h(x, m);
        }
      }
      const g = {
        async play() {
          const m = o(n), y = m.steps ?? [];
          a < y.length && (l = y.slice(a), await p(m));
        },
        stop() {
          r?.stop(), r = null, c = !1, d = "stopped", l = [];
        },
        reset(m) {
          if (r?.stop(), r = null, c = !1, d = "idle", a = 0, l = [], f = 0, m) {
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
          const k = y.slice(Math.max(a, f));
          f = y.length, k.length > 0 && x && (l.push(...k), p(m));
        } else
          f = y.length;
      }), s(() => {
        r?.stop(), delete e.__timeline;
      });
    }
  );
}
function jm(t) {
  t.directive(
    "flow-collapse",
    (e, { expression: n, modifiers: o }, { evaluate: i, effect: s, cleanup: a }) => {
      const r = o.includes("all"), l = o.includes("expand"), c = o.includes("children"), d = o.includes("instant"), f = () => {
        const u = Ge(e);
        if (!u) return;
        const h = t.$data(u);
        if (!h) return;
        if (r) {
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
      e.addEventListener("click", f), e.setAttribute("data-flow-collapse", ""), e.style.cursor = "pointer", !r && !c && s(() => {
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
      }), a(() => {
        e.removeEventListener("click", f);
      });
    }
  );
}
function Um(t) {
  t.directive(
    "flow-condense",
    (e, { expression: n, modifiers: o }, { evaluate: i, effect: s, cleanup: a }) => {
      const r = () => {
        const l = i(n);
        if (!l) return;
        const c = e.closest("[x-data]");
        if (!c) return;
        const d = t.$data(c);
        d?.toggleCondense && d.toggleCondense(l);
      };
      e.addEventListener("click", r), e.setAttribute("data-flow-condense", ""), e.style.cursor = "pointer", s(() => {
        const l = i(n);
        if (!l) return;
        const c = e.closest("[x-data]");
        if (!c) return;
        const d = t.$data(c);
        if (!d?.isCondensed) return;
        const f = d.isCondensed(l);
        e.setAttribute("aria-expanded", String(!f));
      }), a(() => {
        e.removeEventListener("click", r);
      });
    }
  );
}
function Zo(t) {
  for (; t.firstChild; ) t.removeChild(t.firstChild);
}
function Be(t, e, n) {
  const o = (Array.isArray(n) ? n : n ? [n] : []).flatMap((a) => a.split(/\s+/)).filter(Boolean), i = new Set(o), s = t.dataset[e] ? t.dataset[e].split(" ") : [];
  for (const a of s) i.has(a) || t.classList.remove(a);
  for (const a of i) t.classList.add(a);
  i.size ? t.dataset[e] = [...i].join(" ") : delete t.dataset[e];
}
function mr(t) {
  return typeof t == "object" && t !== null && !Array.isArray(t);
}
const yr = [
  ["icon", ".flow-schema-row-icon"],
  ["name", ".flow-schema-row-name"],
  ["type", ".flow-schema-row-type"],
  ["target", ".flow-schema-handle--target:not(.flow-schema-handle--mirror)"],
  ["source", ".flow-schema-handle--source:not(.flow-schema-handle--mirror)"],
  ["mirrorTarget", ".flow-schema-handle--target.flow-schema-handle--mirror"],
  ["mirrorSource", ".flow-schema-handle--source.flow-schema-handle--mirror"]
];
function Gm(t) {
  t.directive("flow-schema", (e, n, { evaluate: o, effect: i, cleanup: s }) => {
    const a = e, r = () => {
      try {
        return o("typeof node !== 'undefined' ? node : null") ?? null;
      } catch {
        return null;
      }
    }, l = () => {
      try {
        const b = a.closest(".flow-container");
        return b ? !!t.$data?.(b)?._config?.rowsReorderable : !1;
      } catch {
        return !1;
      }
    }, c = () => {
      try {
        const b = a.closest(".flow-container");
        return b ? !!t.$data?.(b)?._config?.keyboardConnect : !1;
      } catch {
        return !1;
      }
    }, d = () => {
      try {
        const b = a.closest(".flow-container");
        return b ? t.$data?.(b) ?? null : null;
      } catch {
        return null;
      }
    }, f = () => {
      const b = d()?._config;
      return {
        nodeDecorator: typeof b?.schemaNodeDecorator == "function" ? b.schemaNodeDecorator : null,
        rowDecorator: typeof b?.schemaRowDecorator == "function" ? b.schemaRowDecorator : null,
        nodeClass: typeof b?.schemaNodeClass == "function" ? b.schemaNodeClass : null,
        rowClass: typeof b?.schemaRowClass == "function" ? b.schemaRowClass : null
      };
    }, u = () => {
      t.nextTick(() => {
        const b = d();
        if (!b) return;
        const E = t.raw(b);
        if (E._schemaMetrics != null) return;
        const M = a.querySelector(":scope > .flow-schema-header"), R = a.querySelector(":scope > .flow-schema-body"), L = a.querySelectorAll(".flow-schema-row");
        if (L.length < 2) return;
        const D = L[0], A = L[1], v = L[L.length - 1], w = D.querySelector(".flow-schema-handle"), T = v.querySelector(".flow-schema-handle");
        if (!M || !R || !w || !T) return;
        const P = a.closest("[data-flow-node-id]") ?? a, $ = E.viewport?.zoom || 1, H = P.getBoundingClientRect(), z = M.getBoundingClientRect(), I = R.getBoundingClientRect(), C = D.getBoundingClientRect(), N = A.getBoundingClientRect(), O = v.getBoundingClientRect(), Y = w.getBoundingClientRect(), K = T.getBoundingClientRect(), U = (N.top - C.top) / $, W = O.height / $;
        if (U <= 0 || W <= 0) return;
        const re = {
          headerHeight: z.height / $,
          rowHeight: U,
          // NOT the same as `rowHeight` under the shipped theme — the last row loses
          // its border-bottom. See SchemaMetrics.rowHeightLast.
          rowHeightLast: W,
          // Where the handle actually sits inside its row. MEASURED, not `rowHeight / 2`:
          // `top: 50%` resolves against the row's PADDING box, which the theme's
          // border-bottom shrinks. See SchemaMetrics.handleOffsetY.
          handleOffsetY: (Y.top + Y.height / 2 - C.top) / $,
          handleOffsetYLast: (K.top + K.height / 2 - O.top) / $,
          insetLeft: (C.left - H.left) / $,
          insetRight: (H.right - C.right) / $,
          insetTop: (z.top - H.top) / $,
          // Closes the row model: with insetBottom, a consumer can reconstruct the
          // node's expected border-box height and so DETECT non-uniform rows (a
          // wrapped field name — nothing in the CSS forces `white-space: nowrap`)
          // instead of assuming uniformity. See `flow-edge.ts`'s eligibility check.
          insetBottom: (H.bottom - I.bottom) / $,
          handleWidth: Y.width / $,
          handleHeight: Y.height / $
        };
        E._schemaMetrics = re;
      });
    };
    a.classList.add("flow-schema-node");
    let h = a.closest("[data-flow-node-id]"), p = !1;
    h ? h.setAttribute("data-flow-schema-node", "") : t.nextTick(() => {
      p || !a.isConnected || (h = a.closest("[data-flow-node-id]"), h?.setAttribute("data-flow-schema-node", ""));
    });
    let g = null, m = null;
    const y = /* @__PURE__ */ new Map(), x = () => g && m ? !1 : (Zo(a), y.clear(), g = document.createElement("div"), g.className = "flow-schema-header", a.appendChild(g), m = document.createElement("div"), m.className = "flow-schema-body", a.appendChild(m), !0), k = () => {
      const b = r(), E = b?.data;
      if (!E) {
        for (const I of y.values())
          t.destroyTree(I);
        y.clear(), Zo(a), Be(a, "flowSchemaNodeClass", null), delete a.dataset.flowSchemaNodeSub, g = null, m = null;
        return;
      }
      const M = x(), R = f(), L = typeof E.label == "string" ? E.label : "", D = Array.isArray(E.fields) ? E.fields : [], A = typeof b?.id == "string" ? b.id : "", v = (I, C, N) => {
        const O = I.dataset.flowSchemaRowSub === "1";
        if (!R.rowClass && !I.dataset.flowSchemaRowClass && !O) return;
        let Y = null;
        if (R.rowClass)
          try {
            Y = R.rowClass({
              field: C,
              node: b,
              nodeId: A,
              isNew: N
            });
          } catch (K) {
            console.error("[alpineflow] schemaRowClass threw:", K);
            return;
          }
        if (mr(Y)) {
          const K = Y;
          Be(I, "flowSchemaRowClass", K.row);
          for (const [U, W] of yr) {
            const re = I.querySelector(W);
            re && Be(re, "flowSchemaRowClass", K[U]);
          }
          I.dataset.flowSchemaRowSub = "1";
        } else if (Be(I, "flowSchemaRowClass", Y), O) {
          for (const [, K] of yr) {
            const U = I.querySelector(K);
            U && Be(U, "flowSchemaRowClass", null);
          }
          delete I.dataset.flowSchemaRowSub;
        }
      }, w = (I, C, N) => {
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
          R.rowDecorator({ row: I, field: C, nodeId: A, slots: O, isNew: N });
        } catch (Y) {
          console.error("[alpineflow] schemaRowDecorator threw:", Y);
        }
      };
      typeof E.kind == "string" && E.kind ? a.setAttribute("data-flow-schema-kind", E.kind) : a.removeAttribute("data-flow-schema-kind"), g.textContent !== L && (g.textContent = L);
      const T = l(), P = c(), $ = /* @__PURE__ */ new Set();
      for (const I of D) {
        $.add(I.name);
        const C = y.get(I.name);
        if (C)
          _(C, I), v(C, I, !1), w(C, I, !1);
        else {
          const N = S(I, A, T, P);
          y.set(I.name, N), m.appendChild(N), t.initTree(N), v(N, I, !0), w(N, I, !0);
        }
      }
      for (const [I, C] of y)
        $.has(I) || (t.destroyTree(C), C.remove(), y.delete(I));
      let H = m.firstChild;
      for (const I of D) {
        const C = y.get(I.name);
        C && (H === C ? H = H.nextSibling : m.insertBefore(C, H));
      }
      const z = a.dataset.flowSchemaNodeSub === "1";
      if (R.nodeClass || a.dataset.flowSchemaNodeClass || z) {
        let I = null, C = !1;
        if (R.nodeClass)
          try {
            I = R.nodeClass({
              node: b,
              isNew: M
            });
          } catch (N) {
            console.error("[alpineflow] schemaNodeClass threw:", N), C = !0;
          }
        if (!C)
          if (mr(I)) {
            const N = I;
            Be(a, "flowSchemaNodeClass", N.node), Be(g, "flowSchemaNodeClass", N.header), Be(m, "flowSchemaNodeClass", N.body), a.dataset.flowSchemaNodeSub = "1";
          } else
            Be(a, "flowSchemaNodeClass", I), z && (Be(g, "flowSchemaNodeClass", null), Be(m, "flowSchemaNodeClass", null), delete a.dataset.flowSchemaNodeSub);
      }
      if (R.nodeDecorator)
        try {
          R.nodeDecorator({
            host: a,
            header: g,
            body: m,
            node: b,
            isNew: M
          });
        } catch (I) {
          console.error("[alpineflow] schemaNodeDecorator threw:", I);
        }
      u();
    }, _ = (b, E) => {
      b.dataset.flowSchemaField !== E.name && (b.dataset.flowSchemaField = E.name), b.classList.toggle("flow-schema-row--pk", E.key === "primary"), b.classList.toggle("flow-schema-row--fk", E.key === "foreign"), b.classList.toggle("flow-schema-row--required", !!E.required);
      let M = b.querySelector(".flow-schema-row-icon");
      const R = b.querySelector(".flow-schema-row-name");
      E.icon ? (M || (M = document.createElement("span"), M.className = "flow-schema-row-icon", b.insertBefore(M, R)), M.textContent !== E.icon && (M.textContent = E.icon)) : M && M.remove(), R && R.textContent !== E.name && (R.textContent = E.name);
      const L = b.querySelector(".flow-schema-row-type");
      L && L.textContent !== E.type && (L.textContent = E.type);
    }, S = (b, E, M, R) => {
      const L = document.createElement("div");
      L.className = "flow-schema-row", L.dataset.flowSchemaField = b.name, b.key === "primary" && L.classList.add("flow-schema-row--pk"), b.key === "foreign" && L.classList.add("flow-schema-row--fk"), b.required && L.classList.add("flow-schema-row--required"), E && L.setAttribute(
        "x-flow-row-select",
        JSON.stringify(`${E}.${b.name}`)
      ), M && L.setAttribute("x-schema-reorderable", ""), R && E && L.setAttribute(
        "x-schema-keyboard-nav",
        JSON.stringify(`${E}.${b.name}`)
      );
      const D = document.createElement("div");
      if (D.className = "flow-schema-handle flow-schema-handle--target", D.setAttribute("x-flow-handle:target.left", JSON.stringify(b.name)), L.appendChild(D), b.icon) {
        const $ = document.createElement("span");
        $.className = "flow-schema-row-icon", $.textContent = b.icon, L.appendChild($);
      }
      const A = document.createElement("span");
      A.className = "flow-schema-row-name", A.textContent = b.name, L.appendChild(A);
      const v = document.createElement("span");
      v.className = "flow-schema-row-type", v.textContent = b.type, L.appendChild(v);
      const w = document.createElement("div");
      w.className = "flow-schema-handle flow-schema-handle--source", w.setAttribute("x-flow-handle:source.right", JSON.stringify(b.name)), L.appendChild(w);
      const T = document.createElement("div");
      T.className = "flow-schema-handle flow-schema-handle--target flow-schema-handle--mirror", T.setAttribute("x-flow-handle:target.right", JSON.stringify(b.name)), L.appendChild(T);
      const P = document.createElement("div");
      return P.className = "flow-schema-handle flow-schema-handle--source flow-schema-handle--mirror", P.setAttribute("x-flow-handle:source.left", JSON.stringify(b.name)), L.appendChild(P), L;
    };
    i(() => {
      if (!a.isConnected) return;
      const b = r()?.data;
      b?.label, b?.kind;
      const E = b?.fields;
      if (Array.isArray(E))
        for (const M of E)
          M.name, M.type, M.key, M.required, M.icon, M.description, M.deprecated, M.tags, M.defaultValue;
      k();
    }), s(() => {
      p = !0;
      for (const b of y.values())
        t.destroyTree(b);
      y.clear(), Zo(a), g = null, m = null, a.classList.remove("flow-schema-node"), Be(a, "flowSchemaNodeClass", null), delete a.dataset.flowSchemaNodeSub, h?.removeAttribute("data-flow-schema-node");
    });
  });
}
function Zm(t) {
  if (!Number.isFinite(t) || t < 0) return "";
  if (t < 1e3) return `${t}ms`;
  if (t < 6e4) {
    const o = t / 1e3;
    return t % 1e3 === 0 ? `${o}s` : `${o.toFixed(1)}s`;
  }
  const e = Math.floor(t / 6e4), n = Math.floor(t % 6e4 / 1e3);
  return n === 0 ? `${e}m` : `${e}m ${n}s`;
}
function wr(t) {
  for (; t.firstChild; ) t.removeChild(t.firstChild);
}
function Km(t) {
  t.directive("flow-wait", (e, n, { evaluate: o, effect: i, cleanup: s }) => {
    const a = e, r = a.closest("[data-flow-canvas]"), l = Tn(r ? t.$data(r) : null), c = () => {
      try {
        return o("typeof node !== 'undefined' ? node : null") ?? null;
      } catch {
        return null;
      }
    };
    a.classList.add("flow-wait-node"), a.setAttribute("data-flow-wait", "true");
    const d = () => {
      wr(a);
      const u = c()?.data;
      if (!u) return;
      const h = typeof u.label == "string" && u.label ? u.label : l("workflow.wait"), p = typeof u.icon == "string" && u.icon ? u.icon : "", g = typeof u.durationMs == "number" ? u.durationMs : NaN, m = document.createElement("div");
      if (m.className = "flow-wait-header", p) {
        const S = document.createElement("span");
        S.className = "flow-wait-icon", S.textContent = p, m.appendChild(S);
      }
      const y = document.createElement("span");
      y.className = "flow-wait-label", y.textContent = h, m.appendChild(y);
      const x = document.createElement("span");
      x.className = "flow-wait-duration", x.textContent = Zm(g), m.appendChild(x), a.appendChild(m);
      const k = document.createElement("div");
      k.className = "flow-wait-handle flow-wait-handle--target", k.setAttribute("x-flow-handle:target.top", JSON.stringify("in")), a.appendChild(k);
      const _ = document.createElement("div");
      _.className = "flow-wait-handle flow-wait-handle--source", _.setAttribute("x-flow-handle:source.bottom", JSON.stringify("out")), a.appendChild(_), t.initTree(a);
    };
    i(() => {
      if (!a.isConnected) return;
      const f = c()?.data;
      f?.durationMs, f?.label, f?.icon, d();
    }), s(() => {
      wr(a), a.classList.remove("flow-wait-node"), a.removeAttribute("data-flow-wait");
    });
  });
}
const _r = {
  equals: "==",
  notEquals: "!=",
  greaterThan: ">",
  lessThan: "<",
  greaterThanOrEqual: ">=",
  lessThanOrEqual: "<="
};
function mn(t) {
  return t === null || t === void 0 ? "null" : typeof t == "string" ? `'${t}'` : Array.isArray(t) ? `[${t.map(mn).join(", ")}]` : String(t);
}
function Jm(t) {
  const { field: e, op: n, value: o } = t;
  return n in _r ? `${e} ${_r[n]} ${mn(o)}` : n === "in" ? `${e} in ${mn(o)}` : n === "notIn" ? `${e} not in ${mn(o)}` : n === "exists" ? `${e} exists` : n === "matches" ? `${e} ~ /${String(o)}/` : `${e} ${n} ${mn(o)}`;
}
function vr(t) {
  for (; t.firstChild; ) t.removeChild(t.firstChild);
}
function Qm(t, e) {
  return t === "vertical" || t === "horizontal" ? t : e === "vertical" || e === "horizontal" ? e : "horizontal";
}
function ey(t) {
  t.directive("flow-condition", (e, { expression: n }, { evaluate: o, effect: i, cleanup: s }) => {
    const a = e, r = a.closest("[data-flow-canvas]"), l = Tn(r ? t.$data(r) : null), c = () => {
      try {
        return o("typeof node !== 'undefined' ? node : null") ?? null;
      } catch {
        return null;
      }
    }, d = () => {
      if (n)
        try {
          return o(n);
        } catch {
          return n;
        }
    };
    a.classList.add("flow-condition-node");
    const f = () => {
      const h = c()?.data ?? {}, p = Qm(d(), h.direction);
      a.setAttribute("data-flow-condition-direction", p);
      const g = h._branchTaken;
      g === "true" || g === "false" ? a.setAttribute("data-flow-condition-branch-taken", g) : a.removeAttribute("data-flow-condition-branch-taken"), vr(a);
      const m = typeof h.label == "string" && h.label ? h.label : l("workflow.condition"), y = document.createElement("div");
      y.className = "flow-condition-header", y.textContent = m, a.appendChild(y);
      const x = document.createElement("div");
      x.className = "flow-condition-body", h.condition && typeof h.condition == "object" ? x.textContent = Jm(h.condition) : typeof h.evaluate == "function" ? x.textContent = typeof h.evaluateLabel == "string" && h.evaluateLabel ? h.evaluateLabel : l("workflow.customEvaluator") : x.textContent = "", a.appendChild(x);
      const k = document.createElement("div");
      k.className = "flow-condition-handle-target", k.setAttribute("data-flow-handle-direction", "target"), k.setAttribute("x-flow-handle:target", JSON.stringify("in")), a.appendChild(k);
      const _ = document.createElement("div");
      _.className = "flow-condition-handle-source flow-condition-handle--true", _.setAttribute("data-flow-handle-direction", "source"), _.setAttribute("data-source-handle", "true"), _.setAttribute("x-flow-handle:source", JSON.stringify("true")), a.appendChild(_);
      const S = document.createElement("div");
      S.className = "flow-condition-handle-source flow-condition-handle--false", S.setAttribute("data-flow-handle-direction", "source"), S.setAttribute("data-source-handle", "false"), S.setAttribute("x-flow-handle:source", JSON.stringify("false")), a.appendChild(S), t.initTree(a);
    };
    i(() => {
      if (!a.isConnected) return;
      const u = c()?.data;
      u?.label, u?.condition, u?.condition?.field, u?.condition?.op, u?.condition?.value, u?.evaluate, u?.evaluateLabel, u?.direction, u?._branchTaken, f();
    }), s(() => {
      vr(a), a.classList.remove("flow-condition-node"), a.removeAttribute("data-flow-condition-direction"), a.removeAttribute("data-flow-condition-branch-taken");
    });
  });
}
function ty(t) {
  t.directive(
    "flow-row-select",
    (e, { expression: n }, { evaluate: o, effect: i, cleanup: s }) => {
      e.classList.add("nodrag"), e.style.cursor = "pointer", e.setAttribute("data-flow-row-select", "");
      const a = (r) => {
        r.stopPropagation();
        const l = o(n);
        if (!l) return;
        const c = e.closest("[x-data]");
        if (!c) return;
        const d = t.$data(c);
        d?.toggleRowSelect && (r.shiftKey ? d.toggleRowSelect(l) : (d.deselectAllRows(), d.selectRow(l)));
      };
      e.addEventListener("click", a), i(() => {
        const r = o(n);
        if (!r) return;
        const l = e.closest("[x-data]");
        if (!l) return;
        const c = t.$data(l);
        if (!c?.isRowSelected) return;
        const d = c.isRowSelected(r);
        e.classList.toggle("flow-row-selected", d), e.setAttribute("aria-selected", String(d));
      }), s(() => {
        e.removeEventListener("click", a);
      });
    }
  );
}
function ny(t) {
  t.directive(
    "flow-detail",
    (e, { expression: n, modifiers: o }, { evaluate: i, effect: s, cleanup: a }) => {
      if (n) {
        const f = Ge(e);
        if (!f) return;
        const u = t.$data(f);
        if (!u?.viewport) return;
        const h = e.style.display;
        s(() => {
          const p = i(n), g = u.viewport.zoom, m = p.min === void 0 || g >= p.min, y = p.max === void 0 || g <= p.max;
          e.style.display = m && y ? h : "none";
        }), a(() => {
          e.style.display = h;
        });
        return;
      }
      const r = new Set(o.filter((f) => f === "far" || f === "medium" || f === "close"));
      if (r.size === 0) return;
      const l = Ge(e);
      if (!l) return;
      const c = t.$data(l);
      if (!c?._zoomLevel) return;
      const d = e.style.display;
      s(() => {
        const f = c._zoomLevel;
        r.has(f) ? e.style.display = d : e.style.display = "none";
      }), a(() => {
        e.style.display = d;
      });
    }
  );
}
const br = [
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
], oy = /* @__PURE__ */ new Set(["flow-viewport-move", "flow-viewport-change", "flow-node-drag"]);
function iy(t, e) {
  return e || !oy.has(t);
}
const sy = ["perf", "events", "viewport", "state", "activity"], xr = ["fps", "memory", "counts", "visible"], Er = 30;
function ry(t, e) {
  if (t && typeof t == "object" && Object.keys(t).length > 0)
    return t;
  const n = e.filter((i) => sy.includes(i));
  if (n.length === 0)
    return { perf: !0, events: !0, viewport: !0, state: !0, activity: !0 };
  const o = {};
  for (const i of n)
    o[i] = !0;
  return o;
}
function ay(t) {
  return t.perf ? t.perf === !0 ? [...xr] : t.perf.filter((e) => xr.includes(e)) : [];
}
function ly(t) {
  return t.events ? t.events === !0 ? Er : t.events.max ?? Er : 0;
}
function fn(t, e) {
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
function cy(t) {
  t.directive(
    "flow-devtools",
    (e, { expression: n, modifiers: o }, { evaluate: i, effect: s, cleanup: a }) => {
      let r = null;
      if (n)
        try {
          r = i(n);
        } catch {
        }
      const l = ry(r, o), c = e.closest("[x-data]");
      if (!c) return;
      const d = e.closest(".flow-container");
      if (!d) return;
      e.classList.add("flow-devtools", "canvas-overlay"), e.setAttribute("data-flow-devtools", "");
      const f = tn(e), u = document.createElement("button");
      u.className = "flow-devtools-toggle nopan", u.title = "Devtools";
      const h = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      h.setAttribute("width", "14"), h.setAttribute("height", "14"), h.setAttribute("viewBox", "0 0 24 24"), h.setAttribute("fill", "none"), h.setAttribute("stroke", "currentColor"), h.setAttribute("stroke-width", "2"), h.setAttribute("stroke-linecap", "round"), h.setAttribute("stroke-linejoin", "round");
      const p = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
      p.setAttribute("points", "22 12 18 12 15 21 9 3 6 12 2 12"), h.appendChild(p), u.appendChild(h), e.appendChild(u);
      const g = document.createElement("div");
      g.className = "flow-devtools-panel", g.style.display = "none", e.appendChild(g);
      let m = !1, y = null;
      const x = () => {
        m = !m, g.style.display = m ? "" : "none", u.title = m ? "Collapse" : "Devtools", m && y?.(), m ? K() : U();
      };
      u.addEventListener("click", x);
      const k = ay(l);
      let _ = null, S = null, b = null, E = null, M = null;
      if (k.length > 0) {
        const { wrapper: q, content: V } = fn("Performance", "flow-devtools-perf");
        if (k.includes("fps")) {
          const { row: j, valueEl: Z } = qe("FPS", "flow-devtools-fps");
          _ = Z, V.appendChild(j);
        }
        if (k.includes("memory")) {
          const { row: j, valueEl: Z } = qe("Memory", "flow-devtools-memory");
          S = Z, V.appendChild(j);
        }
        if (k.includes("counts")) {
          const j = qe("Nodes", "flow-devtools-counts");
          b = j.valueEl, V.appendChild(j.row);
          const Z = qe("Edges", "flow-devtools-counts");
          E = Z.valueEl, V.appendChild(Z.row);
        }
        if (k.includes("visible")) {
          const { row: j, valueEl: Z } = qe("Visible", "flow-devtools-visible");
          M = Z, V.appendChild(j);
        }
        g.appendChild(q);
      }
      const R = ly(l);
      let L = null;
      if (R > 0) {
        const { wrapper: q, content: V } = fn("Events", "flow-devtools-events"), j = document.createElement("button");
        j.className = "flow-devtools-clear-btn nopan", j.textContent = "Clear", j.addEventListener("click", () => {
          L && (L.textContent = ""), W.length = 0;
        }), q.querySelector(".flow-devtools-section-title").appendChild(j), L = document.createElement("div"), L.className = "flow-devtools-event-list", V.appendChild(L), g.appendChild(q);
      }
      let D = null, A = null, v = null;
      if (l.viewport) {
        const { wrapper: q, content: V } = fn("Viewport", "flow-devtools-viewport"), j = qe("X", "flow-devtools-vp-x");
        D = j.valueEl, V.appendChild(j.row);
        const Z = qe("Y", "flow-devtools-vp-y");
        A = Z.valueEl, V.appendChild(Z.row);
        const te = qe("Zoom", "flow-devtools-vp-zoom");
        v = te.valueEl, V.appendChild(te.row), g.appendChild(q);
      }
      let w = null;
      if (l.state) {
        const { wrapper: q, content: V } = fn("Selection", "flow-devtools-state");
        w = document.createElement("div"), w.className = "flow-devtools-state-content", w.textContent = "No selection", V.appendChild(w), g.appendChild(q);
      }
      let T = null, P = null, $ = null, H = null;
      if (l.activity) {
        const { wrapper: q, content: V } = fn("Activity", "flow-devtools-activity"), j = qe("Animations", "flow-devtools-anim");
        T = j.valueEl, V.appendChild(j.row);
        const Z = qe("Particles", "flow-devtools-particles");
        P = Z.valueEl, V.appendChild(Z.row);
        const te = qe("Follow", "flow-devtools-follow");
        $ = te.valueEl, V.appendChild(te.row);
        const F = qe("Timelines", "flow-devtools-timelines");
        H = F.valueEl, V.appendChild(F.row), g.appendChild(q);
      }
      let z = null, I = !1, C = 0, N = performance.now();
      const O = !!(_ || S), Y = () => {
        if (!I) return;
        C++;
        const q = performance.now();
        q - N >= 1e3 && (_ && (_.textContent = String(Math.round(C * 1e3 / (q - N)))), C = 0, N = q, S && performance.memory && (S.textContent = Math.round(performance.memory.usedJSHeapSize / 1048576) + " MB")), z = requestAnimationFrame(Y);
      }, K = () => {
        !O || I || (I = !0, C = 0, N = performance.now(), z = requestAnimationFrame(Y));
      }, U = () => {
        I = !1, z !== null && (cancelAnimationFrame(z), z = null);
      }, W = [];
      let re = null;
      if (R > 0 && L) {
        re = (q) => {
          if (!iy(q.type, m)) return;
          const V = q, j = V.type.replace("flow-", "");
          let Z = "";
          try {
            Z = V.detail ? JSON.stringify(V.detail).slice(0, 80) : "";
          } catch {
            Z = "[circular]";
          }
          if (W.unshift({ name: j, time: Date.now(), detail: Z }), W.length > R && W.pop(), !m) return;
          const te = L, F = document.createElement("div");
          F.className = "flow-devtools-event-entry";
          const J = document.createElement("span");
          J.className = "flow-devtools-event-name", J.textContent = j;
          const ee = document.createElement("span");
          ee.className = "flow-devtools-event-age", ee.textContent = "now";
          const Q = document.createElement("span");
          for (Q.className = "flow-devtools-event-detail", Q.textContent = Z, F.appendChild(J), F.appendChild(ee), F.appendChild(Q), te.prepend(F); te.children.length > R; )
            te.removeChild(te.lastChild);
        };
        for (const q of br)
          d.addEventListener(q, re);
        y = () => {
          const q = L;
          q.textContent = "";
          for (const V of W) {
            const j = document.createElement("div");
            j.className = "flow-devtools-event-entry";
            const Z = document.createElement("span");
            Z.className = "flow-devtools-event-name", Z.textContent = V.name;
            const te = document.createElement("span");
            te.className = "flow-devtools-event-age";
            const F = Math.round((Date.now() - V.time) / 1e3);
            te.textContent = F < 2 ? "now" : F + "s";
            const J = document.createElement("span");
            J.className = "flow-devtools-event-detail", J.textContent = V.detail, j.appendChild(Z), j.appendChild(te), j.appendChild(J), q.appendChild(j);
          }
        };
      }
      s(() => {
        const q = t.$data(c);
        !q || !q.viewport || (D && (D.textContent = Math.round(q.viewport.x).toString()), A && (A.textContent = Math.round(q.viewport.y).toString()), v && (v.textContent = q.viewport.zoom.toFixed(2)));
      }), s(() => {
        const q = t.$data(c);
        if (q) {
          if (b && (b.textContent = String(q.nodes?.length ?? 0)), E && (E.textContent = String(q.edges?.length ?? 0)), M && q._getVisibleNodeIds && (M.textContent = String(q._getVisibleNodeIds().size)), w) {
            const V = q.selectedNodes, j = q.selectedEdges;
            if (!((V?.size ?? 0) > 0 || (j?.size ?? 0) > 0))
              w.textContent = "No selection";
            else {
              if (w.textContent = "", V && V.size > 0)
                for (const te of V) {
                  const F = q.getNode?.(te);
                  if (!F) continue;
                  const J = document.createElement("pre");
                  J.className = "flow-devtools-json", J.textContent = JSON.stringify({ id: F.id, position: F.position, data: F.data }, null, 2), w.appendChild(J);
                }
              if (j && j.size > 0)
                for (const te of j) {
                  const F = q.edges?.find((ee) => ee.id === te);
                  if (!F) continue;
                  const J = document.createElement("pre");
                  J.className = "flow-devtools-json", J.textContent = JSON.stringify({ id: F.id, source: F.source, target: F.target, type: F.type }, null, 2), w.appendChild(J);
                }
            }
          }
          if (T) {
            const V = q._animator?._groups?.size ?? 0;
            T.textContent = String(V);
          }
          P && (P.textContent = String(q._activeParticles?.size ?? 0)), $ && ($.textContent = q._followHandle ? "Active" : "Idle"), H && (H.textContent = String(q._activeTimelines?.size ?? 0));
        }
      }), a(() => {
        if (U(), u.removeEventListener("click", x), re)
          for (const q of br)
            d.removeEventListener(q, re);
        f(), e.textContent = "", _ = null, S = null, b = null, E = null, M = null, L = null, D = null, A = null, v = null, w = null, T = null, P = null, $ = null, H = null;
      });
    }
  );
}
const dy = {
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
function uy(t) {
  return dy[t] ?? null;
}
function fy(t) {
  t.directive(
    "flow-action",
    (e, { value: n, expression: o }, { evaluate: i, effect: s, cleanup: a }) => {
      const l = uy(n);
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
      e.addEventListener("click", f), (l.disabledWhen || l.aria) && s(() => {
        if (l.disabledWhen) {
          const u = l.disabledWhen(d);
          e.disabled = u, l.aria === "disabled" && e.setAttribute("aria-disabled", String(u));
        }
        l.aria === "pressed" && e.setAttribute("aria-pressed", String(!d.isInteractive));
      }), a(() => {
        e.removeEventListener("click", f);
      });
    }
  );
}
function hy(t, e) {
  if (t !== "node" && t !== "row") return null;
  const n = e.includes("clear");
  return { type: t, isClear: n };
}
const Ko = /* @__PURE__ */ new WeakMap();
function gy(t) {
  t.directive(
    "flow-filter",
    (e, { value: n, expression: o, modifiers: i }, { evaluate: s, effect: a, cleanup: r }) => {
      const l = hy(n, i);
      if (!l) return;
      const c = Ge(e);
      if (!c) return;
      const d = t.$data(c);
      if (!d) return;
      let f = null;
      const u = () => {
        if (l.isClear) {
          if (l.type === "node")
            d.clearNodeFilter(), Ko.set(c, null);
          else
            for (const h of d.nodes)
              h.rowFilter && h.rowFilter !== "all" && d.setRowFilter(h.id, "all");
          return;
        }
        if (l.type === "node" && o)
          f = s(`[${o}]`)[0], d.setNodeFilter(f), Ko.set(c, f);
        else if (l.type === "row" && o) {
          const h = s(o);
          d.setRowFilter(h.node, h.predicate);
        }
      };
      e.addEventListener("click", u), e.style.cursor = "pointer", l.type === "node" && !l.isClear && a(() => {
        d.nodes.length;
        const h = Ko.get(c) === f && f !== null;
        e.classList.toggle("flow-filter-active", h), e.setAttribute("aria-pressed", String(h));
      }), r(() => {
        e.removeEventListener("click", u);
      });
    }
  );
}
function py(t) {
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
function my(t) {
  t.directive(
    "flow-follow",
    (e, { expression: n, modifiers: o }, { evaluate: i, effect: s, cleanup: a }) => {
      const r = o.includes("toggle"), l = Ge(e);
      if (!l) return;
      const c = t.$data(l);
      if (!c?.follow) return;
      let d = null;
      const f = (h) => {
        e.classList.toggle("flow-following", h), e.setAttribute("aria-pressed", String(h));
      }, u = () => {
        if (!n) return;
        const h = i(n), p = py(h);
        if (!p) return;
        if (r && d) {
          d.stop(), d = null, f(!1);
          return;
        }
        d && d.stop();
        const g = {};
        p.zoom !== void 0 && (g.zoom = p.zoom), p.speed !== void 0 && (g.speed = p.speed), d = c.follow(p.target, g), f(!0), d?.finished && d.finished.then(() => {
          d = null, f(!1);
        });
      };
      e.addEventListener("click", u), a(() => {
        e.removeEventListener("click", u), d && (d.stop(), d = null);
      });
    }
  );
}
function yy(t, e) {
  return t !== "save" && t !== "restore" ? null : { action: t, persist: e.includes("persist") };
}
const Xi = /* @__PURE__ */ new Map();
function wy(t, e) {
  Xi.set(t, e);
}
function _y(t) {
  return Xi.get(t) ?? null;
}
function vy(t) {
  return Xi.has(t);
}
function Jo(t) {
  return `alpineflow-snapshot-${t}`;
}
function by(t) {
  t.directive(
    "flow-snapshot",
    (e, { value: n, expression: o, modifiers: i }, { evaluate: s, effect: a, cleanup: r }) => {
      const l = yy(n, i);
      if (!l) return;
      const c = Ge(e);
      if (!c) return;
      const d = t.$data(c);
      if (!d) return;
      const f = () => {
        if (!o) return;
        const u = s(o);
        if (u)
          if (l.action === "save") {
            const h = d.toObject();
            l.persist ? localStorage.setItem(Jo(u), JSON.stringify(h)) : wy(u, h);
          } else {
            let h = null;
            if (l.persist) {
              const p = localStorage.getItem(Jo(u));
              if (p)
                try {
                  h = JSON.parse(p);
                } catch {
                }
            } else
              h = _y(u);
            h && d.fromObject(h);
          }
      };
      e.addEventListener("click", f), l.action === "restore" && a(() => {
        if (!o) return;
        const u = s(o);
        if (!u) return;
        let h;
        l.persist ? h = localStorage.getItem(Jo(u)) !== null : (d.nodes.length, h = vy(u)), e.disabled = !h, e.setAttribute("aria-disabled", String(!h));
      }), r(() => {
        e.removeEventListener("click", f);
      });
    }
  );
}
function xy(t) {
  const e = document.createElement("div");
  e.className = "flow-loading-indicator";
  const n = document.createElement("div");
  n.className = "flow-loading-indicator-node";
  const o = document.createElement("div");
  return o.className = "flow-loading-indicator-text", o.textContent = t ?? "Loading…", e.appendChild(n), e.appendChild(o), e;
}
function Ey(t) {
  t.directive(
    "flow-loading",
    (e, { modifiers: n }, { effect: o, cleanup: i }) => {
      const s = Ge(e);
      if (!s) return;
      const a = t.$data(s);
      if (!a) return;
      e.classList.add("flow-loading-overlay"), e.childElementCount > 0 || e.textContent.trim().length > 0 || e.appendChild(xy(a._loadingText));
      const l = n.includes("fade");
      l && e.classList.add("flow-loading-fade"), s.setAttribute("data-flow-loading-directive", "");
      let c = null;
      o(() => {
        if (a.isLoading)
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
        c && (e.removeEventListener("transitionend", c), c = null), s.removeAttribute("data-flow-loading-directive"), e.style.display = "", e.classList.remove("flow-loading-overlay", "flow-loading-fade", "flow-loading-fade-out");
      });
    }
  );
}
function Cy(t) {
  t.directive(
    "flow-edge-toolbar",
    (e, { expression: n, modifiers: o }, { evaluate: i, effect: s, cleanup: a }) => {
      const r = e.closest("[data-flow-edge-id]");
      if (!r) return;
      const l = r.dataset.flowEdgeId, c = Ge(e);
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
      const u = tn(e), h = (m) => {
        m.stopPropagation();
      };
      e.addEventListener("click", h);
      const p = o.includes("below"), g = 20;
      s(() => {
        if (!d.edges.some((R) => R.id === l)) {
          u(), e.removeEventListener("click", h), e.classList.remove("flow-edge-toolbar"), e.remove();
          return;
        }
        const m = d.viewport?.zoom || 1, y = parseInt(e.getAttribute("data-flow-offset") ?? String(g), 10);
        let x = 0.5;
        if (n) {
          const R = i(n);
          typeof R == "number" && (x = R);
        }
        const k = r.querySelectorAll("path"), _ = k.length > 1 ? k[1] : k[0];
        if (!_) return;
        const S = _.getTotalLength?.();
        if (!S) return;
        const b = _.getPointAtLength(S * Math.max(0, Math.min(1, x))), E = y / m, M = p ? E : -E;
        e.style.left = `${b.x}px`, e.style.top = `${b.y + M}px`, e.style.transformOrigin = "0 0", e.style.transform = `scale(${1 / m}) translate(-50%, ${p ? "0%" : "-100%"})`;
      }), a(() => {
        u(), e.removeEventListener("click", h), e.classList.remove("flow-edge-toolbar"), e.remove();
      });
    }
  );
}
function Sy(t) {
  t.magic("flow", (e) => {
    const n = e.closest("[data-flow-canvas]");
    return n ? t.$data(n) : (console.warn("[alpinejs-flow] $flow used outside of a flowCanvas context"), {});
  });
}
function ky(t) {
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
function Xw(t, e, n) {
  const o = n?.defaultDimensions?.width ?? we, i = n?.defaultDimensions?.height ?? be, s = n?.padding ?? 20, a = n?.flowId ?? "ssr", l = t.filter((y) => !y.hidden).map((y) => ({
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
      style: typeof y.style == "string" ? y.style : Object.entries(y.style).map(([x, k]) => `${x}:${k}`).join(";")
    } : {},
    data: y.data ?? {}
  })), f = e.filter((y) => !y.hidden), u = [], h = /* @__PURE__ */ new Map();
  for (const y of f) {
    const x = c.get(y.source), k = c.get(y.target);
    if (!x || !k)
      continue;
    let _, S;
    try {
      const L = bo(
        y,
        x,
        k,
        x.sourcePosition ?? "bottom",
        k.targetPosition ?? "top"
      );
      _ = L.path, S = L.labelPosition;
    } catch {
      continue;
    }
    let b, E;
    if (y.markerStart) {
      const L = Yt(y.markerStart), D = Xt(L, a);
      h.has(D) || h.set(D, go(L, D)), b = `url(#${D})`;
    }
    if (y.markerEnd) {
      const L = Yt(y.markerEnd), D = Xt(L, a);
      h.has(D) || h.set(D, go(L, D)), E = `url(#${D})`;
    }
    let M, R;
    if (y.label)
      if (S)
        M = S.x, R = S.y;
      else {
        const L = x.position.x + x.dimensions.width / 2, D = x.position.y + x.dimensions.height / 2, A = k.position.x + k.dimensions.width / 2, v = k.position.y + k.dimensions.height / 2;
        M = (L + A) / 2, R = (D + v) / 2;
      }
    u.push({
      id: y.id,
      source: y.source,
      target: y.target,
      pathD: _,
      ...b ? { markerStart: b } : {},
      ...E ? { markerEnd: E } : {},
      ...y.class ? { class: y.class } : {},
      ...y.label ? { label: y.label } : {},
      ...M !== void 0 ? { labelX: M } : {},
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
      x: y.x - s,
      y: y.y - s,
      width: y.width + s * 2,
      height: y.height + s * 2
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
const Cr = /* @__PURE__ */ new WeakSet();
function Ww(t) {
  Cr.has(t) || (Cr.add(t), fl(t), ky(t), em(t), fm(t), Sh(t), gh(t), ph(t), mh(t), jp(t), mm(t), vm(t), bm(t), Em(t), Sm(t), Hm(t), Fm(t), Vm(t), qm(t), Wm(t), jm(t), Um(t), ty(t), ny(t), cy(t), fy(t), gy(t), my(t), by(t), Ey(t), Cy(t), Gm(t), Km(t), ey(t), Sy(t));
}
function Ly(t) {
  return t.replace(/\s+(?:@|:|x-)[\w.:-]*="[^"]*"/g, "").replace(/\s+externalResourcesRequired="[^"]*"/g, "");
}
const My = [
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
function Py(t) {
  const e = t.querySelectorAll(
    "svg path, svg line, svg polyline, svg polygon, svg circle, svg ellipse, svg rect, svg text"
  ), n = [];
  for (const o of e) {
    const i = getComputedStyle(o), s = [];
    for (const a of My) {
      const r = i.getPropertyValue(a);
      r && (s.push([a, o.getAttribute(a)]), o.setAttribute(a, r));
    }
    s.length > 0 && n.push(() => {
      for (const [a, r] of s)
        r === null ? o.removeAttribute(a) : o.setAttribute(a, r);
    });
  }
  return () => {
    for (const o of n) o();
  };
}
const Ny = 16384, Ay = 4e7, Ty = 8;
function Iy(t, e, n) {
  if (typeof t != "number" || !Number.isFinite(t) || t <= 0) return 1;
  const o = Ny / Math.max(e, n), i = Math.sqrt(Ay / Math.max(1, e * n)), s = Math.max(1, Math.min(Ty, o, i));
  return Math.min(t, s);
}
const $y = 0.92;
function Dy(t) {
  return typeof t != "number" || !Number.isFinite(t) ? $y : Math.min(1, Math.max(0, t));
}
function Ry(t) {
  return t.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}
function Hy(t, e) {
  const n = t.indexOf(">");
  if (n === -1) return t;
  const o = `<rect width="100%" height="100%" fill="${Ry(e)}"/>`;
  return t.slice(0, n + 1) + o + t.slice(n + 1);
}
function Fy(t, e, n, o, i = 1, s = "png", a) {
  return new Promise((r, l) => {
    const c = new Image();
    c.onload = () => {
      const d = document.createElement("canvas");
      d.width = Math.round(e * i), d.height = Math.round(n * i);
      const f = d.getContext("2d");
      f.scale(i, i), f.fillStyle = o, f.fillRect(0, 0, e, n), f.drawImage(c, 0, 0, e, n), r(
        s === "jpeg" ? d.toDataURL("image/jpeg", Dy(a)) : d.toDataURL("image/png")
      );
    }, c.onerror = () => {
      l(new Error("Failed to render SVG to image"));
    }, c.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(t);
  });
}
async function Oy(t, e, n, o, i = {}) {
  let s;
  try {
    ({ toSvg: s } = await Promise.resolve().then(() => Rw));
  } catch {
    throw new Error("toImage() requires html-to-image. Install it with: npm install html-to-image");
  }
  const a = i.scope ?? "all", r = t.getBoundingClientRect(), l = a === "viewport" ? r.width : i.width ?? 1920, c = a === "viewport" ? r.height : i.height ?? 1080, d = i.background ?? (getComputedStyle(t).getPropertyValue("--flow-bg-color").trim() || "#ffffff"), f = e.style.transform, u = e.style.width, h = e.style.height, p = t.style.width, g = t.style.height, m = t.style.overflow, y = [];
  let x = null;
  try {
    if (a === "all") {
      const A = t.querySelectorAll("[data-flow-culled]");
      for (const $ of A)
        $.style.display = "", y.push($);
      const v = n.filter(($) => !$.hidden), w = Gt(v), T = i.padding ?? 0.1, P = co(
        w,
        l,
        c,
        0.1,
        // minZoom
        2,
        // maxZoom
        T
      );
      e.style.transform = `translate(${P.x}px, ${P.y}px) scale(${P.zoom})`, e.style.width = `${l}px`, e.style.height = `${c}px`;
    }
    t.style.width = `${l}px`, t.style.height = `${c}px`, t.style.overflow = "hidden", await new Promise((A) => requestAnimationFrame(A)), x = Py(t);
    const k = i.includeOverlays, _ = k === !0, S = typeof k == "object" ? k : {}, b = [
      ["canvas-overlay", _ || (S.toolbar ?? !1)],
      ["flow-minimap", _ || (S.minimap ?? !1)],
      ["flow-controls", _ || (S.controls ?? !1)],
      ["flow-panel", _ || (S.panels ?? !1)],
      ["flow-selection-box", !1]
    ], E = await s(t, {
      width: l,
      height: c,
      skipFonts: !0,
      filter: (A) => {
        if (A.classList) {
          for (const [v, w] of b)
            if (A.classList.contains(v) && !w) return !1;
        }
        return !0;
      }
    }), M = "data:image/svg+xml;charset=utf-8,", R = Ly(decodeURIComponent(E.substring(M.length))), L = i.format ?? "png";
    let D;
    if (L === "svg")
      D = M + encodeURIComponent(Hy(R, d));
    else {
      const A = Iy(i.scale, l, c);
      D = await Fy(
        R,
        l,
        c,
        d,
        A,
        L,
        i.quality
      );
    }
    if (i.filename) {
      const A = document.createElement("a");
      A.download = i.filename, A.href = D, A.click();
    }
    return D;
  } finally {
    x?.(), e.style.transform = f, e.style.width = u, e.style.height = h, t.style.width = p, t.style.height = g, t.style.overflow = m;
    for (const k of y)
      k.style.display = "none";
  }
}
const zy = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  captureFlowImage: Oy
}, Symbol.toStringTag, { value: "Module" }));
function Vy(t, e) {
  if (t.match(/^[a-z]+:\/\//i))
    return t;
  if (t.match(/^\/\//))
    return window.location.protocol + t;
  if (t.match(/^[a-z]+:/i))
    return t;
  const n = document.implementation.createHTMLDocument(), o = n.createElement("base"), i = n.createElement("a");
  return n.head.appendChild(o), n.body.appendChild(i), e && (o.href = e), i.href = t, i.href;
}
const By = /* @__PURE__ */ (() => {
  let t = 0;
  const e = () => (
    // eslint-disable-next-line no-bitwise
    `0000${(Math.random() * 36 ** 4 << 0).toString(36)}`.slice(-4)
  );
  return () => (t += 1, `u${e()}${t}`);
})();
function Ct(t) {
  const e = [];
  for (let n = 0, o = t.length; n < o; n++)
    e.push(t[n]);
  return e;
}
let Rt = null;
function nl(t = {}) {
  return Rt || (t.includeStyleProperties ? (Rt = t.includeStyleProperties, Rt) : (Rt = Ct(window.getComputedStyle(document.documentElement)), Rt));
}
function Co(t, e) {
  const o = (t.ownerDocument.defaultView || window).getComputedStyle(t).getPropertyValue(e);
  return o ? parseFloat(o.replace("px", "")) : 0;
}
function qy(t) {
  const e = Co(t, "border-left-width"), n = Co(t, "border-right-width");
  return t.clientWidth + e + n;
}
function Yy(t) {
  const e = Co(t, "border-top-width"), n = Co(t, "border-bottom-width");
  return t.clientHeight + e + n;
}
function Wi(t, e = {}) {
  const n = e.width || qy(t), o = e.height || Yy(t);
  return { width: n, height: o };
}
function Xy() {
  let t, e;
  try {
    e = process;
  } catch {
  }
  const n = e && e.env ? e.env.devicePixelRatio : null;
  return n && (t = parseInt(n, 10), Number.isNaN(t) && (t = 1)), t || window.devicePixelRatio || 1;
}
const He = 16384;
function Wy(t) {
  (t.width > He || t.height > He) && (t.width > He && t.height > He ? t.width > t.height ? (t.height *= He / t.width, t.width = He) : (t.width *= He / t.height, t.height = He) : t.width > He ? (t.height *= He / t.width, t.width = He) : (t.width *= He / t.height, t.height = He));
}
function jy(t, e = {}) {
  return t.toBlob ? new Promise((n) => {
    t.toBlob(n, e.type ? e.type : "image/png", e.quality ? e.quality : 1);
  }) : new Promise((n) => {
    const o = window.atob(t.toDataURL(e.type ? e.type : void 0, e.quality ? e.quality : void 0).split(",")[1]), i = o.length, s = new Uint8Array(i);
    for (let a = 0; a < i; a += 1)
      s[a] = o.charCodeAt(a);
    n(new Blob([s], {
      type: e.type ? e.type : "image/png"
    }));
  });
}
function So(t) {
  return new Promise((e, n) => {
    const o = new Image();
    o.onload = () => {
      o.decode().then(() => {
        requestAnimationFrame(() => e(o));
      });
    }, o.onerror = n, o.crossOrigin = "anonymous", o.decoding = "async", o.src = t;
  });
}
async function Uy(t) {
  return Promise.resolve().then(() => new XMLSerializer().serializeToString(t)).then(encodeURIComponent).then((e) => `data:image/svg+xml;charset=utf-8,${e}`);
}
async function Gy(t, e, n) {
  const o = "http://www.w3.org/2000/svg", i = document.createElementNS(o, "svg"), s = document.createElementNS(o, "foreignObject");
  return i.setAttribute("width", `${e}`), i.setAttribute("height", `${n}`), i.setAttribute("viewBox", `0 0 ${e} ${n}`), s.setAttribute("width", "100%"), s.setAttribute("height", "100%"), s.setAttribute("x", "0"), s.setAttribute("y", "0"), s.setAttribute("externalResourcesRequired", "true"), i.appendChild(s), s.appendChild(t), Uy(i);
}
const $e = (t, e) => {
  if (t instanceof e)
    return !0;
  const n = Object.getPrototypeOf(t);
  return n === null ? !1 : n.constructor.name === e.name || $e(n, e);
};
function Zy(t) {
  const e = t.getPropertyValue("content");
  return `${t.cssText} content: '${e.replace(/'|"/g, "")}';`;
}
function Ky(t, e) {
  return nl(e).map((n) => {
    const o = t.getPropertyValue(n), i = t.getPropertyPriority(n);
    return `${n}: ${o}${i ? " !important" : ""};`;
  }).join(" ");
}
function Jy(t, e, n, o) {
  const i = `.${t}:${e}`, s = n.cssText ? Zy(n) : Ky(n, o);
  return document.createTextNode(`${i}{${s}}`);
}
function Sr(t, e, n, o) {
  const i = window.getComputedStyle(t, n), s = i.getPropertyValue("content");
  if (s === "" || s === "none")
    return;
  const a = By();
  try {
    e.className = `${e.className} ${a}`;
  } catch {
    return;
  }
  const r = document.createElement("style");
  r.appendChild(Jy(a, n, i, o)), e.appendChild(r);
}
function Qy(t, e, n) {
  Sr(t, e, ":before", n), Sr(t, e, ":after", n);
}
const kr = "application/font-woff", Lr = "image/jpeg", ew = {
  woff: kr,
  woff2: kr,
  ttf: "application/font-truetype",
  eot: "application/vnd.ms-fontobject",
  png: "image/png",
  jpg: Lr,
  jpeg: Lr,
  gif: "image/gif",
  tiff: "image/tiff",
  svg: "image/svg+xml",
  webp: "image/webp"
};
function tw(t) {
  const e = /\.([^./]*?)$/g.exec(t);
  return e ? e[1] : "";
}
function ji(t) {
  const e = tw(t).toLowerCase();
  return ew[e] || "";
}
function nw(t) {
  return t.split(/,/)[1];
}
function Ei(t) {
  return t.search(/^(data:)/) !== -1;
}
function ow(t, e) {
  return `data:${e};base64,${t}`;
}
async function ol(t, e, n) {
  const o = await fetch(t, e);
  if (o.status === 404)
    throw new Error(`Resource "${o.url}" not found`);
  const i = await o.blob();
  return new Promise((s, a) => {
    const r = new FileReader();
    r.onerror = a, r.onloadend = () => {
      try {
        s(n({ res: o, result: r.result }));
      } catch (l) {
        a(l);
      }
    }, r.readAsDataURL(i);
  });
}
const Qo = {};
function iw(t, e, n) {
  let o = t.replace(/\?.*/, "");
  return n && (o = t), /ttf|otf|eot|woff2?/i.test(o) && (o = o.replace(/.*\//, "")), e ? `[${e}]${o}` : o;
}
async function Ui(t, e, n) {
  const o = iw(t, e, n.includeQueryParams);
  if (Qo[o] != null)
    return Qo[o];
  n.cacheBust && (t += (/\?/.test(t) ? "&" : "?") + (/* @__PURE__ */ new Date()).getTime());
  let i;
  try {
    const s = await ol(t, n.fetchRequestInit, ({ res: a, result: r }) => (e || (e = a.headers.get("Content-Type") || ""), nw(r)));
    i = ow(s, e);
  } catch (s) {
    i = n.imagePlaceholder || "";
    let a = `Failed to fetch resource: ${t}`;
    s && (a = typeof s == "string" ? s : s.message), a && console.warn(a);
  }
  return Qo[o] = i, i;
}
async function sw(t) {
  const e = t.toDataURL();
  return e === "data:," ? t.cloneNode(!1) : So(e);
}
async function rw(t, e) {
  if (t.currentSrc) {
    const s = document.createElement("canvas"), a = s.getContext("2d");
    s.width = t.clientWidth, s.height = t.clientHeight, a?.drawImage(t, 0, 0, s.width, s.height);
    const r = s.toDataURL();
    return So(r);
  }
  const n = t.poster, o = ji(n), i = await Ui(n, o, e);
  return So(i);
}
async function aw(t, e) {
  var n;
  try {
    if (!((n = t?.contentDocument) === null || n === void 0) && n.body)
      return await Ro(t.contentDocument.body, e, !0);
  } catch {
  }
  return t.cloneNode(!1);
}
async function lw(t, e) {
  return $e(t, HTMLCanvasElement) ? sw(t) : $e(t, HTMLVideoElement) ? rw(t, e) : $e(t, HTMLIFrameElement) ? aw(t, e) : t.cloneNode(il(t));
}
const cw = (t) => t.tagName != null && t.tagName.toUpperCase() === "SLOT", il = (t) => t.tagName != null && t.tagName.toUpperCase() === "SVG";
async function dw(t, e, n) {
  var o, i;
  if (il(e))
    return e;
  let s = [];
  return cw(t) && t.assignedNodes ? s = Ct(t.assignedNodes()) : $e(t, HTMLIFrameElement) && (!((o = t.contentDocument) === null || o === void 0) && o.body) ? s = Ct(t.contentDocument.body.childNodes) : s = Ct(((i = t.shadowRoot) !== null && i !== void 0 ? i : t).childNodes), s.length === 0 || $e(t, HTMLVideoElement) || await s.reduce((a, r) => a.then(() => Ro(r, n)).then((l) => {
    l && e.appendChild(l);
  }), Promise.resolve()), e;
}
function uw(t, e, n) {
  const o = e.style;
  if (!o)
    return;
  const i = window.getComputedStyle(t);
  i.cssText ? (o.cssText = i.cssText, o.transformOrigin = i.transformOrigin) : nl(n).forEach((s) => {
    let a = i.getPropertyValue(s);
    s === "font-size" && a.endsWith("px") && (a = `${Math.floor(parseFloat(a.substring(0, a.length - 2))) - 0.1}px`), $e(t, HTMLIFrameElement) && s === "display" && a === "inline" && (a = "block"), s === "d" && e.getAttribute("d") && (a = `path(${e.getAttribute("d")})`), o.setProperty(s, a, i.getPropertyPriority(s));
  });
}
function fw(t, e) {
  $e(t, HTMLTextAreaElement) && (e.innerHTML = t.value), $e(t, HTMLInputElement) && e.setAttribute("value", t.value);
}
function hw(t, e) {
  if ($e(t, HTMLSelectElement)) {
    const o = Array.from(e.children).find((i) => t.value === i.getAttribute("value"));
    o && o.setAttribute("selected", "");
  }
}
function gw(t, e, n) {
  return $e(e, Element) && (uw(t, e, n), Qy(t, e, n), fw(t, e), hw(t, e)), e;
}
async function pw(t, e) {
  const n = t.querySelectorAll ? t.querySelectorAll("use") : [];
  if (n.length === 0)
    return t;
  const o = {};
  for (let s = 0; s < n.length; s++) {
    const r = n[s].getAttribute("xlink:href");
    if (r) {
      const l = t.querySelector(r), c = document.querySelector(r);
      !l && c && !o[r] && (o[r] = await Ro(c, e, !0));
    }
  }
  const i = Object.values(o);
  if (i.length) {
    const s = "http://www.w3.org/1999/xhtml", a = document.createElementNS(s, "svg");
    a.setAttribute("xmlns", s), a.style.position = "absolute", a.style.width = "0", a.style.height = "0", a.style.overflow = "hidden", a.style.display = "none";
    const r = document.createElementNS(s, "defs");
    a.appendChild(r);
    for (let l = 0; l < i.length; l++)
      r.appendChild(i[l]);
    t.appendChild(a);
  }
  return t;
}
async function Ro(t, e, n) {
  return !n && e.filter && !e.filter(t) ? null : Promise.resolve(t).then((o) => lw(o, e)).then((o) => dw(t, o, e)).then((o) => gw(t, o, e)).then((o) => pw(o, e));
}
const sl = /url\((['"]?)([^'"]+?)\1\)/g, mw = /url\([^)]+\)\s*format\((["']?)([^"']+)\1\)/g, yw = /src:\s*(?:url\([^)]+\)\s*format\([^)]+\)[,;]\s*)+/g;
function ww(t) {
  const e = t.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1");
  return new RegExp(`(url\\(['"]?)(${e})(['"]?\\))`, "g");
}
function _w(t) {
  const e = [];
  return t.replace(sl, (n, o, i) => (e.push(i), n)), e.filter((n) => !Ei(n));
}
async function vw(t, e, n, o, i) {
  try {
    const s = n ? Vy(e, n) : e, a = ji(e);
    let r;
    return i || (r = await Ui(s, a, o)), t.replace(ww(e), `$1${r}$3`);
  } catch {
  }
  return t;
}
function bw(t, { preferredFontFormat: e }) {
  return e ? t.replace(yw, (n) => {
    for (; ; ) {
      const [o, , i] = mw.exec(n) || [];
      if (!i)
        return "";
      if (i === e)
        return `src: ${o};`;
    }
  }) : t;
}
function rl(t) {
  return t.search(sl) !== -1;
}
async function al(t, e, n) {
  if (!rl(t))
    return t;
  const o = bw(t, n);
  return _w(o).reduce((s, a) => s.then((r) => vw(r, a, e, n)), Promise.resolve(o));
}
async function Ht(t, e, n) {
  var o;
  const i = (o = e.style) === null || o === void 0 ? void 0 : o.getPropertyValue(t);
  if (i) {
    const s = await al(i, null, n);
    return e.style.setProperty(t, s, e.style.getPropertyPriority(t)), !0;
  }
  return !1;
}
async function xw(t, e) {
  await Ht("background", t, e) || await Ht("background-image", t, e), await Ht("mask", t, e) || await Ht("-webkit-mask", t, e) || await Ht("mask-image", t, e) || await Ht("-webkit-mask-image", t, e);
}
async function Ew(t, e) {
  const n = $e(t, HTMLImageElement);
  if (!(n && !Ei(t.src)) && !($e(t, SVGImageElement) && !Ei(t.href.baseVal)))
    return;
  const o = n ? t.src : t.href.baseVal, i = await Ui(o, ji(o), e);
  await new Promise((s, a) => {
    t.onload = s, t.onerror = e.onImageErrorHandler ? (...l) => {
      try {
        s(e.onImageErrorHandler(...l));
      } catch (c) {
        a(c);
      }
    } : a;
    const r = t;
    r.decode && (r.decode = s), r.loading === "lazy" && (r.loading = "eager"), n ? (t.srcset = "", t.src = i) : t.href.baseVal = i;
  });
}
async function Cw(t, e) {
  const o = Ct(t.childNodes).map((i) => ll(i, e));
  await Promise.all(o).then(() => t);
}
async function ll(t, e) {
  $e(t, Element) && (await xw(t, e), await Ew(t, e), await Cw(t, e));
}
function Sw(t, e) {
  const { style: n } = t;
  e.backgroundColor && (n.backgroundColor = e.backgroundColor), e.width && (n.width = `${e.width}px`), e.height && (n.height = `${e.height}px`);
  const o = e.style;
  return o != null && Object.keys(o).forEach((i) => {
    n[i] = o[i];
  }), t;
}
const Mr = {};
async function Pr(t) {
  let e = Mr[t];
  if (e != null)
    return e;
  const o = await (await fetch(t)).text();
  return e = { url: t, cssText: o }, Mr[t] = e, e;
}
async function Nr(t, e) {
  let n = t.cssText;
  const o = /url\(["']?([^"')]+)["']?\)/g, s = (n.match(/url\([^)]+\)/g) || []).map(async (a) => {
    let r = a.replace(o, "$1");
    return r.startsWith("https://") || (r = new URL(r, t.url).href), ol(r, e.fetchRequestInit, ({ result: l }) => (n = n.replace(a, `url(${l})`), [a, l]));
  });
  return Promise.all(s).then(() => n);
}
function Ar(t) {
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
  const s = /@import[\s\S]*?url\([^)]*\)[\s\S]*?;/gi, a = "((\\s*?(?:\\/\\*[\\s\\S]*?\\*\\/)?\\s*?@media[\\s\\S]*?){([\\s\\S]*?)}\\s*?})|(([\\s\\S]*?){([\\s\\S]*?)})", r = new RegExp(a, "gi");
  for (; ; ) {
    let l = s.exec(o);
    if (l === null) {
      if (l = r.exec(o), l === null)
        break;
      s.lastIndex = r.lastIndex;
    } else
      r.lastIndex = s.lastIndex;
    e.push(l[0]);
  }
  return e;
}
async function kw(t, e) {
  const n = [], o = [];
  return t.forEach((i) => {
    if ("cssRules" in i)
      try {
        Ct(i.cssRules || []).forEach((s, a) => {
          if (s.type === CSSRule.IMPORT_RULE) {
            let r = a + 1;
            const l = s.href, c = Pr(l).then((d) => Nr(d, e)).then((d) => Ar(d).forEach((f) => {
              try {
                i.insertRule(f, f.startsWith("@import") ? r += 1 : i.cssRules.length);
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
      } catch (s) {
        const a = t.find((r) => r.href == null) || document.styleSheets[0];
        i.href != null && o.push(Pr(i.href).then((r) => Nr(r, e)).then((r) => Ar(r).forEach((l) => {
          a.insertRule(l, a.cssRules.length);
        })).catch((r) => {
          console.error("Error loading remote stylesheet", r);
        })), console.error("Error inlining remote css file", s);
      }
  }), Promise.all(o).then(() => (t.forEach((i) => {
    if ("cssRules" in i)
      try {
        Ct(i.cssRules || []).forEach((s) => {
          n.push(s);
        });
      } catch (s) {
        console.error(`Error while reading CSS rules from ${i.href}`, s);
      }
  }), n));
}
function Lw(t) {
  return t.filter((e) => e.type === CSSRule.FONT_FACE_RULE).filter((e) => rl(e.style.getPropertyValue("src")));
}
async function Mw(t, e) {
  if (t.ownerDocument == null)
    throw new Error("Provided element is not within a Document");
  const n = Ct(t.ownerDocument.styleSheets), o = await kw(n, e);
  return Lw(o);
}
function cl(t) {
  return t.trim().replace(/["']/g, "");
}
function Pw(t) {
  const e = /* @__PURE__ */ new Set();
  function n(o) {
    (o.style.fontFamily || getComputedStyle(o).fontFamily).split(",").forEach((s) => {
      e.add(cl(s));
    }), Array.from(o.children).forEach((s) => {
      s instanceof HTMLElement && n(s);
    });
  }
  return n(t), e;
}
async function dl(t, e) {
  const n = await Mw(t, e), o = Pw(t);
  return (await Promise.all(n.filter((s) => o.has(cl(s.style.fontFamily))).map((s) => {
    const a = s.parentStyleSheet ? s.parentStyleSheet.href : null;
    return al(s.cssText, a, e);
  }))).join(`
`);
}
async function Nw(t, e) {
  const n = e.fontEmbedCSS != null ? e.fontEmbedCSS : e.skipFonts ? null : await dl(t, e);
  if (n) {
    const o = document.createElement("style"), i = document.createTextNode(n);
    o.appendChild(i), t.firstChild ? t.insertBefore(o, t.firstChild) : t.appendChild(o);
  }
}
async function ul(t, e = {}) {
  const { width: n, height: o } = Wi(t, e), i = await Ro(t, e, !0);
  return await Nw(i, e), await ll(i, e), Sw(i, e), await Gy(i, n, o);
}
async function Dn(t, e = {}) {
  const { width: n, height: o } = Wi(t, e), i = await ul(t, e), s = await So(i), a = document.createElement("canvas"), r = a.getContext("2d"), l = e.pixelRatio || Xy(), c = e.canvasWidth || n, d = e.canvasHeight || o;
  return a.width = c * l, a.height = d * l, e.skipAutoScale || Wy(a), a.style.width = `${c}`, a.style.height = `${d}`, e.backgroundColor && (r.fillStyle = e.backgroundColor, r.fillRect(0, 0, a.width, a.height)), r.drawImage(s, 0, 0, a.width, a.height), a;
}
async function Aw(t, e = {}) {
  const { width: n, height: o } = Wi(t, e);
  return (await Dn(t, e)).getContext("2d").getImageData(0, 0, n, o).data;
}
async function Tw(t, e = {}) {
  return (await Dn(t, e)).toDataURL();
}
async function Iw(t, e = {}) {
  return (await Dn(t, e)).toDataURL("image/jpeg", e.quality || 1);
}
async function $w(t, e = {}) {
  const n = await Dn(t, e);
  return await jy(n);
}
async function Dw(t, e = {}) {
  return dl(t, e);
}
const Rw = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getFontEmbedCSS: Dw,
  toBlob: $w,
  toCanvas: Dn,
  toJpeg: Iw,
  toPixelData: Aw,
  toPng: Tw,
  toSvg: ul
}, Symbol.toStringTag, { value: "Module" }));
export {
  dg as ComputeEngine,
  $f as FlowHistory,
  Ds as SHORTCUT_DEFAULTS,
  zw as along,
  fh as areNodesConnected,
  Fa as buildNodeMap,
  za as clampToExtent,
  Bo as clampToParent,
  Xw as computeRenderPlan,
  Xs as computeValidationErrors,
  Oa as computeZIndex,
  Ww as default,
  Bw as drift,
  Jh as expandParentToFitChild,
  pi as getAbsolutePosition,
  bh as getAutoPanDelta,
  mo as getBezierPath,
  ch as getConnectedEdges,
  Et as getDescendantIds,
  or as getEdgePosition,
  Ja as getFloatingEdgeParams,
  dh as getIncomers,
  nr as getNodeIntersection,
  Gt as getNodesBounds,
  lh as getNodesFullyInPolygon,
  Mf as getNodesFullyInRect,
  ah as getNodesInPolygon,
  Lf as getNodesInRect,
  hi as getOutgoers,
  Hw as getSimpleBezierPath,
  Yw as getSimpleFloatingPosition,
  Ln as getSmoothStepPath,
  vh as getStepPath,
  Sa as getStraightPath,
  co as getViewportForBounds,
  Ye as isConnectable,
  yh as isDeletable,
  Ca as isDraggable,
  As as isResizable,
  yn as isSelectable,
  Je as matchesKey,
  xt as matchesModifier,
  Fw as orbit,
  Vw as pendulum,
  Hi as pointInPolygon,
  rh as polygonIntersectsAABB,
  qf as registerMarker,
  _n as resolveChildValidation,
  kh as resolveShortcuts,
  Tt as sortNodesTopological,
  qw as stagger,
  dt as toAbsoluteNode,
  wo as toAbsoluteNodes,
  Ya as validateChildAdd,
  _o as validateChildRemove,
  Ow as wave
};
//# sourceMappingURL=alpineflow.bundle.esm.js.map
