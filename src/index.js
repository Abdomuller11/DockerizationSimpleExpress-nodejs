const express = require('express');
//const mongoose = require('mongoose');
const redis = require('redis');
//const {Client} = require('pg');
const conntypeorm = require('typeorm');
const os = require('os');


const prt= process.env.PORT || 8989;
//obj
const app = express();

const conn= conntypeorm.createConnection({
    type: 'postgres',
    host: 'postgres',
    port: 5432,
    username: 'root',
    password: 'example',
    
  })
  .then(() => {
    console.log('Connected to typeorm database');
  })
  .catch((error) => {
    console.log('Error connecting to database:', error);
  });

/*
//node-postgres
const postgressql = 'postgresql://root:example@postgres:5432'
const client = new Client({
    connectionString: postgressql,
  });
client.connect().then(()=>console.log('yeah conntected to postgres..')).catch((err)=>console.log('noo failed',err));
*/

//redis
const redisclient = redis.createClient({
    url: 'redis://redis:6379'
  });
redisclient.on('error', err => console.log('Redis Client Error', err));
redisclient.on('success!!', () => console.log('suuccess..'));
redisclient.connect();


//mongoose
const db_user='root';
const db_password='example';
const db_prt=27017;
const db_ipaddr='172.18.0.3';
const URI=`mongodb://${db_user}:${db_password}@mongo:${db_prt}`;
//mongoose.connect(URI).then(()=>console.log('yeah conntected to db..')).catch((err)=>console.log('noo failed',err));




app.get('/', (req,res) => {
    redisclient.set('product', 'headset_c9')
    redisclient.set('items','now no items')
    res.send(`<h1>hi abdo from ${os.hostname}</h1>`)
    console.log(`${os.hostname}`)

  });
app.get('/etc', (req,res) => res.send('<h1>hi abdo in etsc with watchTower</h1>'));

app.get('/fk', async (req,res) => 
{
    const selected_item = await redisclient.get('product');
    const selected_item2 =await redisclient.get('items');
res.send(`<h1>hi abdo in fk </h1> <h2>${selected_item}, ${selected_item2}</h2>`)});


  

app.listen(prt, () => console.log(`app is up and running on prt: ${prt}`) );

