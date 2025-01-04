import { headers } from "next/headers";
import countries from "./countries.json";
import flags from "./country-flags";
import { currencies } from "./currencies";
import { EU_COUNTRY_CODES } from "./eu-countries";
import timezones from "./timezones.json";

type CountryData = {
  currencies: Partial<Record<string, { name: string; symbol: string }>>;
  languages: Partial<Record<string, string>>;
  cca2: string;
};

export async function getCountryCode() {
  return (await headers()).get("x-vercel-ip-country") || "SE";
}

export async function getTimezone() {
  return (await headers()).get("x-vercel-ip-timezone") || "Europe/Berlin";
}

export async function getLocale() {
  return (await headers()).get("x-vercel-ip-locale") || "en-US";
}

export function getTimezones() {
  return timezones;
}

export async function getCurrency() {
  const countryCode = await getCountryCode();
  return currencies[countryCode as keyof typeof currencies];
}

export async function getDateFormat() {
  const country = getCountryCode();

  // US uses MM/dd/yyyy
  if ((await country) === "US") {
    return "MM/dd/yyyy";
  }

  // China, Japan, Korea, Taiwan use yyyy-MM-dd
  if (["CN", "JP", "KR", "TW"].includes(await country)) {
    return "yyyy-MM-dd";
  }
  // Most Latin American, African, and some Asian countries use dd/MM/yyyy
  if (["AU", "NZ", "IN", "ZA", "BR", "AR"].includes(await country)) {
    return "dd/MM/yyyy";
  }

  // Default to yyyy-MM-dd for other countries
  return "yyyy-MM-dd";
}

export async function getCountryInfo() {
  const country = await getCountryCode();
  const countryInfo = countries.find((x) => x.cca2 === country) as CountryData;
  const currencyCode = countryInfo && Object.keys(countryInfo.currencies)[0];
  const currency = currencyCode && countryInfo.currencies[currencyCode];
  const languages =
    countryInfo?.languages && Object.values(countryInfo.languages).join(", ");

  return { currencyCode, currency, languages };
}

export async function isEU() {
  const countryCode = getCountryCode();

  if (countryCode && EU_COUNTRY_CODES.includes(await countryCode)) {
    return true;
  }

  return false;
}

export async function getCountry() {
  const country = await getCountryCode();
  return flags[country as keyof typeof flags];
}
