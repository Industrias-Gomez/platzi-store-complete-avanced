import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

import { ProductsService } from './products.service';

import { environment } from './../../../../environments/environment';

fdescribe('ProductsService', () => {

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: ProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  fdescribe('tests for getAllProducts', () => {
    it('sholud return products', () => {
      // arrange - preparar
      const expectData = [
        {
          id: '1234',
          title: 'test',
          price: 125,
          description: 'text',
          image: 'img/img.jpg',
        },
        {
          id: '1236',
          title: 'test',
          price: 125,
          description: 'text',
          image: 'img/img.jpg',
        },
      ];

      let dataError: any;
      let dataResponse;

      // act - actuacion
      service.getAllProducts().subscribe(
        (response) => {
          dataResponse = response;
        },
        (err) => {
          dataError = err;
        }
      );

      const req = httpTestingController.expectOne(
        `${environment.url_api}/products`
      );
      req.flush(expectData);

      // assert
      it('Espera que dataResponse sea de longitud 2', () => {
        expect(dataResponse.length).toEqual(2);
      });

      it('Espera que el método de la petición sea GET', () => {
        expect(req.request.method).toEqual('GET');
      });

      it('Espera que dataError sea indefinido', () => {
        expect(dataError).toBeUndefined();
      });
    });
  });
});
