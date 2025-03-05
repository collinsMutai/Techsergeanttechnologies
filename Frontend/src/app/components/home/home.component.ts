import { Component } from '@angular/core';
import { ImageSliderComponent } from '../image-slider/image-slider.component';
import { NavComponent } from '../nav/nav.component';
import { FooterComponent } from '../footer/footer.component';
import { AboutComponent } from "../about/about.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ImageSliderComponent, NavComponent, FooterComponent, AboutComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
