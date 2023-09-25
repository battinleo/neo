import { Component, OnInit } from '@angular/core';
import { Observable, Subscription, tap } from 'rxjs';
import { NearEarthObject } from './model/NearEarthObject';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-parsed-api-data',
  template: `
    <div *ngIf="!isLoading; else spinner">
      <mat-grid-list cols="3" rowHeight="150">
        <mat-grid-tile *ngFor="let object of objects">
          <mat-card>
            <mat-card-header>
              <mat-card-title>{{ object.name }}</mat-card-title>
              <mat-card-subtitle>Subtitle</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <p>Card content</p>
            </mat-card-content>
          </mat-card>
        </mat-grid-tile>
      </mat-grid-list>
    </div>

    <ng-template #spinner>
      <div class="page-center">
        <mat-spinner></mat-spinner>
      </div>
    </ng-template>
  `,
  styles: [
    `.page-center {
      width: 100vw;
      height: 100vh;
      display: grid;
      place-items: center;
    }`,
    `mat-card {
      width: 28vw
    }`
  ]
})
export class ParsedApiDataComponent {
  private objects$!: Observable<NearEarthObject[]>;
  private objectsSubscription!: Subscription;

  public objects!: NearEarthObject[];
  public isLoading = true;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.objects$ = this.dataService.objects$.pipe();
    this.objectsSubscription = this.objects$.subscribe(data => {
      this.objects = data;
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    this.objectsSubscription.unsubscribe();
  }
}
