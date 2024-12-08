

#include "foodFactory.h"

//Factory pattern to return an instance of food object
product* foodFactory::generateItem(const std::string& productName, float price, const std::string&inventoryID){
    return new food(productName,price,inventoryID);

}

