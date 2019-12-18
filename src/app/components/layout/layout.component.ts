import { Component, OnInit } from '@angular/core';
import { NavService } from 'src/app/services/nav.service';
import { fromEvent } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  contentStyle = {
    height: window.innerHeight - 64 - 26 + 'px',
    overflow: 'auto',
  };
  siderStyle = {
    height: window.innerHeight - 64 + 'px',
    overflow: 'auto',
  };

  constructor(public navService: NavService,
    public userService: UserService,
    private router: Router,
    public configService: ConfigService) { }

  ngOnInit() {
    fromEvent(window, 'resize').subscribe(() => {
      this.siderStyle.height = window.innerHeight - 64 + 'px';
      this.contentStyle.height = window.innerHeight - 64 - 26 + 'px';
    })
  }

  //#region 注销
  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('access_url');
    localStorage.removeItem('access_user');
    this.router.navigate(['/login']);
  }
  //#endregion

}
