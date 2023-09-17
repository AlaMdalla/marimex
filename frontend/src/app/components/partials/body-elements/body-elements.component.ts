import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-body-elements',
  templateUrl: './body-elements.component.html',
  styleUrls: ['./body-elements.component.css']
})
export class BodyElementsComponent implements OnInit {
  images = [
    { src: '../../assets/Gallery/1.jpg', alt: 'Image 1' },
    { src: '../../assets/Gallery/2.jpg', alt: 'Image 2' },
    { src: '../../assets/Gallery/3.jpg', alt: 'Image 3' },
    { src: '../../assets/Gallery/4.jpg', alt: 'Image 4' },
    { src: '../../assets/Gallery/5.jpg', alt: 'Image 1' },
    { src: '../../assets/Gallery/6.jpg', alt: 'Image 2' },
    { src: '../../assets/Gallery/7.jpg', alt: 'Image 3' },
    { src: '../../assets/Gallery/8.jpg', alt: 'Image 4' },
    { src: '../../assets/Gallery/9.jpg', alt: 'Image 1' },
    { src: '../../assets/Gallery/10.jpg', alt: 'Image 2' },
    { src: '../../assets/Gallery/11.jpg', alt: 'Image 3' },
    { src: '../../assets/Gallery/12.jpg', alt: 'Image 4' },
  ];

  sliderImages: any[] = [];
  currentIndex = 0;

  ngOnInit() {
    this.divideIntoSets();
    this.startSlideshow();

    const sections = document.querySelectorAll('section');
    const options = {
      threshold: 0.5 // Adjust this threshold value based on your preference
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show-animate');
        } else {
          entry.target.classList.remove('show-animate');
        }
      });
    }, options);

    sections.forEach(section => {
      observer.observe(section);
    });
  }

  divideIntoSets(): void {
    for (let i = 0; i < this.images.length; i += 3) {
      const set = this.images.slice(i, i + 3);
      this.sliderImages.push(set);
    }
  }

  startSlideshow(): void {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.sliderImages.length;
    }, 5000); // 5 seconds
  }
}
