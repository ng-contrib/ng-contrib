import {Component} from 'angular2/core';
import {Contributors} from '../contributors/contributors'

@Component({
  selector: 'home',
  templateUrl: 'app/components/home/home.html',
  styleUrls: ['app/components/home/home.css'],
  providers: [],
  directives: [Contributors],
  pipes: []
})
export class Home {

  firebaseUrl: string;
  authRef: Firebase;
  user: any;
  
  constructor() {
    this.firebaseUrl = 'https://ng-contributors.firebaseio.com/contributors';
    this.authRef = new Firebase(this.firebaseUrl);
    this.authRef.onAuth((user) => {
      console.log(user);
      this.user = user;
      this.registerContributor(user);
    });
  }

  login () {
    this.authRef.authWithOAuthPopup('github', (error, auth) => {
      console.log(error, auth);
    }, {
      scope: 'user:email'
    });
  }

  registerContributor (contributor) {
    if (contributor) {
      this.authRef
        .child(contributor.uid)
        .set(contributor.github);
    }
  }

}
