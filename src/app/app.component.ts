import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit  {
  name = 'Angular';

  public users;

  public displayedColumns;

  constructor() {}
  
  ngOnInit() {
    // emulate server data
    setTimeout(() => {
      this.users = [
        {
          "obid": "1",
          "name": "Mis",
          "col3": "asd"
        },
        {
          "obid": "2",
          "name": "Kes",
          "col3": "asd"
        },
        {
          "obid": "3",
          "name": "Kus",
          "col3": "asd"
        },
        {
          "obid": "4",
          "name": "Kas",
          "col3": "asd"
        },
        {
          "obid": "5",
          "name": "Mida",
          "col3": "asd"
        },
        {
          "obid": "6",
          "name": "Millal",
          "col3": "asd"
        },
        {
          "obid": "7",
          "name": "Kuidas",
          "col3": "asd"
        },
        {
          "obid": "8",
          "name": "Miks",
          "col3": "asd"
        },
        {
          "obid": "9",
          "name": "Keda",
          "col3": "asd"
        },
        {
          "obid": "10",
          "name": "Milleks",
          "col3": "asd"
        }
      ]
      this.displayedColumns = [
        'obid',
        'name',
        'col3'
      ];
    }, 500);
  }
}
