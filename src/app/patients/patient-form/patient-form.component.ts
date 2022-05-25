import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'; 

import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.scss']
})
export class PatientFormComponent implements OnInit {
  patientForm!: FormGroup;
  patient_id = 0;

  isUpdating = false;

  constructor(
    private patientService: PatientService,
    private route: ActivatedRoute
    ) {
    this.patientForm = new FormGroup({
      first_name: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
      last_name: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
      age: new FormControl(null, [Validators.required]) 
    })
  }

  ngOnInit(): void {
    if(this.route.snapshot.paramMap.get('patient_id')){
      this.isUpdating = true;
      this.getPatientById(this.route.snapshot.paramMap.get('patient_id'));
    }
  }

  get PForm(){ return this.patientForm.controls; }

  formValid() {

    if(this.isUpdating){
      let data = {
        id:this.route.snapshot.paramMap.get('patient_id'),
        first_name : this.patientForm.value.first_name,
        last_name : this.patientForm.value.last_name,
        age : this.patientForm.value.age
      }

      this.patientService.updatePatient(data).subscribe({
        next: (v) => { console.log(v); },
        error: (e) => console.error(e),
        complete: () => console.info('complete')
      });
    }else{
      this.patientService.addPatient(this.patientForm.value).subscribe({
        next: (v) => { console.log(v); },
        error: (e) => console.error(e),
        complete: () => console.info('complete')
      });
    }

    // this.modalConfig.create ? this.save() : this.update();
  }

  getPatientById(id:any){
    if(id){
      this.patientService.getPatientById(id).subscribe({
        next: (v) => { this.setPatient(v[0]) },
        error: (e) => console.error(e),
        complete: () => console.info('complete')
      });
    }
  }

  setPatient(patient:any){
    this.patientForm.patchValue({
      first_name: patient.first_name,
      last_name: patient.last_name,
      age: patient.age
    })
  }
}
