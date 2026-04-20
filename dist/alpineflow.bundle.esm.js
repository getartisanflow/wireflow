let Co = null;
function oa(t) {
  Co = t;
}
function Ce() {
  if (!Co)
    throw new Error("[AlpineFlow] Alpine not initialized. Ensure Alpine.plugin(AlpineFlow) was called.");
  return Co;
}
var ia = { value: () => {
} };
function to() {
  for (var t = 0, e = arguments.length, n = {}, o; t < e; ++t) {
    if (!(o = arguments[t] + "") || o in n || /[\s.]/.test(o)) throw new Error("illegal type: " + o);
    n[o] = [];
  }
  return new Ln(n);
}
function Ln(t) {
  this._ = t;
}
function sa(t, e) {
  return t.trim().split(/^|\s+/).map(function(n) {
    var o = "", i = n.indexOf(".");
    if (i >= 0 && (o = n.slice(i + 1), n = n.slice(0, i)), n && !e.hasOwnProperty(n)) throw new Error("unknown type: " + n);
    return { type: n, name: o };
  });
}
Ln.prototype = to.prototype = {
  constructor: Ln,
  on: function(t, e) {
    var n = this._, o = sa(t + "", n), i, r = -1, s = o.length;
    if (arguments.length < 2) {
      for (; ++r < s; ) if ((i = (t = o[r]).type) && (i = ra(n[i], t.name))) return i;
      return;
    }
    if (e != null && typeof e != "function") throw new Error("invalid callback: " + e);
    for (; ++r < s; )
      if (i = (t = o[r]).type) n[i] = vi(n[i], t.name, e);
      else if (e == null) for (i in n) n[i] = vi(n[i], t.name, null);
    return this;
  },
  copy: function() {
    var t = {}, e = this._;
    for (var n in e) t[n] = e[n].slice();
    return new Ln(t);
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
function ra(t, e) {
  for (var n = 0, o = t.length, i; n < o; ++n)
    if ((i = t[n]).name === e)
      return i.value;
}
function vi(t, e, n) {
  for (var o = 0, i = t.length; o < i; ++o)
    if (t[o].name === e) {
      t[o] = ia, t = t.slice(0, o).concat(t.slice(o + 1));
      break;
    }
  return n != null && t.push({ name: e, value: n }), t;
}
var Po = "http://www.w3.org/1999/xhtml";
const _i = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Po,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function no(t) {
  var e = t += "", n = e.indexOf(":");
  return n >= 0 && (e = t.slice(0, n)) !== "xmlns" && (t = t.slice(n + 1)), _i.hasOwnProperty(e) ? { space: _i[e], local: t } : t;
}
function aa(t) {
  return function() {
    var e = this.ownerDocument, n = this.namespaceURI;
    return n === Po && e.documentElement.namespaceURI === Po ? e.createElement(t) : e.createElementNS(n, t);
  };
}
function la(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function Ts(t) {
  var e = no(t);
  return (e.local ? la : aa)(e);
}
function ca() {
}
function jo(t) {
  return t == null ? ca : function() {
    return this.querySelector(t);
  };
}
function da(t) {
  typeof t != "function" && (t = jo(t));
  for (var e = this._groups, n = e.length, o = new Array(n), i = 0; i < n; ++i)
    for (var r = e[i], s = r.length, l = o[i] = new Array(s), a, c, d = 0; d < s; ++d)
      (a = r[d]) && (c = t.call(a, a.__data__, d, r)) && ("__data__" in a && (c.__data__ = a.__data__), l[d] = c);
  return new De(o, this._parents);
}
function ua(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function fa() {
  return [];
}
function As(t) {
  return t == null ? fa : function() {
    return this.querySelectorAll(t);
  };
}
function ha(t) {
  return function() {
    return ua(t.apply(this, arguments));
  };
}
function pa(t) {
  typeof t == "function" ? t = ha(t) : t = As(t);
  for (var e = this._groups, n = e.length, o = [], i = [], r = 0; r < n; ++r)
    for (var s = e[r], l = s.length, a, c = 0; c < l; ++c)
      (a = s[c]) && (o.push(t.call(a, a.__data__, c, s)), i.push(a));
  return new De(o, i);
}
function Ns(t) {
  return function() {
    return this.matches(t);
  };
}
function $s(t) {
  return function(e) {
    return e.matches(t);
  };
}
var ga = Array.prototype.find;
function ma(t) {
  return function() {
    return ga.call(this.children, t);
  };
}
function ya() {
  return this.firstElementChild;
}
function wa(t) {
  return this.select(t == null ? ya : ma(typeof t == "function" ? t : $s(t)));
}
var va = Array.prototype.filter;
function _a() {
  return Array.from(this.children);
}
function ba(t) {
  return function() {
    return va.call(this.children, t);
  };
}
function xa(t) {
  return this.selectAll(t == null ? _a : ba(typeof t == "function" ? t : $s(t)));
}
function Ea(t) {
  typeof t != "function" && (t = Ns(t));
  for (var e = this._groups, n = e.length, o = new Array(n), i = 0; i < n; ++i)
    for (var r = e[i], s = r.length, l = o[i] = [], a, c = 0; c < s; ++c)
      (a = r[c]) && t.call(a, a.__data__, c, r) && l.push(a);
  return new De(o, this._parents);
}
function Is(t) {
  return new Array(t.length);
}
function Sa() {
  return new De(this._enter || this._groups.map(Is), this._parents);
}
function In(t, e) {
  this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = e;
}
In.prototype = {
  constructor: In,
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
function Ca(t) {
  return function() {
    return t;
  };
}
function Pa(t, e, n, o, i, r) {
  for (var s = 0, l, a = e.length, c = r.length; s < c; ++s)
    (l = e[s]) ? (l.__data__ = r[s], o[s] = l) : n[s] = new In(t, r[s]);
  for (; s < a; ++s)
    (l = e[s]) && (i[s] = l);
}
function ka(t, e, n, o, i, r, s) {
  var l, a, c = /* @__PURE__ */ new Map(), d = e.length, f = r.length, u = new Array(d), h;
  for (l = 0; l < d; ++l)
    (a = e[l]) && (u[l] = h = s.call(a, a.__data__, l, e) + "", c.has(h) ? i[l] = a : c.set(h, a));
  for (l = 0; l < f; ++l)
    h = s.call(t, r[l], l, r) + "", (a = c.get(h)) ? (o[l] = a, a.__data__ = r[l], c.delete(h)) : n[l] = new In(t, r[l]);
  for (l = 0; l < d; ++l)
    (a = e[l]) && c.get(u[l]) === a && (i[l] = a);
}
function La(t) {
  return t.__data__;
}
function Ma(t, e) {
  if (!arguments.length) return Array.from(this, La);
  var n = e ? ka : Pa, o = this._parents, i = this._groups;
  typeof t != "function" && (t = Ca(t));
  for (var r = i.length, s = new Array(r), l = new Array(r), a = new Array(r), c = 0; c < r; ++c) {
    var d = o[c], f = i[c], u = f.length, h = Ta(t.call(d, d && d.__data__, c, o)), p = h.length, g = l[c] = new Array(p), w = s[c] = new Array(p), m = a[c] = new Array(u);
    n(d, f, g, w, m, h, e);
    for (var E = 0, S = 0, b, A; E < p; ++E)
      if (b = g[E]) {
        for (E >= S && (S = E + 1); !(A = w[S]) && ++S < p; ) ;
        b._next = A || null;
      }
  }
  return s = new De(s, o), s._enter = l, s._exit = a, s;
}
function Ta(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function Aa() {
  return new De(this._exit || this._groups.map(Is), this._parents);
}
function Na(t, e, n) {
  var o = this.enter(), i = this, r = this.exit();
  return typeof t == "function" ? (o = t(o), o && (o = o.selection())) : o = o.append(t + ""), e != null && (i = e(i), i && (i = i.selection())), n == null ? r.remove() : n(r), o && i ? o.merge(i).order() : i;
}
function $a(t) {
  for (var e = t.selection ? t.selection() : t, n = this._groups, o = e._groups, i = n.length, r = o.length, s = Math.min(i, r), l = new Array(i), a = 0; a < s; ++a)
    for (var c = n[a], d = o[a], f = c.length, u = l[a] = new Array(f), h, p = 0; p < f; ++p)
      (h = c[p] || d[p]) && (u[p] = h);
  for (; a < i; ++a)
    l[a] = n[a];
  return new De(l, this._parents);
}
function Ia() {
  for (var t = this._groups, e = -1, n = t.length; ++e < n; )
    for (var o = t[e], i = o.length - 1, r = o[i], s; --i >= 0; )
      (s = o[i]) && (r && s.compareDocumentPosition(r) ^ 4 && r.parentNode.insertBefore(s, r), r = s);
  return this;
}
function Da(t) {
  t || (t = Ra);
  function e(f, u) {
    return f && u ? t(f.__data__, u.__data__) : !f - !u;
  }
  for (var n = this._groups, o = n.length, i = new Array(o), r = 0; r < o; ++r) {
    for (var s = n[r], l = s.length, a = i[r] = new Array(l), c, d = 0; d < l; ++d)
      (c = s[d]) && (a[d] = c);
    a.sort(e);
  }
  return new De(i, this._parents).order();
}
function Ra(t, e) {
  return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function Ha() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function Fa() {
  return Array.from(this);
}
function za() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var o = t[e], i = 0, r = o.length; i < r; ++i) {
      var s = o[i];
      if (s) return s;
    }
  return null;
}
function Oa() {
  let t = 0;
  for (const e of this) ++t;
  return t;
}
function Va() {
  return !this.node();
}
function Ba(t) {
  for (var e = this._groups, n = 0, o = e.length; n < o; ++n)
    for (var i = e[n], r = 0, s = i.length, l; r < s; ++r)
      (l = i[r]) && t.call(l, l.__data__, r, i);
  return this;
}
function qa(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function Xa(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Ya(t, e) {
  return function() {
    this.setAttribute(t, e);
  };
}
function Wa(t, e) {
  return function() {
    this.setAttributeNS(t.space, t.local, e);
  };
}
function ja(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttribute(t) : this.setAttribute(t, n);
  };
}
function Ua(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, n);
  };
}
function Za(t, e) {
  var n = no(t);
  if (arguments.length < 2) {
    var o = this.node();
    return n.local ? o.getAttributeNS(n.space, n.local) : o.getAttribute(n);
  }
  return this.each((e == null ? n.local ? Xa : qa : typeof e == "function" ? n.local ? Ua : ja : n.local ? Wa : Ya)(n, e));
}
function Ds(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function Ga(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function Ka(t, e, n) {
  return function() {
    this.style.setProperty(t, e, n);
  };
}
function Ja(t, e, n) {
  return function() {
    var o = e.apply(this, arguments);
    o == null ? this.style.removeProperty(t) : this.style.setProperty(t, o, n);
  };
}
function Qa(t, e, n) {
  return arguments.length > 1 ? this.each((e == null ? Ga : typeof e == "function" ? Ja : Ka)(t, e, n ?? "")) : Nt(this.node(), t);
}
function Nt(t, e) {
  return t.style.getPropertyValue(e) || Ds(t).getComputedStyle(t, null).getPropertyValue(e);
}
function el(t) {
  return function() {
    delete this[t];
  };
}
function tl(t, e) {
  return function() {
    this[t] = e;
  };
}
function nl(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? delete this[t] : this[t] = n;
  };
}
function ol(t, e) {
  return arguments.length > 1 ? this.each((e == null ? el : typeof e == "function" ? nl : tl)(t, e)) : this.node()[t];
}
function Rs(t) {
  return t.trim().split(/^|\s+/);
}
function Uo(t) {
  return t.classList || new Hs(t);
}
function Hs(t) {
  this._node = t, this._names = Rs(t.getAttribute("class") || "");
}
Hs.prototype = {
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
function Fs(t, e) {
  for (var n = Uo(t), o = -1, i = e.length; ++o < i; ) n.add(e[o]);
}
function zs(t, e) {
  for (var n = Uo(t), o = -1, i = e.length; ++o < i; ) n.remove(e[o]);
}
function il(t) {
  return function() {
    Fs(this, t);
  };
}
function sl(t) {
  return function() {
    zs(this, t);
  };
}
function rl(t, e) {
  return function() {
    (e.apply(this, arguments) ? Fs : zs)(this, t);
  };
}
function al(t, e) {
  var n = Rs(t + "");
  if (arguments.length < 2) {
    for (var o = Uo(this.node()), i = -1, r = n.length; ++i < r; ) if (!o.contains(n[i])) return !1;
    return !0;
  }
  return this.each((typeof e == "function" ? rl : e ? il : sl)(n, e));
}
function ll() {
  this.textContent = "";
}
function cl(t) {
  return function() {
    this.textContent = t;
  };
}
function dl(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.textContent = e ?? "";
  };
}
function ul(t) {
  return arguments.length ? this.each(t == null ? ll : (typeof t == "function" ? dl : cl)(t)) : this.node().textContent;
}
function fl() {
  this.innerHTML = "";
}
function hl(t) {
  return function() {
    this.innerHTML = t;
  };
}
function pl(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.innerHTML = e ?? "";
  };
}
function gl(t) {
  return arguments.length ? this.each(t == null ? fl : (typeof t == "function" ? pl : hl)(t)) : this.node().innerHTML;
}
function ml() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function yl() {
  return this.each(ml);
}
function wl() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function vl() {
  return this.each(wl);
}
function _l(t) {
  var e = typeof t == "function" ? t : Ts(t);
  return this.select(function() {
    return this.appendChild(e.apply(this, arguments));
  });
}
function bl() {
  return null;
}
function xl(t, e) {
  var n = typeof t == "function" ? t : Ts(t), o = e == null ? bl : typeof e == "function" ? e : jo(e);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), o.apply(this, arguments) || null);
  });
}
function El() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function Sl() {
  return this.each(El);
}
function Cl() {
  var t = this.cloneNode(!1), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function Pl() {
  var t = this.cloneNode(!0), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function kl(t) {
  return this.select(t ? Pl : Cl);
}
function Ll(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function Ml(t) {
  return function(e) {
    t.call(this, e, this.__data__);
  };
}
function Tl(t) {
  return t.trim().split(/^|\s+/).map(function(e) {
    var n = "", o = e.indexOf(".");
    return o >= 0 && (n = e.slice(o + 1), e = e.slice(0, o)), { type: e, name: n };
  });
}
function Al(t) {
  return function() {
    var e = this.__on;
    if (e) {
      for (var n = 0, o = -1, i = e.length, r; n < i; ++n)
        r = e[n], (!t.type || r.type === t.type) && r.name === t.name ? this.removeEventListener(r.type, r.listener, r.options) : e[++o] = r;
      ++o ? e.length = o : delete this.__on;
    }
  };
}
function Nl(t, e, n) {
  return function() {
    var o = this.__on, i, r = Ml(e);
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
function $l(t, e, n) {
  var o = Tl(t + ""), i, r = o.length, s;
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
  for (l = e ? Nl : Al, i = 0; i < r; ++i) this.each(l(o[i], e, n));
  return this;
}
function Os(t, e, n) {
  var o = Ds(t), i = o.CustomEvent;
  typeof i == "function" ? i = new i(e, n) : (i = o.document.createEvent("Event"), n ? (i.initEvent(e, n.bubbles, n.cancelable), i.detail = n.detail) : i.initEvent(e, !1, !1)), t.dispatchEvent(i);
}
function Il(t, e) {
  return function() {
    return Os(this, t, e);
  };
}
function Dl(t, e) {
  return function() {
    return Os(this, t, e.apply(this, arguments));
  };
}
function Rl(t, e) {
  return this.each((typeof e == "function" ? Dl : Il)(t, e));
}
function* Hl() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var o = t[e], i = 0, r = o.length, s; i < r; ++i)
      (s = o[i]) && (yield s);
}
var Vs = [null];
function De(t, e) {
  this._groups = t, this._parents = e;
}
function fn() {
  return new De([[document.documentElement]], Vs);
}
function Fl() {
  return this;
}
De.prototype = fn.prototype = {
  constructor: De,
  select: da,
  selectAll: pa,
  selectChild: wa,
  selectChildren: xa,
  filter: Ea,
  data: Ma,
  enter: Sa,
  exit: Aa,
  join: Na,
  merge: $a,
  selection: Fl,
  order: Ia,
  sort: Da,
  call: Ha,
  nodes: Fa,
  node: za,
  size: Oa,
  empty: Va,
  each: Ba,
  attr: Za,
  style: Qa,
  property: ol,
  classed: al,
  text: ul,
  html: gl,
  raise: yl,
  lower: vl,
  append: _l,
  insert: xl,
  remove: Sl,
  clone: kl,
  datum: Ll,
  on: $l,
  dispatch: Rl,
  [Symbol.iterator]: Hl
};
function Fe(t) {
  return typeof t == "string" ? new De([[document.querySelector(t)]], [document.documentElement]) : new De([[t]], Vs);
}
function zl(t) {
  let e;
  for (; e = t.sourceEvent; ) t = e;
  return t;
}
function Ue(t, e) {
  if (t = zl(t), e === void 0 && (e = t.currentTarget), e) {
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
const Ol = { passive: !1 }, en = { capture: !0, passive: !1 };
function ao(t) {
  t.stopImmediatePropagation();
}
function Lt(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function Bs(t) {
  var e = t.document.documentElement, n = Fe(t).on("dragstart.drag", Lt, en);
  "onselectstart" in e ? n.on("selectstart.drag", Lt, en) : (e.__noselect = e.style.MozUserSelect, e.style.MozUserSelect = "none");
}
function qs(t, e) {
  var n = t.document.documentElement, o = Fe(t).on("dragstart.drag", null);
  e && (o.on("click.drag", Lt, en), setTimeout(function() {
    o.on("click.drag", null);
  }, 0)), "onselectstart" in n ? o.on("selectstart.drag", null) : (n.style.MozUserSelect = n.__noselect, delete n.__noselect);
}
const yn = (t) => () => t;
function ko(t, {
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
ko.prototype.on = function() {
  var t = this._.on.apply(this._, arguments);
  return t === this._ ? this : t;
};
function Vl(t) {
  return !t.ctrlKey && !t.button;
}
function Bl() {
  return this.parentNode;
}
function ql(t, e) {
  return e ?? { x: t.x, y: t.y };
}
function Xl() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Yl() {
  var t = Vl, e = Bl, n = ql, o = Xl, i = {}, r = to("start", "drag", "end"), s = 0, l, a, c, d, f = 0;
  function u(b) {
    b.on("mousedown.drag", h).filter(o).on("touchstart.drag", w).on("touchmove.drag", m, Ol).on("touchend.drag touchcancel.drag", E).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function h(b, A) {
    if (!(d || !t.call(this, b, A))) {
      var T = S(this, e.call(this, b, A), b, A, "mouse");
      T && (Fe(b.view).on("mousemove.drag", p, en).on("mouseup.drag", g, en), Bs(b.view), ao(b), c = !1, l = b.clientX, a = b.clientY, T("start", b));
    }
  }
  function p(b) {
    if (Lt(b), !c) {
      var A = b.clientX - l, T = b.clientY - a;
      c = A * A + T * T > f;
    }
    i.mouse("drag", b);
  }
  function g(b) {
    Fe(b.view).on("mousemove.drag mouseup.drag", null), qs(b.view, c), Lt(b), i.mouse("end", b);
  }
  function w(b, A) {
    if (t.call(this, b, A)) {
      var T = b.changedTouches, M = e.call(this, b, A), v = T.length, C, $;
      for (C = 0; C < v; ++C)
        ($ = S(this, M, b, A, T[C].identifier, T[C])) && (ao(b), $("start", b, T[C]));
    }
  }
  function m(b) {
    var A = b.changedTouches, T = A.length, M, v;
    for (M = 0; M < T; ++M)
      (v = i[A[M].identifier]) && (Lt(b), v("drag", b, A[M]));
  }
  function E(b) {
    var A = b.changedTouches, T = A.length, M, v;
    for (d && clearTimeout(d), d = setTimeout(function() {
      d = null;
    }, 500), M = 0; M < T; ++M)
      (v = i[A[M].identifier]) && (ao(b), v("end", b, A[M]));
  }
  function S(b, A, T, M, v, C) {
    var $ = r.copy(), x = Ue(C || T, A), y, X, _;
    if ((_ = n.call(b, new ko("beforestart", {
      sourceEvent: T,
      target: u,
      identifier: v,
      active: s,
      x: x[0],
      y: x[1],
      dx: 0,
      dy: 0,
      dispatch: $
    }), M)) != null)
      return y = _.x - x[0] || 0, X = _.y - x[1] || 0, function L(N, B, W) {
        var P = x, k;
        switch (N) {
          case "start":
            i[v] = L, k = s++;
            break;
          case "end":
            delete i[v], --s;
          // falls through
          case "drag":
            x = Ue(W || B, A), k = s;
            break;
        }
        $.call(
          N,
          b,
          new ko(N, {
            sourceEvent: B,
            subject: _,
            target: u,
            identifier: v,
            active: k,
            x: x[0] + y,
            y: x[1] + X,
            dx: x[0] - P[0],
            dy: x[1] - P[1],
            dispatch: $
          }),
          M
        );
      };
  }
  return u.filter = function(b) {
    return arguments.length ? (t = typeof b == "function" ? b : yn(!!b), u) : t;
  }, u.container = function(b) {
    return arguments.length ? (e = typeof b == "function" ? b : yn(b), u) : e;
  }, u.subject = function(b) {
    return arguments.length ? (n = typeof b == "function" ? b : yn(b), u) : n;
  }, u.touchable = function(b) {
    return arguments.length ? (o = typeof b == "function" ? b : yn(!!b), u) : o;
  }, u.on = function() {
    var b = r.on.apply(r, arguments);
    return b === r ? u : b;
  }, u.clickDistance = function(b) {
    return arguments.length ? (f = (b = +b) * b, u) : Math.sqrt(f);
  }, u;
}
function Zo(t, e, n) {
  t.prototype = e.prototype = n, n.constructor = t;
}
function Xs(t, e) {
  var n = Object.create(t.prototype);
  for (var o in e) n[o] = e[o];
  return n;
}
function hn() {
}
var tn = 0.7, Dn = 1 / tn, Mt = "\\s*([+-]?\\d+)\\s*", nn = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Xe = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", Wl = /^#([0-9a-f]{3,8})$/, jl = new RegExp(`^rgb\\(${Mt},${Mt},${Mt}\\)$`), Ul = new RegExp(`^rgb\\(${Xe},${Xe},${Xe}\\)$`), Zl = new RegExp(`^rgba\\(${Mt},${Mt},${Mt},${nn}\\)$`), Gl = new RegExp(`^rgba\\(${Xe},${Xe},${Xe},${nn}\\)$`), Kl = new RegExp(`^hsl\\(${nn},${Xe},${Xe}\\)$`), Jl = new RegExp(`^hsla\\(${nn},${Xe},${Xe},${nn}\\)$`), bi = {
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
Zo(hn, on, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: xi,
  // Deprecated! Use color.formatHex.
  formatHex: xi,
  formatHex8: Ql,
  formatHsl: ec,
  formatRgb: Ei,
  toString: Ei
});
function xi() {
  return this.rgb().formatHex();
}
function Ql() {
  return this.rgb().formatHex8();
}
function ec() {
  return Ys(this).formatHsl();
}
function Ei() {
  return this.rgb().formatRgb();
}
function on(t) {
  var e, n;
  return t = (t + "").trim().toLowerCase(), (e = Wl.exec(t)) ? (n = e[1].length, e = parseInt(e[1], 16), n === 6 ? Si(e) : n === 3 ? new Me(e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, (e & 15) << 4 | e & 15, 1) : n === 8 ? wn(e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, (e & 255) / 255) : n === 4 ? wn(e >> 12 & 15 | e >> 8 & 240, e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, ((e & 15) << 4 | e & 15) / 255) : null) : (e = jl.exec(t)) ? new Me(e[1], e[2], e[3], 1) : (e = Ul.exec(t)) ? new Me(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, 1) : (e = Zl.exec(t)) ? wn(e[1], e[2], e[3], e[4]) : (e = Gl.exec(t)) ? wn(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, e[4]) : (e = Kl.exec(t)) ? ki(e[1], e[2] / 100, e[3] / 100, 1) : (e = Jl.exec(t)) ? ki(e[1], e[2] / 100, e[3] / 100, e[4]) : bi.hasOwnProperty(t) ? Si(bi[t]) : t === "transparent" ? new Me(NaN, NaN, NaN, 0) : null;
}
function Si(t) {
  return new Me(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function wn(t, e, n, o) {
  return o <= 0 && (t = e = n = NaN), new Me(t, e, n, o);
}
function tc(t) {
  return t instanceof hn || (t = on(t)), t ? (t = t.rgb(), new Me(t.r, t.g, t.b, t.opacity)) : new Me();
}
function Lo(t, e, n, o) {
  return arguments.length === 1 ? tc(t) : new Me(t, e, n, o ?? 1);
}
function Me(t, e, n, o) {
  this.r = +t, this.g = +e, this.b = +n, this.opacity = +o;
}
Zo(Me, Lo, Xs(hn, {
  brighter(t) {
    return t = t == null ? Dn : Math.pow(Dn, t), new Me(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? tn : Math.pow(tn, t), new Me(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Me(vt(this.r), vt(this.g), vt(this.b), Rn(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Ci,
  // Deprecated! Use color.formatHex.
  formatHex: Ci,
  formatHex8: nc,
  formatRgb: Pi,
  toString: Pi
}));
function Ci() {
  return `#${yt(this.r)}${yt(this.g)}${yt(this.b)}`;
}
function nc() {
  return `#${yt(this.r)}${yt(this.g)}${yt(this.b)}${yt((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Pi() {
  const t = Rn(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${vt(this.r)}, ${vt(this.g)}, ${vt(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function Rn(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function vt(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function yt(t) {
  return t = vt(t), (t < 16 ? "0" : "") + t.toString(16);
}
function ki(t, e, n, o) {
  return o <= 0 ? t = e = n = NaN : n <= 0 || n >= 1 ? t = e = NaN : e <= 0 && (t = NaN), new ze(t, e, n, o);
}
function Ys(t) {
  if (t instanceof ze) return new ze(t.h, t.s, t.l, t.opacity);
  if (t instanceof hn || (t = on(t)), !t) return new ze();
  if (t instanceof ze) return t;
  t = t.rgb();
  var e = t.r / 255, n = t.g / 255, o = t.b / 255, i = Math.min(e, n, o), r = Math.max(e, n, o), s = NaN, l = r - i, a = (r + i) / 2;
  return l ? (e === r ? s = (n - o) / l + (n < o) * 6 : n === r ? s = (o - e) / l + 2 : s = (e - n) / l + 4, l /= a < 0.5 ? r + i : 2 - r - i, s *= 60) : l = a > 0 && a < 1 ? 0 : s, new ze(s, l, a, t.opacity);
}
function oc(t, e, n, o) {
  return arguments.length === 1 ? Ys(t) : new ze(t, e, n, o ?? 1);
}
function ze(t, e, n, o) {
  this.h = +t, this.s = +e, this.l = +n, this.opacity = +o;
}
Zo(ze, oc, Xs(hn, {
  brighter(t) {
    return t = t == null ? Dn : Math.pow(Dn, t), new ze(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? tn : Math.pow(tn, t), new ze(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, e = isNaN(t) || isNaN(this.s) ? 0 : this.s, n = this.l, o = n + (n < 0.5 ? n : 1 - n) * e, i = 2 * n - o;
    return new Me(
      lo(t >= 240 ? t - 240 : t + 120, i, o),
      lo(t, i, o),
      lo(t < 120 ? t + 240 : t - 120, i, o),
      this.opacity
    );
  },
  clamp() {
    return new ze(Li(this.h), vn(this.s), vn(this.l), Rn(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = Rn(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${Li(this.h)}, ${vn(this.s) * 100}%, ${vn(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function Li(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function vn(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function lo(t, e, n) {
  return (t < 60 ? e + (n - e) * t / 60 : t < 180 ? n : t < 240 ? e + (n - e) * (240 - t) / 60 : e) * 255;
}
const Ws = (t) => () => t;
function ic(t, e) {
  return function(n) {
    return t + n * e;
  };
}
function sc(t, e, n) {
  return t = Math.pow(t, n), e = Math.pow(e, n) - t, n = 1 / n, function(o) {
    return Math.pow(t + o * e, n);
  };
}
function rc(t) {
  return (t = +t) == 1 ? js : function(e, n) {
    return n - e ? sc(e, n, t) : Ws(isNaN(e) ? n : e);
  };
}
function js(t, e) {
  var n = e - t;
  return n ? ic(t, n) : Ws(isNaN(t) ? e : t);
}
const Mo = (function t(e) {
  var n = rc(e);
  function o(i, r) {
    var s = n((i = Lo(i)).r, (r = Lo(r)).r), l = n(i.g, r.g), a = n(i.b, r.b), c = js(i.opacity, r.opacity);
    return function(d) {
      return i.r = s(d), i.g = l(d), i.b = a(d), i.opacity = c(d), i + "";
    };
  }
  return o.gamma = t, o;
})(1);
function it(t, e) {
  return t = +t, e = +e, function(n) {
    return t * (1 - n) + e * n;
  };
}
var To = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, co = new RegExp(To.source, "g");
function ac(t) {
  return function() {
    return t;
  };
}
function lc(t) {
  return function(e) {
    return t(e) + "";
  };
}
function cc(t, e) {
  var n = To.lastIndex = co.lastIndex = 0, o, i, r, s = -1, l = [], a = [];
  for (t = t + "", e = e + ""; (o = To.exec(t)) && (i = co.exec(e)); )
    (r = i.index) > n && (r = e.slice(n, r), l[s] ? l[s] += r : l[++s] = r), (o = o[0]) === (i = i[0]) ? l[s] ? l[s] += i : l[++s] = i : (l[++s] = null, a.push({ i: s, x: it(o, i) })), n = co.lastIndex;
  return n < e.length && (r = e.slice(n), l[s] ? l[s] += r : l[++s] = r), l.length < 2 ? a[0] ? lc(a[0].x) : ac(e) : (e = a.length, function(c) {
    for (var d = 0, f; d < e; ++d) l[(f = a[d]).i] = f.x(c);
    return l.join("");
  });
}
var Mi = 180 / Math.PI, Ao = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function Us(t, e, n, o, i, r) {
  var s, l, a;
  return (s = Math.sqrt(t * t + e * e)) && (t /= s, e /= s), (a = t * n + e * o) && (n -= t * a, o -= e * a), (l = Math.sqrt(n * n + o * o)) && (n /= l, o /= l, a /= l), t * o < e * n && (t = -t, e = -e, a = -a, s = -s), {
    translateX: i,
    translateY: r,
    rotate: Math.atan2(e, t) * Mi,
    skewX: Math.atan(a) * Mi,
    scaleX: s,
    scaleY: l
  };
}
var _n;
function dc(t) {
  const e = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return e.isIdentity ? Ao : Us(e.a, e.b, e.c, e.d, e.e, e.f);
}
function uc(t) {
  return t == null || (_n || (_n = document.createElementNS("http://www.w3.org/2000/svg", "g")), _n.setAttribute("transform", t), !(t = _n.transform.baseVal.consolidate())) ? Ao : (t = t.matrix, Us(t.a, t.b, t.c, t.d, t.e, t.f));
}
function Zs(t, e, n, o) {
  function i(c) {
    return c.length ? c.pop() + " " : "";
  }
  function r(c, d, f, u, h, p) {
    if (c !== f || d !== u) {
      var g = h.push("translate(", null, e, null, n);
      p.push({ i: g - 4, x: it(c, f) }, { i: g - 2, x: it(d, u) });
    } else (f || u) && h.push("translate(" + f + e + u + n);
  }
  function s(c, d, f, u) {
    c !== d ? (c - d > 180 ? d += 360 : d - c > 180 && (c += 360), u.push({ i: f.push(i(f) + "rotate(", null, o) - 2, x: it(c, d) })) : d && f.push(i(f) + "rotate(" + d + o);
  }
  function l(c, d, f, u) {
    c !== d ? u.push({ i: f.push(i(f) + "skewX(", null, o) - 2, x: it(c, d) }) : d && f.push(i(f) + "skewX(" + d + o);
  }
  function a(c, d, f, u, h, p) {
    if (c !== f || d !== u) {
      var g = h.push(i(h) + "scale(", null, ",", null, ")");
      p.push({ i: g - 4, x: it(c, f) }, { i: g - 2, x: it(d, u) });
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
var fc = Zs(dc, "px, ", "px)", "deg)"), hc = Zs(uc, ", ", ")", ")"), pc = 1e-12;
function Ti(t) {
  return ((t = Math.exp(t)) + 1 / t) / 2;
}
function gc(t) {
  return ((t = Math.exp(t)) - 1 / t) / 2;
}
function mc(t) {
  return ((t = Math.exp(2 * t)) - 1) / (t + 1);
}
const yc = (function t(e, n, o) {
  function i(r, s) {
    var l = r[0], a = r[1], c = r[2], d = s[0], f = s[1], u = s[2], h = d - l, p = f - a, g = h * h + p * p, w, m;
    if (g < pc)
      m = Math.log(u / c) / e, w = function(M) {
        return [
          l + M * h,
          a + M * p,
          c * Math.exp(e * M * m)
        ];
      };
    else {
      var E = Math.sqrt(g), S = (u * u - c * c + o * g) / (2 * c * n * E), b = (u * u - c * c - o * g) / (2 * u * n * E), A = Math.log(Math.sqrt(S * S + 1) - S), T = Math.log(Math.sqrt(b * b + 1) - b);
      m = (T - A) / e, w = function(M) {
        var v = M * m, C = Ti(A), $ = c / (n * E) * (C * mc(e * v + A) - gc(A));
        return [
          l + $ * h,
          a + $ * p,
          c * C / Ti(e * v + A)
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
var $t = 0, Ut = 0, Vt = 0, Gs = 1e3, Hn, Zt, Fn = 0, bt = 0, oo = 0, sn = typeof performance == "object" && performance.now ? performance : Date, Ks = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function Go() {
  return bt || (Ks(wc), bt = sn.now() + oo);
}
function wc() {
  bt = 0;
}
function zn() {
  this._call = this._time = this._next = null;
}
zn.prototype = Js.prototype = {
  constructor: zn,
  restart: function(t, e, n) {
    if (typeof t != "function") throw new TypeError("callback is not a function");
    n = (n == null ? Go() : +n) + (e == null ? 0 : +e), !this._next && Zt !== this && (Zt ? Zt._next = this : Hn = this, Zt = this), this._call = t, this._time = n, No();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, No());
  }
};
function Js(t, e, n) {
  var o = new zn();
  return o.restart(t, e, n), o;
}
function vc() {
  Go(), ++$t;
  for (var t = Hn, e; t; )
    (e = bt - t._time) >= 0 && t._call.call(void 0, e), t = t._next;
  --$t;
}
function Ai() {
  bt = (Fn = sn.now()) + oo, $t = Ut = 0;
  try {
    vc();
  } finally {
    $t = 0, bc(), bt = 0;
  }
}
function _c() {
  var t = sn.now(), e = t - Fn;
  e > Gs && (oo -= e, Fn = t);
}
function bc() {
  for (var t, e = Hn, n, o = 1 / 0; e; )
    e._call ? (o > e._time && (o = e._time), t = e, e = e._next) : (n = e._next, e._next = null, e = t ? t._next = n : Hn = n);
  Zt = t, No(o);
}
function No(t) {
  if (!$t) {
    Ut && (Ut = clearTimeout(Ut));
    var e = t - bt;
    e > 24 ? (t < 1 / 0 && (Ut = setTimeout(Ai, t - sn.now() - oo)), Vt && (Vt = clearInterval(Vt))) : (Vt || (Fn = sn.now(), Vt = setInterval(_c, Gs)), $t = 1, Ks(Ai));
  }
}
function Ni(t, e, n) {
  var o = new zn();
  return e = e == null ? 0 : +e, o.restart((i) => {
    o.stop(), t(i + e);
  }, e, n), o;
}
var xc = to("start", "end", "cancel", "interrupt"), Ec = [], Qs = 0, $i = 1, $o = 2, Mn = 3, Ii = 4, Io = 5, Tn = 6;
function io(t, e, n, o, i, r) {
  var s = t.__transition;
  if (!s) t.__transition = {};
  else if (n in s) return;
  Sc(t, n, {
    name: e,
    index: o,
    // For context during callback.
    group: i,
    // For context during callback.
    on: xc,
    tween: Ec,
    time: r.time,
    delay: r.delay,
    duration: r.duration,
    ease: r.ease,
    timer: null,
    state: Qs
  });
}
function Ko(t, e) {
  var n = Oe(t, e);
  if (n.state > Qs) throw new Error("too late; already scheduled");
  return n;
}
function Ye(t, e) {
  var n = Oe(t, e);
  if (n.state > Mn) throw new Error("too late; already running");
  return n;
}
function Oe(t, e) {
  var n = t.__transition;
  if (!n || !(n = n[e])) throw new Error("transition not found");
  return n;
}
function Sc(t, e, n) {
  var o = t.__transition, i;
  o[e] = n, n.timer = Js(r, 0, n.time);
  function r(c) {
    n.state = $i, n.timer.restart(s, n.delay, n.time), n.delay <= c && s(c - n.delay);
  }
  function s(c) {
    var d, f, u, h;
    if (n.state !== $i) return a();
    for (d in o)
      if (h = o[d], h.name === n.name) {
        if (h.state === Mn) return Ni(s);
        h.state === Ii ? (h.state = Tn, h.timer.stop(), h.on.call("interrupt", t, t.__data__, h.index, h.group), delete o[d]) : +d < e && (h.state = Tn, h.timer.stop(), h.on.call("cancel", t, t.__data__, h.index, h.group), delete o[d]);
      }
    if (Ni(function() {
      n.state === Mn && (n.state = Ii, n.timer.restart(l, n.delay, n.time), l(c));
    }), n.state = $o, n.on.call("start", t, t.__data__, n.index, n.group), n.state === $o) {
      for (n.state = Mn, i = new Array(u = n.tween.length), d = 0, f = -1; d < u; ++d)
        (h = n.tween[d].value.call(t, t.__data__, n.index, n.group)) && (i[++f] = h);
      i.length = f + 1;
    }
  }
  function l(c) {
    for (var d = c < n.duration ? n.ease.call(null, c / n.duration) : (n.timer.restart(a), n.state = Io, 1), f = -1, u = i.length; ++f < u; )
      i[f].call(t, d);
    n.state === Io && (n.on.call("end", t, t.__data__, n.index, n.group), a());
  }
  function a() {
    n.state = Tn, n.timer.stop(), delete o[e];
    for (var c in o) return;
    delete t.__transition;
  }
}
function An(t, e) {
  var n = t.__transition, o, i, r = !0, s;
  if (n) {
    e = e == null ? null : e + "";
    for (s in n) {
      if ((o = n[s]).name !== e) {
        r = !1;
        continue;
      }
      i = o.state > $o && o.state < Io, o.state = Tn, o.timer.stop(), o.on.call(i ? "interrupt" : "cancel", t, t.__data__, o.index, o.group), delete n[s];
    }
    r && delete t.__transition;
  }
}
function Cc(t) {
  return this.each(function() {
    An(this, t);
  });
}
function Pc(t, e) {
  var n, o;
  return function() {
    var i = Ye(this, t), r = i.tween;
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
function kc(t, e, n) {
  var o, i;
  if (typeof n != "function") throw new Error();
  return function() {
    var r = Ye(this, t), s = r.tween;
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
function Lc(t, e) {
  var n = this._id;
  if (t += "", arguments.length < 2) {
    for (var o = Oe(this.node(), n).tween, i = 0, r = o.length, s; i < r; ++i)
      if ((s = o[i]).name === t)
        return s.value;
    return null;
  }
  return this.each((e == null ? Pc : kc)(n, t, e));
}
function Jo(t, e, n) {
  var o = t._id;
  return t.each(function() {
    var i = Ye(this, o);
    (i.value || (i.value = {}))[e] = n.apply(this, arguments);
  }), function(i) {
    return Oe(i, o).value[e];
  };
}
function er(t, e) {
  var n;
  return (typeof e == "number" ? it : e instanceof on ? Mo : (n = on(e)) ? (e = n, Mo) : cc)(t, e);
}
function Mc(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function Tc(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Ac(t, e, n) {
  var o, i = n + "", r;
  return function() {
    var s = this.getAttribute(t);
    return s === i ? null : s === o ? r : r = e(o = s, n);
  };
}
function Nc(t, e, n) {
  var o, i = n + "", r;
  return function() {
    var s = this.getAttributeNS(t.space, t.local);
    return s === i ? null : s === o ? r : r = e(o = s, n);
  };
}
function $c(t, e, n) {
  var o, i, r;
  return function() {
    var s, l = n(this), a;
    return l == null ? void this.removeAttribute(t) : (s = this.getAttribute(t), a = l + "", s === a ? null : s === o && a === i ? r : (i = a, r = e(o = s, l)));
  };
}
function Ic(t, e, n) {
  var o, i, r;
  return function() {
    var s, l = n(this), a;
    return l == null ? void this.removeAttributeNS(t.space, t.local) : (s = this.getAttributeNS(t.space, t.local), a = l + "", s === a ? null : s === o && a === i ? r : (i = a, r = e(o = s, l)));
  };
}
function Dc(t, e) {
  var n = no(t), o = n === "transform" ? hc : er;
  return this.attrTween(t, typeof e == "function" ? (n.local ? Ic : $c)(n, o, Jo(this, "attr." + t, e)) : e == null ? (n.local ? Tc : Mc)(n) : (n.local ? Nc : Ac)(n, o, e));
}
function Rc(t, e) {
  return function(n) {
    this.setAttribute(t, e.call(this, n));
  };
}
function Hc(t, e) {
  return function(n) {
    this.setAttributeNS(t.space, t.local, e.call(this, n));
  };
}
function Fc(t, e) {
  var n, o;
  function i() {
    var r = e.apply(this, arguments);
    return r !== o && (n = (o = r) && Hc(t, r)), n;
  }
  return i._value = e, i;
}
function zc(t, e) {
  var n, o;
  function i() {
    var r = e.apply(this, arguments);
    return r !== o && (n = (o = r) && Rc(t, r)), n;
  }
  return i._value = e, i;
}
function Oc(t, e) {
  var n = "attr." + t;
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (e == null) return this.tween(n, null);
  if (typeof e != "function") throw new Error();
  var o = no(t);
  return this.tween(n, (o.local ? Fc : zc)(o, e));
}
function Vc(t, e) {
  return function() {
    Ko(this, t).delay = +e.apply(this, arguments);
  };
}
function Bc(t, e) {
  return e = +e, function() {
    Ko(this, t).delay = e;
  };
}
function qc(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? Vc : Bc)(e, t)) : Oe(this.node(), e).delay;
}
function Xc(t, e) {
  return function() {
    Ye(this, t).duration = +e.apply(this, arguments);
  };
}
function Yc(t, e) {
  return e = +e, function() {
    Ye(this, t).duration = e;
  };
}
function Wc(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? Xc : Yc)(e, t)) : Oe(this.node(), e).duration;
}
function jc(t, e) {
  if (typeof e != "function") throw new Error();
  return function() {
    Ye(this, t).ease = e;
  };
}
function Uc(t) {
  var e = this._id;
  return arguments.length ? this.each(jc(e, t)) : Oe(this.node(), e).ease;
}
function Zc(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    if (typeof n != "function") throw new Error();
    Ye(this, t).ease = n;
  };
}
function Gc(t) {
  if (typeof t != "function") throw new Error();
  return this.each(Zc(this._id, t));
}
function Kc(t) {
  typeof t != "function" && (t = Ns(t));
  for (var e = this._groups, n = e.length, o = new Array(n), i = 0; i < n; ++i)
    for (var r = e[i], s = r.length, l = o[i] = [], a, c = 0; c < s; ++c)
      (a = r[c]) && t.call(a, a.__data__, c, r) && l.push(a);
  return new Qe(o, this._parents, this._name, this._id);
}
function Jc(t) {
  if (t._id !== this._id) throw new Error();
  for (var e = this._groups, n = t._groups, o = e.length, i = n.length, r = Math.min(o, i), s = new Array(o), l = 0; l < r; ++l)
    for (var a = e[l], c = n[l], d = a.length, f = s[l] = new Array(d), u, h = 0; h < d; ++h)
      (u = a[h] || c[h]) && (f[h] = u);
  for (; l < o; ++l)
    s[l] = e[l];
  return new Qe(s, this._parents, this._name, this._id);
}
function Qc(t) {
  return (t + "").trim().split(/^|\s+/).every(function(e) {
    var n = e.indexOf(".");
    return n >= 0 && (e = e.slice(0, n)), !e || e === "start";
  });
}
function ed(t, e, n) {
  var o, i, r = Qc(e) ? Ko : Ye;
  return function() {
    var s = r(this, t), l = s.on;
    l !== o && (i = (o = l).copy()).on(e, n), s.on = i;
  };
}
function td(t, e) {
  var n = this._id;
  return arguments.length < 2 ? Oe(this.node(), n).on.on(t) : this.each(ed(n, t, e));
}
function nd(t) {
  return function() {
    var e = this.parentNode;
    for (var n in this.__transition) if (+n !== t) return;
    e && e.removeChild(this);
  };
}
function od() {
  return this.on("end.remove", nd(this._id));
}
function id(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = jo(t));
  for (var o = this._groups, i = o.length, r = new Array(i), s = 0; s < i; ++s)
    for (var l = o[s], a = l.length, c = r[s] = new Array(a), d, f, u = 0; u < a; ++u)
      (d = l[u]) && (f = t.call(d, d.__data__, u, l)) && ("__data__" in d && (f.__data__ = d.__data__), c[u] = f, io(c[u], e, n, u, c, Oe(d, n)));
  return new Qe(r, this._parents, e, n);
}
function sd(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = As(t));
  for (var o = this._groups, i = o.length, r = [], s = [], l = 0; l < i; ++l)
    for (var a = o[l], c = a.length, d, f = 0; f < c; ++f)
      if (d = a[f]) {
        for (var u = t.call(d, d.__data__, f, a), h, p = Oe(d, n), g = 0, w = u.length; g < w; ++g)
          (h = u[g]) && io(h, e, n, g, u, p);
        r.push(u), s.push(d);
      }
  return new Qe(r, s, e, n);
}
var rd = fn.prototype.constructor;
function ad() {
  return new rd(this._groups, this._parents);
}
function ld(t, e) {
  var n, o, i;
  return function() {
    var r = Nt(this, t), s = (this.style.removeProperty(t), Nt(this, t));
    return r === s ? null : r === n && s === o ? i : i = e(n = r, o = s);
  };
}
function tr(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function cd(t, e, n) {
  var o, i = n + "", r;
  return function() {
    var s = Nt(this, t);
    return s === i ? null : s === o ? r : r = e(o = s, n);
  };
}
function dd(t, e, n) {
  var o, i, r;
  return function() {
    var s = Nt(this, t), l = n(this), a = l + "";
    return l == null && (a = l = (this.style.removeProperty(t), Nt(this, t))), s === a ? null : s === o && a === i ? r : (i = a, r = e(o = s, l));
  };
}
function ud(t, e) {
  var n, o, i, r = "style." + e, s = "end." + r, l;
  return function() {
    var a = Ye(this, t), c = a.on, d = a.value[r] == null ? l || (l = tr(e)) : void 0;
    (c !== n || i !== d) && (o = (n = c).copy()).on(s, i = d), a.on = o;
  };
}
function fd(t, e, n) {
  var o = (t += "") == "transform" ? fc : er;
  return e == null ? this.styleTween(t, ld(t, o)).on("end.style." + t, tr(t)) : typeof e == "function" ? this.styleTween(t, dd(t, o, Jo(this, "style." + t, e))).each(ud(this._id, t)) : this.styleTween(t, cd(t, o, e), n).on("end.style." + t, null);
}
function hd(t, e, n) {
  return function(o) {
    this.style.setProperty(t, e.call(this, o), n);
  };
}
function pd(t, e, n) {
  var o, i;
  function r() {
    var s = e.apply(this, arguments);
    return s !== i && (o = (i = s) && hd(t, s, n)), o;
  }
  return r._value = e, r;
}
function gd(t, e, n) {
  var o = "style." + (t += "");
  if (arguments.length < 2) return (o = this.tween(o)) && o._value;
  if (e == null) return this.tween(o, null);
  if (typeof e != "function") throw new Error();
  return this.tween(o, pd(t, e, n ?? ""));
}
function md(t) {
  return function() {
    this.textContent = t;
  };
}
function yd(t) {
  return function() {
    var e = t(this);
    this.textContent = e ?? "";
  };
}
function wd(t) {
  return this.tween("text", typeof t == "function" ? yd(Jo(this, "text", t)) : md(t == null ? "" : t + ""));
}
function vd(t) {
  return function(e) {
    this.textContent = t.call(this, e);
  };
}
function _d(t) {
  var e, n;
  function o() {
    var i = t.apply(this, arguments);
    return i !== n && (e = (n = i) && vd(i)), e;
  }
  return o._value = t, o;
}
function bd(t) {
  var e = "text";
  if (arguments.length < 1) return (e = this.tween(e)) && e._value;
  if (t == null) return this.tween(e, null);
  if (typeof t != "function") throw new Error();
  return this.tween(e, _d(t));
}
function xd() {
  for (var t = this._name, e = this._id, n = nr(), o = this._groups, i = o.length, r = 0; r < i; ++r)
    for (var s = o[r], l = s.length, a, c = 0; c < l; ++c)
      if (a = s[c]) {
        var d = Oe(a, e);
        io(a, t, n, c, s, {
          time: d.time + d.delay + d.duration,
          delay: 0,
          duration: d.duration,
          ease: d.ease
        });
      }
  return new Qe(o, this._parents, t, n);
}
function Ed() {
  var t, e, n = this, o = n._id, i = n.size();
  return new Promise(function(r, s) {
    var l = { value: s }, a = { value: function() {
      --i === 0 && r();
    } };
    n.each(function() {
      var c = Ye(this, o), d = c.on;
      d !== t && (e = (t = d).copy(), e._.cancel.push(l), e._.interrupt.push(l), e._.end.push(a)), c.on = e;
    }), i === 0 && r();
  });
}
var Sd = 0;
function Qe(t, e, n, o) {
  this._groups = t, this._parents = e, this._name = n, this._id = o;
}
function nr() {
  return ++Sd;
}
var je = fn.prototype;
Qe.prototype = {
  constructor: Qe,
  select: id,
  selectAll: sd,
  selectChild: je.selectChild,
  selectChildren: je.selectChildren,
  filter: Kc,
  merge: Jc,
  selection: ad,
  transition: xd,
  call: je.call,
  nodes: je.nodes,
  node: je.node,
  size: je.size,
  empty: je.empty,
  each: je.each,
  on: td,
  attr: Dc,
  attrTween: Oc,
  style: fd,
  styleTween: gd,
  text: wd,
  textTween: bd,
  remove: od,
  tween: Lc,
  delay: qc,
  duration: Wc,
  ease: Uc,
  easeVarying: Gc,
  end: Ed,
  [Symbol.iterator]: je[Symbol.iterator]
};
const Cd = (t) => +t;
function Pd(t) {
  return t * t;
}
function kd(t) {
  return t * (2 - t);
}
function Ld(t) {
  return ((t *= 2) <= 1 ? t * t : --t * (2 - t) + 1) / 2;
}
function Md(t) {
  return t * t * t;
}
function Td(t) {
  return --t * t * t + 1;
}
function or(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var ir = Math.PI, sr = ir / 2;
function Ad(t) {
  return +t == 1 ? 1 : 1 - Math.cos(t * sr);
}
function Nd(t) {
  return Math.sin(t * sr);
}
function $d(t) {
  return (1 - Math.cos(ir * t)) / 2;
}
function ft(t) {
  return (Math.pow(2, -10 * t) - 9765625e-10) * 1.0009775171065494;
}
function Id(t) {
  return ft(1 - +t);
}
function Dd(t) {
  return 1 - ft(t);
}
function Rd(t) {
  return ((t *= 2) <= 1 ? ft(1 - t) : 2 - ft(t - 1)) / 2;
}
function Hd(t) {
  return 1 - Math.sqrt(1 - t * t);
}
function Fd(t) {
  return Math.sqrt(1 - --t * t);
}
function zd(t) {
  return ((t *= 2) <= 1 ? 1 - Math.sqrt(1 - t * t) : Math.sqrt(1 - (t -= 2) * t) + 1) / 2;
}
var Do = 4 / 11, Od = 6 / 11, Vd = 8 / 11, Bd = 3 / 4, qd = 9 / 11, Xd = 10 / 11, Yd = 15 / 16, Wd = 21 / 22, jd = 63 / 64, bn = 1 / Do / Do;
function Ud(t) {
  return 1 - On(1 - t);
}
function On(t) {
  return (t = +t) < Do ? bn * t * t : t < Vd ? bn * (t -= Od) * t + Bd : t < Xd ? bn * (t -= qd) * t + Yd : bn * (t -= Wd) * t + jd;
}
function Zd(t) {
  return ((t *= 2) <= 1 ? 1 - On(1 - t) : On(t - 1) + 1) / 2;
}
var Qo = 1.70158, Gd = (function t(e) {
  e = +e;
  function n(o) {
    return (o = +o) * o * (e * (o - 1) + o);
  }
  return n.overshoot = t, n;
})(Qo), Kd = (function t(e) {
  e = +e;
  function n(o) {
    return --o * o * ((o + 1) * e + o) + 1;
  }
  return n.overshoot = t, n;
})(Qo), Jd = (function t(e) {
  e = +e;
  function n(o) {
    return ((o *= 2) < 1 ? o * o * ((e + 1) * o - e) : (o -= 2) * o * ((e + 1) * o + e) + 2) / 2;
  }
  return n.overshoot = t, n;
})(Qo), It = 2 * Math.PI, ei = 1, ti = 0.3, Qd = (function t(e, n) {
  var o = Math.asin(1 / (e = Math.max(1, e))) * (n /= It);
  function i(r) {
    return e * ft(- --r) * Math.sin((o - r) / n);
  }
  return i.amplitude = function(r) {
    return t(r, n * It);
  }, i.period = function(r) {
    return t(e, r);
  }, i;
})(ei, ti), eu = (function t(e, n) {
  var o = Math.asin(1 / (e = Math.max(1, e))) * (n /= It);
  function i(r) {
    return 1 - e * ft(r = +r) * Math.sin((r + o) / n);
  }
  return i.amplitude = function(r) {
    return t(r, n * It);
  }, i.period = function(r) {
    return t(e, r);
  }, i;
})(ei, ti), tu = (function t(e, n) {
  var o = Math.asin(1 / (e = Math.max(1, e))) * (n /= It);
  function i(r) {
    return ((r = r * 2 - 1) < 0 ? e * ft(-r) * Math.sin((o - r) / n) : 2 - e * ft(r) * Math.sin((o + r) / n)) / 2;
  }
  return i.amplitude = function(r) {
    return t(r, n * It);
  }, i.period = function(r) {
    return t(e, r);
  }, i;
})(ei, ti), nu = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: or
};
function ou(t, e) {
  for (var n; !(n = t.__transition) || !(n = n[e]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${e} not found`);
  return n;
}
function iu(t) {
  var e, n;
  t instanceof Qe ? (e = t._id, t = t._name) : (e = nr(), (n = nu).time = Go(), t = t == null ? null : t + "");
  for (var o = this._groups, i = o.length, r = 0; r < i; ++r)
    for (var s = o[r], l = s.length, a, c = 0; c < l; ++c)
      (a = s[c]) && io(a, t, e, c, s, n || ou(a, e));
  return new Qe(o, this._parents, t, e);
}
fn.prototype.interrupt = Cc;
fn.prototype.transition = iu;
const xn = (t) => () => t;
function su(t, {
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
function Ge(t, e, n) {
  this.k = t, this.x = e, this.y = n;
}
Ge.prototype = {
  constructor: Ge,
  scale: function(t) {
    return t === 1 ? this : new Ge(this.k * t, this.x, this.y);
  },
  translate: function(t, e) {
    return t === 0 & e === 0 ? this : new Ge(this.k, this.x + this.k * t, this.y + this.k * e);
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
var Vn = new Ge(1, 0, 0);
Ge.prototype;
function uo(t) {
  t.stopImmediatePropagation();
}
function Bt(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function ru(t) {
  return (!t.ctrlKey || t.type === "wheel") && !t.button;
}
function au() {
  var t = this;
  return t instanceof SVGElement ? (t = t.ownerSVGElement || t, t.hasAttribute("viewBox") ? (t = t.viewBox.baseVal, [[t.x, t.y], [t.x + t.width, t.y + t.height]]) : [[0, 0], [t.width.baseVal.value, t.height.baseVal.value]]) : [[0, 0], [t.clientWidth, t.clientHeight]];
}
function Di() {
  return this.__zoom || Vn;
}
function lu(t) {
  return -t.deltaY * (t.deltaMode === 1 ? 0.05 : t.deltaMode ? 1 : 2e-3) * (t.ctrlKey ? 10 : 1);
}
function cu() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function du(t, e, n) {
  var o = t.invertX(e[0][0]) - n[0][0], i = t.invertX(e[1][0]) - n[1][0], r = t.invertY(e[0][1]) - n[0][1], s = t.invertY(e[1][1]) - n[1][1];
  return t.translate(
    i > o ? (o + i) / 2 : Math.min(0, o) || Math.max(0, i),
    s > r ? (r + s) / 2 : Math.min(0, r) || Math.max(0, s)
  );
}
function uu() {
  var t = ru, e = au, n = du, o = lu, i = cu, r = [0, 1 / 0], s = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], l = 250, a = yc, c = to("start", "zoom", "end"), d, f, u, h = 500, p = 150, g = 0, w = 10;
  function m(_) {
    _.property("__zoom", Di).on("wheel.zoom", v, { passive: !1 }).on("mousedown.zoom", C).on("dblclick.zoom", $).filter(i).on("touchstart.zoom", x).on("touchmove.zoom", y).on("touchend.zoom touchcancel.zoom", X).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  m.transform = function(_, L, N, B) {
    var W = _.selection ? _.selection() : _;
    W.property("__zoom", Di), _ !== W ? A(_, L, N, B) : W.interrupt().each(function() {
      T(this, arguments).event(B).start().zoom(null, typeof L == "function" ? L.apply(this, arguments) : L).end();
    });
  }, m.scaleBy = function(_, L, N, B) {
    m.scaleTo(_, function() {
      var W = this.__zoom.k, P = typeof L == "function" ? L.apply(this, arguments) : L;
      return W * P;
    }, N, B);
  }, m.scaleTo = function(_, L, N, B) {
    m.transform(_, function() {
      var W = e.apply(this, arguments), P = this.__zoom, k = N == null ? b(W) : typeof N == "function" ? N.apply(this, arguments) : N, I = P.invert(k), te = typeof L == "function" ? L.apply(this, arguments) : L;
      return n(S(E(P, te), k, I), W, s);
    }, N, B);
  }, m.translateBy = function(_, L, N, B) {
    m.transform(_, function() {
      return n(this.__zoom.translate(
        typeof L == "function" ? L.apply(this, arguments) : L,
        typeof N == "function" ? N.apply(this, arguments) : N
      ), e.apply(this, arguments), s);
    }, null, B);
  }, m.translateTo = function(_, L, N, B, W) {
    m.transform(_, function() {
      var P = e.apply(this, arguments), k = this.__zoom, I = B == null ? b(P) : typeof B == "function" ? B.apply(this, arguments) : B;
      return n(Vn.translate(I[0], I[1]).scale(k.k).translate(
        typeof L == "function" ? -L.apply(this, arguments) : -L,
        typeof N == "function" ? -N.apply(this, arguments) : -N
      ), P, s);
    }, B, W);
  };
  function E(_, L) {
    return L = Math.max(r[0], Math.min(r[1], L)), L === _.k ? _ : new Ge(L, _.x, _.y);
  }
  function S(_, L, N) {
    var B = L[0] - N[0] * _.k, W = L[1] - N[1] * _.k;
    return B === _.x && W === _.y ? _ : new Ge(_.k, B, W);
  }
  function b(_) {
    return [(+_[0][0] + +_[1][0]) / 2, (+_[0][1] + +_[1][1]) / 2];
  }
  function A(_, L, N, B) {
    _.on("start.zoom", function() {
      T(this, arguments).event(B).start();
    }).on("interrupt.zoom end.zoom", function() {
      T(this, arguments).event(B).end();
    }).tween("zoom", function() {
      var W = this, P = arguments, k = T(W, P).event(B), I = e.apply(W, P), te = N == null ? b(I) : typeof N == "function" ? N.apply(W, P) : N, se = Math.max(I[1][0] - I[0][0], I[1][1] - I[0][1]), ie = W.__zoom, K = typeof L == "function" ? L.apply(W, P) : L, ae = a(ie.invert(te).concat(se / ie.k), K.invert(te).concat(se / K.k));
      return function(de) {
        if (de === 1) de = K;
        else {
          var le = ae(de), Z = se / le[2];
          de = new Ge(Z, te[0] - le[0] * Z, te[1] - le[1] * Z);
        }
        k.zoom(null, de);
      };
    });
  }
  function T(_, L, N) {
    return !N && _.__zooming || new M(_, L);
  }
  function M(_, L) {
    this.that = _, this.args = L, this.active = 0, this.sourceEvent = null, this.extent = e.apply(_, L), this.taps = 0;
  }
  M.prototype = {
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
      var L = Fe(this.that).datum();
      c.call(
        _,
        this.that,
        new su(_, {
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
    var N = T(this, L).event(_), B = this.__zoom, W = Math.max(r[0], Math.min(r[1], B.k * Math.pow(2, o.apply(this, arguments)))), P = Ue(_);
    if (N.wheel)
      (N.mouse[0][0] !== P[0] || N.mouse[0][1] !== P[1]) && (N.mouse[1] = B.invert(N.mouse[0] = P)), clearTimeout(N.wheel);
    else {
      if (B.k === W) return;
      N.mouse = [P, B.invert(P)], An(this), N.start();
    }
    Bt(_), N.wheel = setTimeout(k, p), N.zoom("mouse", n(S(E(B, W), N.mouse[0], N.mouse[1]), N.extent, s));
    function k() {
      N.wheel = null, N.end();
    }
  }
  function C(_, ...L) {
    if (u || !t.apply(this, arguments)) return;
    var N = _.currentTarget, B = T(this, L, !0).event(_), W = Fe(_.view).on("mousemove.zoom", te, !0).on("mouseup.zoom", se, !0), P = Ue(_, N), k = _.clientX, I = _.clientY;
    Bs(_.view), uo(_), B.mouse = [P, this.__zoom.invert(P)], An(this), B.start();
    function te(ie) {
      if (Bt(ie), !B.moved) {
        var K = ie.clientX - k, ae = ie.clientY - I;
        B.moved = K * K + ae * ae > g;
      }
      B.event(ie).zoom("mouse", n(S(B.that.__zoom, B.mouse[0] = Ue(ie, N), B.mouse[1]), B.extent, s));
    }
    function se(ie) {
      W.on("mousemove.zoom mouseup.zoom", null), qs(ie.view, B.moved), Bt(ie), B.event(ie).end();
    }
  }
  function $(_, ...L) {
    if (t.apply(this, arguments)) {
      var N = this.__zoom, B = Ue(_.changedTouches ? _.changedTouches[0] : _, this), W = N.invert(B), P = N.k * (_.shiftKey ? 0.5 : 2), k = n(S(E(N, P), B, W), e.apply(this, L), s);
      Bt(_), l > 0 ? Fe(this).transition().duration(l).call(A, k, B, _) : Fe(this).call(m.transform, k, B, _);
    }
  }
  function x(_, ...L) {
    if (t.apply(this, arguments)) {
      var N = _.touches, B = N.length, W = T(this, L, _.changedTouches.length === B).event(_), P, k, I, te;
      for (uo(_), k = 0; k < B; ++k)
        I = N[k], te = Ue(I, this), te = [te, this.__zoom.invert(te), I.identifier], W.touch0 ? !W.touch1 && W.touch0[2] !== te[2] && (W.touch1 = te, W.taps = 0) : (W.touch0 = te, P = !0, W.taps = 1 + !!d);
      d && (d = clearTimeout(d)), P && (W.taps < 2 && (f = te[0], d = setTimeout(function() {
        d = null;
      }, h)), An(this), W.start());
    }
  }
  function y(_, ...L) {
    if (this.__zooming) {
      var N = T(this, L).event(_), B = _.changedTouches, W = B.length, P, k, I, te;
      for (Bt(_), P = 0; P < W; ++P)
        k = B[P], I = Ue(k, this), N.touch0 && N.touch0[2] === k.identifier ? N.touch0[0] = I : N.touch1 && N.touch1[2] === k.identifier && (N.touch1[0] = I);
      if (k = N.that.__zoom, N.touch1) {
        var se = N.touch0[0], ie = N.touch0[1], K = N.touch1[0], ae = N.touch1[1], de = (de = K[0] - se[0]) * de + (de = K[1] - se[1]) * de, le = (le = ae[0] - ie[0]) * le + (le = ae[1] - ie[1]) * le;
        k = E(k, Math.sqrt(de / le)), I = [(se[0] + K[0]) / 2, (se[1] + K[1]) / 2], te = [(ie[0] + ae[0]) / 2, (ie[1] + ae[1]) / 2];
      } else if (N.touch0) I = N.touch0[0], te = N.touch0[1];
      else return;
      N.zoom("touch", n(S(k, I, te), N.extent, s));
    }
  }
  function X(_, ...L) {
    if (this.__zooming) {
      var N = T(this, L).event(_), B = _.changedTouches, W = B.length, P, k;
      for (uo(_), u && clearTimeout(u), u = setTimeout(function() {
        u = null;
      }, h), P = 0; P < W; ++P)
        k = B[P], N.touch0 && N.touch0[2] === k.identifier ? delete N.touch0 : N.touch1 && N.touch1[2] === k.identifier && delete N.touch1;
      if (N.touch1 && !N.touch0 && (N.touch0 = N.touch1, delete N.touch1), N.touch0) N.touch0[1] = this.__zoom.invert(N.touch0[0]);
      else if (N.end(), N.taps === 2 && (k = Ue(k, this), Math.hypot(f[0] - k[0], f[1] - k[1]) < w)) {
        var I = Fe(this).on("dblclick.zoom");
        I && I.apply(this, arguments);
      }
    }
  }
  return m.wheelDelta = function(_) {
    return arguments.length ? (o = typeof _ == "function" ? _ : xn(+_), m) : o;
  }, m.filter = function(_) {
    return arguments.length ? (t = typeof _ == "function" ? _ : xn(!!_), m) : t;
  }, m.touchable = function(_) {
    return arguments.length ? (i = typeof _ == "function" ? _ : xn(!!_), m) : i;
  }, m.extent = function(_) {
    return arguments.length ? (e = typeof _ == "function" ? _ : xn([[+_[0][0], +_[0][1]], [+_[1][0], +_[1][1]]]), m) : e;
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
function Ri(t) {
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
function fu(t, e) {
  const {
    onTransformChange: n,
    minZoom: o = 0.5,
    maxZoom: i = 2,
    pannable: r = !0,
    zoomable: s = !0
  } = e, l = Fe(t);
  let a = !1;
  const c = e.panActivationKeyCode !== void 0 ? e.panActivationKeyCode : "Space", d = (M) => {
    c && M.code === c && (a = !0, t.style.cursor = "grab");
  }, f = (M) => {
    c && M.code === c && (a = !1, t.style.cursor = "");
  }, u = () => {
    a = !1, t.style.cursor = "";
  };
  c && (window.addEventListener("keydown", d), window.addEventListener("keyup", f), window.addEventListener("blur", u));
  const h = uu().scaleExtent([o, i]).on("start", (M) => {
    if (!M.sourceEvent) return;
    a && (t.style.cursor = "grabbing");
    const { x: v, y: C, k: $ } = M.transform;
    e.onMoveStart?.({ x: v, y: C, zoom: $ });
  }).on("zoom", (M) => {
    const { x: v, y: C, k: $ } = M.transform;
    n({ x: v, y: C, zoom: $ }), M.sourceEvent && e.onMove?.({ x: v, y: C, zoom: $ });
  }).on("end", (M) => {
    if (!M.sourceEvent) return;
    a && (t.style.cursor = "grab");
    const { x: v, y: C, k: $ } = M.transform;
    e.onMoveEnd?.({ x: v, y: C, zoom: $ });
  });
  e.translateExtent && h.translateExtent(e.translateExtent), h.filter(Ri({
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
  const E = e.zoomActivationKeyCode !== void 0 ? e.zoomActivationKeyCode : null, S = (M) => {
    E && M.code === E && (m = !0);
  }, b = (M) => {
    E && M.code === E && (m = !1);
  }, A = () => {
    m = !1;
  };
  E && (window.addEventListener("keydown", S), window.addEventListener("keyup", b), window.addEventListener("blur", A));
  const T = (M) => {
    if (e.isLocked?.()) return;
    const v = M.ctrlKey || M.metaKey || m;
    if (!(p ? !v : M.shiftKey)) return;
    M.preventDefault(), M.stopPropagation();
    const $ = w;
    let x = 0, y = 0;
    g !== "horizontal" && (y = -M.deltaY * $), g !== "vertical" && (x = -M.deltaX * $, M.shiftKey && M.deltaX === 0 && g === "both" && (x = -M.deltaY * $, y = 0)), e.onScrollPan?.(x, y);
  };
  return t.addEventListener("wheel", T, { passive: !1, capture: !0 }), {
    setViewport(M, v) {
      const C = v?.duration ?? 0, $ = Vn.translate(M.x ?? 0, M.y ?? 0).scale(M.zoom ?? 1);
      C > 0 ? l.transition().duration(C).call(h.transform, $) : l.call(h.transform, $);
    },
    getTransform() {
      return t.__zoom ?? Vn;
    },
    update(M) {
      if ((M.minZoom !== void 0 || M.maxZoom !== void 0) && h.scaleExtent([
        M.minZoom ?? o,
        M.maxZoom ?? i
      ]), M.pannable !== void 0 || M.zoomable !== void 0) {
        const v = M.pannable ?? r, C = M.zoomable ?? s;
        h.filter(Ri({
          pannable: v,
          zoomable: C,
          isLocked: e.isLocked,
          noPanClassName: e.noPanClassName,
          noWheelClassName: e.noWheelClassName,
          isTouchSelectionMode: e.isTouchSelectionMode,
          isPanKeyHeld: () => a,
          panOnDrag: e.panOnDrag
        }));
      }
      M.panOnScroll !== void 0 && (p = M.panOnScroll), M.panOnScrollDirection !== void 0 && (g = M.panOnScrollDirection), M.panOnScrollSpeed !== void 0 && (w = M.panOnScrollSpeed);
    },
    destroy() {
      t.removeEventListener("wheel", T, { capture: !0 }), c && (window.removeEventListener("keydown", d), window.removeEventListener("keyup", f), window.removeEventListener("blur", u)), E && (window.removeEventListener("keydown", S), window.removeEventListener("keyup", b), window.removeEventListener("blur", A)), l.on(".zoom", null);
    }
  };
}
function rr(t, e, n, o) {
  return {
    x: (t - o.left - n.x) / n.zoom,
    y: (e - o.top - n.y) / n.zoom
  };
}
function hu(t, e, n, o) {
  return {
    x: t * n.zoom + n.x + o.left,
    y: e * n.zoom + n.y + o.top
  };
}
const ve = 150, _e = 50;
function so(t, e, n, o, i) {
  if (i % 360 === 0) return { x: t, y: e, width: n, height: o };
  const r = i * Math.PI / 180, s = Math.abs(Math.cos(r)), l = Math.abs(Math.sin(r)), a = n * s + o * l, c = n * l + o * s, d = t + n / 2, f = e + o / 2;
  return { x: d - a / 2, y: f - c / 2, width: a, height: c };
}
function Dt(t, e) {
  if (t.length === 0)
    return { x: 0, y: 0, width: 0, height: 0 };
  let n = 1 / 0, o = 1 / 0, i = -1 / 0, r = -1 / 0;
  for (const s of t) {
    const l = s.dimensions?.width ?? ve, a = s.dimensions?.height ?? _e, c = zt(s, e), d = s.rotation ? so(c.x, c.y, l, a, s.rotation) : { x: c.x, y: c.y, width: l, height: a };
    n = Math.min(n, d.x), o = Math.min(o, d.y), i = Math.max(i, d.x + d.width), r = Math.max(r, d.y + d.height);
  }
  return {
    x: n,
    y: o,
    width: i - n,
    height: r - o
  };
}
function pu(t, e, n) {
  const o = e.x + e.width, i = e.y + e.height;
  return t.filter((r) => {
    const s = r.dimensions?.width ?? ve, l = r.dimensions?.height ?? _e, a = zt(r, n), c = r.rotation ? so(a.x, a.y, s, l, r.rotation) : { x: a.x, y: a.y, width: s, height: l }, d = c.x + c.width, f = c.y + c.height;
    return !(d < e.x || c.x > o || f < e.y || c.y > i);
  });
}
function gu(t, e, n) {
  const o = e.x + e.width, i = e.y + e.height;
  return t.filter((r) => {
    const s = r.dimensions?.width ?? ve, l = r.dimensions?.height ?? _e, a = zt(r, n), c = r.rotation ? so(a.x, a.y, s, l, r.rotation) : { x: a.x, y: a.y, width: s, height: l };
    return c.x >= e.x && c.y >= e.y && c.x + c.width <= o && c.y + c.height <= i;
  });
}
function Bn(t, e, n, o, i, r = 0.1) {
  const s = Math.max(t.width, 1), l = Math.max(t.height, 1), a = s * (1 + r), c = l * (1 + r), d = e / a, f = n / c, u = Math.min(Math.max(Math.min(d, f), o), i), h = { x: t.x + s / 2, y: t.y + l / 2 }, p = e / 2 - h.x * u, g = n / 2 - h.y * u;
  return { x: p, y: g, zoom: u };
}
function mu(t, e, n, o) {
  const i = 1 / t.zoom;
  return {
    minX: (0 - t.x) * i - o,
    minY: (0 - t.y) * i - o,
    maxX: (e - t.x) * i + o,
    maxY: (n - t.y) * i + o
  };
}
function zt(t, e) {
  if (!t.position) return { x: 0, y: 0 };
  const n = t.nodeOrigin ?? e ?? [0, 0], o = t.dimensions?.width ?? ve, i = t.dimensions?.height ?? _e;
  return {
    x: t.position.x - o * n[0],
    y: t.position.y - i * n[1]
  };
}
let ar = !1;
function lr(t) {
  ar = t;
}
function V(t, e, n) {
  if (!ar) return;
  const o = `%c[AlpineFlow:${t}]`, i = yu(t);
  n !== void 0 ? console.log(o, i, e, n) : console.log(o, i, e);
}
function yu(t) {
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
const rn = "#64748b", ni = "#d4d4d8", cr = "#ef4444", wu = "2", vu = "6 3", Hi = 1.2, Ro = 0.2, Nn = 5, Fi = 25;
function fo(t) {
  return JSON.parse(JSON.stringify(t));
}
class _u {
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
    this._suspendDepth > 0 || (this.past.push(fo(e)), this.future = [], this.past.length > this.maxSize && this.past.shift());
  }
  undo(e) {
    return this.past.length === 0 ? null : (this.future.push(fo(e)), this.past.pop());
  }
  redo(e) {
    return this.future.length === 0 ? null : (this.past.push(fo(e)), this.future.pop());
  }
  get canUndo() {
    return this.past.length > 0;
  }
  get canRedo() {
    return this.future.length > 0;
  }
}
const bu = 16;
function xu() {
  return typeof requestAnimationFrame == "function" ? {
    request: (t) => requestAnimationFrame(t),
    cancel: (t) => cancelAnimationFrame(t)
  } : {
    request: (t) => setTimeout(() => t(performance.now()), bu),
    cancel: (t) => clearTimeout(t)
  };
}
class dr {
  constructor() {
    this._scheduler = xu(), this._entries = [], this._postTickCallbacks = [], this._frameId = null, this._running = !1;
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
const qn = new dr(), Eu = {
  linear: Cd,
  easeIn: Pd,
  easeOut: kd,
  easeInOut: Ld,
  easeCubicIn: Md,
  easeCubicOut: Td,
  easeCubicInOut: or,
  easeCircIn: Hd,
  easeCircOut: Fd,
  easeCircInOut: zd,
  easeSinIn: Ad,
  easeSinOut: Nd,
  easeSinInOut: $d,
  easeExpoIn: Id,
  easeExpoOut: Dd,
  easeExpoInOut: Rd,
  easeBounce: On,
  easeBounceIn: Ud,
  easeBounceInOut: Zd,
  easeElastic: eu,
  easeElasticIn: Qd,
  easeElasticInOut: tu,
  easeBack: Jd,
  easeBackIn: Gd,
  easeBackOut: Kd
};
function ur(t) {
  const e = t ?? "auto";
  return e === !1 ? !1 : e === !0 ? !0 : typeof globalThis < "u" && globalThis.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches === !0;
}
function Xn(t) {
  return typeof t == "function" ? t : Eu[t ?? "easeInOut"];
}
function Je(t, e, n) {
  return t + (e - t) * n;
}
function oi(t, e, n) {
  return Mo(t, e)(n);
}
function an(t) {
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
const zi = /^(-?\d+\.?\d*)(px|em|rem|%|vh|vw|pt|cm|mm|in|ex|ch)?$/, Oi = /^(#|rgb|hsl)/;
function fr(t, e, n) {
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
    const a = zi.exec(s), c = zi.exec(l);
    if (a && c) {
      const d = parseFloat(a[1]), f = parseFloat(c[1]), u = c[2] ?? "", h = Je(d, f, n);
      o[r] = u ? `${h}${u}` : String(h);
      continue;
    }
    if (Oi.test(s) && Oi.test(l)) {
      o[r] = oi(s, l, n);
      continue;
    }
    o[r] = n < 0.5 ? s : l;
  }
  return o;
}
function Su(t, e, n, o) {
  let i = Je(t.zoom, e.zoom, n);
  return o?.minZoom !== void 0 && (i = Math.max(i, o.minZoom)), o?.maxZoom !== void 0 && (i = Math.min(i, o.maxZoom)), {
    x: Je(t.x, e.x, n),
    y: Je(t.y, e.y, n),
    zoom: i
  };
}
class Cu {
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
class Pu {
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
const qt = {
  stiffness: 180,
  damping: 12,
  mass: 1,
  restVelocity: 0.01,
  restDisplacement: 0.01
};
function hr(t, e, n) {
  if (n <= 0)
    return;
  const o = e.stiffness ?? qt.stiffness, i = e.damping ?? qt.damping, r = e.mass ?? qt.mass, s = t.value - t.target, l = (-o * s - i * t.velocity) / r;
  t.velocity += l * n, t.value += t.velocity * n, Math.abs(t.velocity) < (e.restVelocity ?? qt.restVelocity) && Math.abs(t.value - t.target) < (e.restDisplacement ?? qt.restDisplacement) && (t.value = t.target, t.velocity = 0, t.settled = !0);
}
const Vi = {
  timeConstant: 350,
  restVelocity: 0.5
};
function ii(t, e, n) {
  if (n <= 0)
    return;
  const o = e.timeConstant ?? Vi.timeConstant, i = Math.exp(-n * 1e3 / o);
  t.velocity *= i, t.value += t.velocity * n, Math.abs(t.velocity) < Vi.restVelocity && (t.velocity = 0, t.settled = !0, t.target = t.value);
}
function si(t) {
  const e = t.lastIndexOf("."), n = t.lastIndexOf(":"), o = Math.max(e, n);
  if (o < 0) return null;
  const i = t.slice(o + 1);
  return i.length === 0 || i.length > 6 ? null : i;
}
function pr(t, e, n, o) {
  if (n <= 0)
    return;
  ii(t, {
    velocity: t.velocity,
    power: e.power,
    timeConstant: e.timeConstant
  }, n);
  const i = o ? si(o) : null;
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
function gr(t, e, n, o) {
  const i = si(o), r = e.values.map(
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
const Bi = {
  gentle: { type: "spring", stiffness: 120, damping: 14 },
  wobbly: { type: "spring", stiffness: 180, damping: 12 },
  stiff: { type: "spring", stiffness: 300, damping: 30 },
  slow: { type: "spring", stiffness: 60, damping: 15 },
  molasses: { type: "spring", stiffness: 40, damping: 30 }
}, qi = {
  smooth: { type: "decay", velocity: 0, power: 0.6, timeConstant: 400 },
  snappy: { type: "decay", velocity: 0, power: 1.2, timeConstant: 200 }
}, Xi = {
  momentum: { type: "inertia", velocity: 0, power: 0.8, timeConstant: 700 },
  rails: { type: "inertia", velocity: 0, bounceStiffness: 500, bounceDamping: 40 }
};
function mr(t) {
  if (typeof t != "string")
    return t;
  const [e, n] = t.split(".");
  if (!n)
    return null;
  switch (e) {
    case "spring":
      return Bi[n] ? { ...Bi[n] } : null;
    case "decay":
      return qi[n] ? { ...qi[n] } : null;
    case "inertia":
      return Xi[n] ? { ...Xi[n] } : null;
    default:
      return null;
  }
}
function Yi(t) {
  return typeof t != "string" ? !1 : /^(#|rgb|hsl)/.test(t);
}
function ku(t, e, n) {
  return typeof t == "number" && typeof e == "number" ? Je(t, e, n) : Yi(t) && Yi(e) ? oi(t, e, n) : n < 0.5 ? t : e;
}
class Lu {
  constructor(e) {
    this._ownership = /* @__PURE__ */ new Map(), this._groups = /* @__PURE__ */ new Set(), this._nextGroupId = 0, this._registry = new Cu(), this._activeTransaction = null, this._engine = e;
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
    const e = new Pu();
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
    } = n, m = Xn(i), E = g ? mr(g) : void 0;
    for (const _ of e) {
      const L = this._ownership.get(_.key);
      if (L && !L.stopped) {
        const N = L.currentValues.get(_.key);
        N !== void 0 && (_.from = N), L.entries = L.entries.filter((B) => B.key !== _.key), L.entries.length === 0 && this._stop(L, "superseded");
      }
    }
    if (this._activeTransaction && this._activeTransaction.state === "active")
      for (const _ of e)
        this._activeTransaction.captureProperty(_.key, _.from, _.apply);
    if (o <= 0) {
      const _ = /* @__PURE__ */ new Map(), L = /* @__PURE__ */ new Map();
      for (const W of e)
        _.set(W.key, W.from), L.set(W.key, W.to);
      a?.();
      for (const W of e)
        W.apply(W.to);
      const N = [...f ? [f] : [], ...u ?? []], B = {
        _tags: N.length > 0 ? N : void 0,
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
      return this._registry.register(B), queueMicrotask(() => this._registry.unregister(B)), this._activeTransaction && this._activeTransaction.state === "active" && this._activeTransaction.trackHandle(B), d?.(), B;
    }
    const S = /* @__PURE__ */ new Map(), b = /* @__PURE__ */ new Map();
    for (const _ of e)
      S.set(_.key, _.from), b.set(_.key, _.to);
    let A;
    if (E) {
      A = /* @__PURE__ */ new Map();
      for (const _ of e) {
        if (typeof _.from != "number" || typeof _.to != "number") {
          console.warn(
            `[AlpineFlow] motion: requires numeric properties. "${_.key}" is non-numeric; snapping to target.`
          ), _.apply(_.to);
          continue;
        }
        let L = 0;
        if (E.type === "decay" || E.type === "inertia") {
          const N = E.velocity;
          if (typeof N == "number")
            L = N;
          else if (N && typeof N == "object") {
            const W = N, P = si(_.key);
            L = W[_.key] ?? (P ? W[P] ?? 0 : 0);
          }
          const B = E.power ?? 0.8;
          L *= B;
        }
        A.set(_.key, {
          value: _.from,
          velocity: L,
          target: _.to,
          settled: !1
        });
      }
      A.size === 0 && (A = void 0);
    }
    const T = s === "ping-pong" ? "reverse" : s, M = l === "end" ? "backward" : "forward";
    let v;
    const C = new Promise((_) => {
      v = _;
    }), $ = {
      _id: this._nextGroupId++,
      entries: [...e],
      engineHandle: null,
      startTime: 0,
      pausedElapsed: null,
      _resumeNeeded: !1,
      direction: M,
      duration: o,
      easingFn: m,
      loop: T,
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
      snapshot: S,
      target: b,
      _currentFinished: C,
      whilePredicate: h,
      whileStopMode: p,
      motionConfig: A ? E : void 0,
      physicsStates: A,
      maxDuration: w,
      isPhysics: !!A,
      _prevElapsed: 0
    };
    if (l === "end")
      for (const _ of $.entries)
        _.apply(_.to), $.currentValues.set(_.key, _.to);
    else
      for (const _ of $.entries)
        $.currentValues.set(_.key, _.from);
    for (const _ of e)
      this._ownership.set(_.key, $);
    this._groups.add($);
    const x = this._engine.register((_) => this._tick($, _), r);
    $.engineHandle = x;
    const y = [...f ? [f] : [], ...u ?? []], X = {
      _tags: y.length > 0 ? y : void 0,
      pause: () => this._pause($),
      resume: () => this._resume($),
      stop: (_) => this._stop($, _?.mode ?? "jump-end"),
      reverse: () => this._reverse($),
      play: () => this._play($),
      playForward: () => this._playDirection($, "forward"),
      playBackward: () => this._playDirection($, "backward"),
      restart: (_) => this._restart($, _),
      get direction() {
        return $.direction;
      },
      get isFinished() {
        return $.isFinished;
      },
      get currentValue() {
        return $.currentValues;
      },
      get finished() {
        return $._currentFinished;
      },
      get _snapshot() {
        return $.snapshot;
      },
      get _target() {
        return $.target;
      }
    };
    return this._registry.register(X), $._handle = X, this._activeTransaction && this._activeTransaction.state === "active" && this._activeTransaction.trackHandle(X), X;
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
      const a = ku(l.from, l.to, s);
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
              hr(d, e.motionConfig, i);
              break;
            case "decay":
              ii(d, e.motionConfig, i);
              break;
            case "inertia":
              pr(d, e.motionConfig, i, c.key);
              break;
            case "keyframes": {
              const f = n - e.startTime, u = e.motionConfig.duration ?? e.maxDuration, h = Math.min(f / u, 1);
              gr(d, e.motionConfig, h, c.key);
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
const yr = /* @__PURE__ */ new Map();
function Mu(t, e) {
  yr.set(t, e);
}
function ho(t) {
  return t.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function ln(t) {
  return typeof t == "string" ? { type: t } : t;
}
function cn(t, e) {
  return `${e}__${t.type}__${(t.color ?? ni).replace(/[^a-zA-Z0-9]/g, "_")}`;
}
function Yn(t, e) {
  const n = ho(t.color ?? ni), o = Number(t.width ?? 12.5), i = Number(t.height ?? 12.5), r = Number.isFinite(o) && o > 0 ? o : 12.5, s = Number.isFinite(i) && i > 0 ? i : 12.5, l = ho(t.orient ?? "auto-start-reverse"), a = ho(e);
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
  const c = yr.get(t.type);
  return c ? c({ id: a, color: n, width: r, height: s, orient: l }) : Yn({ ...t, type: "arrowclosed" }, e);
}
const pt = 200, gt = 150, Tu = 1.2, Xt = "http://www.w3.org/2000/svg";
function Au(t, e) {
  const { getState: n, setViewport: o, config: i } = e, r = i.minimapPosition ?? "bottom-right", s = i.minimapMaskColor, l = i.minimapNodeColor, a = document.createElement("div");
  a.className = `flow-minimap flow-minimap-${r}`;
  const c = document.createElementNS(Xt, "svg");
  c.setAttribute("width", String(pt)), c.setAttribute("height", String(gt));
  const d = document.createElementNS(Xt, "rect");
  d.classList.add("flow-minimap-bg"), d.setAttribute("width", String(pt)), d.setAttribute("height", String(gt));
  const f = document.createElementNS(Xt, "g");
  f.classList.add("flow-minimap-nodes");
  const u = document.createElementNS(Xt, "path");
  u.classList.add("flow-minimap-mask"), s && u.setAttribute("fill", s), u.setAttribute("fill-rule", "evenodd"), c.appendChild(d), c.appendChild(f), c.appendChild(u), a.appendChild(c), t.appendChild(a);
  let h = { x: 0, y: 0, width: 0, height: 0 }, p = 1;
  function g() {
    const x = n();
    if (h = Dt(x.nodes.filter((y) => !y.hidden), i.nodeOrigin), h.width === 0 && h.height === 0) {
      p = 1;
      return;
    }
    p = Math.max(
      h.width / pt,
      h.height / gt
    ) * Tu;
  }
  function w(x) {
    return typeof l == "function" ? l(x) : l;
  }
  function m() {
    const x = n();
    g(), f.innerHTML = "";
    const y = (pt - h.width / p) / 2, X = (gt - h.height / p) / 2;
    for (const _ of x.nodes) {
      if (_.hidden) continue;
      const L = document.createElementNS(Xt, "rect"), N = (_.dimensions?.width ?? ve) / p, B = (_.dimensions?.height ?? _e) / p, W = (_.position.x - h.x) / p + y, P = (_.position.y - h.y) / p + X;
      L.setAttribute("x", String(W)), L.setAttribute("y", String(P)), L.setAttribute("width", String(N)), L.setAttribute("height", String(B)), L.setAttribute("rx", "2");
      const k = w(_);
      k && (L.style.fill = k), f.appendChild(L);
    }
    E();
  }
  function E() {
    const x = n();
    if (h.width === 0 && h.height === 0) {
      u.setAttribute("d", "");
      return;
    }
    const y = (pt - h.width / p) / 2, X = (gt - h.height / p) / 2, _ = (-x.viewport.x / x.viewport.zoom - h.x) / p + y, L = (-x.viewport.y / x.viewport.zoom - h.y) / p + X, N = x.containerWidth / x.viewport.zoom / p, B = x.containerHeight / x.viewport.zoom / p, W = `M0,0 H${pt} V${gt} H0 Z`, P = `M${_},${L} h${N} v${B} h${-N} Z`;
    u.setAttribute("d", `${W} ${P}`);
  }
  let S = !1;
  function b(x, y) {
    const X = (pt - h.width / p) / 2, _ = (gt - h.height / p) / 2, L = (x - X) * p + h.x, N = (y - _) * p + h.y;
    return { x: L, y: N };
  }
  function A(x) {
    const y = c.getBoundingClientRect(), X = x.clientX - y.left, _ = x.clientY - y.top, L = n(), N = b(X, _), B = -N.x * L.viewport.zoom + L.containerWidth / 2, W = -N.y * L.viewport.zoom + L.containerHeight / 2;
    o({ x: B, y: W, zoom: L.viewport.zoom });
  }
  function T(x) {
    i.minimapPannable && (S = !0, c.setPointerCapture(x.pointerId), A(x));
  }
  function M(x) {
    S && A(x);
  }
  function v(x) {
    S && (S = !1, c.releasePointerCapture(x.pointerId));
  }
  c.addEventListener("pointerdown", T), c.addEventListener("pointermove", M), c.addEventListener("pointerup", v);
  function C(x) {
    if (!i.minimapZoomable)
      return;
    x.preventDefault();
    const y = n(), X = i.minZoom ?? 0.5, _ = i.maxZoom ?? 2, L = x.deltaY > 0 ? 0.9 : 1.1, N = Math.min(Math.max(y.viewport.zoom * L, X), _);
    o({ zoom: N });
  }
  c.addEventListener("wheel", C, { passive: !1 });
  function $() {
    c.removeEventListener("pointerdown", T), c.removeEventListener("pointermove", M), c.removeEventListener("pointerup", v), c.removeEventListener("wheel", C), a.remove();
  }
  return { render: m, updateViewport: E, destroy: $ };
}
const Nu = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>', $u = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>', Iu = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>', Wi = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></svg>', Du = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>', Ru = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>';
function Hu(t, e) {
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
    const S = Yt(Nu, "Zoom in", c), b = Yt($u, "Zoom out", d);
    p.appendChild(S), p.appendChild(b);
  }
  if (r) {
    const S = Yt(Iu, "Fit view", f);
    p.appendChild(S);
  }
  if (s && (w = Yt(Wi, "Toggle interactivity", u), p.appendChild(w)), l) {
    const S = Yt(Ru, "Reset panels", h);
    p.appendChild(S);
  }
  p.addEventListener("mousedown", (S) => S.stopPropagation()), p.addEventListener("pointerdown", (S) => S.stopPropagation()), p.addEventListener("wheel", (S) => S.stopPropagation(), { passive: !1 }), t.appendChild(p);
  function m(S) {
    if (w) {
      w.innerHTML = S.isInteractive ? Wi : Du;
      const b = S.isInteractive ? "Lock interactivity" : "Unlock interactivity";
      w.title = b, w.setAttribute("aria-label", b);
    }
  }
  function E() {
    p.remove();
  }
  return { update: m, destroy: E };
}
function Yt(t, e, n) {
  const o = document.createElement("button");
  return o.type = "button", o.innerHTML = t, o.title = e, o.setAttribute("aria-label", e), o.addEventListener("click", n), o;
}
const ji = 5;
function Fu(t) {
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
    if (h < ji && p < ji)
      return null;
    const g = Math.min(o, r), w = Math.min(i, s), m = (g - u.x) / u.zoom, E = (w - u.y) / u.zoom, S = h / u.zoom, b = p / u.zoom;
    return { x: m, y: E, width: S, height: b };
  }
  function d() {
    return n;
  }
  function f() {
    e.remove();
  }
  return { start: l, update: a, end: c, isActive: d, destroy: f };
}
const Ui = 3;
function zu(t) {
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
    h * h + p * p < Ui * Ui || (i.push({ x: d, y: f }), n.setAttribute("points", i.map((g) => `${g.x},${g.y}`).join(" ")));
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
function ri(t, e, n) {
  if (n.length < 3) return !1;
  let o = !1;
  for (let i = 0, r = n.length - 1; i < n.length; r = i++) {
    const s = n[i].x, l = n[i].y, a = n[r].x, c = n[r].y;
    l > e != c > e && t < (a - s) * (e - l) / (c - l) + s && (o = !o);
  }
  return o;
}
function Ou(t, e, n, o, i, r, s, l) {
  const a = n - t, c = o - e, d = s - i, f = l - r, u = a * f - c * d;
  if (Math.abs(u) < 1e-10) return !1;
  const h = i - t, p = r - e, g = (h * f - p * d) / u, w = (h * c - p * a) / u;
  return g >= 0 && g <= 1 && w >= 0 && w <= 1;
}
function Vu(t, e) {
  const n = e.x, o = e.y, i = e.x + e.width, r = e.y + e.height, s = n + e.width / 2, l = o + e.height / 2;
  if (ri(s, l, t)) return !0;
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
      if (Ou(t[d].x, t[d].y, t[c].x, t[c].y, f, u, h, p))
        return !0;
  return !1;
}
function wr(t) {
  const e = t.dimensions?.width ?? ve, n = t.dimensions?.height ?? _e;
  return t.rotation ? so(t.position.x, t.position.y, e, n, t.rotation) : { x: t.position.x, y: t.position.y, width: e, height: n };
}
function Bu(t, e) {
  return e.length < 3 ? [] : t.filter((n) => {
    if (n.hidden || n.selectable === !1) return !1;
    const o = wr(n);
    return Vu(e, o);
  });
}
function qu(t, e) {
  return e.length < 3 ? [] : t.filter((n) => {
    if (n.hidden || n.selectable === !1) return !1;
    const o = wr(n);
    return [
      { x: o.x, y: o.y },
      { x: o.x + o.width, y: o.y },
      { x: o.x + o.width, y: o.y + o.height },
      { x: o.x, y: o.y + o.height }
    ].every((r) => ri(r.x, r.y, e));
  });
}
function Xu(t, e) {
  return e.filter((n) => n.source === t || n.target === t);
}
function Ho(t, e, n) {
  const o = new Set(
    n.filter((i) => i.source === t).map((i) => i.target)
  );
  return e.filter((i) => o.has(i.id));
}
function Yu(t, e, n) {
  const o = new Set(
    n.filter((i) => i.target === t).map((i) => i.source)
  );
  return e.filter((i) => o.has(i.id));
}
function Wu(t, e, n) {
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
function ju(t, e, n, o = !1) {
  return n.some((i) => o ? i.source === t && i.target === e : i.source === t && i.target === e || i.source === e && i.target === t);
}
function Uu(t, e, n) {
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
function st(t, e, n) {
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
function Ze(t, e, n) {
  return !(t.source === t.target || e.some(
    (i) => i.source === t.source && i.target === t.target && i.sourceHandle === t.sourceHandle && i.targetHandle === t.targetHandle
  ) || n?.preventCycles && Wu(t.source, t.target, e));
}
const at = "_flowHandleValidate";
function Zu(t) {
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
        typeof l == "function" ? e[at] = l : (delete e[at], requestAnimationFrame(() => {
          const a = t.$data(e);
          a && typeof a[n] == "function" && (e[at] = a[n]);
        }));
      }
      i(() => {
        s();
      }), r(() => {
        delete e[at];
      });
    }
  );
}
const wt = "_flowHandleLimit";
function Gu(t) {
  t.directive(
    "flow-handle-limit",
    (e, { expression: n }, { evaluate: o, effect: i, cleanup: r }) => {
      i(() => {
        const s = Number(o(n));
        s > 0 ? e[wt] = s : delete e[wt];
      }), r(() => {
        delete e[wt];
      });
    }
  );
}
const dn = "_flowHandleConnectableStart", _t = "_flowHandleConnectableEnd";
function Ku(t) {
  t.directive(
    "flow-handle-connectable",
    (e, { expression: n, modifiers: o }, { evaluate: i, effect: r, cleanup: s }) => {
      const l = o.includes("start"), a = o.includes("end"), c = l || !l && !a, d = a || !l && !a;
      r(() => {
        const f = n ? !!i(n) : !0;
        c && (e[dn] = f), d && (e[_t] = f);
      }), s(() => {
        delete e[dn], delete e[_t];
      });
    }
  );
}
function pn(t, e, n = !0) {
  return e !== void 0 ? e : t.locked ? !1 : n;
}
function vr(t) {
  return pn(t, t.draggable);
}
function Ju(t) {
  return pn(t, t.deletable);
}
function rt(t) {
  return pn(t, t.connectable);
}
function Fo(t) {
  return pn(t, t.selectable);
}
function Zi(t) {
  return pn(t, t.resizable);
}
function Rt(t, e, n, o, i, r, s) {
  const l = n - t, a = o - e, c = i - n, d = r - o;
  if (l === 0 && c === 0 || a === 0 && d === 0)
    return `L${n},${o}`;
  const f = Math.sqrt(l * l + a * a), u = Math.sqrt(c * c + d * d), h = Math.min(s, f / 2, u / 2), p = n - l / f * h, g = o - a / f * h, w = n + c / u * h, m = o + d / u * h;
  return `L${p},${g} Q${n},${o} ${w},${m}`;
}
function gn({
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
function En(t, e) {
  return t >= 0 ? 0.5 * t : e * 25 * Math.sqrt(-t);
}
function Qu({
  sourceX: t,
  sourceY: e,
  sourcePosition: n = "bottom",
  targetX: o,
  targetY: i,
  targetPosition: r = "top",
  curvature: s = 0.25
}) {
  const l = n === "left" || n === "right", a = r === "left" || r === "right", c = l ? t + (n === "right" ? 1 : -1) * En(
    n === "right" ? o - t : t - o,
    s
  ) : t, d = l ? e : e + (n === "bottom" ? 1 : -1) * En(
    n === "bottom" ? i - e : e - i,
    s
  ), f = a ? o + (r === "right" ? 1 : -1) * En(
    r === "right" ? t - o : o - t,
    s
  ) : o, u = a ? i : i + (r === "bottom" ? 1 : -1) * En(
    r === "bottom" ? e - i : i - e,
    s
  );
  return [c, d, f, u];
}
function Wn(t) {
  const { sourceX: e, sourceY: n, targetX: o, targetY: i } = t, [r, s, l, a] = Qu(t), c = `M${e},${n} C${r},${s} ${l},${a} ${o},${i}`, { x: d, y: f, offsetX: u, offsetY: h } = gn({ sourceX: e, sourceY: n, targetX: o, targetY: i });
  return {
    path: c,
    labelPosition: { x: d, y: f },
    labelOffsetX: u,
    labelOffsetY: h
  };
}
function Cm({
  sourceX: t,
  sourceY: e,
  targetX: n,
  targetY: o
}) {
  const i = (t + n) / 2, r = `M${t},${e} C${i},${e} ${i},${o} ${n},${o}`, { x: s, y: l, offsetX: a, offsetY: c } = gn({ sourceX: t, sourceY: e, targetX: n, targetY: o });
  return {
    path: r,
    labelPosition: { x: s, y: l },
    labelOffsetX: a,
    labelOffsetY: c
  };
}
function Gi(t) {
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
function ef(t, e, n, o, i, r, s) {
  const l = Gi(n), a = Gi(r), c = t + l.x * s, d = e + l.y * s, f = o + a.x * s, u = i + a.y * s, h = n === "left" || n === "right";
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
function un({
  sourceX: t,
  sourceY: e,
  sourcePosition: n = "bottom",
  targetX: o,
  targetY: i,
  targetPosition: r = "top",
  borderRadius: s = 5,
  offset: l = 10
}) {
  const a = ef(
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
      const [m, E] = p === 1 ? [t, e] : a[p - 1], [S, b] = a[p + 1];
      c += ` ${Rt(m, E, g, w, S, b, s)}`;
    } else
      c += ` L${g},${w}`;
  }
  c += ` L${o},${i}`;
  const { x: d, y: f, offsetX: u, offsetY: h } = gn({ sourceX: t, sourceY: e, targetX: o, targetY: i });
  return {
    path: c,
    labelPosition: { x: d, y: f },
    labelOffsetX: u,
    labelOffsetY: h
  };
}
function tf(t) {
  return un({ ...t, borderRadius: 0 });
}
function _r({
  sourceX: t,
  sourceY: e,
  targetX: n,
  targetY: o
}) {
  const i = `M${t},${e} L${n},${o}`, { x: r, y: s, offsetX: l, offsetY: a } = gn({ sourceX: t, sourceY: e, targetX: n, targetY: o });
  return {
    path: i,
    labelPosition: { x: r, y: s },
    labelOffsetX: l,
    labelOffsetY: a
  };
}
const nt = 40;
function nf(t, e, n, o) {
  let i = 0, r = 0;
  const s = t - n.left, l = n.right - t, a = e - n.top, c = n.bottom - e;
  return s < nt && s >= 0 ? i = -o * (1 - s / nt) : l < nt && l >= 0 && (i = o * (1 - l / nt)), a < nt && a >= 0 ? r = -o * (1 - a / nt) : c < nt && c >= 0 && (r = o * (1 - c / nt)), { dx: i, dy: r };
}
function br(t) {
  const { container: e, speed: n, onPan: o } = t;
  let i = null, r = 0, s = 0, l = !1;
  function a() {
    if (!l)
      return;
    const c = e.getBoundingClientRect(), { dx: d, dy: f } = nf(r, s, c, n);
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
function Tt(t) {
  const e = t.connectionLineType ?? "straight", o = {
    stroke: (t.invalid ? (t.containerEl ? getComputedStyle(t.containerEl).getPropertyValue("--flow-connection-line-invalid").trim() : "") || cr : null) ?? t.connectionLineStyle?.stroke ?? ((t.containerEl ? getComputedStyle(t.containerEl).getPropertyValue("--flow-edge-stroke-selected").trim() : "") || rn),
    strokeWidth: t.connectionLineStyle?.strokeWidth ?? Number(wu),
    strokeDasharray: t.connectionLineStyle?.strokeDasharray ?? vu
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
        p = Wn({ sourceX: d, sourceY: f, targetX: u, targetY: h }).path;
        break;
      }
      case "smoothstep": {
        p = un({ sourceX: d, sourceY: f, targetX: u, targetY: h }).path;
        break;
      }
      case "step": {
        p = tf({ sourceX: d, sourceY: f, targetX: u, targetY: h }).path;
        break;
      }
      default: {
        p = _r({ sourceX: d, sourceY: f, targetX: u, targetY: h }).path;
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
function Kt(t) {
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
      if (p && !rt(p)) return;
    }
    const d = t.handleType === "target" ? _t : dn;
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
function jn(t, e, n, o) {
  if (e._config?.autoPanOnConnect === !1) return null;
  const i = br({
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
let Sn = 0;
function Be(t, e) {
  const n = t.querySelector(
    `[data-flow-node-id="${CSS.escape(e.source)}"]`
  );
  if (n) {
    const i = e.sourceHandle ?? "source", r = n.querySelector(
      `[data-flow-handle-id="${CSS.escape(i)}"][data-flow-handle-type="source"]`
    ) ?? n.querySelector(`[data-flow-handle-id="${CSS.escape(i)}"]`);
    if (r?.[at] && !r[at](e))
      return !1;
  }
  const o = t.querySelector(
    `[data-flow-node-id="${CSS.escape(e.target)}"]`
  );
  if (o) {
    const i = e.targetHandle ?? "target", r = o.querySelector(
      `[data-flow-handle-id="${CSS.escape(i)}"][data-flow-handle-type="target"]`
    ) ?? o.querySelector(`[data-flow-handle-id="${CSS.escape(i)}"]`);
    if (r?.[at] && !r[at](e))
      return !1;
  }
  return !0;
}
function qe(t, e, n) {
  const o = t.querySelector(
    `[data-flow-node-id="${CSS.escape(e.source)}"]`
  );
  if (o) {
    const r = e.sourceHandle ?? "source", s = o.querySelector(
      `[data-flow-handle-id="${CSS.escape(r)}"][data-flow-handle-type="source"]`
    ) ?? o.querySelector(`[data-flow-handle-id="${CSS.escape(r)}"]`);
    if (s?.[wt] && n.filter(
      (a) => a.source === e.source && (a.sourceHandle ?? "source") === (e.sourceHandle ?? "source")
    ).length >= s[wt])
      return !1;
  }
  const i = t.querySelector(
    `[data-flow-node-id="${CSS.escape(e.target)}"]`
  );
  if (i) {
    const r = e.targetHandle ?? "target", s = i.querySelector(
      `[data-flow-handle-id="${CSS.escape(r)}"][data-flow-handle-type="target"]`
    ) ?? i.querySelector(`[data-flow-handle-id="${CSS.escape(r)}"]`);
    if (s?.[wt] && n.filter(
      (a) => a.target === e.target && (a.targetHandle ?? "target") === (e.targetHandle ?? "target")
    ).length >= s[wt])
      return !1;
  }
  return !0;
}
function Jt(t, e, n, o, i) {
  const r = i ? o.edges.filter((l) => l.id !== i) : o.edges, s = t.querySelectorAll('[data-flow-handle-type="target"]');
  for (const l of s) {
    const c = l.closest("[x-flow-node]")?.dataset.flowNodeId;
    if (!c) continue;
    const d = l.dataset.flowHandleId ?? "target";
    if (l[_t] === !1) {
      l.classList.add("flow-handle-invalid"), l.classList.remove("flow-handle-valid", "flow-handle-limit-reached");
      continue;
    }
    const f = {
      source: e,
      sourceHandle: n,
      target: c,
      targetHandle: d
    }, h = o.getNode(c)?.connectable !== !1 && Ze(f, r, { preventCycles: o._config?.preventCycles }), p = h && qe(t, f, r);
    p && Be(t, f) && (!o._config?.isValidConnection || o._config.isValidConnection(f)) ? (l.classList.add("flow-handle-valid"), l.classList.remove("flow-handle-invalid", "flow-handle-limit-reached")) : (l.classList.add("flow-handle-invalid"), l.classList.remove("flow-handle-valid"), h && !p ? l.classList.add("flow-handle-limit-reached") : l.classList.remove("flow-handle-limit-reached"));
  }
}
function Pe(t) {
  const e = t.querySelectorAll('[data-flow-handle-type="target"]');
  for (const n of e)
    n.classList.remove("flow-handle-valid", "flow-handle-invalid", "flow-handle-limit-reached");
}
async function Ki(t, e, n, o, i, r) {
  if (!t) return { allowed: !0 };
  n?.classList.add(r), o?.classList.add(r), i.dispatchEvent(new CustomEvent("flow-connect-validating", {
    detail: { connection: e },
    bubbles: !0
  }));
  let s;
  try {
    s = await t(e);
  } catch (c) {
    V("connection", "connectValidator threw", c), s = !1;
  } finally {
    n?.classList.remove(r), o?.classList.remove(r);
  }
  const l = typeof s == "boolean" ? s : !!s?.allowed, a = typeof s == "object" && s && "reason" in s ? s.reason : void 0;
  return i.dispatchEvent(new CustomEvent("flow-connect-validated", {
    detail: { connection: e, allowed: l, reason: a },
    bubbles: !0
  })), { allowed: l, reason: a };
}
function Ji(t, e) {
  const n = t.querySelector(
    `[data-flow-node-id="${CSS.escape(e.source)}"]`
  ), o = e.sourceHandle ?? "source", i = n?.querySelector(
    `[data-flow-handle-id="${CSS.escape(o)}"][data-flow-handle-type="source"]`
  ) ?? n?.querySelector(`[data-flow-handle-id="${CSS.escape(o)}"]`) ?? null, r = t.querySelector(
    `[data-flow-node-id="${CSS.escape(e.target)}"]`
  ), s = e.targetHandle ?? "target", l = r?.querySelector(
    `[data-flow-handle-id="${CSS.escape(s)}"][data-flow-handle-type="target"]`
  ) ?? r?.querySelector(`[data-flow-handle-id="${CSS.escape(s)}"]`) ?? null;
  return { sourceEl: i, targetEl: l };
}
function of(t) {
  t.directive(
    "flow-handle",
    (e, { value: n, modifiers: o, expression: i }, { evaluate: r, effect: s, cleanup: l }) => {
      const a = n === "source" ? "source" : "target", c = o.includes("top"), d = o.includes("bottom"), f = o.includes("left"), u = o.includes("right"), h = c || d || f || u;
      let p;
      c && f ? p = "top-left" : c && u ? p = "top-right" : d && f ? p = "bottom-left" : d && u ? p = "bottom-right" : c ? p = "top" : u ? p = "right" : d ? p = "bottom" : f ? p = "left" : p = e.getAttribute("data-flow-handle-position") ?? (a === "source" ? "bottom" : "top");
      let g, w = !1;
      if (i) {
        const S = r(i);
        S && typeof S == "object" && !Array.isArray(S) ? (g = S.id || e.getAttribute("data-flow-handle-id") || a, S.position && (p = S.position, w = !0)) : g = S || e.getAttribute("data-flow-handle-id") || a;
      } else
        g = e.getAttribute("data-flow-handle-id") || a;
      if (o.includes("hidden") && (e.style.display = "none"), e.dataset.flowHandleType = a, e.dataset.flowHandlePosition = p, e.dataset.flowHandleId = g, h && (e.dataset.flowHandleExplicit = "true"), w && i && (e.dataset.flowHandleExplicit = "true", s(() => {
        const S = r(i);
        S && typeof S == "object" && !Array.isArray(S) && S.position && (e.dataset.flowHandlePosition = S.position);
      })), !h && !w) {
        const S = () => {
          const A = e.closest("[x-flow-node]")?.dataset.flowNodeId;
          if (!A) return;
          const T = e.closest("[x-data]");
          return T ? t.$data(T)?.getNode?.(A) : void 0;
        };
        s(() => {
          const b = S();
          if (!b) return;
          const A = a === "source" ? b.sourcePosition : b.targetPosition;
          A && (e.dataset.flowHandlePosition = A);
        });
      }
      e.classList.add("flow-handle", `flow-handle-${a}`);
      const m = () => {
        const S = e.closest("[x-flow-node]");
        return S ? S.getAttribute("data-flow-node-id") ?? null : null;
      }, E = () => {
        const S = e.closest("[x-data]");
        return S ? t.$data(S) : null;
      };
      if (a === "source") {
        let S = null;
        const b = (M) => {
          M.preventDefault(), M.stopPropagation();
          const v = E(), C = e.closest("[x-flow-node]");
          if (!v || !C || v._animationLocked) return;
          const $ = C.dataset.flowNodeId;
          if (!$) return;
          const x = v.getNode($);
          if (x && !rt(x) || e[dn] === !1) return;
          const y = M.clientX, X = M.clientY;
          let _ = !1;
          if (v.pendingConnection && v._config?.connectOnClick !== !1) {
            v._emit("connect-end", {
              connection: null,
              source: v.pendingConnection.source,
              sourceHandle: v.pendingConnection.sourceHandle,
              position: { x: 0, y: 0 }
            }), v.pendingConnection = null, v._container?.classList.remove("flow-connecting");
            const R = e.closest(".flow-container");
            R && Pe(R);
          }
          let L = null, N = null, B = null, W = null, P = null;
          const k = v._config?.connectionSnapRadius ?? 20, I = e.closest(".flow-container");
          let te = 0, se = 0, ie = !1, K = /* @__PURE__ */ new Map();
          const ae = () => {
            if (_ = !0, V("connection", `Connection drag started from node "${$}" handle "${g}"`), v._emit("connect-start", { source: $, sourceHandle: g }), !I) return;
            N = Tt({
              connectionLineType: v._config?.connectionLineType,
              connectionLineStyle: v._config?.connectionLineStyle,
              connectionLine: v._config?.connectionLine,
              containerEl: I
            }), L = N.svg;
            const R = e.getBoundingClientRect(), G = I.getBoundingClientRect(), Y = v.viewport?.zoom || 1, H = v.viewport?.x || 0, D = v.viewport?.y || 0;
            te = (R.left + R.width / 2 - G.left - H) / Y, se = (R.top + R.height / 2 - G.top - D) / Y, N.update({ fromX: te, fromY: se, toX: te, toY: se, source: $, sourceHandle: g });
            const Q = I.querySelector(".flow-viewport");
            if (Q && Q.appendChild(L), v.pendingConnection = {
              source: $,
              sourceHandle: g,
              position: { x: te, y: se }
            }, W = jn(I, v, y, X), Jt(I, $, g, v), v._config?.onEdgeDrop) {
              const U = v._config.edgeDropPreview, F = U ? U({ source: $, sourceHandle: g }) : "New Node";
              if (F !== null) {
                P = document.createElement("div"), P.className = "flow-ghost-node";
                const J = document.createElement("div");
                if (J.className = "flow-ghost-handle", P.appendChild(J), typeof F == "string") {
                  const oe = document.createElement("span");
                  oe.textContent = F, P.appendChild(oe);
                } else
                  P.appendChild(F);
                P.style.left = `${te}px`, P.style.top = `${se}px`;
                const ne = I.querySelector(".flow-viewport");
                ne && ne.appendChild(P);
              }
            }
          }, de = () => {
            const R = [...v.selectedNodes], G = [], Y = I.getBoundingClientRect(), H = v.viewport?.zoom || 1, D = v.viewport?.x || 0, Q = v.viewport?.y || 0;
            for (const U of R) {
              if (U === $) continue;
              const F = I?.querySelector(`[data-flow-node-id="${CSS.escape(U)}"]`)?.querySelector('[data-flow-handle-type="source"]');
              if (!F) continue;
              const J = F.getBoundingClientRect();
              G.push({
                nodeId: U,
                handleId: F.dataset.flowHandleId ?? "source",
                pos: {
                  x: (J.left + J.width / 2 - Y.left - D) / H,
                  y: (J.top + J.height / 2 - Y.top - Q) / H
                }
              });
            }
            return G;
          }, le = (R) => {
            ie = !0, N && (K.set($, {
              line: N,
              sourceNodeId: $,
              sourceHandleId: g,
              sourcePos: { x: te, y: se },
              valid: !0
            }), N = null);
            const G = de(), Y = I.querySelector(".flow-viewport");
            for (const H of G) {
              const D = Tt({
                connectionLineType: v._config?.connectionLineType,
                connectionLineStyle: v._config?.connectionLineStyle,
                connectionLine: v._config?.connectionLine,
                containerEl: I
              });
              D.update({
                fromX: H.pos.x,
                fromY: H.pos.y,
                toX: R.x,
                toY: R.y,
                source: H.nodeId,
                sourceHandle: H.handleId
              }), Y && Y.appendChild(D.svg), K.set(H.nodeId, {
                line: D,
                sourceNodeId: H.nodeId,
                sourceHandleId: H.handleId,
                sourcePos: H.pos,
                valid: !0
              });
            }
          }, Z = (R) => {
            if (!_) {
              const H = R.clientX - y, D = R.clientY - X;
              if (Math.abs(H) >= Nn || Math.abs(D) >= Nn) {
                if (ae(), v._config?.multiConnect && v.selectedNodes.size > 1 && v.selectedNodes.has($)) {
                  const Q = v.screenToFlowPosition(R.clientX, R.clientY);
                  le(Q);
                }
              } else
                return;
            }
            const G = v.screenToFlowPosition(R.clientX, R.clientY);
            if (ie) {
              const H = Kt({
                containerEl: I,
                handleType: "target",
                excludeNodeId: $,
                cursorFlowPos: G,
                connectionSnapRadius: k,
                getNode: (F) => v.getNode(F),
                toFlowPosition: (F, J) => v.screenToFlowPosition(F, J),
                connectionMode: v._config?.connectionMode
              });
              H.element !== B && (B?.classList.remove("flow-handle-active"), H.element?.classList.add("flow-handle-active"), B = H.element);
              const Q = H.element?.closest("[x-flow-node]")?.dataset.flowNodeId ?? null, U = H.element?.dataset.flowHandleId ?? "target", ee = v._config?.connectionLineStyle?.stroke ?? (getComputedStyle(I).getPropertyValue("--flow-edge-stroke-selected").trim() || rn);
              for (const F of K.values())
                if (F.line.update({
                  fromX: F.sourcePos.x,
                  fromY: F.sourcePos.y,
                  toX: H.position.x,
                  toY: H.position.y,
                  source: F.sourceNodeId,
                  sourceHandle: F.sourceHandleId
                }), H.element && Q) {
                  const J = {
                    source: F.sourceNodeId,
                    sourceHandle: F.sourceHandleId,
                    target: Q,
                    targetHandle: U
                  }, O = v.getNode(Q)?.connectable !== !1 && F.sourceNodeId !== Q && Ze(J, v.edges, { preventCycles: v._config?.preventCycles }) && st(J, v._config?.connectionRules, v._nodeMap) && qe(I, J, v.edges) && Be(I, J) && (!v._config?.isValidConnection || v._config.isValidConnection(J));
                  F.valid = O;
                  const re = F.line.svg.querySelector("path");
                  if (re)
                    if (O)
                      re.setAttribute("stroke", ee);
                    else {
                      const fe = getComputedStyle(I).getPropertyValue("--flow-connection-line-invalid").trim() || cr;
                      re.setAttribute("stroke", fe);
                    }
                } else {
                  F.valid = !0;
                  const J = F.line.svg.querySelector("path");
                  J && J.setAttribute("stroke", ee);
                }
              v.pendingConnection = { ...v.pendingConnection, position: H.position }, W?.updatePointer(R.clientX, R.clientY);
              return;
            }
            const Y = Kt({
              containerEl: I,
              handleType: "target",
              excludeNodeId: $,
              cursorFlowPos: G,
              connectionSnapRadius: k,
              getNode: (H) => v.getNode(H),
              toFlowPosition: (H, D) => v.screenToFlowPosition(H, D)
            });
            Y.element !== B && (B?.classList.remove("flow-handle-active"), Y.element?.classList.add("flow-handle-active"), B = Y.element), P ? Y.element ? (P.style.display = "none", N?.update({ fromX: te, fromY: se, toX: Y.position.x, toY: Y.position.y, source: $, sourceHandle: g })) : (P.style.display = "", P.style.left = `${G.x}px`, P.style.top = `${G.y}px`, N?.update({ fromX: te, fromY: se, toX: G.x, toY: G.y, source: $, sourceHandle: g })) : N?.update({ fromX: te, fromY: se, toX: Y.position.x, toY: Y.position.y, source: $, sourceHandle: g }), v.pendingConnection = { ...v.pendingConnection, position: Y.position }, W?.updatePointer(R.clientX, R.clientY);
          }, j = async (R) => {
            if (W?.stop(), W = null, document.removeEventListener("pointermove", Z), document.removeEventListener("pointerup", j), S = null, v._connectValidating) return;
            if (ie) {
              const D = v.screenToFlowPosition(R.clientX, R.clientY);
              let Q = B;
              Q || (Q = document.elementFromPoint(R.clientX, R.clientY)?.closest('[data-flow-handle-type="target"]'));
              const ee = Q?.closest("[x-flow-node]")?.dataset.flowNodeId ?? null, F = Q?.dataset.flowHandleId ?? "target", J = [], ne = [], oe = [], q = [];
              if (Q && ee) {
                const ce = v.getNode(ee);
                for (const z of K.values()) {
                  const O = {
                    source: z.sourceNodeId,
                    sourceHandle: z.sourceHandleId,
                    target: ee,
                    targetHandle: F
                  };
                  if (ce?.connectable !== !1 && z.sourceNodeId !== ee && Ze(O, v.edges, { preventCycles: v._config?.preventCycles }) && st(O, v._config?.connectionRules, v._nodeMap) && qe(I, O, v.edges) && Be(I, O) && (!v._config?.isValidConnection || v._config.isValidConnection(O))) {
                    const be = `e-${z.sourceNodeId}-${ee}-${Date.now()}-${Sn++}`;
                    J.push({ id: be, ...O }), ne.push(O), q.push(z);
                  } else
                    oe.push(z);
                }
              } else
                oe.push(...K.values());
              for (const ce of q)
                ce.line.destroy();
              if (J.length > 0) {
                v.addEdges(J);
                for (const ce of ne)
                  v._emit("connect", { connection: ce });
                v._emit("multi-connect", { connections: ne });
              }
              oe.length > 0 && setTimeout(() => {
                for (const ce of oe)
                  ce.line.destroy();
              }, 100), B?.classList.remove("flow-handle-active"), v._emit("connect-end", {
                connection: ne.length > 0 ? ne[0] : null,
                source: $,
                sourceHandle: g,
                position: D
              }), K.clear(), ie = !1, Pe(I), v.pendingConnection = null, v._container?.classList.remove("flow-connecting");
              return;
            }
            if (!_) {
              v._config?.connectOnClick !== !1 && (V("connection", `Click-to-connect started from node "${$}" handle "${g}"`), v._emit("connect-start", { source: $, sourceHandle: g }), v.pendingConnection = {
                source: $,
                sourceHandle: g,
                position: { x: 0, y: 0 }
              }, v._container?.classList.add("flow-connecting"), Jt(I, $, g, v));
              return;
            }
            N?.destroy(), N = null, P?.remove(), P = null, B?.classList.remove("flow-handle-active"), Pe(I);
            const G = v.screenToFlowPosition(R.clientX, R.clientY), Y = { source: $, sourceHandle: g, position: G };
            let H = B;
            if (H || (H = document.elementFromPoint(R.clientX, R.clientY)?.closest('[data-flow-handle-type="target"]')), H) {
              const Q = H.closest("[x-flow-node]")?.dataset.flowNodeId, U = H.dataset.flowHandleId ?? "target";
              if (Q) {
                if (H[_t] === !1) {
                  V("connection", "Connection rejected (handle not connectable end)"), v._emit("connect-end", { connection: null, ...Y }), v.pendingConnection = null;
                  return;
                }
                const ee = v.getNode(Q);
                if (ee && !rt(ee)) {
                  V("connection", `Connection rejected (target "${Q}" not connectable)`), v._emit("connect-end", { connection: null, ...Y }), v.pendingConnection = null;
                  return;
                }
                const F = {
                  source: $,
                  sourceHandle: g,
                  target: Q,
                  targetHandle: U
                };
                if (Ze(F, v.edges, { preventCycles: v._config?.preventCycles })) {
                  if (!st(F, v._config?.connectionRules, v._nodeMap)) {
                    V("connection", "Connection rejected (connection rules)", F), v._emit("connect-end", { connection: null, ...Y }), v.pendingConnection = null;
                    return;
                  }
                  if (!qe(I, F, v.edges)) {
                    V("connection", "Connection rejected (handle limit)", F), v._emit("connect-end", { connection: null, ...Y }), v.pendingConnection = null;
                    return;
                  }
                  if (!Be(I, F)) {
                    V("connection", "Connection rejected (per-handle validator)", F), v._emit("connect-end", { connection: null, ...Y }), v.pendingConnection = null;
                    return;
                  }
                  if (v._config?.isValidConnection && !v._config.isValidConnection(F)) {
                    V("connection", "Connection rejected (custom validator)", F), v._emit("connect-end", { connection: null, ...Y }), v.pendingConnection = null;
                    return;
                  }
                  const J = v._config?.connectValidator;
                  if (J) {
                    const oe = v._config?.validatingHandleClass ?? "flow-handle-validating", { sourceEl: q, targetEl: ce } = Ji(I, F);
                    v._connectValidating = !0;
                    let z;
                    try {
                      z = await Ki(
                        J,
                        F,
                        q,
                        ce,
                        I,
                        oe
                      );
                    } finally {
                      v._connectValidating = !1;
                    }
                    if (!z.allowed) {
                      V("connection", "Connection rejected (async connectValidator)", { connection: F, reason: z.reason }), v._emit("connect-end", { connection: null, ...Y }), v.pendingConnection = null;
                      return;
                    }
                  }
                  const ne = `e-${$}-${Q}-${Date.now()}-${Sn++}`;
                  v.addEdges({ id: ne, ...F }), V("connection", `Connection created: ${$} → ${Q}`, F), v._emit("connect", { connection: F }), v._emit("connect-end", { connection: F, ...Y });
                } else
                  V("connection", "Connection rejected (invalid)", F), v._emit("connect-end", { connection: null, ...Y });
              } else
                v._emit("connect-end", { connection: null, ...Y });
            } else if (v._config?.onEdgeDrop) {
              const D = {
                x: G.x - ve / 2,
                y: G.y - _e / 2
              }, Q = v._config.onEdgeDrop({
                source: $,
                sourceHandle: g,
                position: D
              });
              if (Q) {
                const U = {
                  source: $,
                  sourceHandle: g,
                  target: Q.id,
                  targetHandle: "target"
                };
                if (!qe(I, U, v.edges))
                  V("connection", "Edge drop: connection rejected (handle limit)"), v._emit("connect-end", { connection: null, ...Y });
                else if (!Be(I, U))
                  V("connection", "Edge drop: connection rejected (per-handle validator)"), v._emit("connect-end", { connection: null, ...Y });
                else if (!v._config.isValidConnection || v._config.isValidConnection(U)) {
                  v.addNodes(Q);
                  const ee = `e-${$}-${Q.id}-${Date.now()}-${Sn++}`;
                  v.addEdges({ id: ee, ...U }), V("connection", `Edge drop: created node "${Q.id}" and edge`, U), v._emit("connect", { connection: U }), v._emit("connect-end", { connection: U, ...Y });
                } else
                  V("connection", "Edge drop: connection rejected by validator"), v._emit("connect-end", { connection: null, ...Y });
              } else
                V("connection", "Edge drop: callback returned null"), v._emit("connect-end", { connection: null, ...Y });
            } else
              V("connection", "Connection cancelled (no target)"), v._emit("connect-end", { connection: null, ...Y });
            v.pendingConnection = null;
          };
          document.addEventListener("pointermove", Z), document.addEventListener("pointerup", j), document.addEventListener("pointercancel", j), S = () => {
            document.removeEventListener("pointermove", Z), document.removeEventListener("pointerup", j), document.removeEventListener("pointercancel", j), W?.stop(), N?.destroy(), N = null, P?.remove(), P = null;
            for (const R of K.values())
              R.line.destroy();
            K.clear(), ie = !1, B?.classList.remove("flow-handle-active"), Pe(I), v.pendingConnection = null, v._container?.classList.remove("flow-connecting");
          };
        };
        e.addEventListener("pointerdown", b);
        const A = () => {
          const M = E();
          if (!M?._pendingReconnection || M._pendingReconnection.draggedEnd !== "source") return;
          const v = m();
          if (v) {
            const C = M.getNode(v);
            if (C && !rt(C)) return;
          }
          e[dn] !== !1 && e.classList.add("flow-handle-active");
        }, T = () => {
          e.classList.remove("flow-handle-active");
        };
        e.addEventListener("pointerenter", A), e.addEventListener("pointerleave", T), l(() => {
          S?.(), e.removeEventListener("pointerdown", b), e.removeEventListener("pointerenter", A), e.removeEventListener("pointerleave", T), e.classList.remove("flow-handle", `flow-handle-${a}`);
        });
      } else {
        const S = () => {
          const v = E();
          if (!v?.pendingConnection) return;
          const C = m();
          if (C) {
            const $ = v.getNode(C);
            if ($ && !rt($)) return;
          }
          e[_t] !== !1 && e.classList.add("flow-handle-active");
        }, b = () => {
          e.classList.remove("flow-handle-active");
        };
        e.addEventListener("pointerenter", S), e.addEventListener("pointerleave", b);
        const A = async (v) => {
          const C = E();
          if (!C?.pendingConnection || C._config?.connectOnClick === !1 || C._connectValidating) return;
          v.preventDefault(), v.stopPropagation();
          const $ = m();
          if (!$) return;
          if (e[_t] === !1) {
            V("connection", "Click-to-connect rejected (handle not connectable end)"), C._emit("connect-end", { connection: null, source: C.pendingConnection.source, sourceHandle: C.pendingConnection.sourceHandle, position: { x: 0, y: 0 } }), C.pendingConnection = null, C._container?.classList.remove("flow-connecting");
            const L = e.closest(".flow-container");
            L && Pe(L);
            return;
          }
          const x = C.getNode($);
          if (x && !rt(x)) {
            V("connection", `Click-to-connect rejected (target "${$}" not connectable)`), C._emit("connect-end", { connection: null, source: C.pendingConnection.source, sourceHandle: C.pendingConnection.sourceHandle, position: { x: 0, y: 0 } }), C.pendingConnection = null, C._container?.classList.remove("flow-connecting");
            const L = e.closest(".flow-container");
            L && Pe(L);
            return;
          }
          const y = {
            source: C.pendingConnection.source,
            sourceHandle: C.pendingConnection.sourceHandle,
            target: $,
            targetHandle: g
          }, X = { source: C.pendingConnection.source, sourceHandle: C.pendingConnection.sourceHandle, position: { x: 0, y: 0 } };
          if (Ze(y, C.edges, { preventCycles: C._config?.preventCycles })) {
            const L = e.closest(".flow-container");
            if (!st(y, C._config?.connectionRules, C._nodeMap)) {
              V("connection", "Click-to-connect rejected (connection rules)", y), C._emit("connect-end", { connection: null, ...X }), C.pendingConnection = null, C._container?.classList.remove("flow-connecting"), L && Pe(L);
              return;
            }
            if (L && !qe(L, y, C.edges)) {
              V("connection", "Click-to-connect rejected (handle limit)", y), C._emit("connect-end", { connection: null, ...X }), C.pendingConnection = null, C._container?.classList.remove("flow-connecting"), Pe(L);
              return;
            }
            if (L && !Be(L, y)) {
              V("connection", "Click-to-connect rejected (per-handle validator)", y), C._emit("connect-end", { connection: null, ...X }), C.pendingConnection = null, C._container?.classList.remove("flow-connecting"), L && Pe(L);
              return;
            }
            if (C._config?.isValidConnection && !C._config.isValidConnection(y)) {
              V("connection", "Click-to-connect rejected (custom validator)", y), C._emit("connect-end", { connection: null, ...X }), C.pendingConnection = null, C._container?.classList.remove("flow-connecting"), L && Pe(L);
              return;
            }
            const N = C._config?.connectValidator;
            if (N && L) {
              const W = C._config?.validatingHandleClass ?? "flow-handle-validating", { sourceEl: P, targetEl: k } = Ji(L, y);
              C._connectValidating = !0;
              let I;
              try {
                I = await Ki(
                  N,
                  y,
                  P,
                  k,
                  L,
                  W
                );
              } finally {
                C._connectValidating = !1;
              }
              if (!I.allowed) {
                V("connection", "Click-to-connect rejected (async connectValidator)", { connection: y, reason: I.reason }), C._emit("connect-end", { connection: null, ...X }), C.pendingConnection = null, C._container?.classList.remove("flow-connecting"), Pe(L);
                return;
              }
            }
            const B = `e-${y.source}-${y.target}-${Date.now()}-${Sn++}`;
            C.addEdges({ id: B, ...y }), V("connection", `Click-to-connect: ${y.source} → ${y.target}`, y), C._emit("connect", { connection: y }), C._emit("connect-end", { connection: y, ...X });
          } else
            V("connection", "Click-to-connect rejected (invalid)", y), C._emit("connect-end", { connection: null, ...X });
          C.pendingConnection = null, C._container?.classList.remove("flow-connecting");
          const _ = e.closest(".flow-container");
          _ && Pe(_);
        };
        e.addEventListener("click", A);
        let T = null;
        const M = (v) => {
          if (v.button !== 0) return;
          const C = E(), $ = m();
          if (!C || !$ || C._animationLocked || C._config?.edgesReconnectable === !1 || C._pendingReconnection) return;
          const x = C.edges.filter(
            (F) => F.target === $ && (F.targetHandle ?? "target") === g
          );
          if (x.length === 0) return;
          const y = x.find((F) => F.selected) ?? (x.length === 1 ? x[0] : null);
          if (!y) return;
          const X = y.reconnectable ?? !0;
          if (X === !1 || X === "source") return;
          v.preventDefault(), v.stopPropagation();
          const _ = v.clientX, L = v.clientY;
          let N = !1, B = !1, W = null;
          const P = C._config?.connectionSnapRadius ?? 20, k = e.closest(".flow-container");
          if (!k) return;
          const I = k.querySelector(
            `[data-flow-node-id="${CSS.escape(y.source)}"]`
          ), te = y.sourceHandle ? `[data-flow-handle-id="${CSS.escape(y.sourceHandle)}"]` : '[data-flow-handle-type="source"]', se = I?.querySelector(te), ie = k.getBoundingClientRect(), K = C.viewport?.zoom || 1, ae = C.viewport?.x || 0, de = C.viewport?.y || 0;
          let le, Z;
          if (se) {
            const F = se.getBoundingClientRect();
            le = (F.left + F.width / 2 - ie.left - ae) / K, Z = (F.top + F.height / 2 - ie.top - de) / K;
          } else {
            const F = C.getNode(y.source);
            if (!F) return;
            const J = F.dimensions?.width ?? ve, ne = F.dimensions?.height ?? _e;
            le = F.position.x + J / 2, Z = F.position.y + ne;
          }
          let j = null, R = null, G = null, Y = _, H = L;
          const D = () => {
            N = !0;
            const F = k.querySelector(
              `[data-flow-edge-id="${y.id}"]`
            );
            F && F.classList.add("flow-edge-reconnecting"), C._emit("reconnect-start", { edge: y, handleType: "target" }), V("reconnect", `Reconnection drag started from target handle on edge "${y.id}"`), R = Tt({
              connectionLineType: C._config?.connectionLineType,
              connectionLineStyle: C._config?.connectionLineStyle,
              connectionLine: C._config?.connectionLine,
              containerEl: k
            }), j = R.svg;
            const J = C.screenToFlowPosition(_, L);
            R.update({
              fromX: le,
              fromY: Z,
              toX: J.x,
              toY: J.y,
              source: y.source,
              sourceHandle: y.sourceHandle
            });
            const ne = k.querySelector(".flow-viewport");
            ne && ne.appendChild(j), C.pendingConnection = {
              source: y.source,
              sourceHandle: y.sourceHandle,
              position: J
            }, C._pendingReconnection = {
              edge: y,
              draggedEnd: "target",
              anchorPosition: { x: le, y: Z },
              position: J
            }, G = jn(k, C, Y, H), Jt(k, y.source, y.sourceHandle ?? "source", C, y.id);
          }, Q = (F) => {
            if (Y = F.clientX, H = F.clientY, !N) {
              Math.sqrt(
                (F.clientX - _) ** 2 + (F.clientY - L) ** 2
              ) >= Nn && D();
              return;
            }
            const J = C.screenToFlowPosition(F.clientX, F.clientY), ne = Kt({
              containerEl: k,
              handleType: "target",
              excludeNodeId: y.source,
              cursorFlowPos: J,
              connectionSnapRadius: P,
              getNode: (oe) => C.getNode(oe),
              toFlowPosition: (oe, q) => C.screenToFlowPosition(oe, q)
            });
            ne.element !== W && (W?.classList.remove("flow-handle-active"), ne.element?.classList.add("flow-handle-active"), W = ne.element), R?.update({
              fromX: le,
              fromY: Z,
              toX: ne.position.x,
              toY: ne.position.y,
              source: y.source,
              sourceHandle: y.sourceHandle
            }), C.pendingConnection && (C.pendingConnection = {
              ...C.pendingConnection,
              position: ne.position
            }), C._pendingReconnection && (C._pendingReconnection = {
              ...C._pendingReconnection,
              position: ne.position
            }), G?.updatePointer(F.clientX, F.clientY);
          }, U = () => {
            if (B) return;
            B = !0, document.removeEventListener("pointermove", Q), document.removeEventListener("pointerup", ee), document.removeEventListener("pointercancel", ee), G?.stop(), G = null, R?.destroy(), R = null, j = null, W?.classList.remove("flow-handle-active"), T = null;
            const F = k.querySelector(
              `[data-flow-edge-id="${y.id}"]`
            );
            F && F.classList.remove("flow-edge-reconnecting"), Pe(k), C.pendingConnection = null, C._pendingReconnection = null;
          }, ee = (F) => {
            if (!N) {
              U();
              return;
            }
            let J = W;
            J || (J = document.elementFromPoint(F.clientX, F.clientY)?.closest('[data-flow-handle-type="target"]'));
            let ne = !1;
            if (J) {
              const q = J.closest("[x-flow-node]")?.dataset.flowNodeId, ce = J.dataset.flowHandleId;
              if (q && C.getNode(q)?.connectable !== !1) {
                const O = {
                  source: y.source,
                  sourceHandle: y.sourceHandle,
                  target: q,
                  targetHandle: ce
                }, re = C.edges.filter(
                  (fe) => fe.id !== y.id
                );
                if (Ze(O, re, { preventCycles: C._config?.preventCycles })) {
                  if (!st(O, C._config?.connectionRules, C._nodeMap))
                    V("reconnect", "Reconnection rejected (connection rules)", O);
                  else if (!qe(k, O, re))
                    V("reconnect", "Reconnection rejected (handle limit)", O);
                  else if (!Be(k, O))
                    V("reconnect", "Reconnection rejected (per-handle validator)", O);
                  else if (!C._config?.isValidConnection || C._config.isValidConnection(O)) {
                    const fe = { ...y };
                    C._captureHistory?.(), y.target = O.target, y.targetHandle = O.targetHandle, ne = !0, V("reconnect", `Edge "${y.id}" reconnected (target)`, O), C._emit("reconnect", { oldEdge: fe, newConnection: O });
                  }
                }
              }
            }
            ne || V("reconnect", `Edge "${y.id}" reconnection cancelled — snapping back`), C._emit("reconnect-end", { edge: y, successful: ne }), U();
          };
          document.addEventListener("pointermove", Q), document.addEventListener("pointerup", ee), document.addEventListener("pointercancel", ee), T = U;
        };
        e.addEventListener("pointerdown", M), l(() => {
          T?.(), e.removeEventListener("pointerdown", M), e.removeEventListener("pointerenter", S), e.removeEventListener("pointerleave", b), e.removeEventListener("click", A), e.classList.remove("flow-handle", `flow-handle-${a}`, "flow-handle-active");
        });
      }
    }
  );
}
const Qi = {
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
function sf(t) {
  if (!t) return { ...Qi };
  const e = { ...Qi };
  for (const n of Object.keys(t))
    n in t && (e[n] = t[n]);
  return e;
}
function Ve(t, e) {
  if (e == null) return !1;
  const n = t.length === 1 ? t.toLowerCase() : t;
  return Array.isArray(e) ? e.some((o) => (o.length === 1 ? o.toLowerCase() : o) === n) : (e.length === 1 ? e.toLowerCase() : e) === n;
}
function lt(t, e) {
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
function rf(t, e, n = {}) {
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
const es = 20;
function xr(t) {
  return new Map(t.map((e) => [e.id, e]));
}
function zo(t, e, n) {
  if (!t.position) return { x: 0, y: 0 };
  let o = t.position.x, i = t.position.y;
  const r = /* @__PURE__ */ new Set();
  r.add(t.id);
  let s = t.parentId ? e.get(t.parentId) : void 0;
  for (; s && !r.has(s.id); ) {
    r.add(s.id);
    const l = s.nodeOrigin ?? n ?? [0, 0], a = s.dimensions?.width ?? ve, c = s.dimensions?.height ?? _e;
    o += s.position.x - a * l[0], i += s.position.y - c * l[1], s = s.parentId ? e.get(s.parentId) : void 0;
  }
  return { x: o, y: i };
}
function At(t, e, n) {
  if (!t.parentId)
    return t;
  const o = zo(t, e, n);
  return { ...t, position: o };
}
function Un(t, e, n) {
  return t.map((o) => At(o, e, n));
}
function ct(t, e) {
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
function dt(t) {
  const e = xr(t), n = [], o = /* @__PURE__ */ new Set();
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
function Er(t, e, n = /* @__PURE__ */ new Set()) {
  if (n.has(t.id))
    return t.zIndex ?? 2;
  if (n.add(t.id), !t.parentId)
    return t.zIndex !== void 0 ? t.zIndex : t.type === "group" ? 0 : 2;
  const o = e.get(t.parentId);
  return o ? Er(o, e, n) + 2 + (t.zIndex ?? 0) : (t.zIndex ?? 0) + 2;
}
function Sr(t, e, n) {
  return {
    x: Math.max(e[0][0], Math.min(t.x, e[1][0] - (n?.width ?? 0))),
    y: Math.max(e[0][1], Math.min(t.y, e[1][1] - (n?.height ?? 0)))
  };
}
function po(t, e, n) {
  return {
    x: Math.max(0, Math.min(t.x, n.width - e.width)),
    y: Math.max(0, Math.min(t.y, n.height - e.height))
  };
}
function Cn(t, e, n) {
  const o = e.extent ?? n;
  if (!o || o === "parent" || e.parentId) return t;
  const i = e.dimensions ?? { width: ve, height: _e };
  return Sr(t, o, i);
}
function af(t, e, n) {
  const o = t.x + e.width + es, i = t.y + e.height + es, r = Math.max(n.width, o), s = Math.max(n.height, i);
  return r === n.width && s === n.height ? null : { width: r, height: s };
}
function ts(t, e, n) {
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
function lf(t, e, n) {
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
function cf(t, e, n) {
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
function df(t, e, n) {
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
function uf(t, e, n) {
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
function ff(t, e, n) {
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
function hf(t, e, n) {
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
function pf(t, e, n) {
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
const Cr = {
  circle: { perimeterPoint: lf },
  diamond: { perimeterPoint: cf },
  hexagon: { perimeterPoint: df },
  parallelogram: { perimeterPoint: uf },
  triangle: { perimeterPoint: ff },
  cylinder: { perimeterPoint: hf },
  stadium: { perimeterPoint: pf }
};
function Pr(t, e = "light") {
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
const go = "__alpineflow_collab_store__";
function gf() {
  return typeof globalThis < "u" ? (globalThis[go] || (globalThis[go] = /* @__PURE__ */ new WeakMap()), globalThis[go]) : /* @__PURE__ */ new WeakMap();
}
const $e = gf(), mo = "__alpineflow_registry__";
function kr() {
  return typeof globalThis < "u" ? (globalThis[mo] || (globalThis[mo] = /* @__PURE__ */ new Map()), globalThis[mo]) : /* @__PURE__ */ new Map();
}
function Pt(t) {
  return kr().get(t);
}
function mf(t, e) {
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
const yf = 1e3;
class wf {
  constructor(e, n) {
    this._clearTimer = null, this._formatMessage = n ?? mf, this._el = document.createElement("div"), this._el.setAttribute("aria-live", "polite"), this._el.setAttribute("aria-atomic", "true"), this._el.setAttribute("role", "status");
    const o = this._el.style;
    o.position = "absolute", o.width = "1px", o.height = "1px", o.padding = "0", o.margin = "-1px", o.overflow = "hidden", o.clip = "rect(0,0,0,0)", o.whiteSpace = "nowrap", o.border = "0", e.appendChild(this._el);
  }
  announce(e) {
    this._clearTimer && clearTimeout(this._clearTimer), this._el.textContent = e, this._clearTimer = setTimeout(() => {
      this._el.textContent = "", this._clearTimer = null;
    }, yf);
  }
  handleEvent(e, n) {
    const o = this._formatMessage(e, n);
    o && this.announce(o);
  }
  destroy() {
    this._clearTimer && clearTimeout(this._clearTimer), this._el.remove();
  }
}
class vf {
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
const _f = {
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
}, bf = {
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
  "flow:toggleNode": "toggleNode",
  // RunState (D2)
  "flow:setNodeState": "setNodeState",
  "flow:resetStates": "resetStates"
}, xf = {
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
  "flow:toggleNode": (t) => [t.id],
  // RunState (D2)
  "flow:setNodeState": (t) => [t.ids, t.state],
  "flow:resetStates": () => []
}, ns = {
  success: { borderColor: "#22c55e", shadow: "0 0 0 2px rgba(34,197,94,0.3)" },
  error: { borderColor: "#ef4444", shadow: "0 0 0 2px rgba(239,68,68,0.3)" },
  warning: { borderColor: "#f59e0b", shadow: "0 0 0 2px rgba(245,158,11,0.3)" },
  info: { borderColor: "#3b82f6", shadow: "0 0 0 2px rgba(59,130,246,0.3)" }
};
function Ef(t, e) {
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
    const r = ns[o.style] ?? ns.info, s = o.duration ?? 1500, l = Math.floor(s * 0.6), a = Math.floor(s * 0.4), c = i.style?.borderColor ?? null, d = i.style?.boxShadow ?? null;
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
function Sf(t) {
  return "on" + t.split("-").map(
    (e) => e.charAt(0).toUpperCase() + e.slice(1)
  ).join("");
}
function Cf(t, e, n) {
  for (const [o, i] of Object.entries(n)) {
    const r = Sf(o), s = t[r];
    t[r] = (l) => {
      let a;
      typeof s == "function" && (a = s(l));
      const c = _f[o], d = c ? c(l) : [l], f = e[i];
      return typeof f == "function" && f.call(e, ...d), a;
    };
  }
}
function Pf(t, e) {
  const n = [];
  for (const [o, i] of Object.entries(bf)) {
    const r = e.on(o, (s) => {
      const l = t[i];
      if (typeof l != "function") return;
      const a = xf[o], c = a ? a(s) : Object.values(s);
      l.call(t, ...c);
    });
    n.push(r);
  }
  return () => {
    for (const o of n)
      typeof o == "function" && o();
  };
}
const kf = 5;
function Lf(t) {
  const e = /* @__PURE__ */ new Set(), n = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Set();
  let i = null, r = /* @__PURE__ */ new Set(), s = 0;
  const l = /* @__PURE__ */ new Set();
  function a() {
    i === null && (i = requestAnimationFrame(() => {
      i = null;
      for (const c of e) {
        const f = (r.has(c) ? n.get(c) ?? 0 : 0) + 1;
        n.set(c, f), f > kf && !o.has(c) && (o.add(c), console.warn(
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
          l.add(c);
          return;
        }
        e.has(c) || (e.add(c), a(), t(c));
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
        for (const c of l)
          o.has(c) || e.has(c) || (e.add(c), a(), t(c));
        l.clear();
      }
    }
  };
}
function Mf(t) {
  return function(n) {
    t.suspend();
    try {
      return n();
    } finally {
      t.resume();
    }
  };
}
function Tf(t, e, n) {
  let { width: o, height: i } = t;
  return e?.width !== void 0 && (o = Math.max(o, e.width)), e?.height !== void 0 && (i = Math.max(i, e.height)), n?.width !== void 0 && (o = Math.min(o, n.width)), n?.height !== void 0 && (i = Math.min(i, n.height)), { width: o, height: i };
}
function Qt(t, e) {
  const n = t.type ?? "default", o = e[n], i = t.data?.childValidation;
  if (!(!o && !i))
    return o ? i ? { ...o, ...i } : o : i;
}
function Lr(t, e, n, o) {
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
function Zn(t, e, n, o) {
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
function os(t, e, n) {
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
function Ht(t, e) {
  const n = zt(t, e);
  return {
    x: n.x,
    y: n.y,
    width: t.dimensions?.width ?? ve,
    height: t.dimensions?.height ?? _e
  };
}
function Mr(t, e) {
  return t.x < e.x + e.width && t.x + t.width > e.x && t.y < e.y + e.height && t.y + t.height > e.y;
}
function Af(t, e, n = !0) {
  const o = Ht(t);
  return e.filter((i) => {
    if (i.id === t.id) return !1;
    const r = Ht(i);
    return n ? Mr(o, r) : o.x <= r.x && o.y <= r.y && o.x + o.width >= r.x + r.width && o.y + o.height >= r.y + r.height;
  });
}
function Nf(t, e, n = !0) {
  if (t.id === e.id) return !1;
  const o = Ht(t), i = Ht(e);
  return n ? Mr(o, i) : o.x <= i.x && o.y <= i.y && o.x + o.width >= i.x + i.width && o.y + o.height >= i.y + i.height;
}
function $f(t, e, n, o, i = 5) {
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
function If(t) {
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
      V("init", `Adding ${o.length} node(s)`, o.map((c) => c.id));
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
              ], h = Lr(f, c, u, d);
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
      t.nodes = dt(t.nodes), t._rebuildNodeMap();
      for (const c of o)
        if (c.childLayout) {
          const d = t._nodeMap.get(c.id);
          d && t._installChildLayoutWatchers(d);
        }
      t._emit("nodes-change", { type: "add", nodes: o });
      const s = t._container ? $e.get(t._container) : void 0;
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
      for (const c of a)
        t._layoutDedup ? t._layoutDedup.safeLayoutChildren(c) : t.layoutChildren?.(c);
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
        ), w = Zn(p, u, g, h);
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
        for (const u of ct(f, t.nodes))
          n.add(u);
      V("destroy", `Removing ${n.size} node(s)`, [...n]);
      const r = t.nodes.filter((f) => n.has(f.id));
      let s = [];
      t._config.reconnectOnDelete && (s = Uu(n, t.nodes, t.edges));
      const l = [];
      t.edges = t.edges.filter((f) => n.has(f.source) || n.has(f.target) ? (l.push(f.id), !1) : !0), s.length && (t.edges.push(...s), V("destroy", `Created ${s.length} reconnection edge(s)`)), t._rebuildEdgeMap(), t.nodes = t.nodes.filter((f) => !n.has(f.id)), t._rebuildNodeMap();
      for (const f of n)
        t.selectedNodes.delete(f), t._initialDimensions.delete(f), t._uninstallChildLayoutWatchers(f);
      r.length && t._emit("nodes-change", { type: "remove", nodes: r }), s.length && t._emit("edges-change", { type: "add", edges: s });
      const a = t._container ? $e.get(t._container) : void 0;
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
      return Ho(e, t.nodes, t.edges);
    },
    /**
     * Get all nodes connected via incoming edges to the given node.
     */
    getIncomers(e) {
      return Yu(e, t.nodes, t.edges);
    },
    /**
     * Get all edges connected to a node (both incoming and outgoing).
     */
    getConnectedEdges(e) {
      return Xu(e, t.edges);
    },
    /**
     * Check if two nodes are connected by an edge.
     * When `directed` is true, only checks source→target direction.
     */
    areNodesConnected(e, n, o = !1) {
      return ju(e, n, t.edges, o);
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
      V("filter", `Node filter applied: ${o.length} visible, ${n.length} filtered`), t._emit("node-filter-change", { filtered: n, visible: o });
    },
    /**
     * Clear node filter — restore all nodes to visible.
     */
    clearNodeFilter() {
      let e = !1;
      for (const n of t.nodes)
        n.filtered && (n.filtered = !1, e = !0);
      e && (V("filter", "Node filter cleared"), t._emit("node-filter-change", { filtered: [], visible: [...t.nodes] }));
    },
    /**
     * Get nodes whose bounding rect overlaps the given node.
     * Accepts either a FlowNode object or a node ID string.
     */
    getIntersectingNodes(e, n) {
      const o = typeof e == "string" ? t.nodes.find((i) => i.id === e) : e;
      return o ? Af(o, t.nodes, n) : [];
    },
    /**
     * Check if two nodes' bounding rects overlap.
     * Accepts either FlowNode objects or node ID strings.
     */
    isNodeIntersecting(e, n, o) {
      const i = typeof e == "string" ? t.nodes.find((s) => s.id === e) : e, r = typeof n == "string" ? t.nodes.find((s) => s.id === n) : n;
      return !i || !r ? !1 : Nf(i, r, o);
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
function Df(t) {
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
      const n = t._config.defaultEdgeOptions, o = t._config.connectionRules, i = (Array.isArray(e) ? e : [e]).map((s) => n ? { ...n, ...s } : s).filter((s) => {
        if (!o) return !0;
        const l = { source: s.source, sourceHandle: s.sourceHandle, target: s.target, targetHandle: s.targetHandle };
        return st(l, o, t._nodeMap);
      });
      if (i.length === 0) return;
      t._captureHistory(), V("edge", `Adding ${i.length} edge(s)`, i.map((s) => s.id)), t.edges.push(...i), t._rebuildEdgeMap(), t._emit("edges-change", { type: "add", edges: i });
      const r = t._container ? $e.get(t._container) : void 0;
      if (r?.bridge)
        for (const s of i)
          r.bridge.pushLocalEdgeAdd(s);
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
      V("edge", `Removing ${n.size} edge(s)`, [...n]);
      const o = t.edges.filter((r) => n.has(r.id));
      t.edges = t.edges.filter((r) => !n.has(r.id)), t._rebuildEdgeMap();
      for (const r of n)
        t.selectedEdges.delete(r);
      o.length && t._emit("edges-change", { type: "remove", edges: o });
      const i = t._container ? $e.get(t._container) : void 0;
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
function Rf(t) {
  return {
    // ── Coordinate Transforms ─────────────────────────────────────────────
    /**
     * Convert screen coordinates (e.g. from a pointer event) to flow
     * coordinates, accounting for the current viewport pan and zoom.
     */
    screenToFlowPosition(e, n) {
      if (!t._container) return { x: e, y: n };
      const o = t._container.getBoundingClientRect();
      return rr(e, n, t.viewport, o);
    },
    /**
     * Convert flow coordinates to screen coordinates, accounting for the
     * current viewport pan and zoom.
     */
    flowToScreenPosition(e, n) {
      if (!t._container) return { x: e, y: n };
      const o = t._container.getBoundingClientRect();
      return hu(e, n, t.viewport, o);
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
      const o = t.nodes.filter((r) => !r.hidden), i = Dt(Un(o, t._nodeMap, t._config.nodeOrigin), t._config.nodeOrigin);
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
      const o = t._container ? { width: t._container.clientWidth, height: t._container.clientHeight } : { width: 800, height: 600 }, i = Bn(
        e,
        o.width,
        o.height,
        t._config.minZoom ?? 0.5,
        t._config.maxZoom ?? 2,
        n?.padding ?? Ro
      );
      V("viewport", "fitBounds", { rect: e, viewport: i });
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
      return e ? n = e.map((o) => t.getNode(o)).filter((o) => !!o) : n = t.nodes.filter((o) => !o.hidden), Dt(Un(n, t._nodeMap, t._config.nodeOrigin), t._config.nodeOrigin);
    },
    /**
     * Compute the viewport (pan + zoom) that frames the given bounds
     * within the container, respecting min/max zoom and padding.
     */
    getViewportForBounds(e, n) {
      const o = t._container;
      return o ? Bn(
        e,
        o.clientWidth,
        o.clientHeight,
        t._config.minZoom ?? 0.5,
        t._config.maxZoom ?? 2,
        n ?? Ro
      ) : { x: 0, y: 0, zoom: 1 };
    },
    // ── Viewport Mutation ─────────────────────────────────────────────────
    /**
     * Set the viewport programmatically (pan and/or zoom).
     */
    setViewport(e, n) {
      V("viewport", "setViewport", e), t._panZoom?.setViewport(e, n);
    },
    /**
     * Zoom in by `ZOOM_STEP_FACTOR`, clamped to `maxZoom`.
     */
    zoomIn(e) {
      const n = t._config.maxZoom ?? 2, o = Math.min(t.viewport.zoom * Hi, n);
      V("viewport", "zoomIn", { from: t.viewport.zoom, to: o }), t._panZoom?.setViewport({ ...t.viewport, zoom: o }, e);
    },
    /**
     * Zoom out by `ZOOM_STEP_FACTOR`, clamped to `minZoom`.
     */
    zoomOut(e) {
      const n = t._config.minZoom ?? 0.5, o = Math.max(t.viewport.zoom / Hi, n);
      V("viewport", "zoomOut", { from: t.viewport.zoom, to: o }), t._panZoom?.setViewport({ ...t.viewport, zoom: o }, e);
    },
    /**
     * Center the viewport on flow coordinate `(x, y)` at the given zoom
     * level (defaults to the current zoom).
     */
    setCenter(e, n, o, i) {
      const r = t._container;
      if (!r) return;
      const s = o ?? t.viewport.zoom, l = r.clientWidth / 2 - e * s, a = r.clientHeight / 2 - n * s;
      V("viewport", "setCenter", { x: e, y: n, zoom: s }), t._panZoom?.setViewport({ x: l, y: a, zoom: s }, i);
    },
    /**
     * Pan the viewport by a delta `(dx, dy)`.
     */
    panBy(e, n, o) {
      V("viewport", "panBy", { dx: e, dy: n }), t._panZoom?.setViewport(
        { x: t.viewport.x + e, y: t.viewport.y + n, zoom: t.viewport.zoom },
        o
      );
    },
    // ── Interactivity Toggle ──────────────────────────────────────────────
    /**
     * Toggle pan/zoom interactivity on and off.
     */
    toggleInteractive() {
      t.isInteractive = !t.isInteractive, V("interactive", "toggleInteractive", { isInteractive: t.isInteractive }), t._panZoom?.update({
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
      V("panel", "resetPanels"), t._container?.dispatchEvent(new CustomEvent("flow-panel-reset")), t._emit("panel-reset");
    }
  };
}
let mt = null;
const Hf = 20;
function Oo(t) {
  return JSON.parse(JSON.stringify(t));
}
function is(t) {
  return `${t}-copy-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
}
function Tr(t, e) {
  const n = t.filter((r) => r.selected), o = new Set(n.map((r) => r.id)), i = e.filter(
    (r) => r.selected || o.has(r.source) && o.has(r.target)
  );
  return mt = {
    nodes: Oo(n),
    edges: Oo(i),
    pasteCount: 0
  }, { nodeCount: n.length, edgeCount: i.length };
}
function Ff() {
  if (!mt || mt.nodes.length === 0) return null;
  mt.pasteCount++;
  const t = mt.pasteCount * Hf, e = /* @__PURE__ */ new Map(), n = mt.nodes.map((i) => {
    const r = is(i.id);
    return e.set(i.id, r), {
      ...i,
      id: r,
      data: Oo(i.data),
      position: { x: i.position.x + t, y: i.position.y + t },
      selected: !0
    };
  }), o = mt.edges.map((i) => ({
    ...i,
    id: is(i.id),
    source: e.get(i.source),
    target: e.get(i.target),
    selected: !0
  }));
  return { nodes: n, edges: o };
}
function zf(t, e) {
  const n = Tr(t, e);
  return { nodeIds: t.filter((i) => i.selected).map((i) => i.id), ...n };
}
function Of(t) {
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
        V("selection", "Deselecting all");
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
        return c ? Ju(c) : !1;
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
        ), u = Zn(d, a, f, c);
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
            V("delete", "onBeforeDelete cancelled deletion");
            return;
          }
          t._captureHistory(), t._suspendHistory();
          try {
            if (a.nodes.length > 0 && (V("delete", `onBeforeDelete approved ${a.nodes.length} node(s)`), t.removeNodes(a.nodes.map((c) => c.id))), a.edges.length > 0) {
              const c = a.edges.map((d) => d.id).filter((d) => t.edges.some((f) => f.id === d));
              c.length > 0 && (V("delete", `onBeforeDelete approved ${c.length} edge(s)`), t.removeEdges(c));
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
          if (o.length > 0 && (V("delete", `Deleting ${o.length} selected node(s)`), t.removeNodes(o.map((a) => a.id))), n.length > 0) {
            const a = n.filter(
              (c) => t.edges.some((d) => d.id === c)
            );
            a.length > 0 && (V("delete", `Deleting ${a.length} selected edge(s)`), t.removeEdges(a));
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
      const e = Tr(t.nodes, t.edges);
      e.nodeCount > 0 && (V("clipboard", `Copied ${e.nodeCount} node(s) and ${e.edgeCount} edge(s)`), t._emit("copy", e));
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
      const e = Ff();
      if (e) {
        t._captureHistory(), t.deselectAll(), t.nodes.push(...e.nodes), t.nodes = dt(t.nodes), t._rebuildNodeMap(), t.edges.push(...e.edges), t._rebuildEdgeMap();
        for (const n of e.nodes)
          t.selectedNodes.add(n.id);
        for (const n of e.edges)
          t.selectedEdges.add(n.id);
        t._emitSelectionChange(), t._emit("nodes-change", { type: "add", nodes: e.nodes }), t._emit("edges-change", { type: "add", edges: e.edges }), t._emit("paste", { nodes: e.nodes, edges: e.edges }), V("clipboard", `Pasted ${e.nodes.length} node(s) and ${e.edges.length} edge(s)`), t.$nextTick(() => {
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
      const e = zf(t.nodes, t.edges);
      e.nodeCount !== 0 && (await t._deleteSelected(), t._emit("cut", { nodeCount: e.nodeCount, edgeCount: e.edgeCount }), V("clipboard", `Cut ${e.nodeCount} node(s)`));
    }
  };
}
function Vf(t) {
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
      if (V("store", "fromObject: restoring state", {
        nodes: e.nodes?.length ?? 0,
        edges: e.edges?.length ?? 0,
        viewport: !!e.viewport
      }), e.nodes && (t.nodes = dt(JSON.parse(JSON.stringify(e.nodes)))), e.edges) {
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
      V("store", "$reset: restoring initial config"), this.fromObject({
        nodes: t._config.nodes ?? [],
        edges: t._config.edges ?? [],
        viewport: t._config.viewport ?? { x: 0, y: 0, zoom: 1 }
      });
    },
    /**
     * Clear all nodes and edges, resetting the viewport to origin.
     */
    $clear() {
      V("store", "$clear: emptying canvas"), this.fromObject({
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
      e && (t.nodes = dt(e.nodes), t.edges = e.edges, t._rebuildNodeMap(), t._rebuildEdgeMap(), t.deselectAll(), requestAnimationFrame(() => {
        t._layoutAnimTick++;
      }), V("history", "Undo applied", { nodes: e.nodes.length, edges: e.edges.length }));
    },
    /**
     * Redo the last undone change by popping a snapshot from the
     * history future stack. Rebuilds maps and deselects all after applying.
     */
    redo() {
      if (!t._history) return;
      const e = t._history.redo({ nodes: t.nodes, edges: t.edges });
      e && (t.nodes = dt(e.nodes), t.edges = e.edges, t._rebuildNodeMap(), t._rebuildEdgeMap(), t.deselectAll(), requestAnimationFrame(() => {
        t._layoutAnimTick++;
      }), V("history", "Redo applied", { nodes: e.nodes.length, edges: e.edges.length }));
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
function Bf(t, e) {
  return t * (1 - e);
}
function qf(t, e) {
  return t * e;
}
function Xf(t, e) {
  return e === "in" ? t : 1 - t;
}
function Yf(t, e, n) {
  const o = t.getTotalLength();
  t.style.strokeDasharray = String(o);
  const i = n === "in" ? Bf(o, e) : qf(o, e);
  t.style.strokeDashoffset = String(i), (n === "in" && e < 1 || n === "out") && (t.style.setProperty("marker-start", "none"), t.style.setProperty("marker-end", "none"));
}
function Wf(t) {
  t.style.removeProperty("stroke-dasharray"), t.style.removeProperty("stroke-dashoffset"), t.style.removeProperty("marker-start"), t.style.removeProperty("marker-end");
}
function jf(t, e, n) {
  t.style.opacity = String(Xf(e, n));
}
function Uf(t) {
  t.style.removeProperty("opacity");
}
const Ke = Math.PI * 2, Wt = /* @__PURE__ */ new Map(), Zf = 64;
function ai(t) {
  if (typeof document > "u" || typeof document.createElementNS != "function")
    return null;
  const e = Wt.get(t);
  if (e) return e;
  const n = document.createElementNS("http://www.w3.org/2000/svg", "path");
  n.setAttribute("d", t);
  const o = n.getTotalLength(), i = (r) => {
    const s = n.getPointAtLength(r * o);
    return { x: s.x, y: s.y };
  };
  if (Wt.size >= Zf) {
    const r = Wt.keys().next().value;
    r !== void 0 && Wt.delete(r);
  }
  return Wt.set(t, i), i;
}
function Pm(t) {
  const { cx: e, cy: n, offset: o = 0, clockwise: i = !0 } = t, r = t.rx ?? t.radius ?? 100, s = t.ry ?? t.radius ?? 100, l = i ? 1 : -1;
  return (a) => ({
    x: e + r * Math.cos(Ke * a * l + o * Ke),
    y: n + s * Math.sin(Ke * a * l + o * Ke)
  });
}
function km(t) {
  const { startX: e, startY: n, endX: o, endY: i, amplitude: r = 30, frequency: s = 1, offset: l = 0 } = t, a = o - e, c = i - n, d = Math.sqrt(a * a + c * c), f = d > 0 ? a / d : 1, h = -(d > 0 ? c / d : 0), p = f;
  return (g) => {
    const w = e + a * g, m = n + c * g, E = r * Math.sin(Ke * s * g + l * Ke);
    return { x: w + h * E, y: m + p * E };
  };
}
function Lm(t, e) {
  const n = ai(t);
  if (!n) return null;
  const { reverse: o = !1, startAt: i = 0, endAt: r = 1 } = e ?? {}, s = r - i;
  return (l) => {
    let a = i + l * s;
    return o && (a = r - l * s), n(a);
  };
}
function Mm(t) {
  const { cx: e, cy: n, radius: o, angle: i = 60, offset: r = 0 } = t, s = i * Math.PI / 180;
  return (l) => {
    const a = s * Math.sin(Ke * l + r * Ke);
    return {
      x: e + o * Math.sin(a),
      y: n + o * Math.cos(a)
    };
  };
}
function Tm(t) {
  const { originX: e, originY: n, range: o = 20, speed: i = 1, seed: r = 0 } = t, s = 1 + r % 7 * 0.3, l = 1.3 + r % 11 * 0.2, a = 0.7 + r % 13 * 0.25, c = 1.1 + r % 17 * 0.15;
  return (d) => {
    const f = d * i * Ke, u = (Math.sin(s * f) + Math.sin(l * f * 1.3)) / 2, h = (Math.sin(a * f * 0.9) + Math.sin(c * f * 1.1)) / 2;
    return { x: e + u * o, y: n + h * o };
  };
}
function Am(t, e) {
  const n = e?.from ?? 0;
  return (o, i) => n + o * t;
}
let ss = !1;
function ye(t) {
  try {
    return structuredClone(t);
  } catch {
    return ss || (ss = !0, typeof console < "u" && console.warn(
      "[AlpineFlow] Cloning fell back to JSON roundtrip because structuredClone could not clone the input (likely a reactive proxy or an object with functions). Non-JSON values (functions, Symbols, Dates) will be stripped. This warning fires once per session."
    )), JSON.parse(JSON.stringify(t));
  }
}
function Gf(t) {
  return {
    position: { ...t.position },
    class: t.class,
    style: typeof t.style == "string" ? t.style : t.style ? { ...t.style } : void 0,
    data: ye(t.data),
    dimensions: t.dimensions ? { ...t.dimensions } : void 0,
    selected: t.selected,
    zIndex: t.zIndex
  };
}
function Kf(t) {
  return {
    animated: t.animated,
    color: t.color,
    class: t.class,
    label: t.label,
    strokeWidth: t.strokeWidth
  };
}
function Jf(t, e) {
  t.position.x = e.position.x, t.position.y = e.position.y, t.class = e.class, t.style = e.style, t.data = ye(e.data), t.dimensions = e.dimensions ? { ...e.dimensions } : t.dimensions, t.selected = e.selected, t.zIndex = e.zIndex;
}
class li {
  constructor(e, n) {
    this._entries = [], this._state = "idle", this._reversed = !1, this._loopCount = -1, this._lockEnabled = !1, this._locked = !1, this._respectReducedMotion = void 0, this._listeners = /* @__PURE__ */ new Map(), this._context = {}, this._activeHandles = [], this._subTimelines = [], this._initialSnapshot = /* @__PURE__ */ new Map(), this._initialEdgeSnapshot = /* @__PURE__ */ new Map(), this._playResolve = null, this._pauseWaiters = /* @__PURE__ */ new Set(), this._canvas = e, this._engine = n ?? new dr();
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
    const o = new li(this._canvas, this._engine);
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
    return ur(this._respectReducedMotion);
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
          o && this._initialSnapshot.set(n, Gf(o));
        }
    }
    if (e.edges) {
      for (const n of e.edges)
        if (!this._initialEdgeSnapshot.has(n)) {
          const o = this._canvas.getEdge(n);
          o && this._initialEdgeSnapshot.set(n, Kf(o));
        }
    }
  }
  _restoreInitialSnapshot() {
    for (const [e, n] of this._initialSnapshot) {
      const o = this._canvas.getNode(e);
      o && Jf(o, n);
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
    const o = this._isReducedMotion(), i = o ? 0 : e.duration ?? 300, r = o ? 0 : e.delay ?? 0, s = Xn(e.easing), l = this._makeContext(n, e.id);
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
        const C = this._subTimelines.indexOf(v);
        C >= 0 && this._subTimelines.splice(C, 1);
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
    const S = e.edgeTransition ?? "none", b = e.addEdges?.map((v) => v.id) ?? [], A = e.removeEdges?.filter((v) => this._canvas.getEdge(v)).slice() ?? [], T = {
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
      transition: S,
      addEdgeIds: b,
      removeEdgeIds: A
    };
    if (i === 0)
      return this._executeInstantStep(T);
    const M = this._prepareAnimatedEdges(e, S, b);
    return M && await M, p ? this._executeFollowPathStep(T) : this._executeAnimatedStep(T);
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
        s && (s.dimensions && e.dimensions && o.set(r, { ...s.dimensions }), e.style && s.style && i.set(r, an(s.style)));
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
    const n = ai(e.followPath);
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
    } = e, S = e.resolvedPathFn;
    return new Promise((b) => {
      const A = this._engine.register((T) => {
        if (this._state === "stopped")
          return b(), !0;
        const M = Math.min(T / i, 1), v = s(M);
        if (l) {
          const C = S(v);
          for (const $ of l) {
            const x = this._canvas.getNode($);
            x && (x.position.x = C.x, x.position.y = C.y);
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
        ), this._tickEdgeTransitions(g, w, m, v), n.onProgress?.(M, o), M >= 1 ? (this._cleanupEdgeTransitions(g, w, m), m.length && this._removeEdges(m), this._applyStepInstant(n), E && n.guidePath?.autoRemove !== !1 && E.remove(), n.onProgress?.(1, o), n.onComplete?.(o), this._emit("step-complete"), b(), !0) : !1;
      }, r);
      this._activeHandles.push(A);
    });
  }
  /** Per-tick interpolation for properties during followPath animation. */
  _interpolateFollowPathTick(e, n, o, i, r, s, l, a, c, d) {
    if (o && e.dimensions)
      for (const f of o) {
        const u = this._canvas.getNode(f), h = r.get(f);
        !u || !h || !u.dimensions || (e.dimensions.width !== void 0 && (u.dimensions.width = Je(h.width, e.dimensions.width, n)), e.dimensions.height !== void 0 && (u.fixedDimensions = !0, u.dimensions.height = Je(h.height, e.dimensions.height, n)));
      }
    if (o && e.style) {
      const f = an(e.style);
      for (const u of o) {
        const h = this._canvas.getNode(u), p = s.get(u);
        h && p && (h.style = fr(p, f, n));
      }
    }
    if (i && e.edgeStrokeWidth !== void 0)
      for (const f of i) {
        const u = this._canvas.getEdge(f), h = l.get(f);
        u && (h !== void 0 ? u.strokeWidth = Je(h, e.edgeStrokeWidth, n) : u.strokeWidth = e.edgeStrokeWidth);
      }
    if (i && e.edgeColor !== void 0)
      for (const f of i) {
        const u = this._canvas.getEdge(f), h = a.get(f);
        u && (h !== void 0 && typeof h == "string" ? u.color = oi(h, e.edgeColor, n) : u.color = e.edgeColor);
      }
    if (c && d && this._canvas.viewport) {
      const f = Su(c, d, n, {
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
      r && Yf(r, n, o);
    }
  }
  /** Clean up draw transition styles. */
  _cleanupEdgeDrawTransition(e) {
    for (const n of e) {
      const o = this._canvas.getEdgePathElement?.(n);
      o && Wf(o);
    }
  }
  /** Apply fade transition on each tick for added/removed edges. */
  _applyEdgeFadeTransition(e, n, o) {
    for (const i of e) {
      const r = this._canvas.getEdgeElement?.(i);
      r && jf(r, n, o);
    }
  }
  /** Clean up fade transition styles. */
  _cleanupEdgeFadeTransition(e) {
    for (const n of e) {
      const o = this._canvas.getEdgeElement?.(n);
      o && Uf(o);
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
    const i = Dt(o), r = e.fitViewPadding ?? 0.1;
    return Bn(
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
    const r = n.dimensions?.width ?? ve, s = n.dimensions?.height ?? _e, l = n.position.x + r / 2, a = n.position.y + s / 2;
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
const Ar = /* @__PURE__ */ new Map();
function Ot(t, e) {
  Ar.set(t, e);
}
function Qf(t) {
  return Ar.get(t);
}
const Ie = "http://www.w3.org/2000/svg", eh = {
  create(t, e) {
    const n = document.createElementNS(Ie, "circle");
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
}, th = {
  create(t, e) {
    const n = document.createElementNS(Ie, "g"), o = e.size ?? 6, i = e.color ?? "#8B5CF6", r = document.createElementNS(Ie, "circle");
    r.setAttribute("r", String(o * 1.5)), r.setAttribute("fill", i), r.setAttribute("opacity", "0.3"), n.appendChild(r);
    const s = document.createElementNS(Ie, "circle");
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
let nh = 0;
const oh = {
  create(t, e) {
    const n = document.createElementNS(Ie, "g");
    if (n.__beamLength = e.length ?? 30, n.__beamWidth = e.width ?? 4, n.__beamColor = e.color ?? "#8B5CF6", n.__beamGradient = e.gradient, n.__beamFollowThrough = e.followThrough ?? !0, n.__beamUid = `afbeam-${++nh}`, e.class)
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
          const w = document.createElementNS(Ie, "defs");
          f = document.createElementNS(Ie, "linearGradient"), f.setAttribute("id", l), f.setAttribute("gradientUnits", "userSpaceOnUse");
          for (const m of s) {
            const E = document.createElementNS(Ie, "stop");
            E.setAttribute("offset", String(m.offset)), E.setAttribute("stop-color", m.color), m.opacity !== void 0 && E.setAttribute("stop-opacity", String(m.opacity)), f.appendChild(E);
          }
          w.appendChild(f), n.appendChild(w), g = `url(#${l})`, n.__gradient = f;
        }
        d = document.createElementNS(Ie, "path"), d.setAttribute("d", e.pathEl.getAttribute("d") ?? ""), d.setAttribute("fill", "none"), d.style.stroke = g, d.style.strokeWidth = String(i), d.style.strokeLinecap = "round", d.style.fill = "none", s || (d.style.opacity = "0.85"), d.setAttribute("stroke-dasharray", `${o} ${e.pathLength}`), n.appendChild(d), n.__pathClone = d;
      }
      const h = n.__beamFollowThrough ? e.progress * (e.pathLength + o) : e.progress * e.pathLength, p = o - h;
      if (d.setAttribute("stroke-dashoffset", String(p)), f) {
        const g = Math.max(0, Math.min(e.pathLength, h)), w = Math.max(0, Math.min(e.pathLength, h - o)), m = e.pathEl.getPointAtLength(g), E = e.pathEl.getPointAtLength(w);
        f.setAttribute("x1", String(E.x)), f.setAttribute("y1", String(E.y)), f.setAttribute("x2", String(m.x)), f.setAttribute("y2", String(m.y));
      }
      return;
    }
    let a = n.__fallbackRect;
    a || (a = document.createElementNS(Ie, "rect"), a.setAttribute("width", String(o)), a.setAttribute("height", String(i)), a.setAttribute("rx", String(i / 2)), a.setAttribute("fill", r), a.setAttribute("opacity", "0.8"), n.appendChild(a), n.__fallbackRect = a);
    const c = Math.atan2(e.velocity.y, e.velocity.x) * (180 / Math.PI);
    a.setAttribute(
      "transform",
      `translate(${e.x - o / 2},${e.y - i / 2}) rotate(${c},${o / 2},${i / 2})`
    );
  },
  destroy(t) {
    t.remove();
  }
}, ih = {
  create(t, e) {
    const n = document.createElementNS(Ie, "circle");
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
}, sh = {
  create(t, e) {
    const n = e.size ?? 16, o = e.href ?? "";
    let i;
    if (o.startsWith("#") ? (i = document.createElementNS(Ie, "use"), i.setAttribute("href", o), i.setAttribute("width", String(n)), i.setAttribute("height", String(n))) : (i = document.createElementNS(Ie, "image"), i.setAttribute("href", o), i.setAttribute("width", String(n)), i.setAttribute("height", String(n))), e.class)
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
Ot("circle", eh);
Ot("orb", th);
Ot("beam", oh);
Ot("pulse", ih);
Ot("image", sh);
let rs = !1;
function rh(t) {
  const e = t.match(/^([\d.]+)(ms|s)?$/);
  if (!e) return 2e3;
  const n = parseFloat(e[1]);
  return e[2] === "ms" ? n : n * 1e3;
}
function as(t, e, n) {
  if (t.speed !== void 0 && t.speed > 0)
    return t.duration !== void 0 && console.warn("[AlpineFlow] Both speed and duration provided for particle; speed takes precedence."), e / t.speed * 1e3;
  const o = t.duration ?? n;
  return typeof o == "number" ? o : rh(o);
}
function ah(t) {
  function e(o, i, r = {}, s = {}) {
    const l = r.renderer ?? "circle", a = Qf(l);
    if (!a) {
      V("particle", `_fireParticleOnPath: unknown renderer "${l}"`);
      return;
    }
    l === "beam" && typeof r.onComplete == "function" && r.followThrough === void 0 && !rs && (rs = !0, console.warn(
      "[AlpineFlow] beam `onComplete` fires after the tail exits the path (follow-through is on by default). Pass `followThrough: false` if you want `onComplete` to fire when the head reaches the target."
    ));
    const c = t._containerStyles, d = r.size ?? s.size ?? (parseFloat(c?.getPropertyValue("--flow-edge-dot-size").trim() ?? "4") || 4), f = r.color ?? s.color ?? c?.getPropertyValue("--flow-edge-dot-fill").trim() ?? rn, u = s.durationFallback ?? c?.getPropertyValue("--flow-edge-dot-duration").trim() ?? "2s", h = o.getTotalLength(), p = as(r, h, u), g = { ...r, size: d, color: f }, w = a.create(i, g), m = o.getPointAtLength(0), E = {
      x: m.x,
      y: m.y,
      progress: 0,
      velocity: { x: 0, y: 0 },
      pathLength: h,
      elapsed: 0,
      pathEl: o
    };
    a.update(w, E);
    let S;
    const b = new Promise((C) => {
      S = C;
    }), A = () => {
      typeof r.onComplete == "function" && r.onComplete(), S();
    }, T = s.wrapOnComplete ? s.wrapOnComplete(A) : A, M = {
      element: w,
      renderer: a,
      pathEl: o,
      startElapsed: -1,
      // set on first engine tick
      ms: p,
      onComplete: T,
      currentPosition: { x: m.x, y: m.y }
    };
    return t._activeParticles.add(M), t._particleEngineHandle || (t._particleEngineHandle = qn.register((C) => t._tickParticles(C))), {
      getCurrentPosition() {
        return t._activeParticles.has(M) ? { ...M.currentPosition } : null;
      },
      stop() {
        t._activeParticles.has(M) && (M.renderer.destroy(M.element), t._activeParticles.delete(M), T());
      },
      get finished() {
        return b;
      }
    };
  }
  function n(o, i = {}) {
    const r = t.getEdgeSvgElement?.();
    if (!r) {
      V("particle", "sendParticleAlongPath: SVG layer unavailable");
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
    return V("particle", "sendParticleAlongPath", { path: o.slice(0, 40) }), l;
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
        V("particle", `sendParticle: edge "${o}" not found`);
        return;
      }
      const l = t.getEdgePathElement(o);
      if (!l) {
        V("particle", `sendParticle: no path element for edge "${o}"`);
        return;
      }
      if (!l.getAttribute("d")) {
        V("particle", `sendParticle: edge "${o}" path has no d attribute`);
        return;
      }
      const c = t.getEdgeElement(o);
      if (!c) return;
      const d = t._containerStyles, f = i.size ?? s.particleSize ?? (parseFloat(d?.getPropertyValue("--flow-edge-dot-size").trim() ?? "4") || 4), u = i.color ?? s.particleColor ?? d?.getPropertyValue("--flow-edge-dot-fill").trim() ?? rn, h = s.animationDuration ?? d?.getPropertyValue("--flow-edge-dot-duration").trim() ?? "2s", p = e(l, c, i, {
        size: f,
        color: u,
        durationFallback: h
      });
      return p && V("particle", `sendParticle on edge "${o}"`, { size: f, color: u, duration: i.duration }), p;
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
        V("particle", `sendParticleBetween: source node "${o}" not found`);
        return;
      }
      const l = t.getNode(i);
      if (!l) {
        V("particle", `sendParticleBetween: target node "${i}" not found`);
        return;
      }
      const a = s.position.x + (s.dimensions?.width ?? 150) / 2, c = s.position.y + (s.dimensions?.height ?? 40) / 2, d = l.position.x + (l.dimensions?.width ?? 150) / 2, f = l.position.y + (l.dimensions?.height ?? 40) / 2, u = `M ${a} ${c} L ${d} ${f}`;
      return V("particle", `sendParticleBetween "${o}" -> "${i}"`, { path: u }), n(u, r);
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
        const h = Math.max(...u.map((g) => g.length)), p = as(a, h, "2s");
        for (const { id: g, length: w } of u) {
          const m = w / h, E = p * m, S = p - E;
          if (S <= 0) {
            const b = this.sendParticle(g, { ...a, duration: E });
            b && c.push(b);
          } else {
            const b = setTimeout(() => {
              const A = this.sendParticle(g, { ...a, duration: E });
              A && c.push(A);
            }, S);
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
class lh {
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
const Vo = 1, Bo = 1 / 60;
class Gt {
  constructor(e) {
    this._virtualTime = 0, this._inFlight = /* @__PURE__ */ new Map(), this._state = ye(e);
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
    return ye(this._state);
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
            o?.id && (this._state.nodes[o.id] = ye(o));
        else n?.id ? this._state.nodes[n.id] = ye(n) : e.args.id && e.args.node && (this._state.nodes[e.args.id] = ye(e.args.node));
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
            o?.id && (this._state.edges[o.id] = ye(o));
        else n?.id ? this._state.edges[n.id] = ye(n) : e.args.id && e.args.edge && (this._state.edges[e.args.id] = ye(e.args.edge));
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
    this._state = ye(e.canvas), this._virtualTime = e.t, this._inFlight.clear();
    for (const n of e.inFlight) {
      const o = ye(n);
      this._rehydrateAnim(o), this._inFlight.set(o.handleId, o);
    }
  }
  /** Capture the current engine state as a serializable Checkpoint payload. */
  captureCheckpointData() {
    return {
      canvas: ye(this._state),
      inFlight: [...this._inFlight.values()].map((e) => this._serializeAnim(e)),
      tagRegistry: {}
    };
  }
  // ── Private helpers ───────────────────────────────────────────────────────
  _applyAnimate(e) {
    const n = e.args.handleId ?? `virt-${this._virtualTime.toFixed(3)}-${this._inFlight.size}`;
    e.args.handleId || console.warn("[AlpineFlow VirtualEngine] animate event missing handleId — determinism not guaranteed for this event");
    const o = e.args.targets ?? {}, i = e.args.options ?? {}, r = i.motion, s = r ? mr(r) ?? void 0 : void 0, l = {
      handleId: n,
      type: s ? s.type : "eased",
      targets: ye(o),
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
      e._easingFn = Xn(e.easing);
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
      e._easingFn = Xn(e.easing), e._from = e.fromValues ? { ...e.fromValues } : { ...e.currentValues ?? {} };
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
    return ye({
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
      const l = e._from[s], a = this._getTargetValue(s, e.targets) ?? l, c = Je(l, a, r);
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
            hr(r, o, n);
            break;
          case "decay":
            ii(r, o, n);
            break;
          case "inertia":
            pr(r, o, n, i);
            break;
          case "keyframes": {
            const s = o, l = s.duration ?? 5e3, a = l > 0 ? Math.min((this._virtualTime - e.startTime) / l, 1) : 1;
            gr(r, s, a, i), a >= 1 && (r.settled = !0);
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
const Nr = /* @__PURE__ */ new Map();
function ci(t, e) {
  Nr.set(t, e);
}
function ch(t) {
  return Nr.get(t);
}
function di(t, e = 20) {
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
function $r(t) {
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
const dh = {
  render(t, { width: e, height: n }) {
    const o = Object.values(t.nodes);
    if (o.length === 0)
      return `<svg width="${e}" height="${n}" xmlns="http://www.w3.org/2000/svg"></svg>`;
    const i = di(t.nodes);
    if (!i)
      return `<svg width="${e}" height="${n}" xmlns="http://www.w3.org/2000/svg"></svg>`;
    const { minX: r, minY: s, vbWidth: l, vbHeight: a } = i;
    let c = `<svg width="${e}" height="${n}" viewBox="${r} ${s} ${l} ${a}" xmlns="http://www.w3.org/2000/svg">`;
    c += $r(t);
    for (const d of o) {
      const f = d.position?.x ?? 0, u = d.position?.y ?? 0, h = d.dimensions?.width ?? 150, p = d.dimensions?.height ?? 40;
      c += `<rect x="${f}" y="${u}" width="${h}" height="${p}" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1" rx="4"/>`;
    }
    return c += "</svg>", c;
  }
}, uh = {
  render(t, { width: e, height: n }) {
    const o = Object.values(t.nodes);
    if (o.length === 0)
      return `<svg width="${e}" height="${n}" xmlns="http://www.w3.org/2000/svg"></svg>`;
    const i = di(t.nodes);
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
}, fh = {
  render(t, { width: e, height: n, inFlight: o }) {
    const i = Object.values(t.nodes);
    if (i.length === 0)
      return `<svg width="${e}" height="${n}" xmlns="http://www.w3.org/2000/svg"></svg>`;
    const r = di(t.nodes);
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
    f += $r(t);
    for (const u of i) {
      const h = u.position?.x ?? 0, p = u.position?.y ?? 0, g = u.dimensions?.width ?? 150, w = u.dimensions?.height ?? 40;
      s.has(u.id ?? "") ? f += `<rect x="${h}" y="${p}" width="${g}" height="${w}" fill="currentColor" fill-opacity="0.8" stroke="currentColor" stroke-width="2" rx="4"/>` : f += `<rect x="${h}" y="${p}" width="${g}" height="${w}" fill="currentColor" fill-opacity="0.1" stroke="currentColor" stroke-width="1" rx="4" opacity="0.3"/>`;
    }
    return f += "</svg>", f;
  }
};
ci("faithful", dh);
ci("outline", uh);
ci("activity", fh);
function qo(t, e) {
  let n = 0, o = t.length;
  for (; n < o; ) {
    const i = n + o >>> 1;
    t[i].t > e ? o = i : n = i + 1;
  }
  return n;
}
function Xo(t, e) {
  let n = 0, o = t.length;
  for (; n < o; ) {
    const i = n + o >>> 1;
    t[i].t >= e ? o = i : n = i + 1;
  }
  return n;
}
function hh(t, e) {
  return e.split(".").reduce((n, o) => n?.[o], t);
}
function Ir(t) {
  if (t !== null && typeof t == "object") {
    Object.freeze(t);
    for (const e of Object.keys(t))
      Ir(t[e]);
  }
  return t;
}
class ui {
  constructor(e) {
    this.version = e.version, this.duration = e.duration, this.initialState = Ir(ye(e.initialState)), this.events = Object.freeze(ye(e.events)), this.checkpoints = Object.freeze(ye(e.checkpoints)), this.metadata = Object.freeze({ ...e.metadata ?? {} }), Object.freeze(this);
  }
  toJSON() {
    return {
      version: this.version,
      duration: this.duration,
      initialState: ye(this.initialState),
      events: ye(this.events),
      checkpoints: ye(this.checkpoints),
      metadata: { ...this.metadata }
    };
  }
  static fromJSON(e) {
    if (e.version > Vo)
      throw new Error(
        `[AlpineFlow] Recording version ${e.version} is newer than supported (${Vo}). Please update AlpineFlow to replay this recording.`
      );
    return new ui(e);
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
      const i = hh(o.canvas, e);
      i !== void 0 && n.push({ t: o.t, v: i });
    }
    return n;
  }
  /**
   * Returns the canvas state at virtual time `t` by running the VirtualEngine
   * up to that point from the nearest prior checkpoint.
   */
  getStateAt(e) {
    const n = new Gt(this.initialState);
    let o = null;
    for (const c of this.checkpoints)
      c.t <= e && (!o || c.t > o.t) && (o = c);
    o && n.restoreCheckpoint(o);
    const i = o?.t ?? 0, r = this.events;
    let s = i;
    const l = Bo * 1e3;
    let a = o ? qo(r, i) : Xo(r, i);
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
    const o = this.getStateAt(e), i = n.renderer ?? "faithful", r = ch(i);
    if (!r)
      throw new Error(`[AlpineFlow] Unknown thumbnail renderer "${i}"`);
    return r.render(o, { width: n.width, height: n.height });
  }
}
class ph {
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
      version: Vo,
      duration: this._virtualNow(),
      initialState: o,
      events: this._events,
      checkpoints: this._checkpoints,
      metadata: n
    };
    return new ui(i);
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
      o && typeof o == "object" && "id" in o && (e[o.id] = ye(o));
    const n = {};
    for (const o of this._canvas.edges ?? [])
      o && typeof o == "object" && "id" in o && (n[o.id] = ye(o));
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
        targets: ye(n.targets),
        startTime: n.eventT,
        duration: i ? void 0 : o.duration ?? 300,
        easing: i ? void 0 : o.easing,
        motion: i ? ye(o.motion) : void 0,
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
class gh {
  constructor(e, n, o = {}) {
    this._currentTime = 0, this._state = "idle", this._direction = "forward", this._speed = 1, this._rafHandle = null, this._lastWallTime = 0, this._resolveFinished = () => {
    }, this.recording = n, this._canvas = e, this._virtualEngine = new Gt(n.initialState), this._speed = o.speed ?? 1, this._direction = this._speed < 0 ? "backward" : "forward", this._from = o.from ?? 0, this._to = o.to ?? n.duration, this._loop = o.loop ?? !1, this._currentTime = this._from, this._from > 0 && this._seekEngineTo(this._from), o.skipInitialState || this._applyStateToCanvas(this._virtualEngine.getState()), this.finished = new Promise((i) => {
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
    this._state !== "playing" && (this._state === "ended" && (this._currentTime = this._from, this._seekEngineTo(this._from), this._applyStateToCanvas(this._virtualEngine.getState())), this._state = "playing", this._lastWallTime = yo(), this._scheduleTick());
  }
  pause() {
    this._state === "playing" && (this._state = "paused", this._cancelTick());
  }
  stop() {
    this._cancelTick(), this._currentTime = this._from, this._virtualEngine = new Gt(this.recording.initialState), this._applyStateToCanvas(this._virtualEngine.getState()), this._state = "idle";
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
    const n = this._findNearestCheckpoint(e), o = new Gt(this.recording.initialState);
    n && o.restoreCheckpoint(n);
    const i = n?.t ?? 0, r = this.recording.events;
    let s = i;
    const l = Bo * 1e3;
    let a = n ? qo(r, i) : Xo(r, i);
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
    const e = yo(), n = (e - this._lastWallTime) / 1e3;
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
    n ? this._virtualEngine.restoreCheckpoint(n) : this._virtualEngine = new Gt(this.recording.initialState), this._walkTo(n?.t ?? 0, e);
  }
  _walkTo(e, n, o = !1) {
    if (n <= e)
      return;
    const i = this.recording.events;
    let r = e;
    const s = Bo * 1e3;
    let l = e === 0 ? Xo(i, 0) : qo(i, e);
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
        this._loop = typeof this._loop == "number" ? e : !0, this._currentTime = this._from, this._seekEngineTo(this._from), this._applyStateToCanvas(this._virtualEngine.getState()), this._state = "playing", this._lastWallTime = yo(), this._scheduleTick();
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
function yo() {
  return typeof performance < "u" && typeof performance.now == "function" ? performance.now() : Date.now();
}
function mh(t) {
  const e = ah(t);
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
      const n = new li(t, qn);
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
        V("animation", `Named animation "${n}" not found`);
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
      if (V("animate", "update() called", {
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
            typeof p.followPath == "function" ? E = p.followPath : E = ai(p.followPath);
            let S = null;
            if (p.guidePath?.visible && typeof p.followPath == "string" && typeof document < "u") {
              const b = t.getEdgeSvgElement?.();
              b && (S = document.createElementNS("http://www.w3.org/2000/svg", "path"), S.setAttribute("d", p.followPath), S.classList.add("flow-guide-path"), p.guidePath.class && S.classList.add(p.guidePath.class), b.appendChild(S));
            }
            if (E) {
              const b = E, A = S, T = p.guidePath?.autoRemove !== !1;
              r.push({
                key: `node:${h}:followPath`,
                from: 0,
                to: 1,
                apply: (M) => {
                  const v = t._nodeMap.get(h);
                  if (!v) return;
                  const C = b(M);
                  Ce().raw(v).position.x = C.x, Ce().raw(v).position.y = C.y, s.add(h), M >= 1 && A && T && A.remove();
                }
              });
            }
          } else if (p.position) {
            const S = Ce().raw(g).position;
            if (p.position.x !== void 0) {
              const b = p.position.x;
              if (m)
                S.x = b;
              else {
                const A = S.x;
                r.push({
                  key: `node:${h}:position.x`,
                  from: A,
                  to: b,
                  apply: (T) => {
                    const M = t._nodeMap.get(h);
                    M && (Ce().raw(M).position.x = T, s.add(h));
                  }
                });
              }
            }
            if (p.position.y !== void 0) {
              const b = p.position.y;
              if (m)
                S.y = b;
              else {
                const A = S.y;
                r.push({
                  key: `node:${h}:position.y`,
                  from: A,
                  to: b,
                  apply: (T) => {
                    const M = t._nodeMap.get(h);
                    M && (Ce().raw(M).position.y = T), s.add(h);
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
              const E = an(g.style || {}), S = an(p.style), b = t._nodeElements.get(h);
              if (b) {
                const A = getComputedStyle(b);
                for (const T of Object.keys(S))
                  E[T] === void 0 && (E[T] = A.getPropertyValue(T));
              }
              r.push({
                key: `node:${h}:style`,
                from: 0,
                to: 1,
                apply: (A) => {
                  const T = t._nodeMap.get(h);
                  T && (Ce().raw(T).style = fr(E, S, A), l.add(h));
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
          })), p.dimensions.height !== void 0 && (g.fixedDimensions = !0, m ? g.dimensions.height = p.dimensions.height : r.push({
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
              const E = typeof g.color == "string" && g.color || getComputedStyle(t._container).getPropertyValue("--flow-edge-stroke").trim() || ni;
              r.push({
                key: `edge:${h}:color`,
                from: E,
                to: p.color,
                apply: (S) => {
                  const b = t._edgeMap.get(h);
                  b && (Ce().raw(b).color = S, a.add(h));
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
                apply: (S) => {
                  const b = t._edgeMap.get(h);
                  b && (Ce().raw(b).strokeWidth = S, a.add(h));
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
      const u = Ce().raw(t._animator).animate(r, {
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
              const w = Ce().raw(g);
              (p.followPath || p.position?.x !== void 0) && (g.position.x = w.position.x), (p.followPath || p.position?.y !== void 0) && (g.position.y = w.position.y), p.style !== void 0 && (g.style = w.style);
            }
          if (n.edges)
            for (const [h, p] of Object.entries(n.edges)) {
              const g = t._edgeMap.get(h);
              if (!g) continue;
              const w = Ce().raw(g);
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
      const i = ur(t._config?.respectReducedMotion) ? 0 : o.duration ?? 300;
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
      const l = o.zoom, a = qn.register(() => {
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
      return new lh(n, {
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
      }, h = new ph(u, o), p = async () => {
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
      return new gh(r, n, o);
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
      Ot(n, o);
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
function ls(t, e, n, o) {
  const i = e.find((l) => l.id === t);
  if (!i) return /* @__PURE__ */ new Set();
  if (i.type === "group")
    return ct(t, e);
  const r = /* @__PURE__ */ new Set(), s = Ho(t, e, n);
  for (const l of s)
    r.add(l.id);
  if (o?.recursive) {
    const l = s.map((a) => a.id);
    for (; l.length > 0; ) {
      const a = l.shift(), c = Ho(a, e, n);
      for (const d of c)
        !r.has(d.id) && d.id !== t && (r.add(d.id), l.push(d.id));
    }
  }
  return r;
}
function yh(t, e, n) {
  const o = /* @__PURE__ */ new Map();
  for (const i of e)
    n.has(i.id) && o.set(i.id, { ...i.position });
  return {
    targetPositions: o,
    originalDimensions: t.type === "group" ? { ...t.dimensions ?? { width: 400, height: 300 } } : void 0,
    reroutedEdges: /* @__PURE__ */ new Map()
  };
}
function wo(t, e, n, o) {
  t.collapsed = !0, o && (t.dimensions = { ...o });
  for (const i of e)
    n.targetPositions.has(i.id) && (i.hidden = !0);
}
function cs(t, e, n, o = !0) {
  t.collapsed = !1, o && n.originalDimensions && (t.dimensions = { ...n.originalDimensions });
  const i = /* @__PURE__ */ new Set();
  if (t.type === "group") {
    for (const r of e)
      if (r.collapsed && r.id !== t.id && n.targetPositions.has(r.id)) {
        const s = ct(r.id, e);
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
function vo(t, e, n) {
  const o = /* @__PURE__ */ new Map();
  for (const i of e) {
    const r = n.has(i.source), s = n.has(i.target), l = i.source === t, a = i.target === t;
    !r && !s || (o.set(i.id, { source: i.source, target: i.target, hidden: i.hidden }), r && s || l && s || r && a ? i.hidden = !0 : r ? i.source = t : i.target = t);
  }
  return o;
}
function wh(t, e) {
  for (const n of t) {
    const o = e.get(n.id);
    o && (n.source = o.source, n.target = o.target, o.hidden !== void 0 ? n.hidden = o.hidden : delete n.hidden);
  }
}
const Pn = { width: 150, height: 50 };
function vh(t) {
  return {
    /**
     * Collapse a node — hide its descendants/outgoers and optionally animate.
     */
    collapseNode(e, n) {
      const o = t._nodeMap.get(e);
      if (!o || o.collapsed) return;
      const i = ls(e, t.nodes, t.edges, { recursive: n?.recursive });
      if (i.size === 0) return;
      V("collapse", `Collapsing node "${e}"`, {
        type: o.type ?? "default",
        descendants: [...i],
        animate: n?.animate !== !1,
        recursive: n?.recursive ?? !1
      }), t._captureHistory();
      const r = o.type === "group", s = r ? o.collapsedDimensions ?? { width: 150, height: 60 } : void 0, l = n?.animate !== !1, a = yh(o, t.nodes, i);
      if (l) {
        t._suspendHistory();
        const c = o.dimensions ?? Pn, d = r && s ? s : c, f = {};
        for (const [h] of a.targetPositions) {
          const p = t._nodeMap.get(h);
          if (!p) continue;
          const g = p.dimensions ?? Pn;
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
            wo(o, t.nodes, a, s), a.reroutedEdges = vo(e, t.edges, i), t._collapseState.set(e, a), t._resumeHistory(), t._emit("node-collapse", { node: o, descendants: [...i] });
          }
        }) : (wo(o, t.nodes, a, s), a.reroutedEdges = vo(e, t.edges, i), t._collapseState.set(e, a), t._resumeHistory(), t._emit("node-collapse", { node: o, descendants: [...i] }));
      } else
        wo(o, t.nodes, a, s), a.reroutedEdges = vo(e, t.edges, i), t._collapseState.set(e, a), t._emit("node-collapse", { node: o, descendants: [...i] });
    },
    /**
     * Expand a previously collapsed node — restore descendants/outgoers.
     */
    expandNode(e, n) {
      const o = t._nodeMap.get(e);
      if (!o || !o.collapsed) return;
      const i = t._collapseState.get(e);
      if (!i) return;
      V("collapse", `Expanding node "${e}"`, {
        type: o.type ?? "default",
        descendants: [...i.targetPositions.keys()],
        animate: n?.animate !== !1,
        reroutedEdges: i.reroutedEdges.size
      }), t._captureHistory();
      const r = o.type === "group", s = n?.animate !== !1;
      if (i.reroutedEdges.size > 0 && wh(t.edges, i.reroutedEdges), s) {
        t._suspendHistory(), r && i.originalDimensions && (o.dimensions = { ...i.originalDimensions });
        const l = o.dimensions ?? Pn;
        cs(o, t.nodes, i, r);
        const a = {};
        for (const [f, u] of i.targetPositions) {
          const h = t._nodeMap.get(f);
          if (h && !h.hidden) {
            const p = h.dimensions ?? Pn;
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
        cs(o, t.nodes, i, r), t._collapseState.delete(e), t._emit("node-expand", { node: o, descendants: [...i.targetPositions.keys()] });
    },
    /**
     * Toggle collapse/expand state of a node.
     */
    toggleNode(e, n) {
      const o = t._nodeMap.get(e);
      o && (V("collapse", `Toggle node "${e}" → ${o.collapsed ? "expand" : "collapse"}`), o.collapsed ? this.expandNode(e, n) : this.collapseNode(e, n));
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
      return ls(e, t.nodes, t.edges).size;
    },
    /**
     * Get the number of descendants (via parentId hierarchy) of a node.
     */
    getDescendantCount(e) {
      return ct(e, t.nodes).size;
    }
  };
}
function _h(t) {
  return {
    /**
     * Condense a node — switch to summary view hiding internal rows.
     */
    condenseNode(e) {
      const n = t._nodeMap.get(e);
      !n || n.condensed || (t._captureHistory(), n.condensed = !0, V("condense", `Node "${e}" condensed`), t._emit("node-condense", { node: n }));
    },
    /**
     * Uncondense a node — restore full row view.
     */
    uncondenseNode(e) {
      const n = t._nodeMap.get(e);
      !n || !n.condensed || (t._captureHistory(), n.condensed = !1, V("condense", `Node "${e}" uncondensed`), t._emit("node-uncondense", { node: n }));
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
function bh(t) {
  return {
    // ── Row Selection ────────────────────────────────────────────────────
    selectRow(e) {
      if (t.selectedRows.has(e)) return;
      t._captureHistory(), t.selectedRows.add(e);
      const n = e.indexOf("."), o = n === -1 ? e : e.slice(0, n), i = n === -1 ? "" : e.slice(n + 1);
      V("selection", `Row "${e}" selected`), t._emit("row-select", { rowId: e, nodeId: o, attrId: i }), t._emit("row-selection-change", { selectedRows: [...t.selectedRows] });
    },
    deselectRow(e) {
      if (!t.selectedRows.has(e)) return;
      t._captureHistory(), t.selectedRows.delete(e);
      const n = e.indexOf("."), o = n === -1 ? e : e.slice(0, n), i = n === -1 ? "" : e.slice(n + 1);
      V("selection", `Row "${e}" deselected`), t._emit("row-deselect", { rowId: e, nodeId: o, attrId: i }), t._emit("row-selection-change", { selectedRows: [...t.selectedRows] });
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
      t.selectedRows.size !== 0 && (t._captureHistory(), V("selection", "Deselecting all rows"), t.selectedRows.clear(), t._container?.querySelectorAll(".flow-row-selected").forEach((e) => {
        e.classList.remove("flow-row-selected");
      }), t._emit("row-selection-change", { selectedRows: [] }));
    },
    // ── Row Filtering ────────────────────────────────────────────────────
    setRowFilter(e, n) {
      const o = t._nodeMap.get(e);
      o && (o.rowFilter = n, V("filter", `Node "${e}" row filter set to "${typeof n == "function" ? "predicate" : n}"`));
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
const xh = 8, Eh = 12, Sh = 2;
function fi(t) {
  return {
    width: t.dimensions?.width ?? ve,
    height: t.dimensions?.height ?? _e
  };
}
function Ch(t) {
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
function Ph(t) {
  return [...t].sort((e, n) => {
    const o = e.order ?? 1 / 0, i = n.order ?? 1 / 0;
    return o !== i ? o - i : 0;
  });
}
function ds(t, e, n) {
  const o = e.gap ?? xh, i = e.padding ?? Eh, r = e.headerHeight ?? 0, s = Ch(e), l = Ph(t), a = /* @__PURE__ */ new Map(), c = /* @__PURE__ */ new Map();
  if (l.length === 0)
    return {
      positions: a,
      dimensions: c,
      parentDimensions: n ? { width: n.width, height: n.height } : { width: i * 2, height: i * 2 + r }
    };
  const d = n ? n.width - i * 2 : 0, f = n ? n.height - i * 2 - r : 0;
  return e.direction === "vertical" ? kh(l, o, i, r, s, d, a, c) : e.direction === "horizontal" ? Lh(l, o, i, r, s, f, a, c) : Mh(l, o, i, r, s, e.columns ?? Sh, d, f, a, c);
}
function kh(t, e, n, o, i, r, s, l) {
  let a = 0;
  const c = t.map((u) => fi(u));
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
function Lh(t, e, n, o, i, r, s, l) {
  let a = 0;
  const c = t.map((u) => fi(u));
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
function Mh(t, e, n, o, i, r, s, l, a, c) {
  const d = Math.min(r, t.length), f = t.map((m) => fi(m));
  let u = 0, h = 0;
  for (const m of f)
    u = Math.max(u, m.width), h = Math.max(h, m.height);
  const p = s > 0 ? (s - (d - 1) * e) / d : 0;
  p > 0 && (u = p);
  const g = Math.ceil(t.length / d), w = l > 0 ? (l - (g - 1) * e) / g : 0;
  w > 0 && (h = w);
  for (let m = 0; m < t.length; m++) {
    const E = m % d, S = Math.floor(m / d), b = n + E * (u + e), A = n + o + S * (h + e);
    a.set(t[m].id, { x: b, y: A }), i === "both" ? c.set(t[m].id, { width: u, height: h }) : i === "width" ? c.set(t[m].id, { width: u, height: f[m].height }) : i === "height" && c.set(t[m].id, { width: f[m].width, height: h });
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
function Th(t) {
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
      if (V("layout", `_applyLayout: repositioning ${e.size} node(s)`, {
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
      const p = f.childLayout, g = p.headerHeight !== void 0 ? p : f.data?.label ? { ...p, headerHeight: 30 } : p, w = ds(u, g, d);
      for (const [b, A] of w.positions) {
        if (b === s || a && b === a.id && !t._nodeMap.has(b)) continue;
        const T = h.get(b);
        T && (T.position ? (T.position.x = A.x, T.position.y = A.y) : T.position = { x: A.x, y: A.y });
      }
      for (const [b, A] of w.dimensions) {
        if (b === s || a && b === a.id && !t._nodeMap.has(b)) continue;
        const T = h.get(b);
        if (T) {
          let M = A.width, v = A.height;
          T.minDimensions && (T.minDimensions.width != null && (M = Math.max(M, T.minDimensions.width)), T.minDimensions.height != null && (v = Math.max(v, T.minDimensions.height))), T.maxDimensions && (T.maxDimensions.width != null && (M = Math.min(M, T.maxDimensions.width)), T.maxDimensions.height != null && (v = Math.min(v, T.maxDimensions.height))), T.dimensions ? (T.dimensions.width = M, T.dimensions.height = v) : T.dimensions = { width: M, height: v }, T.childLayout && !c && this.layoutChildren(b, { excludeId: s, omitFromComputation: l, shallow: !1, stretchedSize: T.dimensions });
        }
      }
      let m = w.parentDimensions.width, E = w.parentDimensions.height;
      if (f.minDimensions && (f.minDimensions.width != null && (m = Math.max(m, f.minDimensions.width)), f.minDimensions.height != null && (E = Math.max(E, f.minDimensions.height))), f.maxDimensions && (f.maxDimensions.width != null && (m = Math.min(m, f.maxDimensions.width)), f.maxDimensions.height != null && (E = Math.min(E, f.maxDimensions.height))), f.dimensions || (f.dimensions = { width: 0, height: 0 }), f.dimensions.width = m, f.dimensions.height = E, m !== w.parentDimensions.width || E !== w.parentDimensions.height) {
        const A = ds(u, g, { width: m, height: E });
        for (const [T, M] of A.positions) {
          if (T === s || a && T === a.id && !t._nodeMap.has(T)) continue;
          const v = h.get(T);
          v && (v.position ? (v.position.x = M.x, v.position.y = M.y) : v.position = { x: M.x, y: M.y });
        }
        for (const [T, M] of A.dimensions) {
          if (T === s || a && T === a.id && !t._nodeMap.has(T)) continue;
          const v = h.get(T);
          if (v) {
            let C = M.width, $ = M.height;
            v.minDimensions && (v.minDimensions.width != null && (C = Math.max(C, v.minDimensions.width)), v.minDimensions.height != null && ($ = Math.max($, v.minDimensions.height))), v.maxDimensions && (v.maxDimensions.width != null && (C = Math.min(C, v.maxDimensions.width)), v.maxDimensions.height != null && ($ = Math.min($, v.maxDimensions.height))), v.dimensions ? (v.dimensions.width = C, v.dimensions.height = $) : v.dimensions = { width: C, height: $ }, v.childLayout && !c && this.layoutChildren(T, { excludeId: s, omitFromComputation: l, shallow: !1, stretchedSize: v.dimensions });
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
     *
     * Nodes with `parentId` are excluded by default — their positions are managed
     * by `childLayout`, not top-level auto-layout. Pass `{ includeChildren: true }`
     * to include them.
     */
    layout(e) {
      const n = Pt("layout:dagre");
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
      }), V("layout", "Applied dagre layout", { direction: o }), t._emit("layout", { type: "dagre", direction: o });
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
      const n = Pt("layout:force");
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
      }), V("layout", "Applied force layout", { charge: e?.charge ?? -300, distance: e?.distance ?? 150 }), t._emit("layout", { type: "force", charge: e?.charge ?? -300, distance: e?.distance ?? 150 });
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
      const n = Pt("layout:hierarchy");
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
      }), V("layout", "Applied tree layout", { layoutType: e?.layoutType ?? "tree", direction: o }), t._emit("layout", { type: "tree", layoutType: e?.layoutType ?? "tree", direction: o });
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
      const n = Pt("layout:elk");
      if (!n)
        throw new Error("elkLayout() requires the elk plugin. Register it with: Alpine.plugin(AlpineFlowElk)");
      const o = e?.direction ?? "DOWN", i = e?.includeChildren ? t.nodes : t.nodes.filter((s) => !s.parentId), r = await n(i, t.edges, {
        algorithm: e?.algorithm,
        direction: o,
        nodeSpacing: e?.nodeSpacing,
        layerSpacing: e?.layerSpacing
      });
      if (r.size === 0) {
        V("layout", "ELK layout returned no positions — skipping apply");
        return;
      }
      this._applyLayout(r, {
        adjustHandles: e?.adjustHandles,
        handleDirection: o,
        fitView: e?.fitView,
        duration: e?.duration
      }), V("layout", "Applied ELK layout", { algorithm: e?.algorithm ?? "layered", direction: o }), t._emit("layout", { type: "elk", algorithm: e?.algorithm ?? "layered", direction: o });
    }
  };
}
function Ah(t) {
  return {
    // ── Internal helpers ──────────────────────────────────────────────────
    _getChildValidation(e) {
      const n = t.getNode(e);
      if (n)
        return Qt(n, t._config.childValidationRules ?? {});
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
        const r = Qt(i, t._config.childValidationRules ?? {});
        if (!r) {
          t._validationErrorCache.delete(o);
          continue;
        }
        const s = t.nodes.filter((a) => a.parentId === o), l = os(i, s, r);
        l.length > 0 ? t._validationErrorCache.set(o, l) : t._validationErrorCache.delete(o), i._validationErrors = l;
      }
    },
    // ── Child Validation API ─────────────────────────────────────────────
    validateParent(e) {
      const n = t.getNode(e);
      if (!n) return { valid: !0, errors: [] };
      const o = Qt(n, t._config.childValidationRules ?? {});
      if (!o) return { valid: !0, errors: [] };
      const i = t.nodes.filter((s) => s.parentId === e), r = os(n, i, o);
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
              ), p = Zn(u, o, h, f);
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
        if (o.position.x = d.x, o.position.y = d.y, o.parentId = void 0, o.extent = void 0, t.nodes = dt(t.nodes), t._rebuildNodeMap(), this._recomputeChildValidation(), i) {
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
      if (!r || ct(e, t.nodes).has(n)) return !1;
      const s = this._getChildValidation(n);
      if (s) {
        const d = t.nodes.filter(
          (u) => u.parentId === n && u.id !== e
        ), f = Lr(r, o, d, s);
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
            ), h = Zn(f, o, u, d);
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
      if (o.position.x = l.x - a.x, o.position.y = l.y - a.y, o.parentId = n, t.nodes = dt(t.nodes), t._rebuildNodeMap(), this._recomputeChildValidation(), n && t._nodeMap.get(n)?.childLayout) {
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
function Nh(t) {
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
              (!s.dimensions || l !== s.dimensions.width || a !== s.dimensions.height) && (s.dimensions = { width: l, height: a }, o.add(i)), s.fixedDimensions = !0, r.style.width = l + "px", r.style.height = a + "px";
            }
          }
          o.size > 0 && t._refreshEdgePaths(o);
        });
      }), n;
    }
  };
}
function $n(t, e, n, o, i) {
  const r = i * Math.PI / 180, s = Math.cos(r), l = Math.sin(r), a = t - n, c = e - o;
  return {
    x: n + a * s - c * l,
    y: o + a * l + c * s
  };
}
const Dr = 20, kn = Dr + 1;
function us(t) {
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
function $h(t, e) {
  return {
    x: t.x - e,
    y: t.y - e,
    width: t.width + e * 2,
    height: t.height + e * 2
  };
}
function Ih(t, e, n) {
  return t > n.x && t < n.x + n.width && e > n.y && e < n.y + n.height;
}
function Dh(t, e, n, o) {
  const i = Math.min(t, e), r = Math.max(t, e);
  for (const s of o) {
    const l = s.x, a = s.x + s.width, c = s.y, d = s.y + s.height;
    if (n > c && n < d && r > l && i < a)
      return !0;
  }
  return !1;
}
function Rh(t, e, n, o) {
  const i = Math.min(e, n), r = Math.max(e, n);
  for (const s of o) {
    const l = s.x, a = s.x + s.width, c = s.y, d = s.y + s.height;
    if (t > l && t < a && r > c && i < d)
      return !0;
  }
  return !1;
}
function Hh(t, e, n, o, i) {
  const r = /* @__PURE__ */ new Set([t, n]), s = /* @__PURE__ */ new Set([e, o]);
  for (const f of i)
    r.add(f.x), r.add(f.x + f.width), s.add(f.y), s.add(f.y + f.height);
  const l = Array.from(r).sort((f, u) => f - u), a = Array.from(s).sort((f, u) => f - u), c = [];
  let d = 0;
  for (const f of l)
    for (const u of a) {
      let h = !1;
      for (const p of i)
        if (Ih(f, u, p)) {
          h = !0;
          break;
        }
      h || c.push({ x: f, y: u, index: d++ });
    }
  return c;
}
function Fh(t, e, n, o) {
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
      if (h.x === g.x ? w = Rh(h.x, h.y, g.y, o) : w = Dh(h.x, g.x, h.y, o), w) continue;
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
function zh(t) {
  if (t.length <= 2) return t;
  const e = [t[0]];
  for (let n = 1; n < t.length - 1; n++) {
    const o = e[e.length - 1], i = t[n + 1], r = t[n], s = o.x === r.x && r.x === i.x, l = o.y === r.y && r.y === i.y;
    !s && !l && e.push(r);
  }
  return e.push(t[t.length - 1]), e;
}
function Oh(t, e) {
  if (t.length < 2) return "";
  let n = `M${t[0].x},${t[0].y}`;
  for (let i = 1; i < t.length - 1; i++) {
    const r = t[i - 1], s = t[i], l = t[i + 1];
    e > 0 ? n += ` ${Rt(r.x, r.y, s.x, s.y, l.x, l.y, e)}` : n += ` L${s.x},${s.y}`;
  }
  const o = t[t.length - 1];
  return n += ` L${o.x},${o.y}`, n;
}
function Vh(t) {
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
function Rr(t, e, n, o, i, r, s) {
  const l = us(n), a = us(r), c = t + l.x * kn, d = e + l.y * kn, f = o + a.x * kn, u = i + a.y * kn, h = s.map((A) => $h(A, Dr)), p = Hh(
    c,
    d,
    f,
    u,
    h
  ), g = p.find((A) => A.x === c && A.y === d), w = p.find((A) => A.x === f && A.y === u);
  g || p.push({ x: c, y: d, index: p.length }), w || p.push({ x: f, y: u, index: p.length });
  const m = g ?? p[p.length - (w ? 1 : 2)], E = w ?? p[p.length - 1], S = Fh(m, E, p, h);
  if (!S || S.length < 2) return null;
  const b = [
    { x: t, y: e, index: -1 },
    ...S,
    { x: o, y: i, index: -2 }
  ];
  return zh(b);
}
function Bh({
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
    return un({
      sourceX: t,
      sourceY: e,
      sourcePosition: n,
      targetX: o,
      targetY: i,
      targetPosition: r,
      borderRadius: l
    });
  const a = Rr(t, e, n, o, i, r, s);
  if (!a)
    return un({
      sourceX: t,
      sourceY: e,
      sourcePosition: n,
      targetX: o,
      targetY: i,
      targetPosition: r,
      borderRadius: l
    });
  const c = Oh(a, l), { x: d, y: f, offsetX: u, offsetY: h } = Vh(a);
  return {
    path: c,
    labelPosition: { x: d, y: f },
    labelOffsetX: u,
    labelOffsetY: h
  };
}
function Hr(t) {
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
function qh(t) {
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
function Xh({
  sourceX: t,
  sourceY: e,
  sourcePosition: n = "bottom",
  targetX: o,
  targetY: i,
  targetPosition: r = "top",
  obstacles: s
}) {
  if (!s || s.length === 0)
    return Wn({
      sourceX: t,
      sourceY: e,
      sourcePosition: n,
      targetX: o,
      targetY: i,
      targetPosition: r
    });
  const l = Rr(t, e, n, o, i, r, s);
  if (!l)
    return Wn({
      sourceX: t,
      sourceY: e,
      sourcePosition: n,
      targetX: o,
      targetY: i,
      targetPosition: r
    });
  const a = Hr(l), { x: c, y: d, offsetX: f, offsetY: u } = qh(l);
  return {
    path: a,
    labelPosition: { x: c, y: d },
    labelOffsetX: f,
    labelOffsetY: u
  };
}
function Yh(t) {
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
      c = fs(a);
      break;
    case "step":
      c = Wh(a, 0);
      break;
    case "smoothstep":
      c = jh(a, l);
      break;
    case "catmull-rom":
    case "bezier":
      c = Hr(a.map((u, h) => ({ ...u, index: h })));
      break;
    default:
      c = fs(a);
  }
  const d = Uh(a), f = gn({ sourceX: e, sourceY: n, targetX: o, targetY: i });
  return {
    path: c,
    labelPosition: d,
    labelOffsetX: f.offsetX,
    labelOffsetY: f.offsetY
  };
}
function fs(t) {
  if (t.length < 2) return "";
  let e = `M${t[0].x},${t[0].y}`;
  for (let n = 1; n < t.length; n++)
    e += ` L${t[n].x},${t[n].y}`;
  return e;
}
function Wh(t, e) {
  if (t.length < 2) return "";
  if (t.length === 2)
    return Fr(t[0], t[1], e);
  let n = `M${t[0].x},${t[0].y}`;
  for (let i = 1; i < t.length - 1; i++) {
    const r = t[i - 1], s = t[i], l = t[i + 1];
    n += Rt(r.x, r.y, s.x, s.y, l.x, l.y, e);
  }
  const o = t[t.length - 1];
  return n += ` L${o.x},${o.y}`, n;
}
function Fr(t, e, n) {
  const o = (t.x + e.x) / 2, i = Rt(t.x, t.y, o, t.y, o, e.y, n), r = Rt(o, t.y, o, e.y, e.x, e.y, n);
  return `M${t.x},${t.y}${i}${r} L${e.x},${e.y}`;
}
function jh(t, e) {
  if (t.length < 2) return "";
  if (t.length === 2)
    return Fr(t[0], t[1], e);
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
    o += Rt(s.x, s.y, l.x, l.y, a.x, a.y, e);
  }
  const i = n[n.length - 1];
  return o += ` L${i.x},${i.y}`, o;
}
function Uh(t) {
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
function Ft(t, e, n, o) {
  const i = t.dimensions?.width ?? ve, r = t.dimensions?.height ?? _e, s = zt(t, o);
  let l;
  if (t.shape) {
    const a = n?.[t.shape] ?? Cr[t.shape];
    if (a) {
      const c = a.perimeterPoint(i, r, e);
      l = { x: s.x + c.x, y: s.y + c.y };
    } else {
      const c = ts(i, r, e);
      l = { x: s.x + c.x, y: s.y + c.y };
    }
  } else {
    const a = ts(i, r, e);
    l = { x: s.x + a.x, y: s.y + a.y };
  }
  if (t.rotation) {
    const a = s.x + i / 2, c = s.y + r / 2;
    l = $n(l.x, l.y, a, c, t.rotation);
  }
  return l;
}
function hs(t) {
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
function Yo(t) {
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
const Zh = 1.5, Gh = 5 / 20;
function kt(t, e, n, o) {
  if (!o) return t;
  const i = typeof o == "string" ? {} : o, r = n ? Math.min(n.handleWidth, n.handleHeight) / 2 : 5;
  if (i.offset !== void 0) {
    const f = Yo(e);
    return { x: t.x + f.x * i.offset, y: t.y + f.y * i.offset };
  }
  const a = (i.width ?? 12.5) * Zh * Gh * 0.4, c = r + a, d = Yo(e);
  return { x: t.x + d.x * c, y: t.y + d.y * c };
}
function Gn(t, e, n, o = "bottom", i = "top", r, s, l, a, c, d, f) {
  const u = r ?? Ft(e, o, c, d), h = s ?? Ft(n, i, c, d), p = {
    sourceX: u.x,
    sourceY: u.y,
    sourcePosition: hs(o),
    targetX: h.x,
    targetY: h.y,
    targetPosition: hs(i)
  }, g = t.type ?? f ?? "bezier";
  if (l?.[g])
    return l[g](p);
  switch (g === "floating" ? t.pathType ?? "bezier" : g) {
    case "editable":
      return Yh({
        ...p,
        controlPoints: t.controlPoints,
        pathStyle: t.pathStyle
      });
    case "avoidant":
      return Xh({ ...p, obstacles: a });
    case "orthogonal":
      return Bh({ ...p, obstacles: a });
    case "smoothstep":
      return un(p);
    case "straight":
      return _r({ sourceX: u.x, sourceY: u.y, targetX: h.x, targetY: h.y });
    default:
      return Wn(p);
  }
}
function ps(t, e) {
  const n = t.dimensions?.width ?? ve, o = t.dimensions?.height ?? _e, i = {
    x: t.position.x + n / 2,
    y: t.position.y + o / 2
  }, r = t.rotation ? $n(e.x, e.y, i.x, i.y, -t.rotation) : e, s = r.x - i.x, l = r.y - i.y;
  if (s === 0 && l === 0) {
    const p = { x: i.x, y: i.y - o / 2 };
    return t.rotation ? $n(p.x, p.y, i.x, i.y, t.rotation) : p;
  }
  const a = n / 2, c = o / 2, d = Math.abs(s), f = Math.abs(l);
  let u;
  d / a > f / c ? u = a / d : u = c / f;
  const h = {
    x: i.x + s * u,
    y: i.y + l * u
  };
  return t.rotation ? $n(h.x, h.y, i.x, i.y, t.rotation) : h;
}
function gs(t, e) {
  const n = t.dimensions?.width ?? ve, o = t.dimensions?.height ?? _e, i = t.position.x + n / 2, r = t.position.y + o / 2;
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
function zr(t, e) {
  const n = t.dimensions?.width ?? ve, o = t.dimensions?.height ?? _e, i = e.dimensions?.width ?? ve, r = e.dimensions?.height ?? _e, s = {
    x: t.position.x + n / 2,
    y: t.position.y + o / 2
  }, l = {
    x: e.position.x + i / 2,
    y: e.position.y + r / 2
  }, a = ps(t, l), c = ps(e, s), d = gs(t, a), f = gs(e, c);
  return {
    sx: a.x,
    sy: a.y,
    tx: c.x,
    ty: c.y,
    sourcePos: d,
    targetPos: f
  };
}
function Nm(t, e) {
  const n = e.x - t.x, o = e.y - t.y;
  let i, r;
  return Math.abs(n) > Math.abs(o) ? (i = n > 0 ? "right" : "left", r = n > 0 ? "left" : "right") : (i = o > 0 ? "bottom" : "top", r = o > 0 ? "top" : "bottom"), { sourcePos: i, targetPos: r };
}
function Or(t) {
  return typeof t == "object" && t !== null && "from" in t && "to" in t;
}
function Vr(t, e) {
  return `${t}__grad__${e}`;
}
function Br(t, e, n, o, i, r, s) {
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
function _o(t, e) {
  t.querySelector(`#${CSS.escape(e)}`)?.remove();
}
const Kh = /* @__PURE__ */ new Set(["x-data", "x-init", "x-bind", "href", "src", "action", "formaction", "srcdoc"]);
function Jh(t) {
  return t === !0 || t === "dash" ? "dash" : t === "pulse" ? "pulse" : t === "dot" ? "dot" : "none";
}
function qr(t) {
  return t.endsWith("-l") ? "left" : t.endsWith("-r") ? "right" : null;
}
function ms(t, e) {
  if (!e) return t;
  const n = Yo(t), o = e * Math.PI / 180, i = Math.cos(o), r = Math.sin(o), s = n.x * i - n.y * r, l = n.x * r + n.y * i;
  return Math.abs(s) > Math.abs(l) ? s > 0 ? "right" : "left" : l > 0 ? "bottom" : "top";
}
function ys(t) {
  return { x: (t.left + t.right) / 2, y: (t.top + t.bottom) / 2 };
}
function Kn(t, e) {
  const n = Array.from(t);
  if (n.length === 0) return null;
  if (n.length === 1 || !e) return n[0];
  let o = null, i = 1 / 0;
  for (const r of n) {
    const s = r.getBoundingClientRect(), l = (s.left + s.right) / 2, a = (s.top + s.bottom) / 2, c = l - e.x, d = a - e.y, f = c * c + d * d;
    f < i && (i = f, o = r);
  }
  return o;
}
function Jn(t, e, n, o, i, r) {
  const s = t.querySelector(`[data-flow-node-id="${CSS.escape(e)}"]`);
  if (s) {
    if (n) {
      const a = s.querySelectorAll(
        `[data-flow-handle-id="${CSS.escape(n)}"][data-flow-handle-type="${o}"]`
      );
      let c = Kn(a, r);
      if (!c) {
        const d = s.querySelectorAll(
          `[data-flow-handle-id="${CSS.escape(n)}"]`
        );
        c = Kn(d, r);
      }
      if (c)
        return c.getAttribute("data-flow-handle-position") ?? (o === "source" ? "bottom" : "top");
    }
    if (n) {
      const a = qr(n);
      if (a && s.querySelector(`[data-flow-handle-position="${a}"]`))
        return a;
    }
    const l = s.querySelector(`[data-flow-handle-type="${o}"]`);
    if (l)
      return l.getAttribute("data-flow-handle-position") ?? (o === "source" ? "bottom" : "top");
  }
  if (i) {
    const l = o === "source" ? i.sourcePosition : i.targetPosition;
    if (l) return l;
  }
  return o === "source" ? "bottom" : "top";
}
function ws(t, e, n, o, i, r, s, l) {
  const a = t.querySelector(`[data-flow-node-id="${CSS.escape(e)}"]`);
  if (!a) return null;
  let c = null;
  if (o) {
    const p = a.querySelectorAll(
      `[data-flow-handle-id="${CSS.escape(o)}"][data-flow-handle-type="${i}"]`
    );
    if (c = Kn(p, l), !c) {
      const g = a.querySelectorAll(
        `[data-flow-handle-id="${CSS.escape(o)}"]`
      );
      c = Kn(g, l);
    }
    if (!c) {
      const g = qr(o);
      g && (c = a.querySelector(`[data-flow-handle-position="${g}"]`));
    }
  } else
    c = a.querySelector(`[data-flow-handle-type="${i}"]`);
  if (!c) return null;
  const d = c.getBoundingClientRect();
  if (d.width === 0 && d.height === 0) return null;
  const f = t.getBoundingClientRect(), u = d.left + d.width / 2, h = d.top + d.height / 2;
  return {
    x: (u - f.left - s.x) / r,
    y: (h - f.top - s.y) / r,
    handleWidth: d.width / r,
    handleHeight: d.height / r
  };
}
function Qh(t, e) {
  const n = t.getTotalLength(), o = t.getPointAtLength(n * Math.max(0, Math.min(1, e)));
  return { x: o.x, y: o.y };
}
function ot(t, e, n, o, i) {
  const r = t - n, s = e - o;
  return Math.sqrt(r * r + s * s) <= i;
}
function ep(t, e, n) {
  const o = n.x - e.x, i = n.y - e.y, r = o * o + i * i;
  if (r === 0) return Math.sqrt((t.x - e.x) ** 2 + (t.y - e.y) ** 2);
  let s = ((t.x - e.x) * o + (t.y - e.y) * i) / r;
  s = Math.max(0, Math.min(1, s));
  const l = e.x + s * o, a = e.y + s * i;
  return Math.sqrt((t.x - l) ** 2 + (t.y - a) ** 2);
}
function tp(t) {
  t.directive(
    "flow-edge",
    (e, { expression: n }, { evaluate: o, effect: i, cleanup: r }) => {
      const s = e;
      s.style.pointerEvents = "auto";
      const l = document.createElementNS("http://www.w3.org/2000/svg", "path");
      l.setAttribute("fill", "none"), l.style.stroke = "transparent", l.style.strokeWidth = "20", l.style.pointerEvents = "stroke", l.style.cursor = "pointer", s.appendChild(l);
      let a = e.querySelector("path:not(:first-child)");
      a || (a = document.createElementNS("http://www.w3.org/2000/svg", "path"), a.setAttribute("fill", "none"), a.setAttribute("stroke-width", "1.5"), a.style.pointerEvents = "none", s.appendChild(a));
      let c = null, d = null, f = null, u = null, h = "none", p = null, g = null;
      function w(P, k, I, te, se) {
        u || (u = document.createElementNS("http://www.w3.org/2000/svg", "circle"), u.classList.add("flow-edge-dot"), u.style.pointerEvents = "none", P.appendChild(u));
        const ie = I.closest(".flow-container"), K = ie ? getComputedStyle(ie) : null, ae = te.particleSize ?? (parseFloat(K?.getPropertyValue("--flow-edge-dot-size").trim() ?? "4") || 4), de = se || K?.getPropertyValue("--flow-edge-dot-duration").trim() || "2s";
        u.setAttribute("r", String(ae)), te.particleColor ? u.style.fill = te.particleColor : u.style.removeProperty("fill");
        const le = u.querySelector("animateMotion");
        le && le.remove();
        const Z = document.createElementNS("http://www.w3.org/2000/svg", "animateMotion");
        Z.setAttribute("dur", de), Z.setAttribute("repeatCount", "indefinite"), Z.setAttribute("path", k), u.appendChild(Z);
      }
      function m() {
        u?.remove(), u = null;
      }
      let E = null, S = null, b = null, A = null;
      const T = (P) => {
        P.stopPropagation();
        const k = o(n);
        if (!k) return;
        const I = t.$data(e.closest("[x-data]"));
        I && (I._emit("edge-click", { edge: k, event: P }), lt(P, I._shortcuts?.multiSelect) ? I.selectedEdges.has(k.id) ? (I.selectedEdges.delete(k.id), k.selected = !1, V("selection", `Edge "${k.id}" deselected (shift)`)) : (I.selectedEdges.add(k.id), k.selected = !0, V("selection", `Edge "${k.id}" selected (shift)`)) : (I.deselectAll(), I.selectedEdges.add(k.id), k.selected = !0, V("selection", `Edge "${k.id}" selected`)), I._emitSelectionChange());
      }, M = (P) => {
        P.preventDefault(), P.stopPropagation();
        const k = o(n);
        if (!k) return;
        const I = t.$data(e.closest("[x-data]"));
        if (!I) return;
        const te = P.target;
        if (te.classList.contains("flow-edge-control-point")) {
          const se = parseInt(te.dataset.pointIndex ?? "", 10);
          if (!isNaN(se)) {
            I._emit("edge-control-point-context-menu", {
              edge: k,
              pointIndex: se,
              position: { x: P.clientX, y: P.clientY },
              event: P
            });
            return;
          }
        }
        I._emit("edge-context-menu", { edge: k, event: P });
      }, v = (P) => {
        P.stopPropagation(), P.preventDefault();
        const k = o(n), I = t.$data(e.closest("[x-data]"));
        if (!k || !I || (k.type ?? I._config?.defaultEdgeType ?? "bezier") !== "editable") return;
        const se = P.target;
        if (se.classList.contains("flow-edge-control-point")) {
          const ie = parseInt(se.dataset.pointIndex ?? "", 10);
          !isNaN(ie) && k.controlPoints && (I._captureHistory?.(), k.controlPoints.splice(ie, 1), I._emit("edge-control-point-change", { edge: k, action: "remove", index: ie }));
          return;
        }
        if (se.classList.contains("flow-edge-midpoint")) {
          const ie = parseInt(se.dataset.segmentIndex ?? "", 10);
          if (!isNaN(ie)) {
            const K = I.screenToFlowPosition(P.clientX, P.clientY);
            k.controlPoints || (k.controlPoints = []), I._captureHistory?.(), k.controlPoints.splice(ie, 0, { x: K.x, y: K.y }), I._emit("edge-control-point-change", { edge: k, action: "add", index: ie });
          }
          return;
        }
        if (se.closest("path")) {
          const ie = I.screenToFlowPosition(P.clientX, P.clientY);
          k.controlPoints || (k.controlPoints = []);
          const K = [
            E ?? { x: 0, y: 0 },
            ...k.controlPoints,
            S ?? { x: 0, y: 0 }
          ];
          let ae = 0, de = 1 / 0;
          for (let le = 0; le < K.length - 1; le++) {
            const Z = ep(ie, K[le], K[le + 1]);
            Z < de && (de = Z, ae = le);
          }
          I._captureHistory?.(), k.controlPoints.splice(ae, 0, { x: ie.x, y: ie.y }), I._emit("edge-control-point-change", { edge: k, action: "add", index: ae });
        }
      }, C = (P) => {
        const k = P.target;
        if (!k.classList.contains("flow-edge-control-point") || P.button !== 0) return;
        P.stopPropagation(), P.preventDefault();
        const I = o(n);
        if (!I?.controlPoints) return;
        const te = t.$data(e.closest("[x-data]"));
        if (!te) return;
        const se = parseInt(k.dataset.pointIndex ?? "", 10);
        if (isNaN(se)) return;
        k.classList.add("dragging");
        let ie = !1;
        const K = (de) => {
          ie || (te._captureHistory?.(), ie = !0);
          let le = te.screenToFlowPosition(de.clientX, de.clientY);
          const Z = te._config?.snapToGrid;
          Z && (le = {
            x: Math.round(le.x / Z[0]) * Z[0],
            y: Math.round(le.y / Z[1]) * Z[1]
          }), I.controlPoints[se] = le;
        }, ae = () => {
          document.removeEventListener("pointermove", K), document.removeEventListener("pointerup", ae), k.classList.remove("dragging"), ie && te._emit("edge-control-point-change", { edge: I, action: "move", index: se });
        };
        document.addEventListener("pointermove", K), document.addEventListener("pointerup", ae);
      };
      s.addEventListener("contextmenu", M), s.addEventListener("dblclick", v), s.addEventListener("pointerdown", C, !0);
      let $ = null;
      const x = (P) => {
        if (P.button !== 0) return;
        P.stopPropagation();
        const k = o(n);
        if (!k) return;
        const I = t.$data(e.closest("[x-data]"));
        if (!I) return;
        const te = I._config?.reconnectSnapRadius ?? Fi, se = I._config?.edgesReconnectable !== !1, ie = k.reconnectable ?? !0;
        let K = null;
        if (se && ie !== !1 && E && S) {
          const q = I.screenToFlowPosition(P.clientX, P.clientY), ce = ot(q.x, q.y, E.x, E.y, te) || b && ot(q.x, q.y, b.x, b.y, te);
          (ot(q.x, q.y, S.x, S.y, te) || A && ot(q.x, q.y, A.x, A.y, te)) && (ie === !0 || ie === "target") ? K = "target" : ce && (ie === !0 || ie === "source") && (K = "source");
        }
        if (!K) {
          const q = (ce) => {
            document.removeEventListener("pointerup", q), T(ce);
          };
          document.addEventListener("pointerup", q, { once: !0 });
          return;
        }
        const ae = P.clientX, de = P.clientY;
        let le = !1, Z = !1, j = null;
        const R = I._config?.connectionSnapRadius ?? 20;
        let G = null, Y = null, H = null, D = ae, Q = de;
        const U = e.closest(".flow-container");
        if (!U) return;
        const ee = K === "target" ? E : S, F = () => {
          le = !0, s.classList.add("flow-edge-reconnecting"), I._emit("reconnect-start", { edge: k, handleType: K }), V("reconnect", `Reconnection drag started on edge "${k.id}" (${K} end)`), Y = Tt({
            connectionLineType: I._config?.connectionLineType,
            connectionLineStyle: I._config?.connectionLineStyle,
            connectionLine: I._config?.connectionLine,
            containerEl: s.closest(".flow-container") ?? void 0
          }), G = Y.svg;
          const q = I.screenToFlowPosition(ae, de);
          Y.update({
            fromX: ee.x,
            fromY: ee.y,
            toX: q.x,
            toY: q.y,
            source: k.source,
            sourceHandle: k.sourceHandle
          });
          const ce = U.querySelector(".flow-viewport");
          ce && ce.appendChild(G), K === "target" && (I.pendingConnection = {
            source: k.source,
            sourceHandle: k.sourceHandle,
            position: q
          }), I._pendingReconnection = {
            edge: k,
            draggedEnd: K,
            anchorPosition: { ...ee },
            position: q
          }, H = jn(U, I, D, Q), K === "target" && Jt(U, k.source, k.sourceHandle ?? "source", I, k.id);
        }, J = (q) => {
          if (D = q.clientX, Q = q.clientY, !le) {
            Math.sqrt(
              (q.clientX - ae) ** 2 + (q.clientY - de) ** 2
            ) >= Nn && F();
            return;
          }
          const ce = I.screenToFlowPosition(q.clientX, q.clientY), z = Kt({
            containerEl: U,
            handleType: K === "target" ? "target" : "source",
            excludeNodeId: K === "target" ? k.source : k.target,
            cursorFlowPos: ce,
            connectionSnapRadius: R,
            getNode: (re) => I.getNode(re),
            toFlowPosition: (re, fe) => I.screenToFlowPosition(re, fe)
          });
          z.element !== j && (j?.classList.remove("flow-handle-active"), z.element?.classList.add("flow-handle-active"), j = z.element), Y?.update({
            fromX: ee.x,
            fromY: ee.y,
            toX: z.position.x,
            toY: z.position.y,
            source: k.source,
            sourceHandle: k.sourceHandle
          });
          const O = z.position;
          K === "target" && I.pendingConnection && (I.pendingConnection = {
            ...I.pendingConnection,
            position: O
          }), I._pendingReconnection && (I._pendingReconnection = {
            ...I._pendingReconnection,
            position: O
          }), H?.updatePointer(q.clientX, q.clientY);
        }, ne = () => {
          Z || (Z = !0, document.removeEventListener("pointermove", J), document.removeEventListener("pointerup", oe), H?.stop(), H = null, Y?.destroy(), Y = null, G = null, j?.classList.remove("flow-handle-active"), $ = null, s.classList.remove("flow-edge-reconnecting"), Pe(U), I.pendingConnection = null, I._pendingReconnection = null);
        }, oe = (q) => {
          if (!le) {
            ne(), T(q);
            return;
          }
          let ce = j, z = null;
          if (!ce) {
            z = document.elementFromPoint(q.clientX, q.clientY);
            const he = K === "target" ? '[data-flow-handle-type="target"]' : '[data-flow-handle-type="source"]';
            ce = z?.closest(he);
          }
          const re = (ce ? ce.closest("[data-flow-node-id]") : z?.closest("[data-flow-node-id]"))?.dataset.flowNodeId, fe = ce?.dataset.flowHandleId;
          let ge = !1;
          if (re) {
            if (!(() => {
              const he = I.getNode(re);
              return he && !rt(he);
            })()) {
              const he = K === "target" ? { source: k.source, sourceHandle: k.sourceHandle, target: re, targetHandle: fe } : { source: re, sourceHandle: fe, target: k.target, targetHandle: k.targetHandle }, Ee = I.edges.filter((be) => be.id !== k.id);
              if (!Ze(he, Ee, { preventCycles: I._config?.preventCycles }))
                V("reconnect", "Reconnection rejected (invalid connection)");
              else if (!qe(U, he, Ee))
                V("reconnect", "Reconnection rejected (handle limit)");
              else if (!Be(U, he))
                V("reconnect", "Reconnection rejected (per-handle validator)");
              else if (I._config?.isValidConnection && !I._config.isValidConnection(he))
                V("reconnect", "Reconnection rejected (custom validator)");
              else {
                const be = { ...k };
                I._captureHistory?.(), K === "target" ? (k.target = he.target, k.targetHandle = he.targetHandle) : (k.source = he.source, k.sourceHandle = he.sourceHandle), ge = !0, V("reconnect", `Edge "${k.id}" reconnected (${K})`, he), I._emit("reconnect", { oldEdge: be, newConnection: he });
              }
            }
          }
          ge || V("reconnect", `Edge "${k.id}" reconnection cancelled — snapping back`), I._emit("reconnect-end", { edge: k, successful: ge }), ne();
        };
        document.addEventListener("pointermove", J), document.addEventListener("pointerup", oe), $ = ne;
      };
      s.addEventListener("pointerdown", x);
      const y = (P) => {
        const k = o(n);
        if (!k) return;
        const I = t.$data(e.closest("[x-data]"));
        if (!I) return;
        const te = I._config?.edgesReconnectable !== !1, se = k.reconnectable ?? !0;
        if (!te || se === !1 || !E || !S) {
          s.style.removeProperty("cursor"), l.style.cursor = "pointer";
          return;
        }
        const ie = I._config?.reconnectSnapRadius ?? Fi, K = I.screenToFlowPosition(P.clientX, P.clientY), ae = (ot(K.x, K.y, E.x, E.y, ie) || b && ot(K.x, K.y, b.x, b.y, ie)) && (se === !0 || se === "source"), de = (ot(K.x, K.y, S.x, S.y, ie) || A && ot(K.x, K.y, A.x, A.y, ie)) && (se === !0 || se === "target");
        ae || de ? (s.style.cursor = "grab", l.style.cursor = "grab") : (s.style.removeProperty("cursor"), l.style.cursor = "pointer");
      };
      s.addEventListener("pointermove", y);
      const X = (P) => {
        if (P.key !== "Enter" && P.key !== " ") return;
        P.preventDefault(), P.stopPropagation();
        const k = o(n);
        if (!k) return;
        const I = t.$data(e.closest("[x-data]"));
        I && (I._emit("edge-click", { edge: k, event: P }), lt(P, I._shortcuts?.multiSelect) ? I.selectedEdges.has(k.id) ? (I.selectedEdges.delete(k.id), k.selected = !1) : (I.selectedEdges.add(k.id), k.selected = !0) : (I.deselectAll(), I.selectedEdges.add(k.id), k.selected = !0), I._emitSelectionChange());
      };
      s.addEventListener("keydown", X);
      const _ = () => {
        s.matches(":focus-visible") && s.classList.add("flow-edge-focused");
      }, L = () => s.classList.remove("flow-edge-focused");
      s.addEventListener("focus", _), s.addEventListener("blur", L);
      const N = (P) => {
        P.stopPropagation();
      };
      s.addEventListener("mousedown", N);
      const B = () => {
        for (const P of [c, d, f])
          P && P.classList.add("flow-edge-hovered");
      }, W = () => {
        for (const P of [c, d, f])
          P && P.classList.remove("flow-edge-hovered");
      };
      s.addEventListener("mouseenter", B), s.addEventListener("mouseleave", W), i(() => {
        const P = o(n);
        if (!P || !a) return;
        s.setAttribute("data-flow-edge-id", P.id);
        const k = t.$data(e.closest("[x-data]"));
        if (!k?.nodes) return;
        const I = P.type ?? k._config?.defaultEdgeType ?? "bezier";
        k._layoutAnimTick;
        const te = k.getNode(P.source), se = k.getNode(P.target);
        if (!te || !se) return;
        te.sourcePosition, se.targetPosition;
        const ie = At(te, k._nodeMap, k._config?.nodeOrigin), K = At(se, k._nodeMap, k._config?.nodeOrigin), ae = e.closest("[x-data]");
        let de, le, Z, j;
        if (I === "floating") {
          const z = zr(ie, K);
          de = z.sourcePos, le = z.targetPos, Z = { x: z.sx, y: z.sy, handleWidth: 0, handleHeight: 0 }, j = { x: z.tx, y: z.ty, handleWidth: 0, handleHeight: 0 }, E = { x: z.sx, y: z.sy }, S = { x: z.tx, y: z.ty };
        } else {
          const z = ae.querySelector(
            `[data-flow-node-id="${CSS.escape(P.source)}"]`
          ), O = ae.querySelector(
            `[data-flow-node-id="${CSS.escape(P.target)}"]`
          ), re = z ? ys(z.getBoundingClientRect()) : void 0, fe = O ? ys(O.getBoundingClientRect()) : void 0;
          de = Jn(ae, P.source, P.sourceHandle, "source", te, fe), le = Jn(ae, P.target, P.targetHandle, "target", se, re);
          const ge = t.raw(k).viewport ?? { x: 0, y: 0, zoom: 1 }, he = ge.zoom || 1, Ee = te.rotation, be = se.rotation;
          de = ms(de, Ee), le = ms(le, be), Z = ws(ae, P.source, ie, P.sourceHandle, "source", he, ge, fe), j = ws(ae, P.target, K, P.targetHandle, "target", he, ge, re);
          const ke = Ft(ie, de, k._shapeRegistry, k._config?.nodeOrigin), ue = Ft(K, le, k._shapeRegistry, k._config?.nodeOrigin);
          E = Z ?? ke, S = j ?? ue;
        }
        const R = kt(Z ?? E, de, Z, P.markerStart), G = kt(j ?? S, le, j, P.markerEnd);
        b = R, A = G;
        let Y;
        (I === "orthogonal" || I === "avoidant") && (Y = k.nodes.filter((z) => z.id !== P.source && z.id !== P.target).map((z) => {
          const O = At(z, k._nodeMap, k._config?.nodeOrigin);
          return {
            x: O.position.x,
            y: O.position.y,
            width: O.dimensions?.width ?? ve,
            height: O.dimensions?.height ?? _e
          };
        }));
        const { path: H, labelPosition: D } = Gn(P, ie, K, de, le, R, G, k._config?.edgeTypes, Y, k._shapeRegistry, k._config?.nodeOrigin, k._config?.defaultEdgeType);
        a.setAttribute("d", H), l.setAttribute("d", H);
        const Q = I === "editable", U = Q && (P.showControlPoints || P.selected);
        if (s.querySelectorAll(".flow-edge-control-point, .flow-edge-midpoint").forEach((z) => z.remove()), U) {
          const z = P.controlPoints ?? [], O = k.viewport?.zoom ?? 1, re = 6 / O, fe = 5 / O, ge = E ?? { x: 0, y: 0 }, he = S ?? { x: 0, y: 0 }, Ee = [ge, ...z, he], be = Ee.length - 1, ke = a.getTotalLength?.() ?? 0;
          if (ke > 0) {
            const ue = [0], we = 200;
            let Ae = 1;
            for (let Se = 1; Se <= we && Ae < Ee.length; Se++) {
              const Re = Se / we * ke, Le = a.getPointAtLength(Re), me = Ee[Ae], pe = Le.x - me.x, xe = Le.y - me.y;
              pe * pe + xe * xe < 25 && (ue.push(Re), Ae++);
            }
            for (; ue.length <= be; )
              ue.push(ke);
            for (let Se = 0; Se < be; Se++) {
              const Re = (ue[Se] + ue[Se + 1]) / 2, Le = a.getPointAtLength(Re), me = document.createElementNS("http://www.w3.org/2000/svg", "circle");
              me.classList.add("flow-edge-midpoint"), me.setAttribute("cx", String(Le.x)), me.setAttribute("cy", String(Le.y)), me.setAttribute("r", String(fe)), me.dataset.segmentIndex = String(Se);
              const pe = document.createElementNS("http://www.w3.org/2000/svg", "title");
              pe.textContent = "Double-click to add control point", me.appendChild(pe), s.appendChild(me);
            }
          }
          for (let ue = 0; ue < z.length; ue++) {
            const we = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            we.classList.add("flow-edge-control-point"), we.setAttribute("cx", String(z[ue].x)), we.setAttribute("cy", String(z[ue].y)), we.setAttribute("r", String(re)), we.dataset.pointIndex = String(ue), s.appendChild(we);
          }
        }
        if (l.style.cursor = Q ? "crosshair" : "pointer", l.style.strokeWidth = String(
          P.interactionWidth ?? k._config?.defaultInteractionWidth ?? 20
        ), P.markerStart) {
          const z = ln(P.markerStart), O = cn(z, k._id);
          a.setAttribute("marker-start", `url(#${O})`);
        } else
          a.removeAttribute("marker-start");
        if (P.markerEnd) {
          const z = ln(P.markerEnd), O = cn(z, k._id);
          a.setAttribute("marker-end", `url(#${O})`);
        } else
          a.removeAttribute("marker-end");
        const ee = P.strokeWidth ?? 1.5, F = Jh(P.animated);
        switch (F !== h && (a.classList.remove("flow-edge-animated", "flow-edge-pulse"), h === "dot" && m(), h = F), F) {
          case "dash":
            a.classList.add("flow-edge-animated");
            break;
          case "pulse":
            a.classList.add("flow-edge-pulse");
            break;
          case "dot":
            w(s, H, ae, P, P.animationDuration);
            break;
        }
        if (P.animationDuration && F !== "none" ? (F === "dash" || F === "pulse") && (a.style.animationDuration = P.animationDuration) : (F === "dash" || F === "pulse") && a.style.removeProperty("animation-duration"), g && g !== P.class && s.classList.remove(...g.split(" ").filter(Boolean)), P.class) {
          const z = F === "dash" ? " flow-edge-animated" : F === "pulse" ? " flow-edge-pulse" : "";
          a.setAttribute("class", P.class + z), s.classList.add(...P.class.split(" ").filter(Boolean)), g = P.class;
        } else
          g && (s.classList.remove(...g.split(" ").filter(Boolean)), g = null);
        if (s.setAttribute("aria-selected", String(!!P.selected)), P.selected)
          s.classList.add("flow-edge-selected"), a.style.strokeWidth = String(Math.max(ee + 1, 2.5)), a.style.stroke = "var(--flow-edge-stroke-selected, " + rn + ")";
        else {
          s.classList.remove("flow-edge-selected"), a.style.strokeWidth = String(ee);
          const z = k._markerDefsEl?.querySelector("defs") ?? null;
          if (Or(P.color)) {
            if (z) {
              const O = Vr(k._id, P.id), re = P.gradientDirection === "target-source", fe = E.x, ge = E.y, he = S.x, Ee = S.y;
              Br(
                z,
                O,
                re ? { from: P.color.to, to: P.color.from } : P.color,
                fe,
                ge,
                he,
                Ee
              ), a.style.stroke = `url(#${O})`, p = O;
            }
          } else if (P.color) {
            if (p) {
              const O = z;
              O && _o(O, p), p = null;
            }
            a.style.stroke = P.color;
          } else {
            if (p) {
              const O = z;
              O && _o(O, p), p = null;
            }
            a.style.removeProperty("stroke");
          }
        }
        if (k.selectedRows?.size > 0 && !P.selected && (P.sourceHandle && k.selectedRows.has(P.sourceHandle.replace(/-[lr]$/, "")) || P.targetHandle && k.selectedRows.has(P.targetHandle.replace(/-[lr]$/, ""))) ? (s.classList.add("flow-edge-row-highlighted"), P.selected || (a.style.strokeWidth = String(Math.max(ee + 0.5, 2)), a.style.stroke = getComputedStyle(s.closest(".flow-container")).getPropertyValue("--flow-edge-row-highlight-color").trim() || "#3b82f6")) : s.classList.remove("flow-edge-row-highlighted"), P.focusable ?? k._config?.edgesFocusable !== !1 ? (s.setAttribute("tabindex", "0"), s.setAttribute("role", P.ariaRole ?? "group"), s.setAttribute("aria-label", P.ariaLabel ?? (P.label ? `Edge: ${P.label}` : `Edge from ${P.source} to ${P.target}`))) : (s.removeAttribute("tabindex"), s.removeAttribute("role"), s.removeAttribute("aria-label")), P.domAttributes)
          for (const [z, O] of Object.entries(P.domAttributes))
            z.startsWith("on") || Kh.has(z.toLowerCase()) || s.setAttribute(z, O);
        const oe = (z, O, re, fe, ge) => {
          if (O) {
            if (!z && fe) {
              const he = re.includes("flow-edge-label-start"), Ee = re.includes("flow-edge-label-end");
              let be = `[data-flow-edge-id="${ge}"].flow-edge-label`;
              he ? be += ".flow-edge-label-start" : Ee ? be += ".flow-edge-label-end" : be += ":not(.flow-edge-label-start):not(.flow-edge-label-end)", z = fe.querySelector(be);
            }
            return z || (z = document.createElement("div"), z.className = re, z.dataset.flowEdgeId = ge, fe && fe.appendChild(z)), z.textContent = O, z;
          }
          return z && z.remove(), null;
        }, q = e.closest(".flow-viewport"), ce = P.labelVisibility ?? "always";
        if (c = oe(c, P.label, "flow-edge-label", q, P.id), c)
          if (a.getTotalLength?.()) {
            const z = P.labelPosition ?? 0.5, O = Qh(a, z);
            c.style.left = `${O.x}px`, c.style.top = `${O.y}px`;
          } else
            c.style.left = `${D.x}px`, c.style.top = `${D.y}px`;
        if (d = oe(d, P.labelStart, "flow-edge-label flow-edge-label-start", q, P.id), d && a.getTotalLength?.()) {
          const z = a.getTotalLength(), O = P.labelStartOffset ?? 30, re = a.getPointAtLength(Math.min(O, z / 2));
          d.style.left = `${re.x}px`, d.style.top = `${re.y}px`;
        }
        if (f = oe(f, P.labelEnd, "flow-edge-label flow-edge-label-end", q, P.id), f && a.getTotalLength?.()) {
          const z = a.getTotalLength(), O = P.labelEndOffset ?? 30, re = a.getPointAtLength(Math.max(z - O, z / 2));
          f.style.left = `${re.x}px`, f.style.top = `${re.y}px`;
        }
        for (const z of [c, d, f])
          z && (z.classList.toggle("flow-edge-label-hover", ce === "hover"), z.classList.toggle("flow-edge-label-on-select", ce === "selected"), z.classList.toggle("flow-edge-label-selected", !!P.selected), P.class ? z.classList.add(...P.class.split(" ").filter(Boolean)) : g && z.classList.remove(...g.split(" ").filter(Boolean)));
      }), r(() => {
        if (p) {
          const k = t.$data(e.closest("[x-data]"))?._markerDefsEl?.querySelector("defs");
          k && _o(k, p);
        }
        $?.(), m(), s.removeEventListener("contextmenu", M), s.removeEventListener("dblclick", v), s.removeEventListener("pointerdown", C, !0), s.removeEventListener("pointerdown", x), s.removeEventListener("pointermove", y), s.removeEventListener("keydown", X), s.removeEventListener("focus", _), s.removeEventListener("blur", L), s.removeEventListener("mousedown", N), s.removeEventListener("mouseenter", B), s.removeEventListener("mouseleave", W), c?.remove(), d?.remove(), f?.remove();
      });
    }
  );
}
function np(t, e) {
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
        const a = typeof l == "string" ? an(l) : l;
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
        const s = At(i, t._nodeMap, t._config.nodeOrigin), l = At(r, t._nodeMap, t._config.nodeOrigin);
        let a, c, d, f;
        if (o.type === "floating") {
          const h = zr(s, l);
          d = { x: h.sx, y: h.sy }, f = { x: h.tx, y: h.ty };
          const p = kt(d, h.sourcePos, null, o.markerStart), g = kt(f, h.targetPos, null, o.markerEnd), w = Gn(o, s, l, h.sourcePos, h.targetPos, p, g, void 0, void 0, t._shapeRegistry, t._config.nodeOrigin);
          a = w.path, c = w.labelPosition;
        } else {
          const h = t._container;
          let p, g;
          if (h) {
            const A = h.querySelector(
              `[data-flow-node-id="${CSS.escape(o.source)}"]`
            ), T = h.querySelector(
              `[data-flow-node-id="${CSS.escape(o.target)}"]`
            );
            if (A) {
              const M = A.getBoundingClientRect();
              p = { x: (M.left + M.right) / 2, y: (M.top + M.bottom) / 2 };
            }
            if (T) {
              const M = T.getBoundingClientRect();
              g = { x: (M.left + M.right) / 2, y: (M.top + M.bottom) / 2 };
            }
          }
          const w = h ? Jn(h, o.source, o.sourceHandle, "source", i, g) : i?.sourcePosition ?? "bottom", m = h ? Jn(h, o.target, o.targetHandle, "target", r, p) : r?.targetPosition ?? "top";
          d = Ft(s, w, t._shapeRegistry, t._config.nodeOrigin), f = Ft(l, m, t._shapeRegistry, t._config.nodeOrigin);
          const E = kt(d, w, null, o.markerStart), S = kt(f, m, null, o.markerEnd), b = Gn(o, s, l, w, m, E, S, void 0, void 0, t._shapeRegistry, t._config.nodeOrigin);
          a = b.path, c = b.labelPosition;
        }
        const u = t.getEdgePathElement(o.id);
        if (u) {
          u.setAttribute("d", a);
          const p = u.parentElement?.querySelector("path:first-child");
          p && p !== u && p.setAttribute("d", a);
        }
        if (Or(o.color)) {
          const h = t._markerDefsEl?.querySelector("defs");
          if (h) {
            const p = Vr(t._id, o.id), g = o.gradientDirection === "target-source";
            Br(
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
function op(t) {
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
              lr(!!i);
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
              t._config.colorMode = i, i && t._container ? t._colorModeHandle ? t._colorModeHandle.update(i) : t._colorModeHandle = Pr(t._container, i) : !i && t._colorModeHandle && (t._colorModeHandle.destroy(), t._colorModeHandle = null);
              break;
            case "autoLayout":
              n.autoLayout = i || void 0, t._autoLayoutFailed = !1, i ? (t._autoLayoutReady = !0, t._scheduleAutoLayout()) : (t._autoLayoutReady = !1, t._autoLayoutTimer && (clearTimeout(t._autoLayoutTimer), t._autoLayoutTimer = null));
              break;
          }
    }
  };
}
let ip = 0;
function sp(t, e) {
  switch (t) {
    case "lines":
    case "cross":
      return `linear-gradient(0deg, ${e} 1px, transparent 1px), linear-gradient(90deg, ${e} 1px, transparent 1px)`;
    default:
      return `radial-gradient(circle, ${e} 1px, transparent 1px)`;
  }
}
function rp(t) {
  t.data("flowCanvas", (e = {}) => {
    const n = {
      // ── Reactive State ────────────────────────────────────────────────
      /** Unique instance ID for SVG marker dedup, etc. */
      _id: `flow-${++ip}`,
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
      _shapeRegistry: { ...Cr, ...e.shapeTypes },
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
          d.push(sp(h.variant, h.color)), h.variant === "lines" || h.variant === "cross" ? (f.push(`${g}px ${g}px, ${g}px ${g}px`), u.push(`${a}px ${c}px, ${a}px ${c}px`)) : (f.push(`${p}px ${p}px`), u.push(`${a}px ${c}px`));
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
      _shortcuts: sf(e.keyboardShortcuts),
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
      _computeEngine: new vf(),
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
      _onDropZoneDragleave: null,
      _onDropZoneDrop: null,
      // ── Event Dispatch ────────────────────────────────────────────────
      /**
       * Emit an event: debug log it, invoke the config callback, and
       * dispatch a DOM CustomEvent (flow-xxx) for Alpine @flow-xxx listeners.
       */
      _emit(s, l) {
        V("event", s, l);
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
        this._nodeMap = xr(this.nodes);
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
        const a = e.cullingBuffer ?? 100, c = mu(this.viewport, s, l, a), d = /* @__PURE__ */ new Set();
        for (const f of this.nodes) {
          if (f.hidden) continue;
          const u = f.dimensions?.width ?? 150, h = f.dimensions?.height ?? 50, p = f.parentId ? zo(f, this._nodeMap, this._config.nodeOrigin) : f.position, g = !(p.x + u < c.minX || p.x > c.maxX || p.y + h < c.minY || p.y > c.maxY);
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
        return l ? zo(l, this._nodeMap, this._config.nodeOrigin) : { x: 0, y: 0 };
      },
      // ── Init Helpers ─────────────────────────────────────────────────
      /** Enable debug logging if configured. */
      _initDebug() {
        e.debug && lr(!0);
      },
      /** Set up container element, attributes, CSS custom properties, animator. */
      _initContainer() {
        this._container = this.$el, this._container.setAttribute("data-flow-canvas", ""), e.fitViewOnInit && this._container.setAttribute("data-fit-view", ""), this._container.setAttribute("role", "application"), this._container.setAttribute("aria-label", e.ariaLabel ?? "Flow diagram"), this._containerStyles = getComputedStyle(this._container), this._animator = new Lu(qn), e.patternColor && this._container.style.setProperty("--flow-bg-pattern-color", e.patternColor), e.backgroundGap && this._container.style.setProperty("--flow-bg-pattern-gap", String(e.backgroundGap)), this._applyZoomLevel(this.viewport.zoom);
      },
      /** Create color mode handle if configured. */
      _initColorMode() {
        e.colorMode && (this._colorModeHandle = Pr(this._container, e.colorMode));
      },
      /** Hydrate from static HTML, sort nodes, rebuild maps, capture initial dimensions. */
      _initHydration() {
        this._container.hasAttribute("data-flow-static") && this._hydrateFromStatic(), this.nodes = dt(this.nodes), this._rebuildNodeMap(), this._rebuildEdgeMap();
        for (const s of this.nodes)
          s.dimensions && this._initialDimensions.set(s.id, { ...s.dimensions });
      },
      /** Create FlowHistory if configured. */
      _initHistory() {
        e.history && (this._history = new _u(e.historyMaxSize ?? 50));
      },
      /** Create screen reader announcer. */
      _initAnnouncer() {
        if (e.announcements !== !1 && this._container) {
          const s = typeof e.announcements == "object" ? e.announcements.formatMessage : void 0;
          this._announcer = new wf(this._container, s);
        }
      },
      /** Set up collaboration bridge via collab addon plugin. */
      _initCollab() {
        if (e.collab && this._container) {
          const s = Pt("collab");
          if (!s) {
            console.error("[AlpineFlow] Collaboration requires the collab plugin. Register it with: Alpine.plugin(AlpineFlowCollab)");
            return;
          }
          const l = this._container, { Doc: a, Awareness: c, CollabBridge: d, CollabAwareness: f } = s, u = e.collab, h = new a(), p = new c(h), g = new d(h, this, u.provider), w = new f(p, u.user);
          if ($e.set(l, { bridge: g, awareness: w, doc: h }), u.provider.connect(h, p), u.cursors !== !1) {
            let m = !1;
            const E = u.throttle ?? 20, S = (T) => {
              if (m) return;
              m = !0;
              const M = l.getBoundingClientRect(), v = (T.clientX - M.left - this.viewport.x) / this.viewport.zoom, C = (T.clientY - M.top - this.viewport.y) / this.viewport.zoom;
              w.updateCursor({ x: v, y: C }), setTimeout(() => {
                m = !1;
              }, E);
            }, b = () => {
              w.updateCursor(null);
            };
            l.addEventListener("mousemove", S), l.addEventListener("mouseleave", b);
            const A = $e.get(l);
            A.cursorCleanup = () => {
              l.removeEventListener("mousemove", S), l.removeEventListener("mouseleave", b);
            };
          }
        }
      },
      /** Create panZoom instance, viewport element fallback, apply background, register with store, setup marker defs. */
      _initPanZoom() {
        if (V("init", `flowCanvas "${this._id}" initializing`, {
          nodes: this.nodes.map((s) => ({ id: s.id, type: s.type ?? "default", position: s.position, parentId: s.parentId })),
          edges: this.edges.map((s) => ({ id: s.id, source: s.source, target: s.target, type: s.type ?? "default" })),
          config: { minZoom: e.minZoom, maxZoom: e.maxZoom, pannable: e.pannable, zoomable: e.zoomable, debug: e.debug }
        }), this._panZoom = fu(this._container, {
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
        if (s && (this._longPressCleanup = rf(
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
          if (Ve(s.key, a.escape) && this.contextMenu.show) {
            this.closeContextMenu();
            return;
          }
          if (Ve(s.key, a.escape) && this.pendingConnection) {
            this._emit("connect-end", {
              connection: null,
              source: this.pendingConnection.source,
              sourceHandle: this.pendingConnection.sourceHandle,
              position: { x: 0, y: 0 }
            }), this.pendingConnection = null, this._container?.classList.remove("flow-connecting"), this._container && Pe(this._container);
            return;
          }
          if (Ve(s.key, a.delete)) {
            if (l === "INPUT" || l === "TEXTAREA") return;
            this._deleteSelected();
          }
          if (Ve(s.key, this._shortcuts.selectionToolToggle) && !s.ctrlKey && !s.metaKey) {
            if (l === "INPUT" || l === "TEXTAREA") return;
            this._selectionTool = this._selectionTool === "box" ? "lasso" : "box";
            return;
          }
          if (Ve(s.key, a.moveNodes)) {
            if (l === "INPUT" || l === "TEXTAREA" || this._config?.disableKeyboardA11y || this.selectedNodes.size === 0) return;
            s.preventDefault();
            const c = lt(s, a.moveStepModifier) ? a.moveStep * a.moveStepMultiplier : a.moveStep;
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
              if (h && vr(h)) {
                h.position.x += d, h.position.y += f;
                const p = this._container ? $e.get(this._container) : void 0;
                p?.bridge && p.bridge.pushLocalNodeUpdate(h.id, { position: h.position });
              }
            }
          }
          if ((s.ctrlKey || s.metaKey) && !s.shiftKey && Ve(s.key, a.undo)) {
            if (l === "INPUT" || l === "TEXTAREA") return;
            s.preventDefault(), this.undo();
          }
          if ((s.ctrlKey || s.metaKey) && s.shiftKey && Ve(s.key, a.redo)) {
            if (l === "INPUT" || l === "TEXTAREA") return;
            s.preventDefault(), this.redo();
          }
          if ((s.ctrlKey || s.metaKey) && !s.shiftKey) {
            if (l === "INPUT" || l === "TEXTAREA") return;
            Ve(s.key, a.copy) ? (s.preventDefault(), this.copy()) : Ve(s.key, a.paste) ? (s.preventDefault(), this.paste()) : Ve(s.key, a.cut) && (s.preventDefault(), this.cut());
          }
        }, document.addEventListener("keydown", this._onKeyDown);
      },
      /** Create minimap if configured. */
      _initMinimap() {
        e.minimap && (this._minimap = Au(this._container, {
          getState: () => ({
            nodes: Un(this.nodes, this._nodeMap, this._config.nodeOrigin),
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
          this._controls = Hu(s, {
            position: e.controlsPosition ?? "bottom-left",
            orientation: e.controlsOrientation ?? "vertical",
            external: l,
            showZoom: e.controlsShowZoom ?? !0,
            showFitView: e.controlsShowFitView ?? !0,
            showInteractive: e.controlsShowInteractive ?? !0,
            showResetPanels: e.controlsShowResetPanels ?? !1,
            onZoomIn: () => this.zoomIn(),
            onZoomOut: () => this.zoomOut(),
            onFitView: () => this.fitView({ padding: Ro }),
            onToggleInteractive: () => this.toggleInteractive(),
            onResetPanels: () => this.resetPanels()
          }), this.$watch("isInteractive", (a) => {
            this._controls?.update({ isInteractive: a });
          });
        }
      },
      /** Selection box/lasso setup (pointerdown/pointermove/pointerup handlers). */
      _initSelection() {
        this._selectionBox = Fu(this._container), this._lasso = zu(this._container), this._selectionTool = e.selectionTool ?? "box", this._onSelectionPointerDown = (s) => {
          if (!this._config.selectionOnDrag && !this._touchSelectionMode && !lt(s, this._shortcuts.selectionBox))
            return;
          const l = s.target;
          if (l !== this._container && !l.classList.contains("flow-viewport"))
            return;
          s.stopPropagation(), s.preventDefault(), this._selectionShiftHeld = !0;
          const a = this._config.selectionMode ?? "partial", c = lt(s, this._shortcuts.selectionModeToggle);
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
          const a = Un(this.nodes, this._nodeMap, this._config.nodeOrigin);
          let c, d = [];
          if (this._selectionTool === "lasso") {
            const f = this._lasso.end(this.viewport);
            if (!f) return;
            const u = this._selectionEffectiveMode === "full" ? qu(a, f) : Bu(a, f), h = new Set(u.map((p) => p.id));
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
                  const A = g.getPointAtLength(b / m * w);
                  ri(A.x, A.y, f) && E++;
                }
                (this._selectionEffectiveMode === "full" ? E === m + 1 : E > 0) && d.push(p.id);
              }
          } else {
            const f = this._selectionBox.end(this.viewport);
            if (!f) return;
            const u = this._selectionEffectiveMode === "full" ? gu(a, f, this._config.nodeOrigin) : pu(a, f, this._config.nodeOrigin), h = new Set(u.map((p) => p.id));
            c = this.nodes.filter((p) => h.has(p.id));
          }
          this._selectionShiftHeld || this.deselectAll();
          for (const f of c) {
            if (!Fo(f) || f.hidden) continue;
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
          const s = e.dropMimeTypes ?? ["application/alpineflow"], l = (a, c) => {
            const d = document.elementsFromPoint(a, c);
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
          this._onDropZoneDragOver = (a) => {
            !a.dataTransfer || !s.some((d) => a.dataTransfer.types.includes(d)) || (a.preventDefault(), a.dataTransfer.dropEffect = "move", this._container?.classList.add("flow-canvas-drag-over"));
          }, this._onDropZoneDragleave = (a) => {
            if (!this._container)
              return;
            const c = a.relatedTarget;
            c && this._container.contains(c) || this._container.classList.remove("flow-canvas-drag-over");
          }, this._onDropZoneDrop = (a) => {
            if (a.preventDefault(), this._container?.classList.remove("flow-canvas-drag-over"), !a.dataTransfer || !e.onDrop)
              return;
            let c = null, d = null;
            for (const g of s) {
              const w = a.dataTransfer.getData(g);
              if (w) {
                c = g, d = w;
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
            const u = rr(
              a.clientX,
              a.clientY,
              this.viewport,
              this._container.getBoundingClientRect()
            ), h = l(a.clientX, a.clientY), p = e.onDrop({ data: f, position: u, targetNode: h, mimeType: c });
            p && this.addNodes(p, { center: !0 });
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
      getNodeAtPoint(s, l) {
        const a = document.elementsFromPoint(s, l);
        for (const c of a) {
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
        const l = [
          "columns",
          "gap",
          "padding",
          "headerHeight",
          "direction",
          "stretch"
        ], a = s.id, c = [];
        for (const d of l) {
          const f = t.watch(
            () => s.childLayout?.[d],
            () => {
              this._layoutDedup?.safeLayoutChildren(a);
            }
          );
          c.push(f);
        }
        this._childLayoutCleanups.set(a, c);
      },
      _uninstallChildLayoutWatchers(s) {
        const l = this._childLayoutCleanups.get(s);
        if (l) {
          for (const a of l) a();
          this._childLayoutCleanups.delete(s);
        }
      },
      /** Create the shared ResizeObserver instance (A1). Called from _initChildLayout. */
      _resizeObserverInit() {
        typeof ResizeObserver > "u" || (this._resizeObserver = new ResizeObserver((s) => {
          for (const l of s) {
            const a = l.target, c = a.getAttribute("data-flow-node-id");
            if (!c) continue;
            const d = this._nodeMap.get(c);
            if (!d) continue;
            const f = l.borderBoxSize?.[0], u = f ? f.inlineSize : a.offsetWidth, h = f ? f.blockSize : a.offsetHeight;
            if (u === 0 && h === 0 || a.offsetParent === null && a.tagName !== "BODY" || d.fixedDimensions === !0) continue;
            const p = Math.round(u), g = Math.round(h), w = d.dimensions;
            if (w && Math.abs((w.width ?? 0) - p) < 1 && Math.abs((w.height ?? 0) - g) < 1)
              continue;
            const m = Tf(
              { width: p, height: g },
              d.minDimensions,
              d.maxDimensions
            );
            d.dimensions = m, d.parentId && this._layoutDedup?.safeLayoutChildren(d.parentId);
          }
        }));
      },
      /** Run initial child layouts for all layout parents. */
      _initChildLayout() {
        if (this._layoutDedup = Lf((s) => {
          this.layoutChildren(s);
        }), this._resizeObserverInit(), this.$wire) {
          const s = this.$wire;
          e.wireEvents && Cf(e, s, e.wireEvents);
          const l = Pf(this, s), a = Ef(this, s);
          this._wireCleanup = () => {
            l(), a();
          }, V("init", `wire bridge activated for "${this._id}"`);
        }
        V("init", `flowCanvas "${this._id}" ready`), this._emit("init"), this._recomputeChildValidation();
        for (const s of this.nodes)
          s.childLayout && this._installChildLayoutWatchers(s);
        for (const s of this.nodes)
          s.childLayout && !s.parentId && this.layoutChildren(s.id);
        for (const s of this.nodes)
          s.childLayout && s.parentId && (this._nodeMap.get(s.parentId)?.childLayout || this.layoutChildren(s.id));
        e.fitViewOnInit && requestAnimationFrame(() => {
          this.fitView();
        });
      },
      /** Call setup(canvas) on any addon that provides it. */
      _initAddons() {
        for (const [, s] of kr().entries())
          s && typeof s == "object" && typeof s.setup == "function" && s.setup(this);
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
          c && Pt(c) ? (this._autoLayoutReady = !0, this.$nextTick(() => this._runAutoLayout())) : c && this._warn("AUTO_LAYOUT_MISSING_DEP", `autoLayout requires the ${s} plugin. Register it with: Alpine.plugin(${a[s]})`);
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
        o = this, this._initDebug(), this._initContainer(), this._initColorMode(), this._initHydration(), this._initHistory(), this._initAnnouncer(), this._initCollab(), this._initPanZoom(), this._initClickHandlers(), this._initKeyboard(), this._initMinimap(), this._initControls(), this._initSelection(), this._initChildLayout(), this._initAddons(), this._initDropZone(), this._initAutoLayout(), this._initReady();
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
            const u = ln(f), h = cn(u, this._id);
            l.has(h) || l.set(h, Yn(u, h));
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
        if (this._wireCleanup?.(), this._wireCleanup = null, this._longPressCleanup?.(), this._longPressCleanup = null, this._touchSelectionCleanup?.(), this._touchSelectionCleanup = null, this._emit("destroy"), V("destroy", `flowCanvas "${this._id}" destroying`), this._onCanvasClick && this._container && this._container.removeEventListener("click", this._onCanvasClick), this._onCanvasContextMenu && this._container && this._container.removeEventListener("contextmenu", this._onCanvasContextMenu), this._container)
          for (const s of this._contextMenuListeners)
            this._container.removeEventListener(s.event, s.handler);
        this._contextMenuListeners = [], this._onKeyDown && document.removeEventListener("keydown", this._onKeyDown), this._onContainerPointerDown && this._container && this._container.removeEventListener("pointerdown", this._onContainerPointerDown), this._markerDefsEl?.remove(), this._markerDefsEl = null, this._minimap?.destroy(), this._minimap = null, this._controls?.destroy(), this._controls = null, this._onSelectionPointerDown && this._container && this._container.removeEventListener("pointerdown", this._onSelectionPointerDown), this._onSelectionPointerMove && this._container && this._container.removeEventListener("pointermove", this._onSelectionPointerMove), this._onSelectionPointerUp && this._container && this._container.removeEventListener("pointerup", this._onSelectionPointerUp), this._selectionBox?.destroy(), this._selectionBox = null, this._lasso?.destroy(), this._lasso = null, this._viewportEl = null, this._container && (this._container.removeEventListener("dragover", this._onDropZoneDragOver), this._container.removeEventListener("dragleave", this._onDropZoneDragleave), this._container.removeEventListener("drop", this._onDropZoneDrop)), this._followHandle?.stop(), this._followHandle = null;
        for (const s of this._activeTimelines)
          s.stop();
        if (this._activeTimelines.clear(), this._animator && (t.raw(this._animator).stopAll(), this._animator = null), this._layoutAnimFrame && (cancelAnimationFrame(this._layoutAnimFrame), this._layoutAnimFrame = 0), this._autoLayoutTimer && (clearTimeout(this._autoLayoutTimer), this._autoLayoutTimer = null), this._colorModeHandle && (this._colorModeHandle.destroy(), this._colorModeHandle = null), this._container) {
          const s = $e.get(this._container);
          s && (s.bridge.destroy(), s.awareness.destroy(), s.cursorCleanup && s.cursorCleanup(), $e.delete(this._container));
        }
        e.collab && e.collab.provider.destroy(), this._container && this._container.removeAttribute("data-flow-canvas"), this.$store.flow.unregister(this._id), this._panZoom?.destroy(), this._panZoom = null, this._announcer?.destroy(), this._announcer = null, this._computeDebounceTimer && (clearTimeout(this._computeDebounceTimer), this._computeDebounceTimer = null);
        for (const s of [...this._childLayoutCleanups.keys()])
          this._uninstallChildLayoutWatchers(s);
        this._resizeObserver?.disconnect(), this._resizeObserver = null, this._layoutDedup?.dispose(), this._layoutDedup = null;
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
      /**
       * Batch multiple canvas mutations so that layout reconciliation runs once
       * after the whole block rather than once per mutation. Nested calls join
       * the outermost batch. fn's return value is forwarded; layout still runs
       * even if fn throws.
       */
      batch(s) {
        return this._layoutDedup ? Mf(this._layoutDedup)(s) : s();
      },
      get collab() {
        return this._container ? $e.get(this._container)?.awareness : void 0;
      },
      async toImage(s) {
        let l;
        try {
          ({ captureFlowImage: l } = await Promise.resolve().then(() => Lg));
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
      If(i),
      Df(i),
      Rf(i),
      Of(i),
      Vf(i),
      mh(i),
      vh(i),
      _h(i),
      bh(i),
      Th(i),
      Ah(i),
      Nh(i),
      np(i, t),
      op(i)
    ];
    for (const s of r)
      Object.defineProperties(n, Object.getOwnPropertyDescriptors(s));
    return n.registerMarker = (s, l) => {
      Mu(s, l);
    }, n;
  });
}
function vs(t, e) {
  return {
    x: e[0] * Math.round(t.x / e[0]),
    y: e[1] * Math.round(t.y / e[1])
  };
}
function ap(t, e, n) {
  const { onDragStart: o, onDrag: i, onDragEnd: r, getViewport: s, getNodePosition: l, snapToGrid: a = !1, filterSelector: c, container: d, isLocked: f, noDragClassName: u, dragThreshold: h = 0 } = n;
  let p = { x: 0, y: 0 };
  function g(E) {
    const S = s();
    return {
      x: (E.x - S.x) / S.zoom,
      y: (E.y - S.y) / S.zoom
    };
  }
  const w = Fe(t), m = Yl().subject(() => {
    const E = s(), S = l();
    return {
      x: S.x * E.zoom + E.x,
      y: S.y * E.zoom + E.y
    };
  }).on("start", (E) => {
    p = g(E), o?.({ nodeId: e, position: p, sourceEvent: E.sourceEvent });
  }).on("drag", (E) => {
    let S = g(E);
    a && (S = vs(S, a));
    const b = {
      x: S.x - p.x,
      y: S.y - p.y
    };
    i?.({ nodeId: e, position: S, delta: b, sourceEvent: E.sourceEvent });
  }).on("end", (E) => {
    let S = g(E);
    a && (S = vs(S, a)), r?.({ nodeId: e, position: S, sourceEvent: E.sourceEvent });
  });
  return d && m.container(() => d), h > 0 && m.clickDistance(h), m.filter((E) => {
    if (f?.() || u && E.target?.closest?.("." + u)) return !1;
    if (c) {
      const S = t.querySelector(c);
      return S ? S.contains(E.target) : !0;
    }
    return !0;
  }), w.call(m), {
    destroy() {
      w.on(".drag", null);
    }
  };
}
function lp(t, e) {
  const n = zt(t, e);
  return {
    id: t.id,
    x: n.x,
    y: n.y,
    width: t.dimensions?.width ?? ve,
    height: t.dimensions?.height ?? _e
  };
}
function cp(t, e, n) {
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
    for (const [b, A] of E) {
      const T = A - b;
      Math.abs(T) <= n && (i.add(A), Math.abs(T) < Math.abs(l) && (l = T, r = T));
    }
    const S = [
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
    for (const [b, A] of S) {
      const T = A - b;
      Math.abs(T) <= n && (o.add(A), Math.abs(T) < Math.abs(a) && (a = T, s = T));
    }
  }
  return {
    horizontal: [...o],
    vertical: [...i],
    snapOffset: { x: r, y: s }
  };
}
function dp(t, e, n, o) {
  return Math.abs(t.x - e.x) > 30 ? t.x < e.x ? { source: n, target: o } : { source: o, target: n } : t.y < e.y ? { source: n, target: o } : { source: o, target: n };
}
function up(t, e, n, o) {
  let i = null, r = o;
  for (const s of n) {
    if (s.id === t) continue;
    const l = Math.sqrt(
      (e.x - s.center.x) ** 2 + (e.y - s.center.y) ** 2
    );
    if (l < r) {
      r = l;
      const { source: a, target: c } = dp(e, s.center, t, s.id);
      i = { source: a, target: c, targetId: s.id, distance: l, targetCenter: s.center };
    }
  }
  return i;
}
const fp = /* @__PURE__ */ new Set(["x-data", "x-init", "x-bind", "href", "src", "action", "formaction", "srcdoc"]);
let hp = 0, pp = 0;
function gp(t, e) {
  switch (e) {
    case "alt":
      return t.altKey;
    case "meta":
      return t.metaKey;
    case "shift":
      return t.shiftKey;
  }
}
function mp(t, e, n) {
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
function yp(t, e, n) {
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
function wp(t) {
  t.directive(
    "flow-node",
    (e, { expression: n }, { evaluate: o, effect: i, cleanup: r }) => {
      let s = null, l = !1, a = !1, c = null, d = null, f = null, u = null, h = null, p = null, g = !1, w = -1, m = null, E = !1, S = [], b = "", A = [], T = null;
      i(() => {
        const x = o(n);
        if (!x) return;
        if (e.dataset.flowNodeId = x.id, x.type && (e.dataset.flowNodeType = x.type), !E) {
          const R = t.$data(e.closest("[x-data]"));
          let G = !1;
          if (R?._config?.nodeTypes) {
            const Y = x.type ?? "default", H = R._config.nodeTypes[Y] ?? R._config.nodeTypes.default;
            if (typeof H == "string") {
              const D = document.querySelector(H);
              D?.content && (e.appendChild(D.content.cloneNode(!0)), G = !0);
            } else typeof H == "function" && (H(x, e), G = !0);
          }
          if (!G && e.children.length === 0) {
            const Y = document.createElement("div");
            Y.setAttribute("x-flow-handle:target", "");
            const H = document.createElement("span");
            H.setAttribute("x-text", "node.data.label");
            const D = document.createElement("div");
            D.setAttribute("x-flow-handle:source", ""), e.appendChild(Y), e.appendChild(H), e.appendChild(D), G = !0;
          }
          if (G)
            for (const Y of Array.from(e.children))
              t.addScopeToNode(Y, { node: x }), t.initTree(Y);
          E = !0;
        }
        if (x.hidden) {
          e.classList.add("flow-node-hidden"), e.removeAttribute("tabindex"), e.removeAttribute("role"), e.removeAttribute("aria-label"), s?.destroy(), s = null;
          return;
        }
        e.classList.remove("flow-node-hidden"), T !== x.id && (s?.destroy(), s = null, T = x.id);
        const y = t.$data(e.closest("[x-data]"));
        if (!y?.viewport) return;
        e.classList.add("flow-node", "nopan"), x.type === "group" ? e.classList.add("flow-node-group") : e.classList.remove("flow-node-group");
        const X = x.parentId ? y.getAbsolutePosition(x.id) : x.position ?? { x: 0, y: 0 }, _ = x.nodeOrigin ?? y._config?.nodeOrigin ?? [0, 0], L = x.dimensions?.width ?? 150, N = x.dimensions?.height ?? 40;
        if (e.style.left = X.x - L * _[0] + "px", e.style.top = X.y - N * _[1] + "px", x.dimensions) {
          const R = x.childLayout, G = x.fixedDimensions, Y = y.nodes.some(
            (H) => H.parentId === x.id
          );
          e.style.width = x.dimensions.width + "px", R || G || Y ? e.style.height = x.dimensions.height + "px" : e.style.height = "";
        }
        y.selectedNodes.has(x.id) ? e.classList.add("flow-node-selected") : e.classList.remove("flow-node-selected"), e.setAttribute("aria-selected", String(!!x.selected)), x._validationErrors && x._validationErrors.length > 0 ? e.classList.add("flow-node-invalid") : e.classList.remove("flow-node-invalid");
        const B = ["flow-node-running", "flow-node-completed", "flow-node-failed", "flow-node-skipped"], W = x.runState;
        for (const R of B)
          e.classList.remove(R);
        W && W !== "pending" && e.classList.add(`flow-node-${W}`);
        for (const R of S)
          e.classList.remove(R);
        const P = x.class ? x.class.split(/\s+/).filter(Boolean) : [];
        for (const R of P)
          e.classList.add(R);
        S = P;
        const k = x.shape ? `flow-node-${x.shape}` : "";
        b !== k && (b && e.classList.remove(b), k && e.classList.add(k), b = k);
        const I = t.$data(e.closest("[data-flow-canvas]")), te = x.shape && I?._shapeRegistry?.[x.shape];
        if (te?.clipPath ? e.style.clipPath = te.clipPath : e.style.clipPath = "", x.style) {
          const R = typeof x.style == "string" ? Object.fromEntries(x.style.split(";").filter(Boolean).map((Y) => Y.split(":").map((H) => H.trim()))) : x.style, G = [];
          for (const [Y, H] of Object.entries(R))
            Y && H && (e.style.setProperty(Y, H), G.push(Y));
          for (const Y of A)
            G.includes(Y) || e.style.removeProperty(Y);
          A = G;
        } else if (A.length > 0) {
          for (const R of A)
            e.style.removeProperty(R);
          A = [];
        }
        if (x.rotation ? (e.style.transform = `rotate(${x.rotation}deg)`, e.style.transformOrigin = "center") : e.style.transform = "", x.focusable ?? y._config?.nodesFocusable !== !1 ? (e.setAttribute("tabindex", "0"), e.setAttribute("role", x.ariaRole ?? "group"), e.setAttribute("aria-label", x.ariaLabel ?? (x.data?.label ? `Node: ${x.data.label}` : `Node ${x.id}`))) : (e.removeAttribute("tabindex"), e.removeAttribute("role"), e.removeAttribute("aria-label")), x.domAttributes)
          for (const [R, G] of Object.entries(x.domAttributes))
            R.startsWith("on") || fp.has(R.toLowerCase()) || e.setAttribute(R, G);
        rt(x) ? e.classList.remove("flow-node-no-connect") : e.classList.add("flow-node-no-connect"), x.collapsed ? e.classList.add("flow-node-collapsed") : e.classList.remove("flow-node-collapsed");
        const ie = e.classList.contains("flow-node-condensed");
        x.condensed ? e.classList.add("flow-node-condensed") : e.classList.remove("flow-node-condensed"), !!x.condensed !== ie && requestAnimationFrame(() => {
          x.dimensions = {
            width: e.offsetWidth,
            height: e.offsetHeight
          }, V("condense", `Node "${x.id}" re-measured after condense toggle`, x.dimensions);
        }), x.filtered ? e.classList.add("flow-node-filtered") : e.classList.remove("flow-node-filtered");
        const K = x.handles ?? "visible";
        e.classList.remove("flow-handles-hidden", "flow-handles-hover", "flow-handles-select"), K !== "visible" && e.classList.add(`flow-handles-${K}`);
        let ae = Er(x, y._nodeMap);
        y._config?.elevateNodesOnSelect !== !1 && y.selectedNodes.has(x.id) && (ae += x.type === "group" ? Math.max(1 - ae, 0) : 1e3), g && (ae += 1e3);
        const le = x.type === "group" ? 0 : 2;
        if (ae !== le ? e.style.zIndex = String(ae) : e.style.removeProperty("z-index"), !vr(x)) {
          e.classList.add("flow-node-locked"), s?.destroy(), s = null;
          return;
        }
        e.classList.remove("flow-node-locked"), e.querySelector("[data-flow-drag-handle]") ? e.classList.add("flow-node-has-handle") : e.classList.remove("flow-node-has-handle");
        const j = e.closest(".flow-container");
        s || (s = ap(e, x.id, {
          container: j ?? void 0,
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
          onDragStart({ nodeId: R, position: G, sourceEvent: Y }) {
            e.classList.add("flow-node-dragging"), l = !1, a = !1, c = null;
            const H = y._container ? $e.get(y._container) : void 0;
            H?.bridge && H.bridge.setDragging(R, !0), u?.destroy(), u = null, h = null, p && j && j.querySelector(`[data-flow-node-id="${CSS.escape(p)}"]`)?.classList.remove("flow-node-drop-target"), p = null, y._captureHistory?.(), V("drag", `Node "${R}" drag start`, G);
            const D = y.getNode(R);
            if (D && (y._config?.selectNodesOnDrag !== !1 && D.selectable !== !1 && !y.selectedNodes.has(R) && (lt(Y, y._shortcuts?.multiSelect) || y.deselectAll(), y.selectedNodes.add(R), D.selected = !0, y._emitSelectionChange(), a = !0), y._emit("node-drag-start", { node: D }), y.selectedNodes.has(R) && y.selectedNodes.size > 1)) {
              const Q = ct(R, y.nodes);
              c = /* @__PURE__ */ new Map();
              for (const U of y.selectedNodes) {
                if (U === R || Q.has(U))
                  continue;
                const ee = y.getNode(U);
                ee && ee.draggable !== !1 && c.set(U, { x: ee.position.x, y: ee.position.y });
              }
            }
            y._config?.autoPanOnNodeDrag !== !1 && j && (d = br({
              container: j,
              speed: y._config?.autoPanSpeed ?? 15,
              onPan(Q, U) {
                const ee = y.viewport?.zoom || 1, F = { x: y.viewport.x, y: y.viewport.y };
                y._panZoom?.setViewport({
                  x: y.viewport.x - Q,
                  y: y.viewport.y - U,
                  zoom: ee
                });
                const J = F.x - y.viewport.x, ne = F.y - y.viewport.y, oe = J === 0 && ne === 0, q = y.getNode(R);
                let ce = !1;
                if (q) {
                  const z = q.position.x, O = q.position.y;
                  q.position.x += J / ee, q.position.y += ne / ee;
                  const re = Cn(q.position, q, y._config?.nodeExtent);
                  q.position.x = re.x, q.position.y = re.y, ce = q.position.x === z && q.position.y === O;
                }
                if (c)
                  for (const [z] of c) {
                    const O = y.getNode(z);
                    if (O) {
                      O.position.x += J / ee, O.position.y += ne / ee;
                      const re = Cn(O.position, O, y._config?.nodeExtent);
                      O.position.x = re.x, O.position.y = re.y;
                    }
                  }
                return oe && ce;
              }
            }), Y instanceof MouseEvent && d.updatePointer(Y.clientX, Y.clientY), d.start());
          },
          onDrag({ nodeId: R, position: G, delta: Y, sourceEvent: H }) {
            l = !0;
            const D = y.getNode(R);
            if (D) {
              if (D.parentId) {
                const ee = y.getAbsolutePosition(D.parentId);
                let F = G.x - ee.x, J = G.y - ee.y;
                const ne = D.dimensions ?? { width: 150, height: 50 }, oe = y.getNode(D.parentId);
                if (oe?.childLayout) {
                  g || (e.classList.add("flow-reorder-dragging"), m = D.parentId), g = !0;
                  const q = D.extent !== "parent";
                  if (D.position.x = G.x - ee.x, D.position.y = G.y - ee.y, !q && oe.dimensions) {
                    const O = po({ x: D.position.x, y: D.position.y }, ne, oe.dimensions);
                    D.position.x = O.x, D.position.y = O.y;
                  }
                  const ce = D.dimensions?.width ?? 150, z = D.dimensions?.height ?? 50;
                  if (q) {
                    const O = oe.dimensions?.width ?? 150, re = oe.dimensions?.height ?? 50, fe = D.position.x + ce / 2, ge = D.position.y + z / 2, he = 12, Ee = m === D.parentId ? 0 : he, be = fe >= Ee && fe <= O - Ee && ge >= Ee && ge <= re - Ee, ke = /* @__PURE__ */ new Set();
                    let ue = D.parentId;
                    for (; ue; )
                      ke.add(ue), ue = y.getNode(ue)?.parentId;
                    const we = G.x + ce / 2, Ae = G.y + z / 2, Se = ct(D.id, y.nodes);
                    let Re = null;
                    const Le = y.nodes.filter(
                      (pe) => pe.id !== D.id && (pe.droppable || pe.childLayout) && !pe.hidden && !Se.has(pe.id) && (be ? !ke.has(pe.id) : pe.id !== D.parentId) && (!pe.acceptsDrop || pe.acceptsDrop(D))
                    );
                    for (const pe of Le) {
                      const xe = pe.parentId ? y.getAbsolutePosition(pe.id) : pe.position, et = pe.dimensions?.width ?? 150, ht = pe.dimensions?.height ?? 50, tt = pe.id === p ? 0 : he;
                      we >= xe.x + tt && we <= xe.x + et - tt && Ae >= xe.y + tt && Ae <= xe.y + ht - tt && (Re = pe);
                    }
                    const me = Re?.id ?? null;
                    if (me !== p) {
                      p && j && j.querySelector(`[data-flow-node-id="${CSS.escape(p)}"]`)?.classList.remove("flow-node-drop-target"), me && j && j.querySelector(`[data-flow-node-id="${CSS.escape(me)}"]`)?.classList.add("flow-node-drop-target"), p = me;
                      const pe = me ? y.getNode(me) : null, xe = m;
                      if (pe?.childLayout && me !== m) {
                        xe && (y.layoutChildren(xe, { omitFromComputation: R, shallow: !0 }), y.propagateLayoutUp(xe, { omitFromComputation: R })), m = me;
                        const et = y.nodes.filter((We) => We.parentId === me && We.id !== R).sort((We, na) => (We.order ?? 1 / 0) - (na.order ?? 1 / 0)), ht = et.length, tt = [...et];
                        tt.splice(ht, 0, D);
                        for (let We = 0; We < tt.length; We++)
                          tt[We].order = We;
                        w = ht;
                        const yi = y._initialDimensions?.get(R), wi = { ...D, dimensions: yi ? { ...yi } : void 0 };
                        y.layoutChildren(me, { excludeId: R, includeNode: wi, shallow: !0 }), y.propagateLayoutUp(me, { includeNode: wi });
                      } else be && m !== D.parentId ? (xe && xe !== D.parentId && (y.layoutChildren(xe, { omitFromComputation: R, shallow: !0 }), y.propagateLayoutUp(xe, { omitFromComputation: R })), m = D.parentId, w = -1) : !me && !be && (xe && (y.layoutChildren(xe, { omitFromComputation: R, shallow: !0 }), y.propagateLayoutUp(xe, { omitFromComputation: R })), m = null, w = -1);
                    }
                  }
                  if (m) {
                    const O = y.getNode(m), re = O?.childLayout ?? oe.childLayout, fe = y.nodes.filter((ue) => ue.parentId === m && ue.id !== R).sort((ue, we) => (ue.order ?? 1 / 0) - (we.order ?? 1 / 0));
                    let ge, he;
                    if (m !== D.parentId) {
                      const ue = O?.parentId ? y.getAbsolutePosition(m) : O?.position ?? { x: 0, y: 0 };
                      ge = G.x - ue.x, he = G.y - ue.y;
                    } else
                      ge = D.position.x, he = D.position.y;
                    const Ee = re.swapThreshold ?? 0.5;
                    if (w === -1)
                      if (m === D.parentId) {
                        const ue = D.order ?? 0;
                        w = fe.filter((we) => (we.order ?? 0) < ue).length;
                      } else
                        w = fe.length;
                    const be = w;
                    let ke = fe.length;
                    for (let ue = 0; ue < fe.length; ue++) {
                      const we = fe[ue], Ae = we.dimensions?.width ?? 150, Se = we.dimensions?.height ?? 50, Re = ue < be ? 1 - Ee : Ee, Le = we.position.y + Se * Re, me = we.position.x + Ae * Re;
                      if (re.direction === "grid") {
                        const pe = {
                          x: ge + ce / 2,
                          y: he + z / 2
                        }, xe = we.position.y + Se / 2;
                        if (pe.y < we.position.y) {
                          ke = ue;
                          break;
                        }
                        if (Math.abs(pe.y - xe) < Se / 2 && pe.x < me) {
                          ke = ue;
                          break;
                        }
                      } else if (re.direction === "vertical") {
                        if ((ue < be ? he : he + z) < Le) {
                          ke = ue;
                          break;
                        }
                      } else if ((ue < be ? ge : ge + ce) < me) {
                        ke = ue;
                        break;
                      }
                    }
                    if (ke !== w) {
                      w = ke;
                      const ue = [...fe];
                      ue.splice(ke, 0, D);
                      for (let Le = 0; Le < ue.length; Le++)
                        ue[Le].order = Le;
                      e.closest(".flow-container")?.classList.add("flow-layout-animating"), y._layoutAnimFrame && cancelAnimationFrame(y._layoutAnimFrame);
                      const Ae = D.id, Se = m, Re = Se !== D.parentId;
                      y._layoutAnimFrame = requestAnimationFrame(() => {
                        if (Re && Se) {
                          const xe = y.getNode(Ae);
                          let et;
                          if (xe) {
                            const ht = y._initialDimensions?.get(Ae);
                            et = { ...xe, dimensions: ht ? { ...ht } : void 0 };
                          }
                          y.layoutChildren(Se, {
                            excludeId: Ae,
                            includeNode: et,
                            shallow: !0
                          }), y.propagateLayoutUp(Se, {
                            includeNode: et
                          });
                        } else
                          y.layoutChildren(Se, Ae, !0);
                        const Le = performance.now(), me = 300, pe = () => {
                          y._layoutAnimTick++, performance.now() - Le < me ? y._layoutAnimFrame = requestAnimationFrame(pe) : y._layoutAnimFrame = 0;
                        };
                        y._layoutAnimFrame = requestAnimationFrame(pe);
                      });
                    }
                  }
                  d && H instanceof MouseEvent && d.updatePointer(H.clientX, H.clientY);
                  return;
                }
                if (D.extent === "parent" && oe?.dimensions) {
                  const q = po(
                    { x: F, y: J },
                    ne,
                    oe.dimensions
                  );
                  F = q.x, J = q.y;
                } else if (Array.isArray(D.extent)) {
                  const q = Sr({ x: F, y: J }, D.extent, ne);
                  F = q.x, J = q.y;
                }
                if ((!D.extent || D.extent !== "parent") && (Qt(
                  oe,
                  y._config?.childValidationRules ?? {}
                )?.preventChildEscape || !!oe?.childLayout) && oe?.dimensions) {
                  const z = po(
                    { x: F, y: J },
                    ne,
                    oe.dimensions
                  );
                  F = z.x, J = z.y;
                }
                if (D.expandParent && oe?.dimensions) {
                  const q = af(
                    { x: F, y: J },
                    ne,
                    oe.dimensions
                  );
                  q && (oe.dimensions.width = q.width, oe.dimensions.height = q.height);
                }
                D.position.x = F, D.position.y = J;
              } else {
                const ee = Cn(G, D, y._config?.nodeExtent);
                D.position.x = ee.x, D.position.y = ee.y;
              }
              if (y._config?.snapToGrid) {
                const ee = D.nodeOrigin ?? y._config?.nodeOrigin ?? [0, 0], F = D.dimensions?.width ?? 150, J = D.dimensions?.height ?? 40, ne = D.parentId ? y.getAbsolutePosition(D.id) : D.position;
                e.style.left = ne.x - F * ee[0] + "px", e.style.top = ne.y - J * ee[1] + "px", y._layoutAnimTick++;
              }
              if (y._emit("node-drag", { node: D, position: G }), c)
                for (const [ee, F] of c) {
                  const J = y.getNode(ee);
                  if (J) {
                    let ne = F.x + Y.x, oe = F.y + Y.y;
                    const q = Cn({ x: ne, y: oe }, J, y._config?.nodeExtent);
                    J.position.x = q.x, J.position.y = q.y;
                  }
                }
              const U = y._config?.helperLines;
              if (U) {
                const ee = typeof U == "object" ? U.snap ?? !0 : !0, F = typeof U == "object" ? U.threshold ?? 5 : 5, J = (O) => {
                  const re = O.parentId ? y.getAbsolutePosition(O.id) : O.position;
                  return lp({ ...O, position: re }, y._config?.nodeOrigin);
                }, oe = (y.selectedNodes.size > 1 && y.selectedNodes.has(R) ? y.nodes.filter((O) => y.selectedNodes.has(O.id)) : [D]).map(J), q = {
                  x: Math.min(...oe.map((O) => O.x)),
                  y: Math.min(...oe.map((O) => O.y)),
                  width: Math.max(...oe.map((O) => O.x + O.width)) - Math.min(...oe.map((O) => O.x)),
                  height: Math.max(...oe.map((O) => O.y + O.height)) - Math.min(...oe.map((O) => O.y))
                }, ce = y.nodes.filter(
                  (O) => !y.selectedNodes.has(O.id) && O.id !== R && O.hidden !== !0 && O.filtered !== !0
                ).map(J), z = cp(q, ce, F);
                if (ee && (z.snapOffset.x !== 0 || z.snapOffset.y !== 0) && (D.position.x += z.snapOffset.x, D.position.y += z.snapOffset.y, c))
                  for (const [O] of c) {
                    const re = y.getNode(O);
                    re && (re.position.x += z.snapOffset.x, re.position.y += z.snapOffset.y);
                  }
                if (f?.remove(), z.horizontal.length > 0 || z.vertical.length > 0) {
                  const O = j?.querySelector(".flow-viewport");
                  if (O) {
                    const re = y.nodes.map(J);
                    f = yp(z.horizontal, z.vertical, re), O.appendChild(f);
                  }
                } else
                  f = null;
                y._emit("helper-lines-change", {
                  horizontal: z.horizontal,
                  vertical: z.vertical
                });
              }
            }
            if (y._config?.preventOverlap) {
              const U = typeof y._config.preventOverlap == "number" ? y._config.preventOverlap : 5, ee = D.dimensions?.width ?? ve, F = D.dimensions?.height ?? _e, J = y.selectedNodes, ne = y.nodes.filter((q) => q.id !== D.id && !q.hidden && !J.has(q.id)).map((q) => Ht(q, y._config?.nodeOrigin)), oe = $f(D.position, ee, F, ne, U);
              D.position.x = oe.x, D.position.y = oe.y;
            }
            if (!D.parentId) {
              const U = ct(D.id, y.nodes), ee = y.nodes.filter(
                (q) => q.id !== D.id && q.droppable && !q.hidden && !U.has(q.id) && (!q.acceptsDrop || q.acceptsDrop(D))
              ), F = Ht(D, y._config?.nodeOrigin);
              let J = null;
              const ne = 12;
              for (const q of ee) {
                const ce = q.parentId ? y.getAbsolutePosition(q.id) : q.position, z = q.dimensions?.width ?? ve, O = q.dimensions?.height ?? _e, re = F.x + F.width / 2, fe = F.y + F.height / 2, ge = q.id === p ? 0 : ne;
                re >= ce.x + ge && re <= ce.x + z - ge && fe >= ce.y + ge && fe <= ce.y + O - ge && (J = q);
              }
              const oe = J?.id ?? null;
              oe !== p && (p && j && j.querySelector(`[data-flow-node-id="${CSS.escape(p)}"]`)?.classList.remove("flow-node-drop-target"), oe && j && j.querySelector(`[data-flow-node-id="${CSS.escape(oe)}"]`)?.classList.add("flow-node-drop-target"), p = oe);
            }
            if (y._config?.proximityConnect) {
              const U = y._config.proximityConnectDistance ?? 150, ee = D.dimensions ?? { width: 150, height: 50 }, F = {
                x: D.position.x + ee.width / 2,
                y: D.position.y + ee.height / 2
              }, J = y.nodes.filter((oe) => oe.id !== D.id && !oe.hidden).map((oe) => ({
                id: oe.id,
                center: {
                  x: oe.position.x + (oe.dimensions?.width ?? 150) / 2,
                  y: oe.position.y + (oe.dimensions?.height ?? 50) / 2
                }
              })), ne = up(D.id, F, J, U);
              if (ne)
                if (y.edges.some(
                  (q) => q.source === ne.source && q.target === ne.target || q.source === ne.target && q.target === ne.source
                ))
                  u?.destroy(), u = null, h = null;
                else {
                  if (h = ne, !u) {
                    u = Tt({
                      connectionLineType: y._config?.connectionLineType,
                      connectionLineStyle: y._config?.connectionLineStyle,
                      connectionLine: y._config?.connectionLine
                    });
                    const q = j?.querySelector(".flow-viewport");
                    q && q.appendChild(u.svg);
                  }
                  u.update({
                    fromX: F.x,
                    fromY: F.y,
                    toX: ne.targetCenter.x,
                    toY: ne.targetCenter.y,
                    source: ne.source
                  });
                }
              else
                u?.destroy(), u = null, h = null;
            }
            const Q = y._container ? $e.get(y._container) : void 0;
            if (Q?.bridge) {
              if (Q.bridge.pushLocalNodeUpdate(R, { position: D.position }), c)
                for (const [U] of c) {
                  const ee = y.getNode(U);
                  ee && Q.bridge.pushLocalNodeUpdate(U, { position: ee.position });
                }
              if (Q.awareness && H instanceof MouseEvent && y._container) {
                const U = y._container.getBoundingClientRect(), ee = (H.clientX - U.left - y.viewport.x) / y.viewport.zoom, F = (H.clientY - U.top - y.viewport.y) / y.viewport.zoom;
                Q.awareness.updateCursor({ x: ee, y: F });
              }
            }
            d && H instanceof MouseEvent && d.updatePointer(H.clientX, H.clientY);
          },
          onDragEnd({ nodeId: R, position: G }) {
            e.classList.remove("flow-node-dragging"), V("drag", `Node "${R}" drag end`, G);
            const Y = y._container ? $e.get(y._container) : void 0;
            Y?.bridge && Y.bridge.setDragging(R, !1), d?.stop(), d = null, f?.remove(), f = null, y._config?.helperLines && y._emit("helper-lines-change", { horizontal: [], vertical: [] });
            const H = y.getNode(R);
            if (H && y._emit("node-drag-end", { node: H, position: G }), g && H?.parentId) {
              e.classList.remove("flow-reorder-dragging");
              const D = m;
              g = !1, w = -1, m = null, y._layoutAnimFrame && (cancelAnimationFrame(y._layoutAnimFrame), y._layoutAnimFrame = 0), e.closest(".flow-container")?.classList.remove("flow-layout-animating"), p ? (j && j.querySelector(`[data-flow-node-id="${CSS.escape(p)}"]`)?.classList.remove("flow-node-drop-target"), y.reparentNode(R, p), p = null) : D && D !== H.parentId ? (y.layoutChildren(D, { omitFromComputation: R, shallow: !0 }), y.propagateLayoutUp(D, { omitFromComputation: R }), y.layoutChildren(H.parentId), y._emit("child-reorder", {
                nodeId: R,
                parentId: H.parentId,
                order: H.order
              })) : (y.layoutChildren(H.parentId), y._emit("child-reorder", {
                nodeId: R,
                parentId: H.parentId,
                order: H.order
              })), c = null, l = !1;
              return;
            }
            if (H && p)
              j && j.querySelector(`[data-flow-node-id="${CSS.escape(p)}"]`)?.classList.remove("flow-node-drop-target"), y.reparentNode(R, p), p = null;
            else if (H && H.parentId && !p) {
              const D = Qt(
                y.getNode(H.parentId),
                y._config?.childValidationRules ?? {}
              ), Q = y.getNode(H.parentId);
              if (!D?.preventChildEscape && !Q?.childLayout && Q?.dimensions) {
                const U = H.position.x, ee = H.position.y, F = H.dimensions?.width ?? 150, J = H.dimensions?.height ?? 50;
                (U + F < 0 || ee + J < 0 || U > Q.dimensions.width || ee > Q.dimensions.height) && y.reparentNode(R, null);
              }
              p = null;
            } else
              p && j && j.querySelector(`[data-flow-node-id="${CSS.escape(p)}"]`)?.classList.remove("flow-node-drop-target"), p = null;
            if (y._config?.proximityConnect && h) {
              const D = h;
              u?.destroy(), u = null, h = null;
              let Q = !0;
              if (y._config.onProximityConnect && y._config.onProximityConnect({
                source: D.source,
                target: D.target,
                distance: D.distance
              }) === !1 && (Q = !1), Q) {
                const U = {
                  source: D.source,
                  sourceHandle: "source",
                  target: D.target,
                  targetHandle: "target"
                };
                if (Ze(U, y.edges, { preventCycles: y._config?.preventCycles }) && st(U, y._config?.connectionRules, y._nodeMap) && (j ? qe(j, U, y.edges) : !0) && (j ? Be(j, U) : !0) && (!y._config.isValidConnection || y._config.isValidConnection(U))) {
                  if (y._config.proximityConnectConfirm) {
                    const q = j?.querySelector(`[data-flow-node-id="${CSS.escape(D.source)}"]`), ce = j?.querySelector(`[data-flow-node-id="${CSS.escape(D.target)}"]`);
                    q?.classList.add("flow-proximity-confirm"), ce?.classList.add("flow-proximity-confirm"), setTimeout(() => {
                      q?.classList.remove("flow-proximity-confirm"), ce?.classList.remove("flow-proximity-confirm");
                    }, 400);
                  }
                  const oe = `e-${D.source}-${D.target}-${Date.now()}-${pp++}`;
                  y.addEdges({ id: oe, ...U }), y._emit("connect", { connection: U });
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
          const y = x._config.easyConnectKey ?? "alt", X = (_) => {
            if (!gp(_, y) || _.target.closest("[data-flow-handle-type]")) return;
            const L = t.$data(e.closest("[x-data]"));
            if (!L || L._animationLocked) return;
            const N = o(n);
            if (!N) return;
            const B = L.getNode(N.id);
            if (!B || B.connectable === !1) return;
            _.preventDefault(), _.stopPropagation(), _.stopImmediatePropagation();
            const W = mp(e, _.clientX, _.clientY), P = W?.dataset.flowHandleId ?? "source";
            e.classList.add("flow-easy-connecting");
            const k = e.closest(".flow-container");
            if (!k) return;
            const I = L.viewport?.zoom || 1, te = L.viewport?.x || 0, se = L.viewport?.y || 0, ie = k.getBoundingClientRect();
            let K, ae;
            if (W) {
              const H = W.getBoundingClientRect();
              K = (H.left + H.width / 2 - ie.left - te) / I, ae = (H.top + H.height / 2 - ie.top - se) / I;
            } else {
              const H = e.getBoundingClientRect();
              K = (H.left + H.width / 2 - ie.left - te) / I, ae = (H.top + H.height / 2 - ie.top - se) / I;
            }
            L._emit("connect-start", { source: N.id, sourceHandle: P });
            const de = Tt({
              connectionLineType: L._config?.connectionLineType,
              connectionLineStyle: L._config?.connectionLineStyle,
              connectionLine: L._config?.connectionLine
            }), le = k.querySelector(".flow-viewport");
            le && le.appendChild(de.svg), de.update({ fromX: K, fromY: ae, toX: K, toY: ae, source: N.id, sourceHandle: P }), L.pendingConnection = { source: N.id, sourceHandle: P, position: { x: K, y: ae } }, Jt(k, N.id, P, L);
            let Z = jn(k, L, _.clientX, _.clientY), j = null;
            const R = L._config?.connectionSnapRadius ?? 20, G = (H) => {
              const D = L.screenToFlowPosition(H.clientX, H.clientY), Q = Kt({
                containerEl: k,
                handleType: "target",
                excludeNodeId: N.id,
                cursorFlowPos: D,
                connectionSnapRadius: R,
                getNode: (U) => L.getNode(U),
                toFlowPosition: (U, ee) => L.screenToFlowPosition(U, ee)
              });
              Q.element !== j && (j?.classList.remove("flow-handle-active"), Q.element?.classList.add("flow-handle-active"), j = Q.element), de.update({ fromX: K, fromY: ae, toX: Q.position.x, toY: Q.position.y, source: N.id, sourceHandle: P }), L.pendingConnection = { ...L.pendingConnection, position: Q.position }, Z?.updatePointer(H.clientX, H.clientY);
            }, Y = (H) => {
              Z?.stop(), Z = null, document.removeEventListener("pointermove", G), document.removeEventListener("pointerup", Y), de.destroy(), j?.classList.remove("flow-handle-active"), Pe(k), e.classList.remove("flow-easy-connecting");
              const D = L.screenToFlowPosition(H.clientX, H.clientY), Q = { source: N.id, sourceHandle: P, position: D };
              let U = j;
              if (U || (U = document.elementFromPoint(H.clientX, H.clientY)?.closest('[data-flow-handle-type="target"]')), U) {
                const F = U.closest("[x-flow-node]")?.dataset.flowNodeId, J = U.dataset.flowHandleId ?? "target";
                if (F) {
                  const ne = { source: N.id, sourceHandle: P, target: F, targetHandle: J };
                  if (Ze(ne, L.edges, { preventCycles: L._config.preventCycles }))
                    if (st(ne, L._config?.connectionRules, L._nodeMap) && qe(k, ne, L.edges) && Be(k, ne) && (!L._config?.isValidConnection || L._config.isValidConnection(ne))) {
                      const oe = `e-${N.id}-${F}-${Date.now()}-${hp++}`;
                      L.addEdges({ id: oe, ...ne }), L._emit("connect", { connection: ne }), L._emit("connect-end", { connection: ne, ...Q });
                    } else
                      L._emit("connect-end", { connection: null, ...Q });
                  else
                    L._emit("connect-end", { connection: null, ...Q });
                } else
                  L._emit("connect-end", { connection: null, ...Q });
              } else
                L._emit("connect-end", { connection: null, ...Q });
              L.pendingConnection = null;
            };
            document.addEventListener("pointermove", G), document.addEventListener("pointerup", Y);
          };
          e.addEventListener("pointerdown", X, { capture: !0 }), r(() => {
            e.removeEventListener("pointerdown", X, { capture: !0 });
          });
        }
      }
      const M = (x) => {
        if (x.key !== "Enter" && x.key !== " ") return;
        x.preventDefault();
        const y = o(n);
        if (!y) return;
        const X = t.$data(e.closest("[x-data]"));
        X && (X._animationLocked || Fo(y) && (X._emit("node-click", { node: y, event: x }), x.stopPropagation(), lt(x, X._shortcuts?.multiSelect) ? X.selectedNodes.has(y.id) ? (X.selectedNodes.delete(y.id), y.selected = !1) : (X.selectedNodes.add(y.id), y.selected = !0) : (X.deselectAll(), X.selectedNodes.add(y.id), y.selected = !0), X._emitSelectionChange()));
      };
      e.addEventListener("keydown", M);
      const v = () => {
        const x = t.$data(e.closest("[x-data]"));
        if (!x?._config?.autoPanOnNodeFocus) return;
        const y = o(n);
        if (!y) return;
        const X = y.parentId ? x.getAbsolutePosition(y.id) : y.position;
        x.setCenter(
          X.x + (y.dimensions?.width ?? 150) / 2,
          X.y + (y.dimensions?.height ?? 40) / 2
        );
      };
      e.addEventListener("focus", v);
      const C = (x) => {
        if (l) return;
        const y = o(n);
        if (!y) return;
        const X = t.$data(e.closest("[x-data]"));
        if (X && !X._animationLocked && (X._emit("node-click", { node: y, event: x }), !!Fo(y))) {
          if (x.stopPropagation(), a) {
            a = !1;
            return;
          }
          lt(x, X._shortcuts?.multiSelect) ? X.selectedNodes.has(y.id) ? (X.selectedNodes.delete(y.id), y.selected = !1, e.classList.remove("flow-node-selected"), V("selection", `Node "${y.id}" deselected (shift)`)) : (X.selectedNodes.add(y.id), y.selected = !0, e.classList.add("flow-node-selected"), V("selection", `Node "${y.id}" selected (shift)`)) : (X.deselectAll(), X.selectedNodes.add(y.id), y.selected = !0, e.classList.add("flow-node-selected"), V("selection", `Node "${y.id}" selected`)), X._emitSelectionChange();
        }
      };
      e.addEventListener("click", C);
      const $ = (x) => {
        x.preventDefault(), x.stopPropagation();
        const y = o(n);
        if (!y) return;
        const X = t.$data(e.closest("[x-data]"));
        if (X)
          if (X.selectedNodes.size > 1 && X.selectedNodes.has(y.id)) {
            const _ = X.nodes.filter((L) => X.selectedNodes.has(L.id));
            X._emit("selection-context-menu", { nodes: _, event: x });
          } else
            X._emit("node-context-menu", { node: y, event: x });
      };
      e.addEventListener("contextmenu", $), requestAnimationFrame(() => {
        if (!e.isConnected) return;
        const x = o(n);
        if (!x) return;
        const y = t.$data(e.closest("[x-data]"));
        x.dimensions = {
          width: e.offsetWidth,
          height: e.offsetHeight
        }, V("init", `Node "${x.id}" measured`, x.dimensions), y?._nodeElements?.set(x.id, e), x.resizeObserver !== !1 && y?._resizeObserver && y._resizeObserver.observe(e);
      }), r(() => {
        s?.destroy(), f?.remove(), f = null, u?.destroy(), u = null, e.removeEventListener("keydown", M), e.removeEventListener("focus", v), e.removeEventListener("click", C), e.removeEventListener("contextmenu", $);
        const x = e.dataset.flowNodeId;
        if (x) {
          const y = t.$data(e.closest("[x-data]"));
          y?._nodeElements?.delete(x), y?._resizeObserver?.unobserve(e);
        }
      });
    }
  );
}
const xt = {
  minWidth: 30,
  minHeight: 30,
  maxWidth: 1 / 0,
  maxHeight: 1 / 0
};
function vp(t, e, n, o, i, r) {
  const { minWidth: s, minHeight: l, maxWidth: a, maxHeight: c } = i, d = t.includes("left"), f = t.includes("right"), u = t.includes("top"), h = t.includes("bottom");
  let p = o.width;
  f ? p = o.width + e.x : d && (p = o.width - e.x);
  let g = o.height;
  h ? g = o.height + e.y : u && (g = o.height - e.y), p = Math.max(s, Math.min(a, p)), g = Math.max(l, Math.min(c, g)), r && (p = r[0] * Math.round(p / r[0]), g = r[1] * Math.round(g / r[1]), p = Math.max(s, Math.min(a, p)), g = Math.max(l, Math.min(c, g)));
  const w = p - o.width, m = g - o.height, E = d ? n.x - w : n.x, S = u ? n.y - m : n.y;
  return {
    position: { x: E, y: S },
    dimensions: { width: p, height: g }
  };
}
const Xr = ["top-left", "top-right", "bottom-left", "bottom-right"], Yr = ["top", "right", "bottom", "left"], _p = [...Xr, ...Yr], bp = {
  "top-left": "nwse-resize",
  "top-right": "nesw-resize",
  "bottom-left": "nesw-resize",
  "bottom-right": "nwse-resize",
  top: "ns-resize",
  bottom: "ns-resize",
  left: "ew-resize",
  right: "ew-resize"
};
function xp(t) {
  t.directive(
    "flow-resizer",
    (e, { expression: n, modifiers: o }, { evaluate: i, effect: r, cleanup: s }) => {
      const l = Ep(o);
      let a = { ...xt };
      if (n)
        try {
          const d = i(n);
          a = { ...xt, ...d };
        } catch {
        }
      const c = [];
      for (const d of l) {
        const f = document.createElement("div");
        f.className = `flow-resizer-handle flow-resizer-handle-${d}`, f.style.cursor = bp[d], f.dataset.flowResizeDirection = d, e.appendChild(f), c.push(f), f.addEventListener("pointerdown", (u) => {
          u.preventDefault(), u.stopPropagation();
          const h = e.closest("[x-flow-node]");
          if (!h) return;
          const p = e.closest("[x-data]");
          if (!p) return;
          const g = t.$data(p), w = h.dataset.flowNodeId;
          if (!w || !g) return;
          const m = g.getNode(w);
          if (!m || !Zi(m)) return;
          m.fixedDimensions = !0;
          const E = { ...a };
          if (m.minDimensions?.width != null && a.minWidth === xt.minWidth && (E.minWidth = m.minDimensions.width), m.minDimensions?.height != null && a.minHeight === xt.minHeight && (E.minHeight = m.minDimensions.height), m.maxDimensions?.width != null && a.maxWidth === xt.maxWidth && (E.maxWidth = m.maxDimensions.width), m.maxDimensions?.height != null && a.maxHeight === xt.maxHeight && (E.maxHeight = m.maxDimensions.height), !m.dimensions) {
            const $ = g.viewport?.zoom || 1, x = h.getBoundingClientRect();
            m.dimensions = { width: x.width / $, height: x.height / $ };
          }
          const S = { x: m.position.x, y: m.position.y }, b = { width: m.dimensions.width, height: m.dimensions.height }, A = g.viewport?.zoom || 1, T = u.clientX, M = u.clientY;
          g._captureHistory?.(), V("resize", `Resize start on "${w}" (${d})`, b), g._emit("node-resize-start", { node: m, dimensions: { ...b } });
          const v = ($) => {
            const x = {
              x: ($.clientX - T) / A,
              y: ($.clientY - M) / A
            }, y = vp(
              d,
              x,
              S,
              b,
              E,
              g._config?.snapToGrid ?? !1
            );
            if (m.position.x = y.position.x, m.position.y = y.position.y, m.dimensions.width = y.dimensions.width, m.dimensions.height = y.dimensions.height, m.parentId) {
              const X = g.getAbsolutePosition(m.id);
              h.style.left = `${X.x}px`, h.style.top = `${X.y}px`;
            } else
              h.style.left = `${y.position.x}px`, h.style.top = `${y.position.y}px`;
            h.style.width = `${y.dimensions.width}px`, h.style.height = `${y.dimensions.height}px`, g._emit("node-resize", { node: m, dimensions: { ...y.dimensions } });
          }, C = () => {
            document.removeEventListener("pointermove", v), document.removeEventListener("pointerup", C), document.removeEventListener("pointercancel", C), V("resize", `Resize end on "${w}"`, m.dimensions), g._emit("node-resize-end", { node: m, dimensions: { ...m.dimensions } });
          };
          document.addEventListener("pointermove", v), document.addEventListener("pointerup", C), document.addEventListener("pointercancel", C);
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
        const g = !Zi(p);
        for (const w of c)
          w.style.display = g ? "none" : "";
      }), s(() => {
        for (const d of c)
          d.remove();
      });
    }
  );
}
function Ep(t) {
  if (t.includes("corners"))
    return Xr;
  if (t.includes("edges"))
    return Yr;
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
  return _p;
}
function Sp(t, e, n, o) {
  return (Math.atan2(t - n, -(e - o)) * 180 / Math.PI % 360 + 360) % 360;
}
function Cp(t, e) {
  return (Math.round(t / e) * e % 360 + 360) % 360;
}
function Pp(t) {
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
        const S = (A) => {
          let T = Sp(
            A.clientX,
            A.clientY,
            m,
            E
          );
          l && (T = Cp(T, a)), g.rotation = T;
        }, b = () => {
          document.removeEventListener("pointermove", S), document.removeEventListener("pointerup", b), e.style.cursor = "grab", h._emit("node-rotate-end", { node: g, rotation: g.rotation });
        };
        document.addEventListener("pointermove", S), document.addEventListener("pointerup", b);
      };
      e.addEventListener("pointerdown", c), s(() => {
        e.removeEventListener("pointerdown", c), e.classList.remove("flow-rotate-handle");
      });
    }
  );
}
function kp(t) {
  t.directive(
    "flow-drag-handle",
    (e) => {
      e.setAttribute("data-flow-drag-handle", ""), e.classList.add("flow-drag-handle");
      const n = e.closest("[x-flow-node]");
      n && n.classList.add("flow-node-has-handle");
    }
  );
}
const Lp = "application/alpineflow";
function Mp(t) {
  t.directive(
    "flow-draggable",
    (e, { expression: n }, { evaluate: o }) => {
      e.setAttribute("draggable", "true"), e.style.cursor = "grab", e.addEventListener("dragstart", (i) => {
        if (!i.dataTransfer) return;
        const r = o(n), s = typeof r == "string" ? r : JSON.stringify(r);
        i.dataTransfer.setData(Lp, s), i.dataTransfer.effectAllowed = "move";
      });
    }
  );
}
function Tp(t) {
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
const Ap = [
  "top",
  "bottom",
  "left",
  "right",
  "top-left",
  "top-right",
  "bottom-left",
  "bottom-right"
], Np = "a, button, input, textarea, select, [contenteditable]", $p = 100, Ip = 60, Dp = /* @__PURE__ */ new Set(["top", "top-left", "top-right"]), Rp = /* @__PURE__ */ new Set(["bottom", "bottom-left", "bottom-right"]), Hp = /* @__PURE__ */ new Set(["left", "top-left", "bottom-left"]), Fp = /* @__PURE__ */ new Set(["right", "top-right", "bottom-right"]);
function zp(t, e) {
  const n = new Set(e), o = n.has("static"), i = n.has("no-resize") || n.has("noresize"), r = n.has("locked"), s = n.has("constrained");
  let l = n.has("fill-width") || n.has("fill"), a = n.has("fill-height") || n.has("fill");
  return { position: t && Ap.includes(t) ? t : "top-right", isStatic: o, isFixed: r, noResize: i, constrained: s, fillWidth: l, fillHeight: a };
}
function Et(t, e, n) {
  t.dispatchEvent(new CustomEvent(`flow-${e}`, {
    bubbles: !0,
    detail: n
  }));
}
function Op(t, e, n, o, i, r) {
  return {
    left: Math.max(0, Math.min(t, i - n)),
    top: Math.max(0, Math.min(e, r - o))
  };
}
function Vp(t, e, n, o) {
  t.style.transform = "none", t.style.borderRadius = "0", n && (t.style.left = "0", t.style.right = "0", t.style.width = "auto"), o && (t.style.top = "0", t.style.bottom = "0", t.style.height = "auto"), n && !o && (Dp.has(e) && (t.style.top = "0"), Rp.has(e) && (t.style.bottom = "0")), o && !n && (Hp.has(e) && (t.style.left = "0"), Fp.has(e) && (t.style.right = "0"));
}
function Bp(t) {
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
      } = zp(n, o), u = d || f, h = !s && !l && !u, p = !s && !a && !u;
      e.classList.add("flow-panel", `flow-panel-${r}`), s && e.classList.add("flow-panel-static"), (l || u) && e.classList.add("flow-panel-locked"), (a || u) && e.classList.add("flow-panel-no-resize"), d && e.classList.add("flow-panel-fill-width"), f && e.classList.add("flow-panel-fill-height"), u && Vp(e, r, d, f);
      const g = (A) => A.stopPropagation();
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
      }, E = `flow-panel-${r}`, S = () => {
        e.style.left = m.left, e.style.top = m.top, e.style.right = m.right, e.style.bottom = m.bottom, e.style.transform = m.transform, e.style.width = m.width, e.style.height = m.height, e.style.borderRadius = m.borderRadius, e.classList.contains(E) || e.classList.add(E);
      };
      w.addEventListener("flow-panel-reset", S), w.__flowPanels || (w.__flowPanels = /* @__PURE__ */ new Set()), w.__flowPanels.add(e);
      let b = null;
      if (h) {
        let A = !1, T = 0, M = 0, v = 0, C = 0;
        const $ = () => {
          const _ = e.getBoundingClientRect(), L = w.getBoundingClientRect();
          return {
            x: _.left - L.left,
            y: _.top - L.top
          };
        }, x = (_) => {
          if (!A) return;
          let L = v + (_.clientX - T), N = C + (_.clientY - M);
          if (c) {
            const B = Op(
              L,
              N,
              e.offsetWidth,
              e.offsetHeight,
              w.clientWidth,
              w.clientHeight
            );
            L = B.left, N = B.top;
          }
          e.style.left = `${L}px`, e.style.top = `${N}px`, Et(w, "panel-drag", {
            panel: e,
            position: { x: L, y: N }
          });
        }, y = () => {
          if (!A) return;
          A = !1, document.removeEventListener("pointermove", x), document.removeEventListener("pointerup", y), document.removeEventListener("pointercancel", y);
          const _ = $();
          Et(w, "panel-drag-end", {
            panel: e,
            position: _
          });
        }, X = (_) => {
          const L = _.target;
          if (L.closest(Np) || L.closest(".flow-panel-resize-handle"))
            return;
          A = !0, T = _.clientX, M = _.clientY;
          const N = e.getBoundingClientRect(), B = w.getBoundingClientRect();
          v = N.left - B.left, C = N.top - B.top, e.style.bottom = "auto", e.style.right = "auto", e.style.transform = "none", e.style.left = `${v}px`, e.style.top = `${C}px`, document.addEventListener("pointermove", x), document.addEventListener("pointerup", y), document.addEventListener("pointercancel", y), Et(w, "panel-drag-start", {
            panel: e,
            position: { x: v, y: C }
          });
        };
        if (e.addEventListener("pointerdown", X), p) {
          b = document.createElement("div"), b.classList.add("flow-panel-resize-handle"), e.appendChild(b);
          let _ = !1, L = 0, N = 0, B = 0, W = 0;
          const P = (te) => {
            if (!_) return;
            const se = Math.max($p, B + (te.clientX - L)), ie = Math.max(Ip, W + (te.clientY - N));
            e.style.width = `${se}px`, e.style.height = `${ie}px`, Et(w, "panel-resize", {
              panel: e,
              dimensions: { width: se, height: ie }
            });
          }, k = () => {
            _ && (_ = !1, document.removeEventListener("pointermove", P), document.removeEventListener("pointerup", k), document.removeEventListener("pointercancel", k), Et(w, "panel-resize-end", {
              panel: e,
              dimensions: { width: e.offsetWidth, height: e.offsetHeight }
            }));
          }, I = (te) => {
            te.stopPropagation(), _ = !0, L = te.clientX, N = te.clientY, B = e.offsetWidth, W = e.offsetHeight, document.addEventListener("pointermove", P), document.addEventListener("pointerup", k), document.addEventListener("pointercancel", k), Et(w, "panel-resize-start", {
              panel: e,
              dimensions: { width: B, height: W }
            });
          };
          b.addEventListener("pointerdown", I), i(() => {
            e.removeEventListener("pointerdown", X), b?.removeEventListener("pointerdown", I), document.removeEventListener("pointermove", x), document.removeEventListener("pointerup", y), document.removeEventListener("pointercancel", y), document.removeEventListener("pointermove", P), document.removeEventListener("pointerup", k), document.removeEventListener("pointercancel", k), b?.remove(), e.removeEventListener("mousedown", g), e.removeEventListener("pointerdown", g), e.removeEventListener("wheel", g), w.removeEventListener("flow-panel-reset", S), w.__flowPanels?.delete(e);
          });
        } else
          i(() => {
            e.removeEventListener("pointerdown", X), document.removeEventListener("pointermove", x), document.removeEventListener("pointerup", y), document.removeEventListener("pointercancel", y), e.removeEventListener("mousedown", g), e.removeEventListener("pointerdown", g), e.removeEventListener("wheel", g), w.removeEventListener("flow-panel-reset", S), w.__flowPanels?.delete(e);
          });
      } else
        i(() => {
          e.removeEventListener("mousedown", g), e.removeEventListener("pointerdown", g), e.removeEventListener("wheel", g), w.removeEventListener("flow-panel-reset", S), w.__flowPanels?.delete(e);
        });
    }
  );
}
function qp(t) {
  t.directive(
    "flow-node-toolbar",
    (e, { value: n, modifiers: o }, { effect: i, cleanup: r }) => {
      const s = Xp(n), l = Yp(o);
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
        const h = u.viewport.zoom || 1, p = parseInt(e.getAttribute("data-flow-offset") ?? "10", 10), g = d.dataset.flowNodeId, w = g ? u.getNode(g) : null, m = w?.dimensions?.width ?? d.offsetWidth, E = w?.dimensions?.height ?? d.offsetHeight, S = p / h;
        let b, A, T, M;
        s === "top" || s === "bottom" ? (A = s === "top" ? -S : E + S, M = s === "top" ? "-100%" : "0%", l === "start" ? (b = 0, T = "0%") : l === "end" ? (b = m, T = "-100%") : (b = m / 2, T = "-50%")) : (b = s === "left" ? -S : m + S, T = s === "left" ? "-100%" : "0%", l === "start" ? (A = 0, M = "0%") : l === "end" ? (A = E, M = "-100%") : (A = E / 2, M = "-50%")), e.style.left = `${b}px`, e.style.top = `${A}px`, e.style.transformOrigin = "0 0", e.style.transform = `scale(${1 / h}) translate(${T}, ${M})`;
      }), r(() => {
        e.removeEventListener("pointerdown", a), e.removeEventListener("click", c), e.classList.remove("flow-node-toolbar");
      });
    }
  );
}
function Xp(t) {
  return t === "bottom" ? "bottom" : t === "left" ? "left" : t === "right" ? "right" : "top";
}
function Yp(t) {
  return t.includes("start") ? "start" : t.includes("end") ? "end" : "center";
}
function Wp(t) {
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
        const T = r(o);
        f = T?.offsetX ?? 0, u = T?.offsetY ?? 0;
      }
      a.setAttribute("role", "menu"), a.setAttribute("tabindex", "-1"), a.style.display = "none";
      const h = document.createElement("div");
      h.style.cssText = "position:fixed;inset:0;z-index:4999;display:none;", c.appendChild(h);
      let p = null;
      const g = 4, w = () => {
        p = document.activeElement;
        const T = d.contextMenu.x + f, M = d.contextMenu.y + u;
        a.style.display = "", a.style.position = "fixed", a.style.left = T + "px", a.style.top = M + "px", a.style.zIndex = "5000", a.querySelectorAll(':scope > button, :scope > [role="menuitem"]').forEach((X) => {
          X.setAttribute("role", "menuitem"), X.hasAttribute("tabindex") || X.setAttribute("tabindex", "-1");
        });
        const v = a.getBoundingClientRect(), C = window.innerWidth, $ = window.innerHeight;
        let x = T, y = M;
        v.right > C - g && (x = C - v.width - g), v.bottom > $ - g && (y = $ - v.height - g), x < g && (x = g), y < g && (y = g), a.style.left = x + "px", a.style.top = y + "px", h.style.display = "", a.focus();
      }, m = () => {
        a.style.display = "none", h.style.display = "none", p && document.contains(p) && (p.focus(), p = null);
      };
      i(() => {
        const T = d.contextMenu;
        T.show && T.type === l ? w() : m();
      }), h.addEventListener("click", () => d.closeContextMenu()), h.addEventListener("contextmenu", (T) => {
        T.preventDefault(), d.closeContextMenu();
      });
      const E = () => {
        d.contextMenu.show && d.contextMenu.type === l && d.closeContextMenu();
      };
      window.addEventListener("scroll", E, !0);
      const S = () => Array.from(a.querySelectorAll(
        ':scope > button:not([disabled]), :scope > [role="menuitem"]:not([disabled])'
      )), b = (T) => Array.from(T.querySelectorAll(
        "button:not([disabled])"
      )), A = (T) => {
        if (!d.contextMenu.show || d.contextMenu.type !== l || a.style.display === "none") return;
        const M = document.activeElement, v = M?.closest(".flow-context-submenu"), C = v ? b(v) : S();
        if (C.length === 0) return;
        const $ = C.indexOf(M);
        switch (T.key) {
          case "ArrowDown": {
            T.preventDefault();
            const x = $ < C.length - 1 ? $ + 1 : 0;
            C[x].focus();
            break;
          }
          case "ArrowUp": {
            T.preventDefault();
            const x = $ > 0 ? $ - 1 : C.length - 1;
            C[x].focus();
            break;
          }
          case "Tab": {
            if (T.preventDefault(), T.shiftKey) {
              const x = $ > 0 ? $ - 1 : C.length - 1;
              C[x].focus();
            } else {
              const x = $ < C.length - 1 ? $ + 1 : 0;
              C[x].focus();
            }
            break;
          }
          case "Enter":
          case " ": {
            T.preventDefault(), M?.click();
            break;
          }
          case "ArrowRight": {
            if (!v) {
              const x = M?.querySelector(".flow-context-submenu");
              x && (T.preventDefault(), x.querySelector("button:not([disabled])")?.focus());
            }
            break;
          }
          case "ArrowLeft": {
            v && (T.preventDefault(), v.closest(".flow-context-submenu-trigger")?.focus());
            break;
          }
        }
      };
      a.addEventListener("keydown", A), s(() => {
        h.remove(), window.removeEventListener("scroll", E, !0), a.removeEventListener("keydown", A);
      });
    }
  );
}
const jp = {
  mouseenter: "mouseleave",
  click: "click"
  // toggle behavior
};
function Up(t) {
  t.directive(
    "flow-animate",
    (e, { value: n, modifiers: o, expression: i }, { evaluate: r, effect: s, cleanup: l }) => {
      const a = new Set(o), c = a.has("once"), d = a.has("reverse"), f = a.has("queue"), u = n || "";
      let h = "click";
      a.has("mouseenter") ? h = "mouseenter" : a.has("click") && (h = "click");
      let p = null, g = [], w = !1, m = !1, E = !1;
      function S() {
        const x = r(i);
        return Array.isArray(x) ? x : x && typeof x == "object" ? [x] : [];
      }
      function b() {
        const x = e.closest("[x-data]");
        return x ? t.$data(x) : null;
      }
      function A(x, y = !1) {
        const X = b();
        if (!X?.timeline) return Promise.resolve();
        const _ = X.timeline();
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
      function T(x = !1) {
        if (c && m) return;
        m = !0;
        const y = S();
        if (y.length === 0) return;
        const X = () => A(y, x);
        f ? (g.push(X), M()) : (p?.stop(), p = null, g = [], w = !1, X());
      }
      async function M() {
        if (!w) {
          for (w = !0; g.length > 0; )
            await g.shift()();
          w = !1;
        }
      }
      if (u) {
        s(() => {
          const x = S(), y = b();
          y?.registerAnimation && y.registerAnimation(u, x);
        }), l(() => {
          const x = b();
          x?.unregisterAnimation && x.unregisterAnimation(u);
        });
        return;
      }
      const v = () => {
        d && h === "click" ? (T(E), E = !E) : T(!1);
      };
      e.addEventListener(h, v);
      let C = null, $ = null;
      d && h !== "click" && ($ = jp[h] ?? null, $ && (C = () => T(!0), e.addEventListener($, C))), l(() => {
        p?.stop(), e.removeEventListener(h, v), $ && C && e.removeEventListener($, C);
      });
    }
  );
}
function Zp(t, e, n, o, i) {
  const r = e.position?.x ?? t.position.x, s = e.position?.y ?? t.position.y, l = t.dimensions?.width ?? ve, a = t.dimensions?.height ?? _e, c = r * n.zoom + n.x, d = s * n.zoom + n.y, f = (r + l) * n.zoom + n.x, u = (s + a) * n.zoom + n.y;
  return f > 0 && c < o && u > 0 && d < i;
}
function Gp(t, e, n, o, i) {
  const r = t.nodes;
  if (!r || r.length === 0) return !1;
  for (const s of r) {
    const l = e.getNode?.(s) ?? e.nodes?.find((a) => a.id === s);
    if (l && !Zp(l, t, n, o, i))
      return !0;
  }
  return !1;
}
function Kp(t) {
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
        const S = E.timeline(), b = m.speed ?? 1, A = m.autoFitView === !0, T = m.fitViewPadding ?? 0.1, M = E.viewport, v = E.getContainerDimensions?.();
        for (const C of w) {
          const $ = b !== 1 ? {
            ...C,
            duration: C.duration !== void 0 ? C.duration / b : void 0,
            delay: C.delay !== void 0 ? C.delay / b : void 0
          } : C;
          if ($.parallel) {
            const x = $.parallel.map(
              (y) => b !== 1 ? {
                ...y,
                duration: y.duration !== void 0 ? y.duration / b : void 0,
                delay: y.delay !== void 0 ? y.delay / b : void 0
              } : y
            );
            S.parallel(x);
          } else if (A && M && v && Gp($, E, M, v.width, v.height)) {
            const x = {
              fitView: !0,
              fitViewPadding: T,
              duration: $.duration,
              easing: $.easing
            };
            S.parallel([$, x]);
          } else
            S.step($);
        }
        if (m.lock && S.lock(!0), m.loop !== void 0 && m.loop !== !1) {
          const C = m.loop === !0 ? 0 : m.loop;
          S.loop(C);
        }
        return m.respectReducedMotion !== void 0 && S.respectReducedMotion(m.respectReducedMotion), l = S, d = "playing", c = !0, S.play().then(() => {
          l === S && (l = null, d = "idle", c = !1);
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
          const S = m.slice(Math.max(s, f));
          f = m.length, S.length > 0 && E && (a.push(...S), p(w));
        } else
          f = m.length;
      }), r(() => {
        l?.stop(), delete e.__timeline;
      });
    }
  );
}
function Jp(t) {
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
function Qp(t) {
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
function bo(t) {
  for (; t.firstChild; ) t.removeChild(t.firstChild);
}
function eg(t) {
  t.directive("flow-schema", (e, n, { evaluate: o, effect: i, cleanup: r }) => {
    const s = e, l = () => {
      try {
        return o("node");
      } catch {
        return null;
      }
    };
    s.classList.add("flow-schema-node");
    const a = () => {
      const d = l()?.data;
      if (!d) {
        bo(s);
        return;
      }
      const f = typeof d.label == "string" ? d.label : "", u = Array.isArray(d.fields) ? d.fields : [];
      bo(s);
      const h = document.createElement("div");
      h.className = "flow-schema-header", h.textContent = f, s.appendChild(h);
      const p = document.createElement("div");
      p.className = "flow-schema-body";
      for (const g of u)
        p.appendChild(c(g));
      s.appendChild(p), t.initTree(p);
    }, c = (d) => {
      const f = document.createElement("div");
      f.className = "flow-schema-row", f.dataset.flowSchemaField = d.name, d.key === "primary" && f.classList.add("flow-schema-row--pk"), d.key === "foreign" && f.classList.add("flow-schema-row--fk"), d.required && f.classList.add("flow-schema-row--required");
      const u = document.createElement("div");
      if (u.className = "flow-schema-handle flow-schema-handle--target", u.setAttribute("x-flow-handle:target.left", JSON.stringify(d.name)), f.appendChild(u), d.icon) {
        const E = document.createElement("span");
        E.className = "flow-schema-row-icon", E.textContent = d.icon, f.appendChild(E);
      }
      const h = document.createElement("span");
      h.className = "flow-schema-row-name", h.textContent = d.name, f.appendChild(h);
      const p = document.createElement("span");
      p.className = "flow-schema-row-type", p.textContent = d.type, f.appendChild(p);
      const g = document.createElement("div");
      g.className = "flow-schema-handle flow-schema-handle--source", g.setAttribute("x-flow-handle:source.right", JSON.stringify(d.name)), f.appendChild(g);
      const w = document.createElement("div");
      w.className = "flow-schema-handle flow-schema-handle--target flow-schema-handle--mirror", w.setAttribute("x-flow-handle:target.right", JSON.stringify(d.name)), f.appendChild(w);
      const m = document.createElement("div");
      return m.className = "flow-schema-handle flow-schema-handle--source flow-schema-handle--mirror", m.setAttribute("x-flow-handle:source.left", JSON.stringify(d.name)), f.appendChild(m), f;
    };
    i(() => {
      const d = l()?.data;
      d?.label;
      const f = d?.fields;
      if (Array.isArray(f))
        for (const u of f)
          u.name, u.type, u.key, u.required, u.icon;
      a();
    }), r(() => {
      bo(s), s.classList.remove("flow-schema-node");
    });
  });
}
function tg(t) {
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
function ng(t) {
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
const og = ["perf", "events", "viewport", "state", "activity"], _s = ["fps", "memory", "counts", "visible"], bs = 30;
function ig(t, e) {
  if (t && typeof t == "object" && Object.keys(t).length > 0)
    return t;
  const n = e.filter((i) => og.includes(i));
  if (n.length === 0)
    return { perf: !0, events: !0, viewport: !0, state: !0, activity: !0 };
  const o = {};
  for (const i of n)
    o[i] = !0;
  return o;
}
function sg(t) {
  return t.perf ? t.perf === !0 ? [..._s] : t.perf.filter((e) => _s.includes(e)) : [];
}
function rg(t) {
  return t.events ? t.events === !0 ? bs : t.events.max ?? bs : 0;
}
function jt(t, e) {
  const n = document.createElement("div");
  n.className = `flow-devtools-section ${e}`;
  const o = document.createElement("div");
  o.className = "flow-devtools-section-title", o.textContent = t, n.appendChild(o);
  const i = document.createElement("div");
  return i.className = "flow-devtools-section-content", n.appendChild(i), { wrapper: n, content: i };
}
function He(t, e) {
  const n = document.createElement("div");
  n.className = `flow-devtools-row ${e}`;
  const o = document.createElement("span");
  o.className = "flow-devtools-label", o.textContent = t;
  const i = document.createElement("span");
  return i.className = "flow-devtools-value", i.textContent = "—", n.appendChild(o), n.appendChild(i), { row: n, valueEl: i };
}
function ag(t) {
  t.directive(
    "flow-devtools",
    (e, { expression: n, modifiers: o }, { evaluate: i, effect: r, cleanup: s }) => {
      let l = null;
      if (n)
        try {
          l = i(n);
        } catch {
        }
      const a = ig(l, o), c = e.closest("[x-data]");
      if (!c) return;
      const d = e.closest(".flow-container");
      if (!d) return;
      e.classList.add("flow-devtools", "canvas-overlay"), e.setAttribute("data-flow-devtools", "");
      const f = (Z) => Z.stopPropagation();
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
        w = !w, g.style.display = w ? "" : "none", u.title = w ? "Collapse" : "Devtools", w ? ie() : K();
      };
      u.addEventListener("click", m);
      const E = sg(a);
      let S = null, b = null, A = null, T = null, M = null;
      if (E.length > 0) {
        const { wrapper: Z, content: j } = jt("Performance", "flow-devtools-perf");
        if (E.includes("fps")) {
          const { row: R, valueEl: G } = He("FPS", "flow-devtools-fps");
          S = G, j.appendChild(R);
        }
        if (E.includes("memory")) {
          const { row: R, valueEl: G } = He("Memory", "flow-devtools-memory");
          b = G, j.appendChild(R);
        }
        if (E.includes("counts")) {
          const R = He("Nodes", "flow-devtools-counts");
          A = R.valueEl, j.appendChild(R.row);
          const G = He("Edges", "flow-devtools-counts");
          T = G.valueEl, j.appendChild(G.row);
        }
        if (E.includes("visible")) {
          const { row: R, valueEl: G } = He("Visible", "flow-devtools-visible");
          M = G, j.appendChild(R);
        }
        g.appendChild(Z);
      }
      const v = rg(a);
      let C = null;
      if (v > 0) {
        const { wrapper: Z, content: j } = jt("Events", "flow-devtools-events"), R = document.createElement("button");
        R.className = "flow-devtools-clear-btn nopan", R.textContent = "Clear", R.addEventListener("click", () => {
          C && (C.textContent = ""), ae.length = 0;
        }), Z.querySelector(".flow-devtools-section-title").appendChild(R), C = document.createElement("div"), C.className = "flow-devtools-event-list", j.appendChild(C), g.appendChild(Z);
      }
      let $ = null, x = null, y = null;
      if (a.viewport) {
        const { wrapper: Z, content: j } = jt("Viewport", "flow-devtools-viewport"), R = He("X", "flow-devtools-vp-x");
        $ = R.valueEl, j.appendChild(R.row);
        const G = He("Y", "flow-devtools-vp-y");
        x = G.valueEl, j.appendChild(G.row);
        const Y = He("Zoom", "flow-devtools-vp-zoom");
        y = Y.valueEl, j.appendChild(Y.row), g.appendChild(Z);
      }
      let X = null;
      if (a.state) {
        const { wrapper: Z, content: j } = jt("Selection", "flow-devtools-state");
        X = document.createElement("div"), X.className = "flow-devtools-state-content", X.textContent = "No selection", j.appendChild(X), g.appendChild(Z);
      }
      let _ = null, L = null, N = null, B = null;
      if (a.activity) {
        const { wrapper: Z, content: j } = jt("Activity", "flow-devtools-activity"), R = He("Animations", "flow-devtools-anim");
        _ = R.valueEl, j.appendChild(R.row);
        const G = He("Particles", "flow-devtools-particles");
        L = G.valueEl, j.appendChild(G.row);
        const Y = He("Follow", "flow-devtools-follow");
        N = Y.valueEl, j.appendChild(Y.row);
        const H = He("Timelines", "flow-devtools-timelines");
        B = H.valueEl, j.appendChild(H.row), g.appendChild(Z);
      }
      let W = null, P = !1, k = 0, I = performance.now();
      const te = !!(S || b), se = () => {
        if (!P) return;
        k++;
        const Z = performance.now();
        Z - I >= 1e3 && (S && (S.textContent = String(Math.round(k * 1e3 / (Z - I)))), k = 0, I = Z, b && performance.memory && (b.textContent = Math.round(performance.memory.usedJSHeapSize / 1048576) + " MB")), W = requestAnimationFrame(se);
      }, ie = () => {
        !te || P || (P = !0, k = 0, I = performance.now(), W = requestAnimationFrame(se));
      }, K = () => {
        P = !1, W !== null && (cancelAnimationFrame(W), W = null);
      }, ae = [], de = [
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
      let le = null;
      if (v > 0 && C) {
        le = (Z) => {
          const j = Z, R = j.type.replace("flow-", "");
          let G = "";
          try {
            G = j.detail ? JSON.stringify(j.detail).slice(0, 80) : "";
          } catch {
            G = "[circular]";
          }
          ae.unshift({ name: R, time: Date.now(), detail: G });
          const Y = C, H = document.createElement("div");
          H.className = "flow-devtools-event-entry";
          const D = document.createElement("span");
          D.className = "flow-devtools-event-name", D.textContent = R;
          const Q = document.createElement("span");
          Q.className = "flow-devtools-event-age", Q.textContent = "now";
          const U = document.createElement("span");
          for (U.className = "flow-devtools-event-detail", U.textContent = G, H.appendChild(D), H.appendChild(Q), H.appendChild(U), Y.prepend(H); Y.children.length > v; )
            Y.removeChild(Y.lastChild), ae.pop();
        };
        for (const Z of de)
          d.addEventListener(Z, le);
      }
      r(() => {
        const Z = t.$data(c);
        if (Z) {
          if (A && (A.textContent = String(Z.nodes?.length ?? 0)), T && (T.textContent = String(Z.edges?.length ?? 0)), M && Z._getVisibleNodeIds && (M.textContent = String(Z._getVisibleNodeIds().size)), $ && Z.viewport && ($.textContent = Math.round(Z.viewport.x).toString()), x && Z.viewport && (x.textContent = Math.round(Z.viewport.y).toString()), y && Z.viewport && (y.textContent = Z.viewport.zoom.toFixed(2)), X) {
            const j = Z.selectedNodes, R = Z.selectedEdges;
            if (!((j?.size ?? 0) > 0 || (R?.size ?? 0) > 0))
              X.textContent = "No selection";
            else {
              if (X.textContent = "", j && j.size > 0)
                for (const Y of j) {
                  const H = Z.getNode?.(Y);
                  if (!H) continue;
                  const D = document.createElement("pre");
                  D.className = "flow-devtools-json", D.textContent = JSON.stringify({ id: H.id, position: H.position, data: H.data }, null, 2), X.appendChild(D);
                }
              if (R && R.size > 0)
                for (const Y of R) {
                  const H = Z.edges?.find((Q) => Q.id === Y);
                  if (!H) continue;
                  const D = document.createElement("pre");
                  D.className = "flow-devtools-json", D.textContent = JSON.stringify({ id: H.id, source: H.source, target: H.target, type: H.type }, null, 2), X.appendChild(D);
                }
            }
          }
          if (_) {
            const j = Z._animator?._groups?.size ?? 0;
            _.textContent = String(j);
          }
          L && (L.textContent = String(Z._activeParticles?.size ?? 0)), N && (N.textContent = Z._followHandle ? "Active" : "Idle"), B && (B.textContent = String(Z._activeTimelines?.size ?? 0));
        }
      }), s(() => {
        if (K(), u.removeEventListener("click", m), le)
          for (const Z of de)
            d.removeEventListener(Z, le);
        e.removeEventListener("wheel", f), e.textContent = "", S = null, b = null, A = null, T = null, M = null, C = null, $ = null, x = null, y = null, X = null, _ = null, L = null, N = null, B = null;
      });
    }
  );
}
const lg = {
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
function cg(t) {
  return lg[t] ?? null;
}
function dg(t) {
  t.directive(
    "flow-action",
    (e, { value: n, expression: o }, { evaluate: i, effect: r, cleanup: s }) => {
      const a = cg(n);
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
function ug(t, e) {
  if (t !== "node" && t !== "row") return null;
  const n = e.includes("clear");
  return { type: t, isClear: n };
}
const xo = /* @__PURE__ */ new WeakMap();
function fg(t) {
  t.directive(
    "flow-filter",
    (e, { value: n, expression: o, modifiers: i }, { evaluate: r, effect: s, cleanup: l }) => {
      const a = ug(n, i);
      if (!a) return;
      const c = e.closest("[data-flow-canvas]");
      if (!c) return;
      const d = t.$data(c);
      if (!d) return;
      let f = null;
      const u = () => {
        if (a.isClear) {
          if (a.type === "node")
            d.clearNodeFilter(), xo.set(c, null);
          else
            for (const h of d.nodes)
              h.rowFilter && h.rowFilter !== "all" && d.setRowFilter(h.id, "all");
          return;
        }
        if (a.type === "node" && o)
          f = r(`[${o}]`)[0], d.setNodeFilter(f), xo.set(c, f);
        else if (a.type === "row" && o) {
          const h = r(o);
          d.setRowFilter(h.node, h.predicate);
        }
      };
      e.addEventListener("click", u), e.style.cursor = "pointer", a.type === "node" && !a.isClear && s(() => {
        d.nodes.length;
        const h = xo.get(c) === f && f !== null;
        e.classList.toggle("flow-filter-active", h), e.setAttribute("aria-pressed", String(h));
      }), l(() => {
        e.removeEventListener("click", u);
      });
    }
  );
}
function hg(t) {
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
function pg(t) {
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
        const h = i(n), p = hg(h);
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
function gg(t, e) {
  return t !== "save" && t !== "restore" ? null : { action: t, persist: e.includes("persist") };
}
const hi = /* @__PURE__ */ new Map();
function mg(t, e) {
  hi.set(t, e);
}
function yg(t) {
  return hi.get(t) ?? null;
}
function wg(t) {
  return hi.has(t);
}
function Eo(t) {
  return `alpineflow-snapshot-${t}`;
}
function vg(t) {
  t.directive(
    "flow-snapshot",
    (e, { value: n, expression: o, modifiers: i }, { evaluate: r, effect: s, cleanup: l }) => {
      const a = gg(n, i);
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
            a.persist ? localStorage.setItem(Eo(u), JSON.stringify(h)) : mg(u, h);
          } else {
            let h = null;
            if (a.persist) {
              const p = localStorage.getItem(Eo(u));
              if (p)
                try {
                  h = JSON.parse(p);
                } catch {
                }
            } else
              h = yg(u);
            h && d.fromObject(h);
          }
      };
      e.addEventListener("click", f), a.action === "restore" && s(() => {
        if (!o) return;
        const u = r(o);
        if (!u) return;
        let h;
        a.persist ? h = localStorage.getItem(Eo(u)) !== null : (d.nodes.length, h = wg(u)), e.disabled = !h, e.setAttribute("aria-disabled", String(!h));
      }), l(() => {
        e.removeEventListener("click", f);
      });
    }
  );
}
function _g(t) {
  const e = document.createElement("div");
  e.className = "flow-loading-indicator";
  const n = document.createElement("div");
  n.className = "flow-loading-indicator-node";
  const o = document.createElement("div");
  return o.className = "flow-loading-indicator-text", o.textContent = t ?? "Loading…", e.appendChild(n), e.appendChild(o), e;
}
function bg(t) {
  t.directive(
    "flow-loading",
    (e, { modifiers: n }, { effect: o, cleanup: i }) => {
      const r = e.closest("[data-flow-canvas]");
      if (!r) return;
      const s = t.$data(r);
      if (!s) return;
      e.classList.add("flow-loading-overlay"), e.childElementCount > 0 || e.textContent.trim().length > 0 || e.appendChild(_g(s._loadingText));
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
function xg(t) {
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
        if (!d.edges.some((C) => C.id === a)) {
          e.removeEventListener("pointerdown", u), e.removeEventListener("click", h), e.classList.remove("flow-edge-toolbar"), e.remove();
          return;
        }
        const w = d.viewport?.zoom || 1, m = parseInt(e.getAttribute("data-flow-offset") ?? String(g), 10);
        let E = 0.5;
        if (n) {
          const C = i(n);
          typeof C == "number" && (E = C);
        }
        const S = l.querySelectorAll("path"), b = S.length > 1 ? S[1] : S[0];
        if (!b) return;
        const A = b.getTotalLength?.();
        if (!A) return;
        const T = b.getPointAtLength(A * Math.max(0, Math.min(1, E))), M = m / w, v = p ? M : -M;
        e.style.left = `${T.x}px`, e.style.top = `${T.y + v}px`, e.style.transformOrigin = "0 0", e.style.transform = `scale(${1 / w}) translate(-50%, ${p ? "0%" : "-100%"})`;
      }), s(() => {
        e.removeEventListener("pointerdown", u), e.removeEventListener("click", h), e.classList.remove("flow-edge-toolbar"), e.remove();
      });
    }
  );
}
function Eg(t) {
  t.magic("flow", (e) => {
    const n = e.closest("[data-flow-canvas]");
    return n ? t.$data(n) : (console.warn("[alpinejs-flow] $flow used outside of a flowCanvas context"), {});
  });
}
function Sg(t) {
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
function $m(t, e, n) {
  const o = n?.defaultDimensions?.width ?? ve, i = n?.defaultDimensions?.height ?? _e, r = n?.padding ?? 20, s = n?.flowId ?? "ssr", a = t.filter((m) => !m.hidden).map((m) => ({
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
      style: typeof m.style == "string" ? m.style : Object.entries(m.style).map(([E, S]) => `${E}:${S}`).join(";")
    } : {},
    data: m.data ?? {}
  })), f = e.filter((m) => !m.hidden), u = [], h = /* @__PURE__ */ new Map();
  for (const m of f) {
    const E = c.get(m.source), S = c.get(m.target);
    if (!E || !S)
      continue;
    let b, A;
    try {
      const $ = Gn(
        m,
        E,
        S,
        E.sourcePosition ?? "bottom",
        S.targetPosition ?? "top"
      );
      b = $.path, A = $.labelPosition;
    } catch {
      continue;
    }
    let T, M;
    if (m.markerStart) {
      const $ = ln(m.markerStart), x = cn($, s);
      h.has(x) || h.set(x, Yn($, x)), T = `url(#${x})`;
    }
    if (m.markerEnd) {
      const $ = ln(m.markerEnd), x = cn($, s);
      h.has(x) || h.set(x, Yn($, x)), M = `url(#${x})`;
    }
    let v, C;
    if (m.label)
      if (A)
        v = A.x, C = A.y;
      else {
        const $ = E.position.x + E.dimensions.width / 2, x = E.position.y + E.dimensions.height / 2, y = S.position.x + S.dimensions.width / 2, X = S.position.y + S.dimensions.height / 2;
        v = ($ + y) / 2, C = (x + X) / 2;
      }
    u.push({
      id: m.id,
      source: m.source,
      target: m.target,
      pathD: b,
      ...T ? { markerStart: T } : {},
      ...M ? { markerEnd: M } : {},
      ...m.class ? { class: m.class } : {},
      ...m.label ? { label: m.label } : {},
      ...v !== void 0 ? { labelX: v } : {},
      ...C !== void 0 ? { labelY: C } : {}
    });
  }
  const p = Array.from(h.values()).join(`
`);
  let g, w;
  if (a.length === 0)
    g = { x: 0, y: 0, width: 0, height: 0 }, w = { x: 0, y: 0, zoom: 1 };
  else {
    const m = Dt(a);
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
const xs = /* @__PURE__ */ new WeakSet();
function Im(t) {
  xs.has(t) || (xs.add(t), oa(t), Sg(t), rp(t), wp(t), of(t), Zu(t), Gu(t), Ku(t), tp(t), xp(t), Pp(t), kp(t), Mp(t), Tp(t), Bp(t), qp(t), Wp(t), Up(t), Kp(t), Jp(t), Qp(t), tg(t), ng(t), ag(t), dg(t), fg(t), pg(t), vg(t), bg(t), xg(t), eg(t), Eg(t));
}
function Cg(t) {
  return t.replace(/\s+(?:@|:|x-)[\w.:-]*="[^"]*"/g, "").replace(/\s+externalResourcesRequired="[^"]*"/g, "");
}
function Pg(t, e, n, o) {
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
async function kg(t, e, n, o, i = {}) {
  let r;
  try {
    ({ toSvg: r } = await Promise.resolve().then(() => Sm));
  } catch {
    throw new Error("toImage() requires html-to-image. Install it with: npm install html-to-image");
  }
  const s = i.scope ?? "all", l = t.getBoundingClientRect(), a = s === "viewport" ? l.width : i.width ?? 1920, c = s === "viewport" ? l.height : i.height ?? 1080, d = i.background ?? (getComputedStyle(t).getPropertyValue("--flow-bg-color").trim() || "#ffffff"), f = e.style.transform, u = e.style.width, h = e.style.height, p = t.style.width, g = t.style.height, w = t.style.overflow, m = [];
  try {
    if (s === "all") {
      const $ = t.querySelectorAll("[data-flow-culled]");
      for (const L of $)
        L.style.display = "", m.push(L);
      const x = n.filter((L) => !L.hidden), y = Dt(x), X = i.padding ?? 0.1, _ = Bn(
        y,
        a,
        c,
        0.1,
        // minZoom
        2,
        // maxZoom
        X
      );
      e.style.transform = `translate(${_.x}px, ${_.y}px) scale(${_.zoom})`, e.style.width = `${a}px`, e.style.height = `${c}px`;
    }
    t.style.width = `${a}px`, t.style.height = `${c}px`, t.style.overflow = "hidden", await new Promise(($) => requestAnimationFrame($));
    const E = i.includeOverlays, S = E === !0, b = typeof E == "object" ? E : {}, A = [
      ["canvas-overlay", S || (b.toolbar ?? !1)],
      ["flow-minimap", S || (b.minimap ?? !1)],
      ["flow-controls", S || (b.controls ?? !1)],
      ["flow-panel", S || (b.panels ?? !1)],
      ["flow-selection-box", !1]
    ], T = await r(t, {
      width: a,
      height: c,
      skipFonts: !0,
      filter: ($) => {
        if ($.classList) {
          for (const [x, y] of A)
            if ($.classList.contains(x) && !y) return !1;
        }
        return !0;
      }
    }), v = Cg(decodeURIComponent(T.substring("data:image/svg+xml;charset=utf-8,".length))), C = await Pg(v, a, c, d);
    if (i.filename) {
      const $ = document.createElement("a");
      $.download = i.filename, $.href = C, $.click();
    }
    return C;
  } finally {
    e.style.transform = f, e.style.width = u, e.style.height = h, t.style.width = p, t.style.height = g, t.style.overflow = w;
    for (const E of m)
      E.style.display = "none";
  }
}
const Lg = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  captureFlowImage: kg
}, Symbol.toStringTag, { value: "Module" }));
function Mg(t, e) {
  if (t.match(/^[a-z]+:\/\//i))
    return t;
  if (t.match(/^\/\//))
    return window.location.protocol + t;
  if (t.match(/^[a-z]+:/i))
    return t;
  const n = document.implementation.createHTMLDocument(), o = n.createElement("base"), i = n.createElement("a");
  return n.head.appendChild(o), n.body.appendChild(i), e && (o.href = e), i.href = t, i.href;
}
const Tg = /* @__PURE__ */ (() => {
  let t = 0;
  const e = () => (
    // eslint-disable-next-line no-bitwise
    `0000${(Math.random() * 36 ** 4 << 0).toString(36)}`.slice(-4)
  );
  return () => (t += 1, `u${e()}${t}`);
})();
function ut(t) {
  const e = [];
  for (let n = 0, o = t.length; n < o; n++)
    e.push(t[n]);
  return e;
}
let St = null;
function Wr(t = {}) {
  return St || (t.includeStyleProperties ? (St = t.includeStyleProperties, St) : (St = ut(window.getComputedStyle(document.documentElement)), St));
}
function Qn(t, e) {
  const o = (t.ownerDocument.defaultView || window).getComputedStyle(t).getPropertyValue(e);
  return o ? parseFloat(o.replace("px", "")) : 0;
}
function Ag(t) {
  const e = Qn(t, "border-left-width"), n = Qn(t, "border-right-width");
  return t.clientWidth + e + n;
}
function Ng(t) {
  const e = Qn(t, "border-top-width"), n = Qn(t, "border-bottom-width");
  return t.clientHeight + e + n;
}
function pi(t, e = {}) {
  const n = e.width || Ag(t), o = e.height || Ng(t);
  return { width: n, height: o };
}
function $g() {
  let t, e;
  try {
    e = process;
  } catch {
  }
  const n = e && e.env ? e.env.devicePixelRatio : null;
  return n && (t = parseInt(n, 10), Number.isNaN(t) && (t = 1)), t || window.devicePixelRatio || 1;
}
const Ne = 16384;
function Ig(t) {
  (t.width > Ne || t.height > Ne) && (t.width > Ne && t.height > Ne ? t.width > t.height ? (t.height *= Ne / t.width, t.width = Ne) : (t.width *= Ne / t.height, t.height = Ne) : t.width > Ne ? (t.height *= Ne / t.width, t.width = Ne) : (t.width *= Ne / t.height, t.height = Ne));
}
function Dg(t, e = {}) {
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
function eo(t) {
  return new Promise((e, n) => {
    const o = new Image();
    o.onload = () => {
      o.decode().then(() => {
        requestAnimationFrame(() => e(o));
      });
    }, o.onerror = n, o.crossOrigin = "anonymous", o.decoding = "async", o.src = t;
  });
}
async function Rg(t) {
  return Promise.resolve().then(() => new XMLSerializer().serializeToString(t)).then(encodeURIComponent).then((e) => `data:image/svg+xml;charset=utf-8,${e}`);
}
async function Hg(t, e, n) {
  const o = "http://www.w3.org/2000/svg", i = document.createElementNS(o, "svg"), r = document.createElementNS(o, "foreignObject");
  return i.setAttribute("width", `${e}`), i.setAttribute("height", `${n}`), i.setAttribute("viewBox", `0 0 ${e} ${n}`), r.setAttribute("width", "100%"), r.setAttribute("height", "100%"), r.setAttribute("x", "0"), r.setAttribute("y", "0"), r.setAttribute("externalResourcesRequired", "true"), i.appendChild(r), r.appendChild(t), Rg(i);
}
const Te = (t, e) => {
  if (t instanceof e)
    return !0;
  const n = Object.getPrototypeOf(t);
  return n === null ? !1 : n.constructor.name === e.name || Te(n, e);
};
function Fg(t) {
  const e = t.getPropertyValue("content");
  return `${t.cssText} content: '${e.replace(/'|"/g, "")}';`;
}
function zg(t, e) {
  return Wr(e).map((n) => {
    const o = t.getPropertyValue(n), i = t.getPropertyPriority(n);
    return `${n}: ${o}${i ? " !important" : ""};`;
  }).join(" ");
}
function Og(t, e, n, o) {
  const i = `.${t}:${e}`, r = n.cssText ? Fg(n) : zg(n, o);
  return document.createTextNode(`${i}{${r}}`);
}
function Es(t, e, n, o) {
  const i = window.getComputedStyle(t, n), r = i.getPropertyValue("content");
  if (r === "" || r === "none")
    return;
  const s = Tg();
  try {
    e.className = `${e.className} ${s}`;
  } catch {
    return;
  }
  const l = document.createElement("style");
  l.appendChild(Og(s, n, i, o)), e.appendChild(l);
}
function Vg(t, e, n) {
  Es(t, e, ":before", n), Es(t, e, ":after", n);
}
const Ss = "application/font-woff", Cs = "image/jpeg", Bg = {
  woff: Ss,
  woff2: Ss,
  ttf: "application/font-truetype",
  eot: "application/vnd.ms-fontobject",
  png: "image/png",
  jpg: Cs,
  jpeg: Cs,
  gif: "image/gif",
  tiff: "image/tiff",
  svg: "image/svg+xml",
  webp: "image/webp"
};
function qg(t) {
  const e = /\.([^./]*?)$/g.exec(t);
  return e ? e[1] : "";
}
function gi(t) {
  const e = qg(t).toLowerCase();
  return Bg[e] || "";
}
function Xg(t) {
  return t.split(/,/)[1];
}
function Wo(t) {
  return t.search(/^(data:)/) !== -1;
}
function Yg(t, e) {
  return `data:${e};base64,${t}`;
}
async function jr(t, e, n) {
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
const So = {};
function Wg(t, e, n) {
  let o = t.replace(/\?.*/, "");
  return n && (o = t), /ttf|otf|eot|woff2?/i.test(o) && (o = o.replace(/.*\//, "")), e ? `[${e}]${o}` : o;
}
async function mi(t, e, n) {
  const o = Wg(t, e, n.includeQueryParams);
  if (So[o] != null)
    return So[o];
  n.cacheBust && (t += (/\?/.test(t) ? "&" : "?") + (/* @__PURE__ */ new Date()).getTime());
  let i;
  try {
    const r = await jr(t, n.fetchRequestInit, ({ res: s, result: l }) => (e || (e = s.headers.get("Content-Type") || ""), Xg(l)));
    i = Yg(r, e);
  } catch (r) {
    i = n.imagePlaceholder || "";
    let s = `Failed to fetch resource: ${t}`;
    r && (s = typeof r == "string" ? r : r.message), s && console.warn(s);
  }
  return So[o] = i, i;
}
async function jg(t) {
  const e = t.toDataURL();
  return e === "data:," ? t.cloneNode(!1) : eo(e);
}
async function Ug(t, e) {
  if (t.currentSrc) {
    const r = document.createElement("canvas"), s = r.getContext("2d");
    r.width = t.clientWidth, r.height = t.clientHeight, s?.drawImage(t, 0, 0, r.width, r.height);
    const l = r.toDataURL();
    return eo(l);
  }
  const n = t.poster, o = gi(n), i = await mi(n, o, e);
  return eo(i);
}
async function Zg(t, e) {
  var n;
  try {
    if (!((n = t?.contentDocument) === null || n === void 0) && n.body)
      return await ro(t.contentDocument.body, e, !0);
  } catch {
  }
  return t.cloneNode(!1);
}
async function Gg(t, e) {
  return Te(t, HTMLCanvasElement) ? jg(t) : Te(t, HTMLVideoElement) ? Ug(t, e) : Te(t, HTMLIFrameElement) ? Zg(t, e) : t.cloneNode(Ur(t));
}
const Kg = (t) => t.tagName != null && t.tagName.toUpperCase() === "SLOT", Ur = (t) => t.tagName != null && t.tagName.toUpperCase() === "SVG";
async function Jg(t, e, n) {
  var o, i;
  if (Ur(e))
    return e;
  let r = [];
  return Kg(t) && t.assignedNodes ? r = ut(t.assignedNodes()) : Te(t, HTMLIFrameElement) && (!((o = t.contentDocument) === null || o === void 0) && o.body) ? r = ut(t.contentDocument.body.childNodes) : r = ut(((i = t.shadowRoot) !== null && i !== void 0 ? i : t).childNodes), r.length === 0 || Te(t, HTMLVideoElement) || await r.reduce((s, l) => s.then(() => ro(l, n)).then((a) => {
    a && e.appendChild(a);
  }), Promise.resolve()), e;
}
function Qg(t, e, n) {
  const o = e.style;
  if (!o)
    return;
  const i = window.getComputedStyle(t);
  i.cssText ? (o.cssText = i.cssText, o.transformOrigin = i.transformOrigin) : Wr(n).forEach((r) => {
    let s = i.getPropertyValue(r);
    r === "font-size" && s.endsWith("px") && (s = `${Math.floor(parseFloat(s.substring(0, s.length - 2))) - 0.1}px`), Te(t, HTMLIFrameElement) && r === "display" && s === "inline" && (s = "block"), r === "d" && e.getAttribute("d") && (s = `path(${e.getAttribute("d")})`), o.setProperty(r, s, i.getPropertyPriority(r));
  });
}
function em(t, e) {
  Te(t, HTMLTextAreaElement) && (e.innerHTML = t.value), Te(t, HTMLInputElement) && e.setAttribute("value", t.value);
}
function tm(t, e) {
  if (Te(t, HTMLSelectElement)) {
    const o = Array.from(e.children).find((i) => t.value === i.getAttribute("value"));
    o && o.setAttribute("selected", "");
  }
}
function nm(t, e, n) {
  return Te(e, Element) && (Qg(t, e, n), Vg(t, e, n), em(t, e), tm(t, e)), e;
}
async function om(t, e) {
  const n = t.querySelectorAll ? t.querySelectorAll("use") : [];
  if (n.length === 0)
    return t;
  const o = {};
  for (let r = 0; r < n.length; r++) {
    const l = n[r].getAttribute("xlink:href");
    if (l) {
      const a = t.querySelector(l), c = document.querySelector(l);
      !a && c && !o[l] && (o[l] = await ro(c, e, !0));
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
async function ro(t, e, n) {
  return !n && e.filter && !e.filter(t) ? null : Promise.resolve(t).then((o) => Gg(o, e)).then((o) => Jg(t, o, e)).then((o) => nm(t, o, e)).then((o) => om(o, e));
}
const Zr = /url\((['"]?)([^'"]+?)\1\)/g, im = /url\([^)]+\)\s*format\((["']?)([^"']+)\1\)/g, sm = /src:\s*(?:url\([^)]+\)\s*format\([^)]+\)[,;]\s*)+/g;
function rm(t) {
  const e = t.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1");
  return new RegExp(`(url\\(['"]?)(${e})(['"]?\\))`, "g");
}
function am(t) {
  const e = [];
  return t.replace(Zr, (n, o, i) => (e.push(i), n)), e.filter((n) => !Wo(n));
}
async function lm(t, e, n, o, i) {
  try {
    const r = n ? Mg(e, n) : e, s = gi(e);
    let l;
    return i || (l = await mi(r, s, o)), t.replace(rm(e), `$1${l}$3`);
  } catch {
  }
  return t;
}
function cm(t, { preferredFontFormat: e }) {
  return e ? t.replace(sm, (n) => {
    for (; ; ) {
      const [o, , i] = im.exec(n) || [];
      if (!i)
        return "";
      if (i === e)
        return `src: ${o};`;
    }
  }) : t;
}
function Gr(t) {
  return t.search(Zr) !== -1;
}
async function Kr(t, e, n) {
  if (!Gr(t))
    return t;
  const o = cm(t, n);
  return am(o).reduce((r, s) => r.then((l) => lm(l, s, e, n)), Promise.resolve(o));
}
async function Ct(t, e, n) {
  var o;
  const i = (o = e.style) === null || o === void 0 ? void 0 : o.getPropertyValue(t);
  if (i) {
    const r = await Kr(i, null, n);
    return e.style.setProperty(t, r, e.style.getPropertyPriority(t)), !0;
  }
  return !1;
}
async function dm(t, e) {
  await Ct("background", t, e) || await Ct("background-image", t, e), await Ct("mask", t, e) || await Ct("-webkit-mask", t, e) || await Ct("mask-image", t, e) || await Ct("-webkit-mask-image", t, e);
}
async function um(t, e) {
  const n = Te(t, HTMLImageElement);
  if (!(n && !Wo(t.src)) && !(Te(t, SVGImageElement) && !Wo(t.href.baseVal)))
    return;
  const o = n ? t.src : t.href.baseVal, i = await mi(o, gi(o), e);
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
async function fm(t, e) {
  const o = ut(t.childNodes).map((i) => Jr(i, e));
  await Promise.all(o).then(() => t);
}
async function Jr(t, e) {
  Te(t, Element) && (await dm(t, e), await um(t, e), await fm(t, e));
}
function hm(t, e) {
  const { style: n } = t;
  e.backgroundColor && (n.backgroundColor = e.backgroundColor), e.width && (n.width = `${e.width}px`), e.height && (n.height = `${e.height}px`);
  const o = e.style;
  return o != null && Object.keys(o).forEach((i) => {
    n[i] = o[i];
  }), t;
}
const Ps = {};
async function ks(t) {
  let e = Ps[t];
  if (e != null)
    return e;
  const o = await (await fetch(t)).text();
  return e = { url: t, cssText: o }, Ps[t] = e, e;
}
async function Ls(t, e) {
  let n = t.cssText;
  const o = /url\(["']?([^"')]+)["']?\)/g, r = (n.match(/url\([^)]+\)/g) || []).map(async (s) => {
    let l = s.replace(o, "$1");
    return l.startsWith("https://") || (l = new URL(l, t.url).href), jr(l, e.fetchRequestInit, ({ result: a }) => (n = n.replace(s, `url(${a})`), [s, a]));
  });
  return Promise.all(r).then(() => n);
}
function Ms(t) {
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
async function pm(t, e) {
  const n = [], o = [];
  return t.forEach((i) => {
    if ("cssRules" in i)
      try {
        ut(i.cssRules || []).forEach((r, s) => {
          if (r.type === CSSRule.IMPORT_RULE) {
            let l = s + 1;
            const a = r.href, c = ks(a).then((d) => Ls(d, e)).then((d) => Ms(d).forEach((f) => {
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
        i.href != null && o.push(ks(i.href).then((l) => Ls(l, e)).then((l) => Ms(l).forEach((a) => {
          s.insertRule(a, s.cssRules.length);
        })).catch((l) => {
          console.error("Error loading remote stylesheet", l);
        })), console.error("Error inlining remote css file", r);
      }
  }), Promise.all(o).then(() => (t.forEach((i) => {
    if ("cssRules" in i)
      try {
        ut(i.cssRules || []).forEach((r) => {
          n.push(r);
        });
      } catch (r) {
        console.error(`Error while reading CSS rules from ${i.href}`, r);
      }
  }), n));
}
function gm(t) {
  return t.filter((e) => e.type === CSSRule.FONT_FACE_RULE).filter((e) => Gr(e.style.getPropertyValue("src")));
}
async function mm(t, e) {
  if (t.ownerDocument == null)
    throw new Error("Provided element is not within a Document");
  const n = ut(t.ownerDocument.styleSheets), o = await pm(n, e);
  return gm(o);
}
function Qr(t) {
  return t.trim().replace(/["']/g, "");
}
function ym(t) {
  const e = /* @__PURE__ */ new Set();
  function n(o) {
    (o.style.fontFamily || getComputedStyle(o).fontFamily).split(",").forEach((r) => {
      e.add(Qr(r));
    }), Array.from(o.children).forEach((r) => {
      r instanceof HTMLElement && n(r);
    });
  }
  return n(t), e;
}
async function ea(t, e) {
  const n = await mm(t, e), o = ym(t);
  return (await Promise.all(n.filter((r) => o.has(Qr(r.style.fontFamily))).map((r) => {
    const s = r.parentStyleSheet ? r.parentStyleSheet.href : null;
    return Kr(r.cssText, s, e);
  }))).join(`
`);
}
async function wm(t, e) {
  const n = e.fontEmbedCSS != null ? e.fontEmbedCSS : e.skipFonts ? null : await ea(t, e);
  if (n) {
    const o = document.createElement("style"), i = document.createTextNode(n);
    o.appendChild(i), t.firstChild ? t.insertBefore(o, t.firstChild) : t.appendChild(o);
  }
}
async function ta(t, e = {}) {
  const { width: n, height: o } = pi(t, e), i = await ro(t, e, !0);
  return await wm(i, e), await Jr(i, e), hm(i, e), await Hg(i, n, o);
}
async function mn(t, e = {}) {
  const { width: n, height: o } = pi(t, e), i = await ta(t, e), r = await eo(i), s = document.createElement("canvas"), l = s.getContext("2d"), a = e.pixelRatio || $g(), c = e.canvasWidth || n, d = e.canvasHeight || o;
  return s.width = c * a, s.height = d * a, e.skipAutoScale || Ig(s), s.style.width = `${c}`, s.style.height = `${d}`, e.backgroundColor && (l.fillStyle = e.backgroundColor, l.fillRect(0, 0, s.width, s.height)), l.drawImage(r, 0, 0, s.width, s.height), s;
}
async function vm(t, e = {}) {
  const { width: n, height: o } = pi(t, e);
  return (await mn(t, e)).getContext("2d").getImageData(0, 0, n, o).data;
}
async function _m(t, e = {}) {
  return (await mn(t, e)).toDataURL();
}
async function bm(t, e = {}) {
  return (await mn(t, e)).toDataURL("image/jpeg", e.quality || 1);
}
async function xm(t, e = {}) {
  const n = await mn(t, e);
  return await Dg(n);
}
async function Em(t, e = {}) {
  return ea(t, e);
}
const Sm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getFontEmbedCSS: Em,
  toBlob: xm,
  toCanvas: mn,
  toJpeg: bm,
  toPixelData: vm,
  toPng: _m,
  toSvg: ta
}, Symbol.toStringTag, { value: "Module" }));
export {
  vf as ComputeEngine,
  _u as FlowHistory,
  Qi as SHORTCUT_DEFAULTS,
  Lm as along,
  ju as areNodesConnected,
  xr as buildNodeMap,
  Sr as clampToExtent,
  po as clampToParent,
  $m as computeRenderPlan,
  os as computeValidationErrors,
  Er as computeZIndex,
  Im as default,
  Tm as drift,
  af as expandParentToFitChild,
  zo as getAbsolutePosition,
  nf as getAutoPanDelta,
  Wn as getBezierPath,
  Xu as getConnectedEdges,
  ct as getDescendantIds,
  gs as getEdgePosition,
  zr as getFloatingEdgeParams,
  Yu as getIncomers,
  ps as getNodeIntersection,
  Dt as getNodesBounds,
  qu as getNodesFullyInPolygon,
  gu as getNodesFullyInRect,
  Bu as getNodesInPolygon,
  pu as getNodesInRect,
  Ho as getOutgoers,
  Cm as getSimpleBezierPath,
  Nm as getSimpleFloatingPosition,
  un as getSmoothStepPath,
  tf as getStepPath,
  _r as getStraightPath,
  Bn as getViewportForBounds,
  rt as isConnectable,
  Ju as isDeletable,
  vr as isDraggable,
  Zi as isResizable,
  Fo as isSelectable,
  Ve as matchesKey,
  lt as matchesModifier,
  Pm as orbit,
  Mm as pendulum,
  ri as pointInPolygon,
  Vu as polygonIntersectsAABB,
  Mu as registerMarker,
  Qt as resolveChildValidation,
  sf as resolveShortcuts,
  dt as sortNodesTopological,
  Am as stagger,
  At as toAbsoluteNode,
  Un as toAbsoluteNodes,
  Lr as validateChildAdd,
  Zn as validateChildRemove,
  km as wave
};
//# sourceMappingURL=alpineflow.bundle.esm.js.map
