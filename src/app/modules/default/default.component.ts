import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Rx';

import { SidebarService } from '../../sidebar/sidebar.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {

  hint: string;
  hintN: number;
  hintArray: string[] = [
    "Create more modules for your project by clicking on it in the sidebar",
    "Markdown syntax is supported in kanban items! Give it a try.",
    "Donec cursus risus id felis fermentum viverra.",
    "Duis vitae justo dolor.",
    "Donec eu est ultricies, laoreet diam in, malesuada enim.",
    "Integer in risus pulvinar, posuere diam sed, pellentesque magna."
  ];

  constructor(
    private sidebarService: SidebarService
  ) { }

  firstTime: boolean = false;
  obsv;

  ngOnInit() {
    if (!this.sidebarService.projects) {
      this.firstTime = true;
    }
    this.randomizeHint();
    this.obsv = Observable.interval(8000).subscribe(observer => {
      this.randomizeHint();
    });
  }

  projectWizard() {
    this.sidebarService.initProjectWizard();
  }

  randomizeHint() {
    let n: number;
    let max = this.hintArray.length;
    while (n === this.hintN) {
      n = Math.floor(Math.random() * max);
    }
    this.hint = this.hintArray[n];
  }

  ngOnDestroy() {
    this.obsv.unsubscribe();
  }

}
