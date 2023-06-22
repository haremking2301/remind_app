import {useEffect, useState } from 'react';
import './App.scss';
import Input2 from './component/input';
import Output2 from './component/output';
import api from './api/api';

function App() {
  const [mission, setMission] = useState('')
  const [dayMission, setDayMission] = useState('')
  const [allMission, setAllMission] = useState([])

  const getmis = async function() {
    const data = await api.getmission()
    setAllMission(data.data)
  };

  useEffect(function() {
    getmis()
  }, [])

  return (
    <div className="App">
      <div className="container">
        <h1>Nhắc nhở ngày quan trọng của bạn</h1>
        <div className="main">
          <Input2 
            mission={mission} 
            setMission={setMission}
            dayMission={dayMission}
            setDayMission={setDayMission}
            getmis={getmis}
            allMission={allMission}
          >
          </Input2>
          <div className='out2'>
            {allMission.map(function(mission, index){
              return <Output2 
                key={index}
                id={mission.id}
                title={mission.title}
                day={mission.day}
                isDone={mission.done}
                get={setAllMission}
                >
              </Output2>
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
