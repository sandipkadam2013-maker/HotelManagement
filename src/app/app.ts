import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./core/layout/header/header";
import { Footer } from "./core/layout/footer/footer";
import { LoaderComponent } from './loader-component/loader-component';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, LoaderComponent ],
  templateUrl: './app.html',
  styleUrl: './app.css',
  template:'<app-loader-component></app-loader-component>'
})
export class App {
  protected readonly title = signal('hotel-management-app');



}
