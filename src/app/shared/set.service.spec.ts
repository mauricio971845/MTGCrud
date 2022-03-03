import {SetService} from './set.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import { TestBed } from '@angular/core/testing';
import { ISet } from "./MTG.model"


describe('SetService', () => {
  let setService:SetService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers:[SetService],
    });

    setService   = TestBed.get(SetService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() =>{
    httpMock.verify;
  })

  it('Should test getSets Method', () => {
    const testSets: ISet[] = [ {id: 1, setName: 'Set1', code:'S1', setType:'A',releasedDate:'11/20/21'},
                               {id: 2, setName: 'Set2', code:'S2', setType:'B',releasedDate:'11/20/21'}];

    setService.getSets().subscribe(Sets => {
      expect(Sets.length).toBe(2);
      expect(Sets).toEqual(testSets);
    })

    const req = httpMock.expectOne(setService.BASE_URL+"Sets");

    req.flush(testSets);

  })


  it('Should test getSet Method', () => {
    const testSets: ISet =  {id: 1, setName: 'Set1', code:'S1', setType:'A',releasedDate:'11/20/21'};

    setService.getSet('1').subscribe(Result => {
      expect(Result).toEqual(testSets);
      expect(Result.setName).toBe('Set1')
    })
    const req = httpMock.expectOne(setService.BASE_URL+"Sets/1");

    expect(req.request.method).toBe('GET');

    req.flush(testSets);

  })


it('Should test addSet Method', () => {
  const dummySet: ISet =  {id: 3, setName: 'Set3', code:'S3', setType:'C',releasedDate:'11/20/21'}
  setService.addSet(dummySet).subscribe(addedSet => {
    expect(addedSet).toBe(dummySet);
  })
  const req = httpMock.expectOne(setService.BASE_URL+"Sets");

  expect(req.request.method).toBe('POST');

  req.flush(dummySet);
})

it('Should test deleteSet Method', () => {
  const dummySet: ISet =  {id: 3, setName: 'Set3', code:'S3', setType:'C',releasedDate:'11/20/21'}

  setService.deleteSet(3).subscribe(deletedSet => {
    expect(deletedSet).toBe(dummySet);
  })
  const req = httpMock.expectOne(setService.BASE_URL+"Sets/3");

  expect(req.request.method).toBe('DELETE');

  req.flush(dummySet);
})

})
