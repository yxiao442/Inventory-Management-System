//
// Created by Mattie Poon on 2024-11-23.
//

#include "drinkFactory.h"


product* drinkFactory::generateItem(const std::string& productName, float price, const std::string&inventoryID){
    return new drink(productName,price,inventoryID);

}