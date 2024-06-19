export interface PlayerData {
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
    Kingdom?: number;
}


export interface PlayerAllTime {
    Id: string;
    name: string;
    KP_JUN_24: number;
    TK_JUN_24: number;
    TD_JUN_24: number;
    KP_APR_24: number;
    TK_APR_24: number;
    TD_APR_24: number;
    KP_OCT_23: number;
    TK_OCT_23: number;
    TD_OCT_23: number;
}