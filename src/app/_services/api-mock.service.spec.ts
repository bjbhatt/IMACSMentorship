/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ApiMockService } from './api-mock.service';

describe('Service: ApiMock', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiMockService]
    });
  });

  it('should ...', inject([ApiMockService], (service: ApiMockService) => {
    expect(service).toBeTruthy();
  }));
});
