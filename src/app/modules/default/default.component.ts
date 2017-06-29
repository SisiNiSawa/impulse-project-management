import { Component, OnInit } from '@angular/core';

import { SidebarService } from '../../sidebar/sidebar.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {

  constructor(
    private sidebarService: SidebarService
  ) { }

  firstTime: boolean = false;

  ngOnInit() {
    if (!this.sidebarService.projects) {
      this.firstTime = true;
    }
  }

  projectWizard() {
    this.sidebarService.initProjectWizard();
  }

}
