import { Component , EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-delete-acno',
  templateUrl: './delete-acno.component.html',
  styleUrls: ['./delete-acno.component.css']
})
export class DeleteAcnoComponent {
 @Input() deleteAcno:any //

 //userdefined event - oncancel event
 @Output() onCancel = new EventEmitter(); //it help us create a new user defined event
@Output() onDelete = new EventEmitter(); //it help us create a new user defined event

 cancel(){
    this.onCancel.emit()//Emits an event containing a given value.
 }

 deleteFromChild(){
    this.onDelete.emit()
 }
}
