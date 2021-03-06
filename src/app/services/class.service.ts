import { Injectable } from '@angular/core';
import{HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import{Iclass} from '../Shared Classes and types/Iclass';
import{catchError} from 'rxjs/operators'
import{classController} from'../APIs/classController';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class categoryService {
url=classController.GetAllClasses;//api/user
  constructor(private http:HttpClient) { 
  
  }

  GetAllclass():Observable<Iclass[]>
  {
    return this.http.get<Iclass[]>(this.url).pipe(catchError(err=>{
      return throwError(err.message||"customError happened")
    }));
  }

  getClassById(id:string):Observable<Iclass>
  {
    return this.http.get<Iclass>(this.url+"/"+id).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Internal Server error contact site adminstarator");
    }));
  }

  AddClass(clas: Iclass): Observable<any> {
    return this.http.post(this.url,clas,httpOptions).pipe(catchError(err => {
        return throwError(err.message || "Internal Server error contact site adminstarator")
    }));
}
updateClass(id, clas): Observable<any> {
  return this.http.put(`${this.url}/${id}`, clas,httpOptions);
}
  
  deleteCLass(id:string): Observable<any>{
    return this.http.delete(this.url+"/"+id, httpOptions).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Internal Server error contact site adminstarator");
    }));
  }


}
