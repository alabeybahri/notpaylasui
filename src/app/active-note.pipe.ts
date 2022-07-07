import { Pipe, PipeTransform } from '@angular/core';
import {NoteProfile} from "../models/NoteProfile";

@Pipe({
  name: 'activeNote'
})
export class ActiveNotePipe implements PipeTransform {

  transform(value: NoteProfile[], args: boolean): any[] {
    if(!args){
      return value;
    }
    else{
      return value.filter(c => c.isActive);
    }
  }

}
