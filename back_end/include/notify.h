
#ifndef DASHBOARDDISPLAY_H
#define DASHBOARDDISPLAY_H

#include <iostream>
#include <string>
#include "Observer.h"

using namespace std;

class notify : public Observer {
private:
    int StockThreshold;

public:
    notify(int StockThreshold);

    bool update(const std::string &item, int stockLevel) override;
};


#endif
