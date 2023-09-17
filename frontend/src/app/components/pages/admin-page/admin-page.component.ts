import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MarbleService } from 'src/app/services/marble.service';
import { UserService } from 'src/app/services/user.service';
import { Marble } from 'src/app/shared/models/marble';
import { User } from 'src/app/shared/user';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent {
  user!:User;
  marbles: Marble[] = [];
  p:number=1;
  itemsPerPage:number=8;  

  constructor(private marbleService: MarbleService, private activatedRoute: ActivatedRoute,private router: Router, private userService:UserService){
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
       userService.userObservable.subscribe((newUser) => {
        this.user = newUser;
      })
     });
    
  }
  
  onPageChange(pageNumber: number): void {
    this.p = pageNumber;

    // Scroll to the top of the component after changing the page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  deleteMarble(marbleId: string): void {
    this.marbleService.deleteMarble(marbleId).subscribe(() => {
      // After successfully deleting the marble, update the marbles array
      // to remove the deleted marble from the list
      this.marbles = this.marbles.filter((marble) => marble.id !== marbleId);
    });
  }
  navigateToUpdateMarble(marbleId: string) {
    this.router.navigate(['update', marbleId]);
  }
  get isAdmin(){
    return this.user.isAdmin;
  }
}


