//File generated by vaweei CLI
export interface Patient {
    id: number;
    first_name: string;
    last_name1: string;
    last_name2: string;
    age: number;
    email: string;
    phone_number: string;
    image: string;
}

export interface Track {
    id: number;
    patient: Patient;
    session_approach : string;
    clinical_progress : string;
    session_objective : string;
    state_of_mind : string;
    conducts_and_non_verbal_languages : string;
    observations : string;
    created_at : string;   
}

