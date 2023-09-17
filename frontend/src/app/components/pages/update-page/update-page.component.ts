import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MarbleService } from 'src/app/services/marble.service';
import { Marble } from 'src/app/shared/models/marble';

@Component({
  selector: 'update-page',
  templateUrl: './update-page.component.html',
  styleUrls: ['./update-page.component.css']
})
export class UpdatePageComponent implements OnInit {
  updateForm!: FormGroup;
  isSubmited = false;
  marbleId: string;
  returnURL = '';
  constructor(
    private formBuilder: FormBuilder,
    private marbleService: MarbleService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.marbleId = this.activatedRoute.snapshot.params.marbleId;
  }

  ngOnInit(): void {
    this.updateForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      price: ['', [Validators.required]],
      tags: ['', Validators.required],
      favorite: ['', [Validators.required]],
      stars: ['', [Validators.required]],
      imageurl: ['', [Validators.required]],
      descriptions: ['', [Validators.required]],
    });

    // Fetch the current marble details and patch the form values
    this.marbleService.getMarbleById(this.marbleId).subscribe(
      (marble) => {
        this.updateForm.patchValue(marble); // Patches the form with the existing marble details
      },
      (error) => {
        console.error('Failed to fetch marble details for update.', error);
      }
    );

    this.returnURL = this.activatedRoute.snapshot.queryParams.returnUrl;
  }

  get fc() {
    return this.updateForm.controls;
  }

  submit() {
    this.isSubmited = true;
    if (this.updateForm.invalid) return;

    const updatedMarbleData = this.updateForm.value;
    // Split tags into an array if they are in comma-separated format

    this.marbleService.updateMarble(this.marbleId, updatedMarbleData).subscribe(
      (updatedMarble) => {
        console.log('Marble updated successfully!', updatedMarble);
        // Redirect to the marble details page after successful update
        this.router.navigateByUrl(`/marble/${this.marbleId}`);
      },
      (error) => {
        console.error('Failed to update marble.', error);
      }
    );
  }
}
