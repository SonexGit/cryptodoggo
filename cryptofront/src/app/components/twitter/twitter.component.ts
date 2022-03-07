import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../service.service';
@Component({
  selector: 'app-twitter',
  templateUrl: './twitter.component.html',
  styleUrls: ['./twitter.component.css']
})
export class TwitterComponent implements OnInit {


  idTweet1: string;
  idTweet2: string;
  idTweet3: string;
  affiche: boolean;
  constructor(private Service: ServiceService) {
    this.idTweet1="Le tweet n°1";
    this.idTweet2="Le tweet n°2";
    this.idTweet3="Le tweet n°3";
    this.affiche=false;
   }

  ngOnInit(): void {
    var nimportecomment;
    
    this.Service.getTweet().subscribe((nomdunevariable: any) =>{
      nimportecomment=JSON.parse(JSON.stringify(nomdunevariable)),
      console.log("texte",nimportecomment);
      console.log(nimportecomment.data[0]);
      this.idTweet1=nimportecomment.data[0].id;
      console.log(nimportecomment.data)
      this.idTweet2=nimportecomment.data[1].id;
      this.idTweet3=nimportecomment.data[2].id;
      this.affiche=true;
      console.log(this.idTweet1);
      console.log(this.idTweet2);
      console.log(this.idTweet3);
    });
  }

}