using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BinanceCoin.Models
{
    public class BinanceModel
    {
        public string EventType { get; set; }
        public string EventTime { get; set; }
        public string Symbol { get; set; }
        public string ClosePrice { get; set; }
        public string OpenPrice { get; set; }
        public string HighPrice { get; set; }
        public string Lowprice { get; set; }
        public string TotalTradedBase { get; set; }
        public string TotalTradedQuote { get; set; } 
    }
}
