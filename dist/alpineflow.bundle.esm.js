let co = null;
function ur(e) {
  co = e;
}
function $e() {
  if (!co)
    throw new Error("[AlpineFlow] Alpine not initialized. Ensure Alpine.plugin(AlpineFlow) was called.");
  return co;
}
var fr = { value: () => {
} };
function Vn() {
  for (var e = 0, t = arguments.length, n = {}, o; e < t; ++e) {
    if (!(o = arguments[e] + "") || o in n || /[\s.]/.test(o)) throw new Error("illegal type: " + o);
    n[o] = [];
  }
  return new yn(n);
}
function yn(e) {
  this._ = e;
}
function hr(e, t) {
  return e.trim().split(/^|\s+/).map(function(n) {
    var o = "", i = n.indexOf(".");
    if (i >= 0 && (o = n.slice(i + 1), n = n.slice(0, i)), n && !t.hasOwnProperty(n)) throw new Error("unknown type: " + n);
    return { type: n, name: o };
  });
}
yn.prototype = Vn.prototype = {
  constructor: yn,
  on: function(e, t) {
    var n = this._, o = hr(e + "", n), i, r = -1, s = o.length;
    if (arguments.length < 2) {
      for (; ++r < s; ) if ((i = (e = o[r]).type) && (i = gr(n[i], e.name))) return i;
      return;
    }
    if (t != null && typeof t != "function") throw new Error("invalid callback: " + t);
    for (; ++r < s; )
      if (i = (e = o[r]).type) n[i] = Zo(n[i], e.name, t);
      else if (t == null) for (i in n) n[i] = Zo(n[i], e.name, null);
    return this;
  },
  copy: function() {
    var e = {}, t = this._;
    for (var n in t) e[n] = t[n].slice();
    return new yn(e);
  },
  call: function(e, t) {
    if ((i = arguments.length - 2) > 0) for (var n = new Array(i), o = 0, i, r; o < i; ++o) n[o] = arguments[o + 2];
    if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    for (r = this._[e], o = 0, i = r.length; o < i; ++o) r[o].value.apply(t, n);
  },
  apply: function(e, t, n) {
    if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    for (var o = this._[e], i = 0, r = o.length; i < r; ++i) o[i].value.apply(t, n);
  }
};
function gr(e, t) {
  for (var n = 0, o = e.length, i; n < o; ++n)
    if ((i = e[n]).name === t)
      return i.value;
}
function Zo(e, t, n) {
  for (var o = 0, i = e.length; o < i; ++o)
    if (e[o].name === t) {
      e[o] = fr, e = e.slice(0, o).concat(e.slice(o + 1));
      break;
    }
  return n != null && e.push({ name: t, value: n }), e;
}
var uo = "http://www.w3.org/1999/xhtml";
const Ko = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: uo,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function Xn(e) {
  var t = e += "", n = t.indexOf(":");
  return n >= 0 && (t = e.slice(0, n)) !== "xmlns" && (e = e.slice(n + 1)), Ko.hasOwnProperty(t) ? { space: Ko[t], local: e } : e;
}
function pr(e) {
  return function() {
    var t = this.ownerDocument, n = this.namespaceURI;
    return n === uo && t.documentElement.namespaceURI === uo ? t.createElement(e) : t.createElementNS(n, e);
  };
}
function mr(e) {
  return function() {
    return this.ownerDocument.createElementNS(e.space, e.local);
  };
}
function Ki(e) {
  var t = Xn(e);
  return (t.local ? mr : pr)(t);
}
function yr() {
}
function ko(e) {
  return e == null ? yr : function() {
    return this.querySelector(e);
  };
}
function wr(e) {
  typeof e != "function" && (e = ko(e));
  for (var t = this._groups, n = t.length, o = new Array(n), i = 0; i < n; ++i)
    for (var r = t[i], s = r.length, l = o[i] = new Array(s), a, c, u = 0; u < s; ++u)
      (a = r[u]) && (c = e.call(a, a.__data__, u, r)) && ("__data__" in a && (c.__data__ = a.__data__), l[u] = c);
  return new Ne(o, this._parents);
}
function vr(e) {
  return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function _r() {
  return [];
}
function Gi(e) {
  return e == null ? _r : function() {
    return this.querySelectorAll(e);
  };
}
function br(e) {
  return function() {
    return vr(e.apply(this, arguments));
  };
}
function xr(e) {
  typeof e == "function" ? e = br(e) : e = Gi(e);
  for (var t = this._groups, n = t.length, o = [], i = [], r = 0; r < n; ++r)
    for (var s = t[r], l = s.length, a, c = 0; c < l; ++c)
      (a = s[c]) && (o.push(e.call(a, a.__data__, c, s)), i.push(a));
  return new Ne(o, i);
}
function Ji(e) {
  return function() {
    return this.matches(e);
  };
}
function Qi(e) {
  return function(t) {
    return t.matches(e);
  };
}
var Er = Array.prototype.find;
function Cr(e) {
  return function() {
    return Er.call(this.children, e);
  };
}
function Sr() {
  return this.firstElementChild;
}
function Lr(e) {
  return this.select(e == null ? Sr : Cr(typeof e == "function" ? e : Qi(e)));
}
var Mr = Array.prototype.filter;
function Pr() {
  return Array.from(this.children);
}
function kr(e) {
  return function() {
    return Mr.call(this.children, e);
  };
}
function Nr(e) {
  return this.selectAll(e == null ? Pr : kr(typeof e == "function" ? e : Qi(e)));
}
function Tr(e) {
  typeof e != "function" && (e = Ji(e));
  for (var t = this._groups, n = t.length, o = new Array(n), i = 0; i < n; ++i)
    for (var r = t[i], s = r.length, l = o[i] = [], a, c = 0; c < s; ++c)
      (a = r[c]) && e.call(a, a.__data__, c, r) && l.push(a);
  return new Ne(o, this._parents);
}
function es(e) {
  return new Array(e.length);
}
function Ir() {
  return new Ne(this._enter || this._groups.map(es), this._parents);
}
function En(e, t) {
  this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = t;
}
En.prototype = {
  constructor: En,
  appendChild: function(e) {
    return this._parent.insertBefore(e, this._next);
  },
  insertBefore: function(e, t) {
    return this._parent.insertBefore(e, t);
  },
  querySelector: function(e) {
    return this._parent.querySelector(e);
  },
  querySelectorAll: function(e) {
    return this._parent.querySelectorAll(e);
  }
};
function $r(e) {
  return function() {
    return e;
  };
}
function Ar(e, t, n, o, i, r) {
  for (var s = 0, l, a = t.length, c = r.length; s < c; ++s)
    (l = t[s]) ? (l.__data__ = r[s], o[s] = l) : n[s] = new En(e, r[s]);
  for (; s < a; ++s)
    (l = t[s]) && (i[s] = l);
}
function Dr(e, t, n, o, i, r, s) {
  var l, a, c = /* @__PURE__ */ new Map(), u = t.length, h = r.length, d = new Array(u), f;
  for (l = 0; l < u; ++l)
    (a = t[l]) && (d[l] = f = s.call(a, a.__data__, l, t) + "", c.has(f) ? i[l] = a : c.set(f, a));
  for (l = 0; l < h; ++l)
    f = s.call(e, r[l], l, r) + "", (a = c.get(f)) ? (o[l] = a, a.__data__ = r[l], c.delete(f)) : n[l] = new En(e, r[l]);
  for (l = 0; l < u; ++l)
    (a = t[l]) && c.get(d[l]) === a && (i[l] = a);
}
function Hr(e) {
  return e.__data__;
}
function Rr(e, t) {
  if (!arguments.length) return Array.from(this, Hr);
  var n = t ? Dr : Ar, o = this._parents, i = this._groups;
  typeof e != "function" && (e = $r(e));
  for (var r = i.length, s = new Array(r), l = new Array(r), a = new Array(r), c = 0; c < r; ++c) {
    var u = o[c], h = i[c], d = h.length, f = zr(e.call(u, u && u.__data__, c, o)), g = f.length, m = l[c] = new Array(g), w = s[c] = new Array(g), y = a[c] = new Array(d);
    n(u, h, m, w, y, f, t);
    for (var M = 0, L = 0, b, D; M < g; ++M)
      if (b = m[M]) {
        for (M >= L && (L = M + 1); !(D = w[L]) && ++L < g; ) ;
        b._next = D || null;
      }
  }
  return s = new Ne(s, o), s._enter = l, s._exit = a, s;
}
function zr(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function Fr() {
  return new Ne(this._exit || this._groups.map(es), this._parents);
}
function Or(e, t, n) {
  var o = this.enter(), i = this, r = this.exit();
  return typeof e == "function" ? (o = e(o), o && (o = o.selection())) : o = o.append(e + ""), t != null && (i = t(i), i && (i = i.selection())), n == null ? r.remove() : n(r), o && i ? o.merge(i).order() : i;
}
function Vr(e) {
  for (var t = e.selection ? e.selection() : e, n = this._groups, o = t._groups, i = n.length, r = o.length, s = Math.min(i, r), l = new Array(i), a = 0; a < s; ++a)
    for (var c = n[a], u = o[a], h = c.length, d = l[a] = new Array(h), f, g = 0; g < h; ++g)
      (f = c[g] || u[g]) && (d[g] = f);
  for (; a < i; ++a)
    l[a] = n[a];
  return new Ne(l, this._parents);
}
function Xr() {
  for (var e = this._groups, t = -1, n = e.length; ++t < n; )
    for (var o = e[t], i = o.length - 1, r = o[i], s; --i >= 0; )
      (s = o[i]) && (r && s.compareDocumentPosition(r) ^ 4 && r.parentNode.insertBefore(s, r), r = s);
  return this;
}
function Yr(e) {
  e || (e = qr);
  function t(h, d) {
    return h && d ? e(h.__data__, d.__data__) : !h - !d;
  }
  for (var n = this._groups, o = n.length, i = new Array(o), r = 0; r < o; ++r) {
    for (var s = n[r], l = s.length, a = i[r] = new Array(l), c, u = 0; u < l; ++u)
      (c = s[u]) && (a[u] = c);
    a.sort(t);
  }
  return new Ne(i, this._parents).order();
}
function qr(e, t) {
  return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function Br() {
  var e = arguments[0];
  return arguments[0] = this, e.apply(null, arguments), this;
}
function Wr() {
  return Array.from(this);
}
function Ur() {
  for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
    for (var o = e[t], i = 0, r = o.length; i < r; ++i) {
      var s = o[i];
      if (s) return s;
    }
  return null;
}
function jr() {
  let e = 0;
  for (const t of this) ++e;
  return e;
}
function Zr() {
  return !this.node();
}
function Kr(e) {
  for (var t = this._groups, n = 0, o = t.length; n < o; ++n)
    for (var i = t[n], r = 0, s = i.length, l; r < s; ++r)
      (l = i[r]) && e.call(l, l.__data__, r, i);
  return this;
}
function Gr(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function Jr(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function Qr(e, t) {
  return function() {
    this.setAttribute(e, t);
  };
}
function ea(e, t) {
  return function() {
    this.setAttributeNS(e.space, e.local, t);
  };
}
function ta(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.removeAttribute(e) : this.setAttribute(e, n);
  };
}
function na(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, n);
  };
}
function oa(e, t) {
  var n = Xn(e);
  if (arguments.length < 2) {
    var o = this.node();
    return n.local ? o.getAttributeNS(n.space, n.local) : o.getAttribute(n);
  }
  return this.each((t == null ? n.local ? Jr : Gr : typeof t == "function" ? n.local ? na : ta : n.local ? ea : Qr)(n, t));
}
function ts(e) {
  return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
}
function ia(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function sa(e, t, n) {
  return function() {
    this.style.setProperty(e, t, n);
  };
}
function ra(e, t, n) {
  return function() {
    var o = t.apply(this, arguments);
    o == null ? this.style.removeProperty(e) : this.style.setProperty(e, o, n);
  };
}
function aa(e, t, n) {
  return arguments.length > 1 ? this.each((t == null ? ia : typeof t == "function" ? ra : sa)(e, t, n ?? "")) : Lt(this.node(), e);
}
function Lt(e, t) {
  return e.style.getPropertyValue(t) || ts(e).getComputedStyle(e, null).getPropertyValue(t);
}
function la(e) {
  return function() {
    delete this[e];
  };
}
function ca(e, t) {
  return function() {
    this[e] = t;
  };
}
function da(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? delete this[e] : this[e] = n;
  };
}
function ua(e, t) {
  return arguments.length > 1 ? this.each((t == null ? la : typeof t == "function" ? da : ca)(e, t)) : this.node()[e];
}
function ns(e) {
  return e.trim().split(/^|\s+/);
}
function No(e) {
  return e.classList || new os(e);
}
function os(e) {
  this._node = e, this._names = ns(e.getAttribute("class") || "");
}
os.prototype = {
  add: function(e) {
    var t = this._names.indexOf(e);
    t < 0 && (this._names.push(e), this._node.setAttribute("class", this._names.join(" ")));
  },
  remove: function(e) {
    var t = this._names.indexOf(e);
    t >= 0 && (this._names.splice(t, 1), this._node.setAttribute("class", this._names.join(" ")));
  },
  contains: function(e) {
    return this._names.indexOf(e) >= 0;
  }
};
function is(e, t) {
  for (var n = No(e), o = -1, i = t.length; ++o < i; ) n.add(t[o]);
}
function ss(e, t) {
  for (var n = No(e), o = -1, i = t.length; ++o < i; ) n.remove(t[o]);
}
function fa(e) {
  return function() {
    is(this, e);
  };
}
function ha(e) {
  return function() {
    ss(this, e);
  };
}
function ga(e, t) {
  return function() {
    (t.apply(this, arguments) ? is : ss)(this, e);
  };
}
function pa(e, t) {
  var n = ns(e + "");
  if (arguments.length < 2) {
    for (var o = No(this.node()), i = -1, r = n.length; ++i < r; ) if (!o.contains(n[i])) return !1;
    return !0;
  }
  return this.each((typeof t == "function" ? ga : t ? fa : ha)(n, t));
}
function ma() {
  this.textContent = "";
}
function ya(e) {
  return function() {
    this.textContent = e;
  };
}
function wa(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.textContent = t ?? "";
  };
}
function va(e) {
  return arguments.length ? this.each(e == null ? ma : (typeof e == "function" ? wa : ya)(e)) : this.node().textContent;
}
function _a() {
  this.innerHTML = "";
}
function ba(e) {
  return function() {
    this.innerHTML = e;
  };
}
function xa(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.innerHTML = t ?? "";
  };
}
function Ea(e) {
  return arguments.length ? this.each(e == null ? _a : (typeof e == "function" ? xa : ba)(e)) : this.node().innerHTML;
}
function Ca() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Sa() {
  return this.each(Ca);
}
function La() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Ma() {
  return this.each(La);
}
function Pa(e) {
  var t = typeof e == "function" ? e : Ki(e);
  return this.select(function() {
    return this.appendChild(t.apply(this, arguments));
  });
}
function ka() {
  return null;
}
function Na(e, t) {
  var n = typeof e == "function" ? e : Ki(e), o = t == null ? ka : typeof t == "function" ? t : ko(t);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), o.apply(this, arguments) || null);
  });
}
function Ta() {
  var e = this.parentNode;
  e && e.removeChild(this);
}
function Ia() {
  return this.each(Ta);
}
function $a() {
  var e = this.cloneNode(!1), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function Aa() {
  var e = this.cloneNode(!0), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function Da(e) {
  return this.select(e ? Aa : $a);
}
function Ha(e) {
  return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
function Ra(e) {
  return function(t) {
    e.call(this, t, this.__data__);
  };
}
function za(e) {
  return e.trim().split(/^|\s+/).map(function(t) {
    var n = "", o = t.indexOf(".");
    return o >= 0 && (n = t.slice(o + 1), t = t.slice(0, o)), { type: t, name: n };
  });
}
function Fa(e) {
  return function() {
    var t = this.__on;
    if (t) {
      for (var n = 0, o = -1, i = t.length, r; n < i; ++n)
        r = t[n], (!e.type || r.type === e.type) && r.name === e.name ? this.removeEventListener(r.type, r.listener, r.options) : t[++o] = r;
      ++o ? t.length = o : delete this.__on;
    }
  };
}
function Oa(e, t, n) {
  return function() {
    var o = this.__on, i, r = Ra(t);
    if (o) {
      for (var s = 0, l = o.length; s < l; ++s)
        if ((i = o[s]).type === e.type && i.name === e.name) {
          this.removeEventListener(i.type, i.listener, i.options), this.addEventListener(i.type, i.listener = r, i.options = n), i.value = t;
          return;
        }
    }
    this.addEventListener(e.type, r, n), i = { type: e.type, name: e.name, value: t, listener: r, options: n }, o ? o.push(i) : this.__on = [i];
  };
}
function Va(e, t, n) {
  var o = za(e + ""), i, r = o.length, s;
  if (arguments.length < 2) {
    var l = this.node().__on;
    if (l) {
      for (var a = 0, c = l.length, u; a < c; ++a)
        for (i = 0, u = l[a]; i < r; ++i)
          if ((s = o[i]).type === u.type && s.name === u.name)
            return u.value;
    }
    return;
  }
  for (l = t ? Oa : Fa, i = 0; i < r; ++i) this.each(l(o[i], t, n));
  return this;
}
function rs(e, t, n) {
  var o = ts(e), i = o.CustomEvent;
  typeof i == "function" ? i = new i(t, n) : (i = o.document.createEvent("Event"), n ? (i.initEvent(t, n.bubbles, n.cancelable), i.detail = n.detail) : i.initEvent(t, !1, !1)), e.dispatchEvent(i);
}
function Xa(e, t) {
  return function() {
    return rs(this, e, t);
  };
}
function Ya(e, t) {
  return function() {
    return rs(this, e, t.apply(this, arguments));
  };
}
function qa(e, t) {
  return this.each((typeof t == "function" ? Ya : Xa)(e, t));
}
function* Ba() {
  for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
    for (var o = e[t], i = 0, r = o.length, s; i < r; ++i)
      (s = o[i]) && (yield s);
}
var as = [null];
function Ne(e, t) {
  this._groups = e, this._parents = t;
}
function en() {
  return new Ne([[document.documentElement]], as);
}
function Wa() {
  return this;
}
Ne.prototype = en.prototype = {
  constructor: Ne,
  select: wr,
  selectAll: xr,
  selectChild: Lr,
  selectChildren: Nr,
  filter: Tr,
  data: Rr,
  enter: Ir,
  exit: Fr,
  join: Or,
  merge: Vr,
  selection: Wa,
  order: Xr,
  sort: Yr,
  call: Br,
  nodes: Wr,
  node: Ur,
  size: jr,
  empty: Zr,
  each: Kr,
  attr: oa,
  style: aa,
  property: ua,
  classed: pa,
  text: va,
  html: Ea,
  raise: Sa,
  lower: Ma,
  append: Pa,
  insert: Na,
  remove: Ia,
  clone: Da,
  datum: Ha,
  on: Va,
  dispatch: qa,
  [Symbol.iterator]: Ba
};
function Ae(e) {
  return typeof e == "string" ? new Ne([[document.querySelector(e)]], [document.documentElement]) : new Ne([[e]], as);
}
function Ua(e) {
  let t;
  for (; t = e.sourceEvent; ) e = t;
  return e;
}
function qe(e, t) {
  if (e = Ua(e), t === void 0 && (t = e.currentTarget), t) {
    var n = t.ownerSVGElement || t;
    if (n.createSVGPoint) {
      var o = n.createSVGPoint();
      return o.x = e.clientX, o.y = e.clientY, o = o.matrixTransform(t.getScreenCTM().inverse()), [o.x, o.y];
    }
    if (t.getBoundingClientRect) {
      var i = t.getBoundingClientRect();
      return [e.clientX - i.left - t.clientLeft, e.clientY - i.top - t.clientTop];
    }
  }
  return [e.pageX, e.pageY];
}
const ja = { passive: !1 }, qt = { capture: !0, passive: !1 };
function jn(e) {
  e.stopImmediatePropagation();
}
function xt(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function ls(e) {
  var t = e.document.documentElement, n = Ae(e).on("dragstart.drag", xt, qt);
  "onselectstart" in t ? n.on("selectstart.drag", xt, qt) : (t.__noselect = t.style.MozUserSelect, t.style.MozUserSelect = "none");
}
function cs(e, t) {
  var n = e.document.documentElement, o = Ae(e).on("dragstart.drag", null);
  t && (o.on("click.drag", xt, qt), setTimeout(function() {
    o.on("click.drag", null);
  }, 0)), "onselectstart" in n ? o.on("selectstart.drag", null) : (n.style.MozUserSelect = n.__noselect, delete n.__noselect);
}
const rn = (e) => () => e;
function fo(e, {
  sourceEvent: t,
  subject: n,
  target: o,
  identifier: i,
  active: r,
  x: s,
  y: l,
  dx: a,
  dy: c,
  dispatch: u
}) {
  Object.defineProperties(this, {
    type: { value: e, enumerable: !0, configurable: !0 },
    sourceEvent: { value: t, enumerable: !0, configurable: !0 },
    subject: { value: n, enumerable: !0, configurable: !0 },
    target: { value: o, enumerable: !0, configurable: !0 },
    identifier: { value: i, enumerable: !0, configurable: !0 },
    active: { value: r, enumerable: !0, configurable: !0 },
    x: { value: s, enumerable: !0, configurable: !0 },
    y: { value: l, enumerable: !0, configurable: !0 },
    dx: { value: a, enumerable: !0, configurable: !0 },
    dy: { value: c, enumerable: !0, configurable: !0 },
    _: { value: u }
  });
}
fo.prototype.on = function() {
  var e = this._.on.apply(this._, arguments);
  return e === this._ ? this : e;
};
function Za(e) {
  return !e.ctrlKey && !e.button;
}
function Ka() {
  return this.parentNode;
}
function Ga(e, t) {
  return t ?? { x: e.x, y: e.y };
}
function Ja() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Qa() {
  var e = Za, t = Ka, n = Ga, o = Ja, i = {}, r = Vn("start", "drag", "end"), s = 0, l, a, c, u, h = 0;
  function d(b) {
    b.on("mousedown.drag", f).filter(o).on("touchstart.drag", w).on("touchmove.drag", y, ja).on("touchend.drag touchcancel.drag", M).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function f(b, D) {
    if (!(u || !e.call(this, b, D))) {
      var k = L(this, t.call(this, b, D), b, D, "mouse");
      k && (Ae(b.view).on("mousemove.drag", g, qt).on("mouseup.drag", m, qt), ls(b.view), jn(b), c = !1, l = b.clientX, a = b.clientY, k("start", b));
    }
  }
  function g(b) {
    if (xt(b), !c) {
      var D = b.clientX - l, k = b.clientY - a;
      c = D * D + k * k > h;
    }
    i.mouse("drag", b);
  }
  function m(b) {
    Ae(b.view).on("mousemove.drag mouseup.drag", null), cs(b.view, c), xt(b), i.mouse("end", b);
  }
  function w(b, D) {
    if (e.call(this, b, D)) {
      var k = b.changedTouches, A = t.call(this, b, D), _ = k.length, S, $;
      for (S = 0; S < _; ++S)
        ($ = L(this, A, b, D, k[S].identifier, k[S])) && (jn(b), $("start", b, k[S]));
    }
  }
  function y(b) {
    var D = b.changedTouches, k = D.length, A, _;
    for (A = 0; A < k; ++A)
      (_ = i[D[A].identifier]) && (xt(b), _("drag", b, D[A]));
  }
  function M(b) {
    var D = b.changedTouches, k = D.length, A, _;
    for (u && clearTimeout(u), u = setTimeout(function() {
      u = null;
    }, 500), A = 0; A < k; ++A)
      (_ = i[D[A].identifier]) && (jn(b), _("end", b, D[A]));
  }
  function L(b, D, k, A, _, S) {
    var $ = r.copy(), v = qe(S || k, D), p, H, E;
    if ((E = n.call(b, new fo("beforestart", {
      sourceEvent: k,
      target: d,
      identifier: _,
      active: s,
      x: v[0],
      y: v[1],
      dx: 0,
      dy: 0,
      dispatch: $
    }), A)) != null)
      return p = E.x - v[0] || 0, H = E.y - v[1] || 0, function N(P, z, x) {
        var C = v, T;
        switch (P) {
          case "start":
            i[_] = N, T = s++;
            break;
          case "end":
            delete i[_], --s;
          // falls through
          case "drag":
            v = qe(x || z, D), T = s;
            break;
        }
        $.call(
          P,
          b,
          new fo(P, {
            sourceEvent: z,
            subject: E,
            target: d,
            identifier: _,
            active: T,
            x: v[0] + p,
            y: v[1] + H,
            dx: v[0] - C[0],
            dy: v[1] - C[1],
            dispatch: $
          }),
          A
        );
      };
  }
  return d.filter = function(b) {
    return arguments.length ? (e = typeof b == "function" ? b : rn(!!b), d) : e;
  }, d.container = function(b) {
    return arguments.length ? (t = typeof b == "function" ? b : rn(b), d) : t;
  }, d.subject = function(b) {
    return arguments.length ? (n = typeof b == "function" ? b : rn(b), d) : n;
  }, d.touchable = function(b) {
    return arguments.length ? (o = typeof b == "function" ? b : rn(!!b), d) : o;
  }, d.on = function() {
    var b = r.on.apply(r, arguments);
    return b === r ? d : b;
  }, d.clickDistance = function(b) {
    return arguments.length ? (h = (b = +b) * b, d) : Math.sqrt(h);
  }, d;
}
function To(e, t, n) {
  e.prototype = t.prototype = n, n.constructor = e;
}
function ds(e, t) {
  var n = Object.create(e.prototype);
  for (var o in t) n[o] = t[o];
  return n;
}
function tn() {
}
var Bt = 0.7, Cn = 1 / Bt, Et = "\\s*([+-]?\\d+)\\s*", Wt = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Oe = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", el = /^#([0-9a-f]{3,8})$/, tl = new RegExp(`^rgb\\(${Et},${Et},${Et}\\)$`), nl = new RegExp(`^rgb\\(${Oe},${Oe},${Oe}\\)$`), ol = new RegExp(`^rgba\\(${Et},${Et},${Et},${Wt}\\)$`), il = new RegExp(`^rgba\\(${Oe},${Oe},${Oe},${Wt}\\)$`), sl = new RegExp(`^hsl\\(${Wt},${Oe},${Oe}\\)$`), rl = new RegExp(`^hsla\\(${Wt},${Oe},${Oe},${Wt}\\)$`), Go = {
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
To(tn, Ut, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Jo,
  // Deprecated! Use color.formatHex.
  formatHex: Jo,
  formatHex8: al,
  formatHsl: ll,
  formatRgb: Qo,
  toString: Qo
});
function Jo() {
  return this.rgb().formatHex();
}
function al() {
  return this.rgb().formatHex8();
}
function ll() {
  return us(this).formatHsl();
}
function Qo() {
  return this.rgb().formatRgb();
}
function Ut(e) {
  var t, n;
  return e = (e + "").trim().toLowerCase(), (t = el.exec(e)) ? (n = t[1].length, t = parseInt(t[1], 16), n === 6 ? ei(t) : n === 3 ? new Se(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : n === 8 ? an(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : n === 4 ? an(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = tl.exec(e)) ? new Se(t[1], t[2], t[3], 1) : (t = nl.exec(e)) ? new Se(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = ol.exec(e)) ? an(t[1], t[2], t[3], t[4]) : (t = il.exec(e)) ? an(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = sl.exec(e)) ? oi(t[1], t[2] / 100, t[3] / 100, 1) : (t = rl.exec(e)) ? oi(t[1], t[2] / 100, t[3] / 100, t[4]) : Go.hasOwnProperty(e) ? ei(Go[e]) : e === "transparent" ? new Se(NaN, NaN, NaN, 0) : null;
}
function ei(e) {
  return new Se(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function an(e, t, n, o) {
  return o <= 0 && (e = t = n = NaN), new Se(e, t, n, o);
}
function cl(e) {
  return e instanceof tn || (e = Ut(e)), e ? (e = e.rgb(), new Se(e.r, e.g, e.b, e.opacity)) : new Se();
}
function ho(e, t, n, o) {
  return arguments.length === 1 ? cl(e) : new Se(e, t, n, o ?? 1);
}
function Se(e, t, n, o) {
  this.r = +e, this.g = +t, this.b = +n, this.opacity = +o;
}
To(Se, ho, ds(tn, {
  brighter(e) {
    return e = e == null ? Cn : Math.pow(Cn, e), new Se(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Bt : Math.pow(Bt, e), new Se(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Se(ht(this.r), ht(this.g), ht(this.b), Sn(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: ti,
  // Deprecated! Use color.formatHex.
  formatHex: ti,
  formatHex8: dl,
  formatRgb: ni,
  toString: ni
}));
function ti() {
  return `#${ut(this.r)}${ut(this.g)}${ut(this.b)}`;
}
function dl() {
  return `#${ut(this.r)}${ut(this.g)}${ut(this.b)}${ut((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function ni() {
  const e = Sn(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${ht(this.r)}, ${ht(this.g)}, ${ht(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function Sn(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function ht(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function ut(e) {
  return e = ht(e), (e < 16 ? "0" : "") + e.toString(16);
}
function oi(e, t, n, o) {
  return o <= 0 ? e = t = n = NaN : n <= 0 || n >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new De(e, t, n, o);
}
function us(e) {
  if (e instanceof De) return new De(e.h, e.s, e.l, e.opacity);
  if (e instanceof tn || (e = Ut(e)), !e) return new De();
  if (e instanceof De) return e;
  e = e.rgb();
  var t = e.r / 255, n = e.g / 255, o = e.b / 255, i = Math.min(t, n, o), r = Math.max(t, n, o), s = NaN, l = r - i, a = (r + i) / 2;
  return l ? (t === r ? s = (n - o) / l + (n < o) * 6 : n === r ? s = (o - t) / l + 2 : s = (t - n) / l + 4, l /= a < 0.5 ? r + i : 2 - r - i, s *= 60) : l = a > 0 && a < 1 ? 0 : s, new De(s, l, a, e.opacity);
}
function ul(e, t, n, o) {
  return arguments.length === 1 ? us(e) : new De(e, t, n, o ?? 1);
}
function De(e, t, n, o) {
  this.h = +e, this.s = +t, this.l = +n, this.opacity = +o;
}
To(De, ul, ds(tn, {
  brighter(e) {
    return e = e == null ? Cn : Math.pow(Cn, e), new De(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Bt : Math.pow(Bt, e), new De(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, n = this.l, o = n + (n < 0.5 ? n : 1 - n) * t, i = 2 * n - o;
    return new Se(
      Zn(e >= 240 ? e - 240 : e + 120, i, o),
      Zn(e, i, o),
      Zn(e < 120 ? e + 240 : e - 120, i, o),
      this.opacity
    );
  },
  clamp() {
    return new De(ii(this.h), ln(this.s), ln(this.l), Sn(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = Sn(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${ii(this.h)}, ${ln(this.s) * 100}%, ${ln(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function ii(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function ln(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function Zn(e, t, n) {
  return (e < 60 ? t + (n - t) * e / 60 : e < 180 ? n : e < 240 ? t + (n - t) * (240 - e) / 60 : t) * 255;
}
const fs = (e) => () => e;
function fl(e, t) {
  return function(n) {
    return e + n * t;
  };
}
function hl(e, t, n) {
  return e = Math.pow(e, n), t = Math.pow(t, n) - e, n = 1 / n, function(o) {
    return Math.pow(e + o * t, n);
  };
}
function gl(e) {
  return (e = +e) == 1 ? hs : function(t, n) {
    return n - t ? hl(t, n, e) : fs(isNaN(t) ? n : t);
  };
}
function hs(e, t) {
  var n = t - e;
  return n ? fl(e, n) : fs(isNaN(e) ? t : e);
}
const go = (function e(t) {
  var n = gl(t);
  function o(i, r) {
    var s = n((i = ho(i)).r, (r = ho(r)).r), l = n(i.g, r.g), a = n(i.b, r.b), c = hs(i.opacity, r.opacity);
    return function(u) {
      return i.r = s(u), i.g = l(u), i.b = a(u), i.opacity = c(u), i + "";
    };
  }
  return o.gamma = e, o;
})(1);
function Qe(e, t) {
  return e = +e, t = +t, function(n) {
    return e * (1 - n) + t * n;
  };
}
var po = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Kn = new RegExp(po.source, "g");
function pl(e) {
  return function() {
    return e;
  };
}
function ml(e) {
  return function(t) {
    return e(t) + "";
  };
}
function yl(e, t) {
  var n = po.lastIndex = Kn.lastIndex = 0, o, i, r, s = -1, l = [], a = [];
  for (e = e + "", t = t + ""; (o = po.exec(e)) && (i = Kn.exec(t)); )
    (r = i.index) > n && (r = t.slice(n, r), l[s] ? l[s] += r : l[++s] = r), (o = o[0]) === (i = i[0]) ? l[s] ? l[s] += i : l[++s] = i : (l[++s] = null, a.push({ i: s, x: Qe(o, i) })), n = Kn.lastIndex;
  return n < t.length && (r = t.slice(n), l[s] ? l[s] += r : l[++s] = r), l.length < 2 ? a[0] ? ml(a[0].x) : pl(t) : (t = a.length, function(c) {
    for (var u = 0, h; u < t; ++u) l[(h = a[u]).i] = h.x(c);
    return l.join("");
  });
}
var si = 180 / Math.PI, mo = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function gs(e, t, n, o, i, r) {
  var s, l, a;
  return (s = Math.sqrt(e * e + t * t)) && (e /= s, t /= s), (a = e * n + t * o) && (n -= e * a, o -= t * a), (l = Math.sqrt(n * n + o * o)) && (n /= l, o /= l, a /= l), e * o < t * n && (e = -e, t = -t, a = -a, s = -s), {
    translateX: i,
    translateY: r,
    rotate: Math.atan2(t, e) * si,
    skewX: Math.atan(a) * si,
    scaleX: s,
    scaleY: l
  };
}
var cn;
function wl(e) {
  const t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
  return t.isIdentity ? mo : gs(t.a, t.b, t.c, t.d, t.e, t.f);
}
function vl(e) {
  return e == null || (cn || (cn = document.createElementNS("http://www.w3.org/2000/svg", "g")), cn.setAttribute("transform", e), !(e = cn.transform.baseVal.consolidate())) ? mo : (e = e.matrix, gs(e.a, e.b, e.c, e.d, e.e, e.f));
}
function ps(e, t, n, o) {
  function i(c) {
    return c.length ? c.pop() + " " : "";
  }
  function r(c, u, h, d, f, g) {
    if (c !== h || u !== d) {
      var m = f.push("translate(", null, t, null, n);
      g.push({ i: m - 4, x: Qe(c, h) }, { i: m - 2, x: Qe(u, d) });
    } else (h || d) && f.push("translate(" + h + t + d + n);
  }
  function s(c, u, h, d) {
    c !== u ? (c - u > 180 ? u += 360 : u - c > 180 && (c += 360), d.push({ i: h.push(i(h) + "rotate(", null, o) - 2, x: Qe(c, u) })) : u && h.push(i(h) + "rotate(" + u + o);
  }
  function l(c, u, h, d) {
    c !== u ? d.push({ i: h.push(i(h) + "skewX(", null, o) - 2, x: Qe(c, u) }) : u && h.push(i(h) + "skewX(" + u + o);
  }
  function a(c, u, h, d, f, g) {
    if (c !== h || u !== d) {
      var m = f.push(i(f) + "scale(", null, ",", null, ")");
      g.push({ i: m - 4, x: Qe(c, h) }, { i: m - 2, x: Qe(u, d) });
    } else (h !== 1 || d !== 1) && f.push(i(f) + "scale(" + h + "," + d + ")");
  }
  return function(c, u) {
    var h = [], d = [];
    return c = e(c), u = e(u), r(c.translateX, c.translateY, u.translateX, u.translateY, h, d), s(c.rotate, u.rotate, h, d), l(c.skewX, u.skewX, h, d), a(c.scaleX, c.scaleY, u.scaleX, u.scaleY, h, d), c = u = null, function(f) {
      for (var g = -1, m = d.length, w; ++g < m; ) h[(w = d[g]).i] = w.x(f);
      return h.join("");
    };
  };
}
var _l = ps(wl, "px, ", "px)", "deg)"), bl = ps(vl, ", ", ")", ")"), xl = 1e-12;
function ri(e) {
  return ((e = Math.exp(e)) + 1 / e) / 2;
}
function El(e) {
  return ((e = Math.exp(e)) - 1 / e) / 2;
}
function Cl(e) {
  return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
const Sl = (function e(t, n, o) {
  function i(r, s) {
    var l = r[0], a = r[1], c = r[2], u = s[0], h = s[1], d = s[2], f = u - l, g = h - a, m = f * f + g * g, w, y;
    if (m < xl)
      y = Math.log(d / c) / t, w = function(A) {
        return [
          l + A * f,
          a + A * g,
          c * Math.exp(t * A * y)
        ];
      };
    else {
      var M = Math.sqrt(m), L = (d * d - c * c + o * m) / (2 * c * n * M), b = (d * d - c * c - o * m) / (2 * d * n * M), D = Math.log(Math.sqrt(L * L + 1) - L), k = Math.log(Math.sqrt(b * b + 1) - b);
      y = (k - D) / t, w = function(A) {
        var _ = A * y, S = ri(D), $ = c / (n * M) * (S * Cl(t * _ + D) - El(D));
        return [
          l + $ * f,
          a + $ * g,
          c * S / ri(t * _ + D)
        ];
      };
    }
    return w.duration = y * 1e3 * t / Math.SQRT2, w;
  }
  return i.rho = function(r) {
    var s = Math.max(1e-3, +r), l = s * s, a = l * l;
    return e(s, l, a);
  }, i;
})(Math.SQRT2, 2, 4);
var Mt = 0, Ft = 0, At = 0, ms = 1e3, Ln, Ot, Mn = 0, pt = 0, Yn = 0, jt = typeof performance == "object" && performance.now ? performance : Date, ys = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
  setTimeout(e, 17);
};
function Io() {
  return pt || (ys(Ll), pt = jt.now() + Yn);
}
function Ll() {
  pt = 0;
}
function Pn() {
  this._call = this._time = this._next = null;
}
Pn.prototype = ws.prototype = {
  constructor: Pn,
  restart: function(e, t, n) {
    if (typeof e != "function") throw new TypeError("callback is not a function");
    n = (n == null ? Io() : +n) + (t == null ? 0 : +t), !this._next && Ot !== this && (Ot ? Ot._next = this : Ln = this, Ot = this), this._call = e, this._time = n, yo();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, yo());
  }
};
function ws(e, t, n) {
  var o = new Pn();
  return o.restart(e, t, n), o;
}
function Ml() {
  Io(), ++Mt;
  for (var e = Ln, t; e; )
    (t = pt - e._time) >= 0 && e._call.call(void 0, t), e = e._next;
  --Mt;
}
function ai() {
  pt = (Mn = jt.now()) + Yn, Mt = Ft = 0;
  try {
    Ml();
  } finally {
    Mt = 0, kl(), pt = 0;
  }
}
function Pl() {
  var e = jt.now(), t = e - Mn;
  t > ms && (Yn -= t, Mn = e);
}
function kl() {
  for (var e, t = Ln, n, o = 1 / 0; t; )
    t._call ? (o > t._time && (o = t._time), e = t, t = t._next) : (n = t._next, t._next = null, t = e ? e._next = n : Ln = n);
  Ot = e, yo(o);
}
function yo(e) {
  if (!Mt) {
    Ft && (Ft = clearTimeout(Ft));
    var t = e - pt;
    t > 24 ? (e < 1 / 0 && (Ft = setTimeout(ai, e - jt.now() - Yn)), At && (At = clearInterval(At))) : (At || (Mn = jt.now(), At = setInterval(Pl, ms)), Mt = 1, ys(ai));
  }
}
function li(e, t, n) {
  var o = new Pn();
  return t = t == null ? 0 : +t, o.restart((i) => {
    o.stop(), e(i + t);
  }, t, n), o;
}
var Nl = Vn("start", "end", "cancel", "interrupt"), Tl = [], vs = 0, ci = 1, wo = 2, wn = 3, di = 4, vo = 5, vn = 6;
function qn(e, t, n, o, i, r) {
  var s = e.__transition;
  if (!s) e.__transition = {};
  else if (n in s) return;
  Il(e, n, {
    name: t,
    index: o,
    // For context during callback.
    group: i,
    // For context during callback.
    on: Nl,
    tween: Tl,
    time: r.time,
    delay: r.delay,
    duration: r.duration,
    ease: r.ease,
    timer: null,
    state: vs
  });
}
function $o(e, t) {
  var n = He(e, t);
  if (n.state > vs) throw new Error("too late; already scheduled");
  return n;
}
function Ve(e, t) {
  var n = He(e, t);
  if (n.state > wn) throw new Error("too late; already running");
  return n;
}
function He(e, t) {
  var n = e.__transition;
  if (!n || !(n = n[t])) throw new Error("transition not found");
  return n;
}
function Il(e, t, n) {
  var o = e.__transition, i;
  o[t] = n, n.timer = ws(r, 0, n.time);
  function r(c) {
    n.state = ci, n.timer.restart(s, n.delay, n.time), n.delay <= c && s(c - n.delay);
  }
  function s(c) {
    var u, h, d, f;
    if (n.state !== ci) return a();
    for (u in o)
      if (f = o[u], f.name === n.name) {
        if (f.state === wn) return li(s);
        f.state === di ? (f.state = vn, f.timer.stop(), f.on.call("interrupt", e, e.__data__, f.index, f.group), delete o[u]) : +u < t && (f.state = vn, f.timer.stop(), f.on.call("cancel", e, e.__data__, f.index, f.group), delete o[u]);
      }
    if (li(function() {
      n.state === wn && (n.state = di, n.timer.restart(l, n.delay, n.time), l(c));
    }), n.state = wo, n.on.call("start", e, e.__data__, n.index, n.group), n.state === wo) {
      for (n.state = wn, i = new Array(d = n.tween.length), u = 0, h = -1; u < d; ++u)
        (f = n.tween[u].value.call(e, e.__data__, n.index, n.group)) && (i[++h] = f);
      i.length = h + 1;
    }
  }
  function l(c) {
    for (var u = c < n.duration ? n.ease.call(null, c / n.duration) : (n.timer.restart(a), n.state = vo, 1), h = -1, d = i.length; ++h < d; )
      i[h].call(e, u);
    n.state === vo && (n.on.call("end", e, e.__data__, n.index, n.group), a());
  }
  function a() {
    n.state = vn, n.timer.stop(), delete o[t];
    for (var c in o) return;
    delete e.__transition;
  }
}
function _n(e, t) {
  var n = e.__transition, o, i, r = !0, s;
  if (n) {
    t = t == null ? null : t + "";
    for (s in n) {
      if ((o = n[s]).name !== t) {
        r = !1;
        continue;
      }
      i = o.state > wo && o.state < vo, o.state = vn, o.timer.stop(), o.on.call(i ? "interrupt" : "cancel", e, e.__data__, o.index, o.group), delete n[s];
    }
    r && delete e.__transition;
  }
}
function $l(e) {
  return this.each(function() {
    _n(this, e);
  });
}
function Al(e, t) {
  var n, o;
  return function() {
    var i = Ve(this, e), r = i.tween;
    if (r !== n) {
      o = n = r;
      for (var s = 0, l = o.length; s < l; ++s)
        if (o[s].name === t) {
          o = o.slice(), o.splice(s, 1);
          break;
        }
    }
    i.tween = o;
  };
}
function Dl(e, t, n) {
  var o, i;
  if (typeof n != "function") throw new Error();
  return function() {
    var r = Ve(this, e), s = r.tween;
    if (s !== o) {
      i = (o = s).slice();
      for (var l = { name: t, value: n }, a = 0, c = i.length; a < c; ++a)
        if (i[a].name === t) {
          i[a] = l;
          break;
        }
      a === c && i.push(l);
    }
    r.tween = i;
  };
}
function Hl(e, t) {
  var n = this._id;
  if (e += "", arguments.length < 2) {
    for (var o = He(this.node(), n).tween, i = 0, r = o.length, s; i < r; ++i)
      if ((s = o[i]).name === e)
        return s.value;
    return null;
  }
  return this.each((t == null ? Al : Dl)(n, e, t));
}
function Ao(e, t, n) {
  var o = e._id;
  return e.each(function() {
    var i = Ve(this, o);
    (i.value || (i.value = {}))[t] = n.apply(this, arguments);
  }), function(i) {
    return He(i, o).value[t];
  };
}
function _s(e, t) {
  var n;
  return (typeof t == "number" ? Qe : t instanceof Ut ? go : (n = Ut(t)) ? (t = n, go) : yl)(e, t);
}
function Rl(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function zl(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function Fl(e, t, n) {
  var o, i = n + "", r;
  return function() {
    var s = this.getAttribute(e);
    return s === i ? null : s === o ? r : r = t(o = s, n);
  };
}
function Ol(e, t, n) {
  var o, i = n + "", r;
  return function() {
    var s = this.getAttributeNS(e.space, e.local);
    return s === i ? null : s === o ? r : r = t(o = s, n);
  };
}
function Vl(e, t, n) {
  var o, i, r;
  return function() {
    var s, l = n(this), a;
    return l == null ? void this.removeAttribute(e) : (s = this.getAttribute(e), a = l + "", s === a ? null : s === o && a === i ? r : (i = a, r = t(o = s, l)));
  };
}
function Xl(e, t, n) {
  var o, i, r;
  return function() {
    var s, l = n(this), a;
    return l == null ? void this.removeAttributeNS(e.space, e.local) : (s = this.getAttributeNS(e.space, e.local), a = l + "", s === a ? null : s === o && a === i ? r : (i = a, r = t(o = s, l)));
  };
}
function Yl(e, t) {
  var n = Xn(e), o = n === "transform" ? bl : _s;
  return this.attrTween(e, typeof t == "function" ? (n.local ? Xl : Vl)(n, o, Ao(this, "attr." + e, t)) : t == null ? (n.local ? zl : Rl)(n) : (n.local ? Ol : Fl)(n, o, t));
}
function ql(e, t) {
  return function(n) {
    this.setAttribute(e, t.call(this, n));
  };
}
function Bl(e, t) {
  return function(n) {
    this.setAttributeNS(e.space, e.local, t.call(this, n));
  };
}
function Wl(e, t) {
  var n, o;
  function i() {
    var r = t.apply(this, arguments);
    return r !== o && (n = (o = r) && Bl(e, r)), n;
  }
  return i._value = t, i;
}
function Ul(e, t) {
  var n, o;
  function i() {
    var r = t.apply(this, arguments);
    return r !== o && (n = (o = r) && ql(e, r)), n;
  }
  return i._value = t, i;
}
function jl(e, t) {
  var n = "attr." + e;
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (t == null) return this.tween(n, null);
  if (typeof t != "function") throw new Error();
  var o = Xn(e);
  return this.tween(n, (o.local ? Wl : Ul)(o, t));
}
function Zl(e, t) {
  return function() {
    $o(this, e).delay = +t.apply(this, arguments);
  };
}
function Kl(e, t) {
  return t = +t, function() {
    $o(this, e).delay = t;
  };
}
function Gl(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? Zl : Kl)(t, e)) : He(this.node(), t).delay;
}
function Jl(e, t) {
  return function() {
    Ve(this, e).duration = +t.apply(this, arguments);
  };
}
function Ql(e, t) {
  return t = +t, function() {
    Ve(this, e).duration = t;
  };
}
function ec(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? Jl : Ql)(t, e)) : He(this.node(), t).duration;
}
function tc(e, t) {
  if (typeof t != "function") throw new Error();
  return function() {
    Ve(this, e).ease = t;
  };
}
function nc(e) {
  var t = this._id;
  return arguments.length ? this.each(tc(t, e)) : He(this.node(), t).ease;
}
function oc(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    if (typeof n != "function") throw new Error();
    Ve(this, e).ease = n;
  };
}
function ic(e) {
  if (typeof e != "function") throw new Error();
  return this.each(oc(this._id, e));
}
function sc(e) {
  typeof e != "function" && (e = Ji(e));
  for (var t = this._groups, n = t.length, o = new Array(n), i = 0; i < n; ++i)
    for (var r = t[i], s = r.length, l = o[i] = [], a, c = 0; c < s; ++c)
      (a = r[c]) && e.call(a, a.__data__, c, r) && l.push(a);
  return new je(o, this._parents, this._name, this._id);
}
function rc(e) {
  if (e._id !== this._id) throw new Error();
  for (var t = this._groups, n = e._groups, o = t.length, i = n.length, r = Math.min(o, i), s = new Array(o), l = 0; l < r; ++l)
    for (var a = t[l], c = n[l], u = a.length, h = s[l] = new Array(u), d, f = 0; f < u; ++f)
      (d = a[f] || c[f]) && (h[f] = d);
  for (; l < o; ++l)
    s[l] = t[l];
  return new je(s, this._parents, this._name, this._id);
}
function ac(e) {
  return (e + "").trim().split(/^|\s+/).every(function(t) {
    var n = t.indexOf(".");
    return n >= 0 && (t = t.slice(0, n)), !t || t === "start";
  });
}
function lc(e, t, n) {
  var o, i, r = ac(t) ? $o : Ve;
  return function() {
    var s = r(this, e), l = s.on;
    l !== o && (i = (o = l).copy()).on(t, n), s.on = i;
  };
}
function cc(e, t) {
  var n = this._id;
  return arguments.length < 2 ? He(this.node(), n).on.on(e) : this.each(lc(n, e, t));
}
function dc(e) {
  return function() {
    var t = this.parentNode;
    for (var n in this.__transition) if (+n !== e) return;
    t && t.removeChild(this);
  };
}
function uc() {
  return this.on("end.remove", dc(this._id));
}
function fc(e) {
  var t = this._name, n = this._id;
  typeof e != "function" && (e = ko(e));
  for (var o = this._groups, i = o.length, r = new Array(i), s = 0; s < i; ++s)
    for (var l = o[s], a = l.length, c = r[s] = new Array(a), u, h, d = 0; d < a; ++d)
      (u = l[d]) && (h = e.call(u, u.__data__, d, l)) && ("__data__" in u && (h.__data__ = u.__data__), c[d] = h, qn(c[d], t, n, d, c, He(u, n)));
  return new je(r, this._parents, t, n);
}
function hc(e) {
  var t = this._name, n = this._id;
  typeof e != "function" && (e = Gi(e));
  for (var o = this._groups, i = o.length, r = [], s = [], l = 0; l < i; ++l)
    for (var a = o[l], c = a.length, u, h = 0; h < c; ++h)
      if (u = a[h]) {
        for (var d = e.call(u, u.__data__, h, a), f, g = He(u, n), m = 0, w = d.length; m < w; ++m)
          (f = d[m]) && qn(f, t, n, m, d, g);
        r.push(d), s.push(u);
      }
  return new je(r, s, t, n);
}
var gc = en.prototype.constructor;
function pc() {
  return new gc(this._groups, this._parents);
}
function mc(e, t) {
  var n, o, i;
  return function() {
    var r = Lt(this, e), s = (this.style.removeProperty(e), Lt(this, e));
    return r === s ? null : r === n && s === o ? i : i = t(n = r, o = s);
  };
}
function bs(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function yc(e, t, n) {
  var o, i = n + "", r;
  return function() {
    var s = Lt(this, e);
    return s === i ? null : s === o ? r : r = t(o = s, n);
  };
}
function wc(e, t, n) {
  var o, i, r;
  return function() {
    var s = Lt(this, e), l = n(this), a = l + "";
    return l == null && (a = l = (this.style.removeProperty(e), Lt(this, e))), s === a ? null : s === o && a === i ? r : (i = a, r = t(o = s, l));
  };
}
function vc(e, t) {
  var n, o, i, r = "style." + t, s = "end." + r, l;
  return function() {
    var a = Ve(this, e), c = a.on, u = a.value[r] == null ? l || (l = bs(t)) : void 0;
    (c !== n || i !== u) && (o = (n = c).copy()).on(s, i = u), a.on = o;
  };
}
function _c(e, t, n) {
  var o = (e += "") == "transform" ? _l : _s;
  return t == null ? this.styleTween(e, mc(e, o)).on("end.style." + e, bs(e)) : typeof t == "function" ? this.styleTween(e, wc(e, o, Ao(this, "style." + e, t))).each(vc(this._id, e)) : this.styleTween(e, yc(e, o, t), n).on("end.style." + e, null);
}
function bc(e, t, n) {
  return function(o) {
    this.style.setProperty(e, t.call(this, o), n);
  };
}
function xc(e, t, n) {
  var o, i;
  function r() {
    var s = t.apply(this, arguments);
    return s !== i && (o = (i = s) && bc(e, s, n)), o;
  }
  return r._value = t, r;
}
function Ec(e, t, n) {
  var o = "style." + (e += "");
  if (arguments.length < 2) return (o = this.tween(o)) && o._value;
  if (t == null) return this.tween(o, null);
  if (typeof t != "function") throw new Error();
  return this.tween(o, xc(e, t, n ?? ""));
}
function Cc(e) {
  return function() {
    this.textContent = e;
  };
}
function Sc(e) {
  return function() {
    var t = e(this);
    this.textContent = t ?? "";
  };
}
function Lc(e) {
  return this.tween("text", typeof e == "function" ? Sc(Ao(this, "text", e)) : Cc(e == null ? "" : e + ""));
}
function Mc(e) {
  return function(t) {
    this.textContent = e.call(this, t);
  };
}
function Pc(e) {
  var t, n;
  function o() {
    var i = e.apply(this, arguments);
    return i !== n && (t = (n = i) && Mc(i)), t;
  }
  return o._value = e, o;
}
function kc(e) {
  var t = "text";
  if (arguments.length < 1) return (t = this.tween(t)) && t._value;
  if (e == null) return this.tween(t, null);
  if (typeof e != "function") throw new Error();
  return this.tween(t, Pc(e));
}
function Nc() {
  for (var e = this._name, t = this._id, n = xs(), o = this._groups, i = o.length, r = 0; r < i; ++r)
    for (var s = o[r], l = s.length, a, c = 0; c < l; ++c)
      if (a = s[c]) {
        var u = He(a, t);
        qn(a, e, n, c, s, {
          time: u.time + u.delay + u.duration,
          delay: 0,
          duration: u.duration,
          ease: u.ease
        });
      }
  return new je(o, this._parents, e, n);
}
function Tc() {
  var e, t, n = this, o = n._id, i = n.size();
  return new Promise(function(r, s) {
    var l = { value: s }, a = { value: function() {
      --i === 0 && r();
    } };
    n.each(function() {
      var c = Ve(this, o), u = c.on;
      u !== e && (t = (e = u).copy(), t._.cancel.push(l), t._.interrupt.push(l), t._.end.push(a)), c.on = t;
    }), i === 0 && r();
  });
}
var Ic = 0;
function je(e, t, n, o) {
  this._groups = e, this._parents = t, this._name = n, this._id = o;
}
function xs() {
  return ++Ic;
}
var Ye = en.prototype;
je.prototype = {
  constructor: je,
  select: fc,
  selectAll: hc,
  selectChild: Ye.selectChild,
  selectChildren: Ye.selectChildren,
  filter: sc,
  merge: rc,
  selection: pc,
  transition: Nc,
  call: Ye.call,
  nodes: Ye.nodes,
  node: Ye.node,
  size: Ye.size,
  empty: Ye.empty,
  each: Ye.each,
  on: cc,
  attr: Yl,
  attrTween: jl,
  style: _c,
  styleTween: Ec,
  text: Lc,
  textTween: kc,
  remove: uc,
  tween: Hl,
  delay: Gl,
  duration: ec,
  ease: nc,
  easeVarying: ic,
  end: Tc,
  [Symbol.iterator]: Ye[Symbol.iterator]
};
const $c = (e) => +e;
function Ac(e) {
  return e * e;
}
function Dc(e) {
  return e * (2 - e);
}
function Hc(e) {
  return ((e *= 2) <= 1 ? e * e : --e * (2 - e) + 1) / 2;
}
function Rc(e) {
  return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
function kn(e) {
  return (Math.pow(2, -10 * e) - 9765625e-10) * 1.0009775171065494;
}
var _o = 4 / 11, zc = 6 / 11, Fc = 8 / 11, Oc = 3 / 4, Vc = 9 / 11, Xc = 10 / 11, Yc = 15 / 16, qc = 21 / 22, Bc = 63 / 64, dn = 1 / _o / _o;
function Wc(e) {
  return (e = +e) < _o ? dn * e * e : e < Fc ? dn * (e -= zc) * e + Oc : e < Xc ? dn * (e -= Vc) * e + Yc : dn * (e -= qc) * e + Bc;
}
var Do = 1.70158;
(function e(t) {
  t = +t;
  function n(o) {
    return (o = +o) * o * (t * (o - 1) + o);
  }
  return n.overshoot = e, n;
})(Do);
(function e(t) {
  t = +t;
  function n(o) {
    return --o * o * ((o + 1) * t + o) + 1;
  }
  return n.overshoot = e, n;
})(Do);
var Uc = (function e(t) {
  t = +t;
  function n(o) {
    return ((o *= 2) < 1 ? o * o * ((t + 1) * o - t) : (o -= 2) * o * ((t + 1) * o + t) + 2) / 2;
  }
  return n.overshoot = e, n;
})(Do), Pt = 2 * Math.PI, Ho = 1, Ro = 0.3;
(function e(t, n) {
  var o = Math.asin(1 / (t = Math.max(1, t))) * (n /= Pt);
  function i(r) {
    return t * kn(- --r) * Math.sin((o - r) / n);
  }
  return i.amplitude = function(r) {
    return e(r, n * Pt);
  }, i.period = function(r) {
    return e(t, r);
  }, i;
})(Ho, Ro);
var jc = (function e(t, n) {
  var o = Math.asin(1 / (t = Math.max(1, t))) * (n /= Pt);
  function i(r) {
    return 1 - t * kn(r = +r) * Math.sin((r + o) / n);
  }
  return i.amplitude = function(r) {
    return e(r, n * Pt);
  }, i.period = function(r) {
    return e(t, r);
  }, i;
})(Ho, Ro);
(function e(t, n) {
  var o = Math.asin(1 / (t = Math.max(1, t))) * (n /= Pt);
  function i(r) {
    return ((r = r * 2 - 1) < 0 ? t * kn(-r) * Math.sin((o - r) / n) : 2 - t * kn(r) * Math.sin((o + r) / n)) / 2;
  }
  return i.amplitude = function(r) {
    return e(r, n * Pt);
  }, i.period = function(r) {
    return e(t, r);
  }, i;
})(Ho, Ro);
var Zc = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: Rc
};
function Kc(e, t) {
  for (var n; !(n = e.__transition) || !(n = n[t]); )
    if (!(e = e.parentNode))
      throw new Error(`transition ${t} not found`);
  return n;
}
function Gc(e) {
  var t, n;
  e instanceof je ? (t = e._id, e = e._name) : (t = xs(), (n = Zc).time = Io(), e = e == null ? null : e + "");
  for (var o = this._groups, i = o.length, r = 0; r < i; ++r)
    for (var s = o[r], l = s.length, a, c = 0; c < l; ++c)
      (a = s[c]) && qn(a, e, t, c, s, n || Kc(a, t));
  return new je(o, this._parents, e, t);
}
en.prototype.interrupt = $l;
en.prototype.transition = Gc;
const un = (e) => () => e;
function Jc(e, {
  sourceEvent: t,
  target: n,
  transform: o,
  dispatch: i
}) {
  Object.defineProperties(this, {
    type: { value: e, enumerable: !0, configurable: !0 },
    sourceEvent: { value: t, enumerable: !0, configurable: !0 },
    target: { value: n, enumerable: !0, configurable: !0 },
    transform: { value: o, enumerable: !0, configurable: !0 },
    _: { value: i }
  });
}
function We(e, t, n) {
  this.k = e, this.x = t, this.y = n;
}
We.prototype = {
  constructor: We,
  scale: function(e) {
    return e === 1 ? this : new We(this.k * e, this.x, this.y);
  },
  translate: function(e, t) {
    return e === 0 & t === 0 ? this : new We(this.k, this.x + this.k * e, this.y + this.k * t);
  },
  apply: function(e) {
    return [e[0] * this.k + this.x, e[1] * this.k + this.y];
  },
  applyX: function(e) {
    return e * this.k + this.x;
  },
  applyY: function(e) {
    return e * this.k + this.y;
  },
  invert: function(e) {
    return [(e[0] - this.x) / this.k, (e[1] - this.y) / this.k];
  },
  invertX: function(e) {
    return (e - this.x) / this.k;
  },
  invertY: function(e) {
    return (e - this.y) / this.k;
  },
  rescaleX: function(e) {
    return e.copy().domain(e.range().map(this.invertX, this).map(e.invert, e));
  },
  rescaleY: function(e) {
    return e.copy().domain(e.range().map(this.invertY, this).map(e.invert, e));
  },
  toString: function() {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  }
};
var Nn = new We(1, 0, 0);
We.prototype;
function Gn(e) {
  e.stopImmediatePropagation();
}
function Dt(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function Qc(e) {
  return (!e.ctrlKey || e.type === "wheel") && !e.button;
}
function ed() {
  var e = this;
  return e instanceof SVGElement ? (e = e.ownerSVGElement || e, e.hasAttribute("viewBox") ? (e = e.viewBox.baseVal, [[e.x, e.y], [e.x + e.width, e.y + e.height]]) : [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]]) : [[0, 0], [e.clientWidth, e.clientHeight]];
}
function ui() {
  return this.__zoom || Nn;
}
function td(e) {
  return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) * (e.ctrlKey ? 10 : 1);
}
function nd() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function od(e, t, n) {
  var o = e.invertX(t[0][0]) - n[0][0], i = e.invertX(t[1][0]) - n[1][0], r = e.invertY(t[0][1]) - n[0][1], s = e.invertY(t[1][1]) - n[1][1];
  return e.translate(
    i > o ? (o + i) / 2 : Math.min(0, o) || Math.max(0, i),
    s > r ? (r + s) / 2 : Math.min(0, r) || Math.max(0, s)
  );
}
function id() {
  var e = Qc, t = ed, n = od, o = td, i = nd, r = [0, 1 / 0], s = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], l = 250, a = Sl, c = Vn("start", "zoom", "end"), u, h, d, f = 500, g = 150, m = 0, w = 10;
  function y(E) {
    E.property("__zoom", ui).on("wheel.zoom", _, { passive: !1 }).on("mousedown.zoom", S).on("dblclick.zoom", $).filter(i).on("touchstart.zoom", v).on("touchmove.zoom", p).on("touchend.zoom touchcancel.zoom", H).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  y.transform = function(E, N, P, z) {
    var x = E.selection ? E.selection() : E;
    x.property("__zoom", ui), E !== x ? D(E, N, P, z) : x.interrupt().each(function() {
      k(this, arguments).event(z).start().zoom(null, typeof N == "function" ? N.apply(this, arguments) : N).end();
    });
  }, y.scaleBy = function(E, N, P, z) {
    y.scaleTo(E, function() {
      var x = this.__zoom.k, C = typeof N == "function" ? N.apply(this, arguments) : N;
      return x * C;
    }, P, z);
  }, y.scaleTo = function(E, N, P, z) {
    y.transform(E, function() {
      var x = t.apply(this, arguments), C = this.__zoom, T = P == null ? b(x) : typeof P == "function" ? P.apply(this, arguments) : P, U = C.invert(T), J = typeof N == "function" ? N.apply(this, arguments) : N;
      return n(L(M(C, J), T, U), x, s);
    }, P, z);
  }, y.translateBy = function(E, N, P, z) {
    y.transform(E, function() {
      return n(this.__zoom.translate(
        typeof N == "function" ? N.apply(this, arguments) : N,
        typeof P == "function" ? P.apply(this, arguments) : P
      ), t.apply(this, arguments), s);
    }, null, z);
  }, y.translateTo = function(E, N, P, z, x) {
    y.transform(E, function() {
      var C = t.apply(this, arguments), T = this.__zoom, U = z == null ? b(C) : typeof z == "function" ? z.apply(this, arguments) : z;
      return n(Nn.translate(U[0], U[1]).scale(T.k).translate(
        typeof N == "function" ? -N.apply(this, arguments) : -N,
        typeof P == "function" ? -P.apply(this, arguments) : -P
      ), C, s);
    }, z, x);
  };
  function M(E, N) {
    return N = Math.max(r[0], Math.min(r[1], N)), N === E.k ? E : new We(N, E.x, E.y);
  }
  function L(E, N, P) {
    var z = N[0] - P[0] * E.k, x = N[1] - P[1] * E.k;
    return z === E.x && x === E.y ? E : new We(E.k, z, x);
  }
  function b(E) {
    return [(+E[0][0] + +E[1][0]) / 2, (+E[0][1] + +E[1][1]) / 2];
  }
  function D(E, N, P, z) {
    E.on("start.zoom", function() {
      k(this, arguments).event(z).start();
    }).on("interrupt.zoom end.zoom", function() {
      k(this, arguments).event(z).end();
    }).tween("zoom", function() {
      var x = this, C = arguments, T = k(x, C).event(z), U = t.apply(x, C), J = P == null ? b(U) : typeof P == "function" ? P.apply(x, C) : P, oe = Math.max(U[1][0] - U[0][0], U[1][1] - U[0][1]), G = x.__zoom, se = typeof N == "function" ? N.apply(x, C) : N, le = a(G.invert(J).concat(oe / G.k), se.invert(J).concat(oe / se.k));
      return function(ce) {
        if (ce === 1) ce = se;
        else {
          var te = le(ce), R = oe / te[2];
          ce = new We(R, J[0] - te[0] * R, J[1] - te[1] * R);
        }
        T.zoom(null, ce);
      };
    });
  }
  function k(E, N, P) {
    return !P && E.__zooming || new A(E, N);
  }
  function A(E, N) {
    this.that = E, this.args = N, this.active = 0, this.sourceEvent = null, this.extent = t.apply(E, N), this.taps = 0;
  }
  A.prototype = {
    event: function(E) {
      return E && (this.sourceEvent = E), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(E, N) {
      return this.mouse && E !== "mouse" && (this.mouse[1] = N.invert(this.mouse[0])), this.touch0 && E !== "touch" && (this.touch0[1] = N.invert(this.touch0[0])), this.touch1 && E !== "touch" && (this.touch1[1] = N.invert(this.touch1[0])), this.that.__zoom = N, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(E) {
      var N = Ae(this.that).datum();
      c.call(
        E,
        this.that,
        new Jc(E, {
          sourceEvent: this.sourceEvent,
          target: y,
          transform: this.that.__zoom,
          dispatch: c
        }),
        N
      );
    }
  };
  function _(E, ...N) {
    if (!e.apply(this, arguments)) return;
    var P = k(this, N).event(E), z = this.__zoom, x = Math.max(r[0], Math.min(r[1], z.k * Math.pow(2, o.apply(this, arguments)))), C = qe(E);
    if (P.wheel)
      (P.mouse[0][0] !== C[0] || P.mouse[0][1] !== C[1]) && (P.mouse[1] = z.invert(P.mouse[0] = C)), clearTimeout(P.wheel);
    else {
      if (z.k === x) return;
      P.mouse = [C, z.invert(C)], _n(this), P.start();
    }
    Dt(E), P.wheel = setTimeout(T, g), P.zoom("mouse", n(L(M(z, x), P.mouse[0], P.mouse[1]), P.extent, s));
    function T() {
      P.wheel = null, P.end();
    }
  }
  function S(E, ...N) {
    if (d || !e.apply(this, arguments)) return;
    var P = E.currentTarget, z = k(this, N, !0).event(E), x = Ae(E.view).on("mousemove.zoom", J, !0).on("mouseup.zoom", oe, !0), C = qe(E, P), T = E.clientX, U = E.clientY;
    ls(E.view), Gn(E), z.mouse = [C, this.__zoom.invert(C)], _n(this), z.start();
    function J(G) {
      if (Dt(G), !z.moved) {
        var se = G.clientX - T, le = G.clientY - U;
        z.moved = se * se + le * le > m;
      }
      z.event(G).zoom("mouse", n(L(z.that.__zoom, z.mouse[0] = qe(G, P), z.mouse[1]), z.extent, s));
    }
    function oe(G) {
      x.on("mousemove.zoom mouseup.zoom", null), cs(G.view, z.moved), Dt(G), z.event(G).end();
    }
  }
  function $(E, ...N) {
    if (e.apply(this, arguments)) {
      var P = this.__zoom, z = qe(E.changedTouches ? E.changedTouches[0] : E, this), x = P.invert(z), C = P.k * (E.shiftKey ? 0.5 : 2), T = n(L(M(P, C), z, x), t.apply(this, N), s);
      Dt(E), l > 0 ? Ae(this).transition().duration(l).call(D, T, z, E) : Ae(this).call(y.transform, T, z, E);
    }
  }
  function v(E, ...N) {
    if (e.apply(this, arguments)) {
      var P = E.touches, z = P.length, x = k(this, N, E.changedTouches.length === z).event(E), C, T, U, J;
      for (Gn(E), T = 0; T < z; ++T)
        U = P[T], J = qe(U, this), J = [J, this.__zoom.invert(J), U.identifier], x.touch0 ? !x.touch1 && x.touch0[2] !== J[2] && (x.touch1 = J, x.taps = 0) : (x.touch0 = J, C = !0, x.taps = 1 + !!u);
      u && (u = clearTimeout(u)), C && (x.taps < 2 && (h = J[0], u = setTimeout(function() {
        u = null;
      }, f)), _n(this), x.start());
    }
  }
  function p(E, ...N) {
    if (this.__zooming) {
      var P = k(this, N).event(E), z = E.changedTouches, x = z.length, C, T, U, J;
      for (Dt(E), C = 0; C < x; ++C)
        T = z[C], U = qe(T, this), P.touch0 && P.touch0[2] === T.identifier ? P.touch0[0] = U : P.touch1 && P.touch1[2] === T.identifier && (P.touch1[0] = U);
      if (T = P.that.__zoom, P.touch1) {
        var oe = P.touch0[0], G = P.touch0[1], se = P.touch1[0], le = P.touch1[1], ce = (ce = se[0] - oe[0]) * ce + (ce = se[1] - oe[1]) * ce, te = (te = le[0] - G[0]) * te + (te = le[1] - G[1]) * te;
        T = M(T, Math.sqrt(ce / te)), U = [(oe[0] + se[0]) / 2, (oe[1] + se[1]) / 2], J = [(G[0] + le[0]) / 2, (G[1] + le[1]) / 2];
      } else if (P.touch0) U = P.touch0[0], J = P.touch0[1];
      else return;
      P.zoom("touch", n(L(T, U, J), P.extent, s));
    }
  }
  function H(E, ...N) {
    if (this.__zooming) {
      var P = k(this, N).event(E), z = E.changedTouches, x = z.length, C, T;
      for (Gn(E), d && clearTimeout(d), d = setTimeout(function() {
        d = null;
      }, f), C = 0; C < x; ++C)
        T = z[C], P.touch0 && P.touch0[2] === T.identifier ? delete P.touch0 : P.touch1 && P.touch1[2] === T.identifier && delete P.touch1;
      if (P.touch1 && !P.touch0 && (P.touch0 = P.touch1, delete P.touch1), P.touch0) P.touch0[1] = this.__zoom.invert(P.touch0[0]);
      else if (P.end(), P.taps === 2 && (T = qe(T, this), Math.hypot(h[0] - T[0], h[1] - T[1]) < w)) {
        var U = Ae(this).on("dblclick.zoom");
        U && U.apply(this, arguments);
      }
    }
  }
  return y.wheelDelta = function(E) {
    return arguments.length ? (o = typeof E == "function" ? E : un(+E), y) : o;
  }, y.filter = function(E) {
    return arguments.length ? (e = typeof E == "function" ? E : un(!!E), y) : e;
  }, y.touchable = function(E) {
    return arguments.length ? (i = typeof E == "function" ? E : un(!!E), y) : i;
  }, y.extent = function(E) {
    return arguments.length ? (t = typeof E == "function" ? E : un([[+E[0][0], +E[0][1]], [+E[1][0], +E[1][1]]]), y) : t;
  }, y.scaleExtent = function(E) {
    return arguments.length ? (r[0] = +E[0], r[1] = +E[1], y) : [r[0], r[1]];
  }, y.translateExtent = function(E) {
    return arguments.length ? (s[0][0] = +E[0][0], s[1][0] = +E[1][0], s[0][1] = +E[0][1], s[1][1] = +E[1][1], y) : [[s[0][0], s[0][1]], [s[1][0], s[1][1]]];
  }, y.constrain = function(E) {
    return arguments.length ? (n = E, y) : n;
  }, y.duration = function(E) {
    return arguments.length ? (l = +E, y) : l;
  }, y.interpolate = function(E) {
    return arguments.length ? (a = E, y) : a;
  }, y.on = function() {
    var E = c.on.apply(c, arguments);
    return E === c ? y : E;
  }, y.clickDistance = function(E) {
    return arguments.length ? (m = (E = +E) * E, y) : Math.sqrt(m);
  }, y.tapDistance = function(E) {
    return arguments.length ? (w = +E, y) : w;
  }, y;
}
function fi(e) {
  const { pannable: t, zoomable: n, isLocked: o, noPanClassName: i, noWheelClassName: r, isTouchSelectionMode: s, isPanKeyHeld: l, panOnDrag: a } = e;
  return (c) => {
    if (o?.() || i && c.target?.closest?.("." + i) || c.type === "wheel" && r && c.target?.closest?.("." + r) || !n && c.type === "wheel") return !1;
    if (c.type === "touchstart") {
      const u = !c.touches || c.touches.length < 2;
      if (s?.() && u || !t && !l?.() && u || !n && !u) return !1;
    }
    if (c.type === "mousedown") {
      if (l?.()) return !0;
      if (!t) return !1;
      if (Array.isArray(a))
        return a.includes(c.button);
      if (a === !1) return !1;
    }
    return !0;
  };
}
function sd(e, t) {
  const {
    onTransformChange: n,
    minZoom: o = 0.5,
    maxZoom: i = 2,
    pannable: r = !0,
    zoomable: s = !0
  } = t, l = Ae(e);
  let a = !1;
  const c = t.panActivationKeyCode !== void 0 ? t.panActivationKeyCode : "Space", u = (A) => {
    c && A.code === c && (a = !0, e.style.cursor = "grab");
  }, h = (A) => {
    c && A.code === c && (a = !1, e.style.cursor = "");
  }, d = () => {
    a = !1, e.style.cursor = "";
  };
  c && (window.addEventListener("keydown", u), window.addEventListener("keyup", h), window.addEventListener("blur", d));
  const f = id().scaleExtent([o, i]).on("start", (A) => {
    if (!A.sourceEvent) return;
    a && (e.style.cursor = "grabbing");
    const { x: _, y: S, k: $ } = A.transform;
    t.onMoveStart?.({ x: _, y: S, zoom: $ });
  }).on("zoom", (A) => {
    const { x: _, y: S, k: $ } = A.transform;
    n({ x: _, y: S, zoom: $ }), A.sourceEvent && t.onMove?.({ x: _, y: S, zoom: $ });
  }).on("end", (A) => {
    if (!A.sourceEvent) return;
    a && (e.style.cursor = "grab");
    const { x: _, y: S, k: $ } = A.transform;
    t.onMoveEnd?.({ x: _, y: S, zoom: $ });
  });
  t.translateExtent && f.translateExtent(t.translateExtent), f.filter(fi({
    pannable: r,
    zoomable: s,
    isLocked: t.isLocked,
    noPanClassName: t.noPanClassName,
    noWheelClassName: t.noWheelClassName,
    isTouchSelectionMode: t.isTouchSelectionMode,
    isPanKeyHeld: () => a,
    panOnDrag: t.panOnDrag
  })), l.call(f), t.zoomOnDoubleClick === !1 && l.on("dblclick.zoom", null);
  let g = t.panOnScroll ?? !1, m = t.panOnScrollDirection ?? "both", w = t.panOnScrollSpeed ?? 1, y = !1;
  const M = t.zoomActivationKeyCode !== void 0 ? t.zoomActivationKeyCode : null, L = (A) => {
    M && A.code === M && (y = !0);
  }, b = (A) => {
    M && A.code === M && (y = !1);
  }, D = () => {
    y = !1;
  };
  M && (window.addEventListener("keydown", L), window.addEventListener("keyup", b), window.addEventListener("blur", D));
  const k = (A) => {
    if (t.isLocked?.()) return;
    const _ = A.ctrlKey || A.metaKey || y;
    if (!(g ? !_ : A.shiftKey)) return;
    A.preventDefault(), A.stopPropagation();
    const $ = w;
    let v = 0, p = 0;
    m !== "horizontal" && (p = -A.deltaY * $), m !== "vertical" && (v = -A.deltaX * $, A.shiftKey && A.deltaX === 0 && m === "both" && (v = -A.deltaY * $, p = 0)), t.onScrollPan?.(v, p);
  };
  return e.addEventListener("wheel", k, { passive: !1, capture: !0 }), {
    setViewport(A, _) {
      const S = _?.duration ?? 0, $ = Nn.translate(A.x ?? 0, A.y ?? 0).scale(A.zoom ?? 1);
      S > 0 ? l.transition().duration(S).call(f.transform, $) : l.call(f.transform, $);
    },
    getTransform() {
      return e.__zoom ?? Nn;
    },
    update(A) {
      if ((A.minZoom !== void 0 || A.maxZoom !== void 0) && f.scaleExtent([
        A.minZoom ?? o,
        A.maxZoom ?? i
      ]), A.pannable !== void 0 || A.zoomable !== void 0) {
        const _ = A.pannable ?? r, S = A.zoomable ?? s;
        f.filter(fi({
          pannable: _,
          zoomable: S,
          isLocked: t.isLocked,
          noPanClassName: t.noPanClassName,
          noWheelClassName: t.noWheelClassName,
          isTouchSelectionMode: t.isTouchSelectionMode,
          isPanKeyHeld: () => a,
          panOnDrag: t.panOnDrag
        }));
      }
      A.panOnScroll !== void 0 && (g = A.panOnScroll), A.panOnScrollDirection !== void 0 && (m = A.panOnScrollDirection), A.panOnScrollSpeed !== void 0 && (w = A.panOnScrollSpeed);
    },
    destroy() {
      e.removeEventListener("wheel", k, { capture: !0 }), c && (window.removeEventListener("keydown", u), window.removeEventListener("keyup", h), window.removeEventListener("blur", d)), M && (window.removeEventListener("keydown", L), window.removeEventListener("keyup", b), window.removeEventListener("blur", D)), l.on(".zoom", null);
    }
  };
}
function Es(e, t, n, o) {
  return {
    x: (e - o.left - n.x) / n.zoom,
    y: (t - o.top - n.y) / n.zoom
  };
}
function rd(e, t, n, o) {
  return {
    x: e * n.zoom + n.x + o.left,
    y: t * n.zoom + n.y + o.top
  };
}
const ye = 150, we = 50;
function Bn(e, t, n, o, i) {
  if (i % 360 === 0) return { x: e, y: t, width: n, height: o };
  const r = i * Math.PI / 180, s = Math.abs(Math.cos(r)), l = Math.abs(Math.sin(r)), a = n * s + o * l, c = n * l + o * s, u = e + n / 2, h = t + o / 2;
  return { x: u - a / 2, y: h - c / 2, width: a, height: c };
}
function kt(e, t) {
  if (e.length === 0)
    return { x: 0, y: 0, width: 0, height: 0 };
  let n = 1 / 0, o = 1 / 0, i = -1 / 0, r = -1 / 0;
  for (const s of e) {
    const l = s.dimensions?.width ?? ye, a = s.dimensions?.height ?? we, c = $t(s, t), u = s.rotation ? Bn(c.x, c.y, l, a, s.rotation) : { x: c.x, y: c.y, width: l, height: a };
    n = Math.min(n, u.x), o = Math.min(o, u.y), i = Math.max(i, u.x + u.width), r = Math.max(r, u.y + u.height);
  }
  return {
    x: n,
    y: o,
    width: i - n,
    height: r - o
  };
}
function ad(e, t, n) {
  const o = t.x + t.width, i = t.y + t.height;
  return e.filter((r) => {
    const s = r.dimensions?.width ?? ye, l = r.dimensions?.height ?? we, a = $t(r, n), c = r.rotation ? Bn(a.x, a.y, s, l, r.rotation) : { x: a.x, y: a.y, width: s, height: l }, u = c.x + c.width, h = c.y + c.height;
    return !(u < t.x || c.x > o || h < t.y || c.y > i);
  });
}
function ld(e, t, n) {
  const o = t.x + t.width, i = t.y + t.height;
  return e.filter((r) => {
    const s = r.dimensions?.width ?? ye, l = r.dimensions?.height ?? we, a = $t(r, n), c = r.rotation ? Bn(a.x, a.y, s, l, r.rotation) : { x: a.x, y: a.y, width: s, height: l };
    return c.x >= t.x && c.y >= t.y && c.x + c.width <= o && c.y + c.height <= i;
  });
}
function Tn(e, t, n, o, i, r = 0.1) {
  const s = Math.max(e.width, 1), l = Math.max(e.height, 1), a = s * (1 + r), c = l * (1 + r), u = t / a, h = n / c, d = Math.min(Math.max(Math.min(u, h), o), i), f = { x: e.x + s / 2, y: e.y + l / 2 }, g = t / 2 - f.x * d, m = n / 2 - f.y * d;
  return { x: g, y: m, zoom: d };
}
function cd(e, t, n, o) {
  const i = 1 / e.zoom;
  return {
    minX: (0 - e.x) * i - o,
    minY: (0 - e.y) * i - o,
    maxX: (t - e.x) * i + o,
    maxY: (n - e.y) * i + o
  };
}
function $t(e, t) {
  if (!e.position) return { x: 0, y: 0 };
  const n = e.nodeOrigin ?? t ?? [0, 0], o = e.dimensions?.width ?? ye, i = e.dimensions?.height ?? we;
  return {
    x: e.position.x - o * n[0],
    y: e.position.y - i * n[1]
  };
}
let Cs = !1;
function Ss(e) {
  Cs = e;
}
function j(e, t, n) {
  if (!Cs) return;
  const o = `%c[AlpineFlow:${e}]`, i = dd(e);
  n !== void 0 ? console.log(o, i, t, n) : console.log(o, i, t);
}
function dd(e) {
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
  }[e] ?? "#94a3b8"}; font-weight: bold`;
}
const Wn = "#64748b", zo = "#d4d4d8", Ls = "#ef4444", ud = "2", fd = "6 3", hi = 1.2, bo = 0.2, bn = 5, gi = 25;
function Jn(e) {
  return JSON.parse(JSON.stringify(e));
}
class hd {
  constructor(t = 50) {
    this.past = [], this.future = [], this._suspendDepth = 0, this.maxSize = t;
  }
  suspend() {
    this._suspendDepth++;
  }
  resume() {
    this._suspendDepth > 0 && this._suspendDepth--;
  }
  capture(t) {
    this._suspendDepth > 0 || (this.past.push(Jn(t)), this.future = [], this.past.length > this.maxSize && this.past.shift());
  }
  undo(t) {
    return this.past.length === 0 ? null : (this.future.push(Jn(t)), this.past.pop());
  }
  redo(t) {
    return this.future.length === 0 ? null : (this.past.push(Jn(t)), this.future.pop());
  }
  get canUndo() {
    return this.past.length > 0;
  }
  get canRedo() {
    return this.future.length > 0;
  }
}
const gd = 16;
function pd() {
  return typeof requestAnimationFrame == "function" ? {
    request: (e) => requestAnimationFrame(e),
    cancel: (e) => cancelAnimationFrame(e)
  } : {
    request: (e) => setTimeout(() => e(performance.now()), gd),
    cancel: (e) => clearTimeout(e)
  };
}
class Ms {
  constructor() {
    this._scheduler = pd(), this._entries = [], this._frameId = null, this._running = !1;
  }
  /** True when the rAF loop is running. */
  get active() {
    return this._running;
  }
  /** Replace the frame scheduler (useful for tests with fake timers). */
  setScheduler(t) {
    this._scheduler = t;
  }
  /**
   * Register a tick callback.
   * @param callback - Called each frame with elapsed ms since activation.
   * @param delay - Optional delay (ms) before first invocation, measured from rAF frames.
   * @returns Handle with a `stop()` method to unregister.
   */
  register(t, n = 0) {
    const o = {
      callback: t,
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
  // ── Internal: loop management ──────────────────────────────────────
  _start() {
    this._running || (this._running = !0, this._scheduleFrame());
  }
  _stop() {
    this._running && (this._running = !1, this._frameId !== null && (this._scheduler.cancel(this._frameId), this._frameId = null));
  }
  _scheduleFrame() {
    this._frameId = this._scheduler.request((t) => {
      this._tick(t);
    });
  }
  _tick(t) {
    const n = this._entries.slice();
    for (const o of n) {
      if (o.removed) continue;
      if (!o.activated) {
        if (t - o.registeredAt < o.delay) continue;
        o.activated = !0, o.startTime = t;
      }
      const i = t - o.startTime;
      o.callback(i) === !0 && (o.removed = !0);
    }
    if (this._entries = this._entries.filter((o) => !o.removed), this._entries.length === 0) {
      this._stop();
      return;
    }
    this._scheduleFrame();
  }
}
const xo = new Ms(), md = {
  linear: $c,
  easeIn: Ac,
  easeOut: Dc,
  easeInOut: Hc,
  easeBounce: Wc,
  easeElastic: jc,
  easeBack: Uc
};
function Ps(e) {
  return typeof e == "function" ? e : md[e ?? "easeInOut"];
}
function nt(e, t, n) {
  return e + (t - e) * n;
}
function Fo(e, t, n) {
  return go(e, t)(n);
}
function Zt(e) {
  if (typeof e != "string")
    return e;
  if (!e.trim())
    return {};
  const t = {};
  for (const n of e.split(";")) {
    const o = n.trim();
    if (!o) continue;
    const i = o.indexOf(":");
    if (i === -1) continue;
    const r = o.slice(0, i).trim(), s = o.slice(i + 1).trim();
    t[r] = s;
  }
  return t;
}
const pi = /^(-?\d+\.?\d*)(px|em|rem|%|vh|vw|pt|cm|mm|in|ex|ch)?$/, mi = /^(#|rgb|hsl)/;
function ks(e, t, n) {
  const o = {}, i = /* @__PURE__ */ new Set([...Object.keys(e), ...Object.keys(t)]);
  for (const r of i) {
    const s = e[r], l = t[r];
    if (s === void 0) {
      o[r] = l;
      continue;
    }
    if (l === void 0) {
      o[r] = s;
      continue;
    }
    const a = pi.exec(s), c = pi.exec(l);
    if (a && c) {
      const u = parseFloat(a[1]), h = parseFloat(c[1]), d = c[2] ?? "", f = nt(u, h, n);
      o[r] = d ? `${f}${d}` : String(f);
      continue;
    }
    if (mi.test(s) && mi.test(l)) {
      o[r] = Fo(s, l, n);
      continue;
    }
    o[r] = n < 0.5 ? s : l;
  }
  return o;
}
function yd(e, t, n, o) {
  let i = nt(e.zoom, t.zoom, n);
  return o?.minZoom !== void 0 && (i = Math.max(i, o.minZoom)), o?.maxZoom !== void 0 && (i = Math.min(i, o.maxZoom)), {
    x: nt(e.x, t.x, n),
    y: nt(e.y, t.y, n),
    zoom: i
  };
}
function yi(e) {
  return typeof e != "string" ? !1 : /^(#|rgb|hsl)/.test(e);
}
function wd(e, t, n) {
  return typeof e == "number" && typeof t == "number" ? nt(e, t, n) : yi(e) && yi(t) ? Fo(e, t, n) : n < 0.5 ? e : t;
}
class vd {
  constructor(t) {
    this._ownership = /* @__PURE__ */ new Map(), this._groups = /* @__PURE__ */ new Set(), this._nextGroupId = 0, this._engine = t;
  }
  /** Whether any animations are currently running. */
  get active() {
    return this._groups.size > 0;
  }
  /**
   * Animate a set of property entries over the given duration.
   *
   * If any entry targets a key already being animated, the current in-flight
   * value is captured as the new "from" and the property is removed from the
   * old group (blend/compose).
   */
  animate(t, n) {
    const {
      duration: o,
      easing: i,
      delay: r = 0,
      loop: s = !1,
      onProgress: l,
      onComplete: a
    } = n, c = Ps(i);
    for (const m of t) {
      const w = this._ownership.get(m.key);
      if (w && !w.stopped) {
        const y = w.currentValues.get(m.key);
        y !== void 0 && (m.from = y), w.entries = w.entries.filter((M) => M.key !== m.key), w.entries.length === 0 && (w.stopped = !0, w.engineHandle.stop(), this._groups.delete(w), w.resolve());
      }
    }
    if (o <= 0) {
      for (const w of t)
        w.apply(w.to);
      const m = {
        pause: () => {
        },
        resume: () => {
        },
        stop: () => {
        },
        reverse: () => {
        },
        finished: Promise.resolve()
      };
      return a?.(), m;
    }
    let u;
    const h = new Promise((m) => {
      u = m;
    }), d = {
      _id: this._nextGroupId++,
      entries: [...t],
      engineHandle: null,
      startTime: 0,
      pausedAt: null,
      reversed: !1,
      duration: o,
      easingFn: c,
      loop: s,
      onProgress: l,
      onComplete: a,
      resolve: u,
      stopped: !1,
      currentValues: /* @__PURE__ */ new Map(),
      _lastElapsed: 0
    };
    for (const m of t)
      d.currentValues.set(m.key, m.from);
    for (const m of t)
      this._ownership.set(m.key, d);
    this._groups.add(d);
    const f = this._engine.register((m) => this._tick(d, m), r);
    return d.engineHandle = f, {
      pause: () => this._pause(d),
      resume: () => this._resume(d),
      stop: () => this._stop(d),
      reverse: () => this._reverse(d),
      finished: h
    };
  }
  /** Stop all active animations. */
  stopAll() {
    for (const t of this._groups)
      if (!t.stopped) {
        t.stopped = !0, t.engineHandle.stop();
        for (const n of t.entries) {
          const o = t.reversed ? n.from : n.to;
          n.apply(o);
        }
        t.onComplete?.(), t.resolve();
      }
    this._groups.clear(), this._ownership.clear();
  }
  // ── Internal: tick ───────────────────────────────────────────────────
  /**
   * Per-frame tick for an animation group.
   * @returns `true` when the animation is complete (to unregister from engine).
   */
  _tick(t, n) {
    if (t.stopped)
      return !0;
    if (t.pausedAt !== null)
      return;
    t.startTime === 0 && (t.startTime = n), t._lastElapsed = n;
    const o = n - t.startTime;
    let i = Math.min(o / t.duration, 1);
    if (t.loop && i >= 1)
      if (t.loop === "reverse") {
        const l = o / t.duration, a = Math.floor(l), c = l - a;
        i = a % 2 === 0 ? c : 1 - c;
      } else
        i = o % t.duration / t.duration;
    const r = t.reversed ? 1 - i : i, s = t.easingFn(r);
    for (const l of t.entries) {
      const a = wd(l.from, l.to, s);
      t.currentValues.set(l.key, a), l.apply(a);
    }
    if (t.onProgress?.(r), !t.loop && i >= 1) {
      for (const l of t.entries) {
        const a = t.reversed ? l.from : l.to;
        l.apply(a), t.currentValues.set(l.key, a);
      }
      return t.stopped = !0, this._cleanup(t), t.onComplete?.(), t.resolve(), !0;
    }
  }
  // ── Internal: handle actions ─────────────────────────────────────────
  _pause(t) {
    t.stopped || t.pausedAt !== null || t.startTime === 0 || (t.pausedAt = performance.now());
  }
  _resume(t) {
    if (t.stopped || t.pausedAt === null)
      return;
    const n = performance.now() - t.pausedAt;
    t.startTime += n, t.pausedAt = null;
  }
  _stop(t) {
    if (!t.stopped) {
      t.stopped = !0, t.engineHandle.stop();
      for (const n of t.entries) {
        const o = t.reversed ? n.from : n.to;
        n.apply(o);
      }
      this._cleanup(t), t.onComplete?.(), t.resolve();
    }
  }
  _reverse(t) {
    if (!t.stopped && (t.reversed = !t.reversed, t._lastElapsed > 0 && t.startTime > 0)) {
      const n = t._lastElapsed, o = Math.min((n - t.startTime) / t.duration, 1);
      t.startTime = n - (1 - o) * t.duration;
    }
  }
  // ── Internal: cleanup ────────────────────────────────────────────────
  _cleanup(t) {
    for (const n of t.entries) {
      const o = this._ownership.get(n.key);
      o && o._id === t._id && this._ownership.delete(n.key);
    }
    this._groups.delete(t);
  }
}
const Ns = /* @__PURE__ */ new Map();
function _d(e, t) {
  Ns.set(e, t);
}
function Qn(e) {
  return e.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function Kt(e) {
  return typeof e == "string" ? { type: e } : e;
}
function Gt(e, t) {
  return `${t}__${e.type}__${(e.color ?? zo).replace(/[^a-zA-Z0-9]/g, "_")}`;
}
function In(e, t) {
  const n = Qn(e.color ?? zo), o = Number(e.width ?? 12.5), i = Number(e.height ?? 12.5), r = Number.isFinite(o) && o > 0 ? o : 12.5, s = Number.isFinite(i) && i > 0 ? i : 12.5, l = Qn(e.orient ?? "auto-start-reverse"), a = Qn(t);
  if (e.type === "arrow")
    return `<marker
      id="${a}"
      viewBox="-10 -10 20 20"
      markerWidth="${r}"
      markerHeight="${s}"
      orient="${l}"
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
  if (e.type === "arrowclosed")
    return `<marker
      id="${a}"
      viewBox="-10 -10 20 20"
      markerWidth="${r}"
      markerHeight="${s}"
      orient="${l}"
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
  const c = Ns.get(e.type);
  return c ? c({ id: a, color: n, width: r, height: s, orient: l }) : In({ ...e, type: "arrowclosed" }, t);
}
const lt = 200, ct = 150, bd = 1.2, Ht = "http://www.w3.org/2000/svg";
function xd(e, t) {
  const { getState: n, setViewport: o, config: i } = t, r = i.minimapPosition ?? "bottom-right", s = i.minimapMaskColor, l = i.minimapNodeColor, a = document.createElement("div");
  a.className = `flow-minimap flow-minimap-${r}`;
  const c = document.createElementNS(Ht, "svg");
  c.setAttribute("width", String(lt)), c.setAttribute("height", String(ct));
  const u = document.createElementNS(Ht, "rect");
  u.classList.add("flow-minimap-bg"), u.setAttribute("width", String(lt)), u.setAttribute("height", String(ct));
  const h = document.createElementNS(Ht, "g");
  h.classList.add("flow-minimap-nodes");
  const d = document.createElementNS(Ht, "path");
  d.classList.add("flow-minimap-mask"), s && d.setAttribute("fill", s), d.setAttribute("fill-rule", "evenodd"), c.appendChild(u), c.appendChild(h), c.appendChild(d), a.appendChild(c), e.appendChild(a);
  let f = { x: 0, y: 0, width: 0, height: 0 }, g = 1;
  function m() {
    const v = n();
    if (f = kt(v.nodes.filter((p) => !p.hidden), i.nodeOrigin), f.width === 0 && f.height === 0) {
      g = 1;
      return;
    }
    g = Math.max(
      f.width / lt,
      f.height / ct
    ) * bd;
  }
  function w(v) {
    return typeof l == "function" ? l(v) : l;
  }
  function y() {
    const v = n();
    m(), h.innerHTML = "";
    const p = (lt - f.width / g) / 2, H = (ct - f.height / g) / 2;
    for (const E of v.nodes) {
      if (E.hidden) continue;
      const N = document.createElementNS(Ht, "rect"), P = (E.dimensions?.width ?? ye) / g, z = (E.dimensions?.height ?? we) / g, x = (E.position.x - f.x) / g + p, C = (E.position.y - f.y) / g + H;
      N.setAttribute("x", String(x)), N.setAttribute("y", String(C)), N.setAttribute("width", String(P)), N.setAttribute("height", String(z)), N.setAttribute("rx", "2");
      const T = w(E);
      T && (N.style.fill = T), h.appendChild(N);
    }
    M();
  }
  function M() {
    const v = n();
    if (f.width === 0 && f.height === 0) {
      d.setAttribute("d", "");
      return;
    }
    const p = (lt - f.width / g) / 2, H = (ct - f.height / g) / 2, E = (-v.viewport.x / v.viewport.zoom - f.x) / g + p, N = (-v.viewport.y / v.viewport.zoom - f.y) / g + H, P = v.containerWidth / v.viewport.zoom / g, z = v.containerHeight / v.viewport.zoom / g, x = `M0,0 H${lt} V${ct} H0 Z`, C = `M${E},${N} h${P} v${z} h${-P} Z`;
    d.setAttribute("d", `${x} ${C}`);
  }
  let L = !1;
  function b(v, p) {
    const H = (lt - f.width / g) / 2, E = (ct - f.height / g) / 2, N = (v - H) * g + f.x, P = (p - E) * g + f.y;
    return { x: N, y: P };
  }
  function D(v) {
    const p = c.getBoundingClientRect(), H = v.clientX - p.left, E = v.clientY - p.top, N = n(), P = b(H, E), z = -P.x * N.viewport.zoom + N.containerWidth / 2, x = -P.y * N.viewport.zoom + N.containerHeight / 2;
    o({ x: z, y: x, zoom: N.viewport.zoom });
  }
  function k(v) {
    i.minimapPannable && (L = !0, c.setPointerCapture(v.pointerId), D(v));
  }
  function A(v) {
    L && D(v);
  }
  function _(v) {
    L && (L = !1, c.releasePointerCapture(v.pointerId));
  }
  c.addEventListener("pointerdown", k), c.addEventListener("pointermove", A), c.addEventListener("pointerup", _);
  function S(v) {
    if (!i.minimapZoomable)
      return;
    v.preventDefault();
    const p = n(), H = i.minZoom ?? 0.5, E = i.maxZoom ?? 2, N = v.deltaY > 0 ? 0.9 : 1.1, P = Math.min(Math.max(p.viewport.zoom * N, H), E);
    o({ zoom: P });
  }
  c.addEventListener("wheel", S, { passive: !1 });
  function $() {
    c.removeEventListener("pointerdown", k), c.removeEventListener("pointermove", A), c.removeEventListener("pointerup", _), c.removeEventListener("wheel", S), a.remove();
  }
  return { render: y, updateViewport: M, destroy: $ };
}
const Ed = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>', Cd = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>', Sd = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>', wi = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></svg>', Ld = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>', Md = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>';
function Pd(e, t) {
  const {
    position: n,
    orientation: o,
    showZoom: i,
    showFitView: r,
    showInteractive: s,
    showResetPanels: l,
    external: a,
    onZoomIn: c,
    onZoomOut: u,
    onFitView: h,
    onToggleInteractive: d,
    onResetPanels: f
  } = t, g = document.createElement("div"), m = [
    "flow-controls",
    `flow-controls-${o}`
  ];
  a ? m.push("flow-controls-external") : m.push(`flow-controls-${n}`), g.className = m.join(" "), g.setAttribute("role", "toolbar"), g.setAttribute("aria-label", "Flow controls");
  let w = null;
  if (i) {
    const L = Rt(Ed, "Zoom in", c), b = Rt(Cd, "Zoom out", u);
    g.appendChild(L), g.appendChild(b);
  }
  if (r) {
    const L = Rt(Sd, "Fit view", h);
    g.appendChild(L);
  }
  if (s && (w = Rt(wi, "Toggle interactivity", d), g.appendChild(w)), l) {
    const L = Rt(Md, "Reset panels", f);
    g.appendChild(L);
  }
  g.addEventListener("mousedown", (L) => L.stopPropagation()), g.addEventListener("pointerdown", (L) => L.stopPropagation()), g.addEventListener("wheel", (L) => L.stopPropagation(), { passive: !1 }), e.appendChild(g);
  function y(L) {
    if (w) {
      w.innerHTML = L.isInteractive ? wi : Ld;
      const b = L.isInteractive ? "Lock interactivity" : "Unlock interactivity";
      w.title = b, w.setAttribute("aria-label", b);
    }
  }
  function M() {
    g.remove();
  }
  return { update: y, destroy: M };
}
function Rt(e, t, n) {
  const o = document.createElement("button");
  return o.type = "button", o.innerHTML = e, o.title = t, o.setAttribute("aria-label", t), o.addEventListener("click", n), o;
}
const vi = 5;
function kd(e) {
  const t = document.createElement("div");
  t.className = "flow-selection-box", e.appendChild(t);
  let n = !1, o = 0, i = 0, r = 0, s = 0;
  function l(d, f, g = "partial") {
    o = d, i = f, r = d, s = f, n = !0, t.style.left = `${d}px`, t.style.top = `${f}px`, t.style.width = "0px", t.style.height = "0px", t.classList.remove("flow-selection-partial", "flow-selection-full"), t.classList.add("flow-selection-box-active", `flow-selection-${g}`);
  }
  function a(d, f) {
    if (!n)
      return;
    r = d, s = f;
    const g = Math.min(o, r), m = Math.min(i, s), w = Math.abs(r - o), y = Math.abs(s - i);
    t.style.left = `${g}px`, t.style.top = `${m}px`, t.style.width = `${w}px`, t.style.height = `${y}px`;
  }
  function c(d) {
    if (!n)
      return null;
    n = !1, t.classList.remove("flow-selection-box-active"), t.classList.remove("flow-selection-partial", "flow-selection-full");
    const f = Math.abs(r - o), g = Math.abs(s - i);
    if (f < vi && g < vi)
      return null;
    const m = Math.min(o, r), w = Math.min(i, s), y = (m - d.x) / d.zoom, M = (w - d.y) / d.zoom, L = f / d.zoom, b = g / d.zoom;
    return { x: y, y: M, width: L, height: b };
  }
  function u() {
    return n;
  }
  function h() {
    t.remove();
  }
  return { start: l, update: a, end: c, isActive: u, destroy: h };
}
const _i = 3;
function Nd(e) {
  const t = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  t.classList.add("flow-lasso-svg"), t.setAttribute("width", "100%"), t.setAttribute("height", "100%"), e.appendChild(t);
  const n = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
  n.classList.add("flow-lasso-path"), t.appendChild(n);
  let o = !1, i = [];
  function r(u, h, d = "partial") {
    o = !0, i = [{ x: u, y: h }], t.classList.remove("flow-lasso-partial", "flow-lasso-full"), t.classList.add("flow-lasso-active", `flow-lasso-${d}`), n.setAttribute("points", `${u},${h}`);
  }
  function s(u, h) {
    if (!o)
      return;
    const d = i[i.length - 1], f = u - d.x, g = h - d.y;
    f * f + g * g < _i * _i || (i.push({ x: u, y: h }), n.setAttribute("points", i.map((m) => `${m.x},${m.y}`).join(" ")));
  }
  function l(u) {
    if (!o || (o = !1, t.classList.remove("flow-lasso-active", "flow-lasso-partial", "flow-lasso-full"), n.setAttribute("points", ""), i.length < 3))
      return null;
    const h = i.map((d) => ({
      x: (d.x - u.x) / u.zoom,
      y: (d.y - u.y) / u.zoom
    }));
    return i = [], h;
  }
  function a() {
    return o;
  }
  function c() {
    t.remove();
  }
  return { start: r, update: s, end: l, isActive: a, destroy: c };
}
function Oo(e, t, n) {
  if (n.length < 3) return !1;
  let o = !1;
  for (let i = 0, r = n.length - 1; i < n.length; r = i++) {
    const s = n[i].x, l = n[i].y, a = n[r].x, c = n[r].y;
    l > t != c > t && e < (a - s) * (t - l) / (c - l) + s && (o = !o);
  }
  return o;
}
function Td(e, t, n, o, i, r, s, l) {
  const a = n - e, c = o - t, u = s - i, h = l - r, d = a * h - c * u;
  if (Math.abs(d) < 1e-10) return !1;
  const f = i - e, g = r - t, m = (f * h - g * u) / d, w = (f * c - g * a) / d;
  return m >= 0 && m <= 1 && w >= 0 && w <= 1;
}
function Id(e, t) {
  const n = t.x, o = t.y, i = t.x + t.width, r = t.y + t.height, s = n + t.width / 2, l = o + t.height / 2;
  if (Oo(s, l, e)) return !0;
  for (const c of e)
    if (c.x >= n && c.x <= i && c.y >= o && c.y <= r) return !0;
  const a = [
    [n, o, i, o],
    // top
    [i, o, i, r],
    // right
    [i, r, n, r],
    // bottom
    [n, r, n, o]
    // left
  ];
  for (let c = 0, u = e.length - 1; c < e.length; u = c++)
    for (const [h, d, f, g] of a)
      if (Td(e[u].x, e[u].y, e[c].x, e[c].y, h, d, f, g))
        return !0;
  return !1;
}
function Ts(e) {
  const t = e.dimensions?.width ?? ye, n = e.dimensions?.height ?? we;
  return e.rotation ? Bn(e.position.x, e.position.y, t, n, e.rotation) : { x: e.position.x, y: e.position.y, width: t, height: n };
}
function $d(e, t) {
  return t.length < 3 ? [] : e.filter((n) => {
    if (n.hidden || n.selectable === !1) return !1;
    const o = Ts(n);
    return Id(t, o);
  });
}
function Ad(e, t) {
  return t.length < 3 ? [] : e.filter((n) => {
    if (n.hidden || n.selectable === !1) return !1;
    const o = Ts(n);
    return [
      { x: o.x, y: o.y },
      { x: o.x + o.width, y: o.y },
      { x: o.x + o.width, y: o.y + o.height },
      { x: o.x, y: o.y + o.height }
    ].every((r) => Oo(r.x, r.y, t));
  });
}
function Dd(e, t) {
  return t.filter((n) => n.source === e || n.target === e);
}
function Eo(e, t, n) {
  const o = new Set(
    n.filter((i) => i.source === e).map((i) => i.target)
  );
  return t.filter((i) => o.has(i.id));
}
function Hd(e, t, n) {
  const o = new Set(
    n.filter((i) => i.target === e).map((i) => i.source)
  );
  return t.filter((i) => o.has(i.id));
}
function Rd(e, t, n) {
  if (e === t) return !0;
  const o = /* @__PURE__ */ new Map();
  for (const s of n) {
    let l = o.get(s.source);
    l || (l = [], o.set(s.source, l)), l.push(s.target);
  }
  const i = [t], r = /* @__PURE__ */ new Set();
  for (; i.length > 0; ) {
    const s = i.pop();
    if (s === e) return !0;
    if (r.has(s)) continue;
    r.add(s);
    const l = o.get(s);
    if (l)
      for (const a of l)
        r.has(a) || i.push(a);
  }
  return !1;
}
function zd(e, t, n, o = !1) {
  return n.some((i) => o ? i.source === e && i.target === t : i.source === e && i.target === t || i.source === t && i.target === e);
}
function Fd(e, t, n) {
  const o = new Map(t.map((a) => [a.id, a])), i = new Set(
    n.map((a) => `${a.source}|${a.target}|${a.sourceHandle ?? ""}|${a.targetHandle ?? ""}`)
  ), r = [], s = /* @__PURE__ */ new Set();
  let l = 0;
  for (const a of e) {
    if (o.get(a)?.reconnectOnDelete === !1) continue;
    const u = n.filter(
      (d) => d.target === a && !e.has(d.source)
    ), h = n.filter(
      (d) => d.source === a && !e.has(d.target)
    );
    if (!(u.length === 0 || h.length === 0))
      for (const d of u)
        for (const f of h) {
          if (d.source === f.target) continue;
          const g = `${d.source}|${f.target}|${d.sourceHandle ?? ""}|${f.targetHandle ?? ""}`;
          if (i.has(g) || s.has(g)) continue;
          const m = {
            id: `reconnect-${d.source}-${f.target}-${l++}`,
            source: d.source,
            target: f.target,
            sourceHandle: d.sourceHandle,
            targetHandle: f.targetHandle
          };
          d.type && (m.type = d.type), d.animated !== void 0 && (m.animated = d.animated), d.style && (m.style = d.style), d.class && (m.class = d.class), d.markerEnd && (m.markerEnd = d.markerEnd), d.markerStart && (m.markerStart = d.markerStart), d.label && (m.label = d.label), s.add(g), r.push(m);
        }
  }
  return r;
}
function Be(e, t, n) {
  return !(e.source === e.target || t.some(
    (i) => i.source === e.source && i.target === e.target && i.sourceHandle === e.sourceHandle && i.targetHandle === e.targetHandle
  ) || n?.preventCycles && Rd(e.source, e.target, t));
}
const tt = "_flowHandleValidate";
function Od(e) {
  e.directive(
    "flow-handle-validate",
    (t, { expression: n }, { evaluate: o, effect: i, cleanup: r }) => {
      function s() {
        let l;
        try {
          l = o(n);
        } catch {
          const a = e.$data(t);
          a && typeof a[n] == "function" && (l = a[n]);
        }
        typeof l == "function" ? t[tt] = l : (delete t[tt], requestAnimationFrame(() => {
          const a = e.$data(t);
          a && typeof a[n] == "function" && (t[tt] = a[n]);
        }));
      }
      i(() => {
        s();
      }), r(() => {
        delete t[tt];
      });
    }
  );
}
const ft = "_flowHandleLimit";
function Vd(e) {
  e.directive(
    "flow-handle-limit",
    (t, { expression: n }, { evaluate: o, effect: i, cleanup: r }) => {
      i(() => {
        const s = Number(o(n));
        s > 0 ? t[ft] = s : delete t[ft];
      }), r(() => {
        delete t[ft];
      });
    }
  );
}
const Jt = "_flowHandleConnectableStart", gt = "_flowHandleConnectableEnd";
function Xd(e) {
  e.directive(
    "flow-handle-connectable",
    (t, { expression: n, modifiers: o }, { evaluate: i, effect: r, cleanup: s }) => {
      const l = o.includes("start"), a = o.includes("end"), c = l || !l && !a, u = a || !l && !a;
      r(() => {
        const h = n ? !!i(n) : !0;
        c && (t[Jt] = h), u && (t[gt] = h);
      }), s(() => {
        delete t[Jt], delete t[gt];
      });
    }
  );
}
function nn(e, t, n = !0) {
  return t !== void 0 ? t : e.locked ? !1 : n;
}
function Is(e) {
  return nn(e, e.draggable);
}
function Yd(e) {
  return nn(e, e.deletable);
}
function et(e) {
  return nn(e, e.connectable);
}
function Co(e) {
  return nn(e, e.selectable);
}
function bi(e) {
  return nn(e, e.resizable);
}
function Nt(e, t, n, o, i, r, s) {
  const l = n - e, a = o - t, c = i - n, u = r - o;
  if (l === 0 && c === 0 || a === 0 && u === 0)
    return `L${n},${o}`;
  const h = Math.sqrt(l * l + a * a), d = Math.sqrt(c * c + u * u), f = Math.min(s, h / 2, d / 2), g = n - l / h * f, m = o - a / h * f, w = n + c / d * f, y = o + u / d * f;
  return `L${g},${m} Q${n},${o} ${w},${y}`;
}
function on({
  sourceX: e,
  sourceY: t,
  targetX: n,
  targetY: o
}) {
  const i = Math.abs(n - e) / 2, r = Math.abs(o - t) / 2;
  return {
    x: (e + n) / 2,
    y: (t + o) / 2,
    offsetX: i,
    offsetY: r
  };
}
function fn(e, t) {
  return e >= 0 ? 0.5 * e : t * 25 * Math.sqrt(-e);
}
function qd({
  sourceX: e,
  sourceY: t,
  sourcePosition: n = "bottom",
  targetX: o,
  targetY: i,
  targetPosition: r = "top",
  curvature: s = 0.25
}) {
  const l = n === "left" || n === "right", a = r === "left" || r === "right", c = l ? e + (n === "right" ? 1 : -1) * fn(
    n === "right" ? o - e : e - o,
    s
  ) : e, u = l ? t : t + (n === "bottom" ? 1 : -1) * fn(
    n === "bottom" ? i - t : t - i,
    s
  ), h = a ? o + (r === "right" ? 1 : -1) * fn(
    r === "right" ? e - o : o - e,
    s
  ) : o, d = a ? i : i + (r === "bottom" ? 1 : -1) * fn(
    r === "bottom" ? t - i : i - t,
    s
  );
  return [c, u, h, d];
}
function $n(e) {
  const { sourceX: t, sourceY: n, targetX: o, targetY: i } = e, [r, s, l, a] = qd(e), c = `M${t},${n} C${r},${s} ${l},${a} ${o},${i}`, { x: u, y: h, offsetX: d, offsetY: f } = on({ sourceX: t, sourceY: n, targetX: o, targetY: i });
  return {
    path: c,
    labelPosition: { x: u, y: h },
    labelOffsetX: d,
    labelOffsetY: f
  };
}
function Kg({
  sourceX: e,
  sourceY: t,
  targetX: n,
  targetY: o
}) {
  const i = (e + n) / 2, r = `M${e},${t} C${i},${t} ${i},${o} ${n},${o}`, { x: s, y: l, offsetX: a, offsetY: c } = on({ sourceX: e, sourceY: t, targetX: n, targetY: o });
  return {
    path: r,
    labelPosition: { x: s, y: l },
    labelOffsetX: a,
    labelOffsetY: c
  };
}
function xi(e) {
  switch (e) {
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
function Bd(e, t, n, o, i, r, s) {
  const l = xi(n), a = xi(r), c = e + l.x * s, u = t + l.y * s, h = o + a.x * s, d = i + a.y * s, f = n === "left" || n === "right";
  if (f === (r === "left" || r === "right")) {
    const m = (c + h) / 2, w = (u + d) / 2;
    return f ? [
      [c, t],
      [m, t],
      [m, i],
      [h, i]
    ] : [
      [e, u],
      [e, w],
      [o, w],
      [o, d]
    ];
  }
  return f ? [
    [c, t],
    [o, t],
    [o, d]
  ] : [
    [e, u],
    [e, i],
    [h, i]
  ];
}
function Qt({
  sourceX: e,
  sourceY: t,
  sourcePosition: n = "bottom",
  targetX: o,
  targetY: i,
  targetPosition: r = "top",
  borderRadius: s = 5,
  offset: l = 10
}) {
  const a = Bd(
    e,
    t,
    n,
    o,
    i,
    r,
    l
  );
  let c = `M${e},${t}`;
  for (let g = 0; g < a.length; g++) {
    const [m, w] = a[g];
    if (s > 0 && g > 0 && g < a.length - 1) {
      const [y, M] = g === 1 ? [e, t] : a[g - 1], [L, b] = a[g + 1];
      c += ` ${Nt(y, M, m, w, L, b, s)}`;
    } else
      c += ` L${m},${w}`;
  }
  c += ` L${o},${i}`;
  const { x: u, y: h, offsetX: d, offsetY: f } = on({ sourceX: e, sourceY: t, targetX: o, targetY: i });
  return {
    path: c,
    labelPosition: { x: u, y: h },
    labelOffsetX: d,
    labelOffsetY: f
  };
}
function Wd(e) {
  return Qt({ ...e, borderRadius: 0 });
}
function $s({
  sourceX: e,
  sourceY: t,
  targetX: n,
  targetY: o
}) {
  const i = `M${e},${t} L${n},${o}`, { x: r, y: s, offsetX: l, offsetY: a } = on({ sourceX: e, sourceY: t, targetX: n, targetY: o });
  return {
    path: i,
    labelPosition: { x: r, y: s },
    labelOffsetX: l,
    labelOffsetY: a
  };
}
const Ge = 40;
function Ud(e, t, n, o) {
  let i = 0, r = 0;
  const s = e - n.left, l = n.right - e, a = t - n.top, c = n.bottom - t;
  return s < Ge && s >= 0 ? i = -o * (1 - s / Ge) : l < Ge && l >= 0 && (i = o * (1 - l / Ge)), a < Ge && a >= 0 ? r = -o * (1 - a / Ge) : c < Ge && c >= 0 && (r = o * (1 - c / Ge)), { dx: i, dy: r };
}
function As(e) {
  const { container: t, speed: n, onPan: o } = e;
  let i = null, r = 0, s = 0, l = !1;
  function a() {
    if (!l)
      return;
    const c = t.getBoundingClientRect(), { dx: u, dy: h } = Ud(r, s, c, n);
    if ((u !== 0 || h !== 0) && o(u, h) === !0) {
      l = !1, i = null;
      return;
    }
    i = requestAnimationFrame(a);
  }
  return {
    start() {
      l || e.isLocked?.() || (l = !0, i = requestAnimationFrame(a));
    },
    stop() {
      l = !1, i !== null && (cancelAnimationFrame(i), i = null);
    },
    updatePointer(c, u) {
      r = c, s = u;
    },
    destroy() {
      this.stop();
    }
  };
}
function Ct(e) {
  const t = e.connectionLineType ?? "straight", o = {
    stroke: (e.invalid ? (e.containerEl ? getComputedStyle(e.containerEl).getPropertyValue("--flow-connection-line-invalid").trim() : "") || Ls : null) ?? e.connectionLineStyle?.stroke ?? ((e.containerEl ? getComputedStyle(e.containerEl).getPropertyValue("--flow-edge-stroke-selected").trim() : "") || Wn),
    strokeWidth: e.connectionLineStyle?.strokeWidth ?? Number(ud),
    strokeDasharray: e.connectionLineStyle?.strokeDasharray ?? fd
  }, i = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  i.style.cssText = "position:absolute;top:0;left:0;width:1px;height:1px;overflow:visible;pointer-events:none;z-index:1000;";
  let r = null;
  function s(a) {
    const c = {
      ...a,
      connectionLineType: t,
      connectionLineStyle: o
    };
    if (e.connectionLine) {
      r && r.remove(), r = e.connectionLine(c), i.appendChild(r);
      return;
    }
    r || (r = document.createElementNS("http://www.w3.org/2000/svg", "path"), r.setAttribute("fill", "none"), i.appendChild(r)), r.setAttribute("stroke", o.stroke), r.setAttribute("stroke-width", String(o.strokeWidth)), r.setAttribute("stroke-dasharray", o.strokeDasharray);
    const { fromX: u, fromY: h, toX: d, toY: f } = a;
    let g;
    switch (t) {
      case "bezier": {
        g = $n({ sourceX: u, sourceY: h, targetX: d, targetY: f }).path;
        break;
      }
      case "smoothstep": {
        g = Qt({ sourceX: u, sourceY: h, targetX: d, targetY: f }).path;
        break;
      }
      case "step": {
        g = Wd({ sourceX: u, sourceY: h, targetX: d, targetY: f }).path;
        break;
      }
      default: {
        g = $s({ sourceX: u, sourceY: h, targetX: d, targetY: f }).path;
        break;
      }
    }
    r.setAttribute("d", g);
  }
  function l() {
    i.remove();
  }
  return { svg: i, update: s, destroy: l };
}
function Vt(e) {
  if (e.connectionSnapRadius <= 0)
    return { element: null, position: e.cursorFlowPos };
  const t = e.connectionMode === "loose" ? "[data-flow-handle-type]" : `[data-flow-handle-type="${e.handleType}"]`, n = e.containerEl.querySelectorAll(t);
  let o = null, i = e.cursorFlowPos, r = e.connectionSnapRadius;
  return n.forEach((s) => {
    const l = s, a = l.closest("[x-flow-node]");
    if (!a || a.dataset.flowNodeId === e.excludeNodeId || e.targetNodeId && a.dataset.flowNodeId !== e.targetNodeId) return;
    const c = a.dataset.flowNodeId;
    if (c) {
      const g = e.getNode(c);
      if (g && !et(g)) return;
    }
    const u = e.handleType === "target" ? gt : Jt;
    if (l[u] === !1) return;
    const h = l.getBoundingClientRect();
    if (h.width === 0 && h.height === 0) return;
    const d = e.toFlowPosition(
      h.left + h.width / 2,
      h.top + h.height / 2
    ), f = Math.sqrt(
      (e.cursorFlowPos.x - d.x) ** 2 + (e.cursorFlowPos.y - d.y) ** 2
    );
    f < r && (r = f, o = l, i = d);
  }), { element: o, position: i };
}
function An(e, t, n, o) {
  if (t._config?.autoPanOnConnect === !1) return null;
  const i = As({
    container: e,
    speed: t._config?.autoPanSpeed ?? 15,
    onPan(r, s) {
      const l = { x: t.viewport.x, y: t.viewport.y };
      t._panZoom?.setViewport({
        x: t.viewport.x - r,
        y: t.viewport.y - s,
        zoom: t.viewport.zoom
      });
      const a = l.x - t.viewport.x, c = l.y - t.viewport.y;
      return a === 0 && c === 0;
    }
  });
  return i.updatePointer(n, o), i.start(), i;
}
let hn = 0;
function ze(e, t) {
  const n = e.querySelector(
    `[data-flow-node-id="${CSS.escape(t.source)}"]`
  );
  if (n) {
    const i = n.querySelector(
      `[data-flow-handle-id="${CSS.escape(t.sourceHandle ?? "source")}"]`
    );
    if (i?.[tt] && !i[tt](t))
      return !1;
  }
  const o = e.querySelector(
    `[data-flow-node-id="${CSS.escape(t.target)}"]`
  );
  if (o) {
    const i = o.querySelector(
      `[data-flow-handle-id="${CSS.escape(t.targetHandle ?? "target")}"]`
    );
    if (i?.[tt] && !i[tt](t))
      return !1;
  }
  return !0;
}
function Fe(e, t, n) {
  const o = e.querySelector(
    `[data-flow-node-id="${CSS.escape(t.source)}"]`
  );
  if (o) {
    const r = o.querySelector(
      `[data-flow-handle-id="${CSS.escape(t.sourceHandle ?? "source")}"]`
    );
    if (r?.[ft] && n.filter(
      (l) => l.source === t.source && (l.sourceHandle ?? "source") === (t.sourceHandle ?? "source")
    ).length >= r[ft])
      return !1;
  }
  const i = e.querySelector(
    `[data-flow-node-id="${CSS.escape(t.target)}"]`
  );
  if (i) {
    const r = i.querySelector(
      `[data-flow-handle-id="${CSS.escape(t.targetHandle ?? "target")}"]`
    );
    if (r?.[ft] && n.filter(
      (l) => l.target === t.target && (l.targetHandle ?? "target") === (t.targetHandle ?? "target")
    ).length >= r[ft])
      return !1;
  }
  return !0;
}
function Xt(e, t, n, o, i) {
  const r = i ? o.edges.filter((l) => l.id !== i) : o.edges, s = e.querySelectorAll('[data-flow-handle-type="target"]');
  for (const l of s) {
    const c = l.closest("[x-flow-node]")?.dataset.flowNodeId;
    if (!c) continue;
    const u = l.dataset.flowHandleId ?? "target";
    if (l[gt] === !1) {
      l.classList.add("flow-handle-invalid"), l.classList.remove("flow-handle-valid", "flow-handle-limit-reached");
      continue;
    }
    const h = {
      source: t,
      sourceHandle: n,
      target: c,
      targetHandle: u
    }, f = o.getNode(c)?.connectable !== !1 && Be(h, r, { preventCycles: o._config?.preventCycles }), g = f && Fe(e, h, r);
    g && ze(e, h) && (!o._config?.isValidConnection || o._config.isValidConnection(h)) ? (l.classList.add("flow-handle-valid"), l.classList.remove("flow-handle-invalid", "flow-handle-limit-reached")) : (l.classList.add("flow-handle-invalid"), l.classList.remove("flow-handle-valid"), f && !g ? l.classList.add("flow-handle-limit-reached") : l.classList.remove("flow-handle-limit-reached"));
  }
}
function Ce(e) {
  const t = e.querySelectorAll('[data-flow-handle-type="target"]');
  for (const n of t)
    n.classList.remove("flow-handle-valid", "flow-handle-invalid", "flow-handle-limit-reached");
}
function jd(e) {
  e.directive(
    "flow-handle",
    (t, { value: n, modifiers: o, expression: i }, { evaluate: r, effect: s, cleanup: l }) => {
      const a = n === "source" ? "source" : "target", c = o.includes("top"), u = o.includes("bottom"), h = o.includes("left"), d = o.includes("right"), f = c || u || h || d;
      let g;
      c && h ? g = "top-left" : c && d ? g = "top-right" : u && h ? g = "bottom-left" : u && d ? g = "bottom-right" : c ? g = "top" : d ? g = "right" : u ? g = "bottom" : h ? g = "left" : g = t.getAttribute("data-flow-handle-position") ?? (a === "source" ? "bottom" : "top");
      let m, w = !1;
      if (i) {
        const L = r(i);
        L && typeof L == "object" && !Array.isArray(L) ? (m = L.id || t.getAttribute("data-flow-handle-id") || a, L.position && (g = L.position, w = !0)) : m = L || t.getAttribute("data-flow-handle-id") || a;
      } else
        m = t.getAttribute("data-flow-handle-id") || a;
      if (o.includes("hidden") && (t.style.display = "none"), t.dataset.flowHandleType = a, t.dataset.flowHandlePosition = g, t.dataset.flowHandleId = m, f && (t.dataset.flowHandleExplicit = "true"), w && i && (t.dataset.flowHandleExplicit = "true", s(() => {
        const L = r(i);
        L && typeof L == "object" && !Array.isArray(L) && L.position && (t.dataset.flowHandlePosition = L.position);
      })), !f && !w) {
        const L = () => {
          const D = t.closest("[x-flow-node]")?.dataset.flowNodeId;
          if (!D) return;
          const k = t.closest("[x-data]");
          return k ? e.$data(k)?.getNode?.(D) : void 0;
        };
        s(() => {
          const b = L();
          if (!b) return;
          const D = a === "source" ? b.sourcePosition : b.targetPosition;
          D && (t.dataset.flowHandlePosition = D);
        });
      }
      t.classList.add("flow-handle", `flow-handle-${a}`);
      const y = () => {
        const L = t.closest("[x-flow-node]");
        return L ? L.getAttribute("data-flow-node-id") ?? null : null;
      }, M = () => {
        const L = t.closest("[x-data]");
        return L ? e.$data(L) : null;
      };
      if (a === "source") {
        let L = null;
        const b = (A) => {
          A.preventDefault(), A.stopPropagation();
          const _ = M(), S = t.closest("[x-flow-node]");
          if (!_ || !S || _._animationLocked) return;
          const $ = S.dataset.flowNodeId;
          if (!$) return;
          const v = _.getNode($);
          if (v && !et(v) || t[Jt] === !1) return;
          const p = A.clientX, H = A.clientY;
          let E = !1;
          if (_.pendingConnection && _._config?.connectOnClick !== !1) {
            _._emit("connect-end", {
              connection: null,
              source: _.pendingConnection.source,
              sourceHandle: _.pendingConnection.sourceHandle,
              position: { x: 0, y: 0 }
            }), _.pendingConnection = null, _._container?.classList.remove("flow-connecting");
            const Y = t.closest(".flow-container");
            Y && Ce(Y);
          }
          let N = null, P = null, z = null, x = null, C = null;
          const T = _._config?.connectionSnapRadius ?? 20, U = t.closest(".flow-container");
          let J = 0, oe = 0, G = !1, se = /* @__PURE__ */ new Map();
          const le = () => {
            if (E = !0, j("connection", `Connection drag started from node "${$}" handle "${m}"`), _._emit("connect-start", { source: $, sourceHandle: m }), !U) return;
            P = Ct({
              connectionLineType: _._config?.connectionLineType,
              connectionLineStyle: _._config?.connectionLineStyle,
              connectionLine: _._config?.connectionLine,
              containerEl: U
            }), N = P.svg;
            const Y = t.getBoundingClientRect(), B = U.getBoundingClientRect(), I = _.viewport?.zoom || 1, W = _.viewport?.x || 0, ee = _.viewport?.y || 0;
            J = (Y.left + Y.width / 2 - B.left - W) / I, oe = (Y.top + Y.height / 2 - B.top - ee) / I, P.update({ fromX: J, fromY: oe, toX: J, toY: oe, source: $, sourceHandle: m });
            const X = U.querySelector(".flow-viewport");
            if (X && X.appendChild(N), _.pendingConnection = {
              source: $,
              sourceHandle: m,
              position: { x: J, y: oe }
            }, x = An(U, _, p, H), Xt(U, $, m, _), _._config?.onEdgeDrop) {
              const K = _._config.edgeDropPreview, O = K ? K({ source: $, sourceHandle: m }) : "New Node";
              if (O !== null) {
                C = document.createElement("div"), C.className = "flow-ghost-node";
                const Z = document.createElement("div");
                if (Z.className = "flow-ghost-handle", C.appendChild(Z), typeof O == "string") {
                  const ne = document.createElement("span");
                  ne.textContent = O, C.appendChild(ne);
                } else
                  C.appendChild(O);
                C.style.left = `${J}px`, C.style.top = `${oe}px`;
                const q = U.querySelector(".flow-viewport");
                q && q.appendChild(C);
              }
            }
          }, ce = () => {
            const Y = [..._.selectedNodes], B = [], I = U.getBoundingClientRect(), W = _.viewport?.zoom || 1, ee = _.viewport?.x || 0, X = _.viewport?.y || 0;
            for (const K of Y) {
              if (K === $) continue;
              const O = U?.querySelector(`[data-flow-node-id="${CSS.escape(K)}"]`)?.querySelector('[data-flow-handle-type="source"]');
              if (!O) continue;
              const Z = O.getBoundingClientRect();
              B.push({
                nodeId: K,
                handleId: O.dataset.flowHandleId ?? "source",
                pos: {
                  x: (Z.left + Z.width / 2 - I.left - ee) / W,
                  y: (Z.top + Z.height / 2 - I.top - X) / W
                }
              });
            }
            return B;
          }, te = (Y) => {
            G = !0, P && (se.set($, {
              line: P,
              sourceNodeId: $,
              sourceHandleId: m,
              sourcePos: { x: J, y: oe },
              valid: !0
            }), P = null);
            const B = ce(), I = U.querySelector(".flow-viewport");
            for (const W of B) {
              const ee = Ct({
                connectionLineType: _._config?.connectionLineType,
                connectionLineStyle: _._config?.connectionLineStyle,
                connectionLine: _._config?.connectionLine,
                containerEl: U
              });
              ee.update({
                fromX: W.pos.x,
                fromY: W.pos.y,
                toX: Y.x,
                toY: Y.y,
                source: W.nodeId,
                sourceHandle: W.handleId
              }), I && I.appendChild(ee.svg), se.set(W.nodeId, {
                line: ee,
                sourceNodeId: W.nodeId,
                sourceHandleId: W.handleId,
                sourcePos: W.pos,
                valid: !0
              });
            }
          }, R = (Y) => {
            if (!E) {
              const W = Y.clientX - p, ee = Y.clientY - H;
              if (Math.abs(W) >= bn || Math.abs(ee) >= bn) {
                if (le(), _._config?.multiConnect && _.selectedNodes.size > 1 && _.selectedNodes.has($)) {
                  const X = _.screenToFlowPosition(Y.clientX, Y.clientY);
                  te(X);
                }
              } else
                return;
            }
            const B = _.screenToFlowPosition(Y.clientX, Y.clientY);
            if (G) {
              const W = Vt({
                containerEl: U,
                handleType: "target",
                excludeNodeId: $,
                cursorFlowPos: B,
                connectionSnapRadius: T,
                getNode: (O) => _.getNode(O),
                toFlowPosition: (O, Z) => _.screenToFlowPosition(O, Z),
                connectionMode: _._config?.connectionMode
              });
              W.element !== z && (z?.classList.remove("flow-handle-active"), W.element?.classList.add("flow-handle-active"), z = W.element);
              const X = W.element?.closest("[x-flow-node]")?.dataset.flowNodeId ?? null, K = W.element?.dataset.flowHandleId ?? "target", ie = _._config?.connectionLineStyle?.stroke ?? (getComputedStyle(U).getPropertyValue("--flow-edge-stroke-selected").trim() || Wn);
              for (const O of se.values())
                if (O.line.update({
                  fromX: O.sourcePos.x,
                  fromY: O.sourcePos.y,
                  toX: W.position.x,
                  toY: W.position.y,
                  source: O.sourceNodeId,
                  sourceHandle: O.sourceHandleId
                }), W.element && X) {
                  const Z = {
                    source: O.sourceNodeId,
                    sourceHandle: O.sourceHandleId,
                    target: X,
                    targetHandle: K
                  }, ae = _.getNode(X)?.connectable !== !1 && O.sourceNodeId !== X && Be(Z, _.edges, { preventCycles: _._config?.preventCycles }) && Fe(U, Z, _.edges) && ze(U, Z) && (!_._config?.isValidConnection || _._config.isValidConnection(Z));
                  O.valid = ae;
                  const re = O.line.svg.querySelector("path");
                  if (re)
                    if (ae)
                      re.setAttribute("stroke", ie);
                    else {
                      const fe = getComputedStyle(U).getPropertyValue("--flow-connection-line-invalid").trim() || Ls;
                      re.setAttribute("stroke", fe);
                    }
                } else {
                  O.valid = !0;
                  const Z = O.line.svg.querySelector("path");
                  Z && Z.setAttribute("stroke", ie);
                }
              _.pendingConnection = { ..._.pendingConnection, position: W.position }, x?.updatePointer(Y.clientX, Y.clientY);
              return;
            }
            const I = Vt({
              containerEl: U,
              handleType: "target",
              excludeNodeId: $,
              cursorFlowPos: B,
              connectionSnapRadius: T,
              getNode: (W) => _.getNode(W),
              toFlowPosition: (W, ee) => _.screenToFlowPosition(W, ee)
            });
            I.element !== z && (z?.classList.remove("flow-handle-active"), I.element?.classList.add("flow-handle-active"), z = I.element), C ? I.element ? (C.style.display = "none", P?.update({ fromX: J, fromY: oe, toX: I.position.x, toY: I.position.y, source: $, sourceHandle: m })) : (C.style.display = "", C.style.left = `${B.x}px`, C.style.top = `${B.y}px`, P?.update({ fromX: J, fromY: oe, toX: B.x, toY: B.y, source: $, sourceHandle: m })) : P?.update({ fromX: J, fromY: oe, toX: I.position.x, toY: I.position.y, source: $, sourceHandle: m }), _.pendingConnection = { ..._.pendingConnection, position: I.position }, x?.updatePointer(Y.clientX, Y.clientY);
          }, Q = (Y) => {
            if (x?.stop(), x = null, document.removeEventListener("pointermove", R), document.removeEventListener("pointerup", Q), L = null, G) {
              const ee = _.screenToFlowPosition(Y.clientX, Y.clientY);
              let X = z;
              X || (X = document.elementFromPoint(Y.clientX, Y.clientY)?.closest('[data-flow-handle-type="target"]'));
              const ie = X?.closest("[x-flow-node]")?.dataset.flowNodeId ?? null, O = X?.dataset.flowHandleId ?? "target", Z = [], q = [], ne = [], F = [];
              if (X && ie) {
                const V = _.getNode(ie);
                for (const ae of se.values()) {
                  const re = {
                    source: ae.sourceNodeId,
                    sourceHandle: ae.sourceHandleId,
                    target: ie,
                    targetHandle: O
                  };
                  if (V?.connectable !== !1 && ae.sourceNodeId !== ie && Be(re, _.edges, { preventCycles: _._config?.preventCycles }) && Fe(U, re, _.edges) && ze(U, re) && (!_._config?.isValidConnection || _._config.isValidConnection(re))) {
                    const be = `e-${ae.sourceNodeId}-${ie}-${Date.now()}-${hn++}`;
                    Z.push({ id: be, ...re }), q.push(re), F.push(ae);
                  } else
                    ne.push(ae);
                }
              } else
                ne.push(...se.values());
              for (const V of F)
                V.line.destroy();
              if (Z.length > 0) {
                _.addEdges(Z);
                for (const V of q)
                  _._emit("connect", { connection: V });
                _._emit("multi-connect", { connections: q });
              }
              ne.length > 0 && setTimeout(() => {
                for (const V of ne)
                  V.line.destroy();
              }, 100), z?.classList.remove("flow-handle-active"), _._emit("connect-end", {
                connection: q.length > 0 ? q[0] : null,
                source: $,
                sourceHandle: m,
                position: ee
              }), se.clear(), G = !1, Ce(U), _.pendingConnection = null, _._container?.classList.remove("flow-connecting");
              return;
            }
            if (!E) {
              _._config?.connectOnClick !== !1 && (j("connection", `Click-to-connect started from node "${$}" handle "${m}"`), _._emit("connect-start", { source: $, sourceHandle: m }), _.pendingConnection = {
                source: $,
                sourceHandle: m,
                position: { x: 0, y: 0 }
              }, _._container?.classList.add("flow-connecting"), Xt(U, $, m, _));
              return;
            }
            P?.destroy(), P = null, C?.remove(), C = null, z?.classList.remove("flow-handle-active"), Ce(U);
            const B = _.screenToFlowPosition(Y.clientX, Y.clientY), I = { source: $, sourceHandle: m, position: B };
            let W = z;
            if (W || (W = document.elementFromPoint(Y.clientX, Y.clientY)?.closest('[data-flow-handle-type="target"]')), W) {
              const X = W.closest("[x-flow-node]")?.dataset.flowNodeId, K = W.dataset.flowHandleId ?? "target";
              if (X) {
                if (W[gt] === !1) {
                  j("connection", "Connection rejected (handle not connectable end)"), _._emit("connect-end", { connection: null, ...I }), _.pendingConnection = null;
                  return;
                }
                const ie = _.getNode(X);
                if (ie && !et(ie)) {
                  j("connection", `Connection rejected (target "${X}" not connectable)`), _._emit("connect-end", { connection: null, ...I }), _.pendingConnection = null;
                  return;
                }
                const O = {
                  source: $,
                  sourceHandle: m,
                  target: X,
                  targetHandle: K
                };
                if (Be(O, _.edges, { preventCycles: _._config?.preventCycles })) {
                  if (!Fe(U, O, _.edges)) {
                    j("connection", "Connection rejected (handle limit)", O), _._emit("connect-end", { connection: null, ...I }), _.pendingConnection = null;
                    return;
                  }
                  if (!ze(U, O)) {
                    j("connection", "Connection rejected (per-handle validator)", O), _._emit("connect-end", { connection: null, ...I }), _.pendingConnection = null;
                    return;
                  }
                  if (_._config?.isValidConnection && !_._config.isValidConnection(O)) {
                    j("connection", "Connection rejected (custom validator)", O), _._emit("connect-end", { connection: null, ...I }), _.pendingConnection = null;
                    return;
                  }
                  const Z = `e-${$}-${X}-${Date.now()}-${hn++}`;
                  _.addEdges({ id: Z, ...O }), j("connection", `Connection created: ${$} → ${X}`, O), _._emit("connect", { connection: O }), _._emit("connect-end", { connection: O, ...I });
                } else
                  j("connection", "Connection rejected (invalid)", O), _._emit("connect-end", { connection: null, ...I });
              } else
                _._emit("connect-end", { connection: null, ...I });
            } else if (_._config?.onEdgeDrop) {
              const ee = {
                x: B.x - ye / 2,
                y: B.y - we / 2
              }, X = _._config.onEdgeDrop({
                source: $,
                sourceHandle: m,
                position: ee
              });
              if (X) {
                const K = {
                  source: $,
                  sourceHandle: m,
                  target: X.id,
                  targetHandle: "target"
                };
                if (!Fe(U, K, _.edges))
                  j("connection", "Edge drop: connection rejected (handle limit)"), _._emit("connect-end", { connection: null, ...I });
                else if (!ze(U, K))
                  j("connection", "Edge drop: connection rejected (per-handle validator)"), _._emit("connect-end", { connection: null, ...I });
                else if (!_._config.isValidConnection || _._config.isValidConnection(K)) {
                  _.addNodes(X);
                  const ie = `e-${$}-${X.id}-${Date.now()}-${hn++}`;
                  _.addEdges({ id: ie, ...K }), j("connection", `Edge drop: created node "${X.id}" and edge`, K), _._emit("connect", { connection: K }), _._emit("connect-end", { connection: K, ...I });
                } else
                  j("connection", "Edge drop: connection rejected by validator"), _._emit("connect-end", { connection: null, ...I });
              } else
                j("connection", "Edge drop: callback returned null"), _._emit("connect-end", { connection: null, ...I });
            } else
              j("connection", "Connection cancelled (no target)"), _._emit("connect-end", { connection: null, ...I });
            _.pendingConnection = null;
          };
          document.addEventListener("pointermove", R), document.addEventListener("pointerup", Q), document.addEventListener("pointercancel", Q), L = () => {
            document.removeEventListener("pointermove", R), document.removeEventListener("pointerup", Q), document.removeEventListener("pointercancel", Q), x?.stop(), P?.destroy(), P = null, C?.remove(), C = null;
            for (const Y of se.values())
              Y.line.destroy();
            se.clear(), G = !1, z?.classList.remove("flow-handle-active"), Ce(U), _.pendingConnection = null, _._container?.classList.remove("flow-connecting");
          };
        };
        t.addEventListener("pointerdown", b);
        const D = () => {
          const A = M();
          if (!A?._pendingReconnection || A._pendingReconnection.draggedEnd !== "source") return;
          const _ = y();
          if (_) {
            const S = A.getNode(_);
            if (S && !et(S)) return;
          }
          t[Jt] !== !1 && t.classList.add("flow-handle-active");
        }, k = () => {
          t.classList.remove("flow-handle-active");
        };
        t.addEventListener("pointerenter", D), t.addEventListener("pointerleave", k), l(() => {
          L?.(), t.removeEventListener("pointerdown", b), t.removeEventListener("pointerenter", D), t.removeEventListener("pointerleave", k), t.classList.remove("flow-handle", `flow-handle-${a}`);
        });
      } else {
        const L = () => {
          const _ = M();
          if (!_?.pendingConnection) return;
          const S = y();
          if (S) {
            const $ = _.getNode(S);
            if ($ && !et($)) return;
          }
          t[gt] !== !1 && t.classList.add("flow-handle-active");
        }, b = () => {
          t.classList.remove("flow-handle-active");
        };
        t.addEventListener("pointerenter", L), t.addEventListener("pointerleave", b);
        const D = (_) => {
          const S = M();
          if (!S?.pendingConnection || S._config?.connectOnClick === !1) return;
          _.preventDefault(), _.stopPropagation();
          const $ = y();
          if (!$) return;
          if (t[gt] === !1) {
            j("connection", "Click-to-connect rejected (handle not connectable end)"), S._emit("connect-end", { connection: null, source: S.pendingConnection.source, sourceHandle: S.pendingConnection.sourceHandle, position: { x: 0, y: 0 } }), S.pendingConnection = null, S._container?.classList.remove("flow-connecting");
            const N = t.closest(".flow-container");
            N && Ce(N);
            return;
          }
          const v = S.getNode($);
          if (v && !et(v)) {
            j("connection", `Click-to-connect rejected (target "${$}" not connectable)`), S._emit("connect-end", { connection: null, source: S.pendingConnection.source, sourceHandle: S.pendingConnection.sourceHandle, position: { x: 0, y: 0 } }), S.pendingConnection = null, S._container?.classList.remove("flow-connecting");
            const N = t.closest(".flow-container");
            N && Ce(N);
            return;
          }
          const p = {
            source: S.pendingConnection.source,
            sourceHandle: S.pendingConnection.sourceHandle,
            target: $,
            targetHandle: m
          }, H = { source: S.pendingConnection.source, sourceHandle: S.pendingConnection.sourceHandle, position: { x: 0, y: 0 } };
          if (Be(p, S.edges, { preventCycles: S._config?.preventCycles })) {
            const N = t.closest(".flow-container");
            if (N && !Fe(N, p, S.edges)) {
              j("connection", "Click-to-connect rejected (handle limit)", p), S._emit("connect-end", { connection: null, ...H }), S.pendingConnection = null, S._container?.classList.remove("flow-connecting"), Ce(N);
              return;
            }
            if (N && !ze(N, p)) {
              j("connection", "Click-to-connect rejected (per-handle validator)", p), S._emit("connect-end", { connection: null, ...H }), S.pendingConnection = null, S._container?.classList.remove("flow-connecting"), N && Ce(N);
              return;
            }
            if (S._config?.isValidConnection && !S._config.isValidConnection(p)) {
              j("connection", "Click-to-connect rejected (custom validator)", p), S._emit("connect-end", { connection: null, ...H }), S.pendingConnection = null, S._container?.classList.remove("flow-connecting"), N && Ce(N);
              return;
            }
            const P = `e-${p.source}-${p.target}-${Date.now()}-${hn++}`;
            S.addEdges({ id: P, ...p }), j("connection", `Click-to-connect: ${p.source} → ${p.target}`, p), S._emit("connect", { connection: p }), S._emit("connect-end", { connection: p, ...H });
          } else
            j("connection", "Click-to-connect rejected (invalid)", p), S._emit("connect-end", { connection: null, ...H });
          S.pendingConnection = null, S._container?.classList.remove("flow-connecting");
          const E = t.closest(".flow-container");
          E && Ce(E);
        };
        t.addEventListener("click", D);
        let k = null;
        const A = (_) => {
          if (_.button !== 0) return;
          const S = M(), $ = y();
          if (!S || !$ || S._animationLocked || S._config?.edgesReconnectable === !1 || S._pendingReconnection) return;
          const v = S.edges.filter(
            (O) => O.target === $ && (O.targetHandle ?? "target") === m
          );
          if (v.length === 0) return;
          const p = v.find((O) => O.selected) ?? (v.length === 1 ? v[0] : null);
          if (!p) return;
          const H = p.reconnectable ?? !0;
          if (H === !1 || H === "source") return;
          _.preventDefault(), _.stopPropagation();
          const E = _.clientX, N = _.clientY;
          let P = !1, z = !1, x = null;
          const C = S._config?.connectionSnapRadius ?? 20, T = t.closest(".flow-container");
          if (!T) return;
          const U = T.querySelector(
            `[data-flow-node-id="${CSS.escape(p.source)}"]`
          ), J = p.sourceHandle ? `[data-flow-handle-id="${CSS.escape(p.sourceHandle)}"]` : '[data-flow-handle-type="source"]', oe = U?.querySelector(J), G = T.getBoundingClientRect(), se = S.viewport?.zoom || 1, le = S.viewport?.x || 0, ce = S.viewport?.y || 0;
          let te, R;
          if (oe) {
            const O = oe.getBoundingClientRect();
            te = (O.left + O.width / 2 - G.left - le) / se, R = (O.top + O.height / 2 - G.top - ce) / se;
          } else {
            const O = S.getNode(p.source);
            if (!O) return;
            const Z = O.dimensions?.width ?? ye, q = O.dimensions?.height ?? we;
            te = O.position.x + Z / 2, R = O.position.y + q;
          }
          let Q = null, Y = null, B = null, I = E, W = N;
          const ee = () => {
            P = !0;
            const O = T.querySelector(
              `[data-flow-edge-id="${p.id}"]`
            );
            O && O.classList.add("flow-edge-reconnecting"), S._emit("reconnect-start", { edge: p, handleType: "target" }), j("reconnect", `Reconnection drag started from target handle on edge "${p.id}"`), Y = Ct({
              connectionLineType: S._config?.connectionLineType,
              connectionLineStyle: S._config?.connectionLineStyle,
              connectionLine: S._config?.connectionLine,
              containerEl: T
            }), Q = Y.svg;
            const Z = S.screenToFlowPosition(E, N);
            Y.update({
              fromX: te,
              fromY: R,
              toX: Z.x,
              toY: Z.y,
              source: p.source,
              sourceHandle: p.sourceHandle
            });
            const q = T.querySelector(".flow-viewport");
            q && q.appendChild(Q), S.pendingConnection = {
              source: p.source,
              sourceHandle: p.sourceHandle,
              position: Z
            }, S._pendingReconnection = {
              edge: p,
              draggedEnd: "target",
              anchorPosition: { x: te, y: R },
              position: Z
            }, B = An(T, S, I, W), Xt(T, p.source, p.sourceHandle ?? "source", S, p.id);
          }, X = (O) => {
            if (I = O.clientX, W = O.clientY, !P) {
              Math.sqrt(
                (O.clientX - E) ** 2 + (O.clientY - N) ** 2
              ) >= bn && ee();
              return;
            }
            const Z = S.screenToFlowPosition(O.clientX, O.clientY), q = Vt({
              containerEl: T,
              handleType: "target",
              excludeNodeId: p.source,
              cursorFlowPos: Z,
              connectionSnapRadius: C,
              getNode: (ne) => S.getNode(ne),
              toFlowPosition: (ne, F) => S.screenToFlowPosition(ne, F)
            });
            q.element !== x && (x?.classList.remove("flow-handle-active"), q.element?.classList.add("flow-handle-active"), x = q.element), Y?.update({
              fromX: te,
              fromY: R,
              toX: q.position.x,
              toY: q.position.y,
              source: p.source,
              sourceHandle: p.sourceHandle
            }), S.pendingConnection && (S.pendingConnection = {
              ...S.pendingConnection,
              position: q.position
            }), S._pendingReconnection && (S._pendingReconnection = {
              ...S._pendingReconnection,
              position: q.position
            }), B?.updatePointer(O.clientX, O.clientY);
          }, K = () => {
            if (z) return;
            z = !0, document.removeEventListener("pointermove", X), document.removeEventListener("pointerup", ie), document.removeEventListener("pointercancel", ie), B?.stop(), B = null, Y?.destroy(), Y = null, Q = null, x?.classList.remove("flow-handle-active"), k = null;
            const O = T.querySelector(
              `[data-flow-edge-id="${p.id}"]`
            );
            O && O.classList.remove("flow-edge-reconnecting"), Ce(T), S.pendingConnection = null, S._pendingReconnection = null;
          }, ie = (O) => {
            if (!P) {
              K();
              return;
            }
            let Z = x;
            Z || (Z = document.elementFromPoint(O.clientX, O.clientY)?.closest('[data-flow-handle-type="target"]'));
            let q = !1;
            if (Z) {
              const F = Z.closest("[x-flow-node]")?.dataset.flowNodeId, V = Z.dataset.flowHandleId;
              if (F && S.getNode(F)?.connectable !== !1) {
                const re = {
                  source: p.source,
                  sourceHandle: p.sourceHandle,
                  target: F,
                  targetHandle: V
                }, fe = S.edges.filter(
                  (pe) => pe.id !== p.id
                );
                if (Be(re, fe, { preventCycles: S._config?.preventCycles })) {
                  if (!Fe(T, re, fe))
                    j("reconnect", "Reconnection rejected (handle limit)", re);
                  else if (!ze(T, re))
                    j("reconnect", "Reconnection rejected (per-handle validator)", re);
                  else if (!S._config?.isValidConnection || S._config.isValidConnection(re)) {
                    const pe = { ...p };
                    S._captureHistory?.(), p.target = re.target, p.targetHandle = re.targetHandle, q = !0, j("reconnect", `Edge "${p.id}" reconnected (target)`, re), S._emit("reconnect", { oldEdge: pe, newConnection: re });
                  }
                }
              }
            }
            q || j("reconnect", `Edge "${p.id}" reconnection cancelled — snapping back`), S._emit("reconnect-end", { edge: p, successful: q }), K();
          };
          document.addEventListener("pointermove", X), document.addEventListener("pointerup", ie), document.addEventListener("pointercancel", ie), k = K;
        };
        t.addEventListener("pointerdown", A), l(() => {
          k?.(), t.removeEventListener("pointerdown", A), t.removeEventListener("pointerenter", L), t.removeEventListener("pointerleave", b), t.removeEventListener("click", D), t.classList.remove("flow-handle", `flow-handle-${a}`, "flow-handle-active");
        });
      }
    }
  );
}
const Ei = {
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
function Zd(e) {
  if (!e) return { ...Ei };
  const t = { ...Ei };
  for (const n of Object.keys(e))
    n in e && (t[n] = e[n]);
  return t;
}
function Re(e, t) {
  if (t == null) return !1;
  const n = e.length === 1 ? e.toLowerCase() : e;
  return Array.isArray(t) ? t.some((o) => (o.length === 1 ? o.toLowerCase() : o) === n) : (t.length === 1 ? t.toLowerCase() : t) === n;
}
function ot(e, t) {
  if (t == null) return !1;
  switch (t) {
    case "Shift":
      return e.shiftKey;
    case "Control":
      return e.ctrlKey;
    case "Meta":
      return e.metaKey;
    case "Alt":
      return e.altKey;
    default:
      return !1;
  }
}
function Kd(e, t, n = {}) {
  const o = n.duration ?? 500, i = n.moveThreshold ?? 10;
  let r = null, s = 0, l = 0, a = null;
  function c() {
    r !== null && (clearTimeout(r), r = null), a = null, document.removeEventListener("pointermove", u), document.removeEventListener("pointerup", c), document.removeEventListener("pointercancel", c);
  }
  function u(d) {
    const f = d.clientX - s, g = d.clientY - l;
    f * f + g * g > i * i && c();
  }
  function h(d) {
    c(), s = d.clientX, l = d.clientY, a = d, document.addEventListener("pointermove", u), document.addEventListener("pointerup", c), document.addEventListener("pointercancel", c), r = setTimeout(() => {
      const f = a;
      c(), f && t(f);
    }, o);
  }
  return e.addEventListener("pointerdown", h), () => {
    c(), e.removeEventListener("pointerdown", h);
  };
}
const Ci = 20;
function Ds(e) {
  return new Map(e.map((t) => [t.id, t]));
}
function So(e, t, n) {
  if (!e.position) return { x: 0, y: 0 };
  let o = e.position.x, i = e.position.y;
  const r = /* @__PURE__ */ new Set();
  r.add(e.id);
  let s = e.parentId ? t.get(e.parentId) : void 0;
  for (; s && !r.has(s.id); ) {
    r.add(s.id);
    const l = s.nodeOrigin ?? n ?? [0, 0], a = s.dimensions?.width ?? ye, c = s.dimensions?.height ?? we;
    o += s.position.x - a * l[0], i += s.position.y - c * l[1], s = s.parentId ? t.get(s.parentId) : void 0;
  }
  return { x: o, y: i };
}
function St(e, t, n) {
  if (!e.parentId)
    return e;
  const o = So(e, t, n);
  return { ...e, position: o };
}
function Dn(e, t, n) {
  return e.map((o) => St(o, t, n));
}
function it(e, t) {
  const n = /* @__PURE__ */ new Set(), o = [e], i = /* @__PURE__ */ new Map();
  for (const r of t)
    if (r.parentId) {
      const s = i.get(r.parentId);
      s ? s.push(r.id) : i.set(r.parentId, [r.id]);
    }
  for (; o.length > 0; ) {
    const r = o.shift(), s = i.get(r);
    if (s)
      for (const l of s)
        n.has(l) || (n.add(l), o.push(l));
  }
  return n;
}
function st(e) {
  const t = Ds(e), n = [], o = /* @__PURE__ */ new Set();
  function i(r) {
    if (!o.has(r.id)) {
      if (r.parentId) {
        const s = t.get(r.parentId);
        s && i(s);
      }
      o.add(r.id), n.push(r);
    }
  }
  for (const r of e)
    i(r);
  return n;
}
function Hs(e, t, n = /* @__PURE__ */ new Set()) {
  if (n.has(e.id))
    return e.zIndex ?? 2;
  if (n.add(e.id), !e.parentId)
    return e.zIndex !== void 0 ? e.zIndex : e.type === "group" ? 0 : 2;
  const o = t.get(e.parentId);
  return o ? Hs(o, t, n) + 2 + (e.zIndex ?? 0) : (e.zIndex ?? 0) + 2;
}
function Rs(e, t, n) {
  return {
    x: Math.max(t[0][0], Math.min(e.x, t[1][0] - (n?.width ?? 0))),
    y: Math.max(t[0][1], Math.min(e.y, t[1][1] - (n?.height ?? 0)))
  };
}
function eo(e, t, n) {
  return {
    x: Math.max(0, Math.min(e.x, n.width - t.width)),
    y: Math.max(0, Math.min(e.y, n.height - t.height))
  };
}
function gn(e, t, n) {
  const o = t.extent ?? n;
  if (!o || o === "parent" || t.parentId) return e;
  const i = t.dimensions ?? { width: ye, height: we };
  return Rs(e, o, i);
}
function Gd(e, t, n) {
  const o = e.x + t.width + Ci, i = e.y + t.height + Ci, r = Math.max(n.width, o), s = Math.max(n.height, i);
  return r === n.width && s === n.height ? null : { width: r, height: s };
}
function Si(e, t, n) {
  switch (n) {
    case "top":
      return { x: e / 2, y: 0 };
    case "right":
      return { x: e, y: t / 2 };
    case "bottom":
      return { x: e / 2, y: t };
    case "left":
      return { x: 0, y: t / 2 };
    case "top-left":
      return { x: 0, y: 0 };
    case "top-right":
      return { x: e, y: 0 };
    case "bottom-left":
      return { x: 0, y: t };
    case "bottom-right":
      return { x: e, y: t };
  }
}
function Jd(e, t, n) {
  const o = e / 2, i = t / 2, r = e / 2, s = t / 2;
  switch (n) {
    case "top":
      return { x: o, y: 0 };
    case "right":
      return { x: e, y: i };
    case "bottom":
      return { x: o, y: t };
    case "left":
      return { x: 0, y: i };
    case "top-right": {
      const l = -Math.PI / 4;
      return { x: o + r * Math.cos(l), y: i + s * Math.sin(l) };
    }
    case "top-left": {
      const l = -3 * Math.PI / 4;
      return { x: o + r * Math.cos(l), y: i + s * Math.sin(l) };
    }
    case "bottom-right": {
      const l = Math.PI / 4;
      return { x: o + r * Math.cos(l), y: i + s * Math.sin(l) };
    }
    case "bottom-left": {
      const l = 3 * Math.PI / 4;
      return { x: o + r * Math.cos(l), y: i + s * Math.sin(l) };
    }
  }
}
function Qd(e, t, n) {
  switch (n) {
    case "top":
      return { x: e / 2, y: 0 };
    case "right":
      return { x: e, y: t / 2 };
    case "bottom":
      return { x: e / 2, y: t };
    case "left":
      return { x: 0, y: t / 2 };
    case "top-right":
      return { x: e * 0.75, y: t * 0.25 };
    case "top-left":
      return { x: e * 0.25, y: t * 0.25 };
    case "bottom-right":
      return { x: e * 0.75, y: t * 0.75 };
    case "bottom-left":
      return { x: e * 0.25, y: t * 0.75 };
  }
}
function eu(e, t, n) {
  switch (n) {
    case "top":
      return { x: e / 2, y: 0 };
    case "right":
      return { x: e, y: t / 2 };
    case "bottom":
      return { x: e / 2, y: t };
    case "left":
      return { x: 0, y: t / 2 };
    case "top-right":
      return { x: e * 0.75, y: 0 };
    case "top-left":
      return { x: e * 0.25, y: 0 };
    case "bottom-right":
      return { x: e * 0.75, y: t };
    case "bottom-left":
      return { x: e * 0.25, y: t };
  }
}
function tu(e, t, n) {
  const o = e * 0.15;
  switch (n) {
    case "top":
      return { x: e * 0.575, y: 0 };
    case "right":
      return { x: e * 0.925, y: t / 2 };
    case "bottom":
      return { x: e * 0.425, y: t };
    case "left":
      return { x: e * 0.075, y: t / 2 };
    case "top-right":
      return { x: e, y: 0 };
    case "top-left":
      return { x: o, y: 0 };
    case "bottom-right":
      return { x: e - o, y: t };
    case "bottom-left":
      return { x: 0, y: t };
  }
}
function nu(e, t, n) {
  switch (n) {
    case "top":
      return { x: e / 2, y: 0 };
    case "right":
      return { x: e * 0.75, y: t / 2 };
    case "bottom":
      return { x: e / 2, y: t };
    case "left":
      return { x: e * 0.25, y: t / 2 };
    case "top-right":
      return { x: e * 0.625, y: t * 0.25 };
    case "top-left":
      return { x: e * 0.375, y: t * 0.25 };
    case "bottom-right":
      return { x: e, y: t };
    case "bottom-left":
      return { x: 0, y: t };
  }
}
function ou(e, t, n) {
  const o = t * 0.12;
  switch (n) {
    case "top":
      return { x: e / 2, y: o };
    case "right":
      return { x: e, y: t / 2 };
    case "bottom":
      return { x: e / 2, y: t - o };
    case "left":
      return { x: 0, y: t / 2 };
    case "top-right":
      return { x: e, y: o };
    case "top-left":
      return { x: 0, y: o };
    case "bottom-right":
      return { x: e, y: t - o };
    case "bottom-left":
      return { x: 0, y: t - o };
  }
}
function iu(e, t, n) {
  const o = Math.min(e, t) / 2, i = e / 2, r = t / 2;
  switch (n) {
    case "top":
      return { x: i, y: 0 };
    case "right":
      return { x: e, y: r };
    case "bottom":
      return { x: i, y: t };
    case "left":
      return { x: 0, y: r };
    case "top-right": {
      const s = e - o, l = -Math.PI / 4;
      return { x: s + o * Math.cos(l), y: r + o * Math.sin(l) };
    }
    case "top-left": {
      const s = o, l = -3 * Math.PI / 4;
      return { x: s + o * Math.cos(l), y: r + o * Math.sin(l) };
    }
    case "bottom-right": {
      const s = e - o, l = Math.PI / 4;
      return { x: s + o * Math.cos(l), y: r + o * Math.sin(l) };
    }
    case "bottom-left": {
      const s = o, l = 3 * Math.PI / 4;
      return { x: s + o * Math.cos(l), y: r + o * Math.sin(l) };
    }
  }
}
const zs = {
  circle: { perimeterPoint: Jd },
  diamond: { perimeterPoint: Qd },
  hexagon: { perimeterPoint: eu },
  parallelogram: { perimeterPoint: tu },
  triangle: { perimeterPoint: nu },
  cylinder: { perimeterPoint: ou },
  stadium: { perimeterPoint: iu }
};
function Fs(e, t = "light") {
  let n = t === "dark" ? "dark" : "light", o = null, i = null;
  function r(l) {
    n = l ? "dark" : "light", e.classList.toggle("dark", l);
  }
  function s(l) {
    o && i && (o.removeEventListener("change", i), o = null, i = null), l === "system" ? (o = window.matchMedia("(prefers-color-scheme: dark)"), r(o.matches), i = (a) => r(a.matches), o.addEventListener("change", i)) : r(l === "dark");
  }
  return s(t), {
    get resolved() {
      return n;
    },
    update: s,
    destroy() {
      o && i && o.removeEventListener("change", i), e.classList.remove("dark");
    }
  };
}
const to = "__alpineflow_collab_store__";
function su() {
  return typeof globalThis < "u" ? (globalThis[to] || (globalThis[to] = /* @__PURE__ */ new WeakMap()), globalThis[to]) : /* @__PURE__ */ new WeakMap();
}
const ke = su(), no = "__alpineflow_registry__";
function ru() {
  return typeof globalThis < "u" ? (globalThis[no] || (globalThis[no] = /* @__PURE__ */ new Map()), globalThis[no]) : /* @__PURE__ */ new Map();
}
function _t(e) {
  return ru().get(e);
}
function au(e, t) {
  switch (e) {
    case "nodes-change": {
      const n = t.nodes ?? [], o = n.length === 1 ? n[0].data?.label || n[0].id : null;
      return t.type === "add" ? o ? `Added node: ${o}` : `Added ${n.length} nodes` : t.type === "remove" ? o ? `Removed node: ${o}` : `Removed ${n.length} nodes` : null;
    }
    case "edges-change": {
      const n = t.edges ?? [];
      return t.type === "add" ? n.length === 1 ? `Connected ${n[0].source} to ${n[0].target}` : `Added ${n.length} connections` : t.type === "remove" ? n.length === 1 && n[0].source && n[0].target ? `Removed connection from ${n[0].source} to ${n[0].target}` : `Removed ${n.length} connections` : null;
    }
    case "selection-change": {
      const n = t.nodes?.length ?? 0, o = t.edges?.length ?? 0;
      if (n === 0 && o === 0)
        return "Selection cleared";
      const i = [];
      return n > 0 && i.push(`${n} node${n === 1 ? "" : "s"}`), o > 0 && i.push(`${o} edge${o === 1 ? "" : "s"}`), `${i.join(" and ")} selected`;
    }
    case "viewport-move-end": {
      const n = t.viewport?.zoom ?? 1;
      return `Viewport: zoom ${Math.round(n * 100)}%`;
    }
    case "fit-view":
      return "Fitted view to content";
    case "node-reparent": {
      const n = t.node?.data?.label || t.node?.id || "node";
      return t.newParentId ? `Moved ${n} into ${t.newParentId}` : `Detached ${n} from ${t.oldParentId}`;
    }
    default:
      return null;
  }
}
const lu = 1e3;
class cu {
  constructor(t, n) {
    this._clearTimer = null, this._formatMessage = n ?? au, this._el = document.createElement("div"), this._el.setAttribute("aria-live", "polite"), this._el.setAttribute("aria-atomic", "true"), this._el.setAttribute("role", "status");
    const o = this._el.style;
    o.position = "absolute", o.width = "1px", o.height = "1px", o.padding = "0", o.margin = "-1px", o.overflow = "hidden", o.clip = "rect(0,0,0,0)", o.whiteSpace = "nowrap", o.border = "0", t.appendChild(this._el);
  }
  announce(t) {
    this._clearTimer && clearTimeout(this._clearTimer), this._el.textContent = t, this._clearTimer = setTimeout(() => {
      this._el.textContent = "", this._clearTimer = null;
    }, lu);
  }
  handleEvent(t, n) {
    const o = this._formatMessage(t, n);
    o && this.announce(o);
  }
  destroy() {
    this._clearTimer && clearTimeout(this._clearTimer), this._el.remove();
  }
}
class du {
  constructor() {
    this._registry = /* @__PURE__ */ new Map();
  }
  registerCompute(t, n) {
    this._registry.set(t, n);
  }
  hasCompute(t) {
    return this._registry.has(t);
  }
  /**
   * Kahn's algorithm topological sort. Skips back-edges in cycles
   * by appending remaining nodes at the end.
   */
  topologicalSort(t, n) {
    const o = new Map(t.map((a) => [a.id, a])), i = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
    for (const a of t)
      i.set(a.id, 0), r.set(a.id, []);
    for (const a of n)
      !o.has(a.source) || !o.has(a.target) || (i.set(a.target, (i.get(a.target) ?? 0) + 1), r.get(a.source).push(a.target));
    const s = [];
    for (const [a, c] of i)
      c === 0 && s.push(a);
    const l = [];
    for (; s.length > 0; ) {
      const a = s.shift();
      l.push(o.get(a));
      for (const c of r.get(a) ?? []) {
        const u = (i.get(c) ?? 0) - 1;
        i.set(c, u), u === 0 && s.push(c);
      }
    }
    if (l.length < t.length) {
      const a = new Set(l.map((c) => c.id));
      for (const c of t)
        a.has(c.id) || l.push(c);
    }
    return l;
  }
  /**
   * Run compute propagation.
   *
   * @param nodes All nodes in the graph
   * @param edges All edges in the graph
   * @param startNodeId If provided, only compute this node and its downstream descendants
   * @returns Map of nodeId → output data for nodes that had a registered compute function
   */
  compute(t, n, o) {
    const i = this.topologicalSort(t, n), r = /* @__PURE__ */ new Map();
    if (o)
      for (const a of t)
        a.data.$outputs && r.set(a.id, a.data.$outputs);
    let s = null;
    o && (s = this._getDownstream(o, n), s.add(o));
    const l = /* @__PURE__ */ new Map();
    for (const a of i) {
      if (s && !s.has(a.id)) continue;
      const c = this._registry.get(a.type ?? "default");
      if (!c) continue;
      const u = {}, h = n.filter((f) => f.target === a.id);
      for (const f of h) {
        const g = r.get(f.source);
        if (!g) continue;
        const m = f.sourceHandle ?? "default", w = f.targetHandle ?? "default";
        m in g && (u[w] = g[m]);
      }
      const d = c.compute(u, a.data);
      r.set(a.id, d), l.set(a.id, d), a.data.$inputs = u, a.data.$outputs = d;
    }
    return l;
  }
  /** Get all downstream node IDs reachable from a start node. */
  _getDownstream(t, n) {
    const o = /* @__PURE__ */ new Map();
    for (const s of n) {
      let l = o.get(s.source);
      l || (l = [], o.set(s.source, l)), l.push(s.target);
    }
    const i = /* @__PURE__ */ new Set(), r = [t];
    for (; r.length > 0; ) {
      const s = r.pop();
      if (!i.has(s)) {
        i.add(s);
        for (const l of o.get(s) ?? [])
          i.has(l) || r.push(l);
      }
    }
    return i.delete(t), i;
  }
}
const uu = {
  connect: (e) => [e.connection?.source ?? e.source, e.connection?.target ?? e.target, e.connection?.sourceHandle ?? e.sourceHandle, e.connection?.targetHandle ?? e.targetHandle],
  "connect-start": (e) => [e.source, e.sourceHandle],
  "connect-end": (e) => [e.connection, e.source, e.sourceHandle, e.position],
  "node-click": (e) => [e.node.id, e.node],
  "node-drag-start": (e) => [e.node.id],
  "node-drag-end": (e) => [e.node.id, e.position],
  "node-resize-start": (e) => [e.node.id, e.dimensions],
  "node-resize-end": (e) => [e.node.id, e.dimensions],
  "node-collapse": (e) => [e.node.id, e.descendants],
  "node-expand": (e) => [e.node.id, e.descendants],
  "node-reparent": (e) => [e.node.id, e.oldParentId, e.newParentId],
  "node-context-menu": (e) => [e.node.id, { x: e.event.clientX, y: e.event.clientY }],
  "nodes-change": (e) => [e],
  "edge-click": (e) => [e.edge.id],
  "edge-context-menu": (e) => [e.edge.id, { x: e.event.clientX, y: e.event.clientY }],
  "edges-change": (e) => [e],
  "reconnect-start": (e) => [e.edge.id, e.handleType],
  reconnect: (e) => [e.oldEdge.id, e.newConnection],
  "reconnect-end": (e) => [e.edge.id, e.successful],
  "pane-click": (e) => [e.position],
  "pane-context-menu": (e) => [e.position],
  "viewport-change": (e) => [e.viewport],
  "selection-change": (e) => [e.nodes, e.edges],
  "selection-context-menu": (e) => [e.nodes, e.edges, { x: e.event.clientX, y: e.event.clientY }],
  drop: (e) => [e.data, e.position],
  init: () => [],
  "row-select": (e) => [e.rowId, e.nodeId, e.attrId],
  "row-deselect": (e) => [e.rowId, e.nodeId, e.attrId],
  "row-selection-change": (e) => [e.selectedRows]
}, fu = {
  "flow:addNodes": "addNodes",
  "flow:removeNodes": "removeNodes",
  "flow:addEdges": "addEdges",
  "flow:removeEdges": "removeEdges",
  "flow:update": "update",
  "flow:animate": "animate",
  "flow:sendParticle": "sendParticle",
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
  "flow:setLoading": "setLoading",
  "flow:clear": "$clear",
  "flow:toggleInteractive": "toggleInteractive",
  "flow:panBy": "panBy",
  "flow:fitBounds": "fitBounds",
  "flow:patchConfig": "patchConfig",
  "flow:deselectAll": "deselectAll",
  "flow:collapseNode": "collapseNode",
  "flow:expandNode": "expandNode",
  "flow:toggleNode": "toggleNode"
}, hu = {
  "flow:addNodes": (e) => [e.nodes],
  "flow:removeNodes": (e) => [e.ids],
  "flow:addEdges": (e) => [e.edges],
  "flow:removeEdges": (e) => [e.ids],
  "flow:update": (e) => [e.targets, e.options ?? {}],
  "flow:animate": (e) => [e.targets, e.options ?? {}],
  "flow:sendParticle": (e) => [e.edgeId, e.options ?? {}],
  "flow:fitView": () => [],
  "flow:zoomIn": () => [],
  "flow:zoomOut": () => [],
  "flow:setCenter": (e) => [e.x, e.y, e.zoom],
  "flow:setViewport": (e) => [e.viewport],
  "flow:follow": (e) => [e.nodeId, e.options ?? {}],
  "flow:unfollow": () => [],
  "flow:undo": () => [],
  "flow:redo": () => [],
  "flow:layout": (e) => [e.options ?? {}],
  "flow:fromObject": (e) => [e.data],
  "flow:setLoading": (e) => [e.loading],
  "flow:clear": () => [],
  "flow:toggleInteractive": () => [],
  "flow:panBy": (e) => [e.dx, e.dy],
  "flow:fitBounds": (e) => [e.rect, e.options],
  "flow:patchConfig": (e) => [e.changes],
  "flow:deselectAll": () => [],
  "flow:collapseNode": (e) => [e.id],
  "flow:expandNode": (e) => [e.id],
  "flow:toggleNode": (e) => [e.id]
}, Li = {
  success: { borderColor: "#22c55e", shadow: "0 0 0 2px rgba(34,197,94,0.3)" },
  error: { borderColor: "#ef4444", shadow: "0 0 0 2px rgba(239,68,68,0.3)" },
  warning: { borderColor: "#f59e0b", shadow: "0 0 0 2px rgba(245,158,11,0.3)" },
  info: { borderColor: "#3b82f6", shadow: "0 0 0 2px rgba(59,130,246,0.3)" }
};
function gu(e, t) {
  const n = [];
  return n.push(t.on("flow:moveNode", (o) => {
    const i = o.duration ?? 0;
    e.update(
      { nodes: { [o.id]: { position: { x: o.x, y: o.y } } } },
      { duration: i }
    );
  })), n.push(t.on("flow:updateNode", (o) => {
    const i = o.duration ?? 0;
    e.update(
      { nodes: { [o.id]: o.changes } },
      { duration: i }
    );
  })), n.push(t.on("flow:focusNode", (o) => {
    const i = e.getNode(o.id);
    if (!i) return;
    const r = i.dimensions?.width ?? 150, s = i.dimensions?.height ?? 40, l = i.parentId ? e.getAbsolutePosition(o.id) : i.position;
    e.fitBounds(
      { x: l.x, y: l.y, width: r, height: s },
      { padding: o.padding ?? 0.5, duration: o.duration ?? 300 }
    );
  })), n.push(t.on("flow:connect", (o) => {
    const r = { id: o.edgeId ?? `e-${o.source}-${o.target}`, source: o.source, target: o.target, ...o.options ?? {} };
    o.duration && o.duration > 0 ? e.timeline().step({ addEdges: [r], edgeTransition: "draw", duration: o.duration }).play() : e.addEdges(r);
  })), n.push(t.on("flow:disconnect", (o) => {
    const i = e.edges.filter((r) => r.source === o.source && r.target === o.target).map((r) => r.id);
    i.length !== 0 && (o.duration && o.duration > 0 ? e.timeline().step({ removeEdges: i, edgeTransition: "fade", duration: o.duration }).play() : e.removeEdges(i));
  })), n.push(t.on("flow:highlightNode", (o) => {
    const i = e.getNode(o.id);
    if (!i) return;
    const r = Li[o.style] ?? Li.info, s = o.duration ?? 1500, l = Math.floor(s * 0.6), a = Math.floor(s * 0.4), c = i.style?.borderColor ?? null, u = i.style?.boxShadow ?? null;
    e.update({
      nodes: { [o.id]: { style: `border-color: ${r.borderColor}; box-shadow: ${r.shadow}` } }
    }, { duration: 100 }), setTimeout(() => {
      const h = c ? `border-color: ${c}; box-shadow: ${u ?? "none"}` : "";
      e.update({
        nodes: { [o.id]: { style: h } }
      }, { duration: a });
    }, 100 + l);
  })), n.push(t.on("flow:highlightPath", (o) => {
    const i = o.nodeIds, r = o.options ?? {}, s = r.delay ?? 200;
    for (let l = 0; l < i.length - 1; l++) {
      const a = i[l], c = i[l + 1], u = e.edges.find((h) => h.source === a && h.target === c);
      u && setTimeout(() => {
        e.sendParticle(u.id, {
          color: r.color ?? "#3b82f6",
          size: r.size ?? 5,
          duration: r.duration ?? "800ms"
        });
      }, l * s);
    }
  })), n.push(t.on("flow:lockNode", (o) => {
    const i = e.getNode(o.id);
    i && (i.locked = !0);
  })), n.push(t.on("flow:unlockNode", (o) => {
    const i = e.getNode(o.id);
    i && (i.locked = !1);
  })), n.push(t.on("flow:hideNode", (o) => {
    const i = e.getNode(o.id);
    i && (i.hidden = !0);
  })), n.push(t.on("flow:showNode", (o) => {
    const i = e.getNode(o.id);
    i && (i.hidden = !1);
  })), n.push(t.on("flow:selectNodes", (o) => {
    e.deselectAll();
    for (const i of o.ids) {
      e.selectedNodes.add(i);
      const r = e.getNode(i);
      r && (r.selected = !0);
    }
  })), n.push(t.on("flow:selectEdges", (o) => {
    e.deselectAll();
    for (const i of o.ids) {
      e.selectedEdges.add(i);
      const r = e.getEdge(i);
      r && (r.selected = !0);
    }
  })), () => {
    for (const o of n)
      typeof o == "function" && o();
  };
}
function pu(e) {
  return "on" + e.split("-").map(
    (t) => t.charAt(0).toUpperCase() + t.slice(1)
  ).join("");
}
function mu(e, t, n) {
  for (const [o, i] of Object.entries(n)) {
    const r = pu(o), s = e[r];
    e[r] = (l) => {
      let a;
      typeof s == "function" && (a = s(l));
      const c = uu[o], u = c ? c(l) : [l], h = t[i];
      return typeof h == "function" && h.call(t, ...u), a;
    };
  }
}
function yu(e, t) {
  const n = [];
  for (const [o, i] of Object.entries(fu)) {
    const r = t.on(o, (s) => {
      const l = e[i];
      if (typeof l != "function") return;
      const a = hu[o], c = a ? a(s) : Object.values(s);
      l.call(e, ...c);
    });
    n.push(r);
  }
  return () => {
    for (const o of n)
      typeof o == "function" && o();
  };
}
function Yt(e, t) {
  const n = e.type ?? "default", o = t[n], i = e.data?.childValidation;
  if (!(!o && !i))
    return o ? i ? { ...o, ...i } : o : i;
}
function Os(e, t, n, o) {
  if (!o) return { valid: !0 };
  if (o.maxChildren !== void 0 && n.length >= o.maxChildren)
    return {
      valid: !1,
      rule: "maxChildren",
      message: `Maximum ${o.maxChildren} child node(s) allowed`
    };
  if (o.allowedChildTypes) {
    const i = t.type ?? "default";
    if (!o.allowedChildTypes.includes(i))
      return {
        valid: !1,
        rule: "allowedChildTypes",
        message: `Node type "${i}" is not allowed in this group`
      };
  }
  if (o.childTypeConstraints) {
    const i = t.type ?? "default", r = o.childTypeConstraints[i];
    if (r?.max !== void 0 && n.filter(
      (l) => (l.type ?? "default") === i
    ).length >= r.max)
      return {
        valid: !1,
        rule: "childTypeConstraints",
        message: `Maximum ${r.max} "${i}" node(s) allowed`
      };
  }
  if (o.validateChild) {
    const i = o.validateChild(t, n);
    if (i !== !0)
      return {
        valid: !1,
        rule: "validateChild",
        message: typeof i == "string" ? i : "Custom validation rejected"
      };
  }
  return { valid: !0 };
}
function Hn(e, t, n, o) {
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
    const s = t.type ?? "default", l = o.childTypeConstraints[s];
    if (l?.min !== void 0 && n.filter(
      (c) => (c.type ?? "default") === s
    ).length - 1 < l.min)
      return {
        valid: !1,
        rule: "childTypeConstraints",
        message: `Requires at least ${l.min} "${s}" node(s)`
      };
  }
  return { valid: !0 };
}
function Mi(e, t, n) {
  if (!n) return [];
  const o = [], i = Math.max(
    n.minChildren ?? 0,
    n.requiredChildren ? 1 : 0
  );
  if (i > 0 && t.length < i && o.push(`Requires at least ${i} child node(s)`), n.maxChildren !== void 0 && t.length > n.maxChildren && o.push(`Maximum ${n.maxChildren} child node(s) allowed`), n.childTypeConstraints)
    for (const [r, s] of Object.entries(n.childTypeConstraints)) {
      const l = t.filter(
        (a) => (a.type ?? "default") === r
      ).length;
      s.min !== void 0 && l < s.min && o.push(`Requires at least ${s.min} "${r}" node(s)`), s.max !== void 0 && l > s.max && o.push(`Maximum ${s.max} "${r}" node(s) allowed`);
    }
  return o;
}
function Tt(e, t) {
  const n = $t(e, t);
  return {
    x: n.x,
    y: n.y,
    width: e.dimensions?.width ?? ye,
    height: e.dimensions?.height ?? we
  };
}
function Vs(e, t) {
  return e.x < t.x + t.width && e.x + e.width > t.x && e.y < t.y + t.height && e.y + e.height > t.y;
}
function wu(e, t, n = !0) {
  const o = Tt(e);
  return t.filter((i) => {
    if (i.id === e.id) return !1;
    const r = Tt(i);
    return n ? Vs(o, r) : o.x <= r.x && o.y <= r.y && o.x + o.width >= r.x + r.width && o.y + o.height >= r.y + r.height;
  });
}
function vu(e, t, n = !0) {
  if (e.id === t.id) return !1;
  const o = Tt(e), i = Tt(t);
  return n ? Vs(o, i) : o.x <= i.x && o.y <= i.y && o.x + o.width >= i.x + i.width && o.y + o.height >= i.y + i.height;
}
function _u(e, t, n, o, i = 5) {
  let { x: r, y: s } = e;
  for (const l of o) {
    const a = r + t, c = s + n, u = l.x + l.width, h = l.y + l.height;
    if (r < u + i && a > l.x - i && s < h + i && c > l.y - i) {
      const d = a - (l.x - i), f = u + i - r, g = c - (l.y - i), m = h + i - s, w = Math.min(d, f, g, m);
      w === d ? r -= d : w === f ? r += f : w === g ? s -= g : s += m;
    }
  }
  return { x: r, y: s };
}
function bu(e) {
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
    addNodes(t, n) {
      e._captureHistory();
      let o = Array.isArray(t) ? t : [t];
      j("init", `Adding ${o.length} node(s)`, o.map((c) => c.id));
      const i = /* @__PURE__ */ new Map();
      if (n?.center) {
        for (const c of o)
          i.set(c.id, { ...c.position });
        o = o.map((c) => ({ ...c, position: { x: -9999, y: -9999 } }));
      }
      const r = [];
      for (const c of o) {
        if (c.parentId) {
          const u = e._getChildValidation(c.parentId);
          if (u) {
            const h = e._nodeMap.get(c.parentId);
            if (h) {
              const d = [
                ...e.nodes.filter(
                  (g) => g.parentId === c.parentId
                ),
                ...r.filter(
                  (g) => g.parentId === c.parentId
                )
              ], f = Os(h, c, d, u);
              if (!f.valid) {
                e._config.onChildValidationFail && e._config.onChildValidationFail({
                  parent: h,
                  child: c,
                  operation: "add",
                  rule: f.rule,
                  message: f.message
                });
                continue;
              }
            }
          }
        }
        r.push(c);
      }
      o = r, e.nodes.push(...o);
      for (const c of o)
        c.dimensions && e._initialDimensions.set(c.id, { ...c.dimensions });
      e.nodes = st(e.nodes), e._rebuildNodeMap(), e._emit("nodes-change", { type: "add", nodes: o });
      const s = e._container ? ke.get(e._container) : void 0;
      if (s?.bridge)
        for (const c of o)
          s.bridge.pushLocalNodeAdd(c);
      n?.center && requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          for (const [c, u] of i) {
            const h = e.nodes.find((g) => g.id === c);
            if (!h) continue;
            const d = h.dimensions?.width ?? 0, f = h.dimensions?.height ?? 0;
            h.position.x = u.x - d / 2, h.position.y = u.y - f / 2;
          }
        });
      }), e._recomputeChildValidation();
      const l = /* @__PURE__ */ new Set();
      for (const c of o)
        if (c.parentId && e._nodeMap.get(c.parentId)?.childLayout) {
          if (c.order == null) {
            const h = e.nodes.filter(
              (d) => d.parentId === c.parentId && d.id !== c.id
            );
            c.order = h.length > 0 ? Math.max(...h.map((d) => d.order ?? 0)) + 1 : 0;
          }
          l.add(c.parentId);
        }
      const a = /* @__PURE__ */ new Set();
      for (const c of l) {
        let u = c, h = e._nodeMap.get(c)?.parentId;
        for (; h; ) {
          const d = e._nodeMap.get(h);
          d?.childLayout && (u = h), h = d?.parentId;
        }
        a.add(u);
      }
      for (const c of a) e.layoutChildren?.(c);
      e._scheduleAutoLayout();
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
    removeNodes(t) {
      e._captureHistory();
      const n = new Set(Array.isArray(t) ? t : [t]), o = /* @__PURE__ */ new Set();
      for (const h of [...n]) {
        const d = e._nodeMap.get(h);
        if (!d?.parentId || n.has(d.parentId)) continue;
        const f = e._getChildValidation(d.parentId);
        if (!f) continue;
        const g = e._nodeMap.get(d.parentId);
        if (!g) continue;
        const m = e.nodes.filter(
          (y) => y.parentId === d.parentId
        ), w = Hn(g, d, m, f);
        w.valid || (o.add(h), e._config.onChildValidationFail && e._config.onChildValidationFail({
          parent: g,
          child: d,
          operation: "remove",
          rule: w.rule,
          message: w.message
        }));
      }
      for (const h of o)
        n.delete(h);
      if (n.size === 0) return;
      const i = /* @__PURE__ */ new Map();
      for (const h of n) {
        const d = e._nodeMap.get(h);
        d?.parentId && i.set(h, d.parentId);
      }
      for (const h of [...n])
        for (const d of it(h, e.nodes))
          n.add(d);
      j("destroy", `Removing ${n.size} node(s)`, [...n]);
      const r = e.nodes.filter((h) => n.has(h.id));
      let s = [];
      e._config.reconnectOnDelete && (s = Fd(n, e.nodes, e.edges));
      const l = [];
      e.edges = e.edges.filter((h) => n.has(h.source) || n.has(h.target) ? (l.push(h.id), !1) : !0), s.length && (e.edges.push(...s), j("destroy", `Created ${s.length} reconnection edge(s)`)), e._rebuildEdgeMap(), e.nodes = e.nodes.filter((h) => !n.has(h.id)), e._rebuildNodeMap();
      for (const h of n)
        e.selectedNodes.delete(h), e._initialDimensions.delete(h);
      r.length && e._emit("nodes-change", { type: "remove", nodes: r }), s.length && e._emit("edges-change", { type: "add", edges: s });
      const a = e._container ? ke.get(e._container) : void 0;
      if (a?.bridge) {
        for (const h of n)
          a.bridge.pushLocalNodeRemove(h);
        for (const h of l)
          a.bridge.pushLocalEdgeRemove(h);
        for (const h of s)
          a.bridge.pushLocalEdgeAdd(h);
      }
      e._recomputeChildValidation();
      const c = /* @__PURE__ */ new Set();
      for (const h of n) {
        const d = i.get(h);
        d && e._nodeMap.get(d)?.childLayout && c.add(d);
      }
      const u = /* @__PURE__ */ new Set();
      for (const h of c) {
        let d = h, f = e._nodeMap.get(h)?.parentId;
        for (; f; ) {
          const g = e._nodeMap.get(f);
          g?.childLayout && (d = f), f = g?.parentId;
        }
        u.add(d);
      }
      for (const h of u) e.layoutChildren?.(h);
      e._scheduleAutoLayout();
    },
    /**
     * Look up a node by ID.
     */
    getNode(t) {
      return e._nodeMap.get(t);
    },
    /**
     * Get all nodes connected via outgoing edges from the given node.
     */
    getOutgoers(t) {
      return Eo(t, e.nodes, e.edges);
    },
    /**
     * Get all nodes connected via incoming edges to the given node.
     */
    getIncomers(t) {
      return Hd(t, e.nodes, e.edges);
    },
    /**
     * Get all edges connected to a node (both incoming and outgoing).
     */
    getConnectedEdges(t) {
      return Dd(t, e.edges);
    },
    /**
     * Check if two nodes are connected by an edge.
     * When `directed` is true, only checks source→target direction.
     */
    areNodesConnected(t, n, o = !1) {
      return zd(t, n, e.edges, o);
    },
    /**
     * Apply a node-level filter predicate.
     * Nodes that fail the predicate get `filtered = true`.
     */
    setNodeFilter(t) {
      const n = [], o = [];
      for (const i of e.nodes) {
        const r = !t(i);
        i.filtered = r, r ? n.push(i) : o.push(i);
      }
      j("filter", `Node filter applied: ${o.length} visible, ${n.length} filtered`), e._emit("node-filter-change", { filtered: n, visible: o });
    },
    /**
     * Clear node filter — restore all nodes to visible.
     */
    clearNodeFilter() {
      let t = !1;
      for (const n of e.nodes)
        n.filtered && (n.filtered = !1, t = !0);
      t && (j("filter", "Node filter cleared"), e._emit("node-filter-change", { filtered: [], visible: [...e.nodes] }));
    },
    /**
     * Get nodes whose bounding rect overlaps the given node.
     * Accepts either a FlowNode object or a node ID string.
     */
    getIntersectingNodes(t, n) {
      const o = typeof t == "string" ? e.nodes.find((i) => i.id === t) : t;
      return o ? wu(o, e.nodes, n) : [];
    },
    /**
     * Check if two nodes' bounding rects overlap.
     * Accepts either FlowNode objects or node ID strings.
     */
    isNodeIntersecting(t, n, o) {
      const i = typeof t == "string" ? e.nodes.find((s) => s.id === t) : t, r = typeof n == "string" ? e.nodes.find((s) => s.id === n) : n;
      return !i || !r ? !1 : vu(i, r, o);
    }
  };
}
function xu(e) {
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
    addEdges(t) {
      e._captureHistory();
      const n = e._config.defaultEdgeOptions, o = (Array.isArray(t) ? t : [t]).map(
        (r) => n ? { ...n, ...r } : r
      );
      j("edge", `Adding ${o.length} edge(s)`, o.map((r) => r.id)), e.edges.push(...o), e._rebuildEdgeMap(), e._emit("edges-change", { type: "add", edges: o });
      const i = e._container ? ke.get(e._container) : void 0;
      if (i?.bridge)
        for (const r of o)
          i.bridge.pushLocalEdgeAdd(r);
      e._scheduleAutoLayout();
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
    removeEdges(t) {
      e._captureHistory();
      const n = new Set(Array.isArray(t) ? t : [t]);
      j("edge", `Removing ${n.size} edge(s)`, [...n]);
      const o = e.edges.filter((r) => n.has(r.id));
      e.edges = e.edges.filter((r) => !n.has(r.id)), e._rebuildEdgeMap();
      for (const r of n)
        e.selectedEdges.delete(r);
      o.length && e._emit("edges-change", { type: "remove", edges: o });
      const i = e._container ? ke.get(e._container) : void 0;
      if (i?.bridge)
        for (const r of n)
          i.bridge.pushLocalEdgeRemove(r);
      e._scheduleAutoLayout();
    },
    /**
     * Look up an edge by ID.
     */
    getEdge(t) {
      return e._edgeMap.get(t);
    },
    /**
     * Get the visible SVG `<path>` element for an edge.
     * The visible path is the second `<path>` child (the first is the interaction hit area).
     */
    getEdgePathElement(t) {
      return e._container?.querySelector(`[data-flow-edge-id="${CSS.escape(t)}"]`)?.querySelector("path:nth-child(2)");
    },
    /**
     * Get the container element (SVG group) for an edge.
     */
    getEdgeElement(t) {
      return e._container?.querySelector(`[data-flow-edge-id="${CSS.escape(t)}"]`);
    }
  };
}
function Eu(e) {
  return {
    // ── Coordinate Transforms ─────────────────────────────────────────────
    /**
     * Convert screen coordinates (e.g. from a pointer event) to flow
     * coordinates, accounting for the current viewport pan and zoom.
     */
    screenToFlowPosition(t, n) {
      if (!e._container) return { x: t, y: n };
      const o = e._container.getBoundingClientRect();
      return Es(t, n, e.viewport, o);
    },
    /**
     * Convert flow coordinates to screen coordinates, accounting for the
     * current viewport pan and zoom.
     */
    flowToScreenPosition(t, n) {
      if (!e._container) return { x: t, y: n };
      const o = e._container.getBoundingClientRect();
      return rd(t, n, e.viewport, o);
    },
    // ── Fit & Bounds ──────────────────────────────────────────────────────
    /**
     * Fit all visible nodes into the viewport.
     *
     * Defers via `requestAnimationFrame` if any node lacks measured
     * dimensions (up to 10 retries) to give the DOM time to render.
     */
    fitView(t, n = 0) {
      if (e.nodes.some((r) => !r.dimensions)) {
        n < 10 && requestAnimationFrame(() => this.fitView(t, n + 1));
        return;
      }
      const o = e.nodes.filter((r) => !r.hidden), i = kt(Dn(o, e._nodeMap, e._config.nodeOrigin), e._config.nodeOrigin);
      this.fitBounds(i, t), e._announcer?.handleEvent("fit-view", {});
    },
    /**
     * Fit a specific rectangle into the viewport.
     *
     * If `duration` is specified, the transition is animated via
     * `ctx.animate()` (cross-mixin dependency). Otherwise the viewport
     * is set directly via `ctx._panZoom`.
     */
    fitBounds(t, n) {
      const o = e._container ? { width: e._container.clientWidth, height: e._container.clientHeight } : { width: 800, height: 600 }, i = Tn(
        t,
        o.width,
        o.height,
        e._config.minZoom ?? 0.5,
        e._config.maxZoom ?? 2,
        n?.padding ?? bo
      );
      j("viewport", "fitBounds", { rect: t, viewport: i });
      const r = n?.duration ?? 0;
      r > 0 ? e.animate?.(
        { viewport: { pan: { x: i.x, y: i.y }, zoom: i.zoom } },
        { duration: r }
      ) : e._panZoom?.setViewport(i);
    },
    /**
     * Get the bounding rectangle of the specified nodes (or all visible
     * nodes if no IDs are provided).
     */
    getNodesBounds(t) {
      let n;
      return t ? n = t.map((o) => e.getNode(o)).filter((o) => !!o) : n = e.nodes.filter((o) => !o.hidden), kt(Dn(n, e._nodeMap, e._config.nodeOrigin), e._config.nodeOrigin);
    },
    /**
     * Compute the viewport (pan + zoom) that frames the given bounds
     * within the container, respecting min/max zoom and padding.
     */
    getViewportForBounds(t, n) {
      const o = e._container;
      return o ? Tn(
        t,
        o.clientWidth,
        o.clientHeight,
        e._config.minZoom ?? 0.5,
        e._config.maxZoom ?? 2,
        n ?? bo
      ) : { x: 0, y: 0, zoom: 1 };
    },
    // ── Viewport Mutation ─────────────────────────────────────────────────
    /**
     * Set the viewport programmatically (pan and/or zoom).
     */
    setViewport(t, n) {
      j("viewport", "setViewport", t), e._panZoom?.setViewport(t, n);
    },
    /**
     * Zoom in by `ZOOM_STEP_FACTOR`, clamped to `maxZoom`.
     */
    zoomIn(t) {
      const n = e._config.maxZoom ?? 2, o = Math.min(e.viewport.zoom * hi, n);
      j("viewport", "zoomIn", { from: e.viewport.zoom, to: o }), e._panZoom?.setViewport({ ...e.viewport, zoom: o }, t);
    },
    /**
     * Zoom out by `ZOOM_STEP_FACTOR`, clamped to `minZoom`.
     */
    zoomOut(t) {
      const n = e._config.minZoom ?? 0.5, o = Math.max(e.viewport.zoom / hi, n);
      j("viewport", "zoomOut", { from: e.viewport.zoom, to: o }), e._panZoom?.setViewport({ ...e.viewport, zoom: o }, t);
    },
    /**
     * Center the viewport on flow coordinate `(x, y)` at the given zoom
     * level (defaults to the current zoom).
     */
    setCenter(t, n, o, i) {
      const r = e._container;
      if (!r) return;
      const s = o ?? e.viewport.zoom, l = r.clientWidth / 2 - t * s, a = r.clientHeight / 2 - n * s;
      j("viewport", "setCenter", { x: t, y: n, zoom: s }), e._panZoom?.setViewport({ x: l, y: a, zoom: s }, i);
    },
    /**
     * Pan the viewport by a delta `(dx, dy)`.
     */
    panBy(t, n, o) {
      j("viewport", "panBy", { dx: t, dy: n }), e._panZoom?.setViewport(
        { x: e.viewport.x + t, y: e.viewport.y + n, zoom: e.viewport.zoom },
        o
      );
    },
    // ── Interactivity Toggle ──────────────────────────────────────────────
    /**
     * Toggle pan/zoom interactivity on and off.
     */
    toggleInteractive() {
      e.isInteractive = !e.isInteractive, j("interactive", "toggleInteractive", { isInteractive: e.isInteractive }), e._panZoom?.update({
        pannable: e.isInteractive,
        zoomable: e.isInteractive
      });
    },
    // ── Color Mode ────────────────────────────────────────────────────────
    /**
     * The current resolved color mode ('light' | 'dark' | undefined).
     */
    get colorMode() {
      return e._colorModeHandle?.resolved;
    },
    // ── Container Dimensions ──────────────────────────────────────────────
    /**
     * Get the current width and height of the container element.
     */
    getContainerDimensions() {
      return {
        width: e._container?.clientWidth ?? 0,
        height: e._container?.clientHeight ?? 0
      };
    },
    // ── Panel Operations ──────────────────────────────────────────────────
    /**
     * Reset all panels by dispatching a `flow-panel-reset` CustomEvent
     * on the container and emitting a `panel-reset` event.
     */
    resetPanels() {
      j("panel", "resetPanels"), e._container?.dispatchEvent(new CustomEvent("flow-panel-reset")), e._emit("panel-reset");
    }
  };
}
let dt = null;
const Cu = 20;
function Lo(e) {
  return JSON.parse(JSON.stringify(e));
}
function Pi(e) {
  return `${e}-copy-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
}
function Xs(e, t) {
  const n = e.filter((r) => r.selected), o = new Set(n.map((r) => r.id)), i = t.filter(
    (r) => r.selected || o.has(r.source) && o.has(r.target)
  );
  return dt = {
    nodes: Lo(n),
    edges: Lo(i),
    pasteCount: 0
  }, { nodeCount: n.length, edgeCount: i.length };
}
function Su() {
  if (!dt || dt.nodes.length === 0) return null;
  dt.pasteCount++;
  const e = dt.pasteCount * Cu, t = /* @__PURE__ */ new Map(), n = dt.nodes.map((i) => {
    const r = Pi(i.id);
    return t.set(i.id, r), {
      ...i,
      id: r,
      data: Lo(i.data),
      position: { x: i.position.x + e, y: i.position.y + e },
      selected: !0
    };
  }), o = dt.edges.map((i) => ({
    ...i,
    id: Pi(i.id),
    source: t.get(i.source),
    target: t.get(i.target),
    selected: !0
  }));
  return { nodes: n, edges: o };
}
function Lu(e, t) {
  const n = Xs(e, t);
  return { nodeIds: e.filter((i) => i.selected).map((i) => i.id), ...n };
}
function Mu(e) {
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
      if (!(e.selectedNodes.size === 0 && e.selectedEdges.size === 0 && e.selectedRows.size === 0)) {
        j("selection", "Deselecting all");
        for (const t of e.selectedNodes) {
          const n = e.getNode(t);
          n && (n.selected = !1);
        }
        for (const t of e.selectedEdges) {
          const n = e.getEdge(t);
          n && (n.selected = !1);
        }
        e.selectedNodes.clear(), e.selectedEdges.clear(), e.selectedRows.clear(), e._container?.querySelectorAll(".flow-node-selected, .flow-edge-selected, .flow-row-selected").forEach((t) => {
          t.classList.remove("flow-node-selected", "flow-edge-selected", "flow-row-selected");
        }), e._emitSelectionChange();
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
      const t = [...e.selectedNodes].filter((a) => {
        const c = e.getNode(a);
        return c ? Yd(c) : !1;
      }), n = [...e.selectedEdges].filter((a) => e.getEdge(a)?.deletable !== !1);
      let o = t.map((a) => e.getNode(a)).filter(Boolean);
      const i = new Set(t), r = e.edges.filter(
        (a) => i.has(a.source) || i.has(a.target)
      ), s = /* @__PURE__ */ new Map();
      for (const a of r) s.set(a.id, a);
      for (const a of n) {
        const c = e.getEdge(a);
        c && s.set(c.id, c);
      }
      const l = [...s.values()];
      if (o = o.filter((a) => {
        if (!a.parentId || o.some((f) => f.id === a.parentId)) return !0;
        const c = e._getChildValidation(a.parentId);
        if (!c) return !0;
        const u = e.getNode(a.parentId);
        if (!u) return !0;
        const h = e.nodes.filter(
          (f) => f.parentId === a.parentId
        ), d = Hn(u, a, h, c);
        return !d.valid && e._config.onChildValidationFail && e._config.onChildValidationFail({
          parent: u,
          child: a,
          operation: "remove",
          rule: d.rule,
          message: d.message
        }), d.valid;
      }), !(o.length === 0 && l.length === 0)) {
        if (e._config?.onBeforeDelete) {
          const a = await e._config.onBeforeDelete({
            nodes: o,
            edges: l
          });
          if (a === !1) {
            j("delete", "onBeforeDelete cancelled deletion");
            return;
          }
          e._captureHistory(), e._suspendHistory();
          try {
            if (a.nodes.length > 0 && (j("delete", `onBeforeDelete approved ${a.nodes.length} node(s)`), e.removeNodes(a.nodes.map((c) => c.id))), a.edges.length > 0) {
              const c = a.edges.map((u) => u.id).filter((u) => e.edges.some((h) => h.id === u));
              c.length > 0 && (j("delete", `onBeforeDelete approved ${c.length} edge(s)`), e.removeEdges(c));
            }
            e._recomputeChildValidation();
            for (const c of e.selectedNodes)
              e.nodes.some((u) => u.id === c) || e.selectedNodes.delete(c);
            for (const c of e.selectedEdges)
              e.edges.some((u) => u.id === c) || e.selectedEdges.delete(c);
          } finally {
            e._resumeHistory();
          }
          return;
        }
        e._captureHistory(), e._suspendHistory();
        try {
          if (o.length > 0 && (j("delete", `Deleting ${o.length} selected node(s)`), e.removeNodes(o.map((a) => a.id))), n.length > 0) {
            const a = n.filter(
              (c) => e.edges.some((u) => u.id === c)
            );
            a.length > 0 && (j("delete", `Deleting ${a.length} selected edge(s)`), e.removeEdges(a));
          }
          e._recomputeChildValidation();
          for (const a of e.selectedNodes)
            e.nodes.some((c) => c.id === a) || e.selectedNodes.delete(a);
          for (const a of e.selectedEdges)
            e.edges.some((c) => c.id === a) || e.selectedEdges.delete(a);
        } finally {
          e._resumeHistory();
        }
      }
    },
    // ── Clipboard Operations ─────────────────────────────────────────────
    /**
     * Copy currently selected nodes and their internal edges to the
     * module-level clipboard. Emits a `copy` event.
     */
    copy() {
      const t = Xs(e.nodes, e.edges);
      t.nodeCount > 0 && (j("clipboard", `Copied ${t.nodeCount} node(s) and ${t.edgeCount} edge(s)`), e._emit("copy", t));
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
      const t = Su();
      if (t) {
        e._captureHistory(), e.deselectAll(), e.nodes.push(...t.nodes), e.nodes = st(e.nodes), e._rebuildNodeMap(), e.edges.push(...t.edges), e._rebuildEdgeMap();
        for (const n of t.nodes)
          e.selectedNodes.add(n.id);
        for (const n of t.edges)
          e.selectedEdges.add(n.id);
        e._emitSelectionChange(), e._emit("nodes-change", { type: "add", nodes: t.nodes }), e._emit("edges-change", { type: "add", edges: t.edges }), e._emit("paste", { nodes: t.nodes, edges: t.edges }), j("clipboard", `Pasted ${t.nodes.length} node(s) and ${t.edges.length} edge(s)`), e.$nextTick(() => {
          for (const n of t.nodes)
            e._container?.querySelector(`[data-flow-node-id="${CSS.escape(n.id)}"]`)?.classList.add("flow-node-selected");
          for (const n of t.edges)
            e._container?.querySelector(`[data-flow-edge-id="${CSS.escape(n.id)}"]`)?.classList.add("flow-edge-selected");
        });
      }
    },
    /**
     * Copy selected nodes to the clipboard, then delete them.
     * Emits a `cut` event.
     */
    async cut() {
      if (e.selectedNodes.size === 0) return;
      const t = Lu(e.nodes, e.edges);
      t.nodeCount !== 0 && (await e._deleteSelected(), e._emit("cut", { nodeCount: t.nodeCount, edgeCount: t.edgeCount }), j("clipboard", `Cut ${t.nodeCount} node(s)`));
    }
  };
}
function Pu(e) {
  return {
    // ── Save / Restore ────────────────────────────────────────────
    /**
     * Serialize the current canvas state (nodes, edges, viewport) as a
     * deep-cloned plain object. Emits a `save` event with the snapshot.
     */
    toObject() {
      const t = {
        nodes: JSON.parse(JSON.stringify(e.nodes)),
        edges: JSON.parse(JSON.stringify(e.edges)),
        viewport: { ...e.viewport }
      };
      return e._emit("save", t), t;
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
    fromObject(t) {
      if (j("store", "fromObject: restoring state", {
        nodes: t.nodes?.length ?? 0,
        edges: t.edges?.length ?? 0,
        viewport: !!t.viewport
      }), t.nodes && (e.nodes = st(JSON.parse(JSON.stringify(t.nodes)))), t.edges) {
        const n = JSON.parse(JSON.stringify(t.edges)), o = new Map(e.edges.map((r) => [r.id, r])), i = [];
        for (const r of n) {
          const s = o.get(r.id);
          if (s) {
            for (const l of Object.keys(s))
              l !== "id" && !(l in r) && delete s[l];
            Object.assign(s, r), i.push(s);
          } else
            i.push(r);
        }
        e.edges = i;
      }
      if (e._rebuildNodeMap(), e._rebuildEdgeMap(), t.viewport) {
        const n = { ...e.viewport, ...t.viewport };
        e._panZoom?.setViewport(n);
      }
      e.deselectAll(), e._emit("restore", t), e._scheduleAutoLayout(), requestAnimationFrame(() => {
        e._layoutAnimTick++;
      });
    },
    /**
     * Reset the canvas to its initial configuration state.
     */
    $reset() {
      j("store", "$reset: restoring initial config"), this.fromObject({
        nodes: e._config.nodes ?? [],
        edges: e._config.edges ?? [],
        viewport: e._config.viewport ?? { x: 0, y: 0, zoom: 1 }
      });
    },
    /**
     * Clear all nodes and edges, resetting the viewport to origin.
     */
    $clear() {
      j("store", "$clear: emptying canvas"), this.fromObject({
        nodes: [],
        edges: [],
        viewport: { x: 0, y: 0, zoom: 1 }
      });
    },
    // ── Undo / Redo ────────────────────────────────────────────
    /**
     * Undo the last structural change by popping a snapshot from the
     * history past stack. Rebuilds maps and deselects all after applying.
     */
    undo() {
      if (!e._history) return;
      const t = e._history.undo({ nodes: e.nodes, edges: e.edges });
      t && (e.nodes = st(t.nodes), e.edges = t.edges, e._rebuildNodeMap(), e._rebuildEdgeMap(), e.deselectAll(), requestAnimationFrame(() => {
        e._layoutAnimTick++;
      }), j("history", "Undo applied", { nodes: t.nodes.length, edges: t.edges.length }));
    },
    /**
     * Redo the last undone change by popping a snapshot from the
     * history future stack. Rebuilds maps and deselects all after applying.
     */
    redo() {
      if (!e._history) return;
      const t = e._history.redo({ nodes: e.nodes, edges: e.edges });
      t && (e.nodes = st(t.nodes), e.edges = t.edges, e._rebuildNodeMap(), e._rebuildEdgeMap(), e.deselectAll(), requestAnimationFrame(() => {
        e._layoutAnimTick++;
      }), j("history", "Redo applied", { nodes: t.nodes.length, edges: t.edges.length }));
    },
    /**
     * Whether an undo operation is available.
     */
    get canUndo() {
      return e._history?.canUndo ?? !1;
    },
    /**
     * Whether a redo operation is available.
     */
    get canRedo() {
      return e._history?.canRedo ?? !1;
    }
  };
}
function ku(e, t) {
  return e * (1 - t);
}
function Nu(e, t) {
  return e * t;
}
function Tu(e, t) {
  return t === "in" ? e : 1 - e;
}
function Iu(e, t, n) {
  const o = e.getTotalLength();
  e.style.strokeDasharray = String(o);
  const i = n === "in" ? ku(o, t) : Nu(o, t);
  e.style.strokeDashoffset = String(i), (n === "in" && t < 1 || n === "out") && (e.style.setProperty("marker-start", "none"), e.style.setProperty("marker-end", "none"));
}
function $u(e) {
  e.style.removeProperty("stroke-dasharray"), e.style.removeProperty("stroke-dashoffset"), e.style.removeProperty("marker-start"), e.style.removeProperty("marker-end");
}
function Au(e, t, n) {
  e.style.opacity = String(Tu(t, n));
}
function Du(e) {
  e.style.removeProperty("opacity");
}
const Ue = Math.PI * 2;
function Vo(e) {
  if (typeof document > "u" || typeof document.createElementNS != "function")
    return null;
  const t = document.createElementNS("http://www.w3.org/2000/svg", "path");
  t.setAttribute("d", e);
  const n = t.getTotalLength();
  return (o) => {
    const i = t.getPointAtLength(o * n);
    return { x: i.x, y: i.y };
  };
}
function Gg(e) {
  const { cx: t, cy: n, offset: o = 0, clockwise: i = !0 } = e, r = e.rx ?? e.radius ?? 100, s = e.ry ?? e.radius ?? 100, l = i ? 1 : -1;
  return (a) => ({
    x: t + r * Math.cos(Ue * a * l + o * Ue),
    y: n + s * Math.sin(Ue * a * l + o * Ue)
  });
}
function Jg(e) {
  const { startX: t, startY: n, endX: o, endY: i, amplitude: r = 30, frequency: s = 1, offset: l = 0 } = e, a = o - t, c = i - n, u = Math.sqrt(a * a + c * c), h = u > 0 ? a / u : 1, f = -(u > 0 ? c / u : 0), g = h;
  return (m) => {
    const w = t + a * m, y = n + c * m, M = r * Math.sin(Ue * s * m + l * Ue);
    return { x: w + f * M, y: y + g * M };
  };
}
function Qg(e, t) {
  const n = Vo(e);
  if (!n) return null;
  const { reverse: o = !1, startAt: i = 0, endAt: r = 1 } = t ?? {}, s = r - i;
  return (l) => {
    let a = i + l * s;
    return o && (a = r - l * s), n(a);
  };
}
function ep(e) {
  const { cx: t, cy: n, radius: o, angle: i = 60, offset: r = 0 } = e, s = i * Math.PI / 180;
  return (l) => {
    const a = s * Math.sin(Ue * l + r * Ue);
    return {
      x: t + o * Math.sin(a),
      y: n + o * Math.cos(a)
    };
  };
}
function tp(e) {
  const { originX: t, originY: n, range: o = 20, speed: i = 1, seed: r = 0 } = e, s = 1 + r % 7 * 0.3, l = 1.3 + r % 11 * 0.2, a = 0.7 + r % 13 * 0.25, c = 1.1 + r % 17 * 0.15;
  return (u) => {
    const h = u * i * Ue, d = (Math.sin(s * h) + Math.sin(l * h * 1.3)) / 2, f = (Math.sin(a * h * 0.9) + Math.sin(c * h * 1.1)) / 2;
    return { x: t + d * o, y: n + f * o };
  };
}
function np(e, t) {
  const n = t?.from ?? 0;
  return (o, i) => n + o * e;
}
function Hu(e) {
  return {
    position: { ...e.position },
    class: e.class,
    style: typeof e.style == "string" ? e.style : e.style ? { ...e.style } : void 0,
    data: JSON.parse(JSON.stringify(e.data)),
    dimensions: e.dimensions ? { ...e.dimensions } : void 0,
    selected: e.selected,
    zIndex: e.zIndex
  };
}
function Ru(e) {
  return {
    animated: e.animated,
    color: e.color,
    class: e.class,
    label: e.label,
    strokeWidth: e.strokeWidth
  };
}
function zu(e, t) {
  e.position.x = t.position.x, e.position.y = t.position.y, e.class = t.class, e.style = t.style, e.data = JSON.parse(JSON.stringify(t.data)), e.dimensions = t.dimensions ? { ...t.dimensions } : e.dimensions, e.selected = t.selected, e.zIndex = t.zIndex;
}
class Fu {
  constructor(t) {
    this._engine = new Ms(), this._entries = [], this._state = "idle", this._reversed = !1, this._loopCount = -1, this._lockEnabled = !1, this._locked = !1, this._respectReducedMotion = void 0, this._listeners = /* @__PURE__ */ new Map(), this._context = {}, this._activeHandles = [], this._initialSnapshot = /* @__PURE__ */ new Map(), this._initialEdgeSnapshot = /* @__PURE__ */ new Map(), this._playResolve = null, this._canvas = t;
  }
  // ── Public API ───────────────────────────────────────────────────────
  get state() {
    return this._state;
  }
  get locked() {
    return this._locked;
  }
  step(t) {
    return this._entries.push({ type: "step", config: t }), this;
  }
  parallel(t) {
    return this._entries.push({ type: "parallel", configs: t }), this;
  }
  pause(t) {
    return this._entries.push({ type: "pause", callback: t }), this;
  }
  play() {
    return new Promise((t) => {
      this._playResolve = t, this._state = "playing", this._lockEnabled && (this._locked = !0), this._captureInitialSnapshot(), this._emit("play"), this._context = {}, this._runEntries(t);
    });
  }
  stop() {
    this._stopAll(), this._state = "stopped", this._locked = !1, this._emit("stop"), this._playResolve?.(), this._playResolve = null;
  }
  reset(t) {
    if (this._stopAll(), this._restoreInitialSnapshot(), this._state = "idle", this._locked = !1, this._emit("reset"), t)
      return this.play();
  }
  reverse() {
    return this._reversed = !this._reversed, this._emit("reverse"), this;
  }
  loop(t) {
    return this._loopCount = t ?? 0, this;
  }
  lock(t) {
    return this._lockEnabled = t ?? !0, this;
  }
  respectReducedMotion(t) {
    return this._respectReducedMotion = t ?? !0, this;
  }
  on(t, n) {
    return this._listeners.has(t) || this._listeners.set(t, /* @__PURE__ */ new Set()), this._listeners.get(t).add(n), this;
  }
  /** Check if reduced motion is active (OS preference + not opted out). */
  _isReducedMotion() {
    return this._respectReducedMotion === !1 ? !1 : (typeof globalThis.matchMedia == "function" ? globalThis.matchMedia("(prefers-reduced-motion: reduce)") : null)?.matches ?? !1;
  }
  // ── Internal: event emission ────────────────────────────────────────
  _emit(t, n) {
    const o = this._listeners.get(t);
    if (o)
      for (const i of o)
        i(n);
  }
  // ── Internal: snapshot management ───────────────────────────────────
  _captureInitialSnapshot() {
    if (!(this._initialSnapshot.size > 0))
      for (const t of this._entries)
        this._captureEntryTargets(t);
  }
  _captureEntryTargets(t) {
    if (t.type === "pause") return;
    const n = t.type === "parallel" ? t.configs : [t.config];
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
  _captureStepTargets(t) {
    if (t.nodes) {
      for (const n of t.nodes)
        if (!this._initialSnapshot.has(n)) {
          const o = this._canvas.getNode(n);
          o && this._initialSnapshot.set(n, Hu(o));
        }
    }
    if (t.edges) {
      for (const n of t.edges)
        if (!this._initialEdgeSnapshot.has(n)) {
          const o = this._canvas.getEdge(n);
          o && this._initialEdgeSnapshot.set(n, Ru(o));
        }
    }
  }
  _restoreInitialSnapshot() {
    for (const [t, n] of this._initialSnapshot) {
      const o = this._canvas.getNode(t);
      o && zu(o, n);
    }
  }
  // ── Internal: handle management ─────────────────────────────────────
  _stopAll() {
    for (const t of this._activeHandles)
      t.stop();
    this._activeHandles = [];
  }
  // ── Internal: entry execution ───────────────────────────────────────
  async _runEntries(t) {
    const n = this._reversed ? [...this._entries].reverse() : this._entries;
    let o = this._loopCount;
    const i = async () => {
      for (let r = 0; r < n.length; r++) {
        if (this._state === "stopped") return;
        const s = n[r];
        if (s.type === "pause") {
          await this._executePause(s);
          continue;
        }
        if (s.type === "parallel") {
          await this._executeParallel(s.configs, r);
          continue;
        }
        const l = s.config, a = typeof l == "function" ? l(this._makeContext(r)) : l;
        a.parallel ? await this._executeParallelSteps(a.parallel, r) : await this._executeStep(a, r);
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
            t();
            return;
          }
        } else if (o > 0) {
          if (o--, this._restoreInitialSnapshot(), this._emit("loop", { iteration: this._loopCount - o }), await i(), o <= 0) break;
        } else
          break;
    }
    this._state !== "stopped" && (this._state = "idle", this._locked = !1, this._emit("complete")), t();
  }
  _makeContext(t, n) {
    return {
      ...this._context,
      stepIndex: t,
      stepId: n
    };
  }
  // ── Internal: pause execution ───────────────────────────────────────
  _executePause(t) {
    return new Promise((n) => {
      this._state = "paused", this._lockEnabled && (this._locked = !1), this._emit("pause");
      const o = (i) => {
        i && Object.assign(this._context, i), this._state = "playing", this._lockEnabled && (this._locked = !0), this._emit("resume"), n();
      };
      t.callback?.(o);
    });
  }
  // ── Internal: parallel execution ────────────────────────────────────
  async _executeParallel(t, n) {
    const o = t.map(
      (i) => typeof i == "function" ? i(this._makeContext(n)) : i
    );
    await this._executeParallelSteps(o, n);
  }
  async _executeParallelSteps(t, n) {
    const o = t.map((i) => this._executeStep(i, n));
    await Promise.all(o);
  }
  // ── Internal: single step execution ─────────────────────────────────
  async _executeStep(t, n) {
    const o = this._isReducedMotion(), i = o ? 0 : t.duration ?? 300, r = o ? 0 : t.delay ?? 0, s = Ps(t.easing), l = this._makeContext(n, t.id);
    this._emit("step", { index: n, id: t.id }), t.onStart?.(l);
    let a, c;
    if (t.nodes) {
      a = [];
      for (const p of t.nodes)
        this._canvas.getNode(p) ? a.push(p) : this._canvas.debug && console.warn(`[AlpineFlow] Animation step "${t.id ?? n}": node "${p}" not found, skipping`);
    }
    if (t.edges) {
      c = [];
      for (const p of t.edges)
        this._canvas.getEdge(p) ? c.push(p) : this._canvas.debug && console.warn(`[AlpineFlow] Animation step "${t.id ?? n}": edge "${p}" not found, skipping`);
    }
    const u = t.nodes && t.nodes.length > 0, h = t.edges && t.edges.length > 0, d = !!(t.viewport || t.fitView || t.panTo), f = !!(t.addEdges?.length || t.removeEdges?.length), g = u && (!a || a.length === 0), m = h && (!c || c.length === 0);
    if (g && m && !d && !f)
      return t.onProgress?.(1, l), t.onComplete?.(l), this._emit("step-complete"), Promise.resolve();
    if (g && !h && !d && !f)
      return t.onProgress?.(1, l), t.onComplete?.(l), this._emit("step-complete"), Promise.resolve();
    if (m && !u && !d && !f)
      return t.onProgress?.(1, l), t.onComplete?.(l), this._emit("step-complete"), Promise.resolve();
    const w = /* @__PURE__ */ new Map(), y = /* @__PURE__ */ new Map(), M = /* @__PURE__ */ new Map();
    if (a)
      for (const p of a) {
        const H = this._canvas.getNode(p);
        H && (w.set(p, { ...H.position }), H.dimensions && t.dimensions && y.set(p, { ...H.dimensions }), t.style && H.style && M.set(p, Zt(H.style)));
      }
    const L = /* @__PURE__ */ new Map(), b = /* @__PURE__ */ new Map();
    if (c)
      for (const p of c) {
        const H = this._canvas.getEdge(p);
        H && (t.edgeStrokeWidth !== void 0 && H.strokeWidth !== void 0 && L.set(p, H.strokeWidth), t.edgeColor !== void 0 && H.color !== void 0 && b.set(p, H.color));
      }
    let D = null;
    t.followPath && (typeof t.followPath == "function" ? D = t.followPath : (D = Vo(t.followPath), !D && this._canvas.debug && console.warn("[AlpineFlow] SVG path resolution unavailable (no DOM), followPath string ignored")));
    let k = null;
    if (t.guidePath?.visible && typeof t.followPath == "string" && typeof document < "u") {
      const p = this._canvas.getEdgeSvgElement?.();
      p && (k = document.createElementNS("http://www.w3.org/2000/svg", "path"), k.setAttribute("d", t.followPath), k.classList.add("flow-guide-path"), t.guidePath.class && k.classList.add(t.guidePath.class), p.appendChild(k));
    }
    let A = null, _ = null;
    d && this._canvas.viewport && (A = { ...this._canvas.viewport }, _ = this._resolveTargetViewport(t));
    const S = t.edgeTransition ?? "none", $ = t.addEdges?.map((p) => p.id) ?? [], v = t.removeEdges?.filter((p) => this._canvas.getEdge(p)).slice() ?? [];
    if (i === 0) {
      if (r > 0)
        return new Promise((p) => {
          const H = setTimeout(() => {
            this._applyStepFinal(t), t.onProgress?.(1, l), t.onComplete?.(l), this._emit("step-complete"), p();
          }, r), E = {
            stop() {
              clearTimeout(H);
            }
          };
          this._activeHandles.push(E);
        });
      if (D && a) {
        const p = D(1);
        for (const H of a) {
          const E = this._canvas.getNode(H);
          E && (E.position.x = p.x, E.position.y = p.y);
        }
      }
      return this._applyStepFinal(t), k && t.guidePath?.autoRemove !== !1 && k.remove(), t.onProgress?.(1, l), t.onComplete?.(l), this._emit("step-complete"), Promise.resolve();
    }
    return t.addEdges && this._addEdges(t.addEdges), S !== "none" && $.length && t.addEdges && await new Promise((p) => {
      queueMicrotask(() => queueMicrotask(() => {
        S === "draw" ? this._applyEdgeDrawTransition($, 0, "in") : S === "fade" && this._applyEdgeFadeTransition($, 0, "in"), p();
      }));
    }), D ? new Promise((p) => {
      const H = this._engine.register((E) => {
        if (this._state === "stopped")
          return p(), !0;
        const N = Math.min(E / i, 1), P = s(N);
        if (a) {
          const z = D(P);
          for (const x of a) {
            const C = this._canvas.getNode(x);
            C && (C.position.x = z.x, C.position.y = z.y);
          }
        }
        if (a && t.dimensions)
          for (const z of a) {
            const x = this._canvas.getNode(z), C = y.get(z);
            !x || !C || !x.dimensions || (t.dimensions.width !== void 0 && (x.dimensions.width = nt(C.width, t.dimensions.width, P)), t.dimensions.height !== void 0 && (x.dimensions.height = nt(C.height, t.dimensions.height, P)));
          }
        if (a && t.style) {
          const z = Zt(t.style);
          for (const x of a) {
            const C = this._canvas.getNode(x), T = M.get(x);
            C && T && (C.style = ks(T, z, P));
          }
        }
        if (c && t.edgeStrokeWidth !== void 0)
          for (const z of c) {
            const x = this._canvas.getEdge(z), C = L.get(z);
            x && (C !== void 0 ? x.strokeWidth = nt(C, t.edgeStrokeWidth, P) : x.strokeWidth = t.edgeStrokeWidth);
          }
        if (c && t.edgeColor !== void 0)
          for (const z of c) {
            const x = this._canvas.getEdge(z), C = b.get(z);
            x && (C !== void 0 && typeof C == "string" ? x.color = Fo(C, t.edgeColor, P) : x.color = t.edgeColor);
          }
        if (A && _ && this._canvas.viewport) {
          const z = yd(A, _, P, {
            minZoom: this._canvas.minZoom,
            maxZoom: this._canvas.maxZoom
          });
          this._canvas.viewport.x = z.x, this._canvas.viewport.y = z.y, this._canvas.viewport.zoom = z.zoom;
        }
        return S === "draw" ? ($.length && this._applyEdgeDrawTransition($, P, "in"), v.length && this._applyEdgeDrawTransition(v, P, "out")) : S === "fade" && ($.length && this._applyEdgeFadeTransition($, P, "in"), v.length && this._applyEdgeFadeTransition(v, P, "out")), t.onProgress?.(N, l), N >= 1 ? (S === "draw" ? (this._cleanupEdgeDrawTransition($), this._cleanupEdgeDrawTransition(v)) : S === "fade" && (this._cleanupEdgeFadeTransition($), this._cleanupEdgeFadeTransition(v)), v.length && this._removeEdges(v), this._applyStepInstant(t), k && t.guidePath?.autoRemove !== !1 && k.remove(), t.onProgress?.(1, l), t.onComplete?.(l), this._emit("step-complete"), p(), !0) : !1;
      }, r);
      this._activeHandles.push(H);
    }) : new Promise((p) => {
      const H = {};
      if (a) {
        H.nodes = {};
        for (const N of a) {
          const P = {};
          t.position && (P.position = { ...t.position }), t.dimensions && (P.dimensions = { ...t.dimensions }), t.style !== void 0 && (P.style = t.style), t.class !== void 0 && (P.class = t.class), t.data !== void 0 && (P.data = t.data), t.selected !== void 0 && (P.selected = t.selected), t.zIndex !== void 0 && (P.zIndex = t.zIndex), H.nodes[N] = P;
        }
      }
      if (c) {
        H.edges = {};
        for (const N of c) {
          const P = {};
          t.edgeColor !== void 0 && (P.color = t.edgeColor), t.edgeStrokeWidth !== void 0 && (P.strokeWidth = t.edgeStrokeWidth), t.edgeLabel !== void 0 && (P.label = t.edgeLabel), t.edgeAnimated !== void 0 && (P.animated = t.edgeAnimated), t.edgeClass !== void 0 && (P.class = t.edgeClass), H.edges[N] = P;
        }
      }
      _ && A && (H.viewport = {
        pan: { x: _.x, y: _.y },
        zoom: _.zoom
      });
      const E = Object.keys(H.nodes || {}).length > 0 || Object.keys(H.edges || {}).length > 0 || H.viewport;
      if (!E && !$.length && !v.length) {
        t.onProgress?.(1, l), t.onComplete?.(l), this._emit("step-complete"), p();
        return;
      }
      if (E) {
        const N = this._canvas.animate(H, {
          duration: i,
          easing: t.easing,
          delay: r,
          onProgress: (P) => {
            if (this._state === "stopped") {
              N.stop(), p();
              return;
            }
            S === "draw" ? ($.length && this._applyEdgeDrawTransition($, P, "in"), v.length && this._applyEdgeDrawTransition(v, P, "out")) : S === "fade" && ($.length && this._applyEdgeFadeTransition($, P, "in"), v.length && this._applyEdgeFadeTransition(v, P, "out")), t.onProgress?.(P, l);
          },
          onComplete: () => {
            S === "draw" ? (this._cleanupEdgeDrawTransition($), this._cleanupEdgeDrawTransition(v)) : S === "fade" && (this._cleanupEdgeFadeTransition($), this._cleanupEdgeFadeTransition(v)), v.length && this._removeEdges(v), this._applyStepInstant(t), k && t.guidePath?.autoRemove !== !1 && k.remove(), t.onProgress?.(1, l), t.onComplete?.(l), this._emit("step-complete"), p();
          }
        });
        this._activeHandles.push({ stop: () => N.stop() });
      } else {
        const N = this._engine.register((P) => {
          if (this._state === "stopped")
            return p(), !0;
          const z = Math.min(P / i, 1);
          return S === "draw" ? ($.length && this._applyEdgeDrawTransition($, z, "in"), v.length && this._applyEdgeDrawTransition(v, z, "out")) : S === "fade" && ($.length && this._applyEdgeFadeTransition($, z, "in"), v.length && this._applyEdgeFadeTransition(v, z, "out")), t.onProgress?.(z, l), z >= 1 ? (S === "draw" ? (this._cleanupEdgeDrawTransition($), this._cleanupEdgeDrawTransition(v)) : S === "fade" && (this._cleanupEdgeFadeTransition($), this._cleanupEdgeFadeTransition(v)), v.length && this._removeEdges(v), k && t.guidePath?.autoRemove !== !1 && k.remove(), t.onProgress?.(1, l), t.onComplete?.(l), this._emit("step-complete"), p(), !0) : !1;
        }, r);
        this._activeHandles.push(N);
      }
    });
  }
  // ── Internal: apply step properties ─────────────────────────────────
  /** Apply all properties of a step at their final values (for instant steps). */
  _applyStepFinal(t) {
    if (t.addEdges && this._addEdges(t.addEdges), t.removeEdges && this._removeEdges(t.removeEdges), t.nodes)
      for (const n of t.nodes) {
        const o = this._canvas.getNode(n);
        o && (t.position && (t.position.x !== void 0 && (o.position.x = t.position.x), t.position.y !== void 0 && (o.position.y = t.position.y)), t.class !== void 0 && (o.class = t.class), t.data !== void 0 && Object.assign(o.data, t.data), t.selected !== void 0 && (o.selected = t.selected), t.zIndex !== void 0 && (o.zIndex = t.zIndex), t.dimensions && o.dimensions && (t.dimensions.width !== void 0 && (o.dimensions.width = t.dimensions.width), t.dimensions.height !== void 0 && (o.dimensions.height = t.dimensions.height)), t.style !== void 0 && (o.style = t.style));
      }
    this._applyViewportFinal(t), this._applyStepInstant(t);
  }
  /** Apply instant-swap edge properties (not interpolated). */
  _applyStepInstant(t) {
    if (t.edges)
      for (const n of t.edges) {
        const o = this._canvas.getEdge(n);
        o && (t.edgeAnimated !== void 0 && (o.animated = t.edgeAnimated), t.edgeClass !== void 0 && (o.class = t.edgeClass), t.edgeLabel !== void 0 && (o.label = t.edgeLabel));
      }
  }
  // ── Internal: edge lifecycle ───────────────────────────────────────
  /** Add edges to the canvas edges array. */
  _addEdges(t) {
    this._canvas.edges.push(...t), this._canvas._rebuildEdgeMap?.();
  }
  /** Remove edges from the canvas edges array by ID. */
  _removeEdges(t) {
    for (const n of t) {
      const o = this._canvas.edges.findIndex((i) => i.id === n);
      o !== -1 && this._canvas.edges.splice(o, 1);
    }
    this._canvas._rebuildEdgeMap?.();
  }
  /** Apply draw transition on each tick for added/removed edges. */
  _applyEdgeDrawTransition(t, n, o) {
    for (const i of t) {
      const r = this._canvas.getEdgePathElement?.(i);
      r && Iu(r, n, o);
    }
  }
  /** Clean up draw transition styles. */
  _cleanupEdgeDrawTransition(t) {
    for (const n of t) {
      const o = this._canvas.getEdgePathElement?.(n);
      o && $u(o);
    }
  }
  /** Apply fade transition on each tick for added/removed edges. */
  _applyEdgeFadeTransition(t, n, o) {
    for (const i of t) {
      const r = this._canvas.getEdgeElement?.(i);
      r && Au(r, n, o);
    }
  }
  /** Clean up fade transition styles. */
  _cleanupEdgeFadeTransition(t) {
    for (const n of t) {
      const o = this._canvas.getEdgeElement?.(n);
      o && Du(o);
    }
  }
  // ── Internal: viewport helpers ──────────────────────────────────
  /** Compute the target viewport for a step (viewport, fitView, or panTo). */
  _resolveTargetViewport(t) {
    const n = this._canvas.viewport;
    return n ? t.fitView ? this._computeFitViewViewport(t) : t.panTo ? this._computePanToViewport(t.panTo) : t.viewport ? {
      x: t.viewport.x ?? n.x,
      y: t.viewport.y ?? n.y,
      zoom: t.viewport.zoom ?? n.zoom
    } : null : null;
  }
  /** Compute the viewport that fits all (or specified) nodes with padding. */
  _computeFitViewViewport(t) {
    const n = this._canvas.getContainerDimensions?.();
    if (!n) return null;
    const o = t.nodes ? t.nodes.map((s) => this._canvas.getNode(s)).filter((s) => !!s) : this._canvas.nodes;
    if (o.length === 0) return null;
    const i = kt(o), r = t.fitViewPadding ?? 0.1;
    return Tn(
      i,
      n.width,
      n.height,
      this._canvas.minZoom ?? 0.5,
      this._canvas.maxZoom ?? 2,
      r
    );
  }
  /** Compute the viewport that centers on a given node. */
  _computePanToViewport(t) {
    const n = this._canvas.getNode(t);
    if (!n) return null;
    const o = this._canvas.viewport;
    if (!o) return null;
    const i = this._canvas.getContainerDimensions?.();
    if (!i) return null;
    const r = n.dimensions?.width ?? ye, s = n.dimensions?.height ?? we, l = n.position.x + r / 2, a = n.position.y + s / 2;
    return {
      x: i.width / 2 - l * o.zoom,
      y: i.height / 2 - a * o.zoom,
      zoom: o.zoom
    };
  }
  /** Apply viewport at final values (for instant steps). */
  _applyViewportFinal(t) {
    const n = this._resolveTargetViewport(t);
    !n || !this._canvas.viewport || (this._canvas.viewport.x = n.x, this._canvas.viewport.y = n.y, this._canvas.viewport.zoom = n.zoom);
  }
}
function Ou(e) {
  const t = e.match(/^([\d.]+)(ms|s)?$/);
  if (!t) return 2e3;
  const n = parseFloat(t[1]);
  return t[2] === "ms" ? n : n * 1e3;
}
function Vu(e) {
  return {
    // ── Internal: Sync animation lock state ───────────────────────────────
    /**
     * Synchronize the `_animationLocked` flag from active timelines and
     * manage history suspension while any timeline is playing.
     */
    _syncAnimationState() {
      const t = [...e._activeTimelines].some((n) => n.locked);
      e._animationLocked = t, e._activeTimelines.size === 0 ? e._resumeHistory() : e._suspendHistory();
    },
    // ── Timeline factory ──────────────────────────────────────────────────
    /**
     * Create a new FlowTimeline wired to this canvas. Lock flag and
     * history suspension are automatically managed via timeline events.
     */
    timeline() {
      const t = new Fu(e);
      t.on("play", () => {
        e._activeTimelines.add(t), e._syncAnimationState();
      }), t.on("resume", () => {
        e._activeTimelines.add(t), e._syncAnimationState();
      });
      for (const n of ["pause", "stop", "complete"])
        t.on(n, () => {
          e._activeTimelines.delete(t), e._syncAnimationState();
        });
      return t;
    },
    // ── Named animation registry ──────────────────────────────────────────
    /**
     * Register a named animation (used by x-flow-animate directive).
     */
    registerAnimation(t, n) {
      e._animationRegistry.set(t, n);
    },
    /**
     * Unregister a named animation.
     */
    unregisterAnimation(t) {
      e._animationRegistry.delete(t);
    },
    /**
     * Play a named animation registered via x-flow-animate directive.
     */
    async playAnimation(t) {
      const n = e._animationRegistry.get(t);
      if (!n) {
        j("animation", `Named animation "${t}" not found`);
        return;
      }
      const o = e.timeline();
      for (const i of n)
        i.parallel ? o.parallel(i.parallel) : o.step(i);
      await o.play();
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
    update(t, n = {}) {
      const o = n.duration ?? 0, i = [], r = /* @__PURE__ */ new Set(), s = /* @__PURE__ */ new Set(), l = /* @__PURE__ */ new Set(), a = t.nodes ? Object.keys(t.nodes).length : 0, c = t.edges ? Object.keys(t.edges).length : 0;
      if (j("animate", "update() called", {
        nodes: a,
        edges: c,
        viewport: !!t.viewport,
        duration: o,
        easing: n.easing ?? "default",
        instant: o === 0
      }), t.nodes)
        for (const [d, f] of Object.entries(t.nodes)) {
          const g = e._nodeMap.get(d);
          if (!g) continue;
          const w = (f._duration ?? o) === 0;
          if (f.followPath && !w) {
            let y = null;
            typeof f.followPath == "function" ? y = f.followPath : y = Vo(f.followPath);
            let M = null;
            if (f.guidePath?.visible && typeof f.followPath == "string" && typeof document < "u") {
              const L = e.getEdgeSvgElement?.();
              L && (M = document.createElementNS("http://www.w3.org/2000/svg", "path"), M.setAttribute("d", f.followPath), M.classList.add("flow-guide-path"), f.guidePath.class && M.classList.add(f.guidePath.class), L.appendChild(M));
            }
            if (y) {
              const L = y, b = M, D = f.guidePath?.autoRemove !== !1;
              i.push({
                key: `node:${d}:followPath`,
                from: 0,
                to: 1,
                apply: (k) => {
                  const A = e._nodeMap.get(d);
                  if (!A) return;
                  const _ = L(k);
                  $e().raw(A).position.x = _.x, $e().raw(A).position.y = _.y, r.add(d), k >= 1 && b && D && b.remove();
                }
              });
            }
          } else if (f.position) {
            const M = $e().raw(g).position;
            if (f.position.x !== void 0) {
              const L = f.position.x;
              if (w)
                M.x = L;
              else {
                const b = M.x;
                i.push({
                  key: `node:${d}:position.x`,
                  from: b,
                  to: L,
                  apply: (D) => {
                    const k = e._nodeMap.get(d);
                    k && ($e().raw(k).position.x = D, r.add(d));
                  }
                });
              }
            }
            if (f.position.y !== void 0) {
              const L = f.position.y;
              if (w)
                M.y = L;
              else {
                const b = M.y;
                i.push({
                  key: `node:${d}:position.y`,
                  from: b,
                  to: L,
                  apply: (D) => {
                    const k = e._nodeMap.get(d);
                    k && ($e().raw(k).position.y = D), r.add(d);
                  }
                });
              }
            }
            w && r.add(d);
          }
          if (f.data !== void 0 && Object.assign(g.data, f.data), f.class !== void 0 && (g.class = f.class), f.selected !== void 0 && (g.selected = f.selected), f.zIndex !== void 0 && (g.zIndex = f.zIndex), f.style !== void 0)
            if (w)
              g.style = f.style, s.add(d);
            else {
              const y = Zt(g.style || {}), M = Zt(f.style), L = e._nodeElements.get(d);
              if (L) {
                const b = getComputedStyle(L);
                for (const D of Object.keys(M))
                  y[D] === void 0 && (y[D] = b.getPropertyValue(D));
              }
              i.push({
                key: `node:${d}:style`,
                from: 0,
                to: 1,
                apply: (b) => {
                  const D = e._nodeMap.get(d);
                  D && ($e().raw(D).style = ks(y, M, b), s.add(d));
                }
              });
            }
          f.dimensions && g.dimensions && (f.dimensions.width !== void 0 && (w ? g.dimensions.width = f.dimensions.width : i.push({
            key: `node:${d}:dimensions.width`,
            from: g.dimensions.width,
            to: f.dimensions.width,
            apply: (y) => {
              g.dimensions.width = y;
            }
          })), f.dimensions.height !== void 0 && (w ? g.dimensions.height = f.dimensions.height : i.push({
            key: `node:${d}:dimensions.height`,
            from: g.dimensions.height,
            to: f.dimensions.height,
            apply: (y) => {
              g.dimensions.height = y;
            }
          })));
        }
      if (t.edges)
        for (const [d, f] of Object.entries(t.edges)) {
          const g = e._edgeMap.get(d);
          if (!g) continue;
          const w = (f._duration ?? o) === 0;
          if (f.color !== void 0)
            if (typeof f.color == "object")
              g.color = f.color;
            else if (w)
              g.color = f.color, l.add(d);
            else {
              const y = typeof g.color == "string" && g.color || getComputedStyle(e._container).getPropertyValue("--flow-edge-stroke").trim() || zo;
              i.push({
                key: `edge:${d}:color`,
                from: y,
                to: f.color,
                apply: (M) => {
                  const L = e._edgeMap.get(d);
                  L && ($e().raw(L).color = M, l.add(d));
                }
              });
            }
          if (f.strokeWidth !== void 0)
            if (w)
              g.strokeWidth = f.strokeWidth, l.add(d);
            else {
              const y = g.strokeWidth ?? (parseFloat(getComputedStyle(e._container).getPropertyValue("--flow-edge-stroke-width").trim() || "1") || 1);
              i.push({
                key: `edge:${d}:strokeWidth`,
                from: y,
                to: f.strokeWidth,
                apply: (M) => {
                  const L = e._edgeMap.get(d);
                  L && ($e().raw(L).strokeWidth = M, l.add(d));
                }
              });
            }
          f.label !== void 0 && (g.label = f.label), f.animated !== void 0 && (g.animated = f.animated), f.class !== void 0 && (g.class = f.class);
        }
      if (t.viewport) {
        const d = t.viewport, g = (d._duration ?? o) === 0, m = e.viewport;
        d.pan?.x !== void 0 && (g ? m.x = d.pan.x : i.push({
          key: "viewport:pan.x",
          from: m.x,
          to: d.pan.x,
          apply: (w) => {
            m.x = w;
          }
        })), d.pan?.y !== void 0 && (g ? m.y = d.pan.y : i.push({
          key: "viewport:pan.y",
          from: m.y,
          to: d.pan.y,
          apply: (w) => {
            m.y = w;
          }
        })), d.zoom !== void 0 && (g ? m.zoom = d.zoom : i.push({
          key: "viewport:zoom",
          from: m.zoom,
          to: d.zoom,
          apply: (w) => {
            m.zoom = w;
          }
        }));
      }
      if (i.length === 0) {
        r.size > 0 && (e._flushNodePositions(r), e._refreshEdgePaths(r)), s.size > 0 && e._flushNodeStyles(s), l.size > 0 && e._flushEdgeStyles(l);
        const d = {
          pause: () => {
          },
          resume: () => {
          },
          stop: () => {
          },
          reverse: () => {
          },
          finished: Promise.resolve(),
          _targetNodeIds: t.nodes ? Object.keys(t.nodes) : void 0
        };
        return n.onComplete?.(), d;
      }
      const h = $e().raw(e._animator).animate(i, {
        duration: o,
        easing: n.easing,
        delay: n.delay,
        loop: n.loop,
        onProgress(d) {
          r.size > 0 && (e._flushNodePositions(r), e._refreshEdgePaths(r), r.clear()), s.size > 0 && (e._flushNodeStyles(s), s.clear()), l.size > 0 && (e._flushEdgeStyles(l), l.clear()), t.viewport && e._flushViewport(), n.onProgress?.(d);
        },
        onComplete() {
          if (t.nodes)
            for (const [d, f] of Object.entries(t.nodes)) {
              const g = e._nodeMap.get(d);
              if (!g) continue;
              const m = $e().raw(g);
              (f.followPath || f.position?.x !== void 0) && (g.position.x = m.position.x), (f.followPath || f.position?.y !== void 0) && (g.position.y = m.position.y), f.style !== void 0 && (g.style = m.style);
            }
          if (t.edges)
            for (const [d, f] of Object.entries(t.edges)) {
              const g = e._edgeMap.get(d);
              if (!g) continue;
              const m = $e().raw(g);
              f.color !== void 0 && typeof f.color == "string" && (g.color = m.color), f.strokeWidth !== void 0 && (g.strokeWidth = m.strokeWidth);
            }
          n.onComplete?.();
        }
      });
      return t.nodes && (h._targetNodeIds = Object.keys(t.nodes)), h;
    },
    /**
     * Animate nodes, edges, and/or the viewport with smooth transitions.
     *
     * Convenience wrapper around `update()` that defaults to 300ms duration.
     * Pass `duration: 0` for instant changes, or use `update()` directly.
     */
    animate(t, n = {}) {
      return this.update(t, { duration: 300, ...n });
    },
    // ── Follow (viewport tracking) ────────────────────────────────────────
    /**
     * Track a target with the viewport camera. The target can be a node ID,
     * a ParticleHandle, an animation handle, or a static XYPosition.
     * The viewport smoothly follows via engine tick with linear interpolation.
     */
    follow(t, n = {}) {
      e._followHandle && e._followHandle.stop();
      let o;
      const i = new Promise((c) => {
        o = c;
      });
      let r = !1;
      const s = n.zoom, l = xo.register(() => {
        if (r) return !0;
        let c = null;
        if (typeof t == "string") {
          const m = e._nodeMap.get(t);
          if (m) {
            c = m.parentId ? e.getAbsolutePosition(t) : { ...m.position };
            const w = m.nodeOrigin ?? e._config.nodeOrigin ?? [0, 0];
            m.dimensions && (c.x += m.dimensions.width * (0.5 - w[0]), c.y += m.dimensions.height * (0.5 - w[1]));
          }
        } else if ("_targetNodeIds" in t && t._targetNodeIds?.length) {
          const m = t._targetNodeIds[0], w = e._nodeMap.get(m);
          if (w) {
            c = w.parentId ? e.getAbsolutePosition(m) : { ...w.position };
            const y = w.nodeOrigin ?? e._config.nodeOrigin ?? [0, 0];
            w.dimensions && (c.x += w.dimensions.width * (0.5 - y[0]), c.y += w.dimensions.height * (0.5 - y[1]));
          }
        } else if ("getCurrentPosition" in t && typeof t.getCurrentPosition == "function") {
          const m = t.getCurrentPosition();
          if (m)
            c = m;
          else
            return r = !0, l.stop(), e._followHandle = null, o(), !0;
        } else "x" in t && "y" in t && (c = t);
        if (!c) return !1;
        const u = e._container ? { width: e._container.clientWidth, height: e._container.clientHeight } : { width: 800, height: 600 }, h = s ?? e.viewport.zoom, d = u.width / 2 - c.x * h, f = u.height / 2 - c.y * h, g = 0.08;
        return e.viewport.x += (d - e.viewport.x) * g, e.viewport.y += (f - e.viewport.y) * g, s && (e.viewport.zoom += (s - e.viewport.zoom) * g), e._flushViewport(), !1;
      });
      return e._followHandle = l, typeof t == "object" && "_targetNodeIds" in t && t.finished && t.finished.then(() => {
        r || (r = !0, l.stop(), e._followHandle = null, o());
      }), {
        pause: () => {
        },
        resume: () => {
        },
        stop: () => {
          r = !0, l.stop(), e._followHandle = null, o();
        },
        reverse: () => {
        },
        get finished() {
          return i;
        }
      };
    },
    // ── Particle tick loop ────────────────────────────────────────────────
    /**
     * Engine tick callback — processes all active particles in one pass.
     * Returns true to unregister from engine when all particles are done.
     */
    _tickParticles() {
      const t = performance.now(), n = /* @__PURE__ */ new Map();
      for (const o of e._activeParticles) {
        const i = (t - o.t0) / o.ms;
        if (i >= 1 || !o.circle.parentNode) {
          clearTimeout(o.safetyTimer), o.circle.remove(), typeof o.onComplete == "function" && o.onComplete(), e._activeParticles.delete(o);
          continue;
        }
        let r = n.get(o.pathEl);
        r === void 0 && (r = o.pathEl.getTotalLength(), n.set(o.pathEl, r));
        const s = o.pathEl.getPointAtLength(i * r);
        o.circle.setAttribute("cx", String(s.x)), o.circle.setAttribute("cy", String(s.y));
      }
      return e._activeParticles.size === 0 ? (e._particleEngineHandle = null, !0) : !1;
    },
    // ── Send particle along edge ──────────────────────────────────────────
    /**
     * Fire a particle along an edge path. The particle is an SVG circle
     * that follows the edge's `<path>` element using `getPointAtLength`.
     */
    sendParticle(t, n = {}) {
      const o = e._edgeSvgElements.get(t);
      if (o && o.style.display === "none") return;
      const i = e.edges.find((k) => k.id === t);
      if (!i) {
        j("particle", `sendParticle: edge "${t}" not found`);
        return;
      }
      const r = e.getEdgePathElement(t);
      if (!r) {
        j("particle", `sendParticle: no path element for edge "${t}"`);
        return;
      }
      if (!r.getAttribute("d")) {
        j("particle", `sendParticle: edge "${t}" path has no d attribute`);
        return;
      }
      const l = e._containerStyles, a = n.size ?? i.particleSize ?? (parseFloat(l?.getPropertyValue("--flow-edge-dot-size").trim() ?? "4") || 4), c = n.color ?? i.particleColor ?? l?.getPropertyValue("--flow-edge-dot-fill").trim() ?? Wn, u = n.duration ?? i.animationDuration ?? l?.getPropertyValue("--flow-edge-dot-duration").trim() ?? "2s", h = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      if (h.setAttribute("r", String(a)), h.setAttribute("fill", c), h.classList.add("flow-edge-particle"), n.class)
        for (const k of n.class.split(" "))
          k && h.classList.add(k);
      const d = e.getEdgeElement(t);
      if (!d) return;
      const f = Ou(u), g = r.getPointAtLength(0);
      h.setAttribute("cx", String(g.x)), h.setAttribute("cy", String(g.y)), d.appendChild(h);
      const m = performance.now();
      let w;
      const y = new Promise((k) => {
        w = k;
      }), M = () => {
        typeof n.onComplete == "function" && n.onComplete(), w();
      }, L = setTimeout(() => {
        e._activeParticles.delete(b), h.remove(), M();
      }, f * 2), b = { circle: h, pathEl: r, t0: m, ms: f, safetyTimer: L, onComplete: M };
      return e._activeParticles.add(b), j("particle", `sendParticle on edge "${t}"`, { size: a, color: c, duration: f }), e._particleEngineHandle || (e._particleEngineHandle = xo.register(() => e._tickParticles())), {
        getCurrentPosition() {
          if (!e._activeParticles.has(b)) return null;
          const k = parseFloat(h.getAttribute("cx") || "0"), A = parseFloat(h.getAttribute("cy") || "0");
          return { x: k, y: A };
        },
        stop() {
          e._activeParticles.has(b) && (clearTimeout(L), h.remove(), e._activeParticles.delete(b), M());
        },
        get finished() {
          return y;
        }
      };
    }
  };
}
function ki(e, t, n, o) {
  const i = t.find((l) => l.id === e);
  if (!i) return /* @__PURE__ */ new Set();
  if (i.type === "group")
    return it(e, t);
  const r = /* @__PURE__ */ new Set(), s = Eo(e, t, n);
  for (const l of s)
    r.add(l.id);
  if (o?.recursive) {
    const l = s.map((a) => a.id);
    for (; l.length > 0; ) {
      const a = l.shift(), c = Eo(a, t, n);
      for (const u of c)
        !r.has(u.id) && u.id !== e && (r.add(u.id), l.push(u.id));
    }
  }
  return r;
}
function Xu(e, t, n) {
  const o = /* @__PURE__ */ new Map();
  for (const i of t)
    n.has(i.id) && o.set(i.id, { ...i.position });
  return {
    targetPositions: o,
    originalDimensions: e.type === "group" ? { ...e.dimensions ?? { width: 400, height: 300 } } : void 0,
    reroutedEdges: /* @__PURE__ */ new Map()
  };
}
function oo(e, t, n, o) {
  e.collapsed = !0, o && (e.dimensions = { ...o });
  for (const i of t)
    n.targetPositions.has(i.id) && (i.hidden = !0);
}
function Ni(e, t, n, o = !0) {
  e.collapsed = !1, o && n.originalDimensions && (e.dimensions = { ...n.originalDimensions });
  const i = /* @__PURE__ */ new Set();
  if (e.type === "group") {
    for (const r of t)
      if (r.collapsed && r.id !== e.id && n.targetPositions.has(r.id)) {
        const s = it(r.id, t);
        for (const l of s)
          i.add(l);
      }
  }
  for (const r of t)
    if (n.targetPositions.has(r.id)) {
      const s = n.targetPositions.get(r.id);
      r.position = { ...s }, i.has(r.id) || (r.hidden = !1);
    }
}
function io(e, t, n) {
  const o = /* @__PURE__ */ new Map();
  for (const i of t) {
    const r = n.has(i.source), s = n.has(i.target), l = i.source === e, a = i.target === e;
    !r && !s || (o.set(i.id, { source: i.source, target: i.target, hidden: i.hidden }), r && s || l && s || r && a ? i.hidden = !0 : r ? i.source = e : i.target = e);
  }
  return o;
}
function Yu(e, t) {
  for (const n of e) {
    const o = t.get(n.id);
    o && (n.source = o.source, n.target = o.target, o.hidden !== void 0 ? n.hidden = o.hidden : delete n.hidden);
  }
}
const pn = { width: 150, height: 50 };
function qu(e) {
  return {
    /**
     * Collapse a node — hide its descendants/outgoers and optionally animate.
     */
    collapseNode(t, n) {
      const o = e._nodeMap.get(t);
      if (!o || o.collapsed) return;
      const i = ki(t, e.nodes, e.edges, { recursive: n?.recursive });
      if (i.size === 0) return;
      j("collapse", `Collapsing node "${t}"`, {
        type: o.type ?? "default",
        descendants: [...i],
        animate: n?.animate !== !1,
        recursive: n?.recursive ?? !1
      }), e._captureHistory();
      const r = o.type === "group", s = r ? o.collapsedDimensions ?? { width: 150, height: 60 } : void 0, l = n?.animate !== !1, a = Xu(o, e.nodes, i);
      if (l) {
        e._suspendHistory();
        const c = o.dimensions ?? pn, u = r && s ? s : c, h = {};
        for (const [f] of a.targetPositions) {
          const g = e._nodeMap.get(f);
          if (!g) continue;
          const m = g.dimensions ?? pn;
          let w, y;
          g.parentId === t ? (w = (u.width - m.width) / 2, y = (u.height - m.height) / 2) : (w = o.position.x + (u.width - m.width) / 2, y = o.position.y + (u.height - m.height) / 2), h[f] = {
            position: { x: w, y },
            style: { opacity: "0" }
          };
        }
        r && s && (h[t] = { dimensions: s });
        const d = [];
        for (const f of e.edges)
          if (i.has(f.source) || i.has(f.target)) {
            const g = e.getEdgeElement?.(f.id)?.closest("svg");
            g && d.push(g);
          }
        e.animate ? e.animate({ nodes: h }, {
          duration: 300,
          easing: "easeInOut",
          onProgress: (f) => {
            const g = String(1 - f);
            for (const m of d) m.style.opacity = g;
          },
          onComplete: () => {
            for (const f of d) f.style.opacity = "";
            oo(o, e.nodes, a, s), a.reroutedEdges = io(t, e.edges, i), e._collapseState.set(t, a), e._resumeHistory(), e._emit("node-collapse", { node: o, descendants: [...i] });
          }
        }) : (oo(o, e.nodes, a, s), a.reroutedEdges = io(t, e.edges, i), e._collapseState.set(t, a), e._resumeHistory(), e._emit("node-collapse", { node: o, descendants: [...i] }));
      } else
        oo(o, e.nodes, a, s), a.reroutedEdges = io(t, e.edges, i), e._collapseState.set(t, a), e._emit("node-collapse", { node: o, descendants: [...i] });
    },
    /**
     * Expand a previously collapsed node — restore descendants/outgoers.
     */
    expandNode(t, n) {
      const o = e._nodeMap.get(t);
      if (!o || !o.collapsed) return;
      const i = e._collapseState.get(t);
      if (!i) return;
      j("collapse", `Expanding node "${t}"`, {
        type: o.type ?? "default",
        descendants: [...i.targetPositions.keys()],
        animate: n?.animate !== !1,
        reroutedEdges: i.reroutedEdges.size
      }), e._captureHistory();
      const r = o.type === "group", s = n?.animate !== !1;
      if (i.reroutedEdges.size > 0 && Yu(e.edges, i.reroutedEdges), s) {
        e._suspendHistory(), r && i.originalDimensions && (o.dimensions = { ...i.originalDimensions });
        const l = o.dimensions ?? pn;
        Ni(o, e.nodes, i, r);
        const a = {};
        for (const [h, d] of i.targetPositions) {
          const f = e._nodeMap.get(h);
          if (f && !f.hidden) {
            const g = f.dimensions ?? pn;
            let m, w;
            f.parentId === t ? (m = (l.width - g.width) / 2, w = (l.height - g.height) / 2) : (m = o.position.x + (l.width - g.width) / 2, w = o.position.y + (l.height - g.height) / 2), f.position = { x: m, y: w }, f.style = { ...f.style || {}, opacity: "0" }, a[h] = {
              position: d,
              style: { opacity: "1" }
            };
          }
        }
        const c = new Set(i.targetPositions.keys());
        e._flushNodeStyles(c);
        const u = [];
        for (const h of e.edges)
          if (c.has(h.source) || c.has(h.target)) {
            const d = e.getEdgeElement?.(h.id)?.closest("svg");
            d && (d.style.opacity = "0", u.push(d));
          }
        e.animate ? e.animate({ nodes: a }, {
          duration: 300,
          easing: "easeOut",
          onProgress: (h) => {
            const d = String(h);
            for (const f of u) f.style.opacity = d;
          },
          onComplete: () => {
            for (const h of u) h.style.opacity = "";
            for (const h of c) {
              const d = e._nodeMap.get(h);
              d && typeof d.style == "object" && delete d.style.opacity;
            }
            e._resumeHistory();
          }
        }) : e._resumeHistory(), e._collapseState.delete(t), e._emit("node-expand", { node: o, descendants: [...i.targetPositions.keys()] });
      } else
        Ni(o, e.nodes, i, r), e._collapseState.delete(t), e._emit("node-expand", { node: o, descendants: [...i.targetPositions.keys()] });
    },
    /**
     * Toggle collapse/expand state of a node.
     */
    toggleNode(t, n) {
      const o = e._nodeMap.get(t);
      o && (j("collapse", `Toggle node "${t}" → ${o.collapsed ? "expand" : "collapse"}`), o.collapsed ? this.expandNode(t, n) : this.collapseNode(t, n));
    },
    /**
     * Check if a node is collapsed.
     */
    isCollapsed(t) {
      return e._nodeMap.get(t)?.collapsed === !0;
    },
    /**
     * Get the number of nodes that would be hidden when collapsing this node.
     */
    getCollapseTargetCount(t) {
      return ki(t, e.nodes, e.edges).size;
    },
    /**
     * Get the number of descendants (via parentId hierarchy) of a node.
     */
    getDescendantCount(t) {
      return it(t, e.nodes).size;
    }
  };
}
function Bu(e) {
  return {
    /**
     * Condense a node — switch to summary view hiding internal rows.
     */
    condenseNode(t) {
      const n = e._nodeMap.get(t);
      !n || n.condensed || (e._captureHistory(), n.condensed = !0, j("condense", `Node "${t}" condensed`), e._emit("node-condense", { node: n }));
    },
    /**
     * Uncondense a node — restore full row view.
     */
    uncondenseNode(t) {
      const n = e._nodeMap.get(t);
      !n || !n.condensed || (e._captureHistory(), n.condensed = !1, j("condense", `Node "${t}" uncondensed`), e._emit("node-uncondense", { node: n }));
    },
    /**
     * Toggle condensed state of a node.
     */
    toggleCondense(t) {
      const n = e._nodeMap.get(t);
      n && (n.condensed ? this.uncondenseNode(t) : this.condenseNode(t));
    },
    /**
     * Check if a node is condensed.
     */
    isCondensed(t) {
      return e._nodeMap.get(t)?.condensed === !0;
    }
  };
}
function Wu(e) {
  return {
    // ── Row Selection ────────────────────────────────────────────────────
    selectRow(t) {
      if (e.selectedRows.has(t)) return;
      e._captureHistory(), e.selectedRows.add(t);
      const n = t.indexOf("."), o = n === -1 ? t : t.slice(0, n), i = n === -1 ? "" : t.slice(n + 1);
      j("selection", `Row "${t}" selected`), e._emit("row-select", { rowId: t, nodeId: o, attrId: i }), e._emit("row-selection-change", { selectedRows: [...e.selectedRows] });
    },
    deselectRow(t) {
      if (!e.selectedRows.has(t)) return;
      e._captureHistory(), e.selectedRows.delete(t);
      const n = t.indexOf("."), o = n === -1 ? t : t.slice(0, n), i = n === -1 ? "" : t.slice(n + 1);
      j("selection", `Row "${t}" deselected`), e._emit("row-deselect", { rowId: t, nodeId: o, attrId: i }), e._emit("row-selection-change", { selectedRows: [...e.selectedRows] });
    },
    toggleRowSelect(t) {
      e.selectedRows.has(t) ? this.deselectRow(t) : this.selectRow(t);
    },
    getSelectedRows() {
      return [...e.selectedRows];
    },
    isRowSelected(t) {
      return e.selectedRows.has(t);
    },
    deselectAllRows() {
      e.selectedRows.size !== 0 && (e._captureHistory(), j("selection", "Deselecting all rows"), e.selectedRows.clear(), e._container?.querySelectorAll(".flow-row-selected").forEach((t) => {
        t.classList.remove("flow-row-selected");
      }), e._emit("row-selection-change", { selectedRows: [] }));
    },
    // ── Row Filtering ────────────────────────────────────────────────────
    setRowFilter(t, n) {
      const o = e._nodeMap.get(t);
      o && (o.rowFilter = n, j("filter", `Node "${t}" row filter set to "${typeof n == "function" ? "predicate" : n}"`));
    },
    getRowFilter(t) {
      return e._nodeMap.get(t)?.rowFilter ?? "all";
    },
    getVisibleRows(t, n) {
      const o = e._nodeMap.get(t);
      if (!o) return n;
      const i = o.rowFilter ?? "all";
      if (i === "all") return n;
      if (typeof i == "function")
        return n.filter(i);
      const r = /* @__PURE__ */ new Set();
      for (const s of e.edges) {
        if (s.sourceHandle?.startsWith(t + ".")) {
          const l = s.sourceHandle.slice(t.length + 1).replace(/-[lr]$/, "");
          l && r.add(l);
        }
        if (s.targetHandle?.startsWith(t + ".")) {
          const l = s.targetHandle.slice(t.length + 1).replace(/-[lr]$/, "");
          l && r.add(l);
        }
      }
      return i === "connected" ? n.filter((s) => r.has(s.id)) : n.filter((s) => !r.has(s.id));
    }
  };
}
const Uu = 8, ju = 12, Zu = 2;
function Xo(e) {
  return {
    width: e.dimensions?.width ?? ye,
    height: e.dimensions?.height ?? we
  };
}
function Ku(e) {
  if (e.stretch) return e.stretch;
  switch (e.direction) {
    case "vertical":
      return "width";
    case "horizontal":
      return "height";
    case "grid":
      return "both";
  }
}
function Gu(e) {
  return [...e].sort((t, n) => {
    const o = t.order ?? 1 / 0, i = n.order ?? 1 / 0;
    return o !== i ? o - i : 0;
  });
}
function Ti(e, t, n) {
  const o = t.gap ?? Uu, i = t.padding ?? ju, r = t.headerHeight ?? 0, s = Ku(t), l = Gu(e), a = /* @__PURE__ */ new Map(), c = /* @__PURE__ */ new Map();
  if (l.length === 0)
    return {
      positions: a,
      dimensions: c,
      parentDimensions: n ? { width: n.width, height: n.height } : { width: i * 2, height: i * 2 + r }
    };
  const u = n ? n.width - i * 2 : 0, h = n ? n.height - i * 2 - r : 0;
  return t.direction === "vertical" ? Ju(l, o, i, r, s, u, a, c) : t.direction === "horizontal" ? Qu(l, o, i, r, s, h, a, c) : ef(l, o, i, r, s, t.columns ?? Zu, u, h, a, c);
}
function Ju(e, t, n, o, i, r, s, l) {
  let a = 0;
  const c = e.map((d) => Xo(d));
  for (const d of c) a = Math.max(a, d.width);
  const u = r > 0 ? r : a;
  let h = n + o;
  for (let d = 0; d < e.length; d++) {
    const f = e[d], g = c[d];
    s.set(f.id, { x: n, y: h }), (i === "width" || i === "both") && l.set(f.id, { width: u, height: g.height }), h += g.height + t;
  }
  return h -= t, h += n, {
    positions: s,
    dimensions: l,
    parentDimensions: { width: u + n * 2, height: h }
  };
}
function Qu(e, t, n, o, i, r, s, l) {
  let a = 0;
  const c = e.map((d) => Xo(d));
  for (const d of c) a = Math.max(a, d.height);
  const u = r > 0 ? r : a;
  let h = n;
  for (let d = 0; d < e.length; d++) {
    const f = e[d], g = c[d];
    s.set(f.id, { x: h, y: n + o }), (i === "height" || i === "both") && l.set(f.id, { width: g.width, height: u }), h += g.width + t;
  }
  return h -= t, h += n, {
    positions: s,
    dimensions: l,
    parentDimensions: { width: h, height: u + n * 2 + o }
  };
}
function ef(e, t, n, o, i, r, s, l, a, c) {
  const u = Math.min(r, e.length), h = e.map((y) => Xo(y));
  let d = 0, f = 0;
  for (const y of h)
    d = Math.max(d, y.width), f = Math.max(f, y.height);
  const g = s > 0 ? (s - (u - 1) * t) / u : 0;
  g > 0 && (d = g);
  const m = Math.ceil(e.length / u), w = l > 0 ? (l - (m - 1) * t) / m : 0;
  w > 0 && (f = w);
  for (let y = 0; y < e.length; y++) {
    const M = y % u, L = Math.floor(y / u), b = n + M * (d + t), D = n + o + L * (f + t);
    a.set(e[y].id, { x: b, y: D }), i === "both" ? c.set(e[y].id, { width: d, height: f }) : i === "width" ? c.set(e[y].id, { width: d, height: h[y].height }) : i === "height" && c.set(e[y].id, { width: h[y].width, height: f });
  }
  return {
    positions: a,
    dimensions: c,
    parentDimensions: {
      width: u * d + (u - 1) * t + n * 2,
      height: m * f + (m - 1) * t + n * 2 + o
    }
  };
}
function tf(e) {
  return {
    // ── Auto-layout scheduling ─────────────────────────────────────────────
    /**
     * Debounced trigger for automatic layout.
     *
     * Skips when no autoLayout config is set, dependencies haven't loaded,
     * or the auto-layout has permanently failed.
     */
    _scheduleAutoLayout() {
      const t = e._config.autoLayout;
      !t || !e._autoLayoutReady || e._autoLayoutFailed || (e._autoLayoutTimer && clearTimeout(e._autoLayoutTimer), e._autoLayoutTimer = setTimeout(() => {
        e._autoLayoutTimer = null, this._runAutoLayout();
      }, t.debounce ?? 50));
    },
    /**
     * Execute the configured auto-layout algorithm.
     *
     * Delegates to the appropriate layout engine method based on
     * `config.autoLayout.algorithm`. Catches errors and sets
     * `_autoLayoutFailed` to prevent repeated attempts.
     */
    async _runAutoLayout() {
      const t = e._config.autoLayout;
      if (!t) return;
      const n = {
        fitView: t.fitView !== !1,
        duration: t.duration ?? 300
      };
      try {
        switch (t.algorithm) {
          case "dagre":
            this.layout({
              direction: t.direction,
              nodesep: t.nodesep,
              ranksep: t.ranksep,
              adjustHandles: t.adjustHandles,
              ...n
            });
            break;
          case "force":
            this.forceLayout({
              strength: t.strength,
              distance: t.distance,
              charge: t.charge,
              iterations: t.iterations,
              ...n
            });
            break;
          case "hierarchy":
            this.treeLayout({
              layoutType: t.layoutType,
              nodeWidth: t.nodeWidth,
              nodeHeight: t.nodeHeight,
              adjustHandles: t.adjustHandles,
              ...n
            });
            break;
          case "elk":
            await this.elkLayout({
              algorithm: t.elkAlgorithm,
              nodeSpacing: t.nodeSpacing,
              layerSpacing: t.layerSpacing,
              adjustHandles: t.adjustHandles,
              ...n
            });
            break;
        }
      } catch (o) {
        e._autoLayoutFailed || (e._warn("AUTO_LAYOUT_FAILED", `autoLayout failed: ${o.message}`), e._autoLayoutFailed = !0);
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
    _applyLayout(t, n) {
      const o = n?.duration ?? 300;
      if (j("layout", `_applyLayout: repositioning ${t.size} node(s)`, {
        duration: o,
        adjustHandles: n?.adjustHandles ?? !1,
        fitView: n?.fitView !== !1
      }), n?.adjustHandles && n.handleDirection && this._adjustHandlePositions(n.handleDirection), o > 0) {
        const i = {};
        for (const [r, s] of t)
          i[r] = { position: s };
        e.animate?.({ nodes: i }, {
          duration: o,
          easing: "easeInOut",
          onComplete: () => {
            n?.fitView !== !1 && e.fitView?.({ padding: 0.2, duration: o });
          }
        });
      } else {
        for (const i of e.nodes) {
          const r = t.get(i.id);
          r && (i.position || (i.position = { x: 0, y: 0 }), i.position.x = r.x, i.position.y = r.y);
        }
        n?.fitView !== !1 && e.fitView?.({ padding: 0.2, duration: 0 });
      }
    },
    /**
     * Update handle positions on nodes and DOM elements to match a layout
     * direction (TB, LR, BT, RL, DOWN, RIGHT, UP, LEFT).
     *
     * Skips handles that have an explicit position set via
     * `data-flow-handle-explicit`.
     */
    _adjustHandlePositions(t) {
      const n = {
        TB: { source: "bottom", target: "top" },
        DOWN: { source: "bottom", target: "top" },
        LR: { source: "right", target: "left" },
        RIGHT: { source: "right", target: "left" },
        BT: { source: "top", target: "bottom" },
        UP: { source: "top", target: "bottom" },
        RL: { source: "left", target: "right" },
        LEFT: { source: "left", target: "right" }
      }, o = n[t] ?? n.TB;
      for (const i of e.nodes)
        i.sourcePosition = o.source, i.targetPosition = o.target;
      e._container?.querySelectorAll('[data-flow-handle-type="source"]').forEach((i) => {
        i.dataset.flowHandleExplicit || (i.dataset.flowHandlePosition = o.source);
      }), e._container?.querySelectorAll('[data-flow-handle-type="target"]').forEach((i) => {
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
    layoutChildren(t, n, o, i) {
      let r;
      typeof n == "string" ? r = { excludeId: n, shallow: o, stretchedSize: i } : r = n ?? {};
      const { excludeId: s, omitFromComputation: l, includeNode: a, shallow: c } = r;
      let { stretchedSize: u } = r;
      const h = e.nodes.find((b) => b.id === t);
      if (!h?.childLayout) return;
      let d = e.nodes.filter((b) => b.parentId === t);
      l && (d = d.filter((b) => b.id !== l)), a && !d.some((b) => b.id === a.id) && (d = [...d, a]);
      const f = new Map(d.map((b) => [b.id, b]));
      if (h.dimensions = void 0, !u && h.maxDimensions && h.maxDimensions.width !== void 0 && h.maxDimensions.height !== void 0 && (u = { width: h.maxDimensions.width, height: h.maxDimensions.height }), !c)
        for (const b of d)
          b.childLayout && this.layoutChildren(b.id, { excludeId: s, omitFromComputation: l, shallow: !1 });
      const g = h.childLayout, m = g.headerHeight !== void 0 ? g : h.data?.label ? { ...g, headerHeight: 30 } : g, w = Ti(d, m, u);
      for (const [b, D] of w.positions) {
        if (b === s || a && b === a.id && !e._nodeMap.has(b)) continue;
        const k = f.get(b);
        k && (k.position ? (k.position.x = D.x, k.position.y = D.y) : k.position = { x: D.x, y: D.y });
      }
      for (const [b, D] of w.dimensions) {
        if (b === s || a && b === a.id && !e._nodeMap.has(b)) continue;
        const k = f.get(b);
        if (k) {
          let A = D.width, _ = D.height;
          k.minDimensions && (k.minDimensions.width != null && (A = Math.max(A, k.minDimensions.width)), k.minDimensions.height != null && (_ = Math.max(_, k.minDimensions.height))), k.maxDimensions && (k.maxDimensions.width != null && (A = Math.min(A, k.maxDimensions.width)), k.maxDimensions.height != null && (_ = Math.min(_, k.maxDimensions.height))), k.dimensions ? (k.dimensions.width = A, k.dimensions.height = _) : k.dimensions = { width: A, height: _ }, k.childLayout && !c && this.layoutChildren(b, { excludeId: s, omitFromComputation: l, shallow: !1, stretchedSize: k.dimensions });
        }
      }
      let y = w.parentDimensions.width, M = w.parentDimensions.height;
      if (h.minDimensions && (h.minDimensions.width != null && (y = Math.max(y, h.minDimensions.width)), h.minDimensions.height != null && (M = Math.max(M, h.minDimensions.height))), h.maxDimensions && (h.maxDimensions.width != null && (y = Math.min(y, h.maxDimensions.width)), h.maxDimensions.height != null && (M = Math.min(M, h.maxDimensions.height))), h.dimensions || (h.dimensions = { width: 0, height: 0 }), h.dimensions.width = y, h.dimensions.height = M, y !== w.parentDimensions.width || M !== w.parentDimensions.height) {
        const D = Ti(d, m, { width: y, height: M });
        for (const [k, A] of D.positions) {
          if (k === s || a && k === a.id && !e._nodeMap.has(k)) continue;
          const _ = f.get(k);
          _ && (_.position ? (_.position.x = A.x, _.position.y = A.y) : _.position = { x: A.x, y: A.y });
        }
        for (const [k, A] of D.dimensions) {
          if (k === s || a && k === a.id && !e._nodeMap.has(k)) continue;
          const _ = f.get(k);
          if (_) {
            let S = A.width, $ = A.height;
            _.minDimensions && (_.minDimensions.width != null && (S = Math.max(S, _.minDimensions.width)), _.minDimensions.height != null && ($ = Math.max($, _.minDimensions.height))), _.maxDimensions && (_.maxDimensions.width != null && (S = Math.min(S, _.maxDimensions.width)), _.maxDimensions.height != null && ($ = Math.min($, _.maxDimensions.height))), _.dimensions ? (_.dimensions.width = S, _.dimensions.height = $) : _.dimensions = { width: S, height: $ }, _.childLayout && !c && this.layoutChildren(k, { excludeId: s, omitFromComputation: l, shallow: !1, stretchedSize: _.dimensions });
          }
        }
      }
    },
    /**
     * Walk up from a parent through ancestor layout parents, calling
     * layoutChildren(shallow) at each level so parent resizes propagate
     * through the hierarchy (e.g. Column grows -> Row adjusts -> Step adjusts).
     */
    propagateLayoutUp(t, n) {
      const o = n?.omitFromComputation ? { omitFromComputation: n.omitFromComputation } : void 0;
      let i = e.nodes.find(
        (r) => r.id === t
      )?.parentId;
      for (; i; ) {
        const r = e._nodeMap.get(i);
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
    reorderChild(t, n) {
      const o = e._nodeMap.get(t);
      if (!o?.parentId || !e._nodeMap.get(o.parentId)?.childLayout) return;
      e._captureHistory();
      const s = e.nodes.filter((a) => a.parentId === o.parentId).sort((a, c) => (a.order ?? 1 / 0) - (c.order ?? 1 / 0)).filter((a) => a.id !== t), l = Math.max(0, Math.min(n, s.length));
      s.splice(l, 0, o);
      for (let a = 0; a < s.length; a++)
        s[a].order = a;
      this.layoutChildren(o.parentId), e._emit("child-reorder", { nodeId: t, parentId: o.parentId, order: l });
    },
    // ── Layout engines ─────────────────────────────────────────────────────
    /**
     * Apply Dagre (directed acyclic graph) layout.
     *
     * Requires the dagre addon to be registered via `Alpine.plugin(AlpineFlowDagre)`.
     */
    layout(t) {
      const n = _t("layout:dagre");
      if (!n)
        throw new Error("layout() requires the dagre plugin. Register it with: Alpine.plugin(AlpineFlowDagre)");
      const o = t?.direction ?? "TB", i = n(e.nodes, e.edges, {
        direction: o,
        nodesep: t?.nodesep,
        ranksep: t?.ranksep
      });
      this._applyLayout(i, {
        adjustHandles: t?.adjustHandles,
        handleDirection: o,
        fitView: t?.fitView,
        duration: t?.duration
      }), j("layout", "Applied dagre layout", { direction: o }), e._emit("layout", { type: "dagre", direction: o });
    },
    /**
     * Apply force-directed layout.
     *
     * Requires the force addon to be registered via `Alpine.plugin(AlpineFlowForce)`.
     */
    forceLayout(t) {
      const n = _t("layout:force");
      if (!n)
        throw new Error("forceLayout() requires the force plugin. Register it with: Alpine.plugin(AlpineFlowForce)");
      const o = n(e.nodes, e.edges, {
        strength: t?.strength,
        distance: t?.distance,
        charge: t?.charge,
        iterations: t?.iterations,
        center: t?.center
      });
      this._applyLayout(o, {
        fitView: t?.fitView,
        duration: t?.duration
      }), j("layout", "Applied force layout", { charge: t?.charge ?? -300, distance: t?.distance ?? 150 }), e._emit("layout", { type: "force", charge: t?.charge ?? -300, distance: t?.distance ?? 150 });
    },
    /**
     * Apply hierarchy/tree layout.
     *
     * Requires the hierarchy addon to be registered via `Alpine.plugin(AlpineFlowHierarchy)`.
     */
    treeLayout(t) {
      const n = _t("layout:hierarchy");
      if (!n)
        throw new Error("treeLayout() requires the hierarchy plugin. Register it with: Alpine.plugin(AlpineFlowHierarchy)");
      const o = t?.direction ?? "TB", i = n(e.nodes, e.edges, {
        layoutType: t?.layoutType,
        direction: o,
        nodeWidth: t?.nodeWidth,
        nodeHeight: t?.nodeHeight
      });
      this._applyLayout(i, {
        adjustHandles: t?.adjustHandles,
        handleDirection: o,
        fitView: t?.fitView,
        duration: t?.duration
      }), j("layout", "Applied tree layout", { layoutType: t?.layoutType ?? "tree", direction: o }), e._emit("layout", { type: "tree", layoutType: t?.layoutType ?? "tree", direction: o });
    },
    /**
     * Apply ELK (Eclipse Layout Kernel) layout.
     *
     * Requires the elk addon to be registered via `Alpine.plugin(AlpineFlowElk)`.
     * Note: elkLayout is async because ELK's layout() returns a Promise.
     */
    async elkLayout(t) {
      const n = _t("layout:elk");
      if (!n)
        throw new Error("elkLayout() requires the elk plugin. Register it with: Alpine.plugin(AlpineFlowElk)");
      const o = t?.direction ?? "DOWN", i = await n(e.nodes, e.edges, {
        algorithm: t?.algorithm,
        direction: o,
        nodeSpacing: t?.nodeSpacing,
        layerSpacing: t?.layerSpacing
      });
      if (i.size === 0) {
        j("layout", "ELK layout returned no positions — skipping apply");
        return;
      }
      this._applyLayout(i, {
        adjustHandles: t?.adjustHandles,
        handleDirection: o,
        fitView: t?.fitView,
        duration: t?.duration
      }), j("layout", "Applied ELK layout", { algorithm: t?.algorithm ?? "layered", direction: o }), e._emit("layout", { type: "elk", algorithm: t?.algorithm ?? "layered", direction: o });
    }
  };
}
function nf(e) {
  return {
    // ── Internal helpers ──────────────────────────────────────────────────
    _getChildValidation(t) {
      const n = e.getNode(t);
      if (n)
        return Yt(n, e._config.childValidationRules ?? {});
    },
    _recomputeChildValidation() {
      const t = /* @__PURE__ */ new Set(), n = e._config.childValidationRules ?? {};
      for (const o of e.nodes)
        o.parentId && t.add(o.parentId), (o.data?.childValidation || n[o.type ?? "default"]) && t.add(o.id);
      for (const [o] of e._validationErrorCache)
        t.add(o);
      for (const o of t) {
        const i = e.getNode(o);
        if (!i) {
          e._validationErrorCache.delete(o);
          continue;
        }
        const r = Yt(i, e._config.childValidationRules ?? {});
        if (!r) {
          e._validationErrorCache.delete(o);
          continue;
        }
        const s = e.nodes.filter((a) => a.parentId === o), l = Mi(i, s, r);
        l.length > 0 ? e._validationErrorCache.set(o, l) : e._validationErrorCache.delete(o), i._validationErrors = l;
      }
    },
    // ── Child Validation API ─────────────────────────────────────────────
    validateParent(t) {
      const n = e.getNode(t);
      if (!n) return { valid: !0, errors: [] };
      const o = Yt(n, e._config.childValidationRules ?? {});
      if (!o) return { valid: !0, errors: [] };
      const i = e.nodes.filter((s) => s.parentId === t), r = Mi(n, i, o);
      return { valid: r.length === 0, errors: r };
    },
    validateAll() {
      const t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Set();
      for (const o of e.nodes)
        o.parentId && n.add(o.parentId);
      for (const o of n)
        t.set(o, this.validateParent(o));
      return t;
    },
    getValidationErrors(t) {
      return e._validationErrorCache.get(t) ?? [];
    },
    // ── Reparent ─────────────────────────────────────────────────────────
    /**
     * Reparent a node into a new parent (or detach from current parent).
     * Handles position conversion and child validation.
     * Returns true on success, false if validation rejects the operation.
     */
    reparentNode(t, n) {
      const o = e.getNode(t);
      if (!o) return !1;
      const i = o.parentId ?? null;
      if (i === n) return !0;
      if (n === null) {
        if (i) {
          const h = this._getChildValidation(i);
          if (h) {
            const d = e.getNode(i);
            if (d) {
              const f = e.nodes.filter(
                (m) => m.parentId === i
              ), g = Hn(d, o, f, h);
              if (!g.valid)
                return e._config.onChildValidationFail && e._config.onChildValidationFail({
                  parent: d,
                  child: o,
                  operation: "remove",
                  rule: g.rule,
                  message: g.message
                }), !1;
            }
          }
        }
        e._captureHistory();
        const u = e.getAbsolutePosition(t);
        if (o.position.x = u.x, o.position.y = u.y, o.parentId = void 0, o.extent = void 0, e.nodes = st(e.nodes), e._rebuildNodeMap(), this._recomputeChildValidation(), i) {
          let h, d = i;
          for (; d; ) {
            const f = e._nodeMap.get(d);
            if (!f) break;
            f.childLayout && (h = d), d = f.parentId;
          }
          h && e.layoutChildren?.(h);
        }
        return e._emit("node-reparent", { node: o, oldParentId: i, newParentId: null }), !0;
      }
      const r = e.getNode(n);
      if (!r || it(t, e.nodes).has(n)) return !1;
      const s = this._getChildValidation(n);
      if (s) {
        const u = e.nodes.filter(
          (d) => d.parentId === n && d.id !== t
        ), h = Os(r, o, u, s);
        if (!h.valid)
          return e._config.onChildValidationFail && e._config.onChildValidationFail({
            parent: r,
            child: o,
            operation: "add",
            rule: h.rule,
            message: h.message
          }), !1;
      }
      if (i) {
        const u = this._getChildValidation(i);
        if (u) {
          const h = e.getNode(i);
          if (h) {
            const d = e.nodes.filter(
              (g) => g.parentId === i
            ), f = Hn(h, o, d, u);
            if (!f.valid)
              return e._config.onChildValidationFail && e._config.onChildValidationFail({
                parent: h,
                child: o,
                operation: "remove",
                rule: f.rule,
                message: f.message
              }), !1;
          }
        }
      }
      e._captureHistory();
      const l = i ? e.getAbsolutePosition(t) : { x: o.position.x, y: o.position.y }, a = e.getAbsolutePosition(n);
      if (o.position.x = l.x - a.x, o.position.y = l.y - a.y, o.parentId = n, e.nodes = st(e.nodes), e._rebuildNodeMap(), this._recomputeChildValidation(), n && e._nodeMap.get(n)?.childLayout) {
        if (!o.childLayout) {
          const h = e._initialDimensions.get(t);
          o.dimensions = h ? { ...h } : void 0;
        }
        if (o.order == null) {
          const h = e.nodes.filter(
            (d) => d.parentId === n && d.id !== o.id
          );
          o.order = h.length > 0 ? Math.max(...h.map((d) => d.order ?? 0)) + 1 : 0;
        }
      }
      const c = /* @__PURE__ */ new Set();
      for (const u of [n, i]) {
        if (!u) continue;
        let h, d = u;
        for (; d; ) {
          const f = e._nodeMap.get(d);
          if (!f) break;
          f.childLayout && (h = d), d = f.parentId;
        }
        h && c.add(h);
      }
      for (const u of c)
        e.layoutChildren?.(u);
      return e._emit("node-reparent", { node: o, oldParentId: i, newParentId: n }), !0;
    }
  };
}
function of(e) {
  return {
    registerCompute(t, n) {
      e._computeEngine.registerCompute(t, n);
    },
    compute(t) {
      const n = e._computeEngine.compute(e.nodes, e.edges, t);
      return e._emit("compute-complete", { results: n }), e.$nextTick(() => {
        requestAnimationFrame(() => {
          const o = /* @__PURE__ */ new Set();
          for (const [i] of n) {
            const r = e._nodeElements.get(i), s = e._nodeMap.get(i);
            if (r && s) {
              r.style.width = "", r.style.height = "";
              const l = r.offsetWidth, a = r.offsetHeight;
              (!s.dimensions || l !== s.dimensions.width || a !== s.dimensions.height) && (s.dimensions = { width: l, height: a }, o.add(i)), r.style.width = l + "px", r.style.height = a + "px";
            }
          }
          o.size > 0 && e._refreshEdgePaths(o);
        });
      }), n;
    }
  };
}
function xn(e, t, n, o, i) {
  const r = i * Math.PI / 180, s = Math.cos(r), l = Math.sin(r), a = e - n, c = t - o;
  return {
    x: n + a * s - c * l,
    y: o + a * l + c * s
  };
}
const Ys = 20, mn = Ys + 1;
function Ii(e) {
  switch (e) {
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
function sf(e, t) {
  return {
    x: e.x - t,
    y: e.y - t,
    width: e.width + t * 2,
    height: e.height + t * 2
  };
}
function rf(e, t, n) {
  return e > n.x && e < n.x + n.width && t > n.y && t < n.y + n.height;
}
function af(e, t, n, o) {
  const i = Math.min(e, t), r = Math.max(e, t);
  for (const s of o) {
    const l = s.x, a = s.x + s.width, c = s.y, u = s.y + s.height;
    if (n > c && n < u && r > l && i < a)
      return !0;
  }
  return !1;
}
function lf(e, t, n, o) {
  const i = Math.min(t, n), r = Math.max(t, n);
  for (const s of o) {
    const l = s.x, a = s.x + s.width, c = s.y, u = s.y + s.height;
    if (e > l && e < a && r > c && i < u)
      return !0;
  }
  return !1;
}
function cf(e, t, n, o, i) {
  const r = /* @__PURE__ */ new Set([e, n]), s = /* @__PURE__ */ new Set([t, o]);
  for (const h of i)
    r.add(h.x), r.add(h.x + h.width), s.add(h.y), s.add(h.y + h.height);
  const l = Array.from(r).sort((h, d) => h - d), a = Array.from(s).sort((h, d) => h - d), c = [];
  let u = 0;
  for (const h of l)
    for (const d of a) {
      let f = !1;
      for (const g of i)
        if (rf(h, d, g)) {
          f = !0;
          break;
        }
      f || c.push({ x: h, y: d, index: u++ });
    }
  return c;
}
function df(e, t, n, o) {
  const i = n.length, r = new Float64Array(i).fill(1 / 0), s = new Int32Array(i).fill(-1), l = new Uint8Array(i);
  r[e.index] = 0;
  const a = [e.index];
  for (; a.length > 0; ) {
    let h = 0;
    for (let g = 1; g < a.length; g++)
      r[a[g]] < r[a[h]] && (h = g);
    const d = a[h];
    if (a.splice(h, 1), l[d]) continue;
    if (l[d] = 1, d === t.index) break;
    const f = n[d];
    for (let g = 0; g < i; g++) {
      if (l[g]) continue;
      const m = n[g];
      if (f.x !== m.x && f.y !== m.y) continue;
      let w = !1;
      if (f.x === m.x ? w = lf(f.x, f.y, m.y, o) : w = af(f.x, m.x, f.y, o), w) continue;
      const y = Math.abs(m.x - f.x) + Math.abs(m.y - f.y), M = r[d] + y;
      M < r[g] && (r[g] = M, s[g] = d, a.push(g));
    }
  }
  if (r[t.index] === 1 / 0) return null;
  const c = [];
  let u = t.index;
  for (; u !== -1; )
    c.unshift(n[u]), u = s[u];
  return c;
}
function uf(e) {
  if (e.length <= 2) return e;
  const t = [e[0]];
  for (let n = 1; n < e.length - 1; n++) {
    const o = t[t.length - 1], i = e[n + 1], r = e[n], s = o.x === r.x && r.x === i.x, l = o.y === r.y && r.y === i.y;
    !s && !l && t.push(r);
  }
  return t.push(e[e.length - 1]), t;
}
function ff(e, t) {
  if (e.length < 2) return "";
  let n = `M${e[0].x},${e[0].y}`;
  for (let i = 1; i < e.length - 1; i++) {
    const r = e[i - 1], s = e[i], l = e[i + 1];
    t > 0 ? n += ` ${Nt(r.x, r.y, s.x, s.y, l.x, l.y, t)}` : n += ` L${s.x},${s.y}`;
  }
  const o = e[e.length - 1];
  return n += ` L${o.x},${o.y}`, n;
}
function hf(e) {
  if (e.length < 2)
    return { x: e[0]?.x ?? 0, y: e[0]?.y ?? 0, offsetX: 0, offsetY: 0 };
  let t = 0;
  const n = [];
  for (let r = 1; r < e.length; r++) {
    const s = e[r].x - e[r - 1].x, l = e[r].y - e[r - 1].y, a = Math.abs(s) + Math.abs(l);
    n.push(a), t += a;
  }
  let o = t / 2;
  for (let r = 0; r < n.length; r++) {
    if (o <= n[r]) {
      const s = n[r] > 0 ? o / n[r] : 0, l = e[r].x + (e[r + 1].x - e[r].x) * s, a = e[r].y + (e[r + 1].y - e[r].y) * s;
      return {
        x: l,
        y: a,
        offsetX: Math.abs(e[e.length - 1].x - e[0].x) / 2,
        offsetY: Math.abs(e[e.length - 1].y - e[0].y) / 2
      };
    }
    o -= n[r];
  }
  const i = e[e.length - 1];
  return { x: i.x, y: i.y, offsetX: 0, offsetY: 0 };
}
function qs(e, t, n, o, i, r, s) {
  const l = Ii(n), a = Ii(r), c = e + l.x * mn, u = t + l.y * mn, h = o + a.x * mn, d = i + a.y * mn, f = s.map((D) => sf(D, Ys)), g = cf(
    c,
    u,
    h,
    d,
    f
  ), m = g.find((D) => D.x === c && D.y === u), w = g.find((D) => D.x === h && D.y === d);
  m || g.push({ x: c, y: u, index: g.length }), w || g.push({ x: h, y: d, index: g.length });
  const y = m ?? g[g.length - (w ? 1 : 2)], M = w ?? g[g.length - 1], L = df(y, M, g, f);
  if (!L || L.length < 2) return null;
  const b = [
    { x: e, y: t, index: -1 },
    ...L,
    { x: o, y: i, index: -2 }
  ];
  return uf(b);
}
function gf({
  sourceX: e,
  sourceY: t,
  sourcePosition: n = "bottom",
  targetX: o,
  targetY: i,
  targetPosition: r = "top",
  obstacles: s,
  borderRadius: l = 5
}) {
  if (!s || s.length === 0)
    return Qt({
      sourceX: e,
      sourceY: t,
      sourcePosition: n,
      targetX: o,
      targetY: i,
      targetPosition: r,
      borderRadius: l
    });
  const a = qs(e, t, n, o, i, r, s);
  if (!a)
    return Qt({
      sourceX: e,
      sourceY: t,
      sourcePosition: n,
      targetX: o,
      targetY: i,
      targetPosition: r,
      borderRadius: l
    });
  const c = ff(a, l), { x: u, y: h, offsetX: d, offsetY: f } = hf(a);
  return {
    path: c,
    labelPosition: { x: u, y: h },
    labelOffsetX: d,
    labelOffsetY: f
  };
}
function Bs(e) {
  if (e.length < 2) return "";
  if (e.length === 2)
    return `M${e[0].x},${e[0].y} L${e[1].x},${e[1].y}`;
  let t = `M${e[0].x},${e[0].y}`;
  for (let n = 0; n < e.length - 1; n++) {
    const o = e[Math.max(0, n - 1)], i = e[n], r = e[n + 1], s = e[Math.min(e.length - 1, n + 2)], l = i.x + (r.x - o.x) / 6, a = i.y + (r.y - o.y) / 6, c = r.x - (s.x - i.x) / 6, u = r.y - (s.y - i.y) / 6;
    t += ` C${l},${a} ${c},${u} ${r.x},${r.y}`;
  }
  return t;
}
function pf(e) {
  if (e.length < 2)
    return { x: e[0]?.x ?? 0, y: e[0]?.y ?? 0, offsetX: 0, offsetY: 0 };
  let t = 0;
  const n = [];
  for (let r = 1; r < e.length; r++) {
    const s = e[r].x - e[r - 1].x, l = e[r].y - e[r - 1].y, a = Math.sqrt(s * s + l * l);
    n.push(a), t += a;
  }
  let o = t / 2;
  for (let r = 0; r < n.length; r++) {
    if (o <= n[r]) {
      const s = n[r] > 0 ? o / n[r] : 0, l = e[r].x + (e[r + 1].x - e[r].x) * s, a = e[r].y + (e[r + 1].y - e[r].y) * s;
      return {
        x: l,
        y: a,
        offsetX: Math.abs(e[e.length - 1].x - e[0].x) / 2,
        offsetY: Math.abs(e[e.length - 1].y - e[0].y) / 2
      };
    }
    o -= n[r];
  }
  const i = e[e.length - 1];
  return { x: i.x, y: i.y, offsetX: 0, offsetY: 0 };
}
function mf({
  sourceX: e,
  sourceY: t,
  sourcePosition: n = "bottom",
  targetX: o,
  targetY: i,
  targetPosition: r = "top",
  obstacles: s
}) {
  if (!s || s.length === 0)
    return $n({
      sourceX: e,
      sourceY: t,
      sourcePosition: n,
      targetX: o,
      targetY: i,
      targetPosition: r
    });
  const l = qs(e, t, n, o, i, r, s);
  if (!l)
    return $n({
      sourceX: e,
      sourceY: t,
      sourcePosition: n,
      targetX: o,
      targetY: i,
      targetPosition: r
    });
  const a = Bs(l), { x: c, y: u, offsetX: h, offsetY: d } = pf(l);
  return {
    path: a,
    labelPosition: { x: c, y: u },
    labelOffsetX: h,
    labelOffsetY: d
  };
}
function yf(e) {
  const {
    sourceX: t,
    sourceY: n,
    targetX: o,
    targetY: i,
    controlPoints: r = [],
    pathStyle: s = "bezier",
    borderRadius: l = 5
  } = e, a = [
    { x: t, y: n },
    ...r,
    { x: o, y: i }
  ];
  let c;
  switch (s) {
    case "linear":
      c = $i(a);
      break;
    case "step":
      c = wf(a, 0);
      break;
    case "smoothstep":
      c = vf(a, l);
      break;
    case "catmull-rom":
    case "bezier":
      c = Bs(a.map((d, f) => ({ ...d, index: f })));
      break;
    default:
      c = $i(a);
  }
  const u = _f(a), h = on({ sourceX: t, sourceY: n, targetX: o, targetY: i });
  return {
    path: c,
    labelPosition: u,
    labelOffsetX: h.offsetX,
    labelOffsetY: h.offsetY
  };
}
function $i(e) {
  if (e.length < 2) return "";
  let t = `M${e[0].x},${e[0].y}`;
  for (let n = 1; n < e.length; n++)
    t += ` L${e[n].x},${e[n].y}`;
  return t;
}
function wf(e, t) {
  if (e.length < 2) return "";
  if (e.length === 2)
    return Ws(e[0], e[1], t);
  let n = `M${e[0].x},${e[0].y}`;
  for (let i = 1; i < e.length - 1; i++) {
    const r = e[i - 1], s = e[i], l = e[i + 1];
    n += Nt(r.x, r.y, s.x, s.y, l.x, l.y, t);
  }
  const o = e[e.length - 1];
  return n += ` L${o.x},${o.y}`, n;
}
function Ws(e, t, n) {
  const o = (e.x + t.x) / 2, i = Nt(e.x, e.y, o, e.y, o, t.y, n), r = Nt(o, e.y, o, t.y, t.x, t.y, n);
  return `M${e.x},${e.y}${i}${r} L${t.x},${t.y}`;
}
function vf(e, t) {
  if (e.length < 2) return "";
  if (e.length === 2)
    return Ws(e[0], e[1], t);
  const n = [e[0]];
  for (let r = 0; r < e.length - 1; r++) {
    const s = e[r], l = e[r + 1], a = Math.abs(l.x - s.x), c = Math.abs(l.y - s.y);
    if (a < 1 || c < 1)
      n.push(l);
    else {
      const u = (s.x + l.x) / 2;
      n.push({ x: u, y: s.y }), n.push({ x: u, y: l.y }), n.push(l);
    }
  }
  let o = `M${n[0].x},${n[0].y}`;
  for (let r = 1; r < n.length - 1; r++) {
    const s = n[r - 1], l = n[r], a = n[r + 1];
    o += Nt(s.x, s.y, l.x, l.y, a.x, a.y, t);
  }
  const i = n[n.length - 1];
  return o += ` L${i.x},${i.y}`, o;
}
function _f(e) {
  if (e.length < 2) return e[0] ?? { x: 0, y: 0 };
  let t = 0;
  const n = [];
  for (let i = 0; i < e.length - 1; i++) {
    const r = e[i + 1].x - e[i].x, s = e[i + 1].y - e[i].y, l = Math.sqrt(r * r + s * s);
    n.push(l), t += l;
  }
  if (t === 0) return e[0];
  let o = t / 2;
  for (let i = 0; i < n.length; i++) {
    if (o <= n[i]) {
      const r = o / n[i];
      return {
        x: e[i].x + (e[i + 1].x - e[i].x) * r,
        y: e[i].y + (e[i + 1].y - e[i].y) * r
      };
    }
    o -= n[i];
  }
  return e[e.length - 1];
}
function It(e, t, n, o) {
  const i = e.dimensions?.width ?? ye, r = e.dimensions?.height ?? we, s = $t(e, o);
  let l;
  if (e.shape) {
    const a = n?.[e.shape] ?? zs[e.shape];
    if (a) {
      const c = a.perimeterPoint(i, r, t);
      l = { x: s.x + c.x, y: s.y + c.y };
    } else {
      const c = Si(i, r, t);
      l = { x: s.x + c.x, y: s.y + c.y };
    }
  } else {
    const a = Si(i, r, t);
    l = { x: s.x + a.x, y: s.y + a.y };
  }
  if (e.rotation) {
    const a = s.x + i / 2, c = s.y + r / 2;
    l = xn(l.x, l.y, a, c, e.rotation);
  }
  return l;
}
function Ai(e) {
  switch (e) {
    case "top-left":
    case "top-right":
      return "top";
    case "bottom-left":
    case "bottom-right":
      return "bottom";
    default:
      return e;
  }
}
function Mo(e) {
  const t = Math.SQRT1_2;
  switch (e) {
    case "top":
      return { x: 0, y: -1 };
    case "bottom":
      return { x: 0, y: 1 };
    case "left":
      return { x: -1, y: 0 };
    case "right":
      return { x: 1, y: 0 };
    case "top-left":
      return { x: -t, y: -t };
    case "top-right":
      return { x: t, y: -t };
    case "bottom-left":
      return { x: -t, y: t };
    case "bottom-right":
      return { x: t, y: t };
  }
}
const bf = 1.5, xf = 5 / 20;
function bt(e, t, n, o) {
  if (!o) return e;
  const i = typeof o == "string" ? {} : o, r = n ? Math.min(n.handleWidth, n.handleHeight) / 2 : 5;
  if (i.offset !== void 0) {
    const h = Mo(t);
    return { x: e.x + h.x * i.offset, y: e.y + h.y * i.offset };
  }
  const a = (i.width ?? 12.5) * bf * xf * 0.4, c = r + a, u = Mo(t);
  return { x: e.x + u.x * c, y: e.y + u.y * c };
}
function Rn(e, t, n, o = "bottom", i = "top", r, s, l, a, c, u) {
  const h = r ?? It(t, o, c, u), d = s ?? It(n, i, c, u), f = {
    sourceX: h.x,
    sourceY: h.y,
    sourcePosition: Ai(o),
    targetX: d.x,
    targetY: d.y,
    targetPosition: Ai(i)
  }, g = e.type ?? "bezier";
  if (l?.[g])
    return l[g](f);
  switch (g === "floating" ? e.pathType ?? "bezier" : g) {
    case "editable":
      return yf({
        ...f,
        controlPoints: e.controlPoints,
        pathStyle: e.pathStyle
      });
    case "avoidant":
      return mf({ ...f, obstacles: a });
    case "orthogonal":
      return gf({ ...f, obstacles: a });
    case "smoothstep":
      return Qt(f);
    case "straight":
      return $s({ sourceX: h.x, sourceY: h.y, targetX: d.x, targetY: d.y });
    default:
      return $n(f);
  }
}
function Di(e, t) {
  const n = e.dimensions?.width ?? ye, o = e.dimensions?.height ?? we, i = {
    x: e.position.x + n / 2,
    y: e.position.y + o / 2
  }, r = e.rotation ? xn(t.x, t.y, i.x, i.y, -e.rotation) : t, s = r.x - i.x, l = r.y - i.y;
  if (s === 0 && l === 0) {
    const g = { x: i.x, y: i.y - o / 2 };
    return e.rotation ? xn(g.x, g.y, i.x, i.y, e.rotation) : g;
  }
  const a = n / 2, c = o / 2, u = Math.abs(s), h = Math.abs(l);
  let d;
  u / a > h / c ? d = a / u : d = c / h;
  const f = {
    x: i.x + s * d,
    y: i.y + l * d
  };
  return e.rotation ? xn(f.x, f.y, i.x, i.y, e.rotation) : f;
}
function Hi(e, t) {
  const n = e.dimensions?.width ?? ye, o = e.dimensions?.height ?? we, i = e.position.x + n / 2, r = e.position.y + o / 2;
  if (e.rotation) {
    const f = t.x - i, g = t.y - r;
    return Math.abs(f) > Math.abs(g) ? f > 0 ? "right" : "left" : g > 0 ? "bottom" : "top";
  }
  const s = 1, l = e.position.x, a = e.position.x + n, c = e.position.y, u = e.position.y + o;
  if (Math.abs(t.x - l) <= s) return "left";
  if (Math.abs(t.x - a) <= s) return "right";
  if (Math.abs(t.y - c) <= s) return "top";
  if (Math.abs(t.y - u) <= s) return "bottom";
  const h = t.x - i, d = t.y - r;
  return Math.abs(h) > Math.abs(d) ? h > 0 ? "right" : "left" : d > 0 ? "bottom" : "top";
}
function Us(e, t) {
  const n = e.dimensions?.width ?? ye, o = e.dimensions?.height ?? we, i = t.dimensions?.width ?? ye, r = t.dimensions?.height ?? we, s = {
    x: e.position.x + n / 2,
    y: e.position.y + o / 2
  }, l = {
    x: t.position.x + i / 2,
    y: t.position.y + r / 2
  }, a = Di(e, l), c = Di(t, s), u = Hi(e, a), h = Hi(t, c);
  return {
    sx: a.x,
    sy: a.y,
    tx: c.x,
    ty: c.y,
    sourcePos: u,
    targetPos: h
  };
}
function op(e, t) {
  const n = t.x - e.x, o = t.y - e.y;
  let i, r;
  return Math.abs(n) > Math.abs(o) ? (i = n > 0 ? "right" : "left", r = n > 0 ? "left" : "right") : (i = o > 0 ? "bottom" : "top", r = o > 0 ? "top" : "bottom"), { sourcePos: i, targetPos: r };
}
function js(e) {
  return typeof e == "object" && e !== null && "from" in e && "to" in e;
}
function Zs(e, t) {
  return `${e}__grad__${t}`;
}
function Ks(e, t, n, o, i, r, s) {
  let l = e.querySelector(`#${CSS.escape(t)}`);
  if (!l) {
    l = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient"), l.id = t, l.setAttribute("gradientUnits", "userSpaceOnUse"), l.classList.add("flow-edge-gradient");
    const c = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    c.setAttribute("offset", "0%"), l.appendChild(c);
    const u = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    u.setAttribute("offset", "100%"), l.appendChild(u), e.appendChild(l);
  }
  l.setAttribute("x1", String(o)), l.setAttribute("y1", String(i)), l.setAttribute("x2", String(r)), l.setAttribute("y2", String(s));
  const a = l.querySelectorAll("stop");
  return a[0]?.setAttribute("stop-color", n.from), a[1]?.setAttribute("stop-color", n.to), l;
}
function so(e, t) {
  e.querySelector(`#${CSS.escape(t)}`)?.remove();
}
const Ef = /* @__PURE__ */ new Set(["x-data", "x-init", "x-bind", "href", "src", "action", "formaction", "srcdoc"]);
function Cf(e) {
  return e === !0 || e === "dash" ? "dash" : e === "pulse" ? "pulse" : e === "dot" ? "dot" : "none";
}
function Gs(e) {
  return e.endsWith("-l") ? "left" : e.endsWith("-r") ? "right" : null;
}
function Ri(e, t) {
  if (!t) return e;
  const n = Mo(e), o = t * Math.PI / 180, i = Math.cos(o), r = Math.sin(o), s = n.x * i - n.y * r, l = n.x * r + n.y * i;
  return Math.abs(s) > Math.abs(l) ? s > 0 ? "right" : "left" : l > 0 ? "bottom" : "top";
}
function zn(e, t, n, o, i) {
  const r = e.querySelector(`[data-flow-node-id="${CSS.escape(t)}"]`);
  if (r) {
    if (n) {
      const l = r.querySelector(`[data-flow-handle-id="${CSS.escape(n)}"]`);
      if (l)
        return l.getAttribute("data-flow-handle-position") ?? (o === "source" ? "bottom" : "top");
    }
    if (n) {
      const l = Gs(n);
      if (l && r.querySelector(`[data-flow-handle-position="${l}"]`))
        return l;
    }
    const s = r.querySelector(`[data-flow-handle-type="${o}"]`);
    if (s)
      return s.getAttribute("data-flow-handle-position") ?? (o === "source" ? "bottom" : "top");
  }
  if (i) {
    const s = o === "source" ? i.sourcePosition : i.targetPosition;
    if (s) return s;
  }
  return o === "source" ? "bottom" : "top";
}
function zi(e, t, n, o, i, r, s) {
  const l = e.querySelector(`[data-flow-node-id="${CSS.escape(t)}"]`);
  if (!l) return null;
  let a = null;
  if (o) {
    if (a = l.querySelector(`[data-flow-handle-id="${CSS.escape(o)}"]`), !a) {
      const f = Gs(o);
      f && (a = l.querySelector(`[data-flow-handle-position="${f}"]`));
    }
  } else
    a = l.querySelector(`[data-flow-handle-type="${i}"]`);
  if (!a) return null;
  const c = a.getBoundingClientRect();
  if (c.width === 0 && c.height === 0) return null;
  const u = e.getBoundingClientRect(), h = c.left + c.width / 2, d = c.top + c.height / 2;
  return {
    x: (h - u.left - s.x) / r,
    y: (d - u.top - s.y) / r,
    handleWidth: c.width / r,
    handleHeight: c.height / r
  };
}
function Sf(e, t) {
  const n = e.getTotalLength(), o = e.getPointAtLength(n * Math.max(0, Math.min(1, t)));
  return { x: o.x, y: o.y };
}
function Je(e, t, n, o, i) {
  const r = e - n, s = t - o;
  return Math.sqrt(r * r + s * s) <= i;
}
function Lf(e, t, n) {
  const o = n.x - t.x, i = n.y - t.y, r = o * o + i * i;
  if (r === 0) return Math.sqrt((e.x - t.x) ** 2 + (e.y - t.y) ** 2);
  let s = ((e.x - t.x) * o + (e.y - t.y) * i) / r;
  s = Math.max(0, Math.min(1, s));
  const l = t.x + s * o, a = t.y + s * i;
  return Math.sqrt((e.x - l) ** 2 + (e.y - a) ** 2);
}
function Mf(e) {
  e.directive(
    "flow-edge",
    (t, { expression: n }, { evaluate: o, effect: i, cleanup: r }) => {
      const s = t;
      s.style.pointerEvents = "auto";
      const l = document.createElementNS("http://www.w3.org/2000/svg", "path");
      l.setAttribute("fill", "none"), l.style.stroke = "transparent", l.style.strokeWidth = "20", l.style.pointerEvents = "stroke", l.style.cursor = "pointer", s.appendChild(l);
      let a = t.querySelector("path:not(:first-child)");
      a || (a = document.createElementNS("http://www.w3.org/2000/svg", "path"), a.setAttribute("fill", "none"), a.setAttribute("stroke-width", "1.5"), a.style.pointerEvents = "none", s.appendChild(a));
      let c = null, u = null, h = null, d = null, f = "none", g = null;
      function m(x, C, T, U, J) {
        d || (d = document.createElementNS("http://www.w3.org/2000/svg", "circle"), d.classList.add("flow-edge-dot"), d.style.pointerEvents = "none", x.appendChild(d));
        const oe = T.closest(".flow-container"), G = oe ? getComputedStyle(oe) : null, se = U.particleSize ?? (parseFloat(G?.getPropertyValue("--flow-edge-dot-size").trim() ?? "4") || 4), le = J || G?.getPropertyValue("--flow-edge-dot-duration").trim() || "2s";
        d.setAttribute("r", String(se)), U.particleColor ? d.style.fill = U.particleColor : d.style.removeProperty("fill");
        const ce = d.querySelector("animateMotion");
        ce && ce.remove();
        const te = document.createElementNS("http://www.w3.org/2000/svg", "animateMotion");
        te.setAttribute("dur", le), te.setAttribute("repeatCount", "indefinite"), te.setAttribute("path", C), d.appendChild(te);
      }
      function w() {
        d?.remove(), d = null;
      }
      let y = null, M = null, L = null, b = null;
      const D = (x) => {
        x.stopPropagation();
        const C = o(n);
        if (!C) return;
        const T = e.$data(t.closest("[x-data]"));
        T && (T._emit("edge-click", { edge: C, event: x }), ot(x, T._shortcuts?.multiSelect) ? T.selectedEdges.has(C.id) ? (T.selectedEdges.delete(C.id), C.selected = !1, j("selection", `Edge "${C.id}" deselected (shift)`)) : (T.selectedEdges.add(C.id), C.selected = !0, j("selection", `Edge "${C.id}" selected (shift)`)) : (T.deselectAll(), T.selectedEdges.add(C.id), C.selected = !0, j("selection", `Edge "${C.id}" selected`)), T._emitSelectionChange());
      }, k = (x) => {
        x.preventDefault(), x.stopPropagation();
        const C = o(n);
        if (!C) return;
        const T = e.$data(t.closest("[x-data]"));
        if (!T) return;
        const U = x.target;
        if (U.classList.contains("flow-edge-control-point")) {
          const J = parseInt(U.dataset.pointIndex ?? "", 10);
          if (!isNaN(J)) {
            T._emit("edge-control-point-context-menu", {
              edge: C,
              pointIndex: J,
              position: { x: x.clientX, y: x.clientY },
              event: x
            });
            return;
          }
        }
        T._emit("edge-context-menu", { edge: C, event: x });
      }, A = (x) => {
        x.stopPropagation(), x.preventDefault();
        const C = o(n);
        if (!C || C.type !== "editable") return;
        const T = e.$data(t.closest("[x-data]"));
        if (!T) return;
        const U = x.target;
        if (U.classList.contains("flow-edge-control-point")) {
          const J = parseInt(U.dataset.pointIndex ?? "", 10);
          !isNaN(J) && C.controlPoints && (T._captureHistory?.(), C.controlPoints.splice(J, 1), T._emit("edge-control-point-change", { edge: C, action: "remove", index: J }));
          return;
        }
        if (U.classList.contains("flow-edge-midpoint")) {
          const J = parseInt(U.dataset.segmentIndex ?? "", 10);
          if (!isNaN(J)) {
            const oe = T.screenToFlowPosition(x.clientX, x.clientY);
            C.controlPoints || (C.controlPoints = []), T._captureHistory?.(), C.controlPoints.splice(J, 0, { x: oe.x, y: oe.y }), T._emit("edge-control-point-change", { edge: C, action: "add", index: J });
          }
          return;
        }
        if (U.closest("path")) {
          const J = T.screenToFlowPosition(x.clientX, x.clientY);
          C.controlPoints || (C.controlPoints = []);
          const oe = [
            y ?? { x: 0, y: 0 },
            ...C.controlPoints,
            M ?? { x: 0, y: 0 }
          ];
          let G = 0, se = 1 / 0;
          for (let le = 0; le < oe.length - 1; le++) {
            const ce = Lf(J, oe[le], oe[le + 1]);
            ce < se && (se = ce, G = le);
          }
          T._captureHistory?.(), C.controlPoints.splice(G, 0, { x: J.x, y: J.y }), T._emit("edge-control-point-change", { edge: C, action: "add", index: G });
        }
      }, _ = (x) => {
        const C = x.target;
        if (!C.classList.contains("flow-edge-control-point") || x.button !== 0) return;
        x.stopPropagation(), x.preventDefault();
        const T = o(n);
        if (!T?.controlPoints) return;
        const U = e.$data(t.closest("[x-data]"));
        if (!U) return;
        const J = parseInt(C.dataset.pointIndex ?? "", 10);
        if (isNaN(J)) return;
        C.classList.add("dragging");
        let oe = !1;
        const G = (le) => {
          oe || (U._captureHistory?.(), oe = !0);
          let ce = U.screenToFlowPosition(le.clientX, le.clientY);
          const te = U._config?.snapToGrid;
          te && (ce = {
            x: Math.round(ce.x / te[0]) * te[0],
            y: Math.round(ce.y / te[1]) * te[1]
          }), T.controlPoints[J] = ce;
        }, se = () => {
          document.removeEventListener("pointermove", G), document.removeEventListener("pointerup", se), C.classList.remove("dragging"), oe && U._emit("edge-control-point-change", { edge: T, action: "move", index: J });
        };
        document.addEventListener("pointermove", G), document.addEventListener("pointerup", se);
      };
      s.addEventListener("contextmenu", k), s.addEventListener("dblclick", A), s.addEventListener("pointerdown", _, !0);
      let S = null;
      const $ = (x) => {
        if (x.button !== 0) return;
        x.stopPropagation();
        const C = o(n);
        if (!C) return;
        const T = e.$data(t.closest("[x-data]"));
        if (!T) return;
        const U = T._config?.reconnectSnapRadius ?? gi, J = T._config?.edgesReconnectable !== !1, oe = C.reconnectable ?? !0;
        let G = null;
        if (J && oe !== !1 && y && M) {
          const ne = T.screenToFlowPosition(x.clientX, x.clientY), F = Je(ne.x, ne.y, y.x, y.y, U) || L && Je(ne.x, ne.y, L.x, L.y, U);
          (Je(ne.x, ne.y, M.x, M.y, U) || b && Je(ne.x, ne.y, b.x, b.y, U)) && (oe === !0 || oe === "target") ? G = "target" : F && (oe === !0 || oe === "source") && (G = "source");
        }
        if (!G) {
          const ne = (F) => {
            document.removeEventListener("pointerup", ne), D(F);
          };
          document.addEventListener("pointerup", ne, { once: !0 });
          return;
        }
        const se = x.clientX, le = x.clientY;
        let ce = !1, te = !1, R = null;
        const Q = T._config?.connectionSnapRadius ?? 20;
        let Y = null, B = null, I = null, W = se, ee = le;
        const X = t.closest(".flow-container");
        if (!X) return;
        const K = G === "target" ? y : M, ie = () => {
          ce = !0, s.classList.add("flow-edge-reconnecting"), T._emit("reconnect-start", { edge: C, handleType: G }), j("reconnect", `Reconnection drag started on edge "${C.id}" (${G} end)`), B = Ct({
            connectionLineType: T._config?.connectionLineType,
            connectionLineStyle: T._config?.connectionLineStyle,
            connectionLine: T._config?.connectionLine,
            containerEl: s.closest(".flow-container") ?? void 0
          }), Y = B.svg;
          const ne = T.screenToFlowPosition(se, le);
          B.update({
            fromX: K.x,
            fromY: K.y,
            toX: ne.x,
            toY: ne.y,
            source: C.source,
            sourceHandle: C.sourceHandle
          });
          const F = X.querySelector(".flow-viewport");
          F && F.appendChild(Y), G === "target" && (T.pendingConnection = {
            source: C.source,
            sourceHandle: C.sourceHandle,
            position: ne
          }), T._pendingReconnection = {
            edge: C,
            draggedEnd: G,
            anchorPosition: { ...K },
            position: ne
          }, I = An(X, T, W, ee), G === "target" && Xt(X, C.source, C.sourceHandle ?? "source", T, C.id);
        }, O = (ne) => {
          if (W = ne.clientX, ee = ne.clientY, !ce) {
            Math.sqrt(
              (ne.clientX - se) ** 2 + (ne.clientY - le) ** 2
            ) >= bn && ie();
            return;
          }
          const F = T.screenToFlowPosition(ne.clientX, ne.clientY), V = Vt({
            containerEl: X,
            handleType: G === "target" ? "target" : "source",
            excludeNodeId: G === "target" ? C.source : C.target,
            cursorFlowPos: F,
            connectionSnapRadius: Q,
            getNode: (re) => T.getNode(re),
            toFlowPosition: (re, fe) => T.screenToFlowPosition(re, fe)
          });
          V.element !== R && (R?.classList.remove("flow-handle-active"), V.element?.classList.add("flow-handle-active"), R = V.element), B?.update({
            fromX: K.x,
            fromY: K.y,
            toX: V.position.x,
            toY: V.position.y,
            source: C.source,
            sourceHandle: C.sourceHandle
          });
          const ae = V.position;
          G === "target" && T.pendingConnection && (T.pendingConnection = {
            ...T.pendingConnection,
            position: ae
          }), T._pendingReconnection && (T._pendingReconnection = {
            ...T._pendingReconnection,
            position: ae
          }), I?.updatePointer(ne.clientX, ne.clientY);
        }, Z = () => {
          te || (te = !0, document.removeEventListener("pointermove", O), document.removeEventListener("pointerup", q), I?.stop(), I = null, B?.destroy(), B = null, Y = null, R?.classList.remove("flow-handle-active"), S = null, s.classList.remove("flow-edge-reconnecting"), Ce(X), T.pendingConnection = null, T._pendingReconnection = null);
        }, q = (ne) => {
          if (!ce) {
            Z(), D(ne);
            return;
          }
          let F = R, V = null;
          if (!F) {
            V = document.elementFromPoint(ne.clientX, ne.clientY);
            const he = G === "target" ? '[data-flow-handle-type="target"]' : '[data-flow-handle-type="source"]';
            F = V?.closest(he);
          }
          const re = (F ? F.closest("[data-flow-node-id]") : V?.closest("[data-flow-node-id]"))?.dataset.flowNodeId, fe = F?.dataset.flowHandleId;
          let pe = !1;
          if (re) {
            if (!(() => {
              const he = T.getNode(re);
              return he && !et(he);
            })()) {
              const he = G === "target" ? { source: C.source, sourceHandle: C.sourceHandle, target: re, targetHandle: fe } : { source: re, sourceHandle: fe, target: C.target, targetHandle: C.targetHandle }, xe = T.edges.filter((be) => be.id !== C.id);
              if (!Be(he, xe, { preventCycles: T._config?.preventCycles }))
                j("reconnect", "Reconnection rejected (invalid connection)");
              else if (!Fe(X, he, xe))
                j("reconnect", "Reconnection rejected (handle limit)");
              else if (!ze(X, he))
                j("reconnect", "Reconnection rejected (per-handle validator)");
              else if (T._config?.isValidConnection && !T._config.isValidConnection(he))
                j("reconnect", "Reconnection rejected (custom validator)");
              else {
                const be = { ...C };
                T._captureHistory?.(), G === "target" ? (C.target = he.target, C.targetHandle = he.targetHandle) : (C.source = he.source, C.sourceHandle = he.sourceHandle), pe = !0, j("reconnect", `Edge "${C.id}" reconnected (${G})`, he), T._emit("reconnect", { oldEdge: be, newConnection: he });
              }
            }
          }
          pe || j("reconnect", `Edge "${C.id}" reconnection cancelled — snapping back`), T._emit("reconnect-end", { edge: C, successful: pe }), Z();
        };
        document.addEventListener("pointermove", O), document.addEventListener("pointerup", q), S = Z;
      };
      s.addEventListener("pointerdown", $);
      const v = (x) => {
        const C = o(n);
        if (!C) return;
        const T = e.$data(t.closest("[x-data]"));
        if (!T) return;
        const U = T._config?.edgesReconnectable !== !1, J = C.reconnectable ?? !0;
        if (!U || J === !1 || !y || !M) {
          s.style.removeProperty("cursor"), l.style.cursor = "pointer";
          return;
        }
        const oe = T._config?.reconnectSnapRadius ?? gi, G = T.screenToFlowPosition(x.clientX, x.clientY), se = (Je(G.x, G.y, y.x, y.y, oe) || L && Je(G.x, G.y, L.x, L.y, oe)) && (J === !0 || J === "source"), le = (Je(G.x, G.y, M.x, M.y, oe) || b && Je(G.x, G.y, b.x, b.y, oe)) && (J === !0 || J === "target");
        se || le ? (s.style.cursor = "grab", l.style.cursor = "grab") : (s.style.removeProperty("cursor"), l.style.cursor = "pointer");
      };
      s.addEventListener("pointermove", v);
      const p = (x) => {
        if (x.key !== "Enter" && x.key !== " ") return;
        x.preventDefault(), x.stopPropagation();
        const C = o(n);
        if (!C) return;
        const T = e.$data(t.closest("[x-data]"));
        T && (T._emit("edge-click", { edge: C, event: x }), ot(x, T._shortcuts?.multiSelect) ? T.selectedEdges.has(C.id) ? (T.selectedEdges.delete(C.id), C.selected = !1) : (T.selectedEdges.add(C.id), C.selected = !0) : (T.deselectAll(), T.selectedEdges.add(C.id), C.selected = !0), T._emitSelectionChange());
      };
      s.addEventListener("keydown", p);
      const H = () => {
        s.matches(":focus-visible") && s.classList.add("flow-edge-focused");
      }, E = () => s.classList.remove("flow-edge-focused");
      s.addEventListener("focus", H), s.addEventListener("blur", E);
      const N = (x) => {
        x.stopPropagation();
      };
      s.addEventListener("mousedown", N);
      const P = () => {
        for (const x of [c, u, h])
          x && x.classList.add("flow-edge-hovered");
      }, z = () => {
        for (const x of [c, u, h])
          x && x.classList.remove("flow-edge-hovered");
      };
      s.addEventListener("mouseenter", P), s.addEventListener("mouseleave", z), i(() => {
        const x = o(n);
        if (!x || !a) return;
        s.setAttribute("data-flow-edge-id", x.id);
        const C = e.$data(t.closest("[x-data]"));
        if (!C?.nodes) return;
        C._layoutAnimTick;
        const T = C.getNode(x.source), U = C.getNode(x.target);
        if (!T || !U) return;
        T.sourcePosition, U.targetPosition;
        const J = St(T, C._nodeMap, C._config?.nodeOrigin), oe = St(U, C._nodeMap, C._config?.nodeOrigin), G = t.closest("[x-data]");
        let se, le, ce, te;
        if (x.type === "floating") {
          const F = Us(J, oe);
          se = F.sourcePos, le = F.targetPos, ce = { x: F.sx, y: F.sy, handleWidth: 0, handleHeight: 0 }, te = { x: F.tx, y: F.ty, handleWidth: 0, handleHeight: 0 }, y = { x: F.sx, y: F.sy }, M = { x: F.tx, y: F.ty };
        } else {
          se = zn(G, x.source, x.sourceHandle, "source", T), le = zn(G, x.target, x.targetHandle, "target", U);
          const F = e.raw(C).viewport ?? { x: 0, y: 0, zoom: 1 }, V = F.zoom || 1, ae = T.rotation, re = U.rotation;
          se = Ri(se, ae), le = Ri(le, re), ce = zi(G, x.source, J, x.sourceHandle, "source", V, F), te = zi(G, x.target, oe, x.targetHandle, "target", V, F);
          const fe = It(J, se, C._shapeRegistry, C._config?.nodeOrigin), pe = It(oe, le, C._shapeRegistry, C._config?.nodeOrigin);
          y = ce ?? fe, M = te ?? pe;
        }
        const R = bt(ce ?? y, se, ce, x.markerStart), Q = bt(te ?? M, le, te, x.markerEnd);
        L = R, b = Q;
        let Y;
        (x.type === "orthogonal" || x.type === "avoidant") && (Y = C.nodes.filter((F) => F.id !== x.source && F.id !== x.target).map((F) => {
          const V = St(F, C._nodeMap, C._config?.nodeOrigin);
          return {
            x: V.position.x,
            y: V.position.y,
            width: V.dimensions?.width ?? ye,
            height: V.dimensions?.height ?? we
          };
        }));
        const { path: B, labelPosition: I } = Rn(x, J, oe, se, le, R, Q, C._config?.edgeTypes, Y, C._shapeRegistry, C._config?.nodeOrigin);
        a.setAttribute("d", B), l.setAttribute("d", B);
        const W = x.type === "editable", ee = W && (x.showControlPoints || x.selected);
        if (s.querySelectorAll(".flow-edge-control-point, .flow-edge-midpoint").forEach((F) => F.remove()), ee) {
          const F = x.controlPoints ?? [], V = C.viewport?.zoom ?? 1, ae = 6 / V, re = 5 / V, fe = y ?? { x: 0, y: 0 }, pe = M ?? { x: 0, y: 0 }, he = [fe, ...F, pe], xe = he.length - 1, be = a.getTotalLength?.() ?? 0;
          if (be > 0) {
            const de = [0], me = 200;
            let Me = 1;
            for (let _e = 1; _e <= me && Me < he.length; _e++) {
              const Te = _e / me * be, Ee = a.getPointAtLength(Te), ge = he[Me], ue = Ee.x - ge.x, ve = Ee.y - ge.y;
              ue * ue + ve * ve < 25 && (de.push(Te), Me++);
            }
            for (; de.length <= xe; )
              de.push(be);
            for (let _e = 0; _e < xe; _e++) {
              const Te = (de[_e] + de[_e + 1]) / 2, Ee = a.getPointAtLength(Te), ge = document.createElementNS("http://www.w3.org/2000/svg", "circle");
              ge.classList.add("flow-edge-midpoint"), ge.setAttribute("cx", String(Ee.x)), ge.setAttribute("cy", String(Ee.y)), ge.setAttribute("r", String(re)), ge.dataset.segmentIndex = String(_e);
              const ue = document.createElementNS("http://www.w3.org/2000/svg", "title");
              ue.textContent = "Double-click to add control point", ge.appendChild(ue), s.appendChild(ge);
            }
          }
          for (let de = 0; de < F.length; de++) {
            const me = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            me.classList.add("flow-edge-control-point"), me.setAttribute("cx", String(F[de].x)), me.setAttribute("cy", String(F[de].y)), me.setAttribute("r", String(ae)), me.dataset.pointIndex = String(de), s.appendChild(me);
          }
        }
        if (l.style.cursor = W ? "crosshair" : "pointer", l.style.strokeWidth = String(
          x.interactionWidth ?? C._config?.defaultInteractionWidth ?? 20
        ), x.markerStart) {
          const F = Kt(x.markerStart), V = Gt(F, C._id);
          a.setAttribute("marker-start", `url(#${V})`);
        } else
          a.removeAttribute("marker-start");
        if (x.markerEnd) {
          const F = Kt(x.markerEnd), V = Gt(F, C._id);
          a.setAttribute("marker-end", `url(#${V})`);
        } else
          a.removeAttribute("marker-end");
        const X = x.strokeWidth ?? 1.5, K = Cf(x.animated);
        switch (K !== f && (a.classList.remove("flow-edge-animated", "flow-edge-pulse"), f === "dot" && w(), f = K), K) {
          case "dash":
            a.classList.add("flow-edge-animated");
            break;
          case "pulse":
            a.classList.add("flow-edge-pulse");
            break;
          case "dot":
            m(s, B, G, x, x.animationDuration);
            break;
        }
        if (x.animationDuration && K !== "none" ? (K === "dash" || K === "pulse") && (a.style.animationDuration = x.animationDuration) : (K === "dash" || K === "pulse") && a.style.removeProperty("animation-duration"), x.class) {
          const F = K === "dash" ? " flow-edge-animated" : K === "pulse" ? " flow-edge-pulse" : "";
          a.setAttribute("class", x.class + F);
        }
        if (s.setAttribute("aria-selected", String(!!x.selected)), x.selected)
          s.classList.add("flow-edge-selected"), a.style.strokeWidth = String(Math.max(X + 1, 2.5)), a.style.stroke = "var(--flow-edge-stroke-selected, " + Wn + ")";
        else {
          s.classList.remove("flow-edge-selected"), a.style.strokeWidth = String(X);
          const F = C._markerDefsEl?.querySelector("defs") ?? null;
          if (js(x.color)) {
            if (F) {
              const V = Zs(C._id, x.id), ae = x.gradientDirection === "target-source", re = y.x, fe = y.y, pe = M.x, he = M.y;
              Ks(
                F,
                V,
                ae ? { from: x.color.to, to: x.color.from } : x.color,
                re,
                fe,
                pe,
                he
              ), a.style.stroke = `url(#${V})`, g = V;
            }
          } else if (x.color) {
            if (g) {
              const V = F;
              V && so(V, g), g = null;
            }
            a.style.stroke = x.color;
          } else {
            if (g) {
              const V = F;
              V && so(V, g), g = null;
            }
            a.style.removeProperty("stroke");
          }
        }
        if (C.selectedRows?.size > 0 && !x.selected && (x.sourceHandle && C.selectedRows.has(x.sourceHandle.replace(/-[lr]$/, "")) || x.targetHandle && C.selectedRows.has(x.targetHandle.replace(/-[lr]$/, ""))) ? (s.classList.add("flow-edge-row-highlighted"), x.selected || (a.style.strokeWidth = String(Math.max(X + 0.5, 2)), a.style.stroke = getComputedStyle(s.closest(".flow-container")).getPropertyValue("--flow-edge-row-highlight-color").trim() || "#3b82f6")) : s.classList.remove("flow-edge-row-highlighted"), x.focusable ?? C._config?.edgesFocusable !== !1 ? (s.setAttribute("tabindex", "0"), s.setAttribute("role", x.ariaRole ?? "group"), s.setAttribute("aria-label", x.ariaLabel ?? (x.label ? `Edge: ${x.label}` : `Edge from ${x.source} to ${x.target}`))) : (s.removeAttribute("tabindex"), s.removeAttribute("role"), s.removeAttribute("aria-label")), x.domAttributes)
          for (const [F, V] of Object.entries(x.domAttributes))
            F.startsWith("on") || Ef.has(F.toLowerCase()) || s.setAttribute(F, V);
        const Z = (F, V, ae, re, fe) => {
          if (V) {
            if (!F && re) {
              const pe = ae.includes("flow-edge-label-start"), he = ae.includes("flow-edge-label-end");
              let xe = `[data-flow-edge-id="${fe}"].flow-edge-label`;
              pe ? xe += ".flow-edge-label-start" : he ? xe += ".flow-edge-label-end" : xe += ":not(.flow-edge-label-start):not(.flow-edge-label-end)", F = re.querySelector(xe);
            }
            return F || (F = document.createElement("div"), F.className = ae, F.dataset.flowEdgeId = fe, re && re.appendChild(F)), F.textContent = V, F;
          }
          return F && F.remove(), null;
        }, q = t.closest(".flow-viewport"), ne = x.labelVisibility ?? "always";
        if (c = Z(c, x.label, "flow-edge-label", q, x.id), c)
          if (a.getTotalLength?.()) {
            const F = x.labelPosition ?? 0.5, V = Sf(a, F);
            c.style.left = `${V.x}px`, c.style.top = `${V.y}px`;
          } else
            c.style.left = `${I.x}px`, c.style.top = `${I.y}px`;
        if (u = Z(u, x.labelStart, "flow-edge-label flow-edge-label-start", q, x.id), u && a.getTotalLength?.()) {
          const F = a.getTotalLength(), V = x.labelStartOffset ?? 30, ae = a.getPointAtLength(Math.min(V, F / 2));
          u.style.left = `${ae.x}px`, u.style.top = `${ae.y}px`;
        }
        if (h = Z(h, x.labelEnd, "flow-edge-label flow-edge-label-end", q, x.id), h && a.getTotalLength?.()) {
          const F = a.getTotalLength(), V = x.labelEndOffset ?? 30, ae = a.getPointAtLength(Math.max(F - V, F / 2));
          h.style.left = `${ae.x}px`, h.style.top = `${ae.y}px`;
        }
        for (const F of [c, u, h])
          F && (F.classList.toggle("flow-edge-label-hover", ne === "hover"), F.classList.toggle("flow-edge-label-on-select", ne === "selected"), F.classList.toggle("flow-edge-label-selected", !!x.selected));
      }), r(() => {
        if (g) {
          const C = e.$data(t.closest("[x-data]"))?._markerDefsEl?.querySelector("defs");
          C && so(C, g);
        }
        S?.(), w(), s.removeEventListener("contextmenu", k), s.removeEventListener("dblclick", A), s.removeEventListener("pointerdown", _, !0), s.removeEventListener("pointerdown", $), s.removeEventListener("pointermove", v), s.removeEventListener("keydown", p), s.removeEventListener("focus", H), s.removeEventListener("blur", E), s.removeEventListener("mousedown", N), s.removeEventListener("mouseenter", P), s.removeEventListener("mouseleave", z), c?.remove(), u?.remove(), h?.remove();
      });
    }
  );
}
function Pf(e, t) {
  return {
    /** Write node positions directly to DOM elements (bypassing Alpine effects). */
    _flushNodePositions(n) {
      for (const o of n) {
        const i = e.getNode(o);
        if (!i) continue;
        const r = e._nodeElements.get(o);
        if (!r) continue;
        const s = t.raw(i), l = s.parentId ? e.getAbsolutePosition(o) : s.position, a = s.nodeOrigin ?? e._config.nodeOrigin ?? [0, 0], c = s.dimensions?.width ?? 150, u = s.dimensions?.height ?? 40;
        r.style.left = l.x - c * a[0] + "px", r.style.top = l.y - u * a[1] + "px";
      }
    },
    /** Write node styles directly to DOM elements (bypassing Alpine effects). */
    _flushNodeStyles(n) {
      for (const o of n) {
        const i = e.getNode(o);
        if (!i) continue;
        const r = e._nodeElements.get(o);
        if (!r) continue;
        const l = t.raw(i).style;
        if (!l) continue;
        const a = typeof l == "string" ? Zt(l) : l;
        for (const [c, u] of Object.entries(a))
          r.style.setProperty(c, u);
      }
    },
    /** Write edge color/strokeWidth directly to SVG elements (bypassing Alpine effects). */
    _flushEdgeStyles(n) {
      for (const o of n) {
        const i = e.getEdge(o);
        if (!i) continue;
        const r = t.raw(i), s = e.getEdgePathElement(o);
        s && (typeof r.color == "string" && (s.style.stroke = r.color), r.strokeWidth !== void 0 && (s.style.strokeWidth = String(r.strokeWidth)));
      }
    },
    /** Push current viewport state to the DOM (transform, background, culling). */
    _flushViewport() {
      if (e._viewportEl) {
        const n = e.viewport;
        e._viewportEl.style.transform = `translate(${n.x}px, ${n.y}px) scale(${n.zoom})`;
      }
      e._applyBackground(), e._applyCulling();
    },
    /** Recompute SVG paths, label positions, and gradients for edges connected to the given node IDs. */
    _refreshEdgePaths(n) {
      for (const o of e.edges) {
        if (!n.has(o.source) && !n.has(o.target)) continue;
        const i = t.raw(e.getNode(o.source)), r = t.raw(e.getNode(o.target));
        if (!i || !r) continue;
        const s = St(i, e._nodeMap, e._config.nodeOrigin), l = St(r, e._nodeMap, e._config.nodeOrigin);
        let a, c, u, h;
        if (o.type === "floating") {
          const f = Us(s, l);
          u = { x: f.sx, y: f.sy }, h = { x: f.tx, y: f.ty };
          const g = bt(u, f.sourcePos, null, o.markerStart), m = bt(h, f.targetPos, null, o.markerEnd), w = Rn(o, s, l, f.sourcePos, f.targetPos, g, m, void 0, void 0, e._shapeRegistry, e._config.nodeOrigin);
          a = w.path, c = w.labelPosition;
        } else {
          const f = e._container, g = f ? zn(f, o.source, o.sourceHandle, "source", i) : i?.sourcePosition ?? "bottom", m = f ? zn(f, o.target, o.targetHandle, "target", r) : r?.targetPosition ?? "top";
          u = It(s, g, e._shapeRegistry, e._config.nodeOrigin), h = It(l, m, e._shapeRegistry, e._config.nodeOrigin);
          const w = bt(u, g, null, o.markerStart), y = bt(h, m, null, o.markerEnd), M = Rn(o, s, l, g, m, w, y, void 0, void 0, e._shapeRegistry, e._config.nodeOrigin);
          a = M.path, c = M.labelPosition;
        }
        const d = e.getEdgePathElement(o.id);
        if (d) {
          d.setAttribute("d", a);
          const g = d.parentElement?.querySelector("path:first-child");
          g && g !== d && g.setAttribute("d", a);
        }
        if (js(o.color)) {
          const f = e._markerDefsEl?.querySelector("defs");
          if (f) {
            const g = Zs(e._id, o.id), m = o.gradientDirection === "target-source";
            Ks(
              f,
              g,
              m ? { from: o.color.to, to: o.color.from } : o.color,
              u.x,
              u.y,
              h.x,
              h.y
            );
          }
        }
        if ((o.label || o.labelStart || o.labelEnd) && e._viewportEl) {
          if (o.label) {
            const f = e._viewportEl.querySelector(
              `[data-flow-edge-id="${o.id}"].flow-edge-label:not(.flow-edge-label-start):not(.flow-edge-label-end)`
            );
            f && (f.style.left = `${c.x}px`, f.style.top = `${c.y}px`);
          }
          if (o.labelStart && d) {
            const f = e._viewportEl.querySelector(
              `[data-flow-edge-id="${o.id}"].flow-edge-label-start`
            );
            if (f) {
              const g = d.getTotalLength(), m = o.labelStartOffset ?? 30, w = d.getPointAtLength(Math.min(m, g / 2));
              f.style.left = `${w.x}px`, f.style.top = `${w.y}px`;
            }
          }
          if (o.labelEnd && d) {
            const f = e._viewportEl.querySelector(
              `[data-flow-edge-id="${o.id}"].flow-edge-label-end`
            );
            if (f) {
              const g = d.getTotalLength(), m = o.labelEndOffset ?? 30, w = d.getPointAtLength(Math.max(g - m, g / 2));
              f.style.left = `${w.x}px`, f.style.top = `${w.y}px`;
            }
          }
        }
      }
    }
  };
}
function kf(e) {
  return {
    _applyConfigPatch(t) {
      const n = e._config;
      for (const [o, i] of Object.entries(t))
        if (i !== void 0)
          switch (n[o] = i, o) {
            case "pannable":
            case "zoomable":
            case "minZoom":
            case "maxZoom":
            case "panOnScroll":
            case "panOnScrollDirection":
            case "panOnScrollSpeed":
              e._panZoom?.update({ [o]: i });
              break;
            case "background":
              e._background = i, e._applyBackground();
              break;
            case "backgroundGap":
              e._backgroundGap = i, e._container && e._container.style.setProperty("--flow-bg-pattern-gap", String(i));
              break;
            case "patternColor":
              e._patternColorOverride = i, e._container && e._container.style.setProperty("--flow-bg-pattern-color", i);
              break;
            case "debug":
              Ss(!!i);
              break;
            case "preventOverlap":
              e._config.preventOverlap = i;
              break;
            case "reconnectOnDelete":
              e._config.reconnectOnDelete = i;
              break;
            case "nodeOrigin":
              e._config.nodeOrigin = i;
              break;
            case "preventCycles":
              e._config.preventCycles = i;
              break;
            case "loading":
              e._userLoading = !!i;
              break;
            case "loadingText":
              e._loadingText = i;
              break;
            case "colorMode":
              e._config.colorMode = i, i && e._container ? e._colorModeHandle ? e._colorModeHandle.update(i) : e._colorModeHandle = Fs(e._container, i) : !i && e._colorModeHandle && (e._colorModeHandle.destroy(), e._colorModeHandle = null);
              break;
            case "autoLayout":
              n.autoLayout = i || void 0, e._autoLayoutFailed = !1, i ? (e._autoLayoutReady = !0, e._scheduleAutoLayout()) : (e._autoLayoutReady = !1, e._autoLayoutTimer && (clearTimeout(e._autoLayoutTimer), e._autoLayoutTimer = null));
              break;
          }
    }
  };
}
let Nf = 0;
function Tf(e, t) {
  switch (e) {
    case "lines":
    case "cross":
      return `linear-gradient(0deg, ${t} 1px, transparent 1px), linear-gradient(90deg, ${t} 1px, transparent 1px)`;
    default:
      return `radial-gradient(circle, ${t} 1px, transparent 1px)`;
  }
}
function If(e) {
  e.data("flowCanvas", (t = {}) => {
    const n = {
      // ── Reactive State ────────────────────────────────────────────────
      /** Unique instance ID for SVG marker dedup, etc. */
      _id: `flow-${++Nf}`,
      nodes: t.nodes ?? [],
      edges: t.edges ?? [],
      viewport: {
        x: t.viewport?.x ?? 0,
        y: t.viewport?.y ?? 0,
        zoom: t.viewport?.zoom ?? 1
      },
      /** Whether the canvas has completed initialization and first node measurement */
      ready: !1,
      /** User-controlled loading flag, initialized from config.loading */
      _userLoading: t.loading ?? !1,
      /** Custom text for the default loading indicator */
      _loadingText: t.loadingText ?? "Loading…",
      /** Auto-injected loading overlay element (when config.loading: true and no directive) */
      _autoLoadingOverlay: null,
      /** True when the canvas is still initializing OR the user has set loading */
      get isLoading() {
        return !this.ready || this._userLoading;
      },
      /** Whether interactivity (pan/zoom/drag) is enabled */
      isInteractive: !0,
      /** Currently active connection drag, or null */
      pendingConnection: null,
      /** Currently active edge reconnection drag, or null */
      _pendingReconnection: null,
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
      _shapeRegistry: { ...zs, ...t.shapeTypes },
      // ── Background ────────────────────────────────────────────────────
      _background: t.background ?? "dots",
      _backgroundGap: t.backgroundGap ?? null,
      _patternColorOverride: t.patternColor ?? null,
      _getBackgroundGap() {
        if (this._backgroundGap !== null)
          return this._backgroundGap;
        if (this._container) {
          const s = getComputedStyle(this._container).getPropertyValue("--flow-bg-pattern-gap").trim(), l = parseFloat(s);
          if (!isNaN(l))
            return l;
        }
        return 20;
      },
      _resolveBackgroundLayers() {
        const s = this._background;
        if (!s || s === "none") return [];
        const l = this._getBackgroundGap(), a = this._patternColorOverride ?? "var(--flow-bg-pattern-color)";
        return Array.isArray(s) ? s.map((c) => ({
          variant: c.variant ?? "dots",
          gap: c.gap ?? l,
          color: c.color ?? a
        })) : [{ variant: s, gap: l, color: a }];
      },
      backgroundStyle() {
        const s = this._resolveBackgroundLayers();
        if (s.length === 0) return { backgroundImage: "", backgroundSize: "", backgroundPosition: "" };
        const l = this.viewport.zoom, a = this.viewport.x, c = this.viewport.y, u = [], h = [], d = [];
        for (const f of s) {
          const g = f.gap * l, m = f.variant === "cross" ? g / 2 : g;
          u.push(Tf(f.variant, f.color)), f.variant === "lines" || f.variant === "cross" ? (h.push(`${m}px ${m}px, ${m}px ${m}px`), d.push(`${a}px ${c}px, ${a}px ${c}px`)) : (h.push(`${g}px ${g}px`), d.push(`${a}px ${c}px`));
        }
        return {
          backgroundImage: u.join(", "),
          backgroundSize: h.join(", "),
          backgroundPosition: d.join(", ")
        };
      },
      // ── Internal ──────────────────────────────────────────────────────
      // Strip collab from stored config — provider objects may contain
      // circular references (e.g. InMemoryProvider.peer) that crash
      // Alpine's deep-reactive proxy walker.
      _config: (() => {
        const { collab: s, ...l } = t;
        return l;
      })(),
      _shortcuts: Zd(t.keyboardShortcuts),
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
      /** Stores each node's originally configured dimensions (before layout stretch). */
      _initialDimensions: /* @__PURE__ */ new Map(),
      _edgeMap: /* @__PURE__ */ new Map(),
      _viewportEl: null,
      _history: null,
      _announcer: null,
      _computeEngine: new du(),
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
      // ── Auto-Layout ──────────────────────────────────────────────────
      _autoLayoutTimer: null,
      _autoLayoutReady: !1,
      _autoLayoutFailed: !1,
      // ── Viewport Culling (CSS-only, outside Alpine reactive system) ────
      _nodeElements: /* @__PURE__ */ new Map(),
      _edgeSvgElements: /* @__PURE__ */ new Map(),
      _visibleNodeIds: /* @__PURE__ */ new Set(),
      // ── Context Menu Auto-Populate ─────────────────────────────────────
      _contextMenuListeners: [],
      // ── Drop Zone ───────────────────────────────────────────────────────
      _onDropZoneDragOver: null,
      _onDropZoneDrop: null,
      // ── Event Dispatch ────────────────────────────────────────────────
      /**
       * Emit an event: debug log it, invoke the config callback, and
       * dispatch a DOM CustomEvent (flow-xxx) for Alpine @flow-xxx listeners.
       */
      _emit(s, l) {
        j("event", s, l);
        const a = "on" + s.split("-").map(
          (u) => u.charAt(0).toUpperCase() + u.slice(1)
        ).join(""), c = t[a];
        typeof c == "function" && c(l), this._container?.dispatchEvent(new CustomEvent(`flow-${s}`, {
          bubbles: !0,
          detail: l
        })), this._announcer?.handleEvent(s, l ?? {}), t.computeMode === "auto" && (s === "nodes-change" || s === "edges-change") && (this._computeDebounceTimer && clearTimeout(this._computeDebounceTimer), this._computeDebounceTimer = setTimeout(() => {
          this._computeDebounceTimer = null, this.compute();
        }, 16));
      },
      /** Route a warning through the onError callback (if set) and console.warn. */
      _warn(s, l) {
        typeof t.onError == "function" && t.onError(s, l), console.warn(`[AlpineFlow] ${l}`);
      },
      _emitSelectionChange() {
        this._emit("selection-change", {
          nodes: [...this.selectedNodes],
          edges: [...this.selectedEdges],
          rows: [...this.selectedRows]
        });
      },
      _rebuildNodeMap() {
        this._nodeMap = Ds(this.nodes);
      },
      _rebuildEdgeMap() {
        this._edgeMap = new Map(this.edges.map((s) => [s.id, s]));
      },
      /**
       * Hydrate from a pre-rendered static diagram.
       * Reads the render plan from data-flow-plan, populates node dimensions and
       * viewport from it, then strips the static markers so normal reactivity takes over.
       */
      _hydrateFromStatic() {
        const s = this._container.getAttribute("data-flow-plan");
        if (!s) return;
        let l;
        try {
          l = JSON.parse(s);
        } catch {
          return;
        }
        const a = /* @__PURE__ */ new Map();
        for (const c of l.nodes ?? [])
          a.set(c.id, { width: c.width, height: c.height });
        for (const c of this.nodes) {
          const u = a.get(c.id);
          u && !c.dimensions && (c.dimensions = { width: u.width, height: u.height }, this._initialDimensions.set(c.id, { ...u }));
        }
        l.viewport && (this.viewport.x = l.viewport.x, this.viewport.y = l.viewport.y, this.viewport.zoom = l.viewport.zoom), this._hydratedFromStatic = !0, this._container.removeAttribute("data-flow-static"), this._container.removeAttribute("data-flow-plan"), this._container.classList.remove("flow-static");
      },
      _captureHistory() {
        this._history?.capture({ nodes: this.nodes, edges: this.edges });
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
        const l = this.backgroundStyle();
        Object.assign(s.style, {
          backgroundImage: l.backgroundImage,
          backgroundSize: l.backgroundSize,
          backgroundPosition: l.backgroundPosition
        });
      },
      /**
       * Toggle CSS display on off-screen nodes and edges.
       * Called from onTransformChange — entirely outside Alpine's reactive system.
       */
      _applyCulling() {
        if (t.viewportCulling !== !0 || !this._container) return;
        const s = this._container.clientWidth, l = this._container.clientHeight;
        if (s === 0 || l === 0) return;
        const a = t.cullingBuffer ?? 100, c = cd(this.viewport, s, l, a), u = /* @__PURE__ */ new Set();
        for (const h of this.nodes) {
          if (h.hidden) continue;
          const d = h.dimensions?.width ?? 150, f = h.dimensions?.height ?? 50, g = h.parentId ? So(h, this._nodeMap, this._config.nodeOrigin) : h.position, m = !(g.x + d < c.minX || g.x > c.maxX || g.y + f < c.minY || g.y > c.maxY);
          m && u.add(h.id);
          const w = this._nodeElements.get(h.id);
          w && (w.style.display = m ? "" : "none");
        }
        this._visibleNodeIds = u;
      },
      _getVisibleNodeIds() {
        return this._visibleNodeIds;
      },
      _applyZoomLevel(s) {
        if (t.zoomLevels === !1) return;
        const l = t.zoomLevels?.far ?? 0.4, a = t.zoomLevels?.medium ?? 0.75, c = s < l ? "far" : s < a ? "medium" : "close";
        c !== this._zoomLevel && (this._zoomLevel = c, this._container?.setAttribute("data-zoom-level", c));
      },
      getAbsolutePosition(s) {
        const l = this._nodeMap.get(s);
        return l ? So(l, this._nodeMap, this._config.nodeOrigin) : { x: 0, y: 0 };
      },
      // ── Init Helpers ─────────────────────────────────────────────────
      /** Enable debug logging if configured. */
      _initDebug() {
        t.debug && Ss(!0);
      },
      /** Set up container element, attributes, CSS custom properties, animator. */
      _initContainer() {
        this._container = this.$el, this._container.setAttribute("data-flow-canvas", ""), t.fitViewOnInit && this._container.setAttribute("data-fit-view", ""), this._container.setAttribute("role", "application"), this._container.setAttribute("aria-label", t.ariaLabel ?? "Flow diagram"), this._containerStyles = getComputedStyle(this._container), this._animator = new vd(xo), t.patternColor && this._container.style.setProperty("--flow-bg-pattern-color", t.patternColor), t.backgroundGap && this._container.style.setProperty("--flow-bg-pattern-gap", String(t.backgroundGap)), this._applyZoomLevel(this.viewport.zoom);
      },
      /** Create color mode handle if configured. */
      _initColorMode() {
        t.colorMode && (this._colorModeHandle = Fs(this._container, t.colorMode));
      },
      /** Hydrate from static HTML, sort nodes, rebuild maps, capture initial dimensions. */
      _initHydration() {
        this._container.hasAttribute("data-flow-static") && this._hydrateFromStatic(), this.nodes = st(this.nodes), this._rebuildNodeMap(), this._rebuildEdgeMap();
        for (const s of this.nodes)
          s.dimensions && this._initialDimensions.set(s.id, { ...s.dimensions });
      },
      /** Create FlowHistory if configured. */
      _initHistory() {
        t.history && (this._history = new hd(t.historyMaxSize ?? 50));
      },
      /** Create screen reader announcer. */
      _initAnnouncer() {
        if (t.announcements !== !1 && this._container) {
          const s = typeof t.announcements == "object" ? t.announcements.formatMessage : void 0;
          this._announcer = new cu(this._container, s);
        }
      },
      /** Set up collaboration bridge via collab addon plugin. */
      _initCollab() {
        if (t.collab && this._container) {
          const s = _t("collab");
          if (!s) {
            console.error("[AlpineFlow] Collaboration requires the collab plugin. Register it with: Alpine.plugin(AlpineFlowCollab)");
            return;
          }
          const l = this._container, { Doc: a, Awareness: c, CollabBridge: u, CollabAwareness: h } = s, d = t.collab, f = new a(), g = new c(f), m = new u(f, this, d.provider), w = new h(g, d.user);
          if (ke.set(l, { bridge: m, awareness: w, doc: f }), d.provider.connect(f, g), d.cursors !== !1) {
            let y = !1;
            const M = d.throttle ?? 20, L = (k) => {
              if (y) return;
              y = !0;
              const A = l.getBoundingClientRect(), _ = (k.clientX - A.left - this.viewport.x) / this.viewport.zoom, S = (k.clientY - A.top - this.viewport.y) / this.viewport.zoom;
              w.updateCursor({ x: _, y: S }), setTimeout(() => {
                y = !1;
              }, M);
            }, b = () => {
              w.updateCursor(null);
            };
            l.addEventListener("mousemove", L), l.addEventListener("mouseleave", b);
            const D = ke.get(l);
            D.cursorCleanup = () => {
              l.removeEventListener("mousemove", L), l.removeEventListener("mouseleave", b);
            };
          }
        }
      },
      /** Create panZoom instance, viewport element fallback, apply background, register with store, setup marker defs. */
      _initPanZoom() {
        if (j("init", `flowCanvas "${this._id}" initializing`, {
          nodes: this.nodes.map((s) => ({ id: s.id, type: s.type ?? "default", position: s.position, parentId: s.parentId })),
          edges: this.edges.map((s) => ({ id: s.id, source: s.source, target: s.target, type: s.type ?? "default" })),
          config: { minZoom: t.minZoom, maxZoom: t.maxZoom, pannable: t.pannable, zoomable: t.zoomable, debug: t.debug }
        }), this._panZoom = sd(this._container, {
          onTransformChange: (s) => {
            this.viewport.x = s.x, this.viewport.y = s.y, this.viewport.zoom = s.zoom, this._viewportEl && (this._viewportEl.style.transform = `translate(${s.x}px, ${s.y}px) scale(${s.zoom})`), this._applyBackground(), this._applyCulling(), this._applyZoomLevel(s.zoom), this.contextMenu.show && this.closeContextMenu(), this._emit("viewport-change", { viewport: { ...s } });
          },
          onMoveStart: (s) => {
            this._emit("viewport-move-start", { viewport: { ...s } });
          },
          onMove: (s) => {
            this._emit("viewport-move", { viewport: { ...s } });
          },
          onMoveEnd: (s) => {
            this._emit("viewport-move-end", { viewport: { ...s } });
          },
          minZoom: t.minZoom,
          maxZoom: t.maxZoom,
          pannable: t.pannable,
          zoomable: t.zoomable,
          translateExtent: t.translateExtent,
          isLocked: () => this._animationLocked,
          noPanClassName: t.noPanClassName ?? "nopan",
          noWheelClassName: t.noWheelClassName,
          zoomOnDoubleClick: t.zoomOnDoubleClick,
          panOnDrag: t.panOnDrag,
          panActivationKeyCode: t.panActivationKeyCode,
          zoomActivationKeyCode: t.zoomActivationKeyCode,
          isTouchSelectionMode: () => this._touchSelectionMode,
          panOnScroll: t.panOnScroll,
          panOnScrollDirection: t.panOnScrollDirection,
          panOnScrollSpeed: t.panOnScrollSpeed,
          onScrollPan: (s, l) => {
            this.panBy(s, l);
          }
        }), t.viewport) {
          const s = {
            x: t.viewport.x ?? 0,
            y: t.viewport.y ?? 0,
            zoom: t.viewport.zoom ?? 1
          };
          this.viewport.x = s.x, this.viewport.y = s.y, this.viewport.zoom = s.zoom, this._panZoom.setViewport(s);
        }
        this.$nextTick(() => {
          if (this._viewportEl || (this._viewportEl = this._container?.querySelector(".flow-viewport")), this._viewportEl) {
            const s = this.viewport;
            this._viewportEl.style.transform = `translate(${s.x}px, ${s.y}px) scale(${s.zoom})`;
          }
        }), this._applyBackground(), this.$store.flow.register(this._id, this), this._onContainerPointerDown = () => {
          this.$store.flow.activate(this._id);
        }, this._container.addEventListener("pointerdown", this._onContainerPointerDown), Object.keys(this.$store.flow.instances).length === 1 && this.$store.flow.activate(this._id), this._setupMarkerDefs();
      },
      /** Canvas click handler, context menu handler, long press, touch selection mode, context menu event listeners. */
      _initClickHandlers() {
        this._onCanvasClick = (a) => {
          if (this._suppressNextCanvasClick) {
            this._suppressNextCanvasClick = !1;
            return;
          }
          this.pendingConnection && (this._emit("connect-end", {
            connection: null,
            source: this.pendingConnection.source,
            sourceHandle: this.pendingConnection.sourceHandle,
            position: this.screenToFlowPosition(a.clientX, a.clientY)
          }), this.pendingConnection = null, this._container?.classList.remove("flow-connecting"), this._container && Ce(this._container));
          const c = a.target;
          if (c === this._container || c.classList.contains("flow-viewport")) {
            const u = this.screenToFlowPosition(a.clientX, a.clientY);
            this._emit("pane-click", { event: a, position: u }), this.deselectAll();
          }
        }, this._container.addEventListener("click", this._onCanvasClick), this._onCanvasContextMenu = (a) => {
          const c = a.target;
          if (c === this._container || c.classList.contains("flow-viewport"))
            if (a.preventDefault(), this.selectedNodes.size > 1) {
              const u = this.nodes.filter((h) => this.selectedNodes.has(h.id));
              this._emit("selection-context-menu", { nodes: u, event: a });
            } else {
              const u = this.screenToFlowPosition(a.clientX, a.clientY);
              this._emit("pane-context-menu", { event: a, position: u });
            }
        }, this._container.addEventListener("contextmenu", this._onCanvasContextMenu);
        const s = t.longPressAction ?? "context-menu";
        if (s && (this._longPressCleanup = Kd(
          this._container,
          (a) => {
            const c = a.target;
            if (s === "context-menu") {
              const u = c.closest("[data-flow-node-id]");
              if (u) {
                const d = u.getAttribute("data-flow-node-id"), f = this._nodeMap.get(d);
                if (f) {
                  this._emit("node-context-menu", { node: f, event: a });
                  return;
                }
              }
              const h = c.closest(".flow-edge-svg");
              if (h) {
                const d = h.getAttribute("data-edge-id"), f = d ? this._edgeMap.get(d) : void 0;
                if (f) {
                  this._emit("edge-context-menu", { edge: f, event: a });
                  return;
                }
              }
              if (this.selectedNodes.size > 1) {
                const d = this.nodes.filter((f) => this.selectedNodes.has(f.id));
                this._emit("selection-context-menu", { nodes: d, event: a });
              } else {
                const d = this.screenToFlowPosition(a.clientX, a.clientY);
                this._emit("pane-context-menu", { event: a, position: d });
              }
            } else if (s === "select") {
              const u = c.closest("[data-flow-node-id]");
              if (u) {
                const h = u.getAttribute("data-flow-node-id");
                this.selectedNodes.has(h) ? this.selectedNodes.delete(h) : this.selectedNodes.add(h);
              }
            }
          },
          { duration: t.longPressDuration ?? 500 }
        )), t.touchSelectionMode !== !1) {
          let a = 0, c = 0;
          const u = (m) => {
            m.pointerType === "touch" && (c++, c === 2 && Date.now() - a < 300 && (this._touchSelectionMode = !this._touchSelectionMode, this._container?.classList.toggle("flow-touch-selection-mode", this._touchSelectionMode)), a = Date.now());
          }, h = (m) => {
            m.pointerType === "touch" && (c = Math.max(0, c - 1), c === 0 && (a = 0));
          }, d = this._container;
          if (!d) return;
          d.addEventListener("pointerdown", u), d.addEventListener("pointerup", h), d.addEventListener("pointercancel", h);
          const f = () => {
            document.hidden && (c = 0);
          };
          document.addEventListener("visibilitychange", f);
          const g = document.createElement("div");
          g.className = "flow-touch-selection-mode-indicator", g.textContent = "Selection Mode — tap with two fingers to exit", d.appendChild(g), this._touchSelectionCleanup = () => {
            d.removeEventListener("pointerdown", u), d.removeEventListener("pointerup", h), d.removeEventListener("pointercancel", h), document.removeEventListener("visibilitychange", f), g.remove();
          };
        }
        const l = [
          { event: "flow-node-context-menu", handler: ((a) => {
            Object.assign(this.contextMenu, { show: !0, type: "node", x: a.detail.event.clientX, y: a.detail.event.clientY, node: a.detail.node, edge: null, position: null, nodes: null, event: a.detail.event });
          }) },
          { event: "flow-edge-context-menu", handler: ((a) => {
            Object.assign(this.contextMenu, { show: !0, type: "edge", x: a.detail.event.clientX, y: a.detail.event.clientY, node: null, edge: a.detail.edge, position: null, nodes: null, event: a.detail.event });
          }) },
          { event: "flow-pane-context-menu", handler: ((a) => {
            Object.assign(this.contextMenu, { show: !0, type: "pane", x: a.detail.event.clientX, y: a.detail.event.clientY, node: null, edge: null, position: a.detail.position, nodes: null, event: a.detail.event });
          }) },
          { event: "flow-selection-context-menu", handler: ((a) => {
            Object.assign(this.contextMenu, { show: !0, type: "selection", x: a.detail.event.clientX, y: a.detail.event.clientY, node: null, edge: null, position: null, nodes: a.detail.nodes, event: a.detail.event });
          }) }
        ];
        for (const a of l)
          this._container.addEventListener(a.event, a.handler);
        this._contextMenuListeners = l;
      },
      /** Keyboard shortcut handler (delete, arrows, undo/redo, copy/paste/cut, selection tool toggle, escape). */
      _initKeyboard() {
        this._onKeyDown = (s) => {
          if (!this._active || this._animationLocked) return;
          const l = s.target.tagName, a = this._shortcuts;
          if (Re(s.key, a.escape) && this.contextMenu.show) {
            this.closeContextMenu();
            return;
          }
          if (Re(s.key, a.escape) && this.pendingConnection) {
            this._emit("connect-end", {
              connection: null,
              source: this.pendingConnection.source,
              sourceHandle: this.pendingConnection.sourceHandle,
              position: { x: 0, y: 0 }
            }), this.pendingConnection = null, this._container?.classList.remove("flow-connecting"), this._container && Ce(this._container);
            return;
          }
          if (Re(s.key, a.delete)) {
            if (l === "INPUT" || l === "TEXTAREA") return;
            this._deleteSelected();
          }
          if (Re(s.key, this._shortcuts.selectionToolToggle) && !s.ctrlKey && !s.metaKey) {
            if (l === "INPUT" || l === "TEXTAREA") return;
            this._selectionTool = this._selectionTool === "box" ? "lasso" : "box";
            return;
          }
          if (Re(s.key, a.moveNodes)) {
            if (l === "INPUT" || l === "TEXTAREA" || this._config?.disableKeyboardA11y || this.selectedNodes.size === 0) return;
            s.preventDefault();
            const c = ot(s, a.moveStepModifier) ? a.moveStep * a.moveStepMultiplier : a.moveStep;
            let u = 0, h = 0;
            switch (s.key) {
              case "ArrowUp":
                h = -c;
                break;
              case "ArrowDown":
                h = c;
                break;
              case "ArrowLeft":
                u = -c;
                break;
              case "ArrowRight":
                u = c;
                break;
              default: {
                const d = Array.isArray(a.moveNodes) ? a.moveNodes : [a.moveNodes], f = s.key.length === 1 ? s.key.toLowerCase() : s.key, g = d.findIndex((m) => (m.length === 1 ? m.toLowerCase() : m) === f);
                g === 0 ? h = -c : g === 1 ? h = c : g === 2 ? u = -c : g === 3 && (u = c);
              }
            }
            this._captureHistory();
            for (const d of this.selectedNodes) {
              const f = this.getNode(d);
              if (f && Is(f)) {
                f.position.x += u, f.position.y += h;
                const g = this._container ? ke.get(this._container) : void 0;
                g?.bridge && g.bridge.pushLocalNodeUpdate(f.id, { position: f.position });
              }
            }
          }
          if ((s.ctrlKey || s.metaKey) && !s.shiftKey && Re(s.key, a.undo)) {
            if (l === "INPUT" || l === "TEXTAREA") return;
            s.preventDefault(), this.undo();
          }
          if ((s.ctrlKey || s.metaKey) && s.shiftKey && Re(s.key, a.redo)) {
            if (l === "INPUT" || l === "TEXTAREA") return;
            s.preventDefault(), this.redo();
          }
          if ((s.ctrlKey || s.metaKey) && !s.shiftKey) {
            if (l === "INPUT" || l === "TEXTAREA") return;
            Re(s.key, a.copy) ? (s.preventDefault(), this.copy()) : Re(s.key, a.paste) ? (s.preventDefault(), this.paste()) : Re(s.key, a.cut) && (s.preventDefault(), this.cut());
          }
        }, document.addEventListener("keydown", this._onKeyDown);
      },
      /** Create minimap if configured. */
      _initMinimap() {
        t.minimap && (this._minimap = xd(this._container, {
          getState: () => ({
            nodes: Dn(this.nodes, this._nodeMap, this._config.nodeOrigin),
            viewport: this.viewport,
            containerWidth: this._container?.clientWidth ?? 0,
            containerHeight: this._container?.clientHeight ?? 0
          }),
          setViewport: (s) => this._panZoom?.setViewport(s),
          config: t
        }), this._minimap.render(), this.$watch("nodes", () => this._minimap?.render()), this.$watch("viewport", () => this._minimap?.updateViewport()));
      },
      /** Create controls panel if configured. */
      _initControls() {
        if (t.controls) {
          const s = t.controlsContainer ? document.querySelector(t.controlsContainer) ?? this._container : this._container, l = s !== this._container;
          this._controls = Pd(s, {
            position: t.controlsPosition ?? "bottom-left",
            orientation: t.controlsOrientation ?? "vertical",
            external: l,
            showZoom: t.controlsShowZoom ?? !0,
            showFitView: t.controlsShowFitView ?? !0,
            showInteractive: t.controlsShowInteractive ?? !0,
            showResetPanels: t.controlsShowResetPanels ?? !1,
            onZoomIn: () => this.zoomIn(),
            onZoomOut: () => this.zoomOut(),
            onFitView: () => this.fitView({ padding: bo }),
            onToggleInteractive: () => this.toggleInteractive(),
            onResetPanels: () => this.resetPanels()
          }), this.$watch("isInteractive", (a) => {
            this._controls?.update({ isInteractive: a });
          });
        }
      },
      /** Selection box/lasso setup (pointerdown/pointermove/pointerup handlers). */
      _initSelection() {
        this._selectionBox = kd(this._container), this._lasso = Nd(this._container), this._selectionTool = t.selectionTool ?? "box", this._onSelectionPointerDown = (s) => {
          if (!this._config.selectionOnDrag && !this._touchSelectionMode && !ot(s, this._shortcuts.selectionBox))
            return;
          const l = s.target;
          if (l !== this._container && !l.classList.contains("flow-viewport"))
            return;
          s.stopPropagation(), s.preventDefault(), this._selectionShiftHeld = !0;
          const a = this._config.selectionMode ?? "partial", c = ot(s, this._shortcuts.selectionModeToggle);
          if (this._selectionEffectiveMode = c ? a === "partial" ? "full" : "partial" : a, !this._container) return;
          const u = this._container.getBoundingClientRect(), h = s.clientX - u.left, d = s.clientY - u.top;
          this._selectionTool === "lasso" ? this._lasso.start(h, d, this._selectionEffectiveMode) : this._selectionBox.start(h, d, this._selectionEffectiveMode), s.target.setPointerCapture(s.pointerId);
        }, this._onSelectionPointerMove = (s) => {
          if (!(this._selectionTool === "lasso" ? this._lasso?.isActive() : this._selectionBox?.isActive()) || !this._container) return;
          const a = this._container.getBoundingClientRect(), c = s.clientX - a.left, u = s.clientY - a.top;
          this._selectionTool === "lasso" ? this._lasso.update(c, u) : this._selectionBox.update(c, u);
        }, this._onSelectionPointerUp = (s) => {
          if (!(this._selectionTool === "lasso" ? this._lasso?.isActive() : this._selectionBox?.isActive())) return;
          s.target.releasePointerCapture(s.pointerId), this._suppressNextCanvasClick = !0;
          const a = Dn(this.nodes, this._nodeMap, this._config.nodeOrigin);
          let c, u = [];
          if (this._selectionTool === "lasso") {
            const h = this._lasso.end(this.viewport);
            if (!h) return;
            const d = this._selectionEffectiveMode === "full" ? Ad(a, h) : $d(a, h), f = new Set(d.map((g) => g.id));
            if (c = this.nodes.filter((g) => f.has(g.id)), this._config.lassoSelectsEdges)
              for (const g of this.edges) {
                if (g.hidden) continue;
                const m = this._container?.querySelector(
                  `[data-flow-edge-id="${CSS.escape(g.id)}"] path`
                );
                if (!m) continue;
                const w = m.getTotalLength(), y = Math.max(10, Math.ceil(w / 20));
                let M = 0;
                for (let b = 0; b <= y; b++) {
                  const D = m.getPointAtLength(b / y * w);
                  Oo(D.x, D.y, h) && M++;
                }
                (this._selectionEffectiveMode === "full" ? M === y + 1 : M > 0) && u.push(g.id);
              }
          } else {
            const h = this._selectionBox.end(this.viewport);
            if (!h) return;
            const d = this._selectionEffectiveMode === "full" ? ld(a, h, this._config.nodeOrigin) : ad(a, h, this._config.nodeOrigin), f = new Set(d.map((g) => g.id));
            c = this.nodes.filter((g) => f.has(g.id));
          }
          this._selectionShiftHeld || this.deselectAll();
          for (const h of c) {
            if (!Co(h) || h.hidden) continue;
            h.selected = !0, this.selectedNodes.add(h.id);
            const d = this._container?.querySelector(`[data-flow-node-id="${CSS.escape(h.id)}"]`);
            d && d.classList.add("flow-node-selected");
          }
          for (const h of u) {
            const d = this.getEdge(h);
            d && (d.selected = !0, this.selectedEdges.add(d.id));
          }
          (c.length > 0 || u.length > 0) && this._emitSelectionChange(), this._selectionShiftHeld = !1;
        }, this._container.addEventListener("pointerdown", this._onSelectionPointerDown), this._container.addEventListener("pointermove", this._onSelectionPointerMove), this._container.addEventListener("pointerup", this._onSelectionPointerUp);
      },
      /** Drop zone drag/drop handlers if onDrop configured. */
      _initDropZone() {
        t.onDrop && (this._onDropZoneDragOver = (s) => {
          s.preventDefault(), s.dataTransfer && (s.dataTransfer.dropEffect = "move");
        }, this._onDropZoneDrop = (s) => {
          s.preventDefault();
          const l = s.dataTransfer?.getData("application/alpineflow");
          if (!l || !t.onDrop) return;
          let a;
          try {
            a = JSON.parse(l);
          } catch {
            a = l;
          }
          if (!this._container) return;
          const c = Es(
            s.clientX,
            s.clientY,
            this.viewport,
            this._container.getBoundingClientRect()
          ), h = document.elementFromPoint(s.clientX, s.clientY)?.closest("[x-flow-node]"), d = h?.dataset.flowNodeId ? this.getNode(h.dataset.flowNodeId) ?? null : null, f = t.onDrop({ data: a, position: c, targetNode: d });
          f && this.addNodes(f, { center: !0 });
        }, this._container.addEventListener("dragover", this._onDropZoneDragOver), this._container.addEventListener("drop", this._onDropZoneDrop));
      },
      /** Run initial child layouts for all layout parents. */
      _initChildLayout() {
        if (this.$wire) {
          const s = this.$wire;
          t.wireEvents && mu(t, s, t.wireEvents);
          const l = yu(this, s), a = gu(this, s);
          this._wireCleanup = () => {
            l(), a();
          }, j("init", `wire bridge activated for "${this._id}"`);
        }
        j("init", `flowCanvas "${this._id}" ready`), this._emit("init"), this._recomputeChildValidation();
        for (const s of this.nodes)
          s.childLayout && !s.parentId && this.layoutChildren(s.id);
        for (const s of this.nodes)
          s.childLayout && s.parentId && (this._nodeMap.get(s.parentId)?.childLayout || this.layoutChildren(s.id));
        t.fitViewOnInit && requestAnimationFrame(() => {
          this.fitView();
        });
      },
      /** Validate auto-layout dependency and start initial layout. */
      _initAutoLayout() {
        if (t.autoLayout) {
          const s = t.autoLayout.algorithm, l = {
            dagre: "layout:dagre",
            force: "layout:force",
            hierarchy: "layout:hierarchy",
            elk: "layout:elk"
          }, a = {
            dagre: "AlpineFlowDagre",
            force: "AlpineFlowForce",
            hierarchy: "AlpineFlowHierarchy",
            elk: "AlpineFlowElk"
          }, c = l[s];
          c && _t(c) ? (this._autoLayoutReady = !0, this.$nextTick(() => this._runAutoLayout())) : c && this._warn("AUTO_LAYOUT_MISSING_DEP", `autoLayout requires the ${s} plugin. Register it with: Alpine.plugin(${a[s]})`);
        }
      },
      /** requestAnimationFrame ready flip, loading watch, loading overlay injection. */
      _initReady() {
        const s = t.fitViewOnInit ? 2 : 1;
        let l = 0;
        const a = () => {
          if (l++, l < s) {
            requestAnimationFrame(a);
            return;
          }
          this.$nextTick(() => {
            this.ready = !0;
          });
        };
        if (requestAnimationFrame(a), this.$watch("isLoading", (c) => {
          this._container && (this._container.classList.toggle("flow-loading", c), this._container.classList.toggle("flow-ready", !c), !c && this._autoLoadingOverlay && (this._autoLoadingOverlay.remove(), this._autoLoadingOverlay = null));
        }), this._container && this._container.classList.add("flow-loading"), t.loading && this._container && !this._container.querySelector("[data-flow-loading-directive]")) {
          const c = document.createElement("div");
          c.className = "flow-loading-overlay";
          const u = document.createElement("div");
          u.className = "flow-loading-indicator";
          const h = document.createElement("div");
          h.className = "flow-loading-indicator-node";
          const d = document.createElement("div");
          d.className = "flow-loading-indicator-text", d.textContent = this._loadingText, u.appendChild(h), u.appendChild(d), c.appendChild(u), this._container.appendChild(c), this._autoLoadingOverlay = c;
        }
      },
      // ── Lifecycle ─────────────────────────────────────────────────────
      init() {
        o = this, this._initDebug(), this._initContainer(), this._initColorMode(), this._initHydration(), this._initHistory(), this._initAnnouncer(), this._initCollab(), this._initPanZoom(), this._initClickHandlers(), this._initKeyboard(), this._initMinimap(), this._initControls(), this._initSelection(), this._initChildLayout(), this._initDropZone(), this._initAutoLayout(), this._initReady();
      },
      _setupMarkerDefs() {
        const s = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        s.style.cssText = "position:absolute;width:0;height:0;overflow:hidden;";
        const l = document.createElementNS("http://www.w3.org/2000/svg", "defs");
        s.appendChild(l), this._container?.appendChild(s), this._markerDefsEl = s, this._updateMarkerDefs(), this.$watch("edges", () => {
          this._updateMarkerDefs();
        });
      },
      _updateMarkerDefs() {
        if (!this._markerDefsEl) return;
        const s = this._markerDefsEl.querySelector("defs"), l = /* @__PURE__ */ new Map();
        for (const u of this.edges)
          for (const h of [u.markerStart, u.markerEnd]) {
            if (!h) continue;
            const d = Kt(h), f = Gt(d, this._id);
            l.has(f) || l.set(f, In(d, f));
          }
        const a = s.querySelectorAll("marker"), c = /* @__PURE__ */ new Set();
        a.forEach((u) => {
          l.has(u.id) ? c.add(u.id) : u.remove();
        });
        for (const [u, h] of l)
          if (!c.has(u)) {
            const f = new DOMParser().parseFromString(
              `<svg xmlns="http://www.w3.org/2000/svg">${h}</svg>`,
              "image/svg+xml"
            ).querySelector("marker");
            f && s.appendChild(document.importNode(f, !0));
          }
      },
      destroy() {
        if (this._wireCleanup?.(), this._wireCleanup = null, this._longPressCleanup?.(), this._longPressCleanup = null, this._touchSelectionCleanup?.(), this._touchSelectionCleanup = null, this._emit("destroy"), j("destroy", `flowCanvas "${this._id}" destroying`), this._onCanvasClick && this._container && this._container.removeEventListener("click", this._onCanvasClick), this._onCanvasContextMenu && this._container && this._container.removeEventListener("contextmenu", this._onCanvasContextMenu), this._container)
          for (const s of this._contextMenuListeners)
            this._container.removeEventListener(s.event, s.handler);
        this._contextMenuListeners = [], this._onKeyDown && document.removeEventListener("keydown", this._onKeyDown), this._onContainerPointerDown && this._container && this._container.removeEventListener("pointerdown", this._onContainerPointerDown), this._markerDefsEl?.remove(), this._markerDefsEl = null, this._minimap?.destroy(), this._minimap = null, this._controls?.destroy(), this._controls = null, this._onSelectionPointerDown && this._container && this._container.removeEventListener("pointerdown", this._onSelectionPointerDown), this._onSelectionPointerMove && this._container && this._container.removeEventListener("pointermove", this._onSelectionPointerMove), this._onSelectionPointerUp && this._container && this._container.removeEventListener("pointerup", this._onSelectionPointerUp), this._selectionBox?.destroy(), this._selectionBox = null, this._lasso?.destroy(), this._lasso = null, this._viewportEl = null, this._container && (this._container.removeEventListener("dragover", this._onDropZoneDragOver), this._container.removeEventListener("drop", this._onDropZoneDrop)), this._followHandle?.stop(), this._followHandle = null;
        for (const s of this._activeTimelines)
          s.stop();
        this._activeTimelines.clear(), this._animator && (e.raw(this._animator).stopAll(), this._animator = null), this._layoutAnimFrame && (cancelAnimationFrame(this._layoutAnimFrame), this._layoutAnimFrame = 0), this._particleEngineHandle?.stop(), this._particleEngineHandle = null;
        for (const s of this._activeParticles)
          clearTimeout(s.safetyTimer), s.circle.remove();
        if (this._activeParticles.clear(), this._autoLayoutTimer && (clearTimeout(this._autoLayoutTimer), this._autoLayoutTimer = null), this._colorModeHandle && (this._colorModeHandle.destroy(), this._colorModeHandle = null), this._container) {
          const s = ke.get(this._container);
          s && (s.bridge.destroy(), s.awareness.destroy(), s.cursorCleanup && s.cursorCleanup(), ke.delete(this._container));
        }
        t.collab && t.collab.provider.destroy(), this._container && this._container.removeAttribute("data-flow-canvas"), this.$store.flow.unregister(this._id), this._panZoom?.destroy(), this._panZoom = null, this._announcer?.destroy(), this._announcer = null, this._computeDebounceTimer && (clearTimeout(this._computeDebounceTimer), this._computeDebounceTimer = null);
      },
      // ── Remaining Flat Methods ────────────────────────────────────────
      /**
       * Set a node's rotation angle in degrees.
       */
      rotateNode(s, l) {
        const a = this.nodes.find((c) => c.id === s);
        a && (this._captureHistory(), a.rotation = l);
      },
      /** Set the user-controlled loading state. */
      setLoading(s) {
        this._userLoading = s;
      },
      /** Update runtime config options. */
      patchConfig(s) {
        this._applyConfigPatch(s);
      },
      // ── Context Menu ──────────────────────────────────────────────────
      closeContextMenu() {
        this.contextMenu.show = !1, this.contextMenu.type = null, this.contextMenu.node = null, this.contextMenu.edge = null, this.contextMenu.position = null, this.contextMenu.nodes = null, this.contextMenu.event = null;
      },
      get collab() {
        return this._container ? ke.get(this._container)?.awareness : void 0;
      },
      async toImage(s) {
        let l;
        try {
          ({ captureFlowImage: l } = await Promise.resolve().then(() => Qh));
        } catch {
          throw new Error("toImage() requires html-to-image. Install it with: npm install html-to-image");
        }
        return l(
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
      get(s, l) {
        return o[l];
      },
      set(s, l, a) {
        return o[l] = a, !0;
      }
    }), r = [
      bu(i),
      xu(i),
      Eu(i),
      Mu(i),
      Pu(i),
      Vu(i),
      qu(i),
      Bu(i),
      Wu(i),
      tf(i),
      nf(i),
      of(i),
      Pf(i, e),
      kf(i)
    ];
    for (const s of r)
      Object.defineProperties(n, Object.getOwnPropertyDescriptors(s));
    return n.registerMarker = (s, l) => {
      _d(s, l);
    }, n;
  });
}
function Fi(e, t) {
  return {
    x: t[0] * Math.round(e.x / t[0]),
    y: t[1] * Math.round(e.y / t[1])
  };
}
function $f(e, t, n) {
  const { onDragStart: o, onDrag: i, onDragEnd: r, getViewport: s, getNodePosition: l, snapToGrid: a = !1, filterSelector: c, container: u, isLocked: h, noDragClassName: d, dragThreshold: f = 0 } = n;
  let g = { x: 0, y: 0 };
  function m(M) {
    const L = s();
    return {
      x: (M.x - L.x) / L.zoom,
      y: (M.y - L.y) / L.zoom
    };
  }
  const w = Ae(e), y = Qa().subject(() => {
    const M = s(), L = l();
    return {
      x: L.x * M.zoom + M.x,
      y: L.y * M.zoom + M.y
    };
  }).on("start", (M) => {
    g = m(M), o?.({ nodeId: t, position: g, sourceEvent: M.sourceEvent });
  }).on("drag", (M) => {
    let L = m(M);
    a && (L = Fi(L, a));
    const b = {
      x: L.x - g.x,
      y: L.y - g.y
    };
    i?.({ nodeId: t, position: L, delta: b, sourceEvent: M.sourceEvent });
  }).on("end", (M) => {
    let L = m(M);
    a && (L = Fi(L, a)), r?.({ nodeId: t, position: L, sourceEvent: M.sourceEvent });
  });
  return u && y.container(() => u), f > 0 && y.clickDistance(f), y.filter((M) => {
    if (h?.() || d && M.target?.closest?.("." + d)) return !1;
    if (c) {
      const L = e.querySelector(c);
      return L ? L.contains(M.target) : !0;
    }
    return !0;
  }), w.call(y), {
    destroy() {
      w.on(".drag", null);
    }
  };
}
function Af(e, t) {
  const n = $t(e, t);
  return {
    id: e.id,
    x: n.x,
    y: n.y,
    width: e.dimensions?.width ?? ye,
    height: e.dimensions?.height ?? we
  };
}
function Df(e, t, n) {
  const o = /* @__PURE__ */ new Set(), i = /* @__PURE__ */ new Set();
  let r = 0, s = 0, l = 1 / 0, a = 1 / 0;
  const c = e.x + e.width / 2, u = e.y + e.height / 2, h = e.x + e.width, d = e.y + e.height;
  for (const f of t) {
    const g = f.x + f.width / 2, m = f.y + f.height / 2, w = f.x + f.width, y = f.y + f.height, M = [
      [e.x, f.x],
      // left-left
      [h, w],
      // right-right
      [c, g],
      // center-center
      [e.x, w],
      // left-right
      [h, f.x]
      // right-left
    ];
    for (const [b, D] of M) {
      const k = D - b;
      Math.abs(k) <= n && (i.add(D), Math.abs(k) < Math.abs(l) && (l = k, r = k));
    }
    const L = [
      [e.y, f.y],
      // top-top
      [d, y],
      // bottom-bottom
      [u, m],
      // center-center
      [e.y, y],
      // top-bottom
      [d, f.y]
      // bottom-top
    ];
    for (const [b, D] of L) {
      const k = D - b;
      Math.abs(k) <= n && (o.add(D), Math.abs(k) < Math.abs(a) && (a = k, s = k));
    }
  }
  return {
    horizontal: [...o],
    vertical: [...i],
    snapOffset: { x: r, y: s }
  };
}
function Hf(e, t, n, o) {
  return Math.abs(e.x - t.x) > 30 ? e.x < t.x ? { source: n, target: o } : { source: o, target: n } : e.y < t.y ? { source: n, target: o } : { source: o, target: n };
}
function Rf(e, t, n, o) {
  let i = null, r = o;
  for (const s of n) {
    if (s.id === e) continue;
    const l = Math.sqrt(
      (t.x - s.center.x) ** 2 + (t.y - s.center.y) ** 2
    );
    if (l < r) {
      r = l;
      const { source: a, target: c } = Hf(t, s.center, e, s.id);
      i = { source: a, target: c, targetId: s.id, distance: l, targetCenter: s.center };
    }
  }
  return i;
}
const zf = /* @__PURE__ */ new Set(["x-data", "x-init", "x-bind", "href", "src", "action", "formaction", "srcdoc"]);
let Ff = 0, Of = 0;
function Vf(e, t) {
  switch (t) {
    case "alt":
      return e.altKey;
    case "meta":
      return e.metaKey;
    case "shift":
      return e.shiftKey;
  }
}
function Xf(e, t, n) {
  const o = e.querySelectorAll('[data-flow-handle-type="source"]');
  if (o.length === 0) return null;
  let i = null, r = 1 / 0;
  return o.forEach((s) => {
    const l = s, a = l.getBoundingClientRect();
    if (a.width === 0 && a.height === 0) return;
    const c = a.left + a.width / 2, u = a.top + a.height / 2, h = Math.sqrt((t - c) ** 2 + (n - u) ** 2);
    h < r && (r = h, i = l);
  }), i;
}
function Yf(e, t, n) {
  let o = 1 / 0, i = -1 / 0, r = 1 / 0, s = -1 / 0;
  for (const c of n)
    o = Math.min(o, c.x), i = Math.max(i, c.x + c.width), r = Math.min(r, c.y), s = Math.max(s, c.y + c.height);
  const l = 50, a = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  a.style.cssText = "position:absolute;top:0;left:0;width:1px;height:1px;overflow:visible;pointer-events:none;z-index:500;";
  for (const c of e) {
    const u = document.createElementNS("http://www.w3.org/2000/svg", "line");
    u.setAttribute("x1", String(o - l)), u.setAttribute("y1", String(c)), u.setAttribute("x2", String(i + l)), u.setAttribute("y2", String(c)), u.classList.add("flow-guide-path"), a.appendChild(u);
  }
  for (const c of t) {
    const u = document.createElementNS("http://www.w3.org/2000/svg", "line");
    u.setAttribute("x1", String(c)), u.setAttribute("y1", String(r - l)), u.setAttribute("x2", String(c)), u.setAttribute("y2", String(s + l)), u.classList.add("flow-guide-path"), a.appendChild(u);
  }
  return a;
}
function qf(e) {
  e.directive(
    "flow-node",
    (t, { expression: n }, { evaluate: o, effect: i, cleanup: r }) => {
      let s = null, l = !1, a = !1, c = null, u = null, h = null, d = null, f = null, g = null, m = !1, w = -1, y = null, M = !1, L = [], b = "", D = [], k = null;
      i(() => {
        const v = o(n);
        if (!v) return;
        if (t.dataset.flowNodeId = v.id, !M) {
          const R = e.$data(t.closest("[x-data]"));
          let Q = !1;
          if (R?._config?.nodeTypes) {
            const Y = v.type ?? "default", B = R._config.nodeTypes[Y] ?? R._config.nodeTypes.default;
            if (typeof B == "string") {
              const I = document.querySelector(B);
              I?.content && (t.appendChild(I.content.cloneNode(!0)), Q = !0);
            } else typeof B == "function" && (B(v, t), Q = !0);
          }
          if (!Q && t.children.length === 0) {
            const Y = document.createElement("div");
            Y.setAttribute("x-flow-handle:target", "");
            const B = document.createElement("span");
            B.setAttribute("x-text", "node.data.label");
            const I = document.createElement("div");
            I.setAttribute("x-flow-handle:source", ""), t.appendChild(Y), t.appendChild(B), t.appendChild(I), Q = !0;
          }
          if (Q)
            for (const Y of Array.from(t.children))
              e.addScopeToNode(Y, { node: v }), e.initTree(Y);
          M = !0;
        }
        if (v.hidden) {
          t.classList.add("flow-node-hidden"), t.removeAttribute("tabindex"), t.removeAttribute("role"), t.removeAttribute("aria-label"), s?.destroy(), s = null;
          return;
        }
        t.classList.remove("flow-node-hidden"), k !== v.id && (s?.destroy(), s = null, k = v.id);
        const p = e.$data(t.closest("[x-data]"));
        if (!p?.viewport) return;
        t.classList.add("flow-node", "nopan"), v.type === "group" ? t.classList.add("flow-node-group") : t.classList.remove("flow-node-group");
        const H = v.parentId ? p.getAbsolutePosition(v.id) : v.position ?? { x: 0, y: 0 }, E = v.nodeOrigin ?? p._config?.nodeOrigin ?? [0, 0], N = v.dimensions?.width ?? 150, P = v.dimensions?.height ?? 40;
        t.style.left = H.x - N * E[0] + "px", t.style.top = H.y - P * E[1] + "px", v.dimensions && (t.style.width = v.dimensions.width + "px", t.style.height = v.dimensions.height + "px"), p.selectedNodes.has(v.id) ? t.classList.add("flow-node-selected") : t.classList.remove("flow-node-selected"), t.setAttribute("aria-selected", String(!!v.selected)), v._validationErrors && v._validationErrors.length > 0 ? t.classList.add("flow-node-invalid") : t.classList.remove("flow-node-invalid");
        for (const R of L)
          t.classList.remove(R);
        const z = v.class ? v.class.split(/\s+/).filter(Boolean) : [];
        for (const R of z)
          t.classList.add(R);
        L = z;
        const x = v.shape ? `flow-node-${v.shape}` : "";
        b !== x && (b && t.classList.remove(b), x && t.classList.add(x), b = x);
        const C = e.$data(t.closest("[data-flow-canvas]")), T = v.shape && C?._shapeRegistry?.[v.shape];
        if (T?.clipPath ? t.style.clipPath = T.clipPath : t.style.clipPath = "", v.style) {
          const R = typeof v.style == "string" ? Object.fromEntries(v.style.split(";").filter(Boolean).map((Y) => Y.split(":").map((B) => B.trim()))) : v.style, Q = [];
          for (const [Y, B] of Object.entries(R))
            Y && B && (t.style.setProperty(Y, B), Q.push(Y));
          for (const Y of D)
            Q.includes(Y) || t.style.removeProperty(Y);
          D = Q;
        } else if (D.length > 0) {
          for (const R of D)
            t.style.removeProperty(R);
          D = [];
        }
        if (v.rotation ? (t.style.transform = `rotate(${v.rotation}deg)`, t.style.transformOrigin = "center") : t.style.transform = "", v.focusable ?? p._config?.nodesFocusable !== !1 ? (t.setAttribute("tabindex", "0"), t.setAttribute("role", v.ariaRole ?? "group"), t.setAttribute("aria-label", v.ariaLabel ?? (v.data?.label ? `Node: ${v.data.label}` : `Node ${v.id}`))) : (t.removeAttribute("tabindex"), t.removeAttribute("role"), t.removeAttribute("aria-label")), v.domAttributes)
          for (const [R, Q] of Object.entries(v.domAttributes))
            R.startsWith("on") || zf.has(R.toLowerCase()) || t.setAttribute(R, Q);
        et(v) ? t.classList.remove("flow-node-no-connect") : t.classList.add("flow-node-no-connect"), v.collapsed ? t.classList.add("flow-node-collapsed") : t.classList.remove("flow-node-collapsed");
        const J = t.classList.contains("flow-node-condensed");
        v.condensed ? t.classList.add("flow-node-condensed") : t.classList.remove("flow-node-condensed"), !!v.condensed !== J && requestAnimationFrame(() => {
          v.dimensions = {
            width: t.offsetWidth,
            height: t.offsetHeight
          }, j("condense", `Node "${v.id}" re-measured after condense toggle`, v.dimensions);
        }), v.filtered ? t.classList.add("flow-node-filtered") : t.classList.remove("flow-node-filtered");
        const oe = v.handles ?? "visible";
        t.classList.remove("flow-handles-hidden", "flow-handles-hover", "flow-handles-select"), oe !== "visible" && t.classList.add(`flow-handles-${oe}`);
        let G = Hs(v, p._nodeMap);
        p._config?.elevateNodesOnSelect !== !1 && p.selectedNodes.has(v.id) && (G += v.type === "group" ? Math.max(1 - G, 0) : 1e3), m && (G += 1e3);
        const le = v.type === "group" ? 0 : 2;
        if (G !== le ? t.style.zIndex = String(G) : t.style.removeProperty("z-index"), !Is(v)) {
          t.classList.add("flow-node-locked"), s?.destroy(), s = null;
          return;
        }
        t.classList.remove("flow-node-locked"), t.querySelector("[data-flow-drag-handle]") ? t.classList.add("flow-node-has-handle") : t.classList.remove("flow-node-has-handle");
        const te = t.closest(".flow-container");
        s || (s = $f(t, v.id, {
          container: te ?? void 0,
          filterSelector: "[data-flow-drag-handle]",
          isLocked: () => p._animationLocked,
          noDragClassName: p._config?.noDragClassName ?? "nodrag",
          dragThreshold: p._config?.nodeDragThreshold ?? 0,
          getViewport: () => p.viewport,
          getNodePosition: () => {
            const R = p.getNode(v.id);
            return R ? R.parentId ? p.getAbsolutePosition(R.id) : { x: R.position.x, y: R.position.y } : { x: 0, y: 0 };
          },
          snapToGrid: p._config?.snapToGrid ?? !1,
          onDragStart({ nodeId: R, position: Q, sourceEvent: Y }) {
            l = !1, a = !1, c = null;
            const B = p._container ? ke.get(p._container) : void 0;
            B?.bridge && B.bridge.setDragging(R, !0), d?.destroy(), d = null, f = null, g && te && te.querySelector(`[data-flow-node-id="${CSS.escape(g)}"]`)?.classList.remove("flow-node-drop-target"), g = null, p._captureHistory?.(), j("drag", `Node "${R}" drag start`, Q);
            const I = p.getNode(R);
            if (I && (p._config?.selectNodesOnDrag !== !1 && I.selectable !== !1 && !p.selectedNodes.has(R) && (ot(Y, p._shortcuts?.multiSelect) || p.deselectAll(), p.selectedNodes.add(R), I.selected = !0, p._emitSelectionChange(), a = !0), p._emit("node-drag-start", { node: I }), p.selectedNodes.has(R) && p.selectedNodes.size > 1)) {
              const W = it(R, p.nodes);
              c = /* @__PURE__ */ new Map();
              for (const ee of p.selectedNodes) {
                if (ee === R || W.has(ee))
                  continue;
                const X = p.getNode(ee);
                X && X.draggable !== !1 && c.set(ee, { x: X.position.x, y: X.position.y });
              }
            }
            p._config?.autoPanOnNodeDrag !== !1 && te && (u = As({
              container: te,
              speed: p._config?.autoPanSpeed ?? 15,
              onPan(W, ee) {
                const X = p.viewport?.zoom || 1, K = { x: p.viewport.x, y: p.viewport.y };
                p._panZoom?.setViewport({
                  x: p.viewport.x - W,
                  y: p.viewport.y - ee,
                  zoom: X
                });
                const ie = K.x - p.viewport.x, O = K.y - p.viewport.y, Z = ie === 0 && O === 0, q = p.getNode(R);
                let ne = !1;
                if (q) {
                  const F = q.position.x, V = q.position.y;
                  q.position.x += ie / X, q.position.y += O / X;
                  const ae = gn(q.position, q, p._config?.nodeExtent);
                  q.position.x = ae.x, q.position.y = ae.y, ne = q.position.x === F && q.position.y === V;
                }
                if (c)
                  for (const [F] of c) {
                    const V = p.getNode(F);
                    if (V) {
                      V.position.x += ie / X, V.position.y += O / X;
                      const ae = gn(V.position, V, p._config?.nodeExtent);
                      V.position.x = ae.x, V.position.y = ae.y;
                    }
                  }
                return Z && ne;
              }
            }), Y instanceof MouseEvent && u.updatePointer(Y.clientX, Y.clientY), u.start());
          },
          onDrag({ nodeId: R, position: Q, delta: Y, sourceEvent: B }) {
            l = !0;
            const I = p.getNode(R);
            if (I) {
              if (I.parentId) {
                const X = p.getAbsolutePosition(I.parentId);
                let K = Q.x - X.x, ie = Q.y - X.y;
                const O = I.dimensions ?? { width: 150, height: 50 }, Z = p.getNode(I.parentId);
                if (Z?.childLayout) {
                  m || (t.classList.add("flow-reorder-dragging"), y = I.parentId), m = !0;
                  const q = I.extent !== "parent";
                  if (I.position.x = Q.x - X.x, I.position.y = Q.y - X.y, !q && Z.dimensions) {
                    const V = eo({ x: I.position.x, y: I.position.y }, O, Z.dimensions);
                    I.position.x = V.x, I.position.y = V.y;
                  }
                  const ne = I.dimensions?.width ?? 150, F = I.dimensions?.height ?? 50;
                  if (q) {
                    const V = Z.dimensions?.width ?? 150, ae = Z.dimensions?.height ?? 50, re = I.position.x + ne / 2, fe = I.position.y + F / 2, pe = 12, he = y === I.parentId ? 0 : pe, xe = re >= he && re <= V - he && fe >= he && fe <= ae - he, be = /* @__PURE__ */ new Set();
                    let de = I.parentId;
                    for (; de; )
                      be.add(de), de = p.getNode(de)?.parentId;
                    const me = Q.x + ne / 2, Me = Q.y + F / 2, _e = it(I.id, p.nodes);
                    let Te = null;
                    const Ee = p.nodes.filter(
                      (ue) => ue.id !== I.id && (ue.droppable || ue.childLayout) && !ue.hidden && !_e.has(ue.id) && (xe ? !be.has(ue.id) : ue.id !== I.parentId) && (!ue.acceptsDrop || ue.acceptsDrop(I))
                    );
                    for (const ue of Ee) {
                      const ve = ue.parentId ? p.getAbsolutePosition(ue.id) : ue.position, Ze = ue.dimensions?.width ?? 150, at = ue.dimensions?.height ?? 50, Ke = ue.id === g ? 0 : pe;
                      me >= ve.x + Ke && me <= ve.x + Ze - Ke && Me >= ve.y + Ke && Me <= ve.y + at - Ke && (Te = ue);
                    }
                    const ge = Te?.id ?? null;
                    if (ge !== g) {
                      g && te && te.querySelector(`[data-flow-node-id="${CSS.escape(g)}"]`)?.classList.remove("flow-node-drop-target"), ge && te && te.querySelector(`[data-flow-node-id="${CSS.escape(ge)}"]`)?.classList.add("flow-node-drop-target"), g = ge;
                      const ue = ge ? p.getNode(ge) : null, ve = y;
                      if (ue?.childLayout && ge !== y) {
                        ve && (p.layoutChildren(ve, { omitFromComputation: R, shallow: !0 }), p.propagateLayoutUp(ve, { omitFromComputation: R })), y = ge;
                        const Ze = p.nodes.filter((Xe) => Xe.parentId === ge && Xe.id !== R).sort((Xe, dr) => (Xe.order ?? 1 / 0) - (dr.order ?? 1 / 0)), at = Ze.length, Ke = [...Ze];
                        Ke.splice(at, 0, I);
                        for (let Xe = 0; Xe < Ke.length; Xe++)
                          Ke[Xe].order = Xe;
                        w = at;
                        const Uo = p._initialDimensions?.get(R), jo = { ...I, dimensions: Uo ? { ...Uo } : void 0 };
                        p.layoutChildren(ge, { excludeId: R, includeNode: jo, shallow: !0 }), p.propagateLayoutUp(ge, { includeNode: jo });
                      } else xe && y !== I.parentId ? (ve && ve !== I.parentId && (p.layoutChildren(ve, { omitFromComputation: R, shallow: !0 }), p.propagateLayoutUp(ve, { omitFromComputation: R })), y = I.parentId, w = -1) : !ge && !xe && (ve && (p.layoutChildren(ve, { omitFromComputation: R, shallow: !0 }), p.propagateLayoutUp(ve, { omitFromComputation: R })), y = null, w = -1);
                    }
                  }
                  if (y) {
                    const V = p.getNode(y), ae = V?.childLayout ?? Z.childLayout, re = p.nodes.filter((de) => de.parentId === y && de.id !== R).sort((de, me) => (de.order ?? 1 / 0) - (me.order ?? 1 / 0));
                    let fe, pe;
                    if (y !== I.parentId) {
                      const de = V?.parentId ? p.getAbsolutePosition(y) : V?.position ?? { x: 0, y: 0 };
                      fe = Q.x - de.x, pe = Q.y - de.y;
                    } else
                      fe = I.position.x, pe = I.position.y;
                    const he = ae.swapThreshold ?? 0.5;
                    if (w === -1)
                      if (y === I.parentId) {
                        const de = I.order ?? 0;
                        w = re.filter((me) => (me.order ?? 0) < de).length;
                      } else
                        w = re.length;
                    const xe = w;
                    let be = re.length;
                    for (let de = 0; de < re.length; de++) {
                      const me = re[de], Me = me.dimensions?.width ?? 150, _e = me.dimensions?.height ?? 50, Te = de < xe ? 1 - he : he, Ee = me.position.y + _e * Te, ge = me.position.x + Me * Te;
                      if (ae.direction === "grid") {
                        const ue = {
                          x: fe + ne / 2,
                          y: pe + F / 2
                        }, ve = me.position.y + _e / 2;
                        if (ue.y < me.position.y) {
                          be = de;
                          break;
                        }
                        if (Math.abs(ue.y - ve) < _e / 2 && ue.x < ge) {
                          be = de;
                          break;
                        }
                      } else if (ae.direction === "vertical") {
                        if ((de < xe ? pe : pe + F) < Ee) {
                          be = de;
                          break;
                        }
                      } else if ((de < xe ? fe : fe + ne) < ge) {
                        be = de;
                        break;
                      }
                    }
                    if (be !== w) {
                      w = be;
                      const de = [...re];
                      de.splice(be, 0, I);
                      for (let Ee = 0; Ee < de.length; Ee++)
                        de[Ee].order = Ee;
                      t.closest(".flow-container")?.classList.add("flow-layout-animating"), p._layoutAnimFrame && cancelAnimationFrame(p._layoutAnimFrame);
                      const Me = I.id, _e = y, Te = _e !== I.parentId;
                      p._layoutAnimFrame = requestAnimationFrame(() => {
                        if (Te && _e) {
                          const ve = p.getNode(Me);
                          let Ze;
                          if (ve) {
                            const at = p._initialDimensions?.get(Me);
                            Ze = { ...ve, dimensions: at ? { ...at } : void 0 };
                          }
                          p.layoutChildren(_e, {
                            excludeId: Me,
                            includeNode: Ze,
                            shallow: !0
                          }), p.propagateLayoutUp(_e, {
                            includeNode: Ze
                          });
                        } else
                          p.layoutChildren(_e, Me, !0);
                        const Ee = performance.now(), ge = 300, ue = () => {
                          p._layoutAnimTick++, performance.now() - Ee < ge ? p._layoutAnimFrame = requestAnimationFrame(ue) : p._layoutAnimFrame = 0;
                        };
                        p._layoutAnimFrame = requestAnimationFrame(ue);
                      });
                    }
                  }
                  u && B instanceof MouseEvent && u.updatePointer(B.clientX, B.clientY);
                  return;
                }
                if (I.extent === "parent" && Z?.dimensions) {
                  const q = eo(
                    { x: K, y: ie },
                    O,
                    Z.dimensions
                  );
                  K = q.x, ie = q.y;
                } else if (Array.isArray(I.extent)) {
                  const q = Rs({ x: K, y: ie }, I.extent, O);
                  K = q.x, ie = q.y;
                }
                if ((!I.extent || I.extent !== "parent") && (Yt(
                  Z,
                  p._config?.childValidationRules ?? {}
                )?.preventChildEscape || !!Z?.childLayout) && Z?.dimensions) {
                  const F = eo(
                    { x: K, y: ie },
                    O,
                    Z.dimensions
                  );
                  K = F.x, ie = F.y;
                }
                if (I.expandParent && Z?.dimensions) {
                  const q = Gd(
                    { x: K, y: ie },
                    O,
                    Z.dimensions
                  );
                  q && (Z.dimensions.width = q.width, Z.dimensions.height = q.height);
                }
                I.position.x = K, I.position.y = ie;
              } else {
                const X = gn(Q, I, p._config?.nodeExtent);
                I.position.x = X.x, I.position.y = X.y;
              }
              if (p._config?.snapToGrid) {
                const X = I.nodeOrigin ?? p._config?.nodeOrigin ?? [0, 0], K = I.dimensions?.width ?? 150, ie = I.dimensions?.height ?? 40, O = I.parentId ? p.getAbsolutePosition(I.id) : I.position;
                t.style.left = O.x - K * X[0] + "px", t.style.top = O.y - ie * X[1] + "px", p._layoutAnimTick++;
              }
              if (p._emit("node-drag", { node: I, position: Q }), c)
                for (const [X, K] of c) {
                  const ie = p.getNode(X);
                  if (ie) {
                    let O = K.x + Y.x, Z = K.y + Y.y;
                    const q = gn({ x: O, y: Z }, ie, p._config?.nodeExtent);
                    ie.position.x = q.x, ie.position.y = q.y;
                  }
                }
              const ee = p._config?.helperLines;
              if (ee) {
                const X = typeof ee == "object" ? ee.snap ?? !0 : !0, K = typeof ee == "object" ? ee.threshold ?? 5 : 5, ie = (V) => {
                  const ae = V.parentId ? p.getAbsolutePosition(V.id) : V.position;
                  return Af({ ...V, position: ae }, p._config?.nodeOrigin);
                }, Z = (p.selectedNodes.size > 1 && p.selectedNodes.has(R) ? p.nodes.filter((V) => p.selectedNodes.has(V.id)) : [I]).map(ie), q = {
                  x: Math.min(...Z.map((V) => V.x)),
                  y: Math.min(...Z.map((V) => V.y)),
                  width: Math.max(...Z.map((V) => V.x + V.width)) - Math.min(...Z.map((V) => V.x)),
                  height: Math.max(...Z.map((V) => V.y + V.height)) - Math.min(...Z.map((V) => V.y))
                }, ne = p.nodes.filter(
                  (V) => !p.selectedNodes.has(V.id) && V.id !== R && V.hidden !== !0 && V.filtered !== !0
                ).map(ie), F = Df(q, ne, K);
                if (X && (F.snapOffset.x !== 0 || F.snapOffset.y !== 0) && (I.position.x += F.snapOffset.x, I.position.y += F.snapOffset.y, c))
                  for (const [V] of c) {
                    const ae = p.getNode(V);
                    ae && (ae.position.x += F.snapOffset.x, ae.position.y += F.snapOffset.y);
                  }
                if (h?.remove(), F.horizontal.length > 0 || F.vertical.length > 0) {
                  const V = te?.querySelector(".flow-viewport");
                  if (V) {
                    const ae = p.nodes.map(ie);
                    h = Yf(F.horizontal, F.vertical, ae), V.appendChild(h);
                  }
                } else
                  h = null;
                p._emit("helper-lines-change", {
                  horizontal: F.horizontal,
                  vertical: F.vertical
                });
              }
            }
            if (p._config?.preventOverlap) {
              const ee = typeof p._config.preventOverlap == "number" ? p._config.preventOverlap : 5, X = I.dimensions?.width ?? ye, K = I.dimensions?.height ?? we, ie = p.selectedNodes, O = p.nodes.filter((q) => q.id !== I.id && !q.hidden && !ie.has(q.id)).map((q) => Tt(q, p._config?.nodeOrigin)), Z = _u(I.position, X, K, O, ee);
              I.position.x = Z.x, I.position.y = Z.y;
            }
            if (!I.parentId) {
              const ee = it(I.id, p.nodes), X = p.nodes.filter(
                (q) => q.id !== I.id && q.droppable && !q.hidden && !ee.has(q.id) && (!q.acceptsDrop || q.acceptsDrop(I))
              ), K = Tt(I, p._config?.nodeOrigin);
              let ie = null;
              const O = 12;
              for (const q of X) {
                const ne = q.parentId ? p.getAbsolutePosition(q.id) : q.position, F = q.dimensions?.width ?? ye, V = q.dimensions?.height ?? we, ae = K.x + K.width / 2, re = K.y + K.height / 2, fe = q.id === g ? 0 : O;
                ae >= ne.x + fe && ae <= ne.x + F - fe && re >= ne.y + fe && re <= ne.y + V - fe && (ie = q);
              }
              const Z = ie?.id ?? null;
              Z !== g && (g && te && te.querySelector(`[data-flow-node-id="${CSS.escape(g)}"]`)?.classList.remove("flow-node-drop-target"), Z && te && te.querySelector(`[data-flow-node-id="${CSS.escape(Z)}"]`)?.classList.add("flow-node-drop-target"), g = Z);
            }
            if (p._config?.proximityConnect) {
              const ee = p._config.proximityConnectDistance ?? 150, X = I.dimensions ?? { width: 150, height: 50 }, K = {
                x: I.position.x + X.width / 2,
                y: I.position.y + X.height / 2
              }, ie = p.nodes.filter((Z) => Z.id !== I.id && !Z.hidden).map((Z) => ({
                id: Z.id,
                center: {
                  x: Z.position.x + (Z.dimensions?.width ?? 150) / 2,
                  y: Z.position.y + (Z.dimensions?.height ?? 50) / 2
                }
              })), O = Rf(I.id, K, ie, ee);
              if (O)
                if (p.edges.some(
                  (q) => q.source === O.source && q.target === O.target || q.source === O.target && q.target === O.source
                ))
                  d?.destroy(), d = null, f = null;
                else {
                  if (f = O, !d) {
                    d = Ct({
                      connectionLineType: p._config?.connectionLineType,
                      connectionLineStyle: p._config?.connectionLineStyle,
                      connectionLine: p._config?.connectionLine
                    });
                    const q = te?.querySelector(".flow-viewport");
                    q && q.appendChild(d.svg);
                  }
                  d.update({
                    fromX: K.x,
                    fromY: K.y,
                    toX: O.targetCenter.x,
                    toY: O.targetCenter.y,
                    source: O.source
                  });
                }
              else
                d?.destroy(), d = null, f = null;
            }
            const W = p._container ? ke.get(p._container) : void 0;
            if (W?.bridge) {
              if (W.bridge.pushLocalNodeUpdate(R, { position: I.position }), c)
                for (const [ee] of c) {
                  const X = p.getNode(ee);
                  X && W.bridge.pushLocalNodeUpdate(ee, { position: X.position });
                }
              if (W.awareness && B instanceof MouseEvent && p._container) {
                const ee = p._container.getBoundingClientRect(), X = (B.clientX - ee.left - p.viewport.x) / p.viewport.zoom, K = (B.clientY - ee.top - p.viewport.y) / p.viewport.zoom;
                W.awareness.updateCursor({ x: X, y: K });
              }
            }
            u && B instanceof MouseEvent && u.updatePointer(B.clientX, B.clientY);
          },
          onDragEnd({ nodeId: R, position: Q }) {
            j("drag", `Node "${R}" drag end`, Q);
            const Y = p._container ? ke.get(p._container) : void 0;
            Y?.bridge && Y.bridge.setDragging(R, !1), u?.stop(), u = null, h?.remove(), h = null, p._config?.helperLines && p._emit("helper-lines-change", { horizontal: [], vertical: [] });
            const B = p.getNode(R);
            if (B && p._emit("node-drag-end", { node: B, position: Q }), m && B?.parentId) {
              t.classList.remove("flow-reorder-dragging");
              const I = y;
              m = !1, w = -1, y = null, p._layoutAnimFrame && (cancelAnimationFrame(p._layoutAnimFrame), p._layoutAnimFrame = 0), t.closest(".flow-container")?.classList.remove("flow-layout-animating"), g ? (te && te.querySelector(`[data-flow-node-id="${CSS.escape(g)}"]`)?.classList.remove("flow-node-drop-target"), p.reparentNode(R, g), g = null) : I && I !== B.parentId ? (p.layoutChildren(I, { omitFromComputation: R, shallow: !0 }), p.propagateLayoutUp(I, { omitFromComputation: R }), p.layoutChildren(B.parentId), p._emit("child-reorder", {
                nodeId: R,
                parentId: B.parentId,
                order: B.order
              })) : (p.layoutChildren(B.parentId), p._emit("child-reorder", {
                nodeId: R,
                parentId: B.parentId,
                order: B.order
              })), c = null, l = !1;
              return;
            }
            if (B && g)
              te && te.querySelector(`[data-flow-node-id="${CSS.escape(g)}"]`)?.classList.remove("flow-node-drop-target"), p.reparentNode(R, g), g = null;
            else if (B && B.parentId && !g) {
              const I = Yt(
                p.getNode(B.parentId),
                p._config?.childValidationRules ?? {}
              ), W = p.getNode(B.parentId);
              if (!I?.preventChildEscape && !W?.childLayout && W?.dimensions) {
                const ee = B.position.x, X = B.position.y, K = B.dimensions?.width ?? 150, ie = B.dimensions?.height ?? 50;
                (ee + K < 0 || X + ie < 0 || ee > W.dimensions.width || X > W.dimensions.height) && p.reparentNode(R, null);
              }
              g = null;
            } else
              g && te && te.querySelector(`[data-flow-node-id="${CSS.escape(g)}"]`)?.classList.remove("flow-node-drop-target"), g = null;
            if (p._config?.proximityConnect && f) {
              const I = f;
              d?.destroy(), d = null, f = null;
              let W = !0;
              if (p._config.onProximityConnect && p._config.onProximityConnect({
                source: I.source,
                target: I.target,
                distance: I.distance
              }) === !1 && (W = !1), W) {
                const ee = {
                  source: I.source,
                  sourceHandle: "source",
                  target: I.target,
                  targetHandle: "target"
                };
                if (Be(ee, p.edges, { preventCycles: p._config?.preventCycles })) {
                  const X = te ? Fe(te, ee, p.edges) : !0, K = te ? ze(te, ee) : !0, ie = !p._config.isValidConnection || p._config.isValidConnection(ee);
                  if (X && K && ie) {
                    if (p._config.proximityConnectConfirm) {
                      const Z = te?.querySelector(`[data-flow-node-id="${CSS.escape(I.source)}"]`), q = te?.querySelector(`[data-flow-node-id="${CSS.escape(I.target)}"]`);
                      Z?.classList.add("flow-proximity-confirm"), q?.classList.add("flow-proximity-confirm"), setTimeout(() => {
                        Z?.classList.remove("flow-proximity-confirm"), q?.classList.remove("flow-proximity-confirm");
                      }, 400);
                    }
                    const O = `e-${I.source}-${I.target}-${Date.now()}-${Of++}`;
                    p.addEdges({ id: O, ...ee }), p._emit("connect", { connection: ee });
                  }
                }
              }
            } else
              d?.destroy(), d = null, f = null;
            c = null, l = !1;
          }
        }));
      });
      {
        const v = e.$data(t.closest("[x-data]"));
        if (v?._config?.easyConnect) {
          const p = v._config.easyConnectKey ?? "alt", H = (E) => {
            if (!Vf(E, p) || E.target.closest("[data-flow-handle-type]")) return;
            const N = e.$data(t.closest("[x-data]"));
            if (!N || N._animationLocked) return;
            const P = o(n);
            if (!P) return;
            const z = N.getNode(P.id);
            if (!z || z.connectable === !1) return;
            E.preventDefault(), E.stopPropagation(), E.stopImmediatePropagation();
            const x = Xf(t, E.clientX, E.clientY), C = x?.dataset.flowHandleId ?? "source";
            t.classList.add("flow-easy-connecting");
            const T = t.closest(".flow-container");
            if (!T) return;
            const U = N.viewport?.zoom || 1, J = N.viewport?.x || 0, oe = N.viewport?.y || 0, G = T.getBoundingClientRect();
            let se, le;
            if (x) {
              const W = x.getBoundingClientRect();
              se = (W.left + W.width / 2 - G.left - J) / U, le = (W.top + W.height / 2 - G.top - oe) / U;
            } else {
              const W = t.getBoundingClientRect();
              se = (W.left + W.width / 2 - G.left - J) / U, le = (W.top + W.height / 2 - G.top - oe) / U;
            }
            N._emit("connect-start", { source: P.id, sourceHandle: C });
            const ce = Ct({
              connectionLineType: N._config?.connectionLineType,
              connectionLineStyle: N._config?.connectionLineStyle,
              connectionLine: N._config?.connectionLine
            }), te = T.querySelector(".flow-viewport");
            te && te.appendChild(ce.svg), ce.update({ fromX: se, fromY: le, toX: se, toY: le, source: P.id, sourceHandle: C }), N.pendingConnection = { source: P.id, sourceHandle: C, position: { x: se, y: le } }, Xt(T, P.id, C, N);
            let R = An(T, N, E.clientX, E.clientY), Q = null;
            const Y = N._config?.connectionSnapRadius ?? 20, B = (W) => {
              const ee = N.screenToFlowPosition(W.clientX, W.clientY), X = Vt({
                containerEl: T,
                handleType: "target",
                excludeNodeId: P.id,
                cursorFlowPos: ee,
                connectionSnapRadius: Y,
                getNode: (K) => N.getNode(K),
                toFlowPosition: (K, ie) => N.screenToFlowPosition(K, ie)
              });
              X.element !== Q && (Q?.classList.remove("flow-handle-active"), X.element?.classList.add("flow-handle-active"), Q = X.element), ce.update({ fromX: se, fromY: le, toX: X.position.x, toY: X.position.y, source: P.id, sourceHandle: C }), N.pendingConnection = { ...N.pendingConnection, position: X.position }, R?.updatePointer(W.clientX, W.clientY);
            }, I = (W) => {
              R?.stop(), R = null, document.removeEventListener("pointermove", B), document.removeEventListener("pointerup", I), ce.destroy(), Q?.classList.remove("flow-handle-active"), Ce(T), t.classList.remove("flow-easy-connecting");
              const ee = N.screenToFlowPosition(W.clientX, W.clientY), X = { source: P.id, sourceHandle: C, position: ee };
              let K = Q;
              if (K || (K = document.elementFromPoint(W.clientX, W.clientY)?.closest('[data-flow-handle-type="target"]')), K) {
                const O = K.closest("[x-flow-node]")?.dataset.flowNodeId, Z = K.dataset.flowHandleId ?? "target";
                if (O) {
                  const q = { source: P.id, sourceHandle: C, target: O, targetHandle: Z };
                  if (Be(q, N.edges, { preventCycles: N._config.preventCycles }))
                    if (Fe(T, q, N.edges) && ze(T, q) && (!N._config?.isValidConnection || N._config.isValidConnection(q))) {
                      const ne = `e-${P.id}-${O}-${Date.now()}-${Ff++}`;
                      N.addEdges({ id: ne, ...q }), N._emit("connect", { connection: q }), N._emit("connect-end", { connection: q, ...X });
                    } else
                      N._emit("connect-end", { connection: null, ...X });
                  else
                    N._emit("connect-end", { connection: null, ...X });
                } else
                  N._emit("connect-end", { connection: null, ...X });
              } else
                N._emit("connect-end", { connection: null, ...X });
              N.pendingConnection = null;
            };
            document.addEventListener("pointermove", B), document.addEventListener("pointerup", I);
          };
          t.addEventListener("pointerdown", H, { capture: !0 }), r(() => {
            t.removeEventListener("pointerdown", H, { capture: !0 });
          });
        }
      }
      const A = (v) => {
        if (v.key !== "Enter" && v.key !== " ") return;
        v.preventDefault();
        const p = o(n);
        if (!p) return;
        const H = e.$data(t.closest("[x-data]"));
        H && (H._animationLocked || Co(p) && (H._emit("node-click", { node: p, event: v }), v.stopPropagation(), ot(v, H._shortcuts?.multiSelect) ? H.selectedNodes.has(p.id) ? (H.selectedNodes.delete(p.id), p.selected = !1) : (H.selectedNodes.add(p.id), p.selected = !0) : (H.deselectAll(), H.selectedNodes.add(p.id), p.selected = !0), H._emitSelectionChange()));
      };
      t.addEventListener("keydown", A);
      const _ = () => {
        const v = e.$data(t.closest("[x-data]"));
        if (!v?._config?.autoPanOnNodeFocus) return;
        const p = o(n);
        if (!p) return;
        const H = p.parentId ? v.getAbsolutePosition(p.id) : p.position;
        v.setCenter(
          H.x + (p.dimensions?.width ?? 150) / 2,
          H.y + (p.dimensions?.height ?? 40) / 2
        );
      };
      t.addEventListener("focus", _);
      const S = (v) => {
        if (l) return;
        const p = o(n);
        if (!p) return;
        const H = e.$data(t.closest("[x-data]"));
        if (H && !H._animationLocked && (H._emit("node-click", { node: p, event: v }), !!Co(p))) {
          if (v.stopPropagation(), a) {
            a = !1;
            return;
          }
          ot(v, H._shortcuts?.multiSelect) ? H.selectedNodes.has(p.id) ? (H.selectedNodes.delete(p.id), p.selected = !1, t.classList.remove("flow-node-selected"), j("selection", `Node "${p.id}" deselected (shift)`)) : (H.selectedNodes.add(p.id), p.selected = !0, t.classList.add("flow-node-selected"), j("selection", `Node "${p.id}" selected (shift)`)) : (H.deselectAll(), H.selectedNodes.add(p.id), p.selected = !0, t.classList.add("flow-node-selected"), j("selection", `Node "${p.id}" selected`)), H._emitSelectionChange();
        }
      };
      t.addEventListener("click", S);
      const $ = (v) => {
        v.preventDefault(), v.stopPropagation();
        const p = o(n);
        if (!p) return;
        const H = e.$data(t.closest("[x-data]"));
        if (H)
          if (H.selectedNodes.size > 1 && H.selectedNodes.has(p.id)) {
            const E = H.nodes.filter((N) => H.selectedNodes.has(N.id));
            H._emit("selection-context-menu", { nodes: E, event: v });
          } else
            H._emit("node-context-menu", { node: p, event: v });
      };
      t.addEventListener("contextmenu", $), requestAnimationFrame(() => {
        const v = o(n);
        if (!v) return;
        const p = e.$data(t.closest("[x-data]"));
        v.dimensions = {
          width: t.offsetWidth,
          height: t.offsetHeight
        }, j("init", `Node "${v.id}" measured`, v.dimensions), p?._nodeElements?.set(v.id, t);
      }), r(() => {
        s?.destroy(), h?.remove(), h = null, d?.destroy(), d = null, t.removeEventListener("keydown", A), t.removeEventListener("focus", _), t.removeEventListener("click", S), t.removeEventListener("contextmenu", $);
        const v = t.dataset.flowNodeId;
        v && e.$data(t.closest("[x-data]"))?._nodeElements?.delete(v);
      });
    }
  );
}
const mt = {
  minWidth: 30,
  minHeight: 30,
  maxWidth: 1 / 0,
  maxHeight: 1 / 0
};
function Bf(e, t, n, o, i, r) {
  const { minWidth: s, minHeight: l, maxWidth: a, maxHeight: c } = i, u = e.includes("left"), h = e.includes("right"), d = e.includes("top"), f = e.includes("bottom");
  let g = o.width;
  h ? g = o.width + t.x : u && (g = o.width - t.x);
  let m = o.height;
  f ? m = o.height + t.y : d && (m = o.height - t.y), g = Math.max(s, Math.min(a, g)), m = Math.max(l, Math.min(c, m)), r && (g = r[0] * Math.round(g / r[0]), m = r[1] * Math.round(m / r[1]), g = Math.max(s, Math.min(a, g)), m = Math.max(l, Math.min(c, m)));
  const w = g - o.width, y = m - o.height, M = u ? n.x - w : n.x, L = d ? n.y - y : n.y;
  return {
    position: { x: M, y: L },
    dimensions: { width: g, height: m }
  };
}
const Js = ["top-left", "top-right", "bottom-left", "bottom-right"], Qs = ["top", "right", "bottom", "left"], Wf = [...Js, ...Qs], Uf = {
  "top-left": "nwse-resize",
  "top-right": "nesw-resize",
  "bottom-left": "nesw-resize",
  "bottom-right": "nwse-resize",
  top: "ns-resize",
  bottom: "ns-resize",
  left: "ew-resize",
  right: "ew-resize"
};
function jf(e) {
  e.directive(
    "flow-resizer",
    (t, { expression: n, modifiers: o }, { evaluate: i, effect: r, cleanup: s }) => {
      const l = Zf(o);
      let a = { ...mt };
      if (n)
        try {
          const u = i(n);
          a = { ...mt, ...u };
        } catch {
        }
      const c = [];
      for (const u of l) {
        const h = document.createElement("div");
        h.className = `flow-resizer-handle flow-resizer-handle-${u}`, h.style.cursor = Uf[u], h.dataset.flowResizeDirection = u, t.appendChild(h), c.push(h), h.addEventListener("pointerdown", (d) => {
          d.preventDefault(), d.stopPropagation();
          const f = t.closest("[x-flow-node]");
          if (!f) return;
          const g = t.closest("[x-data]");
          if (!g) return;
          const m = e.$data(g), w = f.dataset.flowNodeId;
          if (!w || !m) return;
          const y = m.getNode(w);
          if (!y || !bi(y)) return;
          const M = { ...a };
          if (y.minDimensions?.width != null && a.minWidth === mt.minWidth && (M.minWidth = y.minDimensions.width), y.minDimensions?.height != null && a.minHeight === mt.minHeight && (M.minHeight = y.minDimensions.height), y.maxDimensions?.width != null && a.maxWidth === mt.maxWidth && (M.maxWidth = y.maxDimensions.width), y.maxDimensions?.height != null && a.maxHeight === mt.maxHeight && (M.maxHeight = y.maxDimensions.height), !y.dimensions) {
            const $ = m.viewport?.zoom || 1, v = f.getBoundingClientRect();
            y.dimensions = { width: v.width / $, height: v.height / $ };
          }
          const L = { x: y.position.x, y: y.position.y }, b = { width: y.dimensions.width, height: y.dimensions.height }, D = m.viewport?.zoom || 1, k = d.clientX, A = d.clientY;
          m._captureHistory?.(), j("resize", `Resize start on "${w}" (${u})`, b), m._emit("node-resize-start", { node: y, dimensions: { ...b } });
          const _ = ($) => {
            const v = {
              x: ($.clientX - k) / D,
              y: ($.clientY - A) / D
            }, p = Bf(
              u,
              v,
              L,
              b,
              M,
              m._config?.snapToGrid ?? !1
            );
            if (y.position.x = p.position.x, y.position.y = p.position.y, y.dimensions.width = p.dimensions.width, y.dimensions.height = p.dimensions.height, y.parentId) {
              const H = m.getAbsolutePosition(y.id);
              f.style.left = `${H.x}px`, f.style.top = `${H.y}px`;
            } else
              f.style.left = `${p.position.x}px`, f.style.top = `${p.position.y}px`;
            f.style.width = `${p.dimensions.width}px`, f.style.height = `${p.dimensions.height}px`, m._emit("node-resize", { node: y, dimensions: { ...p.dimensions } });
          }, S = () => {
            document.removeEventListener("pointermove", _), document.removeEventListener("pointerup", S), document.removeEventListener("pointercancel", S), j("resize", `Resize end on "${w}"`, y.dimensions), m._emit("node-resize-end", { node: y, dimensions: { ...y.dimensions } });
          };
          document.addEventListener("pointermove", _), document.addEventListener("pointerup", S), document.addEventListener("pointercancel", S);
        });
      }
      r(() => {
        const u = t.closest("[x-flow-node]");
        if (!u) return;
        const h = t.closest("[x-data]");
        if (!h) return;
        const d = e.$data(h), f = u.dataset.flowNodeId;
        if (!f || !d) return;
        const g = d.getNode(f);
        if (!g) return;
        const m = !bi(g);
        for (const w of c)
          w.style.display = m ? "none" : "";
      }), s(() => {
        for (const u of c)
          u.remove();
      });
    }
  );
}
function Zf(e) {
  if (e.includes("corners"))
    return Js;
  if (e.includes("edges"))
    return Qs;
  const t = e.includes("top"), n = e.includes("bottom"), o = e.includes("left"), i = e.includes("right");
  if (t || n || o || i) {
    if (t && o) return ["top-left"];
    if (t && i) return ["top-right"];
    if (n && o) return ["bottom-left"];
    if (n && i) return ["bottom-right"];
    if (t) return ["top"];
    if (n) return ["bottom"];
    if (o) return ["left"];
    if (i) return ["right"];
  }
  return Wf;
}
function Kf(e, t, n, o) {
  return (Math.atan2(e - n, -(t - o)) * 180 / Math.PI % 360 + 360) % 360;
}
function Gf(e, t) {
  return (Math.round(e / t) * t % 360 + 360) % 360;
}
function Jf(e) {
  e.directive(
    "flow-rotate",
    (t, { expression: n, modifiers: o }, { evaluate: i, effect: r, cleanup: s }) => {
      const l = o.includes("snap"), a = l && n && Number(i(n)) || 15;
      t.classList.add("flow-rotate-handle"), t.style.cursor = "grab";
      const c = (u) => {
        u.preventDefault(), u.stopPropagation();
        const h = t.closest("[x-flow-node]");
        if (!h) return;
        const d = t.closest("[data-flow-canvas]");
        if (!d) return;
        const f = e.$data(d), g = h.dataset.flowNodeId;
        if (!g || !f) return;
        const m = f.getNode(g);
        if (!m) return;
        const w = h.getBoundingClientRect(), y = w.left + w.width / 2, M = w.top + w.height / 2;
        f._captureHistory(), t.style.cursor = "grabbing";
        const L = (D) => {
          let k = Kf(
            D.clientX,
            D.clientY,
            y,
            M
          );
          l && (k = Gf(k, a)), m.rotation = k;
        }, b = () => {
          document.removeEventListener("pointermove", L), document.removeEventListener("pointerup", b), t.style.cursor = "grab", f._emit("node-rotate-end", { node: m, rotation: m.rotation });
        };
        document.addEventListener("pointermove", L), document.addEventListener("pointerup", b);
      };
      t.addEventListener("pointerdown", c), s(() => {
        t.removeEventListener("pointerdown", c), t.classList.remove("flow-rotate-handle");
      });
    }
  );
}
function Qf(e) {
  e.directive(
    "flow-drag-handle",
    (t) => {
      t.setAttribute("data-flow-drag-handle", ""), t.classList.add("flow-drag-handle");
      const n = t.closest("[x-flow-node]");
      n && n.classList.add("flow-node-has-handle");
    }
  );
}
const eh = "application/alpineflow";
function th(e) {
  e.directive(
    "flow-draggable",
    (t, { expression: n }, { evaluate: o }) => {
      t.setAttribute("draggable", "true"), t.style.cursor = "grab", t.addEventListener("dragstart", (i) => {
        if (!i.dataTransfer) return;
        const r = o(n), s = typeof r == "string" ? r : JSON.stringify(r);
        i.dataTransfer.setData(eh, s), i.dataTransfer.effectAllowed = "move";
      });
    }
  );
}
function nh(e) {
  e.directive(
    "flow-viewport",
    (t, {}, { effect: n, cleanup: o }) => {
      t.classList.add("flow-viewport");
      const i = e.$data(t.closest("[x-data]"));
      if (!i?.edges) return;
      i._viewportEl = t;
      const r = i.viewport;
      r && (t.style.transform = `translate(${r.x}px, ${r.y}px) scale(${r.zoom})`);
      const s = document.createElement("div");
      s.classList.add("flow-edges"), t.insertBefore(s, t.firstChild);
      const l = /* @__PURE__ */ new Map();
      n(() => {
        const a = i.edges, c = new Set(a.map((d) => d.id));
        for (const [d, f] of l)
          c.has(d) || (e.destroyTree(f), f.remove(), l.delete(d), i._edgeSvgElements?.delete(d));
        for (const d of a) {
          if (l.has(d.id)) continue;
          const f = document.createElementNS("http://www.w3.org/2000/svg", "svg");
          f.setAttribute("class", "flow-edge-svg");
          const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
          f.appendChild(g), e.addScopeToNode(g, { edge: d }), g.setAttribute("x-flow-edge", "edge"), e.mutateDom(() => {
            s.appendChild(f);
          }), l.set(d.id, f), i._edgeSvgElements?.set(d.id, f), e.initTree(g);
        }
        const h = (t.closest("[data-flow-canvas]") ?? t).querySelector(".flow-edges-static");
        h && h.remove();
        for (const d of a) {
          const f = l.get(d.id);
          if (!f) continue;
          const g = i.getNode?.(d.source), m = i.getNode?.(d.target), w = d.hidden || g?.hidden || m?.hidden;
          f.style.display = w ? "none" : "";
        }
        for (const d of a) {
          const f = l.get(d.id);
          if (!f) continue;
          const g = i.getNode?.(d.source), m = i.getNode?.(d.target);
          g?.filtered || m?.filtered ? f.classList.add("flow-edge-filtered") : f.classList.remove("flow-edge-filtered");
        }
      }), o(() => {
        for (const [a, c] of l)
          e.destroyTree(c), c.remove(), i._edgeSvgElements?.delete(a);
        l.clear(), s.remove();
      });
    }
  );
}
const oh = [
  "top",
  "bottom",
  "left",
  "right",
  "top-left",
  "top-right",
  "bottom-left",
  "bottom-right"
], ih = "a, button, input, textarea, select, [contenteditable]", sh = 100, rh = 60, ah = /* @__PURE__ */ new Set(["top", "top-left", "top-right"]), lh = /* @__PURE__ */ new Set(["bottom", "bottom-left", "bottom-right"]), ch = /* @__PURE__ */ new Set(["left", "top-left", "bottom-left"]), dh = /* @__PURE__ */ new Set(["right", "top-right", "bottom-right"]);
function uh(e, t) {
  const n = new Set(t), o = n.has("static"), i = n.has("no-resize") || n.has("noresize"), r = n.has("locked"), s = n.has("constrained");
  let l = n.has("fill-width") || n.has("fill"), a = n.has("fill-height") || n.has("fill");
  return { position: e && oh.includes(e) ? e : "top-right", isStatic: o, isFixed: r, noResize: i, constrained: s, fillWidth: l, fillHeight: a };
}
function yt(e, t, n) {
  e.dispatchEvent(new CustomEvent(`flow-${t}`, {
    bubbles: !0,
    detail: n
  }));
}
function fh(e, t, n, o, i, r) {
  return {
    left: Math.max(0, Math.min(e, i - n)),
    top: Math.max(0, Math.min(t, r - o))
  };
}
function hh(e, t, n, o) {
  e.style.transform = "none", e.style.borderRadius = "0", n && (e.style.left = "0", e.style.right = "0", e.style.width = "auto"), o && (e.style.top = "0", e.style.bottom = "0", e.style.height = "auto"), n && !o && (ah.has(t) && (e.style.top = "0"), lh.has(t) && (e.style.bottom = "0")), o && !n && (ch.has(t) && (e.style.left = "0"), dh.has(t) && (e.style.right = "0"));
}
function gh(e) {
  e.directive(
    "flow-panel",
    (t, { value: n, modifiers: o }, { cleanup: i }) => {
      const {
        position: r,
        isStatic: s,
        isFixed: l,
        noResize: a,
        constrained: c,
        fillWidth: u,
        fillHeight: h
      } = uh(n, o), d = u || h, f = !s && !l && !d, g = !s && !a && !d;
      t.classList.add("flow-panel", `flow-panel-${r}`), s && t.classList.add("flow-panel-static"), (l || d) && t.classList.add("flow-panel-locked"), (a || d) && t.classList.add("flow-panel-no-resize"), u && t.classList.add("flow-panel-fill-width"), h && t.classList.add("flow-panel-fill-height"), d && hh(t, r, u, h);
      const m = (D) => D.stopPropagation();
      t.addEventListener("mousedown", m), t.addEventListener("pointerdown", m), t.addEventListener("wheel", m);
      const w = t.parentElement, y = {
        left: t.style.left,
        top: t.style.top,
        right: t.style.right,
        bottom: t.style.bottom,
        transform: t.style.transform,
        width: t.style.width,
        height: t.style.height,
        borderRadius: t.style.borderRadius
      }, M = `flow-panel-${r}`, L = () => {
        t.style.left = y.left, t.style.top = y.top, t.style.right = y.right, t.style.bottom = y.bottom, t.style.transform = y.transform, t.style.width = y.width, t.style.height = y.height, t.style.borderRadius = y.borderRadius, t.classList.contains(M) || t.classList.add(M);
      };
      w.addEventListener("flow-panel-reset", L), w.__flowPanels || (w.__flowPanels = /* @__PURE__ */ new Set()), w.__flowPanels.add(t);
      let b = null;
      if (f) {
        let D = !1, k = 0, A = 0, _ = 0, S = 0;
        const $ = () => {
          const E = t.getBoundingClientRect(), N = w.getBoundingClientRect();
          return {
            x: E.left - N.left,
            y: E.top - N.top
          };
        }, v = (E) => {
          if (!D) return;
          let N = _ + (E.clientX - k), P = S + (E.clientY - A);
          if (c) {
            const z = fh(
              N,
              P,
              t.offsetWidth,
              t.offsetHeight,
              w.clientWidth,
              w.clientHeight
            );
            N = z.left, P = z.top;
          }
          t.style.left = `${N}px`, t.style.top = `${P}px`, yt(w, "panel-drag", {
            panel: t,
            position: { x: N, y: P }
          });
        }, p = () => {
          if (!D) return;
          D = !1, document.removeEventListener("pointermove", v), document.removeEventListener("pointerup", p), document.removeEventListener("pointercancel", p);
          const E = $();
          yt(w, "panel-drag-end", {
            panel: t,
            position: E
          });
        }, H = (E) => {
          const N = E.target;
          if (N.closest(ih) || N.closest(".flow-panel-resize-handle"))
            return;
          D = !0, k = E.clientX, A = E.clientY;
          const P = t.getBoundingClientRect(), z = w.getBoundingClientRect();
          _ = P.left - z.left, S = P.top - z.top, t.style.bottom = "auto", t.style.right = "auto", t.style.transform = "none", t.style.left = `${_}px`, t.style.top = `${S}px`, document.addEventListener("pointermove", v), document.addEventListener("pointerup", p), document.addEventListener("pointercancel", p), yt(w, "panel-drag-start", {
            panel: t,
            position: { x: _, y: S }
          });
        };
        if (t.addEventListener("pointerdown", H), g) {
          b = document.createElement("div"), b.classList.add("flow-panel-resize-handle"), t.appendChild(b);
          let E = !1, N = 0, P = 0, z = 0, x = 0;
          const C = (J) => {
            if (!E) return;
            const oe = Math.max(sh, z + (J.clientX - N)), G = Math.max(rh, x + (J.clientY - P));
            t.style.width = `${oe}px`, t.style.height = `${G}px`, yt(w, "panel-resize", {
              panel: t,
              dimensions: { width: oe, height: G }
            });
          }, T = () => {
            E && (E = !1, document.removeEventListener("pointermove", C), document.removeEventListener("pointerup", T), document.removeEventListener("pointercancel", T), yt(w, "panel-resize-end", {
              panel: t,
              dimensions: { width: t.offsetWidth, height: t.offsetHeight }
            }));
          }, U = (J) => {
            J.stopPropagation(), E = !0, N = J.clientX, P = J.clientY, z = t.offsetWidth, x = t.offsetHeight, document.addEventListener("pointermove", C), document.addEventListener("pointerup", T), document.addEventListener("pointercancel", T), yt(w, "panel-resize-start", {
              panel: t,
              dimensions: { width: z, height: x }
            });
          };
          b.addEventListener("pointerdown", U), i(() => {
            t.removeEventListener("pointerdown", H), b?.removeEventListener("pointerdown", U), document.removeEventListener("pointermove", v), document.removeEventListener("pointerup", p), document.removeEventListener("pointercancel", p), document.removeEventListener("pointermove", C), document.removeEventListener("pointerup", T), document.removeEventListener("pointercancel", T), b?.remove(), t.removeEventListener("mousedown", m), t.removeEventListener("pointerdown", m), t.removeEventListener("wheel", m), w.removeEventListener("flow-panel-reset", L), w.__flowPanels?.delete(t);
          });
        } else
          i(() => {
            t.removeEventListener("pointerdown", H), document.removeEventListener("pointermove", v), document.removeEventListener("pointerup", p), document.removeEventListener("pointercancel", p), t.removeEventListener("mousedown", m), t.removeEventListener("pointerdown", m), t.removeEventListener("wheel", m), w.removeEventListener("flow-panel-reset", L), w.__flowPanels?.delete(t);
          });
      } else
        i(() => {
          t.removeEventListener("mousedown", m), t.removeEventListener("pointerdown", m), t.removeEventListener("wheel", m), w.removeEventListener("flow-panel-reset", L), w.__flowPanels?.delete(t);
        });
    }
  );
}
function ph(e) {
  e.directive(
    "flow-node-toolbar",
    (t, { value: n, modifiers: o }, { effect: i, cleanup: r }) => {
      const s = mh(n), l = yh(o);
      t.classList.add("flow-node-toolbar"), t.style.position = "absolute";
      const a = (u) => {
        u.stopPropagation();
      }, c = (u) => {
        u.stopPropagation();
      };
      t.addEventListener("pointerdown", a), t.addEventListener("click", c), i(() => {
        const u = t.closest("[x-flow-node]");
        if (!u) return;
        const h = t.closest("[x-data]");
        if (!h) return;
        const d = e.$data(h);
        if (!d?.viewport) return;
        const f = d.viewport.zoom || 1, g = parseInt(t.getAttribute("data-flow-offset") ?? "10", 10), m = u.dataset.flowNodeId, w = m ? d.getNode(m) : null, y = w?.dimensions?.width ?? u.offsetWidth, M = w?.dimensions?.height ?? u.offsetHeight, L = g / f;
        let b, D, k, A;
        s === "top" || s === "bottom" ? (D = s === "top" ? -L : M + L, A = s === "top" ? "-100%" : "0%", l === "start" ? (b = 0, k = "0%") : l === "end" ? (b = y, k = "-100%") : (b = y / 2, k = "-50%")) : (b = s === "left" ? -L : y + L, k = s === "left" ? "-100%" : "0%", l === "start" ? (D = 0, A = "0%") : l === "end" ? (D = M, A = "-100%") : (D = M / 2, A = "-50%")), t.style.left = `${b}px`, t.style.top = `${D}px`, t.style.transformOrigin = "0 0", t.style.transform = `scale(${1 / f}) translate(${k}, ${A})`;
      }), r(() => {
        t.removeEventListener("pointerdown", a), t.removeEventListener("click", c), t.classList.remove("flow-node-toolbar");
      });
    }
  );
}
function mh(e) {
  return e === "bottom" ? "bottom" : e === "left" ? "left" : e === "right" ? "right" : "top";
}
function yh(e) {
  return e.includes("start") ? "start" : e.includes("end") ? "end" : "center";
}
function wh(e) {
  e.directive(
    "flow-context-menu",
    (t, { modifiers: n, expression: o }, { effect: i, evaluate: r, cleanup: s }) => {
      const l = n[0];
      if (!l) {
        console.warn("[AlpineFlow] x-flow-context-menu requires a type modifier: .node, .edge, .pane, or .selection");
        return;
      }
      const a = t, c = a.closest("[x-data]");
      if (!c) return;
      const u = e.$data(c);
      let h = 0, d = 0;
      if (o) {
        const k = r(o);
        h = k?.offsetX ?? 0, d = k?.offsetY ?? 0;
      }
      a.setAttribute("role", "menu"), a.setAttribute("tabindex", "-1"), a.style.display = "none";
      const f = document.createElement("div");
      f.style.cssText = "position:fixed;inset:0;z-index:4999;display:none;", c.appendChild(f);
      let g = null;
      const m = 4, w = () => {
        g = document.activeElement;
        const k = u.contextMenu.x + h, A = u.contextMenu.y + d;
        a.style.display = "", a.style.position = "fixed", a.style.left = k + "px", a.style.top = A + "px", a.style.zIndex = "5000", a.querySelectorAll(':scope > button, :scope > [role="menuitem"]').forEach((H) => {
          H.setAttribute("role", "menuitem"), H.hasAttribute("tabindex") || H.setAttribute("tabindex", "-1");
        });
        const _ = a.getBoundingClientRect(), S = window.innerWidth, $ = window.innerHeight;
        let v = k, p = A;
        _.right > S - m && (v = S - _.width - m), _.bottom > $ - m && (p = $ - _.height - m), v < m && (v = m), p < m && (p = m), a.style.left = v + "px", a.style.top = p + "px", f.style.display = "", a.focus();
      }, y = () => {
        a.style.display = "none", f.style.display = "none", g && document.contains(g) && (g.focus(), g = null);
      };
      i(() => {
        const k = u.contextMenu;
        k.show && k.type === l ? w() : y();
      }), f.addEventListener("click", () => u.closeContextMenu()), f.addEventListener("contextmenu", (k) => {
        k.preventDefault(), u.closeContextMenu();
      });
      const M = () => {
        u.contextMenu.show && u.contextMenu.type === l && u.closeContextMenu();
      };
      window.addEventListener("scroll", M, !0);
      const L = () => Array.from(a.querySelectorAll(
        ':scope > button:not([disabled]), :scope > [role="menuitem"]:not([disabled])'
      )), b = (k) => Array.from(k.querySelectorAll(
        "button:not([disabled])"
      )), D = (k) => {
        if (!u.contextMenu.show || u.contextMenu.type !== l || a.style.display === "none") return;
        const A = document.activeElement, _ = A?.closest(".flow-context-submenu"), S = _ ? b(_) : L();
        if (S.length === 0) return;
        const $ = S.indexOf(A);
        switch (k.key) {
          case "ArrowDown": {
            k.preventDefault();
            const v = $ < S.length - 1 ? $ + 1 : 0;
            S[v].focus();
            break;
          }
          case "ArrowUp": {
            k.preventDefault();
            const v = $ > 0 ? $ - 1 : S.length - 1;
            S[v].focus();
            break;
          }
          case "Tab": {
            if (k.preventDefault(), k.shiftKey) {
              const v = $ > 0 ? $ - 1 : S.length - 1;
              S[v].focus();
            } else {
              const v = $ < S.length - 1 ? $ + 1 : 0;
              S[v].focus();
            }
            break;
          }
          case "Enter":
          case " ": {
            k.preventDefault(), A?.click();
            break;
          }
          case "ArrowRight": {
            if (!_) {
              const v = A?.querySelector(".flow-context-submenu");
              v && (k.preventDefault(), v.querySelector("button:not([disabled])")?.focus());
            }
            break;
          }
          case "ArrowLeft": {
            _ && (k.preventDefault(), _.closest(".flow-context-submenu-trigger")?.focus());
            break;
          }
        }
      };
      a.addEventListener("keydown", D), s(() => {
        f.remove(), window.removeEventListener("scroll", M, !0), a.removeEventListener("keydown", D);
      });
    }
  );
}
const vh = {
  mouseenter: "mouseleave",
  click: "click"
  // toggle behavior
};
function _h(e) {
  e.directive(
    "flow-animate",
    (t, { value: n, modifiers: o, expression: i }, { evaluate: r, effect: s, cleanup: l }) => {
      const a = new Set(o), c = a.has("once"), u = a.has("reverse"), h = a.has("queue"), d = n || "";
      let f = "click";
      a.has("mouseenter") ? f = "mouseenter" : a.has("click") && (f = "click");
      let g = null, m = [], w = !1, y = !1, M = !1;
      function L() {
        const v = r(i);
        return Array.isArray(v) ? v : v && typeof v == "object" ? [v] : [];
      }
      function b() {
        const v = t.closest("[x-data]");
        return v ? e.$data(v) : null;
      }
      function D(v, p = !1) {
        const H = b();
        if (!H?.timeline) return Promise.resolve();
        const E = H.timeline();
        if (p) {
          for (let N = v.length - 1; N >= 0; N--)
            E.step(v[N]);
          E.reverse();
        } else
          for (const N of v)
            N.parallel ? E.parallel(N.parallel) : E.step(N);
        return g = E, E.play().then(() => {
          g === E && (g = null);
        });
      }
      function k(v = !1) {
        if (c && y) return;
        y = !0;
        const p = L();
        if (p.length === 0) return;
        const H = () => D(p, v);
        h ? (m.push(H), A()) : (g?.stop(), g = null, m = [], w = !1, H());
      }
      async function A() {
        if (!w) {
          for (w = !0; m.length > 0; )
            await m.shift()();
          w = !1;
        }
      }
      if (d) {
        s(() => {
          const v = L(), p = b();
          p?.registerAnimation && p.registerAnimation(d, v);
        }), l(() => {
          const v = b();
          v?.unregisterAnimation && v.unregisterAnimation(d);
        });
        return;
      }
      const _ = () => {
        u && f === "click" ? (k(M), M = !M) : k(!1);
      };
      t.addEventListener(f, _);
      let S = null, $ = null;
      u && f !== "click" && ($ = vh[f] ?? null, $ && (S = () => k(!0), t.addEventListener($, S))), l(() => {
        g?.stop(), t.removeEventListener(f, _), $ && S && t.removeEventListener($, S);
      });
    }
  );
}
function bh(e, t, n, o, i) {
  const r = t.position?.x ?? e.position.x, s = t.position?.y ?? e.position.y, l = e.dimensions?.width ?? ye, a = e.dimensions?.height ?? we, c = r * n.zoom + n.x, u = s * n.zoom + n.y, h = (r + l) * n.zoom + n.x, d = (s + a) * n.zoom + n.y;
  return h > 0 && c < o && d > 0 && u < i;
}
function xh(e, t, n, o, i) {
  const r = e.nodes;
  if (!r || r.length === 0) return !1;
  for (const s of r) {
    const l = t.getNode?.(s) ?? t.nodes?.find((a) => a.id === s);
    if (l && !bh(l, e, n, o, i))
      return !0;
  }
  return !1;
}
function Eh(e) {
  e.directive(
    "flow-timeline",
    (t, { expression: n }, { evaluate: o, effect: i, cleanup: r }) => {
      let s = 0, l = null, a = [], c = !1, u = "idle", h = 0;
      function d() {
        const w = t.closest("[x-data]");
        return w ? e.$data(w) : null;
      }
      function f(w, y) {
        const M = d();
        if (!M?.timeline) return Promise.resolve();
        const L = M.timeline(), b = y.speed ?? 1, D = y.autoFitView === !0, k = y.fitViewPadding ?? 0.1, A = M.viewport, _ = M.getContainerDimensions?.();
        for (const S of w) {
          const $ = b !== 1 ? {
            ...S,
            duration: S.duration !== void 0 ? S.duration / b : void 0,
            delay: S.delay !== void 0 ? S.delay / b : void 0
          } : S;
          if ($.parallel) {
            const v = $.parallel.map(
              (p) => b !== 1 ? {
                ...p,
                duration: p.duration !== void 0 ? p.duration / b : void 0,
                delay: p.delay !== void 0 ? p.delay / b : void 0
              } : p
            );
            L.parallel(v);
          } else if (D && A && _ && xh($, M, A, _.width, _.height)) {
            const v = {
              fitView: !0,
              fitViewPadding: k,
              duration: $.duration,
              easing: $.easing
            };
            L.parallel([$, v]);
          } else
            L.step($);
        }
        if (y.lock && L.lock(!0), y.loop !== void 0 && y.loop !== !1) {
          const S = y.loop === !0 ? 0 : y.loop;
          L.loop(S);
        }
        return y.respectReducedMotion !== void 0 && L.respectReducedMotion(y.respectReducedMotion), l = L, u = "playing", c = !0, L.play().then(() => {
          l === L && (l = null, u = "idle", c = !1);
        });
      }
      async function g(w) {
        if (a.length === 0) return;
        if ((w.overflow ?? "queue") === "latest" && c) {
          l?.stop(), l = null, c = !1, u = "idle";
          const M = [a[a.length - 1]];
          s += a.length, a = [], await f(M, w);
        } else {
          const M = [...a];
          s += M.length, a = [], c && await new Promise((b) => {
            l ? (l.on("complete", () => b()), l.on("stop", () => b())) : b();
          }), await f(M, w);
        }
      }
      const m = {
        async play() {
          const w = o(n), y = w.steps ?? [];
          s < y.length && (a = y.slice(s), await g(w));
        },
        stop() {
          l?.stop(), l = null, c = !1, u = "stopped", a = [];
        },
        reset(w) {
          if (l?.stop(), l = null, c = !1, u = "idle", s = 0, a = [], h = 0, w) {
            const y = o(n), M = y.steps ?? [];
            if (M.length > 0)
              return a = [...M], g(y);
          }
        },
        get state() {
          return u;
        }
      };
      t.__timeline = m, i(() => {
        const w = o(n);
        if (!w || !w.steps) return;
        const y = w.steps, M = w.autoplay !== !1;
        if (y.length > h) {
          const L = y.slice(Math.max(s, h));
          h = y.length, L.length > 0 && M && (a.push(...L), g(w));
        } else
          h = y.length;
      }), r(() => {
        l?.stop(), delete t.__timeline;
      });
    }
  );
}
function Ch(e) {
  e.directive(
    "flow-collapse",
    (t, { expression: n, modifiers: o }, { evaluate: i, effect: r, cleanup: s }) => {
      const l = o.includes("all"), a = o.includes("expand"), c = o.includes("children"), u = o.includes("instant"), h = () => {
        const d = t.closest("[data-flow-canvas]");
        if (!d) return;
        const f = e.$data(d);
        if (!f) return;
        if (l) {
          for (const m of f.nodes)
            a ? f.expandNode?.(m.id, { animate: !u }) : f.collapseNode?.(m.id, { animate: !u });
          t.setAttribute("aria-expanded", String(a));
          return;
        }
        if (c && n) {
          const m = i(n);
          if (!m) return;
          for (const w of f.nodes)
            w.parentId === m && (a ? f.expandNode?.(w.id, { animate: !u }) : f.collapseNode?.(w.id, { animate: !u }));
          t.setAttribute("aria-expanded", String(a));
          return;
        }
        const g = i(n);
        !g || !f?.toggleNode || f.toggleNode(g, { animate: !u });
      };
      t.addEventListener("click", h), t.setAttribute("data-flow-collapse", ""), t.style.cursor = "pointer", !l && !c && r(() => {
        const d = i(n);
        if (!d) return;
        const f = t.closest("[data-flow-canvas]");
        if (!f) return;
        const g = e.$data(f);
        if (!g?.isCollapsed) return;
        const m = g.isCollapsed(d);
        t.setAttribute("aria-expanded", String(!m));
        const w = t.closest("[x-flow-node]");
        w && t.setAttribute("aria-controls", w.id || d);
      }), s(() => {
        t.removeEventListener("click", h);
      });
    }
  );
}
function Sh(e) {
  e.directive(
    "flow-condense",
    (t, { expression: n, modifiers: o }, { evaluate: i, effect: r, cleanup: s }) => {
      const l = () => {
        const a = i(n);
        if (!a) return;
        const c = t.closest("[x-data]");
        if (!c) return;
        const u = e.$data(c);
        u?.toggleCondense && u.toggleCondense(a);
      };
      t.addEventListener("click", l), t.setAttribute("data-flow-condense", ""), t.style.cursor = "pointer", r(() => {
        const a = i(n);
        if (!a) return;
        const c = t.closest("[x-data]");
        if (!c) return;
        const u = e.$data(c);
        if (!u?.isCondensed) return;
        const h = u.isCondensed(a);
        t.setAttribute("aria-expanded", String(!h));
      }), s(() => {
        t.removeEventListener("click", l);
      });
    }
  );
}
function Lh(e) {
  e.directive(
    "flow-row-select",
    (t, { expression: n }, { evaluate: o, effect: i, cleanup: r }) => {
      t.classList.add("nodrag"), t.style.cursor = "pointer", t.setAttribute("data-flow-row-select", "");
      const s = (l) => {
        l.stopPropagation();
        const a = o(n);
        if (!a) return;
        const c = t.closest("[x-data]");
        if (!c) return;
        const u = e.$data(c);
        u?.toggleRowSelect && (l.shiftKey ? u.toggleRowSelect(a) : (u.deselectAllRows(), u.selectRow(a)));
      };
      t.addEventListener("click", s), i(() => {
        const l = o(n);
        if (!l) return;
        const a = t.closest("[x-data]");
        if (!a) return;
        const c = e.$data(a);
        if (!c?.isRowSelected) return;
        const u = c.isRowSelected(l);
        t.classList.toggle("flow-row-selected", u), t.setAttribute("aria-selected", String(u));
      }), r(() => {
        t.removeEventListener("click", s);
      });
    }
  );
}
function Mh(e) {
  e.directive(
    "flow-detail",
    (t, { expression: n, modifiers: o }, { evaluate: i, effect: r, cleanup: s }) => {
      if (n) {
        const h = t.closest("[data-flow-canvas]");
        if (!h) return;
        const d = e.$data(h);
        if (!d?.viewport) return;
        const f = t.style.display;
        r(() => {
          const g = i(n), m = d.viewport.zoom, w = g.min === void 0 || m >= g.min, y = g.max === void 0 || m <= g.max;
          t.style.display = w && y ? f : "none";
        }), s(() => {
          t.style.display = f;
        });
        return;
      }
      const l = new Set(o.filter((h) => h === "far" || h === "medium" || h === "close"));
      if (l.size === 0) return;
      const a = t.closest("[data-flow-canvas]");
      if (!a) return;
      const c = e.$data(a);
      if (!c?._zoomLevel) return;
      const u = t.style.display;
      r(() => {
        const h = c._zoomLevel;
        l.has(h) ? t.style.display = u : t.style.display = "none";
      }), s(() => {
        t.style.display = u;
      });
    }
  );
}
const Ph = ["perf", "events", "viewport", "state", "activity"], Oi = ["fps", "memory", "counts", "visible"], Vi = 30;
function kh(e, t) {
  if (e && typeof e == "object" && Object.keys(e).length > 0)
    return e;
  const n = t.filter((i) => Ph.includes(i));
  if (n.length === 0)
    return { perf: !0, events: !0, viewport: !0, state: !0, activity: !0 };
  const o = {};
  for (const i of n)
    o[i] = !0;
  return o;
}
function Nh(e) {
  return e.perf ? e.perf === !0 ? [...Oi] : e.perf.filter((t) => Oi.includes(t)) : [];
}
function Th(e) {
  return e.events ? e.events === !0 ? Vi : e.events.max ?? Vi : 0;
}
function zt(e, t) {
  const n = document.createElement("div");
  n.className = `flow-devtools-section ${t}`;
  const o = document.createElement("div");
  o.className = "flow-devtools-section-title", o.textContent = e, n.appendChild(o);
  const i = document.createElement("div");
  return i.className = "flow-devtools-section-content", n.appendChild(i), { wrapper: n, content: i };
}
function Ie(e, t) {
  const n = document.createElement("div");
  n.className = `flow-devtools-row ${t}`;
  const o = document.createElement("span");
  o.className = "flow-devtools-label", o.textContent = e;
  const i = document.createElement("span");
  return i.className = "flow-devtools-value", i.textContent = "—", n.appendChild(o), n.appendChild(i), { row: n, valueEl: i };
}
function Ih(e) {
  e.directive(
    "flow-devtools",
    (t, { expression: n, modifiers: o }, { evaluate: i, effect: r, cleanup: s }) => {
      let l = null;
      if (n)
        try {
          l = i(n);
        } catch {
        }
      const a = kh(l, o), c = t.closest("[x-data]");
      if (!c) return;
      const u = t.closest(".flow-container");
      if (!u) return;
      t.classList.add("flow-devtools", "canvas-overlay"), t.setAttribute("data-flow-devtools", "");
      const h = (R) => R.stopPropagation();
      t.addEventListener("wheel", h);
      const d = document.createElement("button");
      d.className = "flow-devtools-toggle nopan", d.title = "Devtools";
      const f = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      f.setAttribute("width", "14"), f.setAttribute("height", "14"), f.setAttribute("viewBox", "0 0 24 24"), f.setAttribute("fill", "none"), f.setAttribute("stroke", "currentColor"), f.setAttribute("stroke-width", "2"), f.setAttribute("stroke-linecap", "round"), f.setAttribute("stroke-linejoin", "round");
      const g = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
      g.setAttribute("points", "22 12 18 12 15 21 9 3 6 12 2 12"), f.appendChild(g), d.appendChild(f), t.appendChild(d);
      const m = document.createElement("div");
      m.className = "flow-devtools-panel", m.style.display = "none", m.style.userSelect = "none", t.appendChild(m);
      let w = !1;
      const y = () => {
        w = !w, m.style.display = w ? "" : "none", d.title = w ? "Collapse" : "Devtools", w ? G() : se();
      };
      d.addEventListener("click", y);
      const M = Nh(a);
      let L = null, b = null, D = null, k = null, A = null;
      if (M.length > 0) {
        const { wrapper: R, content: Q } = zt("Performance", "flow-devtools-perf");
        if (M.includes("fps")) {
          const { row: Y, valueEl: B } = Ie("FPS", "flow-devtools-fps");
          L = B, Q.appendChild(Y);
        }
        if (M.includes("memory")) {
          const { row: Y, valueEl: B } = Ie("Memory", "flow-devtools-memory");
          b = B, Q.appendChild(Y);
        }
        if (M.includes("counts")) {
          const Y = Ie("Nodes", "flow-devtools-counts");
          D = Y.valueEl, Q.appendChild(Y.row);
          const B = Ie("Edges", "flow-devtools-counts");
          k = B.valueEl, Q.appendChild(B.row);
        }
        if (M.includes("visible")) {
          const { row: Y, valueEl: B } = Ie("Visible", "flow-devtools-visible");
          A = B, Q.appendChild(Y);
        }
        m.appendChild(R);
      }
      const _ = Th(a);
      let S = null;
      if (_ > 0) {
        const { wrapper: R, content: Q } = zt("Events", "flow-devtools-events"), Y = document.createElement("button");
        Y.className = "flow-devtools-clear-btn nopan", Y.textContent = "Clear", Y.addEventListener("click", () => {
          S && (S.textContent = ""), le.length = 0;
        }), R.querySelector(".flow-devtools-section-title").appendChild(Y), S = document.createElement("div"), S.className = "flow-devtools-event-list", Q.appendChild(S), m.appendChild(R);
      }
      let $ = null, v = null, p = null;
      if (a.viewport) {
        const { wrapper: R, content: Q } = zt("Viewport", "flow-devtools-viewport"), Y = Ie("X", "flow-devtools-vp-x");
        $ = Y.valueEl, Q.appendChild(Y.row);
        const B = Ie("Y", "flow-devtools-vp-y");
        v = B.valueEl, Q.appendChild(B.row);
        const I = Ie("Zoom", "flow-devtools-vp-zoom");
        p = I.valueEl, Q.appendChild(I.row), m.appendChild(R);
      }
      let H = null;
      if (a.state) {
        const { wrapper: R, content: Q } = zt("Selection", "flow-devtools-state");
        H = document.createElement("div"), H.className = "flow-devtools-state-content", H.textContent = "No selection", Q.appendChild(H), m.appendChild(R);
      }
      let E = null, N = null, P = null, z = null;
      if (a.activity) {
        const { wrapper: R, content: Q } = zt("Activity", "flow-devtools-activity"), Y = Ie("Animations", "flow-devtools-anim");
        E = Y.valueEl, Q.appendChild(Y.row);
        const B = Ie("Particles", "flow-devtools-particles");
        N = B.valueEl, Q.appendChild(B.row);
        const I = Ie("Follow", "flow-devtools-follow");
        P = I.valueEl, Q.appendChild(I.row);
        const W = Ie("Timelines", "flow-devtools-timelines");
        z = W.valueEl, Q.appendChild(W.row), m.appendChild(R);
      }
      let x = null, C = !1, T = 0, U = performance.now();
      const J = !!(L || b), oe = () => {
        if (!C) return;
        T++;
        const R = performance.now();
        R - U >= 1e3 && (L && (L.textContent = String(Math.round(T * 1e3 / (R - U)))), T = 0, U = R, b && performance.memory && (b.textContent = Math.round(performance.memory.usedJSHeapSize / 1048576) + " MB")), x = requestAnimationFrame(oe);
      }, G = () => {
        !J || C || (C = !0, T = 0, U = performance.now(), x = requestAnimationFrame(oe));
      }, se = () => {
        C = !1, x !== null && (cancelAnimationFrame(x), x = null);
      }, le = [], ce = [
        "flow-init",
        "flow-connect",
        "flow-disconnect",
        "flow-node-add",
        "flow-node-remove",
        "flow-edge-add",
        "flow-edge-remove",
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
      ];
      let te = null;
      if (_ > 0 && S) {
        te = (R) => {
          const Q = R, Y = Q.type.replace("flow-", "");
          let B = "";
          try {
            B = Q.detail ? JSON.stringify(Q.detail).slice(0, 80) : "";
          } catch {
            B = "[circular]";
          }
          le.unshift({ name: Y, time: Date.now(), detail: B });
          const I = S, W = document.createElement("div");
          W.className = "flow-devtools-event-entry";
          const ee = document.createElement("span");
          ee.className = "flow-devtools-event-name", ee.textContent = Y;
          const X = document.createElement("span");
          X.className = "flow-devtools-event-age", X.textContent = "now";
          const K = document.createElement("span");
          for (K.className = "flow-devtools-event-detail", K.textContent = B, W.appendChild(ee), W.appendChild(X), W.appendChild(K), I.prepend(W); I.children.length > _; )
            I.removeChild(I.lastChild), le.pop();
        };
        for (const R of ce)
          u.addEventListener(R, te);
      }
      r(() => {
        const R = e.$data(c);
        if (R) {
          if (D && (D.textContent = String(R.nodes?.length ?? 0)), k && (k.textContent = String(R.edges?.length ?? 0)), A && R._getVisibleNodeIds && (A.textContent = String(R._getVisibleNodeIds().size)), $ && R.viewport && ($.textContent = Math.round(R.viewport.x).toString()), v && R.viewport && (v.textContent = Math.round(R.viewport.y).toString()), p && R.viewport && (p.textContent = R.viewport.zoom.toFixed(2)), H) {
            const Q = R.selectedNodes, Y = R.selectedEdges;
            if (!((Q?.size ?? 0) > 0 || (Y?.size ?? 0) > 0))
              H.textContent = "No selection";
            else {
              if (H.textContent = "", Q && Q.size > 0)
                for (const I of Q) {
                  const W = R.getNode?.(I);
                  if (!W) continue;
                  const ee = document.createElement("pre");
                  ee.className = "flow-devtools-json", ee.textContent = JSON.stringify({ id: W.id, position: W.position, data: W.data }, null, 2), H.appendChild(ee);
                }
              if (Y && Y.size > 0)
                for (const I of Y) {
                  const W = R.edges?.find((X) => X.id === I);
                  if (!W) continue;
                  const ee = document.createElement("pre");
                  ee.className = "flow-devtools-json", ee.textContent = JSON.stringify({ id: W.id, source: W.source, target: W.target, type: W.type }, null, 2), H.appendChild(ee);
                }
            }
          }
          if (E) {
            const Q = R._animator?._groups?.size ?? 0;
            E.textContent = String(Q);
          }
          N && (N.textContent = String(R._activeParticles?.size ?? 0)), P && (P.textContent = R._followHandle ? "Active" : "Idle"), z && (z.textContent = String(R._activeTimelines?.size ?? 0));
        }
      }), s(() => {
        if (se(), d.removeEventListener("click", y), te)
          for (const R of ce)
            u.removeEventListener(R, te);
        t.removeEventListener("wheel", h), t.textContent = "", L = null, b = null, D = null, k = null, A = null, S = null, $ = null, v = null, p = null, H = null, E = null, N = null, P = null, z = null;
      });
    }
  );
}
const $h = {
  undo: { method: "undo", disabledWhen: (e) => !e.canUndo, aria: "disabled" },
  redo: { method: "redo", disabledWhen: (e) => !e.canRedo, aria: "disabled" },
  "fit-view": { method: "fitView", passExpression: !0 },
  "zoom-in": {
    method: "zoomIn",
    disabledWhen: (e) => e.viewport.zoom >= (e._config?.maxZoom ?? 2),
    aria: "disabled"
  },
  "zoom-out": {
    method: "zoomOut",
    disabledWhen: (e) => e.viewport.zoom <= (e._config?.minZoom ?? 0.5),
    aria: "disabled"
  },
  "toggle-interactive": { method: "toggleInteractive", aria: "pressed" },
  clear: { method: "$clear", disabledWhen: (e) => e.nodes.length === 0, aria: "disabled" },
  reset: { method: "$reset" },
  export: { method: "toImage", passExpression: !0 }
};
function Ah(e) {
  return $h[e] ?? null;
}
function Dh(e) {
  e.directive(
    "flow-action",
    (t, { value: n, expression: o }, { evaluate: i, effect: r, cleanup: s }) => {
      const a = Ah(n);
      if (!a)
        return;
      const c = t.closest("[data-flow-canvas]");
      if (!c)
        return;
      const u = e.$data(c);
      if (!u)
        return;
      const h = () => {
        const d = u[a.method];
        typeof d == "function" && (a.passExpression && o ? d.call(u, i(o)) : d.call(u));
      };
      t.addEventListener("click", h), (a.disabledWhen || a.aria) && r(() => {
        if (a.disabledWhen) {
          const d = a.disabledWhen(u);
          t.disabled = d, a.aria === "disabled" && t.setAttribute("aria-disabled", String(d));
        }
        a.aria === "pressed" && t.setAttribute("aria-pressed", String(!u.isInteractive));
      }), s(() => {
        t.removeEventListener("click", h);
      });
    }
  );
}
function Hh(e, t) {
  if (e !== "node" && e !== "row") return null;
  const n = t.includes("clear");
  return { type: e, isClear: n };
}
const ro = /* @__PURE__ */ new WeakMap();
function Rh(e) {
  e.directive(
    "flow-filter",
    (t, { value: n, expression: o, modifiers: i }, { evaluate: r, effect: s, cleanup: l }) => {
      const a = Hh(n, i);
      if (!a) return;
      const c = t.closest("[data-flow-canvas]");
      if (!c) return;
      const u = e.$data(c);
      if (!u) return;
      let h = null;
      const d = () => {
        if (a.isClear) {
          if (a.type === "node")
            u.clearNodeFilter(), ro.set(c, null);
          else
            for (const f of u.nodes)
              f.rowFilter && f.rowFilter !== "all" && u.setRowFilter(f.id, "all");
          return;
        }
        if (a.type === "node" && o)
          h = r(`[${o}]`)[0], u.setNodeFilter(h), ro.set(c, h);
        else if (a.type === "row" && o) {
          const f = r(o);
          u.setRowFilter(f.node, f.predicate);
        }
      };
      t.addEventListener("click", d), t.style.cursor = "pointer", a.type === "node" && !a.isClear && s(() => {
        u.nodes.length;
        const f = ro.get(c) === h && h !== null;
        t.classList.toggle("flow-filter-active", f), t.setAttribute("aria-pressed", String(f));
      }), l(() => {
        t.removeEventListener("click", d);
      });
    }
  );
}
function zh(e) {
  if (typeof e == "string")
    return { target: e };
  if (e && typeof e == "object" && "target" in e) {
    const t = e;
    return {
      target: t.target,
      zoom: typeof t.zoom == "number" ? t.zoom : void 0,
      speed: typeof t.speed == "number" ? t.speed : void 0
    };
  }
  return null;
}
function Fh(e) {
  e.directive(
    "flow-follow",
    (t, { expression: n, modifiers: o }, { evaluate: i, effect: r, cleanup: s }) => {
      const l = o.includes("toggle"), a = t.closest("[data-flow-canvas]");
      if (!a) return;
      const c = e.$data(a);
      if (!c?.follow) return;
      let u = null;
      const h = (f) => {
        t.classList.toggle("flow-following", f), t.setAttribute("aria-pressed", String(f));
      }, d = () => {
        if (!n) return;
        const f = i(n), g = zh(f);
        if (!g) return;
        if (l && u) {
          u.stop(), u = null, h(!1);
          return;
        }
        u && u.stop();
        const m = {};
        g.zoom !== void 0 && (m.zoom = g.zoom), g.speed !== void 0 && (m.speed = g.speed), u = c.follow(g.target, m), h(!0), u?.finished && u.finished.then(() => {
          u = null, h(!1);
        });
      };
      t.addEventListener("click", d), s(() => {
        t.removeEventListener("click", d), u && (u.stop(), u = null);
      });
    }
  );
}
function Oh(e, t) {
  return e !== "save" && e !== "restore" ? null : { action: e, persist: t.includes("persist") };
}
const Yo = /* @__PURE__ */ new Map();
function Vh(e, t) {
  Yo.set(e, t);
}
function Xh(e) {
  return Yo.get(e) ?? null;
}
function Yh(e) {
  return Yo.has(e);
}
function ao(e) {
  return `alpineflow-snapshot-${e}`;
}
function qh(e) {
  e.directive(
    "flow-snapshot",
    (t, { value: n, expression: o, modifiers: i }, { evaluate: r, effect: s, cleanup: l }) => {
      const a = Oh(n, i);
      if (!a) return;
      const c = t.closest("[data-flow-canvas]");
      if (!c) return;
      const u = e.$data(c);
      if (!u) return;
      const h = () => {
        if (!o) return;
        const d = r(o);
        if (d)
          if (a.action === "save") {
            const f = u.toObject();
            a.persist ? localStorage.setItem(ao(d), JSON.stringify(f)) : Vh(d, f);
          } else {
            let f = null;
            if (a.persist) {
              const g = localStorage.getItem(ao(d));
              if (g)
                try {
                  f = JSON.parse(g);
                } catch {
                }
            } else
              f = Xh(d);
            f && u.fromObject(f);
          }
      };
      t.addEventListener("click", h), a.action === "restore" && s(() => {
        if (!o) return;
        const d = r(o);
        if (!d) return;
        let f;
        a.persist ? f = localStorage.getItem(ao(d)) !== null : (u.nodes.length, f = Yh(d)), t.disabled = !f, t.setAttribute("aria-disabled", String(!f));
      }), l(() => {
        t.removeEventListener("click", h);
      });
    }
  );
}
function Bh(e) {
  const t = document.createElement("div");
  t.className = "flow-loading-indicator";
  const n = document.createElement("div");
  n.className = "flow-loading-indicator-node";
  const o = document.createElement("div");
  return o.className = "flow-loading-indicator-text", o.textContent = e ?? "Loading…", t.appendChild(n), t.appendChild(o), t;
}
function Wh(e) {
  e.directive(
    "flow-loading",
    (t, { modifiers: n }, { effect: o, cleanup: i }) => {
      const r = t.closest("[data-flow-canvas]");
      if (!r) return;
      const s = e.$data(r);
      if (!s) return;
      t.classList.add("flow-loading-overlay"), t.childElementCount > 0 || t.textContent.trim().length > 0 || t.appendChild(Bh(s._loadingText));
      const a = n.includes("fade");
      a && t.classList.add("flow-loading-fade"), r.setAttribute("data-flow-loading-directive", "");
      let c = null;
      o(() => {
        if (s.isLoading)
          t.style.display = "flex", a && (t.classList.remove("flow-loading-fade-out"), c && (t.removeEventListener("transitionend", c), c = null));
        else if (a) {
          c && t.removeEventListener("transitionend", c), t.classList.add("flow-loading-fade-out");
          const h = () => {
            t.style.display = "none", t.removeEventListener("transitionend", h), c = null;
          };
          c = h, t.addEventListener("transitionend", h);
        } else
          t.style.display = "none";
      }), i(() => {
        c && (t.removeEventListener("transitionend", c), c = null), r.removeAttribute("data-flow-loading-directive"), t.style.display = "", t.classList.remove("flow-loading-overlay", "flow-loading-fade", "flow-loading-fade-out");
      });
    }
  );
}
function Uh(e) {
  e.directive(
    "flow-edge-toolbar",
    (t, { expression: n, modifiers: o }, { evaluate: i, effect: r, cleanup: s }) => {
      const l = t.closest("[data-flow-edge-id]");
      if (!l) return;
      const a = l.dataset.flowEdgeId, c = t.closest("[data-flow-canvas]");
      if (!c) return;
      const u = e.$data(c);
      if (!u) return;
      const h = c.querySelector(".flow-viewport");
      if (!h) return;
      try {
        const w = i("edge");
        w && e.addScopeToNode(t, { edge: w });
      } catch {
      }
      h.appendChild(t), t.classList.add("flow-edge-toolbar"), t.style.position = "absolute";
      const d = (w) => {
        w.stopPropagation();
      }, f = (w) => {
        w.stopPropagation();
      };
      t.addEventListener("pointerdown", d), t.addEventListener("click", f);
      const g = o.includes("below"), m = 20;
      r(() => {
        if (!u.edges.some((S) => S.id === a)) {
          t.removeEventListener("pointerdown", d), t.removeEventListener("click", f), t.classList.remove("flow-edge-toolbar"), t.remove();
          return;
        }
        const w = u.viewport?.zoom || 1, y = parseInt(t.getAttribute("data-flow-offset") ?? String(m), 10);
        let M = 0.5;
        if (n) {
          const S = i(n);
          typeof S == "number" && (M = S);
        }
        const L = l.querySelectorAll("path"), b = L.length > 1 ? L[1] : L[0];
        if (!b) return;
        const D = b.getTotalLength?.();
        if (!D) return;
        const k = b.getPointAtLength(D * Math.max(0, Math.min(1, M))), A = y / w, _ = g ? A : -A;
        t.style.left = `${k.x}px`, t.style.top = `${k.y + _}px`, t.style.transformOrigin = "0 0", t.style.transform = `scale(${1 / w}) translate(-50%, ${g ? "0%" : "-100%"})`;
      }), s(() => {
        t.removeEventListener("pointerdown", d), t.removeEventListener("click", f), t.classList.remove("flow-edge-toolbar"), t.remove();
      });
    }
  );
}
function jh(e) {
  e.magic("flow", (t) => {
    const n = t.closest("[data-flow-canvas]");
    return n ? e.$data(n) : (console.warn("[alpinejs-flow] $flow used outside of a flowCanvas context"), {});
  });
}
function Zh(e) {
  e.store("flow", {
    instances: {},
    activeId: null,
    register(t, n) {
      this.instances[t] = n;
    },
    unregister(t) {
      this.activeId === t && (this.activeId = null), delete this.instances[t];
    },
    get(t) {
      return this.instances[t] ?? null;
    },
    activate(t) {
      if (this.activeId === t) return;
      if (this.activeId) {
        const o = this.instances[this.activeId];
        o && (o._active = !1, o._container?.classList.remove("flow-canvas-active"));
      }
      this.activeId = t;
      const n = this.instances[t];
      n && (n._active = !0, n._container?.classList.add("flow-canvas-active"));
    }
  });
}
function ip(e, t, n) {
  const o = n?.defaultDimensions?.width ?? ye, i = n?.defaultDimensions?.height ?? we, r = n?.padding ?? 20, s = n?.flowId ?? "ssr", a = e.filter((y) => !y.hidden).map((y) => ({
    ...y,
    dimensions: {
      width: y.dimensions?.width ?? o,
      height: y.dimensions?.height ?? i
    }
  })), c = /* @__PURE__ */ new Map();
  for (const y of a)
    c.set(y.id, y);
  const u = a.map((y) => ({
    id: y.id,
    x: y.position.x,
    y: y.position.y,
    width: y.dimensions.width,
    height: y.dimensions.height,
    ...y.class ? { class: y.class } : {},
    ...y.style ? {
      style: typeof y.style == "string" ? y.style : Object.entries(y.style).map(([M, L]) => `${M}:${L}`).join(";")
    } : {},
    data: y.data ?? {}
  })), h = t.filter((y) => !y.hidden), d = [], f = /* @__PURE__ */ new Map();
  for (const y of h) {
    const M = c.get(y.source), L = c.get(y.target);
    if (!M || !L)
      continue;
    let b, D;
    try {
      const $ = Rn(
        y,
        M,
        L,
        M.sourcePosition ?? "bottom",
        L.targetPosition ?? "top"
      );
      b = $.path, D = $.labelPosition;
    } catch {
      continue;
    }
    let k, A;
    if (y.markerStart) {
      const $ = Kt(y.markerStart), v = Gt($, s);
      f.has(v) || f.set(v, In($, v)), k = `url(#${v})`;
    }
    if (y.markerEnd) {
      const $ = Kt(y.markerEnd), v = Gt($, s);
      f.has(v) || f.set(v, In($, v)), A = `url(#${v})`;
    }
    let _, S;
    if (y.label)
      if (D)
        _ = D.x, S = D.y;
      else {
        const $ = M.position.x + M.dimensions.width / 2, v = M.position.y + M.dimensions.height / 2, p = L.position.x + L.dimensions.width / 2, H = L.position.y + L.dimensions.height / 2;
        _ = ($ + p) / 2, S = (v + H) / 2;
      }
    d.push({
      id: y.id,
      source: y.source,
      target: y.target,
      pathD: b,
      ...k ? { markerStart: k } : {},
      ...A ? { markerEnd: A } : {},
      ...y.class ? { class: y.class } : {},
      ...y.label ? { label: y.label } : {},
      ..._ !== void 0 ? { labelX: _ } : {},
      ...S !== void 0 ? { labelY: S } : {}
    });
  }
  const g = Array.from(f.values()).join(`
`);
  let m, w;
  if (a.length === 0)
    m = { x: 0, y: 0, width: 0, height: 0 }, w = { x: 0, y: 0, zoom: 1 };
  else {
    const y = kt(a);
    m = {
      x: y.x - r,
      y: y.y - r,
      width: y.width + r * 2,
      height: y.height + r * 2
    }, w = {
      x: -m.x,
      y: -m.y,
      zoom: 1
    };
  }
  return {
    nodes: u,
    edges: d,
    markers: g,
    viewBox: m,
    viewport: w
  };
}
const Xi = /* @__PURE__ */ new WeakSet();
function sp(e) {
  Xi.has(e) || (Xi.add(e), ur(e), Zh(e), If(e), qf(e), jd(e), Od(e), Vd(e), Xd(e), Mf(e), jf(e), Jf(e), Qf(e), th(e), nh(e), gh(e), ph(e), wh(e), _h(e), Eh(e), Ch(e), Sh(e), Lh(e), Mh(e), Ih(e), Dh(e), Rh(e), Fh(e), qh(e), Wh(e), Uh(e), jh(e));
}
function Kh(e) {
  return e.replace(/\s+(?:@|:|x-)[\w.:-]*="[^"]*"/g, "").replace(/\s+externalResourcesRequired="[^"]*"/g, "");
}
function Gh(e, t, n, o) {
  return new Promise((i, r) => {
    const s = new Image();
    s.onload = () => {
      const l = document.createElement("canvas");
      l.width = t, l.height = n;
      const a = l.getContext("2d");
      a.fillStyle = o, a.fillRect(0, 0, t, n), a.drawImage(s, 0, 0), i(l.toDataURL("image/png"));
    }, s.onerror = () => {
      r(new Error("Failed to render SVG to image"));
    }, s.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(e);
  });
}
async function Jh(e, t, n, o, i = {}) {
  let r;
  try {
    ({ toSvg: r } = await Promise.resolve().then(() => Zg));
  } catch {
    throw new Error("toImage() requires html-to-image. Install it with: npm install html-to-image");
  }
  const s = i.scope ?? "all", l = e.getBoundingClientRect(), a = s === "viewport" ? l.width : i.width ?? 1920, c = s === "viewport" ? l.height : i.height ?? 1080, u = i.background ?? (getComputedStyle(e).getPropertyValue("--flow-bg-color").trim() || "#ffffff"), h = t.style.transform, d = t.style.width, f = t.style.height, g = e.style.width, m = e.style.height, w = e.style.overflow, y = [];
  try {
    if (s === "all") {
      const $ = e.querySelectorAll("[data-flow-culled]");
      for (const N of $)
        N.style.display = "", y.push(N);
      const v = n.filter((N) => !N.hidden), p = kt(v), H = i.padding ?? 0.1, E = Tn(
        p,
        a,
        c,
        0.1,
        // minZoom
        2,
        // maxZoom
        H
      );
      t.style.transform = `translate(${E.x}px, ${E.y}px) scale(${E.zoom})`, t.style.width = `${a}px`, t.style.height = `${c}px`;
    }
    e.style.width = `${a}px`, e.style.height = `${c}px`, e.style.overflow = "hidden", await new Promise(($) => requestAnimationFrame($));
    const M = i.includeOverlays, L = M === !0, b = typeof M == "object" ? M : {}, D = [
      ["canvas-overlay", L || (b.toolbar ?? !1)],
      ["flow-minimap", L || (b.minimap ?? !1)],
      ["flow-controls", L || (b.controls ?? !1)],
      ["flow-panel", L || (b.panels ?? !1)],
      ["flow-selection-box", !1]
    ], k = await r(e, {
      width: a,
      height: c,
      skipFonts: !0,
      filter: ($) => {
        if ($.classList) {
          for (const [v, p] of D)
            if ($.classList.contains(v) && !p) return !1;
        }
        return !0;
      }
    }), _ = Kh(decodeURIComponent(k.substring("data:image/svg+xml;charset=utf-8,".length))), S = await Gh(_, a, c, u);
    if (i.filename) {
      const $ = document.createElement("a");
      $.download = i.filename, $.href = S, $.click();
    }
    return S;
  } finally {
    t.style.transform = h, t.style.width = d, t.style.height = f, e.style.width = g, e.style.height = m, e.style.overflow = w;
    for (const M of y)
      M.style.display = "none";
  }
}
const Qh = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  captureFlowImage: Jh
}, Symbol.toStringTag, { value: "Module" }));
function eg(e, t) {
  if (e.match(/^[a-z]+:\/\//i))
    return e;
  if (e.match(/^\/\//))
    return window.location.protocol + e;
  if (e.match(/^[a-z]+:/i))
    return e;
  const n = document.implementation.createHTMLDocument(), o = n.createElement("base"), i = n.createElement("a");
  return n.head.appendChild(o), n.body.appendChild(i), t && (o.href = t), i.href = e, i.href;
}
const tg = /* @__PURE__ */ (() => {
  let e = 0;
  const t = () => (
    // eslint-disable-next-line no-bitwise
    `0000${(Math.random() * 36 ** 4 << 0).toString(36)}`.slice(-4)
  );
  return () => (e += 1, `u${t()}${e}`);
})();
function rt(e) {
  const t = [];
  for (let n = 0, o = e.length; n < o; n++)
    t.push(e[n]);
  return t;
}
let wt = null;
function er(e = {}) {
  return wt || (e.includeStyleProperties ? (wt = e.includeStyleProperties, wt) : (wt = rt(window.getComputedStyle(document.documentElement)), wt));
}
function Fn(e, t) {
  const o = (e.ownerDocument.defaultView || window).getComputedStyle(e).getPropertyValue(t);
  return o ? parseFloat(o.replace("px", "")) : 0;
}
function ng(e) {
  const t = Fn(e, "border-left-width"), n = Fn(e, "border-right-width");
  return e.clientWidth + t + n;
}
function og(e) {
  const t = Fn(e, "border-top-width"), n = Fn(e, "border-bottom-width");
  return e.clientHeight + t + n;
}
function qo(e, t = {}) {
  const n = t.width || ng(e), o = t.height || og(e);
  return { width: n, height: o };
}
function ig() {
  let e, t;
  try {
    t = process;
  } catch {
  }
  const n = t && t.env ? t.env.devicePixelRatio : null;
  return n && (e = parseInt(n, 10), Number.isNaN(e) && (e = 1)), e || window.devicePixelRatio || 1;
}
const Pe = 16384;
function sg(e) {
  (e.width > Pe || e.height > Pe) && (e.width > Pe && e.height > Pe ? e.width > e.height ? (e.height *= Pe / e.width, e.width = Pe) : (e.width *= Pe / e.height, e.height = Pe) : e.width > Pe ? (e.height *= Pe / e.width, e.width = Pe) : (e.width *= Pe / e.height, e.height = Pe));
}
function rg(e, t = {}) {
  return e.toBlob ? new Promise((n) => {
    e.toBlob(n, t.type ? t.type : "image/png", t.quality ? t.quality : 1);
  }) : new Promise((n) => {
    const o = window.atob(e.toDataURL(t.type ? t.type : void 0, t.quality ? t.quality : void 0).split(",")[1]), i = o.length, r = new Uint8Array(i);
    for (let s = 0; s < i; s += 1)
      r[s] = o.charCodeAt(s);
    n(new Blob([r], {
      type: t.type ? t.type : "image/png"
    }));
  });
}
function On(e) {
  return new Promise((t, n) => {
    const o = new Image();
    o.onload = () => {
      o.decode().then(() => {
        requestAnimationFrame(() => t(o));
      });
    }, o.onerror = n, o.crossOrigin = "anonymous", o.decoding = "async", o.src = e;
  });
}
async function ag(e) {
  return Promise.resolve().then(() => new XMLSerializer().serializeToString(e)).then(encodeURIComponent).then((t) => `data:image/svg+xml;charset=utf-8,${t}`);
}
async function lg(e, t, n) {
  const o = "http://www.w3.org/2000/svg", i = document.createElementNS(o, "svg"), r = document.createElementNS(o, "foreignObject");
  return i.setAttribute("width", `${t}`), i.setAttribute("height", `${n}`), i.setAttribute("viewBox", `0 0 ${t} ${n}`), r.setAttribute("width", "100%"), r.setAttribute("height", "100%"), r.setAttribute("x", "0"), r.setAttribute("y", "0"), r.setAttribute("externalResourcesRequired", "true"), i.appendChild(r), r.appendChild(e), ag(i);
}
const Le = (e, t) => {
  if (e instanceof t)
    return !0;
  const n = Object.getPrototypeOf(e);
  return n === null ? !1 : n.constructor.name === t.name || Le(n, t);
};
function cg(e) {
  const t = e.getPropertyValue("content");
  return `${e.cssText} content: '${t.replace(/'|"/g, "")}';`;
}
function dg(e, t) {
  return er(t).map((n) => {
    const o = e.getPropertyValue(n), i = e.getPropertyPriority(n);
    return `${n}: ${o}${i ? " !important" : ""};`;
  }).join(" ");
}
function ug(e, t, n, o) {
  const i = `.${e}:${t}`, r = n.cssText ? cg(n) : dg(n, o);
  return document.createTextNode(`${i}{${r}}`);
}
function Yi(e, t, n, o) {
  const i = window.getComputedStyle(e, n), r = i.getPropertyValue("content");
  if (r === "" || r === "none")
    return;
  const s = tg();
  try {
    t.className = `${t.className} ${s}`;
  } catch {
    return;
  }
  const l = document.createElement("style");
  l.appendChild(ug(s, n, i, o)), t.appendChild(l);
}
function fg(e, t, n) {
  Yi(e, t, ":before", n), Yi(e, t, ":after", n);
}
const qi = "application/font-woff", Bi = "image/jpeg", hg = {
  woff: qi,
  woff2: qi,
  ttf: "application/font-truetype",
  eot: "application/vnd.ms-fontobject",
  png: "image/png",
  jpg: Bi,
  jpeg: Bi,
  gif: "image/gif",
  tiff: "image/tiff",
  svg: "image/svg+xml",
  webp: "image/webp"
};
function gg(e) {
  const t = /\.([^./]*?)$/g.exec(e);
  return t ? t[1] : "";
}
function Bo(e) {
  const t = gg(e).toLowerCase();
  return hg[t] || "";
}
function pg(e) {
  return e.split(/,/)[1];
}
function Po(e) {
  return e.search(/^(data:)/) !== -1;
}
function mg(e, t) {
  return `data:${t};base64,${e}`;
}
async function tr(e, t, n) {
  const o = await fetch(e, t);
  if (o.status === 404)
    throw new Error(`Resource "${o.url}" not found`);
  const i = await o.blob();
  return new Promise((r, s) => {
    const l = new FileReader();
    l.onerror = s, l.onloadend = () => {
      try {
        r(n({ res: o, result: l.result }));
      } catch (a) {
        s(a);
      }
    }, l.readAsDataURL(i);
  });
}
const lo = {};
function yg(e, t, n) {
  let o = e.replace(/\?.*/, "");
  return n && (o = e), /ttf|otf|eot|woff2?/i.test(o) && (o = o.replace(/.*\//, "")), t ? `[${t}]${o}` : o;
}
async function Wo(e, t, n) {
  const o = yg(e, t, n.includeQueryParams);
  if (lo[o] != null)
    return lo[o];
  n.cacheBust && (e += (/\?/.test(e) ? "&" : "?") + (/* @__PURE__ */ new Date()).getTime());
  let i;
  try {
    const r = await tr(e, n.fetchRequestInit, ({ res: s, result: l }) => (t || (t = s.headers.get("Content-Type") || ""), pg(l)));
    i = mg(r, t);
  } catch (r) {
    i = n.imagePlaceholder || "";
    let s = `Failed to fetch resource: ${e}`;
    r && (s = typeof r == "string" ? r : r.message), s && console.warn(s);
  }
  return lo[o] = i, i;
}
async function wg(e) {
  const t = e.toDataURL();
  return t === "data:," ? e.cloneNode(!1) : On(t);
}
async function vg(e, t) {
  if (e.currentSrc) {
    const r = document.createElement("canvas"), s = r.getContext("2d");
    r.width = e.clientWidth, r.height = e.clientHeight, s?.drawImage(e, 0, 0, r.width, r.height);
    const l = r.toDataURL();
    return On(l);
  }
  const n = e.poster, o = Bo(n), i = await Wo(n, o, t);
  return On(i);
}
async function _g(e, t) {
  var n;
  try {
    if (!((n = e?.contentDocument) === null || n === void 0) && n.body)
      return await Un(e.contentDocument.body, t, !0);
  } catch {
  }
  return e.cloneNode(!1);
}
async function bg(e, t) {
  return Le(e, HTMLCanvasElement) ? wg(e) : Le(e, HTMLVideoElement) ? vg(e, t) : Le(e, HTMLIFrameElement) ? _g(e, t) : e.cloneNode(nr(e));
}
const xg = (e) => e.tagName != null && e.tagName.toUpperCase() === "SLOT", nr = (e) => e.tagName != null && e.tagName.toUpperCase() === "SVG";
async function Eg(e, t, n) {
  var o, i;
  if (nr(t))
    return t;
  let r = [];
  return xg(e) && e.assignedNodes ? r = rt(e.assignedNodes()) : Le(e, HTMLIFrameElement) && (!((o = e.contentDocument) === null || o === void 0) && o.body) ? r = rt(e.contentDocument.body.childNodes) : r = rt(((i = e.shadowRoot) !== null && i !== void 0 ? i : e).childNodes), r.length === 0 || Le(e, HTMLVideoElement) || await r.reduce((s, l) => s.then(() => Un(l, n)).then((a) => {
    a && t.appendChild(a);
  }), Promise.resolve()), t;
}
function Cg(e, t, n) {
  const o = t.style;
  if (!o)
    return;
  const i = window.getComputedStyle(e);
  i.cssText ? (o.cssText = i.cssText, o.transformOrigin = i.transformOrigin) : er(n).forEach((r) => {
    let s = i.getPropertyValue(r);
    r === "font-size" && s.endsWith("px") && (s = `${Math.floor(parseFloat(s.substring(0, s.length - 2))) - 0.1}px`), Le(e, HTMLIFrameElement) && r === "display" && s === "inline" && (s = "block"), r === "d" && t.getAttribute("d") && (s = `path(${t.getAttribute("d")})`), o.setProperty(r, s, i.getPropertyPriority(r));
  });
}
function Sg(e, t) {
  Le(e, HTMLTextAreaElement) && (t.innerHTML = e.value), Le(e, HTMLInputElement) && t.setAttribute("value", e.value);
}
function Lg(e, t) {
  if (Le(e, HTMLSelectElement)) {
    const o = Array.from(t.children).find((i) => e.value === i.getAttribute("value"));
    o && o.setAttribute("selected", "");
  }
}
function Mg(e, t, n) {
  return Le(t, Element) && (Cg(e, t, n), fg(e, t, n), Sg(e, t), Lg(e, t)), t;
}
async function Pg(e, t) {
  const n = e.querySelectorAll ? e.querySelectorAll("use") : [];
  if (n.length === 0)
    return e;
  const o = {};
  for (let r = 0; r < n.length; r++) {
    const l = n[r].getAttribute("xlink:href");
    if (l) {
      const a = e.querySelector(l), c = document.querySelector(l);
      !a && c && !o[l] && (o[l] = await Un(c, t, !0));
    }
  }
  const i = Object.values(o);
  if (i.length) {
    const r = "http://www.w3.org/1999/xhtml", s = document.createElementNS(r, "svg");
    s.setAttribute("xmlns", r), s.style.position = "absolute", s.style.width = "0", s.style.height = "0", s.style.overflow = "hidden", s.style.display = "none";
    const l = document.createElementNS(r, "defs");
    s.appendChild(l);
    for (let a = 0; a < i.length; a++)
      l.appendChild(i[a]);
    e.appendChild(s);
  }
  return e;
}
async function Un(e, t, n) {
  return !n && t.filter && !t.filter(e) ? null : Promise.resolve(e).then((o) => bg(o, t)).then((o) => Eg(e, o, t)).then((o) => Mg(e, o, t)).then((o) => Pg(o, t));
}
const or = /url\((['"]?)([^'"]+?)\1\)/g, kg = /url\([^)]+\)\s*format\((["']?)([^"']+)\1\)/g, Ng = /src:\s*(?:url\([^)]+\)\s*format\([^)]+\)[,;]\s*)+/g;
function Tg(e) {
  const t = e.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1");
  return new RegExp(`(url\\(['"]?)(${t})(['"]?\\))`, "g");
}
function Ig(e) {
  const t = [];
  return e.replace(or, (n, o, i) => (t.push(i), n)), t.filter((n) => !Po(n));
}
async function $g(e, t, n, o, i) {
  try {
    const r = n ? eg(t, n) : t, s = Bo(t);
    let l;
    return i || (l = await Wo(r, s, o)), e.replace(Tg(t), `$1${l}$3`);
  } catch {
  }
  return e;
}
function Ag(e, { preferredFontFormat: t }) {
  return t ? e.replace(Ng, (n) => {
    for (; ; ) {
      const [o, , i] = kg.exec(n) || [];
      if (!i)
        return "";
      if (i === t)
        return `src: ${o};`;
    }
  }) : e;
}
function ir(e) {
  return e.search(or) !== -1;
}
async function sr(e, t, n) {
  if (!ir(e))
    return e;
  const o = Ag(e, n);
  return Ig(o).reduce((r, s) => r.then((l) => $g(l, s, t, n)), Promise.resolve(o));
}
async function vt(e, t, n) {
  var o;
  const i = (o = t.style) === null || o === void 0 ? void 0 : o.getPropertyValue(e);
  if (i) {
    const r = await sr(i, null, n);
    return t.style.setProperty(e, r, t.style.getPropertyPriority(e)), !0;
  }
  return !1;
}
async function Dg(e, t) {
  await vt("background", e, t) || await vt("background-image", e, t), await vt("mask", e, t) || await vt("-webkit-mask", e, t) || await vt("mask-image", e, t) || await vt("-webkit-mask-image", e, t);
}
async function Hg(e, t) {
  const n = Le(e, HTMLImageElement);
  if (!(n && !Po(e.src)) && !(Le(e, SVGImageElement) && !Po(e.href.baseVal)))
    return;
  const o = n ? e.src : e.href.baseVal, i = await Wo(o, Bo(o), t);
  await new Promise((r, s) => {
    e.onload = r, e.onerror = t.onImageErrorHandler ? (...a) => {
      try {
        r(t.onImageErrorHandler(...a));
      } catch (c) {
        s(c);
      }
    } : s;
    const l = e;
    l.decode && (l.decode = r), l.loading === "lazy" && (l.loading = "eager"), n ? (e.srcset = "", e.src = i) : e.href.baseVal = i;
  });
}
async function Rg(e, t) {
  const o = rt(e.childNodes).map((i) => rr(i, t));
  await Promise.all(o).then(() => e);
}
async function rr(e, t) {
  Le(e, Element) && (await Dg(e, t), await Hg(e, t), await Rg(e, t));
}
function zg(e, t) {
  const { style: n } = e;
  t.backgroundColor && (n.backgroundColor = t.backgroundColor), t.width && (n.width = `${t.width}px`), t.height && (n.height = `${t.height}px`);
  const o = t.style;
  return o != null && Object.keys(o).forEach((i) => {
    n[i] = o[i];
  }), e;
}
const Wi = {};
async function Ui(e) {
  let t = Wi[e];
  if (t != null)
    return t;
  const o = await (await fetch(e)).text();
  return t = { url: e, cssText: o }, Wi[e] = t, t;
}
async function ji(e, t) {
  let n = e.cssText;
  const o = /url\(["']?([^"')]+)["']?\)/g, r = (n.match(/url\([^)]+\)/g) || []).map(async (s) => {
    let l = s.replace(o, "$1");
    return l.startsWith("https://") || (l = new URL(l, e.url).href), tr(l, t.fetchRequestInit, ({ result: a }) => (n = n.replace(s, `url(${a})`), [s, a]));
  });
  return Promise.all(r).then(() => n);
}
function Zi(e) {
  if (e == null)
    return [];
  const t = [], n = /(\/\*[\s\S]*?\*\/)/gi;
  let o = e.replace(n, "");
  const i = new RegExp("((@.*?keyframes [\\s\\S]*?){([\\s\\S]*?}\\s*?)})", "gi");
  for (; ; ) {
    const a = i.exec(o);
    if (a === null)
      break;
    t.push(a[0]);
  }
  o = o.replace(i, "");
  const r = /@import[\s\S]*?url\([^)]*\)[\s\S]*?;/gi, s = "((\\s*?(?:\\/\\*[\\s\\S]*?\\*\\/)?\\s*?@media[\\s\\S]*?){([\\s\\S]*?)}\\s*?})|(([\\s\\S]*?){([\\s\\S]*?)})", l = new RegExp(s, "gi");
  for (; ; ) {
    let a = r.exec(o);
    if (a === null) {
      if (a = l.exec(o), a === null)
        break;
      r.lastIndex = l.lastIndex;
    } else
      l.lastIndex = r.lastIndex;
    t.push(a[0]);
  }
  return t;
}
async function Fg(e, t) {
  const n = [], o = [];
  return e.forEach((i) => {
    if ("cssRules" in i)
      try {
        rt(i.cssRules || []).forEach((r, s) => {
          if (r.type === CSSRule.IMPORT_RULE) {
            let l = s + 1;
            const a = r.href, c = Ui(a).then((u) => ji(u, t)).then((u) => Zi(u).forEach((h) => {
              try {
                i.insertRule(h, h.startsWith("@import") ? l += 1 : i.cssRules.length);
              } catch (d) {
                console.error("Error inserting rule from remote css", {
                  rule: h,
                  error: d
                });
              }
            })).catch((u) => {
              console.error("Error loading remote css", u.toString());
            });
            o.push(c);
          }
        });
      } catch (r) {
        const s = e.find((l) => l.href == null) || document.styleSheets[0];
        i.href != null && o.push(Ui(i.href).then((l) => ji(l, t)).then((l) => Zi(l).forEach((a) => {
          s.insertRule(a, s.cssRules.length);
        })).catch((l) => {
          console.error("Error loading remote stylesheet", l);
        })), console.error("Error inlining remote css file", r);
      }
  }), Promise.all(o).then(() => (e.forEach((i) => {
    if ("cssRules" in i)
      try {
        rt(i.cssRules || []).forEach((r) => {
          n.push(r);
        });
      } catch (r) {
        console.error(`Error while reading CSS rules from ${i.href}`, r);
      }
  }), n));
}
function Og(e) {
  return e.filter((t) => t.type === CSSRule.FONT_FACE_RULE).filter((t) => ir(t.style.getPropertyValue("src")));
}
async function Vg(e, t) {
  if (e.ownerDocument == null)
    throw new Error("Provided element is not within a Document");
  const n = rt(e.ownerDocument.styleSheets), o = await Fg(n, t);
  return Og(o);
}
function ar(e) {
  return e.trim().replace(/["']/g, "");
}
function Xg(e) {
  const t = /* @__PURE__ */ new Set();
  function n(o) {
    (o.style.fontFamily || getComputedStyle(o).fontFamily).split(",").forEach((r) => {
      t.add(ar(r));
    }), Array.from(o.children).forEach((r) => {
      r instanceof HTMLElement && n(r);
    });
  }
  return n(e), t;
}
async function lr(e, t) {
  const n = await Vg(e, t), o = Xg(e);
  return (await Promise.all(n.filter((r) => o.has(ar(r.style.fontFamily))).map((r) => {
    const s = r.parentStyleSheet ? r.parentStyleSheet.href : null;
    return sr(r.cssText, s, t);
  }))).join(`
`);
}
async function Yg(e, t) {
  const n = t.fontEmbedCSS != null ? t.fontEmbedCSS : t.skipFonts ? null : await lr(e, t);
  if (n) {
    const o = document.createElement("style"), i = document.createTextNode(n);
    o.appendChild(i), e.firstChild ? e.insertBefore(o, e.firstChild) : e.appendChild(o);
  }
}
async function cr(e, t = {}) {
  const { width: n, height: o } = qo(e, t), i = await Un(e, t, !0);
  return await Yg(i, t), await rr(i, t), zg(i, t), await lg(i, n, o);
}
async function sn(e, t = {}) {
  const { width: n, height: o } = qo(e, t), i = await cr(e, t), r = await On(i), s = document.createElement("canvas"), l = s.getContext("2d"), a = t.pixelRatio || ig(), c = t.canvasWidth || n, u = t.canvasHeight || o;
  return s.width = c * a, s.height = u * a, t.skipAutoScale || sg(s), s.style.width = `${c}`, s.style.height = `${u}`, t.backgroundColor && (l.fillStyle = t.backgroundColor, l.fillRect(0, 0, s.width, s.height)), l.drawImage(r, 0, 0, s.width, s.height), s;
}
async function qg(e, t = {}) {
  const { width: n, height: o } = qo(e, t);
  return (await sn(e, t)).getContext("2d").getImageData(0, 0, n, o).data;
}
async function Bg(e, t = {}) {
  return (await sn(e, t)).toDataURL();
}
async function Wg(e, t = {}) {
  return (await sn(e, t)).toDataURL("image/jpeg", t.quality || 1);
}
async function Ug(e, t = {}) {
  const n = await sn(e, t);
  return await rg(n);
}
async function jg(e, t = {}) {
  return lr(e, t);
}
const Zg = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getFontEmbedCSS: jg,
  toBlob: Ug,
  toCanvas: sn,
  toJpeg: Wg,
  toPixelData: qg,
  toPng: Bg,
  toSvg: cr
}, Symbol.toStringTag, { value: "Module" }));
export {
  du as ComputeEngine,
  hd as FlowHistory,
  Ei as SHORTCUT_DEFAULTS,
  Qg as along,
  zd as areNodesConnected,
  Ds as buildNodeMap,
  Rs as clampToExtent,
  eo as clampToParent,
  ip as computeRenderPlan,
  Mi as computeValidationErrors,
  Hs as computeZIndex,
  sp as default,
  tp as drift,
  Gd as expandParentToFitChild,
  So as getAbsolutePosition,
  Ud as getAutoPanDelta,
  $n as getBezierPath,
  Dd as getConnectedEdges,
  it as getDescendantIds,
  Hi as getEdgePosition,
  Us as getFloatingEdgeParams,
  Hd as getIncomers,
  Di as getNodeIntersection,
  kt as getNodesBounds,
  Ad as getNodesFullyInPolygon,
  ld as getNodesFullyInRect,
  $d as getNodesInPolygon,
  ad as getNodesInRect,
  Eo as getOutgoers,
  Kg as getSimpleBezierPath,
  op as getSimpleFloatingPosition,
  Qt as getSmoothStepPath,
  Wd as getStepPath,
  $s as getStraightPath,
  Tn as getViewportForBounds,
  et as isConnectable,
  Yd as isDeletable,
  Is as isDraggable,
  bi as isResizable,
  Co as isSelectable,
  Re as matchesKey,
  ot as matchesModifier,
  Gg as orbit,
  ep as pendulum,
  Oo as pointInPolygon,
  Id as polygonIntersectsAABB,
  _d as registerMarker,
  Yt as resolveChildValidation,
  Zd as resolveShortcuts,
  st as sortNodesTopological,
  np as stagger,
  St as toAbsoluteNode,
  Dn as toAbsoluteNodes,
  Os as validateChildAdd,
  Hn as validateChildRemove,
  Jg as wave
};
//# sourceMappingURL=alpineflow.bundle.esm.js.map
