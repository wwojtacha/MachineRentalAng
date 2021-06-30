import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MachineListComponent} from './machine/list/machine-list.component';
import {MachineRepositoryService} from './machine/repository-service/machine-repository.service';
import {NavigationComponent} from './navigation/navigation.component';
import {AppRoutingModule} from './app-routing.module';
import {MachineAddComponent} from './machine/add/machine-add.component';
import {MachineTypeRepositoryService} from './machine-type/repository-service/machine-type-repository.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MachineTypeAddComponent} from './machine-type/add/machine-type-add.component';
import {MachineTypeListComponent} from './machine-type/list/machine-type-list.component';
import {MachineTypeListPipe} from './machine-type/list/machine-type-list.pipe';
import {ClientListComponent} from './client/list/client-list.component';
import {ClientRepositoryService} from './client/repository-service/client-repository.service';
import {ClientAddComponent} from './client/add/client-add.component';
import {SellerRepositoryService} from './seller/repository-service/seller-repository.service';
import {SellerListComponent} from './seller/list/seller-list.component';
import {SellerAddComponent} from './seller/add/seller-add.component';
import {PriceAddComponent} from './price/rental/add/price-add.component';
import {PriceRepositoryService} from './price/rental/repository-service/price-repository.service';
import {PriceListComponent} from './price/rental/list/price-list.component';
import {PriceEditComponent} from './price/rental/edit/price-edit.component';
import {OrderAddComponent} from './order/add/order-add.component';
import {OrderListComponent} from './order/list/order-list.component';
import {OrderRepositoryService} from './order/repository-service/order-repository.service';
import {PriceService} from './price/rental/repository-service/price.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule, MatDialogModule, MatSelectModule} from '@angular/material';
import {ConfirmationDialogComponent} from './confirmation-dialog/confirmation-dialog.component';
import {ErrorDialogComponent} from './error-dialog/error-dialog.component';
import {OperatorAddComponent} from './operator/add/operator-add.component';
import {OperatorRepositoryService} from './operator/repository-service/operator-repository.service';
import {OperatorListComponent} from './operator/list/operator-list.component';
import {WorkDocumentListComponent} from './work-document/list/work-document-list.component';
import {WorkDocumentAddComponent} from './work-document/add/work-document-add.component';
import {WorkDocumentRepositoryService} from './work-document/repository-service/work-document-repository.service';
import {WorkReportEntryAddComponent} from './work-report-entry/add/work-report-entry-add.component';
import {WorkReportEntryRepositoryService} from './work-report-entry/repository-service/work-report-entry-repository.service';
import {WorkReportEntryService} from './work-report-entry/service/work-report-entry.service';
import {ShowAddWorkEntryButtonDirective} from './work-document/directives/show-add-work-entry-button.directive';
import {ShowSubmitButtonDirective} from './work-document/directives/show-submit-button.directive';
import {ShowCurrentInputDirective} from './work-document/directives/show-current-input.directive';
import {WorkReportEntryListComponent} from './work-report-entry/list/work-report-entry-list.component';
import {RoadCardEntryRepositoryService} from './road-card-entry/repository-service/road-card-entry-repository.service';
import {RoadCardEntryService} from './road-card-entry/service/road-card-entry.service';
import {RoadCardEntryAddComponent} from './road-card-entry/add/road-card-entry-add.component';
import {RoadCardEntryListComponent} from './road-card-entry/list/road-card-entry-list.component';
import {LoginComponent} from './login/login.component';
import {AuthenticationService} from './login/service/auth.service';
import {AuthInterceptorService} from './login/service/interceptor.service';
import {UserAddComponent} from './user/add/user-add.component';
import {UserListComponent} from './user/list/user-list.components';
import {UserRepositoryService} from './user/repository-service/user-repository.service';
import {CostCodeAddComponent} from './costcode/add/costcode-add.component';
import {CostCodeRepositoryService} from './costcode/repository-service/cost-code-repository.service';
import {CostCodeListComponent} from './costcode/list/costcode-list.component';
import {EstimatePositionListComponent} from './estimate/list/estimate-position-list.component';
import {EstimatePositionRepositoryService} from './estimate/repository-service/estimate-position-repository.service';
import {EstimatePositionAddComponent} from './estimate/add/estimate-position-add.component';
import {EstimatePositionEditComponent} from './estimate/edit/estimate-position-edit.component';
import {MaterialListComponent} from './material/list/material-list.component';
import {MaterialRepositoryService} from './material/repository-service/material-repository.service';
import {MaterialAddComponent} from './material/add/material-add.component';
import {HourPriceAddComponent} from './price/hour/add/hour-price-add.component';
import {HourPriceRepositoryService} from './price/hour/repository-service/hour-price-repository.service';
import {HourPriceListComponent} from './price/hour/list/hour-price-list.component';
import {HourPriceEditComponent} from './price/hour/edit/hour-price-edit.component';
import {DistancePriceRepositoryService} from './price/distance/repository-service/distance-price-repository.service';
import {DistancePriceListComponent} from './price/distance/list/distance-price-list.component';
import {DistancePriceAddComponent} from './price/distance/add/distance-price-add.component';
import {DistancePriceEditComponent} from './price/distance/edit/distance-price-edit.component';
import {DeliveryDocumentListComponent} from './delivery-document/list/delivery-document-list.component';
import {DeliveryDocumentRepositoryService} from './delivery-document/repository-service/delivery-document-repository.service';
import {DeliveryPriceListComponent} from './price/delivery/list/delivery-price-list.component';
import {DeliveryPriceAddComponent} from './price/delivery/add/delivery-price-add.component';
import {DeliveryPriceRepositoryService} from './price/delivery/repository-service/delivery-price-repository.service';
import {DeliveryPriceEditComponent} from './price/delivery/edit/delivery-price-edit.component';
import {DropdownDirective} from './utils/dropdown.directive';
import {DeliveryDocumentAddComponent} from './delivery-document/add/delivery-document-add.component';
import {DeliveryDocumentEntryAddComponent} from './delivery-document-entry/add/delivery-document-entry-add.component';
import {DeliveryDocumentEntryService} from './delivery-document-entry/service/delivery-document-entry.service';
import {DeliveryDocumentEntryRepositoryService} from './delivery-document-entry/repository-service/delivery-document-entry-repository.service';
import {DeliveryDocumentEntryListComponent} from './delivery-document-entry/list/delivery-document-entry-list.component';
import {SaveEntriesButtonDirective} from './work-document/directives/show-save-entries-button.directive';
import {ShowEntriesDirective} from './work-document/directives/show-entries.directive';
import {ShowAddDeliveyEntryButtonDirective} from './work-document/directives/show-add-delivey-entry-button.directive';
import {ReportComponent} from './reports/report.component';
import {ReportService} from './reports/report.service';
import {DailyReportListComponent} from './daily-report/list/daily-report-list.component';
import {DailyReportRepositoryService} from './daily-report/repository-service/daily-report-repository.service';
import {DailyReportAddComponent} from './daily-report/add/daily-report-add.component';
import {CostReportComponent} from './reports/cost/cost-report.component';
import {CostReportRepositoryService} from './reports/cost/repository-service/cost-report-repository.service';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {EquipmentDetailsDialogComponent} from './reports/cost/equipment/details-dialog/equipment-details-dialog.component';
import {TransportDetailsDialogComponent} from './reports/cost/transport/details-dialog/transport-details-dialog.component';
import {DeliveryDetailsDialogComponent} from './reports/cost/delivery/delivery-dialog/delivery-details-dialog.component';
import {WorkDocumentService} from './work-document/service/work-document.service';
import {StartEndHourDialogComponent} from './work-document/hours-dialog/start-end-hour-dialog.component';
import {HomeComponent} from './home/home.component';
import {TranslationService} from './translation/translation.service';
import {TranslationPipe} from './translation/translation.pipe';
import { ServiceWorkerModule } from 'node_modules/@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    DropdownDirective,
    MachineListComponent,
    NavigationComponent,
    MachineAddComponent,
    MachineTypeAddComponent,
    MachineTypeListComponent,
    MachineTypeListPipe,
    ClientListComponent,
    ClientAddComponent,
    SellerListComponent,
    SellerAddComponent,
    PriceListComponent,
    PriceAddComponent,
    PriceEditComponent,
    OrderListComponent,
    OrderAddComponent,
    ConfirmationDialogComponent,
    ErrorDialogComponent,
    OperatorAddComponent,
    OperatorListComponent,
    WorkDocumentListComponent,
    WorkDocumentAddComponent,
    WorkReportEntryAddComponent,
    ShowAddWorkEntryButtonDirective,
    ShowAddDeliveyEntryButtonDirective,
    SaveEntriesButtonDirective,
    ShowSubmitButtonDirective,
    ShowCurrentInputDirective,
    ShowEntriesDirective,
    WorkReportEntryListComponent,
    RoadCardEntryAddComponent,
    RoadCardEntryListComponent,
    LoginComponent,
    UserAddComponent,
    UserListComponent,
    CostCodeAddComponent,
    CostCodeListComponent,
    EstimatePositionListComponent,
    EstimatePositionAddComponent,
    EstimatePositionEditComponent,
    MaterialListComponent,
    MaterialAddComponent,
    HourPriceAddComponent,
    HourPriceListComponent,
    HourPriceEditComponent,
    DistancePriceListComponent,
    DistancePriceAddComponent,
    DistancePriceEditComponent,
    DeliveryDocumentListComponent,
    DeliveryDocumentAddComponent,
    DeliveryPriceListComponent,
    DeliveryPriceAddComponent,
    DeliveryPriceEditComponent,
    DeliveryDocumentEntryAddComponent,
    DeliveryDocumentEntryListComponent,
    ReportComponent,
    DailyReportListComponent,
    DailyReportAddComponent,
    CostReportComponent,
    EquipmentDetailsDialogComponent,
    TransportDetailsDialogComponent,
    DeliveryDetailsDialogComponent,
    StartEndHourDialogComponent,
    HomeComponent,
    TranslationPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    DragDropModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  entryComponents: [
    ConfirmationDialogComponent,
    ErrorDialogComponent,
    EquipmentDetailsDialogComponent,
    TransportDetailsDialogComponent,
    DeliveryDetailsDialogComponent,
    StartEndHourDialogComponent
  ],
  providers: [MachineRepositoryService, MachineTypeRepositoryService, ClientRepositoryService, SellerRepositoryService,
    PriceRepositoryService, OrderRepositoryService, PriceService, OperatorRepositoryService, WorkDocumentRepositoryService,
    WorkReportEntryRepositoryService, WorkReportEntryService, RoadCardEntryRepositoryService, RoadCardEntryService,
    AuthenticationService, UserRepositoryService, CostCodeRepositoryService, EstimatePositionRepositoryService,
    MaterialRepositoryService, HourPriceRepositoryService, DistancePriceRepositoryService, DeliveryDocumentRepositoryService,
    DeliveryPriceRepositoryService, DeliveryDocumentEntryService, DeliveryDocumentEntryRepositoryService,
    ReportService, DailyReportRepositoryService, CostReportRepositoryService, WorkDocumentService, TranslationService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
