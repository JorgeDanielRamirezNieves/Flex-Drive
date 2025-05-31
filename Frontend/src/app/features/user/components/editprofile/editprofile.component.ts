import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { catchError, finalize, map, Subscription, throwError } from 'rxjs';
import { User } from '../../models/user';
import { observatorAny } from '../../../../core/tipo-any';
import { TypeDocument } from '../../models/type-document';
import { TypeDocumentService } from '../../services/type-document.service';
import { jwtDecode } from 'jwt-decode';
import { CommonServiceService } from '../../../../shared/services/common-service.service';
import { Country } from '../../../../shared/models/country';
import { MessageService } from 'primeng/api';
import { FileSelectEvent } from 'primeng/fileupload';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../../auth/services/auth.service';
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
  public prefix: any;
  public prefixes: any[] = [];
  public phoneNumber:any = {};
  public country: Country | undefined;
  public countries: Country[] = [];
  public file: File | null = null;
  public urlImage: string = '';
  public isUploaded: boolean = false;
  public initEmail: string;

  constructor(
    private router: Router,
    private userService: UserService,
    private typeDocumentService: TypeDocumentService,
    private commonServices: CommonServiceService,
    private messageService: MessageService,
    private authService: AuthService
  ) {
    this.token = jwtDecode(localStorage.getItem('authToken') || '');
    this.role = this.token.rolUser.name;
    this.userUUID = this.token.uuid;
    this.subcription = this.tmp;
    this.selectedDocument = '';
    this.initEmail = '';
  }



  ngOnDestroy(): void {
    if (this.subcription) {
      this.subcription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.getUser();
    this.getCountries();
  }

  private getUser() {
    this.subcription = this.userService
      .getUserByUUID(this.userUUID)
      .pipe(
        map((res: any) => {
          this.user = res;
          this.selectedDocument = this.user?.idTypeDocument || '';
          this.prefix = this.prefixes.find(
            (p) => p.value === this.user?.phone?.split(' ')[0]
          );
          const phone = this.user?.phone
            ? this.user?.phone.split(' ')[1]
            : '';
            this.phoneNumber = {value: phone};

          if (this.user?.country) {
            this.country = this.countries.find(
              (c) => c.name === this.user?.country
            );
          }
          this.initEmail = this.user?.email || '';
          this.urlImage = this.user?.image || '';
          this.getTypeDocument();
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

  public onSubmit(form: NgForm): void {
    if (form.valid) {
      const phone = this.prefix
        ? `${this.prefix.value} ${this.phoneNumber.value}`
        : this.phoneNumber.value;

      if (this.user) {
        this.user.idTypeDocument = this.selectedDocument;
        this.user.image = this.urlImage;
        this.user.phone = phone;
        this.user.country = this.country ? this.country.name : '';
        if (this.user.email !== this.initEmail) {
          this.authService
            .changeEmail(this.user.uuid || '', this.user.email)
            .pipe(
              catchError((err) => {
                throw new Error(err);
              }),
              finalize(() => {
                this.complete = true;
              })
            )
        }
      }

      console.log('Usuario a actualizar:', this.user);
      this.subcription = this.userService
        .updateUser(this.user as User)
        .pipe(
          map((res: any) => {
            console.log('Respuesta del servidor:', res);
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'Perfil actualizado correctamente',
              life: 3000,
            });
            this.router.navigate(['/user/editprofile']);
          }),
          catchError((err) => {
            throw new Error(err);
          }),
          finalize(() => {
            this.complete = true;
          })
        )
        .subscribe(observatorAny);
    } else {
      console.log('Formulario inválido');
    }
  }

  public getCountries() {
    this.subcription = this.commonServices
      .getAllCountries()
      .pipe(
        map((res: any) => {
          this.countries = res;
          this.prefixes = this.countries
            .map((country: Country) => {
              const prefix = country.phonecode.startsWith('+')
                ? country.phonecode
                : `+${country.phonecode}`;
              return {
                name: country.emoji,
                value: prefix,
              };
            })
            .sort((a, b) => a.name.localeCompare(b.name));
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

  onUpload(event: FileSelectEvent) {
    this.file = event.files[0];
    if (this.file) {
      this.uploadImage();
    }
  }

  // Componente - Método corregido
  public uploadImage() {
    if (!this.file) {
      return;
    }

    const formData = new FormData();
    formData.append('image', this.file); // 'image' debe coincidir con el FileInterceptor del backend

    this.subcription = this.commonServices
      .UploadedFile(formData)
      .pipe(
        map((res: any) => {
          console.log('Respuesta del servidor al subir imagen:', res);
          this.urlImage = res.data.cloudinary_url;
          this.isUploaded = true;
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Imagen subida exitosamente',
            life: 3000,
          });
        }),
        catchError((err: HttpErrorResponse) => {
          console.error('Error al subir imagen:', err);

          let errorMessage = 'No se pudo subir la imagen';

          // Manejar diferentes tipos de errores
          if (err.error && err.error.message) {
            errorMessage = err.error.message;
          } else if (err.status === 0) {
            errorMessage = 'Error de conexión con el servidor';
          } else if (err.status === 413) {
            errorMessage = 'La imagen es demasiado grande';
          } else if (err.status === 400) {
            errorMessage = 'Formato de imagen no válido';
          }

          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: errorMessage,
            life: 5000,
          });

          return throwError(() => err); // Forma moderna de throwError
        }),
        finalize(() => {
          this.complete = true;
          console.log('Subida de imagen completada');
        })
      )
      .subscribe({
        next: (result) => {
          // Este observer maneja los eventos exitosos
        },
        error: (error) => {
          // Este observer maneja errores no capturados
          console.error('Error no manejado:', error);
        },
      });
  }
}
