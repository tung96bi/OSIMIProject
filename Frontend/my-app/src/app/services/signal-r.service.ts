import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr'
import { Binance } from '../binance/binance';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  public dataUSDT?: Binance;
  public dataETH?: Binance;
  public dataBNB?: Binance;
  public dataWAVES?: Binance;
  public dataEOS?: Binance;

  private hubconnection?: signalR.HubConnection;

  public startConnection = () =>{
    this.hubconnection = new signalR.HubConnectionBuilder()
    .configureLogging(signalR.LogLevel.Debug)
    .withUrl("https://localhost:44395/BinanceHub", {
      skipNegotiation: true,
      transport: signalR.HttpTransportType.WebSockets
    })
    .build();

    this.hubconnection
    .start()
    .then(()=> console.log('connection started'))
    .catch(err => console.log('error while stating connection: '+ err))
  }

  public addTranserdataBTCUSDE = () =>{
    this.hubconnection?.on('BinanceBTCUSDT',(data) => {
      this.dataUSDT = data;
      //console.log(typeof(data));
      //console.log()
    })
  }

  public addTranserdataETH = () =>{
    this.hubconnection?.on('BinanceETHBTC',(data) => {
      this.dataETH = data;
      //console.log(typeof(data));
      //console.log()
    })
  }

  public addTranserdataBNB = () =>{
    this.hubconnection?.on('BinanceBNBBTC',(data) => {
      this.dataBNB = data;
      //console.log(typeof(data));
      //console.log()
    })
  }

  public addTranserdataWAVES = () =>{
    this.hubconnection?.on('BinanceWAVESBTC',(data) => {
      this.dataWAVES = data;
      //console.log(typeof(data));
      //console.log()
    })
  }

  public addTranserdataEOS = () =>{
    this.hubconnection?.on('BinanceEOSBTC',(data) => {
      this.dataEOS = data;
      //console.log(typeof(data));
      //console.log()
    })
  }

}
