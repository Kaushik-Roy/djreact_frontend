
import React from 'react';
import axios from 'axios';
import { Form, Input, Button } from 'antd';

const FormItem = Form.Item;

class CustomForm extends React.Component {

    handleFormSubmit = (event, requestType, articleID) => {

      // event.preventDefault();
      const title   = event.target.elements.title.value;
      const content = event.target.elements.content.value;

      switch ( requestType ) {

          // Create
          case 'post':
              
              return axios.post('http://127.0.0.1:8000/api/', {
                  title: title,
                  content: content
              })
              .then(response => console.log(response))
              .catch(error => console.log(error));

          // Updated    
          case 'put':
              
              return axios.put(`http://127.0.0.1:8000/api/${articleID}/`, {
                  title: title,
                  content: content
              })
              .then(response => console.log(response))
              .catch(error => console.log(error));

          default:
            return {
              title: title,
              content: content
            }
      }

    }

    render() {

      return (
        <div>
          <Form onSubmit={ (event) => this.handleFormSubmit(
            event,
            this.props.requestType,
            this.props.articleID )}>

            <FormItem label="Title">
              <Input name="title" placeholder="enter a title" />
            </FormItem>
            <FormItem label="Description">
              <Input name="content" placeholder="write a description" />
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit">{this.props.btnText}</Button>
            </FormItem>
          </Form>
        </div>
      );
    }
}

export default CustomForm;