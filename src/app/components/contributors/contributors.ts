import {Component} from 'angular2/core';
import {FirebaseEventPipe} from '../../pipes/firebasepipe';

@Component({
  selector: 'contributors',
  templateUrl: 'app/components/contributors/contributors.html',
  styleUrls: ['app/components/contributors/contributors.css'],
  providers: [],
  directives: [],
  pipes: [FirebaseEventPipe]
})
export class Contributors {

  contributorsRef: Firebase;
  firebaseUrl: string;
  contributors: any;

  constructor() {

    this.firebaseUrl = 'https://ng-contributors.firebaseio.com/contributors';
    this.contributorsRef = new Firebase(this.firebaseUrl);
    this.contributors = [];
    this.contributorsCount = 0;

    this.getContributorsCount();
    this.getContributors();

  }

  getContributorsCount () {
    this.contributorsRef.once('value', (snapshot) => {
      this.contributorsCount = snapshot.numChildren();
      // snapshot.forEach((contributor) => {
      //   this.contributors.push(contributor.val());
      // });
    });
  }

  getContributors () {
    this.contributorsRef
      .on('child_added', (snapshot) => {
        console.log('child_added');
        let contributor = snapshot.val();
        this.contributors.push(contributor);
        if (this.contributors.length > this.contributorsCount) {
          this.greetNewContributor(contributor.displayName);
        }
        this.contributorsCount++;
      });
  }

  greetNewContributor (contributorName) {
    if ('speechSynthesis' in window) {
      let greeting = new SpeechSynthesisUtterance(`${contributorName} is attending!`);
      window.speechSynthesis.speak(greeting);
    }
  }

}
