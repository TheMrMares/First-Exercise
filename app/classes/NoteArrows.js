export class NoteArrows {
    constructor({objects, imageURL} = {}){
        this.imageURL = imageURL;
        this.objects = objects;
        this.addArrows();
    }
    addArrows(){
        this.objects.forEach((item, index) => {
            item.insertAdjacentHTML('afterbegin', `<img  src=${this.imageURL} class="note__image" alt="Graphic of blue arrow, it points article."/>`)
        });
    }
}
