import { Component, OnInit, Input } from '@angular/core';

import { PopupService } from '../../../popup.service';
import { DatabaseService } from '../../../database.service';
import { KanbanService } from '../kanban.service';

@Component({
  selector: 'app-kanban-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class KanbanItemComponent implements OnInit {

  @Input() item;
  @Input() cardID;
  mouseHasEntered: boolean = false;

  constructor(
      private popupService: PopupService,
      private dbService: DatabaseService,
      private kanbanService: KanbanService
  ) { }

  ngOnInit() {
  }

  viewItemInfo() {
    this.popupService.viewKanbanItemInfo(this.item, this.cardID);
  }

  removeItem(event: Event) {
    event.stopPropagation();
    this.dbService.removeEntryByID(this.item._id);
    this.dbService.kanbanRemoveItemFromCard(this.cardID, this.item._id);
    this.kanbanService.removeItemFromArray(this.item._id, this.cardID);
  }

}
