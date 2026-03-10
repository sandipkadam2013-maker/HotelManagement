import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoaderService } from '../services/loader-service';
import {timeout,finalize}from "rxjs"

export const loaderinterceptorInterceptor: HttpInterceptorFn = (req, next) => {

  const loaderService = inject(LoaderService);

  loaderService.show();

  return next(req).pipe(
     timeout(6000),
    finalize(() => loaderService.hide())
  );
};