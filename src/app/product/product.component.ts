import { Component, signal, computed, effect } from '@angular/core';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  price: number = 8000;
  // la valeur qui change
  quatity = signal<number>(1);
  // la valeur qui doit subscribe à la valeur qui change
  total = computed<number>(() => this.price * this.quatity());

  counter = signal<number>(0);

  // Avec Signals c'est plus rapide que Subject et BehaviorSubject
  // C'est un concept de la programmation réactive qui existe en javascript pour faire du state management

  constructor() { 
    // effect s'execute à chaque fois qu'un signal change
    // Attention de changer la d'un signal à l'interieur sion on aura une boucle infinie
    effect(() => {
      console.log('quatity changed', this.quatity());
      console.log('total changed', this.total());
      this.counter.set(4 );
    }, { allowSignalWrites: true });
  }

  increment() {
    // () get , set value
    // this.quatity.set(this.quatity() + 1);
    this.quatity.update( (value) => value + 1);
     // Pas bon de faire ça, car le total doit être calculé à chaque fois 
    //this.total = this.price * this.quatity;
  }

  decrement() {
    //this.quatity.set(this.quatity() - 1);
    this.quatity.update( (value) => value - 1);
    //this.total = this.price * this.quatity;
  } 
}
