import { Gist } from './gist.model';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class GistService {
  gistListener: EventEmitter<any> = new EventEmitter<any>();

  constructor(private http: HttpClient) {
  }

  // Get all saved gists
  getAllGists() {
    return this.http.get('http://localhost:3000/api/gist');
  }

  // Get a gist by Id
  getGistById(gistId) {
    return this.http.get('http://localhost:3000/api/gist/' + gistId);
  }

  // register a new gist
  postGist(gist: Gist) {
    return this.http.post('http://localhost:3000/api/gist', gist);
  }

  // update a gist
  updateGist(gist: Gist) {
    return this.http.put('http://localhost:3000/api/gist', gist);
  }

  // delete a gist
  deleteGist(gistId) {
    return this.http.delete('http://localhost:3000/api/gist/' + gistId);
  }

  emitGistListUpdated(gist: Gist) {
    this.gistListener.emit();
  }
}
