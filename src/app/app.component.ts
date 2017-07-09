import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';

import { DatabaseService } from "./database.service";
// preload components for popups
import { NewProjectComponent } from "./project/new/new.component";
import { NewModuleComponent } from './modules/new/new.component';
import { KanbanComponent } from './modules/kanban/kanban.component';
import { KanbanItemViewComponent } from './modules/kanban/item/view/view.component';
import { DefaultComponent } from './modules/default/default.component';
import { ProjectComponent } from './modules/project/project.component';
import { MarkdownComponent } from './modules/markdown/markdown.component';
import { WizardComponent } from './wizard/wizard.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', '../assets/css/prism.css'],
  encapsulation: ViewEncapsulation.None,
  entryComponents: [NewProjectComponent, NewModuleComponent, KanbanComponent, KanbanItemViewComponent, DefaultComponent, ProjectComponent, MarkdownComponent, WizardComponent]

})
export class AppComponent implements OnInit {

  constructor() {}

  ngOnInit() {

  }

}
