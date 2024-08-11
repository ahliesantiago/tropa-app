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
  Select,
  Switch
} from 'antd';
const { Option } = Select;
const { TextArea } = Input;

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
        <h2 className="fs-3">Before you can start connecting, please complete your profile...</h2>
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
        >
          <Form.Item label="Nickname" name="nickname">
            <Input onChange={(e) => console.log(e.target.value)} placeholder="What should we call you?" />
          </Form.Item>
          <Form.Item label="Gender" name="gender"
            rules={[{ required: true, message: "Please input your gender" }]}
          >
            <Select
              placeholder="Select how you identify"
              onChange={(e) => console.log(e)}
              allowClear
            >
              <Option value="Male">Male</Option>
              <Option value="Female">Female</Option>
              <Option value="Trans">Trans</Option>
              <Option value="Genderqueer">Genderqueer</Option>
              <Option value="Other">Other</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Pronouns" name="pronouns">
            <Select
              placeholder="Select your pronouns"
              // onChange={onGenderChange}
              allowClear
            >
              <Option value="She/Her">She/Her</Option>
              <Option value="He/Him">He/Him</Option>
              <Option value="They/Them">They/Them</Option>
              <Option value="Other">Other</Option>
            </Select>
          </Form.Item>
          <Form.Item label="LGBT-friendly?" name="beliefIsLgbtFriendly" valuePropName="beliefIsLgbtFriendly">
            <Switch />
          </Form.Item>
          <Form.Item label="Location" name="location">
            <Input />
          </Form.Item>
          <Form.Item label="About" name="about">
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item label="Interests" name="interests">
            <Select
              mode="multiple"
              allowClear
              style={{
                width: '100%',
              }}
              placeholder="Please select at least 3 interests"
              defaultValue={[]}
              // onChange={handleInterestSelection}
              // options={options}
            />
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