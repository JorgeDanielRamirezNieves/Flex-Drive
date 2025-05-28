import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService, TooltipOptions } from 'primeng/api';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { Contract } from '../../../contracts/models/contract';
import { catchError, finalize, map, Subscription, throwError } from 'rxjs';
import { ContractsService } from '../../../contracts/services/contracts.service';
import { observatorAny } from '../../../../core/tipo-any';
import { PreferencesService } from '../../services/preferences.service';
import { Preferences, Parameters } from '../../models/preferences';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-preferences-form',
  standalone: false,
  templateUrl: './preferences-form.component.html',
  styleUrl: './preferences-form.component.css',
})
export class PreferencesFormComponent implements OnDestroy, OnInit {
  public tooltipOptions: TooltipOptions = {
    showDelay: 150,
    tooltipEvent: 'hover',
    tooltipPosition: 'bottom',
  };

  public typesClassVehicle: any[];
  public classVehicle: string[];
  public filteredClassVehicle: any[];

  public colorsVehicle: any[];
  public colorVehicle: string[];
  public filteredColorsVehicle: any[];

  public brandsVehicle: any[];
  public brandVehicle: string[];
  public filteredBrandVehicle: any[];

  public modelsVehicle: any[];
  public modelVehicle: string[];
  public filteredModelVehicle: any[];

  public fuelsTypeVehicle: any[];
  public fuelTypeVehicle: string[];
  public filteredFuelTypeVehicle: string[];

  public yearsVehicle: any[];
  public yearVehicle: string[];
  public filteredYearsVehicle: string[];

  public accessoriesVehicle: string[];
  public accessorieVehicle: string;

  public mileageVehicle: number;
  public capacityVehicle: number;
  public price: number;
  public rating: number;
  public insurance: boolean;

  public termsAndConditions: Contract;
  public subcription: Subscription;
  public tmp: any;
  public isCreatingContract: boolean;
  public preferences: Preferences;
  public complete: boolean;
  public newUser: boolean;
  public token: any;
  public uuid: string;

  public parameters: Parameters;

  constructor(
    private contractService: ContractsService,
    private messageService: MessageService,
    private preferencesService: PreferencesService
  ) {
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
      '95ad1ad7-27f3-49fa-ae81-fbcdc41393cf',
      '82e59bf4-ecda-4702-bfc6-d400ebbc839e',
      null,
      ['Flex Drive']
    );
    this.token = jwtDecode(localStorage.getItem('authToken') || '{}');
    this.uuid = this.token.uuid;
    this.termsAndConditions.accordants.push(this.uuid);
    this.subcription = this.tmp;
    this.isCreatingContract = false;
    this.complete = false;
    this.newUser = false;

    this.typesClassVehicle = [
      {
        name: 'SUV',
        value: 'SUV',
      },
      {
        name: 'Sedan',
        value: 'Sedan',
      },
      {
        name: 'Hatchback',
        value: 'Hatchback',
      },
      {
        name: 'Convertible',
        value: 'Convertible',
      },
      {
        name: 'Pickup Truck',
        value: 'Pickup Truck',
      },
      {
        name: 'Minivan',
        value: 'Minivan',
      },
      {
        name: 'Luxury',
        value: 'Luxury',
      },
    ];
    this.classVehicle = [];
    this.filteredClassVehicle = [];

    this.colorsVehicle = [
      { name: 'Red', value: 'Red' },
      { name: 'Blue', value: 'Blue' },
      { name: 'Green', value: 'Green' },
      { name: 'Black', value: 'Black' },
      { name: 'White', value: 'White' },
      { name: 'Silver', value: 'Silver' },
      { name: 'Gray', value: 'Gray' },
      { name: 'Yellow', value: 'Yellow' },
      { name: 'Orange', value: 'Orange' },
      { name: 'Purple', value: 'Purple' },
      { name: 'Brown', value: 'Brown' },
      { name: 'Pink', value: 'Pink' },
      { name: 'Gold', value: 'Gold' },
      { name: 'Beige', value: 'Beige' },
      { name: 'Turquoise', value: 'Turquoise' },
      { name: 'Maroon', value: 'Maroon' },
      { name: 'Cyan', value: 'Cyan' },
      { name: 'Magenta', value: 'Magenta' },
      { name: 'Lime', value: 'Lime' },
      { name: 'Teal', value: 'Teal' },
    ];
    this.colorVehicle = [];
    this.filteredColorsVehicle = [];

    this.brandsVehicle = [
      { name: 'Alfa Romeo', value: 'Alfa Romeo' },
      { name: 'Audi', value: 'Audi' },
      { name: 'BMW', value: 'BMW' },
      { name: 'Bugatti', value: 'Bugatti' },
      { name: 'Cadillac', value: 'Cadillac' },
      { name: 'Chevrolet', value: 'Chevrolet' },
      { name: 'Chrysler', value: 'Chrysler' },
      { name: 'Citroën', value: 'Citroën' },
      { name: 'Dodge', value: 'Dodge' },
      { name: 'Ferrari', value: 'Ferrari' },
      { name: 'Fiat', value: 'Fiat' },
      { name: 'Ford', value: 'Ford' },
      { name: 'Genesis', value: 'Genesis' },
      { name: 'Honda', value: 'Honda' },
      { name: 'Hyundai', value: 'Hyundai' },
      { name: 'Infiniti', value: 'Infiniti' },
      { name: 'Jaguar', value: 'Jaguar' },
      { name: 'Jeep', value: 'Jeep' },
      { name: 'Kia', value: 'Kia' },
      { name: 'Land Rover', value: 'Land Rover' },
      { name: 'Lamborghini', value: 'Lamborghini' },
      { name: 'Lexus', value: 'Lexus' },
      { name: 'Lincoln', value: 'Lincoln' },
      { name: 'Maserati', value: 'Maserati' },
      { name: 'Mazda', value: 'Mazda' },
      { name: 'Mercedes-Benz', value: 'Mercedes-Benz' },
      { name: 'Mini', value: 'Mini' },
      { name: 'Mitsubishi', value: 'Mitsubishi' },
      { name: 'Nissan', value: 'Nissan' },
      { name: 'Porsche', value: 'Porsche' },
      { name: 'Renault', value: 'Renault' },
      { name: 'Rolls-Royce', value: 'Rolls-Royce' },
      { name: 'Subaru', value: 'Subaru' },
      { name: 'Suzuki', value: 'Suzuki' },
      { name: 'Tesla', value: 'Tesla' },
      { name: 'Toyota', value: 'Toyota' },
      { name: 'Triumph', value: 'Triumph' },
      { name: 'Volkswagen', value: 'Volkswagen' },
      { name: 'Volvo', value: 'Volvo' },
    ];
    this.brandVehicle = [];
    this.filteredBrandVehicle = [];

    this.modelsVehicle = [
      { name: 'Giulietta', value: 'Giulietta' },
      { name: 'Stelvio', value: 'Stelvio' },
      { name: '4C', value: '4C' },
      { name: 'A4', value: 'A4' },
      { name: 'A6', value: 'A6' },
      { name: 'R8', value: 'R8' },
      { name: '3 Series', value: '3 Series' },
      { name: '5 Series', value: '5 Series' },
      { name: 'X5', value: 'X5' },
      { name: 'Veyron', value: 'Veyron' },
      { name: 'Chiron', value: 'Chiron' },
      { name: 'La Voiture Noire', value: 'La Voiture Noire' },
      { name: 'ATS', value: 'ATS' },
      { name: 'CTS', value: 'CTS' },
      { name: 'Escalade', value: 'Escalade' },
      { name: 'Camaro', value: 'Camaro' },
      { name: 'Corvette', value: 'Corvette' },
      { name: 'Colorado', value: 'Colorado' },
      { name: '300', value: '300' },
      { name: 'Pacifica', value: 'Pacifica' },
      { name: 'Town & Country', value: 'Town & Country' },
      { name: 'C3', value: 'C3' },
      { name: 'DS3', value: 'DS3' },
      { name: 'Xsara', value: 'Xsara' },
      { name: 'Charger', value: 'Charger' },
      { name: 'Challenger', value: 'Challenger' },
      { name: 'Durango', value: 'Durango' },
      { name: '488 GTB', value: '488 GTB' },
      { name: 'F8 Tributo', value: 'F8 Tributo' },
      { name: 'SF90 Stradale', value: 'SF90 Stradale' },
      { name: '500', value: '500' },
      { name: 'Panda', value: 'Panda' },
      { name: 'TwinAir', value: 'TwinAir' },
      { name: 'Focus', value: 'Focus' },
      { name: 'Mustang', value: 'Mustang' },
      { name: 'Explorer', value: 'Explorer' },
      { name: 'G70', value: 'G70' },
      { name: 'G80', value: 'G80' },
      { name: 'GV60', value: 'GV60' },
      { name: 'Civic', value: 'Civic' },
      { name: 'Accord', value: 'Accord' },
      { name: 'CR-V', value: 'CR-V' },
      { name: 'Elantra', value: 'Elantra' },
      { name: 'Sonata', value: 'Sonata' },
      { name: 'Santa Fe', value: 'Santa Fe' },
      { name: 'Q50', value: 'Q50' },
      { name: 'QX50', value: 'QX50' },
      { name: 'QX80', value: 'QX80' },
      { name: 'XE', value: 'XE' },
      { name: 'XF', value: 'XF' },
      { name: 'F-PACE', value: 'F-PACE' },
      { name: 'Wrangler', value: 'Wrangler' },
      { name: 'Grand Cherokee', value: 'Grand Cherokee' },
      { name: 'Renegade', value: 'Renegade' },
      { name: 'Optima', value: 'Optima' },
      { name: 'Sorento', value: 'Sorento' },
      { name: 'Niro', value: 'Niro' },
      { name: 'Range Rover', value: 'Range Rover' },
      { name: 'Discovery', value: 'Discovery' },
      { name: 'Defender', value: 'Defender' },
      { name: 'Huracán', value: 'Huracán' },
      { name: 'Aventador', value: 'Aventador' },
      { name: 'Urus', value: 'Urus' },
      { name: 'ES', value: 'ES' },
      { name: 'GS', value: 'GS' },
      { name: 'RX', value: 'RX' },
      { name: 'Continental', value: 'Continental' },
      { name: 'MKX', value: 'MKX' },
      { name: 'Nautilus', value: 'Nautilus' },
      { name: 'Ghibli', value: 'Ghibli' },
      { name: 'Quattroporte', value: 'Quattroporte' },
      { name: 'Levante', value: 'Levante' },
      { name: 'MX-5 Miata', value: 'MX-5 Miata' },
      { name: 'CX-5', value: 'CX-5' },
      { name: 'CX-9', value: 'CX-9' },
      { name: 'C-Class', value: 'C-Class' },
      { name: 'E-Class', value: 'E-Class' },
      { name: 'S-Class', value: 'S-Class' },
      { name: 'Cooper', value: 'Cooper' },
      { name: 'Countryman', value: 'Countryman' },
      { name: 'Gran Tourer', value: 'Gran Tourer' },
      { name: 'Lancer', value: 'Lancer' },
      { name: 'Outlander', value: 'Outlander' },
      { name: 'Pajero', value: 'Pajero' },
      { name: 'Altima', value: 'Altima' },
      { name: 'Maxima', value: 'Maxima' },
      { name: 'Leaf', value: 'Leaf' },
      { name: '911', value: '911' },
      { name: 'Macan', value: 'Macan' },
      { name: 'Cayenne', value: 'Cayenne' },
      { name: 'Clio', value: 'Clio' },
      { name: 'Laguna', value: 'Laguna' },
      { name: 'Zoe', value: 'Zoe' },
      { name: 'Phantom', value: 'Phantom' },
      { name: 'Ghost', value: 'Ghost' },
      { name: 'Wraith', value: 'Wraith' },
      { name: 'Forester', value: 'Forester' },
      { name: 'Impreza', value: 'Impreza' },
      { name: 'Legacy', value: 'Legacy' },
      { name: 'Swift', value: 'Swift' },
      { name: 'Baleno', value: 'Baleno' },
      { name: 'Jimny', value: 'Jimny' },
      { name: 'Model S', value: 'Model S' },
      { name: 'Model 3', value: 'Model 3' },
      { name: 'Model X', value: 'Model X' },
      { name: 'Corolla', value: 'Corolla' },
      { name: 'Camry', value: 'Camry' },
      { name: 'RAV4', value: 'RAV4' },
      { name: 'Rocket 3', value: 'Rocket 3' },
      { name: 'Street Twin', value: 'Street Twin' },
      { name: 'Bonneville', value: 'Bonneville' },
      { name: 'Golf', value: 'Golf' },
      { name: 'Jetta', value: 'Jetta' },
      { name: 'Passat', value: 'Passat' },
      { name: 'S60', value: 'S60' },
      { name: 'XC90', value: 'XC90' },
      { name: 'S80', value: 'S80' },
    ];
    this.modelVehicle = [];
    this.filteredModelVehicle = [];

    this.fuelsTypeVehicle = [
      { name: 'Petrol', value: 'Petrol' },
      { name: 'Diesel', value: 'Diesel' },
      { name: 'Electric', value: 'Electric' },
      { name: 'Hybrid', value: 'Hybrid' },
      { name: 'Hydrogen', value: 'Hydrogen' },
    ];
    this.fuelTypeVehicle = [];
    this.filteredFuelTypeVehicle = [];
    this.yearsVehicle = [];
    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i >= 1980; i--) {
      this.yearsVehicle.push({ name: i.toString(), value: i.toString() });
    }
    this.yearVehicle = [];
    this.filteredYearsVehicle = [];

    this.accessoriesVehicle = [];
    this.accessorieVehicle = '';

    this.mileageVehicle = 0;
    this.capacityVehicle = 0;
    this.price = 0;
    this.rating = 0;
    this.insurance = false;

    this.parameters = {
      class: [],
      color: [],
      mileage: [0, 100000], // PROPOSAL: mileage: { min: number; max: number };
      capacity: [1, 7], // PROPOSAL: capacity: { min: number; max: number };
      brand: [],
      model: [],
      accessories: [], // checkbox per each accessory
      fuelType: [],
      price: [0, 100000], // PROPOSAL: price: { min: number; max: number };
      rating: [0, 5], // PROPOSAL: rating: { min: number; max: number };
      year: [],
      insurance: false, // PROPOSAL: (yes, no);
    };
    this.preferences = new Preferences(
      this.uuid,
      {
        notifications: true,
        theme: true,
        mails: true,
        language: true,
        deleteChats: true,
      },
      this.parameters
    );
    this.complete = false;
  }

  ngOnDestroy(): void {
    if (this.subcription) {
      this.subcription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.getPreferences();
    if (this.newUser) {
      this.createContract();
    }
  }

  public filterClass(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < this.typesClassVehicle.length; i++) {
      let classVehicle = this.typesClassVehicle[i];
      if (classVehicle.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(classVehicle);
      }
    }

    this.filteredClassVehicle = filtered;
  }

  public filterColor(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < this.colorsVehicle.length; i++) {
      let color = this.colorsVehicle[i];
      if (color.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(color);
      }
    }

    this.filteredColorsVehicle = filtered;
  }

  public filterBrand(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < this.brandsVehicle.length; i++) {
      let brand = this.brandsVehicle[i];
      if (brand.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(brand);
      }
    }

    this.filteredBrandVehicle = filtered;
  }

  public filterModel(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < this.modelsVehicle.length; i++) {
      let model = this.modelsVehicle[i];
      if (model.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(model);
      }
    }

    this.filteredModelVehicle = filtered;
  }

  public filterFuelType(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < this.fuelsTypeVehicle.length; i++) {
      let fuelType = this.fuelsTypeVehicle[i];
      if (fuelType.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(fuelType);
      }
    }

    this.filteredFuelTypeVehicle = filtered;
  }

  public filterYear(event: AutoCompleteCompleteEvent) {
    let filtered: string[] = [];
    let query = event.query;

    for (let i = 0; i < this.yearsVehicle.length; i++) {
      let year = this.yearsVehicle[i];
      if (year.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(year);
      }
    }

    this.filteredYearsVehicle = filtered;
  }

  public addAccessory() {
    if (
      this.accessorieVehicle &&
      !this.accessoriesVehicle.includes(this.accessorieVehicle)
    ) {
      this.accessoriesVehicle.push(this.accessorieVehicle);
      this.accessorieVehicle = '';
    }
  }

  public removeAccessory(accessory: string) {
    const index = this.accessoriesVehicle.indexOf(accessory);
    if (index > -1) {
      this.accessoriesVehicle.splice(index, 1);
    }
  }

  public createContract() {
    this.isCreatingContract = true; // Indica que se está creando un contrato
    this.subcription = this.contractService
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

  private getPreferences() {
    this.subcription = this.preferencesService
      .getPreferencesUser(this.uuid)
      .pipe(
        map((res: any) => {
          if (res === null) {
            this.newUser = true;
          } else {
            this.preferences = res;
          }
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

  public savePreferences() {
    this.preferences.parameters = {
      class: this.classVehicle,
      color: this.colorVehicle,
      mileage: [this.mileageVehicle],
      accessories: this.accessoriesVehicle,
      capacity: [this.capacityVehicle],
      year: this.yearVehicle,
      rating: [this.rating],
      insurance: this.insurance,
      price: [this.price],
      brand: this.brandVehicle,
      model: this.modelVehicle,
      fuelType: this.fuelTypeVehicle,
    };
    if (this.newUser) {
      console.log('Preferences: ', this.preferences);
      this.subcription = this.preferencesService
        .createPreferencesUser(this.preferences)
        .pipe(
          map((res: any) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'Preferencias guardadas correctamente',
              life: 3000,
            });
            this.createContract();
          }),
          catchError((err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No se pudieron guardar las preferencias',
              life: 5000,
            });
            return throwError(() => err);
          }),
          finalize(() => {
            this.complete = true;
          })
        )
        .subscribe(observatorAny);
    } else {
      this.subcription = this.preferencesService
        .updatePreferencesUser(this.preferences.uuid || '', this.preferences)
        .pipe(
          map((res: any) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'Preferencias actualizadas correctamente',
              life: 3000,
            });
          }),
          catchError((err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No se pudieron actualizar las preferencias',
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
  }
}
