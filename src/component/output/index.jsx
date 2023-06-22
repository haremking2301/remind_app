import '../output/style.scss';
import React, { memo } from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css';
import api from '../../api/api';


function Output2(props) {
    if(props.isDone) {
        alert(props.title);
    }

    const handleDelete = async function() {
        await api.deletemission(props.id)
        const data = await api.getmission()
        props.get(data.data)
    }
    return (
        <div className={'task ' + (props.isDone ? 'done' : '')}>
            <div>
                <p className='task__head'>{props.day}</p>
                <p>{props.title}</p>
            </div>
            <button>
                <i 
                onClick={handleDelete}
                className="fa-regular fa-circle-xmark"
                ></i>
            </button>
        </div>
    )
}

export default memo((Output2))
