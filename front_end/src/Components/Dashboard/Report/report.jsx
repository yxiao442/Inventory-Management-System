
import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {useState, useEffect} from 'react';
import { jsPDF } from 'jspdf';

import './report.css'
import Button from "@mui/material/Button";
import dayjs from 'dayjs'; // Import dayjs for date formatting

export default function BasicDatePicker() {
    const [startDay,setStartDay] = React.useState(null);
    const [endDay,setEndDay] = React.useState(null);
    const [wrongRange,setwrongRange] = React.useState('');
    const [isWrongRange, setIsWrongRange] = React.useState(false)
    const formatDate = (date) => (date ? dayjs(date).format('YYYY-MM-DD') : 'None');

    const handleStartDayChange = (newValue) => {
        setStartDay(newValue); // Update the state when the start day changes
    };

    const handleEndDayChange = (newValue) => {
        setEndDay(newValue); // Update the state when the end day changes
    };
    useEffect(() => {
        if (startDay && endDay) {
            // Compare dates to ensure the end date is after the start date
            if (new Date(endDay) < new Date(startDay)) {
                setIsWrongRange(false);
                setwrongRange("The range is wrong")

            } else {
                setIsWrongRange(true);
            }
        }
    }, [startDay, endDay]);
    const handleReport = async (e) => {
        e.preventDefault();

        const dayRange = {
            Start_Day:formatDate(startDay),
            End_Day:formatDate(endDay),

        };

        try {
            const response = await fetch('http://localhost:18080/getReport', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dayRange),
            });

            const result = await response.json();

            console.log('Response from backend:', result);
            generatePDF(result)

            // Handle success or failure

            if (response.ok) {
                // Handle successful login (e.g., redirect, show a success message)
                console.log("Receive the report successfully");



            }
        } catch (error) {
            console.error('Error during create user:', error);
        }

    };
    const generatePDF = (data) =>{
        const doc = new jsPDF();
        doc.setFont("helvetica", "bold");
        doc.setFontSize(18);
        doc.text("Inventory Report", 105, 20, { align: "center" });

        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 105, 30, { align: "center" });

        const headers = ["Product", "Quantity", "Type", "Amount", "Date"];
        let startY = 50;
        const lineHeight = 10;

        doc.setFont("helvetica", "bold");
        headers.forEach((header, index) => {
            doc.text(header, 10 + index * 40, startY);
        });

        doc.setFont("helvetica", "normal");
        data.forEach((row, rowIndex) => {
            startY += lineHeight;
            doc.text(row.Product_Name, 10, startY);
            doc.text(row.Quantity.toString(), 50, startY);
            doc.text(row.Type, 90, startY);
            doc.text(`$${row.Value.toFixed(2).toString()}`, 130, startY);
            doc.text(row.Date, 170, startY);
        });

        // Save the PDF
        doc.save("Inventory-report.pdf");
    };


    return (

        <LocalizationProvider dateAdapter={AdapterDayjs} className="day" >
            <div className="box">
                <h3>Report</h3>
            </div>
            <form onSubmit={handleReport}>
            <DemoContainer components={['DatePicker']}  >
                <DatePicker label="Select Start Day" value={startDay}
                            onChange={handleStartDayChange} />
            </DemoContainer>
            <DemoContainer components={['DatePicker']} >
                <DatePicker label="Select End Day"  value={endDay}
                            onChange={handleEndDayChange}/>
            </DemoContainer>
                <Button className="report" variant="contained" type = "submit" disabled={!isWrongRange}>Generate Report
                </Button>

            </form>
        </LocalizationProvider>

    );
}