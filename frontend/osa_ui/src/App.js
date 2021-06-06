import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Chart from './Chart';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { saveAs } from 'file-saver';
import Search from './Search';
import Log from './Log';

function App() {
  const [intervalId, setIntervalId] = useState(null); // Stores the set interval id
  const [data, setData] = useState({}); // Stores the chart data 
  const [logs, setLogs] = useState([]); // Stores the logs of communication

  // Makes API request to get the chart data
  const getChartData = () => {
    axios.get('api/start')
      .then(res => {
        let xAxes = res.data.xValues;
        let yAxes = res.data.yValues;

        setData({
          labels: xAxes,
          datasets: [
            {
              label: res.data.timestamp,
              data: yAxes,
              fill: false,
              backgroundColor: "rgba(75,192,192,0.2)",
              borderColor: "rgba(75,192,192,1)"
            }
          ]
        })
      })
      .catch(err => console.log(err))
  }

  // Stores the logs
  const storeLog = (content) => {
    const log = [...logs];
    log.push(content);
    setLogs(log);
  }

  // To initiate continuous acquisition with 1Hz refresh rate
  const start = () => {
    console.log('The graph is in continuous acquisition state');
    storeLog({
      'action': 'started acquisition',
      'timestamp': new Date().toISOString()
    });
    const interval = setInterval(() => {
      getChartData();
    }, 1000);
    setIntervalId(interval)
  }

  // To stop the acquisition of data
  const stop = () => {
    console.log('The graph stopped the acquisition');
    storeLog({
      'action': 'stopped acquisition',
      'timestamp': new Date().toISOString()
    });
    return clearInterval(intervalId);
  }

  // Performs single acquisition
  const single = () => {
    console.log('The graph shows single trace of OSA');
    getChartData();
    storeLog({
      'action': 'single acquisition',
      'timestamp': new Date().toISOString()
    });
    return clearInterval(intervalId);
  }

  // Saves the plot image without overwriting previous saved plots
  const saveChart = () => {
    storeLog({
      'action': 'Saved the Graph',
      'timestamp': new Date().toISOString()
    });
    const chart = document.getElementsByTagName('canvas')[0];
    const time = new Date().getTime();
    chart.toBlob(blob => {
      saveAs(blob, 'OSA_Trace_' + time)
    });
  }

  // To render the charts data
  useEffect(() => {
    getChartData()
  }, [])

  return (
    <div className="App">
      <header>
        <div className="App-header">
          <h1>OSA Trace Graph</h1>
        </div>
      </header>
      <main>
        <Container fluid>
          <Row style={{ paddingBottom: '6px' }}>
            <Col xs={14} md={10}>
              <Chart id="chart" axis={data}></Chart>
              <Button onClick={start} variant="success" size="lg" block>START</Button>{'   '}
              <Button onClick={stop} variant="info" size="lg" block>SINGLE</Button>{'    '}
              <Button onClick={single} variant="danger" size="lg" block>STOP</Button>{'     '}
              <Button onClick={saveChart} variant="dark">SAVE</Button>
            </Col>
            <Col xs={4} md={2}>
              <Log logs={logs}></Log>
            </Col>
          </Row>
          <Row>
            <Search></Search>
          </Row>
        </Container>
      </main>
    </div>
  );
}

export default App;
