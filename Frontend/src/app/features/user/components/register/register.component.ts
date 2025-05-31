import { AuthService } from './../../../auth/services/auth.service';
import { Country } from './../../../../shared/models/country';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from '../../models/user';
import { catchError, finalize, map, Subscription, throwError } from 'rxjs';
import { TypeDocument } from '../../models/type-document';
import { TypeDocumentService } from '../../services/type-document.service';
import { observatorAny } from '../../../../core/tipo-any';
import { MessageService } from 'primeng/api';
import { CommonServiceService } from '../../../../shared/services/common-service.service';
import { FileSelectEvent } from 'primeng/fileupload';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
} from '@angular/common/http';
import { UserService } from '../../services/user.service';
import { jwtDecode } from 'jwt-decode';
@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit, OnDestroy {
  public selectedDocument: string;
  public agreeTerms: boolean;
  public file: File | null;
  public user: User;
  public subcription: Subscription;
  public tmp: any;
  public complete: boolean;
  public typesDocument: TypeDocument[] | undefined;
  public password: any;
  public urlImage: string;
  public isUploaded: boolean = false; // Indica si la imagen ha sido subida
  public isCreatingContract: boolean = false; // Indica si se está creando un contrato
  public isRegistering: boolean = false;
  public numberPhone: string = '';
  public prefix: any;
  public prefixes: any[];
  public country: Country | undefined; // Lista de países
  public countries: Country[] = []; // Lista de países

  constructor(
    private router: Router,
    private typeDocumentService: TypeDocumentService,
    private commonServices: CommonServiceService,
    private userService: UserService,
    private messageService: MessageService,
    private authService: AuthService
  ) {
    this.selectedDocument = '';
    this.agreeTerms = false;
    this.complete = false;
    this.password = {
      value: '',
      confirm: '',
    };
    this.urlImage = '';
    this.prefixes = [];
    this.file = null;
    this.subcription = this.tmp;
    this.prefix = '';
    this.user = new User(
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      new Date(),
      null,
      new Date(),
      '',
      '',
      'active',
      0,
      '',
      '5fb32b82-9f05-4ce8-8a75-cdb175d73073',
      ''
    );
  }

  ngOnDestroy(): void {
    if (this.subcription) {
      this.subcription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.getTypeDocument();
    this.getCountries();
  }

  public onSubmit(form: NgForm) {
    if (form.valid) {
      this.isRegistering = true;
      this.user.idTypeDocument = this.selectedDocument;
      this.user.image = this.urlImage;
      if (this.password.value !== this.password.confirm) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Las contraseñas no coinciden',
          life: 5000,
        });
        this.isRegistering = false;
        return;
      } else if (!this.agreeTerms) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Debe aceptar los términos y condiciones',
          life: 5000,
        });
        this.isRegistering = false;
        return;
      } else {
        this.user.password = this.password.value;
        this.user.phone = this.prefix.value + ' ' + this.user.phone;
        this.user.noDocument = this.user.noDocument.replace(/\s/g, '');
        this.user.country = this.country?.name || '';
        this.createUser();
        this.isRegistering = false; // Restablece el estado al finalizar
      }
      console.log('Datos del formulario:', this.user);
    } else {
      console.log('Formulario inválido');
    }
  }

  public createUser() {
    this.subcription = this.userService
      .createUser(this.user)
      .pipe(
        map((res: any) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Usuario creado exitosamente',
            life: 3000,
          });
          this.isRegistering = false;
          this.loginAftherRegister();
        }),
        catchError((err) => {
          console.error('Error al crear usuario:', err);
          this.isRegistering = false; // Restablece el estado en caso de error
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo crear el usuario',
            life: 5000,
          });

          return throwError(() => err);
        }),
        finalize(() => {
          this.complete = true;
        })
      )
      .subscribe(observatorAny);
  }

  public loginAftherRegister() {
    this.subcription = this.authService
      .login(this.user.email, this.password.value)
      .pipe(
        map((res: any) => {
          if (res.status === 200) {
            const token = jwtDecode(res.response.tokenApp) as any;
            const userUUID = token.uuid;
            this.router.navigate(['/user/preferences/']);
          }
        }),
        catchError((err) => {
          console.error('Error al iniciar sesión:', err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo iniciar sesión después del registro',
            life: 5000,
          });
          return throwError(() => err);
        }),
        finalize(() => {
          this.complete = true;
        })
      )
      .subscribe(observatorAny);
  }

  public onSignTermsChange(event: any) {
    this.agreeTerms = event.checked;
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
