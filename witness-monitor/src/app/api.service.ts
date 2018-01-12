import { Injectable } from '@angular/core';
import { QueueingSubject } from 'queueing-subject';
import { Observable } from 'rxjs/Observable';
import websocketConnect from 'rxjs-websockets';
import 'rxjs/add/operator/share';

@Injectable()
export class ApiService {
  private inputStream: QueueingSubject<string>;
  public messages: Observable<string>;

  public connect() {
    if (this.messages) {
      return;
    } else {
      this.inputStream = new QueueingSubject<string>();

      this.messages = websocketConnect(
        'wss://node.firecrab-witness.com:8090/', // 'wss://ppy002.bts-nodes.net/wss',
        this.inputStream
      ).messages.share();
    }
  }

  public send(message: string): void {
    this.inputStream.next(message);
  }
}
