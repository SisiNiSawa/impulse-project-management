import { Component, OnInit } from '@angular/core';

import { Project } from "../../shared/project.model";

import { DatabaseService } from "../../database.service";
import { SidebarService } from '../../sidebar/sidebar.service';
import { PopupService } from '../../popup.service';

@Component({
  selector: 'app-project-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewProjectComponent implements OnInit {

  project = new Project();

  constructor(
    private dbService : DatabaseService,
    private popupService: PopupService,
    private sidebarService: SidebarService) {}

  ngOnInit() {
  }

  createProject() {
    // generate an id for the project
    this.project._id = String(Date.now());
    this.project.order = this.sidebarService.projects.length + 1;
    this.dbService.addNewProject(this.project);
    // add to sidebar projects instance and fire Observable
    this.sidebarService.projects.push(this.project);
    this.sidebarService.updateProjects();
    this.clearPopups();
  }

  clearPopups() {
    this.popupService.clearPopups();
  }

}
