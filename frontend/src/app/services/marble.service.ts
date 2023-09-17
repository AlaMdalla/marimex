import { Injectable } from '@angular/core';
import { Marble } from '../shared/models/marble'
import { sample_marble, sample_tags } from 'src/data';
import { Tag } from '../shared/models/tag';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { MARBEL_AddMARBEL_URL, MARBEL_BY_ID_URL, MARBEL_BY_SEARCH_URL, MARBEL_BY_TAG_URL, MARBEL_TAGS_URL, MARBEL_URL } from '../shared/constans/urls';
import { ImarbelAdd } from '../shared/interfaces/ImarblesAdd';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class MarbleService {

  constructor(private http:HttpClient,private toastrService: ToastrService) { }
  getAll():Observable<Marble[]>{
    return this.http.get<Marble[]>(MARBEL_URL);
  }
  getAllMarbleBySearchtTerm(searchTerm:string){
    return this.http.get<Marble[]>(MARBEL_BY_SEARCH_URL+searchTerm);
  }
 
  getAllTags():Observable<Tag[]>{
    return this.http.get<Tag[]>(MARBEL_TAGS_URL);  }
   
  getAllmarbleByTag(tag: string) : Observable<Marble[]> {

     return  tag ==="All" ?
    this.getAll():
    this.http.get<Marble[]>(MARBEL_BY_TAG_URL +tag);
     
  }
  getMarbleById(marbelId:string):Observable <Marble>{
    return this.http.get<Marble>(MARBEL_BY_ID_URL+marbelId);
  }
  ADD_Marble(marble: ImarbelAdd): Observable<Marble> {
    return this.http.post<Marble>(MARBEL_AddMARBEL_URL, marble).pipe(
      tap(
        (createdMarble) => {
          this.toastrService.success(
            `Welcome to marimex ${createdMarble.name}!`,
            'Register Successful'
          );
        },
        (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Register Failed');
        }
      )
    );
  }
  deleteMarble(marbleId: string): Observable<void> {
    const url = MARBEL_BY_ID_URL + marbleId;
    return this.http.delete<void>(url).pipe(
      tap(
        () => {
          this.toastrService.success('Marble deleted successfully!', 'Delete Successful');
        },
        (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Delete Failed');
        }
      )
    );
  }
  updateMarble(marbleId: string, updatedMarble: Marble): Observable<Marble> {
    const url = MARBEL_BY_ID_URL + marbleId;
    return this.http.put<Marble>(url, updatedMarble).pipe(
      tap(
        (updatedMarble) => {
          this.toastrService.success('Marble updated successfully!', 'Update Successful');
        },
        (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Update Failed');
        }
      )
    );
  }
  
}



