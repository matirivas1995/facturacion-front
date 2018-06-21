import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { EstadoCuenta } from '../model/estadoCuenta';

@Injectable()
export class EstadoCuentaService {

    private serviceUrl = 'facturacion/estados';  // URL to web api
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) { }

    getEstadoCuentas(): Promise<EstadoCuenta[]> {
        return this.http.get(this.serviceUrl)
        .toPromise()
        .then(response => response.json() as EstadoCuenta[])
        .catch(this.handleError);
    }

    create(estadoCuenta: EstadoCuenta): Promise<Response> {
        return this.http
        .post(this.serviceUrl, JSON.stringify(estadoCuenta), {headers: this.headers})
        .toPromise()
        .catch(this.handleError);
    }

    update(estadoCuenta: EstadoCuenta): Promise<Response> {
        return this.http
        .put(this.serviceUrl, JSON.stringify(estadoCuenta), {headers: this.headers})
        .toPromise()
        .catch(this.handleError);
    }

    delete(estadoCuenta: EstadoCuenta): Promise<Response> {
        return this.http.delete(this.serviceUrl + '/' + estadoCuenta.id)
        .toPromise()
        .catch(this.handleError);
    }

    getFilterById(estadoCuenta: EstadoCuenta): Promise<EstadoCuenta[]> {
        return this.http.get(this.serviceUrl + '/' + estadoCuenta.id)
        .toPromise()
        .then(response => response.json() as EstadoCuenta[])
        .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('Error', error);
        return Promise.reject(error.message || error);
    }
}
