import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http:HttpClient) { }

  getQuery( query:string ){
    const url:string = `https://api.spotify.com/v1/${query}`;

    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQAZr_ZXJQ4_c_k02gOApzmR08qLXcggBj76A8S7N0PCMzvhZu75broSY06C0btkLu3d1UbO8G7SlG2dctc'
    })

    return this.http.get(url, { headers });

  }

  getNewReleases(){

    return this.getQuery('browse/new-releases?limit=20')
      .pipe( map( ( data ) => data['albums'].items));
  }

  getArtistas(termino:string){
    return this.getQuery(`search?q=${termino}&type=artist&limit=15`)
      .pipe( map( data =>  data['artists'].items))
  }

  getArtista(id:string){
    return this.getQuery(`artists/${ id }`);
  }

  getToptracks(id:string){
    return this.getQuery(`artists/${ id }/top-tracks?country=us`)
      .pipe(
        map( tracks => tracks['tracks'] )
      )
  }
}
