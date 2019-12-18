/**
 * @namespace IoV的所有library类均放在IoVLib命名空间下
 */
var IoVLib = window.IoVLib = IoVLib || {};
(function() {
    IoVLib.ws = { inip: '192.168.40.153:10000', outip: '192.168.40.153:10000' };

    // 车联网平台，1 tbox平台， 2 g6平台
    IoVLib.plat = 2;

    var Tracker = IoVLib.Tracker = {};
    /**
     * 初始化地图
     */
    Tracker.initMap = function(vehMoveCallBack) {
        this._vehMoveCallBack = vehMoveCallBack;
        var map = this._map = new BMap.Map("allmap"); // 创建Map实例
        map.centerAndZoom(new BMap.Point(110.404, 37.915), 5); // 初始化地图,设置中心点坐标和地图级别
        //添加地图类型控件
        map.addControl(new BMap.MapTypeControl({
            mapTypes: [
                BMAP_NORMAL_MAP,
                BMAP_HYBRID_MAP
            ]
        }));
        map.setCurrentCity("北京"); // 设置地图显示的城市 此项是必须设置的
        map.enableScrollWheelZoom(true);
        map.setMapStyle({ style: 'midnight' });

    };

    Tracker.drawTracker = function(data) {
        this._tran && this._tran.clear();
        var vehs = data;
        // for (var i = 0; i < 10; i++) {
        //   vehs.push(BMapLib.Veh('1', 'A1234', 1, 1, i * 10, i * 16, 116.454 - i, 39.945 - i, new Date()))
        // }
        var tran = this._tran = new BMapLib.LuShu(this._map, vehs, this._vehMoveCallBack);
    }

    Tracker.start = function() {
        this._tran.start();
    }
    Tracker.pause = function() {
        this._tran.pause();
    }
    Tracker.setSpeed = function(n) {
        this._tran.setSpeed(n);
    }

    Tracker.toView = function() {
        this._tran.toView();
    }
})();

// var doooo = function () {
//   var map = new BMap.Map("allmap");    // 创建Map实例
//   map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);  // 初始化地图,设置中心点坐标和地图级别
//   //添加地图类型控件
//   map.addControl(new BMap.MapTypeControl({
//     mapTypes: [
//       BMAP_NORMAL_MAP,
//       BMAP_HYBRID_MAP
//     ]
//   }));
//   map.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的
//   map.enableScrollWheelZoom(true);
//   map.setMapStyle({style: 'midnight'});
//
//   var vehs = [];
//   for (var i = 0; i < 10; i++) {
//     vehs.push(BMapLib.Veh('1', 'A1234', 1, 1, i * 10, i * 16, 116.454 - i, 39.945 - i, new Date()))
//   }
//   var tran = new BMapLib.LuShu(map, vehs, function (i) {
//     console.log(i, vehs[i]);
//   });
//   // tran.setSpeed(1);
//   tran.start();
//   // var v1 = BMapLib.Veh('1', 'A1234', 1, 1, 1, 1, 116.454, 39.945, new Date());
//   // var rm = new BMapLib.VehOverlay(v1);
//   // map.addOverlay(rm);
//   // rm.addEventListener("click", function (e) {
//   //   console.log(e);
//   // });
//   // console.log(v1);
// };