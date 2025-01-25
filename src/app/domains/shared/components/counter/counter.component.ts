import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, PLATFORM_ID, signal, SimpleChanges } from '@angular/core';
@Component({
  selector: 'app-counter',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent {
@Input ({required : true}) duration = 0;
@Input ({required : true}) message = '';
counter = signal(0);
counterRef: number | undefined;
constructor( @Inject(PLATFORM_ID) private plataformId: object){ // Never async
  console.log('constructor');
  console.log('-'.repeat(10));
  // before show component  
}

  ngOnChanges(changes:SimpleChanges){ 
    //before and during
    console.log("ngOnChanges");
    console.log('-'.repeat(10));
    console.log(changes)
    const duration = changes["duration"];
    console.log('message =>',this.message);
    if (duration && duration.currentValue !== duration.previousValue) {
      this.doSomething();
    }
    
  }
  ngOnInit(){
    //after render
    //una vez
   // async, then, subs
   console.log('ngOnInit');
   console.log('-'.repeat(10));
   console.log('duration =>', this.duration);
   console.log('msg =>', this.message);
   if (isPlatformBrowser(this.plataformId)){
     this.counterRef = window.setInterval(() => {
       console.log('run interval')
       this.counter.update(statePrev => statePrev + 1);
     }, 1000);
   }
  }
  ngAfterViewInit(){
    //afterrender
    // hijos ya fueron pintados
    console.log('ngAfterViewInit');
    console.log(''.repeat(10));
  } 
  ngOnDestroy(){
    console.log('ngOnDestroy');
    console.log('-'.repeat(10));
    if (isPlatformBrowser(this.plataformId)){
      window.clearInterval(this.counterRef);
    }
  }
  doSomething(){
    console.log('change duration');
    //async

    
  }
}
