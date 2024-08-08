import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Checkbox,
  ConfigProvider,
  DatePicker,
  Form,
  Input,
  Select
} from 'antd';
const { Option } = Select;

import '../../assets/styles/Auth.css';

const onFinish = (values) => {
  console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const Auth = () => {
  const [action, setAction] = useState('register');
  
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
        name="basic"
        labelCol={{ span: 8 }}
        labelWrap
        wrapperCol={{ span: 16 }}
        style={{
          maxWidth: 600,
          margin: '20px',
        }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        action={
          action === 'register' ? "/adduser" : "/checkuser"
        }
        method="POST"
        labelAlign="left"
        itemMarginBottom="10px"
      >
        { action === 'register' && (
          <>
          <Form.Item label="First Name" name="firstName"
            rules={[{ required: true, message: "Please input your first name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Last Name" name="lastName"
            rules={[{ required: true, message: "Please input your last name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Nickname" name="nickname"
            rules={[{ required: true, message: "Please input your nickname" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Location" name="location"
            rules={[{ required: true, message: "Please input your location" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Gender" name="gender"
            rules={[{ required: true, message: "Please input your gender" }]}
          >
            <Select
              placeholder="Select how you identify"
              // onChange={onGenderChange}
              allowClear
            >
              <Option value="Male">Male</Option>
              <Option value="Female">Female</Option>
              <Option value="Trans">Trans</Option>
              <Option value="Genderqueer">Genderqueer</Option>
              <Option value="Other">Other</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Birthday" name="birthday"
            rules={[{ required: true, message: "Please input your birthday (You need to be at least 18 years old to join)" }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item label="Email Address" name="emailAddress"
            rules={[{ required: true, type: 'email', message: "Please input a valid email address" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Phone number" name="phoneNumber"
            rules={[{ required: true, message: "Please input a valid phone number" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Username" name="username"
            rules={[{ required: true, message: "Please input your username" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Location" name="location"
            rules={[{ required: true, message: "Please input your location" }]}
          >
            <Input />
          </Form.Item>
          </>
        )}

        {action === 'login' || action === 'reset' && (
          <Form.Item label="Username or Email" name="loginMode"
            rules={[{ required: true, message: "Please input your username or email address" }]}
          >
            <Input />
          </Form.Item>
        )}

        {action !== 'reset' && (
          <Form.Item label="Password" name="password"
          rules={[{ required: true, message: "Please input your password" }]}
        >
          <Input.Password />
          {action === 'login' && (
            <Link onClick={() => setAction('reset')}>Forgot password?</Link>
          )}
        </Form.Item>
        )}

        {action === 'login' && (
          <>
          <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          </>
        )}

        {action === 'register' && (
          <Form.Item label="Confirm Password" name="confirmPassword"
            rules={[{ required: true, message: "Please confirm your password" }]}
          >
            <Input.Password />
          </Form.Item>
        )}

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
          {action === 'register' && 'Register'}
          {action === 'login' && 'Login'}
          {action === 'reset' && 'Request password reset'}
          </Button>
        </Form.Item>

        {action === 'login' && (
          <div className='text-center'>
            <Link onClick={() => setAction('register')}>No account yet? Register here.</Link>
          </div>
        )}
        {action === 'register' && (
          <div className='text-center'>
            <Link onClick={() => setAction('login')}>Already have an account? Sign-in here.</Link>
          </div>
        )}
      </Form>
    </ConfigProvider>
  </>
  )
}

export default Auth