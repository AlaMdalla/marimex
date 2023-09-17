import { Component, OnInit } from '@angular/core';
import { MarbleService } from 'src/app/services/marble.service';
import { Tag } from 'src/app/shared/models/tag';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
  tags?: Tag[];
  displayedTags: any[] = [];
  itemsPerPage: number = 3;
  currentPage: number = 1;
  totalPages: number = 1;

  constructor(private marbleService: MarbleService) {}

  ngOnInit() {
    this.marbleService.getAllTags().subscribe((serverTag) => {
      this.tags = serverTag;
      this.calculateTotalPages();
      this.showTags();
    });
  }

  showTags() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.displayedTags = this.tags!.slice(startIndex, startIndex + this.itemsPerPage);
  }

  calculateTotalPages() {
    this.totalPages = Math.ceil(this.tags!.length / this.itemsPerPage);
  }

  generatePageArrows() {
    const arrows: string[] = [];
  
    if (this.currentPage < this.totalPages) {
      arrows.push("Next");
    }
  
    if (this.currentPage > 1) {
      arrows.push("Previous");
    }
  
    return arrows;
  }
  
  

  goToPage(page: string) {
    if (page === "Previous" && this.currentPage > 1) {
      this.currentPage--;
    } else if (page === "Next" && this.currentPage < this.totalPages) {
      this.currentPage++;
    }

    this.showTags();
  }
}
