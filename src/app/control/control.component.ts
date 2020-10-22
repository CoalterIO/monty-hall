import { Component, OnDestroy, OnInit } from '@angular/core';
import { evaluation } from '../../state';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.sass'],
})
export class ControlComponent implements OnInit {
  win: boolean;
  lose: boolean;
  testing: boolean;
  currentTest: number;

  constructor() {
    this.win = false;
    this.lose = false;
    this.testing = true;
    this.currentTest = 0;
  }

  ngOnInit(): void {
    evaluation.resetTest();
    this.startTesting();
  }

  // ngOnDestroy() {
  //   clearInterval(this.timer);
  // }

  startTesting() {
    const timer = setInterval(() => {
      if (evaluation.currentTest != this.currentTest) {
        if (evaluation.isTestWinList[this.currentTest]) {
          this.win = true;
        } else {
          this.lose = true;
        }
        this.testing = false;
        setTimeout(() => {
          this.currentTest = evaluation.currentTest;
          this.win = false;
          this.lose = false;
          setTimeout(() => {
            if (evaluation.currentTest < 60) {
              this.testing = true;         
            } else {
              this.win = false;
              this.lose = false;
              this.testing = false;
              clearInterval(timer);
            }
            if (!evaluation.isCurrentTestControl()) {
              this.win = false;
              this.lose = false;
              this.testing = false;
              clearInterval(timer); 
            }
          }, 1000);
        }, 2000);
      }
    }, 1);
  }
}
