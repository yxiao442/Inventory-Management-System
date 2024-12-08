

#include <iostream>
#include <string>
#include "Observer.h"
#include "notify.h"



//Constructor for notify object
notify::notify(int StockThreshold) : StockThreshold(StockThreshold) {
}

//Check if the stock is less than stock threshold
bool notify::update(const std::string &item, int stockLevel) {
    if (stockLevel < StockThreshold) {
        std::cout  << item << " stock: " << stockLevel << ",the stock is low" << std::endl;
        return true;
    }
    return false;
}
