import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-coverage',
  templateUrl: './coverage.component.html',
  styleUrls: []
})
export class CoverageComponent implements OnInit {

  _cv:any;  
  @Input('coverage')   
  get coverage():any{ 
    return this._cv;
  }
  set coverage(val:any){
    this._cv = val;
    this.refresh();
  }
  
  _product:string;    
  @Input('product') 
  get product():string{ 
    return this._product
  }

  set product(val:string){
    this._product = val;
    this.refresh();
  }
  @Input() attributes;

  constructor(private service:DataService) {
   }

  ngOnInit() {
  }

  refresh(){    
    
    this.attributes = undefined;
    if (!this.product)
        return;
    if(!this.coverage)
        return;

    var items = this.service
      .getCoverageAttributes(this.product,this.coverage.Name)
      .then(items=> {
          if(!items && items.length)
            return
          items.forEach(a=> {
            if (a.productAttributes && a.productAttributes.records){
                let recs = a.productAttributes.records;
                a.Networks = [];
                a.Networks.push(this.getNetworkType(recs,'In-Network'));
                a.Networks.push(this.getNetworkType(recs,'Out-Of-Network'));
            }
          })
          this.attributes = items;
      })    
  }

  getNetworkType(records:any[],type:string){
    if (!records || !type)
      return;
    let items = records.filter(x=> x.attributeGroupType && x.attributeGroupType == type);
    console.log(items);
    var retObj = {
      Label :type,
      IsCovered:false,  
      Items: []
    };
    if(items && items.length){
      let idx = items.findIndex(a=> a.label == 'Covered' && a.inputType=='checkbox');

      if(idx != -1){
        retObj.IsCovered = !items[idx].disabled;
        items.splice(idx,1);
      }
        retObj.Items = items;
    }
    console.log(retObj);
    return retObj;
  }

}
