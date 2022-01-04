
export type RequestParams = {
	orgCd?: string | number | bigint;
	sid?: string | number | bigint;
	key?: string;
	cd?: string;
	code?: string;
}
// export type ReservationEnv = {
// }
// export type AuthEnv = {
// 	key: string;
// }
// export type InfoEnv = AuthEnv;
// export type ProgressEnv = InfoEnv & {
// }
// export type ConfirmEnv = InfoEnv;
// export type SuccessEnv = InfoEnv;
// export type FailureEnv = InfoEnv & {
// }
// export type ErrorEnv = InfoEnv;

export type RequestBody = {
	body?: string;
}

export type Json = {
	[x: string]: string | Json | number | bigint;
}

export type Path = {
	path?: string;
}
export { Path as DBPath };

export type Env = string;

export type DBSelect = {
	select?: string;
	set?: Json;
	table?: string;
	from?: string;
	where?: Json | string;
	filter?: Function;
}

export type Cookie = {
	name: string;
	value: string;
	host?: string;
	domain?: string;
}
export type Header = {
	name: string;
	value: string;
}

export type CookiesParam = {
	cookies?: Array<Cookie>;
	filter?: Function;
}

export type HarString = {
	har: string;
}

export type Headers = {
	[x: string]: string;
}

export type Location = string | URL & {
	params: {
		[x: string]: string;
	}
}

export type LightResponse = {
	responseCode: number;
	headers: Headers
	body: string;
	location?: Location
}
