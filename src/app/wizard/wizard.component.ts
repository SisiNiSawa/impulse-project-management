import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { WizardProjectComponent } from './project/project.component';
import { WizardModuleComponent } from './module/module.component';
import { DatabaseService } from '../database.service';
import { SidebarService } from '../sidebar/sidebar.service';

import { Project } from '../shared/project.model';
// import { Kanban } from '../shared/kanban.model';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.css']
})
export class WizardComponent implements OnInit {

  @ViewChild(WizardProjectComponent, {read: ElementRef}) wizardProject: ElementRef;
  @ViewChild(WizardModuleComponent, {read: ElementRef}) wizardModule: ElementRef;

  project: Project;
  module: any;

  constructor(
    private dbService: DatabaseService,
    private sidebarService: SidebarService) {

  }

  ngOnInit() {
  }

  nextModuleStep() {
    this.wizardProject.nativeElement.style.opacity = 0;
    this.wizardProject.nativeElement.style.marginLeft = "-1000px";
    this.wizardModule.nativeElement.style.display = "inline-block";
    setTimeout( () => {
      this.wizardModule.nativeElement.style.opacity = 1;
      this.wizardModule.nativeElement.style.marginLeft = 0;
    }, 50);
  }

  backProjectStep() {
    this.wizardModule.nativeElement.style.opacity = 0;
    this.wizardModule.nativeElement.style.marginLeft = "1000px";
    this.wizardProject.nativeElement.style.display = "inline-block";
    setTimeout( () => {
      this.wizardProject.nativeElement.style.opacity = 1;
      this.wizardProject.nativeElement.style.marginLeft = 0;
    }, 50);
  }

  newProject(event: Project) {
    this.project = event;
  }

  newModule(event: any) {
    this.module = event;
    this.finalizeWizard();
  }

  finalizeWizard() {
    if (this.module && this.project) {
      this.dbService.addNewProject(this.project).then( () => {
        if (this.module.type === "kanban") {
          this.dbService.addNewKanbanModule(this.project._id, this.module);
          this.sidebarService.projects.push(this.project);
          this.updateProjects(this.module);
          this.moveToModule(this.module._id);
        }
      });
    }
  }

  // hacky, move this to the sidebar service
  updateProjects(updatedItem: any) {
    let index = -1;
    for (let i = 0; i < this.sidebarService.projects.length; i++) {
      if (this.sidebarService.projects[i]._id === this.project._id) {
        this.sidebarService.projects[i].modules.push(updatedItem);
      }
    }
  }

  moveToModule(id: string) {
    setTimeout( () => {
      this.sidebarService.onSelectItem(this.module);
    }, 50);
  }

}
