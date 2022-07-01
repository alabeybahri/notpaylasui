import { Pipe, PipeTransform } from '@angular/core';
import {DTONote} from "../models/DTONote";

@Pipe({
  name: 'noteSearch'
})
export class NoteSearchPipe implements PipeTransform {

  transform(value: DTONote[], args: string): any[] {
    if(!args){
      return value;
    }
    else{
      return value.filter(c => c.noteValue.toLowerCase().includes(args.toLowerCase()) || c.title.toLowerCase().includes(args.toLowerCase()));
    }
  }

}
