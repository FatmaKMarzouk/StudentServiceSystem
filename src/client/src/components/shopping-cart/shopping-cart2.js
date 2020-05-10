import React from "react";
import "./shopping-cart2.css";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import { Button } from "react-bootstrap";

const TAX_RATE = 0.07;

const useStyles = makeStyles({
  table: {
    minWidth: 700
  }
});

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(desc, price) {
  return { desc, price };
}

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const orders = [
  {
    orderName: "طلب ١",
    orderPrice: 19.99
  },
  {
    orderName: "طلب ٢",
    orderPrice: 29.99
  },
  {
    orderName: "طلب ٣",
    orderPrice: 39.99
  }
];

/*const rows = [];

orders.map((order)=>{
    rows.push(createRow(order.orderName, order.orderPrice) );
}*/

const rows = [
  createRow(orders[0].orderName, orders[0].orderPrice),
  createRow(orders[1].orderName, orders[1].orderPrice),
  createRow(orders[2].orderName, orders[2].orderPrice)
];

const invoiceSubtotal = subtotal(rows);
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
const invoiceTotal = invoiceTaxes + invoiceSubtotal;

export default function SpanningTable() {
  const classes = useStyles();

  const setHeight = rows => {
    if (rows <= 2) {
      document.getElementById("shopping-cart-container").style.height = "100vh";
    }
  };

  return (
    <div id="shopping-cart-container">
      <TableContainer component={Paper} id="cart-container">
        <div id="cart-title"> عــربــة الطلبات</div>
        <div id="cart-table">
          <Table className={classes.table} aria-label="spanning table">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell id="cart-row-title" align="left">
                  السعر
                </TableCell>
                <TableCell id="cart-row-title" align="right" colSpan={3}>
                  الطلب
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <TableRow key={row.desc}>
                  <TableCell id="cart-row">
                    <button id="delete-button">
                      <DeleteOutlinedIcon />
                    </button>
                  </TableCell>
                  <TableCell id="cart-row" align="left">
                    {ccyFormat(row.price)}
                  </TableCell>
                  <TableCell id="cart-row" align="right" colSpan={3}>
                    {row.desc}
                  </TableCell>
                  {/*<TableCell id="cart-row" align="right">
                  {row.qty}
            </TableCell>*/}
                  {/*setHeight(rows.length)*/}
                </TableRow>
              ))}

              <TableRow id="start-total-rows">
                <TableCell id="end-total-rows" rowSpan={3} />
                <TableCell id="cart-row" align="left">
                  {ccyFormat(invoiceSubtotal)}
                </TableCell>
                <TableCell
                  id="cart-row"
                  align="right"
                  colSpan={3}
                  style={{ fontWeight: "bold" }}
                >
                  الإجمالي قبل الضريبة
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell id="cart-row" align="left">
                  {ccyFormat(invoiceTaxes)}
                </TableCell>
                <TableCell id="cart-row" align="center">{`${(
                  TAX_RATE * 100
                ).toFixed(0)} %`}</TableCell>
                <TableCell
                  id="cart-row"
                  align="right"
                  style={{ fontWeight: "bold" }}
                >
                  الضريبة المضافة
                </TableCell>
              </TableRow>
              <TableRow id="end-total-rows">
                <TableCell
                  id="cart-row"
                  align="left"
                  style={{ fontWeight: "bold" }}
                >
                  {ccyFormat(invoiceTotal)}
                </TableCell>
                <TableCell
                  id="cart-row"
                  align="right"
                  colSpan={3}
                  style={{ fontWeight: "bold" }}
                >
                  الإجمالي
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <button id="checkout-button" class="btn btn-success">
          الدفع
        </button>
      </TableContainer>
    </div>
  );
}
