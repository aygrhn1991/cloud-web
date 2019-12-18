import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-cmdview-g6",
  templateUrl: "./cmdview-g6.component.html",
  styleUrls: ["./cmdview-g6.component.css"]
})
export class CmdviewG6Component implements OnInit {
  vids = [];
  constructor() {}

  ngOnInit() {}

  onVidsChanged(vids) {
    this.vids = vids;
  }
}
