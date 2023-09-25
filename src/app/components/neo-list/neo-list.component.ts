import { Component, HostListener, Input } from '@angular/core';
import { NearEarthObject } from 'src/app/model/NearEarthObject';

@Component({
  selector: 'app-neo-list',
  templateUrl: './neo-list.component.html',
  styleUrls: ['./neo-list.component.scss']
})
export class NeoListComponent {
  @Input({required: true}) objects!: NearEarthObject[];
  public cols = window.innerWidth > 1200 ? 3 : 1;
}
