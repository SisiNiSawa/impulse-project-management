import { Component, Directive, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { Observable } from "rxjs/Observable";

import { PopupService } from './popup.service';

import { NewProjectComponent } from './project/new/new.component';
import { NewModuleComponent } from './modules/new/new.component';
import { KanbanItemViewComponent} from './modules/kanban/item/view/view.component';

// @Directive({
//   selector: '[app-popup]',
// })
@Component({
  selector: 'app-popup',
  template: `<div></div>`
})

export class PopupDirective {


  constructor(
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private popupService: PopupService) {}

  clearPopups() {
    this.viewContainerRef.clear();
  }

  newProjectPopup() {
    this.clearPopups();

    let component = this.componentFactoryResolver.resolveComponentFactory(NewProjectComponent);
    let componentRef = this.viewContainerRef.createComponent(component);
  }

  newModulePopup() {
    this.clearPopups();

    let component = this.componentFactoryResolver.resolveComponentFactory(NewModuleComponent);
    let componentRef = this.viewContainerRef.createComponent(component);
  }

  viewKanbanItemInfo(item, cardID) {
    this.clearPopups();

    let component = this.componentFactoryResolver.resolveComponentFactory(KanbanItemViewComponent);
    let componentRef = this.viewContainerRef.createComponent(component);
    componentRef.instance.item = item;
    componentRef.instance.cardID = cardID;
  }

  // listen to popupservice to tell us what to display to the user
  // we can't reference the popupdirective directly so we have to use this
  //service as a middleman to tell us what to do
  ngAfterViewInit() {
    this.popupService.obsv.subscribe(
      (event: any) => {
        if (event.type === "newProjectPopup") {
          this.newProjectPopup();
        } else if (event.type === "newModulePopup") {
          this.newModulePopup();
        } else if (event.type === "viewKanbanItemInfo") {
          this.viewKanbanItemInfo(event.item, event.cardID);
        } else if (event.type === "clearPopups") {
          this.clearPopups();
        }
      }
    );
  }

}
