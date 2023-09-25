// TODO: Handle responsiveness more gracefully (remove hardcoded breakpoints...)

import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { NearEarthObject } from './model/NearEarthObject';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private objectsSubscription!: Subscription;
  public objects!: NearEarthObject[];
  public isLoading = true;
  public today = new Date();

  constructor(private dataService: DataService) { }

  ngOnInit() {
    const objects$ = this.dataService.objects$.pipe();
    this.objectsSubscription = objects$.subscribe(data => {
      this.objects = data;
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    this.objectsSubscription.unsubscribe();
  }
}
