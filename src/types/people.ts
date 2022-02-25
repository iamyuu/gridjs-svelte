export interface People {
	count: number;
	next: string;
	previous: null;
	results: Result[];
}

export interface Result {
	name: string;
	height: string;
	mass: string;
	hair_color: string;
	skin_color: string;
	eye_color: string;
	birth_year: string;
	gender: Gender;
	homeworld: string;
	films: string[];
	species: string[];
	vehicles: string[];
	starships: string[];
	created: string;
	edited: string;
	url: string;
}

export enum Gender {
	Female = "female",
	Male = "male",
	NA = "n/a",
}
