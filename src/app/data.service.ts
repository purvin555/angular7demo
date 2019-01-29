import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export abstract class DataService {
    constructor(protected http: Http) {
    }
    public abstract getProductNames():Promise<any>; //{throw this.Err();};
    public abstract getProductCoverages(productName:string):Promise<any>;//{throw this.Err();};
    public abstract getCoverageAttributes(prouductName:string, coverageName: string):Promise<any>;//{throw this.Err();};
    protected ThrowNotImplemented(){
        return new Error("Method not implemented.");
    }
}

// export abstract class AbstractService{
    
//     constructor(){}
//     abstract xyz();
// }

// export class ConcreteService extends AbstractService{
//     private test: number;
//     constructor(){        
//         super();
//         this.test = Math.random();
//     }
//     xyz() {
//         //alert(this.test);
//     }

// }