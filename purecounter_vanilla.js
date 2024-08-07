/*!
 * purecounter.js - A simple yet configurable native javascript counter which you can count on.
 * Author: Stig Rex
 * Version: 1.5.0
 * Url: https://github.com/srexi/purecounterjs
 * License: MIT
 */ !(function (t, e) {
    "object" == typeof exports && "object" == typeof module ? (module.exports = e()) : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? (exports.PureCounter = e()) : (t.PureCounter = e());
})(self, function () {
    var t, e, r;
    return (
        (t = {
            638: function (t) {
                function e(t, e) {
                    (null == e || e > t.length) && (e = t.length);
                    for (var r = 0, n = Array(e); r < e; r++) n[r] = t[r];
                    return n;
                }
                function r(t) {
                    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                        r = {};
                    for (var n in t)
                        if (e == {} || e.hasOwnProperty(n)) {
                            var o = i(t[n]);
                            (r[n] = o), n.match(/duration|pulse/) && (r[n] = "boolean" != typeof o ? 1e3 * o : o);
                        }
                    return Object.assign({}, e, r);
                }
                function n(t, e) {
                    return Math.pow(t, e);
                }
                function o(t, e) {
                    var r = { minimumFractionDigits: e.decimals, maximumFractionDigits: e.decimals },
                        o = "string" == typeof e.formater ? e.formater : void 0;
                    return (
                        (t = (function (t, e) {
                            if (e.filesizing || e.currency) {
                                t = Math.abs(Number(t));
                                var r = 1e3,
                                    o = e.currency && "string" == typeof e.currency ? e.currency : "",
                                    i = e.decimals || 1,
                                    a = ["", "K", "M", "B", "T"],
                                    u = "";
                                e.filesizing && ((r = 1024), (a = ["bytes", "KB", "MB", "GB", "TB"]));
                                for (var c = 4; c >= 0; c--)
                                    if ((0 === c && (u = "".concat(t.toFixed(i), " ").concat(a[c])), t >= n(r, c))) {
                                        u = "".concat((t / n(r, c)).toFixed(i), " ").concat(a[c]);
                                        break;
                                    }
                                return o + u;
                            }
                            return parseFloat(t);
                        })(t, e)),
                        (function (t, e) {
                            if (e.formater) {
                                var r,
                                    n = e.separator ? ("string" == typeof e.separator ? e.separator : ",") : "";
                                return "en-US" !== e.formater && !0 === e.separator
                                    ? t
                                    : ((r = n),
                                      t.replace(/^(?:(\d{1,3},(?:\d{1,3},?)*)|(\d{1,3}\.(?:\d{1,3}\.?)*)|(\d{1,3}(?:\s\d{1,3})*))([\.,]?\d{0,2}?)$/gi, function (t, e, n, o, i) {
                                          var a = "",
                                              u = "";
                                          if (
                                              (void 0 !== e ? ((a = e.replace(RegExp(/,/gi, "gi"), r)), (u = ",")) : void 0 !== n ? (a = n.replace(RegExp(/\./gi, "gi"), r)) : void 0 !== o && (a = o.replace(RegExp(/ /gi, "gi"), r)),
                                              void 0 !== i)
                                          ) {
                                              var c = "," !== u && "," !== r ? "," : ".";
                                              a += void 0 !== i ? i.replace(RegExp(/\.|,/gi, "gi"), c) : "";
                                          }
                                          return a;
                                      }));
                            }
                            return t;
                        })((t = e.formater ? t.toLocaleString(o, r) : parseInt(t).toString()), e)
                    );
                }
                function i(t) {
                    return /^[0-9]+\.[0-9]+$/.test(t) ? parseFloat(t) : /^[0-9]+$/.test(t) ? parseInt(t) : /^true|false/i.test(t) ? /^true/i.test(t) : t;
                }
                function a(t) {
                    for (var e = t.offsetTop, r = t.offsetLeft, n = t.offsetWidth, o = t.offsetHeight; t.offsetParent; ) (e += (t = t.offsetParent).offsetTop), (r += t.offsetLeft);
                    return e >= window.pageYOffset && r >= window.pageXOffset && e + o <= window.pageYOffset + window.innerHeight && r + n <= window.pageXOffset + window.innerWidth;
                }
                t.exports = function () {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                        n = r(t, { start: 0, end: 100, duration: 2e3, delay: 10, once: !0, pulse: !1, decimals: 0, legacy: !0, filesizing: !1, currency: !1, separator: !1, formater: "us-US", selector: ".purecounter" });
                    function u(t) {
                        t.forEach(function (t) {
                            !0 === f(t).legacy && a(t) && c([t]);
                        });
                    }
                    function c(t, e) {
                        t.forEach(function (t) {
                            var r = t.target || t,
                                n = f(r);
                            if (n.duration <= 0) return (r.innerHTML = o(n.end, n));
                            if ((!e && !a(t)) || (e && t.intersectionRatio < 0.5)) {
                                var u = n.start > n.end ? n.end : n.start;
                                return (r.innerHTML = o(u, n));
                            }
                            setTimeout(function () {
                                var t, e, a, u, c, f;
                                return (
                                    (t = r),
                                    (a = ((e = n).end - e.start) / (e.duration / e.delay)),
                                    (u = "inc"),
                                    e.start > e.end && ((u = "dec"), (a *= -1)),
                                    (c = i(e.start)),
                                    (t.innerHTML = o(c, e)),
                                    !0 === e.once && t.setAttribute("data-purecounter-duration", 0),
                                    void (f = setInterval(function () {
                                        var r = (function (t, e) {
                                            var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "inc";
                                            return (t = i(t)), (e = i(e)), parseFloat("inc" === r ? t + e : t - e);
                                        })(c, a, u);
                                        (t.innerHTML = o(r, e)),
                                            (((c = r) >= e.end && "inc" == u) || (c <= e.end && "dec" == u)) &&
                                                ((t.innerHTML = o(e.end, e)),
                                                e.pulse &&
                                                    (t.setAttribute("data-purecounter-duration", 0),
                                                    setTimeout(function () {
                                                        t.setAttribute("data-purecounter-duration", e.duration / 1e3);
                                                    }, e.pulse)),
                                                clearInterval(f));
                                    }, e.delay))
                                );
                            }, n.delay);
                        });
                    }
                    function f(t) {
                        var o,
                            a = [].filter.call(t.attributes, function (t) {
                                return /^data-purecounter-/.test(t.name);
                            });
                        return r(
                            0 != a.length
                                ? Object.assign.apply(
                                      Object,
                                      [{}].concat(
                                          (function (t) {
                                              if (Array.isArray(t)) return e(t);
                                          })(
                                              (o = a.map(function (t) {
                                                  var e,
                                                      r,
                                                      n,
                                                      o = t.name,
                                                      a = t.value;
                                                  return (
                                                      (e = {}),
                                                      (r = o.replace("data-purecounter-", "").toLowerCase()),
                                                      (n = i(a)),
                                                      r in e ? Object.defineProperty(e, r, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : (e[r] = n),
                                                      e
                                                  );
                                              }))
                                          ) ||
                                              (function (t) {
                                                  if (("undefined" != typeof Symbol && null != t[Symbol.iterator]) || null != t["@@iterator"]) return Array.from(t);
                                              })(o) ||
                                              (function (t, r) {
                                                  if (t) {
                                                      if ("string" == typeof t) return e(t, r);
                                                      var n = Object.prototype.toString.call(t).slice(8, -1);
                                                      return (
                                                          "Object" === n && t.constructor && (n = t.constructor.name),
                                                          "Map" === n || "Set" === n ? Array.from(t) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? e(t, r) : void 0
                                                      );
                                                  }
                                              })(o) ||
                                              (function () {
                                                  throw TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
                                              })()
                                      )
                                  )
                                : {},
                            n
                        );
                    }
                    (function t() {
                        var e = document.querySelectorAll(n.selector);
                        if (0 !== e.length) {
                            if ("IntersectionObserver" in window && "IntersectionObserverEntry" in window && "intersectionRatio" in window.IntersectionObserverEntry.prototype) {
                                var r = new IntersectionObserver(c.bind(this), { root: null, rootMargin: "20px", threshold: 0.5 });
                                e.forEach(function (t) {
                                    r.observe(t);
                                });
                            } else
                                window.addEventListener &&
                                    (u(e),
                                    window.addEventListener(
                                        "scroll",
                                        function (t) {
                                            u(e);
                                        },
                                        { passive: !0 }
                                    ));
                        }
                    })();
                };
            },
        }),
        (e = {}),
        (r = (function r(n) {
            var o = e[n];
            if (void 0 !== o) return o.exports;
            var i = (e[n] = { exports: {} });
            return t[n](i, i.exports, r), i.exports;
        })(638))
    );
});
