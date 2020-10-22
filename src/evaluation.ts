import { Report } from './report';
import { HttpClient } from '@angular/common/http';

export class Evaluation {
    private isControl: boolean;
    //public disabledDoor: number;
    public selectedDoor: number;
    public selection: number;
    public firstSelection: number;
    //public currentTestOver: boolean;
    public disabledDoorList: Number[];
    public isTestControlList: boolean[];
    public currentTest: number;
    public displayWin: number;
    public somethingNotSelected: boolean;
    public startTesting: boolean;
    public testLength = 60;

    private report: Report;

    public secondSelectionList: Number[];
    public firstSelectionList: Number[];
    public isTestWinList: boolean[];
    public didSwapList: boolean[];
    public timer1List: Number[];
    public timer2List: Number[];

    public endFirstSelection: boolean;
    public endSecondSelection: boolean;
    public timer1: number;
    public timer2: number;

    constructor() {
        this.startTesting = false;
        //this.disabledDoor = 0;
        //this.selectedDoor = 0;
        this.somethingNotSelected = true;
        this.selection = 0;
        //this.currentTestOver = false;
        this.currentTest = 0;
        this.isTestControlList = new Array(this.testLength);
        this.isTestWinList = new Array(this.testLength);
        this.disabledDoorList = new Array(3);
        this.displayWin = 0;

        this.report = new Report();
        
        this.firstSelectionList = new Array(this.testLength);
        this.secondSelectionList = new Array(this.testLength);
        this.didSwapList = new Array(this.testLength);
        this.timer1List = new Array(this.testLength);
        this.timer2List = new Array(this.testLength);

        this.endFirstSelection = true;
        this.endSecondSelection = true;
        this.startFirstSelection();
        this.startSecondSelection();
    }

    startFirstSelection() {
        this.timer1 = 0;
        setInterval(() => {
            if (!this.endFirstSelection) {
                this.timer1 += .01;
            }
        }, 10);
    }

    setFirstInterval() {
        this.timer1List[this.currentTest] = Math.round((this.timer1) * 100) / 100;
        this.timer1 = 0;
    }

    setSecondInterval() {
        this.timer2List[this.currentTest] = Math.round((this.timer2) * 100) / 100;
        //console.log(this.timer2);
        this.timer2 = 0;
    }

    startSecondSelection() {
        this.timer2 = 0;
        setInterval(() => {
            if (!this.endSecondSelection) {
                this.timer2 += .01;
            }
        }, 10);
    }

    public sendReport() {
        this.testResults();
        this.report.sendReport();
    }

    public endSurvey(a3: string, a4: string, a5: string) {
        this.report.setEndSurvey(a3, a4, a5);
    }

    public startSurvey(a1: string, a2: string) {
        this.report.setStartSurvey(a1, a2);
    }

    public testResults() {
        this.report.setTestResults(this.isTestWinList, this.firstSelectionList, this.secondSelectionList, this.didSwapList);
        this.report.setTestIntervals(this.timer1List, this.timer2List);
    }

    public setFirstSelection(x: number) {
        this.firstSelection = x;
        this.firstSelectionList[this.currentTest] = x;
    }

    public setSecondSelection(x: number) {
        this.secondSelectionList[this.currentTest] = x;
    }

    public isCurrentTestControl(): boolean {
        return this.isTestControlList[this.currentTest];
    }

    public resetTest() {
        this.disabledDoorList = null;
        this.selection = 0;
        this.firstSelection = 0;
        //this.selectedDoor = 0;
        if (this.isCurrentTestControl()) {
            this.disabledDoorList = new Array(3);
        } else {
            this.disabledDoorList = new Array(8);
        }
        //this.currentTestOver = false;
    }

    public setIsControl(x: boolean) {
        this.isControl = x;
        if (this.isControl) {
            for (var i = 0; i < this.isTestControlList.length; i++) {
                this.isTestControlList[i] = true;
            }
        } else {
            for (var i = 0; i < 20; i++) {
                this.isTestControlList[i] = true;
            }
            for (var i = 20; i < 40; i++) {
                this.isTestControlList[i] = false;
            }
            for (var i = 40; i < this.isTestControlList.length; i++) {
                this.isTestControlList[i] = true;
            }
            //console.log(this.isTestControlList);
        }
    }

    public setSelected(door: number) {
        this.selectedDoor = door;
    }

    public calculateWin(swapped: boolean) {
        console.log(this.currentTest);
        //console.log(this.isCurrentTestControl());
        var x = Math.random();
        this.didSwapList[this.currentTest] = swapped;
        if (swapped) {
            if (x > .33) {
                this.isTestWinList[this.currentTest] = true;
            }
        } else {
            if (x > .67) {
                this.isTestWinList[this.currentTest] = true;
            }
        }
        this.currentTest++;
        this.isTestWinList[this.currentTest] = false;
        if (this.currentTest >= this.testLength) {
            this.startTesting = false;
        }
    }

    public disableRandom(door: number) {
        var doorList;
        var numDoors;
        if (this.isCurrentTestControl()) {
            doorList = [];
            for (var i = 1; i <= 3; i++) {
                doorList.push(i);
            }
            numDoors = 3;
        } else {
            doorList = [];
            for (var i = 1; i <= 8; i++) {
                doorList.push(i);
            }
            numDoors = 8;
        }
        doorList.splice(door - 1, 1);
        doorList.splice(Math.floor(Math.random() * doorList.length), 1);
        this.disabledDoorList = doorList;
    }
}