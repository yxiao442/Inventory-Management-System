//
// Created by x9god on 2024-10-19.
//
#include <iostream>
#include "manager.h"
#include <string>
#include "sqlite/sqlite3.h"

using namespace std;

manager::manager(string username, string password, string type) {
    this->username = username;
    this->password = password;
    this->type = type;
}




bool manager::vertifyLogin() {
    sqlite3 *DB;
    int exit = sqlite3_open("../project.db", &DB);
    if (exit) {
        std::cerr << "Error opening database: " << sqlite3_errmsg(DB) << "\n";
        return exit;
    }
    sqlite3_stmt *stmt;
    const char *sql = "SELECT * FROM LOGIN WHERE Username = ? AND Password = ? AND Type = ?;";
    if (sqlite3_prepare_v2(DB, sql, -1, &stmt, nullptr) != SQLITE_OK) {
        std::cerr << "Failed to prepare statement: " << sqlite3_errmsg(DB) << std::endl;
        return false;
    }
    sqlite3_bind_text(stmt, 1, this->username.c_str(), -1, SQLITE_STATIC);
    sqlite3_bind_text(stmt, 2, this->password.c_str(), -1, SQLITE_STATIC);
    sqlite3_bind_text(stmt, 3, this->type.c_str(), -1, SQLITE_STATIC);
    if (sqlite3_step(stmt) == SQLITE_ROW) {
        std::cout << "User authenticated!" << std::endl;
        sqlite3_finalize(stmt);
        sqlite3_close(DB);
        return true;
    } else {
        std::cout << "Invalid username or password." << std::endl;
        sqlite3_finalize(stmt);
        sqlite3_close(DB);
        return false;
    }

}
bool manager::createManager() {
    sqlite3 *DB;
    int exit = sqlite3_open("../project.db", &DB);
    if (exit) {
        std::cerr << "Error opening database: " << sqlite3_errmsg(DB) << "\n";
        return exit;
    }
    sqlite3_stmt *stmt;
    const char *sql = "INSERT INTO LOGIN(Username,Password,Type) VALUES (?,?,?);";
    if (sqlite3_prepare_v2(DB, sql, -1, &stmt, nullptr) != SQLITE_OK) {
        std::cerr << "Failed to prepare statement: " << sqlite3_errmsg(DB) << std::endl;
        return false;
    }

    sqlite3_bind_text(stmt, 1, this->username.c_str(), -1, SQLITE_STATIC);
    sqlite3_bind_text(stmt, 2, this->password.c_str(), -1, SQLITE_STATIC);
    sqlite3_bind_text(stmt, 3, this->type.c_str(), -1, SQLITE_STATIC);
    if (sqlite3_step(stmt) != SQLITE_DONE) {
        std::cerr << "Error executing statement: " << sqlite3_errmsg(DB) << std::endl;
        sqlite3_finalize(stmt);  // Finalize the statement on error
        sqlite3_close(DB);
        return false;
    }
    sqlite3_finalize(stmt);


    sqlite3_close(DB);

    std::cout << "Create User successfully.\n";
    return true;
}
bool manager::changePassword() {
    sqlite3 *DB;
    int exit = sqlite3_open("../project.db", &DB);
    if (exit) {
        std::cerr << "Error opening database: " << sqlite3_errmsg(DB) << "\n";
        return exit;
    }
    sqlite3_stmt *stmt;
    const char *sql = "UPDATE LOGIN SET Password = ? WHERE Username = ? AND Type = ?;";
    if (sqlite3_prepare_v2(DB, sql, -1, &stmt, nullptr) != SQLITE_OK) {
        std::cerr << "Failed to prepare statement: " << sqlite3_errmsg(DB) << std::endl;
        return false;
    }

    sqlite3_bind_text(stmt, 1, this->password.c_str(), -1, SQLITE_STATIC);
    sqlite3_bind_text(stmt, 2, this->username.c_str(), -1, SQLITE_STATIC);
    sqlite3_bind_text(stmt, 3, this->type.c_str(), -1, SQLITE_STATIC);
    if (sqlite3_step(stmt) != SQLITE_DONE) {
        std::cerr << "Error executing statement: " << sqlite3_errmsg(DB) << std::endl;
        sqlite3_finalize(stmt);  // Finalize the statement on error
        sqlite3_close(DB);
        return false;
    }
     const int ifChange = sqlite3_changes(DB);

    sqlite3_finalize(stmt);
    if(ifChange ==0) {
        std::cout << "Account is not exist.\n ";
        std::cout << ifChange << std::endl;
        sqlite3_close(DB);
        return false;
    }
    else {
        std::cout << "Password reset successfully.\n";

        sqlite3_close(DB);
        return true;
    }


}

