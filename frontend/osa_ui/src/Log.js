import React from 'react';

/*
Input: logs stored
Ouptut: Displays the communication logs in a scrollable area
*/
const Log = (props) => {
  // css styling for the scrollable area 
  const scrollStyleDiv = {
    background: '#b2beb5',
    color: '#198754',
    padding: '15px',
    width: '100%',
    height: '100%',
    overflowY: 'scroll',
    border: '1px solid #ccc',
    fontSize: '1.2em',
    textAlign: 'left'
  }

  return (
    <div style={scrollStyleDiv}>
      <span>Communication logs between Instrument and User</span>
      {
        /* loops over the log object */
        props.logs.map(log => {
          return (
            <>
              <span key={log.timestamp}>{log.timestamp} : {log.action}</span>
            </>
          );
        })
      }
    </div>
  );
}

export default Log;
