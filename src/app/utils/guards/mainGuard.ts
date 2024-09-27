import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';

//services
import { SecurityService } from 'src/app/services/security.service';

@Injectable()
export class CanActivateLogged implements CanActivate {

    constructor(
        private securityService: SecurityService, 
        private router: Router
        ) { }

    canActivate() {
        // If the user is not logged in we'll send them back to the home page
        if (!this.securityService.isLogged()) {
            console.log('No estás logueado');
            this.router.navigate(['/']);
            return false;
        }
        return true;
    }
}

