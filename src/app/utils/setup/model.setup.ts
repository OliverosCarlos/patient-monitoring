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
      components:[],
      multipleView: false,
      options:[]
    },
    {
      name: 'patient',
      singular_name: 'Paciente',
      plural_name:'Pacientes',
      components:[
        new VWComponent('psychotherapy/patients/form','form','card_content',{}),
        new VWComponent('psychotherapy/patients/table','list','card_content',{}),
        new VWComponent('psychotherapy/patients/form/:patient_id','show','card_content',{}),
        new VWComponent('psychotherapy/patients/update/:patient_id','update','card_content',{})
      ],
      multipleView: true,
      options:[ 'first_name', 'last_name1', 'last_name2', 'email' ]
    },
    {
      name: 'clinical_notes',
      singular_name: 'Nota clínica',
      plural_name:'Notas clínicas',
      components:[
        new VWComponent('psychotherapy/clinical-notes/form','form','card_content',{}),
        new VWComponent('psychotherapy/clinical-notes/table','list','card_content',{}),
        new VWComponent('psychotherapy/clinical-notes/form/:clinical-note_id','show','card_content',{}),
        new VWComponent('psychotherapy/clinical-notes/update/:clinical-note_id','update','card_content',{})
      ],
      multipleView: false,
      options:[]
    },
    {
      name: 'tracking',
      singular_name: 'Seguimiento',
      plural_name:'Seguimientos',
      components:[
        new VWComponent('psychotherapy/tracking/form','form','card_content',{}),
        new VWComponent('psychotherapy/tracking/table','list','card_content',{}),
        new VWComponent('psychotherapy/tracking/form/:track_id','show','card_content',{}),
        new VWComponent('psychotherapy/tracking/update/:track_id','update','card_content',{})
      ],
      multipleView: false,
      options:[]
    },
    {
      name: 'task',
      singular_name: 'Tarea',
      plural_name:'Tareas',
      components:[
        new VWComponent('psychotherapy/task/form','dashboard','dashboard_content',{}),
        new VWComponent('psychotherapy/task/form','form','card_content',{}),
        new VWComponent('psychotherapy/task/table','list','card_content',{}),
        new VWComponent('psychotherapy/task/form/:track_id','show','card_content',{}),
        new VWComponent('psychotherapy/task/update/:track_id','update','card_content',{})
      ],
      multipleView: false,
      options:[]
    },
    {
      name: 'emotion',
      singular_name: 'Emoción',
      plural_name:'Emociones',
      components:[
        new VWComponent('catalogs/emotions/form','form','card_content',{}),
        new VWComponent('catalogs/emotions/table','list','card_content',{}),
        new VWComponent('catalogs/emotions/form/:emotion_id','show','card_content',{}),
        new VWComponent('catalogs/emotions/update/:emotion_id','update','card_content',{})
      ],
      multipleView: false,
      options:['name','code','description']
    },
    {
      name: 'symptom',
      singular_name: 'Sintoma',
      plural_name:'Sintomas',
      components:[
        new VWComponent('catalogs/symptom/form','form','card_content',{}),
        new VWComponent('catalogs/symptom/table','list','card_content',{})
      ],
      multipleView: false,
      options:['name','code']
    },
    {
      name: 'hobbies_interest',
      singular_name: 'Hobbies e interéses',
      plural_name:'Hobbies e interéses',
      components:[
        new VWComponent('catalogs/hobbies-interest/form','form','card_content',{}),
        new VWComponent('catalogs/hobbies-interest/table','list','card_content',{}),
        new VWComponent('catalogs/hobbies-interest/form/:hobbies-interest_id','show','card_content',{}),
        new VWComponent('catalogs/hobbies-interest/update/:hobbies-interest_id','update','card_content',{})
      ],
      multipleView: false,
      options:['name','code']
    },
    {
      name: 'psychologist',
      singular_name: 'Psicóloga',
      plural_name:'Psicólogas',
      components:[
        new VWComponent('administration/psychologist/form','form','card_content',{}),
        new VWComponent('administration/psychologist/table','list','card_content',{}),
        new VWComponent('administration/psychologist/form/:psychologist_id','show','card_content',{}),
        new VWComponent('administration/psychologist/update/:psychologist_id','update','card_content',{})
      ],
      multipleView: true,
      options:[]
    },
  ];