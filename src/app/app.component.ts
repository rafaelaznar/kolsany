import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { SessionService } from './service/session.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent {
  title = 'kolsany';

  strUsuarioSession: String = null;

  constructor(public oSessionService: SessionService, private router: Router) {


    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        /* Your code goes here on every router change */
        if (environment) console.log("AppComponent: constructor: cambio de ruta...");
        this.oSessionService.check().subscribe((checkData: String) => {
          if (environment) console.log("AppComponent: constructor: check answer");
          if (checkData == null) {
            if (environment) console.log("AppComponent: constructor: No session");
            this.strUsuarioSession = null;
            localStorage.clear;
            if (ev.url != "/" && ev.url != "/home" && ev.url != "/login") {
              router.navigate(['/login']);
            }
          } else {
            if (environment) console.log("AppComponent: constructor: Active Session");
            this.strUsuarioSession = checkData;
            localStorage.setItem("user", checkData.toString());
          }
        }, err => {
          if (environment) console.log("AppComponent: constructor: No session");
          this.strUsuarioSession = null;
          localStorage.setItem("user", null);
          if (ev.url != "/" && ev.url != "/home" && ev.url != "/login") {
            router.navigate(['/login']);
          }
        })

        /*
        if (localStorage.getItem("user")) {
          this.strUsuarioSession = null;
          if (ev.url != "/producto" && ev.url != "/" && ev.url != "/home" && ev.url != "/about" && ev.url != "/login") {
            router.navigate(['/login']);
          }
        } else {
          this.strUsuarioSession = localStorage.getItem("user");          
        }
        */


      }

    });
  }


}
