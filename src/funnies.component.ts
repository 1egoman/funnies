import { trigger, state, style, transition, animate, Component, OnInit, Input } from '@angular/core';

//change this path to the path of Funnies class
import * as funnies from '../../assets/funnies/index';

var animationTime = 0.3;

@Component({
    selector: 'app-funnies',
    template: `<span  [@visibility]="visibility" id="funnies-text">{{message}}</span>`,
    animations: [
        trigger('visibility', [
            state('active', style({
                opacity: 1, transform: 'translateY(0)'
            })),
            state('inactive', style({
                opacity: 0, transform: 'translateY(20px)'
            })),
            transition('* => *', animate(animationTime + 's'))
        ])
    ]
})

export class FunniesComponent implements OnInit {
    private message = '';
    private visibility:string = "active";
    private _funnies;
    @Input() interval = 8000;
    @Input() customMessages;
    @Input() duration = 300;

    toggleState() {
        this.visibility = (this.visibility === 'active' ? 'inactive' : 'active');
    }

    constructor() {
        this._funnies = new funnies.Funnies(this.customMessages);
    }

    ngOnInit() {
        this.showMessage(true)
        setInterval(()=>{
            this.showMessage(false);
        },this.interval)
    }

    showMessage(first){
        if(!first)this.toggleState();
        this.message = this._funnies.message();
        setTimeout(()=>{
            this.toggleState()}, this.interval-(animationTime*1000))
    }

}
