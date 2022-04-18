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

  toEdit = '';

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
        this.readAll();
      })
      .catch((err) => console.log('Error:', err));
  }

  readAll() {
    this.toEdit = '';
    this.product = {
      name: '',
      price: 0,
      imgUrl: '',
    };
    fetch('http://localhost:4000/api/products')
      .then((res) => res.json())
      .then((json) => {
        console.log('Success:', json);
        this.products = json.success;
        console.log('products:', this.products);
      })
      .catch((err) => console.log('Error:', err));
  }

  readProduct(id: String) {
    fetch(`http://localhost:4000/api/products/${id}`)
      .then((res) => res.json())
      .then((json) => {
        console.log('Success:', json);
        this.product = json.success;
        this.toEdit = json.success._id;
        console.log('product:', this.product);
      })
      .catch((err) => console.log('Error:', err));
  }

  updateProduct(id: String) {
    console.log('update ...', id);
    fetch(`http://localhost:4000/api/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.product),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log('Success:', json);
        this.readAll();
      })
      .catch((err) => console.log('Error:', err));
  }

  deleteProduct(id: String) {
    fetch(`http://localhost:4000/api/products/${id}`, { method: 'DELETE' })
      .then((res) => res.json())
      .then((json) => {
        console.log('Success:', json);
        this.readAll();
      })
      .catch((err) => console.log('Error:', err));
  }
}
