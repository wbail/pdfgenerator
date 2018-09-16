import { Component, OnInit } from '@angular/core';
import * as jsPDF from 'jspdf';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmailService } from '../services/email/email.service';
import { UserComponent } from '../user/user.component';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {

  imagemForm: FormGroup;

  imagemUrl = new Array<string>();
  imagemToUpload: File = null;
  qnt = 0;
  e = null;

  enviarEmail: boolean = false;

  constructor(private emailService: EmailService) { }

  ngOnInit() {
    this.imagemForm = new FormGroup({
      imagemToUpload: new FormControl(null, [Validators.required]),
      nomeArquivo: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.email]),
      conteudo: new FormControl(null),
    });
  }

  fileInput(event) {
    this.imagemUrl = [];
    var files = event.target.files;
    this.e = event;
    this.qnt = files.length;

    for (let file of files) {
      let reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagemUrl.push(e.target.result);
      }
      reader.readAsDataURL(file);
    }
  }

  generatePdf() {

    const doc = new jsPDF('p', 'mm', 'a4');

    for (var i = 0; i < this.qnt; i++) {
      doc.addPage(doc.addImage(this.imagemUrl[i], 'PNG', 0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight()));
    }
    
    doc.output('datauri');
    
    this.imagemForm.get('nomeArquivo').value + '.pdf';

    if (this.enviarEmail == true) {
      this.emailService.sendEmail(this.imagemForm);
    } else {
      doc.save(this.imagemForm.get('nomeArquivo').value + '.pdf');
    }
  }

  showEmailForm() {
    this.enviarEmail = !this.enviarEmail;
  }
}
