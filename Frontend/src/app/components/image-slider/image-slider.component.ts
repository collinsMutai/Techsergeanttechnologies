import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-image-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.css'],
})
export class ImageSliderComponent {
  currentSlideIndex = 0;
  progressBarWidth = 0; // Progress bar width (in percentage)
  slideDuration = 5000; // Duration each slide stays active (5 seconds)
  progressInterval: any; // Store the interval for the progress bar

  slides = [
    {
      imgSrc: 'assets/image6.jpg',
      subtitle: 'Boost Your Online Presence',
      title: 'Your Trusted Digital Marketing Partner',
      description:
        'Unlock the power of digital marketing and SEO to grow your business. Our expert strategies drive traffic, increase conversions, and help you stand out in a competitive market.',
    },
    {
      imgSrc: 'assets/image4.jpg',
      subtitle: 'SEO That Delivers Results',
      title: 'Rank Higher, Reach Further',
      description:
        'With our advanced SEO techniques, we ensure your website ranks at the top of search engines, bringing more organic traffic and visibility to your brand.',
    },
    {
      imgSrc: 'assets/image4.jpg',
      subtitle: 'Data-Driven Strategies',
      title: 'Maximize ROI with Targeted Campaigns',
      description:
        'Our digital marketing strategies are backed by data and analytics to guarantee maximum ROI. From pay-per-click (PPC) to social media ads, we optimize every campaign for success.',
    },
    {
      imgSrc: 'assets/image4.jpg',
      subtitle: 'Tailored Marketing Plans',
      title: 'Custom Solutions for Every Business',
      description:
        'We understand that each business is unique. That&apos;s why we create personalized marketing and SEO plans that align with your goals, audience, and industry.',
    },
  ];

  ngOnInit() {
    this.autoChangeSlide();
  }

  // Automatically change slides every 5 seconds
  autoChangeSlide() {
    setInterval(() => {
      this.nextSlide();
      this.resetProgressBar();
    }, this.slideDuration);

    this.startProgressBar();
  }

  nextSlide() {
    this.currentSlideIndex = (this.currentSlideIndex + 1) % this.slides.length;
  }

  // Reset progress bar
  resetProgressBar() {
    this.progressBarWidth = 0;
    // Clear the previous interval to avoid multiple progress updates
    clearInterval(this.progressInterval);
    this.startProgressBar();
  }

  // Start the progress bar for each slide
  startProgressBar() {
    let elapsedTime = 0;

    this.progressInterval = setInterval(() => {
      elapsedTime += 100; // Increase the elapsed time in 100ms intervals
      this.progressBarWidth = (elapsedTime / this.slideDuration) * 100; // Calculate the progress in percentage

      if (elapsedTime >= this.slideDuration) {
        clearInterval(this.progressInterval); // Stop the progress when the slide duration ends
      }
    }, 100); // Update progress bar every 100ms
  }
}
