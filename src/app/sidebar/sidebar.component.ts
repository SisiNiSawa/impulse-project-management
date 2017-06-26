import { Component, OnInit, Output, EventEmitter, OnChanges } from '@angular/core';
import { Observable } from "rxjs/Observable";

import { DatabaseService } from '../database.service';
import { SidebarService } from "./sidebar.service";
import { PopupService } from '../popup.service';

import { Project } from '../shared/project.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  // stores the projects array from the database
  projects: Project[] = [];
  // stores the selected item locally
  selectedItem;
  selectedType;
  // stores the hovered item locally
  hoverItem;
  dropdownVisible: boolean = false;
  mouseHasEntered: boolean = false;

  constructor(
    private dbService : DatabaseService,
    private sidebarService: SidebarService,
    private popupService: PopupService) {
      this.initializeProjects();
  }

  ngOnInit() {
    this.sidebarService.projects = this.projects;
  }

  ngAfterViewInit() {
    this.sidebarService.obsv.subscribe( (event) => {
      if (event === "updateProjects") {
        this.projects = this.sidebarService.projects;
      }
    });
  }

  loadProjects() {
    return this.dbService.getEntriesOfType("project").then( (projects) => {
      return projects.docs;
    });
  }

  loadProjectModules(project: Project) {
    return Promise.all(project.modules.map( (module) => {
      return this.dbService.getEntryByID(module);
    })).then ( (modulesArray) => {
      return modulesArray;
    });
  }

  initializeProjects() {
    let n;
    this.loadProjects().then( (projects) => {
      for (let i = 0; i < projects.length; i++) {
        this.loadProjectModules(projects[i]).then( (modulesArray) => {
          n = i;
          projects[n].modules = modulesArray;
          this.projects.push(projects[n]);
        });
      }
    }).catch( (err) => {
      console.log(err);
    });
  }

  onSelectItem(item: any) {
    // this.sidebarService.selectedItem = item;
    console.log(item);
    this.selectedItem = item._id;
    this.selectedType = item.type;
    this.sidebarService.onSelectItem(item);
  }

  onMouseHover(event: Event, item: any) {
    if (event.type == "mouseenter") {
      this.hoverItem = item._id;
    } else if (event.type == "mouseleave") {
      this.hoverItem = "";
    } else {
      console.log("What the fuck?");
    }
  }

  toggleMenu() {
    this.dropdownVisible = !this.dropdownVisible;
  }

  mouseEnterMenu() {
    this.mouseHasEntered = true;
  }

  mouseLeaveMenu() {
    if (this.mouseHasEntered) {
      this.dropdownVisible = false;
    }
  }

  newProject() {
    this.popupService.newProjectPopup();
  }

  newModule() {
    if (this.selectedType === "project") {
      this.popupService.newModulePopup();
    }
  }

}
