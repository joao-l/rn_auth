# React Native Social Media Auth (Register, Google and Facebook auth)
Using:
Redux to control navigation and user state;
Firebase auth with Google, Facebook;
User Register + Cloud Firestore;
```
rn_auth
.
├── assets - icons and fonts templates;
└── src
    ├── AppStyles.js - Main styles from app;
    ├── screens
    │   ├── HomeScreen.js - View navigation with user information;
    │   ├── LoginScreen.js - Options to login;
    │   ├── SignupScreen.js - Register new user;
    │   └── WelcomeScreen.js - First view off app with login or register routers;
    ├── reducers
    │   ├── index.js - State of navigation and auth;
    ├── navigations
    │   ├── AppNavigation.js - Navigation configuration;
    ├── components - Custom components of the app;
```

## How to run this Application on Android emulator

1. Setup AndroidStudio
1. Start Android Emulator
1. Download or clone project
1. Then run the commands below.

```sh

$ yarn install 
# or
$ npm install

# run on Android
$ npm run android
# or 
$ yarn android
```
