import { Component, OnInit, ViewContainerRef, ComponentFactoryResolver, ComponentRef } from '@angular/core';

import { Observable } from "rxjs/Observable";

import { Kanban } from "../shared/kanban.model";

import { SidebarService } from '../sidebar/sidebar.service';
import { KanbanComponent } from '../modules/kanban/kanban.component';
import { MarkdownComponent } from '../modules/markdown/markdown.component';
import { TodoComponent } from '../modules/todo/todo.component';
import { DefaultComponent } from '../modules/default/default.component';
import { ProjectComponent } from '../modules/project/project.component';

import { WizardComponent } from '../wizard/wizard.component';

@Component({
  selector: 'app-content-area',
  templateUrl: './content-area.component.html',
  styleUrls: ['./content-area.component.css']
})
export class ContentAreaComponent implements OnInit {

  selectedItem: any;
  currentComponent: ComponentRef<any>;

  constructor(
    private viewContainer: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private sidebarService: SidebarService) {
    }

  ngOnInit() {
    this.changeContentArea(DefaultComponent);
  }

  ngAfterViewInit() {
    this.sidebarService.obsv.subscribe(
      (event: any) => {
        if (event === "itemChanged") {
          this.onChangeItem(this.sidebarService.selectedItem);
        } else if (event === "projectWizard") {
          this.changeContentArea(WizardComponent);
        } else if (event === "noItem") {
          this.changeContentArea(DefaultComponent);
        }
      }
    )
  }

  onChangeItem(item: any) {
    if (this.selectedItem === item) {
      return;
    }
    this.selectedItem = item;
    if (this.selectedItem.type === "kanban") {
      this.changeContentArea(KanbanComponent);
    } else if (this.selectedItem.type === "markdown") {
      this.changeContentArea(MarkdownComponent);
    } else if (this.selectedItem.type === "todo") {
      this.changeContentArea(TodoComponent);
    } else if (this.selectedItem.type === "project") {
      this.changeContentArea(ProjectComponent);
    } else {
      this.changeContentArea(DefaultComponent);
    }
  }

  clearContentArea() {
    if (this.currentComponent) {
      this.currentComponent.destroy();
    }
    this.viewContainer.clear();
  }

  changeContentArea(component) {
    this.clearContentArea();
    let comp = this.componentFactoryResolver.resolveComponentFactory(component);
    let compRef = this.viewContainer.createComponent(comp);
    this.currentComponent = compRef;
  }

  onChangedItem() {
    console.log("item changed");
  }

}
