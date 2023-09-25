import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Oval } from 'src/app/model/NearEarthObject';

const eiffelTowerSizeM = 330;

@Component({
  selector: 'app-object-size',
  templateUrl: './object-size.component.html',
  styleUrls: ['./object-size.component.scss']
})
export class ObjectSizeComponent {
  @Input({ required: true }) dimensions!: Oval;
  @Input({ required: true }) height!: number;

  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  canvas!: HTMLCanvasElement;
  context!: CanvasRenderingContext2D;

  ngAfterViewInit() {
    this.canvas = this.canvasRef.nativeElement;
    this.canvas.height = this.height;
    this.canvas.width = this.canvas.parentElement!.offsetWidth;

    this.context = this.canvas.getContext('2d')!;

    const eiffelTowerImg = new Image();
    eiffelTowerImg.src = 'https://freesvg.org/img/Eiffel-Tower-Silhouette.png';

    const { objectHeight, objectWidth, eiffelTowerHeight } = this.computeCanvasDimensions();

    console.log(eiffelTowerHeight);

    eiffelTowerImg.onload = () => {
      const width = eiffelTowerHeight / eiffelTowerImg.height * eiffelTowerImg.width;
      this.context.ellipse(
        this.canvas.width - objectWidth / 2, this.canvas.height - objectHeight / 2,
        objectWidth / 2, objectHeight / 2,
        0, 0, 2*Math.PI
      );
      this.context.fillStyle = 'grey'
      this.context.fill();
      this.context.drawImage(
        eiffelTowerImg,
        0, this.canvas.height - eiffelTowerHeight,
        width, eiffelTowerHeight
      );
    }
  }

  computeCanvasDimensions() {
    let ratio;
    let objectHeight;
    let objectWidth;
    let eiffelTowerHeight;

    if (this.dimensions.minorAxisMeters > eiffelTowerSizeM) {
      objectHeight = this.height;
      ratio = this.height / this.dimensions.minorAxisMeters;
      objectWidth = ratio * this.dimensions.majorAxisMeters;
      eiffelTowerHeight = ratio * eiffelTowerSizeM;
    } else {
      eiffelTowerHeight = this.height,
      ratio = this.height / eiffelTowerSizeM;
      objectHeight = ratio * this.dimensions.minorAxisMeters;
      objectWidth = ratio * this.dimensions.majorAxisMeters;
    }

    return { objectHeight, objectWidth, eiffelTowerHeight }
  }
}
