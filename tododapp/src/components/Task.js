import React, { useEffect, useState } from 'react'
import './Task.css'

const Task = ({ web3Api, account }) => {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')
  const [totalTasks, setTotalTasks] = useState()

  const submitTask = async () => {
    const { contract } = web3Api
    await contract.addTask(newTask, { from: account })
    setNewTask('')
    window.location.reload()
  }

  const updateTask = async (index, completed) => {
    const { contract } = web3Api
    await contract.updateTask(index, !completed, { from: account })
    window.location.reload()
  }

  const deleteTask = async (index) => {
    const { contract } = web3Api
    await contract.isDone(index, { from: account })
    window.location.reload()
  }

  useEffect(() => {
    const loadNumberTask = async () => {
      const { contract } = web3Api
      const _totalTasks = await contract?.totalTasks().then((task) => {
        return task.toNumber()
      })
      setTotalTasks(_totalTasks)
    }
    web3Api && account && loadNumberTask()
  }, [web3Api, account])

  useEffect(() => {
    if (totalTasks > 0) {
      const { contract } = web3Api
      let i = 0
      while (i < totalTasks) {
        // eslint-disable-next-line no-loop-func
        const fetchTask = async () => {
          const { completed, task } = await contract.getTask(i)
          setTasks((state) => [...state, { task, completed }])
        }
        fetchTask()
        i++
      }
    }
  }, [totalTasks, web3Api])
  console.log(tasks)
  return (
    <>
      <div className='card-container'>
        <div className='card'>
          <div className='header'> 🗒️ Todo</div>
          <div className='tasks-wrapper'>
            <div className='input-container'>
              <input
                className='task-input'
                type='text'
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
              ></input>
              <button className='btn' onClick={submitTask}>
                Add
              </button>
            </div>
            <div className='tasks'>
              {tasks.map(
                (task, index) =>
                  task.task !== '' && (
                    <div key={index} className='task'>
                      <div
                        className={
                          task.completed
                            ? 'strike task-content'
                            : 'task-content'
                        }
                      >
                        {task.task}
                      </div>
                      <div className='task-buttons'>
                        <button
                          className='btn'
                          onClick={() => updateTask(index, task.completed)}
                        >
                          {task.completed === false ? '❎' : '✅'}
                        </button>
                        <button
                          className='btn'
                          onClick={() => deleteTask(index)}
                        >
                          <i class='fa-solid fa-user'></i>
                        </button>
                      </div>
                    </div>
                  )
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Task
