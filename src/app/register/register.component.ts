import { Component } from '@angular/core';
import { NgClass } from '@angular/common';

import { RouterLink } from '@angular/router';

import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordValidator } from './password-validator';

import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    NgClass,
    RouterLink,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}}
  ],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  protected form: FormGroup;
  protected minlength: number = 8;

  constructor(
    private formBuilder: FormBuilder,
  ){
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required],
    }, {validators: passwordValidator});
  }

  onSubmit(): void {
    if (this.form.valid) {
//
console.log('Registring...');
console.log(this.form.value);
//
    }
  }
}
