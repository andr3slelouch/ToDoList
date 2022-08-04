import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Todo} from "./todo";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private apiURL = "http://localhost:8081";

  /*------------------------------------------
  --------------------------------------------
  Http Header Options
  --------------------------------------------
  --------------------------------------------*/
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/

  constructor(private httpClient: HttpClient) {
  }

  /**
   * Write code on Method
   *
   * @return response()
   */
  getAll(): Observable<any> {
    console.log("Getting elements...");
    return this.httpClient.get(this.apiURL + '/to-do-list/')
      .pipe(
        catchError(this.errorHandler)
      )
  }

  /**
   * Write code on Method
   *
   * @return response()
   */
  create(todo: Todo): Observable<any> {
    return this.httpClient.post(this.apiURL + '/to-do-list/', JSON.stringify(todo), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  /**
   * Write code on Method
   *
   * @return response()
   */
  find(title: string): Observable<any> {
    console.log("Getting title")
    return this.httpClient.get(this.apiURL + '/to-do-list/task?title=' + title)
      .pipe(
        catchError(this.errorHandler)
      )
  }


  /**
   * Write code on Method
   *
   * @return response()
   */
  update(todo: Todo): Observable<any> {
    return this.httpClient.put(this.apiURL + '/to-do-list/', JSON.stringify(todo), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  /**
   * Write code on Method
   *
   * @return response()
   */

  delete(title: string) {
    return this.httpClient.delete(this.apiURL + '/to-do-list?title=' + title, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  /**
   * Write code on Method
   *
   * @return response()
   */

  errorHandler(error: any) {
    let errorMessage: string;
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);

  }
}
