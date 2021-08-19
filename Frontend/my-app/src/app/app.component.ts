import { Component, OnInit } from '@angular/core';
import { Binance } from './binance/binance';
import { SignalRService } from './services/signal-r.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'my-app';

  constructor(public signalRService: SignalRService) {
  }

  ngOnInit(): void {
    this.signalRService.startConnection();
    this.signalRService.addTranserdataBTCUSDE();
    this.signalRService.addTranserdataETH();
    this.signalRService.addTranserdataBNB();
    this.signalRService.addTranserdataWAVES();
    this.signalRService.addTranserdataEOS();
    this.startHttpRequest()
  }

  private startHttpRequest= () => {

  }
}
