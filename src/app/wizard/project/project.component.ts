import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { DatabaseService } from '../../database.service';
import { SidebarService } from '../../sidebar/sidebar.service';
import { Project } from '../../shared/project.model';

@Component({
  selector: 'app-wizard-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class WizardProjectComponent implements OnInit {

  @Output() newProject: EventEmitter<any> = new EventEmitter();
  @Output() next: EventEmitter<any> = new EventEmitter();

  project: Project;

  constructor(
    private dbService: DatabaseService,
    private sidebarService: SidebarService
  ) { }

  ngOnInit() {
    this.project = new Project;
    this.project.icon = "";
  }

  nextStep() {
    if (!this.project.name || !this.project.icon) {
      return;
    }
    this.next.emit();
    this.createProject();
  }

  createProject() {
    this.project._id = String(Date.now());
    this.project.order = this.sidebarService.projects.length + 1;
    this.newProject.emit(this.project);
  }

  selectIcon(event: Event) {
    this.project.icon = String(event);
  }

  cancelCreation() {
    this.sidebarService.onSelectNothing();
  }

}
