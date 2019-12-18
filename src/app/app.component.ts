import { Component, OnInit, Inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NavService } from './services/nav.service';
import { UtilService } from './services/util.service';
import { UserService } from './services/user.service';
import { Title } from '@angular/platform-browser';
import { ConfigService } from './services/config.service';
import { ConfigModel } from './models/config.model';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private router: Router,
    private navService: NavService,
    private userService: UserService,
    private util: UtilService,
    private configService: ConfigService,
    private title: Title,
    @Inject(DOCUMENT) private document: HTMLDocument) { }

  ngOnInit() {
    this.configService.getConfig().subscribe((data: ConfigModel) => {
      this.configService.config = data;
      this.title.setTitle(this.configService.config.web_title);
      this.document.getElementById('favicon').setAttribute('href', this.configService.config.web_favicon);
    });
    if (!this.util.isNull(localStorage.getItem('access_token'))) {
      this.navService.navList = this.navService.getNav();
      this.userService.currentUser = this.userService.getUser();
    }
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
    ).subscribe((event: NavigationEnd) => {
      this.navService.handleNavSelected(event.urlAfterRedirects);
      this.navService.handleNavPath();
    });
  }

}
