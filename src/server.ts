import App from "app";
import userRoute from "@api/user/user.router";
import productSoldRoute from "@api/product_sold/product_sold.router";
import invoiceRoute from "@api/invoice/invoice.router";

const routes = [new userRoute(), new productSoldRoute(), new invoiceRoute()];

const app = new App(routes);

app.listen();
