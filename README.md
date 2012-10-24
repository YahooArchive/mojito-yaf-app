mojito-yaf-app
==============

A sample application that tests and demonstrates the integration of mojito and YAF

Test notes:
===========

This app is tested using Arrow and Selenium.

1. Install Arrow and Selenium

2. Run Selenium server from command line #1:

    Firefox: java -Dwebdriver.firefox.profile=default -jar /usr/local/src/selenium/selenium-server-standalone-2.25.0.jar

    Chrome: java -Dwebdriver.chrome.profile=default -jar /usr/local/src/selenium/selenium-server-standalone-2.25.0.jar

3. Run Arrow server from command line #2:

    arrow_server

4. cd to 'tests' directory from command line #3:

    cd <mojito-yaf-app>/tests

5. Run tests from command line #3:

    arrow yaf_mojito_descriptor.json --driver=selenium

6. Repeat Step #5 to repeat tests.
