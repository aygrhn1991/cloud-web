/**
 * GeoUtils类提供若干几何算法，用来帮助用户判断点与矩形、
 * 圆形、多边形线、多边形面的关系,并提供计算折线长度和多边形的面积的公式。 
 * ，
 * 基于SmartEarth Map API 。
 *
 * @author jineral
 * @version 1.0
 */

/** 
 * @namespace SEMap的所有library类均放在SEMapLib命名空间下 
 */
var SEMapLib = window.SEMapLib = SEMapLib || {};
(function ($) {

    /**
     * 地球半径
     */
    var EARTHRADIUS = 6370996.81;

    /** 
     * @exports GeoUtils as BMapLib.GeoUtils 
     */
    var GeoUtils =
        /**
         * GeoUtils类，静态类，勿需实例化即可使用
         * @class GeoUtils类的<b>入口</b>。
         * 该类提供的都是静态方法，勿需实例化即可使用。     
         */
        SEMapLib.GeoUtils = function () {

        }
    var LineSeg =
        SEMapLib.LineSeg = {
            s: null, //线段起点
            e: null, //线段终点
            create: function () {
                var obj = new Object;
                $.extend(obj, SEMapLib.LineSeg);
                return obj;
            }
        }

    var CMath =
        SEMapLib.CMath = {
            cm_const: {
                INF: 1E200,
                EP: 1E-10,
                MAXV: 300,
                R: 6378.137
            },
            dblcmp: function (d) {
                if (Math.abs(d) < CMath.cm_const.EP) {
                    return 0;
                }
                return (d > 0) ? 1 : -1;
            },
            /**
             * 矢量差
             */
            vSub: function (p, q) {
                return {lng:p.lng - q.lng,lat: p.lat - q.lat};
            },
            /**
             * 矢量叉积 叉乘的重要性质： 若 P × Q > 0 , 则P 在Q的顺时针方向 若 P × Q < 0 , 则P 在Q的逆时针方向 若 P × Q
             * = 0 , 则P 与Q共线，但可能同向也可能反向
             *
             */

            vProduct: function (p, q) {
                return p.lng * q.lat - p.lat * q.lng;
            },
            /**
             * 矢量点积
             *
             */
            vDotProduct: function (p, q) {
                return p.lng * q.lng + p.lat * q.lat;
            },
            /**
             * 两点间的距离 的平方
             */
            distSqu: function (p, q) {
                var dp = this.vSub(p, q);
                return Math.pow(dp.lng, 2) + Math.pow(dp.lat, 2);
            },
            /*
             * 两点间的距离
             */
            dist: function (p, q) {
                return Math.sqrt(this.distSqu(p, q));
            },
            /*
             * 判断两点是否重合
             */
            equiPoint: function (p, q) {
                return (Math.abs(p.lng - q.lng) < EP) && (Math.abs(p.lat - q.lat) < EP);
            },
            /*
             * 三点叉积 (sp-op)*(ep-op)的叉积 r=multiply(sp,ep,op),得到(sp-op)*(ep-op)的叉积 r>0: sp
             * 在矢量op ep 的顺时针方向； r=0：op sp ep 三点共线； r<0: sp 在矢量op ep 的逆时针方向
             *
             */
            multify: function (sp, ep, op) {
                return this.vProduct(this.vSub(sp, op), this.vSub(ep, op));
            },
            /*
             * 矢量(sp-op)和(ep-op)的点积
             * r=dotmultiply(sp,ep,op),得到矢量(sp-op)和(ep-op)的点积如果两个矢量都非零矢量 r < 0:
             * 两矢量夹角为锐角； r = 0：两矢量夹角为直角； r > 0: 两矢量夹角为钝角
             */

            dotMultify: function (sp, ep, op) {
                return this.vDotProduct(this.vSub(sp, op), this.vSub(ep, op));
            },
            //判断点在线段上
            onLineSeg: function (p, l) {
                return (this.multify(l.e, p, l.s) == 0)
                    && (((p.lng - l.s.lng) * (p.lng - l.e.lng) <= 0)
                        && ((p.lat - l.s.lat) * (p.lat - l.e.lat) <= 0));
            },
            //判断点在线段上
            onLineSeg_p: function (p, ps, pe) {
                return (this.multify(pe, p, ps) == 0)
                    && (((p.lng - ps.lng) * (p.lng - pe.lng) <= 0)
                        && ((p.lat - ps.lat) * (p.lat - pe.lat) <= 0));
            },
            //判断点在线段上
            onLineSeg_baidu: function (point, curPt, nextPt) {
                //首先判断point是否在curPt和nextPt之间，即：此判断该点是否在该线段的外包矩形内
                if (point.lng >= Math.min(curPt.lng, nextPt.lng) && point.lng <= Math.max(curPt.lng, nextPt.lng) &&
                    point.lat >= Math.min(curPt.lat, nextPt.lat) && point.lat <= Math.max(curPt.lat, nextPt.lat)) {
                    //判断点是否在直线上公式
                    var precision = (curPt.lng - point.lng) * (nextPt.lat - point.lat) -
                        (nextPt.lng - point.lng) * (curPt.lat - point.lat);
                    if (precision < 2e-10 && precision > -2e-10) {//实质判断是否接近0
                        return true;
                    }
                }
                return false
            },
            /*
             * 判断点C 在线段AB 所在的直线l 上垂足P 的与线段AB 的关系 本函数是根据下面的公式写的，
             * P 是点C 到线段AB 所在直线的垂足 AC
             * dot AB r = ---------------------- ||AB||^2 (Cx-Ax)(Bx-Ax) +
             * (Cy-Ay)(By-Ay) = ---------------------------------------------------- L^2
             * r has the following meaning: r=0 P = A r=1 P = B r<0 P is on the backward
             * extension of AB r>1 P is on the forward extension of AB 0<r<1 P is
             * interior to AB
             * 返回值：
             *      <0--在线段的反向延长线上；
             *      >1--在线段的延长线上
             *      0，1之间，垂足在线段上
             */
            relation: function (c, l) {
                return this.dotMultify(c, l.e, l.s) / this.distSqu(l.s, l.e);
            },
            relation_p: function (p, ps, pe) {
                var rr = this.dotMultify(p, pe, ps) / this.distSqu(ps, pe);
                return rr;
            },
            /*
             * 求点C 到线段AB 所在直线的垂足 P
             */
            perpendicular: function (p, l) {
                var r = this.relation(p, l);
                var x = l.s.lng + r * (l.e.lng - l.s.lng);
                var y = l.s.lat + r * (l.e.lat - l.s.lat);
                var tp = {lng:x, lat:y};
                return tp;
            },
            /*
             * 求点p 到线段l 距离最近的点
             */
            ptoLineSegNearPoint: function (p, l) {
                var r = this.relation(p, l);
                var np = null;
                if (r < 0) {
                    np = l.s
                } else if (r > 1) {
                    np = l.e;
                } else {
                    np = this.perpendicular(p, l);
                }
                return np;
            },
            /*
             * 计算点到折线集的最近距离,并返回最近点
             */
            ptoPointSetNearPoint: function (p, ps) {
                var tl = LineSeg.create();
                var cd = CMath.cm_const.INF;
                var td = 0;  //点到线段的距离
                var cq = null;
                var tq = null;
                for (var i = 0; i < ps.length - 1; i++) {
                    tl.e = ps[i];
                    tl.s = ps[i + 1];
                    tq = this.ptoLineSegNearPoint(p, tl);
                    td = this.dist(p, tq);
                    if (td < cd) {
                        cd = td;
                        cq = { lng: tq.lng, lat: tq.lat };
                    }
                }
                return cq;
            },
            /*
             * 检索点到折线集的最近点的位置,并返回该位置
             */
            indexPointSetNearPoint: function (p, ps) {
                // distSqu
                var d = CMath.cm_const.INF;
                var pos = 0;
                for (var i = 0; i < ps.length - 1; i++) {
                    var dm = this.distSqu(p, ps[i]);
                    if (dm < d) {
                        d = dm;
                        pos = i;
                    }
                }
                return pos;
            },
            //计算地球上 两个 地理位置坐标点之间的 实际距离，单位：米
            distanceOnEarth: function (lat1, lng1, lat2,
                lng2) {
                var radLng1 = lng1 * Math.PI / 180.0;
                var radLng2 = lng2 * Math.PI / 180.0;
                var a = radLng1 - radLng2;
                var b = (lat1 - lat2) * Math.PI / 180.0;
                var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2)
                    + Math.cos(radLng1) * Math.cos(radLng2)
                    * Math.pow(Math.sin(b / 2), 2))) * SEMapLib.CMath.cm_const.R;
                s = Math.round(s * 100000) / 100.0;
                return s;
            },
            /*
             * 球面上，两点间的距离
             */
            distOnEarth_SE: function (p, q) {
                return distanceOnEarth(p.lng, p.lat, q.lng, q.lat);
            },
            samePosition_SE: function (lng, lat, p) {
                var l = p.lng;
                var d = lng - l;
                var dx = Math.abs(d);
                var dy = Math.abs(lat - p.lat);
                return (dx < CMath.cm_const.EP) && (dy < CMath.cm_const.EP);
            }
        }
})(jQuery);//闭包结束



