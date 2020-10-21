import { Component, OnInit } from '@angular/core';
import { evaluation } from '../../state';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.sass']
})
export class SurveyComponent implements OnInit {

  yesToFirst = false;
  firstAnswered = false;
  answered = false;
  q3: HTMLSelectElement;
  q4: HTMLSelectElement;
  q5: HTMLTextAreaElement;

  a3: string;
  a4: string;
  a5: string;

  constructor() { }

  ngOnInit(): void {
  }

  showEnd() {
    var endModal = document.getElementById("endModal");
    endModal.classList.add('is-active');
  }

  submit() {
    this.q3 = document.getElementById("q3") as HTMLSelectElement;
    this.a3 = this.q3.value;
    this.q5 = document.getElementById("q5") as HTMLTextAreaElement;
    this.a5 = this.q5.value;

    this.q4 = document.getElementById("q4") as HTMLSelectElement;
    if (this.q4 == null) {
      this.a4 = "n/a";
    } else {
      this.a4 = this.q4.value;
    }

    evaluation.endSurvey(this.a3, this.a4, this.a5);
    evaluation.sendReport();

    this.showEnd();
  }

  question3() {
    this.q3 = document.getElementById("q3") as HTMLSelectElement;
    this.a3 = this.q3.value;
    if (this.a3 == "yes") {
      this.yesToFirst = true;
    } else {
      this.yesToFirst = false;
      this.firstAnswered = true;
    }
  }

  question4() {
    this.q4 = document.getElementById("q4") as HTMLSelectElement;
    this.a4 = this.q4.value;
    this.firstAnswered = true;
  }

}
