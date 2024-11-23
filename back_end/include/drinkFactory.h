//
// Created by Mattie Poon on 2024-11-23.
//

#ifndef BACK_END_DRINKFACTORY_H
#define BACK_END_DRINKFACTORY_H

#include "productFactory.h"
#include "drink.h"
class drinkFactory : public productFactory {

public:
    product* generateItem(const std::string& productName, float price, const std::string&inventoryID) override;
};

#endif //BACK_END_DRINKFACTORY_H
