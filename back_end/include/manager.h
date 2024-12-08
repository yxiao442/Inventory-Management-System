
#ifndef MANAGER_H
#define MANAGER_H
#include <string>
#include "user.h"
using namespace std;

class manager : public user {

private:
    string username;
    string password;
    string type;
public:

    manager(string, string, string);
    bool vertifyLogin() override;
    bool changePassword() override;
    bool createManager();
};

#endif
