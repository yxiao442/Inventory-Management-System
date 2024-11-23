//
// Created by Mattie Poon on 2024-11-09.
//


#include "foodFactory.h"


//foodFactory::foodFactory(const std::string& productName, float price, int quantity, const std::string&inventoryID)
//        : productName(productName), price(price), quantity(quantity),inventoryID(inventoryID) {}





product* foodFactory::generateItem(const std::string& productName, float price, const std::string&inventoryID){
    return new food(productName,price,inventoryID);

}

