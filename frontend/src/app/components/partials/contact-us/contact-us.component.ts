import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr'; // Import ToastrService
import * as emailjs from 'emailjs-com';

@Component({
  selector: 'contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {
  mailForm!: FormGroup;
  isSubmited = false;

  constructor(private formBuilder: FormBuilder, private toastr: ToastrService) {} // Inject ToastrService

  ngOnInit(): void {
    this.mailForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  get fc() {
    return this.mailForm.controls;
  }

  submit() {
    this.isSubmited = true;
    if (this.mailForm.invalid) return;
    this.sendEmail();
   
  }

  sendEmail() {
    const emailParams = {
      to_email: ' ', // Replace with the recipient's email address
      from_name: this.mailForm.value.name, // Replace with the sender's name
      message: this.mailForm.value.message, // Replace with the actual message
    };

    emailjs
      .send('service_7pdzu8k', 'template_l8z28qm', emailParams, 'mQDTTWqBfHKQBfDgM')
      .then((response) => {
        const senderName = this.mailForm.value.name;
        this.toastr.success(`Email sent successfully. Thank you, ${senderName}!`); 
      })
      .catch((error) => {
        this.toastr.error('Failed to send email'); // Use Toastr to show error message
      });
  }
}
