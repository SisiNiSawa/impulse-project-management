import { Component, OnInit, Input } from '@angular/core';

import { DatabaseService } from '../../../database.service';
import { SidebarService } from '../../../sidebar/sidebar.service';

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
  @Input() projectID: string;
  prettyModuleType: string;
  prettyDate: string;
  displayConfirmDelete: boolean = false;
  displayEditMode: boolean = false;

  newName: string;
  newIcon: string;

  constructor(
    private dbService: DatabaseService,
    private sidebarService: SidebarService
  ) {

  }

  ngOnInit() {
    this.newName = this.module.name;
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

  toggleConfirmDelete() {
    this.displayEditMode = false;
    this.displayConfirmDelete = !this.displayConfirmDelete;
  }

  deleteModule(id: string) {
    let s: boolean;
    let index: number;
    this.dbService.getEntryByID(this.projectID).then( (project) => {
      // remove the module from the project array
      for (let i = 0; i < project.modules.length; i++) {
        if (project.modules[i] === id) {
          s = true;
          index = i;
          project.modules.splice(i, 1);
          break;
        }
      }
      // make sure we removed the module from the project array
      if (s === true) {
        this.dbService.updateItem(project).then( () => {
          this.dbService.removeEntryByID(id);
          // update the sidebar
          for (let i = 0; i < this.sidebarService.projects.length; i++) {
            if (this.sidebarService.projects[i]._id === project._id) {
              this.sidebarService.projects[i].modules.splice(index, 1);
              this.sidebarService.projects.modules.splice(index, 1);
              this.sidebarService.updateProjects();
            }
          }
        });
      } else {
        console.log("Error: Could not find module ID in project.");
      }
    });
    this.toggleConfirmDelete();
  }

  toggleDisplayModuleEdit() {
    this.displayConfirmDelete = false;
    this.displayEditMode = !this.displayEditMode;
  }

  updateModule() {
    this.displayEditMode = false;
    this.module.name = this.newName;
    this.module.icon = this.newIcon;
    this.dbService.updateItem(this.module);
  }

  selectIcon(event: Event) {
    this.newIcon = String(event);
    console.log(this.newIcon);
  }

}
