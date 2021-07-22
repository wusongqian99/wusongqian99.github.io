(window.webpackJsonp = window.webpackJsonp || []).push([[2], {
    "+8Os": function (e, t, r) {
        "use strict";

        function a() {
            l.a.call(this), this.type = "Camera", this.matrixWorldInverse = new s.a, this.projectionMatrix = new s.a, this.projectionMatrixInverse = new s.a
        }

        function i(e, t, r, i) {
            a.call(this), this.type = "PerspectiveCamera", this.fov = void 0 === e ? 50 : e, this.zoom = 1, this.near = void 0 === r ? .1 : r, this.far = void 0 === i ? 2e3 : i, this.focus = 10, this.aspect = void 0 === t ? 1 : t, this.view = null, this.filmGauge = 35, this.filmOffset = 0, this.updateProjectionMatrix()
        }

        var n = Math.tan, o = Math.atan, s = r("3+m9"), l = r("p1p1"), d = r("w+kJ");
        a.prototype = Object.assign(Object.create(l.a.prototype), {
            constructor: a, isCamera: !0, copy: function (e, t) {
                return l.a.prototype.copy.call(this, e, t), this.matrixWorldInverse.copy(e.matrixWorldInverse), this.projectionMatrix.copy(e.projectionMatrix), this.projectionMatrixInverse.copy(e.projectionMatrixInverse), this
            }, getWorldDirection: function (t) {
                void 0 === t && (console.warn("THREE.Camera: .getWorldDirection() target is now required"), t = new d.a), this.updateMatrixWorld(!0);
                var r = this.matrixWorld.elements;
                return t.set(-r[8], -r[9], -r[10]).normalize()
            }, updateMatrixWorld: function (e) {
                l.a.prototype.updateMatrixWorld.call(this, e), this.matrixWorldInverse.getInverse(this.matrixWorld)
            }, clone: function () {
                return new this.constructor().copy(this)
            }
        });
        var c = r("MnML");
        r.d(t, "a", function () {
            return i
        }), i.prototype = Object.assign(Object.create(a.prototype), {
            constructor: i, isPerspectiveCamera: !0, copy: function (e, t) {
                return a.prototype.copy.call(this, e, t), this.fov = e.fov, this.zoom = e.zoom, this.near = e.near, this.far = e.far, this.focus = e.focus, this.aspect = e.aspect, this.view = null === e.view ? null : Object.assign({}, e.view), this.filmGauge = e.filmGauge, this.filmOffset = e.filmOffset, this
            }, setFocalLength: function (e) {
                var t = .5 * this.getFilmHeight() / e;
                this.fov = 2 * c.a.RAD2DEG * o(t), this.updateProjectionMatrix()
            }, getFocalLength: function () {
                var e = n(.5 * c.a.DEG2RAD * this.fov);
                return .5 * this.getFilmHeight() / e
            }, getEffectiveFOV: function () {
                return 2 * c.a.RAD2DEG * o(n(.5 * c.a.DEG2RAD * this.fov) / this.zoom)
            }, getFilmWidth: function () {
                return this.filmGauge * Math.min(this.aspect, 1)
            }, getFilmHeight: function () {
                return this.filmGauge / Math.max(this.aspect, 1)
            }, setViewOffset: function (e, t, r, a, i, n) {
                this.aspect = e / t, null === this.view && (this.view = {
                    enabled: !0,
                    fullWidth: 1,
                    fullHeight: 1,
                    offsetX: 0,
                    offsetY: 0,
                    width: 1,
                    height: 1
                }), this.view.enabled = !0, this.view.fullWidth = e, this.view.fullHeight = t, this.view.offsetX = r, this.view.offsetY = a, this.view.width = i, this.view.height = n, this.updateProjectionMatrix()
            }, clearViewOffset: function () {
                null !== this.view && (this.view.enabled = !1), this.updateProjectionMatrix()
            }, updateProjectionMatrix: function () {
                var e = this.near, t = e * n(.5 * c.a.DEG2RAD * this.fov) / this.zoom, r = 2 * t, a = this.aspect * r,
                    i = -.5 * a, o = this.view;
                if (null !== this.view && this.view.enabled) {
                    var s = o.fullWidth, l = o.fullHeight;
                    i += o.offsetX * a / s, t -= o.offsetY * r / l, a *= o.width / s, r *= o.height / l
                }
                var d = this.filmOffset;
                0 !== d && (i += e * d / this.getFilmWidth()), this.projectionMatrix.makePerspective(i, i + a, t, t - r, e, this.far), this.projectionMatrixInverse.getInverse(this.projectionMatrix)
            }, toJSON: function (e) {
                var t = l.a.prototype.toJSON.call(this, e);
                return t.object.fov = this.fov, t.object.zoom = this.zoom, t.object.near = this.near, t.object.far = this.far, t.object.focus = this.focus, t.object.aspect = this.aspect, null !== this.view && (t.object.view = Object.assign({}, this.view)), t.object.filmGauge = this.filmGauge, t.object.filmOffset = this.filmOffset, t
            }
        })
    }, "/V9W": function (e, t, r) {
        "use strict";

        function a(e, t) {
            this.min = void 0 === e ? new s.a(+Infinity, +Infinity, +Infinity) : e, this.max = void 0 === t ? new s.a(-Infinity, -Infinity, -Infinity) : t
        }

        var n = Math.abs, o = Math.max;
        r.d(t, "a", function () {
            return a
        });
        var s = r("w+kJ"), i = r("8IfN");
        Object.assign(a.prototype, {
            isBox3: !0, set: function (e, t) {
                return this.min.copy(e), this.max.copy(t), this
            }, setFromArray: function (e) {
                for (var t = +Infinity, r = +Infinity, a = +Infinity, n = -Infinity, o = -Infinity, s = -Infinity, d = 0, i = e.length; d < i; d += 3) {
                    var l = e[d], c = e[d + 1], p = e[d + 2];
                    l < t && (t = l), c < r && (r = c), p < a && (a = p), l > n && (n = l), c > o && (o = c), p > s && (s = p)
                }
                return this.min.set(t, r, a), this.max.set(n, o, s), this
            }, setFromBufferAttribute: function (e) {
                for (var t = +Infinity, r = +Infinity, a = +Infinity, n = -Infinity, o = -Infinity, s = -Infinity, d = 0, i = e.count; d < i; d++) {
                    var l = e.getX(d), c = e.getY(d), p = e.getZ(d);
                    l < t && (t = l), c < r && (r = c), p < a && (a = p), l > n && (n = l), c > o && (o = c), p > s && (s = p)
                }
                return this.min.set(t, r, a), this.max.set(n, o, s), this
            }, setFromPoints: function (e) {
                this.makeEmpty();
                for (var t = 0, r = e.length; t < r; t++) this.expandByPoint(e[t]);
                return this
            }, setFromCenterAndSize: function () {
                var e = new s.a;
                return function (t, r) {
                    var a = e.copy(r).multiplyScalar(.5);
                    return this.min.copy(t).sub(a), this.max.copy(t).add(a), this
                }
            }(), setFromObject: function (e) {
                return this.makeEmpty(), this.expandByObject(e)
            }, clone: function () {
                return new this.constructor().copy(this)
            }, copy: function (e) {
                return this.min.copy(e.min), this.max.copy(e.max), this
            }, makeEmpty: function () {
                return this.min.x = this.min.y = this.min.z = +Infinity, this.max.x = this.max.y = this.max.z = -Infinity, this
            }, isEmpty: function () {
                return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z
            }, getCenter: function (e) {
                return void 0 === e && (console.warn("THREE.Box3: .getCenter() target is now required"), e = new s.a), this.isEmpty() ? e.set(0, 0, 0) : e.addVectors(this.min, this.max).multiplyScalar(.5)
            }, getSize: function (e) {
                return void 0 === e && (console.warn("THREE.Box3: .getSize() target is now required"), e = new s.a), this.isEmpty() ? e.set(0, 0, 0) : e.subVectors(this.max, this.min)
            }, expandByPoint: function (e) {
                return this.min.min(e), this.max.max(e), this
            }, expandByVector: function (e) {
                return this.min.sub(e), this.max.add(e), this
            }, expandByScalar: function (e) {
                return this.min.addScalar(-e), this.max.addScalar(e), this
            }, expandByObject: function () {
                function e(e) {
                    var n = e.geometry;
                    if (void 0 !== n) if (n.isGeometry) {
                        var o = n.vertices;
                        for (a = 0, i = o.length; a < i; a++) t.copy(o[a]), t.applyMatrix4(e.matrixWorld), r.expandByPoint(t)
                    } else if (n.isBufferGeometry) {
                        var s = n.attributes.position;
                        if (void 0 !== s) for (a = 0, i = s.count; a < i; a++) t.fromBufferAttribute(s, a).applyMatrix4(e.matrixWorld), r.expandByPoint(t)
                    }
                }

                var t = new s.a, r, a, i;
                return function (t) {
                    return r = this, t.updateMatrixWorld(!0), t.traverse(e), this
                }
            }(), containsPoint: function (e) {
                return !(e.x < this.min.x || e.x > this.max.x || e.y < this.min.y || e.y > this.max.y || e.z < this.min.z || e.z > this.max.z)
            }, containsBox: function (e) {
                return this.min.x <= e.min.x && e.max.x <= this.max.x && this.min.y <= e.min.y && e.max.y <= this.max.y && this.min.z <= e.min.z && e.max.z <= this.max.z
            }, getParameter: function (e, t) {
                return void 0 === t && (console.warn("THREE.Box3: .getParameter() target is now required"), t = new s.a), t.set((e.x - this.min.x) / (this.max.x - this.min.x), (e.y - this.min.y) / (this.max.y - this.min.y), (e.z - this.min.z) / (this.max.z - this.min.z))
            }, intersectsBox: function (e) {
                return !(e.max.x < this.min.x || e.min.x > this.max.x || e.max.y < this.min.y || e.min.y > this.max.y || e.max.z < this.min.z || e.min.z > this.max.z)
            }, intersectsSphere: function () {
                var e = new s.a;
                return function (t) {
                    return this.clampPoint(t.center, e), e.distanceToSquared(t.center) <= t.radius * t.radius
                }
            }(), intersectsPlane: function (e) {
                var t, r;
                return 0 < e.normal.x ? (t = e.normal.x * this.min.x, r = e.normal.x * this.max.x) : (t = e.normal.x * this.max.x, r = e.normal.x * this.min.x), 0 < e.normal.y ? (t += e.normal.y * this.min.y, r += e.normal.y * this.max.y) : (t += e.normal.y * this.max.y, r += e.normal.y * this.min.y), 0 < e.normal.z ? (t += e.normal.z * this.min.z, r += e.normal.z * this.max.z) : (t += e.normal.z * this.max.z, r += e.normal.z * this.min.z), t <= -e.constant && r >= -e.constant
            }, intersectsTriangle: function () {
                function e(e) {
                    var s, i;
                    for (s = 0, i = e.length - 3; s <= i; s += 3) {
                        c.fromArray(e, s);
                        var d = u.x * n(c.x) + u.y * n(c.y) + u.z * n(c.z), r = t.dot(c), p = a.dot(c), m = l.dot(c);
                        if (o(-o(r, p, m), Math.min(r, p, m)) > d) return !1
                    }
                    return !0
                }

                var t = new s.a, a = new s.a, l = new s.a, r = new s.a, i = new s.a, d = new s.a, c = new s.a,
                    p = new s.a, u = new s.a, m = new s.a;
                return function (n) {
                    if (this.isEmpty()) return !1;
                    this.getCenter(p), u.subVectors(this.max, p), t.subVectors(n.a, p), a.subVectors(n.b, p), l.subVectors(n.c, p), r.subVectors(a, t), i.subVectors(l, a), d.subVectors(t, l);
                    var o = [0, -r.z, r.y, 0, -i.z, i.y, 0, -d.z, d.y, r.z, 0, -r.x, i.z, 0, -i.x, d.z, 0, -d.x, -r.y, r.x, 0, -i.y, i.x, 0, -d.y, d.x, 0];
                    return !!e(o) && (o = [1, 0, 0, 0, 1, 0, 0, 0, 1], !!e(o)) && (m.crossVectors(r, i), o = [m.x, m.y, m.z], e(o))
                }
            }(), clampPoint: function (e, t) {
                return void 0 === t && (console.warn("THREE.Box3: .clampPoint() target is now required"), t = new s.a), t.copy(e).clamp(this.min, this.max)
            }, distanceToPoint: function () {
                var e = new s.a;
                return function (t) {
                    var r = e.copy(t).clamp(this.min, this.max);
                    return r.sub(t).length()
                }
            }(), getBoundingSphere: function () {
                var e = new s.a;
                return function (t) {
                    return void 0 === t && (console.warn("THREE.Box3: .getBoundingSphere() target is now required"), t = new i.a), this.getCenter(t.center), t.radius = .5 * this.getSize(e).length(), t
                }
            }(), intersect: function (e) {
                return this.min.max(e.min), this.max.min(e.max), this.isEmpty() && this.makeEmpty(), this
            }, union: function (e) {
                return this.min.min(e.min), this.max.max(e.max), this
            }, applyMatrix4: function () {
                var e = [new s.a, new s.a, new s.a, new s.a, new s.a, new s.a, new s.a, new s.a];
                return function (t) {
                    return this.isEmpty() ? this : (e[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(t), e[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(t), e[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(t), e[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(t), e[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(t), e[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(t), e[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(t), e[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(t), this.setFromPoints(e), this)
                }
            }(), translate: function (e) {
                return this.min.add(e), this.max.add(e), this
            }, equals: function (e) {
                return e.min.equals(this.min) && e.max.equals(this.max)
            }
        })
    }, "2N3e": function (e, t, r) {
        "use strict";
        r.d(t, "a", function () {
            return a
        });
        var a = new function (e, t, r) {
            var a = this, i = !1, n = 0, o = 0, s = void 0;
            this.onStart = void 0, this.onLoad = e, this.onProgress = t, this.onError = r, this.itemStart = function (e) {
                o++, !1 == i && void 0 !== a.onStart && a.onStart(e, n, o), i = !0
            }, this.itemEnd = function (e) {
                n++, void 0 !== a.onProgress && a.onProgress(e, n, o), n == o && (i = !1, void 0 !== a.onLoad && a.onLoad())
            }, this.itemError = function (e) {
                void 0 !== a.onError && a.onError(e)
            }, this.resolveURL = function (e) {
                return s ? s(e) : e
            }, this.setURLModifier = function (e) {
                return s = e, this
            }
        }
    }, "3+m9": function (e, t, r) {
        "use strict";

        function a() {
            this.elements = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], 0 < arguments.length && console.error("THREE.Matrix4: the constructor no longer reads arguments. use .set() instead.")
        }

        var i = Math.sin, n = Math.cos;
        r.d(t, "a", function () {
            return a
        });
        var o = r("w+kJ");
        Object.assign(a.prototype, {
            isMatrix4: !0, set: function (e, t, r, a, i, n, o, s, l, d, c, p, u, m, g, f) {
                var h = this.elements;
                return h[0] = e, h[4] = t, h[8] = r, h[12] = a, h[1] = i, h[5] = n, h[9] = o, h[13] = s, h[2] = l, h[6] = d, h[10] = c, h[14] = p, h[3] = u, h[7] = m, h[11] = g, h[15] = f, this
            }, identity: function () {
                return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this
            }, clone: function () {
                return new a().fromArray(this.elements)
            }, copy: function (e) {
                var t = this.elements, r = e.elements;
                return t[0] = r[0], t[1] = r[1], t[2] = r[2], t[3] = r[3], t[4] = r[4], t[5] = r[5], t[6] = r[6], t[7] = r[7], t[8] = r[8], t[9] = r[9], t[10] = r[10], t[11] = r[11], t[12] = r[12], t[13] = r[13], t[14] = r[14], t[15] = r[15], this
            }, copyPosition: function (e) {
                var t = this.elements, r = e.elements;
                return t[12] = r[12], t[13] = r[13], t[14] = r[14], this
            }, extractBasis: function (e, t, r) {
                return e.setFromMatrixColumn(this, 0), t.setFromMatrixColumn(this, 1), r.setFromMatrixColumn(this, 2), this
            }, makeBasis: function (e, t, r) {
                return this.set(e.x, t.x, r.x, 0, e.y, t.y, r.y, 0, e.z, t.z, r.z, 0, 0, 0, 0, 1), this
            }, extractRotation: function () {
                var e = new o.a;
                return function (t) {
                    var r = this.elements, a = t.elements, i = 1 / e.setFromMatrixColumn(t, 0).length(),
                        n = 1 / e.setFromMatrixColumn(t, 1).length(), o = 1 / e.setFromMatrixColumn(t, 2).length();
                    return r[0] = a[0] * i, r[1] = a[1] * i, r[2] = a[2] * i, r[3] = 0, r[4] = a[4] * n, r[5] = a[5] * n, r[6] = a[6] * n, r[7] = 0, r[8] = a[8] * o, r[9] = a[9] * o, r[10] = a[10] * o, r[11] = 0, r[12] = 0, r[13] = 0, r[14] = 0, r[15] = 1, this
                }
            }(), makeRotationFromEuler: function (t) {
                t && t.isEuler || console.error("THREE.Matrix4: .makeRotationFromEuler() now expects a Euler rotation rather than a Vector3 and order.");
                var r = this.elements, o = t.x, s = t.y, l = t.z, p = n(o), u = i(o), m = n(s), g = i(s), h = n(l),
                    e = i(l);
                if ("XYZ" === t.order) {
                    var v = p * h, x = p * e, y = u * h, _ = u * e;
                    r[0] = m * h, r[4] = -m * e, r[8] = g, r[1] = x + y * g, r[5] = v - _ * g, r[9] = -u * m, r[2] = _ - v * g, r[6] = y + x * g, r[10] = p * m
                } else if ("YXZ" === t.order) {
                    var M = m * h, S = m * e, L = g * h, E = g * e;
                    r[0] = M + E * u, r[4] = L * u - S, r[8] = p * g, r[1] = p * e, r[5] = p * h, r[9] = -u, r[2] = S * u - L, r[6] = E + M * u, r[10] = p * m
                } else if ("ZXY" === t.order) {
                    var M = m * h, S = m * e, L = g * h, E = g * e;
                    r[0] = M - E * u, r[4] = -p * e, r[8] = L + S * u, r[1] = S + L * u, r[5] = p * h, r[9] = E - M * u, r[2] = -p * g, r[6] = u, r[10] = p * m
                } else if ("ZYX" === t.order) {
                    var v = p * h, x = p * e, y = u * h, _ = u * e;
                    r[0] = m * h, r[4] = y * g - x, r[8] = v * g + _, r[1] = m * e, r[5] = _ * g + v, r[9] = x * g - y, r[2] = -g, r[6] = u * m, r[10] = p * m
                } else if ("YZX" === t.order) {
                    var T = p * m, w = p * g, P = u * m, C = u * g;
                    r[0] = m * h, r[4] = C - T * e, r[8] = P * e + w, r[1] = e, r[5] = p * h, r[9] = -u * h, r[2] = -g * h, r[6] = w * e + P, r[10] = T - C * e
                } else if ("XZY" === t.order) {
                    var T = p * m, w = p * g, P = u * m, C = u * g;
                    r[0] = m * h, r[4] = -e, r[8] = g * h, r[1] = T * e + C, r[5] = p * h, r[9] = w * e - P, r[2] = P * e - w, r[6] = u * h, r[10] = C * e + T
                }
                return r[3] = 0, r[7] = 0, r[11] = 0, r[12] = 0, r[13] = 0, r[14] = 0, r[15] = 1, this
            }, makeRotationFromQuaternion: function () {
                var e = new o.a(0, 0, 0), t = new o.a(1, 1, 1);
                return function (r) {
                    return this.compose(e, r, t)
                }
            }(), lookAt: function () {
                var e = new o.a, t = new o.a, r = new o.a;
                return function (a, i, n) {
                    var o = this.elements;
                    return r.subVectors(a, i), 0 === r.lengthSq() && (r.z = 1), r.normalize(), e.crossVectors(n, r), 0 === e.lengthSq() && (1 === Math.abs(n.z) ? r.x += 1e-4 : r.z += 1e-4, r.normalize(), e.crossVectors(n, r)), e.normalize(), t.crossVectors(r, e), o[0] = e.x, o[4] = t.x, o[8] = r.x, o[1] = e.y, o[5] = t.y, o[9] = r.y, o[2] = e.z, o[6] = t.z, o[10] = r.z, this
                }
            }(), multiply: function (e, t) {
                return void 0 === t ? this.multiplyMatrices(this, e) : (console.warn("THREE.Matrix4: .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead."), this.multiplyMatrices(e, t))
            }, premultiply: function (e) {
                return this.multiplyMatrices(e, this)
            }, multiplyMatrices: function (e, t) {
                var r = e.elements, a = t.elements, i = this.elements, n = r[0], o = r[4], s = r[8], l = r[12],
                    d = r[1], c = r[5], p = r[9], u = r[13], m = r[2], g = r[6], f = r[10], h = r[14], v = r[3],
                    x = r[7], y = r[11], _ = r[15], b = a[0], M = a[4], S = a[8], L = a[12], E = a[1], T = a[5],
                    w = a[9], P = a[13], C = a[2], A = a[6], D = a[10], R = a[14], N = a[3], I = a[7], z = a[11],
                    U = a[15];
                return i[0] = n * b + o * E + s * C + l * N, i[4] = n * M + o * T + s * A + l * I, i[8] = n * S + o * w + s * D + l * z, i[12] = n * L + o * P + s * R + l * U, i[1] = d * b + c * E + p * C + u * N, i[5] = d * M + c * T + p * A + u * I, i[9] = d * S + c * w + p * D + u * z, i[13] = d * L + c * P + p * R + u * U, i[2] = m * b + g * E + f * C + h * N, i[6] = m * M + g * T + f * A + h * I, i[10] = m * S + g * w + f * D + h * z, i[14] = m * L + g * P + f * R + h * U, i[3] = v * b + x * E + y * C + _ * N, i[7] = v * M + x * T + y * A + _ * I, i[11] = v * S + x * w + y * D + _ * z, i[15] = v * L + x * P + y * R + _ * U, this
            }, multiplyScalar: function (e) {
                var t = this.elements;
                return t[0] *= e, t[4] *= e, t[8] *= e, t[12] *= e, t[1] *= e, t[5] *= e, t[9] *= e, t[13] *= e, t[2] *= e, t[6] *= e, t[10] *= e, t[14] *= e, t[3] *= e, t[7] *= e, t[11] *= e, t[15] *= e, this
            }, applyToBufferAttribute: function () {
                var e = new o.a;
                return function (t) {
                    for (var r = 0, a = t.count; r < a; r++) e.x = t.getX(r), e.y = t.getY(r), e.z = t.getZ(r), e.applyMatrix4(this), t.setXYZ(r, e.x, e.y, e.z);
                    return t
                }
            }(), determinant: function () {
                var e = this.elements, t = e[0], r = e[4], a = e[8], i = e[12], n = e[1], o = e[5], s = e[9], l = e[13],
                    d = e[2], c = e[6], p = e[10], u = e[14], m = e[3], g = e[7], f = e[11], h = e[15];
                return m * (+i * s * c - a * l * c - i * o * p + r * l * p + a * o * u - r * s * u) + g * (+t * s * u - t * l * p + i * n * p - a * n * u + a * l * d - i * s * d) + f * (+t * l * c - t * o * u - i * n * c + r * n * u + i * o * d - r * l * d) + h * (-a * o * d - t * s * c + t * o * p + a * n * c - r * n * p + r * s * d)
            }, transpose: function () {
                var e = this.elements, t;
                return t = e[1], e[1] = e[4], e[4] = t, t = e[2], e[2] = e[8], e[8] = t, t = e[6], e[6] = e[9], e[9] = t, t = e[3], e[3] = e[12], e[12] = t, t = e[7], e[7] = e[13], e[13] = t, t = e[11], e[11] = e[14], e[14] = t, this
            }, setPosition: function (e) {
                var t = this.elements;
                return t[12] = e.x, t[13] = e.y, t[14] = e.z, this
            }, getInverse: function (e, t) {
                var r = this.elements, a = e.elements, i = a[0], n = a[1], o = a[2], s = a[3], l = a[4], d = a[5],
                    c = a[6], p = a[7], u = a[8], m = a[9], g = a[10], f = a[11], h = a[12], v = a[13], x = a[14],
                    y = a[15], _ = m * x * p - v * g * p + v * c * f - d * x * f - m * c * y + d * g * y,
                    b = h * g * p - u * x * p - h * c * f + l * x * f + u * c * y - l * g * y,
                    M = u * v * p - h * m * p + h * d * f - l * v * f - u * d * y + l * m * y,
                    S = h * m * c - u * v * c - h * d * g + l * v * g + u * d * x - l * m * x,
                    L = i * _ + n * b + o * M + s * S;
                if (0 == L) {
                    var E = "THREE.Matrix4: .getInverse() can't invert matrix, determinant is 0";
                    if (!0 === t) throw new Error(E); else console.warn(E);
                    return this.identity()
                }
                var T = 1 / L;
                return r[0] = _ * T, r[1] = (v * g * s - m * x * s - v * o * f + n * x * f + m * o * y - n * g * y) * T, r[2] = (d * x * s - v * c * s + v * o * p - n * x * p - d * o * y + n * c * y) * T, r[3] = (m * c * s - d * g * s - m * o * p + n * g * p + d * o * f - n * c * f) * T, r[4] = b * T, r[5] = (u * x * s - h * g * s + h * o * f - i * x * f - u * o * y + i * g * y) * T, r[6] = (h * c * s - l * x * s - h * o * p + i * x * p + l * o * y - i * c * y) * T, r[7] = (l * g * s - u * c * s + u * o * p - i * g * p - l * o * f + i * c * f) * T, r[8] = M * T, r[9] = (h * m * s - u * v * s - h * n * f + i * v * f + u * n * y - i * m * y) * T, r[10] = (l * v * s - h * d * s + h * n * p - i * v * p - l * n * y + i * d * y) * T, r[11] = (u * d * s - l * m * s - u * n * p + i * m * p + l * n * f - i * d * f) * T, r[12] = S * T, r[13] = (u * v * o - h * m * o + h * n * g - i * v * g - u * n * x + i * m * x) * T, r[14] = (h * d * o - l * v * o - h * n * c + i * v * c + l * n * x - i * d * x) * T, r[15] = (l * m * o - u * d * o + u * n * c - i * m * c - l * n * g + i * d * g) * T, this
            }, scale: function (e) {
                var t = this.elements, r = e.x, a = e.y, i = e.z;
                return t[0] *= r, t[4] *= a, t[8] *= i, t[1] *= r, t[5] *= a, t[9] *= i, t[2] *= r, t[6] *= a, t[10] *= i, t[3] *= r, t[7] *= a, t[11] *= i, this
            }, getMaxScaleOnAxis: function () {
                var e = this.elements, t = e[0] * e[0] + e[1] * e[1] + e[2] * e[2],
                    r = e[4] * e[4] + e[5] * e[5] + e[6] * e[6], a = e[8] * e[8] + e[9] * e[9] + e[10] * e[10];
                return Math.sqrt(Math.max(t, r, a))
            }, makeTranslation: function (e, t, r) {
                return this.set(1, 0, 0, e, 0, 1, 0, t, 0, 0, 1, r, 0, 0, 0, 1), this
            }, makeRotationX: function (e) {
                var t = n(e), r = i(e);
                return this.set(1, 0, 0, 0, 0, t, -r, 0, 0, r, t, 0, 0, 0, 0, 1), this
            }, makeRotationY: function (e) {
                var t = n(e), r = i(e);
                return this.set(t, 0, r, 0, 0, 1, 0, 0, -r, 0, t, 0, 0, 0, 0, 1), this
            }, makeRotationZ: function (e) {
                var t = n(e), r = i(e);
                return this.set(t, -r, 0, 0, r, t, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this
            }, makeRotationAxis: function (e, r) {
                var a = n(r), o = i(r), s = 1 - a, t = e.x, l = e.y, d = e.z, c = s * t, p = s * l;
                return this.set(c * t + a, c * l - o * d, c * d + o * l, 0, c * l + o * d, p * l + a, p * d - o * t, 0, c * d - o * l, p * d + o * t, s * d * d + a, 0, 0, 0, 0, 1), this
            }, makeScale: function (e, t, r) {
                return this.set(e, 0, 0, 0, 0, t, 0, 0, 0, 0, r, 0, 0, 0, 0, 1), this
            }, makeShear: function (e, t, r) {
                return this.set(1, t, r, 0, e, 1, r, 0, e, t, 1, 0, 0, 0, 0, 1), this
            }, compose: function (e, t, r) {
                var a = this.elements, i = t._x, n = t._y, o = t._z, s = t._w, l = i + i, d = n + n, c = o + o,
                    p = i * l, u = i * d, m = i * c, g = n * d, f = n * c, h = o * c, v = s * l, x = s * d, y = s * c,
                    _ = r.x, b = r.y, M = r.z;
                return a[0] = (1 - (g + h)) * _, a[1] = (u + y) * _, a[2] = (m - x) * _, a[3] = 0, a[4] = (u - y) * b, a[5] = (1 - (p + h)) * b, a[6] = (f + v) * b, a[7] = 0, a[8] = (m + x) * M, a[9] = (f - v) * M, a[10] = (1 - (p + g)) * M, a[11] = 0, a[12] = e.x, a[13] = e.y, a[14] = e.z, a[15] = 1, this
            }, decompose: function () {
                var e = new o.a, t = new a;
                return function (r, a, i) {
                    var n = this.elements, o = e.set(n[0], n[1], n[2]).length(), s = e.set(n[4], n[5], n[6]).length(),
                        l = e.set(n[8], n[9], n[10]).length(), d = this.determinant();
                    0 > d && (o = -o), r.x = n[12], r.y = n[13], r.z = n[14], t.copy(this);
                    var c = 1 / o, p = 1 / s, u = 1 / l;
                    return t.elements[0] *= c, t.elements[1] *= c, t.elements[2] *= c, t.elements[4] *= p, t.elements[5] *= p, t.elements[6] *= p, t.elements[8] *= u, t.elements[9] *= u, t.elements[10] *= u, a.setFromRotationMatrix(t), i.x = o, i.y = s, i.z = l, this
                }
            }(), makePerspective: function (e, t, r, a, i, n) {
                void 0 === n && console.warn("THREE.Matrix4: .makePerspective() has been redefined and has a new signature. Please check the docs.");
                var o = this.elements;
                return o[0] = 2 * i / (t - e), o[4] = 0, o[8] = (t + e) / (t - e), o[12] = 0, o[1] = 0, o[5] = 2 * i / (r - a), o[9] = (r + a) / (r - a), o[13] = 0, o[2] = 0, o[6] = 0, o[10] = -(n + i) / (n - i), o[14] = -2 * n * i / (n - i), o[3] = 0, o[7] = 0, o[11] = -1, o[15] = 0, this
            }, makeOrthographic: function (e, t, r, a, i, n) {
                var o = this.elements, s = 1 / (t - e), l = 1 / (r - a), d = 1 / (n - i);
                return o[0] = 2 * s, o[4] = 0, o[8] = 0, o[12] = -((t + e) * s), o[1] = 0, o[5] = 2 * l, o[9] = 0, o[13] = -((r + a) * l), o[2] = 0, o[6] = 0, o[10] = -2 * d, o[14] = -((n + i) * d), o[3] = 0, o[7] = 0, o[11] = 0, o[15] = 1, this
            }, equals: function (e) {
                for (var t = this.elements, r = e.elements, a = 0; 16 > a; a++) if (t[a] !== r[a]) return !1;
                return !0
            }, fromArray: function (e, t) {
                void 0 === t && (t = 0);
                for (var r = 0; 16 > r; r++) this.elements[r] = e[r + t];
                return this
            }, toArray: function (e, t) {
                void 0 === e && (e = []), void 0 === t && (t = 0);
                var r = this.elements;
                return e[t] = r[0], e[t + 1] = r[1], e[t + 2] = r[2], e[t + 3] = r[3], e[t + 4] = r[4], e[t + 5] = r[5], e[t + 6] = r[6], e[t + 7] = r[7], e[t + 8] = r[8], e[t + 9] = r[9], e[t + 10] = r[10], e[t + 11] = r[11], e[t + 12] = r[12], e[t + 13] = r[13], e[t + 14] = r[14], e[t + 15] = r[15], e
            }
        })
    }, "4H5f": function (e, t, r) {
        "use strict";

        function a(e) {
            var t = {};
            for (var r in e) for (var a in t[r] = {}, e[r]) {
                var i = e[r][a];
                t[r][a] = i && (i.isColor || i.isMatrix3 || i.isMatrix4 || i.isVector2 || i.isVector3 || i.isVector4 || i.isTexture) ? i.clone() : Array.isArray(i) ? i.slice() : i
            }
            return t
        }

        function i(e) {
            for (var t = {}, r = 0, i; r < e.length; r++) for (var n in i = a(e[r]), i) t[n] = i[n];
            return t
        }

        r.d(t, "a", function () {
            return a
        }), r.d(t, "b", function () {
            return i
        })
    }, "6deg": function (e, t, r) {
        "use strict";
        r.d(t, "pb", function () {
            return a
        }), r.d(t, "r", function () {
            return i
        }), r.d(t, "p", function () {
            return n
        }), r.d(t, "q", function () {
            return o
        }), r.d(t, "nb", function () {
            return s
        }), r.d(t, "ob", function () {
            return l
        }), r.d(t, "D", function () {
            return d
        }), r.d(t, "g", function () {
            return c
        }), r.d(t, "v", function () {
            return p
        }), r.d(t, "B", function () {
            return u
        }), r.d(t, "db", function () {
            return m
        }), r.d(t, "cb", function () {
            return g
        }), r.d(t, "fb", function () {
            return f
        }), r.d(t, "d", function () {
            return h
        }), r.d(t, "ec", function () {
            return v
        }), r.d(t, "W", function () {
            return x
        }), r.d(t, "s", function () {
            return y
        }), r.d(t, "b", function () {
            return _
        }), r.d(t, "dc", function () {
            return b
        }), r.d(t, "Xb", function () {
            return M
        }), r.d(t, "T", function () {
            return S
        }), r.d(t, "S", function () {
            return L
        }), r.d(t, "rc", function () {
            return E
        }), r.d(t, "ib", function () {
            return T
        }), r.d(t, "cc", function () {
            return w
        }), r.d(t, "mb", function () {
            return P
        }), r.d(t, "ac", function () {
            return C
        }), r.d(t, "lb", function () {
            return A
        }), r.d(t, "w", function () {
            return D
        }), r.d(t, "jb", function () {
            return R
        }), r.d(t, "x", function () {
            return N
        }), r.d(t, "kb", function () {
            return I
        }), r.d(t, "bc", function () {
            return z
        }), r.d(t, "bb", function () {
            return U
        }), r.d(t, "f", function () {
            return F
        }), r.d(t, "J", function () {
            return G
        }), r.d(t, "K", function () {
            return O
        }), r.d(t, "y", function () {
            return B
        }), r.d(t, "G", function () {
            return V
        }), r.d(t, "F", function () {
            return H
        }), r.d(t, "gb", function () {
            return k
        }), r.d(t, "X", function () {
            return W
        }), r.d(t, "V", function () {
            return q
        }), r.d(t, "c", function () {
            return X
        }), r.d(t, "eb", function () {
            return j
        }), r.d(t, "P", function () {
            return Y
        }), r.d(t, "Vb", function () {
            return J
        }), r.d(t, "jc", function () {
            return Z
        }), r.d(t, "j", function () {
            return Q
        }), r.d(t, "a", function () {
            return K
        }), r.d(t, "ic", function () {
            return $
        }), r.d(t, "l", function () {
            return ee
        }), r.d(t, "m", function () {
            return te
        }), r.d(t, "z", function () {
            return re
        }), r.d(t, "A", function () {
            return ae
        }), r.d(t, "Zb", function () {
            return ie
        }), r.d(t, "n", function () {
            return ne
        }), r.d(t, "o", function () {
            return oe
        }), r.d(t, "Wb", function () {
            return se
        }), r.d(t, "k", function () {
            return le
        }), r.d(t, "U", function () {
            return de
        }), r.d(t, "Y", function () {
            return ce
        }), r.d(t, "ab", function () {
            return pe
        }), r.d(t, "Z", function () {
            return ue
        }), r.d(t, "M", function () {
            return me
        }), r.d(t, "O", function () {
            return ge
        }), r.d(t, "N", function () {
            return fe
        }), r.d(t, "kc", function () {
            return he
        }), r.d(t, "i", function () {
            return ve
        }), r.d(t, "Yb", function () {
            return xe
        }), r.d(t, "qc", function () {
            return ye
        }), r.d(t, "I", function () {
            return _e
        }), r.d(t, "mc", function () {
            return be
        }), r.d(t, "C", function () {
            return Me
        }), r.d(t, "H", function () {
            return Se
        }), r.d(t, "nc", function () {
            return Le
        }), r.d(t, "oc", function () {
            return Ee
        }), r.d(t, "pc", function () {
            return Te
        }), r.d(t, "lc", function () {
            return we
        }), r.d(t, "e", function () {
            return Pe
        }), r.d(t, "Nb", function () {
            return Ce
        }), r.d(t, "rb", function () {
            return Ae
        }), r.d(t, "R", function () {
            return De
        }), r.d(t, "Q", function () {
            return Re
        }), r.d(t, "t", function () {
            return Ne
        }), r.d(t, "u", function () {
            return Ie
        }), r.d(t, "Ub", function () {
            return ze
        }), r.d(t, "Tb", function () {
            return Ue
        }), r.d(t, "Ib", function () {
            return Fe
        }), r.d(t, "Jb", function () {
            return Ge
        }), r.d(t, "Kb", function () {
            return Oe
        }), r.d(t, "Sb", function () {
            return Be
        }), r.d(t, "Rb", function () {
            return Ve
        }), r.d(t, "Hb", function () {
            return He
        }), r.d(t, "Gb", function () {
            return ke
        }), r.d(t, "Qb", function () {
            return We
        }), r.d(t, "yb", function () {
            return qe
        }), r.d(t, "zb", function () {
            return Xe
        }), r.d(t, "Ab", function () {
            return je
        }), r.d(t, "Bb", function () {
            return Ye
        }), r.d(t, "Cb", function () {
            return Je
        }),r.d(t, "Db", function () {
            return Ze
        }),r.d(t, "Eb", function () {
            return Qe
        }),r.d(t, "Fb", function () {
            return Ke
        }),r.d(t, "tb", function () {
            return $e
        }),r.d(t, "ub", function () {
            return et
        }),r.d(t, "vb", function () {
            return tt
        }),r.d(t, "sb", function () {
            return rt
        }),r.d(t, "wb", function () {
            return at
        }),r.d(t, "xb", function () {
            return it
        }),r.d(t, "hc", function () {
            return nt
        }),r.d(t, "gc", function () {
            return ot
        }),r.d(t, "fc", function () {
            return st
        }),r.d(t, "L", function () {
            return lt
        }),r.d(t, "sc", function () {
            return dt
        }),r.d(t, "E", function () {
            return ct
        }),r.d(t, "Mb", function () {
            return pt
        }),r.d(t, "Pb", function () {
            return ut
        }),r.d(t, "Ob", function () {
            return mt
        }),r.d(t, "Lb", function () {
            return gt
        }),r.d(t, "h", function () {
            return ft
        }),r.d(t, "qb", function () {
            return ht
        }),r.d(t, "hb", function () {
            return vt
        });
        var a = "101", i = 0, n = 1, o = 2, s = 1, l = 2, d = 0, c = 1, p = 2, u = 1, m = 0, g = 0, f = 1, h = 2, v = 3,
            x = 4, y = 5, _ = 100, b = 101, M = 102, S = 103, L = 104, E = 200, T = 201, w = 202, P = 203, C = 204,
            A = 205, D = 206, R = 207, N = 208, I = 209, z = 210, U = 0, F = 1, G = 2, O = 3, B = 4, V = 5, H = 6,
            k = 7, W = 0, q = 1, X = 2, j = 0, Y = 1, J = 2, Z = 3, Q = 4, K = 5, $ = 300, ee = 301, te = 302, re = 303,
            ae = 304, ie = 305, ne = 306, oe = 307, se = 1e3, le = 1001, de = 1002, ce = 1003, pe = 1004, ue = 1005,
            me = 1006, ge = 1007, fe = 1008, he = 1009, ve = 1010, xe = 1011, ye = 1012, _e = 1013, be = 1014,
            Me = 1015, Se = 1016, Le = 1017, Ee = 1018, Te = 1019, we = 1020, Pe = 1021, Ce = 1022, Ae = 1023,
            De = 1024, Re = 1025, Ne = 1026, Ie = 1027, ze = 1028, Ue = 33776, Fe = 33777, Ge = 33778, Oe = 33779,
            Be = 35840, Ve = 35841, He = 35842, ke = 35843, We = 36196, qe = 37808, Xe = 37809, je = 37810, Ye = 37811,
            Je = 37812, Ze = 37813, Qe = 37814, Ke = 37815, $e = 37816, et = 37817, tt = 37818, rt = 37819, at = 37820,
            it = 37821, nt = 0, ot = 1, st = 2, lt = 3e3, dt = 3001, ct = 3007, pt = 3002, ut = 3004, mt = 3005,
            gt = 3006, ft = 3200, ht = 3201, vt = 1
    }, "8IfN": function (e, t, r) {
        "use strict";

        function a(e, t) {
            this.center = void 0 === e ? new n.a : e, this.radius = void 0 === t ? 0 : t
        }

        r.d(t, "a", function () {
            return a
        });
        var i = r("/V9W"), n = r("w+kJ");
        Object.assign(a.prototype, {
            set: function (e, t) {
                return this.center.copy(e), this.radius = t, this
            }, setFromPoints: function () {
                var e = new i.a;
                return function (t, r) {
                    var a = this.center;
                    void 0 === r ? e.setFromPoints(t).getCenter(a) : a.copy(r);
                    for (var n = 0, o = 0, i = t.length; o < i; o++) n = Math.max(n, a.distanceToSquared(t[o]));
                    return this.radius = Math.sqrt(n), this
                }
            }(), clone: function () {
                return new this.constructor().copy(this)
            }, copy: function (e) {
                return this.center.copy(e.center), this.radius = e.radius, this
            }, empty: function () {
                return 0 >= this.radius
            }, containsPoint: function (e) {
                return e.distanceToSquared(this.center) <= this.radius * this.radius
            }, distanceToPoint: function (e) {
                return e.distanceTo(this.center) - this.radius
            }, intersectsSphere: function (e) {
                var t = this.radius + e.radius;
                return e.center.distanceToSquared(this.center) <= t * t
            }, intersectsBox: function (e) {
                return e.intersectsSphere(this)
            }, intersectsPlane: function (e) {
                return Math.abs(e.distanceToPoint(this.center)) <= this.radius
            }, clampPoint: function (e, t) {
                var r = this.center.distanceToSquared(e);
                return void 0 === t && (console.warn("THREE.Sphere: .clampPoint() target is now required"), t = new n.a), t.copy(e), r > this.radius * this.radius && (t.sub(this.center).normalize(), t.multiplyScalar(this.radius).add(this.center)), t
            }, getBoundingBox: function (e) {
                return void 0 === e && (console.warn("THREE.Sphere: .getBoundingBox() target is now required"), e = new i.a), e.set(this.center, this.center), e.expandByScalar(this.radius), e
            }, applyMatrix4: function (e) {
                return this.center.applyMatrix4(e), this.radius *= e.getMaxScaleOnAxis(), this
            }, translate: function (e) {
                return this.center.add(e), this
            }, equals: function (e) {
                return e.center.equals(this.center) && e.radius === this.radius
            }
        })
    }, "9HH4": function (e, t, r) {
        "use strict";

        function a(e, t, r, a, o, s) {
            this.a = e, this.b = t, this.c = r, this.normal = a && a.isVector3 ? a : new n.a, this.vertexNormals = Array.isArray(a) ? a : [], this.color = o && o.isColor ? o : new i.a, this.vertexColors = Array.isArray(o) ? o : [], this.materialIndex = void 0 === s ? 0 : s
        }

        r.d(t, "a", function () {
            return a
        });
        var i = r("cuij"), n = r("w+kJ");
        Object.assign(a.prototype, {
            clone: function () {
                return new this.constructor().copy(this)
            }, copy: function (e) {
                this.a = e.a, this.b = e.b, this.c = e.c, this.normal.copy(e.normal), this.color.copy(e.color), this.materialIndex = e.materialIndex;
                for (var t = 0, r = e.vertexNormals.length; t < r; t++) this.vertexNormals[t] = e.vertexNormals[t].clone();
                for (var t = 0, r = e.vertexColors.length; t < r; t++) this.vertexColors[t] = e.vertexColors[t].clone();
                return this
            }
        })
    }, "9eRv": function (e, t, r) {
        "use strict";

        function a() {
            Object.defineProperty(this, "id", {value: s++}), this.uuid = o.a.generateUUID(), this.name = "", this.type = "Material", this.fog = !0, this.lights = !0, this.blending = n.fb, this.side = n.D, this.flatShading = !1, this.vertexColors = n.db, this.opacity = 1, this.transparent = !1, this.blendSrc = n.ac, this.blendDst = n.lb, this.blendEquation = n.b, this.blendSrcAlpha = null, this.blendDstAlpha = null, this.blendEquationAlpha = null, this.depthFunc = n.K, this.depthTest = !0, this.depthWrite = !0, this.clippingPlanes = null, this.clipIntersection = !1, this.clipShadows = !1, this.shadowSide = null, this.colorWrite = !0, this.precision = null, this.polygonOffset = !1, this.polygonOffsetFactor = 0, this.polygonOffsetUnits = 0, this.dithering = !1, this.alphaTest = 0, this.premultipliedAlpha = !1, this.visible = !0, this.userData = {}, this.needsUpdate = !0
        }

        r.d(t, "a", function () {
            return a
        });
        var i = r("w4Ua"), n = r("6deg"), o = r("MnML"), s = 0;
        a.prototype = Object.assign(Object.create(i.a.prototype), {
            constructor: a, isMaterial: !0, onBeforeCompile: function () {
            }, setValues: function (e) {
                if (void 0 !== e) for (var t in e) {
                    var r = e[t];
                    if (void 0 === r) {
                        console.warn("THREE.Material: '" + t + "' parameter is undefined.");
                        continue
                    }
                    if ("shading" == t) {
                        console.warn("THREE." + this.type + ": .shading has been removed. Use the boolean .flatShading instead."), this.flatShading = r === n.B;
                        continue
                    }
                    var a = this[t];
                    if (void 0 === a) {
                        console.warn("THREE." + this.type + ": '" + t + "' is not a property of this material.");
                        continue
                    }
                    a && a.isColor ? a.set(r) : a && a.isVector3 && r && r.isVector3 ? a.copy(r) : this[t] = r
                }
            }, toJSON: function (e) {
                function t(e) {
                    var t = [];
                    for (var r in e) {
                        var a = e[r];
                        delete a.metadata, t.push(a)
                    }
                    return t
                }

                var r = void 0 === e || "string" == typeof e;
                r && (e = {textures: {}, images: {}});
                var a = {metadata: {version: 4.5, type: "Material", generator: "Material.toJSON"}};
                if (a.uuid = this.uuid, a.type = this.type, "" !== this.name && (a.name = this.name), this.color && this.color.isColor && (a.color = this.color.getHex()), void 0 !== this.roughness && (a.roughness = this.roughness), void 0 !== this.metalness && (a.metalness = this.metalness), this.emissive && this.emissive.isColor && (a.emissive = this.emissive.getHex()), 1 !== this.emissiveIntensity && (a.emissiveIntensity = this.emissiveIntensity), this.specular && this.specular.isColor && (a.specular = this.specular.getHex()), void 0 !== this.shininess && (a.shininess = this.shininess), void 0 !== this.clearCoat && (a.clearCoat = this.clearCoat), void 0 !== this.clearCoatRoughness && (a.clearCoatRoughness = this.clearCoatRoughness), this.map && this.map.isTexture && (a.map = this.map.toJSON(e).uuid), this.alphaMap && this.alphaMap.isTexture && (a.alphaMap = this.alphaMap.toJSON(e).uuid), this.lightMap && this.lightMap.isTexture && (a.lightMap = this.lightMap.toJSON(e).uuid), this.aoMap && this.aoMap.isTexture && (a.aoMap = this.aoMap.toJSON(e).uuid, a.aoMapIntensity = this.aoMapIntensity), this.bumpMap && this.bumpMap.isTexture && (a.bumpMap = this.bumpMap.toJSON(e).uuid, a.bumpScale = this.bumpScale), this.normalMap && this.normalMap.isTexture && (a.normalMap = this.normalMap.toJSON(e).uuid, a.normalMapType = this.normalMapType, a.normalScale = this.normalScale.toArray()), this.displacementMap && this.displacementMap.isTexture && (a.displacementMap = this.displacementMap.toJSON(e).uuid, a.displacementScale = this.displacementScale, a.displacementBias = this.displacementBias), this.roughnessMap && this.roughnessMap.isTexture && (a.roughnessMap = this.roughnessMap.toJSON(e).uuid), this.metalnessMap && this.metalnessMap.isTexture && (a.metalnessMap = this.metalnessMap.toJSON(e).uuid), this.emissiveMap && this.emissiveMap.isTexture && (a.emissiveMap = this.emissiveMap.toJSON(e).uuid), this.specularMap && this.specularMap.isTexture && (a.specularMap = this.specularMap.toJSON(e).uuid), this.envMap && this.envMap.isTexture && (a.envMap = this.envMap.toJSON(e).uuid, a.reflectivity = this.reflectivity, void 0 !== this.combine && (a.combine = this.combine), void 0 !== this.envMapIntensity && (a.envMapIntensity = this.envMapIntensity)), this.gradientMap && this.gradientMap.isTexture && (a.gradientMap = this.gradientMap.toJSON(e).uuid), void 0 !== this.size && (a.size = this.size), void 0 !== this.sizeAttenuation && (a.sizeAttenuation = this.sizeAttenuation), this.blending !== n.fb && (a.blending = this.blending), !0 === this.flatShading && (a.flatShading = this.flatShading), this.side !== n.D && (a.side = this.side), this.vertexColors !== n.db && (a.vertexColors = this.vertexColors), 1 > this.opacity && (a.opacity = this.opacity), !0 === this.transparent && (a.transparent = this.transparent), a.depthFunc = this.depthFunc, a.depthTest = this.depthTest, a.depthWrite = this.depthWrite, 0 !== this.rotation && (a.rotation = this.rotation), !0 === this.polygonOffset && (a.polygonOffset = !0), 0 !== this.polygonOffsetFactor && (a.polygonOffsetFactor = this.polygonOffsetFactor), 0 !== this.polygonOffsetUnits && (a.polygonOffsetUnits = this.polygonOffsetUnits), 1 !== this.linewidth && (a.linewidth = this.linewidth), void 0 !== this.dashSize && (a.dashSize = this.dashSize), void 0 !== this.gapSize && (a.gapSize = this.gapSize), void 0 !== this.scale && (a.scale = this.scale), !0 === this.dithering && (a.dithering = !0), 0 < this.alphaTest && (a.alphaTest = this.alphaTest), !0 === this.premultipliedAlpha && (a.premultipliedAlpha = this.premultipliedAlpha), !0 === this.wireframe && (a.wireframe = this.wireframe), 1 < this.wireframeLinewidth && (a.wireframeLinewidth = this.wireframeLinewidth), "round" !== this.wireframeLinecap && (a.wireframeLinecap = this.wireframeLinecap), "round" !== this.wireframeLinejoin && (a.wireframeLinejoin = this.wireframeLinejoin), !0 === this.morphTargets && (a.morphTargets = !0), !0 === this.skinning && (a.skinning = !0), !1 === this.visible && (a.visible = !1), "{}" !== JSON.stringify(this.userData) && (a.userData = this.userData), r) {
                    var i = t(e.textures), o = t(e.images);
                    0 < i.length && (a.textures = i), 0 < o.length && (a.images = o)
                }
                return a
            }, clone: function () {
                return new this.constructor().copy(this)
            }, copy: function (e) {
                this.name = e.name, this.fog = e.fog, this.lights = e.lights, this.blending = e.blending, this.side = e.side, this.flatShading = e.flatShading, this.vertexColors = e.vertexColors, this.opacity = e.opacity, this.transparent = e.transparent, this.blendSrc = e.blendSrc, this.blendDst = e.blendDst, this.blendEquation = e.blendEquation, this.blendSrcAlpha = e.blendSrcAlpha, this.blendDstAlpha = e.blendDstAlpha, this.blendEquationAlpha = e.blendEquationAlpha, this.depthFunc = e.depthFunc, this.depthTest = e.depthTest, this.depthWrite = e.depthWrite, this.colorWrite = e.colorWrite, this.precision = e.precision, this.polygonOffset = e.polygonOffset, this.polygonOffsetFactor = e.polygonOffsetFactor, this.polygonOffsetUnits = e.polygonOffsetUnits, this.dithering = e.dithering, this.alphaTest = e.alphaTest, this.premultipliedAlpha = e.premultipliedAlpha, this.visible = e.visible, this.userData = JSON.parse(JSON.stringify(e.userData)), this.clipShadows = e.clipShadows, this.clipIntersection = e.clipIntersection;
                var t = e.clippingPlanes, r = null;
                if (null !== t) {
                    var a = t.length;
                    r = Array(a);
                    for (var n = 0; n !== a; ++n) r[n] = t[n].clone()
                }
                return this.clippingPlanes = r, this.shadowSide = e.shadowSide, this
            }, dispose: function () {
                this.dispatchEvent({type: "dispose"})
            }
        })
    }, "9y4G": function (e, t, r) {
        "use strict";

        function a(e, t) {
            this.origin = void 0 === e ? new s.a : e, this.direction = void 0 === t ? new s.a : t
        }

        var i = Math.sqrt, n = Math.max, o = Math.min;
        r.d(t, "a", function () {
            return a
        });
        var s = r("w+kJ");
        Object.assign(a.prototype, {
            set: function (e, t) {
                return this.origin.copy(e), this.direction.copy(t), this
            }, clone: function () {
                return new this.constructor().copy(this)
            }, copy: function (e) {
                return this.origin.copy(e.origin), this.direction.copy(e.direction), this
            }, at: function (e, t) {
                return void 0 === t && (console.warn("THREE.Ray: .at() target is now required"), t = new s.a), t.copy(this.direction).multiplyScalar(e).add(this.origin)
            }, lookAt: function (e) {
                return this.direction.copy(e).sub(this.origin).normalize(), this
            }, recast: function () {
                var e = new s.a;
                return function (r) {
                    return this.origin.copy(this.at(r, e)), this
                }
            }(), closestPointToPoint: function (e, t) {
                void 0 === t && (console.warn("THREE.Ray: .closestPointToPoint() target is now required"), t = new s.a), t.subVectors(e, this.origin);
                var r = t.dot(this.direction);
                return 0 > r ? t.copy(this.origin) : t.copy(this.direction).multiplyScalar(r).add(this.origin)
            }, distanceToPoint: function (e) {
                return i(this.distanceSqToPoint(e))
            }, distanceSqToPoint: function () {
                var e = new s.a;
                return function (t) {
                    var r = e.subVectors(t, this.origin).dot(this.direction);
                    return 0 > r ? this.origin.distanceToSquared(t) : (e.copy(this.direction).multiplyScalar(r).add(this.origin), e.distanceToSquared(t))
                }
            }(), distanceSqToSegment: function () {
                var e = new s.a, t = new s.a, r = new s.a;
                return function (a, i, s, l) {
                    e.copy(a).add(i).multiplyScalar(.5), t.copy(i).sub(a).normalize(), r.copy(this.origin).sub(e);
                    var d = .5 * a.distanceTo(i), p = -this.direction.dot(t), u = r.dot(this.direction), m = -r.dot(t),
                        g = r.lengthSq(), c = Math.abs(1 - p * p), f, h, v, x;
                    if (!(0 < c)) h = 0 < p ? -d : d, f = n(0, -(p * h + u)), v = -f * f + h * (h + 2 * m) + g; else if (f = p * m - u, h = p * u - m, x = d * c, !(0 <= f)) h <= -x ? (f = n(0, -(-p * d + u)), h = 0 < f ? -d : o(n(-d, -m), d), v = -f * f + h * (h + 2 * m) + g) : h <= x ? (f = 0, h = o(n(-d, -m), d), v = h * (h + 2 * m) + g) : (f = n(0, -(p * d + u)), h = 0 < f ? d : o(n(-d, -m), d), v = -f * f + h * (h + 2 * m) + g); else if (!(h >= -x)) h = -d, f = n(0, -(p * h + u)), v = -f * f + h * (h + 2 * m) + g; else if (h <= x) {
                        var y = 1 / c;
                        f *= y, h *= y, v = f * (f + p * h + 2 * u) + h * (p * f + h + 2 * m) + g
                    } else h = d, f = n(0, -(p * h + u)), v = -f * f + h * (h + 2 * m) + g;
                    return s && s.copy(this.direction).multiplyScalar(f).add(this.origin), l && l.copy(t).multiplyScalar(h).add(e), v
                }
            }(), intersectSphere: function () {
                var e = new s.a;
                return function (t, r) {
                    e.subVectors(t.center, this.origin);
                    var a = e.dot(this.direction), n = e.dot(e) - a * a, o = t.radius * t.radius;
                    if (n > o) return null;
                    var s = i(o - n), l = a - s, d = a + s;
                    return 0 > l && 0 > d ? null : 0 > l ? this.at(d, r) : this.at(l, r)
                }
            }(), intersectsSphere: function (e) {
                return this.distanceSqToPoint(e.center) <= e.radius * e.radius
            }, distanceToPlane: function (e) {
                var r = e.normal.dot(this.direction);
                if (0 === r) return 0 === e.distanceToPoint(this.origin) ? 0 : null;
                var a = -(this.origin.dot(e.normal) + e.constant) / r;
                return 0 <= a ? a : null
            }, intersectPlane: function (e, r) {
                var a = this.distanceToPlane(e);
                return null === a ? null : this.at(a, r)
            }, intersectsPlane: function (e) {
                var t = e.distanceToPoint(this.origin);
                if (0 === t) return !0;
                var r = e.normal.dot(this.direction);
                return !!(0 > r * t)
            }, intersectBox: function (e, t) {
                var r = 1 / this.direction.x, a = 1 / this.direction.y, i = 1 / this.direction.z, n = this.origin, o, s,
                    l, d, c, p;
                return (0 <= r ? (o = (e.min.x - n.x) * r, s = (e.max.x - n.x) * r) : (o = (e.max.x - n.x) * r, s = (e.min.x - n.x) * r), 0 <= a ? (l = (e.min.y - n.y) * a, d = (e.max.y - n.y) * a) : (l = (e.max.y - n.y) * a, d = (e.min.y - n.y) * a), o > d || l > s) ? null : ((l > o || o != o) && (o = l), (d < s || s != s) && (s = d), 0 <= i ? (c = (e.min.z - n.z) * i, p = (e.max.z - n.z) * i) : (c = (e.max.z - n.z) * i, p = (e.min.z - n.z) * i), o > p || c > s) ? null : ((c > o || o != o) && (o = c), (p < s || s != s) && (s = p), 0 > s ? null : this.at(0 <= o ? o : s, t))
            }, intersectsBox: function () {
                var e = new s.a;
                return function (t) {
                    return null !== this.intersectBox(t, e)
                }
            }(), intersectTriangle: function () {
                var e = new s.a, t = new s.a, r = new s.a, i = new s.a;
                return function (n, a, o, s, l) {
                    t.subVectors(a, n), r.subVectors(o, n), i.crossVectors(t, r);
                    var d = this.direction.dot(i), c;
                    if (0 < d) {
                        if (s) return null;
                        c = 1
                    } else if (0 > d) c = -1, d = -d; else return null;
                    e.subVectors(this.origin, n);
                    var p = c * this.direction.dot(r.crossVectors(e, r));
                    if (0 > p) return null;
                    var u = c * this.direction.dot(t.cross(e));
                    if (0 > u) return null;
                    if (p + u > d) return null;
                    var m = -c * e.dot(i);
                    return 0 > m ? null : this.at(m / d, l)
                }
            }(), applyMatrix4: function (e) {
                return this.origin.applyMatrix4(e), this.direction.transformDirection(e), this
            }, equals: function (e) {
                return e.origin.equals(this.origin) && e.direction.equals(this.direction)
            }
        })
    }, AIox: function (e, t, r) {
        "use strict";

        function a(e) {
            i.a.call(this), this.type = "MeshBasicMaterial", this.color = new o.a(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.combine = n.X, this.reflectivity = 1, this.refractionRatio = .98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.skinning = !1, this.morphTargets = !1, this.lights = !1, this.setValues(e)
        }

        r.d(t, "a", function () {
            return a
        });
        var i = r("9eRv"), n = r("6deg"), o = r("cuij");
        a.prototype = Object.create(i.a.prototype), a.prototype.constructor = a, a.prototype.isMeshBasicMaterial = !0, a.prototype.copy = function (e) {
            return i.a.prototype.copy.call(this, e), this.color.copy(e.color), this.map = e.map, this.lightMap = e.lightMap, this.lightMapIntensity = e.lightMapIntensity, this.aoMap = e.aoMap, this.aoMapIntensity = e.aoMapIntensity, this.specularMap = e.specularMap, this.alphaMap = e.alphaMap, this.envMap = e.envMap, this.combine = e.combine, this.reflectivity = e.reflectivity, this.refractionRatio = e.refractionRatio, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.wireframeLinecap = e.wireframeLinecap, this.wireframeLinejoin = e.wireframeLinejoin, this.skinning = e.skinning, this.morphTargets = e.morphTargets, this
        }
    }, BR65: function (e, t, r) {
        "use strict";

        function a(e, t, r) {
            this.name = "", this.color = new i.a(e), this.near = void 0 === t ? 1 : t, this.far = void 0 === r ? 1e3 : r
        }

        r.d(t, "a", function () {
            return a
        });
        var i = r("cuij");
        a.prototype.isFog = !0, a.prototype.clone = function () {
            return new a(this.color, this.near, this.far)
        }, a.prototype.toJSON = function () {
            return {type: "Fog", color: this.color.getHex(), near: this.near, far: this.far}
        }
    }, CNRw: function (e, t, r) {
        "use strict";

        function a(e, t, r, a) {
            this.x = e || 0, this.y = t || 0, this.z = r || 0, this.w = void 0 === a ? 1 : a
        }

        var i = Math.round, n = Math.ceil, o = Math.floor, l = Math.acos, d = Math.sqrt, c = Math.abs, s = Math.max,
            p = Math.min;
        r.d(t, "a", function () {
            return a
        }), Object.assign(a.prototype, {
            isVector4: !0, set: function (e, t, r, a) {
                return this.x = e, this.y = t, this.z = r, this.w = a, this
            }, setScalar: function (e) {
                return this.x = e, this.y = e, this.z = e, this.w = e, this
            }, setX: function (e) {
                return this.x = e, this
            }, setY: function (e) {
                return this.y = e, this
            }, setZ: function (e) {
                return this.z = e, this
            }, setW: function (e) {
                return this.w = e, this
            }, setComponent: function (e, t) {
                switch (e) {
                    case 0:
                        this.x = t;
                        break;
                    case 1:
                        this.y = t;
                        break;
                    case 2:
                        this.z = t;
                        break;
                    case 3:
                        this.w = t;
                        break;
                    default:
                        throw new Error("index is out of range: " + e);
                }
                return this
            }, getComponent: function (e) {
                switch (e) {
                    case 0:
                        return this.x;
                    case 1:
                        return this.y;
                    case 2:
                        return this.z;
                    case 3:
                        return this.w;
                    default:
                        throw new Error("index is out of range: " + e);
                }
            }, clone: function () {
                return new this.constructor(this.x, this.y, this.z, this.w)
            }, copy: function (e) {
                return this.x = e.x, this.y = e.y, this.z = e.z, this.w = void 0 === e.w ? 1 : e.w, this
            }, add: function (e, t) {
                return void 0 === t ? (this.x += e.x, this.y += e.y, this.z += e.z, this.w += e.w, this) : (console.warn("THREE.Vector4: .add() now only accepts one argument. Use .addVectors( a, b ) instead."), this.addVectors(e, t))
            }, addScalar: function (e) {
                return this.x += e, this.y += e, this.z += e, this.w += e, this
            }, addVectors: function (e, t) {
                return this.x = e.x + t.x, this.y = e.y + t.y, this.z = e.z + t.z, this.w = e.w + t.w, this
            }, addScaledVector: function (e, t) {
                return this.x += e.x * t, this.y += e.y * t, this.z += e.z * t, this.w += e.w * t, this
            }, sub: function (e, t) {
                return void 0 === t ? (this.x -= e.x, this.y -= e.y, this.z -= e.z, this.w -= e.w, this) : (console.warn("THREE.Vector4: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."), this.subVectors(e, t))
            }, subScalar: function (e) {
                return this.x -= e, this.y -= e, this.z -= e, this.w -= e, this
            }, subVectors: function (e, t) {
                return this.x = e.x - t.x, this.y = e.y - t.y, this.z = e.z - t.z, this.w = e.w - t.w, this
            }, multiplyScalar: function (e) {
                return this.x *= e, this.y *= e, this.z *= e, this.w *= e, this
            }, applyMatrix4: function (t) {
                var r = this.x, a = this.y, i = this.z, n = this.w, o = t.elements;
                return this.x = o[0] * r + o[4] * a + o[8] * i + o[12] * n, this.y = o[1] * r + o[5] * a + o[9] * i + o[13] * n, this.z = o[2] * r + o[6] * a + o[10] * i + o[14] * n, this.w = o[3] * r + o[7] * a + o[11] * i + o[15] * n, this
            }, divideScalar: function (e) {
                return this.multiplyScalar(1 / e)
            }, setAxisAngleFromQuaternion: function (e) {
                this.w = 2 * l(e.w);
                var t = d(1 - e.w * e.w);
                return 1e-4 > t ? (this.x = 1, this.y = 0, this.z = 0) : (this.x = e.x / t, this.y = e.y / t, this.z = e.z / t), this
            }, setAxisAngleFromRotationMatrix: function (e) {
                var t = .01, r = .1, a = e.elements, i = a[0], n = a[4], o = a[8], p = a[1], u = a[5], m = a[9],
                    g = a[2], f = a[6], h = a[10], v, _, x, y;
                if (c(n - p) < t && c(o - g) < t && c(m - f) < t) {
                    if (c(n + p) < r && c(o + g) < r && c(m + f) < r && c(i + u + h - 3) < r) return this.set(1, 0, 0, 0), this;
                    v = Math.PI;
                    var b = (i + 1) / 2, M = (u + 1) / 2, S = (h + 1) / 2, L = (n + p) / 4, E = (o + g) / 4,
                        T = (m + f) / 4;
                    return b > M && b > S ? b < t ? (_ = 0, x = .707106781, y = .707106781) : (_ = d(b), x = L / _, y = E / _) : M > S ? M < t ? (_ = .707106781, x = 0, y = .707106781) : (x = d(M), _ = L / x, y = T / x) : S < t ? (_ = .707106781, x = .707106781, y = 0) : (y = d(S), _ = E / y, x = T / y), this.set(_, x, y, v), this
                }
                var w = d((f - m) * (f - m) + (o - g) * (o - g) + (p - n) * (p - n));
                return .001 > c(w) && (w = 1), this.x = (f - m) / w, this.y = (o - g) / w, this.z = (p - n) / w, this.w = l((i + u + h - 1) / 2), this
            }, min: function (e) {
                return this.x = p(this.x, e.x), this.y = p(this.y, e.y), this.z = p(this.z, e.z), this.w = p(this.w, e.w), this
            }, max: function (e) {
                return this.x = s(this.x, e.x), this.y = s(this.y, e.y), this.z = s(this.z, e.z), this.w = s(this.w, e.w), this
            }, clamp: function (e, t) {
                return this.x = s(e.x, p(t.x, this.x)), this.y = s(e.y, p(t.y, this.y)), this.z = s(e.z, p(t.z, this.z)), this.w = s(e.w, p(t.w, this.w)), this
            }, clampScalar: function () {
                var e, t;
                return function (r, i) {
                    return void 0 == e && (e = new a, t = new a), e.set(r, r, r, r), t.set(i, i, i, i), this.clamp(e, t)
                }
            }(), clampLength: function (e, t) {
                var r = this.length();
                return this.divideScalar(r || 1).multiplyScalar(s(e, p(t, r)))
            }, floor: function () {
                return this.x = o(this.x), this.y = o(this.y), this.z = o(this.z), this.w = o(this.w), this
            }, ceil: function () {
                return this.x = n(this.x), this.y = n(this.y), this.z = n(this.z), this.w = n(this.w), this
            }, round: function () {
                return this.x = i(this.x), this.y = i(this.y), this.z = i(this.z), this.w = i(this.w), this
            }, roundToZero: function () {
                return this.x = 0 > this.x ? n(this.x) : o(this.x), this.y = 0 > this.y ? n(this.y) : o(this.y), this.z = 0 > this.z ? n(this.z) : o(this.z), this.w = 0 > this.w ? n(this.w) : o(this.w), this
            }, negate: function () {
                return this.x = -this.x, this.y = -this.y, this.z = -this.z, this.w = -this.w, this
            }, dot: function (e) {
                return this.x * e.x + this.y * e.y + this.z * e.z + this.w * e.w
            }, lengthSq: function () {
                return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
            }, length: function () {
                return d(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w)
            }, manhattanLength: function () {
                return c(this.x) + c(this.y) + c(this.z) + c(this.w)
            }, normalize: function () {
                return this.divideScalar(this.length() || 1)
            }, setLength: function (e) {
                return this.normalize().multiplyScalar(e)
            }, lerp: function (e, t) {
                return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this.z += (e.z - this.z) * t, this.w += (e.w - this.w) * t, this
            }, lerpVectors: function (e, t, r) {
                return this.subVectors(t, e).multiplyScalar(r).add(e)
            }, equals: function (e) {
                return e.x === this.x && e.y === this.y && e.z === this.z && e.w === this.w
            }, fromArray: function (e, t) {
                return void 0 === t && (t = 0), this.x = e[t], this.y = e[t + 1], this.z = e[t + 2], this.w = e[t + 3], this
            }, toArray: function (e, t) {
                return void 0 === e && (e = []), void 0 === t && (t = 0), e[t] = this.x, e[t + 1] = this.y, e[t + 2] = this.z, e[t + 3] = this.w, e
            }, fromBufferAttribute: function (e, t, r) {
                return void 0 !== r && console.warn("THREE.Vector4: offset has been removed from .fromBufferAttribute()."), this.x = e.getX(t), this.y = e.getY(t), this.z = e.getZ(t), this.w = e.getW(t), this
            }
        })
    }, D10d: function (e, t, r) {
        "use strict";

        function a(e, t, r, a) {
            this.ray = new i.a(e, t), this.near = r || 0, this.far = a || Infinity, this.params = {
                Mesh: {},
                Line: {},
                LOD: {},
                Points: {threshold: 1},
                Sprite: {}
            }, Object.defineProperties(this.params, {
                PointCloud: {
                    get: function () {
                        return console.warn("THREE.Raycaster: params.PointCloud has been renamed to params.Points."), this.Points
                    }
                }
            })
        }

        function n(e, t) {
            return e.distance - t.distance
        }

        function o(e, t, r, a) {
            if (!1 !== e.visible && (e.raycast(t, r), !0 === a)) for (var n = e.children, s = 0, i = n.length; s < i; s++) o(n[s], t, r, !0)
        }

        r.d(t, "a", function () {
            return a
        });
        var i = r("9y4G");
        Object.assign(a.prototype, {
            linePrecision: 1, set: function (e, t) {
                this.ray.set(e, t)
            }, setFromCamera: function (e, t) {
                t && t.isPerspectiveCamera ? (this.ray.origin.setFromMatrixPosition(t.matrixWorld), this.ray.direction.set(e.x, e.y, .5).unproject(t).sub(this.ray.origin).normalize()) : t && t.isOrthographicCamera ? (this.ray.origin.set(e.x, e.y, (t.near + t.far) / (t.near - t.far)).unproject(t), this.ray.direction.set(0, 0, -1).transformDirection(t.matrixWorld)) : console.error("THREE.Raycaster: Unsupported camera type.")
            }, intersectObject: function (e, t, r) {
                var a = r || [];
                return o(e, this, a, t), a.sort(n), a
            }, intersectObjects: function (e, t, r) {
                var a = r || [];
                if (!1 === Array.isArray(e)) return console.warn("THREE.Raycaster.intersectObjects: objects is not an Array."), a;
                for (var s = 0, i = e.length; s < i; s++) o(e[s], this, a, t);
                return a.sort(n), a
            }
        })
    }, "E3/K": function (e, t, r) {
        "use strict";

        function a() {
            i.a.call(this), this.type = "Scene", this.background = null, this.fog = null, this.overrideMaterial = null, this.autoUpdate = !0
        }

        r.d(t, "a", function () {
            return a
        });
        var i = r("p1p1");
        a.prototype = Object.assign(Object.create(i.a.prototype), {
            constructor: a, isScene: !0, copy: function (e, t) {
                return i.a.prototype.copy.call(this, e, t), null !== e.background && (this.background = e.background.clone()), null !== e.fog && (this.fog = e.fog.clone()), null !== e.overrideMaterial && (this.overrideMaterial = e.overrideMaterial.clone()), this.autoUpdate = e.autoUpdate, this.matrixAutoUpdate = e.matrixAutoUpdate, this
            }, toJSON: function (e) {
                var t = i.a.prototype.toJSON.call(this, e);
                return null !== this.background && (t.object.background = this.background.toJSON(e)), null !== this.fog && (t.object.fog = this.fog.toJSON()), t
            }, dispose: function () {
                this.dispatchEvent({type: "dispose"})
            }
        })
    }, EpSA: function (e, t, r) {
        "use strict";

        function a() {
            this.type = "Curve", this.arcLengthDivisions = 200
        }

        function i(e, t) {
            a.call(this), this.type = "LineCurve", this.v1 = e || new W.a, this.v2 = t || new W.a
        }

        function n(e, t, r, i, n, o, s, l) {
            a.call(this), this.type = "EllipseCurve", this.aX = e || 0, this.aY = t || 0, this.xRadius = r || 1, this.yRadius = i || 1, this.aStartAngle = n || 0, this.aEndAngle = o || 2 * F, this.aClockwise = s || !1, this.aRotation = l || 0
        }

        function o(e, t, r, a, i, o) {
            n.call(this, e, t, r, r, a, i, o), this.type = "ArcCurve"
        }

        function s() {
            function e(e, t, o, s) {
                r = e, a = o, i = -3 * e + 3 * t - 2 * o - s, n = 2 * e - 2 * t + o + s
            }

            var r = 0, a = 0, i = 0, n = 0;
            return {
                initCatmullRom: function (t, r, a, i, n) {
                    e(r, a, n * (a - t), n * (i - r))
                }, initNonuniformCatmullRom: function (t, r, a, i, n, o, s) {
                    var l = (r - t) / n - (a - t) / (n + o) + (a - r) / o,
                        d = (a - r) / o - (i - r) / (o + s) + (i - a) / s;
                    l *= o, d *= o, e(r, a, l, d)
                }, calc: function (e) {
                    var t = e * e;
                    return r + a * e + i * t + n * (t * e)
                }
            }
        }

        function l(e, t, r, i) {
            a.call(this), this.type = "CatmullRomCurve3", this.points = e || [], this.closed = t || !1, this.curveType = r || "centripetal", this.tension = i || .5
        }

        function d(e, t, r, a, i) {
            var n = .5 * (a - t), o = .5 * (i - r), s = e * e;
            return (2 * r - 2 * a + n + o) * (e * s) + (-3 * r + 3 * a - 2 * n - o) * s + n * e + r
        }

        function c(e, t) {
            var r = 1 - e;
            return r * r * t
        }

        function p(e, t) {
            return 2 * (1 - e) * e * t
        }

        function u(e, t) {
            return e * e * t
        }

        function m(e, t, r, a) {
            return c(e, t) + p(e, r) + u(e, a)
        }

        function g(e, t) {
            var r = 1 - e;
            return r * r * r * t
        }

        function f(e, t) {
            var r = 1 - e;
            return 3 * r * r * e * t
        }

        function h(e, t) {
            return 3 * (1 - e) * e * e * t
        }

        function v(e, t) {
            return e * e * e * t
        }

        function x(e, t, r, a, i) {
            return g(e, t) + f(e, r) + h(e, a) + v(e, i)
        }

        function y(e, t, r, i) {
            a.call(this), this.type = "CubicBezierCurve", this.v0 = e || new W.a, this.v1 = t || new W.a, this.v2 = r || new W.a, this.v3 = i || new W.a
        }

        function _(e, t, r, i) {
            a.call(this), this.type = "CubicBezierCurve3", this.v0 = e || new X.a, this.v1 = t || new X.a, this.v2 = r || new X.a, this.v3 = i || new X.a
        }

        function b(e, t) {
            a.call(this), this.type = "LineCurve3", this.v1 = e || new X.a, this.v2 = t || new X.a
        }

        function M(e, t, r) {
            a.call(this), this.type = "QuadraticBezierCurve", this.v0 = e || new W.a, this.v1 = t || new W.a, this.v2 = r || new W.a
        }

        function S(e, t, r) {
            a.call(this), this.type = "QuadraticBezierCurve3", this.v0 = e || new X.a, this.v1 = t || new X.a, this.v2 = r || new X.a
        }

        function L(e) {
            a.call(this), this.type = "SplineCurve", this.points = e || []
        }

        function E() {
            a.call(this), this.type = "CurvePath", this.curves = [], this.autoClose = !1
        }

        function T(e) {
            E.call(this), this.type = "Path", this.currentPoint = new W.a, e && this.setFromPoints(e)
        }

        function w(e) {
            T.call(this, e), this.uuid = q.a.generateUUID(), this.type = "Shape", this.holes = []
        }

        function P() {
            this.type = "ShapePath", this.color = new k.a, this.subPaths = [], this.currentPath = null
        }

        function C(e) {
            this.type = "Font", this.data = e
        }

        function A(e, t, r) {
            for (var a = Array.from ? Array.from(e) : (e + "").split(""), n = t / r.resolution, o = (r.boundingBox.yMax - r.boundingBox.yMin + r.underlineThickness) * n, s = [], l = 0, d = 0, c = 0, i; c < a.length; c++) if (i = a[c], "\n" === i) l = 0, d -= o; else {
                var p = D(i, n, l, d, r);
                l += p.offsetX, s.push(p.path)
            }
            return s
        }

        function D(e, t, r, a, n) {
            var o = n.glyphs[e] || n.glyphs["?"];
            if (o) {
                var s = new P, d, c, p, u, m, g, f, h;
                if (o.o) for (var v = o._cachedOutline || (o._cachedOutline = o.o.split(" ")), x = 0, i = v.length, l; x < i;) l = v[x++], "m" === l ? (d = v[x++] * t + r, c = v[x++] * t + a, s.moveTo(d, c)) : "l" === l ? (d = v[x++] * t + r, c = v[x++] * t + a, s.lineTo(d, c)) : "q" === l ? (p = v[x++] * t + r, u = v[x++] * t + a, m = v[x++] * t + r, g = v[x++] * t + a, s.quadraticCurveTo(m, g, p, u)) : "b" === l ? (p = v[x++] * t + r, u = v[x++] * t + a, m = v[x++] * t + r, g = v[x++] * t + a, f = v[x++] * t + r, h = v[x++] * t + a, s.bezierCurveTo(m, g, f, h, p, u)) : void 0;
                return {offsetX: o.ha * t, path: s}
            }
        }

        function R(e) {
            this.manager = void 0 === e ? ee.a : e
        }

        function N(e) {
            this.manager = void 0 === e ? ee.a : e
        }

        var I = Math.pow, z = Number.EPSILON, U = Math.floor, F = Math.PI, G = Math.acos, O = Math.sin, B = Math.cos,
            V = Math.abs, H = {};
        r.r(H), r.d(H, "ArcCurve", function () {
            return o
        }), r.d(H, "CatmullRomCurve3", function () {
            return l
        }), r.d(H, "CubicBezierCurve", function () {
            return y
        }), r.d(H, "CubicBezierCurve3", function () {
            return _
        }), r.d(H, "EllipseCurve", function () {
            return n
        }), r.d(H, "LineCurve", function () {
            return i
        }), r.d(H, "LineCurve3", function () {
            return b
        }), r.d(H, "QuadraticBezierCurve", function () {
            return M
        }), r.d(H, "QuadraticBezierCurve3", function () {
            return S
        }), r.d(H, "SplineCurve", function () {
            return L
        });
        var k = r("cuij"), W = r("TnI4"), q = r("MnML"), X = r("w+kJ"), j = r("3+m9");
        Object.assign(a.prototype, {
            getPoint: function () {
                return console.warn("THREE.Curve: .getPoint() not implemented."), null
            }, getPointAt: function (e, r) {
                var a = this.getUtoTmapping(e);
                return this.getPoint(a, r)
            }, getPoints: function (e) {
                void 0 === e && (e = 5);
                for (var t = [], r = 0; r <= e; r++) t.push(this.getPoint(r / e));
                return t
            }, getSpacedPoints: function (e) {
                void 0 === e && (e = 5);
                for (var t = [], r = 0; r <= e; r++) t.push(this.getPointAt(r / e));
                return t
            }, getLength: function () {
                var e = this.getLengths();
                return e[e.length - 1]
            }, getLengths: function (e) {
                if (void 0 === e && (e = this.arcLengthDivisions), this.cacheArcLengths && this.cacheArcLengths.length === e + 1 && !this.needsUpdate) return this.cacheArcLengths;
                this.needsUpdate = !1;
                var t = [], r = this.getPoint(0), a = 0, i, n;
                for (t.push(0), n = 1; n <= e; n++) i = this.getPoint(n / e), a += i.distanceTo(r), t.push(a), r = i;
                return this.cacheArcLengths = t, t
            }, updateArcLengths: function () {
                this.needsUpdate = !0, this.getLengths()
            }, getUtoTmapping: function (e, r) {
                var a = this.getLengths(), n = 0, i = a.length, o;
                o = r ? r : e * a[i - 1];
                for (var s = 0, l = i - 1, d; s <= l;) if (n = U(s + (l - s) / 2), d = a[n] - o, 0 > d) s = n + 1; else if (0 < d) l = n - 1; else {
                    l = n;
                    break
                }
                if (n = l, a[n] === o) return n / (i - 1);
                var c = a[n], p = a[n + 1], u = (o - c) / (p - c), m = (n + u) / (i - 1);
                return m
            }, getTangent: function (e) {
                var t = 1e-4, r = e - t, a = e + t;
                0 > r && (r = 0), 1 < a && (a = 1);
                var i = this.getPoint(r), n = this.getPoint(a), o = n.clone().sub(i);
                return o.normalize()
            }, getTangentAt: function (e) {
                var r = this.getUtoTmapping(e);
                return this.getTangent(r)
            }, computeFrenetFrames: function (e, t) {
                var r = new X.a, a = [], n = [], o = [], s = new X.a, l = new j.a, d, i, c;
                for (d = 0; d <= e; d++) i = d / e, a[d] = this.getTangentAt(i), a[d].normalize();
                n[0] = new X.a, o[0] = new X.a;
                var p = Number.MAX_VALUE, u = V(a[0].x), m = V(a[0].y), g = V(a[0].z);
                for (u <= p && (p = u, r.set(1, 0, 0)), m <= p && (p = m, r.set(0, 1, 0)), g <= p && r.set(0, 0, 1), s.crossVectors(a[0], r).normalize(), n[0].crossVectors(a[0], s), o[0].crossVectors(a[0], n[0]), d = 1; d <= e; d++) n[d] = n[d - 1].clone(), o[d] = o[d - 1].clone(), s.crossVectors(a[d - 1], a[d]), s.length() > z && (s.normalize(), c = G(q.a.clamp(a[d - 1].dot(a[d]), -1, 1)), n[d].applyMatrix4(l.makeRotationAxis(s, c))), o[d].crossVectors(a[d], n[d]);
                if (!0 === t) for (c = G(q.a.clamp(n[0].dot(n[e]), -1, 1)), c /= e, 0 < a[0].dot(s.crossVectors(n[0], n[e])) && (c = -c), d = 1; d <= e; d++) n[d].applyMatrix4(l.makeRotationAxis(a[d], c * d)), o[d].crossVectors(a[d], n[d]);
                return {tangents: a, normals: n, binormals: o}
            }, clone: function () {
                return new this.constructor().copy(this)
            }, copy: function (e) {
                return this.arcLengthDivisions = e.arcLengthDivisions, this
            }, toJSON: function () {
                var e = {
                    metadata: {version: 4.5, type: "Curve", generator: "Curve.toJSON"},
                    arcLengthDivisions: this.arcLengthDivisions,
                    type: this.type
                };
                return e
            }, fromJSON: function (e) {
                return this.arcLengthDivisions = e.arcLengthDivisions, this
            }
        }), i.prototype = Object.create(a.prototype), i.prototype.constructor = i, i.prototype.isLineCurve = !0, i.prototype.getPoint = function (e, t) {
            var r = t || new W.a;
            return 1 === e ? r.copy(this.v2) : (r.copy(this.v2).sub(this.v1), r.multiplyScalar(e).add(this.v1)), r
        }, i.prototype.getPointAt = function (e, t) {
            return this.getPoint(e, t)
        }, i.prototype.getTangent = function () {
            var e = this.v2.clone().sub(this.v1);
            return e.normalize()
        }, i.prototype.copy = function (e) {
            return a.prototype.copy.call(this, e), this.v1.copy(e.v1), this.v2.copy(e.v2), this
        }, i.prototype.toJSON = function () {
            var e = a.prototype.toJSON.call(this);
            return e.v1 = this.v1.toArray(), e.v2 = this.v2.toArray(), e
        }, i.prototype.fromJSON = function (e) {
            return a.prototype.fromJSON.call(this, e), this.v1.fromArray(e.v1), this.v2.fromArray(e.v2), this
        }, n.prototype = Object.create(a.prototype), n.prototype.constructor = n, n.prototype.isEllipseCurve = !0, n.prototype.getPoint = function (e, t) {
            for (var r = t || new W.a, a = 2 * F, i = this.aEndAngle - this.aStartAngle, n = V(i) < z; 0 > i;) i += a;
            for (; i > a;) i -= a;
            i < z && (n ? i = 0 : i = a), !0 !== this.aClockwise || n || (i === a ? i = -a : i -= a);
            var o = this.aStartAngle + e * i, s = this.aX + this.xRadius * B(o), l = this.aY + this.yRadius * O(o);
            if (0 !== this.aRotation) {
                var d = B(this.aRotation), c = O(this.aRotation), p = s - this.aX, u = l - this.aY;
                s = p * d - u * c + this.aX, l = p * c + u * d + this.aY
            }
            return r.set(s, l)
        }, n.prototype.copy = function (e) {
            return a.prototype.copy.call(this, e), this.aX = e.aX, this.aY = e.aY, this.xRadius = e.xRadius, this.yRadius = e.yRadius, this.aStartAngle = e.aStartAngle, this.aEndAngle = e.aEndAngle, this.aClockwise = e.aClockwise, this.aRotation = e.aRotation, this
        }, n.prototype.toJSON = function () {
            var e = a.prototype.toJSON.call(this);
            return e.aX = this.aX, e.aY = this.aY, e.xRadius = this.xRadius, e.yRadius = this.yRadius, e.aStartAngle = this.aStartAngle, e.aEndAngle = this.aEndAngle, e.aClockwise = this.aClockwise, e.aRotation = this.aRotation, e
        }, n.prototype.fromJSON = function (e) {
            return a.prototype.fromJSON.call(this, e), this.aX = e.aX, this.aY = e.aY, this.xRadius = e.xRadius, this.yRadius = e.yRadius, this.aStartAngle = e.aStartAngle, this.aEndAngle = e.aEndAngle, this.aClockwise = e.aClockwise, this.aRotation = e.aRotation, this
        }, o.prototype = Object.create(n.prototype), o.prototype.constructor = o, o.prototype.isArcCurve = !0;
        var Y = new X.a, J = new s, Z = new s, Q = new s;
        l.prototype = Object.create(a.prototype), l.prototype.constructor = l, l.prototype.isCatmullRomCurve3 = !0, l.prototype.getPoint = function (e, t) {
            var r = t || new X.a, a = this.points, i = a.length, n = (i - (this.closed ? 0 : 1)) * e, o = U(n),
                s = n - o;
            this.closed ? o += 0 < o ? 0 : (U(V(o) / i) + 1) * i : 0 == s && o === i - 1 && (o = i - 2, s = 1);
            var l, d, c, p;
            if (this.closed || 0 < o ? l = a[(o - 1) % i] : (Y.subVectors(a[0], a[1]).add(a[0]), l = Y), d = a[o % i], c = a[(o + 1) % i], this.closed || o + 2 < i ? p = a[(o + 2) % i] : (Y.subVectors(a[i - 1], a[i - 2]).add(a[i - 1]), p = Y), "centripetal" === this.curveType || "chordal" === this.curveType) {
                var u = "chordal" === this.curveType ? .5 : .25, m = I(l.distanceToSquared(d), u),
                    g = I(d.distanceToSquared(c), u), f = I(c.distanceToSquared(p), u);
                1e-4 > g && (g = 1), 1e-4 > m && (m = g), 1e-4 > f && (f = g), J.initNonuniformCatmullRom(l.x, d.x, c.x, p.x, m, g, f), Z.initNonuniformCatmullRom(l.y, d.y, c.y, p.y, m, g, f), Q.initNonuniformCatmullRom(l.z, d.z, c.z, p.z, m, g, f)
            } else "catmullrom" === this.curveType && (J.initCatmullRom(l.x, d.x, c.x, p.x, this.tension), Z.initCatmullRom(l.y, d.y, c.y, p.y, this.tension), Q.initCatmullRom(l.z, d.z, c.z, p.z, this.tension));
            return r.set(J.calc(s), Z.calc(s), Q.calc(s)), r
        }, l.prototype.copy = function (e) {
            a.prototype.copy.call(this, e), this.points = [];
            for (var t = 0, r = e.points.length, i; t < r; t++) i = e.points[t], this.points.push(i.clone());
            return this.closed = e.closed, this.curveType = e.curveType, this.tension = e.tension, this
        }, l.prototype.toJSON = function () {
            var e = a.prototype.toJSON.call(this);
            e.points = [];
            for (var t = 0, r = this.points.length, i; t < r; t++) i = this.points[t], e.points.push(i.toArray());
            return e.closed = this.closed, e.curveType = this.curveType, e.tension = this.tension, e
        }, l.prototype.fromJSON = function (e) {
            a.prototype.fromJSON.call(this, e), this.points = [];
            for (var t = 0, r = e.points.length, i; t < r; t++) i = e.points[t], this.points.push(new X.a().fromArray(i));
            return this.closed = e.closed, this.curveType = e.curveType, this.tension = e.tension, this
        }, y.prototype = Object.create(a.prototype), y.prototype.constructor = y, y.prototype.isCubicBezierCurve = !0, y.prototype.getPoint = function (e, t) {
            var r = t || new W.a, a = this.v0, i = this.v1, n = this.v2, o = this.v3;
            return r.set(x(e, a.x, i.x, n.x, o.x), x(e, a.y, i.y, n.y, o.y)), r
        }, y.prototype.copy = function (e) {
            return a.prototype.copy.call(this, e), this.v0.copy(e.v0), this.v1.copy(e.v1), this.v2.copy(e.v2), this.v3.copy(e.v3), this
        }, y.prototype.toJSON = function () {
            var e = a.prototype.toJSON.call(this);
            return e.v0 = this.v0.toArray(), e.v1 = this.v1.toArray(), e.v2 = this.v2.toArray(), e.v3 = this.v3.toArray(), e
        }, y.prototype.fromJSON = function (e) {
            return a.prototype.fromJSON.call(this, e), this.v0.fromArray(e.v0), this.v1.fromArray(e.v1), this.v2.fromArray(e.v2), this.v3.fromArray(e.v3), this
        }, _.prototype = Object.create(a.prototype), _.prototype.constructor = _, _.prototype.isCubicBezierCurve3 = !0, _.prototype.getPoint = function (e, t) {
            var r = t || new X.a, a = this.v0, i = this.v1, n = this.v2, o = this.v3;
            return r.set(x(e, a.x, i.x, n.x, o.x), x(e, a.y, i.y, n.y, o.y), x(e, a.z, i.z, n.z, o.z)), r
        }, _.prototype.copy = function (e) {
            return a.prototype.copy.call(this, e), this.v0.copy(e.v0), this.v1.copy(e.v1), this.v2.copy(e.v2), this.v3.copy(e.v3), this
        }, _.prototype.toJSON = function () {
            var e = a.prototype.toJSON.call(this);
            return e.v0 = this.v0.toArray(), e.v1 = this.v1.toArray(), e.v2 = this.v2.toArray(), e.v3 = this.v3.toArray(), e
        }, _.prototype.fromJSON = function (e) {
            return a.prototype.fromJSON.call(this, e), this.v0.fromArray(e.v0), this.v1.fromArray(e.v1), this.v2.fromArray(e.v2), this.v3.fromArray(e.v3), this
        }, b.prototype = Object.create(a.prototype), b.prototype.constructor = b, b.prototype.isLineCurve3 = !0, b.prototype.getPoint = function (e, t) {
            var r = t || new X.a;
            return 1 === e ? r.copy(this.v2) : (r.copy(this.v2).sub(this.v1), r.multiplyScalar(e).add(this.v1)), r
        }, b.prototype.getPointAt = function (e, t) {
            return this.getPoint(e, t)
        }, b.prototype.copy = function (e) {
            return a.prototype.copy.call(this, e), this.v1.copy(e.v1), this.v2.copy(e.v2), this
        }, b.prototype.toJSON = function () {
            var e = a.prototype.toJSON.call(this);
            return e.v1 = this.v1.toArray(), e.v2 = this.v2.toArray(), e
        }, b.prototype.fromJSON = function (e) {
            return a.prototype.fromJSON.call(this, e), this.v1.fromArray(e.v1), this.v2.fromArray(e.v2), this
        }, M.prototype = Object.create(a.prototype), M.prototype.constructor = M, M.prototype.isQuadraticBezierCurve = !0, M.prototype.getPoint = function (e, t) {
            var r = t || new W.a, a = this.v0, i = this.v1, n = this.v2;
            return r.set(m(e, a.x, i.x, n.x), m(e, a.y, i.y, n.y)), r
        }, M.prototype.copy = function (e) {
            return a.prototype.copy.call(this, e), this.v0.copy(e.v0), this.v1.copy(e.v1), this.v2.copy(e.v2), this
        }, M.prototype.toJSON = function () {
            var e = a.prototype.toJSON.call(this);
            return e.v0 = this.v0.toArray(), e.v1 = this.v1.toArray(), e.v2 = this.v2.toArray(), e
        }, M.prototype.fromJSON = function (e) {
            return a.prototype.fromJSON.call(this, e), this.v0.fromArray(e.v0), this.v1.fromArray(e.v1), this.v2.fromArray(e.v2), this
        }, S.prototype = Object.create(a.prototype), S.prototype.constructor = S, S.prototype.isQuadraticBezierCurve3 = !0, S.prototype.getPoint = function (e, t) {
            var r = t || new X.a, a = this.v0, i = this.v1, n = this.v2;
            return r.set(m(e, a.x, i.x, n.x), m(e, a.y, i.y, n.y), m(e, a.z, i.z, n.z)), r
        }, S.prototype.copy = function (e) {
            return a.prototype.copy.call(this, e), this.v0.copy(e.v0), this.v1.copy(e.v1), this.v2.copy(e.v2), this
        }, S.prototype.toJSON = function () {
            var e = a.prototype.toJSON.call(this);
            return e.v0 = this.v0.toArray(), e.v1 = this.v1.toArray(), e.v2 = this.v2.toArray(), e
        }, S.prototype.fromJSON = function (e) {
            return a.prototype.fromJSON.call(this, e), this.v0.fromArray(e.v0), this.v1.fromArray(e.v1), this.v2.fromArray(e.v2), this
        }, L.prototype = Object.create(a.prototype), L.prototype.constructor = L, L.prototype.isSplineCurve = !0, L.prototype.getPoint = function (e, t) {
            var r = t || new W.a, a = this.points, i = (a.length - 1) * e, n = U(i), o = i - n,
                s = a[0 === n ? n : n - 1], l = a[n], c = a[n > a.length - 2 ? a.length - 1 : n + 1],
                p = a[n > a.length - 3 ? a.length - 1 : n + 2];
            return r.set(d(o, s.x, l.x, c.x, p.x), d(o, s.y, l.y, c.y, p.y)), r
        }, L.prototype.copy = function (e) {
            a.prototype.copy.call(this, e), this.points = [];
            for (var t = 0, r = e.points.length, i; t < r; t++) i = e.points[t], this.points.push(i.clone());
            return this
        }, L.prototype.toJSON = function () {
            var e = a.prototype.toJSON.call(this);
            e.points = [];
            for (var t = 0, r = this.points.length, i; t < r; t++) i = this.points[t], e.points.push(i.toArray());
            return e
        }, L.prototype.fromJSON = function (e) {
            a.prototype.fromJSON.call(this, e), this.points = [];
            for (var t = 0, r = e.points.length, i; t < r; t++) i = e.points[t], this.points.push(new W.a().fromArray(i));
            return this
        }, E.prototype = Object.assign(Object.create(a.prototype), {
            constructor: E, add: function (e) {
                this.curves.push(e)
            }, closePath: function () {
                var e = this.curves[0].getPoint(0), t = this.curves[this.curves.length - 1].getPoint(1);
                e.equals(t) || this.curves.push(new i(t, e))
            }, getPoint: function (e) {
                for (var t = e * this.getLength(), r = this.getCurveLengths(), a = 0; a < r.length;) {
                    if (r[a] >= t) {
                        var i = r[a] - t, n = this.curves[a], o = n.getLength(), s = 0 === o ? 0 : 1 - i / o;
                        return n.getPointAt(s)
                    }
                    a++
                }
                return null
            }, getLength: function () {
                var e = this.getCurveLengths();
                return e[e.length - 1]
            }, updateArcLengths: function () {
                this.needsUpdate = !0, this.cacheLengths = null, this.getCurveLengths()
            }, getCurveLengths: function () {
                if (this.cacheLengths && this.cacheLengths.length === this.curves.length) return this.cacheLengths;
                for (var e = [], t = 0, r = 0, a = this.curves.length; r < a; r++) t += this.curves[r].getLength(), e.push(t);
                return this.cacheLengths = e, e
            }, getSpacedPoints: function (e) {
                void 0 === e && (e = 40);
                for (var t = [], r = 0; r <= e; r++) t.push(this.getPoint(r / e));
                return this.autoClose && t.push(t[0]), t
            }, getPoints: function (e) {
                e = e || 12;
                for (var t = [], r = 0, a = this.curves, i; r < a.length; r++) for (var n = a[r], o = n && n.isEllipseCurve ? 2 * e : n && (n.isLineCurve || n.isLineCurve3) ? 1 : n && n.isSplineCurve ? e * n.points.length : e, s = n.getPoints(o), l = 0, d; l < s.length; l++) d = s[l], i && i.equals(d) || (t.push(d), i = d);
                return this.autoClose && 1 < t.length && !t[t.length - 1].equals(t[0]) && t.push(t[0]), t
            }, copy: function (e) {
                a.prototype.copy.call(this, e), this.curves = [];
                for (var t = 0, r = e.curves.length, i; t < r; t++) i = e.curves[t], this.curves.push(i.clone());
                return this.autoClose = e.autoClose, this
            }, toJSON: function () {
                var e = a.prototype.toJSON.call(this);
                e.autoClose = this.autoClose, e.curves = [];
                for (var t = 0, r = this.curves.length, i; t < r; t++) i = this.curves[t], e.curves.push(i.toJSON());
                return e
            }, fromJSON: function (e) {
                a.prototype.fromJSON.call(this, e), this.autoClose = e.autoClose, this.curves = [];
                for (var t = 0, r = e.curves.length, i; t < r; t++) i = e.curves[t], this.curves.push(new H[i.type]().fromJSON(i));
                return this
            }
        }), T.prototype = Object.assign(Object.create(E.prototype), {
            constructor: T, setFromPoints: function (e) {
                this.moveTo(e[0].x, e[0].y);
                for (var t = 1, r = e.length; t < r; t++) this.lineTo(e[t].x, e[t].y)
            }, moveTo: function (e, t) {
                this.currentPoint.set(e, t)
            }, lineTo: function (e, t) {
                var r = new i(this.currentPoint.clone(), new W.a(e, t));
                this.curves.push(r), this.currentPoint.set(e, t)
            }, quadraticCurveTo: function (e, t, r, a) {
                var i = new M(this.currentPoint.clone(), new W.a(e, t), new W.a(r, a));
                this.curves.push(i), this.currentPoint.set(r, a)
            }, bezierCurveTo: function (e, t, r, a, i, n) {
                var o = new y(this.currentPoint.clone(), new W.a(e, t), new W.a(r, a), new W.a(i, n));
                this.curves.push(o), this.currentPoint.set(i, n)
            }, splineThru: function (e) {
                var t = [this.currentPoint.clone()].concat(e), r = new L(t);
                this.curves.push(r), this.currentPoint.copy(e[e.length - 1])
            }, arc: function (e, t, r, a, i, n) {
                var o = this.currentPoint.x, s = this.currentPoint.y;
                this.absarc(e + o, t + s, r, a, i, n)
            }, absarc: function (e, t, r, a, i, n) {
                this.absellipse(e, t, r, r, a, i, n)
            }, ellipse: function (e, t, r, a, i, n, o, s) {
                var l = this.currentPoint.x, d = this.currentPoint.y;
                this.absellipse(e + l, t + d, r, a, i, n, o, s)
            }, absellipse: function (e, t, r, a, i, o, s, l) {
                var d = new n(e, t, r, a, i, o, s, l);
                if (0 < this.curves.length) {
                    var c = d.getPoint(0);
                    c.equals(this.currentPoint) || this.lineTo(c.x, c.y)
                }
                this.curves.push(d);
                var p = d.getPoint(1);
                this.currentPoint.copy(p)
            }, copy: function (e) {
                return E.prototype.copy.call(this, e), this.currentPoint.copy(e.currentPoint), this
            }, toJSON: function () {
                var e = E.prototype.toJSON.call(this);
                return e.currentPoint = this.currentPoint.toArray(), e
            }, fromJSON: function (e) {
                return E.prototype.fromJSON.call(this, e), this.currentPoint.fromArray(e.currentPoint), this
            }
        }), w.prototype = Object.assign(Object.create(T.prototype), {
            constructor: w, getPointsHoles: function (e) {
                for (var t = [], r = 0, a = this.holes.length; r < a; r++) t[r] = this.holes[r].getPoints(e);
                return t
            }, extractPoints: function (e) {
                return {shape: this.getPoints(e), holes: this.getPointsHoles(e)}
            }, copy: function (e) {
                T.prototype.copy.call(this, e), this.holes = [];
                for (var t = 0, r = e.holes.length, a; t < r; t++) a = e.holes[t], this.holes.push(a.clone());
                return this
            }, toJSON: function () {
                var e = T.prototype.toJSON.call(this);
                e.uuid = this.uuid, e.holes = [];
                for (var t = 0, r = this.holes.length, a; t < r; t++) a = this.holes[t], e.holes.push(a.toJSON());
                return e
            }, fromJSON: function (e) {
                T.prototype.fromJSON.call(this, e), this.uuid = e.uuid, this.holes = [];
                for (var t = 0, r = e.holes.length, a; t < r; t++) a = e.holes[t], this.holes.push(new T().fromJSON(a));
                return this
            }
        });
        var K = r("IJRe");
        Object.assign(P.prototype, {
            moveTo: function (e, t) {
                this.currentPath = new T, this.subPaths.push(this.currentPath), this.currentPath.moveTo(e, t)
            }, lineTo: function (e, t) {
                this.currentPath.lineTo(e, t)
            }, quadraticCurveTo: function (e, t, r, a) {
                this.currentPath.quadraticCurveTo(e, t, r, a)
            }, bezierCurveTo: function (e, t, r, a, i, n) {
                this.currentPath.bezierCurveTo(e, t, r, a, i, n)
            }, splineThru: function (e) {
                this.currentPath.splineThru(e)
            }, toShapes: function (e, t) {
                function r(e) {
                    for (var t = [], r = 0, a = e.length; r < a; r++) {
                        var i = e[r], n = new w;
                        n.curves = i.curves, t.push(n)
                    }
                    return t
                }

                function a(e, t) {
                    for (var r = t.length, a = !1, i = r - 1, n = 0; n < r; i = n++) {
                        var o = t[i], s = t[n], l = s.x - o.x, d = s.y - o.y;
                        if (V(d) > z) {
                            if (0 > d && (o = t[n], l = -l, s = t[i], d = -d), e.y < o.y || e.y > s.y) continue;
                            if (e.y !== o.y) {
                                var c = d * (e.x - o.x) - l * (e.y - o.y);
                                if (0 == c) return !0;
                                if (0 > c) continue;
                                a = !a
                            } else if (e.x === o.x) return !0
                        } else {
                            if (e.y !== o.y) continue;
                            if (s.x <= e.x && e.x <= o.x || o.x <= e.x && e.x <= s.x) return !0
                        }
                    }
                    return a
                }

                var n = K.a.isClockWise, o = this.subPaths;
                if (0 === o.length) return [];
                if (!0 === t) return r(o);
                var s = [], d, c, p;
                if (1 === o.length) return c = o[0], p = new w, p.curves = c.curves, s.push(p), s;
                var u = !n(o[0].getPoints());
                u = e ? !u : u;
                var m = [], g = [], f = [], h = 0, v;
                g[h] = void 0, f[h] = [];
                for (var x = 0, i = o.length; x < i; x++) c = o[x], v = c.getPoints(), d = n(v), d = e ? !d : d, d ? (!u && g[h] && h++, g[h] = {
                    s: new w,
                    p: v
                }, g[h].s.curves = c.curves, u && h++, f[h] = []) : f[h].push({h: c, p: v[0]});
                if (!g[0]) return r(o);
                if (1 < g.length) {
                    for (var l = !1, y = [], _ = 0, b = g.length; _ < b; _++) m[_] = [];
                    for (var _ = 0, b = g.length, M; _ < b; _++) {
                        M = f[_];
                        for (var S = 0; S < M.length; S++) {
                            for (var L = M[S], E = !0, T = 0; T < g.length; T++) a(L.p, g[T].p) && (_ !== T && y.push({
                                froms: _,
                                tos: T,
                                hole: S
                            }), E ? (E = !1, m[T].push(L)) : l = !0);
                            E && m[_].push(L)
                        }
                    }
                    0 < y.length && !l && (f = m)
                }
                for (var x = 0, P = g.length, C; x < P; x++) {
                    p = g[x].s, s.push(p), C = f[x];
                    for (var A = 0, D = C.length; A < D; A++) p.holes.push(C[A].h)
                }
                return s
            }
        }), Object.assign(C.prototype, {
            isFont: !0, generateShapes: function (e, t) {
                void 0 === t && (t = 100);
                for (var r = [], a = A(e, t, this.data), i = 0, n = a.length; i < n; i++) Array.prototype.push.apply(r, a[i].toShapes());
                return r
            }
        });
        var $ = r("hwoJ"), ee = r("2N3e"), te = {};
        Object.assign(R.prototype, {
            load: function (e, t, r, a) {
                void 0 === e && (e = ""), void 0 !== this.path && (e = this.path + e), e = this.manager.resolveURL(e);
                var n = this, o = $.a.get(e);
                if (void 0 !== o) return n.manager.itemStart(e), setTimeout(function () {
                    t && t(o), n.manager.itemEnd(e)
                }, 0), o;
                if (void 0 !== te[e]) return void te[e].push({onLoad: t, onProgress: r, onError: a});
                var s = /^data:(.*?)(;base64)?,(.*)$/, l = e.match(s);
                if (l) {
                    var d = l[1], c = !!l[2], p = l[3];
                    p = decodeURIComponent(p), c && (p = atob(p));
                    try {
                        var u = (this.responseType || "").toLowerCase(), m;
                        switch (u) {
                            case"arraybuffer":
                            case"blob":
                                for (var g = new Uint8Array(p.length), f = 0; f < p.length; f++) g[f] = p.charCodeAt(f);
                                m = "blob" === u ? new Blob([g.buffer], {type: d}) : g.buffer;
                                break;
                            case"document":
                                var i = new DOMParser;
                                m = i.parseFromString(p, d);
                                break;
                            case"json":
                                m = JSON.parse(p);
                                break;
                            default:
                                m = p;
                        }
                        setTimeout(function () {
                            t && t(m), n.manager.itemEnd(e)
                        }, 0)
                    } catch (t) {
                        setTimeout(function () {
                            a && a(t), n.manager.itemError(e), n.manager.itemEnd(e)
                        }, 0)
                    }
                } else {
                    te[e] = [], te[e].push({onLoad: t, onProgress: r, onError: a});
                    var h = new XMLHttpRequest;
                    for (var v in h.open("GET", e, !0), h.addEventListener("load", function (t) {
                        var r = this.response;
                        $.a.add(e, r);
                        var a = te[e];
                        if (delete te[e], 200 === this.status || 0 === this.status) {
                            0 === this.status && console.warn("THREE.FileLoader: HTTP Status 0 received.");
                            for (var o = 0, i = a.length, s; o < i; o++) s = a[o], s.onLoad && s.onLoad(r);
                            n.manager.itemEnd(e)
                        } else {
                            for (var o = 0, i = a.length, s; o < i; o++) s = a[o], s.onError && s.onError(t);
                            n.manager.itemError(e), n.manager.itemEnd(e)
                        }
                    }, !1), h.addEventListener("progress", function (t) {
                        for (var r = te[e], a = 0, i = r.length, n; a < i; a++) n = r[a], n.onProgress && n.onProgress(t)
                    }, !1), h.addEventListener("error", function (t) {
                        var r = te[e];
                        delete te[e];
                        for (var a = 0, i = r.length, o; a < i; a++) o = r[a], o.onError && o.onError(t);
                        n.manager.itemError(e), n.manager.itemEnd(e)
                    }, !1), h.addEventListener("abort", function (t) {
                        var r = te[e];
                        delete te[e];
                        for (var a = 0, i = r.length, o; a < i; a++) o = r[a], o.onError && o.onError(t);
                        n.manager.itemError(e), n.manager.itemEnd(e)
                    }, !1), void 0 !== this.responseType && (h.responseType = this.responseType), void 0 !== this.withCredentials && (h.withCredentials = this.withCredentials), h.overrideMimeType && h.overrideMimeType(void 0 === this.mimeType ? "text/plain" : this.mimeType), this.requestHeader) h.setRequestHeader(v, this.requestHeader[v]);
                    h.send(null)
                }
                return n.manager.itemStart(e), h
            }, setPath: function (e) {
                return this.path = e, this
            }, setResponseType: function (e) {
                return this.responseType = e, this
            }, setWithCredentials: function (e) {
                return this.withCredentials = e, this
            }, setMimeType: function (e) {
                return this.mimeType = e, this
            }, setRequestHeader: function (e) {
                return this.requestHeader = e, this
            }
        }), r.d(t, "a", function () {
            return N
        }), Object.assign(N.prototype, {
            load: function (e, t, r, a) {
                var i = this, n = new R(this.manager);
                n.setPath(this.path), n.load(e, function (e) {
                    var r;
                    try {
                        r = JSON.parse(e)
                    } catch (t) {
                        console.warn("THREE.FontLoader: typeface.js support is being deprecated. Use typeface.json instead."), r = JSON.parse(e.substring(65, e.length - 2))
                    }
                    var a = i.parse(r);
                    t && t(a)
                }, r, a)
            }, parse: function (e) {
                return new C(e)
            }, setPath: function (e) {
                return this.path = e, this
            }
        })
    }, GuLh: function (e, t, r) {
        "use strict";

        function a(e, t) {
            this.normal = void 0 === e ? new n.a(1, 0, 0) : e, this.constant = void 0 === t ? 0 : t
        }

        r.d(t, "a", function () {
            return a
        });
        var i = r("eu9D"), n = r("w+kJ");
        Object.assign(a.prototype, {
            set: function (e, t) {
                return this.normal.copy(e), this.constant = t, this
            }, setComponents: function (e, t, r, a) {
                return this.normal.set(e, t, r), this.constant = a, this
            }, setFromNormalAndCoplanarPoint: function (e, t) {
                return this.normal.copy(e), this.constant = -t.dot(this.normal), this
            }, setFromCoplanarPoints: function () {
                var e = new n.a, t = new n.a;
                return function (r, a, i) {
                    var n = e.subVectors(i, a).cross(t.subVectors(r, a)).normalize();
                    return this.setFromNormalAndCoplanarPoint(n, r), this
                }
            }(), clone: function () {
                return new this.constructor().copy(this)
            }, copy: function (e) {
                return this.normal.copy(e.normal), this.constant = e.constant, this
            }, normalize: function () {
                var e = 1 / this.normal.length();
                return this.normal.multiplyScalar(e), this.constant *= e, this
            }, negate: function () {
                return this.constant *= -1, this.normal.negate(), this
            }, distanceToPoint: function (e) {
                return this.normal.dot(e) + this.constant
            }, distanceToSphere: function (e) {
                return this.distanceToPoint(e.center) - e.radius
            }, projectPoint: function (e, t) {
                return void 0 === t && (console.warn("THREE.Plane: .projectPoint() target is now required"), t = new n.a), t.copy(this.normal).multiplyScalar(-this.distanceToPoint(e)).add(e)
            }, intersectLine: function () {
                var e = new n.a;
                return function (r, a) {
                    void 0 === a && (console.warn("THREE.Plane: .intersectLine() target is now required"), a = new n.a);
                    var i = r.delta(e), o = this.normal.dot(i);
                    if (0 === o) return 0 === this.distanceToPoint(r.start) ? a.copy(r.start) : void 0;
                    var s = -(r.start.dot(this.normal) + this.constant) / o;
                    return 0 > s || 1 < s ? void 0 : a.copy(i).multiplyScalar(s).add(r.start)
                }
            }(), intersectsLine: function (e) {
                var t = this.distanceToPoint(e.start), r = this.distanceToPoint(e.end);
                return 0 > t && 0 < r || 0 > r && 0 < t
            }, intersectsBox: function (e) {
                return e.intersectsPlane(this)
            }, intersectsSphere: function (e) {
                return e.intersectsPlane(this)
            }, coplanarPoint: function (e) {
                return void 0 === e && (console.warn("THREE.Plane: .coplanarPoint() target is now required"), e = new n.a), e.copy(this.normal).multiplyScalar(-this.constant)
            }, applyMatrix4: function () {
                var e = new n.a, t = new i.a;
                return function (r, a) {
                    var i = a || t.getNormalMatrix(r), n = this.coplanarPoint(e).applyMatrix4(r),
                        o = this.normal.applyMatrix3(i).normalize();
                    return this.constant = -n.dot(o), this
                }
            }(), translate: function (e) {
                return this.constant -= e.dot(this.normal), this
            }, equals: function (e) {
                return e.normal.equals(this.normal) && e.constant === this.constant
            }
        })
    }, IJRe: function (e, t, r) {
        "use strict";

        function a(e, t, r, a, n) {
            var o, i;
            if (n === 0 < A(e, t, r, a)) for (o = t; o < r; o += a) i = b(o, e[o], e[o + 1], i); else for (o = r - a; o >= t; o -= a) i = b(o, e[o], e[o + 1], i);
            return i && M(i, i.next) && (P(i), i = i.next), i
        }

        function n(e, t) {
            if (!e) return e;
            t || (t = e);
            var r = e, a;
            do if (a = !1, !r.steiner && (M(r, r.next) || 0 === _(r.prev, r, r.next))) {
                if (P(r), r = t = r.prev, r === r.next) break;
                a = !0
            } else r = r.next; while (a || r !== t);
            return t
        }

        function o(e, t, r, a, c, p, u) {
            if (e) {
                !u && p && g(e, a, c, p);
                for (var m = e, f, h; e.prev !== e.next;) {
                    if (f = e.prev, h = e.next, p ? s(e, a, c, p) : i(e)) {
                        t.push(f.i / r), t.push(e.i / r), t.push(h.i / r), P(e), e = h.next, m = h.next;
                        continue
                    }
                    if (e = h, e === m) {
                        u ? 1 === u ? (e = l(e, t, r), o(e, t, r, a, c, p, 2)) : 2 == u && d(e, t, r, a, c, p) : o(n(e), t, r, a, c, p, 1);
                        break
                    }
                }
            }
        }

        function i(e) {
            var t = e.prev, r = e, a = e.next;
            if (0 <= _(t, r, a)) return !1;
            for (var i = e.next.next; i !== e.prev;) {
                if (x(t.x, t.y, r.x, r.y, a.x, a.y, i.x, i.y) && 0 <= _(i.prev, i, i.next)) return !1;
                i = i.next
            }
            return !0
        }

        function s(e, t, r, i) {
            var n = e.prev, a = e, o = e.next;
            if (0 <= _(n, a, o)) return !1;
            for (var s = n.x < a.x ? n.x < o.x ? n.x : o.x : a.x < o.x ? a.x : o.x, l = n.y < a.y ? n.y < o.y ? n.y : o.y : a.y < o.y ? a.y : o.y, d = n.x > a.x ? n.x > o.x ? n.x : o.x : a.x > o.x ? a.x : o.x, c = n.y > a.y ? n.y > o.y ? n.y : o.y : a.y > o.y ? a.y : o.y, u = h(s, l, t, r, i), m = h(d, c, t, r, i), g = e.nextZ; g && g.z <= m;) {
                if (g !== e.prev && g !== e.next && x(n.x, n.y, a.x, a.y, o.x, o.y, g.x, g.y) && 0 <= _(g.prev, g, g.next)) return !1;
                g = g.nextZ
            }
            for (g = e.prevZ; g && g.z >= u;) {
                if (g !== e.prev && g !== e.next && x(n.x, n.y, a.x, a.y, o.x, o.y, g.x, g.y) && 0 <= _(g.prev, g, g.next)) return !1;
                g = g.prevZ
            }
            return !0
        }

        function l(e, t, r) {
            var i = e;
            do {
                var n = i.prev, a = i.next.next;
                !M(n, a) && S(n, i, i.next, a) && E(n, a) && E(a, n) && (t.push(n.i / r), t.push(i.i / r), t.push(a.i / r), P(i), P(i.next), i = e = a), i = i.next
            } while (i !== e);
            return i
        }

        function d(e, t, r, i, s, l) {
            var d = e;
            do {
                for (var a = d.next.next; a !== d.prev;) {
                    if (d.i !== a.i && y(d, a)) {
                        var p = w(d, a);
                        return d = n(d, d.next), p = n(p, p.next), o(d, t, r, i, s, l), void o(p, t, r, i, s, l)
                    }
                    a = a.next
                }
                d = d.next
            } while (d !== e)
        }

        function c(e, t, r, o) {
            var s = [], l, i, d, c, m;
            for (l = 0, i = t.length; l < i; l++) d = t[l] * o, c = l < i - 1 ? t[l + 1] * o : e.length, m = a(e, d, c, o, !1), m === m.next && (m.steiner = !0), s.push(v(m));
            for (s.sort(p), l = 0; l < s.length; l++) u(s[l], r), r = n(r, r.next);
            return r
        }

        function p(e, t) {
            return e.x - t.x
        }

        function u(e, t) {
            if (t = m(e, t), t) {
                var r = w(t, e);
                n(r, r.next)
            }
        }

        function m(e, t) {
            var r = t, a = e.x, i = e.y, n = -Infinity, o;
            do {
                if (i <= r.y && i >= r.next.y && r.next.y !== r.y) {
                    var s = r.x + (i - r.y) * (r.next.x - r.x) / (r.next.y - r.y);
                    if (s <= a && s > n) {
                        if (n = s, s === a) {
                            if (i === r.y) return r;
                            if (i === r.next.y) return r.next
                        }
                        o = r.x < r.next.x ? r : r.next
                    }
                }
                r = r.next
            } while (r !== t);
            if (!o) return null;
            if (a === n) return o.prev;
            var l = o, d = o.x, c = o.y, p = Infinity, u;
            for (r = o.next; r !== l;) a >= r.x && r.x >= d && a !== r.x && x(i < c ? a : n, i, d, c, i < c ? n : a, i, r.x, r.y) && (u = Math.abs(i - r.y) / (a - r.x), (u < p || u === p && r.x > o.x) && E(r, e) && (o = r, p = u)), r = r.next;
            return o
        }

        function g(e, t, r, a) {
            var i = e;
            do null === i.z && (i.z = h(i.x, i.y, t, r, a)), i.prevZ = i.prev, i.nextZ = i.next, i = i.next; while (i !== e);
            i.prevZ.nextZ = null, i.prevZ = null, f(i)
        }

        function f(t) {
            var r = 1, a, i, n, o, e, s, l, d;
            do {
                for (i = t, t = null, e = null, s = 0; i;) {
                    for (s++, n = i, l = 0, a = 0; a < r && (l++, n = n.nextZ, !!n); a++) ;
                    for (d = r; 0 < l || 0 < d && n;) 0 !== l && (0 === d || !n || i.z <= n.z) ? (o = i, i = i.nextZ, l--) : (o = n, n = n.nextZ, d--), e ? e.nextZ = o : t = o, o.prevZ = e, e = o;
                    i = n
                }
                e.nextZ = null, r *= 2
            } while (1 < s);
            return t
        }

        function h(e, t, r, a, i) {
            return e = 32767 * (e - r) * i, t = 32767 * (t - a) * i, e = 16711935 & (e | e << 8), e = 252645135 & (e | e << 4), e = 858993459 & (e | e << 2), e = 1431655765 & (e | e << 1), t = 16711935 & (t | t << 8), t = 252645135 & (t | t << 4), t = 858993459 & (t | t << 2), t = 1431655765 & (t | t << 1), e | t << 1
        }

        function v(e) {
            var t = e, r = e;
            do t.x < r.x && (r = t), t = t.next; while (t !== e);
            return r
        }

        function x(e, t, r, a, i, n, o, s) {
            return 0 <= (i - o) * (t - s) - (e - o) * (n - s) && 0 <= (e - o) * (a - s) - (r - o) * (t - s) && 0 <= (r - o) * (n - s) - (i - o) * (a - s)
        }

        function y(e, t) {
            return e.next.i !== t.i && e.prev.i !== t.i && !L(e, t) && E(e, t) && E(t, e) && T(e, t)
        }

        function _(e, t, a) {
            return (t.y - e.y) * (a.x - t.x) - (t.x - e.x) * (a.y - t.y)
        }

        function M(e, t) {
            return e.x === t.x && e.y === t.y
        }

        function S(e, t, r, a) {
            return !!(M(e, t) && M(r, a) || M(e, a) && M(r, t)) || 0 < _(e, t, r) != 0 < _(e, t, a) && 0 < _(r, a, e) != 0 < _(r, a, t)
        }

        function L(e, t) {
            var r = e;
            do {
                if (r.i !== e.i && r.next.i !== e.i && r.i !== t.i && r.next.i !== t.i && S(r, r.next, e, t)) return !0;
                r = r.next
            } while (r !== e);
            return !1
        }

        function E(e, t) {
            return 0 > _(e.prev, e, e.next) ? 0 <= _(e, t, e.next) && 0 <= _(e, e.prev, t) : 0 > _(e, t, e.prev) || 0 > _(e, e.next, t)
        }

        function T(e, t) {
            var r = e, a = !1, i = (e.x + t.x) / 2, n = (e.y + t.y) / 2;
            do r.y > n != r.next.y > n && r.next.y !== r.y && i < (r.next.x - r.x) * (n - r.y) / (r.next.y - r.y) + r.x && (a = !a), r = r.next; while (r !== e);
            return a
        }

        function w(e, t) {
            var r = new C(e.i, e.x, e.y), a = new C(t.i, t.x, t.y), i = e.next, n = t.prev;
            return e.next = t, t.prev = e, r.next = i, i.prev = r, a.next = r, r.prev = a, n.next = a, a.prev = n, a
        }

        function b(e, t, r, a) {
            var i = new C(e, t, r);
            return a ? (i.next = a.next, i.prev = a, a.next.prev = i, a.next = i) : (i.prev = i, i.next = i), i
        }

        function P(e) {
            e.next.prev = e.prev, e.prev.next = e.next, e.prevZ && (e.prevZ.nextZ = e.nextZ), e.nextZ && (e.nextZ.prevZ = e.prevZ)
        }

        function C(e, t, r) {
            this.i = e, this.x = t, this.y = r, this.prev = null, this.next = null, this.z = null, this.prevZ = null, this.nextZ = null, this.steiner = !1
        }

        function A(e, t, r, a) {
            for (var n = 0, o = t, i = r - a; o < r; o += a) n += (e[i] - e[o]) * (e[o + 1] + e[i + 1]), i = o;
            return n
        }

        function D(e) {
            var t = e.length;
            2 < t && e[t - 1].equals(e[0]) && e.pop()
        }

        function R(e, t) {
            for (var r = 0; r < t.length; r++) e.push(t[r].x), e.push(t[r].y)
        }

        var N = {
            triangulate: function (e, t, r) {
                r = r || 2;
                var n = t && t.length, s = n ? t[0] * r : e.length, l = a(e, 0, s, r, !0), d = [];
                if (!l) return d;
                var p, u, m, g, f, h, v;
                if (n && (l = c(e, t, l, r)), e.length > 80 * r) {
                    p = m = e[0], u = g = e[1];
                    for (var x = r; x < s; x += r) f = e[x], h = e[x + 1], f < p && (p = f), h < u && (u = h), f > m && (m = f), h > g && (g = h);
                    v = Math.max(m - p, g - u), v = 0 === v ? 0 : 1 / v
                }
                return o(l, d, r, p, u, v), d
            }
        };
        r.d(t, "a", function () {
            return I
        });
        var I = {
            area: function (e) {
                for (var t = e.length, r = 0, a = t - 1, i = 0; i < t; a = i++) r += e[a].x * e[i].y - e[i].x * e[a].y;
                return .5 * r
            }, isClockWise: function (e) {
                return 0 > I.area(e)
            }, triangulateShape: function (e, t) {
                var r = [], a = [], n = [];
                D(e), R(r, e);
                var o = e.length;
                t.forEach(D);
                for (var s = 0; s < t.length; s++) a.push(o), o += t[s].length, R(r, t[s]);
                for (var i = N.triangulate(r, a), s = 0; s < i.length; s += 3) n.push(i.slice(s, s + 3));
                return n
            }
        }
    }, IT9u: function (e, t, r) {
        "use strict";

        function a(e, t, r, a, i, n, o, s, l, d, c, p) {
            Je.a.call(this, null, n, o, s, l, d, a, i, c, p), this.image = {
                data: e,
                width: t,
                height: r
            }, this.magFilter = void 0 === l ? je.Y : l, this.minFilter = void 0 === d ? je.Y : d, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1
        }

        function i() {
            function e(i, n) {
                !1 === r || (a(i, n), t.requestAnimationFrame(e))
            }

            var t = null, r = !1, a = null;
            return {
                start: function () {
                    !0 == r || null === a || (t.requestAnimationFrame(e), r = !0)
                }, stop: function () {
                    r = !1
                }, setAnimationLoop: function (e) {
                    a = e
                }, setContext: function (e) {
                    t = e
                }
            }
        }

        function n(e) {
            function t(t, r) {
                var a = t.array, i = t.dynamic ? 35048 : 35044, n = e.createBuffer();
                e.bindBuffer(r, n), e.bufferData(r, a, i), t.onUploadCallback();
                var o = 5126;
                return a instanceof Float32Array ? o = 5126 : a instanceof Float64Array ? console.warn("THREE.WebGLAttributes: Unsupported data buffer format: Float64Array.") : a instanceof Uint16Array ? o = 5123 : a instanceof Int16Array ? o = 5122 : a instanceof Uint32Array ? o = 5125 : a instanceof Int32Array ? o = 5124 : a instanceof Int8Array ? o = 5120 : a instanceof Uint8Array && (o = 5121), {
                    buffer: n,
                    type: o,
                    bytesPerElement: a.BYTES_PER_ELEMENT,
                    version: t.version
                }
            }

            function r(t, r, a) {
                var i = r.array, n = r.updateRange;
                e.bindBuffer(a, t), !1 === r.dynamic ? e.bufferData(a, i, 35044) : -1 === n.count ? e.bufferSubData(a, 0, i) : 0 === n.count ? console.error("THREE.WebGLObjects.updateBuffer: dynamic THREE.BufferAttribute marked as needsUpdate but updateRange.count is 0, ensure you are using set methods or updating manually.") : (e.bufferSubData(a, n.offset * i.BYTES_PER_ELEMENT, i.subarray(n.offset, n.offset + n.count)), n.count = -1)
            }

            var a = new WeakMap;
            return {
                get: function (e) {
                    return e.isInterleavedBufferAttribute && (e = e.data), a.get(e)
                }, remove: function (t) {
                    t.isInterleavedBufferAttribute && (t = t.data);
                    var r = a.get(t);
                    r && (e.deleteBuffer(r.buffer), a.delete(t))
                }, update: function (e, i) {
                    e.isInterleavedBufferAttribute && (e = e.data);
                    var n = a.get(e);
                    void 0 === n ? a.set(e, t(e, i)) : n.version < e.version && (r(n.buffer, e, i), n.version = e.version)
                }
            }
        }

        function o(e, t, r, a, i, n) {
            st.a.call(this), this.type = "BoxGeometry", this.parameters = {
                width: e,
                height: t,
                depth: r,
                widthSegments: a,
                heightSegments: i,
                depthSegments: n
            }, this.fromBufferGeometry(new s(e, t, r, a, i, n)), this.mergeVertices()
        }

        function s(e, t, r, a, i, n) {
            function o(e, t, r, i, n, o, u, f, h, v, _) {
                var M = h + 1, S = 0, L = 0, E = new et.a, T, w;
                for (w = 0; w < v + 1; w++) {
                    var P = w * (u / v) - u / 2;
                    for (T = 0; T < M; T++) {
                        var y = T * (o / h) - o / 2;
                        E[e] = y * i, E[t] = P * n, E[r] = f / 2, d.push(E.x, E.y, E.z), E[e] = 0, E[t] = 0, E[r] = 0 < f ? 1 : -1, c.push(E.x, E.y, E.z), p.push(T / h), p.push(1 - w / v), S += 1
                    }
                }
                for (w = 0; w < v; w++) for (T = 0; T < h; T++) {
                    var x = m + T + M * w, a = m + T + M * (w + 1), b = m + (T + 1) + M * (w + 1),
                        C = m + (T + 1) + M * w;
                    l.push(x, a, C), l.push(a, b, C), L += 6
                }
                s.addGroup(g, L, _), g += L, m += S
            }

            lt.a.call(this), this.type = "BoxBufferGeometry", this.parameters = {
                width: e,
                height: t,
                depth: r,
                widthSegments: a,
                heightSegments: i,
                depthSegments: n
            };
            var s = this;
            e = e || 1, t = t || 1, r = r || 1, a = He(a) || 1, i = He(i) || 1, n = He(n) || 1;
            var l = [], d = [], c = [], p = [], m = 0, g = 0;
            o("z", "y", "x", -1, -1, r, t, e, n, i, 0), o("z", "y", "x", 1, -1, r, t, -e, n, i, 1), o("x", "z", "y", 1, 1, e, r, t, a, n, 2), o("x", "z", "y", 1, -1, e, r, -t, a, n, 3), o("x", "y", "z", 1, -1, e, t, r, a, i, 4), o("x", "y", "z", -1, -1, e, t, -r, a, i, 5), this.setIndex(l), this.addAttribute("position", new dt.b(d, 3)), this.addAttribute("normal", new dt.b(c, 3)), this.addAttribute("uv", new dt.b(p, 2))
        }

        function l(e, t, r, a) {
            function i(t, a, i, m) {
                var g = a.background;
                if (null === g ? (n(o, l), d = null, c = 0) : g && g.isColor && (n(g, 1), m = !0, d = null, c = 0), (e.autoClear || m) && e.clear(e.autoClearColor, e.autoClearDepth, e.autoClearStencil), g && (g.isCubeTexture || g.isWebGLRenderTargetCube)) {
                    void 0 === u && (u = new ut.a(new s(1, 1, 1), new pt.a({
                        type: "BackgroundCubeMaterial",
                        uniforms: Object($e.a)(nt.cube.uniforms),
                        vertexShader: nt.cube.vertexShader,
                        fragmentShader: nt.cube.fragmentShader,
                        side: je.g,
                        depthTest: !1,
                        depthWrite: !1,
                        fog: !1
                    })), u.geometry.removeAttribute("normal"), u.geometry.removeAttribute("uv"), u.onBeforeRender = function (e, t, r) {
                        this.matrixWorld.copyPosition(r.matrixWorld)
                    }, Object.defineProperty(u.material, "map", {
                        get: function () {
                            return this.uniforms.tCube.value
                        }
                    }), r.update(u));
                    var f = g.isWebGLRenderTargetCube ? g.texture : g;
                    u.material.uniforms.tCube.value = f, u.material.uniforms.tFlip.value = g.isWebGLRenderTargetCube ? 1 : -1, (d !== g || c !== f.version) && (u.material.needsUpdate = !0, d = g, c = f.version), t.unshift(u, u.geometry, u.material, 0, 0, null)
                } else g && g.isTexture && (void 0 === p && (p = new ut.a(new ct.a(2, 2), new pt.a({
                    type: "BackgroundMaterial",
                    uniforms: Object($e.a)(nt.background.uniforms),
                    vertexShader: nt.background.vertexShader,
                    fragmentShader: nt.background.fragmentShader,
                    side: je.D,
                    depthTest: !1,
                    depthWrite: !1,
                    fog: !1
                })), p.geometry.removeAttribute("normal"), Object.defineProperty(p.material, "map", {
                    get: function () {
                        return this.uniforms.t2D.value
                    }
                }), r.update(p)), p.material.uniforms.t2D.value = g, !0 === g.matrixAutoUpdate && g.updateMatrix(), p.material.uniforms.uvTransform.value.copy(g.matrix), (d !== g || c !== g.version) && (p.material.needsUpdate = !0, d = g, c = g.version), t.unshift(p, p.geometry, p.material, 0, 0, null))
            }

            function n(e, r) {
                t.buffers.color.setClear(e.r, e.g, e.b, r, a)
            }

            var o = new tt.a(0), l = 0, d = null, c = 0, p, u;
            return {
                getClearColor: function () {
                    return o
                }, setClearColor: function (e, t) {
                    o.set(e), l = void 0 === t ? 1 : t, n(o, l)
                }, getClearAlpha: function () {
                    return l
                }, setClearAlpha: function (e) {
                    l = e, n(o, l)
                }, render: i
            }
        }

        function d(e, t, r, a) {
            function i(t, a) {
                e.drawArrays(o, t, a), r.update(a, o)
            }

            function n(i, n, s) {
                var l;
                if (a.isWebGL2) l = e; else if (l = t.get("ANGLE_instanced_arrays"), null === l) return void console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");
                l[a.isWebGL2 ? "drawArraysInstanced" : "drawArraysInstancedANGLE"](o, n, s, i.maxInstancedCount), r.update(s, o, i.maxInstancedCount)
            }

            var o;
            this.setMode = function (e) {
                o = e
            }, this.render = i, this.renderInstances = n
        }

        function c(e, t, r) {
            function a() {
                if (void 0 !== l) return l;
                var r = t.get("EXT_texture_filter_anisotropic");
                return l = null === r ? 0 : e.getParameter(r.MAX_TEXTURE_MAX_ANISOTROPY_EXT), l
            }

            function i(t) {
                if ("highp" === t) {
                    if (0 < e.getShaderPrecisionFormat(35633, 36338).precision && 0 < e.getShaderPrecisionFormat(35632, 36338).precision) return "highp";
                    t = "mediump"
                }
                return "mediump" === t && 0 < e.getShaderPrecisionFormat(35633, 36337).precision && 0 < e.getShaderPrecisionFormat(35632, 36337).precision ? "mediump" : "lowp"
            }

            var n = "undefined" != typeof WebGL2RenderingContext && e instanceof WebGL2RenderingContext,
                o = void 0 === r.precision ? "highp" : r.precision, s = i(o), l;
            s !== o && (console.warn("THREE.WebGLRenderer:", o, "not supported, using", s, "instead."), o = s);
            var d = !0 === r.logarithmicDepthBuffer, c = e.getParameter(34930), p = e.getParameter(35660),
                u = e.getParameter(3379), m = e.getParameter(34076), g = e.getParameter(34921),
                f = e.getParameter(36347), h = e.getParameter(36348), v = e.getParameter(36349), x = 0 < p,
                y = n || !!t.get("OES_texture_float"), _ = n ? e.getParameter(36183) : 0;
            return {
                isWebGL2: n,
                getMaxAnisotropy: a,
                getMaxPrecision: i,
                precision: o,
                logarithmicDepthBuffer: d,
                maxTextures: c,
                maxVertexTextures: p,
                maxTextureSize: u,
                maxCubemapSize: m,
                maxAttributes: g,
                maxVertexUniforms: f,
                maxVaryings: h,
                maxFragmentUniforms: v,
                vertexTextures: x,
                floatFragmentTextures: y,
                floatVertexTextures: x && y,
                maxSamples: _
            }
        }

        function p() {
            function e() {
                c.value !== a && (c.value = a, c.needsUpdate = 0 < n), r.numPlanes = n, r.numIntersection = 0
            }

            function t(e, t, a, n) {
                var o = null === e ? 0 : e.length, s = null;
                if (0 !== o) {
                    if (s = c.value, !0 !== n || null === s) {
                        var p = a + 4 * o, u = t.matrixWorldInverse;
                        d.getNormalMatrix(u), (null === s || s.length < p) && (s = new Float32Array(p));
                        for (var m = 0, i = a; m !== o; ++m, i += 4) l.copy(e[m]).applyMatrix4(u, d), l.normal.toArray(s, i), s[i + 3] = l.constant
                    }
                    c.value = s, c.needsUpdate = !0
                }
                return r.numPlanes = o, s
            }

            var r = this, a = null, n = 0, o = !1, s = !1, l = new mt.a, d = new at.a,
                c = {value: null, needsUpdate: !1};
            this.uniform = c, this.numPlanes = 0, this.numIntersection = 0, this.init = function (e, r, i) {
                var s = 0 !== e.length || r || 0 !== n || o;
                return o = r, a = t(e, i, 0), n = e.length, s
            }, this.beginShadows = function () {
                s = !0, t(null)
            }, this.endShadows = function () {
                s = !1, e()
            }, this.setState = function (r, l, d, p, u, m) {
                if (!o || null === r || 0 === r.length || s && !d) s ? t(null) : e(); else {
                    var g = s ? 0 : n, f = 4 * g, h = u.clippingState || null;
                    c.value = h, h = t(r, p, f, m);
                    for (var v = 0; v !== f; ++v) h[v] = a[v];
                    u.clippingState = h, this.numIntersection = l ? this.numPlanes : 0, this.numPlanes += g
                }
            }
        }

        function u(e) {
            var t = {};
            return {
                get: function (r) {
                    if (void 0 !== t[r]) return t[r];
                    var a;
                    return a = "WEBGL_depth_texture" === r ? e.getExtension("WEBGL_depth_texture") || e.getExtension("MOZ_WEBGL_depth_texture") || e.getExtension("WEBKIT_WEBGL_depth_texture") : "EXT_texture_filter_anisotropic" === r ? e.getExtension("EXT_texture_filter_anisotropic") || e.getExtension("MOZ_EXT_texture_filter_anisotropic") || e.getExtension("WEBKIT_EXT_texture_filter_anisotropic") : "WEBGL_compressed_texture_s3tc" === r ? e.getExtension("WEBGL_compressed_texture_s3tc") || e.getExtension("MOZ_WEBGL_compressed_texture_s3tc") || e.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc") : "WEBGL_compressed_texture_pvrtc" === r ? e.getExtension("WEBGL_compressed_texture_pvrtc") || e.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc") : e.getExtension(r), null === a && console.warn("THREE.WebGLRenderer: " + r + " extension not supported."), t[r] = a, a
                }
            }
        }

        function m(e, t, r) {
            function a(e) {
                var o = e.target, s = i[o.id];
                for (var l in null !== s.index && t.remove(s.index), s.attributes) t.remove(s.attributes[l]);
                o.removeEventListener("dispose", a), delete i[o.id];
                var d = n[s.id];
                d && (t.remove(d), delete n[s.id]), r.memory.geometries--
            }

            var i = {}, n = {};
            return {
                get: function (e, t) {
                    var n = i[t.id];
                    return n ? n : (t.addEventListener("dispose", a), t.isBufferGeometry ? n = t : t.isGeometry && (void 0 === t._bufferGeometry && (t._bufferGeometry = new lt.a().setFromObject(e)), n = t._bufferGeometry), i[t.id] = n, r.memory.geometries++, n)
                }, update: function (e) {
                    var r = e.index, a = e.attributes;
                    for (var n in null !== r && t.update(r, 34963), a) t.update(a[n], 34962);
                    var o = e.morphAttributes;
                    for (var n in o) for (var s = o[n], d = 0, i = s.length; d < i; d++) t.update(s[d], 34962)
                }, getWireframeAttribute: function (e) {
                    var r = n[e.id];
                    if (r) return r;
                    var o = [], s = e.index, d = e.attributes;
                    if (null !== s) for (var p = s.array, u = 0, i = p.length; u < i; u += 3) {
                        var l = p[u + 0], a = p[u + 1], m = p[u + 2];
                        o.push(l, a, a, m, m, l)
                    } else for (var p = d.position.array, u = 0, i = p.length / 3 - 1; u < i; u += 3) {
                        var l = u + 0, a = u + 1, m = u + 2;
                        o.push(l, a, a, m, m, l)
                    }
                    return r = new (65535 < Object(gt.a)(o) ? dt.d : dt.c)(o, 1), t.update(r, 34963), n[e.id] = r, r
                }
            }
        }

        function g(e, t, r, a) {
            function i(t, a) {
                e.drawElements(o, a, s, t * l), r.update(a, o)
            }

            function n(i, n, d) {
                var c;
                if (a.isWebGL2) c = e; else {
                    var c = t.get("ANGLE_instanced_arrays");
                    if (null === c) return void console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.")
                }
                c[a.isWebGL2 ? "drawElementsInstanced" : "drawElementsInstancedANGLE"](o, d, s, n * l, i.maxInstancedCount), r.update(d, o, i.maxInstancedCount)
            }

            var o, s, l;
            this.setMode = function (e) {
                o = e
            }, this.setIndex = function (e) {
                s = e.type, l = e.bytesPerElement
            }, this.render = i, this.renderInstances = n
        }

        function f() {
            function e(e, r, a) {
                switch (a = a || 1, t.calls++, r) {
                    case 4:
                        t.triangles += a * (e / 3);
                        break;
                    case 5:
                    case 6:
                        t.triangles += a * (e - 2);
                        break;
                    case 1:
                        t.lines += a * (e / 2);
                        break;
                    case 3:
                        t.lines += a * (e - 1);
                        break;
                    case 2:
                        t.lines += a * e;
                        break;
                    case 0:
                        t.points += a * e;
                        break;
                    default:
                        console.error("THREE.WebGLInfo: Unknown draw mode:", r);
                }
            }

            var t = {frame: 0, calls: 0, triangles: 0, points: 0, lines: 0};
            return {
                memory: {geometries: 0, textures: 0}, render: t, programs: null, autoReset: !0, reset: function () {
                    t.frame++, t.calls = 0, t.triangles = 0, t.points = 0, t.lines = 0
                }, update: e
            }
        }

        function h(e, t) {
            return We(t[1]) - We(e[1])
        }

        function v(e) {
            var t = {}, r = new Float32Array(8);
            return {
                update: function (a, n, o, s) {
                    var l = a.morphTargetInfluences, d = l.length, c = t[n.id];
                    if (void 0 === c) {
                        c = [];
                        for (var p = 0; p < d; p++) c[p] = [p, 0];
                        t[n.id] = c
                    }
                    for (var i = o.morphTargets && n.morphAttributes.position, u = o.morphNormals && n.morphAttributes.normal, p = 0, m; p < d; p++) m = c[p], 0 !== m[1] && (i && n.removeAttribute("morphTarget" + p), u && n.removeAttribute("morphNormal" + p));
                    for (var p = 0, m; p < d; p++) m = c[p], m[0] = p, m[1] = l[p];
                    c.sort(h);
                    for (var p = 0, m; 8 > p; p++) {
                        if (m = c[p], m) {
                            var g = m[0], f = m[1];
                            if (f) {
                                i && n.addAttribute("morphTarget" + p, i[g]), u && n.addAttribute("morphNormal" + p, u[g]), r[p] = f;
                                continue
                            }
                        }
                        r[p] = 0
                    }
                    s.getUniforms().setValue(e, "morphTargetInfluences", r)
                }
            }
        }

        function x(e, t) {
            function r(r) {
                var i = t.render.frame, n = r.geometry, o = e.get(r, n);
                return a[o.id] !== i && (n.isGeometry && o.updateFromObject(r), e.update(o), a[o.id] = i), o
            }

            var a = {};
            return {
                update: r, dispose: function () {
                    a = {}
                }
            }
        }

        function y(e, t, r, a, i, n, o, s, l, d) {
            e = void 0 === e ? [] : e, t = void 0 === t ? je.l : t, Je.a.call(this, e, t, r, a, i, n, o, s, l, d), this.flipY = !1
        }

        function _(e, t, r, a) {
            Je.a.call(this, null), this.image = {
                data: e,
                width: t,
                height: r,
                depth: a
            }, this.magFilter = je.Y, this.minFilter = je.Y, this.generateMipmaps = !1, this.flipY = !1
        }

        function b() {
            this.seq = [], this.map = {}
        }

        function M(e, t, a) {
            var o = e[0];
            if (0 >= o || 0 < o) return e;
            var s = t * a, n = xt[s];
            if (void 0 === n && (n = new Float32Array(s), xt[s] = n), 0 !== t) {
                o.toArray(n, 0);
                for (var r = 1, i = 0; r !== t; ++r) i += a, e[r].toArray(n, i)
            }
            return n
        }

        function S(e, t) {
            if (e.length !== t.length) return !1;
            for (var r = 0, a = e.length; r < a; r++) if (e[r] !== t[r]) return !1;
            return !0
        }

        function L(e, t) {
            for (var r = 0, a = t.length; r < a; r++) e[r] = t[r]
        }

        function E(e, t) {
            var a = yt[t];
            void 0 === a && (a = new Int32Array(t), yt[t] = a);
            for (var r = 0; r !== t; ++r) a[r] = e.allocTextureUnit();
            return a
        }

        function T(e, t) {
            var r = this.cache;
            r[0] === t || (e.uniform1f(this.addr, t), r[0] = t)
        }

        function w(e, t) {
            var r = this.cache;
            r[0] === t || (e.uniform1i(this.addr, t), r[0] = t)
        }

        function P(e, t) {
            var r = this.cache;
            if (void 0 !== t.x) (r[0] !== t.x || r[1] !== t.y) && (e.uniform2f(this.addr, t.x, t.y), r[0] = t.x, r[1] = t.y); else {
                if (S(r, t)) return;
                e.uniform2fv(this.addr, t), L(r, t)
            }
        }

        function C(e, t) {
            var r = this.cache;
            if (void 0 !== t.x) (r[0] !== t.x || r[1] !== t.y || r[2] !== t.z) && (e.uniform3f(this.addr, t.x, t.y, t.z), r[0] = t.x, r[1] = t.y, r[2] = t.z); else if (void 0 !== t.r) (r[0] !== t.r || r[1] !== t.g || r[2] !== t.b) && (e.uniform3f(this.addr, t.r, t.g, t.b), r[0] = t.r, r[1] = t.g, r[2] = t.b); else {
                if (S(r, t)) return;
                e.uniform3fv(this.addr, t), L(r, t)
            }
        }

        function A(e, t) {
            var r = this.cache;
            if (void 0 !== t.x) (r[0] !== t.x || r[1] !== t.y || r[2] !== t.z || r[3] !== t.w) && (e.uniform4f(this.addr, t.x, t.y, t.z, t.w), r[0] = t.x, r[1] = t.y, r[2] = t.z, r[3] = t.w); else {
                if (S(r, t)) return;
                e.uniform4fv(this.addr, t), L(r, t)
            }
        }

        function D(e, t) {
            var r = this.cache, a = t.elements;
            if (void 0 === a) {
                if (S(r, t)) return;
                e.uniformMatrix2fv(this.addr, !1, t), L(r, t)
            } else {
                if (S(r, a)) return;
                Mt.set(a), e.uniformMatrix2fv(this.addr, !1, Mt), L(r, a)
            }
        }

        function R(e, t) {
            var r = this.cache, a = t.elements;
            if (void 0 === a) {
                if (S(r, t)) return;
                e.uniformMatrix3fv(this.addr, !1, t), L(r, t)
            } else {
                if (S(r, a)) return;
                bt.set(a), e.uniformMatrix3fv(this.addr, !1, bt), L(r, a)
            }
        }

        function N(e, t) {
            var r = this.cache, a = t.elements;
            if (void 0 === a) {
                if (S(r, t)) return;
                e.uniformMatrix4fv(this.addr, !1, t), L(r, t)
            } else {
                if (S(r, a)) return;
                _t.set(a), e.uniformMatrix4fv(this.addr, !1, _t), L(r, a)
            }
        }

        function I(e, t, r) {
            var a = this.cache, i = r.allocTextureUnit();
            a[0] !== i && (e.uniform1i(this.addr, i), a[0] = i), r.setTexture2D(t || ft, i)
        }

        function z(e, t, r) {
            var a = this.cache, i = r.allocTextureUnit();
            a[0] !== i && (e.uniform1i(this.addr, i), a[0] = i), r.setTexture3D(t || ht, i)
        }

        function U(e, t, r) {
            var a = this.cache, i = r.allocTextureUnit();
            a[0] !== i && (e.uniform1i(this.addr, i), a[0] = i), r.setTextureCube(t || vt, i)
        }

        function F(e, t) {
            var r = this.cache;
            S(r, t) || (e.uniform2iv(this.addr, t), L(r, t))
        }

        function G(e, t) {
            var r = this.cache;
            S(r, t) || (e.uniform3iv(this.addr, t), L(r, t))
        }

        function O(e, t) {
            var r = this.cache;
            S(r, t) || (e.uniform4iv(this.addr, t), L(r, t))
        }

        function B(e) {
            return 5126 === e ? T : 35664 === e ? P : 35665 === e ? C : 35666 === e ? A : 35674 === e ? D : 35675 === e ? R : 35676 === e ? N : 35678 === e || 36198 === e ? I : 35679 === e ? z : 35680 === e ? U : 5124 === e || 35670 === e ? w : 35667 === e || 35671 === e ? F : 35668 === e || 35672 === e ? G : 35669 === e || 35673 === e ? O : void 0
        }

        function V(e, t) {
            var r = this.cache;
            S(r, t) || (e.uniform1fv(this.addr, t), L(r, t))
        }

        function H(e, t) {
            var r = this.cache;
            S(r, t) || (e.uniform1iv(this.addr, t), L(r, t))
        }

        function k(e, t) {
            var r = this.cache, a = M(t, this.size, 2);
            S(r, a) || (e.uniform2fv(this.addr, a), this.updateCache(a))
        }

        function W(e, t) {
            var r = this.cache, a = M(t, this.size, 3);
            S(r, a) || (e.uniform3fv(this.addr, a), this.updateCache(a))
        }

        function q(e, t) {
            var r = this.cache, a = M(t, this.size, 4);
            S(r, a) || (e.uniform4fv(this.addr, a), this.updateCache(a))
        }

        function X(e, t) {
            var r = this.cache, a = M(t, this.size, 4);
            S(r, a) || (e.uniformMatrix2fv(this.addr, !1, a), this.updateCache(a))
        }

        function j(e, t) {
            var r = this.cache, a = M(t, this.size, 9);
            S(r, a) || (e.uniformMatrix3fv(this.addr, !1, a), this.updateCache(a))
        }

        function Y(e, t) {
            var r = this.cache, a = M(t, this.size, 16);
            S(r, a) || (e.uniformMatrix4fv(this.addr, !1, a), this.updateCache(a))
        }

        function J(e, t, r) {
            var a = this.cache, o = t.length, n = E(r, o);
            !1 === S(a, n) && (e.uniform1iv(this.addr, n), L(a, n));
            for (var s = 0; s !== o; ++s) r.setTexture2D(t[s] || ft, n[s])
        }

        function Z(e, t, r) {
            var a = this.cache, o = t.length, n = E(r, o);
            !1 === S(a, n) && (e.uniform1iv(this.addr, n), L(a, n));
            for (var s = 0; s !== o; ++s) r.setTextureCube(t[s] || vt, n[s])
        }

        function Q(e) {
            return 5126 === e ? V : 35664 === e ? k : 35665 === e ? W : 35666 === e ? q : 35674 === e ? X : 35675 === e ? j : 35676 === e ? Y : 35678 === e ? J : 35680 === e ? Z : 5124 === e || 35670 === e ? H : 35667 === e || 35671 === e ? F : 35668 === e || 35672 === e ? G : 35669 === e || 35673 === e ? O : void 0
        }

        function K(e, t, r) {
            this.id = e, this.addr = r, this.cache = [], this.setValue = B(t.type)
        }

        function $(e, t, r) {
            this.id = e, this.addr = r, this.cache = [], this.size = t.size, this.setValue = Q(t.type)
        }

        function ee(e) {
            this.id = e, b.call(this)
        }

        function te(e, t) {
            e.seq.push(t), e.map[t.id] = t
        }

        function re(e, t, r) {
            var a = e.name, i = a.length;
            for (St.lastIndex = 0; ;) {
                var n = St.exec(a), o = St.lastIndex, s = n[1], l = "]" === n[2], d = n[3];
                if (l && (s |= 0), void 0 === d || "[" === d && o + 2 === i) {
                    te(r, void 0 === d ? new K(s, e, t) : new $(s, e, t));
                    break
                } else {
                    var c = r.map, p = c[s];
                    void 0 === p && (p = new ee(s), te(r, p)), r = p
                }
            }
        }

        function ae(e, t, r) {
            b.call(this), this.renderer = r;
            for (var a = e.getProgramParameter(t, 35718), n = 0; n < a; ++n) {
                var i = e.getActiveUniform(t, n), o = e.getUniformLocation(t, i.name);
                re(i, o, this)
            }
        }

        function ie(e) {
            for (var t = e.split("\n"), r = 0; r < t.length; r++) t[r] = r + 1 + ": " + t[r];
            return t.join("\n")
        }

        function ne(e, t, r) {
            var a = e.createShader(t);
            return e.shaderSource(a, r), e.compileShader(a), !1 === e.getShaderParameter(a, 35713) && console.error("THREE.WebGLShader: Shader couldn't compile."), "" !== e.getShaderInfoLog(a) && console.warn("THREE.WebGLShader: gl.getShaderInfoLog()", 35633 === t ? "vertex" : "fragment", e.getShaderInfoLog(a), ie(r)), a
        }

        function oe(e) {
            switch (e) {
                case je.L:
                    return ["Linear", "( value )"];
                case je.sc:
                    return ["sRGB", "( value )"];
                case je.Mb:
                    return ["RGBE", "( value )"];
                case je.Pb:
                    return ["RGBM", "( value, 7.0 )"];
                case je.Ob:
                    return ["RGBM", "( value, 16.0 )"];
                case je.Lb:
                    return ["RGBD", "( value, 256.0 )"];
                case je.E:
                    return ["Gamma", "( value, float( GAMMA_FACTOR ) )"];
                default:
                    throw new Error("unsupported encoding: " + e);
            }
        }

        function se(e, t) {
            var r = oe(t);
            return "vec4 " + e + "( vec4 value ) { return " + r[0] + "ToLinear" + r[1] + "; }"
        }

        function le(e, t) {
            var r = oe(t);
            return "vec4 " + e + "( vec4 value ) { return LinearTo" + r[0] + r[1] + "; }"
        }

        function de(e, t) {
            var r;
            switch (t) {
                case je.P:
                    r = "Linear";
                    break;
                case je.Vb:
                    r = "Reinhard";
                    break;
                case je.jc:
                    r = "Uncharted2";
                    break;
                case je.j:
                    r = "OptimizedCineon";
                    break;
                case je.a:
                    r = "ACESFilmic";
                    break;
                default:
                    throw new Error("unsupported toneMapping: " + t);
            }
            return "vec3 " + e + "( vec3 color ) { return " + r + "ToneMapping( color ); }"
        }

        function ce(e, t, r) {
            e = e || {};
            var a = [e.derivatives || t.envMapCubeUV || t.bumpMap || t.normalMap && !t.objectSpaceNormalMap || t.flatShading ? "#extension GL_OES_standard_derivatives : enable" : "", (e.fragDepth || t.logarithmicDepthBuffer) && r.get("EXT_frag_depth") ? "#extension GL_EXT_frag_depth : enable" : "", e.drawBuffers && r.get("WEBGL_draw_buffers") ? "#extension GL_EXT_draw_buffers : require" : "", (e.shaderTextureLOD || t.envMap) && r.get("EXT_shader_texture_lod") ? "#extension GL_EXT_shader_texture_lod : enable" : ""];
            return a.filter(me).join("\n")
        }

        function pe(e) {
            var t = [];
            for (var r in e) {
                var a = e[r];
                !1 === a || t.push("#define " + r + " " + a)
            }
            return t.join("\n")
        }

        function ue(e, t) {
            for (var r = {}, a = e.getProgramParameter(t, 35721), n = 0; n < a; n++) {
                var i = e.getActiveAttrib(t, n), o = i.name;
                r[o] = e.getAttribLocation(t, o)
            }
            return r
        }

        function me(e) {
            return "" !== e
        }

        function ge(e, t) {
            return e.replace(/NUM_DIR_LIGHTS/g, t.numDirLights).replace(/NUM_SPOT_LIGHTS/g, t.numSpotLights).replace(/NUM_RECT_AREA_LIGHTS/g, t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g, t.numPointLights).replace(/NUM_HEMI_LIGHTS/g, t.numHemiLights)
        }

        function fe(e, t) {
            return e.replace(/NUM_CLIPPING_PLANES/g, t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g, t.numClippingPlanes - t.numClipIntersection)
        }

        function he(e) {
            function t(e, t) {
                var r = Ke[t];
                if (void 0 === r) throw new Error("Can not resolve #include <" + t + ">");
                return he(r)
            }

            var r = /^[ \t]*#include +<([\w\d./]+)>/gm;
            return e.replace(r, t)
        }

        function ve(e) {
            var t = /#pragma unroll_loop[\s]+?for \( int i \= (\d+)\; i < (\d+)\; i \+\+ \) \{([\s\S]+?)(?=\})\}/g;
            return e.replace(t, function (e, t, r, a) {
                for (var n = "", o = parseInt(t); o < parseInt(r); o++) n += a.replace(/\[ i \]/g, "[ " + o + " ]");
                return n
            })
        }

        function xe(e, t, r, a, i, n, o) {
            var s = e.context, l = a.defines, d = i.vertexShader, c = i.fragmentShader, p = "SHADOWMAP_TYPE_BASIC";
            n.shadowMapType === je.nb ? p = "SHADOWMAP_TYPE_PCF" : n.shadowMapType === je.ob && (p = "SHADOWMAP_TYPE_PCF_SOFT");
            var u = "ENVMAP_TYPE_CUBE", m = "ENVMAP_MODE_REFLECTION", g = "ENVMAP_BLENDING_MULTIPLY";
            if (n.envMap) {
                switch (a.envMap.mapping) {
                    case je.l:
                    case je.m:
                        u = "ENVMAP_TYPE_CUBE";
                        break;
                    case je.n:
                    case je.o:
                        u = "ENVMAP_TYPE_CUBE_UV";
                        break;
                    case je.z:
                    case je.A:
                        u = "ENVMAP_TYPE_EQUIREC";
                        break;
                    case je.Zb:
                        u = "ENVMAP_TYPE_SPHERE";
                }
                switch (a.envMap.mapping) {
                    case je.m:
                    case je.A:
                        m = "ENVMAP_MODE_REFRACTION";
                }
                switch (a.combine) {
                    case je.X:
                        g = "ENVMAP_BLENDING_MULTIPLY";
                        break;
                    case je.V:
                        g = "ENVMAP_BLENDING_MIX";
                        break;
                    case je.c:
                        g = "ENVMAP_BLENDING_ADD";
                }
            }
            var f = 0 < e.gammaFactor ? e.gammaFactor : 1, h = o.isWebGL2 ? "" : ce(a.extensions, n, t), v = pe(l),
                x = s.createProgram(), y, _;
            if (a.isRawShaderMaterial ? (y = [v].filter(me).join("\n"), 0 < y.length && (y += "\n"), _ = [h, v].filter(me).join("\n"), 0 < _.length && (_ += "\n")) : (y = ["precision " + n.precision + " float;", "precision " + n.precision + " int;", "#define SHADER_NAME " + i.name, v, n.supportsVertexTextures ? "#define VERTEX_TEXTURES" : "", "#define GAMMA_FACTOR " + f, "#define MAX_BONES " + n.maxBones, n.useFog && n.fog ? "#define USE_FOG" : "", n.useFog && n.fogExp ? "#define FOG_EXP2" : "", n.map ? "#define USE_MAP" : "", n.envMap ? "#define USE_ENVMAP" : "", n.envMap ? "#define " + m : "", n.lightMap ? "#define USE_LIGHTMAP" : "", n.aoMap ? "#define USE_AOMAP" : "", n.emissiveMap ? "#define USE_EMISSIVEMAP" : "", n.bumpMap ? "#define USE_BUMPMAP" : "", n.normalMap ? "#define USE_NORMALMAP" : "", n.normalMap && n.objectSpaceNormalMap ? "#define OBJECTSPACE_NORMALMAP" : "", n.displacementMap && n.supportsVertexTextures ? "#define USE_DISPLACEMENTMAP" : "", n.specularMap ? "#define USE_SPECULARMAP" : "", n.roughnessMap ? "#define USE_ROUGHNESSMAP" : "", n.metalnessMap ? "#define USE_METALNESSMAP" : "", n.alphaMap ? "#define USE_ALPHAMAP" : "", n.vertexColors ? "#define USE_COLOR" : "", n.flatShading ? "#define FLAT_SHADED" : "", n.skinning ? "#define USE_SKINNING" : "", n.useVertexTexture ? "#define BONE_TEXTURE" : "", n.morphTargets ? "#define USE_MORPHTARGETS" : "", n.morphNormals && !1 === n.flatShading ? "#define USE_MORPHNORMALS" : "", n.doubleSided ? "#define DOUBLE_SIDED" : "", n.flipSided ? "#define FLIP_SIDED" : "", n.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", n.shadowMapEnabled ? "#define " + p : "", n.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "", n.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "", n.logarithmicDepthBuffer && (o.isWebGL2 || t.get("EXT_frag_depth")) ? "#define USE_LOGDEPTHBUF_EXT" : "", "uniform mat4 modelMatrix;", "uniform mat4 modelViewMatrix;", "uniform mat4 projectionMatrix;", "uniform mat4 viewMatrix;", "uniform mat3 normalMatrix;", "uniform vec3 cameraPosition;", "attribute vec3 position;", "attribute vec3 normal;", "attribute vec2 uv;", "#ifdef USE_COLOR", "\tattribute vec3 color;", "#endif", "#ifdef USE_MORPHTARGETS", "\tattribute vec3 morphTarget0;", "\tattribute vec3 morphTarget1;", "\tattribute vec3 morphTarget2;", "\tattribute vec3 morphTarget3;", "\t#ifdef USE_MORPHNORMALS", "\t\tattribute vec3 morphNormal0;", "\t\tattribute vec3 morphNormal1;", "\t\tattribute vec3 morphNormal2;", "\t\tattribute vec3 morphNormal3;", "\t#else", "\t\tattribute vec3 morphTarget4;", "\t\tattribute vec3 morphTarget5;", "\t\tattribute vec3 morphTarget6;", "\t\tattribute vec3 morphTarget7;", "\t#endif", "#endif", "#ifdef USE_SKINNING", "\tattribute vec4 skinIndex;", "\tattribute vec4 skinWeight;", "#endif", "\n"].filter(me).join("\n"), _ = [h, "precision " + n.precision + " float;", "precision " + n.precision + " int;", "#define SHADER_NAME " + i.name, v, n.alphaTest ? "#define ALPHATEST " + n.alphaTest + (n.alphaTest % 1 ? "" : ".0") : "", "#define GAMMA_FACTOR " + f, n.useFog && n.fog ? "#define USE_FOG" : "", n.useFog && n.fogExp ? "#define FOG_EXP2" : "", n.map ? "#define USE_MAP" : "", n.matcap ? "#define USE_MATCAP" : "", n.envMap ? "#define USE_ENVMAP" : "", n.envMap ? "#define " + u : "", n.envMap ? "#define " + m : "", n.envMap ? "#define " + g : "", n.lightMap ? "#define USE_LIGHTMAP" : "", n.aoMap ? "#define USE_AOMAP" : "", n.emissiveMap ? "#define USE_EMISSIVEMAP" : "", n.bumpMap ? "#define USE_BUMPMAP" : "", n.normalMap ? "#define USE_NORMALMAP" : "", n.normalMap && n.objectSpaceNormalMap ? "#define OBJECTSPACE_NORMALMAP" : "", n.specularMap ? "#define USE_SPECULARMAP" : "", n.roughnessMap ? "#define USE_ROUGHNESSMAP" : "", n.metalnessMap ? "#define USE_METALNESSMAP" : "", n.alphaMap ? "#define USE_ALPHAMAP" : "", n.vertexColors ? "#define USE_COLOR" : "", n.gradientMap ? "#define USE_GRADIENTMAP" : "", n.flatShading ? "#define FLAT_SHADED" : "", n.doubleSided ? "#define DOUBLE_SIDED" : "", n.flipSided ? "#define FLIP_SIDED" : "", n.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", n.shadowMapEnabled ? "#define " + p : "", n.premultipliedAlpha ? "#define PREMULTIPLIED_ALPHA" : "", n.physicallyCorrectLights ? "#define PHYSICALLY_CORRECT_LIGHTS" : "", n.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "", n.logarithmicDepthBuffer && (o.isWebGL2 || t.get("EXT_frag_depth")) ? "#define USE_LOGDEPTHBUF_EXT" : "", n.envMap && (o.isWebGL2 || t.get("EXT_shader_texture_lod")) ? "#define TEXTURE_LOD_EXT" : "", "uniform mat4 viewMatrix;", "uniform vec3 cameraPosition;", n.toneMapping === je.eb ? "" : "#define TONE_MAPPING", n.toneMapping === je.eb ? "" : Ke.tonemapping_pars_fragment, n.toneMapping === je.eb ? "" : de("toneMapping", n.toneMapping), n.dithering ? "#define DITHERING" : "", n.outputEncoding || n.mapEncoding || n.matcapEncoding || n.envMapEncoding || n.emissiveMapEncoding ? Ke.encodings_pars_fragment : "", n.mapEncoding ? se("mapTexelToLinear", n.mapEncoding) : "", n.matcapEncoding ? se("matcapTexelToLinear", n.matcapEncoding) : "", n.envMapEncoding ? se("envMapTexelToLinear", n.envMapEncoding) : "", n.emissiveMapEncoding ? se("emissiveMapTexelToLinear", n.emissiveMapEncoding) : "", n.outputEncoding ? le("linearToOutputTexel", n.outputEncoding) : "", n.depthPacking ? "#define DEPTH_PACKING " + a.depthPacking : "", "\n"].filter(me).join("\n")), d = he(d), d = ge(d, n), d = fe(d, n), c = he(c), c = ge(c, n), c = fe(c, n), d = ve(d), c = ve(c), o.isWebGL2 && !a.isRawShaderMaterial) {
                var b = !1, M = /^\s*#version\s+300\s+es\s*\n/;
                a.isShaderMaterial && null !== d.match(M) && null !== c.match(M) && (b = !0, d = d.replace(M, ""), c = c.replace(M, "")), y = "#version 300 es\n\n#define attribute in\n#define varying out\n#define texture2D texture\n" + y, _ = ["#version 300 es\n", "#define varying in", b ? "" : "out highp vec4 pc_fragColor;", b ? "" : "#define gl_FragColor pc_fragColor", "#define gl_FragDepthEXT gl_FragDepth", "#define texture2D texture", "#define textureCube texture", "#define texture2DProj textureProj", "#define texture2DLodEXT textureLod", "#define texture2DProjLodEXT textureProjLod", "#define textureCubeLodEXT textureLod", "#define texture2DGradEXT textureGrad", "#define texture2DProjGradEXT textureProjGrad", "#define textureCubeGradEXT textureGrad"].join("\n") + "\n" + _
            }
            var S = y + d, L = _ + c, E = ne(s, 35633, S), T = ne(s, 35632, L);
            s.attachShader(x, E), s.attachShader(x, T), void 0 === a.index0AttributeName ? !0 === n.morphTargets && s.bindAttribLocation(x, 0, "position") : s.bindAttribLocation(x, 0, a.index0AttributeName), s.linkProgram(x);
            var w = s.getProgramInfoLog(x).trim(), P = s.getShaderInfoLog(E).trim(), C = s.getShaderInfoLog(T).trim(),
                A = !0, D = !0;
            !1 === s.getProgramParameter(x, 35714) ? (A = !1, console.error("THREE.WebGLProgram: shader error: ", s.getError(), "35715", s.getProgramParameter(x, 35715), "gl.getProgramInfoLog", w, P, C)) : "" === w ? ("" === P || "" === C) && (D = !1) : console.warn("THREE.WebGLProgram: gl.getProgramInfoLog()", w), D && (this.diagnostics = {
                runnable: A,
                material: a,
                programLog: w,
                vertexShader: {log: P, prefix: y},
                fragmentShader: {log: C, prefix: _}
            }), s.deleteShader(E), s.deleteShader(T);
            var R;
            this.getUniforms = function () {
                return void 0 == R && (R = new ae(s, x, e)), R
            };
            var N;
            return this.getAttributes = function () {
                return void 0 === N && (N = ue(s, x)), N
            }, this.destroy = function () {
                s.deleteProgram(x), this.program = void 0
            }, Object.defineProperties(this, {
                uniforms: {
                    get: function () {
                        return console.warn("THREE.WebGLProgram: .uniforms is now .getUniforms()."), this.getUniforms()
                    }
                }, attributes: {
                    get: function () {
                        return console.warn("THREE.WebGLProgram: .attributes is now .getAttributes()."), this.getAttributes()
                    }
                }
            }), this.name = i.name, this.id = Lt++, this.code = r, this.usedTimes = 1, this.program = x, this.vertexShader = E, this.fragmentShader = T, this
        }

        function ye(e, t, r) {
            function a(e) {
                var t = e.skeleton, a = t.bones;
                if (r.floatVertexTextures) return 1024;
                var i = r.maxVertexUniforms, n = He((i - 20) / 4), o = Xe(n, a.length);
                return o < a.length ? (console.warn("THREE.WebGLRenderer: Skeleton has " + a.length + " bones. This GPU supports " + o + "."), 0) : o
            }

            function i(e, t) {
                var r;
                return e ? e.isTexture ? r = e.encoding : e.isWebGLRenderTarget && (console.warn("THREE.WebGLPrograms.getTextureEncodingFromMap: don't use render targets as textures. Use their .texture property instead."), r = e.texture.encoding) : r = je.L, r === je.L && t && (r = je.E), r
            }

            var n = [], o = {
                    MeshDepthMaterial: "depth",
                    MeshDistanceMaterial: "distanceRGBA",
                    MeshNormalMaterial: "normal",
                    MeshBasicMaterial: "basic",
                    MeshLambertMaterial: "lambert",
                    MeshPhongMaterial: "phong",
                    MeshToonMaterial: "phong",
                    MeshStandardMaterial: "physical",
                    MeshPhysicalMaterial: "physical",
                    MeshMatcapMaterial: "matcap",
                    LineBasicMaterial: "basic",
                    LineDashedMaterial: "dashed",
                    PointsMaterial: "points",
                    ShadowMaterial: "shadow",
                    SpriteMaterial: "sprite"
                },
                s = ["precision", "supportsVertexTextures", "map", "mapEncoding", "matcap", "matcapEncoding", "envMap", "envMapMode", "envMapEncoding", "lightMap", "aoMap", "emissiveMap", "emissiveMapEncoding", "bumpMap", "normalMap", "objectSpaceNormalMap", "displacementMap", "specularMap", "roughnessMap", "metalnessMap", "gradientMap", "alphaMap", "combine", "vertexColors", "fog", "useFog", "fogExp", "flatShading", "sizeAttenuation", "logarithmicDepthBuffer", "skinning", "maxBones", "useVertexTexture", "morphTargets", "morphNormals", "maxMorphTargets", "maxMorphNormals", "premultipliedAlpha", "numDirLights", "numPointLights", "numSpotLights", "numHemiLights", "numRectAreaLights", "shadowMapEnabled", "shadowMapType", "toneMapping", "physicallyCorrectLights", "alphaTest", "doubleSided", "flipSided", "numClippingPlanes", "numClipIntersection", "depthPacking", "dithering"];
            this.getParameters = function (t, n, s, l, d, c, p) {
                var u = o[t.type], m = p.isSkinnedMesh ? a(p) : 0, g = r.precision;
                null !== t.precision && (g = r.getMaxPrecision(t.precision), g !== t.precision && console.warn("THREE.WebGLProgram.getParameters:", t.precision, "not supported, using", g, "instead."));
                var f = e.getRenderTarget(), h = {
                    shaderID: u,
                    precision: g,
                    supportsVertexTextures: r.vertexTextures,
                    outputEncoding: i(f ? f.texture : null, e.gammaOutput),
                    map: !!t.map,
                    mapEncoding: i(t.map, e.gammaInput),
                    matcap: !!t.matcap,
                    matcapEncoding: i(t.matcap, e.gammaInput),
                    envMap: !!t.envMap,
                    envMapMode: t.envMap && t.envMap.mapping,
                    envMapEncoding: i(t.envMap, e.gammaInput),
                    envMapCubeUV: !!t.envMap && (t.envMap.mapping === je.n || t.envMap.mapping === je.o),
                    lightMap: !!t.lightMap,
                    aoMap: !!t.aoMap,
                    emissiveMap: !!t.emissiveMap,
                    emissiveMapEncoding: i(t.emissiveMap, e.gammaInput),
                    bumpMap: !!t.bumpMap,
                    normalMap: !!t.normalMap,
                    objectSpaceNormalMap: t.normalMapType === je.hb,
                    displacementMap: !!t.displacementMap,
                    roughnessMap: !!t.roughnessMap,
                    metalnessMap: !!t.metalnessMap,
                    specularMap: !!t.specularMap,
                    alphaMap: !!t.alphaMap,
                    gradientMap: !!t.gradientMap,
                    combine: t.combine,
                    vertexColors: t.vertexColors,
                    fog: !!l,
                    useFog: t.fog,
                    fogExp: l && l.isFogExp2,
                    flatShading: t.flatShading,
                    sizeAttenuation: t.sizeAttenuation,
                    logarithmicDepthBuffer: r.logarithmicDepthBuffer,
                    skinning: t.skinning && 0 < m,
                    maxBones: m,
                    useVertexTexture: r.floatVertexTextures,
                    morphTargets: t.morphTargets,
                    morphNormals: t.morphNormals,
                    maxMorphTargets: e.maxMorphTargets,
                    maxMorphNormals: e.maxMorphNormals,
                    numDirLights: n.directional.length,
                    numPointLights: n.point.length,
                    numSpotLights: n.spot.length,
                    numRectAreaLights: n.rectArea.length,
                    numHemiLights: n.hemi.length,
                    numClippingPlanes: d,
                    numClipIntersection: c,
                    dithering: t.dithering,
                    shadowMapEnabled: e.shadowMap.enabled && p.receiveShadow && 0 < s.length,
                    shadowMapType: e.shadowMap.type,
                    toneMapping: e.toneMapping,
                    physicallyCorrectLights: e.physicallyCorrectLights,
                    premultipliedAlpha: t.premultipliedAlpha,
                    alphaTest: t.alphaTest,
                    doubleSided: t.side === je.v,
                    flipSided: t.side === je.g,
                    depthPacking: void 0 !== t.depthPacking && t.depthPacking
                };
                return h
            }, this.getProgramCode = function (t, r) {
                var a = [];
                if (r.shaderID ? a.push(r.shaderID) : (a.push(t.fragmentShader), a.push(t.vertexShader)), void 0 !== t.defines) for (var n in t.defines) a.push(n), a.push(t.defines[n]);
                for (var o = 0; o < s.length; o++) a.push(r[s[o]]);
                return a.push(t.onBeforeCompile.toString()), a.push(e.gammaOutput), a.push(e.gammaFactor), a.join()
            }, this.acquireProgram = function (a, i, o, s) {
                for (var l = 0, d = n.length, c, p; l < d; l++) if (p = n[l], p.code === s) {
                    c = p, ++c.usedTimes;
                    break
                }
                return void 0 === c && (c = new xe(e, t, s, a, i, o, r), n.push(c)), c
            }, this.releaseProgram = function (e) {
                if (0 == --e.usedTimes) {
                    var t = n.indexOf(e);
                    n[t] = n[n.length - 1], n.pop(), e.destroy()
                }
            }, this.programs = n
        }

        function _e() {
            function e(e) {
                var t = a.get(e);
                return void 0 === t && (t = {}, a.set(e, t)), t
            }

            function t(e) {
                a.delete(e)
            }

            function r(e, t, r) {
                a.get(e)[t] = r
            }

            var a = new WeakMap;
            return {
                get: e, remove: t, update: r, dispose: function () {
                    a = new WeakMap
                }
            }
        }

        function be(e, t) {
            return e.groupOrder === t.groupOrder ? e.renderOrder === t.renderOrder ? e.program && t.program && e.program !== t.program ? e.program.id - t.program.id : e.material.id === t.material.id ? e.z === t.z ? e.id - t.id : e.z - t.z : e.material.id - t.material.id : e.renderOrder - t.renderOrder : e.groupOrder - t.groupOrder
        }

        function Me(e, t) {
            return e.groupOrder === t.groupOrder ? e.renderOrder === t.renderOrder ? e.z === t.z ? e.id - t.id : t.z - e.z : e.renderOrder - t.renderOrder : e.groupOrder - t.groupOrder
        }

        function Se() {
            function e(e, a, i, n, o, s) {
                var l = t[r];
                return void 0 === l ? (l = {
                    id: e.id,
                    object: e,
                    geometry: a,
                    material: i,
                    program: i.program,
                    groupOrder: n,
                    renderOrder: e.renderOrder,
                    z: o,
                    group: s
                }, t[r] = l) : (l.id = e.id, l.object = e, l.geometry = a, l.material = i, l.program = i.program, l.groupOrder = n, l.renderOrder = e.renderOrder, l.z = o, l.group = s), r++, l
            }

            var t = [], r = 0, a = [], i = [];
            return {
                opaque: a, transparent: i, init: function () {
                    r = 0, a.length = 0, i.length = 0
                }, push: function (t, r, n, o, s, l) {
                    var d = e(t, r, n, o, s, l);
                    (!0 === n.transparent ? i : a).push(d)
                }, unshift: function (t, r, n, o, s, l) {
                    var d = e(t, r, n, o, s, l);
                    (!0 === n.transparent ? i : a).unshift(d)
                }, sort: function () {
                    1 < a.length && a.sort(be), 1 < i.length && i.sort(Me)
                }
            }
        }

        function Le() {
            function e(t) {
                var a = t.target;
                a.removeEventListener("dispose", e), delete r[a.id]
            }

            function t(t, a) {
                var i = r[t.id], n;
                return void 0 === i ? (n = new Se, r[t.id] = {}, r[t.id][a.id] = n, t.addEventListener("dispose", e)) : (n = i[a.id], void 0 === n && (n = new Se, i[a.id] = n)), n
            }

            var r = {};
            return {
                get: t, dispose: function () {
                    r = {}
                }
            }
        }

        function Ee() {
            var e = {};
            return {
                get: function (t) {
                    if (void 0 !== e[t.id]) return e[t.id];
                    var r;
                    switch (t.type) {
                        case"DirectionalLight":
                            r = {
                                direction: new et.a,
                                color: new tt.a,
                                shadow: !1,
                                shadowBias: 0,
                                shadowRadius: 1,
                                shadowMapSize: new rt.a
                            };
                            break;
                        case"SpotLight":
                            r = {
                                position: new et.a,
                                direction: new et.a,
                                color: new tt.a,
                                distance: 0,
                                coneCos: 0,
                                penumbraCos: 0,
                                decay: 0,
                                shadow: !1,
                                shadowBias: 0,
                                shadowRadius: 1,
                                shadowMapSize: new rt.a
                            };
                            break;
                        case"PointLight":
                            r = {
                                position: new et.a,
                                color: new tt.a,
                                distance: 0,
                                decay: 0,
                                shadow: !1,
                                shadowBias: 0,
                                shadowRadius: 1,
                                shadowMapSize: new rt.a,
                                shadowCameraNear: 1,
                                shadowCameraFar: 1e3
                            };
                            break;
                        case"HemisphereLight":
                            r = {direction: new et.a, skyColor: new tt.a, groundColor: new tt.a};
                            break;
                        case"RectAreaLight":
                            r = {color: new tt.a, position: new et.a, halfWidth: new et.a, halfHeight: new et.a};
                    }
                    return e[t.id] = r, r
                }
            }
        }

        function Te() {
            var e = new Ee, t = {
                id: Et++,
                hash: {
                    stateID: -1,
                    directionalLength: -1,
                    pointLength: -1,
                    spotLength: -1,
                    rectAreaLength: -1,
                    hemiLength: -1,
                    shadowsLength: -1
                },
                ambient: [0, 0, 0],
                directional: [],
                directionalShadowMap: [],
                directionalShadowMatrix: [],
                spot: [],
                spotShadowMap: [],
                spotShadowMatrix: [],
                rectArea: [],
                point: [],
                pointShadowMap: [],
                pointShadowMatrix: [],
                hemi: []
            }, r = new et.a, a = new Qe.a, i = new Qe.a;
            return {
                setup: function (n, o, s) {
                    for (var d = 0, c = 0, p = 0, u = 0, m = 0, g = 0, f = 0, h = 0, v = s.matrixWorldInverse, x = 0, y = n.length; x < y; x++) {
                        var l = n[x], _ = l.color, b = l.intensity, M = l.distance,
                            S = l.shadow && l.shadow.map ? l.shadow.map.texture : null;
                        if (l.isAmbientLight) d += _.r * b, c += _.g * b, p += _.b * b; else if (l.isDirectionalLight) {
                            var L = e.get(l);
                            if (L.color.copy(l.color).multiplyScalar(l.intensity), L.direction.setFromMatrixPosition(l.matrixWorld), r.setFromMatrixPosition(l.target.matrixWorld), L.direction.sub(r), L.direction.transformDirection(v), L.shadow = l.castShadow, l.castShadow) {
                                var E = l.shadow;
                                L.shadowBias = E.bias, L.shadowRadius = E.radius, L.shadowMapSize = E.mapSize
                            }
                            t.directionalShadowMap[u] = S, t.directionalShadowMatrix[u] = l.shadow.matrix, t.directional[u] = L, u++
                        } else if (l.isSpotLight) {
                            var L = e.get(l);
                            if (L.position.setFromMatrixPosition(l.matrixWorld), L.position.applyMatrix4(v), L.color.copy(_).multiplyScalar(b), L.distance = M, L.direction.setFromMatrixPosition(l.matrixWorld), r.setFromMatrixPosition(l.target.matrixWorld), L.direction.sub(r), L.direction.transformDirection(v), L.coneCos = ke(l.angle), L.penumbraCos = ke(l.angle * (1 - l.penumbra)), L.decay = l.decay, L.shadow = l.castShadow, l.castShadow) {
                                var E = l.shadow;
                                L.shadowBias = E.bias, L.shadowRadius = E.radius, L.shadowMapSize = E.mapSize
                            }
                            t.spotShadowMap[g] = S, t.spotShadowMatrix[g] = l.shadow.matrix, t.spot[g] = L, g++
                        } else if (l.isRectAreaLight) {
                            var L = e.get(l);
                            L.color.copy(_).multiplyScalar(b), L.position.setFromMatrixPosition(l.matrixWorld), L.position.applyMatrix4(v), i.identity(), a.copy(l.matrixWorld), a.premultiply(v), i.extractRotation(a), L.halfWidth.set(.5 * l.width, 0, 0), L.halfHeight.set(0, .5 * l.height, 0), L.halfWidth.applyMatrix4(i), L.halfHeight.applyMatrix4(i), t.rectArea[f] = L, f++
                        } else if (l.isPointLight) {
                            var L = e.get(l);
                            if (L.position.setFromMatrixPosition(l.matrixWorld), L.position.applyMatrix4(v), L.color.copy(l.color).multiplyScalar(l.intensity), L.distance = l.distance, L.decay = l.decay, L.shadow = l.castShadow, l.castShadow) {
                                var E = l.shadow;
                                L.shadowBias = E.bias, L.shadowRadius = E.radius, L.shadowMapSize = E.mapSize, L.shadowCameraNear = E.camera.near, L.shadowCameraFar = E.camera.far
                            }
                            t.pointShadowMap[m] = S, t.pointShadowMatrix[m] = l.shadow.matrix, t.point[m] = L, m++
                        } else if (l.isHemisphereLight) {
                            var L = e.get(l);
                            L.direction.setFromMatrixPosition(l.matrixWorld), L.direction.transformDirection(v), L.direction.normalize(), L.skyColor.copy(l.color).multiplyScalar(b), L.groundColor.copy(l.groundColor).multiplyScalar(b), t.hemi[h] = L, h++
                        }
                    }
                    t.ambient[0] = d, t.ambient[1] = c, t.ambient[2] = p, t.directional.length = u, t.spot.length = g, t.rectArea.length = f, t.point.length = m, t.hemi.length = h, t.hash.stateID = t.id, t.hash.directionalLength = u, t.hash.pointLength = m, t.hash.spotLength = g, t.hash.rectAreaLength = f, t.hash.hemiLength = h, t.hash.shadowsLength = o.length
                }, state: t
            }
        }

        function we() {
            var e = new Te, t = [], r = [];
            return {
                init: function () {
                    t.length = 0, r.length = 0
                }, state: {lightsArray: t, shadowsArray: r, lights: e}, setupLights: function (a) {
                    e.setup(t, r, a)
                }, pushLight: function (e) {
                    t.push(e)
                }, pushShadow: function (e) {
                    r.push(e)
                }
            }
        }

        function Pe() {
            function e(t) {
                var a = t.target;
                a.removeEventListener("dispose", e), delete r[a.id]
            }

            function t(t, a) {
                var i;
                return void 0 === r[t.id] ? (i = new we, r[t.id] = {}, r[t.id][a.id] = i, t.addEventListener("dispose", e)) : void 0 === r[t.id][a.id] ? (i = new we, r[t.id][a.id] = i) : i = r[t.id][a.id], i
            }

            var r = {};
            return {
                get: t, dispose: function () {
                    r = {}
                }
            }
        }

        function Ce(e, t, r) {
            this.width = e, this.height = t, this.scissor = new ot.a(0, 0, e, t), this.scissorTest = !1, this.viewport = new ot.a(0, 0, e, t), r = r || {}, this.texture = new Je.a(void 0, void 0, r.wrapS, r.wrapT, r.magFilter, r.minFilter, r.format, r.type, r.anisotropy, r.encoding), this.texture.generateMipmaps = void 0 !== r.generateMipmaps && r.generateMipmaps, this.texture.minFilter = void 0 === r.minFilter ? je.M : r.minFilter, this.depthBuffer = void 0 === r.depthBuffer || r.depthBuffer, this.stencilBuffer = void 0 === r.stencilBuffer || r.stencilBuffer, this.depthTexture = void 0 === r.depthTexture ? null : r.depthTexture
        }

        function Ae(e) {
            wt.a.call(this), this.type = "MeshDepthMaterial", this.depthPacking = je.h, this.skinning = !1, this.morphTargets = !1, this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.wireframe = !1, this.wireframeLinewidth = 1, this.fog = !1, this.lights = !1, this.setValues(e)
        }

        function De(e) {
            wt.a.call(this), this.type = "MeshDistanceMaterial", this.referencePosition = new et.a, this.nearDistance = 1, this.farDistance = 1e3, this.skinning = !1, this.morphTargets = !1, this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.fog = !1, this.lights = !1, this.setValues(e)
        }

        function Re(e, t, r) {
            function a(t, r, a, i, n, o) {
                var s = t.geometry, l = null, d = g, c = t.customDepthMaterial;
                if (a && (d = f, c = t.customDistanceMaterial), !c) {
                    var p = !1;
                    r.morphTargets && (s && s.isBufferGeometry ? p = s.morphAttributes && s.morphAttributes.position && 0 < s.morphAttributes.position.length : s && s.isGeometry && (p = s.morphTargets && 0 < s.morphTargets.length)), t.isSkinnedMesh && !1 === r.skinning && console.warn("THREE.WebGLShadowMap: THREE.SkinnedMesh with material.skinning set to false:", t);
                    var x = t.isSkinnedMesh && r.skinning, y = 0;
                    p && (y |= u), x && (y |= m), l = d[y]
                } else l = c;
                if (e.localClippingEnabled && !0 === r.clipShadows && 0 !== r.clippingPlanes.length) {
                    var _ = l.uuid, b = r.uuid, M = h[_];
                    void 0 === M && (M = {}, h[_] = M);
                    var S = M[b];
                    void 0 === S && (S = l.clone(), M[b] = S), l = S
                }
                return l.visible = r.visible, l.wireframe = r.wireframe, l.side = null == r.shadowSide ? v[r.side] : r.shadowSide, l.clipShadows = r.clipShadows, l.clippingPlanes = r.clippingPlanes, l.clipIntersection = r.clipIntersection, l.wireframeLinewidth = r.wireframeLinewidth, l.linewidth = r.linewidth, a && l.isMeshDistanceMaterial && (l.referencePosition.copy(i), l.nearDistance = n, l.farDistance = o), l
            }

            function n(r, s, d, c) {
                if (!1 !== r.visible) {
                    var u = r.layers.test(s.layers);
                    if (u && (r.isMesh || r.isLine || r.isPoints) && r.castShadow && (!r.frustumCulled || o.intersectsObject(r))) {
                        r.modelViewMatrix.multiplyMatrices(d.matrixWorldInverse, r.matrixWorld);
                        var m = t.update(r), g = r.material;
                        if (Array.isArray(g)) for (var f = m.groups, h = 0, v = f.length; h < v; h++) {
                            var x = f[h], y = g[x.materialIndex];
                            if (y && y.visible) {
                                var _ = a(r, y, c, p, d.near, d.far);
                                e.renderBufferDirect(d, null, m, _, r, x)
                            }
                        } else if (g.visible) {
                            var _ = a(r, g, c, p, d.near, d.far);
                            e.renderBufferDirect(d, null, m, _, r, null)
                        }
                    }
                    for (var b = r.children, M = 0, i = b.length; M < i; M++) n(b[M], s, d, c)
                }
            }

            for (var o = new Ze.a, s = new Qe.a, l = new rt.a, d = new rt.a(r, r), c = new et.a, p = new et.a, u = 1, m = 2, g = [, , , ,], f = [, , , ,], h = {}, v = {
                0: je.g,
                1: je.D,
                2: je.v
            }, x = [new et.a(1, 0, 0), new et.a(-1, 0, 0), new et.a(0, 0, 1), new et.a(0, 0, -1), new et.a(0, 1, 0), new et.a(0, -1, 0)], y = [new et.a(0, 1, 0), new et.a(0, 1, 0), new et.a(0, 1, 0), new et.a(0, 1, 0), new et.a(0, 0, 1), new et.a(0, 0, -1)], _ = [new ot.a, new ot.a, new ot.a, new ot.a, new ot.a, new ot.a], b = 0; b !== (u | m) + 1; ++b) {
                var i = 0 != (b & u), M = 0 != (b & m), S = new Ae({depthPacking: je.qb, morphTargets: i, skinning: M});
                g[b] = S;
                var L = new De({morphTargets: i, skinning: M});
                f[b] = L
            }
            var E = this;
            this.enabled = !1, this.autoUpdate = !0, this.needsUpdate = !1, this.type = je.nb, this.render = function (t, r, a) {
                if (!1 !== E.enabled && (!1 !== E.autoUpdate || !1 !== E.needsUpdate) && 0 !== t.length) {
                    var u = e.state;
                    u.setBlending(je.cb), u.buffers.color.setClear(1, 1, 1, 1), u.buffers.depth.setTest(!0), u.setScissorTest(!1);
                    for (var m = 0, i = t.length, g; m < i; m++) {
                        var f = t[m], h = f.shadow, v = f && f.isPointLight;
                        if (void 0 === h) {
                            console.warn("THREE.WebGLShadowMap:", f, "has no shadow.");
                            continue
                        }
                        var b = h.camera;
                        if (l.copy(h.mapSize), l.min(d), v) {
                            var M = l.x, S = l.y;
                            _[0].set(2 * M, S, M, S), _[1].set(0, S, M, S), _[2].set(3 * M, S, M, S), _[3].set(M, S, M, S), _[4].set(3 * M, 0, M, S), _[5].set(M, 0, M, S), l.x *= 4, l.y *= 2
                        }
                        if (null === h.map) {
                            var L = {minFilter: je.Y, magFilter: je.Y, format: je.rb};
                            h.map = new Ce(l.x, l.y, L), h.map.texture.name = f.name + ".shadowMap", b.updateProjectionMatrix()
                        }
                        h.isSpotLightShadow && h.update(f);
                        var T = h.map, w = h.matrix;
                        p.setFromMatrixPosition(f.matrixWorld), b.position.copy(p), v ? (g = 6, w.makeTranslation(-p.x, -p.y, -p.z)) : (g = 1, c.setFromMatrixPosition(f.target.matrixWorld), b.lookAt(c), b.updateMatrixWorld(), w.set(.5, 0, 0, .5, 0, .5, 0, .5, 0, 0, .5, .5, 0, 0, 0, 1), w.multiply(b.projectionMatrix), w.multiply(b.matrixWorldInverse)), e.setRenderTarget(T), e.clear();
                        for (var P = 0; P < g; P++) {
                            if (v) {
                                c.copy(b.position), c.add(x[P]), b.up.copy(y[P]), b.lookAt(c), b.updateMatrixWorld();
                                var C = _[P];
                                u.viewport(C)
                            }
                            s.multiplyMatrices(b.projectionMatrix, b.matrixWorldInverse), o.setFromMatrix(s), n(r, a, b, v)
                        }
                    }
                    E.needsUpdate = !1
                }
            }
        }

        function Ne(e, t, r, a) {
            function i(t, r, a) {
                var n = new Uint8Array(4), o = e.createTexture();
                e.bindTexture(t, o), e.texParameteri(t, 10241, 9728), e.texParameteri(t, 10240, 9728);
                for (var s = 0; s < a; s++) e.texImage2D(r + s, 0, 6408, 1, 1, 0, 6408, 5121, n);
                return o
            }

            function n(r, i) {
                if (S[r] = 1, 0 === L[r] && (e.enableVertexAttribArray(r), L[r] = 1), E[r] !== i) {
                    var n = a.isWebGL2 ? e : t.get("ANGLE_instanced_arrays");
                    n[a.isWebGL2 ? "vertexAttribDivisor" : "vertexAttribDivisorANGLE"](r, i), E[r] = i
                }
            }

            function o(t) {
                !0 !== T[t] && (e.enable(t), T[t] = !0)
            }

            function s(t) {
                !1 !== T[t] && (e.disable(t), T[t] = !1)
            }

            function l() {
                if (null === w && (w = [], t.get("WEBGL_compressed_texture_pvrtc") || t.get("WEBGL_compressed_texture_s3tc") || t.get("WEBGL_compressed_texture_etc1") || t.get("WEBGL_compressed_texture_astc"))) for (var r = e.getParameter(34467), a = 0; a < r.length; a++) w.push(r[a]);
                return w
            }

            function d(t) {
                return P !== t && (e.useProgram(t), P = t, !0)
            }

            function c(t, a, i, n, l, d, c, p) {
                return t === je.cb ? void (C && (s(3042), C = !1)) : (C || (o(3042), C = !0), t === je.s ? void (l = l || a, d = d || i, c = c || n, (a !== D || l !== I) && (e.blendEquationSeparate(r.convert(a), r.convert(l)), D = a, I = l), (i !== R || n !== N || d !== z || c !== U) && (e.blendFuncSeparate(r.convert(i), r.convert(n), r.convert(d), r.convert(c)), R = i, N = n, z = d, U = c), A = t, F = null) : void ((t !== A || p !== F) && ((D !== je.b || I !== je.b) && (e.blendEquation(32774), D = je.b, I = je.b), p ? t === je.fb ? e.blendFuncSeparate(1, 771, 1, 771) : t === je.d ? e.blendFunc(1, 1) : t === je.ec ? e.blendFuncSeparate(0, 0, 769, 771) : t === je.W ? e.blendFuncSeparate(0, 768, 0, 770) : console.error("THREE.WebGLState: Invalid blending: ", t) : t === je.fb ? e.blendFuncSeparate(770, 771, 1, 771) : t === je.d ? e.blendFunc(770, 1) : t === je.ec ? e.blendFunc(0, 769) : t === je.W ? e.blendFunc(0, 768) : console.error("THREE.WebGLState: Invalid blending: ", t), R = null, N = null, z = null, U = null, A = t, F = p)))
            }

            function p(t) {
                G !== t && (t ? e.frontFace(2304) : e.frontFace(2305), G = t)
            }

            function u(t) {
                t === je.r ? s(2884) : (o(2884), t !== O && (t === je.p ? e.cullFace(1029) : t === je.q ? e.cullFace(1028) : e.cullFace(1032))), O = t
            }

            function m(t) {
                t !== B && (W && e.lineWidth(t), B = t)
            }

            function g(t, r, a) {
                t ? (o(32823), (V !== r || H !== a) && (e.polygonOffset(r, a), V = r, H = a)) : s(32823)
            }

            function f(t) {
                void 0 === t && (t = 33984 + k - 1), j !== t && (e.activeTexture(t), j = t)
            }

            function h(t, r) {
                null === j && f();
                var a = Y[j];
                void 0 === a && (a = {
                    type: void 0,
                    texture: void 0
                }, Y[j] = a), (a.type !== t || a.texture !== r) && (e.bindTexture(t, r || Q[t]), a.type = t, a.texture = r)
            }

            function v(t) {
                !1 === J.equals(t) && (e.scissor(t.x, t.y, t.z, t.w), J.copy(t))
            }

            function x(t) {
                !1 === Z.equals(t) && (e.viewport(t.x, t.y, t.z, t.w), Z.copy(t))
            }

            var y = new function () {
                    var t = !1, i = new ot.a, r = null, n = new ot.a(0, 0, 0, 0);
                    return {
                        setMask: function (a) {
                            r === a || t || (e.colorMask(a, a, a, a), r = a)
                        }, setLocked: function (e) {
                            t = e
                        }, setClear: function (t, r, o, s, a) {
                            !0 === a && (t *= s, r *= s, o *= s), i.set(t, r, o, s), !1 === n.equals(i) && (e.clearColor(t, r, o, s), n.copy(i))
                        }, reset: function () {
                            t = !1, r = null, n.set(-1, 0, 0, 0)
                        }
                    }
                }, _ = new function () {
                    var t = !1, r = null, a = null, i = null;
                    return {
                        setTest: function (e) {
                            e ? o(2929) : s(2929)
                        }, setMask: function (a) {
                            r === a || t || (e.depthMask(a), r = a)
                        }, setFunc: function (t) {
                            a !== t && (t ? t === je.bb ? e.depthFunc(512) : t === je.f ? e.depthFunc(519) : t === je.J ? e.depthFunc(513) : t === je.K ? e.depthFunc(515) : t === je.y ? e.depthFunc(514) : t === je.G ? e.depthFunc(518) : t === je.F ? e.depthFunc(516) : t === je.gb ? e.depthFunc(517) : e.depthFunc(515) : e.depthFunc(515), a = t)
                        }, setLocked: function (e) {
                            t = e
                        }, setClear: function (t) {
                            i !== t && (e.clearDepth(t), i = t)
                        }, reset: function () {
                            t = !1, r = null, a = null, i = null
                        }
                    }
                }, b = new function () {
                    var t = !1, r = null, a = null, i = null, n = null, l = null, d = null, c = null, p = null;
                    return {
                        setTest: function (e) {
                            e ? o(2960) : s(2960)
                        }, setMask: function (a) {
                            r === a || t || (e.stencilMask(a), r = a)
                        }, setFunc: function (t, r, o) {
                            (a !== t || i !== r || n !== o) && (e.stencilFunc(t, r, o), a = t, i = r, n = o)
                        }, setOp: function (t, r, a) {
                            (l !== t || d !== r || c !== a) && (e.stencilOp(t, r, a), l = t, d = r, c = a)
                        }, setLocked: function (e) {
                            t = e
                        }, setClear: function (t) {
                            p !== t && (e.clearStencil(t), p = t)
                        }, reset: function () {
                            t = !1, r = null, a = null, i = null, n = null, l = null, d = null, c = null, p = null
                        }
                    }
                }, M = e.getParameter(34921), S = new Uint8Array(M), L = new Uint8Array(M), E = new Uint8Array(M), T = {},
                w = null, P = null, C = null, A = null, D = null, R = null, N = null, I = null, z = null, U = null,
                F = !1, G = null, O = null, B = null, V = null, H = null, k = e.getParameter(35661), W = !1, q = 0,
                X = e.getParameter(7938);
            -1 === X.indexOf("WebGL") ? -1 !== X.indexOf("OpenGL ES") && (q = parseFloat(/^OpenGL\ ES\ ([0-9])/.exec(X)[1]), W = 2 <= q) : (q = parseFloat(/^WebGL\ ([0-9])/.exec(X)[1]), W = 1 <= q);
            var j = null, Y = {}, J = new ot.a, Z = new ot.a, Q = {};
            return Q[3553] = i(3553, 3553, 1), Q[34067] = i(34067, 34069, 6), y.setClear(0, 0, 0, 1), _.setClear(1), b.setClear(0), o(2929), _.setFunc(je.K), p(!1), u(je.p), o(2884), c(je.cb), {
                buffers: {color: y, depth: _, stencil: b},
                initAttributes: function () {
                    for (var e = 0, t = S.length; e < t; e++) S[e] = 0
                },
                enableAttribute: function (e) {
                    n(e, 0)
                },
                enableAttributeAndDivisor: n,
                disableUnusedAttributes: function () {
                    for (var t = 0, r = L.length; t !== r; ++t) L[t] !== S[t] && (e.disableVertexAttribArray(t), L[t] = 0)
                },
                enable: o,
                disable: s,
                getCompressedTextureFormats: l,
                useProgram: d,
                setBlending: c,
                setMaterial: function (e, t) {
                    e.side === je.v ? s(2884) : o(2884);
                    var r = e.side === je.g;
                    t && (r = !r), p(r), e.blending === je.fb && !1 === e.transparent ? c(je.cb) : c(e.blending, e.blendEquation, e.blendSrc, e.blendDst, e.blendEquationAlpha, e.blendSrcAlpha, e.blendDstAlpha, e.premultipliedAlpha), _.setFunc(e.depthFunc), _.setTest(e.depthTest), _.setMask(e.depthWrite), y.setMask(e.colorWrite), g(e.polygonOffset, e.polygonOffsetFactor, e.polygonOffsetUnits)
                },
                setFlipSided: p,
                setCullFace: u,
                setLineWidth: m,
                setPolygonOffset: g,
                setScissorTest: function (e) {
                    e ? o(3089) : s(3089)
                },
                activeTexture: f,
                bindTexture: h,
                compressedTexImage2D: function () {
                    try {
                        e.compressedTexImage2D.apply(e, arguments)
                    } catch (e) {
                        console.error("THREE.WebGLState:", e)
                    }
                },
                texImage2D: function () {
                    try {
                        e.texImage2D.apply(e, arguments)
                    } catch (e) {
                        console.error("THREE.WebGLState:", e)
                    }
                },
                texImage3D: function () {
                    try {
                        e.texImage3D.apply(e, arguments)
                    } catch (e) {
                        console.error("THREE.WebGLState:", e)
                    }
                },
                scissor: v,
                viewport: x,
                reset: function () {
                    for (var t = 0; t < L.length; t++) 1 === L[t] && (e.disableVertexAttribArray(t), L[t] = 0);
                    T = {}, w = null, j = null, Y = {}, P = null, A = null, G = null, O = null, y.reset(), _.reset(), b.reset()
                }
            }
        }

        function Ie(e, t, r, a, n, o, s) {
            function l(e, t, r, a) {
                var i = 1;
                if ((e.width > a || e.height > a) && (i = a / qe(e.width, e.height)), 1 > i || !0 === t) {
                    if (e instanceof HTMLImageElement || e instanceof HTMLCanvasElement || e instanceof ImageBitmap) {
                        void 0 === P && (P = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas"));
                        var n = r ? document.createElementNS("http://www.w3.org/1999/xhtml", "canvas") : P,
                            o = t ? Ye.a.floorPowerOfTwo : He;
                        n.width = o(i * e.width), n.height = o(i * e.height);
                        var s = n.getContext("2d");
                        return s.drawImage(e, 0, 0, n.width, n.height), console.warn("THREE.WebGLRenderer: Texture has been resized from (" + e.width + "x" + e.height + ") to (" + n.width + "x" + n.height + ")."), n
                    }
                    return "data" in e && console.warn("THREE.WebGLRenderer: Image in DataTexture is too big (" + e.width + "x" + e.height + ")."), e
                }
                return e
            }

            function d(e) {
                return Ye.a.isPowerOfTwo(e.width) && Ye.a.isPowerOfTwo(e.height)
            }

            function c(e) {
                return !n.isWebGL2 && (e.wrapS !== je.k || e.wrapT !== je.k || e.minFilter !== je.Y && e.minFilter !== je.M)
            }

            function p(e, t) {
                return e.generateMipmaps && t && e.minFilter !== je.Y && e.minFilter !== je.M
            }

            function u(t, r, i, n) {
                e.generateMipmap(t);
                var o = a.get(r);
                o.__maxMipLevel = Ve(qe(i, n)) * Math.LOG2E
            }

            function m(e, r) {
                if (!n.isWebGL2) return e;
                var a = e;
                return 6403 === e && (5126 === r && (a = 33326), 5131 === r && (a = 33325), 5121 === r && (a = 33321)), 6407 === e && (5126 === r && (a = 34837), 5131 === r && (a = 34843), 5121 === r && (a = 32849)), 6408 === e && (5126 === r && (a = 34836), 5131 === r && (a = 34842), 5121 === r && (a = 32856)), 33325 === a || 33326 === a || 34842 === a || 34836 === a ? t.get("EXT_color_buffer_float") : (34843 == a || 34837 == a) && console.warn("THREE.WebGLRenderer: Floating point textures with RGB format not supported. Please use RGBA instead."), a
            }

            function i(e) {
                return e === je.Y || e === je.ab || e === je.Z ? 9728 : 9729
            }

            function g(e) {
                var t = e.target;
                t.removeEventListener("dispose", g), h(t), t.isVideoTexture && delete w[t.id], s.memory.textures--
            }

            function f(e) {
                var t = e.target;
                t.removeEventListener("dispose", f), v(t), s.memory.textures--
            }

            function h(t) {
                var r = a.get(t);
                if (t.image && r.__image__webglTextureCube) e.deleteTexture(r.__image__webglTextureCube); else {
                    if (void 0 === r.__webglInit) return;
                    e.deleteTexture(r.__webglTexture)
                }
                a.remove(t)
            }

            function v(t) {
                var r = a.get(t), n = a.get(t.texture);
                if (t) {
                    if (void 0 !== n.__webglTexture && e.deleteTexture(n.__webglTexture), t.depthTexture && t.depthTexture.dispose(), t.isWebGLRenderTargetCube) for (var o = 0; 6 > o; o++) e.deleteFramebuffer(r.__webglFramebuffer[o]), r.__webglDepthbuffer && e.deleteRenderbuffer(r.__webglDepthbuffer[o]); else e.deleteFramebuffer(r.__webglFramebuffer), r.__webglDepthbuffer && e.deleteRenderbuffer(r.__webglDepthbuffer);
                    a.remove(t.texture), a.remove(t)
                }
            }

            function x(e, t) {
                var i = a.get(e);
                if (e.isVideoTexture && T(e), 0 < e.version && i.__version !== e.version) {
                    var n = e.image;
                    if (void 0 === n) console.warn("THREE.WebGLRenderer: Texture marked for update but image is undefined"); else if (!1 === n.complete) console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete"); else return void _(i, e, t)
                }
                r.activeTexture(33984 + t), r.bindTexture(3553, i.__webglTexture)
            }

            function y(r, s, l) {
                var d;
                if (l ? (e.texParameteri(r, 10242, o.convert(s.wrapS)), e.texParameteri(r, 10243, o.convert(s.wrapT)), e.texParameteri(r, 10240, o.convert(s.magFilter)), e.texParameteri(r, 10241, o.convert(s.minFilter))) : (e.texParameteri(r, 10242, 33071), e.texParameteri(r, 10243, 33071), (s.wrapS !== je.k || s.wrapT !== je.k) && console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."), e.texParameteri(r, 10240, i(s.magFilter)), e.texParameteri(r, 10241, i(s.minFilter)), s.minFilter !== je.Y && s.minFilter !== je.M && console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")), d = t.get("EXT_texture_filter_anisotropic"), d) {
                    if (s.type === je.C && null === t.get("OES_texture_float_linear")) return;
                    if (s.type === je.H && null === (n.isWebGL2 || t.get("OES_texture_half_float_linear"))) return;
                    (1 < s.anisotropy || a.get(s).__currentAnisotropy) && (e.texParameterf(r, d.TEXTURE_MAX_ANISOTROPY_EXT, Xe(s.anisotropy, n.getMaxAnisotropy())), a.get(s).__currentAnisotropy = s.anisotropy)
                }
            }

            function _(t, a, f) {
                var h;
                h = a.isDataTexture3D ? 32879 : 3553, void 0 === t.__webglInit && (t.__webglInit = !0, a.addEventListener("dispose", g), t.__webglTexture = e.createTexture(), s.memory.textures++), r.activeTexture(33984 + f), r.bindTexture(h, t.__webglTexture), e.pixelStorei(37440, a.flipY), e.pixelStorei(37441, a.premultiplyAlpha), e.pixelStorei(3317, a.unpackAlignment);
                var v = c(a) && !1 === d(a.image), x = l(a.image, v, !1, n.maxTextureSize), _ = d(x) || n.isWebGL2,
                    b = o.convert(a.format), M = o.convert(a.type), S = m(b, M);
                y(h, a, _);
                var L = a.mipmaps, E;
                if (a.isDepthTexture) {
                    if (S = 6402, a.type === je.C) {
                        if (!n.isWebGL2) throw new Error("Float Depth Texture only supported in WebGL2.0");
                        S = 36012
                    } else n.isWebGL2 && (S = 33189);
                    a.format === je.t && 6402 === S && a.type !== je.qc && a.type !== je.mc && (console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."), a.type = je.qc, M = o.convert(a.type)), a.format === je.u && (S = 34041, a.type !== je.lc && (console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."), a.type = je.lc, M = o.convert(a.type))), r.texImage2D(3553, 0, S, x.width, x.height, 0, b, M, null)
                } else if (a.isDataTexture) {
                    if (0 < L.length && _) {
                        for (var T = 0, i = L.length; T < i; T++) E = L[T], r.texImage2D(3553, T, S, E.width, E.height, 0, b, M, E.data);
                        a.generateMipmaps = !1, t.__maxMipLevel = L.length - 1
                    } else r.texImage2D(3553, 0, S, x.width, x.height, 0, b, M, x.data), t.__maxMipLevel = 0;
                } else if (a.isCompressedTexture) {
                    for (var T = 0, i = L.length; T < i; T++) E = L[T], a.format !== je.rb && a.format !== je.Nb ? -1 < r.getCompressedTextureFormats().indexOf(b) ? r.compressedTexImage2D(3553, T, S, E.width, E.height, 0, E.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()") : r.texImage2D(3553, T, S, E.width, E.height, 0, b, M, E.data);
                    t.__maxMipLevel = L.length - 1
                } else if (a.isDataTexture3D) r.texImage3D(32879, 0, S, x.width, x.height, x.depth, 0, b, M, x.data), t.__maxMipLevel = 0; else if (0 < L.length && _) {
                    for (var T = 0, i = L.length; T < i; T++) E = L[T], r.texImage2D(3553, T, S, b, M, E);
                    a.generateMipmaps = !1, t.__maxMipLevel = L.length - 1
                } else r.texImage2D(3553, 0, S, b, M, x), t.__maxMipLevel = 0;
                p(a, _) && u(3553, a, x.width, x.height), t.__version = a.version, a.onUpdate && a.onUpdate(a)
            }

            function b(t, i, n, s) {
                var l = o.convert(i.texture.format), d = o.convert(i.texture.type), c = m(l, d);
                r.texImage2D(s, 0, c, i.width, i.height, 0, l, d, null), e.bindFramebuffer(36160, t), e.framebufferTexture2D(36160, n, s, a.get(i.texture).__webglTexture, 0), e.bindFramebuffer(36160, null)
            }

            function M(t, r, a) {
                if (e.bindRenderbuffer(36161, t), r.depthBuffer && !r.stencilBuffer) {
                    if (a) {
                        var i = E(r);
                        e.renderbufferStorageMultisample(36161, i, 33189, r.width, r.height)
                    } else e.renderbufferStorage(36161, 33189, r.width, r.height);
                    e.framebufferRenderbuffer(36160, 36096, 36161, t)
                } else if (r.depthBuffer && r.stencilBuffer) {
                    if (a) {
                        var i = E(r);
                        e.renderbufferStorageMultisample(36161, i, 34041, r.width, r.height)
                    } else e.renderbufferStorage(36161, 34041, r.width, r.height);
                    e.framebufferRenderbuffer(36160, 33306, 36161, t)
                } else {
                    var n = o.convert(r.texture.format), s = o.convert(r.texture.type), l = m(n, s);
                    if (a) {
                        var i = E(r);
                        e.renderbufferStorageMultisample(36161, i, l, r.width, r.height)
                    } else e.renderbufferStorage(36161, l, r.width, r.height)
                }
                e.bindRenderbuffer(36161, null)
            }

            function S(t, r) {
                var i = r && r.isWebGLRenderTargetCube;
                if (i) throw new Error("Depth Texture with cube render targets is not supported");
                if (e.bindFramebuffer(36160, t), !(r.depthTexture && r.depthTexture.isDepthTexture)) throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");
                a.get(r.depthTexture).__webglTexture && r.depthTexture.image.width === r.width && r.depthTexture.image.height === r.height || (r.depthTexture.image.width = r.width, r.depthTexture.image.height = r.height, r.depthTexture.needsUpdate = !0), x(r.depthTexture, 0);
                var n = a.get(r.depthTexture).__webglTexture;
                if (r.depthTexture.format === je.t) e.framebufferTexture2D(36160, 36096, 3553, n, 0); else if (r.depthTexture.format === je.u) e.framebufferTexture2D(36160, 33306, 3553, n, 0); else throw new Error("Unknown depthTexture format")
            }

            function L(t) {
                var r = a.get(t), n = !0 === t.isWebGLRenderTargetCube;
                if (t.depthTexture) {
                    if (n) throw new Error("target.depthTexture not supported in Cube render targets");
                    S(r.__webglFramebuffer, t)
                } else if (n) {
                    r.__webglDepthbuffer = [];
                    for (var o = 0; 6 > o; o++) e.bindFramebuffer(36160, r.__webglFramebuffer[o]), r.__webglDepthbuffer[o] = e.createRenderbuffer(), M(r.__webglDepthbuffer[o], t)
                } else e.bindFramebuffer(36160, r.__webglFramebuffer), r.__webglDepthbuffer = e.createRenderbuffer(), M(r.__webglDepthbuffer, t);
                e.bindFramebuffer(36160, null)
            }

            function E(e) {
                return n.isWebGL2 && e.isWebGLMultisampleRenderTarget ? Xe(n.maxSamples, e.samples) : 0
            }

            function T(e) {
                var t = e.id, r = s.render.frame;
                w[t] !== r && (w[t] = r, e.update())
            }

            var w = {}, P;
            this.setTexture2D = x, this.setTexture3D = function (e, t) {
                var i = a.get(e);
                return 0 < e.version && i.__version !== e.version ? void _(i, e, t) : void (r.activeTexture(33984 + t), r.bindTexture(32879, i.__webglTexture))
            }, this.setTextureCube = function (t, c) {
                var f = a.get(t);
                if (6 === t.image.length) if (0 < t.version && f.__version !== t.version) {
                    f.__image__webglTextureCube || (t.addEventListener("dispose", g), f.__image__webglTextureCube = e.createTexture(), s.memory.textures++), r.activeTexture(33984 + c), r.bindTexture(34067, f.__image__webglTextureCube), e.pixelStorei(37440, t.flipY);
                    for (var h = t && t.isCompressedTexture, v = t.image[0] && t.image[0].isDataTexture, x = [], _ = 0; 6 > _; _++) x[_] = h || v ? v ? t.image[_].image : t.image[_] : l(t.image[_], !1, !0, n.maxCubemapSize);
                    var i = x[0], b = d(i) || n.isWebGL2, M = o.convert(t.format), S = o.convert(t.type), L = m(M, S);
                    y(34067, t, b);
                    for (var _ = 0; 6 > _; _++) if (!h) v ? r.texImage2D(34069 + _, 0, L, x[_].width, x[_].height, 0, M, S, x[_].data) : r.texImage2D(34069 + _, 0, L, M, S, x[_]); else for (var E = x[_].mipmaps, T = 0, w = E.length, P; T < w; T++) P = E[T], t.format !== je.rb && t.format !== je.Nb ? -1 < r.getCompressedTextureFormats().indexOf(M) ? r.compressedTexImage2D(34069 + _, T, L, P.width, P.height, 0, P.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()") : r.texImage2D(34069 + _, T, L, P.width, P.height, 0, M, S, P.data);
                    f.__maxMipLevel = h ? E.length - 1 : 0, p(t, b) && u(34067, t, i.width, i.height), f.__version = t.version, t.onUpdate && t.onUpdate(t)
                } else r.activeTexture(33984 + c), r.bindTexture(34067, f.__image__webglTextureCube)
            }, this.setTextureCubeDynamic = function (e, t) {
                r.activeTexture(33984 + t), r.bindTexture(34067, a.get(e).__webglTexture)
            }, this.setupRenderTarget = function (t) {
                var l = a.get(t), c = a.get(t.texture);
                t.addEventListener("dispose", f), c.__webglTexture = e.createTexture(), s.memory.textures++;
                var g = !0 === t.isWebGLRenderTargetCube, h = !0 === t.isWebGLMultisampleRenderTarget,
                    v = d(t) || n.isWebGL2;
                if (g) {
                    l.__webglFramebuffer = [];
                    for (var x = 0; 6 > x; x++) l.__webglFramebuffer[x] = e.createFramebuffer()
                } else if (l.__webglFramebuffer = e.createFramebuffer(), h) if (n.isWebGL2) {
                    l.__webglMultisampledFramebuffer = e.createFramebuffer(), l.__webglColorRenderbuffer = e.createRenderbuffer(), e.bindRenderbuffer(36161, l.__webglColorRenderbuffer);
                    var i = o.convert(t.texture.format), _ = o.convert(t.texture.type), S = m(i, _), T = E(t);
                    e.renderbufferStorageMultisample(36161, T, S, t.width, t.height), e.bindFramebuffer(36160, l.__webglMultisampledFramebuffer), e.framebufferRenderbuffer(36160, 36064, 36161, l.__webglColorRenderbuffer), e.bindRenderbuffer(36161, null), t.depthBuffer && (l.__webglDepthRenderbuffer = e.createRenderbuffer(), M(l.__webglDepthRenderbuffer, t, !0)), e.bindFramebuffer(36160, null)
                } else console.warn("THREE.WebGLRenderer: WebGLMultisampleRenderTarget can only be used with WebGL2.");
                if (g) {
                    r.bindTexture(34067, c.__webglTexture), y(34067, t.texture, v);
                    for (var x = 0; 6 > x; x++) b(l.__webglFramebuffer[x], t, 36064, 34069 + x);
                    p(t.texture, v) && u(34067, t.texture, t.width, t.height), r.bindTexture(34067, null)
                } else r.bindTexture(3553, c.__webglTexture), y(3553, t.texture, v), b(l.__webglFramebuffer, t, 36064, 3553), p(t.texture, v) && u(3553, t.texture, t.width, t.height), r.bindTexture(3553, null);
                t.depthBuffer && L(t)
            }, this.updateRenderTargetMipmap = function (e) {
                var t = e.texture, i = d(e) || n.isWebGL2;
                if (p(t, i)) {
                    var o = e.isWebGLRenderTargetCube ? 34067 : 3553, s = a.get(t).__webglTexture;
                    r.bindTexture(o, s), u(o, t, e.width, e.height), r.bindTexture(o, null)
                }
            }, this.updateMultisampleRenderTarget = function (t) {
                if (t.isWebGLMultisampleRenderTarget) if (n.isWebGL2) {
                    var r = a.get(t);
                    e.bindFramebuffer(36008, r.__webglMultisampledFramebuffer), e.bindFramebuffer(36009, r.__webglFramebuffer);
                    var i = t.width, o = t.height, s = 16384;
                    t.depthBuffer && (s |= 256), t.stencilBuffer && (s |= 1024), e.blitFramebuffer(0, 0, i, o, 0, 0, i, o, s, 9728)
                } else console.warn("THREE.WebGLRenderer: WebGLMultisampleRenderTarget can only be used with WebGL2.")
            }
        }

        function ze(e, t, r) {
            return {
                convert: function (e) {
                    var a;
                    if (e === je.Wb) return 10497;
                    if (e === je.k) return 33071;
                    if (e === je.U) return 33648;
                    if (e === je.Y) return 9728;
                    if (e === je.ab) return 9984;
                    if (e === je.Z) return 9986;
                    if (e === je.M) return 9729;
                    if (e === je.O) return 9985;
                    if (e === je.N) return 9987;
                    if (e === je.kc) return 5121;
                    if (e === je.nc) return 32819;
                    if (e === je.oc) return 32820;
                    if (e === je.pc) return 33635;
                    if (e === je.i) return 5120;
                    if (e === je.Yb) return 5122;
                    if (e === je.qc) return 5123;
                    if (e === je.I) return 5124;
                    if (e === je.mc) return 5125;
                    if (e === je.C) return 5126;
                    if (e === je.H) {
                        if (r.isWebGL2) return 5131;
                        if (a = t.get("OES_texture_half_float"), null !== a) return a.HALF_FLOAT_OES
                    }
                    if (e === je.e) return 6406;
                    if (e === je.Nb) return 6407;
                    if (e === je.rb) return 6408;
                    if (e === je.R) return 6409;
                    if (e === je.Q) return 6410;
                    if (e === je.t) return 6402;
                    if (e === je.u) return 34041;
                    if (e === je.Ub) return 6403;
                    if (e === je.b) return 32774;
                    if (e === je.dc) return 32778;
                    if (e === je.Xb) return 32779;
                    if (e === je.rc) return 0;
                    if (e === je.ib) return 1;
                    if (e === je.cc) return 768;
                    if (e === je.mb) return 769;
                    if (e === je.ac) return 770;
                    if (e === je.lb) return 771;
                    if (e === je.w) return 772;
                    if (e === je.jb) return 773;
                    if (e === je.x) return 774;
                    if (e === je.kb) return 775;
                    if (e === je.bc) return 776;
                    if ((e === je.Tb || e === je.Ib || e === je.Jb || e === je.Kb) && (a = t.get("WEBGL_compressed_texture_s3tc"), null !== a)) {
                        if (e === je.Tb) return a.COMPRESSED_RGB_S3TC_DXT1_EXT;
                        if (e === je.Ib) return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;
                        if (e === je.Jb) return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;
                        if (e === je.Kb) return a.COMPRESSED_RGBA_S3TC_DXT5_EXT
                    }
                    if ((e === je.Sb || e === je.Rb || e === je.Hb || e === je.Gb) && (a = t.get("WEBGL_compressed_texture_pvrtc"), null !== a)) {
                        if (e === je.Sb) return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
                        if (e === je.Rb) return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
                        if (e === je.Hb) return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
                        if (e === je.Gb) return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG
                    }
                    if (e === je.Qb && (a = t.get("WEBGL_compressed_texture_etc1"), null !== a)) return a.COMPRESSED_RGB_ETC1_WEBGL;
                    if ((e === je.yb || e === je.zb || e === je.Ab || e === je.Bb || e === je.Cb || e === je.Db || e === je.Eb || e === je.Fb || e === je.tb || e === je.ub || e === je.vb || e === je.sb || e === je.wb || e === je.xb) && (a = t.get("WEBGL_compressed_texture_astc"), null !== a)) return e;
                    if (e === je.T || e === je.S) {
                        if (r.isWebGL2) {
                            if (e === je.T) return 32775;
                            if (e === je.S) return 32776
                        }
                        if (a = t.get("EXT_blend_minmax"), null !== a) {
                            if (e === je.T) return a.MIN_EXT;
                            if (e === je.S) return a.MAX_EXT
                        }
                    }
                    if (e === je.lc) {
                        if (r.isWebGL2) return 34042;
                        if (a = t.get("WEBGL_depth_texture"), null !== a) return a.UNSIGNED_INT_24_8_WEBGL
                    }
                    return 0
                }
            }
        }

        function Ue(e) {
            At.a.call(this), this.cameras = e || []
        }

        function Fe(e, t, r) {
            Dt.setFromMatrixPosition(t.matrixWorld), Rt.setFromMatrixPosition(r.matrixWorld);
            var a = Dt.distanceTo(Rt), i = t.projectionMatrix.elements, n = r.projectionMatrix.elements,
                o = i[14] / (i[10] - 1), s = i[14] / (i[10] + 1), l = (i[9] + 1) / i[5], d = (i[9] - 1) / i[5],
                c = (i[8] - 1) / i[0], p = (n[8] + 1) / n[0], u = a / (-c + p), m = u * -c;
            t.matrixWorld.decompose(e.position, e.quaternion, e.scale), e.translateX(m), e.translateZ(u), e.matrixWorld.compose(e.position, e.quaternion, e.scale), e.matrixWorldInverse.getInverse(e.matrixWorld);
            var g = o + u, f = s + u;
            e.projectionMatrix.makePerspective(o * c - m, o * p + (a - m), l * s / f * g, d * s / f * g, g, f)
        }

        function Ge(e) {
            function t() {
                return null !== s && !0 === s.isPresenting
            }

            function r() {
                if (t()) {
                    var r = s.getEyeParameters("left"), a = r.renderWidth * m, i = r.renderHeight * m;
                    S = e.getPixelRatio(), M = e.getSize(), e.setDrawingBufferSize(2 * a, i, 1), L.start()
                } else o.enabled && e.setDrawingBufferSize(M.width, M.height, S), L.stop()
            }

            function a(e) {
                for (var t = navigator.getGamepads && navigator.getGamepads(), r = 0, a = 0, i = t.length, n; r < i; r++) if (n = t[r], n && ("Daydream Controller" === n.id || "Gear VR Controller" === n.id || "Oculus Go Controller" === n.id || "OpenVR Gamepad" === n.id || n.id.startsWith("Oculus Touch") || n.id.startsWith("Spatial Controller"))) {
                    if (a === e) return n;
                    a++
                }
            }

            function n() {
                for (var e = 0; e < c.length; e++) {
                    var t = c[e], r = a(e);
                    if (void 0 !== r && void 0 !== r.pose) {
                        if (null === r.pose) return;
                        var i = r.pose;
                        !1 === i.hasPosition && t.position.set(.2, -.6, -.05), null !== i.position && t.position.fromArray(i.position), null !== i.orientation && t.quaternion.fromArray(i.orientation), t.matrix.compose(t.position, t.quaternion, t.scale), t.matrix.premultiply(p), t.matrix.decompose(t.position, t.quaternion, t.scale), t.matrixWorldNeedsUpdate = !0, t.visible = !0;
                        var n = "Daydream Controller" === r.id ? 0 : 1;
                        b[e] !== r.buttons[n].pressed && (b[e] = r.buttons[n].pressed, !0 === b[e] ? t.dispatchEvent({type: "selectstart"}) : (t.dispatchEvent({type: "selectend"}), t.dispatchEvent({type: "select"})))
                    } else t.visible = !1
                }
            }

            var o = this, s = null, l = null, d = null, c = [], p = new Qe.a, u = new Qe.a, m = 1, g = "stage";
            "undefined" != typeof window && "VRFrameData" in window && (l = new window.VRFrameData, window.addEventListener("vrdisplaypresentchange", r, !1));
            var f = new Qe.a, h = new Ct.a, v = new et.a, x = new At.a;
            x.bounds = new ot.a(0, 0, .5, 1), x.layers.enable(1);
            var y = new At.a;
            y.bounds = new ot.a(.5, 0, .5, 1), y.layers.enable(2);
            var _ = new Ue([x, y]);
            _.layers.enable(1), _.layers.enable(2);
            var b = [], M, S;
            this.enabled = !1, this.getController = function (e) {
                var t = c[e];
                return void 0 === t && (t = new Pt.a, t.matrixAutoUpdate = !1, t.visible = !1, c[e] = t), t
            }, this.getDevice = function () {
                return s
            }, this.setDevice = function (e) {
                void 0 !== e && (s = e), L.setContext(e)
            }, this.setFramebufferScaleFactor = function (e) {
                m = e
            }, this.setFrameOfReferenceType = function (e) {
                g = e
            }, this.setPoseTarget = function (e) {
                void 0 !== e && (d = e)
            }, this.getCamera = function (e) {
                var t = "stage" === g ? 1.6 : 0;
                if (null === s) return e.position.set(0, t, 0), e;
                if (s.depthNear = e.near, s.depthFar = e.far, s.getFrameData(l), "stage" === g) {
                    var r = s.stageParameters;
                    r ? p.fromArray(r.sittingToStandingTransform) : p.makeTranslation(0, t, 0)
                }
                var a = l.pose, i = null === d ? e : d;
                if (i.matrix.copy(p), i.matrix.decompose(i.position, i.quaternion, i.scale), null !== a.orientation && (h.fromArray(a.orientation), i.quaternion.multiply(h)), null !== a.position && (h.setFromRotationMatrix(p), v.fromArray(a.position), v.applyQuaternion(h), i.position.add(v)), i.updateMatrixWorld(), !1 === s.isPresenting) return e;
                x.near = e.near, y.near = e.near, x.far = e.far, y.far = e.far, x.matrixWorldInverse.fromArray(l.leftViewMatrix), y.matrixWorldInverse.fromArray(l.rightViewMatrix), u.getInverse(p), "stage" === g && (x.matrixWorldInverse.multiply(u), y.matrixWorldInverse.multiply(u));
                var o = i.parent;
                null !== o && (f.getInverse(o.matrixWorld), x.matrixWorldInverse.multiply(f), y.matrixWorldInverse.multiply(f)), x.matrixWorld.getInverse(x.matrixWorldInverse), y.matrixWorld.getInverse(y.matrixWorldInverse), x.projectionMatrix.fromArray(l.leftProjectionMatrix), y.projectionMatrix.fromArray(l.rightProjectionMatrix), Fe(_, x, y);
                var c = s.getLayers();
                if (c.length) {
                    var m = c[0];
                    null !== m.leftBounds && 4 === m.leftBounds.length && x.bounds.fromArray(m.leftBounds), null !== m.rightBounds && 4 === m.rightBounds.length && y.bounds.fromArray(m.rightBounds)
                }
                return n(), _
            }, this.getStandingMatrix = function () {
                return p
            }, this.isPresenting = t;
            var L = new i;
            this.setAnimationLoop = function (e) {
                L.setAnimationLoop(e)
            }, this.submitFrame = function () {
                t() && s.submitFrame()
            }, this.dispose = function () {
                "undefined" != typeof window && window.removeEventListener("vrdisplaypresentchange", r)
            }
        }

        function Oe(e) {
            function t() {
                return null !== d && null !== p
            }

            function r(e) {
                var t = g[f.indexOf(e.inputSource)];
                t && t.dispatchEvent({type: e.type})
            }

            function a() {
                e.setFramebuffer(null), _.stop()
            }

            function n(e, t) {
                null === t ? e.matrixWorld.copy(e.matrix) : e.matrixWorld.multiplyMatrices(t.matrixWorld, e.matrix), e.matrixWorldInverse.getInverse(e.matrixWorld)
            }

            function o(e, t) {
                if (m = t.getDevicePose(p), null !== m) for (var r = d.baseLayer, a = t.views, n = 0; n < a.length; n++) {
                    var i = a[n], o = r.getViewport(i), s = m.getViewMatrix(i), l = x.cameras[n];
                    l.matrix.fromArray(s).getInverse(l.matrix), l.projectionMatrix.fromArray(i.projectionMatrix), l.viewport.set(o.x, o.y, o.width, o.height), 0 === n && x.matrix.copy(l.matrix)
                }
                for (var n = 0; n < g.length; n++) {
                    var c = g[n], u = f[n];
                    if (u) {
                        var h = t.getInputPose(u, p);
                        if (null !== h) {
                            "targetRay" in h ? c.matrix.elements = h.targetRay.transformMatrix : "pointerMatrix" in h && (c.matrix.elements = h.pointerMatrix), c.matrix.decompose(c.position, c.rotation, c.scale), c.visible = !0;
                            continue
                        }
                    }
                    c.visible = !1
                }
                y && y(e)
            }

            var s = e.context, l = null, d = null, c = 1, p = null, u = "stage", m = null, g = [], f = [], h = new At.a;
            h.layers.enable(1), h.viewport = new ot.a;
            var v = new At.a;
            v.layers.enable(2), v.viewport = new ot.a;
            var x = new Ue([h, v]);
            x.layers.enable(1), x.layers.enable(2), this.enabled = !1, this.getController = function (e) {
                var t = g[e];
                return void 0 === t && (t = new Pt.a, t.matrixAutoUpdate = !1, t.visible = !1, g[e] = t), t
            }, this.getDevice = function () {
                return l
            }, this.setDevice = function (e) {
                void 0 !== e && (l = e), e instanceof XRDevice && s.setCompatibleXRDevice(e)
            }, this.setFramebufferScaleFactor = function (e) {
                c = e
            }, this.setFrameOfReferenceType = function (e) {
                u = e
            }, this.setSession = function (t) {
                d = t, null !== d && (d.addEventListener("select", r), d.addEventListener("selectstart", r), d.addEventListener("selectend", r), d.addEventListener("end", a), d.baseLayer = new XRWebGLLayer(d, s, {framebufferScaleFactor: c}), d.requestFrameOfReference(u).then(function (t) {
                    p = t, e.setFramebuffer(d.baseLayer.framebuffer), _.setContext(d), _.start()
                }), f = d.getInputSources(), d.addEventListener("inputsourceschange", function () {
                    f = d.getInputSources(), console.log(f);
                    for (var e = 0, t; e < g.length; e++) t = g[e], t.userData.inputSource = f[e]
                }))
            }, this.getCamera = function (e) {
                if (t()) {
                    var r = e.parent, a = x.cameras;
                    n(x, r);
                    for (var o = 0; o < a.length; o++) n(a[o], r);
                    e.matrixWorld.copy(x.matrixWorld);
                    for (var i = e.children, o = 0, s = i.length; o < s; o++) i[o].updateMatrixWorld(!0);
                    return Fe(x, h, v), x
                }
                return e
            }, this.isPresenting = t;
            var y = null, _ = new i;
            _.setAnimationLoop(o), this.setAnimationLoop = function (e) {
                y = e
            }, this.dispose = function () {
            }, this.getStandingMatrix = function () {
                return console.warn("THREE.WebXRManager: getStandingMatrix() is no longer needed."), new THREE.Matrix4
            }, this.submitFrame = function () {
            }
        }

        function Be(e) {
            function t() {
                return null === se ? be : 1
            }

            function r() {
                He = new u(Fe), ke = new c(Fe, He, e), ke.isWebGL2 || (He.get("WEBGL_depth_texture"), He.get("OES_texture_float"), He.get("OES_texture_half_float"), He.get("OES_texture_half_float_linear"), He.get("OES_standard_derivatives"), He.get("OES_element_index_uint"), He.get("ANGLE_instanced_arrays")), He.get("OES_texture_float_linear"), ft = new ze(Fe, He, ke), We = new Ne(Fe, He, ft, ke), We.scissor(ge.copy(Se).multiplyScalar(be)), We.viewport(me.copy(Me).multiplyScalar(be)), Je = new f(Fe), Ke = new _e, tt = new Ie(Fe, He, We, Ke, ke, ft, Je), rt = new n(Fe), at = new m(Fe, rt, Je), st = new x(at, Je), ut = new v(Fe), lt = new ye(ie, He, ke), dt = new Le, ct = new Pe, pt = new l(ie, We, st, K), mt = new d(Fe, He, Je, ke), gt = new g(Fe, He, Je, ke), Je.programs = lt.programs, ie.context = Fe, ie.capabilities = ke, ie.extensions = He, ie.properties = Ke, ie.renderLists = dt, ie.state = We, ie.info = Je
            }

            function o(e) {
                e.preventDefault(), console.log("THREE.WebGLRenderer: Context Lost."), ne = !0
            }

            function s() {
                console.log("THREE.WebGLRenderer: Context Restored."), ne = !1, r()
            }

            function h(e) {
                var t = e.target;
                t.removeEventListener("dispose", h), y(t)
            }

            function y(e) {
                _(e), Ke.remove(e)
            }

            function _(e) {
                var t = Ke.get(e).program;
                e.program = void 0, void 0 !== t && lt.releaseProgram(t)
            }

            function b(e, t) {
                e.render(function (e) {
                    ie.renderBufferImmediate(e, t)
                })
            }

            function M(e, t, r) {
                if (r && r.isInstancedBufferGeometry & !ke.isWebGL2 && null === He.get("ANGLE_instanced_arrays")) return void console.error("THREE.WebGLRenderer.setupVertexAttributes: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");
                We.initAttributes();
                var a = r.attributes, i = t.getAttributes(), n = e.defaultAttributeValues;
                for (var o in i) {
                    var s = i[o];
                    if (0 <= s) {
                        var l = a[o];
                        if (void 0 !== l) {
                            var d = l.normalized, c = l.itemSize, p = rt.get(l);
                            if (void 0 === p) continue;
                            var u = p.buffer, m = p.type, g = p.bytesPerElement;
                            if (l.isInterleavedBufferAttribute) {
                                var f = l.data, h = f.stride, v = l.offset;
                                f && f.isInstancedInterleavedBuffer ? (We.enableAttributeAndDivisor(s, f.meshPerAttribute), void 0 === r.maxInstancedCount && (r.maxInstancedCount = f.meshPerAttribute * f.count)) : We.enableAttribute(s), Fe.bindBuffer(34962, u), Fe.vertexAttribPointer(s, c, m, d, h * g, v * g)
                            } else l.isInstancedBufferAttribute ? (We.enableAttributeAndDivisor(s, l.meshPerAttribute), void 0 === r.maxInstancedCount && (r.maxInstancedCount = l.meshPerAttribute * l.count)) : We.enableAttribute(s), Fe.bindBuffer(34962, u), Fe.vertexAttribPointer(s, c, m, d, 0, 0)
                        } else if (void 0 !== n) {
                            var x = n[o];
                            if (void 0 !== x) switch (x.length) {
                                case 2:
                                    Fe.vertexAttrib2fv(s, x);
                                    break;
                                case 3:
                                    Fe.vertexAttrib3fv(s, x);
                                    break;
                                case 4:
                                    Fe.vertexAttrib4fv(s, x);
                                    break;
                                default:
                                    Fe.vertexAttrib1fv(s, x);
                            }
                        }
                    }
                }
                We.disableUnusedAttributes()
            }

            function S(e) {
                ht.isPresenting() || xt && xt(e)
            }

            function L(e, t, r, a) {
                if (!1 !== e.visible) {
                    var n = e.layers.test(t.layers);
                    if (n) if (e.isGroup) r = e.renderOrder; else if (e.isLight) re.pushLight(e), e.castShadow && re.pushShadow(e); else if (e.isSprite) {
                        if (!e.frustumCulled || Te.intersectsSprite(e)) {
                            a && Ue.setFromMatrixPosition(e.matrixWorld).applyMatrix4(De);
                            var o = st.update(e), s = e.material;
                            te.push(e, o, s, r, Ue.z, null)
                        }
                    } else if (e.isImmediateRenderObject) a && Ue.setFromMatrixPosition(e.matrixWorld).applyMatrix4(De), te.push(e, null, e.material, r, Ue.z, null); else if ((e.isMesh || e.isLine || e.isPoints) && (e.isSkinnedMesh && e.skeleton.update(), !e.frustumCulled || Te.intersectsObject(e))) {
                        a && Ue.setFromMatrixPosition(e.matrixWorld).applyMatrix4(De);
                        var o = st.update(e), s = e.material;
                        if (Array.isArray(s)) for (var d = o.groups, c = 0, i = d.length; c < i; c++) {
                            var l = d[c], p = s[l.materialIndex];
                            p && p.visible && te.push(e, o, p, r, Ue.z, l)
                        } else s.visible && te.push(e, o, s, r, Ue.z, null)
                    }
                    for (var u = e.children, c = 0, i = u.length; c < i; c++) L(u[c], t, r, a)
                }
            }

            function E(e, t, r, a) {
                for (var n = 0, i = e.length; n < i; n++) {
                    var o = e[n], s = o.object, l = o.geometry, d = void 0 === a ? o.material : a, c = o.group;
                    if (r.isArrayCamera) {
                        ue = r;
                        for (var p = r.cameras, u = 0, m = p.length, g; u < m; u++) if (g = p[u], s.layers.test(g.layers)) {
                            if ("viewport" in g) We.viewport(me.copy(g.viewport)); else {
                                var f = g.bounds, h = f.x * ve, v = f.y * xe, x = f.z * ve, y = f.w * xe;
                                We.viewport(me.set(h, v, x, y).multiplyScalar(be))
                            }
                            re.setupLights(g), T(s, t, g, l, d, c)
                        }
                    } else ue = null, T(s, t, r, l, d, c)
                }
            }

            function T(e, t, r, a, i, n) {
                if (e.onBeforeRender(ie, t, r, a, i, n), re = ct.get(t, ue || r), e.modelViewMatrix.multiplyMatrices(r.matrixWorldInverse, e.matrixWorld), e.normalMatrix.getNormalMatrix(e.modelViewMatrix), e.isImmediateRenderObject) {
                    We.setMaterial(i);
                    var o = P(r, t.fog, i, e);
                    ce.geometry = null, ce.program = null, ce.wireframe = !1, b(e, o)
                } else ie.renderBufferDirect(r, t.fog, a, i, e, n);
                e.onAfterRender(ie, t, r, a, i, n), re = ct.get(t, ue || r)
            }

            function w(e, t, r) {
                var a = Ke.get(e), n = re.state.lights, o = re.state.shadowsArray, s = a.lightsHash, l = n.state.hash,
                    d = lt.getParameters(e, n.state, o, t, we.numPlanes, we.numIntersection, r),
                    c = lt.getProgramCode(e, d), p = a.program, u = !0;
                if (void 0 === p) e.addEventListener("dispose", h); else if (p.code !== c) _(e); else if (s.stateID !== l.stateID || s.directionalLength !== l.directionalLength || s.pointLength !== l.pointLength || s.spotLength !== l.spotLength || s.rectAreaLength !== l.rectAreaLength || s.hemiLength !== l.hemiLength || s.shadowsLength !== l.shadowsLength) s.stateID = l.stateID, s.directionalLength = l.directionalLength, s.pointLength = l.pointLength, s.spotLength = l.spotLength, s.rectAreaLength = l.rectAreaLength, s.hemiLength = l.hemiLength, s.shadowsLength = l.shadowsLength, u = !1; else {
                    if (void 0 !== d.shaderID) return;
                    u = !1
                }
                if (u) {
                    if (d.shaderID) {
                        var m = nt[d.shaderID];
                        a.shader = {
                            name: e.type,
                            uniforms: Object($e.a)(m.uniforms),
                            vertexShader: m.vertexShader,
                            fragmentShader: m.fragmentShader
                        }
                    } else a.shader = {
                        name: e.type,
                        uniforms: e.uniforms,
                        vertexShader: e.vertexShader,
                        fragmentShader: e.fragmentShader
                    };
                    e.onBeforeCompile(a.shader, ie), c = lt.getProgramCode(e, d), p = lt.acquireProgram(e, a.shader, d, c), a.program = p, e.program = p
                }
                var g = p.getAttributes();
                if (e.morphTargets) {
                    e.numSupportedMorphTargets = 0;
                    for (var f = 0; f < ie.maxMorphTargets; f++) 0 <= g["morphTarget" + f] && e.numSupportedMorphTargets++
                }
                if (e.morphNormals) {
                    e.numSupportedMorphNormals = 0;
                    for (var f = 0; f < ie.maxMorphNormals; f++) 0 <= g["morphNormal" + f] && e.numSupportedMorphNormals++
                }
                var i = a.shader.uniforms;
                (e.isShaderMaterial || e.isRawShaderMaterial) && !0 !== e.clipping || (a.numClippingPlanes = we.numPlanes, a.numIntersection = we.numIntersection, i.clippingPlanes = we.uniform), a.fog = t, void 0 === s && (a.lightsHash = s = {}), s.stateID = l.stateID, s.directionalLength = l.directionalLength, s.pointLength = l.pointLength, s.spotLength = l.spotLength, s.rectAreaLength = l.rectAreaLength, s.hemiLength = l.hemiLength, s.shadowsLength = l.shadowsLength, e.lights && (i.ambientLightColor.value = n.state.ambient, i.directionalLights.value = n.state.directional, i.spotLights.value = n.state.spot, i.rectAreaLights.value = n.state.rectArea, i.pointLights.value = n.state.point, i.hemisphereLights.value = n.state.hemi, i.directionalShadowMap.value = n.state.directionalShadowMap, i.directionalShadowMatrix.value = n.state.directionalShadowMatrix, i.spotShadowMap.value = n.state.spotShadowMap, i.spotShadowMatrix.value = n.state.spotShadowMatrix, i.pointShadowMap.value = n.state.pointShadowMap, i.pointShadowMatrix.value = n.state.pointShadowMatrix);
                var v = a.program.getUniforms(), x = ae.seqWithValue(v.seq, i);
                a.uniformsList = x
            }

            function P(e, t, r, i) {
                he = 0;
                var n = Ke.get(r), o = re.state.lights, s = n.lightsHash, l = o.state.hash;
                if (Ce && (Ae || e !== pe)) {
                    var d = e === pe && r.id === de;
                    we.setState(r.clippingPlanes, r.clipIntersection, r.clipShadows, e, n, d)
                }
                !1 === r.needsUpdate && (void 0 === n.program ? r.needsUpdate = !0 : r.fog && n.fog !== t ? r.needsUpdate = !0 : r.lights && (s.stateID !== l.stateID || s.directionalLength !== l.directionalLength || s.pointLength !== l.pointLength || s.spotLength !== l.spotLength || s.rectAreaLength !== l.rectAreaLength || s.hemiLength !== l.hemiLength || s.shadowsLength !== l.shadowsLength) ? r.needsUpdate = !0 : void 0 !== n.numClippingPlanes && (n.numClippingPlanes !== we.numPlanes || n.numIntersection !== we.numIntersection) && (r.needsUpdate = !0)), r.needsUpdate && (w(r, t, i), r.needsUpdate = !1);
                var c = !1, p = !1, u = !1, m = n.program, g = m.getUniforms(), f = n.shader.uniforms;
                if (We.useProgram(m.program) && (c = !0, p = !0, u = !0), r.id !== de && (de = r.id, p = !0), c || pe !== e) {
                    if (g.setValue(Fe, "projectionMatrix", e.projectionMatrix), ke.logarithmicDepthBuffer && g.setValue(Fe, "logDepthBufFC", 2 / (Ve(e.far + 1) / Math.LN2)), pe !== e && (pe = e, p = !0, u = !0), r.isShaderMaterial || r.isMeshPhongMaterial || r.isMeshStandardMaterial || r.envMap) {
                        var h = g.map.cameraPosition;
                        void 0 !== h && h.setValue(Fe, Ue.setFromMatrixPosition(e.matrixWorld))
                    }
                    (r.isMeshPhongMaterial || r.isMeshLambertMaterial || r.isMeshBasicMaterial || r.isMeshStandardMaterial || r.isShaderMaterial || r.skinning) && g.setValue(Fe, "viewMatrix", e.matrixWorldInverse)
                }
                if (r.skinning) {
                    g.setOptional(Fe, i, "bindMatrix"), g.setOptional(Fe, i, "bindMatrixInverse");
                    var v = i.skeleton;
                    if (v) {
                        var x = v.bones;
                        if (ke.floatVertexTextures) {
                            if (void 0 === v.boneTexture) {
                                var y = Math.sqrt(4 * x.length);
                                y = Ye.a.ceilPowerOfTwo(y), y = qe(y, 4);
                                var _ = new Float32Array(4 * (y * y));
                                _.set(v.boneMatrices);
                                var b = new a(_, y, y, je.rb, je.C);
                                b.needsUpdate = !0, v.boneMatrices = _, v.boneTexture = b, v.boneTextureSize = y
                            }
                            g.setValue(Fe, "boneTexture", v.boneTexture), g.setValue(Fe, "boneTextureSize", v.boneTextureSize)
                        } else g.setOptional(Fe, v, "boneMatrices")
                    }
                }
                return p && (g.setValue(Fe, "toneMappingExposure", ie.toneMappingExposure), g.setValue(Fe, "toneMappingWhitePoint", ie.toneMappingWhitePoint), r.lights && W(f, u), t && r.fog && I(f, t), r.isMeshBasicMaterial ? C(f, r) : r.isMeshLambertMaterial ? (C(f, r), z(f, r)) : r.isMeshPhongMaterial ? (C(f, r), r.isMeshToonMaterial ? F(f, r) : U(f, r)) : r.isMeshStandardMaterial ? (C(f, r), r.isMeshPhysicalMaterial ? O(f, r) : G(f, r)) : r.isMeshMatcapMaterial ? (C(f, r), B(f, r)) : r.isMeshDepthMaterial ? (C(f, r), V(f, r)) : r.isMeshDistanceMaterial ? (C(f, r), H(f, r)) : r.isMeshNormalMaterial ? (C(f, r), k(f, r)) : r.isLineBasicMaterial ? (A(f, r), r.isLineDashedMaterial && D(f, r)) : r.isPointsMaterial ? R(f, r) : r.isSpriteMaterial ? N(f, r) : r.isShadowMaterial && (f.color.value = r.color, f.opacity.value = r.opacity), void 0 !== f.ltc_1 && (f.ltc_1.value = it.LTC_1), void 0 !== f.ltc_2 && (f.ltc_2.value = it.LTC_2), ae.upload(Fe, n.uniformsList, f, ie)), r.isShaderMaterial && !0 === r.uniformsNeedUpdate && (ae.upload(Fe, n.uniformsList, f, ie), r.uniformsNeedUpdate = !1), r.isSpriteMaterial && g.setValue(Fe, "center", i.center), g.setValue(Fe, "modelViewMatrix", i.modelViewMatrix), g.setValue(Fe, "normalMatrix", i.normalMatrix), g.setValue(Fe, "modelMatrix", i.matrixWorld), m
            }

            function C(e, t) {
                e.opacity.value = t.opacity, t.color && (e.diffuse.value = t.color), t.emissive && e.emissive.value.copy(t.emissive).multiplyScalar(t.emissiveIntensity), t.map && (e.map.value = t.map), t.alphaMap && (e.alphaMap.value = t.alphaMap), t.specularMap && (e.specularMap.value = t.specularMap), t.envMap && (e.envMap.value = t.envMap, e.flipEnvMap.value = t.envMap.isCubeTexture ? -1 : 1, e.reflectivity.value = t.reflectivity, e.refractionRatio.value = t.refractionRatio, e.maxMipLevel.value = Ke.get(t.envMap).__maxMipLevel), t.lightMap && (e.lightMap.value = t.lightMap, e.lightMapIntensity.value = t.lightMapIntensity), t.aoMap && (e.aoMap.value = t.aoMap, e.aoMapIntensity.value = t.aoMapIntensity);
                var r;
                t.map ? r = t.map : t.specularMap ? r = t.specularMap : t.displacementMap ? r = t.displacementMap : t.normalMap ? r = t.normalMap : t.bumpMap ? r = t.bumpMap : t.roughnessMap ? r = t.roughnessMap : t.metalnessMap ? r = t.metalnessMap : t.alphaMap ? r = t.alphaMap : t.emissiveMap && (r = t.emissiveMap), void 0 !== r && (r.isWebGLRenderTarget && (r = r.texture), !0 === r.matrixAutoUpdate && r.updateMatrix(), e.uvTransform.value.copy(r.matrix))
            }

            function A(e, t) {
                e.diffuse.value = t.color, e.opacity.value = t.opacity
            }

            function D(e, t) {
                e.dashSize.value = t.dashSize, e.totalSize.value = t.dashSize + t.gapSize, e.scale.value = t.scale
            }

            function R(e, t) {
                e.diffuse.value = t.color, e.opacity.value = t.opacity, e.size.value = t.size * be, e.scale.value = .5 * xe, e.map.value = t.map, null !== t.map && (!0 === t.map.matrixAutoUpdate && t.map.updateMatrix(), e.uvTransform.value.copy(t.map.matrix))
            }

            function N(e, t) {
                e.diffuse.value = t.color, e.opacity.value = t.opacity, e.rotation.value = t.rotation, e.map.value = t.map, null !== t.map && (!0 === t.map.matrixAutoUpdate && t.map.updateMatrix(), e.uvTransform.value.copy(t.map.matrix))
            }

            function I(e, t) {
                e.fogColor.value = t.color, t.isFog ? (e.fogNear.value = t.near, e.fogFar.value = t.far) : t.isFogExp2 && (e.fogDensity.value = t.density)
            }

            function z(e, t) {
                t.emissiveMap && (e.emissiveMap.value = t.emissiveMap)
            }

            function U(e, t) {
                e.specular.value = t.specular, e.shininess.value = qe(t.shininess, 1e-4), t.emissiveMap && (e.emissiveMap.value = t.emissiveMap), t.bumpMap && (e.bumpMap.value = t.bumpMap, e.bumpScale.value = t.bumpScale, t.side === je.g && (e.bumpScale.value *= -1)), t.normalMap && (e.normalMap.value = t.normalMap, e.normalScale.value.copy(t.normalScale), t.side === je.g && e.normalScale.value.negate()), t.displacementMap && (e.displacementMap.value = t.displacementMap, e.displacementScale.value = t.displacementScale, e.displacementBias.value = t.displacementBias)
            }

            function F(e, t) {
                U(e, t), t.gradientMap && (e.gradientMap.value = t.gradientMap)
            }

            function G(e, t) {
                e.roughness.value = t.roughness, e.metalness.value = t.metalness, t.roughnessMap && (e.roughnessMap.value = t.roughnessMap), t.metalnessMap && (e.metalnessMap.value = t.metalnessMap), t.emissiveMap && (e.emissiveMap.value = t.emissiveMap), t.bumpMap && (e.bumpMap.value = t.bumpMap, e.bumpScale.value = t.bumpScale, t.side === je.g && (e.bumpScale.value *= -1)), t.normalMap && (e.normalMap.value = t.normalMap, e.normalScale.value.copy(t.normalScale), t.side === je.g && e.normalScale.value.negate()), t.displacementMap && (e.displacementMap.value = t.displacementMap, e.displacementScale.value = t.displacementScale, e.displacementBias.value = t.displacementBias), t.envMap && (e.envMapIntensity.value = t.envMapIntensity)
            }

            function O(e, t) {
                G(e, t), e.reflectivity.value = t.reflectivity, e.clearCoat.value = t.clearCoat, e.clearCoatRoughness.value = t.clearCoatRoughness
            }

            function B(e, t) {
                t.matcap && (e.matcap.value = t.matcap), t.bumpMap && (e.bumpMap.value = t.bumpMap, e.bumpScale.value = t.bumpScale, t.side === je.g && (e.bumpScale.value *= -1)), t.normalMap && (e.normalMap.value = t.normalMap, e.normalScale.value.copy(t.normalScale), t.side === je.g && e.normalScale.value.negate()), t.displacementMap && (e.displacementMap.value = t.displacementMap, e.displacementScale.value = t.displacementScale, e.displacementBias.value = t.displacementBias)
            }

            function V(e, t) {
                t.displacementMap && (e.displacementMap.value = t.displacementMap, e.displacementScale.value = t.displacementScale, e.displacementBias.value = t.displacementBias)
            }

            function H(e, t) {
                t.displacementMap && (e.displacementMap.value = t.displacementMap, e.displacementScale.value = t.displacementScale, e.displacementBias.value = t.displacementBias), e.referencePosition.value.copy(t.referencePosition), e.nearDistance.value = t.nearDistance, e.farDistance.value = t.farDistance
            }

            function k(e, t) {
                t.bumpMap && (e.bumpMap.value = t.bumpMap, e.bumpScale.value = t.bumpScale, t.side === je.g && (e.bumpScale.value *= -1)), t.normalMap && (e.normalMap.value = t.normalMap, e.normalScale.value.copy(t.normalScale), t.side === je.g && e.normalScale.value.negate()), t.displacementMap && (e.displacementMap.value = t.displacementMap, e.displacementScale.value = t.displacementScale, e.displacementBias.value = t.displacementBias)
            }

            function W(e, t) {
                e.ambientLightColor.needsUpdate = t, e.directionalLights.needsUpdate = t, e.pointLights.needsUpdate = t, e.spotLights.needsUpdate = t, e.rectAreaLights.needsUpdate = t, e.hemisphereLights.needsUpdate = t
            }

            function q() {
                var e = he;
                return e >= ke.maxTextures && console.warn("THREE.WebGLRenderer: Trying to use " + e + " texture units while this GPU supports only " + ke.maxTextures), he += 1, e
            }

            console.log("THREE.WebGLRenderer", je.pb), e = e || {};
            var X = void 0 === e.canvas ? document.createElementNS("http://www.w3.org/1999/xhtml", "canvas") : e.canvas,
                j = void 0 === e.context ? null : e.context, Y = void 0 !== e.alpha && e.alpha,
                J = void 0 === e.depth || e.depth, Z = void 0 === e.stencil || e.stencil,
                Q = void 0 !== e.antialias && e.antialias, K = void 0 === e.premultipliedAlpha || e.premultipliedAlpha,
                $ = void 0 !== e.preserveDrawingBuffer && e.preserveDrawingBuffer,
                ee = void 0 === e.powerPreference ? "default" : e.powerPreference, te = null, re = null;
            this.domElement = X, this.context = null, this.autoClear = !0, this.autoClearColor = !0, this.autoClearDepth = !0, this.autoClearStencil = !0, this.sortObjects = !0, this.clippingPlanes = [], this.localClippingEnabled = !1, this.gammaFactor = 2, this.gammaInput = !1, this.gammaOutput = !1, this.physicallyCorrectLights = !1, this.toneMapping = je.P, this.toneMappingExposure = 1, this.toneMappingWhitePoint = 1, this.maxMorphTargets = 8, this.maxMorphNormals = 4;
            var ie = this, ne = !1, oe = null, se = null, le = null, de = -1,
                ce = {geometry: null, program: null, wireframe: !1}, pe = null, ue = null, me = new ot.a, ge = new ot.a,
                fe = null, he = 0, ve = X.width, xe = X.height, be = 1, Me = new ot.a(0, 0, ve, xe),
                Se = new ot.a(0, 0, ve, xe), Ee = !1, Te = new Ze.a, we = new p, Ce = !1, Ae = !1, De = new Qe.a,
                Ue = new et.a, Fe;
            try {
                var Be = {
                    alpha: Y,
                    depth: J,
                    stencil: Z,
                    antialias: Q,
                    premultipliedAlpha: K,
                    preserveDrawingBuffer: $,
                    powerPreference: ee
                };
                if (X.addEventListener("webglcontextlost", o, !1), X.addEventListener("webglcontextrestored", s, !1), Fe = j || X.getContext("webgl", Be) || X.getContext("experimental-webgl", Be), null === Fe) if (null !== X.getContext("webgl")) throw new Error("Error creating WebGL context with your selected attributes."); else throw new Error("Error creating WebGL context.");
                void 0 === Fe.getShaderPrecisionFormat && (Fe.getShaderPrecisionFormat = function () {
                    return {rangeMin: 1, rangeMax: 1, precision: 1}
                })
            } catch (e) {
                console.error("THREE.WebGLRenderer: " + e.message)
            }
            var He, ke, We, Je, Ke, tt, rt, at, st, lt, dt, ct, pt, ut, mt, gt, ft;
            r();
            var ht = null;
            "undefined" != typeof navigator && (ht = "xr" in navigator ? new Oe(ie) : new Ge(ie)), this.vr = ht;
            var vt = new Re(ie, st, ke.maxTextureSize);
            this.shadowMap = vt, this.getContext = function () {
                return Fe
            }, this.getContextAttributes = function () {
                return Fe.getContextAttributes()
            }, this.forceContextLoss = function () {
                var e = He.get("WEBGL_lose_context");
                e && e.loseContext()
            }, this.forceContextRestore = function () {
                var e = He.get("WEBGL_lose_context");
                e && e.restoreContext()
            }, this.getPixelRatio = function () {
                return be
            }, this.setPixelRatio = function (e) {
                void 0 === e || (be = e, this.setSize(ve, xe, !1))
            }, this.getSize = function () {
                return {width: ve, height: xe}
            }, this.setSize = function (e, t, r) {
                return ht.isPresenting() ? void console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.") : void (ve = e, xe = t, X.width = e * be, X.height = t * be, !1 !== r && (X.style.width = e + "px", X.style.height = t + "px"), this.setViewport(0, 0, e, t))
            }, this.getDrawingBufferSize = function () {
                return {width: ve * be, height: xe * be}
            }, this.setDrawingBufferSize = function (e, t, r) {
                ve = e, xe = t, be = r, X.width = e * r, X.height = t * r, this.setViewport(0, 0, e, t)
            }, this.getCurrentViewport = function () {
                return me
            }, this.setViewport = function (e, t, r, a) {
                Me.set(e, xe - t - a, r, a), We.viewport(me.copy(Me).multiplyScalar(be))
            }, this.setScissor = function (e, t, r, a) {
                Se.set(e, xe - t - a, r, a), We.scissor(ge.copy(Se).multiplyScalar(be))
            }, this.setScissorTest = function (e) {
                We.setScissorTest(Ee = e)
            }, this.getClearColor = function () {
                return pt.getClearColor()
            }, this.setClearColor = function () {
                pt.setClearColor.apply(pt, arguments)
            }, this.getClearAlpha = function () {
                return pt.getClearAlpha()
            }, this.setClearAlpha = function () {
                pt.setClearAlpha.apply(pt, arguments)
            }, this.clear = function (e, t, r) {
                var a = 0;
                (void 0 === e || e) && (a |= 16384), (void 0 === t || t) && (a |= 256), (void 0 === r || r) && (a |= 1024), Fe.clear(a)
            }, this.clearColor = function () {
                this.clear(!0, !1, !1)
            }, this.clearDepth = function () {
                this.clear(!1, !0, !1)
            }, this.clearStencil = function () {
                this.clear(!1, !1, !0)
            }, this.dispose = function () {
                X.removeEventListener("webglcontextlost", o, !1), X.removeEventListener("webglcontextrestored", s, !1), dt.dispose(), ct.dispose(), Ke.dispose(), st.dispose(), ht.dispose(), yt.stop()
            }, this.renderBufferImmediate = function (e, t) {
                We.initAttributes();
                var r = Ke.get(e);
                e.hasPositions && !r.position && (r.position = Fe.createBuffer()), e.hasNormals && !r.normal && (r.normal = Fe.createBuffer()), e.hasUvs && !r.uv && (r.uv = Fe.createBuffer()), e.hasColors && !r.color && (r.color = Fe.createBuffer());
                var a = t.getAttributes();
                e.hasPositions && (Fe.bindBuffer(34962, r.position), Fe.bufferData(34962, e.positionArray, 35048), We.enableAttribute(a.position), Fe.vertexAttribPointer(a.position, 3, 5126, !1, 0, 0)), e.hasNormals && (Fe.bindBuffer(34962, r.normal), Fe.bufferData(34962, e.normalArray, 35048), We.enableAttribute(a.normal), Fe.vertexAttribPointer(a.normal, 3, 5126, !1, 0, 0)), e.hasUvs && (Fe.bindBuffer(34962, r.uv), Fe.bufferData(34962, e.uvArray, 35048), We.enableAttribute(a.uv), Fe.vertexAttribPointer(a.uv, 2, 5126, !1, 0, 0)), e.hasColors && (Fe.bindBuffer(34962, r.color), Fe.bufferData(34962, e.colorArray, 35048), We.enableAttribute(a.color), Fe.vertexAttribPointer(a.color, 3, 5126, !1, 0, 0)), We.disableUnusedAttributes(), Fe.drawArrays(4, 0, e.count), e.count = 0
            }, this.renderBufferDirect = function (e, r, a, i, n, o) {
                var s = n.isMesh && 0 > n.normalMatrix.determinant();
                We.setMaterial(i, s);
                var l = P(e, r, i, n), d = !1;
                (ce.geometry !== a.id || ce.program !== l.id || ce.wireframe !== (!0 === i.wireframe)) && (ce.geometry = a.id, ce.program = l.id, ce.wireframe = !0 === i.wireframe, d = !0), n.morphTargetInfluences && (ut.update(n, a, i, l), d = !0);
                var c = a.index, p = a.attributes.position, u = 1;
                !0 === i.wireframe && (c = at.getWireframeAttribute(a), u = 2);
                var m = mt, g;
                null !== c && (g = rt.get(c), m = gt, m.setIndex(g)), d && (M(i, l, a), null !== c && Fe.bindBuffer(34963, g.buffer));
                var f = Infinity;
                null === c ? void 0 !== p && (f = p.count) : f = c.count;
                var h = a.drawRange.start * u, v = a.drawRange.count * u, x = null === o ? 0 : o.start * u,
                    y = null === o ? Infinity : o.count * u, _ = qe(h, x), b = Xe(f, h + v, x + y) - 1,
                    S = qe(0, b - _ + 1);
                if (0 !== S) {
                    if (n.isMesh) {
                        if (!0 === i.wireframe) We.setLineWidth(i.wireframeLinewidth * t()), m.setMode(1); else switch (n.drawMode) {
                            case je.hc:
                                m.setMode(4);
                                break;
                            case je.gc:
                                m.setMode(5);
                                break;
                            case je.fc:
                                m.setMode(6);
                        }
                    } else if (n.isLine) {
                        var L = i.linewidth;
                        void 0 === L && (L = 1), We.setLineWidth(L * t()), n.isLineSegments ? m.setMode(1) : n.isLineLoop ? m.setMode(2) : m.setMode(3)
                    } else n.isPoints ? m.setMode(0) : n.isSprite && m.setMode(4);
                    a && a.isInstancedBufferGeometry ? 0 < a.maxInstancedCount && m.renderInstances(a, _, S) : m.render(_, S)
                }
            }, this.compile = function (e, t) {
                re = ct.get(e, t), re.init(), e.traverse(function (e) {
                    e.isLight && (re.pushLight(e), e.castShadow && re.pushShadow(e))
                }), re.setupLights(t), e.traverse(function (t) {
                    if (t.material) if (Array.isArray(t.material)) for (var r = 0; r < t.material.length; r++) w(t.material[r], e.fog, t); else w(t.material, e.fog, t)
                })
            };
            var xt = null, yt = new i;
            yt.setAnimationLoop(S), "undefined" != typeof window && yt.setContext(window), this.setAnimationLoop = function (e) {
                xt = e, ht.setAnimationLoop(e), yt.start()
            }, this.render = function (e, t, r, a) {
                if (!(t && t.isCamera)) return void console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");
                if (!ne) {
                    ce.geometry = null, ce.program = null, ce.wireframe = !1, de = -1, pe = null, !0 === e.autoUpdate && e.updateMatrixWorld(), null === t.parent && t.updateMatrixWorld(), ht.enabled && (t = ht.getCamera(t)), re = ct.get(e, t), re.init(), e.onBeforeRender(ie, e, t, r), De.multiplyMatrices(t.projectionMatrix, t.matrixWorldInverse), Te.setFromMatrix(De), Ae = this.localClippingEnabled, Ce = we.init(this.clippingPlanes, Ae, t), te = dt.get(e, t), te.init(), L(e, t, 0, ie.sortObjects), !0 === ie.sortObjects && te.sort(), Ce && we.beginShadows();
                    var i = re.state.shadowsArray;
                    vt.render(i, e, t), re.setupLights(t), Ce && we.endShadows(), this.info.autoReset && this.info.reset(), void 0 === r && (r = null), this.setRenderTarget(r), pt.render(te, e, t, a);
                    var n = te.opaque, o = te.transparent;
                    if (e.overrideMaterial) {
                        var s = e.overrideMaterial;
                        n.length && E(n, e, t, s), o.length && E(o, e, t, s)
                    } else n.length && E(n, e, t), o.length && E(o, e, t);
                    r && (tt.updateRenderTargetMipmap(r), tt.updateMultisampleRenderTarget(r)), We.buffers.depth.setTest(!0), We.buffers.depth.setMask(!0), We.buffers.color.setMask(!0), We.setPolygonOffset(!1), e.onAfterRender(ie, e, t), ht.enabled && ht.submitFrame(), te = null, re = null
                }
            }, this.allocTextureUnit = q, this.setTexture2D = function () {
                var e = !1;
                return function (t, r) {
                    t && t.isWebGLRenderTarget && (!e && (console.warn("THREE.WebGLRenderer.setTexture2D: don't use render targets as textures. Use their .texture property instead."), e = !0), t = t.texture), tt.setTexture2D(t, r)
                }
            }(), this.setTexture3D = function () {
                return function (e, t) {
                    tt.setTexture3D(e, t)
                }
            }(), this.setTexture = function () {
                var e = !1;
                return function (t, r) {
                    e || (console.warn("THREE.WebGLRenderer: .setTexture is deprecated, use setTexture2D instead."), e = !0), tt.setTexture2D(t, r)
                }
            }(), this.setTextureCube = function () {
                var e = !1;
                return function (t, r) {
                    t && t.isWebGLRenderTargetCube && (!e && (console.warn("THREE.WebGLRenderer.setTextureCube: don't use cube render targets as textures. Use their .texture property instead."), e = !0), t = t.texture), t && t.isCubeTexture || Array.isArray(t.image) && 6 === t.image.length ? tt.setTextureCube(t, r) : tt.setTextureCubeDynamic(t, r)
                }
            }(), this.setFramebuffer = function (e) {
                oe = e
            }, this.getRenderTarget = function () {
                return se
            }, this.setRenderTarget = function (e) {
                se = e, e && void 0 === Ke.get(e).__webglFramebuffer && tt.setupRenderTarget(e);
                var t = oe, r = !1;
                if (e) {
                    var a = Ke.get(e).__webglFramebuffer;
                    e.isWebGLRenderTargetCube ? (t = a[e.activeCubeFace], r = !0) : e.isWebGLMultisampleRenderTarget ? t = Ke.get(e).__webglMultisampledFramebuffer : t = a, me.copy(e.viewport), ge.copy(e.scissor), fe = e.scissorTest
                } else me.copy(Me).multiplyScalar(be), ge.copy(Se).multiplyScalar(be), fe = Ee;
                if (le !== t && (Fe.bindFramebuffer(36160, t), le = t), We.viewport(me), We.scissor(ge), We.setScissorTest(fe), r) {
                    var i = Ke.get(e.texture);
                    Fe.framebufferTexture2D(36160, 36064, 34069 + e.activeCubeFace, i.__webglTexture, e.activeMipMapLevel)
                }
            }, this.readRenderTargetPixels = function (e, t, r, a, i, n) {
                if (!(e && e.isWebGLRenderTarget)) return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
                var o = Ke.get(e).__webglFramebuffer;
                if (o) {
                    var s = !1;
                    o !== le && (Fe.bindFramebuffer(36160, o), s = !0);
                    try {
                        var l = e.texture, d = l.format, c = l.type;
                        if (d !== je.rb && ft.convert(d) !== Fe.getParameter(35739)) return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");
                        if (c !== je.kc && ft.convert(c) !== Fe.getParameter(35738) && !(c === je.C && (ke.isWebGL2 || He.get("OES_texture_float") || He.get("WEBGL_color_buffer_float"))) && !(c === je.H && (ke.isWebGL2 ? He.get("EXT_color_buffer_float") : He.get("EXT_color_buffer_half_float")))) return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");
                        36053 === Fe.checkFramebufferStatus(36160) ? 0 <= t && t <= e.width - a && 0 <= r && r <= e.height - i && Fe.readPixels(t, r, a, i, ft.convert(d), ft.convert(c), n) : console.error("THREE.WebGLRenderer.readRenderTargetPixels: readPixels from renderTarget failed. Framebuffer not complete.")
                    } finally {
                        s && Fe.bindFramebuffer(36160, le)
                    }
                }
            }, this.copyFramebufferToTexture = function (e, t, r) {
                var a = t.image.width, i = t.image.height, n = ft.convert(t.format);
                this.setTexture2D(t, 0), Fe.copyTexImage2D(3553, r || 0, n, e.x, e.y, a, i, 0)
            }, this.copyTextureToTexture = function (e, t, r, a) {
                var i = t.image.width, n = t.image.height, o = ft.convert(r.format), s = ft.convert(r.type);
                this.setTexture2D(r, 0), t.isDataTexture ? Fe.texSubImage2D(3553, a || 0, e.x, e.y, i, n, o, s, t.image.data) : Fe.texSubImage2D(3553, a || 0, e.x, e.y, o, s, t.image)
            }
        }

        var Ve = Math.log, He = Math.floor, ke = Math.cos, We = Math.abs, qe = Math.max, Xe = Math.min, je = r("6deg"),
            Ye = r("MnML"), Je = r("xvF/");
        a.prototype = Object.create(Je.a.prototype), a.prototype.constructor = a, a.prototype.isDataTexture = !0;
        var Ze = r("LxkE"), Qe = r("3+m9"), Ke = {
            alphamap_fragment: "#ifdef USE_ALPHAMAP\n\tdiffuseColor.a *= texture2D( alphaMap, vUv ).g;\n#endif",
            alphamap_pars_fragment: "#ifdef USE_ALPHAMAP\n\tuniform sampler2D alphaMap;\n#endif",
            alphatest_fragment: "#ifdef ALPHATEST\n\tif ( diffuseColor.a < ALPHATEST ) discard;\n#endif",
            aomap_fragment: "#ifdef USE_AOMAP\n\tfloat ambientOcclusion = ( texture2D( aoMap, vUv2 ).r - 1.0 ) * aoMapIntensity + 1.0;\n\treflectedLight.indirectDiffuse *= ambientOcclusion;\n\t#if defined( USE_ENVMAP ) && defined( PHYSICAL )\n\t\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\t\treflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.specularRoughness );\n\t#endif\n#endif",
            aomap_pars_fragment: "#ifdef USE_AOMAP\n\tuniform sampler2D aoMap;\n\tuniform float aoMapIntensity;\n#endif",
            begin_vertex: "vec3 transformed = vec3( position );",
            beginnormal_vertex: "vec3 objectNormal = vec3( normal );",
            bsdfs: "vec2 integrateSpecularBRDF( const in float dotNV, const in float roughness ) {\n\tconst vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );\n\tconst vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );\n\tvec4 r = roughness * c0 + c1;\n\tfloat a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;\n\treturn vec2( -1.04, 1.04 ) * a004 + r.zw;\n}\nfloat punctualLightIntensityToIrradianceFactor( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {\n#if defined ( PHYSICALLY_CORRECT_LIGHTS )\n\tfloat distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );\n\tif( cutoffDistance > 0.0 ) {\n\t\tdistanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );\n\t}\n\treturn distanceFalloff;\n#else\n\tif( cutoffDistance > 0.0 && decayExponent > 0.0 ) {\n\t\treturn pow( saturate( -lightDistance / cutoffDistance + 1.0 ), decayExponent );\n\t}\n\treturn 1.0;\n#endif\n}\nvec3 BRDF_Diffuse_Lambert( const in vec3 diffuseColor ) {\n\treturn RECIPROCAL_PI * diffuseColor;\n}\nvec3 F_Schlick( const in vec3 specularColor, const in float dotLH ) {\n\tfloat fresnel = exp2( ( -5.55473 * dotLH - 6.98316 ) * dotLH );\n\treturn ( 1.0 - specularColor ) * fresnel + specularColor;\n}\nfloat G_GGX_Smith( const in float alpha, const in float dotNL, const in float dotNV ) {\n\tfloat a2 = pow2( alpha );\n\tfloat gl = dotNL + sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n\tfloat gv = dotNV + sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n\treturn 1.0 / ( gl * gv );\n}\nfloat G_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {\n\tfloat a2 = pow2( alpha );\n\tfloat gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n\tfloat gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n\treturn 0.5 / max( gv + gl, EPSILON );\n}\nfloat D_GGX( const in float alpha, const in float dotNH ) {\n\tfloat a2 = pow2( alpha );\n\tfloat denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;\n\treturn RECIPROCAL_PI * a2 / pow2( denom );\n}\nvec3 BRDF_Specular_GGX( const in IncidentLight incidentLight, const in GeometricContext geometry, const in vec3 specularColor, const in float roughness ) {\n\tfloat alpha = pow2( roughness );\n\tvec3 halfDir = normalize( incidentLight.direction + geometry.viewDir );\n\tfloat dotNL = saturate( dot( geometry.normal, incidentLight.direction ) );\n\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\tfloat dotNH = saturate( dot( geometry.normal, halfDir ) );\n\tfloat dotLH = saturate( dot( incidentLight.direction, halfDir ) );\n\tvec3 F = F_Schlick( specularColor, dotLH );\n\tfloat G = G_GGX_SmithCorrelated( alpha, dotNL, dotNV );\n\tfloat D = D_GGX( alpha, dotNH );\n\treturn F * ( G * D );\n}\nvec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {\n\tconst float LUT_SIZE  = 64.0;\n\tconst float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;\n\tconst float LUT_BIAS  = 0.5 / LUT_SIZE;\n\tfloat dotNV = saturate( dot( N, V ) );\n\tvec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );\n\tuv = uv * LUT_SCALE + LUT_BIAS;\n\treturn uv;\n}\nfloat LTC_ClippedSphereFormFactor( const in vec3 f ) {\n\tfloat l = length( f );\n\treturn max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );\n}\nvec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {\n\tfloat x = dot( v1, v2 );\n\tfloat y = abs( x );\n\tfloat a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;\n\tfloat b = 3.4175940 + ( 4.1616724 + y ) * y;\n\tfloat v = a / b;\n\tfloat theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;\n\treturn cross( v1, v2 ) * theta_sintheta;\n}\nvec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {\n\tvec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];\n\tvec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];\n\tvec3 lightNormal = cross( v1, v2 );\n\tif( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );\n\tvec3 T1, T2;\n\tT1 = normalize( V - N * dot( V, N ) );\n\tT2 = - cross( N, T1 );\n\tmat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );\n\tvec3 coords[ 4 ];\n\tcoords[ 0 ] = mat * ( rectCoords[ 0 ] - P );\n\tcoords[ 1 ] = mat * ( rectCoords[ 1 ] - P );\n\tcoords[ 2 ] = mat * ( rectCoords[ 2 ] - P );\n\tcoords[ 3 ] = mat * ( rectCoords[ 3 ] - P );\n\tcoords[ 0 ] = normalize( coords[ 0 ] );\n\tcoords[ 1 ] = normalize( coords[ 1 ] );\n\tcoords[ 2 ] = normalize( coords[ 2 ] );\n\tcoords[ 3 ] = normalize( coords[ 3 ] );\n\tvec3 vectorFormFactor = vec3( 0.0 );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );\n\tfloat result = LTC_ClippedSphereFormFactor( vectorFormFactor );\n\treturn vec3( result );\n}\nvec3 BRDF_Specular_GGX_Environment( const in GeometricContext geometry, const in vec3 specularColor, const in float roughness ) {\n\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\tvec2 brdf = integrateSpecularBRDF( dotNV, roughness );\n\treturn specularColor * brdf.x + brdf.y;\n}\nvoid BRDF_Specular_Multiscattering_Environment( const in GeometricContext geometry, const in vec3 specularColor, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {\n\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\tvec3 F = F_Schlick( specularColor, dotNV );\n\tvec2 brdf = integrateSpecularBRDF( dotNV, roughness );\n\tvec3 FssEss = F * brdf.x + brdf.y;\n\tfloat Ess = brdf.x + brdf.y;\n\tfloat Ems = 1.0 - Ess;\n\tvec3 Favg = specularColor + ( 1.0 - specularColor ) * 0.047619;\tvec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );\n\tsingleScatter += FssEss;\n\tmultiScatter += Fms * Ems;\n}\nfloat G_BlinnPhong_Implicit( ) {\n\treturn 0.25;\n}\nfloat D_BlinnPhong( const in float shininess, const in float dotNH ) {\n\treturn RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );\n}\nvec3 BRDF_Specular_BlinnPhong( const in IncidentLight incidentLight, const in GeometricContext geometry, const in vec3 specularColor, const in float shininess ) {\n\tvec3 halfDir = normalize( incidentLight.direction + geometry.viewDir );\n\tfloat dotNH = saturate( dot( geometry.normal, halfDir ) );\n\tfloat dotLH = saturate( dot( incidentLight.direction, halfDir ) );\n\tvec3 F = F_Schlick( specularColor, dotLH );\n\tfloat G = G_BlinnPhong_Implicit( );\n\tfloat D = D_BlinnPhong( shininess, dotNH );\n\treturn F * ( G * D );\n}\nfloat GGXRoughnessToBlinnExponent( const in float ggxRoughness ) {\n\treturn ( 2.0 / pow2( ggxRoughness + 0.0001 ) - 2.0 );\n}\nfloat BlinnExponentToGGXRoughness( const in float blinnExponent ) {\n\treturn sqrt( 2.0 / ( blinnExponent + 2.0 ) );\n}",
            bumpmap_pars_fragment: "#ifdef USE_BUMPMAP\n\tuniform sampler2D bumpMap;\n\tuniform float bumpScale;\n\tvec2 dHdxy_fwd() {\n\t\tvec2 dSTdx = dFdx( vUv );\n\t\tvec2 dSTdy = dFdy( vUv );\n\t\tfloat Hll = bumpScale * texture2D( bumpMap, vUv ).x;\n\t\tfloat dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;\n\t\tfloat dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;\n\t\treturn vec2( dBx, dBy );\n\t}\n\tvec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy ) {\n\t\tvec3 vSigmaX = vec3( dFdx( surf_pos.x ), dFdx( surf_pos.y ), dFdx( surf_pos.z ) );\n\t\tvec3 vSigmaY = vec3( dFdy( surf_pos.x ), dFdy( surf_pos.y ), dFdy( surf_pos.z ) );\n\t\tvec3 vN = surf_norm;\n\t\tvec3 R1 = cross( vSigmaY, vN );\n\t\tvec3 R2 = cross( vN, vSigmaX );\n\t\tfloat fDet = dot( vSigmaX, R1 );\n\t\tfDet *= ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\t\tvec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );\n\t\treturn normalize( abs( fDet ) * surf_norm - vGrad );\n\t}\n#endif",
            clipping_planes_fragment: "#if NUM_CLIPPING_PLANES > 0\n\tvec4 plane;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {\n\t\tplane = clippingPlanes[ i ];\n\t\tif ( dot( vViewPosition, plane.xyz ) > plane.w ) discard;\n\t}\n\t#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES\n\t\tbool clipped = true;\n\t\t#pragma unroll_loop\n\t\tfor ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {\n\t\t\tplane = clippingPlanes[ i ];\n\t\t\tclipped = ( dot( vViewPosition, plane.xyz ) > plane.w ) && clipped;\n\t\t}\n\t\tif ( clipped ) discard;\n\t#endif\n#endif",
            clipping_planes_pars_fragment: "#if NUM_CLIPPING_PLANES > 0\n\t#if ! defined( PHYSICAL ) && ! defined( PHONG ) && ! defined( MATCAP )\n\t\tvarying vec3 vViewPosition;\n\t#endif\n\tuniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];\n#endif",
            clipping_planes_pars_vertex: "#if NUM_CLIPPING_PLANES > 0 && ! defined( PHYSICAL ) && ! defined( PHONG ) && ! defined( MATCAP )\n\tvarying vec3 vViewPosition;\n#endif",
            clipping_planes_vertex: "#if NUM_CLIPPING_PLANES > 0 && ! defined( PHYSICAL ) && ! defined( PHONG ) && ! defined( MATCAP )\n\tvViewPosition = - mvPosition.xyz;\n#endif",
            color_fragment: "#ifdef USE_COLOR\n\tdiffuseColor.rgb *= vColor;\n#endif",
            color_pars_fragment: "#ifdef USE_COLOR\n\tvarying vec3 vColor;\n#endif",
            color_pars_vertex: "#ifdef USE_COLOR\n\tvarying vec3 vColor;\n#endif",
            color_vertex: "#ifdef USE_COLOR\n\tvColor.xyz = color.xyz;\n#endif",
            common: "#define PI 3.14159265359\n#define PI2 6.28318530718\n#define PI_HALF 1.5707963267949\n#define RECIPROCAL_PI 0.31830988618\n#define RECIPROCAL_PI2 0.15915494\n#define LOG2 1.442695\n#define EPSILON 1e-6\n#define saturate(a) clamp( a, 0.0, 1.0 )\n#define whiteCompliment(a) ( 1.0 - saturate( a ) )\nfloat pow2( const in float x ) { return x*x; }\nfloat pow3( const in float x ) { return x*x*x; }\nfloat pow4( const in float x ) { float x2 = x*x; return x2*x2; }\nfloat average( const in vec3 color ) { return dot( color, vec3( 0.3333 ) ); }\nhighp float rand( const in vec2 uv ) {\n\tconst highp float a = 12.9898, b = 78.233, c = 43758.5453;\n\thighp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );\n\treturn fract(sin(sn) * c);\n}\nstruct IncidentLight {\n\tvec3 color;\n\tvec3 direction;\n\tbool visible;\n};\nstruct ReflectedLight {\n\tvec3 directDiffuse;\n\tvec3 directSpecular;\n\tvec3 indirectDiffuse;\n\tvec3 indirectSpecular;\n};\nstruct GeometricContext {\n\tvec3 position;\n\tvec3 normal;\n\tvec3 viewDir;\n};\nvec3 transformDirection( in vec3 dir, in mat4 matrix ) {\n\treturn normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );\n}\nvec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {\n\treturn normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );\n}\nvec3 projectOnPlane(in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\tfloat distance = dot( planeNormal, point - pointOnPlane );\n\treturn - distance * planeNormal + point;\n}\nfloat sideOfPlane( in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\treturn sign( dot( point - pointOnPlane, planeNormal ) );\n}\nvec3 linePlaneIntersect( in vec3 pointOnLine, in vec3 lineDirection, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\treturn lineDirection * ( dot( planeNormal, pointOnPlane - pointOnLine ) / dot( planeNormal, lineDirection ) ) + pointOnLine;\n}\nmat3 transposeMat3( const in mat3 m ) {\n\tmat3 tmp;\n\ttmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );\n\ttmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );\n\ttmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );\n\treturn tmp;\n}\nfloat linearToRelativeLuminance( const in vec3 color ) {\n\tvec3 weights = vec3( 0.2126, 0.7152, 0.0722 );\n\treturn dot( weights, color.rgb );\n}",
            cube_uv_reflection_fragment: "#ifdef ENVMAP_TYPE_CUBE_UV\n#define cubeUV_textureSize (1024.0)\nint getFaceFromDirection(vec3 direction) {\n\tvec3 absDirection = abs(direction);\n\tint face = -1;\n\tif( absDirection.x > absDirection.z ) {\n\t\tif(absDirection.x > absDirection.y )\n\t\t\tface = direction.x > 0.0 ? 0 : 3;\n\t\telse\n\t\t\tface = direction.y > 0.0 ? 1 : 4;\n\t}\n\telse {\n\t\tif(absDirection.z > absDirection.y )\n\t\t\tface = direction.z > 0.0 ? 2 : 5;\n\t\telse\n\t\t\tface = direction.y > 0.0 ? 1 : 4;\n\t}\n\treturn face;\n}\n#define cubeUV_maxLods1  (log2(cubeUV_textureSize*0.25) - 1.0)\n#define cubeUV_rangeClamp (exp2((6.0 - 1.0) * 2.0))\nvec2 MipLevelInfo( vec3 vec, float roughnessLevel, float roughness ) {\n\tfloat scale = exp2(cubeUV_maxLods1 - roughnessLevel);\n\tfloat dxRoughness = dFdx(roughness);\n\tfloat dyRoughness = dFdy(roughness);\n\tvec3 dx = dFdx( vec * scale * dxRoughness );\n\tvec3 dy = dFdy( vec * scale * dyRoughness );\n\tfloat d = max( dot( dx, dx ), dot( dy, dy ) );\n\td = clamp(d, 1.0, cubeUV_rangeClamp);\n\tfloat mipLevel = 0.5 * log2(d);\n\treturn vec2(floor(mipLevel), fract(mipLevel));\n}\n#define cubeUV_maxLods2 (log2(cubeUV_textureSize*0.25) - 2.0)\n#define cubeUV_rcpTextureSize (1.0 / cubeUV_textureSize)\nvec2 getCubeUV(vec3 direction, float roughnessLevel, float mipLevel) {\n\tmipLevel = roughnessLevel > cubeUV_maxLods2 - 3.0 ? 0.0 : mipLevel;\n\tfloat a = 16.0 * cubeUV_rcpTextureSize;\n\tvec2 exp2_packed = exp2( vec2( roughnessLevel, mipLevel ) );\n\tvec2 rcp_exp2_packed = vec2( 1.0 ) / exp2_packed;\n\tfloat powScale = exp2_packed.x * exp2_packed.y;\n\tfloat scale = rcp_exp2_packed.x * rcp_exp2_packed.y * 0.25;\n\tfloat mipOffset = 0.75*(1.0 - rcp_exp2_packed.y) * rcp_exp2_packed.x;\n\tbool bRes = mipLevel == 0.0;\n\tscale =  bRes && (scale < a) ? a : scale;\n\tvec3 r;\n\tvec2 offset;\n\tint face = getFaceFromDirection(direction);\n\tfloat rcpPowScale = 1.0 / powScale;\n\tif( face == 0) {\n\t\tr = vec3(direction.x, -direction.z, direction.y);\n\t\toffset = vec2(0.0+mipOffset,0.75 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? a : offset.y;\n\t}\n\telse if( face == 1) {\n\t\tr = vec3(direction.y, direction.x, direction.z);\n\t\toffset = vec2(scale+mipOffset, 0.75 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? a : offset.y;\n\t}\n\telse if( face == 2) {\n\t\tr = vec3(direction.z, direction.x, direction.y);\n\t\toffset = vec2(2.0*scale+mipOffset, 0.75 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? a : offset.y;\n\t}\n\telse if( face == 3) {\n\t\tr = vec3(direction.x, direction.z, direction.y);\n\t\toffset = vec2(0.0+mipOffset,0.5 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? 0.0 : offset.y;\n\t}\n\telse if( face == 4) {\n\t\tr = vec3(direction.y, direction.x, -direction.z);\n\t\toffset = vec2(scale+mipOffset, 0.5 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? 0.0 : offset.y;\n\t}\n\telse {\n\t\tr = vec3(direction.z, -direction.x, direction.y);\n\t\toffset = vec2(2.0*scale+mipOffset, 0.5 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? 0.0 : offset.y;\n\t}\n\tr = normalize(r);\n\tfloat texelOffset = 0.5 * cubeUV_rcpTextureSize;\n\tvec2 s = ( r.yz / abs( r.x ) + vec2( 1.0 ) ) * 0.5;\n\tvec2 base = offset + vec2( texelOffset );\n\treturn base + s * ( scale - 2.0 * texelOffset );\n}\n#define cubeUV_maxLods3 (log2(cubeUV_textureSize*0.25) - 3.0)\nvec4 textureCubeUV( sampler2D envMap, vec3 reflectedDirection, float roughness ) {\n\tfloat roughnessVal = roughness* cubeUV_maxLods3;\n\tfloat r1 = floor(roughnessVal);\n\tfloat r2 = r1 + 1.0;\n\tfloat t = fract(roughnessVal);\n\tvec2 mipInfo = MipLevelInfo(reflectedDirection, r1, roughness);\n\tfloat s = mipInfo.y;\n\tfloat level0 = mipInfo.x;\n\tfloat level1 = level0 + 1.0;\n\tlevel1 = level1 > 5.0 ? 5.0 : level1;\n\tlevel0 += min( floor( s + 0.5 ), 5.0 );\n\tvec2 uv_10 = getCubeUV(reflectedDirection, r1, level0);\n\tvec4 color10 = envMapTexelToLinear(texture2D(envMap, uv_10));\n\tvec2 uv_20 = getCubeUV(reflectedDirection, r2, level0);\n\tvec4 color20 = envMapTexelToLinear(texture2D(envMap, uv_20));\n\tvec4 result = mix(color10, color20, t);\n\treturn vec4(result.rgb, 1.0);\n}\n#endif",
            defaultnormal_vertex: "vec3 transformedNormal = normalMatrix * objectNormal;\n#ifdef FLIP_SIDED\n\ttransformedNormal = - transformedNormal;\n#endif",
            displacementmap_pars_vertex: "#ifdef USE_DISPLACEMENTMAP\n\tuniform sampler2D displacementMap;\n\tuniform float displacementScale;\n\tuniform float displacementBias;\n#endif",
            displacementmap_vertex: "#ifdef USE_DISPLACEMENTMAP\n\ttransformed += normalize( objectNormal ) * ( texture2D( displacementMap, uv ).x * displacementScale + displacementBias );\n#endif",
            emissivemap_fragment: "#ifdef USE_EMISSIVEMAP\n\tvec4 emissiveColor = texture2D( emissiveMap, vUv );\n\temissiveColor.rgb = emissiveMapTexelToLinear( emissiveColor ).rgb;\n\ttotalEmissiveRadiance *= emissiveColor.rgb;\n#endif",
            emissivemap_pars_fragment: "#ifdef USE_EMISSIVEMAP\n\tuniform sampler2D emissiveMap;\n#endif",
            encodings_fragment: "gl_FragColor = linearToOutputTexel( gl_FragColor );",
            encodings_pars_fragment: "\nvec4 LinearToLinear( in vec4 value ) {\n\treturn value;\n}\nvec4 GammaToLinear( in vec4 value, in float gammaFactor ) {\n\treturn vec4( pow( value.rgb, vec3( gammaFactor ) ), value.a );\n}\nvec4 LinearToGamma( in vec4 value, in float gammaFactor ) {\n\treturn vec4( pow( value.rgb, vec3( 1.0 / gammaFactor ) ), value.a );\n}\nvec4 sRGBToLinear( in vec4 value ) {\n\treturn vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );\n}\nvec4 LinearTosRGB( in vec4 value ) {\n\treturn vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );\n}\nvec4 RGBEToLinear( in vec4 value ) {\n\treturn vec4( value.rgb * exp2( value.a * 255.0 - 128.0 ), 1.0 );\n}\nvec4 LinearToRGBE( in vec4 value ) {\n\tfloat maxComponent = max( max( value.r, value.g ), value.b );\n\tfloat fExp = clamp( ceil( log2( maxComponent ) ), -128.0, 127.0 );\n\treturn vec4( value.rgb / exp2( fExp ), ( fExp + 128.0 ) / 255.0 );\n}\nvec4 RGBMToLinear( in vec4 value, in float maxRange ) {\n\treturn vec4( value.rgb * value.a * maxRange, 1.0 );\n}\nvec4 LinearToRGBM( in vec4 value, in float maxRange ) {\n\tfloat maxRGB = max( value.r, max( value.g, value.b ) );\n\tfloat M = clamp( maxRGB / maxRange, 0.0, 1.0 );\n\tM = ceil( M * 255.0 ) / 255.0;\n\treturn vec4( value.rgb / ( M * maxRange ), M );\n}\nvec4 RGBDToLinear( in vec4 value, in float maxRange ) {\n\treturn vec4( value.rgb * ( ( maxRange / 255.0 ) / value.a ), 1.0 );\n}\nvec4 LinearToRGBD( in vec4 value, in float maxRange ) {\n\tfloat maxRGB = max( value.r, max( value.g, value.b ) );\n\tfloat D = max( maxRange / maxRGB, 1.0 );\n\tD = min( floor( D ) / 255.0, 1.0 );\n\treturn vec4( value.rgb * ( D * ( 255.0 / maxRange ) ), D );\n}\nconst mat3 cLogLuvM = mat3( 0.2209, 0.3390, 0.4184, 0.1138, 0.6780, 0.7319, 0.0102, 0.1130, 0.2969 );\nvec4 LinearToLogLuv( in vec4 value )  {\n\tvec3 Xp_Y_XYZp = cLogLuvM * value.rgb;\n\tXp_Y_XYZp = max( Xp_Y_XYZp, vec3( 1e-6, 1e-6, 1e-6 ) );\n\tvec4 vResult;\n\tvResult.xy = Xp_Y_XYZp.xy / Xp_Y_XYZp.z;\n\tfloat Le = 2.0 * log2(Xp_Y_XYZp.y) + 127.0;\n\tvResult.w = fract( Le );\n\tvResult.z = ( Le - ( floor( vResult.w * 255.0 ) ) / 255.0 ) / 255.0;\n\treturn vResult;\n}\nconst mat3 cLogLuvInverseM = mat3( 6.0014, -2.7008, -1.7996, -1.3320, 3.1029, -5.7721, 0.3008, -1.0882, 5.6268 );\nvec4 LogLuvToLinear( in vec4 value ) {\n\tfloat Le = value.z * 255.0 + value.w;\n\tvec3 Xp_Y_XYZp;\n\tXp_Y_XYZp.y = exp2( ( Le - 127.0 ) / 2.0 );\n\tXp_Y_XYZp.z = Xp_Y_XYZp.y / value.y;\n\tXp_Y_XYZp.x = value.x * Xp_Y_XYZp.z;\n\tvec3 vRGB = cLogLuvInverseM * Xp_Y_XYZp.rgb;\n\treturn vec4( max( vRGB, 0.0 ), 1.0 );\n}",
            envmap_fragment: "#ifdef USE_ENVMAP\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\t\tvec3 cameraToVertex = normalize( vWorldPosition - cameraPosition );\n\t\tvec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvec3 reflectVec = reflect( cameraToVertex, worldNormal );\n\t\t#else\n\t\t\tvec3 reflectVec = refract( cameraToVertex, worldNormal, refractionRatio );\n\t\t#endif\n\t#else\n\t\tvec3 reflectVec = vReflect;\n\t#endif\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tvec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );\n\t#elif defined( ENVMAP_TYPE_EQUIREC )\n\t\tvec2 sampleUV;\n\t\treflectVec = normalize( reflectVec );\n\t\tsampleUV.y = asin( clamp( reflectVec.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n\t\tsampleUV.x = atan( reflectVec.z, reflectVec.x ) * RECIPROCAL_PI2 + 0.5;\n\t\tvec4 envColor = texture2D( envMap, sampleUV );\n\t#elif defined( ENVMAP_TYPE_SPHERE )\n\t\treflectVec = normalize( reflectVec );\n\t\tvec3 reflectView = normalize( ( viewMatrix * vec4( reflectVec, 0.0 ) ).xyz + vec3( 0.0, 0.0, 1.0 ) );\n\t\tvec4 envColor = texture2D( envMap, reflectView.xy * 0.5 + 0.5 );\n\t#else\n\t\tvec4 envColor = vec4( 0.0 );\n\t#endif\n\tenvColor = envMapTexelToLinear( envColor );\n\t#ifdef ENVMAP_BLENDING_MULTIPLY\n\t\toutgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );\n\t#elif defined( ENVMAP_BLENDING_MIX )\n\t\toutgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );\n\t#elif defined( ENVMAP_BLENDING_ADD )\n\t\toutgoingLight += envColor.xyz * specularStrength * reflectivity;\n\t#endif\n#endif",
            envmap_pars_fragment: "#if defined( USE_ENVMAP ) || defined( PHYSICAL )\n\tuniform float reflectivity;\n\tuniform float envMapIntensity;\n#endif\n#ifdef USE_ENVMAP\n\t#if ! defined( PHYSICAL ) && ( defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) )\n\t\tvarying vec3 vWorldPosition;\n\t#endif\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tuniform samplerCube envMap;\n\t#else\n\t\tuniform sampler2D envMap;\n\t#endif\n\tuniform float flipEnvMap;\n\tuniform int maxMipLevel;\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( PHYSICAL )\n\t\tuniform float refractionRatio;\n\t#else\n\t\tvarying vec3 vReflect;\n\t#endif\n#endif",
            envmap_pars_vertex: "#ifdef USE_ENVMAP\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\t\tvarying vec3 vWorldPosition;\n\t#else\n\t\tvarying vec3 vReflect;\n\t\tuniform float refractionRatio;\n\t#endif\n#endif",
            envmap_physical_pars_fragment: "#if defined( USE_ENVMAP ) && defined( PHYSICAL )\n\tvec3 getLightProbeIndirectIrradiance( const in GeometricContext geometry, const in int maxMIPLevel ) {\n\t\tvec3 worldNormal = inverseTransformDirection( geometry.normal, viewMatrix );\n\t\t#ifdef ENVMAP_TYPE_CUBE\n\t\t\tvec3 queryVec = vec3( flipEnvMap * worldNormal.x, worldNormal.yz );\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = textureCubeLodEXT( envMap, queryVec, float( maxMIPLevel ) );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = textureCube( envMap, queryVec, float( maxMIPLevel ) );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#elif defined( ENVMAP_TYPE_CUBE_UV )\n\t\t\tvec3 queryVec = vec3( flipEnvMap * worldNormal.x, worldNormal.yz );\n\t\t\tvec4 envMapColor = textureCubeUV( envMap, queryVec, 1.0 );\n\t\t#else\n\t\t\tvec4 envMapColor = vec4( 0.0 );\n\t\t#endif\n\t\treturn PI * envMapColor.rgb * envMapIntensity;\n\t}\n\tfloat getSpecularMIPLevel( const in float blinnShininessExponent, const in int maxMIPLevel ) {\n\t\tfloat maxMIPLevelScalar = float( maxMIPLevel );\n\t\tfloat desiredMIPLevel = maxMIPLevelScalar + 0.79248 - 0.5 * log2( pow2( blinnShininessExponent ) + 1.0 );\n\t\treturn clamp( desiredMIPLevel, 0.0, maxMIPLevelScalar );\n\t}\n\tvec3 getLightProbeIndirectRadiance( const in GeometricContext geometry, const in float blinnShininessExponent, const in int maxMIPLevel ) {\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvec3 reflectVec = reflect( -geometry.viewDir, geometry.normal );\n\t\t#else\n\t\t\tvec3 reflectVec = refract( -geometry.viewDir, geometry.normal, refractionRatio );\n\t\t#endif\n\t\treflectVec = inverseTransformDirection( reflectVec, viewMatrix );\n\t\tfloat specularMIPLevel = getSpecularMIPLevel( blinnShininessExponent, maxMIPLevel );\n\t\t#ifdef ENVMAP_TYPE_CUBE\n\t\t\tvec3 queryReflectVec = vec3( flipEnvMap * reflectVec.x, reflectVec.yz );\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = textureCubeLodEXT( envMap, queryReflectVec, specularMIPLevel );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = textureCube( envMap, queryReflectVec, specularMIPLevel );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#elif defined( ENVMAP_TYPE_CUBE_UV )\n\t\t\tvec3 queryReflectVec = vec3( flipEnvMap * reflectVec.x, reflectVec.yz );\n\t\t\tvec4 envMapColor = textureCubeUV( envMap, queryReflectVec, BlinnExponentToGGXRoughness(blinnShininessExponent ));\n\t\t#elif defined( ENVMAP_TYPE_EQUIREC )\n\t\t\tvec2 sampleUV;\n\t\t\tsampleUV.y = asin( clamp( reflectVec.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n\t\t\tsampleUV.x = atan( reflectVec.z, reflectVec.x ) * RECIPROCAL_PI2 + 0.5;\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = texture2DLodEXT( envMap, sampleUV, specularMIPLevel );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = texture2D( envMap, sampleUV, specularMIPLevel );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#elif defined( ENVMAP_TYPE_SPHERE )\n\t\t\tvec3 reflectView = normalize( ( viewMatrix * vec4( reflectVec, 0.0 ) ).xyz + vec3( 0.0,0.0,1.0 ) );\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = texture2DLodEXT( envMap, reflectView.xy * 0.5 + 0.5, specularMIPLevel );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = texture2D( envMap, reflectView.xy * 0.5 + 0.5, specularMIPLevel );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#endif\n\t\treturn envMapColor.rgb * envMapIntensity;\n\t}\n#endif",
            envmap_vertex: "#ifdef USE_ENVMAP\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\t\tvWorldPosition = worldPosition.xyz;\n\t#else\n\t\tvec3 cameraToVertex = normalize( worldPosition.xyz - cameraPosition );\n\t\tvec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvReflect = reflect( cameraToVertex, worldNormal );\n\t\t#else\n\t\t\tvReflect = refract( cameraToVertex, worldNormal, refractionRatio );\n\t\t#endif\n\t#endif\n#endif",
            fog_vertex: "#ifdef USE_FOG\n\tfogDepth = -mvPosition.z;\n#endif",
            fog_pars_vertex: "#ifdef USE_FOG\n\tvarying float fogDepth;\n#endif",
            fog_fragment: "#ifdef USE_FOG\n\t#ifdef FOG_EXP2\n\t\tfloat fogFactor = whiteCompliment( exp2( - fogDensity * fogDensity * fogDepth * fogDepth * LOG2 ) );\n\t#else\n\t\tfloat fogFactor = smoothstep( fogNear, fogFar, fogDepth );\n\t#endif\n\tgl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );\n#endif",
            fog_pars_fragment: "#ifdef USE_FOG\n\tuniform vec3 fogColor;\n\tvarying float fogDepth;\n\t#ifdef FOG_EXP2\n\t\tuniform float fogDensity;\n\t#else\n\t\tuniform float fogNear;\n\t\tuniform float fogFar;\n\t#endif\n#endif",
            gradientmap_pars_fragment: "#ifdef TOON\n\tuniform sampler2D gradientMap;\n\tvec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {\n\t\tfloat dotNL = dot( normal, lightDirection );\n\t\tvec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );\n\t\t#ifdef USE_GRADIENTMAP\n\t\t\treturn texture2D( gradientMap, coord ).rgb;\n\t\t#else\n\t\t\treturn ( coord.x < 0.7 ) ? vec3( 0.7 ) : vec3( 1.0 );\n\t\t#endif\n\t}\n#endif",
            lightmap_fragment: "#ifdef USE_LIGHTMAP\n\treflectedLight.indirectDiffuse += PI * texture2D( lightMap, vUv2 ).xyz * lightMapIntensity;\n#endif",
            lightmap_pars_fragment: "#ifdef USE_LIGHTMAP\n\tuniform sampler2D lightMap;\n\tuniform float lightMapIntensity;\n#endif",
            lights_lambert_vertex: "vec3 diffuse = vec3( 1.0 );\nGeometricContext geometry;\ngeometry.position = mvPosition.xyz;\ngeometry.normal = normalize( transformedNormal );\ngeometry.viewDir = normalize( -mvPosition.xyz );\nGeometricContext backGeometry;\nbackGeometry.position = geometry.position;\nbackGeometry.normal = -geometry.normal;\nbackGeometry.viewDir = geometry.viewDir;\nvLightFront = vec3( 0.0 );\nvIndirectFront = vec3( 0.0 );\n#ifdef DOUBLE_SIDED\n\tvLightBack = vec3( 0.0 );\n\tvIndirectBack = vec3( 0.0 );\n#endif\nIncidentLight directLight;\nfloat dotNL;\nvec3 directLightColor_Diffuse;\n#if NUM_POINT_LIGHTS > 0\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tgetPointDirectLightIrradiance( pointLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n#endif\n#if NUM_SPOT_LIGHTS > 0\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tgetSpotDirectLightIrradiance( spotLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n#endif\n#if NUM_DIR_LIGHTS > 0\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tgetDirectionalDirectLightIrradiance( directionalLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n#endif\n#if NUM_HEMI_LIGHTS > 0\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n\t\tvIndirectFront += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvIndirectBack += getHemisphereLightIrradiance( hemisphereLights[ i ], backGeometry );\n\t\t#endif\n\t}\n#endif",
            lights_pars_begin: "uniform vec3 ambientLightColor;\nvec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {\n\tvec3 irradiance = ambientLightColor;\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tirradiance *= PI;\n\t#endif\n\treturn irradiance;\n}\n#if NUM_DIR_LIGHTS > 0\n\tstruct DirectionalLight {\n\t\tvec3 direction;\n\t\tvec3 color;\n\t\tint shadow;\n\t\tfloat shadowBias;\n\t\tfloat shadowRadius;\n\t\tvec2 shadowMapSize;\n\t};\n\tuniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];\n\tvoid getDirectionalDirectLightIrradiance( const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight directLight ) {\n\t\tdirectLight.color = directionalLight.color;\n\t\tdirectLight.direction = directionalLight.direction;\n\t\tdirectLight.visible = true;\n\t}\n#endif\n#if NUM_POINT_LIGHTS > 0\n\tstruct PointLight {\n\t\tvec3 position;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t\tint shadow;\n\t\tfloat shadowBias;\n\t\tfloat shadowRadius;\n\t\tvec2 shadowMapSize;\n\t\tfloat shadowCameraNear;\n\t\tfloat shadowCameraFar;\n\t};\n\tuniform PointLight pointLights[ NUM_POINT_LIGHTS ];\n\tvoid getPointDirectLightIrradiance( const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight directLight ) {\n\t\tvec3 lVector = pointLight.position - geometry.position;\n\t\tdirectLight.direction = normalize( lVector );\n\t\tfloat lightDistance = length( lVector );\n\t\tdirectLight.color = pointLight.color;\n\t\tdirectLight.color *= punctualLightIntensityToIrradianceFactor( lightDistance, pointLight.distance, pointLight.decay );\n\t\tdirectLight.visible = ( directLight.color != vec3( 0.0 ) );\n\t}\n#endif\n#if NUM_SPOT_LIGHTS > 0\n\tstruct SpotLight {\n\t\tvec3 position;\n\t\tvec3 direction;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t\tfloat coneCos;\n\t\tfloat penumbraCos;\n\t\tint shadow;\n\t\tfloat shadowBias;\n\t\tfloat shadowRadius;\n\t\tvec2 shadowMapSize;\n\t};\n\tuniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];\n\tvoid getSpotDirectLightIrradiance( const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight directLight  ) {\n\t\tvec3 lVector = spotLight.position - geometry.position;\n\t\tdirectLight.direction = normalize( lVector );\n\t\tfloat lightDistance = length( lVector );\n\t\tfloat angleCos = dot( directLight.direction, spotLight.direction );\n\t\tif ( angleCos > spotLight.coneCos ) {\n\t\t\tfloat spotEffect = smoothstep( spotLight.coneCos, spotLight.penumbraCos, angleCos );\n\t\t\tdirectLight.color = spotLight.color;\n\t\t\tdirectLight.color *= spotEffect * punctualLightIntensityToIrradianceFactor( lightDistance, spotLight.distance, spotLight.decay );\n\t\t\tdirectLight.visible = true;\n\t\t} else {\n\t\t\tdirectLight.color = vec3( 0.0 );\n\t\t\tdirectLight.visible = false;\n\t\t}\n\t}\n#endif\n#if NUM_RECT_AREA_LIGHTS > 0\n\tstruct RectAreaLight {\n\t\tvec3 color;\n\t\tvec3 position;\n\t\tvec3 halfWidth;\n\t\tvec3 halfHeight;\n\t};\n\tuniform sampler2D ltc_1;\tuniform sampler2D ltc_2;\n\tuniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];\n#endif\n#if NUM_HEMI_LIGHTS > 0\n\tstruct HemisphereLight {\n\t\tvec3 direction;\n\t\tvec3 skyColor;\n\t\tvec3 groundColor;\n\t};\n\tuniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];\n\tvec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in GeometricContext geometry ) {\n\t\tfloat dotNL = dot( geometry.normal, hemiLight.direction );\n\t\tfloat hemiDiffuseWeight = 0.5 * dotNL + 0.5;\n\t\tvec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );\n\t\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\t\tirradiance *= PI;\n\t\t#endif\n\t\treturn irradiance;\n\t}\n#endif",
            lights_phong_fragment: "BlinnPhongMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.specularColor = specular;\nmaterial.specularShininess = shininess;\nmaterial.specularStrength = specularStrength;",
            lights_phong_pars_fragment: "varying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\nstruct BlinnPhongMaterial {\n\tvec3\tdiffuseColor;\n\tvec3\tspecularColor;\n\tfloat\tspecularShininess;\n\tfloat\tspecularStrength;\n};\nvoid RE_Direct_BlinnPhong( const in IncidentLight directLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\t#ifdef TOON\n\t\tvec3 irradiance = getGradientIrradiance( geometry.normal, directLight.direction ) * directLight.color;\n\t#else\n\t\tfloat dotNL = saturate( dot( geometry.normal, directLight.direction ) );\n\t\tvec3 irradiance = dotNL * directLight.color;\n\t#endif\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tirradiance *= PI;\n\t#endif\n\treflectedLight.directDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n\treflectedLight.directSpecular += irradiance * BRDF_Specular_BlinnPhong( directLight, geometry, material.specularColor, material.specularShininess ) * material.specularStrength;\n}\nvoid RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n}\n#define RE_Direct\t\t\t\tRE_Direct_BlinnPhong\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_BlinnPhong\n#define Material_LightProbeLOD( material )\t(0)",
            lights_physical_fragment: "PhysicalMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );\nmaterial.specularRoughness = clamp( roughnessFactor, 0.04, 1.0 );\n#ifdef STANDARD\n\tmaterial.specularColor = mix( vec3( DEFAULT_SPECULAR_COEFFICIENT ), diffuseColor.rgb, metalnessFactor );\n#else\n\tmaterial.specularColor = mix( vec3( MAXIMUM_SPECULAR_COEFFICIENT * pow2( reflectivity ) ), diffuseColor.rgb, metalnessFactor );\n\tmaterial.clearCoat = saturate( clearCoat );\tmaterial.clearCoatRoughness = clamp( clearCoatRoughness, 0.04, 1.0 );\n#endif",
            lights_physical_pars_fragment: "struct PhysicalMaterial {\n\tvec3\tdiffuseColor;\n\tfloat\tspecularRoughness;\n\tvec3\tspecularColor;\n\t#ifndef STANDARD\n\t\tfloat clearCoat;\n\t\tfloat clearCoatRoughness;\n\t#endif\n};\n#define MAXIMUM_SPECULAR_COEFFICIENT 0.16\n#define DEFAULT_SPECULAR_COEFFICIENT 0.04\nfloat clearCoatDHRApprox( const in float roughness, const in float dotNL ) {\n\treturn DEFAULT_SPECULAR_COEFFICIENT + ( 1.0 - DEFAULT_SPECULAR_COEFFICIENT ) * ( pow( 1.0 - dotNL, 5.0 ) * pow( 1.0 - roughness, 2.0 ) );\n}\n#if NUM_RECT_AREA_LIGHTS > 0\n\tvoid RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\t\tvec3 normal = geometry.normal;\n\t\tvec3 viewDir = geometry.viewDir;\n\t\tvec3 position = geometry.position;\n\t\tvec3 lightPos = rectAreaLight.position;\n\t\tvec3 halfWidth = rectAreaLight.halfWidth;\n\t\tvec3 halfHeight = rectAreaLight.halfHeight;\n\t\tvec3 lightColor = rectAreaLight.color;\n\t\tfloat roughness = material.specularRoughness;\n\t\tvec3 rectCoords[ 4 ];\n\t\trectCoords[ 0 ] = lightPos + halfWidth - halfHeight;\t\trectCoords[ 1 ] = lightPos - halfWidth - halfHeight;\n\t\trectCoords[ 2 ] = lightPos - halfWidth + halfHeight;\n\t\trectCoords[ 3 ] = lightPos + halfWidth + halfHeight;\n\t\tvec2 uv = LTC_Uv( normal, viewDir, roughness );\n\t\tvec4 t1 = texture2D( ltc_1, uv );\n\t\tvec4 t2 = texture2D( ltc_2, uv );\n\t\tmat3 mInv = mat3(\n\t\t\tvec3( t1.x, 0, t1.y ),\n\t\t\tvec3(    0, 1,    0 ),\n\t\t\tvec3( t1.z, 0, t1.w )\n\t\t);\n\t\tvec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );\n\t\treflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );\n\t\treflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );\n\t}\n#endif\nvoid RE_Direct_Physical( const in IncidentLight directLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\tfloat dotNL = saturate( dot( geometry.normal, directLight.direction ) );\n\tvec3 irradiance = dotNL * directLight.color;\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tirradiance *= PI;\n\t#endif\n\t#ifndef STANDARD\n\t\tfloat clearCoatDHR = material.clearCoat * clearCoatDHRApprox( material.clearCoatRoughness, dotNL );\n\t#else\n\t\tfloat clearCoatDHR = 0.0;\n\t#endif\n\treflectedLight.directSpecular += ( 1.0 - clearCoatDHR ) * irradiance * BRDF_Specular_GGX( directLight, geometry, material.specularColor, material.specularRoughness );\n\treflectedLight.directDiffuse += ( 1.0 - clearCoatDHR ) * irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n\t#ifndef STANDARD\n\t\treflectedLight.directSpecular += irradiance * material.clearCoat * BRDF_Specular_GGX( directLight, geometry, vec3( DEFAULT_SPECULAR_COEFFICIENT ), material.clearCoatRoughness );\n\t#endif\n}\nvoid RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\t#ifndef ENVMAP_TYPE_CUBE_UV\n\t\treflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n\t#endif\n}\nvoid RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearCoatRadiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {\n\t#ifndef STANDARD\n\t\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\t\tfloat dotNL = dotNV;\n\t\tfloat clearCoatDHR = material.clearCoat * clearCoatDHRApprox( material.clearCoatRoughness, dotNL );\n\t#else\n\t\tfloat clearCoatDHR = 0.0;\n\t#endif\n\tfloat clearCoatInv = 1.0 - clearCoatDHR;\n\t#if defined( ENVMAP_TYPE_CUBE_UV )\n\t\tvec3 singleScattering = vec3( 0.0 );\n\t\tvec3 multiScattering = vec3( 0.0 );\n\t\tvec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;\n\t\tBRDF_Specular_Multiscattering_Environment( geometry, material.specularColor, material.specularRoughness, singleScattering, multiScattering );\n\t\tvec3 diffuse = material.diffuseColor;\n\t\treflectedLight.indirectSpecular += clearCoatInv * radiance * singleScattering;\n\t\treflectedLight.indirectDiffuse += multiScattering * cosineWeightedIrradiance;\n\t\treflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;\n\t#else\n\t\treflectedLight.indirectSpecular += clearCoatInv * radiance * BRDF_Specular_GGX_Environment( geometry, material.specularColor, material.specularRoughness );\n\t#endif\n\t#ifndef STANDARD\n\t\treflectedLight.indirectSpecular += clearCoatRadiance * material.clearCoat * BRDF_Specular_GGX_Environment( geometry, vec3( DEFAULT_SPECULAR_COEFFICIENT ), material.clearCoatRoughness );\n\t#endif\n}\n#define RE_Direct\t\t\t\tRE_Direct_Physical\n#define RE_Direct_RectArea\t\tRE_Direct_RectArea_Physical\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_Physical\n#define RE_IndirectSpecular\t\tRE_IndirectSpecular_Physical\n#define Material_BlinnShininessExponent( material )   GGXRoughnessToBlinnExponent( material.specularRoughness )\n#define Material_ClearCoat_BlinnShininessExponent( material )   GGXRoughnessToBlinnExponent( material.clearCoatRoughness )\nfloat computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {\n\treturn saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );\n}",
            lights_fragment_begin: "\nGeometricContext geometry;\ngeometry.position = - vViewPosition;\ngeometry.normal = normal;\ngeometry.viewDir = normalize( vViewPosition );\nIncidentLight directLight;\n#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )\n\tPointLight pointLight;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tpointLight = pointLights[ i ];\n\t\tgetPointDirectLightIrradiance( pointLight, geometry, directLight );\n\t\t#ifdef USE_SHADOWMAP\n\t\tdirectLight.color *= all( bvec2( pointLight.shadow, directLight.visible ) ) ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n#endif\n#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )\n\tSpotLight spotLight;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tspotLight = spotLights[ i ];\n\t\tgetSpotDirectLightIrradiance( spotLight, geometry, directLight );\n\t\t#ifdef USE_SHADOWMAP\n\t\tdirectLight.color *= all( bvec2( spotLight.shadow, directLight.visible ) ) ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n#endif\n#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )\n\tDirectionalLight directionalLight;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tdirectionalLight = directionalLights[ i ];\n\t\tgetDirectionalDirectLightIrradiance( directionalLight, geometry, directLight );\n\t\t#ifdef USE_SHADOWMAP\n\t\tdirectLight.color *= all( bvec2( directionalLight.shadow, directLight.visible ) ) ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n#endif\n#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )\n\tRectAreaLight rectAreaLight;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {\n\t\trectAreaLight = rectAreaLights[ i ];\n\t\tRE_Direct_RectArea( rectAreaLight, geometry, material, reflectedLight );\n\t}\n#endif\n#if defined( RE_IndirectDiffuse )\n\tvec3 irradiance = getAmbientLightIrradiance( ambientLightColor );\n\t#if ( NUM_HEMI_LIGHTS > 0 )\n\t\t#pragma unroll_loop\n\t\tfor ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n\t\t\tirradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );\n\t\t}\n\t#endif\n#endif\n#if defined( RE_IndirectSpecular )\n\tvec3 radiance = vec3( 0.0 );\n\tvec3 clearCoatRadiance = vec3( 0.0 );\n#endif",
            lights_fragment_maps: "#if defined( RE_IndirectDiffuse )\n\t#ifdef USE_LIGHTMAP\n\t\tvec3 lightMapIrradiance = texture2D( lightMap, vUv2 ).xyz * lightMapIntensity;\n\t\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\t\tlightMapIrradiance *= PI;\n\t\t#endif\n\t\tirradiance += lightMapIrradiance;\n\t#endif\n\t#if defined( USE_ENVMAP ) && defined( PHYSICAL ) && defined( ENVMAP_TYPE_CUBE_UV )\n\t\tirradiance += getLightProbeIndirectIrradiance( geometry, maxMipLevel );\n\t#endif\n#endif\n#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )\n\tradiance += getLightProbeIndirectRadiance( geometry, Material_BlinnShininessExponent( material ), maxMipLevel );\n\t#ifndef STANDARD\n\t\tclearCoatRadiance += getLightProbeIndirectRadiance( geometry, Material_ClearCoat_BlinnShininessExponent( material ), maxMipLevel );\n\t#endif\n#endif",
            lights_fragment_end: "#if defined( RE_IndirectDiffuse )\n\tRE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );\n#endif\n#if defined( RE_IndirectSpecular )\n\tRE_IndirectSpecular( radiance, irradiance, clearCoatRadiance, geometry, material, reflectedLight );\n#endif",
            logdepthbuf_fragment: "#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )\n\tgl_FragDepthEXT = log2( vFragDepth ) * logDepthBufFC * 0.5;\n#endif",
            logdepthbuf_pars_fragment: "#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )\n\tuniform float logDepthBufFC;\n\tvarying float vFragDepth;\n#endif",
            logdepthbuf_pars_vertex: "#ifdef USE_LOGDEPTHBUF\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tvarying float vFragDepth;\n\t#else\n\t\tuniform float logDepthBufFC;\n\t#endif\n#endif",
            logdepthbuf_vertex: "#ifdef USE_LOGDEPTHBUF\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tvFragDepth = 1.0 + gl_Position.w;\n\t#else\n\t\tgl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;\n\t\tgl_Position.z *= gl_Position.w;\n\t#endif\n#endif",
            map_fragment: "#ifdef USE_MAP\n\tvec4 texelColor = texture2D( map, vUv );\n\ttexelColor = mapTexelToLinear( texelColor );\n\tdiffuseColor *= texelColor;\n#endif",
            map_pars_fragment: "#ifdef USE_MAP\n\tuniform sampler2D map;\n#endif",
            map_particle_fragment: "#ifdef USE_MAP\n\tvec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;\n\tvec4 mapTexel = texture2D( map, uv );\n\tdiffuseColor *= mapTexelToLinear( mapTexel );\n#endif",
            map_particle_pars_fragment: "#ifdef USE_MAP\n\tuniform mat3 uvTransform;\n\tuniform sampler2D map;\n#endif",
            metalnessmap_fragment: "float metalnessFactor = metalness;\n#ifdef USE_METALNESSMAP\n\tvec4 texelMetalness = texture2D( metalnessMap, vUv );\n\tmetalnessFactor *= texelMetalness.b;\n#endif",
            metalnessmap_pars_fragment: "#ifdef USE_METALNESSMAP\n\tuniform sampler2D metalnessMap;\n#endif",
            morphnormal_vertex: "#ifdef USE_MORPHNORMALS\n\tobjectNormal += ( morphNormal0 - normal ) * morphTargetInfluences[ 0 ];\n\tobjectNormal += ( morphNormal1 - normal ) * morphTargetInfluences[ 1 ];\n\tobjectNormal += ( morphNormal2 - normal ) * morphTargetInfluences[ 2 ];\n\tobjectNormal += ( morphNormal3 - normal ) * morphTargetInfluences[ 3 ];\n#endif",
            morphtarget_pars_vertex: "#ifdef USE_MORPHTARGETS\n\t#ifndef USE_MORPHNORMALS\n\tuniform float morphTargetInfluences[ 8 ];\n\t#else\n\tuniform float morphTargetInfluences[ 4 ];\n\t#endif\n#endif",
            morphtarget_vertex: "#ifdef USE_MORPHTARGETS\n\ttransformed += ( morphTarget0 - position ) * morphTargetInfluences[ 0 ];\n\ttransformed += ( morphTarget1 - position ) * morphTargetInfluences[ 1 ];\n\ttransformed += ( morphTarget2 - position ) * morphTargetInfluences[ 2 ];\n\ttransformed += ( morphTarget3 - position ) * morphTargetInfluences[ 3 ];\n\t#ifndef USE_MORPHNORMALS\n\ttransformed += ( morphTarget4 - position ) * morphTargetInfluences[ 4 ];\n\ttransformed += ( morphTarget5 - position ) * morphTargetInfluences[ 5 ];\n\ttransformed += ( morphTarget6 - position ) * morphTargetInfluences[ 6 ];\n\ttransformed += ( morphTarget7 - position ) * morphTargetInfluences[ 7 ];\n\t#endif\n#endif",
            normal_fragment_begin: "#ifdef FLAT_SHADED\n\tvec3 fdx = vec3( dFdx( vViewPosition.x ), dFdx( vViewPosition.y ), dFdx( vViewPosition.z ) );\n\tvec3 fdy = vec3( dFdy( vViewPosition.x ), dFdy( vViewPosition.y ), dFdy( vViewPosition.z ) );\n\tvec3 normal = normalize( cross( fdx, fdy ) );\n#else\n\tvec3 normal = normalize( vNormal );\n\t#ifdef DOUBLE_SIDED\n\t\tnormal = normal * ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\t#endif\n#endif",
            normal_fragment_maps: "#ifdef USE_NORMALMAP\n\t#ifdef OBJECTSPACE_NORMALMAP\n\t\tnormal = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;\n\t\t#ifdef FLIP_SIDED\n\t\t\tnormal = - normal;\n\t\t#endif\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tnormal = normal * ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\t\t#endif\n\t\tnormal = normalize( normalMatrix * normal );\n\t#else\n\t\tnormal = perturbNormal2Arb( -vViewPosition, normal );\n\t#endif\n#elif defined( USE_BUMPMAP )\n\tnormal = perturbNormalArb( -vViewPosition, normal, dHdxy_fwd() );\n#endif",
            normalmap_pars_fragment: "#ifdef USE_NORMALMAP\n\tuniform sampler2D normalMap;\n\tuniform vec2 normalScale;\n\t#ifdef OBJECTSPACE_NORMALMAP\n\t\tuniform mat3 normalMatrix;\n\t#else\n\t\tvec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm ) {\n\t\t\tvec3 q0 = vec3( dFdx( eye_pos.x ), dFdx( eye_pos.y ), dFdx( eye_pos.z ) );\n\t\t\tvec3 q1 = vec3( dFdy( eye_pos.x ), dFdy( eye_pos.y ), dFdy( eye_pos.z ) );\n\t\t\tvec2 st0 = dFdx( vUv.st );\n\t\t\tvec2 st1 = dFdy( vUv.st );\n\t\t\tfloat scale = sign( st1.t * st0.s - st0.t * st1.s );\n\t\t\tvec3 S = normalize( ( q0 * st1.t - q1 * st0.t ) * scale );\n\t\t\tvec3 T = normalize( ( - q0 * st1.s + q1 * st0.s ) * scale );\n\t\t\tvec3 N = normalize( surf_norm );\n\t\t\tmat3 tsn = mat3( S, T, N );\n\t\t\tvec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;\n\t\t\tmapN.xy *= normalScale;\n\t\t\tmapN.xy *= ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\t\t\treturn normalize( tsn * mapN );\n\t\t}\n\t#endif\n#endif",
            packing: "vec3 packNormalToRGB( const in vec3 normal ) {\n\treturn normalize( normal ) * 0.5 + 0.5;\n}\nvec3 unpackRGBToNormal( const in vec3 rgb ) {\n\treturn 2.0 * rgb.xyz - 1.0;\n}\nconst float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;\nconst vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256.,  256. );\nconst vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );\nconst float ShiftRight8 = 1. / 256.;\nvec4 packDepthToRGBA( const in float v ) {\n\tvec4 r = vec4( fract( v * PackFactors ), v );\n\tr.yzw -= r.xyz * ShiftRight8;\treturn r * PackUpscale;\n}\nfloat unpackRGBAToDepth( const in vec4 v ) {\n\treturn dot( v, UnpackFactors );\n}\nfloat viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {\n\treturn ( viewZ + near ) / ( near - far );\n}\nfloat orthographicDepthToViewZ( const in float linearClipZ, const in float near, const in float far ) {\n\treturn linearClipZ * ( near - far ) - near;\n}\nfloat viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {\n\treturn (( near + viewZ ) * far ) / (( far - near ) * viewZ );\n}\nfloat perspectiveDepthToViewZ( const in float invClipZ, const in float near, const in float far ) {\n\treturn ( near * far ) / ( ( far - near ) * invClipZ - far );\n}",
            premultiplied_alpha_fragment: "#ifdef PREMULTIPLIED_ALPHA\n\tgl_FragColor.rgb *= gl_FragColor.a;\n#endif",
            project_vertex: "vec4 mvPosition = modelViewMatrix * vec4( transformed, 1.0 );\ngl_Position = projectionMatrix * mvPosition;",
            dithering_fragment: "#if defined( DITHERING )\n  gl_FragColor.rgb = dithering( gl_FragColor.rgb );\n#endif",
            dithering_pars_fragment: "#if defined( DITHERING )\n\tvec3 dithering( vec3 color ) {\n\t\tfloat grid_position = rand( gl_FragCoord.xy );\n\t\tvec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );\n\t\tdither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );\n\t\treturn color + dither_shift_RGB;\n\t}\n#endif",
            roughnessmap_fragment: "float roughnessFactor = roughness;\n#ifdef USE_ROUGHNESSMAP\n\tvec4 texelRoughness = texture2D( roughnessMap, vUv );\n\troughnessFactor *= texelRoughness.g;\n#endif",
            roughnessmap_pars_fragment: "#ifdef USE_ROUGHNESSMAP\n\tuniform sampler2D roughnessMap;\n#endif",
            shadowmap_pars_fragment: "#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHTS > 0\n\t\tuniform sampler2D directionalShadowMap[ NUM_DIR_LIGHTS ];\n\t\tvarying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHTS ];\n\t#endif\n\t#if NUM_SPOT_LIGHTS > 0\n\t\tuniform sampler2D spotShadowMap[ NUM_SPOT_LIGHTS ];\n\t\tvarying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHTS ];\n\t#endif\n\t#if NUM_POINT_LIGHTS > 0\n\t\tuniform sampler2D pointShadowMap[ NUM_POINT_LIGHTS ];\n\t\tvarying vec4 vPointShadowCoord[ NUM_POINT_LIGHTS ];\n\t#endif\n\tfloat texture2DCompare( sampler2D depths, vec2 uv, float compare ) {\n\t\treturn step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );\n\t}\n\tfloat texture2DShadowLerp( sampler2D depths, vec2 size, vec2 uv, float compare ) {\n\t\tconst vec2 offset = vec2( 0.0, 1.0 );\n\t\tvec2 texelSize = vec2( 1.0 ) / size;\n\t\tvec2 centroidUV = floor( uv * size + 0.5 ) / size;\n\t\tfloat lb = texture2DCompare( depths, centroidUV + texelSize * offset.xx, compare );\n\t\tfloat lt = texture2DCompare( depths, centroidUV + texelSize * offset.xy, compare );\n\t\tfloat rb = texture2DCompare( depths, centroidUV + texelSize * offset.yx, compare );\n\t\tfloat rt = texture2DCompare( depths, centroidUV + texelSize * offset.yy, compare );\n\t\tvec2 f = fract( uv * size + 0.5 );\n\t\tfloat a = mix( lb, lt, f.y );\n\t\tfloat b = mix( rb, rt, f.y );\n\t\tfloat c = mix( a, b, f.x );\n\t\treturn c;\n\t}\n\tfloat getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {\n\t\tfloat shadow = 1.0;\n\t\tshadowCoord.xyz /= shadowCoord.w;\n\t\tshadowCoord.z += shadowBias;\n\t\tbvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );\n\t\tbool inFrustum = all( inFrustumVec );\n\t\tbvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );\n\t\tbool frustumTest = all( frustumTestVec );\n\t\tif ( frustumTest ) {\n\t\t#if defined( SHADOWMAP_TYPE_PCF )\n\t\t\tvec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n\t\t\tfloat dx0 = - texelSize.x * shadowRadius;\n\t\t\tfloat dy0 = - texelSize.y * shadowRadius;\n\t\t\tfloat dx1 = + texelSize.x * shadowRadius;\n\t\t\tfloat dy1 = + texelSize.y * shadowRadius;\n\t\t\tshadow = (\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )\n\t\t\t) * ( 1.0 / 9.0 );\n\t\t#elif defined( SHADOWMAP_TYPE_PCF_SOFT )\n\t\t\tvec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n\t\t\tfloat dx0 = - texelSize.x * shadowRadius;\n\t\t\tfloat dy0 = - texelSize.y * shadowRadius;\n\t\t\tfloat dx1 = + texelSize.x * shadowRadius;\n\t\t\tfloat dy1 = + texelSize.y * shadowRadius;\n\t\t\tshadow = (\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy, shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )\n\t\t\t) * ( 1.0 / 9.0 );\n\t\t#else\n\t\t\tshadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );\n\t\t#endif\n\t\t}\n\t\treturn shadow;\n\t}\n\tvec2 cubeToUV( vec3 v, float texelSizeY ) {\n\t\tvec3 absV = abs( v );\n\t\tfloat scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );\n\t\tabsV *= scaleToCube;\n\t\tv *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );\n\t\tvec2 planar = v.xy;\n\t\tfloat almostATexel = 1.5 * texelSizeY;\n\t\tfloat almostOne = 1.0 - almostATexel;\n\t\tif ( absV.z >= almostOne ) {\n\t\t\tif ( v.z > 0.0 )\n\t\t\t\tplanar.x = 4.0 - v.x;\n\t\t} else if ( absV.x >= almostOne ) {\n\t\t\tfloat signX = sign( v.x );\n\t\t\tplanar.x = v.z * signX + 2.0 * signX;\n\t\t} else if ( absV.y >= almostOne ) {\n\t\t\tfloat signY = sign( v.y );\n\t\t\tplanar.x = v.x + 2.0 * signY + 2.0;\n\t\t\tplanar.y = v.z * signY - 2.0;\n\t\t}\n\t\treturn vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );\n\t}\n\tfloat getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {\n\t\tvec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );\n\t\tvec3 lightToPosition = shadowCoord.xyz;\n\t\tfloat dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );\t\tdp += shadowBias;\n\t\tvec3 bd3D = normalize( lightToPosition );\n\t\t#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT )\n\t\t\tvec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;\n\t\t\treturn (\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )\n\t\t\t) * ( 1.0 / 9.0 );\n\t\t#else\n\t\t\treturn texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );\n\t\t#endif\n\t}\n#endif",
            shadowmap_pars_vertex: "#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHTS > 0\n\t\tuniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHTS ];\n\t\tvarying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHTS ];\n\t#endif\n\t#if NUM_SPOT_LIGHTS > 0\n\t\tuniform mat4 spotShadowMatrix[ NUM_SPOT_LIGHTS ];\n\t\tvarying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHTS ];\n\t#endif\n\t#if NUM_POINT_LIGHTS > 0\n\t\tuniform mat4 pointShadowMatrix[ NUM_POINT_LIGHTS ];\n\t\tvarying vec4 vPointShadowCoord[ NUM_POINT_LIGHTS ];\n\t#endif\n#endif",
            shadowmap_vertex: "#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHTS > 0\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tvDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * worldPosition;\n\t}\n\t#endif\n\t#if NUM_SPOT_LIGHTS > 0\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tvSpotShadowCoord[ i ] = spotShadowMatrix[ i ] * worldPosition;\n\t}\n\t#endif\n\t#if NUM_POINT_LIGHTS > 0\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tvPointShadowCoord[ i ] = pointShadowMatrix[ i ] * worldPosition;\n\t}\n\t#endif\n#endif",
            shadowmask_pars_fragment: "float getShadowMask() {\n\tfloat shadow = 1.0;\n\t#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHTS > 0\n\tDirectionalLight directionalLight;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tdirectionalLight = directionalLights[ i ];\n\t\tshadow *= bool( directionalLight.shadow ) ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n\t}\n\t#endif\n\t#if NUM_SPOT_LIGHTS > 0\n\tSpotLight spotLight;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tspotLight = spotLights[ i ];\n\t\tshadow *= bool( spotLight.shadow ) ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;\n\t}\n\t#endif\n\t#if NUM_POINT_LIGHTS > 0\n\tPointLight pointLight;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tpointLight = pointLights[ i ];\n\t\tshadow *= bool( pointLight.shadow ) ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;\n\t}\n\t#endif\n\t#endif\n\treturn shadow;\n}",
            skinbase_vertex: "#ifdef USE_SKINNING\n\tmat4 boneMatX = getBoneMatrix( skinIndex.x );\n\tmat4 boneMatY = getBoneMatrix( skinIndex.y );\n\tmat4 boneMatZ = getBoneMatrix( skinIndex.z );\n\tmat4 boneMatW = getBoneMatrix( skinIndex.w );\n#endif",
            skinning_pars_vertex: "#ifdef USE_SKINNING\n\tuniform mat4 bindMatrix;\n\tuniform mat4 bindMatrixInverse;\n\t#ifdef BONE_TEXTURE\n\t\tuniform sampler2D boneTexture;\n\t\tuniform int boneTextureSize;\n\t\tmat4 getBoneMatrix( const in float i ) {\n\t\t\tfloat j = i * 4.0;\n\t\t\tfloat x = mod( j, float( boneTextureSize ) );\n\t\t\tfloat y = floor( j / float( boneTextureSize ) );\n\t\t\tfloat dx = 1.0 / float( boneTextureSize );\n\t\t\tfloat dy = 1.0 / float( boneTextureSize );\n\t\t\ty = dy * ( y + 0.5 );\n\t\t\tvec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );\n\t\t\tvec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );\n\t\t\tvec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );\n\t\t\tvec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );\n\t\t\tmat4 bone = mat4( v1, v2, v3, v4 );\n\t\t\treturn bone;\n\t\t}\n\t#else\n\t\tuniform mat4 boneMatrices[ MAX_BONES ];\n\t\tmat4 getBoneMatrix( const in float i ) {\n\t\t\tmat4 bone = boneMatrices[ int(i) ];\n\t\t\treturn bone;\n\t\t}\n\t#endif\n#endif",
            skinning_vertex: "#ifdef USE_SKINNING\n\tvec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );\n\tvec4 skinned = vec4( 0.0 );\n\tskinned += boneMatX * skinVertex * skinWeight.x;\n\tskinned += boneMatY * skinVertex * skinWeight.y;\n\tskinned += boneMatZ * skinVertex * skinWeight.z;\n\tskinned += boneMatW * skinVertex * skinWeight.w;\n\ttransformed = ( bindMatrixInverse * skinned ).xyz;\n#endif",
            skinnormal_vertex: "#ifdef USE_SKINNING\n\tmat4 skinMatrix = mat4( 0.0 );\n\tskinMatrix += skinWeight.x * boneMatX;\n\tskinMatrix += skinWeight.y * boneMatY;\n\tskinMatrix += skinWeight.z * boneMatZ;\n\tskinMatrix += skinWeight.w * boneMatW;\n\tskinMatrix  = bindMatrixInverse * skinMatrix * bindMatrix;\n\tobjectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;\n#endif",
            specularmap_fragment: "float specularStrength;\n#ifdef USE_SPECULARMAP\n\tvec4 texelSpecular = texture2D( specularMap, vUv );\n\tspecularStrength = texelSpecular.r;\n#else\n\tspecularStrength = 1.0;\n#endif",
            specularmap_pars_fragment: "#ifdef USE_SPECULARMAP\n\tuniform sampler2D specularMap;\n#endif",
            tonemapping_fragment: "#if defined( TONE_MAPPING )\n  gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );\n#endif",
            tonemapping_pars_fragment: "#ifndef saturate\n\t#define saturate(a) clamp( a, 0.0, 1.0 )\n#endif\nuniform float toneMappingExposure;\nuniform float toneMappingWhitePoint;\nvec3 LinearToneMapping( vec3 color ) {\n\treturn toneMappingExposure * color;\n}\nvec3 ReinhardToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\treturn saturate( color / ( vec3( 1.0 ) + color ) );\n}\n#define Uncharted2Helper( x ) max( ( ( x * ( 0.15 * x + 0.10 * 0.50 ) + 0.20 * 0.02 ) / ( x * ( 0.15 * x + 0.50 ) + 0.20 * 0.30 ) ) - 0.02 / 0.30, vec3( 0.0 ) )\nvec3 Uncharted2ToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\treturn saturate( Uncharted2Helper( color ) / Uncharted2Helper( vec3( toneMappingWhitePoint ) ) );\n}\nvec3 OptimizedCineonToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\tcolor = max( vec3( 0.0 ), color - 0.004 );\n\treturn pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );\n}\nvec3 ACESFilmicToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\treturn saturate( ( color * ( 2.51 * color + 0.03 ) ) / ( color * ( 2.43 * color + 0.59 ) + 0.14 ) );\n}",
            uv_pars_fragment: "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP ) || defined( USE_EMISSIVEMAP ) || defined( USE_ROUGHNESSMAP ) || defined( USE_METALNESSMAP )\n\tvarying vec2 vUv;\n#endif",
            uv_pars_vertex: "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP ) || defined( USE_EMISSIVEMAP ) || defined( USE_ROUGHNESSMAP ) || defined( USE_METALNESSMAP )\n\tvarying vec2 vUv;\n\tuniform mat3 uvTransform;\n#endif",
            uv_vertex: "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP ) || defined( USE_EMISSIVEMAP ) || defined( USE_ROUGHNESSMAP ) || defined( USE_METALNESSMAP )\n\tvUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n#endif",
            uv2_pars_fragment: "#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tvarying vec2 vUv2;\n#endif",
            uv2_pars_vertex: "#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tattribute vec2 uv2;\n\tvarying vec2 vUv2;\n#endif",
            uv2_vertex: "#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tvUv2 = uv2;\n#endif",
            worldpos_vertex: "#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP )\n\tvec4 worldPosition = modelMatrix * vec4( transformed, 1.0 );\n#endif",
            background_frag: "uniform sampler2D t2D;\nvarying vec2 vUv;\nvoid main() {\n\tvec4 texColor = texture2D( t2D, vUv );\n\tgl_FragColor = mapTexelToLinear( texColor );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n}",
            background_vert: "varying vec2 vUv;\nuniform mat3 uvTransform;\nvoid main() {\n\tvUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n\tgl_Position = vec4( position.xy, 1.0, 1.0 );\n}",
            cube_frag: "uniform samplerCube tCube;\nuniform float tFlip;\nuniform float opacity;\nvarying vec3 vWorldDirection;\nvoid main() {\n\tvec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );\n\tgl_FragColor = mapTexelToLinear( texColor );\n\tgl_FragColor.a *= opacity;\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n}",
            cube_vert: "varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n\tvWorldDirection = transformDirection( position, modelMatrix );\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\tgl_Position.z = gl_Position.w;\n}",
            depth_frag: "#if DEPTH_PACKING == 3200\n\tuniform float opacity;\n#endif\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( 1.0 );\n\t#if DEPTH_PACKING == 3200\n\t\tdiffuseColor.a = opacity;\n\t#endif\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <logdepthbuf_fragment>\n\t#if DEPTH_PACKING == 3200\n\t\tgl_FragColor = vec4( vec3( 1.0 - gl_FragCoord.z ), opacity );\n\t#elif DEPTH_PACKING == 3201\n\t\tgl_FragColor = packDepthToRGBA( gl_FragCoord.z );\n\t#endif\n}",
            depth_vert: "#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <skinbase_vertex>\n\t#ifdef USE_DISPLACEMENTMAP\n\t\t#include <beginnormal_vertex>\n\t\t#include <morphnormal_vertex>\n\t\t#include <skinnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n}",
            distanceRGBA_frag: "#define DISTANCE\nuniform vec3 referencePosition;\nuniform float nearDistance;\nuniform float farDistance;\nvarying vec3 vWorldPosition;\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main () {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( 1.0 );\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\tfloat dist = length( vWorldPosition - referencePosition );\n\tdist = ( dist - nearDistance ) / ( farDistance - nearDistance );\n\tdist = saturate( dist );\n\tgl_FragColor = packDepthToRGBA( dist );\n}",
            distanceRGBA_vert: "#define DISTANCE\nvarying vec3 vWorldPosition;\n#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <skinbase_vertex>\n\t#ifdef USE_DISPLACEMENTMAP\n\t\t#include <beginnormal_vertex>\n\t\t#include <morphnormal_vertex>\n\t\t#include <skinnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <worldpos_vertex>\n\t#include <clipping_planes_vertex>\n\tvWorldPosition = worldPosition.xyz;\n}",
            equirect_frag: "uniform sampler2D tEquirect;\nvarying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n\tvec3 direction = normalize( vWorldDirection );\n\tvec2 sampleUV;\n\tsampleUV.y = asin( clamp( direction.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n\tsampleUV.x = atan( direction.z, direction.x ) * RECIPROCAL_PI2 + 0.5;\n\tvec4 texColor = texture2D( tEquirect, sampleUV );\n\tgl_FragColor = mapTexelToLinear( texColor );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n}",
            equirect_vert: "varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n\tvWorldDirection = transformDirection( position, modelMatrix );\n\t#include <begin_vertex>\n\t#include <project_vertex>\n}",
            linedashed_frag: "uniform vec3 diffuse;\nuniform float opacity;\nuniform float dashSize;\nuniform float totalSize;\nvarying float vLineDistance;\n#include <common>\n#include <color_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tif ( mod( vLineDistance, totalSize ) > dashSize ) {\n\t\tdiscard;\n\t}\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <color_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <premultiplied_alpha_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}",
            linedashed_vert: "uniform float scale;\nattribute float lineDistance;\nvarying float vLineDistance;\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <color_vertex>\n\tvLineDistance = scale * lineDistance;\n\tvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n\tgl_Position = projectionMatrix * mvPosition;\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n}",
            meshbasic_frag: "uniform vec3 diffuse;\nuniform float opacity;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\t#ifdef USE_LIGHTMAP\n\t\treflectedLight.indirectDiffuse += texture2D( lightMap, vUv2 ).xyz * lightMapIntensity;\n\t#else\n\t\treflectedLight.indirectDiffuse += vec3( 1.0 );\n\t#endif\n\t#include <aomap_fragment>\n\treflectedLight.indirectDiffuse *= diffuseColor.rgb;\n\tvec3 outgoingLight = reflectedLight.indirectDiffuse;\n\t#include <envmap_fragment>\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <premultiplied_alpha_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}",
            meshbasic_vert: "#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <skinbase_vertex>\n\t#ifdef USE_ENVMAP\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <worldpos_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <envmap_vertex>\n\t#include <fog_vertex>\n}",
            meshlambert_frag: "uniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\nvarying vec3 vLightFront;\nvarying vec3 vIndirectFront;\n#ifdef DOUBLE_SIDED\n\tvarying vec3 vLightBack;\n\tvarying vec3 vIndirectBack;\n#endif\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <fog_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\t#include <emissivemap_fragment>\n\treflectedLight.indirectDiffuse = getAmbientLightIrradiance( ambientLightColor );\n\t#ifdef DOUBLE_SIDED\n\t\treflectedLight.indirectDiffuse += ( gl_FrontFacing ) ? vIndirectFront : vIndirectBack;\n\t#else\n\t\treflectedLight.indirectDiffuse += vIndirectFront;\n\t#endif\n\t#include <lightmap_fragment>\n\treflectedLight.indirectDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb );\n\t#ifdef DOUBLE_SIDED\n\t\treflectedLight.directDiffuse = ( gl_FrontFacing ) ? vLightFront : vLightBack;\n\t#else\n\t\treflectedLight.directDiffuse = vLightFront;\n\t#endif\n\treflectedLight.directDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb ) * getShadowMask();\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n\t#include <envmap_fragment>\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}",
            meshlambert_vert: "#define LAMBERT\nvarying vec3 vLightFront;\nvarying vec3 vIndirectFront;\n#ifdef DOUBLE_SIDED\n\tvarying vec3 vLightBack;\n\tvarying vec3 vIndirectBack;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <envmap_pars_vertex>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <lights_lambert_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}",
            meshmatcap_frag: "#define MATCAP\nuniform vec3 diffuse;\nuniform float opacity;\nuniform sampler2D matcap;\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\tvec3 viewDir = normalize( vViewPosition );\n\tvec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );\n\tvec3 y = cross( viewDir, x );\n\tvec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;\n\t#ifdef USE_MATCAP\n\t\tvec4 matcapColor = texture2D( matcap, uv );\n\t\tmatcapColor = matcapTexelToLinear( matcapColor );\n\t#else\n\t\tvec4 matcapColor = vec4( 1.0 );\n\t#endif\n\tvec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <premultiplied_alpha_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}",
            meshmatcap_vert: "#define MATCAP\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#ifndef FLAT_SHADED\n\t\tvNormal = normalize( transformedNormal );\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n\tvViewPosition = - mvPosition.xyz;\n}",
            meshphong_frag: "#define PHONG\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform vec3 specular;\nuniform float shininess;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_pars_fragment>\n#include <gradientmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <lights_phong_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <lights_phong_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n\t#include <envmap_fragment>\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}",
            meshphong_vert: "#define PHONG\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}",
            meshphysical_frag: "#define PHYSICAL\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float roughness;\nuniform float metalness;\nuniform float opacity;\n#ifndef STANDARD\n\tuniform float clearCoat;\n\tuniform float clearCoatRoughness;\n#endif\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <bsdfs>\n#include <cube_uv_reflection_fragment>\n#include <envmap_pars_fragment>\n#include <envmap_physical_pars_fragment>\n#include <fog_pars_fragment>\n#include <lights_pars_begin>\n#include <lights_physical_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <roughnessmap_pars_fragment>\n#include <metalnessmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <roughnessmap_fragment>\n\t#include <metalnessmap_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <lights_physical_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}",
            meshphysical_vert: "#define PHYSICAL\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}",
            normal_frag: "#define NORMAL\nuniform float opacity;\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || ( defined( USE_NORMALMAP ) && ! defined( OBJECTSPACE_NORMALMAP ) )\n\tvarying vec3 vViewPosition;\n#endif\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <packing>\n#include <uv_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\nvoid main() {\n\t#include <logdepthbuf_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\tgl_FragColor = vec4( packNormalToRGB( normal ), opacity );\n}",
            normal_vert: "#define NORMAL\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || ( defined( USE_NORMALMAP ) && ! defined( OBJECTSPACE_NORMALMAP ) )\n\tvarying vec3 vViewPosition;\n#endif\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || ( defined( USE_NORMALMAP ) && ! defined( OBJECTSPACE_NORMALMAP ) )\n\tvViewPosition = - mvPosition.xyz;\n#endif\n}",
            points_frag: "uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <color_pars_fragment>\n#include <map_particle_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_particle_fragment>\n\t#include <color_fragment>\n\t#include <alphatest_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <premultiplied_alpha_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}",
            points_vert: "uniform float size;\nuniform float scale;\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <color_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <project_vertex>\n\tgl_PointSize = size;\n\t#ifdef USE_SIZEATTENUATION\n\t\tbool isPerspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 );\n\t\tif ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );\n\t#endif\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <worldpos_vertex>\n\t#include <fog_vertex>\n}",
            shadow_frag: "uniform vec3 color;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\nvoid main() {\n\tgl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );\n\t#include <fog_fragment>\n}",
            shadow_vert: "#include <fog_pars_vertex>\n#include <shadowmap_pars_vertex>\nvoid main() {\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}",
            sprite_frag: "uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <alphatest_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}",
            sprite_vert: "uniform float rotation;\nuniform vec2 center;\n#include <common>\n#include <uv_pars_vertex>\n#include <fog_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\tvec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );\n\tvec2 scale;\n\tscale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );\n\tscale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );\n\t#ifndef USE_SIZEATTENUATION\n\t\tbool isPerspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 );\n\t\tif ( isPerspective ) scale *= - mvPosition.z;\n\t#endif\n\tvec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;\n\tvec2 rotatedPosition;\n\trotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;\n\trotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;\n\tmvPosition.xy += rotatedPosition;\n\tgl_Position = projectionMatrix * mvPosition;\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n}"
        }, $e = r("4H5f"), et = r("w+kJ"), tt = r("cuij"), rt = r("TnI4"), at = r("eu9D"), it = {
            common: {
                diffuse: {value: new tt.a(15658734)},
                opacity: {value: 1},
                map: {value: null},
                uvTransform: {value: new at.a},
                alphaMap: {value: null}
            },
            specularmap: {specularMap: {value: null}},
            envmap: {
                envMap: {value: null},
                flipEnvMap: {value: -1},
                reflectivity: {value: 1},
                refractionRatio: {value: .98},
                maxMipLevel: {value: 0}
            },
            aomap: {aoMap: {value: null}, aoMapIntensity: {value: 1}},
            lightmap: {lightMap: {value: null}, lightMapIntensity: {value: 1}},
            emissivemap: {emissiveMap: {value: null}},
            bumpmap: {bumpMap: {value: null}, bumpScale: {value: 1}},
            normalmap: {normalMap: {value: null}, normalScale: {value: new rt.a(1, 1)}},
            displacementmap: {
                displacementMap: {value: null},
                displacementScale: {value: 1},
                displacementBias: {value: 0}
            },
            roughnessmap: {roughnessMap: {value: null}},
            metalnessmap: {metalnessMap: {value: null}},
            gradientmap: {gradientMap: {value: null}},
            fog: {
                fogDensity: {value: 25e-5},
                fogNear: {value: 1},
                fogFar: {value: 2e3},
                fogColor: {value: new tt.a(16777215)}
            },
            lights: {
                ambientLightColor: {value: []},
                directionalLights: {
                    value: [],
                    properties: {
                        direction: {},
                        color: {},
                        shadow: {},
                        shadowBias: {},
                        shadowRadius: {},
                        shadowMapSize: {}
                    }
                },
                directionalShadowMap: {value: []},
                directionalShadowMatrix: {value: []},
                spotLights: {
                    value: [],
                    properties: {
                        color: {},
                        position: {},
                        direction: {},
                        distance: {},
                        coneCos: {},
                        penumbraCos: {},
                        decay: {},
                        shadow: {},
                        shadowBias: {},
                        shadowRadius: {},
                        shadowMapSize: {}
                    }
                },
                spotShadowMap: {value: []},
                spotShadowMatrix: {value: []},
                pointLights: {
                    value: [],
                    properties: {
                        color: {},
                        position: {},
                        decay: {},
                        distance: {},
                        shadow: {},
                        shadowBias: {},
                        shadowRadius: {},
                        shadowMapSize: {},
                        shadowCameraNear: {},
                        shadowCameraFar: {}
                    }
                },
                pointShadowMap: {value: []},
                pointShadowMatrix: {value: []},
                hemisphereLights: {value: [], properties: {direction: {}, skyColor: {}, groundColor: {}}},
                rectAreaLights: {value: [], properties: {color: {}, position: {}, width: {}, height: {}}}
            },
            points: {
                diffuse: {value: new tt.a(15658734)},
                opacity: {value: 1},
                size: {value: 1},
                scale: {value: 1},
                map: {value: null},
                uvTransform: {value: new at.a}
            },
            sprite: {
                diffuse: {value: new tt.a(15658734)},
                opacity: {value: 1},
                center: {value: new rt.a(.5, .5)},
                rotation: {value: 0},
                map: {value: null},
                uvTransform: {value: new at.a}
            }
        }, nt = {
            basic: {
                uniforms: Object($e.b)([it.common, it.specularmap, it.envmap, it.aomap, it.lightmap, it.fog]),
                vertexShader: Ke.meshbasic_vert,
                fragmentShader: Ke.meshbasic_frag
            },
            lambert: {
                uniforms: Object($e.b)([it.common, it.specularmap, it.envmap, it.aomap, it.lightmap, it.emissivemap, it.fog, it.lights, {emissive: {value: new tt.a(0)}}]),
                vertexShader: Ke.meshlambert_vert,
                fragmentShader: Ke.meshlambert_frag
            },
            phong: {
                uniforms: Object($e.b)([it.common, it.specularmap, it.envmap, it.aomap, it.lightmap, it.emissivemap, it.bumpmap, it.normalmap, it.displacementmap, it.gradientmap, it.fog, it.lights, {
                    emissive: {value: new tt.a(0)},
                    specular: {value: new tt.a(1118481)},
                    shininess: {value: 30}
                }]), vertexShader: Ke.meshphong_vert, fragmentShader: Ke.meshphong_frag
            },
            standard: {
                uniforms: Object($e.b)([it.common, it.envmap, it.aomap, it.lightmap, it.emissivemap, it.bumpmap, it.normalmap, it.displacementmap, it.roughnessmap, it.metalnessmap, it.fog, it.lights, {
                    emissive: {value: new tt.a(0)},
                    roughness: {value: .5},
                    metalness: {value: .5},
                    envMapIntensity: {value: 1}
                }]), vertexShader: Ke.meshphysical_vert, fragmentShader: Ke.meshphysical_frag
            },
            matcap: {
                uniforms: Object($e.b)([it.common, it.bumpmap, it.normalmap, it.displacementmap, it.fog, {matcap: {value: null}}]),
                vertexShader: Ke.meshmatcap_vert,
                fragmentShader: Ke.meshmatcap_frag
            },
            points: {
                uniforms: Object($e.b)([it.points, it.fog]),
                vertexShader: Ke.points_vert,
                fragmentShader: Ke.points_frag
            },
            dashed: {
                uniforms: Object($e.b)([it.common, it.fog, {
                    scale: {value: 1},
                    dashSize: {value: 1},
                    totalSize: {value: 2}
                }]), vertexShader: Ke.linedashed_vert, fragmentShader: Ke.linedashed_frag
            },
            depth: {
                uniforms: Object($e.b)([it.common, it.displacementmap]),
                vertexShader: Ke.depth_vert,
                fragmentShader: Ke.depth_frag
            },
            normal: {
                uniforms: Object($e.b)([it.common, it.bumpmap, it.normalmap, it.displacementmap, {opacity: {value: 1}}]),
                vertexShader: Ke.normal_vert,
                fragmentShader: Ke.normal_frag
            },
            sprite: {
                uniforms: Object($e.b)([it.sprite, it.fog]),
                vertexShader: Ke.sprite_vert,
                fragmentShader: Ke.sprite_frag
            },
            background: {
                uniforms: {uvTransform: {value: new at.a}, t2D: {value: null}},
                vertexShader: Ke.background_vert,
                fragmentShader: Ke.background_frag
            },
            cube: {
                uniforms: {tCube: {value: null}, tFlip: {value: -1}, opacity: {value: 1}},
                vertexShader: Ke.cube_vert,
                fragmentShader: Ke.cube_frag
            },
            equirect: {
                uniforms: {tEquirect: {value: null}},
                vertexShader: Ke.equirect_vert,
                fragmentShader: Ke.equirect_frag
            },
            distanceRGBA: {
                uniforms: Object($e.b)([it.common, it.displacementmap, {
                    referencePosition: {value: new et.a},
                    nearDistance: {value: 1},
                    farDistance: {value: 1e3}
                }]), vertexShader: Ke.distanceRGBA_vert, fragmentShader: Ke.distanceRGBA_frag
            },
            shadow: {
                uniforms: Object($e.b)([it.lights, it.fog, {color: {value: new tt.a(0)}, opacity: {value: 1}}]),
                vertexShader: Ke.shadow_vert,
                fragmentShader: Ke.shadow_frag
            }
        };
        nt.physical = {
            uniforms: Object($e.b)([nt.standard.uniforms, {
                clearCoat: {value: 0},
                clearCoatRoughness: {value: 0}
            }]), vertexShader: Ke.meshphysical_vert, fragmentShader: Ke.meshphysical_frag
        };
        var ot = r("CNRw"), st = r("UKne"), lt = r("zfxg"), dt = r("nKeq");
        o.prototype = Object.create(st.a.prototype), o.prototype.constructor = o, s.prototype = Object.create(lt.a.prototype), s.prototype.constructor = s;
        var ct = r("XPv6"), pt = r("dt5g"), ut = r("Ncdj"), mt = r("GuLh"), gt = r("Qeq/");
        y.prototype = Object.create(Je.a.prototype), y.prototype.constructor = y, y.prototype.isCubeTexture = !0, Object.defineProperty(y.prototype, "images", {
            get: function () {
                return this.image
            }, set: function (e) {
                this.image = e
            }
        }), _.prototype = Object.create(Je.a.prototype), _.prototype.constructor = _, _.prototype.isDataTexture3D = !0;
        var ft = new Je.a, ht = new _, vt = new y, xt = [], yt = [], _t = new Float32Array(16),
            bt = new Float32Array(9), Mt = new Float32Array(4);
        $.prototype.updateCache = function (e) {
            var t = this.cache;
            e instanceof Float32Array && t.length !== e.length && (this.cache = new Float32Array(e.length)), L(t, e)
        }, ee.prototype.setValue = function (e, t, r) {
            for (var a = this.seq, o = 0, i = a.length, n; o !== i; ++o) n = a[o], n.setValue(e, t[n.id], r)
        };
        var St = /([\w\d_]+)(\])?(\[|\.)?/g;
        ae.prototype.setValue = function (e, t, r) {
            var a = this.map[t];
            void 0 !== a && a.setValue(e, r, this.renderer)
        }, ae.prototype.setOptional = function (e, t, r) {
            var a = t[r];
            void 0 !== a && this.setValue(e, r, a)
        }, ae.upload = function (e, t, r, a) {
            for (var o = 0, i = t.length; o !== i; ++o) {
                var n = t[o], s = r[n.id];
                !1 !== s.needsUpdate && n.setValue(e, s.value, a)
            }
        }, ae.seqWithValue = function (e, t) {
            for (var a = [], r = 0, i = e.length, n; r !== i; ++r) n = e[r], n.id in t && a.push(n);
            return a
        };
        var Lt = 0, Et = 0, Tt = r("w4Ua");
        Ce.prototype = Object.assign(Object.create(Tt.a.prototype), {
            constructor: Ce,
            isWebGLRenderTarget: !0,
            setSize: function (e, t) {
                (this.width !== e || this.height !== t) && (this.width = e, this.height = t, this.dispose()), this.viewport.set(0, 0, e, t), this.scissor.set(0, 0, e, t)
            },
            clone: function () {
                return new this.constructor().copy(this)
            },
            copy: function (e) {
                return this.width = e.width, this.height = e.height, this.viewport.copy(e.viewport), this.texture = e.texture.clone(), this.depthBuffer = e.depthBuffer, this.stencilBuffer = e.stencilBuffer, this.depthTexture = e.depthTexture, this
            },
            dispose: function () {
                this.dispatchEvent({type: "dispose"})
            }
        });
        var wt = r("9eRv");
        Ae.prototype = Object.create(wt.a.prototype), Ae.prototype.constructor = Ae, Ae.prototype.isMeshDepthMaterial = !0, Ae.prototype.copy = function (e) {
            return wt.a.prototype.copy.call(this, e), this.depthPacking = e.depthPacking, this.skinning = e.skinning, this.morphTargets = e.morphTargets, this.map = e.map, this.alphaMap = e.alphaMap, this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this
        }, De.prototype = Object.create(wt.a.prototype), De.prototype.constructor = De, De.prototype.isMeshDistanceMaterial = !0, De.prototype.copy = function (e) {
            return wt.a.prototype.copy.call(this, e), this.referencePosition.copy(e.referencePosition), this.nearDistance = e.nearDistance, this.farDistance = e.farDistance, this.skinning = e.skinning, this.morphTargets = e.morphTargets, this.map = e.map, this.alphaMap = e.alphaMap, this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this
        };
        var Pt = r("qdxW"), Ct = r("breI"), At = r("+8Os");
        Ue.prototype = Object.assign(Object.create(At.a.prototype), {constructor: Ue, isArrayCamera: !0});
        var Dt = new et.a, Rt = new et.a;
        r.d(t, "a", function () {
            return Be
        })
    }, LxkE: function (e, t, r) {
        "use strict";

        function a(e, t, r, a, i, n) {
            this.planes = [void 0 === e ? new o.a : e, void 0 === t ? new o.a : t, void 0 === r ? new o.a : r, void 0 === a ? new o.a : a, void 0 === i ? new o.a : i, void 0 === n ? new o.a : n]
        }

        r.d(t, "a", function () {
            return a
        });
        var i = r("w+kJ"), n = r("8IfN"), o = r("GuLh");
        Object.assign(a.prototype, {
            set: function (e, t, r, a, i, n) {
                var o = this.planes;
                return o[0].copy(e), o[1].copy(t), o[2].copy(r), o[3].copy(a), o[4].copy(i), o[5].copy(n), this
            }, clone: function () {
                return new this.constructor().copy(this)
            }, copy: function (e) {
                for (var t = this.planes, r = 0; 6 > r; r++) t[r].copy(e.planes[r]);
                return this
            }, setFromMatrix: function (e) {
                var t = this.planes, r = e.elements, a = r[0], i = r[1], n = r[2], o = r[3], s = r[4], l = r[5],
                    d = r[6], c = r[7], p = r[8], u = r[9], m = r[10], g = r[11], f = r[12], h = r[13], v = r[14],
                    x = r[15];
                return t[0].setComponents(o - a, c - s, g - p, x - f).normalize(), t[1].setComponents(o + a, c + s, g + p, x + f).normalize(), t[2].setComponents(o + i, c + l, g + u, x + h).normalize(), t[3].setComponents(o - i, c - l, g - u, x - h).normalize(), t[4].setComponents(o - n, c - d, g - m, x - v).normalize(), t[5].setComponents(o + n, c + d, g + m, x + v).normalize(), this
            }, intersectsObject: function () {
                var e = new n.a;
                return function (t) {
                    var r = t.geometry;
                    return null === r.boundingSphere && r.computeBoundingSphere(), e.copy(r.boundingSphere).applyMatrix4(t.matrixWorld), this.intersectsSphere(e)
                }
            }(), intersectsSprite: function () {
                var e = new n.a;
                return function (t) {
                    return e.center.set(0, 0, 0), e.radius = .7071067811865476, e.applyMatrix4(t.matrixWorld), this.intersectsSphere(e)
                }
            }(), intersectsSphere: function (e) {
                for (var t = this.planes, r = e.center, a = -e.radius, n = 0, i; 6 > n; n++) if (i = t[n].distanceToPoint(r), i < a) return !1;
                return !0
            }, intersectsBox: function () {
                var e = new i.a;
                return function (t) {
                    for (var r = this.planes, a = 0, i; 6 > a; a++) if (i = r[a], e.x = 0 < i.normal.x ? t.max.x : t.min.x, e.y = 0 < i.normal.y ? t.max.y : t.min.y, e.z = 0 < i.normal.z ? t.max.z : t.min.z, 0 > i.distanceToPoint(e)) return !1;
                    return !0
                }
            }(), containsPoint: function (e) {
                for (var t = this.planes, r = 0; 6 > r; r++) if (0 > t[r].distanceToPoint(e)) return !1;
                return !0
            }
        })
    }, MnML: function (e, t, r) {
        "use strict";
        var a = Math.LN2, i = Math.log, n = Math.pow, o = Math.floor, s = Math.PI;
        r.d(t, "a", function () {
            return l
        });
        var l = {
            DEG2RAD: s / 180, RAD2DEG: 180 / s, generateUUID: function () {
                for (var e = [], t = 0; 256 > t; t++) e[t] = (16 > t ? "0" : "") + t.toString(16);
                return function () {
                    var t = 0 | 4294967295 * Math.random(), r = 0 | 4294967295 * Math.random(),
                        a = 0 | 4294967295 * Math.random(), i = 0 | 4294967295 * Math.random(),
                        n = e[255 & t] + e[255 & t >> 8] + e[255 & t >> 16] + e[255 & t >> 24] + "-" + e[255 & r] + e[255 & r >> 8] + "-" + e[64 | 15 & r >> 16] + e[255 & r >> 24] + "-" + e[128 | 63 & a] + e[255 & a >> 8] + "-" + e[255 & a >> 16] + e[255 & a >> 24] + e[255 & i] + e[255 & i >> 8] + e[255 & i >> 16] + e[255 & i >> 24];
                    return n.toUpperCase()
                }
            }(), clamp: function (e, t, r) {
                return Math.max(t, Math.min(r, e))
            }, euclideanModulo: function (e, t) {
                return (e % t + t) % t
            }, mapLinear: function (e, t, r, a, i) {
                return a + (e - t) * (i - a) / (r - t)
            }, lerp: function (e, r, a) {
                return (1 - a) * e + a * r
            }, smoothstep: function (e, t, r) {
                return e <= t ? 0 : e >= r ? 1 : (e = (e - t) / (r - t), e * e * (3 - 2 * e))
            }, smootherstep: function (e, t, r) {
                return e <= t ? 0 : e >= r ? 1 : (e = (e - t) / (r - t), e * e * e * (e * (6 * e - 15) + 10))
            }, randInt: function (e, t) {
                return e + o(Math.random() * (t - e + 1))
            }, randFloat: function (e, t) {
                return e + Math.random() * (t - e)
            }, randFloatSpread: function (e) {
                return e * (.5 - Math.random())
            }, degToRad: function (e) {
                return e * l.DEG2RAD
            }, radToDeg: function (e) {
                return e * l.RAD2DEG
            }, isPowerOfTwo: function (e) {
                return 0 == (e & e - 1) && 0 !== e
            }, ceilPowerOfTwo: function (e) {
                return n(2, Math.ceil(i(e) / a))
            }, floorPowerOfTwo: function (e) {
                return n(2, o(i(e) / a))
            }
        }
    }, Ncdj: function (e, t, r) {
        "use strict";

        function i(e, t, r) {
            this.a = void 0 === e ? new l.a : e, this.b = void 0 === t ? new l.a : t, this.c = void 0 === r ? new l.a : r
        }

        function a(e, t) {
            m.a.call(this), this.type = "Mesh", this.geometry = void 0 === e ? new v.a : e, this.material = void 0 === t ? new h.a({color: 16777215 * Math.random()}) : t, this.drawMode = f.hc, this.updateMorphTargets()
        }

        var n = Math.floor, o = Math.max, s = Math.min, l = r("w+kJ"), d = r("TnI4"), c = r("8IfN"), p = r("9y4G"),
            u = r("3+m9"), m = r("p1p1");
        Object.assign(i, {
            getNormal: function () {
                var e = new l.a;
                return function (t, r, a, i) {
                    void 0 === i && (console.warn("THREE.Triangle: .getNormal() target is now required"), i = new l.a), i.subVectors(a, r), e.subVectors(t, r), i.cross(e);
                    var n = i.lengthSq();
                    return 0 < n ? i.multiplyScalar(1 / Math.sqrt(n)) : i.set(0, 0, 0)
                }
            }(), getBarycoord: function () {
                var e = new l.a, t = new l.a, r = new l.a;
                return function (i, n, a, o, s) {
                    e.subVectors(o, n), t.subVectors(a, n), r.subVectors(i, n);
                    var d = e.dot(e), c = e.dot(t), p = e.dot(r), m = t.dot(t), g = t.dot(r), f = d * m - c * c;
                    if (void 0 === s && (console.warn("THREE.Triangle: .getBarycoord() target is now required"), s = new l.a), 0 == f) return s.set(-2, -1, -1);
                    var h = 1 / f, x = (m * p - c * g) * h, u = (d * g - c * p) * h;
                    return s.set(1 - x - u, u, x)
                }
            }(), containsPoint: function () {
                var e = new l.a;
                return function (t, r, a, n) {
                    return i.getBarycoord(t, r, a, n, e), 0 <= e.x && 0 <= e.y && 1 >= e.x + e.y
                }
            }(), getUV: function () {
                var e = new l.a;
                return function (t, r, a, i, n, o, s, l) {
                    return this.getBarycoord(t, r, a, i, e), l.set(0, 0), l.addScaledVector(n, e.x), l.addScaledVector(o, e.y), l.addScaledVector(s, e.z), l
                }
            }()
        }), Object.assign(i.prototype, {
            set: function (e, t, r) {
                return this.a.copy(e), this.b.copy(t), this.c.copy(r), this
            }, setFromPointsAndIndices: function (e, t, r, a) {
                return this.a.copy(e[t]), this.b.copy(e[r]), this.c.copy(e[a]), this
            }, clone: function () {
                return new this.constructor().copy(this)
            }, copy: function (e) {
                return this.a.copy(e.a), this.b.copy(e.b), this.c.copy(e.c), this
            }, getArea: function () {
                var e = new l.a, t = new l.a;
                return function () {
                    return e.subVectors(this.c, this.b), t.subVectors(this.a, this.b), .5 * e.cross(t).length()
                }
            }(), getMidpoint: function (e) {
                return void 0 === e && (console.warn("THREE.Triangle: .getMidpoint() target is now required"), e = new l.a), e.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3)
            }, getNormal: function (e) {
                return i.getNormal(this.a, this.b, this.c, e)
            }, getPlane: function (e) {
                return void 0 === e && (console.warn("THREE.Triangle: .getPlane() target is now required"), e = new l.a), e.setFromCoplanarPoints(this.a, this.b, this.c)
            }, getBarycoord: function (e, t) {
                return i.getBarycoord(e, this.a, this.b, this.c, t)
            }, containsPoint: function (e) {
                return i.containsPoint(e, this.a, this.b, this.c)
            }, getUV: function (e, t, r, a, n) {
                return i.getUV(e, this.a, this.b, this.c, t, r, a, n)
            }, intersectsBox: function (e) {
                return e.intersectsTriangle(this)
            }, closestPointToPoint: function () {
                var e = new l.a, t = new l.a, r = new l.a, i = new l.a, n = new l.a, o = new l.a;
                return function (s, d) {
                    void 0 === d && (console.warn("THREE.Triangle: .closestPointToPoint() target is now required"), d = new l.a);
                    var p = this.a, a = this.b, u = this.c, c, m;
                    e.subVectors(a, p), t.subVectors(u, p), i.subVectors(s, p);
                    var g = e.dot(i), f = t.dot(i);
                    if (0 >= g && 0 >= f) return d.copy(p);
                    n.subVectors(s, a);
                    var h = e.dot(n), v = t.dot(n);
                    if (0 <= h && v <= h) return d.copy(a);
                    var x = g * v - h * f;
                    if (0 >= x && 0 <= g && 0 >= h) return c = g / (g - h), d.copy(p).addScaledVector(e, c);
                    o.subVectors(s, u);
                    var y = e.dot(o), _ = t.dot(o);
                    if (0 <= _ && y <= _) return d.copy(u);
                    var b = y * f - g * _;
                    if (0 >= b && 0 <= f && 0 >= _) return m = f / (f - _), d.copy(p).addScaledVector(t, m);
                    var M = h * _ - y * v;
                    if (0 >= M && 0 <= v - h && 0 <= y - _) return r.subVectors(u, a), m = (v - h) / (v - h + (y - _)), d.copy(a).addScaledVector(r, m);
                    var S = 1 / (M + b + x);
                    return c = b * S, m = x * S, d.copy(p).addScaledVector(e, c).addScaledVector(t, m)
                }
            }(), equals: function (e) {
                return e.a.equals(this.a) && e.b.equals(this.b) && e.c.equals(this.c)
            }
        });
        var g = r("9HH4"), f = r("6deg"), h = r("AIox"), v = r("zfxg");
        r.d(t, "a", function () {
            return a
        }), a.prototype = Object.assign(Object.create(m.a.prototype), {
            constructor: a, isMesh: !0, setDrawMode: function (e) {
                this.drawMode = e
            }, copy: function (e) {
                return m.a.prototype.copy.call(this, e), this.drawMode = e.drawMode, void 0 !== e.morphTargetInfluences && (this.morphTargetInfluences = e.morphTargetInfluences.slice()), void 0 !== e.morphTargetDictionary && (this.morphTargetDictionary = Object.assign({}, e.morphTargetDictionary)), this
            }, updateMorphTargets: function () {
                var e = this.geometry, t, r, a;
                if (e.isBufferGeometry) {
                    var i = e.morphAttributes, n = Object.keys(i);
                    if (0 < n.length) {
                        var o = i[n[0]];
                        if (void 0 !== o) for (this.morphTargetInfluences = [], this.morphTargetDictionary = {}, (t = 0, r = o.length); t < r; t++) a = o[t].name || t + "", this.morphTargetInfluences.push(0), this.morphTargetDictionary[a] = t
                    }
                } else {
                    var s = e.morphTargets;
                    void 0 !== s && 0 < s.length && console.error("THREE.Mesh.updateMorphTargets() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.")
                }
            }, raycast: function () {
                function e(e, t, r, a, i, n, o, s) {
                    var l;
                    if (l = t.side === f.g ? a.intersectTriangle(o, n, i, !0, s) : a.intersectTriangle(i, n, o, t.side !== f.v, s), null === l) return null;
                    T.copy(s), T.applyMatrix4(e.matrixWorld);
                    var d = r.ray.origin.distanceTo(T);
                    return d < r.near || d > r.far ? null : {distance: d, point: T.clone(), object: e}
                }

                function t(t, r, n, o, s, l, p, a, u) {
                    v.fromBufferAttribute(s, p), x.fromBufferAttribute(s, a), y.fromBufferAttribute(s, u);
                    var c = e(t, r, n, o, v, x, y, E);
                    if (c) {
                        l && (M.fromBufferAttribute(l, p), S.fromBufferAttribute(l, a), L.fromBufferAttribute(l, u), c.uv = i.getUV(E, v, x, y, M, S, L, new d.a));
                        var m = new g.a(p, a, u);
                        i.getNormal(v, x, y, m.normal), c.face = m
                    }
                    return c
                }

                var r = new u.a, m = new p.a, h = new c.a, v = new l.a, x = new l.a, y = new l.a, a = new l.a,
                    _ = new l.a, b = new l.a, M = new d.a, S = new d.a, L = new d.a, E = new l.a, T = new l.a;
                return function (l, p) {
                    var u = this.geometry, g = this.material, T = this.matrixWorld;
                    if (void 0 !== g && (null === u.boundingSphere && u.computeBoundingSphere(), h.copy(u.boundingSphere), h.applyMatrix4(T), !1 !== l.ray.intersectsSphere(h)) && (r.getInverse(T), m.copy(l.ray).applyMatrix4(r), null === u.boundingBox || !1 !== m.intersectsBox(u.boundingBox))) {
                        var w;
                        if (u.isBufferGeometry) {
                            var P = u.index, C = u.attributes.position, A = u.attributes.uv, D = u.groups,
                                R = u.drawRange, N, I, z, c, U, F, G, O, B, V, H;
                            if (null !== P) {
                                if (Array.isArray(g)) for (c = 0, F = D.length; c < F; c++) for (O = D[c], B = g[O.materialIndex], V = o(O.start, R.start), H = s(O.start + O.count, R.start + R.count), (U = V, G = H); U < G; U += 3) N = P.getX(U), I = P.getX(U + 1), z = P.getX(U + 2), w = t(this, B, l, m, C, A, N, I, z), w && (w.faceIndex = n(U / 3), w.face.materialIndex = O.materialIndex, p.push(w)); else for (V = o(0, R.start), H = s(P.count, R.start + R.count), (c = V, F = H); c < F; c += 3) N = P.getX(c), I = P.getX(c + 1), z = P.getX(c + 2), w = t(this, g, l, m, C, A, N, I, z), w && (w.faceIndex = n(c / 3), p.push(w));
                            } else if (void 0 !== C) if (Array.isArray(g)) for (c = 0, F = D.length; c < F; c++) for (O = D[c], B = g[O.materialIndex], V = o(O.start, R.start), H = s(O.start + O.count, R.start + R.count), (U = V, G = H); U < G; U += 3) N = U, I = U + 1, z = U + 2, w = t(this, B, l, m, C, A, N, I, z), w && (w.faceIndex = n(U / 3), w.face.materialIndex = O.materialIndex, p.push(w)); else for (V = o(0, R.start), H = s(C.count, R.start + R.count), (c = V, F = H); c < F; c += 3) N = c, I = c + 1, z = c + 2, w = t(this, g, l, m, C, A, N, I, z), w && (w.faceIndex = n(c / 3), p.push(w))
                        } else if (u.isGeometry) {
                            var k = Array.isArray(g), W = u.vertices, q = u.faces, X = u.faceVertexUvs[0], j, Y, J, Z;
                            0 < X.length && (Z = X);
                            for (var Q = 0, f = q.length; Q < f; Q++) {
                                var K = q[Q], $ = k ? g[K.materialIndex] : g;
                                if (void 0 !== $) {
                                    if (j = W[K.a], Y = W[K.b], J = W[K.c], !0 === $.morphTargets) {
                                        var ee = u.morphTargets, te = this.morphTargetInfluences;
                                        v.set(0, 0, 0), x.set(0, 0, 0), y.set(0, 0, 0);
                                        for (var re = 0, ae = ee.length, ie; re < ae; re++) if (ie = te[re], 0 !== ie) {
                                            var ne = ee[re].vertices;
                                            v.addScaledVector(a.subVectors(ne[K.a], j), ie), x.addScaledVector(_.subVectors(ne[K.b], Y), ie), y.addScaledVector(b.subVectors(ne[K.c], J), ie)
                                        }
                                        v.add(j), x.add(Y), y.add(J), j = v, Y = x, J = y
                                    }
                                    if (w = e(this, $, l, m, j, Y, J, E), w) {
                                        if (Z && Z[Q]) {
                                            var oe = Z[Q];
                                            M.copy(oe[0]), S.copy(oe[1]), L.copy(oe[2]), w.uv = i.getUV(E, j, Y, J, M, S, L, new d.a)
                                        }
                                        w.face = K, w.faceIndex = Q, p.push(w)
                                    }
                                }
                            }
                        }
                    }
                }
            }(), clone: function () {
                return new this.constructor(this.geometry, this.material).copy(this)
            }
        })
    }, "Qeq/": function (e, t, r) {
        "use strict";

        function a(e) {
            if (0 === e.length) return -Infinity;
            for (var t = e[0], r = 1, a = e.length; r < a; ++r) e[r] > t && (t = e[r]);
            return t
        }

        r.d(t, "a", function () {
            return a
        })
    }, TnI4: function (e, t, r) {
        "use strict";

        function a(e, t) {
            this.x = e || 0, this.y = t || 0
        }

        var i = Math.round, n = Math.ceil, o = Math.floor, s = Math.sqrt, l = Math.abs, d = Math.max, c = Math.min;
        r.d(t, "a", function () {
            return a
        }), Object.defineProperties(a.prototype, {
            width: {
                get: function () {
                    return this.x
                }, set: function (e) {
                    this.x = e
                }
            }, height: {
                get: function () {
                    return this.y
                }, set: function (e) {
                    this.y = e
                }
            }
        }), Object.assign(a.prototype, {
            isVector2: !0, set: function (e, t) {
                return this.x = e, this.y = t, this
            }, setScalar: function (e) {
                return this.x = e, this.y = e, this
            }, setX: function (e) {
                return this.x = e, this
            }, setY: function (e) {
                return this.y = e, this
            }, setComponent: function (e, t) {
                switch (e) {
                    case 0:
                        this.x = t;
                        break;
                    case 1:
                        this.y = t;
                        break;
                    default:
                        throw new Error("index is out of range: " + e);
                }
                return this
            }, getComponent: function (e) {
                switch (e) {
                    case 0:
                        return this.x;
                    case 1:
                        return this.y;
                    default:
                        throw new Error("index is out of range: " + e);
                }
            }, clone: function () {
                return new this.constructor(this.x, this.y)
            }, copy: function (e) {
                return this.x = e.x, this.y = e.y, this
            }, add: function (e, t) {
                return void 0 === t ? (this.x += e.x, this.y += e.y, this) : (console.warn("THREE.Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead."), this.addVectors(e, t))
            }, addScalar: function (e) {
                return this.x += e, this.y += e, this
            }, addVectors: function (e, t) {
                return this.x = e.x + t.x, this.y = e.y + t.y, this
            }, addScaledVector: function (e, t) {
                return this.x += e.x * t, this.y += e.y * t, this
            }, sub: function (e, t) {
                return void 0 === t ? (this.x -= e.x, this.y -= e.y, this) : (console.warn("THREE.Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."), this.subVectors(e, t))
            }, subScalar: function (e) {
                return this.x -= e, this.y -= e, this
            }, subVectors: function (e, t) {
                return this.x = e.x - t.x, this.y = e.y - t.y, this
            }, multiply: function (e) {
                return this.x *= e.x, this.y *= e.y, this
            }, multiplyScalar: function (e) {
                return this.x *= e, this.y *= e, this
            }, divide: function (e) {
                return this.x /= e.x, this.y /= e.y, this
            }, divideScalar: function (e) {
                return this.multiplyScalar(1 / e)
            }, applyMatrix3: function (t) {
                var r = this.x, a = this.y, i = t.elements;
                return this.x = i[0] * r + i[3] * a + i[6], this.y = i[1] * r + i[4] * a + i[7], this
            }, min: function (e) {
                return this.x = c(this.x, e.x), this.y = c(this.y, e.y), this
            }, max: function (e) {
                return this.x = d(this.x, e.x), this.y = d(this.y, e.y), this
            }, clamp: function (e, t) {
                return this.x = d(e.x, c(t.x, this.x)), this.y = d(e.y, c(t.y, this.y)), this
            }, clampScalar: function () {
                var e = new a, t = new a;
                return function (r, a) {
                    return e.set(r, r), t.set(a, a), this.clamp(e, t)
                }
            }(), clampLength: function (e, t) {
                var r = this.length();
                return this.divideScalar(r || 1).multiplyScalar(d(e, c(t, r)))
            }, floor: function () {
                return this.x = o(this.x), this.y = o(this.y), this
            }, ceil: function () {
                return this.x = n(this.x), this.y = n(this.y), this
            }, round: function () {
                return this.x = i(this.x), this.y = i(this.y), this
            }, roundToZero: function () {
                return this.x = 0 > this.x ? n(this.x) : o(this.x), this.y = 0 > this.y ? n(this.y) : o(this.y), this
            }, negate: function () {
                return this.x = -this.x, this.y = -this.y, this
            }, dot: function (e) {
                return this.x * e.x + this.y * e.y
            }, cross: function (e) {
                return this.x * e.y - this.y * e.x
            }, lengthSq: function () {
                return this.x * this.x + this.y * this.y
            }, length: function () {
                return s(this.x * this.x + this.y * this.y)
            }, manhattanLength: function () {
                return l(this.x) + l(this.y)
            }, normalize: function () {
                return this.divideScalar(this.length() || 1)
            }, angle: function () {
                var e = Math.atan2(this.y, this.x);
                return 0 > e && (e += 2 * Math.PI), e
            }, distanceTo: function (e) {
                return s(this.distanceToSquared(e))
            }, distanceToSquared: function (e) {
                var t = this.x - e.x, r = this.y - e.y;
                return t * t + r * r
            }, manhattanDistanceTo: function (e) {
                return l(this.x - e.x) + l(this.y - e.y)
            }, setLength: function (e) {
                return this.normalize().multiplyScalar(e)
            }, lerp: function (e, t) {
                return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this
            }, lerpVectors: function (e, t, r) {
                return this.subVectors(t, e).multiplyScalar(r).add(e)
            }, equals: function (e) {
                return e.x === this.x && e.y === this.y
            }, fromArray: function (e, t) {
                return void 0 === t && (t = 0), this.x = e[t], this.y = e[t + 1], this
            }, toArray: function (e, t) {
                return void 0 === e && (e = []), void 0 === t && (t = 0), e[t] = this.x, e[t + 1] = this.y, e
            }, fromBufferAttribute: function (e, t, r) {
                return void 0 !== r && console.warn("THREE.Vector2: offset has been removed from .fromBufferAttribute()."), this.x = e.getX(t), this.y = e.getY(t), this
            }, rotateAround: function (e, t) {
                var r = Math.cos(t), a = Math.sin(t), i = this.x - e.x, n = this.y - e.y;
                return this.x = i * r - n * a + e.x, this.y = i * a + n * r + e.y, this
            }
        })
    }, UKne: function (e, t, r) {
        "use strict";

        function a() {
            Object.defineProperty(this, "id", {value: h += 2}), this.uuid = f.a.generateUUID(), this.name = "", this.type = "Geometry", this.vertices = [], this.colors = [], this.faces = [], this.faceVertexUvs = [[]], this.morphTargets = [], this.morphNormals = [], this.skinWeights = [], this.skinIndices = [], this.lineDistances = [], this.boundingBox = null, this.boundingSphere = null, this.elementsNeedUpdate = !1, this.verticesNeedUpdate = !1, this.uvsNeedUpdate = !1, this.normalsNeedUpdate = !1, this.colorsNeedUpdate = !1, this.lineDistancesNeedUpdate = !1, this.groupsNeedUpdate = !1
        }

        var n = Math.round;
        r.d(t, "a", function () {
            return a
        });
        var i = r("w4Ua"), o = r("9HH4"), s = r("eu9D"), l = r("8IfN"), d = r("/V9W"), p = r("w+kJ"), c = r("3+m9"),
            u = r("TnI4"), m = r("cuij"), g = r("p1p1"), f = r("MnML"), h = 0;
        a.prototype = Object.assign(Object.create(i.a.prototype), {
            constructor: a, isGeometry: !0, applyMatrix: function (e) {
                for (var t = new s.a().getNormalMatrix(e), r = 0, a = this.vertices.length, i; r < a; r++) i = this.vertices[r], i.applyMatrix4(e);
                for (var r = 0, a = this.faces.length, n; r < a; r++) {
                    n = this.faces[r], n.normal.applyMatrix3(t).normalize();
                    for (var o = 0, l = n.vertexNormals.length; o < l; o++) n.vertexNormals[o].applyMatrix3(t).normalize()
                }
                return null !== this.boundingBox && this.computeBoundingBox(), null !== this.boundingSphere && this.computeBoundingSphere(), this.verticesNeedUpdate = !0, this.normalsNeedUpdate = !0, this
            }, rotateX: function () {
                var e = new c.a;
                return function (t) {
                    return e.makeRotationX(t), this.applyMatrix(e), this
                }
            }(), rotateY: function () {
                var e = new c.a;
                return function (t) {
                    return e.makeRotationY(t), this.applyMatrix(e), this
                }
            }(), rotateZ: function () {
                var e = new c.a;
                return function (t) {
                    return e.makeRotationZ(t), this.applyMatrix(e), this
                }
            }(), translate: function () {
                var e = new c.a;
                return function (t, r, a) {
                    return e.makeTranslation(t, r, a), this.applyMatrix(e), this
                }
            }(), scale: function () {
                var e = new c.a;
                return function (t, r, a) {
                    return e.makeScale(t, r, a), this.applyMatrix(e), this
                }
            }(), lookAt: function () {
                var e = new g.a;
                return function (t) {
                    e.lookAt(t), e.updateMatrix(), this.applyMatrix(e.matrix)
                }
            }(), fromBufferGeometry: function (e) {
                function t(e, t, a, i) {
                    var n = void 0 === d ? [] : [r.colors[e].clone(), r.colors[t].clone(), r.colors[a].clone()],
                        s = void 0 === l ? [] : [new p.a().fromArray(l, 3 * e), new p.a().fromArray(l, 3 * t), new p.a().fromArray(l, 3 * a)],
                        c = new o.a(e, t, a, s, n, i);
                    r.faces.push(c), void 0 !== g && r.faceVertexUvs[0].push([new u.a().fromArray(g, 2 * e), new u.a().fromArray(g, 2 * t), new u.a().fromArray(g, 2 * a)]), void 0 !== f && r.faceVertexUvs[1].push([new u.a().fromArray(f, 2 * e), new u.a().fromArray(f, 2 * t), new u.a().fromArray(f, 2 * a)])
                }

                var r = this, a = null === e.index ? void 0 : e.index.array, n = e.attributes, s = n.position.array,
                    l = void 0 === n.normal ? void 0 : n.normal.array, d = void 0 === n.color ? void 0 : n.color.array,
                    g = void 0 === n.uv ? void 0 : n.uv.array, f = void 0 === n.uv2 ? void 0 : n.uv2.array;
                void 0 !== f && (this.faceVertexUvs[1] = []);
                for (var c = 0, i = 0; c < s.length; c += 3, i += 2) r.vertices.push(new p.a().fromArray(s, c)), void 0 !== d && r.colors.push(new m.a().fromArray(d, c));
                var h = e.groups;
                if (0 < h.length) for (var c = 0; c < h.length; c++) for (var v = h[c], x = v.start, y = v.count, i = x; i < x + y; i += 3) void 0 === a ? t(i, i + 1, i + 2, v.materialIndex) : t(a[i], a[i + 1], a[i + 2], v.materialIndex); else if (void 0 !== a) for (var c = 0; c < a.length; c += 3) t(a[c], a[c + 1], a[c + 2]); else for (var c = 0; c < s.length / 3; c += 3) t(c, c + 1, c + 2);
                return this.computeFaceNormals(), null !== e.boundingBox && (this.boundingBox = e.boundingBox.clone()), null !== e.boundingSphere && (this.boundingSphere = e.boundingSphere.clone()), this
            }, center: function () {
                var e = new p.a;
                return function () {
                    return this.computeBoundingBox(), this.boundingBox.getCenter(e).negate(), this.translate(e.x, e.y, e.z), this
                }
            }(), normalize: function () {
                this.computeBoundingSphere();
                var e = this.boundingSphere.center, t = this.boundingSphere.radius, r = 0 === t ? 1 : 1 / t,
                    a = new c.a;
                return a.set(r, 0, 0, -r * e.x, 0, r, 0, -r * e.y, 0, 0, r, -r * e.z, 0, 0, 0, 1), this.applyMatrix(a), this
            }, computeFaceNormals: function () {
                for (var e = new p.a, t = new p.a, r = 0, a = this.faces.length; r < a; r++) {
                    var i = this.faces[r], n = this.vertices[i.a], o = this.vertices[i.b], s = this.vertices[i.c];
                    e.subVectors(s, o), t.subVectors(n, o), e.cross(t), e.normalize(), i.normal.copy(e)
                }
            }, computeVertexNormals: function (e) {
                void 0 === e && (e = !0);
                var t, r, a, i, n, o;
                for (o = Array(this.vertices.length), t = 0, r = this.vertices.length; t < r; t++) o[t] = new p.a;
                if (e) {
                    var s = new p.a, l = new p.a, d, c, u;
                    for (a = 0, i = this.faces.length; a < i; a++) n = this.faces[a], d = this.vertices[n.a], c = this.vertices[n.b], u = this.vertices[n.c], s.subVectors(u, c), l.subVectors(d, c), s.cross(l), o[n.a].add(s), o[n.b].add(s), o[n.c].add(s)
                } else for (this.computeFaceNormals(), a = 0, i = this.faces.length; a < i; a++) n = this.faces[a], o[n.a].add(n.normal), o[n.b].add(n.normal), o[n.c].add(n.normal);
                for (t = 0, r = this.vertices.length; t < r; t++) o[t].normalize();
                for (a = 0, i = this.faces.length; a < i; a++) {
                    n = this.faces[a];
                    var m = n.vertexNormals;
                    3 === m.length ? (m[0].copy(o[n.a]), m[1].copy(o[n.b]), m[2].copy(o[n.c])) : (m[0] = o[n.a].clone(), m[1] = o[n.b].clone(), m[2] = o[n.c].clone())
                }
                0 < this.faces.length && (this.normalsNeedUpdate = !0)
            }, computeFlatVertexNormals: function () {
                var e, t, r;
                for (this.computeFaceNormals(), e = 0, t = this.faces.length; e < t; e++) {
                    r = this.faces[e];
                    var a = r.vertexNormals;
                    3 === a.length ? (a[0].copy(r.normal), a[1].copy(r.normal), a[2].copy(r.normal)) : (a[0] = r.normal.clone(), a[1] = r.normal.clone(), a[2] = r.normal.clone())
                }
                0 < this.faces.length && (this.normalsNeedUpdate = !0)
            }, computeMorphNormals: function () {
                var e, t, r, i, n;
                for (r = 0, i = this.faces.length; r < i; r++) for (n = this.faces[r], n.__originalFaceNormal ? n.__originalFaceNormal.copy(n.normal) : n.__originalFaceNormal = n.normal.clone(), n.__originalVertexNormals || (n.__originalVertexNormals = []), (e = 0, t = n.vertexNormals.length); e < t; e++) n.__originalVertexNormals[e] ? n.__originalVertexNormals[e].copy(n.vertexNormals[e]) : n.__originalVertexNormals[e] = n.vertexNormals[e].clone();
                var o = new a;
                for (o.faces = this.faces, e = 0, t = this.morphTargets.length; e < t; e++) {
                    if (!this.morphNormals[e]) {
                        this.morphNormals[e] = {}, this.morphNormals[e].faceNormals = [], this.morphNormals[e].vertexNormals = [];
                        var s = this.morphNormals[e].faceNormals, l = this.morphNormals[e].vertexNormals, d, c;
                        for (r = 0, i = this.faces.length; r < i; r++) d = new p.a, c = {
                            a: new p.a,
                            b: new p.a,
                            c: new p.a
                        }, s.push(d), l.push(c)
                    }
                    var u = this.morphNormals[e];
                    o.vertices = this.morphTargets[e].vertices, o.computeFaceNormals(), o.computeVertexNormals();
                    var d, c;
                    for (r = 0, i = this.faces.length; r < i; r++) n = this.faces[r], d = u.faceNormals[r], c = u.vertexNormals[r], d.copy(n.normal), c.a.copy(n.vertexNormals[0]), c.b.copy(n.vertexNormals[1]), c.c.copy(n.vertexNormals[2])
                }
                for (r = 0, i = this.faces.length; r < i; r++) n = this.faces[r], n.normal = n.__originalFaceNormal, n.vertexNormals = n.__originalVertexNormals
            }, computeBoundingBox: function () {
                null === this.boundingBox && (this.boundingBox = new d.a), this.boundingBox.setFromPoints(this.vertices)
            }, computeBoundingSphere: function () {
                null === this.boundingSphere && (this.boundingSphere = new l.a), this.boundingSphere.setFromPoints(this.vertices)
            }, merge: function (e, t, r) {
                if (!(e && e.isGeometry)) return void console.error("THREE.Geometry.merge(): geometry not an instance of THREE.Geometry.", e);
                var a = this.vertices.length, n = this.vertices, l = e.vertices, d = this.faces, c = e.faces,
                    p = this.faceVertexUvs[0], u = e.faceVertexUvs[0], m = this.colors, g = e.colors, f;
                void 0 === r && (r = 0), void 0 !== t && (f = new s.a().getNormalMatrix(t));
                for (var h = 0, i = l.length; h < i; h++) {
                    var v = l[h], x = v.clone();
                    void 0 !== t && x.applyMatrix4(t), n.push(x)
                }
                for (var h = 0, i = g.length; h < i; h++) m.push(g[h].clone());
                for (h = 0, i = c.length; h < i; h++) {
                    var y = c[h], _ = y.vertexNormals, b = y.vertexColors, M, S, L;
                    M = new o.a(y.a + a, y.b + a, y.c + a), M.normal.copy(y.normal), void 0 !== f && M.normal.applyMatrix3(f).normalize();
                    for (var E = 0, T = _.length; E < T; E++) S = _[E].clone(), void 0 !== f && S.applyMatrix3(f).normalize(), M.vertexNormals.push(S);
                    M.color.copy(y.color);
                    for (var E = 0, T = b.length; E < T; E++) L = b[E], M.vertexColors.push(L.clone());
                    M.materialIndex = y.materialIndex + r, d.push(M)
                }
                for (h = 0, i = u.length; h < i; h++) {
                    var w = u[h], P = [];
                    if (void 0 !== w) {
                        for (var E = 0, T = w.length; E < T; E++) P.push(w[E].clone());
                        p.push(P)
                    }
                }
            }, mergeMesh: function (e) {
                return e && e.isMesh ? void (e.matrixAutoUpdate && e.updateMatrix(), this.merge(e.geometry, e.matrix)) : void console.error("THREE.Geometry.mergeMesh(): mesh not an instance of THREE.Mesh.", e)
            }, mergeVertices: function () {
                var e = {}, t = [], r = [], a = 10000, o, s, l, i, d, c, p, u;
                for (l = 0, i = this.vertices.length; l < i; l++) o = this.vertices[l], s = n(o.x * a) + "_" + n(o.y * a) + "_" + n(o.z * a), void 0 === e[s] ? (e[s] = l, t.push(this.vertices[l]), r[l] = t.length - 1) : r[l] = r[e[s]];
                var m = [];
                for (l = 0, i = this.faces.length; l < i; l++) {
                    d = this.faces[l], d.a = r[d.a], d.b = r[d.b], d.c = r[d.c], c = [d.a, d.b, d.c];
                    for (var g = 0; 3 > g; g++) if (c[g] === c[(g + 1) % 3]) {
                        m.push(l);
                        break
                    }
                }
                for (l = m.length - 1; 0 <= l; l--) {
                    var f = m[l];
                    for (this.faces.splice(f, 1), p = 0, u = this.faceVertexUvs.length; p < u; p++) this.faceVertexUvs[p].splice(f, 1)
                }
                var h = this.vertices.length - t.length;
                return this.vertices = t, h
            }, setFromPoints: function (e) {
                this.vertices = [];
                for (var t = 0, r = e.length, a; t < r; t++) a = e[t], this.vertices.push(new p.a(a.x, a.y, a.z || 0));
                return this
            }, sortFacesByMaterialIndex: function () {
                for (var e = this.faces, t = e.length, r = 0; r < t; r++) e[r]._id = r;
                e.sort(function (e, t) {
                    return e.materialIndex - t.materialIndex
                });
                var a = this.faceVertexUvs[0], i = this.faceVertexUvs[1], n, o;
                a && a.length === t && (n = []), i && i.length === t && (o = []);
                for (var r = 0, s; r < t; r++) s = e[r]._id, n && n.push(a[s]), o && o.push(i[s]);
                n && (this.faceVertexUvs[0] = n), o && (this.faceVertexUvs[1] = o)
            }, toJSON: function () {
                function e(e, t, r) {
                    return r ? e | 1 << t : e & ~(1 << t)
                }

                function t(e) {
                    var t = e.x.toString() + e.y.toString() + e.z.toString();
                    return void 0 === u[t] ? (u[t] = p.length / 3, p.push(e.x, e.y, e.z), u[t]) : u[t]
                }

                function r(e) {
                    var t = e.r.toString() + e.g.toString() + e.b.toString();
                    return void 0 === g[t] ? (g[t] = m.length, m.push(e.getHex()), g[t]) : g[t]
                }

                function a(e) {
                    var t = e.x.toString() + e.y.toString();
                    return void 0 === h[t] ? (h[t] = f.length / 2, f.push(e.x, e.y), h[t]) : h[t]
                }

                var n = {metadata: {version: 4.5, type: "Geometry", generator: "Geometry.toJSON"}};
                if (n.uuid = this.uuid, n.type = this.type, "" !== this.name && (n.name = this.name), void 0 !== this.parameters) {
                    var o = this.parameters;
                    for (var s in o) void 0 !== o[s] && (n[s] = o[s]);
                    return n
                }
                for (var l = [], d = 0, i; d < this.vertices.length; d++) i = this.vertices[d], l.push(i.x, i.y, i.z);
                for (var c = [], p = [], u = {}, m = [], g = {}, f = [], h = {}, d = 0; d < this.faces.length; d++) {
                    var v = this.faces[d], x = void 0 !== this.faceVertexUvs[0][d], y = 0 < v.normal.length(),
                        _ = 0 < v.vertexNormals.length, b = 1 !== v.color.r || 1 !== v.color.g || 1 !== v.color.b,
                        M = 0 < v.vertexColors.length, S = 0;
                    if (S = e(S, 0, 0), S = e(S, 1, !0), S = e(S, 2, !1), S = e(S, 3, x), S = e(S, 4, y), S = e(S, 5, _), S = e(S, 6, b), S = e(S, 7, M), c.push(S), c.push(v.a, v.b, v.c), c.push(v.materialIndex), x) {
                        var L = this.faceVertexUvs[0][d];
                        c.push(a(L[0]), a(L[1]), a(L[2]))
                    }
                    if (y && c.push(t(v.normal)), _) {
                        var E = v.vertexNormals;
                        c.push(t(E[0]), t(E[1]), t(E[2]))
                    }
                    if (b && c.push(r(v.color)), M) {
                        var T = v.vertexColors;
                        c.push(r(T[0]), r(T[1]), r(T[2]))
                    }
                }
                return n.data = {}, n.data.vertices = l, n.data.normals = p, 0 < m.length && (n.data.colors = m), 0 < f.length && (n.data.uvs = [f]), n.data.faces = c, n
            }, clone: function () {
                return new a().copy(this)
            }, copy: function (e) {
                var t, r, a, i, n, o;
                this.vertices = [], this.colors = [], this.faces = [], this.faceVertexUvs = [[]], this.morphTargets = [], this.morphNormals = [], this.skinWeights = [], this.skinIndices = [], this.lineDistances = [], this.boundingBox = null, this.boundingSphere = null, this.name = e.name;
                var s = e.vertices;
                for (t = 0, r = s.length; t < r; t++) this.vertices.push(s[t].clone());
                var l = e.colors;
                for (t = 0, r = l.length; t < r; t++) this.colors.push(l[t].clone());
                var d = e.faces;
                for (t = 0, r = d.length; t < r; t++) this.faces.push(d[t].clone());
                for (t = 0, r = e.faceVertexUvs.length; t < r; t++) {
                    var c = e.faceVertexUvs[t];
                    for (void 0 === this.faceVertexUvs[t] && (this.faceVertexUvs[t] = []), a = 0, i = c.length; a < i; a++) {
                        var p = c[a], u = [];
                        for (n = 0, o = p.length; n < o; n++) {
                            var m = p[n];
                            u.push(m.clone())
                        }
                        this.faceVertexUvs[t].push(u)
                    }
                }
                var g = e.morphTargets;
                for (t = 0, r = g.length; t < r; t++) {
                    var f = {name: g[t].name};
                    if (void 0 !== g[t].vertices) for (f.vertices = [], a = 0, i = g[t].vertices.length; a < i; a++) f.vertices.push(g[t].vertices[a].clone());
                    if (void 0 !== g[t].normals) for (f.normals = [], a = 0, i = g[t].normals.length; a < i; a++) f.normals.push(g[t].normals[a].clone());
                    this.morphTargets.push(f)
                }
                var h = e.morphNormals;
                for (t = 0, r = h.length; t < r; t++) {
                    var v = {};
                    if (void 0 !== h[t].vertexNormals) for (v.vertexNormals = [], a = 0, i = h[t].vertexNormals.length; a < i; a++) {
                        var x = h[t].vertexNormals[a], y = {};
                        y.a = x.a.clone(), y.b = x.b.clone(), y.c = x.c.clone(), v.vertexNormals.push(y)
                    }
                    if (void 0 !== h[t].faceNormals) for (v.faceNormals = [], a = 0, i = h[t].faceNormals.length; a < i; a++) v.faceNormals.push(h[t].faceNormals[a].clone());
                    this.morphNormals.push(v)
                }
                var _ = e.skinWeights;
                for (t = 0, r = _.length; t < r; t++) this.skinWeights.push(_[t].clone());
                var b = e.skinIndices;
                for (t = 0, r = b.length; t < r; t++) this.skinIndices.push(b[t].clone());
                var M = e.lineDistances;
                for (t = 0, r = M.length; t < r; t++) this.lineDistances.push(M[t]);
                var S = e.boundingBox;
                null !== S && (this.boundingBox = S.clone());
                var L = e.boundingSphere;
                return null !== L && (this.boundingSphere = L.clone()), this.elementsNeedUpdate = e.elementsNeedUpdate, this.verticesNeedUpdate = e.verticesNeedUpdate, this.uvsNeedUpdate = e.uvsNeedUpdate, this.normalsNeedUpdate = e.normalsNeedUpdate, this.colorsNeedUpdate = e.colorsNeedUpdate, this.lineDistancesNeedUpdate = e.lineDistancesNeedUpdate, this.groupsNeedUpdate = e.groupsNeedUpdate, this
            }, dispose: function () {
                this.dispatchEvent({type: "dispose"})
            }
        })
    }, XPv6: function (e, t, r) {
        "use strict";

        function a(e, t, r, a) {
            o.a.call(this), this.type = "PlaneGeometry", this.parameters = {
                width: e,
                height: t,
                widthSegments: r,
                heightSegments: a
            }, this.fromBufferGeometry(new i(e, t, r, a)), this.mergeVertices()
        }

        function i(e, t, r, i) {
            s.a.call(this), this.type = "PlaneBufferGeometry", this.parameters = {
                width: e,
                height: t,
                widthSegments: r,
                heightSegments: i
            }, e = e || 1, t = t || 1;
            var o = e / 2, p = t / 2, u = n(r) || 1, m = n(i) || 1, g = u + 1, f = e / u, h = t / m, v = [], _ = [],
                M = [], S = [], L, E;
            for (E = 0; E < m + 1; E++) {
                var T = E * h - p;
                for (L = 0; L < g; L++) {
                    var w = L * f - o;
                    _.push(w, -T, 0), M.push(0, 0, 1), S.push(L / u), S.push(1 - E / m)
                }
            }
            for (E = 0; E < m; E++) for (L = 0; L < u; L++) {
                var x = L + g * E, a = L + g * (E + 1), b = L + 1 + g * (E + 1), c = L + 1 + g * E;
                v.push(x, a, c), v.push(a, b, c)
            }
            this.setIndex(v), this.addAttribute("position", new l.b(_, 3)), this.addAttribute("normal", new l.b(M, 3)), this.addAttribute("uv", new l.b(S, 2))
        }

        var n = Math.floor;
        r.d(t, "b", function () {
            return a
        }), r.d(t, "a", function () {
            return i
        });
        var o = r("UKne"), s = r("zfxg"), l = r("nKeq");
        a.prototype = Object.create(o.a.prototype), a.prototype.constructor = a, i.prototype = Object.create(s.a.prototype), i.prototype.constructor = i
    }, breI: function (e, t, r) {
        "use strict";

        function a(e, t, r, a) {
            this._x = e || 0, this._y = t || 0, this._z = r || 0, this._w = void 0 === a ? 1 : a
        }

        var i = Math.atan2, n = Number.EPSILON, o = Math.sqrt, l = Math.sin, d = Math.cos, s = Math.abs;
        r.d(t, "a", function () {
            return a
        });
        var c = r("MnML"), p = r("w+kJ");
        Object.assign(a, {
            slerp: function (e, r, a, i) {
                return a.copy(e).slerp(r, i)
            }, slerpFlat: function (e, r, a, d, c, p, u) {
                var t = a[d + 0], m = a[d + 1], g = a[d + 2], h = a[d + 3], v = c[p + 0], x = c[p + 1], y = c[p + 2],
                    _ = c[p + 3];
                if (h !== _ || t !== v || m !== x || g !== y) {
                    var b = 1 - u, s = t * v + m * x + g * y + h * _, M = 0 <= s ? 1 : -1, S = 1 - s * s;
                    if (S > n) {
                        var L = o(S), E = i(L, s * M);
                        b = l(b * E) / L, u = l(u * E) / L
                    }
                    var T = u * M;
                    if (t = t * b + v * T, m = m * b + x * T, g = g * b + y * T, h = h * b + _ * T, b == 1 - u) {
                        var w = 1 / o(t * t + m * m + g * g + h * h);
                        t *= w, m *= w, g *= w, h *= w
                    }
                }
                e[r] = t, e[r + 1] = m, e[r + 2] = g, e[r + 3] = h
            }
        }), Object.defineProperties(a.prototype, {
            x: {
                get: function () {
                    return this._x
                }, set: function (e) {
                    this._x = e, this.onChangeCallback()
                }
            }, y: {
                get: function () {
                    return this._y
                }, set: function (e) {
                    this._y = e, this.onChangeCallback()
                }
            }, z: {
                get: function () {
                    return this._z
                }, set: function (e) {
                    this._z = e, this.onChangeCallback()
                }
            }, w: {
                get: function () {
                    return this._w
                }, set: function (e) {
                    this._w = e, this.onChangeCallback()
                }
            }
        }), Object.assign(a.prototype, {
            isQuaternion: !0, set: function (e, t, r, a) {
                return this._x = e, this._y = t, this._z = r, this._w = a, this.onChangeCallback(), this
            }, clone: function () {
                return new this.constructor(this._x, this._y, this._z, this._w)
            }, copy: function (e) {
                return this._x = e.x, this._y = e.y, this._z = e.z, this._w = e.w, this.onChangeCallback(), this
            }, setFromEuler: function (e, t) {
                if (!(e && e.isEuler)) throw new Error("THREE.Quaternion: .setFromEuler() now expects an Euler rotation rather than a Vector3 and order.");
                var r = e._x, a = e._y, i = e._z, n = e.order, o = d, s = l, c = o(r / 2), p = o(a / 2), u = o(i / 2),
                    m = s(r / 2), g = s(a / 2), f = s(i / 2);
                return "XYZ" === n ? (this._x = m * p * u + c * g * f, this._y = c * g * u - m * p * f, this._z = c * p * f + m * g * u, this._w = c * p * u - m * g * f) : "YXZ" === n ? (this._x = m * p * u + c * g * f, this._y = c * g * u - m * p * f, this._z = c * p * f - m * g * u, this._w = c * p * u + m * g * f) : "ZXY" === n ? (this._x = m * p * u - c * g * f, this._y = c * g * u + m * p * f, this._z = c * p * f + m * g * u, this._w = c * p * u - m * g * f) : "ZYX" === n ? (this._x = m * p * u - c * g * f, this._y = c * g * u + m * p * f, this._z = c * p * f - m * g * u, this._w = c * p * u + m * g * f) : "YZX" === n ? (this._x = m * p * u + c * g * f, this._y = c * g * u + m * p * f, this._z = c * p * f - m * g * u, this._w = c * p * u - m * g * f) : "XZY" === n && (this._x = m * p * u - c * g * f, this._y = c * g * u - m * p * f, this._z = c * p * f + m * g * u, this._w = c * p * u + m * g * f), !1 !== t && this.onChangeCallback(), this
            }, setFromAxisAngle: function (e, t) {
                var r = t / 2, a = l(r);
                return this._x = e.x * a, this._y = e.y * a, this._z = e.z * a, this._w = d(r), this.onChangeCallback(), this
            }, setFromRotationMatrix: function (e) {
                var t = e.elements, r = t[0], a = t[4], i = t[8], n = t[1], l = t[5], d = t[9], c = t[2], p = t[6],
                    u = t[10], m = r + l + u, g;
                return 0 < m ? (g = .5 / o(m + 1), this._w = .25 / g, this._x = (p - d) * g, this._y = (i - c) * g, this._z = (n - a) * g) : r > l && r > u ? (g = 2 * o(1 + r - l - u), this._w = (p - d) / g, this._x = .25 * g, this._y = (a + n) / g, this._z = (i + c) / g) : l > u ? (g = 2 * o(1 + l - r - u), this._w = (i - c) / g, this._x = (a + n) / g, this._y = .25 * g, this._z = (d + p) / g) : (g = 2 * o(1 + u - r - l), this._w = (n - a) / g, this._x = (i + c) / g, this._y = (d + p) / g, this._z = .25 * g), this.onChangeCallback(), this
            }, setFromUnitVectors: function () {
                var e = new p.a, t;
                return function (r, a) {
                    return void 0 === e && (e = new p.a), t = r.dot(a) + 1, t < 1e-6 ? (t = 0, s(r.x) > s(r.z) ? e.set(-r.y, r.x, 0) : e.set(0, -r.z, r.y)) : e.crossVectors(r, a), this._x = e.x, this._y = e.y, this._z = e.z, this._w = t, this.normalize()
                }
            }(), angleTo: function (e) {
                return 2 * Math.acos(s(c.a.clamp(this.dot(e), -1, 1)))
            }, rotateTowards: function (e, r) {
                var a = this.angleTo(e);
                if (0 === a) return this;
                var i = Math.min(1, r / a);
                return this.slerp(e, i), this
            }, inverse: function () {
                return this.conjugate()
            }, conjugate: function () {
                return this._x *= -1, this._y *= -1, this._z *= -1, this.onChangeCallback(), this
            }, dot: function (e) {
                return this._x * e._x + this._y * e._y + this._z * e._z + this._w * e._w
            }, lengthSq: function () {
                return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w
            }, length: function () {
                return o(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w)
            }, normalize: function () {
                var e = this.length();
                return 0 === e ? (this._x = 0, this._y = 0, this._z = 0, this._w = 1) : (e = 1 / e, this._x *= e, this._y *= e, this._z *= e, this._w *= e), this.onChangeCallback(), this
            }, multiply: function (e, t) {
                return void 0 === t ? this.multiplyQuaternions(this, e) : (console.warn("THREE.Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead."), this.multiplyQuaternions(e, t))
            }, premultiply: function (e) {
                return this.multiplyQuaternions(e, this)
            }, multiplyQuaternions: function (e, t) {
                var r = e._x, a = e._y, i = e._z, n = e._w, o = t._x, s = t._y, l = t._z, d = t._w;
                return this._x = r * d + n * o + a * l - i * s, this._y = a * d + n * s + i * o - r * l, this._z = i * d + n * l + r * s - a * o, this._w = n * d - r * o - a * s - i * l, this.onChangeCallback(), this
            }, slerp: function (e, r) {
                if (0 === r) return this;
                if (1 === r) return this.copy(e);
                var t = this._x, a = this._y, d = this._z, c = this._w, p = c * e._w + t * e._x + a * e._y + d * e._z;
                if (0 > p ? (this._w = -e._w, this._x = -e._x, this._y = -e._y, this._z = -e._z, p = -p) : this.copy(e), 1 <= p) return this._w = c, this._x = t, this._y = a, this._z = d, this;
                var u = 1 - p * p;
                if (u <= n) {
                    var m = 1 - r;
                    return this._w = m * c + r * this._w, this._x = m * t + r * this._x, this._y = m * a + r * this._y, this._z = m * d + r * this._z, this.normalize()
                }
                var s = o(u), g = i(s, p), f = l((1 - r) * g) / s, h = l(r * g) / s;
                return this._w = c * f + this._w * h, this._x = t * f + this._x * h, this._y = a * f + this._y * h, this._z = d * f + this._z * h, this.onChangeCallback(), this
            }, equals: function (e) {
                return e._x === this._x && e._y === this._y && e._z === this._z && e._w === this._w
            }, fromArray: function (e, t) {
                return void 0 === t && (t = 0), this._x = e[t], this._y = e[t + 1], this._z = e[t + 2], this._w = e[t + 3], this.onChangeCallback(), this
            }, toArray: function (e, t) {
                return void 0 === e && (e = []), void 0 === t && (t = 0), e[t] = this._x, e[t + 1] = this._y, e[t + 2] = this._z, e[t + 3] = this._w, e
            }, onChange: function (e) {
                return this.onChangeCallback = e, this
            }, onChangeCallback: function () {
            }
        })
    }, brnI: function (e, t, r) {
        "use strict";

        function a(e, t) {
            g.a.call(this), this.type = "ExtrudeGeometry", this.parameters = {
                shapes: e,
                options: t
            }, this.fromBufferGeometry(new i(e, t)), this.mergeVertices()
        }

        function i(e, r) {
            function t(e) {
                function g(e, t, r) {
                    return t || console.error("THREE.ExtrudeGeometry: vec does not exist"), t.clone().multiplyScalar(r).add(e)
                }

                function f(e, t, r) {
                    var a = Math.sign, i = e.x - t.x, n = e.y - t.y, o = r.x - e.x, s = r.y - e.y, d = i * i + n * n, p,
                        u, g;
                    if (m(i * s - n * o) > l) {
                        var f = c(d), h = c(o * o + s * s), x = t.x - n / f, y = t.y + i / f, _ = r.x - s / h,
                            b = r.y + o / h, M = ((_ - x) * s - (b - y) * o) / (i * s - n * o);
                        p = x + i * M - e.x, u = y + n * M - e.y;
                        var S = p * p + u * u;
                        if (2 >= S) return new v.a(p, u);
                        g = c(S / 2)
                    } else {
                        var L = !1;
                        i > l ? o > l && (L = !0) : i < -l ? o < -l && (L = !0) : a(n) === a(s) && (L = !0), L ? (p = -n, u = i, g = c(d)) : (p = i, u = n, g = c(d / 2))
                    }
                    return new v.a(p / g, u / g)
                }

                function M() {
                    var e = o.length / 3;
                    if (I) {
                        var t = 0, r = ae * t;
                        for (oe = 0; oe < ie; oe++) ce = te[oe], T(ce[2] + r, ce[1] + r, ce[0] + r);
                        for (t = R + 2 * G, r = ae * t, oe = 0; oe < ie; oe++) ce = te[oe], T(ce[0] + r, ce[1] + r, ce[2] + r)
                    } else {
                        for (oe = 0; oe < ie; oe++) ce = te[oe], T(ce[2], ce[1], ce[0]);
                        for (oe = 0; oe < ie; oe++) ce = te[oe], T(ce[0] + ae * R, ce[1] + ae * R, ce[2] + ae * R)
                    }
                    n.addGroup(e, o.length / 3 - e, 0)
                }

                function S() {
                    var e = o.length / 3, t = 0;
                    for (L(re, t), t += re.length, (ee = 0, h = Q.length); ee < h; ee++) $ = Q[ee], L($, t), t += $.length;
                    n.addGroup(e, o.length / 3 - e, 1)
                }

                function L(e, t) {
                    var r, i;
                    for (oe = e.length; 0 <= --oe;) {
                        r = oe, i = oe - 1, 0 > i && (i = e.length - 1);
                        var n = 0, o = R + 2 * G;
                        for (n = 0; n < o; n++) {
                            var s = ae * n, l = ae * (n + 1), p = t + r + s, a = t + i + s, u = t + i + l,
                                c = t + r + l;
                            w(p, a, u, c)
                        }
                    }
                }

                function E(e, t, r) {
                    A.push(e), A.push(t), A.push(r)
                }

                function T(e, t, r) {
                    P(e), P(t), P(r);
                    var a = o.length / 3, i = B.generateTopUV(n, o, a - 3, a - 2, a - 1);
                    C(i[0]), C(i[1]), C(i[2])
                }

                function w(e, t, r, a) {
                    P(e), P(t), P(a), P(t), P(r), P(a);
                    var i = o.length / 3, s = B.generateSideWallUV(n, o, i - 6, i - 3, i - 2, i - 1);
                    C(s[0]), C(s[1]), C(s[3]), C(s[1]), C(s[2]), C(s[3])
                }

                function P(e) {
                    o.push(A[3 * e + 0]), o.push(A[3 * e + 1]), o.push(A[3 * e + 2])
                }

                function C(e) {
                    a.push(e.x), a.push(e.y)
                }

                var A = [], D = void 0 === r.curveSegments ? 12 : r.curveSegments, R = void 0 === r.steps ? 1 : r.steps,
                    N = void 0 === r.depth ? 100 : r.depth, I = void 0 === r.bevelEnabled || r.bevelEnabled,
                    U = void 0 === r.bevelThickness ? 6 : r.bevelThickness,
                    F = void 0 === r.bevelSize ? U - 2 : r.bevelSize,
                    G = void 0 === r.bevelSegments ? 3 : r.bevelSegments, O = r.extrudePath,
                    B = void 0 === r.UVGenerator ? _ : r.UVGenerator;
                void 0 !== r.amount && (console.warn("THREE.ExtrudeBufferGeometry: amount has been renamed to depth."), N = r.amount);
                var V = !1, H, W, q, X, Y;
                O && (H = O.getSpacedPoints(R), V = !0, I = !1, W = O.computeFrenetFrames(R, !1), q = new x.a, X = new x.a, Y = new x.a), I || (G = 0, U = 0, F = 0);
                var J = e.extractPoints(D), Z = J.shape, Q = J.holes, K = !y.a.isClockWise(Z), $, ee, h;
                if (K) for (Z = Z.reverse(), ee = 0, h = Q.length; ee < h; ee++) $ = Q[ee], y.a.isClockWise($) && (Q[ee] = $.reverse());
                var te = y.a.triangulateShape(Z, Q), re = Z;
                for (ee = 0, h = Q.length; ee < h; ee++) $ = Q[ee], Z = Z.concat($);
                for (var ae = Z.length, ie = te.length, ne = [], oe = 0, i = re.length, se = i - 1, j = oe + 1, k, b, le, t, de, ce; oe < i; oe++, se++, j++) se === i && (se = 0), j === i && (j = 0), ne[oe] = f(re[oe], re[se], re[j]);
                var pe = [], ue = ne.concat(), me;
                for (ee = 0, h = Q.length; ee < h; ee++) {
                    for ($ = Q[ee], me = [], (oe = 0, i = $.length, se = i - 1, j = oe + 1); oe < i; oe++, se++, j++) se === i && (se = 0), j === i && (j = 0), me[oe] = f($[oe], $[se], $[j]);
                    pe.push(me), ue = ue.concat(me)
                }
                for (k = 0; k < G; k++) {
                    for (le = k / G, t = U * u(le * d / 2), b = F * p(le * d / 2), (oe = 0, i = re.length); oe < i; oe++) de = g(re[oe], ne[oe], b), E(de.x, de.y, -t);
                    for (ee = 0, h = Q.length; ee < h; ee++) for ($ = Q[ee], me = pe[ee], (oe = 0, i = $.length); oe < i; oe++) de = g($[oe], me[oe], b), E(de.x, de.y, -t)
                }
                for (b = F, oe = 0; oe < ae; oe++) de = I ? g(Z[oe], ue[oe], b) : Z[oe], V ? (X.copy(W.normals[0]).multiplyScalar(de.x), q.copy(W.binormals[0]).multiplyScalar(de.y), Y.copy(H[0]).add(X).add(q), E(Y.x, Y.y, Y.z)) : E(de.x, de.y, 0);
                var ge;
                for (ge = 1; ge <= R; ge++) for (oe = 0; oe < ae; oe++) de = I ? g(Z[oe], ue[oe], b) : Z[oe], V ? (X.copy(W.normals[ge]).multiplyScalar(de.x), q.copy(W.binormals[ge]).multiplyScalar(de.y), Y.copy(H[ge]).add(X).add(q), E(Y.x, Y.y, Y.z)) : E(de.x, de.y, N / R * ge);
                for (k = G - 1; 0 <= k; k--) {
                    for (le = k / G, t = U * u(le * d / 2), b = F * p(le * d / 2), (oe = 0, i = re.length); oe < i; oe++) de = g(re[oe], ne[oe], b), E(de.x, de.y, N + t);
                    for (ee = 0, h = Q.length; ee < h; ee++) for ($ = Q[ee], me = pe[ee], (oe = 0, i = $.length); oe < i; oe++) de = g($[oe], me[oe], b), V ? E(de.x, de.y + H[R - 1].y, H[R - 1].x + t) : E(de.x, de.y, N + t)
                }
                M(), S()
            }

            f.a.call(this), this.type = "ExtrudeBufferGeometry", this.parameters = {
                shapes: e,
                options: r
            }, e = Array.isArray(e) ? e : [e];
            for (var n = this, o = [], a = [], s = 0, i = e.length, g; s < i; s++) g = e[s], t(g);
            this.addAttribute("position", new h.b(o, 3)), this.addAttribute("uv", new h.b(a, 2)), this.computeVertexNormals()
        }

        function n(e, t, r) {
            if (r.shapes = [], Array.isArray(e)) for (var a = 0, i = e.length, n; a < i; a++) n = e[a], r.shapes.push(n.uuid); else r.shapes.push(e.uuid);
            return void 0 !== t.extrudePath && (r.options.extrudePath = t.extrudePath.toJSON()), r
        }

        function o(e, t) {
            g.a.call(this), this.type = "TextGeometry", this.parameters = {
                text: e,
                parameters: t
            }, this.fromBufferGeometry(new s(e, t)), this.mergeVertices()
        }

        function s(e, t) {
            t = t || {};
            var r = t.font;
            if (!(r && r.isFont)) return console.error("THREE.TextGeometry: font parameter is not an instance of THREE.Font."), new g.a;
            var a = r.generateShapes(e, t.size);
            t.depth = void 0 === t.height ? 50 : t.height, void 0 === t.bevelThickness && (t.bevelThickness = 10), void 0 === t.bevelSize && (t.bevelSize = 8), void 0 === t.bevelEnabled && (t.bevelEnabled = !1), i.call(this, a, t), this.type = "TextBufferGeometry"
        }

        var l = Number.EPSILON, d = Math.PI, c = Math.sqrt, p = Math.sin, u = Math.cos, m = Math.abs, g = r("UKne"),
            f = r("zfxg"), h = r("nKeq"), v = r("TnI4"), x = r("w+kJ"), y = r("IJRe");
        a.prototype = Object.create(g.a.prototype), a.prototype.constructor = a, a.prototype.toJSON = function () {
            var e = g.a.prototype.toJSON.call(this), t = this.parameters.shapes, r = this.parameters.options;
            return n(t, r, e)
        }, i.prototype = Object.create(f.a.prototype), i.prototype.constructor = i, i.prototype.toJSON = function () {
            var e = f.a.prototype.toJSON.call(this), t = this.parameters.shapes, r = this.parameters.options;
            return n(t, r, e)
        };
        var _ = {
            generateTopUV: function (e, t, r, a, i) {
                var n = t[3 * r], o = t[3 * r + 1], s = t[3 * a], l = t[3 * a + 1], d = t[3 * i], c = t[3 * i + 1];
                return [new v.a(n, o), new v.a(s, l), new v.a(d, c)]
            }, generateSideWallUV: function (e, t, r, a, i, n) {
                var o = t[3 * r], s = t[3 * r + 1], l = t[3 * r + 2], d = t[3 * a], c = t[3 * a + 1], p = t[3 * a + 2],
                    u = t[3 * i], g = t[3 * i + 1], f = t[3 * i + 2], h = t[3 * n], x = t[3 * n + 1], y = t[3 * n + 2];
                return .01 > m(s - c) ? [new v.a(o, 1 - l), new v.a(d, 1 - p), new v.a(u, 1 - f), new v.a(h, 1 - y)] : [new v.a(s, 1 - l), new v.a(c, 1 - p), new v.a(g, 1 - f), new v.a(x, 1 - y)]
            }
        };
        r.d(t, "a", function () {
            return o
        }), o.prototype = Object.create(g.a.prototype), o.prototype.constructor = o, s.prototype = Object.create(i.prototype), s.prototype.constructor = s
    }, cuij: function (e, t, r) {
        "use strict";

        function a(e, t, r) {
            return void 0 === t && void 0 === r ? this.set(e) : this.setRGB(e, t, r)
        }

        var i = Math.pow, n = Math.max, o = Math.min;
        r.d(t, "a", function () {
            return a
        });
        var d = r("MnML"), s = {
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
        Object.assign(a.prototype, {
            isColor: !0, r: 1, g: 1, b: 1, set: function (e) {
                return e && e.isColor ? this.copy(e) : "number" == typeof e ? this.setHex(e) : "string" == typeof e && this.setStyle(e), this
            }, setScalar: function (e) {
                return this.r = e, this.g = e, this.b = e, this
            }, setHex: function (e) {
                return e = Math.floor(e), this.r = (255 & e >> 16) / 255, this.g = (255 & e >> 8) / 255, this.b = (255 & e) / 255, this
            }, setRGB: function (e, t, r) {
                return this.r = e, this.g = t, this.b = r, this
            }, setHSL: function () {
                function e(e, r, a) {
                    return 0 > a && (a += 1), 1 < a && (a -= 1), a < 1 / 6 ? e + 6 * (r - e) * a : a < 1 / 2 ? r : a < 2 / 3 ? e + 6 * (r - e) * (2 / 3 - a) : e
                }

                return function (t, r, a) {
                    if (t = d.a.euclideanModulo(t, 1), r = d.a.clamp(r, 0, 1), a = d.a.clamp(a, 0, 1), 0 === r) this.r = this.g = this.b = a; else {
                        var i = .5 >= a ? a * (1 + r) : a + r - a * r, n = 2 * a - i;
                        this.r = e(n, i, t + 1 / 3), this.g = e(n, i, t), this.b = e(n, i, t - 1 / 3)
                    }
                    return this
                }
            }(), setStyle: function (e) {
                function t(t) {
                    void 0 === t || 1 > parseFloat(t) && console.warn("THREE.Color: Alpha component of " + e + " will be ignored.")
                }

                var r;
                if (r = /^((?:rgb|hsl)a?)\(\s*([^\)]*)\)/.exec(e)) {
                    var a = r[1], i = r[2], n;
                    switch (a) {
                        case"rgb":
                        case"rgba":
                            if (n = /^(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(i)) return this.r = o(255, parseInt(n[1], 10)) / 255, this.g = o(255, parseInt(n[2], 10)) / 255, this.b = o(255, parseInt(n[3], 10)) / 255, t(n[5]), this;
                            if (n = /^(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(i)) return this.r = o(100, parseInt(n[1], 10)) / 100, this.g = o(100, parseInt(n[2], 10)) / 100, this.b = o(100, parseInt(n[3], 10)) / 100, t(n[5]), this;
                            break;
                        case"hsl":
                        case"hsla":
                            if (n = /^([0-9]*\.?[0-9]+)\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(i)) {
                                var d = parseFloat(n[1]) / 360, c = parseInt(n[2], 10) / 100,
                                    p = parseInt(n[3], 10) / 100;
                                return t(n[5]), this.setHSL(d, c, p)
                            }
                    }
                } else if (r = /^\#([A-Fa-f0-9]+)$/.exec(e)) {
                    var l = r[1], u = l.length;
                    if (3 === u) return this.r = parseInt(l.charAt(0) + l.charAt(0), 16) / 255, this.g = parseInt(l.charAt(1) + l.charAt(1), 16) / 255, this.b = parseInt(l.charAt(2) + l.charAt(2), 16) / 255, this;
                    if (6 === u) return this.r = parseInt(l.charAt(0) + l.charAt(1), 16) / 255, this.g = parseInt(l.charAt(2) + l.charAt(3), 16) / 255, this.b = parseInt(l.charAt(4) + l.charAt(5), 16) / 255, this
                }
                if (e && 0 < e.length) {
                    var l = s[e];
                    void 0 === l ? console.warn("THREE.Color: Unknown color " + e) : this.setHex(l)
                }
                return this
            }, clone: function () {
                return new this.constructor(this.r, this.g, this.b)
            }, copy: function (e) {
                return this.r = e.r, this.g = e.g, this.b = e.b, this
            }, copyGammaToLinear: function (e, t) {
                return void 0 === t && (t = 2), this.r = i(e.r, t), this.g = i(e.g, t), this.b = i(e.b, t), this
            }, copyLinearToGamma: function (e, t) {
                void 0 === t && (t = 2);
                var r = 0 < t ? 1 / t : 1;
                return this.r = i(e.r, r), this.g = i(e.g, r), this.b = i(e.b, r), this
            }, convertGammaToLinear: function (e) {
                return this.copyGammaToLinear(this, e), this
            }, convertLinearToGamma: function (e) {
                return this.copyLinearToGamma(this, e), this
            }, copySRGBToLinear: function () {
                function e(e) {
                    return .04045 > e ? .0773993808 * e : i(.9478672986 * e + .0521327014, 2.4)
                }

                return function (t) {
                    return this.r = e(t.r), this.g = e(t.g), this.b = e(t.b), this
                }
            }(), copyLinearToSRGB: function () {
                function e(e) {
                    return .0031308 > e ? 12.92 * e : 1.055 * i(e, .41666) - .055
                }

                return function (t) {
                    return this.r = e(t.r), this.g = e(t.g), this.b = e(t.b), this
                }
            }(), convertSRGBToLinear: function () {
                return this.copySRGBToLinear(this), this
            }, convertLinearToSRGB: function () {
                return this.copyLinearToSRGB(this), this
            }, getHex: function () {
                return 255 * this.r << 16 ^ 255 * this.g << 8 ^ 255 * this.b << 0
            }, getHexString: function () {
                return ("000000" + this.getHex().toString(16)).slice(-6)
            }, getHSL: function (e) {
                void 0 === e && (console.warn("THREE.Color: .getHSL() target is now required"), e = {h: 0, s: 0, l: 0});
                var t = this.r, r = this.g, a = this.b, i = n(t, r, a), s = o(t, r, a), l = (s + i) / 2, d, c;
                if (s === i) d = 0, c = 0; else {
                    var p = i - s;
                    c = .5 >= l ? p / (i + s) : p / (2 - i - s), i === t ? d = (r - a) / p + (r < a ? 6 : 0) : i === r ? d = (a - t) / p + 2 : i === a ? d = (t - r) / p + 4 : void 0, d /= 6
                }
                return e.h = d, e.s = c, e.l = l, e
            }, getStyle: function () {
                return "rgb(" + (0 | 255 * this.r) + "," + (0 | 255 * this.g) + "," + (0 | 255 * this.b) + ")"
            }, offsetHSL: function () {
                var e = {};
                return function (t, r, a) {
                    return this.getHSL(e), e.h += t, e.s += r, e.l += a, this.setHSL(e.h, e.s, e.l), this
                }
            }(), add: function (e) {
                return this.r += e.r, this.g += e.g, this.b += e.b, this
            }, addColors: function (e, t) {
                return this.r = e.r + t.r, this.g = e.g + t.g, this.b = e.b + t.b, this
            }, addScalar: function (e) {
                return this.r += e, this.g += e, this.b += e, this
            }, sub: function (e) {
                return this.r = n(0, this.r - e.r), this.g = n(0, this.g - e.g), this.b = n(0, this.b - e.b), this
            }, multiply: function (e) {
                return this.r *= e.r, this.g *= e.g, this.b *= e.b, this
            }, multiplyScalar: function (e) {
                return this.r *= e, this.g *= e, this.b *= e, this
            }, lerp: function (e, t) {
                return this.r += (e.r - this.r) * t, this.g += (e.g - this.g) * t, this.b += (e.b - this.b) * t, this
            }, lerpHSL: function () {
                var e = {h: 0, s: 0, l: 0}, t = {h: 0, s: 0, l: 0};
                return function (r, a) {
                    this.getHSL(e), r.getHSL(t);
                    var i = d.a.lerp(e.h, t.h, a), n = d.a.lerp(e.s, t.s, a), o = d.a.lerp(e.l, t.l, a);
                    return this.setHSL(i, n, o), this
                }
            }(), equals: function (e) {
                return e.r === this.r && e.g === this.g && e.b === this.b
            }, fromArray: function (e, t) {
                return void 0 === t && (t = 0), this.r = e[t], this.g = e[t + 1], this.b = e[t + 2], this
            }, toArray: function (e, t) {
                return void 0 === e && (e = []), void 0 === t && (t = 0), e[t] = this.r, e[t + 1] = this.g, e[t + 2] = this.b, e
            }, toJSON: function () {
                return this.getHex()
            }
        })
    }, dt5g: function (e, t, r) {
        "use strict";

        function a(e) {
            i.a.call(this), this.type = "ShaderMaterial", this.defines = {}, this.uniforms = {}, this.vertexShader = "void main() {\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}", this.fragmentShader = "void main() {\n\tgl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );\n}", this.linewidth = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.fog = !1, this.lights = !1, this.clipping = !1, this.skinning = !1, this.morphTargets = !1, this.morphNormals = !1, this.extensions = {
                derivatives: !1,
                fragDepth: !1,
                drawBuffers: !1,
                shaderTextureLOD: !1
            }, this.defaultAttributeValues = {
                color: [1, 1, 1],
                uv: [0, 0],
                uv2: [0, 0]
            }, this.index0AttributeName = void 0, this.uniformsNeedUpdate = !1, void 0 !== e && (void 0 !== e.attributes && console.error("THREE.ShaderMaterial: attributes should now be defined in THREE.BufferGeometry instead."), this.setValues(e))
        }

        r.d(t, "a", function () {
            return a
        });
        var i = r("9eRv"), n = r("4H5f");
        a.prototype = Object.create(i.a.prototype), a.prototype.constructor = a, a.prototype.isShaderMaterial = !0, a.prototype.copy = function (e) {
            return i.a.prototype.copy.call(this, e), this.fragmentShader = e.fragmentShader, this.vertexShader = e.vertexShader, this.uniforms = Object(n.a)(e.uniforms), this.defines = Object.assign({}, e.defines), this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.lights = e.lights, this.clipping = e.clipping, this.skinning = e.skinning, this.morphTargets = e.morphTargets, this.morphNormals = e.morphNormals, this.extensions = e.extensions, this
        }, a.prototype.toJSON = function (e) {
            var t = i.a.prototype.toJSON.call(this, e);
            for (var r in t.uniforms = {}, this.uniforms) {
                var a = this.uniforms[r], n = a.value;
                t.uniforms[r] = n && n.isTexture ? {type: "t", value: n.toJSON(e).uuid} : n && n.isColor ? {
                    type: "c",
                    value: n.getHex()
                } : n && n.isVector2 ? {type: "v2", value: n.toArray()} : n && n.isVector3 ? {
                    type: "v3",
                    value: n.toArray()
                } : n && n.isVector4 ? {type: "v4", value: n.toArray()} : n && n.isMatrix3 ? {
                    type: "m3",
                    value: n.toArray()
                } : n && n.isMatrix4 ? {type: "m4", value: n.toArray()} : {value: n}
            }
            0 < Object.keys(this.defines).length && (t.defines = this.defines), t.vertexShader = this.vertexShader, t.fragmentShader = this.fragmentShader;
            var o = {};
            for (var s in this.extensions) !0 === this.extensions[s] && (o[s] = !0);
            return 0 < Object.keys(o).length && (t.extensions = o), t
        }
    }, "e/Nn": function (e, t, r) {
        "use strict";

        function a(e, t, r, a, o, s, l, d, c) {
            n.a.call(this, e, t, r, a, o, s, l, d, c), this.format = void 0 === l ? i.Nb : l, this.minFilter = void 0 === s ? i.M : s, this.magFilter = void 0 === o ? i.M : o, this.generateMipmaps = !1
        }

        r.d(t, "a", function () {
            return a
        });
        var i = r("6deg"), n = r("xvF/");
        a.prototype = Object.assign(Object.create(n.a.prototype), {
            constructor: a,
            isVideoTexture: !0,
            update: function () {
                var e = this.image;
                e.readyState >= e.HAVE_CURRENT_DATA && (this.needsUpdate = !0)
            }
        })
    }, eu9D: function (e, t, r) {
        "use strict";

        function a() {
            this.elements = [1, 0, 0, 0, 1, 0, 0, 0, 1], 0 < arguments.length && console.error("THREE.Matrix3: the constructor no longer reads arguments. use .set() instead.")
        }

        var i = Math.sin, n = Math.cos;
        r.d(t, "a", function () {
            return a
        });
        var o = r("w+kJ");
        Object.assign(a.prototype, {
            isMatrix3: !0, set: function (e, t, r, a, i, n, o, s, l) {
                var d = this.elements;
                return d[0] = e, d[1] = a, d[2] = o, d[3] = t, d[4] = i, d[5] = s, d[6] = r, d[7] = n, d[8] = l, this
            }, identity: function () {
                return this.set(1, 0, 0, 0, 1, 0, 0, 0, 1), this
            }, clone: function () {
                return new this.constructor().fromArray(this.elements)
            }, copy: function (e) {
                var t = this.elements, r = e.elements;
                return t[0] = r[0], t[1] = r[1], t[2] = r[2], t[3] = r[3], t[4] = r[4], t[5] = r[5], t[6] = r[6], t[7] = r[7], t[8] = r[8], this
            }, setFromMatrix4: function (e) {
                var t = e.elements;
                return this.set(t[0], t[4], t[8], t[1], t[5], t[9], t[2], t[6], t[10]), this
            }, applyToBufferAttribute: function () {
                var e = new o.a;
                return function (t) {
                    for (var r = 0, a = t.count; r < a; r++) e.x = t.getX(r), e.y = t.getY(r), e.z = t.getZ(r), e.applyMatrix3(this), t.setXYZ(r, e.x, e.y, e.z);
                    return t
                }
            }(), multiply: function (e) {
                return this.multiplyMatrices(this, e)
            }, premultiply: function (e) {
                return this.multiplyMatrices(e, this)
            }, multiplyMatrices: function (e, t) {
                var r = e.elements, a = t.elements, i = this.elements, n = r[0], o = r[3], s = r[6], l = r[1], d = r[4],
                    c = r[7], p = r[2], u = r[5], m = r[8], g = a[0], f = a[3], h = a[6], v = a[1], x = a[4], y = a[7],
                    _ = a[2], b = a[5], M = a[8];
                return i[0] = n * g + o * v + s * _, i[3] = n * f + o * x + s * b, i[6] = n * h + o * y + s * M, i[1] = l * g + d * v + c * _, i[4] = l * f + d * x + c * b, i[7] = l * h + d * y + c * M, i[2] = p * g + u * v + m * _, i[5] = p * f + u * x + m * b, i[8] = p * h + u * y + m * M, this
            }, multiplyScalar: function (e) {
                var t = this.elements;
                return t[0] *= e, t[3] *= e, t[6] *= e, t[1] *= e, t[4] *= e, t[7] *= e, t[2] *= e, t[5] *= e, t[8] *= e, this
            }, determinant: function () {
                var t = this.elements, r = t[0], a = t[1], n = t[2], o = t[3], s = t[4], e = t[5], l = t[6], d = t[7],
                    c = t[8];
                return r * s * c - r * e * d - a * o * c + a * e * l + n * o * d - n * s * l
            }, getInverse: function (e, t) {
                e && e.isMatrix4 && console.error("THREE.Matrix3: .getInverse() no longer takes a Matrix4 argument.");
                var r = e.elements, a = this.elements, i = r[0], n = r[1], o = r[2], s = r[3], l = r[4], d = r[5],
                    c = r[6], p = r[7], u = r[8], m = u * l - d * p, g = d * c - u * s, f = p * s - l * c,
                    h = i * m + n * g + o * f;
                if (0 == h) {
                    var v = "THREE.Matrix3: .getInverse() can't invert matrix, determinant is 0";
                    if (!0 === t) throw new Error(v); else console.warn(v);
                    return this.identity()
                }
                var x = 1 / h;
                return a[0] = m * x, a[1] = (o * p - u * n) * x, a[2] = (d * n - o * l) * x, a[3] = g * x, a[4] = (u * i - o * c) * x, a[5] = (o * s - d * i) * x, a[6] = f * x, a[7] = (n * c - p * i) * x, a[8] = (l * i - n * s) * x, this
            }, transpose: function () {
                var e = this.elements, t;
                return t = e[1], e[1] = e[3], e[3] = t, t = e[2], e[2] = e[6], e[6] = t, t = e[5], e[5] = e[7], e[7] = t, this
            }, getNormalMatrix: function (e) {
                return this.setFromMatrix4(e).getInverse(this).transpose()
            }, transposeIntoArray: function (e) {
                var t = this.elements;
                return e[0] = t[0], e[1] = t[3], e[2] = t[6], e[3] = t[1], e[4] = t[4], e[5] = t[7], e[6] = t[2], e[7] = t[5], e[8] = t[8], this
            }, setUvTransform: function (e, t, r, a, o, l, d) {
                var p = n(o), c = i(o);
                this.set(r * p, r * c, -r * (p * l + c * d) + l + e, -a * c, a * p, -a * (-c * l + p * d) + d + t, 0, 0, 1)
            }, scale: function (e, t) {
                var r = this.elements;
                return r[0] *= e, r[3] *= e, r[6] *= e, r[1] *= t, r[4] *= t, r[7] *= t, this
            }, rotate: function (e) {
                var t = n(e), r = i(e), a = this.elements, o = a[0], l = a[3], d = a[6], c = a[1], p = a[4], u = a[7];
                return a[0] = t * o + r * c, a[3] = t * l + r * p, a[6] = t * d + r * u, a[1] = -r * o + t * c, a[4] = -r * l + t * p, a[7] = -r * d + t * u, this
            }, translate: function (e, t) {
                var r = this.elements;
                return r[0] += e * r[2], r[3] += e * r[5], r[6] += e * r[8], r[1] += t * r[2], r[4] += t * r[5], r[7] += t * r[8], this
            }, equals: function (e) {
                for (var t = this.elements, r = e.elements, a = 0; 9 > a; a++) if (t[a] !== r[a]) return !1;
                return !0
            }, fromArray: function (e, t) {
                void 0 === t && (t = 0);
                for (var r = 0; 9 > r; r++) this.elements[r] = e[r + t];
                return this
            }, toArray: function (e, t) {
                void 0 === e && (e = []), void 0 === t && (t = 0);
                var r = this.elements;
                return e[t] = r[0], e[t + 1] = r[1], e[t + 2] = r[2], e[t + 3] = r[3], e[t + 4] = r[4], e[t + 5] = r[5], e[t + 6] = r[6], e[t + 7] = r[7], e[t + 8] = r[8], e
            }
        })
    }, hwoJ: function (e, t, r) {
        "use strict";
        r.d(t, "a", function () {
            return a
        });
        var a = {
            enabled: !1, files: {}, add: function (e, t) {
                !1 === this.enabled || (this.files[e] = t)
            }, get: function (e) {
                return !1 === this.enabled ? void 0 : this.files[e]
            }, remove: function (e) {
                delete this.files[e]
            }, clear: function () {
                this.files = {}
            }
        }
    }, nKeq: function (e, t, r) {
        "use strict";

        function a(e, t, r) {
            if (Array.isArray(e)) throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
            this.name = "", this.array = e, this.itemSize = t, this.count = void 0 === e ? 0 : e.length / t, this.normalized = !0 === r, this.dynamic = !1, this.updateRange = {
                offset: 0,
                count: -1
            }, this.version = 0
        }

        function i(e, t, r) {
            a.call(this, new Int8Array(e), t, r)
        }

        function n(e, t, r) {
            a.call(this, new Uint8Array(e), t, r)
        }

        function o(e, t, r) {
            a.call(this, new Uint8ClampedArray(e), t, r)
        }

        function s(e, t, r) {
            a.call(this, new Int16Array(e), t, r)
        }

        function l(e, t, r) {
            a.call(this, new Uint16Array(e), t, r)
        }

        function d(e, t, r) {
            a.call(this, new Int32Array(e), t, r)
        }

        function c(e, t, r) {
            a.call(this, new Uint32Array(e), t, r)
        }

        function p(e, t, r) {
            a.call(this, new Float32Array(e), t, r)
        }

        function u(e, t, r) {
            a.call(this, new Float64Array(e), t, r)
        }

        r.d(t, "b", function () {
            return p
        }), r.d(t, "d", function () {
            return c
        }), r.d(t, "c", function () {
            return l
        }), r.d(t, "a", function () {
            return a
        });
        var m = r("CNRw"), g = r("w+kJ"), f = r("TnI4"), h = r("cuij");
        Object.defineProperty(a.prototype, "needsUpdate", {
            set: function (e) {
                !0 === e && this.version++
            }
        }), Object.assign(a.prototype, {
            isBufferAttribute: !0, onUploadCallback: function () {
            }, setArray: function (e) {
                if (Array.isArray(e)) throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
                return this.count = void 0 === e ? 0 : e.length / this.itemSize, this.array = e, this
            }, setDynamic: function (e) {
                return this.dynamic = e, this
            }, copy: function (e) {
                return this.name = e.name, this.array = new e.array.constructor(e.array), this.itemSize = e.itemSize, this.count = e.count, this.normalized = e.normalized, this.dynamic = e.dynamic, this
            }, copyAt: function (e, t, r) {
                e *= this.itemSize, r *= t.itemSize;
                for (var a = 0, i = this.itemSize; a < i; a++) this.array[e + a] = t.array[r + a];
                return this
            }, copyArray: function (e) {
                return this.array.set(e), this
            }, copyColorsArray: function (e) {
                for (var t = this.array, r = 0, a = 0, i = e.length, n; a < i; a++) n = e[a], void 0 === n && (console.warn("THREE.BufferAttribute.copyColorsArray(): color is undefined", a), n = new h.a), t[r++] = n.r, t[r++] = n.g, t[r++] = n.b;
                return this
            }, copyVector2sArray: function (e) {
                for (var t = this.array, r = 0, a = 0, i = e.length, n; a < i; a++) n = e[a], void 0 === n && (console.warn("THREE.BufferAttribute.copyVector2sArray(): vector is undefined", a), n = new f.a), t[r++] = n.x, t[r++] = n.y;
                return this
            }, copyVector3sArray: function (e) {
                for (var t = this.array, r = 0, a = 0, i = e.length, n; a < i; a++) n = e[a], void 0 === n && (console.warn("THREE.BufferAttribute.copyVector3sArray(): vector is undefined", a), n = new g.a), t[r++] = n.x, t[r++] = n.y, t[r++] = n.z;
                return this
            }, copyVector4sArray: function (e) {
                for (var t = this.array, r = 0, a = 0, i = e.length, n; a < i; a++) n = e[a], void 0 === n && (console.warn("THREE.BufferAttribute.copyVector4sArray(): vector is undefined", a), n = new m.a), t[r++] = n.x, t[r++] = n.y, t[r++] = n.z, t[r++] = n.w;
                return this
            }, set: function (e, t) {
                return void 0 === t && (t = 0), this.array.set(e, t), this
            }, getX: function (e) {
                return this.array[e * this.itemSize]
            }, setX: function (e, t) {
                return this.array[e * this.itemSize] = t, this
            }, getY: function (e) {
                return this.array[e * this.itemSize + 1]
            }, setY: function (e, t) {
                return this.array[e * this.itemSize + 1] = t, this
            }, getZ: function (e) {
                return this.array[e * this.itemSize + 2]
            }, setZ: function (e, t) {
                return this.array[e * this.itemSize + 2] = t, this
            }, getW: function (e) {
                return this.array[e * this.itemSize + 3]
            }, setW: function (e, t) {
                return this.array[e * this.itemSize + 3] = t, this
            }, setXY: function (e, t, r) {
                return e *= this.itemSize, this.array[e + 0] = t, this.array[e + 1] = r, this
            }, setXYZ: function (e, t, r, a) {
                return e *= this.itemSize, this.array[e + 0] = t, this.array[e + 1] = r, this.array[e + 2] = a, this
            }, setXYZW: function (e, t, r, a, i) {
                return e *= this.itemSize, this.array[e + 0] = t, this.array[e + 1] = r, this.array[e + 2] = a, this.array[e + 3] = i, this
            }, onUpload: function (e) {
                return this.onUploadCallback = e, this
            }, clone: function () {
                return new this.constructor(this.array, this.itemSize).copy(this)
            }
        }), i.prototype = Object.create(a.prototype), i.prototype.constructor = i, n.prototype = Object.create(a.prototype), n.prototype.constructor = n, o.prototype = Object.create(a.prototype), o.prototype.constructor = o, s.prototype = Object.create(a.prototype), s.prototype.constructor = s, l.prototype = Object.create(a.prototype), l.prototype.constructor = l, d.prototype = Object.create(a.prototype), d.prototype.constructor = d, c.prototype = Object.create(a.prototype), c.prototype.constructor = c, p.prototype = Object.create(a.prototype), p.prototype.constructor = p, u.prototype = Object.create(a.prototype), u.prototype.constructor = u
    }, p1p1: function (e, t, r) {
        "use strict";

        function a(e, t, r, i) {
            this._x = e || 0, this._y = t || 0, this._z = r || 0, this._order = i || a.DefaultOrder
        }

        function i() {
            this.mask = 1
        }

        function n() {
            Object.defineProperty(this, "id", {value: f++}), this.uuid = u.a.generateUUID(), this.name = "", this.type = "Object3D", this.parent = null, this.children = [], this.up = n.DefaultUp.clone();
            var e = new d.a, t = new a, r = new l.a, o = new d.a(1, 1, 1);
            t.onChange(function () {
                r.setFromEuler(t, !1)
            }), r.onChange(function () {
                t.setFromQuaternion(r, void 0, !1)
            }), Object.defineProperties(this, {
                position: {configurable: !0, enumerable: !0, value: e},
                rotation: {configurable: !0, enumerable: !0, value: t},
                quaternion: {configurable: !0, enumerable: !0, value: r},
                scale: {configurable: !0, enumerable: !0, value: o},
                modelViewMatrix: {value: new c.a},
                normalMatrix: {value: new m.a}
            }), this.matrix = new c.a, this.matrixWorld = new c.a, this.matrixAutoUpdate = n.DefaultMatrixAutoUpdate, this.matrixWorldNeedsUpdate = !1, this.layers = new i, this.visible = !0, this.castShadow = !1, this.receiveShadow = !1, this.frustumCulled = !0, this.renderOrder = 0, this.userData = {}
        }

        var o = Math.atan2, s = Math.abs, l = r("breI"), d = r("w+kJ"), c = r("3+m9"), p = r("w4Ua"), u = r("MnML");
        a.RotationOrders = ["XYZ", "YZX", "ZXY", "XZY", "YXZ", "ZYX"], a.DefaultOrder = "XYZ", Object.defineProperties(a.prototype, {
            x: {
                get: function () {
                    return this._x
                }, set: function (e) {
                    this._x = e, this.onChangeCallback()
                }
            }, y: {
                get: function () {
                    return this._y
                }, set: function (e) {
                    this._y = e, this.onChangeCallback()
                }
            }, z: {
                get: function () {
                    return this._z
                }, set: function (e) {
                    this._z = e, this.onChangeCallback()
                }
            }, order: {
                get: function () {
                    return this._order
                }, set: function (e) {
                    this._order = e, this.onChangeCallback()
                }
            }
        }), Object.assign(a.prototype, {
            isEuler: !0, set: function (e, t, r, a) {
                return this._x = e, this._y = t, this._z = r, this._order = a || this._order, this.onChangeCallback(), this
            }, clone: function () {
                return new this.constructor(this._x, this._y, this._z, this._order)
            }, copy: function (e) {
                return this._x = e._x, this._y = e._y, this._z = e._z, this._order = e._order, this.onChangeCallback(), this
            }, setFromRotationMatrix: function (e, t, r) {
                var a = Math.asin, i = u.a.clamp, n = e.elements, l = n[0], d = n[4], c = n[8], p = n[1], m = n[5],
                    g = n[9], f = n[2], h = n[6], v = n[10];
                return t = t || this._order, "XYZ" === t ? (this._y = a(i(c, -1, 1)), .99999 > s(c) ? (this._x = o(-g, v), this._z = o(-d, l)) : (this._x = o(h, m), this._z = 0)) : "YXZ" === t ? (this._x = a(-i(g, -1, 1)), .99999 > s(g) ? (this._y = o(c, v), this._z = o(p, m)) : (this._y = o(-f, l), this._z = 0)) : "ZXY" === t ? (this._x = a(i(h, -1, 1)), .99999 > s(h) ? (this._y = o(-f, v), this._z = o(-d, m)) : (this._y = 0, this._z = o(p, l))) : "ZYX" === t ? (this._y = a(-i(f, -1, 1)), .99999 > s(f) ? (this._x = o(h, v), this._z = o(p, l)) : (this._x = 0, this._z = o(-d, m))) : "YZX" === t ? (this._z = a(i(p, -1, 1)), .99999 > s(p) ? (this._x = o(-g, m), this._y = o(-f, l)) : (this._x = 0, this._y = o(c, v))) : "XZY" === t ? (this._z = a(-i(d, -1, 1)), .99999 > s(d) ? (this._x = o(h, m), this._y = o(c, l)) : (this._x = o(-g, v), this._y = 0)) : console.warn("THREE.Euler: .setFromRotationMatrix() given unsupported order: " + t), this._order = t, !1 !== r && this.onChangeCallback(), this
            }, setFromQuaternion: function () {
                var e = new c.a;
                return function (t, r, a) {
                    return e.makeRotationFromQuaternion(t), this.setFromRotationMatrix(e, r, a)
                }
            }(), setFromVector3: function (e, t) {
                return this.set(e.x, e.y, e.z, t || this._order)
            }, reorder: function () {
                var e = new l.a;
                return function (t) {
                    return e.setFromEuler(this), this.setFromQuaternion(e, t)
                }
            }(), equals: function (e) {
                return e._x === this._x && e._y === this._y && e._z === this._z && e._order === this._order
            }, fromArray: function (e) {
                return this._x = e[0], this._y = e[1], this._z = e[2], void 0 !== e[3] && (this._order = e[3]), this.onChangeCallback(), this
            }, toArray: function (e, t) {
                return void 0 === e && (e = []), void 0 === t && (t = 0), e[t] = this._x, e[t + 1] = this._y, e[t + 2] = this._z, e[t + 3] = this._order, e
            }, toVector3: function (e) {
                return e ? e.set(this._x, this._y, this._z) : new d.a(this._x, this._y, this._z)
            }, onChange: function (e) {
                return this.onChangeCallback = e, this
            }, onChangeCallback: function () {
            }
        }), Object.assign(i.prototype, {
            set: function (e) {
                this.mask = 0 | 1 << e
            }, enable: function (e) {
                this.mask |= 0 | 1 << e
            }, toggle: function (e) {
                this.mask ^= 0 | 1 << e
            }, disable: function (e) {
                this.mask &= ~(0 | 1 << e)
            }, test: function (e) {
                return 0 != (this.mask & e.mask)
            }
        });
        var m = r("eu9D"), g = r("6deg");
        r.d(t, "a", function () {
            return n
        });
        var f = 0;
        n.DefaultUp = new d.a(0, 1, 0), n.DefaultMatrixAutoUpdate = !0, n.prototype = Object.assign(Object.create(p.a.prototype), {
            constructor: n, isObject3D: !0, onBeforeRender: function () {
            }, onAfterRender: function () {
            }, applyMatrix: function (e) {
                this.matrix.multiplyMatrices(e, this.matrix), this.matrix.decompose(this.position, this.quaternion, this.scale)
            }, applyQuaternion: function (e) {
                return this.quaternion.premultiply(e), this
            }, setRotationFromAxisAngle: function (e, t) {
                this.quaternion.setFromAxisAngle(e, t)
            }, setRotationFromEuler: function (e) {
                this.quaternion.setFromEuler(e, !0)
            }, setRotationFromMatrix: function (e) {
                this.quaternion.setFromRotationMatrix(e)
            }, setRotationFromQuaternion: function (e) {
                this.quaternion.copy(e)
            }, rotateOnAxis: function () {
                var e = new l.a;
                return function (t, r) {
                    return e.setFromAxisAngle(t, r), this.quaternion.multiply(e), this
                }
            }(), rotateOnWorldAxis: function () {
                var e = new l.a;
                return function (t, r) {
                    return e.setFromAxisAngle(t, r), this.quaternion.premultiply(e), this
                }
            }(), rotateX: function () {
                var e = new d.a(1, 0, 0);
                return function (t) {
                    return this.rotateOnAxis(e, t)
                }
            }(), rotateY: function () {
                var e = new d.a(0, 1, 0);
                return function (t) {
                    return this.rotateOnAxis(e, t)
                }
            }(), rotateZ: function () {
                var e = new d.a(0, 0, 1);
                return function (t) {
                    return this.rotateOnAxis(e, t)
                }
            }(), translateOnAxis: function () {
                var e = new d.a;
                return function (t, r) {
                    return e.copy(t).applyQuaternion(this.quaternion), this.position.add(e.multiplyScalar(r)), this
                }
            }(), translateX: function () {
                var e = new d.a(1, 0, 0);
                return function (t) {
                    return this.translateOnAxis(e, t)
                }
            }(), translateY: function () {
                var e = new d.a(0, 1, 0);
                return function (t) {
                    return this.translateOnAxis(e, t)
                }
            }(), translateZ: function () {
                var e = new d.a(0, 0, 1);
                return function (t) {
                    return this.translateOnAxis(e, t)
                }
            }(), localToWorld: function (e) {
                return e.applyMatrix4(this.matrixWorld)
            }, worldToLocal: function () {
                var e = new c.a;
                return function (t) {
                    return t.applyMatrix4(e.getInverse(this.matrixWorld))
                }
            }(), lookAt: function () {
                var e = new l.a, t = new c.a, r = new d.a, a = new d.a;
                return function (i, n, o) {
                    i.isVector3 ? r.copy(i) : r.set(i, n, o);
                    var s = this.parent;
                    this.updateWorldMatrix(!0, !1), a.setFromMatrixPosition(this.matrixWorld), this.isCamera || this.isLight ? t.lookAt(a, r, this.up) : t.lookAt(r, a, this.up), this.quaternion.setFromRotationMatrix(t), s && (t.extractRotation(s.matrixWorld), e.setFromRotationMatrix(t), this.quaternion.premultiply(e.inverse()))
                }
            }(), add: function (e) {
                if (1 < arguments.length) {
                    for (var t = 0; t < arguments.length; t++) this.add(arguments[t]);
                    return this
                }
                return e === this ? (console.error("THREE.Object3D.add: object can't be added as a child of itself.", e), this) : (e && e.isObject3D ? (null !== e.parent && e.parent.remove(e), e.parent = this, e.dispatchEvent({type: "added"}), this.children.push(e)) : console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.", e), this)
            }, remove: function (e) {
                if (1 < arguments.length) {
                    for (var t = 0; t < arguments.length; t++) this.remove(arguments[t]);
                    return this
                }
                var r = this.children.indexOf(e);
                return -1 !== r && (e.parent = null, e.dispatchEvent({type: "removed"}), this.children.splice(r, 1)), this
            }, getObjectById: function (e) {
                return this.getObjectByProperty("id", e)
            }, getObjectByName: function (e) {
                return this.getObjectByProperty("name", e)
            }, getObjectByProperty: function (e, t) {
                if (this[e] === t) return this;
                for (var r = 0, a = this.children.length; r < a; r++) {
                    var i = this.children[r], n = i.getObjectByProperty(e, t);
                    if (void 0 !== n) return n
                }
            }, getWorldPosition: function (e) {
                return void 0 === e && (console.warn("THREE.Object3D: .getWorldPosition() target is now required"), e = new d.a), this.updateMatrixWorld(!0), e.setFromMatrixPosition(this.matrixWorld)
            }, getWorldQuaternion: function () {
                var e = new d.a, t = new d.a;
                return function (r) {
                    return void 0 === r && (console.warn("THREE.Object3D: .getWorldQuaternion() target is now required"), r = new l.a), this.updateMatrixWorld(!0), this.matrixWorld.decompose(e, r, t), r
                }
            }(), getWorldScale: function () {
                var e = new d.a, t = new l.a;
                return function (r) {
                    return void 0 === r && (console.warn("THREE.Object3D: .getWorldScale() target is now required"), r = new d.a), this.updateMatrixWorld(!0), this.matrixWorld.decompose(e, t, r), r
                }
            }(), getWorldDirection: function (t) {
                void 0 === t && (console.warn("THREE.Object3D: .getWorldDirection() target is now required"), t = new d.a), this.updateMatrixWorld(!0);
                var r = this.matrixWorld.elements;
                return t.set(r[8], r[9], r[10]).normalize()
            }, raycast: function () {
            }, traverse: function (e) {
                e(this);
                for (var t = this.children, r = 0, a = t.length; r < a; r++) t[r].traverse(e)
            }, traverseVisible: function (e) {
                if (!1 !== this.visible) {
                    e(this);
                    for (var t = this.children, r = 0, a = t.length; r < a; r++) t[r].traverseVisible(e)
                }
            }, traverseAncestors: function (e) {
                var t = this.parent;
                null !== t && (e(t), t.traverseAncestors(e))
            }, updateMatrix: function () {
                this.matrix.compose(this.position, this.quaternion, this.scale), this.matrixWorldNeedsUpdate = !0
            }, updateMatrixWorld: function (e) {
                this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || e) && (null === this.parent ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix), this.matrixWorldNeedsUpdate = !1, e = !0);
                for (var t = this.children, r = 0, a = t.length; r < a; r++) t[r].updateMatrixWorld(e)
            }, updateWorldMatrix: function (e, t) {
                var r = this.parent;
                if (!0 === e && null !== r && r.updateWorldMatrix(!0, !1), this.matrixAutoUpdate && this.updateMatrix(), null === this.parent ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix), !0 === t) for (var a = this.children, n = 0, i = a.length; n < i; n++) a[n].updateWorldMatrix(!1, !0)
            }, toJSON: function (e) {
                function t(t, r) {
                    return void 0 === t[r.uuid] && (t[r.uuid] = r.toJSON(e)), r.uuid
                }

                function r(e) {
                    var t = [];
                    for (var r in e) {
                        var a = e[r];
                        delete a.metadata, t.push(a)
                    }
                    return t
                }

                var a = void 0 === e || "string" == typeof e, n = {};
                a && (e = {
                    geometries: {},
                    materials: {},
                    textures: {},
                    images: {},
                    shapes: {}
                }, n.metadata = {version: 4.5, type: "Object", generator: "Object3D.toJSON"});
                var o = {};
                if (o.uuid = this.uuid, o.type = this.type, "" !== this.name && (o.name = this.name), !0 === this.castShadow && (o.castShadow = !0), !0 === this.receiveShadow && (o.receiveShadow = !0), !1 === this.visible && (o.visible = !1), !1 === this.frustumCulled && (o.frustumCulled = !1), 0 !== this.renderOrder && (o.renderOrder = this.renderOrder), "{}" !== JSON.stringify(this.userData) && (o.userData = this.userData), o.layers = this.layers.mask, o.matrix = this.matrix.toArray(), !1 === this.matrixAutoUpdate && (o.matrixAutoUpdate = !1), this.isMesh && this.drawMode !== g.hc && (o.drawMode = this.drawMode), this.isMesh || this.isLine || this.isPoints) {
                    o.geometry = t(e.geometries, this.geometry);
                    var s = this.geometry.parameters;
                    if (void 0 !== s && void 0 !== s.shapes) {
                        var d = s.shapes;
                        if (Array.isArray(d)) for (var c = 0, i = d.length, l; c < i; c++) l = d[c], t(e.shapes, l); else t(e.shapes, d)
                    }
                }
                if (void 0 !== this.material) if (Array.isArray(this.material)) {
                    for (var p = [], c = 0, i = this.material.length; c < i; c++) p.push(t(e.materials, this.material[c]));
                    o.material = p
                } else o.material = t(e.materials, this.material);
                if (0 < this.children.length) {
                    o.children = [];
                    for (var c = 0; c < this.children.length; c++) o.children.push(this.children[c].toJSON(e).object)
                }
                if (a) {
                    var u = r(e.geometries), m = r(e.materials), f = r(e.textures), h = r(e.images), d = r(e.shapes);
                    0 < u.length && (n.geometries = u), 0 < m.length && (n.materials = m), 0 < f.length && (n.textures = f), 0 < h.length && (n.images = h), 0 < d.length && (n.shapes = d)
                }
                return n.object = o, n
            }, clone: function (e) {
                return new this.constructor().copy(this, e)
            }, copy: function (e, t) {
                if (void 0 === t && (t = !0), this.name = e.name, this.up.copy(e.up), this.position.copy(e.position), this.quaternion.copy(e.quaternion), this.scale.copy(e.scale), this.matrix.copy(e.matrix), this.matrixWorld.copy(e.matrixWorld), this.matrixAutoUpdate = e.matrixAutoUpdate, this.matrixWorldNeedsUpdate = e.matrixWorldNeedsUpdate, this.layers.mask = e.layers.mask, this.visible = e.visible, this.castShadow = e.castShadow, this.receiveShadow = e.receiveShadow, this.frustumCulled = e.frustumCulled, this.renderOrder = e.renderOrder, this.userData = JSON.parse(JSON.stringify(e.userData)), !0 === t) for (var r = 0, a; r < e.children.length; r++) a = e.children[r], this.add(a.clone());
                return this
            }
        })
    }, qdxW: function (e, t, r) {
        "use strict";

        function a() {
            i.a.call(this), this.type = "Group"
        }

        r.d(t, "a", function () {
            return a
        });
        var i = r("p1p1");
        a.prototype = Object.assign(Object.create(i.a.prototype), {constructor: a, isGroup: !0})
    }, "w+kJ": function (e, t, r) {
        "use strict";

        function a(e, t, r) {
            this.x = e || 0, this.y = t || 0, this.z = r || 0
        }

        var i = Math.round, n = Math.ceil, o = Math.floor, s = Math.sqrt, l = Math.sin, d = Math.cos, c = Math.abs,
            p = Math.max, u = Math.min;
        r.d(t, "a", function () {
            return a
        });
        var m = r("MnML"), g = r("3+m9"), f = r("breI");
        Object.assign(a.prototype, {
            isVector3: !0, set: function (e, t, r) {
                return this.x = e, this.y = t, this.z = r, this
            }, setScalar: function (e) {
                return this.x = e, this.y = e, this.z = e, this
            }, setX: function (e) {
                return this.x = e, this
            }, setY: function (e) {
                return this.y = e, this
            }, setZ: function (e) {
                return this.z = e, this
            }, setComponent: function (e, t) {
                switch (e) {
                    case 0:
                        this.x = t;
                        break;
                    case 1:
                        this.y = t;
                        break;
                    case 2:
                        this.z = t;
                        break;
                    default:
                        throw new Error("index is out of range: " + e);
                }
                return this
            }, getComponent: function (e) {
                switch (e) {
                    case 0:
                        return this.x;
                    case 1:
                        return this.y;
                    case 2:
                        return this.z;
                    default:
                        throw new Error("index is out of range: " + e);
                }
            }, clone: function () {
                return new this.constructor(this.x, this.y, this.z)
            }, copy: function (e) {
                return this.x = e.x, this.y = e.y, this.z = e.z, this
            }, add: function (e, t) {
                return void 0 === t ? (this.x += e.x, this.y += e.y, this.z += e.z, this) : (console.warn("THREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead."), this.addVectors(e, t))
            }, addScalar: function (e) {
                return this.x += e, this.y += e, this.z += e, this
            }, addVectors: function (e, t) {
                return this.x = e.x + t.x, this.y = e.y + t.y, this.z = e.z + t.z, this
            }, addScaledVector: function (e, t) {
                return this.x += e.x * t, this.y += e.y * t, this.z += e.z * t, this
            }, sub: function (e, t) {
                return void 0 === t ? (this.x -= e.x, this.y -= e.y, this.z -= e.z, this) : (console.warn("THREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."), this.subVectors(e, t))
            }, subScalar: function (e) {
                return this.x -= e, this.y -= e, this.z -= e, this
            }, subVectors: function (e, t) {
                return this.x = e.x - t.x, this.y = e.y - t.y, this.z = e.z - t.z, this
            }, multiply: function (e, t) {
                return void 0 === t ? (this.x *= e.x, this.y *= e.y, this.z *= e.z, this) : (console.warn("THREE.Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead."), this.multiplyVectors(e, t))
            }, multiplyScalar: function (e) {
                return this.x *= e, this.y *= e, this.z *= e, this
            }, multiplyVectors: function (e, t) {
                return this.x = e.x * t.x, this.y = e.y * t.y, this.z = e.z * t.z, this
            }, applyEuler: function () {
                var e = new f.a;
                return function (t) {
                    return t && t.isEuler || console.error("THREE.Vector3: .applyEuler() now expects an Euler rotation rather than a Vector3 and order."), this.applyQuaternion(e.setFromEuler(t))
                }
            }(), applyAxisAngle: function () {
                var e = new f.a;
                return function (t, r) {
                    return this.applyQuaternion(e.setFromAxisAngle(t, r))
                }
            }(), applyMatrix3: function (t) {
                var r = this.x, a = this.y, i = this.z, n = t.elements;
                return this.x = n[0] * r + n[3] * a + n[6] * i, this.y = n[1] * r + n[4] * a + n[7] * i, this.z = n[2] * r + n[5] * a + n[8] * i, this
            }, applyMatrix4: function (t) {
                var r = this.x, a = this.y, i = this.z, n = t.elements,
                    e = 1 / (n[3] * r + n[7] * a + n[11] * i + n[15]);
                return this.x = (n[0] * r + n[4] * a + n[8] * i + n[12]) * e, this.y = (n[1] * r + n[5] * a + n[9] * i + n[13]) * e, this.z = (n[2] * r + n[6] * a + n[10] * i + n[14]) * e, this
            }, applyQuaternion: function (e) {
                var t = this.x, r = this.y, a = this.z, i = e.x, n = e.y, o = e.z, s = e.w, l = s * t + n * a - o * r,
                    d = s * r + o * t - i * a, c = s * a + i * r - n * t, p = -i * t - n * r - o * a;
                return this.x = l * s + p * -i + d * -o - c * -n, this.y = d * s + p * -n + c * -i - l * -o, this.z = c * s + p * -o + l * -n - d * -i, this
            }, project: function (e) {
                return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)
            }, unproject: function () {
                var e = new g.a;
                return function (t) {
                    return this.applyMatrix4(e.getInverse(t.projectionMatrix)).applyMatrix4(t.matrixWorld)
                }
            }(), transformDirection: function (t) {
                var r = this.x, a = this.y, i = this.z, n = t.elements;
                return this.x = n[0] * r + n[4] * a + n[8] * i, this.y = n[1] * r + n[5] * a + n[9] * i, this.z = n[2] * r + n[6] * a + n[10] * i, this.normalize()
            }, divide: function (e) {
                return this.x /= e.x, this.y /= e.y, this.z /= e.z, this
            }, divideScalar: function (e) {
                return this.multiplyScalar(1 / e)
            }, min: function (e) {
                return this.x = u(this.x, e.x), this.y = u(this.y, e.y), this.z = u(this.z, e.z), this
            }, max: function (e) {
                return this.x = p(this.x, e.x), this.y = p(this.y, e.y), this.z = p(this.z, e.z), this
            }, clamp: function (e, t) {
                return this.x = p(e.x, u(t.x, this.x)), this.y = p(e.y, u(t.y, this.y)), this.z = p(e.z, u(t.z, this.z)), this
            }, clampScalar: function () {
                var e = new a, t = new a;
                return function (r, a) {
                    return e.set(r, r, r), t.set(a, a, a), this.clamp(e, t)
                }
            }(), clampLength: function (e, t) {
                var r = this.length();
                return this.divideScalar(r || 1).multiplyScalar(p(e, u(t, r)))
            }, floor: function () {
                return this.x = o(this.x), this.y = o(this.y), this.z = o(this.z), this
            }, ceil: function () {
                return this.x = n(this.x), this.y = n(this.y), this.z = n(this.z), this
            }, round: function () {
                return this.x = i(this.x), this.y = i(this.y), this.z = i(this.z), this
            }, roundToZero: function () {
                return this.x = 0 > this.x ? n(this.x) : o(this.x), this.y = 0 > this.y ? n(this.y) : o(this.y), this.z = 0 > this.z ? n(this.z) : o(this.z), this
            }, negate: function () {
                return this.x = -this.x, this.y = -this.y, this.z = -this.z, this
            }, dot: function (e) {
                return this.x * e.x + this.y * e.y + this.z * e.z
            }, lengthSq: function () {
                return this.x * this.x + this.y * this.y + this.z * this.z
            }, length: function () {
                return s(this.x * this.x + this.y * this.y + this.z * this.z)
            }, manhattanLength: function () {
                return c(this.x) + c(this.y) + c(this.z)
            }, normalize: function () {
                return this.divideScalar(this.length() || 1)
            }, setLength: function (e) {
                return this.normalize().multiplyScalar(e)
            }, lerp: function (e, t) {
                return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this.z += (e.z - this.z) * t, this
            }, lerpVectors: function (e, t, r) {
                return this.subVectors(t, e).multiplyScalar(r).add(e)
            }, cross: function (e, t) {
                return void 0 === t ? this.crossVectors(this, e) : (console.warn("THREE.Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead."), this.crossVectors(e, t))
            }, crossVectors: function (e, t) {
                var r = e.x, a = e.y, i = e.z, n = t.x, o = t.y, s = t.z;
                return this.x = a * s - i * o, this.y = i * n - r * s, this.z = r * o - a * n, this
            }, projectOnVector: function (e) {
                var t = e.dot(this) / e.lengthSq();
                return this.copy(e).multiplyScalar(t)
            }, projectOnPlane: function () {
                var e = new a;
                return function (t) {
                    return e.copy(this).projectOnVector(t), this.sub(e)
                }
            }(), reflect: function () {
                var e = new a;
                return function (t) {
                    return this.sub(e.copy(t).multiplyScalar(2 * this.dot(t)))
                }
            }(), angleTo: function (e) {
                var t = this.dot(e) / s(this.lengthSq() * e.lengthSq());
                return Math.acos(m.a.clamp(t, -1, 1))
            }, distanceTo: function (e) {
                return s(this.distanceToSquared(e))
            }, distanceToSquared: function (e) {
                var t = this.x - e.x, r = this.y - e.y, a = this.z - e.z;
                return t * t + r * r + a * a
            }, manhattanDistanceTo: function (e) {
                return c(this.x - e.x) + c(this.y - e.y) + c(this.z - e.z)
            }, setFromSpherical: function (e) {
                return this.setFromSphericalCoords(e.radius, e.phi, e.theta)
            }, setFromSphericalCoords: function (e, t, r) {
                var a = l(t) * e;
                return this.x = a * l(r), this.y = d(t) * e, this.z = a * d(r), this
            }, setFromCylindrical: function (e) {
                return this.setFromCylindricalCoords(e.radius, e.theta, e.y)
            }, setFromCylindricalCoords: function (e, t, r) {
                return this.x = e * l(t), this.y = r, this.z = e * d(t), this
            }, setFromMatrixPosition: function (t) {
                var r = t.elements;
                return this.x = r[12], this.y = r[13], this.z = r[14], this
            }, setFromMatrixScale: function (e) {
                var t = this.setFromMatrixColumn(e, 0).length(), r = this.setFromMatrixColumn(e, 1).length(),
                    a = this.setFromMatrixColumn(e, 2).length();
                return this.x = t, this.y = r, this.z = a, this
            }, setFromMatrixColumn: function (e, t) {
                return this.fromArray(e.elements, 4 * t)
            }, equals: function (e) {
                return e.x === this.x && e.y === this.y && e.z === this.z
            }, fromArray: function (e, t) {
                return void 0 === t && (t = 0), this.x = e[t], this.y = e[t + 1], this.z = e[t + 2], this
            }, toArray: function (e, t) {
                return void 0 === e && (e = []), void 0 === t && (t = 0), e[t] = this.x, e[t + 1] = this.y, e[t + 2] = this.z, e
            }, fromBufferAttribute: function (e, t, r) {
                return void 0 !== r && console.warn("THREE.Vector3: offset has been removed from .fromBufferAttribute()."), this.x = e.getX(t), this.y = e.getY(t), this.z = e.getZ(t), this
            }
        })
    }, w4Ua: function (e, t, r) {
        "use strict";

        function a() {
        }

        r.d(t, "a", function () {
            return a
        }), Object.assign(a.prototype, {
            addEventListener: function (e, t) {
                void 0 === this._listeners && (this._listeners = {});
                var r = this._listeners;
                void 0 === r[e] && (r[e] = []), -1 === r[e].indexOf(t) && r[e].push(t)
            }, hasEventListener: function (e, t) {
                if (void 0 === this._listeners) return !1;
                var r = this._listeners;
                return void 0 !== r[e] && -1 !== r[e].indexOf(t)
            }, removeEventListener: function (e, t) {
                if (void 0 !== this._listeners) {
                    var r = this._listeners, a = r[e];
                    if (void 0 !== a) {
                        var i = a.indexOf(t);
                        -1 !== i && a.splice(i, 1)
                    }
                }
            }, dispatchEvent: function (e) {
                if (void 0 !== this._listeners) {
                    var t = this._listeners, r = t[e.type];
                    if (void 0 !== r) {
                        e.target = this;
                        for (var a = r.slice(0), n = 0, i = a.length; n < i; n++) a[n].call(this, e)
                    }
                }
            }
        })
    }, xC2a: function (e, t, r) {
        "use strict";

        function a(e) {
            this.manager = void 0 === e ? s.a : e
        }

        function i(e) {
            this.manager = void 0 === e ? s.a : e
        }

        var n = r("6deg"), o = r("hwoJ"), s = r("2N3e");
        Object.assign(a.prototype, {
            crossOrigin: "anonymous", load: function (e, t, r, a) {
                function i() {
                    d.removeEventListener("load", i, !1), d.removeEventListener("error", n, !1), o.a.add(e, this), t && t(this), s.manager.itemEnd(e)
                }

                function n(t) {
                    d.removeEventListener("load", i, !1), d.removeEventListener("error", n, !1), a && a(t), s.manager.itemError(e), s.manager.itemEnd(e)
                }

                void 0 === e && (e = ""), void 0 !== this.path && (e = this.path + e), e = this.manager.resolveURL(e);
                var s = this, l = o.a.get(e);
                if (void 0 !== l) return s.manager.itemStart(e), setTimeout(function () {
                    t && t(l), s.manager.itemEnd(e)
                }, 0), l;
                var d = document.createElementNS("http://www.w3.org/1999/xhtml", "img");
                return d.addEventListener("load", i, !1), d.addEventListener("error", n, !1), "data:" !== e.substr(0, 5) && void 0 !== this.crossOrigin && (d.crossOrigin = this.crossOrigin), s.manager.itemStart(e), d.src = e, d
            }, setCrossOrigin: function (e) {
                return this.crossOrigin = e, this
            }, setPath: function (e) {
                return this.path = e, this
            }
        });
        var l = r("xvF/");
        r.d(t, "a", function () {
            return i
        }), Object.assign(i.prototype, {
            crossOrigin: "anonymous", load: function (e, t, r, i) {
                var o = new l.a, s = new a(this.manager);
                return s.setCrossOrigin(this.crossOrigin), s.setPath(this.path), s.load(e, function (r) {
                    o.image = r;
                    var a = 0 < e.search(/\.jpe?g($|\?)/i) || 0 === e.search(/^data\:image\/jpeg/);
                    o.format = a ? n.Nb : n.rb, o.needsUpdate = !0, void 0 !== t && t(o)
                }, r, i), o
            }, setCrossOrigin: function (e) {
                return this.crossOrigin = e, this
            }, setPath: function (e) {
                return this.path = e, this
            }
        })
    }, "xvF/": function (e, t, r) {
        "use strict";

        function a(e, t, r, i, n, o, s, u, m, f) {
            Object.defineProperty(this, "id", {value: g++}), this.uuid = d.a.generateUUID(), this.name = "", this.image = void 0 === e ? a.DEFAULT_IMAGE : e, this.mipmaps = [], this.mapping = void 0 === t ? a.DEFAULT_MAPPING : t, this.wrapS = void 0 === r ? l.k : r, this.wrapT = void 0 === i ? l.k : i, this.magFilter = void 0 === n ? l.M : n, this.minFilter = void 0 === o ? l.N : o, this.anisotropy = void 0 === m ? 1 : m, this.format = void 0 === s ? l.rb : s, this.type = void 0 === u ? l.kc : u, this.offset = new c.a(0, 0), this.repeat = new c.a(1, 1), this.center = new c.a(0, 0), this.rotation = 0, this.matrixAutoUpdate = !0, this.matrix = new p.a, this.generateMipmaps = !0, this.premultiplyAlpha = !1, this.flipY = !0, this.unpackAlignment = 4, this.encoding = void 0 === f ? l.L : f, this.version = 0, this.onUpdate = null
        }

        var i = Math.ceil, n = Math.floor, o = Math.abs, s = r("w4Ua"), l = r("6deg"), d = r("MnML"), c = r("TnI4"),
            p = r("eu9D"), u = {
                getDataURL: function (e) {
                    var t;
                    if ("undefined" == typeof HTMLCanvasElement) return e.src;
                    if (e instanceof HTMLCanvasElement) t = e; else {
                        void 0 === m && (m = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas")), m.width = e.width, m.height = e.height;
                        var r = m.getContext("2d");
                        e instanceof ImageData ? r.putImageData(e, 0, 0) : r.drawImage(e, 0, 0, e.width, e.height), t = m
                    }
                    return 2048 < t.width || 2048 < t.height ? t.toDataURL("image/jpeg", .6) : t.toDataURL("image/png")
                }
            }, m;
        r.d(t, "a", function () {
            return a
        });
        var g = 0;
        a.DEFAULT_IMAGE = void 0, a.DEFAULT_MAPPING = l.ic, a.prototype = Object.assign(Object.create(s.a.prototype), {
            constructor: a, isTexture: !0, updateMatrix: function () {
                this.matrix.setUvTransform(this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y)
            }, clone: function () {
                return new this.constructor().copy(this)
            }, copy: function (e) {
                return this.name = e.name, this.image = e.image, this.mipmaps = e.mipmaps.slice(0), this.mapping = e.mapping, this.wrapS = e.wrapS, this.wrapT = e.wrapT, this.magFilter = e.magFilter, this.minFilter = e.minFilter, this.anisotropy = e.anisotropy, this.format = e.format, this.type = e.type, this.offset.copy(e.offset), this.repeat.copy(e.repeat), this.center.copy(e.center), this.rotation = e.rotation, this.matrixAutoUpdate = e.matrixAutoUpdate, this.matrix.copy(e.matrix), this.generateMipmaps = e.generateMipmaps, this.premultiplyAlpha = e.premultiplyAlpha, this.flipY = e.flipY, this.unpackAlignment = e.unpackAlignment, this.encoding = e.encoding, this
            }, toJSON: function (e) {
                var t = void 0 === e || "string" == typeof e;
                if (!t && void 0 !== e.textures[this.uuid]) return e.textures[this.uuid];
                var r = {
                    metadata: {version: 4.5, type: "Texture", generator: "Texture.toJSON"},
                    uuid: this.uuid,
                    name: this.name,
                    mapping: this.mapping,
                    repeat: [this.repeat.x, this.repeat.y],
                    offset: [this.offset.x, this.offset.y],
                    center: [this.center.x, this.center.y],
                    rotation: this.rotation,
                    wrap: [this.wrapS, this.wrapT],
                    format: this.format,
                    type: this.type,
                    encoding: this.encoding,
                    minFilter: this.minFilter,
                    magFilter: this.magFilter,
                    anisotropy: this.anisotropy,
                    flipY: this.flipY,
                    premultiplyAlpha: this.premultiplyAlpha,
                    unpackAlignment: this.unpackAlignment
                };
                if (void 0 !== this.image) {
                    var a = this.image;
                    if (void 0 === a.uuid && (a.uuid = d.a.generateUUID()), !t && void 0 === e.images[a.uuid]) {
                        var n;
                        if (Array.isArray(a)) {
                            n = [];
                            for (var o = 0, i = a.length; o < i; o++) n.push(u.getDataURL(a[o]))
                        } else n = u.getDataURL(a);
                        e.images[a.uuid] = {uuid: a.uuid, url: n}
                    }
                    r.image = a.uuid
                }
                return t || (e.textures[this.uuid] = r), r
            }, dispose: function () {
                this.dispatchEvent({type: "dispose"})
            }, transformUv: function (e) {
                if (this.mapping !== l.ic) return e;
                if (e.applyMatrix3(this.matrix), 0 > e.x || 1 < e.x) switch (this.wrapS) {
                    case l.Wb:
                        e.x -= n(e.x);
                        break;
                    case l.k:
                        e.x = 0 > e.x ? 0 : 1;
                        break;
                    case l.U:
                        1 === o(n(e.x) % 2) ? e.x = i(e.x) - e.x : e.x -= n(e.x);
                }
                if (0 > e.y || 1 < e.y) switch (this.wrapT) {
                    case l.Wb:
                        e.y -= n(e.y);
                        break;
                    case l.k:
                        e.y = 0 > e.y ? 0 : 1;
                        break;
                    case l.U:
                        1 === o(n(e.y) % 2) ? e.y = i(e.y) - e.y : e.y -= n(e.y);
                }
                return this.flipY && (e.y = 1 - e.y), e
            }
        }), Object.defineProperty(a.prototype, "needsUpdate", {
            set: function (e) {
                !0 === e && this.version++
            }
        })
    }, zfxg: function (e, t, r) {
        "use strict";

        function a() {
            this.vertices = [], this.normals = [], this.colors = [], this.uvs = [], this.uvs2 = [], this.groups = [], this.morphTargets = {}, this.skinWeights = [], this.skinIndices = [], this.boundingBox = null, this.boundingSphere = null, this.verticesNeedUpdate = !1, this.normalsNeedUpdate = !1, this.colorsNeedUpdate = !1, this.uvsNeedUpdate = !1, this.groupsNeedUpdate = !1
        }

        function n() {
            Object.defineProperty(this, "id", {value: h += 2}), this.uuid = g.a.generateUUID(), this.name = "", this.type = "BufferGeometry", this.index = null, this.attributes = {}, this.morphAttributes = {}, this.groups = [], this.boundingBox = null, this.boundingSphere = null, this.drawRange = {
                start: 0,
                count: Infinity
            }, this.userData = {}
        }

        var o = r("w+kJ"), i = r("/V9W"), s = r("w4Ua"), d = r("nKeq"), l = r("8IfN"), c = r("TnI4");
        Object.assign(a.prototype, {
            computeGroups: function (e) {
                for (var t = [], r = void 0, a = e.faces, n = 0, i, o; n < a.length; n++) o = a[n], o.materialIndex !== r && (r = o.materialIndex, void 0 != i && (i.count = 3 * n - i.start, t.push(i)), i = {
                    start: 3 * n,
                    materialIndex: r
                });
                void 0 !== i && (i.count = 3 * n - i.start, t.push(i)), this.groups = t
            }, fromGeometry: function (e) {
                var t = e.faces, r = e.vertices, a = e.faceVertexUvs, n = a[0] && 0 < a[0].length,
                    o = a[1] && 0 < a[1].length, s = e.morphTargets, l = s.length, d;
                if (0 < l) {
                    d = [];
                    for (var p = 0; p < l; p++) d[p] = {name: s[p].name, data: []};
                    this.morphTargets.position = d
                }
                var i = e.morphNormals, u = i.length, m;
                if (0 < u) {
                    m = [];
                    for (var p = 0; p < u; p++) m[p] = {name: i[p].name, data: []};
                    this.morphTargets.normal = m
                }
                var g = e.skinIndices, f = e.skinWeights, h = g.length === r.length, v = f.length === r.length;
                0 < r.length && 0 === t.length && console.error("THREE.DirectGeometry: Faceless geometries are not supported.");
                for (var p = 0, x; p < t.length; p++) {
                    x = t[p], this.vertices.push(r[x.a], r[x.b], r[x.c]);
                    var y = x.vertexNormals;
                    if (3 === y.length) this.normals.push(y[0], y[1], y[2]); else {
                        var _ = x.normal;
                        this.normals.push(_, _, _)
                    }
                    var b = x.vertexColors;
                    if (3 === b.length) this.colors.push(b[0], b[1], b[2]); else {
                        var M = x.color;
                        this.colors.push(M, M, M)
                    }
                    if (!0 === n) {
                        var S = a[0][p];
                        void 0 === S ? (console.warn("THREE.DirectGeometry.fromGeometry(): Undefined vertexUv ", p), this.uvs.push(new c.a, new c.a, new c.a)) : this.uvs.push(S[0], S[1], S[2])
                    }
                    if (!0 === o) {
                        var S = a[1][p];
                        void 0 === S ? (console.warn("THREE.DirectGeometry.fromGeometry(): Undefined vertexUv2 ", p), this.uvs2.push(new c.a, new c.a, new c.a)) : this.uvs2.push(S[0], S[1], S[2])
                    }
                    for (var L = 0, E; L < l; L++) E = s[L].vertices, d[L].data.push(E[x.a], E[x.b], E[x.c]);
                    for (var L = 0, T; L < u; L++) T = i[L].vertexNormals[p], m[L].data.push(T.a, T.b, T.c);
                    h && this.skinIndices.push(g[x.a], g[x.b], g[x.c]), v && this.skinWeights.push(f[x.a], f[x.b], f[x.c])
                }
                return this.computeGroups(e), this.verticesNeedUpdate = e.verticesNeedUpdate, this.normalsNeedUpdate = e.normalsNeedUpdate, this.colorsNeedUpdate = e.colorsNeedUpdate, this.uvsNeedUpdate = e.uvsNeedUpdate, this.groupsNeedUpdate = e.groupsNeedUpdate, this
            }
        });
        var p = r("p1p1"), u = r("3+m9"), m = r("eu9D"), g = r("MnML"), f = r("Qeq/");
        r.d(t, "a", function () {
            return n
        });
        var h = 1;
        n.prototype = Object.assign(Object.create(s.a.prototype), {
            constructor: n, isBufferGeometry: !0, getIndex: function () {
                return this.index
            }, setIndex: function (e) {
                this.index = Array.isArray(e) ? new (65535 < Object(f.a)(e) ? d.d : d.c)(e, 1) : e
            }, addAttribute: function (e, t) {
                return t && t.isBufferAttribute || t && t.isInterleavedBufferAttribute ? "index" === e ? (console.warn("THREE.BufferGeometry.addAttribute: Use .setIndex() for index attribute."), this.setIndex(t), this) : (this.attributes[e] = t, this) : (console.warn("THREE.BufferGeometry: .addAttribute() now expects ( name, attribute )."), this.addAttribute(e, new d.a(arguments[1], arguments[2])))
            }, getAttribute: function (e) {
                return this.attributes[e]
            }, removeAttribute: function (e) {
                return delete this.attributes[e], this
            }, addGroup: function (e, t, r) {
                this.groups.push({start: e, count: t, materialIndex: void 0 === r ? 0 : r})
            }, clearGroups: function () {
                this.groups = []
            }, setDrawRange: function (e, t) {
                this.drawRange.start = e, this.drawRange.count = t
            }, applyMatrix: function (e) {
                var t = this.attributes.position;
                void 0 !== t && (e.applyToBufferAttribute(t), t.needsUpdate = !0);
                var r = this.attributes.normal;
                if (void 0 !== r) {
                    var a = new m.a().getNormalMatrix(e);
                    a.applyToBufferAttribute(r), r.needsUpdate = !0
                }
                return null !== this.boundingBox && this.computeBoundingBox(), null !== this.boundingSphere && this.computeBoundingSphere(), this
            }, rotateX: function () {
                var e = new u.a;
                return function (t) {
                    return e.makeRotationX(t), this.applyMatrix(e), this
                }
            }(), rotateY: function () {
                var e = new u.a;
                return function (t) {
                    return e.makeRotationY(t), this.applyMatrix(e), this
                }
            }(), rotateZ: function () {
                var e = new u.a;
                return function (t) {
                    return e.makeRotationZ(t), this.applyMatrix(e), this
                }
            }(), translate: function () {
                var e = new u.a;
                return function (t, r, a) {
                    return e.makeTranslation(t, r, a), this.applyMatrix(e), this
                }
            }(), scale: function () {
                var e = new u.a;
                return function (t, r, a) {
                    return e.makeScale(t, r, a), this.applyMatrix(e), this
                }
            }(), lookAt: function () {
                var e = new p.a;
                return function (t) {
                    e.lookAt(t), e.updateMatrix(), this.applyMatrix(e.matrix)
                }
            }(), center: function () {
                var e = new o.a;
                return function () {
                    return this.computeBoundingBox(), this.boundingBox.getCenter(e).negate(), this.translate(e.x, e.y, e.z), this
                }
            }(), setFromObject: function (e) {
                var t = e.geometry;
                if (e.isPoints || e.isLine) {
                    var r = new d.b(3 * t.vertices.length, 3), a = new d.b(3 * t.colors.length, 3);
                    if (this.addAttribute("position", r.copyVector3sArray(t.vertices)), this.addAttribute("color", a.copyColorsArray(t.colors)), t.lineDistances && t.lineDistances.length === t.vertices.length) {
                        var i = new d.b(t.lineDistances.length, 1);
                        this.addAttribute("lineDistance", i.copyArray(t.lineDistances))
                    }
                    null !== t.boundingSphere && (this.boundingSphere = t.boundingSphere.clone()), null !== t.boundingBox && (this.boundingBox = t.boundingBox.clone())
                } else e.isMesh && t && t.isGeometry && this.fromGeometry(t);
                return this
            }, setFromPoints: function (e) {
                for (var t = [], r = 0, a = e.length, i; r < a; r++) i = e[r], t.push(i.x, i.y, i.z || 0);
                return this.addAttribute("position", new d.b(t, 3)), this
            }, updateFromObject: function (e) {
                var t = e.geometry;
                if (e.isMesh) {
                    var r = t.__directGeometry;
                    if (!0 === t.elementsNeedUpdate && (r = void 0, t.elementsNeedUpdate = !1), void 0 === r) return this.fromGeometry(t);
                    r.verticesNeedUpdate = t.verticesNeedUpdate, r.normalsNeedUpdate = t.normalsNeedUpdate, r.colorsNeedUpdate = t.colorsNeedUpdate, r.uvsNeedUpdate = t.uvsNeedUpdate, r.groupsNeedUpdate = t.groupsNeedUpdate, t.verticesNeedUpdate = !1, t.normalsNeedUpdate = !1, t.colorsNeedUpdate = !1, t.uvsNeedUpdate = !1, t.groupsNeedUpdate = !1, t = r
                }
                var a;
                return !0 === t.verticesNeedUpdate && (a = this.attributes.position, void 0 !== a && (a.copyVector3sArray(t.vertices), a.needsUpdate = !0), t.verticesNeedUpdate = !1), !0 === t.normalsNeedUpdate && (a = this.attributes.normal, void 0 !== a && (a.copyVector3sArray(t.normals), a.needsUpdate = !0), t.normalsNeedUpdate = !1), !0 === t.colorsNeedUpdate && (a = this.attributes.color, void 0 !== a && (a.copyColorsArray(t.colors), a.needsUpdate = !0), t.colorsNeedUpdate = !1), t.uvsNeedUpdate && (a = this.attributes.uv, void 0 !== a && (a.copyVector2sArray(t.uvs), a.needsUpdate = !0), t.uvsNeedUpdate = !1), t.lineDistancesNeedUpdate && (a = this.attributes.lineDistance, void 0 !== a && (a.copyArray(t.lineDistances), a.needsUpdate = !0), t.lineDistancesNeedUpdate = !1), t.groupsNeedUpdate && (t.computeGroups(e.geometry), this.groups = t.groups, t.groupsNeedUpdate = !1), this
            }, fromGeometry: function (e) {
                return e.__directGeometry = new a().fromGeometry(e), this.fromDirectGeometry(e.__directGeometry)
            }, fromDirectGeometry: function (e) {
                var t = new Float32Array(3 * e.vertices.length);
                if (this.addAttribute("position", new d.a(t, 3).copyVector3sArray(e.vertices)), 0 < e.normals.length) {
                    var r = new Float32Array(3 * e.normals.length);
                    this.addAttribute("normal", new d.a(r, 3).copyVector3sArray(e.normals))
                }
                if (0 < e.colors.length) {
                    var a = new Float32Array(3 * e.colors.length);
                    this.addAttribute("color", new d.a(a, 3).copyColorsArray(e.colors))
                }
                if (0 < e.uvs.length) {
                    var n = new Float32Array(2 * e.uvs.length);
                    this.addAttribute("uv", new d.a(n, 2).copyVector2sArray(e.uvs))
                }
                if (0 < e.uvs2.length) {
                    var o = new Float32Array(2 * e.uvs2.length);
                    this.addAttribute("uv2", new d.a(o, 2).copyVector2sArray(e.uvs2))
                }
                for (var s in this.groups = e.groups, e.morphTargets) {
                    for (var c = [], p = e.morphTargets[s], u = 0, i = p.length; u < i; u++) {
                        var l = p[u], m = new d.b(3 * l.data.length, 3);
                        m.name = l.name, c.push(m.copyVector3sArray(l.data))
                    }
                    this.morphAttributes[s] = c
                }
                if (0 < e.skinIndices.length) {
                    var g = new d.b(4 * e.skinIndices.length, 4);
                    this.addAttribute("skinIndex", g.copyVector4sArray(e.skinIndices))
                }
                if (0 < e.skinWeights.length) {
                    var f = new d.b(4 * e.skinWeights.length, 4);
                    this.addAttribute("skinWeight", f.copyVector4sArray(e.skinWeights))
                }
                return null !== e.boundingSphere && (this.boundingSphere = e.boundingSphere.clone()), null !== e.boundingBox && (this.boundingBox = e.boundingBox.clone()), this
            }, computeBoundingBox: function () {
                null === this.boundingBox && (this.boundingBox = new i.a);
                var e = this.attributes.position;
                void 0 === e ? this.boundingBox.makeEmpty() : this.boundingBox.setFromBufferAttribute(e), (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) && console.error("THREE.BufferGeometry.computeBoundingBox: Computed min/max have NaN values. The \"position\" attribute is likely to have NaN values.", this)
            }, computeBoundingSphere: function () {
                var e = new i.a, t = new o.a;
                return function () {
                    null === this.boundingSphere && (this.boundingSphere = new l.a);
                    var r = this.attributes.position;
                    if (r) {
                        var a = this.boundingSphere.center;
                        e.setFromBufferAttribute(r), e.getCenter(a);
                        for (var n = 0, o = 0, i = r.count; o < i; o++) t.x = r.getX(o), t.y = r.getY(o), t.z = r.getZ(o), n = Math.max(n, a.distanceToSquared(t));
                        this.boundingSphere.radius = Math.sqrt(n), isNaN(this.boundingSphere.radius) && console.error("THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The \"position\" attribute is likely to have NaN values.", this)
                    }
                }
            }(), computeFaceNormals: function () {
            }, computeVertexNormals: function () {
                var e = this.index, t = this.attributes;
                if (t.position) {
                    var r = t.position.array;
                    if (void 0 === t.normal) this.addAttribute("normal", new d.a(new Float32Array(r.length), 3)); else for (var a = t.normal.array, n = 0, i = a.length; n < i; n++) a[n] = 0;
                    var s = t.normal.array, l = new o.a, c = new o.a, p = new o.a, u = new o.a, m = new o.a, g, f, h;
                    if (e) for (var v = e.array, n = 0, i = e.count; n < i; n += 3) g = 3 * v[n + 0], f = 3 * v[n + 1], h = 3 * v[n + 2], l.fromArray(r, g), c.fromArray(r, f), p.fromArray(r, h), u.subVectors(p, c), m.subVectors(l, c), u.cross(m), s[g] += u.x, s[g + 1] += u.y, s[g + 2] += u.z, s[f] += u.x, s[f + 1] += u.y, s[f + 2] += u.z, s[h] += u.x, s[h + 1] += u.y, s[h + 2] += u.z; else for (var n = 0, i = r.length; n < i; n += 9) l.fromArray(r, n), c.fromArray(r, n + 3), p.fromArray(r, n + 6), u.subVectors(p, c), m.subVectors(l, c), u.cross(m), s[n] = u.x, s[n + 1] = u.y, s[n + 2] = u.z, s[n + 3] = u.x, s[n + 4] = u.y, s[n + 5] = u.z, s[n + 6] = u.x, s[n + 7] = u.y, s[n + 8] = u.z;
                    this.normalizeNormals(), t.normal.needsUpdate = !0
                }
            }, merge: function (e, t) {
                if (!(e && e.isBufferGeometry)) return void console.error("THREE.BufferGeometry.merge(): geometry not an instance of THREE.BufferGeometry.", e);
                void 0 === t && (t = 0, console.warn("THREE.BufferGeometry.merge(): Overwriting original geometry, starting at offset=0. Use BufferGeometryUtils.mergeBufferGeometries() for lossless merge."));
                var r = this.attributes;
                for (var a in r) if (void 0 !== e.attributes[a]) for (var n = r[a], o = n.array, s = e.attributes[a], l = s.array, d = s.itemSize, c = 0, i = d * t; c < l.length; c++, i++) o[i] = l[c];
                return this
            }, normalizeNormals: function () {
                var e = new o.a;
                return function () {
                    for (var t = this.attributes.normal, r = 0, a = t.count; r < a; r++) e.x = t.getX(r), e.y = t.getY(r), e.z = t.getZ(r), e.normalize(), t.setXYZ(r, e.x, e.y, e.z)
                }
            }(), toNonIndexed: function () {
                function e(e, t) {
                    for (var r = e.array, a = e.itemSize, n = new r.constructor(t.length * a), o = 0, s = 0, c = 0, i = t.length; c < i; c++) {
                        o = t[c] * a;
                        for (var l = 0; l < a; l++) n[s++] = r[o++]
                    }
                    return new d.a(n, a)
                }

                if (null === this.index) return console.warn("THREE.BufferGeometry.toNonIndexed(): Geometry is already non-indexed."), this;
                var t = new n, r = this.index.array, a = this.attributes;
                for (var o in a) {
                    var s = a[o], c = e(s, r);
                    t.addAttribute(o, c)
                }
                var p = this.morphAttributes;
                for (o in p) {
                    for (var u = [], m = p[o], g = 0, i = m.length; g < i; g++) {
                        var s = m[g], c = e(s, r);
                        u.push(c)
                    }
                    t.morphAttributes[o] = u
                }
                for (var f = this.groups, g = 0, h = f.length, l; g < h; g++) l = f[g], t.addGroup(l.start, l.count, l.materialIndex);
                return t
            }, toJSON: function () {
                var e = {metadata: {version: 4.5, type: "BufferGeometry", generator: "BufferGeometry.toJSON"}};
                if (e.uuid = this.uuid, e.type = this.type, "" !== this.name && (e.name = this.name), 0 < Object.keys(this.userData).length && (e.userData = this.userData), void 0 !== this.parameters) {
                    var t = this.parameters;
                    for (var r in t) void 0 !== t[r] && (e[r] = t[r]);
                    return e
                }
                e.data = {attributes: {}};
                var a = this.index;
                if (null !== a) {
                    var i = Array.prototype.slice.call(a.array);
                    e.data.index = {type: a.array.constructor.name, array: i}
                }
                var n = this.attributes;
                for (var r in n) {
                    var o = n[r], i = Array.prototype.slice.call(o.array);
                    e.data.attributes[r] = {
                        itemSize: o.itemSize,
                        type: o.array.constructor.name,
                        array: i,
                        normalized: o.normalized
                    }
                }
                var s = this.groups;
                0 < s.length && (e.data.groups = JSON.parse(JSON.stringify(s)));
                var l = this.boundingSphere;
                return null !== l && (e.data.boundingSphere = {center: l.center.toArray(), radius: l.radius}), e
            }, clone: function () {
                return new n().copy(this)
            }, copy: function (e) {
                var t, r, a;
                this.index = null, this.attributes = {}, this.morphAttributes = {}, this.groups = [], this.boundingBox = null, this.boundingSphere = null, this.name = e.name;
                var i = e.index;
                null !== i && this.setIndex(i.clone());
                var n = e.attributes;
                for (t in n) {
                    var o = n[t];
                    this.addAttribute(t, o.clone())
                }
                var s = e.morphAttributes;
                for (t in s) {
                    var l = [], d = s[t];
                    for (r = 0, a = d.length; r < a; r++) l.push(d[r].clone());
                    this.morphAttributes[t] = l
                }
                var c = e.groups;
                for (r = 0, a = c.length; r < a; r++) {
                    var p = c[r];
                    this.addGroup(p.start, p.count, p.materialIndex)
                }
                var u = e.boundingBox;
                null !== u && (this.boundingBox = u.clone());
                var m = e.boundingSphere;
                return null !== m && (this.boundingSphere = m.clone()), this.drawRange.start = e.drawRange.start, this.drawRange.count = e.drawRange.count, this.userData = e.userData, this
            }, dispose: function () {
                this.dispatchEvent({type: "dispose"})
            }
        })
    }
}]);