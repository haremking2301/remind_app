import React, { useEffect, useRef, useState } from 'react'
import '../input/style.scss';
import api from '../../api/api';

function Input2(props) {
    const [isValid, setIsValid] = useState(false)
    const [isValidDay, setIsValidDay] = useState(false)

    const daymission = new Date(props.dayMission)
    const daymissionz = `${daymission.getDate() + daymission.getMonth() + daymission.getFullYear()}`
    const daymissionzn = Number(daymissionz)
    console.log(daymissionzn);
    
    const dayNow = new Date()
    const dayz = `${dayNow.getDate() + dayNow.getMonth() + dayNow.getFullYear()}`
    const dayzn = Number(dayz)
    console.log(dayz);

    const inputRef = useRef()

    const done = async function () {
        const datadone = props.allMission.filter((mission) => {
            const day2 = new Date(mission.day)
            const day2z = `${day2.getDate() + day2.getMonth() + day2.getFullYear()}`
            const day2zn = Number(day2z)
            console.log(day2zn)
            return day2zn === dayzn
        })

        const datadone2 = datadone.map((mission) => {
            mission.done = true;
            return mission
        })
        const zzz = async function() {
            datadone2.map(function(item) {
                return api.patchmission(item, item.id)
            })
        }
        zzz()
    }

    useEffect(() => {
        done()
    }, [props.allMission])

    const handleSumit = async () => {
        if (props.mission === '') {
            setIsValid(true)
        } else {
            setIsValid(false)
        }
        if (daymissionzn < dayzn || props.dayMission === '') {
            setIsValidDay(true)
        } else {
            setIsValidDay(false)
        }
        if (props.mission !== '' && daymissionzn >= dayzn) {
            await api.postmission({
                id: Math.random(),
                title: props.mission,
                day: props.dayMission,
                done: false
            })
            await props.getmis();
            setIsValid(false)
            setIsValidDay(false)
            props.setMission('')
            done()
            inputRef.current.focus()
        }
    }

    return (
        <div className='main1'>
            <div className='in1'>
                <div>Nội dung:</div>
                <input 
                    ref={inputRef}
                    type='text' 
                    placeholder='Nhập nội dung'
                    value={props.mission}
                    onChange={function(e) {
                        props.setMission(e.target.value);
                    }}
                >
                </input>
            </div>
            <div className='in2'>
                <div>Ngày nhắc:</div>
                <input
                    type='date' 
                    placeholder='Nhập ngày'
                    value={props.dayMission}
                    onChange={function(e) {
                        props.setDayMission(e.target.value);
                    }}
                ></input>
                <button
                    className='submit'
                    onClick={handleSumit}
                >Lưu ngày
                </button>
            </div>
            <div className={'valid1 ' + (isValid ? 'valid' : '')}>Vui lòng nhập nội dung</div>
            <div className={'valid2 ' + (isValidDay ? 'valid' : '')}>Ngày chọn không hợp lệ</div>
        </div>
    )
}

export default Input2