import React, { useEffect, useState } from 'react'

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
      {tasks.map(
        (task, index) =>
          task.task !== '' && (
            <div key={index}>
              <div>
                {task.task}
                <button onClick={() => updateTask(index, task.completed)}>
                  {task.completed === false ? '❎' : '✅'}
                </button>
                <button onClick={() => deleteTask(index)}>X</button>
              </div>
            </div>
          )
      )}
      <div>
        <input
          type='text'
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        ></input>
        <button onClick={submitTask}>Add Task</button>
      </div>
    </>
  )
}

export default Task
