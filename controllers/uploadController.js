var express = require('express'),
    router = express.Router(),
    xlsx = require('xlsx');

const {localUploadMiddleware} = require('../utils/uploadFiles');
const {isDate, isNumeric, isBoolean, isString} = require('../utils/validations');

// Upload route for Excel File
// This router will just allow user
// to download Template file and
// to upload Excel file
router.get('/Upload', function (req, res) {
    res.render('AWB/Upload/Upload', {
        layout: 'kendo',
        title: "Upload Orders Data",
        sessionData: req.session,
        nav_name: '" Order Data"'
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
    // Declaring excel schema
    let schema = [
        {field: 'contact_number', label: 'Phone number', required: true, type: 'number'},
        {field: 'contact_name', label: 'Customer name', required: true, type: 'string'},
        {field: 'marital_status', label: 'Marital status', required: true, type: 'boolean'},
        {field: 'date_of_birth', label: 'Date of birth', required: false, type: 'date'},
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
    
    // Looping through the sheets data to create a new array
    // which will be sent to the Uploaded page
    for (let i = 0; i < sheetData.length; i++){
        let item = sheetData[i];
        item.error = [];
        item.isError = false;

        // validation for required field
        if(item['field_name'] === undefined || item['field_name'] === null || item['field_name'] === '') {
            // if field_name not found or null or empty
            item.isError = true;
            item.error.push('Invalid {{field_name}}');
            errorExists = true;
        } else {
            // if field_name is found, now validate
            // field_name is in correct format
            
            // Use any one of the following validation
            // depending of the use case

            // this validation is for NUMBER
            if (!isNumeric(item['field_name'])) {
                item['field_name'] = 0;
                item.isError = true;
                item.error.push('Invalid {{field_name}} ');
                errorExists = true;
            }
            // this validation is for DATE
            if (!isDate(item['field_name'])) {
                item['field_name'] = null;
                item.isError = true;
                item.error.push('Invalid {{field_name}} ');
                errorExists = true;
            }
            // this validation is for BOOLEAN
            if (!isBoolean(item['field_name'])) {
                item['field_name'] = null;
                item.isError = true;
                item.error.push('Invalid {{field_name}} ');
                errorExists = true;
            }
            // this validation is for STRING
            if (!isString(item['field_name'])) {
                item['field_name'] = null;
                item.isError = true;
                item.error.push('Invalid {{field_name}} ');
                errorExists = true;
            }
        }

        item.error.join(', ');
        excelData.push({
            errors: item.error,
            isError: item.isError,
            field_name: item['field_name']
        });
    };
    
    res.render('/Uploaded', {
        layout: 'kendo',
        title: 'View Uploaded Data',
        excelData: excelData,
        filename: fullPath,
        errorExists: errorExists
    });
};

module.exports = router;
