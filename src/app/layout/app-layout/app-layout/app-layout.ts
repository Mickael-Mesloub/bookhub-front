import { Component } from '@angular/core';
import { Header } from '../../header/header/header';
import { Footer } from '../../footer/footer/footer';
import { RouterOutlet } from '@angular/router';
import { Notification } from '../../../components/shared/notification/notification';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, Header, Footer, Notification],
  templateUrl: './app-layout.html',
  styleUrl: './app-layout.scss',
})
export class AppLayout {}
