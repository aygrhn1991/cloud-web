import { Injectable } from '@angular/core';
import { XzqhModel, XzqhTreeModel, ColorModel, PowerModel, PlatformModel } from '../models/common.model';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  xzqhOptions: Array<XzqhModel> = [
    { code: 110000, pcode: null, name: "北京市", shortname: "北京" },
    { code: 110100, pcode: 110000, name: "市辖区", shortname: null },
    { code: 120000, pcode: null, name: "天津市", shortname: "天津" },
    { code: 120100, pcode: 120000, name: "市辖区", shortname: null },
    { code: 130000, pcode: null, name: "河北省", shortname: "河北" },
    { code: 130100, pcode: 130000, name: "石家庄市", shortname: null },
    { code: 130200, pcode: 130000, name: "唐山市", shortname: null },
    { code: 130300, pcode: 130000, name: "秦皇岛市", shortname: null },
    { code: 130400, pcode: 130000, name: "邯郸市", shortname: null },
    { code: 130500, pcode: 130000, name: "邢台市", shortname: null },
    { code: 130600, pcode: 130000, name: "保定市", shortname: null },
    { code: 130700, pcode: 130000, name: "张家口市", shortname: null },
    { code: 130800, pcode: 130000, name: "承德市", shortname: null },
    { code: 130900, pcode: 130000, name: "沧州市", shortname: null },
    { code: 131000, pcode: 130000, name: "廊坊市", shortname: null },
    { code: 131100, pcode: 130000, name: "衡水市", shortname: null },
    { code: 139000, pcode: 130000, name: "省直辖县级行政区划", shortname: null },
    { code: 140000, pcode: null, name: "山西省", shortname: "山西" },
    { code: 140100, pcode: 140000, name: "太原市", shortname: null },
    { code: 140200, pcode: 140000, name: "大同市", shortname: null },
    { code: 140300, pcode: 140000, name: "阳泉市", shortname: null },
    { code: 140400, pcode: 140000, name: "长治市", shortname: null },
    { code: 140500, pcode: 140000, name: "晋城市", shortname: null },
    { code: 140600, pcode: 140000, name: "朔州市", shortname: null },
    { code: 140700, pcode: 140000, name: "晋中市", shortname: null },
    { code: 140800, pcode: 140000, name: "运城市", shortname: null },
    { code: 140900, pcode: 140000, name: "忻州市", shortname: null },
    { code: 141000, pcode: 140000, name: "临汾市", shortname: null },
    { code: 141100, pcode: 140000, name: "吕梁市", shortname: null },
    { code: 150000, pcode: null, name: "内蒙古自治区", shortname: "内蒙古" },
    { code: 150100, pcode: 150000, name: "呼和浩特市", shortname: null },
    { code: 150200, pcode: 150000, name: "包头市", shortname: null },
    { code: 150300, pcode: 150000, name: "乌海市", shortname: null },
    { code: 150400, pcode: 150000, name: "赤峰市", shortname: null },
    { code: 150500, pcode: 150000, name: "通辽市", shortname: null },
    { code: 150600, pcode: 150000, name: "鄂尔多斯市", shortname: null },
    { code: 150700, pcode: 150000, name: "呼伦贝尔市", shortname: null },
    { code: 150800, pcode: 150000, name: "巴彦淖尔市", shortname: null },
    { code: 150900, pcode: 150000, name: "乌兰察布市", shortname: null },
    { code: 152200, pcode: 150000, name: "兴安盟", shortname: null },
    { code: 152500, pcode: 150000, name: "锡林郭勒盟", shortname: null },
    { code: 152900, pcode: 150000, name: "阿拉善盟", shortname: null },
    { code: 210000, pcode: null, name: "辽宁省", shortname: "辽宁" },
    { code: 210100, pcode: 210000, name: "沈阳市", shortname: null },
    { code: 210200, pcode: 210000, name: "大连市", shortname: null },
    { code: 210300, pcode: 210000, name: "鞍山市", shortname: null },
    { code: 210400, pcode: 210000, name: "抚顺市", shortname: null },
    { code: 210500, pcode: 210000, name: "本溪市", shortname: null },
    { code: 210600, pcode: 210000, name: "丹东市", shortname: null },
    { code: 210700, pcode: 210000, name: "锦州市", shortname: null },
    { code: 210800, pcode: 210000, name: "营口市", shortname: null },
    { code: 210900, pcode: 210000, name: "阜新市", shortname: null },
    { code: 211000, pcode: 210000, name: "辽阳市", shortname: null },
    { code: 211100, pcode: 210000, name: "盘锦市", shortname: null },
    { code: 211200, pcode: 210000, name: "铁岭市", shortname: null },
    { code: 211300, pcode: 210000, name: "朝阳市", shortname: null },
    { code: 211400, pcode: 210000, name: "葫芦岛市", shortname: null },
    { code: 220000, pcode: null, name: "吉林省", shortname: "吉林" },
    { code: 220100, pcode: 220000, name: "长春市", shortname: null },
    { code: 220200, pcode: 220000, name: "吉林市", shortname: null },
    { code: 220300, pcode: 220000, name: "四平市", shortname: null },
    { code: 220400, pcode: 220000, name: "辽源市", shortname: null },
    { code: 220500, pcode: 220000, name: "通化市", shortname: null },
    { code: 220600, pcode: 220000, name: "白山市", shortname: null },
    { code: 220700, pcode: 220000, name: "松原市", shortname: null },
    { code: 220800, pcode: 220000, name: "白城市", shortname: null },
    { code: 222400, pcode: 220000, name: "延边朝鲜族自治州", shortname: null },
    { code: 230000, pcode: null, name: "黑龙江省", shortname: "黑龙江" },
    { code: 230100, pcode: 230000, name: "哈尔滨市", shortname: null },
    { code: 230200, pcode: 230000, name: "齐齐哈尔市", shortname: null },
    { code: 230300, pcode: 230000, name: "鸡西市", shortname: null },
    { code: 230400, pcode: 230000, name: "鹤岗市", shortname: null },
    { code: 230500, pcode: 230000, name: "双鸭山市", shortname: null },
    { code: 230600, pcode: 230000, name: "大庆市", shortname: null },
    { code: 230700, pcode: 230000, name: "伊春市", shortname: null },
    { code: 230800, pcode: 230000, name: "佳木斯市", shortname: null },
    { code: 230900, pcode: 230000, name: "七台河市", shortname: null },
    { code: 231000, pcode: 230000, name: "牡丹江市", shortname: null },
    { code: 231100, pcode: 230000, name: "黑河市", shortname: null },
    { code: 231200, pcode: 230000, name: "绥化市", shortname: null },
    { code: 232700, pcode: 230000, name: "大兴安岭地区", shortname: null },
    { code: 310000, pcode: null, name: "上海市", shortname: "上海" },
    { code: 310100, pcode: 310000, name: "市辖区", shortname: null },
    { code: 320000, pcode: null, name: "江苏省", shortname: "江苏" },
    { code: 320100, pcode: 320000, name: "南京市", shortname: null },
    { code: 320200, pcode: 320000, name: "无锡市", shortname: null },
    { code: 320300, pcode: 320000, name: "徐州市", shortname: null },
    { code: 320400, pcode: 320000, name: "常州市", shortname: null },
    { code: 320500, pcode: 320000, name: "苏州市", shortname: null },
    { code: 320600, pcode: 320000, name: "南通市", shortname: null },
    { code: 320700, pcode: 320000, name: "连云港市", shortname: null },
    { code: 320800, pcode: 320000, name: "淮安市", shortname: null },
    { code: 320900, pcode: 320000, name: "盐城市", shortname: null },
    { code: 321000, pcode: 320000, name: "扬州市", shortname: null },
    { code: 321100, pcode: 320000, name: "镇江市", shortname: null },
    { code: 321200, pcode: 320000, name: "泰州市", shortname: null },
    { code: 321300, pcode: 320000, name: "宿迁市", shortname: null },
    { code: 330000, pcode: null, name: "浙江省", shortname: "浙江" },
    { code: 330100, pcode: 330000, name: "杭州市", shortname: null },
    { code: 330200, pcode: 330000, name: "宁波市", shortname: null },
    { code: 330300, pcode: 330000, name: "温州市", shortname: null },
    { code: 330400, pcode: 330000, name: "嘉兴市", shortname: null },
    { code: 330500, pcode: 330000, name: "湖州市", shortname: null },
    { code: 330600, pcode: 330000, name: "绍兴市", shortname: null },
    { code: 330700, pcode: 330000, name: "金华市", shortname: null },
    { code: 330800, pcode: 330000, name: "衢州市", shortname: null },
    { code: 330900, pcode: 330000, name: "舟山市", shortname: null },
    { code: 331000, pcode: 330000, name: "台州市", shortname: null },
    { code: 331100, pcode: 330000, name: "丽水市", shortname: null },
    { code: 340000, pcode: null, name: "安徽省", shortname: "安徽" },
    { code: 340100, pcode: 340000, name: "合肥市", shortname: null },
    { code: 340200, pcode: 340000, name: "芜湖市", shortname: null },
    { code: 340300, pcode: 340000, name: "蚌埠市", shortname: null },
    { code: 340400, pcode: 340000, name: "淮南市", shortname: null },
    { code: 340500, pcode: 340000, name: "马鞍山市", shortname: null },
    { code: 340600, pcode: 340000, name: "淮北市", shortname: null },
    { code: 340700, pcode: 340000, name: "铜陵市", shortname: null },
    { code: 340800, pcode: 340000, name: "安庆市", shortname: null },
    { code: 341000, pcode: 340000, name: "黄山市", shortname: null },
    { code: 341100, pcode: 340000, name: "滁州市", shortname: null },
    { code: 341200, pcode: 340000, name: "阜阳市", shortname: null },
    { code: 341300, pcode: 340000, name: "宿州市", shortname: null },
    { code: 341500, pcode: 340000, name: "六安市", shortname: null },
    { code: 341600, pcode: 340000, name: "亳州市", shortname: null },
    { code: 341700, pcode: 340000, name: "池州市", shortname: null },
    { code: 341800, pcode: 340000, name: "宣城市", shortname: null },
    { code: 350000, pcode: null, name: "福建省", shortname: "福建" },
    { code: 350100, pcode: 350000, name: "福州市", shortname: null },
    { code: 350200, pcode: 350000, name: "厦门市", shortname: null },
    { code: 350300, pcode: 350000, name: "莆田市", shortname: null },
    { code: 350400, pcode: 350000, name: "三明市", shortname: null },
    { code: 350500, pcode: 350000, name: "泉州市", shortname: null },
    { code: 350600, pcode: 350000, name: "漳州市", shortname: null },
    { code: 350700, pcode: 350000, name: "南平市", shortname: null },
    { code: 350800, pcode: 350000, name: "龙岩市", shortname: null },
    { code: 350900, pcode: 350000, name: "宁德市", shortname: null },
    { code: 360000, pcode: null, name: "江西省", shortname: "江西" },
    { code: 360100, pcode: 360000, name: "南昌市", shortname: null },
    { code: 360200, pcode: 360000, name: "景德镇市", shortname: null },
    { code: 360300, pcode: 360000, name: "萍乡市", shortname: null },
    { code: 360400, pcode: 360000, name: "九江市", shortname: null },
    { code: 360500, pcode: 360000, name: "新余市", shortname: null },
    { code: 360600, pcode: 360000, name: "鹰潭市", shortname: null },
    { code: 360700, pcode: 360000, name: "赣州市", shortname: null },
    { code: 360800, pcode: 360000, name: "吉安市", shortname: null },
    { code: 360900, pcode: 360000, name: "宜春市", shortname: null },
    { code: 361000, pcode: 360000, name: "抚州市", shortname: null },
    { code: 361100, pcode: 360000, name: "上饶市", shortname: null },
    { code: 370000, pcode: null, name: "山东省", shortname: "山东" },
    { code: 370100, pcode: 370000, name: "济南市", shortname: null },
    { code: 370200, pcode: 370000, name: "青岛市", shortname: null },
    { code: 370300, pcode: 370000, name: "淄博市", shortname: null },
    { code: 370400, pcode: 370000, name: "枣庄市", shortname: null },
    { code: 370500, pcode: 370000, name: "东营市", shortname: null },
    { code: 370600, pcode: 370000, name: "烟台市", shortname: null },
    { code: 370700, pcode: 370000, name: "潍坊市", shortname: null },
    { code: 370800, pcode: 370000, name: "济宁市", shortname: null },
    { code: 370900, pcode: 370000, name: "泰安市", shortname: null },
    { code: 371000, pcode: 370000, name: "威海市", shortname: null },
    { code: 371100, pcode: 370000, name: "日照市", shortname: null },
    { code: 371200, pcode: 370000, name: "莱芜市", shortname: null },
    { code: 371300, pcode: 370000, name: "临沂市", shortname: null },
    { code: 371400, pcode: 370000, name: "德州市", shortname: null },
    { code: 371500, pcode: 370000, name: "聊城市", shortname: null },
    { code: 371600, pcode: 370000, name: "滨州市", shortname: null },
    { code: 371700, pcode: 370000, name: "菏泽市", shortname: null },
    { code: 410000, pcode: null, name: "河南省", shortname: "河南" },
    { code: 410100, pcode: 410000, name: "郑州市", shortname: null },
    { code: 410200, pcode: 410000, name: "开封市", shortname: null },
    { code: 410300, pcode: 410000, name: "洛阳市", shortname: null },
    { code: 410400, pcode: 410000, name: "平顶山市", shortname: null },
    { code: 410500, pcode: 410000, name: "安阳市", shortname: null },
    { code: 410600, pcode: 410000, name: "鹤壁市", shortname: null },
    { code: 410700, pcode: 410000, name: "新乡市", shortname: null },
    { code: 410800, pcode: 410000, name: "焦作市", shortname: null },
    { code: 410900, pcode: 410000, name: "濮阳市", shortname: null },
    { code: 411000, pcode: 410000, name: "许昌市", shortname: null },
    { code: 411100, pcode: 410000, name: "漯河市", shortname: null },
    { code: 411200, pcode: 410000, name: "三门峡市", shortname: null },
    { code: 411300, pcode: 410000, name: "南阳市", shortname: null },
    { code: 411400, pcode: 410000, name: "商丘市", shortname: null },
    { code: 411500, pcode: 410000, name: "信阳市", shortname: null },
    { code: 411600, pcode: 410000, name: "周口市", shortname: null },
    { code: 411700, pcode: 410000, name: "驻马店市", shortname: null },
    { code: 419000, pcode: 410000, name: "省直辖县级行政区划", shortname: null },
    { code: 420000, pcode: null, name: "湖北省", shortname: "湖北" },
    { code: 420100, pcode: 420000, name: "武汉市", shortname: null },
    { code: 420200, pcode: 420000, name: "黄石市", shortname: null },
    { code: 420300, pcode: 420000, name: "十堰市", shortname: null },
    { code: 420500, pcode: 420000, name: "宜昌市", shortname: null },
    { code: 420600, pcode: 420000, name: "襄阳市", shortname: null },
    { code: 420700, pcode: 420000, name: "鄂州市", shortname: null },
    { code: 420800, pcode: 420000, name: "荆门市", shortname: null },
    { code: 420900, pcode: 420000, name: "孝感市", shortname: null },
    { code: 421000, pcode: 420000, name: "荆州市", shortname: null },
    { code: 421100, pcode: 420000, name: "黄冈市", shortname: null },
    { code: 421200, pcode: 420000, name: "咸宁市", shortname: null },
    { code: 421300, pcode: 420000, name: "随州市", shortname: null },
    { code: 422800, pcode: 420000, name: "恩施土家族苗族自治州", shortname: null },
    { code: 429000, pcode: 420000, name: "省直辖县级行政区划", shortname: null },
    { code: 430000, pcode: null, name: "湖南省", shortname: "湖南" },
    { code: 430100, pcode: 430000, name: "长沙市", shortname: null },
    { code: 430200, pcode: 430000, name: "株洲市", shortname: null },
    { code: 430300, pcode: 430000, name: "湘潭市", shortname: null },
    { code: 430400, pcode: 430000, name: "衡阳市", shortname: null },
    { code: 430500, pcode: 430000, name: "邵阳市", shortname: null },
    { code: 430600, pcode: 430000, name: "岳阳市", shortname: null },
    { code: 430700, pcode: 430000, name: "常德市", shortname: null },
    { code: 430800, pcode: 430000, name: "张家界市", shortname: null },
    { code: 430900, pcode: 430000, name: "益阳市", shortname: null },
    { code: 431000, pcode: 430000, name: "郴州市", shortname: null },
    { code: 431100, pcode: 430000, name: "永州市", shortname: null },
    { code: 431200, pcode: 430000, name: "怀化市", shortname: null },
    { code: 431300, pcode: 430000, name: "娄底市", shortname: null },
    { code: 433100, pcode: 430000, name: "湘西土家族苗族自治州", shortname: null },
    { code: 440000, pcode: null, name: "广东省", shortname: "广东" },
    { code: 440100, pcode: 440000, name: "广州市", shortname: null },
    { code: 440200, pcode: 440000, name: "韶关市", shortname: null },
    { code: 440300, pcode: 440000, name: "深圳市", shortname: null },
    { code: 440400, pcode: 440000, name: "珠海市", shortname: null },
    { code: 440500, pcode: 440000, name: "汕头市", shortname: null },
    { code: 440600, pcode: 440000, name: "佛山市", shortname: null },
    { code: 440700, pcode: 440000, name: "江门市", shortname: null },
    { code: 440800, pcode: 440000, name: "湛江市", shortname: null },
    { code: 440900, pcode: 440000, name: "茂名市", shortname: null },
    { code: 441200, pcode: 440000, name: "肇庆市", shortname: null },
    { code: 441300, pcode: 440000, name: "惠州市", shortname: null },
    { code: 441400, pcode: 440000, name: "梅州市", shortname: null },
    { code: 441500, pcode: 440000, name: "汕尾市", shortname: null },
    { code: 441600, pcode: 440000, name: "河源市", shortname: null },
    { code: 441700, pcode: 440000, name: "阳江市", shortname: null },
    { code: 441800, pcode: 440000, name: "清远市", shortname: null },
    { code: 441900, pcode: 440000, name: "东莞市", shortname: null },
    { code: 442000, pcode: 440000, name: "中山市", shortname: null },
    { code: 445100, pcode: 440000, name: "潮州市", shortname: null },
    { code: 445200, pcode: 440000, name: "揭阳市", shortname: null },
    { code: 445300, pcode: 440000, name: "云浮市", shortname: null },
    { code: 450000, pcode: null, name: "广西壮族自治区", shortname: "广西" },
    { code: 450100, pcode: 450000, name: "南宁市", shortname: null },
    { code: 450200, pcode: 450000, name: "柳州市", shortname: null },
    { code: 450300, pcode: 450000, name: "桂林市", shortname: null },
    { code: 450400, pcode: 450000, name: "梧州市", shortname: null },
    { code: 450500, pcode: 450000, name: "北海市", shortname: null },
    { code: 450600, pcode: 450000, name: "防城港市", shortname: null },
    { code: 450700, pcode: 450000, name: "钦州市", shortname: null },
    { code: 450800, pcode: 450000, name: "贵港市", shortname: null },
    { code: 450900, pcode: 450000, name: "玉林市", shortname: null },
    { code: 451000, pcode: 450000, name: "百色市", shortname: null },
    { code: 451100, pcode: 450000, name: "贺州市", shortname: null },
    { code: 451200, pcode: 450000, name: "河池市", shortname: null },
    { code: 451300, pcode: 450000, name: "来宾市", shortname: null },
    { code: 451400, pcode: 450000, name: "崇左市", shortname: null },
    { code: 460000, pcode: null, name: "海南省", shortname: "海南" },
    { code: 460100, pcode: 460000, name: "海口市", shortname: null },
    { code: 460200, pcode: 460000, name: "三亚市", shortname: null },
    { code: 460300, pcode: 460000, name: "三沙市", shortname: null },
    { code: 460400, pcode: 460000, name: "儋州市", shortname: null },
    { code: 469000, pcode: 460000, name: "省直辖县级行政区划", shortname: null },
    { code: 500000, pcode: null, name: "重庆市", shortname: "重庆" },
    { code: 500100, pcode: 500000, name: "市辖区", shortname: null },
    { code: 500200, pcode: 500000, name: "县", shortname: null },
    { code: 510000, pcode: null, name: "四川省", shortname: "四川" },
    { code: 510100, pcode: 510000, name: "成都市", shortname: null },
    { code: 510300, pcode: 510000, name: "自贡市", shortname: null },
    { code: 510400, pcode: 510000, name: "攀枝花市", shortname: null },
    { code: 510500, pcode: 510000, name: "泸州市", shortname: null },
    { code: 510600, pcode: 510000, name: "德阳市", shortname: null },
    { code: 510700, pcode: 510000, name: "绵阳市", shortname: null },
    { code: 510800, pcode: 510000, name: "广元市", shortname: null },
    { code: 510900, pcode: 510000, name: "遂宁市", shortname: null },
    { code: 511000, pcode: 510000, name: "内江市", shortname: null },
    { code: 511100, pcode: 510000, name: "乐山市", shortname: null },
    { code: 511300, pcode: 510000, name: "南充市", shortname: null },
    { code: 511400, pcode: 510000, name: "眉山市", shortname: null },
    { code: 511500, pcode: 510000, name: "宜宾市", shortname: null },
    { code: 511600, pcode: 510000, name: "广安市", shortname: null },
    { code: 511700, pcode: 510000, name: "达州市", shortname: null },
    { code: 511800, pcode: 510000, name: "雅安市", shortname: null },
    { code: 511900, pcode: 510000, name: "巴中市", shortname: null },
    { code: 512000, pcode: 510000, name: "资阳市", shortname: null },
    { code: 513200, pcode: 510000, name: "阿坝藏族羌族自治州", shortname: null },
    { code: 513300, pcode: 510000, name: "甘孜藏族自治州", shortname: null },
    { code: 513400, pcode: 510000, name: "凉山彝族自治州", shortname: null },
    { code: 520000, pcode: null, name: "贵州省", shortname: "贵州" },
    { code: 520100, pcode: 520000, name: "贵阳市", shortname: null },
    { code: 520200, pcode: 520000, name: "六盘水市", shortname: null },
    { code: 520300, pcode: 520000, name: "遵义市", shortname: null },
    { code: 520400, pcode: 520000, name: "安顺市", shortname: null },
    { code: 520500, pcode: 520000, name: "毕节市", shortname: null },
    { code: 520600, pcode: 520000, name: "铜仁市", shortname: null },
    { code: 522300, pcode: 520000, name: "黔西南布依族苗族自治州", shortname: null },
    { code: 522600, pcode: 520000, name: "黔东南苗族侗族自治州", shortname: null },
    { code: 522700, pcode: 520000, name: "黔南布依族苗族自治州", shortname: null },
    { code: 530000, pcode: null, name: "云南省", shortname: "云南" },
    { code: 530100, pcode: 530000, name: "昆明市", shortname: null },
    { code: 530300, pcode: 530000, name: "曲靖市", shortname: null },
    { code: 530400, pcode: 530000, name: "玉溪市", shortname: null },
    { code: 530500, pcode: 530000, name: "保山市", shortname: null },
    { code: 530600, pcode: 530000, name: "昭通市", shortname: null },
    { code: 530700, pcode: 530000, name: "丽江市", shortname: null },
    { code: 530800, pcode: 530000, name: "普洱市", shortname: null },
    { code: 530900, pcode: 530000, name: "临沧市", shortname: null },
    { code: 532300, pcode: 530000, name: "楚雄彝族自治州", shortname: null },
    { code: 532500, pcode: 530000, name: "红河哈尼族彝族自治州", shortname: null },
    { code: 532600, pcode: 530000, name: "文山壮族苗族自治州", shortname: null },
    { code: 532800, pcode: 530000, name: "西双版纳傣族自治州", shortname: null },
    { code: 532900, pcode: 530000, name: "大理白族自治州", shortname: null },
    { code: 533100, pcode: 530000, name: "德宏傣族景颇族自治州", shortname: null },
    { code: 533300, pcode: 530000, name: "怒江傈僳族自治州", shortname: null },
    { code: 533400, pcode: 530000, name: "迪庆藏族自治州", shortname: null },
    { code: 540000, pcode: null, name: "西藏自治区", shortname: "西藏" },
    { code: 540100, pcode: 540000, name: "拉萨市", shortname: null },
    { code: 540200, pcode: 540000, name: "日喀则市", shortname: null },
    { code: 540300, pcode: 540000, name: "昌都市", shortname: null },
    { code: 540400, pcode: 540000, name: "林芝市", shortname: null },
    { code: 540500, pcode: 540000, name: "山南市", shortname: null },
    { code: 542400, pcode: 540000, name: "那曲地区", shortname: null },
    { code: 542500, pcode: 540000, name: "阿里地区", shortname: null },
    { code: 610000, pcode: null, name: "陕西省", shortname: "陕西" },
    { code: 610100, pcode: 610000, name: "西安市", shortname: null },
    { code: 610200, pcode: 610000, name: "铜川市", shortname: null },
    { code: 610300, pcode: 610000, name: "宝鸡市", shortname: null },
    { code: 610400, pcode: 610000, name: "咸阳市", shortname: null },
    { code: 610500, pcode: 610000, name: "渭南市", shortname: null },
    { code: 610600, pcode: 610000, name: "延安市", shortname: null },
    { code: 610700, pcode: 610000, name: "汉中市", shortname: null },
    { code: 610800, pcode: 610000, name: "榆林市", shortname: null },
    { code: 610900, pcode: 610000, name: "安康市", shortname: null },
    { code: 611000, pcode: 610000, name: "商洛市", shortname: null },
    { code: 620000, pcode: null, name: "甘肃省", shortname: "甘肃" },
    { code: 620100, pcode: 620000, name: "兰州市", shortname: null },
    { code: 620200, pcode: 620000, name: "嘉峪关市", shortname: null },
    { code: 620300, pcode: 620000, name: "金昌市", shortname: null },
    { code: 620400, pcode: 620000, name: "白银市", shortname: null },
    { code: 620500, pcode: 620000, name: "天水市", shortname: null },
    { code: 620600, pcode: 620000, name: "武威市", shortname: null },
    { code: 620700, pcode: 620000, name: "张掖市", shortname: null },
    { code: 620800, pcode: 620000, name: "平凉市", shortname: null },
    { code: 620900, pcode: 620000, name: "酒泉市", shortname: null },
    { code: 621000, pcode: 620000, name: "庆阳市", shortname: null },
    { code: 621100, pcode: 620000, name: "定西市", shortname: null },
    { code: 621200, pcode: 620000, name: "陇南市", shortname: null },
    { code: 622900, pcode: 620000, name: "临夏回族自治州", shortname: null },
    { code: 623000, pcode: 620000, name: "甘南藏族自治州", shortname: null },
    { code: 630000, pcode: null, name: "青海省", shortname: "青海" },
    { code: 630100, pcode: 630000, name: "西宁市", shortname: null },
    { code: 630200, pcode: 630000, name: "海东市", shortname: null },
    { code: 632200, pcode: 630000, name: "海北藏族自治州", shortname: null },
    { code: 632300, pcode: 630000, name: "黄南藏族自治州", shortname: null },
    { code: 632500, pcode: 630000, name: "海南藏族自治州", shortname: null },
    { code: 632600, pcode: 630000, name: "果洛藏族自治州", shortname: null },
    { code: 632700, pcode: 630000, name: "玉树藏族自治州", shortname: null },
    { code: 632800, pcode: 630000, name: "海西蒙古族藏族自治州", shortname: null },
    { code: 640000, pcode: null, name: "宁夏回族自治区", shortname: "宁夏" },
    { code: 640100, pcode: 640000, name: "银川市", shortname: null },
    { code: 640200, pcode: 640000, name: "石嘴山市", shortname: null },
    { code: 640300, pcode: 640000, name: "吴忠市", shortname: null },
    { code: 640400, pcode: 640000, name: "固原市", shortname: null },
    { code: 640500, pcode: 640000, name: "中卫市", shortname: null },
    { code: 650000, pcode: null, name: "新疆维吾尔自治区", shortname: "新疆" },
    { code: 650100, pcode: 650000, name: "乌鲁木齐市", shortname: null },
    { code: 650200, pcode: 650000, name: "克拉玛依市", shortname: null },
    { code: 650400, pcode: 650000, name: "吐鲁番市", shortname: null },
    { code: 650500, pcode: 650000, name: "哈密市", shortname: null },
    { code: 652300, pcode: 650000, name: "昌吉回族自治州", shortname: null },
    { code: 652700, pcode: 650000, name: "博尔塔拉蒙古自治州", shortname: null },
    { code: 652800, pcode: 650000, name: "巴音郭楞蒙古自治州", shortname: null },
    { code: 652900, pcode: 650000, name: "阿克苏地区", shortname: null },
    { code: 653000, pcode: 650000, name: "克孜勒苏柯尔克孜自治州", shortname: null },
    { code: 653100, pcode: 650000, name: "喀什地区", shortname: null },
    { code: 653200, pcode: 650000, name: "和田地区", shortname: null },
    { code: 654000, pcode: 650000, name: "伊犁哈萨克自治州", shortname: null },
    { code: 654200, pcode: 650000, name: "塔城地区", shortname: null },
    { code: 654300, pcode: 650000, name: "阿勒泰地区", shortname: null },
    { code: 659000, pcode: 650000, name: "自治区直辖县级行政区划", shortname: null },
    { code: 710000, pcode: null, name: "台湾省", shortname: "台湾" },
    { code: 810000, pcode: null, name: "香港特别行政区", shortname: "香港" },
    { code: 820000, pcode: null, name: "澳门特别行政区", shortname: "澳门" },
  ];

  vehColorOptions: Array<ColorModel> = [
    { value: 1, label: '蓝色' },
    { value: 2, label: '黄色' },
    { value: 3, label: '黑色' },
    { value: 4, label: '白色' },
    { value: 9, label: '其他' },
  ];

  vehPowerOptions: Array<PowerModel> = [
    { value: 11, label: '柴油' },
    { value: 12, label: '汽油' },
    { value: 13, label: '天然气' },
    { value: 14, label: '油气混' },
    { value: 21, label: '纯电' },
    { value: 22, label: '油电混' },
    { value: 23, label: '气电混' },
  ];

  platformOptions: Array<PlatformModel> = [
    { value: 1, label: '国六' },
    { value: 2, label: 'TBOX' },
    { value: 3, label: '新能源' },
  ];

  xzqhTree: Array<XzqhTreeModel>;

  constructor(private util: UtilService) {
    let tempTree = [];
    this.xzqhOptions.forEach((e: XzqhModel) => {
      if (e.code.toString().substr(2, 4) == '0000') {
        let province = new XzqhTreeModel();
        province.label = e.name;
        province.value = e.code;
        province.isLeaf = (e.code == 710000 || e.code == 810000 || e.code == 820000) ? true : false;
        province.children = [];
        tempTree.push(province);
      }
    });
    tempTree.forEach((e: XzqhTreeModel) => {
      let cities = this.xzqhOptions.filter((f: XzqhModel) => {
        return f.pcode == e.value;
      });
      e.children = cities.map((x: XzqhModel) => {
        let city = new XzqhTreeModel();
        city.label = x.name;
        city.value = x.code;
        city.isLeaf = true;
        return city;
      });
    });
    this.xzqhTree = tempTree;
  }

  getXzqhArray(code: number) {
    if (this.util.isNull(code)) {
      return [];
    } else {
      let city: XzqhModel = this.xzqhOptions.filter((e: XzqhModel) => {
        return e.code == code;
      })[0];
      if (city.code == 710000 || city.code == 810000 || city.code == 820000) {
        return [city.name];
      } else {
        let province: XzqhModel = this.xzqhOptions.filter((e: XzqhModel) => {
          return e.code == city.pcode;
        })[0];
        return [province.name, city.name];
      }
    }
  }
  getXzqhString(code: number) {
    if (this.util.isNull(code)) {
      return '--';
    } else {
      let city: XzqhModel = this.xzqhOptions.filter((e: XzqhModel) => {
        return e.code == code;
      })[0];
      if (city.code == 710000 || city.code == 810000 || city.code == 820000) {
        return city.name;
      } else {
        let province: XzqhModel = this.xzqhOptions.filter((e: XzqhModel) => {
          return e.code == city.pcode;
        })[0];
        return province.name + '-' + city.name;
      }
    }
  }

}
