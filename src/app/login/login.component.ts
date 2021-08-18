import { Component, OnInit, HostBinding } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../@services/http/http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { loginTransition } from './login.animation'
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [loginTransition]
})
export class LoginComponent implements OnInit {
  @HostBinding('@loginTransition') state = 'activated';
  validateForm: FormGroup;
  validating: boolean = false;
  validationStatus: string;

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  constructor(private fb: FormBuilder, private http: HttpService, private router: Router, private message: NzMessageService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, []],
      remember: [true]
    });
  }

  async onLogin(event) {
    try {
      let res = await this.http.login(this.validateForm.get('userName').value, this.validateForm.get('password').value)
      localStorage.setItem("token", res.token);
      this.router.navigate([''], {});
    } catch(exception) {
      if(exception.status == 404) {
        this.message.info('Configuration is requred. You\'ll be redirected now.')
        this.router.navigate(['config'], {});
      } else if(exception.status == 403) {
        this.validateForm.controls['userName'].setErrors({'incorrect': true});
        this.validateForm.controls['password'].setErrors({'incorrect': true});
      } else {
        alert(JSON.stringify(exception));
      }
    }
  }
}
