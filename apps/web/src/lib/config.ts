// ─── Business Configuration ────────────────────────────────────────────────
// 👇 Change this to your actual WhatsApp number (with country code, no +)
export const WHATSAPP_NUMBER = "+91 7778803008";

export const BUSINESS_NAME = "Maaruti Travels";
export const BUSINESS_TAGLINE = "Your Journey, Our Promise";
export const BUSINESS_EMAIL = "harshpra1624@gmail.com";
export const BUSINESS_PHONE = "+91 7778803008";

// WhatsApp message generators
export function waFlightMsg(from: string, to: string, date: string, pax: number) {
  return encodeURIComponent(
    `Hello Maaruti Travels! 🙏\n\nI want to book a flight:\n✈️ From: ${from}\n📍 To: ${to}\n📅 Date: ${date}\n👥 Passengers: ${pax}\n\nPlease send me the best options with prices!`
  );
}

export function waCarMsg(pickup: string, drop: string, date: string, carType: string) {
  return encodeURIComponent(
    `Hello Maaruti Travels! 🙏\n\nI need a car rental:\n🚗 Pickup: ${pickup}\n📍 Drop: ${drop}\n📅 Date: ${date}\n🚙 Car Type: ${carType}\n\nPlease send me availability and rates!`
  );
}

export function waTourMsg(destination: string, date: string, people: number) {
  return encodeURIComponent(
    `Hello Maaruti Travels! 🙏\n\nI'm interested in a tour package:\n🗺️ Destination: ${destination}\n📅 Travel Date: ${date}\n👥 Travelers: ${people}\n\nPlease share your best packages!`
  );
}

export function waCorporateMsg(from: string, to: string, date: string, pax: number, company: string) {
  return encodeURIComponent(
    `Hello Maaruti Travels! 🙏\n\nCorporate Travel Enquiry:\n🏢 Company: ${company}\n✈️ From: ${from}\n📍 To: ${to}\n📅 Date: ${date}\n👥 Passengers: ${pax}\n\nPlease send a corporate quote with GST invoice!`
  );
}

export function waQuoteMsg(name: string, service: string, details: string) {
  return encodeURIComponent(
    `Hello Maaruti Travels! 🙏\n\nCustom Quote Request:\n👤 Name: ${name}\n🎯 Service: ${service}\n📝 Details: ${details}\n\nPlease get back to me with a custom quote!`
  );
}

export function waBookNowMsg(service: string) {
  return encodeURIComponent(
    `Hello Maaruti Travels! 🙏\n\nI want to book: ${service}\n\nPlease help me with the booking process!`
  );
}

export function waUrl(msg: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
}
