import { trigger, state, style, transition, animate, Directive, Attribute, Component, OnInit, Input } from '@angular/core';

import * as funnies from '../../assets/funnies';

const animationTime = 0.3;

@Component({
  selector: 'app-funnies',
  template: `<div class="container">
                <div class="box">
                  <h1>Loading</h1>
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
  count=0;
  message = '';    
  visibility:string = "active";  
  funniesMessages = [];
  @Input() interval = 1000;
  @Input() customMessages;

  toggleState() {
    this.visibility = (this.visibility === 'active' ? 'inactive' : 'active');
  }

  constructor() {   
    
   }

  ngOnInit() {     
    this.funniesMessages = (this.customMessages && this.customMessages.length>0) ? this.customMessages : funnies.default;
    this.message = this.funniesMessages[this.count];
    setTimeout(()=>{this.toggleState()}, this.interval-(animationTime*1000))
    setInterval(()=>{
      this.count++      
      this.toggleState();      
      if(this.count>this.funniesMessages.length-1) this.count=0;
      this.message = this.funniesMessages[this.count];      
      setTimeout(()=>{this.toggleState()}, this.interval-(animationTime*1000))
    },this.interval)
  }

}
