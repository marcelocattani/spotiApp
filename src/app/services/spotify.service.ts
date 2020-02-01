import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  _token:string = 'Bearer BQAbGGb33a02SXvOzY4phubmRkEazJmWTWCmmqFeBVreBTfN-o4y0SM4oOivr43R5ilFQy4ZDA6osD2yvJc';

  constructor(private http: HttpClient) { }

  getQuery(query : string ) {
    const url = `https://api.spotify.com/v1/${ query }`;

    const headers = new HttpHeaders({
      'Authorization' : this._token
    });

    return this.http.get ( url, {headers});

  }

  getNewReleases(){    

    return this.getQuery ( 'browse/new-releases' )
    .pipe( map ( (data:any) => {
      return data.albums.items;
    }) )    
    
  }

  //OBTENER ARTISTAS POR TERMINO
  //`https://api.spotify.com/v1/search?q=${ termino }&type=artist&limit=15`

  getArtists(termino:string) {
    
    return this.getQuery ( `search?q=${ termino }&type=artist&limit=15`)
    .pipe ( map ( (data : any ) => {
      return data.artists.items;
    }))          
    
  }

  getArtist( id : string ) {
    
    return this.getQuery (`artists/${ id }`);       
    
  }

  /*getTopTracks ( id : string )  {
    this.getQuery (`artists/${ id }/top-tracks?country=us`)
    .pipe ( map ( (data : any) => data['tracks'] ))  

  }*/

  getTopTracks(id:string) {
    
    return this.getQuery ( `artists/${ id }/top-tracks?country=us`)
    .pipe ( map ( (data : any ) => {
      return data.tracks;
    }))          
    
  }



}
