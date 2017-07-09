import { Component, OnInit } from '@angular/core';

import { SidebarService } from '../../sidebar/sidebar.service';
import { DatabaseService } from '../../database.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  project;
  displayModuleCreation: boolean = false;

  constructor(
    private sidebarService: SidebarService,
    private dbService: DatabaseService
  ) {
    this.project = this.sidebarService.selectedItem;
  }

  ngOnInit() {
  }

  toggleDisplayModule() {
    this.displayModuleCreation = true;
  }

  cancelModule() {
    this.displayModuleCreation = false;
  }

  createModule(module) {
    if (module.type === "kanban") {
      this.dbService.addNewKanbanModule(this.project._id, module);
      this.project.modules.push(module);
    } else if (module.type === "markdown") {
      this.dbService.addNewMarkdownModule(this.project._id, module);
      this.project.modules.push(module);
    }
    this.moveToModule(module);
    this.cancelModule();
  }

  moveToModule(module: any) {
    setTimeout( () => {
      this.sidebarService.onSelectItem(module);
    }, 150)
  }

}
