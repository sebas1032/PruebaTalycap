import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { authorsI } from '../interfaces/authors.interface';
import { booksI } from '../interfaces/books.interface';

@Injectable({
  providedIn: 'root'
})
export class Servicio1Service {
  urlBooks = environment.urlBooks;
  urlAuthors = environment.urlAuthors;

  constructor(private http: HttpClient) { }

  ObtenerBooks(): Observable<booksI[]> {
    return this.http.get<booksI[]>(this.urlBooks)
  }

  ObtenerAuthors(): Observable<authorsI[]> {
    return this.http.get<authorsI[]>(this.urlAuthors)
  }


}
