import Task from './Task'

const Tasks = ({tasks, onDelete, onRemind}) => {
    return (
        <>
            {tasks.map((task, index) => (
                <Task key={index} task={task} onDelete={onDelete} onRemind={onRemind} />
            ))}
        </>
    )
}

export default Tasks
