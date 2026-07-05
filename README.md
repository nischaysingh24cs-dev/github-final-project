# DevOps Capstone Project

![Build Status](https://github.com/nischaysingh24cs-dev/devops-capstone-project/actions/workflows/ci-build.yaml/badge.svg)

## Project Overview
This is the sample microservice application for the DevOps Capstone Project. It provides a RESTful web service to manage accounts with automated testing and Continuous Integration (CI).

---

### Core Account Model:
* **id:** Unique identifier.
* **name:** Account holder's name.
* **email:** Associated contact email.
* **type:** Account category (Savings or Checking).
* **balance:** Available balance.

---

### Implementation Details:
The microservice is fully compliant with the following operations:
1. **CREATE:** Create a new account in the service database.
2. **READ:** Fetch account details using an ID.
3. **UPDATE:** Modify account details on the fly.
4. **DELETE:** Delete accounts securely from the registry.
5. **LIST:** List all active accounts in the service.

---

### Automated Validation (CI/CD)
Every code change triggered by a push event is automatically run against static code checking (`flake8`) and unit tests (`nosetests` via `pynose`) to guarantee 100% deployment integrity.
