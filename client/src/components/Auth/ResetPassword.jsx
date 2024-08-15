import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Button,
  ConfigProvider,
  Form,
  Input
} from 'antd';

const ResetPassword = () => {
  const [loginMode, setLoginMode] = useState('');

  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleReset = (e) => {
    e.preventDefault();
    console.log(loginMode);
  }

  return (
    <>
    <ConfigProvider
      theme={{
        components: {
          Form: {
            itemMarginBottom: 10,
          },
        },
      }}
    >
      <Form
        className='authForms'
        name="basic"
        labelCol={{ span: 8 }}
        labelWrap
        wrapperCol={{ span: 16 }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        labelAlign="left"
        itemMarginBottom="10px"
      >
        <Form.Item label="Username or Email" name="loginMode"
          rules={[{ required: true, message: "Please input your username or email address" }]}
        >
          <Input onChange={(e) => setLoginMode(e.target.value)} />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit" onClick={handleReset}>
            Request password reset
          </Button>
        </Form.Item>
      </Form>
    </ConfigProvider>
  </>
  )
}

export default ResetPassword