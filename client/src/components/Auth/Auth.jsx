import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Button,
  Checkbox,
  ConfigProvider,
  DatePicker,
  Form,
  Input
} from 'antd';

import '../../assets/styles/Auth.css';

const Auth = () => {
  const navigate = useNavigate();
  const [action, setAction] = useState('register');

  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [birthday, setBirthday] = useState('');
  const [loginMode, setLoginMode] = useState('');

  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  
  useEffect(() => {
    console.log("testing. useEffect mounted");
  }, []);

  const handleAddUser = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/users/new', {
      isAdmin: false,
      username,
      firstName,
      lastName,
      emailAddress,
      password,
      birthday,
    })
    .then(() => {
      navigate('/new-user')
    })
    .catch((error) => {
      alert("Error signing up.");
      console.log(error);
    })
  }

  const handleSignin = (e) => {
    e.preventDefault();
    console.log("sign in");
  }

  const handleReset = (e) => {
    e.preventDefault();
    console.log("reset password");
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
        { action === 'register' && (
          <>
          <Form.Item label="First Name" name="firstName"
            rules={[{ required: true, message: "Please input your first name" }]}
          >
            <Input onChange={(e) => setFirstName(e.target.value)} />
          </Form.Item>
          <Form.Item label="Last Name" name="lastName"
            rules={[{ required: true, message: "Please input your last name" }]}
          >
            <Input onChange={(e) => setLastName(e.target.value)} />
          </Form.Item>
          <Form.Item label="Birthday" name="birthday"
            rules={[{ required: true, message: "Please input your birthday (You need to be at least 18 years old to join)" }]}
          >
            <DatePicker onChange={(value) => setBirthday(value)} />
          </Form.Item>
          <Form.Item label="Email Address" name="emailAddress"
            rules={[{ required: true, type: 'email', message: "Please input a valid email address" }]}
          >
            <Input onChange={(e) => setEmailAddress(e.target.value)} />
          </Form.Item>
          <Form.Item label="Username" name="username"
            rules={[{ required: true, message: "Please input your username" }]}
          >
            <Input onChange={(e) => setUsername(e.target.value)} />
          </Form.Item>
          </>
        )}

        {action === 'login' || action === 'reset' && (
          <Form.Item label="Username or Email" name="loginMode"
            rules={[{ required: true, message: "Please input your username or email address" }]}
          >
            <Input onChange={(e) => setLoginMode(e.target.value)} />
          </Form.Item>
        )}

        {action !== 'reset' && (
          <Form.Item label="Password" name="password"
          rules={[{ required: true, message: "Please input your password" }]}
        >
          <Input.Password onChange={(e) => setPassword(e.target.value)} />
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
          <Button type="primary" htmlType="submit"
            onClick={
              action === 'register'
                ? handleAddUser
                : action === 'login'
                ? handleSignin
                : handleReset
            }
          >
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