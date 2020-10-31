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

   doSignInWithEmailAndPassword = (email, password) =>
     this.auth.signInWithEmailAndPassword(email, password);

    checkAuthStateChanged = ( next, fb) => {
        return this.auth.onAuthStateChanged( user => {
            if (user) {
               next(user);
            } else {
                fb(); 
            }
        });
    } 
    
   doSignOut = () => this.auth.signOut();
}

export default Firebase;
