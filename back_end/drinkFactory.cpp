#include "drinkFactory.h"


//Factory pattern to return a instance of Drink object
product* drinkFactory::generateItem(const std::string& productName, float price, const std::string&inventoryID){
    return new drink(productName,price,inventoryID);

}