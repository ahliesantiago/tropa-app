import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {
  Button,
  ConfigProvider,
  DatePicker,
  Form,
  Input
} from 'antd'

const Register = () => {
  const navigate = useNavigate()
  
  const [username, setUsername] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [birthday, setBirthday] = useState('')

  const onFinish = (values) => {
    console.log('Success:', values)
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  const handleAddUser = (e) => {
    e.preventDefault()
    axios.post('http://localhost:8080/users/new', {
      isAdmin: false,
      username,
      firstName,
      lastName,
      emailAddress,
      password,
      birthday,
    })
    .then((response) => {
      localStorage.setItem('username', response.data.username)
      navigate('/new-user')
      console.log(response)
    })
    .catch((error) => {
      alert("Error signing up.")
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

        <Form.Item label="Password" name="password"
          rules={[{ required: true, message: "Please input your password" }]}
        >
          <Input.Password onChange={(e) => setPassword(e.target.value)} />
        </Form.Item>

        <Form.Item label="Confirm Password" name="confirmPassword"
          rules={[{ required: true, message: "Please confirm your password" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit"
            onClick={handleAddUser}
          >
            Register
          </Button>
        </Form.Item>
      </Form>
    </ConfigProvider>
  </>
  )
}

export default Register