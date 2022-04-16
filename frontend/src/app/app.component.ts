import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Filtering Facepiece Respirator (FFR)';
  subtitle = 'Products';
  product = {
    name: '',
    price: 0,
    imgUrl: '',
  };
  products = <any>[];

  ngOnInit() {
    this.readAll();
  }

  createProduct() {
    fetch('http://localhost:4000/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.product),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log('Success:', json);
        this.product = {
          name: '',
          price: 0,
          imgUrl: '',
        };
      })
      .catch((err) => console.log('Error:', err));
  }

  readAll() {
    fetch('http://localhost:4000/api/products')
      .then((res) => res.json())
      .then((json) => {
        console.log('Success:', json);
        this.products = json.success;
        console.log('products:', this.products);
      })
      .catch((err) => console.log('Error:', err));
  }
}
