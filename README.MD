# FairSplit

A REST API Implementation of the core functionality of Splitwise.

## Project Setup
---
To set up the application, please enter:

`npm install `

To run the application, please enter: 

`npm start`


## Available Routes
---
### Tasks Complete
- [x] Creating Group
- [x] Creating, Reading, Updating and Deleting Expense.
- [ ] Balance sheet for group members 
---
### API Routes
- [GET] Show Group
    
    Shows the group by name.

    `http://localhost:8888/api/show/group/<group-name>`
    Example : http://localhost:8888/api/show/group/abc

    
    Response 
    ```
    {
        "status": "OK",
        "message": {
            "name": "abc",
            "members": [
                "A",
                "B",
                "C"
            ],
            "expenses": [
                {
                    "name": "Fruits and Milk",
                    "items": [
                        {
                            "name": "milk",
                            "value": 50,
                            "paid_by": [
                                {
                                    "A": 40,
                                    "B": 10
                                }
                            ],
                            "owed_by": [
                                {
                                    "A": 10,
                                    "B": 20,
                                    "C": 10,
                                    "D": 10
                                }
                            ]
                        },
                        {
                            "name": "fruits",
                            "value": 50,
                            "paid_by": [
                                {
                                    "A": 50
                                }
                            ],
                            "owed_by": [
                                {
                                    "A": 10,
                                    "B": 20,
                                    "C": 10,
                                    "D": 10
                                }
                            ]
                        }
                    ]
                }
            ],
            "balances": []
        }
    }
    ```


- [POST] Create Group
   
   Creates Group
   `http://localhost:8888/api/create/group/<group-name>`

   Request Body
   ```
   {
        members : ['A','B','C'] //array of all members.
   }
   ```
   Example : http://localhost:8888/api/create/group/abc

   Request Body

   ```
    {
        "members": ["A","B"]
    }
   ``` 

   Response
   ```
    {
        "status": "OK",
        "message": "Group abc is created"
    }
    ```

- [GET] Show Expenses

   Shows all expense by group 
   `http://localhost:8888/api/show/expense/group/<group-name>`

   Example:
   http://localhost:8888/api/show/expense/group/abc

   Response
   ```
    [
        {
            "name": "Fruits and Vegetables",
            "items": [
                {
                    "name": "vegetables",
                    "value": 40,
                    "paid_by": [
                        {
                            "A": 20,
                            "B": 20
                        }
                    ],
                    "owed_by": [
                        {
                            "A": 10,
                            "B": 20,
                            "C": 10
                        }
                    ]
                },
                {
                    "name": "fruits",
                    "value": 50,
                    "paid_by": [
                        {
                            "A": 50
                        }
                    ],
                    "owed_by": [
                        {
                            "A": 10,
                            "B": 20,
                            "C": 10,
                            "D": 10
                        }
                    ]
                }
            ]
        },
        {
            "name": "Fruits and Milk",
            "items": [
                {
                    "name": "milk",
                    "value": 60,
                    "paid_by": [
                        {
                            "A": 40,
                            "B": 10,
                            "D": 10
                        }
                    ],
                    "owed_by": [
                        {
                            "A": 10,
                            "B": 20,
                            "C": 10,
                            "D": 10
                        }
                    ]
                },
                {
                    "name": "fruits",
                    "value": 50,
                    "paid_by": [
                        {
                            "A": 50
                        }
                    ],
                    "owed_by": [
                        {
                            "A": 10,
                            "B": 20,
                            "C": 10,
                            "D": 10
                        }
                    ]
                }
            ]
        }
    ]
   ```
- [POST] Create Expense

  Creates Expense to a group

  `http://localhost:8888/api/create/expense/group/<group-name>`

  Example : http://localhost:8888/api/create/expense/group/abc

  Sample Request Body
    ```
    {
        "expenses" :  
        {
            "name": "Fruits and Milk",
            "items": [{"name": "milk", "value": 50, "paid_by": [{"A": 40, "B": 10}], "owed_by": [{"A": 10,"B": 20, "C": 10, "D" : 10}]},
                    {"name": "fruits", "value": 50, "paid_by": [{"A": 50}], "owed_by": [{"A": 10,"B": 20, "C": 10, "D" : 10}]}]
        }
    }
    ```
    Sample Response
    ```
    {
        "status": "OK",
        "message": "Expenses Added",
        "Details": {
            "name": "abc",
            "members": [
                "A",
                "B",
                "C",
                "D"
            ],
            "expenses": [
                {
                    "name": "Fruits and Vegetables",
                    "items": [
                        {
                            "name": "vegetables",
                            "value": 40,
                            "paid_by": [
                                {
                                    "A": 20,
                                    "B": 20
                                }
                            ],
                            "owed_by": [
                                {
                                    "A": 10,
                                    "B": 20,
                                    "C": 10
                                }
                            ]
                        },
                        {
                            "name": "fruits",
                            "value": 50,
                            "paid_by": [
                                {
                                    "A": 50
                                }
                            ],
                            "owed_by": [
                                {
                                    "A": 10,
                                    "B": 20,
                                    "C": 10,
                                    "D": 10
                                }
                            ]
                        }
                    ]
                },
                {
                    "name": "Fruits and Milk",
                    "items": [
                        {
                            "name": "milk",
                            "value": 50,
                            "paid_by": [
                                {
                                    "A": 20,
                                    "B": 20
                                }
                            ],
                            "owed_by": [
                                {
                                    "A": 10,
                                    "B": 20,
                                    "C": 20
                                }
                            ]
                        },
                        {
                            "name": "fruits",
                            "value": 50,
                            "paid_by": [
                                {
                                    "A": 50
                                }
                            ],
                            "owed_by": [
                                {
                                    "A": 10,
                                    "B": 20,
                                    "C": 10,
                                    "D": 10
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    }
    ```
- [POST] Update Expense

    Updates Expense by expense name and by group name

    `http://localhost:8888/api/update/expense/group/<group-name>`

    Example: 
    http://localhost:8888/api/update/expense/group/abc

    Sample Request Body
    ```
            {
        "expenses" :  
        {
            "name": "Fruits and Milk",
            "items": [{"name": "milk", "value": 60, "paid_by": [{"A": 40, "B": 10, "D":10}], "owed_by": [{"A": 10,"B": 20, "C": 10, "D" : 10}]},
                    {"name": "fruits", "value": 50, "paid_by": [{"A": 50}], "owed_by": [{"A": 10,"B": 20, "C": 10, "D" : 10}]}]
            }
        }
    ```
    Response
    ```
        {
            "status": "OK",
            "message": "Expense Updated"
        }
    ```

-  [POST] Delete Expense
   Deletes expense by expense name and group name

    `http://localhost:8888/api/delete/expense/group/<group-name>`

   Example: http://localhost:8888/api/delete/expense/group/abc

   Sample Request Body
   ```
    {   
        "expense_name" : "Fruits and Milk"
    }
   ```
   Response
    ```
    {    
        "status": "OK",
        "message": "Expense Deleted"
    }
    ```

### [Postman Link](https://www.getpostman.com/collections/ad40170efa64e354c965) 









