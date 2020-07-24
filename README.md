# VueJs + Laravel Test for the company OnBrand

## INSTALLATION

    // Clone the repository
    git clone git@github.com:farena/onbrand-frontend
    // Copy the file .env.example.local to .env.local
    cd onbrand-frontend
    cp example.env.local .env.local

    // Edit the .env.local file to configure the Base URL
    VUE_APP_BASE_URL=http://onbrand.test

    // Install Dependencies
    yarn install
        or with npm
    npm install

    // Compile the project
    yarn build
        or with npm
    npm run build

    // Now all the files are compiled in the folder /dist
    // You have to point to this folder with apache or nginx
    // The index file is index.html