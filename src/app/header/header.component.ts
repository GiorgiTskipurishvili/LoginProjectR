import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  username: string = '';

  constructor(private cookieService: CookieService,private router: Router,private authService: AuthService) {}

  ngOnInit() {
    // this.username = localStorage.getItem('username') || 'Guest';

    this.username = this.cookieService.get('username') || 'Guest';
    
    
  }

  logOut() {

    // this.cookieService.delete('token');  
    // this.cookieService.delete('username'); 
    this.authService.LogOut();
    // this.username = 'Guest';
    // this.router.navigate(['/login']);
    
  }
}
