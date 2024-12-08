
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


public:
    food(const std::string& productName, float price, const std::string&inventoryID);
    bool createItem() override;
    bool addQuantity(int amount) override;
    bool deleteQuantity(int amount) override;

};

#endif