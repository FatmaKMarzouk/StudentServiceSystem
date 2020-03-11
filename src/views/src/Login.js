import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Button, Form, FormGroup, Label, Input } from 'reactstrap';

function Login() {
  return (
    <div className="login-body">
    <div className="top-nav">
    </div>
    <div>
    <Form className="login-form">
      <h1 id="header">تسجيل دخول</h1>
      <FormGroup>
        <Label className="label">اسم المستخدم</Label>
        <Input className="input" type="username"></Input>
        <span class="fa fa-user icon"></span>
      </FormGroup>
      <FormGroup>
        <Label className="label">كلمة المرور</Label>
        <Input className="input" type="password"></Input>
        <span class="fa fa-lock icon"></span>
      </FormGroup>
      <Label> 
      <Input id="radio" type="radio" name="select" value="secretary">
      </Input>شئون الطلبة</Label>
      <Label>
      <Input id="radio" type="radio" name="select" value="student">
      </Input>طالب</Label>
      <Button className="btn-lg btn-block" id="button" >الدخول</Button>
    </Form>
    </div>
    <div className="bottom-nav">
    </div>
    </div>
  );
}

export default Login;
