import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { NzNotificationService } from 'ng-zorro-antd';
import { UtilService } from 'src/app/services/util.service';
import { LoginModel } from 'src/app/models/login.model';
import { Result2 } from 'src/app/models/result.model';
import { NavService } from 'src/app/services/nav.service';
import { Md5 } from 'ts-md5';
import { UserService } from 'src/app/services/user.service';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private util: UtilService,
    private http: HttpService,
    private notification: NzNotificationService,
    private router: Router,
    private navService: NavService,
    private userService: UserService,
    public configService: ConfigService) { }

  ngOnInit() {
    this.createCode();
  }

  //#region 登录
  isLoading: boolean = false;
  loginModel: LoginModel = new LoginModel();
  login(): void {
    if (this.util.isNull(this.loginModel.account) || this.util.isNull(this.loginModel.password)) {
      this.notification.error('请填写用户名和密码', null);
      return;
    }
    if (this.util.isNull(this.loginModel.code) || this.loginModel.code.toString() != this._code) {
      this.notification.error('验证码错误', null);
      return;
    }
    this.isLoading = true;
    this.http.login(this.loginModel.account, Md5.hashStr(this.loginModel.password).toString()).subscribe((data: Result2) => {
      if (data.successed) {
        localStorage.setItem('access_token', data.data);
        this.http.getPages().subscribe((data: Result2) => {
          localStorage.setItem('access_url', JSON.stringify(this.navService.makeNav(data.data)));
          this.navService.navList = this.navService.getNav();
          this.http.getUser().subscribe((d: Result2) => {
            localStorage.setItem('access_user', JSON.stringify(this.userService.makeUser(d.data)));
            this.userService.currentUser = this.userService.getUser();
            this.router.navigate(['/index']);
          })
        });
      } else {
        this.createCode();
        this.notification.error(data.msg, null);
      }
      this.isLoading = false;
    }, () => {
      this.isLoading = false;
    });
  }
  //#endregion

  //#region 生成验证码
  _code: string = '';
  @ViewChild('codeCanvas', null) canvasRef: ElementRef;
  createCode(): void {
    this._code = '';
    let ctx: CanvasRenderingContext2D = this.canvasRef.nativeElement.getContext('2d');
    let width = this.canvasRef.nativeElement.width;
    let height = this.canvasRef.nativeElement.height;
    ctx.textBaseline = 'top';
    //绘制背景色
    ctx.fillStyle = this.randomColor(180, 240);
    ctx.fillRect(0, 0, width, height);
    //绘制文字
    let str = '1234567890';
    for (let i = 0; i < 4; i++) {
      let txt = str[this.randomNum(0, str.length - 1)];
      ctx.fillStyle = this.randomColor(60, 180);
      ctx.font = '20pt SimHei';
      let x = 10 + i * 20;
      let y = 0;
      let deg = this.randomNum(-30, 30);
      this._code += txt;
      //修改坐标原点和旋转角度
      ctx.translate(x, y);
      ctx.rotate(deg * Math.PI / 180);
      ctx.fillText(txt, 0, 0);
      //恢复坐标原点和旋转角度
      ctx.rotate(-deg * Math.PI / 180);
      ctx.translate(-x, -y);
    }
    //绘制干扰线
    for (let i = 0; i < 4; i++) {
      ctx.strokeStyle = this.randomColor(60, 180);
      ctx.beginPath();
      ctx.moveTo(this.randomNum(0, width), this.randomNum(0, height));
      ctx.lineTo(this.randomNum(0, width), this.randomNum(0, height));
      ctx.stroke();
    }
    //绘制干扰点
    for (let i = 0; i < 50; i++) {
      ctx.fillStyle = this.randomColor(0, 255);
      ctx.beginPath();
      ctx.arc(this.randomNum(0, width), this.randomNum(0, height), 1, 0, 2 * Math.PI);
      ctx.fill();
    }
  };
  randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  randomColor(min, max) {
    let r = this.randomNum(min, max);
    let g = this.randomNum(min, max);
    let b = this.randomNum(min, max);
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  }
  //#endregion


}
