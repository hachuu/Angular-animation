import { Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-drop-file',
  templateUrl: './drop-file.component.html',
})
export class DropFileComponent implements OnInit {

  @Input() fileType: string = 'photo'; // 'photo' | 'doc'
  @Input() multiple: boolean = false;
  @Input() disabled: boolean = false;
  @Input() savedFileNm: string = '';
  @Input() isSavedFileError: boolean = false;
  @Input() imgIcon: string = 'ri-camera-fill';
  @Input() titleText: string = '클릭, 혹은 드래그하여 파일을 등록해주세요.';
  isFile = false;
  fileName = '';

  @Output() fileEmit = new EventEmitter();
  
  FILE_SIZE: number  = this.fileType === 'photo' ? 5000000 : 15000000;

  @ViewChild('fileUpload', { static: false })
  fileUpload!: ElementRef;
  uploadForm: FormGroup;
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.uploadForm = this.formBuilder.group({
      corpReg: ['']
    });
   }

  ngOnInit(): void {
  }

  ngOnChanges(changes:SimpleChanges) {
    if(changes['savedFileNm'] && changes['savedFileNm'].currentValue) {
      this.fileName = this.savedFileNm;
      this.isFile = true;
      this.isLoading = false;
    } else if (changes['savedFileNm'] && (changes['savedFileNm'].currentValue === '' || changes['savedFileNm'].currentValue === null)) {
      this.fileName = '';
      this.isLoading = false;
    }
    if(changes['isSavedFileError'] && changes['isSavedFileError'].currentValue) {
      this.isLoading = false;
    }
  }

  onFileSelected(files: any) {
    if (!!files) {
      if(files.length > 1) {
  
      } else {
        this.isFile = true;
        this.isLoading = true;
        // this.fileName = '';
        if (files[0].size > this.FILE_SIZE) {
          console.log('파일은 5MB로 제한됩니다.')
          this.errorFileSelected();
        } else if (this.fileType === 'doc' && files[0].type !== 'application/pdf') {
          console.log('지원하지 않는 형식의 파일입니다.')
          this.errorFileSelected();
        } else if (this.fileType === 'photo' && !['image/png', 'image/jpeg', 'image/jpg'].includes(files[0].type)) {
          console.log('지원하지 않는 형식의 파일입니다.')
          this.errorFileSelected();
        } else {
          this.fileName = files[0].name;
          this.fileEmit.emit(files[0]);
        }
      }
    }
  }

  errorFileSelected() {
    this.fileEmit.emit();
    this.isLoading = false;
    this.isFile = false;
  }

}
