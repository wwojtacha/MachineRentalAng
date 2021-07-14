import {Injectable} from '@angular/core';

export class TranslationSet {
  public language: string;
  public values: { [key: string]: string } = {};
}
@Injectable()
export class TranslationService {
  public languages = ['PL', 'EN'];

  public currentLanguage = 'PL';

  public counter = 0;

  private dictionary: { [key: string]: TranslationSet } = {
    PL: {
      language: 'PL',
      values: {
        menu: 'Menu',
        login: 'Zaloguj',
        logout: 'Wyloguj',
        loggedAs: 'Zalogowano jako: ',
        pleaseLogin: 'Proszę się zalogować.',
        machines: 'Maszyny',
        machineTypes: 'Typy maszyn',
        contractors: 'Kontrahenci',
        operators: 'Operatorzy',
        materials: 'Materiały',
        estimatePositions: 'Pozycje kosztorysowe',
        costCodes: 'Kody kosztowe',
        hourPrices: 'Cenniki godzinowe',
        distancePrices: 'Cenniki transportu',
        deliveryPrices: 'Cenniki dostaw',
        workDocuments: 'Dokumenty pracy',
        deliveryDocuments: 'Dokumenty dostaw',
        dailyReports: 'Raporty dzienne',
        excelReports: 'Raporty Excel',
        costReports: 'Raporty kosztowe',
        users: 'Użytkownicy',
        addNewMachine: 'Dodaj maszynę',
        search: 'Szukaj',
        machineId: 'ID maszyny',
        name: 'Nazwa',
        model: 'Model',
        type: 'Typ',
        producer: 'Producent',
        owner: 'Właściciel',
        productionYear: 'Rocznik',
        status: 'Status',
        edit: 'Edytuj',
        delete: 'Usuń',
        currentMachineType: 'Obecny typ maszyny',
        changeMachineType: 'Zmień typ maszyny',
        currentOwner: 'Obecny właściciel',
        changeOwner: 'Zmień właściciela',
        quantity: 'Ilość',
        update: 'Aktualizuj',
        create: 'Stwórz',
        addNewMachineType: 'Dodaj typ maszyny',
        machineType: 'Typ maszyny',
        costCategory: 'Kategoria kosztowa',
        EQUIPMENT: 'Sprzęt',
        TRANSPORT: 'Transport',
        addNewContractor: 'Dodaj kontrahenta',
        contractorMpk: 'MPK/NIP kontrahenta',
        city: 'Miasto',
        street: 'Ulica',
        buildingNumber: 'Nr budynku',
        postalCode: 'Kod pocztowy',
        email: 'Email',
        contactPerson: 'Osoba kontaktowa',
        phoneNumber:'Numer telefonu',
        addNewOperator: 'Dodaj operatora',
        nameAndSurname: 'Imię i nazwisko',
        qualifications: 'Kwalifikacje',
        company: 'Firma',
        currentCompany: 'Obecna firma',
        changeCompany: 'Zmień firmę',
        addNewMaterial: 'Dodaj materiał',
        materialType: 'Rodzaj materiału',
        addEstimatePositions: 'Dodaj pozycje kosztorysowe',
        projectCode: 'Kod projektu',
        costType: 'Rodzaj kosztu',
        remarks: 'Uwagi',
        measureUnit: 'Jednostka miary',
        sellPrice: 'Cena sprzedaży',
        sellValue: 'Wartość sprzedaży',
        costPrice: 'Koszt jednostkowy',
        costValue: 'Wartość kosztu',
        fileToUpload: 'Plik do załadowania',
        upload: 'Załaduj',
        addCostCode: 'Dodaj kod kosztowy',
        fullCode: 'Kod kosztowy',
        projectCodeDescription: 'Opis kodu projektu',
        costTypeDescription: 'Opis rodzaju kosztu',
        addHourPrices: 'Dodaj cenniki godzinowe',
        workCode: 'Kod pracy',
        priceType: 'Rodzaj ceny',
        machine: 'Maszyna',
        machineWithOperator: 'Maszyna + Operator',
        machineWithFuel: 'Maszyna + Paliwo',
        machineWithOperatorAndFuel: 'Maszyna + Operator + Paliwo',
        other: 'Inne',
        price: 'Cena',
        startDate: 'Data początkowa',
        endDate: 'Data końcowa',
        modificationDate: 'Data modyfikacji',
        hide: 'Ukryj',
        addNewPrice: 'Dodaj cenę',
        checkAndSavePrices: 'Sprawdź i zapisz cenniki'

      },
    },
    EN: {
      language: 'EN',
      values: {
        menu: 'Home',
        login: 'Login',
        logout: 'Logout',
        loggedAs: 'Logged as: ',
        pleaseLogin: 'Please log in.',
        machines: 'Machines',
        machineTypes: 'Machine types',
        contractors: 'Contractors',
        operators: 'Operators',
        materials: 'Materials',
        estimatePositions: 'Estimate positions',
        costCodes: 'Cost codes',
        hourPrices: 'Hour prices',
        distancePrices: 'Distance prices',
        deliveryPrices: 'Delivery prices',
        workDocuments: 'Work documents',
        deliveryDocuments: 'Delivery documents',
        dailyReports: 'Daily reports',
        excelReports: 'Excel reports',
        costReports: 'Cost reports',
        users: 'Users',
        addNewMachine: 'Add new machine',
        search: 'Search',
        machineId: 'Machine ID',
        name: 'Name',
        model: 'Model',
        type: 'Type',
        producer: 'Producer',
        owner: 'Owner',
        productionYear: 'Year',
        status: 'Status',
        edit: 'Edit',
        delete: 'Delete',
        currentMachineType: 'Current machine type',
        changeMachineType: 'Change machine type',
        currentOwner: 'Current owner',
        changeOwner: 'Change owner',
        quantity: 'Quantity',
        update: 'Update',
        create: 'Create',
        addNewMachineType: 'Add new machine type',
        machineType: 'Machine type',
        costCategory: 'Cost category',
        EQUIPMENT: 'Equipment',
        TRANSPORT: 'Transport',
        addNewContractor: 'Add new contractor',
        contractorMpk: 'Contractor MPK/NIP',
        city: 'City',
        street: 'Street',
        buildingNumber: 'Building number',
        postalCode: 'Postal code',
        email: 'Email',
        contactPerson: 'Contact person',
        phoneNumber:'Phone number',
        addNewOperator: 'Add new operator',
        nameAndSurname: 'Name',
        qualifications: 'Qualifications',
        company: 'Company',
        currentCompany: 'Current company',
        changeCompany: 'Change company',
        addNewMaterial: 'Add new material',
        materialType: 'Material type',
        addEstimatePositions: 'Add estimate positions',
        projectCode: 'Project code',
        costType: 'Cost type',
        remarks: 'Remarks',
        measureUnit: 'Measure unit',
        sellPrice: 'Sell price',
        sellValue: 'Sell value',
        costPrice: 'Cost price',
        costValue: 'Cost value',
        fileToUpload: 'File to upload',
        upload: 'Upload',
        addCostCode: 'Add cost code',
        fullCode: 'Full code',
        projectCodeDescription: 'Project code description',
        costTypeDescription: 'Cost type description',
        addHourPrices: 'Add hour prices',
        workCode: 'Work code',
        priceType: 'Price type',
        machine: 'Machine',
        machineWithOperator: 'Machine + Operator',
        machineWithFuel: 'Machine + Fuel',
        machineWithOperatorAndFuel: 'Machine + Operator + Fuel',
        other: 'Other',
        price: 'Price',
        startDate: 'Start date',
        endDate: 'End date',
        modificationDate: 'Modification date',
        hide: 'Hide',
        addNewPrice: 'Add new price',
        checkAndSavePrices: 'Check and save prices'

      },
    },
  };

  constructor() {}

  translate(key: string): string {
    if (this.dictionary[this.currentLanguage] != null) {
      return this.dictionary[this.currentLanguage].values[key];
    }
  }

  updateCounter() {
    this.counter++;
  }
}
