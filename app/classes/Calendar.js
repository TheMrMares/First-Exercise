export class Calendar {
    constructor(calendar, blocked) {
        this.availableMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        this.availableDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        this.calendar = calendar; 

        this.blocked = JSON.parse(blocked).days;

        this.previous = document.querySelector('.calendar__button--previous');
        this.next = document.querySelector('.calendar__button--next');
        this.days = calendar.querySelectorAll('.calendar__day');
        this.display = calendar.querySelector('.calendar__display');

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
                if(j<=6){
                    if((j+1)%2 === 0) {
                        numberOfDays = 30;
                    } else {
                        numberOfDays = 31;
                    }
                } else {
                    if((j+1)%2 === 0) {
                        numberOfDays = 31;
                    } else {
                        numberOfDays = 30;
                    }
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
                for(let k=0; k<this.timeline.years[i].months[j].numDays; k++){
                    
                    this.timeline.years[i].months[j].days.push({
                        name: this.availableDays[counter],
                        realPos: this.timeline.years[i].months[j].start+k,
                        blocked: false
                    });
                    counter++;
                    if(counter >= 7) {
                        counter = 0;
                    }
                }
            }
        }
        //END of TIMELINE
        this.blockDays();
        this.getActualDate();
        this.refreshCalendar();
        this.addEvents();
    }
    blockDays() {
        this.blocked.forEach((item, index) => {
            let yearIndex = this.timeline.years.findIndex((elem, elemIndex) => {
                if(elem.name === item.year) {
                    return elemIndex;
                }
            });
            this.timeline.years[yearIndex].months[item.month-1].days[item.day-1].blocked = true;
        });
    }
    addEvents(){
        this.previous.addEventListener('click', () => {
            if(this.activeY > 0){
                if(this.activeM <= 0){
                    this.activeM = 11;
                    this.activeY--;
                } else {
                    this.activeM--;
                }
            }
            this.refreshCalendar();
        });
        this.next.addEventListener('click', () => {
            if(this.activeM >= 11){
                this.activeM = 0;
                this.activeY++;
            } else {
                this.activeM++;
            }
            this.refreshCalendar();
        });
        this.days.forEach((item, index) => {
            item.addEventListener('click', (e) => {
                if(!e.target.parentElement.classList.contains('calendar__day--unavailable') && !e.target.parentElement.classList.contains('calendar__day--blocked')) {
                    console.log(parseInt(e.target.textContent)-1);
                    this.activeD = parseInt(e.target.textContent)-1;
                    this.chosenY = this.activeY;
                    this.chosenM = this.activeM;
                    this.chosenD = this.activeD;
                    this.refreshCalendar();
                }
            });
        });
    }
    getActualDate(){
        let today = new Date();
        this.activeDate = today;
        this.activeY = today.getFullYear()-2016;
        this.activeM = today.getMonth();
        this.activeD = today.getDate()-1;
        this.chosenY = this.activeY;
        this.chosenM = this.activeM;
        this.chosenD = this.activeD;
    }
    refreshCalendar(){
        let ourYear = this.timeline.years[this.activeY];
        let ourMonth = ourYear.months[this.activeM];
        let ourDay = ourMonth.days[this.activeD];
        this.display.textContent = ourMonth.name;
       
        this.days.forEach((item, index) => {
            let properElem = item.querySelector('div');
            properElem.textContent = '';
            item.classList.remove('calendar__day--unavailable','calendar__day--active','calendar__day--blocked');
            
            if(index < ourMonth.start-1){
                if(this.activeM <= 0 && this.activeY > 0){
                    properElem.textContent = this.timeline.years[this.activeY-1].months[11].numDays-(ourMonth.start-index)+2;
                }
                if(this.activeM <= 0 && this.activeY <= 0){
                    properElem.textContent = '-';
                }
                if(this.activeM > 0) {
                    properElem.textContent = this.timeline.years[this.activeY].months[this.activeM-1].numDays-(ourMonth.start-index)+2;
                }
                item.classList.add('calendar__day--unavailable');
            }
            if(index > ourMonth.numDays+ourMonth.start-2){
                properElem.textContent = index-(ourMonth.numDays+ourMonth.start-2);
                item.classList.add('calendar__day--unavailable');
            }
        });

        for(let i = 0; i<ourMonth.numDays; i++){
            this.days[i+ourMonth.start-1].querySelector('div').textContent = i+1;
            if(i == this.chosenD && this.chosenM === this.activeM && this.chosenY === this.activeY){
                this.days[i+ourMonth.start-1].classList.add('calendar__day--active');
            }
            if(this.timeline.years[this.activeY].months[this.activeM].days[i].blocked === true){
                this.days[i+ourMonth.start-1].classList.add('calendar__day--blocked');
            }
        }
    }
}