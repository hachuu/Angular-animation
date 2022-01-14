import { Component, OnInit } from '@angular/core';
import { ExcelService } from './excel.service';

@Component({
  selector: 'app-excel',
  templateUrl: './excel.component.html',
  styleUrls: ['./excel.component.scss']
})
export class ExcelComponent implements OnInit {


  ngOnInit(): void {
  }

  title = 'exportExcelInAngular';
  
  excelData: any = [
    {
      "numberrange": 0,
      "name": "Ronan Lara",
      "phone": "1-365-229-3275",
      "email": "euismod.est.arcu@icloud.net",
      "address": "988-964 Faucibus Street",
      "list": 3,
      "country": "India",
      "region": "Đắk Nông",
      "postalZip": "32157",
      "text": "eu, placerat eget, venenatis a, magna. Lorem ipsum dolor sit",
      "currency": "$90.71",
      "alphanumeric": "MPR08GOH8HH"
    },
    {
      "numberrange": 0,
      "name": "Noah Chambers",
      "phone": "1-395-882-7194",
      "email": "dictum.ultricies.ligula@google.com",
      "address": "1759 Sodales St.",
      "list": 17,
      "country": "New Zealand",
      "region": "Innlandet",
      "postalZip": "32157",
      "text": "arcu. Nunc mauris. Morbi non sapien molestie orci tincidunt adipiscing.",
      "currency": "$80.73",
      "alphanumeric": "VUT50KDE5OW"
    },
    {
      "numberrange": 8,
      "name": "Hilda Juarez",
      "phone": "1-141-432-1365",
      "email": "maecenas.libero@yahoo.couk",
      "address": "Ap #402-4411 Vitae, Ave",
      "list": 9,
      "country": "United Kingdom",
      "region": "La Libertad",
      "postalZip": "32157",
      "text": "Duis sit amet diam eu dolor egestas rhoncus. Proin nisl",
      "currency": "$81.92",
      "alphanumeric": "PVH23FND6CV"
    },
    {
      "numberrange": 3,
      "name": "Joseph Best",
      "phone": "(762) 849-5279",
      "email": "at.velit.cras@protonmail.org",
      "address": "Ap #613-7189 Urna, St.",
      "list": 9,
      "country": "New Zealand",
      "region": "Puntarenas",
      "postalZip": "32157",
      "text": "mi felis, adipiscing fringilla, porttitor vulputate, posuere vulputate, lacus. Cras",
      "currency": "$86.26",
      "alphanumeric": "MVA17XVV8BV"
    },
    {
      "numberrange": 3,
      "name": "Sybill Michael",
      "phone": "(594) 648-4871",
      "email": "at.auctor@google.ca",
      "address": "5814 Vulputate, Ave",
      "list": 9,
      "country": "New Zealand",
      "region": "Morelos",
      "postalZip": "32157",
      "text": "lorem, sit amet ultricies sem magna nec quam. Curabitur vel",
      "currency": "$9.10",
      "alphanumeric": "EYW63XIT8EB"
    }
  ];
  header = Object.keys(this.excelData[0]);
  constructor(private excelService:ExcelService){

  }
  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.excelData, 'excel Data');
  }

}
