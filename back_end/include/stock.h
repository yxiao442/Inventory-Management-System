//
// Created by x9god on 2024-11-09.
//

#ifndef STOCK_H
#define STOCK_H
#include <string>
#include <vector>
#include "isStock.h"
#include "Observer.h"

class Stock : public isStock {
private:
    std::string productName;
    int stock;
    std::vector<Observer *> observers;


public:
    Stock(const std::string &name, int stock);

    void addObserver(Observer *observer) override;

    void clearObserver() override;

    bool notifyObservers() override;
};


#endif //STOCK_H
