//
// Created by x9god on 2024-11-09.
//

#include <iostream>
#include <string>
#include "Observer.h"
#include "notify.h"

notify::notify(int StockThreshold) : StockThreshold(StockThreshold) {
}

bool notify::update(const std::string &item, int stockLevel) {
    if (stockLevel < StockThreshold) {
        std::cout  << item << " stock: " << stockLevel << ",the stock is low" << std::endl;
        return true;
    }
    return false;
}
