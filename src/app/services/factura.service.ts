import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Factura } from '../model/factura';

@Injectable()
export class FacturaService {

    private serviceUrl = 'facturacion/facturas';  // URL to web api
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) { }

    getFacturas(): Promise<Factura[]> {
        return this.http.get(this.serviceUrl)
        .toPromise()
        .then(response => response.json() as Factura[])
        .catch(this.handleError);
    }

    create(factura: Factura): Promise<Response> {
        return this.http
        .post(this.serviceUrl, JSON.stringify(factura), {headers: this.headers})
        .toPromise()
        .catch(this.handleError);
    }

    update(factura: Factura): Promise<Response> {
        return this.http
        .put(this.serviceUrl, JSON.stringify(factura), {headers: this.headers})
        .toPromise()
        .catch(this.handleError);
    }

    delete(factura: Factura): Promise<Response> {
        return this.http.delete(this.serviceUrl + '/' + factura.id)
        .toPromise()
        .catch(this.handleError);
    }

    getFilterById(factura: Factura): Promise<Factura[]> {
        return this.http.get(this.serviceUrl + '/' + factura.id)
        .toPromise()
        .then(response => response.json() as Factura[])
        .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('Error', error);
        return Promise.reject(error.message || error);
    }
}
