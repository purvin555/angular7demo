import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { DataService } from './data.service';

@Injectable()
export class DataMockService  extends DataService {

    private products: any[];

    constructor(protected http: Http) {
        super(http);
    }
    public getProductNames(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            if(this.products){
                return resolve(this.products.map(a=> a.Name));
            }
            else {
                this.http
                .get("./assets/product.json")
                .toPromise()
                .then(resp => {
                    if (!resp)
                        reject("Items not found - 1")
                    let item = resp.json();
                    console.log(item);
                    if (item && item.records) {
                        this.products = item.records;
                        resolve(this.products.map(a=> a.Name));
                    }
                    else {
                        reject("Items not found - 2")
                    }
                });
            }
        });
    }

    public getProductCoverages(productName: string): Promise<any> {
        return new Promise<any>((resolve, reject) =>{
            resolve(this.prodCoverages(productName));
        });
    }
    public getCoverageAttributes(productName:string, coverageName: string): Promise<any> {
        return new Promise<any>((resolve, reject) =>{
            resolve(this.covAttribs(this.prodCoverages(productName,true),coverageName));
        });
    }

    private prodCoverages(productName: string, entireCoverageObject:boolean=false){
        if (!this.products)
            throw new Error('products not loaded');
        let idx = this.products.findIndex(a=> a.Name == productName);
        let product; 
        
        if (idx != -1){
            product = this.products[idx];
        }

        if (!product || !product.coverages || !product.coverages.records){
            return [];
        }
        
        let coverages = [];
        product.coverages
                .records
                .forEach(a=> coverages.push({ 
                    Name: a.Name, 
                    Categories: "In-Network | Out-of-Network",
                    Entity:a
                }));
        return coverages;
    }

    private covAttribs(covs:any[],covName:string){
        if(!covs || covs.length == 0)
            return [];
        let idx = covs.findIndex(a=> a.Name == covName);
        let coverage;                 
        if (idx != -1){
            coverage = covs[idx];
        }
        if (!coverage 
            || !coverage.Entity
            || !coverage.Entity.attributeCategories 
            || !coverage.Entity.attributeCategories.records){
            return [];
        }        
        //let attribs = [];
        return coverage
                .Entity
                .attributeCategories
                .records;
                //.forEach(a=> attribs.push(a));

        //return attribs;
    }

}
// read json https://stackoverflow.com/questions/44042223/load-json-from-local-file-with-http-get-in-angular-2