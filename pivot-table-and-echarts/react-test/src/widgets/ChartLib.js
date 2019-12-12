import React from 'react';

import PropTypes from 'prop-types';

import { Card, Button } from 'antd';


const list = [
    { type: 'line', title: '折线图', img: 'https://www.echartsjs.com/examples/data/thumb/line-simple.jpg' },
    { type: 'bar', title: '柱状图', img: 'https://www.echartsjs.com/examples/data/thumb/bar-tick-align.jpg' },
    { type: 'pie', title: '饼图', img: 'https://www.echartsjs.com/examples/data/thumb/pie-doughnut.jpg' },
    { type: 'pivot', title: '透视表', img: 'https://www.echartsjs.com/examples/data/thumb/pictorialBar-dotted.jpg' }
];

const Chart = ({ onMousedown, img, title }) => (
    <div className="item" onMousedown={onMousedown}>
        <img src={img} alt={title}/>
        <p>{title}</p>
    </div>
)
  
Chart.propTypes = {
    onMousedown: PropTypes.func.isRequired,
    img: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
}


class ChartLib extends React.Component {

    render() {
        const cardStyle = {
            background: 'inherit', 
            width: '100%' 
        };

        const cardGridProps = {
            hoverable: false,
            style: {
                margin: '1em',
                padding: 0,
                width: '80px',
                textAlign: 'center',
                boxShadow: 'none'
            }
        }

        return (
            <div id="charts">
                <Card title="图表库" bordered={false} style={ cardStyle }>
                <Card.Grid {...cardGridProps}>
                    <img src="https://www.echartsjs.com/examples/data/thumb/line-simple.jpg" alt="折线图"/>
                    <p>折线图</p>
                </Card.Grid>
                <Card.Grid {...cardGridProps}>
                    <img src="https://www.echartsjs.com/examples/data/thumb/line-simple.jpg" alt="折线图"/>
                    <p>折线图</p>
                </Card.Grid>
                </Card>
                <Button type="primary">添加</Button>
            </div>
        );
    }
}

export default ChartLib;
