import { Component, OnInit } from '@angular/core';

import { SidebarService } from '../../sidebar/sidebar.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  project;

  constructor(
    private sidebarService: SidebarService
  ) {
    this.project = this.sidebarService.selectedItem;
  }

  ngOnInit() {
  }

}
