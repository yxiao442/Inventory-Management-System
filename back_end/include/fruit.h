
#ifndef BACK_END_FRUIT_H
#define BACK_END_FRUIT_H

#include "product.h"
#include <iostream>
using namespace std;

class fruit : public product{
private:
    string inventoryID;
    string productName;
    float price;

public:
    fruit(const std::string& productName, float price, const std::string&inventoryID);
    bool createItem() override;
    bool addQuantity(int amount) override;
    bool deleteQuantity(int amount) override;

};

#endif
