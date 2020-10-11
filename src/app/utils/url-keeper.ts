import {environment} from '../../environments/environment';

export class UrlKeeper {
  static MAIN_BACKEND_URL = environment.apiUrl;
  static SEPARATOR = '/';
  static MACHINES = UrlKeeper.MAIN_BACKEND_URL + UrlKeeper.SEPARATOR + 'machines' + UrlKeeper.SEPARATOR;
  static MACHINE_TYPES = UrlKeeper.MAIN_BACKEND_URL + UrlKeeper.SEPARATOR + 'machineTypes' + UrlKeeper.SEPARATOR;
  static CLIENTS = UrlKeeper.MAIN_BACKEND_URL + UrlKeeper.SEPARATOR + 'clients' + UrlKeeper.SEPARATOR;
  static SELLERS = UrlKeeper.MAIN_BACKEND_URL + UrlKeeper.SEPARATOR + 'sellers' + UrlKeeper.SEPARATOR;
  static PRICES = UrlKeeper.MAIN_BACKEND_URL + UrlKeeper.SEPARATOR + 'prices' + UrlKeeper.SEPARATOR;
  static ORDERS = UrlKeeper.MAIN_BACKEND_URL + UrlKeeper.SEPARATOR + 'orders' + UrlKeeper.SEPARATOR;
  static OPERATORS = UrlKeeper.MAIN_BACKEND_URL + UrlKeeper.SEPARATOR + 'operators' + UrlKeeper.SEPARATOR;
  static WORK_DOCUMENTS = UrlKeeper.MAIN_BACKEND_URL + UrlKeeper.SEPARATOR + 'workDocuments' + UrlKeeper.SEPARATOR;
  static WORK_REPORT_ENTRIES = UrlKeeper.MAIN_BACKEND_URL + UrlKeeper.SEPARATOR + 'workReportEntries' + UrlKeeper.SEPARATOR;
  static ROAD_CARD_ENTRIES = UrlKeeper.MAIN_BACKEND_URL + UrlKeeper.SEPARATOR + 'roadCardEntries' + UrlKeeper.SEPARATOR;
  static USERS = UrlKeeper.MAIN_BACKEND_URL + UrlKeeper.SEPARATOR + 'users' + UrlKeeper.SEPARATOR;
  static AUTHENTICATE = UrlKeeper.MAIN_BACKEND_URL + UrlKeeper.SEPARATOR + 'authenticate';
  static CODES = UrlKeeper.MAIN_BACKEND_URL + UrlKeeper.SEPARATOR + 'codes' + UrlKeeper.SEPARATOR;
  static ESTIMATES = UrlKeeper.MAIN_BACKEND_URL + UrlKeeper.SEPARATOR + 'estimatePositions' + UrlKeeper.SEPARATOR;
  static MATERIALS = UrlKeeper.MAIN_BACKEND_URL + UrlKeeper.SEPARATOR + 'materials' + UrlKeeper.SEPARATOR;
  static HOUR_PRICES = UrlKeeper.MAIN_BACKEND_URL + UrlKeeper.SEPARATOR + 'hourPrices' + UrlKeeper.SEPARATOR;
  static DISTANCE_PRICES = UrlKeeper.MAIN_BACKEND_URL + UrlKeeper.SEPARATOR + 'distancePrices' + UrlKeeper.SEPARATOR;
  static DELIVERY_PRICES = UrlKeeper.MAIN_BACKEND_URL + UrlKeeper.SEPARATOR + 'deliveryPrices' + UrlKeeper.SEPARATOR;
  static DELIVERY_DOCUMENTS = UrlKeeper.MAIN_BACKEND_URL + UrlKeeper.SEPARATOR + 'deliveryDocuments' + UrlKeeper.SEPARATOR;
  static DELIVERY_DOCUMENT_ENTRIES = UrlKeeper.MAIN_BACKEND_URL + UrlKeeper.SEPARATOR + 'deliveryDocumentEntries' + UrlKeeper.SEPARATOR;
  static REPORTS = UrlKeeper.MAIN_BACKEND_URL + UrlKeeper.SEPARATOR + 'reports/workReportEntriesReport' + UrlKeeper.SEPARATOR;
}
