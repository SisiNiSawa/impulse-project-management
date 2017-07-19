import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-project-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class ProjectInfoComponent implements OnInit {

  module: any;
  @Input() set _module(value: any) {
    this.module = value;
    this.parseModuleData();
  }
  prettyModuleType: string;
  prettyDate: string;

  constructor() {

  }

  ngOnInit() {
  }

  parseModuleData() {
    this.prettifyModuleType();
  }

  prettifyModuleType() {
    if (this.module.type === "kanban") {
      this.prettyModuleType = "Kanban Board"
    } else if (this.module.type === "markdown") {
      this.prettyModuleType = "Markdown Editor"
    } else if (this.module.type === "todo") {
      this.prettyModuleType === "Todo List"
    } else {
      console.log("err: module type not listed.")
    }
  }

}
