import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../services/loader/loader.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent {
  //sprinner - https://danielk.tech/home/angular-how-to-add-a-loading-spinner 
  constructor(public loader: LoaderService) { }

}
