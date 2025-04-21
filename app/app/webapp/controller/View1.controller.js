sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], (Controller, JSONModel, MessageToast) => {
    "use strict";

    return Controller.extend("app.controller.View1", {
        onInit() {
            // Initialize the model
            var oModel = new JSONModel("odata/v4/my/employee");
            this.getView().setModel(oModel);
        },
        onCreateEmployee() {
            this.byId("createEmployeeDialog").open();
        },
        onConfirmCreateEmployee() {
            // Logic to create an employee
            var sID = this.byId("employeeID").getValue();
            var sFirstName = this.byId("employeeFirstName").getValue();
            var sLastName = this.byId("employeeLastName").getValue();
            var sJobTitle = this.byId("employeeJobTitle").getValue();
            var sCompanyID = this.byId("employeeCompanyID").getValue();
            var sSalary = this.byId("employeeSalary").getValue();
 // Create the new employee object
 var oNewEmployee = {
    ID: sID,
    firstName: sFirstName,
    lastName: sLastName,
    jobTitle: sJobTitle,
    companyId_ID: sCompanyID,
    salary: sSalary
};

// Send a POST request to the CAP service to create the new employee
$.ajax({
    url: "/odata/v4/my/employee",
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify(oNewEmployee),
    success: (data) => {
        MessageToast.show("Employee created successfully!");
        this.byId("createEmployeeDialog").close();
        // Optionally, refresh the model to update the table
        this.getView().getModel().refresh();
    },
    error: (error) => {
        MessageToast.show("Error creating employee: " + error.responseText);
    }
});
},
        onCancelCreateEmployee() {
            // Close the dialog without saving
            this.byId("createEmployeeDialog").close();
        }
    });
});