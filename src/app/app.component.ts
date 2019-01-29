import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { DataService } from './data.service';
import { OnInit } from '@angular/core';
import { ProductlistComponent } from './productlist/productlist.component';
import { DataMockService } from './datamock.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent implements OnInit {

  @Input() product: string;
  @Input() coverage: any;
  @ViewChild('prodlist1') prodlist1: ProductlistComponent;
  @Input() mobileState =  { showProducts: true, showCoverages: false, showAttributes: false }  
  @Input() isMobileView:boolean;

  constructor(private service: DataService) {
    this.isMobileView =  window && window.innerWidth ?  window.innerWidth <= 767: false;
  }

  ngOnInit(): void {
    this.refreshProducts();
  }

  refreshProducts() {
    setTimeout(() => {
        this.prodlist1.refresh();
    }, 0);
  }

  onResize(event) {    
    const innerWidth = event.target.innerWidth;
    var previousState = this.isMobileView;
    this.isMobileView = innerWidth <= 767;
    if (previousState != this.isMobileView)
        this.refreshProducts();
  }

  setMobileView(){
    this.mobileState = { showProducts: true, showCoverages: false, showAttributes: false }
  }

  productChange(newProd: any) {    
    this.product = newProd;    
    if(newProd)
     this.goToCoveragesView();
  }

  coverageChange(newCoverage: any) {
    this.coverage = newCoverage;    
    if (newCoverage)
      this.goToAttibutesView();
  }

  goToProductsView() {
    if (this.mobileState) {
      this.mobileState.showCoverages = false;
      this.mobileState.showAttributes = false;
      this.mobileState.showProducts = true;
      this.refreshProducts();
    }
  }

  goToCoveragesView() {
    if (this.mobileState) {
      this.mobileState.showCoverages = true;
      this.mobileState.showAttributes = false;
      this.mobileState.showProducts = false;
    }
  }

  goToAttibutesView() {
    if (this.mobileState) {
      this.mobileState.showAttributes = true;
      this.mobileState.showCoverages = false;
      this.mobileState.showProducts = false;      
    }
  }
}
