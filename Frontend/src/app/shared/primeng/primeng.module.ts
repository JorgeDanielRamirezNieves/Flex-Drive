import { CarouselModule } from 'primeng/carousel';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RatingModule } from 'primeng/rating';
import { GalleriaModule } from 'primeng/galleria';
import { ToastModule } from 'primeng/toast';
import { DrawerModule } from 'primeng/drawer';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TabsModule } from 'primeng/tabs';
import { InputOtpModule } from 'primeng/inputotp';
import { MessageService } from 'primeng/api';
import { providePrimeNG } from 'primeng/config';
import { PopoverModule } from 'primeng/popover';
import { FileUploadModule } from 'primeng/fileupload';
import { ProgressBarModule } from 'primeng/progressbar';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TooltipModule } from 'primeng/tooltip';
import { StepsModule } from 'primeng/steps';
import { DialogModule } from 'primeng/dialog';
import { ChipModule } from 'primeng/chip';
import { ContextMenuModule } from 'primeng/contextmenu';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DatePickerModule,
    SelectModule,
    AccordionModule,
    ButtonModule,
    InputTextModule,
    CarouselModule,
    RatingModule,
    GalleriaModule,
    ToastModule,
    DrawerModule,
    ProgressSpinnerModule,
    TabsModule,
    InputOtpModule,
    PopoverModule,
    FileUploadModule,
    ProgressBarModule,
    AutoCompleteModule,
    TooltipModule,
    StepsModule,
    DialogModule,
    ChipModule,
    ContextMenuModule
  ],
    providers: [
      MessageService,
      providePrimeNG({
        theme: {
          options: {
            prefix: 'p',
            darkModeSelector: false,
            cssLayer: false,
          },
        },
      }),
    ],
    exports: [
      CommonModule,
      DatePickerModule,
      SelectModule,
      AccordionModule,
      ButtonModule,
      InputTextModule,
      CarouselModule,
      RatingModule,
      GalleriaModule,
      ToastModule,
      DrawerModule,
      ProgressSpinnerModule,
      TabsModule,
      InputOtpModule,
      PopoverModule,
      FileUploadModule,
      ProgressBarModule,
      AutoCompleteModule,
      TooltipModule,
      StepsModule,
      DialogModule,
      ChipModule,
      ContextMenuModule
    ],
})
export class PrimengModule { }
