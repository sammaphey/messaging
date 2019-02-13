import { Injectable } from '@angular/core';
import {Gist} from './gist/gist.model';
import * as io from 'socket.io-client';
import {ToasterService} from 'angular2-toaster';
import { GistService } from './gist/gist.service';

@Injectable()
export class AppSocketIoService {
  private socket: SocketIOClient.Socket; // The client instance of socket.io

  // Constructor with an injection of ToastService
  constructor(
    private toasterService: ToasterService,
    private gistService: GistService
  ) {
    this.socket = io('http://localhost:3000');
  }

  // Emit: gist saved event
  emitEventOnGistSaved(gistSaved) {
      this.socket.emit('gistSaved', gistSaved);
  }

  // Emit: gist updated event
  emitEventOnGistUpdated(gistUpdated) {
    this.socket.emit('gistUpdated', gistUpdated);
  }

  // Consume: on gist saved
  consumeEvenOnGistSaved() {
    this.socket.on('gistSaved', (gist: Gist) => {
      this.toasterService.pop('success', 'NEW GIST SAVED',
          'A gist with title \"' + gist.title + '\" has just been shared' + ' with stack: ' + gist.technologies);
      this.gistService.emitGistListUpdated(gist);
    });
  }

  // Consume on gist updated
  consumeEvenOnGistUpdated() {
    this.socket.on('gistUpdated', (gist: Gist) => {
      this.toasterService.pop('info', 'GIST UPDATED',
          'A gist with title \"' + gist.title + '\" has just been updated');
      this.gistService.emitGistListUpdated(gist);
    });
  }
}
