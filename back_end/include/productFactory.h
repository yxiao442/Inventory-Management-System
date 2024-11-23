//
// Created by Mattie Poon on 2024-11-09.
//

#ifndef PRODUCT_FACTORY_H
#define PRODUCT_FACTORY_H


#include "product.h"

class productFactory {
public:
    virtual product* generateItem(const std::string& productName, float price, const std::string&inventoryID) = 0;
    virtual ~productFactory() = default;
};

#endif
