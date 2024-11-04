//
// Created by x9god on 2024-10-19.
//

#ifndef USER_H
#define USER_H
#include <string>
using namespace std;

class user {

 public:
    user(string, string, string );
    string getName();
    bool vertifyLogin();

 private:
    string username;
    string password;
    string type;


};



#endif //USER_H
