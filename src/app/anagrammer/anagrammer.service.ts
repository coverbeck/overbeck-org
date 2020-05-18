import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnagrammerService {

  constructor() { }

  public getAnagrams(input: string): Observable<Array<string>> {
    return of(['abc', 'def']);
  }
}
