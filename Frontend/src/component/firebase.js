import { initializeApp } from "firebase/app";
import Axios from "axios";
import { getAuth , GoogleAuthProvider , signInWithPopup } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCsfmcQtASV-fi5MYXQR1AouCOwRlZFvfI",
  authDomain: "hospitalappointee-7a8d8.firebaseapp.com",
  projectId: "hospitalappointee-7a8d8",
  storageBucket: "hospitalappointee-7a8d8.appspot.com",
  messagingSenderId: "188125569769",
  appId: "1:188125569769:web:4e8e1a69f7c660cc27c678",
  measurementId: "G-TR2GB141X5"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();


export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const name = result.user.displayName;
      const email = result.user.email;
      Axios.post("http://localhost:4000/user", {
        name: name,
        email: email,
      })
        .then((response) => {
          console.log(response);
          console.log("google user added to the database");
          window.alert(`Logged in with Google. Welcome, ${name}!`);
        })
        .catch((error) => {
          console.error(error);
          window.alert("Error occurred during Google login");
        });
    })
    .catch((error) => {
      console.log(error);
      window.alert("Failed to sign in with Google");
    });
};
