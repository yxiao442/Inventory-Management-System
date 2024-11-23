//
// Created by Mattie Poon on 2024-11-09.
//


#include "foodFactory.h"


product* foodFactory::generateItem(const std::string& productName, float price, const std::string&inventoryID){
    return new food(productName,price,inventoryID);

}

