import { Component,
  Inject,
  trigger,
  state,
  style,
  transition,
  animate,
  OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MdlDialogService, MdlDialogReference } from 'angular2-mdl';
import { Subscription } from 'rxjs/Subscription';
import { Auth, Image } from '../domain/entities';
import { RegisterDialogComponent } from './register-dialog/register-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('loginState', [
      state('inactive', style({
        transform: 'scale(1)'
      })),
      state('active',   style({
        transform: 'scale(1.1)'
      })),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out'))
    ])
  ]
})
export class LoginComponent implements OnDestroy {

  username = '';
  password = '';
  auth: Auth;
  photo = '/assets/login_default_bg.jpg';
  slides: Image[] = [];
  subscription: Subscription;
  loginBtnState: string = 'inactive';

  constructor(
    @Inject('auth') private authService,
    @Inject('bing') private bingService,
    private dialogService: MdlDialogService,
    private router: Router) {
    this.bingService.getImageUrl()
      .subscribe((images: Image[]) => {
        this.slides = [...images];
        this.rotateImages(this.slides);
      });
  }

  onSubmit(){
    this.authService
      .loginWithCredentials(this.username, this.password)
      .subscribe(auth => {
        this.auth = Object.assign({}, auth);
        if(!auth.hasError){
          this.router.navigate(['todo']);
        }
      });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  rotateImages(arr: Image[]){
    const length = arr.length
    let i = 0;
    setInterval(() => {
      i = (i + 1) % length;
      this.photo = this.slides[i].contentUrl;
    }, 4000);
  }

  toggleLoginState(state: boolean){
    this.loginBtnState = state ? 'active' : 'inactive';
  }

  register($event: MouseEvent){
    let pDialog = this.dialogService.showCustomDialog({
      component: RegisterDialogComponent,
      isModal: true,
      styles: {'width': '350px'},
      clickOutsideToClose: true,
      enterTransitionDuration: 400,
      leaveTransitionDuration: 400
    });
    pDialog.map( (dialogReference: MdlDialogReference) => {
      console.log('dialog visible', dialogReference);
    });

  }

}
