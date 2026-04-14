let _o = null;
function Ur(t) {
  _o = t;
}
function Se() {
  if (!_o)
    throw new Error("[AlpineFlow] Alpine not initialized. Ensure Alpine.plugin(AlpineFlow) was called.");
  return _o;
}
var Zr = { value: () => {
} };
function Kn() {
  for (var t = 0, e = arguments.length, n = {}, o; t < e; ++t) {
    if (!(o = arguments[t] + "") || o in n || /[\s.]/.test(o)) throw new Error("illegal type: " + o);
    n[o] = [];
  }
  return new Cn(n);
}
function Cn(t) {
  this._ = t;
}
function Gr(t, e) {
  return t.trim().split(/^|\s+/).map(function(n) {
    var o = "", i = n.indexOf(".");
    if (i >= 0 && (o = n.slice(i + 1), n = n.slice(0, i)), n && !e.hasOwnProperty(n)) throw new Error("unknown type: " + n);
    return { type: n, name: o };
  });
}
Cn.prototype = Kn.prototype = {
  constructor: Cn,
  on: function(t, e) {
    var n = this._, o = Gr(t + "", n), i, r = -1, s = o.length;
    if (arguments.length < 2) {
      for (; ++r < s; ) if ((i = (t = o[r]).type) && (i = Kr(n[i], t.name))) return i;
      return;
    }
    if (e != null && typeof e != "function") throw new Error("invalid callback: " + e);
    for (; ++r < s; )
      if (i = (t = o[r]).type) n[i] = pi(n[i], t.name, e);
      else if (e == null) for (i in n) n[i] = pi(n[i], t.name, null);
    return this;
  },
  copy: function() {
    var t = {}, e = this._;
    for (var n in e) t[n] = e[n].slice();
    return new Cn(t);
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
function Kr(t, e) {
  for (var n = 0, o = t.length, i; n < o; ++n)
    if ((i = t[n]).name === e)
      return i.value;
}
function pi(t, e, n) {
  for (var o = 0, i = t.length; o < i; ++o)
    if (t[o].name === e) {
      t[o] = Zr, t = t.slice(0, o).concat(t.slice(o + 1));
      break;
    }
  return n != null && t.push({ name: e, value: n }), t;
}
var bo = "http://www.w3.org/1999/xhtml";
const gi = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: bo,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function Jn(t) {
  var e = t += "", n = e.indexOf(":");
  return n >= 0 && (e = t.slice(0, n)) !== "xmlns" && (t = t.slice(n + 1)), gi.hasOwnProperty(e) ? { space: gi[e], local: t } : t;
}
function Jr(t) {
  return function() {
    var e = this.ownerDocument, n = this.namespaceURI;
    return n === bo && e.documentElement.namespaceURI === bo ? e.createElement(t) : e.createElementNS(n, t);
  };
}
function Qr(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function xs(t) {
  var e = Jn(t);
  return (e.local ? Qr : Jr)(e);
}
function ea() {
}
function Bo(t) {
  return t == null ? ea : function() {
    return this.querySelector(t);
  };
}
function ta(t) {
  typeof t != "function" && (t = Bo(t));
  for (var e = this._groups, n = e.length, o = new Array(n), i = 0; i < n; ++i)
    for (var r = e[i], s = r.length, l = o[i] = new Array(s), a, c, d = 0; d < s; ++d)
      (a = r[d]) && (c = t.call(a, a.__data__, d, r)) && ("__data__" in a && (c.__data__ = a.__data__), l[d] = c);
  return new Ie(o, this._parents);
}
function na(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function oa() {
  return [];
}
function Es(t) {
  return t == null ? oa : function() {
    return this.querySelectorAll(t);
  };
}
function ia(t) {
  return function() {
    return na(t.apply(this, arguments));
  };
}
function sa(t) {
  typeof t == "function" ? t = ia(t) : t = Es(t);
  for (var e = this._groups, n = e.length, o = [], i = [], r = 0; r < n; ++r)
    for (var s = e[r], l = s.length, a, c = 0; c < l; ++c)
      (a = s[c]) && (o.push(t.call(a, a.__data__, c, s)), i.push(a));
  return new Ie(o, i);
}
function Ss(t) {
  return function() {
    return this.matches(t);
  };
}
function Cs(t) {
  return function(e) {
    return e.matches(t);
  };
}
var ra = Array.prototype.find;
function aa(t) {
  return function() {
    return ra.call(this.children, t);
  };
}
function la() {
  return this.firstElementChild;
}
function ca(t) {
  return this.select(t == null ? la : aa(typeof t == "function" ? t : Cs(t)));
}
var da = Array.prototype.filter;
function ua() {
  return Array.from(this.children);
}
function fa(t) {
  return function() {
    return da.call(this.children, t);
  };
}
function ha(t) {
  return this.selectAll(t == null ? ua : fa(typeof t == "function" ? t : Cs(t)));
}
function pa(t) {
  typeof t != "function" && (t = Ss(t));
  for (var e = this._groups, n = e.length, o = new Array(n), i = 0; i < n; ++i)
    for (var r = e[i], s = r.length, l = o[i] = [], a, c = 0; c < s; ++c)
      (a = r[c]) && t.call(a, a.__data__, c, r) && l.push(a);
  return new Ie(o, this._parents);
}
function Ps(t) {
  return new Array(t.length);
}
function ga() {
  return new Ie(this._enter || this._groups.map(Ps), this._parents);
}
function An(t, e) {
  this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = e;
}
An.prototype = {
  constructor: An,
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
function ma(t) {
  return function() {
    return t;
  };
}
function ya(t, e, n, o, i, r) {
  for (var s = 0, l, a = e.length, c = r.length; s < c; ++s)
    (l = e[s]) ? (l.__data__ = r[s], o[s] = l) : n[s] = new An(t, r[s]);
  for (; s < a; ++s)
    (l = e[s]) && (i[s] = l);
}
function wa(t, e, n, o, i, r, s) {
  var l, a, c = /* @__PURE__ */ new Map(), d = e.length, f = r.length, u = new Array(d), h;
  for (l = 0; l < d; ++l)
    (a = e[l]) && (u[l] = h = s.call(a, a.__data__, l, e) + "", c.has(h) ? i[l] = a : c.set(h, a));
  for (l = 0; l < f; ++l)
    h = s.call(t, r[l], l, r) + "", (a = c.get(h)) ? (o[l] = a, a.__data__ = r[l], c.delete(h)) : n[l] = new An(t, r[l]);
  for (l = 0; l < d; ++l)
    (a = e[l]) && c.get(u[l]) === a && (i[l] = a);
}
function va(t) {
  return t.__data__;
}
function _a(t, e) {
  if (!arguments.length) return Array.from(this, va);
  var n = e ? wa : ya, o = this._parents, i = this._groups;
  typeof t != "function" && (t = ma(t));
  for (var r = i.length, s = new Array(r), l = new Array(r), a = new Array(r), c = 0; c < r; ++c) {
    var d = o[c], f = i[c], u = f.length, h = ba(t.call(d, d && d.__data__, c, o)), p = h.length, g = l[c] = new Array(p), w = s[c] = new Array(p), m = a[c] = new Array(u);
    n(d, f, g, w, m, h, e);
    for (var E = 0, C = 0, b, D; E < p; ++E)
      if (b = g[E]) {
        for (E >= C && (C = E + 1); !(D = w[C]) && ++C < p; ) ;
        b._next = D || null;
      }
  }
  return s = new Ie(s, o), s._enter = l, s._exit = a, s;
}
function ba(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function xa() {
  return new Ie(this._exit || this._groups.map(Ps), this._parents);
}
function Ea(t, e, n) {
  var o = this.enter(), i = this, r = this.exit();
  return typeof t == "function" ? (o = t(o), o && (o = o.selection())) : o = o.append(t + ""), e != null && (i = e(i), i && (i = i.selection())), n == null ? r.remove() : n(r), o && i ? o.merge(i).order() : i;
}
function Sa(t) {
  for (var e = t.selection ? t.selection() : t, n = this._groups, o = e._groups, i = n.length, r = o.length, s = Math.min(i, r), l = new Array(i), a = 0; a < s; ++a)
    for (var c = n[a], d = o[a], f = c.length, u = l[a] = new Array(f), h, p = 0; p < f; ++p)
      (h = c[p] || d[p]) && (u[p] = h);
  for (; a < i; ++a)
    l[a] = n[a];
  return new Ie(l, this._parents);
}
function Ca() {
  for (var t = this._groups, e = -1, n = t.length; ++e < n; )
    for (var o = t[e], i = o.length - 1, r = o[i], s; --i >= 0; )
      (s = o[i]) && (r && s.compareDocumentPosition(r) ^ 4 && r.parentNode.insertBefore(s, r), r = s);
  return this;
}
function Pa(t) {
  t || (t = ka);
  function e(f, u) {
    return f && u ? t(f.__data__, u.__data__) : !f - !u;
  }
  for (var n = this._groups, o = n.length, i = new Array(o), r = 0; r < o; ++r) {
    for (var s = n[r], l = s.length, a = i[r] = new Array(l), c, d = 0; d < l; ++d)
      (c = s[d]) && (a[d] = c);
    a.sort(e);
  }
  return new Ie(i, this._parents).order();
}
function ka(t, e) {
  return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function La() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function Ma() {
  return Array.from(this);
}
function Ta() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var o = t[e], i = 0, r = o.length; i < r; ++i) {
      var s = o[i];
      if (s) return s;
    }
  return null;
}
function Aa() {
  let t = 0;
  for (const e of this) ++t;
  return t;
}
function Na() {
  return !this.node();
}
function Ia(t) {
  for (var e = this._groups, n = 0, o = e.length; n < o; ++n)
    for (var i = e[n], r = 0, s = i.length, l; r < s; ++r)
      (l = i[r]) && t.call(l, l.__data__, r, i);
  return this;
}
function $a(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function Da(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Ra(t, e) {
  return function() {
    this.setAttribute(t, e);
  };
}
function Ha(t, e) {
  return function() {
    this.setAttributeNS(t.space, t.local, e);
  };
}
function Fa(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttribute(t) : this.setAttribute(t, n);
  };
}
function za(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, n);
  };
}
function Oa(t, e) {
  var n = Jn(t);
  if (arguments.length < 2) {
    var o = this.node();
    return n.local ? o.getAttributeNS(n.space, n.local) : o.getAttribute(n);
  }
  return this.each((e == null ? n.local ? Da : $a : typeof e == "function" ? n.local ? za : Fa : n.local ? Ha : Ra)(n, e));
}
function ks(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function Va(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function Ba(t, e, n) {
  return function() {
    this.style.setProperty(t, e, n);
  };
}
function Xa(t, e, n) {
  return function() {
    var o = e.apply(this, arguments);
    o == null ? this.style.removeProperty(t) : this.style.setProperty(t, o, n);
  };
}
function Ya(t, e, n) {
  return arguments.length > 1 ? this.each((e == null ? Va : typeof e == "function" ? Xa : Ba)(t, e, n ?? "")) : Mt(this.node(), t);
}
function Mt(t, e) {
  return t.style.getPropertyValue(e) || ks(t).getComputedStyle(t, null).getPropertyValue(e);
}
function qa(t) {
  return function() {
    delete this[t];
  };
}
function Wa(t, e) {
  return function() {
    this[t] = e;
  };
}
function ja(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? delete this[t] : this[t] = n;
  };
}
function Ua(t, e) {
  return arguments.length > 1 ? this.each((e == null ? qa : typeof e == "function" ? ja : Wa)(t, e)) : this.node()[t];
}
function Ls(t) {
  return t.trim().split(/^|\s+/);
}
function Xo(t) {
  return t.classList || new Ms(t);
}
function Ms(t) {
  this._node = t, this._names = Ls(t.getAttribute("class") || "");
}
Ms.prototype = {
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
function Ts(t, e) {
  for (var n = Xo(t), o = -1, i = e.length; ++o < i; ) n.add(e[o]);
}
function As(t, e) {
  for (var n = Xo(t), o = -1, i = e.length; ++o < i; ) n.remove(e[o]);
}
function Za(t) {
  return function() {
    Ts(this, t);
  };
}
function Ga(t) {
  return function() {
    As(this, t);
  };
}
function Ka(t, e) {
  return function() {
    (e.apply(this, arguments) ? Ts : As)(this, t);
  };
}
function Ja(t, e) {
  var n = Ls(t + "");
  if (arguments.length < 2) {
    for (var o = Xo(this.node()), i = -1, r = n.length; ++i < r; ) if (!o.contains(n[i])) return !1;
    return !0;
  }
  return this.each((typeof e == "function" ? Ka : e ? Za : Ga)(n, e));
}
function Qa() {
  this.textContent = "";
}
function el(t) {
  return function() {
    this.textContent = t;
  };
}
function tl(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.textContent = e ?? "";
  };
}
function nl(t) {
  return arguments.length ? this.each(t == null ? Qa : (typeof t == "function" ? tl : el)(t)) : this.node().textContent;
}
function ol() {
  this.innerHTML = "";
}
function il(t) {
  return function() {
    this.innerHTML = t;
  };
}
function sl(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.innerHTML = e ?? "";
  };
}
function rl(t) {
  return arguments.length ? this.each(t == null ? ol : (typeof t == "function" ? sl : il)(t)) : this.node().innerHTML;
}
function al() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function ll() {
  return this.each(al);
}
function cl() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function dl() {
  return this.each(cl);
}
function ul(t) {
  var e = typeof t == "function" ? t : xs(t);
  return this.select(function() {
    return this.appendChild(e.apply(this, arguments));
  });
}
function fl() {
  return null;
}
function hl(t, e) {
  var n = typeof t == "function" ? t : xs(t), o = e == null ? fl : typeof e == "function" ? e : Bo(e);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), o.apply(this, arguments) || null);
  });
}
function pl() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function gl() {
  return this.each(pl);
}
function ml() {
  var t = this.cloneNode(!1), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function yl() {
  var t = this.cloneNode(!0), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function wl(t) {
  return this.select(t ? yl : ml);
}
function vl(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function _l(t) {
  return function(e) {
    t.call(this, e, this.__data__);
  };
}
function bl(t) {
  return t.trim().split(/^|\s+/).map(function(e) {
    var n = "", o = e.indexOf(".");
    return o >= 0 && (n = e.slice(o + 1), e = e.slice(0, o)), { type: e, name: n };
  });
}
function xl(t) {
  return function() {
    var e = this.__on;
    if (e) {
      for (var n = 0, o = -1, i = e.length, r; n < i; ++n)
        r = e[n], (!t.type || r.type === t.type) && r.name === t.name ? this.removeEventListener(r.type, r.listener, r.options) : e[++o] = r;
      ++o ? e.length = o : delete this.__on;
    }
  };
}
function El(t, e, n) {
  return function() {
    var o = this.__on, i, r = _l(e);
    if (o) {
      for (var s = 0, l = o.length; s < l; ++s)
        if ((i = o[s]).type === t.type && i.name === t.name) {
          this.removeEventListener(i.type, i.listener, i.options), this.addEventListener(i.type, i.listener = r, i.options = n), i.value = e;
          return;
        }
    }
    this.addEventListener(t.type, r, n), i = { type: t.type, name: t.name, value: e, listener: r, options: n }, o ? o.push(i) : this.__on = [i];
  };
}
function Sl(t, e, n) {
  var o = bl(t + ""), i, r = o.length, s;
  if (arguments.length < 2) {
    var l = this.node().__on;
    if (l) {
      for (var a = 0, c = l.length, d; a < c; ++a)
        for (i = 0, d = l[a]; i < r; ++i)
          if ((s = o[i]).type === d.type && s.name === d.name)
            return d.value;
    }
    return;
  }
  for (l = e ? El : xl, i = 0; i < r; ++i) this.each(l(o[i], e, n));
  return this;
}
function Ns(t, e, n) {
  var o = ks(t), i = o.CustomEvent;
  typeof i == "function" ? i = new i(e, n) : (i = o.document.createEvent("Event"), n ? (i.initEvent(e, n.bubbles, n.cancelable), i.detail = n.detail) : i.initEvent(e, !1, !1)), t.dispatchEvent(i);
}
function Cl(t, e) {
  return function() {
    return Ns(this, t, e);
  };
}
function Pl(t, e) {
  return function() {
    return Ns(this, t, e.apply(this, arguments));
  };
}
function kl(t, e) {
  return this.each((typeof e == "function" ? Pl : Cl)(t, e));
}
function* Ll() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var o = t[e], i = 0, r = o.length, s; i < r; ++i)
      (s = o[i]) && (yield s);
}
var Is = [null];
function Ie(t, e) {
  this._groups = t, this._parents = e;
}
function cn() {
  return new Ie([[document.documentElement]], Is);
}
function Ml() {
  return this;
}
Ie.prototype = cn.prototype = {
  constructor: Ie,
  select: ta,
  selectAll: sa,
  selectChild: ca,
  selectChildren: ha,
  filter: pa,
  data: _a,
  enter: ga,
  exit: xa,
  join: Ea,
  merge: Sa,
  selection: Ml,
  order: Ca,
  sort: Pa,
  call: La,
  nodes: Ma,
  node: Ta,
  size: Aa,
  empty: Na,
  each: Ia,
  attr: Oa,
  style: Ya,
  property: Ua,
  classed: Ja,
  text: nl,
  html: rl,
  raise: ll,
  lower: dl,
  append: ul,
  insert: hl,
  remove: gl,
  clone: wl,
  datum: vl,
  on: Sl,
  dispatch: kl,
  [Symbol.iterator]: Ll
};
function Re(t) {
  return typeof t == "string" ? new Ie([[document.querySelector(t)]], [document.documentElement]) : new Ie([[t]], Is);
}
function Tl(t) {
  let e;
  for (; e = t.sourceEvent; ) t = e;
  return t;
}
function We(t, e) {
  if (t = Tl(t), e === void 0 && (e = t.currentTarget), e) {
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
const Al = { passive: !1 }, Kt = { capture: !0, passive: !1 };
function oo(t) {
  t.stopImmediatePropagation();
}
function Ct(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function $s(t) {
  var e = t.document.documentElement, n = Re(t).on("dragstart.drag", Ct, Kt);
  "onselectstart" in e ? n.on("selectstart.drag", Ct, Kt) : (e.__noselect = e.style.MozUserSelect, e.style.MozUserSelect = "none");
}
function Ds(t, e) {
  var n = t.document.documentElement, o = Re(t).on("dragstart.drag", null);
  e && (o.on("click.drag", Ct, Kt), setTimeout(function() {
    o.on("click.drag", null);
  }, 0)), "onselectstart" in n ? o.on("selectstart.drag", null) : (n.style.MozUserSelect = n.__noselect, delete n.__noselect);
}
const pn = (t) => () => t;
function xo(t, {
  sourceEvent: e,
  subject: n,
  target: o,
  identifier: i,
  active: r,
  x: s,
  y: l,
  dx: a,
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
    y: { value: l, enumerable: !0, configurable: !0 },
    dx: { value: a, enumerable: !0, configurable: !0 },
    dy: { value: c, enumerable: !0, configurable: !0 },
    _: { value: d }
  });
}
xo.prototype.on = function() {
  var t = this._.on.apply(this._, arguments);
  return t === this._ ? this : t;
};
function Nl(t) {
  return !t.ctrlKey && !t.button;
}
function Il() {
  return this.parentNode;
}
function $l(t, e) {
  return e ?? { x: t.x, y: t.y };
}
function Dl() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Rl() {
  var t = Nl, e = Il, n = $l, o = Dl, i = {}, r = Kn("start", "drag", "end"), s = 0, l, a, c, d, f = 0;
  function u(b) {
    b.on("mousedown.drag", h).filter(o).on("touchstart.drag", w).on("touchmove.drag", m, Al).on("touchend.drag touchcancel.drag", E).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function h(b, D) {
    if (!(d || !t.call(this, b, D))) {
      var M = C(this, e.call(this, b, D), b, D, "mouse");
      M && (Re(b.view).on("mousemove.drag", p, Kt).on("mouseup.drag", g, Kt), $s(b.view), oo(b), c = !1, l = b.clientX, a = b.clientY, M("start", b));
    }
  }
  function p(b) {
    if (Ct(b), !c) {
      var D = b.clientX - l, M = b.clientY - a;
      c = D * D + M * M > f;
    }
    i.mouse("drag", b);
  }
  function g(b) {
    Re(b.view).on("mousemove.drag mouseup.drag", null), Ds(b.view, c), Ct(b), i.mouse("end", b);
  }
  function w(b, D) {
    if (t.call(this, b, D)) {
      var M = b.changedTouches, T = e.call(this, b, D), v = M.length, P, I;
      for (P = 0; P < v; ++P)
        (I = C(this, T, b, D, M[P].identifier, M[P])) && (oo(b), I("start", b, M[P]));
    }
  }
  function m(b) {
    var D = b.changedTouches, M = D.length, T, v;
    for (T = 0; T < M; ++T)
      (v = i[D[T].identifier]) && (Ct(b), v("drag", b, D[T]));
  }
  function E(b) {
    var D = b.changedTouches, M = D.length, T, v;
    for (d && clearTimeout(d), d = setTimeout(function() {
      d = null;
    }, 500), T = 0; T < M; ++T)
      (v = i[D[T].identifier]) && (oo(b), v("end", b, D[T]));
  }
  function C(b, D, M, T, v, P) {
    var I = r.copy(), x = We(P || M, D), y, q, _;
    if ((_ = n.call(b, new xo("beforestart", {
      sourceEvent: M,
      target: u,
      identifier: v,
      active: s,
      x: x[0],
      y: x[1],
      dx: 0,
      dy: 0,
      dispatch: I
    }), T)) != null)
      return y = _.x - x[0] || 0, q = _.y - x[1] || 0, function L(A, O, S) {
        var k = x, N;
        switch (A) {
          case "start":
            i[v] = L, N = s++;
            break;
          case "end":
            delete i[v], --s;
          // falls through
          case "drag":
            x = We(S || O, D), N = s;
            break;
        }
        I.call(
          A,
          b,
          new xo(A, {
            sourceEvent: O,
            subject: _,
            target: u,
            identifier: v,
            active: N,
            x: x[0] + y,
            y: x[1] + q,
            dx: x[0] - k[0],
            dy: x[1] - k[1],
            dispatch: I
          }),
          T
        );
      };
  }
  return u.filter = function(b) {
    return arguments.length ? (t = typeof b == "function" ? b : pn(!!b), u) : t;
  }, u.container = function(b) {
    return arguments.length ? (e = typeof b == "function" ? b : pn(b), u) : e;
  }, u.subject = function(b) {
    return arguments.length ? (n = typeof b == "function" ? b : pn(b), u) : n;
  }, u.touchable = function(b) {
    return arguments.length ? (o = typeof b == "function" ? b : pn(!!b), u) : o;
  }, u.on = function() {
    var b = r.on.apply(r, arguments);
    return b === r ? u : b;
  }, u.clickDistance = function(b) {
    return arguments.length ? (f = (b = +b) * b, u) : Math.sqrt(f);
  }, u;
}
function Yo(t, e, n) {
  t.prototype = e.prototype = n, n.constructor = t;
}
function Rs(t, e) {
  var n = Object.create(t.prototype);
  for (var o in e) n[o] = e[o];
  return n;
}
function dn() {
}
var Jt = 0.7, Nn = 1 / Jt, Pt = "\\s*([+-]?\\d+)\\s*", Qt = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Be = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", Hl = /^#([0-9a-f]{3,8})$/, Fl = new RegExp(`^rgb\\(${Pt},${Pt},${Pt}\\)$`), zl = new RegExp(`^rgb\\(${Be},${Be},${Be}\\)$`), Ol = new RegExp(`^rgba\\(${Pt},${Pt},${Pt},${Qt}\\)$`), Vl = new RegExp(`^rgba\\(${Be},${Be},${Be},${Qt}\\)$`), Bl = new RegExp(`^hsl\\(${Qt},${Be},${Be}\\)$`), Xl = new RegExp(`^hsla\\(${Qt},${Be},${Be},${Qt}\\)$`), mi = {
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
Yo(dn, en, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: yi,
  // Deprecated! Use color.formatHex.
  formatHex: yi,
  formatHex8: Yl,
  formatHsl: ql,
  formatRgb: wi,
  toString: wi
});
function yi() {
  return this.rgb().formatHex();
}
function Yl() {
  return this.rgb().formatHex8();
}
function ql() {
  return Hs(this).formatHsl();
}
function wi() {
  return this.rgb().formatRgb();
}
function en(t) {
  var e, n;
  return t = (t + "").trim().toLowerCase(), (e = Hl.exec(t)) ? (n = e[1].length, e = parseInt(e[1], 16), n === 6 ? vi(e) : n === 3 ? new ke(e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, (e & 15) << 4 | e & 15, 1) : n === 8 ? gn(e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, (e & 255) / 255) : n === 4 ? gn(e >> 12 & 15 | e >> 8 & 240, e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, ((e & 15) << 4 | e & 15) / 255) : null) : (e = Fl.exec(t)) ? new ke(e[1], e[2], e[3], 1) : (e = zl.exec(t)) ? new ke(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, 1) : (e = Ol.exec(t)) ? gn(e[1], e[2], e[3], e[4]) : (e = Vl.exec(t)) ? gn(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, e[4]) : (e = Bl.exec(t)) ? xi(e[1], e[2] / 100, e[3] / 100, 1) : (e = Xl.exec(t)) ? xi(e[1], e[2] / 100, e[3] / 100, e[4]) : mi.hasOwnProperty(t) ? vi(mi[t]) : t === "transparent" ? new ke(NaN, NaN, NaN, 0) : null;
}
function vi(t) {
  return new ke(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function gn(t, e, n, o) {
  return o <= 0 && (t = e = n = NaN), new ke(t, e, n, o);
}
function Wl(t) {
  return t instanceof dn || (t = en(t)), t ? (t = t.rgb(), new ke(t.r, t.g, t.b, t.opacity)) : new ke();
}
function Eo(t, e, n, o) {
  return arguments.length === 1 ? Wl(t) : new ke(t, e, n, o ?? 1);
}
function ke(t, e, n, o) {
  this.r = +t, this.g = +e, this.b = +n, this.opacity = +o;
}
Yo(ke, Eo, Rs(dn, {
  brighter(t) {
    return t = t == null ? Nn : Math.pow(Nn, t), new ke(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? Jt : Math.pow(Jt, t), new ke(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new ke(mt(this.r), mt(this.g), mt(this.b), In(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: _i,
  // Deprecated! Use color.formatHex.
  formatHex: _i,
  formatHex8: jl,
  formatRgb: bi,
  toString: bi
}));
function _i() {
  return `#${pt(this.r)}${pt(this.g)}${pt(this.b)}`;
}
function jl() {
  return `#${pt(this.r)}${pt(this.g)}${pt(this.b)}${pt((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function bi() {
  const t = In(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${mt(this.r)}, ${mt(this.g)}, ${mt(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function In(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function mt(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function pt(t) {
  return t = mt(t), (t < 16 ? "0" : "") + t.toString(16);
}
function xi(t, e, n, o) {
  return o <= 0 ? t = e = n = NaN : n <= 0 || n >= 1 ? t = e = NaN : e <= 0 && (t = NaN), new He(t, e, n, o);
}
function Hs(t) {
  if (t instanceof He) return new He(t.h, t.s, t.l, t.opacity);
  if (t instanceof dn || (t = en(t)), !t) return new He();
  if (t instanceof He) return t;
  t = t.rgb();
  var e = t.r / 255, n = t.g / 255, o = t.b / 255, i = Math.min(e, n, o), r = Math.max(e, n, o), s = NaN, l = r - i, a = (r + i) / 2;
  return l ? (e === r ? s = (n - o) / l + (n < o) * 6 : n === r ? s = (o - e) / l + 2 : s = (e - n) / l + 4, l /= a < 0.5 ? r + i : 2 - r - i, s *= 60) : l = a > 0 && a < 1 ? 0 : s, new He(s, l, a, t.opacity);
}
function Ul(t, e, n, o) {
  return arguments.length === 1 ? Hs(t) : new He(t, e, n, o ?? 1);
}
function He(t, e, n, o) {
  this.h = +t, this.s = +e, this.l = +n, this.opacity = +o;
}
Yo(He, Ul, Rs(dn, {
  brighter(t) {
    return t = t == null ? Nn : Math.pow(Nn, t), new He(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? Jt : Math.pow(Jt, t), new He(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, e = isNaN(t) || isNaN(this.s) ? 0 : this.s, n = this.l, o = n + (n < 0.5 ? n : 1 - n) * e, i = 2 * n - o;
    return new ke(
      io(t >= 240 ? t - 240 : t + 120, i, o),
      io(t, i, o),
      io(t < 120 ? t + 240 : t - 120, i, o),
      this.opacity
    );
  },
  clamp() {
    return new He(Ei(this.h), mn(this.s), mn(this.l), In(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = In(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${Ei(this.h)}, ${mn(this.s) * 100}%, ${mn(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function Ei(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function mn(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function io(t, e, n) {
  return (t < 60 ? e + (n - e) * t / 60 : t < 180 ? n : t < 240 ? e + (n - e) * (240 - t) / 60 : e) * 255;
}
const Fs = (t) => () => t;
function Zl(t, e) {
  return function(n) {
    return t + n * e;
  };
}
function Gl(t, e, n) {
  return t = Math.pow(t, n), e = Math.pow(e, n) - t, n = 1 / n, function(o) {
    return Math.pow(t + o * e, n);
  };
}
function Kl(t) {
  return (t = +t) == 1 ? zs : function(e, n) {
    return n - e ? Gl(e, n, t) : Fs(isNaN(e) ? n : e);
  };
}
function zs(t, e) {
  var n = e - t;
  return n ? Zl(t, n) : Fs(isNaN(t) ? e : t);
}
const So = (function t(e) {
  var n = Kl(e);
  function o(i, r) {
    var s = n((i = Eo(i)).r, (r = Eo(r)).r), l = n(i.g, r.g), a = n(i.b, r.b), c = zs(i.opacity, r.opacity);
    return function(d) {
      return i.r = s(d), i.g = l(d), i.b = a(d), i.opacity = c(d), i + "";
    };
  }
  return o.gamma = t, o;
})(1);
function nt(t, e) {
  return t = +t, e = +e, function(n) {
    return t * (1 - n) + e * n;
  };
}
var Co = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, so = new RegExp(Co.source, "g");
function Jl(t) {
  return function() {
    return t;
  };
}
function Ql(t) {
  return function(e) {
    return t(e) + "";
  };
}
function ec(t, e) {
  var n = Co.lastIndex = so.lastIndex = 0, o, i, r, s = -1, l = [], a = [];
  for (t = t + "", e = e + ""; (o = Co.exec(t)) && (i = so.exec(e)); )
    (r = i.index) > n && (r = e.slice(n, r), l[s] ? l[s] += r : l[++s] = r), (o = o[0]) === (i = i[0]) ? l[s] ? l[s] += i : l[++s] = i : (l[++s] = null, a.push({ i: s, x: nt(o, i) })), n = so.lastIndex;
  return n < e.length && (r = e.slice(n), l[s] ? l[s] += r : l[++s] = r), l.length < 2 ? a[0] ? Ql(a[0].x) : Jl(e) : (e = a.length, function(c) {
    for (var d = 0, f; d < e; ++d) l[(f = a[d]).i] = f.x(c);
    return l.join("");
  });
}
var Si = 180 / Math.PI, Po = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function Os(t, e, n, o, i, r) {
  var s, l, a;
  return (s = Math.sqrt(t * t + e * e)) && (t /= s, e /= s), (a = t * n + e * o) && (n -= t * a, o -= e * a), (l = Math.sqrt(n * n + o * o)) && (n /= l, o /= l, a /= l), t * o < e * n && (t = -t, e = -e, a = -a, s = -s), {
    translateX: i,
    translateY: r,
    rotate: Math.atan2(e, t) * Si,
    skewX: Math.atan(a) * Si,
    scaleX: s,
    scaleY: l
  };
}
var yn;
function tc(t) {
  const e = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return e.isIdentity ? Po : Os(e.a, e.b, e.c, e.d, e.e, e.f);
}
function nc(t) {
  return t == null || (yn || (yn = document.createElementNS("http://www.w3.org/2000/svg", "g")), yn.setAttribute("transform", t), !(t = yn.transform.baseVal.consolidate())) ? Po : (t = t.matrix, Os(t.a, t.b, t.c, t.d, t.e, t.f));
}
function Vs(t, e, n, o) {
  function i(c) {
    return c.length ? c.pop() + " " : "";
  }
  function r(c, d, f, u, h, p) {
    if (c !== f || d !== u) {
      var g = h.push("translate(", null, e, null, n);
      p.push({ i: g - 4, x: nt(c, f) }, { i: g - 2, x: nt(d, u) });
    } else (f || u) && h.push("translate(" + f + e + u + n);
  }
  function s(c, d, f, u) {
    c !== d ? (c - d > 180 ? d += 360 : d - c > 180 && (c += 360), u.push({ i: f.push(i(f) + "rotate(", null, o) - 2, x: nt(c, d) })) : d && f.push(i(f) + "rotate(" + d + o);
  }
  function l(c, d, f, u) {
    c !== d ? u.push({ i: f.push(i(f) + "skewX(", null, o) - 2, x: nt(c, d) }) : d && f.push(i(f) + "skewX(" + d + o);
  }
  function a(c, d, f, u, h, p) {
    if (c !== f || d !== u) {
      var g = h.push(i(h) + "scale(", null, ",", null, ")");
      p.push({ i: g - 4, x: nt(c, f) }, { i: g - 2, x: nt(d, u) });
    } else (f !== 1 || u !== 1) && h.push(i(h) + "scale(" + f + "," + u + ")");
  }
  return function(c, d) {
    var f = [], u = [];
    return c = t(c), d = t(d), r(c.translateX, c.translateY, d.translateX, d.translateY, f, u), s(c.rotate, d.rotate, f, u), l(c.skewX, d.skewX, f, u), a(c.scaleX, c.scaleY, d.scaleX, d.scaleY, f, u), c = d = null, function(h) {
      for (var p = -1, g = u.length, w; ++p < g; ) f[(w = u[p]).i] = w.x(h);
      return f.join("");
    };
  };
}
var oc = Vs(tc, "px, ", "px)", "deg)"), ic = Vs(nc, ", ", ")", ")"), sc = 1e-12;
function Ci(t) {
  return ((t = Math.exp(t)) + 1 / t) / 2;
}
function rc(t) {
  return ((t = Math.exp(t)) - 1 / t) / 2;
}
function ac(t) {
  return ((t = Math.exp(2 * t)) - 1) / (t + 1);
}
const lc = (function t(e, n, o) {
  function i(r, s) {
    var l = r[0], a = r[1], c = r[2], d = s[0], f = s[1], u = s[2], h = d - l, p = f - a, g = h * h + p * p, w, m;
    if (g < sc)
      m = Math.log(u / c) / e, w = function(T) {
        return [
          l + T * h,
          a + T * p,
          c * Math.exp(e * T * m)
        ];
      };
    else {
      var E = Math.sqrt(g), C = (u * u - c * c + o * g) / (2 * c * n * E), b = (u * u - c * c - o * g) / (2 * u * n * E), D = Math.log(Math.sqrt(C * C + 1) - C), M = Math.log(Math.sqrt(b * b + 1) - b);
      m = (M - D) / e, w = function(T) {
        var v = T * m, P = Ci(D), I = c / (n * E) * (P * ac(e * v + D) - rc(D));
        return [
          l + I * h,
          a + I * p,
          c * P / Ci(e * v + D)
        ];
      };
    }
    return w.duration = m * 1e3 * e / Math.SQRT2, w;
  }
  return i.rho = function(r) {
    var s = Math.max(1e-3, +r), l = s * s, a = l * l;
    return t(s, l, a);
  }, i;
})(Math.SQRT2, 2, 4);
var Tt = 0, qt = 0, Ft = 0, Bs = 1e3, $n, Wt, Dn = 0, wt = 0, Qn = 0, tn = typeof performance == "object" && performance.now ? performance : Date, Xs = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function qo() {
  return wt || (Xs(cc), wt = tn.now() + Qn);
}
function cc() {
  wt = 0;
}
function Rn() {
  this._call = this._time = this._next = null;
}
Rn.prototype = Ys.prototype = {
  constructor: Rn,
  restart: function(t, e, n) {
    if (typeof t != "function") throw new TypeError("callback is not a function");
    n = (n == null ? qo() : +n) + (e == null ? 0 : +e), !this._next && Wt !== this && (Wt ? Wt._next = this : $n = this, Wt = this), this._call = t, this._time = n, ko();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, ko());
  }
};
function Ys(t, e, n) {
  var o = new Rn();
  return o.restart(t, e, n), o;
}
function dc() {
  qo(), ++Tt;
  for (var t = $n, e; t; )
    (e = wt - t._time) >= 0 && t._call.call(void 0, e), t = t._next;
  --Tt;
}
function Pi() {
  wt = (Dn = tn.now()) + Qn, Tt = qt = 0;
  try {
    dc();
  } finally {
    Tt = 0, fc(), wt = 0;
  }
}
function uc() {
  var t = tn.now(), e = t - Dn;
  e > Bs && (Qn -= e, Dn = t);
}
function fc() {
  for (var t, e = $n, n, o = 1 / 0; e; )
    e._call ? (o > e._time && (o = e._time), t = e, e = e._next) : (n = e._next, e._next = null, e = t ? t._next = n : $n = n);
  Wt = t, ko(o);
}
function ko(t) {
  if (!Tt) {
    qt && (qt = clearTimeout(qt));
    var e = t - wt;
    e > 24 ? (t < 1 / 0 && (qt = setTimeout(Pi, t - tn.now() - Qn)), Ft && (Ft = clearInterval(Ft))) : (Ft || (Dn = tn.now(), Ft = setInterval(uc, Bs)), Tt = 1, Xs(Pi));
  }
}
function ki(t, e, n) {
  var o = new Rn();
  return e = e == null ? 0 : +e, o.restart((i) => {
    o.stop(), t(i + e);
  }, e, n), o;
}
var hc = Kn("start", "end", "cancel", "interrupt"), pc = [], qs = 0, Li = 1, Lo = 2, Pn = 3, Mi = 4, Mo = 5, kn = 6;
function eo(t, e, n, o, i, r) {
  var s = t.__transition;
  if (!s) t.__transition = {};
  else if (n in s) return;
  gc(t, n, {
    name: e,
    index: o,
    // For context during callback.
    group: i,
    // For context during callback.
    on: hc,
    tween: pc,
    time: r.time,
    delay: r.delay,
    duration: r.duration,
    ease: r.ease,
    timer: null,
    state: qs
  });
}
function Wo(t, e) {
  var n = Fe(t, e);
  if (n.state > qs) throw new Error("too late; already scheduled");
  return n;
}
function Xe(t, e) {
  var n = Fe(t, e);
  if (n.state > Pn) throw new Error("too late; already running");
  return n;
}
function Fe(t, e) {
  var n = t.__transition;
  if (!n || !(n = n[e])) throw new Error("transition not found");
  return n;
}
function gc(t, e, n) {
  var o = t.__transition, i;
  o[e] = n, n.timer = Ys(r, 0, n.time);
  function r(c) {
    n.state = Li, n.timer.restart(s, n.delay, n.time), n.delay <= c && s(c - n.delay);
  }
  function s(c) {
    var d, f, u, h;
    if (n.state !== Li) return a();
    for (d in o)
      if (h = o[d], h.name === n.name) {
        if (h.state === Pn) return ki(s);
        h.state === Mi ? (h.state = kn, h.timer.stop(), h.on.call("interrupt", t, t.__data__, h.index, h.group), delete o[d]) : +d < e && (h.state = kn, h.timer.stop(), h.on.call("cancel", t, t.__data__, h.index, h.group), delete o[d]);
      }
    if (ki(function() {
      n.state === Pn && (n.state = Mi, n.timer.restart(l, n.delay, n.time), l(c));
    }), n.state = Lo, n.on.call("start", t, t.__data__, n.index, n.group), n.state === Lo) {
      for (n.state = Pn, i = new Array(u = n.tween.length), d = 0, f = -1; d < u; ++d)
        (h = n.tween[d].value.call(t, t.__data__, n.index, n.group)) && (i[++f] = h);
      i.length = f + 1;
    }
  }
  function l(c) {
    for (var d = c < n.duration ? n.ease.call(null, c / n.duration) : (n.timer.restart(a), n.state = Mo, 1), f = -1, u = i.length; ++f < u; )
      i[f].call(t, d);
    n.state === Mo && (n.on.call("end", t, t.__data__, n.index, n.group), a());
  }
  function a() {
    n.state = kn, n.timer.stop(), delete o[e];
    for (var c in o) return;
    delete t.__transition;
  }
}
function Ln(t, e) {
  var n = t.__transition, o, i, r = !0, s;
  if (n) {
    e = e == null ? null : e + "";
    for (s in n) {
      if ((o = n[s]).name !== e) {
        r = !1;
        continue;
      }
      i = o.state > Lo && o.state < Mo, o.state = kn, o.timer.stop(), o.on.call(i ? "interrupt" : "cancel", t, t.__data__, o.index, o.group), delete n[s];
    }
    r && delete t.__transition;
  }
}
function mc(t) {
  return this.each(function() {
    Ln(this, t);
  });
}
function yc(t, e) {
  var n, o;
  return function() {
    var i = Xe(this, t), r = i.tween;
    if (r !== n) {
      o = n = r;
      for (var s = 0, l = o.length; s < l; ++s)
        if (o[s].name === e) {
          o = o.slice(), o.splice(s, 1);
          break;
        }
    }
    i.tween = o;
  };
}
function wc(t, e, n) {
  var o, i;
  if (typeof n != "function") throw new Error();
  return function() {
    var r = Xe(this, t), s = r.tween;
    if (s !== o) {
      i = (o = s).slice();
      for (var l = { name: e, value: n }, a = 0, c = i.length; a < c; ++a)
        if (i[a].name === e) {
          i[a] = l;
          break;
        }
      a === c && i.push(l);
    }
    r.tween = i;
  };
}
function vc(t, e) {
  var n = this._id;
  if (t += "", arguments.length < 2) {
    for (var o = Fe(this.node(), n).tween, i = 0, r = o.length, s; i < r; ++i)
      if ((s = o[i]).name === t)
        return s.value;
    return null;
  }
  return this.each((e == null ? yc : wc)(n, t, e));
}
function jo(t, e, n) {
  var o = t._id;
  return t.each(function() {
    var i = Xe(this, o);
    (i.value || (i.value = {}))[e] = n.apply(this, arguments);
  }), function(i) {
    return Fe(i, o).value[e];
  };
}
function Ws(t, e) {
  var n;
  return (typeof e == "number" ? nt : e instanceof en ? So : (n = en(e)) ? (e = n, So) : ec)(t, e);
}
function _c(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function bc(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function xc(t, e, n) {
  var o, i = n + "", r;
  return function() {
    var s = this.getAttribute(t);
    return s === i ? null : s === o ? r : r = e(o = s, n);
  };
}
function Ec(t, e, n) {
  var o, i = n + "", r;
  return function() {
    var s = this.getAttributeNS(t.space, t.local);
    return s === i ? null : s === o ? r : r = e(o = s, n);
  };
}
function Sc(t, e, n) {
  var o, i, r;
  return function() {
    var s, l = n(this), a;
    return l == null ? void this.removeAttribute(t) : (s = this.getAttribute(t), a = l + "", s === a ? null : s === o && a === i ? r : (i = a, r = e(o = s, l)));
  };
}
function Cc(t, e, n) {
  var o, i, r;
  return function() {
    var s, l = n(this), a;
    return l == null ? void this.removeAttributeNS(t.space, t.local) : (s = this.getAttributeNS(t.space, t.local), a = l + "", s === a ? null : s === o && a === i ? r : (i = a, r = e(o = s, l)));
  };
}
function Pc(t, e) {
  var n = Jn(t), o = n === "transform" ? ic : Ws;
  return this.attrTween(t, typeof e == "function" ? (n.local ? Cc : Sc)(n, o, jo(this, "attr." + t, e)) : e == null ? (n.local ? bc : _c)(n) : (n.local ? Ec : xc)(n, o, e));
}
function kc(t, e) {
  return function(n) {
    this.setAttribute(t, e.call(this, n));
  };
}
function Lc(t, e) {
  return function(n) {
    this.setAttributeNS(t.space, t.local, e.call(this, n));
  };
}
function Mc(t, e) {
  var n, o;
  function i() {
    var r = e.apply(this, arguments);
    return r !== o && (n = (o = r) && Lc(t, r)), n;
  }
  return i._value = e, i;
}
function Tc(t, e) {
  var n, o;
  function i() {
    var r = e.apply(this, arguments);
    return r !== o && (n = (o = r) && kc(t, r)), n;
  }
  return i._value = e, i;
}
function Ac(t, e) {
  var n = "attr." + t;
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (e == null) return this.tween(n, null);
  if (typeof e != "function") throw new Error();
  var o = Jn(t);
  return this.tween(n, (o.local ? Mc : Tc)(o, e));
}
function Nc(t, e) {
  return function() {
    Wo(this, t).delay = +e.apply(this, arguments);
  };
}
function Ic(t, e) {
  return e = +e, function() {
    Wo(this, t).delay = e;
  };
}
function $c(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? Nc : Ic)(e, t)) : Fe(this.node(), e).delay;
}
function Dc(t, e) {
  return function() {
    Xe(this, t).duration = +e.apply(this, arguments);
  };
}
function Rc(t, e) {
  return e = +e, function() {
    Xe(this, t).duration = e;
  };
}
function Hc(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? Dc : Rc)(e, t)) : Fe(this.node(), e).duration;
}
function Fc(t, e) {
  if (typeof e != "function") throw new Error();
  return function() {
    Xe(this, t).ease = e;
  };
}
function zc(t) {
  var e = this._id;
  return arguments.length ? this.each(Fc(e, t)) : Fe(this.node(), e).ease;
}
function Oc(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    if (typeof n != "function") throw new Error();
    Xe(this, t).ease = n;
  };
}
function Vc(t) {
  if (typeof t != "function") throw new Error();
  return this.each(Oc(this._id, t));
}
function Bc(t) {
  typeof t != "function" && (t = Ss(t));
  for (var e = this._groups, n = e.length, o = new Array(n), i = 0; i < n; ++i)
    for (var r = e[i], s = r.length, l = o[i] = [], a, c = 0; c < s; ++c)
      (a = r[c]) && t.call(a, a.__data__, c, r) && l.push(a);
  return new Ke(o, this._parents, this._name, this._id);
}
function Xc(t) {
  if (t._id !== this._id) throw new Error();
  for (var e = this._groups, n = t._groups, o = e.length, i = n.length, r = Math.min(o, i), s = new Array(o), l = 0; l < r; ++l)
    for (var a = e[l], c = n[l], d = a.length, f = s[l] = new Array(d), u, h = 0; h < d; ++h)
      (u = a[h] || c[h]) && (f[h] = u);
  for (; l < o; ++l)
    s[l] = e[l];
  return new Ke(s, this._parents, this._name, this._id);
}
function Yc(t) {
  return (t + "").trim().split(/^|\s+/).every(function(e) {
    var n = e.indexOf(".");
    return n >= 0 && (e = e.slice(0, n)), !e || e === "start";
  });
}
function qc(t, e, n) {
  var o, i, r = Yc(e) ? Wo : Xe;
  return function() {
    var s = r(this, t), l = s.on;
    l !== o && (i = (o = l).copy()).on(e, n), s.on = i;
  };
}
function Wc(t, e) {
  var n = this._id;
  return arguments.length < 2 ? Fe(this.node(), n).on.on(t) : this.each(qc(n, t, e));
}
function jc(t) {
  return function() {
    var e = this.parentNode;
    for (var n in this.__transition) if (+n !== t) return;
    e && e.removeChild(this);
  };
}
function Uc() {
  return this.on("end.remove", jc(this._id));
}
function Zc(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = Bo(t));
  for (var o = this._groups, i = o.length, r = new Array(i), s = 0; s < i; ++s)
    for (var l = o[s], a = l.length, c = r[s] = new Array(a), d, f, u = 0; u < a; ++u)
      (d = l[u]) && (f = t.call(d, d.__data__, u, l)) && ("__data__" in d && (f.__data__ = d.__data__), c[u] = f, eo(c[u], e, n, u, c, Fe(d, n)));
  return new Ke(r, this._parents, e, n);
}
function Gc(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = Es(t));
  for (var o = this._groups, i = o.length, r = [], s = [], l = 0; l < i; ++l)
    for (var a = o[l], c = a.length, d, f = 0; f < c; ++f)
      if (d = a[f]) {
        for (var u = t.call(d, d.__data__, f, a), h, p = Fe(d, n), g = 0, w = u.length; g < w; ++g)
          (h = u[g]) && eo(h, e, n, g, u, p);
        r.push(u), s.push(d);
      }
  return new Ke(r, s, e, n);
}
var Kc = cn.prototype.constructor;
function Jc() {
  return new Kc(this._groups, this._parents);
}
function Qc(t, e) {
  var n, o, i;
  return function() {
    var r = Mt(this, t), s = (this.style.removeProperty(t), Mt(this, t));
    return r === s ? null : r === n && s === o ? i : i = e(n = r, o = s);
  };
}
function js(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function ed(t, e, n) {
  var o, i = n + "", r;
  return function() {
    var s = Mt(this, t);
    return s === i ? null : s === o ? r : r = e(o = s, n);
  };
}
function td(t, e, n) {
  var o, i, r;
  return function() {
    var s = Mt(this, t), l = n(this), a = l + "";
    return l == null && (a = l = (this.style.removeProperty(t), Mt(this, t))), s === a ? null : s === o && a === i ? r : (i = a, r = e(o = s, l));
  };
}
function nd(t, e) {
  var n, o, i, r = "style." + e, s = "end." + r, l;
  return function() {
    var a = Xe(this, t), c = a.on, d = a.value[r] == null ? l || (l = js(e)) : void 0;
    (c !== n || i !== d) && (o = (n = c).copy()).on(s, i = d), a.on = o;
  };
}
function od(t, e, n) {
  var o = (t += "") == "transform" ? oc : Ws;
  return e == null ? this.styleTween(t, Qc(t, o)).on("end.style." + t, js(t)) : typeof e == "function" ? this.styleTween(t, td(t, o, jo(this, "style." + t, e))).each(nd(this._id, t)) : this.styleTween(t, ed(t, o, e), n).on("end.style." + t, null);
}
function id(t, e, n) {
  return function(o) {
    this.style.setProperty(t, e.call(this, o), n);
  };
}
function sd(t, e, n) {
  var o, i;
  function r() {
    var s = e.apply(this, arguments);
    return s !== i && (o = (i = s) && id(t, s, n)), o;
  }
  return r._value = e, r;
}
function rd(t, e, n) {
  var o = "style." + (t += "");
  if (arguments.length < 2) return (o = this.tween(o)) && o._value;
  if (e == null) return this.tween(o, null);
  if (typeof e != "function") throw new Error();
  return this.tween(o, sd(t, e, n ?? ""));
}
function ad(t) {
  return function() {
    this.textContent = t;
  };
}
function ld(t) {
  return function() {
    var e = t(this);
    this.textContent = e ?? "";
  };
}
function cd(t) {
  return this.tween("text", typeof t == "function" ? ld(jo(this, "text", t)) : ad(t == null ? "" : t + ""));
}
function dd(t) {
  return function(e) {
    this.textContent = t.call(this, e);
  };
}
function ud(t) {
  var e, n;
  function o() {
    var i = t.apply(this, arguments);
    return i !== n && (e = (n = i) && dd(i)), e;
  }
  return o._value = t, o;
}
function fd(t) {
  var e = "text";
  if (arguments.length < 1) return (e = this.tween(e)) && e._value;
  if (t == null) return this.tween(e, null);
  if (typeof t != "function") throw new Error();
  return this.tween(e, ud(t));
}
function hd() {
  for (var t = this._name, e = this._id, n = Us(), o = this._groups, i = o.length, r = 0; r < i; ++r)
    for (var s = o[r], l = s.length, a, c = 0; c < l; ++c)
      if (a = s[c]) {
        var d = Fe(a, e);
        eo(a, t, n, c, s, {
          time: d.time + d.delay + d.duration,
          delay: 0,
          duration: d.duration,
          ease: d.ease
        });
      }
  return new Ke(o, this._parents, t, n);
}
function pd() {
  var t, e, n = this, o = n._id, i = n.size();
  return new Promise(function(r, s) {
    var l = { value: s }, a = { value: function() {
      --i === 0 && r();
    } };
    n.each(function() {
      var c = Xe(this, o), d = c.on;
      d !== t && (e = (t = d).copy(), e._.cancel.push(l), e._.interrupt.push(l), e._.end.push(a)), c.on = e;
    }), i === 0 && r();
  });
}
var gd = 0;
function Ke(t, e, n, o) {
  this._groups = t, this._parents = e, this._name = n, this._id = o;
}
function Us() {
  return ++gd;
}
var qe = cn.prototype;
Ke.prototype = {
  constructor: Ke,
  select: Zc,
  selectAll: Gc,
  selectChild: qe.selectChild,
  selectChildren: qe.selectChildren,
  filter: Bc,
  merge: Xc,
  selection: Jc,
  transition: hd,
  call: qe.call,
  nodes: qe.nodes,
  node: qe.node,
  size: qe.size,
  empty: qe.empty,
  each: qe.each,
  on: Wc,
  attr: Pc,
  attrTween: Ac,
  style: od,
  styleTween: rd,
  text: cd,
  textTween: fd,
  remove: Uc,
  tween: vc,
  delay: $c,
  duration: Hc,
  ease: zc,
  easeVarying: Vc,
  end: pd,
  [Symbol.iterator]: qe[Symbol.iterator]
};
const md = (t) => +t;
function yd(t) {
  return t * t;
}
function wd(t) {
  return t * (2 - t);
}
function vd(t) {
  return ((t *= 2) <= 1 ? t * t : --t * (2 - t) + 1) / 2;
}
function _d(t) {
  return t * t * t;
}
function bd(t) {
  return --t * t * t + 1;
}
function Zs(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var Gs = Math.PI, Ks = Gs / 2;
function xd(t) {
  return +t == 1 ? 1 : 1 - Math.cos(t * Ks);
}
function Ed(t) {
  return Math.sin(t * Ks);
}
function Sd(t) {
  return (1 - Math.cos(Gs * t)) / 2;
}
function ct(t) {
  return (Math.pow(2, -10 * t) - 9765625e-10) * 1.0009775171065494;
}
function Cd(t) {
  return ct(1 - +t);
}
function Pd(t) {
  return 1 - ct(t);
}
function kd(t) {
  return ((t *= 2) <= 1 ? ct(1 - t) : 2 - ct(t - 1)) / 2;
}
function Ld(t) {
  return 1 - Math.sqrt(1 - t * t);
}
function Md(t) {
  return Math.sqrt(1 - --t * t);
}
function Td(t) {
  return ((t *= 2) <= 1 ? 1 - Math.sqrt(1 - t * t) : Math.sqrt(1 - (t -= 2) * t) + 1) / 2;
}
var To = 4 / 11, Ad = 6 / 11, Nd = 8 / 11, Id = 3 / 4, $d = 9 / 11, Dd = 10 / 11, Rd = 15 / 16, Hd = 21 / 22, Fd = 63 / 64, wn = 1 / To / To;
function zd(t) {
  return 1 - Hn(1 - t);
}
function Hn(t) {
  return (t = +t) < To ? wn * t * t : t < Nd ? wn * (t -= Ad) * t + Id : t < Dd ? wn * (t -= $d) * t + Rd : wn * (t -= Hd) * t + Fd;
}
function Od(t) {
  return ((t *= 2) <= 1 ? 1 - Hn(1 - t) : Hn(t - 1) + 1) / 2;
}
var Uo = 1.70158, Vd = (function t(e) {
  e = +e;
  function n(o) {
    return (o = +o) * o * (e * (o - 1) + o);
  }
  return n.overshoot = t, n;
})(Uo), Bd = (function t(e) {
  e = +e;
  function n(o) {
    return --o * o * ((o + 1) * e + o) + 1;
  }
  return n.overshoot = t, n;
})(Uo), Xd = (function t(e) {
  e = +e;
  function n(o) {
    return ((o *= 2) < 1 ? o * o * ((e + 1) * o - e) : (o -= 2) * o * ((e + 1) * o + e) + 2) / 2;
  }
  return n.overshoot = t, n;
})(Uo), At = 2 * Math.PI, Zo = 1, Go = 0.3, Yd = (function t(e, n) {
  var o = Math.asin(1 / (e = Math.max(1, e))) * (n /= At);
  function i(r) {
    return e * ct(- --r) * Math.sin((o - r) / n);
  }
  return i.amplitude = function(r) {
    return t(r, n * At);
  }, i.period = function(r) {
    return t(e, r);
  }, i;
})(Zo, Go), qd = (function t(e, n) {
  var o = Math.asin(1 / (e = Math.max(1, e))) * (n /= At);
  function i(r) {
    return 1 - e * ct(r = +r) * Math.sin((r + o) / n);
  }
  return i.amplitude = function(r) {
    return t(r, n * At);
  }, i.period = function(r) {
    return t(e, r);
  }, i;
})(Zo, Go), Wd = (function t(e, n) {
  var o = Math.asin(1 / (e = Math.max(1, e))) * (n /= At);
  function i(r) {
    return ((r = r * 2 - 1) < 0 ? e * ct(-r) * Math.sin((o - r) / n) : 2 - e * ct(r) * Math.sin((o + r) / n)) / 2;
  }
  return i.amplitude = function(r) {
    return t(r, n * At);
  }, i.period = function(r) {
    return t(e, r);
  }, i;
})(Zo, Go), jd = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: Zs
};
function Ud(t, e) {
  for (var n; !(n = t.__transition) || !(n = n[e]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${e} not found`);
  return n;
}
function Zd(t) {
  var e, n;
  t instanceof Ke ? (e = t._id, t = t._name) : (e = Us(), (n = jd).time = qo(), t = t == null ? null : t + "");
  for (var o = this._groups, i = o.length, r = 0; r < i; ++r)
    for (var s = o[r], l = s.length, a, c = 0; c < l; ++c)
      (a = s[c]) && eo(a, t, e, c, s, n || Ud(a, e));
  return new Ke(o, this._parents, t, e);
}
cn.prototype.interrupt = mc;
cn.prototype.transition = Zd;
const vn = (t) => () => t;
function Gd(t, {
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
function Ue(t, e, n) {
  this.k = t, this.x = e, this.y = n;
}
Ue.prototype = {
  constructor: Ue,
  scale: function(t) {
    return t === 1 ? this : new Ue(this.k * t, this.x, this.y);
  },
  translate: function(t, e) {
    return t === 0 & e === 0 ? this : new Ue(this.k, this.x + this.k * t, this.y + this.k * e);
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
var Fn = new Ue(1, 0, 0);
Ue.prototype;
function ro(t) {
  t.stopImmediatePropagation();
}
function zt(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function Kd(t) {
  return (!t.ctrlKey || t.type === "wheel") && !t.button;
}
function Jd() {
  var t = this;
  return t instanceof SVGElement ? (t = t.ownerSVGElement || t, t.hasAttribute("viewBox") ? (t = t.viewBox.baseVal, [[t.x, t.y], [t.x + t.width, t.y + t.height]]) : [[0, 0], [t.width.baseVal.value, t.height.baseVal.value]]) : [[0, 0], [t.clientWidth, t.clientHeight]];
}
function Ti() {
  return this.__zoom || Fn;
}
function Qd(t) {
  return -t.deltaY * (t.deltaMode === 1 ? 0.05 : t.deltaMode ? 1 : 2e-3) * (t.ctrlKey ? 10 : 1);
}
function eu() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function tu(t, e, n) {
  var o = t.invertX(e[0][0]) - n[0][0], i = t.invertX(e[1][0]) - n[1][0], r = t.invertY(e[0][1]) - n[0][1], s = t.invertY(e[1][1]) - n[1][1];
  return t.translate(
    i > o ? (o + i) / 2 : Math.min(0, o) || Math.max(0, i),
    s > r ? (r + s) / 2 : Math.min(0, r) || Math.max(0, s)
  );
}
function nu() {
  var t = Kd, e = Jd, n = tu, o = Qd, i = eu, r = [0, 1 / 0], s = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], l = 250, a = lc, c = Kn("start", "zoom", "end"), d, f, u, h = 500, p = 150, g = 0, w = 10;
  function m(_) {
    _.property("__zoom", Ti).on("wheel.zoom", v, { passive: !1 }).on("mousedown.zoom", P).on("dblclick.zoom", I).filter(i).on("touchstart.zoom", x).on("touchmove.zoom", y).on("touchend.zoom touchcancel.zoom", q).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  m.transform = function(_, L, A, O) {
    var S = _.selection ? _.selection() : _;
    S.property("__zoom", Ti), _ !== S ? D(_, L, A, O) : S.interrupt().each(function() {
      M(this, arguments).event(O).start().zoom(null, typeof L == "function" ? L.apply(this, arguments) : L).end();
    });
  }, m.scaleBy = function(_, L, A, O) {
    m.scaleTo(_, function() {
      var S = this.__zoom.k, k = typeof L == "function" ? L.apply(this, arguments) : L;
      return S * k;
    }, A, O);
  }, m.scaleTo = function(_, L, A, O) {
    m.transform(_, function() {
      var S = e.apply(this, arguments), k = this.__zoom, N = A == null ? b(S) : typeof A == "function" ? A.apply(this, arguments) : A, U = k.invert(N), J = typeof L == "function" ? L.apply(this, arguments) : L;
      return n(C(E(k, J), N, U), S, s);
    }, A, O);
  }, m.translateBy = function(_, L, A, O) {
    m.transform(_, function() {
      return n(this.__zoom.translate(
        typeof L == "function" ? L.apply(this, arguments) : L,
        typeof A == "function" ? A.apply(this, arguments) : A
      ), e.apply(this, arguments), s);
    }, null, O);
  }, m.translateTo = function(_, L, A, O, S) {
    m.transform(_, function() {
      var k = e.apply(this, arguments), N = this.__zoom, U = O == null ? b(k) : typeof O == "function" ? O.apply(this, arguments) : O;
      return n(Fn.translate(U[0], U[1]).scale(N.k).translate(
        typeof L == "function" ? -L.apply(this, arguments) : -L,
        typeof A == "function" ? -A.apply(this, arguments) : -A
      ), k, s);
    }, O, S);
  };
  function E(_, L) {
    return L = Math.max(r[0], Math.min(r[1], L)), L === _.k ? _ : new Ue(L, _.x, _.y);
  }
  function C(_, L, A) {
    var O = L[0] - A[0] * _.k, S = L[1] - A[1] * _.k;
    return O === _.x && S === _.y ? _ : new Ue(_.k, O, S);
  }
  function b(_) {
    return [(+_[0][0] + +_[1][0]) / 2, (+_[0][1] + +_[1][1]) / 2];
  }
  function D(_, L, A, O) {
    _.on("start.zoom", function() {
      M(this, arguments).event(O).start();
    }).on("interrupt.zoom end.zoom", function() {
      M(this, arguments).event(O).end();
    }).tween("zoom", function() {
      var S = this, k = arguments, N = M(S, k).event(O), U = e.apply(S, k), J = A == null ? b(U) : typeof A == "function" ? A.apply(S, k) : A, oe = Math.max(U[1][0] - U[0][0], U[1][1] - U[0][1]), K = S.__zoom, se = typeof L == "function" ? L.apply(S, k) : L, le = a(K.invert(J).concat(oe / K.k), se.invert(J).concat(oe / se.k));
      return function(ce) {
        if (ce === 1) ce = se;
        else {
          var te = le(ce), R = oe / te[2];
          ce = new Ue(R, J[0] - te[0] * R, J[1] - te[1] * R);
        }
        N.zoom(null, ce);
      };
    });
  }
  function M(_, L, A) {
    return !A && _.__zooming || new T(_, L);
  }
  function T(_, L) {
    this.that = _, this.args = L, this.active = 0, this.sourceEvent = null, this.extent = e.apply(_, L), this.taps = 0;
  }
  T.prototype = {
    event: function(_) {
      return _ && (this.sourceEvent = _), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(_, L) {
      return this.mouse && _ !== "mouse" && (this.mouse[1] = L.invert(this.mouse[0])), this.touch0 && _ !== "touch" && (this.touch0[1] = L.invert(this.touch0[0])), this.touch1 && _ !== "touch" && (this.touch1[1] = L.invert(this.touch1[0])), this.that.__zoom = L, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(_) {
      var L = Re(this.that).datum();
      c.call(
        _,
        this.that,
        new Gd(_, {
          sourceEvent: this.sourceEvent,
          target: m,
          transform: this.that.__zoom,
          dispatch: c
        }),
        L
      );
    }
  };
  function v(_, ...L) {
    if (!t.apply(this, arguments)) return;
    var A = M(this, L).event(_), O = this.__zoom, S = Math.max(r[0], Math.min(r[1], O.k * Math.pow(2, o.apply(this, arguments)))), k = We(_);
    if (A.wheel)
      (A.mouse[0][0] !== k[0] || A.mouse[0][1] !== k[1]) && (A.mouse[1] = O.invert(A.mouse[0] = k)), clearTimeout(A.wheel);
    else {
      if (O.k === S) return;
      A.mouse = [k, O.invert(k)], Ln(this), A.start();
    }
    zt(_), A.wheel = setTimeout(N, p), A.zoom("mouse", n(C(E(O, S), A.mouse[0], A.mouse[1]), A.extent, s));
    function N() {
      A.wheel = null, A.end();
    }
  }
  function P(_, ...L) {
    if (u || !t.apply(this, arguments)) return;
    var A = _.currentTarget, O = M(this, L, !0).event(_), S = Re(_.view).on("mousemove.zoom", J, !0).on("mouseup.zoom", oe, !0), k = We(_, A), N = _.clientX, U = _.clientY;
    $s(_.view), ro(_), O.mouse = [k, this.__zoom.invert(k)], Ln(this), O.start();
    function J(K) {
      if (zt(K), !O.moved) {
        var se = K.clientX - N, le = K.clientY - U;
        O.moved = se * se + le * le > g;
      }
      O.event(K).zoom("mouse", n(C(O.that.__zoom, O.mouse[0] = We(K, A), O.mouse[1]), O.extent, s));
    }
    function oe(K) {
      S.on("mousemove.zoom mouseup.zoom", null), Ds(K.view, O.moved), zt(K), O.event(K).end();
    }
  }
  function I(_, ...L) {
    if (t.apply(this, arguments)) {
      var A = this.__zoom, O = We(_.changedTouches ? _.changedTouches[0] : _, this), S = A.invert(O), k = A.k * (_.shiftKey ? 0.5 : 2), N = n(C(E(A, k), O, S), e.apply(this, L), s);
      zt(_), l > 0 ? Re(this).transition().duration(l).call(D, N, O, _) : Re(this).call(m.transform, N, O, _);
    }
  }
  function x(_, ...L) {
    if (t.apply(this, arguments)) {
      var A = _.touches, O = A.length, S = M(this, L, _.changedTouches.length === O).event(_), k, N, U, J;
      for (ro(_), N = 0; N < O; ++N)
        U = A[N], J = We(U, this), J = [J, this.__zoom.invert(J), U.identifier], S.touch0 ? !S.touch1 && S.touch0[2] !== J[2] && (S.touch1 = J, S.taps = 0) : (S.touch0 = J, k = !0, S.taps = 1 + !!d);
      d && (d = clearTimeout(d)), k && (S.taps < 2 && (f = J[0], d = setTimeout(function() {
        d = null;
      }, h)), Ln(this), S.start());
    }
  }
  function y(_, ...L) {
    if (this.__zooming) {
      var A = M(this, L).event(_), O = _.changedTouches, S = O.length, k, N, U, J;
      for (zt(_), k = 0; k < S; ++k)
        N = O[k], U = We(N, this), A.touch0 && A.touch0[2] === N.identifier ? A.touch0[0] = U : A.touch1 && A.touch1[2] === N.identifier && (A.touch1[0] = U);
      if (N = A.that.__zoom, A.touch1) {
        var oe = A.touch0[0], K = A.touch0[1], se = A.touch1[0], le = A.touch1[1], ce = (ce = se[0] - oe[0]) * ce + (ce = se[1] - oe[1]) * ce, te = (te = le[0] - K[0]) * te + (te = le[1] - K[1]) * te;
        N = E(N, Math.sqrt(ce / te)), U = [(oe[0] + se[0]) / 2, (oe[1] + se[1]) / 2], J = [(K[0] + le[0]) / 2, (K[1] + le[1]) / 2];
      } else if (A.touch0) U = A.touch0[0], J = A.touch0[1];
      else return;
      A.zoom("touch", n(C(N, U, J), A.extent, s));
    }
  }
  function q(_, ...L) {
    if (this.__zooming) {
      var A = M(this, L).event(_), O = _.changedTouches, S = O.length, k, N;
      for (ro(_), u && clearTimeout(u), u = setTimeout(function() {
        u = null;
      }, h), k = 0; k < S; ++k)
        N = O[k], A.touch0 && A.touch0[2] === N.identifier ? delete A.touch0 : A.touch1 && A.touch1[2] === N.identifier && delete A.touch1;
      if (A.touch1 && !A.touch0 && (A.touch0 = A.touch1, delete A.touch1), A.touch0) A.touch0[1] = this.__zoom.invert(A.touch0[0]);
      else if (A.end(), A.taps === 2 && (N = We(N, this), Math.hypot(f[0] - N[0], f[1] - N[1]) < w)) {
        var U = Re(this).on("dblclick.zoom");
        U && U.apply(this, arguments);
      }
    }
  }
  return m.wheelDelta = function(_) {
    return arguments.length ? (o = typeof _ == "function" ? _ : vn(+_), m) : o;
  }, m.filter = function(_) {
    return arguments.length ? (t = typeof _ == "function" ? _ : vn(!!_), m) : t;
  }, m.touchable = function(_) {
    return arguments.length ? (i = typeof _ == "function" ? _ : vn(!!_), m) : i;
  }, m.extent = function(_) {
    return arguments.length ? (e = typeof _ == "function" ? _ : vn([[+_[0][0], +_[0][1]], [+_[1][0], +_[1][1]]]), m) : e;
  }, m.scaleExtent = function(_) {
    return arguments.length ? (r[0] = +_[0], r[1] = +_[1], m) : [r[0], r[1]];
  }, m.translateExtent = function(_) {
    return arguments.length ? (s[0][0] = +_[0][0], s[1][0] = +_[1][0], s[0][1] = +_[0][1], s[1][1] = +_[1][1], m) : [[s[0][0], s[0][1]], [s[1][0], s[1][1]]];
  }, m.constrain = function(_) {
    return arguments.length ? (n = _, m) : n;
  }, m.duration = function(_) {
    return arguments.length ? (l = +_, m) : l;
  }, m.interpolate = function(_) {
    return arguments.length ? (a = _, m) : a;
  }, m.on = function() {
    var _ = c.on.apply(c, arguments);
    return _ === c ? m : _;
  }, m.clickDistance = function(_) {
    return arguments.length ? (g = (_ = +_) * _, m) : Math.sqrt(g);
  }, m.tapDistance = function(_) {
    return arguments.length ? (w = +_, m) : w;
  }, m;
}
function Ai(t) {
  const { pannable: e, zoomable: n, isLocked: o, noPanClassName: i, noWheelClassName: r, isTouchSelectionMode: s, isPanKeyHeld: l, panOnDrag: a } = t;
  return (c) => {
    if (o?.() || i && c.target?.closest?.("." + i) || c.type === "wheel" && r && c.target?.closest?.("." + r) || !n && c.type === "wheel") return !1;
    if (c.type === "touchstart") {
      const d = !c.touches || c.touches.length < 2;
      if (s?.() && d || !e && !l?.() && d || !n && !d) return !1;
    }
    if (c.type === "mousedown") {
      if (l?.()) return !0;
      if (!e) return !1;
      if (Array.isArray(a))
        return a.includes(c.button);
      if (a === !1) return !1;
    }
    return !0;
  };
}
function ou(t, e) {
  const {
    onTransformChange: n,
    minZoom: o = 0.5,
    maxZoom: i = 2,
    pannable: r = !0,
    zoomable: s = !0
  } = e, l = Re(t);
  let a = !1;
  const c = e.panActivationKeyCode !== void 0 ? e.panActivationKeyCode : "Space", d = (T) => {
    c && T.code === c && (a = !0, t.style.cursor = "grab");
  }, f = (T) => {
    c && T.code === c && (a = !1, t.style.cursor = "");
  }, u = () => {
    a = !1, t.style.cursor = "";
  };
  c && (window.addEventListener("keydown", d), window.addEventListener("keyup", f), window.addEventListener("blur", u));
  const h = nu().scaleExtent([o, i]).on("start", (T) => {
    if (!T.sourceEvent) return;
    a && (t.style.cursor = "grabbing");
    const { x: v, y: P, k: I } = T.transform;
    e.onMoveStart?.({ x: v, y: P, zoom: I });
  }).on("zoom", (T) => {
    const { x: v, y: P, k: I } = T.transform;
    n({ x: v, y: P, zoom: I }), T.sourceEvent && e.onMove?.({ x: v, y: P, zoom: I });
  }).on("end", (T) => {
    if (!T.sourceEvent) return;
    a && (t.style.cursor = "grab");
    const { x: v, y: P, k: I } = T.transform;
    e.onMoveEnd?.({ x: v, y: P, zoom: I });
  });
  e.translateExtent && h.translateExtent(e.translateExtent), h.filter(Ai({
    pannable: r,
    zoomable: s,
    isLocked: e.isLocked,
    noPanClassName: e.noPanClassName,
    noWheelClassName: e.noWheelClassName,
    isTouchSelectionMode: e.isTouchSelectionMode,
    isPanKeyHeld: () => a,
    panOnDrag: e.panOnDrag
  })), l.call(h), e.zoomOnDoubleClick === !1 && l.on("dblclick.zoom", null);
  let p = e.panOnScroll ?? !1, g = e.panOnScrollDirection ?? "both", w = e.panOnScrollSpeed ?? 1, m = !1;
  const E = e.zoomActivationKeyCode !== void 0 ? e.zoomActivationKeyCode : null, C = (T) => {
    E && T.code === E && (m = !0);
  }, b = (T) => {
    E && T.code === E && (m = !1);
  }, D = () => {
    m = !1;
  };
  E && (window.addEventListener("keydown", C), window.addEventListener("keyup", b), window.addEventListener("blur", D));
  const M = (T) => {
    if (e.isLocked?.()) return;
    const v = T.ctrlKey || T.metaKey || m;
    if (!(p ? !v : T.shiftKey)) return;
    T.preventDefault(), T.stopPropagation();
    const I = w;
    let x = 0, y = 0;
    g !== "horizontal" && (y = -T.deltaY * I), g !== "vertical" && (x = -T.deltaX * I, T.shiftKey && T.deltaX === 0 && g === "both" && (x = -T.deltaY * I, y = 0)), e.onScrollPan?.(x, y);
  };
  return t.addEventListener("wheel", M, { passive: !1, capture: !0 }), {
    setViewport(T, v) {
      const P = v?.duration ?? 0, I = Fn.translate(T.x ?? 0, T.y ?? 0).scale(T.zoom ?? 1);
      P > 0 ? l.transition().duration(P).call(h.transform, I) : l.call(h.transform, I);
    },
    getTransform() {
      return t.__zoom ?? Fn;
    },
    update(T) {
      if ((T.minZoom !== void 0 || T.maxZoom !== void 0) && h.scaleExtent([
        T.minZoom ?? o,
        T.maxZoom ?? i
      ]), T.pannable !== void 0 || T.zoomable !== void 0) {
        const v = T.pannable ?? r, P = T.zoomable ?? s;
        h.filter(Ai({
          pannable: v,
          zoomable: P,
          isLocked: e.isLocked,
          noPanClassName: e.noPanClassName,
          noWheelClassName: e.noWheelClassName,
          isTouchSelectionMode: e.isTouchSelectionMode,
          isPanKeyHeld: () => a,
          panOnDrag: e.panOnDrag
        }));
      }
      T.panOnScroll !== void 0 && (p = T.panOnScroll), T.panOnScrollDirection !== void 0 && (g = T.panOnScrollDirection), T.panOnScrollSpeed !== void 0 && (w = T.panOnScrollSpeed);
    },
    destroy() {
      t.removeEventListener("wheel", M, { capture: !0 }), c && (window.removeEventListener("keydown", d), window.removeEventListener("keyup", f), window.removeEventListener("blur", u)), E && (window.removeEventListener("keydown", C), window.removeEventListener("keyup", b), window.removeEventListener("blur", D)), l.on(".zoom", null);
    }
  };
}
function Js(t, e, n, o) {
  return {
    x: (t - o.left - n.x) / n.zoom,
    y: (e - o.top - n.y) / n.zoom
  };
}
function iu(t, e, n, o) {
  return {
    x: t * n.zoom + n.x + o.left,
    y: e * n.zoom + n.y + o.top
  };
}
const we = 150, ve = 50;
function to(t, e, n, o, i) {
  if (i % 360 === 0) return { x: t, y: e, width: n, height: o };
  const r = i * Math.PI / 180, s = Math.abs(Math.cos(r)), l = Math.abs(Math.sin(r)), a = n * s + o * l, c = n * l + o * s, d = t + n / 2, f = e + o / 2;
  return { x: d - a / 2, y: f - c / 2, width: a, height: c };
}
function Nt(t, e) {
  if (t.length === 0)
    return { x: 0, y: 0, width: 0, height: 0 };
  let n = 1 / 0, o = 1 / 0, i = -1 / 0, r = -1 / 0;
  for (const s of t) {
    const l = s.dimensions?.width ?? we, a = s.dimensions?.height ?? ve, c = Rt(s, e), d = s.rotation ? to(c.x, c.y, l, a, s.rotation) : { x: c.x, y: c.y, width: l, height: a };
    n = Math.min(n, d.x), o = Math.min(o, d.y), i = Math.max(i, d.x + d.width), r = Math.max(r, d.y + d.height);
  }
  return {
    x: n,
    y: o,
    width: i - n,
    height: r - o
  };
}
function su(t, e, n) {
  const o = e.x + e.width, i = e.y + e.height;
  return t.filter((r) => {
    const s = r.dimensions?.width ?? we, l = r.dimensions?.height ?? ve, a = Rt(r, n), c = r.rotation ? to(a.x, a.y, s, l, r.rotation) : { x: a.x, y: a.y, width: s, height: l }, d = c.x + c.width, f = c.y + c.height;
    return !(d < e.x || c.x > o || f < e.y || c.y > i);
  });
}
function ru(t, e, n) {
  const o = e.x + e.width, i = e.y + e.height;
  return t.filter((r) => {
    const s = r.dimensions?.width ?? we, l = r.dimensions?.height ?? ve, a = Rt(r, n), c = r.rotation ? to(a.x, a.y, s, l, r.rotation) : { x: a.x, y: a.y, width: s, height: l };
    return c.x >= e.x && c.y >= e.y && c.x + c.width <= o && c.y + c.height <= i;
  });
}
function zn(t, e, n, o, i, r = 0.1) {
  const s = Math.max(t.width, 1), l = Math.max(t.height, 1), a = s * (1 + r), c = l * (1 + r), d = e / a, f = n / c, u = Math.min(Math.max(Math.min(d, f), o), i), h = { x: t.x + s / 2, y: t.y + l / 2 }, p = e / 2 - h.x * u, g = n / 2 - h.y * u;
  return { x: p, y: g, zoom: u };
}
function au(t, e, n, o) {
  const i = 1 / t.zoom;
  return {
    minX: (0 - t.x) * i - o,
    minY: (0 - t.y) * i - o,
    maxX: (e - t.x) * i + o,
    maxY: (n - t.y) * i + o
  };
}
function Rt(t, e) {
  if (!t.position) return { x: 0, y: 0 };
  const n = t.nodeOrigin ?? e ?? [0, 0], o = t.dimensions?.width ?? we, i = t.dimensions?.height ?? ve;
  return {
    x: t.position.x - o * n[0],
    y: t.position.y - i * n[1]
  };
}
let Qs = !1;
function er(t) {
  Qs = t;
}
function B(t, e, n) {
  if (!Qs) return;
  const o = `%c[AlpineFlow:${t}]`, i = lu(t);
  n !== void 0 ? console.log(o, i, e, n) : console.log(o, i, e);
}
function lu(t) {
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
const nn = "#64748b", Ko = "#d4d4d8", tr = "#ef4444", cu = "2", du = "6 3", Ni = 1.2, Ao = 0.2, Mn = 5, Ii = 25;
function ao(t) {
  return JSON.parse(JSON.stringify(t));
}
class uu {
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
    this._suspendDepth > 0 || (this.past.push(ao(e)), this.future = [], this.past.length > this.maxSize && this.past.shift());
  }
  undo(e) {
    return this.past.length === 0 ? null : (this.future.push(ao(e)), this.past.pop());
  }
  redo(e) {
    return this.future.length === 0 ? null : (this.past.push(ao(e)), this.future.pop());
  }
  get canUndo() {
    return this.past.length > 0;
  }
  get canRedo() {
    return this.future.length > 0;
  }
}
const fu = 16;
function hu() {
  return typeof requestAnimationFrame == "function" ? {
    request: (t) => requestAnimationFrame(t),
    cancel: (t) => cancelAnimationFrame(t)
  } : {
    request: (t) => setTimeout(() => t(performance.now()), fu),
    cancel: (t) => clearTimeout(t)
  };
}
class nr {
  constructor() {
    this._scheduler = hu(), this._entries = [], this._postTickCallbacks = [], this._frameId = null, this._running = !1;
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
const On = new nr(), pu = {
  linear: md,
  easeIn: yd,
  easeOut: wd,
  easeInOut: vd,
  easeCubicIn: _d,
  easeCubicOut: bd,
  easeCubicInOut: Zs,
  easeCircIn: Ld,
  easeCircOut: Md,
  easeCircInOut: Td,
  easeSinIn: xd,
  easeSinOut: Ed,
  easeSinInOut: Sd,
  easeExpoIn: Cd,
  easeExpoOut: Pd,
  easeExpoInOut: kd,
  easeBounce: Hn,
  easeBounceIn: zd,
  easeBounceInOut: Od,
  easeElastic: qd,
  easeElasticIn: Yd,
  easeElasticInOut: Wd,
  easeBack: Xd,
  easeBackIn: Vd,
  easeBackOut: Bd
};
function or(t) {
  const e = t ?? "auto";
  return e === !1 ? !1 : e === !0 ? !0 : typeof globalThis < "u" && globalThis.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches === !0;
}
function Vn(t) {
  return typeof t == "function" ? t : pu[t ?? "easeInOut"];
}
function Ge(t, e, n) {
  return t + (e - t) * n;
}
function Jo(t, e, n) {
  return So(t, e)(n);
}
function on(t) {
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
const $i = /^(-?\d+\.?\d*)(px|em|rem|%|vh|vw|pt|cm|mm|in|ex|ch)?$/, Di = /^(#|rgb|hsl)/;
function ir(t, e, n) {
  const o = {}, i = /* @__PURE__ */ new Set([...Object.keys(t), ...Object.keys(e)]);
  for (const r of i) {
    const s = t[r], l = e[r];
    if (s === void 0) {
      o[r] = l;
      continue;
    }
    if (l === void 0) {
      o[r] = s;
      continue;
    }
    const a = $i.exec(s), c = $i.exec(l);
    if (a && c) {
      const d = parseFloat(a[1]), f = parseFloat(c[1]), u = c[2] ?? "", h = Ge(d, f, n);
      o[r] = u ? `${h}${u}` : String(h);
      continue;
    }
    if (Di.test(s) && Di.test(l)) {
      o[r] = Jo(s, l, n);
      continue;
    }
    o[r] = n < 0.5 ? s : l;
  }
  return o;
}
function gu(t, e, n, o) {
  let i = Ge(t.zoom, e.zoom, n);
  return o?.minZoom !== void 0 && (i = Math.max(i, o.minZoom)), o?.maxZoom !== void 0 && (i = Math.min(i, o.maxZoom)), {
    x: Ge(t.x, e.x, n),
    y: Ge(t.y, e.y, n),
    zoom: i
  };
}
class mu {
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
class yu {
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
const Ot = {
  stiffness: 180,
  damping: 12,
  mass: 1,
  restVelocity: 0.01,
  restDisplacement: 0.01
};
function sr(t, e, n) {
  if (n <= 0)
    return;
  const o = e.stiffness ?? Ot.stiffness, i = e.damping ?? Ot.damping, r = e.mass ?? Ot.mass, s = t.value - t.target, l = (-o * s - i * t.velocity) / r;
  t.velocity += l * n, t.value += t.velocity * n, Math.abs(t.velocity) < (e.restVelocity ?? Ot.restVelocity) && Math.abs(t.value - t.target) < (e.restDisplacement ?? Ot.restDisplacement) && (t.value = t.target, t.velocity = 0, t.settled = !0);
}
const Ri = {
  timeConstant: 350,
  restVelocity: 0.5
};
function Qo(t, e, n) {
  if (n <= 0)
    return;
  const o = e.timeConstant ?? Ri.timeConstant, i = Math.exp(-n * 1e3 / o);
  t.velocity *= i, t.value += t.velocity * n, Math.abs(t.velocity) < Ri.restVelocity && (t.velocity = 0, t.settled = !0, t.target = t.value);
}
function ei(t) {
  const e = t.lastIndexOf("."), n = t.lastIndexOf(":"), o = Math.max(e, n);
  if (o < 0) return null;
  const i = t.slice(o + 1);
  return i.length === 0 || i.length > 6 ? null : i;
}
function rr(t, e, n, o) {
  if (n <= 0)
    return;
  Qo(t, {
    velocity: t.velocity,
    power: e.power,
    timeConstant: e.timeConstant
  }, n);
  const i = o ? ei(o) : null;
  if (e.bounds && o) {
    const r = e.bounds[o] ?? (i ? e.bounds[i] : void 0);
    if (r) {
      const [s, l] = r, a = (e.bounceStiffness ?? 200) / 500, c = (e.bounceDamping ?? 40) / 100, d = a * (1 - c);
      t.value < s ? (t.value = s, t.velocity = Math.abs(t.velocity) * d, t.settled = !1) : t.value > l && (t.value = l, t.velocity = -Math.abs(t.velocity) * d, t.settled = !1);
    }
  }
  if (t.settled && e.snapTo?.length && o) {
    let r = t.value, s = 1 / 0;
    for (const l of e.snapTo) {
      const a = l[o] ?? (i ? l[i] : void 0);
      if (a !== void 0) {
        const c = Math.abs(t.value - a);
        c < s && (s = c, r = a);
      }
    }
    t.value = r;
  }
}
function ar(t, e, n, o) {
  const i = ei(o), r = e.values.map(
    (p) => p[o] ?? (i ? p[i] : void 0) ?? t.value
  );
  if (r.length < 2) {
    t.value = r[0] ?? t.value, t.settled = !0;
    return;
  }
  const s = e.offsets ?? r.map((p, g) => g / (r.length - 1)), l = Math.max(0, Math.min(1, n));
  let a = 0;
  for (let p = 0; p < s.length - 1; p++)
    l >= s[p] && (a = p);
  const c = s[a], d = s[a + 1] ?? 1, f = d > c ? (l - c) / (d - c) : 1, u = r[a], h = r[a + 1] ?? r[a];
  t.value = u + (h - u) * Math.max(0, Math.min(1, f)), l >= 1 && (t.value = r[r.length - 1], t.settled = !0);
}
const Hi = {
  gentle: { type: "spring", stiffness: 120, damping: 14 },
  wobbly: { type: "spring", stiffness: 180, damping: 12 },
  stiff: { type: "spring", stiffness: 300, damping: 30 },
  slow: { type: "spring", stiffness: 60, damping: 15 },
  molasses: { type: "spring", stiffness: 40, damping: 30 }
}, Fi = {
  smooth: { type: "decay", velocity: 0, power: 0.6, timeConstant: 400 },
  snappy: { type: "decay", velocity: 0, power: 1.2, timeConstant: 200 }
}, zi = {
  momentum: { type: "inertia", velocity: 0, power: 0.8, timeConstant: 700 },
  rails: { type: "inertia", velocity: 0, bounceStiffness: 500, bounceDamping: 40 }
};
function lr(t) {
  if (typeof t != "string")
    return t;
  const [e, n] = t.split(".");
  if (!n)
    return null;
  switch (e) {
    case "spring":
      return Hi[n] ? { ...Hi[n] } : null;
    case "decay":
      return Fi[n] ? { ...Fi[n] } : null;
    case "inertia":
      return zi[n] ? { ...zi[n] } : null;
    default:
      return null;
  }
}
function Oi(t) {
  return typeof t != "string" ? !1 : /^(#|rgb|hsl)/.test(t);
}
function wu(t, e, n) {
  return typeof t == "number" && typeof e == "number" ? Ge(t, e, n) : Oi(t) && Oi(e) ? Jo(t, e, n) : n < 0.5 ? t : e;
}
class vu {
  constructor(e) {
    this._ownership = /* @__PURE__ */ new Map(), this._groups = /* @__PURE__ */ new Set(), this._nextGroupId = 0, this._registry = new mu(), this._activeTransaction = null, this._engine = e;
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
    const e = new yu();
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
      startAt: l,
      onStart: a,
      onProgress: c,
      onComplete: d,
      tag: f,
      tags: u,
      while: h,
      whileStopMode: p = "jump-end",
      motion: g,
      maxDuration: w = 5e3
    } = n, m = Vn(i), E = g ? lr(g) : void 0;
    for (const _ of e) {
      const L = this._ownership.get(_.key);
      if (L && !L.stopped) {
        const A = L.currentValues.get(_.key);
        A !== void 0 && (_.from = A), L.entries = L.entries.filter((O) => O.key !== _.key), L.entries.length === 0 && this._stop(L, "superseded");
      }
    }
    if (this._activeTransaction && this._activeTransaction.state === "active")
      for (const _ of e)
        this._activeTransaction.captureProperty(_.key, _.from, _.apply);
    if (o <= 0) {
      const _ = /* @__PURE__ */ new Map(), L = /* @__PURE__ */ new Map();
      for (const S of e)
        _.set(S.key, S.from), L.set(S.key, S.to);
      a?.();
      for (const S of e)
        S.apply(S.to);
      const A = [...f ? [f] : [], ...u ?? []], O = {
        _tags: A.length > 0 ? A : void 0,
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
          return L;
        },
        finished: Promise.resolve(),
        get _snapshot() {
          return _;
        },
        get _target() {
          return L;
        }
      };
      return this._registry.register(O), queueMicrotask(() => this._registry.unregister(O)), this._activeTransaction && this._activeTransaction.state === "active" && this._activeTransaction.trackHandle(O), d?.(), O;
    }
    const C = /* @__PURE__ */ new Map(), b = /* @__PURE__ */ new Map();
    for (const _ of e)
      C.set(_.key, _.from), b.set(_.key, _.to);
    let D;
    if (E) {
      D = /* @__PURE__ */ new Map();
      for (const _ of e) {
        if (typeof _.from != "number" || typeof _.to != "number") {
          console.warn(
            `[AlpineFlow] motion: requires numeric properties. "${_.key}" is non-numeric; snapping to target.`
          ), _.apply(_.to);
          continue;
        }
        let L = 0;
        if (E.type === "decay" || E.type === "inertia") {
          const A = E.velocity;
          if (typeof A == "number")
            L = A;
          else if (A && typeof A == "object") {
            const S = A, k = ei(_.key);
            L = S[_.key] ?? (k ? S[k] ?? 0 : 0);
          }
          const O = E.power ?? 0.8;
          L *= O;
        }
        D.set(_.key, {
          value: _.from,
          velocity: L,
          target: _.to,
          settled: !1
        });
      }
      D.size === 0 && (D = void 0);
    }
    const M = s === "ping-pong" ? "reverse" : s, T = l === "end" ? "backward" : "forward";
    let v;
    const P = new Promise((_) => {
      v = _;
    }), I = {
      _id: this._nextGroupId++,
      entries: [...e],
      engineHandle: null,
      startTime: 0,
      pausedElapsed: null,
      _resumeNeeded: !1,
      direction: T,
      duration: o,
      easingFn: m,
      loop: M,
      onStart: a,
      startFired: !1,
      onProgress: c,
      onComplete: d,
      resolve: v,
      stopped: !1,
      isFinished: !1,
      currentValues: /* @__PURE__ */ new Map(),
      _lastElapsed: 0,
      _lastTickWallTime: 0,
      snapshot: C,
      target: b,
      _currentFinished: P,
      whilePredicate: h,
      whileStopMode: p,
      motionConfig: D ? E : void 0,
      physicsStates: D,
      maxDuration: w,
      isPhysics: !!D,
      _prevElapsed: 0
    };
    if (l === "end")
      for (const _ of I.entries)
        _.apply(_.to), I.currentValues.set(_.key, _.to);
    else
      for (const _ of I.entries)
        I.currentValues.set(_.key, _.from);
    for (const _ of e)
      this._ownership.set(_.key, I);
    this._groups.add(I);
    const x = this._engine.register((_) => this._tick(I, _), r);
    I.engineHandle = x;
    const y = [...f ? [f] : [], ...u ?? []], q = {
      _tags: y.length > 0 ? y : void 0,
      pause: () => this._pause(I),
      resume: () => this._resume(I),
      stop: (_) => this._stop(I, _?.mode ?? "jump-end"),
      reverse: () => this._reverse(I),
      play: () => this._play(I),
      playForward: () => this._playDirection(I, "forward"),
      playBackward: () => this._playDirection(I, "backward"),
      restart: (_) => this._restart(I, _),
      get direction() {
        return I.direction;
      },
      get isFinished() {
        return I.isFinished;
      },
      get currentValue() {
        return I.currentValues;
      },
      get finished() {
        return I._currentFinished;
      },
      get _snapshot() {
        return I.snapshot;
      },
      get _target() {
        return I.target;
      }
    };
    return this._registry.register(q), I._handle = q, this._activeTransaction && this._activeTransaction.state === "active" && this._activeTransaction.trackHandle(q), q;
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
        const l = o / e.duration, a = Math.floor(l), c = l - a;
        i = a % 2 === 0 ? c : 1 - c;
      } else
        i = o % e.duration / e.duration;
    const r = e.direction === "backward" ? 1 - i : i, s = e.easingFn(r);
    for (const l of e.entries) {
      const a = wu(l.from, l.to, s);
      e.currentValues.set(l.key, a), l.apply(a);
    }
    if (e.onProgress?.(r), !e.loop && i >= 1) {
      for (const l of e.entries) {
        const a = e.direction === "backward" ? l.from : l.to;
        l.apply(a), e.currentValues.set(l.key, a);
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
              sr(d, e.motionConfig, i);
              break;
            case "decay":
              Qo(d, e.motionConfig, i);
              break;
            case "inertia":
              rr(d, e.motionConfig, i, c.key);
              break;
            case "keyframes": {
              const f = n - e.startTime, u = e.motionConfig.duration ?? e.maxDuration, h = Math.min(f / u, 1);
              ar(d, e.motionConfig, h, c.key);
              break;
            }
          }
          e.currentValues.set(c.key, d.value), c.apply(d.value);
        }
        d.settled || (s = !1);
      }
    }
    const l = n - e.startTime, a = Math.min(l / e.maxDuration, 1);
    if (e.onProgress?.(a), l >= e.maxDuration) {
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
const cr = /* @__PURE__ */ new Map();
function _u(t, e) {
  cr.set(t, e);
}
function lo(t) {
  return t.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function sn(t) {
  return typeof t == "string" ? { type: t } : t;
}
function rn(t, e) {
  return `${e}__${t.type}__${(t.color ?? Ko).replace(/[^a-zA-Z0-9]/g, "_")}`;
}
function Bn(t, e) {
  const n = lo(t.color ?? Ko), o = Number(t.width ?? 12.5), i = Number(t.height ?? 12.5), r = Number.isFinite(o) && o > 0 ? o : 12.5, s = Number.isFinite(i) && i > 0 ? i : 12.5, l = lo(t.orient ?? "auto-start-reverse"), a = lo(e);
  if (t.type === "arrow")
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
  if (t.type === "arrowclosed")
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
  const c = cr.get(t.type);
  return c ? c({ id: a, color: n, width: r, height: s, orient: l }) : Bn({ ...t, type: "arrowclosed" }, e);
}
const ut = 200, ft = 150, bu = 1.2, Vt = "http://www.w3.org/2000/svg";
function xu(t, e) {
  const { getState: n, setViewport: o, config: i } = e, r = i.minimapPosition ?? "bottom-right", s = i.minimapMaskColor, l = i.minimapNodeColor, a = document.createElement("div");
  a.className = `flow-minimap flow-minimap-${r}`;
  const c = document.createElementNS(Vt, "svg");
  c.setAttribute("width", String(ut)), c.setAttribute("height", String(ft));
  const d = document.createElementNS(Vt, "rect");
  d.classList.add("flow-minimap-bg"), d.setAttribute("width", String(ut)), d.setAttribute("height", String(ft));
  const f = document.createElementNS(Vt, "g");
  f.classList.add("flow-minimap-nodes");
  const u = document.createElementNS(Vt, "path");
  u.classList.add("flow-minimap-mask"), s && u.setAttribute("fill", s), u.setAttribute("fill-rule", "evenodd"), c.appendChild(d), c.appendChild(f), c.appendChild(u), a.appendChild(c), t.appendChild(a);
  let h = { x: 0, y: 0, width: 0, height: 0 }, p = 1;
  function g() {
    const x = n();
    if (h = Nt(x.nodes.filter((y) => !y.hidden), i.nodeOrigin), h.width === 0 && h.height === 0) {
      p = 1;
      return;
    }
    p = Math.max(
      h.width / ut,
      h.height / ft
    ) * bu;
  }
  function w(x) {
    return typeof l == "function" ? l(x) : l;
  }
  function m() {
    const x = n();
    g(), f.innerHTML = "";
    const y = (ut - h.width / p) / 2, q = (ft - h.height / p) / 2;
    for (const _ of x.nodes) {
      if (_.hidden) continue;
      const L = document.createElementNS(Vt, "rect"), A = (_.dimensions?.width ?? we) / p, O = (_.dimensions?.height ?? ve) / p, S = (_.position.x - h.x) / p + y, k = (_.position.y - h.y) / p + q;
      L.setAttribute("x", String(S)), L.setAttribute("y", String(k)), L.setAttribute("width", String(A)), L.setAttribute("height", String(O)), L.setAttribute("rx", "2");
      const N = w(_);
      N && (L.style.fill = N), f.appendChild(L);
    }
    E();
  }
  function E() {
    const x = n();
    if (h.width === 0 && h.height === 0) {
      u.setAttribute("d", "");
      return;
    }
    const y = (ut - h.width / p) / 2, q = (ft - h.height / p) / 2, _ = (-x.viewport.x / x.viewport.zoom - h.x) / p + y, L = (-x.viewport.y / x.viewport.zoom - h.y) / p + q, A = x.containerWidth / x.viewport.zoom / p, O = x.containerHeight / x.viewport.zoom / p, S = `M0,0 H${ut} V${ft} H0 Z`, k = `M${_},${L} h${A} v${O} h${-A} Z`;
    u.setAttribute("d", `${S} ${k}`);
  }
  let C = !1;
  function b(x, y) {
    const q = (ut - h.width / p) / 2, _ = (ft - h.height / p) / 2, L = (x - q) * p + h.x, A = (y - _) * p + h.y;
    return { x: L, y: A };
  }
  function D(x) {
    const y = c.getBoundingClientRect(), q = x.clientX - y.left, _ = x.clientY - y.top, L = n(), A = b(q, _), O = -A.x * L.viewport.zoom + L.containerWidth / 2, S = -A.y * L.viewport.zoom + L.containerHeight / 2;
    o({ x: O, y: S, zoom: L.viewport.zoom });
  }
  function M(x) {
    i.minimapPannable && (C = !0, c.setPointerCapture(x.pointerId), D(x));
  }
  function T(x) {
    C && D(x);
  }
  function v(x) {
    C && (C = !1, c.releasePointerCapture(x.pointerId));
  }
  c.addEventListener("pointerdown", M), c.addEventListener("pointermove", T), c.addEventListener("pointerup", v);
  function P(x) {
    if (!i.minimapZoomable)
      return;
    x.preventDefault();
    const y = n(), q = i.minZoom ?? 0.5, _ = i.maxZoom ?? 2, L = x.deltaY > 0 ? 0.9 : 1.1, A = Math.min(Math.max(y.viewport.zoom * L, q), _);
    o({ zoom: A });
  }
  c.addEventListener("wheel", P, { passive: !1 });
  function I() {
    c.removeEventListener("pointerdown", M), c.removeEventListener("pointermove", T), c.removeEventListener("pointerup", v), c.removeEventListener("wheel", P), a.remove();
  }
  return { render: m, updateViewport: E, destroy: I };
}
const Eu = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>', Su = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>', Cu = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>', Vi = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></svg>', Pu = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>', ku = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>';
function Lu(t, e) {
  const {
    position: n,
    orientation: o,
    showZoom: i,
    showFitView: r,
    showInteractive: s,
    showResetPanels: l,
    external: a,
    onZoomIn: c,
    onZoomOut: d,
    onFitView: f,
    onToggleInteractive: u,
    onResetPanels: h
  } = e, p = document.createElement("div"), g = [
    "flow-controls",
    `flow-controls-${o}`
  ];
  a ? g.push("flow-controls-external") : g.push(`flow-controls-${n}`), p.className = g.join(" "), p.setAttribute("role", "toolbar"), p.setAttribute("aria-label", "Flow controls");
  let w = null;
  if (i) {
    const C = Bt(Eu, "Zoom in", c), b = Bt(Su, "Zoom out", d);
    p.appendChild(C), p.appendChild(b);
  }
  if (r) {
    const C = Bt(Cu, "Fit view", f);
    p.appendChild(C);
  }
  if (s && (w = Bt(Vi, "Toggle interactivity", u), p.appendChild(w)), l) {
    const C = Bt(ku, "Reset panels", h);
    p.appendChild(C);
  }
  p.addEventListener("mousedown", (C) => C.stopPropagation()), p.addEventListener("pointerdown", (C) => C.stopPropagation()), p.addEventListener("wheel", (C) => C.stopPropagation(), { passive: !1 }), t.appendChild(p);
  function m(C) {
    if (w) {
      w.innerHTML = C.isInteractive ? Vi : Pu;
      const b = C.isInteractive ? "Lock interactivity" : "Unlock interactivity";
      w.title = b, w.setAttribute("aria-label", b);
    }
  }
  function E() {
    p.remove();
  }
  return { update: m, destroy: E };
}
function Bt(t, e, n) {
  const o = document.createElement("button");
  return o.type = "button", o.innerHTML = t, o.title = e, o.setAttribute("aria-label", e), o.addEventListener("click", n), o;
}
const Bi = 5;
function Mu(t) {
  const e = document.createElement("div");
  e.className = "flow-selection-box", t.appendChild(e);
  let n = !1, o = 0, i = 0, r = 0, s = 0;
  function l(u, h, p = "partial") {
    o = u, i = h, r = u, s = h, n = !0, e.style.left = `${u}px`, e.style.top = `${h}px`, e.style.width = "0px", e.style.height = "0px", e.classList.remove("flow-selection-partial", "flow-selection-full"), e.classList.add("flow-selection-box-active", `flow-selection-${p}`);
  }
  function a(u, h) {
    if (!n)
      return;
    r = u, s = h;
    const p = Math.min(o, r), g = Math.min(i, s), w = Math.abs(r - o), m = Math.abs(s - i);
    e.style.left = `${p}px`, e.style.top = `${g}px`, e.style.width = `${w}px`, e.style.height = `${m}px`;
  }
  function c(u) {
    if (!n)
      return null;
    n = !1, e.classList.remove("flow-selection-box-active"), e.classList.remove("flow-selection-partial", "flow-selection-full");
    const h = Math.abs(r - o), p = Math.abs(s - i);
    if (h < Bi && p < Bi)
      return null;
    const g = Math.min(o, r), w = Math.min(i, s), m = (g - u.x) / u.zoom, E = (w - u.y) / u.zoom, C = h / u.zoom, b = p / u.zoom;
    return { x: m, y: E, width: C, height: b };
  }
  function d() {
    return n;
  }
  function f() {
    e.remove();
  }
  return { start: l, update: a, end: c, isActive: d, destroy: f };
}
const Xi = 3;
function Tu(t) {
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
    h * h + p * p < Xi * Xi || (i.push({ x: d, y: f }), n.setAttribute("points", i.map((g) => `${g.x},${g.y}`).join(" ")));
  }
  function l(d) {
    if (!o || (o = !1, e.classList.remove("flow-lasso-active", "flow-lasso-partial", "flow-lasso-full"), n.setAttribute("points", ""), i.length < 3))
      return null;
    const f = i.map((u) => ({
      x: (u.x - d.x) / d.zoom,
      y: (u.y - d.y) / d.zoom
    }));
    return i = [], f;
  }
  function a() {
    return o;
  }
  function c() {
    e.remove();
  }
  return { start: r, update: s, end: l, isActive: a, destroy: c };
}
function ti(t, e, n) {
  if (n.length < 3) return !1;
  let o = !1;
  for (let i = 0, r = n.length - 1; i < n.length; r = i++) {
    const s = n[i].x, l = n[i].y, a = n[r].x, c = n[r].y;
    l > e != c > e && t < (a - s) * (e - l) / (c - l) + s && (o = !o);
  }
  return o;
}
function Au(t, e, n, o, i, r, s, l) {
  const a = n - t, c = o - e, d = s - i, f = l - r, u = a * f - c * d;
  if (Math.abs(u) < 1e-10) return !1;
  const h = i - t, p = r - e, g = (h * f - p * d) / u, w = (h * c - p * a) / u;
  return g >= 0 && g <= 1 && w >= 0 && w <= 1;
}
function Nu(t, e) {
  const n = e.x, o = e.y, i = e.x + e.width, r = e.y + e.height, s = n + e.width / 2, l = o + e.height / 2;
  if (ti(s, l, t)) return !0;
  for (const c of t)
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
  for (let c = 0, d = t.length - 1; c < t.length; d = c++)
    for (const [f, u, h, p] of a)
      if (Au(t[d].x, t[d].y, t[c].x, t[c].y, f, u, h, p))
        return !0;
  return !1;
}
function dr(t) {
  const e = t.dimensions?.width ?? we, n = t.dimensions?.height ?? ve;
  return t.rotation ? to(t.position.x, t.position.y, e, n, t.rotation) : { x: t.position.x, y: t.position.y, width: e, height: n };
}
function Iu(t, e) {
  return e.length < 3 ? [] : t.filter((n) => {
    if (n.hidden || n.selectable === !1) return !1;
    const o = dr(n);
    return Nu(e, o);
  });
}
function $u(t, e) {
  return e.length < 3 ? [] : t.filter((n) => {
    if (n.hidden || n.selectable === !1) return !1;
    const o = dr(n);
    return [
      { x: o.x, y: o.y },
      { x: o.x + o.width, y: o.y },
      { x: o.x + o.width, y: o.y + o.height },
      { x: o.x, y: o.y + o.height }
    ].every((r) => ti(r.x, r.y, e));
  });
}
function Du(t, e) {
  return e.filter((n) => n.source === t || n.target === t);
}
function No(t, e, n) {
  const o = new Set(
    n.filter((i) => i.source === t).map((i) => i.target)
  );
  return e.filter((i) => o.has(i.id));
}
function Ru(t, e, n) {
  const o = new Set(
    n.filter((i) => i.target === t).map((i) => i.source)
  );
  return e.filter((i) => o.has(i.id));
}
function Hu(t, e, n) {
  if (t === e) return !0;
  const o = /* @__PURE__ */ new Map();
  for (const s of n) {
    let l = o.get(s.source);
    l || (l = [], o.set(s.source, l)), l.push(s.target);
  }
  const i = [e], r = /* @__PURE__ */ new Set();
  for (; i.length > 0; ) {
    const s = i.pop();
    if (s === t) return !0;
    if (r.has(s)) continue;
    r.add(s);
    const l = o.get(s);
    if (l)
      for (const a of l)
        r.has(a) || i.push(a);
  }
  return !1;
}
function Fu(t, e, n, o = !1) {
  return n.some((i) => o ? i.source === t && i.target === e : i.source === t && i.target === e || i.source === e && i.target === t);
}
function zu(t, e, n) {
  const o = new Map(e.map((a) => [a.id, a])), i = new Set(
    n.map((a) => `${a.source}|${a.target}|${a.sourceHandle ?? ""}|${a.targetHandle ?? ""}`)
  ), r = [], s = /* @__PURE__ */ new Set();
  let l = 0;
  for (const a of t) {
    if (o.get(a)?.reconnectOnDelete === !1) continue;
    const d = n.filter(
      (u) => u.target === a && !t.has(u.source)
    ), f = n.filter(
      (u) => u.source === a && !t.has(u.target)
    );
    if (!(d.length === 0 || f.length === 0))
      for (const u of d)
        for (const h of f) {
          if (u.source === h.target) continue;
          const p = `${u.source}|${h.target}|${u.sourceHandle ?? ""}|${h.targetHandle ?? ""}`;
          if (i.has(p) || s.has(p)) continue;
          const g = {
            id: `reconnect-${u.source}-${h.target}-${l++}`,
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
function je(t, e, n) {
  return !(t.source === t.target || e.some(
    (i) => i.source === t.source && i.target === t.target && i.sourceHandle === t.sourceHandle && i.targetHandle === t.targetHandle
  ) || n?.preventCycles && Hu(t.source, t.target, e));
}
const it = "_flowHandleValidate";
function Ou(t) {
  t.directive(
    "flow-handle-validate",
    (e, { expression: n }, { evaluate: o, effect: i, cleanup: r }) => {
      function s() {
        let l;
        try {
          l = o(n);
        } catch {
          const a = t.$data(e);
          a && typeof a[n] == "function" && (l = a[n]);
        }
        typeof l == "function" ? e[it] = l : (delete e[it], requestAnimationFrame(() => {
          const a = t.$data(e);
          a && typeof a[n] == "function" && (e[it] = a[n]);
        }));
      }
      i(() => {
        s();
      }), r(() => {
        delete e[it];
      });
    }
  );
}
const gt = "_flowHandleLimit";
function Vu(t) {
  t.directive(
    "flow-handle-limit",
    (e, { expression: n }, { evaluate: o, effect: i, cleanup: r }) => {
      i(() => {
        const s = Number(o(n));
        s > 0 ? e[gt] = s : delete e[gt];
      }), r(() => {
        delete e[gt];
      });
    }
  );
}
const an = "_flowHandleConnectableStart", yt = "_flowHandleConnectableEnd";
function Bu(t) {
  t.directive(
    "flow-handle-connectable",
    (e, { expression: n, modifiers: o }, { evaluate: i, effect: r, cleanup: s }) => {
      const l = o.includes("start"), a = o.includes("end"), c = l || !l && !a, d = a || !l && !a;
      r(() => {
        const f = n ? !!i(n) : !0;
        c && (e[an] = f), d && (e[yt] = f);
      }), s(() => {
        delete e[an], delete e[yt];
      });
    }
  );
}
function un(t, e, n = !0) {
  return e !== void 0 ? e : t.locked ? !1 : n;
}
function ur(t) {
  return un(t, t.draggable);
}
function Xu(t) {
  return un(t, t.deletable);
}
function ot(t) {
  return un(t, t.connectable);
}
function Io(t) {
  return un(t, t.selectable);
}
function Yi(t) {
  return un(t, t.resizable);
}
function It(t, e, n, o, i, r, s) {
  const l = n - t, a = o - e, c = i - n, d = r - o;
  if (l === 0 && c === 0 || a === 0 && d === 0)
    return `L${n},${o}`;
  const f = Math.sqrt(l * l + a * a), u = Math.sqrt(c * c + d * d), h = Math.min(s, f / 2, u / 2), p = n - l / f * h, g = o - a / f * h, w = n + c / u * h, m = o + d / u * h;
  return `L${p},${g} Q${n},${o} ${w},${m}`;
}
function fn({
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
function _n(t, e) {
  return t >= 0 ? 0.5 * t : e * 25 * Math.sqrt(-t);
}
function Yu({
  sourceX: t,
  sourceY: e,
  sourcePosition: n = "bottom",
  targetX: o,
  targetY: i,
  targetPosition: r = "top",
  curvature: s = 0.25
}) {
  const l = n === "left" || n === "right", a = r === "left" || r === "right", c = l ? t + (n === "right" ? 1 : -1) * _n(
    n === "right" ? o - t : t - o,
    s
  ) : t, d = l ? e : e + (n === "bottom" ? 1 : -1) * _n(
    n === "bottom" ? i - e : e - i,
    s
  ), f = a ? o + (r === "right" ? 1 : -1) * _n(
    r === "right" ? t - o : o - t,
    s
  ) : o, u = a ? i : i + (r === "bottom" ? 1 : -1) * _n(
    r === "bottom" ? e - i : i - e,
    s
  );
  return [c, d, f, u];
}
function Xn(t) {
  const { sourceX: e, sourceY: n, targetX: o, targetY: i } = t, [r, s, l, a] = Yu(t), c = `M${e},${n} C${r},${s} ${l},${a} ${o},${i}`, { x: d, y: f, offsetX: u, offsetY: h } = fn({ sourceX: e, sourceY: n, targetX: o, targetY: i });
  return {
    path: c,
    labelPosition: { x: d, y: f },
    labelOffsetX: u,
    labelOffsetY: h
  };
}
function fm({
  sourceX: t,
  sourceY: e,
  targetX: n,
  targetY: o
}) {
  const i = (t + n) / 2, r = `M${t},${e} C${i},${e} ${i},${o} ${n},${o}`, { x: s, y: l, offsetX: a, offsetY: c } = fn({ sourceX: t, sourceY: e, targetX: n, targetY: o });
  return {
    path: r,
    labelPosition: { x: s, y: l },
    labelOffsetX: a,
    labelOffsetY: c
  };
}
function qi(t) {
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
function qu(t, e, n, o, i, r, s) {
  const l = qi(n), a = qi(r), c = t + l.x * s, d = e + l.y * s, f = o + a.x * s, u = i + a.y * s, h = n === "left" || n === "right";
  if (h === (r === "left" || r === "right")) {
    const g = (c + f) / 2, w = (d + u) / 2;
    return h ? [
      [c, e],
      [g, e],
      [g, i],
      [f, i]
    ] : [
      [t, d],
      [t, w],
      [o, w],
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
function ln({
  sourceX: t,
  sourceY: e,
  sourcePosition: n = "bottom",
  targetX: o,
  targetY: i,
  targetPosition: r = "top",
  borderRadius: s = 5,
  offset: l = 10
}) {
  const a = qu(
    t,
    e,
    n,
    o,
    i,
    r,
    l
  );
  let c = `M${t},${e}`;
  for (let p = 0; p < a.length; p++) {
    const [g, w] = a[p];
    if (s > 0 && p > 0 && p < a.length - 1) {
      const [m, E] = p === 1 ? [t, e] : a[p - 1], [C, b] = a[p + 1];
      c += ` ${It(m, E, g, w, C, b, s)}`;
    } else
      c += ` L${g},${w}`;
  }
  c += ` L${o},${i}`;
  const { x: d, y: f, offsetX: u, offsetY: h } = fn({ sourceX: t, sourceY: e, targetX: o, targetY: i });
  return {
    path: c,
    labelPosition: { x: d, y: f },
    labelOffsetX: u,
    labelOffsetY: h
  };
}
function Wu(t) {
  return ln({ ...t, borderRadius: 0 });
}
function fr({
  sourceX: t,
  sourceY: e,
  targetX: n,
  targetY: o
}) {
  const i = `M${t},${e} L${n},${o}`, { x: r, y: s, offsetX: l, offsetY: a } = fn({ sourceX: t, sourceY: e, targetX: n, targetY: o });
  return {
    path: i,
    labelPosition: { x: r, y: s },
    labelOffsetX: l,
    labelOffsetY: a
  };
}
const et = 40;
function ju(t, e, n, o) {
  let i = 0, r = 0;
  const s = t - n.left, l = n.right - t, a = e - n.top, c = n.bottom - e;
  return s < et && s >= 0 ? i = -o * (1 - s / et) : l < et && l >= 0 && (i = o * (1 - l / et)), a < et && a >= 0 ? r = -o * (1 - a / et) : c < et && c >= 0 && (r = o * (1 - c / et)), { dx: i, dy: r };
}
function hr(t) {
  const { container: e, speed: n, onPan: o } = t;
  let i = null, r = 0, s = 0, l = !1;
  function a() {
    if (!l)
      return;
    const c = e.getBoundingClientRect(), { dx: d, dy: f } = ju(r, s, c, n);
    if ((d !== 0 || f !== 0) && o(d, f) === !0) {
      l = !1, i = null;
      return;
    }
    i = requestAnimationFrame(a);
  }
  return {
    start() {
      l || t.isLocked?.() || (l = !0, i = requestAnimationFrame(a));
    },
    stop() {
      l = !1, i !== null && (cancelAnimationFrame(i), i = null);
    },
    updatePointer(c, d) {
      r = c, s = d;
    },
    destroy() {
      this.stop();
    }
  };
}
function kt(t) {
  const e = t.connectionLineType ?? "straight", o = {
    stroke: (t.invalid ? (t.containerEl ? getComputedStyle(t.containerEl).getPropertyValue("--flow-connection-line-invalid").trim() : "") || tr : null) ?? t.connectionLineStyle?.stroke ?? ((t.containerEl ? getComputedStyle(t.containerEl).getPropertyValue("--flow-edge-stroke-selected").trim() : "") || nn),
    strokeWidth: t.connectionLineStyle?.strokeWidth ?? Number(cu),
    strokeDasharray: t.connectionLineStyle?.strokeDasharray ?? du
  }, i = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  i.style.cssText = "position:absolute;top:0;left:0;width:1px;height:1px;overflow:visible;pointer-events:none;z-index:1000;";
  let r = null;
  function s(a) {
    const c = {
      ...a,
      connectionLineType: e,
      connectionLineStyle: o
    };
    if (t.connectionLine) {
      r && r.remove(), r = t.connectionLine(c), i.appendChild(r);
      return;
    }
    r || (r = document.createElementNS("http://www.w3.org/2000/svg", "path"), r.setAttribute("fill", "none"), i.appendChild(r)), r.setAttribute("stroke", o.stroke), r.setAttribute("stroke-width", String(o.strokeWidth)), r.setAttribute("stroke-dasharray", o.strokeDasharray);
    const { fromX: d, fromY: f, toX: u, toY: h } = a;
    let p;
    switch (e) {
      case "bezier": {
        p = Xn({ sourceX: d, sourceY: f, targetX: u, targetY: h }).path;
        break;
      }
      case "smoothstep": {
        p = ln({ sourceX: d, sourceY: f, targetX: u, targetY: h }).path;
        break;
      }
      case "step": {
        p = Wu({ sourceX: d, sourceY: f, targetX: u, targetY: h }).path;
        break;
      }
      default: {
        p = fr({ sourceX: d, sourceY: f, targetX: u, targetY: h }).path;
        break;
      }
    }
    r.setAttribute("d", p);
  }
  function l() {
    i.remove();
  }
  return { svg: i, update: s, destroy: l };
}
function Ut(t) {
  if (t.connectionSnapRadius <= 0)
    return { element: null, position: t.cursorFlowPos };
  const e = t.connectionMode === "loose" ? "[data-flow-handle-type]" : `[data-flow-handle-type="${t.handleType}"]`, n = t.containerEl.querySelectorAll(e);
  let o = null, i = t.cursorFlowPos, r = t.connectionSnapRadius;
  return n.forEach((s) => {
    const l = s, a = l.closest("[x-flow-node]");
    if (!a || a.dataset.flowNodeId === t.excludeNodeId || t.targetNodeId && a.dataset.flowNodeId !== t.targetNodeId) return;
    const c = a.dataset.flowNodeId;
    if (c) {
      const p = t.getNode(c);
      if (p && !ot(p)) return;
    }
    const d = t.handleType === "target" ? yt : an;
    if (l[d] === !1) return;
    const f = l.getBoundingClientRect();
    if (f.width === 0 && f.height === 0) return;
    const u = t.toFlowPosition(
      f.left + f.width / 2,
      f.top + f.height / 2
    ), h = Math.sqrt(
      (t.cursorFlowPos.x - u.x) ** 2 + (t.cursorFlowPos.y - u.y) ** 2
    );
    h < r && (r = h, o = l, i = u);
  }), { element: o, position: i };
}
function Yn(t, e, n, o) {
  if (e._config?.autoPanOnConnect === !1) return null;
  const i = hr({
    container: t,
    speed: e._config?.autoPanSpeed ?? 15,
    onPan(r, s) {
      const l = { x: e.viewport.x, y: e.viewport.y };
      e._panZoom?.setViewport({
        x: e.viewport.x - r,
        y: e.viewport.y - s,
        zoom: e.viewport.zoom
      });
      const a = l.x - e.viewport.x, c = l.y - e.viewport.y;
      return a === 0 && c === 0;
    }
  });
  return i.updatePointer(n, o), i.start(), i;
}
let bn = 0;
function Oe(t, e) {
  const n = t.querySelector(
    `[data-flow-node-id="${CSS.escape(e.source)}"]`
  );
  if (n) {
    const i = n.querySelector(
      `[data-flow-handle-id="${CSS.escape(e.sourceHandle ?? "source")}"]`
    );
    if (i?.[it] && !i[it](e))
      return !1;
  }
  const o = t.querySelector(
    `[data-flow-node-id="${CSS.escape(e.target)}"]`
  );
  if (o) {
    const i = o.querySelector(
      `[data-flow-handle-id="${CSS.escape(e.targetHandle ?? "target")}"]`
    );
    if (i?.[it] && !i[it](e))
      return !1;
  }
  return !0;
}
function Ve(t, e, n) {
  const o = t.querySelector(
    `[data-flow-node-id="${CSS.escape(e.source)}"]`
  );
  if (o) {
    const r = o.querySelector(
      `[data-flow-handle-id="${CSS.escape(e.sourceHandle ?? "source")}"]`
    );
    if (r?.[gt] && n.filter(
      (l) => l.source === e.source && (l.sourceHandle ?? "source") === (e.sourceHandle ?? "source")
    ).length >= r[gt])
      return !1;
  }
  const i = t.querySelector(
    `[data-flow-node-id="${CSS.escape(e.target)}"]`
  );
  if (i) {
    const r = i.querySelector(
      `[data-flow-handle-id="${CSS.escape(e.targetHandle ?? "target")}"]`
    );
    if (r?.[gt] && n.filter(
      (l) => l.target === e.target && (l.targetHandle ?? "target") === (e.targetHandle ?? "target")
    ).length >= r[gt])
      return !1;
  }
  return !0;
}
function Zt(t, e, n, o, i) {
  const r = i ? o.edges.filter((l) => l.id !== i) : o.edges, s = t.querySelectorAll('[data-flow-handle-type="target"]');
  for (const l of s) {
    const c = l.closest("[x-flow-node]")?.dataset.flowNodeId;
    if (!c) continue;
    const d = l.dataset.flowHandleId ?? "target";
    if (l[yt] === !1) {
      l.classList.add("flow-handle-invalid"), l.classList.remove("flow-handle-valid", "flow-handle-limit-reached");
      continue;
    }
    const f = {
      source: e,
      sourceHandle: n,
      target: c,
      targetHandle: d
    }, h = o.getNode(c)?.connectable !== !1 && je(f, r, { preventCycles: o._config?.preventCycles }), p = h && Ve(t, f, r);
    p && Oe(t, f) && (!o._config?.isValidConnection || o._config.isValidConnection(f)) ? (l.classList.add("flow-handle-valid"), l.classList.remove("flow-handle-invalid", "flow-handle-limit-reached")) : (l.classList.add("flow-handle-invalid"), l.classList.remove("flow-handle-valid"), h && !p ? l.classList.add("flow-handle-limit-reached") : l.classList.remove("flow-handle-limit-reached"));
  }
}
function Pe(t) {
  const e = t.querySelectorAll('[data-flow-handle-type="target"]');
  for (const n of e)
    n.classList.remove("flow-handle-valid", "flow-handle-invalid", "flow-handle-limit-reached");
}
function Uu(t) {
  t.directive(
    "flow-handle",
    (e, { value: n, modifiers: o, expression: i }, { evaluate: r, effect: s, cleanup: l }) => {
      const a = n === "source" ? "source" : "target", c = o.includes("top"), d = o.includes("bottom"), f = o.includes("left"), u = o.includes("right"), h = c || d || f || u;
      let p;
      c && f ? p = "top-left" : c && u ? p = "top-right" : d && f ? p = "bottom-left" : d && u ? p = "bottom-right" : c ? p = "top" : u ? p = "right" : d ? p = "bottom" : f ? p = "left" : p = e.getAttribute("data-flow-handle-position") ?? (a === "source" ? "bottom" : "top");
      let g, w = !1;
      if (i) {
        const C = r(i);
        C && typeof C == "object" && !Array.isArray(C) ? (g = C.id || e.getAttribute("data-flow-handle-id") || a, C.position && (p = C.position, w = !0)) : g = C || e.getAttribute("data-flow-handle-id") || a;
      } else
        g = e.getAttribute("data-flow-handle-id") || a;
      if (o.includes("hidden") && (e.style.display = "none"), e.dataset.flowHandleType = a, e.dataset.flowHandlePosition = p, e.dataset.flowHandleId = g, h && (e.dataset.flowHandleExplicit = "true"), w && i && (e.dataset.flowHandleExplicit = "true", s(() => {
        const C = r(i);
        C && typeof C == "object" && !Array.isArray(C) && C.position && (e.dataset.flowHandlePosition = C.position);
      })), !h && !w) {
        const C = () => {
          const D = e.closest("[x-flow-node]")?.dataset.flowNodeId;
          if (!D) return;
          const M = e.closest("[x-data]");
          return M ? t.$data(M)?.getNode?.(D) : void 0;
        };
        s(() => {
          const b = C();
          if (!b) return;
          const D = a === "source" ? b.sourcePosition : b.targetPosition;
          D && (e.dataset.flowHandlePosition = D);
        });
      }
      e.classList.add("flow-handle", `flow-handle-${a}`);
      const m = () => {
        const C = e.closest("[x-flow-node]");
        return C ? C.getAttribute("data-flow-node-id") ?? null : null;
      }, E = () => {
        const C = e.closest("[x-data]");
        return C ? t.$data(C) : null;
      };
      if (a === "source") {
        let C = null;
        const b = (T) => {
          T.preventDefault(), T.stopPropagation();
          const v = E(), P = e.closest("[x-flow-node]");
          if (!v || !P || v._animationLocked) return;
          const I = P.dataset.flowNodeId;
          if (!I) return;
          const x = v.getNode(I);
          if (x && !ot(x) || e[an] === !1) return;
          const y = T.clientX, q = T.clientY;
          let _ = !1;
          if (v.pendingConnection && v._config?.connectOnClick !== !1) {
            v._emit("connect-end", {
              connection: null,
              source: v.pendingConnection.source,
              sourceHandle: v.pendingConnection.sourceHandle,
              position: { x: 0, y: 0 }
            }), v.pendingConnection = null, v._container?.classList.remove("flow-connecting");
            const X = e.closest(".flow-container");
            X && Pe(X);
          }
          let L = null, A = null, O = null, S = null, k = null;
          const N = v._config?.connectionSnapRadius ?? 20, U = e.closest(".flow-container");
          let J = 0, oe = 0, K = !1, se = /* @__PURE__ */ new Map();
          const le = () => {
            if (_ = !0, B("connection", `Connection drag started from node "${I}" handle "${g}"`), v._emit("connect-start", { source: I, sourceHandle: g }), !U) return;
            A = kt({
              connectionLineType: v._config?.connectionLineType,
              connectionLineStyle: v._config?.connectionLineStyle,
              connectionLine: v._config?.connectionLine,
              containerEl: U
            }), L = A.svg;
            const X = e.getBoundingClientRect(), W = U.getBoundingClientRect(), $ = v.viewport?.zoom || 1, j = v.viewport?.x || 0, ee = v.viewport?.y || 0;
            J = (X.left + X.width / 2 - W.left - j) / $, oe = (X.top + X.height / 2 - W.top - ee) / $, A.update({ fromX: J, fromY: oe, toX: J, toY: oe, source: I, sourceHandle: g });
            const V = U.querySelector(".flow-viewport");
            if (V && V.appendChild(L), v.pendingConnection = {
              source: I,
              sourceHandle: g,
              position: { x: J, y: oe }
            }, S = Yn(U, v, y, q), Zt(U, I, g, v), v._config?.onEdgeDrop) {
              const G = v._config.edgeDropPreview, F = G ? G({ source: I, sourceHandle: g }) : "New Node";
              if (F !== null) {
                k = document.createElement("div"), k.className = "flow-ghost-node";
                const Z = document.createElement("div");
                if (Z.className = "flow-ghost-handle", k.appendChild(Z), typeof F == "string") {
                  const ne = document.createElement("span");
                  ne.textContent = F, k.appendChild(ne);
                } else
                  k.appendChild(F);
                k.style.left = `${J}px`, k.style.top = `${oe}px`;
                const Y = U.querySelector(".flow-viewport");
                Y && Y.appendChild(k);
              }
            }
          }, ce = () => {
            const X = [...v.selectedNodes], W = [], $ = U.getBoundingClientRect(), j = v.viewport?.zoom || 1, ee = v.viewport?.x || 0, V = v.viewport?.y || 0;
            for (const G of X) {
              if (G === I) continue;
              const F = U?.querySelector(`[data-flow-node-id="${CSS.escape(G)}"]`)?.querySelector('[data-flow-handle-type="source"]');
              if (!F) continue;
              const Z = F.getBoundingClientRect();
              W.push({
                nodeId: G,
                handleId: F.dataset.flowHandleId ?? "source",
                pos: {
                  x: (Z.left + Z.width / 2 - $.left - ee) / j,
                  y: (Z.top + Z.height / 2 - $.top - V) / j
                }
              });
            }
            return W;
          }, te = (X) => {
            K = !0, A && (se.set(I, {
              line: A,
              sourceNodeId: I,
              sourceHandleId: g,
              sourcePos: { x: J, y: oe },
              valid: !0
            }), A = null);
            const W = ce(), $ = U.querySelector(".flow-viewport");
            for (const j of W) {
              const ee = kt({
                connectionLineType: v._config?.connectionLineType,
                connectionLineStyle: v._config?.connectionLineStyle,
                connectionLine: v._config?.connectionLine,
                containerEl: U
              });
              ee.update({
                fromX: j.pos.x,
                fromY: j.pos.y,
                toX: X.x,
                toY: X.y,
                source: j.nodeId,
                sourceHandle: j.handleId
              }), $ && $.appendChild(ee.svg), se.set(j.nodeId, {
                line: ee,
                sourceNodeId: j.nodeId,
                sourceHandleId: j.handleId,
                sourcePos: j.pos,
                valid: !0
              });
            }
          }, R = (X) => {
            if (!_) {
              const j = X.clientX - y, ee = X.clientY - q;
              if (Math.abs(j) >= Mn || Math.abs(ee) >= Mn) {
                if (le(), v._config?.multiConnect && v.selectedNodes.size > 1 && v.selectedNodes.has(I)) {
                  const V = v.screenToFlowPosition(X.clientX, X.clientY);
                  te(V);
                }
              } else
                return;
            }
            const W = v.screenToFlowPosition(X.clientX, X.clientY);
            if (K) {
              const j = Ut({
                containerEl: U,
                handleType: "target",
                excludeNodeId: I,
                cursorFlowPos: W,
                connectionSnapRadius: N,
                getNode: (F) => v.getNode(F),
                toFlowPosition: (F, Z) => v.screenToFlowPosition(F, Z),
                connectionMode: v._config?.connectionMode
              });
              j.element !== O && (O?.classList.remove("flow-handle-active"), j.element?.classList.add("flow-handle-active"), O = j.element);
              const V = j.element?.closest("[x-flow-node]")?.dataset.flowNodeId ?? null, G = j.element?.dataset.flowHandleId ?? "target", ie = v._config?.connectionLineStyle?.stroke ?? (getComputedStyle(U).getPropertyValue("--flow-edge-stroke-selected").trim() || nn);
              for (const F of se.values())
                if (F.line.update({
                  fromX: F.sourcePos.x,
                  fromY: F.sourcePos.y,
                  toX: j.position.x,
                  toY: j.position.y,
                  source: F.sourceNodeId,
                  sourceHandle: F.sourceHandleId
                }), j.element && V) {
                  const Z = {
                    source: F.sourceNodeId,
                    sourceHandle: F.sourceHandleId,
                    target: V,
                    targetHandle: G
                  }, ae = v.getNode(V)?.connectable !== !1 && F.sourceNodeId !== V && je(Z, v.edges, { preventCycles: v._config?.preventCycles }) && Ve(U, Z, v.edges) && Oe(U, Z) && (!v._config?.isValidConnection || v._config.isValidConnection(Z));
                  F.valid = ae;
                  const re = F.line.svg.querySelector("path");
                  if (re)
                    if (ae)
                      re.setAttribute("stroke", ie);
                    else {
                      const fe = getComputedStyle(U).getPropertyValue("--flow-connection-line-invalid").trim() || tr;
                      re.setAttribute("stroke", fe);
                    }
                } else {
                  F.valid = !0;
                  const Z = F.line.svg.querySelector("path");
                  Z && Z.setAttribute("stroke", ie);
                }
              v.pendingConnection = { ...v.pendingConnection, position: j.position }, S?.updatePointer(X.clientX, X.clientY);
              return;
            }
            const $ = Ut({
              containerEl: U,
              handleType: "target",
              excludeNodeId: I,
              cursorFlowPos: W,
              connectionSnapRadius: N,
              getNode: (j) => v.getNode(j),
              toFlowPosition: (j, ee) => v.screenToFlowPosition(j, ee)
            });
            $.element !== O && (O?.classList.remove("flow-handle-active"), $.element?.classList.add("flow-handle-active"), O = $.element), k ? $.element ? (k.style.display = "none", A?.update({ fromX: J, fromY: oe, toX: $.position.x, toY: $.position.y, source: I, sourceHandle: g })) : (k.style.display = "", k.style.left = `${W.x}px`, k.style.top = `${W.y}px`, A?.update({ fromX: J, fromY: oe, toX: W.x, toY: W.y, source: I, sourceHandle: g })) : A?.update({ fromX: J, fromY: oe, toX: $.position.x, toY: $.position.y, source: I, sourceHandle: g }), v.pendingConnection = { ...v.pendingConnection, position: $.position }, S?.updatePointer(X.clientX, X.clientY);
          }, Q = (X) => {
            if (S?.stop(), S = null, document.removeEventListener("pointermove", R), document.removeEventListener("pointerup", Q), C = null, K) {
              const ee = v.screenToFlowPosition(X.clientX, X.clientY);
              let V = O;
              V || (V = document.elementFromPoint(X.clientX, X.clientY)?.closest('[data-flow-handle-type="target"]'));
              const ie = V?.closest("[x-flow-node]")?.dataset.flowNodeId ?? null, F = V?.dataset.flowHandleId ?? "target", Z = [], Y = [], ne = [], H = [];
              if (V && ie) {
                const z = v.getNode(ie);
                for (const ae of se.values()) {
                  const re = {
                    source: ae.sourceNodeId,
                    sourceHandle: ae.sourceHandleId,
                    target: ie,
                    targetHandle: F
                  };
                  if (z?.connectable !== !1 && ae.sourceNodeId !== ie && je(re, v.edges, { preventCycles: v._config?.preventCycles }) && Ve(U, re, v.edges) && Oe(U, re) && (!v._config?.isValidConnection || v._config.isValidConnection(re))) {
                    const xe = `e-${ae.sourceNodeId}-${ie}-${Date.now()}-${bn++}`;
                    Z.push({ id: xe, ...re }), Y.push(re), H.push(ae);
                  } else
                    ne.push(ae);
                }
              } else
                ne.push(...se.values());
              for (const z of H)
                z.line.destroy();
              if (Z.length > 0) {
                v.addEdges(Z);
                for (const z of Y)
                  v._emit("connect", { connection: z });
                v._emit("multi-connect", { connections: Y });
              }
              ne.length > 0 && setTimeout(() => {
                for (const z of ne)
                  z.line.destroy();
              }, 100), O?.classList.remove("flow-handle-active"), v._emit("connect-end", {
                connection: Y.length > 0 ? Y[0] : null,
                source: I,
                sourceHandle: g,
                position: ee
              }), se.clear(), K = !1, Pe(U), v.pendingConnection = null, v._container?.classList.remove("flow-connecting");
              return;
            }
            if (!_) {
              v._config?.connectOnClick !== !1 && (B("connection", `Click-to-connect started from node "${I}" handle "${g}"`), v._emit("connect-start", { source: I, sourceHandle: g }), v.pendingConnection = {
                source: I,
                sourceHandle: g,
                position: { x: 0, y: 0 }
              }, v._container?.classList.add("flow-connecting"), Zt(U, I, g, v));
              return;
            }
            A?.destroy(), A = null, k?.remove(), k = null, O?.classList.remove("flow-handle-active"), Pe(U);
            const W = v.screenToFlowPosition(X.clientX, X.clientY), $ = { source: I, sourceHandle: g, position: W };
            let j = O;
            if (j || (j = document.elementFromPoint(X.clientX, X.clientY)?.closest('[data-flow-handle-type="target"]')), j) {
              const V = j.closest("[x-flow-node]")?.dataset.flowNodeId, G = j.dataset.flowHandleId ?? "target";
              if (V) {
                if (j[yt] === !1) {
                  B("connection", "Connection rejected (handle not connectable end)"), v._emit("connect-end", { connection: null, ...$ }), v.pendingConnection = null;
                  return;
                }
                const ie = v.getNode(V);
                if (ie && !ot(ie)) {
                  B("connection", `Connection rejected (target "${V}" not connectable)`), v._emit("connect-end", { connection: null, ...$ }), v.pendingConnection = null;
                  return;
                }
                const F = {
                  source: I,
                  sourceHandle: g,
                  target: V,
                  targetHandle: G
                };
                if (je(F, v.edges, { preventCycles: v._config?.preventCycles })) {
                  if (!Ve(U, F, v.edges)) {
                    B("connection", "Connection rejected (handle limit)", F), v._emit("connect-end", { connection: null, ...$ }), v.pendingConnection = null;
                    return;
                  }
                  if (!Oe(U, F)) {
                    B("connection", "Connection rejected (per-handle validator)", F), v._emit("connect-end", { connection: null, ...$ }), v.pendingConnection = null;
                    return;
                  }
                  if (v._config?.isValidConnection && !v._config.isValidConnection(F)) {
                    B("connection", "Connection rejected (custom validator)", F), v._emit("connect-end", { connection: null, ...$ }), v.pendingConnection = null;
                    return;
                  }
                  const Z = `e-${I}-${V}-${Date.now()}-${bn++}`;
                  v.addEdges({ id: Z, ...F }), B("connection", `Connection created: ${I} → ${V}`, F), v._emit("connect", { connection: F }), v._emit("connect-end", { connection: F, ...$ });
                } else
                  B("connection", "Connection rejected (invalid)", F), v._emit("connect-end", { connection: null, ...$ });
              } else
                v._emit("connect-end", { connection: null, ...$ });
            } else if (v._config?.onEdgeDrop) {
              const ee = {
                x: W.x - we / 2,
                y: W.y - ve / 2
              }, V = v._config.onEdgeDrop({
                source: I,
                sourceHandle: g,
                position: ee
              });
              if (V) {
                const G = {
                  source: I,
                  sourceHandle: g,
                  target: V.id,
                  targetHandle: "target"
                };
                if (!Ve(U, G, v.edges))
                  B("connection", "Edge drop: connection rejected (handle limit)"), v._emit("connect-end", { connection: null, ...$ });
                else if (!Oe(U, G))
                  B("connection", "Edge drop: connection rejected (per-handle validator)"), v._emit("connect-end", { connection: null, ...$ });
                else if (!v._config.isValidConnection || v._config.isValidConnection(G)) {
                  v.addNodes(V);
                  const ie = `e-${I}-${V.id}-${Date.now()}-${bn++}`;
                  v.addEdges({ id: ie, ...G }), B("connection", `Edge drop: created node "${V.id}" and edge`, G), v._emit("connect", { connection: G }), v._emit("connect-end", { connection: G, ...$ });
                } else
                  B("connection", "Edge drop: connection rejected by validator"), v._emit("connect-end", { connection: null, ...$ });
              } else
                B("connection", "Edge drop: callback returned null"), v._emit("connect-end", { connection: null, ...$ });
            } else
              B("connection", "Connection cancelled (no target)"), v._emit("connect-end", { connection: null, ...$ });
            v.pendingConnection = null;
          };
          document.addEventListener("pointermove", R), document.addEventListener("pointerup", Q), document.addEventListener("pointercancel", Q), C = () => {
            document.removeEventListener("pointermove", R), document.removeEventListener("pointerup", Q), document.removeEventListener("pointercancel", Q), S?.stop(), A?.destroy(), A = null, k?.remove(), k = null;
            for (const X of se.values())
              X.line.destroy();
            se.clear(), K = !1, O?.classList.remove("flow-handle-active"), Pe(U), v.pendingConnection = null, v._container?.classList.remove("flow-connecting");
          };
        };
        e.addEventListener("pointerdown", b);
        const D = () => {
          const T = E();
          if (!T?._pendingReconnection || T._pendingReconnection.draggedEnd !== "source") return;
          const v = m();
          if (v) {
            const P = T.getNode(v);
            if (P && !ot(P)) return;
          }
          e[an] !== !1 && e.classList.add("flow-handle-active");
        }, M = () => {
          e.classList.remove("flow-handle-active");
        };
        e.addEventListener("pointerenter", D), e.addEventListener("pointerleave", M), l(() => {
          C?.(), e.removeEventListener("pointerdown", b), e.removeEventListener("pointerenter", D), e.removeEventListener("pointerleave", M), e.classList.remove("flow-handle", `flow-handle-${a}`);
        });
      } else {
        const C = () => {
          const v = E();
          if (!v?.pendingConnection) return;
          const P = m();
          if (P) {
            const I = v.getNode(P);
            if (I && !ot(I)) return;
          }
          e[yt] !== !1 && e.classList.add("flow-handle-active");
        }, b = () => {
          e.classList.remove("flow-handle-active");
        };
        e.addEventListener("pointerenter", C), e.addEventListener("pointerleave", b);
        const D = (v) => {
          const P = E();
          if (!P?.pendingConnection || P._config?.connectOnClick === !1) return;
          v.preventDefault(), v.stopPropagation();
          const I = m();
          if (!I) return;
          if (e[yt] === !1) {
            B("connection", "Click-to-connect rejected (handle not connectable end)"), P._emit("connect-end", { connection: null, source: P.pendingConnection.source, sourceHandle: P.pendingConnection.sourceHandle, position: { x: 0, y: 0 } }), P.pendingConnection = null, P._container?.classList.remove("flow-connecting");
            const L = e.closest(".flow-container");
            L && Pe(L);
            return;
          }
          const x = P.getNode(I);
          if (x && !ot(x)) {
            B("connection", `Click-to-connect rejected (target "${I}" not connectable)`), P._emit("connect-end", { connection: null, source: P.pendingConnection.source, sourceHandle: P.pendingConnection.sourceHandle, position: { x: 0, y: 0 } }), P.pendingConnection = null, P._container?.classList.remove("flow-connecting");
            const L = e.closest(".flow-container");
            L && Pe(L);
            return;
          }
          const y = {
            source: P.pendingConnection.source,
            sourceHandle: P.pendingConnection.sourceHandle,
            target: I,
            targetHandle: g
          }, q = { source: P.pendingConnection.source, sourceHandle: P.pendingConnection.sourceHandle, position: { x: 0, y: 0 } };
          if (je(y, P.edges, { preventCycles: P._config?.preventCycles })) {
            const L = e.closest(".flow-container");
            if (L && !Ve(L, y, P.edges)) {
              B("connection", "Click-to-connect rejected (handle limit)", y), P._emit("connect-end", { connection: null, ...q }), P.pendingConnection = null, P._container?.classList.remove("flow-connecting"), Pe(L);
              return;
            }
            if (L && !Oe(L, y)) {
              B("connection", "Click-to-connect rejected (per-handle validator)", y), P._emit("connect-end", { connection: null, ...q }), P.pendingConnection = null, P._container?.classList.remove("flow-connecting"), L && Pe(L);
              return;
            }
            if (P._config?.isValidConnection && !P._config.isValidConnection(y)) {
              B("connection", "Click-to-connect rejected (custom validator)", y), P._emit("connect-end", { connection: null, ...q }), P.pendingConnection = null, P._container?.classList.remove("flow-connecting"), L && Pe(L);
              return;
            }
            const A = `e-${y.source}-${y.target}-${Date.now()}-${bn++}`;
            P.addEdges({ id: A, ...y }), B("connection", `Click-to-connect: ${y.source} → ${y.target}`, y), P._emit("connect", { connection: y }), P._emit("connect-end", { connection: y, ...q });
          } else
            B("connection", "Click-to-connect rejected (invalid)", y), P._emit("connect-end", { connection: null, ...q });
          P.pendingConnection = null, P._container?.classList.remove("flow-connecting");
          const _ = e.closest(".flow-container");
          _ && Pe(_);
        };
        e.addEventListener("click", D);
        let M = null;
        const T = (v) => {
          if (v.button !== 0) return;
          const P = E(), I = m();
          if (!P || !I || P._animationLocked || P._config?.edgesReconnectable === !1 || P._pendingReconnection) return;
          const x = P.edges.filter(
            (F) => F.target === I && (F.targetHandle ?? "target") === g
          );
          if (x.length === 0) return;
          const y = x.find((F) => F.selected) ?? (x.length === 1 ? x[0] : null);
          if (!y) return;
          const q = y.reconnectable ?? !0;
          if (q === !1 || q === "source") return;
          v.preventDefault(), v.stopPropagation();
          const _ = v.clientX, L = v.clientY;
          let A = !1, O = !1, S = null;
          const k = P._config?.connectionSnapRadius ?? 20, N = e.closest(".flow-container");
          if (!N) return;
          const U = N.querySelector(
            `[data-flow-node-id="${CSS.escape(y.source)}"]`
          ), J = y.sourceHandle ? `[data-flow-handle-id="${CSS.escape(y.sourceHandle)}"]` : '[data-flow-handle-type="source"]', oe = U?.querySelector(J), K = N.getBoundingClientRect(), se = P.viewport?.zoom || 1, le = P.viewport?.x || 0, ce = P.viewport?.y || 0;
          let te, R;
          if (oe) {
            const F = oe.getBoundingClientRect();
            te = (F.left + F.width / 2 - K.left - le) / se, R = (F.top + F.height / 2 - K.top - ce) / se;
          } else {
            const F = P.getNode(y.source);
            if (!F) return;
            const Z = F.dimensions?.width ?? we, Y = F.dimensions?.height ?? ve;
            te = F.position.x + Z / 2, R = F.position.y + Y;
          }
          let Q = null, X = null, W = null, $ = _, j = L;
          const ee = () => {
            A = !0;
            const F = N.querySelector(
              `[data-flow-edge-id="${y.id}"]`
            );
            F && F.classList.add("flow-edge-reconnecting"), P._emit("reconnect-start", { edge: y, handleType: "target" }), B("reconnect", `Reconnection drag started from target handle on edge "${y.id}"`), X = kt({
              connectionLineType: P._config?.connectionLineType,
              connectionLineStyle: P._config?.connectionLineStyle,
              connectionLine: P._config?.connectionLine,
              containerEl: N
            }), Q = X.svg;
            const Z = P.screenToFlowPosition(_, L);
            X.update({
              fromX: te,
              fromY: R,
              toX: Z.x,
              toY: Z.y,
              source: y.source,
              sourceHandle: y.sourceHandle
            });
            const Y = N.querySelector(".flow-viewport");
            Y && Y.appendChild(Q), P.pendingConnection = {
              source: y.source,
              sourceHandle: y.sourceHandle,
              position: Z
            }, P._pendingReconnection = {
              edge: y,
              draggedEnd: "target",
              anchorPosition: { x: te, y: R },
              position: Z
            }, W = Yn(N, P, $, j), Zt(N, y.source, y.sourceHandle ?? "source", P, y.id);
          }, V = (F) => {
            if ($ = F.clientX, j = F.clientY, !A) {
              Math.sqrt(
                (F.clientX - _) ** 2 + (F.clientY - L) ** 2
              ) >= Mn && ee();
              return;
            }
            const Z = P.screenToFlowPosition(F.clientX, F.clientY), Y = Ut({
              containerEl: N,
              handleType: "target",
              excludeNodeId: y.source,
              cursorFlowPos: Z,
              connectionSnapRadius: k,
              getNode: (ne) => P.getNode(ne),
              toFlowPosition: (ne, H) => P.screenToFlowPosition(ne, H)
            });
            Y.element !== S && (S?.classList.remove("flow-handle-active"), Y.element?.classList.add("flow-handle-active"), S = Y.element), X?.update({
              fromX: te,
              fromY: R,
              toX: Y.position.x,
              toY: Y.position.y,
              source: y.source,
              sourceHandle: y.sourceHandle
            }), P.pendingConnection && (P.pendingConnection = {
              ...P.pendingConnection,
              position: Y.position
            }), P._pendingReconnection && (P._pendingReconnection = {
              ...P._pendingReconnection,
              position: Y.position
            }), W?.updatePointer(F.clientX, F.clientY);
          }, G = () => {
            if (O) return;
            O = !0, document.removeEventListener("pointermove", V), document.removeEventListener("pointerup", ie), document.removeEventListener("pointercancel", ie), W?.stop(), W = null, X?.destroy(), X = null, Q = null, S?.classList.remove("flow-handle-active"), M = null;
            const F = N.querySelector(
              `[data-flow-edge-id="${y.id}"]`
            );
            F && F.classList.remove("flow-edge-reconnecting"), Pe(N), P.pendingConnection = null, P._pendingReconnection = null;
          }, ie = (F) => {
            if (!A) {
              G();
              return;
            }
            let Z = S;
            Z || (Z = document.elementFromPoint(F.clientX, F.clientY)?.closest('[data-flow-handle-type="target"]'));
            let Y = !1;
            if (Z) {
              const H = Z.closest("[x-flow-node]")?.dataset.flowNodeId, z = Z.dataset.flowHandleId;
              if (H && P.getNode(H)?.connectable !== !1) {
                const re = {
                  source: y.source,
                  sourceHandle: y.sourceHandle,
                  target: H,
                  targetHandle: z
                }, fe = P.edges.filter(
                  (ge) => ge.id !== y.id
                );
                if (je(re, fe, { preventCycles: P._config?.preventCycles })) {
                  if (!Ve(N, re, fe))
                    B("reconnect", "Reconnection rejected (handle limit)", re);
                  else if (!Oe(N, re))
                    B("reconnect", "Reconnection rejected (per-handle validator)", re);
                  else if (!P._config?.isValidConnection || P._config.isValidConnection(re)) {
                    const ge = { ...y };
                    P._captureHistory?.(), y.target = re.target, y.targetHandle = re.targetHandle, Y = !0, B("reconnect", `Edge "${y.id}" reconnected (target)`, re), P._emit("reconnect", { oldEdge: ge, newConnection: re });
                  }
                }
              }
            }
            Y || B("reconnect", `Edge "${y.id}" reconnection cancelled — snapping back`), P._emit("reconnect-end", { edge: y, successful: Y }), G();
          };
          document.addEventListener("pointermove", V), document.addEventListener("pointerup", ie), document.addEventListener("pointercancel", ie), M = G;
        };
        e.addEventListener("pointerdown", T), l(() => {
          M?.(), e.removeEventListener("pointerdown", T), e.removeEventListener("pointerenter", C), e.removeEventListener("pointerleave", b), e.removeEventListener("click", D), e.classList.remove("flow-handle", `flow-handle-${a}`, "flow-handle-active");
        });
      }
    }
  );
}
const Wi = {
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
function Zu(t) {
  if (!t) return { ...Wi };
  const e = { ...Wi };
  for (const n of Object.keys(t))
    n in t && (e[n] = t[n]);
  return e;
}
function ze(t, e) {
  if (e == null) return !1;
  const n = t.length === 1 ? t.toLowerCase() : t;
  return Array.isArray(e) ? e.some((o) => (o.length === 1 ? o.toLowerCase() : o) === n) : (e.length === 1 ? e.toLowerCase() : e) === n;
}
function st(t, e) {
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
function Gu(t, e, n = {}) {
  const o = n.duration ?? 500, i = n.moveThreshold ?? 10;
  let r = null, s = 0, l = 0, a = null;
  function c() {
    r !== null && (clearTimeout(r), r = null), a = null, document.removeEventListener("pointermove", d), document.removeEventListener("pointerup", c), document.removeEventListener("pointercancel", c);
  }
  function d(u) {
    const h = u.clientX - s, p = u.clientY - l;
    h * h + p * p > i * i && c();
  }
  function f(u) {
    c(), s = u.clientX, l = u.clientY, a = u, document.addEventListener("pointermove", d), document.addEventListener("pointerup", c), document.addEventListener("pointercancel", c), r = setTimeout(() => {
      const h = a;
      c(), h && e(h);
    }, o);
  }
  return t.addEventListener("pointerdown", f), () => {
    c(), t.removeEventListener("pointerdown", f);
  };
}
const ji = 20;
function pr(t) {
  return new Map(t.map((e) => [e.id, e]));
}
function $o(t, e, n) {
  if (!t.position) return { x: 0, y: 0 };
  let o = t.position.x, i = t.position.y;
  const r = /* @__PURE__ */ new Set();
  r.add(t.id);
  let s = t.parentId ? e.get(t.parentId) : void 0;
  for (; s && !r.has(s.id); ) {
    r.add(s.id);
    const l = s.nodeOrigin ?? n ?? [0, 0], a = s.dimensions?.width ?? we, c = s.dimensions?.height ?? ve;
    o += s.position.x - a * l[0], i += s.position.y - c * l[1], s = s.parentId ? e.get(s.parentId) : void 0;
  }
  return { x: o, y: i };
}
function Lt(t, e, n) {
  if (!t.parentId)
    return t;
  const o = $o(t, e, n);
  return { ...t, position: o };
}
function qn(t, e, n) {
  return t.map((o) => Lt(o, e, n));
}
function rt(t, e) {
  const n = /* @__PURE__ */ new Set(), o = [t], i = /* @__PURE__ */ new Map();
  for (const r of e)
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
function at(t) {
  const e = pr(t), n = [], o = /* @__PURE__ */ new Set();
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
function gr(t, e, n = /* @__PURE__ */ new Set()) {
  if (n.has(t.id))
    return t.zIndex ?? 2;
  if (n.add(t.id), !t.parentId)
    return t.zIndex !== void 0 ? t.zIndex : t.type === "group" ? 0 : 2;
  const o = e.get(t.parentId);
  return o ? gr(o, e, n) + 2 + (t.zIndex ?? 0) : (t.zIndex ?? 0) + 2;
}
function mr(t, e, n) {
  return {
    x: Math.max(e[0][0], Math.min(t.x, e[1][0] - (n?.width ?? 0))),
    y: Math.max(e[0][1], Math.min(t.y, e[1][1] - (n?.height ?? 0)))
  };
}
function co(t, e, n) {
  return {
    x: Math.max(0, Math.min(t.x, n.width - e.width)),
    y: Math.max(0, Math.min(t.y, n.height - e.height))
  };
}
function xn(t, e, n) {
  const o = e.extent ?? n;
  if (!o || o === "parent" || e.parentId) return t;
  const i = e.dimensions ?? { width: we, height: ve };
  return mr(t, o, i);
}
function Ku(t, e, n) {
  const o = t.x + e.width + ji, i = t.y + e.height + ji, r = Math.max(n.width, o), s = Math.max(n.height, i);
  return r === n.width && s === n.height ? null : { width: r, height: s };
}
function Ui(t, e, n) {
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
function Ju(t, e, n) {
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
function Qu(t, e, n) {
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
function ef(t, e, n) {
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
function tf(t, e, n) {
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
function nf(t, e, n) {
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
function of(t, e, n) {
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
function sf(t, e, n) {
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
      const s = t - o, l = -Math.PI / 4;
      return { x: s + o * Math.cos(l), y: r + o * Math.sin(l) };
    }
    case "top-left": {
      const s = o, l = -3 * Math.PI / 4;
      return { x: s + o * Math.cos(l), y: r + o * Math.sin(l) };
    }
    case "bottom-right": {
      const s = t - o, l = Math.PI / 4;
      return { x: s + o * Math.cos(l), y: r + o * Math.sin(l) };
    }
    case "bottom-left": {
      const s = o, l = 3 * Math.PI / 4;
      return { x: s + o * Math.cos(l), y: r + o * Math.sin(l) };
    }
  }
}
const yr = {
  circle: { perimeterPoint: Ju },
  diamond: { perimeterPoint: Qu },
  hexagon: { perimeterPoint: ef },
  parallelogram: { perimeterPoint: tf },
  triangle: { perimeterPoint: nf },
  cylinder: { perimeterPoint: of },
  stadium: { perimeterPoint: sf }
};
function wr(t, e = "light") {
  let n = e === "dark" ? "dark" : "light", o = null, i = null;
  function r(l) {
    n = l ? "dark" : "light", t.classList.toggle("dark", l);
  }
  function s(l) {
    o && i && (o.removeEventListener("change", i), o = null, i = null), l === "system" ? (o = window.matchMedia("(prefers-color-scheme: dark)"), r(o.matches), i = (a) => r(a.matches), o.addEventListener("change", i)) : r(l === "dark");
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
const uo = "__alpineflow_collab_store__";
function rf() {
  return typeof globalThis < "u" ? (globalThis[uo] || (globalThis[uo] = /* @__PURE__ */ new WeakMap()), globalThis[uo]) : /* @__PURE__ */ new WeakMap();
}
const Ae = rf(), fo = "__alpineflow_registry__";
function af() {
  return typeof globalThis < "u" ? (globalThis[fo] || (globalThis[fo] = /* @__PURE__ */ new Map()), globalThis[fo]) : /* @__PURE__ */ new Map();
}
function Et(t) {
  return af().get(t);
}
function lf(t, e) {
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
const cf = 1e3;
class df {
  constructor(e, n) {
    this._clearTimer = null, this._formatMessage = n ?? lf, this._el = document.createElement("div"), this._el.setAttribute("aria-live", "polite"), this._el.setAttribute("aria-atomic", "true"), this._el.setAttribute("role", "status");
    const o = this._el.style;
    o.position = "absolute", o.width = "1px", o.height = "1px", o.padding = "0", o.margin = "-1px", o.overflow = "hidden", o.clip = "rect(0,0,0,0)", o.whiteSpace = "nowrap", o.border = "0", e.appendChild(this._el);
  }
  announce(e) {
    this._clearTimer && clearTimeout(this._clearTimer), this._el.textContent = e, this._clearTimer = setTimeout(() => {
      this._el.textContent = "", this._clearTimer = null;
    }, cf);
  }
  handleEvent(e, n) {
    const o = this._formatMessage(e, n);
    o && this.announce(o);
  }
  destroy() {
    this._clearTimer && clearTimeout(this._clearTimer), this._el.remove();
  }
}
class uf {
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
    const o = new Map(e.map((a) => [a.id, a])), i = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
    for (const a of e)
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
        const d = (i.get(c) ?? 0) - 1;
        i.set(c, d), d === 0 && s.push(c);
      }
    }
    if (l.length < e.length) {
      const a = new Set(l.map((c) => c.id));
      for (const c of e)
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
  compute(e, n, o) {
    const i = this.topologicalSort(e, n), r = /* @__PURE__ */ new Map();
    if (o)
      for (const a of e)
        a.data.$outputs && r.set(a.id, a.data.$outputs);
    let s = null;
    o && (s = this._getDownstream(o, n), s.add(o));
    const l = /* @__PURE__ */ new Map();
    for (const a of i) {
      if (s && !s.has(a.id)) continue;
      const c = this._registry.get(a.type ?? "default");
      if (!c) continue;
      const d = {}, f = n.filter((h) => h.target === a.id);
      for (const h of f) {
        const p = r.get(h.source);
        if (!p) continue;
        const g = h.sourceHandle ?? "default", w = h.targetHandle ?? "default";
        g in p && (d[w] = p[g]);
      }
      const u = c.compute(d, a.data);
      r.set(a.id, u), l.set(a.id, u), a.data.$inputs = d, a.data.$outputs = u;
    }
    return l;
  }
  /** Get all downstream node IDs reachable from a start node. */
  _getDownstream(e, n) {
    const o = /* @__PURE__ */ new Map();
    for (const s of n) {
      let l = o.get(s.source);
      l || (l = [], o.set(s.source, l)), l.push(s.target);
    }
    const i = /* @__PURE__ */ new Set(), r = [e];
    for (; r.length > 0; ) {
      const s = r.pop();
      if (!i.has(s)) {
        i.add(s);
        for (const l of o.get(s) ?? [])
          i.has(l) || r.push(l);
      }
    }
    return i.delete(e), i;
  }
}
const ff = {
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
}, hf = {
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
}, pf = {
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
  "flow:setLoading": (t) => [t.loading],
  "flow:clear": () => [],
  "flow:toggleInteractive": () => [],
  "flow:panBy": (t) => [t.dx, t.dy],
  "flow:fitBounds": (t) => [t.rect, t.options],
  "flow:patchConfig": (t) => [t.changes],
  "flow:deselectAll": () => [],
  "flow:collapseNode": (t) => [t.id],
  "flow:expandNode": (t) => [t.id],
  "flow:toggleNode": (t) => [t.id]
}, Zi = {
  success: { borderColor: "#22c55e", shadow: "0 0 0 2px rgba(34,197,94,0.3)" },
  error: { borderColor: "#ef4444", shadow: "0 0 0 2px rgba(239,68,68,0.3)" },
  warning: { borderColor: "#f59e0b", shadow: "0 0 0 2px rgba(245,158,11,0.3)" },
  info: { borderColor: "#3b82f6", shadow: "0 0 0 2px rgba(59,130,246,0.3)" }
};
function gf(t, e) {
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
    const r = i.dimensions?.width ?? 150, s = i.dimensions?.height ?? 40, l = i.parentId ? t.getAbsolutePosition(o.id) : i.position;
    t.fitBounds(
      { x: l.x, y: l.y, width: r, height: s },
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
    const r = Zi[o.style] ?? Zi.info, s = o.duration ?? 1500, l = Math.floor(s * 0.6), a = Math.floor(s * 0.4), c = i.style?.borderColor ?? null, d = i.style?.boxShadow ?? null;
    t.update({
      nodes: { [o.id]: { style: `border-color: ${r.borderColor}; box-shadow: ${r.shadow}` } }
    }, { duration: 100 }), setTimeout(() => {
      const f = c ? `border-color: ${c}; box-shadow: ${d ?? "none"}` : "";
      t.update({
        nodes: { [o.id]: { style: f } }
      }, { duration: a });
    }, 100 + l);
  })), n.push(e.on("flow:highlightPath", (o) => {
    const i = o.nodeIds, r = o.options ?? {}, { delay: s, ...l } = r, a = s ?? 200, c = {
      color: "#3b82f6",
      size: 5,
      duration: "800ms",
      ...l
    };
    for (let d = 0; d < i.length - 1; d++) {
      const f = i[d], u = i[d + 1], h = t.edges.find((p) => p.source === f && p.target === u);
      h && setTimeout(() => {
        t.sendParticle(h.id, c);
      }, d * a);
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
function mf(t) {
  return "on" + t.split("-").map(
    (e) => e.charAt(0).toUpperCase() + e.slice(1)
  ).join("");
}
function yf(t, e, n) {
  for (const [o, i] of Object.entries(n)) {
    const r = mf(o), s = t[r];
    t[r] = (l) => {
      let a;
      typeof s == "function" && (a = s(l));
      const c = ff[o], d = c ? c(l) : [l], f = e[i];
      return typeof f == "function" && f.call(e, ...d), a;
    };
  }
}
function wf(t, e) {
  const n = [];
  for (const [o, i] of Object.entries(hf)) {
    const r = e.on(o, (s) => {
      const l = t[i];
      if (typeof l != "function") return;
      const a = pf[o], c = a ? a(s) : Object.values(s);
      l.call(t, ...c);
    });
    n.push(r);
  }
  return () => {
    for (const o of n)
      typeof o == "function" && o();
  };
}
function Gt(t, e) {
  const n = t.type ?? "default", o = e[n], i = t.data?.childValidation;
  if (!(!o && !i))
    return o ? i ? { ...o, ...i } : o : i;
}
function vr(t, e, n, o) {
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
      (l) => (l.type ?? "default") === i
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
function Wn(t, e, n, o) {
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
    const s = e.type ?? "default", l = o.childTypeConstraints[s];
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
function Gi(t, e, n) {
  if (!n) return [];
  const o = [], i = Math.max(
    n.minChildren ?? 0,
    n.requiredChildren ? 1 : 0
  );
  if (i > 0 && e.length < i && o.push(`Requires at least ${i} child node(s)`), n.maxChildren !== void 0 && e.length > n.maxChildren && o.push(`Maximum ${n.maxChildren} child node(s) allowed`), n.childTypeConstraints)
    for (const [r, s] of Object.entries(n.childTypeConstraints)) {
      const l = e.filter(
        (a) => (a.type ?? "default") === r
      ).length;
      s.min !== void 0 && l < s.min && o.push(`Requires at least ${s.min} "${r}" node(s)`), s.max !== void 0 && l > s.max && o.push(`Maximum ${s.max} "${r}" node(s) allowed`);
    }
  return o;
}
function $t(t, e) {
  const n = Rt(t, e);
  return {
    x: n.x,
    y: n.y,
    width: t.dimensions?.width ?? we,
    height: t.dimensions?.height ?? ve
  };
}
function _r(t, e) {
  return t.x < e.x + e.width && t.x + t.width > e.x && t.y < e.y + e.height && t.y + t.height > e.y;
}
function vf(t, e, n = !0) {
  const o = $t(t);
  return e.filter((i) => {
    if (i.id === t.id) return !1;
    const r = $t(i);
    return n ? _r(o, r) : o.x <= r.x && o.y <= r.y && o.x + o.width >= r.x + r.width && o.y + o.height >= r.y + r.height;
  });
}
function _f(t, e, n = !0) {
  if (t.id === e.id) return !1;
  const o = $t(t), i = $t(e);
  return n ? _r(o, i) : o.x <= i.x && o.y <= i.y && o.x + o.width >= i.x + i.width && o.y + o.height >= i.y + i.height;
}
function bf(t, e, n, o, i = 5) {
  let { x: r, y: s } = t;
  for (const l of o) {
    const a = r + e, c = s + n, d = l.x + l.width, f = l.y + l.height;
    if (r < d + i && a > l.x - i && s < f + i && c > l.y - i) {
      const u = a - (l.x - i), h = d + i - r, p = c - (l.y - i), g = f + i - s, w = Math.min(u, h, p, g);
      w === u ? r -= u : w === h ? r += h : w === p ? s -= p : s += g;
    }
  }
  return { x: r, y: s };
}
function xf(t) {
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
      B("init", `Adding ${o.length} node(s)`, o.map((c) => c.id));
      const i = /* @__PURE__ */ new Map();
      if (n?.center) {
        for (const c of o)
          i.set(c.id, { ...c.position });
        o = o.map((c) => ({ ...c, position: { x: -9999, y: -9999 } }));
      }
      const r = [];
      for (const c of o) {
        if (c.parentId) {
          const d = t._getChildValidation(c.parentId);
          if (d) {
            const f = t._nodeMap.get(c.parentId);
            if (f) {
              const u = [
                ...t.nodes.filter(
                  (p) => p.parentId === c.parentId
                ),
                ...r.filter(
                  (p) => p.parentId === c.parentId
                )
              ], h = vr(f, c, u, d);
              if (!h.valid) {
                t._config.onChildValidationFail && t._config.onChildValidationFail({
                  parent: f,
                  child: c,
                  operation: "add",
                  rule: h.rule,
                  message: h.message
                });
                continue;
              }
            }
          }
        }
        r.push(c);
      }
      o = r, t.nodes.push(...o);
      for (const c of o)
        c.dimensions && t._initialDimensions.set(c.id, { ...c.dimensions });
      t.nodes = at(t.nodes), t._rebuildNodeMap(), t._emit("nodes-change", { type: "add", nodes: o });
      const s = t._container ? Ae.get(t._container) : void 0;
      if (s?.bridge)
        for (const c of o)
          s.bridge.pushLocalNodeAdd(c);
      n?.center && requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          for (const [c, d] of i) {
            const f = t.nodes.find((p) => p.id === c);
            if (!f) continue;
            const u = f.dimensions?.width ?? 0, h = f.dimensions?.height ?? 0;
            f.position.x = d.x - u / 2, f.position.y = d.y - h / 2;
          }
        });
      }), t._recomputeChildValidation();
      const l = /* @__PURE__ */ new Set();
      for (const c of o)
        if (c.parentId && t._nodeMap.get(c.parentId)?.childLayout) {
          if (c.order == null) {
            const f = t.nodes.filter(
              (u) => u.parentId === c.parentId && u.id !== c.id
            );
            c.order = f.length > 0 ? Math.max(...f.map((u) => u.order ?? 0)) + 1 : 0;
          }
          l.add(c.parentId);
        }
      const a = /* @__PURE__ */ new Set();
      for (const c of l) {
        let d = c, f = t._nodeMap.get(c)?.parentId;
        for (; f; ) {
          const u = t._nodeMap.get(f);
          u?.childLayout && (d = f), f = u?.parentId;
        }
        a.add(d);
      }
      for (const c of a) t.layoutChildren?.(c);
      t._scheduleAutoLayout();
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
    removeNodes(e) {
      t._captureHistory();
      const n = new Set(Array.isArray(e) ? e : [e]), o = /* @__PURE__ */ new Set();
      for (const f of [...n]) {
        const u = t._nodeMap.get(f);
        if (!u?.parentId || n.has(u.parentId)) continue;
        const h = t._getChildValidation(u.parentId);
        if (!h) continue;
        const p = t._nodeMap.get(u.parentId);
        if (!p) continue;
        const g = t.nodes.filter(
          (m) => m.parentId === u.parentId
        ), w = Wn(p, u, g, h);
        w.valid || (o.add(f), t._config.onChildValidationFail && t._config.onChildValidationFail({
          parent: p,
          child: u,
          operation: "remove",
          rule: w.rule,
          message: w.message
        }));
      }
      for (const f of o)
        n.delete(f);
      if (n.size === 0) return;
      const i = /* @__PURE__ */ new Map();
      for (const f of n) {
        const u = t._nodeMap.get(f);
        u?.parentId && i.set(f, u.parentId);
      }
      for (const f of [...n])
        for (const u of rt(f, t.nodes))
          n.add(u);
      B("destroy", `Removing ${n.size} node(s)`, [...n]);
      const r = t.nodes.filter((f) => n.has(f.id));
      let s = [];
      t._config.reconnectOnDelete && (s = zu(n, t.nodes, t.edges));
      const l = [];
      t.edges = t.edges.filter((f) => n.has(f.source) || n.has(f.target) ? (l.push(f.id), !1) : !0), s.length && (t.edges.push(...s), B("destroy", `Created ${s.length} reconnection edge(s)`)), t._rebuildEdgeMap(), t.nodes = t.nodes.filter((f) => !n.has(f.id)), t._rebuildNodeMap();
      for (const f of n)
        t.selectedNodes.delete(f), t._initialDimensions.delete(f);
      r.length && t._emit("nodes-change", { type: "remove", nodes: r }), s.length && t._emit("edges-change", { type: "add", edges: s });
      const a = t._container ? Ae.get(t._container) : void 0;
      if (a?.bridge) {
        for (const f of n)
          a.bridge.pushLocalNodeRemove(f);
        for (const f of l)
          a.bridge.pushLocalEdgeRemove(f);
        for (const f of s)
          a.bridge.pushLocalEdgeAdd(f);
      }
      t._recomputeChildValidation();
      const c = /* @__PURE__ */ new Set();
      for (const f of n) {
        const u = i.get(f);
        u && t._nodeMap.get(u)?.childLayout && c.add(u);
      }
      const d = /* @__PURE__ */ new Set();
      for (const f of c) {
        let u = f, h = t._nodeMap.get(f)?.parentId;
        for (; h; ) {
          const p = t._nodeMap.get(h);
          p?.childLayout && (u = h), h = p?.parentId;
        }
        d.add(u);
      }
      for (const f of d) t.layoutChildren?.(f);
      t._scheduleAutoLayout();
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
      return No(e, t.nodes, t.edges);
    },
    /**
     * Get all nodes connected via incoming edges to the given node.
     */
    getIncomers(e) {
      return Ru(e, t.nodes, t.edges);
    },
    /**
     * Get all edges connected to a node (both incoming and outgoing).
     */
    getConnectedEdges(e) {
      return Du(e, t.edges);
    },
    /**
     * Check if two nodes are connected by an edge.
     * When `directed` is true, only checks source→target direction.
     */
    areNodesConnected(e, n, o = !1) {
      return Fu(e, n, t.edges, o);
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
      return o ? vf(o, t.nodes, n) : [];
    },
    /**
     * Check if two nodes' bounding rects overlap.
     * Accepts either FlowNode objects or node ID strings.
     */
    isNodeIntersecting(e, n, o) {
      const i = typeof e == "string" ? t.nodes.find((s) => s.id === e) : e, r = typeof n == "string" ? t.nodes.find((s) => s.id === n) : n;
      return !i || !r ? !1 : _f(i, r, o);
    }
  };
}
function Ef(t) {
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
    addEdges(e) {
      t._captureHistory();
      const n = t._config.defaultEdgeOptions, o = (Array.isArray(e) ? e : [e]).map(
        (r) => n ? { ...n, ...r } : r
      );
      B("edge", `Adding ${o.length} edge(s)`, o.map((r) => r.id)), t.edges.push(...o), t._rebuildEdgeMap(), t._emit("edges-change", { type: "add", edges: o });
      const i = t._container ? Ae.get(t._container) : void 0;
      if (i?.bridge)
        for (const r of o)
          i.bridge.pushLocalEdgeAdd(r);
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
    removeEdges(e) {
      t._captureHistory();
      const n = new Set(Array.isArray(e) ? e : [e]);
      B("edge", `Removing ${n.size} edge(s)`, [...n]);
      const o = t.edges.filter((r) => n.has(r.id));
      t.edges = t.edges.filter((r) => !n.has(r.id)), t._rebuildEdgeMap();
      for (const r of n)
        t.selectedEdges.delete(r);
      o.length && t._emit("edges-change", { type: "remove", edges: o });
      const i = t._container ? Ae.get(t._container) : void 0;
      if (i?.bridge)
        for (const r of n)
          i.bridge.pushLocalEdgeRemove(r);
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
function Sf(t) {
  return {
    // ── Coordinate Transforms ─────────────────────────────────────────────
    /**
     * Convert screen coordinates (e.g. from a pointer event) to flow
     * coordinates, accounting for the current viewport pan and zoom.
     */
    screenToFlowPosition(e, n) {
      if (!t._container) return { x: e, y: n };
      const o = t._container.getBoundingClientRect();
      return Js(e, n, t.viewport, o);
    },
    /**
     * Convert flow coordinates to screen coordinates, accounting for the
     * current viewport pan and zoom.
     */
    flowToScreenPosition(e, n) {
      if (!t._container) return { x: e, y: n };
      const o = t._container.getBoundingClientRect();
      return iu(e, n, t.viewport, o);
    },
    // ── Fit & Bounds ──────────────────────────────────────────────────────
    /**
     * Fit all visible nodes into the viewport.
     *
     * Defers via `requestAnimationFrame` if any node lacks measured
     * dimensions (up to 10 retries) to give the DOM time to render.
     */
    fitView(e, n = 0) {
      if (t.nodes.some((r) => !r.dimensions)) {
        n < 10 && requestAnimationFrame(() => this.fitView(e, n + 1));
        return;
      }
      const o = t.nodes.filter((r) => !r.hidden), i = Nt(qn(o, t._nodeMap, t._config.nodeOrigin), t._config.nodeOrigin);
      this.fitBounds(i, e), t._announcer?.handleEvent("fit-view", {});
    },
    /**
     * Fit a specific rectangle into the viewport.
     *
     * If `duration` is specified, the transition is animated via
     * `ctx.animate()` (cross-mixin dependency). Otherwise the viewport
     * is set directly via `ctx._panZoom`.
     */
    fitBounds(e, n) {
      const o = t._container ? { width: t._container.clientWidth, height: t._container.clientHeight } : { width: 800, height: 600 }, i = zn(
        e,
        o.width,
        o.height,
        t._config.minZoom ?? 0.5,
        t._config.maxZoom ?? 2,
        n?.padding ?? Ao
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
      return e ? n = e.map((o) => t.getNode(o)).filter((o) => !!o) : n = t.nodes.filter((o) => !o.hidden), Nt(qn(n, t._nodeMap, t._config.nodeOrigin), t._config.nodeOrigin);
    },
    /**
     * Compute the viewport (pan + zoom) that frames the given bounds
     * within the container, respecting min/max zoom and padding.
     */
    getViewportForBounds(e, n) {
      const o = t._container;
      return o ? zn(
        e,
        o.clientWidth,
        o.clientHeight,
        t._config.minZoom ?? 0.5,
        t._config.maxZoom ?? 2,
        n ?? Ao
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
      const n = t._config.maxZoom ?? 2, o = Math.min(t.viewport.zoom * Ni, n);
      B("viewport", "zoomIn", { from: t.viewport.zoom, to: o }), t._panZoom?.setViewport({ ...t.viewport, zoom: o }, e);
    },
    /**
     * Zoom out by `ZOOM_STEP_FACTOR`, clamped to `minZoom`.
     */
    zoomOut(e) {
      const n = t._config.minZoom ?? 0.5, o = Math.max(t.viewport.zoom / Ni, n);
      B("viewport", "zoomOut", { from: t.viewport.zoom, to: o }), t._panZoom?.setViewport({ ...t.viewport, zoom: o }, e);
    },
    /**
     * Center the viewport on flow coordinate `(x, y)` at the given zoom
     * level (defaults to the current zoom).
     */
    setCenter(e, n, o, i) {
      const r = t._container;
      if (!r) return;
      const s = o ?? t.viewport.zoom, l = r.clientWidth / 2 - e * s, a = r.clientHeight / 2 - n * s;
      B("viewport", "setCenter", { x: e, y: n, zoom: s }), t._panZoom?.setViewport({ x: l, y: a, zoom: s }, i);
    },
    /**
     * Pan the viewport by a delta `(dx, dy)`.
     */
    panBy(e, n, o) {
      B("viewport", "panBy", { dx: e, dy: n }), t._panZoom?.setViewport(
        { x: t.viewport.x + e, y: t.viewport.y + n, zoom: t.viewport.zoom },
        o
      );
    },
    // ── Interactivity Toggle ──────────────────────────────────────────────
    /**
     * Toggle pan/zoom interactivity on and off.
     */
    toggleInteractive() {
      t.isInteractive = !t.isInteractive, B("interactive", "toggleInteractive", { isInteractive: t.isInteractive }), t._panZoom?.update({
        pannable: t.isInteractive,
        zoomable: t.isInteractive
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
let ht = null;
const Cf = 20;
function Do(t) {
  return JSON.parse(JSON.stringify(t));
}
function Ki(t) {
  return `${t}-copy-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
}
function br(t, e) {
  const n = t.filter((r) => r.selected), o = new Set(n.map((r) => r.id)), i = e.filter(
    (r) => r.selected || o.has(r.source) && o.has(r.target)
  );
  return ht = {
    nodes: Do(n),
    edges: Do(i),
    pasteCount: 0
  }, { nodeCount: n.length, edgeCount: i.length };
}
function Pf() {
  if (!ht || ht.nodes.length === 0) return null;
  ht.pasteCount++;
  const t = ht.pasteCount * Cf, e = /* @__PURE__ */ new Map(), n = ht.nodes.map((i) => {
    const r = Ki(i.id);
    return e.set(i.id, r), {
      ...i,
      id: r,
      data: Do(i.data),
      position: { x: i.position.x + t, y: i.position.y + t },
      selected: !0
    };
  }), o = ht.edges.map((i) => ({
    ...i,
    id: Ki(i.id),
    source: e.get(i.source),
    target: e.get(i.target),
    selected: !0
  }));
  return { nodes: n, edges: o };
}
function kf(t, e) {
  const n = br(t, e);
  return { nodeIds: t.filter((i) => i.selected).map((i) => i.id), ...n };
}
function Lf(t) {
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
      const e = [...t.selectedNodes].filter((a) => {
        const c = t.getNode(a);
        return c ? Xu(c) : !1;
      }), n = [...t.selectedEdges].filter((a) => t.getEdge(a)?.deletable !== !1);
      let o = e.map((a) => t.getNode(a)).filter(Boolean);
      const i = new Set(e), r = t.edges.filter(
        (a) => i.has(a.source) || i.has(a.target)
      ), s = /* @__PURE__ */ new Map();
      for (const a of r) s.set(a.id, a);
      for (const a of n) {
        const c = t.getEdge(a);
        c && s.set(c.id, c);
      }
      const l = [...s.values()];
      if (o = o.filter((a) => {
        if (!a.parentId || o.some((h) => h.id === a.parentId)) return !0;
        const c = t._getChildValidation(a.parentId);
        if (!c) return !0;
        const d = t.getNode(a.parentId);
        if (!d) return !0;
        const f = t.nodes.filter(
          (h) => h.parentId === a.parentId
        ), u = Wn(d, a, f, c);
        return !u.valid && t._config.onChildValidationFail && t._config.onChildValidationFail({
          parent: d,
          child: a,
          operation: "remove",
          rule: u.rule,
          message: u.message
        }), u.valid;
      }), !(o.length === 0 && l.length === 0)) {
        if (t._config?.onBeforeDelete) {
          const a = await t._config.onBeforeDelete({
            nodes: o,
            edges: l
          });
          if (a === !1) {
            B("delete", "onBeforeDelete cancelled deletion");
            return;
          }
          t._captureHistory(), t._suspendHistory();
          try {
            if (a.nodes.length > 0 && (B("delete", `onBeforeDelete approved ${a.nodes.length} node(s)`), t.removeNodes(a.nodes.map((c) => c.id))), a.edges.length > 0) {
              const c = a.edges.map((d) => d.id).filter((d) => t.edges.some((f) => f.id === d));
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
          if (o.length > 0 && (B("delete", `Deleting ${o.length} selected node(s)`), t.removeNodes(o.map((a) => a.id))), n.length > 0) {
            const a = n.filter(
              (c) => t.edges.some((d) => d.id === c)
            );
            a.length > 0 && (B("delete", `Deleting ${a.length} selected edge(s)`), t.removeEdges(a));
          }
          t._recomputeChildValidation();
          for (const a of t.selectedNodes)
            t.nodes.some((c) => c.id === a) || t.selectedNodes.delete(a);
          for (const a of t.selectedEdges)
            t.edges.some((c) => c.id === a) || t.selectedEdges.delete(a);
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
      const e = br(t.nodes, t.edges);
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
      const e = Pf();
      if (e) {
        t._captureHistory(), t.deselectAll(), t.nodes.push(...e.nodes), t.nodes = at(t.nodes), t._rebuildNodeMap(), t.edges.push(...e.edges), t._rebuildEdgeMap();
        for (const n of e.nodes)
          t.selectedNodes.add(n.id);
        for (const n of e.edges)
          t.selectedEdges.add(n.id);
        t._emitSelectionChange(), t._emit("nodes-change", { type: "add", nodes: e.nodes }), t._emit("edges-change", { type: "add", edges: e.edges }), t._emit("paste", { nodes: e.nodes, edges: e.edges }), B("clipboard", `Pasted ${e.nodes.length} node(s) and ${e.edges.length} edge(s)`), t.$nextTick(() => {
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
      const e = kf(t.nodes, t.edges);
      e.nodeCount !== 0 && (await t._deleteSelected(), t._emit("cut", { nodeCount: e.nodeCount, edgeCount: e.edgeCount }), B("clipboard", `Cut ${e.nodeCount} node(s)`));
    }
  };
}
function Mf(t) {
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
      }), e.nodes && (t.nodes = at(JSON.parse(JSON.stringify(e.nodes)))), e.edges) {
        const n = JSON.parse(JSON.stringify(e.edges)), o = new Map(t.edges.map((r) => [r.id, r])), i = [];
        for (const r of n) {
          const s = o.get(r.id);
          if (s) {
            for (const l of Object.keys(s))
              l !== "id" && !(l in r) && delete s[l];
            Object.assign(s, r), i.push(s);
          } else
            i.push(r);
        }
        t.edges = i;
      }
      if (t._rebuildNodeMap(), t._rebuildEdgeMap(), e.viewport) {
        const n = { ...t.viewport, ...e.viewport };
        t._panZoom?.setViewport(n);
      }
      t.deselectAll(), t._emit("restore", e), t._scheduleAutoLayout(), requestAnimationFrame(() => {
        t._layoutAnimTick++;
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
    // ── Undo / Redo ────────────────────────────────────────────
    /**
     * Undo the last structural change by popping a snapshot from the
     * history past stack. Rebuilds maps and deselects all after applying.
     */
    undo() {
      if (!t._history) return;
      const e = t._history.undo({ nodes: t.nodes, edges: t.edges });
      e && (t.nodes = at(e.nodes), t.edges = e.edges, t._rebuildNodeMap(), t._rebuildEdgeMap(), t.deselectAll(), requestAnimationFrame(() => {
        t._layoutAnimTick++;
      }), B("history", "Undo applied", { nodes: e.nodes.length, edges: e.edges.length }));
    },
    /**
     * Redo the last undone change by popping a snapshot from the
     * history future stack. Rebuilds maps and deselects all after applying.
     */
    redo() {
      if (!t._history) return;
      const e = t._history.redo({ nodes: t.nodes, edges: t.edges });
      e && (t.nodes = at(e.nodes), t.edges = e.edges, t._rebuildNodeMap(), t._rebuildEdgeMap(), t.deselectAll(), requestAnimationFrame(() => {
        t._layoutAnimTick++;
      }), B("history", "Redo applied", { nodes: e.nodes.length, edges: e.edges.length }));
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
function Tf(t, e) {
  return t * (1 - e);
}
function Af(t, e) {
  return t * e;
}
function Nf(t, e) {
  return e === "in" ? t : 1 - t;
}
function If(t, e, n) {
  const o = t.getTotalLength();
  t.style.strokeDasharray = String(o);
  const i = n === "in" ? Tf(o, e) : Af(o, e);
  t.style.strokeDashoffset = String(i), (n === "in" && e < 1 || n === "out") && (t.style.setProperty("marker-start", "none"), t.style.setProperty("marker-end", "none"));
}
function $f(t) {
  t.style.removeProperty("stroke-dasharray"), t.style.removeProperty("stroke-dashoffset"), t.style.removeProperty("marker-start"), t.style.removeProperty("marker-end");
}
function Df(t, e, n) {
  t.style.opacity = String(Nf(e, n));
}
function Rf(t) {
  t.style.removeProperty("opacity");
}
const Ze = Math.PI * 2, Xt = /* @__PURE__ */ new Map(), Hf = 64;
function ni(t) {
  if (typeof document > "u" || typeof document.createElementNS != "function")
    return null;
  const e = Xt.get(t);
  if (e) return e;
  const n = document.createElementNS("http://www.w3.org/2000/svg", "path");
  n.setAttribute("d", t);
  const o = n.getTotalLength(), i = (r) => {
    const s = n.getPointAtLength(r * o);
    return { x: s.x, y: s.y };
  };
  if (Xt.size >= Hf) {
    const r = Xt.keys().next().value;
    r !== void 0 && Xt.delete(r);
  }
  return Xt.set(t, i), i;
}
function hm(t) {
  const { cx: e, cy: n, offset: o = 0, clockwise: i = !0 } = t, r = t.rx ?? t.radius ?? 100, s = t.ry ?? t.radius ?? 100, l = i ? 1 : -1;
  return (a) => ({
    x: e + r * Math.cos(Ze * a * l + o * Ze),
    y: n + s * Math.sin(Ze * a * l + o * Ze)
  });
}
function pm(t) {
  const { startX: e, startY: n, endX: o, endY: i, amplitude: r = 30, frequency: s = 1, offset: l = 0 } = t, a = o - e, c = i - n, d = Math.sqrt(a * a + c * c), f = d > 0 ? a / d : 1, h = -(d > 0 ? c / d : 0), p = f;
  return (g) => {
    const w = e + a * g, m = n + c * g, E = r * Math.sin(Ze * s * g + l * Ze);
    return { x: w + h * E, y: m + p * E };
  };
}
function gm(t, e) {
  const n = ni(t);
  if (!n) return null;
  const { reverse: o = !1, startAt: i = 0, endAt: r = 1 } = e ?? {}, s = r - i;
  return (l) => {
    let a = i + l * s;
    return o && (a = r - l * s), n(a);
  };
}
function mm(t) {
  const { cx: e, cy: n, radius: o, angle: i = 60, offset: r = 0 } = t, s = i * Math.PI / 180;
  return (l) => {
    const a = s * Math.sin(Ze * l + r * Ze);
    return {
      x: e + o * Math.sin(a),
      y: n + o * Math.cos(a)
    };
  };
}
function ym(t) {
  const { originX: e, originY: n, range: o = 20, speed: i = 1, seed: r = 0 } = t, s = 1 + r % 7 * 0.3, l = 1.3 + r % 11 * 0.2, a = 0.7 + r % 13 * 0.25, c = 1.1 + r % 17 * 0.15;
  return (d) => {
    const f = d * i * Ze, u = (Math.sin(s * f) + Math.sin(l * f * 1.3)) / 2, h = (Math.sin(a * f * 0.9) + Math.sin(c * f * 1.1)) / 2;
    return { x: e + u * o, y: n + h * o };
  };
}
function wm(t, e) {
  const n = e?.from ?? 0;
  return (o, i) => n + o * t;
}
let Ji = !1;
function me(t) {
  try {
    return structuredClone(t);
  } catch {
    return Ji || (Ji = !0, typeof console < "u" && console.warn(
      "[AlpineFlow] Cloning fell back to JSON roundtrip because structuredClone could not clone the input (likely a reactive proxy or an object with functions). Non-JSON values (functions, Symbols, Dates) will be stripped. This warning fires once per session."
    )), JSON.parse(JSON.stringify(t));
  }
}
function Ff(t) {
  return {
    position: { ...t.position },
    class: t.class,
    style: typeof t.style == "string" ? t.style : t.style ? { ...t.style } : void 0,
    data: me(t.data),
    dimensions: t.dimensions ? { ...t.dimensions } : void 0,
    selected: t.selected,
    zIndex: t.zIndex
  };
}
function zf(t) {
  return {
    animated: t.animated,
    color: t.color,
    class: t.class,
    label: t.label,
    strokeWidth: t.strokeWidth
  };
}
function Of(t, e) {
  t.position.x = e.position.x, t.position.y = e.position.y, t.class = e.class, t.style = e.style, t.data = me(e.data), t.dimensions = e.dimensions ? { ...e.dimensions } : t.dimensions, t.selected = e.selected, t.zIndex = e.zIndex;
}
class oi {
  constructor(e, n) {
    this._entries = [], this._state = "idle", this._reversed = !1, this._loopCount = -1, this._lockEnabled = !1, this._locked = !1, this._respectReducedMotion = void 0, this._listeners = /* @__PURE__ */ new Map(), this._context = {}, this._activeHandles = [], this._subTimelines = [], this._initialSnapshot = /* @__PURE__ */ new Map(), this._initialEdgeSnapshot = /* @__PURE__ */ new Map(), this._playResolve = null, this._pauseWaiters = /* @__PURE__ */ new Set(), this._canvas = e, this._engine = n ?? new nr();
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
    const o = new oi(this._canvas, this._engine);
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
    return or(this._respectReducedMotion);
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
          o && this._initialSnapshot.set(n, Ff(o));
        }
    }
    if (e.edges) {
      for (const n of e.edges)
        if (!this._initialEdgeSnapshot.has(n)) {
          const o = this._canvas.getEdge(n);
          o && this._initialEdgeSnapshot.set(n, zf(o));
        }
    }
  }
  _restoreInitialSnapshot() {
    for (const [e, n] of this._initialSnapshot) {
      const o = this._canvas.getNode(e);
      o && Of(o, n);
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
    const o = this._isReducedMotion(), i = o ? 0 : e.duration ?? 300, r = o ? 0 : e.delay ?? 0, s = Vn(e.easing), l = this._makeContext(n, e.id);
    if (e.when && !e.when(l)) {
      if (e.else)
        return this._executeStep(e.else, n);
      this._emit("step-skipped", { index: n, id: e.id });
      return;
    }
    if (e.timeline) {
      const v = e.timeline;
      if (this._tag && !e.independent && v.setTag(this._tag), e.independent || this._subTimelines.push(v), this._emit("step", { index: n, id: e.id, timeline: v }), e.onStart?.(l), await v.play(), this._state === "stopped") return;
      if (e.onComplete?.(l), this._emit("step-complete", { timeline: v }), !e.independent) {
        const P = this._subTimelines.indexOf(v);
        P >= 0 && this._subTimelines.splice(P, 1);
      }
      return;
    }
    if (this._emit("step", { index: n, id: e.id }), e.onStart?.(l), e.await && (await this._resolveAwait(e, n), this._state === "stopped"))
      return;
    if (e.await && this._isAwaitOnlyStep(e))
      return e.onProgress?.(1, l), e.onComplete?.(l), this._emit("step-complete"), Promise.resolve();
    const { validNodeIds: a, validEdgeIds: c } = this._validateStepTargets(e, n);
    if (this._isEmptyStep(e, a, c))
      return e.onProgress?.(1, l), e.onComplete?.(l), this._emit("step-complete"), Promise.resolve();
    const d = /* @__PURE__ */ new Map(), f = /* @__PURE__ */ new Map();
    this._captureNodeFromValues(e, a, d, f);
    const u = /* @__PURE__ */ new Map(), h = /* @__PURE__ */ new Map();
    this._captureEdgeFromValues(e, c, u, h);
    const p = this._resolveFollowPath(e), g = this._createGuidePath(e), w = !!(e.viewport || e.fitView || e.panTo);
    let m = null, E = null;
    w && this._canvas.viewport && (m = { ...this._canvas.viewport }, E = this._resolveTargetViewport(e));
    const C = e.edgeTransition ?? "none", b = e.addEdges?.map((v) => v.id) ?? [], D = e.removeEdges?.filter((v) => this._canvas.getEdge(v)).slice() ?? [], M = {
      step: e,
      ctx: l,
      duration: i,
      delay: r,
      easing: s,
      validNodeIds: a,
      validEdgeIds: c,
      resolvedPathFn: p,
      guidePathEl: g,
      nodeFromDimensions: d,
      nodeFromStyles: f,
      edgeFromStrokeWidth: u,
      edgeFromColor: h,
      viewportFrom: m,
      viewportTarget: E,
      transition: C,
      addEdgeIds: b,
      removeEdgeIds: D
    };
    if (i === 0)
      return this._executeInstantStep(M);
    const T = this._prepareAnimatedEdges(e, C, b);
    return T && await T, p ? this._executeFollowPathStep(M) : this._executeAnimatedStep(M);
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
    const i = e.nodes && e.nodes.length > 0, r = e.edges && e.edges.length > 0, s = !!(e.viewport || e.fitView || e.panTo), l = !!(e.addEdges?.length || e.removeEdges?.length), a = i && (!n || n.length === 0), c = r && (!o || o.length === 0);
    return !!(a && c && !s && !l || a && !r && !s && !l || c && !i && !s && !l);
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
        const r = new Promise((l) => {
          i = setTimeout(() => l("timeout"), e.timeout);
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
        s && (s.dimensions && e.dimensions && o.set(r, { ...s.dimensions }), e.style && s.style && i.set(r, on(s.style)));
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
    const n = ni(e.followPath);
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
    const { step: n, ctx: o, delay: i, resolvedPathFn: r, validNodeIds: s, guidePathEl: l } = e;
    if (i > 0)
      return new Promise((a) => {
        const c = setTimeout(() => {
          this._applyStepFinal(n), n.onProgress?.(1, o), n.onComplete?.(o), this._emit("step-complete"), a();
        }, i), d = {
          stop() {
            clearTimeout(c);
          }
        };
        this._activeHandles.push(d);
      });
    if (r && s) {
      const a = r(1);
      for (const c of s) {
        const d = this._canvas.getNode(c);
        d && (d.position.x = a.x, d.position.y = a.y);
      }
    }
    return this._applyStepFinal(n), l && n.guidePath?.autoRemove !== !1 && l.remove(), n.onProgress?.(1, o), n.onComplete?.(o), this._emit("step-complete"), Promise.resolve();
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
      validNodeIds: l,
      validEdgeIds: a,
      nodeFromDimensions: c,
      nodeFromStyles: d,
      edgeFromStrokeWidth: f,
      edgeFromColor: u,
      viewportFrom: h,
      viewportTarget: p,
      transition: g,
      addEdgeIds: w,
      removeEdgeIds: m,
      guidePathEl: E
    } = e, C = e.resolvedPathFn;
    return new Promise((b) => {
      const D = this._engine.register((M) => {
        if (this._state === "stopped")
          return b(), !0;
        const T = Math.min(M / i, 1), v = s(T);
        if (l) {
          const P = C(v);
          for (const I of l) {
            const x = this._canvas.getNode(I);
            x && (x.position.x = P.x, x.position.y = P.y);
          }
        }
        return this._interpolateFollowPathTick(
          n,
          v,
          l,
          a,
          c,
          d,
          f,
          u,
          h,
          p
        ), this._tickEdgeTransitions(g, w, m, v), n.onProgress?.(T, o), T >= 1 ? (this._cleanupEdgeTransitions(g, w, m), m.length && this._removeEdges(m), this._applyStepInstant(n), E && n.guidePath?.autoRemove !== !1 && E.remove(), n.onProgress?.(1, o), n.onComplete?.(o), this._emit("step-complete"), b(), !0) : !1;
      }, r);
      this._activeHandles.push(D);
    });
  }
  /** Per-tick interpolation for properties during followPath animation. */
  _interpolateFollowPathTick(e, n, o, i, r, s, l, a, c, d) {
    if (o && e.dimensions)
      for (const f of o) {
        const u = this._canvas.getNode(f), h = r.get(f);
        !u || !h || !u.dimensions || (e.dimensions.width !== void 0 && (u.dimensions.width = Ge(h.width, e.dimensions.width, n)), e.dimensions.height !== void 0 && (u.dimensions.height = Ge(h.height, e.dimensions.height, n)));
      }
    if (o && e.style) {
      const f = on(e.style);
      for (const u of o) {
        const h = this._canvas.getNode(u), p = s.get(u);
        h && p && (h.style = ir(p, f, n));
      }
    }
    if (i && e.edgeStrokeWidth !== void 0)
      for (const f of i) {
        const u = this._canvas.getEdge(f), h = l.get(f);
        u && (h !== void 0 ? u.strokeWidth = Ge(h, e.edgeStrokeWidth, n) : u.strokeWidth = e.edgeStrokeWidth);
      }
    if (i && e.edgeColor !== void 0)
      for (const f of i) {
        const u = this._canvas.getEdge(f), h = a.get(f);
        u && (h !== void 0 && typeof h == "string" ? u.color = Jo(h, e.edgeColor, n) : u.color = e.edgeColor);
      }
    if (c && d && this._canvas.viewport) {
      const f = gu(c, d, n, {
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
      validEdgeIds: l,
      viewportFrom: a,
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
        l,
        a,
        c
      ), w = Object.keys(g.nodes || {}).length > 0 || Object.keys(g.edges || {}).length > 0 || g.viewport;
      if (!w && !f.length && !u.length) {
        n.onProgress?.(1, o), n.onComplete?.(o), this._emit("step-complete"), p();
        return;
      }
      if (w) {
        const m = this._canvas.animate(g, {
          duration: i,
          easing: n.easing,
          delay: r,
          onProgress: (E) => {
            if (this._state === "stopped") {
              m.stop(), p();
              return;
            }
            this._tickEdgeTransitions(d, f, u, E), n.onProgress?.(E, o);
          },
          onComplete: () => {
            this._cleanupEdgeTransitions(d, f, u), u.length && this._removeEdges(u), this._applyStepInstant(n), h && n.guidePath?.autoRemove !== !1 && h.remove(), n.onProgress?.(1, o), n.onComplete?.(o), this._emit("step-complete"), p();
          }
        });
        this._activeHandles.push({ stop: () => m.stop() });
      } else
        this._executeEdgeLifecycleOnly(e, p);
    });
  }
  /** Build AnimateTargets from step config for canvas.animate(). */
  _buildAnimateTargets(e, n, o, i, r) {
    const s = {};
    if (n) {
      s.nodes = {};
      for (const l of n) {
        const a = {};
        e.position && (a.position = { ...e.position }), e.dimensions && (a.dimensions = { ...e.dimensions }), e.style !== void 0 && (a.style = e.style), e.class !== void 0 && (a.class = e.class), e.data !== void 0 && (a.data = e.data), e.selected !== void 0 && (a.selected = e.selected), e.zIndex !== void 0 && (a.zIndex = e.zIndex), s.nodes[l] = a;
      }
    }
    if (o) {
      s.edges = {};
      for (const l of o) {
        const a = {};
        e.edgeColor !== void 0 && (a.color = e.edgeColor), e.edgeStrokeWidth !== void 0 && (a.strokeWidth = e.edgeStrokeWidth), e.edgeLabel !== void 0 && (a.label = e.edgeLabel), e.edgeAnimated !== void 0 && (a.animated = e.edgeAnimated), e.edgeClass !== void 0 && (a.class = e.edgeClass), s.edges[l] = a;
      }
    }
    return r && i && (s.viewport = {
      pan: { x: r.x, y: r.y },
      zoom: r.zoom
    }), s;
  }
  /** Run edge lifecycle transitions (draw/fade) via the engine when there are no other animatable targets. */
  _executeEdgeLifecycleOnly(e, n) {
    const { step: o, ctx: i, duration: r, delay: s, transition: l, addEdgeIds: a, removeEdgeIds: c, guidePathEl: d } = e, f = this._engine.register((u) => {
      if (this._state === "stopped")
        return n(), !0;
      const h = Math.min(u / r, 1);
      return this._tickEdgeTransitions(l, a, c, h), o.onProgress?.(h, i), h >= 1 ? (this._cleanupEdgeTransitions(l, a, c), c.length && this._removeEdges(c), d && o.guidePath?.autoRemove !== !1 && d.remove(), o.onProgress?.(1, i), o.onComplete?.(i), this._emit("step-complete"), n(), !0) : !1;
    }, s);
    this._activeHandles.push(f);
  }
  // ── Internal: apply step properties ─────────────────────────────────
  /** Apply all properties of a step at their final values (for instant steps). */
  _applyStepFinal(e) {
    if (e.addEdges && this._addEdges(e.addEdges), e.removeEdges && this._removeEdges(e.removeEdges), e.nodes)
      for (const n of e.nodes) {
        const o = this._canvas.getNode(n);
        o && (e.position && (e.position.x !== void 0 && (o.position.x = e.position.x), e.position.y !== void 0 && (o.position.y = e.position.y)), e.class !== void 0 && (o.class = e.class), e.data !== void 0 && Object.assign(o.data, e.data), e.selected !== void 0 && (o.selected = e.selected), e.zIndex !== void 0 && (o.zIndex = e.zIndex), e.dimensions && o.dimensions && (e.dimensions.width !== void 0 && (o.dimensions.width = e.dimensions.width), e.dimensions.height !== void 0 && (o.dimensions.height = e.dimensions.height)), e.style !== void 0 && (o.style = e.style));
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
      r && If(r, n, o);
    }
  }
  /** Clean up draw transition styles. */
  _cleanupEdgeDrawTransition(e) {
    for (const n of e) {
      const o = this._canvas.getEdgePathElement?.(n);
      o && $f(o);
    }
  }
  /** Apply fade transition on each tick for added/removed edges. */
  _applyEdgeFadeTransition(e, n, o) {
    for (const i of e) {
      const r = this._canvas.getEdgeElement?.(i);
      r && Df(r, n, o);
    }
  }
  /** Clean up fade transition styles. */
  _cleanupEdgeFadeTransition(e) {
    for (const n of e) {
      const o = this._canvas.getEdgeElement?.(n);
      o && Rf(o);
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
    const i = Nt(o), r = e.fitViewPadding ?? 0.1;
    return zn(
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
    const r = n.dimensions?.width ?? we, s = n.dimensions?.height ?? ve, l = n.position.x + r / 2, a = n.position.y + s / 2;
    return {
      x: i.width / 2 - l * o.zoom,
      y: i.height / 2 - a * o.zoom,
      zoom: o.zoom
    };
  }
  /** Apply viewport at final values (for instant steps). */
  _applyViewportFinal(e) {
    const n = this._resolveTargetViewport(e);
    !n || !this._canvas.viewport || (this._canvas.viewport.x = n.x, this._canvas.viewport.y = n.y, this._canvas.viewport.zoom = n.zoom);
  }
}
const xr = /* @__PURE__ */ new Map();
function Ht(t, e) {
  xr.set(t, e);
}
function Vf(t) {
  return xr.get(t);
}
const Ne = "http://www.w3.org/2000/svg", Bf = {
  create(t, e) {
    const n = document.createElementNS(Ne, "circle");
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
}, Xf = {
  create(t, e) {
    const n = document.createElementNS(Ne, "g"), o = e.size ?? 6, i = e.color ?? "#8B5CF6", r = document.createElementNS(Ne, "circle");
    r.setAttribute("r", String(o * 1.5)), r.setAttribute("fill", i), r.setAttribute("opacity", "0.3"), n.appendChild(r);
    const s = document.createElementNS(Ne, "circle");
    if (s.setAttribute("r", String(o)), s.setAttribute("fill", i), n.appendChild(s), e.class)
      for (const l of e.class.split(" "))
        l && n.classList.add(l);
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
let Yf = 0;
const qf = {
  create(t, e) {
    const n = document.createElementNS(Ne, "g");
    if (n.__beamLength = e.length ?? 30, n.__beamWidth = e.width ?? 4, n.__beamColor = e.color ?? "#8B5CF6", n.__beamGradient = e.gradient, n.__beamFollowThrough = e.followThrough ?? !0, n.__beamUid = `afbeam-${++Yf}`, e.class)
      for (const o of e.class.split(" "))
        o && n.classList.add(o);
    return t.appendChild(n), n;
  },
  update(t, e) {
    const n = t, o = n.__beamLength, i = n.__beamWidth, r = n.__beamColor, s = n.__beamGradient, l = n.__beamUid;
    if (e.pathEl) {
      let d = n.__pathClone, f = n.__gradient;
      if (!d) {
        let g = r;
        if (s && s.length > 0) {
          const w = document.createElementNS(Ne, "defs");
          f = document.createElementNS(Ne, "linearGradient"), f.setAttribute("id", l), f.setAttribute("gradientUnits", "userSpaceOnUse");
          for (const m of s) {
            const E = document.createElementNS(Ne, "stop");
            E.setAttribute("offset", String(m.offset)), E.setAttribute("stop-color", m.color), m.opacity !== void 0 && E.setAttribute("stop-opacity", String(m.opacity)), f.appendChild(E);
          }
          w.appendChild(f), n.appendChild(w), g = `url(#${l})`, n.__gradient = f;
        }
        d = document.createElementNS(Ne, "path"), d.setAttribute("d", e.pathEl.getAttribute("d") ?? ""), d.setAttribute("fill", "none"), d.style.stroke = g, d.style.strokeWidth = String(i), d.style.strokeLinecap = "round", d.style.fill = "none", s || (d.style.opacity = "0.85"), d.setAttribute("stroke-dasharray", `${o} ${e.pathLength}`), n.appendChild(d), n.__pathClone = d;
      }
      const h = n.__beamFollowThrough ? e.progress * (e.pathLength + o) : e.progress * e.pathLength, p = o - h;
      if (d.setAttribute("stroke-dashoffset", String(p)), f) {
        const g = Math.max(0, Math.min(e.pathLength, h)), w = Math.max(0, Math.min(e.pathLength, h - o)), m = e.pathEl.getPointAtLength(g), E = e.pathEl.getPointAtLength(w);
        f.setAttribute("x1", String(E.x)), f.setAttribute("y1", String(E.y)), f.setAttribute("x2", String(m.x)), f.setAttribute("y2", String(m.y));
      }
      return;
    }
    let a = n.__fallbackRect;
    a || (a = document.createElementNS(Ne, "rect"), a.setAttribute("width", String(o)), a.setAttribute("height", String(i)), a.setAttribute("rx", String(i / 2)), a.setAttribute("fill", r), a.setAttribute("opacity", "0.8"), n.appendChild(a), n.__fallbackRect = a);
    const c = Math.atan2(e.velocity.y, e.velocity.x) * (180 / Math.PI);
    a.setAttribute(
      "transform",
      `translate(${e.x - o / 2},${e.y - i / 2}) rotate(${c},${o / 2},${i / 2})`
    );
  },
  destroy(t) {
    t.remove();
  }
}, Wf = {
  create(t, e) {
    const n = document.createElementNS(Ne, "circle");
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
}, jf = {
  create(t, e) {
    const n = e.size ?? 16, o = e.href ?? "";
    let i;
    if (o.startsWith("#") ? (i = document.createElementNS(Ne, "use"), i.setAttribute("href", o), i.setAttribute("width", String(n)), i.setAttribute("height", String(n))) : (i = document.createElementNS(Ne, "image"), i.setAttribute("href", o), i.setAttribute("width", String(n)), i.setAttribute("height", String(n))), e.class)
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
Ht("circle", Bf);
Ht("orb", Xf);
Ht("beam", qf);
Ht("pulse", Wf);
Ht("image", jf);
let Qi = !1;
function Uf(t) {
  const e = t.match(/^([\d.]+)(ms|s)?$/);
  if (!e) return 2e3;
  const n = parseFloat(e[1]);
  return e[2] === "ms" ? n : n * 1e3;
}
function es(t, e, n) {
  if (t.speed !== void 0 && t.speed > 0)
    return t.duration !== void 0 && console.warn("[AlpineFlow] Both speed and duration provided for particle; speed takes precedence."), e / t.speed * 1e3;
  const o = t.duration ?? n;
  return typeof o == "number" ? o : Uf(o);
}
function Zf(t) {
  function e(o, i, r = {}, s = {}) {
    const l = r.renderer ?? "circle", a = Vf(l);
    if (!a) {
      B("particle", `_fireParticleOnPath: unknown renderer "${l}"`);
      return;
    }
    l === "beam" && typeof r.onComplete == "function" && r.followThrough === void 0 && !Qi && (Qi = !0, console.warn(
      "[AlpineFlow] beam `onComplete` fires after the tail exits the path (follow-through is on by default). Pass `followThrough: false` if you want `onComplete` to fire when the head reaches the target."
    ));
    const c = t._containerStyles, d = r.size ?? s.size ?? (parseFloat(c?.getPropertyValue("--flow-edge-dot-size").trim() ?? "4") || 4), f = r.color ?? s.color ?? c?.getPropertyValue("--flow-edge-dot-fill").trim() ?? nn, u = s.durationFallback ?? c?.getPropertyValue("--flow-edge-dot-duration").trim() ?? "2s", h = o.getTotalLength(), p = es(r, h, u), g = { ...r, size: d, color: f }, w = a.create(i, g), m = o.getPointAtLength(0), E = {
      x: m.x,
      y: m.y,
      progress: 0,
      velocity: { x: 0, y: 0 },
      pathLength: h,
      elapsed: 0,
      pathEl: o
    };
    a.update(w, E);
    let C;
    const b = new Promise((P) => {
      C = P;
    }), D = () => {
      typeof r.onComplete == "function" && r.onComplete(), C();
    }, M = s.wrapOnComplete ? s.wrapOnComplete(D) : D, T = {
      element: w,
      renderer: a,
      pathEl: o,
      startElapsed: -1,
      // set on first engine tick
      ms: p,
      onComplete: M,
      currentPosition: { x: m.x, y: m.y }
    };
    return t._activeParticles.add(T), t._particleEngineHandle || (t._particleEngineHandle = On.register((P) => t._tickParticles(P))), {
      getCurrentPosition() {
        return t._activeParticles.has(T) ? { ...T.currentPosition } : null;
      },
      stop() {
        t._activeParticles.has(T) && (T.renderer.destroy(T.element), t._activeParticles.delete(T), M());
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
    const l = e(s, r, i, {
      wrapOnComplete: (a) => () => {
        a(), s.remove();
      }
    });
    if (!l) {
      s.remove();
      return;
    }
    return B("particle", "sendParticleAlongPath", { path: o.slice(0, 40) }), l;
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
        let l = i.get(r.pathEl);
        l === void 0 && (l = r.pathEl.getTotalLength(), i.set(r.pathEl, l));
        const a = r.pathEl.getPointAtLength(s * l), c = {
          x: a.x,
          y: a.y,
          progress: s,
          velocity: {
            x: a.x - r.currentPosition.x,
            y: a.y - r.currentPosition.y
          },
          pathLength: l,
          elapsed: o - r.startElapsed,
          pathEl: r.pathEl
        };
        r.renderer.update(r.element, c), r.currentPosition = { x: a.x, y: a.y };
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
      const l = t.getEdgePathElement(o);
      if (!l) {
        B("particle", `sendParticle: no path element for edge "${o}"`);
        return;
      }
      if (!l.getAttribute("d")) {
        B("particle", `sendParticle: edge "${o}" path has no d attribute`);
        return;
      }
      const c = t.getEdgeElement(o);
      if (!c) return;
      const d = t._containerStyles, f = i.size ?? s.particleSize ?? (parseFloat(d?.getPropertyValue("--flow-edge-dot-size").trim() ?? "4") || 4), u = i.color ?? s.particleColor ?? d?.getPropertyValue("--flow-edge-dot-fill").trim() ?? nn, h = s.animationDuration ?? d?.getPropertyValue("--flow-edge-dot-duration").trim() ?? "2s", p = e(l, c, i, {
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
      const l = t.getNode(i);
      if (!l) {
        B("particle", `sendParticleBetween: target node "${i}" not found`);
        return;
      }
      const a = s.position.x + (s.dimensions?.width ?? 150) / 2, c = s.position.y + (s.dimensions?.height ?? 40) / 2, d = l.position.x + (l.dimensions?.width ?? 150) / 2, f = l.position.y + (l.dimensions?.height ?? 40) / 2, u = `M ${a} ${c} L ${d} ${f}`;
      return B("particle", `sendParticleBetween "${o}" -> "${i}"`, { path: u }), n(u, r);
    },
    // ── Burst: sequenced multi-particle emission ─────────────────────────
    /**
     * Fire multiple particles along a single edge with staggered timing.
     * An optional `variant` function customizes each particle individually.
     */
    sendParticleBurst(o, i) {
      const { count: r, stagger: s = 100, variant: l, ...a } = i, c = [], d = [];
      for (let u = 0; u < r; u++) {
        const h = l ? { ...a, ...l(u, r) } : { ...a };
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
      const { targetNodeId: r, synchronize: s = "arrival", onAllArrived: l, ...a } = i, c = [], d = [];
      if (s === "arrival") {
        const u = o.map((g) => {
          const m = t.getEdgePathElement(g)?.getTotalLength() ?? 0;
          return { id: g, length: m };
        }).filter((g) => g.length > 0);
        if (u.length === 0) {
          const g = Promise.resolve();
          return { get handles() {
            return [];
          }, finished: g, stopAll() {
          } };
        }
        const h = Math.max(...u.map((g) => g.length)), p = es(a, h, "2s");
        for (const { id: g, length: w } of u) {
          const m = w / h, E = p * m, C = p - E;
          if (C <= 0) {
            const b = this.sendParticle(g, { ...a, duration: E });
            b && c.push(b);
          } else {
            const b = setTimeout(() => {
              const D = this.sendParticle(g, { ...a, duration: E });
              D && c.push(D);
            }, C);
            d.push(b);
          }
        }
      } else
        for (const u of o) {
          const h = this.sendParticle(u, a);
          h && c.push(h);
        }
      const f = new Promise((u) => {
        setTimeout(() => {
          Promise.all(c.map((p) => p.finished)).then(() => {
            l?.(), u();
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
class Gf {
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
const Ro = 1, Ho = 1 / 60;
class jt {
  constructor(e) {
    this._virtualTime = 0, this._inFlight = /* @__PURE__ */ new Map(), this._state = me(e);
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
    return me(this._state);
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
            o?.id && (this._state.nodes[o.id] = me(o));
        else n?.id ? this._state.nodes[n.id] = me(n) : e.args.id && e.args.node && (this._state.nodes[e.args.id] = me(e.args.node));
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
            o?.id && (this._state.edges[o.id] = me(o));
        else n?.id ? this._state.edges[n.id] = me(n) : e.args.id && e.args.edge && (this._state.edges[e.args.id] = me(e.args.edge));
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
    this._state = me(e.canvas), this._virtualTime = e.t, this._inFlight.clear();
    for (const n of e.inFlight) {
      const o = me(n);
      this._rehydrateAnim(o), this._inFlight.set(o.handleId, o);
    }
  }
  /** Capture the current engine state as a serializable Checkpoint payload. */
  captureCheckpointData() {
    return {
      canvas: me(this._state),
      inFlight: [...this._inFlight.values()].map((e) => this._serializeAnim(e)),
      tagRegistry: {}
    };
  }
  // ── Private helpers ───────────────────────────────────────────────────────
  _applyAnimate(e) {
    const n = e.args.handleId ?? `virt-${this._virtualTime.toFixed(3)}-${this._inFlight.size}`;
    e.args.handleId || console.warn("[AlpineFlow VirtualEngine] animate event missing handleId — determinism not guaranteed for this event");
    const o = e.args.targets ?? {}, i = e.args.options ?? {}, r = i.motion, s = r ? lr(r) ?? void 0 : void 0, l = {
      handleId: n,
      type: s ? s.type : "eased",
      targets: me(o),
      startTime: this._virtualTime,
      duration: i.duration,
      easing: i.easing,
      motion: s,
      direction: "forward",
      currentValues: {},
      _motion: s
    };
    this._initAnim(l), this._inFlight.set(n, l);
  }
  _initAnim(e) {
    const n = {}, o = {};
    if (this._collectNumericProperties(e.targets, n, o, this._state), e._from = n, e.type === "eased")
      e._easingFn = Vn(e.easing);
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
    for (const [s, l] of Object.entries(e.nodes ?? {})) {
      const a = i.nodes[s];
      if (!a)
        continue;
      const c = l.position;
      c?.x !== void 0 && (n[`nodes.${s}.position.x`] = a.position?.x ?? 0, o[`nodes.${s}.position.x`] = c.x), c?.y !== void 0 && (n[`nodes.${s}.position.y`] = a.position?.y ?? 0, o[`nodes.${s}.position.y`] = c.y);
    }
    const r = e.viewport;
    r?.pan?.x !== void 0 && (n["viewport.x"] = i.viewport.x, o["viewport.x"] = r.pan.x), r?.pan?.y !== void 0 && (n["viewport.y"] = i.viewport.y, o["viewport.y"] = r.pan.y), r?.zoom !== void 0 && (n["viewport.zoom"] = i.viewport.zoom, o["viewport.zoom"] = r.zoom);
  }
  _rehydrateAnim(e) {
    if (e._motion = e.motion, e.type === "eased") {
      e._easingFn = Vn(e.easing), e._from = e.fromValues ? { ...e.fromValues } : { ...e.currentValues ?? {} };
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
    return me({
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
      const l = e._from[s], a = this._getTargetValue(s, e.targets) ?? l, c = Ge(l, a, r);
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
            sr(r, o, n);
            break;
          case "decay":
            Qo(r, o, n);
            break;
          case "inertia":
            rr(r, o, n, i);
            break;
          case "keyframes": {
            const s = o, l = s.duration ?? 5e3, a = l > 0 ? Math.min((this._virtualTime - e.startTime) / l, 1) : 1;
            ar(r, s, a, i), a >= 1 && (r.settled = !0);
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
const Er = /* @__PURE__ */ new Map();
function ii(t, e) {
  Er.set(t, e);
}
function Kf(t) {
  return Er.get(t);
}
function si(t, e = 20) {
  const n = Object.values(t);
  if (n.length === 0)
    return null;
  let o = 1 / 0, i = 1 / 0, r = -1 / 0, s = -1 / 0;
  for (const l of n) {
    const a = l.position?.x ?? 0, c = l.position?.y ?? 0, d = l.dimensions?.width ?? 150, f = l.dimensions?.height ?? 40;
    o = Math.min(o, a), i = Math.min(i, c), r = Math.max(r, a + d), s = Math.max(s, c + f);
  }
  return o -= e, i -= e, r += e, s += e, { minX: o, minY: i, vbWidth: r - o, vbHeight: s - i };
}
function Sr(t) {
  let e = "";
  for (const n of Object.values(t.edges)) {
    const o = t.nodes[n.source], i = t.nodes[n.target];
    if (!o || !i)
      continue;
    const r = (o.position?.x ?? 0) + (o.dimensions?.width ?? 150) / 2, s = (o.position?.y ?? 0) + (o.dimensions?.height ?? 40) / 2, l = (i.position?.x ?? 0) + (i.dimensions?.width ?? 150) / 2, a = (i.position?.y ?? 0) + (i.dimensions?.height ?? 40) / 2;
    e += `<line x1="${r}" y1="${s}" x2="${l}" y2="${a}" stroke="currentColor" stroke-width="1" opacity="0.5"/>`;
  }
  return e;
}
const Jf = {
  render(t, { width: e, height: n }) {
    const o = Object.values(t.nodes);
    if (o.length === 0)
      return `<svg width="${e}" height="${n}" xmlns="http://www.w3.org/2000/svg"></svg>`;
    const i = si(t.nodes);
    if (!i)
      return `<svg width="${e}" height="${n}" xmlns="http://www.w3.org/2000/svg"></svg>`;
    const { minX: r, minY: s, vbWidth: l, vbHeight: a } = i;
    let c = `<svg width="${e}" height="${n}" viewBox="${r} ${s} ${l} ${a}" xmlns="http://www.w3.org/2000/svg">`;
    c += Sr(t);
    for (const d of o) {
      const f = d.position?.x ?? 0, u = d.position?.y ?? 0, h = d.dimensions?.width ?? 150, p = d.dimensions?.height ?? 40;
      c += `<rect x="${f}" y="${u}" width="${h}" height="${p}" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1" rx="4"/>`;
    }
    return c += "</svg>", c;
  }
}, Qf = {
  render(t, { width: e, height: n }) {
    const o = Object.values(t.nodes);
    if (o.length === 0)
      return `<svg width="${e}" height="${n}" xmlns="http://www.w3.org/2000/svg"></svg>`;
    const i = si(t.nodes);
    if (!i)
      return `<svg width="${e}" height="${n}" xmlns="http://www.w3.org/2000/svg"></svg>`;
    const { minX: r, minY: s, vbWidth: l, vbHeight: a } = i;
    let c = `<svg width="${e}" height="${n}" viewBox="${r} ${s} ${l} ${a}" xmlns="http://www.w3.org/2000/svg">`;
    for (const d of Object.values(t.edges)) {
      const f = t.nodes[d.source], u = t.nodes[d.target];
      if (!f || !u)
        continue;
      const h = (f.position?.x ?? 0) + (f.dimensions?.width ?? 150) / 2, p = (f.position?.y ?? 0) + (f.dimensions?.height ?? 40) / 2, g = (u.position?.x ?? 0) + (u.dimensions?.width ?? 150) / 2, w = (u.position?.y ?? 0) + (u.dimensions?.height ?? 40) / 2;
      c += `<line x1="${h}" y1="${p}" x2="${g}" y2="${w}" stroke="currentColor" stroke-width="1.5" opacity="0.7"/>`;
    }
    for (const d of o) {
      const f = d.position?.x ?? 0, u = d.position?.y ?? 0, h = d.dimensions?.width ?? 150, p = d.dimensions?.height ?? 40;
      c += `<rect x="${f}" y="${u}" width="${h}" height="${p}" fill="none" stroke="currentColor" stroke-width="1.5" rx="4"/>`;
    }
    return c += "</svg>", c;
  }
}, eh = {
  render(t, { width: e, height: n, inFlight: o }) {
    const i = Object.values(t.nodes);
    if (i.length === 0)
      return `<svg width="${e}" height="${n}" xmlns="http://www.w3.org/2000/svg"></svg>`;
    const r = si(t.nodes);
    if (!r)
      return `<svg width="${e}" height="${n}" xmlns="http://www.w3.org/2000/svg"></svg>`;
    const s = /* @__PURE__ */ new Set();
    if (o) {
      for (const u of o)
        if (u.targets?.nodes)
          for (const h of Object.keys(u.targets.nodes))
            s.add(h);
    }
    const { minX: l, minY: a, vbWidth: c, vbHeight: d } = r;
    let f = `<svg width="${e}" height="${n}" viewBox="${l} ${a} ${c} ${d}" xmlns="http://www.w3.org/2000/svg">`;
    f += Sr(t);
    for (const u of i) {
      const h = u.position?.x ?? 0, p = u.position?.y ?? 0, g = u.dimensions?.width ?? 150, w = u.dimensions?.height ?? 40;
      s.has(u.id ?? "") ? f += `<rect x="${h}" y="${p}" width="${g}" height="${w}" fill="currentColor" fill-opacity="0.8" stroke="currentColor" stroke-width="2" rx="4"/>` : f += `<rect x="${h}" y="${p}" width="${g}" height="${w}" fill="currentColor" fill-opacity="0.1" stroke="currentColor" stroke-width="1" rx="4" opacity="0.3"/>`;
    }
    return f += "</svg>", f;
  }
};
ii("faithful", Jf);
ii("outline", Qf);
ii("activity", eh);
function Fo(t, e) {
  let n = 0, o = t.length;
  for (; n < o; ) {
    const i = n + o >>> 1;
    t[i].t > e ? o = i : n = i + 1;
  }
  return n;
}
function zo(t, e) {
  let n = 0, o = t.length;
  for (; n < o; ) {
    const i = n + o >>> 1;
    t[i].t >= e ? o = i : n = i + 1;
  }
  return n;
}
function th(t, e) {
  return e.split(".").reduce((n, o) => n?.[o], t);
}
function Cr(t) {
  if (t !== null && typeof t == "object") {
    Object.freeze(t);
    for (const e of Object.keys(t))
      Cr(t[e]);
  }
  return t;
}
class ri {
  constructor(e) {
    this.version = e.version, this.duration = e.duration, this.initialState = Cr(me(e.initialState)), this.events = Object.freeze(me(e.events)), this.checkpoints = Object.freeze(me(e.checkpoints)), this.metadata = Object.freeze({ ...e.metadata ?? {} }), Object.freeze(this);
  }
  toJSON() {
    return {
      version: this.version,
      duration: this.duration,
      initialState: me(this.initialState),
      events: me(this.events),
      checkpoints: me(this.checkpoints),
      metadata: { ...this.metadata }
    };
  }
  static fromJSON(e) {
    if (e.version > Ro)
      throw new Error(
        `[AlpineFlow] Recording version ${e.version} is newer than supported (${Ro}). Please update AlpineFlow to replay this recording.`
      );
    return new ri(e);
  }
  /**
   * Returns unique subjects (nodes, edges, timelines, particles) that appeared
   * during the recording, with their first-seen and last-seen timestamps.
   */
  getSubjects() {
    const e = /* @__PURE__ */ new Map(), n = (o, i, r) => {
      const s = `${o}:${i}`, l = e.get(s);
      l ? (r < l.firstSeenT && (l.firstSeenT = r), r > l.lastSeenT && (l.lastSeenT = r)) : e.set(s, { kind: o, id: i, firstSeenT: r, lastSeenT: r });
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
          for (const l of Object.keys(s.targets?.nodes ?? {}))
            n("node", l, i);
          for (const l of Object.keys(s.targets?.edges ?? {}))
            n("edge", l, i);
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
            for (const l of s.sources)
              n("edge", l, i);
          s.options?.targetNodeId && n("node", s.options.targetNodeId, i);
          break;
        case "node-add":
        case "node-remove":
          if (s.id && n("node", s.id, i), Array.isArray(s.nodes))
            for (const l of s.nodes)
              l.id && n("node", l.id, i);
          break;
        case "edge-add":
        case "edge-remove":
          if (s.id && n("edge", s.id, i), Array.isArray(s.edges))
            for (const l of s.edges)
              l.id && n("edge", l.id, i);
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
            return !!(s.id === e || Array.isArray(s.nodes) && s.nodes.some((a) => a.id === e));
          case "edge-add":
          case "edge-remove":
            return !!(s.id === e || Array.isArray(s.edges) && s.edges.some((a) => a.id === e));
          default:
            return !1;
        }
      })())
        switch (r) {
          case "animate": {
            const a = s.options?.duration ?? 0;
            n.push({ startT: i, endT: i + a, reason: "animate" });
            break;
          }
          case "particle":
          case "particle-burst":
          case "particle-between": {
            const a = s.options?.duration ?? s.duration ?? 1;
            n.push({ startT: i, endT: i + a, reason: r });
            break;
          }
          case "converging": {
            const a = s.options?.duration ?? 1;
            n.push({ startT: i, endT: i + a, reason: "converging" });
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
      const i = th(o.canvas, e);
      i !== void 0 && n.push({ t: o.t, v: i });
    }
    return n;
  }
  /**
   * Returns the canvas state at virtual time `t` by running the VirtualEngine
   * up to that point from the nearest prior checkpoint.
   */
  getStateAt(e) {
    const n = new jt(this.initialState);
    let o = null;
    for (const c of this.checkpoints)
      c.t <= e && (!o || c.t > o.t) && (o = c);
    o && n.restoreCheckpoint(o);
    const i = o?.t ?? 0, r = this.events;
    let s = i;
    const l = Ho * 1e3;
    let a = o ? Fo(r, i) : zo(r, i);
    for (; s < e; ) {
      const c = Math.min(s + l, e);
      for (; a < r.length && r[a].t <= c; )
        n.applyEvent(r[a]), a++;
      const d = (c - s) / 1e3;
      n.advance(d), s = c;
    }
    return n.getState();
  }
  /**
   * Renders a thumbnail SVG snapshot of the canvas state at virtual time `t`.
   */
  renderThumbnailAt(e, n) {
    const o = this.getStateAt(e), i = n.renderer ?? "faithful", r = Kf(i);
    if (!r)
      throw new Error(`[AlpineFlow] Unknown thumbnail renderer "${i}"`);
    return r.render(o, { width: n.width, height: n.height });
  }
}
class nh {
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
      version: Ro,
      duration: this._virtualNow(),
      initialState: o,
      events: this._events,
      checkpoints: this._checkpoints,
      metadata: n
    };
    return new ri(i);
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
    for (const [s, l] of Object.entries(o)) {
      const a = i.get(s);
      if (!a) continue;
      const c = l.position;
      c?.x !== void 0 && (n[`nodes.${s}.position.x`] = a.position?.x ?? 0), c?.y !== void 0 && (n[`nodes.${s}.position.y`] = a.position?.y ?? 0);
    }
    const r = e?.viewport;
    return r?.pan?.x !== void 0 && (n["viewport.x"] = this._canvas.viewport.x), r?.pan?.y !== void 0 && (n["viewport.y"] = this._canvas.viewport.y), r?.zoom !== void 0 && (n["viewport.zoom"] = this._canvas.viewport.zoom), n;
  }
  _captureSnapshot() {
    const e = {};
    for (const o of this._canvas.nodes ?? [])
      o && typeof o == "object" && "id" in o && (e[o.id] = me(o));
    const n = {};
    for (const o of this._canvas.edges ?? [])
      o && typeof o == "object" && "id" in o && (n[o.id] = me(o));
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
        const a = o.motion;
        typeof a == "string" ? r = a.split(".")[0] : a && typeof a == "object" && a.type && (r = a.type);
      }
      let s = {};
      const l = n.handle?.currentValue;
      l && typeof l.forEach == "function" && l.forEach((a, c) => {
        s[c] = a;
      }), e.push({
        handleId: n.handleId,
        type: r,
        targets: me(n.targets),
        startTime: n.eventT,
        duration: i ? void 0 : o.duration ?? 300,
        easing: i ? void 0 : o.easing,
        motion: i ? me(o.motion) : void 0,
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
      typeof s == "function" && (this._originalMethods[o] = s, this._canvas[o] = (...l) => {
        const a = r ? r(...l) : { args: l };
        return this._recordEvent(i, a), s.apply(this._canvas, l);
      });
    }, n = (o, i) => {
      const r = this._canvas[o];
      typeof r == "function" && (this._originalMethods[o] = r, this._canvas[o] = (s, l) => {
        const a = `rec-${++this._eventCounter}`, c = this._virtualNow(), d = this._snapshotFromValues(s);
        this._recordEvent(i, { targets: s, options: l, handleId: a });
        const f = r.apply(this._canvas, [s, l]);
        if (f && typeof f == "object" && f.finished && !f.isFinished) {
          const u = { handleId: a, eventT: c, targets: s, options: l, handle: f, fromValues: d };
          this._activeAnims.set(a, u), f.finished.then(() => {
            this._activeAnims.delete(a);
          }).catch(() => {
            this._activeAnims.delete(a);
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
class oh {
  constructor(e, n, o = {}) {
    this._currentTime = 0, this._state = "idle", this._direction = "forward", this._speed = 1, this._rafHandle = null, this._lastWallTime = 0, this._resolveFinished = () => {
    }, this.recording = n, this._canvas = e, this._virtualEngine = new jt(n.initialState), this._speed = o.speed ?? 1, this._direction = this._speed < 0 ? "backward" : "forward", this._from = o.from ?? 0, this._to = o.to ?? n.duration, this._loop = o.loop ?? !1, this._currentTime = this._from, this._from > 0 && this._seekEngineTo(this._from), o.skipInitialState || this._applyStateToCanvas(this._virtualEngine.getState()), this.finished = new Promise((i) => {
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
    this._state !== "playing" && (this._state === "ended" && (this._currentTime = this._from, this._seekEngineTo(this._from), this._applyStateToCanvas(this._virtualEngine.getState())), this._state = "playing", this._lastWallTime = ho(), this._scheduleTick());
  }
  pause() {
    this._state === "playing" && (this._state = "paused", this._cancelTick());
  }
  stop() {
    this._cancelTick(), this._currentTime = this._from, this._virtualEngine = new jt(this.recording.initialState), this._applyStateToCanvas(this._virtualEngine.getState()), this._state = "idle";
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
    const n = this._findNearestCheckpoint(e), o = new jt(this.recording.initialState);
    n && o.restoreCheckpoint(n);
    const i = n?.t ?? 0, r = this.recording.events;
    let s = i;
    const l = Ho * 1e3;
    let a = n ? Fo(r, i) : zo(r, i);
    for (; s < e; ) {
      const c = Math.min(s + l, e);
      for (; a < r.length && r[a].t <= c; )
        o.applyEvent(r[a]), a++;
      const d = (c - s) / 1e3;
      d > 0 && o.advance(d), s = c;
    }
    return o.getState();
  }
  // ── Private ─────────────────────────────────────────────────────────────
  _tick() {
    if (this._state !== "playing")
      return;
    const e = ho(), n = (e - this._lastWallTime) / 1e3;
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
    n ? this._virtualEngine.restoreCheckpoint(n) : this._virtualEngine = new jt(this.recording.initialState), this._walkTo(n?.t ?? 0, e);
  }
  _walkTo(e, n, o = !1) {
    if (n <= e)
      return;
    const i = this.recording.events;
    let r = e;
    const s = Ho * 1e3;
    let l = e === 0 ? zo(i, 0) : Fo(i, e);
    for (; r < n; ) {
      const a = Math.min(r + s, n);
      for (; l < i.length && i[l].t <= a; ) {
        const d = i[l];
        this._virtualEngine.applyEvent(d), o && this._dispatchLiveParticle(d), l++;
      }
      const c = (a - r) / 1e3;
      c > 0 && this._virtualEngine.advance(c), r = a;
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
        this._loop = typeof this._loop == "number" ? e : !0, this._currentTime = this._from, this._seekEngineTo(this._from), this._applyStateToCanvas(this._virtualEngine.getState()), this._state = "playing", this._lastWallTime = ho(), this._scheduleTick();
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
          const l = this._canvas.nodes.findIndex((a) => a?.id === s);
          l !== -1 && this._canvas.nodes.splice(l, 1);
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
          const l = this._canvas.edges.findIndex((a) => a?.id === s);
          l !== -1 && this._canvas.edges.splice(l, 1);
        }
  }
}
function ho() {
  return typeof performance < "u" && typeof performance.now == "function" ? performance.now() : Date.now();
}
function ih(t) {
  const e = Zf(t);
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
      const n = new oi(t, On);
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
        const h = o.boundTo;
        "node" in h ? o = {
          ...o,
          while: () => t.getNode(h.node)?.[h.property] === h.equals
        } : "edge" in h && (o = {
          ...o,
          while: () => t.getEdge(h.edge)?.[h.property] === h.equals
        });
      }
      const i = o.duration ?? 0, r = [], s = /* @__PURE__ */ new Set(), l = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Set(), c = n.nodes ? Object.keys(n.nodes).length : 0, d = n.edges ? Object.keys(n.edges).length : 0;
      if (B("animate", "update() called", {
        nodes: c,
        edges: d,
        viewport: !!n.viewport,
        duration: i,
        easing: o.easing ?? "default",
        instant: i === 0
      }), n.nodes)
        for (const [h, p] of Object.entries(n.nodes)) {
          const g = t._nodeMap.get(h);
          if (!g) continue;
          const m = (p._duration ?? i) === 0;
          if (p.followPath && !m) {
            let E = null;
            typeof p.followPath == "function" ? E = p.followPath : E = ni(p.followPath);
            let C = null;
            if (p.guidePath?.visible && typeof p.followPath == "string" && typeof document < "u") {
              const b = t.getEdgeSvgElement?.();
              b && (C = document.createElementNS("http://www.w3.org/2000/svg", "path"), C.setAttribute("d", p.followPath), C.classList.add("flow-guide-path"), p.guidePath.class && C.classList.add(p.guidePath.class), b.appendChild(C));
            }
            if (E) {
              const b = E, D = C, M = p.guidePath?.autoRemove !== !1;
              r.push({
                key: `node:${h}:followPath`,
                from: 0,
                to: 1,
                apply: (T) => {
                  const v = t._nodeMap.get(h);
                  if (!v) return;
                  const P = b(T);
                  Se().raw(v).position.x = P.x, Se().raw(v).position.y = P.y, s.add(h), T >= 1 && D && M && D.remove();
                }
              });
            }
          } else if (p.position) {
            const C = Se().raw(g).position;
            if (p.position.x !== void 0) {
              const b = p.position.x;
              if (m)
                C.x = b;
              else {
                const D = C.x;
                r.push({
                  key: `node:${h}:position.x`,
                  from: D,
                  to: b,
                  apply: (M) => {
                    const T = t._nodeMap.get(h);
                    T && (Se().raw(T).position.x = M, s.add(h));
                  }
                });
              }
            }
            if (p.position.y !== void 0) {
              const b = p.position.y;
              if (m)
                C.y = b;
              else {
                const D = C.y;
                r.push({
                  key: `node:${h}:position.y`,
                  from: D,
                  to: b,
                  apply: (M) => {
                    const T = t._nodeMap.get(h);
                    T && (Se().raw(T).position.y = M), s.add(h);
                  }
                });
              }
            }
            m && s.add(h);
          }
          if (p.data !== void 0 && Object.assign(g.data, p.data), p.class !== void 0 && (g.class = p.class), p.selected !== void 0 && (g.selected = p.selected), p.zIndex !== void 0 && (g.zIndex = p.zIndex), p.style !== void 0)
            if (m)
              g.style = p.style, l.add(h);
            else {
              const E = on(g.style || {}), C = on(p.style), b = t._nodeElements.get(h);
              if (b) {
                const D = getComputedStyle(b);
                for (const M of Object.keys(C))
                  E[M] === void 0 && (E[M] = D.getPropertyValue(M));
              }
              r.push({
                key: `node:${h}:style`,
                from: 0,
                to: 1,
                apply: (D) => {
                  const M = t._nodeMap.get(h);
                  M && (Se().raw(M).style = ir(E, C, D), l.add(h));
                }
              });
            }
          p.dimensions && g.dimensions && (p.dimensions.width !== void 0 && (m ? g.dimensions.width = p.dimensions.width : r.push({
            key: `node:${h}:dimensions.width`,
            from: g.dimensions.width,
            to: p.dimensions.width,
            apply: (E) => {
              g.dimensions.width = E;
            }
          })), p.dimensions.height !== void 0 && (m ? g.dimensions.height = p.dimensions.height : r.push({
            key: `node:${h}:dimensions.height`,
            from: g.dimensions.height,
            to: p.dimensions.height,
            apply: (E) => {
              g.dimensions.height = E;
            }
          })));
        }
      if (n.edges)
        for (const [h, p] of Object.entries(n.edges)) {
          const g = t._edgeMap.get(h);
          if (!g) continue;
          const m = (p._duration ?? i) === 0;
          if (p.color !== void 0)
            if (typeof p.color == "object")
              g.color = p.color;
            else if (m)
              g.color = p.color, a.add(h);
            else {
              const E = typeof g.color == "string" && g.color || getComputedStyle(t._container).getPropertyValue("--flow-edge-stroke").trim() || Ko;
              r.push({
                key: `edge:${h}:color`,
                from: E,
                to: p.color,
                apply: (C) => {
                  const b = t._edgeMap.get(h);
                  b && (Se().raw(b).color = C, a.add(h));
                }
              });
            }
          if (p.strokeWidth !== void 0)
            if (m)
              g.strokeWidth = p.strokeWidth, a.add(h);
            else {
              const E = g.strokeWidth ?? (parseFloat(getComputedStyle(t._container).getPropertyValue("--flow-edge-stroke-width").trim() || "1") || 1);
              r.push({
                key: `edge:${h}:strokeWidth`,
                from: E,
                to: p.strokeWidth,
                apply: (C) => {
                  const b = t._edgeMap.get(h);
                  b && (Se().raw(b).strokeWidth = C, a.add(h));
                }
              });
            }
          p.label !== void 0 && (g.label = p.label), p.animated !== void 0 && (g.animated = p.animated), p.class !== void 0 && (g.class = p.class);
        }
      if (n.viewport) {
        const h = n.viewport, g = (h._duration ?? i) === 0, w = t.viewport;
        h.pan?.x !== void 0 && (g ? w.x = h.pan.x : r.push({
          key: "viewport:pan.x",
          from: w.x,
          to: h.pan.x,
          apply: (m) => {
            w.x = m;
          }
        })), h.pan?.y !== void 0 && (g ? w.y = h.pan.y : r.push({
          key: "viewport:pan.y",
          from: w.y,
          to: h.pan.y,
          apply: (m) => {
            w.y = m;
          }
        })), h.zoom !== void 0 && (g ? w.zoom = h.zoom : r.push({
          key: "viewport:zoom",
          from: w.zoom,
          to: h.zoom,
          apply: (m) => {
            w.zoom = m;
          }
        }));
      }
      if (r.length === 0) {
        s.size > 0 && (t._flushNodePositions(s), t._refreshEdgePaths(s)), l.size > 0 && t._flushNodeStyles(l), a.size > 0 && t._flushEdgeStyles(a);
        const h = {
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
        return o.onComplete?.(), h;
      }
      const u = Se().raw(t._animator).animate(r, {
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
        onProgress(h) {
          s.size > 0 && (t._flushNodePositions(s), t._refreshEdgePaths(s), s.clear()), l.size > 0 && (t._flushNodeStyles(l), l.clear()), a.size > 0 && (t._flushEdgeStyles(a), a.clear()), n.viewport && t._flushViewport(), o.onProgress?.(h);
        },
        onComplete() {
          if (n.nodes)
            for (const [h, p] of Object.entries(n.nodes)) {
              const g = t._nodeMap.get(h);
              if (!g) continue;
              const w = Se().raw(g);
              (p.followPath || p.position?.x !== void 0) && (g.position.x = w.position.x), (p.followPath || p.position?.y !== void 0) && (g.position.y = w.position.y), p.style !== void 0 && (g.style = w.style);
            }
          if (n.edges)
            for (const [h, p] of Object.entries(n.edges)) {
              const g = t._edgeMap.get(h);
              if (!g) continue;
              const w = Se().raw(g);
              p.color !== void 0 && typeof p.color == "string" && (g.color = w.color), p.strokeWidth !== void 0 && (g.strokeWidth = w.strokeWidth);
            }
          s.size > 0 && (t._flushNodePositions(s), t._refreshEdgePaths(s), s.clear()), l.size > 0 && (t._flushNodeStyles(l), l.clear()), a.size > 0 && (t._flushEdgeStyles(a), a.clear()), o.onComplete?.();
        }
      });
      return n.nodes && (u._targetNodeIds = Object.keys(n.nodes)), u;
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
      const i = or(t._config?.respectReducedMotion) ? 0 : o.duration ?? 300;
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
      const l = o.zoom, a = On.register(() => {
        if (s) return !0;
        let d = null;
        if (typeof n == "string") {
          const w = t._nodeMap.get(n);
          if (w) {
            d = w.parentId ? t.getAbsolutePosition(n) : { ...w.position };
            const m = w.nodeOrigin ?? t._config.nodeOrigin ?? [0, 0];
            w.dimensions && (d.x += w.dimensions.width * (0.5 - m[0]), d.y += w.dimensions.height * (0.5 - m[1]));
          }
        } else if ("_targetNodeIds" in n && n._targetNodeIds?.length) {
          const w = n._targetNodeIds[0], m = t._nodeMap.get(w);
          if (m) {
            d = m.parentId ? t.getAbsolutePosition(w) : { ...m.position };
            const E = m.nodeOrigin ?? t._config.nodeOrigin ?? [0, 0];
            m.dimensions && (d.x += m.dimensions.width * (0.5 - E[0]), d.y += m.dimensions.height * (0.5 - E[1]));
          }
        } else if ("getCurrentPosition" in n && typeof n.getCurrentPosition == "function") {
          const w = n.getCurrentPosition();
          if (w)
            d = w;
          else
            return s = !0, a.stop(), t._followHandle = null, i(), !0;
        } else "x" in n && "y" in n && (d = n);
        if (!d) return !1;
        const f = t._container ? { width: t._container.clientWidth, height: t._container.clientHeight } : { width: 800, height: 600 }, u = l ?? t.viewport.zoom, h = f.width / 2 - d.x * u, p = f.height / 2 - d.y * u, g = 0.08;
        return t.viewport.x += (h - t.viewport.x) * g, t.viewport.y += (p - t.viewport.y) * g, l && (t.viewport.zoom += (l - t.viewport.zoom) * g), t._flushViewport(), !1;
      });
      return t._followHandle = a, typeof n == "object" && "_targetNodeIds" in n && n.finished && n.finished.then(() => {
        s || (s = !0, a.stop(), t._followHandle = null, i());
      }), {
        pause: () => {
        },
        resume: () => {
        },
        stop: () => {
          s = !0, a.stop(), t._followHandle = null, i();
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
      return Se().raw(t._animator).registry.getHandles(n);
    },
    /**
     * Cancel all animations matching a tag filter.
     */
    cancelAll(n, o) {
      Se().raw(t._animator).registry.cancelAll(n, o);
    },
    /**
     * Pause all animations matching a tag filter.
     */
    pauseAll(n) {
      Se().raw(t._animator).registry.pauseAll(n);
    },
    /**
     * Resume all animations matching a tag filter.
     */
    resumeAll(n) {
      Se().raw(t._animator).registry.resumeAll(n);
    },
    /**
     * Create a named group that auto-tags all animations made through it.
     */
    group(n) {
      const o = this;
      return new Gf(n, {
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
      const o = Se().raw(t._animator), i = o.beginTransaction();
      i.onAfterRollback?.((r) => {
        const s = /* @__PURE__ */ new Set();
        for (const l of r)
          if (l.startsWith("node:")) {
            const a = l.split(":")[1];
            a && s.add(a);
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
      const n = structuredClone(Se().raw(t.nodes)), o = structuredClone(Se().raw(t.edges)), i = { ...t.viewport };
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
      const i = this, r = i.animate, s = i.update, l = i.sendParticle, a = i.sendParticleAlongPath, c = i.sendParticleBetween, d = i.sendParticleBurst, f = i.sendConverging, u = {
        get nodes() {
          return t.nodes;
        },
        get edges() {
          return t.edges;
        },
        get viewport() {
          return t.viewport;
        },
        animate: (g, w) => {
          const m = i.update;
          i.update = s;
          try {
            return r.call(i, g, w);
          } finally {
            i.update = m;
          }
        },
        update: (g, w) => s.call(i, g, w),
        sendParticle: (g, w) => l.call(i, g, w),
        sendParticleAlongPath: (g, w) => a.call(i, g, w),
        sendParticleBetween: (g, w, m) => c.call(i, g, w, m),
        sendParticleBurst: (g, w) => d.call(i, g, w),
        sendConverging: (g, w) => f.call(i, g, w),
        addNodes: (g) => t.addNodes(g),
        removeNodes: (g) => t.removeNodes(g),
        addEdges: (g) => t.addEdges(g),
        removeEdges: (g) => t.removeEdges(g)
      }, h = new nh(u, o), p = async () => {
        i.animate = (...g) => u.animate(...g), i.update = (...g) => u.update(...g), i.sendParticle = (...g) => u.sendParticle(...g), i.sendParticleAlongPath = (...g) => u.sendParticleAlongPath(...g), i.sendParticleBetween = (...g) => u.sendParticleBetween(...g), i.sendParticleBurst = (...g) => u.sendParticleBurst(...g), i.sendConverging = (...g) => u.sendConverging(...g);
        try {
          const g = n();
          g instanceof Promise && await g;
        } finally {
          i.animate = r, i.update = s, i.sendParticle = l, i.sendParticleAlongPath = a, i.sendParticleBetween = c, i.sendParticleBurst = d, i.sendConverging = f;
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
        sendParticle: (s, l) => i.sendParticle(s, l),
        sendParticleAlongPath: (s, l) => i.sendParticleAlongPath(s, l),
        sendParticleBetween: (s, l, a) => i.sendParticleBetween(s, l, a),
        sendParticleBurst: (s, l) => i.sendParticleBurst(s, l),
        sendConverging: (s, l) => i.sendConverging(s, l)
      };
      return new oh(r, n, o);
    },
    // ── Cleanup lifecycle ─────────────────────────────────────────────────
    /**
     * Stop all in-flight animations, particles, and timelines.
     * Called by the canvas destroy() lifecycle hook when the element is
     * removed from the DOM.
     */
    destroy() {
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
      Ht(n, o);
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
function ts(t, e, n, o) {
  const i = e.find((l) => l.id === t);
  if (!i) return /* @__PURE__ */ new Set();
  if (i.type === "group")
    return rt(t, e);
  const r = /* @__PURE__ */ new Set(), s = No(t, e, n);
  for (const l of s)
    r.add(l.id);
  if (o?.recursive) {
    const l = s.map((a) => a.id);
    for (; l.length > 0; ) {
      const a = l.shift(), c = No(a, e, n);
      for (const d of c)
        !r.has(d.id) && d.id !== t && (r.add(d.id), l.push(d.id));
    }
  }
  return r;
}
function sh(t, e, n) {
  const o = /* @__PURE__ */ new Map();
  for (const i of e)
    n.has(i.id) && o.set(i.id, { ...i.position });
  return {
    targetPositions: o,
    originalDimensions: t.type === "group" ? { ...t.dimensions ?? { width: 400, height: 300 } } : void 0,
    reroutedEdges: /* @__PURE__ */ new Map()
  };
}
function po(t, e, n, o) {
  t.collapsed = !0, o && (t.dimensions = { ...o });
  for (const i of e)
    n.targetPositions.has(i.id) && (i.hidden = !0);
}
function ns(t, e, n, o = !0) {
  t.collapsed = !1, o && n.originalDimensions && (t.dimensions = { ...n.originalDimensions });
  const i = /* @__PURE__ */ new Set();
  if (t.type === "group") {
    for (const r of e)
      if (r.collapsed && r.id !== t.id && n.targetPositions.has(r.id)) {
        const s = rt(r.id, e);
        for (const l of s)
          i.add(l);
      }
  }
  for (const r of e)
    if (n.targetPositions.has(r.id)) {
      const s = n.targetPositions.get(r.id);
      r.position = { ...s }, i.has(r.id) || (r.hidden = !1);
    }
}
function go(t, e, n) {
  const o = /* @__PURE__ */ new Map();
  for (const i of e) {
    const r = n.has(i.source), s = n.has(i.target), l = i.source === t, a = i.target === t;
    !r && !s || (o.set(i.id, { source: i.source, target: i.target, hidden: i.hidden }), r && s || l && s || r && a ? i.hidden = !0 : r ? i.source = t : i.target = t);
  }
  return o;
}
function rh(t, e) {
  for (const n of t) {
    const o = e.get(n.id);
    o && (n.source = o.source, n.target = o.target, o.hidden !== void 0 ? n.hidden = o.hidden : delete n.hidden);
  }
}
const En = { width: 150, height: 50 };
function ah(t) {
  return {
    /**
     * Collapse a node — hide its descendants/outgoers and optionally animate.
     */
    collapseNode(e, n) {
      const o = t._nodeMap.get(e);
      if (!o || o.collapsed) return;
      const i = ts(e, t.nodes, t.edges, { recursive: n?.recursive });
      if (i.size === 0) return;
      B("collapse", `Collapsing node "${e}"`, {
        type: o.type ?? "default",
        descendants: [...i],
        animate: n?.animate !== !1,
        recursive: n?.recursive ?? !1
      }), t._captureHistory();
      const r = o.type === "group", s = r ? o.collapsedDimensions ?? { width: 150, height: 60 } : void 0, l = n?.animate !== !1, a = sh(o, t.nodes, i);
      if (l) {
        t._suspendHistory();
        const c = o.dimensions ?? En, d = r && s ? s : c, f = {};
        for (const [h] of a.targetPositions) {
          const p = t._nodeMap.get(h);
          if (!p) continue;
          const g = p.dimensions ?? En;
          let w, m;
          p.parentId === e ? (w = (d.width - g.width) / 2, m = (d.height - g.height) / 2) : (w = o.position.x + (d.width - g.width) / 2, m = o.position.y + (d.height - g.height) / 2), f[h] = {
            position: { x: w, y: m },
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
            po(o, t.nodes, a, s), a.reroutedEdges = go(e, t.edges, i), t._collapseState.set(e, a), t._resumeHistory(), t._emit("node-collapse", { node: o, descendants: [...i] });
          }
        }) : (po(o, t.nodes, a, s), a.reroutedEdges = go(e, t.edges, i), t._collapseState.set(e, a), t._resumeHistory(), t._emit("node-collapse", { node: o, descendants: [...i] }));
      } else
        po(o, t.nodes, a, s), a.reroutedEdges = go(e, t.edges, i), t._collapseState.set(e, a), t._emit("node-collapse", { node: o, descendants: [...i] });
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
      if (i.reroutedEdges.size > 0 && rh(t.edges, i.reroutedEdges), s) {
        t._suspendHistory(), r && i.originalDimensions && (o.dimensions = { ...i.originalDimensions });
        const l = o.dimensions ?? En;
        ns(o, t.nodes, i, r);
        const a = {};
        for (const [f, u] of i.targetPositions) {
          const h = t._nodeMap.get(f);
          if (h && !h.hidden) {
            const p = h.dimensions ?? En;
            let g, w;
            h.parentId === e ? (g = (l.width - p.width) / 2, w = (l.height - p.height) / 2) : (g = o.position.x + (l.width - p.width) / 2, w = o.position.y + (l.height - p.height) / 2), h.position = { x: g, y: w }, h.style = { ...h.style || {}, opacity: "0" }, a[f] = {
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
        t.animate ? t.animate({ nodes: a }, {
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
        ns(o, t.nodes, i, r), t._collapseState.delete(e), t._emit("node-expand", { node: o, descendants: [...i.targetPositions.keys()] });
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
      return ts(e, t.nodes, t.edges).size;
    },
    /**
     * Get the number of descendants (via parentId hierarchy) of a node.
     */
    getDescendantCount(e) {
      return rt(e, t.nodes).size;
    }
  };
}
function lh(t) {
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
function ch(t) {
  return {
    // ── Row Selection ────────────────────────────────────────────────────
    selectRow(e) {
      if (t.selectedRows.has(e)) return;
      t._captureHistory(), t.selectedRows.add(e);
      const n = e.indexOf("."), o = n === -1 ? e : e.slice(0, n), i = n === -1 ? "" : e.slice(n + 1);
      B("selection", `Row "${e}" selected`), t._emit("row-select", { rowId: e, nodeId: o, attrId: i }), t._emit("row-selection-change", { selectedRows: [...t.selectedRows] });
    },
    deselectRow(e) {
      if (!t.selectedRows.has(e)) return;
      t._captureHistory(), t.selectedRows.delete(e);
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
      t.selectedRows.size !== 0 && (t._captureHistory(), B("selection", "Deselecting all rows"), t.selectedRows.clear(), t._container?.querySelectorAll(".flow-row-selected").forEach((e) => {
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
          const l = s.sourceHandle.slice(e.length + 1).replace(/-[lr]$/, "");
          l && r.add(l);
        }
        if (s.targetHandle?.startsWith(e + ".")) {
          const l = s.targetHandle.slice(e.length + 1).replace(/-[lr]$/, "");
          l && r.add(l);
        }
      }
      return i === "connected" ? n.filter((s) => r.has(s.id)) : n.filter((s) => !r.has(s.id));
    }
  };
}
const dh = 8, uh = 12, fh = 2;
function ai(t) {
  return {
    width: t.dimensions?.width ?? we,
    height: t.dimensions?.height ?? ve
  };
}
function hh(t) {
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
function ph(t) {
  return [...t].sort((e, n) => {
    const o = e.order ?? 1 / 0, i = n.order ?? 1 / 0;
    return o !== i ? o - i : 0;
  });
}
function os(t, e, n) {
  const o = e.gap ?? dh, i = e.padding ?? uh, r = e.headerHeight ?? 0, s = hh(e), l = ph(t), a = /* @__PURE__ */ new Map(), c = /* @__PURE__ */ new Map();
  if (l.length === 0)
    return {
      positions: a,
      dimensions: c,
      parentDimensions: n ? { width: n.width, height: n.height } : { width: i * 2, height: i * 2 + r }
    };
  const d = n ? n.width - i * 2 : 0, f = n ? n.height - i * 2 - r : 0;
  return e.direction === "vertical" ? gh(l, o, i, r, s, d, a, c) : e.direction === "horizontal" ? mh(l, o, i, r, s, f, a, c) : yh(l, o, i, r, s, e.columns ?? fh, d, f, a, c);
}
function gh(t, e, n, o, i, r, s, l) {
  let a = 0;
  const c = t.map((u) => ai(u));
  for (const u of c) a = Math.max(a, u.width);
  const d = r > 0 ? r : a;
  let f = n + o;
  for (let u = 0; u < t.length; u++) {
    const h = t[u], p = c[u];
    s.set(h.id, { x: n, y: f }), (i === "width" || i === "both") && l.set(h.id, { width: d, height: p.height }), f += p.height + e;
  }
  return f -= e, f += n, {
    positions: s,
    dimensions: l,
    parentDimensions: { width: d + n * 2, height: f }
  };
}
function mh(t, e, n, o, i, r, s, l) {
  let a = 0;
  const c = t.map((u) => ai(u));
  for (const u of c) a = Math.max(a, u.height);
  const d = r > 0 ? r : a;
  let f = n;
  for (let u = 0; u < t.length; u++) {
    const h = t[u], p = c[u];
    s.set(h.id, { x: f, y: n + o }), (i === "height" || i === "both") && l.set(h.id, { width: p.width, height: d }), f += p.width + e;
  }
  return f -= e, f += n, {
    positions: s,
    dimensions: l,
    parentDimensions: { width: f, height: d + n * 2 + o }
  };
}
function yh(t, e, n, o, i, r, s, l, a, c) {
  const d = Math.min(r, t.length), f = t.map((m) => ai(m));
  let u = 0, h = 0;
  for (const m of f)
    u = Math.max(u, m.width), h = Math.max(h, m.height);
  const p = s > 0 ? (s - (d - 1) * e) / d : 0;
  p > 0 && (u = p);
  const g = Math.ceil(t.length / d), w = l > 0 ? (l - (g - 1) * e) / g : 0;
  w > 0 && (h = w);
  for (let m = 0; m < t.length; m++) {
    const E = m % d, C = Math.floor(m / d), b = n + E * (u + e), D = n + o + C * (h + e);
    a.set(t[m].id, { x: b, y: D }), i === "both" ? c.set(t[m].id, { width: u, height: h }) : i === "width" ? c.set(t[m].id, { width: u, height: f[m].height }) : i === "height" && c.set(t[m].id, { width: f[m].width, height: h });
  }
  return {
    positions: a,
    dimensions: c,
    parentDimensions: {
      width: d * u + (d - 1) * e + n * 2,
      height: g * h + (g - 1) * e + n * 2 + o
    }
  };
}
function wh(t) {
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
      const { excludeId: s, omitFromComputation: l, includeNode: a, shallow: c } = r;
      let { stretchedSize: d } = r;
      const f = t.nodes.find((b) => b.id === e);
      if (!f?.childLayout) return;
      let u = t.nodes.filter((b) => b.parentId === e);
      l && (u = u.filter((b) => b.id !== l)), a && !u.some((b) => b.id === a.id) && (u = [...u, a]);
      const h = new Map(u.map((b) => [b.id, b]));
      if (f.dimensions = void 0, !d && f.maxDimensions && f.maxDimensions.width !== void 0 && f.maxDimensions.height !== void 0 && (d = { width: f.maxDimensions.width, height: f.maxDimensions.height }), !c)
        for (const b of u)
          b.childLayout && this.layoutChildren(b.id, { excludeId: s, omitFromComputation: l, shallow: !1 });
      const p = f.childLayout, g = p.headerHeight !== void 0 ? p : f.data?.label ? { ...p, headerHeight: 30 } : p, w = os(u, g, d);
      for (const [b, D] of w.positions) {
        if (b === s || a && b === a.id && !t._nodeMap.has(b)) continue;
        const M = h.get(b);
        M && (M.position ? (M.position.x = D.x, M.position.y = D.y) : M.position = { x: D.x, y: D.y });
      }
      for (const [b, D] of w.dimensions) {
        if (b === s || a && b === a.id && !t._nodeMap.has(b)) continue;
        const M = h.get(b);
        if (M) {
          let T = D.width, v = D.height;
          M.minDimensions && (M.minDimensions.width != null && (T = Math.max(T, M.minDimensions.width)), M.minDimensions.height != null && (v = Math.max(v, M.minDimensions.height))), M.maxDimensions && (M.maxDimensions.width != null && (T = Math.min(T, M.maxDimensions.width)), M.maxDimensions.height != null && (v = Math.min(v, M.maxDimensions.height))), M.dimensions ? (M.dimensions.width = T, M.dimensions.height = v) : M.dimensions = { width: T, height: v }, M.childLayout && !c && this.layoutChildren(b, { excludeId: s, omitFromComputation: l, shallow: !1, stretchedSize: M.dimensions });
        }
      }
      let m = w.parentDimensions.width, E = w.parentDimensions.height;
      if (f.minDimensions && (f.minDimensions.width != null && (m = Math.max(m, f.minDimensions.width)), f.minDimensions.height != null && (E = Math.max(E, f.minDimensions.height))), f.maxDimensions && (f.maxDimensions.width != null && (m = Math.min(m, f.maxDimensions.width)), f.maxDimensions.height != null && (E = Math.min(E, f.maxDimensions.height))), f.dimensions || (f.dimensions = { width: 0, height: 0 }), f.dimensions.width = m, f.dimensions.height = E, m !== w.parentDimensions.width || E !== w.parentDimensions.height) {
        const D = os(u, g, { width: m, height: E });
        for (const [M, T] of D.positions) {
          if (M === s || a && M === a.id && !t._nodeMap.has(M)) continue;
          const v = h.get(M);
          v && (v.position ? (v.position.x = T.x, v.position.y = T.y) : v.position = { x: T.x, y: T.y });
        }
        for (const [M, T] of D.dimensions) {
          if (M === s || a && M === a.id && !t._nodeMap.has(M)) continue;
          const v = h.get(M);
          if (v) {
            let P = T.width, I = T.height;
            v.minDimensions && (v.minDimensions.width != null && (P = Math.max(P, v.minDimensions.width)), v.minDimensions.height != null && (I = Math.max(I, v.minDimensions.height))), v.maxDimensions && (v.maxDimensions.width != null && (P = Math.min(P, v.maxDimensions.width)), v.maxDimensions.height != null && (I = Math.min(I, v.maxDimensions.height))), v.dimensions ? (v.dimensions.width = P, v.dimensions.height = I) : v.dimensions = { width: P, height: I }, v.childLayout && !c && this.layoutChildren(M, { excludeId: s, omitFromComputation: l, shallow: !1, stretchedSize: v.dimensions });
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
      const s = t.nodes.filter((a) => a.parentId === o.parentId).sort((a, c) => (a.order ?? 1 / 0) - (c.order ?? 1 / 0)).filter((a) => a.id !== e), l = Math.max(0, Math.min(n, s.length));
      s.splice(l, 0, o);
      for (let a = 0; a < s.length; a++)
        s[a].order = a;
      this.layoutChildren(o.parentId), t._emit("child-reorder", { nodeId: e, parentId: o.parentId, order: l });
    },
    // ── Layout engines ─────────────────────────────────────────────────────
    /**
     * Apply Dagre (directed acyclic graph) layout.
     *
     * Requires the dagre addon to be registered via `Alpine.plugin(AlpineFlowDagre)`.
     */
    layout(e) {
      const n = Et("layout:dagre");
      if (!n)
        throw new Error("layout() requires the dagre plugin. Register it with: Alpine.plugin(AlpineFlowDagre)");
      const o = e?.direction ?? "TB", i = n(t.nodes, t.edges, {
        direction: o,
        nodesep: e?.nodesep,
        ranksep: e?.ranksep
      });
      this._applyLayout(i, {
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
     */
    forceLayout(e) {
      const n = Et("layout:force");
      if (!n)
        throw new Error("forceLayout() requires the force plugin. Register it with: Alpine.plugin(AlpineFlowForce)");
      const o = n(t.nodes, t.edges, {
        strength: e?.strength,
        distance: e?.distance,
        charge: e?.charge,
        iterations: e?.iterations,
        center: e?.center
      });
      this._applyLayout(o, {
        fitView: e?.fitView,
        duration: e?.duration
      }), B("layout", "Applied force layout", { charge: e?.charge ?? -300, distance: e?.distance ?? 150 }), t._emit("layout", { type: "force", charge: e?.charge ?? -300, distance: e?.distance ?? 150 });
    },
    /**
     * Apply hierarchy/tree layout.
     *
     * Requires the hierarchy addon to be registered via `Alpine.plugin(AlpineFlowHierarchy)`.
     */
    treeLayout(e) {
      const n = Et("layout:hierarchy");
      if (!n)
        throw new Error("treeLayout() requires the hierarchy plugin. Register it with: Alpine.plugin(AlpineFlowHierarchy)");
      const o = e?.direction ?? "TB", i = n(t.nodes, t.edges, {
        layoutType: e?.layoutType,
        direction: o,
        nodeWidth: e?.nodeWidth,
        nodeHeight: e?.nodeHeight
      });
      this._applyLayout(i, {
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
     */
    async elkLayout(e) {
      const n = Et("layout:elk");
      if (!n)
        throw new Error("elkLayout() requires the elk plugin. Register it with: Alpine.plugin(AlpineFlowElk)");
      const o = e?.direction ?? "DOWN", i = await n(t.nodes, t.edges, {
        algorithm: e?.algorithm,
        direction: o,
        nodeSpacing: e?.nodeSpacing,
        layerSpacing: e?.layerSpacing
      });
      if (i.size === 0) {
        B("layout", "ELK layout returned no positions — skipping apply");
        return;
      }
      this._applyLayout(i, {
        adjustHandles: e?.adjustHandles,
        handleDirection: o,
        fitView: e?.fitView,
        duration: e?.duration
      }), B("layout", "Applied ELK layout", { algorithm: e?.algorithm ?? "layered", direction: o }), t._emit("layout", { type: "elk", algorithm: e?.algorithm ?? "layered", direction: o });
    }
  };
}
function vh(t) {
  return {
    // ── Internal helpers ──────────────────────────────────────────────────
    _getChildValidation(e) {
      const n = t.getNode(e);
      if (n)
        return Gt(n, t._config.childValidationRules ?? {});
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
        const r = Gt(i, t._config.childValidationRules ?? {});
        if (!r) {
          t._validationErrorCache.delete(o);
          continue;
        }
        const s = t.nodes.filter((a) => a.parentId === o), l = Gi(i, s, r);
        l.length > 0 ? t._validationErrorCache.set(o, l) : t._validationErrorCache.delete(o), i._validationErrors = l;
      }
    },
    // ── Child Validation API ─────────────────────────────────────────────
    validateParent(e) {
      const n = t.getNode(e);
      if (!n) return { valid: !0, errors: [] };
      const o = Gt(n, t._config.childValidationRules ?? {});
      if (!o) return { valid: !0, errors: [] };
      const i = t.nodes.filter((s) => s.parentId === e), r = Gi(n, i, o);
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
              ), p = Wn(u, o, h, f);
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
        if (o.position.x = d.x, o.position.y = d.y, o.parentId = void 0, o.extent = void 0, t.nodes = at(t.nodes), t._rebuildNodeMap(), this._recomputeChildValidation(), i) {
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
      if (!r || rt(e, t.nodes).has(n)) return !1;
      const s = this._getChildValidation(n);
      if (s) {
        const d = t.nodes.filter(
          (u) => u.parentId === n && u.id !== e
        ), f = vr(r, o, d, s);
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
            ), h = Wn(f, o, u, d);
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
      const l = i ? t.getAbsolutePosition(e) : { x: o.position.x, y: o.position.y }, a = t.getAbsolutePosition(n);
      if (o.position.x = l.x - a.x, o.position.y = l.y - a.y, o.parentId = n, t.nodes = at(t.nodes), t._rebuildNodeMap(), this._recomputeChildValidation(), n && t._nodeMap.get(n)?.childLayout) {
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
function _h(t) {
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
              const l = r.offsetWidth, a = r.offsetHeight;
              (!s.dimensions || l !== s.dimensions.width || a !== s.dimensions.height) && (s.dimensions = { width: l, height: a }, o.add(i)), r.style.width = l + "px", r.style.height = a + "px";
            }
          }
          o.size > 0 && t._refreshEdgePaths(o);
        });
      }), n;
    }
  };
}
function Tn(t, e, n, o, i) {
  const r = i * Math.PI / 180, s = Math.cos(r), l = Math.sin(r), a = t - n, c = e - o;
  return {
    x: n + a * s - c * l,
    y: o + a * l + c * s
  };
}
const Pr = 20, Sn = Pr + 1;
function is(t) {
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
function bh(t, e) {
  return {
    x: t.x - e,
    y: t.y - e,
    width: t.width + e * 2,
    height: t.height + e * 2
  };
}
function xh(t, e, n) {
  return t > n.x && t < n.x + n.width && e > n.y && e < n.y + n.height;
}
function Eh(t, e, n, o) {
  const i = Math.min(t, e), r = Math.max(t, e);
  for (const s of o) {
    const l = s.x, a = s.x + s.width, c = s.y, d = s.y + s.height;
    if (n > c && n < d && r > l && i < a)
      return !0;
  }
  return !1;
}
function Sh(t, e, n, o) {
  const i = Math.min(e, n), r = Math.max(e, n);
  for (const s of o) {
    const l = s.x, a = s.x + s.width, c = s.y, d = s.y + s.height;
    if (t > l && t < a && r > c && i < d)
      return !0;
  }
  return !1;
}
function Ch(t, e, n, o, i) {
  const r = /* @__PURE__ */ new Set([t, n]), s = /* @__PURE__ */ new Set([e, o]);
  for (const f of i)
    r.add(f.x), r.add(f.x + f.width), s.add(f.y), s.add(f.y + f.height);
  const l = Array.from(r).sort((f, u) => f - u), a = Array.from(s).sort((f, u) => f - u), c = [];
  let d = 0;
  for (const f of l)
    for (const u of a) {
      let h = !1;
      for (const p of i)
        if (xh(f, u, p)) {
          h = !0;
          break;
        }
      h || c.push({ x: f, y: u, index: d++ });
    }
  return c;
}
function Ph(t, e, n, o) {
  const i = n.length, r = new Float64Array(i).fill(1 / 0), s = new Int32Array(i).fill(-1), l = new Uint8Array(i);
  r[t.index] = 0;
  const a = [t.index];
  for (; a.length > 0; ) {
    let f = 0;
    for (let p = 1; p < a.length; p++)
      r[a[p]] < r[a[f]] && (f = p);
    const u = a[f];
    if (a.splice(f, 1), l[u]) continue;
    if (l[u] = 1, u === e.index) break;
    const h = n[u];
    for (let p = 0; p < i; p++) {
      if (l[p]) continue;
      const g = n[p];
      if (h.x !== g.x && h.y !== g.y) continue;
      let w = !1;
      if (h.x === g.x ? w = Sh(h.x, h.y, g.y, o) : w = Eh(h.x, g.x, h.y, o), w) continue;
      const m = Math.abs(g.x - h.x) + Math.abs(g.y - h.y), E = r[u] + m;
      E < r[p] && (r[p] = E, s[p] = u, a.push(p));
    }
  }
  if (r[e.index] === 1 / 0) return null;
  const c = [];
  let d = e.index;
  for (; d !== -1; )
    c.unshift(n[d]), d = s[d];
  return c;
}
function kh(t) {
  if (t.length <= 2) return t;
  const e = [t[0]];
  for (let n = 1; n < t.length - 1; n++) {
    const o = e[e.length - 1], i = t[n + 1], r = t[n], s = o.x === r.x && r.x === i.x, l = o.y === r.y && r.y === i.y;
    !s && !l && e.push(r);
  }
  return e.push(t[t.length - 1]), e;
}
function Lh(t, e) {
  if (t.length < 2) return "";
  let n = `M${t[0].x},${t[0].y}`;
  for (let i = 1; i < t.length - 1; i++) {
    const r = t[i - 1], s = t[i], l = t[i + 1];
    e > 0 ? n += ` ${It(r.x, r.y, s.x, s.y, l.x, l.y, e)}` : n += ` L${s.x},${s.y}`;
  }
  const o = t[t.length - 1];
  return n += ` L${o.x},${o.y}`, n;
}
function Mh(t) {
  if (t.length < 2)
    return { x: t[0]?.x ?? 0, y: t[0]?.y ?? 0, offsetX: 0, offsetY: 0 };
  let e = 0;
  const n = [];
  for (let r = 1; r < t.length; r++) {
    const s = t[r].x - t[r - 1].x, l = t[r].y - t[r - 1].y, a = Math.abs(s) + Math.abs(l);
    n.push(a), e += a;
  }
  let o = e / 2;
  for (let r = 0; r < n.length; r++) {
    if (o <= n[r]) {
      const s = n[r] > 0 ? o / n[r] : 0, l = t[r].x + (t[r + 1].x - t[r].x) * s, a = t[r].y + (t[r + 1].y - t[r].y) * s;
      return {
        x: l,
        y: a,
        offsetX: Math.abs(t[t.length - 1].x - t[0].x) / 2,
        offsetY: Math.abs(t[t.length - 1].y - t[0].y) / 2
      };
    }
    o -= n[r];
  }
  const i = t[t.length - 1];
  return { x: i.x, y: i.y, offsetX: 0, offsetY: 0 };
}
function kr(t, e, n, o, i, r, s) {
  const l = is(n), a = is(r), c = t + l.x * Sn, d = e + l.y * Sn, f = o + a.x * Sn, u = i + a.y * Sn, h = s.map((D) => bh(D, Pr)), p = Ch(
    c,
    d,
    f,
    u,
    h
  ), g = p.find((D) => D.x === c && D.y === d), w = p.find((D) => D.x === f && D.y === u);
  g || p.push({ x: c, y: d, index: p.length }), w || p.push({ x: f, y: u, index: p.length });
  const m = g ?? p[p.length - (w ? 1 : 2)], E = w ?? p[p.length - 1], C = Ph(m, E, p, h);
  if (!C || C.length < 2) return null;
  const b = [
    { x: t, y: e, index: -1 },
    ...C,
    { x: o, y: i, index: -2 }
  ];
  return kh(b);
}
function Th({
  sourceX: t,
  sourceY: e,
  sourcePosition: n = "bottom",
  targetX: o,
  targetY: i,
  targetPosition: r = "top",
  obstacles: s,
  borderRadius: l = 5
}) {
  if (!s || s.length === 0)
    return ln({
      sourceX: t,
      sourceY: e,
      sourcePosition: n,
      targetX: o,
      targetY: i,
      targetPosition: r,
      borderRadius: l
    });
  const a = kr(t, e, n, o, i, r, s);
  if (!a)
    return ln({
      sourceX: t,
      sourceY: e,
      sourcePosition: n,
      targetX: o,
      targetY: i,
      targetPosition: r,
      borderRadius: l
    });
  const c = Lh(a, l), { x: d, y: f, offsetX: u, offsetY: h } = Mh(a);
  return {
    path: c,
    labelPosition: { x: d, y: f },
    labelOffsetX: u,
    labelOffsetY: h
  };
}
function Lr(t) {
  if (t.length < 2) return "";
  if (t.length === 2)
    return `M${t[0].x},${t[0].y} L${t[1].x},${t[1].y}`;
  let e = `M${t[0].x},${t[0].y}`;
  for (let n = 0; n < t.length - 1; n++) {
    const o = t[Math.max(0, n - 1)], i = t[n], r = t[n + 1], s = t[Math.min(t.length - 1, n + 2)], l = i.x + (r.x - o.x) / 6, a = i.y + (r.y - o.y) / 6, c = r.x - (s.x - i.x) / 6, d = r.y - (s.y - i.y) / 6;
    e += ` C${l},${a} ${c},${d} ${r.x},${r.y}`;
  }
  return e;
}
function Ah(t) {
  if (t.length < 2)
    return { x: t[0]?.x ?? 0, y: t[0]?.y ?? 0, offsetX: 0, offsetY: 0 };
  let e = 0;
  const n = [];
  for (let r = 1; r < t.length; r++) {
    const s = t[r].x - t[r - 1].x, l = t[r].y - t[r - 1].y, a = Math.sqrt(s * s + l * l);
    n.push(a), e += a;
  }
  let o = e / 2;
  for (let r = 0; r < n.length; r++) {
    if (o <= n[r]) {
      const s = n[r] > 0 ? o / n[r] : 0, l = t[r].x + (t[r + 1].x - t[r].x) * s, a = t[r].y + (t[r + 1].y - t[r].y) * s;
      return {
        x: l,
        y: a,
        offsetX: Math.abs(t[t.length - 1].x - t[0].x) / 2,
        offsetY: Math.abs(t[t.length - 1].y - t[0].y) / 2
      };
    }
    o -= n[r];
  }
  const i = t[t.length - 1];
  return { x: i.x, y: i.y, offsetX: 0, offsetY: 0 };
}
function Nh({
  sourceX: t,
  sourceY: e,
  sourcePosition: n = "bottom",
  targetX: o,
  targetY: i,
  targetPosition: r = "top",
  obstacles: s
}) {
  if (!s || s.length === 0)
    return Xn({
      sourceX: t,
      sourceY: e,
      sourcePosition: n,
      targetX: o,
      targetY: i,
      targetPosition: r
    });
  const l = kr(t, e, n, o, i, r, s);
  if (!l)
    return Xn({
      sourceX: t,
      sourceY: e,
      sourcePosition: n,
      targetX: o,
      targetY: i,
      targetPosition: r
    });
  const a = Lr(l), { x: c, y: d, offsetX: f, offsetY: u } = Ah(l);
  return {
    path: a,
    labelPosition: { x: c, y: d },
    labelOffsetX: f,
    labelOffsetY: u
  };
}
function Ih(t) {
  const {
    sourceX: e,
    sourceY: n,
    targetX: o,
    targetY: i,
    controlPoints: r = [],
    pathStyle: s = "bezier",
    borderRadius: l = 5
  } = t, a = [
    { x: e, y: n },
    ...r,
    { x: o, y: i }
  ];
  let c;
  switch (s) {
    case "linear":
      c = ss(a);
      break;
    case "step":
      c = $h(a, 0);
      break;
    case "smoothstep":
      c = Dh(a, l);
      break;
    case "catmull-rom":
    case "bezier":
      c = Lr(a.map((u, h) => ({ ...u, index: h })));
      break;
    default:
      c = ss(a);
  }
  const d = Rh(a), f = fn({ sourceX: e, sourceY: n, targetX: o, targetY: i });
  return {
    path: c,
    labelPosition: d,
    labelOffsetX: f.offsetX,
    labelOffsetY: f.offsetY
  };
}
function ss(t) {
  if (t.length < 2) return "";
  let e = `M${t[0].x},${t[0].y}`;
  for (let n = 1; n < t.length; n++)
    e += ` L${t[n].x},${t[n].y}`;
  return e;
}
function $h(t, e) {
  if (t.length < 2) return "";
  if (t.length === 2)
    return Mr(t[0], t[1], e);
  let n = `M${t[0].x},${t[0].y}`;
  for (let i = 1; i < t.length - 1; i++) {
    const r = t[i - 1], s = t[i], l = t[i + 1];
    n += It(r.x, r.y, s.x, s.y, l.x, l.y, e);
  }
  const o = t[t.length - 1];
  return n += ` L${o.x},${o.y}`, n;
}
function Mr(t, e, n) {
  const o = (t.x + e.x) / 2, i = It(t.x, t.y, o, t.y, o, e.y, n), r = It(o, t.y, o, e.y, e.x, e.y, n);
  return `M${t.x},${t.y}${i}${r} L${e.x},${e.y}`;
}
function Dh(t, e) {
  if (t.length < 2) return "";
  if (t.length === 2)
    return Mr(t[0], t[1], e);
  const n = [t[0]];
  for (let r = 0; r < t.length - 1; r++) {
    const s = t[r], l = t[r + 1], a = Math.abs(l.x - s.x), c = Math.abs(l.y - s.y);
    if (a < 1 || c < 1)
      n.push(l);
    else {
      const d = (s.x + l.x) / 2;
      n.push({ x: d, y: s.y }), n.push({ x: d, y: l.y }), n.push(l);
    }
  }
  let o = `M${n[0].x},${n[0].y}`;
  for (let r = 1; r < n.length - 1; r++) {
    const s = n[r - 1], l = n[r], a = n[r + 1];
    o += It(s.x, s.y, l.x, l.y, a.x, a.y, e);
  }
  const i = n[n.length - 1];
  return o += ` L${i.x},${i.y}`, o;
}
function Rh(t) {
  if (t.length < 2) return t[0] ?? { x: 0, y: 0 };
  let e = 0;
  const n = [];
  for (let i = 0; i < t.length - 1; i++) {
    const r = t[i + 1].x - t[i].x, s = t[i + 1].y - t[i].y, l = Math.sqrt(r * r + s * s);
    n.push(l), e += l;
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
function Dt(t, e, n, o) {
  const i = t.dimensions?.width ?? we, r = t.dimensions?.height ?? ve, s = Rt(t, o);
  let l;
  if (t.shape) {
    const a = n?.[t.shape] ?? yr[t.shape];
    if (a) {
      const c = a.perimeterPoint(i, r, e);
      l = { x: s.x + c.x, y: s.y + c.y };
    } else {
      const c = Ui(i, r, e);
      l = { x: s.x + c.x, y: s.y + c.y };
    }
  } else {
    const a = Ui(i, r, e);
    l = { x: s.x + a.x, y: s.y + a.y };
  }
  if (t.rotation) {
    const a = s.x + i / 2, c = s.y + r / 2;
    l = Tn(l.x, l.y, a, c, t.rotation);
  }
  return l;
}
function rs(t) {
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
function Oo(t) {
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
const Hh = 1.5, Fh = 5 / 20;
function St(t, e, n, o) {
  if (!o) return t;
  const i = typeof o == "string" ? {} : o, r = n ? Math.min(n.handleWidth, n.handleHeight) / 2 : 5;
  if (i.offset !== void 0) {
    const f = Oo(e);
    return { x: t.x + f.x * i.offset, y: t.y + f.y * i.offset };
  }
  const a = (i.width ?? 12.5) * Hh * Fh * 0.4, c = r + a, d = Oo(e);
  return { x: t.x + d.x * c, y: t.y + d.y * c };
}
function jn(t, e, n, o = "bottom", i = "top", r, s, l, a, c, d) {
  const f = r ?? Dt(e, o, c, d), u = s ?? Dt(n, i, c, d), h = {
    sourceX: f.x,
    sourceY: f.y,
    sourcePosition: rs(o),
    targetX: u.x,
    targetY: u.y,
    targetPosition: rs(i)
  }, p = t.type ?? "bezier";
  if (l?.[p])
    return l[p](h);
  switch (p === "floating" ? t.pathType ?? "bezier" : p) {
    case "editable":
      return Ih({
        ...h,
        controlPoints: t.controlPoints,
        pathStyle: t.pathStyle
      });
    case "avoidant":
      return Nh({ ...h, obstacles: a });
    case "orthogonal":
      return Th({ ...h, obstacles: a });
    case "smoothstep":
      return ln(h);
    case "straight":
      return fr({ sourceX: f.x, sourceY: f.y, targetX: u.x, targetY: u.y });
    default:
      return Xn(h);
  }
}
function as(t, e) {
  const n = t.dimensions?.width ?? we, o = t.dimensions?.height ?? ve, i = {
    x: t.position.x + n / 2,
    y: t.position.y + o / 2
  }, r = t.rotation ? Tn(e.x, e.y, i.x, i.y, -t.rotation) : e, s = r.x - i.x, l = r.y - i.y;
  if (s === 0 && l === 0) {
    const p = { x: i.x, y: i.y - o / 2 };
    return t.rotation ? Tn(p.x, p.y, i.x, i.y, t.rotation) : p;
  }
  const a = n / 2, c = o / 2, d = Math.abs(s), f = Math.abs(l);
  let u;
  d / a > f / c ? u = a / d : u = c / f;
  const h = {
    x: i.x + s * u,
    y: i.y + l * u
  };
  return t.rotation ? Tn(h.x, h.y, i.x, i.y, t.rotation) : h;
}
function ls(t, e) {
  const n = t.dimensions?.width ?? we, o = t.dimensions?.height ?? ve, i = t.position.x + n / 2, r = t.position.y + o / 2;
  if (t.rotation) {
    const h = e.x - i, p = e.y - r;
    return Math.abs(h) > Math.abs(p) ? h > 0 ? "right" : "left" : p > 0 ? "bottom" : "top";
  }
  const s = 1, l = t.position.x, a = t.position.x + n, c = t.position.y, d = t.position.y + o;
  if (Math.abs(e.x - l) <= s) return "left";
  if (Math.abs(e.x - a) <= s) return "right";
  if (Math.abs(e.y - c) <= s) return "top";
  if (Math.abs(e.y - d) <= s) return "bottom";
  const f = e.x - i, u = e.y - r;
  return Math.abs(f) > Math.abs(u) ? f > 0 ? "right" : "left" : u > 0 ? "bottom" : "top";
}
function Tr(t, e) {
  const n = t.dimensions?.width ?? we, o = t.dimensions?.height ?? ve, i = e.dimensions?.width ?? we, r = e.dimensions?.height ?? ve, s = {
    x: t.position.x + n / 2,
    y: t.position.y + o / 2
  }, l = {
    x: e.position.x + i / 2,
    y: e.position.y + r / 2
  }, a = as(t, l), c = as(e, s), d = ls(t, a), f = ls(e, c);
  return {
    sx: a.x,
    sy: a.y,
    tx: c.x,
    ty: c.y,
    sourcePos: d,
    targetPos: f
  };
}
function vm(t, e) {
  const n = e.x - t.x, o = e.y - t.y;
  let i, r;
  return Math.abs(n) > Math.abs(o) ? (i = n > 0 ? "right" : "left", r = n > 0 ? "left" : "right") : (i = o > 0 ? "bottom" : "top", r = o > 0 ? "top" : "bottom"), { sourcePos: i, targetPos: r };
}
function Ar(t) {
  return typeof t == "object" && t !== null && "from" in t && "to" in t;
}
function Nr(t, e) {
  return `${t}__grad__${e}`;
}
function Ir(t, e, n, o, i, r, s) {
  let l = t.querySelector(`#${CSS.escape(e)}`);
  if (!l) {
    l = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient"), l.id = e, l.setAttribute("gradientUnits", "userSpaceOnUse"), l.classList.add("flow-edge-gradient");
    const c = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    c.setAttribute("offset", "0%"), l.appendChild(c);
    const d = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    d.setAttribute("offset", "100%"), l.appendChild(d), t.appendChild(l);
  }
  l.setAttribute("x1", String(o)), l.setAttribute("y1", String(i)), l.setAttribute("x2", String(r)), l.setAttribute("y2", String(s));
  const a = l.querySelectorAll("stop");
  return a[0]?.setAttribute("stop-color", n.from), a[1]?.setAttribute("stop-color", n.to), l;
}
function mo(t, e) {
  t.querySelector(`#${CSS.escape(e)}`)?.remove();
}
const zh = /* @__PURE__ */ new Set(["x-data", "x-init", "x-bind", "href", "src", "action", "formaction", "srcdoc"]);
function Oh(t) {
  return t === !0 || t === "dash" ? "dash" : t === "pulse" ? "pulse" : t === "dot" ? "dot" : "none";
}
function $r(t) {
  return t.endsWith("-l") ? "left" : t.endsWith("-r") ? "right" : null;
}
function cs(t, e) {
  if (!e) return t;
  const n = Oo(t), o = e * Math.PI / 180, i = Math.cos(o), r = Math.sin(o), s = n.x * i - n.y * r, l = n.x * r + n.y * i;
  return Math.abs(s) > Math.abs(l) ? s > 0 ? "right" : "left" : l > 0 ? "bottom" : "top";
}
function Un(t, e, n, o, i) {
  const r = t.querySelector(`[data-flow-node-id="${CSS.escape(e)}"]`);
  if (r) {
    if (n) {
      const l = r.querySelector(`[data-flow-handle-id="${CSS.escape(n)}"]`);
      if (l)
        return l.getAttribute("data-flow-handle-position") ?? (o === "source" ? "bottom" : "top");
    }
    if (n) {
      const l = $r(n);
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
function ds(t, e, n, o, i, r, s) {
  const l = t.querySelector(`[data-flow-node-id="${CSS.escape(e)}"]`);
  if (!l) return null;
  let a = null;
  if (o) {
    if (a = l.querySelector(`[data-flow-handle-id="${CSS.escape(o)}"]`), !a) {
      const h = $r(o);
      h && (a = l.querySelector(`[data-flow-handle-position="${h}"]`));
    }
  } else
    a = l.querySelector(`[data-flow-handle-type="${i}"]`);
  if (!a) return null;
  const c = a.getBoundingClientRect();
  if (c.width === 0 && c.height === 0) return null;
  const d = t.getBoundingClientRect(), f = c.left + c.width / 2, u = c.top + c.height / 2;
  return {
    x: (f - d.left - s.x) / r,
    y: (u - d.top - s.y) / r,
    handleWidth: c.width / r,
    handleHeight: c.height / r
  };
}
function Vh(t, e) {
  const n = t.getTotalLength(), o = t.getPointAtLength(n * Math.max(0, Math.min(1, e)));
  return { x: o.x, y: o.y };
}
function tt(t, e, n, o, i) {
  const r = t - n, s = e - o;
  return Math.sqrt(r * r + s * s) <= i;
}
function Bh(t, e, n) {
  const o = n.x - e.x, i = n.y - e.y, r = o * o + i * i;
  if (r === 0) return Math.sqrt((t.x - e.x) ** 2 + (t.y - e.y) ** 2);
  let s = ((t.x - e.x) * o + (t.y - e.y) * i) / r;
  s = Math.max(0, Math.min(1, s));
  const l = e.x + s * o, a = e.y + s * i;
  return Math.sqrt((t.x - l) ** 2 + (t.y - a) ** 2);
}
function Xh(t) {
  t.directive(
    "flow-edge",
    (e, { expression: n }, { evaluate: o, effect: i, cleanup: r }) => {
      const s = e;
      s.style.pointerEvents = "auto";
      const l = document.createElementNS("http://www.w3.org/2000/svg", "path");
      l.setAttribute("fill", "none"), l.style.stroke = "transparent", l.style.strokeWidth = "20", l.style.pointerEvents = "stroke", l.style.cursor = "pointer", s.appendChild(l);
      let a = e.querySelector("path:not(:first-child)");
      a || (a = document.createElementNS("http://www.w3.org/2000/svg", "path"), a.setAttribute("fill", "none"), a.setAttribute("stroke-width", "1.5"), a.style.pointerEvents = "none", s.appendChild(a));
      let c = null, d = null, f = null, u = null, h = "none", p = null;
      function g(S, k, N, U, J) {
        u || (u = document.createElementNS("http://www.w3.org/2000/svg", "circle"), u.classList.add("flow-edge-dot"), u.style.pointerEvents = "none", S.appendChild(u));
        const oe = N.closest(".flow-container"), K = oe ? getComputedStyle(oe) : null, se = U.particleSize ?? (parseFloat(K?.getPropertyValue("--flow-edge-dot-size").trim() ?? "4") || 4), le = J || K?.getPropertyValue("--flow-edge-dot-duration").trim() || "2s";
        u.setAttribute("r", String(se)), U.particleColor ? u.style.fill = U.particleColor : u.style.removeProperty("fill");
        const ce = u.querySelector("animateMotion");
        ce && ce.remove();
        const te = document.createElementNS("http://www.w3.org/2000/svg", "animateMotion");
        te.setAttribute("dur", le), te.setAttribute("repeatCount", "indefinite"), te.setAttribute("path", k), u.appendChild(te);
      }
      function w() {
        u?.remove(), u = null;
      }
      let m = null, E = null, C = null, b = null;
      const D = (S) => {
        S.stopPropagation();
        const k = o(n);
        if (!k) return;
        const N = t.$data(e.closest("[x-data]"));
        N && (N._emit("edge-click", { edge: k, event: S }), st(S, N._shortcuts?.multiSelect) ? N.selectedEdges.has(k.id) ? (N.selectedEdges.delete(k.id), k.selected = !1, B("selection", `Edge "${k.id}" deselected (shift)`)) : (N.selectedEdges.add(k.id), k.selected = !0, B("selection", `Edge "${k.id}" selected (shift)`)) : (N.deselectAll(), N.selectedEdges.add(k.id), k.selected = !0, B("selection", `Edge "${k.id}" selected`)), N._emitSelectionChange());
      }, M = (S) => {
        S.preventDefault(), S.stopPropagation();
        const k = o(n);
        if (!k) return;
        const N = t.$data(e.closest("[x-data]"));
        if (!N) return;
        const U = S.target;
        if (U.classList.contains("flow-edge-control-point")) {
          const J = parseInt(U.dataset.pointIndex ?? "", 10);
          if (!isNaN(J)) {
            N._emit("edge-control-point-context-menu", {
              edge: k,
              pointIndex: J,
              position: { x: S.clientX, y: S.clientY },
              event: S
            });
            return;
          }
        }
        N._emit("edge-context-menu", { edge: k, event: S });
      }, T = (S) => {
        S.stopPropagation(), S.preventDefault();
        const k = o(n);
        if (!k || k.type !== "editable") return;
        const N = t.$data(e.closest("[x-data]"));
        if (!N) return;
        const U = S.target;
        if (U.classList.contains("flow-edge-control-point")) {
          const J = parseInt(U.dataset.pointIndex ?? "", 10);
          !isNaN(J) && k.controlPoints && (N._captureHistory?.(), k.controlPoints.splice(J, 1), N._emit("edge-control-point-change", { edge: k, action: "remove", index: J }));
          return;
        }
        if (U.classList.contains("flow-edge-midpoint")) {
          const J = parseInt(U.dataset.segmentIndex ?? "", 10);
          if (!isNaN(J)) {
            const oe = N.screenToFlowPosition(S.clientX, S.clientY);
            k.controlPoints || (k.controlPoints = []), N._captureHistory?.(), k.controlPoints.splice(J, 0, { x: oe.x, y: oe.y }), N._emit("edge-control-point-change", { edge: k, action: "add", index: J });
          }
          return;
        }
        if (U.closest("path")) {
          const J = N.screenToFlowPosition(S.clientX, S.clientY);
          k.controlPoints || (k.controlPoints = []);
          const oe = [
            m ?? { x: 0, y: 0 },
            ...k.controlPoints,
            E ?? { x: 0, y: 0 }
          ];
          let K = 0, se = 1 / 0;
          for (let le = 0; le < oe.length - 1; le++) {
            const ce = Bh(J, oe[le], oe[le + 1]);
            ce < se && (se = ce, K = le);
          }
          N._captureHistory?.(), k.controlPoints.splice(K, 0, { x: J.x, y: J.y }), N._emit("edge-control-point-change", { edge: k, action: "add", index: K });
        }
      }, v = (S) => {
        const k = S.target;
        if (!k.classList.contains("flow-edge-control-point") || S.button !== 0) return;
        S.stopPropagation(), S.preventDefault();
        const N = o(n);
        if (!N?.controlPoints) return;
        const U = t.$data(e.closest("[x-data]"));
        if (!U) return;
        const J = parseInt(k.dataset.pointIndex ?? "", 10);
        if (isNaN(J)) return;
        k.classList.add("dragging");
        let oe = !1;
        const K = (le) => {
          oe || (U._captureHistory?.(), oe = !0);
          let ce = U.screenToFlowPosition(le.clientX, le.clientY);
          const te = U._config?.snapToGrid;
          te && (ce = {
            x: Math.round(ce.x / te[0]) * te[0],
            y: Math.round(ce.y / te[1]) * te[1]
          }), N.controlPoints[J] = ce;
        }, se = () => {
          document.removeEventListener("pointermove", K), document.removeEventListener("pointerup", se), k.classList.remove("dragging"), oe && U._emit("edge-control-point-change", { edge: N, action: "move", index: J });
        };
        document.addEventListener("pointermove", K), document.addEventListener("pointerup", se);
      };
      s.addEventListener("contextmenu", M), s.addEventListener("dblclick", T), s.addEventListener("pointerdown", v, !0);
      let P = null;
      const I = (S) => {
        if (S.button !== 0) return;
        S.stopPropagation();
        const k = o(n);
        if (!k) return;
        const N = t.$data(e.closest("[x-data]"));
        if (!N) return;
        const U = N._config?.reconnectSnapRadius ?? Ii, J = N._config?.edgesReconnectable !== !1, oe = k.reconnectable ?? !0;
        let K = null;
        if (J && oe !== !1 && m && E) {
          const ne = N.screenToFlowPosition(S.clientX, S.clientY), H = tt(ne.x, ne.y, m.x, m.y, U) || C && tt(ne.x, ne.y, C.x, C.y, U);
          (tt(ne.x, ne.y, E.x, E.y, U) || b && tt(ne.x, ne.y, b.x, b.y, U)) && (oe === !0 || oe === "target") ? K = "target" : H && (oe === !0 || oe === "source") && (K = "source");
        }
        if (!K) {
          const ne = (H) => {
            document.removeEventListener("pointerup", ne), D(H);
          };
          document.addEventListener("pointerup", ne, { once: !0 });
          return;
        }
        const se = S.clientX, le = S.clientY;
        let ce = !1, te = !1, R = null;
        const Q = N._config?.connectionSnapRadius ?? 20;
        let X = null, W = null, $ = null, j = se, ee = le;
        const V = e.closest(".flow-container");
        if (!V) return;
        const G = K === "target" ? m : E, ie = () => {
          ce = !0, s.classList.add("flow-edge-reconnecting"), N._emit("reconnect-start", { edge: k, handleType: K }), B("reconnect", `Reconnection drag started on edge "${k.id}" (${K} end)`), W = kt({
            connectionLineType: N._config?.connectionLineType,
            connectionLineStyle: N._config?.connectionLineStyle,
            connectionLine: N._config?.connectionLine,
            containerEl: s.closest(".flow-container") ?? void 0
          }), X = W.svg;
          const ne = N.screenToFlowPosition(se, le);
          W.update({
            fromX: G.x,
            fromY: G.y,
            toX: ne.x,
            toY: ne.y,
            source: k.source,
            sourceHandle: k.sourceHandle
          });
          const H = V.querySelector(".flow-viewport");
          H && H.appendChild(X), K === "target" && (N.pendingConnection = {
            source: k.source,
            sourceHandle: k.sourceHandle,
            position: ne
          }), N._pendingReconnection = {
            edge: k,
            draggedEnd: K,
            anchorPosition: { ...G },
            position: ne
          }, $ = Yn(V, N, j, ee), K === "target" && Zt(V, k.source, k.sourceHandle ?? "source", N, k.id);
        }, F = (ne) => {
          if (j = ne.clientX, ee = ne.clientY, !ce) {
            Math.sqrt(
              (ne.clientX - se) ** 2 + (ne.clientY - le) ** 2
            ) >= Mn && ie();
            return;
          }
          const H = N.screenToFlowPosition(ne.clientX, ne.clientY), z = Ut({
            containerEl: V,
            handleType: K === "target" ? "target" : "source",
            excludeNodeId: K === "target" ? k.source : k.target,
            cursorFlowPos: H,
            connectionSnapRadius: Q,
            getNode: (re) => N.getNode(re),
            toFlowPosition: (re, fe) => N.screenToFlowPosition(re, fe)
          });
          z.element !== R && (R?.classList.remove("flow-handle-active"), z.element?.classList.add("flow-handle-active"), R = z.element), W?.update({
            fromX: G.x,
            fromY: G.y,
            toX: z.position.x,
            toY: z.position.y,
            source: k.source,
            sourceHandle: k.sourceHandle
          });
          const ae = z.position;
          K === "target" && N.pendingConnection && (N.pendingConnection = {
            ...N.pendingConnection,
            position: ae
          }), N._pendingReconnection && (N._pendingReconnection = {
            ...N._pendingReconnection,
            position: ae
          }), $?.updatePointer(ne.clientX, ne.clientY);
        }, Z = () => {
          te || (te = !0, document.removeEventListener("pointermove", F), document.removeEventListener("pointerup", Y), $?.stop(), $ = null, W?.destroy(), W = null, X = null, R?.classList.remove("flow-handle-active"), P = null, s.classList.remove("flow-edge-reconnecting"), Pe(V), N.pendingConnection = null, N._pendingReconnection = null);
        }, Y = (ne) => {
          if (!ce) {
            Z(), D(ne);
            return;
          }
          let H = R, z = null;
          if (!H) {
            z = document.elementFromPoint(ne.clientX, ne.clientY);
            const he = K === "target" ? '[data-flow-handle-type="target"]' : '[data-flow-handle-type="source"]';
            H = z?.closest(he);
          }
          const re = (H ? H.closest("[data-flow-node-id]") : z?.closest("[data-flow-node-id]"))?.dataset.flowNodeId, fe = H?.dataset.flowHandleId;
          let ge = !1;
          if (re) {
            if (!(() => {
              const he = N.getNode(re);
              return he && !ot(he);
            })()) {
              const he = K === "target" ? { source: k.source, sourceHandle: k.sourceHandle, target: re, targetHandle: fe } : { source: re, sourceHandle: fe, target: k.target, targetHandle: k.targetHandle }, Ee = N.edges.filter((xe) => xe.id !== k.id);
              if (!je(he, Ee, { preventCycles: N._config?.preventCycles }))
                B("reconnect", "Reconnection rejected (invalid connection)");
              else if (!Ve(V, he, Ee))
                B("reconnect", "Reconnection rejected (handle limit)");
              else if (!Oe(V, he))
                B("reconnect", "Reconnection rejected (per-handle validator)");
              else if (N._config?.isValidConnection && !N._config.isValidConnection(he))
                B("reconnect", "Reconnection rejected (custom validator)");
              else {
                const xe = { ...k };
                N._captureHistory?.(), K === "target" ? (k.target = he.target, k.targetHandle = he.targetHandle) : (k.source = he.source, k.sourceHandle = he.sourceHandle), ge = !0, B("reconnect", `Edge "${k.id}" reconnected (${K})`, he), N._emit("reconnect", { oldEdge: xe, newConnection: he });
              }
            }
          }
          ge || B("reconnect", `Edge "${k.id}" reconnection cancelled — snapping back`), N._emit("reconnect-end", { edge: k, successful: ge }), Z();
        };
        document.addEventListener("pointermove", F), document.addEventListener("pointerup", Y), P = Z;
      };
      s.addEventListener("pointerdown", I);
      const x = (S) => {
        const k = o(n);
        if (!k) return;
        const N = t.$data(e.closest("[x-data]"));
        if (!N) return;
        const U = N._config?.edgesReconnectable !== !1, J = k.reconnectable ?? !0;
        if (!U || J === !1 || !m || !E) {
          s.style.removeProperty("cursor"), l.style.cursor = "pointer";
          return;
        }
        const oe = N._config?.reconnectSnapRadius ?? Ii, K = N.screenToFlowPosition(S.clientX, S.clientY), se = (tt(K.x, K.y, m.x, m.y, oe) || C && tt(K.x, K.y, C.x, C.y, oe)) && (J === !0 || J === "source"), le = (tt(K.x, K.y, E.x, E.y, oe) || b && tt(K.x, K.y, b.x, b.y, oe)) && (J === !0 || J === "target");
        se || le ? (s.style.cursor = "grab", l.style.cursor = "grab") : (s.style.removeProperty("cursor"), l.style.cursor = "pointer");
      };
      s.addEventListener("pointermove", x);
      const y = (S) => {
        if (S.key !== "Enter" && S.key !== " ") return;
        S.preventDefault(), S.stopPropagation();
        const k = o(n);
        if (!k) return;
        const N = t.$data(e.closest("[x-data]"));
        N && (N._emit("edge-click", { edge: k, event: S }), st(S, N._shortcuts?.multiSelect) ? N.selectedEdges.has(k.id) ? (N.selectedEdges.delete(k.id), k.selected = !1) : (N.selectedEdges.add(k.id), k.selected = !0) : (N.deselectAll(), N.selectedEdges.add(k.id), k.selected = !0), N._emitSelectionChange());
      };
      s.addEventListener("keydown", y);
      const q = () => {
        s.matches(":focus-visible") && s.classList.add("flow-edge-focused");
      }, _ = () => s.classList.remove("flow-edge-focused");
      s.addEventListener("focus", q), s.addEventListener("blur", _);
      const L = (S) => {
        S.stopPropagation();
      };
      s.addEventListener("mousedown", L);
      const A = () => {
        for (const S of [c, d, f])
          S && S.classList.add("flow-edge-hovered");
      }, O = () => {
        for (const S of [c, d, f])
          S && S.classList.remove("flow-edge-hovered");
      };
      s.addEventListener("mouseenter", A), s.addEventListener("mouseleave", O), i(() => {
        const S = o(n);
        if (!S || !a) return;
        s.setAttribute("data-flow-edge-id", S.id);
        const k = t.$data(e.closest("[x-data]"));
        if (!k?.nodes) return;
        k._layoutAnimTick;
        const N = k.getNode(S.source), U = k.getNode(S.target);
        if (!N || !U) return;
        N.sourcePosition, U.targetPosition;
        const J = Lt(N, k._nodeMap, k._config?.nodeOrigin), oe = Lt(U, k._nodeMap, k._config?.nodeOrigin), K = e.closest("[x-data]");
        let se, le, ce, te;
        if (S.type === "floating") {
          const H = Tr(J, oe);
          se = H.sourcePos, le = H.targetPos, ce = { x: H.sx, y: H.sy, handleWidth: 0, handleHeight: 0 }, te = { x: H.tx, y: H.ty, handleWidth: 0, handleHeight: 0 }, m = { x: H.sx, y: H.sy }, E = { x: H.tx, y: H.ty };
        } else {
          se = Un(K, S.source, S.sourceHandle, "source", N), le = Un(K, S.target, S.targetHandle, "target", U);
          const H = t.raw(k).viewport ?? { x: 0, y: 0, zoom: 1 }, z = H.zoom || 1, ae = N.rotation, re = U.rotation;
          se = cs(se, ae), le = cs(le, re), ce = ds(K, S.source, J, S.sourceHandle, "source", z, H), te = ds(K, S.target, oe, S.targetHandle, "target", z, H);
          const fe = Dt(J, se, k._shapeRegistry, k._config?.nodeOrigin), ge = Dt(oe, le, k._shapeRegistry, k._config?.nodeOrigin);
          m = ce ?? fe, E = te ?? ge;
        }
        const R = St(ce ?? m, se, ce, S.markerStart), Q = St(te ?? E, le, te, S.markerEnd);
        C = R, b = Q;
        let X;
        (S.type === "orthogonal" || S.type === "avoidant") && (X = k.nodes.filter((H) => H.id !== S.source && H.id !== S.target).map((H) => {
          const z = Lt(H, k._nodeMap, k._config?.nodeOrigin);
          return {
            x: z.position.x,
            y: z.position.y,
            width: z.dimensions?.width ?? we,
            height: z.dimensions?.height ?? ve
          };
        }));
        const { path: W, labelPosition: $ } = jn(S, J, oe, se, le, R, Q, k._config?.edgeTypes, X, k._shapeRegistry, k._config?.nodeOrigin);
        a.setAttribute("d", W), l.setAttribute("d", W);
        const j = S.type === "editable", ee = j && (S.showControlPoints || S.selected);
        if (s.querySelectorAll(".flow-edge-control-point, .flow-edge-midpoint").forEach((H) => H.remove()), ee) {
          const H = S.controlPoints ?? [], z = k.viewport?.zoom ?? 1, ae = 6 / z, re = 5 / z, fe = m ?? { x: 0, y: 0 }, ge = E ?? { x: 0, y: 0 }, he = [fe, ...H, ge], Ee = he.length - 1, xe = a.getTotalLength?.() ?? 0;
          if (xe > 0) {
            const de = [0], ye = 200;
            let Me = 1;
            for (let be = 1; be <= ye && Me < he.length; be++) {
              const $e = be / ye * xe, Ce = a.getPointAtLength($e), pe = he[Me], ue = Ce.x - pe.x, _e = Ce.y - pe.y;
              ue * ue + _e * _e < 25 && (de.push($e), Me++);
            }
            for (; de.length <= Ee; )
              de.push(xe);
            for (let be = 0; be < Ee; be++) {
              const $e = (de[be] + de[be + 1]) / 2, Ce = a.getPointAtLength($e), pe = document.createElementNS("http://www.w3.org/2000/svg", "circle");
              pe.classList.add("flow-edge-midpoint"), pe.setAttribute("cx", String(Ce.x)), pe.setAttribute("cy", String(Ce.y)), pe.setAttribute("r", String(re)), pe.dataset.segmentIndex = String(be);
              const ue = document.createElementNS("http://www.w3.org/2000/svg", "title");
              ue.textContent = "Double-click to add control point", pe.appendChild(ue), s.appendChild(pe);
            }
          }
          for (let de = 0; de < H.length; de++) {
            const ye = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            ye.classList.add("flow-edge-control-point"), ye.setAttribute("cx", String(H[de].x)), ye.setAttribute("cy", String(H[de].y)), ye.setAttribute("r", String(ae)), ye.dataset.pointIndex = String(de), s.appendChild(ye);
          }
        }
        if (l.style.cursor = j ? "crosshair" : "pointer", l.style.strokeWidth = String(
          S.interactionWidth ?? k._config?.defaultInteractionWidth ?? 20
        ), S.markerStart) {
          const H = sn(S.markerStart), z = rn(H, k._id);
          a.setAttribute("marker-start", `url(#${z})`);
        } else
          a.removeAttribute("marker-start");
        if (S.markerEnd) {
          const H = sn(S.markerEnd), z = rn(H, k._id);
          a.setAttribute("marker-end", `url(#${z})`);
        } else
          a.removeAttribute("marker-end");
        const V = S.strokeWidth ?? 1.5, G = Oh(S.animated);
        switch (G !== h && (a.classList.remove("flow-edge-animated", "flow-edge-pulse"), h === "dot" && w(), h = G), G) {
          case "dash":
            a.classList.add("flow-edge-animated");
            break;
          case "pulse":
            a.classList.add("flow-edge-pulse");
            break;
          case "dot":
            g(s, W, K, S, S.animationDuration);
            break;
        }
        if (S.animationDuration && G !== "none" ? (G === "dash" || G === "pulse") && (a.style.animationDuration = S.animationDuration) : (G === "dash" || G === "pulse") && a.style.removeProperty("animation-duration"), S.class) {
          const H = G === "dash" ? " flow-edge-animated" : G === "pulse" ? " flow-edge-pulse" : "";
          a.setAttribute("class", S.class + H);
        }
        if (s.setAttribute("aria-selected", String(!!S.selected)), S.selected)
          s.classList.add("flow-edge-selected"), a.style.strokeWidth = String(Math.max(V + 1, 2.5)), a.style.stroke = "var(--flow-edge-stroke-selected, " + nn + ")";
        else {
          s.classList.remove("flow-edge-selected"), a.style.strokeWidth = String(V);
          const H = k._markerDefsEl?.querySelector("defs") ?? null;
          if (Ar(S.color)) {
            if (H) {
              const z = Nr(k._id, S.id), ae = S.gradientDirection === "target-source", re = m.x, fe = m.y, ge = E.x, he = E.y;
              Ir(
                H,
                z,
                ae ? { from: S.color.to, to: S.color.from } : S.color,
                re,
                fe,
                ge,
                he
              ), a.style.stroke = `url(#${z})`, p = z;
            }
          } else if (S.color) {
            if (p) {
              const z = H;
              z && mo(z, p), p = null;
            }
            a.style.stroke = S.color;
          } else {
            if (p) {
              const z = H;
              z && mo(z, p), p = null;
            }
            a.style.removeProperty("stroke");
          }
        }
        if (k.selectedRows?.size > 0 && !S.selected && (S.sourceHandle && k.selectedRows.has(S.sourceHandle.replace(/-[lr]$/, "")) || S.targetHandle && k.selectedRows.has(S.targetHandle.replace(/-[lr]$/, ""))) ? (s.classList.add("flow-edge-row-highlighted"), S.selected || (a.style.strokeWidth = String(Math.max(V + 0.5, 2)), a.style.stroke = getComputedStyle(s.closest(".flow-container")).getPropertyValue("--flow-edge-row-highlight-color").trim() || "#3b82f6")) : s.classList.remove("flow-edge-row-highlighted"), S.focusable ?? k._config?.edgesFocusable !== !1 ? (s.setAttribute("tabindex", "0"), s.setAttribute("role", S.ariaRole ?? "group"), s.setAttribute("aria-label", S.ariaLabel ?? (S.label ? `Edge: ${S.label}` : `Edge from ${S.source} to ${S.target}`))) : (s.removeAttribute("tabindex"), s.removeAttribute("role"), s.removeAttribute("aria-label")), S.domAttributes)
          for (const [H, z] of Object.entries(S.domAttributes))
            H.startsWith("on") || zh.has(H.toLowerCase()) || s.setAttribute(H, z);
        const Z = (H, z, ae, re, fe) => {
          if (z) {
            if (!H && re) {
              const ge = ae.includes("flow-edge-label-start"), he = ae.includes("flow-edge-label-end");
              let Ee = `[data-flow-edge-id="${fe}"].flow-edge-label`;
              ge ? Ee += ".flow-edge-label-start" : he ? Ee += ".flow-edge-label-end" : Ee += ":not(.flow-edge-label-start):not(.flow-edge-label-end)", H = re.querySelector(Ee);
            }
            return H || (H = document.createElement("div"), H.className = ae, H.dataset.flowEdgeId = fe, re && re.appendChild(H)), H.textContent = z, H;
          }
          return H && H.remove(), null;
        }, Y = e.closest(".flow-viewport"), ne = S.labelVisibility ?? "always";
        if (c = Z(c, S.label, "flow-edge-label", Y, S.id), c)
          if (a.getTotalLength?.()) {
            const H = S.labelPosition ?? 0.5, z = Vh(a, H);
            c.style.left = `${z.x}px`, c.style.top = `${z.y}px`;
          } else
            c.style.left = `${$.x}px`, c.style.top = `${$.y}px`;
        if (d = Z(d, S.labelStart, "flow-edge-label flow-edge-label-start", Y, S.id), d && a.getTotalLength?.()) {
          const H = a.getTotalLength(), z = S.labelStartOffset ?? 30, ae = a.getPointAtLength(Math.min(z, H / 2));
          d.style.left = `${ae.x}px`, d.style.top = `${ae.y}px`;
        }
        if (f = Z(f, S.labelEnd, "flow-edge-label flow-edge-label-end", Y, S.id), f && a.getTotalLength?.()) {
          const H = a.getTotalLength(), z = S.labelEndOffset ?? 30, ae = a.getPointAtLength(Math.max(H - z, H / 2));
          f.style.left = `${ae.x}px`, f.style.top = `${ae.y}px`;
        }
        for (const H of [c, d, f])
          H && (H.classList.toggle("flow-edge-label-hover", ne === "hover"), H.classList.toggle("flow-edge-label-on-select", ne === "selected"), H.classList.toggle("flow-edge-label-selected", !!S.selected));
      }), r(() => {
        if (p) {
          const k = t.$data(e.closest("[x-data]"))?._markerDefsEl?.querySelector("defs");
          k && mo(k, p);
        }
        P?.(), w(), s.removeEventListener("contextmenu", M), s.removeEventListener("dblclick", T), s.removeEventListener("pointerdown", v, !0), s.removeEventListener("pointerdown", I), s.removeEventListener("pointermove", x), s.removeEventListener("keydown", y), s.removeEventListener("focus", q), s.removeEventListener("blur", _), s.removeEventListener("mousedown", L), s.removeEventListener("mouseenter", A), s.removeEventListener("mouseleave", O), c?.remove(), d?.remove(), f?.remove();
      });
    }
  );
}
function Yh(t, e) {
  return {
    /** Write node positions directly to DOM elements (bypassing Alpine effects). */
    _flushNodePositions(n) {
      for (const o of n) {
        const i = t.getNode(o);
        if (!i) continue;
        const r = t._nodeElements.get(o);
        if (!r) continue;
        const s = e.raw(i), l = s.parentId ? t.getAbsolutePosition(o) : s.position, a = s.nodeOrigin ?? t._config.nodeOrigin ?? [0, 0], c = s.dimensions?.width ?? 150, d = s.dimensions?.height ?? 40;
        r.style.left = l.x - c * a[0] + "px", r.style.top = l.y - d * a[1] + "px";
      }
    },
    /** Write node styles directly to DOM elements (bypassing Alpine effects). */
    _flushNodeStyles(n) {
      for (const o of n) {
        const i = t.getNode(o);
        if (!i) continue;
        const r = t._nodeElements.get(o);
        if (!r) continue;
        const l = e.raw(i).style;
        if (!l) continue;
        const a = typeof l == "string" ? on(l) : l;
        for (const [c, d] of Object.entries(a))
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
        const s = Lt(i, t._nodeMap, t._config.nodeOrigin), l = Lt(r, t._nodeMap, t._config.nodeOrigin);
        let a, c, d, f;
        if (o.type === "floating") {
          const h = Tr(s, l);
          d = { x: h.sx, y: h.sy }, f = { x: h.tx, y: h.ty };
          const p = St(d, h.sourcePos, null, o.markerStart), g = St(f, h.targetPos, null, o.markerEnd), w = jn(o, s, l, h.sourcePos, h.targetPos, p, g, void 0, void 0, t._shapeRegistry, t._config.nodeOrigin);
          a = w.path, c = w.labelPosition;
        } else {
          const h = t._container, p = h ? Un(h, o.source, o.sourceHandle, "source", i) : i?.sourcePosition ?? "bottom", g = h ? Un(h, o.target, o.targetHandle, "target", r) : r?.targetPosition ?? "top";
          d = Dt(s, p, t._shapeRegistry, t._config.nodeOrigin), f = Dt(l, g, t._shapeRegistry, t._config.nodeOrigin);
          const w = St(d, p, null, o.markerStart), m = St(f, g, null, o.markerEnd), E = jn(o, s, l, p, g, w, m, void 0, void 0, t._shapeRegistry, t._config.nodeOrigin);
          a = E.path, c = E.labelPosition;
        }
        const u = t.getEdgePathElement(o.id);
        if (u) {
          u.setAttribute("d", a);
          const p = u.parentElement?.querySelector("path:first-child");
          p && p !== u && p.setAttribute("d", a);
        }
        if (Ar(o.color)) {
          const h = t._markerDefsEl?.querySelector("defs");
          if (h) {
            const p = Nr(t._id, o.id), g = o.gradientDirection === "target-source";
            Ir(
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
              const p = u.getTotalLength(), g = o.labelStartOffset ?? 30, w = u.getPointAtLength(Math.min(g, p / 2));
              h.style.left = `${w.x}px`, h.style.top = `${w.y}px`;
            }
          }
          if (o.labelEnd && u) {
            const h = t._viewportEl.querySelector(
              `[data-flow-edge-id="${o.id}"].flow-edge-label-end`
            );
            if (h) {
              const p = u.getTotalLength(), g = o.labelEndOffset ?? 30, w = u.getPointAtLength(Math.max(p - g, p / 2));
              h.style.left = `${w.x}px`, h.style.top = `${w.y}px`;
            }
          }
        }
      }
    }
  };
}
function qh(t) {
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
              er(!!i);
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
              t._config.colorMode = i, i && t._container ? t._colorModeHandle ? t._colorModeHandle.update(i) : t._colorModeHandle = wr(t._container, i) : !i && t._colorModeHandle && (t._colorModeHandle.destroy(), t._colorModeHandle = null);
              break;
            case "autoLayout":
              n.autoLayout = i || void 0, t._autoLayoutFailed = !1, i ? (t._autoLayoutReady = !0, t._scheduleAutoLayout()) : (t._autoLayoutReady = !1, t._autoLayoutTimer && (clearTimeout(t._autoLayoutTimer), t._autoLayoutTimer = null));
              break;
          }
    }
  };
}
let Wh = 0;
function jh(t, e) {
  switch (t) {
    case "lines":
    case "cross":
      return `linear-gradient(0deg, ${e} 1px, transparent 1px), linear-gradient(90deg, ${e} 1px, transparent 1px)`;
    default:
      return `radial-gradient(circle, ${e} 1px, transparent 1px)`;
  }
}
function Uh(t) {
  t.data("flowCanvas", (e = {}) => {
    const n = {
      // ── Reactive State ────────────────────────────────────────────────
      /** Unique instance ID for SVG marker dedup, etc. */
      _id: `flow-${++Wh}`,
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
      _shapeRegistry: { ...yr, ...e.shapeTypes },
      // ── Background ────────────────────────────────────────────────────
      _background: e.background ?? "dots",
      _backgroundGap: e.backgroundGap ?? null,
      _patternColorOverride: e.patternColor ?? null,
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
        const l = this.viewport.zoom, a = this.viewport.x, c = this.viewport.y, d = [], f = [], u = [];
        for (const h of s) {
          const p = h.gap * l, g = h.variant === "cross" ? p / 2 : p;
          d.push(jh(h.variant, h.color)), h.variant === "lines" || h.variant === "cross" ? (f.push(`${g}px ${g}px, ${g}px ${g}px`), u.push(`${a}px ${c}px, ${a}px ${c}px`)) : (f.push(`${p}px ${p}px`), u.push(`${a}px ${c}px`));
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
        const { collab: s, ...l } = e;
        return l;
      })(),
      _shortcuts: Zu(e.keyboardShortcuts),
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
      _computeEngine: new uf(),
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
        B("event", s, l);
        const a = "on" + s.split("-").map(
          (d) => d.charAt(0).toUpperCase() + d.slice(1)
        ).join(""), c = e[a];
        typeof c == "function" && c(l), this._container?.dispatchEvent(new CustomEvent(`flow-${s}`, {
          bubbles: !0,
          detail: l
        })), this._announcer?.handleEvent(s, l ?? {}), e.computeMode === "auto" && (s === "nodes-change" || s === "edges-change") && (this._computeDebounceTimer && clearTimeout(this._computeDebounceTimer), this._computeDebounceTimer = setTimeout(() => {
          this._computeDebounceTimer = null, this.compute();
        }, 16));
      },
      /** Route a warning through the onError callback (if set) and console.warn. */
      _warn(s, l) {
        typeof e.onError == "function" && e.onError(s, l), console.warn(`[AlpineFlow] ${l}`);
      },
      _emitSelectionChange() {
        this._emit("selection-change", {
          nodes: [...this.selectedNodes],
          edges: [...this.selectedEdges],
          rows: [...this.selectedRows]
        });
      },
      _rebuildNodeMap() {
        this._nodeMap = pr(this.nodes);
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
          const d = a.get(c.id);
          d && !c.dimensions && (c.dimensions = { width: d.width, height: d.height }, this._initialDimensions.set(c.id, { ...d }));
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
        if (e.viewportCulling !== !0 || !this._container) return;
        const s = this._container.clientWidth, l = this._container.clientHeight;
        if (s === 0 || l === 0) return;
        const a = e.cullingBuffer ?? 100, c = au(this.viewport, s, l, a), d = /* @__PURE__ */ new Set();
        for (const f of this.nodes) {
          if (f.hidden) continue;
          const u = f.dimensions?.width ?? 150, h = f.dimensions?.height ?? 50, p = f.parentId ? $o(f, this._nodeMap, this._config.nodeOrigin) : f.position, g = !(p.x + u < c.minX || p.x > c.maxX || p.y + h < c.minY || p.y > c.maxY);
          g && d.add(f.id);
          const w = this._nodeElements.get(f.id);
          w && (w.style.display = g ? "" : "none");
        }
        this._visibleNodeIds = d;
      },
      _getVisibleNodeIds() {
        return this._visibleNodeIds;
      },
      _applyZoomLevel(s) {
        if (e.zoomLevels === !1) return;
        const l = e.zoomLevels?.far ?? 0.4, a = e.zoomLevels?.medium ?? 0.75, c = s < l ? "far" : s < a ? "medium" : "close";
        c !== this._zoomLevel && (this._zoomLevel = c, this._container?.setAttribute("data-zoom-level", c));
      },
      getAbsolutePosition(s) {
        const l = this._nodeMap.get(s);
        return l ? $o(l, this._nodeMap, this._config.nodeOrigin) : { x: 0, y: 0 };
      },
      // ── Init Helpers ─────────────────────────────────────────────────
      /** Enable debug logging if configured. */
      _initDebug() {
        e.debug && er(!0);
      },
      /** Set up container element, attributes, CSS custom properties, animator. */
      _initContainer() {
        this._container = this.$el, this._container.setAttribute("data-flow-canvas", ""), e.fitViewOnInit && this._container.setAttribute("data-fit-view", ""), this._container.setAttribute("role", "application"), this._container.setAttribute("aria-label", e.ariaLabel ?? "Flow diagram"), this._containerStyles = getComputedStyle(this._container), this._animator = new vu(On), e.patternColor && this._container.style.setProperty("--flow-bg-pattern-color", e.patternColor), e.backgroundGap && this._container.style.setProperty("--flow-bg-pattern-gap", String(e.backgroundGap)), this._applyZoomLevel(this.viewport.zoom);
      },
      /** Create color mode handle if configured. */
      _initColorMode() {
        e.colorMode && (this._colorModeHandle = wr(this._container, e.colorMode));
      },
      /** Hydrate from static HTML, sort nodes, rebuild maps, capture initial dimensions. */
      _initHydration() {
        this._container.hasAttribute("data-flow-static") && this._hydrateFromStatic(), this.nodes = at(this.nodes), this._rebuildNodeMap(), this._rebuildEdgeMap();
        for (const s of this.nodes)
          s.dimensions && this._initialDimensions.set(s.id, { ...s.dimensions });
      },
      /** Create FlowHistory if configured. */
      _initHistory() {
        e.history && (this._history = new uu(e.historyMaxSize ?? 50));
      },
      /** Create screen reader announcer. */
      _initAnnouncer() {
        if (e.announcements !== !1 && this._container) {
          const s = typeof e.announcements == "object" ? e.announcements.formatMessage : void 0;
          this._announcer = new df(this._container, s);
        }
      },
      /** Set up collaboration bridge via collab addon plugin. */
      _initCollab() {
        if (e.collab && this._container) {
          const s = Et("collab");
          if (!s) {
            console.error("[AlpineFlow] Collaboration requires the collab plugin. Register it with: Alpine.plugin(AlpineFlowCollab)");
            return;
          }
          const l = this._container, { Doc: a, Awareness: c, CollabBridge: d, CollabAwareness: f } = s, u = e.collab, h = new a(), p = new c(h), g = new d(h, this, u.provider), w = new f(p, u.user);
          if (Ae.set(l, { bridge: g, awareness: w, doc: h }), u.provider.connect(h, p), u.cursors !== !1) {
            let m = !1;
            const E = u.throttle ?? 20, C = (M) => {
              if (m) return;
              m = !0;
              const T = l.getBoundingClientRect(), v = (M.clientX - T.left - this.viewport.x) / this.viewport.zoom, P = (M.clientY - T.top - this.viewport.y) / this.viewport.zoom;
              w.updateCursor({ x: v, y: P }), setTimeout(() => {
                m = !1;
              }, E);
            }, b = () => {
              w.updateCursor(null);
            };
            l.addEventListener("mousemove", C), l.addEventListener("mouseleave", b);
            const D = Ae.get(l);
            D.cursorCleanup = () => {
              l.removeEventListener("mousemove", C), l.removeEventListener("mouseleave", b);
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
        }), this._panZoom = ou(this._container, {
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
          minZoom: e.minZoom,
          maxZoom: e.maxZoom,
          pannable: e.pannable,
          zoomable: e.zoomable,
          translateExtent: e.translateExtent,
          isLocked: () => this._animationLocked,
          noPanClassName: e.noPanClassName ?? "nopan",
          noWheelClassName: e.noWheelClassName,
          zoomOnDoubleClick: e.zoomOnDoubleClick,
          panOnDrag: e.panOnDrag,
          panActivationKeyCode: e.panActivationKeyCode,
          zoomActivationKeyCode: e.zoomActivationKeyCode,
          isTouchSelectionMode: () => this._touchSelectionMode,
          panOnScroll: e.panOnScroll,
          panOnScrollDirection: e.panOnScrollDirection,
          panOnScrollSpeed: e.panOnScrollSpeed,
          onScrollPan: (s, l) => {
            this.panBy(s, l);
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
          }), this.pendingConnection = null, this._container?.classList.remove("flow-connecting"), this._container && Pe(this._container));
          const c = a.target;
          if (c === this._container || c.classList.contains("flow-viewport")) {
            const d = this.screenToFlowPosition(a.clientX, a.clientY);
            this._emit("pane-click", { event: a, position: d }), this.deselectAll();
          }
        }, this._container.addEventListener("click", this._onCanvasClick), this._onCanvasContextMenu = (a) => {
          const c = a.target;
          if (c === this._container || c.classList.contains("flow-viewport"))
            if (a.preventDefault(), this.selectedNodes.size > 1) {
              const d = this.nodes.filter((f) => this.selectedNodes.has(f.id));
              this._emit("selection-context-menu", { nodes: d, event: a });
            } else {
              const d = this.screenToFlowPosition(a.clientX, a.clientY);
              this._emit("pane-context-menu", { event: a, position: d });
            }
        }, this._container.addEventListener("contextmenu", this._onCanvasContextMenu);
        const s = e.longPressAction ?? "context-menu";
        if (s && (this._longPressCleanup = Gu(
          this._container,
          (a) => {
            const c = a.target;
            if (s === "context-menu") {
              const d = c.closest("[data-flow-node-id]");
              if (d) {
                const u = d.getAttribute("data-flow-node-id"), h = this._nodeMap.get(u);
                if (h) {
                  this._emit("node-context-menu", { node: h, event: a });
                  return;
                }
              }
              const f = c.closest(".flow-edge-svg");
              if (f) {
                const u = f.getAttribute("data-edge-id"), h = u ? this._edgeMap.get(u) : void 0;
                if (h) {
                  this._emit("edge-context-menu", { edge: h, event: a });
                  return;
                }
              }
              if (this.selectedNodes.size > 1) {
                const u = this.nodes.filter((h) => this.selectedNodes.has(h.id));
                this._emit("selection-context-menu", { nodes: u, event: a });
              } else {
                const u = this.screenToFlowPosition(a.clientX, a.clientY);
                this._emit("pane-context-menu", { event: a, position: u });
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
          let a = 0, c = 0;
          const d = (g) => {
            g.pointerType === "touch" && (c++, c === 2 && Date.now() - a < 300 && (this._touchSelectionMode = !this._touchSelectionMode, this._container?.classList.toggle("flow-touch-selection-mode", this._touchSelectionMode)), a = Date.now());
          }, f = (g) => {
            g.pointerType === "touch" && (c = Math.max(0, c - 1), c === 0 && (a = 0));
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
          if (ze(s.key, a.escape) && this.contextMenu.show) {
            this.closeContextMenu();
            return;
          }
          if (ze(s.key, a.escape) && this.pendingConnection) {
            this._emit("connect-end", {
              connection: null,
              source: this.pendingConnection.source,
              sourceHandle: this.pendingConnection.sourceHandle,
              position: { x: 0, y: 0 }
            }), this.pendingConnection = null, this._container?.classList.remove("flow-connecting"), this._container && Pe(this._container);
            return;
          }
          if (ze(s.key, a.delete)) {
            if (l === "INPUT" || l === "TEXTAREA") return;
            this._deleteSelected();
          }
          if (ze(s.key, this._shortcuts.selectionToolToggle) && !s.ctrlKey && !s.metaKey) {
            if (l === "INPUT" || l === "TEXTAREA") return;
            this._selectionTool = this._selectionTool === "box" ? "lasso" : "box";
            return;
          }
          if (ze(s.key, a.moveNodes)) {
            if (l === "INPUT" || l === "TEXTAREA" || this._config?.disableKeyboardA11y || this.selectedNodes.size === 0) return;
            s.preventDefault();
            const c = st(s, a.moveStepModifier) ? a.moveStep * a.moveStepMultiplier : a.moveStep;
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
                const u = Array.isArray(a.moveNodes) ? a.moveNodes : [a.moveNodes], h = s.key.length === 1 ? s.key.toLowerCase() : s.key, p = u.findIndex((g) => (g.length === 1 ? g.toLowerCase() : g) === h);
                p === 0 ? f = -c : p === 1 ? f = c : p === 2 ? d = -c : p === 3 && (d = c);
              }
            }
            this._captureHistory();
            for (const u of this.selectedNodes) {
              const h = this.getNode(u);
              if (h && ur(h)) {
                h.position.x += d, h.position.y += f;
                const p = this._container ? Ae.get(this._container) : void 0;
                p?.bridge && p.bridge.pushLocalNodeUpdate(h.id, { position: h.position });
              }
            }
          }
          if ((s.ctrlKey || s.metaKey) && !s.shiftKey && ze(s.key, a.undo)) {
            if (l === "INPUT" || l === "TEXTAREA") return;
            s.preventDefault(), this.undo();
          }
          if ((s.ctrlKey || s.metaKey) && s.shiftKey && ze(s.key, a.redo)) {
            if (l === "INPUT" || l === "TEXTAREA") return;
            s.preventDefault(), this.redo();
          }
          if ((s.ctrlKey || s.metaKey) && !s.shiftKey) {
            if (l === "INPUT" || l === "TEXTAREA") return;
            ze(s.key, a.copy) ? (s.preventDefault(), this.copy()) : ze(s.key, a.paste) ? (s.preventDefault(), this.paste()) : ze(s.key, a.cut) && (s.preventDefault(), this.cut());
          }
        }, document.addEventListener("keydown", this._onKeyDown);
      },
      /** Create minimap if configured. */
      _initMinimap() {
        e.minimap && (this._minimap = xu(this._container, {
          getState: () => ({
            nodes: qn(this.nodes, this._nodeMap, this._config.nodeOrigin),
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
          const s = e.controlsContainer ? document.querySelector(e.controlsContainer) ?? this._container : this._container, l = s !== this._container;
          this._controls = Lu(s, {
            position: e.controlsPosition ?? "bottom-left",
            orientation: e.controlsOrientation ?? "vertical",
            external: l,
            showZoom: e.controlsShowZoom ?? !0,
            showFitView: e.controlsShowFitView ?? !0,
            showInteractive: e.controlsShowInteractive ?? !0,
            showResetPanels: e.controlsShowResetPanels ?? !1,
            onZoomIn: () => this.zoomIn(),
            onZoomOut: () => this.zoomOut(),
            onFitView: () => this.fitView({ padding: Ao }),
            onToggleInteractive: () => this.toggleInteractive(),
            onResetPanels: () => this.resetPanels()
          }), this.$watch("isInteractive", (a) => {
            this._controls?.update({ isInteractive: a });
          });
        }
      },
      /** Selection box/lasso setup (pointerdown/pointermove/pointerup handlers). */
      _initSelection() {
        this._selectionBox = Mu(this._container), this._lasso = Tu(this._container), this._selectionTool = e.selectionTool ?? "box", this._onSelectionPointerDown = (s) => {
          if (!this._config.selectionOnDrag && !this._touchSelectionMode && !st(s, this._shortcuts.selectionBox))
            return;
          const l = s.target;
          if (l !== this._container && !l.classList.contains("flow-viewport"))
            return;
          s.stopPropagation(), s.preventDefault(), this._selectionShiftHeld = !0;
          const a = this._config.selectionMode ?? "partial", c = st(s, this._shortcuts.selectionModeToggle);
          if (this._selectionEffectiveMode = c ? a === "partial" ? "full" : "partial" : a, !this._container) return;
          const d = this._container.getBoundingClientRect(), f = s.clientX - d.left, u = s.clientY - d.top;
          this._selectionTool === "lasso" ? this._lasso.start(f, u, this._selectionEffectiveMode) : this._selectionBox.start(f, u, this._selectionEffectiveMode), s.target.setPointerCapture(s.pointerId);
        }, this._onSelectionPointerMove = (s) => {
          if (!(this._selectionTool === "lasso" ? this._lasso?.isActive() : this._selectionBox?.isActive()) || !this._container) return;
          const a = this._container.getBoundingClientRect(), c = s.clientX - a.left, d = s.clientY - a.top;
          this._selectionTool === "lasso" ? this._lasso.update(c, d) : this._selectionBox.update(c, d);
        }, this._onSelectionPointerUp = (s) => {
          if (!(this._selectionTool === "lasso" ? this._lasso?.isActive() : this._selectionBox?.isActive())) return;
          s.target.releasePointerCapture(s.pointerId), this._suppressNextCanvasClick = !0;
          const a = qn(this.nodes, this._nodeMap, this._config.nodeOrigin);
          let c, d = [];
          if (this._selectionTool === "lasso") {
            const f = this._lasso.end(this.viewport);
            if (!f) return;
            const u = this._selectionEffectiveMode === "full" ? $u(a, f) : Iu(a, f), h = new Set(u.map((p) => p.id));
            if (c = this.nodes.filter((p) => h.has(p.id)), this._config.lassoSelectsEdges)
              for (const p of this.edges) {
                if (p.hidden) continue;
                const g = this._container?.querySelector(
                  `[data-flow-edge-id="${CSS.escape(p.id)}"] path`
                );
                if (!g) continue;
                const w = g.getTotalLength(), m = Math.max(10, Math.ceil(w / 20));
                let E = 0;
                for (let b = 0; b <= m; b++) {
                  const D = g.getPointAtLength(b / m * w);
                  ti(D.x, D.y, f) && E++;
                }
                (this._selectionEffectiveMode === "full" ? E === m + 1 : E > 0) && d.push(p.id);
              }
          } else {
            const f = this._selectionBox.end(this.viewport);
            if (!f) return;
            const u = this._selectionEffectiveMode === "full" ? ru(a, f, this._config.nodeOrigin) : su(a, f, this._config.nodeOrigin), h = new Set(u.map((p) => p.id));
            c = this.nodes.filter((p) => h.has(p.id));
          }
          this._selectionShiftHeld || this.deselectAll();
          for (const f of c) {
            if (!Io(f) || f.hidden) continue;
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
        e.onDrop && (this._onDropZoneDragOver = (s) => {
          s.preventDefault(), s.dataTransfer && (s.dataTransfer.dropEffect = "move");
        }, this._onDropZoneDrop = (s) => {
          s.preventDefault();
          const l = s.dataTransfer?.getData("application/alpineflow");
          if (!l || !e.onDrop) return;
          let a;
          try {
            a = JSON.parse(l);
          } catch {
            a = l;
          }
          if (!this._container) return;
          const c = Js(
            s.clientX,
            s.clientY,
            this.viewport,
            this._container.getBoundingClientRect()
          ), f = document.elementFromPoint(s.clientX, s.clientY)?.closest("[x-flow-node]"), u = f?.dataset.flowNodeId ? this.getNode(f.dataset.flowNodeId) ?? null : null, h = e.onDrop({ data: a, position: c, targetNode: u });
          h && this.addNodes(h, { center: !0 });
        }, this._container.addEventListener("dragover", this._onDropZoneDragOver), this._container.addEventListener("drop", this._onDropZoneDrop));
      },
      /** Run initial child layouts for all layout parents. */
      _initChildLayout() {
        if (this.$wire) {
          const s = this.$wire;
          e.wireEvents && yf(e, s, e.wireEvents);
          const l = wf(this, s), a = gf(this, s);
          this._wireCleanup = () => {
            l(), a();
          }, B("init", `wire bridge activated for "${this._id}"`);
        }
        B("init", `flowCanvas "${this._id}" ready`), this._emit("init"), this._recomputeChildValidation();
        for (const s of this.nodes)
          s.childLayout && !s.parentId && this.layoutChildren(s.id);
        for (const s of this.nodes)
          s.childLayout && s.parentId && (this._nodeMap.get(s.parentId)?.childLayout || this.layoutChildren(s.id));
        e.fitViewOnInit && requestAnimationFrame(() => {
          this.fitView();
        });
      },
      /** Validate auto-layout dependency and start initial layout. */
      _initAutoLayout() {
        if (e.autoLayout) {
          const s = e.autoLayout.algorithm, l = {
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
          c && Et(c) ? (this._autoLayoutReady = !0, this.$nextTick(() => this._runAutoLayout())) : c && this._warn("AUTO_LAYOUT_MISSING_DEP", `autoLayout requires the ${s} plugin. Register it with: Alpine.plugin(${a[s]})`);
        }
      },
      /** requestAnimationFrame ready flip, loading watch, loading overlay injection. */
      _initReady() {
        const s = e.fitViewOnInit ? 2 : 1;
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
        for (const d of this.edges)
          for (const f of [d.markerStart, d.markerEnd]) {
            if (!f) continue;
            const u = sn(f), h = rn(u, this._id);
            l.has(h) || l.set(h, Bn(u, h));
          }
        const a = s.querySelectorAll("marker"), c = /* @__PURE__ */ new Set();
        a.forEach((d) => {
          l.has(d.id) ? c.add(d.id) : d.remove();
        });
        for (const [d, f] of l)
          if (!c.has(d)) {
            const h = new DOMParser().parseFromString(
              `<svg xmlns="http://www.w3.org/2000/svg">${f}</svg>`,
              "image/svg+xml"
            ).querySelector("marker");
            h && s.appendChild(document.importNode(h, !0));
          }
      },
      destroy() {
        if (this._wireCleanup?.(), this._wireCleanup = null, this._longPressCleanup?.(), this._longPressCleanup = null, this._touchSelectionCleanup?.(), this._touchSelectionCleanup = null, this._emit("destroy"), B("destroy", `flowCanvas "${this._id}" destroying`), this._onCanvasClick && this._container && this._container.removeEventListener("click", this._onCanvasClick), this._onCanvasContextMenu && this._container && this._container.removeEventListener("contextmenu", this._onCanvasContextMenu), this._container)
          for (const s of this._contextMenuListeners)
            this._container.removeEventListener(s.event, s.handler);
        this._contextMenuListeners = [], this._onKeyDown && document.removeEventListener("keydown", this._onKeyDown), this._onContainerPointerDown && this._container && this._container.removeEventListener("pointerdown", this._onContainerPointerDown), this._markerDefsEl?.remove(), this._markerDefsEl = null, this._minimap?.destroy(), this._minimap = null, this._controls?.destroy(), this._controls = null, this._onSelectionPointerDown && this._container && this._container.removeEventListener("pointerdown", this._onSelectionPointerDown), this._onSelectionPointerMove && this._container && this._container.removeEventListener("pointermove", this._onSelectionPointerMove), this._onSelectionPointerUp && this._container && this._container.removeEventListener("pointerup", this._onSelectionPointerUp), this._selectionBox?.destroy(), this._selectionBox = null, this._lasso?.destroy(), this._lasso = null, this._viewportEl = null, this._container && (this._container.removeEventListener("dragover", this._onDropZoneDragOver), this._container.removeEventListener("drop", this._onDropZoneDrop)), this._followHandle?.stop(), this._followHandle = null;
        for (const s of this._activeTimelines)
          s.stop();
        if (this._activeTimelines.clear(), this._animator && (t.raw(this._animator).stopAll(), this._animator = null), this._layoutAnimFrame && (cancelAnimationFrame(this._layoutAnimFrame), this._layoutAnimFrame = 0), this._autoLayoutTimer && (clearTimeout(this._autoLayoutTimer), this._autoLayoutTimer = null), this._colorModeHandle && (this._colorModeHandle.destroy(), this._colorModeHandle = null), this._container) {
          const s = Ae.get(this._container);
          s && (s.bridge.destroy(), s.awareness.destroy(), s.cursorCleanup && s.cursorCleanup(), Ae.delete(this._container));
        }
        e.collab && e.collab.provider.destroy(), this._container && this._container.removeAttribute("data-flow-canvas"), this.$store.flow.unregister(this._id), this._panZoom?.destroy(), this._panZoom = null, this._announcer?.destroy(), this._announcer = null, this._computeDebounceTimer && (clearTimeout(this._computeDebounceTimer), this._computeDebounceTimer = null);
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
        return this._container ? Ae.get(this._container)?.awareness : void 0;
      },
      async toImage(s) {
        let l;
        try {
          ({ captureFlowImage: l } = await Promise.resolve().then(() => gg));
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
      xf(i),
      Ef(i),
      Sf(i),
      Lf(i),
      Mf(i),
      ih(i),
      ah(i),
      lh(i),
      ch(i),
      wh(i),
      vh(i),
      _h(i),
      Yh(i, t),
      qh(i)
    ];
    for (const s of r)
      Object.defineProperties(n, Object.getOwnPropertyDescriptors(s));
    return n.registerMarker = (s, l) => {
      _u(s, l);
    }, n;
  });
}
function us(t, e) {
  return {
    x: e[0] * Math.round(t.x / e[0]),
    y: e[1] * Math.round(t.y / e[1])
  };
}
function Zh(t, e, n) {
  const { onDragStart: o, onDrag: i, onDragEnd: r, getViewport: s, getNodePosition: l, snapToGrid: a = !1, filterSelector: c, container: d, isLocked: f, noDragClassName: u, dragThreshold: h = 0 } = n;
  let p = { x: 0, y: 0 };
  function g(E) {
    const C = s();
    return {
      x: (E.x - C.x) / C.zoom,
      y: (E.y - C.y) / C.zoom
    };
  }
  const w = Re(t), m = Rl().subject(() => {
    const E = s(), C = l();
    return {
      x: C.x * E.zoom + E.x,
      y: C.y * E.zoom + E.y
    };
  }).on("start", (E) => {
    p = g(E), o?.({ nodeId: e, position: p, sourceEvent: E.sourceEvent });
  }).on("drag", (E) => {
    let C = g(E);
    a && (C = us(C, a));
    const b = {
      x: C.x - p.x,
      y: C.y - p.y
    };
    i?.({ nodeId: e, position: C, delta: b, sourceEvent: E.sourceEvent });
  }).on("end", (E) => {
    let C = g(E);
    a && (C = us(C, a)), r?.({ nodeId: e, position: C, sourceEvent: E.sourceEvent });
  });
  return d && m.container(() => d), h > 0 && m.clickDistance(h), m.filter((E) => {
    if (f?.() || u && E.target?.closest?.("." + u)) return !1;
    if (c) {
      const C = t.querySelector(c);
      return C ? C.contains(E.target) : !0;
    }
    return !0;
  }), w.call(m), {
    destroy() {
      w.on(".drag", null);
    }
  };
}
function Gh(t, e) {
  const n = Rt(t, e);
  return {
    id: t.id,
    x: n.x,
    y: n.y,
    width: t.dimensions?.width ?? we,
    height: t.dimensions?.height ?? ve
  };
}
function Kh(t, e, n) {
  const o = /* @__PURE__ */ new Set(), i = /* @__PURE__ */ new Set();
  let r = 0, s = 0, l = 1 / 0, a = 1 / 0;
  const c = t.x + t.width / 2, d = t.y + t.height / 2, f = t.x + t.width, u = t.y + t.height;
  for (const h of e) {
    const p = h.x + h.width / 2, g = h.y + h.height / 2, w = h.x + h.width, m = h.y + h.height, E = [
      [t.x, h.x],
      // left-left
      [f, w],
      // right-right
      [c, p],
      // center-center
      [t.x, w],
      // left-right
      [f, h.x]
      // right-left
    ];
    for (const [b, D] of E) {
      const M = D - b;
      Math.abs(M) <= n && (i.add(D), Math.abs(M) < Math.abs(l) && (l = M, r = M));
    }
    const C = [
      [t.y, h.y],
      // top-top
      [u, m],
      // bottom-bottom
      [d, g],
      // center-center
      [t.y, m],
      // top-bottom
      [u, h.y]
      // bottom-top
    ];
    for (const [b, D] of C) {
      const M = D - b;
      Math.abs(M) <= n && (o.add(D), Math.abs(M) < Math.abs(a) && (a = M, s = M));
    }
  }
  return {
    horizontal: [...o],
    vertical: [...i],
    snapOffset: { x: r, y: s }
  };
}
function Jh(t, e, n, o) {
  return Math.abs(t.x - e.x) > 30 ? t.x < e.x ? { source: n, target: o } : { source: o, target: n } : t.y < e.y ? { source: n, target: o } : { source: o, target: n };
}
function Qh(t, e, n, o) {
  let i = null, r = o;
  for (const s of n) {
    if (s.id === t) continue;
    const l = Math.sqrt(
      (e.x - s.center.x) ** 2 + (e.y - s.center.y) ** 2
    );
    if (l < r) {
      r = l;
      const { source: a, target: c } = Jh(e, s.center, t, s.id);
      i = { source: a, target: c, targetId: s.id, distance: l, targetCenter: s.center };
    }
  }
  return i;
}
const ep = /* @__PURE__ */ new Set(["x-data", "x-init", "x-bind", "href", "src", "action", "formaction", "srcdoc"]);
let tp = 0, np = 0;
function op(t, e) {
  switch (e) {
    case "alt":
      return t.altKey;
    case "meta":
      return t.metaKey;
    case "shift":
      return t.shiftKey;
  }
}
function ip(t, e, n) {
  const o = t.querySelectorAll('[data-flow-handle-type="source"]');
  if (o.length === 0) return null;
  let i = null, r = 1 / 0;
  return o.forEach((s) => {
    const l = s, a = l.getBoundingClientRect();
    if (a.width === 0 && a.height === 0) return;
    const c = a.left + a.width / 2, d = a.top + a.height / 2, f = Math.sqrt((e - c) ** 2 + (n - d) ** 2);
    f < r && (r = f, i = l);
  }), i;
}
function sp(t, e, n) {
  let o = 1 / 0, i = -1 / 0, r = 1 / 0, s = -1 / 0;
  for (const c of n)
    o = Math.min(o, c.x), i = Math.max(i, c.x + c.width), r = Math.min(r, c.y), s = Math.max(s, c.y + c.height);
  const l = 50, a = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  a.style.cssText = "position:absolute;top:0;left:0;width:1px;height:1px;overflow:visible;pointer-events:none;z-index:500;";
  for (const c of t) {
    const d = document.createElementNS("http://www.w3.org/2000/svg", "line");
    d.setAttribute("x1", String(o - l)), d.setAttribute("y1", String(c)), d.setAttribute("x2", String(i + l)), d.setAttribute("y2", String(c)), d.classList.add("flow-guide-path"), a.appendChild(d);
  }
  for (const c of e) {
    const d = document.createElementNS("http://www.w3.org/2000/svg", "line");
    d.setAttribute("x1", String(c)), d.setAttribute("y1", String(r - l)), d.setAttribute("x2", String(c)), d.setAttribute("y2", String(s + l)), d.classList.add("flow-guide-path"), a.appendChild(d);
  }
  return a;
}
function rp(t) {
  t.directive(
    "flow-node",
    (e, { expression: n }, { evaluate: o, effect: i, cleanup: r }) => {
      let s = null, l = !1, a = !1, c = null, d = null, f = null, u = null, h = null, p = null, g = !1, w = -1, m = null, E = !1, C = [], b = "", D = [], M = null;
      i(() => {
        const x = o(n);
        if (!x) return;
        if (e.dataset.flowNodeId = x.id, !E) {
          const R = t.$data(e.closest("[x-data]"));
          let Q = !1;
          if (R?._config?.nodeTypes) {
            const X = x.type ?? "default", W = R._config.nodeTypes[X] ?? R._config.nodeTypes.default;
            if (typeof W == "string") {
              const $ = document.querySelector(W);
              $?.content && (e.appendChild($.content.cloneNode(!0)), Q = !0);
            } else typeof W == "function" && (W(x, e), Q = !0);
          }
          if (!Q && e.children.length === 0) {
            const X = document.createElement("div");
            X.setAttribute("x-flow-handle:target", "");
            const W = document.createElement("span");
            W.setAttribute("x-text", "node.data.label");
            const $ = document.createElement("div");
            $.setAttribute("x-flow-handle:source", ""), e.appendChild(X), e.appendChild(W), e.appendChild($), Q = !0;
          }
          if (Q)
            for (const X of Array.from(e.children))
              t.addScopeToNode(X, { node: x }), t.initTree(X);
          E = !0;
        }
        if (x.hidden) {
          e.classList.add("flow-node-hidden"), e.removeAttribute("tabindex"), e.removeAttribute("role"), e.removeAttribute("aria-label"), s?.destroy(), s = null;
          return;
        }
        e.classList.remove("flow-node-hidden"), M !== x.id && (s?.destroy(), s = null, M = x.id);
        const y = t.$data(e.closest("[x-data]"));
        if (!y?.viewport) return;
        e.classList.add("flow-node", "nopan"), x.type === "group" ? e.classList.add("flow-node-group") : e.classList.remove("flow-node-group");
        const q = x.parentId ? y.getAbsolutePosition(x.id) : x.position ?? { x: 0, y: 0 }, _ = x.nodeOrigin ?? y._config?.nodeOrigin ?? [0, 0], L = x.dimensions?.width ?? 150, A = x.dimensions?.height ?? 40;
        e.style.left = q.x - L * _[0] + "px", e.style.top = q.y - A * _[1] + "px", x.dimensions && (e.style.width = x.dimensions.width + "px", e.style.height = x.dimensions.height + "px"), y.selectedNodes.has(x.id) ? e.classList.add("flow-node-selected") : e.classList.remove("flow-node-selected"), e.setAttribute("aria-selected", String(!!x.selected)), x._validationErrors && x._validationErrors.length > 0 ? e.classList.add("flow-node-invalid") : e.classList.remove("flow-node-invalid");
        for (const R of C)
          e.classList.remove(R);
        const O = x.class ? x.class.split(/\s+/).filter(Boolean) : [];
        for (const R of O)
          e.classList.add(R);
        C = O;
        const S = x.shape ? `flow-node-${x.shape}` : "";
        b !== S && (b && e.classList.remove(b), S && e.classList.add(S), b = S);
        const k = t.$data(e.closest("[data-flow-canvas]")), N = x.shape && k?._shapeRegistry?.[x.shape];
        if (N?.clipPath ? e.style.clipPath = N.clipPath : e.style.clipPath = "", x.style) {
          const R = typeof x.style == "string" ? Object.fromEntries(x.style.split(";").filter(Boolean).map((X) => X.split(":").map((W) => W.trim()))) : x.style, Q = [];
          for (const [X, W] of Object.entries(R))
            X && W && (e.style.setProperty(X, W), Q.push(X));
          for (const X of D)
            Q.includes(X) || e.style.removeProperty(X);
          D = Q;
        } else if (D.length > 0) {
          for (const R of D)
            e.style.removeProperty(R);
          D = [];
        }
        if (x.rotation ? (e.style.transform = `rotate(${x.rotation}deg)`, e.style.transformOrigin = "center") : e.style.transform = "", x.focusable ?? y._config?.nodesFocusable !== !1 ? (e.setAttribute("tabindex", "0"), e.setAttribute("role", x.ariaRole ?? "group"), e.setAttribute("aria-label", x.ariaLabel ?? (x.data?.label ? `Node: ${x.data.label}` : `Node ${x.id}`))) : (e.removeAttribute("tabindex"), e.removeAttribute("role"), e.removeAttribute("aria-label")), x.domAttributes)
          for (const [R, Q] of Object.entries(x.domAttributes))
            R.startsWith("on") || ep.has(R.toLowerCase()) || e.setAttribute(R, Q);
        ot(x) ? e.classList.remove("flow-node-no-connect") : e.classList.add("flow-node-no-connect"), x.collapsed ? e.classList.add("flow-node-collapsed") : e.classList.remove("flow-node-collapsed");
        const J = e.classList.contains("flow-node-condensed");
        x.condensed ? e.classList.add("flow-node-condensed") : e.classList.remove("flow-node-condensed"), !!x.condensed !== J && requestAnimationFrame(() => {
          x.dimensions = {
            width: e.offsetWidth,
            height: e.offsetHeight
          }, B("condense", `Node "${x.id}" re-measured after condense toggle`, x.dimensions);
        }), x.filtered ? e.classList.add("flow-node-filtered") : e.classList.remove("flow-node-filtered");
        const oe = x.handles ?? "visible";
        e.classList.remove("flow-handles-hidden", "flow-handles-hover", "flow-handles-select"), oe !== "visible" && e.classList.add(`flow-handles-${oe}`);
        let K = gr(x, y._nodeMap);
        y._config?.elevateNodesOnSelect !== !1 && y.selectedNodes.has(x.id) && (K += x.type === "group" ? Math.max(1 - K, 0) : 1e3), g && (K += 1e3);
        const le = x.type === "group" ? 0 : 2;
        if (K !== le ? e.style.zIndex = String(K) : e.style.removeProperty("z-index"), !ur(x)) {
          e.classList.add("flow-node-locked"), s?.destroy(), s = null;
          return;
        }
        e.classList.remove("flow-node-locked"), e.querySelector("[data-flow-drag-handle]") ? e.classList.add("flow-node-has-handle") : e.classList.remove("flow-node-has-handle");
        const te = e.closest(".flow-container");
        s || (s = Zh(e, x.id, {
          container: te ?? void 0,
          filterSelector: "[data-flow-drag-handle]",
          isLocked: () => y._animationLocked,
          noDragClassName: y._config?.noDragClassName ?? "nodrag",
          dragThreshold: y._config?.nodeDragThreshold ?? 0,
          getViewport: () => y.viewport,
          getNodePosition: () => {
            const R = y.getNode(x.id);
            return R ? R.parentId ? y.getAbsolutePosition(R.id) : { x: R.position.x, y: R.position.y } : { x: 0, y: 0 };
          },
          snapToGrid: y._config?.snapToGrid ?? !1,
          onDragStart({ nodeId: R, position: Q, sourceEvent: X }) {
            l = !1, a = !1, c = null;
            const W = y._container ? Ae.get(y._container) : void 0;
            W?.bridge && W.bridge.setDragging(R, !0), u?.destroy(), u = null, h = null, p && te && te.querySelector(`[data-flow-node-id="${CSS.escape(p)}"]`)?.classList.remove("flow-node-drop-target"), p = null, y._captureHistory?.(), B("drag", `Node "${R}" drag start`, Q);
            const $ = y.getNode(R);
            if ($ && (y._config?.selectNodesOnDrag !== !1 && $.selectable !== !1 && !y.selectedNodes.has(R) && (st(X, y._shortcuts?.multiSelect) || y.deselectAll(), y.selectedNodes.add(R), $.selected = !0, y._emitSelectionChange(), a = !0), y._emit("node-drag-start", { node: $ }), y.selectedNodes.has(R) && y.selectedNodes.size > 1)) {
              const j = rt(R, y.nodes);
              c = /* @__PURE__ */ new Map();
              for (const ee of y.selectedNodes) {
                if (ee === R || j.has(ee))
                  continue;
                const V = y.getNode(ee);
                V && V.draggable !== !1 && c.set(ee, { x: V.position.x, y: V.position.y });
              }
            }
            y._config?.autoPanOnNodeDrag !== !1 && te && (d = hr({
              container: te,
              speed: y._config?.autoPanSpeed ?? 15,
              onPan(j, ee) {
                const V = y.viewport?.zoom || 1, G = { x: y.viewport.x, y: y.viewport.y };
                y._panZoom?.setViewport({
                  x: y.viewport.x - j,
                  y: y.viewport.y - ee,
                  zoom: V
                });
                const ie = G.x - y.viewport.x, F = G.y - y.viewport.y, Z = ie === 0 && F === 0, Y = y.getNode(R);
                let ne = !1;
                if (Y) {
                  const H = Y.position.x, z = Y.position.y;
                  Y.position.x += ie / V, Y.position.y += F / V;
                  const ae = xn(Y.position, Y, y._config?.nodeExtent);
                  Y.position.x = ae.x, Y.position.y = ae.y, ne = Y.position.x === H && Y.position.y === z;
                }
                if (c)
                  for (const [H] of c) {
                    const z = y.getNode(H);
                    if (z) {
                      z.position.x += ie / V, z.position.y += F / V;
                      const ae = xn(z.position, z, y._config?.nodeExtent);
                      z.position.x = ae.x, z.position.y = ae.y;
                    }
                  }
                return Z && ne;
              }
            }), X instanceof MouseEvent && d.updatePointer(X.clientX, X.clientY), d.start());
          },
          onDrag({ nodeId: R, position: Q, delta: X, sourceEvent: W }) {
            l = !0;
            const $ = y.getNode(R);
            if ($) {
              if ($.parentId) {
                const V = y.getAbsolutePosition($.parentId);
                let G = Q.x - V.x, ie = Q.y - V.y;
                const F = $.dimensions ?? { width: 150, height: 50 }, Z = y.getNode($.parentId);
                if (Z?.childLayout) {
                  g || (e.classList.add("flow-reorder-dragging"), m = $.parentId), g = !0;
                  const Y = $.extent !== "parent";
                  if ($.position.x = Q.x - V.x, $.position.y = Q.y - V.y, !Y && Z.dimensions) {
                    const z = co({ x: $.position.x, y: $.position.y }, F, Z.dimensions);
                    $.position.x = z.x, $.position.y = z.y;
                  }
                  const ne = $.dimensions?.width ?? 150, H = $.dimensions?.height ?? 50;
                  if (Y) {
                    const z = Z.dimensions?.width ?? 150, ae = Z.dimensions?.height ?? 50, re = $.position.x + ne / 2, fe = $.position.y + H / 2, ge = 12, he = m === $.parentId ? 0 : ge, Ee = re >= he && re <= z - he && fe >= he && fe <= ae - he, xe = /* @__PURE__ */ new Set();
                    let de = $.parentId;
                    for (; de; )
                      xe.add(de), de = y.getNode(de)?.parentId;
                    const ye = Q.x + ne / 2, Me = Q.y + H / 2, be = rt($.id, y.nodes);
                    let $e = null;
                    const Ce = y.nodes.filter(
                      (ue) => ue.id !== $.id && (ue.droppable || ue.childLayout) && !ue.hidden && !be.has(ue.id) && (Ee ? !xe.has(ue.id) : ue.id !== $.parentId) && (!ue.acceptsDrop || ue.acceptsDrop($))
                    );
                    for (const ue of Ce) {
                      const _e = ue.parentId ? y.getAbsolutePosition(ue.id) : ue.position, Je = ue.dimensions?.width ?? 150, dt = ue.dimensions?.height ?? 50, Qe = ue.id === p ? 0 : ge;
                      ye >= _e.x + Qe && ye <= _e.x + Je - Qe && Me >= _e.y + Qe && Me <= _e.y + dt - Qe && ($e = ue);
                    }
                    const pe = $e?.id ?? null;
                    if (pe !== p) {
                      p && te && te.querySelector(`[data-flow-node-id="${CSS.escape(p)}"]`)?.classList.remove("flow-node-drop-target"), pe && te && te.querySelector(`[data-flow-node-id="${CSS.escape(pe)}"]`)?.classList.add("flow-node-drop-target"), p = pe;
                      const ue = pe ? y.getNode(pe) : null, _e = m;
                      if (ue?.childLayout && pe !== m) {
                        _e && (y.layoutChildren(_e, { omitFromComputation: R, shallow: !0 }), y.propagateLayoutUp(_e, { omitFromComputation: R })), m = pe;
                        const Je = y.nodes.filter((Ye) => Ye.parentId === pe && Ye.id !== R).sort((Ye, jr) => (Ye.order ?? 1 / 0) - (jr.order ?? 1 / 0)), dt = Je.length, Qe = [...Je];
                        Qe.splice(dt, 0, $);
                        for (let Ye = 0; Ye < Qe.length; Ye++)
                          Qe[Ye].order = Ye;
                        w = dt;
                        const fi = y._initialDimensions?.get(R), hi = { ...$, dimensions: fi ? { ...fi } : void 0 };
                        y.layoutChildren(pe, { excludeId: R, includeNode: hi, shallow: !0 }), y.propagateLayoutUp(pe, { includeNode: hi });
                      } else Ee && m !== $.parentId ? (_e && _e !== $.parentId && (y.layoutChildren(_e, { omitFromComputation: R, shallow: !0 }), y.propagateLayoutUp(_e, { omitFromComputation: R })), m = $.parentId, w = -1) : !pe && !Ee && (_e && (y.layoutChildren(_e, { omitFromComputation: R, shallow: !0 }), y.propagateLayoutUp(_e, { omitFromComputation: R })), m = null, w = -1);
                    }
                  }
                  if (m) {
                    const z = y.getNode(m), ae = z?.childLayout ?? Z.childLayout, re = y.nodes.filter((de) => de.parentId === m && de.id !== R).sort((de, ye) => (de.order ?? 1 / 0) - (ye.order ?? 1 / 0));
                    let fe, ge;
                    if (m !== $.parentId) {
                      const de = z?.parentId ? y.getAbsolutePosition(m) : z?.position ?? { x: 0, y: 0 };
                      fe = Q.x - de.x, ge = Q.y - de.y;
                    } else
                      fe = $.position.x, ge = $.position.y;
                    const he = ae.swapThreshold ?? 0.5;
                    if (w === -1)
                      if (m === $.parentId) {
                        const de = $.order ?? 0;
                        w = re.filter((ye) => (ye.order ?? 0) < de).length;
                      } else
                        w = re.length;
                    const Ee = w;
                    let xe = re.length;
                    for (let de = 0; de < re.length; de++) {
                      const ye = re[de], Me = ye.dimensions?.width ?? 150, be = ye.dimensions?.height ?? 50, $e = de < Ee ? 1 - he : he, Ce = ye.position.y + be * $e, pe = ye.position.x + Me * $e;
                      if (ae.direction === "grid") {
                        const ue = {
                          x: fe + ne / 2,
                          y: ge + H / 2
                        }, _e = ye.position.y + be / 2;
                        if (ue.y < ye.position.y) {
                          xe = de;
                          break;
                        }
                        if (Math.abs(ue.y - _e) < be / 2 && ue.x < pe) {
                          xe = de;
                          break;
                        }
                      } else if (ae.direction === "vertical") {
                        if ((de < Ee ? ge : ge + H) < Ce) {
                          xe = de;
                          break;
                        }
                      } else if ((de < Ee ? fe : fe + ne) < pe) {
                        xe = de;
                        break;
                      }
                    }
                    if (xe !== w) {
                      w = xe;
                      const de = [...re];
                      de.splice(xe, 0, $);
                      for (let Ce = 0; Ce < de.length; Ce++)
                        de[Ce].order = Ce;
                      e.closest(".flow-container")?.classList.add("flow-layout-animating"), y._layoutAnimFrame && cancelAnimationFrame(y._layoutAnimFrame);
                      const Me = $.id, be = m, $e = be !== $.parentId;
                      y._layoutAnimFrame = requestAnimationFrame(() => {
                        if ($e && be) {
                          const _e = y.getNode(Me);
                          let Je;
                          if (_e) {
                            const dt = y._initialDimensions?.get(Me);
                            Je = { ..._e, dimensions: dt ? { ...dt } : void 0 };
                          }
                          y.layoutChildren(be, {
                            excludeId: Me,
                            includeNode: Je,
                            shallow: !0
                          }), y.propagateLayoutUp(be, {
                            includeNode: Je
                          });
                        } else
                          y.layoutChildren(be, Me, !0);
                        const Ce = performance.now(), pe = 300, ue = () => {
                          y._layoutAnimTick++, performance.now() - Ce < pe ? y._layoutAnimFrame = requestAnimationFrame(ue) : y._layoutAnimFrame = 0;
                        };
                        y._layoutAnimFrame = requestAnimationFrame(ue);
                      });
                    }
                  }
                  d && W instanceof MouseEvent && d.updatePointer(W.clientX, W.clientY);
                  return;
                }
                if ($.extent === "parent" && Z?.dimensions) {
                  const Y = co(
                    { x: G, y: ie },
                    F,
                    Z.dimensions
                  );
                  G = Y.x, ie = Y.y;
                } else if (Array.isArray($.extent)) {
                  const Y = mr({ x: G, y: ie }, $.extent, F);
                  G = Y.x, ie = Y.y;
                }
                if ((!$.extent || $.extent !== "parent") && (Gt(
                  Z,
                  y._config?.childValidationRules ?? {}
                )?.preventChildEscape || !!Z?.childLayout) && Z?.dimensions) {
                  const H = co(
                    { x: G, y: ie },
                    F,
                    Z.dimensions
                  );
                  G = H.x, ie = H.y;
                }
                if ($.expandParent && Z?.dimensions) {
                  const Y = Ku(
                    { x: G, y: ie },
                    F,
                    Z.dimensions
                  );
                  Y && (Z.dimensions.width = Y.width, Z.dimensions.height = Y.height);
                }
                $.position.x = G, $.position.y = ie;
              } else {
                const V = xn(Q, $, y._config?.nodeExtent);
                $.position.x = V.x, $.position.y = V.y;
              }
              if (y._config?.snapToGrid) {
                const V = $.nodeOrigin ?? y._config?.nodeOrigin ?? [0, 0], G = $.dimensions?.width ?? 150, ie = $.dimensions?.height ?? 40, F = $.parentId ? y.getAbsolutePosition($.id) : $.position;
                e.style.left = F.x - G * V[0] + "px", e.style.top = F.y - ie * V[1] + "px", y._layoutAnimTick++;
              }
              if (y._emit("node-drag", { node: $, position: Q }), c)
                for (const [V, G] of c) {
                  const ie = y.getNode(V);
                  if (ie) {
                    let F = G.x + X.x, Z = G.y + X.y;
                    const Y = xn({ x: F, y: Z }, ie, y._config?.nodeExtent);
                    ie.position.x = Y.x, ie.position.y = Y.y;
                  }
                }
              const ee = y._config?.helperLines;
              if (ee) {
                const V = typeof ee == "object" ? ee.snap ?? !0 : !0, G = typeof ee == "object" ? ee.threshold ?? 5 : 5, ie = (z) => {
                  const ae = z.parentId ? y.getAbsolutePosition(z.id) : z.position;
                  return Gh({ ...z, position: ae }, y._config?.nodeOrigin);
                }, Z = (y.selectedNodes.size > 1 && y.selectedNodes.has(R) ? y.nodes.filter((z) => y.selectedNodes.has(z.id)) : [$]).map(ie), Y = {
                  x: Math.min(...Z.map((z) => z.x)),
                  y: Math.min(...Z.map((z) => z.y)),
                  width: Math.max(...Z.map((z) => z.x + z.width)) - Math.min(...Z.map((z) => z.x)),
                  height: Math.max(...Z.map((z) => z.y + z.height)) - Math.min(...Z.map((z) => z.y))
                }, ne = y.nodes.filter(
                  (z) => !y.selectedNodes.has(z.id) && z.id !== R && z.hidden !== !0 && z.filtered !== !0
                ).map(ie), H = Kh(Y, ne, G);
                if (V && (H.snapOffset.x !== 0 || H.snapOffset.y !== 0) && ($.position.x += H.snapOffset.x, $.position.y += H.snapOffset.y, c))
                  for (const [z] of c) {
                    const ae = y.getNode(z);
                    ae && (ae.position.x += H.snapOffset.x, ae.position.y += H.snapOffset.y);
                  }
                if (f?.remove(), H.horizontal.length > 0 || H.vertical.length > 0) {
                  const z = te?.querySelector(".flow-viewport");
                  if (z) {
                    const ae = y.nodes.map(ie);
                    f = sp(H.horizontal, H.vertical, ae), z.appendChild(f);
                  }
                } else
                  f = null;
                y._emit("helper-lines-change", {
                  horizontal: H.horizontal,
                  vertical: H.vertical
                });
              }
            }
            if (y._config?.preventOverlap) {
              const ee = typeof y._config.preventOverlap == "number" ? y._config.preventOverlap : 5, V = $.dimensions?.width ?? we, G = $.dimensions?.height ?? ve, ie = y.selectedNodes, F = y.nodes.filter((Y) => Y.id !== $.id && !Y.hidden && !ie.has(Y.id)).map((Y) => $t(Y, y._config?.nodeOrigin)), Z = bf($.position, V, G, F, ee);
              $.position.x = Z.x, $.position.y = Z.y;
            }
            if (!$.parentId) {
              const ee = rt($.id, y.nodes), V = y.nodes.filter(
                (Y) => Y.id !== $.id && Y.droppable && !Y.hidden && !ee.has(Y.id) && (!Y.acceptsDrop || Y.acceptsDrop($))
              ), G = $t($, y._config?.nodeOrigin);
              let ie = null;
              const F = 12;
              for (const Y of V) {
                const ne = Y.parentId ? y.getAbsolutePosition(Y.id) : Y.position, H = Y.dimensions?.width ?? we, z = Y.dimensions?.height ?? ve, ae = G.x + G.width / 2, re = G.y + G.height / 2, fe = Y.id === p ? 0 : F;
                ae >= ne.x + fe && ae <= ne.x + H - fe && re >= ne.y + fe && re <= ne.y + z - fe && (ie = Y);
              }
              const Z = ie?.id ?? null;
              Z !== p && (p && te && te.querySelector(`[data-flow-node-id="${CSS.escape(p)}"]`)?.classList.remove("flow-node-drop-target"), Z && te && te.querySelector(`[data-flow-node-id="${CSS.escape(Z)}"]`)?.classList.add("flow-node-drop-target"), p = Z);
            }
            if (y._config?.proximityConnect) {
              const ee = y._config.proximityConnectDistance ?? 150, V = $.dimensions ?? { width: 150, height: 50 }, G = {
                x: $.position.x + V.width / 2,
                y: $.position.y + V.height / 2
              }, ie = y.nodes.filter((Z) => Z.id !== $.id && !Z.hidden).map((Z) => ({
                id: Z.id,
                center: {
                  x: Z.position.x + (Z.dimensions?.width ?? 150) / 2,
                  y: Z.position.y + (Z.dimensions?.height ?? 50) / 2
                }
              })), F = Qh($.id, G, ie, ee);
              if (F)
                if (y.edges.some(
                  (Y) => Y.source === F.source && Y.target === F.target || Y.source === F.target && Y.target === F.source
                ))
                  u?.destroy(), u = null, h = null;
                else {
                  if (h = F, !u) {
                    u = kt({
                      connectionLineType: y._config?.connectionLineType,
                      connectionLineStyle: y._config?.connectionLineStyle,
                      connectionLine: y._config?.connectionLine
                    });
                    const Y = te?.querySelector(".flow-viewport");
                    Y && Y.appendChild(u.svg);
                  }
                  u.update({
                    fromX: G.x,
                    fromY: G.y,
                    toX: F.targetCenter.x,
                    toY: F.targetCenter.y,
                    source: F.source
                  });
                }
              else
                u?.destroy(), u = null, h = null;
            }
            const j = y._container ? Ae.get(y._container) : void 0;
            if (j?.bridge) {
              if (j.bridge.pushLocalNodeUpdate(R, { position: $.position }), c)
                for (const [ee] of c) {
                  const V = y.getNode(ee);
                  V && j.bridge.pushLocalNodeUpdate(ee, { position: V.position });
                }
              if (j.awareness && W instanceof MouseEvent && y._container) {
                const ee = y._container.getBoundingClientRect(), V = (W.clientX - ee.left - y.viewport.x) / y.viewport.zoom, G = (W.clientY - ee.top - y.viewport.y) / y.viewport.zoom;
                j.awareness.updateCursor({ x: V, y: G });
              }
            }
            d && W instanceof MouseEvent && d.updatePointer(W.clientX, W.clientY);
          },
          onDragEnd({ nodeId: R, position: Q }) {
            B("drag", `Node "${R}" drag end`, Q);
            const X = y._container ? Ae.get(y._container) : void 0;
            X?.bridge && X.bridge.setDragging(R, !1), d?.stop(), d = null, f?.remove(), f = null, y._config?.helperLines && y._emit("helper-lines-change", { horizontal: [], vertical: [] });
            const W = y.getNode(R);
            if (W && y._emit("node-drag-end", { node: W, position: Q }), g && W?.parentId) {
              e.classList.remove("flow-reorder-dragging");
              const $ = m;
              g = !1, w = -1, m = null, y._layoutAnimFrame && (cancelAnimationFrame(y._layoutAnimFrame), y._layoutAnimFrame = 0), e.closest(".flow-container")?.classList.remove("flow-layout-animating"), p ? (te && te.querySelector(`[data-flow-node-id="${CSS.escape(p)}"]`)?.classList.remove("flow-node-drop-target"), y.reparentNode(R, p), p = null) : $ && $ !== W.parentId ? (y.layoutChildren($, { omitFromComputation: R, shallow: !0 }), y.propagateLayoutUp($, { omitFromComputation: R }), y.layoutChildren(W.parentId), y._emit("child-reorder", {
                nodeId: R,
                parentId: W.parentId,
                order: W.order
              })) : (y.layoutChildren(W.parentId), y._emit("child-reorder", {
                nodeId: R,
                parentId: W.parentId,
                order: W.order
              })), c = null, l = !1;
              return;
            }
            if (W && p)
              te && te.querySelector(`[data-flow-node-id="${CSS.escape(p)}"]`)?.classList.remove("flow-node-drop-target"), y.reparentNode(R, p), p = null;
            else if (W && W.parentId && !p) {
              const $ = Gt(
                y.getNode(W.parentId),
                y._config?.childValidationRules ?? {}
              ), j = y.getNode(W.parentId);
              if (!$?.preventChildEscape && !j?.childLayout && j?.dimensions) {
                const ee = W.position.x, V = W.position.y, G = W.dimensions?.width ?? 150, ie = W.dimensions?.height ?? 50;
                (ee + G < 0 || V + ie < 0 || ee > j.dimensions.width || V > j.dimensions.height) && y.reparentNode(R, null);
              }
              p = null;
            } else
              p && te && te.querySelector(`[data-flow-node-id="${CSS.escape(p)}"]`)?.classList.remove("flow-node-drop-target"), p = null;
            if (y._config?.proximityConnect && h) {
              const $ = h;
              u?.destroy(), u = null, h = null;
              let j = !0;
              if (y._config.onProximityConnect && y._config.onProximityConnect({
                source: $.source,
                target: $.target,
                distance: $.distance
              }) === !1 && (j = !1), j) {
                const ee = {
                  source: $.source,
                  sourceHandle: "source",
                  target: $.target,
                  targetHandle: "target"
                };
                if (je(ee, y.edges, { preventCycles: y._config?.preventCycles })) {
                  const V = te ? Ve(te, ee, y.edges) : !0, G = te ? Oe(te, ee) : !0, ie = !y._config.isValidConnection || y._config.isValidConnection(ee);
                  if (V && G && ie) {
                    if (y._config.proximityConnectConfirm) {
                      const Z = te?.querySelector(`[data-flow-node-id="${CSS.escape($.source)}"]`), Y = te?.querySelector(`[data-flow-node-id="${CSS.escape($.target)}"]`);
                      Z?.classList.add("flow-proximity-confirm"), Y?.classList.add("flow-proximity-confirm"), setTimeout(() => {
                        Z?.classList.remove("flow-proximity-confirm"), Y?.classList.remove("flow-proximity-confirm");
                      }, 400);
                    }
                    const F = `e-${$.source}-${$.target}-${Date.now()}-${np++}`;
                    y.addEdges({ id: F, ...ee }), y._emit("connect", { connection: ee });
                  }
                }
              }
            } else
              u?.destroy(), u = null, h = null;
            c = null, l = !1;
          }
        }));
      });
      {
        const x = t.$data(e.closest("[x-data]"));
        if (x?._config?.easyConnect) {
          const y = x._config.easyConnectKey ?? "alt", q = (_) => {
            if (!op(_, y) || _.target.closest("[data-flow-handle-type]")) return;
            const L = t.$data(e.closest("[x-data]"));
            if (!L || L._animationLocked) return;
            const A = o(n);
            if (!A) return;
            const O = L.getNode(A.id);
            if (!O || O.connectable === !1) return;
            _.preventDefault(), _.stopPropagation(), _.stopImmediatePropagation();
            const S = ip(e, _.clientX, _.clientY), k = S?.dataset.flowHandleId ?? "source";
            e.classList.add("flow-easy-connecting");
            const N = e.closest(".flow-container");
            if (!N) return;
            const U = L.viewport?.zoom || 1, J = L.viewport?.x || 0, oe = L.viewport?.y || 0, K = N.getBoundingClientRect();
            let se, le;
            if (S) {
              const j = S.getBoundingClientRect();
              se = (j.left + j.width / 2 - K.left - J) / U, le = (j.top + j.height / 2 - K.top - oe) / U;
            } else {
              const j = e.getBoundingClientRect();
              se = (j.left + j.width / 2 - K.left - J) / U, le = (j.top + j.height / 2 - K.top - oe) / U;
            }
            L._emit("connect-start", { source: A.id, sourceHandle: k });
            const ce = kt({
              connectionLineType: L._config?.connectionLineType,
              connectionLineStyle: L._config?.connectionLineStyle,
              connectionLine: L._config?.connectionLine
            }), te = N.querySelector(".flow-viewport");
            te && te.appendChild(ce.svg), ce.update({ fromX: se, fromY: le, toX: se, toY: le, source: A.id, sourceHandle: k }), L.pendingConnection = { source: A.id, sourceHandle: k, position: { x: se, y: le } }, Zt(N, A.id, k, L);
            let R = Yn(N, L, _.clientX, _.clientY), Q = null;
            const X = L._config?.connectionSnapRadius ?? 20, W = (j) => {
              const ee = L.screenToFlowPosition(j.clientX, j.clientY), V = Ut({
                containerEl: N,
                handleType: "target",
                excludeNodeId: A.id,
                cursorFlowPos: ee,
                connectionSnapRadius: X,
                getNode: (G) => L.getNode(G),
                toFlowPosition: (G, ie) => L.screenToFlowPosition(G, ie)
              });
              V.element !== Q && (Q?.classList.remove("flow-handle-active"), V.element?.classList.add("flow-handle-active"), Q = V.element), ce.update({ fromX: se, fromY: le, toX: V.position.x, toY: V.position.y, source: A.id, sourceHandle: k }), L.pendingConnection = { ...L.pendingConnection, position: V.position }, R?.updatePointer(j.clientX, j.clientY);
            }, $ = (j) => {
              R?.stop(), R = null, document.removeEventListener("pointermove", W), document.removeEventListener("pointerup", $), ce.destroy(), Q?.classList.remove("flow-handle-active"), Pe(N), e.classList.remove("flow-easy-connecting");
              const ee = L.screenToFlowPosition(j.clientX, j.clientY), V = { source: A.id, sourceHandle: k, position: ee };
              let G = Q;
              if (G || (G = document.elementFromPoint(j.clientX, j.clientY)?.closest('[data-flow-handle-type="target"]')), G) {
                const F = G.closest("[x-flow-node]")?.dataset.flowNodeId, Z = G.dataset.flowHandleId ?? "target";
                if (F) {
                  const Y = { source: A.id, sourceHandle: k, target: F, targetHandle: Z };
                  if (je(Y, L.edges, { preventCycles: L._config.preventCycles }))
                    if (Ve(N, Y, L.edges) && Oe(N, Y) && (!L._config?.isValidConnection || L._config.isValidConnection(Y))) {
                      const ne = `e-${A.id}-${F}-${Date.now()}-${tp++}`;
                      L.addEdges({ id: ne, ...Y }), L._emit("connect", { connection: Y }), L._emit("connect-end", { connection: Y, ...V });
                    } else
                      L._emit("connect-end", { connection: null, ...V });
                  else
                    L._emit("connect-end", { connection: null, ...V });
                } else
                  L._emit("connect-end", { connection: null, ...V });
              } else
                L._emit("connect-end", { connection: null, ...V });
              L.pendingConnection = null;
            };
            document.addEventListener("pointermove", W), document.addEventListener("pointerup", $);
          };
          e.addEventListener("pointerdown", q, { capture: !0 }), r(() => {
            e.removeEventListener("pointerdown", q, { capture: !0 });
          });
        }
      }
      const T = (x) => {
        if (x.key !== "Enter" && x.key !== " ") return;
        x.preventDefault();
        const y = o(n);
        if (!y) return;
        const q = t.$data(e.closest("[x-data]"));
        q && (q._animationLocked || Io(y) && (q._emit("node-click", { node: y, event: x }), x.stopPropagation(), st(x, q._shortcuts?.multiSelect) ? q.selectedNodes.has(y.id) ? (q.selectedNodes.delete(y.id), y.selected = !1) : (q.selectedNodes.add(y.id), y.selected = !0) : (q.deselectAll(), q.selectedNodes.add(y.id), y.selected = !0), q._emitSelectionChange()));
      };
      e.addEventListener("keydown", T);
      const v = () => {
        const x = t.$data(e.closest("[x-data]"));
        if (!x?._config?.autoPanOnNodeFocus) return;
        const y = o(n);
        if (!y) return;
        const q = y.parentId ? x.getAbsolutePosition(y.id) : y.position;
        x.setCenter(
          q.x + (y.dimensions?.width ?? 150) / 2,
          q.y + (y.dimensions?.height ?? 40) / 2
        );
      };
      e.addEventListener("focus", v);
      const P = (x) => {
        if (l) return;
        const y = o(n);
        if (!y) return;
        const q = t.$data(e.closest("[x-data]"));
        if (q && !q._animationLocked && (q._emit("node-click", { node: y, event: x }), !!Io(y))) {
          if (x.stopPropagation(), a) {
            a = !1;
            return;
          }
          st(x, q._shortcuts?.multiSelect) ? q.selectedNodes.has(y.id) ? (q.selectedNodes.delete(y.id), y.selected = !1, e.classList.remove("flow-node-selected"), B("selection", `Node "${y.id}" deselected (shift)`)) : (q.selectedNodes.add(y.id), y.selected = !0, e.classList.add("flow-node-selected"), B("selection", `Node "${y.id}" selected (shift)`)) : (q.deselectAll(), q.selectedNodes.add(y.id), y.selected = !0, e.classList.add("flow-node-selected"), B("selection", `Node "${y.id}" selected`)), q._emitSelectionChange();
        }
      };
      e.addEventListener("click", P);
      const I = (x) => {
        x.preventDefault(), x.stopPropagation();
        const y = o(n);
        if (!y) return;
        const q = t.$data(e.closest("[x-data]"));
        if (q)
          if (q.selectedNodes.size > 1 && q.selectedNodes.has(y.id)) {
            const _ = q.nodes.filter((L) => q.selectedNodes.has(L.id));
            q._emit("selection-context-menu", { nodes: _, event: x });
          } else
            q._emit("node-context-menu", { node: y, event: x });
      };
      e.addEventListener("contextmenu", I), requestAnimationFrame(() => {
        const x = o(n);
        if (!x) return;
        const y = t.$data(e.closest("[x-data]"));
        x.dimensions = {
          width: e.offsetWidth,
          height: e.offsetHeight
        }, B("init", `Node "${x.id}" measured`, x.dimensions), y?._nodeElements?.set(x.id, e);
      }), r(() => {
        s?.destroy(), f?.remove(), f = null, u?.destroy(), u = null, e.removeEventListener("keydown", T), e.removeEventListener("focus", v), e.removeEventListener("click", P), e.removeEventListener("contextmenu", I);
        const x = e.dataset.flowNodeId;
        x && t.$data(e.closest("[x-data]"))?._nodeElements?.delete(x);
      });
    }
  );
}
const vt = {
  minWidth: 30,
  minHeight: 30,
  maxWidth: 1 / 0,
  maxHeight: 1 / 0
};
function ap(t, e, n, o, i, r) {
  const { minWidth: s, minHeight: l, maxWidth: a, maxHeight: c } = i, d = t.includes("left"), f = t.includes("right"), u = t.includes("top"), h = t.includes("bottom");
  let p = o.width;
  f ? p = o.width + e.x : d && (p = o.width - e.x);
  let g = o.height;
  h ? g = o.height + e.y : u && (g = o.height - e.y), p = Math.max(s, Math.min(a, p)), g = Math.max(l, Math.min(c, g)), r && (p = r[0] * Math.round(p / r[0]), g = r[1] * Math.round(g / r[1]), p = Math.max(s, Math.min(a, p)), g = Math.max(l, Math.min(c, g)));
  const w = p - o.width, m = g - o.height, E = d ? n.x - w : n.x, C = u ? n.y - m : n.y;
  return {
    position: { x: E, y: C },
    dimensions: { width: p, height: g }
  };
}
const Dr = ["top-left", "top-right", "bottom-left", "bottom-right"], Rr = ["top", "right", "bottom", "left"], lp = [...Dr, ...Rr], cp = {
  "top-left": "nwse-resize",
  "top-right": "nesw-resize",
  "bottom-left": "nesw-resize",
  "bottom-right": "nwse-resize",
  top: "ns-resize",
  bottom: "ns-resize",
  left: "ew-resize",
  right: "ew-resize"
};
function dp(t) {
  t.directive(
    "flow-resizer",
    (e, { expression: n, modifiers: o }, { evaluate: i, effect: r, cleanup: s }) => {
      const l = up(o);
      let a = { ...vt };
      if (n)
        try {
          const d = i(n);
          a = { ...vt, ...d };
        } catch {
        }
      const c = [];
      for (const d of l) {
        const f = document.createElement("div");
        f.className = `flow-resizer-handle flow-resizer-handle-${d}`, f.style.cursor = cp[d], f.dataset.flowResizeDirection = d, e.appendChild(f), c.push(f), f.addEventListener("pointerdown", (u) => {
          u.preventDefault(), u.stopPropagation();
          const h = e.closest("[x-flow-node]");
          if (!h) return;
          const p = e.closest("[x-data]");
          if (!p) return;
          const g = t.$data(p), w = h.dataset.flowNodeId;
          if (!w || !g) return;
          const m = g.getNode(w);
          if (!m || !Yi(m)) return;
          const E = { ...a };
          if (m.minDimensions?.width != null && a.minWidth === vt.minWidth && (E.minWidth = m.minDimensions.width), m.minDimensions?.height != null && a.minHeight === vt.minHeight && (E.minHeight = m.minDimensions.height), m.maxDimensions?.width != null && a.maxWidth === vt.maxWidth && (E.maxWidth = m.maxDimensions.width), m.maxDimensions?.height != null && a.maxHeight === vt.maxHeight && (E.maxHeight = m.maxDimensions.height), !m.dimensions) {
            const I = g.viewport?.zoom || 1, x = h.getBoundingClientRect();
            m.dimensions = { width: x.width / I, height: x.height / I };
          }
          const C = { x: m.position.x, y: m.position.y }, b = { width: m.dimensions.width, height: m.dimensions.height }, D = g.viewport?.zoom || 1, M = u.clientX, T = u.clientY;
          g._captureHistory?.(), B("resize", `Resize start on "${w}" (${d})`, b), g._emit("node-resize-start", { node: m, dimensions: { ...b } });
          const v = (I) => {
            const x = {
              x: (I.clientX - M) / D,
              y: (I.clientY - T) / D
            }, y = ap(
              d,
              x,
              C,
              b,
              E,
              g._config?.snapToGrid ?? !1
            );
            if (m.position.x = y.position.x, m.position.y = y.position.y, m.dimensions.width = y.dimensions.width, m.dimensions.height = y.dimensions.height, m.parentId) {
              const q = g.getAbsolutePosition(m.id);
              h.style.left = `${q.x}px`, h.style.top = `${q.y}px`;
            } else
              h.style.left = `${y.position.x}px`, h.style.top = `${y.position.y}px`;
            h.style.width = `${y.dimensions.width}px`, h.style.height = `${y.dimensions.height}px`, g._emit("node-resize", { node: m, dimensions: { ...y.dimensions } });
          }, P = () => {
            document.removeEventListener("pointermove", v), document.removeEventListener("pointerup", P), document.removeEventListener("pointercancel", P), B("resize", `Resize end on "${w}"`, m.dimensions), g._emit("node-resize-end", { node: m, dimensions: { ...m.dimensions } });
          };
          document.addEventListener("pointermove", v), document.addEventListener("pointerup", P), document.addEventListener("pointercancel", P);
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
        const g = !Yi(p);
        for (const w of c)
          w.style.display = g ? "none" : "";
      }), s(() => {
        for (const d of c)
          d.remove();
      });
    }
  );
}
function up(t) {
  if (t.includes("corners"))
    return Dr;
  if (t.includes("edges"))
    return Rr;
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
  return lp;
}
function fp(t, e, n, o) {
  return (Math.atan2(t - n, -(e - o)) * 180 / Math.PI % 360 + 360) % 360;
}
function hp(t, e) {
  return (Math.round(t / e) * e % 360 + 360) % 360;
}
function pp(t) {
  t.directive(
    "flow-rotate",
    (e, { expression: n, modifiers: o }, { evaluate: i, effect: r, cleanup: s }) => {
      const l = o.includes("snap"), a = l && n && Number(i(n)) || 15;
      e.classList.add("flow-rotate-handle"), e.style.cursor = "grab";
      const c = (d) => {
        d.preventDefault(), d.stopPropagation();
        const f = e.closest("[x-flow-node]");
        if (!f) return;
        const u = e.closest("[data-flow-canvas]");
        if (!u) return;
        const h = t.$data(u), p = f.dataset.flowNodeId;
        if (!p || !h) return;
        const g = h.getNode(p);
        if (!g) return;
        const w = f.getBoundingClientRect(), m = w.left + w.width / 2, E = w.top + w.height / 2;
        h._captureHistory(), e.style.cursor = "grabbing";
        const C = (D) => {
          let M = fp(
            D.clientX,
            D.clientY,
            m,
            E
          );
          l && (M = hp(M, a)), g.rotation = M;
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
function gp(t) {
  t.directive(
    "flow-drag-handle",
    (e) => {
      e.setAttribute("data-flow-drag-handle", ""), e.classList.add("flow-drag-handle");
      const n = e.closest("[x-flow-node]");
      n && n.classList.add("flow-node-has-handle");
    }
  );
}
const mp = "application/alpineflow";
function yp(t) {
  t.directive(
    "flow-draggable",
    (e, { expression: n }, { evaluate: o }) => {
      e.setAttribute("draggable", "true"), e.style.cursor = "grab", e.addEventListener("dragstart", (i) => {
        if (!i.dataTransfer) return;
        const r = o(n), s = typeof r == "string" ? r : JSON.stringify(r);
        i.dataTransfer.setData(mp, s), i.dataTransfer.effectAllowed = "move";
      });
    }
  );
}
function wp(t) {
  t.directive(
    "flow-viewport",
    (e, {}, { effect: n, cleanup: o }) => {
      e.classList.add("flow-viewport");
      const i = t.$data(e.closest("[x-data]"));
      if (!i?.edges) return;
      i._viewportEl = e;
      const r = i.viewport;
      r && (e.style.transform = `translate(${r.x}px, ${r.y}px) scale(${r.zoom})`);
      const s = document.createElement("div");
      s.classList.add("flow-edges"), e.insertBefore(s, e.firstChild);
      const l = /* @__PURE__ */ new Map();
      n(() => {
        const a = i.edges, c = new Set(a.map((u) => u.id));
        for (const [u, h] of l)
          c.has(u) || (t.destroyTree(h), h.remove(), l.delete(u), i._edgeSvgElements?.delete(u));
        for (const u of a) {
          if (l.has(u.id)) continue;
          const h = document.createElementNS("http://www.w3.org/2000/svg", "svg");
          h.setAttribute("class", "flow-edge-svg");
          const p = document.createElementNS("http://www.w3.org/2000/svg", "g");
          h.appendChild(p), t.addScopeToNode(p, { edge: u }), p.setAttribute("x-flow-edge", "edge"), t.mutateDom(() => {
            s.appendChild(h);
          }), l.set(u.id, h), i._edgeSvgElements?.set(u.id, h), t.initTree(p);
        }
        const f = (e.closest("[data-flow-canvas]") ?? e).querySelector(".flow-edges-static");
        f && f.remove();
        for (const u of a) {
          const h = l.get(u.id);
          if (!h) continue;
          const p = i.getNode?.(u.source), g = i.getNode?.(u.target), w = u.hidden || p?.hidden || g?.hidden;
          h.style.display = w ? "none" : "";
        }
        for (const u of a) {
          const h = l.get(u.id);
          if (!h) continue;
          const p = i.getNode?.(u.source), g = i.getNode?.(u.target);
          p?.filtered || g?.filtered ? h.classList.add("flow-edge-filtered") : h.classList.remove("flow-edge-filtered");
        }
      }), o(() => {
        for (const [a, c] of l)
          t.destroyTree(c), c.remove(), i._edgeSvgElements?.delete(a);
        l.clear(), s.remove();
      });
    }
  );
}
const vp = [
  "top",
  "bottom",
  "left",
  "right",
  "top-left",
  "top-right",
  "bottom-left",
  "bottom-right"
], _p = "a, button, input, textarea, select, [contenteditable]", bp = 100, xp = 60, Ep = /* @__PURE__ */ new Set(["top", "top-left", "top-right"]), Sp = /* @__PURE__ */ new Set(["bottom", "bottom-left", "bottom-right"]), Cp = /* @__PURE__ */ new Set(["left", "top-left", "bottom-left"]), Pp = /* @__PURE__ */ new Set(["right", "top-right", "bottom-right"]);
function kp(t, e) {
  const n = new Set(e), o = n.has("static"), i = n.has("no-resize") || n.has("noresize"), r = n.has("locked"), s = n.has("constrained");
  let l = n.has("fill-width") || n.has("fill"), a = n.has("fill-height") || n.has("fill");
  return { position: t && vp.includes(t) ? t : "top-right", isStatic: o, isFixed: r, noResize: i, constrained: s, fillWidth: l, fillHeight: a };
}
function _t(t, e, n) {
  t.dispatchEvent(new CustomEvent(`flow-${e}`, {
    bubbles: !0,
    detail: n
  }));
}
function Lp(t, e, n, o, i, r) {
  return {
    left: Math.max(0, Math.min(t, i - n)),
    top: Math.max(0, Math.min(e, r - o))
  };
}
function Mp(t, e, n, o) {
  t.style.transform = "none", t.style.borderRadius = "0", n && (t.style.left = "0", t.style.right = "0", t.style.width = "auto"), o && (t.style.top = "0", t.style.bottom = "0", t.style.height = "auto"), n && !o && (Ep.has(e) && (t.style.top = "0"), Sp.has(e) && (t.style.bottom = "0")), o && !n && (Cp.has(e) && (t.style.left = "0"), Pp.has(e) && (t.style.right = "0"));
}
function Tp(t) {
  t.directive(
    "flow-panel",
    (e, { value: n, modifiers: o }, { cleanup: i }) => {
      const {
        position: r,
        isStatic: s,
        isFixed: l,
        noResize: a,
        constrained: c,
        fillWidth: d,
        fillHeight: f
      } = kp(n, o), u = d || f, h = !s && !l && !u, p = !s && !a && !u;
      e.classList.add("flow-panel", `flow-panel-${r}`), s && e.classList.add("flow-panel-static"), (l || u) && e.classList.add("flow-panel-locked"), (a || u) && e.classList.add("flow-panel-no-resize"), d && e.classList.add("flow-panel-fill-width"), f && e.classList.add("flow-panel-fill-height"), u && Mp(e, r, d, f);
      const g = (D) => D.stopPropagation();
      e.addEventListener("mousedown", g), e.addEventListener("pointerdown", g), e.addEventListener("wheel", g);
      const w = e.parentElement, m = {
        left: e.style.left,
        top: e.style.top,
        right: e.style.right,
        bottom: e.style.bottom,
        transform: e.style.transform,
        width: e.style.width,
        height: e.style.height,
        borderRadius: e.style.borderRadius
      }, E = `flow-panel-${r}`, C = () => {
        e.style.left = m.left, e.style.top = m.top, e.style.right = m.right, e.style.bottom = m.bottom, e.style.transform = m.transform, e.style.width = m.width, e.style.height = m.height, e.style.borderRadius = m.borderRadius, e.classList.contains(E) || e.classList.add(E);
      };
      w.addEventListener("flow-panel-reset", C), w.__flowPanels || (w.__flowPanels = /* @__PURE__ */ new Set()), w.__flowPanels.add(e);
      let b = null;
      if (h) {
        let D = !1, M = 0, T = 0, v = 0, P = 0;
        const I = () => {
          const _ = e.getBoundingClientRect(), L = w.getBoundingClientRect();
          return {
            x: _.left - L.left,
            y: _.top - L.top
          };
        }, x = (_) => {
          if (!D) return;
          let L = v + (_.clientX - M), A = P + (_.clientY - T);
          if (c) {
            const O = Lp(
              L,
              A,
              e.offsetWidth,
              e.offsetHeight,
              w.clientWidth,
              w.clientHeight
            );
            L = O.left, A = O.top;
          }
          e.style.left = `${L}px`, e.style.top = `${A}px`, _t(w, "panel-drag", {
            panel: e,
            position: { x: L, y: A }
          });
        }, y = () => {
          if (!D) return;
          D = !1, document.removeEventListener("pointermove", x), document.removeEventListener("pointerup", y), document.removeEventListener("pointercancel", y);
          const _ = I();
          _t(w, "panel-drag-end", {
            panel: e,
            position: _
          });
        }, q = (_) => {
          const L = _.target;
          if (L.closest(_p) || L.closest(".flow-panel-resize-handle"))
            return;
          D = !0, M = _.clientX, T = _.clientY;
          const A = e.getBoundingClientRect(), O = w.getBoundingClientRect();
          v = A.left - O.left, P = A.top - O.top, e.style.bottom = "auto", e.style.right = "auto", e.style.transform = "none", e.style.left = `${v}px`, e.style.top = `${P}px`, document.addEventListener("pointermove", x), document.addEventListener("pointerup", y), document.addEventListener("pointercancel", y), _t(w, "panel-drag-start", {
            panel: e,
            position: { x: v, y: P }
          });
        };
        if (e.addEventListener("pointerdown", q), p) {
          b = document.createElement("div"), b.classList.add("flow-panel-resize-handle"), e.appendChild(b);
          let _ = !1, L = 0, A = 0, O = 0, S = 0;
          const k = (J) => {
            if (!_) return;
            const oe = Math.max(bp, O + (J.clientX - L)), K = Math.max(xp, S + (J.clientY - A));
            e.style.width = `${oe}px`, e.style.height = `${K}px`, _t(w, "panel-resize", {
              panel: e,
              dimensions: { width: oe, height: K }
            });
          }, N = () => {
            _ && (_ = !1, document.removeEventListener("pointermove", k), document.removeEventListener("pointerup", N), document.removeEventListener("pointercancel", N), _t(w, "panel-resize-end", {
              panel: e,
              dimensions: { width: e.offsetWidth, height: e.offsetHeight }
            }));
          }, U = (J) => {
            J.stopPropagation(), _ = !0, L = J.clientX, A = J.clientY, O = e.offsetWidth, S = e.offsetHeight, document.addEventListener("pointermove", k), document.addEventListener("pointerup", N), document.addEventListener("pointercancel", N), _t(w, "panel-resize-start", {
              panel: e,
              dimensions: { width: O, height: S }
            });
          };
          b.addEventListener("pointerdown", U), i(() => {
            e.removeEventListener("pointerdown", q), b?.removeEventListener("pointerdown", U), document.removeEventListener("pointermove", x), document.removeEventListener("pointerup", y), document.removeEventListener("pointercancel", y), document.removeEventListener("pointermove", k), document.removeEventListener("pointerup", N), document.removeEventListener("pointercancel", N), b?.remove(), e.removeEventListener("mousedown", g), e.removeEventListener("pointerdown", g), e.removeEventListener("wheel", g), w.removeEventListener("flow-panel-reset", C), w.__flowPanels?.delete(e);
          });
        } else
          i(() => {
            e.removeEventListener("pointerdown", q), document.removeEventListener("pointermove", x), document.removeEventListener("pointerup", y), document.removeEventListener("pointercancel", y), e.removeEventListener("mousedown", g), e.removeEventListener("pointerdown", g), e.removeEventListener("wheel", g), w.removeEventListener("flow-panel-reset", C), w.__flowPanels?.delete(e);
          });
      } else
        i(() => {
          e.removeEventListener("mousedown", g), e.removeEventListener("pointerdown", g), e.removeEventListener("wheel", g), w.removeEventListener("flow-panel-reset", C), w.__flowPanels?.delete(e);
        });
    }
  );
}
function Ap(t) {
  t.directive(
    "flow-node-toolbar",
    (e, { value: n, modifiers: o }, { effect: i, cleanup: r }) => {
      const s = Np(n), l = Ip(o);
      e.classList.add("flow-node-toolbar"), e.style.position = "absolute";
      const a = (d) => {
        d.stopPropagation();
      }, c = (d) => {
        d.stopPropagation();
      };
      e.addEventListener("pointerdown", a), e.addEventListener("click", c), i(() => {
        const d = e.closest("[x-flow-node]");
        if (!d) return;
        const f = e.closest("[x-data]");
        if (!f) return;
        const u = t.$data(f);
        if (!u?.viewport) return;
        const h = u.viewport.zoom || 1, p = parseInt(e.getAttribute("data-flow-offset") ?? "10", 10), g = d.dataset.flowNodeId, w = g ? u.getNode(g) : null, m = w?.dimensions?.width ?? d.offsetWidth, E = w?.dimensions?.height ?? d.offsetHeight, C = p / h;
        let b, D, M, T;
        s === "top" || s === "bottom" ? (D = s === "top" ? -C : E + C, T = s === "top" ? "-100%" : "0%", l === "start" ? (b = 0, M = "0%") : l === "end" ? (b = m, M = "-100%") : (b = m / 2, M = "-50%")) : (b = s === "left" ? -C : m + C, M = s === "left" ? "-100%" : "0%", l === "start" ? (D = 0, T = "0%") : l === "end" ? (D = E, T = "-100%") : (D = E / 2, T = "-50%")), e.style.left = `${b}px`, e.style.top = `${D}px`, e.style.transformOrigin = "0 0", e.style.transform = `scale(${1 / h}) translate(${M}, ${T})`;
      }), r(() => {
        e.removeEventListener("pointerdown", a), e.removeEventListener("click", c), e.classList.remove("flow-node-toolbar");
      });
    }
  );
}
function Np(t) {
  return t === "bottom" ? "bottom" : t === "left" ? "left" : t === "right" ? "right" : "top";
}
function Ip(t) {
  return t.includes("start") ? "start" : t.includes("end") ? "end" : "center";
}
function $p(t) {
  t.directive(
    "flow-context-menu",
    (e, { modifiers: n, expression: o }, { effect: i, evaluate: r, cleanup: s }) => {
      const l = n[0];
      if (!l) {
        console.warn("[AlpineFlow] x-flow-context-menu requires a type modifier: .node, .edge, .pane, or .selection");
        return;
      }
      const a = e, c = a.closest("[x-data]");
      if (!c) return;
      const d = t.$data(c);
      let f = 0, u = 0;
      if (o) {
        const M = r(o);
        f = M?.offsetX ?? 0, u = M?.offsetY ?? 0;
      }
      a.setAttribute("role", "menu"), a.setAttribute("tabindex", "-1"), a.style.display = "none";
      const h = document.createElement("div");
      h.style.cssText = "position:fixed;inset:0;z-index:4999;display:none;", c.appendChild(h);
      let p = null;
      const g = 4, w = () => {
        p = document.activeElement;
        const M = d.contextMenu.x + f, T = d.contextMenu.y + u;
        a.style.display = "", a.style.position = "fixed", a.style.left = M + "px", a.style.top = T + "px", a.style.zIndex = "5000", a.querySelectorAll(':scope > button, :scope > [role="menuitem"]').forEach((q) => {
          q.setAttribute("role", "menuitem"), q.hasAttribute("tabindex") || q.setAttribute("tabindex", "-1");
        });
        const v = a.getBoundingClientRect(), P = window.innerWidth, I = window.innerHeight;
        let x = M, y = T;
        v.right > P - g && (x = P - v.width - g), v.bottom > I - g && (y = I - v.height - g), x < g && (x = g), y < g && (y = g), a.style.left = x + "px", a.style.top = y + "px", h.style.display = "", a.focus();
      }, m = () => {
        a.style.display = "none", h.style.display = "none", p && document.contains(p) && (p.focus(), p = null);
      };
      i(() => {
        const M = d.contextMenu;
        M.show && M.type === l ? w() : m();
      }), h.addEventListener("click", () => d.closeContextMenu()), h.addEventListener("contextmenu", (M) => {
        M.preventDefault(), d.closeContextMenu();
      });
      const E = () => {
        d.contextMenu.show && d.contextMenu.type === l && d.closeContextMenu();
      };
      window.addEventListener("scroll", E, !0);
      const C = () => Array.from(a.querySelectorAll(
        ':scope > button:not([disabled]), :scope > [role="menuitem"]:not([disabled])'
      )), b = (M) => Array.from(M.querySelectorAll(
        "button:not([disabled])"
      )), D = (M) => {
        if (!d.contextMenu.show || d.contextMenu.type !== l || a.style.display === "none") return;
        const T = document.activeElement, v = T?.closest(".flow-context-submenu"), P = v ? b(v) : C();
        if (P.length === 0) return;
        const I = P.indexOf(T);
        switch (M.key) {
          case "ArrowDown": {
            M.preventDefault();
            const x = I < P.length - 1 ? I + 1 : 0;
            P[x].focus();
            break;
          }
          case "ArrowUp": {
            M.preventDefault();
            const x = I > 0 ? I - 1 : P.length - 1;
            P[x].focus();
            break;
          }
          case "Tab": {
            if (M.preventDefault(), M.shiftKey) {
              const x = I > 0 ? I - 1 : P.length - 1;
              P[x].focus();
            } else {
              const x = I < P.length - 1 ? I + 1 : 0;
              P[x].focus();
            }
            break;
          }
          case "Enter":
          case " ": {
            M.preventDefault(), T?.click();
            break;
          }
          case "ArrowRight": {
            if (!v) {
              const x = T?.querySelector(".flow-context-submenu");
              x && (M.preventDefault(), x.querySelector("button:not([disabled])")?.focus());
            }
            break;
          }
          case "ArrowLeft": {
            v && (M.preventDefault(), v.closest(".flow-context-submenu-trigger")?.focus());
            break;
          }
        }
      };
      a.addEventListener("keydown", D), s(() => {
        h.remove(), window.removeEventListener("scroll", E, !0), a.removeEventListener("keydown", D);
      });
    }
  );
}
const Dp = {
  mouseenter: "mouseleave",
  click: "click"
  // toggle behavior
};
function Rp(t) {
  t.directive(
    "flow-animate",
    (e, { value: n, modifiers: o, expression: i }, { evaluate: r, effect: s, cleanup: l }) => {
      const a = new Set(o), c = a.has("once"), d = a.has("reverse"), f = a.has("queue"), u = n || "";
      let h = "click";
      a.has("mouseenter") ? h = "mouseenter" : a.has("click") && (h = "click");
      let p = null, g = [], w = !1, m = !1, E = !1;
      function C() {
        const x = r(i);
        return Array.isArray(x) ? x : x && typeof x == "object" ? [x] : [];
      }
      function b() {
        const x = e.closest("[x-data]");
        return x ? t.$data(x) : null;
      }
      function D(x, y = !1) {
        const q = b();
        if (!q?.timeline) return Promise.resolve();
        const _ = q.timeline();
        if (y) {
          for (let L = x.length - 1; L >= 0; L--)
            _.step(x[L]);
          _.reverse();
        } else
          for (const L of x)
            L.parallel ? _.parallel(L.parallel) : _.step(L);
        return p = _, _.play().then(() => {
          p === _ && (p = null);
        });
      }
      function M(x = !1) {
        if (c && m) return;
        m = !0;
        const y = C();
        if (y.length === 0) return;
        const q = () => D(y, x);
        f ? (g.push(q), T()) : (p?.stop(), p = null, g = [], w = !1, q());
      }
      async function T() {
        if (!w) {
          for (w = !0; g.length > 0; )
            await g.shift()();
          w = !1;
        }
      }
      if (u) {
        s(() => {
          const x = C(), y = b();
          y?.registerAnimation && y.registerAnimation(u, x);
        }), l(() => {
          const x = b();
          x?.unregisterAnimation && x.unregisterAnimation(u);
        });
        return;
      }
      const v = () => {
        d && h === "click" ? (M(E), E = !E) : M(!1);
      };
      e.addEventListener(h, v);
      let P = null, I = null;
      d && h !== "click" && (I = Dp[h] ?? null, I && (P = () => M(!0), e.addEventListener(I, P))), l(() => {
        p?.stop(), e.removeEventListener(h, v), I && P && e.removeEventListener(I, P);
      });
    }
  );
}
function Hp(t, e, n, o, i) {
  const r = e.position?.x ?? t.position.x, s = e.position?.y ?? t.position.y, l = t.dimensions?.width ?? we, a = t.dimensions?.height ?? ve, c = r * n.zoom + n.x, d = s * n.zoom + n.y, f = (r + l) * n.zoom + n.x, u = (s + a) * n.zoom + n.y;
  return f > 0 && c < o && u > 0 && d < i;
}
function Fp(t, e, n, o, i) {
  const r = t.nodes;
  if (!r || r.length === 0) return !1;
  for (const s of r) {
    const l = e.getNode?.(s) ?? e.nodes?.find((a) => a.id === s);
    if (l && !Hp(l, t, n, o, i))
      return !0;
  }
  return !1;
}
function zp(t) {
  t.directive(
    "flow-timeline",
    (e, { expression: n }, { evaluate: o, effect: i, cleanup: r }) => {
      let s = 0, l = null, a = [], c = !1, d = "idle", f = 0;
      function u() {
        const w = e.closest("[x-data]");
        return w ? t.$data(w) : null;
      }
      function h(w, m) {
        const E = u();
        if (!E?.timeline) return Promise.resolve();
        const C = E.timeline(), b = m.speed ?? 1, D = m.autoFitView === !0, M = m.fitViewPadding ?? 0.1, T = E.viewport, v = E.getContainerDimensions?.();
        for (const P of w) {
          const I = b !== 1 ? {
            ...P,
            duration: P.duration !== void 0 ? P.duration / b : void 0,
            delay: P.delay !== void 0 ? P.delay / b : void 0
          } : P;
          if (I.parallel) {
            const x = I.parallel.map(
              (y) => b !== 1 ? {
                ...y,
                duration: y.duration !== void 0 ? y.duration / b : void 0,
                delay: y.delay !== void 0 ? y.delay / b : void 0
              } : y
            );
            C.parallel(x);
          } else if (D && T && v && Fp(I, E, T, v.width, v.height)) {
            const x = {
              fitView: !0,
              fitViewPadding: M,
              duration: I.duration,
              easing: I.easing
            };
            C.parallel([I, x]);
          } else
            C.step(I);
        }
        if (m.lock && C.lock(!0), m.loop !== void 0 && m.loop !== !1) {
          const P = m.loop === !0 ? 0 : m.loop;
          C.loop(P);
        }
        return m.respectReducedMotion !== void 0 && C.respectReducedMotion(m.respectReducedMotion), l = C, d = "playing", c = !0, C.play().then(() => {
          l === C && (l = null, d = "idle", c = !1);
        });
      }
      async function p(w) {
        if (a.length === 0) return;
        if ((w.overflow ?? "queue") === "latest" && c) {
          l?.stop(), l = null, c = !1, d = "idle";
          const E = [a[a.length - 1]];
          s += a.length, a = [], await h(E, w);
        } else {
          const E = [...a];
          s += E.length, a = [], c && await new Promise((b) => {
            l ? (l.on("complete", () => b()), l.on("stop", () => b())) : b();
          }), await h(E, w);
        }
      }
      const g = {
        async play() {
          const w = o(n), m = w.steps ?? [];
          s < m.length && (a = m.slice(s), await p(w));
        },
        stop() {
          l?.stop(), l = null, c = !1, d = "stopped", a = [];
        },
        reset(w) {
          if (l?.stop(), l = null, c = !1, d = "idle", s = 0, a = [], f = 0, w) {
            const m = o(n), E = m.steps ?? [];
            if (E.length > 0)
              return a = [...E], p(m);
          }
        },
        get state() {
          return d;
        }
      };
      e.__timeline = g, i(() => {
        const w = o(n);
        if (!w || !w.steps) return;
        const m = w.steps, E = w.autoplay !== !1;
        if (m.length > f) {
          const C = m.slice(Math.max(s, f));
          f = m.length, C.length > 0 && E && (a.push(...C), p(w));
        } else
          f = m.length;
      }), r(() => {
        l?.stop(), delete e.__timeline;
      });
    }
  );
}
function Op(t) {
  t.directive(
    "flow-collapse",
    (e, { expression: n, modifiers: o }, { evaluate: i, effect: r, cleanup: s }) => {
      const l = o.includes("all"), a = o.includes("expand"), c = o.includes("children"), d = o.includes("instant"), f = () => {
        const u = e.closest("[data-flow-canvas]");
        if (!u) return;
        const h = t.$data(u);
        if (!h) return;
        if (l) {
          for (const g of h.nodes)
            a ? h.expandNode?.(g.id, { animate: !d }) : h.collapseNode?.(g.id, { animate: !d });
          e.setAttribute("aria-expanded", String(a));
          return;
        }
        if (c && n) {
          const g = i(n);
          if (!g) return;
          for (const w of h.nodes)
            w.parentId === g && (a ? h.expandNode?.(w.id, { animate: !d }) : h.collapseNode?.(w.id, { animate: !d }));
          e.setAttribute("aria-expanded", String(a));
          return;
        }
        const p = i(n);
        !p || !h?.toggleNode || h.toggleNode(p, { animate: !d });
      };
      e.addEventListener("click", f), e.setAttribute("data-flow-collapse", ""), e.style.cursor = "pointer", !l && !c && r(() => {
        const u = i(n);
        if (!u) return;
        const h = e.closest("[data-flow-canvas]");
        if (!h) return;
        const p = t.$data(h);
        if (!p?.isCollapsed) return;
        const g = p.isCollapsed(u);
        e.setAttribute("aria-expanded", String(!g));
        const w = e.closest("[x-flow-node]");
        w && e.setAttribute("aria-controls", w.id || u);
      }), s(() => {
        e.removeEventListener("click", f);
      });
    }
  );
}
function Vp(t) {
  t.directive(
    "flow-condense",
    (e, { expression: n, modifiers: o }, { evaluate: i, effect: r, cleanup: s }) => {
      const l = () => {
        const a = i(n);
        if (!a) return;
        const c = e.closest("[x-data]");
        if (!c) return;
        const d = t.$data(c);
        d?.toggleCondense && d.toggleCondense(a);
      };
      e.addEventListener("click", l), e.setAttribute("data-flow-condense", ""), e.style.cursor = "pointer", r(() => {
        const a = i(n);
        if (!a) return;
        const c = e.closest("[x-data]");
        if (!c) return;
        const d = t.$data(c);
        if (!d?.isCondensed) return;
        const f = d.isCondensed(a);
        e.setAttribute("aria-expanded", String(!f));
      }), s(() => {
        e.removeEventListener("click", l);
      });
    }
  );
}
function Bp(t) {
  t.directive(
    "flow-row-select",
    (e, { expression: n }, { evaluate: o, effect: i, cleanup: r }) => {
      e.classList.add("nodrag"), e.style.cursor = "pointer", e.setAttribute("data-flow-row-select", "");
      const s = (l) => {
        l.stopPropagation();
        const a = o(n);
        if (!a) return;
        const c = e.closest("[x-data]");
        if (!c) return;
        const d = t.$data(c);
        d?.toggleRowSelect && (l.shiftKey ? d.toggleRowSelect(a) : (d.deselectAllRows(), d.selectRow(a)));
      };
      e.addEventListener("click", s), i(() => {
        const l = o(n);
        if (!l) return;
        const a = e.closest("[x-data]");
        if (!a) return;
        const c = t.$data(a);
        if (!c?.isRowSelected) return;
        const d = c.isRowSelected(l);
        e.classList.toggle("flow-row-selected", d), e.setAttribute("aria-selected", String(d));
      }), r(() => {
        e.removeEventListener("click", s);
      });
    }
  );
}
function Xp(t) {
  t.directive(
    "flow-detail",
    (e, { expression: n, modifiers: o }, { evaluate: i, effect: r, cleanup: s }) => {
      if (n) {
        const f = e.closest("[data-flow-canvas]");
        if (!f) return;
        const u = t.$data(f);
        if (!u?.viewport) return;
        const h = e.style.display;
        r(() => {
          const p = i(n), g = u.viewport.zoom, w = p.min === void 0 || g >= p.min, m = p.max === void 0 || g <= p.max;
          e.style.display = w && m ? h : "none";
        }), s(() => {
          e.style.display = h;
        });
        return;
      }
      const l = new Set(o.filter((f) => f === "far" || f === "medium" || f === "close"));
      if (l.size === 0) return;
      const a = e.closest("[data-flow-canvas]");
      if (!a) return;
      const c = t.$data(a);
      if (!c?._zoomLevel) return;
      const d = e.style.display;
      r(() => {
        const f = c._zoomLevel;
        l.has(f) ? e.style.display = d : e.style.display = "none";
      }), s(() => {
        e.style.display = d;
      });
    }
  );
}
const Yp = ["perf", "events", "viewport", "state", "activity"], fs = ["fps", "memory", "counts", "visible"], hs = 30;
function qp(t, e) {
  if (t && typeof t == "object" && Object.keys(t).length > 0)
    return t;
  const n = e.filter((i) => Yp.includes(i));
  if (n.length === 0)
    return { perf: !0, events: !0, viewport: !0, state: !0, activity: !0 };
  const o = {};
  for (const i of n)
    o[i] = !0;
  return o;
}
function Wp(t) {
  return t.perf ? t.perf === !0 ? [...fs] : t.perf.filter((e) => fs.includes(e)) : [];
}
function jp(t) {
  return t.events ? t.events === !0 ? hs : t.events.max ?? hs : 0;
}
function Yt(t, e) {
  const n = document.createElement("div");
  n.className = `flow-devtools-section ${e}`;
  const o = document.createElement("div");
  o.className = "flow-devtools-section-title", o.textContent = t, n.appendChild(o);
  const i = document.createElement("div");
  return i.className = "flow-devtools-section-content", n.appendChild(i), { wrapper: n, content: i };
}
function De(t, e) {
  const n = document.createElement("div");
  n.className = `flow-devtools-row ${e}`;
  const o = document.createElement("span");
  o.className = "flow-devtools-label", o.textContent = t;
  const i = document.createElement("span");
  return i.className = "flow-devtools-value", i.textContent = "—", n.appendChild(o), n.appendChild(i), { row: n, valueEl: i };
}
function Up(t) {
  t.directive(
    "flow-devtools",
    (e, { expression: n, modifiers: o }, { evaluate: i, effect: r, cleanup: s }) => {
      let l = null;
      if (n)
        try {
          l = i(n);
        } catch {
        }
      const a = qp(l, o), c = e.closest("[x-data]");
      if (!c) return;
      const d = e.closest(".flow-container");
      if (!d) return;
      e.classList.add("flow-devtools", "canvas-overlay"), e.setAttribute("data-flow-devtools", "");
      const f = (R) => R.stopPropagation();
      e.addEventListener("wheel", f);
      const u = document.createElement("button");
      u.className = "flow-devtools-toggle nopan", u.title = "Devtools";
      const h = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      h.setAttribute("width", "14"), h.setAttribute("height", "14"), h.setAttribute("viewBox", "0 0 24 24"), h.setAttribute("fill", "none"), h.setAttribute("stroke", "currentColor"), h.setAttribute("stroke-width", "2"), h.setAttribute("stroke-linecap", "round"), h.setAttribute("stroke-linejoin", "round");
      const p = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
      p.setAttribute("points", "22 12 18 12 15 21 9 3 6 12 2 12"), h.appendChild(p), u.appendChild(h), e.appendChild(u);
      const g = document.createElement("div");
      g.className = "flow-devtools-panel", g.style.display = "none", g.style.userSelect = "none", e.appendChild(g);
      let w = !1;
      const m = () => {
        w = !w, g.style.display = w ? "" : "none", u.title = w ? "Collapse" : "Devtools", w ? K() : se();
      };
      u.addEventListener("click", m);
      const E = Wp(a);
      let C = null, b = null, D = null, M = null, T = null;
      if (E.length > 0) {
        const { wrapper: R, content: Q } = Yt("Performance", "flow-devtools-perf");
        if (E.includes("fps")) {
          const { row: X, valueEl: W } = De("FPS", "flow-devtools-fps");
          C = W, Q.appendChild(X);
        }
        if (E.includes("memory")) {
          const { row: X, valueEl: W } = De("Memory", "flow-devtools-memory");
          b = W, Q.appendChild(X);
        }
        if (E.includes("counts")) {
          const X = De("Nodes", "flow-devtools-counts");
          D = X.valueEl, Q.appendChild(X.row);
          const W = De("Edges", "flow-devtools-counts");
          M = W.valueEl, Q.appendChild(W.row);
        }
        if (E.includes("visible")) {
          const { row: X, valueEl: W } = De("Visible", "flow-devtools-visible");
          T = W, Q.appendChild(X);
        }
        g.appendChild(R);
      }
      const v = jp(a);
      let P = null;
      if (v > 0) {
        const { wrapper: R, content: Q } = Yt("Events", "flow-devtools-events"), X = document.createElement("button");
        X.className = "flow-devtools-clear-btn nopan", X.textContent = "Clear", X.addEventListener("click", () => {
          P && (P.textContent = ""), le.length = 0;
        }), R.querySelector(".flow-devtools-section-title").appendChild(X), P = document.createElement("div"), P.className = "flow-devtools-event-list", Q.appendChild(P), g.appendChild(R);
      }
      let I = null, x = null, y = null;
      if (a.viewport) {
        const { wrapper: R, content: Q } = Yt("Viewport", "flow-devtools-viewport"), X = De("X", "flow-devtools-vp-x");
        I = X.valueEl, Q.appendChild(X.row);
        const W = De("Y", "flow-devtools-vp-y");
        x = W.valueEl, Q.appendChild(W.row);
        const $ = De("Zoom", "flow-devtools-vp-zoom");
        y = $.valueEl, Q.appendChild($.row), g.appendChild(R);
      }
      let q = null;
      if (a.state) {
        const { wrapper: R, content: Q } = Yt("Selection", "flow-devtools-state");
        q = document.createElement("div"), q.className = "flow-devtools-state-content", q.textContent = "No selection", Q.appendChild(q), g.appendChild(R);
      }
      let _ = null, L = null, A = null, O = null;
      if (a.activity) {
        const { wrapper: R, content: Q } = Yt("Activity", "flow-devtools-activity"), X = De("Animations", "flow-devtools-anim");
        _ = X.valueEl, Q.appendChild(X.row);
        const W = De("Particles", "flow-devtools-particles");
        L = W.valueEl, Q.appendChild(W.row);
        const $ = De("Follow", "flow-devtools-follow");
        A = $.valueEl, Q.appendChild($.row);
        const j = De("Timelines", "flow-devtools-timelines");
        O = j.valueEl, Q.appendChild(j.row), g.appendChild(R);
      }
      let S = null, k = !1, N = 0, U = performance.now();
      const J = !!(C || b), oe = () => {
        if (!k) return;
        N++;
        const R = performance.now();
        R - U >= 1e3 && (C && (C.textContent = String(Math.round(N * 1e3 / (R - U)))), N = 0, U = R, b && performance.memory && (b.textContent = Math.round(performance.memory.usedJSHeapSize / 1048576) + " MB")), S = requestAnimationFrame(oe);
      }, K = () => {
        !J || k || (k = !0, N = 0, U = performance.now(), S = requestAnimationFrame(oe));
      }, se = () => {
        k = !1, S !== null && (cancelAnimationFrame(S), S = null);
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
      if (v > 0 && P) {
        te = (R) => {
          const Q = R, X = Q.type.replace("flow-", "");
          let W = "";
          try {
            W = Q.detail ? JSON.stringify(Q.detail).slice(0, 80) : "";
          } catch {
            W = "[circular]";
          }
          le.unshift({ name: X, time: Date.now(), detail: W });
          const $ = P, j = document.createElement("div");
          j.className = "flow-devtools-event-entry";
          const ee = document.createElement("span");
          ee.className = "flow-devtools-event-name", ee.textContent = X;
          const V = document.createElement("span");
          V.className = "flow-devtools-event-age", V.textContent = "now";
          const G = document.createElement("span");
          for (G.className = "flow-devtools-event-detail", G.textContent = W, j.appendChild(ee), j.appendChild(V), j.appendChild(G), $.prepend(j); $.children.length > v; )
            $.removeChild($.lastChild), le.pop();
        };
        for (const R of ce)
          d.addEventListener(R, te);
      }
      r(() => {
        const R = t.$data(c);
        if (R) {
          if (D && (D.textContent = String(R.nodes?.length ?? 0)), M && (M.textContent = String(R.edges?.length ?? 0)), T && R._getVisibleNodeIds && (T.textContent = String(R._getVisibleNodeIds().size)), I && R.viewport && (I.textContent = Math.round(R.viewport.x).toString()), x && R.viewport && (x.textContent = Math.round(R.viewport.y).toString()), y && R.viewport && (y.textContent = R.viewport.zoom.toFixed(2)), q) {
            const Q = R.selectedNodes, X = R.selectedEdges;
            if (!((Q?.size ?? 0) > 0 || (X?.size ?? 0) > 0))
              q.textContent = "No selection";
            else {
              if (q.textContent = "", Q && Q.size > 0)
                for (const $ of Q) {
                  const j = R.getNode?.($);
                  if (!j) continue;
                  const ee = document.createElement("pre");
                  ee.className = "flow-devtools-json", ee.textContent = JSON.stringify({ id: j.id, position: j.position, data: j.data }, null, 2), q.appendChild(ee);
                }
              if (X && X.size > 0)
                for (const $ of X) {
                  const j = R.edges?.find((V) => V.id === $);
                  if (!j) continue;
                  const ee = document.createElement("pre");
                  ee.className = "flow-devtools-json", ee.textContent = JSON.stringify({ id: j.id, source: j.source, target: j.target, type: j.type }, null, 2), q.appendChild(ee);
                }
            }
          }
          if (_) {
            const Q = R._animator?._groups?.size ?? 0;
            _.textContent = String(Q);
          }
          L && (L.textContent = String(R._activeParticles?.size ?? 0)), A && (A.textContent = R._followHandle ? "Active" : "Idle"), O && (O.textContent = String(R._activeTimelines?.size ?? 0));
        }
      }), s(() => {
        if (se(), u.removeEventListener("click", m), te)
          for (const R of ce)
            d.removeEventListener(R, te);
        e.removeEventListener("wheel", f), e.textContent = "", C = null, b = null, D = null, M = null, T = null, P = null, I = null, x = null, y = null, q = null, _ = null, L = null, A = null, O = null;
      });
    }
  );
}
const Zp = {
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
function Gp(t) {
  return Zp[t] ?? null;
}
function Kp(t) {
  t.directive(
    "flow-action",
    (e, { value: n, expression: o }, { evaluate: i, effect: r, cleanup: s }) => {
      const a = Gp(n);
      if (!a)
        return;
      const c = e.closest("[data-flow-canvas]");
      if (!c)
        return;
      const d = t.$data(c);
      if (!d)
        return;
      const f = () => {
        const u = d[a.method];
        typeof u == "function" && (a.passExpression && o ? u.call(d, i(o)) : u.call(d));
      };
      e.addEventListener("click", f), (a.disabledWhen || a.aria) && r(() => {
        if (a.disabledWhen) {
          const u = a.disabledWhen(d);
          e.disabled = u, a.aria === "disabled" && e.setAttribute("aria-disabled", String(u));
        }
        a.aria === "pressed" && e.setAttribute("aria-pressed", String(!d.isInteractive));
      }), s(() => {
        e.removeEventListener("click", f);
      });
    }
  );
}
function Jp(t, e) {
  if (t !== "node" && t !== "row") return null;
  const n = e.includes("clear");
  return { type: t, isClear: n };
}
const yo = /* @__PURE__ */ new WeakMap();
function Qp(t) {
  t.directive(
    "flow-filter",
    (e, { value: n, expression: o, modifiers: i }, { evaluate: r, effect: s, cleanup: l }) => {
      const a = Jp(n, i);
      if (!a) return;
      const c = e.closest("[data-flow-canvas]");
      if (!c) return;
      const d = t.$data(c);
      if (!d) return;
      let f = null;
      const u = () => {
        if (a.isClear) {
          if (a.type === "node")
            d.clearNodeFilter(), yo.set(c, null);
          else
            for (const h of d.nodes)
              h.rowFilter && h.rowFilter !== "all" && d.setRowFilter(h.id, "all");
          return;
        }
        if (a.type === "node" && o)
          f = r(`[${o}]`)[0], d.setNodeFilter(f), yo.set(c, f);
        else if (a.type === "row" && o) {
          const h = r(o);
          d.setRowFilter(h.node, h.predicate);
        }
      };
      e.addEventListener("click", u), e.style.cursor = "pointer", a.type === "node" && !a.isClear && s(() => {
        d.nodes.length;
        const h = yo.get(c) === f && f !== null;
        e.classList.toggle("flow-filter-active", h), e.setAttribute("aria-pressed", String(h));
      }), l(() => {
        e.removeEventListener("click", u);
      });
    }
  );
}
function eg(t) {
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
function tg(t) {
  t.directive(
    "flow-follow",
    (e, { expression: n, modifiers: o }, { evaluate: i, effect: r, cleanup: s }) => {
      const l = o.includes("toggle"), a = e.closest("[data-flow-canvas]");
      if (!a) return;
      const c = t.$data(a);
      if (!c?.follow) return;
      let d = null;
      const f = (h) => {
        e.classList.toggle("flow-following", h), e.setAttribute("aria-pressed", String(h));
      }, u = () => {
        if (!n) return;
        const h = i(n), p = eg(h);
        if (!p) return;
        if (l && d) {
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
function ng(t, e) {
  return t !== "save" && t !== "restore" ? null : { action: t, persist: e.includes("persist") };
}
const li = /* @__PURE__ */ new Map();
function og(t, e) {
  li.set(t, e);
}
function ig(t) {
  return li.get(t) ?? null;
}
function sg(t) {
  return li.has(t);
}
function wo(t) {
  return `alpineflow-snapshot-${t}`;
}
function rg(t) {
  t.directive(
    "flow-snapshot",
    (e, { value: n, expression: o, modifiers: i }, { evaluate: r, effect: s, cleanup: l }) => {
      const a = ng(n, i);
      if (!a) return;
      const c = e.closest("[data-flow-canvas]");
      if (!c) return;
      const d = t.$data(c);
      if (!d) return;
      const f = () => {
        if (!o) return;
        const u = r(o);
        if (u)
          if (a.action === "save") {
            const h = d.toObject();
            a.persist ? localStorage.setItem(wo(u), JSON.stringify(h)) : og(u, h);
          } else {
            let h = null;
            if (a.persist) {
              const p = localStorage.getItem(wo(u));
              if (p)
                try {
                  h = JSON.parse(p);
                } catch {
                }
            } else
              h = ig(u);
            h && d.fromObject(h);
          }
      };
      e.addEventListener("click", f), a.action === "restore" && s(() => {
        if (!o) return;
        const u = r(o);
        if (!u) return;
        let h;
        a.persist ? h = localStorage.getItem(wo(u)) !== null : (d.nodes.length, h = sg(u)), e.disabled = !h, e.setAttribute("aria-disabled", String(!h));
      }), l(() => {
        e.removeEventListener("click", f);
      });
    }
  );
}
function ag(t) {
  const e = document.createElement("div");
  e.className = "flow-loading-indicator";
  const n = document.createElement("div");
  n.className = "flow-loading-indicator-node";
  const o = document.createElement("div");
  return o.className = "flow-loading-indicator-text", o.textContent = t ?? "Loading…", e.appendChild(n), e.appendChild(o), e;
}
function lg(t) {
  t.directive(
    "flow-loading",
    (e, { modifiers: n }, { effect: o, cleanup: i }) => {
      const r = e.closest("[data-flow-canvas]");
      if (!r) return;
      const s = t.$data(r);
      if (!s) return;
      e.classList.add("flow-loading-overlay"), e.childElementCount > 0 || e.textContent.trim().length > 0 || e.appendChild(ag(s._loadingText));
      const a = n.includes("fade");
      a && e.classList.add("flow-loading-fade"), r.setAttribute("data-flow-loading-directive", "");
      let c = null;
      o(() => {
        if (s.isLoading)
          e.style.display = "flex", a && (e.classList.remove("flow-loading-fade-out"), c && (e.removeEventListener("transitionend", c), c = null));
        else if (a) {
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
function cg(t) {
  t.directive(
    "flow-edge-toolbar",
    (e, { expression: n, modifiers: o }, { evaluate: i, effect: r, cleanup: s }) => {
      const l = e.closest("[data-flow-edge-id]");
      if (!l) return;
      const a = l.dataset.flowEdgeId, c = e.closest("[data-flow-canvas]");
      if (!c) return;
      const d = t.$data(c);
      if (!d) return;
      const f = c.querySelector(".flow-viewport");
      if (!f) return;
      try {
        const w = i("edge");
        w && t.addScopeToNode(e, { edge: w });
      } catch {
      }
      f.appendChild(e), e.classList.add("flow-edge-toolbar"), e.style.position = "absolute";
      const u = (w) => {
        w.stopPropagation();
      }, h = (w) => {
        w.stopPropagation();
      };
      e.addEventListener("pointerdown", u), e.addEventListener("click", h);
      const p = o.includes("below"), g = 20;
      r(() => {
        if (!d.edges.some((P) => P.id === a)) {
          e.removeEventListener("pointerdown", u), e.removeEventListener("click", h), e.classList.remove("flow-edge-toolbar"), e.remove();
          return;
        }
        const w = d.viewport?.zoom || 1, m = parseInt(e.getAttribute("data-flow-offset") ?? String(g), 10);
        let E = 0.5;
        if (n) {
          const P = i(n);
          typeof P == "number" && (E = P);
        }
        const C = l.querySelectorAll("path"), b = C.length > 1 ? C[1] : C[0];
        if (!b) return;
        const D = b.getTotalLength?.();
        if (!D) return;
        const M = b.getPointAtLength(D * Math.max(0, Math.min(1, E))), T = m / w, v = p ? T : -T;
        e.style.left = `${M.x}px`, e.style.top = `${M.y + v}px`, e.style.transformOrigin = "0 0", e.style.transform = `scale(${1 / w}) translate(-50%, ${p ? "0%" : "-100%"})`;
      }), s(() => {
        e.removeEventListener("pointerdown", u), e.removeEventListener("click", h), e.classList.remove("flow-edge-toolbar"), e.remove();
      });
    }
  );
}
function dg(t) {
  t.magic("flow", (e) => {
    const n = e.closest("[data-flow-canvas]");
    return n ? t.$data(n) : (console.warn("[alpinejs-flow] $flow used outside of a flowCanvas context"), {});
  });
}
function ug(t) {
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
function _m(t, e, n) {
  const o = n?.defaultDimensions?.width ?? we, i = n?.defaultDimensions?.height ?? ve, r = n?.padding ?? 20, s = n?.flowId ?? "ssr", a = t.filter((m) => !m.hidden).map((m) => ({
    ...m,
    dimensions: {
      width: m.dimensions?.width ?? o,
      height: m.dimensions?.height ?? i
    }
  })), c = /* @__PURE__ */ new Map();
  for (const m of a)
    c.set(m.id, m);
  const d = a.map((m) => ({
    id: m.id,
    x: m.position.x,
    y: m.position.y,
    width: m.dimensions.width,
    height: m.dimensions.height,
    ...m.class ? { class: m.class } : {},
    ...m.style ? {
      style: typeof m.style == "string" ? m.style : Object.entries(m.style).map(([E, C]) => `${E}:${C}`).join(";")
    } : {},
    data: m.data ?? {}
  })), f = e.filter((m) => !m.hidden), u = [], h = /* @__PURE__ */ new Map();
  for (const m of f) {
    const E = c.get(m.source), C = c.get(m.target);
    if (!E || !C)
      continue;
    let b, D;
    try {
      const I = jn(
        m,
        E,
        C,
        E.sourcePosition ?? "bottom",
        C.targetPosition ?? "top"
      );
      b = I.path, D = I.labelPosition;
    } catch {
      continue;
    }
    let M, T;
    if (m.markerStart) {
      const I = sn(m.markerStart), x = rn(I, s);
      h.has(x) || h.set(x, Bn(I, x)), M = `url(#${x})`;
    }
    if (m.markerEnd) {
      const I = sn(m.markerEnd), x = rn(I, s);
      h.has(x) || h.set(x, Bn(I, x)), T = `url(#${x})`;
    }
    let v, P;
    if (m.label)
      if (D)
        v = D.x, P = D.y;
      else {
        const I = E.position.x + E.dimensions.width / 2, x = E.position.y + E.dimensions.height / 2, y = C.position.x + C.dimensions.width / 2, q = C.position.y + C.dimensions.height / 2;
        v = (I + y) / 2, P = (x + q) / 2;
      }
    u.push({
      id: m.id,
      source: m.source,
      target: m.target,
      pathD: b,
      ...M ? { markerStart: M } : {},
      ...T ? { markerEnd: T } : {},
      ...m.class ? { class: m.class } : {},
      ...m.label ? { label: m.label } : {},
      ...v !== void 0 ? { labelX: v } : {},
      ...P !== void 0 ? { labelY: P } : {}
    });
  }
  const p = Array.from(h.values()).join(`
`);
  let g, w;
  if (a.length === 0)
    g = { x: 0, y: 0, width: 0, height: 0 }, w = { x: 0, y: 0, zoom: 1 };
  else {
    const m = Nt(a);
    g = {
      x: m.x - r,
      y: m.y - r,
      width: m.width + r * 2,
      height: m.height + r * 2
    }, w = {
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
    viewport: w
  };
}
const ps = /* @__PURE__ */ new WeakSet();
function bm(t) {
  ps.has(t) || (ps.add(t), Ur(t), ug(t), Uh(t), rp(t), Uu(t), Ou(t), Vu(t), Bu(t), Xh(t), dp(t), pp(t), gp(t), yp(t), wp(t), Tp(t), Ap(t), $p(t), Rp(t), zp(t), Op(t), Vp(t), Bp(t), Xp(t), Up(t), Kp(t), Qp(t), tg(t), rg(t), lg(t), cg(t), dg(t));
}
function fg(t) {
  return t.replace(/\s+(?:@|:|x-)[\w.:-]*="[^"]*"/g, "").replace(/\s+externalResourcesRequired="[^"]*"/g, "");
}
function hg(t, e, n, o) {
  return new Promise((i, r) => {
    const s = new Image();
    s.onload = () => {
      const l = document.createElement("canvas");
      l.width = e, l.height = n;
      const a = l.getContext("2d");
      a.fillStyle = o, a.fillRect(0, 0, e, n), a.drawImage(s, 0, 0), i(l.toDataURL("image/png"));
    }, s.onerror = () => {
      r(new Error("Failed to render SVG to image"));
    }, s.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(t);
  });
}
async function pg(t, e, n, o, i = {}) {
  let r;
  try {
    ({ toSvg: r } = await Promise.resolve().then(() => um));
  } catch {
    throw new Error("toImage() requires html-to-image. Install it with: npm install html-to-image");
  }
  const s = i.scope ?? "all", l = t.getBoundingClientRect(), a = s === "viewport" ? l.width : i.width ?? 1920, c = s === "viewport" ? l.height : i.height ?? 1080, d = i.background ?? (getComputedStyle(t).getPropertyValue("--flow-bg-color").trim() || "#ffffff"), f = e.style.transform, u = e.style.width, h = e.style.height, p = t.style.width, g = t.style.height, w = t.style.overflow, m = [];
  try {
    if (s === "all") {
      const I = t.querySelectorAll("[data-flow-culled]");
      for (const L of I)
        L.style.display = "", m.push(L);
      const x = n.filter((L) => !L.hidden), y = Nt(x), q = i.padding ?? 0.1, _ = zn(
        y,
        a,
        c,
        0.1,
        // minZoom
        2,
        // maxZoom
        q
      );
      e.style.transform = `translate(${_.x}px, ${_.y}px) scale(${_.zoom})`, e.style.width = `${a}px`, e.style.height = `${c}px`;
    }
    t.style.width = `${a}px`, t.style.height = `${c}px`, t.style.overflow = "hidden", await new Promise((I) => requestAnimationFrame(I));
    const E = i.includeOverlays, C = E === !0, b = typeof E == "object" ? E : {}, D = [
      ["canvas-overlay", C || (b.toolbar ?? !1)],
      ["flow-minimap", C || (b.minimap ?? !1)],
      ["flow-controls", C || (b.controls ?? !1)],
      ["flow-panel", C || (b.panels ?? !1)],
      ["flow-selection-box", !1]
    ], M = await r(t, {
      width: a,
      height: c,
      skipFonts: !0,
      filter: (I) => {
        if (I.classList) {
          for (const [x, y] of D)
            if (I.classList.contains(x) && !y) return !1;
        }
        return !0;
      }
    }), v = fg(decodeURIComponent(M.substring("data:image/svg+xml;charset=utf-8,".length))), P = await hg(v, a, c, d);
    if (i.filename) {
      const I = document.createElement("a");
      I.download = i.filename, I.href = P, I.click();
    }
    return P;
  } finally {
    e.style.transform = f, e.style.width = u, e.style.height = h, t.style.width = p, t.style.height = g, t.style.overflow = w;
    for (const E of m)
      E.style.display = "none";
  }
}
const gg = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  captureFlowImage: pg
}, Symbol.toStringTag, { value: "Module" }));
function mg(t, e) {
  if (t.match(/^[a-z]+:\/\//i))
    return t;
  if (t.match(/^\/\//))
    return window.location.protocol + t;
  if (t.match(/^[a-z]+:/i))
    return t;
  const n = document.implementation.createHTMLDocument(), o = n.createElement("base"), i = n.createElement("a");
  return n.head.appendChild(o), n.body.appendChild(i), e && (o.href = e), i.href = t, i.href;
}
const yg = /* @__PURE__ */ (() => {
  let t = 0;
  const e = () => (
    // eslint-disable-next-line no-bitwise
    `0000${(Math.random() * 36 ** 4 << 0).toString(36)}`.slice(-4)
  );
  return () => (t += 1, `u${e()}${t}`);
})();
function lt(t) {
  const e = [];
  for (let n = 0, o = t.length; n < o; n++)
    e.push(t[n]);
  return e;
}
let bt = null;
function Hr(t = {}) {
  return bt || (t.includeStyleProperties ? (bt = t.includeStyleProperties, bt) : (bt = lt(window.getComputedStyle(document.documentElement)), bt));
}
function Zn(t, e) {
  const o = (t.ownerDocument.defaultView || window).getComputedStyle(t).getPropertyValue(e);
  return o ? parseFloat(o.replace("px", "")) : 0;
}
function wg(t) {
  const e = Zn(t, "border-left-width"), n = Zn(t, "border-right-width");
  return t.clientWidth + e + n;
}
function vg(t) {
  const e = Zn(t, "border-top-width"), n = Zn(t, "border-bottom-width");
  return t.clientHeight + e + n;
}
function ci(t, e = {}) {
  const n = e.width || wg(t), o = e.height || vg(t);
  return { width: n, height: o };
}
function _g() {
  let t, e;
  try {
    e = process;
  } catch {
  }
  const n = e && e.env ? e.env.devicePixelRatio : null;
  return n && (t = parseInt(n, 10), Number.isNaN(t) && (t = 1)), t || window.devicePixelRatio || 1;
}
const Te = 16384;
function bg(t) {
  (t.width > Te || t.height > Te) && (t.width > Te && t.height > Te ? t.width > t.height ? (t.height *= Te / t.width, t.width = Te) : (t.width *= Te / t.height, t.height = Te) : t.width > Te ? (t.height *= Te / t.width, t.width = Te) : (t.width *= Te / t.height, t.height = Te));
}
function xg(t, e = {}) {
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
function Gn(t) {
  return new Promise((e, n) => {
    const o = new Image();
    o.onload = () => {
      o.decode().then(() => {
        requestAnimationFrame(() => e(o));
      });
    }, o.onerror = n, o.crossOrigin = "anonymous", o.decoding = "async", o.src = t;
  });
}
async function Eg(t) {
  return Promise.resolve().then(() => new XMLSerializer().serializeToString(t)).then(encodeURIComponent).then((e) => `data:image/svg+xml;charset=utf-8,${e}`);
}
async function Sg(t, e, n) {
  const o = "http://www.w3.org/2000/svg", i = document.createElementNS(o, "svg"), r = document.createElementNS(o, "foreignObject");
  return i.setAttribute("width", `${e}`), i.setAttribute("height", `${n}`), i.setAttribute("viewBox", `0 0 ${e} ${n}`), r.setAttribute("width", "100%"), r.setAttribute("height", "100%"), r.setAttribute("x", "0"), r.setAttribute("y", "0"), r.setAttribute("externalResourcesRequired", "true"), i.appendChild(r), r.appendChild(t), Eg(i);
}
const Le = (t, e) => {
  if (t instanceof e)
    return !0;
  const n = Object.getPrototypeOf(t);
  return n === null ? !1 : n.constructor.name === e.name || Le(n, e);
};
function Cg(t) {
  const e = t.getPropertyValue("content");
  return `${t.cssText} content: '${e.replace(/'|"/g, "")}';`;
}
function Pg(t, e) {
  return Hr(e).map((n) => {
    const o = t.getPropertyValue(n), i = t.getPropertyPriority(n);
    return `${n}: ${o}${i ? " !important" : ""};`;
  }).join(" ");
}
function kg(t, e, n, o) {
  const i = `.${t}:${e}`, r = n.cssText ? Cg(n) : Pg(n, o);
  return document.createTextNode(`${i}{${r}}`);
}
function gs(t, e, n, o) {
  const i = window.getComputedStyle(t, n), r = i.getPropertyValue("content");
  if (r === "" || r === "none")
    return;
  const s = yg();
  try {
    e.className = `${e.className} ${s}`;
  } catch {
    return;
  }
  const l = document.createElement("style");
  l.appendChild(kg(s, n, i, o)), e.appendChild(l);
}
function Lg(t, e, n) {
  gs(t, e, ":before", n), gs(t, e, ":after", n);
}
const ms = "application/font-woff", ys = "image/jpeg", Mg = {
  woff: ms,
  woff2: ms,
  ttf: "application/font-truetype",
  eot: "application/vnd.ms-fontobject",
  png: "image/png",
  jpg: ys,
  jpeg: ys,
  gif: "image/gif",
  tiff: "image/tiff",
  svg: "image/svg+xml",
  webp: "image/webp"
};
function Tg(t) {
  const e = /\.([^./]*?)$/g.exec(t);
  return e ? e[1] : "";
}
function di(t) {
  const e = Tg(t).toLowerCase();
  return Mg[e] || "";
}
function Ag(t) {
  return t.split(/,/)[1];
}
function Vo(t) {
  return t.search(/^(data:)/) !== -1;
}
function Ng(t, e) {
  return `data:${e};base64,${t}`;
}
async function Fr(t, e, n) {
  const o = await fetch(t, e);
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
const vo = {};
function Ig(t, e, n) {
  let o = t.replace(/\?.*/, "");
  return n && (o = t), /ttf|otf|eot|woff2?/i.test(o) && (o = o.replace(/.*\//, "")), e ? `[${e}]${o}` : o;
}
async function ui(t, e, n) {
  const o = Ig(t, e, n.includeQueryParams);
  if (vo[o] != null)
    return vo[o];
  n.cacheBust && (t += (/\?/.test(t) ? "&" : "?") + (/* @__PURE__ */ new Date()).getTime());
  let i;
  try {
    const r = await Fr(t, n.fetchRequestInit, ({ res: s, result: l }) => (e || (e = s.headers.get("Content-Type") || ""), Ag(l)));
    i = Ng(r, e);
  } catch (r) {
    i = n.imagePlaceholder || "";
    let s = `Failed to fetch resource: ${t}`;
    r && (s = typeof r == "string" ? r : r.message), s && console.warn(s);
  }
  return vo[o] = i, i;
}
async function $g(t) {
  const e = t.toDataURL();
  return e === "data:," ? t.cloneNode(!1) : Gn(e);
}
async function Dg(t, e) {
  if (t.currentSrc) {
    const r = document.createElement("canvas"), s = r.getContext("2d");
    r.width = t.clientWidth, r.height = t.clientHeight, s?.drawImage(t, 0, 0, r.width, r.height);
    const l = r.toDataURL();
    return Gn(l);
  }
  const n = t.poster, o = di(n), i = await ui(n, o, e);
  return Gn(i);
}
async function Rg(t, e) {
  var n;
  try {
    if (!((n = t?.contentDocument) === null || n === void 0) && n.body)
      return await no(t.contentDocument.body, e, !0);
  } catch {
  }
  return t.cloneNode(!1);
}
async function Hg(t, e) {
  return Le(t, HTMLCanvasElement) ? $g(t) : Le(t, HTMLVideoElement) ? Dg(t, e) : Le(t, HTMLIFrameElement) ? Rg(t, e) : t.cloneNode(zr(t));
}
const Fg = (t) => t.tagName != null && t.tagName.toUpperCase() === "SLOT", zr = (t) => t.tagName != null && t.tagName.toUpperCase() === "SVG";
async function zg(t, e, n) {
  var o, i;
  if (zr(e))
    return e;
  let r = [];
  return Fg(t) && t.assignedNodes ? r = lt(t.assignedNodes()) : Le(t, HTMLIFrameElement) && (!((o = t.contentDocument) === null || o === void 0) && o.body) ? r = lt(t.contentDocument.body.childNodes) : r = lt(((i = t.shadowRoot) !== null && i !== void 0 ? i : t).childNodes), r.length === 0 || Le(t, HTMLVideoElement) || await r.reduce((s, l) => s.then(() => no(l, n)).then((a) => {
    a && e.appendChild(a);
  }), Promise.resolve()), e;
}
function Og(t, e, n) {
  const o = e.style;
  if (!o)
    return;
  const i = window.getComputedStyle(t);
  i.cssText ? (o.cssText = i.cssText, o.transformOrigin = i.transformOrigin) : Hr(n).forEach((r) => {
    let s = i.getPropertyValue(r);
    r === "font-size" && s.endsWith("px") && (s = `${Math.floor(parseFloat(s.substring(0, s.length - 2))) - 0.1}px`), Le(t, HTMLIFrameElement) && r === "display" && s === "inline" && (s = "block"), r === "d" && e.getAttribute("d") && (s = `path(${e.getAttribute("d")})`), o.setProperty(r, s, i.getPropertyPriority(r));
  });
}
function Vg(t, e) {
  Le(t, HTMLTextAreaElement) && (e.innerHTML = t.value), Le(t, HTMLInputElement) && e.setAttribute("value", t.value);
}
function Bg(t, e) {
  if (Le(t, HTMLSelectElement)) {
    const o = Array.from(e.children).find((i) => t.value === i.getAttribute("value"));
    o && o.setAttribute("selected", "");
  }
}
function Xg(t, e, n) {
  return Le(e, Element) && (Og(t, e, n), Lg(t, e, n), Vg(t, e), Bg(t, e)), e;
}
async function Yg(t, e) {
  const n = t.querySelectorAll ? t.querySelectorAll("use") : [];
  if (n.length === 0)
    return t;
  const o = {};
  for (let r = 0; r < n.length; r++) {
    const l = n[r].getAttribute("xlink:href");
    if (l) {
      const a = t.querySelector(l), c = document.querySelector(l);
      !a && c && !o[l] && (o[l] = await no(c, e, !0));
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
    t.appendChild(s);
  }
  return t;
}
async function no(t, e, n) {
  return !n && e.filter && !e.filter(t) ? null : Promise.resolve(t).then((o) => Hg(o, e)).then((o) => zg(t, o, e)).then((o) => Xg(t, o, e)).then((o) => Yg(o, e));
}
const Or = /url\((['"]?)([^'"]+?)\1\)/g, qg = /url\([^)]+\)\s*format\((["']?)([^"']+)\1\)/g, Wg = /src:\s*(?:url\([^)]+\)\s*format\([^)]+\)[,;]\s*)+/g;
function jg(t) {
  const e = t.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1");
  return new RegExp(`(url\\(['"]?)(${e})(['"]?\\))`, "g");
}
function Ug(t) {
  const e = [];
  return t.replace(Or, (n, o, i) => (e.push(i), n)), e.filter((n) => !Vo(n));
}
async function Zg(t, e, n, o, i) {
  try {
    const r = n ? mg(e, n) : e, s = di(e);
    let l;
    return i || (l = await ui(r, s, o)), t.replace(jg(e), `$1${l}$3`);
  } catch {
  }
  return t;
}
function Gg(t, { preferredFontFormat: e }) {
  return e ? t.replace(Wg, (n) => {
    for (; ; ) {
      const [o, , i] = qg.exec(n) || [];
      if (!i)
        return "";
      if (i === e)
        return `src: ${o};`;
    }
  }) : t;
}
function Vr(t) {
  return t.search(Or) !== -1;
}
async function Br(t, e, n) {
  if (!Vr(t))
    return t;
  const o = Gg(t, n);
  return Ug(o).reduce((r, s) => r.then((l) => Zg(l, s, e, n)), Promise.resolve(o));
}
async function xt(t, e, n) {
  var o;
  const i = (o = e.style) === null || o === void 0 ? void 0 : o.getPropertyValue(t);
  if (i) {
    const r = await Br(i, null, n);
    return e.style.setProperty(t, r, e.style.getPropertyPriority(t)), !0;
  }
  return !1;
}
async function Kg(t, e) {
  await xt("background", t, e) || await xt("background-image", t, e), await xt("mask", t, e) || await xt("-webkit-mask", t, e) || await xt("mask-image", t, e) || await xt("-webkit-mask-image", t, e);
}
async function Jg(t, e) {
  const n = Le(t, HTMLImageElement);
  if (!(n && !Vo(t.src)) && !(Le(t, SVGImageElement) && !Vo(t.href.baseVal)))
    return;
  const o = n ? t.src : t.href.baseVal, i = await ui(o, di(o), e);
  await new Promise((r, s) => {
    t.onload = r, t.onerror = e.onImageErrorHandler ? (...a) => {
      try {
        r(e.onImageErrorHandler(...a));
      } catch (c) {
        s(c);
      }
    } : s;
    const l = t;
    l.decode && (l.decode = r), l.loading === "lazy" && (l.loading = "eager"), n ? (t.srcset = "", t.src = i) : t.href.baseVal = i;
  });
}
async function Qg(t, e) {
  const o = lt(t.childNodes).map((i) => Xr(i, e));
  await Promise.all(o).then(() => t);
}
async function Xr(t, e) {
  Le(t, Element) && (await Kg(t, e), await Jg(t, e), await Qg(t, e));
}
function em(t, e) {
  const { style: n } = t;
  e.backgroundColor && (n.backgroundColor = e.backgroundColor), e.width && (n.width = `${e.width}px`), e.height && (n.height = `${e.height}px`);
  const o = e.style;
  return o != null && Object.keys(o).forEach((i) => {
    n[i] = o[i];
  }), t;
}
const ws = {};
async function vs(t) {
  let e = ws[t];
  if (e != null)
    return e;
  const o = await (await fetch(t)).text();
  return e = { url: t, cssText: o }, ws[t] = e, e;
}
async function _s(t, e) {
  let n = t.cssText;
  const o = /url\(["']?([^"')]+)["']?\)/g, r = (n.match(/url\([^)]+\)/g) || []).map(async (s) => {
    let l = s.replace(o, "$1");
    return l.startsWith("https://") || (l = new URL(l, t.url).href), Fr(l, e.fetchRequestInit, ({ result: a }) => (n = n.replace(s, `url(${a})`), [s, a]));
  });
  return Promise.all(r).then(() => n);
}
function bs(t) {
  if (t == null)
    return [];
  const e = [], n = /(\/\*[\s\S]*?\*\/)/gi;
  let o = t.replace(n, "");
  const i = new RegExp("((@.*?keyframes [\\s\\S]*?){([\\s\\S]*?}\\s*?)})", "gi");
  for (; ; ) {
    const a = i.exec(o);
    if (a === null)
      break;
    e.push(a[0]);
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
    e.push(a[0]);
  }
  return e;
}
async function tm(t, e) {
  const n = [], o = [];
  return t.forEach((i) => {
    if ("cssRules" in i)
      try {
        lt(i.cssRules || []).forEach((r, s) => {
          if (r.type === CSSRule.IMPORT_RULE) {
            let l = s + 1;
            const a = r.href, c = vs(a).then((d) => _s(d, e)).then((d) => bs(d).forEach((f) => {
              try {
                i.insertRule(f, f.startsWith("@import") ? l += 1 : i.cssRules.length);
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
        const s = t.find((l) => l.href == null) || document.styleSheets[0];
        i.href != null && o.push(vs(i.href).then((l) => _s(l, e)).then((l) => bs(l).forEach((a) => {
          s.insertRule(a, s.cssRules.length);
        })).catch((l) => {
          console.error("Error loading remote stylesheet", l);
        })), console.error("Error inlining remote css file", r);
      }
  }), Promise.all(o).then(() => (t.forEach((i) => {
    if ("cssRules" in i)
      try {
        lt(i.cssRules || []).forEach((r) => {
          n.push(r);
        });
      } catch (r) {
        console.error(`Error while reading CSS rules from ${i.href}`, r);
      }
  }), n));
}
function nm(t) {
  return t.filter((e) => e.type === CSSRule.FONT_FACE_RULE).filter((e) => Vr(e.style.getPropertyValue("src")));
}
async function om(t, e) {
  if (t.ownerDocument == null)
    throw new Error("Provided element is not within a Document");
  const n = lt(t.ownerDocument.styleSheets), o = await tm(n, e);
  return nm(o);
}
function Yr(t) {
  return t.trim().replace(/["']/g, "");
}
function im(t) {
  const e = /* @__PURE__ */ new Set();
  function n(o) {
    (o.style.fontFamily || getComputedStyle(o).fontFamily).split(",").forEach((r) => {
      e.add(Yr(r));
    }), Array.from(o.children).forEach((r) => {
      r instanceof HTMLElement && n(r);
    });
  }
  return n(t), e;
}
async function qr(t, e) {
  const n = await om(t, e), o = im(t);
  return (await Promise.all(n.filter((r) => o.has(Yr(r.style.fontFamily))).map((r) => {
    const s = r.parentStyleSheet ? r.parentStyleSheet.href : null;
    return Br(r.cssText, s, e);
  }))).join(`
`);
}
async function sm(t, e) {
  const n = e.fontEmbedCSS != null ? e.fontEmbedCSS : e.skipFonts ? null : await qr(t, e);
  if (n) {
    const o = document.createElement("style"), i = document.createTextNode(n);
    o.appendChild(i), t.firstChild ? t.insertBefore(o, t.firstChild) : t.appendChild(o);
  }
}
async function Wr(t, e = {}) {
  const { width: n, height: o } = ci(t, e), i = await no(t, e, !0);
  return await sm(i, e), await Xr(i, e), em(i, e), await Sg(i, n, o);
}
async function hn(t, e = {}) {
  const { width: n, height: o } = ci(t, e), i = await Wr(t, e), r = await Gn(i), s = document.createElement("canvas"), l = s.getContext("2d"), a = e.pixelRatio || _g(), c = e.canvasWidth || n, d = e.canvasHeight || o;
  return s.width = c * a, s.height = d * a, e.skipAutoScale || bg(s), s.style.width = `${c}`, s.style.height = `${d}`, e.backgroundColor && (l.fillStyle = e.backgroundColor, l.fillRect(0, 0, s.width, s.height)), l.drawImage(r, 0, 0, s.width, s.height), s;
}
async function rm(t, e = {}) {
  const { width: n, height: o } = ci(t, e);
  return (await hn(t, e)).getContext("2d").getImageData(0, 0, n, o).data;
}
async function am(t, e = {}) {
  return (await hn(t, e)).toDataURL();
}
async function lm(t, e = {}) {
  return (await hn(t, e)).toDataURL("image/jpeg", e.quality || 1);
}
async function cm(t, e = {}) {
  const n = await hn(t, e);
  return await xg(n);
}
async function dm(t, e = {}) {
  return qr(t, e);
}
const um = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getFontEmbedCSS: dm,
  toBlob: cm,
  toCanvas: hn,
  toJpeg: lm,
  toPixelData: rm,
  toPng: am,
  toSvg: Wr
}, Symbol.toStringTag, { value: "Module" }));
export {
  uf as ComputeEngine,
  uu as FlowHistory,
  Wi as SHORTCUT_DEFAULTS,
  gm as along,
  Fu as areNodesConnected,
  pr as buildNodeMap,
  mr as clampToExtent,
  co as clampToParent,
  _m as computeRenderPlan,
  Gi as computeValidationErrors,
  gr as computeZIndex,
  bm as default,
  ym as drift,
  Ku as expandParentToFitChild,
  $o as getAbsolutePosition,
  ju as getAutoPanDelta,
  Xn as getBezierPath,
  Du as getConnectedEdges,
  rt as getDescendantIds,
  ls as getEdgePosition,
  Tr as getFloatingEdgeParams,
  Ru as getIncomers,
  as as getNodeIntersection,
  Nt as getNodesBounds,
  $u as getNodesFullyInPolygon,
  ru as getNodesFullyInRect,
  Iu as getNodesInPolygon,
  su as getNodesInRect,
  No as getOutgoers,
  fm as getSimpleBezierPath,
  vm as getSimpleFloatingPosition,
  ln as getSmoothStepPath,
  Wu as getStepPath,
  fr as getStraightPath,
  zn as getViewportForBounds,
  ot as isConnectable,
  Xu as isDeletable,
  ur as isDraggable,
  Yi as isResizable,
  Io as isSelectable,
  ze as matchesKey,
  st as matchesModifier,
  hm as orbit,
  mm as pendulum,
  ti as pointInPolygon,
  Nu as polygonIntersectsAABB,
  _u as registerMarker,
  Gt as resolveChildValidation,
  Zu as resolveShortcuts,
  at as sortNodesTopological,
  wm as stagger,
  Lt as toAbsoluteNode,
  qn as toAbsoluteNodes,
  vr as validateChildAdd,
  Wn as validateChildRemove,
  pm as wave
};
//# sourceMappingURL=alpineflow.bundle.esm.js.map
