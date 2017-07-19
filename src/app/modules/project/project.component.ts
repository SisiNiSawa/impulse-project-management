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
  displayModuleInfo: boolean = false;
  selectedModule: any;

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
    } else if (module.type === "todo") {
      this.dbService.addNewTodoModule(this.project._id, module);
      this.project.modules.push(module);
    }
    this.cancelModule();
  }

  moveToModule(module: any) {
    this.sidebarService.onSelectItem(module);
  }

  removeModule(event: Event, module: any) {
    event.stopPropagation();
    if (module.type === "kanban") {
      this.dbService.removeKanbanModule(module._id, this.project._id).then( () => {
        this.sidebarService.removeByID(module._id);
      });
    } else if (module.type === "markdown") {
      this.dbService.removeEntryByID(module._id).then( () => {
        this.dbService.removeModuleFromProject(module._id, this.project._id);
      }).then( () => {
        this.sidebarService.removeByID(module._id);
      });
    }
  }

  onSelectModule(module: any) {
    this.selectedModule = module;
    this.displayModuleInfo = true;
  }

}
