pragma solidity >=0.4.22 <0.9.0;

contract Tododapp {
    struct Task {
        bool completed;
        string task;
    }

    mapping(address => Task[]) public Users;

    function addTask(string memory _task) external {
        Users[msg.sender].push(Task({task: _task, completed: false}));
    }

    function getTask(uint256 _index) external view returns (Task memory) {
        Task memory task = Users[msg.sender][_index];
        return task;
    }

    function updateTask(uint256 _index, bool _status) external {
        Users[msg.sender][_index].completed = _status;
    }

    function isDone(uint256 _index) external {
        delete Users[msg.sender][_index];
    }

    function totalTasks() external view returns (uint256) {
        return Users[msg.sender].length;
    }
}
