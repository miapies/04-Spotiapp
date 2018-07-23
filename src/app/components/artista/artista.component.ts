import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styles: []
})
export class ArtistaComponent {
  artista: any = {};
  topTracks: any[] = [];

  loading: boolean;

  constructor(private route: ActivatedRoute, private spotify: SpotifyService) {
    route.params.subscribe(params => {
      this.getArtista(params.id);
      this.getTopTracks(params.id);
    });
  }

  getArtista(id: string) {
    this.loading = true;
    this.spotify.getToken().subscribe((token: string) => {
      this.spotify.getArtista(id, token).subscribe(artista => {
        // console.log(artista);
        this.artista = artista;
        this.loading = false;
      });
    });
  }

  getTopTracks(id: string) {
    this.spotify.getToken().subscribe((token: string) => {
      this.spotify.getTopTracks(id, token).subscribe(topTracks => {
        // console.log(topTracks);
        this.topTracks = topTracks;
      });
    });
  }
}
