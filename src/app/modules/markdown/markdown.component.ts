import { Component, OnInit } from '@angular/core';

import { SidebarService } from '../../sidebar/sidebar.service';
import { DatabaseService } from '../../database.service';
import { Markdown } from '../../shared/markdown.model';

import { MarkdownService } from 'angular2-markdown';

@Component({
  selector: 'app-markdown',
  templateUrl: './markdown.component.html',
  styleUrls: ['./markdown.component.css']
})
export class MarkdownComponent implements OnInit {

  constructor(
    private sidebarService: SidebarService,
    private _markdown: MarkdownService,
    private dbService: DatabaseService
  ) { }

  editMode: boolean = false;

  markdown: Markdown;

  ngOnInit() {
    this.markdown = this.sidebarService.selectedItem;
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  saveMarkdown() {
    this.dbService.updateItem(this.markdown);
    this.toggleEditMode();
  }

}
