import React from 'react';

import { Card, Form, Select } from 'antd';


const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Select.Option key={i.toString(36) + i}>{i.toString(36) + i}</Select.Option>);
}

function handleChange(value) {
  console.log(`selected ${value}`);
}


class Property extends React.Component {
    render() {
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
        };

        const cardStyle = {
            background: 'inherit', 
            width: '100%' 
        };

        return (
            <div id="property">
                <Card title="属性" bordered={false} style={ cardStyle }>
                <Form {...formItemLayout}>
                    <Form.Item label="行字段">
                        <Select
                            mode="multiple"
                            style={{ width: '100%' }}
                            defaultValue={['a10', 'c12']}
                            onChange={handleChange}
                            >
                            {children}
                        </Select>
                    </Form.Item>
                    <Form.Item label="数据字段">
                        <Select
                            mode="multiple"
                            style={{ width: '100%' }}
                            defaultValue={['a10', 'c12']}
                            onChange={handleChange}
                            >
                            {children}
                        </Select>
                    </Form.Item>
                </Form>
                </Card>
            </div>
        );
    }
}

export default Property;
