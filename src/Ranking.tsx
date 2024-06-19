import React from 'react';
import './navbar.css';
// import './main2.css'
import './rank.css'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import NavigationLinks from './components/navigation-links';
Chart.register(ArcElement, Tooltip, Legend);

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
type passType = "pass4" | "Altar" | "pass7" | "pass9"
interface AppState {
    page: Page,
    accPage: accountPage
    password: string
    playerData: PlayerData
    isMenuOpen: boolean
    rankingType: RankingType
    pass: passType
    playerList: PlayerData[]
    currentPage: number;
    rowsPerPage: number;
    load: boolean;
}

interface PlayerData {
    Id: string;
    name: string;
    DeathReq: number;
    KillReq: number;
    Pass4_Deaths: number;
    Pass4_T4_Kills: number;
    Pass4_T5_Kills: number;
    Pass4_Total_kills: number;
    Pass5_Deaths: number;
    Pass5_T4_Kills: number;
    Pass5_T5_Kills: number;
    Pass5_Total_kills: number;
    Pass7_Deaths: number;
    Pass7_T4_Kills: number;
    Pass7_T5_Kills: number;
    Pass7_Total_kills: number;
    KL_Deaths: number;
    KL_T4_Kills: number;
    KL_T5_Kills: number;
    KL_Total_kills: number;
    Power: number;
    Total_Kills: number;
    T4_Kills: number;
    T5_Kills: number;
    web_total?: number;
}

enum RankingType {
    Kills = 'Kills',
    Deaths = 'Deaths'
}

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void; // Specify that onPageChange is a function that takes a number and returns void
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => (
    <div className="pagination">
        <button onClick={() => onPageChange(Math.max(currentPage - 1, 1))} disabled={currentPage === 1}>
            &lt; Prev
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))} disabled={currentPage === totalPages}>
            Next &gt;
        </button>
    </div>
);

export class Ranking extends React.Component<{}, AppState> {
    constructor(props: any) {
        super(props);
        this.state = {
            load: false,
            currentPage: 1,
            rowsPerPage: 50,
            page: 'Home',
            password: "",
            accPage: "Sign",
            rankingType: RankingType.Kills,
            pass: "pass4",
            playerList: [],
            isMenuOpen: false, playerData: {
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
                web_total: 0
            }
        };
    }


    fetchAllPlayerData = async () => {
        try {
            const db = firebase.firestore();
            const playersCollection = db.collection('JUN_2024_KVK');
            const querySnapshot = await playersCollection.get();
            const playerDataArray: PlayerData[] = [];

            querySnapshot.forEach((doc) => {
                if (doc.exists) {
                    const data = doc.data() as PlayerData;
                    playerDataArray.push(data);
                }
            });
            return playerDataArray;
        } catch (error) {
            return [];
        }

    };

    rankPlayers = (playerDataList: PlayerData[], type: RankingType, pass: passType): PlayerData[] => {
        return playerDataList.sort((a, b) => {
            let valueA, valueB;
            if (pass === 'pass4') {
                if (type === RankingType.Kills) {
                    valueA = (a.web_total ?? 0) // Use 0 as the default value if Pass4TotalKills is undefined
                    valueB = (b.web_total ?? 0)
                } else if (type === RankingType.Deaths) {
                    valueA = a.Pass4_Deaths ?? 0; // Use 0 as the default value if Pass4Deads is undefined
                    valueB = b.Pass4_Deaths ?? 0;
                }
            } else if (pass === 'Altar') {
                if (type === RankingType.Kills) {
                    valueA = ((a.Pass5_T4_Kills + a.Pass5_T5_Kills) ?? 0) // Use 0 as the default value if Pass4TotalKills is undefined
                    valueB = ((b.Pass5_T4_Kills + b.Pass5_T5_Kills) ?? 0)
                } else if (type === RankingType.Deaths) {
                    valueA = a.Pass5_Deaths ?? 0; // Use 0 as the default value if Pass4Deads is undefined
                    valueB = b.Pass5_Deaths ?? 0;
                }
            } else if (pass === 'pass7') {
                if (type === RankingType.Kills) {
                    valueA = ((a.Pass7_T4_Kills + a.Pass7_T5_Kills) ?? 0)// Use 0 as the default value if Pass4TotalKills is undefined
                    valueB = ((b.Pass7_T4_Kills + b.Pass7_T5_Kills) ?? 0)
                } else if (type === RankingType.Deaths) {
                    valueA = a.Pass7_Deaths ?? 0; // Use 0 as the default value if Pass4Deads is undefined
                    valueB = b.Pass7_Deaths ?? 0;
                }
            } else {
                if (type === RankingType.Kills) {
                    valueA = (a.web_total ?? 0) + ((a.Pass5_T4_Kills + a.Pass5_T5_Kills) ?? 0) + ((a.Pass7_T4_Kills + a.Pass7_T5_Kills) ?? 0) // Use 0 as the default value if Pass4TotalKills is undefined
                    valueB = (b.web_total ?? 0) + ((b.Pass5_T4_Kills + b.Pass5_T5_Kills) ?? 0) + ((b.Pass7_T4_Kills + b.Pass7_T5_Kills) ?? 0)
                } else if (type === RankingType.Deaths) {
                    valueA = (a.Pass4_Deaths ?? 0) + (a.Pass5_Deaths ?? 0) + (a.Pass7_Deaths ?? 0) // Use 0 as the default value if Pass4Deads is undefined
                    valueB = (b.Pass4_Deaths ?? 0) + (b.Pass5_Deaths ?? 0) + (b.Pass7_Deaths ?? 0);
                }
            }
            if (valueB === undefined || valueA === undefined) {
                return 0;
            }
            return valueB - valueA;
        });
    }

    async componentDidMount(): Promise<void> {
        const playerDataArray = await this.fetchAllPlayerData();
        const rankedPlayers = this.rankPlayers(playerDataArray, this.state.rankingType, this.state.pass);
        this.setState({ playerList: rankedPlayers, load: true });
    }



    toggleMenu = () => {
        this.setState({ isMenuOpen: !this.state.isMenuOpen });
    }


    handleRankingTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        this.rankPlayers(this.state.playerList, event.target.value as RankingType, this.state.pass)
        this.setState({ rankingType: event.target.value as RankingType });
    };

    handlePassChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        this.rankPlayers(this.state.playerList, this.state.rankingType, event.target.value as passType)
        this.setState({ pass: event.target.value as passType });
    };




    render = (): JSX.Element => {
        const { playerList, currentPage, rowsPerPage, rankingType } = this.state;
        const totalRows = playerList.length;
        const totalPages = Math.ceil(totalRows / rowsPerPage);
        const lastRowIndex = currentPage * rowsPerPage;
        const currentRows = playerList.slice(
            (currentPage - 1) * rowsPerPage,
            currentPage * rowsPerPage
        );
        return (<div className="home-container">
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
            <div className="ranking-container">
                <h1 className="ranking-title">Player Rankings</h1>
                <p className="ranking-instructions">Use the dropdown menus to filter rankings by Kills/Deaths and by Pass. Navigate through the table pages with the Prev and Next buttons.</p>
                <div className="ranking-controls">
                    <select value={rankingType} onChange={this.handleRankingTypeChange} className="ranking-dropdown">
                        <option value={RankingType.Kills}>Kills</option>
                        <option value={RankingType.Deaths}>Deaths</option>
                    </select>
                    <select value={this.state.pass} onChange={this.handlePassChange} className="ranking-dropdown">
                        <option value="pass4">Pass 4</option>
                        <option value="Altar">Pass 7</option>
                        <option value="pass7">Pass 8</option>
                        <option value="pass9">total</option>
                    </select>
                </div>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page: number) => this.setState({ currentPage: page })}
                />
                <table className="ranking-table">
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Name</th>
                            <th>Total Kills/Deaths</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.load && currentRows.map((player, index) => (
                            <tr key={player.Id}>
                                <td>{(currentPage - 1) * rowsPerPage + index + 1}</td>
                                <td>{player.name}</td>
                                <td>
                                    {this.state.rankingType === RankingType.Kills
                                        ? (this.state.pass === "pass4"
                                            ? (player.web_total || 0).toLocaleString()
                                            : this.state.pass === "Altar"
                                                ? (player.Pass5_T4_Kills + player.Pass5_T5_Kills).toLocaleString()
                                                : this.state.pass === "pass7"
                                                    ? (player.Pass7_T4_Kills + player.Pass7_T5_Kills).toLocaleString()
                                                    : this.state.pass === "pass9"
                                                        ? ((player.web_total || 0) + player.Pass5_T4_Kills + player.Pass5_T5_Kills + player.Pass7_T4_Kills + player.Pass7_T5_Kills).toLocaleString()
                                                        : (player.KL_T4_Kills + player.KL_T5_Kills).toLocaleString())
                                        : (this.state.pass === "pass4"
                                            ? player.Pass4_Deaths.toLocaleString()
                                            : this.state.pass === "Altar"
                                                ? player.Pass5_Deaths.toLocaleString()
                                                : this.state.pass === "pass7"
                                                    ? player.Pass7_Deaths.toLocaleString()
                                                    : this.state.pass === "pass9"
                                                        ? (player.Pass4_Deaths + player.Pass5_Deaths + player.Pass7_Deaths).toLocaleString()
                                                        : player.KL_Deaths.toLocaleString())
                                    }
                                </td>
                            </tr>


                        ))}
                    </tbody>
                </table>
            </div>
            <footer className="home-footer">
                <span className="home-text15">© 2024 All Rights Reserved.</span>
            </footer>
        </div>)

    }
}
