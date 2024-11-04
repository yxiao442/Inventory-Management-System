//
// Created by x9god on 2024-10-19.
//
#include <iostream>
#include "user.h"
#include <string>
#include "sqlite/sqlite3.h"

using namespace std;
user::user(string username, string password, string type) {
    this->username = username;
    this->password = password;
    this->type = type;

}


string user::getName() {
    return this->username;
}

bool user::vertifyLogin() {

    sqlite3* DB;
    int exit = sqlite3_open("../project.db", &DB);
    if (exit) {
        std::cerr << "Error opening database: " << sqlite3_errmsg(DB) << "\n";
        return exit;
    }
    sqlite3_stmt* stmt;
    const char* sql = "SELECT * FROM LOGIN WHERE Username = ? AND Password = ? AND Type = ?;";
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



