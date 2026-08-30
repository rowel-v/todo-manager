import { Component } from '@angular/core';
import { Tasks } from "./features/tasks/tasks";

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [Tasks]
})
export class App {
}
