import { Interpolation } from '@angular/compiler';
import { Component, OnInit, Input } from '@angular/core';
// import { Evaluation } from '../../evaluation'
import { evaluation } from '../../state'

@Component({
  selector: 'app-door',
  templateUrl: './door.component.html',
  styleUrls: ['./door.component.sass']
})
export class DoorComponent implements OnInit {
  @Input() door: string;

  unselected: boolean;
  selected: boolean;
  gone: boolean;
  disabled: boolean;
  number: number;
  currentTest: number;
  element: HTMLElement;
  //timerList: NodeJS.Timeout[]

  ngOnInit(): void {
    if (evaluation.startTesting) {
      this.firstTest();
      this.removeBarrier();
        
      this.currentTest = evaluation.currentTest;
      this.number = parseInt(this.door);
      this.switchState(doorState.UNSELECTED);

      this.startCheckingDisabled();
      this.startCheckingTestEnd();
    }
  }

  removeBarrier() {
    this.element = document.getElementById("passthrough");
    setTimeout(() => {
      if (this.element != null) {
        this.element.classList.remove("clickable");
        this.element.classList.add("unclickable");
        setTimeout(() => {
          if (this.element != null) {
            this.element.classList.remove("unclickable");
            this.element.classList.add("clickable");
          }
        }, 1000);
      }
    }, 3100);
  }

  firstTest() {
    if (!evaluation.startTesting) {
      const timer = setInterval(() => {
        if (evaluation.startTesting) {
          this.element = document.getElementById("passthrough");
          this.element.classList.remove("clickable");
          this.element.classList.add("unclickable");
          setTimeout(() => {
            this.element.classList.remove("unclickable");
            this.element.classList.add("clickable");
          }, 1000);
          clearInterval(timer);
        }
      }, 10);
    }
  }

  switchState(state: doorState) {
    switch (state) {
      case doorState.UNSELECTED:
        this.unselected = true;
        this.selected = false;
        this.gone = false;
        this.disabled = false;
        break;
      case doorState.SELECTED:
        this.unselected = false;
        this.selected = true;
        this.gone = false;
        this.disabled = false;
        break;
      case doorState.GONE:
        this.unselected = false;
        this.selected = false;
        this.gone = true;
        this.disabled = false;
        break;
      case doorState.DISABLED:
        this.unselected = false;
        this.selected = false;
        this.gone = false;
        this.disabled = true;
        break;
    }
  }

  onSelect() {
    if (evaluation.somethingNotSelected) {
      if (evaluation.selection < 2) {
        this.switchState(doorState.SELECTED);
      }
      evaluation.somethingNotSelected = false;
      evaluation.selection++;
      if (evaluation.selection == 1) {
        evaluation.firstSelection = this.number;
        evaluation.disableRandom(this.number);
        setTimeout(() => {
          this.switchState(doorState.UNSELECTED);
          evaluation.somethingNotSelected = true;
        }, 1000);
      } else {
        setTimeout(() => {
          evaluation.somethingNotSelected = true;
          evaluation.calculateWin(evaluation.firstSelection != this.number)
          // evaluation.displayWin = 0;
          evaluation.selection = 0;
          this.ngOnInit();
        }, 1000);
      }
    }
  }

  checkIfDisabled(): boolean {
    if (evaluation.disabledDoorList.includes(this.number)) {
      return true;
    }
    return false;
  }

  startCheckingDisabled() {
    const timer = setInterval(() => {
      if (this.checkIfDisabled()) {
        clearInterval(timer);
        this.switchState(doorState.DISABLED);
        setTimeout(() => {
          this.switchState(doorState.DISABLED);
        }, 1000);
      }
    }, 10);
  }

  startCheckingTestEnd() {
    const timer = setInterval(() => {
      if (evaluation.currentTest != this.currentTest) {
        clearInterval(timer);
        evaluation.resetTest();
        this.ngOnInit();
        this.currentTest = evaluation.currentTest;
      }
    }, 10);
  }
}

enum doorState  {
  UNSELECTED,
  SELECTED,
  GONE,
  DISABLED,
}
