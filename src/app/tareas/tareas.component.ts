import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TareaService } from '../tarea.service';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})
export class TareasComponent implements OnInit {
  tareas: any[] = [];
  formulario: FormGroup = this.formBuilder.group({
    nombre: [],
    estado: [false]
  });
  tareaEnEdicion:any;
  constructor(
    private tareaService: TareaService,
    private formBuilder: FormBuilder
  ) { }
  ngOnInit(): void {
    this.getAll()
  }
  getAll() {
    this.tareaService.getAll().subscribe((tareas: any) => {
      console.log('tareas', tareas);
      this.tareas = tareas._embedded.tareas;
    })

  }
  save() {
    const values = this.formulario.value;
    console.log(values)
    if(this.tareaEnEdicion){
      this.tareaService.update(this.tareaEnEdicion._links.self.href
        ,values).subscribe({
        next: () => {
          this.getAll();
          this.tareaEnEdicion= null;
          this.formulario.setValue({
            nombre:'',
            estado:false
          })
        }, error: () => {
  
        }
      })
    }else{
      this.tareaService.create(values).subscribe({
        next: () => {
          this.getAll()
          this.formulario.setValue({
            nombre:'',
            estado:false
          })
        }, error: () => {
  
        }
      })
    }
  }

  delete(tarea: any) {
    const ok = confirm('Esta seguro de eliminar esta tarea?');
    if (ok) {
      console.log('ruta', tarea._links.self.href);
      const href = tarea._links.self.href;
      this.tareaService.delete(href).subscribe(() => {
        this.getAll();
      });
    }

  }
  edit(tarea: any){
    this.tareaEnEdicion= tarea;
    this.formulario.setValue({
      nombre:tarea.nombre,
      estado:tarea.estado
    })
  }
}
