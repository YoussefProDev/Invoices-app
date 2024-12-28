const postalCodes = [
  {
    territoryId: "GB",
    postCodeRegex:
      "GIR[ ]?0AA|((AB|AL|B|BA|BB|BD|BH|BL|BN|BR|BS|BT|CA|CB|CF|CH|CM|CO|CR|CT|CV|CW|DA|DD|DE|DG|DH|DL|DN|DT|DY|E|EC|EH|EN|EX|FK|FY|G|GL|GY|GU|HA|HD|HG|HP|HR|HS|HU|HX|IG|IM|IP|IV|JE|KA|KT|KW|KY|L|LA|LD|LE|LL|LN|LS|LU|M|ME|MK|ML|N|NE|NG|NN|NP|NR|NW|OL|OX|PA|PE|PH|PL|PO|PR|RG|RH|RM|S|SA|SE|SG|SK|SL|SM|SN|SO|SP|SR|SS|ST|SW|SY|TA|TD|TF|TN|TQ|TR|TS|TW|UB|W|WA|WC|WD|WF|WN|WR|WS|WV|YO|ZE)(\\d[\\dA-Z]?[ ]?\\d[ABD-HJLN-UW-Z]{2}))|BFPO[ ]?\\d{1,4}",
  },
  {
    territoryId: "JE",
    postCodeRegex: "JE\\d[\\dA-Z]?[ ]?\\d[ABD-HJLN-UW-Z]{2}",
  },
  {
    territoryId: "GG",
    postCodeRegex: "GY\\d[\\dA-Z]?[ ]?\\d[ABD-HJLN-UW-Z]{2}",
  },
  {
    territoryId: "IM",
    postCodeRegex: "IM\\d[\\dA-Z]?[ ]?\\d[ABD-HJLN-UW-Z]{2}",
  },
  {
    territoryId: "US",
    postCodeRegex: "\\d{5}([ \\-]\\d{4})?",
  },
  {
    territoryId: "CA",
    postCodeRegex:
      "[ABCEGHJKLMNPRSTVXY]\\d[ABCEGHJ-NPRSTV-Z][ ]?\\d[ABCEGHJ-NPRSTV-Z]\\d",
  },
  {
    territoryId: "DE",
    postCodeRegex: "\\d{5}",
  },
  {
    territoryId: "JP",
    postCodeRegex: "\\d{3}-\\d{4}",
  },
  {
    territoryId: "FR",
    postCodeRegex: "\\d{2}[ ]?\\d{3}",
  },
  {
    territoryId: "AU",
    postCodeRegex: "\\d{4}",
  },
  {
    territoryId: "IT",
    postCodeRegex: "\\d{5}",
  },
  {
    territoryId: "CH",
    postCodeRegex: "\\d{4}",
  },
  {
    territoryId: "AT",
    postCodeRegex: "\\d{4}",
  },
  {
    territoryId: "ES",
    postCodeRegex: "\\d{5}",
  },
  {
    territoryId: "NL",
    postCodeRegex: "\\d{4}[ ]?[A-Z]{2}",
  },
  {
    territoryId: "BE",
    postCodeRegex: "\\d{4}",
  },
  {
    territoryId: "DK",
    postCodeRegex: "\\d{4}",
  },
  {
    territoryId: "SE",
    postCodeRegex: "\\d{3}[ ]?\\d{2}",
  },
  {
    territoryId: "NO",
    postCodeRegex: "\\d{4}",
  },
  {
    territoryId: "BR",
    postCodeRegex: "\\d{5}[\\-]?\\d{3}",
  },
  {
    territoryId: "PT",
    postCodeRegex: "\\d{4}([\\-]\\d{3})?",
  },
  {
    territoryId: "FI",
    postCodeRegex: "\\d{5}",
  },
  {
    territoryId: "AX",
    postCodeRegex: "22\\d{3}",
  },
  {
    territoryId: "KR",
    postCodeRegex: "\\d{3}[\\-]\\d{3}",
  },
  {
    territoryId: "CN",
    postCodeRegex: "\\d{6}",
  },
  {
    territoryId: "TW",
    postCodeRegex: "\\d{3}(\\d{2})?",
  },
  {
    territoryId: "SG",
    postCodeRegex: "\\d{6}",
  },
  {
    territoryId: "DZ",
    postCodeRegex: "\\d{5}",
  },
  {
    territoryId: "AD",
    postCodeRegex: "AD\\d{3}",
  },
  {
    territoryId: "AR",
    postCodeRegex: "([A-HJ-NP-Z])?\\d{4}([A-Z]{3})?",
  },
  {
    territoryId: "AM",
    postCodeRegex: "(37)?\\d{4}",
  },
  {
    territoryId: "AZ",
    postCodeRegex: "\\d{4}",
  },
  {
    territoryId: "BH",
    postCodeRegex: "((1[0-2]|[2-9])\\d{2})?",
  },
  {
    territoryId: "BD",
    postCodeRegex: "\\d{4}",
  },
];
