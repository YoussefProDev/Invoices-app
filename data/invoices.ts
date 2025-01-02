export const invoiceTypeOptions = [
  "FATTURA",
  "ACCONTO_FATTURA",
  "ACCONTO_PARCELLA",
  "NOTA_CREDITO",
  "NOTA_DEBITO",
  "PARCELLA",
  "INTEGRAZIONE_FATTURA_REVERSE_CHARGE_INTERNO",
  "INTEGRAZIONE_AUTOFATTURA_SERVIZI_ESTERO",
  "INTEGRAZIONE_BENI_INTRACOMUNITARI",
  "INTEGRAZIONE_BENI_EX_ART_17",
  "AUTOFATTURA_REGOLARIZZAZIONE",
  "AUTOFATTURA_SPLAFONAMENTO",
  "ESTRAZIONE_BENI_DEPOSITO_IVA",
  "FATTURA_DIFFERITA_A",
  "FATTURA_DIFFERITA_B",
  "CESSIONE_BENI_AMMORTIZZABILI",
  "AUTOCONSUMO_CESSIONI_GRATUITE",
  "ACQUISTI_SAN_MARINO",
] as const;

export const regimeFiscaleOptions = [
  "ORDINARIO",
  "FORFETTARIO",
  "MINIMI",
  "IVA_PER_CASSA",
  "EDITORIA",
  "IVA_PER_CASSA_PA",
  "AGRICOLTURA",
  "AGENZIE_VIAGGI",
  "VENDITA_SALI_TABACCHI",
  "BENI_USATI",
  "INTRATTENIMENTI",
  "AGRITURISMO",
  "VENDITE_DOMICILIO",
  "COMMERCIO_FIAMMIFERI",
  "GESTIONE_SERVIZI_TELEFONIA",
  "RIVENDITA_DOCUMENTI",
  "AGENZIE_VENDITE_ASTA",
  "ALTRO",
] as const;

export const statusOptions = ["PAID", "PENDING"] as const;
// Dichiarazione di ivaOptions con valori letterali costanti
export const ivaOptions = [
  { label: "22%", value: 22 },
  { label: "21%", value: 21 },
  { label: "20%", value: 20 },
  { label: "10%", value: 10 },
  { label: "5%", value: 5 },
  { label: "4%", value: 4 },
  { label: "0%", value: 0 },
  { label: "2% - Perc. compensazione agricoltura", value: 2 },
  { label: "6,4% - Perc. compensazione agricoltura", value: 6.4 },
  { label: "7% - Perc. compensazione agricoltura", value: 7 },
  { label: "7,3% - Perc. compensazione agricoltura", value: 7.3 },
  { label: "7,5% - Perc. compensazione agricoltura", value: 7.5 },
  { label: "7,65% - Perc. compensazione agricoltura", value: 7.65 },
  { label: "7,95% - Perc. compensazione agricoltura", value: 7.95 },
  { label: "8,3% - Perc. compensazione agricoltura", value: 8.3 },
  { label: "8,5% - Perc. compensazione agricoltura", value: 8.5 },
  { label: "8,8% - Perc. compensazione agricoltura", value: 8.8 },
  { label: "9,5% - Perc. compensazione agricoltura", value: 9.5 },
  { label: "12,3% - Perc. compensazione agricoltura", value: 12.3 },
] as const;

export const ivaLabels = [
  "22%",
  "21%",
  "20%",
  "10%",
  "5%",
  "4%",
  "0%",
  "2% - Perc. compensazione agricoltura",
  "6,4% - Perc. compensazione agricoltura",
  "7% - Perc. compensazione agricoltura",
  "7,3% - Perc. compensazione agricoltura",
  "7,5% - Perc. compensazione agricoltura",
  "7,65% - Perc. compensazione agricoltura",
  "7,95% - Perc. compensazione agricoltura",
  "8,3% - Perc. compensazione agricoltura",
  "8,5% - Perc. compensazione agricoltura",
  "8,8% - Perc. compensazione agricoltura",
  "9,5% - Perc. compensazione agricoltura",
  "12,3% - Perc. compensazione agricoltura",
] as const;

// Estrarre i valori direttamente da ivaOptions
export const ivaValues = ivaOptions.map((option) => option.value);

export const natureOptions = [
  "Escluse ex art. 15",
  "Non soggette ad IVA ai sensi degli artt. da 7 a 7-septies del DPR 633/72",
  "Non soggette - altri casi",
  "Non imponibili - esportazioni",
  "Non imponibili - cessioni intracomunitarie",
  "Non imponibili - cessioni verso San Marino",
  "Non imponibili - operazioni assimilate alle cessioni all'esportazione",
  "Non imponibili - a seguito di dichiarazioni d'intento",
  "Non imponibili - altre operazioni che non concorrono alla formazione del plafond",
  "Esenti",
  "Regime del margine / IVA non esposta in fattura",
  "Inversione contabile - cessione di rottami e altri materiali di recupero",
  "Inversione contabile - cessione di oro e argento ai sensi della legge 7/2000 nonché di oreficeria usata ad OPO",
  "Inversione contabile - subappalto nel settore edile",
  "Inversione contabile - cessione di fabbricati",
  "Inversione contabile - cessione di telefoni cellulari",
  "Inversione contabile - cessione di prodotti elettronici",
  "Inversione contabile - prestazioni comparto edile e settori connessi",
  "Inversione contabile - operazioni settore energetico",
  "Inversione contabile - altri casi",
  "IVA assolta in altro stato UE (vendite a distanza ex art. 40 commi 3 e 4 e art. 41 comma 1 lett. b, DL 331/93as const; prestazione di servizi di",
] as const;

export const currencyOptions = [
  "EUR",
  "USD",
  "GBP",
  "JPY",
  "CNY",
  "CHF",
  "CAD",
  "AUD",
  "HKD",
  "NZD",
  "SEK",
  "KRW",
  "SGD",
  "NOK",
  "MXN",
  "INR",
  "RUB",
  "ZAR",
  "BRL",
  "TRY",
  "TWD",
  "DKK",
  "PLN",
  "THB",
  "IDR",
  "HUF",
  "CZK",
  "ILS",
  "CLP",
  "PHP",
  "AED",
  "COP",
  "SAR",
  "MYR",
  "RON",
  "ARS",
  "VND",
  "IQD",
  "QAR",
  "KWD",
  "PKR",
  "EGP",
  "BDT",
  "OMR",
  "KZT",
  "KGS",
  "UZS",
  "TJS",
  "AZN",
  "GEL",
  "AMD",
  "BYN",
  "MDL",
  "TMT",
  "UAH",
  "MNT",
  "AFN",
  "IRR",
  "SYP",
  "YER",
  "SOS",
  "SLL",
  "LRD",
  "GMD",
  "GNF",
] as const;

// Mappa dei locali per le valute
const currencyLocaleMap: Record<string, string> = {
  EUR: "it-IT", // Euro (Italia)
  USD: "en-US", // Dollaro (Stati Uniti)
  GBP: "en-GB", // Sterlina (Regno Unito)
  JPY: "ja-JP", // Yen (Giappone)
  CNY: "zh-CN", // Yuan (Cina)
  CHF: "de-CH", // Franco svizzero (Svizzera)
  CAD: "en-CA", // Dollaro canadese (Canada)
  AUD: "en-AU", // Dollaro australiano (Australia)
  HKD: "zh-HK", // Dollaro di Hong Kong (Hong Kong)
  NZD: "en-NZ", // Dollaro neozelandese (Nuova Zelanda)
  SEK: "sv-SE", // Corona svedese (Svezia)
  KRW: "ko-KR", // Won sudcoreano (Corea del Sud)
  SGD: "en-SG", // Dollaro di Singapore (Singapore)
  NOK: "no-NO", // Corona norvegese (Norvegia)
  MXN: "es-MX", // Peso messicano (Messico)
  INR: "hi-IN", // Rupia indiana (India)
  RUB: "ru-RU", // Rublo russo (Russia)
  ZAR: "af-ZA", // Rand sudafricano (Sud Africa)
  BRL: "pt-BR", // Real brasiliano (Brasile)
  TRY: "tr-TR", // Lira turca (Turchia)
  TWD: "zh-TW", // Nuovo dollaro di Taiwan (Taiwan)
  DKK: "da-DK", // Corona danese (Danimarca)
  PLN: "pl-PL", // Zloty polacco (Polonia)
  THB: "th-TH", // Baht tailandese (Thailandia)
  IDR: "id-ID", // Rupia indonesiana (Indonesia)
  HUF: "hu-HU", // Fiorino ungherese (Ungheria)
  CZK: "cs-CZ", // Corona ceca (Repubblica Ceca)
  ILS: "he-IL", // Shekel israeliano (Israele)
  CLP: "es-CL", // Peso cileno (Cile)
  PHP: "en-PH", // Peso filippino (Filippine)
  AED: "ar-AE", // Dirham degli Emirati Arabi Uniti (Emirati Arabi Uniti)
  COP: "es-CO", // Peso colombiano (Colombia)
  SAR: "ar-SA", // Rial saudita (Arabia Saudita)
  MYR: "ms-MY", // Ringgit malese (Malesia)
  RON: "ro-RO", // Leu rumeno (Romania)
  ARS: "es-AR", // Peso argentino (Argentina)
  VND: "vi-VN", // Dong vietnamita (Vietnam)
  IQD: "ar-IQ", // Dinaro iracheno (Iraq)
  QAR: "ar-QA", // Rial del Qatar (Qatar)
  KWD: "ar-KW", // Dinaro kuwaitiano (Kuwait)
  PKR: "ur-PK", // Rupia pakistana (Pakistan)
  EGP: "ar-EG", // Pound egiziano (Egitto)
  BDT: "bn-BD", // Taka bangladese (Bangladesh)
  OMR: "ar-OM", // Rial omanita (Oman)
  KZT: "kk-KZ", // Tenge kazako (Kazakhstan)
  KGS: "ky-KG", // Som kirghizo (Kyrgyzstan)
  UZS: "uz-UZ", // Som uzbeko (Uzbekistan)
  TJS: "tg-TJ", // Somoni tagiko (Tagikistan)
  AZN: "az-AZ", // Manat azero (Azerbaigian)
  GEL: "ka-GE", // Lari georgiano (Georgia)
  AMD: "hy-AM", // Dram armeno (Armenia)
  BYN: "be-BY", // Rublo bielorusso (Bielorussia)
  MDL: "ro-MD", // Leu moldavo (Moldavia)
  TMT: "tk-TM", // Manat turkmeno (Turkmenistan)
  UAH: "uk-UA", // Grivnia ucraina (Ucraina)
  MNT: "mn-MN", // Tugrik mongolo (Mongolia)
  AFN: "fa-AF", // Afghani afghano (Afghanistan)
  IRR: "fa-IR", // Rial iraniano (Iran)
  SYP: "ar-SY", // Lira siriana (Siria)
  YER: "ar-YE", // Rial yemenita (Yemen)
  SOS: "so-SO", // Scellino somalo (Somalia)
  SLL: "en-SL", // Leone liberiano (Sierra Leone)
  LRD: "en-LR", // Dollaro liberiano (Liberia)
  GMD: "en-GM", // Dalasi gambiano (Gambia)
  GNF: "fr-GN", // Franco guineano (Guinea)
};
