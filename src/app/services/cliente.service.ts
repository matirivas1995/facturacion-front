import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Cliente } from '../model/cliente';

@Injectable()
export class ClienteService {

    private serviceUrl = 'facturacion/clientes';  // URL to web api
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) { }

    getClientes(): Promise<Cliente[]> {
        return this.http.get(this.serviceUrl)
        .toPromise()
        .then(response => response.json() as Cliente[])
        .catch(this.handleError);
    }

    create(cliente: Cliente): Promise<Response> {
        return this.http
        .post(this.serviceUrl, JSON.stringify(cliente), {headers: this.headers})
        .toPromise()
        .catch(this.handleError);
    }

    update(cliente: Cliente): Promise<Response> {
        return this.http
        .put(this.serviceUrl, JSON.stringify(cliente), {headers: this.headers})
        .toPromise()
        .catch(this.handleError);
    }

    delete(cliente: Cliente): Promise<Response> {
        return this.http.delete(this.serviceUrl + '/' + cliente.id)
        .toPromise()
        .catch(this.handleError);
    }

    getFilterById(cliente: Cliente): Promise<Cliente[]> {
        return this.http.get(this.serviceUrl + '/' + cliente.id)
        .toPromise()
        .then(response => response.json() as Cliente[])
        .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('Error', error);
        return Promise.reject(error.message || error);
    }
}
