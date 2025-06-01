import { UserService } from './../../../user/services/user.service';
import { TypeSalesService } from './../../services/type-sales.service';
import { catchError, finalize, map, Subscription, throwError } from 'rxjs';
import { Imagesvehicle, Vehicle } from './../../models/vehicle';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { CommonServiceService } from '../../../../shared/services/common-service.service';
import { observatorAny } from '../../../../core/tipo-any';
import { VehicleService } from '../../services/vehicle.service';
import { Soat } from '../../models/soat';
import { Tecnomecanic } from '../../models/tecnomecanic';
import { Location } from '@angular/common';
import { TypeSale } from '../../models/type-sale';
import { Price } from '../../models/price';
import { FileSelectEvent } from 'primeng/fileupload';
import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { TecnicalDetails } from '../../models/tecnical-details';
import { ContractsService } from '../../../contracts/services/contracts.service';
import { Contract } from '../../../contracts/models/contract';

@Component({
  selector: 'app-vehicle-form',
  standalone: false,
  templateUrl: './vehicle-form.component.html',
  styleUrl: './vehicle-form.component.css',
})
export class VehicleFormComponent implements OnInit, OnDestroy {
  public steps: any;
  public activeIndex: number;
  public plate: string;
  public vehicle: Vehicle | null;
  public token: any;
  public uuidOwner: string;
  public testData: any;
  public testDataDetails: any;
  public subscription: Subscription;
  public tmp: any;
  public complete: boolean;
  public newVehicle: boolean;
  public listSoat: Soat[];
  public listRTM: Tecnomecanic[];
  public typeSales: TypeSale[]
  public price: Price;
  public initPrice: Price;
  public minPrice: number;
  public maxPrice: number;
  public accessoriesVehicle: any[];
  public accessory: any;
  public homeDelivery: boolean;
  public file: File | null;
  public isUploading: boolean = false;
  public images: Imagesvehicle[] = [];
  public availables: any[] = [ {
    name: 'Todos los días',
  },
  {
    name: 'Lunes a Viernes',
  },
  {
    name: 'Sábados y Domingos',
  },
  {
    name: 'Festivos o Feriados',
  }
 ]; // cambiar campo en base de datos para que sea array de strings
  public isCreatingContract: boolean = false;
  public termsAndConditions: Contract;


  constructor(
    private activatedRoute: ActivatedRoute,
    private commonService: CommonServiceService,
    private vehicleService: VehicleService,
    private typeSalesService: TypeSalesService,
    private contractsService: ContractsService,
    private userService: UserService,
    private messageService: MessageService,
    private router: Router,
    private location: Location
  ) {
    this.activeIndex = 0;
    this.testData = {};
    this.testDataDetails = {};
    this.subscription = this.tmp;
    this.typeSales = [];
    this.steps = [
      { label: 'Vehículo', index: 0 },
      { label: 'Negocio', index: 1 },
      { label: 'Imágenes', index: 2 },
    ];
    this.complete = false;
    this.newVehicle = false;
    this.listSoat = [];
    this.listRTM = [];
    this.plate = this.activatedRoute.snapshot.params['plate'] || '';
    this.token = jwtDecode(localStorage.getItem('authToken') || '');
    this.uuidOwner = this.token.uuid;
    this.vehicle = null;
    this.minPrice = 120000;
    this.maxPrice = 1000000;
    this.termsAndConditions = new Contract(
      {
        terms: 'Terms and conditions of the contract',
        title: 'Contract Title',
        waiver: 'Waiver details',
        notices: 'Notices details',
        version: '1.0',
        amendments: 'Amendments details',
        assignment: 'Assignment details',
        compliance: 'Compliance details',
        auditRights: 'Audit rights details',
        description: 'Contract Description',
        counterparty: 'Counterparty details',
        dataSecurity: 'Data security details',
        dataTransfer: 'Data transfer details',
        forceMajeure: 'Force majeure details',
        governingLaw: 'Governing law details',
        jurisdiction: 'Jurisdiction details',
        severability: 'Severability details',
        dataRetention: 'Data retention details',
        effectiveDate: '2023-01-01',
        governingBody: 'Governing body details',
        privacyPolicy: 'Privacy policy details',
        dataProcessing: 'Data processing details',
        expirationDate: '2024-01-01',
        amendmentMethod: 'Amendment method details',
        confidentiality: 'Confidentiality details',
        entireAgreement: 'Entire agreement details',
        indemnification: 'Indemnification details',
        acceptanceMethod: 'Acceptance method details',
        revocationMethod: 'Revocation method details',
        dataSubjectRights: 'Data subject rights details',
        disputeResolution: 'Dispute resolution details',
        governingLanguage: 'Governing language details',
        terminationMethod: 'Termination method details',
        contactInformation: 'Contact information for inquiries',
        liabilityLimitations: 'Liability limitations details',
        dataProcessingPurpose: 'Data processing purpose details',
        dataProcessingRecords: 'Data processing records details',
        dataProtectionOfficer: 'Data protection officer details',
        entireAgreementClause: 'Entire agreement clause details',
        dataBreachNotification: 'Data breach notification details',
        dataProcessingDuration: 'Data processing duration details',
        dataProcessingAgreement: 'Data processing agreement details',
        thirdPartyBeneficiaries: 'Third-party beneficiaries details',
        dataProcessingCategories: 'Data processing categories details',
        dataProcessingLegalBasis: 'Data processing legal basis details',
        dataProcessingRecipients: 'Data processing recipients details',
        dataProcessingDataSecurity: 'Data processing data security details',
        dataProcessingDataRetention: 'Data processing data retention details',
        dataProcessingDataTransfers: 'Data processing data transfers details',
        dataProcessingSubprocessors: 'Data processing subprocessors details',
        dataProcessingSecurityMeasures:
          'Data processing security measures details',
        dataProtectionImpactAssessment:
          'Data protection impact assessment details',
        dataProcessingDataSubjectRights:
          'Data processing data subject rights details',
        dataProcessingDataBreachResponse:
          'Data processing data breach response details',
        dataProcessingDataProtectionOfficer:
          'Data processing data protection officer details',
        dataProcessingDataBreachNotification:
          'Data processing data breach notification details',
        dataProcessingDataTransferMechanisms:
          'Data processing data transfer mechanisms details',
        dataProcessingDataProtectionImpactAssessment:
          'Data processing data protection impact assessment details',
      },
      new Date(),
      null,
      true,
      'cc75f98f-ce7e-4055-8a2a-b8e901cc14f5',
      '82e59bf4-ecda-4702-bfc6-d400ebbc839e',
      null,
      ['Flex Drive']
    );

    const currentDate = new Date(); // Obtener la fecha actual
    const plus5Years = new Date(currentDate.getFullYear() + 5, currentDate.getMonth(), currentDate.getDate());
    this.price = new Price(0, currentDate, plus5Years, '')
    this.initPrice = new Price(0, currentDate, plus5Years, '')
    this.accessoriesVehicle = [
      {
        name: 'portaequipajes',
      },
      {
        name: 'fundas de asiento',
      },
      {
        name: 'soporte para teléfono',
      },
      {
        name: 'cargador de coche',
      },
      {
        name: 'alfombrillas',
      },
      {
        name: 'altavoz bluetooth',
      },
      {
        name: 'botiquín de primeros auxilios',
      },
      {
        name: 'kit de emergencia',
      },
      {
        name: 'kit de herramientas',
      },
      {
        name: 'funda para coche',
      }
    ];
    this.accessory = '';
    this.homeDelivery = false;
    this.file = null;
  }

  public goBack() {
    this.location.back();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.findVehicleByPlate();
    this.getTypeSale();
  }

  public onSubmit() {
    if (this.vehicle) {
      this.vehicle.plate = this.plate;
      this.vehicle.soatVehicle = this.listSoat;
      this.vehicle.TecnomecanicVehicle = this.listRTM;
      this.vehicle.prices = [this.price];
      this.vehicle.homeDelivery = this.homeDelivery;
      this.vehicle.image = this.images;

      console.log('Vehicle to submit:', this.vehicle);

      if (this.newVehicle) {
        this.vehicle.idOwner = this.uuidOwner;
        this.vehicle.capacity = this.testData.capacity;
        this.vehicle.doors = this.testData.doors;
        this.vehicle.color = this.testData.color;
        this.vehicle.licenceNumber = this.testData.licence_no;
        this.vehicle.type = this.testData.class;
        const details: TecnicalDetails = {
          serviceType: 'private',
          brand: this.testDataDetails.brand,
          model: this.testDataDetails.model,
          year: this.testDataDetails.year,
          cylinderCapacity: this.testDataDetails.cylinder_capacity,
          fuelType: this.testDataDetails.fuel,
          weight: this.testDataDetails.weight,
          loadCapacity: this.testDataDetails.load_capacity,
          noChassis: this.testDataDetails.no_chassis,
          idVehicle: '',
        }
        this.vehicle.detailsVehicle = details;
        this.termsAndConditions.accordants.push(this.uuidOwner);
        console.log('disponibilidad', this.vehicle.availability);
        
        this.subscription = this.vehicleService
          .createVehicle(this.vehicle)
          .pipe(
            map((res: any) => {
              this.changeUserRole();
              this.createContract();
              this.messageService.add({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Vehículo creado exitosamente',
                life: 3000,
              });
              this.router.navigate(['/vehicles/myvehicles']);
            }),
            catchError((err) => {
              console.error(err);
              throw new Error(err);
            }),
            finalize(() => {
              this.complete = true;
            })
          )
          .subscribe(observatorAny);
      } else {
        // Lógica para actualizar un vehículo existente
        this.subscription = this.vehicleService
          .updateVehicle(this.vehicle)
          .pipe(
            map((res: any) => {
              console.log('Vehículo actualizado:', res);
              this.messageService.add({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Vehículo actualizado exitosamente',
                life: 3000,
              });
              this.router.navigate(['/vehicles/myvehicles']);
            }),
            catchError((err) => {
              console.error(err);
              throw new Error(err);
            }),
            finalize(() => {
              this.complete = true;
            })
          )
          .subscribe(observatorAny);
      }
    }
  }

  public onActiveIndexChange(event: number) {
    this.activeIndex = event;
  }

  public onNextStep() {
    if (this.activeIndex < this.steps.length - 1) {
      this.activeIndex++;
    }
  }

  public onPreviousStep() {
    if (this.activeIndex > 0) {
      this.activeIndex--;
    }
  }

  public findVehicleByPlate() {
    this.subscription = this.vehicleService
      .getVehicleByPlate(this.plate)
      .pipe(
        map((res: any) => {
          if (res === null) {
            this.vehicle = new Vehicle(
              this.plate,
              '',
              '',
              'available',
              '',
              '',
              0,
              '',
              [],
              0,
              0,
              [],
              '',
              3,
              false,
              new Date(),
              null,
              '',
              this.uuidOwner
            );
            this.newVehicle = true;
            this.getVehicleData();
            this.getVehicleDetailsData();
            this.getVehicleSoatsData();
            this.getVehicleRTMData();
          } else {
            this.vehicle = res;
            this.listSoat = this.vehicle?.soatVehicle || [];
            this.listRTM = this.vehicle?.TecnomecanicVehicle || [];
            const mostRecentPrice = this.vehicle?.prices?.reduce((prev, current) => {
              return new Date(prev.startDate) > new Date(current.startDate) ? prev : current;
            });
            this.price = mostRecentPrice || new Price(0, new Date(), new Date(), '');
            this.images = this.vehicle?.image || [];
            
          }
        }),
        catchError((err) => {
          console.error(err);
          throw new Error(err);
        }),
        finalize(() => {
          this.complete = true;
        })
      )
      .subscribe(observatorAny);
  }

  public getTypeSale() {
    this.subscription = this.typeSalesService
      .getTypeSales()
      .pipe(
        map((res: any) => {
          this.typeSales = res;
        }),
        catchError((err) => {
          console.error(err);
          throw new Error(err);
        }),
        finalize(() => {
          this.complete = true;
        })
      )
      .subscribe(observatorAny);
  }

  public getVehicleData() {
    this.subscription = this.commonService
      .getTestVehicle()
      .pipe(
        map((res: any) => {
          this.testData = res;
        }),
        catchError((err) => {
          console.error(err);
          throw new Error(err);
        }),
        finalize(() => {
          this.complete = true;
        })
      )
      .subscribe(observatorAny);
  }

  public getVehicleDetailsData() {
    this.subscription = this.commonService
      .getTestDetailsVehicle()
      .pipe(
        map((res: any) => {
          this.testDataDetails = res;
        }),
        catchError((err) => {
          console.error(err);
          throw new Error(err);
        }),
        finalize(() => {
          this.complete = true;
        })
      )
      .subscribe(observatorAny);
  }

  public getVehicleSoatsData() {
    this.subscription = this.commonService
      .getTestSoat()
      .pipe(
        map((res: any) => {
          this.listSoat = res;
        }),
        catchError((err) => {
          console.error(err);
          throw new Error(err);
        }),
        finalize(() => {
          this.complete = true;
        })
      )
      .subscribe(observatorAny);
  }

  public getVehicleRTMData() {
    this.subscription = this.commonService
      .getTestRTM()
      .pipe(
        map((res: any) => {
          this.listRTM = res;
        }),
        catchError((err) => {
          console.error(err);
          throw new Error(err);
        }),
        finalize(() => {
          this.complete = true;
        })
      )
      .subscribe(observatorAny);
  }

  public changeUserRole(){
    this.subscription = this.userService
      .changeRoleUser(this.uuidOwner, '153c9307-1866-4848-9007-f9e02697d590')
      .pipe(
        catchError((err) => {
          console.error(err);
          throw new Error(err);
        }),
        finalize(() => {
          this.complete = true;
        })
      )
      .subscribe(observatorAny);
  }
  public createContract() {
    this.isCreatingContract = true; // Indica que se está creando un contrato
    this.subscription = this.contractsService
      .createContract(this.termsAndConditions)
      .pipe(
        map((res: any) => {
          this.isCreatingContract = false; // Restablece el estado al finalizar
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Has aceptado los términos y condiciones de manera exitosa',
            life: 3000,
          });
        }),
        catchError((err) => {
          this.isCreatingContract = false; // Restablece el estado en caso de error
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo crear el contrato',
            life: 5000,
          });
          return throwError(() => err);
        }),
        finalize(() => {
          this.isCreatingContract = false;
        })
      )
      .subscribe(observatorAny);
  }

  public addAccessory() {
    if (
      this.accessory &&
      !this.vehicle?.accesories.includes(this.accessory.name)
    ) {
      this.vehicle?.accesories.push(this.accessory.name);
      this.accessory = {};
    }
  }

  public removeAccessory(accessory: string) {
    const index = this.accessoriesVehicle.indexOf(accessory);
    if (index > -1) {
      this.accessoriesVehicle.splice(index, 1);
    }
  }

  onUpload(event: FileSelectEvent) {
    const tamanno = event.files.length
    this.file = event.files[tamanno - 1]; // Tomar el último archivo seleccionado
    if (this.file) {
      this.uploadImage();
    }
  }
  
  removeImage(image: Imagesvehicle) {
    const index = this.images.indexOf(image);
    if (index > -1) {
      this.images.splice(index, 1);
      this.messageService.add({
        severity: 'info',
        summary: 'Imagen eliminada',
        detail: 'La imagen ha sido eliminada correctamente',
        life: 3000,
      });
    }
  }

  public uploadImage() {
    if (!this.file) {
      return;
    }

    const formData = new FormData();
    formData.append('image', this.file); // 'image' debe coincidir con el FileInterceptor del backend
    this.isUploading = true;
    this.subscription = this.commonService
      .UploadedFile(formData)
      .pipe(
        map((res: any) => {
          const image = {
            itemImageSrc: res.data.cloudinary_url,
            thumbnailImageSrc: res.data.cloudinary_url,
            alt: 'Imagen del vehículo',
            title: 'Imagen del vehículo',
          }

          this.images.push(image); // Agregar la URL de la imagen al array 
          this.isUploading = false;
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
      .subscribe(observatorAny);
  }
}
