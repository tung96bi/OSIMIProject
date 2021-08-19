import { Injectable } from '@angular/core';  
import { HttpClient, HttpHeaders } from '@angular/common/http';  
import { Observable, throwError, of } from 'rxjs';  
import { catchError, map } from 'rxjs/operators';  
import { Binance } from './binance';  
import { environment } from 'src/environments/environment';  
  
@Injectable({  
  providedIn: 'root'  
})  
export class BinanceService {  

}    
