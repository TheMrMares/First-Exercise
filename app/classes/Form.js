import {Calendar} from './Calendar';

export class Form {
    constructor() {

        //our JSON with days which are actually taken by someone.
        let ourJSON = `{ 
            "days": [
                {"year": 2019,
                "month": 12,
                "day": 22},
                {"year": 2018,
                "month": 8,
                "day": 5},
                {"year": 2018,
                "month": 8,
                "day": 17}
            ]
        }`

        this.calendar = new Calendar(document.querySelector('.calendar__real'),ourJSON); //passing JSON to calendar
        this.emailObj = document.querySelector('#formEmail');
        this.selectInputObj = document.querySelector('#formSelectInput');
        this.selectOutputObj = document.querySelector('#formSelectOutput');
        this.submitObj = document.querySelector('#formSubmit');

        this.addEvents();
    }
    addEvents(){
        this.submitObj.addEventListener('click', () => {
            this.submit();
        });
        this.emailObj.addEventListener('input', () => {
            this.checkEmail();
        })
    }
    checkEmail(){
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let email = this.emailObj.value;
        if(reg.test(email)){
            this.emailState = true;
        } else {
            this.emailState = false;
        }
    }
    submit(){

        if(!this.emailState){
            return;
        }
        let cl = this.calendar;
        let selectedDate = `year: ${cl.timeline.years[cl.chosenY].name} / month: ${cl.chosenM+1} / day: ${cl.chosenD+1}`;

        let formDATA = {
            email: this.emailObj.value,
            selectOne: this.selectInputObj.value,
            selectTwo: this.selectOutputObj.value,
            date: selectedDate
        }
        console.log(formDATA);
    }
}
