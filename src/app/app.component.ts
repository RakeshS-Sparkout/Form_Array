import { Component, OnInit } from '@angular/core';
import { FormControl, FormArray, FormGroup, Validators } from '@angular/forms';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Form_Array';
  inputField: FormGroup;

  ngOnInit(): void {
    initFlowbite();
    this.inputField = new FormGroup({
      items: new FormArray([
         new FormControl('', Validators.required)])
    });
  }

  get items(): FormArray {
    return this.inputField.get('items') as FormArray;
  }

  isEmpty: Boolean = false;

  checkValidity(){
    const lastControl = this.items.at(this.items.length - 1) as FormControl;
    if (lastControl.invalid && lastControl.touched){
      this.isEmpty = true;
    }else {
      this.isEmpty = false;
    }
  }

  addItem(): void {
    const lastControl = this.items.at(this.items.length - 1) as FormControl;
    if (lastControl.value) {
      this.items.push(new FormControl(''));
    }
  }

  removeItem(index: number): void {
    this.items.removeAt(index); 
  }

  onSubmit(): void {
    console.log(this.inputField.value); 
    this.items.clear();
    this.ngOnInit();
  }

  isAddButtonDisabled(): boolean {
    const lastControl = this.items.at(this.items.length - 1) as FormControl;
    return !lastControl.value; 
  }
}
