

#ifndef EMPLOYEE_H
#define EMPLOYEE_H
#include <string>
#include "user.h"
using namespace std;

class employee : public user {

  private:
     string username;
     string password;
     string type;
  public:
     employee(string, string, string);
     bool vertifyLogin() override;
     bool changePassword() override;
     bool createEmployee();
};



#endif //EMPLOYEE_H
