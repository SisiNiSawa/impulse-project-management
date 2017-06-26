import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
// import { Observer } from 'rxjs/Observer';

@Injectable()
export class PopupService implements OnInit {

  public obsv: Observable<any>;
  public observer;

  ngOnInit() {

  }

  constructor() {
    this.obsv = new Observable(observer => {
      this.observer = observer;
    });
  }

  newProjectPopup() {
    this.observer.next({type: "newProjectPopup"});
  }

  newModulePopup() {
    this.observer.next({type: "newModulePopup"});
  }

  viewKanbanItemInfo(item, cardID) {
    this.observer.next({type: "viewKanbanItemInfo", item: item, cardID: cardID});
  }

  clearPopups() {
    this.observer.next({type: "clearPopups"});
  }
}
