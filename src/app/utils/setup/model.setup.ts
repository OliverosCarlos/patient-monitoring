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
      searchAttributes:[]
    },
    {
      name: 'clinical-history',
      singular_name: 'Historia Clinica',
      plural_name:'Historias Clinicas',
      menus: [
        { menuTitle: "Estimulación Temprana", path: "form" },
        { menuTitle: "Adulto", path: "list" }
      ],
      components:[
        new VWComponent('clinical-history/','dashboard','dashboard_content',{})
      ],
      multipleView: false,
      searchAttributes:['paciente']
    },
    {
      name: 'evaluation',
      singular_name: 'Evaluacion',
      plural_name:'Evaluaciones',
      components:[
        new VWComponent('evaluations/','dashboard','dashboard_content',{})
      ],
      multipleView: false,
      searchAttributes:[]
    },
    {
      name: 'psychotherapy',
      singular_name: 'Psicoterapia',
      plural_name:'Psicoterapia',
      components:[
        new VWComponent('psychotherapy/','dashboard','dashboard_content',{})
      ],
      multipleView: false,
      searchAttributes:[]
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
      searchAttributes:[ 'first_name', 'last_name1', 'last_name2', 'email' ]
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
      searchAttributes:[]
    },
    {
      name: 'tracking',
      singular_name: 'Seguimiento',
      plural_name:'Seguimientos',
      components:[
        new VWComponent('psychotherapy/','dashboard','dashboard_content',{}),
        new VWComponent('psychotherapy/tracking/form','form','card_content',{}),
        new VWComponent('psychotherapy/tracking/table','list','card_content',{}),
        new VWComponent('psychotherapy/tracking/form/:track_id','show','card_content',{}),
        new VWComponent('psychotherapy/tracking/update/:track_id','update','card_content',{})
      ],
      multipleView: false,
      searchAttributes:[]
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
      searchAttributes:[]
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
      searchAttributes:['name','code','description']
    },
    {
      name: 'symptom',
      singular_name: 'Sintoma',
      plural_name:'Sintomas',
      components:[
        new VWComponent('catalogs/symptom/form','form','card_content',{}),
        new VWComponent('catalogs/symptom/table','list','card_content',{}),
        new VWComponent('catalogs/symptom/form/:symptom_id','show','card_content',{}),
        new VWComponent('catalogs/symptom/update/:symptom_id','update','card_content',{})
      ],
      multipleView: false,
      searchAttributes:['name','code']
    },
    {
      name: 'hobbies_interest',
      singular_name: 'Hobbies e interéses',
      plural_name:'Hobbies e interéses',
      components:[
        new VWComponent('catalogs/hobbies-interest/form','form','card_content',{}),
        new VWComponent('catalogs/hobbies-interest/list','list','card_content',{}),
        new VWComponent('catalogs/hobbies-interest/form/:hobbies-interest_id','show','card_content',{}),
        new VWComponent('catalogs/hobbies-interest/update/:hobbies-interest_id','update','card_content',{})
      ],
      multipleView: false,
      searchAttributes:['name','code']
    },
    {
      name: 'psychologist',
      singular_name: 'Psicóloga',
      plural_name:'Psicólogas',
      components:[
        new VWComponent('administration/psychologist/form','form','card_content',{}),
        new VWComponent('administration/psychologist/list','list','card_content',{}),
        new VWComponent('administration/psychologist/form/:psychologist_id','show','card_content',{}),
        new VWComponent('administration/psychologist/update/:psychologist_id','update','card_content',{})
      ],
      multipleView: true,
      searchAttributes:['name','code']
    },
    {
      name: 'early-stimulation',
      singular_name: 'Estimulación Temprana',
      plural_name:'Estimulación Temprana',
      menus: [
        { menuTitle: "Estimulación Temprana", path: "form" },
        { menuTitle: "Adulto", path: "list" }
      ],
      components:[
        new VWComponent('clinical-history/early-stimulation/form','form','card_content',{}),
        new VWComponent('clinical-history/early-stimulation/table','list','card_content',{}),
        new VWComponent('clinical-history/early-stimulation/form/:early-stimulation_id','show','card_content',{}),
        new VWComponent('clinical-history/early-stimulation/update/:early-stimulation_id','update','card_content',{})
      ],
      multipleView: false,
      searchAttributes:['name','patient'],
      options: ['Eliminar'],
      activities: [
        {name:'generate_report', display_name:'Informe', tooltip:'Generar Informe', icon: 'assignment', disabled: true},
      ]
    },
    {
      name: 'early-stimulation-report',
      singular_name: 'Informe Estimulación Temprana',
      plural_name:'Informes Estimulación Temprana',
      menus: [
        { menuTitle: "Estimulación Temprana", path: "form" },
        { menuTitle: "Adulto", path: "list" }
      ],
      components:[
        new VWComponent('clinical-history/early-stimulation-report/form','form','card_content',{}),
        new VWComponent('clinical-history/early-stimulation-report/table','list','card_content',{}),
        new VWComponent('clinical-history/early-stimulation-report/form/:early-stimulation-report_id','show','card_content',{}),
        new VWComponent('clinical-history/early-stimulation-report/update/:early-stimulation-report_id','update','card_content',{})
      ],
      multipleView: false,
      searchAttributes:['name','patient'],
      options: ['Eliminar', 'Exportar PDF']
    },
    {
      name: 'bayley-item',
      singular_name: 'Bayley Item',
      plural_name:'Bayley Items',
      menus: [
        { menuTitle: "Estimulación Temprana", path: "form" },
        { menuTitle: "Adulto", path: "list" }
      ],
      components:[
        new VWComponent('administration/bayley-item/form','form','card_content',{}),
        new VWComponent('administration/bayley-item/table','list','card_content',{}),
      ],
      multipleView: false,
      searchAttributes:['paciente']
    },
  ];