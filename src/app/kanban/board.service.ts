import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

import { Board, Task } from './board.model';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(
    private fireAuth: AngularFireAuth,
    private dataBase: AngularFirestore
  ) { }

  async createBoard(boardData: Board) {
    const user = await this.fireAuth.auth.currentUser;

    return this.dataBase.collection('boards').add({
      ...boardData,
      uid: user.uid,
      tasks: [{
        description: 'Hello!',
        label: 'yellow'
      }]
    });
  }

  deleteBoard(boardId: string) {
    return this.dataBase
      .collection('boards')
      .doc(boardId)
      .delete();
  }

  updateTasks(boardId: string, tasks: Task[]) {
    return this.dataBase
      .collection('boards')
      .doc(boardId)
      .update({ tasks });
  }

  removeTask(boardId: string, task: Task) {
    return this.dataBase
      .collection('boards')
      .doc(boardId)
      .update({
        tasks: firebase.firestore.FieldValue.arrayRemove(task)
      });
  }

  getUserBoards() {
    return this.fireAuth.authState
      .pipe(
        switchMap(user => {
          if (user) {
            return this.dataBase
              .collection<Board>('boards', ref => 
                ref.where('uid', '==', user.uid).orderBy('priority')
              )
              .valueChanges({ idField: 'id' });
          } else {
            return [];
          }
        })
      );
  }

  sortBoards(boards: Board[]) {
    const dataBase = firebase.firestore();
    const batch = dataBase.batch();
    const refs = boards.map(board => dataBase.collection('boards').doc(board.id));

    refs.forEach((ref, idx) => batch.update(ref, { priority: idx }));
    batch.commit();
  }

}
