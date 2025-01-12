# Inventory Management System (IMS)

## Overview

The Inventory Management System (IMS) is a web-based application designed to streamline inventory management for businesses. It provides a comprehensive solution for tracking stock levels, managing orders, setting low-stock alerts, and generating basic reports.

## Key Features

- **Real-time Stock Monitoring**: Track inventory levels with automatic low-stock alerts
- **User Role Management**: Simplified roles for Managers and Employees
- **Dynamic Product Management**: Support for multiple product categories (Food, Drink, Fruit)
- **Flexible Inventory Updates**: Add or remove stock with ease
- **Basic Reporting**: Generate sales summary reports

## External Libraries

The project utilizes the following external libraries:

1. **Crow Framework**: Implementing RESTful API functionality
2. **SQLite3**: Handling database CRUD (Create, Read, Update, Delete) operations

## Prerequisites

- C++ compiler
- Node.js (LTS version recommended)
- SQLite3 library

## Compilation and Setup

### Backend Setup

1. Navigate to the backend executable folder
2. Run the `back_end.exe` file

### Frontend Setup

1. Open a terminal

2. Change directory to the frontend folder

3. Run 

   ```
   npm start
   ```

   - **Note**: If Node.js is not installed, download it from https://nodejs.org/en

### Accessing the Application

- After starting both backend and frontend, open your web browser
- You will see the login page
- To create an account, click the "Register" button

## Architecture

The system is built using a layered architecture:

- **Presentation Layer**: Frontend using Crow framework
- **Application Layer**: Business logic handling authentication and inventory management
- **Database Layer**: SQLite3 for data storage

## Design Principles

The IMS is developed using Object-Oriented Design (OOD) principles, incorporating:

- Encapsulation
- Inheritance
- Polymorphism
- Modularity

## Design Patterns

The system leverages three key design patterns:

1. **Factory Method Pattern**: Dynamic product creation
2. **Observer Pattern**: Real-time stock notifications
3. **Singleton Pattern**: Centralized inventory management

## Testing

Comprehensive testing is implemented using:

- Google Test (GTest) for unit testing
- Google Mock (gMock) for dependency simulation


## Website Overview

Login page

![Alt Text](/image/Login.png)


















