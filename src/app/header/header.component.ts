import { Component, OnInit } from '@angular/core';

import { PopupService } from '../popup.service';
import { SidebarService } from '../sidebar/sidebar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: []
})
export class HeaderComponent implements OnInit {

  constructor(private popupService: PopupService,
              private sidebarService: SidebarService) { }

  ngOnInit() {
  }

  newProject() {
    this.popupService.newProjectPopup();
  }

  newModule() {
    if (!this.sidebarService.selectedItem) {
      return;
    }
    this.popupService.newModulePopup();
  }

}
