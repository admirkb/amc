import {Component, ElementRef, AfterViewInit, AfterViewChecked, OnDestroy, Input, Output, EventEmitter, Renderer} from 'angular2/core';



@Component({
    selector: 'p-modal-admir',
    template: `
        <div style="background:black;">

            <div>
                <ng-content></ng-content>
            </div>

        </div>
    `,
})
export class ModalAdmir {


    constructor() {


        console.log("in constructor of ModalAdmir");
    }


}