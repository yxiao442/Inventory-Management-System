//
// Created by Mattie Poon on 2024-11-09.
//



#ifndef PRODUCT_H
#define PRODUCT_H
#include <string>
using namespace std;


class product {
private:
    string inventoryID;
    string productName;
    float price;



public:

    virtual bool createItem() = 0;
    virtual bool addQuantity(int amount) = 0;
    virtual bool deleteQuantity(int amount) = 0;
    virtual ~product() = default;
};

#endif




