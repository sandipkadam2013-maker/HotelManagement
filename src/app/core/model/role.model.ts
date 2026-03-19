import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";
import { Authservice } from "../../services/authservice";

// role.guard.ts
@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {

  constructor(private auth:Authservice, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {

    const expectedRole = route.data['role'];
    const userRole = this.auth.getRole();

    if (this.auth.isLoggedIn() && userRole === expectedRole) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}