import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DragulaModule } from 'ng2-dragula/ng2-dragula';

import { AppComponent } from './app.component';
import { KanbanComponent } from './modules/kanban/kanban.component';
import { KanbanCardComponent } from './modules/kanban/card/card.component';
import { KanbanItemComponent } from './modules//kanban/item/item.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { ContentAreaComponent } from './content-area/content-area.component';
import { NewProjectComponent } from './project/new/new.component';
import { EditProjectComponent } from './project/edit/edit.component';
import { NewModuleComponent } from './modules/new/new.component';

import { DatabaseService } from "./database.service";
import { PopupService } from "./popup.service";
import { SidebarService } from "./sidebar/sidebar.service";
import { KanbanService } from './modules/kanban/kanban.service';
import { PopupDirective } from './popup.directive';
import { AutoFocusDirective } from './auto-focus.directive';
import { KanbanItemViewComponent } from './modules/kanban/item/view/view.component';
import { DefaultComponent } from './modules/default/default.component';
import { ProjectComponent } from './modules/project/project.component';
import { MarkdownComponent } from './modules/markdown/markdown.component';
import { WizardComponent } from './wizard/wizard.component';
import { WizardProjectComponent } from './wizard/project/project.component';
import { FadeInDirective } from './fade-in.directive'; 



@NgModule({
  declarations: [
    AppComponent,
    KanbanCardComponent,
    KanbanItemComponent,
    SidebarComponent,
    HeaderComponent,
    ContentAreaComponent,
    NewProjectComponent,
    EditProjectComponent,
    NewModuleComponent,
    PopupDirective,
    KanbanComponent,
    AutoFocusDirective,
    KanbanItemViewComponent,
    DefaultComponent,
    ProjectComponent,
    MarkdownComponent,
    WizardComponent,
    WizardProjectComponent,
    FadeInDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    DragulaModule
  ],
  providers: [DatabaseService, SidebarService, PopupService, PopupDirective, KanbanService],
  bootstrap: [AppComponent]
})
export class AppModule { }
