pragma solidity >=0.4.22 <0.9.0;

contract Tododapp {
    constructor() {
        addTask("Your task looks like this");
    }

    uint256 public totalTask = 0;
    struct Task {
        uint256 id;
        bool completed;
        string task;
    }

    mapping(uint256 => Task) public tasks;

    function addTask(string memory _task) public {
        totalTask++;
        tasks[totalTask] = Task(totalTask, false, _task);
    }
}
