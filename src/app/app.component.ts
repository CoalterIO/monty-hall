import { Component, OnInit, Input } from '@angular/core';
import { Evaluation } from '../evaluation';
import { evaluation } from '../state';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

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
  totalAngularPackages;

  q1: HTMLInputElement;
  q2: HTMLSelectElement;

  ngOnInit(): void {
    this.q1 = document.getElementById("q1") as HTMLInputElement;
    this.q2 = document.getElementById("q2") as HTMLSelectElement;
    this.switchState(appState.CONSENT);
  }

  constructor(private http: HttpClient) {}

  testApi() {
    this.http.get<any>('/api/submission/test').subscribe(data => {
      this.totalAngularPackages = data.total;
    })
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
    evaluation.startSurvey(this.q1.value, this.q2.value);
    this.hideModal();
    this.instruct();
  }

  instruct() {
    this.switchState(appState.INSTRUCTION);
  }

  survey() {
    evaluation.startTesting = false;
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
    console.log(this.isControl);
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
