import { Component } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent {
  artistas: any[] = [];
  loading: boolean;

  constructor(private spotify: SpotifyService) {}

  buscar(termino: string) {
    // console.log(termino);
    if (termino.length > 0) {
      this.loading = true;
      this.spotify.getToken().subscribe((token: string) => {
        this.spotify.getArtistas(termino, token).subscribe(data => {
          this.artistas = data;
          this.loading = false;
        });
      });
    } else {
      this.artistas = [];
    }
  }
}
