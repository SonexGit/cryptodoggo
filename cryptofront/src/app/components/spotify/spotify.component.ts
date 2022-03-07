import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-spotify',
  templateUrl: './spotify.component.html',
  styleUrls: ['./spotify.component.css']
})
export class SpotifyComponent implements OnInit {
  listeMusique: any[]
  aTrouve: boolean
  constructor() {
    this.aTrouve = false
    this.listeMusique = new Array()
  }

  ngOnInit(): void {

  }
}
