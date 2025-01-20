import { invoiceTypeOptions, regimeFiscaleOptions } from "@/data/invoices";
import { db } from "@/lib/db";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AddressType, ClientTypeWithId } from "@/types/schemasTypes";
import { clientMapper, getClients } from "@/utils/client";
import { formatCurrency } from "@/utils/formatCurrency";
import { requireUserSession } from "@/utils/hooks";
import { getInvoices } from "@/utils/invoices";
import { addressMapper, addressParser } from "@/utils/mappers/address";
import { faker } from "@faker-js/faker/locale/it"; // Importa faker per l'italiano
import { Client } from "@prisma/client";
import { redirect } from "next/navigation";

// Funzione per generare un indirizzo casuale come oggetto AddressType
function generateRandomAddress(): AddressType {
  return {
    street: faker.location.streetAddress(),
    cap: faker.location.zipCode("#####"),
    comune: faker.location.city(),
    provincia: faker.location.state({ abbreviated: true }), // Provincia abbreviata (es. "RM")
  };
}

// Funzione per creare clienti casuali
async function createClients(userId?: string, quantity: number = 10) {
  const clients = [];
  for (let i = 1; i <= quantity; i++) {
    const address = generateRandomAddress(); // Genera un indirizzo casuale
    const client = await db.client.create({
      data: {
        name: faker.company.name(), // Nome aziendale casuale
        codiceFiscale: `${faker.string.alphanumeric(16).toUpperCase()}`, // Codice Fiscale casuale
        codiceDestinatario: `${faker.string.alphanumeric(7).toUpperCase()}`, // Codice Destinatario casuale
        pecDestinatario: faker.internet.email(), // Email PEC casuale
        email: faker.internet.email(), // Email casuale
        address: addressMapper(address), // Formatta l'indirizzo
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
    clients.push(clientMapper(client));
  }
  return clients;
}

// Funzione per creare servizi casuali
function createServices(quantity: number = 5) {
  const services = [];
  for (let i = 0; i < quantity; i++) {
    services.push({
      description: faker.commerce.productName(), // Descrizione del servizio casuale
      quantity: faker.number.int({ min: 1, max: 100 }), // Quantità casuale
      pricePerUnit: +faker.finance.amount({ min: 10, max: 1000, dec: 2 }), // Prezzo per unità casuale
      ivaRate: `${faker.number.int({ min: 5, max: 22 })}%`, // IVA casuale
      totalPrice: +faker.finance.amount({ min: 10, max: 1000, dec: 2 }), // Prezzo totale casuale
    });
  }
  return { data: services }; // Restituisce un oggetto con la proprietà `data`
}

// Funzione per creare fatture
async function createInvoices(quantity: number = 5, userId?: string) {
  const invoices = [];
  const allInvoices = await getInvoices(userId);
  const biggestInvoiceNumber = allInvoices.reduce((acc, invoice) => {
    return invoice.invoiceNumber > acc ? invoice.invoiceNumber : acc;
  }, 0);

  // Decidi casualmente se usare clienti esistenti o crearne di nuovi
  const useExistingClients = faker.datatype.boolean();
  let clients: ClientTypeWithId[];

  if (useExistingClients) {
    clients = await getClients(userId); // Usa clienti esistenti
  } else {
    clients = await createClients(userId, quantity); // Crea nuovi clienti
  }

  for (let i = 0; i < quantity; i++) {
    const client = clients[i % clients.length]; // Cicla sui clienti disponibili
    const clientAddress = client.address; // Parsa l'indirizzo del cliente
    const fromAddress = generateRandomAddress(); // Genera un indirizzo casuale per il mittente

    const invoice = await db.invoice.create({
      data: {
        total: formatCurrency({
          amount: Number(faker.finance.amount({ min: 10, max: 1000, dec: 2 })),
          currency: faker.finance.currencyCode(),
        }), // Importo casuale tra 10 e 1000
        status: faker.helpers.arrayElement(["PENDING", "PAID"]), // Stato casuale
        date: faker.date.past({ years: 3 }), // Data casuale nel passato
        fromName: faker.company.name(), // Nome aziendale casuale
        fromEmail: faker.internet.email(), // Email casuale
        fromAddress: addressMapper(fromAddress), // Formatta l'indirizzo del mittente
        clientName: client.name,
        clientEmail: client.email,
        clientAddress: addressMapper(clientAddress), // Formatta l'indirizzo del cliente
        clientCF: client.codiceFiscale as string,
        clientPec: client.pecDestinatario,
        currency: faker.finance.currencyCode(),
        invoiceNumber: biggestInvoiceNumber + i + 1, // Incrementa il numero di fattura
        note: faker.lorem.sentence(), // Nota casuale
        regimeFiscale: faker.helpers.arrayElement(regimeFiscaleOptions), // Regime fiscale casuale
        invoiceType: faker.helpers.arrayElement(invoiceTypeOptions), // Tipo di fattura casuale
        year: faker.date.past({ years: 3 }).getFullYear(),
        user: {
          connect: {
            id: userId,
          },
        },
        services: {
          createMany: createServices(faker.number.int({ min: 1, max: 12 })), // Servizi casuali
        },
        paymentDetails: {
          create: {
            iban: faker.finance.iban(), // IBAN casuale
            bankName: faker.company.name(), // Nome della banca casuale
            beneficiary: faker.company.name(), // Beneficiario casuale
          },
        },
      },
    });
    invoices.push(invoice);
  }
  return invoices;
}

// Endpoint GET per eseguire il seed
export async function GET() {
  const user = await requireUserSession();
  let success = true;
  try {
    const quantity = 15; // Numero di fatture da creare
    await createInvoices(quantity, user.id); // Crea le fatture
    success = true;
    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    success = false;
    return Response.json({ error, status: 500 });
  } finally {
    if (success) redirect(DEFAULT_LOGIN_REDIRECT);
  }
}
