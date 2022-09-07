//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

interface IERC20 {

    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);

    function transfer(address recipient, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);


    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}


contract Token is IERC20 {

    string public constant name = "KEASTOKEN";
    string public constant symbol = "KEAS";
    uint8 public constant decimals = 18;


    mapping(address => uint256) balances;

    mapping(address => mapping (address => uint256)) allowed;

    uint256 totalSupply_ = 10 ether;

    address public owner;

    modifier restricted() {
        require(msg.sender == owner);
        _;
    }


   constructor() {
    balances[msg.sender] = totalSupply_;
    owner=msg.sender;
    }

    struct Person{
        string fname;
        string lname;
        bool _is;

    }

    struct Kaizen{
        address notifierAddress;
        uint256 vote;
        address voter;
        bool _is;
    }

    mapping(address => Person) public approvers;
    mapping(uint256=> Kaizen) public kaizens;
    uint public approversCount;

    function totalSupply() public override view returns (uint256) {
    return totalSupply_;
    }

    function balanceOf(address tokenOwner) public override view returns (uint256) {
        return balances[tokenOwner];
    }

    function transfer(address receiver, uint256 numTokens) public override returns (bool) {
        require(numTokens <= balances[msg.sender]);
        balances[msg.sender] = balances[msg.sender]-numTokens;
        balances[receiver] = balances[receiver]+numTokens;
        emit Transfer(msg.sender, receiver, numTokens);
        return true;
    }

    function approve(address delegate, uint256 numTokens) public override returns (bool) {
        allowed[msg.sender][delegate] = numTokens;
        emit Approval(msg.sender, delegate, numTokens);
        return true;
    }

    function allowance(address owner, address delegate) public override view returns (uint) {
        return allowed[owner][delegate];
    }

    function transferFrom(address owner, address buyer, uint256 numTokens) public override returns (bool) {
        require(numTokens <= balances[owner]);
        require(numTokens <= allowed[owner][msg.sender]);
        balances[owner] = balances[owner]-numTokens;
        allowed[owner][msg.sender] = allowed[owner][msg.sender]-numTokens;
        balances[buyer] = balances[buyer]+numTokens;
        emit Transfer(owner, buyer, numTokens);
        return true;
    }

    function addKaizen(uint256 _number) external {
         require(_number>11000000 && _number<20000000,"Number you entered is invalid!");
         require(kaizens[_number]._is==false,"This notification number has already been used before!");
         kaizens[_number].notifierAddress=msg.sender;
         kaizens[_number]._is=true;   
    }

    function addApprover(address approver) external restricted{
        require(approvers[approver]._is==false);
        approvers[approver]._is = true;
        approve(approver, 10000000000);
        approversCount++;
    }

    function removeApprover(address approver) external restricted{
        require(approvers[approver]._is==true);
        approvers[approver]._is = false;
        approversCount--;
    }

    function voteKaizen(uint256 _number) external {
        require(_number>11000000 && _number<20000000, "Number you entered is invalid!");
        require(approvers[msg.sender]._is==true, "You are not an approver!");
        require(kaizens[_number].voter!=msg.sender, "You already voted for this notification!");
        kaizens[_number].voter=msg.sender;
        kaizens[_number].vote++;
        if (kaizens[_number].vote>=approversCount/2 && balances[owner] >= 10) {
            transferFrom(owner, kaizens[_number].notifierAddress, 10);
        }
        
        
    }

    function readApproversCount()external view returns (uint256){
        return approversCount;
    }
}