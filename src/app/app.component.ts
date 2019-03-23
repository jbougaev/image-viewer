import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'image-viewer';
  images = [];
  closeResult: string;
  constructor(private http: HttpClient, private changeDetectorRef: ChangeDetectorRef, private modalService: NgbModal) { }


  //constructor(private route: ActivatedRoute,
  //  private changeDetectorRef: ChangeDetectorRef,
  //  private shoppingCartFacade: ShoppingCartFacade,
  //  private authFacade: AuthFacade,
  //  private fb: FormBuilder,
  //  private router: Router,
  //  private translate: TranslateService,
  //  private servicesFacade: ServicesFacade,
  //  private modalService: NgbModal,
  //  private utilitiesService: UtilitiesService) { }

  private eventsSubject: Subject<any> = new Subject<any>();

  @ViewChild("content")
  contentForImageViewer: any;

  onNext(index) {
    console.log(this.images[index-1]);
    let imageNm = this.images[index - 1];
    if (imageNm.indexOf(".nov") === imageNm.length - 4) {
      const httpOptions = {
        headers: new HttpHeaders({
          'fileName': imageNm.substring(0, imageNm.indexOf(".nov")),
          'userId': "197"
        }),
        responseType: 'any'  as 'json'   //https://github.com/angular/angular/issues/18586
      };

      this.http.get<any>(`https://xxx/downloadFile`, httpOptions).subscribe((data) => {
        this.images = this.images.map(i => {
          if (i === imageNm) {
            i = data.substring(1, data.length-2);
          }

          return i;
        });
        this.changeDetectorRef.detectChanges();
        this.eventsSubject.next({ images: this.images });
      });
    } else {
      this.eventsSubject.next({ images: this.images });
    }   
  }

  onModal() {
    console.log("ss");
      this.modalService.open(this.contentForImageViewer, { ariaLabelledBy: 'modal-basic-title', size: "lg", centered: true }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
