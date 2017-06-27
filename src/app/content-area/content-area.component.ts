import { Component, OnInit, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';

import { Observable } from "rxjs/Observable";

import { Kanban } from "../shared/kanban.model";

import { SidebarService } from '../sidebar/sidebar.service';
import { KanbanComponent } from '../modules/kanban/kanban.component';
import { MarkdownComponent } from '../modules/markdown/markdown.component';
import { DefaultComponent } from '../modules/default/default.component';
import { ProjectComponent } from '../modules/project/project.component';

@Component({
  selector: 'app-content-area',
  templateUrl: './content-area.component.html',
  styleUrls: ['./content-area.component.css']
})
export class ContentAreaComponent implements OnInit {

  selectedItem: any;

  constructor(
    private viewContainer: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private sidebarService: SidebarService) {

    }

  ngOnInit() {
    this.loadDefaultModule();
  }

  ngAfterViewInit() {
    this.sidebarService.obsv.subscribe(
      (event: any) => {
        if (event === "itemChanged") {
          this.onChangeItem(this.sidebarService.selectedItem);
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
      this.loadKanbanModule();
    } else if (this.selectedItem.type === "markdown") {
      this.loadMarkdownModule();
    } else if (this.selectedItem.type === "project") {
      this.loadProjectModule();
    } else {
      this.loadDefaultModule();
    }
  }

  clearContentArea() {
    // for now, just clear the view area
    // maybe in the future ask if user wants to save? idk
    this.viewContainer.clear();
  }

  // why do I keep digging myself further into this hole?
  // dry up this code later

  loadProjectModule() {
    this.clearContentArea()

    let component = this.componentFactoryResolver.resolveComponentFactory(ProjectComponent);
    let componentRef = this.viewContainer.createComponent(component);

  }

  loadKanbanModule() {
    this.clearContentArea();

    let component = this.componentFactoryResolver.resolveComponentFactory(KanbanComponent);
    let componentRef = this.viewContainer.createComponent(component);
  }

  loadMarkdownModule() {
    this.clearContentArea();

    let component = this.componentFactoryResolver.resolveComponentFactory(MarkdownComponent);
    let componentRef = this.viewContainer.createComponent(component);
  }

  loadDefaultModule() {
    this.clearContentArea();

    let component = this.componentFactoryResolver.resolveComponentFactory(DefaultComponent);
    let componentRef = this.viewContainer.createComponent(component);
  }

  onChangedItem() {
    console.log("item changed");
  }

}
