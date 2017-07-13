import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef} from '@angular/core';

import { Kanban } from '../../shared/kanban.model';
import { Markdown } from '../../shared/markdown.model';
import { Todo } from '../../shared/todo.model';

@Component({
  selector: 'app-wizard-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.css']
})
export class WizardModuleComponent implements OnInit {

  @ViewChild('stepOne') stepOne: ElementRef;
  @ViewChild('stepTwo') stepTwo: ElementRef;
  @Output() back: EventEmitter<any> = new EventEmitter();
  @Output() module: EventEmitter<any> = new EventEmitter();

  btnText: string;
  step: number = 1;
  moduleName: string;
  moduleIcon: string;
  moduleIndex: number = 1;

  constructor() { }

  ngOnInit() {
    this.btnText = "Next";
  }

  nextStep() {
    if (this.step === 1) {
      this.btnText = "Create";
      this.step = 2;
    } else if (this.step === 2) {
      this.createKanban();
    }
  }

  goBack() {
    if (this.step === 1) {
      this.back.emit();
    } else {
      this.btnText = "Next";
      this.step = 1;
    }
  }

  selectIcon(event: Event) {
    this.moduleIcon = String(event);
  }

  createModule() {
    if (this.moduleIndex === 1) {
      this.createKanban();
    } else if (this.moduleIndex === 2) {
      this.createMarkdown();
    } else if (this.moduleIndex === 3) {
      this.createTodo();
    }
  }

  // TODO: dry this up later

  createKanban() {
    let newKanban = new Kanban;
    newKanban._id = String(Date.now());
    newKanban.name = this.moduleName;
    newKanban.icon = this.moduleIcon;
    this.module.emit(newKanban);
  }

  createMarkdown() {
    let newMarkdown = new Markdown;
    newMarkdown._id = String(Date.now());
    newMarkdown.name = this.moduleName;
    newMarkdown.icon = this.moduleIcon;
    this.module.emit(newMarkdown);
  }

  createTodo() {
    let newTodo = new Todo;
    newTodo._id = String(Date.now());
    newTodo.name = this.moduleName;
    newTodo.icon = this.moduleIcon;
    this.module.emit(newTodo);
  }

  gotoStepTwo() {
    this.stepOne.nativeElement.style.position = "absolute";
    this.stepOne.nativeElement.style.marginLeft = "-2000px";
    this.stepOne.nativeElement.style.opacity = 0;

    this.stepTwo.nativeElement.style.position = "static";
    this.stepTwo.nativeElement.style.marginLeft = 0;
    this.stepTwo.nativeElement.style.opacity = 1;
  }

  gotoStepOne() {
    this.stepOne.nativeElement.style.position = "staic";
    this.stepOne.nativeElement.style.marginLeft = 0;
    this.stepOne.nativeElement.style.opacity = 1;

    this.stepTwo.nativeElement.style.position = "absolute";
    this.stepTwo.nativeElement.style.marginLeft = "2000px";
    this.stepTwo.nativeElement.style.opacity = 0;
  }

  changeModule(i: number) {
    this.moduleIndex = this.moduleIndex + i;
    // shit code
    if (this.moduleIndex < 1) {
      this.moduleIndex = 3;
    } else if (this.moduleIndex > 3) {
      this.moduleIndex = 1;
    }
  }

}
