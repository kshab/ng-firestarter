import {Component, OnInit} from '@angular/core';
import {
  FormBuilder,
  FormGroup, Validators,
} from '@angular/forms';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-email-login',
  templateUrl: './email-login.component.html',
  styleUrls: ['./email-login.component.scss']
})
export class EmailLoginComponent implements OnInit {
  public form: FormGroup;
  public type: 'login' | 'signup' | 'reset' = 'signup';
  public loading = false;
  public serverMessage: string;

  constructor(
    private fireAuth: AngularFireAuth,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: [
        '',
        [Validators.required, Validators.email]
      ],
      password: [
        '',
        [Validators.required, Validators.minLength(6)]
      ],
      passwordConfirm: ['', []]
    });
  }

  changeType(val) {
    this.type = val;
  }

  get isLogin() {
    return this.type === 'login';
  }

  get isSignup() {
    return this.type === 'signup';
  }

  get isPasswordReset() {
    return this.type === 'reset';
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  get passwordConfirm() {
    return this.form.get('passwordConfirm');
  }

  get passwordDoesMatch() {
    if (this.type !== 'signup') {
      return true;
    } else {
      return this.password.value === this.passwordConfirm.value;
    }
  }

  async onSubmit() {
    this.loading = true;

    const email = this.email.value;
    const password = this.password.value;

    try {
      if (this.isLogin) {
        await this.fireAuth.auth.signInWithEmailAndPassword(email, password);
      }

      if (this.isSignup) {
        await this.fireAuth.auth.createUserWithEmailAndPassword(email, password);
      }

      if (this.isPasswordReset) {
        await this.fireAuth.auth.sendPasswordResetEmail(email);
        this.serverMessage = 'Check your mail';
      }
    } catch (error) {
      this.serverMessage = error;
    }

    this.loading = false;
  }

}
