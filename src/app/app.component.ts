import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { MenuService } from './services/menu.service';
import { ConfigService } from './services/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private router: Router,
    public menuService: MenuService,
    public configService: ConfigService) { }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
    ).subscribe((event: NavigationEnd) => {
      this.menuService.matchMenu(event.urlAfterRedirects);
    });
  }

}
