
#ifndef INVENTORY_H
#define INVENTORY_H
#include <string>
#include <vector>

using namespace std;

class inventory {
private:
    static inventory *instance;

    inventory();

public:
    static inventory *getInstance();

    std::vector<std::vector<std::string> > getInventory();
};

#endif
