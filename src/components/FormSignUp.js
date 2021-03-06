import { signup } from "../service";
import React, { Component } from "react";
import { Form, Input, Button } from "antd";

class FormSignUp extends Component {
  state = {
    email: "",
    password: "",
    isError: false
  };

  /* Submit form */
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        signup(values).then(res => {
          if (res.statusCode === 400) {
            this.props.error(res.message);
          } else {
            this.props.success(res.message);
          }
        });
      }
    });
    this.props.form.resetFields();
    this.props.closeModal();
  };
  /*Compare password */
  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };

    return (
      <Form
        {...formItemLayout}
        onSubmit={this.handleSubmit.bind(this)}
        id="register"
      >
        <Form.Item label="E-mail">
          {getFieldDecorator("email", {
            rules: [
              {
                required: true,
                message: "Please input your E-mail!"
              },
              {
                type: "email",
                message: "The input is not valid E-mail!"
              },
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Password" hasFeedback>
          {getFieldDecorator("password", {
            rules: [
              {
                required: true,
                message: "Please input your password!"
              },
              {
                min: 6,
                message: "Password must be longer than 6 characters!"
              },
              {
                validator: this.validateToNextPassword
              }
            ]
          })(<Input.Password />)}
        </Form.Item>
        <Form.Item label="Confirm Password" hasFeedback>
          {getFieldDecorator("confirm", {
            rules: [
              {
                required: true,
                message: "Please confirm your password!"
              },
              {
                min: 6,
                message: "Password must be longer than 6 characters!"
              },
              {
                validator: this.compareToFirstPassword
              }
            ]
          })(<Input.Password onBlur={this.handleConfirmBlur} />)}
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form>
    );
  }
}
FormSignUp = Form.create({ name: "register" })(FormSignUp);
export default FormSignUp;
