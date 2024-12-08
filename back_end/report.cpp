

#include <iostream>
#include "report.h"
#include <string>
#include "sqlite/sqlite3.h"
#include <cmath>
#include <vector>

using namespace std;
std::vector<report> result;

//Constructor for the report object
report::report(string itemName,int itemQuantity,string type,float value,string day) {
    this->productName = itemName;
    this->quantity = itemQuantity;
    this->type = type;
    this->value = value;
    this->startDay = day;
}

//Constructor for the report object
report::report(string startDay, string endDay) {
    this->startDay = startDay;
    this->endDay = endDay;

}


//Insert a transaction into report in DBMS
void report::insertIntoRpeort() {
    sqlite3* db;
    char* errMessage = nullptr;

    // Open the database
    int rc = sqlite3_open("../project.db", &db);
    if (rc != SQLITE_OK) {
        throw std::runtime_error("Can't open database: " + std::string(sqlite3_errmsg(db)));
    }
    std::string sql = "INSERT INTO REPORT (Product, Quantity, Type, Value, Date ) VALUES (?, ?, ?, ?, ?)";
    sqlite3_stmt* stmt;
    rc = sqlite3_prepare_v2(db, sql.c_str(), -1, &stmt, nullptr);
    if (rc != SQLITE_OK) {
        sqlite3_close(db);
        throw std::runtime_error("Failed to prepare statement: " + std::string(sqlite3_errmsg(db)));
    }
    std:cout << std::round(this->value*100)/100 << "\n";
    // Bind parameters
    sqlite3_bind_text(stmt, 1, this->productName.c_str(), -1, SQLITE_TRANSIENT);
    sqlite3_bind_int(stmt, 2, this->quantity);
    sqlite3_bind_text(stmt, 3, this->type.c_str(), -1, SQLITE_TRANSIENT);
    sqlite3_bind_double(stmt, 4, std::round(this->value * 100.0) / 100.0);
    sqlite3_bind_text(stmt, 5, this->startDay.c_str(), -1, SQLITE_TRANSIENT);
    rc = sqlite3_step(stmt);
    if (rc != SQLITE_DONE) {
        sqlite3_finalize(stmt);
        sqlite3_close(db);
        throw std::runtime_error("Failed to insert data: " + std::string(sqlite3_errmsg(db)));
    }

    // Clean up
    sqlite3_finalize(stmt);
    sqlite3_close(db);

    std::cout << "Insert new transaction data successfully.\n";

}

//get the report history from DBMS
std::vector<report> report::getReport() {
    sqlite3 *DB;
    char *errorMessage = nullptr;
    const char *data = "Callback function called";
    int exit = sqlite3_open("../project.db", &DB);
    if (exit) {
        std::cerr << "Error opening database: " << sqlite3_errmsg(DB) << "\n";
        // return "Can not find database";
    }
    std::cout << "Database opened successfully!\n";
    std::string sql = "SELECT * FROM REPORT WHERE Date BETWEEN ? AND ?;";

    sqlite3_stmt *stmt;
    // Prepare the SQL statement
    exit = sqlite3_prepare_v2(DB, sql.c_str(), -1, &stmt, 0);
    if (exit != SQLITE_OK) {
        std::cerr << "Failed to prepare statement: " << sqlite3_errmsg(DB) << "\n";
        return result; // Return an error code
    }
    std:cout << this->startDay << "\n";
    sqlite3_bind_text(stmt, 1, this->startDay.c_str(), -1, SQLITE_STATIC);
    sqlite3_bind_text(stmt, 2, this->endDay.c_str(), -1, SQLITE_STATIC);
    while (sqlite3_step(stmt) == SQLITE_ROW) {
        // Create a Report object for each row

        report newResult((const char *)sqlite3_column_text(stmt, 0),sqlite3_column_int(stmt, 1),(const char *)sqlite3_column_text(stmt, 2),std::round(sqlite3_column_double(stmt, 3)*100)/100,(const char *)sqlite3_column_text(stmt, 4));
        result.push_back(newResult);
    }

    sqlite3_finalize(stmt);
    sqlite3_close(DB);
    std::vector<report> final;
    final = std::move(result);
    result.clear();
    return final;


}
