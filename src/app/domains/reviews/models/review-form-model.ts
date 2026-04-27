import { signal, WritableSignal } from '@angular/core';
import { max, maxLength, min, minLength, required, SchemaPathTree } from '@angular/forms/signals';
import { Review, ReviewFormData } from './review-models';

// ********** VALIDATION RULES ********** \\
const COMMENT_MIN_LENGTH: number = 2;
const COMMENT_MAX_LENGTH: number = 5000;

const SCORE_MIN: number = 1;
const SCORE_MAX: number = 10;

// ********** CREATE BOOK FORM MODEL ********** \\
export function createReviewModel(): WritableSignal<ReviewFormData> {
  return signal<ReviewFormData>({
    comment: '',
    score: 5,
    bookISBN: '',
    username: '',
  });
}

// ********** UPDATE BOOK FORM MODEL ********** \\
export function updateReviewModel(
  review: Review,
  username: string,
): WritableSignal<ReviewFormData> {
  return signal<ReviewFormData>({
    comment: review.comment,
    score: review.score,
    bookISBN: review.book.isbn,
    username: username,
  });
}

// ********** SCHEMA FOR FORM VALIDATION ********** \\
export function createReviewFormSchema(schema: SchemaPathTree<ReviewFormData>) {
  minLength(schema.comment, COMMENT_MIN_LENGTH, {
    message: `Votre commentaire doit contenir ${COMMENT_MIN_LENGTH} caractères minimum`,
  });
  maxLength(schema.comment, COMMENT_MAX_LENGTH, {
    message: `Votre commentaire ne doit pas dépasser ${COMMENT_MAX_LENGTH} caractères maximum`,
  });

  required(schema.score, { message: 'Veuillez sélectionner une note entre 1 et 10' });
  min(schema.score, SCORE_MIN, {
    message: 'Le score doit être un entier compris entre ${SCORE_MIN} et ${SCORE_MAX}.',
  });
  max(schema.score, SCORE_MAX, {
    message: 'Le score doit être un entier compris entre ${SCORE_MIN} et ${SCORE_MAX}.',
  });
}
