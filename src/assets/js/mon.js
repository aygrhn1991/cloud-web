/**
 * @namespace IoV的所有library类均放在IoVLib命名空间下
 */
var IoVLib = window.IoVLib = IoVLib || {};
(function() {

    // 车联网平台，1 tbox平台， 2 g6平台
    IoVLib.plat = 2;

    var mon = IoVLib.mon = {};
    /**
     * 初始化地图
     */
    mon.initMap = function() {
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

    }
    mon.addVehs = function(vehs) {}

})();