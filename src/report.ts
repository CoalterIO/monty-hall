export class Report{
    private eagleID: string;
    private gender: string;
    private familiarity: string;
    private knewStrategy: string;
    private strategy: string;
    
    constructor() {}

    public setStartSurvey(a1: string, a2: string) {
        this.eagleID = a1;
        this.gender = a2;
    }

    public setEndSurvey(a3: string, a4: string, a5: string) {
        this.familiarity = a3;
        this.knewStrategy = a4;
        this.strategy = a5;
    }

    public async sendReport() {
        const body: Body = {
            eagleid: this.eagleID,
            gender: this.gender,
            familiarity: this.familiarity,
            knewstrategy: this.knewStrategy,
            strategy: this.strategy,
        }
        const response = await fetch("/api/submission/submit", {
            method: 'POST',
            body: JSON.stringify(body),
        });
    }
}

type Body = {
    eagleid: string;
    gender: string;
    familiarity: string;
    knewstrategy: string;
    strategy: string;
}