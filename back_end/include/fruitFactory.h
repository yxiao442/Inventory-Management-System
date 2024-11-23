//
// Created by Mattie Poon on 2024-11-23.
//

#ifndef BACK_END_FRUITFACTORY_H
#define BACK_END_FRUITFACTORY_H

#include "productFactory.h"
#include "fruit.h"
class fruitFactory : public productFactory {

public:
    product* generateItem(const std::string& productName, float price, const std::string&inventoryID) override;
};
#endif //BACK_END_FRUITFACTORY_H
