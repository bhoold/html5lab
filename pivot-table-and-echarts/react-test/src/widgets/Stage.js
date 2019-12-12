import React from 'react';

import { Card } from 'antd';
import echarts from 'echarts';


import Upload from './BtnUpload';
import StageChartList from '../containers/StageChartList'

class Stage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }


    render() {

        console.log(echarts)
        return (
            <div id="stage">
                <Upload />
                <div id="container">
                    <StageChartList />
                    <Card title="折线图" bordered={false}>
                        <div className="chart-wrap"></div>
                    </Card>
                </div>
            </div>
        );
    }
}

export default Stage;
