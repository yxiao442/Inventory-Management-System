

#ifndef REPORT_H
#define REPORT_H
#include <string>
#include <vector>
using namespace std;

class report {

   public:
    string productName;
    int quantity;
    string type;
    float value;
    string startDay;
    string endDay;
    report(string,int,string,float,string);
    report(string,string);
    void insertIntoRpeort();
    std::vector<report> getReport();

};

#endif
