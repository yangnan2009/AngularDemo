import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-login',
  template: `
    <div layout="row" layout-align="center center">
      <form #formRef="ngForm" (ngSubmit)="onSubmit(formRef.value)">
        <fieldset ngModelGroup="login">
          <label>用户名：</label>
          <input type="text"
            name="username"
            [(ngModel)]="username"
            #usernameRef="ngModel"
            required
            minlength="3"
            placeholder="请输入用户名"
            />
            <div *ngIf="usernameRef.errors?.minlength">用户名不能少于3个字符</div>
          <label>用户口令：</label>
          <input type="password"
            name="password"
            [(ngModel)]="password"
            #passwordRef="ngModel"
            required
            placeholder="请输入用户密码"
            />
          <button type="submit">Login</button>
        </fieldset>
      </form>
    </div>
  `,
  styles: [`
    input.ng-invalid{
      border: 3px solid red;
    }
    input.ng-valid{
      border: 3px solid green;
    }
  `],
  providers: []
})
export class LoginComponent implements OnInit {
  username = "";
  password = "";

  constructor(@Inject('auth') private service) {

  }

  ngOnInit() {
  }

  onSubmit(formValue){
    console.log('auth result is: '
      + this.service.loginWithCredentials(formValue.login.username, formValue.login.password));
  }
}


