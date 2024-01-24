import { Client } from 'pg';
import { v4 as uuidv4 } from 'uuid';
 
const client = new Client({
    user: 'jjtron',
    host: 'localhost',
    database: 'jjtron',
    password: '',
    port: 5432,
});

const {
    invoices,
    customers,
    revenue,
    users,
} = require('../app/lib/placeholder-data.js');

client.connect(() => {
    console.log('Connected to PostgreSQL database!');

    // CREATE users TABLE
    client.query(`DROP TABLE IF EXISTS users;`);
    client.query(`CREATE TABLE IF NOT EXISTS users (
            id VARCHAR(255) DEFAULT 0 PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL)
    `);
    users.map((user: {id: string, name: string, email: string, password: string}) => {
        client.query(`
            INSERT INTO users (id, name, email, password)
            VALUES ('${user.id}', '${user.name}', '${user.email}', '${user.password}')
            ON CONFLICT (id) DO NOTHING;`)
    });

    // CREATE invoices TABLE
    client.query(`DROP TABLE IF EXISTS invoices;`);
    client.query(`CREATE TABLE IF NOT EXISTS invoices (
        id VARCHAR(255) DEFAULT 0 PRIMARY KEY,
        customer_id VARCHAR(255) NOT NULL,
        amount INT NOT NULL,
        status VARCHAR(255) NOT NULL,
        date DATE NOT NULL)
    `);
    let idNumber = uuidv4();
    invoices.map((invoice: {customer_id: string, amount: BigInteger, status: string, date: string}) => {
        client.query(`
        INSERT INTO invoices (id, customer_id, amount, status, date)
        VALUES ('${idNumber}', '${invoice.customer_id}', '${invoice.amount}', '${invoice.status}', '${invoice.date}')
        ON CONFLICT (id) DO NOTHING;`)
        idNumber = uuidv4();
    });
    
    // CREATE customers TABLE
    client.query(`DROP TABLE IF EXISTS customers;`);
    client.query(` CREATE TABLE IF NOT EXISTS customers (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        image_url VARCHAR(255) NOT NULL
      )
    `);
    customers.map((customer: {id: string, name: string, email: string, image_url: string}) => {
        client.query(`
        INSERT INTO customers (id, name, email, image_url)
        VALUES ('${customer.id}', '${customer.name}', '${customer.email}', '${customer.image_url}')
        ON CONFLICT (id) DO NOTHING;`)
    });

    // CREATE revenue TABLE
    client.query(`DROP TABLE IF EXISTS revenue;`);
    client.query(` CREATE TABLE IF NOT EXISTS revenue (
        month VARCHAR(4) NOT NULL UNIQUE,
        revenue INT NOT NULL
      );
    `);
    revenue.map((rev: {month: string, revenue: BigInt}) => {
        client.query(`
        INSERT INTO revenue (month, revenue)
        VALUES ('${rev.month}', '${rev.revenue}')
        ON CONFLICT (month) DO NOTHING;`)
    });

    client.end;
});


