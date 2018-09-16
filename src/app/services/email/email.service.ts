import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as jsPDF from 'jspdf';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) { }

  sendEmail(form: FormGroup) {

    console.log(form);

    this.http.post("https://localhost:44325/api/email", form)
      .subscribe(resp => {
        console.log(resp);
      },
      (error: any) => alert('Error to send Email.')
    );
  }
}
