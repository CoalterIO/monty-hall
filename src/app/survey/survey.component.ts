import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.sass']
})
export class SurveyComponent implements OnInit {

  yesToFirst = false;
  firstAnswered = false;
  answered = false;

  constructor() { }

  ngOnInit(): void {
    this.startListening();
  }

  showEnd() {
    var endModal = document.getElementById("endModal");
    endModal.classList.add('is-active');
  }

  submit() {
    // code to submit answers
    this.showEnd();
  }

  startListening() {
    var q1 = document.getElementById("q1") as HTMLSelectElement;
    var q2;
    const timer = setInterval(() => {
      if (q1.value == "yes") {
        this.yesToFirst = true;
        q2 = document.getElementById("q2") as HTMLSelectElement
      } else if (q1.value == "no") {
        this.firstAnswered = true;
        q2 = document.getElementById("q2") as HTMLSelectElement
      }
      //haha xd

      if (q2 != null) {
        if (q2.value == "yes") {
          this.firstAnswered = true;
          clearInterval(timer);
        } else if (q2.value == "no") {
          this.firstAnswered = true;
          clearInterval(timer);
        }
      }

    }, 10);
  }

}
