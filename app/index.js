// Load application styles
import 'styles/index.scss';
import 'images/booking_bg.png';
import 'images/fb_grey.svg';
import 'images/twitter_grey.svg';
import 'images/insta_grey.svg';
import 'images/foto1.png';
import 'images/arrows.png';
import triangleURL from 'images/Triangle.png';

import {SelectConnector} from './classes/SelectConnector';
import {NoteArrows} from './classes/NoteArrows';
import {Calendar} from './classes/Calendar';

let formSelect = new SelectConnector({send: document.querySelector('#formSelectInput'), receive: document.querySelector('#formSelectOutput')});

let noteImages = new NoteArrows({objects: document.querySelectorAll('.note'),imageURL: triangleURL});

let ourCalendar = new Calendar(document.querySelector('.calendar__real'));