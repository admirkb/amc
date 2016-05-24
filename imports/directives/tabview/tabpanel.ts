import {Component,Input} from 'angular2/core';
import {TabView} from './tabview';

@Component({
    selector: 'p-tabPanel',
    template: `
        <div style="background-color:black" class="ui-tabview-panel ui-widget-content" [style.display]="selected ? 'block' : 'none'" *ngIf="!closed">
            <ng-content></ng-content>
        </div>
    `,
})
export class TabPanel {

    @Input() header: string;

    @Input() selected: boolean;
    
    @Input() disabled: boolean;
    
    @Input() closable: boolean;
    
    @Input() headerStyle: any;
    
    @Input() headerStyleClass: string;
    
    public hoverHeader: boolean;
    
    public closed: boolean;
}