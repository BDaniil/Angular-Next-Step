import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

interface Data {
  name: string;
  age: string;
  email: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'my-app';

  count = 0;
  passwordInfo = '';
  passwordValid = false;

  data: Array<Data> = [
    {
      name: '',
      age: '',
      email: '',
    },
  ];

  profileForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      nameValidator,
      Validators.pattern('^[a-zA-Z]+$'),
    ]),
    age: new FormControl('', [
      Validators.required,
      ageValidator,
      Validators.pattern('^[0-9]*$'),
    ]),
    email: new FormControl('', [
      Validators.required,
      emailValidator,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
    password: new FormControl('', [
      Validators.required, 
      passwordValidator
    ]),
  });

  addInputs(name: string, age: string, email: string, password: string) {
    this.count = 1;

    this.passwordInfo = password;

    const hasUpperCase = /[A-Z]+/.test(this.passwordInfo);
    const hasLowerCase = /[a-z]+/.test(this.passwordInfo);
    const hasNumeric = /[0-9]+/.test(this.passwordInfo);

    this.passwordValid = hasUpperCase && hasLowerCase && hasNumeric;

    if (this.passwordValid) {
      this.passwordInfo = 'Strong';
    } else {
      this.passwordInfo = 'Weak';
    }
    
    this.data = [
      {
        name: name,
        age: age,
        email: email,
      },
    ];

    
  }
}

function nameValidator(formControl: FormControl) {
  if (formControl.value.length < 3 || formControl.value.length > 10) {
    return { myValidator: { message: 'Enter valid name from 3 to 10' } };
  }
  return null;
}

function ageValidator(formControl: FormControl) {
  if (formControl.value < 10 || formControl.value > 120) {
    return { myValidator: { message: 'Enter valid age from 10 to 120' } };
  }
  return null;
}

function emailValidator(formControl: FormControl) {
  if (formControl.value.length < 8 || formControl.value.length > 30) {
    return { myValidator: { message: 'Enter valid age from 8 to 30' } };
  }
  return null;
}

function passwordValidator(formControl: FormControl) {
  if (formControl.value.length < 10 || formControl.value.length > 120) {
    return { myValidator: { message: 'Enter valid age from 10 to 120' } };
  }
  return null;
}
