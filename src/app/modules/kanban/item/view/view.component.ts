import { Component, OnInit } from '@angular/core';

import { DatabaseService } from '../../../../database.service';
import { PopupService } from '../../../../popup.service';
import { KanbanService } from '../../kanban.service';

import { KanbanItem } from '../../../../shared/kanban-item.model';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class KanbanItemViewComponent implements OnInit {

  item: KanbanItem;
  viewItem: KanbanItem;
  cardID: string;
  showDropdown: boolean = false;

  itemColors: string[] = [
    "#B15C5C",
    "#4A8D4A",
    "#455078",
    "#B1975C",
    "#544579",
    "#904B6F",
    "#ACB05C",
    "#3F7861",
  ];

  constructor(
      private popupService: PopupService,
      private dbService: DatabaseService,
      private kanbanService: KanbanService
  ) { }

  ngOnInit() {
    this.dbService.getEntryByID(this.item._id).then( (returnedItem) => {
      this.viewItem = returnedItem;
    });
  }

  clearPopups() {
    this.popupService.clearPopups();
  }

  updateItem() {
    this.dbService.updateKanbanItem(this.viewItem);
    // this shit is ghetto but it works
    this.item.description = this.viewItem.description;
    this.item.shortDescription = this.viewItem.shortDescription;
    this.clearPopups();
  }

  removeItem() {
    this.dbService.removeEntryByID(this.viewItem._id);
    this.dbService.kanbanRemoveItemFromCard(this.cardID, this.viewItem._id);
    this.kanbanService.removeItemFromArray(this.item._id, this.cardID);
    this.clearPopups();
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

}
