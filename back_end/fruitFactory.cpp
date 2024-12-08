

#include "fruitFactory.h"

//Factory pattern to return an instance of fruit object
product* fruitFactory::generateItem(const std::string& productName, float price, const std::string&inventoryID){
    return new fruit(productName,price,inventoryID);

}