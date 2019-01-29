import { Component, OnInit, Input, ChangeDetectionStrategy, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { DataService } from '../data.service';

@Component({
  selector: 'app-coveragelist',
  templateUrl: './coveragelist.component.html',
  styleUrls: [],
})
export class CoveragelistComponent implements OnInit {
  _product:string;    
  get product():string{ 
    return this._product
  }

  @Input('product') 
  set product(val:string){
    this._product = val;
    this.productChange(this._product);
  }

  @Input() coverages = [];
  @Input() filtered = [];
  @Input() selectedCoverage:any;
  @Output() coverageChange: Subject<any> = new Subject<any>();
  @Input() searchStr:string;

  constructor(private service:DataService) { 
  }

  ngOnInit() {
  }

  productChange(productName:string){
    this.clear();
    if (!productName)
      return;    
    var items = this.service
    .getProductCoverages(productName)
    .then(items=> {
        if(!items && items.length)
          return
        this.coverages = items;
        this.filtered = items;
    })
  }

  clear(){
    this.coverages = [];
    this.filtered = [];
    this.searchStr = undefined;
  }

  setCoverage(coverage:any){
    this.selectedCoverage = coverage;
    if (this.coverageChange)
      this.coverageChange.next(coverage);
  }

  search(){
    //alert(this.searchStr);
    this.setCoverage(undefined);
    if (!this.coverages || this.coverages.length <0){
      return;
    }
    if (!this.searchStr || this.searchStr.trim() == ''){
      this.filtered = this.coverages; 
    }
    else {
      let searchL = this.searchStr.toLowerCase();
      
      this.filtered = this.coverages.filter(x=> x.Name && x.Name.toLowerCase().startsWith(searchL));
    }

  }
}
