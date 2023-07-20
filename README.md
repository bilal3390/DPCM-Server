# Dental Patient and Cost Management System

## Description
This is a web application designed for dental practices, allowing the management of patients, doctors, appointments, medical records, treatment plans, and financial aspects of the clinic. The system involves four main user roles: Owner, Admin, Doctor, and Patient. Each role has specific functionalities and permissions within the application.

## Functional Requirements

### Owner:
- Log in: The owner can log into the system. The owner's credentials are automatically added to the database.
- Log out: The owner can log out of the system.
- Add Admin: The owner can add an admin user to the system.
- Remove Admin: The owner can remove an admin user from the system.
- See P&L: The owner can view the profit and loss statement, which includes revenue and expenses. Salaries are added to expenses, and fees are added to revenue.

### Admin:
- Log in: An admin user can log into the system.
- Log out: An admin user can log out of the system.
- Edit Patient Profile: The admin can modify the profile information of a patient.
- View Patient Profile: The admin can view the profile information of a patient.
- Add Patient Profile: The admin can add a new patient profile to the system.
- Remove Patient Profile: The admin can remove a patient profile from the system.
- Add Doctor: The admin can add a doctor to the system.
- Remove Doctor: The admin can remove a doctor from the system.
- Accept Appointment: The admin can accept appointment requests from patients, and notify the patients accordingly.
- Finance: The admin can add financial details such as patient fees, salaries, and expenses (e.g., clinic rent, electricity bills). These details will be reflected in the owner's profit and loss statement.

### Doctor:
- Log in: A doctor can log into the system.
- Log out: A doctor can log out of the system.
- Add Medical Record: The doctor can add medical records for a patient by using their ID.
- Edit Medical Record: The doctor can edit existing medical records of a patient.
- Dental Chart: The doctor can add dental charts for each patient using their ID.
- Dental X-ray (ML model): The doctor can add dental X-rays using a machine learning model.
- Add Treatment Plan: The doctor can add treatment plans for each patient using their ID.
- Remove Treatment Plan: The doctor can remove treatment plans for patients.

### Patient:
- Log in: A patient can log into the system.
- Log out: A patient can log out of the system.
- See Profile: The patient can view their own profile information.
- Edit Profile: The patient can edit their own profile information.
- See Medical History: The patient can view their own medical history by providing their ID.

## Getting Started

### Prerequisites
- Python (version X.X.X)
- Django (version X.X.X)
- Other required dependencies

### Installation
1. Clone the repository using the following command:
   ```
   git clone https://github.com/your-username/repository-name.git
   ```

2. Install the required dependencies:
   ```
   pip install -r requirements.txt
   ```

3. Configure the database settings in the `settings.py` file.

4. Migrate the database:
   ```
   python manage.py migrate
   ```

5. Start the development server:
   ```
   python manage.py runserver
   ```

6. Access the application by visiting `http://localhost:8000` in your web browser.

## Contributing
1. Fork the repository on GitHub.
2. Clone the forked repository to your local machine.
3. Create a new branch to work on.
4. Make your changes and commit them with
