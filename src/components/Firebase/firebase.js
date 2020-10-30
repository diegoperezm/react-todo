import app from 'firebase/app';
import 'firebase/auth';

const config = {
  apiKey:            process.env.REACT_APP_APIKEY,
  authDomain:        process.env.REACT_APP_AUTHDOMAIN,
  databaseURL:       process.env.REACT_APP_DATABASEURL,
  projectId:         process.env.REACT_APP_PROJECTID,
  storageBucket:     process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
};

class Firebase {
    constructor() {
        app.initializeApp(config);
        this.auth = app.auth();
    }

  doSignInAnonymously   = () => this.auth.signInAnonymously()
    checkAuthStateChanged = () => this.auth.onAuthStateChanged();

}

export default Firebase;
