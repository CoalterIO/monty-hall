import { Interpolation } from '@angular/compiler';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
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
  passthrough: HTMLElement;
  currentSelection: number;

  ngOnInit(): void {
    // this.number = parseInt(this.door);
    // if (evaluation.startTesting) {
    //   this.firstTest();
    //   this.removeBarrier();

    //   evaluation.endFirstSelection = false;
        
    //   this.currentTest = evaluation.currentTest;
    //   this.number = parseInt(this.door);
    //   this.switchState(doorState.UNSELECTED);

    //   this.startCheckingDisabled();
    //   this.startCheckingTestEnd();
    // }

    if (evaluation.currentTest < 60) {
      evaluation.resetTest();
      this.switchState(doorState.UNSELECTED);
      this.number = parseInt(this.door);
      this.startChecking();
      this.passthrough = document.getElementById("passthrough" + this.door);
      this.addBarrier(1000);
      this.currentSelection = 0;
      evaluation.endFirstSelection = false;
    } else {
      this.switchState(doorState.GONE);
    }
  }

  // ngOnDestroy(): void {
  //   console.log("destroy");
  //   clearInterval(this.timer);
  // }

  addBarrier(time: number) {
    if (this.passthrough != null) {
      this.passthrough.classList.add("unclickable");
      this.passthrough.classList.remove("clickable");
      setTimeout(() => {
        if (this.passthrough != null) {
          this.passthrough.classList.add("clickable");
          this.passthrough.classList.remove("unclickable");
        }
      }, time);
    }
  }

  // firstTest() {
  //   if (!evaluation.startTesting) {
  //     const timer = setInterval(() => {
  //       if (evaluation.startTesting) {
  //         this.element = document.getElementById("passthrough");
  //         this.element.classList.remove("clickable");
  //         this.element.classList.add("unclickable");
  //         setTimeout(() => {
  //           this.element.classList.remove("unclickable");
  //           this.element.classList.add("clickable");
  //           clearInterval(timer);
  //         }, 1000);
  //       }
  //     }, 10);
  //   }
  // }

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
        evaluation.endFirstSelection = true;
        evaluation.setFirstInterval();
        evaluation.setFirstSelection(this.number);
        evaluation.disableRandom(this.number);
        setTimeout(() => {
          this.switchState(doorState.UNSELECTED);
          evaluation.somethingNotSelected = true;
          evaluation.endSecondSelection = false;
        }, 1000);
      } else {
        evaluation.endSecondSelection = true;
        evaluation.setSecondInterval();
        evaluation.setSecondSelection(this.number);
        setTimeout(() => {
          evaluation.somethingNotSelected = true;
          evaluation.calculateWin(evaluation.firstSelection != this.number)
          evaluation.selection = 0;
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

  startChecking() {
    const timer = setInterval(() => {
      if (this.checkIfDisabled()) {
        this.switchState(doorState.DISABLED);
        setTimeout(() => {
          this.switchState(doorState.DISABLED);
        }, 1000);
      }
      if (evaluation.currentTest != this.currentTest) {
        this.currentTest = evaluation.currentTest;
      }
      if (evaluation.selection != this.currentSelection) {
        this.addBarrier(2000);
        this.currentSelection = evaluation.selection;
      }
      if (evaluation.selection == 2) {
        clearInterval(timer);
        setTimeout(() => {
          this.switchState(doorState.GONE);
        }, 1000);
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
