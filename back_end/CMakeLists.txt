cmake_minimum_required(VERSION 3.29)
project(back_end)

set(CMAKE_CXX_STANDARD 20)
#set(CMAKE_EXE_LINKER_FLAGS "-static -static-libgcc -static-libstdc++")
#set(CMAKE_FIND_LIBRARY_SUFFIXES ".a")  # Prefer static libraries
#set(BUILD_SHARED_LIBS OFF)            # Disable shared library builds
#include_directories(include)
#add_subdirectory("googletest")
#enable_testing()

add_executable(back_end main.cpp sqlite/sqlite3.h sqlite/sqlite3.c
        inventory.cpp
        include/inventory.h
        include/isStock.h
        stock.cpp
        include/Observer.h
        notify.cpp
        include/stock.h
        include/notify.h
        include/employee.h
        include/manager.h
        employee.cpp
        manager.cpp
        drink.cpp
        drinkFactory.cpp
        food.cpp
        foodFactory.cpp
        fruit.cpp
        fruitFactory.cpp
        include/fruit.h
        include/food.h
        include/drink.h
        include/foodFactory.h
        include/fruitFactory.h
        include/drinkFactory.h
        include/product.h
        include/productFactory.h
        include/report.h
        report.cpp
#        test_main.cpp
)
#set(TEST_SOURCES
#        test_main.cpp  # Include test_main.cpp where both UserTest and EmployeeTest are defined
#)
#add_executable(UserTest sqlite/sqlite3.h sqlite/sqlite3.c
#        test_main.cpp
#        fruit.cpp
#        include/fruit.h
#        include/notify.h
#        notify.cpp
#        stock.cpp
#        include/stock.h
#
#        # add other test files here
#)

include_directories(${CMAKE_SOURCE_DIR}/include)
#include_directories("googletest/googlemock/include")
#include_directories("googletest/googletest/include")
target_link_libraries(back_end PRIVATE  ws2_32 mswsock)
#target_link_libraries(UserTest PRIVATE gmock gmock_main gtest gtest_main)
#
#add_test(NAME UserTest  COMMAND UserTest)
