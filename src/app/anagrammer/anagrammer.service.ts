import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnagrammerService {

  constructor(private httpClient: HttpClient) { }

  public getAnagrams(inp: string): Observable<Array<string>> {
    const req = {input: inp};
    return this.httpClient.post<Array<string>>('/api/anagram', req);
  }
}
