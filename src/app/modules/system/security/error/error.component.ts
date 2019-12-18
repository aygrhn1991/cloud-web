import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  message: string = '错误页';

  constructor(private route: ActivatedRoute,
    private util: UtilService) { }

  ngOnInit() {
    this.route.params.subscribe((params: ParamMap) => {
      let m = params['message'];
      this.message = this.util.isNull(m) ? this.message : m;
    });
  }

}
