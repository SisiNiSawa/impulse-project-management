import { Component, OnInit, Output, EventEmitter} from '@angular/core';

import { Kanban } from '../../shared/kanban.model';

@Component({
  selector: 'app-wizard-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.css']
})
export class WizardModuleComponent implements OnInit {

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

}
