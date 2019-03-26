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
  images = ['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Q29udGVudHMgMiAwIFI+PgplbmRvYmoKCjQgMCBvYmoKPDwvVHlwZS9QYWdlcwovUmVzb3VyY2VzIDExIDAgUgovTWVkaWFCb3hbIDAgMCA2MTEgNzkxIF0KL0tpZHNbIDEgMCBSIF0KL0NvdW50IDE+PgplbmRvYmoKCjEyIDAgb2JqCjw8L1R5cGUvQ2F0YWxvZy9QYWdlcyA0IDAgUgovT3BlbkFjdGlvblsxIDAgUiAvWFlaIG51bGwgbnVsbCAwXQovTGFuZyhlbi1DQSkKPj4KZW5kb2JqCgoxMyAwIG9iago8PC9DcmVhdG9yPEZFRkYwMDU3MDA3MjAwNjkwMDc0MDA2NTAwNzI+Ci9Qcm9kdWNlcjxGRUZGMDA0QzAwNjkwMDYyMDA3MjAwNjUwMDRGMDA2NjAwNjYwMDY5MDA2MzAwNjUwMDIwMDAzNTAwMkUwMDM0PgovQ3JlYXRpb25EYXRlKEQ6MjAxOTAzMjUxMDI3MjYtMDQnMDAnKT4+CmVuZG9iagoKeHJlZgowIDE0CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwNzA1NiAwMDAwMCBuIAowMDAwMDAwMDE5IDAwMDAwIG4gCjAwMDAwMDAyMjEgMDAwMDAgbiAKMDAwMDAwNzIyNSAwMDAwMCBuIAowMDAwMDAwMjQxIDAwMDAwIG4gCjAwMDAwMDYxOTcgMDAwMDAgbiAKMDAwMDAwNjIxOCAwMDAwMCBuIAowMDAwMDA2NDEzIDAwMDAwIG4gCjAwMDAwMDY3NjEgMDAwMDAgbiAKMDAwMDAwNjk2OSAwMDAwMCBuIAowMDAwMDA3MDAxIDAwMDAwIG4gCjAwMDAwMDczMjQgMDAwMDAgbiAKMDAwMDAwNzQyMSAwMDAwMCBuIAp0cmFpbGVyCjw8L1NpemUgMTQvUm9vdCAxMiAwIFIKL0luZm8gMTMgMCBSCi9JRCBbIDxCMUZCQTE5NkVBNzFFOEZCQzlDQzFGRjcyRUU1MUVGQj4KPEIxRkJBMTk2RUE3MUU4RkJDOUNDMUZGNzJFRTUxRUZCPiBdCi9Eb2NDaGVja3N1bSAvNUJDQ0ZDNEQxNEY0RDMzRTE4OTAwQjdBOTQ0NjAzRUQKPj4Kc3RhcnR4cmVmCjc1OTYKJSVFT0YK', 'https://picsum.photos/900/500/?random'];
  closeResult: string;
  constructor(private http: HttpClient, private changeDetectorRef: ChangeDetectorRef, private modalService: NgbModal) { }

  private eventsSubject: Subject<any> = new Subject<any>();

  @ViewChild("content")
  contentForImageViewer: any;

  onNext(index) {   
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
      this.eventsSubject.next({ images: { ...this.images } });
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
