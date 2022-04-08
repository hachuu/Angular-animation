import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.scss']
})
export class PdfComponent implements OnInit {

  activeDocumentsPreveiwModal = false;
  activatePaging = false;
  activeItem = false;
  activeDownloadOp = false;
  
  tempImgUrl: SafeUrl | undefined;
  @ViewChild('fileUpload', { static: false })
  fileUpload!: ElementRef;
  constructor(private domSanitizer: DomSanitizer) {

  }
  onFileSelected(files: FileList | null): void {
    const file = files && files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file)
      reader.onloadend = async (evt) => {
        if (evt && evt.target?.readyState === FileReader.DONE) {
          const arrayBuffer = evt.target.result;
          const base64Response = await fetch(`${arrayBuffer}`);
          const blob = await base64Response.blob();
          this.tempImgUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
        }
      }
    }
  }


  ngOnInit() {
  }

  activeDocPreviewModal() {
    this.activeDocumentsPreveiwModal = !this.activeDocumentsPreveiwModal;
    var pdf = new jsPDF();

    pdf.setFontSize(20);
    pdf.text('PACKING LIST', 11, 8);
    pdf.setFontSize(12);
    pdf.setTextColor(99);
    // (pdf as any).autoTable({
    // head: [['ID', 'Name', 'Email', 'Profile']],
    // body: [
    //   [1, 'John', 'john@yahoo.com', 'HR'],
    //   [2, 'Angel', 'angel@yahoo.com', 'Marketing'],
    //   [3, 'Harry', 'harry@yahoo.com', 'Finance'],
    //   [4, 'Anne', 'anne@yahoo.com', 'Sales'],
    //   [5, 'Hardy', 'hardy@yahoo.com', 'IT'],
    //   [6, 'Nikole', 'nikole@yahoo.com', 'Admin'],
    //   [7, 'Sandra', 'Sandra@yahoo.com', 'Sales'],
    //   [8, 'Lil', 'lil@yahoo.com', 'Sales'],
    //   [1, 'John', 'john@yahoo.com', 'HR'],
    //   [2, 'Angel', 'angel@yahoo.com', 'Marketing'],
    //   [3, 'Harry', 'harry@yahoo.com', 'Finance'],
    //   [4, 'Anne', 'anne@yahoo.com', 'Sales'],
    //   [5, 'Hardy', 'hardy@yahoo.com', 'IT'],
    //   [6, 'Nikole', 'nikole@yahoo.com', 'Admin'],
    //   [7, 'Sandra', 'Sandra@yahoo.com', 'Sales'],
    //   [8, 'Lil', 'lil@yahoo.com', 'Sales'],
    //   [1, 'John', 'john@yahoo.com', 'HR'],
    //   [2, 'Angel', 'angel@yahoo.com', 'Marketing'],
    //   [3, 'Harry', 'harry@yahoo.com', 'Finance'],
    //   [4, 'Anne', 'anne@yahoo.com', 'Sales'],
    //   [5, 'Hardy', 'hardy@yahoo.com', 'IT'],
    //   [6, 'Nikole', 'nikole@yahoo.com', 'Admin'],
    //   [7, 'Sandra', 'Sandra@yahoo.com', 'Sales'],
    //   [8, 'Lil', 'lil@yahoo.com', 'Sales'],
    //   [1, 'John', 'john@yahoo.com', 'HR'],
    //   [2, 'Angel', 'angel@yahoo.com', 'Marketing'],
    //   [3, 'Harry', 'harry@yahoo.com', 'Finance'],
    //   [4, 'Anne', 'anne@yahoo.com', 'Sales'],
    //   [5, 'Hardy', 'hardy@yahoo.com', 'IT'],
    //   [6, 'Nikole', 'nikole@yahoo.com', 'Admin'],
    //   [7, 'Sandra', 'Sandra@yahoo.com', 'Sales'],
    //   [8, 'Lil', 'lil@yahoo.com', 'Sales'],
    //   [1, 'John', 'john@yahoo.com', 'HR'],
    //   [2, 'Angel', 'angel@yahoo.com', 'Marketing'],
    //   [3, 'Harry', 'harry@yahoo.com', 'Finance'],
    //   [4, 'Anne', 'anne@yahoo.com', 'Sales'],
    //   [5, 'Hardy', 'hardy@yahoo.com', 'IT'],
    //   [6, 'Nikole', 'nikole@yahoo.com', 'Admin'],
    //   [7, 'Sandra', 'Sandra@yahoo.com', 'Sales'],
    //   [8, 'Lil', 'lil@yahoo.com', 'Sales'],
    //   [1, 'John', 'john@yahoo.com', 'HR'],
    //   [2, 'Angel', 'angel@yahoo.com', 'Marketing'],
    //   [3, 'Harry', 'harry@yahoo.com', 'Finance'],
    //   [4, 'Anne', 'anne@yahoo.com', 'Sales'],
    //   [5, 'Hardy', 'hardy@yahoo.com', 'IT'],
    //   [6, 'Nikole', 'nikole@yahoo.com', 'Admin'],
    //   [7, 'Sandra', 'Sandra@yahoo.com', 'Sales'],
    //   [8, 'Lil', 'lil@yahoo.com', 'Sales']
    // ],
    // theme: 'plain',
    // pageBreak: 'auto',
    // horizontalPageBreak: true,
    // rowPageBreak: 'auto',
    // didDrawCell: (data: { column: { index: any; }; }) => {
    //     console.log(data.column.index)
    //   }
    // })
    (pdf as any).autoTable({ html: '#test-div', theme: 'grid', tableWidth: 'auto', bodyStyles: {lineColor: [192, 192, 192], lineWidth: 0.1, fontSize: 8}, styles: { lineColor: [0, 0, 0], lineWidth: 0, fontSize: 8, columnStyles: { 0: {cellWidth: 10}, 1: {cellWidth: 'auto'}, 2: {cellWidth: 10}} } });

    (pdf as any).autoTable({ html: '#test-div', theme: 'grid', tableWidth: 'auto', pageBreak: 'always'});

    // (pdf as any).addPage()
    // (pdf as any).autoTable({ html: '#test-div', theme: 'grid', pageBreak: 'always', tableWidth: 'auto' });
    // pdf.addImage('https://api.tradlinx.com/images/corp/logo/1600070731874Q2Bsj.png', 'JPEG', 50, 100, 10, 10);
    // pdf.addImage('https://api.tradlinx.com/images/corp/logo/1600070731874Q2Bsj.png', 'JPEG', 5, 10, 5, 5);
    // pdf.addImage('https://api.tradlinx.com/images/corp/logo/1600070731874Q2Bsj.png', 'JPEG', 1, 1, 1, 1);
    // pdf.addImage('https://api.tradlinx.com/images/corp/logo/1600070731874Q2Bsj.png', 'JPEG', 2, 2, 2, 2);
    // pdf.addImage('https://api.tradlinx.com/images/corp/logo/1600070731874Q2Bsj.png', 'JPEG', 150, 50, 5, 5);
    // pdf.setFont("helvetica");
    // pdf.setFontSize(20);
    this.tempImgUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(pdf.output('blob')));
    // this.tempImgUrl = pdf.output('blob');
    // this.tempImgUrl = pdf.output('bloburl');
  }

  closeModal($event: any) {
    this.activeDocumentsPreveiwModal = false;
  }

  cancel() {
    
  }

  
  toggleItem() {
    this.activeItem = !this.activeItem;
  }

  clickDownloadBtn() {
    this.activeDownloadOp = !this.activeDownloadOp;
  }

}
