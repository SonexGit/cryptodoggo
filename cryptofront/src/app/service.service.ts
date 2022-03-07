import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private url = "http://localhost:8010/proxy?query=%23";
  private bearerToken= "AAAAAAAAAAAAAAAAAAAAAEIoYQEAAAAAygnV%2FyIDRw3%2FBaCfVlgqM23polA%3DZxdmZLWenUW0p8Gmbov1SBvh9Cxja9CmbRF8KriM8vhVwFpJt8";

  constructor(private http: HttpClient) {
    
  }

  getTweet(){
    var hashtag= "Musk";
    var header = new HttpHeaders().set('Access-Control-Allow-Origin','http://127.0.0.1:4200/%27')
    .set("Access-Control-Allow-Methods", "POST, GET, OPTIONS")     
    .set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With")     
    .set("Authorization", "Bearer " + this.bearerToken);
    return this.http.get(this.url + hashtag, {'headers': header});
  }


}