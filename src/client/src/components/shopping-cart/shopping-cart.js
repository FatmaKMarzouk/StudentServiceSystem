import React, { useState, useEffect } from "react";
import "./shopping-cart.css";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import Button from "@material-ui/core/Button";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import { getToken } from "../../Utils/Common";
import { cartApi, deleteCart } from "../../core/Apis";
import { useHistory } from "react-router-dom";
import StripeBtn from "../payment/stripeBtn";

const TAX_RATE = 0.07;

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function createRow(desc, price) {
  return { desc, price };
}

function subtotal(items) {
  return items
    .map(({ orderPrice }) => orderPrice)
    .reduce((sum, i) => sum + i, 0);
}

const orders = [
  {
    orderName: "طلب ١",
    orderPrice: 19.99,
  },
  {
    orderName: "طلب ٢",
    orderPrice: 29.99,
  },
  {
    orderName: "طلب ٣",
    orderPrice: 39.99,
  },
  {
    orderName: "طلب 4",
    orderPrice: 39.99,
  },
];

/*const rows = [];

orders.map((order)=>{
    rows.push(createRow(order.orderName, order.orderPrice) );
}

const rows = [
  createRow(orders[0].orderName, orders[0].orderPrice),
  createRow(orders[1].orderName, orders[1].orderPrice),
  createRow(orders[2].orderName, orders[2].orderPrice),
];*/

function getRequestName(requestName) {
  if (requestName == "Choose Program") return "اختيار البرنامج";
  else if (requestName == "Annual Fees") return "مصاريف عام";
  else if (requestName == "Student Card") return "الكارنيه الجامعي";
  else if (requestName == "Request Transcript") return "طلب ترانسكريبت المواد";
  else if (requestName == "Certificate of Enrollment") return "شهادة قيد";
}

export default function SpanningTable(props) {
  const classes = useStyles();
  const [orderss, setOrderss] = useState([]);
  const [deleteCount, setDeleteCount] = useState(0);

  const invoiceSubtotal = subtotal(orderss);
  const invoiceTaxes = TAX_RATE * invoiceSubtotal;
  const invoiceTotal = invoiceTaxes + invoiceSubtotal;

  console.log("haga habla gidan");

  useEffect(() => {
    const token = getToken();
    cartApi(token).then((data) => {
      if (!data.error) {
        console.log(data.total);
        sessionStorage.setItem("total", data.total);
        console.log(data);
        console.log("nhayet el data");
        const orderObjects = [];
        data.requests.map((order) => {
          const orderObject = {
            orderID: order.ID,
            orderName: order.ServiceName,
            orderPrice: order.Amount,
          };
          orderObjects.push(orderObject);
        });
        setOrderss(orderObjects);
      } else {
        setOrderss([]);
      }
    });
    console.log("HELLO");
  }, [deleteCount]);

  const handleDeleteRequest = (token, reqID) => {
    console.log("Request ID= " + reqID);
    console.log("Token= " + token);
    deleteCart(token, reqID).then(() => {
      setDeleteCount(deleteCount + 1);
    });
  };

  const handleCheckout = () => {
    props.history.push("/payment");
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
              {orderss.map((order) => {
                const reqID = order.orderID;
                const token = getToken();
                return (
                  <TableRow key={order.orderID}>
                    <TableCell id="cart-row">
                      <Button
                        id="delete-button"
                        onClick={() => handleDeleteRequest(token, reqID)}
                      >
                        <DeleteOutlinedIcon />
                      </Button>
                    </TableCell>
                    <TableCell id="cart-row" align="left">
                      {ccyFormat(order.orderPrice)}
                    </TableCell>
                    <TableCell id="cart-row" align="right" colSpan={3}>
                      {getRequestName(order.orderName)}
                    </TableCell>
                    {/*<TableCell id="cart-row" align="right">
                  {row.qty}
            </TableCell>*/}
                    {/*setHeight(rows.length)*/}
                  </TableRow>
                );
              })}

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
        <StripeBtn updateCart={() => setDeleteCount(deleteCount + 1)} />
        {/*<button
          id="checkout-button"
          className="btn btn-success"
          onClick={handleCheckout}
        >
          الدفع
        </button>*/}
      </TableContainer>
    </div>
  );
}
