import { Component } from '@angular/core';
import { SaveBookForm } from "../../components/librarian/save-book-form/save-book-form";

@Component({
  selector: 'app-dashboard',
  imports: [SaveBookForm],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {}
