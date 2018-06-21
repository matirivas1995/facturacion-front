import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Pago } from '../model/pago';

@Injectable()
export class PagoService {

    private serviceUrl = 'facturacion/pagos';  // URL to web api
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) { }

    getPagos(): Promise<Pago[]> {
        return this.http.get(this.serviceUrl)
        .toPromise()
        .then(response => response.json() as Pago[])
        .catch(this.handleError);
    }

    create(pago: Pago): Promise<Response> {
        return this.http
        .post(this.serviceUrl, JSON.stringify(pago), {headers: this.headers})
        .toPromise()
        .catch(this.handleError);
    }

    update(pago: Pago): Promise<Response> {
        return this.http
        .put(this.serviceUrl, JSON.stringify(pago), {headers: this.headers})
        .toPromise()
        .catch(this.handleError);
    }

    delete(pago: Pago): Promise<Response> {
        return this.http.delete(this.serviceUrl + '/' + pago.id)
        .toPromise()
        .catch(this.handleError);
    }

    getFilterById(pago: Pago): Promise<Pago[]> {
        return this.http.get(this.serviceUrl + '/' + pago.id)
        .toPromise()
        .then(response => response.json() as Pago[])
        .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('Error', error);
        return Promise.reject(error.message || error);
    }
}
