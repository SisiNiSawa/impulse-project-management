import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

@Injectable()
export class SidebarService {

  public obsv: Observable<any>;
  public observer;
  projects;

  constructor() {
    this.obsv = new Observable(observer => {
      this.observer = observer;
    });
  }

  public selectedItem: any;

  onSelectItem(item: any) {
    this.selectedItem = item;
    this.observer.next("itemChanged");
  }

  updateProjects() {
    this.observer.next("updateProjects");
  }

}
