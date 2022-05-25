export const MENUS: any[] = [
    {
        name: 'Psicoterapia', icon: 'spa',
        sections: [
            {
                name: 'Registro',
                submenus: [
                    { name: 'Pacientes', description: 'Administración de pacientes', route:'/psychotherapy/patients', icon: 'contacts', model:'patient' },
                    { name: 'Notas clinicas', description: 'Notas', route:'/psychotherapy/clinical-notes/table', icon: 'local_hospital', model: 'clinical-note' },
                    { name: 'Seguimiento', description: 'Seguimiento de pacientes', route:'/psychotherapy/tracking/table', icon: 'track_changes', model: 'track' },
                    { name: 'Tareas', description: 'Descripción', route:'/psychotherapy/task/dashboard', icon: 'note', model: 'task' }
                ]
            },
            {
                name: 'Notas',
                submenus: [
                    { name: 'Tareas', description: 'Descripción', route:'/tasks', icon: 'note', model: '' }
                ]
            },
            {
                name: 'Administración',
                submenus: [
                    { name: 'Tareas', description: 'Descripción', route:'/administration', icon: 'security', model: '' }
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
                    { name: 'Cita', description: 'Administración de citas', route:'/psychotherapy/patients', icon: 'security', model:'' }
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
                    { name: 'Psicólogas', description: 'Control de pscólogas', route:'/administration', icon: 'people', model: 'psychologist' },
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
                    { name: 'Emociones', description: 'Posibles emociones que presenta el paciente', route:'/catalogs/emotions/table', icon: 'favorite', model: 'emotion' },
                    { name: 'Síntomas', description: 'Posibles síntomas que presenta el paciente', route:'/catalogs/symptom/table', icon: 'sentiment_very_satisfied', model:'symptom' },
                    { name: 'Hobbies e Intereses', description: 'Hobbies e intereses del paciente', route:'/catalogs/hobbies-interest/table', icon: 'weekend', model:'hobbies_interest' },
                ]
            }
        ]
    }
  ];