import { Component, OnInit } from '@angular/core';

import { SidebarService } from '../../sidebar/sidebar.service';
import { DatabaseService } from "../../database.service";
import { PopupService } from '../../popup.service';

import { Kanban } from '../../shared/kanban.model';
import { Project } from '../../shared/project.model';
import { Markdown } from '../../shared/markdown.model';

@Component({
  selector: 'app-module-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewModuleComponent implements OnInit {

  project: Project;

  moduleName: string;
  moduleIcon: string = "fa-columns";
  moduleType: string;

  moduleTypes = [
    "Kanban Board",
    "Markdown Editor",
    "Todo List"
  ];

  constructor(private dbService: DatabaseService,
              private sidebarService: SidebarService,
              private popupService: PopupService) {
    this.project = this.sidebarService.selectedItem;
  }

  ngOnInit() {}

  createNewModule() {
    if (this.moduleType === "Kanban Board") {
      this.createKanbanBoard();
    } else if (this.moduleType === "Markdown Editor") {
      this.createMarkdownEditor();
    }
    this.clearPopups();
  }

  createKanbanBoard() {
    let kanban = new Kanban();
    kanban._id = String(Date.now());
    kanban.name = this.moduleName;
    kanban.icon = this.moduleIcon;
    this.dbService.addNewKanbanModule(this.project._id, kanban);
    this.updateProjects(kanban);
  }

  createMarkdownEditor() {
    let markdown = new Markdown();
    markdown._id = String(Date.now());
    markdown.name = this.moduleName;
    markdown.icon = this.moduleIcon;
    this.dbService.addNewMarkdownModule(this.project._id, markdown);
    this.updateProjects(markdown);
  }

  updateProjects(updatedItem: any) {
    let index = -1;
    for (let i = 0; i < this.sidebarService.projects.length; i++) {
      if (this.sidebarService.projects[i]._id === this.project._id) {
        this.sidebarService.projects[i].modules.push(updatedItem);
      }
    }
  }

  clearPopups() {
    this.popupService.clearPopups();
  }

}
