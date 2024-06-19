import React from 'react';
import './account.css'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import Main from './Main';
import NavigationLinks from './components/navigation-links'
import { PlayerData } from './player';



const firebaseConfig = {
    apiKey: "AIzaSyBYq-OcMmsJBx5CMYVASBBJNZE9bBrwqLA",
    authDomain: "kingdom1418-rok.firebaseapp.com",
    projectId: "kingdom1418-rok",
    storageBucket: "kingdom1418-rok.appspot.com",
    messagingSenderId: "52859370206",
    appId: "1:52859370206:web:95983696b1f350397fa04f",
    measurementId: "G-5QTEHKEFNL"
};

firebase.initializeApp(firebaseConfig);


type Page = "Home" | "Account" | "Calculator" | "Error"
type accountPage = "Sign" | "Create" | "Main"

interface AppState {
    page: Page,
    userID: string,
    accPage: accountPage
    password: string
    cpassword: string
    playerData: PlayerData
    isMenuOpen: boolean
}



export class Account extends React.Component<{}, AppState> {
    constructor(props: any) {
        super(props);
        this.state = {
            page: 'Home', userID: "", password: "", accPage: "Sign", cpassword: "", isMenuOpen: false, playerData: {
                Id: '',
                name: '',
                DeathReq: 0,
                KillReq: 0,
                Pass4_Deaths: 0,
                Pass4_T4_Kills: 0,
                Pass4_T5_Kills: 0,
                Pass4_Total_kills: 0,
                Pass5_Deaths: 0,
                Pass5_T4_Kills: 0,
                Pass5_T5_Kills: 0,
                Pass5_Total_kills: 0,
                Pass7_Deaths: 0,
                Pass7_T4_Kills: 0,
                Pass7_T5_Kills: 0,
                Pass7_Total_kills: 0,
                KL_Deaths: 0,
                KL_T4_Kills: 0,
                KL_T5_Kills: 0,
                KL_Total_kills: 0,
                Power: 0,
                Total_Kills: 0,
                T4_Kills: 0,
                T5_Kills: 0,
                Kingdom: 1418
            }
        };
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in
                const user = firebase.auth().currentUser;
                const email = user?.email;
                const username = email?.split('@')[0];
                if (username === undefined) {
                    return;
                }
                this.setState({ accPage: "Main", userID: username });
            } else {
                // User is signed out
                this.setState({
                    accPage: "Sign", playerData: {
                        Id: '',
                        name: '',
                        DeathReq: 0,
                        KillReq: 0,
                        Pass4_Deaths: 0,
                        Pass4_T4_Kills: 0,
                        Pass4_T5_Kills: 0,
                        Pass4_Total_kills: 0,
                        Pass5_Deaths: 0,
                        Pass5_T4_Kills: 0,
                        Pass5_T5_Kills: 0,
                        Pass5_Total_kills: 0,
                        Pass7_Deaths: 0,
                        Pass7_T4_Kills: 0,
                        Pass7_T5_Kills: 0,
                        Pass7_Total_kills: 0,
                        KL_Deaths: 0,
                        KL_T4_Kills: 0,
                        KL_T5_Kills: 0,
                        KL_Total_kills: 0,
                        Power: 0,
                        Total_Kills: 0,
                        T4_Kills: 0,
                        T5_Kills: 0,
                        Kingdom: 0
                    }
                });
            }
        });
    }


    onBack = (playerData: PlayerData | null) => {
        if (playerData === null) {
            return
        }
        this.setState({ page: "Home", playerData: playerData, userID: '' })
    }

    onBack2 = () => {
        this.setState({ page: "Calculator" })
    }

    changePage = (page: Page) => {
        this.setState({ page: page });
    };

    handleInputChangeU = (value: string) => {

        this.setState({ userID: value });
    };

    handleInputChangeP = (value: string) => {
        this.setState({ password: value });
    };

    handleInputChangecP = (value: string) => {
        this.setState({ cpassword: value });
    };

    handleSignIn = async () => {
        // Perform sign-in logic here
        const {userID} = this.state;
        let email = "";
        try {
            email = userID + "@newK1418Rok.com"
            // Sign in the user with the provided email and password
            await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

            await firebase.auth().signInWithEmailAndPassword(email, "test12345");
            // Do something after successful sign-in, e.g., redirect to a different page
            this.setState({ accPage: "Main" })
        } catch (error) {
            // Handle any errors that occur during the sign-in process
            alert("Password or user ID is wrong")
        }

        // Add your authentication code
    };

    handleCreate = async () => {
        // Perform sign-in logic here
        const { userID} = this.state;
        let email = ""
        try {
            // Create the user with the provided email and password
            email = userID + "@newK1418Rok.com"
            const db = firebase.firestore();
            const docRef = db.collection('JUN_2024_KVK').doc(userID);
            const docSnapshot = await docRef.get();
            if (docSnapshot.exists) {
                const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, "test12345");
                // Do something with the created user, e.g., log in the user or redirect to a different page
                this.setState({ accPage: "Main" })
            } else {
                alert("No user Found - check ID or contact KUKI")
            }
        } catch (error) {
            // Handle any errors that occur during the authentication process
            alert("Account already exists")
        }

        // Add your authentication code
    };

    handleChangePageAccountS = () => {
        this.setState({ accPage: "Create" })
    };

    handleChangePageAccountC = () => {
        console.log("here")
        this.setState({ accPage: "Sign" })
    };

    toggleMenu = () => {
        this.setState({ isMenuOpen: !this.state.isMenuOpen });
    }

    render = (): JSX.Element => {

        if (this.state.accPage === "Sign") {
            return (
                <div className="home-container">
                    <header data-thq="thq-navbar" className="home-navbar-interactive">
                        <span className="home-text">Kingdom 1418</span>
                        <div className="home-container1">
                            <div data-thq="thq-navbar-nav" className="home-desktop-menu">
                                <NavigationLinks rootClassName="rootClassName17"></NavigationLinks>
                            </div>
                        </div>
                        <div data-thq="thq-burger-menu" className="home-burger-menu" onClick={this.toggleMenu}>
                            <svg viewBox="0 0 1024 1024" className="home-icon" style={{ fill: "white" }}>
                                <path d="M128 554.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 298.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 810.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"></path>
                            </svg>
                        </div>
                        <div data-thq="thq-mobile-menu" className={`home-mobile-menu ${this.state.isMenuOpen ? 'open' : ''}`}>
                            <div className="home-nav">
                                <div className="home-top">
                                    <span className="home-text01">Kingdom 1418</span>
                                    <div data-thq="thq-close-menu" className="home-close-menu" onClick={this.toggleMenu}>
                                        <svg viewBox="0 0 1024 1024" className="home-icon02" style={{ fill: "white" }}>
                                            <path d="M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z"></path>
                                        </svg>
                                    </div>
                                </div>
                                <nav className="home-links">
                                    <NavigationLinks rootClassName="rootClassName14"></NavigationLinks>
                                </nav>
                            </div>
                        </div>
                    </header>
                    <div className="form-container">
                        <h1 className="form-title">Sign In</h1>
                        <form className="form">
                            <label className="label">User ID</label>
                            <input className="input" type="number" placeholder="Your in-game ID" inputMode="numeric" value={this.state.userID} onChange={(evt) => this.handleInputChangeU(evt.target.value)} />
                        </form>
                        <button className="create-account" onClick={this.handleChangePageAccountS}>Need an account?</button>
                        <button className="button" onClick={this.handleSignIn} >Sign In</button>
                    </div>
                </div>);
        } else if (this.state.accPage === "Create") {
            return (
                <div className="home-container">
                    <header data-thq="thq-navbar" className="home-navbar-interactive">
                        <span className="home-text">Kingdom 1418</span>
                        <div className="home-container1">
                            <div data-thq="thq-navbar-nav" className="home-desktop-menu">
                                <NavigationLinks rootClassName="rootClassName17"></NavigationLinks>
                            </div>
                        </div>
                        <div data-thq="thq-burger-menu" className="home-burger-menu" onClick={this.toggleMenu}>
                            <svg viewBox="0 0 1024 1024" className="home-icon" style={{ fill: "white" }}>
                                <path d="M128 554.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 298.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 810.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"></path>
                            </svg>
                        </div>
                        <div data-thq="thq-mobile-menu" className={`home-mobile-menu ${this.state.isMenuOpen ? 'open' : ''}`}>
                            <div className="home-nav">
                                <div className="home-top">
                                    <span className="home-text01">Kingdom 1418</span>
                                    <div data-thq="thq-close-menu" className="home-close-menu" onClick={this.toggleMenu}>
                                        <svg viewBox="0 0 1024 1024" className="home-icon02" style={{ fill: "white" }}>
                                            <path d="M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z"></path>
                                        </svg>
                                    </div>
                                </div>
                                <nav className="home-links">
                                    <NavigationLinks rootClassName="rootClassName14"></NavigationLinks>
                                </nav>
                            </div>
                        </div>
                    </header>
                    <div className="form-container">
                        <h1 className="form-title">Create an Account</h1>
                        <form className="form">
                            <label className="label">User ID</label>
                            <input className="input" type="number" placeholder="Your in-game ID" inputMode="numeric" value={this.state.userID} onChange={(evt) => this.handleInputChangeU(evt.target.value)} />
                        </form>
                        <button className="create-account" onClick={this.handleChangePageAccountC}>Have an Account?</button>
                        <button className="button" onClick={this.handleCreate} >Create</button>
                    </div>
                </div>);
        } else {
            return (
                <div className="home-container">
                    <header data-thq="thq-navbar" className="home-navbar-interactive">
                        <span className="home-text">Kingdom 1418</span>
                        <div className="home-container1">
                            <div data-thq="thq-navbar-nav" className="home-desktop-menu">
                                <NavigationLinks rootClassName="rootClassName17"></NavigationLinks>
                            </div>
                        </div>
                        <div data-thq="thq-burger-menu" className="home-burger-menu" onClick={this.toggleMenu}>
                            <svg viewBox="0 0 1024 1024" className="home-icon" style={{ fill: "white" }}>
                                <path d="M128 554.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 298.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 810.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"></path>
                            </svg>
                        </div>
                        <div data-thq="thq-mobile-menu" className={`home-mobile-menu ${this.state.isMenuOpen ? 'open' : ''}`}>
                            <div className="home-nav">
                                <div className="home-top">
                                    <span className="home-text01">Kingdom 1418</span>
                                    <div data-thq="thq-close-menu" className="home-close-menu" onClick={this.toggleMenu}>
                                        <svg viewBox="0 0 1024 1024" className="home-icon02" style={{ fill: "white" }}>
                                            <path d="M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z"></path>
                                        </svg>
                                    </div>
                                </div>
                                <nav className="home-links">
                                    <NavigationLinks rootClassName="rootClassName14"></NavigationLinks>
                                </nav>
                            </div>
                        </div>
                    </header>
                    <Main userID={this.state.userID} playerData={this.state.playerData} onBack={(playerData) => this.onBack(playerData)} onBack2={this.onBack2}/>
                </div>);
        }
    }
}

export default Account
