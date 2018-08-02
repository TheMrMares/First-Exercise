// Load application styles
import 'styles/index.scss';
import 'images/booking_bg.png';
import 'images/fb_grey.svg';
import 'images/twitter_grey.svg';
import 'images/insta_grey.svg';
import 'images/foto1.png';
import 'images/arrows.png';

import {SelectConnector} from './classes/SelectConnector';

let formSelect = new SelectConnector({send: document.querySelector('#formSelectInput'), receive: document.querySelector('#formSelectOutput')});