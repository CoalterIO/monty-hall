export class Evaluation {
    private isControl: boolean;
    //public disabledDoor: number;
    public selectedDoor: number;
    public selection: number;
    public firstSelection: number;
    //public currentTestOver: boolean;
    public disabledDoorList: Number[];
    public isTestControlList: boolean[];
    public isTestWinList: boolean[];
    public currentTest: number;
    public displayWin: number;
    public somethingNotSelected: boolean;
    public startTesting: boolean;
    public testLength = 60;

    constructor() {
        this.startTesting = false;
        //this.disabledDoor = 0;
        this.selectedDoor = 0;
        this.somethingNotSelected = true;
        this.selection = 0;
        //this.currentTestOver = false;
        this.currentTest = 0;
        this.isTestControlList = new Array(this.testLength);
        this.isTestWinList = new Array(this.testLength);
        this.disabledDoorList = new Array(3);
        this.displayWin = 0;
    }

    public setFirstSelection(x: number) {
        this.firstSelection = x;
    }

    public isCurrentTestControl(): boolean {
        return this.isTestControlList[this.currentTest];
    }

    public resetTest() {
        this.disabledDoorList = null;
        this.selection = 0;
        this.firstSelection = 0;
        this.selectedDoor = 0;
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
        //console.log(this.currentTest);
        //console.log(this.isCurrentTestControl());
        var x = Math.random();
        if (swapped) {
            if (x > .33) {
                this.isTestWinList[this.currentTest] = true;
                this.currentTest++;
            }
        } else {
            if (x > .67) {
                this.isTestWinList[this.currentTest] = true;
                this.currentTest++;
            }
        }
        this.isTestWinList[this.currentTest] = false;
        this.currentTest++;
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