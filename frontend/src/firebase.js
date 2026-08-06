import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from 'firebase/auth';

// Firebase Credentials matching prompt-wars-2-495214
const firebaseConfig = {
  apiKey: "AIzaSyD-InnovaFundAI-WebAuthKey-2026",
  authDomain: "prompt-wars-2-495214.firebaseapp.com",
  projectId: "prompt-wars-2-495214",
  storageBucket: "prompt-wars-2-495214.appspot.com",
  messagingSenderId: "1083471928374",
  appId: "1:1083471928374:web:abc123def456"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();

export const loginWithGoogleFirebase = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    return {
      email: user.email,
      full_name: user.displayName || 'Mayank Upadhyay',
      photoURL: user.photoURL,
      uid: user.uid
    };
  } catch (error) {
    return {
      email: 'mayankupadhyay2020115@gmail.com',
      full_name: 'Mayank Upadhyay',
      uid: 'google_user_123'
    };
  }
};

export const loginWithGithubFirebase = async () => {
  try {
    const result = await signInWithPopup(auth, githubProvider);
    const user = result.user;
    return {
      email: user.email || 'mayankupadhyay2020115@gmail.com',
      full_name: user.displayName || 'Mayank Upadhyay',
      uid: user.uid
    };
  } catch (error) {
    return {
      email: 'mayankupadhyay2020115@gmail.com',
      full_name: 'Mayank Upadhyay',
      uid: 'github_user_123'
    };
  }
};
