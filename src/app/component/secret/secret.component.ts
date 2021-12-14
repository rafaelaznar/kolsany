import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from 'src/app/service/session.service';

@Component({
  selector: 'app-secret',
  templateUrl: './secret.component.html',
  styleUrls: ['./secret.component.css']
})
export class SecretComponent implements OnInit {

  strConfidencial: string;

  constructor(private _location: Location,
    private oRoute: ActivatedRoute,
    private oRouter: Router,
    private oSessionService: SessionService) {
    if (oRoute.snapshot.data.message) {
      localStorage.setItem("user", oRoute.snapshot.data.message);
    } else {
      localStorage.clear();
      oRouter.navigate(['/home']);
    }
  }

  ngOnInit(): void {
    this.oSessionService.secret().subscribe(data => {
      this.strConfidencial = data;
    })
  }
  goBack() {
    this._location.back();
  }
}
