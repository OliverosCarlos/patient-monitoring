import { Model, VWComponent, ModuleModel } from 'src/app/models/vw-model.model'

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
        new VWComponent('clinical-history/','dashboard','dashboard_content',{}),
        new VWComponent('clinical-history/basic-clinical-history/form/:id','show','card_content',{}),

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
      name: 'clinical_note',
      singular_name: 'Nota clínica',
      plural_name:'Notas clínicas',
      components:[
        new VWComponent('clinical_note/form','form','card_content',{}),
        new VWComponent('clinical_note/list','list','card_content',{}),
        new VWComponent('clinical_note/form/:clinical_note_id','show','card_content',{}),
        new VWComponent('clinical_note/update/:clinical_note_id','update','card_content',{})
      ],
      multipleView: false,
      searchAttributes:[]
    },
    // {
    //   name: 'tracking',
    //   singular_name: 'Seguimiento',
    //   plural_name:'Seguimientos',
    //   components:[
    //     new VWComponent('psychotherapy/','dashboard','dashboard_content',{}),
    //     new VWComponent('psychotherapy/tracking/form','form','card_content',{}),
    //     new VWComponent('psychotherapy/tracking/table','list','card_content',{}),
    //     new VWComponent('psychotherapy/tracking/form/:track_id','show','card_content',{}),
    //     new VWComponent('psychotherapy/tracking/update/:track_id','update','card_content',{})
    //   ],
    //   multipleView: false,
    //   searchAttributes:[]
    // },
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
        new VWComponent('emotions/form','form','card_content',{}),
        new VWComponent('emotions/list','list','card_content',{}),
        new VWComponent('emotions/form/:emotion_id','show','card_content',{}),
        new VWComponent('emotions/update/:emotion_id','update','card_content',{})
      ],
      multipleView: false,
      searchAttributes:['name','code','description']
    },
    {
      name: 'symptom',
      singular_name: 'Sintoma',
      plural_name:'Sintomas',
      components:[
        new VWComponent('symptom/form','form','card_content',{}),
        new VWComponent('symptom/list','list','card_content',{}),
        new VWComponent('symptom/form/:symptom_id','show','card_content',{}),
        new VWComponent('symptom/update/:symptom_id','update','card_content',{})
      ],
      multipleView: false,
      searchAttributes:['name','code']
    },
    {
      name: 'hobbies_interest',
      singular_name: 'Hobbies e interéses',
      plural_name:'Hobbies e interéses',
      components:[
        new VWComponent('hobbies-interest/form','form','card_content',{}),
        new VWComponent('hobbies-interest/list','list','card_content',{}),
        new VWComponent('hobbies-interest/form/:hobbies-interest_id','show','card_content',{}),
        new VWComponent('hobbies-interest/update/:hobbies-interest_id','update','card_content',{})
      ],
      multipleView: false,
      searchAttributes:['name','code']
    },
    {
      name: 'psychologist',
      singular_name: 'Psicóloga',
      plural_name:'Psicólogas',
      components:[
        new VWComponent('psychologist/form','form','card_content',{}),
        new VWComponent('psychologist/list','list','card_content',{}),
        new VWComponent('psychologist/form/:psychologist_id','show','card_content',{}),
        new VWComponent('psychologist/update/:psychologist_id','update','card_content',{})
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
        new VWComponent('early-stimulation/form','form','card_content',{}),
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
    {
      name: 'appointment',
      singular_name: 'Cita',
      plural_name:'Cita',
      menus: [
        { menuTitle: "Vista 2", path: "form" },
        { menuTitle: "Historial", path: "list" }
      ],
      components:[
        new VWComponent('appointment','dashboard','dashboard_content',{}),
        new VWComponent('appointment/form','form','card_content',{}),
        new VWComponent('appointment/table','list','card_content',{}),
      ],
      multipleView: false,
      searchAttributes:['dia, mes, paciente']
    },
    {
      name: 'neuro-psychology',
      singular_name: 'Neuro Psicología',
      plural_name:'Neuro Psicología',
      menus: [
        { menuTitle: "Vista 2", path: "form" },
        { menuTitle: "Historial", path: "list" }
      ],
      components:[
        new VWComponent('appointment','dashboard','dashboard_content',{}),
        new VWComponent('appointment/form','form','card_content',{}),
        new VWComponent('appointment/table','list','card_content',{}),
      ],
      multipleView: false,
      searchAttributes:['first_name', 'last_name1', 'last_name2', 'email']
    },
    {
      name: 'basic-clinical-history',
      singular_name: 'Historia Clinica General',
      plural_name:'Historias Clinicas Generales',
      menus: [
        { menuTitle: "menu 1", path: "form" },
        { menuTitle: "menu 2", path: "list" }
      ],
      components:[
        new VWComponent('basic-clinical-history/list','list','card_content',{}),
        new VWComponent('basic-clinical-history/form','form','card_content',{}),

      ],
      multipleView: false,
      searchAttributes:['paciente']
    },
    
  ];

  export const MODULE_MODELS: ModuleModel[] = [
    {
      name: 'catalogs',
      singular_name: 'Catalogo',
      plural_name:'Catalogos',
      menus: [
        { menuTitle: "Emociones", path: "emotions/list" },
        { menuTitle: "Sintomas", path: "symptom/list" },
        { menuTitle: "Hobbies e interéses", path: "hobbies-interest/list" }
      ]
    },
    {
      name: 'scheduler',
      singular_name: 'Agenda',
      plural_name:'Agendas',
      menus: [
        { menuTitle: "Menu 1", path: "emotions/list" },
        { menuTitle: "Menu 2", path: "symptom/list" },
      ]
    },
    {
      name: 'patient',
      singular_name: 'Paciente',
      plural_name:'Pacientes',
      menus: [
        { menuTitle: "Psicoterapia", path: "psychoterapy/form" },
        { menuTitle: "Estimulación Temprana", path: "early-stimulation/form" },
        { menuTitle: "Neuro Psicología", path: "neuro-psychology/form" },
      ]
    },
    {
      name: 'clinical-history',
      singular_name: 'Historia Clinica',
      plural_name:'Historias Clinicas',
      menus: [
        { menuTitle: "Psicoterapia", path: "basic-clinical-history/list" },
        { menuTitle: "Estimulación Temprana", path: "early-stimulation/list" },
        // { menuTitle: "Neuro Psicología", path: "neuro-psychology/form" },
        { menuTitle: "Nota Clinica", path: "clinical_note/list" }

      ]
    },
  ]