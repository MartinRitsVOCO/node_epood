import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios';

import { getConnection } from './models/dbModel.js';

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

app.get('/api/products/id/:id', (req, res) => {
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


app.get('/api/products/count', (req, res) => {
  const { count = 10, offset = 0 } = req.query;
  
  if ( isNaN(parseInt(count)) || count < 1 || count > 100 ) {
    return res.status(400).send('Count parameter must be a positive integer between 1 and 100');
  }
  if (isNaN(parseInt(offset)) || offset < 0 || !isFinite(offset)) {
    return res.status(400).send('Offset parameter must be a positive integer');
  }
  
  getConnection().then(conn => {
    conn.query('SELECT * FROM products LIMIT ? OFFSET ?', [parseInt(count), parseInt(offset)])
    .then(rows => {
      if (rows.length > 0) {
        res.json(rows);
      } else {
        res.status(404).send('No products found. SQL response: ' + rows);
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
})

app.get('/api/products/category/count', (req, res) => {
  const { category, count = 10, offset = 0, exclude = false } = req.query;
  
  if (!category) {
    return res.status(400).send('Category parameter is required');
  }
  if ( isNaN(parseInt(count)) || count < 1 || count > 100 ) {
    return res.status(400).send('Count parameter must be a positive integer between 1 and 100');
  }
  if (isNaN(parseInt(offset)) || offset < 0 || !isFinite(offset)) {
    return res.status(400).send('Offset parameter must be a positive integer');
  }
  
  getConnection().then(conn => {
    conn.query('SELECT * FROM products WHERE category = ? AND id NOT IN (?) LIMIT ? OFFSET ?', [category, JSON.parse(exclude), parseInt(count), parseInt(offset)])
    .then(rows => {
      if (rows.length > 0) {
        res.json(rows);
      } else {
        res.status(404).send('No products found in this category: ' + category +". SQL response: " + rows);
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
      conn.query('SELECT category, COUNT(*) AS count FROM products GROUP BY category')
      .then(rows => {
        if (rows.length > 0) {
          res.json(
            rows.map((row) => ({
              category: row.category,
              count: row.count.toString(),
            })));
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
  
  app.get('/cart', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
  
  app.get('/favorites', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
  
  app.use(express.static(path.join(__dirname, "public")));
  
  app.use((req, res, next) => { 
    res.status(404).send( 
      "Page not found on the server. Please check the URL and try again."
    ) 
  }) 
  
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});