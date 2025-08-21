import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ReCaptchaV3Service, RecaptchaV3Module } from 'ng-recaptcha';
import { environment } from '../../../environments/environment';
import * as emailjs from 'emailjs-com';
import { CommonModule } from '@angular/common';

declare const bootstrap: any;

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RecaptchaV3Module,
  ],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit, AfterViewInit {
  contactForm: FormGroup;
  siteKey: string = environment.recaptcha.recaptchaSiteKey;
  recaptchaToken: string | null = null;
  isLoading: boolean = false;
  toastMessage: string = '';
  toastClass: string = 'bg-success text-white';

  @ViewChild('toastEl', { static: false }) toastEl!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private recaptchaV3Service: ReCaptchaV3Service
  ) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {}

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.showToast('Please fill all required fields.', false);
      return;
    }
    this.isLoading = true;

    // Trigger reCAPTCHA validation
    this.recaptchaV3Service.execute('contact_form').subscribe({
      next: (token: string) => {
        this.recaptchaToken = token;
        this.sendEmail(this.contactForm.value);  // Send email after reCAPTCHA verification
      },
      error: (err) => {
        console.error('reCAPTCHA error', err);
        this.showToast('reCAPTCHA verification failed.', false);
        this.isLoading = false;
      },
    });
  }

  sendEmail(formData: any): void {
    const emailData = {
      service_id: environment.emailjs.serviceId,
      template_id: environment.emailjs.templateId,
      user_id: environment.emailjs.userId,
      template_params: {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        'g-recaptcha-response': this.recaptchaToken, // Send reCAPTCHA response with the email
      },
    };

    this.http.post('https://api.emailjs.com/api/v1.0/email/send', emailData, { responseType: 'text' })
      .subscribe(
        (response) => {
          this.isLoading = false;
          if (response.includes('OK')) {
            this.showToast('Thank you! Your message has been sent.', true);
            this.contactForm.reset();
            this.recaptchaToken = null;
          } else {
            this.showToast('Failed to send message. Please try again later.', false);
          }
        },
        (error) => {
          console.error('Error sending email:', error);
          this.showToast('Something went wrong. Please try again.', false);
          this.isLoading = false;
        }
      );
  }

  showToast(message: string, isSuccess: boolean = true): void {
    this.toastMessage = message;
    this.toastClass = isSuccess ? 'bg-success text-white' : 'bg-danger text-white';
    const toastElement = this.toastEl?.nativeElement;
    if (toastElement) {
      const toast = new bootstrap.Toast(toastElement);
      toast.show();
    }
  }
}
