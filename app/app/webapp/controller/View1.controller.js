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
        this.getView().getModel("mainModel").refresh();
    },
    error: (error) => {
        MessageToast.show("Error creating employee: " + error.responseText);
    }
});
},
        onCancelCreateEmployee() {
            // Close the dialog without saving
            this.byId("createEmployeeDialog").close();
        },
        //delete
        onDeletePress(oEvent) {
            var oItem = oEvent.getSource().getParent();
            var oContext = oItem.getBindingContext("mainModel");
            var sID = oContext.getProperty("ID");
            $.ajax({
                url: "/odata/v4/my/employee(" + sID + ")",
                method: "DELETE",
                success: (data) => {
                    MessageToast.show("Employee deleted successfully!");
                    this.getView().getModel("mainModel").refresh();
                },
                error: (error) => {
                    MessageToast.show("Error deleting employee: " + error.responseText);
                }
            });
            
        },
        onUpdatePress(oEvent){
           var oItem = oEvent.getSource().getParent();
           var oContext = oItem.getBindingContext("mainModel");
           var oDialog = this.byId("updateEmployeeDialog");
          oDialog.setBindingContext(oContext, "mainModel");
          oDialog.open();
        },
        onCancelUpdateEmployee(){
            this.byId("updateEmployeeDialog").close();
        },
        onConfirmUpdateEmployee() {
            // Logic to update an employee
            var sID = this.byId("u_employeeID").getValue().replace(/,/g, '');
            var sFirstName = this.byId("u_employeeFirstName").getValue();
            var sLastName = this.byId("u_employeeLastName").getValue();
            var sJobTitle = this.byId("u_employeeJobTitle").getValue();
            var sCompanyID = this.byId("u_employeeCompanyID").getValue().replace(/,/g, '');
            var sSalary = this.byId("u_employeeSalary").getValue().replace(/,/g, ''); 
        
            // Create the updated employee object
            var oUpdatedEmployee = {
                ID: sID,
                firstName: sFirstName,
                lastName: sLastName,
                jobTitle: sJobTitle,
                companyId_ID: sCompanyID,
                salary: sSalary
            };
        
            // Send a PUT request to the CAP service to update the employee
            $.ajax({
                url: "/odata/v4/my/employee(" + sID + ")",
                method: "PUT",
                contentType: "application/json",
                data: JSON.stringify(oUpdatedEmployee),
                success: (data) => {
                    MessageToast.show("Employee updated successfully!");
                    this.byId("updateEmployeeDialog").close();
                    // Optionally, refresh the model to update the table
                    this.getView().getModel("mainModel").refresh();
                },
                error: (error) => {
                    MessageToast.show("Error updating employee: " + error.responseText);
                }
            });
        }
        
    });
});