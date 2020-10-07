import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MachineListComponent} from './machine/list/machine-list.component';
import {MachineAddComponent} from './machine/add/machine-add.component';
import {MachineTypeAddComponent} from './machine-type/add/machine-type-add.component';
import {MachineTypeListComponent} from './machine-type/list/machine-type-list.component';
import {ClientListComponent} from './client/list/client-list.component';
import {ClientAddComponent} from './client/add/client-add.component';
import {SellerListComponent} from './seller/list/seller-list.component';
import {SellerAddComponent} from './seller/add/seller-add.component';
import {PriceListComponent} from './price/rental/list/price-list.component';
import {PriceAddComponent} from './price/rental/add/price-add.component';
import {PriceEditComponent} from './price/rental/edit/price-edit.component';
import {OrderAddComponent} from './order/add/order-add.component';
import {OrderListComponent} from './order/list/order-list.component';
import {OperatorAddComponent} from './operator/add/operator-add.component';
import {OperatorListComponent} from './operator/list/operator-list.component';
import {WorkDocumentListComponent} from './work-document/list/work-document-list.component';
import {WorkDocumentAddComponent} from './work-document/add/work-document-add.component';
import {WorkReportEntryAddComponent} from './work-report-entry/add/work-report-entry-add.component';
import {RoadCardEntryAddComponent} from './road-card-entry/add/road-card-entry-add.component';
import {LoginComponent} from './login/login.component';
import {UserListComponent} from './user/list/user-list.components';
import {UserAddComponent} from './user/add/user-add.component';
import {CostCodeListComponent} from './costcode/list/costcode-list.component';
import {CostCodeAddComponent} from './costcode/add/costcode-add.component';
import {EstimatePositionListComponent} from './estimate/list/estimate-position-list.component';
import {EstimatePositionAddComponent} from './estimate/add/estimate-position-add.component';
import {EstimatePositionEditComponent} from './estimate/edit/estimate-position-edit.component';
import {MaterialListComponent} from './material/list/material-list.component';
import {MaterialAddComponent} from './material/add/material-add.component';
import {HourPriceListComponent} from './price/hour/list/hour-price-list.component';
import {HourPriceAddComponent} from './price/hour/add/hour-price-add.component';
import {HourPriceEditComponent} from './price/hour/edit/hour-price-edit.component';
import {DistancePriceListComponent} from './price/distance/list/distance-price-list.component';
import {DistancePriceAddComponent} from './price/distance/add/distance-price-add.component';
import {DistancePriceEditComponent} from './price/distance/edit/distance-price-edit.component';
import {DeliveryPriceListComponent} from './price/delivery/list/delivery-price-list.component';
import {DeliveryPriceAddComponent} from './price/delivery/add/delivery-price-add.component';
import {DeliveryPriceEditComponent} from './price/delivery/edit/delivery-price-edit.component';
import {DeliveryDocumentListComponent} from './delivery-document/list/delivery-document-list.component';
import {DeliveryDocumentAddComponent} from './delivery-document/add/delivery-document-add.component';
import {DeliveryDocumentEntryAddComponent} from './delivery-document-entry/add/delivery-document-entry-add.component';

const appRoutes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: 'machines', component: MachineListComponent},
  {path: 'machine-add', component: MachineAddComponent, children: [{
    path: ':id', component: MachineAddComponent}]
  },
  {path: 'machine-type-add', component: MachineTypeAddComponent, children: [{
    path: ':id', component: MachineTypeAddComponent}]
  },
  {path: 'machine-type-list', component: MachineTypeListComponent},
  {path: 'clients', component: ClientListComponent},
  {path: 'client-add', component: ClientAddComponent, children: [{
      path: ':id', component: ClientAddComponent}]
  },
  {path: 'sellers', component: SellerListComponent},
  {path: 'seller-add', component: SellerAddComponent, children: [{
      path: ':id', component: SellerAddComponent}]
  },
  {path: 'prices', component: PriceListComponent},
  {path: 'price-add', component: PriceAddComponent},
  {path: 'price-edit/:id', component: PriceEditComponent},
  {path: 'orders', component: OrderListComponent},
  {path: 'order-add', component: OrderAddComponent, children: [{
      path: ':id', component: OrderAddComponent}]
  },
  {path: 'operators', component: OperatorListComponent},
  {path: 'operator-add', component: OperatorAddComponent, children: [{
    path: ':id', component: OperatorAddComponent}]
  },
  {path: 'work-documents', component: WorkDocumentListComponent},
  {path: 'work-document-add', component: WorkDocumentAddComponent, children: [{
      path: ':id', component: WorkDocumentAddComponent},
      // {path: ':work-report-entry-add', component: WorkReportEntryAddComponent}
    ]
  },
  {path: 'delivery-documents', component: DeliveryDocumentListComponent},
  {path: 'delivery-document-add', component: DeliveryDocumentAddComponent, children: [{
      path: ':id', component: DeliveryDocumentAddComponent},
    ]
  },
  {path: 'work-report-entry-add', component: WorkReportEntryAddComponent, children: [{
    path: ':id', component: WorkReportEntryAddComponent
    }]},
  {path: 'road-card-entry-add', component: RoadCardEntryAddComponent, children: [{
      path: ':id', component: RoadCardEntryAddComponent
    }]},
  {path: 'cost-codes', component: CostCodeListComponent},
  {path: 'cost-code-add', component: CostCodeAddComponent, children: [{
      path: ':id', component: CostCodeAddComponent}]
  },
  {path: 'estimate-positions', component: EstimatePositionListComponent},
  {path: 'estimate-position-add', component: EstimatePositionAddComponent},
  {path: 'estimate-position-edit/:id', component: EstimatePositionEditComponent},
  {path: 'materials', component: MaterialListComponent},
  {path: 'material-add', component: MaterialAddComponent, children: [{
      path: ':id', component: MaterialAddComponent}]
  },
  {path: 'hourPrices', component: HourPriceListComponent},
  {path: 'hour-price-add', component: HourPriceAddComponent},
  {path: 'hour-price-edit/:id', component: HourPriceEditComponent},
  {path: 'distancePrices', component: DistancePriceListComponent},
  {path: 'distance-price-add', component: DistancePriceAddComponent},
  {path: 'distance-price-edit/:id', component: DistancePriceEditComponent},
  {path: 'deliveryPrices', component: DeliveryPriceListComponent},
  {path: 'delivery-price-add', component: DeliveryPriceAddComponent},
  {path: 'delivery-price-edit/:id', component: DeliveryPriceEditComponent},
  {path: 'login', component: LoginComponent},
  {path: 'users', component: UserListComponent},

  {path: 'delivery-document-entry-add', component: DeliveryDocumentEntryAddComponent, children: [{
      path: ':id', component: DeliveryDocumentEntryAddComponent
    }]},
  
  {path: 'user-add', component: UserAddComponent, children: [{
      path: ':id', component: UserAddComponent}]
  },
  ];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
