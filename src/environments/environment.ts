// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
    defaultLang: 'en',
    firebase: {
        apiKey: 'AIzaSyCDI8fwHi6d0iT1_ksKKZ7mHchY6TUcECo',
        authDomain: 'blog-dev-44b3f.firebaseapp.com',
        databaseURL: 'https://blog-dev-44b3f.firebaseio.com',
        projectId: 'blog-dev-44b3f',
        storageBucket: 'blog-dev-44b3f.appspot.com',
        messagingSenderId: '211717292081'
    }
};
