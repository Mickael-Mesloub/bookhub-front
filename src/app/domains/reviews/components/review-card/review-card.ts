import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Review } from '../../models/review-models';

@Component({
  selector: 'app-review-card',
  imports: [DatePipe],
  templateUrl: './review-card.html',
  styleUrl: './review-card.scss',
})
export class ReviewCard {
  review = input<Review>();
}
