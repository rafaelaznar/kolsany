import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  strUsuarioSession: String;

  constructor(private router: Router) {    
    this.strUsuarioSession = localStorage.getItem("user");
  }

  ngOnInit(): void {
  }

}
