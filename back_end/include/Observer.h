//
// Created by x9god on 2024-11-09.
//

#ifndef OBSERVER_H
#define OBSERVER_H
#include <string>

class Observer {
public:
    virtual bool update(const std::string &item, int stockLevel) = 0;

    virtual ~Observer() = default;
};
#endif //OBSERVER_H