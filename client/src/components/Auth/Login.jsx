import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {
  Button,
  Checkbox,
  ConfigProvider,
  Form,
  Input
} from 'antd'

const Login = ({ setAction }) => {
  const navigate = useNavigate()
  
  const [loginMode, setLoginMode] = useState('')
  const [password, setPassword] = useState('')

  const onFinish = (values) => {
    console.log('Success:', values)
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  const handleSignin = (e) => {
    e.preventDefault()
    axios.post('http://localhost:8080/users/login', {
      loginMode,
      password
    })
    .then((response) => {
      // console.log('username', response.data.username)
      localStorage.setItem('username', response.data.username)
      if(response.data.isComplete){
        navigate('/dashboard')
      }else{
        navigate('/new-user')
      }
      // else navigate to dashboard
    })
    .catch((error) => {
      alert("Error signing in.")
      console.log(error)
    })
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
        >
          <Form.Item label="Username or Email" name="loginMode"
            rules={[{ required: true, message: "Please input your username or email address" }]}
          >
            <Input onChange={(e) => setLoginMode(e.target.value)} />
          </Form.Item>

          <Form.Item label="Password" name="password"
            rules={[{ required: true, message: "Please input your password" }]}
          >
            <Input.Password onChange={(e) => setPassword(e.target.value)} />
            <Link onClick={() => setAction('reset')}>Forgot password?</Link>
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit"
              onClick={handleSignin}
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </ConfigProvider>
    </>
  )
}

export default Login