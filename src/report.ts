import { first } from 'rxjs/operators';

export class Report{
    // private eagleID: string;
    // private gender: string;
    private familiarity: string;
    private knewStrategy: string;
    private strategy: string;
    private winList: string[];
    private swapList: string[];
    private firstSelectionList: Number[];
    private secondSelectionList: Number[];
    private firstIntervalList: Number[];
    private secondIntervalList: Number[];
    
    constructor() {}

    // public setStartSurvey(a1: string, a2: string) {
    //     this.eagleID = a1;
    //     this.gender = a2;
    // }

    public setEndSurvey(a3: string, a4: string, a5: string) {
        this.familiarity = a3;
        this.knewStrategy = a4;
        this.strategy = a5;
    }

    public setTestResults(w: string[], f: Number[], s: Number[], swap: string[]) {
        this.winList = w;
        this.firstSelectionList = f;
        this.secondSelectionList = s;
        this.swapList = swap;
    }

    public setTestIntervals(x: Number[], y: Number[]) {
        this.firstIntervalList = x;
        this.secondIntervalList = y;
    }

    public async sendReport() {
        const body: Body = {
            // eagleid: this.eagleID,
            // gender: this.gender,
            familiarity: this.familiarity,
            knewstrategy: this.knewStrategy,
            strategy: this.strategy,
            winlist: this.winList,
            swaplist: this.swapList,
            firstlist: this.firstSelectionList,
            secondlist: this.secondSelectionList,
            interval1: this.firstIntervalList,
            interval2: this.secondIntervalList,
        }
        const response = await fetch("/api/submission/submit", {
            method: 'POST',
            body: JSON.stringify(body),
        });
    }
}

type Body = {
    // eagleid: string;
    // gender: string;
    familiarity: string;
    knewstrategy: string;
    strategy: string;
    winlist: string[];
    swaplist: string[];
    firstlist: Number[];
    secondlist: Number[];
    interval1: Number[];
    interval2: Number[];
}