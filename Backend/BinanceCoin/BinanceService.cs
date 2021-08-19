using BinanceCoin.BNHub;
using BinanceCoin.Models;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Hosting;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using WebSocketSharp;

namespace BinanceCoin
{
    public class BinanceService : BackgroundService
    {
        private readonly IHubContext<BinanceHub> _hubContext;

        public BinanceService(IHubContext<BinanceHub> hubContext)
        {
            _hubContext = hubContext;
        }
        protected override Task ExecuteAsync(CancellationToken stoppingToken)
        {
            try
            {
                var ws = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@miniTicker/ethbtc@miniTicker/bnbbtc@miniTicker/wavesbtc@miniTicker/eosbtc@miniTicker");
                ws.Connect();
                ws.OnMessage += Ws_onmessage;
            }
            catch (Exception)
            {
                throw;
            }
            //throw new NotImplementedException();
            return Task.CompletedTask;
        }

        private async void Ws_onmessage(object sender, MessageEventArgs messageEventArgs)
        {
            try
            {
                var message = JsonConvert.DeserializeObject<Message>(messageEventArgs.Data);
                var binance = new BinanceModel()
                {
                    EventType = message.e,
                    EventTime = message.E,
                    Symbol = message.s,
                    ClosePrice = message.c,
                    OpenPrice = message.o,
                    HighPrice = message.h,
                    Lowprice = message.l,
                    TotalTradedBase = message.v,
                    TotalTradedQuote = message.q
                };
                switch (binance.Symbol)
                {
                    case "BTCUSDT":
                        await _hubContext.Clients.All.SendAsync("BinanceBTCUSDT", binance);
                        break;
                    case "ETHBTC":
                        await _hubContext.Clients.All.SendAsync("BinanceETHBTC", binance);
                        break;
                    case "BNBBTC":
                        await _hubContext.Clients.All.SendAsync("BinanceBNBBTC", binance);
                        break;
                    case "WAVESBTC":
                        await _hubContext.Clients.All.SendAsync("BinanceWAVESBTC", binance);
                        break;
                    case "EOSBTC":
                        await _hubContext.Clients.All.SendAsync("BinanceEOSBTC", binance);
                        break;
                }  
            }
            catch (Exception ex)
            {
                throw;
            }
        }
    }
}
