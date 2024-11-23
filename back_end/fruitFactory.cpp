//
// Created by Mattie Poon on 2024-11-23.
//

#include "fruitFactory.h"


product* fruitFactory::generateItem(const std::string& productName, float price, const std::string&inventoryID){
    return new fruit(productName,price,inventoryID);

}