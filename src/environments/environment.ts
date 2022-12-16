// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
	production: false,
	apiUrl: 'http://127.0.0.1:8080/api',
	apiToken: "fc47b914-8121-11ea-ac18-f0428d0155cd",
	encryptSecret: "64a6f8f3a3bf56a33b03ba1a6b65fd0ac3aca06b737a7130b34df4a46ceb39e4",
	decryptSecret: "63a1f1c891fc0dc7b80a2c7d340bee34f4e98ee6ce6ffa909396516856b796e1",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
