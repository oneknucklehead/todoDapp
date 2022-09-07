import React, { useEffect, useState } from 'react'
import './Task.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons'

const Task = ({ web3Api, account, err, setErr }) => {
  const [tasks, setTasks] = useState([])
  const [tasksCopy, setTasksCopy] = useState([])
  const [newTask, setNewTask] = useState('')
  const [totalTasks, setTotalTasks] = useState()

  const submitTask = async () => {
    const { contract } = web3Api
    try {
      await contract.addTask(newTask, { from: account })
      setNewTask('')
      setErr('')
      window.location.reload()
    } catch (error) {
      console.error(error.message)
      setErr(error.message)
    }
  }

  const updateTask = async (index, completed) => {
    const { contract } = web3Api
    try {
      await contract.updateTask(index, !completed, { from: account })

      window.location.reload()
    } catch (error) {
      console.error(error.message)
      setErr(error.message)
    }
  }

  const filter = (get) => {
    setTasksCopy(JSON.parse(JSON.stringify(tasks)))
    var newarr = tasksCopy
    if (get === 'complete') {
      newarr = tasksCopy.filter((task) => task.completed)
      setTasksCopy(newarr)
    }
    if (get === 'incomplete') {
      newarr = tasksCopy.filter((task) => !task.completed)
      setTasksCopy(newarr)
    }
    if (get === 'all') {
      setTasksCopy(JSON.parse(JSON.stringify(tasks)))
    }
  }

  const deleteTask = async (index) => {
    const { contract } = web3Api
    try {
      await contract.isDone(index, { from: account })
      window.location.reload()
    } catch (error) {
      console.error(error.message)
      setErr(error.message)
    }
  }

  useEffect(() => {
    const loadNumberTask = async () => {
      const { contract } = web3Api
      try {
        const _totalTasks = await contract?.totalTasks().then((task) => {
          return task.toNumber()
        })
        setTotalTasks(_totalTasks)
      } catch (error) {
        console.error(error.message)
        setErr(error.message)
      }
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
          // setTasksCopy((state) => [...state, { task, completed }])
        }
        fetchTask()
        i++
      }
    }
  }, [totalTasks, web3Api])
  return (
    <>
      <div className='filter-container'>
        <div className='filter'>
          <button className='btn' onClick={() => filter('all')}>
            All
          </button>
          <button className='btn' onClick={() => filter('complete')}>
            Complete
          </button>
          <button className='btn' onClick={() => filter('incomplete')}>
            Incomplete
          </button>
        </div>
      </div>
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
              <button
                className='btn'
                onClick={submitTask}
                disabled={account ? false : true}
              >
                Add
              </button>
            </div>
            {err && <span className='err'>{err}</span>}
            <div className='tasks'>
              {tasksCopy.map(
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
                          className='btn circle'
                          onClick={() => updateTask(index, task.completed)}
                        >
                          {task.completed === false ? (
                            <FontAwesomeIcon icon={faCheck} />
                          ) : (
                            <FontAwesomeIcon icon={faXmark} />
                          )}
                        </button>
                        <button
                          className='btn circle'
                          onClick={() => deleteTask(index)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
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
