import {Component, ElementRef, AfterViewInit, AfterViewChecked, OnDestroy, Input, Output, EventEmitter, Renderer} from 'angular2/core';

import {DomHandler} from '../dom/domhandler';
import {Modal} from './modal';

@Component({
    selector: 'p-modal-delete',
    template: `
        <div style="background:black;" [ngClass]="{'ui-dialog ui-widget ui-widget-content ui-corner-all ui-shadow':true,'ui-dialog-rtl':rtl,'ui-dialog-draggable':draggable}" 
            [style.display]="visible ? 'block' : 'none'" [style.width.px]="width" [style.height.px]="height" (mousedown)="moveOnTop()">
            <div class="ui-dialog-titlebar ui-widget-header ui-helper-clearfix ui-corner-top"
                (mousedown)="initDrag($event)" (mouseup)="endDrag($event)">
                <span class="ui-dialog-title">{{header}}</span>
                <a [ngClass]="{'ui-dialog-titlebar-icon ui-dialog-titlebar-close ui-corner-all':true,'ui-state-hover':hoverCloseIcon}" href="#" role="button" *ngIf="closable" 
                    (click)="hide($event)" (mouseenter)="hoverCloseIcon=true" (mouseleave)="hoverCloseIcon=false">
                    <span class="fa fa-fw fa-close"></span>
                </a>
            </div>
            <div class="ui-dialog-content ui-widget-content" [style.height.px]="contentHeight">
                <ng-content></ng-content>
            </div>
            <ng-content select="footer"></ng-content>
            <div *ngIf="resizable" class="ui-resizable-handle ui-resizable-se ui-icon ui-icon-gripsmall-diagonal-se" style="z-index: 90;"
                (mousedown)="initResize($event)"></div>
        </div>
    `,
    providers: [DomHandler]
})
export class Modal2 extends Modal {


    constructor(el: ElementRef, domHandler: DomHandler, renderer: Renderer) {
        super(el, domHandler, renderer);
        
        console.log("in constructor of Modal2");
    }


}