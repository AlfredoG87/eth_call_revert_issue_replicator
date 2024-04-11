// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DummyContract {
    struct DummyData {
        address addr1;
        address addr2;
        int256 value1;
        int256 value2;
    }

    event DummyIdEvent(int256 indexed id);

    function generateDummyIdEvent(int256 id) public {
        emit DummyIdEvent(id);
    }

    function getDummyData(int256 id) public view returns (DummyData memory) {
        if (id == 2) {
            revert("Dummy revert for ID 2");
        } else {
            return DummyData(msg.sender, address(this), id, id * 10);
        }
    }
}