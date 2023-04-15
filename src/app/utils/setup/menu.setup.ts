export const MENUS: any[] = [
    {
        name: 'Psicoterapia', icon: 'spa',
        sections: [
            {
                name: 'Registro',
                submenus: [
                    { name: 'Pacientes', description: 'Administración de pacientes', route:'psychotherapy/patients', icon: 'contacts', model:'patient', groups: ['psychologist'] },
                    { name: 'Notas clinicas', description: 'Notas', route:'psychotherapy/clinical-notes/table', icon: 'local_hospital', model: 'clinical-note', groups: ['psychologist'] },
                    { name: 'Seguimiento', description: 'Seguimiento de pacientes', route:'psychotherapy/tracking/table', icon: 'track_changes', model: 'track', groups:['psychologist'] },
                    { name: 'Tareas', description: 'Descripción', route:'psychotherapy/task/dashboard', icon: 'note', model: 'task', groups:['psychologist'] }
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
        name: 'Citas', icon: 'track_changes',
        sections: [
            {
                name: 'Registro',
                submenus: [
                    { name: 'Cita', description: 'Administración de citas', route:'psychotherapy/patients', icon: 'security', model:'', groups: ['psychologist','patient'] }
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
                    { name: 'Emociones', description: 'Posibles emociones que presenta el paciente', route:'catalogs/emotions', icon: 'favorite', model: 'emotion', groups: ['psychologist'] },
                    { name: 'Síntomas', description: 'Posibles síntomas que presenta el paciente', route:'catalogs/symptom', icon: 'sentiment_very_satisfied', model:'symptom', groups: ['psychologist'] },
                    { name: 'Hobbies e Intereses', description: 'Hobbies e intereses del paciente', route:'catalogs/hobbies-interest', icon: 'weekend', model:'hobbies_interest', groups: ['psychologist'] },
                ]
            }
        ]
    }
  ];