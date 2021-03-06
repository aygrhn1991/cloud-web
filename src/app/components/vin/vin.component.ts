import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';
import { HttpClient } from '@angular/common/http';
import { Result } from 'src/app/models/result.model';

@Component({
  selector: 'app-vin',
  templateUrl: './vin.component.html',
  styleUrls: ['./vin.component.css']
})
export class VinComponent implements OnInit {

  @Input() vin: string;
  @Input() vid: string;
  @Input() platform: number;
  @Output() vinChange = new EventEmitter();
  @Output() vidChange = new EventEmitter();

  options = [];

  constructor(private util: UtilService,
    private http: HttpClient) { }

  ngOnInit() { }

  onChange(value: string): void {
    if (this.util.isNull(value)) {
      this.vid = null;
      this.vidChange.emit(this.vid);
      return;
    }
    this.http.get(`/iov/iov/comp/getVinTop10/${value}`).subscribe((data: Result) => {
      this.options = data.data;
      if (this.options.filter(e => { return e.C_VIN == this.vin }).length == 0) {
        this.vid = null;
        this.vidChange.emit(this.vid);
        return;
      }
      this.options.forEach(e => {
        if (e.C_VIN == this.vin) {
          this.vid = e.C_ID;
          this.vidChange.emit(this.vid);
        }
      });
    });
    this.vinChange.emit(this.vin);
  }

}
