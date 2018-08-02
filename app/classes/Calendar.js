export class Calendar {
    constructor(calendar) {
        this.availableMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        this.availableDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        this.calendar = calendar; 

        //START of TIMELINE
        this.timeline = {
            years: []
        };

        //years
        for(let i=0; i<100; i++){
            if(i%4 === 0){
                this.timeline.years.push({
                    name: 2016+i,
                    bigState: true,
                    months: []
                });
            } else {
                this.timeline.years.push({
                    name: 2016+i,
                    bigState: false,
                    months: []
                });
            }
            //months
            for(let j=0; j<12; j++){
                let numberOfDays;
                let compensate = 2;
                if((j+1)%2 === 0) {
                    numberOfDays = 30;
                } else {
                    numberOfDays = 31;
                }
                if(j == 1){
                    numberOfDays  -= compensate
                    if(this.timeline.years[i].bigState == true){
                        numberOfDays++;
                    }
                }
                let dayStart;
                let dayRest;
                if(i === 0 && j === 0){
                    dayRest = 6;
                }
                if(j != 0) {
                    dayRest = (this.timeline.years[i].months[j-1].start + this.timeline.years[i].months[j-1].numDays)%7;
                }
                if(j == 0 && i != 0){
                    dayRest = (this.timeline.years[i-1].months[11].numDays + this.timeline.years[i-1].months[11].start)%7;
                }

                if(dayRest === 0){
                    dayStart = 7;
                } else {
                    dayStart = dayRest;
                }
                this.timeline.years[i].months.push({
                    name: this.availableMonths[j],
                    numDays: numberOfDays,
                    days: [],
                    start: dayStart
                })
                //days
                let counter = this.timeline.years[i].months[j].start-1;
                //console.log(counter);
                for(let k=this.timeline.years[i].months[j].start; k<this.timeline.years[i].months[j].numDays; k++){
                    
                    this.timeline.years[i].months[j].days.push({
                        name: this.availableDays[counter],
                        realPos: k
                    });
                    counter++;
                    if(counter >= 7) {
                        counter = 0;
                    }
                }
            }
        }
        console.log(this.timeline);
        //END of TIMELINE
    }
}