export class SelectConnector {
    constructor({send, receive} = {}){
        this.sendingSelect = send;
        this.receivingSelect = receive; 
        this.outputOptions = undefined;

        this.refreshValues();
        this.sendingSelect.addEventListener('change', () => {
            this.refreshValues();
        });
    }
    refreshValues() {
        let ourVal = this.sendingSelect.value;
        switch(ourVal){
            case '1':
                this.outputOptions = `
                    <option value="${ourVal}.1" selected>Option ${ourVal}.1</option>
                    <option value="${ourVal}.2">Option ${ourVal}.2</option>
                    <option value="${ourVal}.3">Option ${ourVal}.3</option>
                `;
            break;
            case '2':
                this.outputOptions = `
                    <option value="${ourVal}.1" selected>Option ${ourVal}.1</option>
                    <option value="${ourVal}.2">Option ${ourVal}.2</option>
                    <option value="${ourVal}.3">Option ${ourVal}.3</option>
                `;
            break;
            case '3':
                this.outputOptions = `
                    <option value="${ourVal}.1" selected>Option ${ourVal}.1</option>
                    <option value="${ourVal}.2">Option ${ourVal}.2</option>
                    <option value="${ourVal}.3">Option ${ourVal}.3</option>
                `;
            break;
        }
        for(let i = this.receivingSelect.options.length; i >= 0 ; i--){
            this.receivingSelect.remove(i);
        }
        this.receivingSelect.insertAdjacentHTML('afterbegin', this.outputOptions);
        this.receivingSelect.selectedIndex = 0;
    }
}