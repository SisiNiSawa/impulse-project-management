import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'icon-selector',
  templateUrl: './icon-selector.component.html',
  styleUrls: ['./icon-selector.component.css']
})
export class IconSelectorComponent implements OnInit {

  @Output() icon: EventEmitter<any> = new EventEmitter();

  icons: string[] = [
    "fa-star",
    "fa-th-large",
    "fa-th",
    "fa-th-list",
    "fa-heart",
    "fa-home",
    "fa-file",
    "fa-file-o",
    "fa-file-text",
    "fa-inbox",
    "fa-list-alt",
    "fa-flag",
    "fa-headphones",
    "fa-qrcode",
    "fa-book",
    "fa-bookmark",
    "fa-camera",
    "fa-align-left",
    "fa-list",
    "fa-indent",
    "fa-picture-o",
    "fa-pencil",
    "fa-check-square-o",
    "fa-pencil-square-o",
    "fa-leaf",
    "fa-calendar",
    "fa-comment",
    "fa-folder",
    "fa-folder-open",
    "fa-bar-chart",
    "fa-hdd-o",
    "fa-tasks"
  ]

  @Input() selectedIcon: string;

  constructor() { }

  ngOnInit() {
  }

  selectIcon(icon: string) {
    this.selectedIcon = icon;
    this.icon.emit(icon);
  }

}
