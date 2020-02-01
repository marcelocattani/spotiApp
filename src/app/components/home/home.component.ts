import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  nuevasCanciones: any[];
  loading: boolean;
  pum : boolean;
  errorMensaje :string;

  constructor(private spotify : SpotifyService) {
    this.loading = true;
    this.pum = false;

    this.spotify.getNewReleases().subscribe( (data:any) => {     
      this.nuevasCanciones = data;
      this.loading = false;
    },(err) => {
      this.loading = false;
      this.pum = true;
      this.errorMensaje = err.error.error.message;
    }
    );
   }

  ngOnInit() {
    
  }

}
