# Cribl
Hello. I'd like to introduce a test automation project. I created that base on the assignment task (QA_Engineering__NEW.pdf).
For this task, I was using the Mocha framework.
I had tree options:
	1) Java with TestNg.
	2) Node js with Mocha.
	3) Batch script.
Java is so massive to use it for small project and work with files.
Batch script good to work with files but hard to create test and testSuits.
Node js with Mocha is an excellent fit for that.
All tests(test_instal,test_files,test_) you can find in 'test' folder.
Also, I created a 'utils' file to store all function.
Under 'test/data' you see all input data for the age.
I've split test by logic and types of testing.
	1) Smoke - check all services stars successful (test_install).
	2) Acceptance - check files created with different scenarios(test_files).
	3) Function - check all data were split proper, no loss, no duplicates (test_content).

Requirements:
	Install Node js v12 or later.
	Mocha and all dependencies already installed in the project.
Execution:
	In terminal: npm run <test_name from package script>

The best approach to launch all services in Docker.
For CI/CD use Jenkins pipeline or freestyle jobs with triggering.

P.S: Never use node js and Mocha before. I've sure it can be better .
