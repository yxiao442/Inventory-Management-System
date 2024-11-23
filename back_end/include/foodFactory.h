//
// Created by Mattie Poon on 2024-11-09.
//

#ifndef FOOD_FACTORY_H
#define FOOD_FACTORY_H

#include "productFactory.h"
#include "food.h"
class foodFactory : public productFactory {

//private:
//    string inventoryID;
//    string productName;
//    float price;
//    string category;
public:
//    foodFactory(const std::string& productName, float price, int quantity, const std::string&inventoryID);

    product* generateItem(const std::string& productName, float price, const std::string&inventoryID) override;
};

#endif