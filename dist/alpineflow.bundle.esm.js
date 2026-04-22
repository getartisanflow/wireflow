let To = null;
function ca(t) {
  To = t;
}
function ke() {
  if (!To)
    throw new Error("[AlpineFlow] Alpine not initialized. Ensure Alpine.plugin(AlpineFlow) was called.");
  return To;
}
var da = { value: () => {
} };
function ro() {
  for (var t = 0, e = arguments.length, n = {}, o; t < e; ++t) {
    if (!(o = arguments[t] + "") || o in n || /[\s.]/.test(o)) throw new Error("illegal type: " + o);
    n[o] = [];
  }
  return new An(n);
}
function An(t) {
  this._ = t;
}
function ua(t, e) {
  return t.trim().split(/^|\s+/).map(function(n) {
    var o = "", i = n.indexOf(".");
    if (i >= 0 && (o = n.slice(i + 1), n = n.slice(0, i)), n && !e.hasOwnProperty(n)) throw new Error("unknown type: " + n);
    return { type: n, name: o };
  });
}
An.prototype = ro.prototype = {
  constructor: An,
  on: function(t, e) {
    var n = this._, o = ua(t + "", n), i, r = -1, s = o.length;
    if (arguments.length < 2) {
      for (; ++r < s; ) if ((i = (t = o[r]).type) && (i = fa(n[i], t.name))) return i;
      return;
    }
    if (e != null && typeof e != "function") throw new Error("invalid callback: " + e);
    for (; ++r < s; )
      if (i = (t = o[r]).type) n[i] = Si(n[i], t.name, e);
      else if (e == null) for (i in n) n[i] = Si(n[i], t.name, null);
    return this;
  },
  copy: function() {
    var t = {}, e = this._;
    for (var n in e) t[n] = e[n].slice();
    return new An(t);
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
function fa(t, e) {
  for (var n = 0, o = t.length, i; n < o; ++n)
    if ((i = t[n]).name === e)
      return i.value;
}
function Si(t, e, n) {
  for (var o = 0, i = t.length; o < i; ++o)
    if (t[o].name === e) {
      t[o] = da, t = t.slice(0, o).concat(t.slice(o + 1));
      break;
    }
  return n != null && t.push({ name: e, value: n }), t;
}
var Ao = "http://www.w3.org/1999/xhtml";
const ki = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Ao,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function ao(t) {
  var e = t += "", n = e.indexOf(":");
  return n >= 0 && (e = t.slice(0, n)) !== "xmlns" && (t = t.slice(n + 1)), ki.hasOwnProperty(e) ? { space: ki[e], local: t } : t;
}
function ha(t) {
  return function() {
    var e = this.ownerDocument, n = this.namespaceURI;
    return n === Ao && e.documentElement.namespaceURI === Ao ? e.createElement(t) : e.createElementNS(n, t);
  };
}
function ga(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function Ds(t) {
  var e = ao(t);
  return (e.local ? ga : ha)(e);
}
function pa() {
}
function Qo(t) {
  return t == null ? pa : function() {
    return this.querySelector(t);
  };
}
function ma(t) {
  typeof t != "function" && (t = Qo(t));
  for (var e = this._groups, n = e.length, o = new Array(n), i = 0; i < n; ++i)
    for (var r = e[i], s = r.length, l = o[i] = new Array(s), a, c, d = 0; d < s; ++d)
      (a = r[d]) && (c = t.call(a, a.__data__, d, r)) && ("__data__" in a && (c.__data__ = a.__data__), l[d] = c);
  return new Re(o, this._parents);
}
function ya(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function wa() {
  return [];
}
function Rs(t) {
  return t == null ? wa : function() {
    return this.querySelectorAll(t);
  };
}
function va(t) {
  return function() {
    return ya(t.apply(this, arguments));
  };
}
function _a(t) {
  typeof t == "function" ? t = va(t) : t = Rs(t);
  for (var e = this._groups, n = e.length, o = [], i = [], r = 0; r < n; ++r)
    for (var s = e[r], l = s.length, a, c = 0; c < l; ++c)
      (a = s[c]) && (o.push(t.call(a, a.__data__, c, s)), i.push(a));
  return new Re(o, i);
}
function Hs(t) {
  return function() {
    return this.matches(t);
  };
}
function Fs(t) {
  return function(e) {
    return e.matches(t);
  };
}
var ba = Array.prototype.find;
function xa(t) {
  return function() {
    return ba.call(this.children, t);
  };
}
function Ea() {
  return this.firstElementChild;
}
function Ca(t) {
  return this.select(t == null ? Ea : xa(typeof t == "function" ? t : Fs(t)));
}
var Sa = Array.prototype.filter;
function ka() {
  return Array.from(this.children);
}
function Pa(t) {
  return function() {
    return Sa.call(this.children, t);
  };
}
function La(t) {
  return this.selectAll(t == null ? ka : Pa(typeof t == "function" ? t : Fs(t)));
}
function Ma(t) {
  typeof t != "function" && (t = Hs(t));
  for (var e = this._groups, n = e.length, o = new Array(n), i = 0; i < n; ++i)
    for (var r = e[i], s = r.length, l = o[i] = [], a, c = 0; c < s; ++c)
      (a = r[c]) && t.call(a, a.__data__, c, r) && l.push(a);
  return new Re(o, this._parents);
}
function Os(t) {
  return new Array(t.length);
}
function Ta() {
  return new Re(this._enter || this._groups.map(Os), this._parents);
}
function Hn(t, e) {
  this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = e;
}
Hn.prototype = {
  constructor: Hn,
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
function Aa(t) {
  return function() {
    return t;
  };
}
function Na(t, e, n, o, i, r) {
  for (var s = 0, l, a = e.length, c = r.length; s < c; ++s)
    (l = e[s]) ? (l.__data__ = r[s], o[s] = l) : n[s] = new Hn(t, r[s]);
  for (; s < a; ++s)
    (l = e[s]) && (i[s] = l);
}
function Ia(t, e, n, o, i, r, s) {
  var l, a, c = /* @__PURE__ */ new Map(), d = e.length, f = r.length, u = new Array(d), h;
  for (l = 0; l < d; ++l)
    (a = e[l]) && (u[l] = h = s.call(a, a.__data__, l, e) + "", c.has(h) ? i[l] = a : c.set(h, a));
  for (l = 0; l < f; ++l)
    h = s.call(t, r[l], l, r) + "", (a = c.get(h)) ? (o[l] = a, a.__data__ = r[l], c.delete(h)) : n[l] = new Hn(t, r[l]);
  for (l = 0; l < d; ++l)
    (a = e[l]) && c.get(u[l]) === a && (i[l] = a);
}
function $a(t) {
  return t.__data__;
}
function Da(t, e) {
  if (!arguments.length) return Array.from(this, $a);
  var n = e ? Ia : Na, o = this._parents, i = this._groups;
  typeof t != "function" && (t = Aa(t));
  for (var r = i.length, s = new Array(r), l = new Array(r), a = new Array(r), c = 0; c < r; ++c) {
    var d = o[c], f = i[c], u = f.length, h = Ra(t.call(d, d && d.__data__, c, o)), g = h.length, p = l[c] = new Array(g), y = s[c] = new Array(g), m = a[c] = new Array(u);
    n(d, f, p, y, m, h, e);
    for (var C = 0, T = 0, b, M; C < g; ++C)
      if (b = p[C]) {
        for (C >= T && (T = C + 1); !(M = y[T]) && ++T < g; ) ;
        b._next = M || null;
      }
  }
  return s = new Re(s, o), s._enter = l, s._exit = a, s;
}
function Ra(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function Ha() {
  return new Re(this._exit || this._groups.map(Os), this._parents);
}
function Fa(t, e, n) {
  var o = this.enter(), i = this, r = this.exit();
  return typeof t == "function" ? (o = t(o), o && (o = o.selection())) : o = o.append(t + ""), e != null && (i = e(i), i && (i = i.selection())), n == null ? r.remove() : n(r), o && i ? o.merge(i).order() : i;
}
function Oa(t) {
  for (var e = t.selection ? t.selection() : t, n = this._groups, o = e._groups, i = n.length, r = o.length, s = Math.min(i, r), l = new Array(i), a = 0; a < s; ++a)
    for (var c = n[a], d = o[a], f = c.length, u = l[a] = new Array(f), h, g = 0; g < f; ++g)
      (h = c[g] || d[g]) && (u[g] = h);
  for (; a < i; ++a)
    l[a] = n[a];
  return new Re(l, this._parents);
}
function za() {
  for (var t = this._groups, e = -1, n = t.length; ++e < n; )
    for (var o = t[e], i = o.length - 1, r = o[i], s; --i >= 0; )
      (s = o[i]) && (r && s.compareDocumentPosition(r) ^ 4 && r.parentNode.insertBefore(s, r), r = s);
  return this;
}
function Va(t) {
  t || (t = Ba);
  function e(f, u) {
    return f && u ? t(f.__data__, u.__data__) : !f - !u;
  }
  for (var n = this._groups, o = n.length, i = new Array(o), r = 0; r < o; ++r) {
    for (var s = n[r], l = s.length, a = i[r] = new Array(l), c, d = 0; d < l; ++d)
      (c = s[d]) && (a[d] = c);
    a.sort(e);
  }
  return new Re(i, this._parents).order();
}
function Ba(t, e) {
  return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function qa() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function Xa() {
  return Array.from(this);
}
function Ya() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var o = t[e], i = 0, r = o.length; i < r; ++i) {
      var s = o[i];
      if (s) return s;
    }
  return null;
}
function Wa() {
  let t = 0;
  for (const e of this) ++t;
  return t;
}
function ja() {
  return !this.node();
}
function Ua(t) {
  for (var e = this._groups, n = 0, o = e.length; n < o; ++n)
    for (var i = e[n], r = 0, s = i.length, l; r < s; ++r)
      (l = i[r]) && t.call(l, l.__data__, r, i);
  return this;
}
function Za(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function Ka(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Ga(t, e) {
  return function() {
    this.setAttribute(t, e);
  };
}
function Ja(t, e) {
  return function() {
    this.setAttributeNS(t.space, t.local, e);
  };
}
function Qa(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttribute(t) : this.setAttribute(t, n);
  };
}
function el(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, n);
  };
}
function tl(t, e) {
  var n = ao(t);
  if (arguments.length < 2) {
    var o = this.node();
    return n.local ? o.getAttributeNS(n.space, n.local) : o.getAttribute(n);
  }
  return this.each((e == null ? n.local ? Ka : Za : typeof e == "function" ? n.local ? el : Qa : n.local ? Ja : Ga)(n, e));
}
function zs(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function nl(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function ol(t, e, n) {
  return function() {
    this.style.setProperty(t, e, n);
  };
}
function il(t, e, n) {
  return function() {
    var o = e.apply(this, arguments);
    o == null ? this.style.removeProperty(t) : this.style.setProperty(t, o, n);
  };
}
function sl(t, e, n) {
  return arguments.length > 1 ? this.each((e == null ? nl : typeof e == "function" ? il : ol)(t, e, n ?? "")) : Ft(this.node(), t);
}
function Ft(t, e) {
  return t.style.getPropertyValue(e) || zs(t).getComputedStyle(t, null).getPropertyValue(e);
}
function rl(t) {
  return function() {
    delete this[t];
  };
}
function al(t, e) {
  return function() {
    this[t] = e;
  };
}
function ll(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? delete this[t] : this[t] = n;
  };
}
function cl(t, e) {
  return arguments.length > 1 ? this.each((e == null ? rl : typeof e == "function" ? ll : al)(t, e)) : this.node()[t];
}
function Vs(t) {
  return t.trim().split(/^|\s+/);
}
function ei(t) {
  return t.classList || new Bs(t);
}
function Bs(t) {
  this._node = t, this._names = Vs(t.getAttribute("class") || "");
}
Bs.prototype = {
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
function qs(t, e) {
  for (var n = ei(t), o = -1, i = e.length; ++o < i; ) n.add(e[o]);
}
function Xs(t, e) {
  for (var n = ei(t), o = -1, i = e.length; ++o < i; ) n.remove(e[o]);
}
function dl(t) {
  return function() {
    qs(this, t);
  };
}
function ul(t) {
  return function() {
    Xs(this, t);
  };
}
function fl(t, e) {
  return function() {
    (e.apply(this, arguments) ? qs : Xs)(this, t);
  };
}
function hl(t, e) {
  var n = Vs(t + "");
  if (arguments.length < 2) {
    for (var o = ei(this.node()), i = -1, r = n.length; ++i < r; ) if (!o.contains(n[i])) return !1;
    return !0;
  }
  return this.each((typeof e == "function" ? fl : e ? dl : ul)(n, e));
}
function gl() {
  this.textContent = "";
}
function pl(t) {
  return function() {
    this.textContent = t;
  };
}
function ml(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.textContent = e ?? "";
  };
}
function yl(t) {
  return arguments.length ? this.each(t == null ? gl : (typeof t == "function" ? ml : pl)(t)) : this.node().textContent;
}
function wl() {
  this.innerHTML = "";
}
function vl(t) {
  return function() {
    this.innerHTML = t;
  };
}
function _l(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.innerHTML = e ?? "";
  };
}
function bl(t) {
  return arguments.length ? this.each(t == null ? wl : (typeof t == "function" ? _l : vl)(t)) : this.node().innerHTML;
}
function xl() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function El() {
  return this.each(xl);
}
function Cl() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Sl() {
  return this.each(Cl);
}
function kl(t) {
  var e = typeof t == "function" ? t : Ds(t);
  return this.select(function() {
    return this.appendChild(e.apply(this, arguments));
  });
}
function Pl() {
  return null;
}
function Ll(t, e) {
  var n = typeof t == "function" ? t : Ds(t), o = e == null ? Pl : typeof e == "function" ? e : Qo(e);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), o.apply(this, arguments) || null);
  });
}
function Ml() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function Tl() {
  return this.each(Ml);
}
function Al() {
  var t = this.cloneNode(!1), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function Nl() {
  var t = this.cloneNode(!0), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function Il(t) {
  return this.select(t ? Nl : Al);
}
function $l(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function Dl(t) {
  return function(e) {
    t.call(this, e, this.__data__);
  };
}
function Rl(t) {
  return t.trim().split(/^|\s+/).map(function(e) {
    var n = "", o = e.indexOf(".");
    return o >= 0 && (n = e.slice(o + 1), e = e.slice(0, o)), { type: e, name: n };
  });
}
function Hl(t) {
  return function() {
    var e = this.__on;
    if (e) {
      for (var n = 0, o = -1, i = e.length, r; n < i; ++n)
        r = e[n], (!t.type || r.type === t.type) && r.name === t.name ? this.removeEventListener(r.type, r.listener, r.options) : e[++o] = r;
      ++o ? e.length = o : delete this.__on;
    }
  };
}
function Fl(t, e, n) {
  return function() {
    var o = this.__on, i, r = Dl(e);
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
function Ol(t, e, n) {
  var o = Rl(t + ""), i, r = o.length, s;
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
  for (l = e ? Fl : Hl, i = 0; i < r; ++i) this.each(l(o[i], e, n));
  return this;
}
function Ys(t, e, n) {
  var o = zs(t), i = o.CustomEvent;
  typeof i == "function" ? i = new i(e, n) : (i = o.document.createEvent("Event"), n ? (i.initEvent(e, n.bubbles, n.cancelable), i.detail = n.detail) : i.initEvent(e, !1, !1)), t.dispatchEvent(i);
}
function zl(t, e) {
  return function() {
    return Ys(this, t, e);
  };
}
function Vl(t, e) {
  return function() {
    return Ys(this, t, e.apply(this, arguments));
  };
}
function Bl(t, e) {
  return this.each((typeof e == "function" ? Vl : zl)(t, e));
}
function* ql() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var o = t[e], i = 0, r = o.length, s; i < r; ++i)
      (s = o[i]) && (yield s);
}
var Ws = [null];
function Re(t, e) {
  this._groups = t, this._parents = e;
}
function pn() {
  return new Re([[document.documentElement]], Ws);
}
function Xl() {
  return this;
}
Re.prototype = pn.prototype = {
  constructor: Re,
  select: ma,
  selectAll: _a,
  selectChild: Ca,
  selectChildren: La,
  filter: Ma,
  data: Da,
  enter: Ta,
  exit: Ha,
  join: Fa,
  merge: Oa,
  selection: Xl,
  order: za,
  sort: Va,
  call: qa,
  nodes: Xa,
  node: Ya,
  size: Wa,
  empty: ja,
  each: Ua,
  attr: tl,
  style: sl,
  property: cl,
  classed: hl,
  text: yl,
  html: bl,
  raise: El,
  lower: Sl,
  append: kl,
  insert: Ll,
  remove: Tl,
  clone: Il,
  datum: $l,
  on: Ol,
  dispatch: Bl,
  [Symbol.iterator]: ql
};
function ze(t) {
  return typeof t == "string" ? new Re([[document.querySelector(t)]], [document.documentElement]) : new Re([[t]], Ws);
}
function Yl(t) {
  let e;
  for (; e = t.sourceEvent; ) t = e;
  return t;
}
function Ke(t, e) {
  if (t = Yl(t), e === void 0 && (e = t.currentTarget), e) {
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
const Wl = { passive: !1 }, an = { capture: !0, passive: !1 };
function ho(t) {
  t.stopImmediatePropagation();
}
function At(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function js(t) {
  var e = t.document.documentElement, n = ze(t).on("dragstart.drag", At, an);
  "onselectstart" in e ? n.on("selectstart.drag", At, an) : (e.__noselect = e.style.MozUserSelect, e.style.MozUserSelect = "none");
}
function Us(t, e) {
  var n = t.document.documentElement, o = ze(t).on("dragstart.drag", null);
  e && (o.on("click.drag", At, an), setTimeout(function() {
    o.on("click.drag", null);
  }, 0)), "onselectstart" in n ? o.on("selectstart.drag", null) : (n.style.MozUserSelect = n.__noselect, delete n.__noselect);
}
const _n = (t) => () => t;
function No(t, {
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
No.prototype.on = function() {
  var t = this._.on.apply(this._, arguments);
  return t === this._ ? this : t;
};
function jl(t) {
  return !t.ctrlKey && !t.button;
}
function Ul() {
  return this.parentNode;
}
function Zl(t, e) {
  return e ?? { x: t.x, y: t.y };
}
function Kl() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Gl() {
  var t = jl, e = Ul, n = Zl, o = Kl, i = {}, r = ro("start", "drag", "end"), s = 0, l, a, c, d, f = 0;
  function u(b) {
    b.on("mousedown.drag", h).filter(o).on("touchstart.drag", y).on("touchmove.drag", m, Wl).on("touchend.drag touchcancel.drag", C).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function h(b, M) {
    if (!(d || !t.call(this, b, M))) {
      var P = T(this, e.call(this, b, M), b, M, "mouse");
      P && (ze(b.view).on("mousemove.drag", g, an).on("mouseup.drag", p, an), js(b.view), ho(b), c = !1, l = b.clientX, a = b.clientY, P("start", b));
    }
  }
  function g(b) {
    if (At(b), !c) {
      var M = b.clientX - l, P = b.clientY - a;
      c = M * M + P * P > f;
    }
    i.mouse("drag", b);
  }
  function p(b) {
    ze(b.view).on("mousemove.drag mouseup.drag", null), Us(b.view, c), At(b), i.mouse("end", b);
  }
  function y(b, M) {
    if (t.call(this, b, M)) {
      var P = b.changedTouches, L = e.call(this, b, M), $ = P.length, _, E;
      for (_ = 0; _ < $; ++_)
        (E = T(this, L, b, M, P[_].identifier, P[_])) && (ho(b), E("start", b, P[_]));
    }
  }
  function m(b) {
    var M = b.changedTouches, P = M.length, L, $;
    for (L = 0; L < P; ++L)
      ($ = i[M[L].identifier]) && (At(b), $("drag", b, M[L]));
  }
  function C(b) {
    var M = b.changedTouches, P = M.length, L, $;
    for (d && clearTimeout(d), d = setTimeout(function() {
      d = null;
    }, 500), L = 0; L < P; ++L)
      ($ = i[M[L].identifier]) && (ho(b), $("end", b, M[L]));
  }
  function T(b, M, P, L, $, _) {
    var E = r.copy(), v = Ke(_ || P, M), w, D, x;
    if ((x = n.call(b, new No("beforestart", {
      sourceEvent: P,
      target: u,
      identifier: $,
      active: s,
      x: v[0],
      y: v[1],
      dx: 0,
      dy: 0,
      dispatch: E
    }), L)) != null)
      return w = x.x - v[0] || 0, D = x.y - v[1] || 0, function N(A, O, U) {
        var S = v, k;
        switch (A) {
          case "start":
            i[$] = N, k = s++;
            break;
          case "end":
            delete i[$], --s;
          // falls through
          case "drag":
            v = Ke(U || O, M), k = s;
            break;
        }
        E.call(
          A,
          b,
          new No(A, {
            sourceEvent: O,
            subject: x,
            target: u,
            identifier: $,
            active: k,
            x: v[0] + w,
            y: v[1] + D,
            dx: v[0] - S[0],
            dy: v[1] - S[1],
            dispatch: E
          }),
          L
        );
      };
  }
  return u.filter = function(b) {
    return arguments.length ? (t = typeof b == "function" ? b : _n(!!b), u) : t;
  }, u.container = function(b) {
    return arguments.length ? (e = typeof b == "function" ? b : _n(b), u) : e;
  }, u.subject = function(b) {
    return arguments.length ? (n = typeof b == "function" ? b : _n(b), u) : n;
  }, u.touchable = function(b) {
    return arguments.length ? (o = typeof b == "function" ? b : _n(!!b), u) : o;
  }, u.on = function() {
    var b = r.on.apply(r, arguments);
    return b === r ? u : b;
  }, u.clickDistance = function(b) {
    return arguments.length ? (f = (b = +b) * b, u) : Math.sqrt(f);
  }, u;
}
function ti(t, e, n) {
  t.prototype = e.prototype = n, n.constructor = t;
}
function Zs(t, e) {
  var n = Object.create(t.prototype);
  for (var o in e) n[o] = e[o];
  return n;
}
function mn() {
}
var ln = 0.7, Fn = 1 / ln, Nt = "\\s*([+-]?\\d+)\\s*", cn = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", We = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", Jl = /^#([0-9a-f]{3,8})$/, Ql = new RegExp(`^rgb\\(${Nt},${Nt},${Nt}\\)$`), ec = new RegExp(`^rgb\\(${We},${We},${We}\\)$`), tc = new RegExp(`^rgba\\(${Nt},${Nt},${Nt},${cn}\\)$`), nc = new RegExp(`^rgba\\(${We},${We},${We},${cn}\\)$`), oc = new RegExp(`^hsl\\(${cn},${We},${We}\\)$`), ic = new RegExp(`^hsla\\(${cn},${We},${We},${cn}\\)$`), Pi = {
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
ti(mn, dn, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Li,
  // Deprecated! Use color.formatHex.
  formatHex: Li,
  formatHex8: sc,
  formatHsl: rc,
  formatRgb: Mi,
  toString: Mi
});
function Li() {
  return this.rgb().formatHex();
}
function sc() {
  return this.rgb().formatHex8();
}
function rc() {
  return Ks(this).formatHsl();
}
function Mi() {
  return this.rgb().formatRgb();
}
function dn(t) {
  var e, n;
  return t = (t + "").trim().toLowerCase(), (e = Jl.exec(t)) ? (n = e[1].length, e = parseInt(e[1], 16), n === 6 ? Ti(e) : n === 3 ? new Te(e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, (e & 15) << 4 | e & 15, 1) : n === 8 ? bn(e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, (e & 255) / 255) : n === 4 ? bn(e >> 12 & 15 | e >> 8 & 240, e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, ((e & 15) << 4 | e & 15) / 255) : null) : (e = Ql.exec(t)) ? new Te(e[1], e[2], e[3], 1) : (e = ec.exec(t)) ? new Te(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, 1) : (e = tc.exec(t)) ? bn(e[1], e[2], e[3], e[4]) : (e = nc.exec(t)) ? bn(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, e[4]) : (e = oc.exec(t)) ? Ii(e[1], e[2] / 100, e[3] / 100, 1) : (e = ic.exec(t)) ? Ii(e[1], e[2] / 100, e[3] / 100, e[4]) : Pi.hasOwnProperty(t) ? Ti(Pi[t]) : t === "transparent" ? new Te(NaN, NaN, NaN, 0) : null;
}
function Ti(t) {
  return new Te(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function bn(t, e, n, o) {
  return o <= 0 && (t = e = n = NaN), new Te(t, e, n, o);
}
function ac(t) {
  return t instanceof mn || (t = dn(t)), t ? (t = t.rgb(), new Te(t.r, t.g, t.b, t.opacity)) : new Te();
}
function Io(t, e, n, o) {
  return arguments.length === 1 ? ac(t) : new Te(t, e, n, o ?? 1);
}
function Te(t, e, n, o) {
  this.r = +t, this.g = +e, this.b = +n, this.opacity = +o;
}
ti(Te, Io, Zs(mn, {
  brighter(t) {
    return t = t == null ? Fn : Math.pow(Fn, t), new Te(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? ln : Math.pow(ln, t), new Te(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Te(xt(this.r), xt(this.g), xt(this.b), On(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Ai,
  // Deprecated! Use color.formatHex.
  formatHex: Ai,
  formatHex8: lc,
  formatRgb: Ni,
  toString: Ni
}));
function Ai() {
  return `#${_t(this.r)}${_t(this.g)}${_t(this.b)}`;
}
function lc() {
  return `#${_t(this.r)}${_t(this.g)}${_t(this.b)}${_t((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Ni() {
  const t = On(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${xt(this.r)}, ${xt(this.g)}, ${xt(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function On(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function xt(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function _t(t) {
  return t = xt(t), (t < 16 ? "0" : "") + t.toString(16);
}
function Ii(t, e, n, o) {
  return o <= 0 ? t = e = n = NaN : n <= 0 || n >= 1 ? t = e = NaN : e <= 0 && (t = NaN), new Ve(t, e, n, o);
}
function Ks(t) {
  if (t instanceof Ve) return new Ve(t.h, t.s, t.l, t.opacity);
  if (t instanceof mn || (t = dn(t)), !t) return new Ve();
  if (t instanceof Ve) return t;
  t = t.rgb();
  var e = t.r / 255, n = t.g / 255, o = t.b / 255, i = Math.min(e, n, o), r = Math.max(e, n, o), s = NaN, l = r - i, a = (r + i) / 2;
  return l ? (e === r ? s = (n - o) / l + (n < o) * 6 : n === r ? s = (o - e) / l + 2 : s = (e - n) / l + 4, l /= a < 0.5 ? r + i : 2 - r - i, s *= 60) : l = a > 0 && a < 1 ? 0 : s, new Ve(s, l, a, t.opacity);
}
function cc(t, e, n, o) {
  return arguments.length === 1 ? Ks(t) : new Ve(t, e, n, o ?? 1);
}
function Ve(t, e, n, o) {
  this.h = +t, this.s = +e, this.l = +n, this.opacity = +o;
}
ti(Ve, cc, Zs(mn, {
  brighter(t) {
    return t = t == null ? Fn : Math.pow(Fn, t), new Ve(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? ln : Math.pow(ln, t), new Ve(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, e = isNaN(t) || isNaN(this.s) ? 0 : this.s, n = this.l, o = n + (n < 0.5 ? n : 1 - n) * e, i = 2 * n - o;
    return new Te(
      go(t >= 240 ? t - 240 : t + 120, i, o),
      go(t, i, o),
      go(t < 120 ? t + 240 : t - 120, i, o),
      this.opacity
    );
  },
  clamp() {
    return new Ve($i(this.h), xn(this.s), xn(this.l), On(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = On(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${$i(this.h)}, ${xn(this.s) * 100}%, ${xn(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function $i(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function xn(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function go(t, e, n) {
  return (t < 60 ? e + (n - e) * t / 60 : t < 180 ? n : t < 240 ? e + (n - e) * (240 - t) / 60 : e) * 255;
}
const Gs = (t) => () => t;
function dc(t, e) {
  return function(n) {
    return t + n * e;
  };
}
function uc(t, e, n) {
  return t = Math.pow(t, n), e = Math.pow(e, n) - t, n = 1 / n, function(o) {
    return Math.pow(t + o * e, n);
  };
}
function fc(t) {
  return (t = +t) == 1 ? Js : function(e, n) {
    return n - e ? uc(e, n, t) : Gs(isNaN(e) ? n : e);
  };
}
function Js(t, e) {
  var n = e - t;
  return n ? dc(t, n) : Gs(isNaN(t) ? e : t);
}
const $o = (function t(e) {
  var n = fc(e);
  function o(i, r) {
    var s = n((i = Io(i)).r, (r = Io(r)).r), l = n(i.g, r.g), a = n(i.b, r.b), c = Js(i.opacity, r.opacity);
    return function(d) {
      return i.r = s(d), i.g = l(d), i.b = a(d), i.opacity = c(d), i + "";
    };
  }
  return o.gamma = t, o;
})(1);
function at(t, e) {
  return t = +t, e = +e, function(n) {
    return t * (1 - n) + e * n;
  };
}
var Do = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, po = new RegExp(Do.source, "g");
function hc(t) {
  return function() {
    return t;
  };
}
function gc(t) {
  return function(e) {
    return t(e) + "";
  };
}
function pc(t, e) {
  var n = Do.lastIndex = po.lastIndex = 0, o, i, r, s = -1, l = [], a = [];
  for (t = t + "", e = e + ""; (o = Do.exec(t)) && (i = po.exec(e)); )
    (r = i.index) > n && (r = e.slice(n, r), l[s] ? l[s] += r : l[++s] = r), (o = o[0]) === (i = i[0]) ? l[s] ? l[s] += i : l[++s] = i : (l[++s] = null, a.push({ i: s, x: at(o, i) })), n = po.lastIndex;
  return n < e.length && (r = e.slice(n), l[s] ? l[s] += r : l[++s] = r), l.length < 2 ? a[0] ? gc(a[0].x) : hc(e) : (e = a.length, function(c) {
    for (var d = 0, f; d < e; ++d) l[(f = a[d]).i] = f.x(c);
    return l.join("");
  });
}
var Di = 180 / Math.PI, Ro = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function Qs(t, e, n, o, i, r) {
  var s, l, a;
  return (s = Math.sqrt(t * t + e * e)) && (t /= s, e /= s), (a = t * n + e * o) && (n -= t * a, o -= e * a), (l = Math.sqrt(n * n + o * o)) && (n /= l, o /= l, a /= l), t * o < e * n && (t = -t, e = -e, a = -a, s = -s), {
    translateX: i,
    translateY: r,
    rotate: Math.atan2(e, t) * Di,
    skewX: Math.atan(a) * Di,
    scaleX: s,
    scaleY: l
  };
}
var En;
function mc(t) {
  const e = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return e.isIdentity ? Ro : Qs(e.a, e.b, e.c, e.d, e.e, e.f);
}
function yc(t) {
  return t == null || (En || (En = document.createElementNS("http://www.w3.org/2000/svg", "g")), En.setAttribute("transform", t), !(t = En.transform.baseVal.consolidate())) ? Ro : (t = t.matrix, Qs(t.a, t.b, t.c, t.d, t.e, t.f));
}
function er(t, e, n, o) {
  function i(c) {
    return c.length ? c.pop() + " " : "";
  }
  function r(c, d, f, u, h, g) {
    if (c !== f || d !== u) {
      var p = h.push("translate(", null, e, null, n);
      g.push({ i: p - 4, x: at(c, f) }, { i: p - 2, x: at(d, u) });
    } else (f || u) && h.push("translate(" + f + e + u + n);
  }
  function s(c, d, f, u) {
    c !== d ? (c - d > 180 ? d += 360 : d - c > 180 && (c += 360), u.push({ i: f.push(i(f) + "rotate(", null, o) - 2, x: at(c, d) })) : d && f.push(i(f) + "rotate(" + d + o);
  }
  function l(c, d, f, u) {
    c !== d ? u.push({ i: f.push(i(f) + "skewX(", null, o) - 2, x: at(c, d) }) : d && f.push(i(f) + "skewX(" + d + o);
  }
  function a(c, d, f, u, h, g) {
    if (c !== f || d !== u) {
      var p = h.push(i(h) + "scale(", null, ",", null, ")");
      g.push({ i: p - 4, x: at(c, f) }, { i: p - 2, x: at(d, u) });
    } else (f !== 1 || u !== 1) && h.push(i(h) + "scale(" + f + "," + u + ")");
  }
  return function(c, d) {
    var f = [], u = [];
    return c = t(c), d = t(d), r(c.translateX, c.translateY, d.translateX, d.translateY, f, u), s(c.rotate, d.rotate, f, u), l(c.skewX, d.skewX, f, u), a(c.scaleX, c.scaleY, d.scaleX, d.scaleY, f, u), c = d = null, function(h) {
      for (var g = -1, p = u.length, y; ++g < p; ) f[(y = u[g]).i] = y.x(h);
      return f.join("");
    };
  };
}
var wc = er(mc, "px, ", "px)", "deg)"), vc = er(yc, ", ", ")", ")"), _c = 1e-12;
function Ri(t) {
  return ((t = Math.exp(t)) + 1 / t) / 2;
}
function bc(t) {
  return ((t = Math.exp(t)) - 1 / t) / 2;
}
function xc(t) {
  return ((t = Math.exp(2 * t)) - 1) / (t + 1);
}
const Ec = (function t(e, n, o) {
  function i(r, s) {
    var l = r[0], a = r[1], c = r[2], d = s[0], f = s[1], u = s[2], h = d - l, g = f - a, p = h * h + g * g, y, m;
    if (p < _c)
      m = Math.log(u / c) / e, y = function(L) {
        return [
          l + L * h,
          a + L * g,
          c * Math.exp(e * L * m)
        ];
      };
    else {
      var C = Math.sqrt(p), T = (u * u - c * c + o * p) / (2 * c * n * C), b = (u * u - c * c - o * p) / (2 * u * n * C), M = Math.log(Math.sqrt(T * T + 1) - T), P = Math.log(Math.sqrt(b * b + 1) - b);
      m = (P - M) / e, y = function(L) {
        var $ = L * m, _ = Ri(M), E = c / (n * C) * (_ * xc(e * $ + M) - bc(M));
        return [
          l + E * h,
          a + E * g,
          c * _ / Ri(e * $ + M)
        ];
      };
    }
    return y.duration = m * 1e3 * e / Math.SQRT2, y;
  }
  return i.rho = function(r) {
    var s = Math.max(1e-3, +r), l = s * s, a = l * l;
    return t(s, l, a);
  }, i;
})(Math.SQRT2, 2, 4);
var Ot = 0, Qt = 0, jt = 0, tr = 1e3, zn, en, Vn = 0, Et = 0, lo = 0, un = typeof performance == "object" && performance.now ? performance : Date, nr = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function ni() {
  return Et || (nr(Cc), Et = un.now() + lo);
}
function Cc() {
  Et = 0;
}
function Bn() {
  this._call = this._time = this._next = null;
}
Bn.prototype = or.prototype = {
  constructor: Bn,
  restart: function(t, e, n) {
    if (typeof t != "function") throw new TypeError("callback is not a function");
    n = (n == null ? ni() : +n) + (e == null ? 0 : +e), !this._next && en !== this && (en ? en._next = this : zn = this, en = this), this._call = t, this._time = n, Ho();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Ho());
  }
};
function or(t, e, n) {
  var o = new Bn();
  return o.restart(t, e, n), o;
}
function Sc() {
  ni(), ++Ot;
  for (var t = zn, e; t; )
    (e = Et - t._time) >= 0 && t._call.call(void 0, e), t = t._next;
  --Ot;
}
function Hi() {
  Et = (Vn = un.now()) + lo, Ot = Qt = 0;
  try {
    Sc();
  } finally {
    Ot = 0, Pc(), Et = 0;
  }
}
function kc() {
  var t = un.now(), e = t - Vn;
  e > tr && (lo -= e, Vn = t);
}
function Pc() {
  for (var t, e = zn, n, o = 1 / 0; e; )
    e._call ? (o > e._time && (o = e._time), t = e, e = e._next) : (n = e._next, e._next = null, e = t ? t._next = n : zn = n);
  en = t, Ho(o);
}
function Ho(t) {
  if (!Ot) {
    Qt && (Qt = clearTimeout(Qt));
    var e = t - Et;
    e > 24 ? (t < 1 / 0 && (Qt = setTimeout(Hi, t - un.now() - lo)), jt && (jt = clearInterval(jt))) : (jt || (Vn = un.now(), jt = setInterval(kc, tr)), Ot = 1, nr(Hi));
  }
}
function Fi(t, e, n) {
  var o = new Bn();
  return e = e == null ? 0 : +e, o.restart((i) => {
    o.stop(), t(i + e);
  }, e, n), o;
}
var Lc = ro("start", "end", "cancel", "interrupt"), Mc = [], ir = 0, Oi = 1, Fo = 2, Nn = 3, zi = 4, Oo = 5, In = 6;
function co(t, e, n, o, i, r) {
  var s = t.__transition;
  if (!s) t.__transition = {};
  else if (n in s) return;
  Tc(t, n, {
    name: e,
    index: o,
    // For context during callback.
    group: i,
    // For context during callback.
    on: Lc,
    tween: Mc,
    time: r.time,
    delay: r.delay,
    duration: r.duration,
    ease: r.ease,
    timer: null,
    state: ir
  });
}
function oi(t, e) {
  var n = Be(t, e);
  if (n.state > ir) throw new Error("too late; already scheduled");
  return n;
}
function je(t, e) {
  var n = Be(t, e);
  if (n.state > Nn) throw new Error("too late; already running");
  return n;
}
function Be(t, e) {
  var n = t.__transition;
  if (!n || !(n = n[e])) throw new Error("transition not found");
  return n;
}
function Tc(t, e, n) {
  var o = t.__transition, i;
  o[e] = n, n.timer = or(r, 0, n.time);
  function r(c) {
    n.state = Oi, n.timer.restart(s, n.delay, n.time), n.delay <= c && s(c - n.delay);
  }
  function s(c) {
    var d, f, u, h;
    if (n.state !== Oi) return a();
    for (d in o)
      if (h = o[d], h.name === n.name) {
        if (h.state === Nn) return Fi(s);
        h.state === zi ? (h.state = In, h.timer.stop(), h.on.call("interrupt", t, t.__data__, h.index, h.group), delete o[d]) : +d < e && (h.state = In, h.timer.stop(), h.on.call("cancel", t, t.__data__, h.index, h.group), delete o[d]);
      }
    if (Fi(function() {
      n.state === Nn && (n.state = zi, n.timer.restart(l, n.delay, n.time), l(c));
    }), n.state = Fo, n.on.call("start", t, t.__data__, n.index, n.group), n.state === Fo) {
      for (n.state = Nn, i = new Array(u = n.tween.length), d = 0, f = -1; d < u; ++d)
        (h = n.tween[d].value.call(t, t.__data__, n.index, n.group)) && (i[++f] = h);
      i.length = f + 1;
    }
  }
  function l(c) {
    for (var d = c < n.duration ? n.ease.call(null, c / n.duration) : (n.timer.restart(a), n.state = Oo, 1), f = -1, u = i.length; ++f < u; )
      i[f].call(t, d);
    n.state === Oo && (n.on.call("end", t, t.__data__, n.index, n.group), a());
  }
  function a() {
    n.state = In, n.timer.stop(), delete o[e];
    for (var c in o) return;
    delete t.__transition;
  }
}
function $n(t, e) {
  var n = t.__transition, o, i, r = !0, s;
  if (n) {
    e = e == null ? null : e + "";
    for (s in n) {
      if ((o = n[s]).name !== e) {
        r = !1;
        continue;
      }
      i = o.state > Fo && o.state < Oo, o.state = In, o.timer.stop(), o.on.call(i ? "interrupt" : "cancel", t, t.__data__, o.index, o.group), delete n[s];
    }
    r && delete t.__transition;
  }
}
function Ac(t) {
  return this.each(function() {
    $n(this, t);
  });
}
function Nc(t, e) {
  var n, o;
  return function() {
    var i = je(this, t), r = i.tween;
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
function Ic(t, e, n) {
  var o, i;
  if (typeof n != "function") throw new Error();
  return function() {
    var r = je(this, t), s = r.tween;
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
function $c(t, e) {
  var n = this._id;
  if (t += "", arguments.length < 2) {
    for (var o = Be(this.node(), n).tween, i = 0, r = o.length, s; i < r; ++i)
      if ((s = o[i]).name === t)
        return s.value;
    return null;
  }
  return this.each((e == null ? Nc : Ic)(n, t, e));
}
function ii(t, e, n) {
  var o = t._id;
  return t.each(function() {
    var i = je(this, o);
    (i.value || (i.value = {}))[e] = n.apply(this, arguments);
  }), function(i) {
    return Be(i, o).value[e];
  };
}
function sr(t, e) {
  var n;
  return (typeof e == "number" ? at : e instanceof dn ? $o : (n = dn(e)) ? (e = n, $o) : pc)(t, e);
}
function Dc(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function Rc(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Hc(t, e, n) {
  var o, i = n + "", r;
  return function() {
    var s = this.getAttribute(t);
    return s === i ? null : s === o ? r : r = e(o = s, n);
  };
}
function Fc(t, e, n) {
  var o, i = n + "", r;
  return function() {
    var s = this.getAttributeNS(t.space, t.local);
    return s === i ? null : s === o ? r : r = e(o = s, n);
  };
}
function Oc(t, e, n) {
  var o, i, r;
  return function() {
    var s, l = n(this), a;
    return l == null ? void this.removeAttribute(t) : (s = this.getAttribute(t), a = l + "", s === a ? null : s === o && a === i ? r : (i = a, r = e(o = s, l)));
  };
}
function zc(t, e, n) {
  var o, i, r;
  return function() {
    var s, l = n(this), a;
    return l == null ? void this.removeAttributeNS(t.space, t.local) : (s = this.getAttributeNS(t.space, t.local), a = l + "", s === a ? null : s === o && a === i ? r : (i = a, r = e(o = s, l)));
  };
}
function Vc(t, e) {
  var n = ao(t), o = n === "transform" ? vc : sr;
  return this.attrTween(t, typeof e == "function" ? (n.local ? zc : Oc)(n, o, ii(this, "attr." + t, e)) : e == null ? (n.local ? Rc : Dc)(n) : (n.local ? Fc : Hc)(n, o, e));
}
function Bc(t, e) {
  return function(n) {
    this.setAttribute(t, e.call(this, n));
  };
}
function qc(t, e) {
  return function(n) {
    this.setAttributeNS(t.space, t.local, e.call(this, n));
  };
}
function Xc(t, e) {
  var n, o;
  function i() {
    var r = e.apply(this, arguments);
    return r !== o && (n = (o = r) && qc(t, r)), n;
  }
  return i._value = e, i;
}
function Yc(t, e) {
  var n, o;
  function i() {
    var r = e.apply(this, arguments);
    return r !== o && (n = (o = r) && Bc(t, r)), n;
  }
  return i._value = e, i;
}
function Wc(t, e) {
  var n = "attr." + t;
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (e == null) return this.tween(n, null);
  if (typeof e != "function") throw new Error();
  var o = ao(t);
  return this.tween(n, (o.local ? Xc : Yc)(o, e));
}
function jc(t, e) {
  return function() {
    oi(this, t).delay = +e.apply(this, arguments);
  };
}
function Uc(t, e) {
  return e = +e, function() {
    oi(this, t).delay = e;
  };
}
function Zc(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? jc : Uc)(e, t)) : Be(this.node(), e).delay;
}
function Kc(t, e) {
  return function() {
    je(this, t).duration = +e.apply(this, arguments);
  };
}
function Gc(t, e) {
  return e = +e, function() {
    je(this, t).duration = e;
  };
}
function Jc(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? Kc : Gc)(e, t)) : Be(this.node(), e).duration;
}
function Qc(t, e) {
  if (typeof e != "function") throw new Error();
  return function() {
    je(this, t).ease = e;
  };
}
function ed(t) {
  var e = this._id;
  return arguments.length ? this.each(Qc(e, t)) : Be(this.node(), e).ease;
}
function td(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    if (typeof n != "function") throw new Error();
    je(this, t).ease = n;
  };
}
function nd(t) {
  if (typeof t != "function") throw new Error();
  return this.each(td(this._id, t));
}
function od(t) {
  typeof t != "function" && (t = Hs(t));
  for (var e = this._groups, n = e.length, o = new Array(n), i = 0; i < n; ++i)
    for (var r = e[i], s = r.length, l = o[i] = [], a, c = 0; c < s; ++c)
      (a = r[c]) && t.call(a, a.__data__, c, r) && l.push(a);
  return new nt(o, this._parents, this._name, this._id);
}
function id(t) {
  if (t._id !== this._id) throw new Error();
  for (var e = this._groups, n = t._groups, o = e.length, i = n.length, r = Math.min(o, i), s = new Array(o), l = 0; l < r; ++l)
    for (var a = e[l], c = n[l], d = a.length, f = s[l] = new Array(d), u, h = 0; h < d; ++h)
      (u = a[h] || c[h]) && (f[h] = u);
  for (; l < o; ++l)
    s[l] = e[l];
  return new nt(s, this._parents, this._name, this._id);
}
function sd(t) {
  return (t + "").trim().split(/^|\s+/).every(function(e) {
    var n = e.indexOf(".");
    return n >= 0 && (e = e.slice(0, n)), !e || e === "start";
  });
}
function rd(t, e, n) {
  var o, i, r = sd(e) ? oi : je;
  return function() {
    var s = r(this, t), l = s.on;
    l !== o && (i = (o = l).copy()).on(e, n), s.on = i;
  };
}
function ad(t, e) {
  var n = this._id;
  return arguments.length < 2 ? Be(this.node(), n).on.on(t) : this.each(rd(n, t, e));
}
function ld(t) {
  return function() {
    var e = this.parentNode;
    for (var n in this.__transition) if (+n !== t) return;
    e && e.removeChild(this);
  };
}
function cd() {
  return this.on("end.remove", ld(this._id));
}
function dd(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = Qo(t));
  for (var o = this._groups, i = o.length, r = new Array(i), s = 0; s < i; ++s)
    for (var l = o[s], a = l.length, c = r[s] = new Array(a), d, f, u = 0; u < a; ++u)
      (d = l[u]) && (f = t.call(d, d.__data__, u, l)) && ("__data__" in d && (f.__data__ = d.__data__), c[u] = f, co(c[u], e, n, u, c, Be(d, n)));
  return new nt(r, this._parents, e, n);
}
function ud(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = Rs(t));
  for (var o = this._groups, i = o.length, r = [], s = [], l = 0; l < i; ++l)
    for (var a = o[l], c = a.length, d, f = 0; f < c; ++f)
      if (d = a[f]) {
        for (var u = t.call(d, d.__data__, f, a), h, g = Be(d, n), p = 0, y = u.length; p < y; ++p)
          (h = u[p]) && co(h, e, n, p, u, g);
        r.push(u), s.push(d);
      }
  return new nt(r, s, e, n);
}
var fd = pn.prototype.constructor;
function hd() {
  return new fd(this._groups, this._parents);
}
function gd(t, e) {
  var n, o, i;
  return function() {
    var r = Ft(this, t), s = (this.style.removeProperty(t), Ft(this, t));
    return r === s ? null : r === n && s === o ? i : i = e(n = r, o = s);
  };
}
function rr(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function pd(t, e, n) {
  var o, i = n + "", r;
  return function() {
    var s = Ft(this, t);
    return s === i ? null : s === o ? r : r = e(o = s, n);
  };
}
function md(t, e, n) {
  var o, i, r;
  return function() {
    var s = Ft(this, t), l = n(this), a = l + "";
    return l == null && (a = l = (this.style.removeProperty(t), Ft(this, t))), s === a ? null : s === o && a === i ? r : (i = a, r = e(o = s, l));
  };
}
function yd(t, e) {
  var n, o, i, r = "style." + e, s = "end." + r, l;
  return function() {
    var a = je(this, t), c = a.on, d = a.value[r] == null ? l || (l = rr(e)) : void 0;
    (c !== n || i !== d) && (o = (n = c).copy()).on(s, i = d), a.on = o;
  };
}
function wd(t, e, n) {
  var o = (t += "") == "transform" ? wc : sr;
  return e == null ? this.styleTween(t, gd(t, o)).on("end.style." + t, rr(t)) : typeof e == "function" ? this.styleTween(t, md(t, o, ii(this, "style." + t, e))).each(yd(this._id, t)) : this.styleTween(t, pd(t, o, e), n).on("end.style." + t, null);
}
function vd(t, e, n) {
  return function(o) {
    this.style.setProperty(t, e.call(this, o), n);
  };
}
function _d(t, e, n) {
  var o, i;
  function r() {
    var s = e.apply(this, arguments);
    return s !== i && (o = (i = s) && vd(t, s, n)), o;
  }
  return r._value = e, r;
}
function bd(t, e, n) {
  var o = "style." + (t += "");
  if (arguments.length < 2) return (o = this.tween(o)) && o._value;
  if (e == null) return this.tween(o, null);
  if (typeof e != "function") throw new Error();
  return this.tween(o, _d(t, e, n ?? ""));
}
function xd(t) {
  return function() {
    this.textContent = t;
  };
}
function Ed(t) {
  return function() {
    var e = t(this);
    this.textContent = e ?? "";
  };
}
function Cd(t) {
  return this.tween("text", typeof t == "function" ? Ed(ii(this, "text", t)) : xd(t == null ? "" : t + ""));
}
function Sd(t) {
  return function(e) {
    this.textContent = t.call(this, e);
  };
}
function kd(t) {
  var e, n;
  function o() {
    var i = t.apply(this, arguments);
    return i !== n && (e = (n = i) && Sd(i)), e;
  }
  return o._value = t, o;
}
function Pd(t) {
  var e = "text";
  if (arguments.length < 1) return (e = this.tween(e)) && e._value;
  if (t == null) return this.tween(e, null);
  if (typeof t != "function") throw new Error();
  return this.tween(e, kd(t));
}
function Ld() {
  for (var t = this._name, e = this._id, n = ar(), o = this._groups, i = o.length, r = 0; r < i; ++r)
    for (var s = o[r], l = s.length, a, c = 0; c < l; ++c)
      if (a = s[c]) {
        var d = Be(a, e);
        co(a, t, n, c, s, {
          time: d.time + d.delay + d.duration,
          delay: 0,
          duration: d.duration,
          ease: d.ease
        });
      }
  return new nt(o, this._parents, t, n);
}
function Md() {
  var t, e, n = this, o = n._id, i = n.size();
  return new Promise(function(r, s) {
    var l = { value: s }, a = { value: function() {
      --i === 0 && r();
    } };
    n.each(function() {
      var c = je(this, o), d = c.on;
      d !== t && (e = (t = d).copy(), e._.cancel.push(l), e._.interrupt.push(l), e._.end.push(a)), c.on = e;
    }), i === 0 && r();
  });
}
var Td = 0;
function nt(t, e, n, o) {
  this._groups = t, this._parents = e, this._name = n, this._id = o;
}
function ar() {
  return ++Td;
}
var Ze = pn.prototype;
nt.prototype = {
  constructor: nt,
  select: dd,
  selectAll: ud,
  selectChild: Ze.selectChild,
  selectChildren: Ze.selectChildren,
  filter: od,
  merge: id,
  selection: hd,
  transition: Ld,
  call: Ze.call,
  nodes: Ze.nodes,
  node: Ze.node,
  size: Ze.size,
  empty: Ze.empty,
  each: Ze.each,
  on: ad,
  attr: Vc,
  attrTween: Wc,
  style: wd,
  styleTween: bd,
  text: Cd,
  textTween: Pd,
  remove: cd,
  tween: $c,
  delay: Zc,
  duration: Jc,
  ease: ed,
  easeVarying: nd,
  end: Md,
  [Symbol.iterator]: Ze[Symbol.iterator]
};
const Ad = (t) => +t;
function Nd(t) {
  return t * t;
}
function Id(t) {
  return t * (2 - t);
}
function $d(t) {
  return ((t *= 2) <= 1 ? t * t : --t * (2 - t) + 1) / 2;
}
function Dd(t) {
  return t * t * t;
}
function Rd(t) {
  return --t * t * t + 1;
}
function lr(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var cr = Math.PI, dr = cr / 2;
function Hd(t) {
  return +t == 1 ? 1 : 1 - Math.cos(t * dr);
}
function Fd(t) {
  return Math.sin(t * dr);
}
function Od(t) {
  return (1 - Math.cos(cr * t)) / 2;
}
function gt(t) {
  return (Math.pow(2, -10 * t) - 9765625e-10) * 1.0009775171065494;
}
function zd(t) {
  return gt(1 - +t);
}
function Vd(t) {
  return 1 - gt(t);
}
function Bd(t) {
  return ((t *= 2) <= 1 ? gt(1 - t) : 2 - gt(t - 1)) / 2;
}
function qd(t) {
  return 1 - Math.sqrt(1 - t * t);
}
function Xd(t) {
  return Math.sqrt(1 - --t * t);
}
function Yd(t) {
  return ((t *= 2) <= 1 ? 1 - Math.sqrt(1 - t * t) : Math.sqrt(1 - (t -= 2) * t) + 1) / 2;
}
var zo = 4 / 11, Wd = 6 / 11, jd = 8 / 11, Ud = 3 / 4, Zd = 9 / 11, Kd = 10 / 11, Gd = 15 / 16, Jd = 21 / 22, Qd = 63 / 64, Cn = 1 / zo / zo;
function eu(t) {
  return 1 - qn(1 - t);
}
function qn(t) {
  return (t = +t) < zo ? Cn * t * t : t < jd ? Cn * (t -= Wd) * t + Ud : t < Kd ? Cn * (t -= Zd) * t + Gd : Cn * (t -= Jd) * t + Qd;
}
function tu(t) {
  return ((t *= 2) <= 1 ? 1 - qn(1 - t) : qn(t - 1) + 1) / 2;
}
var si = 1.70158, nu = (function t(e) {
  e = +e;
  function n(o) {
    return (o = +o) * o * (e * (o - 1) + o);
  }
  return n.overshoot = t, n;
})(si), ou = (function t(e) {
  e = +e;
  function n(o) {
    return --o * o * ((o + 1) * e + o) + 1;
  }
  return n.overshoot = t, n;
})(si), iu = (function t(e) {
  e = +e;
  function n(o) {
    return ((o *= 2) < 1 ? o * o * ((e + 1) * o - e) : (o -= 2) * o * ((e + 1) * o + e) + 2) / 2;
  }
  return n.overshoot = t, n;
})(si), zt = 2 * Math.PI, ri = 1, ai = 0.3, su = (function t(e, n) {
  var o = Math.asin(1 / (e = Math.max(1, e))) * (n /= zt);
  function i(r) {
    return e * gt(- --r) * Math.sin((o - r) / n);
  }
  return i.amplitude = function(r) {
    return t(r, n * zt);
  }, i.period = function(r) {
    return t(e, r);
  }, i;
})(ri, ai), ru = (function t(e, n) {
  var o = Math.asin(1 / (e = Math.max(1, e))) * (n /= zt);
  function i(r) {
    return 1 - e * gt(r = +r) * Math.sin((r + o) / n);
  }
  return i.amplitude = function(r) {
    return t(r, n * zt);
  }, i.period = function(r) {
    return t(e, r);
  }, i;
})(ri, ai), au = (function t(e, n) {
  var o = Math.asin(1 / (e = Math.max(1, e))) * (n /= zt);
  function i(r) {
    return ((r = r * 2 - 1) < 0 ? e * gt(-r) * Math.sin((o - r) / n) : 2 - e * gt(r) * Math.sin((o + r) / n)) / 2;
  }
  return i.amplitude = function(r) {
    return t(r, n * zt);
  }, i.period = function(r) {
    return t(e, r);
  }, i;
})(ri, ai), lu = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: lr
};
function cu(t, e) {
  for (var n; !(n = t.__transition) || !(n = n[e]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${e} not found`);
  return n;
}
function du(t) {
  var e, n;
  t instanceof nt ? (e = t._id, t = t._name) : (e = ar(), (n = lu).time = ni(), t = t == null ? null : t + "");
  for (var o = this._groups, i = o.length, r = 0; r < i; ++r)
    for (var s = o[r], l = s.length, a, c = 0; c < l; ++c)
      (a = s[c]) && co(a, t, e, c, s, n || cu(a, e));
  return new nt(o, this._parents, t, e);
}
pn.prototype.interrupt = Ac;
pn.prototype.transition = du;
const Sn = (t) => () => t;
function uu(t, {
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
var Xn = new Ge(1, 0, 0);
Ge.prototype;
function mo(t) {
  t.stopImmediatePropagation();
}
function Ut(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function fu(t) {
  return (!t.ctrlKey || t.type === "wheel") && !t.button;
}
function hu() {
  var t = this;
  return t instanceof SVGElement ? (t = t.ownerSVGElement || t, t.hasAttribute("viewBox") ? (t = t.viewBox.baseVal, [[t.x, t.y], [t.x + t.width, t.y + t.height]]) : [[0, 0], [t.width.baseVal.value, t.height.baseVal.value]]) : [[0, 0], [t.clientWidth, t.clientHeight]];
}
function Vi() {
  return this.__zoom || Xn;
}
function gu(t) {
  return -t.deltaY * (t.deltaMode === 1 ? 0.05 : t.deltaMode ? 1 : 2e-3) * (t.ctrlKey ? 10 : 1);
}
function pu() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function mu(t, e, n) {
  var o = t.invertX(e[0][0]) - n[0][0], i = t.invertX(e[1][0]) - n[1][0], r = t.invertY(e[0][1]) - n[0][1], s = t.invertY(e[1][1]) - n[1][1];
  return t.translate(
    i > o ? (o + i) / 2 : Math.min(0, o) || Math.max(0, i),
    s > r ? (r + s) / 2 : Math.min(0, r) || Math.max(0, s)
  );
}
function yu() {
  var t = fu, e = hu, n = mu, o = gu, i = pu, r = [0, 1 / 0], s = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], l = 250, a = Ec, c = ro("start", "zoom", "end"), d, f, u, h = 500, g = 150, p = 0, y = 10;
  function m(x) {
    x.property("__zoom", Vi).on("wheel.zoom", $, { passive: !1 }).on("mousedown.zoom", _).on("dblclick.zoom", E).filter(i).on("touchstart.zoom", v).on("touchmove.zoom", w).on("touchend.zoom touchcancel.zoom", D).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  m.transform = function(x, N, A, O) {
    var U = x.selection ? x.selection() : x;
    U.property("__zoom", Vi), x !== U ? M(x, N, A, O) : U.interrupt().each(function() {
      P(this, arguments).event(O).start().zoom(null, typeof N == "function" ? N.apply(this, arguments) : N).end();
    });
  }, m.scaleBy = function(x, N, A, O) {
    m.scaleTo(x, function() {
      var U = this.__zoom.k, S = typeof N == "function" ? N.apply(this, arguments) : N;
      return U * S;
    }, A, O);
  }, m.scaleTo = function(x, N, A, O) {
    m.transform(x, function() {
      var U = e.apply(this, arguments), S = this.__zoom, k = A == null ? b(U) : typeof A == "function" ? A.apply(this, arguments) : A, R = S.invert(k), q = typeof N == "function" ? N.apply(this, arguments) : N;
      return n(T(C(S, q), k, R), U, s);
    }, A, O);
  }, m.translateBy = function(x, N, A, O) {
    m.transform(x, function() {
      return n(this.__zoom.translate(
        typeof N == "function" ? N.apply(this, arguments) : N,
        typeof A == "function" ? A.apply(this, arguments) : A
      ), e.apply(this, arguments), s);
    }, null, O);
  }, m.translateTo = function(x, N, A, O, U) {
    m.transform(x, function() {
      var S = e.apply(this, arguments), k = this.__zoom, R = O == null ? b(S) : typeof O == "function" ? O.apply(this, arguments) : O;
      return n(Xn.translate(R[0], R[1]).scale(k.k).translate(
        typeof N == "function" ? -N.apply(this, arguments) : -N,
        typeof A == "function" ? -A.apply(this, arguments) : -A
      ), S, s);
    }, O, U);
  };
  function C(x, N) {
    return N = Math.max(r[0], Math.min(r[1], N)), N === x.k ? x : new Ge(N, x.x, x.y);
  }
  function T(x, N, A) {
    var O = N[0] - A[0] * x.k, U = N[1] - A[1] * x.k;
    return O === x.x && U === x.y ? x : new Ge(x.k, O, U);
  }
  function b(x) {
    return [(+x[0][0] + +x[1][0]) / 2, (+x[0][1] + +x[1][1]) / 2];
  }
  function M(x, N, A, O) {
    x.on("start.zoom", function() {
      P(this, arguments).event(O).start();
    }).on("interrupt.zoom end.zoom", function() {
      P(this, arguments).event(O).end();
    }).tween("zoom", function() {
      var U = this, S = arguments, k = P(U, S).event(O), R = e.apply(U, S), q = A == null ? b(R) : typeof A == "function" ? A.apply(U, S) : A, re = Math.max(R[1][0] - R[0][0], R[1][1] - R[0][1]), te = U.__zoom, oe = typeof N == "function" ? N.apply(U, S) : N, ae = a(te.invert(q).concat(re / te.k), oe.invert(q).concat(re / oe.k));
      return function(de) {
        if (de === 1) de = oe;
        else {
          var le = ae(de), J = re / le[2];
          de = new Ge(J, q[0] - le[0] * J, q[1] - le[1] * J);
        }
        k.zoom(null, de);
      };
    });
  }
  function P(x, N, A) {
    return !A && x.__zooming || new L(x, N);
  }
  function L(x, N) {
    this.that = x, this.args = N, this.active = 0, this.sourceEvent = null, this.extent = e.apply(x, N), this.taps = 0;
  }
  L.prototype = {
    event: function(x) {
      return x && (this.sourceEvent = x), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(x, N) {
      return this.mouse && x !== "mouse" && (this.mouse[1] = N.invert(this.mouse[0])), this.touch0 && x !== "touch" && (this.touch0[1] = N.invert(this.touch0[0])), this.touch1 && x !== "touch" && (this.touch1[1] = N.invert(this.touch1[0])), this.that.__zoom = N, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(x) {
      var N = ze(this.that).datum();
      c.call(
        x,
        this.that,
        new uu(x, {
          sourceEvent: this.sourceEvent,
          target: m,
          transform: this.that.__zoom,
          dispatch: c
        }),
        N
      );
    }
  };
  function $(x, ...N) {
    if (!t.apply(this, arguments)) return;
    var A = P(this, N).event(x), O = this.__zoom, U = Math.max(r[0], Math.min(r[1], O.k * Math.pow(2, o.apply(this, arguments)))), S = Ke(x);
    if (A.wheel)
      (A.mouse[0][0] !== S[0] || A.mouse[0][1] !== S[1]) && (A.mouse[1] = O.invert(A.mouse[0] = S)), clearTimeout(A.wheel);
    else {
      if (O.k === U) return;
      A.mouse = [S, O.invert(S)], $n(this), A.start();
    }
    Ut(x), A.wheel = setTimeout(k, g), A.zoom("mouse", n(T(C(O, U), A.mouse[0], A.mouse[1]), A.extent, s));
    function k() {
      A.wheel = null, A.end();
    }
  }
  function _(x, ...N) {
    if (u || !t.apply(this, arguments)) return;
    var A = x.currentTarget, O = P(this, N, !0).event(x), U = ze(x.view).on("mousemove.zoom", q, !0).on("mouseup.zoom", re, !0), S = Ke(x, A), k = x.clientX, R = x.clientY;
    js(x.view), mo(x), O.mouse = [S, this.__zoom.invert(S)], $n(this), O.start();
    function q(te) {
      if (Ut(te), !O.moved) {
        var oe = te.clientX - k, ae = te.clientY - R;
        O.moved = oe * oe + ae * ae > p;
      }
      O.event(te).zoom("mouse", n(T(O.that.__zoom, O.mouse[0] = Ke(te, A), O.mouse[1]), O.extent, s));
    }
    function re(te) {
      U.on("mousemove.zoom mouseup.zoom", null), Us(te.view, O.moved), Ut(te), O.event(te).end();
    }
  }
  function E(x, ...N) {
    if (t.apply(this, arguments)) {
      var A = this.__zoom, O = Ke(x.changedTouches ? x.changedTouches[0] : x, this), U = A.invert(O), S = A.k * (x.shiftKey ? 0.5 : 2), k = n(T(C(A, S), O, U), e.apply(this, N), s);
      Ut(x), l > 0 ? ze(this).transition().duration(l).call(M, k, O, x) : ze(this).call(m.transform, k, O, x);
    }
  }
  function v(x, ...N) {
    if (t.apply(this, arguments)) {
      var A = x.touches, O = A.length, U = P(this, N, x.changedTouches.length === O).event(x), S, k, R, q;
      for (mo(x), k = 0; k < O; ++k)
        R = A[k], q = Ke(R, this), q = [q, this.__zoom.invert(q), R.identifier], U.touch0 ? !U.touch1 && U.touch0[2] !== q[2] && (U.touch1 = q, U.taps = 0) : (U.touch0 = q, S = !0, U.taps = 1 + !!d);
      d && (d = clearTimeout(d)), S && (U.taps < 2 && (f = q[0], d = setTimeout(function() {
        d = null;
      }, h)), $n(this), U.start());
    }
  }
  function w(x, ...N) {
    if (this.__zooming) {
      var A = P(this, N).event(x), O = x.changedTouches, U = O.length, S, k, R, q;
      for (Ut(x), S = 0; S < U; ++S)
        k = O[S], R = Ke(k, this), A.touch0 && A.touch0[2] === k.identifier ? A.touch0[0] = R : A.touch1 && A.touch1[2] === k.identifier && (A.touch1[0] = R);
      if (k = A.that.__zoom, A.touch1) {
        var re = A.touch0[0], te = A.touch0[1], oe = A.touch1[0], ae = A.touch1[1], de = (de = oe[0] - re[0]) * de + (de = oe[1] - re[1]) * de, le = (le = ae[0] - te[0]) * le + (le = ae[1] - te[1]) * le;
        k = C(k, Math.sqrt(de / le)), R = [(re[0] + oe[0]) / 2, (re[1] + oe[1]) / 2], q = [(te[0] + ae[0]) / 2, (te[1] + ae[1]) / 2];
      } else if (A.touch0) R = A.touch0[0], q = A.touch0[1];
      else return;
      A.zoom("touch", n(T(k, R, q), A.extent, s));
    }
  }
  function D(x, ...N) {
    if (this.__zooming) {
      var A = P(this, N).event(x), O = x.changedTouches, U = O.length, S, k;
      for (mo(x), u && clearTimeout(u), u = setTimeout(function() {
        u = null;
      }, h), S = 0; S < U; ++S)
        k = O[S], A.touch0 && A.touch0[2] === k.identifier ? delete A.touch0 : A.touch1 && A.touch1[2] === k.identifier && delete A.touch1;
      if (A.touch1 && !A.touch0 && (A.touch0 = A.touch1, delete A.touch1), A.touch0) A.touch0[1] = this.__zoom.invert(A.touch0[0]);
      else if (A.end(), A.taps === 2 && (k = Ke(k, this), Math.hypot(f[0] - k[0], f[1] - k[1]) < y)) {
        var R = ze(this).on("dblclick.zoom");
        R && R.apply(this, arguments);
      }
    }
  }
  return m.wheelDelta = function(x) {
    return arguments.length ? (o = typeof x == "function" ? x : Sn(+x), m) : o;
  }, m.filter = function(x) {
    return arguments.length ? (t = typeof x == "function" ? x : Sn(!!x), m) : t;
  }, m.touchable = function(x) {
    return arguments.length ? (i = typeof x == "function" ? x : Sn(!!x), m) : i;
  }, m.extent = function(x) {
    return arguments.length ? (e = typeof x == "function" ? x : Sn([[+x[0][0], +x[0][1]], [+x[1][0], +x[1][1]]]), m) : e;
  }, m.scaleExtent = function(x) {
    return arguments.length ? (r[0] = +x[0], r[1] = +x[1], m) : [r[0], r[1]];
  }, m.translateExtent = function(x) {
    return arguments.length ? (s[0][0] = +x[0][0], s[1][0] = +x[1][0], s[0][1] = +x[0][1], s[1][1] = +x[1][1], m) : [[s[0][0], s[0][1]], [s[1][0], s[1][1]]];
  }, m.constrain = function(x) {
    return arguments.length ? (n = x, m) : n;
  }, m.duration = function(x) {
    return arguments.length ? (l = +x, m) : l;
  }, m.interpolate = function(x) {
    return arguments.length ? (a = x, m) : a;
  }, m.on = function() {
    var x = c.on.apply(c, arguments);
    return x === c ? m : x;
  }, m.clickDistance = function(x) {
    return arguments.length ? (p = (x = +x) * x, m) : Math.sqrt(p);
  }, m.tapDistance = function(x) {
    return arguments.length ? (y = +x, m) : y;
  }, m;
}
function Bi(t) {
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
function wu(t, e) {
  const {
    onTransformChange: n,
    minZoom: o = 0.5,
    maxZoom: i = 2,
    pannable: r = !0,
    zoomable: s = !0
  } = e, l = ze(t);
  let a = !1;
  const c = e.panActivationKeyCode !== void 0 ? e.panActivationKeyCode : "Space", d = (L) => {
    c && L.code === c && (a = !0, t.style.cursor = "grab");
  }, f = (L) => {
    c && L.code === c && (a = !1, t.style.cursor = "");
  }, u = () => {
    a = !1, t.style.cursor = "";
  };
  c && (window.addEventListener("keydown", d), window.addEventListener("keyup", f), window.addEventListener("blur", u));
  const h = yu().scaleExtent([o, i]).on("start", (L) => {
    if (!L.sourceEvent) return;
    a && (t.style.cursor = "grabbing");
    const { x: $, y: _, k: E } = L.transform;
    e.onMoveStart?.({ x: $, y: _, zoom: E });
  }).on("zoom", (L) => {
    const { x: $, y: _, k: E } = L.transform;
    n({ x: $, y: _, zoom: E }), L.sourceEvent && e.onMove?.({ x: $, y: _, zoom: E });
  }).on("end", (L) => {
    if (!L.sourceEvent) return;
    a && (t.style.cursor = "grab");
    const { x: $, y: _, k: E } = L.transform;
    e.onMoveEnd?.({ x: $, y: _, zoom: E });
  });
  e.translateExtent && h.translateExtent(e.translateExtent), h.filter(Bi({
    pannable: r,
    zoomable: s,
    isLocked: e.isLocked,
    noPanClassName: e.noPanClassName,
    noWheelClassName: e.noWheelClassName,
    isTouchSelectionMode: e.isTouchSelectionMode,
    isPanKeyHeld: () => a,
    panOnDrag: e.panOnDrag
  })), l.call(h), e.zoomOnDoubleClick === !1 && l.on("dblclick.zoom", null);
  let g = e.panOnScroll ?? !1, p = e.panOnScrollDirection ?? "both", y = e.panOnScrollSpeed ?? 1, m = !1;
  const C = e.zoomActivationKeyCode !== void 0 ? e.zoomActivationKeyCode : null, T = (L) => {
    C && L.code === C && (m = !0);
  }, b = (L) => {
    C && L.code === C && (m = !1);
  }, M = () => {
    m = !1;
  };
  C && (window.addEventListener("keydown", T), window.addEventListener("keyup", b), window.addEventListener("blur", M));
  const P = (L) => {
    if (e.isLocked?.()) return;
    const $ = L.ctrlKey || L.metaKey || m;
    if (!(g ? !$ : L.shiftKey)) return;
    L.preventDefault(), L.stopPropagation();
    const E = y;
    let v = 0, w = 0;
    p !== "horizontal" && (w = -L.deltaY * E), p !== "vertical" && (v = -L.deltaX * E, L.shiftKey && L.deltaX === 0 && p === "both" && (v = -L.deltaY * E, w = 0)), e.onScrollPan?.(v, w);
  };
  return t.addEventListener("wheel", P, { passive: !1, capture: !0 }), {
    setViewport(L, $) {
      const _ = $?.duration ?? 0, E = Xn.translate(L.x ?? 0, L.y ?? 0).scale(L.zoom ?? 1);
      _ > 0 ? l.transition().duration(_).call(h.transform, E) : l.call(h.transform, E);
    },
    getTransform() {
      return t.__zoom ?? Xn;
    },
    update(L) {
      if ((L.minZoom !== void 0 || L.maxZoom !== void 0) && h.scaleExtent([
        L.minZoom ?? o,
        L.maxZoom ?? i
      ]), L.pannable !== void 0 || L.zoomable !== void 0) {
        const $ = L.pannable ?? r, _ = L.zoomable ?? s;
        h.filter(Bi({
          pannable: $,
          zoomable: _,
          isLocked: e.isLocked,
          noPanClassName: e.noPanClassName,
          noWheelClassName: e.noWheelClassName,
          isTouchSelectionMode: e.isTouchSelectionMode,
          isPanKeyHeld: () => a,
          panOnDrag: e.panOnDrag
        }));
      }
      L.panOnScroll !== void 0 && (g = L.panOnScroll), L.panOnScrollDirection !== void 0 && (p = L.panOnScrollDirection), L.panOnScrollSpeed !== void 0 && (y = L.panOnScrollSpeed);
    },
    destroy() {
      t.removeEventListener("wheel", P, { capture: !0 }), c && (window.removeEventListener("keydown", d), window.removeEventListener("keyup", f), window.removeEventListener("blur", u)), C && (window.removeEventListener("keydown", T), window.removeEventListener("keyup", b), window.removeEventListener("blur", M)), l.on(".zoom", null);
    }
  };
}
function ur(t, e, n, o) {
  return {
    x: (t - o.left - n.x) / n.zoom,
    y: (e - o.top - n.y) / n.zoom
  };
}
function vu(t, e, n, o) {
  return {
    x: t * n.zoom + n.x + o.left,
    y: e * n.zoom + n.y + o.top
  };
}
const ve = 150, _e = 50;
function uo(t, e, n, o, i) {
  if (i % 360 === 0) return { x: t, y: e, width: n, height: o };
  const r = i * Math.PI / 180, s = Math.abs(Math.cos(r)), l = Math.abs(Math.sin(r)), a = n * s + o * l, c = n * l + o * s, d = t + n / 2, f = e + o / 2;
  return { x: d - a / 2, y: f - c / 2, width: a, height: c };
}
function Vt(t, e) {
  if (t.length === 0)
    return { x: 0, y: 0, width: 0, height: 0 };
  let n = 1 / 0, o = 1 / 0, i = -1 / 0, r = -1 / 0;
  for (const s of t) {
    const l = s.dimensions?.width ?? ve, a = s.dimensions?.height ?? _e, c = Yt(s, e), d = s.rotation ? uo(c.x, c.y, l, a, s.rotation) : { x: c.x, y: c.y, width: l, height: a };
    n = Math.min(n, d.x), o = Math.min(o, d.y), i = Math.max(i, d.x + d.width), r = Math.max(r, d.y + d.height);
  }
  return {
    x: n,
    y: o,
    width: i - n,
    height: r - o
  };
}
function _u(t, e, n) {
  const o = e.x + e.width, i = e.y + e.height;
  return t.filter((r) => {
    const s = r.dimensions?.width ?? ve, l = r.dimensions?.height ?? _e, a = Yt(r, n), c = r.rotation ? uo(a.x, a.y, s, l, r.rotation) : { x: a.x, y: a.y, width: s, height: l }, d = c.x + c.width, f = c.y + c.height;
    return !(d < e.x || c.x > o || f < e.y || c.y > i);
  });
}
function bu(t, e, n) {
  const o = e.x + e.width, i = e.y + e.height;
  return t.filter((r) => {
    const s = r.dimensions?.width ?? ve, l = r.dimensions?.height ?? _e, a = Yt(r, n), c = r.rotation ? uo(a.x, a.y, s, l, r.rotation) : { x: a.x, y: a.y, width: s, height: l };
    return c.x >= e.x && c.y >= e.y && c.x + c.width <= o && c.y + c.height <= i;
  });
}
function Yn(t, e, n, o, i, r = 0.1) {
  const s = Math.max(t.width, 1), l = Math.max(t.height, 1), a = s * (1 + r), c = l * (1 + r), d = e / a, f = n / c, u = Math.min(Math.max(Math.min(d, f), o), i), h = { x: t.x + s / 2, y: t.y + l / 2 }, g = e / 2 - h.x * u, p = n / 2 - h.y * u;
  return { x: g, y: p, zoom: u };
}
function xu(t, e, n, o) {
  const i = 1 / t.zoom;
  return {
    minX: (0 - t.x) * i - o,
    minY: (0 - t.y) * i - o,
    maxX: (e - t.x) * i + o,
    maxY: (n - t.y) * i + o
  };
}
function Yt(t, e) {
  if (!t.position) return { x: 0, y: 0 };
  const n = t.nodeOrigin ?? e ?? [0, 0], o = t.dimensions?.width ?? ve, i = t.dimensions?.height ?? _e;
  return {
    x: t.position.x - o * n[0],
    y: t.position.y - i * n[1]
  };
}
let fr = !1;
function hr(t) {
  fr = t;
}
function B(t, e, n) {
  if (!fr) return;
  const o = `%c[AlpineFlow:${t}]`, i = Eu(t);
  n !== void 0 ? console.log(o, i, e, n) : console.log(o, i, e);
}
function Eu(t) {
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
const fn = "#64748b", li = "#d4d4d8", gr = "#ef4444", Cu = "2", Su = "6 3", qi = 1.2, Vo = 0.2, Dn = 5, Xi = 25;
function yo(t) {
  return JSON.parse(JSON.stringify(t));
}
class ku {
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
    this._suspendDepth > 0 || (this.past.push(yo(e)), this.future = [], this.past.length > this.maxSize && this.past.shift());
  }
  undo(e) {
    return this.past.length === 0 ? null : (this.future.push(yo(e)), this.past.pop());
  }
  redo(e) {
    return this.future.length === 0 ? null : (this.past.push(yo(e)), this.future.pop());
  }
  get canUndo() {
    return this.past.length > 0;
  }
  get canRedo() {
    return this.future.length > 0;
  }
}
const Pu = 16;
function Lu() {
  return typeof requestAnimationFrame == "function" ? {
    request: (t) => requestAnimationFrame(t),
    cancel: (t) => cancelAnimationFrame(t)
  } : {
    request: (t) => setTimeout(() => t(performance.now()), Pu),
    cancel: (t) => clearTimeout(t)
  };
}
class pr {
  constructor() {
    this._scheduler = Lu(), this._entries = [], this._postTickCallbacks = [], this._frameId = null, this._running = !1;
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
const Wn = new pr(), Mu = {
  linear: Ad,
  easeIn: Nd,
  easeOut: Id,
  easeInOut: $d,
  easeCubicIn: Dd,
  easeCubicOut: Rd,
  easeCubicInOut: lr,
  easeCircIn: qd,
  easeCircOut: Xd,
  easeCircInOut: Yd,
  easeSinIn: Hd,
  easeSinOut: Fd,
  easeSinInOut: Od,
  easeExpoIn: zd,
  easeExpoOut: Vd,
  easeExpoInOut: Bd,
  easeBounce: qn,
  easeBounceIn: eu,
  easeBounceInOut: tu,
  easeElastic: ru,
  easeElasticIn: su,
  easeElasticInOut: au,
  easeBack: iu,
  easeBackIn: nu,
  easeBackOut: ou
};
function mr(t) {
  const e = t ?? "auto";
  return e === !1 ? !1 : e === !0 ? !0 : typeof globalThis < "u" && globalThis.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches === !0;
}
function jn(t) {
  return typeof t == "function" ? t : Mu[t ?? "easeInOut"];
}
function tt(t, e, n) {
  return t + (e - t) * n;
}
function ci(t, e, n) {
  return $o(t, e)(n);
}
function hn(t) {
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
const Yi = /^(-?\d+\.?\d*)(px|em|rem|%|vh|vw|pt|cm|mm|in|ex|ch)?$/, Wi = /^(#|rgb|hsl)/;
function yr(t, e, n) {
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
    const a = Yi.exec(s), c = Yi.exec(l);
    if (a && c) {
      const d = parseFloat(a[1]), f = parseFloat(c[1]), u = c[2] ?? "", h = tt(d, f, n);
      o[r] = u ? `${h}${u}` : String(h);
      continue;
    }
    if (Wi.test(s) && Wi.test(l)) {
      o[r] = ci(s, l, n);
      continue;
    }
    o[r] = n < 0.5 ? s : l;
  }
  return o;
}
function Tu(t, e, n, o) {
  let i = tt(t.zoom, e.zoom, n);
  return o?.minZoom !== void 0 && (i = Math.max(i, o.minZoom)), o?.maxZoom !== void 0 && (i = Math.min(i, o.maxZoom)), {
    x: tt(t.x, e.x, n),
    y: tt(t.y, e.y, n),
    zoom: i
  };
}
class Au {
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
class Nu {
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
const Zt = {
  stiffness: 180,
  damping: 12,
  mass: 1,
  restVelocity: 0.01,
  restDisplacement: 0.01
};
function wr(t, e, n) {
  if (n <= 0)
    return;
  const o = e.stiffness ?? Zt.stiffness, i = e.damping ?? Zt.damping, r = e.mass ?? Zt.mass, s = t.value - t.target, l = (-o * s - i * t.velocity) / r;
  t.velocity += l * n, t.value += t.velocity * n, Math.abs(t.velocity) < (e.restVelocity ?? Zt.restVelocity) && Math.abs(t.value - t.target) < (e.restDisplacement ?? Zt.restDisplacement) && (t.value = t.target, t.velocity = 0, t.settled = !0);
}
const ji = {
  timeConstant: 350,
  restVelocity: 0.5
};
function di(t, e, n) {
  if (n <= 0)
    return;
  const o = e.timeConstant ?? ji.timeConstant, i = Math.exp(-n * 1e3 / o);
  t.velocity *= i, t.value += t.velocity * n, Math.abs(t.velocity) < ji.restVelocity && (t.velocity = 0, t.settled = !0, t.target = t.value);
}
function ui(t) {
  const e = t.lastIndexOf("."), n = t.lastIndexOf(":"), o = Math.max(e, n);
  if (o < 0) return null;
  const i = t.slice(o + 1);
  return i.length === 0 || i.length > 6 ? null : i;
}
function vr(t, e, n, o) {
  if (n <= 0)
    return;
  di(t, {
    velocity: t.velocity,
    power: e.power,
    timeConstant: e.timeConstant
  }, n);
  const i = o ? ui(o) : null;
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
function _r(t, e, n, o) {
  const i = ui(o), r = e.values.map(
    (g) => g[o] ?? (i ? g[i] : void 0) ?? t.value
  );
  if (r.length < 2) {
    t.value = r[0] ?? t.value, t.settled = !0;
    return;
  }
  const s = e.offsets ?? r.map((g, p) => p / (r.length - 1)), l = Math.max(0, Math.min(1, n));
  let a = 0;
  for (let g = 0; g < s.length - 1; g++)
    l >= s[g] && (a = g);
  const c = s[a], d = s[a + 1] ?? 1, f = d > c ? (l - c) / (d - c) : 1, u = r[a], h = r[a + 1] ?? r[a];
  t.value = u + (h - u) * Math.max(0, Math.min(1, f)), l >= 1 && (t.value = r[r.length - 1], t.settled = !0);
}
const Ui = {
  gentle: { type: "spring", stiffness: 120, damping: 14 },
  wobbly: { type: "spring", stiffness: 180, damping: 12 },
  stiff: { type: "spring", stiffness: 300, damping: 30 },
  slow: { type: "spring", stiffness: 60, damping: 15 },
  molasses: { type: "spring", stiffness: 40, damping: 30 }
}, Zi = {
  smooth: { type: "decay", velocity: 0, power: 0.6, timeConstant: 400 },
  snappy: { type: "decay", velocity: 0, power: 1.2, timeConstant: 200 }
}, Ki = {
  momentum: { type: "inertia", velocity: 0, power: 0.8, timeConstant: 700 },
  rails: { type: "inertia", velocity: 0, bounceStiffness: 500, bounceDamping: 40 }
};
function br(t) {
  if (typeof t != "string")
    return t;
  const [e, n] = t.split(".");
  if (!n)
    return null;
  switch (e) {
    case "spring":
      return Ui[n] ? { ...Ui[n] } : null;
    case "decay":
      return Zi[n] ? { ...Zi[n] } : null;
    case "inertia":
      return Ki[n] ? { ...Ki[n] } : null;
    default:
      return null;
  }
}
function Gi(t) {
  return typeof t != "string" ? !1 : /^(#|rgb|hsl)/.test(t);
}
function Iu(t, e, n) {
  return typeof t == "number" && typeof e == "number" ? tt(t, e, n) : Gi(t) && Gi(e) ? ci(t, e, n) : n < 0.5 ? t : e;
}
class $u {
  constructor(e) {
    this._ownership = /* @__PURE__ */ new Map(), this._groups = /* @__PURE__ */ new Set(), this._nextGroupId = 0, this._registry = new Au(), this._activeTransaction = null, this._engine = e;
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
    const e = new Nu();
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
      whileStopMode: g = "jump-end",
      motion: p,
      maxDuration: y = 5e3
    } = n, m = jn(i), C = p ? br(p) : void 0;
    for (const x of e) {
      const N = this._ownership.get(x.key);
      if (N && !N.stopped) {
        const A = N.currentValues.get(x.key);
        A !== void 0 && (x.from = A), N.entries = N.entries.filter((O) => O.key !== x.key), N.entries.length === 0 && this._stop(N, "superseded");
      }
    }
    if (this._activeTransaction && this._activeTransaction.state === "active")
      for (const x of e)
        this._activeTransaction.captureProperty(x.key, x.from, x.apply);
    if (o <= 0) {
      const x = /* @__PURE__ */ new Map(), N = /* @__PURE__ */ new Map();
      for (const U of e)
        x.set(U.key, U.from), N.set(U.key, U.to);
      a?.();
      for (const U of e)
        U.apply(U.to);
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
          return N;
        },
        finished: Promise.resolve(),
        get _snapshot() {
          return x;
        },
        get _target() {
          return N;
        }
      };
      return this._registry.register(O), queueMicrotask(() => this._registry.unregister(O)), this._activeTransaction && this._activeTransaction.state === "active" && this._activeTransaction.trackHandle(O), d?.(), O;
    }
    const T = /* @__PURE__ */ new Map(), b = /* @__PURE__ */ new Map();
    for (const x of e)
      T.set(x.key, x.from), b.set(x.key, x.to);
    let M;
    if (C) {
      M = /* @__PURE__ */ new Map();
      for (const x of e) {
        if (typeof x.from != "number" || typeof x.to != "number") {
          console.warn(
            `[AlpineFlow] motion: requires numeric properties. "${x.key}" is non-numeric; snapping to target.`
          ), x.apply(x.to);
          continue;
        }
        let N = 0;
        if (C.type === "decay" || C.type === "inertia") {
          const A = C.velocity;
          if (typeof A == "number")
            N = A;
          else if (A && typeof A == "object") {
            const U = A, S = ui(x.key);
            N = U[x.key] ?? (S ? U[S] ?? 0 : 0);
          }
          const O = C.power ?? 0.8;
          N *= O;
        }
        M.set(x.key, {
          value: x.from,
          velocity: N,
          target: x.to,
          settled: !1
        });
      }
      M.size === 0 && (M = void 0);
    }
    const P = s === "ping-pong" ? "reverse" : s, L = l === "end" ? "backward" : "forward";
    let $;
    const _ = new Promise((x) => {
      $ = x;
    }), E = {
      _id: this._nextGroupId++,
      entries: [...e],
      engineHandle: null,
      startTime: 0,
      pausedElapsed: null,
      _resumeNeeded: !1,
      direction: L,
      duration: o,
      easingFn: m,
      loop: P,
      onStart: a,
      startFired: !1,
      onProgress: c,
      onComplete: d,
      resolve: $,
      stopped: !1,
      isFinished: !1,
      currentValues: /* @__PURE__ */ new Map(),
      _lastElapsed: 0,
      _lastTickWallTime: 0,
      snapshot: T,
      target: b,
      _currentFinished: _,
      whilePredicate: h,
      whileStopMode: g,
      motionConfig: M ? C : void 0,
      physicsStates: M,
      maxDuration: y,
      isPhysics: !!M,
      _prevElapsed: 0
    };
    if (l === "end")
      for (const x of E.entries)
        x.apply(x.to), E.currentValues.set(x.key, x.to);
    else
      for (const x of E.entries)
        E.currentValues.set(x.key, x.from);
    for (const x of e)
      this._ownership.set(x.key, E);
    this._groups.add(E);
    const v = this._engine.register((x) => this._tick(E, x), r);
    E.engineHandle = v;
    const w = [...f ? [f] : [], ...u ?? []], D = {
      _tags: w.length > 0 ? w : void 0,
      pause: () => this._pause(E),
      resume: () => this._resume(E),
      stop: (x) => this._stop(E, x?.mode ?? "jump-end"),
      reverse: () => this._reverse(E),
      play: () => this._play(E),
      playForward: () => this._playDirection(E, "forward"),
      playBackward: () => this._playDirection(E, "backward"),
      restart: (x) => this._restart(E, x),
      get direction() {
        return E.direction;
      },
      get isFinished() {
        return E.isFinished;
      },
      get currentValue() {
        return E.currentValues;
      },
      get finished() {
        return E._currentFinished;
      },
      get _snapshot() {
        return E.snapshot;
      },
      get _target() {
        return E.target;
      }
    };
    return this._registry.register(D), E._handle = D, this._activeTransaction && this._activeTransaction.state === "active" && this._activeTransaction.trackHandle(D), D;
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
      const a = Iu(l.from, l.to, s);
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
              wr(d, e.motionConfig, i);
              break;
            case "decay":
              di(d, e.motionConfig, i);
              break;
            case "inertia":
              vr(d, e.motionConfig, i, c.key);
              break;
            case "keyframes": {
              const f = n - e.startTime, u = e.motionConfig.duration ?? e.maxDuration, h = Math.min(f / u, 1);
              _r(d, e.motionConfig, h, c.key);
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
const xr = /* @__PURE__ */ new Map();
function Du(t, e) {
  xr.set(t, e);
}
function wo(t) {
  return t.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function It(t) {
  return typeof t == "string" ? { type: t } : t;
}
function $t(t, e) {
  return `${e}__${t.type}__${(t.color ?? li).replace(/[^a-zA-Z0-9]/g, "_")}`;
}
function Un(t, e) {
  const n = wo(t.color ?? li), o = Number(t.width ?? 12.5), i = Number(t.height ?? 12.5), r = Number.isFinite(o) && o > 0 ? o : 12.5, s = Number.isFinite(i) && i > 0 ? i : 12.5, l = wo(t.orient ?? "auto-start-reverse"), a = wo(e);
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
  const c = xr.get(t.type);
  return c ? c({ id: a, color: n, width: r, height: s, orient: l }) : Un({ ...t, type: "arrowclosed" }, e);
}
const mt = 200, yt = 150, Ru = 1.2, Kt = "http://www.w3.org/2000/svg";
function Hu(t, e) {
  const { getState: n, setViewport: o, config: i } = e, r = i.minimapPosition ?? "bottom-right", s = i.minimapMaskColor, l = i.minimapNodeColor, a = document.createElement("div");
  a.className = `flow-minimap flow-minimap-${r}`;
  const c = document.createElementNS(Kt, "svg");
  c.setAttribute("width", String(mt)), c.setAttribute("height", String(yt));
  const d = document.createElementNS(Kt, "rect");
  d.classList.add("flow-minimap-bg"), d.setAttribute("width", String(mt)), d.setAttribute("height", String(yt));
  const f = document.createElementNS(Kt, "g");
  f.classList.add("flow-minimap-nodes");
  const u = document.createElementNS(Kt, "path");
  u.classList.add("flow-minimap-mask"), s && u.setAttribute("fill", s), u.setAttribute("fill-rule", "evenodd"), c.appendChild(d), c.appendChild(f), c.appendChild(u), a.appendChild(c), t.appendChild(a);
  let h = { x: 0, y: 0, width: 0, height: 0 }, g = 1;
  function p() {
    const v = n();
    if (h = Vt(v.nodes.filter((w) => !w.hidden), i.nodeOrigin), h.width === 0 && h.height === 0) {
      g = 1;
      return;
    }
    g = Math.max(
      h.width / mt,
      h.height / yt
    ) * Ru;
  }
  function y(v) {
    return typeof l == "function" ? l(v) : l;
  }
  function m() {
    const v = n();
    p(), f.innerHTML = "";
    const w = (mt - h.width / g) / 2, D = (yt - h.height / g) / 2;
    for (const x of v.nodes) {
      if (x.hidden) continue;
      const N = document.createElementNS(Kt, "rect"), A = (x.dimensions?.width ?? ve) / g, O = (x.dimensions?.height ?? _e) / g, U = (x.position.x - h.x) / g + w, S = (x.position.y - h.y) / g + D;
      N.setAttribute("x", String(U)), N.setAttribute("y", String(S)), N.setAttribute("width", String(A)), N.setAttribute("height", String(O)), N.setAttribute("rx", "2");
      const k = y(x);
      k && (N.style.fill = k), f.appendChild(N);
    }
    C();
  }
  function C() {
    const v = n();
    if (h.width === 0 && h.height === 0) {
      u.setAttribute("d", "");
      return;
    }
    const w = (mt - h.width / g) / 2, D = (yt - h.height / g) / 2, x = (-v.viewport.x / v.viewport.zoom - h.x) / g + w, N = (-v.viewport.y / v.viewport.zoom - h.y) / g + D, A = v.containerWidth / v.viewport.zoom / g, O = v.containerHeight / v.viewport.zoom / g, U = `M0,0 H${mt} V${yt} H0 Z`, S = `M${x},${N} h${A} v${O} h${-A} Z`;
    u.setAttribute("d", `${U} ${S}`);
  }
  let T = !1;
  function b(v, w) {
    const D = (mt - h.width / g) / 2, x = (yt - h.height / g) / 2, N = (v - D) * g + h.x, A = (w - x) * g + h.y;
    return { x: N, y: A };
  }
  function M(v) {
    const w = c.getBoundingClientRect(), D = v.clientX - w.left, x = v.clientY - w.top, N = n(), A = b(D, x), O = -A.x * N.viewport.zoom + N.containerWidth / 2, U = -A.y * N.viewport.zoom + N.containerHeight / 2;
    o({ x: O, y: U, zoom: N.viewport.zoom });
  }
  function P(v) {
    i.minimapPannable && (T = !0, c.setPointerCapture(v.pointerId), M(v));
  }
  function L(v) {
    T && M(v);
  }
  function $(v) {
    T && (T = !1, c.releasePointerCapture(v.pointerId));
  }
  c.addEventListener("pointerdown", P), c.addEventListener("pointermove", L), c.addEventListener("pointerup", $);
  function _(v) {
    if (!i.minimapZoomable)
      return;
    v.preventDefault();
    const w = n(), D = i.minZoom ?? 0.5, x = i.maxZoom ?? 2, N = v.deltaY > 0 ? 0.9 : 1.1, A = Math.min(Math.max(w.viewport.zoom * N, D), x);
    o({ zoom: A });
  }
  c.addEventListener("wheel", _, { passive: !1 });
  function E() {
    c.removeEventListener("pointerdown", P), c.removeEventListener("pointermove", L), c.removeEventListener("pointerup", $), c.removeEventListener("wheel", _), a.remove();
  }
  return { render: m, updateViewport: C, destroy: E };
}
const Fu = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>', Ou = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>', zu = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>', Ji = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></svg>', Vu = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>', Bu = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>', Qi = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9V3h6"/><path d="M21 9V3h-6"/><path d="M3 15v6h6"/><path d="M21 15v6h-6"/></svg>', qu = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3v6H3"/><path d="M15 3v6h6"/><path d="M9 21v-6H3"/><path d="M15 21v-6h6"/></svg>';
function Xu(t, e) {
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
    onResetPanels: h,
    onToggleFullscreen: g
  } = e, p = document.createElement("div"), y = [
    "flow-controls",
    `flow-controls-${o}`
  ];
  a ? y.push("flow-controls-external") : y.push(`flow-controls-${n}`), p.className = y.join(" "), p.setAttribute("role", "toolbar"), p.setAttribute("aria-label", "Flow controls");
  let m = null, C = null;
  if (i) {
    const M = Ct(Fu, "Zoom in", c), P = Ct(Ou, "Zoom out", d);
    p.appendChild(M), p.appendChild(P);
  }
  if (r) {
    const M = Ct(zu, "Fit view", f);
    p.appendChild(M);
  }
  if (s && (m = Ct(Ji, "Toggle interactivity", u), p.appendChild(m)), l) {
    const M = Ct(Bu, "Reset panels", h);
    p.appendChild(M);
  }
  g && (C = Ct(Qi, "Toggle fullscreen", g), C.classList.add("flow-controls-button-fullscreen"), p.appendChild(C)), p.addEventListener("mousedown", (M) => M.stopPropagation()), p.addEventListener("pointerdown", (M) => M.stopPropagation()), p.addEventListener("wheel", (M) => M.stopPropagation(), { passive: !1 }), t.appendChild(p);
  function T(M) {
    if (m && typeof M.isInteractive == "boolean") {
      Bo(m, M.isInteractive ? Ji : Vu);
      const P = M.isInteractive ? "Lock interactivity" : "Unlock interactivity";
      m.title = P, m.setAttribute("aria-label", P);
    }
    if (C && typeof M.isFullscreen == "boolean") {
      Bo(C, M.isFullscreen ? qu : Qi);
      const P = M.isFullscreen ? "Exit fullscreen" : "Enter fullscreen";
      C.title = P, C.setAttribute("aria-label", P), C.classList.toggle("flow-controls-button-fullscreen--active", M.isFullscreen);
    }
  }
  function b() {
    p.remove();
  }
  return { update: T, destroy: b };
}
function Ct(t, e, n) {
  const o = document.createElement("button");
  return o.type = "button", Bo(o, t), o.title = e, o.setAttribute("aria-label", e), o.addEventListener("click", n), o;
}
function Bo(t, e) {
  const o = new DOMParser().parseFromString(e, "image/svg+xml").documentElement;
  t.replaceChildren(o);
}
const es = 5;
function Yu(t) {
  const e = document.createElement("div");
  e.className = "flow-selection-box", t.appendChild(e);
  let n = !1, o = 0, i = 0, r = 0, s = 0;
  function l(u, h, g = "partial") {
    o = u, i = h, r = u, s = h, n = !0, e.style.left = `${u}px`, e.style.top = `${h}px`, e.style.width = "0px", e.style.height = "0px", e.classList.remove("flow-selection-partial", "flow-selection-full"), e.classList.add("flow-selection-box-active", `flow-selection-${g}`);
  }
  function a(u, h) {
    if (!n)
      return;
    r = u, s = h;
    const g = Math.min(o, r), p = Math.min(i, s), y = Math.abs(r - o), m = Math.abs(s - i);
    e.style.left = `${g}px`, e.style.top = `${p}px`, e.style.width = `${y}px`, e.style.height = `${m}px`;
  }
  function c(u) {
    if (!n)
      return null;
    n = !1, e.classList.remove("flow-selection-box-active"), e.classList.remove("flow-selection-partial", "flow-selection-full");
    const h = Math.abs(r - o), g = Math.abs(s - i);
    if (h < es && g < es)
      return null;
    const p = Math.min(o, r), y = Math.min(i, s), m = (p - u.x) / u.zoom, C = (y - u.y) / u.zoom, T = h / u.zoom, b = g / u.zoom;
    return { x: m, y: C, width: T, height: b };
  }
  function d() {
    return n;
  }
  function f() {
    e.remove();
  }
  return { start: l, update: a, end: c, isActive: d, destroy: f };
}
const ts = 3;
function Wu(t) {
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
    const u = i[i.length - 1], h = d - u.x, g = f - u.y;
    h * h + g * g < ts * ts || (i.push({ x: d, y: f }), n.setAttribute("points", i.map((p) => `${p.x},${p.y}`).join(" ")));
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
function fi(t, e, n) {
  if (n.length < 3) return !1;
  let o = !1;
  for (let i = 0, r = n.length - 1; i < n.length; r = i++) {
    const s = n[i].x, l = n[i].y, a = n[r].x, c = n[r].y;
    l > e != c > e && t < (a - s) * (e - l) / (c - l) + s && (o = !o);
  }
  return o;
}
function ju(t, e, n, o, i, r, s, l) {
  const a = n - t, c = o - e, d = s - i, f = l - r, u = a * f - c * d;
  if (Math.abs(u) < 1e-10) return !1;
  const h = i - t, g = r - e, p = (h * f - g * d) / u, y = (h * c - g * a) / u;
  return p >= 0 && p <= 1 && y >= 0 && y <= 1;
}
function Uu(t, e) {
  const n = e.x, o = e.y, i = e.x + e.width, r = e.y + e.height, s = n + e.width / 2, l = o + e.height / 2;
  if (fi(s, l, t)) return !0;
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
    for (const [f, u, h, g] of a)
      if (ju(t[d].x, t[d].y, t[c].x, t[c].y, f, u, h, g))
        return !0;
  return !1;
}
function Er(t) {
  const e = t.dimensions?.width ?? ve, n = t.dimensions?.height ?? _e;
  return t.rotation ? uo(t.position.x, t.position.y, e, n, t.rotation) : { x: t.position.x, y: t.position.y, width: e, height: n };
}
function Zu(t, e) {
  return e.length < 3 ? [] : t.filter((n) => {
    if (n.hidden || n.selectable === !1) return !1;
    const o = Er(n);
    return Uu(e, o);
  });
}
function Ku(t, e) {
  return e.length < 3 ? [] : t.filter((n) => {
    if (n.hidden || n.selectable === !1) return !1;
    const o = Er(n);
    return [
      { x: o.x, y: o.y },
      { x: o.x + o.width, y: o.y },
      { x: o.x + o.width, y: o.y + o.height },
      { x: o.x, y: o.y + o.height }
    ].every((r) => fi(r.x, r.y, e));
  });
}
function Gu(t, e) {
  return e.filter((n) => n.source === t || n.target === t);
}
function qo(t, e, n) {
  const o = new Set(
    n.filter((i) => i.source === t).map((i) => i.target)
  );
  return e.filter((i) => o.has(i.id));
}
function Ju(t, e, n) {
  const o = new Set(
    n.filter((i) => i.target === t).map((i) => i.source)
  );
  return e.filter((i) => o.has(i.id));
}
function Qu(t, e, n) {
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
function ef(t, e, n, o = !1) {
  return n.some((i) => o ? i.source === t && i.target === e : i.source === t && i.target === e || i.source === e && i.target === t);
}
function tf(t, e, n) {
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
          const g = `${u.source}|${h.target}|${u.sourceHandle ?? ""}|${h.targetHandle ?? ""}`;
          if (i.has(g) || s.has(g)) continue;
          const p = {
            id: `reconnect-${u.source}-${h.target}-${l++}`,
            source: u.source,
            target: h.target,
            sourceHandle: u.sourceHandle,
            targetHandle: h.targetHandle
          };
          u.type && (p.type = u.type), u.animated !== void 0 && (p.animated = u.animated), u.style && (p.style = u.style), u.class && (p.class = u.class), u.markerEnd && (p.markerEnd = u.markerEnd), u.markerStart && (p.markerStart = u.markerStart), u.label && (p.label = u.label), s.add(g), r.push(p);
        }
  }
  return r;
}
function Je(t, e, n) {
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
function Qe(t, e, n) {
  return !(t.source === t.target || e.some(
    (i) => i.source === t.source && i.target === t.target && i.sourceHandle === t.sourceHandle && i.targetHandle === t.targetHandle
  ) || n?.preventCycles && Qu(t.source, t.target, e));
}
const lt = "_flowHandleValidate";
function nf(t) {
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
        typeof l == "function" ? e[lt] = l : (delete e[lt], requestAnimationFrame(() => {
          const a = t.$data(e);
          a && typeof a[n] == "function" && (e[lt] = a[n]);
        }));
      }
      i(() => {
        s();
      }), r(() => {
        delete e[lt];
      });
    }
  );
}
const bt = "_flowHandleLimit";
function of(t) {
  t.directive(
    "flow-handle-limit",
    (e, { expression: n }, { evaluate: o, effect: i, cleanup: r }) => {
      i(() => {
        const s = Number(o(n));
        s > 0 ? e[bt] = s : delete e[bt];
      }), r(() => {
        delete e[bt];
      });
    }
  );
}
const Dt = "_flowHandleConnectableStart", ct = "_flowHandleConnectableEnd";
function sf(t) {
  t.directive(
    "flow-handle-connectable",
    (e, { expression: n, modifiers: o }, { evaluate: i, effect: r, cleanup: s }) => {
      const l = o.includes("start"), a = o.includes("end"), c = l || !l && !a, d = a || !l && !a;
      r(() => {
        const f = n ? !!i(n) : !0;
        c && (e[Dt] = f), d && (e[ct] = f);
      }), s(() => {
        delete e[Dt], delete e[ct];
      });
    }
  );
}
function yn(t, e, n = !0) {
  return e !== void 0 ? e : t.locked ? !1 : n;
}
function Cr(t) {
  return yn(t, t.draggable);
}
function rf(t) {
  return yn(t, t.deletable);
}
function Oe(t) {
  return yn(t, t.connectable);
}
function Xo(t) {
  return yn(t, t.selectable);
}
function ns(t) {
  return yn(t, t.resizable);
}
function Bt(t, e, n, o, i, r, s) {
  const l = n - t, a = o - e, c = i - n, d = r - o;
  if (l === 0 && c === 0 || a === 0 && d === 0)
    return `L${n},${o}`;
  const f = Math.sqrt(l * l + a * a), u = Math.sqrt(c * c + d * d), h = Math.min(s, f / 2, u / 2), g = n - l / f * h, p = o - a / f * h, y = n + c / u * h, m = o + d / u * h;
  return `L${g},${p} Q${n},${o} ${y},${m}`;
}
function wn({
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
function kn(t, e) {
  return t >= 0 ? 0.5 * t : e * 25 * Math.sqrt(-t);
}
function af({
  sourceX: t,
  sourceY: e,
  sourcePosition: n = "bottom",
  targetX: o,
  targetY: i,
  targetPosition: r = "top",
  curvature: s = 0.25
}) {
  const l = n === "left" || n === "right", a = r === "left" || r === "right", c = l ? t + (n === "right" ? 1 : -1) * kn(
    n === "right" ? o - t : t - o,
    s
  ) : t, d = l ? e : e + (n === "bottom" ? 1 : -1) * kn(
    n === "bottom" ? i - e : e - i,
    s
  ), f = a ? o + (r === "right" ? 1 : -1) * kn(
    r === "right" ? t - o : o - t,
    s
  ) : o, u = a ? i : i + (r === "bottom" ? 1 : -1) * kn(
    r === "bottom" ? e - i : i - e,
    s
  );
  return [c, d, f, u];
}
function Zn(t) {
  const { sourceX: e, sourceY: n, targetX: o, targetY: i } = t, [r, s, l, a] = af(t), c = `M${e},${n} C${r},${s} ${l},${a} ${o},${i}`, { x: d, y: f, offsetX: u, offsetY: h } = wn({ sourceX: e, sourceY: n, targetX: o, targetY: i });
  return {
    path: c,
    labelPosition: { x: d, y: f },
    labelOffsetX: u,
    labelOffsetY: h
  };
}
function Dm({
  sourceX: t,
  sourceY: e,
  targetX: n,
  targetY: o
}) {
  const i = (t + n) / 2, r = `M${t},${e} C${i},${e} ${i},${o} ${n},${o}`, { x: s, y: l, offsetX: a, offsetY: c } = wn({ sourceX: t, sourceY: e, targetX: n, targetY: o });
  return {
    path: r,
    labelPosition: { x: s, y: l },
    labelOffsetX: a,
    labelOffsetY: c
  };
}
function os(t) {
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
function lf(t, e, n, o, i, r, s) {
  const l = os(n), a = os(r), c = t + l.x * s, d = e + l.y * s, f = o + a.x * s, u = i + a.y * s, h = n === "left" || n === "right";
  if (h === (r === "left" || r === "right")) {
    const p = (c + f) / 2, y = (d + u) / 2;
    return h ? [
      [c, e],
      [p, e],
      [p, i],
      [f, i]
    ] : [
      [t, d],
      [t, y],
      [o, y],
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
function gn({
  sourceX: t,
  sourceY: e,
  sourcePosition: n = "bottom",
  targetX: o,
  targetY: i,
  targetPosition: r = "top",
  borderRadius: s = 5,
  offset: l = 10
}) {
  const a = lf(
    t,
    e,
    n,
    o,
    i,
    r,
    l
  );
  let c = `M${t},${e}`;
  for (let g = 0; g < a.length; g++) {
    const [p, y] = a[g];
    if (s > 0 && g > 0 && g < a.length - 1) {
      const [m, C] = g === 1 ? [t, e] : a[g - 1], [T, b] = a[g + 1];
      c += ` ${Bt(m, C, p, y, T, b, s)}`;
    } else
      c += ` L${p},${y}`;
  }
  c += ` L${o},${i}`;
  const { x: d, y: f, offsetX: u, offsetY: h } = wn({ sourceX: t, sourceY: e, targetX: o, targetY: i });
  return {
    path: c,
    labelPosition: { x: d, y: f },
    labelOffsetX: u,
    labelOffsetY: h
  };
}
function cf(t) {
  return gn({ ...t, borderRadius: 0 });
}
function Sr({
  sourceX: t,
  sourceY: e,
  targetX: n,
  targetY: o
}) {
  const i = `M${t},${e} L${n},${o}`, { x: r, y: s, offsetX: l, offsetY: a } = wn({ sourceX: t, sourceY: e, targetX: n, targetY: o });
  return {
    path: i,
    labelPosition: { x: r, y: s },
    labelOffsetX: l,
    labelOffsetY: a
  };
}
const st = 40;
function df(t, e, n, o) {
  let i = 0, r = 0;
  const s = t - n.left, l = n.right - t, a = e - n.top, c = n.bottom - e;
  return s < st && s >= 0 ? i = -o * (1 - s / st) : l < st && l >= 0 && (i = o * (1 - l / st)), a < st && a >= 0 ? r = -o * (1 - a / st) : c < st && c >= 0 && (r = o * (1 - c / st)), { dx: i, dy: r };
}
function kr(t) {
  const { container: e, speed: n, onPan: o } = t;
  let i = null, r = 0, s = 0, l = !1;
  function a() {
    if (!l)
      return;
    const c = e.getBoundingClientRect(), { dx: d, dy: f } = df(r, s, c, n);
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
function Rt(t) {
  const e = t.connectionLineType ?? "straight", o = {
    stroke: (t.invalid ? (t.containerEl ? getComputedStyle(t.containerEl).getPropertyValue("--flow-connection-line-invalid").trim() : "") || gr : null) ?? t.connectionLineStyle?.stroke ?? ((t.containerEl ? getComputedStyle(t.containerEl).getPropertyValue("--flow-edge-stroke-selected").trim() : "") || fn),
    strokeWidth: t.connectionLineStyle?.strokeWidth ?? Number(Cu),
    strokeDasharray: t.connectionLineStyle?.strokeDasharray ?? Su
  }, i = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  i.setAttribute("class", "flow-connect-line"), i.style.cssText = "position:absolute;top:0;left:0;width:1px;height:1px;overflow:visible;pointer-events:none;z-index:1000;";
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
    let g;
    switch (e) {
      case "bezier": {
        g = Zn({ sourceX: d, sourceY: f, targetX: u, targetY: h }).path;
        break;
      }
      case "smoothstep": {
        g = gn({ sourceX: d, sourceY: f, targetX: u, targetY: h }).path;
        break;
      }
      case "step": {
        g = cf({ sourceX: d, sourceY: f, targetX: u, targetY: h }).path;
        break;
      }
      default: {
        g = Sr({ sourceX: d, sourceY: f, targetX: u, targetY: h }).path;
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
function on(t) {
  if (t.connectionSnapRadius <= 0)
    return { element: null, position: t.cursorFlowPos };
  const e = t.connectionMode === "loose" ? "[data-flow-handle-type]" : `[data-flow-handle-type="${t.handleType}"]`, n = t.containerEl.querySelectorAll(e);
  let o = null, i = t.cursorFlowPos, r = t.connectionSnapRadius;
  return n.forEach((s) => {
    const l = s, a = l.closest("[x-flow-node]");
    if (!a || a.dataset.flowNodeId === t.excludeNodeId || t.targetNodeId && a.dataset.flowNodeId !== t.targetNodeId) return;
    const c = a.dataset.flowNodeId;
    if (c) {
      const g = t.getNode(c);
      if (g && !Oe(g)) return;
    }
    const d = t.handleType === "target" ? ct : Dt;
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
function Kn(t, e, n, o) {
  if (e._config?.autoPanOnConnect === !1) return null;
  const i = kr({
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
let tn = 0;
const Pn = /* @__PURE__ */ new WeakMap();
function Xe(t, e) {
  const n = t.querySelector(
    `[data-flow-node-id="${CSS.escape(e.source)}"]`
  );
  if (n) {
    const i = e.sourceHandle ?? "source", r = n.querySelector(
      `[data-flow-handle-id="${CSS.escape(i)}"][data-flow-handle-type="source"]`
    ) ?? n.querySelector(`[data-flow-handle-id="${CSS.escape(i)}"]`);
    if (r?.[lt] && !r[lt](e))
      return !1;
  }
  const o = t.querySelector(
    `[data-flow-node-id="${CSS.escape(e.target)}"]`
  );
  if (o) {
    const i = e.targetHandle ?? "target", r = o.querySelector(
      `[data-flow-handle-id="${CSS.escape(i)}"][data-flow-handle-type="target"]`
    ) ?? o.querySelector(`[data-flow-handle-id="${CSS.escape(i)}"]`);
    if (r?.[lt] && !r[lt](e))
      return !1;
  }
  return !0;
}
function Ye(t, e, n) {
  const o = t.querySelector(
    `[data-flow-node-id="${CSS.escape(e.source)}"]`
  );
  if (o) {
    const r = e.sourceHandle ?? "source", s = o.querySelector(
      `[data-flow-handle-id="${CSS.escape(r)}"][data-flow-handle-type="source"]`
    ) ?? o.querySelector(`[data-flow-handle-id="${CSS.escape(r)}"]`);
    if (s?.[bt] && n.filter(
      (a) => a.source === e.source && (a.sourceHandle ?? "source") === (e.sourceHandle ?? "source")
    ).length >= s[bt])
      return !1;
  }
  const i = t.querySelector(
    `[data-flow-node-id="${CSS.escape(e.target)}"]`
  );
  if (i) {
    const r = e.targetHandle ?? "target", s = i.querySelector(
      `[data-flow-handle-id="${CSS.escape(r)}"][data-flow-handle-type="target"]`
    ) ?? i.querySelector(`[data-flow-handle-id="${CSS.escape(r)}"]`);
    if (s?.[bt] && n.filter(
      (a) => a.target === e.target && (a.targetHandle ?? "target") === (e.targetHandle ?? "target")
    ).length >= s[bt])
      return !1;
  }
  return !0;
}
function sn(t, e, n, o, i) {
  const r = i ? o.edges.filter((l) => l.id !== i) : o.edges, s = t.querySelectorAll('[data-flow-handle-type="target"]');
  for (const l of s) {
    const c = l.closest("[x-flow-node]")?.dataset.flowNodeId;
    if (!c) continue;
    const d = l.dataset.flowHandleId ?? "target";
    if (l[ct] === !1) {
      l.classList.add("flow-handle-invalid"), l.classList.remove("flow-handle-valid", "flow-handle-limit-reached");
      continue;
    }
    const f = {
      source: e,
      sourceHandle: n,
      target: c,
      targetHandle: d
    }, h = o.getNode(c)?.connectable !== !1 && Qe(f, r, { preventCycles: o._config?.preventCycles }), g = h && Ye(t, f, r);
    g && Xe(t, f) && (!o._config?.isValidConnection || o._config.isValidConnection(f)) ? (l.classList.add("flow-handle-valid"), l.classList.remove("flow-handle-invalid", "flow-handle-limit-reached")) : (l.classList.add("flow-handle-invalid"), l.classList.remove("flow-handle-valid"), h && !g ? l.classList.add("flow-handle-limit-reached") : l.classList.remove("flow-handle-limit-reached"));
  }
}
function Pe(t) {
  const e = t.querySelectorAll('[data-flow-handle-type="target"]');
  for (const n of e)
    n.classList.remove("flow-handle-valid", "flow-handle-invalid", "flow-handle-limit-reached");
}
function vt(t, e) {
  t && (e ? t.classList.add("flow-connect-line--validating") : t.classList.remove("flow-connect-line--validating"));
}
function Me(t, e) {
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
async function Gn(t, e, n, o, i, r) {
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
  const l = typeof s == "boolean" ? s : !!s?.allowed, a = typeof s == "object" && s && "reason" in s ? s.reason : void 0;
  return i.dispatchEvent(new CustomEvent("flow-connect-validated", {
    detail: { connection: e, allowed: l, reason: a },
    bubbles: !0
  })), { allowed: l, reason: a };
}
async function Pr(t) {
  const { edge: e, newConnection: n, canvas: o, containerEl: i } = t, r = t.endpoint ?? "target", s = o.edges.filter(
    (c) => c.id !== e.id
  ), l = (c) => (Me(i, {
    source: n.source,
    target: n.target,
    sourceHandle: n.sourceHandle,
    targetHandle: n.targetHandle,
    reason: c
  }), { applied: !1, reason: c });
  if (!Qe(n, s, { preventCycles: o._config?.preventCycles }) || !Je(n, o._config?.connectionRules, o._nodeMap) || !Ye(i, n, s) || !Xe(i, n) || o._config?.isValidConnection && !o._config.isValidConnection(n))
    return l();
  const a = o._config?.connectValidator;
  if (a) {
    const c = o._config?.validatingHandleClass ?? "flow-handle-validating", { sourceEl: d, targetEl: f } = Jn(i, n);
    o._connectValidating = !0;
    let u;
    try {
      u = await Gn(
        a,
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
      return l(u.reason);
  }
  return o._captureHistory?.(), r === "source" ? (e.source = n.source, e.sourceHandle = n.sourceHandle) : (e.target = n.target, e.targetHandle = n.targetHandle), { applied: !0 };
}
async function uf(t) {
  const { connection: e, canvas: n, containerEl: o } = t, i = n.edges, r = (d) => (Me(o, {
    source: e.source,
    target: e.target,
    sourceHandle: e.sourceHandle,
    targetHandle: e.targetHandle,
    reason: d
  }), { applied: !1, reason: d }), s = n.getNode?.(e.target);
  if (s && !Oe(s) || !Qe(e, i, { preventCycles: n._config?.preventCycles }) || !Je(e, n._config?.connectionRules, n._nodeMap) || !Ye(o, e, i) || !Xe(o, e) || n._config?.isValidConnection && !n._config.isValidConnection(e))
    return r();
  const l = n._config?.connectValidator;
  if (l) {
    const d = n._config?.validatingHandleClass ?? "flow-handle-validating", { sourceEl: f, targetEl: u } = Jn(o, e);
    n._connectValidating = !0;
    let h;
    try {
      h = await Gn(
        l,
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
  const c = { id: `e-${e.source}-${e.target}-${Date.now()}-${tn++}`, ...e };
  return n.addEdges(c), n._emit?.("connect", { connection: e }), { applied: !0, edge: c };
}
function Jn(t, e) {
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
function ff(t) {
  t.directive(
    "flow-handle",
    (e, { value: n, modifiers: o, expression: i }, { evaluate: r, effect: s, cleanup: l }) => {
      const a = n === "source" ? "source" : "target", c = o.includes("top"), d = o.includes("bottom"), f = o.includes("left"), u = o.includes("right"), h = c || d || f || u;
      let g;
      c && f ? g = "top-left" : c && u ? g = "top-right" : d && f ? g = "bottom-left" : d && u ? g = "bottom-right" : c ? g = "top" : u ? g = "right" : d ? g = "bottom" : f ? g = "left" : g = e.getAttribute("data-flow-handle-position") ?? (a === "source" ? "bottom" : "top");
      let p, y = !1;
      if (i) {
        const b = r(i);
        b && typeof b == "object" && !Array.isArray(b) ? (p = b.id || e.getAttribute("data-flow-handle-id") || a, b.position && (g = b.position, y = !0)) : p = b || e.getAttribute("data-flow-handle-id") || a;
      } else
        p = e.getAttribute("data-flow-handle-id") || a;
      if (o.includes("hidden") && (e.style.display = "none"), e.dataset.flowHandleType = a, e.dataset.flowHandlePosition = g, e.dataset.flowHandleId = p, h && (e.dataset.flowHandleExplicit = "true"), y && i && (e.dataset.flowHandleExplicit = "true", s(() => {
        const b = r(i);
        b && typeof b == "object" && !Array.isArray(b) && b.position && (e.dataset.flowHandlePosition = b.position);
      })), !h && !y) {
        const b = () => {
          const P = e.closest("[x-flow-node]")?.dataset.flowNodeId;
          if (!P) return;
          const L = e.closest("[x-data]");
          return L ? t.$data(L)?.getNode?.(P) : void 0;
        };
        s(() => {
          const M = b();
          if (!M) return;
          const P = a === "source" ? M.sourcePosition : M.targetPosition;
          P && (e.dataset.flowHandlePosition = P);
        });
      }
      e.classList.add("flow-handle", `flow-handle-${a}`);
      const m = () => {
        const b = e.closest("[x-flow-node]");
        return b ? b.getAttribute("data-flow-node-id") ?? null : null;
      }, C = () => {
        const b = e.closest("[x-data]");
        return b ? t.$data(b) : null;
      };
      let T = null;
      if (C()?._config?.keyboardConnect) {
        e.setAttribute("tabindex", "0"), e.setAttribute("role", "button"), e.setAttribute("aria-label", `${a} handle ${p}`);
        const M = ($) => {
          const _ = $?._pendingKeyboardConnect;
          if (!_) return;
          const E = e.closest(".flow-container");
          E && E.querySelector(
            `[data-flow-node-id="${CSS.escape(_.sourceNodeId)}"] [data-flow-handle-id="${CSS.escape(_.sourceHandleId)}"][data-flow-handle-type="source"]`
          )?.classList.remove("flow-handle-connect-pending"), $ && ($._pendingKeyboardConnect = null);
        }, P = ($) => {
          if (!($.key === "Enter" || $.key === " " || $.key === "Spacebar")) return;
          const E = C();
          if (!E || E._animationLocked) return;
          const v = m();
          if (v)
            if (a === "source") {
              const w = E.getNode?.(v);
              if (w && !Oe(w) || e[Dt] === !1) return;
              $.preventDefault(), $.stopPropagation(), M(E), E._pendingKeyboardConnect = {
                sourceNodeId: v,
                sourceHandleId: p
              }, e.classList.add("flow-handle-connect-pending"), E._announcer?.announce?.(`Connecting from ${a} handle ${p}. Focus a target handle and press Enter to connect.`);
            } else {
              if (!E._pendingKeyboardConnect) return;
              const w = E.getNode?.(v);
              if (w && !Oe(w) || e[ct] === !1) return;
              $.preventDefault(), $.stopPropagation();
              const { sourceNodeId: D, sourceHandleId: x } = E._pendingKeyboardConnect, N = {
                source: D,
                sourceHandle: x,
                target: v,
                targetHandle: p
              }, A = e.closest(".flow-container");
              if (M(E), !A) return;
              uf({ connection: N, canvas: E, containerEl: A }).then((O) => {
                O.applied && E._announcer?.announce?.(`Connected ${D} to ${v}.`);
              });
            }
        };
        e.addEventListener("keydown", P);
        const L = e.closest(".flow-container");
        if (L) {
          const $ = Pn.get(L);
          if ($)
            $.count += 1;
          else {
            const _ = (E) => {
              if (E.key !== "Escape") return;
              const v = L.matches("[x-data]") ? L : L.closest("[x-data]") ?? L.querySelector("[x-data]");
              if (!v) return;
              const w = t.$data(v);
              w?._pendingKeyboardConnect && M(w);
            };
            L.addEventListener("keydown", _), Pn.set(L, { count: 1, handler: _ });
          }
        }
        T = () => {
          if (e.removeEventListener("keydown", P), L) {
            const $ = Pn.get(L);
            $ && ($.count -= 1, $.count <= 0 && (L.removeEventListener("keydown", $.handler), Pn.delete(L)));
          }
          e.removeAttribute("tabindex"), e.removeAttribute("role"), e.removeAttribute("aria-label"), e.classList.remove("flow-handle-connect-pending");
        };
      }
      if (a === "source") {
        let b = null;
        const M = ($) => {
          $.preventDefault(), $.stopPropagation();
          const _ = C(), E = e.closest("[x-flow-node]");
          if (!_ || !E || _._animationLocked) return;
          const v = E.dataset.flowNodeId;
          if (!v) return;
          const w = _.getNode(v);
          if (w && !Oe(w) || e[Dt] === !1) return;
          const D = $.clientX, x = $.clientY;
          let N = !1;
          if (_.pendingConnection && _._config?.connectOnClick !== !1) {
            _._emit("connect-end", {
              connection: null,
              source: _.pendingConnection.source,
              sourceHandle: _.pendingConnection.sourceHandle,
              position: { x: 0, y: 0 }
            }), _.pendingConnection = null, _._container?.classList.remove("flow-connecting");
            const j = e.closest(".flow-container");
            j && Pe(j);
          }
          let A = null, O = null, U = null, S = null, k = null;
          const R = _._config?.connectionSnapRadius ?? 20, q = e.closest(".flow-container");
          let re = 0, te = 0, oe = !1, ae = /* @__PURE__ */ new Map();
          const de = () => {
            if (N = !0, B("connection", `Connection drag started from node "${v}" handle "${p}"`), _._emit("connect-start", { source: v, sourceHandle: p }), !q) return;
            O = Rt({
              connectionLineType: _._config?.connectionLineType,
              connectionLineStyle: _._config?.connectionLineStyle,
              connectionLine: _._config?.connectionLine,
              containerEl: q
            }), A = O.svg;
            const j = e.getBoundingClientRect(), Q = q.getBoundingClientRect(), H = _.viewport?.zoom || 1, I = _.viewport?.x || 0, ie = _.viewport?.y || 0;
            re = (j.left + j.width / 2 - Q.left - I) / H, te = (j.top + j.height / 2 - Q.top - ie) / H, O.update({ fromX: re, fromY: te, toX: re, toY: te, source: v, sourceHandle: p });
            const G = q.querySelector(".flow-viewport");
            if (G && G.appendChild(A), _.pendingConnection = {
              source: v,
              sourceHandle: p,
              position: { x: re, y: te }
            }, S = Kn(q, _, D, x), sn(q, v, p, _), _._config?.onEdgeDrop) {
              const ee = _._config.edgeDropPreview, Y = ee ? ee({ source: v, sourceHandle: p }) : "New Node";
              if (Y !== null) {
                k = document.createElement("div"), k.className = "flow-ghost-node";
                const V = document.createElement("div");
                if (V.className = "flow-ghost-handle", k.appendChild(V), typeof Y == "string") {
                  const z = document.createElement("span");
                  z.textContent = Y, k.appendChild(z);
                } else
                  k.appendChild(Y);
                k.style.left = `${re}px`, k.style.top = `${te}px`;
                const Z = q.querySelector(".flow-viewport");
                Z && Z.appendChild(k);
              }
            }
          }, le = () => {
            const j = [..._.selectedNodes], Q = [], H = q.getBoundingClientRect(), I = _.viewport?.zoom || 1, ie = _.viewport?.x || 0, G = _.viewport?.y || 0;
            for (const ee of j) {
              if (ee === v) continue;
              const Y = q?.querySelector(`[data-flow-node-id="${CSS.escape(ee)}"]`)?.querySelector('[data-flow-handle-type="source"]');
              if (!Y) continue;
              const V = Y.getBoundingClientRect();
              Q.push({
                nodeId: ee,
                handleId: Y.dataset.flowHandleId ?? "source",
                pos: {
                  x: (V.left + V.width / 2 - H.left - ie) / I,
                  y: (V.top + V.height / 2 - H.top - G) / I
                }
              });
            }
            return Q;
          }, J = (j) => {
            oe = !0, O && (ae.set(v, {
              line: O,
              sourceNodeId: v,
              sourceHandleId: p,
              sourcePos: { x: re, y: te },
              valid: !0
            }), O = null);
            const Q = le(), H = q.querySelector(".flow-viewport");
            for (const I of Q) {
              const ie = Rt({
                connectionLineType: _._config?.connectionLineType,
                connectionLineStyle: _._config?.connectionLineStyle,
                connectionLine: _._config?.connectionLine,
                containerEl: q
              });
              ie.update({
                fromX: I.pos.x,
                fromY: I.pos.y,
                toX: j.x,
                toY: j.y,
                source: I.nodeId,
                sourceHandle: I.handleId
              }), H && H.appendChild(ie.svg), ae.set(I.nodeId, {
                line: ie,
                sourceNodeId: I.nodeId,
                sourceHandleId: I.handleId,
                sourcePos: I.pos,
                valid: !0
              });
            }
          }, K = (j) => {
            if (!N) {
              const I = j.clientX - D, ie = j.clientY - x;
              if (Math.abs(I) >= Dn || Math.abs(ie) >= Dn) {
                if (de(), _._config?.multiConnect && _.selectedNodes.size > 1 && _.selectedNodes.has(v)) {
                  const G = _.screenToFlowPosition(j.clientX, j.clientY);
                  J(G);
                }
              } else
                return;
            }
            const Q = _.screenToFlowPosition(j.clientX, j.clientY);
            if (oe) {
              const I = on({
                containerEl: q,
                handleType: "target",
                excludeNodeId: v,
                cursorFlowPos: Q,
                connectionSnapRadius: R,
                getNode: (Y) => _.getNode(Y),
                toFlowPosition: (Y, V) => _.screenToFlowPosition(Y, V),
                connectionMode: _._config?.connectionMode
              });
              I.element !== U && (U?.classList.remove("flow-handle-active"), I.element?.classList.add("flow-handle-active"), U = I.element);
              const G = I.element?.closest("[x-flow-node]")?.dataset.flowNodeId ?? null, ee = I.element?.dataset.flowHandleId ?? "target", ne = _._config?.connectionLineStyle?.stroke ?? (getComputedStyle(q).getPropertyValue("--flow-edge-stroke-selected").trim() || fn);
              for (const Y of ae.values())
                if (Y.line.update({
                  fromX: Y.sourcePos.x,
                  fromY: Y.sourcePos.y,
                  toX: I.position.x,
                  toY: I.position.y,
                  source: Y.sourceNodeId,
                  sourceHandle: Y.sourceHandleId
                }), I.element && G) {
                  const V = {
                    source: Y.sourceNodeId,
                    sourceHandle: Y.sourceHandleId,
                    target: G,
                    targetHandle: ee
                  }, se = _.getNode(G)?.connectable !== !1 && Y.sourceNodeId !== G && Qe(V, _.edges, { preventCycles: _._config?.preventCycles }) && Je(V, _._config?.connectionRules, _._nodeMap) && Ye(q, V, _.edges) && Xe(q, V) && (!_._config?.isValidConnection || _._config.isValidConnection(V));
                  Y.valid = se;
                  const fe = Y.line.svg.querySelector("path");
                  if (fe)
                    if (se)
                      fe.setAttribute("stroke", ne);
                    else {
                      const ge = getComputedStyle(q).getPropertyValue("--flow-connection-line-invalid").trim() || gr;
                      fe.setAttribute("stroke", ge);
                    }
                } else {
                  Y.valid = !0;
                  const V = Y.line.svg.querySelector("path");
                  V && V.setAttribute("stroke", ne);
                }
              _.pendingConnection = { ..._.pendingConnection, position: I.position }, S?.updatePointer(j.clientX, j.clientY);
              return;
            }
            const H = on({
              containerEl: q,
              handleType: "target",
              excludeNodeId: v,
              cursorFlowPos: Q,
              connectionSnapRadius: R,
              getNode: (I) => _.getNode(I),
              toFlowPosition: (I, ie) => _.screenToFlowPosition(I, ie)
            });
            H.element !== U && (U?.classList.remove("flow-handle-active"), H.element?.classList.add("flow-handle-active"), U = H.element), k ? H.element ? (k.style.display = "none", O?.update({ fromX: re, fromY: te, toX: H.position.x, toY: H.position.y, source: v, sourceHandle: p })) : (k.style.display = "", k.style.left = `${Q.x}px`, k.style.top = `${Q.y}px`, O?.update({ fromX: re, fromY: te, toX: Q.x, toY: Q.y, source: v, sourceHandle: p })) : O?.update({ fromX: re, fromY: te, toX: H.position.x, toY: H.position.y, source: v, sourceHandle: p }), _.pendingConnection = { ..._.pendingConnection, position: H.position }, S?.updatePointer(j.clientX, j.clientY);
          }, X = async (j) => {
            if (S?.stop(), S = null, document.removeEventListener("pointermove", K), document.removeEventListener("pointerup", X), b = null, _._connectValidating) return;
            if (oe) {
              const ie = _.screenToFlowPosition(j.clientX, j.clientY);
              let G = U;
              G || (G = document.elementFromPoint(j.clientX, j.clientY)?.closest('[data-flow-handle-type="target"]'));
              const ne = G?.closest("[x-flow-node]")?.dataset.flowNodeId ?? null, Y = G?.dataset.flowHandleId ?? "target", V = [], Z = [], z = [], ce = [];
              if (G && ne) {
                const F = _.getNode(ne);
                for (const W of ae.values()) {
                  const se = {
                    source: W.sourceNodeId,
                    sourceHandle: W.sourceHandleId,
                    target: ne,
                    targetHandle: Y
                  };
                  if (F?.connectable !== !1 && W.sourceNodeId !== ne && Qe(se, _.edges, { preventCycles: _._config?.preventCycles }) && Je(se, _._config?.connectionRules, _._nodeMap) && Ye(q, se, _.edges) && Xe(q, se) && (!_._config?.isValidConnection || _._config.isValidConnection(se))) {
                    const Se = `e-${W.sourceNodeId}-${ne}-${Date.now()}-${tn++}`;
                    V.push({ id: Se, ...se }), Z.push(se), ce.push(W);
                  } else
                    z.push(W);
                }
              } else
                z.push(...ae.values());
              for (const F of ce)
                F.line.destroy();
              if (V.length > 0) {
                _.addEdges(V);
                for (const F of Z)
                  _._emit("connect", { connection: F });
                _._emit("multi-connect", { connections: Z });
              }
              z.length > 0 && setTimeout(() => {
                for (const F of z)
                  F.line.destroy();
              }, 100), U?.classList.remove("flow-handle-active"), _._emit("connect-end", {
                connection: Z.length > 0 ? Z[0] : null,
                source: v,
                sourceHandle: p,
                position: ie
              }), ae.clear(), oe = !1, Pe(q), _.pendingConnection = null, _._container?.classList.remove("flow-connecting");
              return;
            }
            if (!N) {
              _._config?.connectOnClick !== !1 && (B("connection", `Click-to-connect started from node "${v}" handle "${p}"`), _._emit("connect-start", { source: v, sourceHandle: p }), _.pendingConnection = {
                source: v,
                sourceHandle: p,
                position: { x: 0, y: 0 }
              }, _._container?.classList.add("flow-connecting"), sn(q, v, p, _));
              return;
            }
            const Q = O?.svg ?? null;
            k?.remove(), k = null, U?.classList.remove("flow-handle-active"), Pe(q);
            const H = _.screenToFlowPosition(j.clientX, j.clientY), I = { source: v, sourceHandle: p, position: H };
            try {
              let ie = U;
              if (ie || (ie = document.elementFromPoint(j.clientX, j.clientY)?.closest('[data-flow-handle-type="target"]')), ie) {
                const ee = ie.closest("[x-flow-node]")?.dataset.flowNodeId, ne = ie.dataset.flowHandleId ?? "target";
                if (ee) {
                  if (ie[ct] === !1) {
                    B("connection", "Connection rejected (handle not connectable end)"), _._emit("connect-end", { connection: null, ...I }), _.pendingConnection = null;
                    return;
                  }
                  const Y = _.getNode(ee);
                  if (Y && !Oe(Y)) {
                    B("connection", `Connection rejected (target "${ee}" not connectable)`), _._emit("connect-end", { connection: null, ...I }), _.pendingConnection = null;
                    return;
                  }
                  const V = {
                    source: v,
                    sourceHandle: p,
                    target: ee,
                    targetHandle: ne
                  };
                  if (Qe(V, _.edges, { preventCycles: _._config?.preventCycles })) {
                    if (!Je(V, _._config?.connectionRules, _._nodeMap)) {
                      B("connection", "Connection rejected (connection rules)", V), Me(q, V), _._emit("connect-end", { connection: null, ...I }), _.pendingConnection = null;
                      return;
                    }
                    if (!Ye(q, V, _.edges)) {
                      B("connection", "Connection rejected (handle limit)", V), Me(q, V), _._emit("connect-end", { connection: null, ...I }), _.pendingConnection = null;
                      return;
                    }
                    if (!Xe(q, V)) {
                      B("connection", "Connection rejected (per-handle validator)", V), Me(q, V), _._emit("connect-end", { connection: null, ...I }), _.pendingConnection = null;
                      return;
                    }
                    if (_._config?.isValidConnection && !_._config.isValidConnection(V)) {
                      B("connection", "Connection rejected (custom validator)", V), Me(q, V), _._emit("connect-end", { connection: null, ...I }), _.pendingConnection = null;
                      return;
                    }
                    const Z = _._config?.connectValidator;
                    if (Z) {
                      const ce = _._config?.validatingHandleClass ?? "flow-handle-validating", { sourceEl: F, targetEl: W } = Jn(q, V);
                      _._connectValidating = !0, vt(Q, !0);
                      let se;
                      try {
                        se = await Gn(
                          Z,
                          V,
                          F,
                          W,
                          q,
                          ce
                        );
                      } finally {
                        _._connectValidating = !1, vt(Q, !1);
                      }
                      if (!se.allowed) {
                        B("connection", "Connection rejected (async connectValidator)", { connection: V, reason: se.reason }), Me(q, { ...V, reason: se.reason }), _._emit("connect-end", { connection: null, ...I }), _.pendingConnection = null;
                        return;
                      }
                    }
                    const z = `e-${v}-${ee}-${Date.now()}-${tn++}`;
                    _.addEdges({ id: z, ...V }), B("connection", `Connection created: ${v} → ${ee}`, V), _._emit("connect", { connection: V }), _._emit("connect-end", { connection: V, ...I });
                  } else
                    B("connection", "Connection rejected (invalid)", V), Me(q, V), _._emit("connect-end", { connection: null, ...I });
                } else
                  _._emit("connect-end", { connection: null, ...I });
              } else if (_._config?.onEdgeDrop) {
                const G = {
                  x: H.x - ve / 2,
                  y: H.y - _e / 2
                }, ee = _._config.onEdgeDrop({
                  source: v,
                  sourceHandle: p,
                  position: G
                });
                if (ee) {
                  const ne = {
                    source: v,
                    sourceHandle: p,
                    target: ee.id,
                    targetHandle: "target"
                  };
                  if (!Ye(q, ne, _.edges))
                    B("connection", "Edge drop: connection rejected (handle limit)"), _._emit("connect-end", { connection: null, ...I });
                  else if (!Xe(q, ne))
                    B("connection", "Edge drop: connection rejected (per-handle validator)"), _._emit("connect-end", { connection: null, ...I });
                  else if (!_._config.isValidConnection || _._config.isValidConnection(ne)) {
                    _.addNodes(ee);
                    const Y = `e-${v}-${ee.id}-${Date.now()}-${tn++}`;
                    _.addEdges({ id: Y, ...ne }), B("connection", `Edge drop: created node "${ee.id}" and edge`, ne), _._emit("connect", { connection: ne }), _._emit("connect-end", { connection: ne, ...I });
                  } else
                    B("connection", "Edge drop: connection rejected by validator"), _._emit("connect-end", { connection: null, ...I });
                } else
                  B("connection", "Edge drop: callback returned null"), _._emit("connect-end", { connection: null, ...I });
              } else
                B("connection", "Connection cancelled (no target)"), _._emit("connect-end", { connection: null, ...I });
            } finally {
              vt(Q, !1), O?.destroy(), O = null;
            }
            _.pendingConnection = null;
          };
          document.addEventListener("pointermove", K), document.addEventListener("pointerup", X), document.addEventListener("pointercancel", X), b = () => {
            document.removeEventListener("pointermove", K), document.removeEventListener("pointerup", X), document.removeEventListener("pointercancel", X), S?.stop(), O?.destroy(), O = null, k?.remove(), k = null;
            for (const j of ae.values())
              j.line.destroy();
            ae.clear(), oe = !1, U?.classList.remove("flow-handle-active"), Pe(q), _.pendingConnection = null, _._container?.classList.remove("flow-connecting");
          };
        };
        e.addEventListener("pointerdown", M);
        const P = () => {
          const $ = C();
          if (!$?._pendingReconnection || $._pendingReconnection.draggedEnd !== "source") return;
          const _ = m();
          if (_) {
            const E = $.getNode(_);
            if (E && !Oe(E)) return;
          }
          e[Dt] !== !1 && e.classList.add("flow-handle-active");
        }, L = () => {
          e.classList.remove("flow-handle-active");
        };
        e.addEventListener("pointerenter", P), e.addEventListener("pointerleave", L), l(() => {
          b?.(), T?.(), e.removeEventListener("pointerdown", M), e.removeEventListener("pointerenter", P), e.removeEventListener("pointerleave", L), e.classList.remove("flow-handle", `flow-handle-${a}`);
        });
      } else {
        const b = () => {
          const _ = C();
          if (!_?.pendingConnection) return;
          const E = m();
          if (E) {
            const v = _.getNode(E);
            if (v && !Oe(v)) return;
          }
          e[ct] !== !1 && e.classList.add("flow-handle-active");
        }, M = () => {
          e.classList.remove("flow-handle-active");
        };
        e.addEventListener("pointerenter", b), e.addEventListener("pointerleave", M);
        const P = async (_) => {
          const E = C();
          if (!E?.pendingConnection || E._config?.connectOnClick === !1 || E._connectValidating) return;
          _.preventDefault(), _.stopPropagation();
          const v = m();
          if (!v) return;
          if (e[ct] === !1) {
            B("connection", "Click-to-connect rejected (handle not connectable end)"), E._emit("connect-end", { connection: null, source: E.pendingConnection.source, sourceHandle: E.pendingConnection.sourceHandle, position: { x: 0, y: 0 } }), E.pendingConnection = null, E._container?.classList.remove("flow-connecting");
            const A = e.closest(".flow-container");
            A && Pe(A);
            return;
          }
          const w = E.getNode(v);
          if (w && !Oe(w)) {
            B("connection", `Click-to-connect rejected (target "${v}" not connectable)`), E._emit("connect-end", { connection: null, source: E.pendingConnection.source, sourceHandle: E.pendingConnection.sourceHandle, position: { x: 0, y: 0 } }), E.pendingConnection = null, E._container?.classList.remove("flow-connecting");
            const A = e.closest(".flow-container");
            A && Pe(A);
            return;
          }
          const D = {
            source: E.pendingConnection.source,
            sourceHandle: E.pendingConnection.sourceHandle,
            target: v,
            targetHandle: p
          }, x = { source: E.pendingConnection.source, sourceHandle: E.pendingConnection.sourceHandle, position: { x: 0, y: 0 } };
          if (Qe(D, E.edges, { preventCycles: E._config?.preventCycles })) {
            const A = e.closest(".flow-container");
            if (!Je(D, E._config?.connectionRules, E._nodeMap)) {
              B("connection", "Click-to-connect rejected (connection rules)", D), Me(A, D), E._emit("connect-end", { connection: null, ...x }), E.pendingConnection = null, E._container?.classList.remove("flow-connecting"), A && Pe(A);
              return;
            }
            if (A && !Ye(A, D, E.edges)) {
              B("connection", "Click-to-connect rejected (handle limit)", D), Me(A, D), E._emit("connect-end", { connection: null, ...x }), E.pendingConnection = null, E._container?.classList.remove("flow-connecting"), Pe(A);
              return;
            }
            if (A && !Xe(A, D)) {
              B("connection", "Click-to-connect rejected (per-handle validator)", D), Me(A, D), E._emit("connect-end", { connection: null, ...x }), E.pendingConnection = null, E._container?.classList.remove("flow-connecting"), A && Pe(A);
              return;
            }
            if (E._config?.isValidConnection && !E._config.isValidConnection(D)) {
              B("connection", "Click-to-connect rejected (custom validator)", D), Me(A, D), E._emit("connect-end", { connection: null, ...x }), E.pendingConnection = null, E._container?.classList.remove("flow-connecting"), A && Pe(A);
              return;
            }
            const O = E._config?.connectValidator;
            if (O && A) {
              const S = E._config?.validatingHandleClass ?? "flow-handle-validating", { sourceEl: k, targetEl: R } = Jn(A, D);
              E._connectValidating = !0;
              let q;
              try {
                q = await Gn(
                  O,
                  D,
                  k,
                  R,
                  A,
                  S
                );
              } finally {
                E._connectValidating = !1;
              }
              if (!q.allowed) {
                B("connection", "Click-to-connect rejected (async connectValidator)", { connection: D, reason: q.reason }), Me(A, { ...D, reason: q.reason }), E._emit("connect-end", { connection: null, ...x }), E.pendingConnection = null, E._container?.classList.remove("flow-connecting"), Pe(A);
                return;
              }
            }
            const U = `e-${D.source}-${D.target}-${Date.now()}-${tn++}`;
            E.addEdges({ id: U, ...D }), B("connection", `Click-to-connect: ${D.source} → ${D.target}`, D), E._emit("connect", { connection: D }), E._emit("connect-end", { connection: D, ...x });
          } else {
            B("connection", "Click-to-connect rejected (invalid)", D);
            const A = e.closest(".flow-container");
            Me(A, D), E._emit("connect-end", { connection: null, ...x });
          }
          E.pendingConnection = null, E._container?.classList.remove("flow-connecting");
          const N = e.closest(".flow-container");
          N && Pe(N);
        };
        e.addEventListener("click", P);
        let L = null;
        const $ = (_) => {
          if (_.button !== 0) return;
          const E = C(), v = m();
          if (!E || !v || E._animationLocked || E._config?.edgesReconnectable === !1 || E._pendingReconnection) return;
          const w = E.edges.filter(
            (Y) => Y.target === v && (Y.targetHandle ?? "target") === p
          );
          if (w.length === 0) return;
          const D = w.find((Y) => Y.selected) ?? (w.length === 1 ? w[0] : null);
          if (!D) return;
          const x = D.reconnectable ?? !0;
          if (x === !1 || x === "source") return;
          _.preventDefault(), _.stopPropagation();
          const N = _.clientX, A = _.clientY;
          let O = !1, U = !1, S = null;
          const k = E._config?.connectionSnapRadius ?? 20, R = e.closest(".flow-container");
          if (!R) return;
          const q = R.querySelector(
            `[data-flow-node-id="${CSS.escape(D.source)}"]`
          ), re = D.sourceHandle ? `[data-flow-handle-id="${CSS.escape(D.sourceHandle)}"]` : '[data-flow-handle-type="source"]', te = q?.querySelector(re), oe = R.getBoundingClientRect(), ae = E.viewport?.zoom || 1, de = E.viewport?.x || 0, le = E.viewport?.y || 0;
          let J, K;
          if (te) {
            const Y = te.getBoundingClientRect();
            J = (Y.left + Y.width / 2 - oe.left - de) / ae, K = (Y.top + Y.height / 2 - oe.top - le) / ae;
          } else {
            const Y = E.getNode(D.source);
            if (!Y) return;
            const V = Y.dimensions?.width ?? ve, Z = Y.dimensions?.height ?? _e;
            J = Y.position.x + V / 2, K = Y.position.y + Z;
          }
          let X = null, j = null, Q = null, H = N, I = A;
          const ie = () => {
            O = !0;
            const Y = R.querySelector(
              `[data-flow-edge-id="${D.id}"]`
            );
            Y && Y.classList.add("flow-edge-reconnecting"), E._emit("reconnect-start", { edge: D, handleType: "target" }), B("reconnect", `Reconnection drag started from target handle on edge "${D.id}"`), j = Rt({
              connectionLineType: E._config?.connectionLineType,
              connectionLineStyle: E._config?.connectionLineStyle,
              connectionLine: E._config?.connectionLine,
              containerEl: R
            }), X = j.svg;
            const V = E.screenToFlowPosition(N, A);
            j.update({
              fromX: J,
              fromY: K,
              toX: V.x,
              toY: V.y,
              source: D.source,
              sourceHandle: D.sourceHandle
            });
            const Z = R.querySelector(".flow-viewport");
            Z && Z.appendChild(X), E.pendingConnection = {
              source: D.source,
              sourceHandle: D.sourceHandle,
              position: V
            }, E._pendingReconnection = {
              edge: D,
              draggedEnd: "target",
              anchorPosition: { x: J, y: K },
              position: V
            }, Q = Kn(R, E, H, I), sn(R, D.source, D.sourceHandle ?? "source", E, D.id);
          }, G = (Y) => {
            if (H = Y.clientX, I = Y.clientY, !O) {
              Math.sqrt(
                (Y.clientX - N) ** 2 + (Y.clientY - A) ** 2
              ) >= Dn && ie();
              return;
            }
            const V = E.screenToFlowPosition(Y.clientX, Y.clientY), Z = on({
              containerEl: R,
              handleType: "target",
              excludeNodeId: D.source,
              cursorFlowPos: V,
              connectionSnapRadius: k,
              getNode: (z) => E.getNode(z),
              toFlowPosition: (z, ce) => E.screenToFlowPosition(z, ce)
            });
            Z.element !== S && (S?.classList.remove("flow-handle-active"), Z.element?.classList.add("flow-handle-active"), S = Z.element), j?.update({
              fromX: J,
              fromY: K,
              toX: Z.position.x,
              toY: Z.position.y,
              source: D.source,
              sourceHandle: D.sourceHandle
            }), E.pendingConnection && (E.pendingConnection = {
              ...E.pendingConnection,
              position: Z.position
            }), E._pendingReconnection && (E._pendingReconnection = {
              ...E._pendingReconnection,
              position: Z.position
            }), Q?.updatePointer(Y.clientX, Y.clientY);
          }, ee = () => {
            if (U) return;
            U = !0, document.removeEventListener("pointermove", G), document.removeEventListener("pointerup", ne), document.removeEventListener("pointercancel", ne), Q?.stop(), Q = null, j?.destroy(), j = null, X = null, S?.classList.remove("flow-handle-active"), L = null;
            const Y = R.querySelector(
              `[data-flow-edge-id="${D.id}"]`
            );
            Y && Y.classList.remove("flow-edge-reconnecting"), Pe(R), E.pendingConnection = null, E._pendingReconnection = null;
          }, ne = async (Y) => {
            if (!O) {
              ee();
              return;
            }
            if (E._connectValidating) return;
            let V = S;
            V || (V = document.elementFromPoint(Y.clientX, Y.clientY)?.closest('[data-flow-handle-type="target"]'));
            let Z = !1;
            if (V) {
              const ce = V.closest("[x-flow-node]")?.dataset.flowNodeId, F = V.dataset.flowHandleId;
              if (ce && E.getNode(ce)?.connectable !== !1) {
                const se = {
                  source: D.source,
                  sourceHandle: D.sourceHandle,
                  target: ce,
                  targetHandle: F
                }, fe = { ...D }, ge = j?.svg ?? null;
                vt(ge, !0);
                let pe;
                try {
                  pe = await Pr({
                    edge: D,
                    newConnection: se,
                    canvas: E,
                    containerEl: R,
                    endpoint: "target"
                  });
                } finally {
                  vt(ge, !1);
                }
                pe.applied ? (Z = !0, B("reconnect", `Edge "${D.id}" reconnected (target)`, se), E._emit("reconnect", { oldEdge: fe, newConnection: se })) : B("reconnect", "Reconnection rejected", { connection: se, reason: pe.reason });
              }
            }
            Z || B("reconnect", `Edge "${D.id}" reconnection cancelled — snapping back`), E._emit("reconnect-end", { edge: D, successful: Z }), ee();
          };
          document.addEventListener("pointermove", G), document.addEventListener("pointerup", ne), document.addEventListener("pointercancel", ne), L = ee;
        };
        e.addEventListener("pointerdown", $), l(() => {
          L?.(), T?.(), e.removeEventListener("pointerdown", $), e.removeEventListener("pointerenter", b), e.removeEventListener("pointerleave", M), e.removeEventListener("click", P), e.classList.remove("flow-handle", `flow-handle-${a}`, "flow-handle-active");
        });
      }
    }
  );
}
const is = {
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
function hf(t) {
  if (!t) return { ...is };
  const e = { ...is };
  for (const n of Object.keys(t))
    n in t && (e[n] = t[n]);
  return e;
}
function qe(t, e) {
  if (e == null) return !1;
  const n = t.length === 1 ? t.toLowerCase() : t;
  return Array.isArray(e) ? e.some((o) => (o.length === 1 ? o.toLowerCase() : o) === n) : (e.length === 1 ? e.toLowerCase() : e) === n;
}
function dt(t, e) {
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
function gf(t, e, n = {}) {
  const o = n.duration ?? 500, i = n.moveThreshold ?? 10;
  let r = null, s = 0, l = 0, a = null;
  function c() {
    r !== null && (clearTimeout(r), r = null), a = null, document.removeEventListener("pointermove", d), document.removeEventListener("pointerup", c), document.removeEventListener("pointercancel", c);
  }
  function d(u) {
    const h = u.clientX - s, g = u.clientY - l;
    h * h + g * g > i * i && c();
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
const ss = 20;
function Lr(t) {
  return new Map(t.map((e) => [e.id, e]));
}
function Yo(t, e, n) {
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
function Ht(t, e, n) {
  if (!t.parentId)
    return t;
  const o = Yo(t, e, n);
  return { ...t, position: o };
}
function Qn(t, e, n) {
  return t.map((o) => Ht(o, e, n));
}
function ut(t, e) {
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
function ft(t) {
  const e = Lr(t), n = [], o = /* @__PURE__ */ new Set();
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
function Mr(t, e, n = /* @__PURE__ */ new Set()) {
  if (n.has(t.id))
    return t.zIndex ?? 2;
  if (n.add(t.id), !t.parentId)
    return t.zIndex !== void 0 ? t.zIndex : t.type === "group" ? 0 : 2;
  const o = e.get(t.parentId);
  return o ? Mr(o, e, n) + 2 + (t.zIndex ?? 0) : (t.zIndex ?? 0) + 2;
}
function Tr(t, e, n) {
  return {
    x: Math.max(e[0][0], Math.min(t.x, e[1][0] - (n?.width ?? 0))),
    y: Math.max(e[0][1], Math.min(t.y, e[1][1] - (n?.height ?? 0)))
  };
}
function vo(t, e, n) {
  return {
    x: Math.max(0, Math.min(t.x, n.width - e.width)),
    y: Math.max(0, Math.min(t.y, n.height - e.height))
  };
}
function Ln(t, e, n) {
  const o = e.extent ?? n;
  if (!o || o === "parent" || e.parentId) return t;
  const i = e.dimensions ?? { width: ve, height: _e };
  return Tr(t, o, i);
}
function pf(t, e, n) {
  const o = t.x + e.width + ss, i = t.y + e.height + ss, r = Math.max(n.width, o), s = Math.max(n.height, i);
  return r === n.width && s === n.height ? null : { width: r, height: s };
}
function rs(t, e, n) {
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
function mf(t, e, n) {
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
function yf(t, e, n) {
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
function wf(t, e, n) {
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
function vf(t, e, n) {
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
function _f(t, e, n) {
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
function bf(t, e, n) {
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
function xf(t, e, n) {
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
const Ar = {
  circle: { perimeterPoint: mf },
  diamond: { perimeterPoint: yf },
  hexagon: { perimeterPoint: wf },
  parallelogram: { perimeterPoint: vf },
  triangle: { perimeterPoint: _f },
  cylinder: { perimeterPoint: bf },
  stadium: { perimeterPoint: xf }
};
function Nr(t, e = "light") {
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
const _o = "__alpineflow_collab_store__";
function Ef() {
  return typeof globalThis < "u" ? (globalThis[_o] || (globalThis[_o] = /* @__PURE__ */ new WeakMap()), globalThis[_o]) : /* @__PURE__ */ new WeakMap();
}
const $e = Ef(), bo = "__alpineflow_registry__";
function Ir() {
  return typeof globalThis < "u" ? (globalThis[bo] || (globalThis[bo] = /* @__PURE__ */ new Map()), globalThis[bo]) : /* @__PURE__ */ new Map();
}
function Mt(t) {
  return Ir().get(t);
}
function Cf(t, e) {
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
const Sf = 1e3;
class kf {
  constructor(e, n) {
    this._clearTimer = null, this._formatMessage = n ?? Cf, this._el = document.createElement("div"), this._el.setAttribute("aria-live", "polite"), this._el.setAttribute("aria-atomic", "true"), this._el.setAttribute("role", "status");
    const o = this._el.style;
    o.position = "absolute", o.width = "1px", o.height = "1px", o.padding = "0", o.margin = "-1px", o.overflow = "hidden", o.clip = "rect(0,0,0,0)", o.whiteSpace = "nowrap", o.border = "0", e.appendChild(this._el);
  }
  announce(e) {
    this._clearTimer && clearTimeout(this._clearTimer), this._el.textContent = e, this._clearTimer = setTimeout(() => {
      this._el.textContent = "", this._clearTimer = null;
    }, Sf);
  }
  handleEvent(e, n) {
    const o = this._formatMessage(e, n);
    o && this.announce(o);
  }
  destroy() {
    this._clearTimer && clearTimeout(this._clearTimer), this._el.remove();
  }
}
class Pf {
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
        const g = r.get(h.source);
        if (!g) continue;
        const p = h.sourceHandle ?? "default", y = h.targetHandle ?? "default";
        p in g && (d[y] = g[p]);
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
const Lf = {
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
}, Mf = {
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
}, Tf = {
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
}, as = {
  success: { borderColor: "#22c55e", shadow: "0 0 0 2px rgba(34,197,94,0.3)" },
  error: { borderColor: "#ef4444", shadow: "0 0 0 2px rgba(239,68,68,0.3)" },
  warning: { borderColor: "#f59e0b", shadow: "0 0 0 2px rgba(245,158,11,0.3)" },
  info: { borderColor: "#3b82f6", shadow: "0 0 0 2px rgba(59,130,246,0.3)" }
};
function Af(t, e) {
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
    const r = as[o.style] ?? as.info, s = o.duration ?? 1500, l = Math.floor(s * 0.6), a = Math.floor(s * 0.4), c = i.style?.borderColor ?? null, d = i.style?.boxShadow ?? null;
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
      const f = i[d], u = i[d + 1], h = t.edges.find((g) => g.source === f && g.target === u);
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
function Nf(t) {
  return "on" + t.split("-").map(
    (e) => e.charAt(0).toUpperCase() + e.slice(1)
  ).join("");
}
function If(t, e, n) {
  for (const [o, i] of Object.entries(n)) {
    const r = Nf(o), s = t[r];
    t[r] = (l) => {
      let a;
      typeof s == "function" && (a = s(l));
      const c = Lf[o], d = c ? c(l) : [l], f = e[i];
      return typeof f == "function" && f.call(e, ...d), a;
    };
  }
}
function $f(t, e) {
  const n = [];
  for (const [o, i] of Object.entries(Mf)) {
    const r = e.on(o, (s) => {
      const l = t[i];
      if (typeof l != "function") return;
      const a = Tf[o], c = a ? a(s) : Object.values(s);
      l.call(t, ...c);
    });
    n.push(r);
  }
  return () => {
    for (const o of n)
      typeof o == "function" && o();
  };
}
const Df = 5;
function Rf(t) {
  const e = /* @__PURE__ */ new Set(), n = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Set();
  let i = null, r = /* @__PURE__ */ new Set(), s = 0;
  const l = /* @__PURE__ */ new Set();
  function a() {
    i === null && (i = requestAnimationFrame(() => {
      i = null;
      for (const c of e) {
        const f = (r.has(c) ? n.get(c) ?? 0 : 0) + 1;
        n.set(c, f), f > Df && !o.has(c) && (o.add(c), console.warn(
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
function Hf(t) {
  return function(n) {
    t.suspend();
    try {
      return n();
    } finally {
      t.resume();
    }
  };
}
function Ff(t, e, n) {
  let { width: o, height: i } = t;
  return e?.width !== void 0 && (o = Math.max(o, e.width)), e?.height !== void 0 && (i = Math.max(i, e.height)), n?.width !== void 0 && (o = Math.min(o, n.width)), n?.height !== void 0 && (i = Math.min(i, n.height)), { width: o, height: i };
}
function rn(t, e) {
  const n = t.type ?? "default", o = e[n], i = t.data?.childValidation;
  if (!(!o && !i))
    return o ? i ? { ...o, ...i } : o : i;
}
function $r(t, e, n, o) {
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
function eo(t, e, n, o) {
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
function ls(t, e, n) {
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
function qt(t, e) {
  const n = Yt(t, e);
  return {
    x: n.x,
    y: n.y,
    width: t.dimensions?.width ?? ve,
    height: t.dimensions?.height ?? _e
  };
}
function Dr(t, e) {
  return t.x < e.x + e.width && t.x + t.width > e.x && t.y < e.y + e.height && t.y + t.height > e.y;
}
function Of(t, e, n = !0) {
  const o = qt(t);
  return e.filter((i) => {
    if (i.id === t.id) return !1;
    const r = qt(i);
    return n ? Dr(o, r) : o.x <= r.x && o.y <= r.y && o.x + o.width >= r.x + r.width && o.y + o.height >= r.y + r.height;
  });
}
function zf(t, e, n = !0) {
  if (t.id === e.id) return !1;
  const o = qt(t), i = qt(e);
  return n ? Dr(o, i) : o.x <= i.x && o.y <= i.y && o.x + o.width >= i.x + i.width && o.y + o.height >= i.y + i.height;
}
function Vf(t, e, n, o, i = 5) {
  let { x: r, y: s } = t;
  for (const l of o) {
    const a = r + e, c = s + n, d = l.x + l.width, f = l.y + l.height;
    if (r < d + i && a > l.x - i && s < f + i && c > l.y - i) {
      const u = a - (l.x - i), h = d + i - r, g = c - (l.y - i), p = f + i - s, y = Math.min(u, h, g, p);
      y === u ? r -= u : y === h ? r += h : y === g ? s -= g : s += p;
    }
  }
  return { x: r, y: s };
}
function Bf(t) {
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
                  (g) => g.parentId === c.parentId
                ),
                ...r.filter(
                  (g) => g.parentId === c.parentId
                )
              ], h = $r(f, c, u, d);
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
      t.nodes = ft(t.nodes), t._rebuildNodeMap();
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
            const f = t.nodes.find((g) => g.id === c);
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
        const g = t._nodeMap.get(u.parentId);
        if (!g) continue;
        const p = t.nodes.filter(
          (m) => m.parentId === u.parentId
        ), y = eo(g, u, p, h);
        y.valid || (o.add(f), t._config.onChildValidationFail && t._config.onChildValidationFail({
          parent: g,
          child: u,
          operation: "remove",
          rule: y.rule,
          message: y.message
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
        for (const u of ut(f, t.nodes))
          n.add(u);
      B("destroy", `Removing ${n.size} node(s)`, [...n]);
      const r = t.nodes.filter((f) => n.has(f.id));
      let s = [];
      t._config.reconnectOnDelete && (s = tf(n, t.nodes, t.edges));
      const l = [];
      t.edges = t.edges.filter((f) => n.has(f.source) || n.has(f.target) ? (l.push(f.id), !1) : !0), s.length && (t.edges.push(...s), B("destroy", `Created ${s.length} reconnection edge(s)`)), t._rebuildEdgeMap(), t.nodes = t.nodes.filter((f) => !n.has(f.id)), t._rebuildNodeMap();
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
          const g = t._nodeMap.get(h);
          g?.childLayout && (u = h), h = g?.parentId;
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
      return qo(e, t.nodes, t.edges);
    },
    /**
     * Get all nodes connected via incoming edges to the given node.
     */
    getIncomers(e) {
      return Ju(e, t.nodes, t.edges);
    },
    /**
     * Get all edges connected to a node (both incoming and outgoing).
     */
    getConnectedEdges(e) {
      return Gu(e, t.edges);
    },
    /**
     * Check if two nodes are connected by an edge.
     * When `directed` is true, only checks source→target direction.
     */
    areNodesConnected(e, n, o = !1) {
      return ef(e, n, t.edges, o);
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
      return o ? Of(o, t.nodes, n) : [];
    },
    /**
     * Check if two nodes' bounding rects overlap.
     * Accepts either FlowNode objects or node ID strings.
     */
    isNodeIntersecting(e, n, o) {
      const i = typeof e == "string" ? t.nodes.find((s) => s.id === e) : e, r = typeof n == "string" ? t.nodes.find((s) => s.id === n) : n;
      return !i || !r ? !1 : zf(i, r, o);
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
function qf(t) {
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
        return Je(l, o, t._nodeMap);
      });
      if (i.length === 0) return;
      t._captureHistory(), B("edge", `Adding ${i.length} edge(s)`, i.map((s) => s.id)), t.edges.push(...i), t._rebuildEdgeMap(), t._emit("edges-change", { type: "add", edges: i });
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
      B("edge", `Removing ${n.size} edge(s)`, [...n]);
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
function Xf(t) {
  return {
    // ── Coordinate Transforms ─────────────────────────────────────────────
    /**
     * Convert screen coordinates (e.g. from a pointer event) to flow
     * coordinates, accounting for the current viewport pan and zoom.
     */
    screenToFlowPosition(e, n) {
      if (!t._container) return { x: e, y: n };
      const o = t._container.getBoundingClientRect();
      return ur(e, n, t.viewport, o);
    },
    /**
     * Convert flow coordinates to screen coordinates, accounting for the
     * current viewport pan and zoom.
     */
    flowToScreenPosition(e, n) {
      if (!t._container) return { x: e, y: n };
      const o = t._container.getBoundingClientRect();
      return vu(e, n, t.viewport, o);
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
      const o = t.nodes.filter((r) => !r.hidden), i = Vt(Qn(o, t._nodeMap, t._config.nodeOrigin), t._config.nodeOrigin);
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
      const o = t._container ? { width: t._container.clientWidth, height: t._container.clientHeight } : { width: 800, height: 600 }, i = Yn(
        e,
        o.width,
        o.height,
        t._config.minZoom ?? 0.5,
        t._config.maxZoom ?? 2,
        n?.padding ?? Vo
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
      return e ? n = e.map((o) => t.getNode(o)).filter((o) => !!o) : n = t.nodes.filter((o) => !o.hidden), Vt(Qn(n, t._nodeMap, t._config.nodeOrigin), t._config.nodeOrigin);
    },
    /**
     * Compute the viewport (pan + zoom) that frames the given bounds
     * within the container, respecting min/max zoom and padding.
     */
    getViewportForBounds(e, n) {
      const o = t._container;
      return o ? Yn(
        e,
        o.clientWidth,
        o.clientHeight,
        t._config.minZoom ?? 0.5,
        t._config.maxZoom ?? 2,
        n ?? Vo
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
      const n = t._config.maxZoom ?? 2, o = Math.min(t.viewport.zoom * qi, n);
      B("viewport", "zoomIn", { from: t.viewport.zoom, to: o }), t._panZoom?.setViewport({ ...t.viewport, zoom: o }, e);
    },
    /**
     * Zoom out by `ZOOM_STEP_FACTOR`, clamped to `minZoom`.
     */
    zoomOut(e) {
      const n = t._config.minZoom ?? 0.5, o = Math.max(t.viewport.zoom / qi, n);
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
let wt = null;
const Yf = 20;
function Wo(t) {
  return JSON.parse(JSON.stringify(t));
}
function cs(t) {
  return `${t}-copy-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
}
function Rr(t, e) {
  const n = t.filter((r) => r.selected), o = new Set(n.map((r) => r.id)), i = e.filter(
    (r) => r.selected || o.has(r.source) && o.has(r.target)
  );
  return wt = {
    nodes: Wo(n),
    edges: Wo(i),
    pasteCount: 0
  }, { nodeCount: n.length, edgeCount: i.length };
}
function Wf() {
  if (!wt || wt.nodes.length === 0) return null;
  wt.pasteCount++;
  const t = wt.pasteCount * Yf, e = /* @__PURE__ */ new Map(), n = wt.nodes.map((i) => {
    const r = cs(i.id);
    return e.set(i.id, r), {
      ...i,
      id: r,
      data: Wo(i.data),
      position: { x: i.position.x + t, y: i.position.y + t },
      selected: !0
    };
  }), o = wt.edges.map((i) => ({
    ...i,
    id: cs(i.id),
    source: e.get(i.source),
    target: e.get(i.target),
    selected: !0
  }));
  return { nodes: n, edges: o };
}
function jf(t, e) {
  const n = Rr(t, e);
  return { nodeIds: t.filter((i) => i.selected).map((i) => i.id), ...n };
}
function Uf(t) {
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
        return c ? rf(c) : !1;
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
        ), u = eo(d, a, f, c);
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
      const e = Rr(t.nodes, t.edges);
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
      const e = Wf();
      if (e) {
        t._captureHistory(), t.deselectAll(), t.nodes.push(...e.nodes), t.nodes = ft(t.nodes), t._rebuildNodeMap(), t.edges.push(...e.edges), t._rebuildEdgeMap();
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
      const e = jf(t.nodes, t.edges);
      e.nodeCount !== 0 && (await t._deleteSelected(), t._emit("cut", { nodeCount: e.nodeCount, edgeCount: e.edgeCount }), B("clipboard", `Cut ${e.nodeCount} node(s)`));
    }
  };
}
function Zf(t) {
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
      }), e.nodes && (t.nodes = ft(JSON.parse(JSON.stringify(e.nodes)))), e.edges) {
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
      e && (t.nodes = ft(e.nodes), t.edges = e.edges, t._rebuildNodeMap(), t._rebuildEdgeMap(), t.deselectAll(), requestAnimationFrame(() => {
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
      e && (t.nodes = ft(e.nodes), t.edges = e.edges, t._rebuildNodeMap(), t._rebuildEdgeMap(), t.deselectAll(), requestAnimationFrame(() => {
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
function Kf(t, e) {
  return t * (1 - e);
}
function Gf(t, e) {
  return t * e;
}
function Jf(t, e) {
  return e === "in" ? t : 1 - t;
}
function Qf(t, e, n) {
  const o = t.getTotalLength();
  t.style.strokeDasharray = String(o);
  const i = n === "in" ? Kf(o, e) : Gf(o, e);
  t.style.strokeDashoffset = String(i), (n === "in" && e < 1 || n === "out") && (t.style.setProperty("marker-start", "none"), t.style.setProperty("marker-end", "none"));
}
function eh(t) {
  t.style.removeProperty("stroke-dasharray"), t.style.removeProperty("stroke-dashoffset"), t.style.removeProperty("marker-start"), t.style.removeProperty("marker-end");
}
function th(t, e, n) {
  t.style.opacity = String(Jf(e, n));
}
function nh(t) {
  t.style.removeProperty("opacity");
}
const et = Math.PI * 2, Gt = /* @__PURE__ */ new Map(), oh = 64;
function hi(t) {
  if (typeof document > "u" || typeof document.createElementNS != "function")
    return null;
  const e = Gt.get(t);
  if (e) return e;
  const n = document.createElementNS("http://www.w3.org/2000/svg", "path");
  n.setAttribute("d", t);
  const o = n.getTotalLength(), i = (r) => {
    const s = n.getPointAtLength(r * o);
    return { x: s.x, y: s.y };
  };
  if (Gt.size >= oh) {
    const r = Gt.keys().next().value;
    r !== void 0 && Gt.delete(r);
  }
  return Gt.set(t, i), i;
}
function Rm(t) {
  const { cx: e, cy: n, offset: o = 0, clockwise: i = !0 } = t, r = t.rx ?? t.radius ?? 100, s = t.ry ?? t.radius ?? 100, l = i ? 1 : -1;
  return (a) => ({
    x: e + r * Math.cos(et * a * l + o * et),
    y: n + s * Math.sin(et * a * l + o * et)
  });
}
function Hm(t) {
  const { startX: e, startY: n, endX: o, endY: i, amplitude: r = 30, frequency: s = 1, offset: l = 0 } = t, a = o - e, c = i - n, d = Math.sqrt(a * a + c * c), f = d > 0 ? a / d : 1, h = -(d > 0 ? c / d : 0), g = f;
  return (p) => {
    const y = e + a * p, m = n + c * p, C = r * Math.sin(et * s * p + l * et);
    return { x: y + h * C, y: m + g * C };
  };
}
function Fm(t, e) {
  const n = hi(t);
  if (!n) return null;
  const { reverse: o = !1, startAt: i = 0, endAt: r = 1 } = e ?? {}, s = r - i;
  return (l) => {
    let a = i + l * s;
    return o && (a = r - l * s), n(a);
  };
}
function Om(t) {
  const { cx: e, cy: n, radius: o, angle: i = 60, offset: r = 0 } = t, s = i * Math.PI / 180;
  return (l) => {
    const a = s * Math.sin(et * l + r * et);
    return {
      x: e + o * Math.sin(a),
      y: n + o * Math.cos(a)
    };
  };
}
function zm(t) {
  const { originX: e, originY: n, range: o = 20, speed: i = 1, seed: r = 0 } = t, s = 1 + r % 7 * 0.3, l = 1.3 + r % 11 * 0.2, a = 0.7 + r % 13 * 0.25, c = 1.1 + r % 17 * 0.15;
  return (d) => {
    const f = d * i * et, u = (Math.sin(s * f) + Math.sin(l * f * 1.3)) / 2, h = (Math.sin(a * f * 0.9) + Math.sin(c * f * 1.1)) / 2;
    return { x: e + u * o, y: n + h * o };
  };
}
function Vm(t, e) {
  const n = e?.from ?? 0;
  return (o, i) => n + o * t;
}
let ds = !1;
function ye(t) {
  try {
    return structuredClone(t);
  } catch {
    return ds || (ds = !0, typeof console < "u" && console.warn(
      "[AlpineFlow] Cloning fell back to JSON roundtrip because structuredClone could not clone the input (likely a reactive proxy or an object with functions). Non-JSON values (functions, Symbols, Dates) will be stripped. This warning fires once per session."
    )), JSON.parse(JSON.stringify(t));
  }
}
function ih(t) {
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
function sh(t) {
  return {
    animated: t.animated,
    color: t.color,
    class: t.class,
    label: t.label,
    strokeWidth: t.strokeWidth
  };
}
function rh(t, e) {
  t.position.x = e.position.x, t.position.y = e.position.y, t.class = e.class, t.style = e.style, t.data = ye(e.data), t.dimensions = e.dimensions ? { ...e.dimensions } : t.dimensions, t.selected = e.selected, t.zIndex = e.zIndex;
}
class gi {
  constructor(e, n) {
    this._entries = [], this._state = "idle", this._reversed = !1, this._loopCount = -1, this._lockEnabled = !1, this._locked = !1, this._respectReducedMotion = void 0, this._listeners = /* @__PURE__ */ new Map(), this._context = {}, this._activeHandles = [], this._subTimelines = [], this._initialSnapshot = /* @__PURE__ */ new Map(), this._initialEdgeSnapshot = /* @__PURE__ */ new Map(), this._playResolve = null, this._pauseWaiters = /* @__PURE__ */ new Set(), this._canvas = e, this._engine = n ?? new pr();
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
    const o = new gi(this._canvas, this._engine);
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
    return mr(this._respectReducedMotion);
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
          o && this._initialSnapshot.set(n, ih(o));
        }
    }
    if (e.edges) {
      for (const n of e.edges)
        if (!this._initialEdgeSnapshot.has(n)) {
          const o = this._canvas.getEdge(n);
          o && this._initialEdgeSnapshot.set(n, sh(o));
        }
    }
  }
  _restoreInitialSnapshot() {
    for (const [e, n] of this._initialSnapshot) {
      const o = this._canvas.getNode(e);
      o && rh(o, n);
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
    const o = this._isReducedMotion(), i = o ? 0 : e.duration ?? 300, r = o ? 0 : e.delay ?? 0, s = jn(e.easing), l = this._makeContext(n, e.id);
    if (e.when && !e.when(l)) {
      if (e.else)
        return this._executeStep(e.else, n);
      this._emit("step-skipped", { index: n, id: e.id });
      return;
    }
    if (e.timeline) {
      const $ = e.timeline;
      if (this._tag && !e.independent && $.setTag(this._tag), e.independent || this._subTimelines.push($), this._emit("step", { index: n, id: e.id, timeline: $ }), e.onStart?.(l), await $.play(), this._state === "stopped") return;
      if (e.onComplete?.(l), this._emit("step-complete", { timeline: $ }), !e.independent) {
        const _ = this._subTimelines.indexOf($);
        _ >= 0 && this._subTimelines.splice(_, 1);
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
    const g = this._resolveFollowPath(e), p = this._createGuidePath(e), y = !!(e.viewport || e.fitView || e.panTo);
    let m = null, C = null;
    y && this._canvas.viewport && (m = { ...this._canvas.viewport }, C = this._resolveTargetViewport(e));
    const T = e.edgeTransition ?? "none", b = e.addEdges?.map(($) => $.id) ?? [], M = e.removeEdges?.filter(($) => this._canvas.getEdge($)).slice() ?? [], P = {
      step: e,
      ctx: l,
      duration: i,
      delay: r,
      easing: s,
      validNodeIds: a,
      validEdgeIds: c,
      resolvedPathFn: g,
      guidePathEl: p,
      nodeFromDimensions: d,
      nodeFromStyles: f,
      edgeFromStrokeWidth: u,
      edgeFromColor: h,
      viewportFrom: m,
      viewportTarget: C,
      transition: T,
      addEdgeIds: b,
      removeEdgeIds: M
    };
    if (i === 0)
      return this._executeInstantStep(P);
    const L = this._prepareAnimatedEdges(e, T, b);
    return L && await L, g ? this._executeFollowPathStep(P) : this._executeAnimatedStep(P);
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
        s && (s.dimensions && e.dimensions && o.set(r, { ...s.dimensions }), e.style && s.style && i.set(r, hn(s.style)));
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
    const n = hi(e.followPath);
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
      viewportTarget: g,
      transition: p,
      addEdgeIds: y,
      removeEdgeIds: m,
      guidePathEl: C
    } = e, T = e.resolvedPathFn;
    return new Promise((b) => {
      const M = this._engine.register((P) => {
        if (this._state === "stopped")
          return b(), !0;
        const L = Math.min(P / i, 1), $ = s(L);
        if (l) {
          const _ = T($);
          for (const E of l) {
            const v = this._canvas.getNode(E);
            v && (v.position.x = _.x, v.position.y = _.y);
          }
        }
        return this._interpolateFollowPathTick(
          n,
          $,
          l,
          a,
          c,
          d,
          f,
          u,
          h,
          g
        ), this._tickEdgeTransitions(p, y, m, $), n.onProgress?.(L, o), L >= 1 ? (this._cleanupEdgeTransitions(p, y, m), m.length && this._removeEdges(m), this._applyStepInstant(n), C && n.guidePath?.autoRemove !== !1 && C.remove(), n.onProgress?.(1, o), n.onComplete?.(o), this._emit("step-complete"), b(), !0) : !1;
      }, r);
      this._activeHandles.push(M);
    });
  }
  /** Per-tick interpolation for properties during followPath animation. */
  _interpolateFollowPathTick(e, n, o, i, r, s, l, a, c, d) {
    if (o && e.dimensions)
      for (const f of o) {
        const u = this._canvas.getNode(f), h = r.get(f);
        !u || !h || !u.dimensions || (e.dimensions.width !== void 0 && (u.dimensions.width = tt(h.width, e.dimensions.width, n)), e.dimensions.height !== void 0 && (u.fixedDimensions = !0, u.dimensions.height = tt(h.height, e.dimensions.height, n)));
      }
    if (o && e.style) {
      const f = hn(e.style);
      for (const u of o) {
        const h = this._canvas.getNode(u), g = s.get(u);
        h && g && (h.style = yr(g, f, n));
      }
    }
    if (i && e.edgeStrokeWidth !== void 0)
      for (const f of i) {
        const u = this._canvas.getEdge(f), h = l.get(f);
        u && (h !== void 0 ? u.strokeWidth = tt(h, e.edgeStrokeWidth, n) : u.strokeWidth = e.edgeStrokeWidth);
      }
    if (i && e.edgeColor !== void 0)
      for (const f of i) {
        const u = this._canvas.getEdge(f), h = a.get(f);
        u && (h !== void 0 && typeof h == "string" ? u.color = ci(h, e.edgeColor, n) : u.color = e.edgeColor);
      }
    if (c && d && this._canvas.viewport) {
      const f = Tu(c, d, n, {
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
    return new Promise((g) => {
      const p = this._buildAnimateTargets(
        n,
        s,
        l,
        a,
        c
      ), y = Object.keys(p.nodes || {}).length > 0 || Object.keys(p.edges || {}).length > 0 || p.viewport;
      if (!y && !f.length && !u.length) {
        n.onProgress?.(1, o), n.onComplete?.(o), this._emit("step-complete"), g();
        return;
      }
      if (y) {
        const m = this._canvas.animate(p, {
          duration: i,
          easing: n.easing,
          delay: r,
          onProgress: (C) => {
            if (this._state === "stopped") {
              m.stop(), g();
              return;
            }
            this._tickEdgeTransitions(d, f, u, C), n.onProgress?.(C, o);
          },
          onComplete: () => {
            this._cleanupEdgeTransitions(d, f, u), u.length && this._removeEdges(u), this._applyStepInstant(n), h && n.guidePath?.autoRemove !== !1 && h.remove(), n.onProgress?.(1, o), n.onComplete?.(o), this._emit("step-complete"), g();
          }
        });
        this._activeHandles.push({ stop: () => m.stop() });
      } else
        this._executeEdgeLifecycleOnly(e, g);
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
      r && Qf(r, n, o);
    }
  }
  /** Clean up draw transition styles. */
  _cleanupEdgeDrawTransition(e) {
    for (const n of e) {
      const o = this._canvas.getEdgePathElement?.(n);
      o && eh(o);
    }
  }
  /** Apply fade transition on each tick for added/removed edges. */
  _applyEdgeFadeTransition(e, n, o) {
    for (const i of e) {
      const r = this._canvas.getEdgeElement?.(i);
      r && th(r, n, o);
    }
  }
  /** Clean up fade transition styles. */
  _cleanupEdgeFadeTransition(e) {
    for (const n of e) {
      const o = this._canvas.getEdgeElement?.(n);
      o && nh(o);
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
    const i = Vt(o), r = e.fitViewPadding ?? 0.1;
    return Yn(
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
const Hr = /* @__PURE__ */ new Map();
function Wt(t, e) {
  Hr.set(t, e);
}
function ah(t) {
  return Hr.get(t);
}
const De = "http://www.w3.org/2000/svg", lh = {
  create(t, e) {
    const n = document.createElementNS(De, "circle");
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
}, ch = {
  create(t, e) {
    const n = document.createElementNS(De, "g"), o = e.size ?? 6, i = e.color ?? "#8B5CF6", r = document.createElementNS(De, "circle");
    r.setAttribute("r", String(o * 1.5)), r.setAttribute("fill", i), r.setAttribute("opacity", "0.3"), n.appendChild(r);
    const s = document.createElementNS(De, "circle");
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
let dh = 0;
const uh = {
  create(t, e) {
    const n = document.createElementNS(De, "g");
    if (n.__beamLength = e.length ?? 30, n.__beamWidth = e.width ?? 4, n.__beamColor = e.color ?? "#8B5CF6", n.__beamGradient = e.gradient, n.__beamFollowThrough = e.followThrough ?? !0, n.__beamUid = `afbeam-${++dh}`, e.class)
      for (const o of e.class.split(" "))
        o && n.classList.add(o);
    return t.appendChild(n), n;
  },
  update(t, e) {
    const n = t, o = n.__beamLength, i = n.__beamWidth, r = n.__beamColor, s = n.__beamGradient, l = n.__beamUid;
    if (e.pathEl) {
      let d = n.__pathClone, f = n.__gradient;
      if (!d) {
        let p = r;
        if (s && s.length > 0) {
          const y = document.createElementNS(De, "defs");
          f = document.createElementNS(De, "linearGradient"), f.setAttribute("id", l), f.setAttribute("gradientUnits", "userSpaceOnUse");
          for (const m of s) {
            const C = document.createElementNS(De, "stop");
            C.setAttribute("offset", String(m.offset)), C.setAttribute("stop-color", m.color), m.opacity !== void 0 && C.setAttribute("stop-opacity", String(m.opacity)), f.appendChild(C);
          }
          y.appendChild(f), n.appendChild(y), p = `url(#${l})`, n.__gradient = f;
        }
        d = document.createElementNS(De, "path"), d.setAttribute("d", e.pathEl.getAttribute("d") ?? ""), d.setAttribute("fill", "none"), d.style.stroke = p, d.style.strokeWidth = String(i), d.style.strokeLinecap = "round", d.style.fill = "none", s || (d.style.opacity = "0.85"), d.setAttribute("stroke-dasharray", `${o} ${e.pathLength}`), n.appendChild(d), n.__pathClone = d;
      }
      const h = n.__beamFollowThrough ? e.progress * (e.pathLength + o) : e.progress * e.pathLength, g = o - h;
      if (d.setAttribute("stroke-dashoffset", String(g)), f) {
        const p = Math.max(0, Math.min(e.pathLength, h)), y = Math.max(0, Math.min(e.pathLength, h - o)), m = e.pathEl.getPointAtLength(p), C = e.pathEl.getPointAtLength(y);
        f.setAttribute("x1", String(C.x)), f.setAttribute("y1", String(C.y)), f.setAttribute("x2", String(m.x)), f.setAttribute("y2", String(m.y));
      }
      return;
    }
    let a = n.__fallbackRect;
    a || (a = document.createElementNS(De, "rect"), a.setAttribute("width", String(o)), a.setAttribute("height", String(i)), a.setAttribute("rx", String(i / 2)), a.setAttribute("fill", r), a.setAttribute("opacity", "0.8"), n.appendChild(a), n.__fallbackRect = a);
    const c = Math.atan2(e.velocity.y, e.velocity.x) * (180 / Math.PI);
    a.setAttribute(
      "transform",
      `translate(${e.x - o / 2},${e.y - i / 2}) rotate(${c},${o / 2},${i / 2})`
    );
  },
  destroy(t) {
    t.remove();
  }
}, fh = {
  create(t, e) {
    const n = document.createElementNS(De, "circle");
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
}, hh = {
  create(t, e) {
    const n = e.size ?? 16, o = e.href ?? "";
    let i;
    if (o.startsWith("#") ? (i = document.createElementNS(De, "use"), i.setAttribute("href", o), i.setAttribute("width", String(n)), i.setAttribute("height", String(n))) : (i = document.createElementNS(De, "image"), i.setAttribute("href", o), i.setAttribute("width", String(n)), i.setAttribute("height", String(n))), e.class)
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
Wt("circle", lh);
Wt("orb", ch);
Wt("beam", uh);
Wt("pulse", fh);
Wt("image", hh);
let us = !1;
function gh(t) {
  const e = t.match(/^([\d.]+)(ms|s)?$/);
  if (!e) return 2e3;
  const n = parseFloat(e[1]);
  return e[2] === "ms" ? n : n * 1e3;
}
function fs(t, e, n) {
  if (t.speed !== void 0 && t.speed > 0)
    return t.duration !== void 0 && console.warn("[AlpineFlow] Both speed and duration provided for particle; speed takes precedence."), e / t.speed * 1e3;
  const o = t.duration ?? n;
  return typeof o == "number" ? o : gh(o);
}
function ph(t) {
  function e(o, i, r = {}, s = {}) {
    const l = r.renderer ?? "circle", a = ah(l);
    if (!a) {
      B("particle", `_fireParticleOnPath: unknown renderer "${l}"`);
      return;
    }
    l === "beam" && typeof r.onComplete == "function" && r.followThrough === void 0 && !us && (us = !0, console.warn(
      "[AlpineFlow] beam `onComplete` fires after the tail exits the path (follow-through is on by default). Pass `followThrough: false` if you want `onComplete` to fire when the head reaches the target."
    ));
    const c = t._containerStyles, d = r.size ?? s.size ?? (parseFloat(c?.getPropertyValue("--flow-edge-dot-size").trim() ?? "4") || 4), f = r.color ?? s.color ?? c?.getPropertyValue("--flow-edge-dot-fill").trim() ?? fn, u = s.durationFallback ?? c?.getPropertyValue("--flow-edge-dot-duration").trim() ?? "2s", h = o.getTotalLength(), g = fs(r, h, u), p = { ...r, size: d, color: f }, y = a.create(i, p), m = o.getPointAtLength(0), C = {
      x: m.x,
      y: m.y,
      progress: 0,
      velocity: { x: 0, y: 0 },
      pathLength: h,
      elapsed: 0,
      pathEl: o
    };
    a.update(y, C);
    let T;
    const b = new Promise((_) => {
      T = _;
    }), M = () => {
      typeof r.onComplete == "function" && r.onComplete(), T();
    }, P = s.wrapOnComplete ? s.wrapOnComplete(M) : M, L = {
      element: y,
      renderer: a,
      pathEl: o,
      startElapsed: -1,
      // set on first engine tick
      ms: g,
      onComplete: P,
      currentPosition: { x: m.x, y: m.y }
    };
    return t._activeParticles.add(L), t._particleEngineHandle || (t._particleEngineHandle = Wn.register((_) => t._tickParticles(_))), {
      getCurrentPosition() {
        return t._activeParticles.has(L) ? { ...L.currentPosition } : null;
      },
      stop() {
        t._activeParticles.has(L) && (L.renderer.destroy(L.element), t._activeParticles.delete(L), P());
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
      const d = t._containerStyles, f = i.size ?? s.particleSize ?? (parseFloat(d?.getPropertyValue("--flow-edge-dot-size").trim() ?? "4") || 4), u = i.color ?? s.particleColor ?? d?.getPropertyValue("--flow-edge-dot-fill").trim() ?? fn, h = s.animationDuration ?? d?.getPropertyValue("--flow-edge-dot-duration").trim() ?? "2s", g = e(l, c, i, {
        size: f,
        color: u,
        durationFallback: h
      });
      return g && B("particle", `sendParticle on edge "${o}"`, { size: f, color: u, duration: i.duration }), g;
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
          const g = setTimeout(() => {
            c.push(this.sendParticle(o, h));
          }, u * s);
          d.push(g);
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
        const u = o.map((p) => {
          const m = t.getEdgePathElement(p)?.getTotalLength() ?? 0;
          return { id: p, length: m };
        }).filter((p) => p.length > 0);
        if (u.length === 0) {
          const p = Promise.resolve();
          return { get handles() {
            return [];
          }, finished: p, stopAll() {
          } };
        }
        const h = Math.max(...u.map((p) => p.length)), g = fs(a, h, "2s");
        for (const { id: p, length: y } of u) {
          const m = y / h, C = g * m, T = g - C;
          if (T <= 0) {
            const b = this.sendParticle(p, { ...a, duration: C });
            b && c.push(b);
          } else {
            const b = setTimeout(() => {
              const M = this.sendParticle(p, { ...a, duration: C });
              M && c.push(M);
            }, T);
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
          Promise.all(c.map((g) => g.finished)).then(() => {
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
class mh {
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
const jo = 1, Uo = 1 / 60;
class nn {
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
    const o = e.args.targets ?? {}, i = e.args.options ?? {}, r = i.motion, s = r ? br(r) ?? void 0 : void 0, l = {
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
      e._easingFn = jn(e.easing);
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
      e._easingFn = jn(e.easing), e._from = e.fromValues ? { ...e.fromValues } : { ...e.currentValues ?? {} };
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
      const l = e._from[s], a = this._getTargetValue(s, e.targets) ?? l, c = tt(l, a, r);
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
            wr(r, o, n);
            break;
          case "decay":
            di(r, o, n);
            break;
          case "inertia":
            vr(r, o, n, i);
            break;
          case "keyframes": {
            const s = o, l = s.duration ?? 5e3, a = l > 0 ? Math.min((this._virtualTime - e.startTime) / l, 1) : 1;
            _r(r, s, a, i), a >= 1 && (r.settled = !0);
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
const Fr = /* @__PURE__ */ new Map();
function pi(t, e) {
  Fr.set(t, e);
}
function yh(t) {
  return Fr.get(t);
}
function mi(t, e = 20) {
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
function Or(t) {
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
const wh = {
  render(t, { width: e, height: n }) {
    const o = Object.values(t.nodes);
    if (o.length === 0)
      return `<svg width="${e}" height="${n}" xmlns="http://www.w3.org/2000/svg"></svg>`;
    const i = mi(t.nodes);
    if (!i)
      return `<svg width="${e}" height="${n}" xmlns="http://www.w3.org/2000/svg"></svg>`;
    const { minX: r, minY: s, vbWidth: l, vbHeight: a } = i;
    let c = `<svg width="${e}" height="${n}" viewBox="${r} ${s} ${l} ${a}" xmlns="http://www.w3.org/2000/svg">`;
    c += Or(t);
    for (const d of o) {
      const f = d.position?.x ?? 0, u = d.position?.y ?? 0, h = d.dimensions?.width ?? 150, g = d.dimensions?.height ?? 40;
      c += `<rect x="${f}" y="${u}" width="${h}" height="${g}" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1" rx="4"/>`;
    }
    return c += "</svg>", c;
  }
}, vh = {
  render(t, { width: e, height: n }) {
    const o = Object.values(t.nodes);
    if (o.length === 0)
      return `<svg width="${e}" height="${n}" xmlns="http://www.w3.org/2000/svg"></svg>`;
    const i = mi(t.nodes);
    if (!i)
      return `<svg width="${e}" height="${n}" xmlns="http://www.w3.org/2000/svg"></svg>`;
    const { minX: r, minY: s, vbWidth: l, vbHeight: a } = i;
    let c = `<svg width="${e}" height="${n}" viewBox="${r} ${s} ${l} ${a}" xmlns="http://www.w3.org/2000/svg">`;
    for (const d of Object.values(t.edges)) {
      const f = t.nodes[d.source], u = t.nodes[d.target];
      if (!f || !u)
        continue;
      const h = (f.position?.x ?? 0) + (f.dimensions?.width ?? 150) / 2, g = (f.position?.y ?? 0) + (f.dimensions?.height ?? 40) / 2, p = (u.position?.x ?? 0) + (u.dimensions?.width ?? 150) / 2, y = (u.position?.y ?? 0) + (u.dimensions?.height ?? 40) / 2;
      c += `<line x1="${h}" y1="${g}" x2="${p}" y2="${y}" stroke="currentColor" stroke-width="1.5" opacity="0.7"/>`;
    }
    for (const d of o) {
      const f = d.position?.x ?? 0, u = d.position?.y ?? 0, h = d.dimensions?.width ?? 150, g = d.dimensions?.height ?? 40;
      c += `<rect x="${f}" y="${u}" width="${h}" height="${g}" fill="none" stroke="currentColor" stroke-width="1.5" rx="4"/>`;
    }
    return c += "</svg>", c;
  }
}, _h = {
  render(t, { width: e, height: n, inFlight: o }) {
    const i = Object.values(t.nodes);
    if (i.length === 0)
      return `<svg width="${e}" height="${n}" xmlns="http://www.w3.org/2000/svg"></svg>`;
    const r = mi(t.nodes);
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
    f += Or(t);
    for (const u of i) {
      const h = u.position?.x ?? 0, g = u.position?.y ?? 0, p = u.dimensions?.width ?? 150, y = u.dimensions?.height ?? 40;
      s.has(u.id ?? "") ? f += `<rect x="${h}" y="${g}" width="${p}" height="${y}" fill="currentColor" fill-opacity="0.8" stroke="currentColor" stroke-width="2" rx="4"/>` : f += `<rect x="${h}" y="${g}" width="${p}" height="${y}" fill="currentColor" fill-opacity="0.1" stroke="currentColor" stroke-width="1" rx="4" opacity="0.3"/>`;
    }
    return f += "</svg>", f;
  }
};
pi("faithful", wh);
pi("outline", vh);
pi("activity", _h);
function Zo(t, e) {
  let n = 0, o = t.length;
  for (; n < o; ) {
    const i = n + o >>> 1;
    t[i].t > e ? o = i : n = i + 1;
  }
  return n;
}
function Ko(t, e) {
  let n = 0, o = t.length;
  for (; n < o; ) {
    const i = n + o >>> 1;
    t[i].t >= e ? o = i : n = i + 1;
  }
  return n;
}
function bh(t, e) {
  return e.split(".").reduce((n, o) => n?.[o], t);
}
function zr(t) {
  if (t !== null && typeof t == "object") {
    Object.freeze(t);
    for (const e of Object.keys(t))
      zr(t[e]);
  }
  return t;
}
class yi {
  constructor(e) {
    this.version = e.version, this.duration = e.duration, this.initialState = zr(ye(e.initialState)), this.events = Object.freeze(ye(e.events)), this.checkpoints = Object.freeze(ye(e.checkpoints)), this.metadata = Object.freeze({ ...e.metadata ?? {} }), Object.freeze(this);
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
    if (e.version > jo)
      throw new Error(
        `[AlpineFlow] Recording version ${e.version} is newer than supported (${jo}). Please update AlpineFlow to replay this recording.`
      );
    return new yi(e);
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
      const i = bh(o.canvas, e);
      i !== void 0 && n.push({ t: o.t, v: i });
    }
    return n;
  }
  /**
   * Returns the canvas state at virtual time `t` by running the VirtualEngine
   * up to that point from the nearest prior checkpoint.
   */
  getStateAt(e) {
    const n = new nn(this.initialState);
    let o = null;
    for (const c of this.checkpoints)
      c.t <= e && (!o || c.t > o.t) && (o = c);
    o && n.restoreCheckpoint(o);
    const i = o?.t ?? 0, r = this.events;
    let s = i;
    const l = Uo * 1e3;
    let a = o ? Zo(r, i) : Ko(r, i);
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
    const o = this.getStateAt(e), i = n.renderer ?? "faithful", r = yh(i);
    if (!r)
      throw new Error(`[AlpineFlow] Unknown thumbnail renderer "${i}"`);
    return r.render(o, { width: n.width, height: n.height });
  }
}
class xh {
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
      version: jo,
      duration: this._virtualNow(),
      initialState: o,
      events: this._events,
      checkpoints: this._checkpoints,
      metadata: n
    };
    return new yi(i);
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
class Eh {
  constructor(e, n, o = {}) {
    this._currentTime = 0, this._state = "idle", this._direction = "forward", this._speed = 1, this._rafHandle = null, this._lastWallTime = 0, this._resolveFinished = () => {
    }, this.recording = n, this._canvas = e, this._virtualEngine = new nn(n.initialState), this._speed = o.speed ?? 1, this._direction = this._speed < 0 ? "backward" : "forward", this._from = o.from ?? 0, this._to = o.to ?? n.duration, this._loop = o.loop ?? !1, this._currentTime = this._from, this._from > 0 && this._seekEngineTo(this._from), o.skipInitialState || this._applyStateToCanvas(this._virtualEngine.getState()), this.finished = new Promise((i) => {
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
    this._state !== "playing" && (this._state === "ended" && (this._currentTime = this._from, this._seekEngineTo(this._from), this._applyStateToCanvas(this._virtualEngine.getState())), this._state = "playing", this._lastWallTime = xo(), this._scheduleTick());
  }
  pause() {
    this._state === "playing" && (this._state = "paused", this._cancelTick());
  }
  stop() {
    this._cancelTick(), this._currentTime = this._from, this._virtualEngine = new nn(this.recording.initialState), this._applyStateToCanvas(this._virtualEngine.getState()), this._state = "idle";
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
    const n = this._findNearestCheckpoint(e), o = new nn(this.recording.initialState);
    n && o.restoreCheckpoint(n);
    const i = n?.t ?? 0, r = this.recording.events;
    let s = i;
    const l = Uo * 1e3;
    let a = n ? Zo(r, i) : Ko(r, i);
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
    const e = xo(), n = (e - this._lastWallTime) / 1e3;
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
    n ? this._virtualEngine.restoreCheckpoint(n) : this._virtualEngine = new nn(this.recording.initialState), this._walkTo(n?.t ?? 0, e);
  }
  _walkTo(e, n, o = !1) {
    if (n <= e)
      return;
    const i = this.recording.events;
    let r = e;
    const s = Uo * 1e3;
    let l = e === 0 ? Ko(i, 0) : Zo(i, e);
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
        this._loop = typeof this._loop == "number" ? e : !0, this._currentTime = this._from, this._seekEngineTo(this._from), this._applyStateToCanvas(this._virtualEngine.getState()), this._state = "playing", this._lastWallTime = xo(), this._scheduleTick();
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
function xo() {
  return typeof performance < "u" && typeof performance.now == "function" ? performance.now() : Date.now();
}
function Ch(t) {
  const e = ph(t);
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
      const n = new gi(t, Wn);
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
        for (const [h, g] of Object.entries(n.nodes)) {
          const p = t._nodeMap.get(h);
          if (!p) continue;
          const m = (g._duration ?? i) === 0;
          if (g.followPath && !m) {
            let C = null;
            typeof g.followPath == "function" ? C = g.followPath : C = hi(g.followPath);
            let T = null;
            if (g.guidePath?.visible && typeof g.followPath == "string" && typeof document < "u") {
              const b = t.getEdgeSvgElement?.();
              b && (T = document.createElementNS("http://www.w3.org/2000/svg", "path"), T.setAttribute("d", g.followPath), T.classList.add("flow-guide-path"), g.guidePath.class && T.classList.add(g.guidePath.class), b.appendChild(T));
            }
            if (C) {
              const b = C, M = T, P = g.guidePath?.autoRemove !== !1;
              r.push({
                key: `node:${h}:followPath`,
                from: 0,
                to: 1,
                apply: (L) => {
                  const $ = t._nodeMap.get(h);
                  if (!$) return;
                  const _ = b(L);
                  ke().raw($).position.x = _.x, ke().raw($).position.y = _.y, s.add(h), L >= 1 && M && P && M.remove();
                }
              });
            }
          } else if (g.position) {
            const T = ke().raw(p).position;
            if (g.position.x !== void 0) {
              const b = g.position.x;
              if (m)
                T.x = b;
              else {
                const M = T.x;
                r.push({
                  key: `node:${h}:position.x`,
                  from: M,
                  to: b,
                  apply: (P) => {
                    const L = t._nodeMap.get(h);
                    L && (ke().raw(L).position.x = P, s.add(h));
                  }
                });
              }
            }
            if (g.position.y !== void 0) {
              const b = g.position.y;
              if (m)
                T.y = b;
              else {
                const M = T.y;
                r.push({
                  key: `node:${h}:position.y`,
                  from: M,
                  to: b,
                  apply: (P) => {
                    const L = t._nodeMap.get(h);
                    L && (ke().raw(L).position.y = P), s.add(h);
                  }
                });
              }
            }
            m && s.add(h);
          }
          if (g.data !== void 0 && Object.assign(p.data, g.data), g.class !== void 0 && (p.class = g.class), g.selected !== void 0 && (p.selected = g.selected), g.zIndex !== void 0 && (p.zIndex = g.zIndex), g.style !== void 0)
            if (m)
              p.style = g.style, l.add(h);
            else {
              const C = hn(p.style || {}), T = hn(g.style), b = t._nodeElements.get(h);
              if (b) {
                const M = getComputedStyle(b);
                for (const P of Object.keys(T))
                  C[P] === void 0 && (C[P] = M.getPropertyValue(P));
              }
              r.push({
                key: `node:${h}:style`,
                from: 0,
                to: 1,
                apply: (M) => {
                  const P = t._nodeMap.get(h);
                  P && (ke().raw(P).style = yr(C, T, M), l.add(h));
                }
              });
            }
          g.dimensions && p.dimensions && (g.dimensions.width !== void 0 && (m ? p.dimensions.width = g.dimensions.width : r.push({
            key: `node:${h}:dimensions.width`,
            from: p.dimensions.width,
            to: g.dimensions.width,
            apply: (C) => {
              p.dimensions.width = C;
            }
          })), g.dimensions.height !== void 0 && (p.fixedDimensions = !0, m ? p.dimensions.height = g.dimensions.height : r.push({
            key: `node:${h}:dimensions.height`,
            from: p.dimensions.height,
            to: g.dimensions.height,
            apply: (C) => {
              p.dimensions.height = C;
            }
          })));
        }
      if (n.edges)
        for (const [h, g] of Object.entries(n.edges)) {
          const p = t._edgeMap.get(h);
          if (!p) continue;
          const m = (g._duration ?? i) === 0;
          if (g.color !== void 0)
            if (typeof g.color == "object")
              p.color = g.color;
            else if (m)
              p.color = g.color, a.add(h);
            else {
              const C = typeof p.color == "string" && p.color || getComputedStyle(t._container).getPropertyValue("--flow-edge-stroke").trim() || li;
              r.push({
                key: `edge:${h}:color`,
                from: C,
                to: g.color,
                apply: (T) => {
                  const b = t._edgeMap.get(h);
                  b && (ke().raw(b).color = T, a.add(h));
                }
              });
            }
          if (g.strokeWidth !== void 0)
            if (m)
              p.strokeWidth = g.strokeWidth, a.add(h);
            else {
              const C = p.strokeWidth ?? (parseFloat(getComputedStyle(t._container).getPropertyValue("--flow-edge-stroke-width").trim() || "1") || 1);
              r.push({
                key: `edge:${h}:strokeWidth`,
                from: C,
                to: g.strokeWidth,
                apply: (T) => {
                  const b = t._edgeMap.get(h);
                  b && (ke().raw(b).strokeWidth = T, a.add(h));
                }
              });
            }
          g.label !== void 0 && (p.label = g.label), g.animated !== void 0 && (p.animated = g.animated), g.class !== void 0 && (p.class = g.class);
        }
      if (n.viewport) {
        const h = n.viewport, p = (h._duration ?? i) === 0, y = t.viewport;
        h.pan?.x !== void 0 && (p ? y.x = h.pan.x : r.push({
          key: "viewport:pan.x",
          from: y.x,
          to: h.pan.x,
          apply: (m) => {
            y.x = m;
          }
        })), h.pan?.y !== void 0 && (p ? y.y = h.pan.y : r.push({
          key: "viewport:pan.y",
          from: y.y,
          to: h.pan.y,
          apply: (m) => {
            y.y = m;
          }
        })), h.zoom !== void 0 && (p ? y.zoom = h.zoom : r.push({
          key: "viewport:zoom",
          from: y.zoom,
          to: h.zoom,
          apply: (m) => {
            y.zoom = m;
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
      const u = ke().raw(t._animator).animate(r, {
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
            for (const [h, g] of Object.entries(n.nodes)) {
              const p = t._nodeMap.get(h);
              if (!p) continue;
              const y = ke().raw(p);
              (g.followPath || g.position?.x !== void 0) && (p.position.x = y.position.x), (g.followPath || g.position?.y !== void 0) && (p.position.y = y.position.y), g.style !== void 0 && (p.style = y.style);
            }
          if (n.edges)
            for (const [h, g] of Object.entries(n.edges)) {
              const p = t._edgeMap.get(h);
              if (!p) continue;
              const y = ke().raw(p);
              g.color !== void 0 && typeof g.color == "string" && (p.color = y.color), g.strokeWidth !== void 0 && (p.strokeWidth = y.strokeWidth);
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
      const i = mr(t._config?.respectReducedMotion) ? 0 : o.duration ?? 300;
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
      const l = o.zoom, a = Wn.register(() => {
        if (s) return !0;
        let d = null;
        if (typeof n == "string") {
          const y = t._nodeMap.get(n);
          if (y) {
            d = y.parentId ? t.getAbsolutePosition(n) : { ...y.position };
            const m = y.nodeOrigin ?? t._config.nodeOrigin ?? [0, 0];
            y.dimensions && (d.x += y.dimensions.width * (0.5 - m[0]), d.y += y.dimensions.height * (0.5 - m[1]));
          }
        } else if ("_targetNodeIds" in n && n._targetNodeIds?.length) {
          const y = n._targetNodeIds[0], m = t._nodeMap.get(y);
          if (m) {
            d = m.parentId ? t.getAbsolutePosition(y) : { ...m.position };
            const C = m.nodeOrigin ?? t._config.nodeOrigin ?? [0, 0];
            m.dimensions && (d.x += m.dimensions.width * (0.5 - C[0]), d.y += m.dimensions.height * (0.5 - C[1]));
          }
        } else if ("getCurrentPosition" in n && typeof n.getCurrentPosition == "function") {
          const y = n.getCurrentPosition();
          if (y)
            d = y;
          else
            return s = !0, a.stop(), t._followHandle = null, i(), !0;
        } else "x" in n && "y" in n && (d = n);
        if (!d) return !1;
        const f = t._container ? { width: t._container.clientWidth, height: t._container.clientHeight } : { width: 800, height: 600 }, u = l ?? t.viewport.zoom, h = f.width / 2 - d.x * u, g = f.height / 2 - d.y * u, p = 0.08;
        return t.viewport.x += (h - t.viewport.x) * p, t.viewport.y += (g - t.viewport.y) * p, l && (t.viewport.zoom += (l - t.viewport.zoom) * p), t._flushViewport(), !1;
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
      return new mh(n, {
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
      const o = ke().raw(t._animator), i = o.beginTransaction();
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
        animate: (p, y) => {
          const m = i.update;
          i.update = s;
          try {
            return r.call(i, p, y);
          } finally {
            i.update = m;
          }
        },
        update: (p, y) => s.call(i, p, y),
        sendParticle: (p, y) => l.call(i, p, y),
        sendParticleAlongPath: (p, y) => a.call(i, p, y),
        sendParticleBetween: (p, y, m) => c.call(i, p, y, m),
        sendParticleBurst: (p, y) => d.call(i, p, y),
        sendConverging: (p, y) => f.call(i, p, y),
        addNodes: (p) => t.addNodes(p),
        removeNodes: (p) => t.removeNodes(p),
        addEdges: (p) => t.addEdges(p),
        removeEdges: (p) => t.removeEdges(p)
      }, h = new xh(u, o), g = async () => {
        i.animate = (...p) => u.animate(...p), i.update = (...p) => u.update(...p), i.sendParticle = (...p) => u.sendParticle(...p), i.sendParticleAlongPath = (...p) => u.sendParticleAlongPath(...p), i.sendParticleBetween = (...p) => u.sendParticleBetween(...p), i.sendParticleBurst = (...p) => u.sendParticleBurst(...p), i.sendConverging = (...p) => u.sendConverging(...p);
        try {
          const p = n();
          p instanceof Promise && await p;
        } finally {
          i.animate = r, i.update = s, i.sendParticle = l, i.sendParticleAlongPath = a, i.sendParticleBetween = c, i.sendParticleBurst = d, i.sendConverging = f;
        }
      };
      return h.record(g, o?.captureMetadata);
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
      return new Eh(r, n, o);
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
      Wt(n, o);
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
function hs(t, e, n, o) {
  const i = e.find((l) => l.id === t);
  if (!i) return /* @__PURE__ */ new Set();
  if (i.type === "group")
    return ut(t, e);
  const r = /* @__PURE__ */ new Set(), s = qo(t, e, n);
  for (const l of s)
    r.add(l.id);
  if (o?.recursive) {
    const l = s.map((a) => a.id);
    for (; l.length > 0; ) {
      const a = l.shift(), c = qo(a, e, n);
      for (const d of c)
        !r.has(d.id) && d.id !== t && (r.add(d.id), l.push(d.id));
    }
  }
  return r;
}
function Sh(t, e, n) {
  const o = /* @__PURE__ */ new Map();
  for (const i of e)
    n.has(i.id) && o.set(i.id, { ...i.position });
  return {
    targetPositions: o,
    originalDimensions: t.type === "group" ? { ...t.dimensions ?? { width: 400, height: 300 } } : void 0,
    reroutedEdges: /* @__PURE__ */ new Map()
  };
}
function Eo(t, e, n, o) {
  t.collapsed = !0, o && (t.dimensions = { ...o });
  for (const i of e)
    n.targetPositions.has(i.id) && (i.hidden = !0);
}
function gs(t, e, n, o = !0) {
  t.collapsed = !1, o && n.originalDimensions && (t.dimensions = { ...n.originalDimensions });
  const i = /* @__PURE__ */ new Set();
  if (t.type === "group") {
    for (const r of e)
      if (r.collapsed && r.id !== t.id && n.targetPositions.has(r.id)) {
        const s = ut(r.id, e);
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
function Co(t, e, n) {
  const o = /* @__PURE__ */ new Map();
  for (const i of e) {
    const r = n.has(i.source), s = n.has(i.target), l = i.source === t, a = i.target === t;
    !r && !s || (o.set(i.id, { source: i.source, target: i.target, hidden: i.hidden }), r && s || l && s || r && a ? i.hidden = !0 : r ? i.source = t : i.target = t);
  }
  return o;
}
function kh(t, e) {
  for (const n of t) {
    const o = e.get(n.id);
    o && (n.source = o.source, n.target = o.target, o.hidden !== void 0 ? n.hidden = o.hidden : delete n.hidden);
  }
}
const Mn = { width: 150, height: 50 };
function Ph(t) {
  return {
    /**
     * Collapse a node — hide its descendants/outgoers and optionally animate.
     */
    collapseNode(e, n) {
      const o = t._nodeMap.get(e);
      if (!o || o.collapsed) return;
      const i = hs(e, t.nodes, t.edges, { recursive: n?.recursive });
      if (i.size === 0) return;
      B("collapse", `Collapsing node "${e}"`, {
        type: o.type ?? "default",
        descendants: [...i],
        animate: n?.animate !== !1,
        recursive: n?.recursive ?? !1
      }), t._captureHistory();
      const r = o.type === "group", s = r ? o.collapsedDimensions ?? { width: 150, height: 60 } : void 0, l = n?.animate !== !1, a = Sh(o, t.nodes, i);
      if (l) {
        t._suspendHistory();
        const c = o.dimensions ?? Mn, d = r && s ? s : c, f = {};
        for (const [h] of a.targetPositions) {
          const g = t._nodeMap.get(h);
          if (!g) continue;
          const p = g.dimensions ?? Mn;
          let y, m;
          g.parentId === e ? (y = (d.width - p.width) / 2, m = (d.height - p.height) / 2) : (y = o.position.x + (d.width - p.width) / 2, m = o.position.y + (d.height - p.height) / 2), f[h] = {
            position: { x: y, y: m },
            style: { opacity: "0" }
          };
        }
        r && s && (f[e] = { dimensions: s });
        const u = [];
        for (const h of t.edges)
          if (i.has(h.source) || i.has(h.target)) {
            const g = t.getEdgeElement?.(h.id)?.closest("svg");
            g && u.push(g);
          }
        t.animate ? t.animate({ nodes: f }, {
          duration: 300,
          easing: "easeInOut",
          onProgress: (h) => {
            const g = String(1 - h);
            for (const p of u) p.style.opacity = g;
          },
          onComplete: () => {
            for (const h of u) h.style.opacity = "";
            Eo(o, t.nodes, a, s), a.reroutedEdges = Co(e, t.edges, i), t._collapseState.set(e, a), t._resumeHistory(), t._emit("node-collapse", { node: o, descendants: [...i] });
          }
        }) : (Eo(o, t.nodes, a, s), a.reroutedEdges = Co(e, t.edges, i), t._collapseState.set(e, a), t._resumeHistory(), t._emit("node-collapse", { node: o, descendants: [...i] }));
      } else
        Eo(o, t.nodes, a, s), a.reroutedEdges = Co(e, t.edges, i), t._collapseState.set(e, a), t._emit("node-collapse", { node: o, descendants: [...i] });
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
      if (i.reroutedEdges.size > 0 && kh(t.edges, i.reroutedEdges), s) {
        t._suspendHistory(), r && i.originalDimensions && (o.dimensions = { ...i.originalDimensions });
        const l = o.dimensions ?? Mn;
        gs(o, t.nodes, i, r);
        const a = {};
        for (const [f, u] of i.targetPositions) {
          const h = t._nodeMap.get(f);
          if (h && !h.hidden) {
            const g = h.dimensions ?? Mn;
            let p, y;
            h.parentId === e ? (p = (l.width - g.width) / 2, y = (l.height - g.height) / 2) : (p = o.position.x + (l.width - g.width) / 2, y = o.position.y + (l.height - g.height) / 2), h.position = { x: p, y }, h.style = { ...h.style || {}, opacity: "0" }, a[f] = {
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
        gs(o, t.nodes, i, r), t._collapseState.delete(e), t._emit("node-expand", { node: o, descendants: [...i.targetPositions.keys()] });
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
      return hs(e, t.nodes, t.edges).size;
    },
    /**
     * Get the number of descendants (via parentId hierarchy) of a node.
     */
    getDescendantCount(e) {
      return ut(e, t.nodes).size;
    }
  };
}
function Lh(t) {
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
function Mh(t) {
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
const Th = 8, Ah = 12, Nh = 2;
function wi(t) {
  return {
    width: t.dimensions?.width ?? ve,
    height: t.dimensions?.height ?? _e
  };
}
function Ih(t) {
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
function $h(t) {
  return [...t].sort((e, n) => {
    const o = e.order ?? 1 / 0, i = n.order ?? 1 / 0;
    return o !== i ? o - i : 0;
  });
}
function ps(t, e, n) {
  const o = e.gap ?? Th, i = e.padding ?? Ah, r = e.headerHeight ?? 0, s = Ih(e), l = $h(t), a = /* @__PURE__ */ new Map(), c = /* @__PURE__ */ new Map();
  if (l.length === 0)
    return {
      positions: a,
      dimensions: c,
      parentDimensions: n ? { width: n.width, height: n.height } : { width: i * 2, height: i * 2 + r }
    };
  const d = n ? n.width - i * 2 : 0, f = n ? n.height - i * 2 - r : 0;
  return e.direction === "vertical" ? Dh(l, o, i, r, s, d, a, c) : e.direction === "horizontal" ? Rh(l, o, i, r, s, f, a, c) : Hh(l, o, i, r, s, e.columns ?? Nh, d, f, a, c);
}
function Dh(t, e, n, o, i, r, s, l) {
  let a = 0;
  const c = t.map((u) => wi(u));
  for (const u of c) a = Math.max(a, u.width);
  const d = r > 0 ? r : a;
  let f = n + o;
  for (let u = 0; u < t.length; u++) {
    const h = t[u], g = c[u];
    s.set(h.id, { x: n, y: f }), (i === "width" || i === "both") && l.set(h.id, { width: d, height: g.height }), f += g.height + e;
  }
  return f -= e, f += n, {
    positions: s,
    dimensions: l,
    parentDimensions: { width: d + n * 2, height: f }
  };
}
function Rh(t, e, n, o, i, r, s, l) {
  let a = 0;
  const c = t.map((u) => wi(u));
  for (const u of c) a = Math.max(a, u.height);
  const d = r > 0 ? r : a;
  let f = n;
  for (let u = 0; u < t.length; u++) {
    const h = t[u], g = c[u];
    s.set(h.id, { x: f, y: n + o }), (i === "height" || i === "both") && l.set(h.id, { width: g.width, height: d }), f += g.width + e;
  }
  return f -= e, f += n, {
    positions: s,
    dimensions: l,
    parentDimensions: { width: f, height: d + n * 2 + o }
  };
}
function Hh(t, e, n, o, i, r, s, l, a, c) {
  const d = Math.min(r, t.length), f = t.map((m) => wi(m));
  let u = 0, h = 0;
  for (const m of f)
    u = Math.max(u, m.width), h = Math.max(h, m.height);
  const g = s > 0 ? (s - (d - 1) * e) / d : 0;
  g > 0 && (u = g);
  const p = Math.ceil(t.length / d), y = l > 0 ? (l - (p - 1) * e) / p : 0;
  y > 0 && (h = y);
  for (let m = 0; m < t.length; m++) {
    const C = m % d, T = Math.floor(m / d), b = n + C * (u + e), M = n + o + T * (h + e);
    a.set(t[m].id, { x: b, y: M }), i === "both" ? c.set(t[m].id, { width: u, height: h }) : i === "width" ? c.set(t[m].id, { width: u, height: f[m].height }) : i === "height" && c.set(t[m].id, { width: f[m].width, height: h });
  }
  return {
    positions: a,
    dimensions: c,
    parentDimensions: {
      width: d * u + (d - 1) * e + n * 2,
      height: p * h + (p - 1) * e + n * 2 + o
    }
  };
}
function Fh(t) {
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
      const g = f.childLayout, p = g.headerHeight !== void 0 ? g : f.data?.label ? { ...g, headerHeight: 30 } : g, y = ps(u, p, d);
      for (const [b, M] of y.positions) {
        if (b === s || a && b === a.id && !t._nodeMap.has(b)) continue;
        const P = h.get(b);
        P && (P.position ? (P.position.x = M.x, P.position.y = M.y) : P.position = { x: M.x, y: M.y });
      }
      for (const [b, M] of y.dimensions) {
        if (b === s || a && b === a.id && !t._nodeMap.has(b)) continue;
        const P = h.get(b);
        if (P) {
          let L = M.width, $ = M.height;
          P.minDimensions && (P.minDimensions.width != null && (L = Math.max(L, P.minDimensions.width)), P.minDimensions.height != null && ($ = Math.max($, P.minDimensions.height))), P.maxDimensions && (P.maxDimensions.width != null && (L = Math.min(L, P.maxDimensions.width)), P.maxDimensions.height != null && ($ = Math.min($, P.maxDimensions.height))), P.dimensions ? (P.dimensions.width = L, P.dimensions.height = $) : P.dimensions = { width: L, height: $ }, P.childLayout && !c && this.layoutChildren(b, { excludeId: s, omitFromComputation: l, shallow: !1, stretchedSize: P.dimensions });
        }
      }
      let m = y.parentDimensions.width, C = y.parentDimensions.height;
      if (f.minDimensions && (f.minDimensions.width != null && (m = Math.max(m, f.minDimensions.width)), f.minDimensions.height != null && (C = Math.max(C, f.minDimensions.height))), f.maxDimensions && (f.maxDimensions.width != null && (m = Math.min(m, f.maxDimensions.width)), f.maxDimensions.height != null && (C = Math.min(C, f.maxDimensions.height))), f.dimensions || (f.dimensions = { width: 0, height: 0 }), f.dimensions.width = m, f.dimensions.height = C, m !== y.parentDimensions.width || C !== y.parentDimensions.height) {
        const M = ps(u, p, { width: m, height: C });
        for (const [P, L] of M.positions) {
          if (P === s || a && P === a.id && !t._nodeMap.has(P)) continue;
          const $ = h.get(P);
          $ && ($.position ? ($.position.x = L.x, $.position.y = L.y) : $.position = { x: L.x, y: L.y });
        }
        for (const [P, L] of M.dimensions) {
          if (P === s || a && P === a.id && !t._nodeMap.has(P)) continue;
          const $ = h.get(P);
          if ($) {
            let _ = L.width, E = L.height;
            $.minDimensions && ($.minDimensions.width != null && (_ = Math.max(_, $.minDimensions.width)), $.minDimensions.height != null && (E = Math.max(E, $.minDimensions.height))), $.maxDimensions && ($.maxDimensions.width != null && (_ = Math.min(_, $.maxDimensions.width)), $.maxDimensions.height != null && (E = Math.min(E, $.maxDimensions.height))), $.dimensions ? ($.dimensions.width = _, $.dimensions.height = E) : $.dimensions = { width: _, height: E }, $.childLayout && !c && this.layoutChildren(P, { excludeId: s, omitFromComputation: l, shallow: !1, stretchedSize: $.dimensions });
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
      const n = Mt("layout:dagre");
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
      const n = Mt("layout:force");
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
      const n = Mt("layout:hierarchy");
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
      const n = Mt("layout:elk");
      if (!n)
        throw new Error("elkLayout() requires the elk plugin. Register it with: Alpine.plugin(AlpineFlowElk)");
      const o = e?.direction ?? "DOWN", i = e?.includeChildren ? t.nodes : t.nodes.filter((s) => !s.parentId), r = await n(i, t.edges, {
        algorithm: e?.algorithm,
        direction: o,
        nodeSpacing: e?.nodeSpacing,
        layerSpacing: e?.layerSpacing
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
function Oh(t) {
  return {
    // ── Internal helpers ──────────────────────────────────────────────────
    _getChildValidation(e) {
      const n = t.getNode(e);
      if (n)
        return rn(n, t._config.childValidationRules ?? {});
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
        const r = rn(i, t._config.childValidationRules ?? {});
        if (!r) {
          t._validationErrorCache.delete(o);
          continue;
        }
        const s = t.nodes.filter((a) => a.parentId === o), l = ls(i, s, r);
        l.length > 0 ? t._validationErrorCache.set(o, l) : t._validationErrorCache.delete(o), i._validationErrors = l;
      }
    },
    // ── Child Validation API ─────────────────────────────────────────────
    validateParent(e) {
      const n = t.getNode(e);
      if (!n) return { valid: !0, errors: [] };
      const o = rn(n, t._config.childValidationRules ?? {});
      if (!o) return { valid: !0, errors: [] };
      const i = t.nodes.filter((s) => s.parentId === e), r = ls(n, i, o);
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
                (p) => p.parentId === i
              ), g = eo(u, o, h, f);
              if (!g.valid)
                return t._config.onChildValidationFail && t._config.onChildValidationFail({
                  parent: u,
                  child: o,
                  operation: "remove",
                  rule: g.rule,
                  message: g.message
                }), !1;
            }
          }
        }
        t._captureHistory();
        const d = t.getAbsolutePosition(e);
        if (o.position.x = d.x, o.position.y = d.y, o.parentId = void 0, o.extent = void 0, t.nodes = ft(t.nodes), t._rebuildNodeMap(), this._recomputeChildValidation(), i) {
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
      if (!r || ut(e, t.nodes).has(n)) return !1;
      const s = this._getChildValidation(n);
      if (s) {
        const d = t.nodes.filter(
          (u) => u.parentId === n && u.id !== e
        ), f = $r(r, o, d, s);
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
              (g) => g.parentId === i
            ), h = eo(f, o, u, d);
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
      if (o.position.x = l.x - a.x, o.position.y = l.y - a.y, o.parentId = n, t.nodes = ft(t.nodes), t._rebuildNodeMap(), this._recomputeChildValidation(), n && t._nodeMap.get(n)?.childLayout) {
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
function zh(t) {
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
function Rn(t, e, n, o, i) {
  const r = i * Math.PI / 180, s = Math.cos(r), l = Math.sin(r), a = t - n, c = e - o;
  return {
    x: n + a * s - c * l,
    y: o + a * l + c * s
  };
}
const Vr = 20, Tn = Vr + 1;
function ms(t) {
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
function Vh(t, e) {
  return {
    x: t.x - e,
    y: t.y - e,
    width: t.width + e * 2,
    height: t.height + e * 2
  };
}
function Bh(t, e, n) {
  return t > n.x && t < n.x + n.width && e > n.y && e < n.y + n.height;
}
function qh(t, e, n, o) {
  const i = Math.min(t, e), r = Math.max(t, e);
  for (const s of o) {
    const l = s.x, a = s.x + s.width, c = s.y, d = s.y + s.height;
    if (n > c && n < d && r > l && i < a)
      return !0;
  }
  return !1;
}
function Xh(t, e, n, o) {
  const i = Math.min(e, n), r = Math.max(e, n);
  for (const s of o) {
    const l = s.x, a = s.x + s.width, c = s.y, d = s.y + s.height;
    if (t > l && t < a && r > c && i < d)
      return !0;
  }
  return !1;
}
function Yh(t, e, n, o, i) {
  const r = /* @__PURE__ */ new Set([t, n]), s = /* @__PURE__ */ new Set([e, o]);
  for (const f of i)
    r.add(f.x), r.add(f.x + f.width), s.add(f.y), s.add(f.y + f.height);
  const l = Array.from(r).sort((f, u) => f - u), a = Array.from(s).sort((f, u) => f - u), c = [];
  let d = 0;
  for (const f of l)
    for (const u of a) {
      let h = !1;
      for (const g of i)
        if (Bh(f, u, g)) {
          h = !0;
          break;
        }
      h || c.push({ x: f, y: u, index: d++ });
    }
  return c;
}
function Wh(t, e, n, o) {
  const i = n.length, r = new Float64Array(i).fill(1 / 0), s = new Int32Array(i).fill(-1), l = new Uint8Array(i);
  r[t.index] = 0;
  const a = [t.index];
  for (; a.length > 0; ) {
    let f = 0;
    for (let g = 1; g < a.length; g++)
      r[a[g]] < r[a[f]] && (f = g);
    const u = a[f];
    if (a.splice(f, 1), l[u]) continue;
    if (l[u] = 1, u === e.index) break;
    const h = n[u];
    for (let g = 0; g < i; g++) {
      if (l[g]) continue;
      const p = n[g];
      if (h.x !== p.x && h.y !== p.y) continue;
      let y = !1;
      if (h.x === p.x ? y = Xh(h.x, h.y, p.y, o) : y = qh(h.x, p.x, h.y, o), y) continue;
      const m = Math.abs(p.x - h.x) + Math.abs(p.y - h.y), C = r[u] + m;
      C < r[g] && (r[g] = C, s[g] = u, a.push(g));
    }
  }
  if (r[e.index] === 1 / 0) return null;
  const c = [];
  let d = e.index;
  for (; d !== -1; )
    c.unshift(n[d]), d = s[d];
  return c;
}
function jh(t) {
  if (t.length <= 2) return t;
  const e = [t[0]];
  for (let n = 1; n < t.length - 1; n++) {
    const o = e[e.length - 1], i = t[n + 1], r = t[n], s = o.x === r.x && r.x === i.x, l = o.y === r.y && r.y === i.y;
    !s && !l && e.push(r);
  }
  return e.push(t[t.length - 1]), e;
}
function Uh(t, e) {
  if (t.length < 2) return "";
  let n = `M${t[0].x},${t[0].y}`;
  for (let i = 1; i < t.length - 1; i++) {
    const r = t[i - 1], s = t[i], l = t[i + 1];
    e > 0 ? n += ` ${Bt(r.x, r.y, s.x, s.y, l.x, l.y, e)}` : n += ` L${s.x},${s.y}`;
  }
  const o = t[t.length - 1];
  return n += ` L${o.x},${o.y}`, n;
}
function Zh(t) {
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
function Br(t, e, n, o, i, r, s) {
  const l = ms(n), a = ms(r), c = t + l.x * Tn, d = e + l.y * Tn, f = o + a.x * Tn, u = i + a.y * Tn, h = s.map((M) => Vh(M, Vr)), g = Yh(
    c,
    d,
    f,
    u,
    h
  ), p = g.find((M) => M.x === c && M.y === d), y = g.find((M) => M.x === f && M.y === u);
  p || g.push({ x: c, y: d, index: g.length }), y || g.push({ x: f, y: u, index: g.length });
  const m = p ?? g[g.length - (y ? 1 : 2)], C = y ?? g[g.length - 1], T = Wh(m, C, g, h);
  if (!T || T.length < 2) return null;
  const b = [
    { x: t, y: e, index: -1 },
    ...T,
    { x: o, y: i, index: -2 }
  ];
  return jh(b);
}
function Kh({
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
    return gn({
      sourceX: t,
      sourceY: e,
      sourcePosition: n,
      targetX: o,
      targetY: i,
      targetPosition: r,
      borderRadius: l
    });
  const a = Br(t, e, n, o, i, r, s);
  if (!a)
    return gn({
      sourceX: t,
      sourceY: e,
      sourcePosition: n,
      targetX: o,
      targetY: i,
      targetPosition: r,
      borderRadius: l
    });
  const c = Uh(a, l), { x: d, y: f, offsetX: u, offsetY: h } = Zh(a);
  return {
    path: c,
    labelPosition: { x: d, y: f },
    labelOffsetX: u,
    labelOffsetY: h
  };
}
function qr(t) {
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
function Gh(t) {
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
function Jh({
  sourceX: t,
  sourceY: e,
  sourcePosition: n = "bottom",
  targetX: o,
  targetY: i,
  targetPosition: r = "top",
  obstacles: s
}) {
  if (!s || s.length === 0)
    return Zn({
      sourceX: t,
      sourceY: e,
      sourcePosition: n,
      targetX: o,
      targetY: i,
      targetPosition: r
    });
  const l = Br(t, e, n, o, i, r, s);
  if (!l)
    return Zn({
      sourceX: t,
      sourceY: e,
      sourcePosition: n,
      targetX: o,
      targetY: i,
      targetPosition: r
    });
  const a = qr(l), { x: c, y: d, offsetX: f, offsetY: u } = Gh(l);
  return {
    path: a,
    labelPosition: { x: c, y: d },
    labelOffsetX: f,
    labelOffsetY: u
  };
}
function Qh(t) {
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
      c = ys(a);
      break;
    case "step":
      c = eg(a, 0);
      break;
    case "smoothstep":
      c = tg(a, l);
      break;
    case "catmull-rom":
    case "bezier":
      c = qr(a.map((u, h) => ({ ...u, index: h })));
      break;
    default:
      c = ys(a);
  }
  const d = ng(a), f = wn({ sourceX: e, sourceY: n, targetX: o, targetY: i });
  return {
    path: c,
    labelPosition: d,
    labelOffsetX: f.offsetX,
    labelOffsetY: f.offsetY
  };
}
function ys(t) {
  if (t.length < 2) return "";
  let e = `M${t[0].x},${t[0].y}`;
  for (let n = 1; n < t.length; n++)
    e += ` L${t[n].x},${t[n].y}`;
  return e;
}
function eg(t, e) {
  if (t.length < 2) return "";
  if (t.length === 2)
    return Xr(t[0], t[1], e);
  let n = `M${t[0].x},${t[0].y}`;
  for (let i = 1; i < t.length - 1; i++) {
    const r = t[i - 1], s = t[i], l = t[i + 1];
    n += Bt(r.x, r.y, s.x, s.y, l.x, l.y, e);
  }
  const o = t[t.length - 1];
  return n += ` L${o.x},${o.y}`, n;
}
function Xr(t, e, n) {
  const o = (t.x + e.x) / 2, i = Bt(t.x, t.y, o, t.y, o, e.y, n), r = Bt(o, t.y, o, e.y, e.x, e.y, n);
  return `M${t.x},${t.y}${i}${r} L${e.x},${e.y}`;
}
function tg(t, e) {
  if (t.length < 2) return "";
  if (t.length === 2)
    return Xr(t[0], t[1], e);
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
    o += Bt(s.x, s.y, l.x, l.y, a.x, a.y, e);
  }
  const i = n[n.length - 1];
  return o += ` L${i.x},${i.y}`, o;
}
function ng(t) {
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
function Xt(t, e, n, o) {
  const i = t.dimensions?.width ?? ve, r = t.dimensions?.height ?? _e, s = Yt(t, o);
  let l;
  if (t.shape) {
    const a = n?.[t.shape] ?? Ar[t.shape];
    if (a) {
      const c = a.perimeterPoint(i, r, e);
      l = { x: s.x + c.x, y: s.y + c.y };
    } else {
      const c = rs(i, r, e);
      l = { x: s.x + c.x, y: s.y + c.y };
    }
  } else {
    const a = rs(i, r, e);
    l = { x: s.x + a.x, y: s.y + a.y };
  }
  if (t.rotation) {
    const a = s.x + i / 2, c = s.y + r / 2;
    l = Rn(l.x, l.y, a, c, t.rotation);
  }
  return l;
}
function ws(t) {
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
function Go(t) {
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
const og = 1.5, ig = 5 / 20;
function Tt(t, e, n, o) {
  if (!o) return t;
  const i = typeof o == "string" ? {} : o, r = n ? Math.min(n.handleWidth, n.handleHeight) / 2 : 5;
  if (i.offset !== void 0) {
    const f = Go(e);
    return { x: t.x + f.x * i.offset, y: t.y + f.y * i.offset };
  }
  const a = (i.width ?? 12.5) * og * ig * 0.4, c = r + a, d = Go(e);
  return { x: t.x + d.x * c, y: t.y + d.y * c };
}
function to(t, e, n, o = "bottom", i = "top", r, s, l, a, c, d, f) {
  const u = r ?? Xt(e, o, c, d), h = s ?? Xt(n, i, c, d), g = {
    sourceX: u.x,
    sourceY: u.y,
    sourcePosition: ws(o),
    targetX: h.x,
    targetY: h.y,
    targetPosition: ws(i)
  }, p = t.type ?? f ?? "bezier";
  if (l?.[p])
    return l[p](g);
  switch (p === "floating" ? t.pathType ?? "bezier" : p) {
    case "editable":
      return Qh({
        ...g,
        controlPoints: t.controlPoints,
        pathStyle: t.pathStyle
      });
    case "avoidant":
      return Jh({ ...g, obstacles: a });
    case "orthogonal":
      return Kh({ ...g, obstacles: a });
    case "smoothstep":
      return gn(g);
    case "straight":
      return Sr({ sourceX: u.x, sourceY: u.y, targetX: h.x, targetY: h.y });
    default:
      return Zn(g);
  }
}
function vs(t, e) {
  const n = t.dimensions?.width ?? ve, o = t.dimensions?.height ?? _e, i = {
    x: t.position.x + n / 2,
    y: t.position.y + o / 2
  }, r = t.rotation ? Rn(e.x, e.y, i.x, i.y, -t.rotation) : e, s = r.x - i.x, l = r.y - i.y;
  if (s === 0 && l === 0) {
    const g = { x: i.x, y: i.y - o / 2 };
    return t.rotation ? Rn(g.x, g.y, i.x, i.y, t.rotation) : g;
  }
  const a = n / 2, c = o / 2, d = Math.abs(s), f = Math.abs(l);
  let u;
  d / a > f / c ? u = a / d : u = c / f;
  const h = {
    x: i.x + s * u,
    y: i.y + l * u
  };
  return t.rotation ? Rn(h.x, h.y, i.x, i.y, t.rotation) : h;
}
function _s(t, e) {
  const n = t.dimensions?.width ?? ve, o = t.dimensions?.height ?? _e, i = t.position.x + n / 2, r = t.position.y + o / 2;
  if (t.rotation) {
    const h = e.x - i, g = e.y - r;
    return Math.abs(h) > Math.abs(g) ? h > 0 ? "right" : "left" : g > 0 ? "bottom" : "top";
  }
  const s = 1, l = t.position.x, a = t.position.x + n, c = t.position.y, d = t.position.y + o;
  if (Math.abs(e.x - l) <= s) return "left";
  if (Math.abs(e.x - a) <= s) return "right";
  if (Math.abs(e.y - c) <= s) return "top";
  if (Math.abs(e.y - d) <= s) return "bottom";
  const f = e.x - i, u = e.y - r;
  return Math.abs(f) > Math.abs(u) ? f > 0 ? "right" : "left" : u > 0 ? "bottom" : "top";
}
function Yr(t, e) {
  const n = t.dimensions?.width ?? ve, o = t.dimensions?.height ?? _e, i = e.dimensions?.width ?? ve, r = e.dimensions?.height ?? _e, s = {
    x: t.position.x + n / 2,
    y: t.position.y + o / 2
  }, l = {
    x: e.position.x + i / 2,
    y: e.position.y + r / 2
  }, a = vs(t, l), c = vs(e, s), d = _s(t, a), f = _s(e, c);
  return {
    sx: a.x,
    sy: a.y,
    tx: c.x,
    ty: c.y,
    sourcePos: d,
    targetPos: f
  };
}
function Bm(t, e) {
  const n = e.x - t.x, o = e.y - t.y;
  let i, r;
  return Math.abs(n) > Math.abs(o) ? (i = n > 0 ? "right" : "left", r = n > 0 ? "left" : "right") : (i = o > 0 ? "bottom" : "top", r = o > 0 ? "top" : "bottom"), { sourcePos: i, targetPos: r };
}
function Wr(t) {
  return typeof t == "object" && t !== null && "from" in t && "to" in t;
}
function jr(t, e) {
  return `${t}__grad__${e}`;
}
function Ur(t, e, n, o, i, r, s) {
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
function So(t, e) {
  t.querySelector(`#${CSS.escape(e)}`)?.remove();
}
const sg = /* @__PURE__ */ new Set(["x-data", "x-init", "x-bind", "href", "src", "action", "formaction", "srcdoc"]);
async function rg(t) {
  const { dropNodeId: e, dropHandleId: n, draggedEnd: o, edge: i, canvas: r, containerEl: s } = t;
  if (!e)
    return { applied: !1 };
  const l = r.getNode(e);
  if (l && !Oe(l))
    return { applied: !1 };
  const a = o === "target" ? { source: i.source, sourceHandle: i.sourceHandle, target: e, targetHandle: n } : { source: e, sourceHandle: n, target: i.target, targetHandle: i.targetHandle }, c = { ...i }, d = await Pr({
    edge: i,
    newConnection: a,
    canvas: r,
    containerEl: s,
    endpoint: o
  });
  return d.applied ? (r._emit?.("reconnect", { oldEdge: c, newConnection: a }), { applied: !0, newConnection: a }) : { applied: !1, reason: d.reason, newConnection: a };
}
function ag(t) {
  return t === !0 || t === "dash" ? "dash" : t === "pulse" ? "pulse" : t === "dot" ? "dot" : "none";
}
function Zr(t) {
  return t.endsWith("-l") ? "left" : t.endsWith("-r") ? "right" : null;
}
function bs(t, e) {
  if (!e) return t;
  const n = Go(t), o = e * Math.PI / 180, i = Math.cos(o), r = Math.sin(o), s = n.x * i - n.y * r, l = n.x * r + n.y * i;
  return Math.abs(s) > Math.abs(l) ? s > 0 ? "right" : "left" : l > 0 ? "bottom" : "top";
}
function xs(t) {
  return { x: (t.left + t.right) / 2, y: (t.top + t.bottom) / 2 };
}
function no(t, e) {
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
function oo(t, e, n, o, i, r) {
  const s = t.querySelector(`[data-flow-node-id="${CSS.escape(e)}"]`);
  if (s) {
    if (n) {
      const a = s.querySelectorAll(
        `[data-flow-handle-id="${CSS.escape(n)}"][data-flow-handle-type="${o}"]`
      );
      let c = no(a, r);
      if (!c) {
        const d = s.querySelectorAll(
          `[data-flow-handle-id="${CSS.escape(n)}"]`
        );
        c = no(d, r);
      }
      if (c)
        return c.getAttribute("data-flow-handle-position") ?? (o === "source" ? "bottom" : "top");
    }
    if (n) {
      const a = Zr(n);
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
function Es(t, e, n, o, i, r, s, l) {
  const a = t.querySelector(`[data-flow-node-id="${CSS.escape(e)}"]`);
  if (!a) return null;
  let c = null;
  if (o) {
    const g = a.querySelectorAll(
      `[data-flow-handle-id="${CSS.escape(o)}"][data-flow-handle-type="${i}"]`
    );
    if (c = no(g, l), !c) {
      const p = a.querySelectorAll(
        `[data-flow-handle-id="${CSS.escape(o)}"]`
      );
      c = no(p, l);
    }
    if (!c) {
      const p = Zr(o);
      p && (c = a.querySelector(`[data-flow-handle-position="${p}"]`));
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
function lg(t, e) {
  const n = t.getTotalLength(), o = t.getPointAtLength(n * Math.max(0, Math.min(1, e)));
  return { x: o.x, y: o.y };
}
function rt(t, e, n, o, i) {
  const r = t - n, s = e - o;
  return Math.sqrt(r * r + s * s) <= i;
}
function cg(t, e, n) {
  const o = n.x - e.x, i = n.y - e.y, r = o * o + i * i;
  if (r === 0) return Math.sqrt((t.x - e.x) ** 2 + (t.y - e.y) ** 2);
  let s = ((t.x - e.x) * o + (t.y - e.y) * i) / r;
  s = Math.max(0, Math.min(1, s));
  const l = e.x + s * o, a = e.y + s * i;
  return Math.sqrt((t.x - l) ** 2 + (t.y - a) ** 2);
}
function dg(t) {
  t.directive(
    "flow-edge",
    (e, { expression: n }, { evaluate: o, effect: i, cleanup: r }) => {
      const s = e;
      s.style.pointerEvents = "auto";
      const l = document.createElementNS("http://www.w3.org/2000/svg", "path");
      l.setAttribute("fill", "none"), l.style.stroke = "transparent", l.style.strokeWidth = "20", l.style.pointerEvents = "stroke", l.style.cursor = "pointer", s.appendChild(l);
      let a = e.querySelector("path:not(:first-child)");
      a || (a = document.createElementNS("http://www.w3.org/2000/svg", "path"), a.setAttribute("fill", "none"), a.setAttribute("stroke-width", "1.5"), a.style.pointerEvents = "none", s.appendChild(a));
      let c = null, d = null, f = null, u = null, h = "none", g = null, p = null;
      function y(S, k, R, q, re) {
        u || (u = document.createElementNS("http://www.w3.org/2000/svg", "circle"), u.classList.add("flow-edge-dot"), u.style.pointerEvents = "none", S.appendChild(u));
        const te = R.closest(".flow-container"), oe = te ? getComputedStyle(te) : null, ae = q.particleSize ?? (parseFloat(oe?.getPropertyValue("--flow-edge-dot-size").trim() ?? "4") || 4), de = re || oe?.getPropertyValue("--flow-edge-dot-duration").trim() || "2s";
        u.setAttribute("r", String(ae)), q.particleColor ? u.style.fill = q.particleColor : u.style.removeProperty("fill");
        const le = u.querySelector("animateMotion");
        le && le.remove();
        const J = document.createElementNS("http://www.w3.org/2000/svg", "animateMotion");
        J.setAttribute("dur", de), J.setAttribute("repeatCount", "indefinite"), J.setAttribute("path", k), u.appendChild(J);
      }
      function m() {
        u?.remove(), u = null;
      }
      let C = null, T = null, b = null, M = null;
      const P = (S) => {
        S.stopPropagation();
        const k = o(n);
        if (!k) return;
        const R = t.$data(e.closest("[x-data]"));
        R && (R._emit("edge-click", { edge: k, event: S }), dt(S, R._shortcuts?.multiSelect) ? R.selectedEdges.has(k.id) ? (R.selectedEdges.delete(k.id), k.selected = !1, B("selection", `Edge "${k.id}" deselected (shift)`)) : (R.selectedEdges.add(k.id), k.selected = !0, B("selection", `Edge "${k.id}" selected (shift)`)) : (R.deselectAll(), R.selectedEdges.add(k.id), k.selected = !0, B("selection", `Edge "${k.id}" selected`)), R._emitSelectionChange());
      }, L = (S) => {
        S.preventDefault(), S.stopPropagation();
        const k = o(n);
        if (!k) return;
        const R = t.$data(e.closest("[x-data]"));
        if (!R) return;
        const q = S.target;
        if (q.classList.contains("flow-edge-control-point")) {
          const re = parseInt(q.dataset.pointIndex ?? "", 10);
          if (!isNaN(re)) {
            R._emit("edge-control-point-context-menu", {
              edge: k,
              pointIndex: re,
              position: { x: S.clientX, y: S.clientY },
              event: S
            });
            return;
          }
        }
        R._emit("edge-context-menu", { edge: k, event: S });
      }, $ = (S) => {
        S.stopPropagation(), S.preventDefault();
        const k = o(n), R = t.$data(e.closest("[x-data]"));
        if (!k || !R || (k.type ?? R._config?.defaultEdgeType ?? "bezier") !== "editable") return;
        const re = S.target;
        if (re.classList.contains("flow-edge-control-point")) {
          const te = parseInt(re.dataset.pointIndex ?? "", 10);
          !isNaN(te) && k.controlPoints && (R._captureHistory?.(), k.controlPoints.splice(te, 1), R._emit("edge-control-point-change", { edge: k, action: "remove", index: te }));
          return;
        }
        if (re.classList.contains("flow-edge-midpoint")) {
          const te = parseInt(re.dataset.segmentIndex ?? "", 10);
          if (!isNaN(te)) {
            const oe = R.screenToFlowPosition(S.clientX, S.clientY);
            k.controlPoints || (k.controlPoints = []), R._captureHistory?.(), k.controlPoints.splice(te, 0, { x: oe.x, y: oe.y }), R._emit("edge-control-point-change", { edge: k, action: "add", index: te });
          }
          return;
        }
        if (re.closest("path")) {
          const te = R.screenToFlowPosition(S.clientX, S.clientY);
          k.controlPoints || (k.controlPoints = []);
          const oe = [
            C ?? { x: 0, y: 0 },
            ...k.controlPoints,
            T ?? { x: 0, y: 0 }
          ];
          let ae = 0, de = 1 / 0;
          for (let le = 0; le < oe.length - 1; le++) {
            const J = cg(te, oe[le], oe[le + 1]);
            J < de && (de = J, ae = le);
          }
          R._captureHistory?.(), k.controlPoints.splice(ae, 0, { x: te.x, y: te.y }), R._emit("edge-control-point-change", { edge: k, action: "add", index: ae });
        }
      }, _ = (S) => {
        const k = S.target;
        if (!k.classList.contains("flow-edge-control-point") || S.button !== 0) return;
        S.stopPropagation(), S.preventDefault();
        const R = o(n);
        if (!R?.controlPoints) return;
        const q = t.$data(e.closest("[x-data]"));
        if (!q) return;
        const re = parseInt(k.dataset.pointIndex ?? "", 10);
        if (isNaN(re)) return;
        k.classList.add("dragging");
        let te = !1;
        const oe = (de) => {
          te || (q._captureHistory?.(), te = !0);
          let le = q.screenToFlowPosition(de.clientX, de.clientY);
          const J = q._config?.snapToGrid;
          J && (le = {
            x: Math.round(le.x / J[0]) * J[0],
            y: Math.round(le.y / J[1]) * J[1]
          }), R.controlPoints[re] = le;
        }, ae = () => {
          document.removeEventListener("pointermove", oe), document.removeEventListener("pointerup", ae), k.classList.remove("dragging"), te && q._emit("edge-control-point-change", { edge: R, action: "move", index: re });
        };
        document.addEventListener("pointermove", oe), document.addEventListener("pointerup", ae);
      };
      s.addEventListener("contextmenu", L), s.addEventListener("dblclick", $), s.addEventListener("pointerdown", _, !0);
      let E = null;
      const v = (S) => {
        if (S.button !== 0) return;
        S.stopPropagation();
        const k = o(n);
        if (!k) return;
        const R = t.$data(e.closest("[x-data]"));
        if (!R) return;
        const q = R._config?.reconnectSnapRadius ?? Xi, re = R._config?.edgesReconnectable !== !1, te = k.reconnectable ?? !0;
        let oe = null;
        if (re && te !== !1 && C && T) {
          const z = R.screenToFlowPosition(S.clientX, S.clientY), ce = rt(z.x, z.y, C.x, C.y, q) || b && rt(z.x, z.y, b.x, b.y, q);
          (rt(z.x, z.y, T.x, T.y, q) || M && rt(z.x, z.y, M.x, M.y, q)) && (te === !0 || te === "target") ? oe = "target" : ce && (te === !0 || te === "source") && (oe = "source");
        }
        if (!oe) {
          const z = (ce) => {
            document.removeEventListener("pointerup", z), P(ce);
          };
          document.addEventListener("pointerup", z, { once: !0 });
          return;
        }
        const ae = S.clientX, de = S.clientY;
        let le = !1, J = !1, K = null;
        const X = R._config?.connectionSnapRadius ?? 20;
        let j = null, Q = null, H = null, I = ae, ie = de;
        const G = e.closest(".flow-container");
        if (!G) return;
        const ee = oe === "target" ? C : T, ne = () => {
          le = !0, s.classList.add("flow-edge-reconnecting"), R._emit("reconnect-start", { edge: k, handleType: oe }), B("reconnect", `Reconnection drag started on edge "${k.id}" (${oe} end)`), Q = Rt({
            connectionLineType: R._config?.connectionLineType,
            connectionLineStyle: R._config?.connectionLineStyle,
            connectionLine: R._config?.connectionLine,
            containerEl: s.closest(".flow-container") ?? void 0
          }), j = Q.svg;
          const z = R.screenToFlowPosition(ae, de);
          Q.update({
            fromX: ee.x,
            fromY: ee.y,
            toX: z.x,
            toY: z.y,
            source: k.source,
            sourceHandle: k.sourceHandle
          });
          const ce = G.querySelector(".flow-viewport");
          ce && ce.appendChild(j), oe === "target" && (R.pendingConnection = {
            source: k.source,
            sourceHandle: k.sourceHandle,
            position: z
          }), R._pendingReconnection = {
            edge: k,
            draggedEnd: oe,
            anchorPosition: { ...ee },
            position: z
          }, H = Kn(G, R, I, ie), oe === "target" && sn(G, k.source, k.sourceHandle ?? "source", R, k.id);
        }, Y = (z) => {
          if (I = z.clientX, ie = z.clientY, !le) {
            Math.sqrt(
              (z.clientX - ae) ** 2 + (z.clientY - de) ** 2
            ) >= Dn && ne();
            return;
          }
          const ce = R.screenToFlowPosition(z.clientX, z.clientY), F = on({
            containerEl: G,
            handleType: oe === "target" ? "target" : "source",
            excludeNodeId: oe === "target" ? k.source : k.target,
            cursorFlowPos: ce,
            connectionSnapRadius: X,
            getNode: (se) => R.getNode(se),
            toFlowPosition: (se, fe) => R.screenToFlowPosition(se, fe)
          });
          F.element !== K && (K?.classList.remove("flow-handle-active"), F.element?.classList.add("flow-handle-active"), K = F.element), Q?.update({
            fromX: ee.x,
            fromY: ee.y,
            toX: F.position.x,
            toY: F.position.y,
            source: k.source,
            sourceHandle: k.sourceHandle
          });
          const W = F.position;
          oe === "target" && R.pendingConnection && (R.pendingConnection = {
            ...R.pendingConnection,
            position: W
          }), R._pendingReconnection && (R._pendingReconnection = {
            ...R._pendingReconnection,
            position: W
          }), H?.updatePointer(z.clientX, z.clientY);
        }, V = () => {
          J || (J = !0, document.removeEventListener("pointermove", Y), document.removeEventListener("pointerup", Z), H?.stop(), H = null, Q?.destroy(), Q = null, j = null, K?.classList.remove("flow-handle-active"), E = null, s.classList.remove("flow-edge-reconnecting"), Pe(G), R.pendingConnection = null, R._pendingReconnection = null);
        }, Z = async (z) => {
          if (!le) {
            V(), P(z);
            return;
          }
          if (R._connectValidating) return;
          let ce = K, F = null;
          if (!ce) {
            F = document.elementFromPoint(z.clientX, z.clientY);
            const Ee = oe === "target" ? '[data-flow-handle-type="target"]' : '[data-flow-handle-type="source"]';
            ce = F?.closest(Ee);
          }
          const se = (ce ? ce.closest("[data-flow-node-id]") : F?.closest("[data-flow-node-id]"))?.dataset.flowNodeId, fe = ce?.dataset.flowHandleId, ge = Q?.svg ?? null;
          vt(ge, !0);
          let pe;
          try {
            pe = await rg({
              dropNodeId: se,
              dropHandleId: fe,
              draggedEnd: oe,
              edge: k,
              canvas: R,
              containerEl: G
            });
          } finally {
            vt(ge, !1);
          }
          pe.applied ? B("reconnect", `Edge "${k.id}" reconnected (${oe})`, pe.newConnection) : B("reconnect", `Edge "${k.id}" reconnection cancelled — snapping back`, { reason: pe.reason }), R._emit("reconnect-end", { edge: k, successful: pe.applied }), V();
        };
        document.addEventListener("pointermove", Y), document.addEventListener("pointerup", Z), E = V;
      };
      s.addEventListener("pointerdown", v);
      const w = (S) => {
        const k = o(n);
        if (!k) return;
        const R = t.$data(e.closest("[x-data]"));
        if (!R) return;
        const q = R._config?.edgesReconnectable !== !1, re = k.reconnectable ?? !0;
        if (!q || re === !1 || !C || !T) {
          s.style.removeProperty("cursor"), l.style.cursor = "pointer";
          return;
        }
        const te = R._config?.reconnectSnapRadius ?? Xi, oe = R.screenToFlowPosition(S.clientX, S.clientY), ae = (rt(oe.x, oe.y, C.x, C.y, te) || b && rt(oe.x, oe.y, b.x, b.y, te)) && (re === !0 || re === "source"), de = (rt(oe.x, oe.y, T.x, T.y, te) || M && rt(oe.x, oe.y, M.x, M.y, te)) && (re === !0 || re === "target");
        ae || de ? (s.style.cursor = "grab", l.style.cursor = "grab") : (s.style.removeProperty("cursor"), l.style.cursor = "pointer");
      };
      s.addEventListener("pointermove", w);
      const D = (S) => {
        if (S.key !== "Enter" && S.key !== " ") return;
        S.preventDefault(), S.stopPropagation();
        const k = o(n);
        if (!k) return;
        const R = t.$data(e.closest("[x-data]"));
        R && (R._emit("edge-click", { edge: k, event: S }), dt(S, R._shortcuts?.multiSelect) ? R.selectedEdges.has(k.id) ? (R.selectedEdges.delete(k.id), k.selected = !1) : (R.selectedEdges.add(k.id), k.selected = !0) : (R.deselectAll(), R.selectedEdges.add(k.id), k.selected = !0), R._emitSelectionChange());
      };
      s.addEventListener("keydown", D);
      const x = () => {
        s.matches(":focus-visible") && s.classList.add("flow-edge-focused");
      }, N = () => s.classList.remove("flow-edge-focused");
      s.addEventListener("focus", x), s.addEventListener("blur", N);
      const A = (S) => {
        S.stopPropagation();
      };
      s.addEventListener("mousedown", A);
      const O = () => {
        for (const S of [c, d, f])
          S && S.classList.add("flow-edge-hovered");
      }, U = () => {
        for (const S of [c, d, f])
          S && S.classList.remove("flow-edge-hovered");
      };
      s.addEventListener("mouseenter", O), s.addEventListener("mouseleave", U), i(() => {
        const S = o(n);
        if (!S || !a) return;
        s.setAttribute("data-flow-edge-id", S.id);
        const k = t.$data(e.closest("[x-data]"));
        if (!k?.nodes) return;
        const R = S.type ?? k._config?.defaultEdgeType ?? "bezier";
        k._layoutAnimTick;
        const q = k.getNode(S.source), re = k.getNode(S.target);
        if (!q || !re) return;
        q.sourcePosition, re.targetPosition;
        const te = Ht(q, k._nodeMap, k._config?.nodeOrigin), oe = Ht(re, k._nodeMap, k._config?.nodeOrigin), ae = e.closest("[x-data]");
        let de, le, J, K;
        if (R === "floating") {
          const F = Yr(te, oe);
          de = F.sourcePos, le = F.targetPos, J = { x: F.sx, y: F.sy, handleWidth: 0, handleHeight: 0 }, K = { x: F.tx, y: F.ty, handleWidth: 0, handleHeight: 0 }, C = { x: F.sx, y: F.sy }, T = { x: F.tx, y: F.ty };
        } else {
          const F = ae.querySelector(
            `[data-flow-node-id="${CSS.escape(S.source)}"]`
          ), W = ae.querySelector(
            `[data-flow-node-id="${CSS.escape(S.target)}"]`
          ), se = F ? xs(F.getBoundingClientRect()) : void 0, fe = W ? xs(W.getBoundingClientRect()) : void 0;
          de = oo(ae, S.source, S.sourceHandle, "source", q, fe), le = oo(ae, S.target, S.targetHandle, "target", re, se);
          const ge = t.raw(k).viewport ?? { x: 0, y: 0, zoom: 1 }, pe = ge.zoom || 1, Ee = q.rotation, Ce = re.rotation;
          de = bs(de, Ee), le = bs(le, Ce), J = Es(ae, S.source, te, S.sourceHandle, "source", pe, ge, fe), K = Es(ae, S.target, oe, S.targetHandle, "target", pe, ge, se);
          const Se = Xt(te, de, k._shapeRegistry, k._config?.nodeOrigin), ue = Xt(oe, le, k._shapeRegistry, k._config?.nodeOrigin);
          C = J ?? Se, T = K ?? ue;
        }
        const X = Tt(J ?? C, de, J, S.markerStart), j = Tt(K ?? T, le, K, S.markerEnd);
        b = X, M = j;
        let Q;
        (R === "orthogonal" || R === "avoidant") && (Q = k.nodes.filter((F) => F.id !== S.source && F.id !== S.target).map((F) => {
          const W = Ht(F, k._nodeMap, k._config?.nodeOrigin);
          return {
            x: W.position.x,
            y: W.position.y,
            width: W.dimensions?.width ?? ve,
            height: W.dimensions?.height ?? _e
          };
        }));
        const { path: H, labelPosition: I } = to(S, te, oe, de, le, X, j, k._config?.edgeTypes, Q, k._shapeRegistry, k._config?.nodeOrigin, k._config?.defaultEdgeType);
        a.setAttribute("d", H), l.setAttribute("d", H);
        const ie = R === "editable", G = ie && (S.showControlPoints || S.selected);
        if (s.querySelectorAll(".flow-edge-control-point, .flow-edge-midpoint").forEach((F) => F.remove()), G) {
          const F = S.controlPoints ?? [], W = k.viewport?.zoom ?? 1, se = 6 / W, fe = 5 / W, ge = C ?? { x: 0, y: 0 }, pe = T ?? { x: 0, y: 0 }, Ee = [ge, ...F, pe], Ce = Ee.length - 1, Se = a.getTotalLength?.() ?? 0;
          if (Se > 0) {
            const ue = [0], we = 200;
            let Ne = 1;
            for (let xe = 1; xe <= we && Ne < Ee.length; xe++) {
              const He = xe / we * Se, Le = a.getPointAtLength(He), me = Ee[Ne], he = Le.x - me.x, be = Le.y - me.y;
              he * he + be * be < 25 && (ue.push(He), Ne++);
            }
            for (; ue.length <= Ce; )
              ue.push(Se);
            for (let xe = 0; xe < Ce; xe++) {
              const He = (ue[xe] + ue[xe + 1]) / 2, Le = a.getPointAtLength(He), me = document.createElementNS("http://www.w3.org/2000/svg", "circle");
              me.classList.add("flow-edge-midpoint"), me.setAttribute("cx", String(Le.x)), me.setAttribute("cy", String(Le.y)), me.setAttribute("r", String(fe)), me.dataset.segmentIndex = String(xe);
              const he = document.createElementNS("http://www.w3.org/2000/svg", "title");
              he.textContent = "Double-click to add control point", me.appendChild(he), s.appendChild(me);
            }
          }
          for (let ue = 0; ue < F.length; ue++) {
            const we = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            we.classList.add("flow-edge-control-point"), we.setAttribute("cx", String(F[ue].x)), we.setAttribute("cy", String(F[ue].y)), we.setAttribute("r", String(se)), we.dataset.pointIndex = String(ue), s.appendChild(we);
          }
        }
        if (l.style.cursor = ie ? "crosshair" : "pointer", l.style.strokeWidth = String(
          S.interactionWidth ?? k._config?.defaultInteractionWidth ?? 20
        ), S.markerStart != null) {
          const F = It(S.markerStart), W = $t(F, k._id);
          a.setAttribute("marker-start", `url(#${W})`);
        } else if (S._renderDualMarker && S.markerEnd) {
          const F = It(S.markerEnd), W = $t(F, k._id);
          a.setAttribute("marker-start", `url(#${W})`);
        } else
          a.removeAttribute("marker-start");
        if (S.markerEnd) {
          const F = It(S.markerEnd), W = $t(F, k._id);
          a.setAttribute("marker-end", `url(#${W})`);
        } else
          a.removeAttribute("marker-end");
        const ee = S.strokeWidth ?? 1.5, ne = ag(S.animated);
        switch (ne !== h && (a.classList.remove("flow-edge-animated", "flow-edge-pulse"), h === "dot" && m(), h = ne), ne) {
          case "dash":
            a.classList.add("flow-edge-animated");
            break;
          case "pulse":
            a.classList.add("flow-edge-pulse");
            break;
          case "dot":
            y(s, H, ae, S, S.animationDuration);
            break;
        }
        if (S.animationDuration && ne !== "none" ? (ne === "dash" || ne === "pulse") && (a.style.animationDuration = S.animationDuration) : (ne === "dash" || ne === "pulse") && a.style.removeProperty("animation-duration"), p && p !== S.class && s.classList.remove(...p.split(" ").filter(Boolean)), S.class) {
          const F = ne === "dash" ? " flow-edge-animated" : ne === "pulse" ? " flow-edge-pulse" : "";
          a.setAttribute("class", S.class + F), s.classList.add(...S.class.split(" ").filter(Boolean)), p = S.class;
        } else
          p && (s.classList.remove(...p.split(" ").filter(Boolean)), p = null);
        if (s.setAttribute("aria-selected", String(!!S.selected)), S.selected)
          s.classList.add("flow-edge-selected"), a.style.strokeWidth = String(Math.max(ee + 1, 2.5)), a.style.stroke = "var(--flow-edge-stroke-selected, " + fn + ")";
        else {
          s.classList.remove("flow-edge-selected"), a.style.strokeWidth = String(ee);
          const F = k._markerDefsEl?.querySelector("defs") ?? null;
          if (Wr(S.color)) {
            if (F) {
              const W = jr(k._id, S.id), se = S.gradientDirection === "target-source", fe = C.x, ge = C.y, pe = T.x, Ee = T.y;
              Ur(
                F,
                W,
                se ? { from: S.color.to, to: S.color.from } : S.color,
                fe,
                ge,
                pe,
                Ee
              ), a.style.stroke = `url(#${W})`, g = W;
            }
          } else if (S.color) {
            if (g) {
              const W = F;
              W && So(W, g), g = null;
            }
            a.style.stroke = S.color;
          } else {
            if (g) {
              const W = F;
              W && So(W, g), g = null;
            }
            a.style.removeProperty("stroke");
          }
        }
        if (k.selectedRows?.size > 0 && !S.selected && (S.sourceHandle && k.selectedRows.has(S.sourceHandle.replace(/-[lr]$/, "")) || S.targetHandle && k.selectedRows.has(S.targetHandle.replace(/-[lr]$/, ""))) ? (s.classList.add("flow-edge-row-highlighted"), S.selected || (a.style.strokeWidth = String(Math.max(ee + 0.5, 2)), a.style.stroke = getComputedStyle(s.closest(".flow-container")).getPropertyValue("--flow-edge-row-highlight-color").trim() || "#3b82f6")) : s.classList.remove("flow-edge-row-highlighted"), S.focusable ?? k._config?.edgesFocusable !== !1 ? (s.setAttribute("tabindex", "0"), s.setAttribute("role", S.ariaRole ?? "group"), s.setAttribute("aria-label", S.ariaLabel ?? (S.label ? `Edge: ${S.label}` : `Edge from ${S.source} to ${S.target}`))) : (s.removeAttribute("tabindex"), s.removeAttribute("role"), s.removeAttribute("aria-label")), S.domAttributes)
          for (const [F, W] of Object.entries(S.domAttributes))
            F.startsWith("on") || sg.has(F.toLowerCase()) || s.setAttribute(F, W);
        const Z = (F, W, se, fe, ge) => {
          if (W) {
            if (!F && fe) {
              const pe = se.includes("flow-edge-label-start"), Ee = se.includes("flow-edge-label-end");
              let Ce = `[data-flow-edge-id="${ge}"].flow-edge-label`;
              pe ? Ce += ".flow-edge-label-start" : Ee ? Ce += ".flow-edge-label-end" : Ce += ":not(.flow-edge-label-start):not(.flow-edge-label-end)", F = fe.querySelector(Ce);
            }
            return F || (F = document.createElement("div"), F.className = se, F.dataset.flowEdgeId = ge, fe && fe.appendChild(F)), F.textContent = W, F;
          }
          return F && F.remove(), null;
        }, z = e.closest(".flow-viewport"), ce = S.labelVisibility ?? "always";
        if (c = Z(c, S.label, "flow-edge-label", z, S.id), c)
          if (a.getTotalLength?.()) {
            const F = S.labelPosition ?? 0.5, W = lg(a, F);
            c.style.left = `${W.x}px`, c.style.top = `${W.y}px`;
          } else
            c.style.left = `${I.x}px`, c.style.top = `${I.y}px`;
        if (d = Z(d, S.labelStart, "flow-edge-label flow-edge-label-start", z, S.id), d && a.getTotalLength?.()) {
          const F = a.getTotalLength(), W = S.labelStartOffset ?? 30, se = a.getPointAtLength(Math.min(W, F / 2));
          d.style.left = `${se.x}px`, d.style.top = `${se.y}px`;
        }
        if (f = Z(f, S.labelEnd, "flow-edge-label flow-edge-label-end", z, S.id), f && a.getTotalLength?.()) {
          const F = a.getTotalLength(), W = S.labelEndOffset ?? 30, se = a.getPointAtLength(Math.max(F - W, F / 2));
          f.style.left = `${se.x}px`, f.style.top = `${se.y}px`;
        }
        for (const F of [c, d, f])
          F && (F.classList.toggle("flow-edge-label-hover", ce === "hover"), F.classList.toggle("flow-edge-label-on-select", ce === "selected"), F.classList.toggle("flow-edge-label-selected", !!S.selected), S.class ? F.classList.add(...S.class.split(" ").filter(Boolean)) : p && F.classList.remove(...p.split(" ").filter(Boolean)));
      }), r(() => {
        if (g) {
          const k = t.$data(e.closest("[x-data]"))?._markerDefsEl?.querySelector("defs");
          k && So(k, g);
        }
        E?.(), m(), s.removeEventListener("contextmenu", L), s.removeEventListener("dblclick", $), s.removeEventListener("pointerdown", _, !0), s.removeEventListener("pointerdown", v), s.removeEventListener("pointermove", w), s.removeEventListener("keydown", D), s.removeEventListener("focus", x), s.removeEventListener("blur", N), s.removeEventListener("mousedown", A), s.removeEventListener("mouseenter", O), s.removeEventListener("mouseleave", U), c?.remove(), d?.remove(), f?.remove();
      });
    }
  );
}
function ug(t, e) {
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
        const a = typeof l == "string" ? hn(l) : l;
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
        const s = Ht(i, t._nodeMap, t._config.nodeOrigin), l = Ht(r, t._nodeMap, t._config.nodeOrigin);
        let a, c, d, f;
        if (o.type === "floating") {
          const h = Yr(s, l);
          d = { x: h.sx, y: h.sy }, f = { x: h.tx, y: h.ty };
          const g = Tt(d, h.sourcePos, null, o.markerStart), p = Tt(f, h.targetPos, null, o.markerEnd), y = to(o, s, l, h.sourcePos, h.targetPos, g, p, void 0, void 0, t._shapeRegistry, t._config.nodeOrigin);
          a = y.path, c = y.labelPosition;
        } else {
          const h = t._container;
          let g, p;
          if (h) {
            const M = h.querySelector(
              `[data-flow-node-id="${CSS.escape(o.source)}"]`
            ), P = h.querySelector(
              `[data-flow-node-id="${CSS.escape(o.target)}"]`
            );
            if (M) {
              const L = M.getBoundingClientRect();
              g = { x: (L.left + L.right) / 2, y: (L.top + L.bottom) / 2 };
            }
            if (P) {
              const L = P.getBoundingClientRect();
              p = { x: (L.left + L.right) / 2, y: (L.top + L.bottom) / 2 };
            }
          }
          const y = h ? oo(h, o.source, o.sourceHandle, "source", i, p) : i?.sourcePosition ?? "bottom", m = h ? oo(h, o.target, o.targetHandle, "target", r, g) : r?.targetPosition ?? "top";
          d = Xt(s, y, t._shapeRegistry, t._config.nodeOrigin), f = Xt(l, m, t._shapeRegistry, t._config.nodeOrigin);
          const C = Tt(d, y, null, o.markerStart), T = Tt(f, m, null, o.markerEnd), b = to(o, s, l, y, m, C, T, void 0, void 0, t._shapeRegistry, t._config.nodeOrigin);
          a = b.path, c = b.labelPosition;
        }
        const u = t.getEdgePathElement(o.id);
        if (u) {
          u.setAttribute("d", a);
          const g = u.parentElement?.querySelector("path:first-child");
          g && g !== u && g.setAttribute("d", a);
        }
        if (Wr(o.color)) {
          const h = t._markerDefsEl?.querySelector("defs");
          if (h) {
            const g = jr(t._id, o.id), p = o.gradientDirection === "target-source";
            Ur(
              h,
              g,
              p ? { from: o.color.to, to: o.color.from } : o.color,
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
              const g = u.getTotalLength(), p = o.labelStartOffset ?? 30, y = u.getPointAtLength(Math.min(p, g / 2));
              h.style.left = `${y.x}px`, h.style.top = `${y.y}px`;
            }
          }
          if (o.labelEnd && u) {
            const h = t._viewportEl.querySelector(
              `[data-flow-edge-id="${o.id}"].flow-edge-label-end`
            );
            if (h) {
              const g = u.getTotalLength(), p = o.labelEndOffset ?? 30, y = u.getPointAtLength(Math.max(g - p, g / 2));
              h.style.left = `${y.x}px`, h.style.top = `${y.y}px`;
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
function fg(t) {
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
              hr(!!i);
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
              t._config.colorMode = i, i && t._container ? t._colorModeHandle ? t._colorModeHandle.update(i) : t._colorModeHandle = Nr(t._container, i) : !i && t._colorModeHandle && (t._colorModeHandle.destroy(), t._colorModeHandle = null);
              break;
            case "autoLayout":
              n.autoLayout = i || void 0, t._autoLayoutFailed = !1, i ? (t._autoLayoutReady = !0, t._scheduleAutoLayout()) : (t._autoLayoutReady = !1, t._autoLayoutTimer && (clearTimeout(t._autoLayoutTimer), t._autoLayoutTimer = null));
              break;
          }
    }
  };
}
let hg = 0;
function gg(t, e) {
  switch (t) {
    case "lines":
    case "cross":
      return `linear-gradient(0deg, ${e} 1px, transparent 1px), linear-gradient(90deg, ${e} 1px, transparent 1px)`;
    default:
      return `radial-gradient(circle, ${e} 1px, transparent 1px)`;
  }
}
function pg(t) {
  t.data("flowCanvas", (e = {}) => {
    const n = {
      // ── Reactive State ────────────────────────────────────────────────
      /** Unique instance ID for SVG marker dedup, etc. */
      _id: `flow-${++hg}`,
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
      _shapeRegistry: { ...Ar, ...e.shapeTypes },
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
          const g = h.gap * l, p = h.variant === "cross" ? g / 2 : g;
          d.push(gg(h.variant, h.color)), h.variant === "lines" || h.variant === "cross" ? (f.push(`${p}px ${p}px, ${p}px ${p}px`), u.push(`${a}px ${c}px, ${a}px ${c}px`)) : (f.push(`${g}px ${g}px`), u.push(`${a}px ${c}px`));
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
      _shortcuts: hf(e.keyboardShortcuts),
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
      _computeEngine: new Pf(),
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
        this._nodeMap = Lr(this.nodes);
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
        const a = e.cullingBuffer ?? 100, c = xu(this.viewport, s, l, a), d = /* @__PURE__ */ new Set();
        for (const f of this.nodes) {
          if (f.hidden) continue;
          const u = f.dimensions?.width ?? 150, h = f.dimensions?.height ?? 50, g = f.parentId ? Yo(f, this._nodeMap, this._config.nodeOrigin) : f.position, p = !(g.x + u < c.minX || g.x > c.maxX || g.y + h < c.minY || g.y > c.maxY);
          p && d.add(f.id);
          const y = this._nodeElements.get(f.id);
          y && (y.style.display = p ? "" : "none");
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
        return l ? Yo(l, this._nodeMap, this._config.nodeOrigin) : { x: 0, y: 0 };
      },
      // ── Init Helpers ─────────────────────────────────────────────────
      /** Enable debug logging if configured. */
      _initDebug() {
        e.debug && hr(!0);
      },
      /** Set up container element, attributes, CSS custom properties, animator. */
      _initContainer() {
        this._container = this.$el, this._container.setAttribute("data-flow-canvas", ""), e.fitViewOnInit && this._container.setAttribute("data-fit-view", ""), this._container.setAttribute("role", "application"), this._container.setAttribute("aria-label", e.ariaLabel ?? "Flow diagram"), this._containerStyles = getComputedStyle(this._container), this._animator = new $u(Wn), e.patternColor && this._container.style.setProperty("--flow-bg-pattern-color", e.patternColor), e.backgroundGap && this._container.style.setProperty("--flow-bg-pattern-gap", String(e.backgroundGap)), this._applyZoomLevel(this.viewport.zoom);
      },
      /** Create color mode handle if configured. */
      _initColorMode() {
        e.colorMode && (this._colorModeHandle = Nr(this._container, e.colorMode));
      },
      /** Hydrate from static HTML, sort nodes, rebuild maps, capture initial dimensions. */
      _initHydration() {
        this._container.hasAttribute("data-flow-static") && this._hydrateFromStatic(), this.nodes = ft(this.nodes), this._rebuildNodeMap(), this._rebuildEdgeMap();
        for (const s of this.nodes)
          s.dimensions && this._initialDimensions.set(s.id, { ...s.dimensions });
      },
      /** Create FlowHistory if configured. */
      _initHistory() {
        e.history && (this._history = new ku(e.historyMaxSize ?? 50));
      },
      /** Create screen reader announcer. */
      _initAnnouncer() {
        if (e.announcements !== !1 && this._container) {
          const s = typeof e.announcements == "object" ? e.announcements.formatMessage : void 0;
          this._announcer = new kf(this._container, s);
        }
      },
      /** Set up collaboration bridge via collab addon plugin. */
      _initCollab() {
        if (e.collab && this._container) {
          const s = Mt("collab");
          if (!s) {
            console.error("[AlpineFlow] Collaboration requires the collab plugin. Register it with: Alpine.plugin(AlpineFlowCollab)");
            return;
          }
          const l = this._container, { Doc: a, Awareness: c, CollabBridge: d, CollabAwareness: f } = s, u = e.collab, h = new a(), g = new c(h), p = new d(h, this, u.provider), y = new f(g, u.user);
          if ($e.set(l, { bridge: p, awareness: y, doc: h }), u.provider.connect(h, g), u.cursors !== !1) {
            let m = !1;
            const C = u.throttle ?? 20, T = (P) => {
              if (m) return;
              m = !0;
              const L = l.getBoundingClientRect(), $ = (P.clientX - L.left - this.viewport.x) / this.viewport.zoom, _ = (P.clientY - L.top - this.viewport.y) / this.viewport.zoom;
              y.updateCursor({ x: $, y: _ }), setTimeout(() => {
                m = !1;
              }, C);
            }, b = () => {
              y.updateCursor(null);
            };
            l.addEventListener("mousemove", T), l.addEventListener("mouseleave", b);
            const M = $e.get(l);
            M.cursorCleanup = () => {
              l.removeEventListener("mousemove", T), l.removeEventListener("mouseleave", b);
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
        }), this._panZoom = wu(this._container, {
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
        if (s && (this._longPressCleanup = gf(
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
          const d = (p) => {
            p.pointerType === "touch" && (c++, c === 2 && Date.now() - a < 300 && (this._touchSelectionMode = !this._touchSelectionMode, this._container?.classList.toggle("flow-touch-selection-mode", this._touchSelectionMode)), a = Date.now());
          }, f = (p) => {
            p.pointerType === "touch" && (c = Math.max(0, c - 1), c === 0 && (a = 0));
          }, u = this._container;
          if (!u) return;
          u.addEventListener("pointerdown", d), u.addEventListener("pointerup", f), u.addEventListener("pointercancel", f);
          const h = () => {
            document.hidden && (c = 0);
          };
          document.addEventListener("visibilitychange", h);
          const g = document.createElement("div");
          g.className = "flow-touch-selection-mode-indicator", g.textContent = "Selection Mode — tap with two fingers to exit", u.appendChild(g), this._touchSelectionCleanup = () => {
            u.removeEventListener("pointerdown", d), u.removeEventListener("pointerup", f), u.removeEventListener("pointercancel", f), document.removeEventListener("visibilitychange", h), g.remove();
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
          if (qe(s.key, a.escape) && this.contextMenu.show) {
            this.closeContextMenu();
            return;
          }
          if (qe(s.key, a.escape) && this.pendingConnection) {
            this._emit("connect-end", {
              connection: null,
              source: this.pendingConnection.source,
              sourceHandle: this.pendingConnection.sourceHandle,
              position: { x: 0, y: 0 }
            }), this.pendingConnection = null, this._container?.classList.remove("flow-connecting"), this._container && Pe(this._container);
            return;
          }
          if (qe(s.key, a.delete)) {
            if (l === "INPUT" || l === "TEXTAREA") return;
            this._deleteSelected();
          }
          if (qe(s.key, this._shortcuts.selectionToolToggle) && !s.ctrlKey && !s.metaKey) {
            if (l === "INPUT" || l === "TEXTAREA") return;
            this._selectionTool = this._selectionTool === "box" ? "lasso" : "box";
            return;
          }
          if (qe(s.key, a.moveNodes)) {
            if (l === "INPUT" || l === "TEXTAREA" || this._config?.disableKeyboardA11y || this.selectedNodes.size === 0) return;
            s.preventDefault();
            const c = dt(s, a.moveStepModifier) ? a.moveStep * a.moveStepMultiplier : a.moveStep;
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
                const u = Array.isArray(a.moveNodes) ? a.moveNodes : [a.moveNodes], h = s.key.length === 1 ? s.key.toLowerCase() : s.key, g = u.findIndex((p) => (p.length === 1 ? p.toLowerCase() : p) === h);
                g === 0 ? f = -c : g === 1 ? f = c : g === 2 ? d = -c : g === 3 && (d = c);
              }
            }
            this._captureHistory();
            for (const u of this.selectedNodes) {
              const h = this.getNode(u);
              if (h && Cr(h)) {
                h.position.x += d, h.position.y += f;
                const g = this._container ? $e.get(this._container) : void 0;
                g?.bridge && g.bridge.pushLocalNodeUpdate(h.id, { position: h.position });
              }
            }
          }
          if ((s.ctrlKey || s.metaKey) && !s.shiftKey && qe(s.key, a.undo)) {
            if (l === "INPUT" || l === "TEXTAREA") return;
            s.preventDefault(), this.undo();
          }
          if ((s.ctrlKey || s.metaKey) && s.shiftKey && qe(s.key, a.redo)) {
            if (l === "INPUT" || l === "TEXTAREA") return;
            s.preventDefault(), this.redo();
          }
          if ((s.ctrlKey || s.metaKey) && !s.shiftKey) {
            if (l === "INPUT" || l === "TEXTAREA") return;
            qe(s.key, a.copy) ? (s.preventDefault(), this.copy()) : qe(s.key, a.paste) ? (s.preventDefault(), this.paste()) : qe(s.key, a.cut) && (s.preventDefault(), this.cut());
          }
        }, document.addEventListener("keydown", this._onKeyDown);
      },
      /** Create minimap if configured. */
      _initMinimap() {
        e.minimap && (this._minimap = Hu(this._container, {
          getState: () => ({
            nodes: Qn(this.nodes, this._nodeMap, this._config.nodeOrigin),
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
          this._controls = Xu(s, {
            position: e.controlsPosition ?? "bottom-left",
            orientation: e.controlsOrientation ?? "vertical",
            external: l,
            showZoom: e.controlsShowZoom ?? !0,
            showFitView: e.controlsShowFitView ?? !0,
            showInteractive: e.controlsShowInteractive ?? !0,
            showResetPanels: e.controlsShowResetPanels ?? !1,
            onZoomIn: () => this.zoomIn(),
            onZoomOut: () => this.zoomOut(),
            onFitView: () => this.fitView({ padding: Vo }),
            onToggleInteractive: () => this.toggleInteractive(),
            onResetPanels: () => this.resetPanels(),
            onToggleFullscreen: () => this.toggleFullscreen()
          }), this.$watch("isInteractive", (a) => {
            this._controls?.update({ isInteractive: a });
          }), this.$watch("isFullscreen", (a) => {
            this._controls?.update({ isFullscreen: a });
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
          const s = this._fullscreenTarget ?? this._container, l = document.fullscreenElement === s;
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
        const s = this._config?.fullscreenTarget;
        if (!s) return this._container;
        if (typeof s == "string") {
          const l = this._container.closest(s);
          if (l) return l;
          const a = document.querySelector(s);
          return a || (console.warn(`[AlpineFlow] fullscreenTarget selector "${s}" did not match; falling back to canvas container.`), this._container);
        }
        if (s instanceof HTMLElement) return s;
        if (typeof s == "function")
          try {
            const l = s(this._container);
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
        const s = this._resolveFullscreenTarget();
        if (!s) return;
        if (document.fullscreenElement) {
          document.exitFullscreen?.();
          return;
        }
        const l = s.requestFullscreen;
        if (typeof l != "function") {
          console.warn("[AlpineFlow] requestFullscreen is not available in this context");
          return;
        }
        this._fullscreenTarget = s, Promise.resolve(l.call(s)).catch((a) => {
          console.warn("[AlpineFlow] fullscreen request rejected:", a), this._fullscreenTarget = null;
        });
      },
      /** Selection box/lasso setup (pointerdown/pointermove/pointerup handlers). */
      _initSelection() {
        this._selectionBox = Yu(this._container), this._lasso = Wu(this._container), this._selectionTool = e.selectionTool ?? "box", this._onSelectionPointerDown = (s) => {
          if (!this._config.selectionOnDrag && !this._touchSelectionMode && !dt(s, this._shortcuts.selectionBox))
            return;
          const l = s.target;
          if (l !== this._container && !l.classList.contains("flow-viewport"))
            return;
          s.stopPropagation(), s.preventDefault(), this._selectionShiftHeld = !0;
          const a = this._config.selectionMode ?? "partial", c = dt(s, this._shortcuts.selectionModeToggle);
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
          const a = Qn(this.nodes, this._nodeMap, this._config.nodeOrigin);
          let c, d = [];
          if (this._selectionTool === "lasso") {
            const f = this._lasso.end(this.viewport);
            if (!f) return;
            const u = this._selectionEffectiveMode === "full" ? Ku(a, f) : Zu(a, f), h = new Set(u.map((g) => g.id));
            if (c = this.nodes.filter((g) => h.has(g.id)), this._config.lassoSelectsEdges)
              for (const g of this.edges) {
                if (g.hidden) continue;
                const p = this._container?.querySelector(
                  `[data-flow-edge-id="${CSS.escape(g.id)}"] path`
                );
                if (!p) continue;
                const y = p.getTotalLength(), m = Math.max(10, Math.ceil(y / 20));
                let C = 0;
                for (let b = 0; b <= m; b++) {
                  const M = p.getPointAtLength(b / m * y);
                  fi(M.x, M.y, f) && C++;
                }
                (this._selectionEffectiveMode === "full" ? C === m + 1 : C > 0) && d.push(g.id);
              }
          } else {
            const f = this._selectionBox.end(this.viewport);
            if (!f) return;
            const u = this._selectionEffectiveMode === "full" ? bu(a, f, this._config.nodeOrigin) : _u(a, f, this._config.nodeOrigin), h = new Set(u.map((g) => g.id));
            c = this.nodes.filter((g) => h.has(g.id));
          }
          this._selectionShiftHeld || this.deselectAll();
          for (const f of c) {
            if (!Xo(f) || f.hidden) continue;
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
              const g = this._nodeMap.get(h);
              if (g)
                return g;
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
            for (const p of s) {
              const y = a.dataTransfer.getData(p);
              if (y) {
                c = p, d = y;
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
            const u = ur(
              a.clientX,
              a.clientY,
              this.viewport,
              this._container.getBoundingClientRect()
            ), h = l(a.clientX, a.clientY), g = e.onDrop({ data: f, position: u, targetNode: h, mimeType: c });
            g && this.addNodes(g, { center: !0 });
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
            const g = Math.round(u), p = Math.round(h), y = d.dimensions;
            if (y && Math.abs((y.width ?? 0) - g) < 1 && Math.abs((y.height ?? 0) - p) < 1)
              continue;
            const m = Ff(
              { width: g, height: p },
              d.minDimensions,
              d.maxDimensions
            );
            d.dimensions = m, d.parentId && this._layoutDedup?.safeLayoutChildren(d.parentId);
          }
        }));
      },
      /** Run initial child layouts for all layout parents. */
      _initChildLayout() {
        if (this._layoutDedup = Rf((s) => {
          this.layoutChildren(s);
        }), this._resizeObserverInit(), this.$wire) {
          const s = this.$wire;
          e.wireEvents && If(e, s, e.wireEvents);
          const l = $f(this, s), a = Af(this, s);
          this._wireCleanup = () => {
            l(), a();
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
        });
      },
      /** Call setup(canvas) on any addon that provides it. */
      _initAddons() {
        for (const [, s] of Ir().entries())
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
          c && Mt(c) ? (this._autoLayoutReady = !0, this.$nextTick(() => this._runAutoLayout())) : c && this._warn("AUTO_LAYOUT_MISSING_DEP", `autoLayout requires the ${s} plugin. Register it with: Alpine.plugin(${a[s]})`);
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
        o = this, this._initDebug(), this._initContainer(), this._initColorMode(), this._initHydration(), this._initHistory(), this._initAnnouncer(), this._initCollab(), this._initPanZoom(), this._initClickHandlers(), this._initKeyboard(), this._initMinimap(), this._initFullscreen(), this._initControls(), this._initSelection(), this._initChildLayout(), this._initAddons(), this._initDropZone(), this._initAutoLayout(), this._initReady();
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
            const u = It(f), h = $t(u, this._id);
            l.has(h) || l.set(h, Un(u, h));
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
        if (this._contextMenuListeners = [], this._onKeyDown && document.removeEventListener("keydown", this._onKeyDown), this._onContainerPointerDown && this._container && this._container.removeEventListener("pointerdown", this._onContainerPointerDown), this._markerDefsEl?.remove(), this._markerDefsEl = null, this._minimap?.destroy(), this._minimap = null, this._controls?.destroy(), this._controls = null, this._onFullscreenChange && typeof document < "u" && document.removeEventListener("fullscreenchange", this._onFullscreenChange), this._onFullscreenChange = null, typeof document < "u") {
          const s = document.fullscreenElement;
          s && (s === this._container || s === this._fullscreenTarget) && document.exitFullscreen?.().catch(() => {
          });
        }
        this._fullscreenTarget = null, this._onSelectionPointerDown && this._container && this._container.removeEventListener("pointerdown", this._onSelectionPointerDown), this._onSelectionPointerMove && this._container && this._container.removeEventListener("pointermove", this._onSelectionPointerMove), this._onSelectionPointerUp && this._container && this._container.removeEventListener("pointerup", this._onSelectionPointerUp), this._selectionBox?.destroy(), this._selectionBox = null, this._lasso?.destroy(), this._lasso = null, this._viewportEl = null, this._container && (this._container.removeEventListener("dragover", this._onDropZoneDragOver), this._container.removeEventListener("dragleave", this._onDropZoneDragleave), this._container.removeEventListener("drop", this._onDropZoneDrop)), this._followHandle?.stop(), this._followHandle = null;
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
        return this._layoutDedup ? Hf(this._layoutDedup)(s) : s();
      },
      get collab() {
        return this._container ? $e.get(this._container)?.awareness : void 0;
      },
      async toImage(s) {
        let l;
        try {
          ({ captureFlowImage: l } = await Promise.resolve().then(() => Fp));
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
      Bf(i),
      qf(i),
      Xf(i),
      Uf(i),
      Zf(i),
      Ch(i),
      Ph(i),
      Lh(i),
      Mh(i),
      Fh(i),
      Oh(i),
      zh(i),
      ug(i, t),
      fg(i)
    ];
    for (const s of r)
      Object.defineProperties(n, Object.getOwnPropertyDescriptors(s));
    return n.registerMarker = (s, l) => {
      Du(s, l);
    }, n;
  });
}
function Cs(t, e) {
  return {
    x: e[0] * Math.round(t.x / e[0]),
    y: e[1] * Math.round(t.y / e[1])
  };
}
function mg(t, e, n) {
  const { onDragStart: o, onDrag: i, onDragEnd: r, getViewport: s, getNodePosition: l, snapToGrid: a = !1, filterSelector: c, container: d, isLocked: f, noDragClassName: u, dragThreshold: h = 0 } = n;
  let g = { x: 0, y: 0 };
  function p(C) {
    const T = s();
    return {
      x: (C.x - T.x) / T.zoom,
      y: (C.y - T.y) / T.zoom
    };
  }
  const y = ze(t), m = Gl().subject(() => {
    const C = s(), T = l();
    return {
      x: T.x * C.zoom + C.x,
      y: T.y * C.zoom + C.y
    };
  }).on("start", (C) => {
    g = p(C), o?.({ nodeId: e, position: g, sourceEvent: C.sourceEvent });
  }).on("drag", (C) => {
    let T = p(C);
    a && (T = Cs(T, a));
    const b = {
      x: T.x - g.x,
      y: T.y - g.y
    };
    i?.({ nodeId: e, position: T, delta: b, sourceEvent: C.sourceEvent });
  }).on("end", (C) => {
    let T = p(C);
    a && (T = Cs(T, a)), r?.({ nodeId: e, position: T, sourceEvent: C.sourceEvent });
  });
  return d && m.container(() => d), h > 0 && m.clickDistance(h), m.filter((C) => {
    if (f?.() || u && C.target?.closest?.("." + u)) return !1;
    if (c) {
      const T = t.querySelector(c);
      return T ? T.contains(C.target) : !0;
    }
    return !0;
  }), y.call(m), {
    destroy() {
      y.on(".drag", null);
    }
  };
}
function yg(t, e) {
  const n = Yt(t, e);
  return {
    id: t.id,
    x: n.x,
    y: n.y,
    width: t.dimensions?.width ?? ve,
    height: t.dimensions?.height ?? _e
  };
}
function wg(t, e, n) {
  const o = /* @__PURE__ */ new Set(), i = /* @__PURE__ */ new Set();
  let r = 0, s = 0, l = 1 / 0, a = 1 / 0;
  const c = t.x + t.width / 2, d = t.y + t.height / 2, f = t.x + t.width, u = t.y + t.height;
  for (const h of e) {
    const g = h.x + h.width / 2, p = h.y + h.height / 2, y = h.x + h.width, m = h.y + h.height, C = [
      [t.x, h.x],
      // left-left
      [f, y],
      // right-right
      [c, g],
      // center-center
      [t.x, y],
      // left-right
      [f, h.x]
      // right-left
    ];
    for (const [b, M] of C) {
      const P = M - b;
      Math.abs(P) <= n && (i.add(M), Math.abs(P) < Math.abs(l) && (l = P, r = P));
    }
    const T = [
      [t.y, h.y],
      // top-top
      [u, m],
      // bottom-bottom
      [d, p],
      // center-center
      [t.y, m],
      // top-bottom
      [u, h.y]
      // bottom-top
    ];
    for (const [b, M] of T) {
      const P = M - b;
      Math.abs(P) <= n && (o.add(M), Math.abs(P) < Math.abs(a) && (a = P, s = P));
    }
  }
  return {
    horizontal: [...o],
    vertical: [...i],
    snapOffset: { x: r, y: s }
  };
}
function vg(t, e, n, o) {
  return Math.abs(t.x - e.x) > 30 ? t.x < e.x ? { source: n, target: o } : { source: o, target: n } : t.y < e.y ? { source: n, target: o } : { source: o, target: n };
}
function _g(t, e, n, o) {
  let i = null, r = o;
  for (const s of n) {
    if (s.id === t) continue;
    const l = Math.sqrt(
      (e.x - s.center.x) ** 2 + (e.y - s.center.y) ** 2
    );
    if (l < r) {
      r = l;
      const { source: a, target: c } = vg(e, s.center, t, s.id);
      i = { source: a, target: c, targetId: s.id, distance: l, targetCenter: s.center };
    }
  }
  return i;
}
const bg = /* @__PURE__ */ new Set(["x-data", "x-init", "x-bind", "href", "src", "action", "formaction", "srcdoc"]);
let xg = 0, Eg = 0;
function Cg(t, e) {
  switch (e) {
    case "alt":
      return t.altKey;
    case "meta":
      return t.metaKey;
    case "shift":
      return t.shiftKey;
  }
}
function Sg(t, e, n) {
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
function kg(t, e, n) {
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
function Pg(t) {
  t.directive(
    "flow-node",
    (e, { expression: n }, { evaluate: o, effect: i, cleanup: r }) => {
      let s = null, l = !1, a = !1, c = null, d = null, f = null, u = null, h = null, g = null, p = !1, y = -1, m = null, C = !1, T = [], b = "", M = [], P = null;
      i(() => {
        const v = o(n);
        if (!v) return;
        if (e.dataset.flowNodeId = v.id, v.type && (e.dataset.flowNodeType = v.type), !C) {
          const X = t.$data(e.closest("[x-data]"));
          let j = !1;
          if (X?._config?.nodeTypes) {
            const Q = v.type ?? "default", H = X._config.nodeTypes[Q] ?? X._config.nodeTypes.default;
            if (typeof H == "string") {
              const I = document.querySelector(H);
              I?.content && (e.appendChild(I.content.cloneNode(!0)), j = !0);
            } else typeof H == "function" && (H(v, e), j = !0);
          }
          if (!j && e.children.length === 0) {
            const Q = document.createElement("div");
            Q.setAttribute("x-flow-handle:target", "");
            const H = document.createElement("span");
            H.setAttribute("x-text", "node.data.label");
            const I = document.createElement("div");
            I.setAttribute("x-flow-handle:source", ""), e.appendChild(Q), e.appendChild(H), e.appendChild(I), j = !0;
          }
          if (j)
            for (const Q of Array.from(e.children))
              t.addScopeToNode(Q, { node: v }), t.initTree(Q);
          C = !0;
        }
        if (v.hidden) {
          e.classList.add("flow-node-hidden"), e.removeAttribute("tabindex"), e.removeAttribute("role"), e.removeAttribute("aria-label"), s?.destroy(), s = null;
          return;
        }
        e.classList.remove("flow-node-hidden"), P !== v.id && (s?.destroy(), s = null, P = v.id);
        const w = t.$data(e.closest("[x-data]"));
        if (!w?.viewport) return;
        e.classList.add("flow-node", "nopan"), v.type === "group" ? e.classList.add("flow-node-group") : e.classList.remove("flow-node-group");
        const D = v.parentId ? w.getAbsolutePosition(v.id) : v.position ?? { x: 0, y: 0 }, x = v.nodeOrigin ?? w._config?.nodeOrigin ?? [0, 0], N = v.dimensions?.width ?? 150, A = v.dimensions?.height ?? 40;
        if (e.style.left = D.x - N * x[0] + "px", e.style.top = D.y - A * x[1] + "px", v.dimensions) {
          const X = v.childLayout, j = v.fixedDimensions, Q = w.nodes.some(
            (H) => H.parentId === v.id
          );
          e.style.width = v.dimensions.width + "px", X || j || Q ? e.style.height = v.dimensions.height + "px" : e.style.height = "";
        }
        w.selectedNodes.has(v.id) ? e.classList.add("flow-node-selected") : e.classList.remove("flow-node-selected"), e.setAttribute("aria-selected", String(!!v.selected)), v._validationErrors && v._validationErrors.length > 0 ? e.classList.add("flow-node-invalid") : e.classList.remove("flow-node-invalid");
        const O = ["flow-node-running", "flow-node-completed", "flow-node-failed", "flow-node-skipped"], U = v.runState;
        for (const X of O)
          e.classList.remove(X);
        U && U !== "pending" && e.classList.add(`flow-node-${U}`);
        for (const X of T)
          e.classList.remove(X);
        const S = v.class ? v.class.split(/\s+/).filter(Boolean) : [];
        for (const X of S)
          e.classList.add(X);
        T = S;
        const k = v.shape ? `flow-node-${v.shape}` : "";
        b !== k && (b && e.classList.remove(b), k && e.classList.add(k), b = k);
        const R = t.$data(e.closest("[data-flow-canvas]")), q = v.shape && R?._shapeRegistry?.[v.shape];
        if (q?.clipPath ? e.style.clipPath = q.clipPath : e.style.clipPath = "", v.style) {
          const X = typeof v.style == "string" ? Object.fromEntries(v.style.split(";").filter(Boolean).map((Q) => Q.split(":").map((H) => H.trim()))) : v.style, j = [];
          for (const [Q, H] of Object.entries(X))
            Q && H && (e.style.setProperty(Q, H), j.push(Q));
          for (const Q of M)
            j.includes(Q) || e.style.removeProperty(Q);
          M = j;
        } else if (M.length > 0) {
          for (const X of M)
            e.style.removeProperty(X);
          M = [];
        }
        if (v.rotation ? (e.style.transform = `rotate(${v.rotation}deg)`, e.style.transformOrigin = "center") : e.style.transform = "", v.focusable ?? w._config?.nodesFocusable !== !1 ? (e.setAttribute("tabindex", "0"), e.setAttribute("role", v.ariaRole ?? "group"), e.setAttribute("aria-label", v.ariaLabel ?? (v.data?.label ? `Node: ${v.data.label}` : `Node ${v.id}`))) : (e.removeAttribute("tabindex"), e.removeAttribute("role"), e.removeAttribute("aria-label")), v.domAttributes)
          for (const [X, j] of Object.entries(v.domAttributes))
            X.startsWith("on") || bg.has(X.toLowerCase()) || e.setAttribute(X, j);
        Oe(v) ? e.classList.remove("flow-node-no-connect") : e.classList.add("flow-node-no-connect"), v.collapsed ? e.classList.add("flow-node-collapsed") : e.classList.remove("flow-node-collapsed");
        const te = e.classList.contains("flow-node-condensed");
        v.condensed ? e.classList.add("flow-node-condensed") : e.classList.remove("flow-node-condensed"), !!v.condensed !== te && requestAnimationFrame(() => {
          v.dimensions = {
            width: e.offsetWidth,
            height: e.offsetHeight
          }, B("condense", `Node "${v.id}" re-measured after condense toggle`, v.dimensions);
        }), v.filtered ? e.classList.add("flow-node-filtered") : e.classList.remove("flow-node-filtered");
        const oe = v.handles ?? "visible";
        e.classList.remove("flow-handles-hidden", "flow-handles-hover", "flow-handles-select"), oe !== "visible" && e.classList.add(`flow-handles-${oe}`);
        let ae = Mr(v, w._nodeMap);
        w._config?.elevateNodesOnSelect !== !1 && w.selectedNodes.has(v.id) && (ae += v.type === "group" ? Math.max(1 - ae, 0) : 1e3), p && (ae += 1e3);
        const le = v.type === "group" ? 0 : 2;
        if (ae !== le ? e.style.zIndex = String(ae) : e.style.removeProperty("z-index"), !Cr(v)) {
          e.classList.add("flow-node-locked"), s?.destroy(), s = null;
          return;
        }
        e.classList.remove("flow-node-locked"), e.querySelector("[data-flow-drag-handle]") ? e.classList.add("flow-node-has-handle") : e.classList.remove("flow-node-has-handle");
        const K = e.closest(".flow-container");
        s || (s = mg(e, v.id, {
          container: K ?? void 0,
          filterSelector: "[data-flow-drag-handle]",
          isLocked: () => w._animationLocked,
          noDragClassName: w._config?.noDragClassName ?? "nodrag",
          dragThreshold: w._config?.nodeDragThreshold ?? 0,
          getViewport: () => w.viewport,
          getNodePosition: () => {
            const X = w.getNode(v.id);
            return X ? X.parentId ? w.getAbsolutePosition(X.id) : { x: X.position.x, y: X.position.y } : { x: 0, y: 0 };
          },
          snapToGrid: w._config?.snapToGrid ?? !1,
          onDragStart({ nodeId: X, position: j, sourceEvent: Q }) {
            e.classList.add("flow-node-dragging"), l = !1, a = !1, c = null;
            const H = w._container ? $e.get(w._container) : void 0;
            H?.bridge && H.bridge.setDragging(X, !0), u?.destroy(), u = null, h = null, g && K && K.querySelector(`[data-flow-node-id="${CSS.escape(g)}"]`)?.classList.remove("flow-node-drop-target"), g = null, w._captureHistory?.(), B("drag", `Node "${X}" drag start`, j);
            const I = w.getNode(X);
            if (I && (w._config?.selectNodesOnDrag !== !1 && I.selectable !== !1 && !w.selectedNodes.has(X) && (dt(Q, w._shortcuts?.multiSelect) || w.deselectAll(), w.selectedNodes.add(X), I.selected = !0, w._emitSelectionChange(), a = !0), w._emit("node-drag-start", { node: I }), w.selectedNodes.has(X) && w.selectedNodes.size > 1)) {
              const ie = ut(X, w.nodes);
              c = /* @__PURE__ */ new Map();
              for (const G of w.selectedNodes) {
                if (G === X || ie.has(G))
                  continue;
                const ee = w.getNode(G);
                ee && ee.draggable !== !1 && c.set(G, { x: ee.position.x, y: ee.position.y });
              }
            }
            w._config?.autoPanOnNodeDrag !== !1 && K && (d = kr({
              container: K,
              speed: w._config?.autoPanSpeed ?? 15,
              onPan(ie, G) {
                const ee = w.viewport?.zoom || 1, ne = { x: w.viewport.x, y: w.viewport.y };
                w._panZoom?.setViewport({
                  x: w.viewport.x - ie,
                  y: w.viewport.y - G,
                  zoom: ee
                });
                const Y = ne.x - w.viewport.x, V = ne.y - w.viewport.y, Z = Y === 0 && V === 0, z = w.getNode(X);
                let ce = !1;
                if (z) {
                  const F = z.position.x, W = z.position.y;
                  z.position.x += Y / ee, z.position.y += V / ee;
                  const se = Ln(z.position, z, w._config?.nodeExtent);
                  z.position.x = se.x, z.position.y = se.y, ce = z.position.x === F && z.position.y === W;
                }
                if (c)
                  for (const [F] of c) {
                    const W = w.getNode(F);
                    if (W) {
                      W.position.x += Y / ee, W.position.y += V / ee;
                      const se = Ln(W.position, W, w._config?.nodeExtent);
                      W.position.x = se.x, W.position.y = se.y;
                    }
                  }
                return Z && ce;
              }
            }), Q instanceof MouseEvent && d.updatePointer(Q.clientX, Q.clientY), d.start());
          },
          onDrag({ nodeId: X, position: j, delta: Q, sourceEvent: H }) {
            l = !0;
            const I = w.getNode(X);
            if (I) {
              if (I.parentId) {
                const ee = w.getAbsolutePosition(I.parentId);
                let ne = j.x - ee.x, Y = j.y - ee.y;
                const V = I.dimensions ?? { width: 150, height: 50 }, Z = w.getNode(I.parentId);
                if (Z?.childLayout) {
                  p || (e.classList.add("flow-reorder-dragging"), m = I.parentId), p = !0;
                  const z = I.extent !== "parent";
                  if (I.position.x = j.x - ee.x, I.position.y = j.y - ee.y, !z && Z.dimensions) {
                    const W = vo({ x: I.position.x, y: I.position.y }, V, Z.dimensions);
                    I.position.x = W.x, I.position.y = W.y;
                  }
                  const ce = I.dimensions?.width ?? 150, F = I.dimensions?.height ?? 50;
                  if (z) {
                    const W = Z.dimensions?.width ?? 150, se = Z.dimensions?.height ?? 50, fe = I.position.x + ce / 2, ge = I.position.y + F / 2, pe = 12, Ee = m === I.parentId ? 0 : pe, Ce = fe >= Ee && fe <= W - Ee && ge >= Ee && ge <= se - Ee, Se = /* @__PURE__ */ new Set();
                    let ue = I.parentId;
                    for (; ue; )
                      Se.add(ue), ue = w.getNode(ue)?.parentId;
                    const we = j.x + ce / 2, Ne = j.y + F / 2, xe = ut(I.id, w.nodes);
                    let He = null;
                    const Le = w.nodes.filter(
                      (he) => he.id !== I.id && (he.droppable || he.childLayout) && !he.hidden && !xe.has(he.id) && (Ce ? !Se.has(he.id) : he.id !== I.parentId) && (!he.acceptsDrop || he.acceptsDrop(I))
                    );
                    for (const he of Le) {
                      const be = he.parentId ? w.getAbsolutePosition(he.id) : he.position, ot = he.dimensions?.width ?? 150, pt = he.dimensions?.height ?? 50, it = he.id === g ? 0 : pe;
                      we >= be.x + it && we <= be.x + ot - it && Ne >= be.y + it && Ne <= be.y + pt - it && (He = he);
                    }
                    const me = He?.id ?? null;
                    if (me !== g) {
                      g && K && K.querySelector(`[data-flow-node-id="${CSS.escape(g)}"]`)?.classList.remove("flow-node-drop-target"), me && K && K.querySelector(`[data-flow-node-id="${CSS.escape(me)}"]`)?.classList.add("flow-node-drop-target"), g = me;
                      const he = me ? w.getNode(me) : null, be = m;
                      if (he?.childLayout && me !== m) {
                        be && (w.layoutChildren(be, { omitFromComputation: X, shallow: !0 }), w.propagateLayoutUp(be, { omitFromComputation: X })), m = me;
                        const ot = w.nodes.filter((Ue) => Ue.parentId === me && Ue.id !== X).sort((Ue, la) => (Ue.order ?? 1 / 0) - (la.order ?? 1 / 0)), pt = ot.length, it = [...ot];
                        it.splice(pt, 0, I);
                        for (let Ue = 0; Ue < it.length; Ue++)
                          it[Ue].order = Ue;
                        y = pt;
                        const Ei = w._initialDimensions?.get(X), Ci = { ...I, dimensions: Ei ? { ...Ei } : void 0 };
                        w.layoutChildren(me, { excludeId: X, includeNode: Ci, shallow: !0 }), w.propagateLayoutUp(me, { includeNode: Ci });
                      } else Ce && m !== I.parentId ? (be && be !== I.parentId && (w.layoutChildren(be, { omitFromComputation: X, shallow: !0 }), w.propagateLayoutUp(be, { omitFromComputation: X })), m = I.parentId, y = -1) : !me && !Ce && (be && (w.layoutChildren(be, { omitFromComputation: X, shallow: !0 }), w.propagateLayoutUp(be, { omitFromComputation: X })), m = null, y = -1);
                    }
                  }
                  if (m) {
                    const W = w.getNode(m), se = W?.childLayout ?? Z.childLayout, fe = w.nodes.filter((ue) => ue.parentId === m && ue.id !== X).sort((ue, we) => (ue.order ?? 1 / 0) - (we.order ?? 1 / 0));
                    let ge, pe;
                    if (m !== I.parentId) {
                      const ue = W?.parentId ? w.getAbsolutePosition(m) : W?.position ?? { x: 0, y: 0 };
                      ge = j.x - ue.x, pe = j.y - ue.y;
                    } else
                      ge = I.position.x, pe = I.position.y;
                    const Ee = se.swapThreshold ?? 0.5;
                    if (y === -1)
                      if (m === I.parentId) {
                        const ue = I.order ?? 0;
                        y = fe.filter((we) => (we.order ?? 0) < ue).length;
                      } else
                        y = fe.length;
                    const Ce = y;
                    let Se = fe.length;
                    for (let ue = 0; ue < fe.length; ue++) {
                      const we = fe[ue], Ne = we.dimensions?.width ?? 150, xe = we.dimensions?.height ?? 50, He = ue < Ce ? 1 - Ee : Ee, Le = we.position.y + xe * He, me = we.position.x + Ne * He;
                      if (se.direction === "grid") {
                        const he = {
                          x: ge + ce / 2,
                          y: pe + F / 2
                        }, be = we.position.y + xe / 2;
                        if (he.y < we.position.y) {
                          Se = ue;
                          break;
                        }
                        if (Math.abs(he.y - be) < xe / 2 && he.x < me) {
                          Se = ue;
                          break;
                        }
                      } else if (se.direction === "vertical") {
                        if ((ue < Ce ? pe : pe + F) < Le) {
                          Se = ue;
                          break;
                        }
                      } else if ((ue < Ce ? ge : ge + ce) < me) {
                        Se = ue;
                        break;
                      }
                    }
                    if (Se !== y) {
                      y = Se;
                      const ue = [...fe];
                      ue.splice(Se, 0, I);
                      for (let Le = 0; Le < ue.length; Le++)
                        ue[Le].order = Le;
                      e.closest(".flow-container")?.classList.add("flow-layout-animating"), w._layoutAnimFrame && cancelAnimationFrame(w._layoutAnimFrame);
                      const Ne = I.id, xe = m, He = xe !== I.parentId;
                      w._layoutAnimFrame = requestAnimationFrame(() => {
                        if (He && xe) {
                          const be = w.getNode(Ne);
                          let ot;
                          if (be) {
                            const pt = w._initialDimensions?.get(Ne);
                            ot = { ...be, dimensions: pt ? { ...pt } : void 0 };
                          }
                          w.layoutChildren(xe, {
                            excludeId: Ne,
                            includeNode: ot,
                            shallow: !0
                          }), w.propagateLayoutUp(xe, {
                            includeNode: ot
                          });
                        } else
                          w.layoutChildren(xe, Ne, !0);
                        const Le = performance.now(), me = 300, he = () => {
                          w._layoutAnimTick++, performance.now() - Le < me ? w._layoutAnimFrame = requestAnimationFrame(he) : w._layoutAnimFrame = 0;
                        };
                        w._layoutAnimFrame = requestAnimationFrame(he);
                      });
                    }
                  }
                  d && H instanceof MouseEvent && d.updatePointer(H.clientX, H.clientY);
                  return;
                }
                if (I.extent === "parent" && Z?.dimensions) {
                  const z = vo(
                    { x: ne, y: Y },
                    V,
                    Z.dimensions
                  );
                  ne = z.x, Y = z.y;
                } else if (Array.isArray(I.extent)) {
                  const z = Tr({ x: ne, y: Y }, I.extent, V);
                  ne = z.x, Y = z.y;
                }
                if ((!I.extent || I.extent !== "parent") && (rn(
                  Z,
                  w._config?.childValidationRules ?? {}
                )?.preventChildEscape || !!Z?.childLayout) && Z?.dimensions) {
                  const F = vo(
                    { x: ne, y: Y },
                    V,
                    Z.dimensions
                  );
                  ne = F.x, Y = F.y;
                }
                if (I.expandParent && Z?.dimensions) {
                  const z = pf(
                    { x: ne, y: Y },
                    V,
                    Z.dimensions
                  );
                  z && (Z.dimensions.width = z.width, Z.dimensions.height = z.height);
                }
                I.position.x = ne, I.position.y = Y;
              } else {
                const ee = Ln(j, I, w._config?.nodeExtent);
                I.position.x = ee.x, I.position.y = ee.y;
              }
              if (w._config?.snapToGrid) {
                const ee = I.nodeOrigin ?? w._config?.nodeOrigin ?? [0, 0], ne = I.dimensions?.width ?? 150, Y = I.dimensions?.height ?? 40, V = I.parentId ? w.getAbsolutePosition(I.id) : I.position;
                e.style.left = V.x - ne * ee[0] + "px", e.style.top = V.y - Y * ee[1] + "px", w._layoutAnimTick++;
              }
              if (w._emit("node-drag", { node: I, position: j }), c)
                for (const [ee, ne] of c) {
                  const Y = w.getNode(ee);
                  if (Y) {
                    let V = ne.x + Q.x, Z = ne.y + Q.y;
                    const z = Ln({ x: V, y: Z }, Y, w._config?.nodeExtent);
                    Y.position.x = z.x, Y.position.y = z.y;
                  }
                }
              const G = w._config?.helperLines;
              if (G) {
                const ee = typeof G == "object" ? G.snap ?? !0 : !0, ne = typeof G == "object" ? G.threshold ?? 5 : 5, Y = (W) => {
                  const se = W.parentId ? w.getAbsolutePosition(W.id) : W.position;
                  return yg({ ...W, position: se }, w._config?.nodeOrigin);
                }, Z = (w.selectedNodes.size > 1 && w.selectedNodes.has(X) ? w.nodes.filter((W) => w.selectedNodes.has(W.id)) : [I]).map(Y), z = {
                  x: Math.min(...Z.map((W) => W.x)),
                  y: Math.min(...Z.map((W) => W.y)),
                  width: Math.max(...Z.map((W) => W.x + W.width)) - Math.min(...Z.map((W) => W.x)),
                  height: Math.max(...Z.map((W) => W.y + W.height)) - Math.min(...Z.map((W) => W.y))
                }, ce = w.nodes.filter(
                  (W) => !w.selectedNodes.has(W.id) && W.id !== X && W.hidden !== !0 && W.filtered !== !0
                ).map(Y), F = wg(z, ce, ne);
                if (ee && (F.snapOffset.x !== 0 || F.snapOffset.y !== 0) && (I.position.x += F.snapOffset.x, I.position.y += F.snapOffset.y, c))
                  for (const [W] of c) {
                    const se = w.getNode(W);
                    se && (se.position.x += F.snapOffset.x, se.position.y += F.snapOffset.y);
                  }
                if (f?.remove(), F.horizontal.length > 0 || F.vertical.length > 0) {
                  const W = K?.querySelector(".flow-viewport");
                  if (W) {
                    const se = w.nodes.map(Y);
                    f = kg(F.horizontal, F.vertical, se), W.appendChild(f);
                  }
                } else
                  f = null;
                w._emit("helper-lines-change", {
                  horizontal: F.horizontal,
                  vertical: F.vertical
                });
              }
            }
            if (w._config?.preventOverlap) {
              const G = typeof w._config.preventOverlap == "number" ? w._config.preventOverlap : 5, ee = I.dimensions?.width ?? ve, ne = I.dimensions?.height ?? _e, Y = w.selectedNodes, V = w.nodes.filter((z) => z.id !== I.id && !z.hidden && !Y.has(z.id)).map((z) => qt(z, w._config?.nodeOrigin)), Z = Vf(I.position, ee, ne, V, G);
              I.position.x = Z.x, I.position.y = Z.y;
            }
            if (!I.parentId) {
              const G = ut(I.id, w.nodes), ee = w.nodes.filter(
                (z) => z.id !== I.id && z.droppable && !z.hidden && !G.has(z.id) && (!z.acceptsDrop || z.acceptsDrop(I))
              ), ne = qt(I, w._config?.nodeOrigin);
              let Y = null;
              const V = 12;
              for (const z of ee) {
                const ce = z.parentId ? w.getAbsolutePosition(z.id) : z.position, F = z.dimensions?.width ?? ve, W = z.dimensions?.height ?? _e, se = ne.x + ne.width / 2, fe = ne.y + ne.height / 2, ge = z.id === g ? 0 : V;
                se >= ce.x + ge && se <= ce.x + F - ge && fe >= ce.y + ge && fe <= ce.y + W - ge && (Y = z);
              }
              const Z = Y?.id ?? null;
              Z !== g && (g && K && K.querySelector(`[data-flow-node-id="${CSS.escape(g)}"]`)?.classList.remove("flow-node-drop-target"), Z && K && K.querySelector(`[data-flow-node-id="${CSS.escape(Z)}"]`)?.classList.add("flow-node-drop-target"), g = Z);
            }
            if (w._config?.proximityConnect) {
              const G = w._config.proximityConnectDistance ?? 150, ee = I.dimensions ?? { width: 150, height: 50 }, ne = {
                x: I.position.x + ee.width / 2,
                y: I.position.y + ee.height / 2
              }, Y = w.nodes.filter((Z) => Z.id !== I.id && !Z.hidden).map((Z) => ({
                id: Z.id,
                center: {
                  x: Z.position.x + (Z.dimensions?.width ?? 150) / 2,
                  y: Z.position.y + (Z.dimensions?.height ?? 50) / 2
                }
              })), V = _g(I.id, ne, Y, G);
              if (V)
                if (w.edges.some(
                  (z) => z.source === V.source && z.target === V.target || z.source === V.target && z.target === V.source
                ))
                  u?.destroy(), u = null, h = null;
                else {
                  if (h = V, !u) {
                    u = Rt({
                      connectionLineType: w._config?.connectionLineType,
                      connectionLineStyle: w._config?.connectionLineStyle,
                      connectionLine: w._config?.connectionLine
                    });
                    const z = K?.querySelector(".flow-viewport");
                    z && z.appendChild(u.svg);
                  }
                  u.update({
                    fromX: ne.x,
                    fromY: ne.y,
                    toX: V.targetCenter.x,
                    toY: V.targetCenter.y,
                    source: V.source
                  });
                }
              else
                u?.destroy(), u = null, h = null;
            }
            const ie = w._container ? $e.get(w._container) : void 0;
            if (ie?.bridge) {
              if (ie.bridge.pushLocalNodeUpdate(X, { position: I.position }), c)
                for (const [G] of c) {
                  const ee = w.getNode(G);
                  ee && ie.bridge.pushLocalNodeUpdate(G, { position: ee.position });
                }
              if (ie.awareness && H instanceof MouseEvent && w._container) {
                const G = w._container.getBoundingClientRect(), ee = (H.clientX - G.left - w.viewport.x) / w.viewport.zoom, ne = (H.clientY - G.top - w.viewport.y) / w.viewport.zoom;
                ie.awareness.updateCursor({ x: ee, y: ne });
              }
            }
            d && H instanceof MouseEvent && d.updatePointer(H.clientX, H.clientY);
          },
          onDragEnd({ nodeId: X, position: j }) {
            e.classList.remove("flow-node-dragging"), B("drag", `Node "${X}" drag end`, j);
            const Q = w._container ? $e.get(w._container) : void 0;
            Q?.bridge && Q.bridge.setDragging(X, !1), d?.stop(), d = null, f?.remove(), f = null, w._config?.helperLines && w._emit("helper-lines-change", { horizontal: [], vertical: [] });
            const H = w.getNode(X);
            if (H && w._emit("node-drag-end", { node: H, position: j }), p && H?.parentId) {
              e.classList.remove("flow-reorder-dragging");
              const I = m;
              p = !1, y = -1, m = null, w._layoutAnimFrame && (cancelAnimationFrame(w._layoutAnimFrame), w._layoutAnimFrame = 0), e.closest(".flow-container")?.classList.remove("flow-layout-animating"), g ? (K && K.querySelector(`[data-flow-node-id="${CSS.escape(g)}"]`)?.classList.remove("flow-node-drop-target"), w.reparentNode(X, g), g = null) : I && I !== H.parentId ? (w.layoutChildren(I, { omitFromComputation: X, shallow: !0 }), w.propagateLayoutUp(I, { omitFromComputation: X }), w.layoutChildren(H.parentId), w._emit("child-reorder", {
                nodeId: X,
                parentId: H.parentId,
                order: H.order
              })) : (w.layoutChildren(H.parentId), w._emit("child-reorder", {
                nodeId: X,
                parentId: H.parentId,
                order: H.order
              })), c = null, l = !1;
              return;
            }
            if (H && g)
              K && K.querySelector(`[data-flow-node-id="${CSS.escape(g)}"]`)?.classList.remove("flow-node-drop-target"), w.reparentNode(X, g), g = null;
            else if (H && H.parentId && !g) {
              const I = rn(
                w.getNode(H.parentId),
                w._config?.childValidationRules ?? {}
              ), ie = w.getNode(H.parentId);
              if (!I?.preventChildEscape && !ie?.childLayout && ie?.dimensions) {
                const G = H.position.x, ee = H.position.y, ne = H.dimensions?.width ?? 150, Y = H.dimensions?.height ?? 50;
                (G + ne < 0 || ee + Y < 0 || G > ie.dimensions.width || ee > ie.dimensions.height) && w.reparentNode(X, null);
              }
              g = null;
            } else
              g && K && K.querySelector(`[data-flow-node-id="${CSS.escape(g)}"]`)?.classList.remove("flow-node-drop-target"), g = null;
            if (w._config?.proximityConnect && h) {
              const I = h;
              u?.destroy(), u = null, h = null;
              let ie = !0;
              if (w._config.onProximityConnect && w._config.onProximityConnect({
                source: I.source,
                target: I.target,
                distance: I.distance
              }) === !1 && (ie = !1), ie) {
                const G = {
                  source: I.source,
                  sourceHandle: "source",
                  target: I.target,
                  targetHandle: "target"
                };
                if (Qe(G, w.edges, { preventCycles: w._config?.preventCycles }) && Je(G, w._config?.connectionRules, w._nodeMap) && (K ? Ye(K, G, w.edges) : !0) && (K ? Xe(K, G) : !0) && (!w._config.isValidConnection || w._config.isValidConnection(G))) {
                  if (w._config.proximityConnectConfirm) {
                    const z = K?.querySelector(`[data-flow-node-id="${CSS.escape(I.source)}"]`), ce = K?.querySelector(`[data-flow-node-id="${CSS.escape(I.target)}"]`);
                    z?.classList.add("flow-proximity-confirm"), ce?.classList.add("flow-proximity-confirm"), setTimeout(() => {
                      z?.classList.remove("flow-proximity-confirm"), ce?.classList.remove("flow-proximity-confirm");
                    }, 400);
                  }
                  const Z = `e-${I.source}-${I.target}-${Date.now()}-${Eg++}`;
                  w.addEdges({ id: Z, ...G }), w._emit("connect", { connection: G });
                }
              }
            } else
              u?.destroy(), u = null, h = null;
            c = null, l = !1;
          }
        }));
      });
      {
        const v = t.$data(e.closest("[x-data]"));
        if (v?._config?.easyConnect) {
          const w = v._config.easyConnectKey ?? "alt", D = (x) => {
            if (!Cg(x, w) || x.target.closest("[data-flow-handle-type]")) return;
            const N = t.$data(e.closest("[x-data]"));
            if (!N || N._animationLocked) return;
            const A = o(n);
            if (!A) return;
            const O = N.getNode(A.id);
            if (!O || O.connectable === !1) return;
            x.preventDefault(), x.stopPropagation(), x.stopImmediatePropagation();
            const U = Sg(e, x.clientX, x.clientY), S = U?.dataset.flowHandleId ?? "source";
            e.classList.add("flow-easy-connecting");
            const k = e.closest(".flow-container");
            if (!k) return;
            const R = N.viewport?.zoom || 1, q = N.viewport?.x || 0, re = N.viewport?.y || 0, te = k.getBoundingClientRect();
            let oe, ae;
            if (U) {
              const H = U.getBoundingClientRect();
              oe = (H.left + H.width / 2 - te.left - q) / R, ae = (H.top + H.height / 2 - te.top - re) / R;
            } else {
              const H = e.getBoundingClientRect();
              oe = (H.left + H.width / 2 - te.left - q) / R, ae = (H.top + H.height / 2 - te.top - re) / R;
            }
            N._emit("connect-start", { source: A.id, sourceHandle: S });
            const de = Rt({
              connectionLineType: N._config?.connectionLineType,
              connectionLineStyle: N._config?.connectionLineStyle,
              connectionLine: N._config?.connectionLine
            }), le = k.querySelector(".flow-viewport");
            le && le.appendChild(de.svg), de.update({ fromX: oe, fromY: ae, toX: oe, toY: ae, source: A.id, sourceHandle: S }), N.pendingConnection = { source: A.id, sourceHandle: S, position: { x: oe, y: ae } }, sn(k, A.id, S, N);
            let J = Kn(k, N, x.clientX, x.clientY), K = null;
            const X = N._config?.connectionSnapRadius ?? 20, j = (H) => {
              const I = N.screenToFlowPosition(H.clientX, H.clientY), ie = on({
                containerEl: k,
                handleType: "target",
                excludeNodeId: A.id,
                cursorFlowPos: I,
                connectionSnapRadius: X,
                getNode: (G) => N.getNode(G),
                toFlowPosition: (G, ee) => N.screenToFlowPosition(G, ee)
              });
              ie.element !== K && (K?.classList.remove("flow-handle-active"), ie.element?.classList.add("flow-handle-active"), K = ie.element), de.update({ fromX: oe, fromY: ae, toX: ie.position.x, toY: ie.position.y, source: A.id, sourceHandle: S }), N.pendingConnection = { ...N.pendingConnection, position: ie.position }, J?.updatePointer(H.clientX, H.clientY);
            }, Q = (H) => {
              J?.stop(), J = null, document.removeEventListener("pointermove", j), document.removeEventListener("pointerup", Q), de.destroy(), K?.classList.remove("flow-handle-active"), Pe(k), e.classList.remove("flow-easy-connecting");
              const I = N.screenToFlowPosition(H.clientX, H.clientY), ie = { source: A.id, sourceHandle: S, position: I };
              let G = K;
              if (G || (G = document.elementFromPoint(H.clientX, H.clientY)?.closest('[data-flow-handle-type="target"]')), G) {
                const ne = G.closest("[x-flow-node]")?.dataset.flowNodeId, Y = G.dataset.flowHandleId ?? "target";
                if (ne) {
                  const V = { source: A.id, sourceHandle: S, target: ne, targetHandle: Y };
                  if (Qe(V, N.edges, { preventCycles: N._config.preventCycles }))
                    if (Je(V, N._config?.connectionRules, N._nodeMap) && Ye(k, V, N.edges) && Xe(k, V) && (!N._config?.isValidConnection || N._config.isValidConnection(V))) {
                      const Z = `e-${A.id}-${ne}-${Date.now()}-${xg++}`;
                      N.addEdges({ id: Z, ...V }), N._emit("connect", { connection: V }), N._emit("connect-end", { connection: V, ...ie });
                    } else
                      Me(k, V), N._emit("connect-end", { connection: null, ...ie });
                  else
                    Me(k, V), N._emit("connect-end", { connection: null, ...ie });
                } else
                  N._emit("connect-end", { connection: null, ...ie });
              } else
                N._emit("connect-end", { connection: null, ...ie });
              N.pendingConnection = null;
            };
            document.addEventListener("pointermove", j), document.addEventListener("pointerup", Q);
          };
          e.addEventListener("pointerdown", D, { capture: !0 }), r(() => {
            e.removeEventListener("pointerdown", D, { capture: !0 });
          });
        }
      }
      const L = (v) => {
        if (v.key !== "Enter" && v.key !== " ") return;
        v.preventDefault();
        const w = o(n);
        if (!w) return;
        const D = t.$data(e.closest("[x-data]"));
        D && (D._animationLocked || Xo(w) && (D._emit("node-click", { node: w, event: v }), v.stopPropagation(), dt(v, D._shortcuts?.multiSelect) ? D.selectedNodes.has(w.id) ? (D.selectedNodes.delete(w.id), w.selected = !1) : (D.selectedNodes.add(w.id), w.selected = !0) : (D.deselectAll(), D.selectedNodes.add(w.id), w.selected = !0), D._emitSelectionChange()));
      };
      e.addEventListener("keydown", L);
      const $ = () => {
        const v = t.$data(e.closest("[x-data]"));
        if (!v?._config?.autoPanOnNodeFocus) return;
        const w = o(n);
        if (!w) return;
        const D = w.parentId ? v.getAbsolutePosition(w.id) : w.position;
        v.setCenter(
          D.x + (w.dimensions?.width ?? 150) / 2,
          D.y + (w.dimensions?.height ?? 40) / 2
        );
      };
      e.addEventListener("focus", $);
      const _ = (v) => {
        if (l) return;
        const w = o(n);
        if (!w) return;
        const D = t.$data(e.closest("[x-data]"));
        if (D && !D._animationLocked && (D._emit("node-click", { node: w, event: v }), !!Xo(w))) {
          if (v.stopPropagation(), a) {
            a = !1;
            return;
          }
          dt(v, D._shortcuts?.multiSelect) ? D.selectedNodes.has(w.id) ? (D.selectedNodes.delete(w.id), w.selected = !1, e.classList.remove("flow-node-selected"), B("selection", `Node "${w.id}" deselected (shift)`)) : (D.selectedNodes.add(w.id), w.selected = !0, e.classList.add("flow-node-selected"), B("selection", `Node "${w.id}" selected (shift)`)) : (D.deselectAll(), D.selectedNodes.add(w.id), w.selected = !0, e.classList.add("flow-node-selected"), B("selection", `Node "${w.id}" selected`)), D._emitSelectionChange();
        }
      };
      e.addEventListener("click", _);
      const E = (v) => {
        v.preventDefault(), v.stopPropagation();
        const w = o(n);
        if (!w) return;
        const D = t.$data(e.closest("[x-data]"));
        if (D)
          if (D.selectedNodes.size > 1 && D.selectedNodes.has(w.id)) {
            const x = D.nodes.filter((N) => D.selectedNodes.has(N.id));
            D._emit("selection-context-menu", { nodes: x, event: v });
          } else
            D._emit("node-context-menu", { node: w, event: v });
      };
      e.addEventListener("contextmenu", E), requestAnimationFrame(() => {
        if (!e.isConnected) return;
        const v = o(n);
        if (!v) return;
        const w = t.$data(e.closest("[x-data]"));
        v.dimensions = {
          width: e.offsetWidth,
          height: e.offsetHeight
        }, B("init", `Node "${v.id}" measured`, v.dimensions), w?._nodeElements?.set(v.id, e), v.resizeObserver !== !1 && w?._resizeObserver && w._resizeObserver.observe(e);
      }), r(() => {
        s?.destroy(), f?.remove(), f = null, u?.destroy(), u = null, e.removeEventListener("keydown", L), e.removeEventListener("focus", $), e.removeEventListener("click", _), e.removeEventListener("contextmenu", E);
        const v = e.dataset.flowNodeId;
        if (v) {
          const w = t.$data(e.closest("[x-data]"));
          w?._nodeElements?.delete(v), w?._resizeObserver?.unobserve(e);
        }
      });
    }
  );
}
const St = {
  minWidth: 30,
  minHeight: 30,
  maxWidth: 1 / 0,
  maxHeight: 1 / 0
};
function Lg(t, e, n, o, i, r) {
  const { minWidth: s, minHeight: l, maxWidth: a, maxHeight: c } = i, d = t.includes("left"), f = t.includes("right"), u = t.includes("top"), h = t.includes("bottom");
  let g = o.width;
  f ? g = o.width + e.x : d && (g = o.width - e.x);
  let p = o.height;
  h ? p = o.height + e.y : u && (p = o.height - e.y), g = Math.max(s, Math.min(a, g)), p = Math.max(l, Math.min(c, p)), r && (g = r[0] * Math.round(g / r[0]), p = r[1] * Math.round(p / r[1]), g = Math.max(s, Math.min(a, g)), p = Math.max(l, Math.min(c, p)));
  const y = g - o.width, m = p - o.height, C = d ? n.x - y : n.x, T = u ? n.y - m : n.y;
  return {
    position: { x: C, y: T },
    dimensions: { width: g, height: p }
  };
}
const Kr = ["top-left", "top-right", "bottom-left", "bottom-right"], Gr = ["top", "right", "bottom", "left"], Mg = [...Kr, ...Gr], Tg = {
  "top-left": "nwse-resize",
  "top-right": "nesw-resize",
  "bottom-left": "nesw-resize",
  "bottom-right": "nwse-resize",
  top: "ns-resize",
  bottom: "ns-resize",
  left: "ew-resize",
  right: "ew-resize"
};
function Ag(t) {
  t.directive(
    "flow-resizer",
    (e, { expression: n, modifiers: o }, { evaluate: i, effect: r, cleanup: s }) => {
      const l = Ng(o);
      let a = { ...St };
      if (n)
        try {
          const d = i(n);
          a = { ...St, ...d };
        } catch {
        }
      const c = [];
      for (const d of l) {
        const f = document.createElement("div");
        f.className = `flow-resizer-handle flow-resizer-handle-${d}`, f.style.cursor = Tg[d], f.dataset.flowResizeDirection = d, e.appendChild(f), c.push(f), f.addEventListener("pointerdown", (u) => {
          u.preventDefault(), u.stopPropagation();
          const h = e.closest("[x-flow-node]");
          if (!h) return;
          const g = e.closest("[x-data]");
          if (!g) return;
          const p = t.$data(g), y = h.dataset.flowNodeId;
          if (!y || !p) return;
          const m = p.getNode(y);
          if (!m || !ns(m)) return;
          m.fixedDimensions = !0;
          const C = { ...a };
          if (m.minDimensions?.width != null && a.minWidth === St.minWidth && (C.minWidth = m.minDimensions.width), m.minDimensions?.height != null && a.minHeight === St.minHeight && (C.minHeight = m.minDimensions.height), m.maxDimensions?.width != null && a.maxWidth === St.maxWidth && (C.maxWidth = m.maxDimensions.width), m.maxDimensions?.height != null && a.maxHeight === St.maxHeight && (C.maxHeight = m.maxDimensions.height), !m.dimensions) {
            const E = p.viewport?.zoom || 1, v = h.getBoundingClientRect();
            m.dimensions = { width: v.width / E, height: v.height / E };
          }
          const T = { x: m.position.x, y: m.position.y }, b = { width: m.dimensions.width, height: m.dimensions.height }, M = p.viewport?.zoom || 1, P = u.clientX, L = u.clientY;
          p._captureHistory?.(), B("resize", `Resize start on "${y}" (${d})`, b), p._emit("node-resize-start", { node: m, dimensions: { ...b } });
          const $ = (E) => {
            const v = {
              x: (E.clientX - P) / M,
              y: (E.clientY - L) / M
            }, w = Lg(
              d,
              v,
              T,
              b,
              C,
              p._config?.snapToGrid ?? !1
            );
            if (m.position.x = w.position.x, m.position.y = w.position.y, m.dimensions.width = w.dimensions.width, m.dimensions.height = w.dimensions.height, m.parentId) {
              const D = p.getAbsolutePosition(m.id);
              h.style.left = `${D.x}px`, h.style.top = `${D.y}px`;
            } else
              h.style.left = `${w.position.x}px`, h.style.top = `${w.position.y}px`;
            h.style.width = `${w.dimensions.width}px`, h.style.height = `${w.dimensions.height}px`, p._emit("node-resize", { node: m, dimensions: { ...w.dimensions } });
          }, _ = () => {
            document.removeEventListener("pointermove", $), document.removeEventListener("pointerup", _), document.removeEventListener("pointercancel", _), B("resize", `Resize end on "${y}"`, m.dimensions), p._emit("node-resize-end", { node: m, dimensions: { ...m.dimensions } });
          };
          document.addEventListener("pointermove", $), document.addEventListener("pointerup", _), document.addEventListener("pointercancel", _);
        });
      }
      r(() => {
        const d = e.closest("[x-flow-node]");
        if (!d) return;
        const f = e.closest("[x-data]");
        if (!f) return;
        const u = t.$data(f), h = d.dataset.flowNodeId;
        if (!h || !u) return;
        const g = u.getNode(h);
        if (!g) return;
        const p = !ns(g);
        for (const y of c)
          y.style.display = p ? "none" : "";
      }), s(() => {
        for (const d of c)
          d.remove();
      });
    }
  );
}
function Ng(t) {
  if (t.includes("corners"))
    return Kr;
  if (t.includes("edges"))
    return Gr;
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
  return Mg;
}
function Ig(t, e, n, o) {
  return (Math.atan2(t - n, -(e - o)) * 180 / Math.PI % 360 + 360) % 360;
}
function $g(t, e) {
  return (Math.round(t / e) * e % 360 + 360) % 360;
}
function Dg(t) {
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
        const h = t.$data(u), g = f.dataset.flowNodeId;
        if (!g || !h) return;
        const p = h.getNode(g);
        if (!p) return;
        const y = f.getBoundingClientRect(), m = y.left + y.width / 2, C = y.top + y.height / 2;
        h._captureHistory(), e.style.cursor = "grabbing";
        const T = (M) => {
          let P = Ig(
            M.clientX,
            M.clientY,
            m,
            C
          );
          l && (P = $g(P, a)), p.rotation = P;
        }, b = () => {
          document.removeEventListener("pointermove", T), document.removeEventListener("pointerup", b), e.style.cursor = "grab", h._emit("node-rotate-end", { node: p, rotation: p.rotation });
        };
        document.addEventListener("pointermove", T), document.addEventListener("pointerup", b);
      };
      e.addEventListener("pointerdown", c), s(() => {
        e.removeEventListener("pointerdown", c), e.classList.remove("flow-rotate-handle");
      });
    }
  );
}
function Rg(t) {
  t.directive(
    "flow-drag-handle",
    (e) => {
      e.setAttribute("data-flow-drag-handle", ""), e.classList.add("flow-drag-handle");
      const n = e.closest("[x-flow-node]");
      n && n.classList.add("flow-node-has-handle");
    }
  );
}
const Hg = "application/alpineflow";
function Fg(t) {
  t.directive(
    "flow-draggable",
    (e, { expression: n }, { evaluate: o }) => {
      e.setAttribute("draggable", "true"), e.style.cursor = "grab", e.addEventListener("dragstart", (i) => {
        if (!i.dataTransfer) return;
        const r = o(n), s = typeof r == "string" ? r : JSON.stringify(r);
        i.dataTransfer.setData(Hg, s), i.dataTransfer.effectAllowed = "move";
      });
    }
  );
}
function Og(t) {
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
function zg(t) {
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
        const a = i.edges, c = new Set(a.map((p) => p.id));
        for (const [p, y] of l)
          c.has(p) || (t.destroyTree(y), y.remove(), l.delete(p), i._edgeSvgElements?.delete(p));
        for (const p of a) {
          if (l.has(p.id)) continue;
          const y = document.createElementNS("http://www.w3.org/2000/svg", "svg");
          y.setAttribute("class", "flow-edge-svg");
          const m = document.createElementNS("http://www.w3.org/2000/svg", "g");
          y.appendChild(m), t.addScopeToNode(m, { edge: p }), m.setAttribute("x-flow-edge", "edge"), t.mutateDom(() => {
            s.appendChild(y);
          }), l.set(p.id, y), i._edgeSvgElements?.set(p.id, y), t.initTree(m);
        }
        const f = (e.closest("[data-flow-canvas]") ?? e).querySelector(".flow-edges-static");
        f && f.remove();
        const u = !!i._config?.collapseBidirectionalEdges, h = /* @__PURE__ */ new Set(), g = /* @__PURE__ */ new Set();
        if (u) {
          const p = Og(
            a
          );
          for (const y of p)
            h.add(y.primaryId), g.add(y.mirrorId);
        }
        for (const p of a) {
          const y = h.has(p.id), m = g.has(p.id);
          !!p._renderDualMarker !== y && (p._renderDualMarker = y ? !0 : void 0), !!p._hiddenByCollapse !== m && (p._hiddenByCollapse = m ? !0 : void 0);
        }
        for (const p of a) {
          const y = l.get(p.id);
          if (!y) continue;
          const m = i.getNode?.(p.source), C = i.getNode?.(p.target), T = p.hidden || p._hiddenByCollapse || m?.hidden || C?.hidden;
          y.style.display = T ? "none" : "";
        }
        for (const p of a) {
          const y = l.get(p.id);
          if (!y) continue;
          const m = i.getNode?.(p.source), C = i.getNode?.(p.target);
          m?.filtered || C?.filtered ? y.classList.add("flow-edge-filtered") : y.classList.remove("flow-edge-filtered");
        }
      }), o(() => {
        for (const [a, c] of l)
          t.destroyTree(c), c.remove(), i._edgeSvgElements?.delete(a);
        l.clear(), s.remove();
      });
    }
  );
}
const Vg = [
  "top",
  "bottom",
  "left",
  "right",
  "top-left",
  "top-right",
  "bottom-left",
  "bottom-right"
], Bg = "a, button, input, textarea, select, [contenteditable]", qg = 100, Xg = 60, Yg = /* @__PURE__ */ new Set(["top", "top-left", "top-right"]), Wg = /* @__PURE__ */ new Set(["bottom", "bottom-left", "bottom-right"]), jg = /* @__PURE__ */ new Set(["left", "top-left", "bottom-left"]), Ug = /* @__PURE__ */ new Set(["right", "top-right", "bottom-right"]);
function Zg(t, e) {
  const n = new Set(e), o = n.has("static"), i = n.has("no-resize") || n.has("noresize"), r = n.has("locked"), s = n.has("constrained");
  let l = n.has("fill-width") || n.has("fill"), a = n.has("fill-height") || n.has("fill");
  return { position: t && Vg.includes(t) ? t : "top-right", isStatic: o, isFixed: r, noResize: i, constrained: s, fillWidth: l, fillHeight: a };
}
function kt(t, e, n) {
  t.dispatchEvent(new CustomEvent(`flow-${e}`, {
    bubbles: !0,
    detail: n
  }));
}
function Kg(t, e, n, o, i, r) {
  return {
    left: Math.max(0, Math.min(t, i - n)),
    top: Math.max(0, Math.min(e, r - o))
  };
}
function Gg(t, e, n, o) {
  t.style.transform = "none", t.style.borderRadius = "0", n && (t.style.left = "0", t.style.right = "0", t.style.width = "auto"), o && (t.style.top = "0", t.style.bottom = "0", t.style.height = "auto"), n && !o && (Yg.has(e) && (t.style.top = "0"), Wg.has(e) && (t.style.bottom = "0")), o && !n && (jg.has(e) && (t.style.left = "0"), Ug.has(e) && (t.style.right = "0"));
}
function Jg(t) {
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
      } = Zg(n, o), u = d || f, h = !s && !l && !u, g = !s && !a && !u;
      e.classList.add("flow-panel", `flow-panel-${r}`), s && e.classList.add("flow-panel-static"), (l || u) && e.classList.add("flow-panel-locked"), (a || u) && e.classList.add("flow-panel-no-resize"), d && e.classList.add("flow-panel-fill-width"), f && e.classList.add("flow-panel-fill-height"), u && Gg(e, r, d, f);
      const p = (M) => M.stopPropagation();
      e.addEventListener("mousedown", p), e.addEventListener("pointerdown", p), e.addEventListener("wheel", p);
      const y = e.parentElement, m = {
        left: e.style.left,
        top: e.style.top,
        right: e.style.right,
        bottom: e.style.bottom,
        transform: e.style.transform,
        width: e.style.width,
        height: e.style.height,
        borderRadius: e.style.borderRadius
      }, C = `flow-panel-${r}`, T = () => {
        e.style.left = m.left, e.style.top = m.top, e.style.right = m.right, e.style.bottom = m.bottom, e.style.transform = m.transform, e.style.width = m.width, e.style.height = m.height, e.style.borderRadius = m.borderRadius, e.classList.contains(C) || e.classList.add(C);
      };
      y.addEventListener("flow-panel-reset", T), y.__flowPanels || (y.__flowPanels = /* @__PURE__ */ new Set()), y.__flowPanels.add(e);
      let b = null;
      if (h) {
        let M = !1, P = 0, L = 0, $ = 0, _ = 0;
        const E = () => {
          const x = e.getBoundingClientRect(), N = y.getBoundingClientRect();
          return {
            x: x.left - N.left,
            y: x.top - N.top
          };
        }, v = (x) => {
          if (!M) return;
          let N = $ + (x.clientX - P), A = _ + (x.clientY - L);
          if (c) {
            const O = Kg(
              N,
              A,
              e.offsetWidth,
              e.offsetHeight,
              y.clientWidth,
              y.clientHeight
            );
            N = O.left, A = O.top;
          }
          e.style.left = `${N}px`, e.style.top = `${A}px`, kt(y, "panel-drag", {
            panel: e,
            position: { x: N, y: A }
          });
        }, w = () => {
          if (!M) return;
          M = !1, document.removeEventListener("pointermove", v), document.removeEventListener("pointerup", w), document.removeEventListener("pointercancel", w);
          const x = E();
          kt(y, "panel-drag-end", {
            panel: e,
            position: x
          });
        }, D = (x) => {
          const N = x.target;
          if (N.closest(Bg) || N.closest(".flow-panel-resize-handle"))
            return;
          M = !0, P = x.clientX, L = x.clientY;
          const A = e.getBoundingClientRect(), O = y.getBoundingClientRect();
          $ = A.left - O.left, _ = A.top - O.top, e.style.bottom = "auto", e.style.right = "auto", e.style.transform = "none", e.style.left = `${$}px`, e.style.top = `${_}px`, document.addEventListener("pointermove", v), document.addEventListener("pointerup", w), document.addEventListener("pointercancel", w), kt(y, "panel-drag-start", {
            panel: e,
            position: { x: $, y: _ }
          });
        };
        if (e.addEventListener("pointerdown", D), g) {
          b = document.createElement("div"), b.classList.add("flow-panel-resize-handle"), e.appendChild(b);
          let x = !1, N = 0, A = 0, O = 0, U = 0;
          const S = (q) => {
            if (!x) return;
            const re = Math.max(qg, O + (q.clientX - N)), te = Math.max(Xg, U + (q.clientY - A));
            e.style.width = `${re}px`, e.style.height = `${te}px`, kt(y, "panel-resize", {
              panel: e,
              dimensions: { width: re, height: te }
            });
          }, k = () => {
            x && (x = !1, document.removeEventListener("pointermove", S), document.removeEventListener("pointerup", k), document.removeEventListener("pointercancel", k), kt(y, "panel-resize-end", {
              panel: e,
              dimensions: { width: e.offsetWidth, height: e.offsetHeight }
            }));
          }, R = (q) => {
            q.stopPropagation(), x = !0, N = q.clientX, A = q.clientY, O = e.offsetWidth, U = e.offsetHeight, document.addEventListener("pointermove", S), document.addEventListener("pointerup", k), document.addEventListener("pointercancel", k), kt(y, "panel-resize-start", {
              panel: e,
              dimensions: { width: O, height: U }
            });
          };
          b.addEventListener("pointerdown", R), i(() => {
            e.removeEventListener("pointerdown", D), b?.removeEventListener("pointerdown", R), document.removeEventListener("pointermove", v), document.removeEventListener("pointerup", w), document.removeEventListener("pointercancel", w), document.removeEventListener("pointermove", S), document.removeEventListener("pointerup", k), document.removeEventListener("pointercancel", k), b?.remove(), e.removeEventListener("mousedown", p), e.removeEventListener("pointerdown", p), e.removeEventListener("wheel", p), y.removeEventListener("flow-panel-reset", T), y.__flowPanels?.delete(e);
          });
        } else
          i(() => {
            e.removeEventListener("pointerdown", D), document.removeEventListener("pointermove", v), document.removeEventListener("pointerup", w), document.removeEventListener("pointercancel", w), e.removeEventListener("mousedown", p), e.removeEventListener("pointerdown", p), e.removeEventListener("wheel", p), y.removeEventListener("flow-panel-reset", T), y.__flowPanels?.delete(e);
          });
      } else
        i(() => {
          e.removeEventListener("mousedown", p), e.removeEventListener("pointerdown", p), e.removeEventListener("wheel", p), y.removeEventListener("flow-panel-reset", T), y.__flowPanels?.delete(e);
        });
    }
  );
}
function Qg(t) {
  t.directive(
    "flow-node-toolbar",
    (e, { value: n, modifiers: o }, { effect: i, cleanup: r }) => {
      const s = ep(n), l = tp(o);
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
        const h = u.viewport.zoom || 1, g = parseInt(e.getAttribute("data-flow-offset") ?? "10", 10), p = d.dataset.flowNodeId, y = p ? u.getNode(p) : null, m = y?.dimensions?.width ?? d.offsetWidth, C = y?.dimensions?.height ?? d.offsetHeight, T = g / h;
        let b, M, P, L;
        s === "top" || s === "bottom" ? (M = s === "top" ? -T : C + T, L = s === "top" ? "-100%" : "0%", l === "start" ? (b = 0, P = "0%") : l === "end" ? (b = m, P = "-100%") : (b = m / 2, P = "-50%")) : (b = s === "left" ? -T : m + T, P = s === "left" ? "-100%" : "0%", l === "start" ? (M = 0, L = "0%") : l === "end" ? (M = C, L = "-100%") : (M = C / 2, L = "-50%")), e.style.left = `${b}px`, e.style.top = `${M}px`, e.style.transformOrigin = "0 0", e.style.transform = `scale(${1 / h}) translate(${P}, ${L})`;
      }), r(() => {
        e.removeEventListener("pointerdown", a), e.removeEventListener("click", c), e.classList.remove("flow-node-toolbar");
      });
    }
  );
}
function ep(t) {
  return t === "bottom" ? "bottom" : t === "left" ? "left" : t === "right" ? "right" : "top";
}
function tp(t) {
  return t.includes("start") ? "start" : t.includes("end") ? "end" : "center";
}
function np(t) {
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
        const P = r(o);
        f = P?.offsetX ?? 0, u = P?.offsetY ?? 0;
      }
      a.setAttribute("role", "menu"), a.setAttribute("tabindex", "-1"), a.style.display = "none";
      const h = document.createElement("div");
      h.style.cssText = "position:fixed;inset:0;z-index:4999;display:none;", c.appendChild(h);
      let g = null;
      const p = 4, y = () => {
        g = document.activeElement;
        const P = d.contextMenu.x + f, L = d.contextMenu.y + u;
        a.style.display = "", a.style.position = "fixed", a.style.left = P + "px", a.style.top = L + "px", a.style.zIndex = "5000", a.querySelectorAll(':scope > button, :scope > [role="menuitem"]').forEach((D) => {
          D.setAttribute("role", "menuitem"), D.hasAttribute("tabindex") || D.setAttribute("tabindex", "-1");
        });
        const $ = a.getBoundingClientRect(), _ = window.innerWidth, E = window.innerHeight;
        let v = P, w = L;
        $.right > _ - p && (v = _ - $.width - p), $.bottom > E - p && (w = E - $.height - p), v < p && (v = p), w < p && (w = p), a.style.left = v + "px", a.style.top = w + "px", h.style.display = "", a.focus();
      }, m = () => {
        a.style.display = "none", h.style.display = "none", g && document.contains(g) && (g.focus(), g = null);
      };
      i(() => {
        const P = d.contextMenu;
        P.show && P.type === l ? y() : m();
      }), h.addEventListener("click", () => d.closeContextMenu()), h.addEventListener("contextmenu", (P) => {
        P.preventDefault(), d.closeContextMenu();
      });
      const C = () => {
        d.contextMenu.show && d.contextMenu.type === l && d.closeContextMenu();
      };
      window.addEventListener("scroll", C, !0);
      const T = () => Array.from(a.querySelectorAll(
        ':scope > button:not([disabled]), :scope > [role="menuitem"]:not([disabled])'
      )), b = (P) => Array.from(P.querySelectorAll(
        "button:not([disabled])"
      )), M = (P) => {
        if (!d.contextMenu.show || d.contextMenu.type !== l || a.style.display === "none") return;
        const L = document.activeElement, $ = L?.closest(".flow-context-submenu"), _ = $ ? b($) : T();
        if (_.length === 0) return;
        const E = _.indexOf(L);
        switch (P.key) {
          case "ArrowDown": {
            P.preventDefault();
            const v = E < _.length - 1 ? E + 1 : 0;
            _[v].focus();
            break;
          }
          case "ArrowUp": {
            P.preventDefault();
            const v = E > 0 ? E - 1 : _.length - 1;
            _[v].focus();
            break;
          }
          case "Tab": {
            if (P.preventDefault(), P.shiftKey) {
              const v = E > 0 ? E - 1 : _.length - 1;
              _[v].focus();
            } else {
              const v = E < _.length - 1 ? E + 1 : 0;
              _[v].focus();
            }
            break;
          }
          case "Enter":
          case " ": {
            P.preventDefault(), L?.click();
            break;
          }
          case "ArrowRight": {
            if (!$) {
              const v = L?.querySelector(".flow-context-submenu");
              v && (P.preventDefault(), v.querySelector("button:not([disabled])")?.focus());
            }
            break;
          }
          case "ArrowLeft": {
            $ && (P.preventDefault(), $.closest(".flow-context-submenu-trigger")?.focus());
            break;
          }
        }
      };
      a.addEventListener("keydown", M), s(() => {
        h.remove(), window.removeEventListener("scroll", C, !0), a.removeEventListener("keydown", M);
      });
    }
  );
}
const op = {
  mouseenter: "mouseleave",
  click: "click"
  // toggle behavior
};
function ip(t) {
  t.directive(
    "flow-animate",
    (e, { value: n, modifiers: o, expression: i }, { evaluate: r, effect: s, cleanup: l }) => {
      const a = new Set(o), c = a.has("once"), d = a.has("reverse"), f = a.has("queue"), u = n || "";
      let h = "click";
      a.has("mouseenter") ? h = "mouseenter" : a.has("click") && (h = "click");
      let g = null, p = [], y = !1, m = !1, C = !1;
      function T() {
        const v = r(i);
        return Array.isArray(v) ? v : v && typeof v == "object" ? [v] : [];
      }
      function b() {
        const v = e.closest("[x-data]");
        return v ? t.$data(v) : null;
      }
      function M(v, w = !1) {
        const D = b();
        if (!D?.timeline) return Promise.resolve();
        const x = D.timeline();
        if (w) {
          for (let N = v.length - 1; N >= 0; N--)
            x.step(v[N]);
          x.reverse();
        } else
          for (const N of v)
            N.parallel ? x.parallel(N.parallel) : x.step(N);
        return g = x, x.play().then(() => {
          g === x && (g = null);
        });
      }
      function P(v = !1) {
        if (c && m) return;
        m = !0;
        const w = T();
        if (w.length === 0) return;
        const D = () => M(w, v);
        f ? (p.push(D), L()) : (g?.stop(), g = null, p = [], y = !1, D());
      }
      async function L() {
        if (!y) {
          for (y = !0; p.length > 0; )
            await p.shift()();
          y = !1;
        }
      }
      if (u) {
        s(() => {
          const v = T(), w = b();
          w?.registerAnimation && w.registerAnimation(u, v);
        }), l(() => {
          const v = b();
          v?.unregisterAnimation && v.unregisterAnimation(u);
        });
        return;
      }
      const $ = () => {
        d && h === "click" ? (P(C), C = !C) : P(!1);
      };
      e.addEventListener(h, $);
      let _ = null, E = null;
      d && h !== "click" && (E = op[h] ?? null, E && (_ = () => P(!0), e.addEventListener(E, _))), l(() => {
        g?.stop(), e.removeEventListener(h, $), E && _ && e.removeEventListener(E, _);
      });
    }
  );
}
function sp(t, e, n, o, i) {
  const r = e.position?.x ?? t.position.x, s = e.position?.y ?? t.position.y, l = t.dimensions?.width ?? ve, a = t.dimensions?.height ?? _e, c = r * n.zoom + n.x, d = s * n.zoom + n.y, f = (r + l) * n.zoom + n.x, u = (s + a) * n.zoom + n.y;
  return f > 0 && c < o && u > 0 && d < i;
}
function rp(t, e, n, o, i) {
  const r = t.nodes;
  if (!r || r.length === 0) return !1;
  for (const s of r) {
    const l = e.getNode?.(s) ?? e.nodes?.find((a) => a.id === s);
    if (l && !sp(l, t, n, o, i))
      return !0;
  }
  return !1;
}
function ap(t) {
  t.directive(
    "flow-timeline",
    (e, { expression: n }, { evaluate: o, effect: i, cleanup: r }) => {
      let s = 0, l = null, a = [], c = !1, d = "idle", f = 0;
      function u() {
        const y = e.closest("[x-data]");
        return y ? t.$data(y) : null;
      }
      function h(y, m) {
        const C = u();
        if (!C?.timeline) return Promise.resolve();
        const T = C.timeline(), b = m.speed ?? 1, M = m.autoFitView === !0, P = m.fitViewPadding ?? 0.1, L = C.viewport, $ = C.getContainerDimensions?.();
        for (const _ of y) {
          const E = b !== 1 ? {
            ..._,
            duration: _.duration !== void 0 ? _.duration / b : void 0,
            delay: _.delay !== void 0 ? _.delay / b : void 0
          } : _;
          if (E.parallel) {
            const v = E.parallel.map(
              (w) => b !== 1 ? {
                ...w,
                duration: w.duration !== void 0 ? w.duration / b : void 0,
                delay: w.delay !== void 0 ? w.delay / b : void 0
              } : w
            );
            T.parallel(v);
          } else if (M && L && $ && rp(E, C, L, $.width, $.height)) {
            const v = {
              fitView: !0,
              fitViewPadding: P,
              duration: E.duration,
              easing: E.easing
            };
            T.parallel([E, v]);
          } else
            T.step(E);
        }
        if (m.lock && T.lock(!0), m.loop !== void 0 && m.loop !== !1) {
          const _ = m.loop === !0 ? 0 : m.loop;
          T.loop(_);
        }
        return m.respectReducedMotion !== void 0 && T.respectReducedMotion(m.respectReducedMotion), l = T, d = "playing", c = !0, T.play().then(() => {
          l === T && (l = null, d = "idle", c = !1);
        });
      }
      async function g(y) {
        if (a.length === 0) return;
        if ((y.overflow ?? "queue") === "latest" && c) {
          l?.stop(), l = null, c = !1, d = "idle";
          const C = [a[a.length - 1]];
          s += a.length, a = [], await h(C, y);
        } else {
          const C = [...a];
          s += C.length, a = [], c && await new Promise((b) => {
            l ? (l.on("complete", () => b()), l.on("stop", () => b())) : b();
          }), await h(C, y);
        }
      }
      const p = {
        async play() {
          const y = o(n), m = y.steps ?? [];
          s < m.length && (a = m.slice(s), await g(y));
        },
        stop() {
          l?.stop(), l = null, c = !1, d = "stopped", a = [];
        },
        reset(y) {
          if (l?.stop(), l = null, c = !1, d = "idle", s = 0, a = [], f = 0, y) {
            const m = o(n), C = m.steps ?? [];
            if (C.length > 0)
              return a = [...C], g(m);
          }
        },
        get state() {
          return d;
        }
      };
      e.__timeline = p, i(() => {
        const y = o(n);
        if (!y || !y.steps) return;
        const m = y.steps, C = y.autoplay !== !1;
        if (m.length > f) {
          const T = m.slice(Math.max(s, f));
          f = m.length, T.length > 0 && C && (a.push(...T), g(y));
        } else
          f = m.length;
      }), r(() => {
        l?.stop(), delete e.__timeline;
      });
    }
  );
}
function lp(t) {
  t.directive(
    "flow-collapse",
    (e, { expression: n, modifiers: o }, { evaluate: i, effect: r, cleanup: s }) => {
      const l = o.includes("all"), a = o.includes("expand"), c = o.includes("children"), d = o.includes("instant"), f = () => {
        const u = e.closest("[data-flow-canvas]");
        if (!u) return;
        const h = t.$data(u);
        if (!h) return;
        if (l) {
          for (const p of h.nodes)
            a ? h.expandNode?.(p.id, { animate: !d }) : h.collapseNode?.(p.id, { animate: !d });
          e.setAttribute("aria-expanded", String(a));
          return;
        }
        if (c && n) {
          const p = i(n);
          if (!p) return;
          for (const y of h.nodes)
            y.parentId === p && (a ? h.expandNode?.(y.id, { animate: !d }) : h.collapseNode?.(y.id, { animate: !d }));
          e.setAttribute("aria-expanded", String(a));
          return;
        }
        const g = i(n);
        !g || !h?.toggleNode || h.toggleNode(g, { animate: !d });
      };
      e.addEventListener("click", f), e.setAttribute("data-flow-collapse", ""), e.style.cursor = "pointer", !l && !c && r(() => {
        const u = i(n);
        if (!u) return;
        const h = e.closest("[data-flow-canvas]");
        if (!h) return;
        const g = t.$data(h);
        if (!g?.isCollapsed) return;
        const p = g.isCollapsed(u);
        e.setAttribute("aria-expanded", String(!p));
        const y = e.closest("[x-flow-node]");
        y && e.setAttribute("aria-controls", y.id || u);
      }), s(() => {
        e.removeEventListener("click", f);
      });
    }
  );
}
function cp(t) {
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
function ko(t) {
  for (; t.firstChild; ) t.removeChild(t.firstChild);
}
function dp(t) {
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
      const d = l(), f = d?.data;
      if (!f) {
        ko(s);
        return;
      }
      const u = typeof f.label == "string" ? f.label : "", h = Array.isArray(f.fields) ? f.fields : [], g = typeof d?.id == "string" ? d.id : "";
      ko(s);
      const p = document.createElement("div");
      p.className = "flow-schema-header", p.textContent = u, s.appendChild(p);
      const y = document.createElement("div");
      y.className = "flow-schema-body";
      for (const m of h)
        y.appendChild(c(m, g));
      s.appendChild(y), t.initTree(y);
    }, c = (d, f) => {
      const u = document.createElement("div");
      u.className = "flow-schema-row", u.dataset.flowSchemaField = d.name, d.key === "primary" && u.classList.add("flow-schema-row--pk"), d.key === "foreign" && u.classList.add("flow-schema-row--fk"), d.required && u.classList.add("flow-schema-row--required"), f && u.setAttribute(
        "x-flow-row-select",
        JSON.stringify(`${f}.${d.name}`)
      );
      const h = document.createElement("div");
      if (h.className = "flow-schema-handle flow-schema-handle--target", h.setAttribute("x-flow-handle:target.left", JSON.stringify(d.name)), u.appendChild(h), d.icon) {
        const T = document.createElement("span");
        T.className = "flow-schema-row-icon", T.textContent = d.icon, u.appendChild(T);
      }
      const g = document.createElement("span");
      g.className = "flow-schema-row-name", g.textContent = d.name, u.appendChild(g);
      const p = document.createElement("span");
      p.className = "flow-schema-row-type", p.textContent = d.type, u.appendChild(p);
      const y = document.createElement("div");
      y.className = "flow-schema-handle flow-schema-handle--source", y.setAttribute("x-flow-handle:source.right", JSON.stringify(d.name)), u.appendChild(y);
      const m = document.createElement("div");
      m.className = "flow-schema-handle flow-schema-handle--target flow-schema-handle--mirror", m.setAttribute("x-flow-handle:target.right", JSON.stringify(d.name)), u.appendChild(m);
      const C = document.createElement("div");
      return C.className = "flow-schema-handle flow-schema-handle--source flow-schema-handle--mirror", C.setAttribute("x-flow-handle:source.left", JSON.stringify(d.name)), u.appendChild(C), u;
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
      ko(s), s.classList.remove("flow-schema-node");
    });
  });
}
function up(t) {
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
function fp(t) {
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
          const g = i(n), p = u.viewport.zoom, y = g.min === void 0 || p >= g.min, m = g.max === void 0 || p <= g.max;
          e.style.display = y && m ? h : "none";
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
const hp = ["perf", "events", "viewport", "state", "activity"], Ss = ["fps", "memory", "counts", "visible"], ks = 30;
function gp(t, e) {
  if (t && typeof t == "object" && Object.keys(t).length > 0)
    return t;
  const n = e.filter((i) => hp.includes(i));
  if (n.length === 0)
    return { perf: !0, events: !0, viewport: !0, state: !0, activity: !0 };
  const o = {};
  for (const i of n)
    o[i] = !0;
  return o;
}
function pp(t) {
  return t.perf ? t.perf === !0 ? [...Ss] : t.perf.filter((e) => Ss.includes(e)) : [];
}
function mp(t) {
  return t.events ? t.events === !0 ? ks : t.events.max ?? ks : 0;
}
function Jt(t, e) {
  const n = document.createElement("div");
  n.className = `flow-devtools-section ${e}`;
  const o = document.createElement("div");
  o.className = "flow-devtools-section-title", o.textContent = t, n.appendChild(o);
  const i = document.createElement("div");
  return i.className = "flow-devtools-section-content", n.appendChild(i), { wrapper: n, content: i };
}
function Fe(t, e) {
  const n = document.createElement("div");
  n.className = `flow-devtools-row ${e}`;
  const o = document.createElement("span");
  o.className = "flow-devtools-label", o.textContent = t;
  const i = document.createElement("span");
  return i.className = "flow-devtools-value", i.textContent = "—", n.appendChild(o), n.appendChild(i), { row: n, valueEl: i };
}
function yp(t) {
  t.directive(
    "flow-devtools",
    (e, { expression: n, modifiers: o }, { evaluate: i, effect: r, cleanup: s }) => {
      let l = null;
      if (n)
        try {
          l = i(n);
        } catch {
        }
      const a = gp(l, o), c = e.closest("[x-data]");
      if (!c) return;
      const d = e.closest(".flow-container");
      if (!d) return;
      e.classList.add("flow-devtools", "canvas-overlay"), e.setAttribute("data-flow-devtools", "");
      const f = (J) => J.stopPropagation();
      e.addEventListener("wheel", f);
      const u = document.createElement("button");
      u.className = "flow-devtools-toggle nopan", u.title = "Devtools";
      const h = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      h.setAttribute("width", "14"), h.setAttribute("height", "14"), h.setAttribute("viewBox", "0 0 24 24"), h.setAttribute("fill", "none"), h.setAttribute("stroke", "currentColor"), h.setAttribute("stroke-width", "2"), h.setAttribute("stroke-linecap", "round"), h.setAttribute("stroke-linejoin", "round");
      const g = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
      g.setAttribute("points", "22 12 18 12 15 21 9 3 6 12 2 12"), h.appendChild(g), u.appendChild(h), e.appendChild(u);
      const p = document.createElement("div");
      p.className = "flow-devtools-panel", p.style.display = "none", p.style.userSelect = "none", e.appendChild(p);
      let y = !1;
      const m = () => {
        y = !y, p.style.display = y ? "" : "none", u.title = y ? "Collapse" : "Devtools", y ? te() : oe();
      };
      u.addEventListener("click", m);
      const C = pp(a);
      let T = null, b = null, M = null, P = null, L = null;
      if (C.length > 0) {
        const { wrapper: J, content: K } = Jt("Performance", "flow-devtools-perf");
        if (C.includes("fps")) {
          const { row: X, valueEl: j } = Fe("FPS", "flow-devtools-fps");
          T = j, K.appendChild(X);
        }
        if (C.includes("memory")) {
          const { row: X, valueEl: j } = Fe("Memory", "flow-devtools-memory");
          b = j, K.appendChild(X);
        }
        if (C.includes("counts")) {
          const X = Fe("Nodes", "flow-devtools-counts");
          M = X.valueEl, K.appendChild(X.row);
          const j = Fe("Edges", "flow-devtools-counts");
          P = j.valueEl, K.appendChild(j.row);
        }
        if (C.includes("visible")) {
          const { row: X, valueEl: j } = Fe("Visible", "flow-devtools-visible");
          L = j, K.appendChild(X);
        }
        p.appendChild(J);
      }
      const $ = mp(a);
      let _ = null;
      if ($ > 0) {
        const { wrapper: J, content: K } = Jt("Events", "flow-devtools-events"), X = document.createElement("button");
        X.className = "flow-devtools-clear-btn nopan", X.textContent = "Clear", X.addEventListener("click", () => {
          _ && (_.textContent = ""), ae.length = 0;
        }), J.querySelector(".flow-devtools-section-title").appendChild(X), _ = document.createElement("div"), _.className = "flow-devtools-event-list", K.appendChild(_), p.appendChild(J);
      }
      let E = null, v = null, w = null;
      if (a.viewport) {
        const { wrapper: J, content: K } = Jt("Viewport", "flow-devtools-viewport"), X = Fe("X", "flow-devtools-vp-x");
        E = X.valueEl, K.appendChild(X.row);
        const j = Fe("Y", "flow-devtools-vp-y");
        v = j.valueEl, K.appendChild(j.row);
        const Q = Fe("Zoom", "flow-devtools-vp-zoom");
        w = Q.valueEl, K.appendChild(Q.row), p.appendChild(J);
      }
      let D = null;
      if (a.state) {
        const { wrapper: J, content: K } = Jt("Selection", "flow-devtools-state");
        D = document.createElement("div"), D.className = "flow-devtools-state-content", D.textContent = "No selection", K.appendChild(D), p.appendChild(J);
      }
      let x = null, N = null, A = null, O = null;
      if (a.activity) {
        const { wrapper: J, content: K } = Jt("Activity", "flow-devtools-activity"), X = Fe("Animations", "flow-devtools-anim");
        x = X.valueEl, K.appendChild(X.row);
        const j = Fe("Particles", "flow-devtools-particles");
        N = j.valueEl, K.appendChild(j.row);
        const Q = Fe("Follow", "flow-devtools-follow");
        A = Q.valueEl, K.appendChild(Q.row);
        const H = Fe("Timelines", "flow-devtools-timelines");
        O = H.valueEl, K.appendChild(H.row), p.appendChild(J);
      }
      let U = null, S = !1, k = 0, R = performance.now();
      const q = !!(T || b), re = () => {
        if (!S) return;
        k++;
        const J = performance.now();
        J - R >= 1e3 && (T && (T.textContent = String(Math.round(k * 1e3 / (J - R)))), k = 0, R = J, b && performance.memory && (b.textContent = Math.round(performance.memory.usedJSHeapSize / 1048576) + " MB")), U = requestAnimationFrame(re);
      }, te = () => {
        !q || S || (S = !0, k = 0, R = performance.now(), U = requestAnimationFrame(re));
      }, oe = () => {
        S = !1, U !== null && (cancelAnimationFrame(U), U = null);
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
      if ($ > 0 && _) {
        le = (J) => {
          const K = J, X = K.type.replace("flow-", "");
          let j = "";
          try {
            j = K.detail ? JSON.stringify(K.detail).slice(0, 80) : "";
          } catch {
            j = "[circular]";
          }
          ae.unshift({ name: X, time: Date.now(), detail: j });
          const Q = _, H = document.createElement("div");
          H.className = "flow-devtools-event-entry";
          const I = document.createElement("span");
          I.className = "flow-devtools-event-name", I.textContent = X;
          const ie = document.createElement("span");
          ie.className = "flow-devtools-event-age", ie.textContent = "now";
          const G = document.createElement("span");
          for (G.className = "flow-devtools-event-detail", G.textContent = j, H.appendChild(I), H.appendChild(ie), H.appendChild(G), Q.prepend(H); Q.children.length > $; )
            Q.removeChild(Q.lastChild), ae.pop();
        };
        for (const J of de)
          d.addEventListener(J, le);
      }
      r(() => {
        const J = t.$data(c);
        if (J) {
          if (M && (M.textContent = String(J.nodes?.length ?? 0)), P && (P.textContent = String(J.edges?.length ?? 0)), L && J._getVisibleNodeIds && (L.textContent = String(J._getVisibleNodeIds().size)), E && J.viewport && (E.textContent = Math.round(J.viewport.x).toString()), v && J.viewport && (v.textContent = Math.round(J.viewport.y).toString()), w && J.viewport && (w.textContent = J.viewport.zoom.toFixed(2)), D) {
            const K = J.selectedNodes, X = J.selectedEdges;
            if (!((K?.size ?? 0) > 0 || (X?.size ?? 0) > 0))
              D.textContent = "No selection";
            else {
              if (D.textContent = "", K && K.size > 0)
                for (const Q of K) {
                  const H = J.getNode?.(Q);
                  if (!H) continue;
                  const I = document.createElement("pre");
                  I.className = "flow-devtools-json", I.textContent = JSON.stringify({ id: H.id, position: H.position, data: H.data }, null, 2), D.appendChild(I);
                }
              if (X && X.size > 0)
                for (const Q of X) {
                  const H = J.edges?.find((ie) => ie.id === Q);
                  if (!H) continue;
                  const I = document.createElement("pre");
                  I.className = "flow-devtools-json", I.textContent = JSON.stringify({ id: H.id, source: H.source, target: H.target, type: H.type }, null, 2), D.appendChild(I);
                }
            }
          }
          if (x) {
            const K = J._animator?._groups?.size ?? 0;
            x.textContent = String(K);
          }
          N && (N.textContent = String(J._activeParticles?.size ?? 0)), A && (A.textContent = J._followHandle ? "Active" : "Idle"), O && (O.textContent = String(J._activeTimelines?.size ?? 0));
        }
      }), s(() => {
        if (oe(), u.removeEventListener("click", m), le)
          for (const J of de)
            d.removeEventListener(J, le);
        e.removeEventListener("wheel", f), e.textContent = "", T = null, b = null, M = null, P = null, L = null, _ = null, E = null, v = null, w = null, D = null, x = null, N = null, A = null, O = null;
      });
    }
  );
}
const wp = {
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
function vp(t) {
  return wp[t] ?? null;
}
function _p(t) {
  t.directive(
    "flow-action",
    (e, { value: n, expression: o }, { evaluate: i, effect: r, cleanup: s }) => {
      const a = vp(n);
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
function bp(t, e) {
  if (t !== "node" && t !== "row") return null;
  const n = e.includes("clear");
  return { type: t, isClear: n };
}
const Po = /* @__PURE__ */ new WeakMap();
function xp(t) {
  t.directive(
    "flow-filter",
    (e, { value: n, expression: o, modifiers: i }, { evaluate: r, effect: s, cleanup: l }) => {
      const a = bp(n, i);
      if (!a) return;
      const c = e.closest("[data-flow-canvas]");
      if (!c) return;
      const d = t.$data(c);
      if (!d) return;
      let f = null;
      const u = () => {
        if (a.isClear) {
          if (a.type === "node")
            d.clearNodeFilter(), Po.set(c, null);
          else
            for (const h of d.nodes)
              h.rowFilter && h.rowFilter !== "all" && d.setRowFilter(h.id, "all");
          return;
        }
        if (a.type === "node" && o)
          f = r(`[${o}]`)[0], d.setNodeFilter(f), Po.set(c, f);
        else if (a.type === "row" && o) {
          const h = r(o);
          d.setRowFilter(h.node, h.predicate);
        }
      };
      e.addEventListener("click", u), e.style.cursor = "pointer", a.type === "node" && !a.isClear && s(() => {
        d.nodes.length;
        const h = Po.get(c) === f && f !== null;
        e.classList.toggle("flow-filter-active", h), e.setAttribute("aria-pressed", String(h));
      }), l(() => {
        e.removeEventListener("click", u);
      });
    }
  );
}
function Ep(t) {
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
function Cp(t) {
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
        const h = i(n), g = Ep(h);
        if (!g) return;
        if (l && d) {
          d.stop(), d = null, f(!1);
          return;
        }
        d && d.stop();
        const p = {};
        g.zoom !== void 0 && (p.zoom = g.zoom), g.speed !== void 0 && (p.speed = g.speed), d = c.follow(g.target, p), f(!0), d?.finished && d.finished.then(() => {
          d = null, f(!1);
        });
      };
      e.addEventListener("click", u), s(() => {
        e.removeEventListener("click", u), d && (d.stop(), d = null);
      });
    }
  );
}
function Sp(t, e) {
  return t !== "save" && t !== "restore" ? null : { action: t, persist: e.includes("persist") };
}
const vi = /* @__PURE__ */ new Map();
function kp(t, e) {
  vi.set(t, e);
}
function Pp(t) {
  return vi.get(t) ?? null;
}
function Lp(t) {
  return vi.has(t);
}
function Lo(t) {
  return `alpineflow-snapshot-${t}`;
}
function Mp(t) {
  t.directive(
    "flow-snapshot",
    (e, { value: n, expression: o, modifiers: i }, { evaluate: r, effect: s, cleanup: l }) => {
      const a = Sp(n, i);
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
            a.persist ? localStorage.setItem(Lo(u), JSON.stringify(h)) : kp(u, h);
          } else {
            let h = null;
            if (a.persist) {
              const g = localStorage.getItem(Lo(u));
              if (g)
                try {
                  h = JSON.parse(g);
                } catch {
                }
            } else
              h = Pp(u);
            h && d.fromObject(h);
          }
      };
      e.addEventListener("click", f), a.action === "restore" && s(() => {
        if (!o) return;
        const u = r(o);
        if (!u) return;
        let h;
        a.persist ? h = localStorage.getItem(Lo(u)) !== null : (d.nodes.length, h = Lp(u)), e.disabled = !h, e.setAttribute("aria-disabled", String(!h));
      }), l(() => {
        e.removeEventListener("click", f);
      });
    }
  );
}
function Tp(t) {
  const e = document.createElement("div");
  e.className = "flow-loading-indicator";
  const n = document.createElement("div");
  n.className = "flow-loading-indicator-node";
  const o = document.createElement("div");
  return o.className = "flow-loading-indicator-text", o.textContent = t ?? "Loading…", e.appendChild(n), e.appendChild(o), e;
}
function Ap(t) {
  t.directive(
    "flow-loading",
    (e, { modifiers: n }, { effect: o, cleanup: i }) => {
      const r = e.closest("[data-flow-canvas]");
      if (!r) return;
      const s = t.$data(r);
      if (!s) return;
      e.classList.add("flow-loading-overlay"), e.childElementCount > 0 || e.textContent.trim().length > 0 || e.appendChild(Tp(s._loadingText));
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
function Np(t) {
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
        const y = i("edge");
        y && t.addScopeToNode(e, { edge: y });
      } catch {
      }
      f.appendChild(e), e.classList.add("flow-edge-toolbar"), e.style.position = "absolute";
      const u = (y) => {
        y.stopPropagation();
      }, h = (y) => {
        y.stopPropagation();
      };
      e.addEventListener("pointerdown", u), e.addEventListener("click", h);
      const g = o.includes("below"), p = 20;
      r(() => {
        if (!d.edges.some((_) => _.id === a)) {
          e.removeEventListener("pointerdown", u), e.removeEventListener("click", h), e.classList.remove("flow-edge-toolbar"), e.remove();
          return;
        }
        const y = d.viewport?.zoom || 1, m = parseInt(e.getAttribute("data-flow-offset") ?? String(p), 10);
        let C = 0.5;
        if (n) {
          const _ = i(n);
          typeof _ == "number" && (C = _);
        }
        const T = l.querySelectorAll("path"), b = T.length > 1 ? T[1] : T[0];
        if (!b) return;
        const M = b.getTotalLength?.();
        if (!M) return;
        const P = b.getPointAtLength(M * Math.max(0, Math.min(1, C))), L = m / y, $ = g ? L : -L;
        e.style.left = `${P.x}px`, e.style.top = `${P.y + $}px`, e.style.transformOrigin = "0 0", e.style.transform = `scale(${1 / y}) translate(-50%, ${g ? "0%" : "-100%"})`;
      }), s(() => {
        e.removeEventListener("pointerdown", u), e.removeEventListener("click", h), e.classList.remove("flow-edge-toolbar"), e.remove();
      });
    }
  );
}
function Ip(t) {
  t.magic("flow", (e) => {
    const n = e.closest("[data-flow-canvas]");
    return n ? t.$data(n) : (console.warn("[alpinejs-flow] $flow used outside of a flowCanvas context"), {});
  });
}
function $p(t) {
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
function qm(t, e, n) {
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
      style: typeof m.style == "string" ? m.style : Object.entries(m.style).map(([C, T]) => `${C}:${T}`).join(";")
    } : {},
    data: m.data ?? {}
  })), f = e.filter((m) => !m.hidden), u = [], h = /* @__PURE__ */ new Map();
  for (const m of f) {
    const C = c.get(m.source), T = c.get(m.target);
    if (!C || !T)
      continue;
    let b, M;
    try {
      const E = to(
        m,
        C,
        T,
        C.sourcePosition ?? "bottom",
        T.targetPosition ?? "top"
      );
      b = E.path, M = E.labelPosition;
    } catch {
      continue;
    }
    let P, L;
    if (m.markerStart) {
      const E = It(m.markerStart), v = $t(E, s);
      h.has(v) || h.set(v, Un(E, v)), P = `url(#${v})`;
    }
    if (m.markerEnd) {
      const E = It(m.markerEnd), v = $t(E, s);
      h.has(v) || h.set(v, Un(E, v)), L = `url(#${v})`;
    }
    let $, _;
    if (m.label)
      if (M)
        $ = M.x, _ = M.y;
      else {
        const E = C.position.x + C.dimensions.width / 2, v = C.position.y + C.dimensions.height / 2, w = T.position.x + T.dimensions.width / 2, D = T.position.y + T.dimensions.height / 2;
        $ = (E + w) / 2, _ = (v + D) / 2;
      }
    u.push({
      id: m.id,
      source: m.source,
      target: m.target,
      pathD: b,
      ...P ? { markerStart: P } : {},
      ...L ? { markerEnd: L } : {},
      ...m.class ? { class: m.class } : {},
      ...m.label ? { label: m.label } : {},
      ...$ !== void 0 ? { labelX: $ } : {},
      ..._ !== void 0 ? { labelY: _ } : {}
    });
  }
  const g = Array.from(h.values()).join(`
`);
  let p, y;
  if (a.length === 0)
    p = { x: 0, y: 0, width: 0, height: 0 }, y = { x: 0, y: 0, zoom: 1 };
  else {
    const m = Vt(a);
    p = {
      x: m.x - r,
      y: m.y - r,
      width: m.width + r * 2,
      height: m.height + r * 2
    }, y = {
      x: -p.x,
      y: -p.y,
      zoom: 1
    };
  }
  return {
    nodes: d,
    edges: u,
    markers: g,
    viewBox: p,
    viewport: y
  };
}
const Ps = /* @__PURE__ */ new WeakSet();
function Xm(t) {
  Ps.has(t) || (Ps.add(t), ca(t), $p(t), pg(t), Pg(t), ff(t), nf(t), of(t), sf(t), dg(t), Ag(t), Dg(t), Rg(t), Fg(t), zg(t), Jg(t), Qg(t), np(t), ip(t), ap(t), lp(t), cp(t), up(t), fp(t), yp(t), _p(t), xp(t), Cp(t), Mp(t), Ap(t), Np(t), dp(t), Ip(t));
}
function Dp(t) {
  return t.replace(/\s+(?:@|:|x-)[\w.:-]*="[^"]*"/g, "").replace(/\s+externalResourcesRequired="[^"]*"/g, "");
}
function Rp(t, e, n, o) {
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
async function Hp(t, e, n, o, i = {}) {
  let r;
  try {
    ({ toSvg: r } = await Promise.resolve().then(() => $m));
  } catch {
    throw new Error("toImage() requires html-to-image. Install it with: npm install html-to-image");
  }
  const s = i.scope ?? "all", l = t.getBoundingClientRect(), a = s === "viewport" ? l.width : i.width ?? 1920, c = s === "viewport" ? l.height : i.height ?? 1080, d = i.background ?? (getComputedStyle(t).getPropertyValue("--flow-bg-color").trim() || "#ffffff"), f = e.style.transform, u = e.style.width, h = e.style.height, g = t.style.width, p = t.style.height, y = t.style.overflow, m = [];
  try {
    if (s === "all") {
      const E = t.querySelectorAll("[data-flow-culled]");
      for (const N of E)
        N.style.display = "", m.push(N);
      const v = n.filter((N) => !N.hidden), w = Vt(v), D = i.padding ?? 0.1, x = Yn(
        w,
        a,
        c,
        0.1,
        // minZoom
        2,
        // maxZoom
        D
      );
      e.style.transform = `translate(${x.x}px, ${x.y}px) scale(${x.zoom})`, e.style.width = `${a}px`, e.style.height = `${c}px`;
    }
    t.style.width = `${a}px`, t.style.height = `${c}px`, t.style.overflow = "hidden", await new Promise((E) => requestAnimationFrame(E));
    const C = i.includeOverlays, T = C === !0, b = typeof C == "object" ? C : {}, M = [
      ["canvas-overlay", T || (b.toolbar ?? !1)],
      ["flow-minimap", T || (b.minimap ?? !1)],
      ["flow-controls", T || (b.controls ?? !1)],
      ["flow-panel", T || (b.panels ?? !1)],
      ["flow-selection-box", !1]
    ], P = await r(t, {
      width: a,
      height: c,
      skipFonts: !0,
      filter: (E) => {
        if (E.classList) {
          for (const [v, w] of M)
            if (E.classList.contains(v) && !w) return !1;
        }
        return !0;
      }
    }), $ = Dp(decodeURIComponent(P.substring("data:image/svg+xml;charset=utf-8,".length))), _ = await Rp($, a, c, d);
    if (i.filename) {
      const E = document.createElement("a");
      E.download = i.filename, E.href = _, E.click();
    }
    return _;
  } finally {
    e.style.transform = f, e.style.width = u, e.style.height = h, t.style.width = g, t.style.height = p, t.style.overflow = y;
    for (const C of m)
      C.style.display = "none";
  }
}
const Fp = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  captureFlowImage: Hp
}, Symbol.toStringTag, { value: "Module" }));
function Op(t, e) {
  if (t.match(/^[a-z]+:\/\//i))
    return t;
  if (t.match(/^\/\//))
    return window.location.protocol + t;
  if (t.match(/^[a-z]+:/i))
    return t;
  const n = document.implementation.createHTMLDocument(), o = n.createElement("base"), i = n.createElement("a");
  return n.head.appendChild(o), n.body.appendChild(i), e && (o.href = e), i.href = t, i.href;
}
const zp = /* @__PURE__ */ (() => {
  let t = 0;
  const e = () => (
    // eslint-disable-next-line no-bitwise
    `0000${(Math.random() * 36 ** 4 << 0).toString(36)}`.slice(-4)
  );
  return () => (t += 1, `u${e()}${t}`);
})();
function ht(t) {
  const e = [];
  for (let n = 0, o = t.length; n < o; n++)
    e.push(t[n]);
  return e;
}
let Pt = null;
function Jr(t = {}) {
  return Pt || (t.includeStyleProperties ? (Pt = t.includeStyleProperties, Pt) : (Pt = ht(window.getComputedStyle(document.documentElement)), Pt));
}
function io(t, e) {
  const o = (t.ownerDocument.defaultView || window).getComputedStyle(t).getPropertyValue(e);
  return o ? parseFloat(o.replace("px", "")) : 0;
}
function Vp(t) {
  const e = io(t, "border-left-width"), n = io(t, "border-right-width");
  return t.clientWidth + e + n;
}
function Bp(t) {
  const e = io(t, "border-top-width"), n = io(t, "border-bottom-width");
  return t.clientHeight + e + n;
}
function _i(t, e = {}) {
  const n = e.width || Vp(t), o = e.height || Bp(t);
  return { width: n, height: o };
}
function qp() {
  let t, e;
  try {
    e = process;
  } catch {
  }
  const n = e && e.env ? e.env.devicePixelRatio : null;
  return n && (t = parseInt(n, 10), Number.isNaN(t) && (t = 1)), t || window.devicePixelRatio || 1;
}
const Ie = 16384;
function Xp(t) {
  (t.width > Ie || t.height > Ie) && (t.width > Ie && t.height > Ie ? t.width > t.height ? (t.height *= Ie / t.width, t.width = Ie) : (t.width *= Ie / t.height, t.height = Ie) : t.width > Ie ? (t.height *= Ie / t.width, t.width = Ie) : (t.width *= Ie / t.height, t.height = Ie));
}
function Yp(t, e = {}) {
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
function so(t) {
  return new Promise((e, n) => {
    const o = new Image();
    o.onload = () => {
      o.decode().then(() => {
        requestAnimationFrame(() => e(o));
      });
    }, o.onerror = n, o.crossOrigin = "anonymous", o.decoding = "async", o.src = t;
  });
}
async function Wp(t) {
  return Promise.resolve().then(() => new XMLSerializer().serializeToString(t)).then(encodeURIComponent).then((e) => `data:image/svg+xml;charset=utf-8,${e}`);
}
async function jp(t, e, n) {
  const o = "http://www.w3.org/2000/svg", i = document.createElementNS(o, "svg"), r = document.createElementNS(o, "foreignObject");
  return i.setAttribute("width", `${e}`), i.setAttribute("height", `${n}`), i.setAttribute("viewBox", `0 0 ${e} ${n}`), r.setAttribute("width", "100%"), r.setAttribute("height", "100%"), r.setAttribute("x", "0"), r.setAttribute("y", "0"), r.setAttribute("externalResourcesRequired", "true"), i.appendChild(r), r.appendChild(t), Wp(i);
}
const Ae = (t, e) => {
  if (t instanceof e)
    return !0;
  const n = Object.getPrototypeOf(t);
  return n === null ? !1 : n.constructor.name === e.name || Ae(n, e);
};
function Up(t) {
  const e = t.getPropertyValue("content");
  return `${t.cssText} content: '${e.replace(/'|"/g, "")}';`;
}
function Zp(t, e) {
  return Jr(e).map((n) => {
    const o = t.getPropertyValue(n), i = t.getPropertyPriority(n);
    return `${n}: ${o}${i ? " !important" : ""};`;
  }).join(" ");
}
function Kp(t, e, n, o) {
  const i = `.${t}:${e}`, r = n.cssText ? Up(n) : Zp(n, o);
  return document.createTextNode(`${i}{${r}}`);
}
function Ls(t, e, n, o) {
  const i = window.getComputedStyle(t, n), r = i.getPropertyValue("content");
  if (r === "" || r === "none")
    return;
  const s = zp();
  try {
    e.className = `${e.className} ${s}`;
  } catch {
    return;
  }
  const l = document.createElement("style");
  l.appendChild(Kp(s, n, i, o)), e.appendChild(l);
}
function Gp(t, e, n) {
  Ls(t, e, ":before", n), Ls(t, e, ":after", n);
}
const Ms = "application/font-woff", Ts = "image/jpeg", Jp = {
  woff: Ms,
  woff2: Ms,
  ttf: "application/font-truetype",
  eot: "application/vnd.ms-fontobject",
  png: "image/png",
  jpg: Ts,
  jpeg: Ts,
  gif: "image/gif",
  tiff: "image/tiff",
  svg: "image/svg+xml",
  webp: "image/webp"
};
function Qp(t) {
  const e = /\.([^./]*?)$/g.exec(t);
  return e ? e[1] : "";
}
function bi(t) {
  const e = Qp(t).toLowerCase();
  return Jp[e] || "";
}
function em(t) {
  return t.split(/,/)[1];
}
function Jo(t) {
  return t.search(/^(data:)/) !== -1;
}
function tm(t, e) {
  return `data:${e};base64,${t}`;
}
async function Qr(t, e, n) {
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
const Mo = {};
function nm(t, e, n) {
  let o = t.replace(/\?.*/, "");
  return n && (o = t), /ttf|otf|eot|woff2?/i.test(o) && (o = o.replace(/.*\//, "")), e ? `[${e}]${o}` : o;
}
async function xi(t, e, n) {
  const o = nm(t, e, n.includeQueryParams);
  if (Mo[o] != null)
    return Mo[o];
  n.cacheBust && (t += (/\?/.test(t) ? "&" : "?") + (/* @__PURE__ */ new Date()).getTime());
  let i;
  try {
    const r = await Qr(t, n.fetchRequestInit, ({ res: s, result: l }) => (e || (e = s.headers.get("Content-Type") || ""), em(l)));
    i = tm(r, e);
  } catch (r) {
    i = n.imagePlaceholder || "";
    let s = `Failed to fetch resource: ${t}`;
    r && (s = typeof r == "string" ? r : r.message), s && console.warn(s);
  }
  return Mo[o] = i, i;
}
async function om(t) {
  const e = t.toDataURL();
  return e === "data:," ? t.cloneNode(!1) : so(e);
}
async function im(t, e) {
  if (t.currentSrc) {
    const r = document.createElement("canvas"), s = r.getContext("2d");
    r.width = t.clientWidth, r.height = t.clientHeight, s?.drawImage(t, 0, 0, r.width, r.height);
    const l = r.toDataURL();
    return so(l);
  }
  const n = t.poster, o = bi(n), i = await xi(n, o, e);
  return so(i);
}
async function sm(t, e) {
  var n;
  try {
    if (!((n = t?.contentDocument) === null || n === void 0) && n.body)
      return await fo(t.contentDocument.body, e, !0);
  } catch {
  }
  return t.cloneNode(!1);
}
async function rm(t, e) {
  return Ae(t, HTMLCanvasElement) ? om(t) : Ae(t, HTMLVideoElement) ? im(t, e) : Ae(t, HTMLIFrameElement) ? sm(t, e) : t.cloneNode(ea(t));
}
const am = (t) => t.tagName != null && t.tagName.toUpperCase() === "SLOT", ea = (t) => t.tagName != null && t.tagName.toUpperCase() === "SVG";
async function lm(t, e, n) {
  var o, i;
  if (ea(e))
    return e;
  let r = [];
  return am(t) && t.assignedNodes ? r = ht(t.assignedNodes()) : Ae(t, HTMLIFrameElement) && (!((o = t.contentDocument) === null || o === void 0) && o.body) ? r = ht(t.contentDocument.body.childNodes) : r = ht(((i = t.shadowRoot) !== null && i !== void 0 ? i : t).childNodes), r.length === 0 || Ae(t, HTMLVideoElement) || await r.reduce((s, l) => s.then(() => fo(l, n)).then((a) => {
    a && e.appendChild(a);
  }), Promise.resolve()), e;
}
function cm(t, e, n) {
  const o = e.style;
  if (!o)
    return;
  const i = window.getComputedStyle(t);
  i.cssText ? (o.cssText = i.cssText, o.transformOrigin = i.transformOrigin) : Jr(n).forEach((r) => {
    let s = i.getPropertyValue(r);
    r === "font-size" && s.endsWith("px") && (s = `${Math.floor(parseFloat(s.substring(0, s.length - 2))) - 0.1}px`), Ae(t, HTMLIFrameElement) && r === "display" && s === "inline" && (s = "block"), r === "d" && e.getAttribute("d") && (s = `path(${e.getAttribute("d")})`), o.setProperty(r, s, i.getPropertyPriority(r));
  });
}
function dm(t, e) {
  Ae(t, HTMLTextAreaElement) && (e.innerHTML = t.value), Ae(t, HTMLInputElement) && e.setAttribute("value", t.value);
}
function um(t, e) {
  if (Ae(t, HTMLSelectElement)) {
    const o = Array.from(e.children).find((i) => t.value === i.getAttribute("value"));
    o && o.setAttribute("selected", "");
  }
}
function fm(t, e, n) {
  return Ae(e, Element) && (cm(t, e, n), Gp(t, e, n), dm(t, e), um(t, e)), e;
}
async function hm(t, e) {
  const n = t.querySelectorAll ? t.querySelectorAll("use") : [];
  if (n.length === 0)
    return t;
  const o = {};
  for (let r = 0; r < n.length; r++) {
    const l = n[r].getAttribute("xlink:href");
    if (l) {
      const a = t.querySelector(l), c = document.querySelector(l);
      !a && c && !o[l] && (o[l] = await fo(c, e, !0));
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
async function fo(t, e, n) {
  return !n && e.filter && !e.filter(t) ? null : Promise.resolve(t).then((o) => rm(o, e)).then((o) => lm(t, o, e)).then((o) => fm(t, o, e)).then((o) => hm(o, e));
}
const ta = /url\((['"]?)([^'"]+?)\1\)/g, gm = /url\([^)]+\)\s*format\((["']?)([^"']+)\1\)/g, pm = /src:\s*(?:url\([^)]+\)\s*format\([^)]+\)[,;]\s*)+/g;
function mm(t) {
  const e = t.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1");
  return new RegExp(`(url\\(['"]?)(${e})(['"]?\\))`, "g");
}
function ym(t) {
  const e = [];
  return t.replace(ta, (n, o, i) => (e.push(i), n)), e.filter((n) => !Jo(n));
}
async function wm(t, e, n, o, i) {
  try {
    const r = n ? Op(e, n) : e, s = bi(e);
    let l;
    return i || (l = await xi(r, s, o)), t.replace(mm(e), `$1${l}$3`);
  } catch {
  }
  return t;
}
function vm(t, { preferredFontFormat: e }) {
  return e ? t.replace(pm, (n) => {
    for (; ; ) {
      const [o, , i] = gm.exec(n) || [];
      if (!i)
        return "";
      if (i === e)
        return `src: ${o};`;
    }
  }) : t;
}
function na(t) {
  return t.search(ta) !== -1;
}
async function oa(t, e, n) {
  if (!na(t))
    return t;
  const o = vm(t, n);
  return ym(o).reduce((r, s) => r.then((l) => wm(l, s, e, n)), Promise.resolve(o));
}
async function Lt(t, e, n) {
  var o;
  const i = (o = e.style) === null || o === void 0 ? void 0 : o.getPropertyValue(t);
  if (i) {
    const r = await oa(i, null, n);
    return e.style.setProperty(t, r, e.style.getPropertyPriority(t)), !0;
  }
  return !1;
}
async function _m(t, e) {
  await Lt("background", t, e) || await Lt("background-image", t, e), await Lt("mask", t, e) || await Lt("-webkit-mask", t, e) || await Lt("mask-image", t, e) || await Lt("-webkit-mask-image", t, e);
}
async function bm(t, e) {
  const n = Ae(t, HTMLImageElement);
  if (!(n && !Jo(t.src)) && !(Ae(t, SVGImageElement) && !Jo(t.href.baseVal)))
    return;
  const o = n ? t.src : t.href.baseVal, i = await xi(o, bi(o), e);
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
async function xm(t, e) {
  const o = ht(t.childNodes).map((i) => ia(i, e));
  await Promise.all(o).then(() => t);
}
async function ia(t, e) {
  Ae(t, Element) && (await _m(t, e), await bm(t, e), await xm(t, e));
}
function Em(t, e) {
  const { style: n } = t;
  e.backgroundColor && (n.backgroundColor = e.backgroundColor), e.width && (n.width = `${e.width}px`), e.height && (n.height = `${e.height}px`);
  const o = e.style;
  return o != null && Object.keys(o).forEach((i) => {
    n[i] = o[i];
  }), t;
}
const As = {};
async function Ns(t) {
  let e = As[t];
  if (e != null)
    return e;
  const o = await (await fetch(t)).text();
  return e = { url: t, cssText: o }, As[t] = e, e;
}
async function Is(t, e) {
  let n = t.cssText;
  const o = /url\(["']?([^"')]+)["']?\)/g, r = (n.match(/url\([^)]+\)/g) || []).map(async (s) => {
    let l = s.replace(o, "$1");
    return l.startsWith("https://") || (l = new URL(l, t.url).href), Qr(l, e.fetchRequestInit, ({ result: a }) => (n = n.replace(s, `url(${a})`), [s, a]));
  });
  return Promise.all(r).then(() => n);
}
function $s(t) {
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
async function Cm(t, e) {
  const n = [], o = [];
  return t.forEach((i) => {
    if ("cssRules" in i)
      try {
        ht(i.cssRules || []).forEach((r, s) => {
          if (r.type === CSSRule.IMPORT_RULE) {
            let l = s + 1;
            const a = r.href, c = Ns(a).then((d) => Is(d, e)).then((d) => $s(d).forEach((f) => {
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
        i.href != null && o.push(Ns(i.href).then((l) => Is(l, e)).then((l) => $s(l).forEach((a) => {
          s.insertRule(a, s.cssRules.length);
        })).catch((l) => {
          console.error("Error loading remote stylesheet", l);
        })), console.error("Error inlining remote css file", r);
      }
  }), Promise.all(o).then(() => (t.forEach((i) => {
    if ("cssRules" in i)
      try {
        ht(i.cssRules || []).forEach((r) => {
          n.push(r);
        });
      } catch (r) {
        console.error(`Error while reading CSS rules from ${i.href}`, r);
      }
  }), n));
}
function Sm(t) {
  return t.filter((e) => e.type === CSSRule.FONT_FACE_RULE).filter((e) => na(e.style.getPropertyValue("src")));
}
async function km(t, e) {
  if (t.ownerDocument == null)
    throw new Error("Provided element is not within a Document");
  const n = ht(t.ownerDocument.styleSheets), o = await Cm(n, e);
  return Sm(o);
}
function sa(t) {
  return t.trim().replace(/["']/g, "");
}
function Pm(t) {
  const e = /* @__PURE__ */ new Set();
  function n(o) {
    (o.style.fontFamily || getComputedStyle(o).fontFamily).split(",").forEach((r) => {
      e.add(sa(r));
    }), Array.from(o.children).forEach((r) => {
      r instanceof HTMLElement && n(r);
    });
  }
  return n(t), e;
}
async function ra(t, e) {
  const n = await km(t, e), o = Pm(t);
  return (await Promise.all(n.filter((r) => o.has(sa(r.style.fontFamily))).map((r) => {
    const s = r.parentStyleSheet ? r.parentStyleSheet.href : null;
    return oa(r.cssText, s, e);
  }))).join(`
`);
}
async function Lm(t, e) {
  const n = e.fontEmbedCSS != null ? e.fontEmbedCSS : e.skipFonts ? null : await ra(t, e);
  if (n) {
    const o = document.createElement("style"), i = document.createTextNode(n);
    o.appendChild(i), t.firstChild ? t.insertBefore(o, t.firstChild) : t.appendChild(o);
  }
}
async function aa(t, e = {}) {
  const { width: n, height: o } = _i(t, e), i = await fo(t, e, !0);
  return await Lm(i, e), await ia(i, e), Em(i, e), await jp(i, n, o);
}
async function vn(t, e = {}) {
  const { width: n, height: o } = _i(t, e), i = await aa(t, e), r = await so(i), s = document.createElement("canvas"), l = s.getContext("2d"), a = e.pixelRatio || qp(), c = e.canvasWidth || n, d = e.canvasHeight || o;
  return s.width = c * a, s.height = d * a, e.skipAutoScale || Xp(s), s.style.width = `${c}`, s.style.height = `${d}`, e.backgroundColor && (l.fillStyle = e.backgroundColor, l.fillRect(0, 0, s.width, s.height)), l.drawImage(r, 0, 0, s.width, s.height), s;
}
async function Mm(t, e = {}) {
  const { width: n, height: o } = _i(t, e);
  return (await vn(t, e)).getContext("2d").getImageData(0, 0, n, o).data;
}
async function Tm(t, e = {}) {
  return (await vn(t, e)).toDataURL();
}
async function Am(t, e = {}) {
  return (await vn(t, e)).toDataURL("image/jpeg", e.quality || 1);
}
async function Nm(t, e = {}) {
  const n = await vn(t, e);
  return await Yp(n);
}
async function Im(t, e = {}) {
  return ra(t, e);
}
const $m = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getFontEmbedCSS: Im,
  toBlob: Nm,
  toCanvas: vn,
  toJpeg: Am,
  toPixelData: Mm,
  toPng: Tm,
  toSvg: aa
}, Symbol.toStringTag, { value: "Module" }));
export {
  Pf as ComputeEngine,
  ku as FlowHistory,
  is as SHORTCUT_DEFAULTS,
  Fm as along,
  ef as areNodesConnected,
  Lr as buildNodeMap,
  Tr as clampToExtent,
  vo as clampToParent,
  qm as computeRenderPlan,
  ls as computeValidationErrors,
  Mr as computeZIndex,
  Xm as default,
  zm as drift,
  pf as expandParentToFitChild,
  Yo as getAbsolutePosition,
  df as getAutoPanDelta,
  Zn as getBezierPath,
  Gu as getConnectedEdges,
  ut as getDescendantIds,
  _s as getEdgePosition,
  Yr as getFloatingEdgeParams,
  Ju as getIncomers,
  vs as getNodeIntersection,
  Vt as getNodesBounds,
  Ku as getNodesFullyInPolygon,
  bu as getNodesFullyInRect,
  Zu as getNodesInPolygon,
  _u as getNodesInRect,
  qo as getOutgoers,
  Dm as getSimpleBezierPath,
  Bm as getSimpleFloatingPosition,
  gn as getSmoothStepPath,
  cf as getStepPath,
  Sr as getStraightPath,
  Yn as getViewportForBounds,
  Oe as isConnectable,
  rf as isDeletable,
  Cr as isDraggable,
  ns as isResizable,
  Xo as isSelectable,
  qe as matchesKey,
  dt as matchesModifier,
  Rm as orbit,
  Om as pendulum,
  fi as pointInPolygon,
  Uu as polygonIntersectsAABB,
  Du as registerMarker,
  rn as resolveChildValidation,
  hf as resolveShortcuts,
  ft as sortNodesTopological,
  Vm as stagger,
  Ht as toAbsoluteNode,
  Qn as toAbsoluteNodes,
  $r as validateChildAdd,
  eo as validateChildRemove,
  Hm as wave
};
//# sourceMappingURL=alpineflow.bundle.esm.js.map
