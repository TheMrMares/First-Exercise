export class NoteArrows {
    constructor({objects, imageURL} = {}){
        this.imageURL = imageURL;
        this.objects = objects;
        this.addArrows();
    }
    addArrows(){
        console.log('xd');
        this.objects.forEach((item, index) => {
            item.insertAdjacentHTML('afterbegin', `<img  src=${this.imageURL} class="note__image"/>`)
        });
    }
}
