import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  constructor(private router: Router) {}

  navigateAbout(): void {
    this.router.navigateByUrl('sec_1');
  }
  navigateGallery(): void {
    this.router.navigateByUrl('sec_2');
  }
}
