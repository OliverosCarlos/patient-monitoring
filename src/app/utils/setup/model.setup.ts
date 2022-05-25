import { Model, VWComponent } from 'src/app/models/vw-model.model'

import { EmotionFormViewComponent } from 'src/app/components/catalogs/emotions/emotion-form-view/emotion-form-view.component';
import { EmotionListViewComponent } from 'src/app/components/catalogs/emotions/emotion-list-view/emotion-list-view.component';
import { EmotionShowViewComponent } from 'src/app/components/catalogs/emotions/emotion-show-view/emotion-show-view.component';
import { EmotionUpdateViewComponent } from 'src/app/components/catalogs/emotions/emotion-update-view/emotion-update-view.component';


export const MODELS: Model[] = [
    {
      name: 'model',
      singular_name: 'Modelo',
      plural_name:'Modelos',
      components:[]
    },
    {
      name: 'patient',
      singular_name: 'Paciente',
      plural_name:'Pacientes',
      components:[
        new VWComponent('/psychotherapy/patients/form','form',{}),
        new VWComponent('/psychotherapy/patients/table','list',{}),
        new VWComponent('/psychotherapy/patients/form/:patient_id','show',{}),
        new VWComponent('/psychotherapy/patients/update/:patient_id','update',{})
      ]
    },
    {
      name: 'clinical_notes',
      singular_name: 'Nota clínica',
      plural_name:'Notas clínicas',
      components:[
        new VWComponent('/psychotherapy/clinical-notes/form','form',{}),
        new VWComponent('/psychotherapy/clinical-notes/table','list',{}),
        new VWComponent('/psychotherapy/clinical-notes/form/:clinical-note_id','show',{}),
        new VWComponent('/psychotherapy/clinical-notes/update/:clinical-note_id','update',{})
      ]
    },
    {
      name: 'track',
      singular_name: 'Seguimiento',
      plural_name:'Seguimientos',
      components:[
        new VWComponent('/psychotherapy/tracking/form','form',{}),
        new VWComponent('/psychotherapy/tracking/table','list',{}),
        new VWComponent('/psychotherapy/tracking/form/:track_id','show',{}),
        new VWComponent('/psychotherapy/tracking/update/:track_id','update',{})
      ]
    },
    {
      name: 'task',
      singular_name: 'Tarea',
      plural_name:'Tareas',
      components:[
        new VWComponent('/psychotherapy/task/form','dashboard',{}),
        new VWComponent('/psychotherapy/task/form','form',{}),
        new VWComponent('/psychotherapy/task/table','list',{}),
        new VWComponent('/psychotherapy/task/form/:track_id','show',{}),
        new VWComponent('/psychotherapy/task/update/:track_id','update',{})
      ]
    },
    {
      name: 'emotion',
      singular_name: 'Emoción',
      plural_name:'Emociones',
      components:[
        new VWComponent('/catalogs/emotions/form','form',{}),
        new VWComponent('/catalogs/emotions/table','list',{}),
        new VWComponent('/catalogs/emotions/form/:emotion_id','show',{}),
        new VWComponent('/catalogs/emotions/update/:emotion_id','update',{})
      ]
    },
    {
      name: 'symptom',
      singular_name: 'Sintoma',
      plural_name:'Sintomas',
      components:[
        new VWComponent('/catalogs/symptom/form','form',{}),
        new VWComponent('/catalogs/symptom/table','list',{})
      ]
    },
    {
      name: 'hobbies_interest',
      singular_name: 'Hobbies e interéses',
      plural_name:'Hobbies e interéses',
      components:[
        new VWComponent('/catalogs/hobbies-interest/form','form',{}),
        new VWComponent('/catalogs/hobbies-interest/table','list',{}),
        new VWComponent('/catalogs/hobbies-interest/form/:hobbies-interest_id','show',{}),
        new VWComponent('/catalogs/hobbies-interest/update/:hobbies-interest_id','update',{})
      ]
    },
  ];