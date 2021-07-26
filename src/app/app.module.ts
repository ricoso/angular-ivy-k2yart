import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';

import { DynTableComponent } from './components/dyn-table/dyn-table.component';
import { DynColumnComponent } from './components/dyn-table/dyn-column.component';

@NgModule({
  imports:      [ BrowserModule, MaterialModule, BrowserAnimationsModule ],
  declarations: [ AppComponent, HelloComponent, DynTableComponent, DynColumnComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
