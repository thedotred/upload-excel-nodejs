![file upload process](https://elasticbeanstalk-ap-southeast-1-677312808939.s3.ap-southeast-1.amazonaws.com/uploads/notes/TDRL_Banner.png)

# 🗎 Upload Excel file in NodeJS App
👨‍💻 Documentation for TDRL Developers

A simple, yet powerful module to upload excel files into a NodeJS applications.

## ❓ Why
Uploading excel file can be very daunting process when Excel has too many data. The process invloves: Going through each row of the excel file, and validating each column of each row and then notifying user if any column is missing or if any data is missing or the format is invalid and so on and on.....

So we decided to come up with a module/solution which will allow us to `save time and write less code` to incorporate Excel upload functionality in any of our projects. 

Although the objective is to `save time and write less code`, it is very important to understand how the whole process works. Please go through the **How To** section to have a good understanding of the whole process.

## 🚀 How to
In progress .......

## 📦 Dependencies
| Package|Link|Description|
| ------------- | ------------- | ------------- |
| Express.js| [express](https://www.npmjs.com/package/express)| Popular web framework for Node.JS. It makes life easy to create and run servers for Node.JS applications. |
| SheetJS| [xlsx](https://www.npmjs.com/package/xlsx)| Extracts data from almost any complex spreadsheet and generating new spreadsheets|
| Multer| [multer](https://www.npmjs.com/package/multer)| Popular middleware for handling file upload. Form must be multipart (multipart/form-data) otherwise it will not process|

## [🌐](https://thedotred.com/) | [💼](https://bd.linkedin.com/company/thedotred) | [🔗](https://www.instagram.com/thedotred/)

## 📓 Changelog
### 2022-08-09
1. isEmpty validation and isEmail validation added
2. Automatically organise data using hanldebar's `{{each}}` built-in helpers. *The power of `{{each}}` helper is that, it can iterate through an array and it can also iterate through an object* You will find the change in the `dataSource` of `Uploaded.handlebars` file.
3. The `schema` array in `uploadController.js` file is working. You need to define the Excel file structure in the `schema`. The rest (validation + parsing) will be taken take of based on the `schema`.