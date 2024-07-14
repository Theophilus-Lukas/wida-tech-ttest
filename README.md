# WIDA TECH INVOICE API

API to log invoice and products sold

## INVOICE

Pertains to invoice to sale

### invoice model

model:

```
    public id: string;
	public invoice_no: number;
	public date: Date;
	public customer: string;
	public sales_person: string;
	public payment_type: string;
	public notes: string;

	public readonly product_sold?: ProductSold[];
	public readonly created_at: Date;
	public readonly updated_at: Date;
	public readonly deleted_at: Date | null;
```

### Invoice endpoints

#### Create invoice

POST `{{base_url}}/api/invoice/create`

```
req.body = {
    "invoice_no": 6,
    "date": "1/5/2021",
    "customer": "Jeff",
    "sales_person": "Pete",
    "payment_type": "CREDIT",
    "notes": "Lorem ipsum"
}
```

#### Get invoice

GET `{{base_url}}/api/invoice/?limit=<NUMBER>&page=<NUMBER>`

    ### Query / Params is For pagination ###
    ### is optional `{{base_url}}/api/invoice/` works ###
    > limit is number of invoice per page (default 1)
    > page is the page you're looking for (Default 10)

---

---

---

## PRODUCT SOLD

Pertains to products sold within an invoice

### product_sold model

model:

```
    public id: string;
	public invoice_no: number; (references invoice_no in invoice)
	public item: string;
	public quantity: number;
	public total_cogs: number;
	public total_price: number;

	public readonly created_at: Date;
	public readonly updated_at: Date;
	public readonly deleted_at: Date | null;
```

### product_sold endpoints

#### Create product_sold

POST `{{base_url}}/api/product-sold/create`

** BULK CREATES **

```
req.body = [
    {
    "invoice_no": <NUMBER>,
    "item": <STRING>,
    "quantity": <NUMBER>,
    "total_cogs": <NUMBER>,
    "total_price": <NUMBER>
    },
    {
    "invoice_no": 4,
    "item": "Bluetooth speaker",
    "quantity": 2,
    "total_cogs": 420000,
    "total_price": 504000
    },
    {
    "invoice_no": 63,
    "item": "Bluetooth speaker",
    "quantity": 2,
    "total_cogs": 420000,
    "total_price": 504000
    },
    ...
]
```

#### Get Product sold

GET `{{base_url}}/api/product-sold/`

    > no pagination

# HOW TO RUN

.env should look something like

```
PORT=8000

JWT_SECRET_KEY = "somesecretkey"

DB_HOST="localhost"
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD="password"
DB_NAME=db-name
DB_DIALECT=postgres

# JWT SECRET CONFIG
JWT_SECRET_KEY=secret1
JWT_SECRET_KEY_REFRESH=secret2
JWT_COOKIE_EXPIRES=1
NODE_ENV=development
```

then

> npm i

then

> npm run local
