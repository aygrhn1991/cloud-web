import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-cmdview-tbox",
  templateUrl: "./cmdview-tbox.component.html",
  styleUrls: ["./cmdview-tbox.component.css"]
})
export class CmdviewTboxComponent implements OnInit {
  vids = [];
  cmdType = 1;
  constructor() {}

  ngOnInit() {}

  onVidsChanged(vids) {
    this.vids = vids;
  }
}
