//
// Created by x9god on 2024-10-19.
//

#ifndef USER_H
#define USER_H
#include <string>
using namespace std;

class user {
public:

    virtual bool vertifyLogin() = 0;
    virtual bool changePassword() = 0;
    virtual ~user() = default;
protected:
    string username;
    string password;
    string type;
};


#endif //USER_H
