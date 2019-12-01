import React from 'react';
import useGlobal from '../hooks/store'
import extractPoints from '../utils/File';
import Graph from './Graph';
import {filterByDistance, calculatePaceAverage, calculateSpeedAverage} from '../utils/Coordinates';
import { Button, Input, Icon, Form} from 'antd';
import 'antd/dist/antd.css';

const GraphView = () => {

  const [globalState, globalActions] = useGlobal();  

  var inputAverage = "";

  const setInputAverage = (e) => {    
    inputAverage = e.target.value;    
  }

  const updateChartData = () => {    

    var CoordinatesData = {
      data: filterByDistance(extractPoints(),parseFloat(inputAverage)),
      paceAverage: calculatePaceAverage(filterByDistance(extractPoints(),parseFloat(inputAverage))),
      speedAverage: calculateSpeedAverage(filterByDistance(extractPoints(),parseFloat(inputAverage))),
    }
    globalActions.setCoordinatesData(CoordinatesData);
  }

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 2 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 2,
      },
    },
  };
  
  return (
      <div>
          <div>    
            <Form {...formItemLayout}>
              <Form.Item label="Point distance"> 
                <Input onChange={setInputAverage} style={{ width: '10%' }} />                  
              </Form.Item>  
              <Form.Item {...tailFormItemLayout}>
                <Button 
                  type="primary" 
                  onClick={updateChartData}>
                  <Icon type="area-chart" />
                  Graph
                </Button>  
              </Form.Item>  
            </Form>        
           
            
          </div>
          <div>
            <h5>Pace: { globalState.coordinatesData.paceAverage } min/km</h5>
            <h5>Speed: { globalState.coordinatesData.speedAverage } km/h</h5>

          </div>
          <Graph data={globalState.coordinatesData.data} />
      </div>
  );

}
export default GraphView;
