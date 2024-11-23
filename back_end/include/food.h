//
// Created by Mattie Poon on 2024-11-09.
//

#ifndef FOOD_H
#define FOOD_H
#include "product.h"
#include <iostream>
using namespace std;

class food : public product{
private:
    string inventoryID;
    string productName;
    float price;
    string category;
    int quantity;

public:
    food(const std::string& productName, float price, const std::string&inventoryID);
    bool createItem() override;
    bool addQuantity(int amount) override;
    bool deleteQuantity(int quantity) override;

};

#endif