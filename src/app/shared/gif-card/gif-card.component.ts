import { Component, Input } from '@angular/core';
import { Gif } from '../../core/services/giphy.interface';

@Component({
    selector: 'ngv-gif-card',
    templateUrl: './gif-card.component.html',
    styleUrls: ['./gif-card.component.scss'],
})
export class GifCardComponent {
    @Input() gif: Gif;

    constructor() {}

    public get image(): string {
        return this.gif.images.downsized.url;
    }
}
