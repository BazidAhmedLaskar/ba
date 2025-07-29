// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAvQ5-KLbsiBY7LS2uOGUF0UR0zBke9K6I",
    authDomain: "merasmm-c89f4.firebaseapp.com",
    projectId: "merasmm-c89f4",
    storageBucket: "merasmm-c89f4.firebasestorage.app",
    messagingSenderId: "721705668276",
    appId: "1:721705668276:web:e1f5acde72b84409afd1e1",
    measurementId: "G-D54S0SWG0Y"
};

// Real Firebase Authentication using the Firebase SDK
// Note: This requires the Firebase SDK to be loaded first
class FirebaseAuth {
    constructor() {
        this.app = null;
        this.auth = null;
        this.currentUser = null;
        this.initialized = false;
        this.initPromise = this.initialize();
    }

    async initialize() {
        try {
            // Check if Firebase is available
            if (typeof firebase === 'undefined') {
                console.warn('Firebase SDK not loaded. Using demo mode.');
                this.useDemoMode();
                return;
            }

            // Initialize Firebase
            this.app = firebase.initializeApp(firebaseConfig);
            this.auth = firebase.auth();
            
            // Set up auth state listener
            this.auth.onAuthStateChanged((user) => {
                this.currentUser = user;
                if (this.authStateChangedCallbacks) {
                    this.authStateChangedCallbacks.forEach(callback => callback(user));
                }
            });

            this.initialized = true;
            console.log('Firebase initialized successfully');
        } catch (error) {
            console.error('Firebase initialization failed:', error);
            this.useDemoMode();
        }
    }

    useDemoMode() {
        console.log('Using demo authentication mode');
        this.currentUser = null;
        this.authStateChangedCallbacks = [];
        this.initialized = true;
    }

    async signInWithEmailAndPassword(email, password) {
        await this.initPromise;
        
        if (this.auth) {
            // Real Firebase authentication
            try {
                const result = await this.auth.signInWithEmailAndPassword(email, password);
                return result;
            } catch (error) {
                throw new Error(this.getFirebaseErrorMessage(error));
            }
        } else {
            // Demo mode fallback
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (email && password) {
                        this.currentUser = {
                            uid: 'demo-user-id',
                            email: email,
                            emailVerified: true
                        };
                        this.authStateChangedCallbacks.forEach(callback => callback(this.currentUser));
                        resolve({ user: this.currentUser });
                    } else {
                        reject(new Error('Invalid email or password'));
                    }
                }, 1000);
            });
        }
    }

    async signOut() {
        await this.initPromise;
        
        if (this.auth) {
            // Real Firebase sign out
            return await this.auth.signOut();
        } else {
            // Demo mode fallback
            return new Promise((resolve) => {
                setTimeout(() => {
                    this.currentUser = null;
                    this.authStateChangedCallbacks.forEach(callback => callback(null));
                    resolve();
                }, 500);
            });
        }
    }

    onAuthStateChanged(callback) {
        if (this.auth) {
            // Real Firebase auth state listener
            return this.auth.onAuthStateChanged(callback);
        } else {
            // Demo mode fallback
            if (!this.authStateChangedCallbacks) {
                this.authStateChangedCallbacks = [];
            }
            this.authStateChangedCallbacks.push(callback);
            callback(this.currentUser);
            
            return () => {
                const index = this.authStateChangedCallbacks.indexOf(callback);
                if (index > -1) {
                    this.authStateChangedCallbacks.splice(index, 1);
                }
            };
        }
    }

    async createUserWithEmailAndPassword(email, password) {
        await this.initPromise;
        
        if (this.auth) {
            // Real Firebase user creation
            try {
                const result = await this.auth.createUserWithEmailAndPassword(email, password);
                return result;
            } catch (error) {
                throw new Error(this.getFirebaseErrorMessage(error));
            }
        } else {
            // Demo mode fallback
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (email && password) {
                        this.currentUser = {
                            uid: 'demo-user-id-new',
                            email: email,
                            emailVerified: false
                        };
                        this.authStateChangedCallbacks.forEach(callback => callback(this.currentUser));
                        resolve({ user: this.currentUser });
                    } else {
                        reject(new Error('Invalid email or password'));
                    }
                }, 1000);
            });
        }
    }

    async signInWithGoogle() {
        await this.initPromise;
        
        if (this.auth && firebase.auth.GoogleAuthProvider) {
            // Real Firebase Google authentication
            try {
                const provider = new firebase.auth.GoogleAuthProvider();
                provider.addScope('email');
                provider.addScope('profile');
                
                const result = await this.auth.signInWithPopup(provider);
                return result;
            } catch (error) {
                // Handle popup blocked or closed
                if (error.code === 'auth/popup-blocked' || error.code === 'auth/popup-closed-by-user') {
                    try {
                        // Fallback to redirect
                        const provider = new firebase.auth.GoogleAuthProvider();
                        provider.addScope('email');
                        provider.addScope('profile');
                        await this.auth.signInWithRedirect(provider);
                        return;
                    } catch (redirectError) {
                        throw new Error(this.getFirebaseErrorMessage(redirectError));
                    }
                }
                throw new Error(this.getFirebaseErrorMessage(error));
            }
        } else {
            // Demo mode fallback
            return new Promise((resolve) => {
                setTimeout(() => {
                    this.currentUser = {
                        uid: 'demo-google-user-id',
                        email: 'user@gmail.com',
                        displayName: 'Demo User',
                        photoURL: 'https://via.placeholder.com/40',
                        emailVerified: true
                    };
                    this.authStateChangedCallbacks.forEach(callback => callback(this.currentUser));
                    resolve({ user: this.currentUser });
                }, 1000);
            });
        }
    }

    getCurrentUser() {
        return this.currentUser;
    }

    getFirebaseErrorMessage(error) {
        switch (error.code) {
            case 'auth/invalid-email':
                return 'Invalid email address';
            case 'auth/user-disabled':
                return 'This account has been disabled';
            case 'auth/user-not-found':
                return 'No account found with this email';
            case 'auth/wrong-password':
                return 'Incorrect password';
            case 'auth/invalid-credential':
                return 'Invalid email or password';
            case 'auth/too-many-requests':
                return 'Too many failed attempts. Please try again later';
            case 'auth/email-already-in-use':
                return 'Email address is already registered';
            case 'auth/weak-password':
                return 'Password should be at least 6 characters';
            case 'auth/popup-blocked':
                return 'Popup was blocked. Please allow popups and try again';
            case 'auth/popup-closed-by-user':
                return 'Google sign-in was cancelled';
            case 'auth/cancelled-popup-request':
                return 'Google sign-in was cancelled';
            case 'auth/account-exists-with-different-credential':
                return 'Account exists with different sign-in method';
            default:
                return error.message || 'Authentication failed';
        }
    }
}

// Create Firebase auth instance
const auth = new FirebaseAuth();

// Export auth for use in other scripts
window.firebaseAuth = auth;
