import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { catchError, finalize, map, Subscription } from 'rxjs';
import { User } from '../../models/user';
import { observatorAny } from '../../../../core/tipo-any';
import { TypeDocument } from '../../models/type-document';
import { TypeDocumentService } from '../../services/type-document.service';
import { jwtDecode } from 'jwt-decode';
@Component({
  selector: 'app-editprofile',
  standalone: false,
  templateUrl: './editprofile.component.html',
  styleUrl: './editprofile.component.css',
})
export class EditprofileComponent implements OnInit, OnDestroy {
  public selectedDocument: string;
  public userUUID: string;
  public role: string;
  public subcription: Subscription;
  public tmp: any;
  public token: any;
  public user: User | undefined;
  public complete: boolean = false;
  public typesDocument: TypeDocument[] | undefined;

  constructor(
    private router: Router,
    private userService: UserService,
    private typeDocumentService: TypeDocumentService
  ) {
    this.token = jwtDecode(localStorage.getItem('authToken') || '');
    this.role = this.token.rolUser.name;
    this.userUUID = this.token.uuid;
    this.subcription = this.tmp;
    this.selectedDocument = '';
  }

  ngOnDestroy(): void {
    if (this.subcription) {
      this.subcription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.getUser();
    this.getTypeDocument();
  }

  private getUser() {
    this.subcription = this.userService
      .getUserByUUID(this.userUUID)
      .pipe(
        map((res: any) => {
          this.user = res;
          this.selectedDocument = this.user?.idTypeDocument || '';
        }),
        catchError((err) => {
          throw new Error(err);
        }),
        finalize(() => {
          this.complete = true;
        })
      )
      .subscribe(observatorAny);
  }

  public getTypeDocument() {
    this.subcription = this.typeDocumentService
      .getTypeDocument()
      .pipe(
        map((res: any) => {
          this.typesDocument = res;
        }),
        catchError((err) => {
          throw new Error(err);
        }),
        finalize(() => {
          this.complete = true;
        })
      )
      .subscribe(observatorAny);
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      console.log('Formulario válido. Redirigiendo...');
      this.router.navigate(['/landing']);
    } else {
      console.log('Formulario inválido');
    }
  }
}
