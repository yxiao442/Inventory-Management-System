//
// Created by x9god on 2024-11-09.
//
#include "isStock.h"
#include <iostream>
#include <vector>
#include <string>
#include "Observer.h"
#include "stock.h"
using namespace std;

Stock::Stock(const std::string &name, int stock): productName(name), stock(stock) {
}

void Stock::addObserver(Observer *observer) {
    observers.push_back(observer);
}

void Stock::clearObserver() {
    this->observers.clear();
}

bool Stock::notifyObservers() {
    for (Observer *observer: observers) {
       return observer->update(productName, stock);
    }
}