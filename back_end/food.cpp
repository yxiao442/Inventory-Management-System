//
// Created by Mattie Poon on 2024-11-09.
//

#include <iostream>
#include "food.h"
#include "sqlite/sqlite3.h"

food::food(const std::string& productName, float price, const std::string&inventoryID)
        : productName(productName), price(price), inventoryID(inventoryID) {}

bool food::createItem() {
    std::cout << "Generating food item: " << productName << std::endl;

    sqlite3* db;
    char* errMessage = nullptr;

    // Open the database
    int rc = sqlite3_open("../project.db", &db);
    if (rc != SQLITE_OK) {
        throw std::runtime_error("Can't open database: " + std::string(sqlite3_errmsg(db)));
    }

    // Prepare SQL query
    std::string sql = "INSERT INTO inventory (inventoryID, Category, Name, Quantity, PRICE ) VALUES (?, ?, ?, ?, ?)";
    sqlite3_stmt* stmt;

    rc = sqlite3_prepare_v2(db, sql.c_str(), -1, &stmt, nullptr);
    if (rc != SQLITE_OK) {
        sqlite3_close(db);
        throw std::runtime_error("Failed to prepare statement: " + std::string(sqlite3_errmsg(db)));
    }

    // Bind parameters
    sqlite3_bind_text(stmt, 1, inventoryID.c_str(), -1, SQLITE_TRANSIENT); // Bind inventoryID
    sqlite3_bind_text(stmt, 2, productName.c_str(), -1, SQLITE_TRANSIENT); // Bind productName
    sqlite3_bind_text(stmt, 3, "Food", -1, SQLITE_TRANSIENT);
    sqlite3_bind_int(stmt, 4, quantity); // Bind quantity
    sqlite3_bind_int(stmt, 5, price);

    // Execute SQL statement
    rc = sqlite3_step(stmt);
    if (rc != SQLITE_DONE) {
        sqlite3_finalize(stmt);
        sqlite3_close(db);
        throw std::runtime_error("Failed to insert data: " + std::string(sqlite3_errmsg(db)));
    }

    // Clean up
    sqlite3_finalize(stmt);
    sqlite3_close(db);

    std::cout << "Create new food item successfully.\n";
    return true;
}

bool food::addQuantity(int amount) {

    sqlite3* db;
    char* errMessage = nullptr;

    // Open the database
    int rc = sqlite3_open("../project.db", &db);
    if (rc != SQLITE_OK) {
        throw std::runtime_error("Can't open database: " + std::string(sqlite3_errmsg(db)));
    }

    // Prepare SQL query
    std::string sql = "UPDATE inventory SET Quantity = Quantity + ? WHERE inventoryID = ?";
    sqlite3_stmt* stmt;

    rc = sqlite3_prepare_v2(db, sql.c_str(), -1, &stmt, nullptr);
    if (rc != SQLITE_OK) {
        sqlite3_close(db);
        throw std::runtime_error("Failed to prepare statement: " + std::string(sqlite3_errmsg(db)));
    }

    // Bind parameters
    sqlite3_bind_int(stmt, 1, amount); // Bind the amount to adjust the quantity
    sqlite3_bind_text(stmt, 2, inventoryID.c_str(), -1, SQLITE_TRANSIENT); // Bind inventoryID

    // Execute SQL statement
    rc = sqlite3_step(stmt);
    if (rc != SQLITE_DONE) {
        sqlite3_finalize(stmt);
        sqlite3_close(db);
        throw std::runtime_error("Failed to update data: " + std::string(sqlite3_errmsg(db)));
    }


    const int ifChange = sqlite3_changes(db);

    sqlite3_finalize(stmt);
    if(ifChange ==0) {
        std::cout << "Item does not exist.\n ";
        std::cout << ifChange << std::endl;
        sqlite3_close(db);
        return false;
    }
    else {
        std::cout << "Quantity updated successfully.\n";

        sqlite3_close(db);
        return true;
    }

}

bool food::deleteQuantity(int amount) {

    sqlite3* db;
    char* errMessage = nullptr;

    // Open the database
    int rc = sqlite3_open("../project.db", &db);
    if (rc != SQLITE_OK) {
        throw std::runtime_error("Can't open database: " + std::string(sqlite3_errmsg(db)));
    }

    // Prepare SQL query
    std::string sql = "UPDATE inventory SET Quantity = Quantity - ? WHERE inventoryID = ?";
    sqlite3_stmt* stmt;

    rc = sqlite3_prepare_v2(db, sql.c_str(), -1, &stmt, nullptr);
    if (rc != SQLITE_OK) {
        sqlite3_close(db);
        throw std::runtime_error("Failed to prepare statement: " + std::string(sqlite3_errmsg(db)));
    }

    // Bind parameters
    sqlite3_bind_int(stmt, 1, amount); // Bind the amount to adjust the quantity
    sqlite3_bind_text(stmt, 2, inventoryID.c_str(), -1, SQLITE_TRANSIENT); // Bind inventoryID

    // Execute SQL statement
    rc = sqlite3_step(stmt);
    if (rc != SQLITE_DONE) {
        sqlite3_finalize(stmt);
        sqlite3_close(db);
        throw std::runtime_error("Failed to update data: " + std::string(sqlite3_errmsg(db)));
    }


    const int ifChange = sqlite3_changes(db);

    sqlite3_finalize(stmt);
    if(ifChange ==0) {
        std::cout << "Item does not exist.\n ";
        std::cout << ifChange << std::endl;
        sqlite3_close(db);
        return false;
    }
    else {
        std::cout << "Quantity updated successfully.\n";
        sqlite3_close(db);
        return true;
    }

}

