import { trigger, state, style, transition, animate, Directive, Attribute, Component, OnInit, Input } from '@angular/core';

import * as funnies from '../../assets/funnies/index';

var animationTime = 0.3;

@Component({
    selector: 'app-funnies',
    template: `<div class="container">
                <div class="box">                  
                  <h2  [@visibility]="visibility" id="funnies-text">{{message}}</h2>
                </div>
              </div>`,
    styles: [`.container{
                width:100%;
                height:100%;
                display: flex;    
                align-items: center;
                flex-direction: column;
                justify-content: center;
            }`,

        `.box{
                display: flex;    
                align-items: center;
                flex-direction: column;
                justify-content: center;
                text-align: center;
                width:90%;
                height:30%;
                background: #444;
                color: #fff;
                box-shadow: 0px 12px 31px -9px #333;
            }`],
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
