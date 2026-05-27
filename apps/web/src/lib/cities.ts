export interface City {
  name: string;
  code: string;
  state: string;
  popular?: boolean;
}

export const CITIES: City[] = [
  // Gujarat (home state)
  { name: "Ahmedabad", code: "AMD", state: "Gujarat", popular: true },
  { name: "Surat", code: "STV", state: "Gujarat", popular: true },
  { name: "Vadodara", code: "BDQ", state: "Gujarat", popular: true },
  { name: "Rajkot", code: "RAJ", state: "Gujarat" },
  { name: "Bhavnagar", code: "BHU", state: "Gujarat" },
  // Major metros
  { name: "Mumbai", code: "BOM", state: "Maharashtra", popular: true },
  { name: "Delhi", code: "DEL", state: "Delhi", popular: true },
  { name: "Bangalore", code: "BLR", state: "Karnataka", popular: true },
  { name: "Chennai", code: "MAA", state: "Tamil Nadu", popular: true },
  { name: "Hyderabad", code: "HYD", state: "Telangana", popular: true },
  { name: "Kolkata", code: "CCU", state: "West Bengal", popular: true },
  { name: "Pune", code: "PNQ", state: "Maharashtra", popular: true },
  // Tourist/popular
  { name: "Goa", code: "GOI", state: "Goa", popular: true },
  { name: "Jaipur", code: "JAI", state: "Rajasthan", popular: true },
  { name: "Kochi", code: "COK", state: "Kerala", popular: true },
  { name: "Lucknow", code: "LKO", state: "Uttar Pradesh" },
  { name: "Bhopal", code: "BHO", state: "Madhya Pradesh" },
  { name: "Indore", code: "IDR", state: "Madhya Pradesh" },
  { name: "Nagpur", code: "NAG", state: "Maharashtra" },
  { name: "Chandigarh", code: "IXC", state: "Punjab/Haryana" },
  { name: "Amritsar", code: "ATQ", state: "Punjab" },
  { name: "Varanasi", code: "VNS", state: "Uttar Pradesh" },
  { name: "Agra", code: "AGR", state: "Uttar Pradesh" },
  { name: "Udaipur", code: "UDR", state: "Rajasthan" },
  { name: "Jodhpur", code: "JDH", state: "Rajasthan" },
  { name: "Shirdi", code: "SAG", state: "Maharashtra" },
  { name: "Tirupati", code: "TIR", state: "Andhra Pradesh" },
  { name: "Mangalore", code: "IXE", state: "Karnataka" },
  { name: "Coimbatore", code: "CJB", state: "Tamil Nadu" },
  { name: "Visakhapatnam", code: "VTZ", state: "Andhra Pradesh" },
  { name: "Patna", code: "PAT", state: "Bihar" },
  { name: "Ranchi", code: "IXR", state: "Jharkhand" },
  { name: "Bhubaneswar", code: "BBI", state: "Odisha" },
  { name: "Guwahati", code: "GAU", state: "Assam" },
  // International
  { name: "Dubai", code: "DXB", state: "UAE", popular: true },
  { name: "Singapore", code: "SIN", state: "Singapore" },
  { name: "Bangkok", code: "BKK", state: "Thailand" },
  { name: "London", code: "LHR", state: "UK" },
  { name: "New York", code: "JFK", state: "USA" },
  { name: "Kuala Lumpur", code: "KUL", state: "Malaysia" },
  { name: "Muscat", code: "MCT", state: "Oman" },
  { name: "Abu Dhabi", code: "AUH", state: "UAE" },
];

export function searchCities(query: string): City[] {
  if (!query || query.length < 1) return CITIES.filter((c) => c.popular);
  const q = query.toLowerCase();
  return CITIES.filter(
    (c) =>
      c.name.toLowerCase().startsWith(q) ||
      c.code.toLowerCase().startsWith(q) ||
      c.state.toLowerCase().startsWith(q)
  ).slice(0, 8);
}

// Mock flight data generator
export interface Flight {
  id: string;
  airline: string;
  airlineCode: string;
  logo: string;
  from: string;
  to: string;
  dep: string;
  arr: string;
  duration: string;
  stops: number;
  price: number;
  seats: number;
  class: string;
}

const AIRLINES = [
  { name: "IndiGo", code: "6E", logo: "🔵" },
  { name: "Air India", code: "AI", logo: "🔴" },
  { name: "SpiceJet", code: "SG", logo: "🟠" },
  { name: "Vistara", code: "UK", logo: "🟣" },
  { name: "GoFirst", code: "G8", logo: "🟢" },
  { name: "AkasaAir", code: "QP", logo: "🟡" },
];

export function generateFlights(from: string, to: string, date: string, pax: number): Flight[] {
  const times = [
    ["05:30", "07:10", "1h 40m"],
    ["08:15", "10:00", "1h 45m"],
    ["10:30", "12:05", "1h 35m"],
    ["13:00", "14:50", "1h 50m"],
    ["15:45", "17:25", "1h 40m"],
    ["18:20", "20:10", "1h 50m"],
    ["20:50", "22:30", "1h 40m"],
  ];
  // Deterministic "random" from route string to avoid hydration mismatch
  const seed = (from + to + date).split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const basePrice = 2499 + (seed % 3000);
  return AIRLINES.map((airline, i) => {
    const [dep, arr, dur] = times[i % times.length]!;
    const seats = ((seed + i * 7) % 8) + 2;
    return {
      id: `${airline.code}-${from}-${to}-${i}`,
      airline: airline.name,
      airlineCode: airline.code,
      logo: airline.logo,
      from,
      to,
      dep,
      arr,
      duration: dur,
      stops: i === 2 || i === 5 ? 1 : 0,
      price: (basePrice + i * 400) * pax,
      seats,
      class: "Economy",
    };
  });
}
