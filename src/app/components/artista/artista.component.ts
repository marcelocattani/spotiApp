import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styleUrls: ['./artista.component.css']
})
export class ArtistaComponent implements OnInit {

  tracks : any[];
  artista : any = {};
  loading : boolean;

  constructor(private activatedRouter : ActivatedRoute, private spotify : SpotifyService) {
    this.activatedRouter.params.subscribe( params => {
      this.getArtista( params['id']);
      this.getCanciones(params['id']);
    })
   }

  ngOnInit() {
  }

  getArtista( id : string ){

    this.loading = true;

    this.spotify.getArtist( id)
    .subscribe( (artista : any) => {

      this.artista = artista;
      this.loading = false;

    });
  }

  getCanciones (id : string){
    this.spotify.getTopTracks(id).subscribe( ( data: any) => {
      this.tracks = data;      
      console.log ( this.tracks);
    })  
  }

  


}
