import { Component } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent {
  // paises: any[] = [];
  nuevasCanciones: any[] = [];
  loading: boolean;

  error: boolean;
  mensajeError: string;

  constructor(private spotify: SpotifyService) {
    // private http: HttpClient) {
    // console.log('Constructor del home hecho');
    // this.http
    //   .get('https://restcountries.eu/rest/v2/lang/es')
    //   .subscribe((resp: any) => {
    //     console.log(resp);
    //     this.paises = resp;
    //   });
    this.loading = true;
    this.error = false;

    this.spotify.getToken().subscribe((token: string) => {
      this.spotify.getNewReleases(token).subscribe(
        data => {
          this.nuevasCanciones = data;
          this.loading = false;
        },
        errorServicio => {
          this.loading = false;
          this.error = true;
          console.log(errorServicio);
          this.mensajeError = errorServicio.error.error.message;
        }
      );
    });
  }
}
