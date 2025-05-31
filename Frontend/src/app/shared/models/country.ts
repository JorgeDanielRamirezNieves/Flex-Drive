
export class Country {
  id: number;
  name: string;
  iso2: string;
  iso3: string;
  phonecode: string;
  capital: string;
  currency: string;
  native: string;
  emoji: string;

  constructor(
    id: number,
    name: string,
    iso2: string,
    iso3: string,
    phonecode: string,
    capital: string,
    currency: string,
    native: string,
    emoji: string
  ) {
    this.id = id;
    this.name = name;
    this.iso2 = iso2;
    this.iso3 = iso3;
    this.phonecode = phonecode;
    this.capital = capital;
    this.currency = currency;
    this.native = native;
    this.emoji = emoji;
  }
}
