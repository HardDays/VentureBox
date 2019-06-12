import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-select-input-cmp',
  templateUrl: './select.component.html'
})
export class SelectInputComponent implements OnInit {

    @Input() Data: any[];
    @Input() Mode:string;
    IsTagsOpened = false;
    @Output() ChangeData = new EventEmitter<any>();

    Selected:any;
    constructor() 
    {

    }

    ngOnInit() 
    {
      if(this.Mode == 'single')
      {
        this.Selected = this.Data.find(obj => obj.isSelected);
        this.ChangeData.emit(this.Selected);
      }
    }

    UpdateSelected(selected:any)
    {
      if(this.Mode == 'single')
      {
        let needToUpdate = false;
        if(selected.value !== this.Selected.value)
        {
          needToUpdate = true;
        }
        this.Data.forEach(obj => {obj.isSelected = false;});
        selected.isSelected = true;
        this.Selected = this.Data.find(obj => obj.value == selected.value);
        
        if(needToUpdate)
        {
          this.ChangeData.emit(this.Selected);
        }
      }

    }
}