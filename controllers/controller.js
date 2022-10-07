var group = [];
var balance_sheet = [];
const createGroup = (req,res) => {
    console.log("Reached Route: Create Group");
    try 
    {
        var ifGroupExists = false;
        group.forEach(element => {
            if(element["name"] == req.params.group_name)
            {
                ifGroupExists = true;
                res.json({"status": "OK", "message" : element});
            }
        });
        if(!ifGroupExists)
        {
            var expenses = [];
            var tempGroup = {"name": req.params.group_name, "members": req.body.members, "expenses" : expenses};
            var tempBalance = {"name" : req.params.group_name, "balances": []};
            group.push(tempGroup);
            balance_sheet.push(tempBalance);
            res.json({"status" : "OK", "message" : "Group "+req.params.group_name+" is created"})
        }
        else 
        {
            res.json({"status" : "WARN", "message" : "Group Already Exists"});
        } 
    }
    catch(err)
    {
        console.log("Error Encountered");
        console.log(err);
    }
}
const showGroups = (req,res) => {
    console.log("Reached Route: Show Group");
    if(group.length >= 1)
    {
        res.json({"status" : "OK", "message" : group});
    }
    else 
    {
        res.json({"status" : "WARN", "message" : "No groups available"});
    }
}


const showGroup = (req,res) => {
    console.log("Reached Route: Show Group");
    var ifGroupExists = false;
    group.forEach(element => {
        if(element["name"] == req.params.group_name)
        {
            ifGroupExists = true;
            res.json({"status": "OK", "message" : element});
        }
    });
    if(!ifGroupExists)
        res.json({"status":"WARN", "message": "No such group"});
}

const showExpenses = (req, res) => {
    console.log("Reached Route: Show Expenses");
    var ifGroupExists = false;
    group.forEach(element => {
        if(element["name"] == req.params.group_name)
        {
            ifGroupExists = true;
            if(element['expenses'].length >= 1)
                res.json(element["expenses"]);
            else 
                res.json({"status": "WARN", "message" : "No expenses added"});
        }
    });
    if(!ifGroupExists)
        res.json({"status":"WARN", "message": "No such group"});
}

const createExpense = (req,res) => {
    console.log("Reached Route: Create Expense");
    var ifGroupExists = false;
    group.forEach(element => {
        if(element["name"] == req.params.group_name)
        {
            // check keys in expenses.
            ifGroupExists = true;
            ifExpenseExists = false;
            var tempExpenses = req.body.expenses;
            element["expenses"].forEach(item => {
                if(item["name"] == tempExpenses["name"])
                {
                    ifExpenseExists = true;
                    res.json({"status": "WARN", "message" : "Expense Name Already Exists"});
                }
            });
            if(!ifExpenseExists)
            {
                var diff_elements = IfMemberInExpenseNotExists(tempExpenses["items"],element["members"]);
                if(diff_elements.length >= 1)
                {
                    diff_elements.forEach(item => {
                        element["members"].push(item);
                    });
                }
                element["expenses"].push(tempExpenses);
                res.json({"status" : "OK", "message" : "Expenses Added", "Details" : element});
            }
        }
    });
    if(!ifGroupExists)
        res.json({"status":"WARN", "message": "No such group"});
}

const updateExpense = (req, res) => {
    console.log("Reached Route: Update Expense");
    var ifGroupExists = false;
    var ifExpenseExists = false;
    var index = 0;
    group.forEach(element => {
        if(element["name"] == req.params.group_name)
        {
            var tempExpenses = req.body.expenses;
            element["expenses"].forEach(item => {
                if(item["name"] == tempExpenses["name"])
                {
                    ifExpenseExists = true;
                    //element["expenses"].delete(item);
                    element["expenses"].splice(index,1);
                    var diff_elements = IfMemberInExpenseNotExists(tempExpenses["items"],element["members"]);
                    if(diff_elements.length >= 1)
                    {
                        diff_elements.forEach(item => {
                            element["members"].push(item);
                        });
                    }
                    element["expenses"].push(tempExpenses);
                    res.json({"status" : "OK", "message": "Expense Updated"})
                }
                index += 1;
            });
        }
    });
    if(!ifExpenseExists)
        res.json({"status": "ERR", "message" : "Expense Does Not Exist"});
    if(!ifGroupExists)
        res.json({"status":"WARN", "message": "No such group"});
}

const deleteExpense = (req,res) => {
    console.log("Reached Route: Delete Expense");
    var ifGroupExists = false;
    var ifExpenseExists = false;
    var index = 0;
    group.forEach(element => {
        if(element["name"] == req.params.group_name)
        {
            var expense_name = req.body.expense_name;
            element["expenses"].forEach(item => {
                if(item["name"] == expense_name)
                {
                    ifExpenseExists = true;
                    element["expenses"].splice(index,1);
                    res.json({"status" : "OK", "message": "Expense Deleted"});
                }
                index += 1;
            });
        }
    });
    if(!ifExpenseExists)
        res.json({"status": "ERR", "message" : "Expense Does Not Exist"});
    if(!ifGroupExists)
        res.json({"status":"WARN", "message": "No such group"});
}


module.exports = {createGroup, showGroups, showGroup, showExpenses, createExpense, updateExpense, deleteExpense};

const IfMemberInExpenseNotExists = (expense,existing_members) => {
    let member_arr = []
    var diff_elements = []
    expense.forEach(item => {
        var temp_members = member_arr.concat(Object.keys(item["paid_by"][0]),Object.keys(item["owed_by"][0]));
        member_arr.push(temp_members.flat());
    });
    member_arr = [...new Set(member_arr.flat())];
    if(JSON.stringify(member_arr) != JSON.stringify(existing_members))
    {
        diff_elements = member_arr.filter(x => !existing_members.includes(x));
    }
    return diff_elements;
}

