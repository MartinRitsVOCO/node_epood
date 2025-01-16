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

            

            // apiResponse.data.forEach((element, index, array) => {
            //   queryData += `(${element.id}, ${element.price}, '${element.title.replace(/'/g, '\\\'')}', '${element.category.replace(/'/g, '\\\'')}', '${element.description.replace(/'/g, '\\\'')}', '${element.image}')`;
            //   if (index < array.length - 1) {
            //     queryData += ', ';
            //   }
            // });

            getConnection().then(conn => { 
              conn.query(`INSERT INTO products (id, price, title, category, description, image) VALUES ${queryData}`)
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

app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => { 
  res.status(404).send( 
      "<h1>Page not found on the server</h1>"
    ) 
}) 

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});