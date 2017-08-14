(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function (e, undefined) {
    var t,
        n,
        r = typeof undefined === "undefined" ? "undefined" : _typeof(undefined),
        i = e.location,
        o = e.document,
        s = o.documentElement,
        a = e.jQuery,
        u = e.$,
        l = {},
        c = [],
        p = "2.0.3",
        f = c.concat,
        h = c.push,
        d = c.slice,
        g = c.indexOf,
        m = l.toString,
        y = l.hasOwnProperty,
        v = p.trim,
        x = function x(e, n) {
        return new x.fn.init(e, n, t);
    },
        b = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        w = /\S+/g,
        T = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
        C = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        k = /^-ms-/,
        N = /-([\da-z])/gi,
        E = function E(e, t) {
        return t.toUpperCase();
    },
        S = function S() {
        o.removeEventListener("DOMContentLoaded", S, !1), e.removeEventListener("load", S, !1), x.ready();
    };
    x.fn = x.prototype = {
        jquery: p,
        constructor: x,
        init: function init(e, t, n) {
            var r, i;
            if (!e) return this;
            if ("string" == typeof e) {
                if (r = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && e.length >= 3 ? [null, e, null] : T.exec(e), !r || !r[1] && t) return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
                if (r[1]) {
                    if (t = t instanceof x ? t[0] : t, x.merge(this, x.parseHTML(r[1], t && t.nodeType ? t.ownerDocument || t : o, !0)), C.test(r[1]) && x.isPlainObject(t)) for (r in t) {
                        x.isFunction(this[r]) ? this[r](t[r]) : this.attr(r, t[r]);
                    }return this;
                }
                return i = o.getElementById(r[2]), i && i.parentNode && (this.length = 1, this[0] = i), this.context = o, this.selector = e, this;
            }
            return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : x.isFunction(e) ? n.ready(e) : (e.selector !== undefined && (this.selector = e.selector, this.context = e.context), x.makeArray(e, this));
        },
        selector: "",
        length: 0,
        toArray: function toArray() {
            return d.call(this);
        },
        get: function get(e) {
            return null == e ? this.toArray() : 0 > e ? this[this.length + e] : this[e];
        },
        pushStack: function pushStack(e) {
            var t = x.merge(this.constructor(), e);
            return t.prevObject = this, t.context = this.context, t;
        },
        each: function each(e, t) {
            return x.each(this, e, t);
        },
        ready: function ready(e) {
            return x.ready.promise().done(e), this;
        },
        slice: function slice() {
            return this.pushStack(d.apply(this, arguments));
        },
        first: function first() {
            return this.eq(0);
        },
        last: function last() {
            return this.eq(-1);
        },
        eq: function eq(e) {
            var t = this.length,
                n = +e + (0 > e ? t : 0);
            return this.pushStack(n >= 0 && t > n ? [this[n]] : []);
        },
        map: function map(e) {
            return this.pushStack(x.map(this, function (t, n) {
                return e.call(t, n, t);
            }));
        },
        end: function end() {
            return this.prevObject || this.constructor(null);
        },
        push: h,
        sort: [].sort,
        splice: [].splice
    }, x.fn.init.prototype = x.fn, x.extend = x.fn.extend = function () {
        var e,
            t,
            n,
            r,
            i,
            o,
            s = arguments[0] || {},
            a = 1,
            u = arguments.length,
            l = !1;
        for ("boolean" == typeof s && (l = s, s = arguments[1] || {}, a = 2), "object" == (typeof s === "undefined" ? "undefined" : _typeof(s)) || x.isFunction(s) || (s = {}), u === a && (s = this, --a); u > a; a++) {
            if (null != (e = arguments[a])) for (t in e) {
                n = s[t], r = e[t], s !== r && (l && r && (x.isPlainObject(r) || (i = x.isArray(r))) ? (i ? (i = !1, o = n && x.isArray(n) ? n : []) : o = n && x.isPlainObject(n) ? n : {}, s[t] = x.extend(l, o, r)) : r !== undefined && (s[t] = r));
            }
        }return s;
    }, x.extend({
        expando: "jQuery" + (p + Math.random()).replace(/\D/g, ""),
        noConflict: function noConflict(t) {
            return e.$ === x && (e.$ = u), t && e.jQuery === x && (e.jQuery = a), x;
        },
        isReady: !1,
        readyWait: 1,
        holdReady: function holdReady(e) {
            e ? x.readyWait++ : x.ready(!0);
        },
        ready: function ready(e) {
            (e === !0 ? --x.readyWait : x.isReady) || (x.isReady = !0, e !== !0 && --x.readyWait > 0 || (n.resolveWith(o, [x]), x.fn.trigger && x(o).trigger("ready").off("ready")));
        },
        isFunction: function isFunction(e) {
            return "function" === x.type(e);
        },
        isArray: Array.isArray,
        isWindow: function isWindow(e) {
            return null != e && e === e.window;
        },
        isNumeric: function isNumeric(e) {
            return !isNaN(parseFloat(e)) && isFinite(e);
        },
        type: function type(e) {
            return null == e ? e + "" : "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) || "function" == typeof e ? l[m.call(e)] || "object" : typeof e === "undefined" ? "undefined" : _typeof(e);
        },
        isPlainObject: function isPlainObject(e) {
            if ("object" !== x.type(e) || e.nodeType || x.isWindow(e)) return !1;
            try {
                if (e.constructor && !y.call(e.constructor.prototype, "isPrototypeOf")) return !1;
            } catch (t) {
                return !1;
            }
            return !0;
        },
        isEmptyObject: function isEmptyObject(e) {
            var t;
            for (t in e) {
                return !1;
            }return !0;
        },
        error: function error(e) {
            throw Error(e);
        },
        parseHTML: function parseHTML(e, t, n) {
            if (!e || "string" != typeof e) return null;
            "boolean" == typeof t && (n = t, t = !1), t = t || o;
            var r = C.exec(e),
                i = !n && [];
            return r ? [t.createElement(r[1])] : (r = x.buildFragment([e], t, i), i && x(i).remove(), x.merge([], r.childNodes));
        },
        parseJSON: JSON.parse,
        parseXML: function parseXML(e) {
            var t, n;
            if (!e || "string" != typeof e) return null;
            try {
                n = new DOMParser(), t = n.parseFromString(e, "text/xml");
            } catch (r) {
                t = undefined;
            }
            return (!t || t.getElementsByTagName("parsererror").length) && x.error("Invalid XML: " + e), t;
        },
        noop: function noop() {},
        globalEval: function globalEval(e) {
            var t,
                n = eval;
            e = x.trim(e), e && (1 === e.indexOf("use strict") ? (t = o.createElement("script"), t.text = e, o.head.appendChild(t).parentNode.removeChild(t)) : n(e));
        },
        camelCase: function camelCase(e) {
            return e.replace(k, "ms-").replace(N, E);
        },
        nodeName: function nodeName(e, t) {
            return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase();
        },
        each: function each(e, t, n) {
            var r,
                i = 0,
                o = e.length,
                s = j(e);
            if (n) {
                if (s) {
                    for (; o > i; i++) {
                        if (r = t.apply(e[i], n), r === !1) break;
                    }
                } else for (i in e) {
                    if (r = t.apply(e[i], n), r === !1) break;
                }
            } else if (s) {
                for (; o > i; i++) {
                    if (r = t.call(e[i], i, e[i]), r === !1) break;
                }
            } else for (i in e) {
                if (r = t.call(e[i], i, e[i]), r === !1) break;
            }return e;
        },
        trim: function trim(e) {
            return null == e ? "" : v.call(e);
        },
        makeArray: function makeArray(e, t) {
            var n = t || [];
            return null != e && (j(Object(e)) ? x.merge(n, "string" == typeof e ? [e] : e) : h.call(n, e)), n;
        },
        inArray: function inArray(e, t, n) {
            return null == t ? -1 : g.call(t, e, n);
        },
        merge: function merge(e, t) {
            var n = t.length,
                r = e.length,
                i = 0;
            if ("number" == typeof n) for (; n > i; i++) {
                e[r++] = t[i];
            } else while (t[i] !== undefined) {
                e[r++] = t[i++];
            }return e.length = r, e;
        },
        grep: function grep(e, t, n) {
            var r,
                i = [],
                o = 0,
                s = e.length;
            for (n = !!n; s > o; o++) {
                r = !!t(e[o], o), n !== r && i.push(e[o]);
            }return i;
        },
        map: function map(e, t, n) {
            var r,
                i = 0,
                o = e.length,
                s = j(e),
                a = [];
            if (s) for (; o > i; i++) {
                r = t(e[i], i, n), null != r && (a[a.length] = r);
            } else for (i in e) {
                r = t(e[i], i, n), null != r && (a[a.length] = r);
            }return f.apply([], a);
        },
        guid: 1,
        proxy: function proxy(e, t) {
            var n, r, i;
            return "string" == typeof t && (n = e[t], t = e, e = n), x.isFunction(e) ? (r = d.call(arguments, 2), i = function i() {
                return e.apply(t || this, r.concat(d.call(arguments)));
            }, i.guid = e.guid = e.guid || x.guid++, i) : undefined;
        },
        access: function access(e, t, n, r, i, o, s) {
            var a = 0,
                u = e.length,
                l = null == n;
            if ("object" === x.type(n)) {
                i = !0;
                for (a in n) {
                    x.access(e, t, a, n[a], !0, o, s);
                }
            } else if (r !== undefined && (i = !0, x.isFunction(r) || (s = !0), l && (s ? (t.call(e, r), t = null) : (l = t, t = function t(e, _t2, n) {
                return l.call(x(e), n);
            })), t)) for (; u > a; a++) {
                t(e[a], n, s ? r : r.call(e[a], a, t(e[a], n)));
            }return i ? e : l ? t.call(e) : u ? t(e[0], n) : o;
        },
        now: Date.now,
        swap: function swap(e, t, n, r) {
            var i,
                o,
                s = {};
            for (o in t) {
                s[o] = e.style[o], e.style[o] = t[o];
            }i = n.apply(e, r || []);
            for (o in t) {
                e.style[o] = s[o];
            }return i;
        }
    }), x.ready.promise = function (t) {
        return n || (n = x.Deferred(), "complete" === o.readyState ? setTimeout(x.ready) : (o.addEventListener("DOMContentLoaded", S, !1), e.addEventListener("load", S, !1))), n.promise(t);
    }, x.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (e, t) {
        l["[object " + t + "]"] = t.toLowerCase();
    });
    function j(e) {
        var t = e.length,
            n = x.type(e);
        return x.isWindow(e) ? !1 : 1 === e.nodeType && t ? !0 : "array" === n || "function" !== n && (0 === t || "number" == typeof t && t > 0 && t - 1 in e);
    }
    t = x(o), function (e, undefined) {
        var t,
            n,
            r,
            i,
            o,
            s,
            a,
            u,
            l,
            c,
            p,
            f,
            h,
            d,
            g,
            m,
            y,
            v = "sizzle" + -new Date(),
            b = e.document,
            w = 0,
            T = 0,
            C = st(),
            k = st(),
            N = st(),
            E = !1,
            S = function S(e, t) {
            return e === t ? (E = !0, 0) : 0;
        },
            j = typeof undefined === "undefined" ? "undefined" : _typeof(undefined),
            D = 1 << 31,
            A = {}.hasOwnProperty,
            L = [],
            q = L.pop,
            H = L.push,
            O = L.push,
            F = L.slice,
            P = L.indexOf || function (e) {
            var t = 0,
                n = this.length;
            for (; n > t; t++) {
                if (this[t] === e) return t;
            }return -1;
        },
            R = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            M = "[\\x20\\t\\r\\n\\f]",
            W = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
            $ = W.replace("w", "w#"),
            B = "\\[" + M + "*(" + W + ")" + M + "*(?:([*^$|!~]?=)" + M + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + $ + ")|)|)" + M + "*\\]",
            I = ":(" + W + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + B.replace(3, 8) + ")*)|.*)\\)|)",
            z = RegExp("^" + M + "+|((?:^|[^\\\\])(?:\\\\.)*)" + M + "+$", "g"),
            _ = RegExp("^" + M + "*," + M + "*"),
            X = RegExp("^" + M + "*([>+~]|" + M + ")" + M + "*"),
            U = RegExp(M + "*[+~]"),
            Y = RegExp("=" + M + "*([^\\]'\"]*)" + M + "*\\]", "g"),
            V = RegExp(I),
            G = RegExp("^" + $ + "$"),
            J = {
            ID: RegExp("^#(" + W + ")"),
            CLASS: RegExp("^\\.(" + W + ")"),
            TAG: RegExp("^(" + W.replace("w", "w*") + ")"),
            ATTR: RegExp("^" + B),
            PSEUDO: RegExp("^" + I),
            CHILD: RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + M + "*(even|odd|(([+-]|)(\\d*)n|)" + M + "*(?:([+-]|)" + M + "*(\\d+)|))" + M + "*\\)|)", "i"),
            bool: RegExp("^(?:" + R + ")$", "i"),
            needsContext: RegExp("^" + M + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + M + "*((?:-\\d)?\\d*)" + M + "*\\)|)(?=[^-]|$)", "i")
        },
            Q = /^[^{]+\{\s*\[native \w/,
            K = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            Z = /^(?:input|select|textarea|button)$/i,
            et = /^h\d$/i,
            tt = /'|\\/g,
            nt = RegExp("\\\\([\\da-f]{1,6}" + M + "?|(" + M + ")|.)", "ig"),
            rt = function rt(e, t, n) {
            var r = "0x" + t - 65536;
            return r !== r || n ? t : 0 > r ? String.fromCharCode(r + 65536) : String.fromCharCode(55296 | r >> 10, 56320 | 1023 & r);
        };
        try {
            O.apply(L = F.call(b.childNodes), b.childNodes), L[b.childNodes.length].nodeType;
        } catch (it) {
            O = {
                apply: L.length ? function (e, t) {
                    H.apply(e, F.call(t));
                } : function (e, t) {
                    var n = e.length,
                        r = 0;
                    while (e[n++] = t[r++]) {}
                    e.length = n - 1;
                }
            };
        }
        function ot(e, t, r, i) {
            var o, s, a, u, l, f, g, m, x, w;
            if ((t ? t.ownerDocument || t : b) !== p && c(t), t = t || p, r = r || [], !e || "string" != typeof e) return r;
            if (1 !== (u = t.nodeType) && 9 !== u) return [];
            if (h && !i) {
                if (o = K.exec(e)) if (a = o[1]) {
                    if (9 === u) {
                        if (s = t.getElementById(a), !s || !s.parentNode) return r;
                        if (s.id === a) return r.push(s), r;
                    } else if (t.ownerDocument && (s = t.ownerDocument.getElementById(a)) && y(t, s) && s.id === a) return r.push(s), r;
                } else {
                    if (o[2]) return O.apply(r, t.getElementsByTagName(e)), r;
                    if ((a = o[3]) && n.getElementsByClassName && t.getElementsByClassName) return O.apply(r, t.getElementsByClassName(a)), r;
                }
                if (n.qsa && (!d || !d.test(e))) {
                    if (m = g = v, x = t, w = 9 === u && e, 1 === u && "object" !== t.nodeName.toLowerCase()) {
                        f = gt(e), (g = t.getAttribute("id")) ? m = g.replace(tt, "\\$&") : t.setAttribute("id", m), m = "[id='" + m + "'] ", l = f.length;
                        while (l--) {
                            f[l] = m + mt(f[l]);
                        }x = U.test(e) && t.parentNode || t, w = f.join(",");
                    }
                    if (w) try {
                        return O.apply(r, x.querySelectorAll(w)), r;
                    } catch (T) {} finally {
                        g || t.removeAttribute("id");
                    }
                }
            }
            return kt(e.replace(z, "$1"), t, r, i);
        }
        function st() {
            var e = [];
            function t(n, r) {
                return e.push(n += " ") > i.cacheLength && delete t[e.shift()], t[n] = r;
            }
            return t;
        }
        function at(e) {
            return e[v] = !0, e;
        }
        function ut(e) {
            var t = p.createElement("div");
            try {
                return !!e(t);
            } catch (n) {
                return !1;
            } finally {
                t.parentNode && t.parentNode.removeChild(t), t = null;
            }
        }
        function lt(e, t) {
            var n = e.split("|"),
                r = e.length;
            while (r--) {
                i.attrHandle[n[r]] = t;
            }
        }
        function ct(e, t) {
            var n = t && e,
                r = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || D) - (~e.sourceIndex || D);
            if (r) return r;
            if (n) while (n = n.nextSibling) {
                if (n === t) return -1;
            }return e ? 1 : -1;
        }
        function pt(e) {
            return function (t) {
                var n = t.nodeName.toLowerCase();
                return "input" === n && t.type === e;
            };
        }
        function ft(e) {
            return function (t) {
                var n = t.nodeName.toLowerCase();
                return ("input" === n || "button" === n) && t.type === e;
            };
        }
        function ht(e) {
            return at(function (t) {
                return t = +t, at(function (n, r) {
                    var i,
                        o = e([], n.length, t),
                        s = o.length;
                    while (s--) {
                        n[i = o[s]] && (n[i] = !(r[i] = n[i]));
                    }
                });
            });
        }
        s = ot.isXML = function (e) {
            var t = e && (e.ownerDocument || e).documentElement;
            return t ? "HTML" !== t.nodeName : !1;
        }, n = ot.support = {}, c = ot.setDocument = function (e) {
            var t = e ? e.ownerDocument || e : b,
                r = t.defaultView;
            return t !== p && 9 === t.nodeType && t.documentElement ? (p = t, f = t.documentElement, h = !s(t), r && r.attachEvent && r !== r.top && r.attachEvent("onbeforeunload", function () {
                c();
            }), n.attributes = ut(function (e) {
                return e.className = "i", !e.getAttribute("className");
            }), n.getElementsByTagName = ut(function (e) {
                return e.appendChild(t.createComment("")), !e.getElementsByTagName("*").length;
            }), n.getElementsByClassName = ut(function (e) {
                return e.innerHTML = "<div class='a'></div><div class='a i'></div>", e.firstChild.className = "i", 2 === e.getElementsByClassName("i").length;
            }), n.getById = ut(function (e) {
                return f.appendChild(e).id = v, !t.getElementsByName || !t.getElementsByName(v).length;
            }), n.getById ? (i.find.ID = function (e, t) {
                if (_typeof(t.getElementById) !== j && h) {
                    var n = t.getElementById(e);
                    return n && n.parentNode ? [n] : [];
                }
            }, i.filter.ID = function (e) {
                var t = e.replace(nt, rt);
                return function (e) {
                    return e.getAttribute("id") === t;
                };
            }) : (delete i.find.ID, i.filter.ID = function (e) {
                var t = e.replace(nt, rt);
                return function (e) {
                    var n = _typeof(e.getAttributeNode) !== j && e.getAttributeNode("id");
                    return n && n.value === t;
                };
            }), i.find.TAG = n.getElementsByTagName ? function (e, t) {
                return _typeof(t.getElementsByTagName) !== j ? t.getElementsByTagName(e) : undefined;
            } : function (e, t) {
                var n,
                    r = [],
                    i = 0,
                    o = t.getElementsByTagName(e);
                if ("*" === e) {
                    while (n = o[i++]) {
                        1 === n.nodeType && r.push(n);
                    }return r;
                }
                return o;
            }, i.find.CLASS = n.getElementsByClassName && function (e, t) {
                return _typeof(t.getElementsByClassName) !== j && h ? t.getElementsByClassName(e) : undefined;
            }, g = [], d = [], (n.qsa = Q.test(t.querySelectorAll)) && (ut(function (e) {
                e.innerHTML = "<select><option selected=''></option></select>", e.querySelectorAll("[selected]").length || d.push("\\[" + M + "*(?:value|" + R + ")"), e.querySelectorAll(":checked").length || d.push(":checked");
            }), ut(function (e) {
                var n = t.createElement("input");
                n.setAttribute("type", "hidden"), e.appendChild(n).setAttribute("t", ""), e.querySelectorAll("[t^='']").length && d.push("[*^$]=" + M + "*(?:''|\"\")"), e.querySelectorAll(":enabled").length || d.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), d.push(",.*:");
            })), (n.matchesSelector = Q.test(m = f.webkitMatchesSelector || f.mozMatchesSelector || f.oMatchesSelector || f.msMatchesSelector)) && ut(function (e) {
                n.disconnectedMatch = m.call(e, "div"), m.call(e, "[s!='']:x"), g.push("!=", I);
            }), d = d.length && RegExp(d.join("|")), g = g.length && RegExp(g.join("|")), y = Q.test(f.contains) || f.compareDocumentPosition ? function (e, t) {
                var n = 9 === e.nodeType ? e.documentElement : e,
                    r = t && t.parentNode;
                return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)));
            } : function (e, t) {
                if (t) while (t = t.parentNode) {
                    if (t === e) return !0;
                }return !1;
            }, S = f.compareDocumentPosition ? function (e, r) {
                if (e === r) return E = !0, 0;
                var i = r.compareDocumentPosition && e.compareDocumentPosition && e.compareDocumentPosition(r);
                return i ? 1 & i || !n.sortDetached && r.compareDocumentPosition(e) === i ? e === t || y(b, e) ? -1 : r === t || y(b, r) ? 1 : l ? P.call(l, e) - P.call(l, r) : 0 : 4 & i ? -1 : 1 : e.compareDocumentPosition ? -1 : 1;
            } : function (e, n) {
                var r,
                    i = 0,
                    o = e.parentNode,
                    s = n.parentNode,
                    a = [e],
                    u = [n];
                if (e === n) return E = !0, 0;
                if (!o || !s) return e === t ? -1 : n === t ? 1 : o ? -1 : s ? 1 : l ? P.call(l, e) - P.call(l, n) : 0;
                if (o === s) return ct(e, n);
                r = e;
                while (r = r.parentNode) {
                    a.unshift(r);
                }r = n;
                while (r = r.parentNode) {
                    u.unshift(r);
                }while (a[i] === u[i]) {
                    i++;
                }return i ? ct(a[i], u[i]) : a[i] === b ? -1 : u[i] === b ? 1 : 0;
            }, t) : p;
        }, ot.matches = function (e, t) {
            return ot(e, null, null, t);
        }, ot.matchesSelector = function (e, t) {
            if ((e.ownerDocument || e) !== p && c(e), t = t.replace(Y, "='$1']"), !(!n.matchesSelector || !h || g && g.test(t) || d && d.test(t))) try {
                var r = m.call(e, t);
                if (r || n.disconnectedMatch || e.document && 11 !== e.document.nodeType) return r;
            } catch (i) {}
            return ot(t, p, null, [e]).length > 0;
        }, ot.contains = function (e, t) {
            return (e.ownerDocument || e) !== p && c(e), y(e, t);
        }, ot.attr = function (e, t) {
            (e.ownerDocument || e) !== p && c(e);
            var r = i.attrHandle[t.toLowerCase()],
                o = r && A.call(i.attrHandle, t.toLowerCase()) ? r(e, t, !h) : undefined;
            return o === undefined ? n.attributes || !h ? e.getAttribute(t) : (o = e.getAttributeNode(t)) && o.specified ? o.value : null : o;
        }, ot.error = function (e) {
            throw Error("Syntax error, unrecognized expression: " + e);
        }, ot.uniqueSort = function (e) {
            var t,
                r = [],
                i = 0,
                o = 0;
            if (E = !n.detectDuplicates, l = !n.sortStable && e.slice(0), e.sort(S), E) {
                while (t = e[o++]) {
                    t === e[o] && (i = r.push(o));
                }while (i--) {
                    e.splice(r[i], 1);
                }
            }
            return e;
        }, o = ot.getText = function (e) {
            var t,
                n = "",
                r = 0,
                i = e.nodeType;
            if (i) {
                if (1 === i || 9 === i || 11 === i) {
                    if ("string" == typeof e.textContent) return e.textContent;
                    for (e = e.firstChild; e; e = e.nextSibling) {
                        n += o(e);
                    }
                } else if (3 === i || 4 === i) return e.nodeValue;
            } else for (; t = e[r]; r++) {
                n += o(t);
            }return n;
        }, i = ot.selectors = {
            cacheLength: 50,
            createPseudo: at,
            match: J,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function ATTR(e) {
                    return e[1] = e[1].replace(nt, rt), e[3] = (e[4] || e[5] || "").replace(nt, rt), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4);
                },
                CHILD: function CHILD(e) {
                    return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || ot.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && ot.error(e[0]), e;
                },
                PSEUDO: function PSEUDO(e) {
                    var t,
                        n = !e[5] && e[2];
                    return J.CHILD.test(e[0]) ? null : (e[3] && e[4] !== undefined ? e[2] = e[4] : n && V.test(n) && (t = gt(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3));
                }
            },
            filter: {
                TAG: function TAG(e) {
                    var t = e.replace(nt, rt).toLowerCase();
                    return "*" === e ? function () {
                        return !0;
                    } : function (e) {
                        return e.nodeName && e.nodeName.toLowerCase() === t;
                    };
                },
                CLASS: function CLASS(e) {
                    var t = C[e + " "];
                    return t || (t = RegExp("(^|" + M + ")" + e + "(" + M + "|$)")) && C(e, function (e) {
                        return t.test("string" == typeof e.className && e.className || _typeof(e.getAttribute) !== j && e.getAttribute("class") || "");
                    });
                },
                ATTR: function ATTR(e, t, n) {
                    return function (r) {
                        var i = ot.attr(r, e);
                        return null == i ? "!=" === t : t ? (i += "", "=" === t ? i === n : "!=" === t ? i !== n : "^=" === t ? n && 0 === i.indexOf(n) : "*=" === t ? n && i.indexOf(n) > -1 : "$=" === t ? n && i.slice(-n.length) === n : "~=" === t ? (" " + i + " ").indexOf(n) > -1 : "|=" === t ? i === n || i.slice(0, n.length + 1) === n + "-" : !1) : !0;
                    };
                },
                CHILD: function CHILD(e, t, n, r, i) {
                    var o = "nth" !== e.slice(0, 3),
                        s = "last" !== e.slice(-4),
                        a = "of-type" === t;
                    return 1 === r && 0 === i ? function (e) {
                        return !!e.parentNode;
                    } : function (t, n, u) {
                        var l,
                            c,
                            p,
                            f,
                            h,
                            d,
                            g = o !== s ? "nextSibling" : "previousSibling",
                            m = t.parentNode,
                            y = a && t.nodeName.toLowerCase(),
                            x = !u && !a;
                        if (m) {
                            if (o) {
                                while (g) {
                                    p = t;
                                    while (p = p[g]) {
                                        if (a ? p.nodeName.toLowerCase() === y : 1 === p.nodeType) return !1;
                                    }d = g = "only" === e && !d && "nextSibling";
                                }
                                return !0;
                            }
                            if (d = [s ? m.firstChild : m.lastChild], s && x) {
                                c = m[v] || (m[v] = {}), l = c[e] || [], h = l[0] === w && l[1], f = l[0] === w && l[2], p = h && m.childNodes[h];
                                while (p = ++h && p && p[g] || (f = h = 0) || d.pop()) {
                                    if (1 === p.nodeType && ++f && p === t) {
                                        c[e] = [w, h, f];
                                        break;
                                    }
                                }
                            } else if (x && (l = (t[v] || (t[v] = {}))[e]) && l[0] === w) f = l[1];else while (p = ++h && p && p[g] || (f = h = 0) || d.pop()) {
                                if ((a ? p.nodeName.toLowerCase() === y : 1 === p.nodeType) && ++f && (x && ((p[v] || (p[v] = {}))[e] = [w, f]), p === t)) break;
                            }return f -= i, f === r || 0 === f % r && f / r >= 0;
                        }
                    };
                },
                PSEUDO: function PSEUDO(e, t) {
                    var n,
                        r = i.pseudos[e] || i.setFilters[e.toLowerCase()] || ot.error("unsupported pseudo: " + e);
                    return r[v] ? r(t) : r.length > 1 ? (n = [e, e, "", t], i.setFilters.hasOwnProperty(e.toLowerCase()) ? at(function (e, n) {
                        var i,
                            o = r(e, t),
                            s = o.length;
                        while (s--) {
                            i = P.call(e, o[s]), e[i] = !(n[i] = o[s]);
                        }
                    }) : function (e) {
                        return r(e, 0, n);
                    }) : r;
                }
            },
            pseudos: {
                not: at(function (e) {
                    var t = [],
                        n = [],
                        r = a(e.replace(z, "$1"));
                    return r[v] ? at(function (e, t, n, i) {
                        var o,
                            s = r(e, null, i, []),
                            a = e.length;
                        while (a--) {
                            (o = s[a]) && (e[a] = !(t[a] = o));
                        }
                    }) : function (e, i, o) {
                        return t[0] = e, r(t, null, o, n), !n.pop();
                    };
                }),
                has: at(function (e) {
                    return function (t) {
                        return ot(e, t).length > 0;
                    };
                }),
                contains: at(function (e) {
                    return function (t) {
                        return (t.textContent || t.innerText || o(t)).indexOf(e) > -1;
                    };
                }),
                lang: at(function (e) {
                    return G.test(e || "") || ot.error("unsupported lang: " + e), e = e.replace(nt, rt).toLowerCase(), function (t) {
                        var n;
                        do {
                            if (n = h ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return n = n.toLowerCase(), n === e || 0 === n.indexOf(e + "-");
                        } while ((t = t.parentNode) && 1 === t.nodeType);
                        return !1;
                    };
                }),
                target: function target(t) {
                    var n = e.location && e.location.hash;
                    return n && n.slice(1) === t.id;
                },
                root: function root(e) {
                    return e === f;
                },
                focus: function focus(e) {
                    return e === p.activeElement && (!p.hasFocus || p.hasFocus()) && !!(e.type || e.href || ~e.tabIndex);
                },
                enabled: function enabled(e) {
                    return e.disabled === !1;
                },
                disabled: function disabled(e) {
                    return e.disabled === !0;
                },
                checked: function checked(e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && !!e.checked || "option" === t && !!e.selected;
                },
                selected: function selected(e) {
                    return e.parentNode && e.parentNode.selectedIndex, e.selected === !0;
                },
                empty: function empty(e) {
                    for (e = e.firstChild; e; e = e.nextSibling) {
                        if (e.nodeName > "@" || 3 === e.nodeType || 4 === e.nodeType) return !1;
                    }return !0;
                },
                parent: function parent(e) {
                    return !i.pseudos.empty(e);
                },
                header: function header(e) {
                    return et.test(e.nodeName);
                },
                input: function input(e) {
                    return Z.test(e.nodeName);
                },
                button: function button(e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && "button" === e.type || "button" === t;
                },
                text: function text(e) {
                    var t;
                    return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || t.toLowerCase() === e.type);
                },
                first: ht(function () {
                    return [0];
                }),
                last: ht(function (e, t) {
                    return [t - 1];
                }),
                eq: ht(function (e, t, n) {
                    return [0 > n ? n + t : n];
                }),
                even: ht(function (e, t) {
                    var n = 0;
                    for (; t > n; n += 2) {
                        e.push(n);
                    }return e;
                }),
                odd: ht(function (e, t) {
                    var n = 1;
                    for (; t > n; n += 2) {
                        e.push(n);
                    }return e;
                }),
                lt: ht(function (e, t, n) {
                    var r = 0 > n ? n + t : n;
                    for (; --r >= 0;) {
                        e.push(r);
                    }return e;
                }),
                gt: ht(function (e, t, n) {
                    var r = 0 > n ? n + t : n;
                    for (; t > ++r;) {
                        e.push(r);
                    }return e;
                })
            }
        }, i.pseudos.nth = i.pseudos.eq;
        for (t in {
            radio: !0,
            checkbox: !0,
            file: !0,
            password: !0,
            image: !0
        }) {
            i.pseudos[t] = pt(t);
        }for (t in {
            submit: !0,
            reset: !0
        }) {
            i.pseudos[t] = ft(t);
        }function dt() {}
        dt.prototype = i.filters = i.pseudos, i.setFilters = new dt();
        function gt(e, t) {
            var n,
                r,
                o,
                s,
                a,
                u,
                l,
                c = k[e + " "];
            if (c) return t ? 0 : c.slice(0);
            a = e, u = [], l = i.preFilter;
            while (a) {
                (!n || (r = _.exec(a))) && (r && (a = a.slice(r[0].length) || a), u.push(o = [])), n = !1, (r = X.exec(a)) && (n = r.shift(), o.push({
                    value: n,
                    type: r[0].replace(z, " ")
                }), a = a.slice(n.length));
                for (s in i.filter) {
                    !(r = J[s].exec(a)) || l[s] && !(r = l[s](r)) || (n = r.shift(), o.push({
                        value: n,
                        type: s,
                        matches: r
                    }), a = a.slice(n.length));
                }if (!n) break;
            }
            return t ? a.length : a ? ot.error(e) : k(e, u).slice(0);
        }
        function mt(e) {
            var t = 0,
                n = e.length,
                r = "";
            for (; n > t; t++) {
                r += e[t].value;
            }return r;
        }
        function yt(e, t, n) {
            var i = t.dir,
                o = n && "parentNode" === i,
                s = T++;
            return t.first ? function (t, n, r) {
                while (t = t[i]) {
                    if (1 === t.nodeType || o) return e(t, n, r);
                }
            } : function (t, n, a) {
                var u,
                    l,
                    c,
                    p = w + " " + s;
                if (a) {
                    while (t = t[i]) {
                        if ((1 === t.nodeType || o) && e(t, n, a)) return !0;
                    }
                } else while (t = t[i]) {
                    if (1 === t.nodeType || o) if (c = t[v] || (t[v] = {}), (l = c[i]) && l[0] === p) {
                        if ((u = l[1]) === !0 || u === r) return u === !0;
                    } else if (l = c[i] = [p], l[1] = e(t, n, a) || r, l[1] === !0) return !0;
                }
            };
        }
        function vt(e) {
            return e.length > 1 ? function (t, n, r) {
                var i = e.length;
                while (i--) {
                    if (!e[i](t, n, r)) return !1;
                }return !0;
            } : e[0];
        }
        function xt(e, t, n, r, i) {
            var o,
                s = [],
                a = 0,
                u = e.length,
                l = null != t;
            for (; u > a; a++) {
                (o = e[a]) && (!n || n(o, r, i)) && (s.push(o), l && t.push(a));
            }return s;
        }
        function bt(e, t, n, r, i, o) {
            return r && !r[v] && (r = bt(r)), i && !i[v] && (i = bt(i, o)), at(function (o, s, a, u) {
                var l,
                    c,
                    p,
                    f = [],
                    h = [],
                    d = s.length,
                    g = o || Ct(t || "*", a.nodeType ? [a] : a, []),
                    m = !e || !o && t ? g : xt(g, f, e, a, u),
                    y = n ? i || (o ? e : d || r) ? [] : s : m;
                if (n && n(m, y, a, u), r) {
                    l = xt(y, h), r(l, [], a, u), c = l.length;
                    while (c--) {
                        (p = l[c]) && (y[h[c]] = !(m[h[c]] = p));
                    }
                }
                if (o) {
                    if (i || e) {
                        if (i) {
                            l = [], c = y.length;
                            while (c--) {
                                (p = y[c]) && l.push(m[c] = p);
                            }i(null, y = [], l, u);
                        }
                        c = y.length;
                        while (c--) {
                            (p = y[c]) && (l = i ? P.call(o, p) : f[c]) > -1 && (o[l] = !(s[l] = p));
                        }
                    }
                } else y = xt(y === s ? y.splice(d, y.length) : y), i ? i(null, s, y, u) : O.apply(s, y);
            });
        }
        function wt(e) {
            var t,
                n,
                r,
                o = e.length,
                s = i.relative[e[0].type],
                a = s || i.relative[" "],
                l = s ? 1 : 0,
                c = yt(function (e) {
                return e === t;
            }, a, !0),
                p = yt(function (e) {
                return P.call(t, e) > -1;
            }, a, !0),
                f = [function (e, n, r) {
                return !s && (r || n !== u) || ((t = n).nodeType ? c(e, n, r) : p(e, n, r));
            }];
            for (; o > l; l++) {
                if (n = i.relative[e[l].type]) f = [yt(vt(f), n)];else {
                    if (n = i.filter[e[l].type].apply(null, e[l].matches), n[v]) {
                        for (r = ++l; o > r; r++) {
                            if (i.relative[e[r].type]) break;
                        }return bt(l > 1 && vt(f), l > 1 && mt(e.slice(0, l - 1).concat({
                            value: " " === e[l - 2].type ? "*" : ""
                        })).replace(z, "$1"), n, r > l && wt(e.slice(l, r)), o > r && wt(e = e.slice(r)), o > r && mt(e));
                    }
                    f.push(n);
                }
            }return vt(f);
        }
        function Tt(e, t) {
            var n = 0,
                o = t.length > 0,
                s = e.length > 0,
                a = function a(_a, l, c, f, h) {
                var d,
                    g,
                    m,
                    y = [],
                    v = 0,
                    x = "0",
                    b = _a && [],
                    T = null != h,
                    C = u,
                    k = _a || s && i.find.TAG("*", h && l.parentNode || l),
                    N = w += null == C ? 1 : Math.random() || .1;
                for (T && (u = l !== p && l, r = n); null != (d = k[x]); x++) {
                    if (s && d) {
                        g = 0;
                        while (m = e[g++]) {
                            if (m(d, l, c)) {
                                f.push(d);
                                break;
                            }
                        }T && (w = N, r = ++n);
                    }
                    o && ((d = !m && d) && v--, _a && b.push(d));
                }
                if (v += x, o && x !== v) {
                    g = 0;
                    while (m = t[g++]) {
                        m(b, y, l, c);
                    }if (_a) {
                        if (v > 0) while (x--) {
                            b[x] || y[x] || (y[x] = q.call(f));
                        }y = xt(y);
                    }
                    O.apply(f, y), T && !_a && y.length > 0 && v + t.length > 1 && ot.uniqueSort(f);
                }
                return T && (w = N, u = C), b;
            };
            return o ? at(a) : a;
        }
        a = ot.compile = function (e, t) {
            var n,
                r = [],
                i = [],
                o = N[e + " "];
            if (!o) {
                t || (t = gt(e)), n = t.length;
                while (n--) {
                    o = wt(t[n]), o[v] ? r.push(o) : i.push(o);
                }o = N(e, Tt(i, r));
            }
            return o;
        };
        function Ct(e, t, n) {
            var r = 0,
                i = t.length;
            for (; i > r; r++) {
                ot(e, t[r], n);
            }return n;
        }
        function kt(e, t, r, o) {
            var s,
                u,
                l,
                c,
                p,
                f = gt(e);
            if (!o && 1 === f.length) {
                if (u = f[0] = f[0].slice(0), u.length > 2 && "ID" === (l = u[0]).type && n.getById && 9 === t.nodeType && h && i.relative[u[1].type]) {
                    if (t = (i.find.ID(l.matches[0].replace(nt, rt), t) || [])[0], !t) return r;
                    e = e.slice(u.shift().value.length);
                }
                s = J.needsContext.test(e) ? 0 : u.length;
                while (s--) {
                    if (l = u[s], i.relative[c = l.type]) break;
                    if ((p = i.find[c]) && (o = p(l.matches[0].replace(nt, rt), U.test(u[0].type) && t.parentNode || t))) {
                        if (u.splice(s, 1), e = o.length && mt(u), !e) return O.apply(r, o), r;
                        break;
                    }
                }
            }
            return a(e, f)(o, t, !h, r, U.test(e)), r;
        }
        n.sortStable = v.split("").sort(S).join("") === v, n.detectDuplicates = E, c(), n.sortDetached = ut(function (e) {
            return 1 & e.compareDocumentPosition(p.createElement("div"));
        }), ut(function (e) {
            return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href");
        }) || lt("type|href|height|width", function (e, t, n) {
            return n ? undefined : e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2);
        }), n.attributes && ut(function (e) {
            return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value");
        }) || lt("value", function (e, t, n) {
            return n || "input" !== e.nodeName.toLowerCase() ? undefined : e.defaultValue;
        }), ut(function (e) {
            return null == e.getAttribute("disabled");
        }) || lt(R, function (e, t, n) {
            var r;
            return n ? undefined : (r = e.getAttributeNode(t)) && r.specified ? r.value : e[t] === !0 ? t.toLowerCase() : null;
        }), x.find = ot, x.expr = ot.selectors, x.expr[":"] = x.expr.pseudos, x.unique = ot.uniqueSort, x.text = ot.getText, x.isXMLDoc = ot.isXML, x.contains = ot.contains;
    }(e);
    var D = {};
    function A(e) {
        var t = D[e] = {};
        return x.each(e.match(w) || [], function (e, n) {
            t[n] = !0;
        }), t;
    }
    x.Callbacks = function (e) {
        e = "string" == typeof e ? D[e] || A(e) : x.extend({}, e);
        var t,
            n,
            r,
            i,
            o,
            s,
            a = [],
            u = !e.once && [],
            l = function l(p) {
            for (t = e.memory && p, n = !0, s = i || 0, i = 0, o = a.length, r = !0; a && o > s; s++) {
                if (a[s].apply(p[0], p[1]) === !1 && e.stopOnFalse) {
                    t = !1;
                    break;
                }
            }r = !1, a && (u ? u.length && l(u.shift()) : t ? a = [] : c.disable());
        },
            c = {
            add: function add() {
                if (a) {
                    var n = a.length;
                    (function s(t) {
                        x.each(t, function (t, n) {
                            var r = x.type(n);
                            "function" === r ? e.unique && c.has(n) || a.push(n) : n && n.length && "string" !== r && s(n);
                        });
                    })(arguments), r ? o = a.length : t && (i = n, l(t));
                }
                return this;
            },
            remove: function remove() {
                return a && x.each(arguments, function (e, t) {
                    var n;
                    while ((n = x.inArray(t, a, n)) > -1) {
                        a.splice(n, 1), r && (o >= n && o--, s >= n && s--);
                    }
                }), this;
            },
            has: function has(e) {
                return e ? x.inArray(e, a) > -1 : !(!a || !a.length);
            },
            empty: function empty() {
                return a = [], o = 0, this;
            },
            disable: function disable() {
                return a = u = t = undefined, this;
            },
            disabled: function disabled() {
                return !a;
            },
            lock: function lock() {
                return u = undefined, t || c.disable(), this;
            },
            locked: function locked() {
                return !u;
            },
            fireWith: function fireWith(e, t) {
                return !a || n && !u || (t = t || [], t = [e, t.slice ? t.slice() : t], r ? u.push(t) : l(t)), this;
            },
            fire: function fire() {
                return c.fireWith(this, arguments), this;
            },
            fired: function fired() {
                return !!n;
            }
        };
        return c;
    }, x.extend({
        Deferred: function Deferred(e) {
            var t = [["resolve", "done", x.Callbacks("once memory"), "resolved"], ["reject", "fail", x.Callbacks("once memory"), "rejected"], ["notify", "progress", x.Callbacks("memory")]],
                n = "pending",
                r = {
                state: function state() {
                    return n;
                },
                always: function always() {
                    return i.done(arguments).fail(arguments), this;
                },
                then: function then() {
                    var e = arguments;
                    return x.Deferred(function (n) {
                        x.each(t, function (t, o) {
                            var s = o[0],
                                a = x.isFunction(e[t]) && e[t];
                            i[o[1]](function () {
                                var e = a && a.apply(this, arguments);
                                e && x.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[s + "With"](this === r ? n.promise() : this, a ? [e] : arguments);
                            });
                        }), e = null;
                    }).promise();
                },
                promise: function promise(e) {
                    return null != e ? x.extend(e, r) : r;
                }
            },
                i = {};
            return r.pipe = r.then, x.each(t, function (e, o) {
                var s = o[2],
                    a = o[3];
                r[o[1]] = s.add, a && s.add(function () {
                    n = a;
                }, t[1 ^ e][2].disable, t[2][2].lock), i[o[0]] = function () {
                    return i[o[0] + "With"](this === i ? r : this, arguments), this;
                }, i[o[0] + "With"] = s.fireWith;
            }), r.promise(i), e && e.call(i, i), i;
        },
        when: function when(e) {
            var t = 0,
                n = d.call(arguments),
                r = n.length,
                i = 1 !== r || e && x.isFunction(e.promise) ? r : 0,
                o = 1 === i ? e : x.Deferred(),
                s = function s(e, t, n) {
                return function (r) {
                    t[e] = this, n[e] = arguments.length > 1 ? d.call(arguments) : r, n === a ? o.notifyWith(t, n) : --i || o.resolveWith(t, n);
                };
            },
                a,
                u,
                l;
            if (r > 1) for (a = Array(r), u = Array(r), l = Array(r); r > t; t++) {
                n[t] && x.isFunction(n[t].promise) ? n[t].promise().done(s(t, l, n)).fail(o.reject).progress(s(t, u, a)) : --i;
            }return i || o.resolveWith(l, n), o.promise();
        }
    }), x.support = function (t) {
        var n = o.createElement("input"),
            r = o.createDocumentFragment(),
            i = o.createElement("div"),
            s = o.createElement("select"),
            a = s.appendChild(o.createElement("option"));
        return n.type ? (n.type = "checkbox", t.checkOn = "" !== n.value, t.optSelected = a.selected, t.reliableMarginRight = !0, t.boxSizingReliable = !0, t.pixelPosition = !1, n.checked = !0, t.noCloneChecked = n.cloneNode(!0).checked, s.disabled = !0, t.optDisabled = !a.disabled, n = o.createElement("input"), n.value = "t", n.type = "radio", t.radioValue = "t" === n.value, n.setAttribute("checked", "t"), n.setAttribute("name", "t"), r.appendChild(n), t.checkClone = r.cloneNode(!0).cloneNode(!0).lastChild.checked, t.focusinBubbles = "onfocusin" in e, i.style.backgroundClip = "content-box", i.cloneNode(!0).style.backgroundClip = "", t.clearCloneStyle = "content-box" === i.style.backgroundClip, x(function () {
            var n,
                r,
                s = "padding:0;margin:0;border:0;display:block;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box",
                a = o.getElementsByTagName("body")[0];
            a && (n = o.createElement("div"), n.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px", a.appendChild(n).appendChild(i), i.innerHTML = "", i.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%", x.swap(a, null != a.style.zoom ? {
                zoom: 1
            } : {}, function () {
                t.boxSizing = 4 === i.offsetWidth;
            }), e.getComputedStyle && (t.pixelPosition = "1%" !== (e.getComputedStyle(i, null) || {}).top, t.boxSizingReliable = "4px" === (e.getComputedStyle(i, null) || {
                width: "4px"
            }).width, r = i.appendChild(o.createElement("div")), r.style.cssText = i.style.cssText = s, r.style.marginRight = r.style.width = "0", i.style.width = "1px", t.reliableMarginRight = !parseFloat((e.getComputedStyle(r, null) || {}).marginRight)), a.removeChild(n));
        }), t) : t;
    }({});
    var L,
        q,
        H = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
        O = /([A-Z])/g;
    function F() {
        Object.defineProperty(this.cache = {}, 0, {
            get: function get() {
                return {};
            }
        }), this.expando = x.expando + Math.random();
    }
    F.uid = 1, F.accepts = function (e) {
        return e.nodeType ? 1 === e.nodeType || 9 === e.nodeType : !0;
    }, F.prototype = {
        key: function key(e) {
            if (!F.accepts(e)) return 0;
            var t = {},
                n = e[this.expando];
            if (!n) {
                n = F.uid++;
                try {
                    t[this.expando] = {
                        value: n
                    }, Object.defineProperties(e, t);
                } catch (r) {
                    t[this.expando] = n, x.extend(e, t);
                }
            }
            return this.cache[n] || (this.cache[n] = {}), n;
        },
        set: function set(e, t, n) {
            var r,
                i = this.key(e),
                o = this.cache[i];
            if ("string" == typeof t) o[t] = n;else if (x.isEmptyObject(o)) x.extend(this.cache[i], t);else for (r in t) {
                o[r] = t[r];
            }return o;
        },
        get: function get(e, t) {
            var n = this.cache[this.key(e)];
            return t === undefined ? n : n[t];
        },
        access: function access(e, t, n) {
            var r;
            return t === undefined || t && "string" == typeof t && n === undefined ? (r = this.get(e, t), r !== undefined ? r : this.get(e, x.camelCase(t))) : (this.set(e, t, n), n !== undefined ? n : t);
        },
        remove: function remove(e, t) {
            var n,
                r,
                i,
                o = this.key(e),
                s = this.cache[o];
            if (t === undefined) this.cache[o] = {};else {
                x.isArray(t) ? r = t.concat(t.map(x.camelCase)) : (i = x.camelCase(t), t in s ? r = [t, i] : (r = i, r = r in s ? [r] : r.match(w) || [])), n = r.length;
                while (n--) {
                    delete s[r[n]];
                }
            }
        },
        hasData: function hasData(e) {
            return !x.isEmptyObject(this.cache[e[this.expando]] || {});
        },
        discard: function discard(e) {
            e[this.expando] && delete this.cache[e[this.expando]];
        }
    }, L = new F(), q = new F(), x.extend({
        acceptData: F.accepts,
        hasData: function hasData(e) {
            return L.hasData(e) || q.hasData(e);
        },
        data: function data(e, t, n) {
            return L.access(e, t, n);
        },
        removeData: function removeData(e, t) {
            L.remove(e, t);
        },
        _data: function _data(e, t, n) {
            return q.access(e, t, n);
        },
        _removeData: function _removeData(e, t) {
            q.remove(e, t);
        }
    }), x.fn.extend({
        data: function data(e, t) {
            var n,
                r,
                i = this[0],
                o = 0,
                s = null;
            if (e === undefined) {
                if (this.length && (s = L.get(i), 1 === i.nodeType && !q.get(i, "hasDataAttrs"))) {
                    for (n = i.attributes; n.length > o; o++) {
                        r = n[o].name, 0 === r.indexOf("data-") && (r = x.camelCase(r.slice(5)), P(i, r, s[r]));
                    }q.set(i, "hasDataAttrs", !0);
                }
                return s;
            }
            return "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) ? this.each(function () {
                L.set(this, e);
            }) : x.access(this, function (t) {
                var n,
                    r = x.camelCase(e);
                if (i && t === undefined) {
                    if (n = L.get(i, e), n !== undefined) return n;
                    if (n = L.get(i, r), n !== undefined) return n;
                    if (n = P(i, r, undefined), n !== undefined) return n;
                } else this.each(function () {
                    var n = L.get(this, r);
                    L.set(this, r, t), -1 !== e.indexOf("-") && n !== undefined && L.set(this, e, t);
                });
            }, null, t, arguments.length > 1, null, !0);
        },
        removeData: function removeData(e) {
            return this.each(function () {
                L.remove(this, e);
            });
        }
    });
    function P(e, t, n) {
        var r;
        if (n === undefined && 1 === e.nodeType) if (r = "data-" + t.replace(O, "-$1").toLowerCase(), n = e.getAttribute(r), "string" == typeof n) {
            try {
                n = "true" === n ? !0 : "false" === n ? !1 : "null" === n ? null : +n + "" === n ? +n : H.test(n) ? JSON.parse(n) : n;
            } catch (i) {}
            L.set(e, t, n);
        } else n = undefined;
        return n;
    }
    x.extend({
        queue: function queue(e, t, n) {
            var r;
            return e ? (t = (t || "fx") + "queue", r = q.get(e, t), n && (!r || x.isArray(n) ? r = q.access(e, t, x.makeArray(n)) : r.push(n)), r || []) : undefined;
        },
        dequeue: function dequeue(e, t) {
            t = t || "fx";
            var n = x.queue(e, t),
                r = n.length,
                i = n.shift(),
                o = x._queueHooks(e, t),
                s = function s() {
                x.dequeue(e, t);
            };
            "inprogress" === i && (i = n.shift(), r--), i && ("fx" === t && n.unshift("inprogress"), delete o.stop, i.call(e, s, o)), !r && o && o.empty.fire();
        },
        _queueHooks: function _queueHooks(e, t) {
            var n = t + "queueHooks";
            return q.get(e, n) || q.access(e, n, {
                empty: x.Callbacks("once memory").add(function () {
                    q.remove(e, [t + "queue", n]);
                })
            });
        }
    }), x.fn.extend({
        queue: function queue(e, t) {
            var n = 2;
            return "string" != typeof e && (t = e, e = "fx", n--), n > arguments.length ? x.queue(this[0], e) : t === undefined ? this : this.each(function () {
                var n = x.queue(this, e, t);
                x._queueHooks(this, e), "fx" === e && "inprogress" !== n[0] && x.dequeue(this, e);
            });
        },
        dequeue: function dequeue(e) {
            return this.each(function () {
                x.dequeue(this, e);
            });
        },
        delay: function delay(e, t) {
            return e = x.fx ? x.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function (t, n) {
                var r = setTimeout(t, e);
                n.stop = function () {
                    clearTimeout(r);
                };
            });
        },
        clearQueue: function clearQueue(e) {
            return this.queue(e || "fx", []);
        },
        promise: function promise(e, t) {
            var n,
                r = 1,
                i = x.Deferred(),
                o = this,
                s = this.length,
                a = function a() {
                --r || i.resolveWith(o, [o]);
            };
            "string" != typeof e && (t = e, e = undefined), e = e || "fx";
            while (s--) {
                n = q.get(o[s], e + "queueHooks"), n && n.empty && (r++, n.empty.add(a));
            }return a(), i.promise(t);
        }
    });
    var R,
        M,
        W = /[\t\r\n\f]/g,
        $ = /\r/g,
        B = /^(?:input|select|textarea|button)$/i;
    x.fn.extend({
        attr: function attr(e, t) {
            return x.access(this, x.attr, e, t, arguments.length > 1);
        },
        removeAttr: function removeAttr(e) {
            return this.each(function () {
                x.removeAttr(this, e);
            });
        },
        prop: function prop(e, t) {
            return x.access(this, x.prop, e, t, arguments.length > 1);
        },
        removeProp: function removeProp(e) {
            return this.each(function () {
                delete this[x.propFix[e] || e];
            });
        },
        addClass: function addClass(e) {
            var t,
                n,
                r,
                i,
                o,
                s = 0,
                a = this.length,
                u = "string" == typeof e && e;
            if (x.isFunction(e)) return this.each(function (t) {
                x(this).addClass(e.call(this, t, this.className));
            });
            if (u) for (t = (e || "").match(w) || []; a > s; s++) {
                if (n = this[s], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(W, " ") : " ")) {
                    o = 0;
                    while (i = t[o++]) {
                        0 > r.indexOf(" " + i + " ") && (r += i + " ");
                    }n.className = x.trim(r);
                }
            }return this;
        },
        removeClass: function removeClass(e) {
            var t,
                n,
                r,
                i,
                o,
                s = 0,
                a = this.length,
                u = 0 === arguments.length || "string" == typeof e && e;
            if (x.isFunction(e)) return this.each(function (t) {
                x(this).removeClass(e.call(this, t, this.className));
            });
            if (u) for (t = (e || "").match(w) || []; a > s; s++) {
                if (n = this[s], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(W, " ") : "")) {
                    o = 0;
                    while (i = t[o++]) {
                        while (r.indexOf(" " + i + " ") >= 0) {
                            r = r.replace(" " + i + " ", " ");
                        }
                    }n.className = e ? x.trim(r) : "";
                }
            }return this;
        },
        toggleClass: function toggleClass(e, t) {
            var n = typeof e === "undefined" ? "undefined" : _typeof(e);
            return "boolean" == typeof t && "string" === n ? t ? this.addClass(e) : this.removeClass(e) : x.isFunction(e) ? this.each(function (n) {
                x(this).toggleClass(e.call(this, n, this.className, t), t);
            }) : this.each(function () {
                if ("string" === n) {
                    var t,
                        i = 0,
                        o = x(this),
                        s = e.match(w) || [];
                    while (t = s[i++]) {
                        o.hasClass(t) ? o.removeClass(t) : o.addClass(t);
                    }
                } else (n === r || "boolean" === n) && (this.className && q.set(this, "__className__", this.className), this.className = this.className || e === !1 ? "" : q.get(this, "__className__") || "");
            });
        },
        hasClass: function hasClass(e) {
            var t = " " + e + " ",
                n = 0,
                r = this.length;
            for (; r > n; n++) {
                if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(W, " ").indexOf(t) >= 0) return !0;
            }return !1;
        },
        val: function val(e) {
            var t,
                n,
                r,
                i = this[0];
            {
                if (arguments.length) return r = x.isFunction(e), this.each(function (n) {
                    var i;
                    1 === this.nodeType && (i = r ? e.call(this, n, x(this).val()) : e, null == i ? i = "" : "number" == typeof i ? i += "" : x.isArray(i) && (i = x.map(i, function (e) {
                        return null == e ? "" : e + "";
                    })), t = x.valHooks[this.type] || x.valHooks[this.nodeName.toLowerCase()], t && "set" in t && t.set(this, i, "value") !== undefined || (this.value = i));
                });
                if (i) return t = x.valHooks[i.type] || x.valHooks[i.nodeName.toLowerCase()], t && "get" in t && (n = t.get(i, "value")) !== undefined ? n : (n = i.value, "string" == typeof n ? n.replace($, "") : null == n ? "" : n);
            }
        }
    }), x.extend({
        valHooks: {
            option: {
                get: function get(e) {
                    var t = e.attributes.value;
                    return !t || t.specified ? e.value : e.text;
                }
            },
            select: {
                get: function get(e) {
                    var t,
                        n,
                        r = e.options,
                        i = e.selectedIndex,
                        o = "select-one" === e.type || 0 > i,
                        s = o ? null : [],
                        a = o ? i + 1 : r.length,
                        u = 0 > i ? a : o ? i : 0;
                    for (; a > u; u++) {
                        if (n = r[u], !(!n.selected && u !== i || (x.support.optDisabled ? n.disabled : null !== n.getAttribute("disabled")) || n.parentNode.disabled && x.nodeName(n.parentNode, "optgroup"))) {
                            if (t = x(n).val(), o) return t;
                            s.push(t);
                        }
                    }return s;
                },
                set: function set(e, t) {
                    var n,
                        r,
                        i = e.options,
                        o = x.makeArray(t),
                        s = i.length;
                    while (s--) {
                        r = i[s], (r.selected = x.inArray(x(r).val(), o) >= 0) && (n = !0);
                    }return n || (e.selectedIndex = -1), o;
                }
            }
        },
        attr: function attr(e, t, n) {
            var i,
                o,
                s = e.nodeType;
            if (e && 3 !== s && 8 !== s && 2 !== s) return _typeof(e.getAttribute) === r ? x.prop(e, t, n) : (1 === s && x.isXMLDoc(e) || (t = t.toLowerCase(), i = x.attrHooks[t] || (x.expr.match.bool.test(t) ? M : R)), n === undefined ? i && "get" in i && null !== (o = i.get(e, t)) ? o : (o = x.find.attr(e, t), null == o ? undefined : o) : null !== n ? i && "set" in i && (o = i.set(e, n, t)) !== undefined ? o : (e.setAttribute(t, n + ""), n) : (x.removeAttr(e, t), undefined));
        },
        removeAttr: function removeAttr(e, t) {
            var n,
                r,
                i = 0,
                o = t && t.match(w);
            if (o && 1 === e.nodeType) while (n = o[i++]) {
                r = x.propFix[n] || n, x.expr.match.bool.test(n) && (e[r] = !1), e.removeAttribute(n);
            }
        },
        attrHooks: {
            type: {
                set: function set(e, t) {
                    if (!x.support.radioValue && "radio" === t && x.nodeName(e, "input")) {
                        var n = e.value;
                        return e.setAttribute("type", t), n && (e.value = n), t;
                    }
                }
            }
        },
        propFix: {
            for: "htmlFor",
            class: "className"
        },
        prop: function prop(e, t, n) {
            var r,
                i,
                o,
                s = e.nodeType;
            if (e && 3 !== s && 8 !== s && 2 !== s) return o = 1 !== s || !x.isXMLDoc(e), o && (t = x.propFix[t] || t, i = x.propHooks[t]), n !== undefined ? i && "set" in i && (r = i.set(e, n, t)) !== undefined ? r : e[t] = n : i && "get" in i && null !== (r = i.get(e, t)) ? r : e[t];
        },
        propHooks: {
            tabIndex: {
                get: function get(e) {
                    return e.hasAttribute("tabindex") || B.test(e.nodeName) || e.href ? e.tabIndex : -1;
                }
            }
        }
    }), M = {
        set: function set(e, t, n) {
            return t === !1 ? x.removeAttr(e, n) : e.setAttribute(n, n), n;
        }
    }, x.each(x.expr.match.bool.source.match(/\w+/g), function (e, t) {
        var n = x.expr.attrHandle[t] || x.find.attr;
        x.expr.attrHandle[t] = function (e, t, r) {
            var i = x.expr.attrHandle[t],
                o = r ? undefined : (x.expr.attrHandle[t] = undefined) != n(e, t, r) ? t.toLowerCase() : null;
            return x.expr.attrHandle[t] = i, o;
        };
    }), x.support.optSelected || (x.propHooks.selected = {
        get: function get(e) {
            var t = e.parentNode;
            return t && t.parentNode && t.parentNode.selectedIndex, null;
        }
    }), x.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
        x.propFix[this.toLowerCase()] = this;
    }), x.each(["radio", "checkbox"], function () {
        x.valHooks[this] = {
            set: function set(e, t) {
                return x.isArray(t) ? e.checked = x.inArray(x(e).val(), t) >= 0 : undefined;
            }
        }, x.support.checkOn || (x.valHooks[this].get = function (e) {
            return null === e.getAttribute("value") ? "on" : e.value;
        });
    });
    var I = /^key/,
        z = /^(?:mouse|contextmenu)|click/,
        _ = /^(?:focusinfocus|focusoutblur)$/,
        X = /^([^.]*)(?:\.(.+)|)$/;
    function U() {
        return !0;
    }
    function Y() {
        return !1;
    }
    function V() {
        try {
            return o.activeElement;
        } catch (e) {}
    }
    x.event = {
        global: {},
        add: function add(e, t, n, i, o) {
            var s,
                a,
                u,
                l,
                c,
                p,
                f,
                h,
                d,
                g,
                m,
                y = q.get(e);
            if (y) {
                n.handler && (s = n, n = s.handler, o = s.selector), n.guid || (n.guid = x.guid++), (l = y.events) || (l = y.events = {}), (a = y.handle) || (a = y.handle = function (e) {
                    return (typeof x === "undefined" ? "undefined" : _typeof(x)) === r || e && x.event.triggered === e.type ? undefined : x.event.dispatch.apply(a.elem, arguments);
                }, a.elem = e), t = (t || "").match(w) || [""], c = t.length;
                while (c--) {
                    u = X.exec(t[c]) || [], d = m = u[1], g = (u[2] || "").split(".").sort(), d && (f = x.event.special[d] || {}, d = (o ? f.delegateType : f.bindType) || d, f = x.event.special[d] || {}, p = x.extend({
                        type: d,
                        origType: m,
                        data: i,
                        handler: n,
                        guid: n.guid,
                        selector: o,
                        needsContext: o && x.expr.match.needsContext.test(o),
                        namespace: g.join(".")
                    }, s), (h = l[d]) || (h = l[d] = [], h.delegateCount = 0, f.setup && f.setup.call(e, i, g, a) !== !1 || e.addEventListener && e.addEventListener(d, a, !1)), f.add && (f.add.call(e, p), p.handler.guid || (p.handler.guid = n.guid)), o ? h.splice(h.delegateCount++, 0, p) : h.push(p), x.event.global[d] = !0);
                }e = null;
            }
        },
        remove: function remove(e, t, n, r, i) {
            var o,
                s,
                a,
                u,
                l,
                c,
                p,
                f,
                h,
                d,
                g,
                m = q.hasData(e) && q.get(e);
            if (m && (u = m.events)) {
                t = (t || "").match(w) || [""], l = t.length;
                while (l--) {
                    if (a = X.exec(t[l]) || [], h = g = a[1], d = (a[2] || "").split(".").sort(), h) {
                        p = x.event.special[h] || {}, h = (r ? p.delegateType : p.bindType) || h, f = u[h] || [], a = a[2] && RegExp("(^|\\.)" + d.join("\\.(?:.*\\.|)") + "(\\.|$)"), s = o = f.length;
                        while (o--) {
                            c = f[o], !i && g !== c.origType || n && n.guid !== c.guid || a && !a.test(c.namespace) || r && r !== c.selector && ("**" !== r || !c.selector) || (f.splice(o, 1), c.selector && f.delegateCount--, p.remove && p.remove.call(e, c));
                        }s && !f.length && (p.teardown && p.teardown.call(e, d, m.handle) !== !1 || x.removeEvent(e, h, m.handle), delete u[h]);
                    } else for (h in u) {
                        x.event.remove(e, h + t[l], n, r, !0);
                    }
                }x.isEmptyObject(u) && (delete m.handle, q.remove(e, "events"));
            }
        },
        trigger: function trigger(t, n, r, i) {
            var s,
                a,
                u,
                l,
                c,
                p,
                f,
                h = [r || o],
                d = y.call(t, "type") ? t.type : t,
                g = y.call(t, "namespace") ? t.namespace.split(".") : [];
            if (a = u = r = r || o, 3 !== r.nodeType && 8 !== r.nodeType && !_.test(d + x.event.triggered) && (d.indexOf(".") >= 0 && (g = d.split("."), d = g.shift(), g.sort()), c = 0 > d.indexOf(":") && "on" + d, t = t[x.expando] ? t : new x.Event(d, "object" == (typeof t === "undefined" ? "undefined" : _typeof(t)) && t), t.isTrigger = i ? 2 : 3, t.namespace = g.join("."), t.namespace_re = t.namespace ? RegExp("(^|\\.)" + g.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = undefined, t.target || (t.target = r), n = null == n ? [t] : x.makeArray(n, [t]), f = x.event.special[d] || {}, i || !f.trigger || f.trigger.apply(r, n) !== !1)) {
                if (!i && !f.noBubble && !x.isWindow(r)) {
                    for (l = f.delegateType || d, _.test(l + d) || (a = a.parentNode); a; a = a.parentNode) {
                        h.push(a), u = a;
                    }u === (r.ownerDocument || o) && h.push(u.defaultView || u.parentWindow || e);
                }
                s = 0;
                while ((a = h[s++]) && !t.isPropagationStopped()) {
                    t.type = s > 1 ? l : f.bindType || d, p = (q.get(a, "events") || {})[t.type] && q.get(a, "handle"), p && p.apply(a, n), p = c && a[c], p && x.acceptData(a) && p.apply && p.apply(a, n) === !1 && t.preventDefault();
                }return t.type = d, i || t.isDefaultPrevented() || f._default && f._default.apply(h.pop(), n) !== !1 || !x.acceptData(r) || c && x.isFunction(r[d]) && !x.isWindow(r) && (u = r[c], u && (r[c] = null), x.event.triggered = d, r[d](), x.event.triggered = undefined, u && (r[c] = u)), t.result;
            }
        },
        dispatch: function dispatch(e) {
            e = x.event.fix(e);
            var t,
                n,
                r,
                i,
                o,
                s = [],
                a = d.call(arguments),
                u = (q.get(this, "events") || {})[e.type] || [],
                l = x.event.special[e.type] || {};
            if (a[0] = e, e.delegateTarget = this, !l.preDispatch || l.preDispatch.call(this, e) !== !1) {
                s = x.event.handlers.call(this, e, u), t = 0;
                while ((i = s[t++]) && !e.isPropagationStopped()) {
                    e.currentTarget = i.elem, n = 0;
                    while ((o = i.handlers[n++]) && !e.isImmediatePropagationStopped()) {
                        (!e.namespace_re || e.namespace_re.test(o.namespace)) && (e.handleObj = o, e.data = o.data, r = ((x.event.special[o.origType] || {}).handle || o.handler).apply(i.elem, a), r !== undefined && (e.result = r) === !1 && (e.preventDefault(), e.stopPropagation()));
                    }
                }
                return l.postDispatch && l.postDispatch.call(this, e), e.result;
            }
        },
        handlers: function handlers(e, t) {
            var n,
                r,
                i,
                o,
                s = [],
                a = t.delegateCount,
                u = e.target;
            if (a && u.nodeType && (!e.button || "click" !== e.type)) for (; u !== this; u = u.parentNode || this) {
                if (u.disabled !== !0 || "click" !== e.type) {
                    for (r = [], n = 0; a > n; n++) {
                        o = t[n], i = o.selector + " ", r[i] === undefined && (r[i] = o.needsContext ? x(i, this).index(u) >= 0 : x.find(i, this, null, [u]).length), r[i] && r.push(o);
                    }r.length && s.push({
                        elem: u,
                        handlers: r
                    });
                }
            }return t.length > a && s.push({
                elem: this,
                handlers: t.slice(a)
            }), s;
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function filter(e, t) {
                return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e;
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function filter(e, t) {
                var n,
                    r,
                    i,
                    s = t.button;
                return null == e.pageX && null != t.clientX && (n = e.target.ownerDocument || o, r = n.documentElement, i = n.body, e.pageX = t.clientX + (r && r.scrollLeft || i && i.scrollLeft || 0) - (r && r.clientLeft || i && i.clientLeft || 0), e.pageY = t.clientY + (r && r.scrollTop || i && i.scrollTop || 0) - (r && r.clientTop || i && i.clientTop || 0)), e.which || s === undefined || (e.which = 1 & s ? 1 : 2 & s ? 3 : 4 & s ? 2 : 0), e;
            }
        },
        fix: function fix(e) {
            if (e[x.expando]) return e;
            var t,
                n,
                r,
                i = e.type,
                s = e,
                a = this.fixHooks[i];
            a || (this.fixHooks[i] = a = z.test(i) ? this.mouseHooks : I.test(i) ? this.keyHooks : {}), r = a.props ? this.props.concat(a.props) : this.props, e = new x.Event(s), t = r.length;
            while (t--) {
                n = r[t], e[n] = s[n];
            }return e.target || (e.target = o), 3 === e.target.nodeType && (e.target = e.target.parentNode), a.filter ? a.filter(e, s) : e;
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function trigger() {
                    return this !== V() && this.focus ? (this.focus(), !1) : undefined;
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function trigger() {
                    return this === V() && this.blur ? (this.blur(), !1) : undefined;
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function trigger() {
                    return "checkbox" === this.type && this.click && x.nodeName(this, "input") ? (this.click(), !1) : undefined;
                },
                _default: function _default(e) {
                    return x.nodeName(e.target, "a");
                }
            },
            beforeunload: {
                postDispatch: function postDispatch(e) {
                    e.result !== undefined && (e.originalEvent.returnValue = e.result);
                }
            }
        },
        simulate: function simulate(e, t, n, r) {
            var i = x.extend(new x.Event(), n, {
                type: e,
                isSimulated: !0,
                originalEvent: {}
            });
            r ? x.event.trigger(i, null, t) : x.event.dispatch.call(t, i), i.isDefaultPrevented() && n.preventDefault();
        }
    }, x.removeEvent = function (e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n, !1);
    }, x.Event = function (e, t) {
        return this instanceof x.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || e.getPreventDefault && e.getPreventDefault() ? U : Y) : this.type = e, t && x.extend(this, t), this.timeStamp = e && e.timeStamp || x.now(), this[x.expando] = !0, undefined) : new x.Event(e, t);
    }, x.Event.prototype = {
        isDefaultPrevented: Y,
        isPropagationStopped: Y,
        isImmediatePropagationStopped: Y,
        preventDefault: function preventDefault() {
            var e = this.originalEvent;
            this.isDefaultPrevented = U, e && e.preventDefault && e.preventDefault();
        },
        stopPropagation: function stopPropagation() {
            var e = this.originalEvent;
            this.isPropagationStopped = U, e && e.stopPropagation && e.stopPropagation();
        },
        stopImmediatePropagation: function stopImmediatePropagation() {
            this.isImmediatePropagationStopped = U, this.stopPropagation();
        }
    }, x.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }, function (e, t) {
        x.event.special[e] = {
            delegateType: t,
            bindType: t,
            handle: function handle(e) {
                var n,
                    r = this,
                    i = e.relatedTarget,
                    o = e.handleObj;
                return (!i || i !== r && !x.contains(r, i)) && (e.type = o.origType, n = o.handler.apply(this, arguments), e.type = t), n;
            }
        };
    }), x.support.focusinBubbles || x.each({
        focus: "focusin",
        blur: "focusout"
    }, function (e, t) {
        var n = 0,
            r = function r(e) {
            x.event.simulate(t, e.target, x.event.fix(e), !0);
        };
        x.event.special[t] = {
            setup: function setup() {
                0 === n++ && o.addEventListener(e, r, !0);
            },
            teardown: function teardown() {
                0 === --n && o.removeEventListener(e, r, !0);
            }
        };
    }), x.fn.extend({
        on: function on(e, t, n, r, i) {
            var o, s;
            if ("object" == (typeof e === "undefined" ? "undefined" : _typeof(e))) {
                "string" != typeof t && (n = n || t, t = undefined);
                for (s in e) {
                    this.on(s, t, n, e[s], i);
                }return this;
            }
            if (null == n && null == r ? (r = t, n = t = undefined) : null == r && ("string" == typeof t ? (r = n, n = undefined) : (r = n, n = t, t = undefined)), r === !1) r = Y;else if (!r) return this;
            return 1 === i && (o = r, r = function r(e) {
                return x().off(e), o.apply(this, arguments);
            }, r.guid = o.guid || (o.guid = x.guid++)), this.each(function () {
                x.event.add(this, e, r, n, t);
            });
        },
        one: function one(e, t, n, r) {
            return this.on(e, t, n, r, 1);
        },
        off: function off(e, t, n) {
            var r, i;
            if (e && e.preventDefault && e.handleObj) return r = e.handleObj, x(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;
            if ("object" == (typeof e === "undefined" ? "undefined" : _typeof(e))) {
                for (i in e) {
                    this.off(i, t, e[i]);
                }return this;
            }
            return (t === !1 || "function" == typeof t) && (n = t, t = undefined), n === !1 && (n = Y), this.each(function () {
                x.event.remove(this, e, n, t);
            });
        },
        trigger: function trigger(e, t) {
            return this.each(function () {
                x.event.trigger(e, t, this);
            });
        },
        triggerHandler: function triggerHandler(e, t) {
            var n = this[0];
            return n ? x.event.trigger(e, t, n, !0) : undefined;
        }
    });
    var G = /^.[^:#\[\.,]*$/,
        J = /^(?:parents|prev(?:Until|All))/,
        Q = x.expr.match.needsContext,
        K = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0
    };
    x.fn.extend({
        find: function find(e) {
            var t,
                n = [],
                r = this,
                i = r.length;
            if ("string" != typeof e) return this.pushStack(x(e).filter(function () {
                for (t = 0; i > t; t++) {
                    if (x.contains(r[t], this)) return !0;
                }
            }));
            for (t = 0; i > t; t++) {
                x.find(e, r[t], n);
            }return n = this.pushStack(i > 1 ? x.unique(n) : n), n.selector = this.selector ? this.selector + " " + e : e, n;
        },
        has: function has(e) {
            var t = x(e, this),
                n = t.length;
            return this.filter(function () {
                var e = 0;
                for (; n > e; e++) {
                    if (x.contains(this, t[e])) return !0;
                }
            });
        },
        not: function not(e) {
            return this.pushStack(et(this, e || [], !0));
        },
        filter: function filter(e) {
            return this.pushStack(et(this, e || [], !1));
        },
        is: function is(e) {
            return !!et(this, "string" == typeof e && Q.test(e) ? x(e) : e || [], !1).length;
        },
        closest: function closest(e, t) {
            var n,
                r = 0,
                i = this.length,
                o = [],
                s = Q.test(e) || "string" != typeof e ? x(e, t || this.context) : 0;
            for (; i > r; r++) {
                for (n = this[r]; n && n !== t; n = n.parentNode) {
                    if (11 > n.nodeType && (s ? s.index(n) > -1 : 1 === n.nodeType && x.find.matchesSelector(n, e))) {
                        n = o.push(n);
                        break;
                    }
                }
            }return this.pushStack(o.length > 1 ? x.unique(o) : o);
        },
        index: function index(e) {
            return e ? "string" == typeof e ? g.call(x(e), this[0]) : g.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
        },
        add: function add(e, t) {
            var n = "string" == typeof e ? x(e, t) : x.makeArray(e && e.nodeType ? [e] : e),
                r = x.merge(this.get(), n);
            return this.pushStack(x.unique(r));
        },
        addBack: function addBack(e) {
            return this.add(null == e ? this.prevObject : this.prevObject.filter(e));
        }
    });
    function Z(e, t) {
        while ((e = e[t]) && 1 !== e.nodeType) {}
        return e;
    }
    x.each({
        parent: function parent(e) {
            var t = e.parentNode;
            return t && 11 !== t.nodeType ? t : null;
        },
        parents: function parents(e) {
            return x.dir(e, "parentNode");
        },
        parentsUntil: function parentsUntil(e, t, n) {
            return x.dir(e, "parentNode", n);
        },
        next: function next(e) {
            return Z(e, "nextSibling");
        },
        prev: function prev(e) {
            return Z(e, "previousSibling");
        },
        nextAll: function nextAll(e) {
            return x.dir(e, "nextSibling");
        },
        prevAll: function prevAll(e) {
            return x.dir(e, "previousSibling");
        },
        nextUntil: function nextUntil(e, t, n) {
            return x.dir(e, "nextSibling", n);
        },
        prevUntil: function prevUntil(e, t, n) {
            return x.dir(e, "previousSibling", n);
        },
        siblings: function siblings(e) {
            return x.sibling((e.parentNode || {}).firstChild, e);
        },
        children: function children(e) {
            return x.sibling(e.firstChild);
        },
        contents: function contents(e) {
            return e.contentDocument || x.merge([], e.childNodes);
        }
    }, function (e, t) {
        x.fn[e] = function (n, r) {
            var i = x.map(this, t, n);
            return "Until" !== e.slice(-5) && (r = n), r && "string" == typeof r && (i = x.filter(r, i)), this.length > 1 && (K[e] || x.unique(i), J.test(e) && i.reverse()), this.pushStack(i);
        };
    }), x.extend({
        filter: function filter(e, t, n) {
            var r = t[0];
            return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === r.nodeType ? x.find.matchesSelector(r, e) ? [r] : [] : x.find.matches(e, x.grep(t, function (e) {
                return 1 === e.nodeType;
            }));
        },
        dir: function dir(e, t, n) {
            var r = [],
                i = n !== undefined;
            while ((e = e[t]) && 9 !== e.nodeType) {
                if (1 === e.nodeType) {
                    if (i && x(e).is(n)) break;
                    r.push(e);
                }
            }return r;
        },
        sibling: function sibling(e, t) {
            var n = [];
            for (; e; e = e.nextSibling) {
                1 === e.nodeType && e !== t && n.push(e);
            }return n;
        }
    });
    function et(e, t, n) {
        if (x.isFunction(t)) return x.grep(e, function (e, r) {
            return !!t.call(e, r, e) !== n;
        });
        if (t.nodeType) return x.grep(e, function (e) {
            return e === t !== n;
        });
        if ("string" == typeof t) {
            if (G.test(t)) return x.filter(t, e, n);
            t = x.filter(t, e);
        }
        return x.grep(e, function (e) {
            return g.call(t, e) >= 0 !== n;
        });
    }
    var tt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        nt = /<([\w:]+)/,
        rt = /<|&#?\w+;/,
        it = /<(?:script|style|link)/i,
        ot = /^(?:checkbox|radio)$/i,
        st = /checked\s*(?:[^=]|=\s*.checked.)/i,
        at = /^$|\/(?:java|ecma)script/i,
        ut = /^true\/(.*)/,
        lt = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
        ct = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        thead: [1, "<table>", "</table>"],
        col: [2, "<table><colgroup>", "</colgroup></table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        _default: [0, "", ""]
    };
    ct.optgroup = ct.option, ct.tbody = ct.tfoot = ct.colgroup = ct.caption = ct.thead, ct.th = ct.td, x.fn.extend({
        text: function text(e) {
            return x.access(this, function (e) {
                return e === undefined ? x.text(this) : this.empty().append((this[0] && this[0].ownerDocument || o).createTextNode(e));
            }, null, e, arguments.length);
        },
        append: function append() {
            return this.domManip(arguments, function (e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = pt(this, e);
                    t.appendChild(e);
                }
            });
        },
        prepend: function prepend() {
            return this.domManip(arguments, function (e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = pt(this, e);
                    t.insertBefore(e, t.firstChild);
                }
            });
        },
        before: function before() {
            return this.domManip(arguments, function (e) {
                this.parentNode && this.parentNode.insertBefore(e, this);
            });
        },
        after: function after() {
            return this.domManip(arguments, function (e) {
                this.parentNode && this.parentNode.insertBefore(e, this.nextSibling);
            });
        },
        remove: function remove(e, t) {
            var n,
                r = e ? x.filter(e, this) : this,
                i = 0;
            for (; null != (n = r[i]); i++) {
                t || 1 !== n.nodeType || x.cleanData(mt(n)), n.parentNode && (t && x.contains(n.ownerDocument, n) && dt(mt(n, "script")), n.parentNode.removeChild(n));
            }return this;
        },
        empty: function empty() {
            var e,
                t = 0;
            for (; null != (e = this[t]); t++) {
                1 === e.nodeType && (x.cleanData(mt(e, !1)), e.textContent = "");
            }return this;
        },
        clone: function clone(e, t) {
            return e = null == e ? !1 : e, t = null == t ? e : t, this.map(function () {
                return x.clone(this, e, t);
            });
        },
        html: function html(e) {
            return x.access(this, function (e) {
                var t = this[0] || {},
                    n = 0,
                    r = this.length;
                if (e === undefined && 1 === t.nodeType) return t.innerHTML;
                if ("string" == typeof e && !it.test(e) && !ct[(nt.exec(e) || ["", ""])[1].toLowerCase()]) {
                    e = e.replace(tt, "<$1></$2>");
                    try {
                        for (; r > n; n++) {
                            t = this[n] || {}, 1 === t.nodeType && (x.cleanData(mt(t, !1)), t.innerHTML = e);
                        }t = 0;
                    } catch (i) {}
                }
                t && this.empty().append(e);
            }, null, e, arguments.length);
        },
        replaceWith: function replaceWith() {
            var e = x.map(this, function (e) {
                return [e.nextSibling, e.parentNode];
            }),
                t = 0;
            return this.domManip(arguments, function (n) {
                var r = e[t++],
                    i = e[t++];
                i && (r && r.parentNode !== i && (r = this.nextSibling), x(this).remove(), i.insertBefore(n, r));
            }, !0), t ? this : this.remove();
        },
        detach: function detach(e) {
            return this.remove(e, !0);
        },
        domManip: function domManip(e, t, n) {
            e = f.apply([], e);
            var r,
                i,
                o,
                s,
                a,
                u,
                l = 0,
                c = this.length,
                p = this,
                h = c - 1,
                d = e[0],
                g = x.isFunction(d);
            if (g || !(1 >= c || "string" != typeof d || x.support.checkClone) && st.test(d)) return this.each(function (r) {
                var i = p.eq(r);
                g && (e[0] = d.call(this, r, i.html())), i.domManip(e, t, n);
            });
            if (c && (r = x.buildFragment(e, this[0].ownerDocument, !1, !n && this), i = r.firstChild, 1 === r.childNodes.length && (r = i), i)) {
                for (o = x.map(mt(r, "script"), ft), s = o.length; c > l; l++) {
                    a = r, l !== h && (a = x.clone(a, !0, !0), s && x.merge(o, mt(a, "script"))), t.call(this[l], a, l);
                }if (s) for (u = o[o.length - 1].ownerDocument, x.map(o, ht), l = 0; s > l; l++) {
                    a = o[l], at.test(a.type || "") && !q.access(a, "globalEval") && x.contains(u, a) && (a.src ? x._evalUrl(a.src) : x.globalEval(a.textContent.replace(lt, "")));
                }
            }
            return this;
        }
    }), x.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function (e, t) {
        x.fn[e] = function (e) {
            var n,
                r = [],
                i = x(e),
                o = i.length - 1,
                s = 0;
            for (; o >= s; s++) {
                n = s === o ? this : this.clone(!0), x(i[s])[t](n), h.apply(r, n.get());
            }return this.pushStack(r);
        };
    }), x.extend({
        clone: function clone(e, t, n) {
            var r,
                i,
                o,
                s,
                a = e.cloneNode(!0),
                u = x.contains(e.ownerDocument, e);
            if (!(x.support.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || x.isXMLDoc(e))) for (s = mt(a), o = mt(e), r = 0, i = o.length; i > r; r++) {
                yt(o[r], s[r]);
            }if (t) if (n) for (o = o || mt(e), s = s || mt(a), r = 0, i = o.length; i > r; r++) {
                gt(o[r], s[r]);
            } else gt(e, a);
            return s = mt(a, "script"), s.length > 0 && dt(s, !u && mt(e, "script")), a;
        },
        buildFragment: function buildFragment(e, t, n, r) {
            var i,
                o,
                s,
                a,
                u,
                l,
                c = 0,
                p = e.length,
                f = t.createDocumentFragment(),
                h = [];
            for (; p > c; c++) {
                if (i = e[c], i || 0 === i) if ("object" === x.type(i)) x.merge(h, i.nodeType ? [i] : i);else if (rt.test(i)) {
                    o = o || f.appendChild(t.createElement("div")), s = (nt.exec(i) || ["", ""])[1].toLowerCase(), a = ct[s] || ct._default, o.innerHTML = a[1] + i.replace(tt, "<$1></$2>") + a[2], l = a[0];
                    while (l--) {
                        o = o.lastChild;
                    }x.merge(h, o.childNodes), o = f.firstChild, o.textContent = "";
                } else h.push(t.createTextNode(i));
            }f.textContent = "", c = 0;
            while (i = h[c++]) {
                if ((!r || -1 === x.inArray(i, r)) && (u = x.contains(i.ownerDocument, i), o = mt(f.appendChild(i), "script"), u && dt(o), n)) {
                    l = 0;
                    while (i = o[l++]) {
                        at.test(i.type || "") && n.push(i);
                    }
                }
            }return f;
        },
        cleanData: function cleanData(e) {
            var t,
                n,
                r,
                i,
                o,
                s,
                a = x.event.special,
                u = 0;
            for (; (n = e[u]) !== undefined; u++) {
                if (F.accepts(n) && (o = n[q.expando], o && (t = q.cache[o]))) {
                    if (r = Object.keys(t.events || {}), r.length) for (s = 0; (i = r[s]) !== undefined; s++) {
                        a[i] ? x.event.remove(n, i) : x.removeEvent(n, i, t.handle);
                    }q.cache[o] && delete q.cache[o];
                }
                delete L.cache[n[L.expando]];
            }
        },
        _evalUrl: function _evalUrl(e) {
            return x.ajax({
                url: e,
                type: "GET",
                dataType: "script",
                async: !1,
                global: !1,
                throws: !0
            });
        }
    });
    function pt(e, t) {
        return x.nodeName(e, "table") && x.nodeName(1 === t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e;
    }
    function ft(e) {
        return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e;
    }
    function ht(e) {
        var t = ut.exec(e.type);
        return t ? e.type = t[1] : e.removeAttribute("type"), e;
    }
    function dt(e, t) {
        var n = e.length,
            r = 0;
        for (; n > r; r++) {
            q.set(e[r], "globalEval", !t || q.get(t[r], "globalEval"));
        }
    }
    function gt(e, t) {
        var n, r, i, o, s, a, u, l;
        if (1 === t.nodeType) {
            if (q.hasData(e) && (o = q.access(e), s = q.set(t, o), l = o.events)) {
                delete s.handle, s.events = {};
                for (i in l) {
                    for (n = 0, r = l[i].length; r > n; n++) {
                        x.event.add(t, i, l[i][n]);
                    }
                }
            }
            L.hasData(e) && (a = L.access(e), u = x.extend({}, a), L.set(t, u));
        }
    }
    function mt(e, t) {
        var n = e.getElementsByTagName ? e.getElementsByTagName(t || "*") : e.querySelectorAll ? e.querySelectorAll(t || "*") : [];
        return t === undefined || t && x.nodeName(e, t) ? x.merge([e], n) : n;
    }
    function yt(e, t) {
        var n = t.nodeName.toLowerCase();
        "input" === n && ot.test(e.type) ? t.checked = e.checked : ("input" === n || "textarea" === n) && (t.defaultValue = e.defaultValue);
    }
    x.fn.extend({
        wrapAll: function wrapAll(e) {
            var t;
            return x.isFunction(e) ? this.each(function (t) {
                x(this).wrapAll(e.call(this, t));
            }) : (this[0] && (t = x(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map(function () {
                var e = this;
                while (e.firstElementChild) {
                    e = e.firstElementChild;
                }return e;
            }).append(this)), this);
        },
        wrapInner: function wrapInner(e) {
            return x.isFunction(e) ? this.each(function (t) {
                x(this).wrapInner(e.call(this, t));
            }) : this.each(function () {
                var t = x(this),
                    n = t.contents();
                n.length ? n.wrapAll(e) : t.append(e);
            });
        },
        wrap: function wrap(e) {
            var t = x.isFunction(e);
            return this.each(function (n) {
                x(this).wrapAll(t ? e.call(this, n) : e);
            });
        },
        unwrap: function unwrap() {
            return this.parent().each(function () {
                x.nodeName(this, "body") || x(this).replaceWith(this.childNodes);
            }).end();
        }
    });
    var vt,
        xt,
        bt = /^(none|table(?!-c[ea]).+)/,
        wt = /^margin/,
        Tt = RegExp("^(" + b + ")(.*)$", "i"),
        Ct = RegExp("^(" + b + ")(?!px)[a-z%]+$", "i"),
        kt = RegExp("^([+-])=(" + b + ")", "i"),
        Nt = {
        BODY: "block"
    },
        Et = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    },
        St = {
        letterSpacing: 0,
        fontWeight: 400
    },
        jt = ["Top", "Right", "Bottom", "Left"],
        Dt = ["Webkit", "O", "Moz", "ms"];
    function At(e, t) {
        if (t in e) return t;
        var n = t.charAt(0).toUpperCase() + t.slice(1),
            r = t,
            i = Dt.length;
        while (i--) {
            if (t = Dt[i] + n, t in e) return t;
        }return r;
    }
    function Lt(e, t) {
        return e = t || e, "none" === x.css(e, "display") || !x.contains(e.ownerDocument, e);
    }
    function qt(t) {
        return e.getComputedStyle(t, null);
    }
    function Ht(e, t) {
        var n,
            r,
            i,
            o = [],
            s = 0,
            a = e.length;
        for (; a > s; s++) {
            r = e[s], r.style && (o[s] = q.get(r, "olddisplay"), n = r.style.display, t ? (o[s] || "none" !== n || (r.style.display = ""), "" === r.style.display && Lt(r) && (o[s] = q.access(r, "olddisplay", Rt(r.nodeName)))) : o[s] || (i = Lt(r), (n && "none" !== n || !i) && q.set(r, "olddisplay", i ? n : x.css(r, "display"))));
        }for (s = 0; a > s; s++) {
            r = e[s], r.style && (t && "none" !== r.style.display && "" !== r.style.display || (r.style.display = t ? o[s] || "" : "none"));
        }return e;
    }
    x.fn.extend({
        css: function css(e, t) {
            return x.access(this, function (e, t, n) {
                var r,
                    i,
                    o = {},
                    s = 0;
                if (x.isArray(t)) {
                    for (r = qt(e), i = t.length; i > s; s++) {
                        o[t[s]] = x.css(e, t[s], !1, r);
                    }return o;
                }
                return n !== undefined ? x.style(e, t, n) : x.css(e, t);
            }, e, t, arguments.length > 1);
        },
        show: function show() {
            return Ht(this, !0);
        },
        hide: function hide() {
            return Ht(this);
        },
        toggle: function toggle(e) {
            return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function () {
                Lt(this) ? x(this).show() : x(this).hide();
            });
        }
    }), x.extend({
        cssHooks: {
            opacity: {
                get: function get(e, t) {
                    if (t) {
                        var n = vt(e, "opacity");
                        return "" === n ? "1" : n;
                    }
                }
            }
        },
        cssNumber: {
            columnCount: !0,
            fillOpacity: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            float: "cssFloat"
        },
        style: function style(e, t, n, r) {
            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                var i,
                    o,
                    s,
                    a = x.camelCase(t),
                    u = e.style;
                return t = x.cssProps[a] || (x.cssProps[a] = At(u, a)), s = x.cssHooks[t] || x.cssHooks[a], n === undefined ? s && "get" in s && (i = s.get(e, !1, r)) !== undefined ? i : u[t] : (o = typeof n === "undefined" ? "undefined" : _typeof(n), "string" === o && (i = kt.exec(n)) && (n = (i[1] + 1) * i[2] + parseFloat(x.css(e, t)), o = "number"), null == n || "number" === o && isNaN(n) || ("number" !== o || x.cssNumber[a] || (n += "px"), x.support.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (u[t] = "inherit"), s && "set" in s && (n = s.set(e, n, r)) === undefined || (u[t] = n)), undefined);
            }
        },
        css: function css(e, t, n, r) {
            var i,
                o,
                s,
                a = x.camelCase(t);
            return t = x.cssProps[a] || (x.cssProps[a] = At(e.style, a)), s = x.cssHooks[t] || x.cssHooks[a], s && "get" in s && (i = s.get(e, !0, n)), i === undefined && (i = vt(e, t, r)), "normal" === i && t in St && (i = St[t]), "" === n || n ? (o = parseFloat(i), n === !0 || x.isNumeric(o) ? o || 0 : i) : i;
        }
    }), vt = function vt(e, t, n) {
        var r,
            i,
            o,
            s = n || qt(e),
            a = s ? s.getPropertyValue(t) || s[t] : undefined,
            u = e.style;
        return s && ("" !== a || x.contains(e.ownerDocument, e) || (a = x.style(e, t)), Ct.test(a) && wt.test(t) && (r = u.width, i = u.minWidth, o = u.maxWidth, u.minWidth = u.maxWidth = u.width = a, a = s.width, u.width = r, u.minWidth = i, u.maxWidth = o)), a;
    };
    function Ot(e, t, n) {
        var r = Tt.exec(t);
        return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : t;
    }
    function Ft(e, t, n, r, i) {
        var o = n === (r ? "border" : "content") ? 4 : "width" === t ? 1 : 0,
            s = 0;
        for (; 4 > o; o += 2) {
            "margin" === n && (s += x.css(e, n + jt[o], !0, i)), r ? ("content" === n && (s -= x.css(e, "padding" + jt[o], !0, i)), "margin" !== n && (s -= x.css(e, "border" + jt[o] + "Width", !0, i))) : (s += x.css(e, "padding" + jt[o], !0, i), "padding" !== n && (s += x.css(e, "border" + jt[o] + "Width", !0, i)));
        }return s;
    }
    function Pt(e, t, n) {
        var r = !0,
            i = "width" === t ? e.offsetWidth : e.offsetHeight,
            o = qt(e),
            s = x.support.boxSizing && "border-box" === x.css(e, "boxSizing", !1, o);
        if (0 >= i || null == i) {
            if (i = vt(e, t, o), (0 > i || null == i) && (i = e.style[t]), Ct.test(i)) return i;
            r = s && (x.support.boxSizingReliable || i === e.style[t]), i = parseFloat(i) || 0;
        }
        return i + Ft(e, t, n || (s ? "border" : "content"), r, o) + "px";
    }
    function Rt(e) {
        var t = o,
            n = Nt[e];
        return n || (n = Mt(e, t), "none" !== n && n || (xt = (xt || x("<iframe frameborder='0' width='0' height='0'/>").css("cssText", "display:block !important")).appendTo(t.documentElement), t = (xt[0].contentWindow || xt[0].contentDocument).document, t.write("<!doctype html><html><body>"), t.close(), n = Mt(e, t), xt.detach()), Nt[e] = n), n;
    }
    function Mt(e, t) {
        var n = x(t.createElement(e)).appendTo(t.body),
            r = x.css(n[0], "display");
        return n.remove(), r;
    }
    x.each(["height", "width"], function (e, t) {
        x.cssHooks[t] = {
            get: function get(e, n, r) {
                return n ? 0 === e.offsetWidth && bt.test(x.css(e, "display")) ? x.swap(e, Et, function () {
                    return Pt(e, t, r);
                }) : Pt(e, t, r) : undefined;
            },
            set: function set(e, n, r) {
                var i = r && qt(e);
                return Ot(e, n, r ? Ft(e, t, r, x.support.boxSizing && "border-box" === x.css(e, "boxSizing", !1, i), i) : 0);
            }
        };
    }), x(function () {
        x.support.reliableMarginRight || (x.cssHooks.marginRight = {
            get: function get(e, t) {
                return t ? x.swap(e, {
                    display: "inline-block"
                }, vt, [e, "marginRight"]) : undefined;
            }
        }), !x.support.pixelPosition && x.fn.position && x.each(["top", "left"], function (e, t) {
            x.cssHooks[t] = {
                get: function get(e, n) {
                    return n ? (n = vt(e, t), Ct.test(n) ? x(e).position()[t] + "px" : n) : undefined;
                }
            };
        });
    }), x.expr && x.expr.filters && (x.expr.filters.hidden = function (e) {
        return 0 >= e.offsetWidth && 0 >= e.offsetHeight;
    }, x.expr.filters.visible = function (e) {
        return !x.expr.filters.hidden(e);
    }), x.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function (e, t) {
        x.cssHooks[e + t] = {
            expand: function expand(n) {
                var r = 0,
                    i = {},
                    o = "string" == typeof n ? n.split(" ") : [n];
                for (; 4 > r; r++) {
                    i[e + jt[r] + t] = o[r] || o[r - 2] || o[0];
                }return i;
            }
        }, wt.test(e) || (x.cssHooks[e + t].set = Ot);
    });
    var Wt = /%20/g,
        $t = /\[\]$/,
        Bt = /\r?\n/g,
        It = /^(?:submit|button|image|reset|file)$/i,
        zt = /^(?:input|select|textarea|keygen)/i;
    x.fn.extend({
        serialize: function serialize() {
            return x.param(this.serializeArray());
        },
        serializeArray: function serializeArray() {
            return this.map(function () {
                var e = x.prop(this, "elements");
                return e ? x.makeArray(e) : this;
            }).filter(function () {
                var e = this.type;
                return this.name && !x(this).is(":disabled") && zt.test(this.nodeName) && !It.test(e) && (this.checked || !ot.test(e));
            }).map(function (e, t) {
                var n = x(this).val();
                return null == n ? null : x.isArray(n) ? x.map(n, function (e) {
                    return {
                        name: t.name,
                        value: e.replace(Bt, "\r\n")
                    };
                }) : {
                    name: t.name,
                    value: n.replace(Bt, "\r\n")
                };
            }).get();
        }
    }), x.param = function (e, t) {
        var n,
            r = [],
            i = function i(e, t) {
            t = x.isFunction(t) ? t() : null == t ? "" : t, r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t);
        };
        if (t === undefined && (t = x.ajaxSettings && x.ajaxSettings.traditional), x.isArray(e) || e.jquery && !x.isPlainObject(e)) x.each(e, function () {
            i(this.name, this.value);
        });else for (n in e) {
            _t(n, e[n], t, i);
        }return r.join("&").replace(Wt, "+");
    };
    function _t(e, t, n, r) {
        var i;
        if (x.isArray(t)) x.each(t, function (t, i) {
            n || $t.test(e) ? r(e, i) : _t(e + "[" + ("object" == (typeof i === "undefined" ? "undefined" : _typeof(i)) ? t : "") + "]", i, n, r);
        });else if (n || "object" !== x.type(t)) r(e, t);else for (i in t) {
            _t(e + "[" + i + "]", t[i], n, r);
        }
    }
    x.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (e, t) {
        x.fn[t] = function (e, n) {
            return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t);
        };
    }), x.fn.extend({
        hover: function hover(e, t) {
            return this.mouseenter(e).mouseleave(t || e);
        },
        bind: function bind(e, t, n) {
            return this.on(e, null, t, n);
        },
        unbind: function unbind(e, t) {
            return this.off(e, null, t);
        },
        delegate: function delegate(e, t, n, r) {
            return this.on(t, e, n, r);
        },
        undelegate: function undelegate(e, t, n) {
            return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n);
        }
    });
    var Xt,
        Ut,
        Yt = x.now(),
        Vt = /\?/,
        Gt = /#.*$/,
        Jt = /([?&])_=[^&]*/,
        Qt = /^(.*?):[ \t]*([^\r\n]*)$/gm,
        Kt = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
        Zt = /^(?:GET|HEAD)$/,
        en = /^\/\//,
        tn = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
        nn = x.fn.load,
        rn = {},
        on = {},
        sn = "*/".concat("*");
    try {
        Ut = i.href;
    } catch (an) {
        Ut = o.createElement("a"), Ut.href = "", Ut = Ut.href;
    }
    Xt = tn.exec(Ut.toLowerCase()) || [];
    function un(e) {
        return function (t, n) {
            "string" != typeof t && (n = t, t = "*");
            var r,
                i = 0,
                o = t.toLowerCase().match(w) || [];
            if (x.isFunction(n)) while (r = o[i++]) {
                "+" === r[0] ? (r = r.slice(1) || "*", (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n);
            }
        };
    }
    function ln(e, t, n, r) {
        var i = {},
            o = e === on;
        function s(a) {
            var u;
            return i[a] = !0, x.each(e[a] || [], function (e, a) {
                var l = a(t, n, r);
                return "string" != typeof l || o || i[l] ? o ? !(u = l) : undefined : (t.dataTypes.unshift(l), s(l), !1);
            }), u;
        }
        return s(t.dataTypes[0]) || !i["*"] && s("*");
    }
    function cn(e, t) {
        var n,
            r,
            i = x.ajaxSettings.flatOptions || {};
        for (n in t) {
            t[n] !== undefined && ((i[n] ? e : r || (r = {}))[n] = t[n]);
        }return r && x.extend(!0, e, r), e;
    }
    x.fn.load = function (e, t, n) {
        if ("string" != typeof e && nn) return nn.apply(this, arguments);
        var r,
            i,
            o,
            s = this,
            a = e.indexOf(" ");
        return a >= 0 && (r = e.slice(a), e = e.slice(0, a)), x.isFunction(t) ? (n = t, t = undefined) : t && "object" == (typeof t === "undefined" ? "undefined" : _typeof(t)) && (i = "POST"), s.length > 0 && x.ajax({
            url: e,
            type: i,
            dataType: "html",
            data: t
        }).done(function (e) {
            o = arguments, s.html(r ? x("<div>").append(x.parseHTML(e)).find(r) : e);
        }).complete(n && function (e, t) {
            s.each(n, o || [e.responseText, t, e]);
        }), this;
    }, x.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (e, t) {
        x.fn[t] = function (e) {
            return this.on(t, e);
        };
    }), x.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: Ut,
            type: "GET",
            isLocal: Kt.test(Xt[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": sn,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": x.parseJSON,
                "text xml": x.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function ajaxSetup(e, t) {
            return t ? cn(cn(e, x.ajaxSettings), t) : cn(x.ajaxSettings, e);
        },
        ajaxPrefilter: un(rn),
        ajaxTransport: un(on),
        ajax: function ajax(e, t) {
            "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) && (t = e, e = undefined), t = t || {};
            var n,
                r,
                i,
                o,
                s,
                a,
                u,
                l,
                c = x.ajaxSetup({}, t),
                p = c.context || c,
                f = c.context && (p.nodeType || p.jquery) ? x(p) : x.event,
                h = x.Deferred(),
                d = x.Callbacks("once memory"),
                g = c.statusCode || {},
                m = {},
                y = {},
                v = 0,
                b = "canceled",
                T = {
                readyState: 0,
                getResponseHeader: function getResponseHeader(e) {
                    var t;
                    if (2 === v) {
                        if (!o) {
                            o = {};
                            while (t = Qt.exec(i)) {
                                o[t[1].toLowerCase()] = t[2];
                            }
                        }
                        t = o[e.toLowerCase()];
                    }
                    return null == t ? null : t;
                },
                getAllResponseHeaders: function getAllResponseHeaders() {
                    return 2 === v ? i : null;
                },
                setRequestHeader: function setRequestHeader(e, t) {
                    var n = e.toLowerCase();
                    return v || (e = y[n] = y[n] || e, m[e] = t), this;
                },
                overrideMimeType: function overrideMimeType(e) {
                    return v || (c.mimeType = e), this;
                },
                statusCode: function statusCode(e) {
                    var t;
                    if (e) if (2 > v) for (t in e) {
                        g[t] = [g[t], e[t]];
                    } else T.always(e[T.status]);
                    return this;
                },
                abort: function abort(e) {
                    var t = e || b;
                    return n && n.abort(t), k(0, t), this;
                }
            };
            if (h.promise(T).complete = d.add, T.success = T.done, T.error = T.fail, c.url = ((e || c.url || Ut) + "").replace(Gt, "").replace(en, Xt[1] + "//"), c.type = t.method || t.type || c.method || c.type, c.dataTypes = x.trim(c.dataType || "*").toLowerCase().match(w) || [""], null == c.crossDomain && (a = tn.exec(c.url.toLowerCase()), c.crossDomain = !(!a || a[1] === Xt[1] && a[2] === Xt[2] && (a[3] || ("http:" === a[1] ? "80" : "443")) === (Xt[3] || ("http:" === Xt[1] ? "80" : "443")))), c.data && c.processData && "string" != typeof c.data && (c.data = x.param(c.data, c.traditional)), ln(rn, c, t, T), 2 === v) return T;
            u = c.global, u && 0 === x.active++ && x.event.trigger("ajaxStart"), c.type = c.type.toUpperCase(), c.hasContent = !Zt.test(c.type), r = c.url, c.hasContent || (c.data && (r = c.url += (Vt.test(r) ? "&" : "?") + c.data, delete c.data), c.cache === !1 && (c.url = Jt.test(r) ? r.replace(Jt, "$1_=" + Yt++) : r + (Vt.test(r) ? "&" : "?") + "_=" + Yt++)), c.ifModified && (x.lastModified[r] && T.setRequestHeader("If-Modified-Since", x.lastModified[r]), x.etag[r] && T.setRequestHeader("If-None-Match", x.etag[r])), (c.data && c.hasContent && c.contentType !== !1 || t.contentType) && T.setRequestHeader("Content-Type", c.contentType), T.setRequestHeader("Accept", c.dataTypes[0] && c.accepts[c.dataTypes[0]] ? c.accepts[c.dataTypes[0]] + ("*" !== c.dataTypes[0] ? ", " + sn + "; q=0.01" : "") : c.accepts["*"]);
            for (l in c.headers) {
                T.setRequestHeader(l, c.headers[l]);
            }if (c.beforeSend && (c.beforeSend.call(p, T, c) === !1 || 2 === v)) return T.abort();
            b = "abort";
            for (l in {
                success: 1,
                error: 1,
                complete: 1
            }) {
                T[l](c[l]);
            }if (n = ln(on, c, t, T)) {
                T.readyState = 1, u && f.trigger("ajaxSend", [T, c]), c.async && c.timeout > 0 && (s = setTimeout(function () {
                    T.abort("timeout");
                }, c.timeout));
                try {
                    v = 1, n.send(m, k);
                } catch (C) {
                    if (!(2 > v)) throw C;
                    k(-1, C);
                }
            } else k(-1, "No Transport");
            function k(e, t, o, a) {
                var l,
                    m,
                    y,
                    b,
                    w,
                    C = t;
                2 !== v && (v = 2, s && clearTimeout(s), n = undefined, i = a || "", T.readyState = e > 0 ? 4 : 0, l = e >= 200 && 300 > e || 304 === e, o && (b = pn(c, T, o)), b = fn(c, b, T, l), l ? (c.ifModified && (w = T.getResponseHeader("Last-Modified"), w && (x.lastModified[r] = w), w = T.getResponseHeader("etag"), w && (x.etag[r] = w)), 204 === e || "HEAD" === c.type ? C = "nocontent" : 304 === e ? C = "notmodified" : (C = b.state, m = b.data, y = b.error, l = !y)) : (y = C, (e || !C) && (C = "error", 0 > e && (e = 0))), T.status = e, T.statusText = (t || C) + "", l ? h.resolveWith(p, [m, C, T]) : h.rejectWith(p, [T, C, y]), T.statusCode(g), g = undefined, u && f.trigger(l ? "ajaxSuccess" : "ajaxError", [T, c, l ? m : y]), d.fireWith(p, [T, C]), u && (f.trigger("ajaxComplete", [T, c]), --x.active || x.event.trigger("ajaxStop")));
            }
            return T;
        },
        getJSON: function getJSON(e, t, n) {
            return x.get(e, t, n, "json");
        },
        getScript: function getScript(e, t) {
            return x.get(e, undefined, t, "script");
        }
    }), x.each(["get", "post"], function (e, t) {
        x[t] = function (e, n, r, i) {
            return x.isFunction(n) && (i = i || r, r = n, n = undefined), x.ajax({
                url: e,
                type: t,
                dataType: i,
                data: n,
                success: r
            });
        };
    });
    function pn(e, t, n) {
        var r,
            i,
            o,
            s,
            a = e.contents,
            u = e.dataTypes;
        while ("*" === u[0]) {
            u.shift(), r === undefined && (r = e.mimeType || t.getResponseHeader("Content-Type"));
        }if (r) for (i in a) {
            if (a[i] && a[i].test(r)) {
                u.unshift(i);
                break;
            }
        }if (u[0] in n) o = u[0];else {
            for (i in n) {
                if (!u[0] || e.converters[i + " " + u[0]]) {
                    o = i;
                    break;
                }
                s || (s = i);
            }
            o = o || s;
        }
        return o ? (o !== u[0] && u.unshift(o), n[o]) : undefined;
    }
    function fn(e, t, n, r) {
        var i,
            o,
            s,
            a,
            u,
            l = {},
            c = e.dataTypes.slice();
        if (c[1]) for (s in e.converters) {
            l[s.toLowerCase()] = e.converters[s];
        }o = c.shift();
        while (o) {
            if (e.responseFields[o] && (n[e.responseFields[o]] = t), !u && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), u = o, o = c.shift()) if ("*" === o) o = u;else if ("*" !== u && u !== o) {
                if (s = l[u + " " + o] || l["* " + o], !s) for (i in l) {
                    if (a = i.split(" "), a[1] === o && (s = l[u + " " + a[0]] || l["* " + a[0]])) {
                        s === !0 ? s = l[i] : l[i] !== !0 && (o = a[0], c.unshift(a[1]));
                        break;
                    }
                }if (s !== !0) if (s && e["throws"]) t = s(t);else try {
                    t = s(t);
                } catch (p) {
                    return {
                        state: "parsererror",
                        error: s ? p : "No conversion from " + u + " to " + o
                    };
                }
            }
        }return {
            state: "success",
            data: t
        };
    }
    x.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function textScript(e) {
                return x.globalEval(e), e;
            }
        }
    }), x.ajaxPrefilter("script", function (e) {
        e.cache === undefined && (e.cache = !1), e.crossDomain && (e.type = "GET");
    }), x.ajaxTransport("script", function (e) {
        if (e.crossDomain) {
            var t, _n;
            return {
                send: function send(r, i) {
                    t = x("<script>").prop({
                        async: !0,
                        charset: e.scriptCharset,
                        src: e.url
                    }).on("load error", _n = function n(e) {
                        t.remove(), _n = null, e && i("error" === e.type ? 404 : 200, e.type);
                    }), o.head.appendChild(t[0]);
                },
                abort: function abort() {
                    _n && _n();
                }
            };
        }
    });
    var hn = [],
        dn = /(=)\?(?=&|$)|\?\?/;
    x.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function jsonpCallback() {
            var e = hn.pop() || x.expando + "_" + Yt++;
            return this[e] = !0, e;
        }
    }), x.ajaxPrefilter("json jsonp", function (t, n, r) {
        var i,
            o,
            s,
            a = t.jsonp !== !1 && (dn.test(t.url) ? "url" : "string" == typeof t.data && !(t.contentType || "").indexOf("application/x-www-form-urlencoded") && dn.test(t.data) && "data");
        return a || "jsonp" === t.dataTypes[0] ? (i = t.jsonpCallback = x.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, a ? t[a] = t[a].replace(dn, "$1" + i) : t.jsonp !== !1 && (t.url += (Vt.test(t.url) ? "&" : "?") + t.jsonp + "=" + i), t.converters["script json"] = function () {
            return s || x.error(i + " was not called"), s[0];
        }, t.dataTypes[0] = "json", o = e[i], e[i] = function () {
            s = arguments;
        }, r.always(function () {
            e[i] = o, t[i] && (t.jsonpCallback = n.jsonpCallback, hn.push(i)), s && x.isFunction(o) && o(s[0]), s = o = undefined;
        }), "script") : undefined;
    }), x.ajaxSettings.xhr = function () {
        try {
            return new XMLHttpRequest();
        } catch (e) {}
    };
    var gn = x.ajaxSettings.xhr(),
        mn = {
        0: 200,
        1223: 204
    },
        yn = 0,
        vn = {};
    e.ActiveXObject && x(e).on("unload", function () {
        for (var e in vn) {
            vn[e]();
        }vn = undefined;
    }), x.support.cors = !!gn && "withCredentials" in gn, x.support.ajax = gn = !!gn, x.ajaxTransport(function (e) {
        var _t3;
        return x.support.cors || gn && !e.crossDomain ? {
            send: function send(n, r) {
                var i,
                    o,
                    s = e.xhr();
                if (s.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields) for (i in e.xhrFields) {
                    s[i] = e.xhrFields[i];
                }e.mimeType && s.overrideMimeType && s.overrideMimeType(e.mimeType), e.crossDomain || n["X-Requested-With"] || (n["X-Requested-With"] = "XMLHttpRequest");
                for (i in n) {
                    s.setRequestHeader(i, n[i]);
                }_t3 = function t(e) {
                    return function () {
                        _t3 && (delete vn[o], _t3 = s.onload = s.onerror = null, "abort" === e ? s.abort() : "error" === e ? r(s.status || 404, s.statusText) : r(mn[s.status] || s.status, s.statusText, "string" == typeof s.responseText ? {
                            text: s.responseText
                        } : undefined, s.getAllResponseHeaders()));
                    };
                }, s.onload = _t3(), s.onerror = _t3("error"), _t3 = vn[o = yn++] = _t3("abort"), s.send(e.hasContent && e.data || null);
            },
            abort: function abort() {
                _t3 && _t3();
            }
        } : undefined;
    });
    var xn,
        bn,
        wn = /^(?:toggle|show|hide)$/,
        Tn = RegExp("^(?:([+-])=|)(" + b + ")([a-z%]*)$", "i"),
        Cn = /queueHooks$/,
        kn = [An],
        Nn = {
        "*": [function (e, t) {
            var n = this.createTween(e, t),
                r = n.cur(),
                i = Tn.exec(t),
                o = i && i[3] || (x.cssNumber[e] ? "" : "px"),
                s = (x.cssNumber[e] || "px" !== o && +r) && Tn.exec(x.css(n.elem, e)),
                a = 1,
                u = 20;
            if (s && s[3] !== o) {
                o = o || s[3], i = i || [], s = +r || 1;
                do {
                    a = a || ".5", s /= a, x.style(n.elem, e, s + o);
                } while (a !== (a = n.cur() / r) && 1 !== a && --u);
            }
            return i && (s = n.start = +s || +r || 0, n.unit = o, n.end = i[1] ? s + (i[1] + 1) * i[2] : +i[2]), n;
        }]
    };
    function En() {
        return setTimeout(function () {
            xn = undefined;
        }), xn = x.now();
    }
    function Sn(e, t, n) {
        var r,
            i = (Nn[t] || []).concat(Nn["*"]),
            o = 0,
            s = i.length;
        for (; s > o; o++) {
            if (r = i[o].call(n, t, e)) return r;
        }
    }
    function jn(e, t, n) {
        var r,
            i,
            o = 0,
            s = kn.length,
            a = x.Deferred().always(function () {
            delete u.elem;
        }),
            u = function u() {
            if (i) return !1;
            var t = xn || En(),
                n = Math.max(0, l.startTime + l.duration - t),
                r = n / l.duration || 0,
                o = 1 - r,
                s = 0,
                u = l.tweens.length;
            for (; u > s; s++) {
                l.tweens[s].run(o);
            }return a.notifyWith(e, [l, o, n]), 1 > o && u ? n : (a.resolveWith(e, [l]), !1);
        },
            l = a.promise({
            elem: e,
            props: x.extend({}, t),
            opts: x.extend(!0, {
                specialEasing: {}
            }, n),
            originalProperties: t,
            originalOptions: n,
            startTime: xn || En(),
            duration: n.duration,
            tweens: [],
            createTween: function createTween(t, n) {
                var r = x.Tween(e, l.opts, t, n, l.opts.specialEasing[t] || l.opts.easing);
                return l.tweens.push(r), r;
            },
            stop: function stop(t) {
                var n = 0,
                    r = t ? l.tweens.length : 0;
                if (i) return this;
                for (i = !0; r > n; n++) {
                    l.tweens[n].run(1);
                }return t ? a.resolveWith(e, [l, t]) : a.rejectWith(e, [l, t]), this;
            }
        }),
            c = l.props;
        for (Dn(c, l.opts.specialEasing); s > o; o++) {
            if (r = kn[o].call(l, e, c, l.opts)) return r;
        }return x.map(c, Sn, l), x.isFunction(l.opts.start) && l.opts.start.call(e, l), x.fx.timer(x.extend(u, {
            elem: e,
            anim: l,
            queue: l.opts.queue
        })), l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always);
    }
    function Dn(e, t) {
        var n, r, i, o, s;
        for (n in e) {
            if (r = x.camelCase(n), i = t[r], o = e[n], x.isArray(o) && (i = o[1], o = e[n] = o[0]), n !== r && (e[r] = o, delete e[n]), s = x.cssHooks[r], s && "expand" in s) {
                o = s.expand(o), delete e[r];
                for (n in o) {
                    n in e || (e[n] = o[n], t[n] = i);
                }
            } else t[r] = i;
        }
    }
    x.Animation = x.extend(jn, {
        tweener: function tweener(e, t) {
            x.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");
            var n,
                r = 0,
                i = e.length;
            for (; i > r; r++) {
                n = e[r], Nn[n] = Nn[n] || [], Nn[n].unshift(t);
            }
        },
        prefilter: function prefilter(e, t) {
            t ? kn.unshift(e) : kn.push(e);
        }
    });
    function An(e, t, n) {
        var r,
            i,
            o,
            s,
            a,
            u,
            l = this,
            c = {},
            p = e.style,
            f = e.nodeType && Lt(e),
            h = q.get(e, "fxshow");
        n.queue || (a = x._queueHooks(e, "fx"), null == a.unqueued && (a.unqueued = 0, u = a.empty.fire, a.empty.fire = function () {
            a.unqueued || u();
        }), a.unqueued++, l.always(function () {
            l.always(function () {
                a.unqueued--, x.queue(e, "fx").length || a.empty.fire();
            });
        })), 1 === e.nodeType && ("height" in t || "width" in t) && (n.overflow = [p.overflow, p.overflowX, p.overflowY], "inline" === x.css(e, "display") && "none" === x.css(e, "float") && (p.display = "inline-block")), n.overflow && (p.overflow = "hidden", l.always(function () {
            p.overflow = n.overflow[0], p.overflowX = n.overflow[1], p.overflowY = n.overflow[2];
        }));
        for (r in t) {
            if (i = t[r], wn.exec(i)) {
                if (delete t[r], o = o || "toggle" === i, i === (f ? "hide" : "show")) {
                    if ("show" !== i || !h || h[r] === undefined) continue;
                    f = !0;
                }
                c[r] = h && h[r] || x.style(e, r);
            }
        }if (!x.isEmptyObject(c)) {
            h ? "hidden" in h && (f = h.hidden) : h = q.access(e, "fxshow", {}), o && (h.hidden = !f), f ? x(e).show() : l.done(function () {
                x(e).hide();
            }), l.done(function () {
                var t;
                q.remove(e, "fxshow");
                for (t in c) {
                    x.style(e, t, c[t]);
                }
            });
            for (r in c) {
                s = Sn(f ? h[r] : 0, r, l), r in h || (h[r] = s.start, f && (s.end = s.start, s.start = "width" === r || "height" === r ? 1 : 0));
            }
        }
    }
    function Ln(e, t, n, r, i) {
        return new Ln.prototype.init(e, t, n, r, i);
    }
    x.Tween = Ln, Ln.prototype = {
        constructor: Ln,
        init: function init(e, t, n, r, i, o) {
            this.elem = e, this.prop = n, this.easing = i || "swing", this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = o || (x.cssNumber[n] ? "" : "px");
        },
        cur: function cur() {
            var e = Ln.propHooks[this.prop];
            return e && e.get ? e.get(this) : Ln.propHooks._default.get(this);
        },
        run: function run(e) {
            var t,
                n = Ln.propHooks[this.prop];
            return this.pos = t = this.options.duration ? x.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : Ln.propHooks._default.set(this), this;
        }
    }, Ln.prototype.init.prototype = Ln.prototype, Ln.propHooks = {
        _default: {
            get: function get(e) {
                var t;
                return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? (t = x.css(e.elem, e.prop, ""), t && "auto" !== t ? t : 0) : e.elem[e.prop];
            },
            set: function set(e) {
                x.fx.step[e.prop] ? x.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[x.cssProps[e.prop]] || x.cssHooks[e.prop]) ? x.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now;
            }
        }
    }, Ln.propHooks.scrollTop = Ln.propHooks.scrollLeft = {
        set: function set(e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now);
        }
    }, x.each(["toggle", "show", "hide"], function (e, t) {
        var n = x.fn[t];
        x.fn[t] = function (e, r, i) {
            return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(qn(t, !0), e, r, i);
        };
    }), x.fn.extend({
        fadeTo: function fadeTo(e, t, n, r) {
            return this.filter(Lt).css("opacity", 0).show().end().animate({
                opacity: t
            }, e, n, r);
        },
        animate: function animate(e, t, n, r) {
            var i = x.isEmptyObject(e),
                o = x.speed(t, n, r),
                s = function s() {
                var t = jn(this, x.extend({}, e), o);
                (i || q.get(this, "finish")) && t.stop(!0);
            };
            return s.finish = s, i || o.queue === !1 ? this.each(s) : this.queue(o.queue, s);
        },
        stop: function stop(e, t, n) {
            var r = function r(e) {
                var t = e.stop;
                delete e.stop, t(n);
            };
            return "string" != typeof e && (n = t, t = e, e = undefined), t && e !== !1 && this.queue(e || "fx", []), this.each(function () {
                var t = !0,
                    i = null != e && e + "queueHooks",
                    o = x.timers,
                    s = q.get(this);
                if (i) s[i] && s[i].stop && r(s[i]);else for (i in s) {
                    s[i] && s[i].stop && Cn.test(i) && r(s[i]);
                }for (i = o.length; i--;) {
                    o[i].elem !== this || null != e && o[i].queue !== e || (o[i].anim.stop(n), t = !1, o.splice(i, 1));
                }(t || !n) && x.dequeue(this, e);
            });
        },
        finish: function finish(e) {
            return e !== !1 && (e = e || "fx"), this.each(function () {
                var t,
                    n = q.get(this),
                    r = n[e + "queue"],
                    i = n[e + "queueHooks"],
                    o = x.timers,
                    s = r ? r.length : 0;
                for (n.finish = !0, x.queue(this, e, []), i && i.stop && i.stop.call(this, !0), t = o.length; t--;) {
                    o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0), o.splice(t, 1));
                }for (t = 0; s > t; t++) {
                    r[t] && r[t].finish && r[t].finish.call(this);
                }delete n.finish;
            });
        }
    });
    function qn(e, t) {
        var n,
            r = {
            height: e
        },
            i = 0;
        for (t = t ? 1 : 0; 4 > i; i += 2 - t) {
            n = jt[i], r["margin" + n] = r["padding" + n] = e;
        }return t && (r.opacity = r.width = e), r;
    }
    x.each({
        slideDown: qn("show"),
        slideUp: qn("hide"),
        slideToggle: qn("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function (e, t) {
        x.fn[e] = function (e, n, r) {
            return this.animate(t, e, n, r);
        };
    }), x.speed = function (e, t, n) {
        var r = e && "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) ? x.extend({}, e) : {
            complete: n || !n && t || x.isFunction(e) && e,
            duration: e,
            easing: n && t || t && !x.isFunction(t) && t
        };
        return r.duration = x.fx.off ? 0 : "number" == typeof r.duration ? r.duration : r.duration in x.fx.speeds ? x.fx.speeds[r.duration] : x.fx.speeds._default, (null == r.queue || r.queue === !0) && (r.queue = "fx"), r.old = r.complete, r.complete = function () {
            x.isFunction(r.old) && r.old.call(this), r.queue && x.dequeue(this, r.queue);
        }, r;
    }, x.easing = {
        linear: function linear(e) {
            return e;
        },
        swing: function swing(e) {
            return .5 - Math.cos(e * Math.PI) / 2;
        }
    }, x.timers = [], x.fx = Ln.prototype.init, x.fx.tick = function () {
        var e,
            t = x.timers,
            n = 0;
        for (xn = x.now(); t.length > n; n++) {
            e = t[n], e() || t[n] !== e || t.splice(n--, 1);
        }t.length || x.fx.stop(), xn = undefined;
    }, x.fx.timer = function (e) {
        e() && x.timers.push(e) && x.fx.start();
    }, x.fx.interval = 13, x.fx.start = function () {
        bn || (bn = setInterval(x.fx.tick, x.fx.interval));
    }, x.fx.stop = function () {
        clearInterval(bn), bn = null;
    }, x.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    }, x.fx.step = {}, x.expr && x.expr.filters && (x.expr.filters.animated = function (e) {
        return x.grep(x.timers, function (t) {
            return e === t.elem;
        }).length;
    }), x.fn.offset = function (e) {
        if (arguments.length) return e === undefined ? this : this.each(function (t) {
            x.offset.setOffset(this, e, t);
        });
        var t,
            n,
            i = this[0],
            o = {
            top: 0,
            left: 0
        },
            s = i && i.ownerDocument;
        if (s) return t = s.documentElement, x.contains(t, i) ? (_typeof(i.getBoundingClientRect) !== r && (o = i.getBoundingClientRect()), n = Hn(s), {
            top: o.top + n.pageYOffset - t.clientTop,
            left: o.left + n.pageXOffset - t.clientLeft
        }) : o;
    }, x.offset = {
        setOffset: function setOffset(e, t, n) {
            var r,
                i,
                o,
                s,
                a,
                u,
                l,
                c = x.css(e, "position"),
                p = x(e),
                f = {};
            "static" === c && (e.style.position = "relative"), a = p.offset(), o = x.css(e, "top"), u = x.css(e, "left"), l = ("absolute" === c || "fixed" === c) && (o + u).indexOf("auto") > -1, l ? (r = p.position(), s = r.top, i = r.left) : (s = parseFloat(o) || 0, i = parseFloat(u) || 0), x.isFunction(t) && (t = t.call(e, n, a)), null != t.top && (f.top = t.top - a.top + s), null != t.left && (f.left = t.left - a.left + i), "using" in t ? t.using.call(e, f) : p.css(f);
        }
    }, x.fn.extend({
        position: function position() {
            if (this[0]) {
                var e,
                    t,
                    n = this[0],
                    r = {
                    top: 0,
                    left: 0
                };
                return "fixed" === x.css(n, "position") ? t = n.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), x.nodeName(e[0], "html") || (r = e.offset()), r.top += x.css(e[0], "borderTopWidth", !0), r.left += x.css(e[0], "borderLeftWidth", !0)), {
                    top: t.top - r.top - x.css(n, "marginTop", !0),
                    left: t.left - r.left - x.css(n, "marginLeft", !0)
                };
            }
        },
        offsetParent: function offsetParent() {
            return this.map(function () {
                var e = this.offsetParent || s;
                while (e && !x.nodeName(e, "html") && "static" === x.css(e, "position")) {
                    e = e.offsetParent;
                }return e || s;
            });
        }
    }), x.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function (t, n) {
        var r = "pageYOffset" === n;
        x.fn[t] = function (i) {
            return x.access(this, function (t, i, o) {
                var s = Hn(t);
                return o === undefined ? s ? s[n] : t[i] : (s ? s.scrollTo(r ? e.pageXOffset : o, r ? o : e.pageYOffset) : t[i] = o, undefined);
            }, t, i, arguments.length, null);
        };
    });
    function Hn(e) {
        return x.isWindow(e) ? e : 9 === e.nodeType && e.defaultView;
    }
    x.each({
        Height: "height",
        Width: "width"
    }, function (e, t) {
        x.each({
            padding: "inner" + e,
            content: t,
            "": "outer" + e
        }, function (n, r) {
            x.fn[r] = function (r, i) {
                var o = arguments.length && (n || "boolean" != typeof r),
                    s = n || (r === !0 || i === !0 ? "margin" : "border");
                return x.access(this, function (t, n, r) {
                    var i;
                    return x.isWindow(t) ? t.document.documentElement["client" + e] : 9 === t.nodeType ? (i = t.documentElement, Math.max(t.body["scroll" + e], i["scroll" + e], t.body["offset" + e], i["offset" + e], i["client" + e])) : r === undefined ? x.css(t, n, s) : x.style(t, n, r, s);
                }, t, o ? r : undefined, o, null);
            };
        });
    }), x.fn.size = function () {
        return this.length;
    }, x.fn.andSelf = x.fn.addBack, "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module && "object" == _typeof(module.exports) ? module.exports = x : "function" == typeof define && define.amd && define("jquery", [], function () {
        return x;
    }), "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) && "object" == _typeof(e.document) && (e.jQuery = e.$ = x);
})(window);

if ("undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery");

+function (a) {
    "use strict";

    function b() {
        var a = document.createElement("bootstrap"),
            b = {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "oTransitionEnd otransitionend",
            transition: "transitionend"
        };
        for (var c in b) {
            if (void 0 !== a.style[c]) return {
                end: b[c]
            };
        }return !1;
    }
    a.fn.emulateTransitionEnd = function (b) {
        var c = !1,
            d = this;
        a(this).one("bsTransitionEnd", function () {
            c = !0;
        });
        var e = function e() {
            c || a(d).trigger(a.support.transition.end);
        };
        return setTimeout(e, b), this;
    }, a(function () {
        a.support.transition = b(), a.support.transition && (a.event.special.bsTransitionEnd = {
            bindType: a.support.transition.end,
            delegateType: a.support.transition.end,
            handle: function handle(b) {
                return a(b.target).is(this) ? b.handleObj.handler.apply(this, arguments) : void 0;
            }
        });
    });
}(jQuery), +function (a) {
    "use strict";

    function b(b) {
        return this.each(function () {
            var c = a(this),
                e = c.data("bs.alert");
            e || c.data("bs.alert", e = new d(this)), "string" == typeof b && e[b].call(c);
        });
    }
    var c = '[data-dismiss="alert"]',
        d = function d(b) {
        a(b).on("click", c, this.close);
    };
    d.VERSION = "3.2.0", d.prototype.close = function (b) {
        function c() {
            f.detach().trigger("closed.bs.alert").remove();
        }
        var d = a(this),
            e = d.attr("data-target");
        e || (e = d.attr("href"), e = e && e.replace(/.*(?=#[^\s]*$)/, ""));
        var f = a(e);
        b && b.preventDefault(), f.length || (f = d.hasClass("alert") ? d : d.parent()), f.trigger(b = a.Event("close.bs.alert")), b.isDefaultPrevented() || (f.removeClass("in"), a.support.transition && f.hasClass("fade") ? f.one("bsTransitionEnd", c).emulateTransitionEnd(150) : c());
    };
    var e = a.fn.alert;
    a.fn.alert = b, a.fn.alert.Constructor = d, a.fn.alert.noConflict = function () {
        return a.fn.alert = e, this;
    }, a(document).on("click.bs.alert.data-api", c, d.prototype.close);
}(jQuery), +function (a) {
    "use strict";

    function b(b) {
        return this.each(function () {
            var d = a(this),
                e = d.data("bs.button"),
                f = "object" == (typeof b === "undefined" ? "undefined" : _typeof(b)) && b;
            e || d.data("bs.button", e = new c(this, f)), "toggle" == b ? e.toggle() : b && e.setState(b);
        });
    }
    var c = function c(b, d) {
        this.$element = a(b), this.options = a.extend({}, c.DEFAULTS, d), this.isLoading = !1;
    };
    c.VERSION = "3.2.0", c.DEFAULTS = {
        loadingText: "loading..."
    }, c.prototype.setState = function (b) {
        var c = "disabled",
            d = this.$element,
            e = d.is("input") ? "val" : "html",
            f = d.data();
        b += "Text", null == f.resetText && d.data("resetText", d[e]()), d[e](null == f[b] ? this.options[b] : f[b]), setTimeout(a.proxy(function () {
            "loadingText" == b ? (this.isLoading = !0, d.addClass(c).attr(c, c)) : this.isLoading && (this.isLoading = !1, d.removeClass(c).removeAttr(c));
        }, this), 0);
    }, c.prototype.toggle = function () {
        var a = !0,
            b = this.$element.closest('[data-toggle="buttons"]');
        if (b.length) {
            var c = this.$element.find("input");
            "radio" == c.prop("type") && (c.prop("checked") && this.$element.hasClass("active") ? a = !1 : b.find(".active").removeClass("active")), a && c.prop("checked", !this.$element.hasClass("active")).trigger("change");
        }
        a && this.$element.toggleClass("active");
    };
    var d = a.fn.button;
    a.fn.button = b, a.fn.button.Constructor = c, a.fn.button.noConflict = function () {
        return a.fn.button = d, this;
    }, a(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function (c) {
        var d = a(c.target);
        d.hasClass("btn") || (d = d.closest(".btn")), b.call(d, "toggle"), c.preventDefault();
    });
}(jQuery), +function (a) {
    "use strict";

    function b(b) {
        return this.each(function () {
            var d = a(this),
                e = d.data("bs.carousel"),
                f = a.extend({}, c.DEFAULTS, d.data(), "object" == (typeof b === "undefined" ? "undefined" : _typeof(b)) && b),
                g = "string" == typeof b ? b : f.slide;
            e || d.data("bs.carousel", e = new c(this, f)), "number" == typeof b ? e.to(b) : g ? e[g]() : f.interval && e.pause().cycle();
        });
    }
    var c = function c(b, _c) {
        this.$element = a(b).on("keydown.bs.carousel", a.proxy(this.keydown, this)), this.$indicators = this.$element.find(".carousel-indicators"), this.options = _c, this.paused = this.sliding = this.interval = this.$active = this.$items = null, "hover" == this.options.pause && this.$element.on("mouseenter.bs.carousel", a.proxy(this.pause, this)).on("mouseleave.bs.carousel", a.proxy(this.cycle, this));
    };
    c.VERSION = "3.2.0", c.DEFAULTS = {
        interval: 5e3,
        pause: "hover",
        wrap: !0
    }, c.prototype.keydown = function (a) {
        switch (a.which) {
            case 37:
                this.prev();
                break;

            case 39:
                this.next();
                break;

            default:
                return;
        }
        a.preventDefault();
    }, c.prototype.cycle = function (b) {
        return b || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(a.proxy(this.next, this), this.options.interval)), this;
    }, c.prototype.getItemIndex = function (a) {
        return this.$items = a.parent().children(".item"), this.$items.index(a || this.$active);
    }, c.prototype.to = function (b) {
        var c = this,
            d = this.getItemIndex(this.$active = this.$element.find(".item.active"));
        return b > this.$items.length - 1 || 0 > b ? void 0 : this.sliding ? this.$element.one("slid.bs.carousel", function () {
            c.to(b);
        }) : d == b ? this.pause().cycle() : this.slide(b > d ? "next" : "prev", a(this.$items[b]));
    }, c.prototype.pause = function (b) {
        return b || (this.paused = !0), this.$element.find(".next, .prev").length && a.support.transition && (this.$element.trigger(a.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this;
    }, c.prototype.next = function () {
        return this.sliding ? void 0 : this.slide("next");
    }, c.prototype.prev = function () {
        return this.sliding ? void 0 : this.slide("prev");
    }, c.prototype.slide = function (b, c) {
        var d = this.$element.find(".item.active"),
            e = c || d[b](),
            f = this.interval,
            g = "next" == b ? "left" : "right",
            h = "next" == b ? "first" : "last",
            i = this;
        if (!e.length) {
            if (!this.options.wrap) return;
            e = this.$element.find(".item")[h]();
        }
        if (e.hasClass("active")) return this.sliding = !1;
        var j = e[0],
            k = a.Event("slide.bs.carousel", {
            relatedTarget: j,
            direction: g
        });
        if (this.$element.trigger(k), !k.isDefaultPrevented()) {
            if (this.sliding = !0, f && this.pause(), this.$indicators.length) {
                this.$indicators.find(".active").removeClass("active");
                var l = a(this.$indicators.children()[this.getItemIndex(e)]);
                l && l.addClass("active");
            }
            var m = a.Event("slid.bs.carousel", {
                relatedTarget: j,
                direction: g
            });
            return a.support.transition && this.$element.hasClass("slide") ? (e.addClass(b), e[0].offsetWidth, d.addClass(g), e.addClass(g), d.one("bsTransitionEnd", function () {
                e.removeClass([b, g].join(" ")).addClass("active"), d.removeClass(["active", g].join(" ")), i.sliding = !1, setTimeout(function () {
                    i.$element.trigger(m);
                }, 0);
            }).emulateTransitionEnd(1e3 * d.css("transition-duration").slice(0, -1))) : (d.removeClass("active"), e.addClass("active"), this.sliding = !1, this.$element.trigger(m)), f && this.cycle(), this;
        }
    };
    var d = a.fn.carousel;
    a.fn.carousel = b, a.fn.carousel.Constructor = c, a.fn.carousel.noConflict = function () {
        return a.fn.carousel = d, this;
    }, a(document).on("click.bs.carousel.data-api", "[data-slide], [data-slide-to]", function (c) {
        var d,
            e = a(this),
            f = a(e.attr("data-target") || (d = e.attr("href")) && d.replace(/.*(?=#[^\s]+$)/, ""));
        if (f.hasClass("carousel")) {
            var g = a.extend({}, f.data(), e.data()),
                h = e.attr("data-slide-to");
            h && (g.interval = !1), b.call(f, g), h && f.data("bs.carousel").to(h), c.preventDefault();
        }
    }), a(window).on("load", function () {
        a('[data-ride="carousel"]').each(function () {
            var c = a(this);
            b.call(c, c.data());
        });
    });
}(jQuery), +function (a) {
    "use strict";

    function b(b) {
        return this.each(function () {
            var d = a(this),
                e = d.data("bs.collapse"),
                f = a.extend({}, c.DEFAULTS, d.data(), "object" == (typeof b === "undefined" ? "undefined" : _typeof(b)) && b);
            !e && f.toggle && "show" == b && (b = !b), e || d.data("bs.collapse", e = new c(this, f)), "string" == typeof b && e[b]();
        });
    }
    var c = function c(b, d) {
        this.$element = a(b), this.options = a.extend({}, c.DEFAULTS, d), this.transitioning = null, this.options.parent && (this.$parent = a(this.options.parent)), this.options.toggle && this.toggle();
    };
    c.VERSION = "3.2.0", c.DEFAULTS = {
        toggle: !0
    }, c.prototype.dimension = function () {
        var a = this.$element.hasClass("width");
        return a ? "width" : "height";
    }, c.prototype.show = function () {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var c = a.Event("show.bs.collapse");
            if (this.$element.trigger(c), !c.isDefaultPrevented()) {
                var d = this.$parent && this.$parent.find("> .panel > .in");
                if (d && d.length) {
                    var e = d.data("bs.collapse");
                    if (e && e.transitioning) return;
                    b.call(d, "hide"), e || d.data("bs.collapse", null);
                }
                var f = this.dimension();
                this.$element.removeClass("collapse").addClass("collapsing")[f](0), this.transitioning = 1;
                var g = function g() {
                    this.$element.removeClass("collapsing").addClass("collapse in")[f](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse");
                };
                if (!a.support.transition) return g.call(this);
                var h = a.camelCase(["scroll", f].join("-"));
                this.$element.one("bsTransitionEnd", a.proxy(g, this)).emulateTransitionEnd(350)[f](this.$element[0][h]);
            }
        }
    }, c.prototype.hide = function () {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var b = a.Event("hide.bs.collapse");
            if (this.$element.trigger(b), !b.isDefaultPrevented()) {
                var c = this.dimension();
                this.$element[c](this.$element[c]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse").removeClass("in"), this.transitioning = 1;
                var d = function d() {
                    this.transitioning = 0, this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse");
                };
                return a.support.transition ? void this.$element[c](0).one("bsTransitionEnd", a.proxy(d, this)).emulateTransitionEnd(350) : d.call(this);
            }
        }
    }, c.prototype.toggle = function () {
        this[this.$element.hasClass("in") ? "hide" : "show"]();
    };
    var d = a.fn.collapse;
    a.fn.collapse = b, a.fn.collapse.Constructor = c, a.fn.collapse.noConflict = function () {
        return a.fn.collapse = d, this;
    }, a(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function (c) {
        var d,
            e = a(this),
            f = e.attr("data-target") || c.preventDefault() || (d = e.attr("href")) && d.replace(/.*(?=#[^\s]+$)/, ""),
            g = a(f),
            h = g.data("bs.collapse"),
            i = h ? "toggle" : e.data(),
            j = e.attr("data-parent"),
            k = j && a(j);
        h && h.transitioning || (k && k.find('[data-toggle="collapse"][data-parent="' + j + '"]').not(e).addClass("collapsed"), e[g.hasClass("in") ? "addClass" : "removeClass"]("collapsed")), b.call(g, i);
    });
}(jQuery), +function (a) {
    "use strict";

    function b(b) {
        b && 3 === b.which || (a(e).remove(), a(f).each(function () {
            var d = c(a(this)),
                e = {
                relatedTarget: this
            };
            d.hasClass("open") && (d.trigger(b = a.Event("hide.bs.dropdown", e)), b.isDefaultPrevented() || d.removeClass("open").trigger("hidden.bs.dropdown", e));
        }));
    }
    function c(b) {
        var c = b.attr("data-target");
        c || (c = b.attr("href"), c = c && /#[A-Za-z]/.test(c) && c.replace(/.*(?=#[^\s]*$)/, ""));
        var d = c && a(c);
        return d && d.length ? d : b.parent();
    }
    function d(b) {
        return this.each(function () {
            var c = a(this),
                d = c.data("bs.dropdown");
            d || c.data("bs.dropdown", d = new g(this)), "string" == typeof b && d[b].call(c);
        });
    }
    var e = ".dropdown-backdrop",
        f = '[data-toggle="dropdown"]',
        g = function g(b) {
        a(b).on("click.bs.dropdown", this.toggle);
    };
    g.VERSION = "3.2.0", g.prototype.toggle = function (d) {
        var e = a(this);
        if (!e.is(".disabled, :disabled")) {
            var f = c(e),
                g = f.hasClass("open");
            if (b(), !g) {
                "ontouchstart" in document.documentElement && !f.closest(".navbar-nav").length && a('<div class="dropdown-backdrop"/>').insertAfter(a(this)).on("click", b);
                var h = {
                    relatedTarget: this
                };
                if (f.trigger(d = a.Event("show.bs.dropdown", h)), d.isDefaultPrevented()) return;
                e.trigger("focus"), f.toggleClass("open").trigger("shown.bs.dropdown", h);
            }
            return !1;
        }
    }, g.prototype.keydown = function (b) {
        if (/(38|40|27)/.test(b.keyCode)) {
            var d = a(this);
            if (b.preventDefault(), b.stopPropagation(), !d.is(".disabled, :disabled")) {
                var e = c(d),
                    g = e.hasClass("open");
                if (!g || g && 27 == b.keyCode) return 27 == b.which && e.find(f).trigger("focus"), d.trigger("click");
                var h = " li:not(.divider):visible a",
                    i = e.find('[role="menu"]' + h + ', [role="listbox"]' + h);
                if (i.length) {
                    var j = i.index(i.filter(":focus"));
                    38 == b.keyCode && j > 0 && j--, 40 == b.keyCode && j < i.length - 1 && j++, ~j || (j = 0), i.eq(j).trigger("focus");
                }
            }
        }
    };
    var h = a.fn.dropdown;
    a.fn.dropdown = d, a.fn.dropdown.Constructor = g, a.fn.dropdown.noConflict = function () {
        return a.fn.dropdown = h, this;
    }, a(document).on("click.bs.dropdown.data-api", b).on("click.bs.dropdown.data-api", ".dropdown form", function (a) {
        a.stopPropagation();
    }).on("click.bs.dropdown.data-api", f, g.prototype.toggle).on("keydown.bs.dropdown.data-api", f + ', [role="menu"], [role="listbox"]', g.prototype.keydown);
}(jQuery), +function (a) {
    "use strict";

    function b(b, d) {
        return this.each(function () {
            var e = a(this),
                f = e.data("bs.modal"),
                g = a.extend({}, c.DEFAULTS, e.data(), "object" == (typeof b === "undefined" ? "undefined" : _typeof(b)) && b);
            f || e.data("bs.modal", f = new c(this, g)), "string" == typeof b ? f[b](d) : g.show && f.show(d);
        });
    }
    var c = function c(b, _c2) {
        this.options = _c2, this.$body = a(document.body), this.$element = a(b), this.$backdrop = this.isShown = null, this.scrollbarWidth = 0, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, a.proxy(function () {
            this.$element.trigger("loaded.bs.modal");
        }, this));
    };
    c.VERSION = "3.2.0", c.DEFAULTS = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    }, c.prototype.toggle = function (a) {
        return this.isShown ? this.hide() : this.show(a);
    }, c.prototype.show = function (b) {
        var c = this,
            d = a.Event("show.bs.modal", {
            relatedTarget: b
        });
        this.$element.trigger(d), this.isShown || d.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.$body.addClass("modal-open"), this.setScrollbar(), this.escape(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', a.proxy(this.hide, this)), this.backdrop(function () {
            var d = a.support.transition && c.$element.hasClass("fade");
            c.$element.parent().length || c.$element.appendTo(c.$body), c.$element.show().scrollTop(0), d && c.$element[0].offsetWidth, c.$element.addClass("in").attr("aria-hidden", !1), c.enforceFocus();
            var e = a.Event("shown.bs.modal", {
                relatedTarget: b
            });
            d ? c.$element.find(".modal-dialog").one("bsTransitionEnd", function () {
                c.$element.trigger("focus").trigger(e);
            }).emulateTransitionEnd(300) : c.$element.trigger("focus").trigger(e);
        }));
    }, c.prototype.hide = function (b) {
        b && b.preventDefault(), b = a.Event("hide.bs.modal"), this.$element.trigger(b), this.isShown && !b.isDefaultPrevented() && (this.isShown = !1, this.$body.removeClass("modal-open"), this.resetScrollbar(), this.escape(), a(document).off("focusin.bs.modal"), this.$element.removeClass("in").attr("aria-hidden", !0).off("click.dismiss.bs.modal"), a.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", a.proxy(this.hideModal, this)).emulateTransitionEnd(300) : this.hideModal());
    }, c.prototype.enforceFocus = function () {
        a(document).off("focusin.bs.modal").on("focusin.bs.modal", a.proxy(function (a) {
            this.$element[0] === a.target || this.$element.has(a.target).length || this.$element.trigger("focus");
        }, this));
    }, c.prototype.escape = function () {
        this.isShown && this.options.keyboard ? this.$element.on("keyup.dismiss.bs.modal", a.proxy(function (a) {
            27 == a.which && this.hide();
        }, this)) : this.isShown || this.$element.off("keyup.dismiss.bs.modal");
    }, c.prototype.hideModal = function () {
        var a = this;
        this.$element.hide(), this.backdrop(function () {
            a.$element.trigger("hidden.bs.modal");
        });
    }, c.prototype.removeBackdrop = function () {
        this.$backdrop && this.$backdrop.remove(), this.$backdrop = null;
    }, c.prototype.backdrop = function (b) {
        var c = this,
            d = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var e = a.support.transition && d;
            if (this.$backdrop = a('<div class="modal-backdrop ' + d + '" />').appendTo(this.$body), this.$element.on("click.dismiss.bs.modal", a.proxy(function (a) {
                a.target === a.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus.call(this.$element[0]) : this.hide.call(this));
            }, this)), e && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !b) return;
            e ? this.$backdrop.one("bsTransitionEnd", b).emulateTransitionEnd(150) : b();
        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass("in");
            var f = function f() {
                c.removeBackdrop(), b && b();
            };
            a.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", f).emulateTransitionEnd(150) : f();
        } else b && b();
    }, c.prototype.checkScrollbar = function () {
        document.body.clientWidth >= window.innerWidth || (this.scrollbarWidth = this.scrollbarWidth || this.measureScrollbar());
    }, c.prototype.setScrollbar = function () {
        var a = parseInt(this.$body.css("padding-right") || 0, 10);
        this.scrollbarWidth && this.$body.css("padding-right", a + this.scrollbarWidth);
    }, c.prototype.resetScrollbar = function () {
        this.$body.css("padding-right", "");
    }, c.prototype.measureScrollbar = function () {
        var a = document.createElement("div");
        a.className = "modal-scrollbar-measure", this.$body.append(a);
        var b = a.offsetWidth - a.clientWidth;
        return this.$body[0].removeChild(a), b;
    };
    var d = a.fn.modal;
    a.fn.modal = b, a.fn.modal.Constructor = c, a.fn.modal.noConflict = function () {
        return a.fn.modal = d, this;
    }, a(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function (c) {
        var d = a(this),
            e = d.attr("href"),
            f = a(d.attr("data-target") || e && e.replace(/.*(?=#[^\s]+$)/, "")),
            g = f.data("bs.modal") ? "toggle" : a.extend({
            remote: !/#/.test(e) && e
        }, f.data(), d.data());
        d.is("a") && c.preventDefault(), f.one("show.bs.modal", function (a) {
            a.isDefaultPrevented() || f.one("hidden.bs.modal", function () {
                d.is(":visible") && d.trigger("focus");
            });
        }), b.call(f, g, this);
    });
}(jQuery), +function (a) {
    "use strict";

    function b(b) {
        return this.each(function () {
            var d = a(this),
                e = d.data("bs.tooltip"),
                f = "object" == (typeof b === "undefined" ? "undefined" : _typeof(b)) && b;
            (e || "destroy" != b) && (e || d.data("bs.tooltip", e = new c(this, f)), "string" == typeof b && e[b]());
        });
    }
    var c = function c(a, b) {
        this.type = this.options = this.enabled = this.timeout = this.hoverState = this.$element = null, this.init("tooltip", a, b);
    };
    c.VERSION = "3.2.0", c.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: {
            selector: "body",
            padding: 0
        }
    }, c.prototype.init = function (b, c, d) {
        this.enabled = !0, this.type = b, this.$element = a(c), this.options = this.getOptions(d), this.$viewport = this.options.viewport && a(this.options.viewport.selector || this.options.viewport);
        for (var e = this.options.trigger.split(" "), f = e.length; f--;) {
            var g = e[f];
            if ("click" == g) this.$element.on("click." + this.type, this.options.selector, a.proxy(this.toggle, this));else if ("manual" != g) {
                var h = "hover" == g ? "mouseenter" : "focusin",
                    i = "hover" == g ? "mouseleave" : "focusout";
                this.$element.on(h + "." + this.type, this.options.selector, a.proxy(this.enter, this)), this.$element.on(i + "." + this.type, this.options.selector, a.proxy(this.leave, this));
            }
        }
        this.options.selector ? this._options = a.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle();
    }, c.prototype.getDefaults = function () {
        return c.DEFAULTS;
    }, c.prototype.getOptions = function (b) {
        return b = a.extend({}, this.getDefaults(), this.$element.data(), b), b.delay && "number" == typeof b.delay && (b.delay = {
            show: b.delay,
            hide: b.delay
        }), b;
    }, c.prototype.getDelegateOptions = function () {
        var b = {},
            c = this.getDefaults();
        return this._options && a.each(this._options, function (a, d) {
            c[a] != d && (b[a] = d);
        }), b;
    }, c.prototype.enter = function (b) {
        var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);
        return c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c)), clearTimeout(c.timeout), c.hoverState = "in", c.options.delay && c.options.delay.show ? void (c.timeout = setTimeout(function () {
            "in" == c.hoverState && c.show();
        }, c.options.delay.show)) : c.show();
    }, c.prototype.leave = function (b) {
        var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);
        return c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c)), clearTimeout(c.timeout), c.hoverState = "out", c.options.delay && c.options.delay.hide ? void (c.timeout = setTimeout(function () {
            "out" == c.hoverState && c.hide();
        }, c.options.delay.hide)) : c.hide();
    }, c.prototype.show = function () {
        var b = a.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(b);
            var c = a.contains(document.documentElement, this.$element[0]);
            if (b.isDefaultPrevented() || !c) return;
            var d = this,
                e = this.tip(),
                f = this.getUID(this.type);
            this.setContent(), e.attr("id", f), this.$element.attr("aria-describedby", f), this.options.animation && e.addClass("fade");
            var g = "function" == typeof this.options.placement ? this.options.placement.call(this, e[0], this.$element[0]) : this.options.placement,
                h = /\s?auto?\s?/i,
                i = h.test(g);
            i && (g = g.replace(h, "") || "top"), e.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(g).data("bs." + this.type, this), this.options.container ? e.appendTo(this.options.container) : e.insertAfter(this.$element);
            var j = this.getPosition(),
                k = e[0].offsetWidth,
                l = e[0].offsetHeight;
            if (i) {
                var m = g,
                    n = this.$element.parent(),
                    o = this.getPosition(n);
                g = "bottom" == g && j.top + j.height + l - o.scroll > o.height ? "top" : "top" == g && j.top - o.scroll - l < 0 ? "bottom" : "right" == g && j.right + k > o.width ? "left" : "left" == g && j.left - k < o.left ? "right" : g, e.removeClass(m).addClass(g);
            }
            var p = this.getCalculatedOffset(g, j, k, l);
            this.applyPlacement(p, g);
            var q = function q() {
                d.$element.trigger("shown.bs." + d.type), d.hoverState = null;
            };
            a.support.transition && this.$tip.hasClass("fade") ? e.one("bsTransitionEnd", q).emulateTransitionEnd(150) : q();
        }
    }, c.prototype.applyPlacement = function (b, c) {
        var d = this.tip(),
            e = d[0].offsetWidth,
            f = d[0].offsetHeight,
            g = parseInt(d.css("margin-top"), 10),
            h = parseInt(d.css("margin-left"), 10);
        isNaN(g) && (g = 0), isNaN(h) && (h = 0), b.top = b.top + g, b.left = b.left + h, a.offset.setOffset(d[0], a.extend({
            using: function using(a) {
                d.css({
                    top: Math.round(a.top),
                    left: Math.round(a.left)
                });
            }
        }, b), 0), d.addClass("in");
        var i = d[0].offsetWidth,
            j = d[0].offsetHeight;
        "top" == c && j != f && (b.top = b.top + f - j);
        var k = this.getViewportAdjustedDelta(c, b, i, j);
        k.left ? b.left += k.left : b.top += k.top;
        var l = k.left ? 2 * k.left - e + i : 2 * k.top - f + j,
            m = k.left ? "left" : "top",
            n = k.left ? "offsetWidth" : "offsetHeight";
        d.offset(b), this.replaceArrow(l, d[0][n], m);
    }, c.prototype.replaceArrow = function (a, b, c) {
        this.arrow().css(c, a ? 50 * (1 - a / b) + "%" : "");
    }, c.prototype.setContent = function () {
        var a = this.tip(),
            b = this.getTitle();
        a.find(".tooltip-inner")[this.options.html ? "html" : "text"](b), a.removeClass("fade in top bottom left right");
    }, c.prototype.hide = function () {
        function b() {
            "in" != c.hoverState && d.detach(), c.$element.trigger("hidden.bs." + c.type);
        }
        var c = this,
            d = this.tip(),
            e = a.Event("hide.bs." + this.type);
        return this.$element.removeAttr("aria-describedby"), this.$element.trigger(e), e.isDefaultPrevented() ? void 0 : (d.removeClass("in"), a.support.transition && this.$tip.hasClass("fade") ? d.one("bsTransitionEnd", b).emulateTransitionEnd(150) : b(), this.hoverState = null, this);
    }, c.prototype.fixTitle = function () {
        var a = this.$element;
        (a.attr("title") || "string" != typeof a.attr("data-original-title")) && a.attr("data-original-title", a.attr("title") || "").attr("title", "");
    }, c.prototype.hasContent = function () {
        return this.getTitle();
    }, c.prototype.getPosition = function (b) {
        b = b || this.$element;
        var c = b[0],
            d = "BODY" == c.tagName;
        return a.extend({}, "function" == typeof c.getBoundingClientRect ? c.getBoundingClientRect() : null, {
            scroll: d ? document.documentElement.scrollTop || document.body.scrollTop : b.scrollTop(),
            width: d ? a(window).width() : b.outerWidth(),
            height: d ? a(window).height() : b.outerHeight()
        }, d ? {
            top: 0,
            left: 0
        } : b.offset());
    }, c.prototype.getCalculatedOffset = function (a, b, c, d) {
        return "bottom" == a ? {
            top: b.top + b.height,
            left: b.left + b.width / 2 - c / 2
        } : "top" == a ? {
            top: b.top - d,
            left: b.left + b.width / 2 - c / 2
        } : "left" == a ? {
            top: b.top + b.height / 2 - d / 2,
            left: b.left - c
        } : {
            top: b.top + b.height / 2 - d / 2,
            left: b.left + b.width
        };
    }, c.prototype.getViewportAdjustedDelta = function (a, b, c, d) {
        var e = {
            top: 0,
            left: 0
        };
        if (!this.$viewport) return e;
        var f = this.options.viewport && this.options.viewport.padding || 0,
            g = this.getPosition(this.$viewport);
        if (/right|left/.test(a)) {
            var h = b.top - f - g.scroll,
                i = b.top + f - g.scroll + d;
            h < g.top ? e.top = g.top - h : i > g.top + g.height && (e.top = g.top + g.height - i);
        } else {
            var j = b.left - f,
                k = b.left + f + c;
            j < g.left ? e.left = g.left - j : k > g.width && (e.left = g.left + g.width - k);
        }
        return e;
    }, c.prototype.getTitle = function () {
        var a,
            b = this.$element,
            c = this.options;
        return a = b.attr("data-original-title") || ("function" == typeof c.title ? c.title.call(b[0]) : c.title);
    }, c.prototype.getUID = function (a) {
        do {
            a += ~~(1e6 * Math.random());
        } while (document.getElementById(a));
        return a;
    }, c.prototype.tip = function () {
        return this.$tip = this.$tip || a(this.options.template);
    }, c.prototype.arrow = function () {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow");
    }, c.prototype.validate = function () {
        this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null);
    }, c.prototype.enable = function () {
        this.enabled = !0;
    }, c.prototype.disable = function () {
        this.enabled = !1;
    }, c.prototype.toggleEnabled = function () {
        this.enabled = !this.enabled;
    }, c.prototype.toggle = function (b) {
        var c = this;
        b && (c = a(b.currentTarget).data("bs." + this.type), c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c))), c.tip().hasClass("in") ? c.leave(c) : c.enter(c);
    }, c.prototype.destroy = function () {
        clearTimeout(this.timeout), this.hide().$element.off("." + this.type).removeData("bs." + this.type);
    };
    var d = a.fn.tooltip;
    a.fn.tooltip = b, a.fn.tooltip.Constructor = c, a.fn.tooltip.noConflict = function () {
        return a.fn.tooltip = d, this;
    };
}(jQuery), +function (a) {
    "use strict";

    function b(b) {
        return this.each(function () {
            var d = a(this),
                e = d.data("bs.popover"),
                f = "object" == (typeof b === "undefined" ? "undefined" : _typeof(b)) && b;
            (e || "destroy" != b) && (e || d.data("bs.popover", e = new c(this, f)), "string" == typeof b && e[b]());
        });
    }
    var c = function c(a, b) {
        this.init("popover", a, b);
    };
    if (!a.fn.tooltip) throw new Error("Popover requires tooltip.js");
    c.VERSION = "3.2.0", c.DEFAULTS = a.extend({}, a.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }), c.prototype = a.extend({}, a.fn.tooltip.Constructor.prototype), c.prototype.constructor = c, c.prototype.getDefaults = function () {
        return c.DEFAULTS;
    }, c.prototype.setContent = function () {
        var a = this.tip(),
            b = this.getTitle(),
            c = this.getContent();
        a.find(".popover-title")[this.options.html ? "html" : "text"](b), a.find(".popover-content").empty()[this.options.html ? "string" == typeof c ? "html" : "append" : "text"](c), a.removeClass("fade top bottom left right in"), a.find(".popover-title").html() || a.find(".popover-title").hide();
    }, c.prototype.hasContent = function () {
        return this.getTitle() || this.getContent();
    }, c.prototype.getContent = function () {
        var a = this.$element,
            b = this.options;
        return a.attr("data-content") || ("function" == typeof b.content ? b.content.call(a[0]) : b.content);
    }, c.prototype.arrow = function () {
        return this.$arrow = this.$arrow || this.tip().find(".arrow");
    }, c.prototype.tip = function () {
        return this.$tip || (this.$tip = a(this.options.template)), this.$tip;
    };
    var d = a.fn.popover;
    a.fn.popover = b, a.fn.popover.Constructor = c, a.fn.popover.noConflict = function () {
        return a.fn.popover = d, this;
    };
}(jQuery), +function (a) {
    "use strict";

    function b(c, d) {
        var e = a.proxy(this.process, this);
        this.$body = a("body"), this.$scrollElement = a(a(c).is("body") ? window : c), this.options = a.extend({}, b.DEFAULTS, d), this.selector = (this.options.target || "") + " .nav li > a", this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, this.$scrollElement.on("scroll.bs.scrollspy", e), this.refresh(), this.process();
    }
    function c(c) {
        return this.each(function () {
            var d = a(this),
                e = d.data("bs.scrollspy"),
                f = "object" == (typeof c === "undefined" ? "undefined" : _typeof(c)) && c;
            e || d.data("bs.scrollspy", e = new b(this, f)), "string" == typeof c && e[c]();
        });
    }
    b.VERSION = "3.2.0", b.DEFAULTS = {
        offset: 10
    }, b.prototype.getScrollHeight = function () {
        return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight);
    }, b.prototype.refresh = function () {
        var b = "offset",
            c = 0;
        a.isWindow(this.$scrollElement[0]) || (b = "position", c = this.$scrollElement.scrollTop()), this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight();
        var d = this;
        this.$body.find(this.selector).map(function () {
            var d = a(this),
                e = d.data("target") || d.attr("href"),
                f = /^#./.test(e) && a(e);
            return f && f.length && f.is(":visible") && [[f[b]().top + c, e]] || null;
        }).sort(function (a, b) {
            return a[0] - b[0];
        }).each(function () {
            d.offsets.push(this[0]), d.targets.push(this[1]);
        });
    }, b.prototype.process = function () {
        var a,
            b = this.$scrollElement.scrollTop() + this.options.offset,
            c = this.getScrollHeight(),
            d = this.options.offset + c - this.$scrollElement.height(),
            e = this.offsets,
            f = this.targets,
            g = this.activeTarget;
        if (this.scrollHeight != c && this.refresh(), b >= d) return g != (a = f[f.length - 1]) && this.activate(a);
        if (g && b <= e[0]) return g != (a = f[0]) && this.activate(a);
        for (a = e.length; a--;) {
            g != f[a] && b >= e[a] && (!e[a + 1] || b <= e[a + 1]) && this.activate(f[a]);
        }
    }, b.prototype.activate = function (b) {
        this.activeTarget = b, a(this.selector).parentsUntil(this.options.target, ".active").removeClass("active");
        var c = this.selector + '[data-target="' + b + '"],' + this.selector + '[href="' + b + '"]',
            d = a(c).parents("li").addClass("active");
        d.parent(".dropdown-menu").length && (d = d.closest("li.dropdown").addClass("active")), d.trigger("activate.bs.scrollspy");
    };
    var d = a.fn.scrollspy;
    a.fn.scrollspy = c, a.fn.scrollspy.Constructor = b, a.fn.scrollspy.noConflict = function () {
        return a.fn.scrollspy = d, this;
    }, a(window).on("load.bs.scrollspy.data-api", function () {
        a('[data-spy="scroll"]').each(function () {
            var b = a(this);
            c.call(b, b.data());
        });
    });
}(jQuery), +function (a) {
    "use strict";

    function b(b) {
        return this.each(function () {
            var d = a(this),
                e = d.data("bs.tab");
            e || d.data("bs.tab", e = new c(this)), "string" == typeof b && e[b]();
        });
    }
    var c = function c(b) {
        this.element = a(b);
    };
    c.VERSION = "3.2.0", c.prototype.show = function () {
        var b = this.element,
            c = b.closest("ul:not(.dropdown-menu)"),
            d = b.data("target");
        if (d || (d = b.attr("href"), d = d && d.replace(/.*(?=#[^\s]*$)/, "")), !b.parent("li").hasClass("active")) {
            var e = c.find(".active:last a")[0],
                f = a.Event("show.bs.tab", {
                relatedTarget: e
            });
            if (b.trigger(f), !f.isDefaultPrevented()) {
                var g = a(d);
                this.activate(b.closest("li"), c), this.activate(g, g.parent(), function () {
                    b.trigger({
                        type: "shown.bs.tab",
                        relatedTarget: e
                    });
                });
            }
        }
    }, c.prototype.activate = function (b, c, d) {
        function e() {
            f.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"), b.addClass("active"), g ? (b[0].offsetWidth, b.addClass("in")) : b.removeClass("fade"), b.parent(".dropdown-menu") && b.closest("li.dropdown").addClass("active"), d && d();
        }
        var f = c.find("> .active"),
            g = d && a.support.transition && f.hasClass("fade");
        g ? f.one("bsTransitionEnd", e).emulateTransitionEnd(150) : e(), f.removeClass("in");
    };
    var d = a.fn.tab;
    a.fn.tab = b, a.fn.tab.Constructor = c, a.fn.tab.noConflict = function () {
        return a.fn.tab = d, this;
    }, a(document).on("click.bs.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function (c) {
        c.preventDefault(), b.call(a(this), "show");
    });
}(jQuery), +function (a) {
    "use strict";

    function b(b) {
        return this.each(function () {
            var d = a(this),
                e = d.data("bs.affix"),
                f = "object" == (typeof b === "undefined" ? "undefined" : _typeof(b)) && b;
            e || d.data("bs.affix", e = new c(this, f)), "string" == typeof b && e[b]();
        });
    }
    var c = function c(b, d) {
        this.options = a.extend({}, c.DEFAULTS, d), this.$target = a(this.options.target).on("scroll.bs.affix.data-api", a.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", a.proxy(this.checkPositionWithEventLoop, this)), this.$element = a(b), this.affixed = this.unpin = this.pinnedOffset = null, this.checkPosition();
    };
    c.VERSION = "3.2.0", c.RESET = "affix affix-top affix-bottom", c.DEFAULTS = {
        offset: 0,
        target: window
    }, c.prototype.getPinnedOffset = function () {
        if (this.pinnedOffset) return this.pinnedOffset;
        this.$element.removeClass(c.RESET).addClass("affix");
        var a = this.$target.scrollTop(),
            b = this.$element.offset();
        return this.pinnedOffset = b.top - a;
    }, c.prototype.checkPositionWithEventLoop = function () {
        setTimeout(a.proxy(this.checkPosition, this), 1);
    }, c.prototype.checkPosition = function () {
        if (this.$element.is(":visible")) {
            var b = a(document).height(),
                d = this.$target.scrollTop(),
                e = this.$element.offset(),
                f = this.options.offset,
                g = f.top,
                h = f.bottom;
            "object" != (typeof f === "undefined" ? "undefined" : _typeof(f)) && (h = g = f), "function" == typeof g && (g = f.top(this.$element)), "function" == typeof h && (h = f.bottom(this.$element));
            var i = null != this.unpin && d + this.unpin <= e.top ? !1 : null != h && e.top + this.$element.height() >= b - h ? "bottom" : null != g && g >= d ? "top" : !1;
            if (this.affixed !== i) {
                null != this.unpin && this.$element.css("top", "");
                var j = "affix" + (i ? "-" + i : ""),
                    k = a.Event(j + ".bs.affix");
                this.$element.trigger(k), k.isDefaultPrevented() || (this.affixed = i, this.unpin = "bottom" == i ? this.getPinnedOffset() : null, this.$element.removeClass(c.RESET).addClass(j).trigger(a.Event(j.replace("affix", "affixed"))), "bottom" == i && this.$element.offset({
                    top: b - this.$element.height() - h
                }));
            }
        }
    };
    var d = a.fn.affix;
    a.fn.affix = b, a.fn.affix.Constructor = c, a.fn.affix.noConflict = function () {
        return a.fn.affix = d, this;
    }, a(window).on("load", function () {
        a('[data-spy="affix"]').each(function () {
            var c = a(this),
                d = c.data();
            d.offset = d.offset || {}, d.offsetBottom && (d.offset.bottom = d.offsetBottom), d.offsetTop && (d.offset.top = d.offsetTop), b.call(c, d);
        });
    });
}(jQuery);

var data = {
    dyslexia: "Dyslexi är en nedsättning som gör att hjärnan har svårt att automatisera tolkningen av ord. Detta gör att personer med denna nedsättning kan ha svårt att läsa och skriva. Dyslexi är inte kopplat till syn eller intelligens. Orsakerna till dyslexi är fortfarande oklart.",
    "dyslexia-listItems": ["Undvik text i liten storlek och långa texter. Se till att ha ordentligt med radavstånd.", "Undvik svåra ord och facktermer.", "Erbjud lättlästa versioner av facktexter.", "Undvik typsnitt med krångliga och komplexa figurer."],
    parkinsons: "Vid Parkinsons sjukdom förstörs cellerna i hjärnan som tillverkar dopamin vilket gör att hjärnan får en nedsatt förmåga att skicka signaler. Personer med Parkinsons kan drabbas av symptom som skakningar, stela muskler och sämre rörelseförmåga. Orsakerna till Parkinsons sjukdom är fortfarande oklart.",
    "parkinsons-listItems": ["Se till att webbplatsen kan användas med andra hjälpmedel än mus, till exempel tangentbordsnavigering.", "Ha tillräckligt med luft mellan komponenter", "Ha tillräckligt stora klickytor.", "Undvik typsnitt med krångliga och komplexa figurer."],
    "parkinsons-moreInfo": "<a href='http://www.parkinsonforbundet.se'>Parkinsonsförbundet</a>",
    yellowBlueColorBlindness: "Personer med defekt färgseende har svårt att skilja på vissa eller alla färger. Ett fullt fungerande öga har tre olika tappar som tar upp färgerna violett, grön och röd. När en eller flera av tapparna saknas eller är defekta leder det till defekt färgseende. Gul-blå färgblindhet (Tritanopi) är sällsynt. Namnet är missledande då det inte är färgerna gul och blå som förväxlas, utan blå med grön och gul med lila.",
    "yellowBlueColorBlindness-listItems": ["Använd inte färg som det enda sättet att förmedla information, indikera en handling eller identifiera ett element. Markera till exempel inte ett felaktigt formulärfält endast med en röd ram utan komplettera även med text och gärna en ikon.", "Erbjud gärna ett högkontrast-läge.", "Ha tillräckligt stora klickytor.", "Undvik typsnitt med krångliga och komplexa figurer."],
    "yellowBlueColorBlindness-moreInfo": "<a href='https://sv.wikipedia.org/wiki/Defekt_f%C3%A4rgseende'>Wikipedia om defekt färgseende</a>",
    farsightedness: "Personer med Hyperopi ser suddigt på nära håll, men bra på långt håll. Nedsättningen uppstår på grund av att ljuset inte bryts rätt i ögat. Det är en av de vanligaste synnedsättningarna.",
    "farsightedness-listItems": ["Undvik text i liten storlek.", "Webbsidan ska gå att förstora (zoomas) till minst 200 % så att besökaren kan anpassa innehållets storlek efter sina behov.", "Erbjud uppläsning av innehållet."],
    "farsightedness-moreInfo": "<a href='https://webbriktlinjer.se/r/39-ge-webbplatsen-en-god-lasbarhet/'>Webbriktlinje Ge webbplatsen god läsbarhet</a>",
    colorBlindness: "Defekt färgseende innebär att en person har svårt att skilja på vissa eller alla färger. Ett fullt fungerande öga har tre olika typer av tappar som tar upp olika färger: violett, grön och röd. Orsaken till defekt färgseende är att en eller flera av dessa typer av tappar saknas eller är defekta. Helt färgblind (Monokromasi/akromatopsi) är mycket sällsynt. Personer med denna synnedsättning ser inga färger utan ser endast i gråskala.",
    "colorBlindness-listItems": ["Använd inte färg som det enda sättet att förmedla information, indikera en handling eller identifiera element. Markera t.ex. inte ett felaktigt formulärfält endast med röd ram, komplettera även med text eller ikon.", "Det kan vara en bra idé att erbjuda ett högkontrast-läge."]
};

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.showBlurr = showBlurr;

$(document).ready(function () {
    var tooltip = $(".tool-tip");
    var infoHeading = $(".disability-info-heading");
    var infoParagraph = $(".disability-info-paragraph");
    var adviceList = $(".advice-list");
    var moreInfoParagraph = $(".more-info-paragraph");
    var moreInfoPanel = $("#more-info-panel");
    var mainHeading = $(".main-heading");
    var logo = $(".logo");
    $(".menu-btn").click(function () {
        var $this = $(this);
        infoHeading.empty();
        infoParagraph.empty();
        adviceList.empty();
        moreInfoParagraph.empty();
        moreInfoPanel.hide();
        tooltip.animate({
            left: parseInt(tooltip.css("left"), 10) == 0 ? -tooltip.outerWidth() : 0
        });
        infoHeading.append($(this).text());
        logo.hide();
        mainHeading.show();
        mainHeading.append($(this).text());
        $(this).closest(".dropdown").find(".selected").text($(this).text());
        var id = $(this).attr("id");
        infoParagraph.append(data[id]);
        $.each(data[id + "-listItems"], function (key, value) {
            adviceList.append("<li>" + value + "</li>");
        });
        if (data[id + "-moreInfo"]) {
            moreInfoPanel.show();
            moreInfoParagraph.append(data[id + "-moreInfo"]);
        }
        if ($(this).hasClass("farsightedness")) {
            showBlurr();
        }
    });
    $("#reset-btn").click(function () {
        tooltip.animate({
            left: parseInt(tooltip.css("marginLeft"), 10) == 0 ? tooltip.outerWidth() : 0
        });
        mainHeading.hide();
        mainHeading.empty();
        logo.show();
        $(".dropdown").find("#Syn").text("Syn");
        $(".dropdown").find("#Motorik").text("Motorik");
        resetCSS();
    });
    $(".collapse").on("shown.bs.collapse", function () {
        $(this).parent().find(".down-arrow").toggle();
        $(this).parent().find(".up-arrow").toggle();
    }).on("hidden.bs.collapse", function () {
        $(this).parent().find(".up-arrow").toggle();
        $(this).parent().find(".down-arrow").toggle();
    });
});

function showBlurr(e) {
    console.log("import funkade!");
    chrome.tabs.insertCSS({
        file: "simulations/farsightedness/css/simulation.css"
    });
}

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkaXN0XFxqc1xcc2NyaXB0Lm1pbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7QUNBQSxDQUFDLFVBQVMsQ0FBVCxFQUFZLFNBQVosRUFBdUI7QUFDcEIsUUFBSSxDQUFKO0FBQUEsUUFBTyxDQUFQO0FBQUEsUUFBVSxXQUFXLFNBQVgseUNBQVcsU0FBWCxDQUFWO0FBQUEsUUFBZ0MsSUFBSSxFQUFFLFFBQXRDO0FBQUEsUUFBZ0QsSUFBSSxFQUFFLFFBQXREO0FBQUEsUUFBZ0UsSUFBSSxFQUFFLGVBQXRFO0FBQUEsUUFBdUYsSUFBSSxFQUFFLE1BQTdGO0FBQUEsUUFBcUcsSUFBSSxFQUFFLENBQTNHO0FBQUEsUUFBOEcsSUFBSSxFQUFsSDtBQUFBLFFBQXNILElBQUksRUFBMUg7QUFBQSxRQUE4SCxJQUFJLE9BQWxJO0FBQUEsUUFBMkksSUFBSSxFQUFFLE1BQWpKO0FBQUEsUUFBeUosSUFBSSxFQUFFLElBQS9KO0FBQUEsUUFBcUssSUFBSSxFQUFFLEtBQTNLO0FBQUEsUUFBa0wsSUFBSSxFQUFFLE9BQXhMO0FBQUEsUUFBaU0sSUFBSSxFQUFFLFFBQXZNO0FBQUEsUUFBaU4sSUFBSSxFQUFFLGNBQXZOO0FBQUEsUUFBdU8sSUFBSSxFQUFFLElBQTdPO0FBQUEsUUFBbVAsSUFBSSxTQUFKLENBQUksQ0FBUyxDQUFULEVBQVksQ0FBWixFQUFlO0FBQ2xRLGVBQU8sSUFBSSxFQUFFLEVBQUYsQ0FBSyxJQUFULENBQWMsQ0FBZCxFQUFpQixDQUFqQixFQUFvQixDQUFwQixDQUFQO0FBQ0gsS0FGRDtBQUFBLFFBRUcsSUFBSSxzQ0FBc0MsTUFGN0M7QUFBQSxRQUVxRCxJQUFJLE1BRnpEO0FBQUEsUUFFaUUsSUFBSSxxQ0FGckU7QUFBQSxRQUU0RyxJQUFJLDRCQUZoSDtBQUFBLFFBRThJLElBQUksT0FGbEo7QUFBQSxRQUUySixJQUFJLGNBRi9KO0FBQUEsUUFF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RzRCLFlBQVc7QUFDbkMsVUFBRSxJQUFGLEVBQVEsTUFBUixHQUFpQixJQUFqQixDQUFzQixXQUF0QixFQUFtQyxNQUFuQztBQUNBLFVBQUUsSUFBRixFQUFRLE1BQVIsR0FBaUIsSUFBakIsQ0FBc0IsYUFBdEIsRUFBcUMsTUFBckM7QUFDSCxLQU5EO0FBT0gsQ0F2REQ7O0FBeURBLFNBQVMsU0FBVCxDQUFtQixDQUFuQixFQUFzQjtBQUNsQixZQUFRLEdBQVIsQ0FBWSxpQkFBWjtBQUNBLFdBQU8sSUFBUCxDQUFZLFNBQVosQ0FBc0I7QUFDbEIsY0FBTTtBQURZLEtBQXRCO0FBR0giLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiKGZ1bmN0aW9uKGUsIHVuZGVmaW5lZCkge1xuICAgIHZhciB0LCBuLCByID0gdHlwZW9mIHVuZGVmaW5lZCwgaSA9IGUubG9jYXRpb24sIG8gPSBlLmRvY3VtZW50LCBzID0gby5kb2N1bWVudEVsZW1lbnQsIGEgPSBlLmpRdWVyeSwgdSA9IGUuJCwgbCA9IHt9LCBjID0gW10sIHAgPSBcIjIuMC4zXCIsIGYgPSBjLmNvbmNhdCwgaCA9IGMucHVzaCwgZCA9IGMuc2xpY2UsIGcgPSBjLmluZGV4T2YsIG0gPSBsLnRvU3RyaW5nLCB5ID0gbC5oYXNPd25Qcm9wZXJ0eSwgdiA9IHAudHJpbSwgeCA9IGZ1bmN0aW9uKGUsIG4pIHtcbiAgICAgICAgcmV0dXJuIG5ldyB4LmZuLmluaXQoZSwgbiwgdCk7XG4gICAgfSwgYiA9IC9bKy1dPyg/OlxcZCpcXC58KVxcZCsoPzpbZUVdWystXT9cXGQrfCkvLnNvdXJjZSwgdyA9IC9cXFMrL2csIFQgPSAvXig/OlxccyooPFtcXHdcXFddKz4pW14+XSp8IyhbXFx3LV0qKSkkLywgQyA9IC9ePChcXHcrKVxccypcXC8/Pig/OjxcXC9cXDE+fCkkLywgayA9IC9eLW1zLS8sIE4gPSAvLShbXFxkYS16XSkvZ2ksIEUgPSBmdW5jdGlvbihlLCB0KSB7XG4gICAgICAgIHJldHVybiB0LnRvVXBwZXJDYXNlKCk7XG4gICAgfSwgUyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBvLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIFMsICExKSwgZS5yZW1vdmVFdmVudExpc3RlbmVyKFwibG9hZFwiLCBTLCAhMSksIFxuICAgICAgICB4LnJlYWR5KCk7XG4gICAgfTtcbiAgICB4LmZuID0geC5wcm90b3R5cGUgPSB7XG4gICAgICAgIGpxdWVyeTogcCxcbiAgICAgICAgY29uc3RydWN0b3I6IHgsXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKGUsIHQsIG4pIHtcbiAgICAgICAgICAgIHZhciByLCBpO1xuICAgICAgICAgICAgaWYgKCFlKSByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIGlmIChcInN0cmluZ1wiID09IHR5cGVvZiBlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHIgPSBcIjxcIiA9PT0gZS5jaGFyQXQoMCkgJiYgXCI+XCIgPT09IGUuY2hhckF0KGUubGVuZ3RoIC0gMSkgJiYgZS5sZW5ndGggPj0gMyA/IFsgbnVsbCwgZSwgbnVsbCBdIDogVC5leGVjKGUpLCBcbiAgICAgICAgICAgICAgICAhciB8fCAhclsxXSAmJiB0KSByZXR1cm4gIXQgfHwgdC5qcXVlcnkgPyAodCB8fCBuKS5maW5kKGUpIDogdGhpcy5jb25zdHJ1Y3Rvcih0KS5maW5kKGUpO1xuICAgICAgICAgICAgICAgIGlmIChyWzFdKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ID0gdCBpbnN0YW5jZW9mIHggPyB0WzBdIDogdCwgeC5tZXJnZSh0aGlzLCB4LnBhcnNlSFRNTChyWzFdLCB0ICYmIHQubm9kZVR5cGUgPyB0Lm93bmVyRG9jdW1lbnQgfHwgdCA6IG8sICEwKSksIFxuICAgICAgICAgICAgICAgICAgICBDLnRlc3QoclsxXSkgJiYgeC5pc1BsYWluT2JqZWN0KHQpKSBmb3IgKHIgaW4gdCkgeC5pc0Z1bmN0aW9uKHRoaXNbcl0pID8gdGhpc1tyXSh0W3JdKSA6IHRoaXMuYXR0cihyLCB0W3JdKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBpID0gby5nZXRFbGVtZW50QnlJZChyWzJdKSwgaSAmJiBpLnBhcmVudE5vZGUgJiYgKHRoaXMubGVuZ3RoID0gMSwgdGhpc1swXSA9IGkpLCBcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQgPSBvLCB0aGlzLnNlbGVjdG9yID0gZSwgdGhpcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBlLm5vZGVUeXBlID8gKHRoaXMuY29udGV4dCA9IHRoaXNbMF0gPSBlLCB0aGlzLmxlbmd0aCA9IDEsIHRoaXMpIDogeC5pc0Z1bmN0aW9uKGUpID8gbi5yZWFkeShlKSA6IChlLnNlbGVjdG9yICE9PSB1bmRlZmluZWQgJiYgKHRoaXMuc2VsZWN0b3IgPSBlLnNlbGVjdG9yLCBcbiAgICAgICAgICAgIHRoaXMuY29udGV4dCA9IGUuY29udGV4dCksIHgubWFrZUFycmF5KGUsIHRoaXMpKTtcbiAgICAgICAgfSxcbiAgICAgICAgc2VsZWN0b3I6IFwiXCIsXG4gICAgICAgIGxlbmd0aDogMCxcbiAgICAgICAgdG9BcnJheTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gZC5jYWxsKHRoaXMpO1xuICAgICAgICB9LFxuICAgICAgICBnZXQ6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsID09IGUgPyB0aGlzLnRvQXJyYXkoKSA6IDAgPiBlID8gdGhpc1t0aGlzLmxlbmd0aCArIGVdIDogdGhpc1tlXTtcbiAgICAgICAgfSxcbiAgICAgICAgcHVzaFN0YWNrOiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICB2YXIgdCA9IHgubWVyZ2UodGhpcy5jb25zdHJ1Y3RvcigpLCBlKTtcbiAgICAgICAgICAgIHJldHVybiB0LnByZXZPYmplY3QgPSB0aGlzLCB0LmNvbnRleHQgPSB0aGlzLmNvbnRleHQsIHQ7XG4gICAgICAgIH0sXG4gICAgICAgIGVhY2g6IGZ1bmN0aW9uKGUsIHQpIHtcbiAgICAgICAgICAgIHJldHVybiB4LmVhY2godGhpcywgZSwgdCk7XG4gICAgICAgIH0sXG4gICAgICAgIHJlYWR5OiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICByZXR1cm4geC5yZWFkeS5wcm9taXNlKCkuZG9uZShlKSwgdGhpcztcbiAgICAgICAgfSxcbiAgICAgICAgc2xpY2U6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHVzaFN0YWNrKGQuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gICAgICAgIH0sXG4gICAgICAgIGZpcnN0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVxKDApO1xuICAgICAgICB9LFxuICAgICAgICBsYXN0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVxKC0xKTtcbiAgICAgICAgfSxcbiAgICAgICAgZXE6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIHZhciB0ID0gdGhpcy5sZW5ndGgsIG4gPSArZSArICgwID4gZSA/IHQgOiAwKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnB1c2hTdGFjayhuID49IDAgJiYgdCA+IG4gPyBbIHRoaXNbbl0gXSA6IFtdKTtcbiAgICAgICAgfSxcbiAgICAgICAgbWFwOiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wdXNoU3RhY2soeC5tYXAodGhpcywgZnVuY3Rpb24odCwgbikge1xuICAgICAgICAgICAgICAgIHJldHVybiBlLmNhbGwodCwgbiwgdCk7XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH0sXG4gICAgICAgIGVuZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcmV2T2JqZWN0IHx8IHRoaXMuY29uc3RydWN0b3IobnVsbCk7XG4gICAgICAgIH0sXG4gICAgICAgIHB1c2g6IGgsXG4gICAgICAgIHNvcnQ6IFtdLnNvcnQsXG4gICAgICAgIHNwbGljZTogW10uc3BsaWNlXG4gICAgfSwgeC5mbi5pbml0LnByb3RvdHlwZSA9IHguZm4sIHguZXh0ZW5kID0geC5mbi5leHRlbmQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGUsIHQsIG4sIHIsIGksIG8sIHMgPSBhcmd1bWVudHNbMF0gfHwge30sIGEgPSAxLCB1ID0gYXJndW1lbnRzLmxlbmd0aCwgbCA9ICExO1xuICAgICAgICBmb3IgKFwiYm9vbGVhblwiID09IHR5cGVvZiBzICYmIChsID0gcywgcyA9IGFyZ3VtZW50c1sxXSB8fCB7fSwgYSA9IDIpLCBcIm9iamVjdFwiID09IHR5cGVvZiBzIHx8IHguaXNGdW5jdGlvbihzKSB8fCAocyA9IHt9KSwgXG4gICAgICAgIHUgPT09IGEgJiYgKHMgPSB0aGlzLCAtLWEpOyB1ID4gYTsgYSsrKSBpZiAobnVsbCAhPSAoZSA9IGFyZ3VtZW50c1thXSkpIGZvciAodCBpbiBlKSBuID0gc1t0XSwgXG4gICAgICAgIHIgPSBlW3RdLCBzICE9PSByICYmIChsICYmIHIgJiYgKHguaXNQbGFpbk9iamVjdChyKSB8fCAoaSA9IHguaXNBcnJheShyKSkpID8gKGkgPyAoaSA9ICExLCBcbiAgICAgICAgbyA9IG4gJiYgeC5pc0FycmF5KG4pID8gbiA6IFtdKSA6IG8gPSBuICYmIHguaXNQbGFpbk9iamVjdChuKSA/IG4gOiB7fSwgc1t0XSA9IHguZXh0ZW5kKGwsIG8sIHIpKSA6IHIgIT09IHVuZGVmaW5lZCAmJiAoc1t0XSA9IHIpKTtcbiAgICAgICAgcmV0dXJuIHM7XG4gICAgfSwgeC5leHRlbmQoe1xuICAgICAgICBleHBhbmRvOiBcImpRdWVyeVwiICsgKHAgKyBNYXRoLnJhbmRvbSgpKS5yZXBsYWNlKC9cXEQvZywgXCJcIiksXG4gICAgICAgIG5vQ29uZmxpY3Q6IGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgICAgIHJldHVybiBlLiQgPT09IHggJiYgKGUuJCA9IHUpLCB0ICYmIGUualF1ZXJ5ID09PSB4ICYmIChlLmpRdWVyeSA9IGEpLCB4O1xuICAgICAgICB9LFxuICAgICAgICBpc1JlYWR5OiAhMSxcbiAgICAgICAgcmVhZHlXYWl0OiAxLFxuICAgICAgICBob2xkUmVhZHk6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGUgPyB4LnJlYWR5V2FpdCsrIDogeC5yZWFkeSghMCk7XG4gICAgICAgIH0sXG4gICAgICAgIHJlYWR5OiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAoZSA9PT0gITAgPyAtLXgucmVhZHlXYWl0IDogeC5pc1JlYWR5KSB8fCAoeC5pc1JlYWR5ID0gITAsIGUgIT09ICEwICYmIC0teC5yZWFkeVdhaXQgPiAwIHx8IChuLnJlc29sdmVXaXRoKG8sIFsgeCBdKSwgXG4gICAgICAgICAgICB4LmZuLnRyaWdnZXIgJiYgeChvKS50cmlnZ2VyKFwicmVhZHlcIikub2ZmKFwicmVhZHlcIikpKTtcbiAgICAgICAgfSxcbiAgICAgICAgaXNGdW5jdGlvbjogZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgcmV0dXJuIFwiZnVuY3Rpb25cIiA9PT0geC50eXBlKGUpO1xuICAgICAgICB9LFxuICAgICAgICBpc0FycmF5OiBBcnJheS5pc0FycmF5LFxuICAgICAgICBpc1dpbmRvdzogZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGwgIT0gZSAmJiBlID09PSBlLndpbmRvdztcbiAgICAgICAgfSxcbiAgICAgICAgaXNOdW1lcmljOiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICByZXR1cm4gIWlzTmFOKHBhcnNlRmxvYXQoZSkpICYmIGlzRmluaXRlKGUpO1xuICAgICAgICB9LFxuICAgICAgICB0eXBlOiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbCA9PSBlID8gZSArIFwiXCIgOiBcIm9iamVjdFwiID09IHR5cGVvZiBlIHx8IFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgZSA/IGxbbS5jYWxsKGUpXSB8fCBcIm9iamVjdFwiIDogdHlwZW9mIGU7XG4gICAgICAgIH0sXG4gICAgICAgIGlzUGxhaW5PYmplY3Q6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGlmIChcIm9iamVjdFwiICE9PSB4LnR5cGUoZSkgfHwgZS5ub2RlVHlwZSB8fCB4LmlzV2luZG93KGUpKSByZXR1cm4gITE7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGlmIChlLmNvbnN0cnVjdG9yICYmICF5LmNhbGwoZS5jb25zdHJ1Y3Rvci5wcm90b3R5cGUsIFwiaXNQcm90b3R5cGVPZlwiKSkgcmV0dXJuICExO1xuICAgICAgICAgICAgfSBjYXRjaCAodCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAhMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAhMDtcbiAgICAgICAgfSxcbiAgICAgICAgaXNFbXB0eU9iamVjdDogZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgdmFyIHQ7XG4gICAgICAgICAgICBmb3IgKHQgaW4gZSkgcmV0dXJuICExO1xuICAgICAgICAgICAgcmV0dXJuICEwO1xuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoZSk7XG4gICAgICAgIH0sXG4gICAgICAgIHBhcnNlSFRNTDogZnVuY3Rpb24oZSwgdCwgbikge1xuICAgICAgICAgICAgaWYgKCFlIHx8IFwic3RyaW5nXCIgIT0gdHlwZW9mIGUpIHJldHVybiBudWxsO1xuICAgICAgICAgICAgXCJib29sZWFuXCIgPT0gdHlwZW9mIHQgJiYgKG4gPSB0LCB0ID0gITEpLCB0ID0gdCB8fCBvO1xuICAgICAgICAgICAgdmFyIHIgPSBDLmV4ZWMoZSksIGkgPSAhbiAmJiBbXTtcbiAgICAgICAgICAgIHJldHVybiByID8gWyB0LmNyZWF0ZUVsZW1lbnQoclsxXSkgXSA6IChyID0geC5idWlsZEZyYWdtZW50KFsgZSBdLCB0LCBpKSwgaSAmJiB4KGkpLnJlbW92ZSgpLCBcbiAgICAgICAgICAgIHgubWVyZ2UoW10sIHIuY2hpbGROb2RlcykpO1xuICAgICAgICB9LFxuICAgICAgICBwYXJzZUpTT046IEpTT04ucGFyc2UsXG4gICAgICAgIHBhcnNlWE1MOiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICB2YXIgdCwgbjtcbiAgICAgICAgICAgIGlmICghZSB8fCBcInN0cmluZ1wiICE9IHR5cGVvZiBlKSByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbiA9IG5ldyBET01QYXJzZXIoKSwgdCA9IG4ucGFyc2VGcm9tU3RyaW5nKGUsIFwidGV4dC94bWxcIik7XG4gICAgICAgICAgICB9IGNhdGNoIChyKSB7XG4gICAgICAgICAgICAgICAgdCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAoIXQgfHwgdC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInBhcnNlcmVycm9yXCIpLmxlbmd0aCkgJiYgeC5lcnJvcihcIkludmFsaWQgWE1MOiBcIiArIGUpLCBcbiAgICAgICAgICAgIHQ7XG4gICAgICAgIH0sXG4gICAgICAgIG5vb3A6IGZ1bmN0aW9uKCkge30sXG4gICAgICAgIGdsb2JhbEV2YWw6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIHZhciB0LCBuID0gZXZhbDtcbiAgICAgICAgICAgIGUgPSB4LnRyaW0oZSksIGUgJiYgKDEgPT09IGUuaW5kZXhPZihcInVzZSBzdHJpY3RcIikgPyAodCA9IG8uY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKSwgXG4gICAgICAgICAgICB0LnRleHQgPSBlLCBvLmhlYWQuYXBwZW5kQ2hpbGQodCkucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0KSkgOiBuKGUpKTtcbiAgICAgICAgfSxcbiAgICAgICAgY2FtZWxDYXNlOiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICByZXR1cm4gZS5yZXBsYWNlKGssIFwibXMtXCIpLnJlcGxhY2UoTiwgRSk7XG4gICAgICAgIH0sXG4gICAgICAgIG5vZGVOYW1lOiBmdW5jdGlvbihlLCB0KSB7XG4gICAgICAgICAgICByZXR1cm4gZS5ub2RlTmFtZSAmJiBlLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09IHQudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgfSxcbiAgICAgICAgZWFjaDogZnVuY3Rpb24oZSwgdCwgbikge1xuICAgICAgICAgICAgdmFyIHIsIGkgPSAwLCBvID0gZS5sZW5ndGgsIHMgPSBqKGUpO1xuICAgICAgICAgICAgaWYgKG4pIHtcbiAgICAgICAgICAgICAgICBpZiAocykge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKDtvID4gaTsgaSsrKSBpZiAociA9IHQuYXBwbHkoZVtpXSwgbiksIHIgPT09ICExKSBicmVhaztcbiAgICAgICAgICAgICAgICB9IGVsc2UgZm9yIChpIGluIGUpIGlmIChyID0gdC5hcHBseShlW2ldLCBuKSwgciA9PT0gITEpIGJyZWFrO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChzKSB7XG4gICAgICAgICAgICAgICAgZm9yICg7byA+IGk7IGkrKykgaWYgKHIgPSB0LmNhbGwoZVtpXSwgaSwgZVtpXSksIHIgPT09ICExKSBicmVhaztcbiAgICAgICAgICAgIH0gZWxzZSBmb3IgKGkgaW4gZSkgaWYgKHIgPSB0LmNhbGwoZVtpXSwgaSwgZVtpXSksIHIgPT09ICExKSBicmVhaztcbiAgICAgICAgICAgIHJldHVybiBlO1xuICAgICAgICB9LFxuICAgICAgICB0cmltOiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbCA9PSBlID8gXCJcIiA6IHYuY2FsbChlKTtcbiAgICAgICAgfSxcbiAgICAgICAgbWFrZUFycmF5OiBmdW5jdGlvbihlLCB0KSB7XG4gICAgICAgICAgICB2YXIgbiA9IHQgfHwgW107XG4gICAgICAgICAgICByZXR1cm4gbnVsbCAhPSBlICYmIChqKE9iamVjdChlKSkgPyB4Lm1lcmdlKG4sIFwic3RyaW5nXCIgPT0gdHlwZW9mIGUgPyBbIGUgXSA6IGUpIDogaC5jYWxsKG4sIGUpKSwgXG4gICAgICAgICAgICBuO1xuICAgICAgICB9LFxuICAgICAgICBpbkFycmF5OiBmdW5jdGlvbihlLCB0LCBuKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbCA9PSB0ID8gLTEgOiBnLmNhbGwodCwgZSwgbik7XG4gICAgICAgIH0sXG4gICAgICAgIG1lcmdlOiBmdW5jdGlvbihlLCB0KSB7XG4gICAgICAgICAgICB2YXIgbiA9IHQubGVuZ3RoLCByID0gZS5sZW5ndGgsIGkgPSAwO1xuICAgICAgICAgICAgaWYgKFwibnVtYmVyXCIgPT0gdHlwZW9mIG4pIGZvciAoO24gPiBpOyBpKyspIGVbcisrXSA9IHRbaV07IGVsc2Ugd2hpbGUgKHRbaV0gIT09IHVuZGVmaW5lZCkgZVtyKytdID0gdFtpKytdO1xuICAgICAgICAgICAgcmV0dXJuIGUubGVuZ3RoID0gciwgZTtcbiAgICAgICAgfSxcbiAgICAgICAgZ3JlcDogZnVuY3Rpb24oZSwgdCwgbikge1xuICAgICAgICAgICAgdmFyIHIsIGkgPSBbXSwgbyA9IDAsIHMgPSBlLmxlbmd0aDtcbiAgICAgICAgICAgIGZvciAobiA9ICEhbjsgcyA+IG87IG8rKykgciA9ICEhdChlW29dLCBvKSwgbiAhPT0gciAmJiBpLnB1c2goZVtvXSk7XG4gICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgfSxcbiAgICAgICAgbWFwOiBmdW5jdGlvbihlLCB0LCBuKSB7XG4gICAgICAgICAgICB2YXIgciwgaSA9IDAsIG8gPSBlLmxlbmd0aCwgcyA9IGooZSksIGEgPSBbXTtcbiAgICAgICAgICAgIGlmIChzKSBmb3IgKDtvID4gaTsgaSsrKSByID0gdChlW2ldLCBpLCBuKSwgbnVsbCAhPSByICYmIChhW2EubGVuZ3RoXSA9IHIpOyBlbHNlIGZvciAoaSBpbiBlKSByID0gdChlW2ldLCBpLCBuKSwgXG4gICAgICAgICAgICBudWxsICE9IHIgJiYgKGFbYS5sZW5ndGhdID0gcik7XG4gICAgICAgICAgICByZXR1cm4gZi5hcHBseShbXSwgYSk7XG4gICAgICAgIH0sXG4gICAgICAgIGd1aWQ6IDEsXG4gICAgICAgIHByb3h5OiBmdW5jdGlvbihlLCB0KSB7XG4gICAgICAgICAgICB2YXIgbiwgciwgaTtcbiAgICAgICAgICAgIHJldHVybiBcInN0cmluZ1wiID09IHR5cGVvZiB0ICYmIChuID0gZVt0XSwgdCA9IGUsIGUgPSBuKSwgeC5pc0Z1bmN0aW9uKGUpID8gKHIgPSBkLmNhbGwoYXJndW1lbnRzLCAyKSwgXG4gICAgICAgICAgICBpID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGUuYXBwbHkodCB8fCB0aGlzLCByLmNvbmNhdChkLmNhbGwoYXJndW1lbnRzKSkpO1xuICAgICAgICAgICAgfSwgaS5ndWlkID0gZS5ndWlkID0gZS5ndWlkIHx8IHguZ3VpZCsrLCBpKSA6IHVuZGVmaW5lZDtcbiAgICAgICAgfSxcbiAgICAgICAgYWNjZXNzOiBmdW5jdGlvbihlLCB0LCBuLCByLCBpLCBvLCBzKSB7XG4gICAgICAgICAgICB2YXIgYSA9IDAsIHUgPSBlLmxlbmd0aCwgbCA9IG51bGwgPT0gbjtcbiAgICAgICAgICAgIGlmIChcIm9iamVjdFwiID09PSB4LnR5cGUobikpIHtcbiAgICAgICAgICAgICAgICBpID0gITA7XG4gICAgICAgICAgICAgICAgZm9yIChhIGluIG4pIHguYWNjZXNzKGUsIHQsIGEsIG5bYV0sICEwLCBvLCBzKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAociAhPT0gdW5kZWZpbmVkICYmIChpID0gITAsIHguaXNGdW5jdGlvbihyKSB8fCAocyA9ICEwKSwgbCAmJiAocyA/ICh0LmNhbGwoZSwgciksIFxuICAgICAgICAgICAgdCA9IG51bGwpIDogKGwgPSB0LCB0ID0gZnVuY3Rpb24oZSwgdCwgbikge1xuICAgICAgICAgICAgICAgIHJldHVybiBsLmNhbGwoeChlKSwgbik7XG4gICAgICAgICAgICB9KSksIHQpKSBmb3IgKDt1ID4gYTsgYSsrKSB0KGVbYV0sIG4sIHMgPyByIDogci5jYWxsKGVbYV0sIGEsIHQoZVthXSwgbikpKTtcbiAgICAgICAgICAgIHJldHVybiBpID8gZSA6IGwgPyB0LmNhbGwoZSkgOiB1ID8gdChlWzBdLCBuKSA6IG87XG4gICAgICAgIH0sXG4gICAgICAgIG5vdzogRGF0ZS5ub3csXG4gICAgICAgIHN3YXA6IGZ1bmN0aW9uKGUsIHQsIG4sIHIpIHtcbiAgICAgICAgICAgIHZhciBpLCBvLCBzID0ge307XG4gICAgICAgICAgICBmb3IgKG8gaW4gdCkgc1tvXSA9IGUuc3R5bGVbb10sIGUuc3R5bGVbb10gPSB0W29dO1xuICAgICAgICAgICAgaSA9IG4uYXBwbHkoZSwgciB8fCBbXSk7XG4gICAgICAgICAgICBmb3IgKG8gaW4gdCkgZS5zdHlsZVtvXSA9IHNbb107XG4gICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgfVxuICAgIH0pLCB4LnJlYWR5LnByb21pc2UgPSBmdW5jdGlvbih0KSB7XG4gICAgICAgIHJldHVybiBuIHx8IChuID0geC5EZWZlcnJlZCgpLCBcImNvbXBsZXRlXCIgPT09IG8ucmVhZHlTdGF0ZSA/IHNldFRpbWVvdXQoeC5yZWFkeSkgOiAoby5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBTLCAhMSksIFxuICAgICAgICBlLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIFMsICExKSkpLCBuLnByb21pc2UodCk7XG4gICAgfSwgeC5lYWNoKFwiQm9vbGVhbiBOdW1iZXIgU3RyaW5nIEZ1bmN0aW9uIEFycmF5IERhdGUgUmVnRXhwIE9iamVjdCBFcnJvclwiLnNwbGl0KFwiIFwiKSwgZnVuY3Rpb24oZSwgdCkge1xuICAgICAgICBsW1wiW29iamVjdCBcIiArIHQgKyBcIl1cIl0gPSB0LnRvTG93ZXJDYXNlKCk7XG4gICAgfSk7XG4gICAgZnVuY3Rpb24gaihlKSB7XG4gICAgICAgIHZhciB0ID0gZS5sZW5ndGgsIG4gPSB4LnR5cGUoZSk7XG4gICAgICAgIHJldHVybiB4LmlzV2luZG93KGUpID8gITEgOiAxID09PSBlLm5vZGVUeXBlICYmIHQgPyAhMCA6IFwiYXJyYXlcIiA9PT0gbiB8fCBcImZ1bmN0aW9uXCIgIT09IG4gJiYgKDAgPT09IHQgfHwgXCJudW1iZXJcIiA9PSB0eXBlb2YgdCAmJiB0ID4gMCAmJiB0IC0gMSBpbiBlKTtcbiAgICB9XG4gICAgdCA9IHgobyksIGZ1bmN0aW9uKGUsIHVuZGVmaW5lZCkge1xuICAgICAgICB2YXIgdCwgbiwgciwgaSwgbywgcywgYSwgdSwgbCwgYywgcCwgZiwgaCwgZCwgZywgbSwgeSwgdiA9IFwic2l6emxlXCIgKyAtbmV3IERhdGUoKSwgYiA9IGUuZG9jdW1lbnQsIHcgPSAwLCBUID0gMCwgQyA9IHN0KCksIGsgPSBzdCgpLCBOID0gc3QoKSwgRSA9ICExLCBTID0gZnVuY3Rpb24oZSwgdCkge1xuICAgICAgICAgICAgcmV0dXJuIGUgPT09IHQgPyAoRSA9ICEwLCAwKSA6IDA7XG4gICAgICAgIH0sIGogPSB0eXBlb2YgdW5kZWZpbmVkLCBEID0gMSA8PCAzMSwgQSA9IHt9Lmhhc093blByb3BlcnR5LCBMID0gW10sIHEgPSBMLnBvcCwgSCA9IEwucHVzaCwgTyA9IEwucHVzaCwgRiA9IEwuc2xpY2UsIFAgPSBMLmluZGV4T2YgfHwgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgdmFyIHQgPSAwLCBuID0gdGhpcy5sZW5ndGg7XG4gICAgICAgICAgICBmb3IgKDtuID4gdDsgdCsrKSBpZiAodGhpc1t0XSA9PT0gZSkgcmV0dXJuIHQ7XG4gICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgIH0sIFIgPSBcImNoZWNrZWR8c2VsZWN0ZWR8YXN5bmN8YXV0b2ZvY3VzfGF1dG9wbGF5fGNvbnRyb2xzfGRlZmVyfGRpc2FibGVkfGhpZGRlbnxpc21hcHxsb29wfG11bHRpcGxlfG9wZW58cmVhZG9ubHl8cmVxdWlyZWR8c2NvcGVkXCIsIE0gPSBcIltcXFxceDIwXFxcXHRcXFxcclxcXFxuXFxcXGZdXCIsIFcgPSBcIig/OlxcXFxcXFxcLnxbXFxcXHctXXxbXlxcXFx4MDAtXFxcXHhhMF0pK1wiLCAkID0gVy5yZXBsYWNlKFwid1wiLCBcIncjXCIpLCBCID0gXCJcXFxcW1wiICsgTSArIFwiKihcIiArIFcgKyBcIilcIiArIE0gKyBcIiooPzooWypeJHwhfl0/PSlcIiArIE0gKyBcIiooPzooWydcXFwiXSkoKD86XFxcXFxcXFwufFteXFxcXFxcXFxdKSo/KVxcXFwzfChcIiArICQgKyBcIil8KXwpXCIgKyBNICsgXCIqXFxcXF1cIiwgSSA9IFwiOihcIiArIFcgKyBcIikoPzpcXFxcKCgoWydcXFwiXSkoKD86XFxcXFxcXFwufFteXFxcXFxcXFxdKSo/KVxcXFwzfCgoPzpcXFxcXFxcXC58W15cXFxcXFxcXCgpW1xcXFxdXXxcIiArIEIucmVwbGFjZSgzLCA4KSArIFwiKSopfC4qKVxcXFwpfClcIiwgeiA9IFJlZ0V4cChcIl5cIiArIE0gKyBcIit8KCg/Ol58W15cXFxcXFxcXF0pKD86XFxcXFxcXFwuKSopXCIgKyBNICsgXCIrJFwiLCBcImdcIiksIF8gPSBSZWdFeHAoXCJeXCIgKyBNICsgXCIqLFwiICsgTSArIFwiKlwiKSwgWCA9IFJlZ0V4cChcIl5cIiArIE0gKyBcIiooWz4rfl18XCIgKyBNICsgXCIpXCIgKyBNICsgXCIqXCIpLCBVID0gUmVnRXhwKE0gKyBcIipbK35dXCIpLCBZID0gUmVnRXhwKFwiPVwiICsgTSArIFwiKihbXlxcXFxdJ1xcXCJdKilcIiArIE0gKyBcIipcXFxcXVwiLCBcImdcIiksIFYgPSBSZWdFeHAoSSksIEcgPSBSZWdFeHAoXCJeXCIgKyAkICsgXCIkXCIpLCBKID0ge1xuICAgICAgICAgICAgSUQ6IFJlZ0V4cChcIl4jKFwiICsgVyArIFwiKVwiKSxcbiAgICAgICAgICAgIENMQVNTOiBSZWdFeHAoXCJeXFxcXC4oXCIgKyBXICsgXCIpXCIpLFxuICAgICAgICAgICAgVEFHOiBSZWdFeHAoXCJeKFwiICsgVy5yZXBsYWNlKFwid1wiLCBcIncqXCIpICsgXCIpXCIpLFxuICAgICAgICAgICAgQVRUUjogUmVnRXhwKFwiXlwiICsgQiksXG4gICAgICAgICAgICBQU0VVRE86IFJlZ0V4cChcIl5cIiArIEkpLFxuICAgICAgICAgICAgQ0hJTEQ6IFJlZ0V4cChcIl46KG9ubHl8Zmlyc3R8bGFzdHxudGh8bnRoLWxhc3QpLShjaGlsZHxvZi10eXBlKSg/OlxcXFwoXCIgKyBNICsgXCIqKGV2ZW58b2RkfCgoWystXXwpKFxcXFxkKilufClcIiArIE0gKyBcIiooPzooWystXXwpXCIgKyBNICsgXCIqKFxcXFxkKyl8KSlcIiArIE0gKyBcIipcXFxcKXwpXCIsIFwiaVwiKSxcbiAgICAgICAgICAgIGJvb2w6IFJlZ0V4cChcIl4oPzpcIiArIFIgKyBcIikkXCIsIFwiaVwiKSxcbiAgICAgICAgICAgIG5lZWRzQ29udGV4dDogUmVnRXhwKFwiXlwiICsgTSArIFwiKls+K35dfDooZXZlbnxvZGR8ZXF8Z3R8bHR8bnRofGZpcnN0fGxhc3QpKD86XFxcXChcIiArIE0gKyBcIiooKD86LVxcXFxkKT9cXFxcZCopXCIgKyBNICsgXCIqXFxcXCl8KSg/PVteLV18JClcIiwgXCJpXCIpXG4gICAgICAgIH0sIFEgPSAvXltee10rXFx7XFxzKlxcW25hdGl2ZSBcXHcvLCBLID0gL14oPzojKFtcXHctXSspfChcXHcrKXxcXC4oW1xcdy1dKykpJC8sIFogPSAvXig/OmlucHV0fHNlbGVjdHx0ZXh0YXJlYXxidXR0b24pJC9pLCBldCA9IC9eaFxcZCQvaSwgdHQgPSAvJ3xcXFxcL2csIG50ID0gUmVnRXhwKFwiXFxcXFxcXFwoW1xcXFxkYS1mXXsxLDZ9XCIgKyBNICsgXCI/fChcIiArIE0gKyBcIil8LilcIiwgXCJpZ1wiKSwgcnQgPSBmdW5jdGlvbihlLCB0LCBuKSB7XG4gICAgICAgICAgICB2YXIgciA9IFwiMHhcIiArIHQgLSA2NTUzNjtcbiAgICAgICAgICAgIHJldHVybiByICE9PSByIHx8IG4gPyB0IDogMCA+IHIgPyBTdHJpbmcuZnJvbUNoYXJDb2RlKHIgKyA2NTUzNikgOiBTdHJpbmcuZnJvbUNoYXJDb2RlKDU1Mjk2IHwgciA+PiAxMCwgNTYzMjAgfCAxMDIzICYgcik7XG4gICAgICAgIH07XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBPLmFwcGx5KEwgPSBGLmNhbGwoYi5jaGlsZE5vZGVzKSwgYi5jaGlsZE5vZGVzKSwgTFtiLmNoaWxkTm9kZXMubGVuZ3RoXS5ub2RlVHlwZTtcbiAgICAgICAgfSBjYXRjaCAoaXQpIHtcbiAgICAgICAgICAgIE8gPSB7XG4gICAgICAgICAgICAgICAgYXBwbHk6IEwubGVuZ3RoID8gZnVuY3Rpb24oZSwgdCkge1xuICAgICAgICAgICAgICAgICAgICBILmFwcGx5KGUsIEYuY2FsbCh0KSk7XG4gICAgICAgICAgICAgICAgfSA6IGZ1bmN0aW9uKGUsIHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG4gPSBlLmxlbmd0aCwgciA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlIChlW24rK10gPSB0W3IrK10pIDtcbiAgICAgICAgICAgICAgICAgICAgZS5sZW5ndGggPSBuIC0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIG90KGUsIHQsIHIsIGkpIHtcbiAgICAgICAgICAgIHZhciBvLCBzLCBhLCB1LCBsLCBmLCBnLCBtLCB4LCB3O1xuICAgICAgICAgICAgaWYgKCh0ID8gdC5vd25lckRvY3VtZW50IHx8IHQgOiBiKSAhPT0gcCAmJiBjKHQpLCB0ID0gdCB8fCBwLCByID0gciB8fCBbXSwgIWUgfHwgXCJzdHJpbmdcIiAhPSB0eXBlb2YgZSkgcmV0dXJuIHI7XG4gICAgICAgICAgICBpZiAoMSAhPT0gKHUgPSB0Lm5vZGVUeXBlKSAmJiA5ICE9PSB1KSByZXR1cm4gW107XG4gICAgICAgICAgICBpZiAoaCAmJiAhaSkge1xuICAgICAgICAgICAgICAgIGlmIChvID0gSy5leGVjKGUpKSBpZiAoYSA9IG9bMV0pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKDkgPT09IHUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzID0gdC5nZXRFbGVtZW50QnlJZChhKSwgIXMgfHwgIXMucGFyZW50Tm9kZSkgcmV0dXJuIHI7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocy5pZCA9PT0gYSkgcmV0dXJuIHIucHVzaChzKSwgcjtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0Lm93bmVyRG9jdW1lbnQgJiYgKHMgPSB0Lm93bmVyRG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYSkpICYmIHkodCwgcykgJiYgcy5pZCA9PT0gYSkgcmV0dXJuIHIucHVzaChzKSwgXG4gICAgICAgICAgICAgICAgICAgIHI7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9bMl0pIHJldHVybiBPLmFwcGx5KHIsIHQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoZSkpLCByO1xuICAgICAgICAgICAgICAgICAgICBpZiAoKGEgPSBvWzNdKSAmJiBuLmdldEVsZW1lbnRzQnlDbGFzc05hbWUgJiYgdC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKSByZXR1cm4gTy5hcHBseShyLCB0LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYSkpLCBcbiAgICAgICAgICAgICAgICAgICAgcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKG4ucXNhICYmICghZCB8fCAhZC50ZXN0KGUpKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAobSA9IGcgPSB2LCB4ID0gdCwgdyA9IDkgPT09IHUgJiYgZSwgMSA9PT0gdSAmJiBcIm9iamVjdFwiICE9PSB0Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGYgPSBndChlKSwgKGcgPSB0LmdldEF0dHJpYnV0ZShcImlkXCIpKSA/IG0gPSBnLnJlcGxhY2UodHQsIFwiXFxcXCQmXCIpIDogdC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBtKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICBtID0gXCJbaWQ9J1wiICsgbSArIFwiJ10gXCIsIGwgPSBmLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlIChsLS0pIGZbbF0gPSBtICsgbXQoZltsXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB4ID0gVS50ZXN0KGUpICYmIHQucGFyZW50Tm9kZSB8fCB0LCB3ID0gZi5qb2luKFwiLFwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodykgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBPLmFwcGx5KHIsIHgucXVlcnlTZWxlY3RvckFsbCh3KSksIHI7XG4gICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKFQpIHt9IGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZyB8fCB0LnJlbW92ZUF0dHJpYnV0ZShcImlkXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGt0KGUucmVwbGFjZSh6LCBcIiQxXCIpLCB0LCByLCBpKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBzdCgpIHtcbiAgICAgICAgICAgIHZhciBlID0gW107XG4gICAgICAgICAgICBmdW5jdGlvbiB0KG4sIHIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZS5wdXNoKG4gKz0gXCIgXCIpID4gaS5jYWNoZUxlbmd0aCAmJiBkZWxldGUgdFtlLnNoaWZ0KCldLCB0W25dID0gcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0O1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGF0KGUpIHtcbiAgICAgICAgICAgIHJldHVybiBlW3ZdID0gITAsIGU7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gdXQoZSkge1xuICAgICAgICAgICAgdmFyIHQgPSBwLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHJldHVybiAhIWUodCk7XG4gICAgICAgICAgICB9IGNhdGNoIChuKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICExO1xuICAgICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICB0LnBhcmVudE5vZGUgJiYgdC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHQpLCB0ID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBsdChlLCB0KSB7XG4gICAgICAgICAgICB2YXIgbiA9IGUuc3BsaXQoXCJ8XCIpLCByID0gZS5sZW5ndGg7XG4gICAgICAgICAgICB3aGlsZSAoci0tKSBpLmF0dHJIYW5kbGVbbltyXV0gPSB0O1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGN0KGUsIHQpIHtcbiAgICAgICAgICAgIHZhciBuID0gdCAmJiBlLCByID0gbiAmJiAxID09PSBlLm5vZGVUeXBlICYmIDEgPT09IHQubm9kZVR5cGUgJiYgKH50LnNvdXJjZUluZGV4IHx8IEQpIC0gKH5lLnNvdXJjZUluZGV4IHx8IEQpO1xuICAgICAgICAgICAgaWYgKHIpIHJldHVybiByO1xuICAgICAgICAgICAgaWYgKG4pIHdoaWxlIChuID0gbi5uZXh0U2libGluZykgaWYgKG4gPT09IHQpIHJldHVybiAtMTtcbiAgICAgICAgICAgIHJldHVybiBlID8gMSA6IC0xO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHB0KGUpIHtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbih0KSB7XG4gICAgICAgICAgICAgICAgdmFyIG4gPSB0Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiaW5wdXRcIiA9PT0gbiAmJiB0LnR5cGUgPT09IGU7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGZ0KGUpIHtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbih0KSB7XG4gICAgICAgICAgICAgICAgdmFyIG4gPSB0Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChcImlucHV0XCIgPT09IG4gfHwgXCJidXR0b25cIiA9PT0gbikgJiYgdC50eXBlID09PSBlO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBodChlKSB7XG4gICAgICAgICAgICByZXR1cm4gYXQoZnVuY3Rpb24odCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0ID0gK3QsIGF0KGZ1bmN0aW9uKG4sIHIpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGksIG8gPSBlKFtdLCBuLmxlbmd0aCwgdCksIHMgPSBvLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKHMtLSkgbltpID0gb1tzXV0gJiYgKG5baV0gPSAhKHJbaV0gPSBuW2ldKSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBzID0gb3QuaXNYTUwgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICB2YXIgdCA9IGUgJiYgKGUub3duZXJEb2N1bWVudCB8fCBlKS5kb2N1bWVudEVsZW1lbnQ7XG4gICAgICAgICAgICByZXR1cm4gdCA/IFwiSFRNTFwiICE9PSB0Lm5vZGVOYW1lIDogITE7XG4gICAgICAgIH0sIG4gPSBvdC5zdXBwb3J0ID0ge30sIGMgPSBvdC5zZXREb2N1bWVudCA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIHZhciB0ID0gZSA/IGUub3duZXJEb2N1bWVudCB8fCBlIDogYiwgciA9IHQuZGVmYXVsdFZpZXc7XG4gICAgICAgICAgICByZXR1cm4gdCAhPT0gcCAmJiA5ID09PSB0Lm5vZGVUeXBlICYmIHQuZG9jdW1lbnRFbGVtZW50ID8gKHAgPSB0LCBmID0gdC5kb2N1bWVudEVsZW1lbnQsIFxuICAgICAgICAgICAgaCA9ICFzKHQpLCByICYmIHIuYXR0YWNoRXZlbnQgJiYgciAhPT0gci50b3AgJiYgci5hdHRhY2hFdmVudChcIm9uYmVmb3JldW5sb2FkXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGMoKTtcbiAgICAgICAgICAgIH0pLCBuLmF0dHJpYnV0ZXMgPSB1dChmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGUuY2xhc3NOYW1lID0gXCJpXCIsICFlLmdldEF0dHJpYnV0ZShcImNsYXNzTmFtZVwiKTtcbiAgICAgICAgICAgIH0pLCBuLmdldEVsZW1lbnRzQnlUYWdOYW1lID0gdXQoZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBlLmFwcGVuZENoaWxkKHQuY3JlYXRlQ29tbWVudChcIlwiKSksICFlLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiKlwiKS5sZW5ndGg7XG4gICAgICAgICAgICB9KSwgbi5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lID0gdXQoZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBlLmlubmVySFRNTCA9IFwiPGRpdiBjbGFzcz0nYSc+PC9kaXY+PGRpdiBjbGFzcz0nYSBpJz48L2Rpdj5cIiwgZS5maXJzdENoaWxkLmNsYXNzTmFtZSA9IFwiaVwiLCBcbiAgICAgICAgICAgICAgICAyID09PSBlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJpXCIpLmxlbmd0aDtcbiAgICAgICAgICAgIH0pLCBuLmdldEJ5SWQgPSB1dChmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGYuYXBwZW5kQ2hpbGQoZSkuaWQgPSB2LCAhdC5nZXRFbGVtZW50c0J5TmFtZSB8fCAhdC5nZXRFbGVtZW50c0J5TmFtZSh2KS5sZW5ndGg7XG4gICAgICAgICAgICB9KSwgbi5nZXRCeUlkID8gKGkuZmluZC5JRCA9IGZ1bmN0aW9uKGUsIHQpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHQuZ2V0RWxlbWVudEJ5SWQgIT09IGogJiYgaCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbiA9IHQuZ2V0RWxlbWVudEJ5SWQoZSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuICYmIG4ucGFyZW50Tm9kZSA/IFsgbiBdIDogW107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgaS5maWx0ZXIuSUQgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHQgPSBlLnJlcGxhY2UobnQsIHJ0KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZS5nZXRBdHRyaWJ1dGUoXCJpZFwiKSA9PT0gdDtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSkgOiAoZGVsZXRlIGkuZmluZC5JRCwgaS5maWx0ZXIuSUQgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHQgPSBlLnJlcGxhY2UobnQsIHJ0KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbiA9IHR5cGVvZiBlLmdldEF0dHJpYnV0ZU5vZGUgIT09IGogJiYgZS5nZXRBdHRyaWJ1dGVOb2RlKFwiaWRcIik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuICYmIG4udmFsdWUgPT09IHQ7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pLCBpLmZpbmQuVEFHID0gbi5nZXRFbGVtZW50c0J5VGFnTmFtZSA/IGZ1bmN0aW9uKGUsIHQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHlwZW9mIHQuZ2V0RWxlbWVudHNCeVRhZ05hbWUgIT09IGogPyB0LmdldEVsZW1lbnRzQnlUYWdOYW1lKGUpIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgfSA6IGZ1bmN0aW9uKGUsIHQpIHtcbiAgICAgICAgICAgICAgICB2YXIgbiwgciA9IFtdLCBpID0gMCwgbyA9IHQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoZSk7XG4gICAgICAgICAgICAgICAgaWYgKFwiKlwiID09PSBlKSB7XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlIChuID0gb1tpKytdKSAxID09PSBuLm5vZGVUeXBlICYmIHIucHVzaChuKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBvO1xuICAgICAgICAgICAgfSwgaS5maW5kLkNMQVNTID0gbi5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lICYmIGZ1bmN0aW9uKGUsIHQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHlwZW9mIHQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSAhPT0gaiAmJiBoID8gdC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGUpIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgfSwgZyA9IFtdLCBkID0gW10sIChuLnFzYSA9IFEudGVzdCh0LnF1ZXJ5U2VsZWN0b3JBbGwpKSAmJiAodXQoZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgIGUuaW5uZXJIVE1MID0gXCI8c2VsZWN0PjxvcHRpb24gc2VsZWN0ZWQ9Jyc+PC9vcHRpb24+PC9zZWxlY3Q+XCIsIGUucXVlcnlTZWxlY3RvckFsbChcIltzZWxlY3RlZF1cIikubGVuZ3RoIHx8IGQucHVzaChcIlxcXFxbXCIgKyBNICsgXCIqKD86dmFsdWV8XCIgKyBSICsgXCIpXCIpLCBcbiAgICAgICAgICAgICAgICBlLnF1ZXJ5U2VsZWN0b3JBbGwoXCI6Y2hlY2tlZFwiKS5sZW5ndGggfHwgZC5wdXNoKFwiOmNoZWNrZWRcIik7XG4gICAgICAgICAgICB9KSwgdXQoZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgIHZhciBuID0gdC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgICAgICAgICAgICAgbi5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwiaGlkZGVuXCIpLCBlLmFwcGVuZENoaWxkKG4pLnNldEF0dHJpYnV0ZShcInRcIiwgXCJcIiksIGUucXVlcnlTZWxlY3RvckFsbChcIlt0Xj0nJ11cIikubGVuZ3RoICYmIGQucHVzaChcIlsqXiRdPVwiICsgTSArIFwiKig/OicnfFxcXCJcXFwiKVwiKSwgXG4gICAgICAgICAgICAgICAgZS5xdWVyeVNlbGVjdG9yQWxsKFwiOmVuYWJsZWRcIikubGVuZ3RoIHx8IGQucHVzaChcIjplbmFibGVkXCIsIFwiOmRpc2FibGVkXCIpLCBlLnF1ZXJ5U2VsZWN0b3JBbGwoXCIqLDp4XCIpLCBcbiAgICAgICAgICAgICAgICBkLnB1c2goXCIsLio6XCIpO1xuICAgICAgICAgICAgfSkpLCAobi5tYXRjaGVzU2VsZWN0b3IgPSBRLnRlc3QobSA9IGYud2Via2l0TWF0Y2hlc1NlbGVjdG9yIHx8IGYubW96TWF0Y2hlc1NlbGVjdG9yIHx8IGYub01hdGNoZXNTZWxlY3RvciB8fCBmLm1zTWF0Y2hlc1NlbGVjdG9yKSkgJiYgdXQoZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgIG4uZGlzY29ubmVjdGVkTWF0Y2ggPSBtLmNhbGwoZSwgXCJkaXZcIiksIG0uY2FsbChlLCBcIltzIT0nJ106eFwiKSwgZy5wdXNoKFwiIT1cIiwgSSk7XG4gICAgICAgICAgICB9KSwgZCA9IGQubGVuZ3RoICYmIFJlZ0V4cChkLmpvaW4oXCJ8XCIpKSwgZyA9IGcubGVuZ3RoICYmIFJlZ0V4cChnLmpvaW4oXCJ8XCIpKSwgeSA9IFEudGVzdChmLmNvbnRhaW5zKSB8fCBmLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uID8gZnVuY3Rpb24oZSwgdCkge1xuICAgICAgICAgICAgICAgIHZhciBuID0gOSA9PT0gZS5ub2RlVHlwZSA/IGUuZG9jdW1lbnRFbGVtZW50IDogZSwgciA9IHQgJiYgdC5wYXJlbnROb2RlO1xuICAgICAgICAgICAgICAgIHJldHVybiBlID09PSByIHx8ICEoIXIgfHwgMSAhPT0gci5ub2RlVHlwZSB8fCAhKG4uY29udGFpbnMgPyBuLmNvbnRhaW5zKHIpIDogZS5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbiAmJiAxNiAmIGUuY29tcGFyZURvY3VtZW50UG9zaXRpb24ocikpKTtcbiAgICAgICAgICAgIH0gOiBmdW5jdGlvbihlLCB0KSB7XG4gICAgICAgICAgICAgICAgaWYgKHQpIHdoaWxlICh0ID0gdC5wYXJlbnROb2RlKSBpZiAodCA9PT0gZSkgcmV0dXJuICEwO1xuICAgICAgICAgICAgICAgIHJldHVybiAhMTtcbiAgICAgICAgICAgIH0sIFMgPSBmLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uID8gZnVuY3Rpb24oZSwgcikge1xuICAgICAgICAgICAgICAgIGlmIChlID09PSByKSByZXR1cm4gRSA9ICEwLCAwO1xuICAgICAgICAgICAgICAgIHZhciBpID0gci5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbiAmJiBlLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uICYmIGUuY29tcGFyZURvY3VtZW50UG9zaXRpb24ocik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGkgPyAxICYgaSB8fCAhbi5zb3J0RGV0YWNoZWQgJiYgci5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbihlKSA9PT0gaSA/IGUgPT09IHQgfHwgeShiLCBlKSA/IC0xIDogciA9PT0gdCB8fCB5KGIsIHIpID8gMSA6IGwgPyBQLmNhbGwobCwgZSkgLSBQLmNhbGwobCwgcikgOiAwIDogNCAmIGkgPyAtMSA6IDEgOiBlLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uID8gLTEgOiAxO1xuICAgICAgICAgICAgfSA6IGZ1bmN0aW9uKGUsIG4pIHtcbiAgICAgICAgICAgICAgICB2YXIgciwgaSA9IDAsIG8gPSBlLnBhcmVudE5vZGUsIHMgPSBuLnBhcmVudE5vZGUsIGEgPSBbIGUgXSwgdSA9IFsgbiBdO1xuICAgICAgICAgICAgICAgIGlmIChlID09PSBuKSByZXR1cm4gRSA9ICEwLCAwO1xuICAgICAgICAgICAgICAgIGlmICghbyB8fCAhcykgcmV0dXJuIGUgPT09IHQgPyAtMSA6IG4gPT09IHQgPyAxIDogbyA/IC0xIDogcyA/IDEgOiBsID8gUC5jYWxsKGwsIGUpIC0gUC5jYWxsKGwsIG4pIDogMDtcbiAgICAgICAgICAgICAgICBpZiAobyA9PT0gcykgcmV0dXJuIGN0KGUsIG4pO1xuICAgICAgICAgICAgICAgIHIgPSBlO1xuICAgICAgICAgICAgICAgIHdoaWxlIChyID0gci5wYXJlbnROb2RlKSBhLnVuc2hpZnQocik7XG4gICAgICAgICAgICAgICAgciA9IG47XG4gICAgICAgICAgICAgICAgd2hpbGUgKHIgPSByLnBhcmVudE5vZGUpIHUudW5zaGlmdChyKTtcbiAgICAgICAgICAgICAgICB3aGlsZSAoYVtpXSA9PT0gdVtpXSkgaSsrO1xuICAgICAgICAgICAgICAgIHJldHVybiBpID8gY3QoYVtpXSwgdVtpXSkgOiBhW2ldID09PSBiID8gLTEgOiB1W2ldID09PSBiID8gMSA6IDA7XG4gICAgICAgICAgICB9LCB0KSA6IHA7XG4gICAgICAgIH0sIG90Lm1hdGNoZXMgPSBmdW5jdGlvbihlLCB0KSB7XG4gICAgICAgICAgICByZXR1cm4gb3QoZSwgbnVsbCwgbnVsbCwgdCk7XG4gICAgICAgIH0sIG90Lm1hdGNoZXNTZWxlY3RvciA9IGZ1bmN0aW9uKGUsIHQpIHtcbiAgICAgICAgICAgIGlmICgoZS5vd25lckRvY3VtZW50IHx8IGUpICE9PSBwICYmIGMoZSksIHQgPSB0LnJlcGxhY2UoWSwgXCI9JyQxJ11cIiksICEoIW4ubWF0Y2hlc1NlbGVjdG9yIHx8ICFoIHx8IGcgJiYgZy50ZXN0KHQpIHx8IGQgJiYgZC50ZXN0KHQpKSkgdHJ5IHtcbiAgICAgICAgICAgICAgICB2YXIgciA9IG0uY2FsbChlLCB0KTtcbiAgICAgICAgICAgICAgICBpZiAociB8fCBuLmRpc2Nvbm5lY3RlZE1hdGNoIHx8IGUuZG9jdW1lbnQgJiYgMTEgIT09IGUuZG9jdW1lbnQubm9kZVR5cGUpIHJldHVybiByO1xuICAgICAgICAgICAgfSBjYXRjaCAoaSkge31cbiAgICAgICAgICAgIHJldHVybiBvdCh0LCBwLCBudWxsLCBbIGUgXSkubGVuZ3RoID4gMDtcbiAgICAgICAgfSwgb3QuY29udGFpbnMgPSBmdW5jdGlvbihlLCB0KSB7XG4gICAgICAgICAgICByZXR1cm4gKGUub3duZXJEb2N1bWVudCB8fCBlKSAhPT0gcCAmJiBjKGUpLCB5KGUsIHQpO1xuICAgICAgICB9LCBvdC5hdHRyID0gZnVuY3Rpb24oZSwgdCkge1xuICAgICAgICAgICAgKGUub3duZXJEb2N1bWVudCB8fCBlKSAhPT0gcCAmJiBjKGUpO1xuICAgICAgICAgICAgdmFyIHIgPSBpLmF0dHJIYW5kbGVbdC50b0xvd2VyQ2FzZSgpXSwgbyA9IHIgJiYgQS5jYWxsKGkuYXR0ckhhbmRsZSwgdC50b0xvd2VyQ2FzZSgpKSA/IHIoZSwgdCwgIWgpIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgcmV0dXJuIG8gPT09IHVuZGVmaW5lZCA/IG4uYXR0cmlidXRlcyB8fCAhaCA/IGUuZ2V0QXR0cmlidXRlKHQpIDogKG8gPSBlLmdldEF0dHJpYnV0ZU5vZGUodCkpICYmIG8uc3BlY2lmaWVkID8gby52YWx1ZSA6IG51bGwgOiBvO1xuICAgICAgICB9LCBvdC5lcnJvciA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKFwiU3ludGF4IGVycm9yLCB1bnJlY29nbml6ZWQgZXhwcmVzc2lvbjogXCIgKyBlKTtcbiAgICAgICAgfSwgb3QudW5pcXVlU29ydCA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIHZhciB0LCByID0gW10sIGkgPSAwLCBvID0gMDtcbiAgICAgICAgICAgIGlmIChFID0gIW4uZGV0ZWN0RHVwbGljYXRlcywgbCA9ICFuLnNvcnRTdGFibGUgJiYgZS5zbGljZSgwKSwgZS5zb3J0KFMpLCBFKSB7XG4gICAgICAgICAgICAgICAgd2hpbGUgKHQgPSBlW28rK10pIHQgPT09IGVbb10gJiYgKGkgPSByLnB1c2gobykpO1xuICAgICAgICAgICAgICAgIHdoaWxlIChpLS0pIGUuc3BsaWNlKHJbaV0sIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGU7XG4gICAgICAgIH0sIG8gPSBvdC5nZXRUZXh0ID0gZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgdmFyIHQsIG4gPSBcIlwiLCByID0gMCwgaSA9IGUubm9kZVR5cGU7XG4gICAgICAgICAgICBpZiAoaSkge1xuICAgICAgICAgICAgICAgIGlmICgxID09PSBpIHx8IDkgPT09IGkgfHwgMTEgPT09IGkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKFwic3RyaW5nXCIgPT0gdHlwZW9mIGUudGV4dENvbnRlbnQpIHJldHVybiBlLnRleHRDb250ZW50O1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGUgPSBlLmZpcnN0Q2hpbGQ7IGU7IGUgPSBlLm5leHRTaWJsaW5nKSBuICs9IG8oZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICgzID09PSBpIHx8IDQgPT09IGkpIHJldHVybiBlLm5vZGVWYWx1ZTtcbiAgICAgICAgICAgIH0gZWxzZSBmb3IgKDt0ID0gZVtyXTsgcisrKSBuICs9IG8odCk7XG4gICAgICAgICAgICByZXR1cm4gbjtcbiAgICAgICAgfSwgaSA9IG90LnNlbGVjdG9ycyA9IHtcbiAgICAgICAgICAgIGNhY2hlTGVuZ3RoOiA1MCxcbiAgICAgICAgICAgIGNyZWF0ZVBzZXVkbzogYXQsXG4gICAgICAgICAgICBtYXRjaDogSixcbiAgICAgICAgICAgIGF0dHJIYW5kbGU6IHt9LFxuICAgICAgICAgICAgZmluZDoge30sXG4gICAgICAgICAgICByZWxhdGl2ZToge1xuICAgICAgICAgICAgICAgIFwiPlwiOiB7XG4gICAgICAgICAgICAgICAgICAgIGRpcjogXCJwYXJlbnROb2RlXCIsXG4gICAgICAgICAgICAgICAgICAgIGZpcnN0OiAhMFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXCIgXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgZGlyOiBcInBhcmVudE5vZGVcIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXCIrXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgZGlyOiBcInByZXZpb3VzU2libGluZ1wiLFxuICAgICAgICAgICAgICAgICAgICBmaXJzdDogITBcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFwiflwiOiB7XG4gICAgICAgICAgICAgICAgICAgIGRpcjogXCJwcmV2aW91c1NpYmxpbmdcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwcmVGaWx0ZXI6IHtcbiAgICAgICAgICAgICAgICBBVFRSOiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBlWzFdID0gZVsxXS5yZXBsYWNlKG50LCBydCksIGVbM10gPSAoZVs0XSB8fCBlWzVdIHx8IFwiXCIpLnJlcGxhY2UobnQsIHJ0KSwgXG4gICAgICAgICAgICAgICAgICAgIFwifj1cIiA9PT0gZVsyXSAmJiAoZVszXSA9IFwiIFwiICsgZVszXSArIFwiIFwiKSwgZS5zbGljZSgwLCA0KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIENISUxEOiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBlWzFdID0gZVsxXS50b0xvd2VyQ2FzZSgpLCBcIm50aFwiID09PSBlWzFdLnNsaWNlKDAsIDMpID8gKGVbM10gfHwgb3QuZXJyb3IoZVswXSksIFxuICAgICAgICAgICAgICAgICAgICBlWzRdID0gKyhlWzRdID8gZVs1XSArIChlWzZdIHx8IDEpIDogMiAqIChcImV2ZW5cIiA9PT0gZVszXSB8fCBcIm9kZFwiID09PSBlWzNdKSksIGVbNV0gPSArKGVbN10gKyBlWzhdIHx8IFwib2RkXCIgPT09IGVbM10pKSA6IGVbM10gJiYgb3QuZXJyb3IoZVswXSksIFxuICAgICAgICAgICAgICAgICAgICBlO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgUFNFVURPOiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0LCBuID0gIWVbNV0gJiYgZVsyXTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEouQ0hJTEQudGVzdChlWzBdKSA/IG51bGwgOiAoZVszXSAmJiBlWzRdICE9PSB1bmRlZmluZWQgPyBlWzJdID0gZVs0XSA6IG4gJiYgVi50ZXN0KG4pICYmICh0ID0gZ3QobiwgITApKSAmJiAodCA9IG4uaW5kZXhPZihcIilcIiwgbi5sZW5ndGggLSB0KSAtIG4ubGVuZ3RoKSAmJiAoZVswXSA9IGVbMF0uc2xpY2UoMCwgdCksIFxuICAgICAgICAgICAgICAgICAgICBlWzJdID0gbi5zbGljZSgwLCB0KSksIGUuc2xpY2UoMCwgMykpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmaWx0ZXI6IHtcbiAgICAgICAgICAgICAgICBUQUc6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHQgPSBlLnJlcGxhY2UobnQsIHJ0KS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCIqXCIgPT09IGUgPyBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAhMDtcbiAgICAgICAgICAgICAgICAgICAgfSA6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBlLm5vZGVOYW1lICYmIGUubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gdDtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIENMQVNTOiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0ID0gQ1tlICsgXCIgXCJdO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdCB8fCAodCA9IFJlZ0V4cChcIihefFwiICsgTSArIFwiKVwiICsgZSArIFwiKFwiICsgTSArIFwifCQpXCIpKSAmJiBDKGUsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0LnRlc3QoXCJzdHJpbmdcIiA9PSB0eXBlb2YgZS5jbGFzc05hbWUgJiYgZS5jbGFzc05hbWUgfHwgdHlwZW9mIGUuZ2V0QXR0cmlidXRlICE9PSBqICYmIGUuZ2V0QXR0cmlidXRlKFwiY2xhc3NcIikgfHwgXCJcIik7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgQVRUUjogZnVuY3Rpb24oZSwgdCwgbikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24ocikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGkgPSBvdC5hdHRyKHIsIGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGwgPT0gaSA/IFwiIT1cIiA9PT0gdCA6IHQgPyAoaSArPSBcIlwiLCBcIj1cIiA9PT0gdCA/IGkgPT09IG4gOiBcIiE9XCIgPT09IHQgPyBpICE9PSBuIDogXCJePVwiID09PSB0ID8gbiAmJiAwID09PSBpLmluZGV4T2YobikgOiBcIio9XCIgPT09IHQgPyBuICYmIGkuaW5kZXhPZihuKSA+IC0xIDogXCIkPVwiID09PSB0ID8gbiAmJiBpLnNsaWNlKC1uLmxlbmd0aCkgPT09IG4gOiBcIn49XCIgPT09IHQgPyAoXCIgXCIgKyBpICsgXCIgXCIpLmluZGV4T2YobikgPiAtMSA6IFwifD1cIiA9PT0gdCA/IGkgPT09IG4gfHwgaS5zbGljZSgwLCBuLmxlbmd0aCArIDEpID09PSBuICsgXCItXCIgOiAhMSkgOiAhMDtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIENISUxEOiBmdW5jdGlvbihlLCB0LCBuLCByLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBvID0gXCJudGhcIiAhPT0gZS5zbGljZSgwLCAzKSwgcyA9IFwibGFzdFwiICE9PSBlLnNsaWNlKC00KSwgYSA9IFwib2YtdHlwZVwiID09PSB0O1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gMSA9PT0gciAmJiAwID09PSBpID8gZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICEhZS5wYXJlbnROb2RlO1xuICAgICAgICAgICAgICAgICAgICB9IDogZnVuY3Rpb24odCwgbiwgdSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGwsIGMsIHAsIGYsIGgsIGQsIGcgPSBvICE9PSBzID8gXCJuZXh0U2libGluZ1wiIDogXCJwcmV2aW91c1NpYmxpbmdcIiwgbSA9IHQucGFyZW50Tm9kZSwgeSA9IGEgJiYgdC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpLCB4ID0gIXUgJiYgIWE7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlIChnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwID0gdDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlIChwID0gcFtnXSkgaWYgKGEgPyBwLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09IHkgOiAxID09PSBwLm5vZGVUeXBlKSByZXR1cm4gITE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkID0gZyA9IFwib25seVwiID09PSBlICYmICFkICYmIFwibmV4dFNpYmxpbmdcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gITA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkID0gWyBzID8gbS5maXJzdENoaWxkIDogbS5sYXN0Q2hpbGQgXSwgcyAmJiB4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGMgPSBtW3ZdIHx8IChtW3ZdID0ge30pLCBsID0gY1tlXSB8fCBbXSwgaCA9IGxbMF0gPT09IHcgJiYgbFsxXSwgZiA9IGxbMF0gPT09IHcgJiYgbFsyXSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHAgPSBoICYmIG0uY2hpbGROb2Rlc1toXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKHAgPSArK2ggJiYgcCAmJiBwW2ddIHx8IChmID0gaCA9IDApIHx8IGQucG9wKCkpIGlmICgxID09PSBwLm5vZGVUeXBlICYmICsrZiAmJiBwID09PSB0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjW2VdID0gWyB3LCBoLCBmIF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoeCAmJiAobCA9ICh0W3ZdIHx8ICh0W3ZdID0ge30pKVtlXSkgJiYgbFswXSA9PT0gdykgZiA9IGxbMV07IGVsc2Ugd2hpbGUgKHAgPSArK2ggJiYgcCAmJiBwW2ddIHx8IChmID0gaCA9IDApIHx8IGQucG9wKCkpIGlmICgoYSA/IHAubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0geSA6IDEgPT09IHAubm9kZVR5cGUpICYmICsrZiAmJiAoeCAmJiAoKHBbdl0gfHwgKHBbdl0gPSB7fSkpW2VdID0gWyB3LCBmIF0pLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwID09PSB0KSkgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGYgLT0gaSwgZiA9PT0gciB8fCAwID09PSBmICUgciAmJiBmIC8gciA+PSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgUFNFVURPOiBmdW5jdGlvbihlLCB0KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBuLCByID0gaS5wc2V1ZG9zW2VdIHx8IGkuc2V0RmlsdGVyc1tlLnRvTG93ZXJDYXNlKCldIHx8IG90LmVycm9yKFwidW5zdXBwb3J0ZWQgcHNldWRvOiBcIiArIGUpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gclt2XSA/IHIodCkgOiByLmxlbmd0aCA+IDEgPyAobiA9IFsgZSwgZSwgXCJcIiwgdCBdLCBpLnNldEZpbHRlcnMuaGFzT3duUHJvcGVydHkoZS50b0xvd2VyQ2FzZSgpKSA/IGF0KGZ1bmN0aW9uKGUsIG4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpLCBvID0gcihlLCB0KSwgcyA9IG8ubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKHMtLSkgaSA9IFAuY2FsbChlLCBvW3NdKSwgZVtpXSA9ICEobltpXSA9IG9bc10pO1xuICAgICAgICAgICAgICAgICAgICB9KSA6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByKGUsIDAsIG4pO1xuICAgICAgICAgICAgICAgICAgICB9KSA6IHI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHBzZXVkb3M6IHtcbiAgICAgICAgICAgICAgICBub3Q6IGF0KGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHQgPSBbXSwgbiA9IFtdLCByID0gYShlLnJlcGxhY2UoeiwgXCIkMVwiKSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByW3ZdID8gYXQoZnVuY3Rpb24oZSwgdCwgbiwgaSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG8sIHMgPSByKGUsIG51bGwsIGksIFtdKSwgYSA9IGUubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKGEtLSkgKG8gPSBzW2FdKSAmJiAoZVthXSA9ICEodFthXSA9IG8pKTtcbiAgICAgICAgICAgICAgICAgICAgfSkgOiBmdW5jdGlvbihlLCBpLCBvKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdFswXSA9IGUsIHIodCwgbnVsbCwgbywgbiksICFuLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIGhhczogYXQoZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24odCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG90KGUsIHQpLmxlbmd0aCA+IDA7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgY29udGFpbnM6IGF0KGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAodC50ZXh0Q29udGVudCB8fCB0LmlubmVyVGV4dCB8fCBvKHQpKS5pbmRleE9mKGUpID4gLTE7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgbGFuZzogYXQoZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gRy50ZXN0KGUgfHwgXCJcIikgfHwgb3QuZXJyb3IoXCJ1bnN1cHBvcnRlZCBsYW5nOiBcIiArIGUpLCBlID0gZS5yZXBsYWNlKG50LCBydCkudG9Mb3dlckNhc2UoKSwgXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuO1xuICAgICAgICAgICAgICAgICAgICAgICAgZG8ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuID0gaCA/IHQubGFuZyA6IHQuZ2V0QXR0cmlidXRlKFwieG1sOmxhbmdcIikgfHwgdC5nZXRBdHRyaWJ1dGUoXCJsYW5nXCIpKSByZXR1cm4gbiA9IG4udG9Mb3dlckNhc2UoKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbiA9PT0gZSB8fCAwID09PSBuLmluZGV4T2YoZSArIFwiLVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gd2hpbGUgKCh0ID0gdC5wYXJlbnROb2RlKSAmJiAxID09PSB0Lm5vZGVUeXBlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAhMTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICB0YXJnZXQ6IGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG4gPSBlLmxvY2F0aW9uICYmIGUubG9jYXRpb24uaGFzaDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG4gJiYgbi5zbGljZSgxKSA9PT0gdC5pZDtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHJvb3Q6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGUgPT09IGY7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBmb2N1czogZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZSA9PT0gcC5hY3RpdmVFbGVtZW50ICYmICghcC5oYXNGb2N1cyB8fCBwLmhhc0ZvY3VzKCkpICYmICEhKGUudHlwZSB8fCBlLmhyZWYgfHwgfmUudGFiSW5kZXgpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZW5hYmxlZDogZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZS5kaXNhYmxlZCA9PT0gITE7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBkaXNhYmxlZDogZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZS5kaXNhYmxlZCA9PT0gITA7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBjaGVja2VkOiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0ID0gZS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJpbnB1dFwiID09PSB0ICYmICEhZS5jaGVja2VkIHx8IFwib3B0aW9uXCIgPT09IHQgJiYgISFlLnNlbGVjdGVkO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQ6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGUucGFyZW50Tm9kZSAmJiBlLnBhcmVudE5vZGUuc2VsZWN0ZWRJbmRleCwgZS5zZWxlY3RlZCA9PT0gITA7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlbXB0eTogZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGUgPSBlLmZpcnN0Q2hpbGQ7IGU7IGUgPSBlLm5leHRTaWJsaW5nKSBpZiAoZS5ub2RlTmFtZSA+IFwiQFwiIHx8IDMgPT09IGUubm9kZVR5cGUgfHwgNCA9PT0gZS5ub2RlVHlwZSkgcmV0dXJuICExO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gITA7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBwYXJlbnQ6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICFpLnBzZXVkb3MuZW1wdHkoZSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBoZWFkZXI6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGV0LnRlc3QoZS5ub2RlTmFtZSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBpbnB1dDogZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWi50ZXN0KGUubm9kZU5hbWUpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgYnV0dG9uOiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0ID0gZS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJpbnB1dFwiID09PSB0ICYmIFwiYnV0dG9uXCIgPT09IGUudHlwZSB8fCBcImJ1dHRvblwiID09PSB0O1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdGV4dDogZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiaW5wdXRcIiA9PT0gZS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpICYmIFwidGV4dFwiID09PSBlLnR5cGUgJiYgKG51bGwgPT0gKHQgPSBlLmdldEF0dHJpYnV0ZShcInR5cGVcIikpIHx8IHQudG9Mb3dlckNhc2UoKSA9PT0gZS50eXBlKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGZpcnN0OiBodChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsgMCBdO1xuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIGxhc3Q6IGh0KGZ1bmN0aW9uKGUsIHQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsgdCAtIDEgXTtcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBlcTogaHQoZnVuY3Rpb24oZSwgdCwgbikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWyAwID4gbiA/IG4gKyB0IDogbiBdO1xuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIGV2ZW46IGh0KGZ1bmN0aW9uKGUsIHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG4gPSAwO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKDt0ID4gbjsgbiArPSAyKSBlLnB1c2gobik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBlO1xuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIG9kZDogaHQoZnVuY3Rpb24oZSwgdCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbiA9IDE7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoO3QgPiBuOyBuICs9IDIpIGUucHVzaChuKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGU7XG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgbHQ6IGh0KGZ1bmN0aW9uKGUsIHQsIG4pIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHIgPSAwID4gbiA/IG4gKyB0IDogbjtcbiAgICAgICAgICAgICAgICAgICAgZm9yICg7LS1yID49IDA7ICkgZS5wdXNoKHIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZTtcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBndDogaHQoZnVuY3Rpb24oZSwgdCwgbikge1xuICAgICAgICAgICAgICAgICAgICB2YXIgciA9IDAgPiBuID8gbiArIHQgOiBuO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKDt0ID4gKytyOyApIGUucHVzaChyKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGU7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgaS5wc2V1ZG9zLm50aCA9IGkucHNldWRvcy5lcTtcbiAgICAgICAgZm9yICh0IGluIHtcbiAgICAgICAgICAgIHJhZGlvOiAhMCxcbiAgICAgICAgICAgIGNoZWNrYm94OiAhMCxcbiAgICAgICAgICAgIGZpbGU6ICEwLFxuICAgICAgICAgICAgcGFzc3dvcmQ6ICEwLFxuICAgICAgICAgICAgaW1hZ2U6ICEwXG4gICAgICAgIH0pIGkucHNldWRvc1t0XSA9IHB0KHQpO1xuICAgICAgICBmb3IgKHQgaW4ge1xuICAgICAgICAgICAgc3VibWl0OiAhMCxcbiAgICAgICAgICAgIHJlc2V0OiAhMFxuICAgICAgICB9KSBpLnBzZXVkb3NbdF0gPSBmdCh0KTtcbiAgICAgICAgZnVuY3Rpb24gZHQoKSB7fVxuICAgICAgICBkdC5wcm90b3R5cGUgPSBpLmZpbHRlcnMgPSBpLnBzZXVkb3MsIGkuc2V0RmlsdGVycyA9IG5ldyBkdCgpO1xuICAgICAgICBmdW5jdGlvbiBndChlLCB0KSB7XG4gICAgICAgICAgICB2YXIgbiwgciwgbywgcywgYSwgdSwgbCwgYyA9IGtbZSArIFwiIFwiXTtcbiAgICAgICAgICAgIGlmIChjKSByZXR1cm4gdCA/IDAgOiBjLnNsaWNlKDApO1xuICAgICAgICAgICAgYSA9IGUsIHUgPSBbXSwgbCA9IGkucHJlRmlsdGVyO1xuICAgICAgICAgICAgd2hpbGUgKGEpIHtcbiAgICAgICAgICAgICAgICAoIW4gfHwgKHIgPSBfLmV4ZWMoYSkpKSAmJiAociAmJiAoYSA9IGEuc2xpY2UoclswXS5sZW5ndGgpIHx8IGEpLCB1LnB1c2gobyA9IFtdKSksIFxuICAgICAgICAgICAgICAgIG4gPSAhMSwgKHIgPSBYLmV4ZWMoYSkpICYmIChuID0gci5zaGlmdCgpLCBvLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogbixcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogclswXS5yZXBsYWNlKHosIFwiIFwiKVxuICAgICAgICAgICAgICAgIH0pLCBhID0gYS5zbGljZShuLmxlbmd0aCkpO1xuICAgICAgICAgICAgICAgIGZvciAocyBpbiBpLmZpbHRlcikgIShyID0gSltzXS5leGVjKGEpKSB8fCBsW3NdICYmICEociA9IGxbc10ocikpIHx8IChuID0gci5zaGlmdCgpLCBcbiAgICAgICAgICAgICAgICBvLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogbixcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogcyxcbiAgICAgICAgICAgICAgICAgICAgbWF0Y2hlczogclxuICAgICAgICAgICAgICAgIH0pLCBhID0gYS5zbGljZShuLmxlbmd0aCkpO1xuICAgICAgICAgICAgICAgIGlmICghbikgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdCA/IGEubGVuZ3RoIDogYSA/IG90LmVycm9yKGUpIDogayhlLCB1KS5zbGljZSgwKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBtdChlKSB7XG4gICAgICAgICAgICB2YXIgdCA9IDAsIG4gPSBlLmxlbmd0aCwgciA9IFwiXCI7XG4gICAgICAgICAgICBmb3IgKDtuID4gdDsgdCsrKSByICs9IGVbdF0udmFsdWU7XG4gICAgICAgICAgICByZXR1cm4gcjtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiB5dChlLCB0LCBuKSB7XG4gICAgICAgICAgICB2YXIgaSA9IHQuZGlyLCBvID0gbiAmJiBcInBhcmVudE5vZGVcIiA9PT0gaSwgcyA9IFQrKztcbiAgICAgICAgICAgIHJldHVybiB0LmZpcnN0ID8gZnVuY3Rpb24odCwgbiwgcikge1xuICAgICAgICAgICAgICAgIHdoaWxlICh0ID0gdFtpXSkgaWYgKDEgPT09IHQubm9kZVR5cGUgfHwgbykgcmV0dXJuIGUodCwgbiwgcik7XG4gICAgICAgICAgICB9IDogZnVuY3Rpb24odCwgbiwgYSkge1xuICAgICAgICAgICAgICAgIHZhciB1LCBsLCBjLCBwID0gdyArIFwiIFwiICsgcztcbiAgICAgICAgICAgICAgICBpZiAoYSkge1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAodCA9IHRbaV0pIGlmICgoMSA9PT0gdC5ub2RlVHlwZSB8fCBvKSAmJiBlKHQsIG4sIGEpKSByZXR1cm4gITA7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHdoaWxlICh0ID0gdFtpXSkgaWYgKDEgPT09IHQubm9kZVR5cGUgfHwgbykgaWYgKGMgPSB0W3ZdIHx8ICh0W3ZdID0ge30pLCBcbiAgICAgICAgICAgICAgICAobCA9IGNbaV0pICYmIGxbMF0gPT09IHApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCh1ID0gbFsxXSkgPT09ICEwIHx8IHUgPT09IHIpIHJldHVybiB1ID09PSAhMDtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGwgPSBjW2ldID0gWyBwIF0sIGxbMV0gPSBlKHQsIG4sIGEpIHx8IHIsIGxbMV0gPT09ICEwKSByZXR1cm4gITA7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHZ0KGUpIHtcbiAgICAgICAgICAgIHJldHVybiBlLmxlbmd0aCA+IDEgPyBmdW5jdGlvbih0LCBuLCByKSB7XG4gICAgICAgICAgICAgICAgdmFyIGkgPSBlLmxlbmd0aDtcbiAgICAgICAgICAgICAgICB3aGlsZSAoaS0tKSBpZiAoIWVbaV0odCwgbiwgcikpIHJldHVybiAhMTtcbiAgICAgICAgICAgICAgICByZXR1cm4gITA7XG4gICAgICAgICAgICB9IDogZVswXTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiB4dChlLCB0LCBuLCByLCBpKSB7XG4gICAgICAgICAgICB2YXIgbywgcyA9IFtdLCBhID0gMCwgdSA9IGUubGVuZ3RoLCBsID0gbnVsbCAhPSB0O1xuICAgICAgICAgICAgZm9yICg7dSA+IGE7IGErKykgKG8gPSBlW2FdKSAmJiAoIW4gfHwgbihvLCByLCBpKSkgJiYgKHMucHVzaChvKSwgbCAmJiB0LnB1c2goYSkpO1xuICAgICAgICAgICAgcmV0dXJuIHM7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gYnQoZSwgdCwgbiwgciwgaSwgbykge1xuICAgICAgICAgICAgcmV0dXJuIHIgJiYgIXJbdl0gJiYgKHIgPSBidChyKSksIGkgJiYgIWlbdl0gJiYgKGkgPSBidChpLCBvKSksIGF0KGZ1bmN0aW9uKG8sIHMsIGEsIHUpIHtcbiAgICAgICAgICAgICAgICB2YXIgbCwgYywgcCwgZiA9IFtdLCBoID0gW10sIGQgPSBzLmxlbmd0aCwgZyA9IG8gfHwgQ3QodCB8fCBcIipcIiwgYS5ub2RlVHlwZSA/IFsgYSBdIDogYSwgW10pLCBtID0gIWUgfHwgIW8gJiYgdCA/IGcgOiB4dChnLCBmLCBlLCBhLCB1KSwgeSA9IG4gPyBpIHx8IChvID8gZSA6IGQgfHwgcikgPyBbXSA6IHMgOiBtO1xuICAgICAgICAgICAgICAgIGlmIChuICYmIG4obSwgeSwgYSwgdSksIHIpIHtcbiAgICAgICAgICAgICAgICAgICAgbCA9IHh0KHksIGgpLCByKGwsIFtdLCBhLCB1KSwgYyA9IGwubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoYy0tKSAocCA9IGxbY10pICYmICh5W2hbY11dID0gIShtW2hbY11dID0gcCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaSB8fCBlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGwgPSBbXSwgYyA9IHkubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlIChjLS0pIChwID0geVtjXSkgJiYgbC5wdXNoKG1bY10gPSBwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpKG51bGwsIHkgPSBbXSwgbCwgdSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjID0geS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoYy0tKSAocCA9IHlbY10pICYmIChsID0gaSA/IFAuY2FsbChvLCBwKSA6IGZbY10pID4gLTEgJiYgKG9bbF0gPSAhKHNbbF0gPSBwKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2UgeSA9IHh0KHkgPT09IHMgPyB5LnNwbGljZShkLCB5Lmxlbmd0aCkgOiB5KSwgaSA/IGkobnVsbCwgcywgeSwgdSkgOiBPLmFwcGx5KHMsIHkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gd3QoZSkge1xuICAgICAgICAgICAgdmFyIHQsIG4sIHIsIG8gPSBlLmxlbmd0aCwgcyA9IGkucmVsYXRpdmVbZVswXS50eXBlXSwgYSA9IHMgfHwgaS5yZWxhdGl2ZVtcIiBcIl0sIGwgPSBzID8gMSA6IDAsIGMgPSB5dChmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGUgPT09IHQ7XG4gICAgICAgICAgICB9LCBhLCAhMCksIHAgPSB5dChmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFAuY2FsbCh0LCBlKSA+IC0xO1xuICAgICAgICAgICAgfSwgYSwgITApLCBmID0gWyBmdW5jdGlvbihlLCBuLCByKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICFzICYmIChyIHx8IG4gIT09IHUpIHx8ICgodCA9IG4pLm5vZGVUeXBlID8gYyhlLCBuLCByKSA6IHAoZSwgbiwgcikpO1xuICAgICAgICAgICAgfSBdO1xuICAgICAgICAgICAgZm9yICg7byA+IGw7IGwrKykgaWYgKG4gPSBpLnJlbGF0aXZlW2VbbF0udHlwZV0pIGYgPSBbIHl0KHZ0KGYpLCBuKSBdOyBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAobiA9IGkuZmlsdGVyW2VbbF0udHlwZV0uYXBwbHkobnVsbCwgZVtsXS5tYXRjaGVzKSwgblt2XSkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHIgPSArK2w7IG8gPiByOyByKyspIGlmIChpLnJlbGF0aXZlW2Vbcl0udHlwZV0pIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYnQobCA+IDEgJiYgdnQoZiksIGwgPiAxICYmIG10KGUuc2xpY2UoMCwgbCAtIDEpLmNvbmNhdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCIgXCIgPT09IGVbbCAtIDJdLnR5cGUgPyBcIipcIiA6IFwiXCJcbiAgICAgICAgICAgICAgICAgICAgfSkpLnJlcGxhY2UoeiwgXCIkMVwiKSwgbiwgciA+IGwgJiYgd3QoZS5zbGljZShsLCByKSksIG8gPiByICYmIHd0KGUgPSBlLnNsaWNlKHIpKSwgbyA+IHIgJiYgbXQoZSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmLnB1c2gobik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdnQoZik7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gVHQoZSwgdCkge1xuICAgICAgICAgICAgdmFyIG4gPSAwLCBvID0gdC5sZW5ndGggPiAwLCBzID0gZS5sZW5ndGggPiAwLCBhID0gZnVuY3Rpb24oYSwgbCwgYywgZiwgaCkge1xuICAgICAgICAgICAgICAgIHZhciBkLCBnLCBtLCB5ID0gW10sIHYgPSAwLCB4ID0gXCIwXCIsIGIgPSBhICYmIFtdLCBUID0gbnVsbCAhPSBoLCBDID0gdSwgayA9IGEgfHwgcyAmJiBpLmZpbmQuVEFHKFwiKlwiLCBoICYmIGwucGFyZW50Tm9kZSB8fCBsKSwgTiA9IHcgKz0gbnVsbCA9PSBDID8gMSA6IE1hdGgucmFuZG9tKCkgfHwgLjE7XG4gICAgICAgICAgICAgICAgZm9yIChUICYmICh1ID0gbCAhPT0gcCAmJiBsLCByID0gbik7IG51bGwgIT0gKGQgPSBrW3hdKTsgeCsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzICYmIGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGcgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKG0gPSBlW2crK10pIGlmIChtKGQsIGwsIGMpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZi5wdXNoKGQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgVCAmJiAodyA9IE4sIHIgPSArK24pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIG8gJiYgKChkID0gIW0gJiYgZCkgJiYgdi0tLCBhICYmIGIucHVzaChkKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh2ICs9IHgsIG8gJiYgeCAhPT0gdikge1xuICAgICAgICAgICAgICAgICAgICBnID0gMDtcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKG0gPSB0W2crK10pIG0oYiwgeSwgbCwgYyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodiA+IDApIHdoaWxlICh4LS0pIGJbeF0gfHwgeVt4XSB8fCAoeVt4XSA9IHEuY2FsbChmKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB5ID0geHQoeSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgTy5hcHBseShmLCB5KSwgVCAmJiAhYSAmJiB5Lmxlbmd0aCA+IDAgJiYgdiArIHQubGVuZ3RoID4gMSAmJiBvdC51bmlxdWVTb3J0KGYpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gVCAmJiAodyA9IE4sIHUgPSBDKSwgYjtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXR1cm4gbyA/IGF0KGEpIDogYTtcbiAgICAgICAgfVxuICAgICAgICBhID0gb3QuY29tcGlsZSA9IGZ1bmN0aW9uKGUsIHQpIHtcbiAgICAgICAgICAgIHZhciBuLCByID0gW10sIGkgPSBbXSwgbyA9IE5bZSArIFwiIFwiXTtcbiAgICAgICAgICAgIGlmICghbykge1xuICAgICAgICAgICAgICAgIHQgfHwgKHQgPSBndChlKSksIG4gPSB0Lmxlbmd0aDtcbiAgICAgICAgICAgICAgICB3aGlsZSAobi0tKSBvID0gd3QodFtuXSksIG9bdl0gPyByLnB1c2gobykgOiBpLnB1c2gobyk7XG4gICAgICAgICAgICAgICAgbyA9IE4oZSwgVHQoaSwgcikpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG87XG4gICAgICAgIH07XG4gICAgICAgIGZ1bmN0aW9uIEN0KGUsIHQsIG4pIHtcbiAgICAgICAgICAgIHZhciByID0gMCwgaSA9IHQubGVuZ3RoO1xuICAgICAgICAgICAgZm9yICg7aSA+IHI7IHIrKykgb3QoZSwgdFtyXSwgbik7XG4gICAgICAgICAgICByZXR1cm4gbjtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBrdChlLCB0LCByLCBvKSB7XG4gICAgICAgICAgICB2YXIgcywgdSwgbCwgYywgcCwgZiA9IGd0KGUpO1xuICAgICAgICAgICAgaWYgKCFvICYmIDEgPT09IGYubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHUgPSBmWzBdID0gZlswXS5zbGljZSgwKSwgdS5sZW5ndGggPiAyICYmIFwiSURcIiA9PT0gKGwgPSB1WzBdKS50eXBlICYmIG4uZ2V0QnlJZCAmJiA5ID09PSB0Lm5vZGVUeXBlICYmIGggJiYgaS5yZWxhdGl2ZVt1WzFdLnR5cGVdKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ID0gKGkuZmluZC5JRChsLm1hdGNoZXNbMF0ucmVwbGFjZShudCwgcnQpLCB0KSB8fCBbXSlbMF0sICF0KSByZXR1cm4gcjtcbiAgICAgICAgICAgICAgICAgICAgZSA9IGUuc2xpY2UodS5zaGlmdCgpLnZhbHVlLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHMgPSBKLm5lZWRzQ29udGV4dC50ZXN0KGUpID8gMCA6IHUubGVuZ3RoO1xuICAgICAgICAgICAgICAgIHdoaWxlIChzLS0pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGwgPSB1W3NdLCBpLnJlbGF0aXZlW2MgPSBsLnR5cGVdKSBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgaWYgKChwID0gaS5maW5kW2NdKSAmJiAobyA9IHAobC5tYXRjaGVzWzBdLnJlcGxhY2UobnQsIHJ0KSwgVS50ZXN0KHVbMF0udHlwZSkgJiYgdC5wYXJlbnROb2RlIHx8IHQpKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHUuc3BsaWNlKHMsIDEpLCBlID0gby5sZW5ndGggJiYgbXQodSksICFlKSByZXR1cm4gTy5hcHBseShyLCBvKSwgcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGEoZSwgZikobywgdCwgIWgsIHIsIFUudGVzdChlKSksIHI7XG4gICAgICAgIH1cbiAgICAgICAgbi5zb3J0U3RhYmxlID0gdi5zcGxpdChcIlwiKS5zb3J0KFMpLmpvaW4oXCJcIikgPT09IHYsIG4uZGV0ZWN0RHVwbGljYXRlcyA9IEUsIGMoKSwgXG4gICAgICAgIG4uc29ydERldGFjaGVkID0gdXQoZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgcmV0dXJuIDEgJiBlLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uKHAuY3JlYXRlRWxlbWVudChcImRpdlwiKSk7XG4gICAgICAgIH0pLCB1dChmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICByZXR1cm4gZS5pbm5lckhUTUwgPSBcIjxhIGhyZWY9JyMnPjwvYT5cIiwgXCIjXCIgPT09IGUuZmlyc3RDaGlsZC5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpO1xuICAgICAgICB9KSB8fCBsdChcInR5cGV8aHJlZnxoZWlnaHR8d2lkdGhcIiwgZnVuY3Rpb24oZSwgdCwgbikge1xuICAgICAgICAgICAgcmV0dXJuIG4gPyB1bmRlZmluZWQgOiBlLmdldEF0dHJpYnV0ZSh0LCBcInR5cGVcIiA9PT0gdC50b0xvd2VyQ2FzZSgpID8gMSA6IDIpO1xuICAgICAgICB9KSwgbi5hdHRyaWJ1dGVzICYmIHV0KGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIHJldHVybiBlLmlubmVySFRNTCA9IFwiPGlucHV0Lz5cIiwgZS5maXJzdENoaWxkLnNldEF0dHJpYnV0ZShcInZhbHVlXCIsIFwiXCIpLCBcIlwiID09PSBlLmZpcnN0Q2hpbGQuZ2V0QXR0cmlidXRlKFwidmFsdWVcIik7XG4gICAgICAgIH0pIHx8IGx0KFwidmFsdWVcIiwgZnVuY3Rpb24oZSwgdCwgbikge1xuICAgICAgICAgICAgcmV0dXJuIG4gfHwgXCJpbnB1dFwiICE9PSBlLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPyB1bmRlZmluZWQgOiBlLmRlZmF1bHRWYWx1ZTtcbiAgICAgICAgfSksIHV0KGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsID09IGUuZ2V0QXR0cmlidXRlKFwiZGlzYWJsZWRcIik7XG4gICAgICAgIH0pIHx8IGx0KFIsIGZ1bmN0aW9uKGUsIHQsIG4pIHtcbiAgICAgICAgICAgIHZhciByO1xuICAgICAgICAgICAgcmV0dXJuIG4gPyB1bmRlZmluZWQgOiAociA9IGUuZ2V0QXR0cmlidXRlTm9kZSh0KSkgJiYgci5zcGVjaWZpZWQgPyByLnZhbHVlIDogZVt0XSA9PT0gITAgPyB0LnRvTG93ZXJDYXNlKCkgOiBudWxsO1xuICAgICAgICB9KSwgeC5maW5kID0gb3QsIHguZXhwciA9IG90LnNlbGVjdG9ycywgeC5leHByW1wiOlwiXSA9IHguZXhwci5wc2V1ZG9zLCB4LnVuaXF1ZSA9IG90LnVuaXF1ZVNvcnQsIFxuICAgICAgICB4LnRleHQgPSBvdC5nZXRUZXh0LCB4LmlzWE1MRG9jID0gb3QuaXNYTUwsIHguY29udGFpbnMgPSBvdC5jb250YWlucztcbiAgICB9KGUpO1xuICAgIHZhciBEID0ge307XG4gICAgZnVuY3Rpb24gQShlKSB7XG4gICAgICAgIHZhciB0ID0gRFtlXSA9IHt9O1xuICAgICAgICByZXR1cm4geC5lYWNoKGUubWF0Y2godykgfHwgW10sIGZ1bmN0aW9uKGUsIG4pIHtcbiAgICAgICAgICAgIHRbbl0gPSAhMDtcbiAgICAgICAgfSksIHQ7XG4gICAgfVxuICAgIHguQ2FsbGJhY2tzID0gZnVuY3Rpb24oZSkge1xuICAgICAgICBlID0gXCJzdHJpbmdcIiA9PSB0eXBlb2YgZSA/IERbZV0gfHwgQShlKSA6IHguZXh0ZW5kKHt9LCBlKTtcbiAgICAgICAgdmFyIHQsIG4sIHIsIGksIG8sIHMsIGEgPSBbXSwgdSA9ICFlLm9uY2UgJiYgW10sIGwgPSBmdW5jdGlvbihwKSB7XG4gICAgICAgICAgICBmb3IgKHQgPSBlLm1lbW9yeSAmJiBwLCBuID0gITAsIHMgPSBpIHx8IDAsIGkgPSAwLCBvID0gYS5sZW5ndGgsIHIgPSAhMDsgYSAmJiBvID4gczsgcysrKSBpZiAoYVtzXS5hcHBseShwWzBdLCBwWzFdKSA9PT0gITEgJiYgZS5zdG9wT25GYWxzZSkge1xuICAgICAgICAgICAgICAgIHQgPSAhMTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHIgPSAhMSwgYSAmJiAodSA/IHUubGVuZ3RoICYmIGwodS5zaGlmdCgpKSA6IHQgPyBhID0gW10gOiBjLmRpc2FibGUoKSk7XG4gICAgICAgIH0sIGMgPSB7XG4gICAgICAgICAgICBhZGQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGlmIChhKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBuID0gYS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIChmdW5jdGlvbiBzKHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHguZWFjaCh0LCBmdW5jdGlvbih0LCBuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHIgPSB4LnR5cGUobik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJmdW5jdGlvblwiID09PSByID8gZS51bmlxdWUgJiYgYy5oYXMobikgfHwgYS5wdXNoKG4pIDogbiAmJiBuLmxlbmd0aCAmJiBcInN0cmluZ1wiICE9PSByICYmIHMobik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSkoYXJndW1lbnRzKSwgciA/IG8gPSBhLmxlbmd0aCA6IHQgJiYgKGkgPSBuLCBsKHQpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVtb3ZlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYSAmJiB4LmVhY2goYXJndW1lbnRzLCBmdW5jdGlvbihlLCB0KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBuO1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoKG4gPSB4LmluQXJyYXkodCwgYSwgbikpID4gLTEpIGEuc3BsaWNlKG4sIDEpLCByICYmIChvID49IG4gJiYgby0tLCBzID49IG4gJiYgcy0tKTtcbiAgICAgICAgICAgICAgICB9KSwgdGhpcztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBoYXM6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZSA/IHguaW5BcnJheShlLCBhKSA+IC0xIDogISghYSB8fCAhYS5sZW5ndGgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVtcHR5OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYSA9IFtdLCBvID0gMCwgdGhpcztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkaXNhYmxlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYSA9IHUgPSB0ID0gdW5kZWZpbmVkLCB0aGlzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRpc2FibGVkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gIWE7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbG9jazogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHUgPSB1bmRlZmluZWQsIHQgfHwgYy5kaXNhYmxlKCksIHRoaXM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbG9ja2VkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gIXU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZmlyZVdpdGg6IGZ1bmN0aW9uKGUsIHQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gIWEgfHwgbiAmJiAhdSB8fCAodCA9IHQgfHwgW10sIHQgPSBbIGUsIHQuc2xpY2UgPyB0LnNsaWNlKCkgOiB0IF0sIHIgPyB1LnB1c2godCkgOiBsKHQpKSwgXG4gICAgICAgICAgICAgICAgdGhpcztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmaXJlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYy5maXJlV2l0aCh0aGlzLCBhcmd1bWVudHMpLCB0aGlzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZpcmVkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gISFuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gYztcbiAgICB9LCB4LmV4dGVuZCh7XG4gICAgICAgIERlZmVycmVkOiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICB2YXIgdCA9IFsgWyBcInJlc29sdmVcIiwgXCJkb25lXCIsIHguQ2FsbGJhY2tzKFwib25jZSBtZW1vcnlcIiksIFwicmVzb2x2ZWRcIiBdLCBbIFwicmVqZWN0XCIsIFwiZmFpbFwiLCB4LkNhbGxiYWNrcyhcIm9uY2UgbWVtb3J5XCIpLCBcInJlamVjdGVkXCIgXSwgWyBcIm5vdGlmeVwiLCBcInByb2dyZXNzXCIsIHguQ2FsbGJhY2tzKFwibWVtb3J5XCIpIF0gXSwgbiA9IFwicGVuZGluZ1wiLCByID0ge1xuICAgICAgICAgICAgICAgIHN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG47XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBhbHdheXM6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaS5kb25lKGFyZ3VtZW50cykuZmFpbChhcmd1bWVudHMpLCB0aGlzO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdGhlbjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBlID0gYXJndW1lbnRzO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geC5EZWZlcnJlZChmdW5jdGlvbihuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB4LmVhY2godCwgZnVuY3Rpb24odCwgbykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzID0gb1swXSwgYSA9IHguaXNGdW5jdGlvbihlW3RdKSAmJiBlW3RdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlbb1sxXV0oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlID0gYSAmJiBhLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUgJiYgeC5pc0Z1bmN0aW9uKGUucHJvbWlzZSkgPyBlLnByb21pc2UoKS5kb25lKG4ucmVzb2x2ZSkuZmFpbChuLnJlamVjdCkucHJvZ3Jlc3Mobi5ub3RpZnkpIDogbltzICsgXCJXaXRoXCJdKHRoaXMgPT09IHIgPyBuLnByb21pc2UoKSA6IHRoaXMsIGEgPyBbIGUgXSA6IGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KSwgZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIH0pLnByb21pc2UoKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHByb21pc2U6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGwgIT0gZSA/IHguZXh0ZW5kKGUsIHIpIDogcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBpID0ge307XG4gICAgICAgICAgICByZXR1cm4gci5waXBlID0gci50aGVuLCB4LmVhY2godCwgZnVuY3Rpb24oZSwgbykge1xuICAgICAgICAgICAgICAgIHZhciBzID0gb1syXSwgYSA9IG9bM107XG4gICAgICAgICAgICAgICAgcltvWzFdXSA9IHMuYWRkLCBhICYmIHMuYWRkKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBuID0gYTtcbiAgICAgICAgICAgICAgICB9LCB0WzEgXiBlXVsyXS5kaXNhYmxlLCB0WzJdWzJdLmxvY2spLCBpW29bMF1dID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpW29bMF0gKyBcIldpdGhcIl0odGhpcyA9PT0gaSA/IHIgOiB0aGlzLCBhcmd1bWVudHMpLCB0aGlzO1xuICAgICAgICAgICAgICAgIH0sIGlbb1swXSArIFwiV2l0aFwiXSA9IHMuZmlyZVdpdGg7XG4gICAgICAgICAgICB9KSwgci5wcm9taXNlKGkpLCBlICYmIGUuY2FsbChpLCBpKSwgaTtcbiAgICAgICAgfSxcbiAgICAgICAgd2hlbjogZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgdmFyIHQgPSAwLCBuID0gZC5jYWxsKGFyZ3VtZW50cyksIHIgPSBuLmxlbmd0aCwgaSA9IDEgIT09IHIgfHwgZSAmJiB4LmlzRnVuY3Rpb24oZS5wcm9taXNlKSA/IHIgOiAwLCBvID0gMSA9PT0gaSA/IGUgOiB4LkRlZmVycmVkKCksIHMgPSBmdW5jdGlvbihlLCB0LCBuKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHIpIHtcbiAgICAgICAgICAgICAgICAgICAgdFtlXSA9IHRoaXMsIG5bZV0gPSBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGQuY2FsbChhcmd1bWVudHMpIDogciwgbiA9PT0gYSA/IG8ubm90aWZ5V2l0aCh0LCBuKSA6IC0taSB8fCBvLnJlc29sdmVXaXRoKHQsIG4pO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9LCBhLCB1LCBsO1xuICAgICAgICAgICAgaWYgKHIgPiAxKSBmb3IgKGEgPSBBcnJheShyKSwgdSA9IEFycmF5KHIpLCBsID0gQXJyYXkocik7IHIgPiB0OyB0KyspIG5bdF0gJiYgeC5pc0Z1bmN0aW9uKG5bdF0ucHJvbWlzZSkgPyBuW3RdLnByb21pc2UoKS5kb25lKHModCwgbCwgbikpLmZhaWwoby5yZWplY3QpLnByb2dyZXNzKHModCwgdSwgYSkpIDogLS1pO1xuICAgICAgICAgICAgcmV0dXJuIGkgfHwgby5yZXNvbHZlV2l0aChsLCBuKSwgby5wcm9taXNlKCk7XG4gICAgICAgIH1cbiAgICB9KSwgeC5zdXBwb3J0ID0gZnVuY3Rpb24odCkge1xuICAgICAgICB2YXIgbiA9IG8uY3JlYXRlRWxlbWVudChcImlucHV0XCIpLCByID0gby5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCksIGkgPSBvLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiksIHMgPSBvLmNyZWF0ZUVsZW1lbnQoXCJzZWxlY3RcIiksIGEgPSBzLmFwcGVuZENoaWxkKG8uY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKSk7XG4gICAgICAgIHJldHVybiBuLnR5cGUgPyAobi50eXBlID0gXCJjaGVja2JveFwiLCB0LmNoZWNrT24gPSBcIlwiICE9PSBuLnZhbHVlLCB0Lm9wdFNlbGVjdGVkID0gYS5zZWxlY3RlZCwgXG4gICAgICAgIHQucmVsaWFibGVNYXJnaW5SaWdodCA9ICEwLCB0LmJveFNpemluZ1JlbGlhYmxlID0gITAsIHQucGl4ZWxQb3NpdGlvbiA9ICExLCBuLmNoZWNrZWQgPSAhMCwgXG4gICAgICAgIHQubm9DbG9uZUNoZWNrZWQgPSBuLmNsb25lTm9kZSghMCkuY2hlY2tlZCwgcy5kaXNhYmxlZCA9ICEwLCB0Lm9wdERpc2FibGVkID0gIWEuZGlzYWJsZWQsIFxuICAgICAgICBuID0gby5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIiksIG4udmFsdWUgPSBcInRcIiwgbi50eXBlID0gXCJyYWRpb1wiLCB0LnJhZGlvVmFsdWUgPSBcInRcIiA9PT0gbi52YWx1ZSwgXG4gICAgICAgIG4uc2V0QXR0cmlidXRlKFwiY2hlY2tlZFwiLCBcInRcIiksIG4uc2V0QXR0cmlidXRlKFwibmFtZVwiLCBcInRcIiksIHIuYXBwZW5kQ2hpbGQobiksIHQuY2hlY2tDbG9uZSA9IHIuY2xvbmVOb2RlKCEwKS5jbG9uZU5vZGUoITApLmxhc3RDaGlsZC5jaGVja2VkLCBcbiAgICAgICAgdC5mb2N1c2luQnViYmxlcyA9IFwib25mb2N1c2luXCIgaW4gZSwgaS5zdHlsZS5iYWNrZ3JvdW5kQ2xpcCA9IFwiY29udGVudC1ib3hcIiwgaS5jbG9uZU5vZGUoITApLnN0eWxlLmJhY2tncm91bmRDbGlwID0gXCJcIiwgXG4gICAgICAgIHQuY2xlYXJDbG9uZVN0eWxlID0gXCJjb250ZW50LWJveFwiID09PSBpLnN0eWxlLmJhY2tncm91bmRDbGlwLCB4KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIG4sIHIsIHMgPSBcInBhZGRpbmc6MDttYXJnaW46MDtib3JkZXI6MDtkaXNwbGF5OmJsb2NrOy13ZWJraXQtYm94LXNpemluZzpjb250ZW50LWJveDstbW96LWJveC1zaXppbmc6Y29udGVudC1ib3g7Ym94LXNpemluZzpjb250ZW50LWJveFwiLCBhID0gby5nZXRFbGVtZW50c0J5VGFnTmFtZShcImJvZHlcIilbMF07XG4gICAgICAgICAgICBhICYmIChuID0gby5jcmVhdGVFbGVtZW50KFwiZGl2XCIpLCBuLnN0eWxlLmNzc1RleHQgPSBcImJvcmRlcjowO3dpZHRoOjA7aGVpZ2h0OjA7cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7bGVmdDotOTk5OXB4O21hcmdpbi10b3A6MXB4XCIsIFxuICAgICAgICAgICAgYS5hcHBlbmRDaGlsZChuKS5hcHBlbmRDaGlsZChpKSwgaS5pbm5lckhUTUwgPSBcIlwiLCBpLnN0eWxlLmNzc1RleHQgPSBcIi13ZWJraXQtYm94LXNpemluZzpib3JkZXItYm94Oy1tb3otYm94LXNpemluZzpib3JkZXItYm94O2JveC1zaXppbmc6Ym9yZGVyLWJveDtwYWRkaW5nOjFweDtib3JkZXI6MXB4O2Rpc3BsYXk6YmxvY2s7d2lkdGg6NHB4O21hcmdpbi10b3A6MSU7cG9zaXRpb246YWJzb2x1dGU7dG9wOjElXCIsIFxuICAgICAgICAgICAgeC5zd2FwKGEsIG51bGwgIT0gYS5zdHlsZS56b29tID8ge1xuICAgICAgICAgICAgICAgIHpvb206IDFcbiAgICAgICAgICAgIH0gOiB7fSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdC5ib3hTaXppbmcgPSA0ID09PSBpLm9mZnNldFdpZHRoO1xuICAgICAgICAgICAgfSksIGUuZ2V0Q29tcHV0ZWRTdHlsZSAmJiAodC5waXhlbFBvc2l0aW9uID0gXCIxJVwiICE9PSAoZS5nZXRDb21wdXRlZFN0eWxlKGksIG51bGwpIHx8IHt9KS50b3AsIFxuICAgICAgICAgICAgdC5ib3hTaXppbmdSZWxpYWJsZSA9IFwiNHB4XCIgPT09IChlLmdldENvbXB1dGVkU3R5bGUoaSwgbnVsbCkgfHwge1xuICAgICAgICAgICAgICAgIHdpZHRoOiBcIjRweFwiXG4gICAgICAgICAgICB9KS53aWR0aCwgciA9IGkuYXBwZW5kQ2hpbGQoby5jcmVhdGVFbGVtZW50KFwiZGl2XCIpKSwgci5zdHlsZS5jc3NUZXh0ID0gaS5zdHlsZS5jc3NUZXh0ID0gcywgXG4gICAgICAgICAgICByLnN0eWxlLm1hcmdpblJpZ2h0ID0gci5zdHlsZS53aWR0aCA9IFwiMFwiLCBpLnN0eWxlLndpZHRoID0gXCIxcHhcIiwgdC5yZWxpYWJsZU1hcmdpblJpZ2h0ID0gIXBhcnNlRmxvYXQoKGUuZ2V0Q29tcHV0ZWRTdHlsZShyLCBudWxsKSB8fCB7fSkubWFyZ2luUmlnaHQpKSwgXG4gICAgICAgICAgICBhLnJlbW92ZUNoaWxkKG4pKTtcbiAgICAgICAgfSksIHQpIDogdDtcbiAgICB9KHt9KTtcbiAgICB2YXIgTCwgcSwgSCA9IC8oPzpcXHtbXFxzXFxTXSpcXH18XFxbW1xcc1xcU10qXFxdKSQvLCBPID0gLyhbQS1aXSkvZztcbiAgICBmdW5jdGlvbiBGKCkge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcy5jYWNoZSA9IHt9LCAwLCB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7fTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSksIHRoaXMuZXhwYW5kbyA9IHguZXhwYW5kbyArIE1hdGgucmFuZG9tKCk7XG4gICAgfVxuICAgIEYudWlkID0gMSwgRi5hY2NlcHRzID0gZnVuY3Rpb24oZSkge1xuICAgICAgICByZXR1cm4gZS5ub2RlVHlwZSA/IDEgPT09IGUubm9kZVR5cGUgfHwgOSA9PT0gZS5ub2RlVHlwZSA6ICEwO1xuICAgIH0sIEYucHJvdG90eXBlID0ge1xuICAgICAgICBrZXk6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGlmICghRi5hY2NlcHRzKGUpKSByZXR1cm4gMDtcbiAgICAgICAgICAgIHZhciB0ID0ge30sIG4gPSBlW3RoaXMuZXhwYW5kb107XG4gICAgICAgICAgICBpZiAoIW4pIHtcbiAgICAgICAgICAgICAgICBuID0gRi51aWQrKztcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICB0W3RoaXMuZXhwYW5kb10gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogblxuICAgICAgICAgICAgICAgICAgICB9LCBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhlLCB0KTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRbdGhpcy5leHBhbmRvXSA9IG4sIHguZXh0ZW5kKGUsIHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNhY2hlW25dIHx8ICh0aGlzLmNhY2hlW25dID0ge30pLCBuO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uKGUsIHQsIG4pIHtcbiAgICAgICAgICAgIHZhciByLCBpID0gdGhpcy5rZXkoZSksIG8gPSB0aGlzLmNhY2hlW2ldO1xuICAgICAgICAgICAgaWYgKFwic3RyaW5nXCIgPT0gdHlwZW9mIHQpIG9bdF0gPSBuOyBlbHNlIGlmICh4LmlzRW1wdHlPYmplY3QobykpIHguZXh0ZW5kKHRoaXMuY2FjaGVbaV0sIHQpOyBlbHNlIGZvciAociBpbiB0KSBvW3JdID0gdFtyXTtcbiAgICAgICAgICAgIHJldHVybiBvO1xuICAgICAgICB9LFxuICAgICAgICBnZXQ6IGZ1bmN0aW9uKGUsIHQpIHtcbiAgICAgICAgICAgIHZhciBuID0gdGhpcy5jYWNoZVt0aGlzLmtleShlKV07XG4gICAgICAgICAgICByZXR1cm4gdCA9PT0gdW5kZWZpbmVkID8gbiA6IG5bdF07XG4gICAgICAgIH0sXG4gICAgICAgIGFjY2VzczogZnVuY3Rpb24oZSwgdCwgbikge1xuICAgICAgICAgICAgdmFyIHI7XG4gICAgICAgICAgICByZXR1cm4gdCA9PT0gdW5kZWZpbmVkIHx8IHQgJiYgXCJzdHJpbmdcIiA9PSB0eXBlb2YgdCAmJiBuID09PSB1bmRlZmluZWQgPyAociA9IHRoaXMuZ2V0KGUsIHQpLCBcbiAgICAgICAgICAgIHIgIT09IHVuZGVmaW5lZCA/IHIgOiB0aGlzLmdldChlLCB4LmNhbWVsQ2FzZSh0KSkpIDogKHRoaXMuc2V0KGUsIHQsIG4pLCBuICE9PSB1bmRlZmluZWQgPyBuIDogdCk7XG4gICAgICAgIH0sXG4gICAgICAgIHJlbW92ZTogZnVuY3Rpb24oZSwgdCkge1xuICAgICAgICAgICAgdmFyIG4sIHIsIGksIG8gPSB0aGlzLmtleShlKSwgcyA9IHRoaXMuY2FjaGVbb107XG4gICAgICAgICAgICBpZiAodCA9PT0gdW5kZWZpbmVkKSB0aGlzLmNhY2hlW29dID0ge307IGVsc2Uge1xuICAgICAgICAgICAgICAgIHguaXNBcnJheSh0KSA/IHIgPSB0LmNvbmNhdCh0Lm1hcCh4LmNhbWVsQ2FzZSkpIDogKGkgPSB4LmNhbWVsQ2FzZSh0KSwgdCBpbiBzID8gciA9IFsgdCwgaSBdIDogKHIgPSBpLCBcbiAgICAgICAgICAgICAgICByID0gciBpbiBzID8gWyByIF0gOiByLm1hdGNoKHcpIHx8IFtdKSksIG4gPSByLmxlbmd0aDtcbiAgICAgICAgICAgICAgICB3aGlsZSAobi0tKSBkZWxldGUgc1tyW25dXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgaGFzRGF0YTogZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgcmV0dXJuICF4LmlzRW1wdHlPYmplY3QodGhpcy5jYWNoZVtlW3RoaXMuZXhwYW5kb11dIHx8IHt9KTtcbiAgICAgICAgfSxcbiAgICAgICAgZGlzY2FyZDogZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgZVt0aGlzLmV4cGFuZG9dICYmIGRlbGV0ZSB0aGlzLmNhY2hlW2VbdGhpcy5leHBhbmRvXV07XG4gICAgICAgIH1cbiAgICB9LCBMID0gbmV3IEYoKSwgcSA9IG5ldyBGKCksIHguZXh0ZW5kKHtcbiAgICAgICAgYWNjZXB0RGF0YTogRi5hY2NlcHRzLFxuICAgICAgICBoYXNEYXRhOiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICByZXR1cm4gTC5oYXNEYXRhKGUpIHx8IHEuaGFzRGF0YShlKTtcbiAgICAgICAgfSxcbiAgICAgICAgZGF0YTogZnVuY3Rpb24oZSwgdCwgbikge1xuICAgICAgICAgICAgcmV0dXJuIEwuYWNjZXNzKGUsIHQsIG4pO1xuICAgICAgICB9LFxuICAgICAgICByZW1vdmVEYXRhOiBmdW5jdGlvbihlLCB0KSB7XG4gICAgICAgICAgICBMLnJlbW92ZShlLCB0KTtcbiAgICAgICAgfSxcbiAgICAgICAgX2RhdGE6IGZ1bmN0aW9uKGUsIHQsIG4pIHtcbiAgICAgICAgICAgIHJldHVybiBxLmFjY2VzcyhlLCB0LCBuKTtcbiAgICAgICAgfSxcbiAgICAgICAgX3JlbW92ZURhdGE6IGZ1bmN0aW9uKGUsIHQpIHtcbiAgICAgICAgICAgIHEucmVtb3ZlKGUsIHQpO1xuICAgICAgICB9XG4gICAgfSksIHguZm4uZXh0ZW5kKHtcbiAgICAgICAgZGF0YTogZnVuY3Rpb24oZSwgdCkge1xuICAgICAgICAgICAgdmFyIG4sIHIsIGkgPSB0aGlzWzBdLCBvID0gMCwgcyA9IG51bGw7XG4gICAgICAgICAgICBpZiAoZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubGVuZ3RoICYmIChzID0gTC5nZXQoaSksIDEgPT09IGkubm9kZVR5cGUgJiYgIXEuZ2V0KGksIFwiaGFzRGF0YUF0dHJzXCIpKSkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKG4gPSBpLmF0dHJpYnV0ZXM7IG4ubGVuZ3RoID4gbzsgbysrKSByID0gbltvXS5uYW1lLCAwID09PSByLmluZGV4T2YoXCJkYXRhLVwiKSAmJiAociA9IHguY2FtZWxDYXNlKHIuc2xpY2UoNSkpLCBcbiAgICAgICAgICAgICAgICAgICAgUChpLCByLCBzW3JdKSk7XG4gICAgICAgICAgICAgICAgICAgIHEuc2V0KGksIFwiaGFzRGF0YUF0dHJzXCIsICEwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gXCJvYmplY3RcIiA9PSB0eXBlb2YgZSA/IHRoaXMuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBMLnNldCh0aGlzLCBlKTtcbiAgICAgICAgICAgIH0pIDogeC5hY2Nlc3ModGhpcywgZnVuY3Rpb24odCkge1xuICAgICAgICAgICAgICAgIHZhciBuLCByID0geC5jYW1lbENhc2UoZSk7XG4gICAgICAgICAgICAgICAgaWYgKGkgJiYgdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChuID0gTC5nZXQoaSwgZSksIG4gIT09IHVuZGVmaW5lZCkgcmV0dXJuIG47XG4gICAgICAgICAgICAgICAgICAgIGlmIChuID0gTC5nZXQoaSwgciksIG4gIT09IHVuZGVmaW5lZCkgcmV0dXJuIG47XG4gICAgICAgICAgICAgICAgICAgIGlmIChuID0gUChpLCByLCB1bmRlZmluZWQpLCBuICE9PSB1bmRlZmluZWQpIHJldHVybiBuO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBuID0gTC5nZXQodGhpcywgcik7XG4gICAgICAgICAgICAgICAgICAgIEwuc2V0KHRoaXMsIHIsIHQpLCAtMSAhPT0gZS5pbmRleE9mKFwiLVwiKSAmJiBuICE9PSB1bmRlZmluZWQgJiYgTC5zZXQodGhpcywgZSwgdCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LCBudWxsLCB0LCBhcmd1bWVudHMubGVuZ3RoID4gMSwgbnVsbCwgITApO1xuICAgICAgICB9LFxuICAgICAgICByZW1vdmVEYXRhOiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIEwucmVtb3ZlKHRoaXMsIGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBmdW5jdGlvbiBQKGUsIHQsIG4pIHtcbiAgICAgICAgdmFyIHI7XG4gICAgICAgIGlmIChuID09PSB1bmRlZmluZWQgJiYgMSA9PT0gZS5ub2RlVHlwZSkgaWYgKHIgPSBcImRhdGEtXCIgKyB0LnJlcGxhY2UoTywgXCItJDFcIikudG9Mb3dlckNhc2UoKSwgXG4gICAgICAgIG4gPSBlLmdldEF0dHJpYnV0ZShyKSwgXCJzdHJpbmdcIiA9PSB0eXBlb2Ygbikge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBuID0gXCJ0cnVlXCIgPT09IG4gPyAhMCA6IFwiZmFsc2VcIiA9PT0gbiA/ICExIDogXCJudWxsXCIgPT09IG4gPyBudWxsIDogK24gKyBcIlwiID09PSBuID8gK24gOiBILnRlc3QobikgPyBKU09OLnBhcnNlKG4pIDogbjtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGkpIHt9XG4gICAgICAgICAgICBMLnNldChlLCB0LCBuKTtcbiAgICAgICAgfSBlbHNlIG4gPSB1bmRlZmluZWQ7XG4gICAgICAgIHJldHVybiBuO1xuICAgIH1cbiAgICB4LmV4dGVuZCh7XG4gICAgICAgIHF1ZXVlOiBmdW5jdGlvbihlLCB0LCBuKSB7XG4gICAgICAgICAgICB2YXIgcjtcbiAgICAgICAgICAgIHJldHVybiBlID8gKHQgPSAodCB8fCBcImZ4XCIpICsgXCJxdWV1ZVwiLCByID0gcS5nZXQoZSwgdCksIG4gJiYgKCFyIHx8IHguaXNBcnJheShuKSA/IHIgPSBxLmFjY2VzcyhlLCB0LCB4Lm1ha2VBcnJheShuKSkgOiByLnB1c2gobikpLCBcbiAgICAgICAgICAgIHIgfHwgW10pIDogdW5kZWZpbmVkO1xuICAgICAgICB9LFxuICAgICAgICBkZXF1ZXVlOiBmdW5jdGlvbihlLCB0KSB7XG4gICAgICAgICAgICB0ID0gdCB8fCBcImZ4XCI7XG4gICAgICAgICAgICB2YXIgbiA9IHgucXVldWUoZSwgdCksIHIgPSBuLmxlbmd0aCwgaSA9IG4uc2hpZnQoKSwgbyA9IHguX3F1ZXVlSG9va3MoZSwgdCksIHMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB4LmRlcXVldWUoZSwgdCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgXCJpbnByb2dyZXNzXCIgPT09IGkgJiYgKGkgPSBuLnNoaWZ0KCksIHItLSksIGkgJiYgKFwiZnhcIiA9PT0gdCAmJiBuLnVuc2hpZnQoXCJpbnByb2dyZXNzXCIpLCBcbiAgICAgICAgICAgIGRlbGV0ZSBvLnN0b3AsIGkuY2FsbChlLCBzLCBvKSksICFyICYmIG8gJiYgby5lbXB0eS5maXJlKCk7XG4gICAgICAgIH0sXG4gICAgICAgIF9xdWV1ZUhvb2tzOiBmdW5jdGlvbihlLCB0KSB7XG4gICAgICAgICAgICB2YXIgbiA9IHQgKyBcInF1ZXVlSG9va3NcIjtcbiAgICAgICAgICAgIHJldHVybiBxLmdldChlLCBuKSB8fCBxLmFjY2VzcyhlLCBuLCB7XG4gICAgICAgICAgICAgICAgZW1wdHk6IHguQ2FsbGJhY2tzKFwib25jZSBtZW1vcnlcIikuYWRkKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBxLnJlbW92ZShlLCBbIHQgKyBcInF1ZXVlXCIsIG4gXSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSksIHguZm4uZXh0ZW5kKHtcbiAgICAgICAgcXVldWU6IGZ1bmN0aW9uKGUsIHQpIHtcbiAgICAgICAgICAgIHZhciBuID0gMjtcbiAgICAgICAgICAgIHJldHVybiBcInN0cmluZ1wiICE9IHR5cGVvZiBlICYmICh0ID0gZSwgZSA9IFwiZnhcIiwgbi0tKSwgbiA+IGFyZ3VtZW50cy5sZW5ndGggPyB4LnF1ZXVlKHRoaXNbMF0sIGUpIDogdCA9PT0gdW5kZWZpbmVkID8gdGhpcyA6IHRoaXMuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgbiA9IHgucXVldWUodGhpcywgZSwgdCk7XG4gICAgICAgICAgICAgICAgeC5fcXVldWVIb29rcyh0aGlzLCBlKSwgXCJmeFwiID09PSBlICYmIFwiaW5wcm9ncmVzc1wiICE9PSBuWzBdICYmIHguZGVxdWV1ZSh0aGlzLCBlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBkZXF1ZXVlOiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHguZGVxdWV1ZSh0aGlzLCBlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBkZWxheTogZnVuY3Rpb24oZSwgdCkge1xuICAgICAgICAgICAgcmV0dXJuIGUgPSB4LmZ4ID8geC5meC5zcGVlZHNbZV0gfHwgZSA6IGUsIHQgPSB0IHx8IFwiZnhcIiwgdGhpcy5xdWV1ZSh0LCBmdW5jdGlvbih0LCBuKSB7XG4gICAgICAgICAgICAgICAgdmFyIHIgPSBzZXRUaW1lb3V0KHQsIGUpO1xuICAgICAgICAgICAgICAgIG4uc3RvcCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQocik7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBjbGVhclF1ZXVlOiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5xdWV1ZShlIHx8IFwiZnhcIiwgW10pO1xuICAgICAgICB9LFxuICAgICAgICBwcm9taXNlOiBmdW5jdGlvbihlLCB0KSB7XG4gICAgICAgICAgICB2YXIgbiwgciA9IDEsIGkgPSB4LkRlZmVycmVkKCksIG8gPSB0aGlzLCBzID0gdGhpcy5sZW5ndGgsIGEgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAtLXIgfHwgaS5yZXNvbHZlV2l0aChvLCBbIG8gXSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgXCJzdHJpbmdcIiAhPSB0eXBlb2YgZSAmJiAodCA9IGUsIGUgPSB1bmRlZmluZWQpLCBlID0gZSB8fCBcImZ4XCI7XG4gICAgICAgICAgICB3aGlsZSAocy0tKSBuID0gcS5nZXQob1tzXSwgZSArIFwicXVldWVIb29rc1wiKSwgbiAmJiBuLmVtcHR5ICYmIChyKyssIG4uZW1wdHkuYWRkKGEpKTtcbiAgICAgICAgICAgIHJldHVybiBhKCksIGkucHJvbWlzZSh0KTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHZhciBSLCBNLCBXID0gL1tcXHRcXHJcXG5cXGZdL2csICQgPSAvXFxyL2csIEIgPSAvXig/OmlucHV0fHNlbGVjdHx0ZXh0YXJlYXxidXR0b24pJC9pO1xuICAgIHguZm4uZXh0ZW5kKHtcbiAgICAgICAgYXR0cjogZnVuY3Rpb24oZSwgdCkge1xuICAgICAgICAgICAgcmV0dXJuIHguYWNjZXNzKHRoaXMsIHguYXR0ciwgZSwgdCwgYXJndW1lbnRzLmxlbmd0aCA+IDEpO1xuICAgICAgICB9LFxuICAgICAgICByZW1vdmVBdHRyOiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHgucmVtb3ZlQXR0cih0aGlzLCBlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBwcm9wOiBmdW5jdGlvbihlLCB0KSB7XG4gICAgICAgICAgICByZXR1cm4geC5hY2Nlc3ModGhpcywgeC5wcm9wLCBlLCB0LCBhcmd1bWVudHMubGVuZ3RoID4gMSk7XG4gICAgICAgIH0sXG4gICAgICAgIHJlbW92ZVByb3A6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXNbeC5wcm9wRml4W2VdIHx8IGVdO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGFkZENsYXNzOiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICB2YXIgdCwgbiwgciwgaSwgbywgcyA9IDAsIGEgPSB0aGlzLmxlbmd0aCwgdSA9IFwic3RyaW5nXCIgPT0gdHlwZW9mIGUgJiYgZTtcbiAgICAgICAgICAgIGlmICh4LmlzRnVuY3Rpb24oZSkpIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24odCkge1xuICAgICAgICAgICAgICAgIHgodGhpcykuYWRkQ2xhc3MoZS5jYWxsKHRoaXMsIHQsIHRoaXMuY2xhc3NOYW1lKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmICh1KSBmb3IgKHQgPSAoZSB8fCBcIlwiKS5tYXRjaCh3KSB8fCBbXTsgYSA+IHM7IHMrKykgaWYgKG4gPSB0aGlzW3NdLCByID0gMSA9PT0gbi5ub2RlVHlwZSAmJiAobi5jbGFzc05hbWUgPyAoXCIgXCIgKyBuLmNsYXNzTmFtZSArIFwiIFwiKS5yZXBsYWNlKFcsIFwiIFwiKSA6IFwiIFwiKSkge1xuICAgICAgICAgICAgICAgIG8gPSAwO1xuICAgICAgICAgICAgICAgIHdoaWxlIChpID0gdFtvKytdKSAwID4gci5pbmRleE9mKFwiIFwiICsgaSArIFwiIFwiKSAmJiAociArPSBpICsgXCIgXCIpO1xuICAgICAgICAgICAgICAgIG4uY2xhc3NOYW1lID0geC50cmltKHIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0sXG4gICAgICAgIHJlbW92ZUNsYXNzOiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICB2YXIgdCwgbiwgciwgaSwgbywgcyA9IDAsIGEgPSB0aGlzLmxlbmd0aCwgdSA9IDAgPT09IGFyZ3VtZW50cy5sZW5ndGggfHwgXCJzdHJpbmdcIiA9PSB0eXBlb2YgZSAmJiBlO1xuICAgICAgICAgICAgaWYgKHguaXNGdW5jdGlvbihlKSkgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbih0KSB7XG4gICAgICAgICAgICAgICAgeCh0aGlzKS5yZW1vdmVDbGFzcyhlLmNhbGwodGhpcywgdCwgdGhpcy5jbGFzc05hbWUpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKHUpIGZvciAodCA9IChlIHx8IFwiXCIpLm1hdGNoKHcpIHx8IFtdOyBhID4gczsgcysrKSBpZiAobiA9IHRoaXNbc10sIHIgPSAxID09PSBuLm5vZGVUeXBlICYmIChuLmNsYXNzTmFtZSA/IChcIiBcIiArIG4uY2xhc3NOYW1lICsgXCIgXCIpLnJlcGxhY2UoVywgXCIgXCIpIDogXCJcIikpIHtcbiAgICAgICAgICAgICAgICBvID0gMDtcbiAgICAgICAgICAgICAgICB3aGlsZSAoaSA9IHRbbysrXSkgd2hpbGUgKHIuaW5kZXhPZihcIiBcIiArIGkgKyBcIiBcIikgPj0gMCkgciA9IHIucmVwbGFjZShcIiBcIiArIGkgKyBcIiBcIiwgXCIgXCIpO1xuICAgICAgICAgICAgICAgIG4uY2xhc3NOYW1lID0gZSA/IHgudHJpbShyKSA6IFwiXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSxcbiAgICAgICAgdG9nZ2xlQ2xhc3M6IGZ1bmN0aW9uKGUsIHQpIHtcbiAgICAgICAgICAgIHZhciBuID0gdHlwZW9mIGU7XG4gICAgICAgICAgICByZXR1cm4gXCJib29sZWFuXCIgPT0gdHlwZW9mIHQgJiYgXCJzdHJpbmdcIiA9PT0gbiA/IHQgPyB0aGlzLmFkZENsYXNzKGUpIDogdGhpcy5yZW1vdmVDbGFzcyhlKSA6IHguaXNGdW5jdGlvbihlKSA/IHRoaXMuZWFjaChmdW5jdGlvbihuKSB7XG4gICAgICAgICAgICAgICAgeCh0aGlzKS50b2dnbGVDbGFzcyhlLmNhbGwodGhpcywgbiwgdGhpcy5jbGFzc05hbWUsIHQpLCB0KTtcbiAgICAgICAgICAgIH0pIDogdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGlmIChcInN0cmluZ1wiID09PSBuKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0LCBpID0gMCwgbyA9IHgodGhpcyksIHMgPSBlLm1hdGNoKHcpIHx8IFtdO1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAodCA9IHNbaSsrXSkgby5oYXNDbGFzcyh0KSA/IG8ucmVtb3ZlQ2xhc3ModCkgOiBvLmFkZENsYXNzKHQpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSAobiA9PT0gciB8fCBcImJvb2xlYW5cIiA9PT0gbikgJiYgKHRoaXMuY2xhc3NOYW1lICYmIHEuc2V0KHRoaXMsIFwiX19jbGFzc05hbWVfX1wiLCB0aGlzLmNsYXNzTmFtZSksIFxuICAgICAgICAgICAgICAgIHRoaXMuY2xhc3NOYW1lID0gdGhpcy5jbGFzc05hbWUgfHwgZSA9PT0gITEgPyBcIlwiIDogcS5nZXQodGhpcywgXCJfX2NsYXNzTmFtZV9fXCIpIHx8IFwiXCIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGhhc0NsYXNzOiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICB2YXIgdCA9IFwiIFwiICsgZSArIFwiIFwiLCBuID0gMCwgciA9IHRoaXMubGVuZ3RoO1xuICAgICAgICAgICAgZm9yICg7ciA+IG47IG4rKykgaWYgKDEgPT09IHRoaXNbbl0ubm9kZVR5cGUgJiYgKFwiIFwiICsgdGhpc1tuXS5jbGFzc05hbWUgKyBcIiBcIikucmVwbGFjZShXLCBcIiBcIikuaW5kZXhPZih0KSA+PSAwKSByZXR1cm4gITA7XG4gICAgICAgICAgICByZXR1cm4gITE7XG4gICAgICAgIH0sXG4gICAgICAgIHZhbDogZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgdmFyIHQsIG4sIHIsIGkgPSB0aGlzWzBdO1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gciA9IHguaXNGdW5jdGlvbihlKSwgdGhpcy5lYWNoKGZ1bmN0aW9uKG4pIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGk7XG4gICAgICAgICAgICAgICAgICAgIDEgPT09IHRoaXMubm9kZVR5cGUgJiYgKGkgPSByID8gZS5jYWxsKHRoaXMsIG4sIHgodGhpcykudmFsKCkpIDogZSwgbnVsbCA9PSBpID8gaSA9IFwiXCIgOiBcIm51bWJlclwiID09IHR5cGVvZiBpID8gaSArPSBcIlwiIDogeC5pc0FycmF5KGkpICYmIChpID0geC5tYXAoaSwgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGwgPT0gZSA/IFwiXCIgOiBlICsgXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgfSkpLCB0ID0geC52YWxIb29rc1t0aGlzLnR5cGVdIHx8IHgudmFsSG9va3NbdGhpcy5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpXSwgdCAmJiBcInNldFwiIGluIHQgJiYgdC5zZXQodGhpcywgaSwgXCJ2YWx1ZVwiKSAhPT0gdW5kZWZpbmVkIHx8ICh0aGlzLnZhbHVlID0gaSkpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGlmIChpKSByZXR1cm4gdCA9IHgudmFsSG9va3NbaS50eXBlXSB8fCB4LnZhbEhvb2tzW2kubm9kZU5hbWUudG9Mb3dlckNhc2UoKV0sIHQgJiYgXCJnZXRcIiBpbiB0ICYmIChuID0gdC5nZXQoaSwgXCJ2YWx1ZVwiKSkgIT09IHVuZGVmaW5lZCA/IG4gOiAobiA9IGkudmFsdWUsIFxuICAgICAgICAgICAgICAgIFwic3RyaW5nXCIgPT0gdHlwZW9mIG4gPyBuLnJlcGxhY2UoJCwgXCJcIikgOiBudWxsID09IG4gPyBcIlwiIDogbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KSwgeC5leHRlbmQoe1xuICAgICAgICB2YWxIb29rczoge1xuICAgICAgICAgICAgb3B0aW9uOiB7XG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0ID0gZS5hdHRyaWJ1dGVzLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gIXQgfHwgdC5zcGVjaWZpZWQgPyBlLnZhbHVlIDogZS50ZXh0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZWxlY3Q6IHtcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHQsIG4sIHIgPSBlLm9wdGlvbnMsIGkgPSBlLnNlbGVjdGVkSW5kZXgsIG8gPSBcInNlbGVjdC1vbmVcIiA9PT0gZS50eXBlIHx8IDAgPiBpLCBzID0gbyA/IG51bGwgOiBbXSwgYSA9IG8gPyBpICsgMSA6IHIubGVuZ3RoLCB1ID0gMCA+IGkgPyBhIDogbyA/IGkgOiAwO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKDthID4gdTsgdSsrKSBpZiAobiA9IHJbdV0sICEoIW4uc2VsZWN0ZWQgJiYgdSAhPT0gaSB8fCAoeC5zdXBwb3J0Lm9wdERpc2FibGVkID8gbi5kaXNhYmxlZCA6IG51bGwgIT09IG4uZ2V0QXR0cmlidXRlKFwiZGlzYWJsZWRcIikpIHx8IG4ucGFyZW50Tm9kZS5kaXNhYmxlZCAmJiB4Lm5vZGVOYW1lKG4ucGFyZW50Tm9kZSwgXCJvcHRncm91cFwiKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0ID0geChuKS52YWwoKSwgbykgcmV0dXJuIHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBzLnB1c2godCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHM7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKGUsIHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG4sIHIsIGkgPSBlLm9wdGlvbnMsIG8gPSB4Lm1ha2VBcnJheSh0KSwgcyA9IGkubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAocy0tKSByID0gaVtzXSwgKHIuc2VsZWN0ZWQgPSB4LmluQXJyYXkoeChyKS52YWwoKSwgbykgPj0gMCkgJiYgKG4gPSAhMCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuIHx8IChlLnNlbGVjdGVkSW5kZXggPSAtMSksIG87XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBhdHRyOiBmdW5jdGlvbihlLCB0LCBuKSB7XG4gICAgICAgICAgICB2YXIgaSwgbywgcyA9IGUubm9kZVR5cGU7XG4gICAgICAgICAgICBpZiAoZSAmJiAzICE9PSBzICYmIDggIT09IHMgJiYgMiAhPT0gcykgcmV0dXJuIHR5cGVvZiBlLmdldEF0dHJpYnV0ZSA9PT0gciA/IHgucHJvcChlLCB0LCBuKSA6ICgxID09PSBzICYmIHguaXNYTUxEb2MoZSkgfHwgKHQgPSB0LnRvTG93ZXJDYXNlKCksIFxuICAgICAgICAgICAgaSA9IHguYXR0ckhvb2tzW3RdIHx8ICh4LmV4cHIubWF0Y2guYm9vbC50ZXN0KHQpID8gTSA6IFIpKSwgbiA9PT0gdW5kZWZpbmVkID8gaSAmJiBcImdldFwiIGluIGkgJiYgbnVsbCAhPT0gKG8gPSBpLmdldChlLCB0KSkgPyBvIDogKG8gPSB4LmZpbmQuYXR0cihlLCB0KSwgXG4gICAgICAgICAgICBudWxsID09IG8gPyB1bmRlZmluZWQgOiBvKSA6IG51bGwgIT09IG4gPyBpICYmIFwic2V0XCIgaW4gaSAmJiAobyA9IGkuc2V0KGUsIG4sIHQpKSAhPT0gdW5kZWZpbmVkID8gbyA6IChlLnNldEF0dHJpYnV0ZSh0LCBuICsgXCJcIiksIFxuICAgICAgICAgICAgbikgOiAoeC5yZW1vdmVBdHRyKGUsIHQpLCB1bmRlZmluZWQpKTtcbiAgICAgICAgfSxcbiAgICAgICAgcmVtb3ZlQXR0cjogZnVuY3Rpb24oZSwgdCkge1xuICAgICAgICAgICAgdmFyIG4sIHIsIGkgPSAwLCBvID0gdCAmJiB0Lm1hdGNoKHcpO1xuICAgICAgICAgICAgaWYgKG8gJiYgMSA9PT0gZS5ub2RlVHlwZSkgd2hpbGUgKG4gPSBvW2krK10pIHIgPSB4LnByb3BGaXhbbl0gfHwgbiwgeC5leHByLm1hdGNoLmJvb2wudGVzdChuKSAmJiAoZVtyXSA9ICExKSwgXG4gICAgICAgICAgICBlLnJlbW92ZUF0dHJpYnV0ZShuKTtcbiAgICAgICAgfSxcbiAgICAgICAgYXR0ckhvb2tzOiB7XG4gICAgICAgICAgICB0eXBlOiB7XG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbihlLCB0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICgheC5zdXBwb3J0LnJhZGlvVmFsdWUgJiYgXCJyYWRpb1wiID09PSB0ICYmIHgubm9kZU5hbWUoZSwgXCJpbnB1dFwiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG4gPSBlLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGUuc2V0QXR0cmlidXRlKFwidHlwZVwiLCB0KSwgbiAmJiAoZS52YWx1ZSA9IG4pLCB0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBwcm9wRml4OiB7XG4gICAgICAgICAgICBmb3I6IFwiaHRtbEZvclwiLFxuICAgICAgICAgICAgY2xhc3M6IFwiY2xhc3NOYW1lXCJcbiAgICAgICAgfSxcbiAgICAgICAgcHJvcDogZnVuY3Rpb24oZSwgdCwgbikge1xuICAgICAgICAgICAgdmFyIHIsIGksIG8sIHMgPSBlLm5vZGVUeXBlO1xuICAgICAgICAgICAgaWYgKGUgJiYgMyAhPT0gcyAmJiA4ICE9PSBzICYmIDIgIT09IHMpIHJldHVybiBvID0gMSAhPT0gcyB8fCAheC5pc1hNTERvYyhlKSwgbyAmJiAodCA9IHgucHJvcEZpeFt0XSB8fCB0LCBcbiAgICAgICAgICAgIGkgPSB4LnByb3BIb29rc1t0XSksIG4gIT09IHVuZGVmaW5lZCA/IGkgJiYgXCJzZXRcIiBpbiBpICYmIChyID0gaS5zZXQoZSwgbiwgdCkpICE9PSB1bmRlZmluZWQgPyByIDogZVt0XSA9IG4gOiBpICYmIFwiZ2V0XCIgaW4gaSAmJiBudWxsICE9PSAociA9IGkuZ2V0KGUsIHQpKSA/IHIgOiBlW3RdO1xuICAgICAgICB9LFxuICAgICAgICBwcm9wSG9va3M6IHtcbiAgICAgICAgICAgIHRhYkluZGV4OiB7XG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBlLmhhc0F0dHJpYnV0ZShcInRhYmluZGV4XCIpIHx8IEIudGVzdChlLm5vZGVOYW1lKSB8fCBlLmhyZWYgPyBlLnRhYkluZGV4IDogLTE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSksIE0gPSB7XG4gICAgICAgIHNldDogZnVuY3Rpb24oZSwgdCwgbikge1xuICAgICAgICAgICAgcmV0dXJuIHQgPT09ICExID8geC5yZW1vdmVBdHRyKGUsIG4pIDogZS5zZXRBdHRyaWJ1dGUobiwgbiksIG47XG4gICAgICAgIH1cbiAgICB9LCB4LmVhY2goeC5leHByLm1hdGNoLmJvb2wuc291cmNlLm1hdGNoKC9cXHcrL2cpLCBmdW5jdGlvbihlLCB0KSB7XG4gICAgICAgIHZhciBuID0geC5leHByLmF0dHJIYW5kbGVbdF0gfHwgeC5maW5kLmF0dHI7XG4gICAgICAgIHguZXhwci5hdHRySGFuZGxlW3RdID0gZnVuY3Rpb24oZSwgdCwgcikge1xuICAgICAgICAgICAgdmFyIGkgPSB4LmV4cHIuYXR0ckhhbmRsZVt0XSwgbyA9IHIgPyB1bmRlZmluZWQgOiAoeC5leHByLmF0dHJIYW5kbGVbdF0gPSB1bmRlZmluZWQpICE9IG4oZSwgdCwgcikgPyB0LnRvTG93ZXJDYXNlKCkgOiBudWxsO1xuICAgICAgICAgICAgcmV0dXJuIHguZXhwci5hdHRySGFuZGxlW3RdID0gaSwgbztcbiAgICAgICAgfTtcbiAgICB9KSwgeC5zdXBwb3J0Lm9wdFNlbGVjdGVkIHx8ICh4LnByb3BIb29rcy5zZWxlY3RlZCA9IHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICB2YXIgdCA9IGUucGFyZW50Tm9kZTtcbiAgICAgICAgICAgIHJldHVybiB0ICYmIHQucGFyZW50Tm9kZSAmJiB0LnBhcmVudE5vZGUuc2VsZWN0ZWRJbmRleCwgbnVsbDtcbiAgICAgICAgfVxuICAgIH0pLCB4LmVhY2goWyBcInRhYkluZGV4XCIsIFwicmVhZE9ubHlcIiwgXCJtYXhMZW5ndGhcIiwgXCJjZWxsU3BhY2luZ1wiLCBcImNlbGxQYWRkaW5nXCIsIFwicm93U3BhblwiLCBcImNvbFNwYW5cIiwgXCJ1c2VNYXBcIiwgXCJmcmFtZUJvcmRlclwiLCBcImNvbnRlbnRFZGl0YWJsZVwiIF0sIGZ1bmN0aW9uKCkge1xuICAgICAgICB4LnByb3BGaXhbdGhpcy50b0xvd2VyQ2FzZSgpXSA9IHRoaXM7XG4gICAgfSksIHguZWFjaChbIFwicmFkaW9cIiwgXCJjaGVja2JveFwiIF0sIGZ1bmN0aW9uKCkge1xuICAgICAgICB4LnZhbEhvb2tzW3RoaXNdID0ge1xuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbihlLCB0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHguaXNBcnJheSh0KSA/IGUuY2hlY2tlZCA9IHguaW5BcnJheSh4KGUpLnZhbCgpLCB0KSA+PSAwIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB4LnN1cHBvcnQuY2hlY2tPbiB8fCAoeC52YWxIb29rc1t0aGlzXS5nZXQgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbCA9PT0gZS5nZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiKSA/IFwib25cIiA6IGUudmFsdWU7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIHZhciBJID0gL15rZXkvLCB6ID0gL14oPzptb3VzZXxjb250ZXh0bWVudSl8Y2xpY2svLCBfID0gL14oPzpmb2N1c2luZm9jdXN8Zm9jdXNvdXRibHVyKSQvLCBYID0gL14oW14uXSopKD86XFwuKC4rKXwpJC87XG4gICAgZnVuY3Rpb24gVSgpIHtcbiAgICAgICAgcmV0dXJuICEwO1xuICAgIH1cbiAgICBmdW5jdGlvbiBZKCkge1xuICAgICAgICByZXR1cm4gITE7XG4gICAgfVxuICAgIGZ1bmN0aW9uIFYoKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gby5hY3RpdmVFbGVtZW50O1xuICAgICAgICB9IGNhdGNoIChlKSB7fVxuICAgIH1cbiAgICB4LmV2ZW50ID0ge1xuICAgICAgICBnbG9iYWw6IHt9LFxuICAgICAgICBhZGQ6IGZ1bmN0aW9uKGUsIHQsIG4sIGksIG8pIHtcbiAgICAgICAgICAgIHZhciBzLCBhLCB1LCBsLCBjLCBwLCBmLCBoLCBkLCBnLCBtLCB5ID0gcS5nZXQoZSk7XG4gICAgICAgICAgICBpZiAoeSkge1xuICAgICAgICAgICAgICAgIG4uaGFuZGxlciAmJiAocyA9IG4sIG4gPSBzLmhhbmRsZXIsIG8gPSBzLnNlbGVjdG9yKSwgbi5ndWlkIHx8IChuLmd1aWQgPSB4Lmd1aWQrKyksIFxuICAgICAgICAgICAgICAgIChsID0geS5ldmVudHMpIHx8IChsID0geS5ldmVudHMgPSB7fSksIChhID0geS5oYW5kbGUpIHx8IChhID0geS5oYW5kbGUgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0eXBlb2YgeCA9PT0gciB8fCBlICYmIHguZXZlbnQudHJpZ2dlcmVkID09PSBlLnR5cGUgPyB1bmRlZmluZWQgOiB4LmV2ZW50LmRpc3BhdGNoLmFwcGx5KGEuZWxlbSwgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICB9LCBhLmVsZW0gPSBlKSwgdCA9ICh0IHx8IFwiXCIpLm1hdGNoKHcpIHx8IFsgXCJcIiBdLCBjID0gdC5sZW5ndGg7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGMtLSkgdSA9IFguZXhlYyh0W2NdKSB8fCBbXSwgZCA9IG0gPSB1WzFdLCBnID0gKHVbMl0gfHwgXCJcIikuc3BsaXQoXCIuXCIpLnNvcnQoKSwgXG4gICAgICAgICAgICAgICAgZCAmJiAoZiA9IHguZXZlbnQuc3BlY2lhbFtkXSB8fCB7fSwgZCA9IChvID8gZi5kZWxlZ2F0ZVR5cGUgOiBmLmJpbmRUeXBlKSB8fCBkLCBcbiAgICAgICAgICAgICAgICBmID0geC5ldmVudC5zcGVjaWFsW2RdIHx8IHt9LCBwID0geC5leHRlbmQoe1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBkLFxuICAgICAgICAgICAgICAgICAgICBvcmlnVHlwZTogbSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogaSxcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlcjogbixcbiAgICAgICAgICAgICAgICAgICAgZ3VpZDogbi5ndWlkLFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RvcjogbyxcbiAgICAgICAgICAgICAgICAgICAgbmVlZHNDb250ZXh0OiBvICYmIHguZXhwci5tYXRjaC5uZWVkc0NvbnRleHQudGVzdChvKSxcbiAgICAgICAgICAgICAgICAgICAgbmFtZXNwYWNlOiBnLmpvaW4oXCIuXCIpXG4gICAgICAgICAgICAgICAgfSwgcyksIChoID0gbFtkXSkgfHwgKGggPSBsW2RdID0gW10sIGguZGVsZWdhdGVDb3VudCA9IDAsIGYuc2V0dXAgJiYgZi5zZXR1cC5jYWxsKGUsIGksIGcsIGEpICE9PSAhMSB8fCBlLmFkZEV2ZW50TGlzdGVuZXIgJiYgZS5hZGRFdmVudExpc3RlbmVyKGQsIGEsICExKSksIFxuICAgICAgICAgICAgICAgIGYuYWRkICYmIChmLmFkZC5jYWxsKGUsIHApLCBwLmhhbmRsZXIuZ3VpZCB8fCAocC5oYW5kbGVyLmd1aWQgPSBuLmd1aWQpKSwgbyA/IGguc3BsaWNlKGguZGVsZWdhdGVDb3VudCsrLCAwLCBwKSA6IGgucHVzaChwKSwgXG4gICAgICAgICAgICAgICAgeC5ldmVudC5nbG9iYWxbZF0gPSAhMCk7XG4gICAgICAgICAgICAgICAgZSA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHJlbW92ZTogZnVuY3Rpb24oZSwgdCwgbiwgciwgaSkge1xuICAgICAgICAgICAgdmFyIG8sIHMsIGEsIHUsIGwsIGMsIHAsIGYsIGgsIGQsIGcsIG0gPSBxLmhhc0RhdGEoZSkgJiYgcS5nZXQoZSk7XG4gICAgICAgICAgICBpZiAobSAmJiAodSA9IG0uZXZlbnRzKSkge1xuICAgICAgICAgICAgICAgIHQgPSAodCB8fCBcIlwiKS5tYXRjaCh3KSB8fCBbIFwiXCIgXSwgbCA9IHQubGVuZ3RoO1xuICAgICAgICAgICAgICAgIHdoaWxlIChsLS0pIGlmIChhID0gWC5leGVjKHRbbF0pIHx8IFtdLCBoID0gZyA9IGFbMV0sIGQgPSAoYVsyXSB8fCBcIlwiKS5zcGxpdChcIi5cIikuc29ydCgpLCBcbiAgICAgICAgICAgICAgICBoKSB7XG4gICAgICAgICAgICAgICAgICAgIHAgPSB4LmV2ZW50LnNwZWNpYWxbaF0gfHwge30sIGggPSAociA/IHAuZGVsZWdhdGVUeXBlIDogcC5iaW5kVHlwZSkgfHwgaCwgZiA9IHVbaF0gfHwgW10sIFxuICAgICAgICAgICAgICAgICAgICBhID0gYVsyXSAmJiBSZWdFeHAoXCIoXnxcXFxcLilcIiArIGQuam9pbihcIlxcXFwuKD86LipcXFxcLnwpXCIpICsgXCIoXFxcXC58JClcIiksIHMgPSBvID0gZi5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlIChvLS0pIGMgPSBmW29dLCAhaSAmJiBnICE9PSBjLm9yaWdUeXBlIHx8IG4gJiYgbi5ndWlkICE9PSBjLmd1aWQgfHwgYSAmJiAhYS50ZXN0KGMubmFtZXNwYWNlKSB8fCByICYmIHIgIT09IGMuc2VsZWN0b3IgJiYgKFwiKipcIiAhPT0gciB8fCAhYy5zZWxlY3RvcikgfHwgKGYuc3BsaWNlKG8sIDEpLCBcbiAgICAgICAgICAgICAgICAgICAgYy5zZWxlY3RvciAmJiBmLmRlbGVnYXRlQ291bnQtLSwgcC5yZW1vdmUgJiYgcC5yZW1vdmUuY2FsbChlLCBjKSk7XG4gICAgICAgICAgICAgICAgICAgIHMgJiYgIWYubGVuZ3RoICYmIChwLnRlYXJkb3duICYmIHAudGVhcmRvd24uY2FsbChlLCBkLCBtLmhhbmRsZSkgIT09ICExIHx8IHgucmVtb3ZlRXZlbnQoZSwgaCwgbS5oYW5kbGUpLCBcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHVbaF0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBmb3IgKGggaW4gdSkgeC5ldmVudC5yZW1vdmUoZSwgaCArIHRbbF0sIG4sIHIsICEwKTtcbiAgICAgICAgICAgICAgICB4LmlzRW1wdHlPYmplY3QodSkgJiYgKGRlbGV0ZSBtLmhhbmRsZSwgcS5yZW1vdmUoZSwgXCJldmVudHNcIikpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB0cmlnZ2VyOiBmdW5jdGlvbih0LCBuLCByLCBpKSB7XG4gICAgICAgICAgICB2YXIgcywgYSwgdSwgbCwgYywgcCwgZiwgaCA9IFsgciB8fCBvIF0sIGQgPSB5LmNhbGwodCwgXCJ0eXBlXCIpID8gdC50eXBlIDogdCwgZyA9IHkuY2FsbCh0LCBcIm5hbWVzcGFjZVwiKSA/IHQubmFtZXNwYWNlLnNwbGl0KFwiLlwiKSA6IFtdO1xuICAgICAgICAgICAgaWYgKGEgPSB1ID0gciA9IHIgfHwgbywgMyAhPT0gci5ub2RlVHlwZSAmJiA4ICE9PSByLm5vZGVUeXBlICYmICFfLnRlc3QoZCArIHguZXZlbnQudHJpZ2dlcmVkKSAmJiAoZC5pbmRleE9mKFwiLlwiKSA+PSAwICYmIChnID0gZC5zcGxpdChcIi5cIiksIFxuICAgICAgICAgICAgZCA9IGcuc2hpZnQoKSwgZy5zb3J0KCkpLCBjID0gMCA+IGQuaW5kZXhPZihcIjpcIikgJiYgXCJvblwiICsgZCwgdCA9IHRbeC5leHBhbmRvXSA/IHQgOiBuZXcgeC5FdmVudChkLCBcIm9iamVjdFwiID09IHR5cGVvZiB0ICYmIHQpLCBcbiAgICAgICAgICAgIHQuaXNUcmlnZ2VyID0gaSA/IDIgOiAzLCB0Lm5hbWVzcGFjZSA9IGcuam9pbihcIi5cIiksIHQubmFtZXNwYWNlX3JlID0gdC5uYW1lc3BhY2UgPyBSZWdFeHAoXCIoXnxcXFxcLilcIiArIGcuam9pbihcIlxcXFwuKD86LipcXFxcLnwpXCIpICsgXCIoXFxcXC58JClcIikgOiBudWxsLCBcbiAgICAgICAgICAgIHQucmVzdWx0ID0gdW5kZWZpbmVkLCB0LnRhcmdldCB8fCAodC50YXJnZXQgPSByKSwgbiA9IG51bGwgPT0gbiA/IFsgdCBdIDogeC5tYWtlQXJyYXkobiwgWyB0IF0pLCBcbiAgICAgICAgICAgIGYgPSB4LmV2ZW50LnNwZWNpYWxbZF0gfHwge30sIGkgfHwgIWYudHJpZ2dlciB8fCBmLnRyaWdnZXIuYXBwbHkociwgbikgIT09ICExKSkge1xuICAgICAgICAgICAgICAgIGlmICghaSAmJiAhZi5ub0J1YmJsZSAmJiAheC5pc1dpbmRvdyhyKSkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGwgPSBmLmRlbGVnYXRlVHlwZSB8fCBkLCBfLnRlc3QobCArIGQpIHx8IChhID0gYS5wYXJlbnROb2RlKTsgYTsgYSA9IGEucGFyZW50Tm9kZSkgaC5wdXNoKGEpLCBcbiAgICAgICAgICAgICAgICAgICAgdSA9IGE7XG4gICAgICAgICAgICAgICAgICAgIHUgPT09IChyLm93bmVyRG9jdW1lbnQgfHwgbykgJiYgaC5wdXNoKHUuZGVmYXVsdFZpZXcgfHwgdS5wYXJlbnRXaW5kb3cgfHwgZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHMgPSAwO1xuICAgICAgICAgICAgICAgIHdoaWxlICgoYSA9IGhbcysrXSkgJiYgIXQuaXNQcm9wYWdhdGlvblN0b3BwZWQoKSkgdC50eXBlID0gcyA+IDEgPyBsIDogZi5iaW5kVHlwZSB8fCBkLCBcbiAgICAgICAgICAgICAgICBwID0gKHEuZ2V0KGEsIFwiZXZlbnRzXCIpIHx8IHt9KVt0LnR5cGVdICYmIHEuZ2V0KGEsIFwiaGFuZGxlXCIpLCBwICYmIHAuYXBwbHkoYSwgbiksIFxuICAgICAgICAgICAgICAgIHAgPSBjICYmIGFbY10sIHAgJiYgeC5hY2NlcHREYXRhKGEpICYmIHAuYXBwbHkgJiYgcC5hcHBseShhLCBuKSA9PT0gITEgJiYgdC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0LnR5cGUgPSBkLCBpIHx8IHQuaXNEZWZhdWx0UHJldmVudGVkKCkgfHwgZi5fZGVmYXVsdCAmJiBmLl9kZWZhdWx0LmFwcGx5KGgucG9wKCksIG4pICE9PSAhMSB8fCAheC5hY2NlcHREYXRhKHIpIHx8IGMgJiYgeC5pc0Z1bmN0aW9uKHJbZF0pICYmICF4LmlzV2luZG93KHIpICYmICh1ID0gcltjXSwgXG4gICAgICAgICAgICAgICAgdSAmJiAocltjXSA9IG51bGwpLCB4LmV2ZW50LnRyaWdnZXJlZCA9IGQsIHJbZF0oKSwgeC5ldmVudC50cmlnZ2VyZWQgPSB1bmRlZmluZWQsIFxuICAgICAgICAgICAgICAgIHUgJiYgKHJbY10gPSB1KSksIHQucmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBkaXNwYXRjaDogZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgZSA9IHguZXZlbnQuZml4KGUpO1xuICAgICAgICAgICAgdmFyIHQsIG4sIHIsIGksIG8sIHMgPSBbXSwgYSA9IGQuY2FsbChhcmd1bWVudHMpLCB1ID0gKHEuZ2V0KHRoaXMsIFwiZXZlbnRzXCIpIHx8IHt9KVtlLnR5cGVdIHx8IFtdLCBsID0geC5ldmVudC5zcGVjaWFsW2UudHlwZV0gfHwge307XG4gICAgICAgICAgICBpZiAoYVswXSA9IGUsIGUuZGVsZWdhdGVUYXJnZXQgPSB0aGlzLCAhbC5wcmVEaXNwYXRjaCB8fCBsLnByZURpc3BhdGNoLmNhbGwodGhpcywgZSkgIT09ICExKSB7XG4gICAgICAgICAgICAgICAgcyA9IHguZXZlbnQuaGFuZGxlcnMuY2FsbCh0aGlzLCBlLCB1KSwgdCA9IDA7XG4gICAgICAgICAgICAgICAgd2hpbGUgKChpID0gc1t0KytdKSAmJiAhZS5pc1Byb3BhZ2F0aW9uU3RvcHBlZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGUuY3VycmVudFRhcmdldCA9IGkuZWxlbSwgbiA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlICgobyA9IGkuaGFuZGxlcnNbbisrXSkgJiYgIWUuaXNJbW1lZGlhdGVQcm9wYWdhdGlvblN0b3BwZWQoKSkgKCFlLm5hbWVzcGFjZV9yZSB8fCBlLm5hbWVzcGFjZV9yZS50ZXN0KG8ubmFtZXNwYWNlKSkgJiYgKGUuaGFuZGxlT2JqID0gbywgXG4gICAgICAgICAgICAgICAgICAgIGUuZGF0YSA9IG8uZGF0YSwgciA9ICgoeC5ldmVudC5zcGVjaWFsW28ub3JpZ1R5cGVdIHx8IHt9KS5oYW5kbGUgfHwgby5oYW5kbGVyKS5hcHBseShpLmVsZW0sIGEpLCBcbiAgICAgICAgICAgICAgICAgICAgciAhPT0gdW5kZWZpbmVkICYmIChlLnJlc3VsdCA9IHIpID09PSAhMSAmJiAoZS5wcmV2ZW50RGVmYXVsdCgpLCBlLnN0b3BQcm9wYWdhdGlvbigpKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBsLnBvc3REaXNwYXRjaCAmJiBsLnBvc3REaXNwYXRjaC5jYWxsKHRoaXMsIGUpLCBlLnJlc3VsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgaGFuZGxlcnM6IGZ1bmN0aW9uKGUsIHQpIHtcbiAgICAgICAgICAgIHZhciBuLCByLCBpLCBvLCBzID0gW10sIGEgPSB0LmRlbGVnYXRlQ291bnQsIHUgPSBlLnRhcmdldDtcbiAgICAgICAgICAgIGlmIChhICYmIHUubm9kZVR5cGUgJiYgKCFlLmJ1dHRvbiB8fCBcImNsaWNrXCIgIT09IGUudHlwZSkpIGZvciAoO3UgIT09IHRoaXM7IHUgPSB1LnBhcmVudE5vZGUgfHwgdGhpcykgaWYgKHUuZGlzYWJsZWQgIT09ICEwIHx8IFwiY2xpY2tcIiAhPT0gZS50eXBlKSB7XG4gICAgICAgICAgICAgICAgZm9yIChyID0gW10sIG4gPSAwOyBhID4gbjsgbisrKSBvID0gdFtuXSwgaSA9IG8uc2VsZWN0b3IgKyBcIiBcIiwgcltpXSA9PT0gdW5kZWZpbmVkICYmIChyW2ldID0gby5uZWVkc0NvbnRleHQgPyB4KGksIHRoaXMpLmluZGV4KHUpID49IDAgOiB4LmZpbmQoaSwgdGhpcywgbnVsbCwgWyB1IF0pLmxlbmd0aCksIFxuICAgICAgICAgICAgICAgIHJbaV0gJiYgci5wdXNoKG8pO1xuICAgICAgICAgICAgICAgIHIubGVuZ3RoICYmIHMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIGVsZW06IHUsXG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZXJzOiByXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdC5sZW5ndGggPiBhICYmIHMucHVzaCh7XG4gICAgICAgICAgICAgICAgZWxlbTogdGhpcyxcbiAgICAgICAgICAgICAgICBoYW5kbGVyczogdC5zbGljZShhKVxuICAgICAgICAgICAgfSksIHM7XG4gICAgICAgIH0sXG4gICAgICAgIHByb3BzOiBcImFsdEtleSBidWJibGVzIGNhbmNlbGFibGUgY3RybEtleSBjdXJyZW50VGFyZ2V0IGV2ZW50UGhhc2UgbWV0YUtleSByZWxhdGVkVGFyZ2V0IHNoaWZ0S2V5IHRhcmdldCB0aW1lU3RhbXAgdmlldyB3aGljaFwiLnNwbGl0KFwiIFwiKSxcbiAgICAgICAgZml4SG9va3M6IHt9LFxuICAgICAgICBrZXlIb29rczoge1xuICAgICAgICAgICAgcHJvcHM6IFwiY2hhciBjaGFyQ29kZSBrZXkga2V5Q29kZVwiLnNwbGl0KFwiIFwiKSxcbiAgICAgICAgICAgIGZpbHRlcjogZnVuY3Rpb24oZSwgdCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsID09IGUud2hpY2ggJiYgKGUud2hpY2ggPSBudWxsICE9IHQuY2hhckNvZGUgPyB0LmNoYXJDb2RlIDogdC5rZXlDb2RlKSwgXG4gICAgICAgICAgICAgICAgZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgbW91c2VIb29rczoge1xuICAgICAgICAgICAgcHJvcHM6IFwiYnV0dG9uIGJ1dHRvbnMgY2xpZW50WCBjbGllbnRZIG9mZnNldFggb2Zmc2V0WSBwYWdlWCBwYWdlWSBzY3JlZW5YIHNjcmVlblkgdG9FbGVtZW50XCIuc3BsaXQoXCIgXCIpLFxuICAgICAgICAgICAgZmlsdGVyOiBmdW5jdGlvbihlLCB0KSB7XG4gICAgICAgICAgICAgICAgdmFyIG4sIHIsIGksIHMgPSB0LmJ1dHRvbjtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbCA9PSBlLnBhZ2VYICYmIG51bGwgIT0gdC5jbGllbnRYICYmIChuID0gZS50YXJnZXQub3duZXJEb2N1bWVudCB8fCBvLCBcbiAgICAgICAgICAgICAgICByID0gbi5kb2N1bWVudEVsZW1lbnQsIGkgPSBuLmJvZHksIGUucGFnZVggPSB0LmNsaWVudFggKyAociAmJiByLnNjcm9sbExlZnQgfHwgaSAmJiBpLnNjcm9sbExlZnQgfHwgMCkgLSAociAmJiByLmNsaWVudExlZnQgfHwgaSAmJiBpLmNsaWVudExlZnQgfHwgMCksIFxuICAgICAgICAgICAgICAgIGUucGFnZVkgPSB0LmNsaWVudFkgKyAociAmJiByLnNjcm9sbFRvcCB8fCBpICYmIGkuc2Nyb2xsVG9wIHx8IDApIC0gKHIgJiYgci5jbGllbnRUb3AgfHwgaSAmJiBpLmNsaWVudFRvcCB8fCAwKSksIFxuICAgICAgICAgICAgICAgIGUud2hpY2ggfHwgcyA9PT0gdW5kZWZpbmVkIHx8IChlLndoaWNoID0gMSAmIHMgPyAxIDogMiAmIHMgPyAzIDogNCAmIHMgPyAyIDogMCksIFxuICAgICAgICAgICAgICAgIGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGZpeDogZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgaWYgKGVbeC5leHBhbmRvXSkgcmV0dXJuIGU7XG4gICAgICAgICAgICB2YXIgdCwgbiwgciwgaSA9IGUudHlwZSwgcyA9IGUsIGEgPSB0aGlzLmZpeEhvb2tzW2ldO1xuICAgICAgICAgICAgYSB8fCAodGhpcy5maXhIb29rc1tpXSA9IGEgPSB6LnRlc3QoaSkgPyB0aGlzLm1vdXNlSG9va3MgOiBJLnRlc3QoaSkgPyB0aGlzLmtleUhvb2tzIDoge30pLCBcbiAgICAgICAgICAgIHIgPSBhLnByb3BzID8gdGhpcy5wcm9wcy5jb25jYXQoYS5wcm9wcykgOiB0aGlzLnByb3BzLCBlID0gbmV3IHguRXZlbnQocyksIHQgPSByLmxlbmd0aDtcbiAgICAgICAgICAgIHdoaWxlICh0LS0pIG4gPSByW3RdLCBlW25dID0gc1tuXTtcbiAgICAgICAgICAgIHJldHVybiBlLnRhcmdldCB8fCAoZS50YXJnZXQgPSBvKSwgMyA9PT0gZS50YXJnZXQubm9kZVR5cGUgJiYgKGUudGFyZ2V0ID0gZS50YXJnZXQucGFyZW50Tm9kZSksIFxuICAgICAgICAgICAgYS5maWx0ZXIgPyBhLmZpbHRlcihlLCBzKSA6IGU7XG4gICAgICAgIH0sXG4gICAgICAgIHNwZWNpYWw6IHtcbiAgICAgICAgICAgIGxvYWQ6IHtcbiAgICAgICAgICAgICAgICBub0J1YmJsZTogITBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmb2N1czoge1xuICAgICAgICAgICAgICAgIHRyaWdnZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcyAhPT0gVigpICYmIHRoaXMuZm9jdXMgPyAodGhpcy5mb2N1cygpLCAhMSkgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBkZWxlZ2F0ZVR5cGU6IFwiZm9jdXNpblwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYmx1cjoge1xuICAgICAgICAgICAgICAgIHRyaWdnZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcyA9PT0gVigpICYmIHRoaXMuYmx1ciA/ICh0aGlzLmJsdXIoKSwgITEpIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZGVsZWdhdGVUeXBlOiBcImZvY3Vzb3V0XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjbGljazoge1xuICAgICAgICAgICAgICAgIHRyaWdnZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJjaGVja2JveFwiID09PSB0aGlzLnR5cGUgJiYgdGhpcy5jbGljayAmJiB4Lm5vZGVOYW1lKHRoaXMsIFwiaW5wdXRcIikgPyAodGhpcy5jbGljaygpLCBcbiAgICAgICAgICAgICAgICAgICAgITEpIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgX2RlZmF1bHQ6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHgubm9kZU5hbWUoZS50YXJnZXQsIFwiYVwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYmVmb3JldW5sb2FkOiB7XG4gICAgICAgICAgICAgICAgcG9zdERpc3BhdGNoOiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgIGUucmVzdWx0ICE9PSB1bmRlZmluZWQgJiYgKGUub3JpZ2luYWxFdmVudC5yZXR1cm5WYWx1ZSA9IGUucmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHNpbXVsYXRlOiBmdW5jdGlvbihlLCB0LCBuLCByKSB7XG4gICAgICAgICAgICB2YXIgaSA9IHguZXh0ZW5kKG5ldyB4LkV2ZW50KCksIG4sIHtcbiAgICAgICAgICAgICAgICB0eXBlOiBlLFxuICAgICAgICAgICAgICAgIGlzU2ltdWxhdGVkOiAhMCxcbiAgICAgICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiB7fVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByID8geC5ldmVudC50cmlnZ2VyKGksIG51bGwsIHQpIDogeC5ldmVudC5kaXNwYXRjaC5jYWxsKHQsIGkpLCBpLmlzRGVmYXVsdFByZXZlbnRlZCgpICYmIG4ucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH0sIHgucmVtb3ZlRXZlbnQgPSBmdW5jdGlvbihlLCB0LCBuKSB7XG4gICAgICAgIGUucmVtb3ZlRXZlbnRMaXN0ZW5lciAmJiBlLnJlbW92ZUV2ZW50TGlzdGVuZXIodCwgbiwgITEpO1xuICAgIH0sIHguRXZlbnQgPSBmdW5jdGlvbihlLCB0KSB7XG4gICAgICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgeC5FdmVudCA/IChlICYmIGUudHlwZSA/ICh0aGlzLm9yaWdpbmFsRXZlbnQgPSBlLCB0aGlzLnR5cGUgPSBlLnR5cGUsIFxuICAgICAgICB0aGlzLmlzRGVmYXVsdFByZXZlbnRlZCA9IGUuZGVmYXVsdFByZXZlbnRlZCB8fCBlLmdldFByZXZlbnREZWZhdWx0ICYmIGUuZ2V0UHJldmVudERlZmF1bHQoKSA/IFUgOiBZKSA6IHRoaXMudHlwZSA9IGUsIFxuICAgICAgICB0ICYmIHguZXh0ZW5kKHRoaXMsIHQpLCB0aGlzLnRpbWVTdGFtcCA9IGUgJiYgZS50aW1lU3RhbXAgfHwgeC5ub3coKSwgdGhpc1t4LmV4cGFuZG9dID0gITAsIFxuICAgICAgICB1bmRlZmluZWQpIDogbmV3IHguRXZlbnQoZSwgdCk7XG4gICAgfSwgeC5FdmVudC5wcm90b3R5cGUgPSB7XG4gICAgICAgIGlzRGVmYXVsdFByZXZlbnRlZDogWSxcbiAgICAgICAgaXNQcm9wYWdhdGlvblN0b3BwZWQ6IFksXG4gICAgICAgIGlzSW1tZWRpYXRlUHJvcGFnYXRpb25TdG9wcGVkOiBZLFxuICAgICAgICBwcmV2ZW50RGVmYXVsdDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgZSA9IHRoaXMub3JpZ2luYWxFdmVudDtcbiAgICAgICAgICAgIHRoaXMuaXNEZWZhdWx0UHJldmVudGVkID0gVSwgZSAmJiBlLnByZXZlbnREZWZhdWx0ICYmIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSxcbiAgICAgICAgc3RvcFByb3BhZ2F0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBlID0gdGhpcy5vcmlnaW5hbEV2ZW50O1xuICAgICAgICAgICAgdGhpcy5pc1Byb3BhZ2F0aW9uU3RvcHBlZCA9IFUsIGUgJiYgZS5zdG9wUHJvcGFnYXRpb24gJiYgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfSxcbiAgICAgICAgc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRoaXMuaXNJbW1lZGlhdGVQcm9wYWdhdGlvblN0b3BwZWQgPSBVLCB0aGlzLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9XG4gICAgfSwgeC5lYWNoKHtcbiAgICAgICAgbW91c2VlbnRlcjogXCJtb3VzZW92ZXJcIixcbiAgICAgICAgbW91c2VsZWF2ZTogXCJtb3VzZW91dFwiXG4gICAgfSwgZnVuY3Rpb24oZSwgdCkge1xuICAgICAgICB4LmV2ZW50LnNwZWNpYWxbZV0gPSB7XG4gICAgICAgICAgICBkZWxlZ2F0ZVR5cGU6IHQsXG4gICAgICAgICAgICBiaW5kVHlwZTogdCxcbiAgICAgICAgICAgIGhhbmRsZTogZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgIHZhciBuLCByID0gdGhpcywgaSA9IGUucmVsYXRlZFRhcmdldCwgbyA9IGUuaGFuZGxlT2JqO1xuICAgICAgICAgICAgICAgIHJldHVybiAoIWkgfHwgaSAhPT0gciAmJiAheC5jb250YWlucyhyLCBpKSkgJiYgKGUudHlwZSA9IG8ub3JpZ1R5cGUsIG4gPSBvLmhhbmRsZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSwgXG4gICAgICAgICAgICAgICAgZS50eXBlID0gdCksIG47XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSksIHguc3VwcG9ydC5mb2N1c2luQnViYmxlcyB8fCB4LmVhY2goe1xuICAgICAgICBmb2N1czogXCJmb2N1c2luXCIsXG4gICAgICAgIGJsdXI6IFwiZm9jdXNvdXRcIlxuICAgIH0sIGZ1bmN0aW9uKGUsIHQpIHtcbiAgICAgICAgdmFyIG4gPSAwLCByID0gZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgeC5ldmVudC5zaW11bGF0ZSh0LCBlLnRhcmdldCwgeC5ldmVudC5maXgoZSksICEwKTtcbiAgICAgICAgfTtcbiAgICAgICAgeC5ldmVudC5zcGVjaWFsW3RdID0ge1xuICAgICAgICAgICAgc2V0dXA6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIDAgPT09IG4rKyAmJiBvLmFkZEV2ZW50TGlzdGVuZXIoZSwgciwgITApO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRlYXJkb3duOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAwID09PSAtLW4gJiYgby5yZW1vdmVFdmVudExpc3RlbmVyKGUsIHIsICEwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9KSwgeC5mbi5leHRlbmQoe1xuICAgICAgICBvbjogZnVuY3Rpb24oZSwgdCwgbiwgciwgaSkge1xuICAgICAgICAgICAgdmFyIG8sIHM7XG4gICAgICAgICAgICBpZiAoXCJvYmplY3RcIiA9PSB0eXBlb2YgZSkge1xuICAgICAgICAgICAgICAgIFwic3RyaW5nXCIgIT0gdHlwZW9mIHQgJiYgKG4gPSBuIHx8IHQsIHQgPSB1bmRlZmluZWQpO1xuICAgICAgICAgICAgICAgIGZvciAocyBpbiBlKSB0aGlzLm9uKHMsIHQsIG4sIGVbc10sIGkpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG51bGwgPT0gbiAmJiBudWxsID09IHIgPyAociA9IHQsIG4gPSB0ID0gdW5kZWZpbmVkKSA6IG51bGwgPT0gciAmJiAoXCJzdHJpbmdcIiA9PSB0eXBlb2YgdCA/IChyID0gbiwgXG4gICAgICAgICAgICBuID0gdW5kZWZpbmVkKSA6IChyID0gbiwgbiA9IHQsIHQgPSB1bmRlZmluZWQpKSwgciA9PT0gITEpIHIgPSBZOyBlbHNlIGlmICghcikgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICByZXR1cm4gMSA9PT0gaSAmJiAobyA9IHIsIHIgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHgoKS5vZmYoZSksIG8uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgIH0sIHIuZ3VpZCA9IG8uZ3VpZCB8fCAoby5ndWlkID0geC5ndWlkKyspKSwgdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHguZXZlbnQuYWRkKHRoaXMsIGUsIHIsIG4sIHQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uZTogZnVuY3Rpb24oZSwgdCwgbiwgcikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMub24oZSwgdCwgbiwgciwgMSk7XG4gICAgICAgIH0sXG4gICAgICAgIG9mZjogZnVuY3Rpb24oZSwgdCwgbikge1xuICAgICAgICAgICAgdmFyIHIsIGk7XG4gICAgICAgICAgICBpZiAoZSAmJiBlLnByZXZlbnREZWZhdWx0ICYmIGUuaGFuZGxlT2JqKSByZXR1cm4gciA9IGUuaGFuZGxlT2JqLCB4KGUuZGVsZWdhdGVUYXJnZXQpLm9mZihyLm5hbWVzcGFjZSA/IHIub3JpZ1R5cGUgKyBcIi5cIiArIHIubmFtZXNwYWNlIDogci5vcmlnVHlwZSwgci5zZWxlY3Rvciwgci5oYW5kbGVyKSwgXG4gICAgICAgICAgICB0aGlzO1xuICAgICAgICAgICAgaWYgKFwib2JqZWN0XCIgPT0gdHlwZW9mIGUpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGkgaW4gZSkgdGhpcy5vZmYoaSwgdCwgZVtpXSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gKHQgPT09ICExIHx8IFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgdCkgJiYgKG4gPSB0LCB0ID0gdW5kZWZpbmVkKSwgbiA9PT0gITEgJiYgKG4gPSBZKSwgXG4gICAgICAgICAgICB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgeC5ldmVudC5yZW1vdmUodGhpcywgZSwgbiwgdCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgdHJpZ2dlcjogZnVuY3Rpb24oZSwgdCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB4LmV2ZW50LnRyaWdnZXIoZSwgdCwgdGhpcyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgdHJpZ2dlckhhbmRsZXI6IGZ1bmN0aW9uKGUsIHQpIHtcbiAgICAgICAgICAgIHZhciBuID0gdGhpc1swXTtcbiAgICAgICAgICAgIHJldHVybiBuID8geC5ldmVudC50cmlnZ2VyKGUsIHQsIG4sICEwKSA6IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHZhciBHID0gL14uW146I1xcW1xcLixdKiQvLCBKID0gL14oPzpwYXJlbnRzfHByZXYoPzpVbnRpbHxBbGwpKS8sIFEgPSB4LmV4cHIubWF0Y2gubmVlZHNDb250ZXh0LCBLID0ge1xuICAgICAgICBjaGlsZHJlbjogITAsXG4gICAgICAgIGNvbnRlbnRzOiAhMCxcbiAgICAgICAgbmV4dDogITAsXG4gICAgICAgIHByZXY6ICEwXG4gICAgfTtcbiAgICB4LmZuLmV4dGVuZCh7XG4gICAgICAgIGZpbmQ6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIHZhciB0LCBuID0gW10sIHIgPSB0aGlzLCBpID0gci5sZW5ndGg7XG4gICAgICAgICAgICBpZiAoXCJzdHJpbmdcIiAhPSB0eXBlb2YgZSkgcmV0dXJuIHRoaXMucHVzaFN0YWNrKHgoZSkuZmlsdGVyKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGZvciAodCA9IDA7IGkgPiB0OyB0KyspIGlmICh4LmNvbnRhaW5zKHJbdF0sIHRoaXMpKSByZXR1cm4gITA7XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICBmb3IgKHQgPSAwOyBpID4gdDsgdCsrKSB4LmZpbmQoZSwgclt0XSwgbik7XG4gICAgICAgICAgICByZXR1cm4gbiA9IHRoaXMucHVzaFN0YWNrKGkgPiAxID8geC51bmlxdWUobikgOiBuKSwgbi5zZWxlY3RvciA9IHRoaXMuc2VsZWN0b3IgPyB0aGlzLnNlbGVjdG9yICsgXCIgXCIgKyBlIDogZSwgXG4gICAgICAgICAgICBuO1xuICAgICAgICB9LFxuICAgICAgICBoYXM6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIHZhciB0ID0geChlLCB0aGlzKSwgbiA9IHQubGVuZ3RoO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmlsdGVyKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciBlID0gMDtcbiAgICAgICAgICAgICAgICBmb3IgKDtuID4gZTsgZSsrKSBpZiAoeC5jb250YWlucyh0aGlzLCB0W2VdKSkgcmV0dXJuICEwO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIG5vdDogZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHVzaFN0YWNrKGV0KHRoaXMsIGUgfHwgW10sICEwKSk7XG4gICAgICAgIH0sXG4gICAgICAgIGZpbHRlcjogZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHVzaFN0YWNrKGV0KHRoaXMsIGUgfHwgW10sICExKSk7XG4gICAgICAgIH0sXG4gICAgICAgIGlzOiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICByZXR1cm4gISFldCh0aGlzLCBcInN0cmluZ1wiID09IHR5cGVvZiBlICYmIFEudGVzdChlKSA/IHgoZSkgOiBlIHx8IFtdLCAhMSkubGVuZ3RoO1xuICAgICAgICB9LFxuICAgICAgICBjbG9zZXN0OiBmdW5jdGlvbihlLCB0KSB7XG4gICAgICAgICAgICB2YXIgbiwgciA9IDAsIGkgPSB0aGlzLmxlbmd0aCwgbyA9IFtdLCBzID0gUS50ZXN0KGUpIHx8IFwic3RyaW5nXCIgIT0gdHlwZW9mIGUgPyB4KGUsIHQgfHwgdGhpcy5jb250ZXh0KSA6IDA7XG4gICAgICAgICAgICBmb3IgKDtpID4gcjsgcisrKSBmb3IgKG4gPSB0aGlzW3JdOyBuICYmIG4gIT09IHQ7IG4gPSBuLnBhcmVudE5vZGUpIGlmICgxMSA+IG4ubm9kZVR5cGUgJiYgKHMgPyBzLmluZGV4KG4pID4gLTEgOiAxID09PSBuLm5vZGVUeXBlICYmIHguZmluZC5tYXRjaGVzU2VsZWN0b3IobiwgZSkpKSB7XG4gICAgICAgICAgICAgICAgbiA9IG8ucHVzaChuKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLnB1c2hTdGFjayhvLmxlbmd0aCA+IDEgPyB4LnVuaXF1ZShvKSA6IG8pO1xuICAgICAgICB9LFxuICAgICAgICBpbmRleDogZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgcmV0dXJuIGUgPyBcInN0cmluZ1wiID09IHR5cGVvZiBlID8gZy5jYWxsKHgoZSksIHRoaXNbMF0pIDogZy5jYWxsKHRoaXMsIGUuanF1ZXJ5ID8gZVswXSA6IGUpIDogdGhpc1swXSAmJiB0aGlzWzBdLnBhcmVudE5vZGUgPyB0aGlzLmZpcnN0KCkucHJldkFsbCgpLmxlbmd0aCA6IC0xO1xuICAgICAgICB9LFxuICAgICAgICBhZGQ6IGZ1bmN0aW9uKGUsIHQpIHtcbiAgICAgICAgICAgIHZhciBuID0gXCJzdHJpbmdcIiA9PSB0eXBlb2YgZSA/IHgoZSwgdCkgOiB4Lm1ha2VBcnJheShlICYmIGUubm9kZVR5cGUgPyBbIGUgXSA6IGUpLCByID0geC5tZXJnZSh0aGlzLmdldCgpLCBuKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnB1c2hTdGFjayh4LnVuaXF1ZShyKSk7XG4gICAgICAgIH0sXG4gICAgICAgIGFkZEJhY2s6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFkZChudWxsID09IGUgPyB0aGlzLnByZXZPYmplY3QgOiB0aGlzLnByZXZPYmplY3QuZmlsdGVyKGUpKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGZ1bmN0aW9uIFooZSwgdCkge1xuICAgICAgICB3aGlsZSAoKGUgPSBlW3RdKSAmJiAxICE9PSBlLm5vZGVUeXBlKSA7XG4gICAgICAgIHJldHVybiBlO1xuICAgIH1cbiAgICB4LmVhY2goe1xuICAgICAgICBwYXJlbnQ6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIHZhciB0ID0gZS5wYXJlbnROb2RlO1xuICAgICAgICAgICAgcmV0dXJuIHQgJiYgMTEgIT09IHQubm9kZVR5cGUgPyB0IDogbnVsbDtcbiAgICAgICAgfSxcbiAgICAgICAgcGFyZW50czogZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgcmV0dXJuIHguZGlyKGUsIFwicGFyZW50Tm9kZVwiKTtcbiAgICAgICAgfSxcbiAgICAgICAgcGFyZW50c1VudGlsOiBmdW5jdGlvbihlLCB0LCBuKSB7XG4gICAgICAgICAgICByZXR1cm4geC5kaXIoZSwgXCJwYXJlbnROb2RlXCIsIG4pO1xuICAgICAgICB9LFxuICAgICAgICBuZXh0OiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICByZXR1cm4gWihlLCBcIm5leHRTaWJsaW5nXCIpO1xuICAgICAgICB9LFxuICAgICAgICBwcmV2OiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICByZXR1cm4gWihlLCBcInByZXZpb3VzU2libGluZ1wiKTtcbiAgICAgICAgfSxcbiAgICAgICAgbmV4dEFsbDogZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgcmV0dXJuIHguZGlyKGUsIFwibmV4dFNpYmxpbmdcIik7XG4gICAgICAgIH0sXG4gICAgICAgIHByZXZBbGw6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIHJldHVybiB4LmRpcihlLCBcInByZXZpb3VzU2libGluZ1wiKTtcbiAgICAgICAgfSxcbiAgICAgICAgbmV4dFVudGlsOiBmdW5jdGlvbihlLCB0LCBuKSB7XG4gICAgICAgICAgICByZXR1cm4geC5kaXIoZSwgXCJuZXh0U2libGluZ1wiLCBuKTtcbiAgICAgICAgfSxcbiAgICAgICAgcHJldlVudGlsOiBmdW5jdGlvbihlLCB0LCBuKSB7XG4gICAgICAgICAgICByZXR1cm4geC5kaXIoZSwgXCJwcmV2aW91c1NpYmxpbmdcIiwgbik7XG4gICAgICAgIH0sXG4gICAgICAgIHNpYmxpbmdzOiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICByZXR1cm4geC5zaWJsaW5nKChlLnBhcmVudE5vZGUgfHwge30pLmZpcnN0Q2hpbGQsIGUpO1xuICAgICAgICB9LFxuICAgICAgICBjaGlsZHJlbjogZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgcmV0dXJuIHguc2libGluZyhlLmZpcnN0Q2hpbGQpO1xuICAgICAgICB9LFxuICAgICAgICBjb250ZW50czogZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgcmV0dXJuIGUuY29udGVudERvY3VtZW50IHx8IHgubWVyZ2UoW10sIGUuY2hpbGROb2Rlcyk7XG4gICAgICAgIH1cbiAgICB9LCBmdW5jdGlvbihlLCB0KSB7XG4gICAgICAgIHguZm5bZV0gPSBmdW5jdGlvbihuLCByKSB7XG4gICAgICAgICAgICB2YXIgaSA9IHgubWFwKHRoaXMsIHQsIG4pO1xuICAgICAgICAgICAgcmV0dXJuIFwiVW50aWxcIiAhPT0gZS5zbGljZSgtNSkgJiYgKHIgPSBuKSwgciAmJiBcInN0cmluZ1wiID09IHR5cGVvZiByICYmIChpID0geC5maWx0ZXIociwgaSkpLCBcbiAgICAgICAgICAgIHRoaXMubGVuZ3RoID4gMSAmJiAoS1tlXSB8fCB4LnVuaXF1ZShpKSwgSi50ZXN0KGUpICYmIGkucmV2ZXJzZSgpKSwgdGhpcy5wdXNoU3RhY2soaSk7XG4gICAgICAgIH07XG4gICAgfSksIHguZXh0ZW5kKHtcbiAgICAgICAgZmlsdGVyOiBmdW5jdGlvbihlLCB0LCBuKSB7XG4gICAgICAgICAgICB2YXIgciA9IHRbMF07XG4gICAgICAgICAgICByZXR1cm4gbiAmJiAoZSA9IFwiOm5vdChcIiArIGUgKyBcIilcIiksIDEgPT09IHQubGVuZ3RoICYmIDEgPT09IHIubm9kZVR5cGUgPyB4LmZpbmQubWF0Y2hlc1NlbGVjdG9yKHIsIGUpID8gWyByIF0gOiBbXSA6IHguZmluZC5tYXRjaGVzKGUsIHguZ3JlcCh0LCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDEgPT09IGUubm9kZVR5cGU7XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH0sXG4gICAgICAgIGRpcjogZnVuY3Rpb24oZSwgdCwgbikge1xuICAgICAgICAgICAgdmFyIHIgPSBbXSwgaSA9IG4gIT09IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIHdoaWxlICgoZSA9IGVbdF0pICYmIDkgIT09IGUubm9kZVR5cGUpIGlmICgxID09PSBlLm5vZGVUeXBlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGkgJiYgeChlKS5pcyhuKSkgYnJlYWs7XG4gICAgICAgICAgICAgICAgci5wdXNoKGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHI7XG4gICAgICAgIH0sXG4gICAgICAgIHNpYmxpbmc6IGZ1bmN0aW9uKGUsIHQpIHtcbiAgICAgICAgICAgIHZhciBuID0gW107XG4gICAgICAgICAgICBmb3IgKDtlOyBlID0gZS5uZXh0U2libGluZykgMSA9PT0gZS5ub2RlVHlwZSAmJiBlICE9PSB0ICYmIG4ucHVzaChlKTtcbiAgICAgICAgICAgIHJldHVybiBuO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgZnVuY3Rpb24gZXQoZSwgdCwgbikge1xuICAgICAgICBpZiAoeC5pc0Z1bmN0aW9uKHQpKSByZXR1cm4geC5ncmVwKGUsIGZ1bmN0aW9uKGUsIHIpIHtcbiAgICAgICAgICAgIHJldHVybiAhIXQuY2FsbChlLCByLCBlKSAhPT0gbjtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICh0Lm5vZGVUeXBlKSByZXR1cm4geC5ncmVwKGUsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIHJldHVybiBlID09PSB0ICE9PSBuO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKFwic3RyaW5nXCIgPT0gdHlwZW9mIHQpIHtcbiAgICAgICAgICAgIGlmIChHLnRlc3QodCkpIHJldHVybiB4LmZpbHRlcih0LCBlLCBuKTtcbiAgICAgICAgICAgIHQgPSB4LmZpbHRlcih0LCBlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geC5ncmVwKGUsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIHJldHVybiBnLmNhbGwodCwgZSkgPj0gMCAhPT0gbjtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHZhciB0dCA9IC88KD8hYXJlYXxicnxjb2x8ZW1iZWR8aHJ8aW1nfGlucHV0fGxpbmt8bWV0YXxwYXJhbSkoKFtcXHc6XSspW14+XSopXFwvPi9naSwgbnQgPSAvPChbXFx3Ol0rKS8sIHJ0ID0gLzx8JiM/XFx3KzsvLCBpdCA9IC88KD86c2NyaXB0fHN0eWxlfGxpbmspL2ksIG90ID0gL14oPzpjaGVja2JveHxyYWRpbykkL2ksIHN0ID0gL2NoZWNrZWRcXHMqKD86W149XXw9XFxzKi5jaGVja2VkLikvaSwgYXQgPSAvXiR8XFwvKD86amF2YXxlY21hKXNjcmlwdC9pLCB1dCA9IC9edHJ1ZVxcLyguKikvLCBsdCA9IC9eXFxzKjwhKD86XFxbQ0RBVEFcXFt8LS0pfCg/OlxcXVxcXXwtLSk+XFxzKiQvZywgY3QgPSB7XG4gICAgICAgIG9wdGlvbjogWyAxLCBcIjxzZWxlY3QgbXVsdGlwbGU9J211bHRpcGxlJz5cIiwgXCI8L3NlbGVjdD5cIiBdLFxuICAgICAgICB0aGVhZDogWyAxLCBcIjx0YWJsZT5cIiwgXCI8L3RhYmxlPlwiIF0sXG4gICAgICAgIGNvbDogWyAyLCBcIjx0YWJsZT48Y29sZ3JvdXA+XCIsIFwiPC9jb2xncm91cD48L3RhYmxlPlwiIF0sXG4gICAgICAgIHRyOiBbIDIsIFwiPHRhYmxlPjx0Ym9keT5cIiwgXCI8L3Rib2R5PjwvdGFibGU+XCIgXSxcbiAgICAgICAgdGQ6IFsgMywgXCI8dGFibGU+PHRib2R5Pjx0cj5cIiwgXCI8L3RyPjwvdGJvZHk+PC90YWJsZT5cIiBdLFxuICAgICAgICBfZGVmYXVsdDogWyAwLCBcIlwiLCBcIlwiIF1cbiAgICB9O1xuICAgIGN0Lm9wdGdyb3VwID0gY3Qub3B0aW9uLCBjdC50Ym9keSA9IGN0LnRmb290ID0gY3QuY29sZ3JvdXAgPSBjdC5jYXB0aW9uID0gY3QudGhlYWQsIFxuICAgIGN0LnRoID0gY3QudGQsIHguZm4uZXh0ZW5kKHtcbiAgICAgICAgdGV4dDogZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgcmV0dXJuIHguYWNjZXNzKHRoaXMsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZSA9PT0gdW5kZWZpbmVkID8geC50ZXh0KHRoaXMpIDogdGhpcy5lbXB0eSgpLmFwcGVuZCgodGhpc1swXSAmJiB0aGlzWzBdLm93bmVyRG9jdW1lbnQgfHwgbykuY3JlYXRlVGV4dE5vZGUoZSkpO1xuICAgICAgICAgICAgfSwgbnVsbCwgZSwgYXJndW1lbnRzLmxlbmd0aCk7XG4gICAgICAgIH0sXG4gICAgICAgIGFwcGVuZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kb21NYW5pcChhcmd1bWVudHMsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoMSA9PT0gdGhpcy5ub2RlVHlwZSB8fCAxMSA9PT0gdGhpcy5ub2RlVHlwZSB8fCA5ID09PSB0aGlzLm5vZGVUeXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0ID0gcHQodGhpcywgZSk7XG4gICAgICAgICAgICAgICAgICAgIHQuYXBwZW5kQ2hpbGQoZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIHByZXBlbmQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZG9tTWFuaXAoYXJndW1lbnRzLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgaWYgKDEgPT09IHRoaXMubm9kZVR5cGUgfHwgMTEgPT09IHRoaXMubm9kZVR5cGUgfHwgOSA9PT0gdGhpcy5ub2RlVHlwZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdCA9IHB0KHRoaXMsIGUpO1xuICAgICAgICAgICAgICAgICAgICB0Lmluc2VydEJlZm9yZShlLCB0LmZpcnN0Q2hpbGQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBiZWZvcmU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZG9tTWFuaXAoYXJndW1lbnRzLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXJlbnROb2RlICYmIHRoaXMucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoZSwgdGhpcyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgYWZ0ZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZG9tTWFuaXAoYXJndW1lbnRzLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXJlbnROb2RlICYmIHRoaXMucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoZSwgdGhpcy5uZXh0U2libGluZyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgcmVtb3ZlOiBmdW5jdGlvbihlLCB0KSB7XG4gICAgICAgICAgICB2YXIgbiwgciA9IGUgPyB4LmZpbHRlcihlLCB0aGlzKSA6IHRoaXMsIGkgPSAwO1xuICAgICAgICAgICAgZm9yICg7bnVsbCAhPSAobiA9IHJbaV0pOyBpKyspIHQgfHwgMSAhPT0gbi5ub2RlVHlwZSB8fCB4LmNsZWFuRGF0YShtdChuKSksIG4ucGFyZW50Tm9kZSAmJiAodCAmJiB4LmNvbnRhaW5zKG4ub3duZXJEb2N1bWVudCwgbikgJiYgZHQobXQobiwgXCJzY3JpcHRcIikpLCBcbiAgICAgICAgICAgIG4ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChuKSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSxcbiAgICAgICAgZW1wdHk6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGUsIHQgPSAwO1xuICAgICAgICAgICAgZm9yICg7bnVsbCAhPSAoZSA9IHRoaXNbdF0pOyB0KyspIDEgPT09IGUubm9kZVR5cGUgJiYgKHguY2xlYW5EYXRhKG10KGUsICExKSksIGUudGV4dENvbnRlbnQgPSBcIlwiKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9LFxuICAgICAgICBjbG9uZTogZnVuY3Rpb24oZSwgdCkge1xuICAgICAgICAgICAgcmV0dXJuIGUgPSBudWxsID09IGUgPyAhMSA6IGUsIHQgPSBudWxsID09IHQgPyBlIDogdCwgdGhpcy5tYXAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHguY2xvbmUodGhpcywgZSwgdCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgaHRtbDogZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgcmV0dXJuIHguYWNjZXNzKHRoaXMsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgdCA9IHRoaXNbMF0gfHwge30sIG4gPSAwLCByID0gdGhpcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgaWYgKGUgPT09IHVuZGVmaW5lZCAmJiAxID09PSB0Lm5vZGVUeXBlKSByZXR1cm4gdC5pbm5lckhUTUw7XG4gICAgICAgICAgICAgICAgaWYgKFwic3RyaW5nXCIgPT0gdHlwZW9mIGUgJiYgIWl0LnRlc3QoZSkgJiYgIWN0WyhudC5leGVjKGUpIHx8IFsgXCJcIiwgXCJcIiBdKVsxXS50b0xvd2VyQ2FzZSgpXSkge1xuICAgICAgICAgICAgICAgICAgICBlID0gZS5yZXBsYWNlKHR0LCBcIjwkMT48LyQyPlwiKTtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoO3IgPiBuOyBuKyspIHQgPSB0aGlzW25dIHx8IHt9LCAxID09PSB0Lm5vZGVUeXBlICYmICh4LmNsZWFuRGF0YShtdCh0LCAhMSkpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIHQuaW5uZXJIVE1MID0gZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoaSkge31cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdCAmJiB0aGlzLmVtcHR5KCkuYXBwZW5kKGUpO1xuICAgICAgICAgICAgfSwgbnVsbCwgZSwgYXJndW1lbnRzLmxlbmd0aCk7XG4gICAgICAgIH0sXG4gICAgICAgIHJlcGxhY2VXaXRoOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBlID0geC5tYXAodGhpcywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBbIGUubmV4dFNpYmxpbmcsIGUucGFyZW50Tm9kZSBdO1xuICAgICAgICAgICAgfSksIHQgPSAwO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZG9tTWFuaXAoYXJndW1lbnRzLCBmdW5jdGlvbihuKSB7XG4gICAgICAgICAgICAgICAgdmFyIHIgPSBlW3QrK10sIGkgPSBlW3QrK107XG4gICAgICAgICAgICAgICAgaSAmJiAociAmJiByLnBhcmVudE5vZGUgIT09IGkgJiYgKHIgPSB0aGlzLm5leHRTaWJsaW5nKSwgeCh0aGlzKS5yZW1vdmUoKSwgaS5pbnNlcnRCZWZvcmUobiwgcikpO1xuICAgICAgICAgICAgfSwgITApLCB0ID8gdGhpcyA6IHRoaXMucmVtb3ZlKCk7XG4gICAgICAgIH0sXG4gICAgICAgIGRldGFjaDogZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVtb3ZlKGUsICEwKTtcbiAgICAgICAgfSxcbiAgICAgICAgZG9tTWFuaXA6IGZ1bmN0aW9uKGUsIHQsIG4pIHtcbiAgICAgICAgICAgIGUgPSBmLmFwcGx5KFtdLCBlKTtcbiAgICAgICAgICAgIHZhciByLCBpLCBvLCBzLCBhLCB1LCBsID0gMCwgYyA9IHRoaXMubGVuZ3RoLCBwID0gdGhpcywgaCA9IGMgLSAxLCBkID0gZVswXSwgZyA9IHguaXNGdW5jdGlvbihkKTtcbiAgICAgICAgICAgIGlmIChnIHx8ICEoMSA+PSBjIHx8IFwic3RyaW5nXCIgIT0gdHlwZW9mIGQgfHwgeC5zdXBwb3J0LmNoZWNrQ2xvbmUpICYmIHN0LnRlc3QoZCkpIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24ocikge1xuICAgICAgICAgICAgICAgIHZhciBpID0gcC5lcShyKTtcbiAgICAgICAgICAgICAgICBnICYmIChlWzBdID0gZC5jYWxsKHRoaXMsIHIsIGkuaHRtbCgpKSksIGkuZG9tTWFuaXAoZSwgdCwgbik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChjICYmIChyID0geC5idWlsZEZyYWdtZW50KGUsIHRoaXNbMF0ub3duZXJEb2N1bWVudCwgITEsICFuICYmIHRoaXMpLCBpID0gci5maXJzdENoaWxkLCBcbiAgICAgICAgICAgIDEgPT09IHIuY2hpbGROb2Rlcy5sZW5ndGggJiYgKHIgPSBpKSwgaSkpIHtcbiAgICAgICAgICAgICAgICBmb3IgKG8gPSB4Lm1hcChtdChyLCBcInNjcmlwdFwiKSwgZnQpLCBzID0gby5sZW5ndGg7IGMgPiBsOyBsKyspIGEgPSByLCBsICE9PSBoICYmIChhID0geC5jbG9uZShhLCAhMCwgITApLCBcbiAgICAgICAgICAgICAgICBzICYmIHgubWVyZ2UobywgbXQoYSwgXCJzY3JpcHRcIikpKSwgdC5jYWxsKHRoaXNbbF0sIGEsIGwpO1xuICAgICAgICAgICAgICAgIGlmIChzKSBmb3IgKHUgPSBvW28ubGVuZ3RoIC0gMV0ub3duZXJEb2N1bWVudCwgeC5tYXAobywgaHQpLCBsID0gMDsgcyA+IGw7IGwrKykgYSA9IG9bbF0sIFxuICAgICAgICAgICAgICAgIGF0LnRlc3QoYS50eXBlIHx8IFwiXCIpICYmICFxLmFjY2VzcyhhLCBcImdsb2JhbEV2YWxcIikgJiYgeC5jb250YWlucyh1LCBhKSAmJiAoYS5zcmMgPyB4Ll9ldmFsVXJsKGEuc3JjKSA6IHguZ2xvYmFsRXZhbChhLnRleHRDb250ZW50LnJlcGxhY2UobHQsIFwiXCIpKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgIH0pLCB4LmVhY2goe1xuICAgICAgICBhcHBlbmRUbzogXCJhcHBlbmRcIixcbiAgICAgICAgcHJlcGVuZFRvOiBcInByZXBlbmRcIixcbiAgICAgICAgaW5zZXJ0QmVmb3JlOiBcImJlZm9yZVwiLFxuICAgICAgICBpbnNlcnRBZnRlcjogXCJhZnRlclwiLFxuICAgICAgICByZXBsYWNlQWxsOiBcInJlcGxhY2VXaXRoXCJcbiAgICB9LCBmdW5jdGlvbihlLCB0KSB7XG4gICAgICAgIHguZm5bZV0gPSBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICB2YXIgbiwgciA9IFtdLCBpID0geChlKSwgbyA9IGkubGVuZ3RoIC0gMSwgcyA9IDA7XG4gICAgICAgICAgICBmb3IgKDtvID49IHM7IHMrKykgbiA9IHMgPT09IG8gPyB0aGlzIDogdGhpcy5jbG9uZSghMCksIHgoaVtzXSlbdF0obiksIGguYXBwbHkociwgbi5nZXQoKSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wdXNoU3RhY2socik7XG4gICAgICAgIH07XG4gICAgfSksIHguZXh0ZW5kKHtcbiAgICAgICAgY2xvbmU6IGZ1bmN0aW9uKGUsIHQsIG4pIHtcbiAgICAgICAgICAgIHZhciByLCBpLCBvLCBzLCBhID0gZS5jbG9uZU5vZGUoITApLCB1ID0geC5jb250YWlucyhlLm93bmVyRG9jdW1lbnQsIGUpO1xuICAgICAgICAgICAgaWYgKCEoeC5zdXBwb3J0Lm5vQ2xvbmVDaGVja2VkIHx8IDEgIT09IGUubm9kZVR5cGUgJiYgMTEgIT09IGUubm9kZVR5cGUgfHwgeC5pc1hNTERvYyhlKSkpIGZvciAocyA9IG10KGEpLCBcbiAgICAgICAgICAgIG8gPSBtdChlKSwgciA9IDAsIGkgPSBvLmxlbmd0aDsgaSA+IHI7IHIrKykgeXQob1tyXSwgc1tyXSk7XG4gICAgICAgICAgICBpZiAodCkgaWYgKG4pIGZvciAobyA9IG8gfHwgbXQoZSksIHMgPSBzIHx8IG10KGEpLCByID0gMCwgaSA9IG8ubGVuZ3RoOyBpID4gcjsgcisrKSBndChvW3JdLCBzW3JdKTsgZWxzZSBndChlLCBhKTtcbiAgICAgICAgICAgIHJldHVybiBzID0gbXQoYSwgXCJzY3JpcHRcIiksIHMubGVuZ3RoID4gMCAmJiBkdChzLCAhdSAmJiBtdChlLCBcInNjcmlwdFwiKSksIGE7XG4gICAgICAgIH0sXG4gICAgICAgIGJ1aWxkRnJhZ21lbnQ6IGZ1bmN0aW9uKGUsIHQsIG4sIHIpIHtcbiAgICAgICAgICAgIHZhciBpLCBvLCBzLCBhLCB1LCBsLCBjID0gMCwgcCA9IGUubGVuZ3RoLCBmID0gdC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCksIGggPSBbXTtcbiAgICAgICAgICAgIGZvciAoO3AgPiBjOyBjKyspIGlmIChpID0gZVtjXSwgaSB8fCAwID09PSBpKSBpZiAoXCJvYmplY3RcIiA9PT0geC50eXBlKGkpKSB4Lm1lcmdlKGgsIGkubm9kZVR5cGUgPyBbIGkgXSA6IGkpOyBlbHNlIGlmIChydC50ZXN0KGkpKSB7XG4gICAgICAgICAgICAgICAgbyA9IG8gfHwgZi5hcHBlbmRDaGlsZCh0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpLCBzID0gKG50LmV4ZWMoaSkgfHwgWyBcIlwiLCBcIlwiIF0pWzFdLnRvTG93ZXJDYXNlKCksIFxuICAgICAgICAgICAgICAgIGEgPSBjdFtzXSB8fCBjdC5fZGVmYXVsdCwgby5pbm5lckhUTUwgPSBhWzFdICsgaS5yZXBsYWNlKHR0LCBcIjwkMT48LyQyPlwiKSArIGFbMl0sIFxuICAgICAgICAgICAgICAgIGwgPSBhWzBdO1xuICAgICAgICAgICAgICAgIHdoaWxlIChsLS0pIG8gPSBvLmxhc3RDaGlsZDtcbiAgICAgICAgICAgICAgICB4Lm1lcmdlKGgsIG8uY2hpbGROb2RlcyksIG8gPSBmLmZpcnN0Q2hpbGQsIG8udGV4dENvbnRlbnQgPSBcIlwiO1xuICAgICAgICAgICAgfSBlbHNlIGgucHVzaCh0LmNyZWF0ZVRleHROb2RlKGkpKTtcbiAgICAgICAgICAgIGYudGV4dENvbnRlbnQgPSBcIlwiLCBjID0gMDtcbiAgICAgICAgICAgIHdoaWxlIChpID0gaFtjKytdKSBpZiAoKCFyIHx8IC0xID09PSB4LmluQXJyYXkoaSwgcikpICYmICh1ID0geC5jb250YWlucyhpLm93bmVyRG9jdW1lbnQsIGkpLCBcbiAgICAgICAgICAgIG8gPSBtdChmLmFwcGVuZENoaWxkKGkpLCBcInNjcmlwdFwiKSwgdSAmJiBkdChvKSwgbikpIHtcbiAgICAgICAgICAgICAgICBsID0gMDtcbiAgICAgICAgICAgICAgICB3aGlsZSAoaSA9IG9bbCsrXSkgYXQudGVzdChpLnR5cGUgfHwgXCJcIikgJiYgbi5wdXNoKGkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGY7XG4gICAgICAgIH0sXG4gICAgICAgIGNsZWFuRGF0YTogZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgdmFyIHQsIG4sIHIsIGksIG8sIHMsIGEgPSB4LmV2ZW50LnNwZWNpYWwsIHUgPSAwO1xuICAgICAgICAgICAgZm9yICg7KG4gPSBlW3VdKSAhPT0gdW5kZWZpbmVkOyB1KyspIHtcbiAgICAgICAgICAgICAgICBpZiAoRi5hY2NlcHRzKG4pICYmIChvID0gbltxLmV4cGFuZG9dLCBvICYmICh0ID0gcS5jYWNoZVtvXSkpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyID0gT2JqZWN0LmtleXModC5ldmVudHMgfHwge30pLCByLmxlbmd0aCkgZm9yIChzID0gMDsgKGkgPSByW3NdKSAhPT0gdW5kZWZpbmVkOyBzKyspIGFbaV0gPyB4LmV2ZW50LnJlbW92ZShuLCBpKSA6IHgucmVtb3ZlRXZlbnQobiwgaSwgdC5oYW5kbGUpO1xuICAgICAgICAgICAgICAgICAgICBxLmNhY2hlW29dICYmIGRlbGV0ZSBxLmNhY2hlW29dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBkZWxldGUgTC5jYWNoZVtuW0wuZXhwYW5kb11dO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBfZXZhbFVybDogZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgcmV0dXJuIHguYWpheCh7XG4gICAgICAgICAgICAgICAgdXJsOiBlLFxuICAgICAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6IFwic2NyaXB0XCIsXG4gICAgICAgICAgICAgICAgYXN5bmM6ICExLFxuICAgICAgICAgICAgICAgIGdsb2JhbDogITEsXG4gICAgICAgICAgICAgICAgdGhyb3dzOiAhMFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBmdW5jdGlvbiBwdChlLCB0KSB7XG4gICAgICAgIHJldHVybiB4Lm5vZGVOYW1lKGUsIFwidGFibGVcIikgJiYgeC5ub2RlTmFtZSgxID09PSB0Lm5vZGVUeXBlID8gdCA6IHQuZmlyc3RDaGlsZCwgXCJ0clwiKSA/IGUuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJ0Ym9keVwiKVswXSB8fCBlLmFwcGVuZENoaWxkKGUub3duZXJEb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGJvZHlcIikpIDogZTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZnQoZSkge1xuICAgICAgICByZXR1cm4gZS50eXBlID0gKG51bGwgIT09IGUuZ2V0QXR0cmlidXRlKFwidHlwZVwiKSkgKyBcIi9cIiArIGUudHlwZSwgZTtcbiAgICB9XG4gICAgZnVuY3Rpb24gaHQoZSkge1xuICAgICAgICB2YXIgdCA9IHV0LmV4ZWMoZS50eXBlKTtcbiAgICAgICAgcmV0dXJuIHQgPyBlLnR5cGUgPSB0WzFdIDogZS5yZW1vdmVBdHRyaWJ1dGUoXCJ0eXBlXCIpLCBlO1xuICAgIH1cbiAgICBmdW5jdGlvbiBkdChlLCB0KSB7XG4gICAgICAgIHZhciBuID0gZS5sZW5ndGgsIHIgPSAwO1xuICAgICAgICBmb3IgKDtuID4gcjsgcisrKSBxLnNldChlW3JdLCBcImdsb2JhbEV2YWxcIiwgIXQgfHwgcS5nZXQodFtyXSwgXCJnbG9iYWxFdmFsXCIpKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZ3QoZSwgdCkge1xuICAgICAgICB2YXIgbiwgciwgaSwgbywgcywgYSwgdSwgbDtcbiAgICAgICAgaWYgKDEgPT09IHQubm9kZVR5cGUpIHtcbiAgICAgICAgICAgIGlmIChxLmhhc0RhdGEoZSkgJiYgKG8gPSBxLmFjY2VzcyhlKSwgcyA9IHEuc2V0KHQsIG8pLCBsID0gby5ldmVudHMpKSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHMuaGFuZGxlLCBzLmV2ZW50cyA9IHt9O1xuICAgICAgICAgICAgICAgIGZvciAoaSBpbiBsKSBmb3IgKG4gPSAwLCByID0gbFtpXS5sZW5ndGg7IHIgPiBuOyBuKyspIHguZXZlbnQuYWRkKHQsIGksIGxbaV1bbl0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgTC5oYXNEYXRhKGUpICYmIChhID0gTC5hY2Nlc3MoZSksIHUgPSB4LmV4dGVuZCh7fSwgYSksIEwuc2V0KHQsIHUpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBtdChlLCB0KSB7XG4gICAgICAgIHZhciBuID0gZS5nZXRFbGVtZW50c0J5VGFnTmFtZSA/IGUuZ2V0RWxlbWVudHNCeVRhZ05hbWUodCB8fCBcIipcIikgOiBlLnF1ZXJ5U2VsZWN0b3JBbGwgPyBlLnF1ZXJ5U2VsZWN0b3JBbGwodCB8fCBcIipcIikgOiBbXTtcbiAgICAgICAgcmV0dXJuIHQgPT09IHVuZGVmaW5lZCB8fCB0ICYmIHgubm9kZU5hbWUoZSwgdCkgPyB4Lm1lcmdlKFsgZSBdLCBuKSA6IG47XG4gICAgfVxuICAgIGZ1bmN0aW9uIHl0KGUsIHQpIHtcbiAgICAgICAgdmFyIG4gPSB0Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIFwiaW5wdXRcIiA9PT0gbiAmJiBvdC50ZXN0KGUudHlwZSkgPyB0LmNoZWNrZWQgPSBlLmNoZWNrZWQgOiAoXCJpbnB1dFwiID09PSBuIHx8IFwidGV4dGFyZWFcIiA9PT0gbikgJiYgKHQuZGVmYXVsdFZhbHVlID0gZS5kZWZhdWx0VmFsdWUpO1xuICAgIH1cbiAgICB4LmZuLmV4dGVuZCh7XG4gICAgICAgIHdyYXBBbGw6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIHZhciB0O1xuICAgICAgICAgICAgcmV0dXJuIHguaXNGdW5jdGlvbihlKSA/IHRoaXMuZWFjaChmdW5jdGlvbih0KSB7XG4gICAgICAgICAgICAgICAgeCh0aGlzKS53cmFwQWxsKGUuY2FsbCh0aGlzLCB0KSk7XG4gICAgICAgICAgICB9KSA6ICh0aGlzWzBdICYmICh0ID0geChlLCB0aGlzWzBdLm93bmVyRG9jdW1lbnQpLmVxKDApLmNsb25lKCEwKSwgdGhpc1swXS5wYXJlbnROb2RlICYmIHQuaW5zZXJ0QmVmb3JlKHRoaXNbMF0pLCBcbiAgICAgICAgICAgIHQubWFwKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciBlID0gdGhpcztcbiAgICAgICAgICAgICAgICB3aGlsZSAoZS5maXJzdEVsZW1lbnRDaGlsZCkgZSA9IGUuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGU7XG4gICAgICAgICAgICB9KS5hcHBlbmQodGhpcykpLCB0aGlzKTtcbiAgICAgICAgfSxcbiAgICAgICAgd3JhcElubmVyOiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICByZXR1cm4geC5pc0Z1bmN0aW9uKGUpID8gdGhpcy5lYWNoKGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgICAgICAgICB4KHRoaXMpLndyYXBJbm5lcihlLmNhbGwodGhpcywgdCkpO1xuICAgICAgICAgICAgfSkgOiB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIHQgPSB4KHRoaXMpLCBuID0gdC5jb250ZW50cygpO1xuICAgICAgICAgICAgICAgIG4ubGVuZ3RoID8gbi53cmFwQWxsKGUpIDogdC5hcHBlbmQoZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgd3JhcDogZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgdmFyIHQgPSB4LmlzRnVuY3Rpb24oZSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKG4pIHtcbiAgICAgICAgICAgICAgICB4KHRoaXMpLndyYXBBbGwodCA/IGUuY2FsbCh0aGlzLCBuKSA6IGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIHVud3JhcDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnQoKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHgubm9kZU5hbWUodGhpcywgXCJib2R5XCIpIHx8IHgodGhpcykucmVwbGFjZVdpdGgodGhpcy5jaGlsZE5vZGVzKTtcbiAgICAgICAgICAgIH0pLmVuZCgpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgdmFyIHZ0LCB4dCwgYnQgPSAvXihub25lfHRhYmxlKD8hLWNbZWFdKS4rKS8sIHd0ID0gL15tYXJnaW4vLCBUdCA9IFJlZ0V4cChcIl4oXCIgKyBiICsgXCIpKC4qKSRcIiwgXCJpXCIpLCBDdCA9IFJlZ0V4cChcIl4oXCIgKyBiICsgXCIpKD8hcHgpW2EteiVdKyRcIiwgXCJpXCIpLCBrdCA9IFJlZ0V4cChcIl4oWystXSk9KFwiICsgYiArIFwiKVwiLCBcImlcIiksIE50ID0ge1xuICAgICAgICBCT0RZOiBcImJsb2NrXCJcbiAgICB9LCBFdCA9IHtcbiAgICAgICAgcG9zaXRpb246IFwiYWJzb2x1dGVcIixcbiAgICAgICAgdmlzaWJpbGl0eTogXCJoaWRkZW5cIixcbiAgICAgICAgZGlzcGxheTogXCJibG9ja1wiXG4gICAgfSwgU3QgPSB7XG4gICAgICAgIGxldHRlclNwYWNpbmc6IDAsXG4gICAgICAgIGZvbnRXZWlnaHQ6IDQwMFxuICAgIH0sIGp0ID0gWyBcIlRvcFwiLCBcIlJpZ2h0XCIsIFwiQm90dG9tXCIsIFwiTGVmdFwiIF0sIER0ID0gWyBcIldlYmtpdFwiLCBcIk9cIiwgXCJNb3pcIiwgXCJtc1wiIF07XG4gICAgZnVuY3Rpb24gQXQoZSwgdCkge1xuICAgICAgICBpZiAodCBpbiBlKSByZXR1cm4gdDtcbiAgICAgICAgdmFyIG4gPSB0LmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgdC5zbGljZSgxKSwgciA9IHQsIGkgPSBEdC5sZW5ndGg7XG4gICAgICAgIHdoaWxlIChpLS0pIGlmICh0ID0gRHRbaV0gKyBuLCB0IGluIGUpIHJldHVybiB0O1xuICAgICAgICByZXR1cm4gcjtcbiAgICB9XG4gICAgZnVuY3Rpb24gTHQoZSwgdCkge1xuICAgICAgICByZXR1cm4gZSA9IHQgfHwgZSwgXCJub25lXCIgPT09IHguY3NzKGUsIFwiZGlzcGxheVwiKSB8fCAheC5jb250YWlucyhlLm93bmVyRG9jdW1lbnQsIGUpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBxdCh0KSB7XG4gICAgICAgIHJldHVybiBlLmdldENvbXB1dGVkU3R5bGUodCwgbnVsbCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIEh0KGUsIHQpIHtcbiAgICAgICAgdmFyIG4sIHIsIGksIG8gPSBbXSwgcyA9IDAsIGEgPSBlLmxlbmd0aDtcbiAgICAgICAgZm9yICg7YSA+IHM7IHMrKykgciA9IGVbc10sIHIuc3R5bGUgJiYgKG9bc10gPSBxLmdldChyLCBcIm9sZGRpc3BsYXlcIiksIG4gPSByLnN0eWxlLmRpc3BsYXksIFxuICAgICAgICB0ID8gKG9bc10gfHwgXCJub25lXCIgIT09IG4gfHwgKHIuc3R5bGUuZGlzcGxheSA9IFwiXCIpLCBcIlwiID09PSByLnN0eWxlLmRpc3BsYXkgJiYgTHQocikgJiYgKG9bc10gPSBxLmFjY2VzcyhyLCBcIm9sZGRpc3BsYXlcIiwgUnQoci5ub2RlTmFtZSkpKSkgOiBvW3NdIHx8IChpID0gTHQociksIFxuICAgICAgICAobiAmJiBcIm5vbmVcIiAhPT0gbiB8fCAhaSkgJiYgcS5zZXQociwgXCJvbGRkaXNwbGF5XCIsIGkgPyBuIDogeC5jc3MociwgXCJkaXNwbGF5XCIpKSkpO1xuICAgICAgICBmb3IgKHMgPSAwOyBhID4gczsgcysrKSByID0gZVtzXSwgci5zdHlsZSAmJiAodCAmJiBcIm5vbmVcIiAhPT0gci5zdHlsZS5kaXNwbGF5ICYmIFwiXCIgIT09IHIuc3R5bGUuZGlzcGxheSB8fCAoci5zdHlsZS5kaXNwbGF5ID0gdCA/IG9bc10gfHwgXCJcIiA6IFwibm9uZVwiKSk7XG4gICAgICAgIHJldHVybiBlO1xuICAgIH1cbiAgICB4LmZuLmV4dGVuZCh7XG4gICAgICAgIGNzczogZnVuY3Rpb24oZSwgdCkge1xuICAgICAgICAgICAgcmV0dXJuIHguYWNjZXNzKHRoaXMsIGZ1bmN0aW9uKGUsIHQsIG4pIHtcbiAgICAgICAgICAgICAgICB2YXIgciwgaSwgbyA9IHt9LCBzID0gMDtcbiAgICAgICAgICAgICAgICBpZiAoeC5pc0FycmF5KHQpKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAociA9IHF0KGUpLCBpID0gdC5sZW5ndGg7IGkgPiBzOyBzKyspIG9bdFtzXV0gPSB4LmNzcyhlLCB0W3NdLCAhMSwgcik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gbiAhPT0gdW5kZWZpbmVkID8geC5zdHlsZShlLCB0LCBuKSA6IHguY3NzKGUsIHQpO1xuICAgICAgICAgICAgfSwgZSwgdCwgYXJndW1lbnRzLmxlbmd0aCA+IDEpO1xuICAgICAgICB9LFxuICAgICAgICBzaG93OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBIdCh0aGlzLCAhMCk7XG4gICAgICAgIH0sXG4gICAgICAgIGhpZGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIEh0KHRoaXMpO1xuICAgICAgICB9LFxuICAgICAgICB0b2dnbGU6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIHJldHVybiBcImJvb2xlYW5cIiA9PSB0eXBlb2YgZSA/IGUgPyB0aGlzLnNob3coKSA6IHRoaXMuaGlkZSgpIDogdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIEx0KHRoaXMpID8geCh0aGlzKS5zaG93KCkgOiB4KHRoaXMpLmhpZGUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSksIHguZXh0ZW5kKHtcbiAgICAgICAgY3NzSG9va3M6IHtcbiAgICAgICAgICAgIG9wYWNpdHk6IHtcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKGUsIHQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuID0gdnQoZSwgXCJvcGFjaXR5XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiXCIgPT09IG4gPyBcIjFcIiA6IG47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGNzc051bWJlcjoge1xuICAgICAgICAgICAgY29sdW1uQ291bnQ6ICEwLFxuICAgICAgICAgICAgZmlsbE9wYWNpdHk6ICEwLFxuICAgICAgICAgICAgZm9udFdlaWdodDogITAsXG4gICAgICAgICAgICBsaW5lSGVpZ2h0OiAhMCxcbiAgICAgICAgICAgIG9wYWNpdHk6ICEwLFxuICAgICAgICAgICAgb3JkZXI6ICEwLFxuICAgICAgICAgICAgb3JwaGFuczogITAsXG4gICAgICAgICAgICB3aWRvd3M6ICEwLFxuICAgICAgICAgICAgekluZGV4OiAhMCxcbiAgICAgICAgICAgIHpvb206ICEwXG4gICAgICAgIH0sXG4gICAgICAgIGNzc1Byb3BzOiB7XG4gICAgICAgICAgICBmbG9hdDogXCJjc3NGbG9hdFwiXG4gICAgICAgIH0sXG4gICAgICAgIHN0eWxlOiBmdW5jdGlvbihlLCB0LCBuLCByKSB7XG4gICAgICAgICAgICBpZiAoZSAmJiAzICE9PSBlLm5vZGVUeXBlICYmIDggIT09IGUubm9kZVR5cGUgJiYgZS5zdHlsZSkge1xuICAgICAgICAgICAgICAgIHZhciBpLCBvLCBzLCBhID0geC5jYW1lbENhc2UodCksIHUgPSBlLnN0eWxlO1xuICAgICAgICAgICAgICAgIHJldHVybiB0ID0geC5jc3NQcm9wc1thXSB8fCAoeC5jc3NQcm9wc1thXSA9IEF0KHUsIGEpKSwgcyA9IHguY3NzSG9va3NbdF0gfHwgeC5jc3NIb29rc1thXSwgXG4gICAgICAgICAgICAgICAgbiA9PT0gdW5kZWZpbmVkID8gcyAmJiBcImdldFwiIGluIHMgJiYgKGkgPSBzLmdldChlLCAhMSwgcikpICE9PSB1bmRlZmluZWQgPyBpIDogdVt0XSA6IChvID0gdHlwZW9mIG4sIFxuICAgICAgICAgICAgICAgIFwic3RyaW5nXCIgPT09IG8gJiYgKGkgPSBrdC5leGVjKG4pKSAmJiAobiA9IChpWzFdICsgMSkgKiBpWzJdICsgcGFyc2VGbG9hdCh4LmNzcyhlLCB0KSksIFxuICAgICAgICAgICAgICAgIG8gPSBcIm51bWJlclwiKSwgbnVsbCA9PSBuIHx8IFwibnVtYmVyXCIgPT09IG8gJiYgaXNOYU4obikgfHwgKFwibnVtYmVyXCIgIT09IG8gfHwgeC5jc3NOdW1iZXJbYV0gfHwgKG4gKz0gXCJweFwiKSwgXG4gICAgICAgICAgICAgICAgeC5zdXBwb3J0LmNsZWFyQ2xvbmVTdHlsZSB8fCBcIlwiICE9PSBuIHx8IDAgIT09IHQuaW5kZXhPZihcImJhY2tncm91bmRcIikgfHwgKHVbdF0gPSBcImluaGVyaXRcIiksIFxuICAgICAgICAgICAgICAgIHMgJiYgXCJzZXRcIiBpbiBzICYmIChuID0gcy5zZXQoZSwgbiwgcikpID09PSB1bmRlZmluZWQgfHwgKHVbdF0gPSBuKSksIHVuZGVmaW5lZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGNzczogZnVuY3Rpb24oZSwgdCwgbiwgcikge1xuICAgICAgICAgICAgdmFyIGksIG8sIHMsIGEgPSB4LmNhbWVsQ2FzZSh0KTtcbiAgICAgICAgICAgIHJldHVybiB0ID0geC5jc3NQcm9wc1thXSB8fCAoeC5jc3NQcm9wc1thXSA9IEF0KGUuc3R5bGUsIGEpKSwgcyA9IHguY3NzSG9va3NbdF0gfHwgeC5jc3NIb29rc1thXSwgXG4gICAgICAgICAgICBzICYmIFwiZ2V0XCIgaW4gcyAmJiAoaSA9IHMuZ2V0KGUsICEwLCBuKSksIGkgPT09IHVuZGVmaW5lZCAmJiAoaSA9IHZ0KGUsIHQsIHIpKSwgXG4gICAgICAgICAgICBcIm5vcm1hbFwiID09PSBpICYmIHQgaW4gU3QgJiYgKGkgPSBTdFt0XSksIFwiXCIgPT09IG4gfHwgbiA/IChvID0gcGFyc2VGbG9hdChpKSwgbiA9PT0gITAgfHwgeC5pc051bWVyaWMobykgPyBvIHx8IDAgOiBpKSA6IGk7XG4gICAgICAgIH1cbiAgICB9KSwgdnQgPSBmdW5jdGlvbihlLCB0LCBuKSB7XG4gICAgICAgIHZhciByLCBpLCBvLCBzID0gbiB8fCBxdChlKSwgYSA9IHMgPyBzLmdldFByb3BlcnR5VmFsdWUodCkgfHwgc1t0XSA6IHVuZGVmaW5lZCwgdSA9IGUuc3R5bGU7XG4gICAgICAgIHJldHVybiBzICYmIChcIlwiICE9PSBhIHx8IHguY29udGFpbnMoZS5vd25lckRvY3VtZW50LCBlKSB8fCAoYSA9IHguc3R5bGUoZSwgdCkpLCBcbiAgICAgICAgQ3QudGVzdChhKSAmJiB3dC50ZXN0KHQpICYmIChyID0gdS53aWR0aCwgaSA9IHUubWluV2lkdGgsIG8gPSB1Lm1heFdpZHRoLCB1Lm1pbldpZHRoID0gdS5tYXhXaWR0aCA9IHUud2lkdGggPSBhLCBcbiAgICAgICAgYSA9IHMud2lkdGgsIHUud2lkdGggPSByLCB1Lm1pbldpZHRoID0gaSwgdS5tYXhXaWR0aCA9IG8pKSwgYTtcbiAgICB9O1xuICAgIGZ1bmN0aW9uIE90KGUsIHQsIG4pIHtcbiAgICAgICAgdmFyIHIgPSBUdC5leGVjKHQpO1xuICAgICAgICByZXR1cm4gciA/IE1hdGgubWF4KDAsIHJbMV0gLSAobiB8fCAwKSkgKyAoclsyXSB8fCBcInB4XCIpIDogdDtcbiAgICB9XG4gICAgZnVuY3Rpb24gRnQoZSwgdCwgbiwgciwgaSkge1xuICAgICAgICB2YXIgbyA9IG4gPT09IChyID8gXCJib3JkZXJcIiA6IFwiY29udGVudFwiKSA/IDQgOiBcIndpZHRoXCIgPT09IHQgPyAxIDogMCwgcyA9IDA7XG4gICAgICAgIGZvciAoOzQgPiBvOyBvICs9IDIpIFwibWFyZ2luXCIgPT09IG4gJiYgKHMgKz0geC5jc3MoZSwgbiArIGp0W29dLCAhMCwgaSkpLCByID8gKFwiY29udGVudFwiID09PSBuICYmIChzIC09IHguY3NzKGUsIFwicGFkZGluZ1wiICsganRbb10sICEwLCBpKSksIFxuICAgICAgICBcIm1hcmdpblwiICE9PSBuICYmIChzIC09IHguY3NzKGUsIFwiYm9yZGVyXCIgKyBqdFtvXSArIFwiV2lkdGhcIiwgITAsIGkpKSkgOiAocyArPSB4LmNzcyhlLCBcInBhZGRpbmdcIiArIGp0W29dLCAhMCwgaSksIFxuICAgICAgICBcInBhZGRpbmdcIiAhPT0gbiAmJiAocyArPSB4LmNzcyhlLCBcImJvcmRlclwiICsganRbb10gKyBcIldpZHRoXCIsICEwLCBpKSkpO1xuICAgICAgICByZXR1cm4gcztcbiAgICB9XG4gICAgZnVuY3Rpb24gUHQoZSwgdCwgbikge1xuICAgICAgICB2YXIgciA9ICEwLCBpID0gXCJ3aWR0aFwiID09PSB0ID8gZS5vZmZzZXRXaWR0aCA6IGUub2Zmc2V0SGVpZ2h0LCBvID0gcXQoZSksIHMgPSB4LnN1cHBvcnQuYm94U2l6aW5nICYmIFwiYm9yZGVyLWJveFwiID09PSB4LmNzcyhlLCBcImJveFNpemluZ1wiLCAhMSwgbyk7XG4gICAgICAgIGlmICgwID49IGkgfHwgbnVsbCA9PSBpKSB7XG4gICAgICAgICAgICBpZiAoaSA9IHZ0KGUsIHQsIG8pLCAoMCA+IGkgfHwgbnVsbCA9PSBpKSAmJiAoaSA9IGUuc3R5bGVbdF0pLCBDdC50ZXN0KGkpKSByZXR1cm4gaTtcbiAgICAgICAgICAgIHIgPSBzICYmICh4LnN1cHBvcnQuYm94U2l6aW5nUmVsaWFibGUgfHwgaSA9PT0gZS5zdHlsZVt0XSksIGkgPSBwYXJzZUZsb2F0KGkpIHx8IDA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGkgKyBGdChlLCB0LCBuIHx8IChzID8gXCJib3JkZXJcIiA6IFwiY29udGVudFwiKSwgciwgbykgKyBcInB4XCI7XG4gICAgfVxuICAgIGZ1bmN0aW9uIFJ0KGUpIHtcbiAgICAgICAgdmFyIHQgPSBvLCBuID0gTnRbZV07XG4gICAgICAgIHJldHVybiBuIHx8IChuID0gTXQoZSwgdCksIFwibm9uZVwiICE9PSBuICYmIG4gfHwgKHh0ID0gKHh0IHx8IHgoXCI8aWZyYW1lIGZyYW1lYm9yZGVyPScwJyB3aWR0aD0nMCcgaGVpZ2h0PScwJy8+XCIpLmNzcyhcImNzc1RleHRcIiwgXCJkaXNwbGF5OmJsb2NrICFpbXBvcnRhbnRcIikpLmFwcGVuZFRvKHQuZG9jdW1lbnRFbGVtZW50KSwgXG4gICAgICAgIHQgPSAoeHRbMF0uY29udGVudFdpbmRvdyB8fCB4dFswXS5jb250ZW50RG9jdW1lbnQpLmRvY3VtZW50LCB0LndyaXRlKFwiPCFkb2N0eXBlIGh0bWw+PGh0bWw+PGJvZHk+XCIpLCBcbiAgICAgICAgdC5jbG9zZSgpLCBuID0gTXQoZSwgdCksIHh0LmRldGFjaCgpKSwgTnRbZV0gPSBuKSwgbjtcbiAgICB9XG4gICAgZnVuY3Rpb24gTXQoZSwgdCkge1xuICAgICAgICB2YXIgbiA9IHgodC5jcmVhdGVFbGVtZW50KGUpKS5hcHBlbmRUbyh0LmJvZHkpLCByID0geC5jc3MoblswXSwgXCJkaXNwbGF5XCIpO1xuICAgICAgICByZXR1cm4gbi5yZW1vdmUoKSwgcjtcbiAgICB9XG4gICAgeC5lYWNoKFsgXCJoZWlnaHRcIiwgXCJ3aWR0aFwiIF0sIGZ1bmN0aW9uKGUsIHQpIHtcbiAgICAgICAgeC5jc3NIb29rc1t0XSA9IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24oZSwgbiwgcikge1xuICAgICAgICAgICAgICAgIHJldHVybiBuID8gMCA9PT0gZS5vZmZzZXRXaWR0aCAmJiBidC50ZXN0KHguY3NzKGUsIFwiZGlzcGxheVwiKSkgPyB4LnN3YXAoZSwgRXQsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHQoZSwgdCwgcik7XG4gICAgICAgICAgICAgICAgfSkgOiBQdChlLCB0LCByKSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKGUsIG4sIHIpIHtcbiAgICAgICAgICAgICAgICB2YXIgaSA9IHIgJiYgcXQoZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIE90KGUsIG4sIHIgPyBGdChlLCB0LCByLCB4LnN1cHBvcnQuYm94U2l6aW5nICYmIFwiYm9yZGVyLWJveFwiID09PSB4LmNzcyhlLCBcImJveFNpemluZ1wiLCAhMSwgaSksIGkpIDogMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSksIHgoZnVuY3Rpb24oKSB7XG4gICAgICAgIHguc3VwcG9ydC5yZWxpYWJsZU1hcmdpblJpZ2h0IHx8ICh4LmNzc0hvb2tzLm1hcmdpblJpZ2h0ID0ge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbihlLCB0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHQgPyB4LnN3YXAoZSwge1xuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBcImlubGluZS1ibG9ja1wiXG4gICAgICAgICAgICAgICAgfSwgdnQsIFsgZSwgXCJtYXJnaW5SaWdodFwiIF0pIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KSwgIXguc3VwcG9ydC5waXhlbFBvc2l0aW9uICYmIHguZm4ucG9zaXRpb24gJiYgeC5lYWNoKFsgXCJ0b3BcIiwgXCJsZWZ0XCIgXSwgZnVuY3Rpb24oZSwgdCkge1xuICAgICAgICAgICAgeC5jc3NIb29rc1t0XSA9IHtcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKGUsIG4pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG4gPyAobiA9IHZ0KGUsIHQpLCBDdC50ZXN0KG4pID8geChlKS5wb3NpdGlvbigpW3RdICsgXCJweFwiIDogbikgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgfSksIHguZXhwciAmJiB4LmV4cHIuZmlsdGVycyAmJiAoeC5leHByLmZpbHRlcnMuaGlkZGVuID0gZnVuY3Rpb24oZSkge1xuICAgICAgICByZXR1cm4gMCA+PSBlLm9mZnNldFdpZHRoICYmIDAgPj0gZS5vZmZzZXRIZWlnaHQ7XG4gICAgfSwgeC5leHByLmZpbHRlcnMudmlzaWJsZSA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgcmV0dXJuICF4LmV4cHIuZmlsdGVycy5oaWRkZW4oZSk7XG4gICAgfSksIHguZWFjaCh7XG4gICAgICAgIG1hcmdpbjogXCJcIixcbiAgICAgICAgcGFkZGluZzogXCJcIixcbiAgICAgICAgYm9yZGVyOiBcIldpZHRoXCJcbiAgICB9LCBmdW5jdGlvbihlLCB0KSB7XG4gICAgICAgIHguY3NzSG9va3NbZSArIHRdID0ge1xuICAgICAgICAgICAgZXhwYW5kOiBmdW5jdGlvbihuKSB7XG4gICAgICAgICAgICAgICAgdmFyIHIgPSAwLCBpID0ge30sIG8gPSBcInN0cmluZ1wiID09IHR5cGVvZiBuID8gbi5zcGxpdChcIiBcIikgOiBbIG4gXTtcbiAgICAgICAgICAgICAgICBmb3IgKDs0ID4gcjsgcisrKSBpW2UgKyBqdFtyXSArIHRdID0gb1tyXSB8fCBvW3IgLSAyXSB8fCBvWzBdO1xuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB3dC50ZXN0KGUpIHx8ICh4LmNzc0hvb2tzW2UgKyB0XS5zZXQgPSBPdCk7XG4gICAgfSk7XG4gICAgdmFyIFd0ID0gLyUyMC9nLCAkdCA9IC9cXFtcXF0kLywgQnQgPSAvXFxyP1xcbi9nLCBJdCA9IC9eKD86c3VibWl0fGJ1dHRvbnxpbWFnZXxyZXNldHxmaWxlKSQvaSwgenQgPSAvXig/OmlucHV0fHNlbGVjdHx0ZXh0YXJlYXxrZXlnZW4pL2k7XG4gICAgeC5mbi5leHRlbmQoe1xuICAgICAgICBzZXJpYWxpemU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHgucGFyYW0odGhpcy5zZXJpYWxpemVBcnJheSgpKTtcbiAgICAgICAgfSxcbiAgICAgICAgc2VyaWFsaXplQXJyYXk6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciBlID0geC5wcm9wKHRoaXMsIFwiZWxlbWVudHNcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGUgPyB4Lm1ha2VBcnJheShlKSA6IHRoaXM7XG4gICAgICAgICAgICB9KS5maWx0ZXIoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIGUgPSB0aGlzLnR5cGU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubmFtZSAmJiAheCh0aGlzKS5pcyhcIjpkaXNhYmxlZFwiKSAmJiB6dC50ZXN0KHRoaXMubm9kZU5hbWUpICYmICFJdC50ZXN0KGUpICYmICh0aGlzLmNoZWNrZWQgfHwgIW90LnRlc3QoZSkpO1xuICAgICAgICAgICAgfSkubWFwKGZ1bmN0aW9uKGUsIHQpIHtcbiAgICAgICAgICAgICAgICB2YXIgbiA9IHgodGhpcykudmFsKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGwgPT0gbiA/IG51bGwgOiB4LmlzQXJyYXkobikgPyB4Lm1hcChuLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiB0Lm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZS5yZXBsYWNlKEJ0LCBcIlxcclxcblwiKVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0pIDoge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiB0Lm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBuLnJlcGxhY2UoQnQsIFwiXFxyXFxuXCIpXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pLmdldCgpO1xuICAgICAgICB9XG4gICAgfSksIHgucGFyYW0gPSBmdW5jdGlvbihlLCB0KSB7XG4gICAgICAgIHZhciBuLCByID0gW10sIGkgPSBmdW5jdGlvbihlLCB0KSB7XG4gICAgICAgICAgICB0ID0geC5pc0Z1bmN0aW9uKHQpID8gdCgpIDogbnVsbCA9PSB0ID8gXCJcIiA6IHQsIHJbci5sZW5ndGhdID0gZW5jb2RlVVJJQ29tcG9uZW50KGUpICsgXCI9XCIgKyBlbmNvZGVVUklDb21wb25lbnQodCk7XG4gICAgICAgIH07XG4gICAgICAgIGlmICh0ID09PSB1bmRlZmluZWQgJiYgKHQgPSB4LmFqYXhTZXR0aW5ncyAmJiB4LmFqYXhTZXR0aW5ncy50cmFkaXRpb25hbCksIHguaXNBcnJheShlKSB8fCBlLmpxdWVyeSAmJiAheC5pc1BsYWluT2JqZWN0KGUpKSB4LmVhY2goZSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpKHRoaXMubmFtZSwgdGhpcy52YWx1ZSk7XG4gICAgICAgIH0pOyBlbHNlIGZvciAobiBpbiBlKSBfdChuLCBlW25dLCB0LCBpKTtcbiAgICAgICAgcmV0dXJuIHIuam9pbihcIiZcIikucmVwbGFjZShXdCwgXCIrXCIpO1xuICAgIH07XG4gICAgZnVuY3Rpb24gX3QoZSwgdCwgbiwgcikge1xuICAgICAgICB2YXIgaTtcbiAgICAgICAgaWYgKHguaXNBcnJheSh0KSkgeC5lYWNoKHQsIGZ1bmN0aW9uKHQsIGkpIHtcbiAgICAgICAgICAgIG4gfHwgJHQudGVzdChlKSA/IHIoZSwgaSkgOiBfdChlICsgXCJbXCIgKyAoXCJvYmplY3RcIiA9PSB0eXBlb2YgaSA/IHQgOiBcIlwiKSArIFwiXVwiLCBpLCBuLCByKTtcbiAgICAgICAgfSk7IGVsc2UgaWYgKG4gfHwgXCJvYmplY3RcIiAhPT0geC50eXBlKHQpKSByKGUsIHQpOyBlbHNlIGZvciAoaSBpbiB0KSBfdChlICsgXCJbXCIgKyBpICsgXCJdXCIsIHRbaV0sIG4sIHIpO1xuICAgIH1cbiAgICB4LmVhY2goXCJibHVyIGZvY3VzIGZvY3VzaW4gZm9jdXNvdXQgbG9hZCByZXNpemUgc2Nyb2xsIHVubG9hZCBjbGljayBkYmxjbGljayBtb3VzZWRvd24gbW91c2V1cCBtb3VzZW1vdmUgbW91c2VvdmVyIG1vdXNlb3V0IG1vdXNlZW50ZXIgbW91c2VsZWF2ZSBjaGFuZ2Ugc2VsZWN0IHN1Ym1pdCBrZXlkb3duIGtleXByZXNzIGtleXVwIGVycm9yIGNvbnRleHRtZW51XCIuc3BsaXQoXCIgXCIpLCBmdW5jdGlvbihlLCB0KSB7XG4gICAgICAgIHguZm5bdF0gPSBmdW5jdGlvbihlLCBuKSB7XG4gICAgICAgICAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA+IDAgPyB0aGlzLm9uKHQsIG51bGwsIGUsIG4pIDogdGhpcy50cmlnZ2VyKHQpO1xuICAgICAgICB9O1xuICAgIH0pLCB4LmZuLmV4dGVuZCh7XG4gICAgICAgIGhvdmVyOiBmdW5jdGlvbihlLCB0KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tb3VzZWVudGVyKGUpLm1vdXNlbGVhdmUodCB8fCBlKTtcbiAgICAgICAgfSxcbiAgICAgICAgYmluZDogZnVuY3Rpb24oZSwgdCwgbikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMub24oZSwgbnVsbCwgdCwgbik7XG4gICAgICAgIH0sXG4gICAgICAgIHVuYmluZDogZnVuY3Rpb24oZSwgdCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMub2ZmKGUsIG51bGwsIHQpO1xuICAgICAgICB9LFxuICAgICAgICBkZWxlZ2F0ZTogZnVuY3Rpb24oZSwgdCwgbiwgcikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMub24odCwgZSwgbiwgcik7XG4gICAgICAgIH0sXG4gICAgICAgIHVuZGVsZWdhdGU6IGZ1bmN0aW9uKGUsIHQsIG4pIHtcbiAgICAgICAgICAgIHJldHVybiAxID09PSBhcmd1bWVudHMubGVuZ3RoID8gdGhpcy5vZmYoZSwgXCIqKlwiKSA6IHRoaXMub2ZmKHQsIGUgfHwgXCIqKlwiLCBuKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHZhciBYdCwgVXQsIFl0ID0geC5ub3coKSwgVnQgPSAvXFw/LywgR3QgPSAvIy4qJC8sIEp0ID0gLyhbPyZdKV89W14mXSovLCBRdCA9IC9eKC4qPyk6WyBcXHRdKihbXlxcclxcbl0qKSQvZ20sIEt0ID0gL14oPzphYm91dHxhcHB8YXBwLXN0b3JhZ2V8ListZXh0ZW5zaW9ufGZpbGV8cmVzfHdpZGdldCk6JC8sIFp0ID0gL14oPzpHRVR8SEVBRCkkLywgZW4gPSAvXlxcL1xcLy8sIHRuID0gL14oW1xcdy4rLV0rOikoPzpcXC9cXC8oW15cXC8/IzpdKikoPzo6KFxcZCspfCl8KS8sIG5uID0geC5mbi5sb2FkLCBybiA9IHt9LCBvbiA9IHt9LCBzbiA9IFwiKi9cIi5jb25jYXQoXCIqXCIpO1xuICAgIHRyeSB7XG4gICAgICAgIFV0ID0gaS5ocmVmO1xuICAgIH0gY2F0Y2ggKGFuKSB7XG4gICAgICAgIFV0ID0gby5jcmVhdGVFbGVtZW50KFwiYVwiKSwgVXQuaHJlZiA9IFwiXCIsIFV0ID0gVXQuaHJlZjtcbiAgICB9XG4gICAgWHQgPSB0bi5leGVjKFV0LnRvTG93ZXJDYXNlKCkpIHx8IFtdO1xuICAgIGZ1bmN0aW9uIHVuKGUpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHQsIG4pIHtcbiAgICAgICAgICAgIFwic3RyaW5nXCIgIT0gdHlwZW9mIHQgJiYgKG4gPSB0LCB0ID0gXCIqXCIpO1xuICAgICAgICAgICAgdmFyIHIsIGkgPSAwLCBvID0gdC50b0xvd2VyQ2FzZSgpLm1hdGNoKHcpIHx8IFtdO1xuICAgICAgICAgICAgaWYgKHguaXNGdW5jdGlvbihuKSkgd2hpbGUgKHIgPSBvW2krK10pIFwiK1wiID09PSByWzBdID8gKHIgPSByLnNsaWNlKDEpIHx8IFwiKlwiLCAoZVtyXSA9IGVbcl0gfHwgW10pLnVuc2hpZnQobikpIDogKGVbcl0gPSBlW3JdIHx8IFtdKS5wdXNoKG4pO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBmdW5jdGlvbiBsbihlLCB0LCBuLCByKSB7XG4gICAgICAgIHZhciBpID0ge30sIG8gPSBlID09PSBvbjtcbiAgICAgICAgZnVuY3Rpb24gcyhhKSB7XG4gICAgICAgICAgICB2YXIgdTtcbiAgICAgICAgICAgIHJldHVybiBpW2FdID0gITAsIHguZWFjaChlW2FdIHx8IFtdLCBmdW5jdGlvbihlLCBhKSB7XG4gICAgICAgICAgICAgICAgdmFyIGwgPSBhKHQsIG4sIHIpO1xuICAgICAgICAgICAgICAgIHJldHVybiBcInN0cmluZ1wiICE9IHR5cGVvZiBsIHx8IG8gfHwgaVtsXSA/IG8gPyAhKHUgPSBsKSA6IHVuZGVmaW5lZCA6ICh0LmRhdGFUeXBlcy51bnNoaWZ0KGwpLCBcbiAgICAgICAgICAgICAgICBzKGwpLCAhMSk7XG4gICAgICAgICAgICB9KSwgdTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcyh0LmRhdGFUeXBlc1swXSkgfHwgIWlbXCIqXCJdICYmIHMoXCIqXCIpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjbihlLCB0KSB7XG4gICAgICAgIHZhciBuLCByLCBpID0geC5hamF4U2V0dGluZ3MuZmxhdE9wdGlvbnMgfHwge307XG4gICAgICAgIGZvciAobiBpbiB0KSB0W25dICE9PSB1bmRlZmluZWQgJiYgKChpW25dID8gZSA6IHIgfHwgKHIgPSB7fSkpW25dID0gdFtuXSk7XG4gICAgICAgIHJldHVybiByICYmIHguZXh0ZW5kKCEwLCBlLCByKSwgZTtcbiAgICB9XG4gICAgeC5mbi5sb2FkID0gZnVuY3Rpb24oZSwgdCwgbikge1xuICAgICAgICBpZiAoXCJzdHJpbmdcIiAhPSB0eXBlb2YgZSAmJiBubikgcmV0dXJuIG5uLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIHZhciByLCBpLCBvLCBzID0gdGhpcywgYSA9IGUuaW5kZXhPZihcIiBcIik7XG4gICAgICAgIHJldHVybiBhID49IDAgJiYgKHIgPSBlLnNsaWNlKGEpLCBlID0gZS5zbGljZSgwLCBhKSksIHguaXNGdW5jdGlvbih0KSA/IChuID0gdCwgXG4gICAgICAgIHQgPSB1bmRlZmluZWQpIDogdCAmJiBcIm9iamVjdFwiID09IHR5cGVvZiB0ICYmIChpID0gXCJQT1NUXCIpLCBzLmxlbmd0aCA+IDAgJiYgeC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZSxcbiAgICAgICAgICAgIHR5cGU6IGksXG4gICAgICAgICAgICBkYXRhVHlwZTogXCJodG1sXCIsXG4gICAgICAgICAgICBkYXRhOiB0XG4gICAgICAgIH0pLmRvbmUoZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgbyA9IGFyZ3VtZW50cywgcy5odG1sKHIgPyB4KFwiPGRpdj5cIikuYXBwZW5kKHgucGFyc2VIVE1MKGUpKS5maW5kKHIpIDogZSk7XG4gICAgICAgIH0pLmNvbXBsZXRlKG4gJiYgZnVuY3Rpb24oZSwgdCkge1xuICAgICAgICAgICAgcy5lYWNoKG4sIG8gfHwgWyBlLnJlc3BvbnNlVGV4dCwgdCwgZSBdKTtcbiAgICAgICAgfSksIHRoaXM7XG4gICAgfSwgeC5lYWNoKFsgXCJhamF4U3RhcnRcIiwgXCJhamF4U3RvcFwiLCBcImFqYXhDb21wbGV0ZVwiLCBcImFqYXhFcnJvclwiLCBcImFqYXhTdWNjZXNzXCIsIFwiYWpheFNlbmRcIiBdLCBmdW5jdGlvbihlLCB0KSB7XG4gICAgICAgIHguZm5bdF0gPSBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5vbih0LCBlKTtcbiAgICAgICAgfTtcbiAgICB9KSwgeC5leHRlbmQoe1xuICAgICAgICBhY3RpdmU6IDAsXG4gICAgICAgIGxhc3RNb2RpZmllZDoge30sXG4gICAgICAgIGV0YWc6IHt9LFxuICAgICAgICBhamF4U2V0dGluZ3M6IHtcbiAgICAgICAgICAgIHVybDogVXQsXG4gICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxuICAgICAgICAgICAgaXNMb2NhbDogS3QudGVzdChYdFsxXSksXG4gICAgICAgICAgICBnbG9iYWw6ICEwLFxuICAgICAgICAgICAgcHJvY2Vzc0RhdGE6ICEwLFxuICAgICAgICAgICAgYXN5bmM6ICEwLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkOyBjaGFyc2V0PVVURi04XCIsXG4gICAgICAgICAgICBhY2NlcHRzOiB7XG4gICAgICAgICAgICAgICAgXCIqXCI6IHNuLFxuICAgICAgICAgICAgICAgIHRleHQ6IFwidGV4dC9wbGFpblwiLFxuICAgICAgICAgICAgICAgIGh0bWw6IFwidGV4dC9odG1sXCIsXG4gICAgICAgICAgICAgICAgeG1sOiBcImFwcGxpY2F0aW9uL3htbCwgdGV4dC94bWxcIixcbiAgICAgICAgICAgICAgICBqc29uOiBcImFwcGxpY2F0aW9uL2pzb24sIHRleHQvamF2YXNjcmlwdFwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29udGVudHM6IHtcbiAgICAgICAgICAgICAgICB4bWw6IC94bWwvLFxuICAgICAgICAgICAgICAgIGh0bWw6IC9odG1sLyxcbiAgICAgICAgICAgICAgICBqc29uOiAvanNvbi9cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZXNwb25zZUZpZWxkczoge1xuICAgICAgICAgICAgICAgIHhtbDogXCJyZXNwb25zZVhNTFwiLFxuICAgICAgICAgICAgICAgIHRleHQ6IFwicmVzcG9uc2VUZXh0XCIsXG4gICAgICAgICAgICAgICAganNvbjogXCJyZXNwb25zZUpTT05cIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbnZlcnRlcnM6IHtcbiAgICAgICAgICAgICAgICBcIiogdGV4dFwiOiBTdHJpbmcsXG4gICAgICAgICAgICAgICAgXCJ0ZXh0IGh0bWxcIjogITAsXG4gICAgICAgICAgICAgICAgXCJ0ZXh0IGpzb25cIjogeC5wYXJzZUpTT04sXG4gICAgICAgICAgICAgICAgXCJ0ZXh0IHhtbFwiOiB4LnBhcnNlWE1MXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZmxhdE9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgICB1cmw6ICEwLFxuICAgICAgICAgICAgICAgIGNvbnRleHQ6ICEwXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGFqYXhTZXR1cDogZnVuY3Rpb24oZSwgdCkge1xuICAgICAgICAgICAgcmV0dXJuIHQgPyBjbihjbihlLCB4LmFqYXhTZXR0aW5ncyksIHQpIDogY24oeC5hamF4U2V0dGluZ3MsIGUpO1xuICAgICAgICB9LFxuICAgICAgICBhamF4UHJlZmlsdGVyOiB1bihybiksXG4gICAgICAgIGFqYXhUcmFuc3BvcnQ6IHVuKG9uKSxcbiAgICAgICAgYWpheDogZnVuY3Rpb24oZSwgdCkge1xuICAgICAgICAgICAgXCJvYmplY3RcIiA9PSB0eXBlb2YgZSAmJiAodCA9IGUsIGUgPSB1bmRlZmluZWQpLCB0ID0gdCB8fCB7fTtcbiAgICAgICAgICAgIHZhciBuLCByLCBpLCBvLCBzLCBhLCB1LCBsLCBjID0geC5hamF4U2V0dXAoe30sIHQpLCBwID0gYy5jb250ZXh0IHx8IGMsIGYgPSBjLmNvbnRleHQgJiYgKHAubm9kZVR5cGUgfHwgcC5qcXVlcnkpID8geChwKSA6IHguZXZlbnQsIGggPSB4LkRlZmVycmVkKCksIGQgPSB4LkNhbGxiYWNrcyhcIm9uY2UgbWVtb3J5XCIpLCBnID0gYy5zdGF0dXNDb2RlIHx8IHt9LCBtID0ge30sIHkgPSB7fSwgdiA9IDAsIGIgPSBcImNhbmNlbGVkXCIsIFQgPSB7XG4gICAgICAgICAgICAgICAgcmVhZHlTdGF0ZTogMCxcbiAgICAgICAgICAgICAgICBnZXRSZXNwb25zZUhlYWRlcjogZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKDIgPT09IHYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG8gPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAodCA9IFF0LmV4ZWMoaSkpIG9bdFsxXS50b0xvd2VyQ2FzZSgpXSA9IHRbMl07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB0ID0gb1tlLnRvTG93ZXJDYXNlKCldO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsID09IHQgPyBudWxsIDogdDtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGdldEFsbFJlc3BvbnNlSGVhZGVyczogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAyID09PSB2ID8gaSA6IG51bGw7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZXRSZXF1ZXN0SGVhZGVyOiBmdW5jdGlvbihlLCB0KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBuID0gZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdiB8fCAoZSA9IHlbbl0gPSB5W25dIHx8IGUsIG1bZV0gPSB0KSwgdGhpcztcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG92ZXJyaWRlTWltZVR5cGU6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHYgfHwgKGMubWltZVR5cGUgPSBlKSwgdGhpcztcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHN0YXR1c0NvZGU6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHQ7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlKSBpZiAoMiA+IHYpIGZvciAodCBpbiBlKSBnW3RdID0gWyBnW3RdLCBlW3RdIF07IGVsc2UgVC5hbHdheXMoZVtULnN0YXR1c10pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGFib3J0OiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0ID0gZSB8fCBiO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbiAmJiBuLmFib3J0KHQpLCBrKDAsIHQpLCB0aGlzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAoaC5wcm9taXNlKFQpLmNvbXBsZXRlID0gZC5hZGQsIFQuc3VjY2VzcyA9IFQuZG9uZSwgVC5lcnJvciA9IFQuZmFpbCwgYy51cmwgPSAoKGUgfHwgYy51cmwgfHwgVXQpICsgXCJcIikucmVwbGFjZShHdCwgXCJcIikucmVwbGFjZShlbiwgWHRbMV0gKyBcIi8vXCIpLCBcbiAgICAgICAgICAgIGMudHlwZSA9IHQubWV0aG9kIHx8IHQudHlwZSB8fCBjLm1ldGhvZCB8fCBjLnR5cGUsIGMuZGF0YVR5cGVzID0geC50cmltKGMuZGF0YVR5cGUgfHwgXCIqXCIpLnRvTG93ZXJDYXNlKCkubWF0Y2godykgfHwgWyBcIlwiIF0sIFxuICAgICAgICAgICAgbnVsbCA9PSBjLmNyb3NzRG9tYWluICYmIChhID0gdG4uZXhlYyhjLnVybC50b0xvd2VyQ2FzZSgpKSwgYy5jcm9zc0RvbWFpbiA9ICEoIWEgfHwgYVsxXSA9PT0gWHRbMV0gJiYgYVsyXSA9PT0gWHRbMl0gJiYgKGFbM10gfHwgKFwiaHR0cDpcIiA9PT0gYVsxXSA/IFwiODBcIiA6IFwiNDQzXCIpKSA9PT0gKFh0WzNdIHx8IChcImh0dHA6XCIgPT09IFh0WzFdID8gXCI4MFwiIDogXCI0NDNcIikpKSksIFxuICAgICAgICAgICAgYy5kYXRhICYmIGMucHJvY2Vzc0RhdGEgJiYgXCJzdHJpbmdcIiAhPSB0eXBlb2YgYy5kYXRhICYmIChjLmRhdGEgPSB4LnBhcmFtKGMuZGF0YSwgYy50cmFkaXRpb25hbCkpLCBcbiAgICAgICAgICAgIGxuKHJuLCBjLCB0LCBUKSwgMiA9PT0gdikgcmV0dXJuIFQ7XG4gICAgICAgICAgICB1ID0gYy5nbG9iYWwsIHUgJiYgMCA9PT0geC5hY3RpdmUrKyAmJiB4LmV2ZW50LnRyaWdnZXIoXCJhamF4U3RhcnRcIiksIGMudHlwZSA9IGMudHlwZS50b1VwcGVyQ2FzZSgpLCBcbiAgICAgICAgICAgIGMuaGFzQ29udGVudCA9ICFadC50ZXN0KGMudHlwZSksIHIgPSBjLnVybCwgYy5oYXNDb250ZW50IHx8IChjLmRhdGEgJiYgKHIgPSBjLnVybCArPSAoVnQudGVzdChyKSA/IFwiJlwiIDogXCI/XCIpICsgYy5kYXRhLCBcbiAgICAgICAgICAgIGRlbGV0ZSBjLmRhdGEpLCBjLmNhY2hlID09PSAhMSAmJiAoYy51cmwgPSBKdC50ZXN0KHIpID8gci5yZXBsYWNlKEp0LCBcIiQxXz1cIiArIFl0KyspIDogciArIChWdC50ZXN0KHIpID8gXCImXCIgOiBcIj9cIikgKyBcIl89XCIgKyBZdCsrKSksIFxuICAgICAgICAgICAgYy5pZk1vZGlmaWVkICYmICh4Lmxhc3RNb2RpZmllZFtyXSAmJiBULnNldFJlcXVlc3RIZWFkZXIoXCJJZi1Nb2RpZmllZC1TaW5jZVwiLCB4Lmxhc3RNb2RpZmllZFtyXSksIFxuICAgICAgICAgICAgeC5ldGFnW3JdICYmIFQuc2V0UmVxdWVzdEhlYWRlcihcIklmLU5vbmUtTWF0Y2hcIiwgeC5ldGFnW3JdKSksIChjLmRhdGEgJiYgYy5oYXNDb250ZW50ICYmIGMuY29udGVudFR5cGUgIT09ICExIHx8IHQuY29udGVudFR5cGUpICYmIFQuc2V0UmVxdWVzdEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLCBjLmNvbnRlbnRUeXBlKSwgXG4gICAgICAgICAgICBULnNldFJlcXVlc3RIZWFkZXIoXCJBY2NlcHRcIiwgYy5kYXRhVHlwZXNbMF0gJiYgYy5hY2NlcHRzW2MuZGF0YVR5cGVzWzBdXSA/IGMuYWNjZXB0c1tjLmRhdGFUeXBlc1swXV0gKyAoXCIqXCIgIT09IGMuZGF0YVR5cGVzWzBdID8gXCIsIFwiICsgc24gKyBcIjsgcT0wLjAxXCIgOiBcIlwiKSA6IGMuYWNjZXB0c1tcIipcIl0pO1xuICAgICAgICAgICAgZm9yIChsIGluIGMuaGVhZGVycykgVC5zZXRSZXF1ZXN0SGVhZGVyKGwsIGMuaGVhZGVyc1tsXSk7XG4gICAgICAgICAgICBpZiAoYy5iZWZvcmVTZW5kICYmIChjLmJlZm9yZVNlbmQuY2FsbChwLCBULCBjKSA9PT0gITEgfHwgMiA9PT0gdikpIHJldHVybiBULmFib3J0KCk7XG4gICAgICAgICAgICBiID0gXCJhYm9ydFwiO1xuICAgICAgICAgICAgZm9yIChsIGluIHtcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAxLFxuICAgICAgICAgICAgICAgIGVycm9yOiAxLFxuICAgICAgICAgICAgICAgIGNvbXBsZXRlOiAxXG4gICAgICAgICAgICB9KSBUW2xdKGNbbF0pO1xuICAgICAgICAgICAgaWYgKG4gPSBsbihvbiwgYywgdCwgVCkpIHtcbiAgICAgICAgICAgICAgICBULnJlYWR5U3RhdGUgPSAxLCB1ICYmIGYudHJpZ2dlcihcImFqYXhTZW5kXCIsIFsgVCwgYyBdKSwgYy5hc3luYyAmJiBjLnRpbWVvdXQgPiAwICYmIChzID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgVC5hYm9ydChcInRpbWVvdXRcIik7XG4gICAgICAgICAgICAgICAgfSwgYy50aW1lb3V0KSk7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgdiA9IDEsIG4uc2VuZChtLCBrKTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChDKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghKDIgPiB2KSkgdGhyb3cgQztcbiAgICAgICAgICAgICAgICAgICAgaygtMSwgQyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGsoLTEsIFwiTm8gVHJhbnNwb3J0XCIpO1xuICAgICAgICAgICAgZnVuY3Rpb24gayhlLCB0LCBvLCBhKSB7XG4gICAgICAgICAgICAgICAgdmFyIGwsIG0sIHksIGIsIHcsIEMgPSB0O1xuICAgICAgICAgICAgICAgIDIgIT09IHYgJiYgKHYgPSAyLCBzICYmIGNsZWFyVGltZW91dChzKSwgbiA9IHVuZGVmaW5lZCwgaSA9IGEgfHwgXCJcIiwgVC5yZWFkeVN0YXRlID0gZSA+IDAgPyA0IDogMCwgXG4gICAgICAgICAgICAgICAgbCA9IGUgPj0gMjAwICYmIDMwMCA+IGUgfHwgMzA0ID09PSBlLCBvICYmIChiID0gcG4oYywgVCwgbykpLCBiID0gZm4oYywgYiwgVCwgbCksIFxuICAgICAgICAgICAgICAgIGwgPyAoYy5pZk1vZGlmaWVkICYmICh3ID0gVC5nZXRSZXNwb25zZUhlYWRlcihcIkxhc3QtTW9kaWZpZWRcIiksIHcgJiYgKHgubGFzdE1vZGlmaWVkW3JdID0gdyksIFxuICAgICAgICAgICAgICAgIHcgPSBULmdldFJlc3BvbnNlSGVhZGVyKFwiZXRhZ1wiKSwgdyAmJiAoeC5ldGFnW3JdID0gdykpLCAyMDQgPT09IGUgfHwgXCJIRUFEXCIgPT09IGMudHlwZSA/IEMgPSBcIm5vY29udGVudFwiIDogMzA0ID09PSBlID8gQyA9IFwibm90bW9kaWZpZWRcIiA6IChDID0gYi5zdGF0ZSwgXG4gICAgICAgICAgICAgICAgbSA9IGIuZGF0YSwgeSA9IGIuZXJyb3IsIGwgPSAheSkpIDogKHkgPSBDLCAoZSB8fCAhQykgJiYgKEMgPSBcImVycm9yXCIsIDAgPiBlICYmIChlID0gMCkpKSwgXG4gICAgICAgICAgICAgICAgVC5zdGF0dXMgPSBlLCBULnN0YXR1c1RleHQgPSAodCB8fCBDKSArIFwiXCIsIGwgPyBoLnJlc29sdmVXaXRoKHAsIFsgbSwgQywgVCBdKSA6IGgucmVqZWN0V2l0aChwLCBbIFQsIEMsIHkgXSksIFxuICAgICAgICAgICAgICAgIFQuc3RhdHVzQ29kZShnKSwgZyA9IHVuZGVmaW5lZCwgdSAmJiBmLnRyaWdnZXIobCA/IFwiYWpheFN1Y2Nlc3NcIiA6IFwiYWpheEVycm9yXCIsIFsgVCwgYywgbCA/IG0gOiB5IF0pLCBcbiAgICAgICAgICAgICAgICBkLmZpcmVXaXRoKHAsIFsgVCwgQyBdKSwgdSAmJiAoZi50cmlnZ2VyKFwiYWpheENvbXBsZXRlXCIsIFsgVCwgYyBdKSwgLS14LmFjdGl2ZSB8fCB4LmV2ZW50LnRyaWdnZXIoXCJhamF4U3RvcFwiKSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIFQ7XG4gICAgICAgIH0sXG4gICAgICAgIGdldEpTT046IGZ1bmN0aW9uKGUsIHQsIG4pIHtcbiAgICAgICAgICAgIHJldHVybiB4LmdldChlLCB0LCBuLCBcImpzb25cIik7XG4gICAgICAgIH0sXG4gICAgICAgIGdldFNjcmlwdDogZnVuY3Rpb24oZSwgdCkge1xuICAgICAgICAgICAgcmV0dXJuIHguZ2V0KGUsIHVuZGVmaW5lZCwgdCwgXCJzY3JpcHRcIik7XG4gICAgICAgIH1cbiAgICB9KSwgeC5lYWNoKFsgXCJnZXRcIiwgXCJwb3N0XCIgXSwgZnVuY3Rpb24oZSwgdCkge1xuICAgICAgICB4W3RdID0gZnVuY3Rpb24oZSwgbiwgciwgaSkge1xuICAgICAgICAgICAgcmV0dXJuIHguaXNGdW5jdGlvbihuKSAmJiAoaSA9IGkgfHwgciwgciA9IG4sIG4gPSB1bmRlZmluZWQpLCB4LmFqYXgoe1xuICAgICAgICAgICAgICAgIHVybDogZSxcbiAgICAgICAgICAgICAgICB0eXBlOiB0LFxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiBpLFxuICAgICAgICAgICAgICAgIGRhdGE6IG4sXG4gICAgICAgICAgICAgICAgc3VjY2VzczogclxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgfSk7XG4gICAgZnVuY3Rpb24gcG4oZSwgdCwgbikge1xuICAgICAgICB2YXIgciwgaSwgbywgcywgYSA9IGUuY29udGVudHMsIHUgPSBlLmRhdGFUeXBlcztcbiAgICAgICAgd2hpbGUgKFwiKlwiID09PSB1WzBdKSB1LnNoaWZ0KCksIHIgPT09IHVuZGVmaW5lZCAmJiAociA9IGUubWltZVR5cGUgfHwgdC5nZXRSZXNwb25zZUhlYWRlcihcIkNvbnRlbnQtVHlwZVwiKSk7XG4gICAgICAgIGlmIChyKSBmb3IgKGkgaW4gYSkgaWYgKGFbaV0gJiYgYVtpXS50ZXN0KHIpKSB7XG4gICAgICAgICAgICB1LnVuc2hpZnQoaSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBpZiAodVswXSBpbiBuKSBvID0gdVswXTsgZWxzZSB7XG4gICAgICAgICAgICBmb3IgKGkgaW4gbikge1xuICAgICAgICAgICAgICAgIGlmICghdVswXSB8fCBlLmNvbnZlcnRlcnNbaSArIFwiIFwiICsgdVswXV0pIHtcbiAgICAgICAgICAgICAgICAgICAgbyA9IGk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzIHx8IChzID0gaSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvID0gbyB8fCBzO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvID8gKG8gIT09IHVbMF0gJiYgdS51bnNoaWZ0KG8pLCBuW29dKSA6IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgZnVuY3Rpb24gZm4oZSwgdCwgbiwgcikge1xuICAgICAgICB2YXIgaSwgbywgcywgYSwgdSwgbCA9IHt9LCBjID0gZS5kYXRhVHlwZXMuc2xpY2UoKTtcbiAgICAgICAgaWYgKGNbMV0pIGZvciAocyBpbiBlLmNvbnZlcnRlcnMpIGxbcy50b0xvd2VyQ2FzZSgpXSA9IGUuY29udmVydGVyc1tzXTtcbiAgICAgICAgbyA9IGMuc2hpZnQoKTtcbiAgICAgICAgd2hpbGUgKG8pIGlmIChlLnJlc3BvbnNlRmllbGRzW29dICYmIChuW2UucmVzcG9uc2VGaWVsZHNbb11dID0gdCksICF1ICYmIHIgJiYgZS5kYXRhRmlsdGVyICYmICh0ID0gZS5kYXRhRmlsdGVyKHQsIGUuZGF0YVR5cGUpKSwgXG4gICAgICAgIHUgPSBvLCBvID0gYy5zaGlmdCgpKSBpZiAoXCIqXCIgPT09IG8pIG8gPSB1OyBlbHNlIGlmIChcIipcIiAhPT0gdSAmJiB1ICE9PSBvKSB7XG4gICAgICAgICAgICBpZiAocyA9IGxbdSArIFwiIFwiICsgb10gfHwgbFtcIiogXCIgKyBvXSwgIXMpIGZvciAoaSBpbiBsKSBpZiAoYSA9IGkuc3BsaXQoXCIgXCIpLCBhWzFdID09PSBvICYmIChzID0gbFt1ICsgXCIgXCIgKyBhWzBdXSB8fCBsW1wiKiBcIiArIGFbMF1dKSkge1xuICAgICAgICAgICAgICAgIHMgPT09ICEwID8gcyA9IGxbaV0gOiBsW2ldICE9PSAhMCAmJiAobyA9IGFbMF0sIGMudW5zaGlmdChhWzFdKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocyAhPT0gITApIGlmIChzICYmIGVbXCJ0aHJvd3NcIl0pIHQgPSBzKHQpOyBlbHNlIHRyeSB7XG4gICAgICAgICAgICAgICAgdCA9IHModCk7XG4gICAgICAgICAgICB9IGNhdGNoIChwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGU6IFwicGFyc2VyZXJyb3JcIixcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6IHMgPyBwIDogXCJObyBjb252ZXJzaW9uIGZyb20gXCIgKyB1ICsgXCIgdG8gXCIgKyBvXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3RhdGU6IFwic3VjY2Vzc1wiLFxuICAgICAgICAgICAgZGF0YTogdFxuICAgICAgICB9O1xuICAgIH1cbiAgICB4LmFqYXhTZXR1cCh7XG4gICAgICAgIGFjY2VwdHM6IHtcbiAgICAgICAgICAgIHNjcmlwdDogXCJ0ZXh0L2phdmFzY3JpcHQsIGFwcGxpY2F0aW9uL2phdmFzY3JpcHQsIGFwcGxpY2F0aW9uL2VjbWFzY3JpcHQsIGFwcGxpY2F0aW9uL3gtZWNtYXNjcmlwdFwiXG4gICAgICAgIH0sXG4gICAgICAgIGNvbnRlbnRzOiB7XG4gICAgICAgICAgICBzY3JpcHQ6IC8oPzpqYXZhfGVjbWEpc2NyaXB0L1xuICAgICAgICB9LFxuICAgICAgICBjb252ZXJ0ZXJzOiB7XG4gICAgICAgICAgICBcInRleHQgc2NyaXB0XCI6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geC5nbG9iYWxFdmFsKGUpLCBlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSksIHguYWpheFByZWZpbHRlcihcInNjcmlwdFwiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGUuY2FjaGUgPT09IHVuZGVmaW5lZCAmJiAoZS5jYWNoZSA9ICExKSwgZS5jcm9zc0RvbWFpbiAmJiAoZS50eXBlID0gXCJHRVRcIik7XG4gICAgfSksIHguYWpheFRyYW5zcG9ydChcInNjcmlwdFwiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmIChlLmNyb3NzRG9tYWluKSB7XG4gICAgICAgICAgICB2YXIgdCwgbjtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgc2VuZDogZnVuY3Rpb24ociwgaSkge1xuICAgICAgICAgICAgICAgICAgICB0ID0geChcIjxzY3JpcHQ+XCIpLnByb3Aoe1xuICAgICAgICAgICAgICAgICAgICAgICAgYXN5bmM6ICEwLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2hhcnNldDogZS5zY3JpcHRDaGFyc2V0LFxuICAgICAgICAgICAgICAgICAgICAgICAgc3JjOiBlLnVybFxuICAgICAgICAgICAgICAgICAgICB9KS5vbihcImxvYWQgZXJyb3JcIiwgbiA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHQucmVtb3ZlKCksIG4gPSBudWxsLCBlICYmIGkoXCJlcnJvclwiID09PSBlLnR5cGUgPyA0MDQgOiAyMDAsIGUudHlwZSk7XG4gICAgICAgICAgICAgICAgICAgIH0pLCBvLmhlYWQuYXBwZW5kQ2hpbGQodFswXSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBhYm9ydDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIG4gJiYgbigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICB2YXIgaG4gPSBbXSwgZG4gPSAvKD0pXFw/KD89JnwkKXxcXD9cXD8vO1xuICAgIHguYWpheFNldHVwKHtcbiAgICAgICAganNvbnA6IFwiY2FsbGJhY2tcIixcbiAgICAgICAganNvbnBDYWxsYmFjazogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgZSA9IGhuLnBvcCgpIHx8IHguZXhwYW5kbyArIFwiX1wiICsgWXQrKztcbiAgICAgICAgICAgIHJldHVybiB0aGlzW2VdID0gITAsIGU7XG4gICAgICAgIH1cbiAgICB9KSwgeC5hamF4UHJlZmlsdGVyKFwianNvbiBqc29ucFwiLCBmdW5jdGlvbih0LCBuLCByKSB7XG4gICAgICAgIHZhciBpLCBvLCBzLCBhID0gdC5qc29ucCAhPT0gITEgJiYgKGRuLnRlc3QodC51cmwpID8gXCJ1cmxcIiA6IFwic3RyaW5nXCIgPT0gdHlwZW9mIHQuZGF0YSAmJiAhKHQuY29udGVudFR5cGUgfHwgXCJcIikuaW5kZXhPZihcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFwiKSAmJiBkbi50ZXN0KHQuZGF0YSkgJiYgXCJkYXRhXCIpO1xuICAgICAgICByZXR1cm4gYSB8fCBcImpzb25wXCIgPT09IHQuZGF0YVR5cGVzWzBdID8gKGkgPSB0Lmpzb25wQ2FsbGJhY2sgPSB4LmlzRnVuY3Rpb24odC5qc29ucENhbGxiYWNrKSA/IHQuanNvbnBDYWxsYmFjaygpIDogdC5qc29ucENhbGxiYWNrLCBcbiAgICAgICAgYSA/IHRbYV0gPSB0W2FdLnJlcGxhY2UoZG4sIFwiJDFcIiArIGkpIDogdC5qc29ucCAhPT0gITEgJiYgKHQudXJsICs9IChWdC50ZXN0KHQudXJsKSA/IFwiJlwiIDogXCI/XCIpICsgdC5qc29ucCArIFwiPVwiICsgaSksIFxuICAgICAgICB0LmNvbnZlcnRlcnNbXCJzY3JpcHQganNvblwiXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHMgfHwgeC5lcnJvcihpICsgXCIgd2FzIG5vdCBjYWxsZWRcIiksIHNbMF07XG4gICAgICAgIH0sIHQuZGF0YVR5cGVzWzBdID0gXCJqc29uXCIsIG8gPSBlW2ldLCBlW2ldID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzID0gYXJndW1lbnRzO1xuICAgICAgICB9LCByLmFsd2F5cyhmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGVbaV0gPSBvLCB0W2ldICYmICh0Lmpzb25wQ2FsbGJhY2sgPSBuLmpzb25wQ2FsbGJhY2ssIGhuLnB1c2goaSkpLCBzICYmIHguaXNGdW5jdGlvbihvKSAmJiBvKHNbMF0pLCBcbiAgICAgICAgICAgIHMgPSBvID0gdW5kZWZpbmVkO1xuICAgICAgICB9KSwgXCJzY3JpcHRcIikgOiB1bmRlZmluZWQ7XG4gICAgfSksIHguYWpheFNldHRpbmdzLnhociA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICB9IGNhdGNoIChlKSB7fVxuICAgIH07XG4gICAgdmFyIGduID0geC5hamF4U2V0dGluZ3MueGhyKCksIG1uID0ge1xuICAgICAgICAwOiAyMDAsXG4gICAgICAgIDEyMjM6IDIwNFxuICAgIH0sIHluID0gMCwgdm4gPSB7fTtcbiAgICBlLkFjdGl2ZVhPYmplY3QgJiYgeChlKS5vbihcInVubG9hZFwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZm9yICh2YXIgZSBpbiB2bikgdm5bZV0oKTtcbiAgICAgICAgdm4gPSB1bmRlZmluZWQ7XG4gICAgfSksIHguc3VwcG9ydC5jb3JzID0gISFnbiAmJiBcIndpdGhDcmVkZW50aWFsc1wiIGluIGduLCB4LnN1cHBvcnQuYWpheCA9IGduID0gISFnbiwgXG4gICAgeC5hamF4VHJhbnNwb3J0KGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgdmFyIHQ7XG4gICAgICAgIHJldHVybiB4LnN1cHBvcnQuY29ycyB8fCBnbiAmJiAhZS5jcm9zc0RvbWFpbiA/IHtcbiAgICAgICAgICAgIHNlbmQ6IGZ1bmN0aW9uKG4sIHIpIHtcbiAgICAgICAgICAgICAgICB2YXIgaSwgbywgcyA9IGUueGhyKCk7XG4gICAgICAgICAgICAgICAgaWYgKHMub3BlbihlLnR5cGUsIGUudXJsLCBlLmFzeW5jLCBlLnVzZXJuYW1lLCBlLnBhc3N3b3JkKSwgZS54aHJGaWVsZHMpIGZvciAoaSBpbiBlLnhockZpZWxkcykgc1tpXSA9IGUueGhyRmllbGRzW2ldO1xuICAgICAgICAgICAgICAgIGUubWltZVR5cGUgJiYgcy5vdmVycmlkZU1pbWVUeXBlICYmIHMub3ZlcnJpZGVNaW1lVHlwZShlLm1pbWVUeXBlKSwgZS5jcm9zc0RvbWFpbiB8fCBuW1wiWC1SZXF1ZXN0ZWQtV2l0aFwiXSB8fCAobltcIlgtUmVxdWVzdGVkLVdpdGhcIl0gPSBcIlhNTEh0dHBSZXF1ZXN0XCIpO1xuICAgICAgICAgICAgICAgIGZvciAoaSBpbiBuKSBzLnNldFJlcXVlc3RIZWFkZXIoaSwgbltpXSk7XG4gICAgICAgICAgICAgICAgdCA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdCAmJiAoZGVsZXRlIHZuW29dLCB0ID0gcy5vbmxvYWQgPSBzLm9uZXJyb3IgPSBudWxsLCBcImFib3J0XCIgPT09IGUgPyBzLmFib3J0KCkgOiBcImVycm9yXCIgPT09IGUgPyByKHMuc3RhdHVzIHx8IDQwNCwgcy5zdGF0dXNUZXh0KSA6IHIobW5bcy5zdGF0dXNdIHx8IHMuc3RhdHVzLCBzLnN0YXR1c1RleHQsIFwic3RyaW5nXCIgPT0gdHlwZW9mIHMucmVzcG9uc2VUZXh0ID8ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IHMucmVzcG9uc2VUZXh0XG4gICAgICAgICAgICAgICAgICAgICAgICB9IDogdW5kZWZpbmVkLCBzLmdldEFsbFJlc3BvbnNlSGVhZGVycygpKSk7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSwgcy5vbmxvYWQgPSB0KCksIHMub25lcnJvciA9IHQoXCJlcnJvclwiKSwgdCA9IHZuW28gPSB5bisrXSA9IHQoXCJhYm9ydFwiKSwgcy5zZW5kKGUuaGFzQ29udGVudCAmJiBlLmRhdGEgfHwgbnVsbCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYWJvcnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHQgJiYgdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IDogdW5kZWZpbmVkO1xuICAgIH0pO1xuICAgIHZhciB4biwgYm4sIHduID0gL14oPzp0b2dnbGV8c2hvd3xoaWRlKSQvLCBUbiA9IFJlZ0V4cChcIl4oPzooWystXSk9fCkoXCIgKyBiICsgXCIpKFthLXolXSopJFwiLCBcImlcIiksIENuID0gL3F1ZXVlSG9va3MkLywga24gPSBbIEFuIF0sIE5uID0ge1xuICAgICAgICBcIipcIjogWyBmdW5jdGlvbihlLCB0KSB7XG4gICAgICAgICAgICB2YXIgbiA9IHRoaXMuY3JlYXRlVHdlZW4oZSwgdCksIHIgPSBuLmN1cigpLCBpID0gVG4uZXhlYyh0KSwgbyA9IGkgJiYgaVszXSB8fCAoeC5jc3NOdW1iZXJbZV0gPyBcIlwiIDogXCJweFwiKSwgcyA9ICh4LmNzc051bWJlcltlXSB8fCBcInB4XCIgIT09IG8gJiYgK3IpICYmIFRuLmV4ZWMoeC5jc3Mobi5lbGVtLCBlKSksIGEgPSAxLCB1ID0gMjA7XG4gICAgICAgICAgICBpZiAocyAmJiBzWzNdICE9PSBvKSB7XG4gICAgICAgICAgICAgICAgbyA9IG8gfHwgc1szXSwgaSA9IGkgfHwgW10sIHMgPSArciB8fCAxO1xuICAgICAgICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgICAgICAgICAgYSA9IGEgfHwgXCIuNVwiLCBzIC89IGEsIHguc3R5bGUobi5lbGVtLCBlLCBzICsgbyk7XG4gICAgICAgICAgICAgICAgfSB3aGlsZSAoYSAhPT0gKGEgPSBuLmN1cigpIC8gcikgJiYgMSAhPT0gYSAmJiAtLXUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGkgJiYgKHMgPSBuLnN0YXJ0ID0gK3MgfHwgK3IgfHwgMCwgbi51bml0ID0gbywgbi5lbmQgPSBpWzFdID8gcyArIChpWzFdICsgMSkgKiBpWzJdIDogK2lbMl0pLCBcbiAgICAgICAgICAgIG47XG4gICAgICAgIH0gXVxuICAgIH07XG4gICAgZnVuY3Rpb24gRW4oKSB7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgeG4gPSB1bmRlZmluZWQ7XG4gICAgICAgIH0pLCB4biA9IHgubm93KCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIFNuKGUsIHQsIG4pIHtcbiAgICAgICAgdmFyIHIsIGkgPSAoTm5bdF0gfHwgW10pLmNvbmNhdChObltcIipcIl0pLCBvID0gMCwgcyA9IGkubGVuZ3RoO1xuICAgICAgICBmb3IgKDtzID4gbzsgbysrKSBpZiAociA9IGlbb10uY2FsbChuLCB0LCBlKSkgcmV0dXJuIHI7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGpuKGUsIHQsIG4pIHtcbiAgICAgICAgdmFyIHIsIGksIG8gPSAwLCBzID0ga24ubGVuZ3RoLCBhID0geC5EZWZlcnJlZCgpLmFsd2F5cyhmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGRlbGV0ZSB1LmVsZW07XG4gICAgICAgIH0pLCB1ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoaSkgcmV0dXJuICExO1xuICAgICAgICAgICAgdmFyIHQgPSB4biB8fCBFbigpLCBuID0gTWF0aC5tYXgoMCwgbC5zdGFydFRpbWUgKyBsLmR1cmF0aW9uIC0gdCksIHIgPSBuIC8gbC5kdXJhdGlvbiB8fCAwLCBvID0gMSAtIHIsIHMgPSAwLCB1ID0gbC50d2VlbnMubGVuZ3RoO1xuICAgICAgICAgICAgZm9yICg7dSA+IHM7IHMrKykgbC50d2VlbnNbc10ucnVuKG8pO1xuICAgICAgICAgICAgcmV0dXJuIGEubm90aWZ5V2l0aChlLCBbIGwsIG8sIG4gXSksIDEgPiBvICYmIHUgPyBuIDogKGEucmVzb2x2ZVdpdGgoZSwgWyBsIF0pLCBcbiAgICAgICAgICAgICExKTtcbiAgICAgICAgfSwgbCA9IGEucHJvbWlzZSh7XG4gICAgICAgICAgICBlbGVtOiBlLFxuICAgICAgICAgICAgcHJvcHM6IHguZXh0ZW5kKHt9LCB0KSxcbiAgICAgICAgICAgIG9wdHM6IHguZXh0ZW5kKCEwLCB7XG4gICAgICAgICAgICAgICAgc3BlY2lhbEVhc2luZzoge31cbiAgICAgICAgICAgIH0sIG4pLFxuICAgICAgICAgICAgb3JpZ2luYWxQcm9wZXJ0aWVzOiB0LFxuICAgICAgICAgICAgb3JpZ2luYWxPcHRpb25zOiBuLFxuICAgICAgICAgICAgc3RhcnRUaW1lOiB4biB8fCBFbigpLFxuICAgICAgICAgICAgZHVyYXRpb246IG4uZHVyYXRpb24sXG4gICAgICAgICAgICB0d2VlbnM6IFtdLFxuICAgICAgICAgICAgY3JlYXRlVHdlZW46IGZ1bmN0aW9uKHQsIG4pIHtcbiAgICAgICAgICAgICAgICB2YXIgciA9IHguVHdlZW4oZSwgbC5vcHRzLCB0LCBuLCBsLm9wdHMuc3BlY2lhbEVhc2luZ1t0XSB8fCBsLm9wdHMuZWFzaW5nKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbC50d2VlbnMucHVzaChyKSwgcjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdG9wOiBmdW5jdGlvbih0KSB7XG4gICAgICAgICAgICAgICAgdmFyIG4gPSAwLCByID0gdCA/IGwudHdlZW5zLmxlbmd0aCA6IDA7XG4gICAgICAgICAgICAgICAgaWYgKGkpIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgICAgIGZvciAoaSA9ICEwOyByID4gbjsgbisrKSBsLnR3ZWVuc1tuXS5ydW4oMSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHQgPyBhLnJlc29sdmVXaXRoKGUsIFsgbCwgdCBdKSA6IGEucmVqZWN0V2l0aChlLCBbIGwsIHQgXSksIHRoaXM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLCBjID0gbC5wcm9wcztcbiAgICAgICAgZm9yIChEbihjLCBsLm9wdHMuc3BlY2lhbEVhc2luZyk7IHMgPiBvOyBvKyspIGlmIChyID0ga25bb10uY2FsbChsLCBlLCBjLCBsLm9wdHMpKSByZXR1cm4gcjtcbiAgICAgICAgcmV0dXJuIHgubWFwKGMsIFNuLCBsKSwgeC5pc0Z1bmN0aW9uKGwub3B0cy5zdGFydCkgJiYgbC5vcHRzLnN0YXJ0LmNhbGwoZSwgbCksIHguZngudGltZXIoeC5leHRlbmQodSwge1xuICAgICAgICAgICAgZWxlbTogZSxcbiAgICAgICAgICAgIGFuaW06IGwsXG4gICAgICAgICAgICBxdWV1ZTogbC5vcHRzLnF1ZXVlXG4gICAgICAgIH0pKSwgbC5wcm9ncmVzcyhsLm9wdHMucHJvZ3Jlc3MpLmRvbmUobC5vcHRzLmRvbmUsIGwub3B0cy5jb21wbGV0ZSkuZmFpbChsLm9wdHMuZmFpbCkuYWx3YXlzKGwub3B0cy5hbHdheXMpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBEbihlLCB0KSB7XG4gICAgICAgIHZhciBuLCByLCBpLCBvLCBzO1xuICAgICAgICBmb3IgKG4gaW4gZSkgaWYgKHIgPSB4LmNhbWVsQ2FzZShuKSwgaSA9IHRbcl0sIG8gPSBlW25dLCB4LmlzQXJyYXkobykgJiYgKGkgPSBvWzFdLCBcbiAgICAgICAgbyA9IGVbbl0gPSBvWzBdKSwgbiAhPT0gciAmJiAoZVtyXSA9IG8sIGRlbGV0ZSBlW25dKSwgcyA9IHguY3NzSG9va3Nbcl0sIHMgJiYgXCJleHBhbmRcIiBpbiBzKSB7XG4gICAgICAgICAgICBvID0gcy5leHBhbmQobyksIGRlbGV0ZSBlW3JdO1xuICAgICAgICAgICAgZm9yIChuIGluIG8pIG4gaW4gZSB8fCAoZVtuXSA9IG9bbl0sIHRbbl0gPSBpKTtcbiAgICAgICAgfSBlbHNlIHRbcl0gPSBpO1xuICAgIH1cbiAgICB4LkFuaW1hdGlvbiA9IHguZXh0ZW5kKGpuLCB7XG4gICAgICAgIHR3ZWVuZXI6IGZ1bmN0aW9uKGUsIHQpIHtcbiAgICAgICAgICAgIHguaXNGdW5jdGlvbihlKSA/ICh0ID0gZSwgZSA9IFsgXCIqXCIgXSkgOiBlID0gZS5zcGxpdChcIiBcIik7XG4gICAgICAgICAgICB2YXIgbiwgciA9IDAsIGkgPSBlLmxlbmd0aDtcbiAgICAgICAgICAgIGZvciAoO2kgPiByOyByKyspIG4gPSBlW3JdLCBObltuXSA9IE5uW25dIHx8IFtdLCBObltuXS51bnNoaWZ0KHQpO1xuICAgICAgICB9LFxuICAgICAgICBwcmVmaWx0ZXI6IGZ1bmN0aW9uKGUsIHQpIHtcbiAgICAgICAgICAgIHQgPyBrbi51bnNoaWZ0KGUpIDoga24ucHVzaChlKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGZ1bmN0aW9uIEFuKGUsIHQsIG4pIHtcbiAgICAgICAgdmFyIHIsIGksIG8sIHMsIGEsIHUsIGwgPSB0aGlzLCBjID0ge30sIHAgPSBlLnN0eWxlLCBmID0gZS5ub2RlVHlwZSAmJiBMdChlKSwgaCA9IHEuZ2V0KGUsIFwiZnhzaG93XCIpO1xuICAgICAgICBuLnF1ZXVlIHx8IChhID0geC5fcXVldWVIb29rcyhlLCBcImZ4XCIpLCBudWxsID09IGEudW5xdWV1ZWQgJiYgKGEudW5xdWV1ZWQgPSAwLCB1ID0gYS5lbXB0eS5maXJlLCBcbiAgICAgICAgYS5lbXB0eS5maXJlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBhLnVucXVldWVkIHx8IHUoKTtcbiAgICAgICAgfSksIGEudW5xdWV1ZWQrKywgbC5hbHdheXMoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsLmFsd2F5cyhmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBhLnVucXVldWVkLS0sIHgucXVldWUoZSwgXCJmeFwiKS5sZW5ndGggfHwgYS5lbXB0eS5maXJlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSkpLCAxID09PSBlLm5vZGVUeXBlICYmIChcImhlaWdodFwiIGluIHQgfHwgXCJ3aWR0aFwiIGluIHQpICYmIChuLm92ZXJmbG93ID0gWyBwLm92ZXJmbG93LCBwLm92ZXJmbG93WCwgcC5vdmVyZmxvd1kgXSwgXG4gICAgICAgIFwiaW5saW5lXCIgPT09IHguY3NzKGUsIFwiZGlzcGxheVwiKSAmJiBcIm5vbmVcIiA9PT0geC5jc3MoZSwgXCJmbG9hdFwiKSAmJiAocC5kaXNwbGF5ID0gXCJpbmxpbmUtYmxvY2tcIikpLCBcbiAgICAgICAgbi5vdmVyZmxvdyAmJiAocC5vdmVyZmxvdyA9IFwiaGlkZGVuXCIsIGwuYWx3YXlzKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcC5vdmVyZmxvdyA9IG4ub3ZlcmZsb3dbMF0sIHAub3ZlcmZsb3dYID0gbi5vdmVyZmxvd1sxXSwgcC5vdmVyZmxvd1kgPSBuLm92ZXJmbG93WzJdO1xuICAgICAgICB9KSk7XG4gICAgICAgIGZvciAociBpbiB0KSBpZiAoaSA9IHRbcl0sIHduLmV4ZWMoaSkpIHtcbiAgICAgICAgICAgIGlmIChkZWxldGUgdFtyXSwgbyA9IG8gfHwgXCJ0b2dnbGVcIiA9PT0gaSwgaSA9PT0gKGYgPyBcImhpZGVcIiA6IFwic2hvd1wiKSkge1xuICAgICAgICAgICAgICAgIGlmIChcInNob3dcIiAhPT0gaSB8fCAhaCB8fCBoW3JdID09PSB1bmRlZmluZWQpIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGYgPSAhMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNbcl0gPSBoICYmIGhbcl0gfHwgeC5zdHlsZShlLCByKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXguaXNFbXB0eU9iamVjdChjKSkge1xuICAgICAgICAgICAgaCA/IFwiaGlkZGVuXCIgaW4gaCAmJiAoZiA9IGguaGlkZGVuKSA6IGggPSBxLmFjY2VzcyhlLCBcImZ4c2hvd1wiLCB7fSksIG8gJiYgKGguaGlkZGVuID0gIWYpLCBcbiAgICAgICAgICAgIGYgPyB4KGUpLnNob3coKSA6IGwuZG9uZShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB4KGUpLmhpZGUoKTtcbiAgICAgICAgICAgIH0pLCBsLmRvbmUoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIHQ7XG4gICAgICAgICAgICAgICAgcS5yZW1vdmUoZSwgXCJmeHNob3dcIik7XG4gICAgICAgICAgICAgICAgZm9yICh0IGluIGMpIHguc3R5bGUoZSwgdCwgY1t0XSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGZvciAociBpbiBjKSBzID0gU24oZiA/IGhbcl0gOiAwLCByLCBsKSwgciBpbiBoIHx8IChoW3JdID0gcy5zdGFydCwgZiAmJiAocy5lbmQgPSBzLnN0YXJ0LCBcbiAgICAgICAgICAgIHMuc3RhcnQgPSBcIndpZHRoXCIgPT09IHIgfHwgXCJoZWlnaHRcIiA9PT0gciA/IDEgOiAwKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gTG4oZSwgdCwgbiwgciwgaSkge1xuICAgICAgICByZXR1cm4gbmV3IExuLnByb3RvdHlwZS5pbml0KGUsIHQsIG4sIHIsIGkpO1xuICAgIH1cbiAgICB4LlR3ZWVuID0gTG4sIExuLnByb3RvdHlwZSA9IHtcbiAgICAgICAgY29uc3RydWN0b3I6IExuLFxuICAgICAgICBpbml0OiBmdW5jdGlvbihlLCB0LCBuLCByLCBpLCBvKSB7XG4gICAgICAgICAgICB0aGlzLmVsZW0gPSBlLCB0aGlzLnByb3AgPSBuLCB0aGlzLmVhc2luZyA9IGkgfHwgXCJzd2luZ1wiLCB0aGlzLm9wdGlvbnMgPSB0LCB0aGlzLnN0YXJ0ID0gdGhpcy5ub3cgPSB0aGlzLmN1cigpLCBcbiAgICAgICAgICAgIHRoaXMuZW5kID0gciwgdGhpcy51bml0ID0gbyB8fCAoeC5jc3NOdW1iZXJbbl0gPyBcIlwiIDogXCJweFwiKTtcbiAgICAgICAgfSxcbiAgICAgICAgY3VyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBlID0gTG4ucHJvcEhvb2tzW3RoaXMucHJvcF07XG4gICAgICAgICAgICByZXR1cm4gZSAmJiBlLmdldCA/IGUuZ2V0KHRoaXMpIDogTG4ucHJvcEhvb2tzLl9kZWZhdWx0LmdldCh0aGlzKTtcbiAgICAgICAgfSxcbiAgICAgICAgcnVuOiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICB2YXIgdCwgbiA9IExuLnByb3BIb29rc1t0aGlzLnByb3BdO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucG9zID0gdCA9IHRoaXMub3B0aW9ucy5kdXJhdGlvbiA/IHguZWFzaW5nW3RoaXMuZWFzaW5nXShlLCB0aGlzLm9wdGlvbnMuZHVyYXRpb24gKiBlLCAwLCAxLCB0aGlzLm9wdGlvbnMuZHVyYXRpb24pIDogZSwgXG4gICAgICAgICAgICB0aGlzLm5vdyA9ICh0aGlzLmVuZCAtIHRoaXMuc3RhcnQpICogdCArIHRoaXMuc3RhcnQsIHRoaXMub3B0aW9ucy5zdGVwICYmIHRoaXMub3B0aW9ucy5zdGVwLmNhbGwodGhpcy5lbGVtLCB0aGlzLm5vdywgdGhpcyksIFxuICAgICAgICAgICAgbiAmJiBuLnNldCA/IG4uc2V0KHRoaXMpIDogTG4ucHJvcEhvb2tzLl9kZWZhdWx0LnNldCh0aGlzKSwgdGhpcztcbiAgICAgICAgfVxuICAgIH0sIExuLnByb3RvdHlwZS5pbml0LnByb3RvdHlwZSA9IExuLnByb3RvdHlwZSwgTG4ucHJvcEhvb2tzID0ge1xuICAgICAgICBfZGVmYXVsdDoge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGwgPT0gZS5lbGVtW2UucHJvcF0gfHwgZS5lbGVtLnN0eWxlICYmIG51bGwgIT0gZS5lbGVtLnN0eWxlW2UucHJvcF0gPyAodCA9IHguY3NzKGUuZWxlbSwgZS5wcm9wLCBcIlwiKSwgXG4gICAgICAgICAgICAgICAgdCAmJiBcImF1dG9cIiAhPT0gdCA/IHQgOiAwKSA6IGUuZWxlbVtlLnByb3BdO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgIHguZnguc3RlcFtlLnByb3BdID8geC5meC5zdGVwW2UucHJvcF0oZSkgOiBlLmVsZW0uc3R5bGUgJiYgKG51bGwgIT0gZS5lbGVtLnN0eWxlW3guY3NzUHJvcHNbZS5wcm9wXV0gfHwgeC5jc3NIb29rc1tlLnByb3BdKSA/IHguc3R5bGUoZS5lbGVtLCBlLnByb3AsIGUubm93ICsgZS51bml0KSA6IGUuZWxlbVtlLnByb3BdID0gZS5ub3c7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LCBMbi5wcm9wSG9va3Muc2Nyb2xsVG9wID0gTG4ucHJvcEhvb2tzLnNjcm9sbExlZnQgPSB7XG4gICAgICAgIHNldDogZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgZS5lbGVtLm5vZGVUeXBlICYmIGUuZWxlbS5wYXJlbnROb2RlICYmIChlLmVsZW1bZS5wcm9wXSA9IGUubm93KTtcbiAgICAgICAgfVxuICAgIH0sIHguZWFjaChbIFwidG9nZ2xlXCIsIFwic2hvd1wiLCBcImhpZGVcIiBdLCBmdW5jdGlvbihlLCB0KSB7XG4gICAgICAgIHZhciBuID0geC5mblt0XTtcbiAgICAgICAgeC5mblt0XSA9IGZ1bmN0aW9uKGUsIHIsIGkpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsID09IGUgfHwgXCJib29sZWFuXCIgPT0gdHlwZW9mIGUgPyBuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgOiB0aGlzLmFuaW1hdGUocW4odCwgITApLCBlLCByLCBpKTtcbiAgICAgICAgfTtcbiAgICB9KSwgeC5mbi5leHRlbmQoe1xuICAgICAgICBmYWRlVG86IGZ1bmN0aW9uKGUsIHQsIG4sIHIpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZpbHRlcihMdCkuY3NzKFwib3BhY2l0eVwiLCAwKS5zaG93KCkuZW5kKCkuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgb3BhY2l0eTogdFxuICAgICAgICAgICAgfSwgZSwgbiwgcik7XG4gICAgICAgIH0sXG4gICAgICAgIGFuaW1hdGU6IGZ1bmN0aW9uKGUsIHQsIG4sIHIpIHtcbiAgICAgICAgICAgIHZhciBpID0geC5pc0VtcHR5T2JqZWN0KGUpLCBvID0geC5zcGVlZCh0LCBuLCByKSwgcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciB0ID0gam4odGhpcywgeC5leHRlbmQoe30sIGUpLCBvKTtcbiAgICAgICAgICAgICAgICAoaSB8fCBxLmdldCh0aGlzLCBcImZpbmlzaFwiKSkgJiYgdC5zdG9wKCEwKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXR1cm4gcy5maW5pc2ggPSBzLCBpIHx8IG8ucXVldWUgPT09ICExID8gdGhpcy5lYWNoKHMpIDogdGhpcy5xdWV1ZShvLnF1ZXVlLCBzKTtcbiAgICAgICAgfSxcbiAgICAgICAgc3RvcDogZnVuY3Rpb24oZSwgdCwgbikge1xuICAgICAgICAgICAgdmFyIHIgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHQgPSBlLnN0b3A7XG4gICAgICAgICAgICAgICAgZGVsZXRlIGUuc3RvcCwgdChuKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXR1cm4gXCJzdHJpbmdcIiAhPSB0eXBlb2YgZSAmJiAobiA9IHQsIHQgPSBlLCBlID0gdW5kZWZpbmVkKSwgdCAmJiBlICE9PSAhMSAmJiB0aGlzLnF1ZXVlKGUgfHwgXCJmeFwiLCBbXSksIFxuICAgICAgICAgICAgdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciB0ID0gITAsIGkgPSBudWxsICE9IGUgJiYgZSArIFwicXVldWVIb29rc1wiLCBvID0geC50aW1lcnMsIHMgPSBxLmdldCh0aGlzKTtcbiAgICAgICAgICAgICAgICBpZiAoaSkgc1tpXSAmJiBzW2ldLnN0b3AgJiYgcihzW2ldKTsgZWxzZSBmb3IgKGkgaW4gcykgc1tpXSAmJiBzW2ldLnN0b3AgJiYgQ24udGVzdChpKSAmJiByKHNbaV0pO1xuICAgICAgICAgICAgICAgIGZvciAoaSA9IG8ubGVuZ3RoOyBpLS07ICkgb1tpXS5lbGVtICE9PSB0aGlzIHx8IG51bGwgIT0gZSAmJiBvW2ldLnF1ZXVlICE9PSBlIHx8IChvW2ldLmFuaW0uc3RvcChuKSwgXG4gICAgICAgICAgICAgICAgdCA9ICExLCBvLnNwbGljZShpLCAxKSk7XG4gICAgICAgICAgICAgICAgKHQgfHwgIW4pICYmIHguZGVxdWV1ZSh0aGlzLCBlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBmaW5pc2g6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIHJldHVybiBlICE9PSAhMSAmJiAoZSA9IGUgfHwgXCJmeFwiKSwgdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciB0LCBuID0gcS5nZXQodGhpcyksIHIgPSBuW2UgKyBcInF1ZXVlXCJdLCBpID0gbltlICsgXCJxdWV1ZUhvb2tzXCJdLCBvID0geC50aW1lcnMsIHMgPSByID8gci5sZW5ndGggOiAwO1xuICAgICAgICAgICAgICAgIGZvciAobi5maW5pc2ggPSAhMCwgeC5xdWV1ZSh0aGlzLCBlLCBbXSksIGkgJiYgaS5zdG9wICYmIGkuc3RvcC5jYWxsKHRoaXMsICEwKSwgXG4gICAgICAgICAgICAgICAgdCA9IG8ubGVuZ3RoOyB0LS07ICkgb1t0XS5lbGVtID09PSB0aGlzICYmIG9bdF0ucXVldWUgPT09IGUgJiYgKG9bdF0uYW5pbS5zdG9wKCEwKSwgXG4gICAgICAgICAgICAgICAgby5zcGxpY2UodCwgMSkpO1xuICAgICAgICAgICAgICAgIGZvciAodCA9IDA7IHMgPiB0OyB0KyspIHJbdF0gJiYgclt0XS5maW5pc2ggJiYgclt0XS5maW5pc2guY2FsbCh0aGlzKTtcbiAgICAgICAgICAgICAgICBkZWxldGUgbi5maW5pc2g7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGZ1bmN0aW9uIHFuKGUsIHQpIHtcbiAgICAgICAgdmFyIG4sIHIgPSB7XG4gICAgICAgICAgICBoZWlnaHQ6IGVcbiAgICAgICAgfSwgaSA9IDA7XG4gICAgICAgIGZvciAodCA9IHQgPyAxIDogMDsgNCA+IGk7IGkgKz0gMiAtIHQpIG4gPSBqdFtpXSwgcltcIm1hcmdpblwiICsgbl0gPSByW1wicGFkZGluZ1wiICsgbl0gPSBlO1xuICAgICAgICByZXR1cm4gdCAmJiAoci5vcGFjaXR5ID0gci53aWR0aCA9IGUpLCByO1xuICAgIH1cbiAgICB4LmVhY2goe1xuICAgICAgICBzbGlkZURvd246IHFuKFwic2hvd1wiKSxcbiAgICAgICAgc2xpZGVVcDogcW4oXCJoaWRlXCIpLFxuICAgICAgICBzbGlkZVRvZ2dsZTogcW4oXCJ0b2dnbGVcIiksXG4gICAgICAgIGZhZGVJbjoge1xuICAgICAgICAgICAgb3BhY2l0eTogXCJzaG93XCJcbiAgICAgICAgfSxcbiAgICAgICAgZmFkZU91dDoge1xuICAgICAgICAgICAgb3BhY2l0eTogXCJoaWRlXCJcbiAgICAgICAgfSxcbiAgICAgICAgZmFkZVRvZ2dsZToge1xuICAgICAgICAgICAgb3BhY2l0eTogXCJ0b2dnbGVcIlxuICAgICAgICB9XG4gICAgfSwgZnVuY3Rpb24oZSwgdCkge1xuICAgICAgICB4LmZuW2VdID0gZnVuY3Rpb24oZSwgbiwgcikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYW5pbWF0ZSh0LCBlLCBuLCByKTtcbiAgICAgICAgfTtcbiAgICB9KSwgeC5zcGVlZCA9IGZ1bmN0aW9uKGUsIHQsIG4pIHtcbiAgICAgICAgdmFyIHIgPSBlICYmIFwib2JqZWN0XCIgPT0gdHlwZW9mIGUgPyB4LmV4dGVuZCh7fSwgZSkgOiB7XG4gICAgICAgICAgICBjb21wbGV0ZTogbiB8fCAhbiAmJiB0IHx8IHguaXNGdW5jdGlvbihlKSAmJiBlLFxuICAgICAgICAgICAgZHVyYXRpb246IGUsXG4gICAgICAgICAgICBlYXNpbmc6IG4gJiYgdCB8fCB0ICYmICF4LmlzRnVuY3Rpb24odCkgJiYgdFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gci5kdXJhdGlvbiA9IHguZngub2ZmID8gMCA6IFwibnVtYmVyXCIgPT0gdHlwZW9mIHIuZHVyYXRpb24gPyByLmR1cmF0aW9uIDogci5kdXJhdGlvbiBpbiB4LmZ4LnNwZWVkcyA/IHguZnguc3BlZWRzW3IuZHVyYXRpb25dIDogeC5meC5zcGVlZHMuX2RlZmF1bHQsIFxuICAgICAgICAobnVsbCA9PSByLnF1ZXVlIHx8IHIucXVldWUgPT09ICEwKSAmJiAoci5xdWV1ZSA9IFwiZnhcIiksIHIub2xkID0gci5jb21wbGV0ZSwgci5jb21wbGV0ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgeC5pc0Z1bmN0aW9uKHIub2xkKSAmJiByLm9sZC5jYWxsKHRoaXMpLCByLnF1ZXVlICYmIHguZGVxdWV1ZSh0aGlzLCByLnF1ZXVlKTtcbiAgICAgICAgfSwgcjtcbiAgICB9LCB4LmVhc2luZyA9IHtcbiAgICAgICAgbGluZWFyOiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICByZXR1cm4gZTtcbiAgICAgICAgfSxcbiAgICAgICAgc3dpbmc6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIHJldHVybiAuNSAtIE1hdGguY29zKGUgKiBNYXRoLlBJKSAvIDI7XG4gICAgICAgIH1cbiAgICB9LCB4LnRpbWVycyA9IFtdLCB4LmZ4ID0gTG4ucHJvdG90eXBlLmluaXQsIHguZngudGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZSwgdCA9IHgudGltZXJzLCBuID0gMDtcbiAgICAgICAgZm9yICh4biA9IHgubm93KCk7IHQubGVuZ3RoID4gbjsgbisrKSBlID0gdFtuXSwgZSgpIHx8IHRbbl0gIT09IGUgfHwgdC5zcGxpY2Uobi0tLCAxKTtcbiAgICAgICAgdC5sZW5ndGggfHwgeC5meC5zdG9wKCksIHhuID0gdW5kZWZpbmVkO1xuICAgIH0sIHguZngudGltZXIgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgIGUoKSAmJiB4LnRpbWVycy5wdXNoKGUpICYmIHguZnguc3RhcnQoKTtcbiAgICB9LCB4LmZ4LmludGVydmFsID0gMTMsIHguZnguc3RhcnQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgYm4gfHwgKGJuID0gc2V0SW50ZXJ2YWwoeC5meC50aWNrLCB4LmZ4LmludGVydmFsKSk7XG4gICAgfSwgeC5meC5zdG9wID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwoYm4pLCBibiA9IG51bGw7XG4gICAgfSwgeC5meC5zcGVlZHMgPSB7XG4gICAgICAgIHNsb3c6IDYwMCxcbiAgICAgICAgZmFzdDogMjAwLFxuICAgICAgICBfZGVmYXVsdDogNDAwXG4gICAgfSwgeC5meC5zdGVwID0ge30sIHguZXhwciAmJiB4LmV4cHIuZmlsdGVycyAmJiAoeC5leHByLmZpbHRlcnMuYW5pbWF0ZWQgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgIHJldHVybiB4LmdyZXAoeC50aW1lcnMsIGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgICAgIHJldHVybiBlID09PSB0LmVsZW07XG4gICAgICAgIH0pLmxlbmd0aDtcbiAgICB9KSwgeC5mbi5vZmZzZXQgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gZSA9PT0gdW5kZWZpbmVkID8gdGhpcyA6IHRoaXMuZWFjaChmdW5jdGlvbih0KSB7XG4gICAgICAgICAgICB4Lm9mZnNldC5zZXRPZmZzZXQodGhpcywgZSwgdCk7XG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgdCwgbiwgaSA9IHRoaXNbMF0sIG8gPSB7XG4gICAgICAgICAgICB0b3A6IDAsXG4gICAgICAgICAgICBsZWZ0OiAwXG4gICAgICAgIH0sIHMgPSBpICYmIGkub3duZXJEb2N1bWVudDtcbiAgICAgICAgaWYgKHMpIHJldHVybiB0ID0gcy5kb2N1bWVudEVsZW1lbnQsIHguY29udGFpbnModCwgaSkgPyAodHlwZW9mIGkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0ICE9PSByICYmIChvID0gaS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSksIFxuICAgICAgICBuID0gSG4ocyksIHtcbiAgICAgICAgICAgIHRvcDogby50b3AgKyBuLnBhZ2VZT2Zmc2V0IC0gdC5jbGllbnRUb3AsXG4gICAgICAgICAgICBsZWZ0OiBvLmxlZnQgKyBuLnBhZ2VYT2Zmc2V0IC0gdC5jbGllbnRMZWZ0XG4gICAgICAgIH0pIDogbztcbiAgICB9LCB4Lm9mZnNldCA9IHtcbiAgICAgICAgc2V0T2Zmc2V0OiBmdW5jdGlvbihlLCB0LCBuKSB7XG4gICAgICAgICAgICB2YXIgciwgaSwgbywgcywgYSwgdSwgbCwgYyA9IHguY3NzKGUsIFwicG9zaXRpb25cIiksIHAgPSB4KGUpLCBmID0ge307XG4gICAgICAgICAgICBcInN0YXRpY1wiID09PSBjICYmIChlLnN0eWxlLnBvc2l0aW9uID0gXCJyZWxhdGl2ZVwiKSwgYSA9IHAub2Zmc2V0KCksIG8gPSB4LmNzcyhlLCBcInRvcFwiKSwgXG4gICAgICAgICAgICB1ID0geC5jc3MoZSwgXCJsZWZ0XCIpLCBsID0gKFwiYWJzb2x1dGVcIiA9PT0gYyB8fCBcImZpeGVkXCIgPT09IGMpICYmIChvICsgdSkuaW5kZXhPZihcImF1dG9cIikgPiAtMSwgXG4gICAgICAgICAgICBsID8gKHIgPSBwLnBvc2l0aW9uKCksIHMgPSByLnRvcCwgaSA9IHIubGVmdCkgOiAocyA9IHBhcnNlRmxvYXQobykgfHwgMCwgaSA9IHBhcnNlRmxvYXQodSkgfHwgMCksIFxuICAgICAgICAgICAgeC5pc0Z1bmN0aW9uKHQpICYmICh0ID0gdC5jYWxsKGUsIG4sIGEpKSwgbnVsbCAhPSB0LnRvcCAmJiAoZi50b3AgPSB0LnRvcCAtIGEudG9wICsgcyksIFxuICAgICAgICAgICAgbnVsbCAhPSB0LmxlZnQgJiYgKGYubGVmdCA9IHQubGVmdCAtIGEubGVmdCArIGkpLCBcInVzaW5nXCIgaW4gdCA/IHQudXNpbmcuY2FsbChlLCBmKSA6IHAuY3NzKGYpO1xuICAgICAgICB9XG4gICAgfSwgeC5mbi5leHRlbmQoe1xuICAgICAgICBwb3NpdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAodGhpc1swXSkge1xuICAgICAgICAgICAgICAgIHZhciBlLCB0LCBuID0gdGhpc1swXSwgciA9IHtcbiAgICAgICAgICAgICAgICAgICAgdG9wOiAwLFxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiAwXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJmaXhlZFwiID09PSB4LmNzcyhuLCBcInBvc2l0aW9uXCIpID8gdCA9IG4uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkgOiAoZSA9IHRoaXMub2Zmc2V0UGFyZW50KCksIFxuICAgICAgICAgICAgICAgIHQgPSB0aGlzLm9mZnNldCgpLCB4Lm5vZGVOYW1lKGVbMF0sIFwiaHRtbFwiKSB8fCAociA9IGUub2Zmc2V0KCkpLCByLnRvcCArPSB4LmNzcyhlWzBdLCBcImJvcmRlclRvcFdpZHRoXCIsICEwKSwgXG4gICAgICAgICAgICAgICAgci5sZWZ0ICs9IHguY3NzKGVbMF0sIFwiYm9yZGVyTGVmdFdpZHRoXCIsICEwKSksIHtcbiAgICAgICAgICAgICAgICAgICAgdG9wOiB0LnRvcCAtIHIudG9wIC0geC5jc3MobiwgXCJtYXJnaW5Ub3BcIiwgITApLFxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiB0LmxlZnQgLSByLmxlZnQgLSB4LmNzcyhuLCBcIm1hcmdpbkxlZnRcIiwgITApXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgb2Zmc2V0UGFyZW50OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgZSA9IHRoaXMub2Zmc2V0UGFyZW50IHx8IHM7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGUgJiYgIXgubm9kZU5hbWUoZSwgXCJodG1sXCIpICYmIFwic3RhdGljXCIgPT09IHguY3NzKGUsIFwicG9zaXRpb25cIikpIGUgPSBlLm9mZnNldFBhcmVudDtcbiAgICAgICAgICAgICAgICByZXR1cm4gZSB8fCBzO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KSwgeC5lYWNoKHtcbiAgICAgICAgc2Nyb2xsTGVmdDogXCJwYWdlWE9mZnNldFwiLFxuICAgICAgICBzY3JvbGxUb3A6IFwicGFnZVlPZmZzZXRcIlxuICAgIH0sIGZ1bmN0aW9uKHQsIG4pIHtcbiAgICAgICAgdmFyIHIgPSBcInBhZ2VZT2Zmc2V0XCIgPT09IG47XG4gICAgICAgIHguZm5bdF0gPSBmdW5jdGlvbihpKSB7XG4gICAgICAgICAgICByZXR1cm4geC5hY2Nlc3ModGhpcywgZnVuY3Rpb24odCwgaSwgbykge1xuICAgICAgICAgICAgICAgIHZhciBzID0gSG4odCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG8gPT09IHVuZGVmaW5lZCA/IHMgPyBzW25dIDogdFtpXSA6IChzID8gcy5zY3JvbGxUbyhyID8gZS5wYWdlWE9mZnNldCA6IG8sIHIgPyBvIDogZS5wYWdlWU9mZnNldCkgOiB0W2ldID0gbywgXG4gICAgICAgICAgICAgICAgdW5kZWZpbmVkKTtcbiAgICAgICAgICAgIH0sIHQsIGksIGFyZ3VtZW50cy5sZW5ndGgsIG51bGwpO1xuICAgICAgICB9O1xuICAgIH0pO1xuICAgIGZ1bmN0aW9uIEhuKGUpIHtcbiAgICAgICAgcmV0dXJuIHguaXNXaW5kb3coZSkgPyBlIDogOSA9PT0gZS5ub2RlVHlwZSAmJiBlLmRlZmF1bHRWaWV3O1xuICAgIH1cbiAgICB4LmVhY2goe1xuICAgICAgICBIZWlnaHQ6IFwiaGVpZ2h0XCIsXG4gICAgICAgIFdpZHRoOiBcIndpZHRoXCJcbiAgICB9LCBmdW5jdGlvbihlLCB0KSB7XG4gICAgICAgIHguZWFjaCh7XG4gICAgICAgICAgICBwYWRkaW5nOiBcImlubmVyXCIgKyBlLFxuICAgICAgICAgICAgY29udGVudDogdCxcbiAgICAgICAgICAgIFwiXCI6IFwib3V0ZXJcIiArIGVcbiAgICAgICAgfSwgZnVuY3Rpb24obiwgcikge1xuICAgICAgICAgICAgeC5mbltyXSA9IGZ1bmN0aW9uKHIsIGkpIHtcbiAgICAgICAgICAgICAgICB2YXIgbyA9IGFyZ3VtZW50cy5sZW5ndGggJiYgKG4gfHwgXCJib29sZWFuXCIgIT0gdHlwZW9mIHIpLCBzID0gbiB8fCAociA9PT0gITAgfHwgaSA9PT0gITAgPyBcIm1hcmdpblwiIDogXCJib3JkZXJcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHguYWNjZXNzKHRoaXMsIGZ1bmN0aW9uKHQsIG4sIHIpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB4LmlzV2luZG93KHQpID8gdC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnRbXCJjbGllbnRcIiArIGVdIDogOSA9PT0gdC5ub2RlVHlwZSA/IChpID0gdC5kb2N1bWVudEVsZW1lbnQsIFxuICAgICAgICAgICAgICAgICAgICBNYXRoLm1heCh0LmJvZHlbXCJzY3JvbGxcIiArIGVdLCBpW1wic2Nyb2xsXCIgKyBlXSwgdC5ib2R5W1wib2Zmc2V0XCIgKyBlXSwgaVtcIm9mZnNldFwiICsgZV0sIGlbXCJjbGllbnRcIiArIGVdKSkgOiByID09PSB1bmRlZmluZWQgPyB4LmNzcyh0LCBuLCBzKSA6IHguc3R5bGUodCwgbiwgciwgcyk7XG4gICAgICAgICAgICAgICAgfSwgdCwgbyA/IHIgOiB1bmRlZmluZWQsIG8sIG51bGwpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgfSksIHguZm4uc2l6ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5sZW5ndGg7XG4gICAgfSwgeC5mbi5hbmRTZWxmID0geC5mbi5hZGRCYWNrLCBcIm9iamVjdFwiID09IHR5cGVvZiBtb2R1bGUgJiYgbW9kdWxlICYmIFwib2JqZWN0XCIgPT0gdHlwZW9mIG1vZHVsZS5leHBvcnRzID8gbW9kdWxlLmV4cG9ydHMgPSB4IDogXCJmdW5jdGlvblwiID09IHR5cGVvZiBkZWZpbmUgJiYgZGVmaW5lLmFtZCAmJiBkZWZpbmUoXCJqcXVlcnlcIiwgW10sIGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4geDtcbiAgICB9KSwgXCJvYmplY3RcIiA9PSB0eXBlb2YgZSAmJiBcIm9iamVjdFwiID09IHR5cGVvZiBlLmRvY3VtZW50ICYmIChlLmpRdWVyeSA9IGUuJCA9IHgpO1xufSkod2luZG93KTtcblxuaWYgKFwidW5kZWZpbmVkXCIgPT0gdHlwZW9mIGpRdWVyeSkgdGhyb3cgbmV3IEVycm9yKFwiQm9vdHN0cmFwJ3MgSmF2YVNjcmlwdCByZXF1aXJlcyBqUXVlcnlcIik7XG5cbitmdW5jdGlvbihhKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgZnVuY3Rpb24gYigpIHtcbiAgICAgICAgdmFyIGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYm9vdHN0cmFwXCIpLCBiID0ge1xuICAgICAgICAgICAgV2Via2l0VHJhbnNpdGlvbjogXCJ3ZWJraXRUcmFuc2l0aW9uRW5kXCIsXG4gICAgICAgICAgICBNb3pUcmFuc2l0aW9uOiBcInRyYW5zaXRpb25lbmRcIixcbiAgICAgICAgICAgIE9UcmFuc2l0aW9uOiBcIm9UcmFuc2l0aW9uRW5kIG90cmFuc2l0aW9uZW5kXCIsXG4gICAgICAgICAgICB0cmFuc2l0aW9uOiBcInRyYW5zaXRpb25lbmRcIlxuICAgICAgICB9O1xuICAgICAgICBmb3IgKHZhciBjIGluIGIpIGlmICh2b2lkIDAgIT09IGEuc3R5bGVbY10pIHJldHVybiB7XG4gICAgICAgICAgICBlbmQ6IGJbY11cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuICExO1xuICAgIH1cbiAgICBhLmZuLmVtdWxhdGVUcmFuc2l0aW9uRW5kID0gZnVuY3Rpb24oYikge1xuICAgICAgICB2YXIgYyA9ICExLCBkID0gdGhpcztcbiAgICAgICAgYSh0aGlzKS5vbmUoXCJic1RyYW5zaXRpb25FbmRcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjID0gITA7XG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgYyB8fCBhKGQpLnRyaWdnZXIoYS5zdXBwb3J0LnRyYW5zaXRpb24uZW5kKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZSwgYiksIHRoaXM7XG4gICAgfSwgYShmdW5jdGlvbigpIHtcbiAgICAgICAgYS5zdXBwb3J0LnRyYW5zaXRpb24gPSBiKCksIGEuc3VwcG9ydC50cmFuc2l0aW9uICYmIChhLmV2ZW50LnNwZWNpYWwuYnNUcmFuc2l0aW9uRW5kID0ge1xuICAgICAgICAgICAgYmluZFR5cGU6IGEuc3VwcG9ydC50cmFuc2l0aW9uLmVuZCxcbiAgICAgICAgICAgIGRlbGVnYXRlVHlwZTogYS5zdXBwb3J0LnRyYW5zaXRpb24uZW5kLFxuICAgICAgICAgICAgaGFuZGxlOiBmdW5jdGlvbihiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGEoYi50YXJnZXQpLmlzKHRoaXMpID8gYi5oYW5kbGVPYmouaGFuZGxlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIDogdm9pZCAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbn0oalF1ZXJ5KSwgK2Z1bmN0aW9uKGEpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICBmdW5jdGlvbiBiKGIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBjID0gYSh0aGlzKSwgZSA9IGMuZGF0YShcImJzLmFsZXJ0XCIpO1xuICAgICAgICAgICAgZSB8fCBjLmRhdGEoXCJicy5hbGVydFwiLCBlID0gbmV3IGQodGhpcykpLCBcInN0cmluZ1wiID09IHR5cGVvZiBiICYmIGVbYl0uY2FsbChjKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHZhciBjID0gJ1tkYXRhLWRpc21pc3M9XCJhbGVydFwiXScsIGQgPSBmdW5jdGlvbihiKSB7XG4gICAgICAgIGEoYikub24oXCJjbGlja1wiLCBjLCB0aGlzLmNsb3NlKTtcbiAgICB9O1xuICAgIGQuVkVSU0lPTiA9IFwiMy4yLjBcIiwgZC5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbihiKSB7XG4gICAgICAgIGZ1bmN0aW9uIGMoKSB7XG4gICAgICAgICAgICBmLmRldGFjaCgpLnRyaWdnZXIoXCJjbG9zZWQuYnMuYWxlcnRcIikucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGQgPSBhKHRoaXMpLCBlID0gZC5hdHRyKFwiZGF0YS10YXJnZXRcIik7XG4gICAgICAgIGUgfHwgKGUgPSBkLmF0dHIoXCJocmVmXCIpLCBlID0gZSAmJiBlLnJlcGxhY2UoLy4qKD89I1teXFxzXSokKS8sIFwiXCIpKTtcbiAgICAgICAgdmFyIGYgPSBhKGUpO1xuICAgICAgICBiICYmIGIucHJldmVudERlZmF1bHQoKSwgZi5sZW5ndGggfHwgKGYgPSBkLmhhc0NsYXNzKFwiYWxlcnRcIikgPyBkIDogZC5wYXJlbnQoKSksIFxuICAgICAgICBmLnRyaWdnZXIoYiA9IGEuRXZlbnQoXCJjbG9zZS5icy5hbGVydFwiKSksIGIuaXNEZWZhdWx0UHJldmVudGVkKCkgfHwgKGYucmVtb3ZlQ2xhc3MoXCJpblwiKSwgXG4gICAgICAgIGEuc3VwcG9ydC50cmFuc2l0aW9uICYmIGYuaGFzQ2xhc3MoXCJmYWRlXCIpID8gZi5vbmUoXCJic1RyYW5zaXRpb25FbmRcIiwgYykuZW11bGF0ZVRyYW5zaXRpb25FbmQoMTUwKSA6IGMoKSk7XG4gICAgfTtcbiAgICB2YXIgZSA9IGEuZm4uYWxlcnQ7XG4gICAgYS5mbi5hbGVydCA9IGIsIGEuZm4uYWxlcnQuQ29uc3RydWN0b3IgPSBkLCBhLmZuLmFsZXJ0Lm5vQ29uZmxpY3QgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGEuZm4uYWxlcnQgPSBlLCB0aGlzO1xuICAgIH0sIGEoZG9jdW1lbnQpLm9uKFwiY2xpY2suYnMuYWxlcnQuZGF0YS1hcGlcIiwgYywgZC5wcm90b3R5cGUuY2xvc2UpO1xufShqUXVlcnkpLCArZnVuY3Rpb24oYSkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIGZ1bmN0aW9uIGIoYikge1xuICAgICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGQgPSBhKHRoaXMpLCBlID0gZC5kYXRhKFwiYnMuYnV0dG9uXCIpLCBmID0gXCJvYmplY3RcIiA9PSB0eXBlb2YgYiAmJiBiO1xuICAgICAgICAgICAgZSB8fCBkLmRhdGEoXCJicy5idXR0b25cIiwgZSA9IG5ldyBjKHRoaXMsIGYpKSwgXCJ0b2dnbGVcIiA9PSBiID8gZS50b2dnbGUoKSA6IGIgJiYgZS5zZXRTdGF0ZShiKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHZhciBjID0gZnVuY3Rpb24oYiwgZCkge1xuICAgICAgICB0aGlzLiRlbGVtZW50ID0gYShiKSwgdGhpcy5vcHRpb25zID0gYS5leHRlbmQoe30sIGMuREVGQVVMVFMsIGQpLCB0aGlzLmlzTG9hZGluZyA9ICExO1xuICAgIH07XG4gICAgYy5WRVJTSU9OID0gXCIzLjIuMFwiLCBjLkRFRkFVTFRTID0ge1xuICAgICAgICBsb2FkaW5nVGV4dDogXCJsb2FkaW5nLi4uXCJcbiAgICB9LCBjLnByb3RvdHlwZS5zZXRTdGF0ZSA9IGZ1bmN0aW9uKGIpIHtcbiAgICAgICAgdmFyIGMgPSBcImRpc2FibGVkXCIsIGQgPSB0aGlzLiRlbGVtZW50LCBlID0gZC5pcyhcImlucHV0XCIpID8gXCJ2YWxcIiA6IFwiaHRtbFwiLCBmID0gZC5kYXRhKCk7XG4gICAgICAgIGIgKz0gXCJUZXh0XCIsIG51bGwgPT0gZi5yZXNldFRleHQgJiYgZC5kYXRhKFwicmVzZXRUZXh0XCIsIGRbZV0oKSksIGRbZV0obnVsbCA9PSBmW2JdID8gdGhpcy5vcHRpb25zW2JdIDogZltiXSksIFxuICAgICAgICBzZXRUaW1lb3V0KGEucHJveHkoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBcImxvYWRpbmdUZXh0XCIgPT0gYiA/ICh0aGlzLmlzTG9hZGluZyA9ICEwLCBkLmFkZENsYXNzKGMpLmF0dHIoYywgYykpIDogdGhpcy5pc0xvYWRpbmcgJiYgKHRoaXMuaXNMb2FkaW5nID0gITEsIFxuICAgICAgICAgICAgZC5yZW1vdmVDbGFzcyhjKS5yZW1vdmVBdHRyKGMpKTtcbiAgICAgICAgfSwgdGhpcyksIDApO1xuICAgIH0sIGMucHJvdG90eXBlLnRvZ2dsZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgYSA9ICEwLCBiID0gdGhpcy4kZWxlbWVudC5jbG9zZXN0KCdbZGF0YS10b2dnbGU9XCJidXR0b25zXCJdJyk7XG4gICAgICAgIGlmIChiLmxlbmd0aCkge1xuICAgICAgICAgICAgdmFyIGMgPSB0aGlzLiRlbGVtZW50LmZpbmQoXCJpbnB1dFwiKTtcbiAgICAgICAgICAgIFwicmFkaW9cIiA9PSBjLnByb3AoXCJ0eXBlXCIpICYmIChjLnByb3AoXCJjaGVja2VkXCIpICYmIHRoaXMuJGVsZW1lbnQuaGFzQ2xhc3MoXCJhY3RpdmVcIikgPyBhID0gITEgOiBiLmZpbmQoXCIuYWN0aXZlXCIpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpKSwgXG4gICAgICAgICAgICBhICYmIGMucHJvcChcImNoZWNrZWRcIiwgIXRoaXMuJGVsZW1lbnQuaGFzQ2xhc3MoXCJhY3RpdmVcIikpLnRyaWdnZXIoXCJjaGFuZ2VcIik7XG4gICAgICAgIH1cbiAgICAgICAgYSAmJiB0aGlzLiRlbGVtZW50LnRvZ2dsZUNsYXNzKFwiYWN0aXZlXCIpO1xuICAgIH07XG4gICAgdmFyIGQgPSBhLmZuLmJ1dHRvbjtcbiAgICBhLmZuLmJ1dHRvbiA9IGIsIGEuZm4uYnV0dG9uLkNvbnN0cnVjdG9yID0gYywgYS5mbi5idXR0b24ubm9Db25mbGljdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gYS5mbi5idXR0b24gPSBkLCB0aGlzO1xuICAgIH0sIGEoZG9jdW1lbnQpLm9uKFwiY2xpY2suYnMuYnV0dG9uLmRhdGEtYXBpXCIsICdbZGF0YS10b2dnbGVePVwiYnV0dG9uXCJdJywgZnVuY3Rpb24oYykge1xuICAgICAgICB2YXIgZCA9IGEoYy50YXJnZXQpO1xuICAgICAgICBkLmhhc0NsYXNzKFwiYnRuXCIpIHx8IChkID0gZC5jbG9zZXN0KFwiLmJ0blwiKSksIGIuY2FsbChkLCBcInRvZ2dsZVwiKSwgYy5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0pO1xufShqUXVlcnkpLCArZnVuY3Rpb24oYSkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIGZ1bmN0aW9uIGIoYikge1xuICAgICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGQgPSBhKHRoaXMpLCBlID0gZC5kYXRhKFwiYnMuY2Fyb3VzZWxcIiksIGYgPSBhLmV4dGVuZCh7fSwgYy5ERUZBVUxUUywgZC5kYXRhKCksIFwib2JqZWN0XCIgPT0gdHlwZW9mIGIgJiYgYiksIGcgPSBcInN0cmluZ1wiID09IHR5cGVvZiBiID8gYiA6IGYuc2xpZGU7XG4gICAgICAgICAgICBlIHx8IGQuZGF0YShcImJzLmNhcm91c2VsXCIsIGUgPSBuZXcgYyh0aGlzLCBmKSksIFwibnVtYmVyXCIgPT0gdHlwZW9mIGIgPyBlLnRvKGIpIDogZyA/IGVbZ10oKSA6IGYuaW50ZXJ2YWwgJiYgZS5wYXVzZSgpLmN5Y2xlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICB2YXIgYyA9IGZ1bmN0aW9uKGIsIGMpIHtcbiAgICAgICAgdGhpcy4kZWxlbWVudCA9IGEoYikub24oXCJrZXlkb3duLmJzLmNhcm91c2VsXCIsIGEucHJveHkodGhpcy5rZXlkb3duLCB0aGlzKSksIHRoaXMuJGluZGljYXRvcnMgPSB0aGlzLiRlbGVtZW50LmZpbmQoXCIuY2Fyb3VzZWwtaW5kaWNhdG9yc1wiKSwgXG4gICAgICAgIHRoaXMub3B0aW9ucyA9IGMsIHRoaXMucGF1c2VkID0gdGhpcy5zbGlkaW5nID0gdGhpcy5pbnRlcnZhbCA9IHRoaXMuJGFjdGl2ZSA9IHRoaXMuJGl0ZW1zID0gbnVsbCwgXG4gICAgICAgIFwiaG92ZXJcIiA9PSB0aGlzLm9wdGlvbnMucGF1c2UgJiYgdGhpcy4kZWxlbWVudC5vbihcIm1vdXNlZW50ZXIuYnMuY2Fyb3VzZWxcIiwgYS5wcm94eSh0aGlzLnBhdXNlLCB0aGlzKSkub24oXCJtb3VzZWxlYXZlLmJzLmNhcm91c2VsXCIsIGEucHJveHkodGhpcy5jeWNsZSwgdGhpcykpO1xuICAgIH07XG4gICAgYy5WRVJTSU9OID0gXCIzLjIuMFwiLCBjLkRFRkFVTFRTID0ge1xuICAgICAgICBpbnRlcnZhbDogNWUzLFxuICAgICAgICBwYXVzZTogXCJob3ZlclwiLFxuICAgICAgICB3cmFwOiAhMFxuICAgIH0sIGMucHJvdG90eXBlLmtleWRvd24gPSBmdW5jdGlvbihhKSB7XG4gICAgICAgIHN3aXRjaCAoYS53aGljaCkge1xuICAgICAgICAgIGNhc2UgMzc6XG4gICAgICAgICAgICB0aGlzLnByZXYoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgY2FzZSAzOTpcbiAgICAgICAgICAgIHRoaXMubmV4dCgpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGEucHJldmVudERlZmF1bHQoKTtcbiAgICB9LCBjLnByb3RvdHlwZS5jeWNsZSA9IGZ1bmN0aW9uKGIpIHtcbiAgICAgICAgcmV0dXJuIGIgfHwgKHRoaXMucGF1c2VkID0gITEpLCB0aGlzLmludGVydmFsICYmIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbCksIHRoaXMub3B0aW9ucy5pbnRlcnZhbCAmJiAhdGhpcy5wYXVzZWQgJiYgKHRoaXMuaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChhLnByb3h5KHRoaXMubmV4dCwgdGhpcyksIHRoaXMub3B0aW9ucy5pbnRlcnZhbCkpLCBcbiAgICAgICAgdGhpcztcbiAgICB9LCBjLnByb3RvdHlwZS5nZXRJdGVtSW5kZXggPSBmdW5jdGlvbihhKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiRpdGVtcyA9IGEucGFyZW50KCkuY2hpbGRyZW4oXCIuaXRlbVwiKSwgdGhpcy4kaXRlbXMuaW5kZXgoYSB8fCB0aGlzLiRhY3RpdmUpO1xuICAgIH0sIGMucHJvdG90eXBlLnRvID0gZnVuY3Rpb24oYikge1xuICAgICAgICB2YXIgYyA9IHRoaXMsIGQgPSB0aGlzLmdldEl0ZW1JbmRleCh0aGlzLiRhY3RpdmUgPSB0aGlzLiRlbGVtZW50LmZpbmQoXCIuaXRlbS5hY3RpdmVcIikpO1xuICAgICAgICByZXR1cm4gYiA+IHRoaXMuJGl0ZW1zLmxlbmd0aCAtIDEgfHwgMCA+IGIgPyB2b2lkIDAgOiB0aGlzLnNsaWRpbmcgPyB0aGlzLiRlbGVtZW50Lm9uZShcInNsaWQuYnMuY2Fyb3VzZWxcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjLnRvKGIpO1xuICAgICAgICB9KSA6IGQgPT0gYiA/IHRoaXMucGF1c2UoKS5jeWNsZSgpIDogdGhpcy5zbGlkZShiID4gZCA/IFwibmV4dFwiIDogXCJwcmV2XCIsIGEodGhpcy4kaXRlbXNbYl0pKTtcbiAgICB9LCBjLnByb3RvdHlwZS5wYXVzZSA9IGZ1bmN0aW9uKGIpIHtcbiAgICAgICAgcmV0dXJuIGIgfHwgKHRoaXMucGF1c2VkID0gITApLCB0aGlzLiRlbGVtZW50LmZpbmQoXCIubmV4dCwgLnByZXZcIikubGVuZ3RoICYmIGEuc3VwcG9ydC50cmFuc2l0aW9uICYmICh0aGlzLiRlbGVtZW50LnRyaWdnZXIoYS5zdXBwb3J0LnRyYW5zaXRpb24uZW5kKSwgXG4gICAgICAgIHRoaXMuY3ljbGUoITApKSwgdGhpcy5pbnRlcnZhbCA9IGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbCksIHRoaXM7XG4gICAgfSwgYy5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zbGlkaW5nID8gdm9pZCAwIDogdGhpcy5zbGlkZShcIm5leHRcIik7XG4gICAgfSwgYy5wcm90b3R5cGUucHJldiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zbGlkaW5nID8gdm9pZCAwIDogdGhpcy5zbGlkZShcInByZXZcIik7XG4gICAgfSwgYy5wcm90b3R5cGUuc2xpZGUgPSBmdW5jdGlvbihiLCBjKSB7XG4gICAgICAgIHZhciBkID0gdGhpcy4kZWxlbWVudC5maW5kKFwiLml0ZW0uYWN0aXZlXCIpLCBlID0gYyB8fCBkW2JdKCksIGYgPSB0aGlzLmludGVydmFsLCBnID0gXCJuZXh0XCIgPT0gYiA/IFwibGVmdFwiIDogXCJyaWdodFwiLCBoID0gXCJuZXh0XCIgPT0gYiA/IFwiZmlyc3RcIiA6IFwibGFzdFwiLCBpID0gdGhpcztcbiAgICAgICAgaWYgKCFlLmxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnMud3JhcCkgcmV0dXJuO1xuICAgICAgICAgICAgZSA9IHRoaXMuJGVsZW1lbnQuZmluZChcIi5pdGVtXCIpW2hdKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGUuaGFzQ2xhc3MoXCJhY3RpdmVcIikpIHJldHVybiB0aGlzLnNsaWRpbmcgPSAhMTtcbiAgICAgICAgdmFyIGogPSBlWzBdLCBrID0gYS5FdmVudChcInNsaWRlLmJzLmNhcm91c2VsXCIsIHtcbiAgICAgICAgICAgIHJlbGF0ZWRUYXJnZXQ6IGosXG4gICAgICAgICAgICBkaXJlY3Rpb246IGdcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICh0aGlzLiRlbGVtZW50LnRyaWdnZXIoayksICFrLmlzRGVmYXVsdFByZXZlbnRlZCgpKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zbGlkaW5nID0gITAsIGYgJiYgdGhpcy5wYXVzZSgpLCB0aGlzLiRpbmRpY2F0b3JzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMuJGluZGljYXRvcnMuZmluZChcIi5hY3RpdmVcIikucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XG4gICAgICAgICAgICAgICAgdmFyIGwgPSBhKHRoaXMuJGluZGljYXRvcnMuY2hpbGRyZW4oKVt0aGlzLmdldEl0ZW1JbmRleChlKV0pO1xuICAgICAgICAgICAgICAgIGwgJiYgbC5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBtID0gYS5FdmVudChcInNsaWQuYnMuY2Fyb3VzZWxcIiwge1xuICAgICAgICAgICAgICAgIHJlbGF0ZWRUYXJnZXQ6IGosXG4gICAgICAgICAgICAgICAgZGlyZWN0aW9uOiBnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBhLnN1cHBvcnQudHJhbnNpdGlvbiAmJiB0aGlzLiRlbGVtZW50Lmhhc0NsYXNzKFwic2xpZGVcIikgPyAoZS5hZGRDbGFzcyhiKSwgXG4gICAgICAgICAgICBlWzBdLm9mZnNldFdpZHRoLCBkLmFkZENsYXNzKGcpLCBlLmFkZENsYXNzKGcpLCBkLm9uZShcImJzVHJhbnNpdGlvbkVuZFwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBlLnJlbW92ZUNsYXNzKFsgYiwgZyBdLmpvaW4oXCIgXCIpKS5hZGRDbGFzcyhcImFjdGl2ZVwiKSwgZC5yZW1vdmVDbGFzcyhbIFwiYWN0aXZlXCIsIGcgXS5qb2luKFwiIFwiKSksIFxuICAgICAgICAgICAgICAgIGkuc2xpZGluZyA9ICExLCBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBpLiRlbGVtZW50LnRyaWdnZXIobSk7XG4gICAgICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgICAgICB9KS5lbXVsYXRlVHJhbnNpdGlvbkVuZCgxZTMgKiBkLmNzcyhcInRyYW5zaXRpb24tZHVyYXRpb25cIikuc2xpY2UoMCwgLTEpKSkgOiAoZC5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKSwgXG4gICAgICAgICAgICBlLmFkZENsYXNzKFwiYWN0aXZlXCIpLCB0aGlzLnNsaWRpbmcgPSAhMSwgdGhpcy4kZWxlbWVudC50cmlnZ2VyKG0pKSwgZiAmJiB0aGlzLmN5Y2xlKCksIFxuICAgICAgICAgICAgdGhpcztcbiAgICAgICAgfVxuICAgIH07XG4gICAgdmFyIGQgPSBhLmZuLmNhcm91c2VsO1xuICAgIGEuZm4uY2Fyb3VzZWwgPSBiLCBhLmZuLmNhcm91c2VsLkNvbnN0cnVjdG9yID0gYywgYS5mbi5jYXJvdXNlbC5ub0NvbmZsaWN0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBhLmZuLmNhcm91c2VsID0gZCwgdGhpcztcbiAgICB9LCBhKGRvY3VtZW50KS5vbihcImNsaWNrLmJzLmNhcm91c2VsLmRhdGEtYXBpXCIsIFwiW2RhdGEtc2xpZGVdLCBbZGF0YS1zbGlkZS10b11cIiwgZnVuY3Rpb24oYykge1xuICAgICAgICB2YXIgZCwgZSA9IGEodGhpcyksIGYgPSBhKGUuYXR0cihcImRhdGEtdGFyZ2V0XCIpIHx8IChkID0gZS5hdHRyKFwiaHJlZlwiKSkgJiYgZC5yZXBsYWNlKC8uKig/PSNbXlxcc10rJCkvLCBcIlwiKSk7XG4gICAgICAgIGlmIChmLmhhc0NsYXNzKFwiY2Fyb3VzZWxcIikpIHtcbiAgICAgICAgICAgIHZhciBnID0gYS5leHRlbmQoe30sIGYuZGF0YSgpLCBlLmRhdGEoKSksIGggPSBlLmF0dHIoXCJkYXRhLXNsaWRlLXRvXCIpO1xuICAgICAgICAgICAgaCAmJiAoZy5pbnRlcnZhbCA9ICExKSwgYi5jYWxsKGYsIGcpLCBoICYmIGYuZGF0YShcImJzLmNhcm91c2VsXCIpLnRvKGgpLCBjLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9KSwgYSh3aW5kb3cpLm9uKFwibG9hZFwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgYSgnW2RhdGEtcmlkZT1cImNhcm91c2VsXCJdJykuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBjID0gYSh0aGlzKTtcbiAgICAgICAgICAgIGIuY2FsbChjLCBjLmRhdGEoKSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufShqUXVlcnkpLCArZnVuY3Rpb24oYSkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIGZ1bmN0aW9uIGIoYikge1xuICAgICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGQgPSBhKHRoaXMpLCBlID0gZC5kYXRhKFwiYnMuY29sbGFwc2VcIiksIGYgPSBhLmV4dGVuZCh7fSwgYy5ERUZBVUxUUywgZC5kYXRhKCksIFwib2JqZWN0XCIgPT0gdHlwZW9mIGIgJiYgYik7XG4gICAgICAgICAgICAhZSAmJiBmLnRvZ2dsZSAmJiBcInNob3dcIiA9PSBiICYmIChiID0gIWIpLCBlIHx8IGQuZGF0YShcImJzLmNvbGxhcHNlXCIsIGUgPSBuZXcgYyh0aGlzLCBmKSksIFxuICAgICAgICAgICAgXCJzdHJpbmdcIiA9PSB0eXBlb2YgYiAmJiBlW2JdKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICB2YXIgYyA9IGZ1bmN0aW9uKGIsIGQpIHtcbiAgICAgICAgdGhpcy4kZWxlbWVudCA9IGEoYiksIHRoaXMub3B0aW9ucyA9IGEuZXh0ZW5kKHt9LCBjLkRFRkFVTFRTLCBkKSwgdGhpcy50cmFuc2l0aW9uaW5nID0gbnVsbCwgXG4gICAgICAgIHRoaXMub3B0aW9ucy5wYXJlbnQgJiYgKHRoaXMuJHBhcmVudCA9IGEodGhpcy5vcHRpb25zLnBhcmVudCkpLCB0aGlzLm9wdGlvbnMudG9nZ2xlICYmIHRoaXMudG9nZ2xlKCk7XG4gICAgfTtcbiAgICBjLlZFUlNJT04gPSBcIjMuMi4wXCIsIGMuREVGQVVMVFMgPSB7XG4gICAgICAgIHRvZ2dsZTogITBcbiAgICB9LCBjLnByb3RvdHlwZS5kaW1lbnNpb24gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGEgPSB0aGlzLiRlbGVtZW50Lmhhc0NsYXNzKFwid2lkdGhcIik7XG4gICAgICAgIHJldHVybiBhID8gXCJ3aWR0aFwiIDogXCJoZWlnaHRcIjtcbiAgICB9LCBjLnByb3RvdHlwZS5zaG93ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICghdGhpcy50cmFuc2l0aW9uaW5nICYmICF0aGlzLiRlbGVtZW50Lmhhc0NsYXNzKFwiaW5cIikpIHtcbiAgICAgICAgICAgIHZhciBjID0gYS5FdmVudChcInNob3cuYnMuY29sbGFwc2VcIik7XG4gICAgICAgICAgICBpZiAodGhpcy4kZWxlbWVudC50cmlnZ2VyKGMpLCAhYy5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkge1xuICAgICAgICAgICAgICAgIHZhciBkID0gdGhpcy4kcGFyZW50ICYmIHRoaXMuJHBhcmVudC5maW5kKFwiPiAucGFuZWwgPiAuaW5cIik7XG4gICAgICAgICAgICAgICAgaWYgKGQgJiYgZC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGUgPSBkLmRhdGEoXCJicy5jb2xsYXBzZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGUgJiYgZS50cmFuc2l0aW9uaW5nKSByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIGIuY2FsbChkLCBcImhpZGVcIiksIGUgfHwgZC5kYXRhKFwiYnMuY29sbGFwc2VcIiwgbnVsbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBmID0gdGhpcy5kaW1lbnNpb24oKTtcbiAgICAgICAgICAgICAgICB0aGlzLiRlbGVtZW50LnJlbW92ZUNsYXNzKFwiY29sbGFwc2VcIikuYWRkQ2xhc3MoXCJjb2xsYXBzaW5nXCIpW2ZdKDApLCB0aGlzLnRyYW5zaXRpb25pbmcgPSAxO1xuICAgICAgICAgICAgICAgIHZhciBnID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGVsZW1lbnQucmVtb3ZlQ2xhc3MoXCJjb2xsYXBzaW5nXCIpLmFkZENsYXNzKFwiY29sbGFwc2UgaW5cIilbZl0oXCJcIiksIHRoaXMudHJhbnNpdGlvbmluZyA9IDAsIFxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoXCJzaG93bi5icy5jb2xsYXBzZVwiKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGlmICghYS5zdXBwb3J0LnRyYW5zaXRpb24pIHJldHVybiBnLmNhbGwodGhpcyk7XG4gICAgICAgICAgICAgICAgdmFyIGggPSBhLmNhbWVsQ2FzZShbIFwic2Nyb2xsXCIsIGYgXS5qb2luKFwiLVwiKSk7XG4gICAgICAgICAgICAgICAgdGhpcy4kZWxlbWVudC5vbmUoXCJic1RyYW5zaXRpb25FbmRcIiwgYS5wcm94eShnLCB0aGlzKSkuZW11bGF0ZVRyYW5zaXRpb25FbmQoMzUwKVtmXSh0aGlzLiRlbGVtZW50WzBdW2hdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sIGMucHJvdG90eXBlLmhpZGUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCF0aGlzLnRyYW5zaXRpb25pbmcgJiYgdGhpcy4kZWxlbWVudC5oYXNDbGFzcyhcImluXCIpKSB7XG4gICAgICAgICAgICB2YXIgYiA9IGEuRXZlbnQoXCJoaWRlLmJzLmNvbGxhcHNlXCIpO1xuICAgICAgICAgICAgaWYgKHRoaXMuJGVsZW1lbnQudHJpZ2dlcihiKSwgIWIuaXNEZWZhdWx0UHJldmVudGVkKCkpIHtcbiAgICAgICAgICAgICAgICB2YXIgYyA9IHRoaXMuZGltZW5zaW9uKCk7XG4gICAgICAgICAgICAgICAgdGhpcy4kZWxlbWVudFtjXSh0aGlzLiRlbGVtZW50W2NdKCkpWzBdLm9mZnNldEhlaWdodCwgdGhpcy4kZWxlbWVudC5hZGRDbGFzcyhcImNvbGxhcHNpbmdcIikucmVtb3ZlQ2xhc3MoXCJjb2xsYXBzZVwiKS5yZW1vdmVDbGFzcyhcImluXCIpLCBcbiAgICAgICAgICAgICAgICB0aGlzLnRyYW5zaXRpb25pbmcgPSAxO1xuICAgICAgICAgICAgICAgIHZhciBkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJhbnNpdGlvbmluZyA9IDAsIHRoaXMuJGVsZW1lbnQudHJpZ2dlcihcImhpZGRlbi5icy5jb2xsYXBzZVwiKS5yZW1vdmVDbGFzcyhcImNvbGxhcHNpbmdcIikuYWRkQ2xhc3MoXCJjb2xsYXBzZVwiKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHJldHVybiBhLnN1cHBvcnQudHJhbnNpdGlvbiA/IHZvaWQgdGhpcy4kZWxlbWVudFtjXSgwKS5vbmUoXCJic1RyYW5zaXRpb25FbmRcIiwgYS5wcm94eShkLCB0aGlzKSkuZW11bGF0ZVRyYW5zaXRpb25FbmQoMzUwKSA6IGQuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sIGMucHJvdG90eXBlLnRvZ2dsZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzW3RoaXMuJGVsZW1lbnQuaGFzQ2xhc3MoXCJpblwiKSA/IFwiaGlkZVwiIDogXCJzaG93XCJdKCk7XG4gICAgfTtcbiAgICB2YXIgZCA9IGEuZm4uY29sbGFwc2U7XG4gICAgYS5mbi5jb2xsYXBzZSA9IGIsIGEuZm4uY29sbGFwc2UuQ29uc3RydWN0b3IgPSBjLCBhLmZuLmNvbGxhcHNlLm5vQ29uZmxpY3QgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGEuZm4uY29sbGFwc2UgPSBkLCB0aGlzO1xuICAgIH0sIGEoZG9jdW1lbnQpLm9uKFwiY2xpY2suYnMuY29sbGFwc2UuZGF0YS1hcGlcIiwgJ1tkYXRhLXRvZ2dsZT1cImNvbGxhcHNlXCJdJywgZnVuY3Rpb24oYykge1xuICAgICAgICB2YXIgZCwgZSA9IGEodGhpcyksIGYgPSBlLmF0dHIoXCJkYXRhLXRhcmdldFwiKSB8fCBjLnByZXZlbnREZWZhdWx0KCkgfHwgKGQgPSBlLmF0dHIoXCJocmVmXCIpKSAmJiBkLnJlcGxhY2UoLy4qKD89I1teXFxzXSskKS8sIFwiXCIpLCBnID0gYShmKSwgaCA9IGcuZGF0YShcImJzLmNvbGxhcHNlXCIpLCBpID0gaCA/IFwidG9nZ2xlXCIgOiBlLmRhdGEoKSwgaiA9IGUuYXR0cihcImRhdGEtcGFyZW50XCIpLCBrID0gaiAmJiBhKGopO1xuICAgICAgICBoICYmIGgudHJhbnNpdGlvbmluZyB8fCAoayAmJiBrLmZpbmQoJ1tkYXRhLXRvZ2dsZT1cImNvbGxhcHNlXCJdW2RhdGEtcGFyZW50PVwiJyArIGogKyAnXCJdJykubm90KGUpLmFkZENsYXNzKFwiY29sbGFwc2VkXCIpLCBcbiAgICAgICAgZVtnLmhhc0NsYXNzKFwiaW5cIikgPyBcImFkZENsYXNzXCIgOiBcInJlbW92ZUNsYXNzXCJdKFwiY29sbGFwc2VkXCIpKSwgYi5jYWxsKGcsIGkpO1xuICAgIH0pO1xufShqUXVlcnkpLCArZnVuY3Rpb24oYSkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIGZ1bmN0aW9uIGIoYikge1xuICAgICAgICBiICYmIDMgPT09IGIud2hpY2ggfHwgKGEoZSkucmVtb3ZlKCksIGEoZikuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBkID0gYyhhKHRoaXMpKSwgZSA9IHtcbiAgICAgICAgICAgICAgICByZWxhdGVkVGFyZ2V0OiB0aGlzXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZC5oYXNDbGFzcyhcIm9wZW5cIikgJiYgKGQudHJpZ2dlcihiID0gYS5FdmVudChcImhpZGUuYnMuZHJvcGRvd25cIiwgZSkpLCBiLmlzRGVmYXVsdFByZXZlbnRlZCgpIHx8IGQucmVtb3ZlQ2xhc3MoXCJvcGVuXCIpLnRyaWdnZXIoXCJoaWRkZW4uYnMuZHJvcGRvd25cIiwgZSkpO1xuICAgICAgICB9KSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGMoYikge1xuICAgICAgICB2YXIgYyA9IGIuYXR0cihcImRhdGEtdGFyZ2V0XCIpO1xuICAgICAgICBjIHx8IChjID0gYi5hdHRyKFwiaHJlZlwiKSwgYyA9IGMgJiYgLyNbQS1aYS16XS8udGVzdChjKSAmJiBjLnJlcGxhY2UoLy4qKD89I1teXFxzXSokKS8sIFwiXCIpKTtcbiAgICAgICAgdmFyIGQgPSBjICYmIGEoYyk7XG4gICAgICAgIHJldHVybiBkICYmIGQubGVuZ3RoID8gZCA6IGIucGFyZW50KCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGQoYikge1xuICAgICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGMgPSBhKHRoaXMpLCBkID0gYy5kYXRhKFwiYnMuZHJvcGRvd25cIik7XG4gICAgICAgICAgICBkIHx8IGMuZGF0YShcImJzLmRyb3Bkb3duXCIsIGQgPSBuZXcgZyh0aGlzKSksIFwic3RyaW5nXCIgPT0gdHlwZW9mIGIgJiYgZFtiXS5jYWxsKGMpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgdmFyIGUgPSBcIi5kcm9wZG93bi1iYWNrZHJvcFwiLCBmID0gJ1tkYXRhLXRvZ2dsZT1cImRyb3Bkb3duXCJdJywgZyA9IGZ1bmN0aW9uKGIpIHtcbiAgICAgICAgYShiKS5vbihcImNsaWNrLmJzLmRyb3Bkb3duXCIsIHRoaXMudG9nZ2xlKTtcbiAgICB9O1xuICAgIGcuVkVSU0lPTiA9IFwiMy4yLjBcIiwgZy5wcm90b3R5cGUudG9nZ2xlID0gZnVuY3Rpb24oZCkge1xuICAgICAgICB2YXIgZSA9IGEodGhpcyk7XG4gICAgICAgIGlmICghZS5pcyhcIi5kaXNhYmxlZCwgOmRpc2FibGVkXCIpKSB7XG4gICAgICAgICAgICB2YXIgZiA9IGMoZSksIGcgPSBmLmhhc0NsYXNzKFwib3BlblwiKTtcbiAgICAgICAgICAgIGlmIChiKCksICFnKSB7XG4gICAgICAgICAgICAgICAgXCJvbnRvdWNoc3RhcnRcIiBpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgJiYgIWYuY2xvc2VzdChcIi5uYXZiYXItbmF2XCIpLmxlbmd0aCAmJiBhKCc8ZGl2IGNsYXNzPVwiZHJvcGRvd24tYmFja2Ryb3BcIi8+JykuaW5zZXJ0QWZ0ZXIoYSh0aGlzKSkub24oXCJjbGlja1wiLCBiKTtcbiAgICAgICAgICAgICAgICB2YXIgaCA9IHtcbiAgICAgICAgICAgICAgICAgICAgcmVsYXRlZFRhcmdldDogdGhpc1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgaWYgKGYudHJpZ2dlcihkID0gYS5FdmVudChcInNob3cuYnMuZHJvcGRvd25cIiwgaCkpLCBkLmlzRGVmYXVsdFByZXZlbnRlZCgpKSByZXR1cm47XG4gICAgICAgICAgICAgICAgZS50cmlnZ2VyKFwiZm9jdXNcIiksIGYudG9nZ2xlQ2xhc3MoXCJvcGVuXCIpLnRyaWdnZXIoXCJzaG93bi5icy5kcm9wZG93blwiLCBoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAhMTtcbiAgICAgICAgfVxuICAgIH0sIGcucHJvdG90eXBlLmtleWRvd24gPSBmdW5jdGlvbihiKSB7XG4gICAgICAgIGlmICgvKDM4fDQwfDI3KS8udGVzdChiLmtleUNvZGUpKSB7XG4gICAgICAgICAgICB2YXIgZCA9IGEodGhpcyk7XG4gICAgICAgICAgICBpZiAoYi5wcmV2ZW50RGVmYXVsdCgpLCBiLnN0b3BQcm9wYWdhdGlvbigpLCAhZC5pcyhcIi5kaXNhYmxlZCwgOmRpc2FibGVkXCIpKSB7XG4gICAgICAgICAgICAgICAgdmFyIGUgPSBjKGQpLCBnID0gZS5oYXNDbGFzcyhcIm9wZW5cIik7XG4gICAgICAgICAgICAgICAgaWYgKCFnIHx8IGcgJiYgMjcgPT0gYi5rZXlDb2RlKSByZXR1cm4gMjcgPT0gYi53aGljaCAmJiBlLmZpbmQoZikudHJpZ2dlcihcImZvY3VzXCIpLCBcbiAgICAgICAgICAgICAgICBkLnRyaWdnZXIoXCJjbGlja1wiKTtcbiAgICAgICAgICAgICAgICB2YXIgaCA9IFwiIGxpOm5vdCguZGl2aWRlcik6dmlzaWJsZSBhXCIsIGkgPSBlLmZpbmQoJ1tyb2xlPVwibWVudVwiXScgKyBoICsgJywgW3JvbGU9XCJsaXN0Ym94XCJdJyArIGgpO1xuICAgICAgICAgICAgICAgIGlmIChpLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaiA9IGkuaW5kZXgoaS5maWx0ZXIoXCI6Zm9jdXNcIikpO1xuICAgICAgICAgICAgICAgICAgICAzOCA9PSBiLmtleUNvZGUgJiYgaiA+IDAgJiYgai0tLCA0MCA9PSBiLmtleUNvZGUgJiYgaiA8IGkubGVuZ3RoIC0gMSAmJiBqKyssIH5qIHx8IChqID0gMCksIFxuICAgICAgICAgICAgICAgICAgICBpLmVxKGopLnRyaWdnZXIoXCJmb2N1c1wiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHZhciBoID0gYS5mbi5kcm9wZG93bjtcbiAgICBhLmZuLmRyb3Bkb3duID0gZCwgYS5mbi5kcm9wZG93bi5Db25zdHJ1Y3RvciA9IGcsIGEuZm4uZHJvcGRvd24ubm9Db25mbGljdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gYS5mbi5kcm9wZG93biA9IGgsIHRoaXM7XG4gICAgfSwgYShkb2N1bWVudCkub24oXCJjbGljay5icy5kcm9wZG93bi5kYXRhLWFwaVwiLCBiKS5vbihcImNsaWNrLmJzLmRyb3Bkb3duLmRhdGEtYXBpXCIsIFwiLmRyb3Bkb3duIGZvcm1cIiwgZnVuY3Rpb24oYSkge1xuICAgICAgICBhLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH0pLm9uKFwiY2xpY2suYnMuZHJvcGRvd24uZGF0YS1hcGlcIiwgZiwgZy5wcm90b3R5cGUudG9nZ2xlKS5vbihcImtleWRvd24uYnMuZHJvcGRvd24uZGF0YS1hcGlcIiwgZiArICcsIFtyb2xlPVwibWVudVwiXSwgW3JvbGU9XCJsaXN0Ym94XCJdJywgZy5wcm90b3R5cGUua2V5ZG93bik7XG59KGpRdWVyeSksICtmdW5jdGlvbihhKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgZnVuY3Rpb24gYihiLCBkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgZSA9IGEodGhpcyksIGYgPSBlLmRhdGEoXCJicy5tb2RhbFwiKSwgZyA9IGEuZXh0ZW5kKHt9LCBjLkRFRkFVTFRTLCBlLmRhdGEoKSwgXCJvYmplY3RcIiA9PSB0eXBlb2YgYiAmJiBiKTtcbiAgICAgICAgICAgIGYgfHwgZS5kYXRhKFwiYnMubW9kYWxcIiwgZiA9IG5ldyBjKHRoaXMsIGcpKSwgXCJzdHJpbmdcIiA9PSB0eXBlb2YgYiA/IGZbYl0oZCkgOiBnLnNob3cgJiYgZi5zaG93KGQpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgdmFyIGMgPSBmdW5jdGlvbihiLCBjKSB7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IGMsIHRoaXMuJGJvZHkgPSBhKGRvY3VtZW50LmJvZHkpLCB0aGlzLiRlbGVtZW50ID0gYShiKSwgdGhpcy4kYmFja2Ryb3AgPSB0aGlzLmlzU2hvd24gPSBudWxsLCBcbiAgICAgICAgdGhpcy5zY3JvbGxiYXJXaWR0aCA9IDAsIHRoaXMub3B0aW9ucy5yZW1vdGUgJiYgdGhpcy4kZWxlbWVudC5maW5kKFwiLm1vZGFsLWNvbnRlbnRcIikubG9hZCh0aGlzLm9wdGlvbnMucmVtb3RlLCBhLnByb3h5KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKFwibG9hZGVkLmJzLm1vZGFsXCIpO1xuICAgICAgICB9LCB0aGlzKSk7XG4gICAgfTtcbiAgICBjLlZFUlNJT04gPSBcIjMuMi4wXCIsIGMuREVGQVVMVFMgPSB7XG4gICAgICAgIGJhY2tkcm9wOiAhMCxcbiAgICAgICAga2V5Ym9hcmQ6ICEwLFxuICAgICAgICBzaG93OiAhMFxuICAgIH0sIGMucHJvdG90eXBlLnRvZ2dsZSA9IGZ1bmN0aW9uKGEpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNTaG93biA/IHRoaXMuaGlkZSgpIDogdGhpcy5zaG93KGEpO1xuICAgIH0sIGMucHJvdG90eXBlLnNob3cgPSBmdW5jdGlvbihiKSB7XG4gICAgICAgIHZhciBjID0gdGhpcywgZCA9IGEuRXZlbnQoXCJzaG93LmJzLm1vZGFsXCIsIHtcbiAgICAgICAgICAgIHJlbGF0ZWRUYXJnZXQ6IGJcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcihkKSwgdGhpcy5pc1Nob3duIHx8IGQuaXNEZWZhdWx0UHJldmVudGVkKCkgfHwgKHRoaXMuaXNTaG93biA9ICEwLCBcbiAgICAgICAgdGhpcy5jaGVja1Njcm9sbGJhcigpLCB0aGlzLiRib2R5LmFkZENsYXNzKFwibW9kYWwtb3BlblwiKSwgdGhpcy5zZXRTY3JvbGxiYXIoKSwgdGhpcy5lc2NhcGUoKSwgXG4gICAgICAgIHRoaXMuJGVsZW1lbnQub24oXCJjbGljay5kaXNtaXNzLmJzLm1vZGFsXCIsICdbZGF0YS1kaXNtaXNzPVwibW9kYWxcIl0nLCBhLnByb3h5KHRoaXMuaGlkZSwgdGhpcykpLCBcbiAgICAgICAgdGhpcy5iYWNrZHJvcChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBkID0gYS5zdXBwb3J0LnRyYW5zaXRpb24gJiYgYy4kZWxlbWVudC5oYXNDbGFzcyhcImZhZGVcIik7XG4gICAgICAgICAgICBjLiRlbGVtZW50LnBhcmVudCgpLmxlbmd0aCB8fCBjLiRlbGVtZW50LmFwcGVuZFRvKGMuJGJvZHkpLCBjLiRlbGVtZW50LnNob3coKS5zY3JvbGxUb3AoMCksIFxuICAgICAgICAgICAgZCAmJiBjLiRlbGVtZW50WzBdLm9mZnNldFdpZHRoLCBjLiRlbGVtZW50LmFkZENsYXNzKFwiaW5cIikuYXR0cihcImFyaWEtaGlkZGVuXCIsICExKSwgXG4gICAgICAgICAgICBjLmVuZm9yY2VGb2N1cygpO1xuICAgICAgICAgICAgdmFyIGUgPSBhLkV2ZW50KFwic2hvd24uYnMubW9kYWxcIiwge1xuICAgICAgICAgICAgICAgIHJlbGF0ZWRUYXJnZXQ6IGJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZCA/IGMuJGVsZW1lbnQuZmluZChcIi5tb2RhbC1kaWFsb2dcIikub25lKFwiYnNUcmFuc2l0aW9uRW5kXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGMuJGVsZW1lbnQudHJpZ2dlcihcImZvY3VzXCIpLnRyaWdnZXIoZSk7XG4gICAgICAgICAgICB9KS5lbXVsYXRlVHJhbnNpdGlvbkVuZCgzMDApIDogYy4kZWxlbWVudC50cmlnZ2VyKFwiZm9jdXNcIikudHJpZ2dlcihlKTtcbiAgICAgICAgfSkpO1xuICAgIH0sIGMucHJvdG90eXBlLmhpZGUgPSBmdW5jdGlvbihiKSB7XG4gICAgICAgIGIgJiYgYi5wcmV2ZW50RGVmYXVsdCgpLCBiID0gYS5FdmVudChcImhpZGUuYnMubW9kYWxcIiksIHRoaXMuJGVsZW1lbnQudHJpZ2dlcihiKSwgXG4gICAgICAgIHRoaXMuaXNTaG93biAmJiAhYi5pc0RlZmF1bHRQcmV2ZW50ZWQoKSAmJiAodGhpcy5pc1Nob3duID0gITEsIHRoaXMuJGJvZHkucmVtb3ZlQ2xhc3MoXCJtb2RhbC1vcGVuXCIpLCBcbiAgICAgICAgdGhpcy5yZXNldFNjcm9sbGJhcigpLCB0aGlzLmVzY2FwZSgpLCBhKGRvY3VtZW50KS5vZmYoXCJmb2N1c2luLmJzLm1vZGFsXCIpLCB0aGlzLiRlbGVtZW50LnJlbW92ZUNsYXNzKFwiaW5cIikuYXR0cihcImFyaWEtaGlkZGVuXCIsICEwKS5vZmYoXCJjbGljay5kaXNtaXNzLmJzLm1vZGFsXCIpLCBcbiAgICAgICAgYS5zdXBwb3J0LnRyYW5zaXRpb24gJiYgdGhpcy4kZWxlbWVudC5oYXNDbGFzcyhcImZhZGVcIikgPyB0aGlzLiRlbGVtZW50Lm9uZShcImJzVHJhbnNpdGlvbkVuZFwiLCBhLnByb3h5KHRoaXMuaGlkZU1vZGFsLCB0aGlzKSkuZW11bGF0ZVRyYW5zaXRpb25FbmQoMzAwKSA6IHRoaXMuaGlkZU1vZGFsKCkpO1xuICAgIH0sIGMucHJvdG90eXBlLmVuZm9yY2VGb2N1cyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBhKGRvY3VtZW50KS5vZmYoXCJmb2N1c2luLmJzLm1vZGFsXCIpLm9uKFwiZm9jdXNpbi5icy5tb2RhbFwiLCBhLnByb3h5KGZ1bmN0aW9uKGEpIHtcbiAgICAgICAgICAgIHRoaXMuJGVsZW1lbnRbMF0gPT09IGEudGFyZ2V0IHx8IHRoaXMuJGVsZW1lbnQuaGFzKGEudGFyZ2V0KS5sZW5ndGggfHwgdGhpcy4kZWxlbWVudC50cmlnZ2VyKFwiZm9jdXNcIik7XG4gICAgICAgIH0sIHRoaXMpKTtcbiAgICB9LCBjLnByb3RvdHlwZS5lc2NhcGUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5pc1Nob3duICYmIHRoaXMub3B0aW9ucy5rZXlib2FyZCA/IHRoaXMuJGVsZW1lbnQub24oXCJrZXl1cC5kaXNtaXNzLmJzLm1vZGFsXCIsIGEucHJveHkoZnVuY3Rpb24oYSkge1xuICAgICAgICAgICAgMjcgPT0gYS53aGljaCAmJiB0aGlzLmhpZGUoKTtcbiAgICAgICAgfSwgdGhpcykpIDogdGhpcy5pc1Nob3duIHx8IHRoaXMuJGVsZW1lbnQub2ZmKFwia2V5dXAuZGlzbWlzcy5icy5tb2RhbFwiKTtcbiAgICB9LCBjLnByb3RvdHlwZS5oaWRlTW9kYWwgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGEgPSB0aGlzO1xuICAgICAgICB0aGlzLiRlbGVtZW50LmhpZGUoKSwgdGhpcy5iYWNrZHJvcChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGEuJGVsZW1lbnQudHJpZ2dlcihcImhpZGRlbi5icy5tb2RhbFwiKTtcbiAgICAgICAgfSk7XG4gICAgfSwgYy5wcm90b3R5cGUucmVtb3ZlQmFja2Ryb3AgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy4kYmFja2Ryb3AgJiYgdGhpcy4kYmFja2Ryb3AucmVtb3ZlKCksIHRoaXMuJGJhY2tkcm9wID0gbnVsbDtcbiAgICB9LCBjLnByb3RvdHlwZS5iYWNrZHJvcCA9IGZ1bmN0aW9uKGIpIHtcbiAgICAgICAgdmFyIGMgPSB0aGlzLCBkID0gdGhpcy4kZWxlbWVudC5oYXNDbGFzcyhcImZhZGVcIikgPyBcImZhZGVcIiA6IFwiXCI7XG4gICAgICAgIGlmICh0aGlzLmlzU2hvd24gJiYgdGhpcy5vcHRpb25zLmJhY2tkcm9wKSB7XG4gICAgICAgICAgICB2YXIgZSA9IGEuc3VwcG9ydC50cmFuc2l0aW9uICYmIGQ7XG4gICAgICAgICAgICBpZiAodGhpcy4kYmFja2Ryb3AgPSBhKCc8ZGl2IGNsYXNzPVwibW9kYWwtYmFja2Ryb3AgJyArIGQgKyAnXCIgLz4nKS5hcHBlbmRUbyh0aGlzLiRib2R5KSwgXG4gICAgICAgICAgICB0aGlzLiRlbGVtZW50Lm9uKFwiY2xpY2suZGlzbWlzcy5icy5tb2RhbFwiLCBhLnByb3h5KGZ1bmN0aW9uKGEpIHtcbiAgICAgICAgICAgICAgICBhLnRhcmdldCA9PT0gYS5jdXJyZW50VGFyZ2V0ICYmIChcInN0YXRpY1wiID09IHRoaXMub3B0aW9ucy5iYWNrZHJvcCA/IHRoaXMuJGVsZW1lbnRbMF0uZm9jdXMuY2FsbCh0aGlzLiRlbGVtZW50WzBdKSA6IHRoaXMuaGlkZS5jYWxsKHRoaXMpKTtcbiAgICAgICAgICAgIH0sIHRoaXMpKSwgZSAmJiB0aGlzLiRiYWNrZHJvcFswXS5vZmZzZXRXaWR0aCwgdGhpcy4kYmFja2Ryb3AuYWRkQ2xhc3MoXCJpblwiKSwgIWIpIHJldHVybjtcbiAgICAgICAgICAgIGUgPyB0aGlzLiRiYWNrZHJvcC5vbmUoXCJic1RyYW5zaXRpb25FbmRcIiwgYikuZW11bGF0ZVRyYW5zaXRpb25FbmQoMTUwKSA6IGIoKTtcbiAgICAgICAgfSBlbHNlIGlmICghdGhpcy5pc1Nob3duICYmIHRoaXMuJGJhY2tkcm9wKSB7XG4gICAgICAgICAgICB0aGlzLiRiYWNrZHJvcC5yZW1vdmVDbGFzcyhcImluXCIpO1xuICAgICAgICAgICAgdmFyIGYgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBjLnJlbW92ZUJhY2tkcm9wKCksIGIgJiYgYigpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGEuc3VwcG9ydC50cmFuc2l0aW9uICYmIHRoaXMuJGVsZW1lbnQuaGFzQ2xhc3MoXCJmYWRlXCIpID8gdGhpcy4kYmFja2Ryb3Aub25lKFwiYnNUcmFuc2l0aW9uRW5kXCIsIGYpLmVtdWxhdGVUcmFuc2l0aW9uRW5kKDE1MCkgOiBmKCk7XG4gICAgICAgIH0gZWxzZSBiICYmIGIoKTtcbiAgICB9LCBjLnByb3RvdHlwZS5jaGVja1Njcm9sbGJhciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoID49IHdpbmRvdy5pbm5lcldpZHRoIHx8ICh0aGlzLnNjcm9sbGJhcldpZHRoID0gdGhpcy5zY3JvbGxiYXJXaWR0aCB8fCB0aGlzLm1lYXN1cmVTY3JvbGxiYXIoKSk7XG4gICAgfSwgYy5wcm90b3R5cGUuc2V0U2Nyb2xsYmFyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBhID0gcGFyc2VJbnQodGhpcy4kYm9keS5jc3MoXCJwYWRkaW5nLXJpZ2h0XCIpIHx8IDAsIDEwKTtcbiAgICAgICAgdGhpcy5zY3JvbGxiYXJXaWR0aCAmJiB0aGlzLiRib2R5LmNzcyhcInBhZGRpbmctcmlnaHRcIiwgYSArIHRoaXMuc2Nyb2xsYmFyV2lkdGgpO1xuICAgIH0sIGMucHJvdG90eXBlLnJlc2V0U2Nyb2xsYmFyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuJGJvZHkuY3NzKFwicGFkZGluZy1yaWdodFwiLCBcIlwiKTtcbiAgICB9LCBjLnByb3RvdHlwZS5tZWFzdXJlU2Nyb2xsYmFyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgYS5jbGFzc05hbWUgPSBcIm1vZGFsLXNjcm9sbGJhci1tZWFzdXJlXCIsIHRoaXMuJGJvZHkuYXBwZW5kKGEpO1xuICAgICAgICB2YXIgYiA9IGEub2Zmc2V0V2lkdGggLSBhLmNsaWVudFdpZHRoO1xuICAgICAgICByZXR1cm4gdGhpcy4kYm9keVswXS5yZW1vdmVDaGlsZChhKSwgYjtcbiAgICB9O1xuICAgIHZhciBkID0gYS5mbi5tb2RhbDtcbiAgICBhLmZuLm1vZGFsID0gYiwgYS5mbi5tb2RhbC5Db25zdHJ1Y3RvciA9IGMsIGEuZm4ubW9kYWwubm9Db25mbGljdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gYS5mbi5tb2RhbCA9IGQsIHRoaXM7XG4gICAgfSwgYShkb2N1bWVudCkub24oXCJjbGljay5icy5tb2RhbC5kYXRhLWFwaVwiLCAnW2RhdGEtdG9nZ2xlPVwibW9kYWxcIl0nLCBmdW5jdGlvbihjKSB7XG4gICAgICAgIHZhciBkID0gYSh0aGlzKSwgZSA9IGQuYXR0cihcImhyZWZcIiksIGYgPSBhKGQuYXR0cihcImRhdGEtdGFyZ2V0XCIpIHx8IGUgJiYgZS5yZXBsYWNlKC8uKig/PSNbXlxcc10rJCkvLCBcIlwiKSksIGcgPSBmLmRhdGEoXCJicy5tb2RhbFwiKSA/IFwidG9nZ2xlXCIgOiBhLmV4dGVuZCh7XG4gICAgICAgICAgICByZW1vdGU6ICEvIy8udGVzdChlKSAmJiBlXG4gICAgICAgIH0sIGYuZGF0YSgpLCBkLmRhdGEoKSk7XG4gICAgICAgIGQuaXMoXCJhXCIpICYmIGMucHJldmVudERlZmF1bHQoKSwgZi5vbmUoXCJzaG93LmJzLm1vZGFsXCIsIGZ1bmN0aW9uKGEpIHtcbiAgICAgICAgICAgIGEuaXNEZWZhdWx0UHJldmVudGVkKCkgfHwgZi5vbmUoXCJoaWRkZW4uYnMubW9kYWxcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgZC5pcyhcIjp2aXNpYmxlXCIpICYmIGQudHJpZ2dlcihcImZvY3VzXCIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pLCBiLmNhbGwoZiwgZywgdGhpcyk7XG4gICAgfSk7XG59KGpRdWVyeSksICtmdW5jdGlvbihhKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgZnVuY3Rpb24gYihiKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgZCA9IGEodGhpcyksIGUgPSBkLmRhdGEoXCJicy50b29sdGlwXCIpLCBmID0gXCJvYmplY3RcIiA9PSB0eXBlb2YgYiAmJiBiO1xuICAgICAgICAgICAgKGUgfHwgXCJkZXN0cm95XCIgIT0gYikgJiYgKGUgfHwgZC5kYXRhKFwiYnMudG9vbHRpcFwiLCBlID0gbmV3IGModGhpcywgZikpLCBcInN0cmluZ1wiID09IHR5cGVvZiBiICYmIGVbYl0oKSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICB2YXIgYyA9IGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgICAgdGhpcy50eXBlID0gdGhpcy5vcHRpb25zID0gdGhpcy5lbmFibGVkID0gdGhpcy50aW1lb3V0ID0gdGhpcy5ob3ZlclN0YXRlID0gdGhpcy4kZWxlbWVudCA9IG51bGwsIFxuICAgICAgICB0aGlzLmluaXQoXCJ0b29sdGlwXCIsIGEsIGIpO1xuICAgIH07XG4gICAgYy5WRVJTSU9OID0gXCIzLjIuMFwiLCBjLkRFRkFVTFRTID0ge1xuICAgICAgICBhbmltYXRpb246ICEwLFxuICAgICAgICBwbGFjZW1lbnQ6IFwidG9wXCIsXG4gICAgICAgIHNlbGVjdG9yOiAhMSxcbiAgICAgICAgdGVtcGxhdGU6ICc8ZGl2IGNsYXNzPVwidG9vbHRpcFwiIHJvbGU9XCJ0b29sdGlwXCI+PGRpdiBjbGFzcz1cInRvb2x0aXAtYXJyb3dcIj48L2Rpdj48ZGl2IGNsYXNzPVwidG9vbHRpcC1pbm5lclwiPjwvZGl2PjwvZGl2PicsXG4gICAgICAgIHRyaWdnZXI6IFwiaG92ZXIgZm9jdXNcIixcbiAgICAgICAgdGl0bGU6IFwiXCIsXG4gICAgICAgIGRlbGF5OiAwLFxuICAgICAgICBodG1sOiAhMSxcbiAgICAgICAgY29udGFpbmVyOiAhMSxcbiAgICAgICAgdmlld3BvcnQ6IHtcbiAgICAgICAgICAgIHNlbGVjdG9yOiBcImJvZHlcIixcbiAgICAgICAgICAgIHBhZGRpbmc6IDBcbiAgICAgICAgfVxuICAgIH0sIGMucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbihiLCBjLCBkKSB7XG4gICAgICAgIHRoaXMuZW5hYmxlZCA9ICEwLCB0aGlzLnR5cGUgPSBiLCB0aGlzLiRlbGVtZW50ID0gYShjKSwgdGhpcy5vcHRpb25zID0gdGhpcy5nZXRPcHRpb25zKGQpLCBcbiAgICAgICAgdGhpcy4kdmlld3BvcnQgPSB0aGlzLm9wdGlvbnMudmlld3BvcnQgJiYgYSh0aGlzLm9wdGlvbnMudmlld3BvcnQuc2VsZWN0b3IgfHwgdGhpcy5vcHRpb25zLnZpZXdwb3J0KTtcbiAgICAgICAgZm9yICh2YXIgZSA9IHRoaXMub3B0aW9ucy50cmlnZ2VyLnNwbGl0KFwiIFwiKSwgZiA9IGUubGVuZ3RoOyBmLS07ICkge1xuICAgICAgICAgICAgdmFyIGcgPSBlW2ZdO1xuICAgICAgICAgICAgaWYgKFwiY2xpY2tcIiA9PSBnKSB0aGlzLiRlbGVtZW50Lm9uKFwiY2xpY2suXCIgKyB0aGlzLnR5cGUsIHRoaXMub3B0aW9ucy5zZWxlY3RvciwgYS5wcm94eSh0aGlzLnRvZ2dsZSwgdGhpcykpOyBlbHNlIGlmIChcIm1hbnVhbFwiICE9IGcpIHtcbiAgICAgICAgICAgICAgICB2YXIgaCA9IFwiaG92ZXJcIiA9PSBnID8gXCJtb3VzZWVudGVyXCIgOiBcImZvY3VzaW5cIiwgaSA9IFwiaG92ZXJcIiA9PSBnID8gXCJtb3VzZWxlYXZlXCIgOiBcImZvY3Vzb3V0XCI7XG4gICAgICAgICAgICAgICAgdGhpcy4kZWxlbWVudC5vbihoICsgXCIuXCIgKyB0aGlzLnR5cGUsIHRoaXMub3B0aW9ucy5zZWxlY3RvciwgYS5wcm94eSh0aGlzLmVudGVyLCB0aGlzKSksIFxuICAgICAgICAgICAgICAgIHRoaXMuJGVsZW1lbnQub24oaSArIFwiLlwiICsgdGhpcy50eXBlLCB0aGlzLm9wdGlvbnMuc2VsZWN0b3IsIGEucHJveHkodGhpcy5sZWF2ZSwgdGhpcykpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMub3B0aW9ucy5zZWxlY3RvciA/IHRoaXMuX29wdGlvbnMgPSBhLmV4dGVuZCh7fSwgdGhpcy5vcHRpb25zLCB7XG4gICAgICAgICAgICB0cmlnZ2VyOiBcIm1hbnVhbFwiLFxuICAgICAgICAgICAgc2VsZWN0b3I6IFwiXCJcbiAgICAgICAgfSkgOiB0aGlzLmZpeFRpdGxlKCk7XG4gICAgfSwgYy5wcm90b3R5cGUuZ2V0RGVmYXVsdHMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGMuREVGQVVMVFM7XG4gICAgfSwgYy5wcm90b3R5cGUuZ2V0T3B0aW9ucyA9IGZ1bmN0aW9uKGIpIHtcbiAgICAgICAgcmV0dXJuIGIgPSBhLmV4dGVuZCh7fSwgdGhpcy5nZXREZWZhdWx0cygpLCB0aGlzLiRlbGVtZW50LmRhdGEoKSwgYiksIGIuZGVsYXkgJiYgXCJudW1iZXJcIiA9PSB0eXBlb2YgYi5kZWxheSAmJiAoYi5kZWxheSA9IHtcbiAgICAgICAgICAgIHNob3c6IGIuZGVsYXksXG4gICAgICAgICAgICBoaWRlOiBiLmRlbGF5XG4gICAgICAgIH0pLCBiO1xuICAgIH0sIGMucHJvdG90eXBlLmdldERlbGVnYXRlT3B0aW9ucyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgYiA9IHt9LCBjID0gdGhpcy5nZXREZWZhdWx0cygpO1xuICAgICAgICByZXR1cm4gdGhpcy5fb3B0aW9ucyAmJiBhLmVhY2godGhpcy5fb3B0aW9ucywgZnVuY3Rpb24oYSwgZCkge1xuICAgICAgICAgICAgY1thXSAhPSBkICYmIChiW2FdID0gZCk7XG4gICAgICAgIH0pLCBiO1xuICAgIH0sIGMucHJvdG90eXBlLmVudGVyID0gZnVuY3Rpb24oYikge1xuICAgICAgICB2YXIgYyA9IGIgaW5zdGFuY2VvZiB0aGlzLmNvbnN0cnVjdG9yID8gYiA6IGEoYi5jdXJyZW50VGFyZ2V0KS5kYXRhKFwiYnMuXCIgKyB0aGlzLnR5cGUpO1xuICAgICAgICByZXR1cm4gYyB8fCAoYyA9IG5ldyB0aGlzLmNvbnN0cnVjdG9yKGIuY3VycmVudFRhcmdldCwgdGhpcy5nZXREZWxlZ2F0ZU9wdGlvbnMoKSksIFxuICAgICAgICBhKGIuY3VycmVudFRhcmdldCkuZGF0YShcImJzLlwiICsgdGhpcy50eXBlLCBjKSksIGNsZWFyVGltZW91dChjLnRpbWVvdXQpLCBjLmhvdmVyU3RhdGUgPSBcImluXCIsIFxuICAgICAgICBjLm9wdGlvbnMuZGVsYXkgJiYgYy5vcHRpb25zLmRlbGF5LnNob3cgPyB2b2lkIChjLnRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgXCJpblwiID09IGMuaG92ZXJTdGF0ZSAmJiBjLnNob3coKTtcbiAgICAgICAgfSwgYy5vcHRpb25zLmRlbGF5LnNob3cpKSA6IGMuc2hvdygpO1xuICAgIH0sIGMucHJvdG90eXBlLmxlYXZlID0gZnVuY3Rpb24oYikge1xuICAgICAgICB2YXIgYyA9IGIgaW5zdGFuY2VvZiB0aGlzLmNvbnN0cnVjdG9yID8gYiA6IGEoYi5jdXJyZW50VGFyZ2V0KS5kYXRhKFwiYnMuXCIgKyB0aGlzLnR5cGUpO1xuICAgICAgICByZXR1cm4gYyB8fCAoYyA9IG5ldyB0aGlzLmNvbnN0cnVjdG9yKGIuY3VycmVudFRhcmdldCwgdGhpcy5nZXREZWxlZ2F0ZU9wdGlvbnMoKSksIFxuICAgICAgICBhKGIuY3VycmVudFRhcmdldCkuZGF0YShcImJzLlwiICsgdGhpcy50eXBlLCBjKSksIGNsZWFyVGltZW91dChjLnRpbWVvdXQpLCBjLmhvdmVyU3RhdGUgPSBcIm91dFwiLCBcbiAgICAgICAgYy5vcHRpb25zLmRlbGF5ICYmIGMub3B0aW9ucy5kZWxheS5oaWRlID8gdm9pZCAoYy50aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIFwib3V0XCIgPT0gYy5ob3ZlclN0YXRlICYmIGMuaGlkZSgpO1xuICAgICAgICB9LCBjLm9wdGlvbnMuZGVsYXkuaGlkZSkpIDogYy5oaWRlKCk7XG4gICAgfSwgYy5wcm90b3R5cGUuc2hvdyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgYiA9IGEuRXZlbnQoXCJzaG93LmJzLlwiICsgdGhpcy50eXBlKTtcbiAgICAgICAgaWYgKHRoaXMuaGFzQ29udGVudCgpICYmIHRoaXMuZW5hYmxlZCkge1xuICAgICAgICAgICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKGIpO1xuICAgICAgICAgICAgdmFyIGMgPSBhLmNvbnRhaW5zKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCwgdGhpcy4kZWxlbWVudFswXSk7XG4gICAgICAgICAgICBpZiAoYi5pc0RlZmF1bHRQcmV2ZW50ZWQoKSB8fCAhYykgcmV0dXJuO1xuICAgICAgICAgICAgdmFyIGQgPSB0aGlzLCBlID0gdGhpcy50aXAoKSwgZiA9IHRoaXMuZ2V0VUlEKHRoaXMudHlwZSk7XG4gICAgICAgICAgICB0aGlzLnNldENvbnRlbnQoKSwgZS5hdHRyKFwiaWRcIiwgZiksIHRoaXMuJGVsZW1lbnQuYXR0cihcImFyaWEtZGVzY3JpYmVkYnlcIiwgZiksIHRoaXMub3B0aW9ucy5hbmltYXRpb24gJiYgZS5hZGRDbGFzcyhcImZhZGVcIik7XG4gICAgICAgICAgICB2YXIgZyA9IFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgdGhpcy5vcHRpb25zLnBsYWNlbWVudCA/IHRoaXMub3B0aW9ucy5wbGFjZW1lbnQuY2FsbCh0aGlzLCBlWzBdLCB0aGlzLiRlbGVtZW50WzBdKSA6IHRoaXMub3B0aW9ucy5wbGFjZW1lbnQsIGggPSAvXFxzP2F1dG8/XFxzPy9pLCBpID0gaC50ZXN0KGcpO1xuICAgICAgICAgICAgaSAmJiAoZyA9IGcucmVwbGFjZShoLCBcIlwiKSB8fCBcInRvcFwiKSwgZS5kZXRhY2goKS5jc3Moe1xuICAgICAgICAgICAgICAgIHRvcDogMCxcbiAgICAgICAgICAgICAgICBsZWZ0OiAwLFxuICAgICAgICAgICAgICAgIGRpc3BsYXk6IFwiYmxvY2tcIlxuICAgICAgICAgICAgfSkuYWRkQ2xhc3MoZykuZGF0YShcImJzLlwiICsgdGhpcy50eXBlLCB0aGlzKSwgdGhpcy5vcHRpb25zLmNvbnRhaW5lciA/IGUuYXBwZW5kVG8odGhpcy5vcHRpb25zLmNvbnRhaW5lcikgOiBlLmluc2VydEFmdGVyKHRoaXMuJGVsZW1lbnQpO1xuICAgICAgICAgICAgdmFyIGogPSB0aGlzLmdldFBvc2l0aW9uKCksIGsgPSBlWzBdLm9mZnNldFdpZHRoLCBsID0gZVswXS5vZmZzZXRIZWlnaHQ7XG4gICAgICAgICAgICBpZiAoaSkge1xuICAgICAgICAgICAgICAgIHZhciBtID0gZywgbiA9IHRoaXMuJGVsZW1lbnQucGFyZW50KCksIG8gPSB0aGlzLmdldFBvc2l0aW9uKG4pO1xuICAgICAgICAgICAgICAgIGcgPSBcImJvdHRvbVwiID09IGcgJiYgai50b3AgKyBqLmhlaWdodCArIGwgLSBvLnNjcm9sbCA+IG8uaGVpZ2h0ID8gXCJ0b3BcIiA6IFwidG9wXCIgPT0gZyAmJiBqLnRvcCAtIG8uc2Nyb2xsIC0gbCA8IDAgPyBcImJvdHRvbVwiIDogXCJyaWdodFwiID09IGcgJiYgai5yaWdodCArIGsgPiBvLndpZHRoID8gXCJsZWZ0XCIgOiBcImxlZnRcIiA9PSBnICYmIGoubGVmdCAtIGsgPCBvLmxlZnQgPyBcInJpZ2h0XCIgOiBnLCBcbiAgICAgICAgICAgICAgICBlLnJlbW92ZUNsYXNzKG0pLmFkZENsYXNzKGcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHAgPSB0aGlzLmdldENhbGN1bGF0ZWRPZmZzZXQoZywgaiwgaywgbCk7XG4gICAgICAgICAgICB0aGlzLmFwcGx5UGxhY2VtZW50KHAsIGcpO1xuICAgICAgICAgICAgdmFyIHEgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBkLiRlbGVtZW50LnRyaWdnZXIoXCJzaG93bi5icy5cIiArIGQudHlwZSksIGQuaG92ZXJTdGF0ZSA9IG51bGw7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgYS5zdXBwb3J0LnRyYW5zaXRpb24gJiYgdGhpcy4kdGlwLmhhc0NsYXNzKFwiZmFkZVwiKSA/IGUub25lKFwiYnNUcmFuc2l0aW9uRW5kXCIsIHEpLmVtdWxhdGVUcmFuc2l0aW9uRW5kKDE1MCkgOiBxKCk7XG4gICAgICAgIH1cbiAgICB9LCBjLnByb3RvdHlwZS5hcHBseVBsYWNlbWVudCA9IGZ1bmN0aW9uKGIsIGMpIHtcbiAgICAgICAgdmFyIGQgPSB0aGlzLnRpcCgpLCBlID0gZFswXS5vZmZzZXRXaWR0aCwgZiA9IGRbMF0ub2Zmc2V0SGVpZ2h0LCBnID0gcGFyc2VJbnQoZC5jc3MoXCJtYXJnaW4tdG9wXCIpLCAxMCksIGggPSBwYXJzZUludChkLmNzcyhcIm1hcmdpbi1sZWZ0XCIpLCAxMCk7XG4gICAgICAgIGlzTmFOKGcpICYmIChnID0gMCksIGlzTmFOKGgpICYmIChoID0gMCksIGIudG9wID0gYi50b3AgKyBnLCBiLmxlZnQgPSBiLmxlZnQgKyBoLCBcbiAgICAgICAgYS5vZmZzZXQuc2V0T2Zmc2V0KGRbMF0sIGEuZXh0ZW5kKHtcbiAgICAgICAgICAgIHVzaW5nOiBmdW5jdGlvbihhKSB7XG4gICAgICAgICAgICAgICAgZC5jc3Moe1xuICAgICAgICAgICAgICAgICAgICB0b3A6IE1hdGgucm91bmQoYS50b3ApLFxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiBNYXRoLnJvdW5kKGEubGVmdClcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgYiksIDApLCBkLmFkZENsYXNzKFwiaW5cIik7XG4gICAgICAgIHZhciBpID0gZFswXS5vZmZzZXRXaWR0aCwgaiA9IGRbMF0ub2Zmc2V0SGVpZ2h0O1xuICAgICAgICBcInRvcFwiID09IGMgJiYgaiAhPSBmICYmIChiLnRvcCA9IGIudG9wICsgZiAtIGopO1xuICAgICAgICB2YXIgayA9IHRoaXMuZ2V0Vmlld3BvcnRBZGp1c3RlZERlbHRhKGMsIGIsIGksIGopO1xuICAgICAgICBrLmxlZnQgPyBiLmxlZnQgKz0gay5sZWZ0IDogYi50b3AgKz0gay50b3A7XG4gICAgICAgIHZhciBsID0gay5sZWZ0ID8gMiAqIGsubGVmdCAtIGUgKyBpIDogMiAqIGsudG9wIC0gZiArIGosIG0gPSBrLmxlZnQgPyBcImxlZnRcIiA6IFwidG9wXCIsIG4gPSBrLmxlZnQgPyBcIm9mZnNldFdpZHRoXCIgOiBcIm9mZnNldEhlaWdodFwiO1xuICAgICAgICBkLm9mZnNldChiKSwgdGhpcy5yZXBsYWNlQXJyb3cobCwgZFswXVtuXSwgbSk7XG4gICAgfSwgYy5wcm90b3R5cGUucmVwbGFjZUFycm93ID0gZnVuY3Rpb24oYSwgYiwgYykge1xuICAgICAgICB0aGlzLmFycm93KCkuY3NzKGMsIGEgPyA1MCAqICgxIC0gYSAvIGIpICsgXCIlXCIgOiBcIlwiKTtcbiAgICB9LCBjLnByb3RvdHlwZS5zZXRDb250ZW50ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBhID0gdGhpcy50aXAoKSwgYiA9IHRoaXMuZ2V0VGl0bGUoKTtcbiAgICAgICAgYS5maW5kKFwiLnRvb2x0aXAtaW5uZXJcIilbdGhpcy5vcHRpb25zLmh0bWwgPyBcImh0bWxcIiA6IFwidGV4dFwiXShiKSwgYS5yZW1vdmVDbGFzcyhcImZhZGUgaW4gdG9wIGJvdHRvbSBsZWZ0IHJpZ2h0XCIpO1xuICAgIH0sIGMucHJvdG90eXBlLmhpZGUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgZnVuY3Rpb24gYigpIHtcbiAgICAgICAgICAgIFwiaW5cIiAhPSBjLmhvdmVyU3RhdGUgJiYgZC5kZXRhY2goKSwgYy4kZWxlbWVudC50cmlnZ2VyKFwiaGlkZGVuLmJzLlwiICsgYy50eXBlKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgYyA9IHRoaXMsIGQgPSB0aGlzLnRpcCgpLCBlID0gYS5FdmVudChcImhpZGUuYnMuXCIgKyB0aGlzLnR5cGUpO1xuICAgICAgICByZXR1cm4gdGhpcy4kZWxlbWVudC5yZW1vdmVBdHRyKFwiYXJpYS1kZXNjcmliZWRieVwiKSwgdGhpcy4kZWxlbWVudC50cmlnZ2VyKGUpLCBlLmlzRGVmYXVsdFByZXZlbnRlZCgpID8gdm9pZCAwIDogKGQucmVtb3ZlQ2xhc3MoXCJpblwiKSwgXG4gICAgICAgIGEuc3VwcG9ydC50cmFuc2l0aW9uICYmIHRoaXMuJHRpcC5oYXNDbGFzcyhcImZhZGVcIikgPyBkLm9uZShcImJzVHJhbnNpdGlvbkVuZFwiLCBiKS5lbXVsYXRlVHJhbnNpdGlvbkVuZCgxNTApIDogYigpLCBcbiAgICAgICAgdGhpcy5ob3ZlclN0YXRlID0gbnVsbCwgdGhpcyk7XG4gICAgfSwgYy5wcm90b3R5cGUuZml4VGl0bGUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGEgPSB0aGlzLiRlbGVtZW50O1xuICAgICAgICAoYS5hdHRyKFwidGl0bGVcIikgfHwgXCJzdHJpbmdcIiAhPSB0eXBlb2YgYS5hdHRyKFwiZGF0YS1vcmlnaW5hbC10aXRsZVwiKSkgJiYgYS5hdHRyKFwiZGF0YS1vcmlnaW5hbC10aXRsZVwiLCBhLmF0dHIoXCJ0aXRsZVwiKSB8fCBcIlwiKS5hdHRyKFwidGl0bGVcIiwgXCJcIik7XG4gICAgfSwgYy5wcm90b3R5cGUuaGFzQ29udGVudCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRUaXRsZSgpO1xuICAgIH0sIGMucHJvdG90eXBlLmdldFBvc2l0aW9uID0gZnVuY3Rpb24oYikge1xuICAgICAgICBiID0gYiB8fCB0aGlzLiRlbGVtZW50O1xuICAgICAgICB2YXIgYyA9IGJbMF0sIGQgPSBcIkJPRFlcIiA9PSBjLnRhZ05hbWU7XG4gICAgICAgIHJldHVybiBhLmV4dGVuZCh7fSwgXCJmdW5jdGlvblwiID09IHR5cGVvZiBjLmdldEJvdW5kaW5nQ2xpZW50UmVjdCA/IGMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkgOiBudWxsLCB7XG4gICAgICAgICAgICBzY3JvbGw6IGQgPyBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wIHx8IGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wIDogYi5zY3JvbGxUb3AoKSxcbiAgICAgICAgICAgIHdpZHRoOiBkID8gYSh3aW5kb3cpLndpZHRoKCkgOiBiLm91dGVyV2lkdGgoKSxcbiAgICAgICAgICAgIGhlaWdodDogZCA/IGEod2luZG93KS5oZWlnaHQoKSA6IGIub3V0ZXJIZWlnaHQoKVxuICAgICAgICB9LCBkID8ge1xuICAgICAgICAgICAgdG9wOiAwLFxuICAgICAgICAgICAgbGVmdDogMFxuICAgICAgICB9IDogYi5vZmZzZXQoKSk7XG4gICAgfSwgYy5wcm90b3R5cGUuZ2V0Q2FsY3VsYXRlZE9mZnNldCA9IGZ1bmN0aW9uKGEsIGIsIGMsIGQpIHtcbiAgICAgICAgcmV0dXJuIFwiYm90dG9tXCIgPT0gYSA/IHtcbiAgICAgICAgICAgIHRvcDogYi50b3AgKyBiLmhlaWdodCxcbiAgICAgICAgICAgIGxlZnQ6IGIubGVmdCArIGIud2lkdGggLyAyIC0gYyAvIDJcbiAgICAgICAgfSA6IFwidG9wXCIgPT0gYSA/IHtcbiAgICAgICAgICAgIHRvcDogYi50b3AgLSBkLFxuICAgICAgICAgICAgbGVmdDogYi5sZWZ0ICsgYi53aWR0aCAvIDIgLSBjIC8gMlxuICAgICAgICB9IDogXCJsZWZ0XCIgPT0gYSA/IHtcbiAgICAgICAgICAgIHRvcDogYi50b3AgKyBiLmhlaWdodCAvIDIgLSBkIC8gMixcbiAgICAgICAgICAgIGxlZnQ6IGIubGVmdCAtIGNcbiAgICAgICAgfSA6IHtcbiAgICAgICAgICAgIHRvcDogYi50b3AgKyBiLmhlaWdodCAvIDIgLSBkIC8gMixcbiAgICAgICAgICAgIGxlZnQ6IGIubGVmdCArIGIud2lkdGhcbiAgICAgICAgfTtcbiAgICB9LCBjLnByb3RvdHlwZS5nZXRWaWV3cG9ydEFkanVzdGVkRGVsdGEgPSBmdW5jdGlvbihhLCBiLCBjLCBkKSB7XG4gICAgICAgIHZhciBlID0ge1xuICAgICAgICAgICAgdG9wOiAwLFxuICAgICAgICAgICAgbGVmdDogMFxuICAgICAgICB9O1xuICAgICAgICBpZiAoIXRoaXMuJHZpZXdwb3J0KSByZXR1cm4gZTtcbiAgICAgICAgdmFyIGYgPSB0aGlzLm9wdGlvbnMudmlld3BvcnQgJiYgdGhpcy5vcHRpb25zLnZpZXdwb3J0LnBhZGRpbmcgfHwgMCwgZyA9IHRoaXMuZ2V0UG9zaXRpb24odGhpcy4kdmlld3BvcnQpO1xuICAgICAgICBpZiAoL3JpZ2h0fGxlZnQvLnRlc3QoYSkpIHtcbiAgICAgICAgICAgIHZhciBoID0gYi50b3AgLSBmIC0gZy5zY3JvbGwsIGkgPSBiLnRvcCArIGYgLSBnLnNjcm9sbCArIGQ7XG4gICAgICAgICAgICBoIDwgZy50b3AgPyBlLnRvcCA9IGcudG9wIC0gaCA6IGkgPiBnLnRvcCArIGcuaGVpZ2h0ICYmIChlLnRvcCA9IGcudG9wICsgZy5oZWlnaHQgLSBpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciBqID0gYi5sZWZ0IC0gZiwgayA9IGIubGVmdCArIGYgKyBjO1xuICAgICAgICAgICAgaiA8IGcubGVmdCA/IGUubGVmdCA9IGcubGVmdCAtIGogOiBrID4gZy53aWR0aCAmJiAoZS5sZWZ0ID0gZy5sZWZ0ICsgZy53aWR0aCAtIGspO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlO1xuICAgIH0sIGMucHJvdG90eXBlLmdldFRpdGxlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBhLCBiID0gdGhpcy4kZWxlbWVudCwgYyA9IHRoaXMub3B0aW9ucztcbiAgICAgICAgcmV0dXJuIGEgPSBiLmF0dHIoXCJkYXRhLW9yaWdpbmFsLXRpdGxlXCIpIHx8IChcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIGMudGl0bGUgPyBjLnRpdGxlLmNhbGwoYlswXSkgOiBjLnRpdGxlKTtcbiAgICB9LCBjLnByb3RvdHlwZS5nZXRVSUQgPSBmdW5jdGlvbihhKSB7XG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIGEgKz0gfn4oMWU2ICogTWF0aC5yYW5kb20oKSk7XG4gICAgICAgIH0gd2hpbGUgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGEpKTtcbiAgICAgICAgcmV0dXJuIGE7XG4gICAgfSwgYy5wcm90b3R5cGUudGlwID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiR0aXAgPSB0aGlzLiR0aXAgfHwgYSh0aGlzLm9wdGlvbnMudGVtcGxhdGUpO1xuICAgIH0sIGMucHJvdG90eXBlLmFycm93ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiRhcnJvdyA9IHRoaXMuJGFycm93IHx8IHRoaXMudGlwKCkuZmluZChcIi50b29sdGlwLWFycm93XCIpO1xuICAgIH0sIGMucHJvdG90eXBlLnZhbGlkYXRlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuJGVsZW1lbnRbMF0ucGFyZW50Tm9kZSB8fCAodGhpcy5oaWRlKCksIHRoaXMuJGVsZW1lbnQgPSBudWxsLCB0aGlzLm9wdGlvbnMgPSBudWxsKTtcbiAgICB9LCBjLnByb3RvdHlwZS5lbmFibGUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5lbmFibGVkID0gITA7XG4gICAgfSwgYy5wcm90b3R5cGUuZGlzYWJsZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmVuYWJsZWQgPSAhMTtcbiAgICB9LCBjLnByb3RvdHlwZS50b2dnbGVFbmFibGVkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZW5hYmxlZCA9ICF0aGlzLmVuYWJsZWQ7XG4gICAgfSwgYy5wcm90b3R5cGUudG9nZ2xlID0gZnVuY3Rpb24oYikge1xuICAgICAgICB2YXIgYyA9IHRoaXM7XG4gICAgICAgIGIgJiYgKGMgPSBhKGIuY3VycmVudFRhcmdldCkuZGF0YShcImJzLlwiICsgdGhpcy50eXBlKSwgYyB8fCAoYyA9IG5ldyB0aGlzLmNvbnN0cnVjdG9yKGIuY3VycmVudFRhcmdldCwgdGhpcy5nZXREZWxlZ2F0ZU9wdGlvbnMoKSksIFxuICAgICAgICBhKGIuY3VycmVudFRhcmdldCkuZGF0YShcImJzLlwiICsgdGhpcy50eXBlLCBjKSkpLCBjLnRpcCgpLmhhc0NsYXNzKFwiaW5cIikgPyBjLmxlYXZlKGMpIDogYy5lbnRlcihjKTtcbiAgICB9LCBjLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpLCB0aGlzLmhpZGUoKS4kZWxlbWVudC5vZmYoXCIuXCIgKyB0aGlzLnR5cGUpLnJlbW92ZURhdGEoXCJicy5cIiArIHRoaXMudHlwZSk7XG4gICAgfTtcbiAgICB2YXIgZCA9IGEuZm4udG9vbHRpcDtcbiAgICBhLmZuLnRvb2x0aXAgPSBiLCBhLmZuLnRvb2x0aXAuQ29uc3RydWN0b3IgPSBjLCBhLmZuLnRvb2x0aXAubm9Db25mbGljdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gYS5mbi50b29sdGlwID0gZCwgdGhpcztcbiAgICB9O1xufShqUXVlcnkpLCArZnVuY3Rpb24oYSkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIGZ1bmN0aW9uIGIoYikge1xuICAgICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGQgPSBhKHRoaXMpLCBlID0gZC5kYXRhKFwiYnMucG9wb3ZlclwiKSwgZiA9IFwib2JqZWN0XCIgPT0gdHlwZW9mIGIgJiYgYjtcbiAgICAgICAgICAgIChlIHx8IFwiZGVzdHJveVwiICE9IGIpICYmIChlIHx8IGQuZGF0YShcImJzLnBvcG92ZXJcIiwgZSA9IG5ldyBjKHRoaXMsIGYpKSwgXCJzdHJpbmdcIiA9PSB0eXBlb2YgYiAmJiBlW2JdKCkpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgdmFyIGMgPSBmdW5jdGlvbihhLCBiKSB7XG4gICAgICAgIHRoaXMuaW5pdChcInBvcG92ZXJcIiwgYSwgYik7XG4gICAgfTtcbiAgICBpZiAoIWEuZm4udG9vbHRpcCkgdGhyb3cgbmV3IEVycm9yKFwiUG9wb3ZlciByZXF1aXJlcyB0b29sdGlwLmpzXCIpO1xuICAgIGMuVkVSU0lPTiA9IFwiMy4yLjBcIiwgYy5ERUZBVUxUUyA9IGEuZXh0ZW5kKHt9LCBhLmZuLnRvb2x0aXAuQ29uc3RydWN0b3IuREVGQVVMVFMsIHtcbiAgICAgICAgcGxhY2VtZW50OiBcInJpZ2h0XCIsXG4gICAgICAgIHRyaWdnZXI6IFwiY2xpY2tcIixcbiAgICAgICAgY29udGVudDogXCJcIixcbiAgICAgICAgdGVtcGxhdGU6ICc8ZGl2IGNsYXNzPVwicG9wb3ZlclwiIHJvbGU9XCJ0b29sdGlwXCI+PGRpdiBjbGFzcz1cImFycm93XCI+PC9kaXY+PGgzIGNsYXNzPVwicG9wb3Zlci10aXRsZVwiPjwvaDM+PGRpdiBjbGFzcz1cInBvcG92ZXItY29udGVudFwiPjwvZGl2PjwvZGl2PidcbiAgICB9KSwgYy5wcm90b3R5cGUgPSBhLmV4dGVuZCh7fSwgYS5mbi50b29sdGlwLkNvbnN0cnVjdG9yLnByb3RvdHlwZSksIGMucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gYywgXG4gICAgYy5wcm90b3R5cGUuZ2V0RGVmYXVsdHMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGMuREVGQVVMVFM7XG4gICAgfSwgYy5wcm90b3R5cGUuc2V0Q29udGVudCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgYSA9IHRoaXMudGlwKCksIGIgPSB0aGlzLmdldFRpdGxlKCksIGMgPSB0aGlzLmdldENvbnRlbnQoKTtcbiAgICAgICAgYS5maW5kKFwiLnBvcG92ZXItdGl0bGVcIilbdGhpcy5vcHRpb25zLmh0bWwgPyBcImh0bWxcIiA6IFwidGV4dFwiXShiKSwgYS5maW5kKFwiLnBvcG92ZXItY29udGVudFwiKS5lbXB0eSgpW3RoaXMub3B0aW9ucy5odG1sID8gXCJzdHJpbmdcIiA9PSB0eXBlb2YgYyA/IFwiaHRtbFwiIDogXCJhcHBlbmRcIiA6IFwidGV4dFwiXShjKSwgXG4gICAgICAgIGEucmVtb3ZlQ2xhc3MoXCJmYWRlIHRvcCBib3R0b20gbGVmdCByaWdodCBpblwiKSwgYS5maW5kKFwiLnBvcG92ZXItdGl0bGVcIikuaHRtbCgpIHx8IGEuZmluZChcIi5wb3BvdmVyLXRpdGxlXCIpLmhpZGUoKTtcbiAgICB9LCBjLnByb3RvdHlwZS5oYXNDb250ZW50ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFRpdGxlKCkgfHwgdGhpcy5nZXRDb250ZW50KCk7XG4gICAgfSwgYy5wcm90b3R5cGUuZ2V0Q29udGVudCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgYSA9IHRoaXMuJGVsZW1lbnQsIGIgPSB0aGlzLm9wdGlvbnM7XG4gICAgICAgIHJldHVybiBhLmF0dHIoXCJkYXRhLWNvbnRlbnRcIikgfHwgKFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgYi5jb250ZW50ID8gYi5jb250ZW50LmNhbGwoYVswXSkgOiBiLmNvbnRlbnQpO1xuICAgIH0sIGMucHJvdG90eXBlLmFycm93ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiRhcnJvdyA9IHRoaXMuJGFycm93IHx8IHRoaXMudGlwKCkuZmluZChcIi5hcnJvd1wiKTtcbiAgICB9LCBjLnByb3RvdHlwZS50aXAgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJHRpcCB8fCAodGhpcy4kdGlwID0gYSh0aGlzLm9wdGlvbnMudGVtcGxhdGUpKSwgdGhpcy4kdGlwO1xuICAgIH07XG4gICAgdmFyIGQgPSBhLmZuLnBvcG92ZXI7XG4gICAgYS5mbi5wb3BvdmVyID0gYiwgYS5mbi5wb3BvdmVyLkNvbnN0cnVjdG9yID0gYywgYS5mbi5wb3BvdmVyLm5vQ29uZmxpY3QgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGEuZm4ucG9wb3ZlciA9IGQsIHRoaXM7XG4gICAgfTtcbn0oalF1ZXJ5KSwgK2Z1bmN0aW9uKGEpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICBmdW5jdGlvbiBiKGMsIGQpIHtcbiAgICAgICAgdmFyIGUgPSBhLnByb3h5KHRoaXMucHJvY2VzcywgdGhpcyk7XG4gICAgICAgIHRoaXMuJGJvZHkgPSBhKFwiYm9keVwiKSwgdGhpcy4kc2Nyb2xsRWxlbWVudCA9IGEoYShjKS5pcyhcImJvZHlcIikgPyB3aW5kb3cgOiBjKSwgdGhpcy5vcHRpb25zID0gYS5leHRlbmQoe30sIGIuREVGQVVMVFMsIGQpLCBcbiAgICAgICAgdGhpcy5zZWxlY3RvciA9ICh0aGlzLm9wdGlvbnMudGFyZ2V0IHx8IFwiXCIpICsgXCIgLm5hdiBsaSA+IGFcIiwgdGhpcy5vZmZzZXRzID0gW10sIFxuICAgICAgICB0aGlzLnRhcmdldHMgPSBbXSwgdGhpcy5hY3RpdmVUYXJnZXQgPSBudWxsLCB0aGlzLnNjcm9sbEhlaWdodCA9IDAsIHRoaXMuJHNjcm9sbEVsZW1lbnQub24oXCJzY3JvbGwuYnMuc2Nyb2xsc3B5XCIsIGUpLCBcbiAgICAgICAgdGhpcy5yZWZyZXNoKCksIHRoaXMucHJvY2VzcygpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjKGMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBkID0gYSh0aGlzKSwgZSA9IGQuZGF0YShcImJzLnNjcm9sbHNweVwiKSwgZiA9IFwib2JqZWN0XCIgPT0gdHlwZW9mIGMgJiYgYztcbiAgICAgICAgICAgIGUgfHwgZC5kYXRhKFwiYnMuc2Nyb2xsc3B5XCIsIGUgPSBuZXcgYih0aGlzLCBmKSksIFwic3RyaW5nXCIgPT0gdHlwZW9mIGMgJiYgZVtjXSgpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgYi5WRVJTSU9OID0gXCIzLjIuMFwiLCBiLkRFRkFVTFRTID0ge1xuICAgICAgICBvZmZzZXQ6IDEwXG4gICAgfSwgYi5wcm90b3R5cGUuZ2V0U2Nyb2xsSGVpZ2h0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiRzY3JvbGxFbGVtZW50WzBdLnNjcm9sbEhlaWdodCB8fCBNYXRoLm1heCh0aGlzLiRib2R5WzBdLnNjcm9sbEhlaWdodCwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbEhlaWdodCk7XG4gICAgfSwgYi5wcm90b3R5cGUucmVmcmVzaCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgYiA9IFwib2Zmc2V0XCIsIGMgPSAwO1xuICAgICAgICBhLmlzV2luZG93KHRoaXMuJHNjcm9sbEVsZW1lbnRbMF0pIHx8IChiID0gXCJwb3NpdGlvblwiLCBjID0gdGhpcy4kc2Nyb2xsRWxlbWVudC5zY3JvbGxUb3AoKSksIFxuICAgICAgICB0aGlzLm9mZnNldHMgPSBbXSwgdGhpcy50YXJnZXRzID0gW10sIHRoaXMuc2Nyb2xsSGVpZ2h0ID0gdGhpcy5nZXRTY3JvbGxIZWlnaHQoKTtcbiAgICAgICAgdmFyIGQgPSB0aGlzO1xuICAgICAgICB0aGlzLiRib2R5LmZpbmQodGhpcy5zZWxlY3RvcikubWFwKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGQgPSBhKHRoaXMpLCBlID0gZC5kYXRhKFwidGFyZ2V0XCIpIHx8IGQuYXR0cihcImhyZWZcIiksIGYgPSAvXiMuLy50ZXN0KGUpICYmIGEoZSk7XG4gICAgICAgICAgICByZXR1cm4gZiAmJiBmLmxlbmd0aCAmJiBmLmlzKFwiOnZpc2libGVcIikgJiYgWyBbIGZbYl0oKS50b3AgKyBjLCBlIF0gXSB8fCBudWxsO1xuICAgICAgICB9KS5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgICAgICAgIHJldHVybiBhWzBdIC0gYlswXTtcbiAgICAgICAgfSkuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGQub2Zmc2V0cy5wdXNoKHRoaXNbMF0pLCBkLnRhcmdldHMucHVzaCh0aGlzWzFdKTtcbiAgICAgICAgfSk7XG4gICAgfSwgYi5wcm90b3R5cGUucHJvY2VzcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgYSwgYiA9IHRoaXMuJHNjcm9sbEVsZW1lbnQuc2Nyb2xsVG9wKCkgKyB0aGlzLm9wdGlvbnMub2Zmc2V0LCBjID0gdGhpcy5nZXRTY3JvbGxIZWlnaHQoKSwgZCA9IHRoaXMub3B0aW9ucy5vZmZzZXQgKyBjIC0gdGhpcy4kc2Nyb2xsRWxlbWVudC5oZWlnaHQoKSwgZSA9IHRoaXMub2Zmc2V0cywgZiA9IHRoaXMudGFyZ2V0cywgZyA9IHRoaXMuYWN0aXZlVGFyZ2V0O1xuICAgICAgICBpZiAodGhpcy5zY3JvbGxIZWlnaHQgIT0gYyAmJiB0aGlzLnJlZnJlc2goKSwgYiA+PSBkKSByZXR1cm4gZyAhPSAoYSA9IGZbZi5sZW5ndGggLSAxXSkgJiYgdGhpcy5hY3RpdmF0ZShhKTtcbiAgICAgICAgaWYgKGcgJiYgYiA8PSBlWzBdKSByZXR1cm4gZyAhPSAoYSA9IGZbMF0pICYmIHRoaXMuYWN0aXZhdGUoYSk7XG4gICAgICAgIGZvciAoYSA9IGUubGVuZ3RoOyBhLS07ICkgZyAhPSBmW2FdICYmIGIgPj0gZVthXSAmJiAoIWVbYSArIDFdIHx8IGIgPD0gZVthICsgMV0pICYmIHRoaXMuYWN0aXZhdGUoZlthXSk7XG4gICAgfSwgYi5wcm90b3R5cGUuYWN0aXZhdGUgPSBmdW5jdGlvbihiKSB7XG4gICAgICAgIHRoaXMuYWN0aXZlVGFyZ2V0ID0gYiwgYSh0aGlzLnNlbGVjdG9yKS5wYXJlbnRzVW50aWwodGhpcy5vcHRpb25zLnRhcmdldCwgXCIuYWN0aXZlXCIpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xuICAgICAgICB2YXIgYyA9IHRoaXMuc2VsZWN0b3IgKyAnW2RhdGEtdGFyZ2V0PVwiJyArIGIgKyAnXCJdLCcgKyB0aGlzLnNlbGVjdG9yICsgJ1tocmVmPVwiJyArIGIgKyAnXCJdJywgZCA9IGEoYykucGFyZW50cyhcImxpXCIpLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xuICAgICAgICBkLnBhcmVudChcIi5kcm9wZG93bi1tZW51XCIpLmxlbmd0aCAmJiAoZCA9IGQuY2xvc2VzdChcImxpLmRyb3Bkb3duXCIpLmFkZENsYXNzKFwiYWN0aXZlXCIpKSwgXG4gICAgICAgIGQudHJpZ2dlcihcImFjdGl2YXRlLmJzLnNjcm9sbHNweVwiKTtcbiAgICB9O1xuICAgIHZhciBkID0gYS5mbi5zY3JvbGxzcHk7XG4gICAgYS5mbi5zY3JvbGxzcHkgPSBjLCBhLmZuLnNjcm9sbHNweS5Db25zdHJ1Y3RvciA9IGIsIGEuZm4uc2Nyb2xsc3B5Lm5vQ29uZmxpY3QgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGEuZm4uc2Nyb2xsc3B5ID0gZCwgdGhpcztcbiAgICB9LCBhKHdpbmRvdykub24oXCJsb2FkLmJzLnNjcm9sbHNweS5kYXRhLWFwaVwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgYSgnW2RhdGEtc3B5PVwic2Nyb2xsXCJdJykuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBiID0gYSh0aGlzKTtcbiAgICAgICAgICAgIGMuY2FsbChiLCBiLmRhdGEoKSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufShqUXVlcnkpLCArZnVuY3Rpb24oYSkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIGZ1bmN0aW9uIGIoYikge1xuICAgICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGQgPSBhKHRoaXMpLCBlID0gZC5kYXRhKFwiYnMudGFiXCIpO1xuICAgICAgICAgICAgZSB8fCBkLmRhdGEoXCJicy50YWJcIiwgZSA9IG5ldyBjKHRoaXMpKSwgXCJzdHJpbmdcIiA9PSB0eXBlb2YgYiAmJiBlW2JdKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICB2YXIgYyA9IGZ1bmN0aW9uKGIpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gYShiKTtcbiAgICB9O1xuICAgIGMuVkVSU0lPTiA9IFwiMy4yLjBcIiwgYy5wcm90b3R5cGUuc2hvdyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgYiA9IHRoaXMuZWxlbWVudCwgYyA9IGIuY2xvc2VzdChcInVsOm5vdCguZHJvcGRvd24tbWVudSlcIiksIGQgPSBiLmRhdGEoXCJ0YXJnZXRcIik7XG4gICAgICAgIGlmIChkIHx8IChkID0gYi5hdHRyKFwiaHJlZlwiKSwgZCA9IGQgJiYgZC5yZXBsYWNlKC8uKig/PSNbXlxcc10qJCkvLCBcIlwiKSksICFiLnBhcmVudChcImxpXCIpLmhhc0NsYXNzKFwiYWN0aXZlXCIpKSB7XG4gICAgICAgICAgICB2YXIgZSA9IGMuZmluZChcIi5hY3RpdmU6bGFzdCBhXCIpWzBdLCBmID0gYS5FdmVudChcInNob3cuYnMudGFiXCIsIHtcbiAgICAgICAgICAgICAgICByZWxhdGVkVGFyZ2V0OiBlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChiLnRyaWdnZXIoZiksICFmLmlzRGVmYXVsdFByZXZlbnRlZCgpKSB7XG4gICAgICAgICAgICAgICAgdmFyIGcgPSBhKGQpO1xuICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZhdGUoYi5jbG9zZXN0KFwibGlcIiksIGMpLCB0aGlzLmFjdGl2YXRlKGcsIGcucGFyZW50KCksIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBiLnRyaWdnZXIoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJzaG93bi5icy50YWJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbGF0ZWRUYXJnZXQ6IGVcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LCBjLnByb3RvdHlwZS5hY3RpdmF0ZSA9IGZ1bmN0aW9uKGIsIGMsIGQpIHtcbiAgICAgICAgZnVuY3Rpb24gZSgpIHtcbiAgICAgICAgICAgIGYucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIikuZmluZChcIj4gLmRyb3Bkb3duLW1lbnUgPiAuYWN0aXZlXCIpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpLCBcbiAgICAgICAgICAgIGIuYWRkQ2xhc3MoXCJhY3RpdmVcIiksIGcgPyAoYlswXS5vZmZzZXRXaWR0aCwgYi5hZGRDbGFzcyhcImluXCIpKSA6IGIucmVtb3ZlQ2xhc3MoXCJmYWRlXCIpLCBcbiAgICAgICAgICAgIGIucGFyZW50KFwiLmRyb3Bkb3duLW1lbnVcIikgJiYgYi5jbG9zZXN0KFwibGkuZHJvcGRvd25cIikuYWRkQ2xhc3MoXCJhY3RpdmVcIiksIGQgJiYgZCgpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBmID0gYy5maW5kKFwiPiAuYWN0aXZlXCIpLCBnID0gZCAmJiBhLnN1cHBvcnQudHJhbnNpdGlvbiAmJiBmLmhhc0NsYXNzKFwiZmFkZVwiKTtcbiAgICAgICAgZyA/IGYub25lKFwiYnNUcmFuc2l0aW9uRW5kXCIsIGUpLmVtdWxhdGVUcmFuc2l0aW9uRW5kKDE1MCkgOiBlKCksIGYucmVtb3ZlQ2xhc3MoXCJpblwiKTtcbiAgICB9O1xuICAgIHZhciBkID0gYS5mbi50YWI7XG4gICAgYS5mbi50YWIgPSBiLCBhLmZuLnRhYi5Db25zdHJ1Y3RvciA9IGMsIGEuZm4udGFiLm5vQ29uZmxpY3QgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGEuZm4udGFiID0gZCwgdGhpcztcbiAgICB9LCBhKGRvY3VtZW50KS5vbihcImNsaWNrLmJzLnRhYi5kYXRhLWFwaVwiLCAnW2RhdGEtdG9nZ2xlPVwidGFiXCJdLCBbZGF0YS10b2dnbGU9XCJwaWxsXCJdJywgZnVuY3Rpb24oYykge1xuICAgICAgICBjLnByZXZlbnREZWZhdWx0KCksIGIuY2FsbChhKHRoaXMpLCBcInNob3dcIik7XG4gICAgfSk7XG59KGpRdWVyeSksICtmdW5jdGlvbihhKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgZnVuY3Rpb24gYihiKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgZCA9IGEodGhpcyksIGUgPSBkLmRhdGEoXCJicy5hZmZpeFwiKSwgZiA9IFwib2JqZWN0XCIgPT0gdHlwZW9mIGIgJiYgYjtcbiAgICAgICAgICAgIGUgfHwgZC5kYXRhKFwiYnMuYWZmaXhcIiwgZSA9IG5ldyBjKHRoaXMsIGYpKSwgXCJzdHJpbmdcIiA9PSB0eXBlb2YgYiAmJiBlW2JdKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICB2YXIgYyA9IGZ1bmN0aW9uKGIsIGQpIHtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gYS5leHRlbmQoe30sIGMuREVGQVVMVFMsIGQpLCB0aGlzLiR0YXJnZXQgPSBhKHRoaXMub3B0aW9ucy50YXJnZXQpLm9uKFwic2Nyb2xsLmJzLmFmZml4LmRhdGEtYXBpXCIsIGEucHJveHkodGhpcy5jaGVja1Bvc2l0aW9uLCB0aGlzKSkub24oXCJjbGljay5icy5hZmZpeC5kYXRhLWFwaVwiLCBhLnByb3h5KHRoaXMuY2hlY2tQb3NpdGlvbldpdGhFdmVudExvb3AsIHRoaXMpKSwgXG4gICAgICAgIHRoaXMuJGVsZW1lbnQgPSBhKGIpLCB0aGlzLmFmZml4ZWQgPSB0aGlzLnVucGluID0gdGhpcy5waW5uZWRPZmZzZXQgPSBudWxsLCB0aGlzLmNoZWNrUG9zaXRpb24oKTtcbiAgICB9O1xuICAgIGMuVkVSU0lPTiA9IFwiMy4yLjBcIiwgYy5SRVNFVCA9IFwiYWZmaXggYWZmaXgtdG9wIGFmZml4LWJvdHRvbVwiLCBjLkRFRkFVTFRTID0ge1xuICAgICAgICBvZmZzZXQ6IDAsXG4gICAgICAgIHRhcmdldDogd2luZG93XG4gICAgfSwgYy5wcm90b3R5cGUuZ2V0UGlubmVkT2Zmc2V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLnBpbm5lZE9mZnNldCkgcmV0dXJuIHRoaXMucGlubmVkT2Zmc2V0O1xuICAgICAgICB0aGlzLiRlbGVtZW50LnJlbW92ZUNsYXNzKGMuUkVTRVQpLmFkZENsYXNzKFwiYWZmaXhcIik7XG4gICAgICAgIHZhciBhID0gdGhpcy4kdGFyZ2V0LnNjcm9sbFRvcCgpLCBiID0gdGhpcy4kZWxlbWVudC5vZmZzZXQoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucGlubmVkT2Zmc2V0ID0gYi50b3AgLSBhO1xuICAgIH0sIGMucHJvdG90eXBlLmNoZWNrUG9zaXRpb25XaXRoRXZlbnRMb29wID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHNldFRpbWVvdXQoYS5wcm94eSh0aGlzLmNoZWNrUG9zaXRpb24sIHRoaXMpLCAxKTtcbiAgICB9LCBjLnByb3RvdHlwZS5jaGVja1Bvc2l0aW9uID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLiRlbGVtZW50LmlzKFwiOnZpc2libGVcIikpIHtcbiAgICAgICAgICAgIHZhciBiID0gYShkb2N1bWVudCkuaGVpZ2h0KCksIGQgPSB0aGlzLiR0YXJnZXQuc2Nyb2xsVG9wKCksIGUgPSB0aGlzLiRlbGVtZW50Lm9mZnNldCgpLCBmID0gdGhpcy5vcHRpb25zLm9mZnNldCwgZyA9IGYudG9wLCBoID0gZi5ib3R0b207XG4gICAgICAgICAgICBcIm9iamVjdFwiICE9IHR5cGVvZiBmICYmIChoID0gZyA9IGYpLCBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIGcgJiYgKGcgPSBmLnRvcCh0aGlzLiRlbGVtZW50KSksIFxuICAgICAgICAgICAgXCJmdW5jdGlvblwiID09IHR5cGVvZiBoICYmIChoID0gZi5ib3R0b20odGhpcy4kZWxlbWVudCkpO1xuICAgICAgICAgICAgdmFyIGkgPSBudWxsICE9IHRoaXMudW5waW4gJiYgZCArIHRoaXMudW5waW4gPD0gZS50b3AgPyAhMSA6IG51bGwgIT0gaCAmJiBlLnRvcCArIHRoaXMuJGVsZW1lbnQuaGVpZ2h0KCkgPj0gYiAtIGggPyBcImJvdHRvbVwiIDogbnVsbCAhPSBnICYmIGcgPj0gZCA/IFwidG9wXCIgOiAhMTtcbiAgICAgICAgICAgIGlmICh0aGlzLmFmZml4ZWQgIT09IGkpIHtcbiAgICAgICAgICAgICAgICBudWxsICE9IHRoaXMudW5waW4gJiYgdGhpcy4kZWxlbWVudC5jc3MoXCJ0b3BcIiwgXCJcIik7XG4gICAgICAgICAgICAgICAgdmFyIGogPSBcImFmZml4XCIgKyAoaSA/IFwiLVwiICsgaSA6IFwiXCIpLCBrID0gYS5FdmVudChqICsgXCIuYnMuYWZmaXhcIik7XG4gICAgICAgICAgICAgICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKGspLCBrLmlzRGVmYXVsdFByZXZlbnRlZCgpIHx8ICh0aGlzLmFmZml4ZWQgPSBpLCB0aGlzLnVucGluID0gXCJib3R0b21cIiA9PSBpID8gdGhpcy5nZXRQaW5uZWRPZmZzZXQoKSA6IG51bGwsIFxuICAgICAgICAgICAgICAgIHRoaXMuJGVsZW1lbnQucmVtb3ZlQ2xhc3MoYy5SRVNFVCkuYWRkQ2xhc3MoaikudHJpZ2dlcihhLkV2ZW50KGoucmVwbGFjZShcImFmZml4XCIsIFwiYWZmaXhlZFwiKSkpLCBcbiAgICAgICAgICAgICAgICBcImJvdHRvbVwiID09IGkgJiYgdGhpcy4kZWxlbWVudC5vZmZzZXQoe1xuICAgICAgICAgICAgICAgICAgICB0b3A6IGIgLSB0aGlzLiRlbGVtZW50LmhlaWdodCgpIC0gaFxuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgdmFyIGQgPSBhLmZuLmFmZml4O1xuICAgIGEuZm4uYWZmaXggPSBiLCBhLmZuLmFmZml4LkNvbnN0cnVjdG9yID0gYywgYS5mbi5hZmZpeC5ub0NvbmZsaWN0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBhLmZuLmFmZml4ID0gZCwgdGhpcztcbiAgICB9LCBhKHdpbmRvdykub24oXCJsb2FkXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICBhKCdbZGF0YS1zcHk9XCJhZmZpeFwiXScpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgYyA9IGEodGhpcyksIGQgPSBjLmRhdGEoKTtcbiAgICAgICAgICAgIGQub2Zmc2V0ID0gZC5vZmZzZXQgfHwge30sIGQub2Zmc2V0Qm90dG9tICYmIChkLm9mZnNldC5ib3R0b20gPSBkLm9mZnNldEJvdHRvbSksIFxuICAgICAgICAgICAgZC5vZmZzZXRUb3AgJiYgKGQub2Zmc2V0LnRvcCA9IGQub2Zmc2V0VG9wKSwgYi5jYWxsKGMsIGQpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn0oalF1ZXJ5KTtcblxudmFyIGRhdGEgPSB7XG4gICAgZHlzbGV4aWE6IFwiRHlzbGV4aSDDpHIgZW4gbmVkc8OkdHRuaW5nIHNvbSBnw7ZyIGF0dCBoasOkcm5hbiBoYXIgc3bDpXJ0IGF0dCBhdXRvbWF0aXNlcmEgdG9sa25pbmdlbiBhdiBvcmQuIERldHRhIGfDtnIgYXR0IHBlcnNvbmVyIG1lZCBkZW5uYSBuZWRzw6R0dG5pbmcga2FuIGhhIHN2w6VydCBhdHQgbMOkc2Egb2NoIHNrcml2YS4gRHlzbGV4aSDDpHIgaW50ZSBrb3BwbGF0IHRpbGwgc3luIGVsbGVyIGludGVsbGlnZW5zLiBPcnNha2VybmEgdGlsbCBkeXNsZXhpIMOkciBmb3J0ZmFyYW5kZSBva2xhcnQuXCIsXG4gICAgXCJkeXNsZXhpYS1saXN0SXRlbXNcIjogWyBcIlVuZHZpayB0ZXh0IGkgbGl0ZW4gc3RvcmxlayBvY2ggbMOlbmdhIHRleHRlci4gU2UgdGlsbCBhdHQgaGEgb3JkZW50bGlndCBtZWQgcmFkYXZzdMOlbmQuXCIsIFwiVW5kdmlrIHN2w6VyYSBvcmQgb2NoIGZhY2t0ZXJtZXIuXCIsIFwiRXJianVkIGzDpHR0bMOkc3RhIHZlcnNpb25lciBhdiBmYWNrdGV4dGVyLlwiLCBcIlVuZHZpayB0eXBzbml0dCBtZWQga3LDpW5nbGlnYSBvY2gga29tcGxleGEgZmlndXJlci5cIiBdLFxuICAgIHBhcmtpbnNvbnM6IFwiVmlkIFBhcmtpbnNvbnMgc2p1a2RvbSBmw7Zyc3TDtnJzIGNlbGxlcm5hIGkgaGrDpHJuYW4gc29tIHRpbGx2ZXJrYXIgZG9wYW1pbiB2aWxrZXQgZ8O2ciBhdHQgaGrDpHJuYW4gZsOlciBlbiBuZWRzYXR0IGbDtnJtw6VnYSBhdHQgc2tpY2thIHNpZ25hbGVyLiBQZXJzb25lciBtZWQgUGFya2luc29ucyBrYW4gZHJhYmJhcyBhdiBzeW1wdG9tIHNvbSBza2FrbmluZ2FyLCBzdGVsYSBtdXNrbGVyIG9jaCBzw6RtcmUgcsO2cmVsc2Vmw7ZybcOlZ2EuIE9yc2FrZXJuYSB0aWxsIFBhcmtpbnNvbnMgc2p1a2RvbSDDpHIgZm9ydGZhcmFuZGUgb2tsYXJ0LlwiLFxuICAgIFwicGFya2luc29ucy1saXN0SXRlbXNcIjogWyBcIlNlIHRpbGwgYXR0IHdlYmJwbGF0c2VuIGthbiBhbnbDpG5kYXMgbWVkIGFuZHJhIGhqw6RscG1lZGVsIMOkbiBtdXMsIHRpbGwgZXhlbXBlbCB0YW5nZW50Ym9yZHNuYXZpZ2VyaW5nLlwiLCBcIkhhIHRpbGxyw6Rja2xpZ3QgbWVkIGx1ZnQgbWVsbGFuIGtvbXBvbmVudGVyXCIsIFwiSGEgdGlsbHLDpGNrbGlndCBzdG9yYSBrbGlja3l0b3IuXCIsIFwiVW5kdmlrIHR5cHNuaXR0IG1lZCBrcsOlbmdsaWdhIG9jaCBrb21wbGV4YSBmaWd1cmVyLlwiIF0sXG4gICAgXCJwYXJraW5zb25zLW1vcmVJbmZvXCI6IFwiPGEgaHJlZj0naHR0cDovL3d3dy5wYXJraW5zb25mb3JidW5kZXQuc2UnPlBhcmtpbnNvbnNmw7ZyYnVuZGV0PC9hPlwiLFxuICAgIHllbGxvd0JsdWVDb2xvckJsaW5kbmVzczogXCJQZXJzb25lciBtZWQgZGVmZWt0IGbDpHJnc2VlbmRlIGhhciBzdsOlcnQgYXR0IHNraWxqYSBww6Ugdmlzc2EgZWxsZXIgYWxsYSBmw6RyZ2VyLiBFdHQgZnVsbHQgZnVuZ2VyYW5kZSDDtmdhIGhhciB0cmUgb2xpa2EgdGFwcGFyIHNvbSB0YXIgdXBwIGbDpHJnZXJuYSB2aW9sZXR0LCBncsO2biBvY2ggcsO2ZC4gTsOkciBlbiBlbGxlciBmbGVyYSBhdiB0YXBwYXJuYSBzYWtuYXMgZWxsZXIgw6RyIGRlZmVrdGEgbGVkZXIgZGV0IHRpbGwgZGVmZWt0IGbDpHJnc2VlbmRlLiBHdWwtYmzDpSBmw6RyZ2JsaW5kaGV0IChUcml0YW5vcGkpIMOkciBzw6RsbHN5bnQuIE5hbW5ldCDDpHIgbWlzc2xlZGFuZGUgZMOlIGRldCBpbnRlIMOkciBmw6RyZ2VybmEgZ3VsIG9jaCBibMOlIHNvbSBmw7ZydsOkeGxhcywgdXRhbiBibMOlIG1lZCBncsO2biBvY2ggZ3VsIG1lZCBsaWxhLlwiLFxuICAgIFwieWVsbG93Qmx1ZUNvbG9yQmxpbmRuZXNzLWxpc3RJdGVtc1wiOiBbIFwiQW52w6RuZCBpbnRlIGbDpHJnIHNvbSBkZXQgZW5kYSBzw6R0dGV0IGF0dCBmw7ZybWVkbGEgaW5mb3JtYXRpb24sIGluZGlrZXJhIGVuIGhhbmRsaW5nIGVsbGVyIGlkZW50aWZpZXJhIGV0dCBlbGVtZW50LiBNYXJrZXJhIHRpbGwgZXhlbXBlbCBpbnRlIGV0dCBmZWxha3RpZ3QgZm9ybXVsw6RyZsOkbHQgZW5kYXN0IG1lZCBlbiByw7ZkIHJhbSB1dGFuIGtvbXBsZXR0ZXJhIMOkdmVuIG1lZCB0ZXh0IG9jaCBnw6RybmEgZW4gaWtvbi5cIiwgXCJFcmJqdWQgZ8Okcm5hIGV0dCBow7Zna29udHJhc3QtbMOkZ2UuXCIsIFwiSGEgdGlsbHLDpGNrbGlndCBzdG9yYSBrbGlja3l0b3IuXCIsIFwiVW5kdmlrIHR5cHNuaXR0IG1lZCBrcsOlbmdsaWdhIG9jaCBrb21wbGV4YSBmaWd1cmVyLlwiIF0sXG4gICAgXCJ5ZWxsb3dCbHVlQ29sb3JCbGluZG5lc3MtbW9yZUluZm9cIjogXCI8YSBocmVmPSdodHRwczovL3N2Lndpa2lwZWRpYS5vcmcvd2lraS9EZWZla3RfZiVDMyVBNHJnc2VlbmRlJz5XaWtpcGVkaWEgb20gZGVmZWt0IGbDpHJnc2VlbmRlPC9hPlwiLFxuICAgIGZhcnNpZ2h0ZWRuZXNzOiBcIlBlcnNvbmVyIG1lZCBIeXBlcm9waSBzZXIgc3VkZGlndCBww6UgbsOkcmEgaMOlbGwsIG1lbiBicmEgcMOlIGzDpW5ndCBow6VsbC4gTmVkc8OkdHRuaW5nZW4gdXBwc3TDpXIgcMOlIGdydW5kIGF2IGF0dCBsanVzZXQgaW50ZSBicnl0cyByw6R0dCBpIMO2Z2F0LiBEZXQgw6RyIGVuIGF2IGRlIHZhbmxpZ2FzdGUgc3lubmVkc8OkdHRuaW5nYXJuYS5cIixcbiAgICBcImZhcnNpZ2h0ZWRuZXNzLWxpc3RJdGVtc1wiOiBbIFwiVW5kdmlrIHRleHQgaSBsaXRlbiBzdG9ybGVrLlwiLCBcIldlYmJzaWRhbiBza2EgZ8OlIGF0dCBmw7Zyc3RvcmEgKHpvb21hcykgdGlsbCBtaW5zdCAyMDAgJSBzw6UgYXR0IGJlc8O2a2FyZW4ga2FuIGFucGFzc2EgaW5uZWjDpWxsZXRzIHN0b3JsZWsgZWZ0ZXIgc2luYSBiZWhvdi5cIiwgXCJFcmJqdWQgdXBwbMOkc25pbmcgYXYgaW5uZWjDpWxsZXQuXCIgXSxcbiAgICBcImZhcnNpZ2h0ZWRuZXNzLW1vcmVJbmZvXCI6IFwiPGEgaHJlZj0naHR0cHM6Ly93ZWJicmlrdGxpbmplci5zZS9yLzM5LWdlLXdlYmJwbGF0c2VuLWVuLWdvZC1sYXNiYXJoZXQvJz5XZWJicmlrdGxpbmplIEdlIHdlYmJwbGF0c2VuIGdvZCBsw6RzYmFyaGV0PC9hPlwiLFxuICAgIGNvbG9yQmxpbmRuZXNzOiBcIkRlZmVrdCBmw6RyZ3NlZW5kZSBpbm5lYsOkciBhdHQgZW4gcGVyc29uIGhhciBzdsOlcnQgYXR0IHNraWxqYSBww6Ugdmlzc2EgZWxsZXIgYWxsYSBmw6RyZ2VyLiBFdHQgZnVsbHQgZnVuZ2VyYW5kZSDDtmdhIGhhciB0cmUgb2xpa2EgdHlwZXIgYXYgdGFwcGFyIHNvbSB0YXIgdXBwIG9saWthIGbDpHJnZXI6IHZpb2xldHQsIGdyw7ZuIG9jaCByw7ZkLiBPcnNha2VuIHRpbGwgZGVmZWt0IGbDpHJnc2VlbmRlIMOkciBhdHQgZW4gZWxsZXIgZmxlcmEgYXYgZGVzc2EgdHlwZXIgYXYgdGFwcGFyIHNha25hcyBlbGxlciDDpHIgZGVmZWt0YS4gSGVsdCBmw6RyZ2JsaW5kIChNb25va3JvbWFzaS9ha3JvbWF0b3BzaSkgw6RyIG15Y2tldCBzw6RsbHN5bnQuIFBlcnNvbmVyIG1lZCBkZW5uYSBzeW5uZWRzw6R0dG5pbmcgc2VyIGluZ2EgZsOkcmdlciB1dGFuIHNlciBlbmRhc3QgaSBncsOlc2thbGEuXCIsXG4gICAgXCJjb2xvckJsaW5kbmVzcy1saXN0SXRlbXNcIjogWyBcIkFudsOkbmQgaW50ZSBmw6RyZyBzb20gZGV0IGVuZGEgc8OkdHRldCBhdHQgZsO2cm1lZGxhIGluZm9ybWF0aW9uLCBpbmRpa2VyYSBlbiBoYW5kbGluZyBlbGxlciBpZGVudGlmaWVyYSBlbGVtZW50LiBNYXJrZXJhIHQuZXguIGludGUgZXR0IGZlbGFrdGlndCBmb3JtdWzDpHJmw6RsdCBlbmRhc3QgbWVkIHLDtmQgcmFtLCBrb21wbGV0dGVyYSDDpHZlbiBtZWQgdGV4dCBlbGxlciBpa29uLlwiLCBcIkRldCBrYW4gdmFyYSBlbiBicmEgaWTDqSBhdHQgZXJianVkYSBldHQgaMO2Z2tvbnRyYXN0LWzDpGdlLlwiIF1cbn07XG5cblwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmV4cG9ydHMuc2hvd0JsdXJyID0gc2hvd0JsdXJyO1xuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICB2YXIgdG9vbHRpcCA9ICQoXCIudG9vbC10aXBcIik7XG4gICAgdmFyIGluZm9IZWFkaW5nID0gJChcIi5kaXNhYmlsaXR5LWluZm8taGVhZGluZ1wiKTtcbiAgICB2YXIgaW5mb1BhcmFncmFwaCA9ICQoXCIuZGlzYWJpbGl0eS1pbmZvLXBhcmFncmFwaFwiKTtcbiAgICB2YXIgYWR2aWNlTGlzdCA9ICQoXCIuYWR2aWNlLWxpc3RcIik7XG4gICAgdmFyIG1vcmVJbmZvUGFyYWdyYXBoID0gJChcIi5tb3JlLWluZm8tcGFyYWdyYXBoXCIpO1xuICAgIHZhciBtb3JlSW5mb1BhbmVsID0gJChcIiNtb3JlLWluZm8tcGFuZWxcIik7XG4gICAgdmFyIG1haW5IZWFkaW5nID0gJChcIi5tYWluLWhlYWRpbmdcIik7XG4gICAgdmFyIGxvZ28gPSAkKFwiLmxvZ29cIik7XG4gICAgJChcIi5tZW51LWJ0blwiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcbiAgICAgICAgaW5mb0hlYWRpbmcuZW1wdHkoKTtcbiAgICAgICAgaW5mb1BhcmFncmFwaC5lbXB0eSgpO1xuICAgICAgICBhZHZpY2VMaXN0LmVtcHR5KCk7XG4gICAgICAgIG1vcmVJbmZvUGFyYWdyYXBoLmVtcHR5KCk7XG4gICAgICAgIG1vcmVJbmZvUGFuZWwuaGlkZSgpO1xuICAgICAgICB0b29sdGlwLmFuaW1hdGUoe1xuICAgICAgICAgICAgbGVmdDogcGFyc2VJbnQodG9vbHRpcC5jc3MoXCJsZWZ0XCIpLCAxMCkgPT0gMCA/IC10b29sdGlwLm91dGVyV2lkdGgoKSA6IDBcbiAgICAgICAgfSk7XG4gICAgICAgIGluZm9IZWFkaW5nLmFwcGVuZCgkKHRoaXMpLnRleHQoKSk7XG4gICAgICAgIGxvZ28uaGlkZSgpO1xuICAgICAgICBtYWluSGVhZGluZy5zaG93KCk7XG4gICAgICAgIG1haW5IZWFkaW5nLmFwcGVuZCgkKHRoaXMpLnRleHQoKSk7XG4gICAgICAgICQodGhpcykuY2xvc2VzdChcIi5kcm9wZG93blwiKS5maW5kKFwiLnNlbGVjdGVkXCIpLnRleHQoJCh0aGlzKS50ZXh0KCkpO1xuICAgICAgICB2YXIgaWQgPSAkKHRoaXMpLmF0dHIoXCJpZFwiKTtcbiAgICAgICAgaW5mb1BhcmFncmFwaC5hcHBlbmQoZGF0YVtpZF0pO1xuICAgICAgICAkLmVhY2goZGF0YVtpZCArIFwiLWxpc3RJdGVtc1wiXSwgZnVuY3Rpb24oa2V5LCB2YWx1ZSkge1xuICAgICAgICAgICAgYWR2aWNlTGlzdC5hcHBlbmQoXCI8bGk+XCIgKyB2YWx1ZSArIFwiPC9saT5cIik7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoZGF0YVtpZCArIFwiLW1vcmVJbmZvXCJdKSB7XG4gICAgICAgICAgICBtb3JlSW5mb1BhbmVsLnNob3coKTtcbiAgICAgICAgICAgIG1vcmVJbmZvUGFyYWdyYXBoLmFwcGVuZChkYXRhW2lkICsgXCItbW9yZUluZm9cIl0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKFwiZmFyc2lnaHRlZG5lc3NcIikpIHtcbiAgICAgICAgICAgIHNob3dCbHVycigpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgJChcIiNyZXNldC1idG5cIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgIHRvb2x0aXAuYW5pbWF0ZSh7XG4gICAgICAgICAgICBsZWZ0OiBwYXJzZUludCh0b29sdGlwLmNzcyhcIm1hcmdpbkxlZnRcIiksIDEwKSA9PSAwID8gdG9vbHRpcC5vdXRlcldpZHRoKCkgOiAwXG4gICAgICAgIH0pO1xuICAgICAgICBtYWluSGVhZGluZy5oaWRlKCk7XG4gICAgICAgIG1haW5IZWFkaW5nLmVtcHR5KCk7XG4gICAgICAgIGxvZ28uc2hvdygpO1xuICAgICAgICAkKFwiLmRyb3Bkb3duXCIpLmZpbmQoXCIjU3luXCIpLnRleHQoXCJTeW5cIik7XG4gICAgICAgICQoXCIuZHJvcGRvd25cIikuZmluZChcIiNNb3RvcmlrXCIpLnRleHQoXCJNb3RvcmlrXCIpO1xuICAgICAgICByZXNldENTUygpO1xuICAgIH0pO1xuICAgICQoXCIuY29sbGFwc2VcIikub24oXCJzaG93bi5icy5jb2xsYXBzZVwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5maW5kKFwiLmRvd24tYXJyb3dcIikudG9nZ2xlKCk7XG4gICAgICAgICQodGhpcykucGFyZW50KCkuZmluZChcIi51cC1hcnJvd1wiKS50b2dnbGUoKTtcbiAgICB9KS5vbihcImhpZGRlbi5icy5jb2xsYXBzZVwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5maW5kKFwiLnVwLWFycm93XCIpLnRvZ2dsZSgpO1xuICAgICAgICAkKHRoaXMpLnBhcmVudCgpLmZpbmQoXCIuZG93bi1hcnJvd1wiKS50b2dnbGUoKTtcbiAgICB9KTtcbn0pO1xuXG5mdW5jdGlvbiBzaG93Qmx1cnIoZSkge1xuICAgIGNvbnNvbGUubG9nKFwiaW1wb3J0IGZ1bmthZGUhXCIpO1xuICAgIGNocm9tZS50YWJzLmluc2VydENTUyh7XG4gICAgICAgIGZpbGU6IFwic2ltdWxhdGlvbnMvZmFyc2lnaHRlZG5lc3MvY3NzL3NpbXVsYXRpb24uY3NzXCJcbiAgICB9KTtcbn0iXX0=
