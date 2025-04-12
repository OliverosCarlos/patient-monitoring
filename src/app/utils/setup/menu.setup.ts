export const MENUS: any[] = [
    {
        name: 'Psicoterapia', icon: 'spa',
        sections: [
            {
                name: 'Historia Clinica',
                submenus: [
                    { name: 'Historia Clinica', description: 'Formularios', route:'clinical-history', icon: 'library_books', model: 'evaluation', groups:['psychologist'] },
                    { name: 'Evaluación', description: 'Formularios', route:'evaluations', icon: 'spa', model: 'evaluation', groups:['psychologist'] }
                ]
            },
            {
                name: 'Registro',
                submenus: [
                    { name: 'Pacientes', description: 'Administración de pacientes', route:'patients', icon: 'contacts', model:'patient', groups: ['psychologist'] },
                    { name: 'Notas clinicas', description: 'Notas', route:'psychotherapy/clinical-notes/table', icon: 'local_hospital', model: 'clinical-note', groups: ['psychologist'] },
                    { name: 'Seguimiento', description: 'Seguimiento de pacientes', route:'psychotherapy/tracking/table', icon: 'track_changes', model: 'track', groups:['psychologist'] },
                    { name: 'Tareas', description: 'Descripción', route:'psychotherapy/task/dashboard', icon: 'note', model: 'task', groups:['psychologist'] },
                    { name: 'Agenda', description: 'Agenda', route:'scheduler', icon: 'calendar_today', model: 'scheduler', groups:['psychologist'] }
                ]
            },
            {
                name: 'Tareas',
                submenus: [
                    { name: 'Tareas', description: 'Descripción', route:'psychotherapy/task-assigned/table', icon: 'note', model: 'task', groups:['patient'] }
                ]
            },
            {
                name: 'Administración',
                submenus: [
                    { name: 'Tareas', description: 'Descripción', route:'administration', icon: 'security', model: '', groups:[] }
                ]
            }
        ]
    },
    {
        name: 'Administración', icon: 'security',
        sections: [
            {
                name: 'Control',
                submenus: [
                    { name: 'Psicólogas', description: 'Control de pscólogas', route:'administration/psychologist/table', icon: 'people', model: 'psychologist', groups: ['admin'] },
                    { name: 'Baterías', description: 'Control de test', route:'administration/bayley-item/table', icon: 'list_alt', model: 'bayley-item', groups: ['admin'] },
                ]
            }
        ]
    },
    {
        name: 'Catálogos', icon: 'library_books',
        sections: [
            {
                name: 'General',
                submenus: [
                    { name: 'Catálogos', description: 'Formularios generales', route:'catalogs', icon: 'library_books', model: 'emotion', groups: ['psychologist'] },

                    // { name: 'Emociones', description: 'Posibles emociones que presenta el paciente', route:'catalogs/emotions/list', icon: 'favorite', model: 'emotion', groups: ['psychologist'] },
                    // { name: 'Síntomas', description: 'Posibles síntomas que presenta el paciente', route:'catalogs/symptom/list', icon: 'sentiment_very_satisfied', model:'symptom', groups: ['psychologist'] },
                    // { name: 'Hobbies e Intereses', description: 'Hobbies e intereses del paciente', route:'catalogs/hobbies-interest/list', icon: 'weekend', model:'hobbies_interest', groups: ['psychologist'] },
                ]
            }
        ]
    }
  ];