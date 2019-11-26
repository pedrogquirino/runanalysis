import React from 'react';
import useGlobal from '../hooks/store'
import extractPoints from '../utils/File';
import Graph from './Graph';
import {filterByDistance, calculatePaceAverage, calculateSpeedAverage} from '../utils/Coordinates';


const GraphView = () => {

  const [globalState, globalActions] = useGlobal();  

  const inputAverage = React.createRef();

  const updateChartData = () => {    
    
    var CoordinatesData = {
      data: filterByDistance(extractPoints(),parseFloat(inputAverage.current.value)),
      paceAverage: calculatePaceAverage(filterByDistance(extractPoints(),parseFloat(inputAverage.current.value))),
      speedAverage: calculateSpeedAverage(filterByDistance(extractPoints(),parseFloat(inputAverage.current.value))),
    }
    globalActions.setCoordinatesData(CoordinatesData);
  }

  return (
      <div>
          <div>
            <input ref={inputAverage}></input>
            <button onClick={updateChartData}>Processar</button>
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
