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

  useEffect(() => {
    const loadNumberTask = async () => {
      const { contract } = web3Api
      const _totalTasks = await contract?.totalTasks().then((task) => {
        return task.toNumber()
      })
      setTotalTasks(_totalTasks)
    }
    web3Api && loadNumberTask()
  }, [web3Api])

  useEffect(() => {
    if (totalTasks > 0) {
      const { contract } = web3Api
      let i = 0
      while (i < totalTasks) {
        // eslint-disable-next-line no-loop-func
        const fetchTask = async () => {
          const task = await contract.getTask(i)
          setTasks((state) => [...state, task])
        }
        fetchTask()
        i++
      }
    }
  }, [totalTasks])

  return (
    <>
      <div>Total Tasks: {totalTasks}</div>
      {tasks.map((task, index) => (
        <div key={index}>{task[1]}</div>
      ))}
      <div>
        <input
          type='text'
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        ></input>
        <button onClick={submitTask}>Add Task</button>
        {newTask}
      </div>
    </>
  )
}

export default Task
