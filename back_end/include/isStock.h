//
// Created by x9god on 2024-11-09.
//

#ifndef ISSTOCK_H
#define ISSTOCK_H
#include <string>
#include <vector>
#include "Observer.h"
using namespace std;

class isStock {
public:
    virtual void addObserver(Observer *observer) =0;

    virtual void clearObserver() =0;

    virtual bool notifyObservers() =0;

    virtual ~isStock() = default;
};


#endif //ISSTOCK_H
