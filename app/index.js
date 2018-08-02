// Load application styles
import 'styles/index.scss';
import 'images/booking_bg.png';
import 'images/fb_grey.svg';
import 'images/twitter_grey.svg';
import 'images/insta_grey.svg';
import 'images/foto1.png';
import 'images/arrows.svg';
import triangleURL from 'images/Triangle.svg';

import {SelectConnector} from './classes/SelectConnector';
import {NoteArrows} from './classes/NoteArrows';
import {Form} from './classes/Form';

let formSelect = new SelectConnector({send: document.querySelector('#formSelectInput'), receive: document.querySelector('#formSelectOutput')});

let noteImages = new NoteArrows({objects: document.querySelectorAll('.note'),imageURL: triangleURL});

let ourForm = new Form();