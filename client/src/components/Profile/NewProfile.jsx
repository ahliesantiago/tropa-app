/*
 * This component will guide the new user to complete their profile.
 * The user will be brought to this page when they first sign-in
 * and will not be able to move past this page until they complete it.
 */

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
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

const NewProfile = () => {
  const [nickname, setNickname] = useState('');
  const [location, setLocation] = useState('');
  const [gender, setGender] = useState('');

  const handleEditUser = (e) => {
    e.preventDefault();
    console.log("edit user");
  }

  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

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
        <h2>Before you can start connecting, please complete your profile...</h2>
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
          <Form.Item label="Nickname" name="nickname"
            rules={[{ required: true, message: "Please input your nickname" }]}
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
          <Form.Item label="Location" name="location">
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16, }}>
            <Button type="primary" htmlType="submit" onClick={handleEditUser}>Proceed</Button>
          </Form.Item>
        </Form>
      </ConfigProvider>
    </>
  )
}

export default NewProfile