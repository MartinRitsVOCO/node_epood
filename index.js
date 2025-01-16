import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios';

import { getConnection } from './models/dbModel.js';
import { get } from 'http';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/api/products', (req, res) => {
  getConnection().then(conn => {
    conn.query('SELECT * FROM products')
      .then(rows => {
        if (rows.length > 0) {
          res.json(rows);
        } else {
          axios.get('https://fakestoreapi.com/products').then(apiResponse => {
            let queryData = [];

            apiResponse.data.forEach((element) => {
              queryData.push([element.id, element.price, element.title, element.category, element.description, element.image]);
            });

            getConnection().then(conn => { 
              conn.batch(`INSERT INTO products (id, price, title, category, description, image) VALUES (?, ?, ?, ?, ?, ?)`, queryData)
              .then(() => {
                  res.json(apiResponse.data);
                })
                .catch(err => {
                  console.log(err);
                  res.status(500).send('Error inserting products into database');
                });
              }).finally(() => {
                conn.end();
              })
          }).catch(err => {
            console.log(err);
            res.status(500).send('Error retrieving products from API');
          });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).send('Error retrieving products from database');
      })
      .finally(() => {
        conn.end();
      });
  })
});

app.get('/api/products/:id', (req, res) => {
  const productId = req.params.id;
  getConnection().then(conn => {
    conn.query('SELECT * FROM products WHERE id = ?', [productId])
      .then(rows => {
        if (rows.length > 0) {
          res.json(rows[0]);
        } else {
          res.status(404).send('Product not found');
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).send('Error retrieving product from database');
      })
      .finally(() => {
        conn.end();
      });
  })
});

app.get('/api/categories/', (req, res) => {
  getConnection().then(conn => {
    conn.query('SELECT DISTINCT category FROM products')
      .then(rows => {
        if (rows.length > 0) {
          res.json(rows.map(row => row.category));
        } else {
          res.status(404).send('No categories found');
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).send('Error retrieving categories from database');
      })
      .finally(() => {
        conn.end();
      });
  })
});

app.get('/api/category/:category', (req, res) => {
  const category = req.params.category;
  getConnection().then(conn => {
    conn.query('SELECT * FROM products WHERE category = ?', [category])
      .then(rows => {
        if (rows.length > 0) {
          res.json(rows);
        } else {
          res.status(404).send('No products found in this category');
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).send('Error retrieving products from database');
      })
      .finally(() => {
        conn.end();
      });
  })
});

app.get('/api/product-count/', (req, res) => {
  getConnection().then(conn => {
    conn.query('SELECT COUNT(*) AS count FROM products')
      .then(rows => {
        if (rows.length > 0) {
          res.json(rows[0].count.toString());
        } else {
          res.status(404).send('No products found');
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).send('Error retrieving product count from database');
      })
      .finally(() => {
        conn.end();customer
      });
  })
});

app.get('api/product-count/:category', (req, res) => {
  const category = req.params.category;
  getConnection().then(conn => {
    conn.query('SELECT COUNT(*) AS count FROM products WHERE category = ?', [category])
      .then(rows => {
        if (rows.length > 0) {
          res.json(rows[0].count.toString());
        } else {
          res.status(404).send('No products found in this category');
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).send('Error retrieving product count from database');
      })
      .finally(() => {
        conn.end();
      });
  })
});

app.get('/cart', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/favorites', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => { 
  res.status(404).send( 
      "<h1>Page not found on the server</h1>"
    ) 
}) 

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});