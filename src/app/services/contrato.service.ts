import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Contrato } from '../model/contrato';

@Injectable()
export class ContratoService {

    private serviceUrl = 'facturacion/contratos';  // URL to web api
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) { }

    getContratos(): Promise<Contrato[]> {
        return this.http.get(this.serviceUrl)
        .toPromise()
        .then(response => response.json() as Contrato[])
        .catch(this.handleError);
    }

    create(contrato: Contrato): Promise<Response> {
        return this.http
        .post(this.serviceUrl, JSON.stringify(contrato), {headers: this.headers})
        .toPromise()
        .catch(this.handleError);
    }

    update(contrato: Contrato): Promise<Response> {
        return this.http
        .put(this.serviceUrl, JSON.stringify(contrato), {headers: this.headers})
        .toPromise()
        .catch(this.handleError);
    }

    delete(contrato: Contrato): Promise<Response> {
        return this.http.delete(this.serviceUrl + '/' + contrato.id)
        .toPromise()
        .catch(this.handleError);
    }

    getFilterById(contrato: Contrato): Promise<Contrato[]> {
        return this.http.get(this.serviceUrl + '/' + contrato.id)
        .toPromise()
        .then(response => response.json() as Contrato[])
        .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('Error', error);
        return Promise.reject(error.message || error);
    }
}
