import { Component, Input } from '@angular/core';
import { NearEarthObject } from 'src/app/model/NearEarthObject';

@Component({
  selector: 'app-neo-item',
  templateUrl: './neo-item.component.html',
  styleUrls: ['./neo-item.component.scss']
})
export class NeoItemComponent {
  @Input({required: true}) object!: NearEarthObject;
  class = window.innerWidth > 1200 ? 'third' : '';
}
