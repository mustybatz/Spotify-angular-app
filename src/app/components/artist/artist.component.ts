import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {
  artista:any = {}
  tracks:any[] = [];
  loading:boolean;

  constructor( private route:ActivatedRoute, private spotify:SpotifyService ) {
    this.loading = true;
    this.route.params.subscribe( (params) => {
      this.getArtista(params['id']);
      this.getTopTracks(params['id']);
    } )
  }

  getArtista(id:string){
    this.spotify.getArtista(id)
      .subscribe(
        artista => {
          this.artista = artista;
          this.loading = false;
        }
      )
  }

  getTopTracks( id:string ){
    this.spotify.getToptracks(id)
      .subscribe(
        topTracks => {
          this.tracks = topTracks;
          console.log(this.tracks)
        }
      )
  }

  ngOnInit(): void {
  }

}
