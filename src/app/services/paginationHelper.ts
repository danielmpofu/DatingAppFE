import {HttpClient, HttpParams} from "@angular/common/http";
import {PaginatedResult} from "../models/pagination";
import {map, Observable} from "rxjs";
import {UserParams} from "../models/userParams";

export function getPaginatedResults<T>(url: string, params: HttpParams, httpClient: HttpClient):Observable<PaginatedResult<T>> {
  let paginatedResult: PaginatedResult<T> = new PaginatedResult<T>;
  //if (this.members.length != 0) return of(this.members);
  return httpClient.get<T>(url, {observe: 'response', params: params})
    .pipe(map(response => {
      if (response.body) {
        paginatedResult.result = response.body;
      }
      const pagination = response.headers.get('Pagination');
      if (pagination) {
        paginatedResult.pagination = JSON.parse(pagination);
      }
      return paginatedResult;
    }));
}

export function createPaginationParams(userParams: UserParams): HttpParams {
  let params = new HttpParams();
  params = params.append("pageSize", userParams.pageSize);
  params = params.append("pageNumber", userParams.pageNumber);
  params = params.append("gender", userParams.gender);
  params = params.append("maxAge", userParams.maxAge);
  params = params.append("minAge", userParams.minAge);
  params = params.append("predicate", userParams.predicate);
  return params;
}

export function getPaginationParams(pageSize:number, pageNumber:number): HttpParams{
  let params = new HttpParams();
  params = params.append("pageSize", pageSize);
  params = params.append("pageNumber", pageNumber);
  return params;
}
