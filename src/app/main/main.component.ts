import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as CheckUserAuth from "src/utils/CheckUserAuth";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {

    CheckUserAuth.check("home");

  }

}
