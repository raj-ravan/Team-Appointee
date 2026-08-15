// Firebase initialization stub
export const auth = {
  GoogleAuthProvider: class {
    constructor() {}
  },
  signInWithPopup: async (provider) => {
    return {
      user: {
        displayName: "Demo User",
        email: "demo@example.com"
      }
    };
  }
};

export const signInWithGoogle = () => {
  localStorage.setItem("name", "Demo User");
  window.alert("Logged in with Google successfully!");
  window.location.reload();
};
