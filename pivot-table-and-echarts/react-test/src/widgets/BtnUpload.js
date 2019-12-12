import React from 'react';

import { Upload, message, Button, Icon } from 'antd';

class BtnUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  customRequest(e) {
    let file = e.file,
        reader = new FileReader();
    if(file && /\.csv/gi.test(file.name)) {
      reader.readAsText(file);
      reader.onload = () => {
        let originalData = reader.result;
        originalData = originalData.replace(/\r\n?/g, '\n');
        let rows = originalData.split('\n');
        let col = rows[0].split(';'); //第一行当做表头
        console.log(originalData);
      };
    } else {
      message.error(`未能解析文件`);
    }
  }

  render() {
    return (
    <Upload customRequest={this.customRequest} showUploadList={false}>
        <Button><Icon type="upload" /> 选择csv文件</Button>
    </Upload>
    );
  }
}

export default BtnUpload;
