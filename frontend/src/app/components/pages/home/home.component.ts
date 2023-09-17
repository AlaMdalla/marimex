import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, observable } from 'rxjs';
import { MarbleService } from 'src/app/services/marble.service';
import { Marble } from 'src/app/shared/models/marble';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  marbles: Marble[] = [];
  p:number=1;
  itemsPerPage:number=8;
  
  constructor(private marbleService: MarbleService, private activatedRoute: ActivatedRoute) {
    let MarbleObservebal:Observable<Marble[]>
   activatedRoute.params.subscribe((params) => {
      if (params.searchTerm) {
        MarbleObservebal = this.marbleService.getAllMarbleBySearchtTerm(params.searchTerm);
      }
      else if(params.tag)
      MarbleObservebal=this.marbleService.getAllmarbleByTag(params.tag);
      else {
        MarbleObservebal = this.marbleService.getAll();
      }
      MarbleObservebal.subscribe((serverMarble)=>{
        this.marbles=serverMarble;
      })

    });
  }
  
  onPageChange(pageNumber: number): void {
    this.p = pageNumber;

    // Scroll to the top of the component after changing the page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  ngOnInit(): void {
  
  }
}
