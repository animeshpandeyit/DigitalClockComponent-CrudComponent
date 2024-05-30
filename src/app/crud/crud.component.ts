import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
export interface IFormGroup {
  id: number;
  name: string;
  email: string;
}

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrl: './crud.component.css',
})
export class CrudComponent implements OnInit {
  title = 'crud-29-05-2024';

  userForm: FormGroup;

  storedFormValue: IFormGroup[] = [];

  constructor(private _formBuilder: FormBuilder) {
    this.userForm = this._formBuilder.group({
      id: [''],
      name: [''],
      email: [''],
    });

    const storedFormValue = localStorage.getItem('userForm');

    if (storedFormValue) {
      this.storedFormValue = JSON.parse(storedFormValue);
    }
  }

  ngOnInit(): void {}
  formsubmit() {
    console.log(this.userForm.value);

    const currentValue = this.userForm.value;
    currentValue.id = this.storedFormValue.length + 1;
    this.storedFormValue.push(currentValue);

    localStorage.setItem('userForm', JSON.stringify(this.storedFormValue));
    this.userForm.reset();
  }

  edit(id: number) {
    const Index = this.storedFormValue.findIndex(
      (value: any) => value.id === id
    );
    const dataToEdit = this.storedFormValue[Index];
    this.userForm.patchValue(dataToEdit);
  }

  update() {
    const currentValueToUpdate = this.userForm.value;
    const Index = this.storedFormValue.findIndex(
      (value: any) => value.id === currentValueToUpdate.id
    );

    this.storedFormValue[Index] = currentValueToUpdate;

    localStorage.setItem('userForm', JSON.stringify(this.storedFormValue));
    this.userForm.reset();
  }

  delete() {
    const currentValueToDelete = this.userForm.value;
    const Index = this.storedFormValue.findIndex(
      (value: any) => value.id === currentValueToDelete.id
    );

    this.storedFormValue.splice(Index, 1);
    localStorage.setItem('userForm', JSON.stringify(this.storedFormValue));
  }
}
