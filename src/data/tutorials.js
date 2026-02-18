// Import SVGs
import catStep1 from '../assets/tutorials/cat/step1.svg';
import catStep2 from '../assets/tutorials/cat/step2.svg';
import catStep3 from '../assets/tutorials/cat/step3.svg';
import catStep4 from '../assets/tutorials/cat/step4.svg';

import appleStep1 from '../assets/tutorials/apple/step1.svg';
import appleStep2 from '../assets/tutorials/apple/step2.svg';
import appleStep3 from '../assets/tutorials/apple/step3.svg';
import appleStep4 from '../assets/tutorials/apple/step4.svg';

import birdStep1 from '../assets/tutorials/bird/step1.svg';
import birdStep2 from '../assets/tutorials/bird/step2.svg';
import birdStep3 from '../assets/tutorials/bird/step3.svg';
import birdStep4 from '../assets/tutorials/bird/step4.svg';

import icecreamStep1 from '../assets/tutorials/icecream/step1.svg';
import icecreamStep2 from '../assets/tutorials/icecream/step2.svg';
import icecreamStep3 from '../assets/tutorials/icecream/step3.svg';
import icecreamStep4 from '../assets/tutorials/icecream/step4.svg';

import flowerStep1 from '../assets/tutorials/flower/step1.svg';
import flowerStep2 from '../assets/tutorials/flower/step2.svg';
import flowerStep3 from '../assets/tutorials/flower/step3.svg';
import flowerStep4 from '../assets/tutorials/flower/step4.svg';

import sunStep1 from '../assets/tutorials/sun/step1.svg';
import sunStep2 from '../assets/tutorials/sun/step2.svg';
import sunStep3 from '../assets/tutorials/sun/step3.svg';
import sunStep4 from '../assets/tutorials/sun/step4.svg';

export const tutorials = [
    {
        id: 'cat',
        title: 'Cute Cat',
        icon: '🐱',
        steps: [
            { text: 'Draw an oval for the head', shape: 'oval', image: catStep1 },
            { text: 'Add two triangles for ears', shape: 'triangles', image: catStep2 },
            { text: 'Draw two dots for eyes and a tiny nose', shape: 'face', image: catStep3 },
            { text: 'Add whiskers and a smile!', shape: 'whiskers', image: catStep4 },
        ]
    },
    {
        id: 'apple',
        title: 'Happy Apple',
        icon: '🍎',
        steps: [
            { text: 'Draw a round heart shape', shape: 'circle-ish', image: appleStep1 },
            { text: 'Add a stem on top', shape: 'line', image: appleStep2 },
            { text: 'Draw a leaf and refine shape', shape: 'leaf', image: appleStep3 },
            { text: 'Give it a cute face!', shape: 'face', image: appleStep4 },
        ]
    },
    {
        id: 'bird',
        title: 'Chubby Bird',
        icon: '🐦',
        steps: [
            { text: 'Draw a big circle for the body', shape: 'circle', image: birdStep1 },
            { text: 'Add a tail feather', shape: 'tail', image: birdStep2 },
            { text: 'Draw a wing and beak', shape: 'wing', image: birdStep3 },
            { text: 'Add little stick legs and an eye', shape: 'details', image: birdStep4 },
        ]
    },
    {
        id: 'icecream',
        title: 'Ice Cream',
        icon: '🍦',
        steps: [
            { text: 'Draw a triangle cone', shape: 'triangle', image: icecreamStep1 },
            { text: 'Add a scoop on top', shape: 'circle', image: icecreamStep2 },
            { text: 'Add a cherry or sprinkles', shape: 'cherry', image: icecreamStep3 },
            { text: 'Add a happy face and cone details', shape: 'details', image: icecreamStep4 },
        ]
    },
    {
        id: 'flower',
        title: 'Sunflower',
        icon: '🌻',
        steps: [
            { text: 'Draw a small circle', shape: 'circle', image: flowerStep1 },
            { text: 'Draw petals around it', shape: 'petals', image: flowerStep2 },
            { text: 'Add a stem', shape: 'stem', image: flowerStep3 },
            { text: 'Add leaves and a face', shape: 'details', image: flowerStep4 },
        ]
    },
    {
        id: 'sun',
        title: 'Mr. Sun',
        icon: '☀️',
        steps: [
            { text: 'Draw a circle', shape: 'circle', image: sunStep1 },
            { text: 'Add four main rays', shape: 'rays', image: sunStep2 },
            { text: 'Add smaller rays in between', shape: 'rays', image: sunStep3 },
            { text: 'Draw a warm smiling face', shape: 'face', image: sunStep4 },
        ]
    }
];
