var express = require('express'),
    router = express.Router(),
    xlsx = require('xlsx');

// Importing our Multer middleware from '/utils' folder
const {localUploadMiddleware} = require('../utils/uploadFiles');

// Importing validation methods
const {isEmpty, isDate, isNumeric, isBoolean, isString, isEmail} = require('../utils/validations');

// Upload route for Excel File
// This router will just allow user
// to download Template file and
// to upload Excel file
router.get('/', function (req, res) {
    res.render('Upload', {
        layout: 'kendo',
        title: "Upload Data",
        sessionData: req.session,
        nav_name: '" List of Data"'
    });
});

// Uploaded route for Excel File
// This route will parse the excel file and
// render it parsed data in Uploaded page
router.post('/Uploaded', localUploadMiddleware.single('upFile'), (req, res, next) => {
    const file = req.file;
    if (!file) {
        const error = new Error('Please upload a file');
        error.httpStatusCode = 400;
        return next(error);
    }

    parseExcelData(req.file.path,req,res);
});

async function parseExcelData(fullPath,req,res){
    // Defining excel schema
    let schema = [
        {field: 'contact_number', label: 'Phone number', required: true, type: 'number', validationFunction: isNumeric},
        {field: 'contact_name', label: 'Customer name', required: true, type: 'string', validationFunction: isString},
        {field: 'marital_status', label: 'Marital status', required: true, type: 'boolean', validationFunction: isBoolean},
        {field: 'date_of_birth', label: 'Date of birth', required: false, type: 'date', validationFunction: isDate},
        {field: 'email_address', label: 'Email address', required: true, type: 'string', validationFunction: isEmail}
    ];
    //Grab Excel file
    let xlFile = xlsx.readFile(fullPath, {
        type: 'array',
        cellDates:true, // To recognise date
        cellNF:false, 
        cellText:false
    });

    //Declare Variables
    let excelData = [];
    
    // Get all sheet names from Excel file
    let sheet_name_list = xlFile.SheetNames;
    // Get first sheet's data
    let sheetData = xlsx.utils.sheet_to_json(xlFile.Sheets[sheet_name_list[0]]);
    
    // Declaring a variable to hold if 
    // any value is missing. If any field is missing then
    // a bootstrap danger alert will be shown in the
    // Uploaded page. If no value/field is missing, then 
    // a bootstrap success alert will be shown.
    let errorExists = false;
    
    // Looping through each row of Excel data to create a new array
    // which will be sent to the Uploaded page
    for (let i = 0; i < sheetData.length; i++){
        let row = sheetData[i];
        row.error = [];
        row.isError = false;

        // Looping through each column of the schema
        // Our purpose is to check if the Excel file has the fields which 
        // are defined in the Schema.
        for (let j = 0; j < schema.length; j++) {
            let column = schema[j];
            // Checking if the column is required
            if(column.required) {
                // If required, then checking if the column is empty
                if(isEmpty(row[`${column.field}`])) {
                    // if column not found or null or empty 
                    // in the Excel file, then hold the error
                    row.isError = true;
                    row.error.push(`Invalid ${column.field}`);
                    errorExists = true;
                } else {
                    // if column is found in the Excel, 
                    // now validate if the column is in correct format
                    if (!column.validationFunction(row[`${column.field}`])) {
                        row[`${column.field}`] = null;
                        row.isError = true;
                        row.error.push(`${column.field} is not in ${column.type} format`);
                        errorExists = true;
                    }
                }
            }  
        }

        // Now all the errors will be joined so
        // that we can present it on the front-end
        row.error.join(', ');

        // Push the whole row in the new array
        excelData.push(row);
    };
    
    res.render('/Uploaded', {
        layout: 'kendo',
        title: 'View Uploaded Data',
        excelData: excelData,
        dataSchema: schema,
        filename: fullPath,
        errorExists: errorExists
    });
};

module.exports = router;
