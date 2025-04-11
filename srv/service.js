const cds = require('@sap/cds');
 module.exports = cds.service.impl(async function() 
 {
     const { employee, company } = this.entities;
     this.on('CREATE', 'employee', async (req) => {
        const { ID, firstName, lastName, jobTitle, companyId_ID, salary } = req.data;
    
        console.log('Received data:', req.data); // Log the received data
    
        if (!ID || !firstName || !lastName || !jobTitle || !companyId_ID || !salary) {
            console.error('Error: Missing required employee information.'); // Log the error
            return req.error(400, 'Error: Missing required employee information.');
        } else {
            const newEmployee = {
                ID,
                firstName,
                lastName,
                jobTitle,
                companyId_ID,
                salary
            };
    
            await INSERT.into(employee).entries(newEmployee);
            return newEmployee;
        }
    });

    // Custom handler for the CREATE operation on Companies
    this.on('CREATE', 'company', async (req) => {
        const { ID, companyName, address } = req.data;
        if(!ID || !companyName || !address){
            return req.error(400, 'Error: Missing required company information.');
        }
        else{
            const newCompany = {
                ID,
                companyName,
                address
            };
            await INSERT.into(company).entries(newCompany);
            return newCompany;
        }
        }
        );
        
// this.on('READ', 'employee', async (req) => {
//      const { ID } = req.data;
//       if (!ID) {
//       return req.error(400, 'Error: Missing employee ID.');
//       } else {
//      const employeeData = await SELECT.from(employee).where({ ID });
//      return employeeData;}
//      });

this.on('DELETE', 'employee', async (req) => {
     const { ID } = req.data;
     if (!ID) {
     return req.error(400, 'Error: Missing employee ID.');
     } 
     else {
     const deleted = await DELETE.from(employee).where({ ID });
     if (deleted === 0) {
     return req.error(404, 'Error: Employee not found.');
     }
     else{
     return { message: 'Employee deleted successfully.' };}
     }
     });

     // Handler for DELETE operation on company by ID
    this.on('DELETE', 'company', async (req) => {
            const { ID } = req.data;
            if (!ID) {
                return req.error(400, 'Error: Missing company ID.');
            } else {
                const deleted = await DELETE.from(company).where({ ID });
                        return { message: 'Company deleted successfully.' };
            }
        });

    //updating the emplyee information
    this.on('UPDATE', 'employee', async (req) => {
         const { ID, firstName, lastName, jobTitle, companyId_ID, salary } = req.data;
         if (!ID) {
         return req.error(400, 'Error: Missing employee ID.');
         } else {
         const updatedEmployee = {
         firstName,
         lastName,
         jobTitle,
         companyId_ID,
         salary
         };
        
        const updated = await UPDATE(employee).set(updatedEmployee).where({ ID });
         return updatedEmployee;
         }
         });
        
});

