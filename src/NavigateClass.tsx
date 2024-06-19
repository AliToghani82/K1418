import React from 'react';
import './navbar.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import NavigationLinks from './components/navigation-links'
import './home.css'



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
    //playerData: PlayerData
    isMenuOpen: boolean
}



export class NavigateClass extends React.Component<{ navigate: (path: string) => void }, AppState> {
    constructor(props: any) {
        super(props);
        this.state = {
            page: 'Home', userID: "", password: "", accPage: "Sign", cpassword: "", isMenuOpen: false };
    }

    changePage = (page: Page) => {
        this.setState({ page: page });
    };

    toggleMenu = () => {
        this.setState({ isMenuOpen: !this.state.isMenuOpen });
    }
    
    handleNavigateToAccount = () => {
        this.props.navigate('/account');
    }

    render = (): JSX.Element => {

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
                <div className="home-hero">
                    <div className="home-btn-group">
                        <button className="home-button button" onClick={this.handleNavigateToAccount}>Log IN</button>
                    </div>
                </div>
                <div className="home-stats">
                    <div className="home-stat">
                        <svg viewBox="0 0 1024 1024" className="home-icon10">
                            <path d="M832 192v-128h-640v128h-192v128c0 106.038 85.958 192 192 192 20.076 0 39.43-3.086 57.62-8.802 46.174 66.008 116.608 113.796 198.38 130.396v198.406h-64c-70.694 0-128 57.306-128 128h512c0-70.694-57.306-128-128-128h-64v-198.406c81.772-16.6 152.206-64.386 198.38-130.396 18.19 5.716 37.544 8.802 57.62 8.802 106.042 0 192-85.962 192-192v-128h-192zM192 436c-63.962 0-116-52.038-116-116v-64h116v64c0 40.186 7.43 78.632 20.954 114.068-6.802 1.246-13.798 1.932-20.954 1.932zM948 320c0 63.962-52.038 116-116 116-7.156 0-14.152-0.686-20.954-1.932 13.524-35.436 20.954-73.882 20.954-114.068v-64h116v64z"></path>
                        </svg>
                        <span className="home-text09">TOP 300 KILLS</span>
                        <h1 className="home-text10">245B</h1>
                    </div>
                    <div className="home-stat1">
                        <svg viewBox="0 0 1024 1024" className="home-icon12">
                            <path d="M832 192v-128h-640v128h-192v128c0 106.038 85.958 192 192 192 20.076 0 39.43-3.086 57.62-8.802 46.174 66.008 116.608 113.796 198.38 130.396v198.406h-64c-70.694 0-128 57.306-128 128h512c0-70.694-57.306-128-128-128h-64v-198.406c81.772-16.6 152.206-64.386 198.38-130.396 18.19 5.716 37.544 8.802 57.62 8.802 106.042 0 192-85.962 192-192v-128h-192zM192 436c-63.962 0-116-52.038-116-116v-64h116v64c0 40.186 7.43 78.632 20.954 114.068-6.802 1.246-13.798 1.932-20.954 1.932zM948 320c0 63.962-52.038 116-116 116-7.156 0-14.152-0.686-20.954-1.932 13.524-35.436 20.954-73.882 20.954-114.068v-64h116v64z"></path>
                        </svg>
                        <span className="home-text11">TOP 300 DEATHS</span>
                        <h1 className="home-text12">2.7B</h1>
                    </div>
                    <div className="home-stat2">
                        <svg viewBox="0 0 1024 1024" className="home-icon14">
                            <path d="M832 192v-128h-640v128h-192v128c0 106.038 85.958 192 192 192 20.076 0 39.43-3.086 57.62-8.802 46.174 66.008 116.608 113.796 198.38 130.396v198.406h-64c-70.694 0-128 57.306-128 128h512c0-70.694-57.306-128-128-128h-64v-198.406c81.772-16.6 152.206-64.386 198.38-130.396 18.19 5.716 37.544 8.802 57.62 8.802 106.042 0 192-85.962 192-192v-128h-192zM192 436c-63.962 0-116-52.038-116-116v-64h116v64c0 40.186 7.43 78.632 20.954 114.068-6.802 1.246-13.798 1.932-20.954 1.932zM948 320c0 63.962-52.038 116-116 116-7.156 0-14.152-0.686-20.954-1.932 13.524-35.436 20.954-73.882 20.954-114.068v-64h116v64z"></path>
                        </svg>
                        <span className="home-text13">TOP 300 POWER</span>
                        <h1 className="home-text14">17.8B</h1>
                    </div>
                </div>
                <footer className="home-footer">
                    <span className="home-text15">© 2024 All Rights Reserved.</span>
                </footer>
            </div>
        );
    };
}

export default NavigateClass;


