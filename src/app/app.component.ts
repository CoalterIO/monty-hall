import { Component, OnInit, Input } from '@angular/core';
import { Evaluation } from '../evaluation';
import { evaluation } from '../state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'monty-hall';

  showInstruction: boolean;
  showControl: boolean;
  showExperimental: boolean;
  showSurvey: boolean;
  showConsent: boolean;
  isControl: boolean;

  ngOnInit(): void {
    this.switchState(appState.CONSENT);
  }

  showModal() {
    var modal = document.getElementById("surveyModal");
    modal.classList.add('is-active');
  }

  hideModal() {
    var modal = document.getElementById("surveyModal");
    modal.classList.remove('is-active');
  }

  startInstruction() {
    // info submission for the form
    this.hideModal();
    this.instruct();
  }

  instruct() {
    this.switchState(appState.INSTRUCTION);
  }

  survey() {
    this.switchState(appState.SURVEY);
  }

  start() {
    evaluation.startTesting = true;
    var x = Math.random();
    if (x < .5) {
      this.isControl = false;
    } else {
      this.isControl = true;
    }
    this.switchState(appState.CONTROL);
    evaluation.setIsControl(this.isControl);

    const timer = setInterval(() => {
      setTimeout(() => {
        if (evaluation.isCurrentTestControl()) {
          this.switchState(appState.CONTROL);
        } else {
          this.switchState(appState.EXPERIMENTAL);
        }
        if (!evaluation.startTesting) {
          setTimeout(() => {  
            this.switchState(appState.SURVEY);
            clearInterval(timer);
          }, 3000);
        }
      }, 100);
    }, 10);
  }

  switchState(state: appState) {
    switch(state) {
      case appState.CONTROL:
        this.showInstruction = false;
        this.showControl = true;
        this.showExperimental = false;
        this.showSurvey = false;
        this.showConsent = false;
        break;
      case appState.EXPERIMENTAL:
        this.showInstruction = false;
        this.showControl = false;
        this.showExperimental = true;
        this.showSurvey = false;
        this.showConsent = false;
        break;
      case appState.INSTRUCTION:
        this.showInstruction = true;
        this.showControl = false;
        this.showExperimental = false;
        this.showSurvey = false;
        this.showConsent = false;
        break;
      case appState.SURVEY:
        this.showInstruction = false;
        this.showControl = false;
        this.showExperimental = false;
        this.showSurvey = true;
        this.showConsent = false;
        break;
      case appState.CONSENT:
        this.showInstruction = false;
        this.showControl = false;
        this.showExperimental = false;
        this.showSurvey = false;
        this.showConsent = true;
        break;
    }
  }
}

enum appState {
  CONTROL,
  EXPERIMENTAL,
  SURVEY,
  INSTRUCTION,
  CONSENT,
}
