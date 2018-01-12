import { Component } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ApiService } from './api.service';
import { OnInit, OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Witness Monitor';
  private socketSubscription: Subscription;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.connect();

    this.socketSubscription = this.api.messages.subscribe((message: string) => {
      console.log('received message from server: ', message);
    });

    this.api.send('{"jsonrpc": "2.0", "method": "call", "params": [0, "get_accounts", [["1.2.0"]]], "id": 1}');
  }

  ngOnDestroy() {
    this.socketSubscription.unsubscribe();
  }

  broadcast() {
    const connection = this.api.connect();

    if (this.socketSubscription.closed === true) {
      this.socketSubscription = this.api.messages.subscribe((message: string) => {
        console.log('received message from server: ', message);
      });
    }

    this.api.send('{"jsonrpc": "2.0", "method": "call", "params": [0, "get_accounts", [["1.2.0"]]], "id": 1}');
  }
}
