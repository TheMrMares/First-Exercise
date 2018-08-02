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
    }
    submit(){
        console.log('submit');
    }
}
