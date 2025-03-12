import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
<<<<<<< HEAD
import { environment } from '../../../environments/environment.prod';
import * as emailjs from 'emailjs-com'; 
=======
>>>>>>> 2c1bc98db42b79357fe11b8350afa64f161d62aa

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  contactForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
<<<<<<< HEAD
      const formData = this.contactForm.value;

      // Sending the form data to EmailJS
      this.sendEmail(formData);
    }
  }

  // Send the email using EmailJS
  sendEmail(formData: any): void {
    const serviceId = environment.emailjs.serviceId; // Get the service ID from environment
    const templateId = environment.emailjs.templateId; // Get the template ID from environment
    const userId = environment.emailjs.userId; // Get the user ID from environment

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
    };

    emailjs.send(serviceId, templateId, templateParams, userId).then(
      (response) => {
        console.log('Email sent successfully:', response);
        alert('Thank you for contacting us!');
      },
      (error) => {
        console.error('Email sending error:', error);
        alert('Something went wrong. Please try again.');
      }
    );
  }
=======
      console.log(this.contactForm.value);
      // You can add logic to send form data to your backend
    } else {
      console.log('Form is invalid');
    }
  }
>>>>>>> 2c1bc98db42b79357fe11b8350afa64f161d62aa
}
