import { Component, OnInit, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { DataService } from '../data.service';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: [],
})
export class ProductlistComponent implements OnInit {

  @Input() productNames = [];
  @Output() productChange: Subject<string> = new Subject<string>();
  @Input() selectedProduct:string;

  constructor(private service:DataService) {
   }

  ngOnInit() {
  }

  loadProductNames(){
    this.clear();
    var items = this.service.getProductNames()
    .then(items=> {
        if(!items && items.length)
          return
        this.productNames = items;
    })
  }
  clear(){
    this.selectedProduct = undefined;
    this.productNames = [];
  }
  refresh(){
    this.loadProductNames();
  }
  
  clickProduct(prodName:string){
    this.selectedProduct = prodName;
    if(this.productChange) 
      this.productChange.next(prodName);
  }
}
