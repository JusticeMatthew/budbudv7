
# BudBud

BudBud is a mobile app designed to assist medical marijuana patients with tracking information about their medicine, which can have thousands of variations. The tracked information can include Strain, Type (edible/tincture/etc.), Notes about how it affected them, and more.




## Features

- Login/Signup with email
- Onboarding tutorial
- Full CRUD usability for tracked medicine
- Option to "favorite" items


## Roadmap

- Profile screen with information useful to the patient

- Live search (may require a subscriptive service like Algolia)


## Bugs
Currently there is an incompatability between Firebase and React Native due to the `AsyncStorage` issue. This prevents the app from functioning right now but a fix is being worked on according to the Firebase repo.
## Tech Stack

![React](https://img.shields.io/badge/React%20Native-2E3440?style=for-the-badge&logo=react)
![Expo](https://img.shields.io/badge/Expo-2E3440?style=for-the-badge&logo=Expo)
![Firebase](https://img.shields.io/badge/Firebase-2E3440?style=for-the-badge&logo=firebase)
![Styled-Components](https://img.shields.io/badge/Styled%20Components-2E3440?style=for-the-badge&logo=styled-components)
## Contributing

BudBud is and always will be open source. Feel free to submit a pull request if you have something to contribute!



## Dev environment setup

**1.** Set up Expo and Google Firebase.

- Install Expo by following the steps [here](https://docs.expo.dev/get-started/installation/) (I highly recommend using the mobile app for your dev environment)

- Create an account on [Google Firebase](https://firebase.google.com/)

**2.** Fork the repo.

- Create a new `.env` file in the root directory with the following variables:
```bash
API_KEY
AUTH_DOMAIN
PROJECT_ID
STORAGE_BUCKET
MESSAGING_SENDER_ID
APP_ID
```

**3.** Create a Firebase Project.

- Navigate to the [Firebase Console](https://console.firebase.google.com/) and select `Add project`
- Enter a name for the project, check the box, and click `Continue`
- Disable Google Analytics and click `Create Project` 

**4.** Connect the App to Firebase.

- Click on the icon to add a `web` app

![add web app](https://budbud-readme.s3.amazonaws.com/BudBudReadmeStuff/AddWebApp.png)
- Choose a nickname for the app and click `Register app`
- Copy the values from the `firebaseConfig` object to your `.env` file

| firebaseConfig | .env     |
| :-------- | :------- |
| `apiKey` | `API_KEY` |
| `authDomain` | `AUTH_DOMAIN` |
| `projectId` | `PROJECT_ID` |
| `storageBucket` | `STORAGE_BUCKET` |
| `messagingSenderId` | `MESSAGING_SENDER_ID` |
| `appId` | `APP_ID` |

**5.** Create the Firestore database

- From the Project Overview page click on `Cloud Firestore` then click `Create database`
- Select the option to "Start in **test mode**" and click `Next`
- Choose a location (leave it on the default option if you are unsure) and click `Enable`
    
## Run the Project

Install dependencies using Expo

```bash
  npx expo install
```

Start the server

```bash
  npm start
```

#### Once the server is running open the **Expo Go** app on your mobile device and select it.


## License

[Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-nc-sa/4.0/)

