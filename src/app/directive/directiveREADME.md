# ModalDirective

- selector [modal]
- input
  - modal : boolean 값을 받아 값이 변경하는 경우에 document body의 class 'hidden'을 토글시킨다.
- 사용법

```
<button type="button" class="quotes-icon-btn btn btn-blue btn-md" (click)="activateQuotesModal()" [modal]="activequotesModal">
```

# LabelCheckedDirective
- selector [labelChecked]
- input
  - id: label의 짝인 input의 id를 받아 제어한다.
- 주의할점: document.getElementById(this.targetId) dom 직접 접근이라서 그런지 id가 고유하지 않으면 동작이 제대로 되지 않는 문제가 발생한다.
- 사용법
```
<input type="checkbox" id="{{wrapTitle}}-Fcl" checked>
<label for="{{wrapTitle}}-Fcl" labelChecked [id]="wrapTitle+'-Fcl'">FCL</label>
```

# ModalDirective + LabelCheckedDirective
- 혼합 사용법 (ModalDirective+LabelCheckedDirective)
- labelChecked emit하는 method를 받아와 modal 활성화하는 boolean 변수를 제어하고 input tag의 [checked]값에 매핑해준다.
- 원리 : label 디렉티브의 hostlistener를 통하여 enter키나 click 이벤트가 들어오는 경우 input 태그의 checked를 활성/비활성 시킨다.

```
  <label class="btn modal-hidden-btn" for="company-view" labelChecked [id]="'company-view'" (labelCheckedEmit)="activatecompanyViewModal()">제조사 이름 <i class="close ri-close-line"></i></label>
  <input class="modal-state" id="company-view" type="checkbox" [modal]="activecompanyViewModal" (closeEmit)="closeModal($event)" [checked]="activecompanyViewModal"/>
```

# OnlyPatternDirective
- input에 대한 정규식 체크 후 input의 value 혹은 model 값 변경해줌
- input 
  - regExp: 변경하고 싶은 정규식을 string형태로 넘겨준다.
```
<span class="half-input">
  <input type="text" placeholder="영문(필수)" formControlName="companyEn" onlyPattern [regExp]="'[^a-zA-Z]'" />
</span>
<span class="half-input">
  <input type="text" placeholder="한글" formControlName="companyKr" onlyPattern [regExp]="'[(\\s)]'" />
</span>
```
