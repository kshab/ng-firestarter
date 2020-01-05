import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { KanbanRoutingModule } from './kanban-routing.module';
import { SharedModule } from '../shared/shared.module';
import { BoardListComponent } from './board-list/board-list.component';
import { BoardComponent } from './board/board.component';


@NgModule({
  declarations: [BoardListComponent, BoardComponent],
  imports: [
    CommonModule,
    SharedModule,
    KanbanRoutingModule,
    FormsModule,
    DragDropModule,
    MatButtonToggleModule
  ]
})
export class KanbanModule { }
