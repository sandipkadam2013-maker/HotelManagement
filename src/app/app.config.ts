import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { loaderinterceptorInterceptor } from './interceptor/loaderinterceptor-interceptor';



import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
   
  
         provideHttpClient(
      withInterceptors([ loaderinterceptorInterceptor]) 
    )

  ]
};
