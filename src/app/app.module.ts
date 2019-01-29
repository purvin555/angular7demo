import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule, MatDivider } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HttpModule } from '@angular/http';
import { DataService } from './data.service';
import { DataMockService } from './datamock.service';
import { MatSelectModule } from '@angular/material/select';
import { ProductlistComponent } from './productlist/productlist.component';
import { CoveragelistComponent } from './coveragelist/coveragelist.component';
import { CoverageComponent } from './coverage/coverage.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ProductlistComponent,
    CoveragelistComponent,
    CoverageComponent
  ],
  imports: [
    HttpModule,
    FormsModule,
    BrowserModule,    
    //AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatGridListModule,
    MatDividerModule,
    MatInputModule,
    MatSelectModule,
    MatSelectModule,
    MatSlideToggleModule,
  ],
  providers: [DataMockService,
    { provide: DataService, useExisting: DataMockService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
