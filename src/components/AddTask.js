import { useState } from "react"

const AddTask = ({ onAdd }) => {
    const [name, setName] = useState('')
    const [day, setDay] = useState('')
    const [reminder, setReminder] = useState(false)

    const submitTask = (e) => {
        e.preventDefault()
        if (!name || !day) {
            alert(`Missing 'name' or 'Day`);
        }
        onAdd({name, day, reminder})
        setName('')
        setDay('')
        setReminder(false)
    }

    return (
        <form className='add-form' onSubmit={submitTask}>
            <div className='form-control'>
                <label>Task</label>
                <input value={name} onChange={(e) => setName(e.target.value)}
                type='name' placeholder='Add Task' />
            </div>
            <div className='form-control'>
                <label>Day & Time</label>
                <input value={day} onChange={(e) => setDay(e.target.value)}
                type='name' placeholder='Add Day & Time' />
            </div>
            <div className='form-control form-control-check'>
                <label>Set Reminder</label>
                <input value={reminder} onChange={(e) => setReminder(e.currentTarget.checked)} type='checkbox' />
            </div>

            <input className='btn btn-block' type='submit' value='Save Task' />
        </form>
    )
}

export default AddTask
