import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef} from '@angular/core';

import { Kanban } from '../../shared/kanban.model';

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

  createKanban() {
    let newKanban = new Kanban;
    newKanban._id = String(Date.now());
    newKanban.name = this.moduleName;
    newKanban.icon = this.moduleIcon;
    this.module.emit(newKanban);
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

}
