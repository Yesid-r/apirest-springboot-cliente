import { Component, OnInit } from '@angular/core';
import { TareaService } from '../tarea.service';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})
export class TareasComponent  implements OnInit{
  tareas: any[] = [];
  constructor(
    private tareaService: TareaService
  ){}
  ngOnInit(): void {
    this.tareaService.getAll().subscribe((tareas: any)=>{
      console.log('tareas', tareas);
      this.tareas = tareas._embedded.tareas;
    })
  }
}
