import { CommonModule, JsonPipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbTypeahead, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable, OperatorFunction, Subject, merge, } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, } from 'rxjs/operators';


const clubNames = [
	'Arsenal FC',
	'Chelsea FC',
	'Liverpool FC',
	'Manchester City FC',
	'Manchester United FC',
	'Newcastle United FC',
	'Tottenham Hotspur FC',
];


@Component({
  selector: 'top-nav',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NgbTypeaheadModule,
    FormsModule,
    JsonPipe
  ],
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})


export class TopNavComponent {
  @ViewChild('instance', { static: true }) instance!: NgbTypeahead;
  model!: string;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
    const inputFocus$ = this.focus$;
    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map((term) =>
        (term === '' ? clubNames : clubNames.filter((clubName) => clubName.toLowerCase().indexOf(term.toLowerCase()) > -1)),
      ),
    );
  };

}




