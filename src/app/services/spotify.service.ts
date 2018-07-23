import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private TOKEN_SPOTIFY: string;

  constructor(private http: HttpClient) {}

  private getQuery(query: string, token: string) {
    const url = `https://api.spotify.com/v1/${query}`;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get(url, { headers });
  }

  getNewReleases(token: string) {
    return this.getQuery('browse/new-releases?limit=20', token).pipe(
      map(data => data['albums'].items)
    );
  }

  getArtistas(termino: string, token: string) {
    return this.getQuery(
      `search?q=${termino}&type=artist&limit=15`,
      token
    ).pipe(map(data => data['artists'].items));
  }

  getArtista(id: string, token: string) {
    return this.getQuery(`artists/${id}`, token);
    // .pipe(
    //   map(data => data['artists'].items)
    // );
  }

  getTopTracks(id: string, token: string) {
    return this.getQuery(`artists/${id}/top-tracks?country=ES`, token).pipe(
      map(data => data['tracks'])
    );
  }

  getToken(nuevoToken?: boolean) {
    if (!nuevoToken && this.TOKEN_SPOTIFY) {
      console.log('TOKEN_SPOTIFY');
      return new Observable(observer => {
        // observable execution
        observer.next(this.TOKEN_SPOTIFY);
        observer.complete();
      }).pipe(
        map(data => {
          // console.log(data);
          return data;
        })
      );
    } else {
      console.log('access_token');
      return this.http
        .get(
          'http://localhost:3000/spotify/1ece79e2bb524a598a9ee1061726db23/2f854fa3024540b3949ecdaad9445963'
        )
        .pipe(
          map(data => {
            this.TOKEN_SPOTIFY = data['access_token'];
            return this.TOKEN_SPOTIFY;
          })
        );
    }
  }
}
