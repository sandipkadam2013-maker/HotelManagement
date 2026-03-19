import { Routes } from '@angular/router';
import { Header } from './core/layout/header/header';
import { Footer } from './core/layout/footer/footer';
import { AddRoom } from './rooms/add-room/add-room';
import { EditRoom } from './rooms/edit-room/edit-room';
import { BookingList } from './rooms/booking-list/booking-list';
import { RoomDetails } from './rooms/room-details/room-details';
import { Login } from './core/layout/login/login';
import { NotFound } from './core/layout/not-found/not-found';
import { Gallery } from './rooms/gallery/gallery';
import { Billing } from './core/layout/billing/billing';
import { Profile } from './Client/profile/profile';
import { Clentdetails } from './Client/clentdetails/clentdetails';
import { Hotel } from './core/layout/hotel/hotel';
import { authGuard } from './guard/auth-guard';
import { Contact } from './core/layout/contact/contact';
import { Admin } from './admin/admin';
import { RoleGuard } from './core/model/role.model';

export const routes: Routes = [
       
        {  path:'',component:Hotel} ,
        {  path:'login', component:Login },
        {  path:'header', component:Header },
        {  path:'footer', component:Footer },
        {  path:'addrooms', component:AddRoom },
        { path: 'bookings/edit/:id', component: EditRoom },
        {  path:'bookingList', component:BookingList },
        {  path:'roomDetails', component:RoomDetails },
        {  path:'gallery', component:Gallery },
        {  path:'Profile', component:Profile },
        {  path:'Clentdetails', component: Clentdetails},
        {  path:'billing', component:Billing },
        { path:'Contact', component:Contact },
        {  path:'**', component:NotFound },
//         {
//   path: 'admin-dashboard',
//   component: AdminDashboardComponent,
//   canActivate: [authGuard],
//   data: { roles: ['admin'] }
// },
{
  path: 'admin',
  component: Admin,
  canActivate: [RoleGuard],
  data: { roles: ['admin'] }
},

{
  path: 'Clentdetails',
  component: Clentdetails,
  canActivate: [RoleGuard],
  data: { roles: ['admin'] }
},
  
  {
  path: 'addrooms',
  component: AddRoom,
  canActivate: [RoleGuard],
  data: { role: 'admin' }
},
{
  path: 'bookingList',
  component: BookingList,
  canActivate: [RoleGuard],
  data: { role: 'admin' }
},
{
  path: 'roomDetails',
  component: RoomDetails,
  canActivate: [RoleGuard],
  data: { role: 'user' }
}

];
