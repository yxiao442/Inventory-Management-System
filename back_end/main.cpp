#include <iostream>
#include "include/crow.h"
#include "sqlite/sqlite3.h"
#include <string>
#include <vector>
#include "notify.h"
#include "stock.h"
#include "inventory.h"
#include "crow/middlewares/cors.h"
#include "employee.h"
#include "manager.h"
#include "product.h"
#include "foodFactory.h"
#include "fruitFactory.h"
#include "drinkFactory.h"

using namespace std;


int main() {
    crow::App<crow::CORSHandler> app;
    //setup the CORS policy
    auto &cors = app.get_middleware<crow::CORSHandler>();
    cors
            .global()
            .headers("X-Custom-Header", "Content-Type",
                     "Authorization", "Accept", "Origin",
                     "Access-Control-Allow-Origin")
            .methods("POST"_method, "GET"_method)
            .prefix("/cors")
            .origin("localhost:3000")
            .prefix("/nocors")
            .ignore();


    //Endpoint to listen POST from frontend login page
    CROW_ROUTE(app, "/").methods("POST"_method)([](const crow::request &req) {
        auto body = crow::json::load(req.body); // Load the request body as JSON
        auto username = body["Username"].s();
        auto password = body["Password"].s();
        auto type = body["Type"].s();
        std::cout << username << " " << password << std::endl;
        bool loginStatus;
        if (type == "Manager") {
            manager newManager(username, password, type);
            loginStatus = newManager.vertifyLogin();
        }
        else {
            employee newEmployee(username, password, type);
            loginStatus = newEmployee.vertifyLogin();
        }
        if (loginStatus) {
            crow::json::wvalue response_json;
            response_json["message"] = "Login Success!";
            crow::response res(200, response_json);
            return res;
        } else {
            crow::json::wvalue response_json;
            response_json["message"] = "Login Failure!";
            crow::response res(404, response_json);
            return res;
        }
    });
    //Endpoint to listen POST from frontend create user dialogue page
    CROW_ROUTE(app,"/createUser").methods("POST"_method)([](const crow::request &req) {

        auto body = crow::json::load(req.body);
        auto username = body["Username"].s();
        auto password = body["Password"].s();
        auto type = body["Type"].s();
        bool createStatus;
        if(type == "Manager") {
            manager newManager(username, password, type);
            createStatus = newManager.createManager();
        }
        else {
            employee newEmployee(username, password, type);
            createStatus = newEmployee.createEmployee();
        }
        if (createStatus) {
            crow::json::wvalue response_json;
            response_json["message"] = "Create Success!";
            crow::response res(200, response_json);
             return res;

        }
        else {
            crow::json::wvalue response_json;
           response_json["message"] = "Create Failure!";
           crow::response res(404, response_json);
           return res;

        }




    });
    //Endpoint to listen POST from frontend forget password dialogue page
    CROW_ROUTE(app,"/forgetPassword").methods("POST"_method)([](const crow::request &req) {

       auto body = crow::json::load(req.body);
       auto username = body["Username"].s();
       auto password = body["Password"].s();
       auto type = body["Type"].s();
       bool resetStatus;
       if(type == "Manager") {
           manager newManager(username, password, type);
           resetStatus = newManager.changePassword();
       }
       else {
           employee newEmployee(username, password, type);
           resetStatus = newEmployee.changePassword();
       }
       if (resetStatus) {
           crow::json::wvalue response_json;
           response_json["message"] = "Password reset Success!";
           crow::response res(200, response_json);
            return res;

       }
       else {
           crow::json::wvalue response_json;
          response_json["message"] = "Account does not exist!";
          crow::response res(404, response_json);
          return res;

       }




   });
    //Endpoint to listen GET from frontend inventory page
    CROW_ROUTE(app, "/inventory").methods("GET"_method)([](const crow::request &req) {
        inventory *newInventory = inventory::getInstance();
        std::vector<std::vector<std::string> > inventoryResult = newInventory->getInventory();
        crow::json::wvalue jsonData;
        std::vector<crow::json::wvalue> vector_of_wvalue;
        for (size_t i = 0; i < inventoryResult.size(); ++i) {
            crow::json::wvalue product;
            const auto &row = inventoryResult[i];
            product["inventoryID"] = row[0];
            product["productName"] = row[1];
            product["category"] = row[2];
            product["stock"] = row[3];
            product["price"] = row[4];
            Stock newStock(row[1], stoi(row[3]));
            notify observe(20);
            newStock.addObserver(&observe);
            bool isLow = newStock.notifyObservers();
            if(isLow == true) {
                product["lowStock"] = "Yes";
            }
            else {
                product["lowStock"] = "No";
            }

            vector_of_wvalue.push_back(product);
        }
        jsonData = crow::json::wvalue::list(vector_of_wvalue);
        std::cout << jsonData.dump() << std::endl;
        crow::response res(200, jsonData);
        vector_of_wvalue.clear();
        return res;
    });


    CROW_ROUTE(app,"/createProduct").methods("POST"_method)([](const crow::request &req){
        auto body = crow::json::load(req.body);
        auto productName = body["Product_Name"].s();
        auto category = body["Product_Category"].s();
        auto price_str = body["Product_Price"].s();
        float price = std::stof(price_str);
        auto productID = body["Product_ID"].s();

        productFactory* factory = nullptr;

        if(category == "Food") {
            factory = new foodFactory();
        } else if(category == "Drink"){
            factory = new drinkFactory();
        } else if(category == "Fruit"){
            factory = new fruitFactory();
        }

        product* newProduct = factory -> generateItem(productName, price, productID);
        if (newProduct -> createItem()){
            crow::json::wvalue response_json;
            response_json["message"] = "Create successfully";
            crow::response res(200, response_json);
            delete newProduct;
            delete factory;

            return res;
        } else{
            crow::json::wvalue response_json;
            response_json["message"] = "Create Failed";
            crow::response res(404, response_json);
            delete newProduct;
            delete factory;
            return res;
        }


    });


    CROW_ROUTE(app,"/salesProduct").methods("POST"_method)([](const crow::request &req){
        auto body = crow::json::load(req.body);
        auto productName = body["Product_Name"].s();
        auto category = body["Product_Category"].s();
        auto amount_str = body["Sales_Amount"].s();
        int amount = std::stoi(amount_str);
        auto productID = body["Product_ID"].s();

        productFactory* factory = nullptr;

        if(category == "Food") {
            factory = new foodFactory();
        } else if(category == "Drink"){
            factory = new drinkFactory();
        } else if(category == "Fruit"){
            factory = new fruitFactory();
        }

        product* newProduct = factory -> generateItem(productName, 0, productID);
        if (newProduct -> deleteQuantity(amount)){
            crow::json::wvalue response_json;
            response_json["message"] = "Sales successfully";
            crow::response res(200, response_json);
            delete newProduct;
            delete factory;
            return res;
        } else{
            crow::json::wvalue response_json;
            response_json["message"] = "Sales Failed";
            crow::response res(404, response_json);
            delete newProduct;
            delete factory;
            return res;
        }



    });


    CROW_ROUTE(app,"/purchaseProduct").methods("POST"_method)([](const crow::request &req){
        auto body = crow::json::load(req.body);
        auto productName = body["Product_Name"].s();
        auto category = body["Product_Category"].s();
        auto amount_str = body["Purchase_Amount"].s();
        int amount = std::stoi(amount_str);
        auto productID = body["Product_ID"].s();

        productFactory* factory = nullptr;

        if(category == "Food") {
            factory = new foodFactory();
        } else if(category == "Drink"){
            factory = new drinkFactory();
        } else if(category == "Fruit"){
            factory = new fruitFactory();
        }

        product* newProduct = factory -> generateItem(productName, 0, productID);
        if (newProduct -> addQuantity(amount)){
            crow::json::wvalue response_json;
            response_json["message"] = "Purchase successfully";
            crow::response res(200, response_json);
            delete newProduct;
            delete factory;
            return res;
        } else{
            crow::json::wvalue response_json;
            response_json["message"] = "Purchase Failed";
            crow::response res(404, response_json);
            delete newProduct;
            delete factory;
            return res;
        }

    });


    app.port(18080).multithreaded().run();

    return 0;
}
