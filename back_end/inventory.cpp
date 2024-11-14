#include <iostream>
#include "inventory.h"
#include <string>
#include "sqlite/sqlite3.h"
#include <vector>

using namespace std;
// string result;

std::vector<std::vector<std::string> > result;
inventory *inventory::instance = nullptr;

inventory::inventory() {
    std::cout << "get inventory" << std::endl;
}

inventory *inventory::getInstance() {
    if (instance == nullptr) {
        instance = new inventory();
    }
    return instance;
}


int callback(void *data, int argc, char **argv, char **azColName) {
    std::vector<std::string> array;
    for (int i = 0; i < argc; i++) {
        array.push_back(argv[i]);
    }
    result.push_back(array);

    return 0;
}


std::vector<std::vector<std::string> > inventory::getInventory() {
    sqlite3 *DB;
    char *errorMessage = nullptr;
    const char *data = "Callback function called";

    // Open the database (creates it if it doesn't exist)
    int exit = sqlite3_open("../project.db", &DB);
    if (exit) {
        std::cerr << "Error opening database: " << sqlite3_errmsg(DB) << "\n";
        // return "Can not find database";
    }
    std::cout << "Database opened successfully!\n";

    // SQL query to select everything from a table
    std::string sql = "SELECT * FROM INVENTORY;";

    // Execute the query
    exit = sqlite3_exec(DB, sql.c_str(), callback, (void *) data, &errorMessage);
    if (exit != SQLITE_OK) {
        std::cerr << "SQL error: " << errorMessage << "\n";
        sqlite3_free(errorMessage);
    } else {
        std::cout << "Query executed successfully!\n";
    }
    std::vector<std::vector<std::string> > final;
    final = std::move(result);
    result.clear();
    sqlite3_close(DB);
    return final;
}
