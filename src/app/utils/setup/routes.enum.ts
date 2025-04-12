export enum NEUROPSYCHO {
    MEDICAL_HISTORY = '/neuro-psycho/medical-history/',
    MEDICAL_HISTORY_EXPORT = '/neuro-psycho/medical-history/export/',
    MEDICAL_HISTORY_REPORT = '/neuro-psycho/medical-history-report/',
}

export enum CATALOGS {
    EMOTIONS = '/catalogs/emotions/',
    SYMPTOMS = '/catalogs/symptoms/',
    HOBBIES_INTEREST = '/catalogs/hobbies_interests/'
}

export enum PSYCHOTHERAPY {
    PATIENT = '/psychotherapy/patient/',
    PATIENT_CREATE = '/psychotherapy/patient/create/',
    PATIENT_BY_ID = '/psychotherapy/patient/by_id/',
    CLINICAL_NOTES = '/psychotherapy/clinical_notes/',
    CLINICAL_NOTES_CREATE = '/psychotherapy/clinical_notes/create/',
    CLINICAL_NOTES_BY_ID = '/psychotherapy/clinical_notes/by_id/',
    PATIENTS_TASKS_ASSIGNED = '/psychotherapy/patients_tasks_assigned',
    PATIENTS_TASKS_ASSIGNED_BY_PATIENT = '/psychotherapy/patients_tasks_assigned/by_patient/',
    TRACKING = '/psychotherapy/tracking/',
    TRACKING_BY_ID = '/psychotherapy/tracking/by_id/',
    TRACKING_BY_PATIENT = '/psychotherapy/tracking/by_patient/',
    TASK_TEMPLATE = '/psychotherapy/task_templates/',
    TASK_APPLICATION = '/psychotherapy/task_application/'
}

export enum ADMINISTRATION {
    PSYCHOLOGIST = '/administration/psychologist/',
    PSYCHOLOGIST_CREATE = '/administration/psychologist/create/',
    BAYLEY_ITEM = '/administration/bayley_item/',
}

export enum SEC {
    USER_BY_USERNAME = "/user/by_username/"
}

export enum SCHEDULER {
    APPOINTMENTS = '/scheduler/appointments/',
    AVAILABILITY = '/scheduler/availability/',
}

export enum GENERAL {
    PATIENT = '/patient/general/',
}

export enum PATIENT {
    GENERAL = '/patient/general/',
    PSYCHOTHERAPY = '/patient/psychoterapy/',
    EARLY_STIMULATION = '/patient/early-stimulation/',
    NEURO_PSYCHOLOGY = '/patient/neuro-psychology/'
}